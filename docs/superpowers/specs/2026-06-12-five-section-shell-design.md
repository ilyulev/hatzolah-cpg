# Five-Section App Shell — Design Spec

**Date:** 2026-06-12
**Status:** Approved design, pending implementation plan
**Step:** 1 of 3 (next: Main↔Extended protocol toggle; then: NSW/NZ extended content)

## Purpose

Restructure the Hatzolah CPG app from a single home-rooted view stack into five
sections behind a bottom navigation bar. Separate *sourced CPG content* from the
*app's own extensions*, and create homes for new content types (differential
reasoning aid, reference material, halachic guidance).

## Content provenance — the two-tier rule

| Tier | Sections | Source | Constraints |
|------|----------|--------|-------------|
| **Sourced** | Home, Medications | Hatzolah CPG v6.2 (Main); NSW/NZ CPGs later (Extended, step 2) | Faithful to source PDFs; level rules (`CAN_PERFORM`/`REFERENCE_ONLY`) apply; dosing goes through the verification workflow (extract → flag → human verify) |
| **Extension** | Alerts, Info, Halakha | Curated by the app owner | Original content; no source fidelity requirement; marked "supplementary — not part of Hatzolah CPG"; lives in separate data files so CPG re-extraction never touches it |

## Sections

### 🏠 Home — clinical guidelines (sourced)
- Assessments + conditions, exactly as today, **minus medications**.
- Category tiles → CategoryView (My Scope / Reference Only) → ProtocolView.
- Level filtering unchanged.

### 💊 Medications — pharmacology (sourced)
- The 14 pharmacology entries move out of Home into their own section.
- Flat browsable list (grouped by category chip, e.g. cardiac/respiratory), each →
  the same ProtocolView used today.
- Level filtering unchanged (e.g. Midazolam = SR; CB sees Epi-Pen/Glucose Paste).
- In step 2 this section (and Home protocols) gain the Main↔Extended header toggle.

### 🔺 Alerts — differential reasoning aid (extension)
- Purpose: "I see something out of normal range — what could it be, and what
  should I not forget to check?" **Non-mandatory**; points to think about.
- Data shape: list of entries `{ finding, description?, considerations: [ { cause, hint? } ], checkNext?: [] }`.
  - Example: finding "Low BP (sBP <90)" → considerations: hypotension, internal
    bleeding, sepsis, anaphylaxis/allergy, cardiogenic, dehydration; checkNext:
    rash/hives, abdo pain, temperature, HR trend.
- Seeded at launch with ~6–8 common findings (low BP, high/low HR, low SpO2,
  altered consciousness, high temp, low BGL, tachypnoea); owner expands later.
- Banner at top: "Supplementary aid — not a substitute for the CPG. For mandatory
  escalation criteria see Clinical Flags."  Links to the Clinical Flags protocol.
- Explicitly distinct from Clinical Flags (mandatory escalation stays in Home).
- Future (out of scope): AI chat, medication image recognition.

### ℹ️ Info — reference (extension)
- Acronyms & abbreviations list, seeded with common Australian ambulance/CPG
  terms (e.g. AVPU, GCS, ROSC, sBP, SpO2, BGL, NRB, pMDI, ODT, GCSE, PSA, APO,
  VVED, ACS, CVA/TIA, COPD, PHx, Mx, PRN, IM/IV/IN…). Searchable simple list.
- Future home (out of scope now): patient medication classes reference
  (anticoagulants, beta-blockers…), more reference material from the owner.

### ✡️ Halakha — religious guidance (extension)
- Placeholder screen: section header + "Content coming soon" state.
- Data file scaffolded (empty) so content can be added without structural work.

## Architecture

- **No react-router** (project constraint). Extend the existing view-state machine:
  - New top-level state: `section: 'home' | 'medications' | 'alerts' | 'info' | 'halakha'`.
  - Each section keeps its own drill-down state so switching tabs preserves
    position (e.g. Home's category/protocol stack survives visiting Info).
    Implementation: one state object in App keyed by section id
    (`{ home: { view, category, protocol, … }, medications: { … }, … }`);
    the active section reads/writes its own slice.
- **New components:**
  - `BottomNav` — 5 tabs, fixed bottom, safe-area padding; active tab highlighted.
  - `TopBar` — app title + **level chip** (`FR ▾`). Tapping the chip opens the
    existing level switcher (Settings' level list, presented as a sheet/modal
    with the existing confirmation). Replaces the gear-only entry point; the
    About info moves to Info section footer.
  - `MedicationsSection`, `AlertsSection`, `InfoSection`, `HalakhaSection`.
- **Reused unchanged:** `CategoryView`, `ProtocolView` (incl. universal/ALL logic,
  fixed 📖 header), `LevelSelection` (first run), level matrices.
- **Data:**
  - `contentData.js` unchanged (sourced tier).
  - New `src/data/extensions/alertsContent.js`, `infoContent.js`,
    `halakhaContent.js` (extension tier).
- **First run:** unchanged — LevelSelection gate before the shell appears.
- **PWA/offline:** no changes; all content stays bundled.

## Visual/UX notes

- Bottom nav: 5 items, emoji or lucide icons + short labels
  (Home / Meds / Alerts / Info / Halakha). Active = level-colour accent.
- Extension sections show a slim "supplementary" banner (Alerts wording above;
  Info/Halakha a lighter variant) to preserve the authoritative/extension line.
- ProtocolView's fixed-header rule (📖 always reachable) is untouched; in step 2
  that button becomes the Main↔Extended toggle.

## Error handling

- Unknown/empty section state falls back to Home.
- Extension data files export plain arrays; empty array renders the section's
  empty state (Halakha ships that way deliberately).

## Testing / verification

- `pnpm build` clean; preview walkthrough:
  1. First run → level picker → shell with Home active.
  2. Tab through all 5 sections; verify content, banners, empty Halakha.
  3. Home no longer lists medications; Medications tab has all 14, level-filtered
     per CB/FR/SR (spot-check each level via the chip).
  4. Level chip: change FR→CB via confirmation; visible content updates.
  5. Drill into Home → category → protocol, switch to Info, return → stack preserved.
  6. 📖 detailed view still reachable at every scroll position.

## Out of scope (later steps)

- Step 2: Main↔Extended toggle in ProtocolView header (per approved mockups:
  quick-view = Main/Hatzolah; comprehensive collapsible layout = Extended/NSW-NZ),
  extended-content data model, per-protocol source badges.
- Step 3: actual NSW/NZ CPG content sourcing/extraction into the Extended layer.
- AI chat, image recognition, drug-classes reference content (Info, later).
