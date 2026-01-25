/**
 * EcoLife Progressive Web App - Service Worker
 * Provides offline functionality and caching strategies
 * 
 * Caching Strategies:
 * - Cache-First: For static assets (CSS, JS, images, fonts)
 * - Stale-While-Revalidate: For content pages (HTML)
 * - Network-First: For API requests and dynamic content
 */

const CACHE_VERSION = 'ecolife-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const OFFLINE_URL = 'offline.html';

// Static assets to cache immediately on install
const STATIC_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './css/style.css',
  './css/global/variables.css',
  './css/global/accessibility.css',
  './css/components/navbar.css',
  './css/components/card.css',
  './css/components/footer.css',
  './css/components/hero.css',
  './css/components/sections.css',
  './css/components/scrollBar.css',
  './css/components/modal.css',
  './css/components/quiz.css',
  './css/components/reportForm.css',
  './css/pages/home.css',
  './css/pwa.css',
  './js/main.js',
  './js/pwa.js',
  './assets/images/others/envirnoment-logo.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png'
];

// Pages to cache for offline reading
const CONTENT_PAGES = [
  './pages/plant-care.html',
  './pages/animal-safety/pet-adoption.html',
  './pages/emergency-wildlife-help.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('ecolife-') && 
                     cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with appropriate caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (except CDN resources)
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('cdnjs.cloudflare.com') &&
      !url.hostname.includes('unpkg.com')) {
    return;
  }

  // Determine caching strategy based on request type
  if (isStaticAsset(url.pathname)) {
    // Cache-First for static assets
    event.respondWith(cacheFirst(request));
  } else if (isContentPage(url.pathname)) {
    // Stale-While-Revalidate for content pages
    event.respondWith(staleWhileRevalidate(request));
  } else if (isExternalResource(url)) {
    // Cache-First for external CDN resources
    event.respondWith(cacheFirst(request));
  } else {
    // Network-First for everything else
    event.respondWith(networkFirst(request));
  }
});

// Helper: Check if request is for a static asset
function isStaticAsset(pathname) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Helper: Check if request is for a content page
function isContentPage(pathname) {
  return pathname.endsWith('.html') || pathname.endsWith('/');
}

// Helper: Check if request is for external resource
function isExternalResource(url) {
  return url.hostname.includes('fonts.googleapis.com') ||
         url.hostname.includes('fonts.gstatic.com') ||
         url.hostname.includes('cdnjs.cloudflare.com') ||
         url.hostname.includes('unpkg.com');
}

/**
 * Cache-First Strategy
 * Best for: Static assets that rarely change (CSS, JS, images, fonts)
 * - Try cache first
 * - If not found, fetch from network and cache
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Cache-First failed:', error);
    return new Response('Resource not available offline', { status: 503 });
  }
}

/**
 * Stale-While-Revalidate Strategy
 * Best for: Content pages (HTML)
 * - Return cached version immediately
 * - Update cache in background for next visit
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  // Fetch fresh content in background
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.error('[Service Worker] Background fetch failed:', error);
      return null;
    });

  // Return cached response immediately, or wait for network
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetchPromise;
  
  if (networkResponse) {
    return networkResponse;
  }

  // Fallback to offline page
  return caches.match(OFFLINE_URL);
}

/**
 * Network-First Strategy
 * Best for: Dynamic content, API requests
 * - Try network first
 * - Fall back to cache if network fails
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache...');
    
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for HTML requests
    if (request.headers.get('Accept')?.includes('text/html')) {
      return caches.match(OFFLINE_URL);
    }

    return new Response('Content not available offline', { status: 503 });
  }
}

// Background Sync - queue failed requests for later
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Sync event:', event.tag);
  
  if (event.tag === 'sync-reports') {
    event.waitUntil(syncReports());
  }
});

// Sync queued reports when back online
async function syncReports() {
  try {
    const cache = await caches.open('ecolife-pending');
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      const body = await response.json();
      
      try {
        await fetch(request.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        
        await cache.delete(request);
        console.log('[Service Worker] Synced report:', request.url);
      } catch (error) {
        console.error('[Service Worker] Failed to sync report:', error);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

// Push notifications support
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received');
  
  const options = {
    body: event.data?.text() || 'New update from EcoLife!',
    icon: './assets/icons/icon-192x192.png',
    badge: './assets/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore', title: 'View Update', icon: './assets/icons/icon-96x96.png' },
      { action: 'close', title: 'Close', icon: './assets/icons/icon-96x96.png' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('EcoLife 🌱', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('./')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
  
  if (event.data && event.data.type === 'CACHE_CONTENT') {
    cacheContent(event.data.urls);
  }
});

// Cache additional content (like articles user wants to save)
async function cacheContent(urls) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
        console.log('[Service Worker] Cached:', url);
      }
    } catch (error) {
      console.error('[Service Worker] Failed to cache:', url, error);
    }
  }
}
