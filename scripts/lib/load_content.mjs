// Load src/data/contentData.js as a module, for scripts that need the resolved
// protocol objects rather than the source text.
//
// Every script used to copy the file into os.tmpdir() and import from there.
// That broke the moment contentData.js gained a relative import
// (./extensions/woundDressingPhotos.js): from /tmp the specifier resolves to
// /tmp/extensions/... and node throws ERR_MODULE_NOT_FOUND. The copy has to sit
// in src/data/ so relative specifiers resolve, and the URL has to be built with
// pathToFileURL - 'file://' + a relative path parses the first segment as the
// URL host (ERR_INVALID_FILE_URL_HOST).
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export const CONTENT_FILE = 'src/data/contentData.js';

export async function loadContent(file = CONTENT_FILE) {
  const tmp = path.join(path.dirname(file), `.cd-load-${process.pid}.mjs`);
  fs.writeFileSync(tmp, fs.readFileSync(file, 'utf8'));
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    // finally, so a failed import cannot strand the temp module in src/data/
    fs.rmSync(tmp, { force: true });
  }
}

// The three content groups merged into one object of key -> protocol.
export async function loadAllProtocols(file = CONTENT_FILE) {
  const m = await loadContent(file);
  return { ...m.assessmentsContent, ...m.conditionsContent, ...m.medicationsContent };
}
