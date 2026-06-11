# CLAUDE.md — Hatzolah CPG: Full Project Context

## What This Project Is
A mobile-first offline PWA for Hatzolah Melbourne first responders to access Clinical Practice
Guidelines (CPG) in the field. The core feature is **practice level filtering**: each responder
selects their qualification level (CB / FR / SR) and the app shows only the protocols they are
authorised to perform, while making higher-level protocols visible as read-only reference.

**Project path:** `/Users/ilyulev/Projects/hatzolah-cpg`
**Package manager:** pnpm exclusively. Never use npm or npx.
**Stack:** React 18 + Vite + Tailwind CSS (v4) + lucide-react
**Deploy target:** GitHub Pages at `https://ilyulev.github.io/hatzolah-cpg/`

> ⚠️ **Content version:** the protocol data currently in `src/data/contentData.js` is the
> **v4.9 edition** (14.08.2024), extracted into `pdf-structure.json`. The **target is v6.2** —
> the content needs re-extraction once the v6.2 PDF is supplied locally. See *PDF Re-Extraction*.

---

## Project Status (verified on disk)
The project is **already scaffolded and runs**. This is a status snapshot, not a to-do list.

```
✅ package.json            (pnpm, correct scripts + deps)
✅ pnpm-lock.yaml
✅ vite.config.js          (Tailwind v4 plugin, base /hatzolah-cpg/)
✅ index.html
✅ src/index.css           (@import "tailwindcss";)
✅ src/App.jsx             (view-state machine)
✅ src/main.jsx
✅ src/data/contentData.js (55 protocols @ v4.9 — 15 CB / 36 FR / 4 SR)
✅ src/data/workflowDiagrams.js
✅ src/hooks/useUserLevel.js
✅ src/components/{LevelSelection,HomeScreen,CategoryView,ProtocolView,Settings}.jsx
✅ pdf-structure.json      (raw extracted PDF structure, v4.9)

⏳ Re-extract content to v6.2 (needs the v6.2 PDF on disk — see below)
```

There is **no** `tailwind.config.js` or `postcss.config.js`, and there should not be — this project
uses Tailwind v4 (see *Tailwind v4 Setup*).

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

### Protocol Versioning — Critical Rule
Several protocols exist at **multiple levels** as distinct entries. The CB version is a
simplified subset; the FR/SR version has full clinical depth. They are stored as **separate
objects with separate keys** (confirmed present in `contentData.js`):
```javascript
// Two separate entries — NOT one entry with conditional content
'anaphylaxis-cb': { title: 'Anaphylaxis', level: 'CB', ... }   // simplified L1 version
'anaphylaxis-fr': { title: 'Anaphylaxis', level: 'FR', ... }   // full FR version
```

**Protocols with dual CB + FR versions:**
- Clinical Approach
- Conscious Status Assessments
- Respiratory Status Assessment
- Perfusion Status Assessment
- Altered/Acute Altered Consciousness
- Airway Obstruction
- Anaphylaxis
- Asthma / Wheeze
- Cardiac Arrest
- General Trauma Approach

For these protocols:
- A CB user sees only the CB version in "My Scope"
- An FR user performs the FR version and sees the CB version as reference
- The CB version key always ends in `-cb`; the FR version in `-fr`

**Do not merge** CB and FR versions of dual-level protocols into a single entry.

---

## PDF Source (v6.2 — to be supplied)
The v6.2 PDF is **not in the repo** and is not on this machine (it lived in the original web-chat
sandbox). To re-extract, place it locally, e.g.:
```
./source/Compiled_v6_2.pdf    (163 pages, ~2.4 MB)
```

### Confirmed PDF Structure (from TOC extraction)
```
Pages 1–3    Cover + Contents
Pages 4–31   ASSESSMENTS
  p5    Vital Sign Values
  p7    Clinical Flags
  p10   Clinical Approach
  p12   Paediatric Assessment Triangle
  p13   Conscious Status Assessments
  p16   Respiratory Status Assessment
  p18   Perfusion Status Assessment
  p19   Pain Assessments
  p20   Weight Calculations
  p21   Time Critical Guidelines
  p27   Safety Netting
  p31   Ventilation Rates
Pages 32–100 CONDITIONS (FR/SR)
  p33   Altered Consciousness (Acute)
  p37   Airway Obstruction
  p39   Alcohol Intoxication
  p41   Allergy (Mild)
  p43   Anaphylaxis
  p48   Asthma / Wheeze
    p49   Adult / 16+ years
    p51   12 to 15 years
    p53   6 to 11 years
    p55   2 to 5 years
  p60   Birth & Newborn Resuscitation
  p66   Cardiac Arrest
  p72   Cardiac Chest Pain / Discomfort
  p75   Dehydration
  p77   Falls
  p83   Hypoglycaemia
  p86   Infection / Sepsis
  p90   Nausea / Vomiting
  p92   Pain Relief (Non-Cardiac)
  p96   Seizure
  p99   Stroke (Acute)
Pages 101–117  TRAUMA (FR/SR)
  p102  General Trauma Approach
  p104  Head Trauma
  p105  Spinal Trauma
  p108  Chest Trauma
  p109  Burns
  p112  Wound Care
Pages 118–136  LEVEL 1 (CB) GUIDELINES
  p119  Clinical Approach (L1)
  p121  Conscious Status Assessments (L1)
  p122  Respiratory Status Assessment (L1)
  p124  Perfusion Status Assessment (L1)
  p125  Acute Altered Consciousness (L1)
  p126  Airway Obstruction (L1)
  p127  Anaphylaxis (L1)
  p130  Asthma / Wheeze (L1)
  p134  Cardiac Arrest (L1)
  p136  General Trauma Approach (L1)
Pages 137–163  PHARMACOLOGY (all levels)
  p138  Adrenaline
  p140  Aspirin
  p142  Cetirizine
  p143  Glucagon
  p144  Glucose Paste
  p145  Glyceryl Trinitrate (GTN)
  p147  Ipratropium Bromide
  p149  Methoxyflurane
  p151  Midazolam
  p153  Normal Saline
  p155  Ondansetron
  p157  Oxygen
  p159  Paracetamol
  p162  Salbutamol
```

---

## Content Data Schema

### Protocol object shape
```javascript
'protocol-key': {
  title:    'Human-readable title',          // string
  level:    'CB' | 'FR' | 'SR',             // practice level
  category: 'cardiac' | 'respiratory' | …,  // see Category System below
  summary:  'One sentence shown on tile',    // ≤ 120 chars
  content:  { … },                          // structure depends on protocol type
}
```

### Content structure by protocol type
**Assessments** (vital signs tables, clinical flags, mnemonics):
```javascript
content: {
  notes: ['string', …],
  table: {
    headers: ['col1', 'col2', …],
    rows: [['cell', 'cell', …], …],     // rows as arrays of strings
  },
  definition: { red: 'string', yellow: 'string' },   // for clinical flags
  redFlags: { adultsAndPaediatrics: […], paediatric: […] },
  yellowFlags: […],
  mnemonic: [{ letter: 'A', meaning: 'Airway' }, …],
}
```

**Conditions / Protocols** (e.g. Anaphylaxis, Cardiac Arrest):
```javascript
content: {
  recognition: ['sign/symptom string', …],
  management: ['step string', …],          // ordered steps
  notes: ['clinical note', …],
  escalation: 'escalation criteria string',
  // for age-banded protocols (e.g. Asthma):
  ageBands: [
    {
      label: 'Adult / 16+ years',
      management: ['step', …],
      dosing: [{ drug: 'Salbutamol', dose: '…', route: '…', repeat: '…' }],
    },
    …
  ],
}
```

**Medications** (pharmacology section):
```javascript
content: {
  adverseEffects: ['string', …],
  indications: ['string', …],
  contraindications: ['string', …],
  dosing: [
    {
      indication: 'Anaphylaxis',
      route: 'IM',
      concentration: '1 mg/mL',
      adult: { dose: '0.5 mg', volume: '0.5 mL', max: '…', repeat: '…' },
      paediatric: {
        weightBased: true,
        dose: '0.01 mg/kg',
        max: '0.5 mg',
        table: {
          headers: ['Weight', 'Dose', 'Volume'],
          rows: [['10 kg', '0.1 mg', '0.1 mL'], …],
        },
      },
    },
  ],
  precautions: ['string', …],
  presentation: 'e.g. 1 mg/mL ampoule',
}
```

### Key naming convention
```
assessments:  'vital-signs', 'clinical-flags', 'clinical-approach', …
conditions:   'anaphylaxis-fr', 'anaphylaxis-cb', 'cardiac-arrest-fr', …
medications:  'adrenaline', 'salbutamol', 'glucagon', …
```
Dual-level protocols append `-cb` or `-fr` to the key. Single-level protocols use a plain slug.

Exports in `contentData.js`: `assessmentsContent`, `conditionsContent`, `medicationsContent`,
`PRACTICE_LEVELS`, `CAN_PERFORM`, `REFERENCE_ONLY`, `CATEGORY_COLORS`.

---

## Level Assignment Rules (for PDF extraction)

### Conditions
| Source page range | Assigned level |
|-------------------|---------------|
| 4–117 (main CPG) | `FR` (default); `SR` only if protocol explicitly requires IV/accredited procedure |
| 118–136 (Level 1 section) | `CB` |

SR indicators in text: "IV access", "intravenous", "accredited", "IM injection" (for Glucagon/Midazolam only), "IV fluid".

### Medications
| Medication | Level | Reason |
|------------|-------|--------|
| Adrenaline (Epi-Pen) | CB | Available to all levels via auto-injector |
| Adrenaline (nebulised / IM draw-up) | FR | Requires clinical skill |
| Glucose Paste | CB | No clinical skill required |
| Aspirin | FR | Oral medication |
| Cetirizine | FR | Oral medication |
| GTN (Glyceryl Trinitrate) | FR | Sublingual spray |
| Methoxyflurane | FR | Inhaled analgesia |
| Ondansetron | FR | Oral/sublingual |
| Oxygen | FR | Requires assessment skill |
| Paracetamol | FR | Oral medication |
| Salbutamol (puffer) | FR | MDI with spacer |
| Salbutamol (nebulised) | FR | Nebuliser |
| Glucagon | SR | IM injection — accredited only |
| Ipratropium Bromide | SR | Nebulised — accredited only |
| Midazolam | SR | IM injection — accredited only |
| Normal Saline | SR | IV fluid — IV access required |

---

## Category System
All protocols must be assigned one of these categories. The category drives the tile colour on
the home screen.

```javascript
export const CATEGORY_COLORS = {
  primary:      { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900', badge: 'bg-indigo-100 text-indigo-800', emoji: '🏥' },
  cardiac:      { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-900',    badge: 'bg-red-100 text-red-800',    emoji: '❤️' },
  respiratory:  { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-900',   badge: 'bg-blue-100 text-blue-800',  emoji: '🫁' },
  neurological: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', badge: 'bg-purple-100 text-purple-800', emoji: '🧠' },
  trauma:       { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-800', emoji: '🩹' },
  medical:      { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-900',  badge: 'bg-green-100 text-green-800', emoji: '💊' },
  paediatric:   { bg: 'bg-pink-50',   border: 'border-pink-200',   text: 'text-pink-900',   badge: 'bg-pink-100 text-pink-800',  emoji: '👶' },
  obstetric:    { bg: 'bg-rose-50',   border: 'border-rose-200',   text: 'text-rose-900',   badge: 'bg-rose-100 text-rose-800',  emoji: '🤰' },
  endocrine:    { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900', badge: 'bg-yellow-100 text-yellow-800', emoji: '🩸' },
  toxicology:   { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-900', badge: 'bg-violet-100 text-violet-800', emoji: '☠️' },
  environmental:{ bg: 'bg-teal-50',   border: 'border-teal-200',   text: 'text-teal-900',   badge: 'bg-teal-100 text-teal-800',  emoji: '🌡️' },
  medication:   { bg: 'bg-cyan-50',   border: 'border-cyan-200',   text: 'text-cyan-900',   badge: 'bg-cyan-100 text-cyan-800',  emoji: '💉' },
};
```

### Protocol → Category mapping
```
primary:       Vital Signs, Clinical Flags, Clinical Approach, Paediatric Assessment Triangle,
               Conscious Status, Respiratory Assessment, Perfusion Assessment, Pain Assessment,
               Weight Calculations, Time Critical, Safety Netting, Ventilation Rates
cardiac:       Cardiac Arrest (all ages), Cardiac Chest Pain
respiratory:   Asthma/Wheeze (all ages), Airway Obstruction, COPD (if present)
neurological:  Altered/Acute Altered Consciousness, Seizure, Stroke
trauma:        General Trauma, Head Trauma, Spinal Trauma, Chest Trauma, Burns, Wound Care, Falls
medical:       Anaphylaxis, Allergy (Mild), Infection/Sepsis, Nausea/Vomiting,
               Dehydration, Pain Relief (Non-Cardiac), Alcohol Intoxication
paediatric:    Paediatric-specific sub-protocols (age-banded entries listed under paediatric)
obstetric:     Birth & Newborn Resuscitation
endocrine:     Hypoglycaemia
medication:    All pharmacology entries (14 medications)
```

---

## UI Architecture

### View state machine (App.jsx)
```
no level set → LevelSelection
               ↓ select level
'home'       → HomeScreen (category tile grid)
               ↓ tap tile
'category'   → CategoryView (protocol list)
               ↓ tap protocol
'protocol'   → ProtocolView (quick view + 📖 detail)
               ↓ tap ← back
               returns to 'category'
'settings'   → Settings (level change with confirmation)
               ↓ tap ← close
               returns to 'home'
```

State held in `App.jsx`: `userLevel` (via `useUserLevel()`), `view`, `selectedCategory`,
`performProtos`, `refProtos`, `selectedProtocol`.

### Persistence
```
localStorage key:  'hatzolah_cpg_level'
value:             'CB' | 'FR' | 'SR'
```

### ProtocolView — fixed header rule (NON-NEGOTIABLE)
The header containing the 📖 (detailed view) button **must never scroll**. Use flex layout —
**do not remove `flex-shrink-0`** from the header:
```jsx
<div className="flex flex-col h-screen">
  {/* FIXED — flex-shrink-0 prevents this from shrinking or scrolling */}
  <div className="flex-shrink-0 bg-gradient-... px-4 py-3 flex items-center">
    <button onClick={onBack}><ArrowLeft /></button>
    <span className="flex-1 font-bold truncate">{proto.title}</span>
    <span className="level-badge">{proto.level}</span>
    <button onClick={() => setShowDetail(true)}><BookOpen /></button>  {/* 📖 */}
  </div>
  {/* SCROLLABLE */}
  <div className="flex-1 overflow-y-auto p-4">
    {/* quick-view content */}
  </div>
</div>
```
The detailed view opens as a **full-screen modal overlay** (`fixed inset-0`, `z-50`) with its own
scroll area, also using the same flex pattern for its own close button.

### Reference Only banner
When an FR or SR user taps a CB protocol (reference only):
```jsx
<div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
  <p className="text-amber-800 text-sm font-medium">
    ⚠️ Reference Only — this protocol is outside your practice scope
  </p>
</div>
```

### Level badge colours
```javascript
const LEVEL_BADGE = {
  CB: 'bg-blue-100 text-blue-800',
  FR: 'bg-green-100 text-green-800',
  SR: 'bg-amber-100 text-amber-800',
};
```

---

## Tailwind v4 Setup
This project uses **Tailwind CSS v4** — there is **no** `tailwind.config.js` / `postcss.config.js`.

- Plugin: `@tailwindcss/vite`, registered in `vite.config.js`.
- Entry: `src/index.css` starts with a single import:
  ```css
  @import "tailwindcss";
  ```

`vite.config.js` (actual):
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/hatzolah-cpg/',
  build: { outDir: 'dist', sourcemap: false, minify: 'terser' },
  server: { port: 3000, open: true },
})
```

---

## PDF Re-Extraction (v6.2)
The repo currently ships **v4.9** content. To regenerate `src/data/contentData.js` from the
**v6.2** PDF once it is placed on disk (e.g. `./source/Compiled_v6_2.pdf`):

1. Add an extraction script (`scripts/extract_pdf.mjs`) that:
   - Reads the PDF page by page and parses protocols by their section headings.
   - Applies the **level assignment** rules above (pages 118–136 → `CB`; pages 4–117 → `FR`,
     `SR` only on IV/accredited markers; medications use the fixed level table — do not auto-detect).
   - Applies the **category mapping** above.
   - For dual-level protocols, emits **two separate entries** (`…-cb` and `…-fr`).
   - Preserves and re-exports `PRACTICE_LEVELS`, `CAN_PERFORM`, `REFERENCE_ONLY`, `CATEGORY_COLORS`,
     `assessmentsContent`, `conditionsContent`, `medicationsContent`.
   - Writes to `src/data/contentData.js`.
2. Add `"extract-pdf": "node scripts/extract_pdf.mjs"` to `package.json`.
3. **Diff** the regenerated file against the current one before committing — confirm the existing
   keys survive (or change intentionally) and no level/category regressions.

**Tooling note:** the repo ships `pdf-parse-fork` (Node). Try it first to keep a single toolchain.
The CPG contains Unicode glyphs (✚ ⚠ ➤) and flowchart symbols; if Node extraction yields poor
glyph/table fidelity, fall back to a Python `pdfplumber` script (a build-time dev script does not
violate the pnpm-only/no-backend app constraints).

---

## pnpm Commands
```bash
pnpm install                 # install dependencies
pnpm add <pkg>               # production dependency
pnpm add -D <pkg>            # dev dependency
pnpm dev                     # start Vite dev server (port 3000)
pnpm build                   # production build → dist/
pnpm preview                 # serve production build locally
pnpm deploy                  # build + push to gh-pages
pnpx <cmd>                   # run binary (replaces npx)
```

---

## Constraints
- **pnpm only** — never npm, never npx (a build-time Python extraction script is the only exception).
- **No react-router** — routing is a view state machine in App.jsx.
- **No Redux / Zustand** — React state + localStorage only.
- **No backend** — pure static PWA, all data in contentData.js.
- **Tailwind v4 only** — no inline styles except where Tailwind cannot express the value; no v3 config files.
- **Do not modify** `CAN_PERFORM` / `REFERENCE_ONLY` — these are medical authorisation rules.
- **Do not remove** `flex-shrink-0` from ProtocolView header — the 📖 button must always be reachable.
- **Do not merge** CB and FR versions of dual-level protocols into a single entry.

## Deployment
GitHub Pages at `https://ilyulev.github.io/hatzolah-cpg/`. Vite base path: `/hatzolah-cpg/`.
```bash
pnpm build && pnpm deploy
```
