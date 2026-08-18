# Medication device photos — design

**Date:** 2026-08-18
**Status:** Approved

## Problem

The wound-care work (2026-08-13) restored the product photo panel from CPG p117.
The obvious follow-up was "do the same for all medications".

It cannot be done as stated, and the reason matters more than the feature.

**The Pharmacology section of the CPG (p138–163) contains no photographs at
all.** Every one of the 15 drug pages is text and vector fill. This was
established two ways:

1. Enumerating every image XObject the PDF paints, page by page, with the pdf.js
   build bundled inside `pdf-parse-fork` — no new dependency.
2. Reading the rendered pages (p138, p139, p147) to confirm.

Across all 163 pages the only substantial raster images are the cover and
section dividers, the Paediatric Assessment Triangle (p12, already an SVG in the
app), the pain faces scale (p19, already a shape), the wound dressings (p117,
already done), and **three device photographs on p129 and p132**:

| Device | Native size | Pages |
|---|---|---|
| Yellow adult Epi-Pen auto-injector | 233 × 51 | p129, p132 |
| Green Epi-Pen Jr auto-injector | 233 × 52 | p129, p132 |
| Blue pMDI reliever puffer | 169 × 61 | p132 |

The CPG prints these inline in the Level 1 dose tables — the yellow pen beside
the 0.3 mg row, the green beside 0.15 mg, the puffer beside the pMDI route.
Colour is the field cue for grabbing the right device out of the kit, and it is
the one thing a text extract cannot carry. Sourcing product photos from anywhere
else is out of the question: the CPG is the only authority, and invented content
has caused real defects in this project.

So the work is: bring across the three photos that exist, and record clearly
that there are no others.

## Scope

Photos attach to five protocols — the two Level 1 condition pages that actually
print them, plus the Pharmacology entries for the same two drugs:

| Protocol | Photos |
|---|---|
| `anaphylaxis-cb` | Epi-Pen, Epi-Pen Jr |
| `asthma-cb` | puffer, Epi-Pen, Epi-Pen Jr |
| `adrenaline` | Epi-Pen, Epi-Pen Jr |
| `salbutamol-cb` | puffer × 2 |
| `salbutamol-fr` | puffer × 2 |

11 dosing rows in total. `anaphylaxis-fr` and `asthma-fr` are **excluded** — they
name the devices in text but their own CPG pages show no photograph. The three
nebulised rows on `salbutamol-fr` are excluded for the same reason: nebulised is
not a puffer.

## Design

### 1. Image assets

`src/data/extensions/devicePhotos.js`, a token-keyed map:

```js
export const devicePhotos = {
  'epipen-adult': { width: 233, height: 51, alt: '…', src: 'data:image/jpeg;base64,…' },
  …
};
```

Extracted at native resolution from the PDF via pdf.js rather than cropped out
of a rendered page, which would resample twice. The auto-injectors are stored
upright and rotated onto the page, so they are rotated here to match. JPEG, then
base64-inlined — the service worker only caches an asset after a first *online*
fetch, so a lazy-loaded image could be blank in the field. Total ~20 kB.

`width`/`height` are carried so the browser can reserve the box before decode;
without them `w-auto` measures 0 and the dosing grid jumps as each card paints.

### 2. Content wiring — a token, not the image

A dosing entry carries `photo: 'epipen-adult'`. Nothing else changes.

The token matters. `contentData.js` is spliced by `assemble_content.mjs`, which
evaluates the module and re-serialises it: a plain string round-trips untouched,
whereas an inlined data URI would be re-emitted as 20 kB of base64 in the middle
of the protocol content, and an imported identifier would need special-casing in
the assembler the way `dressingPhotos` does.

Which bytes to draw is a rendering concern, so `ProtocolView` owns the map.

### 3. Renderer — thumbnail on the dosing card

`DosingCards` resolves `devicePhotos[d.photo]` and draws it between the card
header and the route/dose grid. Each card is one device/dose pairing, so the
photo belongs to the card.

Two layout decisions came out of testing at 375 px:

- **Own line, not floated beside the header.** Putting the photo right of the
  header squeezed "IF ANAPHYLAXIS OR THUNDERSTORM ASTHMA" onto three lines.
- **Sized by height (`h-10 w-auto`), not width.** The pens are long and thin
  (233 × 51) and the puffer is stubby (169 × 61); equal widths made the puffer
  tower over the pens. Equal height reads as a row of kit at consistent scale.

No new `renderValue` shape and no early return — `DosingCards` already serves
both the quick view and the 📖 detail modal.

### 4. Pipeline — survive regeneration

All five protocols have regen JSONs, which are built from the text layer and
know nothing about `photo`. Without a fix, the next `assemble_content.mjs` run
silently deletes all 11 tokens — the same trap `dressingPhotos` fell into.

`assemble_content.mjs` gains `DOSING_PHOTO_RULES`, which re-applies the tokens
after regeneration by **matching on the route text, not an array index**. A stale
index would quietly attach the adult Epi-Pen photo to the paediatric dose;
matching on the route either finds the right row or finds nothing, and finding
nothing throws.

### 5. Lint

`pnpm check-device-photos` fails if a `photo` token does not resolve, or if a
photo is never referenced. An unknown token renders nothing — no error, no
placeholder — so the failure mode is silent removal of a safety cue.

## Verification

- `pnpm build`: 430.76 kB → 450.91 kB, +20.15 kB, matching the base64 payload.
  The delta is the evidence the images are reachable: a broken wound-care commit
  was caught exactly this way, when an unused import got tree-shaken and the
  bundle stayed at baseline.
- Headless Chrome over CDP at 375 px, deviceScaleFactor 2: all 5 protocols show
  exactly the expected photos, decoded and non-broken, in both the quick view and
  the 📖 detail modal. Zero console errors.
- `pnpm check-device-photos` and `pnpm check-age-bands` pass; the new lint was
  confirmed to fail on a deliberately corrupted token.
