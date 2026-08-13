// Hatzolah CPG service worker.
//
// Replaced at build time by scripts/stamp_sw.mjs, so every deploy ships a new
// cache name and a byte-different script. Both matter:
//   * browsers detect a service worker update by BYTE-COMPARING this file. The
//     previous version was unchanged for months, so no update was ever detected,
//     `activate` never ran, and the old cache was never purged - an installed
//     app could not pick up a deploy at all.
//   * the old fetch handler was cache-first for EVERY request including
//     index.html. A phone kept serving cached HTML pointing at the previous
//     hashed bundle, so the new JS was never requested.
//
// Strategy now:
//   navigations (index.html)  -> network-first, fall back to cache when offline
//   everything else           -> stale-while-revalidate (instant, self-healing)
// Offline still works: anything already cached is served when the network fails,
// which is the whole point of this app in the field.
const VERSION = '202608130751-59da137';
const CACHE_NAME = `hatzolah-cpg-${VERSION}`;
const OFFLINE_URL = '/hatzolah-cpg/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      '/hatzolah-cpg/',
      OFFLINE_URL,
    ])).catch(() => { /* a failed precache must not block activation */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: always try the network first so a deploy is picked up on the
  // next open. Fall back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(OFFLINE_URL, copy));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL).then((r) => r || caches.match(request)))
    );
    return;
  }

  // Assets: serve from cache immediately, refresh in the background. Vite's
  // filenames are content-hashed, so a cache hit is always the right bytes.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Lets the page ask this worker to take over immediately.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
