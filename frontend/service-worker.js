// frontend/service-worker.js
// Service Worker for offline support and caching

const CACHE_NAME = 'food-rescue-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/frontend/pages/food-rescue-grid.html',
  '/frontend/js/food-rescue-grid.js',
  '/frontend/css/food-rescue-grid.css',
  // Add other assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() => caches.match('/frontend/pages/food-rescue-grid.html'))
    )
  );
});

// Background sync and queueing can be added for POST requests if needed
