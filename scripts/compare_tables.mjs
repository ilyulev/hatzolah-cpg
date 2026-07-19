// scripts/compare_tables.mjs
// Build a human-verification review sheet for every table the app renders,
// comparing the current contentData table against the coordinate-reconstructed
// v6.2 table. Numeric cells are diffed (normalised for ↑/↓ vs ≥/< and dashes);
// list/graphic-derived tables are flagged for manual review with their raw text.
//
// Output: scripts/output/v6.2-tables-review.md
// Does NOT modify contentData — clinician verifies, then we patch.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { reconstructTables, TABLE_SPECS, extractPageItems } from './extract_tables.mjs';

const PDF = './source/Compiled_v6_2.pdf';

// tables in contentData that are NOT PDF grid tables (documented for the sheet)
const NON_GRID = {
  'ventilation-rates': {
    page: 31,
    why: 'Rendered as "- IF - <age> ventilate once every <interval> OR <rate>" statements, not a grid.',
  },
  'weight-calculations': {
    page: 20,
    why: 'Formula text is absent from the PDF text layer (rendered as a graphic). Cannot auto-extract — verify by eye.',
  },
};

// normalise a cell for comparison only (never written back)
const norm = (s) =>
  String(s ?? '')
    .replace(/≥|＞|>/g, '↑').replace(/≤|＜|</g, '↓')
    .replace(/([↑↓])\s+/g, '$1') // "↓ 24 hours" === "↓24 hours"
    .replace(/\s*[–—-]\s*/g, '–')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s+/g, ' ')
    .toLowerCase().trim();

async function loadContent() {
  const src = fs.readFileSync('src/data/contentData.js', 'utf8');
  const tmp = path.join(os.tmpdir(), `cd-tab-${process.pid}.mjs`);
  fs.writeFileSync(tmp, src);
  const m = await import('file://' + tmp);
  fs.unlinkSync(tmp);
  return { ...m.assessmentsContent, ...m.conditionsContent, ...m.medicationsContent };
}

function mdTable(headers, rows, suspectRows = []) {
  const esc = (c) => String(c ?? '').replace(/\|/g, '\\|') || ' ';
  const L = ['| ' + headers.map(esc).join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |'];
  rows.forEach((r, i) => {
    const mark = suspectRows.includes(i) ? ' 🚩' : '';
    L.push('| ' + headers.map((_, ci) => esc(r[ci])).join(' | ') + ' |' + mark);
  });
  return L.join('\n');
}

const content = await loadContent();
const extracted = await reconstructTables(PDF);

const L = [];
L.push('# Hatzolah CPG v6.2 — Table Verification Sheet');
L.push('');
L.push(`Generated ${new Date().toISOString().slice(0, 10)}. For each table: the current app data vs the`);
L.push('coordinate-reconstructed v6.2 table. 🚩 marks a row needing extra scrutiny (extraction');
L.push('artifact suspected, or a cell mismatch). **Verify flagged values against the PDF before merging.**');
L.push('');

let flagCount = 0;

for (const spec of TABLE_SPECS) {
  const proto = content[spec.key];
  const cur = proto?.content?.[spec.path[0]];
  const ext = extracted[spec.key];
  L.push(`\n## ${proto?.title || spec.key}  \`${spec.key}\` — PDF p${spec.page}`);
  L.push('');

  if (!ext || ext.error || !ext.rows.length) {
    L.push(`⚠️ Coordinate extraction failed (${ext?.error || 'no rows'}) — verify manually.`);
    continue;
  }

  // Cell diff when the two share a comparable shape (align by row-0 label)
  const curRows = cur?.rows || [];
  const diffs = [];
  const maxRows = Math.max(curRows.length, ext.rows.length);
  for (let i = 0; i < maxRows; i++) {
    const a = curRows[i], b = ext.rows[i];
    if (!a) { diffs.push(`row ${i + 1}: **only in v6.2** → ${JSON.stringify(b)}`); continue; }
    if (!b) { diffs.push(`row ${i + 1}: **only in app** → ${JSON.stringify(a)}`); continue; }
    const cols = Math.max(a.length, b.length);
    for (let c = 0; c < cols; c++) {
      if (norm(a[c]) !== norm(b[c])) {
        diffs.push(`row ${i + 1} col ${c + 1} (${cur.headers[c] ?? '?'}): app \`${a[c] ?? '—'}\` vs v6.2 \`${b[c] ?? '—'}\``);
      }
    }
  }

  L.push(`**Current app** (${curRows.length} rows):`);
  L.push('');
  L.push(mdTable(cur?.headers || [], curRows));
  L.push('');
  L.push(`**v6.2 reconstructed** (${ext.rows.length} rows${ext.suspectRows.length ? `, ${ext.suspectRows.length} 🚩` : ''}):`);
  L.push('');
  L.push(mdTable(ext.headers, ext.rows, ext.suspectRows));
  L.push('');
  if (diffs.length) {
    flagCount += diffs.length;
    L.push(`**${diffs.length} difference(s) to verify:**`);
    diffs.forEach((d) => L.push(`- ${d}`));
  } else {
    L.push('✅ No cell differences after normalisation.');
  }
  L.push('');
}

// list/graphic-derived tables — dump raw page text for manual comparison
for (const [key, info] of Object.entries(NON_GRID)) {
  const proto = content[key];
  const cur = proto?.content?.table;
  L.push(`\n## ${proto?.title || key}  \`${key}\` — PDF p${info.page}  ⚠️ manual`);
  L.push('');
  L.push(`> ${info.why}`);
  L.push('');
  L.push('**Current app:**');
  L.push('');
  L.push(mdTable(cur?.headers || [], cur?.rows || []));
  L.push('');
  const pages = await extractPageItems(PDF, new Set([info.page]));
  const raw = (pages[info.page] || []).map((it) => it.s).join(' ').replace(/\s+/g, ' ').slice(0, 900);
  L.push('**v6.2 raw page text (for eyeballing):**');
  L.push('');
  L.push('> ' + raw);
  L.push('');
}

L.unshift('');
L.unshift(`**${flagCount} total cell difference(s) flagged across grid tables.**`);
L.unshift('');

fs.mkdirSync('scripts/output', { recursive: true });
fs.writeFileSync('scripts/output/v6.2-tables-review.md', L.join('\n'));
console.log('Table review → scripts/output/v6.2-tables-review.md');
console.log(`${flagCount} cell difference(s) flagged.`);
