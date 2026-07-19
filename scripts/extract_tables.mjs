// scripts/extract_tables.mjs
// Coordinate-based table reconstruction from the v6.2 CPG PDF.
//
// WHY: pdf-parse-fork flattens tables into a linear text stream, losing the
// row/column grid. Here we read each text item's x/y position (pdf.js transform
// matrix) and rebuild the grid: cluster items into rows by y, assign each item
// to a column by nearest header anchor, then join sub-cell fragments
// ("25","-","60" -> "25-60";  "↓","24 hours" -> "↓24 hours").
//
// Exports reconstructTables(pdfPath) -> { [key]: {page, headers, rows} } for the
// configured TABLE_SPECS, plus the raw helpers. compare_tables.mjs consumes it.

import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-fork');

// PUA comparison-operator glyphs (see extract_pdf.mjs); strip other decorative PUA.
const GLYPHS = { '': '↑', '': '↓' };
const mapGlyphs = (s) =>
  s.replace(/[]/g, (m) => GLYPHS[m]).replace(/[-]/g, '');

// Which tables to reconstruct: contentData key -> where it lives + page + the
// header labels we expect (used to locate the header row and set column anchors).
export const TABLE_SPECS = [
  { key: 'vital-signs', path: ['table'], page: 5,
    headerHints: ['Age', 'Category', 'Weight', 'RR', 'HR', 'BP'] },
  { key: 'respiratory-assessment-fr', path: ['table'], page: 16,
    headerHints: ['Normal', 'Mild', 'Moderate', 'Severe'] },
  { key: 'respiratory-assessment-cb', path: ['table'], page: 122,
    headerHints: ['Normal', 'Mild', 'Moderate', 'Severe'] },
  { key: 'perfusion-assessment-fr', path: ['table'], page: 18,
    headerHints: ['Skin', 'Pulse', 'Conscious'] },
  { key: 'perfusion-assessment-cb', path: ['table'], page: 124,
    headerHints: ['Skin', 'Conscious'] },
  { key: 'cardiac-arrest-fr', path: ['paediatricTable'], page: 69,
    headerHints: ['Rescuers', 'Technique', 'Ratio'] },
  // Excluded (not PDF grid tables — see NON_GRID in compare_tables.mjs):
  //   ventilation-rates  → "- IF - <age> ventilate…" statements, no grid
  //   weight-calculations → formula text absent from PDF text layer (graphic)
];

// ---- per-page positioned text items -------------------------------------------
export async function extractPageItems(pdfPath, wantedPages) {
  const buf = fs.readFileSync(pdfPath);
  const pages = {};
  let n = 0;
  await pdf(buf, {
    pagerender: (pd) => {
      n += 1;
      const me = n;
      return pd.getTextContent().then((tc) => {
        if (wantedPages && !wantedPages.has(me)) return '';
        pages[me] = tc.items
          .map((it) => ({
            s: mapGlyphs(it.str).replace(/\s+/g, ' ').trim(),
            x: it.transform[4],
            y: it.transform[5],
            w: it.width,
          }))
          .filter((it) => it.s);
        return '';
      });
    },
  });
  return pages;
}

// group items into rows by y proximity (PDF y grows upward → sort descending)
function toRows(items, yTol = 4) {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows = [];
  for (const it of sorted) {
    const row = rows.find((r) => Math.abs(r.y - it.y) <= yTol);
    if (row) row.items.push(it);
    else rows.push({ y: it.y, items: [it] });
  }
  rows.forEach((r) => r.items.sort((a, b) => a.x - b.x));
  return rows;
}

// join fragments within one cell: operators + ranges glue with no space
function joinCell(items) {
  let s = items.map((it) => it.s).join(' ');
  s = s.replace(/([↑↓≥≤<>])\s+/g, '$1'); // "↑ 95%" -> "↑95%"
  s = s.replace(/(\d)\s*[-–]\s*(\d)/g, '$1–$2'); // "25 - 60" -> "25–60"
  return s.replace(/\s+/g, ' ').trim();
}

// Reconstruct one table given its header hints. Returns {headers, rows, page}.
function reconstructOne(items, spec) {
  const rows = toRows(items);
  // locate the header row: the row containing the most header hints
  let headerIdx = -1, best = 0;
  rows.forEach((r, i) => {
    const text = r.items.map((it) => it.s).join(' ').toLowerCase();
    const hits = spec.headerHints.filter((h) => text.includes(h.toLowerCase())).length;
    if (hits > best) { best = hits; headerIdx = i; }
  });
  if (headerIdx < 0 || best < 2) return { page: spec.page, headers: [], rows: [], error: 'header row not found' };

  const headerItems = rows[headerIdx].items;
  const anchors = headerItems.map((it) => it.x);
  const headers = headerItems.map((it) => it.s);

  const nearestCol = (x) => {
    let bi = 0, bd = Infinity;
    anchors.forEach((a, i) => { const d = Math.abs(a - x); if (d < bd) { bd = d; bi = i; } });
    return bi;
  };

  const out = [];
  const suspectRows = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    // stop if a big vertical gap opens up (table ended, notes below)
    if (i > headerIdx + 1 && rows[i - 1].y - r.y > 40) break;
    const cells = Array.from({ length: anchors.length }, () => []);
    for (const it of r.items) cells[nearestCol(it.x)].push(it);
    const rowVals = cells.map(joinCell);
    const filled = rowVals.filter(Boolean).length;
    // Stop when the row stops looking tabular: too few filled columns, or a cell
    // is prose-length (the notes paragraph under a table, whose words scatter
    // across columns as one long cell).
    const prose = rowVals.some((c) => c.length > 36);
    if (filled < 2 || prose) break;
    // flag rows with a split-number artifact ("60–1 00") for extra scrutiny
    if (rowVals.some((c) => /\d\s\d/.test(c))) suspectRows.push(out.length);
    out.push(rowVals);
  }
  return { page: spec.page, headers, rows: out, suspectRows };
}

export async function reconstructTables(pdfPath = './source/Compiled_v6_2.pdf') {
  const pagesNeeded = new Set(TABLE_SPECS.map((s) => s.page));
  const pages = await extractPageItems(pdfPath, pagesNeeded);
  const result = {};
  for (const spec of TABLE_SPECS) {
    const items = pages[spec.page] || [];
    result[spec.key] = { spec, ...reconstructOne(items, spec) };
  }
  return result;
}

// ---- CLI: print reconstructed tables ------------------------------------------
if (!process.argv[1] || process.argv[1].endsWith('extract_tables.mjs')) {
  const only = process.argv[2]; // optional key filter
  const tables = await reconstructTables(process.argv[3] || './source/Compiled_v6_2.pdf');
  for (const [key, t] of Object.entries(tables)) {
    if (only && key !== only) continue;
    console.log(`\n===== ${key}  (p${t.page})  ${t.error ? '⚠ ' + t.error : `${t.rows.length} rows × ${t.headers.length} cols`} =====`);
    if (t.headers.length) console.log('H | ' + t.headers.join(' | '));
    t.rows.forEach((r) => console.log('  | ' + r.join(' | ')));
  }
}
