const CACHE_NAME = 'tools-hub-v3';
const ASSETS = [
  '/tools/',
  '/tools/index.html',
  '/tools/tools.json',
  '/tools/assets/css/style.css',
  '/tools/assets/css/tool-style.css',
  '/tools/assets/css/landing-polish.css'
];

// 1. Install & Cache Core UI
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Smart Fetching
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Check if request is an API call (External Domain)
  if (url.hostname !== location.hostname) {
    e.respondWith(
      fetch(e.request).catch(() => {
        // Fallback when API fails (Offline)
        return new Response(
          JSON.stringify({ error: "Offline: API unavailable" }), 
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Standard Cache-First for local assets
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
