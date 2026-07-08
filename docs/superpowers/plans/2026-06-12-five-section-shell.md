# Five-Section App Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Hatzolah CPG PWA into five bottom-nav sections (Home / Medications / Alerts / Info / Halakha) with a persistent TopBar level chip, per the approved spec `docs/superpowers/specs/2026-06-12-five-section-shell-design.md`.

**Architecture:** Extend the existing view-state machine in `App.jsx` (NO react-router — project constraint) with a `section` dimension and one per-section drill-down state object. New `BottomNav` + `TopBar` shell components wrap section bodies. `CategoryView`, `ProtocolView`, `HomeScreen`, level matrices are reused unchanged. Extension content (Alerts/Info/Halakha) lives in new `src/data/extensions/` files, separate from sourced `contentData.js`.

**Tech Stack:** React 18 + Vite 7 + Tailwind v4 (`@tailwindcss/vite`, NO tailwind.config.js) + lucide-react. Package manager: **pnpm only** (never npm/npx).

**Verification approach:** This project has **no test framework** (deliberate; static PWA). Each task verifies via: (a) `node` import-check of data files, (b) `pnpm build` (catches syntax/import errors), (c) preview walkthrough at the end. Do not introduce vitest/jest.

**Key existing signatures (do not change):**
- `HomeScreen({ userLevel, allProtocols, onProtocolSelect, onCategorySelect })` — `onCategorySelect(cat, perform, reference)`
- `CategoryView({ category, performProtocols, referenceProtocols, onBack, onProtocolSelect })`
- `ProtocolView({ proto, userLevel, onBack })` — root is `flex flex-col h-full`; 📖 header rule is NON-NEGOTIABLE
- `Settings({ userLevel, onChangeLevel, onClose })`
- `LevelSelection({ onSelect })`
- `contentData.js` exports: `assessmentsContent`, `conditionsContent`, `medicationsContent`, `PRACTICE_LEVELS` (incl. display-only `ALL`), `SELECTABLE_LEVELS`, `CAN_PERFORM`, `REFERENCE_ONLY`, `CATEGORY_COLORS`
- Universal rule: `proto.universal === true` → always in-scope, never reference (see HomeScreen.jsx:32-35)

---

### Task 0: Universal medications (user-approved data fix)

**Files:**
- Modify: `src/data/contentData.js` (three medication entries)

Adrenaline (Epi-Pen), Glucose Paste and Salbutamol are available to every
practice level (CLAUDE.md medication table), but are tagged `level: 'CB'`,
which the visibility rules grey out as "Reference Only" for FR/SR. Apply the
same universal treatment as `vital-signs`/`clinical-flags` (user approved:
"ALL badge is fine").

- [ ] **Step 1: In `src/data/contentData.js`, update the three entries**

`'adrenaline'`: replace `level: 'CB',        // CB and FR both administer; CB via Epi-Pen only` with:
```javascript
    level: 'ALL',
    universal: true, // Epi-Pen — administered by every practice level
```
`'glucose-paste'`: replace `level: 'CB',` with:
```javascript
    level: 'ALL',
    universal: true, // no clinical skill required — every practice level
```
`'salbutamol'`: replace `level: 'CB',       // CB has puffer; FR adds nebulised` with:
```javascript
    level: 'ALL',
    universal: true, // puffer at CB; nebulised routes at FR/SR
```

- [ ] **Step 2: Verify data parses; level counts shift from 15 CB to 12 CB / 5 ALL**

```bash
node -e "
const fs=require('fs'),os=require('os'),path=require('path');
const tmp=path.join(os.tmpdir(),'cd-univ2.mjs');
fs.writeFileSync(tmp,fs.readFileSync('src/data/contentData.js','utf8'));
import('file://'+tmp).then(m=>{
  const all={...m.assessmentsContent,...m.conditionsContent,...m.medicationsContent};
  const counts={};
  for(const p of Object.values(all)) counts[p.level]=(counts[p.level]||0)+1;
  console.log(counts);
  for(const k of ['adrenaline','glucose-paste','salbutamol'])
    if(m.medicationsContent[k].universal!==true) throw new Error(k+' not universal');
  console.log('OK'); fs.unlinkSync(tmp);
});
"
```
Expected: `{ ALL: 5, CB: 12, FR: 34, SR: 4 }` then `OK`.

- [ ] **Step 3: Commit**

```bash
git add src/data/contentData.js
git commit -m "Make Adrenaline, Glucose Paste, Salbutamol universal (all levels)"
```

---

### Task 1: Extension data files (Alerts / Info / Halakha seeds)

**Files:**
- Create: `src/data/extensions/alertsContent.js`
- Create: `src/data/extensions/infoContent.js`
- Create: `src/data/extensions/halakhaContent.js`

- [ ] **Step 1: Create `src/data/extensions/alertsContent.js`**

```javascript
/**
 * Alerts — differential reasoning aid (APP EXTENSION, not part of Hatzolah CPG).
 * "I see an abnormal finding — what could it be, what shouldn't I forget to check?"
 * Non-mandatory prompts to think about. Mandatory escalation lives in the
 * Clinical Flags protocol (Home section).
 */
export const ALERTS_BANNER =
  'Supplementary aid — not a substitute for the CPG. For mandatory escalation criteria see Clinical Flags.';

export const alertsContent = [
  {
    finding: 'Low BP (sBP <90)',
    considerations: [
      { cause: 'Anaphylaxis / severe allergy', hint: 'Rash, hives, airway swelling, known antigen?' },
      { cause: 'Internal bleeding', hint: 'Trauma, abdo pain/rigidity, melaena, recent falls?' },
      { cause: 'Sepsis', hint: 'Fever/infection history, mottled skin, altered consciousness?' },
      { cause: 'Cardiogenic (MI, arrhythmia)', hint: 'Chest pain, irregular pulse, cardiac history?' },
      { cause: 'Dehydration / hypovolaemia', hint: 'Vomiting/diarrhoea, poor intake, dry mucosa?' },
      { cause: 'Medication-related', hint: 'Antihypertensives, GTN, recent dose change?' },
    ],
    checkNext: ['Skin (rash/hives)', 'Temperature', 'HR trend', 'Abdomen', 'Medication history'],
  },
  {
    finding: 'High HR (tachycardia)',
    considerations: [
      { cause: 'Pain / anxiety', hint: 'Often sinus and settles with reassurance' },
      { cause: 'Hypovolaemia / bleeding', hint: 'Early compensation — BP may still be normal' },
      { cause: 'Sepsis / fever', hint: 'Temperature, infection source?' },
      { cause: 'Arrhythmia (SVT, AF, VT)', hint: 'Irregular? Very fast (>150)? Palpitations?' },
      { cause: 'Hypoglycaemia', hint: 'Check BGL' },
      { cause: 'Stimulants / medications', hint: 'Salbutamol, caffeine, illicit drugs' },
    ],
    checkNext: ['BP', 'BGL', 'Temperature', 'Pulse regularity', 'Pain score'],
  },
  {
    finding: 'Low HR (bradycardia)',
    considerations: [
      { cause: 'Physiological (fit adult, sleep)', hint: 'Asymptomatic athlete?' },
      { cause: 'Heart block / cardiac', hint: 'Syncope, dizziness, cardiac history?' },
      { cause: 'Medication-related', hint: 'Beta-blockers, digoxin' },
      { cause: 'Hypoxia (esp. paediatric)', hint: 'Bradycardia in a child is pre-arrest until proven otherwise' },
      { cause: 'Raised intracranial pressure', hint: 'Head injury + bradycardia + hypertension (Cushing’s)?' },
    ],
    checkNext: ['SpO2', 'GCS/AVPU', 'Medication history', 'BP'],
  },
  {
    finding: 'Low SpO2 (<92%)',
    considerations: [
      { cause: 'Asthma / bronchospasm', hint: 'Wheeze, asthma history, thunderstorm?' },
      { cause: 'Airway obstruction', hint: 'Stridor, choking history, drooling?' },
      { cause: 'Anaphylaxis', hint: 'Rash + respiratory distress' },
      { cause: 'COPD (chronic baseline)', hint: 'Known COPD — target 88–92%' },
      { cause: 'Pneumonia / infection', hint: 'Fever, productive cough, focal crackles' },
      { cause: 'Poor reading', hint: 'Cold fingers, nail polish, poor perfusion — check waveform' },
    ],
    checkNext: ['RR + work of breathing', 'Auscultation', 'Temperature', 'Probe placement'],
  },
  {
    finding: 'Altered consciousness',
    considerations: [
      { cause: 'Hypoglycaemia', hint: 'ALWAYS check BGL first — rapidly reversible' },
      { cause: 'Stroke', hint: 'FAST assessment, sudden onset, one-sided?' },
      { cause: 'Post-ictal (after seizure)', hint: 'Witnessed shaking, incontinence, tongue bite?' },
      { cause: 'Overdose / intoxication', hint: 'Pinpoint pupils, drug paraphernalia, alcohol smell' },
      { cause: 'Head injury', hint: 'Trauma history, scalp wounds, anticoagulants?' },
      { cause: 'Hypoxia / hypotension', hint: 'Check SpO2 and BP — brain perfusion' },
      { cause: 'Sepsis (esp. elderly)', hint: 'Confusion may be the only sign in the elderly' },
    ],
    checkNext: ['BGL', 'SpO2', 'BP', 'Pupils', 'FAST', 'Temperature'],
  },
  {
    finding: 'High temperature (fever)',
    considerations: [
      { cause: 'Sepsis', hint: 'Fever + any red flag vital = treat as sepsis' },
      { cause: 'Simple infection (URTI, UTI)', hint: 'Localising symptoms?' },
      { cause: 'Meningitis', hint: 'Neck stiffness, photophobia, non-blanching rash' },
      { cause: 'Heat stroke', hint: 'Exertion/environment, hot dry skin, altered LOC' },
      { cause: 'Paediatric <3 months', hint: 'Fever ≥38°C in <3 months = RED FLAG, hospital always' },
    ],
    checkNext: ['Rash (non-blanching?)', 'Neck stiffness', 'HR + BP (compensation)', 'Hydration'],
  },
  {
    finding: 'Low BGL (<4 mmol/L)',
    considerations: [
      { cause: 'Diabetic — insulin/medication excess', hint: 'Missed meal, exercise, dose error?' },
      { cause: 'Alcohol-related', hint: 'Alcohol blocks glucose release — can drop hours later' },
      { cause: 'Sepsis / critical illness', hint: 'Hypoglycaemia without diabetes is ominous' },
      { cause: 'Paediatric illness', hint: 'Children deplete glycogen fast when unwell' },
    ],
    checkNext: ['Conscious state + swallow safety (Glucose Paste vs Glucagon)', 'Temperature', 'Recheck BGL after Tx'],
  },
  {
    finding: 'Fast breathing (tachypnoea)',
    considerations: [
      { cause: 'Respiratory (asthma, infection)', hint: 'Wheeze/crackles, SpO2?' },
      { cause: 'Metabolic compensation (DKA)', hint: 'Diabetic, deep sighing breaths, sweet breath' },
      { cause: 'Sepsis', hint: 'RR is the earliest sepsis vital sign change' },
      { cause: 'Pain / anxiety (hyperventilation)', hint: 'Carpopedal spasm, tingling — diagnosis of exclusion' },
      { cause: 'PE (pulmonary embolism)', hint: 'Sudden onset, pleuritic pain, recent surgery/immobility' },
    ],
    checkNext: ['SpO2', 'BGL', 'Temperature', 'Auscultation', 'Calf swelling'],
  },
];
```

- [ ] **Step 2: Create `src/data/extensions/infoContent.js`**

```javascript
/**
 * Info — reference material (APP EXTENSION, not part of Hatzolah CPG).
 * Seeded with common Australian ambulance/CPG acronyms & abbreviations.
 * Future: patient medication classes reference (anticoagulants, beta-blockers…).
 */
export const INFO_BANNER = 'Supplementary reference — not part of the Hatzolah CPG.';

export const acronymsContent = [
  { term: 'ACS', meaning: 'Acute Coronary Syndrome' },
  { term: 'AED', meaning: 'Automated External Defibrillator' },
  { term: 'APO', meaning: 'Acute Pulmonary Oedema' },
  { term: 'AVPU', meaning: 'Alert / Voice / Pain / Unresponsive (conscious state scale)' },
  { term: 'BGL', meaning: 'Blood Glucose Level' },
  { term: 'BLS', meaning: 'Basic Life Support' },
  { term: 'BVM', meaning: 'Bag-Valve-Mask (manual ventilation)' },
  { term: 'CCF', meaning: 'Congestive Cardiac Failure' },
  { term: 'COPD', meaning: 'Chronic Obstructive Pulmonary Disease' },
  { term: 'CPR', meaning: 'Cardiopulmonary Resuscitation' },
  { term: 'CVA', meaning: 'Cerebrovascular Accident (stroke)' },
  { term: 'DKA', meaning: 'Diabetic Ketoacidosis' },
  { term: 'FAST', meaning: 'Face / Arms / Speech / Time (stroke screen)' },
  { term: 'GCS', meaning: 'Glasgow Coma Scale (3–15)' },
  { term: 'GCSE', meaning: 'Generalised Convulsive Status Epilepticus' },
  { term: 'GTN', meaning: 'Glyceryl Trinitrate' },
  { term: 'IM', meaning: 'Intramuscular (injection route)' },
  { term: 'IN', meaning: 'Intranasal (medication route)' },
  { term: 'IV', meaning: 'Intravenous (route / access)' },
  { term: 'LOC', meaning: 'Level of Consciousness (also: Loss of Consciousness)' },
  { term: 'MDI', meaning: 'Metered Dose Inhaler (puffer)' },
  { term: 'MI', meaning: 'Myocardial Infarction (heart attack)' },
  { term: 'Mx', meaning: 'Management' },
  { term: 'NRB', meaning: 'Non-Rebreather (oxygen mask)' },
  { term: 'ODT', meaning: 'Orally Disintegrating Tablet' },
  { term: 'PE', meaning: 'Pulmonary Embolism' },
  { term: 'PEA', meaning: 'Pulseless Electrical Activity (cardiac arrest rhythm)' },
  { term: 'PHx', meaning: 'Past History' },
  { term: 'pMDI', meaning: 'Pressurised Metered Dose Inhaler' },
  { term: 'PRN', meaning: 'Pro Re Nata — as needed' },
  { term: 'PSA', meaning: 'Perfusion Status Assessment' },
  { term: 'ROSC', meaning: 'Return of Spontaneous Circulation' },
  { term: 'RR', meaning: 'Respiratory Rate' },
  { term: 'sBP', meaning: 'Systolic Blood Pressure' },
  { term: 'SOB', meaning: 'Shortness of Breath' },
  { term: 'SpO2', meaning: 'Peripheral Oxygen Saturation' },
  { term: 'SVT', meaning: 'Supraventricular Tachycardia' },
  { term: 'TIA', meaning: 'Transient Ischaemic Attack (mini-stroke)' },
  { term: 'URTI', meaning: 'Upper Respiratory Tract Infection' },
  { term: 'UTI', meaning: 'Urinary Tract Infection' },
  { term: 'VF', meaning: 'Ventricular Fibrillation' },
  { term: 'VT', meaning: 'Ventricular Tachycardia' },
  { term: 'VVED', meaning: 'Victorian Virtual Emergency Department' },
];
```

- [ ] **Step 3: Create `src/data/extensions/halakhaContent.js`**

```javascript
/**
 * Halakha — religious regulations for Jewish first responders
 * (APP EXTENSION, not part of Hatzolah CPG). Content to be provided by the
 * app owner; ships empty on purpose. Shape mirrors a simple article list.
 */
export const halakhaContent = [];
```

- [ ] **Step 4: Verify all three files parse and export correctly**

Run (from `/Users/ilyulev/Projects/hatzolah-cpg`):
```bash
node -e "
Promise.all([
  import('./src/data/extensions/alertsContent.js'),
  import('./src/data/extensions/infoContent.js'),
  import('./src/data/extensions/halakhaContent.js'),
]).then(([a,i,h]) => {
  console.log('alerts findings:', a.alertsContent.length);
  console.log('acronyms:', i.acronymsContent.length);
  console.log('halakha:', h.halakhaContent.length);
  if (a.alertsContent.length < 6) throw new Error('alerts seed too small');
  if (i.acronymsContent.length < 20) throw new Error('acronyms seed too small');
  console.log('OK');
});
"
```
Expected: `alerts findings: 8`, `acronyms: 43`, `halakha: 0`, `OK`.
(Note: plain `node` can import these `.js` ESM files directly because they have no JSX and no bare-module imports.)

- [ ] **Step 5: Commit**

```bash
git add src/data/extensions/
git commit -m "Add extension-tier data: alerts reasoning aid, ambulance acronyms, empty halakha"
```

---

### Task 2: BottomNav component

**Files:**
- Create: `src/components/BottomNav.jsx`

- [ ] **Step 1: Create `src/components/BottomNav.jsx`**

```jsx
/**
 * BottomNav — fixed 5-tab navigation (Home / Meds / Alerts / Info / Halakha).
 * Pure presentational: parent owns the active section state.
 */
import React from 'react';
import { Home, Pill, TriangleAlert, Info, Star } from 'lucide-react';

export const SECTIONS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'medications', label: 'Meds', Icon: Pill },
  { id: 'alerts', label: 'Alerts', Icon: TriangleAlert },
  { id: 'info', label: 'Info', Icon: Info },
  { id: 'halakha', label: 'Halakha', Icon: Star },
];

export function BottomNav({ active, onSelect }) {
  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-200 flex pb-[env(safe-area-inset-bottom)]">
      {SECTIONS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              isActive ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

Note: `Star` (of David association is approximate; lucide has no Magen David) — acceptable v1 icon; can swap for a custom SVG later.

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: `✓ built` with no errors (component not yet imported anywhere — build just proves syntax).

- [ ] **Step 3: Commit**

```bash
git add src/components/BottomNav.jsx
git commit -m "Add BottomNav (5-section tab bar)"
```

---

### Task 3: TopBar with level chip + Settings-as-sheet; About moves out of Settings

**Files:**
- Create: `src/components/TopBar.jsx`
- Modify: `src/components/Settings.jsx` (remove About card, lines ~74-79)

- [ ] **Step 1: Create `src/components/TopBar.jsx`**

```jsx
/**
 * TopBar — slim persistent bar: app title + practice-level chip.
 * Tapping the chip opens the level switcher (Settings rendered as an overlay).
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PRACTICE_LEVELS } from '../data/contentData';

export function TopBar({ userLevel, onLevelChipTap }) {
  const cfg = PRACTICE_LEVELS[userLevel];
  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
      <div>
        <h1 className="text-base font-bold text-gray-900 leading-tight">Hatzolah CPG</h1>
        <p className="text-[10px] text-gray-400">v6.2</p>
      </div>
      <button
        onClick={onLevelChipTap}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: cfg?.bg, color: cfg?.color }}
        title="Change practice level"
      >
        {userLevel}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Remove the About card from `src/components/Settings.jsx`**

Delete this block (it moves to the Info section in Task 6):
```jsx
        {/* About */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">About</p>
          <p className="text-sm text-gray-600">Hatzolah CPG v6.2 (14 Aug 2024)</p>
          <p className="text-xs text-gray-400 mt-1">For clinical use by Hatzolah Melbourne members only.</p>
        </div>
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```
Expected: `✓ built`.

- [ ] **Step 4: Commit**

```bash
git add src/components/TopBar.jsx src/components/Settings.jsx
git commit -m "Add TopBar with level chip; move About out of Settings (to Info)"
```

---

### Task 4: MedicationsSection

**Files:**
- Create: `src/components/MedicationsSection.jsx`

Level filtering must match HomeScreen's logic exactly (incl. `universal`): see
`src/components/HomeScreen.jsx:32-35`.

- [ ] **Step 1: Create `src/components/MedicationsSection.jsx`**

```jsx
/**
 * Medications — sourced section (Hatzolah CPG pharmacology).
 * Flat list of medications with category chips, split My Scope / Reference Only,
 * using the same level rules as HomeScreen. Tapping opens ProtocolView (parent).
 */
import React from 'react';
import { Info } from 'lucide-react';
import { medicationsContent, CAN_PERFORM, REFERENCE_ONLY, CATEGORY_COLORS } from '../data/contentData';

function MedRow({ proto, greyed, onSelect }) {
  const colors = CATEGORY_COLORS[proto.category] || CATEGORY_COLORS.medical;
  return (
    <button
      onClick={() => onSelect(proto)}
      className={`w-full text-left rounded-xl p-4 transition-all active:scale-95 ${
        greyed
          ? 'border border-gray-200 bg-gray-50 opacity-70 hover:border-gray-300'
          : 'shadow-sm border border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <p className={`font-semibold ${greyed ? 'text-gray-500' : 'text-gray-900'}`}>{proto.title}</p>
          {proto.summary && (
            <p className={`text-sm mt-0.5 ${greyed ? 'text-gray-400' : 'text-gray-500'}`}>{proto.summary}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${greyed ? 'bg-gray-300 text-gray-600' : 'text-white'}`}
            style={greyed ? undefined : { background: colors.icon }}
          >
            {proto.level}
          </span>
          <span className="text-[10px] text-gray-400 uppercase">{proto.category}</span>
        </div>
      </div>
    </button>
  );
}

export function MedicationsSection({ userLevel, onProtocolSelect }) {
  const canPerform = CAN_PERFORM[userLevel] || [];
  const reference = REFERENCE_ONLY[userLevel] || [];

  const perform = [];
  const ref = [];
  Object.entries(medicationsContent).forEach(([key, proto]) => {
    const p = { key, ...proto };
    if (proto.universal === true || canPerform.includes(proto.level)) perform.push(p);
    else if (reference.includes(proto.level)) ref.push(p);
  });

  return (
    <div className="p-3 space-y-2">
      {perform.length > 0 && (
        <>
          <p className="text-xs font-semibold text-gray-500 uppercase px-1">My Scope</p>
          {perform.map((p) => (
            <MedRow key={p.key} proto={p} greyed={false} onSelect={onProtocolSelect} />
          ))}
        </>
      )}
      {ref.length > 0 && (
        <>
          <div className="flex items-center space-x-2 mt-4 px-1">
            <p className="text-xs font-semibold text-gray-400 uppercase">Reference Only</p>
            <Info className="w-3 h-3 text-gray-400" />
          </div>
          {ref.map((p) => (
            <MedRow key={p.key} proto={p} greyed onSelect={onProtocolSelect} />
          ))}
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: `✓ built`.

- [ ] **Step 3: Commit**

```bash
git add src/components/MedicationsSection.jsx
git commit -m "Add MedicationsSection (level-filtered pharmacology list)"
```

---

### Task 5: AlertsSection

**Files:**
- Create: `src/components/AlertsSection.jsx`

- [ ] **Step 1: Create `src/components/AlertsSection.jsx`**

```jsx
/**
 * Alerts — differential reasoning aid (app extension).
 * Expandable finding cards: "what could it be + what to check next".
 * Non-mandatory; banner links conceptually to Clinical Flags (Home).
 */
import React, { useState } from 'react';
import { ChevronDown, TriangleAlert } from 'lucide-react';
import { alertsContent, ALERTS_BANNER } from '../data/extensions/alertsContent';

function FindingCard({ entry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center justify-between"
      >
        <span className="font-semibold text-gray-900">{entry.finding}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase mt-3 mb-2">Could be…</p>
          <ul className="space-y-2">
            {entry.considerations.map((c, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium text-gray-800">{c.cause}</span>
                {c.hint && <span className="text-gray-500"> — {c.hint}</span>}
              </li>
            ))}
          </ul>
          {entry.checkNext?.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-4 mb-2">Don’t forget to check</p>
              <div className="flex flex-wrap gap-1.5">
                {entry.checkNext.map((c, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function AlertsSection() {
  return (
    <div className="p-3 space-y-2">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
        <TriangleAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 text-xs font-medium">{ALERTS_BANNER}</p>
      </div>
      {alertsContent.map((entry, i) => (
        <FindingCard key={i} entry={entry} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build; commit**

```bash
pnpm build   # expected: ✓ built
git add src/components/AlertsSection.jsx
git commit -m "Add AlertsSection (differential reasoning aid, expandable findings)"
```

---

### Task 6: InfoSection (searchable acronyms + About footer)

**Files:**
- Create: `src/components/InfoSection.jsx`

- [ ] **Step 1: Create `src/components/InfoSection.jsx`**

```jsx
/**
 * Info — reference material (app extension): searchable acronyms list.
 * Also hosts the About block (moved from Settings).
 */
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { acronymsContent, INFO_BANNER } from '../data/extensions/infoContent';

export function InfoSection() {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const filtered = needle
    ? acronymsContent.filter(
        (a) => a.term.toLowerCase().includes(needle) || a.meaning.toLowerCase().includes(needle)
      )
    : acronymsContent;

  return (
    <div className="p-3 space-y-3">
      <p className="text-xs text-gray-400 px-1">{INFO_BANNER}</p>

      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search acronyms…"
          className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase px-4 pt-3 pb-1">
          Acronyms & Abbreviations
        </p>
        {filtered.length === 0 && (
          <p className="px-4 py-4 text-sm text-gray-400 italic">No matches for “{q}”.</p>
        )}
        {filtered.map((a) => (
          <div key={a.term} className="px-4 py-2.5 flex items-baseline gap-3">
            <span className="font-bold text-gray-900 text-sm w-16 flex-shrink-0">{a.term}</span>
            <span className="text-sm text-gray-600">{a.meaning}</span>
          </div>
        ))}
      </div>

      {/* About (moved from Settings) */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">About</p>
        <p className="text-sm text-gray-600">Hatzolah CPG v6.2 (14 Aug 2024)</p>
        <p className="text-xs text-gray-400 mt-1">For clinical use by Hatzolah Melbourne members only.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build; commit**

```bash
pnpm build   # expected: ✓ built
git add src/components/InfoSection.jsx
git commit -m "Add InfoSection (searchable acronyms + About)"
```

---

### Task 7: HalakhaSection (empty state)

**Files:**
- Create: `src/components/HalakhaSection.jsx`

- [ ] **Step 1: Create `src/components/HalakhaSection.jsx`**

```jsx
/**
 * Halakha — religious guidance for Jewish first responders (app extension).
 * Ships as a deliberate empty state; renders halakhaContent when provided.
 */
import React from 'react';
import { Star } from 'lucide-react';
import { halakhaContent } from '../data/extensions/halakhaContent';

export function HalakhaSection() {
  if (halakhaContent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <Star className="w-10 h-10 text-gray-300 mb-4" />
        <h2 className="font-bold text-gray-700 mb-2">Halakha</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Religious guidance for Jewish first responders. Content coming soon.
        </p>
      </div>
    );
  }
  return (
    <div className="p-3 space-y-2">
      {halakhaContent.map((item, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
          <p className="text-sm text-gray-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build; commit**

```bash
pnpm build   # expected: ✓ built
git add src/components/HalakhaSection.jsx
git commit -m "Add HalakhaSection (empty-state placeholder)"
```

---

### Task 8: Rewrite App.jsx — section state machine + shell

**Files:**
- Modify: `src/App.jsx` (full rewrite; currently 119 lines)

Rules honored: no router; per-section stacks survive tab switches; Home passes
**assessments + conditions only** (meds removed); unknown section falls back to
Home; first-run LevelSelection gate unchanged; ProtocolView/CategoryView reused
with existing signatures; level switcher = existing `Settings` rendered as a
full-screen overlay (it already has its own close header + confirmation modal).

- [ ] **Step 1: Replace the entire contents of `src/App.jsx`**

```jsx
import React, { useState } from 'react';
import { useUserLevel } from './hooks/useUserLevel';
import { LevelSelection } from './components/LevelSelection';
import { HomeScreen } from './components/HomeScreen';
import { CategoryView } from './components/CategoryView';
import { ProtocolView } from './components/ProtocolView';
import { Settings } from './components/Settings';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { MedicationsSection } from './components/MedicationsSection';
import { AlertsSection } from './components/AlertsSection';
import { InfoSection } from './components/InfoSection';
import { HalakhaSection } from './components/HalakhaSection';
import { assessmentsContent, conditionsContent } from './data/contentData';

const INITIAL_STACKS = {
  home: { view: 'grid', category: null, perform: [], reference: [], protocol: null },
  medications: { view: 'list', protocol: null },
  // alerts / info / halakha are flat — no drill-down state needed
};

function App() {
  const { userLevel, loaded, selectLevel } = useUserLevel();
  const [section, setSection] = useState('home');
  const [stacks, setStacks] = useState(INITIAL_STACKS);
  const [showLevelSheet, setShowLevelSheet] = useState(false);

  // Sourced tier, Home: clinical guidelines only (medications live in their own tab)
  const homeProtocols = [
    ...Object.entries(assessmentsContent),
    ...Object.entries(conditionsContent),
  ];

  const patchStack = (id, patch) =>
    setStacks((s) => ({ ...s, [id]: { ...s[id], ...patch } }));

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!userLevel) {
    return <LevelSelection onSelect={selectLevel} />;
  }

  // ── Section bodies ─────────────────────────────────────────────────────────
  const home = stacks.home;
  const meds = stacks.medications;

  // Drill-down views render WITHOUT TopBar (they have their own headers),
  // but the BottomNav stays visible so tabs are always reachable.
  let body = null;
  let showTopBar = true;

  const active = ['home', 'medications', 'alerts', 'info', 'halakha'].includes(section)
    ? section
    : 'home'; // unknown section falls back to Home

  if (active === 'home') {
    if (home.view === 'protocol' && home.protocol) {
      showTopBar = false;
      body = (
        <ProtocolView
          proto={home.protocol}
          userLevel={userLevel}
          onBack={() => patchStack('home', { view: 'category', protocol: null })}
        />
      );
    } else if (home.view === 'category' && home.category) {
      showTopBar = false;
      body = (
        <CategoryView
          category={home.category}
          performProtocols={home.perform}
          referenceProtocols={home.reference}
          onBack={() => patchStack('home', { view: 'grid', category: null })}
          onProtocolSelect={(proto) => patchStack('home', { view: 'protocol', protocol: proto })}
        />
      );
    } else {
      body = (
        <HomeScreen
          userLevel={userLevel}
          allProtocols={homeProtocols}
          onCategorySelect={(cat, perform, reference) =>
            patchStack('home', { view: 'category', category: cat, perform, reference })
          }
        />
      );
    }
  } else if (active === 'medications') {
    if (meds.view === 'protocol' && meds.protocol) {
      showTopBar = false;
      body = (
        <ProtocolView
          proto={meds.protocol}
          userLevel={userLevel}
          onBack={() => patchStack('medications', { view: 'list', protocol: null })}
        />
      );
    } else {
      body = (
        <MedicationsSection
          userLevel={userLevel}
          onProtocolSelect={(proto) => patchStack('medications', { view: 'protocol', protocol: proto })}
        />
      );
    }
  } else if (active === 'alerts') {
    body = <AlertsSection />;
  } else if (active === 'info') {
    body = <InfoSection />;
  } else if (active === 'halakha') {
    body = <HalakhaSection />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {showTopBar && (
        <TopBar userLevel={userLevel} onLevelChipTap={() => setShowLevelSheet(true)} />
      )}

      <main className="flex-1 overflow-y-auto">{body}</main>

      <BottomNav active={active} onSelect={setSection} />

      {/* Level switcher — existing Settings rendered as a full-screen sheet */}
      {showLevelSheet && (
        <div className="fixed inset-0 z-50 bg-white">
          <Settings
            userLevel={userLevel}
            onChangeLevel={(newLevel) => {
              selectLevel(newLevel);
              setShowLevelSheet(false);
              // Reset drill-downs: visible scope changed, stale stacks could
              // point at protocols outside the new level's visibility.
              setStacks(INITIAL_STACKS);
            }}
            onClose={() => setShowLevelSheet(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
```

Implementation notes for the engineer:
- `ProtocolView`'s root is `flex flex-col h-full` — it fills `<main>` and its
  internal quick-view area scrolls itself. That's fine inside `overflow-y-auto`.
- The old gear icon + old header are gone; `Settings` is reused as the level
  sheet (it has its own close button and confirmation modal).
- `lucide-react`'s `Settings` icon import from the old App.jsx is intentionally
  dropped.

- [ ] **Step 2: Verify build**

```bash
pnpm build
```
Expected: `✓ built`, no unused-import warnings that fail the build.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "Restructure App into five-section shell (BottomNav + TopBar level chip)"
```

---

### Task 9: End-to-end preview walkthrough (spec verification checklist)

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server and open the app**

Use the preview harness (`preview_start` with `vite-dev`) or `pnpm dev`.
Note: dev serves at root `/` (base is `/hatzolah-cpg/` only in build/preview).

- [ ] **Step 2: Walk the spec checklist — every item must pass**

1. Fresh origin (or `localStorage.clear()`) → LevelSelection appears → pick
   **First Responder** → shell appears: TopBar (title + `FR ▾` chip), Home grid,
   BottomNav with 5 tabs, Home active.
2. Tab through all 5 sections:
   - Medications: "My Scope" (Adrenaline, Aspirin, Cetirizine, Glucose Paste,
     GTN, Methoxyflurane, Ondansetron, Oxygen, Paracetamol, Salbutamol) +
     "Reference Only" — no SR meds in scope for FR.
   - Alerts: amber supplementary banner + 8 expandable findings; expand
     "Low BP" → considerations + "Don't forget to check" chips.
   - Info: search box; type `ros` → ROSC row remains; About block at bottom.
   - Halakha: empty-state (star icon, "Content coming soon").
3. Home grid must NOT contain any medication tiles (no 💉/Analgesia/Fluids/
   Gastro/Allergy/Emergency medication categories from meds).
4. Level chip: tap `FR ▾` → Settings sheet → choose Code Blue → confirm →
   sheet closes, chip shows `CB`, Medications now shows only CB scope
   (Adrenaline Epi-Pen, Glucose Paste, Salbutamol) with no reference section?
   — CB has REFERENCE_ONLY = [], so Reference Only header must be absent.
   Switch back to FR the same way.
5. Stack preservation: Home → Cardiac → Cardiac Arrest (protocol open) →
   switch to Info tab → back to Home tab → still on Cardiac Arrest protocol.
   Back (←) returns to Cardiac category, back again → grid.
6. In the open protocol: 📖 button visible at every scroll position (fixed
   header untouched); BottomNav still visible and functional.
7. Console: zero errors (`preview_console_logs` level=error).

- [ ] **Step 3: Production build sanity**

```bash
pnpm build
```
Expected: `✓ built`; then spot-check `vite-preview` serves the shell at
`/hatzolah-cpg/`.

- [ ] **Step 4: Commit any fixes found; final commit if needed**

```bash
git status --short   # should be clean of source changes at the end
```

---

## Self-review (done at plan time)

- **Spec coverage:** two-tier provenance (Task 1 file separation + banners in
  Tasks 5/6), 5 sections (Tasks 2–8), level chip + switcher (Tasks 3/8), Home
  minus meds (Task 8 `homeProtocols`), per-section stacks + preservation
  (Task 8 + walkthrough #5), first-run gate unchanged (Task 8), empty-state
  Halakha (Task 7), About relocation (Tasks 3/6), fallback-to-Home (Task 8
  `active` guard), spec's testing checklist (Task 9). No gaps found.
- **Placeholders:** none; all code complete.
- **Consistency:** `SECTIONS` ids in BottomNav === section ids in App's `active`
  guard === stack keys (`home`, `medications`). `onProtocolSelect` prop name
  used consistently (MedicationsSection ↔ App). `patchStack` signature used
  consistently. Icon names verified against lucide-react (`TriangleAlert`,
  `Pill`, `Home`, `Info`, `Star`, `ChevronDown`, `Search` all exist).
