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
import path from 'path';
import { pathToFileURL } from 'url';

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

// App-authored content keys whose value is a JS identifier imported at the top of
// contentData.js, not literal data (e.g. wound-care's dressingPhotos points at
// the base64 image module). The regen JSONs cannot express an import, and
// serialising the resolved value would inline ~75 KB of base64 into this file, so
// these are re-emitted as the bare identifier and left in their natural position.
// Shape: exportName -> protocolKey -> { contentKey: identifier }.
const APP_AUTHORED_REFS = {
  conditionsContent: { 'wound-care': { dressingPhotos: 'woundDressingPhotos' } },
};

// The `photo` token on a dosing entry naming the device photograph to draw
// beside it (see src/data/extensions/devicePhotos.js). Like dressingPhotos this
// is app-authored - the regen JSONs are built from the text layer and know
// nothing about it - so it has to be re-applied after regeneration or the next
// assemble run silently deletes the photos.
//
// Rules match on the ROUTE TEXT rather than an array index: if regeneration
// reorders or rewrites the dosing table, a stale index would quietly attach the
// adult Epi-Pen photo to the paediatric dose. Matching on the route either finds
// the right row or finds nothing, and finding nothing is a hard error below.
const DOSING_PHOTO_RULES = [
  { route: /Epi-Pen\s*—\s*yellow device/, photo: 'epipen-adult' },
  { route: /Epi-Pen\s*—\s*green device/, photo: 'epipen-jr' },
  { route: /^pMDI/, photo: 'pmdi-puffer' },
];
// Only these protocols carry device photos: p129 and p132 are the only pages in
// the CPG that print one, plus the Pharmacology entries for the same two drugs.
// The FR versions of Anaphylaxis and Asthma are deliberately absent - their own
// pages show no photograph.
const DOSING_PHOTO_PROTOCOLS = {
  conditionsContent: ['anaphylaxis-cb', 'asthma-cb'],
  medicationsContent: ['adrenaline', 'salbutamol-cb', 'salbutamol-fr'],
};

// A pre-formatted expression the serialiser emits verbatim (no quoting), so an
// imported identifier survives the eval → re-serialise round-trip.
class Raw {
  constructor(code) { this.code = code; }
}

// ── JS literal serialiser (keeps the file idiomatic: bare keys, single quotes) ──
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
const key = (k) => (IDENT.test(k) ? k : q(k));

function ser(v, ind) {
  const pad = '  '.repeat(ind);
  const padIn = '  '.repeat(ind + 1);
  if (v === null) return 'null';
  if (v instanceof Raw) return v.code;
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
// Write the temp copy ALONGSIDE contentData.js, not in os.tmpdir(): the module
// carries relative imports (e.g. ./extensions/woundDressingPhotos.js) that only
// resolve from src/data/. Importing from /tmp threw ERR_MODULE_NOT_FOUND.
const tmp = path.join(path.dirname(FILE), `.cd-assemble-${process.pid}.mjs`);
fs.writeFileSync(tmp, src);
let mod;
try {
  // pathToFileURL, not 'file://' + tmp: this path is relative, so string
  // concatenation yields file://src/data/... where "src" parses as the URL HOST
  // and node rejects it (ERR_INVALID_FILE_URL_HOST).
  mod = await import(pathToFileURL(tmp).href);
} finally {
  // finally, not a bare unlink: a failed import used to leave the temp module
  // behind in src/data/, where it got swept into a commit.
  fs.rmSync(tmp, { force: true });
}
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
  // Re-emit app-authored import references (e.g. dressingPhotos) as bare
  // identifiers instead of the resolved base64 blobs. Overwrites an existing key
  // in place (order preserved) or appends when regeneration omitted it.
  const refs = APP_AUTHORED_REFS[exportName]?.[k];
  if (refs) {
    entry = { ...entry, content: { ...(entry.content || {}) } };
    for (const [ck, ident] of Object.entries(refs)) {
      const had = ck in entry.content;
      entry.content[ck] = new Raw(ident);
      report.push(`  ${''.padEnd(12)} ${k.padEnd(34)} ${had ? 'kept' : 'added'} app-ref ${ck} = ${ident}`);
    }
  }
  // Re-apply the device-photo tokens on dosing rows (see DOSING_PHOTO_RULES).
  if (DOSING_PHOTO_PROTOCOLS[exportName]?.includes(k)) {
    const dosing = entry.content?.dosing;
    if (!Array.isArray(dosing)) throw new Error(`${k}: expected a dosing array to attach device photos to`);
    let hits = 0;
    const patched = dosing.map((d) => {
      const rule = DOSING_PHOTO_RULES.find((r) => r.route.test(d.route || ''));
      if (!rule) return d;
      hits++;
      return { ...d, photo: rule.photo };
    });
    if (!hits) throw new Error(`${k}: no dosing route matched a device-photo rule - did the route wording change?`);
    entry = { ...entry, content: { ...entry.content, dosing: patched } };
    report.push(`  ${''.padEnd(12)} ${k.padEnd(34)} device photo on ${hits} dosing row(s)`);
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
