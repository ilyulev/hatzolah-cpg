// scripts/compare_meds.mjs
// Field-level comparison of verified v6.2 dosing (pharmacology pages) against the
// dosing currently in src/data/contentData.js medicationsContent.
// Goal: find real v4.9 → v6.2 changes without rewriting curated content.
//
// Usage: node scripts/compare_meds.mjs
// Output: scripts/output/v6.2-meds-diff.md + console summary

import fs from 'fs';
import os from 'os';
import path from 'path';
import { extractDosing } from './extract_pdf.mjs';

// drug name in PDF blocks -> key in medicationsContent
const DRUG_KEY = {
  'Adrenaline': 'adrenaline',
  'Aspirin': 'aspirin',
  'Cetirizine': 'cetirizine',
  'Glucagon': 'glucagon',
  'Glucose Paste': 'glucose-paste',
  'GTN': 'gtn',
  'Ipratropium Bromide': 'ipratropium',
  'Methoxyflurane': 'methoxyflurane',
  'Midazolam': 'midazolam',
  'Normal Saline': 'normal-saline',
  'Ondansetron': 'ondansetron',
  'Paracetamol': 'paracetamol',
  'Salbutamol': 'salbutamol',
};

// Normalise a field for comparison: unify operators to arrows, ranges, conjunctions,
// units, case and whitespace. Comparison-only — never written back to data.
function norm(s) {
  if (s == null) return '';
  return String(s)
    .replace(/≥|≻|>/g, '↑').replace(/≤|≺|</g, '↓')
    .replace(/\b(\d+)\s*(?:–|—|-|to)\s*(\d+)\b/g, '$1-$2')
    .replace(/- & -|\bAND\b/gi, '&').replace(/- OR -/gi, 'OR')
    .replace(/\bkgs\b/gi, 'kg').replace(/\byears? old\b/gi, 'y').replace(/\byears?\b/gi, 'y')
    .replace(/\bmins?\b/gi, 'min').replace(/\bmgs?\b/gi, 'mg')
    .replace(/\(.*?approx.*?\)/gi, '')
    .replace(/[()@,.\/]/g, ' ')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

// Extract just the numeric dose tokens (number+unit) — the safety-critical comparison.
function doseTokens(s) {
  if (!s) return [];
  return [...String(s).matchAll(/(\d+(?:\.\d+)?)\s*(mg|mcg|g|ml|l|mmol|puffs?|doses?|nebules?|ampules?|tablets?|hours?|min)/gi)]
    .map((m) => `${m[1]}${m[2].toLowerCase().replace(/s$/, '')}`);
}

const eqTokens = (a, b) => JSON.stringify(doseTokens(a)) === JSON.stringify(doseTokens(b));

// Parse Paracetamol's oral-liquid weight rows out of the extracted Initial Dose blob.
function parseWeightRows(s) {
  return [...String(s).matchAll(/- IF - (\d+) kg ([\w ]+?) \(approx\.?\) (\d+) mg (\d+) mL/g)]
    .map((m) => ({ weight: `${m[1]} kg`, age: m[2].trim(), dose: `${m[3]} mg`, volume: `${m[4]} mL` }));
}

// ---- load current medicationsContent (contentData.js is ESM in a CJS-default project) ----
async function loadCurrent() {
  const src = fs.readFileSync('src/data/contentData.js', 'utf8');
  const tmp = path.join(os.tmpdir(), `contentData-${Date.now()}.mjs`);
  fs.writeFileSync(tmp, src);
  const mod = await import('file://' + tmp);
  fs.unlinkSync(tmp);
  return mod.medicationsContent;
}

// ---- main -----------------------------------------------------------------------
const meds = await loadCurrent();
const { rows } = await extractDosing();
// pharmacology section only — condition-page copies are duplicates of these
const pharm = rows.filter((r) => r.page >= 137);

const L = [];
const summary = [];
L.push('# v6.2 medications — dosing diff vs current contentData.js');
L.push('');
L.push('Comparison normalises operators (≥/< vs ↑/↓), ranges, units and case; "≠" rows are real differences to act on.');
L.push('');

for (const [drugName, key] of Object.entries(DRUG_KEY)) {
  const ext = pharm.filter((r) => r.drug === drugName);
  const cur = meds[key]?.content?.dosing || [];
  L.push(`## ${drugName} (\`${key}\`) — PDF rows: ${ext.length}, current rows: ${cur.length}`);
  L.push('');

  // pair extracted rows to current rows by best demographic match
  const used = new Set();
  let drugIssues = 0;
  for (const e of ext) {
    let best = -1, bestScore = -1;
    cur.forEach((c, i) => {
      if (used.has(i)) return;
      const a = norm(e.demographic), b = norm(c.demographic);
      let score = a === b ? 100 : 0;
      if (!score) {
        const A = new Set(a.split(' ')), B = new Set(b.split(' '));
        let inter = 0; for (const w of A) if (B.has(w)) inter++;
        score = inter / Math.max(A.size, B.size);
      }
      if (score > bestScore) { bestScore = score; best = i; }
    });
    if (best < 0) {
      L.push(`- 🆕 **NEW in v6.2** (no current row): [${e.demographic}] ${e.route} — ${e.initialDose}`);
      drugIssues++; continue;
    }
    used.add(best);
    const c = cur[best];
    const diffs = [];
    if (norm(e.demographic) !== norm(c.demographic)) diffs.push(['demographic', e.demographic, c.demographic]);
    if (!eqTokens(e.initialDose, c.initial)) diffs.push(['initial', e.initialDose, c.initial]);
    if (!eqTokens(e.repeat, c.repeat)) diffs.push(['repeat', e.repeat, c.repeat]);
    if (!eqTokens(e.max, c.max)) diffs.push(['max', e.max, c.max]);
    // weight table comparison (paracetamol liquid)
    if (c.weightTable) {
      const extRows = parseWeightRows(e.initialDose);
      const curRows = c.weightTable.map((w) => `${w.weight}|${w.dose}|${w.volume}`).join(' ');
      const pdfRows = extRows.map((w) => `${w.weight}|${w.dose}|${w.volume}`).join(' ');
      if (extRows.length && norm(curRows) !== norm(pdfRows)) diffs.push(['weightTable', pdfRows, curRows]);
      else if (extRows.length) L.push(`- ✅ weightTable: ${extRows.length} rows match`);
    }
    if (diffs.length === 0) {
      L.push(`- ✅ [${e.demographic}] matches current [${c.demographic}]`);
    } else {
      for (const [f, pdfV, curV] of diffs) {
        L.push(`- ≠ **${f}** [${e.demographic}]`);
        L.push(`    - PDF v6.2: \`${pdfV}\``);
        L.push(`    - current : \`${curV}\``);
        drugIssues++;
      }
    }
  }
  cur.forEach((c, i) => {
    if (!used.has(i)) {
      L.push(`- 🗑 current-only row (not in v6.2 pharmacology): [${c.demographic}] ${c.route} — ${c.initial}${c.indication ? ` (${c.indication})` : ''}`);
      // not counted as an issue automatically — e.g. ondansetron duplicates per indication
    }
  });
  L.push('');
  summary.push({ drug: drugName, issues: drugIssues });
}

fs.mkdirSync('scripts/output', { recursive: true });
fs.writeFileSync('scripts/output/v6.2-meds-diff.md', L.join('\n'));
console.log('Diff → scripts/output/v6.2-meds-diff.md\n');
for (const s of summary) console.log(`${s.drug.padEnd(22)} ${s.issues === 0 ? '✅ no dose changes' : '≠ ' + s.issues + ' difference(s)'}`);
