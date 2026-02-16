const CACHE_NAME = 'tools-hub-v1';
const ASSETS = [
  '/tools/',
  '/tools/index.html',
  '/tools/tools.json',
  // All your CSS files from the image
  '/tools/assets/css/style.css',
  '/tools/assets/css/tool-style.css',
  '/tools/assets/css/landing-polish.css',
  // External assets
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
];

// Install: Cache all essential assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch: Serve from cache if offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
