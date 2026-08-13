// Stamp the built service worker with a unique version.
//
// Browsers decide a service worker has changed by byte-comparing the script. The
// old worker carried a hardcoded cache name and sat unchanged for months, so no
// update was ever detected and installed phones could not pick up a deploy.
// Stamping guarantees every build ships a byte-different worker AND a fresh
// cache name, so the activate handler purges the previous cache.
//
// Runs automatically as part of `pnpm build`.
import fs from 'fs';
import { execSync } from 'child_process';

const FILE = 'dist/service-worker.js';

if (!fs.existsSync(FILE)) {
  console.error(`stamp_sw: ${FILE} not found - run vite build first`);
  process.exit(1);
}

let sha = 'nogit';
try {
  sha = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch { /* not a git checkout - fall through to the timestamp alone */ }

const stamp = `${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12)}-${sha}`;
const src = fs.readFileSync(FILE, 'utf8');

if (!src.includes('__SW_VERSION__')) {
  console.error('stamp_sw: no __SW_VERSION__ placeholder found - was the worker edited?');
  process.exit(1);
}

fs.writeFileSync(FILE, src.replace(/__SW_VERSION__/g, stamp));
console.log(`stamp_sw: cache name -> hatzolah-cpg-${stamp}`);
