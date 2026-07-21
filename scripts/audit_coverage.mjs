// scripts/audit_coverage.mjs
// Coverage audit: for every protocol, detect the SECTION HEADERS present on its
// v6.2 PDF pages and flag those with no corresponding content in the app. Surfaces
// where the original (v4.9) extraction simplified away workflow blocks / tables
// (e.g. Clinical Approach's Responder Action / Assess / Pause & Plan).
//
// Heuristic — headers in this CPG are short ALL-CAPS lines in a larger font.
// Output: scripts/output/v6.2-coverage-audit.md   (pnpm audit-coverage)

import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-fork');

const PDF = './source/Compiled_v6_2.pdf';

// contentData key -> inclusive [startPage,endPage] (same map as prose_diff)
const PAGE_MAP = {
  'vital-signs': [5, 6], 'clinical-flags': [7, 9], 'clinical-approach-fr': [10, 11],
  'paediatric-assessment-triangle': [12, 12], 'conscious-status-fr': [13, 15],
  'respiratory-assessment-fr': [16, 17], 'perfusion-assessment-fr': [18, 18],
  'pain-assessment': [19, 19], 'weight-calculations': [20, 20], 'ventilation-rates': [31, 31],
  'clinical-approach-cb': [119, 120], 'conscious-status-cb': [121, 121],
  'respiratory-assessment-cb': [122, 123], 'perfusion-assessment-cb': [124, 124],
  'altered-consciousness-fr': [33, 36], 'airway-obstruction-fr': [37, 38],
  'alcohol-intoxication': [39, 40], 'allergy-mild': [41, 42], 'anaphylaxis-fr': [43, 47],
  'asthma-fr': [48, 59], 'cardiac-arrest-fr': [66, 71], 'cardiac-chest-pain': [72, 74],
  'dehydration': [75, 76], 'falls': [77, 82], 'hypoglycaemia': [83, 85],
  'infection-sepsis': [86, 89], 'nausea-vomiting': [90, 91], 'pain-relief': [92, 95],
  'seizure': [96, 98], 'stroke': [99, 100],
  'general-trauma-fr': [102, 103], 'head-trauma': [104, 104], 'spinal-trauma': [105, 107],
  'burns': [109, 111], 'wound-care': [112, 117],
  'altered-consciousness-cb': [125, 125], 'airway-obstruction-cb': [126, 126],
  'anaphylaxis-cb': [127, 129], 'asthma-cb': [130, 133], 'cardiac-arrest-cb': [134, 135],
  'general-trauma-cb': [136, 136],
};

const GLYPHS = { '': '↑', '': '↓' };
const clean = (s) => s.replace(/[]/g, (m) => GLYPHS[m]).replace(/[-]/g, '');

// section-header-ish words we expect to matter (helps rank noise)
const KNOWN_HEADERS = /^(DEFINITION|RECOGNITION|STOP|PRIMARY SURVEY|SECONDARY SURVEY|RESPONDER|DANGERS|SAFETY|SEND|DISABILITY|EXPOSURE|ASSESS|ASSESSMENT|PAUSE|PLAN|MANAGEMENT|TREATMENT|TREAT|REFER|ESCALAT\w*|DOSING|CONSIDER\w*|NOTES?|FLOWCHART|COMPLICATIONS?|CAUTION|WARNING|RED FLAG|YELLOW FLAG|HISTORY|EXAMINATION|CONTRA?INDICATIONS?|INDICATIONS?|PRECAUTIONS?|ADVERSE|MONITORING|EQUIPMENT|PROCEDURE|POSITION\w*)/i;

async function pageItems(wanted) {
  const buf = fs.readFileSync(PDF);
  const out = {};
  let n = 0;
  await pdf(buf, {
    pagerender: (pd) => { n += 1; const me = n;
      return pd.getTextContent().then((tc) => {
        if (!wanted.has(me)) return '';
        out[me] = tc.items.map((it) => ({
          s: clean(it.str),
          y: it.transform[5],
          size: Math.hypot(it.transform[2], it.transform[3]),
        }));
        return '';
      });
    },
  });
  return out;
}

// join items into lines, return {text, size} per line
function lines(items) {
  const byY = {};
  for (const it of items) { if (!it.s.trim()) continue; const k = Math.round(it.y / 4) * 4; (byY[k] = byY[k] || []).push(it); }
  return Object.values(byY).map((row) => ({
    text: row.map((it) => it.s).join(' ').replace(/\s+/g, ' ').trim(),
    size: Math.max(...row.map((it) => it.size)),
  }));
}

function headersOf(items, titleUpper) {
  const ls = lines(items);
  const seen = new Set();
  const headers = [];
  for (const l of ls) {
    const t = l.text.replace(/^[✱▸⚠✚\s-]+/, '').trim(); // strip leading bullets/glyphs
    const letters = t.replace(/[^A-Za-z]/g, '');
    if (letters.length < 3) continue;
    const upperRatio = (t.replace(/[^A-Z]/g, '').length) / letters.length;
    const words = t.split(/\s+/).length;
    // CPG headers are short, ≤3-word, mostly-uppercase standalone lines (same font
    // size as body, so size can't gate — rely on caps + brevity).
    const isHeaderish =
      t.length <= 30 && words <= 3 && upperRatio >= 0.85 &&
      !/^CLINICAL PRACTICE|,\s*\d+$/.test(t) &&
      !t.startsWith(titleUpper.slice(0, 8));
    if (isHeaderish && !seen.has(t)) { seen.add(t); headers.push(t); }
  }
  return headers;
}

const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] || 0; };

async function loadContent() {
  const src = fs.readFileSync('src/data/contentData.js', 'utf8');
  const tmp = path.join(os.tmpdir(), `cd-audit-${process.pid}.mjs`);
  fs.writeFileSync(tmp, src);
  const m = await import('file://' + tmp);
  fs.unlinkSync(tmp);
  return { ...m.assessmentsContent, ...m.conditionsContent };
}

const content = await loadContent();
const wanted = new Set();
for (const [k, [a, b]] of Object.entries(PAGE_MAP)) if (content[k]) for (let p = a; p <= b; p++) wanted.add(p);
const pages = await pageItems(wanted);

const L = ['# Hatzolah CPG v6.2 — Content Coverage Audit', ''];
L.push('Per protocol: section headers detected on the v6.2 PDF pages, and whether the app');
L.push("content covers each. **GAP** = a CPG block with no matching app content — a candidate");
L.push('for content that was simplified away. Header detection is heuristic (short ALL-CAPS in a');
L.push('larger font), so skim for false positives.');
L.push('');

// count the visible words on the PDF pages (drops the repeated footer/glyphs)
const wordsIn = (s) => (s.toLowerCase().match(/[a-z0-9]+/g) || []);

const summary = [];
for (const [key, [a, b]] of Object.entries(PAGE_MAP)) {
  const proto = content[key];
  if (!proto) continue;
  let items = [];
  for (let p = a; p <= b; p++) items = items.concat(pages[p] || []);
  const pdfText = items.map((it) => it.s).join(' ');
  const headers = headersOf(items, (proto.title || key).toUpperCase());
  const appKeys = Object.keys(proto.content || {});
  const appBlob = JSON.stringify(proto.content || {}).toLowerCase();

  // Coverage ratio: fraction of the PDF's DISTINCT words that appear in the app
  // content. Robust to paraphrase; a low ratio means whole chunks are absent.
  const pdfWords = new Set(wordsIn(pdfText).filter((w) => w.length > 3));
  const appWords = new Set(wordsIn(appBlob));
  let hit = 0;
  for (const w of pdfWords) if (appWords.has(w)) hit += 1;
  const ratio = pdfWords.size ? hit / pdfWords.size : 1;

  const rows = headers.map((h) => {
    const hl = h.toLowerCase().replace(/[^a-z ]/g, '').trim();
    const compact = hl.replace(/\s/g, '');
    const covered =
      appBlob.includes(hl) || appBlob.includes(compact) ||
      appKeys.some((k) => { const kl = k.toLowerCase(); return kl.includes(compact) || hl.split(' ').every((w) => w.length < 3 || kl.includes(w)); });
    return { h, covered };
  });
  const uncovered = rows.filter((r) => !r.covered);
  summary.push({ key, page: `${a}${b > a ? '–' + b : ''}`, ratio, headers: headers.length, uncovered: uncovered.length, pdfWords: pdfWords.size });

  L.push(`\n## ${proto.title}  \`${key}\` — p${a}${b > a ? '–' + b : ''}  · coverage ${(ratio * 100).toFixed(0)}%`);
  L.push(`app content keys: ${appKeys.join(', ') || '(none)'}`);
  if (headers.length) {
    L.push('');
    L.push('CPG section headers detected (✅ present in app / 🔴 absent):');
    for (const r of rows) L.push(`- ${r.covered ? '✅' : '🔴'} ${r.h}`);
  }
  L.push('');
}

fs.mkdirSync('scripts/output', { recursive: true });
fs.writeFileSync('scripts/output/v6.2-coverage-audit.md', L.join('\n'));
console.log('Coverage audit → scripts/output/v6.2-coverage-audit.md\n');
console.log('Ranked by lowest PDF-word coverage (most likely to have dropped content):');
console.log('  coverage  uncovered-headers  protocol');
for (const s of summary.sort((x, y) => x.ratio - y.ratio).slice(0, 16)) {
  console.log(`   ${(s.ratio * 100).toFixed(0).padStart(3)}%      ${String(s.uncovered).padStart(2)}/${s.headers}            ${s.key} (p${s.page})`);
}
