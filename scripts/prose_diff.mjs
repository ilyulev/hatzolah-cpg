// scripts/prose_diff.mjs
// Full v6.2 prose re-parse: for every condition/assessment protocol, extract the
// QUANTITATIVE facts from its v6.2 pages (doses, thresholds, ages, times, rates)
// and check each appears in the app's curated content. Flags v6.2 facts that are
// absent — candidate missing/changed values for clinician review.
//
// Prose wording is deliberately NOT diffed (the app is curated paraphrase); only
// numbers-with-units carry clinical risk. Output: scripts/output/v6.2-prose-diff.md
// Does NOT modify contentData.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-fork');

const PDF = './source/Compiled_v6_2.pdf';

// contentData key -> inclusive [startPage, endPage] in the v6.2 PDF (from TOC)
const PAGE_MAP = {
  // assessments
  'vital-signs': [5, 6], 'clinical-flags': [7, 9], 'clinical-approach-fr': [10, 11],
  'paediatric-assessment-triangle': [12, 12], 'conscious-status-fr': [13, 15],
  'respiratory-assessment-fr': [16, 17], 'perfusion-assessment-fr': [18, 18],
  'pain-assessment': [19, 19], 'weight-calculations': [20, 20], 'ventilation-rates': [31, 31],
  'clinical-approach-cb': [119, 120], 'conscious-status-cb': [121, 121],
  'respiratory-assessment-cb': [122, 123], 'perfusion-assessment-cb': [124, 124],
  // conditions (FR/SR)
  'altered-consciousness-fr': [33, 36], 'airway-obstruction-fr': [37, 38],
  'alcohol-intoxication': [39, 40], 'allergy-mild': [41, 42], 'anaphylaxis-fr': [43, 47],
  'asthma-fr': [48, 59], 'cardiac-arrest-fr': [66, 71], 'cardiac-chest-pain': [72, 74],
  'dehydration': [75, 76], 'falls': [77, 82], 'hypoglycaemia': [83, 85],
  'infection-sepsis': [86, 89], 'nausea-vomiting': [90, 91], 'pain-relief': [92, 95],
  'seizure': [96, 98], 'stroke': [99, 100],
  // trauma
  'general-trauma-fr': [102, 103], 'head-trauma': [104, 104], 'spinal-trauma': [105, 107],
  'burns': [109, 111], 'wound-care': [112, 117],
  // CB (L1)
  'altered-consciousness-cb': [125, 125], 'airway-obstruction-cb': [126, 126],
  'anaphylaxis-cb': [127, 129], 'asthma-cb': [130, 133], 'cardiac-arrest-cb': [134, 135],
  'general-trauma-cb': [136, 136],
};

const GLYPHS = { '': '↑', '': '↓' };
const mapGlyphs = (s) => s.replace(/[]/g, (m) => GLYPHS[m]).replace(/[-]/g, '');

// Number (± comparison operator) + a *recognition/timing/threshold* unit.
// Dose units (mg/mcg/g/mL/puffs/J/ampoules) are deliberately excluded — dosing
// lives in the medication entries + dosing tables and was verified in those
// passes; including them here just re-flags med-entry content as "missing".
const UNIT = '(?:%|mmol\\/?L?|years?|months?|weeks?|hours?|mins?|minutes?|seconds?|BPM|bpm|kg|/min|x per min)';
const TOKEN_RE = new RegExp(`([↑↓≥≤<>]?\\s?\\d+(?:\\.\\d+)?(?:\\s*[–—-]\\s*\\d+(?:\\.\\d+)?)?)\\s*(${UNIT})\\b`, 'gi');

// normalise a fact token to a bare number+unit for a PRESENCE check ("is this
// value mentioned at all?"). Operators are stripped — their correctness was
// already verified in the dosing/table passes — so "<4 mmol/L" matches "4 mmol".
const normTok = (num, unit) =>
  (num + unit)
    .replace(/[↑↓≥≤<>＞＜]/g, '')
    .replace(/\s+/g, '')
    .replace(/[–—-]/g, '–')
    .replace(/minutes?/i, 'min').replace(/seconds?/i, 'sec')
    .replace(/mmol\/?l?/i, 'mmol').replace(/joules?/i, 'j').replace(/ampoules?/i, 'ampule')
    .toLowerCase();

async function pageText(wanted) {
  const buf = fs.readFileSync(PDF);
  const pages = {};
  let n = 0;
  await pdf(buf, {
    pagerender: (pd) => { n += 1; const me = n;
      return pd.getTextContent().then((tc) => {
        if (wanted.has(me)) pages[me] = tc.items.map((it) => mapGlyphs(it.str)).join(' ').replace(/\s+/g, ' ');
        return '';
      });
    },
  });
  return pages;
}

async function loadContent() {
  const src = fs.readFileSync('src/data/contentData.js', 'utf8');
  const tmp = path.join(os.tmpdir(), `cd-prose-${process.pid}.mjs`);
  fs.writeFileSync(tmp, src);
  const m = await import('file://' + tmp);
  fs.unlinkSync(tmp);
  return { ...m.assessmentsContent, ...m.conditionsContent };
}

const content = await loadContent();
const wanted = new Set();
for (const [k, [a, b]] of Object.entries(PAGE_MAP)) { if (content[k]) for (let p = a; p <= b; p++) wanted.add(p); }
const pages = await pageText(wanted);

const L = ['# Hatzolah CPG v6.2 — Prose Re-Parse (quantitative facts)', ''];
L.push('For each protocol: v6.2 number-with-unit facts **not found** in the app content.');
L.push('These are candidates for a missing/changed value — verify against the PDF. Wording-only');
L.push('differences are intentionally ignored (the app is curated paraphrase). Page-range overlap');
L.push('can cause false positives (a fact from an adjacent protocol on a shared page).');
L.push('');

let totalFlags = 0;
const summary = [];

for (const [key, range] of Object.entries(PAGE_MAP)) {
  const proto = content[key];
  if (!proto) continue;
  const [a, b] = range;
  let pdfText = '';
  for (let p = a; p <= b; p++) pdfText += ' ' + (pages[p] || '');
  const appText = JSON.stringify(proto.content || {});
  // build the set of app fact-tokens (normalised)
  const appTokens = new Set();
  for (const m of appText.matchAll(TOKEN_RE)) appTokens.add(normTok(m[1], m[2]));

  // v6.2 fact-tokens, dedup, keep first context snippet
  const seen = new Map();
  for (const m of pdfText.matchAll(TOKEN_RE)) {
    const t = normTok(m[1], m[2]);
    if (!seen.has(t)) {
      const i = Math.max(0, m.index - 30);
      seen.set(t, { raw: (m[1] + ' ' + m[2]).replace(/\s+/g, ' ').trim(), ctx: pdfText.slice(i, m.index + m[0].length + 20).replace(/\s+/g, ' ').trim() });
    }
  }
  const missing = [...seen.entries()].filter(([t]) => !appTokens.has(t));
  summary.push({ key, page: `${a}${b > a ? '–' + b : ''}`, missing: missing.length });
  if (missing.length === 0) continue;
  totalFlags += missing.length;
  L.push(`\n## ${proto.title}  \`${key}\` — p${a}${b > a ? '–' + b : ''}  (${missing.length} to check)`);
  L.push('');
  for (const [, info] of missing) L.push(`- \`${info.raw}\`  ·  …${info.ctx}…`);
  L.push('');
}

L.unshift('');
L.unshift(`**${totalFlags} candidate fact(s) flagged across ${summary.length} protocols.**`);

fs.mkdirSync('scripts/output', { recursive: true });
fs.writeFileSync('scripts/output/v6.2-prose-diff.md', L.join('\n'));
console.log('Prose diff → scripts/output/v6.2-prose-diff.md');
console.log(`${totalFlags} candidate facts flagged.`);
console.log('\nPer-protocol (missing facts):');
for (const s of summary.sort((a, b) => b.missing - a.missing)) if (s.missing) console.log(`  ${s.key.padEnd(30)} p${s.page.padEnd(8)} ${s.missing}`);
