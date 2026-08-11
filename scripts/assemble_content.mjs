// Splice regenerated v6.2 protocol content into src/data/contentData.js.
//
// Replaces ONE export block at a time (assessmentsContent / conditionsContent /
// medicationsContent) and leaves the rest of the file byte-for-byte identical —
// so each CPG section lands as its own reviewable commit, and the authorisation
// rules (CAN_PERFORM / REFERENCE_ONLY) at the tail are never touched.
//
//   node scripts/assemble_content.mjs assessments [--dry]
//
// Source of the new content: scripts/output/regen/<key>.json (written by the
// regeneration workflow). A protocol with no regen file keeps its current value.
import fs from 'fs';
import os from 'os';
import path from 'path';

const GROUPS = {
  assessments: { exportName: 'assessmentsContent', add: ['time-critical', 'safety-netting'] },
  conditions: { exportName: 'conditionsContent', add: ['birth-newborn', 'chest-trauma'] },
  medications: { exportName: 'medicationsContent', add: [] },
};

const group = process.argv[2];
const dry = process.argv.includes('--dry');
if (!GROUPS[group]) {
  console.error(`usage: node scripts/assemble_content.mjs <${Object.keys(GROUPS).join('|')}> [--dry]`);
  process.exit(1);
}
const { exportName, add } = GROUPS[group];
const FILE = 'src/data/contentData.js';
const REGEN = 'scripts/output/regen';

// ── JS literal serialiser (keeps the file idiomatic: bare keys, single quotes) ──
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
const key = (k) => (IDENT.test(k) ? k : q(k));

function ser(v, ind) {
  const pad = '  '.repeat(ind);
  const padIn = '  '.repeat(ind + 1);
  if (v === null) return 'null';
  if (typeof v === 'string') return q(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    // keep short all-scalar arrays on one line when they fit
    const allScalar = v.every((x) => x === null || typeof x !== 'object');
    if (allScalar) {
      const oneLine = `[${v.map((x) => ser(x, 0)).join(', ')}]`;
      if (oneLine.length + pad.length <= 100) return oneLine;
    }
    return `[\n${v.map((x) => padIn + ser(x, ind + 1)).join(',\n')},\n${pad}]`;
  }
  const e = Object.entries(v);
  if (!e.length) return '{}';
  const oneLine = `{ ${e.map(([k, x]) => `${key(k)}: ${ser(x, 0)}`).join(', ')} }`;
  if (e.every(([, x]) => x === null || typeof x !== 'object') && oneLine.length + pad.length <= 100) {
    return oneLine;
  }
  return `{\n${e.map(([k, x]) => `${padIn}${key(k)}: ${ser(x, ind + 1)}`).join(',\n')},\n${pad}}`;
}

// ── load current module (for entries with no regen file, and for key order) ──
const src = fs.readFileSync(FILE, 'utf8');
const tmp = path.join(os.tmpdir(), `cd-assemble-${process.pid}.mjs`);
fs.writeFileSync(tmp, src);
const mod = await import('file://' + tmp);
fs.unlinkSync(tmp);
const current = mod[exportName];
if (!current) throw new Error(`${exportName} not found in ${FILE}`);

// ── locate the export block precisely ──
const startMarker = `export const ${exportName} = {`;
const start = src.indexOf(startMarker);
if (start < 0) throw new Error(`could not find "${startMarker}"`);
const endMarker = '\n};\n';
const end = src.indexOf(endMarker, start);
if (end < 0) throw new Error(`could not find the end of ${exportName}`);
const blockEnd = end + endMarker.length;

// ── build the new block ──
const order = [...Object.keys(current), ...add.filter((k) => !(k in current))];
const lines = [`export const ${exportName} = {`];
let replaced = 0, kept = 0, added = 0;
const report = [];

for (const k of order) {
  const regenPath = `${REGEN}/${k}.json`;
  let entry, source;
  if (fs.existsSync(regenPath)) {
    entry = JSON.parse(fs.readFileSync(regenPath, 'utf8'));
    source = k in current ? 'regenerated' : 'NEW';
    if (k in current) {
      // title/level/category are curated and medically authoritative (level is an
      // authorisation decision) - never let regeneration move them. `summary` is
      // only descriptive, so it MUST follow the content: pain-assessment's old
      // summary advertised the DOLORS mnemonic that the audit proved was invented.
      const cur = current[k];
      for (const f of ['title', 'level', 'category']) {
        if (entry[f] !== cur[f]) {
          report.push(`  ${k}: kept existing ${f} (${JSON.stringify(cur[f])}), regen proposed ${JSON.stringify(entry[f])}`);
          entry[f] = cur[f];
        }
      }
      replaced++;
    } else {
      added++;
    }
  } else {
    entry = current[k];
    source = 'unchanged';
    kept++;
  }
  const sections = Object.keys(entry.content || {}).length;
  lines.push(`  ${key(k)}: ${ser(entry, 1)},`);
  report.push(`  ${source.padEnd(12)} ${k.padEnd(34)} ${sections} sections`);
}
lines.push('};\n');

const newBlock = lines.join('\n');
const out = src.slice(0, start) + newBlock + src.slice(blockEnd);

console.log(report.join('\n'));
console.log(`\n${exportName}: ${replaced} regenerated, ${added} new, ${kept} unchanged`);

if (dry) {
  console.log('\n(dry run - nothing written)');
} else {
  fs.writeFileSync(FILE, out);
  console.log(`\nwrote ${FILE}`);
}
