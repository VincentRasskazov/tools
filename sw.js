// 1. Force the new service worker to take over immediately
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // 2. Clean up any OLD caches from previous versions
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.map(name => caches.delete(name)));
    })
  );
  self.clients.claim();
});

// 3. Network Only: Just a pass-through
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
