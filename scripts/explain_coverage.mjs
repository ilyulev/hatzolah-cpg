// Explain a coverage number from `pnpm audit-coverage`.
//
// That metric is the fraction of DISTINCT words on a protocol's CPG pages that
// also appear in its app content. It never reaches 100%, and the shortfall is
// mostly measurement artifact, not missing content:
//
//   * mnemonic letter tiles - the CPG draws the leading capital of each mnemonic
//     word as its own coloured glyph, so pdf.js emits "A" and "lcohol" as two
//     items and "lcohol" is counted as a page word the app lacks
//   * camelCase keys - `exampleAntigens` tokenises to one word, so the page's
//     "EXAMPLE ANTIGENS" heading reads as two absent words
//   * schema field names - the CPG says "maximum", the dosing card field is `max`
//   * word forms - "Foods" vs "Food", singular vs plural
//   * deliberate typo corrections - the CPG's "rational" is stored as "rationale"
//
// Numbers absent are the ones that matter: a digit on the page and not in the
// app is a real gap. This prints them separately.
//
//   node scripts/explain_coverage.mjs                       # sample protocols
//   node scripts/explain_coverage.mjs dehydration:75-76     # a specific one
import fs from 'fs';
import { loadAllProtocols } from './lib/load_content.mjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-fork');

const PDF = './source/Compiled_v6_2.pdf';
const GLYPHS = { '': '↑', '': '↓' };
const clean = (s) => s.replace(/[]/g, (m) => GLYPHS[m]).replace(/[-]/g, '');

const DEFAULTS = {
  'respiratory-assessment-fr': [16, 17],
  'clinical-approach-fr': [10, 11],
  'altered-consciousness-fr': [33, 36],
  'dehydration': [75, 76],
  'anaphylaxis-cb': [127, 129],
};
// argv form: key:start-end
const TARGETS = process.argv.length > 2
  ? Object.fromEntries(process.argv.slice(2).map((a) => {
      const [k, r] = a.split(':');
      const [s, e] = (r || '').split('-').map(Number);
      if (!k || !s || !e) throw new Error(`bad arg "${a}" - expected key:start-end`);
      return [k, [s, e]];
    }))
  : DEFAULTS;

const wanted = new Set();
for (const [a, b] of Object.values(TARGETS)) for (let p = a; p <= b; p++) wanted.add(p);

const pages = {};
let n = 0;
await pdf(fs.readFileSync(PDF), {
  pagerender: (pd) => {
    n += 1; const me = n;
    return pd.getTextContent().then((tc) => {
      if (wanted.has(me)) pages[me] = tc.items.map((i) => clean(i.str)).join(' ');
      return '';
    });
  },
});

const all = await loadAllProtocols();

const words = (s) => (s.toLowerCase().match(/[a-z0-9]+/g) || []);

// page furniture: the protocol title words, section banners, boilerplate
const FURNITURE = new Set(words(
  'clinical practice guidelines hatzolah melbourne assessments general management trauma level pharmacology page ' +
  'definition recognition management notes further stop consider assess'
));

for (const [key, [a, b]] of Object.entries(TARGETS)) {
  const proto = all[key];
  if (!proto) { console.log(`\n### ${key}: NOT IN APP`); continue; }
  let text = '';
  for (let p = a; p <= b; p++) text += ' ' + (pages[p] || '');
  const pdfWords = new Set(words(text).filter((w) => w.length > 3));
  const appWords = new Set(words(JSON.stringify(proto.content).toLowerCase()));
  const missing = [...pdfWords].filter((w) => !appWords.has(w));
  const ratio = ((pdfWords.size - missing.length) / pdfWords.size * 100).toFixed(0);

  const titleWords = new Set(words(proto.title));
  const furniture = missing.filter((w) => FURNITURE.has(w) || titleWords.has(w));
  const numeric = missing.filter((w) => /^\d+$/.test(w) && !FURNITURE.has(w) && !titleWords.has(w));
  const rest = missing.filter((w) => !FURNITURE.has(w) && !titleWords.has(w) && !/^\d+$/.test(w));

  console.log(`\n### ${key}  p${a}-${b}  coverage ${ratio}%  (${missing.length} of ${pdfWords.size} distinct words absent)`);
  console.log(`  page furniture / title repeats (${furniture.length}): ${furniture.join(' ') || '-'}`);
  console.log(`  NUMBERS absent (${numeric.length}): ${numeric.join(' ') || '-'}   <-- these matter most`);
  console.log(`  other words (${rest.length}): ${rest.join(' ')}`);
}
