// Lint for ambiguous age bands in protocol tables.
//
// The CPG prints an up-arrow for "above" and a down-arrow for "below", and this
// project renders them as >= and <. That is fine until the same table also has a
// band ending at the same number: "≥ 15 years" next to "12 - 15 years" makes a
// 15-year-old match two rows with contradictory values. It happened in eight
// tables across seven protocols - ventilation rates, weight calculations and the
// vital sign tables - and each one is a wrong number in a responder's hands.
//
// Rule: a first-column cell "≥ N ..." must not coexist with a row whose first
// column is a range ending at N, or an exact "N years/months/hours" row. Use
// "> N" in that case: the neighbouring band already covers exactly N.
//
//   pnpm check-age-bands        (exit 1 if any overlap is found)
import fs from 'fs';
import os from 'os';
import path from 'path';

const src = fs.readFileSync('src/data/contentData.js', 'utf8');
const tmp = path.join(os.tmpdir(), `cd-agebands-${process.pid}.mjs`);
fs.writeFileSync(tmp, src);
const m = await import('file://' + tmp);
fs.unlinkSync(tmp);

const all = { ...m.assessmentsContent, ...m.conditionsContent, ...m.medicationsContent };
const unitRe = '(year|month|hour|week|day)';
const hits = [];

for (const [key, proto] of Object.entries(all)) {
  (function walk(node, trail) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node.headers) && Array.isArray(node.rows)) {
      const first = node.rows.map((r) => String(r[0]).trim());
      for (const cell of first) {
        const ge = cell.match(/^≥\s*(\d+)/);
        if (!ge) continue;
        const n = Number(ge[1]);
        const clash = first.find((x) => {
          const range = x.match(/^(\d+)\s*[-–]\s*(\d+)/);
          if (range && Number(range[2]) === n) return true;
          return new RegExp(`^${n}\\s*${unitRe}`).test(x);
        });
        if (clash) hits.push({ key, trail, cell, clash });
      }
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${trail}.${k}`);
  })(proto.content, '');
}

if (!hits.length) {
  console.log(`age bands OK - no ambiguous boundaries in ${Object.keys(all).length} protocols`);
  process.exit(0);
}

console.error(`${hits.length} ambiguous age band(s):\n`);
for (const h of hits) {
  console.error(`  ${h.key}${h.trail}`);
  console.error(`    "${h.cell}" overlaps "${h.clash}" - a patient of exactly that age matches both rows`);
  console.error(`    fix: write "${h.cell.replace(/^≥\s*/, '> ')}"\n`);
}
process.exit(1);
