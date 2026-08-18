// Lint for the device-photo tokens on dosing entries.
//
// A dosing entry can name a device photograph with `photo: 'epipen-adult'`,
// which ProtocolView resolves against src/data/extensions/devicePhotos.js. An
// unknown token renders nothing at all - no error, no placeholder - so a typo
// or a renamed key silently removes the yellow/green/blue cue a responder uses
// to pick the right device out of the kit. That is exactly the kind of silent
// content loss this project has been bitten by before, hence a lint.
//
// Also flags photos left unused, which usually means a token was renamed on one
// side only.
//
//   pnpm check-device-photos       (exit 1 if any token is unresolved)
import { loadAllProtocols } from './lib/load_content.mjs';
import { devicePhotos } from '../src/data/extensions/devicePhotos.js';

const all = await loadAllProtocols();
const bad = [];
const used = new Set();

for (const [key, proto] of Object.entries(all)) {
  (function walk(node, trail) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((v, i) => walk(v, `${trail}[${i}]`));
      return;
    }
    if (typeof node.photo === 'string') {
      if (devicePhotos[node.photo]) used.add(node.photo);
      else bad.push({ key, trail, token: node.photo });
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${trail}.${k}`);
  })(proto.content, '');
}

for (const { key, trail, token } of bad) {
  console.error(`unresolved photo token '${token}'  ${key}${trail}`);
}
const unused = Object.keys(devicePhotos).filter((k) => !used.has(k));
for (const k of unused) console.error(`devicePhotos['${k}'] is never referenced`);

if (bad.length || unused.length) {
  console.error(`\n${bad.length} unresolved token(s), ${unused.length} unused photo(s)`);
  process.exit(1);
}
console.log(`device photos OK - ${used.size} photo(s) referenced, all tokens resolve`);
