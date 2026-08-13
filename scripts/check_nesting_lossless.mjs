// Prove a nesting pass changed ONLY the grouping of list items.
//
// Restoring the CPG's two-level lists means regrouping strings into nested
// arrays. Nothing may be reworded, added, dropped, merged or reordered - this is
// clinical text. Depth-first traversal order is unchanged by nesting:
//
//   before  ['A', 'B', 'C', 'D']            -> A B C D
//   after   ['A', ['B', 'C'], 'D']          -> A B C D
//
// so the flattened string sequence must match exactly. Any reword, insertion,
// deletion or reordering breaks the sequence and fails here.
//
//   node scripts/check_nesting_lossless.mjs <beforeDir> <afterDir>
import fs from 'fs';

const [beforeDir, afterDir] = process.argv.slice(2);
if (!beforeDir || !afterDir) {
  console.error('usage: node scripts/check_nesting_lossless.mjs <beforeDir> <afterDir>');
  process.exit(1);
}

// Every string in the object, depth-first, in declaration order.
function strings(node, out = []) {
  if (typeof node === 'string') { out.push(node); return out; }
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) { for (const v of node) strings(v, out); return out; }
  for (const v of Object.values(node)) strings(v, out);
  return out;
}

// Count how many arrays contain a nested array (i.e. groups created).
function groups(node) {
  let n = 0;
  (function walk(x) {
    if (!x || typeof x !== 'object') return;
    if (Array.isArray(x)) {
      if (x.some((i) => Array.isArray(i))) n += x.filter((i) => Array.isArray(i)).length;
      x.forEach(walk);
      return;
    }
    Object.values(x).forEach(walk);
  })(node);
  return n;
}

const files = fs.readdirSync(afterDir).filter((f) => f.endsWith('.json'));
let failed = 0, changed = 0, totalGroups = 0;

for (const f of files) {
  const beforePath = `${beforeDir}/${f}`;
  if (!fs.existsSync(beforePath)) { console.log(`NEW FILE (no baseline): ${f}`); continue; }
  const a = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
  const b = JSON.parse(fs.readFileSync(`${afterDir}/${f}`, 'utf8'));

  const sa = strings(a);
  const sb = strings(b);
  const ga = groups(a), gb = groups(b);
  if (gb !== ga) { changed++; totalGroups += gb - ga; }

  if (sa.length !== sb.length) {
    failed++;
    console.error(`\nFAIL ${f}: ${sa.length} strings before, ${sb.length} after`);
    const setA = new Set(sa), setB = new Set(sb);
    for (const s of sa) if (!setB.has(s)) console.error(`   LOST: ${JSON.stringify(s.slice(0, 90))}`);
    for (const s of sb) if (!setA.has(s)) console.error(`  ADDED: ${JSON.stringify(s.slice(0, 90))}`);
    continue;
  }
  for (let i = 0; i < sa.length; i++) {
    if (sa[i] !== sb[i]) {
      failed++;
      console.error(`\nFAIL ${f}: string ${i} differs`);
      console.error(`  before: ${JSON.stringify(sa[i].slice(0, 100))}`);
      console.error(`   after: ${JSON.stringify(sb[i].slice(0, 100))}`);
      break;
    }
  }
}

console.log(`\n${files.length} protocols checked · ${changed} regrouped · ${totalGroups > 0 ? '+' : ''}${totalGroups} sub-lists`);
if (failed) {
  console.error(`${failed} protocol(s) FAILED - text changed, not just grouping`);
  process.exit(1);
}
console.log('LOSSLESS: every string identical and in the same order; only grouping changed');
