// scripts/extract_pdf.mjs
// Re-extract Hatzolah CPG dosing from the v6.2 PDF and emit a human-verification review sheet.
//
// WHY a review sheet: pdf.js silently drops the comparison glyphs (≥ < ≤) on age/weight
// thresholds (e.g. "≥20 kgs" extracts as "20 kgs"), and occasionally splits numbers
// ("16" -> "1 6"). Those are safety-critical for drug dosing and cannot be recovered from
// text alone. The script therefore parses every dosing block, FLAGS the suspect ones, and
// prints each extracted value next to its raw PDF source line so a clinician can sign off.
//
// Usage:
//   node scripts/extract_pdf.mjs [pdfPath]
// Default pdfPath = ./source/Compiled_v6_2.pdf
// Output: scripts/output/v6.2-dosing-review.md  (+ console summary)

import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-fork');

const pdfPath = process.argv[2] || './source/Compiled_v6_2.pdf';
const OUT_DIR = 'scripts/output';
const OUT_FILE = `${OUT_DIR}/v6.2-dosing-review.md`;

// Drugs that appear as dosing-block headers (14 pharmacology + condition-page drugs).
// Used as reliable block boundaries (prose around the blocks also has capitalised words).
const DRUGS = [
  'Adrenaline', 'Aspirin', 'Cetirizine', 'Glucagon', 'Glucose Paste', 'Glucose',
  'Glyceryl Trinitrate', 'GTN', 'Ipratropium Bromide', 'Ipratropium', 'Atrovent',
  'Methoxyflurane', 'Midazolam', 'Normal Saline', 'Ondansetron', 'Oxygen',
  'Paracetamol', 'Salbutamol',
];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const DRUG_ALT = DRUGS.sort((a, b) => b.length - a.length).map(esc).join('|');
// blocks are headed "<Drug> - IF - ..." or "<Drug> - ALL - ..." (Cetirizine/Ondansetron use ALL)
const BLOCK_START = new RegExp(`(?=(?:${DRUG_ALT})\\s+- (?:IF|ALL) -)`);
const DRUG_HEAD = new RegExp(`^(${DRUG_ALT})\\s+- (?:IF|ALL) -`);

// ---- PDF -> per-page text -----------------------------------------------------
// The CPG encodes its comparison operators as symbol-font glyphs in the Unicode Private
// Use Area, which pdf.js cannot map (they otherwise drop out silently). Confirmed mapping:
//   U+F869 = ↑ (≥ / "and above")   U+F86B = ↓ (< / "and below")
// All other PUA glyphs are decorative bullets/icons → stripped.
const GLYPHS = { '\uF869': '↑', '\uF86B': '↓' };
function mapGlyphs(s) {
  return s.replace(/[\uF869\uF86B]/g, (m) => GLYPHS[m]).replace(/[\uE000-\uF8FF]/g, "");
}
async function extractPages(buf) {
  const pages = [];
  await pdf(buf, {
    pagerender: (pd) =>
      pd.getTextContent().then((tc) => {
        let t = '';
        for (const it of tc.items) t += mapGlyphs(it.str) + (it.hasEOL ? '\n' : ' ');
        pages.push(t);
        return t;
      }),
  });
  return pages;
}

// Normalise whitespace; protect logic markers (" - IF - " etc.) before de-hyphenating prose.
const tidy = (s) => s.replace(/­/g, '').replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n').trim();
const protectMarkers = (s) => s.replace(/ - (IF|ALL|& |OR|ELSE IF|REGARDLESS|UNTIL|AND|ONCE|NOT|R|A|S|H) - /g, (m, w) => ` ⟦${w.trim()}⟧ `);
const restoreMarkers = (s) => s.replace(/⟦([^⟧]+)⟧/g, '- $1 -');
const dehyphen = (s) => s.replace(/(\w) - (?=\w)/g, '$1-').replace(/(\d) - (?=\d)/g, '$1-');
const fix = (s) => restoreMarkers(dehyphen(protectMarkers(tidy(s))));

// Normalise comparison operators to the CPG's arrow convention (↑ = ≥/above, ↓ = ≤/below),
// tidy "↑ 6" -> "↑6", and re-join split digits before a unit ("1 6 years" -> "16 years").
function normalizeOps(s) {
  if (!s) return s;
  return s
    .replace(/[≥≻>]/g, '↑').replace(/[≤≺<]/g, '↓')
    .replace(/([↑↓])\s+(?=\d)/g, '$1')
    .replace(/(\d)\s(\d)(?=\s*(?:years?|kgs?))/g, '$1$2')
    .replace(/\s+/g, ' ').trim();
}

// ---- Dosing-block parser ------------------------------------------------------
function parseBlock(b, page) {
  const drug = (b.match(DRUG_HEAD) || [])[1] || null;
  const grab = (label, next) => {
    const re = new RegExp(`▸?\\s*${label}\\s*(.*?)\\s*(?:▸\\s*${next}|Maximum|↪|$)`, 's');
    const m = b.match(re);
    return m ? m[1].replace(/\s+/g, ' ').trim() : null;
  };
  const indication = normalizeOps((b.match(/- (?:IF|ALL) -\s*(.*?)\s*Demographic/s) || [])[1]?.replace(/\s+/g, ' ').trim() || null);
  const demographic = normalizeOps((b.match(/Demographic\s*(.*?)\s*▸?\s*Route/s) || [])[1]?.replace(/\s+/g, ' ').trim() || null);

  // SAFETY FLAGS — after operator recovery, only genuinely-ambiguous thresholds remain.
  const flags = [];
  const scan = (field, label) => {
    if (!field) return;
    const tokens = [...field.matchAll(/(\d+)\s*(kgs?|years?|mmol\/?L?)/gi)];
    for (const t of tokens) {
      const at = t.index;
      const before = field.slice(Math.max(0, at - 4), at); // a few chars before the number ("to ", "↑", "– ")
      const after = field.slice(at + t[0].length, at + t[0].length + 5);
      const hasOp = /[≥≤<>≺≻↑↓]/.test(before);
      const inRange = /(?:to|[–—-])\s*$/.test(before) || /^\s*(?:to|[–—-])\s*\d/.test(after); // X to Y / X–Y
      if (!hasOp && !inRange) flags.push(`${label}_MISSING_OPERATOR(${t[1]} ${t[2]})`);
    }
    if (/\b\d\s\d\b/.test(field)) flags.push('SPLIT_NUMBER');
  };
  scan(demographic, 'THRESHOLD');
  scan(indication, 'INDICATION');

  return {
    page, drug, indication, demographic,
    route: grab('Route', 'Initial Dose'),
    initialDose: grab('Initial Dose', 'Repeat Dose\\(s\\)'),
    repeat: grab('Repeat Dose\\(s\\)', 'Maximum'),
    max: (b.match(/Maximum\s*(.*?)\s*(?:↪|$)/s) || [])[1]?.replace(/\s+/g, ' ').trim() || null,
    flags,
    raw: b.replace(/\s+/g, ' ').trim(),
  };
}

// Scan every page for dosing blocks (each block is self-contained on its page).
function scanDosing(pages) {
  const rows = [];
  pages.forEach((raw, i) => {
    const t = fix(raw);
    if (!/Demographic/.test(t) || !/Initial Dose/.test(t)) return;
    const blocks = t.split(BLOCK_START).filter((b) => /Demographic/.test(b) && /Initial Dose/.test(b));
    for (const b of blocks) rows.push(parseBlock(b, i + 1));
  });
  return rows;
}

// Overlay human-verified corrections from scripts/dosing-corrections.json.
// Each correction overrides one field, clears that field's flags, and marks the block VERIFIED.
function applyCorrections(rows, corrections) {
  for (const c of corrections) {
    // page is optional: omit it to apply to every occurrence of this drug/dose (the same
    // dosing block is repeated on condition pages AND in the pharmacology section).
    // `match` (substring of the field's current value) disambiguates between a drug's bands.
    const matches = rows.filter(
      (r) => r.drug === c.drug &&
        (c.page == null || r.page === c.page) &&
        (!c.indication || (r.indication || '').toLowerCase().includes(c.indication.toLowerCase())) &&
        (!c.match || String(r[c.field] ?? '').toLowerCase().includes(c.match.toLowerCase()))
    );
    if (matches.length === 0) {
      console.warn(`⚠️  correction did not match any block: ${c.drug} ${c.page ? 'p' + c.page : ''} ${c.indication || ''} ${c.match ? '~' + c.match : ''}`);
      continue;
    }
    for (const r of matches) {
      r.corrected = r.corrected || {};
      r.corrected[c.field] = { from: r[c.field], to: c.value, by: c.verifiedBy, note: c.note };
      r[c.field] = c.value;
      r.verified = true;
      // drop flags that referred to the corrected field
      const tag = c.field === 'demographic' ? 'THRESHOLD' : c.field === 'indication' ? 'INDICATION' : null;
      if (tag) r.flags = r.flags.filter((f) => !f.startsWith(tag) && !/RARE_GLYPH|SPLIT_NUMBER/.test(f));
      else r.flags = [];
    }
  }
  return rows;
}

// ---- Review-sheet renderer ----------------------------------------------------
function renderReview(rows) {
  const flagged = rows.filter((r) => r.flags.length);
  const verified = rows.filter((r) => r.verified);
  const L = [];
  L.push('# Hatzolah CPG v6.2 — Dosing Verification Sheet');
  L.push('');
  L.push(`Auto-extracted from \`source/Compiled_v6_2.pdf\` on ${new Date().toISOString().slice(0, 10)}.`);
  L.push('Verified corrections live in `scripts/dosing-corrections.json`. Symbol: ↑ = and above (≥), ↓ = and below (≤).');
  L.push('');
  L.push(`- **${rows.length}** dosing blocks found`);
  L.push(`- **${verified.length}** verified ✔`);
  L.push(`- **${flagged.length}** still flagged for verification (missing operator / rare glyph / split number)`);
  L.push('');
  L.push('> ⚠️ For each block, confirm the extracted values match the PDF source line. Pay special');
  L.push('> attention to flagged rows: pdf.js drops `≥ < ≤` before age/weight thresholds, so an');
  L.push('> extracted `20 kgs` may actually be `≥20 kgs` in the PDF. **Restore the operator before merging.**');
  L.push('');
  L.push('---');
  L.push('');
  let lastDrug = null;
  for (const r of rows) {
    if (r.drug !== lastDrug) { L.push(`## ${r.drug}`); lastDrug = r.drug; }
    const status = r.verified ? ' ✔ **VERIFIED**' : r.flags.length ? ` 🚩 **${r.flags.join(', ')}**` : ' ✅';
    L.push(`### p${r.page} — ${r.indication || '(indication?)'}${status}`);
    L.push('');
    L.push('| field | extracted |');
    L.push('| --- | --- |');
    L.push(`| Demographic | ${r.demographic ?? '—'} |`);
    L.push(`| Route | ${r.route ?? '—'} |`);
    L.push(`| Initial Dose | ${r.initialDose ?? '—'} |`);
    L.push(`| Repeat | ${r.repeat ?? '—'} |`);
    L.push(`| Maximum | ${r.max ?? '—'} |`);
    L.push('');
    if (r.corrected) {
      for (const [field, c] of Object.entries(r.corrected)) {
        L.push(`> ✔ ${field}: corrected \`${c.from ?? '—'}\` → **${c.to}** (${c.by}${c.note ? `; ${c.note}` : ''})`);
      }
      L.push('');
    }
    L.push(`<sub>PDF source: ${r.raw}</sub>`);
    L.push('');
  }
  return L.join('\n');
}

// ---- shared entry point for other scripts ---------------------------------------
// Returns { pages, rows }: per-page text (glyph-recovered) + parsed dosing blocks
// with corrections applied. compare_meds.mjs imports this.
export async function extractDosing(path = './source/Compiled_v6_2.pdf') {
  const buf = fs.readFileSync(path);
  const pages = await extractPages(buf);
  let rows = scanDosing(pages);
  const corrFile = 'scripts/dosing-corrections.json';
  if (fs.existsSync(corrFile)) {
    const corrections = JSON.parse(fs.readFileSync(corrFile, 'utf8')).corrections || [];
    rows = applyCorrections(rows, corrections);
  }
  return { pages, rows };
}
export { fix, normalizeOps };

// ---- main ---------------------------------------------------------------------
if (!process.argv[1] || process.argv[1].endsWith('extract_pdf.mjs')) {
const buf = fs.readFileSync(pdfPath);
const pages = await extractPages(buf);
if (pages.length !== 163) console.warn(`⚠️  expected 163 pages, got ${pages.length}`);

let rows = scanDosing(pages);

// overlay human-verified corrections, if present
const CORR_FILE = 'scripts/dosing-corrections.json';
let corrections = [];
if (fs.existsSync(CORR_FILE)) {
  corrections = JSON.parse(fs.readFileSync(CORR_FILE, 'utf8')).corrections || [];
  rows = applyCorrections(rows, corrections);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, renderReview(rows));

const flagged = rows.filter((r) => r.flags.length);
const verified = rows.filter((r) => r.verified);
console.log(`Scanned ${pages.length} pages.`);
console.log(`Found ${rows.length} dosing blocks across ${new Set(rows.map((r) => r.drug)).size} drugs.`);
console.log(`Applied ${corrections.length} correction(s) → ${verified.length} verified.`);
console.log(`Still flagged: ${flagged.length}.`);
console.log(`Review sheet → ${OUT_FILE}`);
console.log('');
console.log('Drugs covered:', [...new Set(rows.map((r) => r.drug))].join(', '));
}
