# Wound Care dressing photos — design

**Date:** 2026-08-13
**Status:** Approved

## Problem

Page 117 of the CPG (Wound Care, p112–117) carries a photo panel: three product
photographs of the supplied dressings, each with a caption and size. The v6.2
content rebuild extracted this panel as a **text-only** table
(`suppliedDressings` on the `wound-care` protocol) because pdf.js drops graphics
silently. The photos themselves were never brought across. A responder cannot
visually recognise the physical product in their kit.

The three photos:

| Caption | Size |
|---|---|
| Silicone foam (Biatain) | 7.5 × 7.5 cm and 12.5 × 12.5 cm |
| Adhesive wound tape (Steri-Strips) | 6 × 100 mm strips |
| Non adherent dressing (Melolin) | 10 × 10 cm |

## Constraints

- The app has **no raster-image support today** — protocol content renders only
  text, tables, and two inline SVG diagrams (PAT triangle, clinical-approach
  flowchart).
- Offline-first field app. The service worker precaches only the shell and uses
  stale-while-revalidate for other assets — a lazy-loaded image would only cache
  after a first *online* view, so it could be blank in the field.
- Content renders through `renderValue` shape dispatch in `ProtocolView.jsx`;
  both the quick view and the 📖 detail modal use it. CLAUDE.md forbids adding
  early returns to `QuickProtocolContent` and forbids removing `flex-shrink-0`.
- The CPG is the only authority — photos are extracted from the source PDF, not
  sourced elsewhere.

## Design

### 1. Image assets (offline-safe)
Extract the three photos from p117 of `source/Compiled_v6_2.pdf`, crop tightly,
downscale to ~320 px wide, compress to JPEG, and base64-encode. Store in a new
tracked module `src/data/extensions/woundDressingPhotos.js`:

```js
export const woundDressingPhotos = [
  { src: 'data:image/jpeg;base64,…', caption: 'Silicone foam (Biatain)',        size: '7.5 × 7.5 cm and 12.5 × 12.5 cm' },
  { src: 'data:image/jpeg;base64,…', caption: 'Adhesive wound tape (Steri-Strips)', size: '6 × 100 mm strips' },
  { src: 'data:image/jpeg;base64,…', caption: 'Non adherent dressing (Melolin)',  size: '10 × 10 cm' },
];
```

Base64 data URIs are bundled into the JS, so the images are guaranteed available
offline with no service-worker change. Target total added footprint < 60 kB.
Keeping the blobs in their own module keeps `contentData.js` readable.

### 2. Renderer — new photo-card shape
Add one shape detector to `renderValue` in `ProtocolView.jsx`: an array whose
every item is an object with a `src` string → render responsive photo cards
(image, caption in bold, size muted below). Placed among the existing
array-of-object detectors, **before** the generic array-of-objects fallback, so
it is picked up first. No early return; both quick view and detail modal inherit
it automatically.

### 3. Content wiring
Keep the existing `suppliedDressings` table. Add `dressingPhotos: woundDressingPhotos`
to the `wound-care` content object immediately after `suppliedDressings`. The
heading renders as "Dressing Photos".

### 4. Pipeline note
`contentData.js` is normally spliced by `assemble_content.mjs` from regen JSON.
`dressingPhotos` is an app-added reference, not text regen content. Verify it is
preserved and document it so a future `assemble conditions` run does not silently
drop it.

## Verification
- `pnpm build` succeeds; note bundle-size delta.
- Wound Care quick view shows the three photos with captions/sizes below the
  dressings table, at 375 px.
- 📖 detail modal shows the same.
- Images render with the network disabled (offline).
