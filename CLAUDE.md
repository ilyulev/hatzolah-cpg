# CLAUDE.md — Hatzolah CPG: Full Project Context

## What This Project Is
A mobile-first offline PWA for Hatzolah Melbourne first responders to access Clinical Practice
Guidelines (CPG) in the field. The core feature is **practice level filtering**: each responder
selects their qualification level (CB / FR / SR) and the app shows only the protocols they are
authorised to perform, while making higher-level protocols visible as read-only reference.

**Project path:** `/Users/ilyulev/Projects/hatzolah-cpg`
**Package manager:** pnpm exclusively. Never use npm or npx.
**Stack:** React 18 + Vite 7 + Tailwind CSS v4 + lucide-react
**Deploy target:** GitHub Pages at `https://ilyulev.github.io/hatzolah-cpg/`

**Content version: v6.2.** `src/data/contentData.js` was rebuilt page-by-page from the v6.2 PDF
(all 163 pages). Do not treat it as v4.9 — that edition is gone. See *Content Pipeline* before
changing protocol content.

---

## Project Status (verified on disk)

```
src/App.jsx                     five-section shell + per-section drill-down stacks
src/data/contentData.js         60 protocols @ v6.2
src/data/extensions/            app-authored content (alerts, info, halakha)
src/components/                 12 components (see UI Architecture)
src/hooks/useUserLevel.js       localStorage-backed level
scripts/                        content pipeline + audit tooling
source/Compiled_v6_2.pdf        source CPG (gitignored — keep a local copy)
```

There is **no** `tailwind.config.js` or `postcss.config.js`, and there should not be — this project
uses Tailwind v4 (see *Tailwind v4 Setup*).

### Content inventory
| Group | Count | Export |
|---|---|---|
| Assessments | 16 | `assessmentsContent` |
| Conditions (incl. Trauma + Level 1) | 29 | `conditionsContent` |
| Medications | 15 | `medicationsContent` |
| **Total** | **60** | |

By level: `ALL` 6 · `CB` 11 · `FR` 39 · `SR` 4.

---

## Practice Level System

### The Three Levels
| ID | Full Name | Colour | Scope |
|----|-----------|--------|-------|
| CB | Code Blue (Level 1) | Blue | Basic first aid. Simplified protocols. Epi-Pen and Glucose Paste only. Every CB incident must be escalated to Ambulance or FR/SR. |
| FR | First Responder | Green | Full paramedic scope. Oral and nebulised medications. 12-lead ECG if accredited. |
| SR | Senior Responder | Amber | All FR scope plus IV access, IM injections (Glucagon, Midazolam), nebulised Ipratropium. |

### Visibility Rules
```
CB user → CAN PERFORM:  CB protocols only
          REFERENCE:    nothing
FR user → CAN PERFORM:  FR protocols
          REFERENCE:    CB protocols (greyed out, amber "Reference Only" banner)
SR user → CAN PERFORM:  SR protocols + FR protocols
          REFERENCE:    CB protocols (greyed out, amber "Reference Only" banner)
```

**In code** (`src/data/contentData.js` — do not modify, these are medical authorisation rules):
```javascript
export const CAN_PERFORM = {
  CB: ['CB'],
  FR: ['FR'],
  SR: ['SR', 'FR'],
};
export const REFERENCE_ONLY = {
  CB: [],
  FR: ['CB'],
  SR: ['CB'],
};
```

### `ALL` and `universal: true`
`PRACTICE_LEVELS.ALL` is a **display-only pseudo-level** for foundational content every responder
needs. It is never a `userLevel`. A protocol with level `ALL` **must also carry `universal: true`**,
or the scope filters treat it as out-of-scope and it disappears from every level:

```javascript
'vital-signs': { title: '…', level: 'ALL', universal: true, … }
```
Currently universal: `vital-signs`, `clinical-flags`, `time-critical`, `safety-netting`,
`adrenaline`, `glucose-paste`.

`SELECTABLE_LEVELS = ['CB', 'FR', 'SR']` is what LevelSelection and Settings iterate — never
iterate `PRACTICE_LEVELS` for a level picker, or `ALL` leaks into the UI.

### Protocol Versioning — Critical Rule
Several protocols exist at **multiple levels** as distinct entries. The CB version is a
simplified subset; the FR/SR version has full clinical depth. They are stored as **separate
objects with separate keys**:
```javascript
'anaphylaxis-cb': { title: 'Anaphylaxis (L1)', level: 'CB', … }   // simplified L1 version
'anaphylaxis-fr': { title: 'Anaphylaxis',      level: 'FR', … }   // full FR version
```

**The 11 dual-level protocols:** clinical-approach, conscious-status, respiratory-assessment,
perfusion-assessment, altered-consciousness, airway-obstruction, anaphylaxis, asthma,
cardiac-arrest, general-trauma, salbutamol.

**Do not merge** CB and FR versions into a single entry.

---

## Content Data Schema

### Protocol object shape
```javascript
'protocol-key': {
  title:      'Human-readable title',
  level:      'CB' | 'FR' | 'SR' | 'ALL',
  universal:  true,               // REQUIRED when level is 'ALL', omit otherwise
  category:   'primary' | 'cardiac' | …,   // must be a key of CATEGORY_COLORS
  summary:    'One sentence shown on the tile',
  content:    { … },              // see Content Vocabulary
}
```

### Content Vocabulary
`content` is an object whose keys are **section names taken from the CPG's own headings**,
camelCased (`FURTHER NOTES` → `furtherNotes`). Sections render top-to-bottom in insertion order.
There are ~120 distinct section keys across the app — that is expected, not a smell.

`ProtocolView.renderValue` dispatches on **shape**, so only these shapes render properly:

| Shape | Renders as |
|---|---|
| `string` | paragraph |
| `string[]` | bullet list |
| `{ headers, rows }` | table (green header, sticky first column, scrolls internally) |
| `{ if, then }[]` | IF → THEN rule rows |
| `{ trigger, actions[] }` (key `stop`) | red STOP block, rendered unwrapped |
| `{ options: [{ label, criteria[], action }] }` | disposition / outcome cards |
| `{ label, … }[]` (key `ageBands`) | age-band tabs, one band visible at a time |
| `dosing: [{ route, dose, … }]` | dosing cards |
| `{ letter, meaning }[]` or `"D — meaning"[]` | mnemonic table |
| `{ score, face, label }[]` | Wong-Baker faces scale |
| `{ side, signs[] }[]` | Paediatric Assessment Triangle diagram |
| `{ branches: [...] }` | tappable jump-link chips |
| nested object | nested subsection |
| key starting `_` | hidden (metadata, e.g. `_flowchart`) |

Keep tables to **≤5 columns**; split a wider CPG table into several sharing a key column.

### Section colours
`sectionColor()` matches `SECTION_COLORS` exactly first, then falls back to the heading's sense:
red for `stop|immediate|redflag|danger|donot|critical|contraindication|adverse|primarysurvey|
rapidassessment|haemorrhage`, amber for `yellowflag|precaution|caution`, green for
`definition|recognition|principle|overview|indication|furthernote`, navy otherwise.
Add an exact `SECTION_COLORS` entry only when the fallback gets it wrong.

---

## Category System
Every protocol's `category` must be a key of **both** `CATEGORY_COLORS` and `CATEGORY_META`
(both live in `contentData.js`; the keys must stay in sync).

```
primary  cardiac  respiratory  neuro  trauma  medical  paediatric
obstetric  endocrine  analgesia  fluids  gastro  allergy  emergency
```

```javascript
export const CATEGORY_META   = { primary: { emoji: '🔍', label: 'Primary Assessment' }, … };
export const CATEGORY_COLORS = { primary: { bg: '#e0e7ff', icon: '#4338ca', label: 'Primary' }, … };
```

`CATEGORY_META` was previously duplicated inside HomeScreen and CategoryView; adding a category to
one and not the other silently produced a 📋 tile with a lowercase label. It is now imported from
`contentData.js` by both. **Adding a category means adding it to both maps in that one file.**

Level badges are coloured by `PRACTICE_LEVELS[level]`, never by category.

---

## UI Architecture

### Five-section shell (App.jsx)
```
BottomNav: Home │ Meds │ Alerts │ Info │ Halakha
```
Each section keeps its **own drill-down stack**, so switching tabs preserves where you were.
Tapping the already-active tab does not reset its stack.

- **Home / Meds** — content sourced from the CPG.
- **Alerts / Info / Halakha** — app-authored extensions in `src/data/extensions/`.

Content that is not in the CPG must not sit silently inside a Home/Meds protocol. If it belongs
there (e.g. the DOLORS / OPQRST pain mnemonics), label it: those render under a section whose
`note` states plainly that they are not CPG content.

### View state (Home section)
```
no level set → LevelSelection
'home'       → HomeScreen (category tile grid)
'category'   → CategoryView (protocol list)
'protocol'   → ProtocolView (quick view + 📖 detail modal)
'settings'   → Settings (level change with confirmation)
```

### Persistence
```
localStorage key:  'hatzolah_cpg_level'
value:             'CB' | 'FR' | 'SR'
```

### ProtocolView — fixed header rule (NON-NEGOTIABLE)
The header containing the 📖 (detailed view) button **must never scroll**. Use flex layout —
**do not remove `flex-shrink-0`** from the header. The detailed view opens as a full-screen modal
overlay (`fixed inset-0`, `z-50`) with its own scroll area and the same flex pattern.

### QuickProtocolContent — do not re-add early returns
It used to special-case five protocol shapes (medication, management, flags, table, steps), each
returning early after rendering a hand-picked set of keys — which **silently hid every other
section**. Every section now flows through the generic renderer. If a protocol needs bespoke
presentation, add a shape to `renderValue`, never an early return keyed on a content field.

### Reference Only banner
```jsx
<div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
  <p className="text-amber-800 text-sm font-medium">
    ⚠️ Reference Only — this protocol is outside your practice scope
  </p>
</div>
```

### lucide-react icons
Pinned at 0.263, which uses the **older icon names**: `AlertTriangle` (not `TriangleAlert`),
`AlertOctagon` (not `OctagonAlert`). Check an icon exists before importing:
```bash
node -e "console.log('AlertOctagon' in require('lucide-react'))"
```

---

## Content Pipeline (v6.2)

The CPG draws flowcharts, diagrams, scales and coloured algorithm blocks as **graphics**. pdf.js
text extraction drops them silently, leaving a blank gap. That is how earlier editions of this app
ended up with a Paediatric Assessment Triangle carrying invented signs and a Wong-Baker scale with
no faces. **Never rebuild protocol content from the text layer alone — read the rendered page.**

```bash
pnpm render-pages     # all 163 pages → scripts/output/pages/pNNN.png (macOS PDFKit, no poppler)
pnpm pagemap          # page → protocol map from the page footers + graphic-gap detection
```

To change protocol content:
1. Read the rendered page image for that protocol.
2. Edit `scripts/output/regen/<key>.json` (the per-protocol source of truth for assembly).
3. `node scripts/assemble_content.mjs <assessments|conditions|medications>` — splices one export
   block into `contentData.js` and leaves the rest byte-identical. It preserves each protocol's
   curated `title`/`level`/`category` (level is an authorisation decision) and lets `summary`
   follow the content.
4. `pnpm build`, then verify in the browser at 375px.

Derived artifacts under `scripts/output/{pages,content,audit,regen}/` are gitignored and
regenerable. The audit report `scripts/output/v6.2-page-audit.md` is tracked.

### Photographs — the complete inventory
The CPG's raster images were enumerated from the PDF's own image XObjects (via the pdf.js build
inside `pdf-parse-fork`). **There are no others — do not go looking, and never source a product
photo from outside the CPG.** In particular the whole Pharmacology section (p138–163) is text and
vector fill: not one of the 15 drug pages carries a photograph.

| Page | Image | Status |
|---|---|---|
| p1, p4, p32, p101, p118, p137 | cover + section dividers | not used |
| p12 | Paediatric Assessment Triangle | rendered as an SVG |
| p19 | pain faces scale | rendered as a shape |
| p117 | three wound dressings | `extensions/woundDressingPhotos.js` |
| p129, p132 | Epi-Pen, Epi-Pen Jr, blue pMDI puffer | `extensions/devicePhotos.js` |

A dosing entry names a device photo with a token (`photo: 'epipen-adult'`) that `ProtocolView`
resolves against `devicePhotos`; the base64 never enters `contentData.js`. Because the regen JSONs
are built from the text layer and know nothing about it, `assemble_content.mjs` re-applies the
tokens after regeneration by matching on the **route text** (never an array index — a stale index
would attach the adult photo to the paediatric dose). `pnpm check-device-photos` fails on a token
that does not resolve, since an unknown token renders nothing at all.

### Rules learned the hard way
- The CPG is the only authority. Do not fill gaps from general medical knowledge, and do not
  "correct" the CPG toward standard practice. Invented content caused real defects here.
- Transcribe CPG typos' **meaning** correctly for clinical terms (`Cyanoisis` → Cyanosis,
  `lighting strikes` → lightning) and record the deviation.
- Comparison operators: the CPG prints ↑ for above and ↓ for below. Render as `≥` and `<`
  (the glyphs, not `>=`), consistently, so ranges partition with no ambiguous boundary.
- Watch for age-boundary collisions: an explicit `15 years` row plus `≥ 15 years` makes a
  15-year-old match two rows with different thresholds. Use `> 15 years` there.

---

## Tailwind v4 Setup
No `tailwind.config.js` / `postcss.config.js`. Plugin `@tailwindcss/vite` in `vite.config.js`;
`src/index.css` starts with `@import "tailwindcss";`.

`vite.config.js` serves dev from `/` and builds to `/hatzolah-cpg/` (GitHub Pages), and honours
`process.env.PORT`. The service worker is registered only off localhost, so dev never serves stale
cached assets.

---

## pnpm Commands
```bash
pnpm install                 # install dependencies
pnpm dev                     # Vite dev server (port 3000)
pnpm build                   # production build → dist/
pnpm preview                 # serve production build
pnpm deploy                  # build + push to gh-pages
```

Content pipeline: `render-pages`, `pagemap`, `extract-pdf`, `extract-tables`, `compare-tables`,
`prose-diff`, `audit-coverage`.

### pnpm 11 note
`pnpm-workspace.yaml` carries `allowBuilds: { esbuild: true }`. Without it, pnpm 11 treats
`ERR_PNPM_IGNORED_BUILDS` as fatal and `pnpm dev` / `pnpm build` exit 1. pnpm 11 **no longer reads
the `pnpm` field in package.json** — settings live in `pnpm-workspace.yaml`. Use
`pnpm approve-builds --all` (non-interactive) rather than editing package.json.

---

## Constraints
- **pnpm only** — never npm, never npx.
- **No react-router** — routing is a view state machine in App.jsx.
- **No Redux / Zustand** — React state + localStorage only.
- **No backend** — pure static PWA, all data in contentData.js.
- **Tailwind v4 only** — no v3 config files.
- **Do not modify** `CAN_PERFORM` / `REFERENCE_ONLY` — medical authorisation rules.
- **Do not remove** `flex-shrink-0` from the ProtocolView header.
- **Do not merge** CB and FR versions of dual-level protocols.
- **Do not add early returns** to `QuickProtocolContent`.
- Protocol content changes go through the content pipeline, verified against the rendered page.

## Deployment
GitHub Pages at `https://ilyulev.github.io/hatzolah-cpg/`.
```bash
pnpm build && pnpm deploy
```
