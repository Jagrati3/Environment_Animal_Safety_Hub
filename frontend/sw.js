const CACHE_NAME = 'ecolife-v2.1';
const STATIC_CACHE = 'ecolife-static-v2.1';
const DYNAMIC_CACHE = 'ecolife-dynamic-v2.1';
const IMAGE_CACHE = 'ecolife-images-v2.1';

// Cache size limits to prevent memory bloat
const MAX_CACHE_SIZE = 50; // Limit cached items
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_IMAGE_CACHE_SIZE = 30; // Limit image cache

// Static assets to cache immediately (reduced list)
const staticAssets = [
  '/',
  '/index.html',
  '/manifest.json',
  // Core CSS only
  '/css/global/variables.css',
  '/css/style.css',
  '/css/components/navbar.css',
  // Core JS only
  '/js/main.js',
  // Critical images only
  '/assets/images/others/envirnoment-logo.webp'
];

// Runtime caching patterns
const cacheStrategies = {
  // Cache-first for static assets
  static: {
    pattern: /\.(?:css|js|woff2?|ttf|eot)$/,
    strategy: 'cache-first'
  },
  // Cache-first for images
  images: {
    pattern: /\.(?:png|jpg|jpeg|gif|webp|avif|svg)$/,
    strategy: 'cache-first'
  },
  // Network-first for API calls
  api: {
    pattern: /\/api\//,
    strategy: 'network-first'
  },
  // Network-first for pages
  pages: {
    pattern: /\.(?:html|htm)$/,
    strategy: 'network-first'
  }
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets)),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Clean expired cache entries
      cleanExpiredCache(),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event with intelligent caching strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) return;

  // Determine caching strategy
  let strategy = 'network-first'; // Default

  for (const [key, config] of Object.entries(cacheStrategies)) {
    if (config.pattern.test(url.pathname)) {
      strategy = config.strategy;
      break;
    }
  }

  // Apply caching strategy
  switch (strategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(event.request));
      break;
    case 'network-first':
      event.respondWith(networkFirst(event.request));
      break;
    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(event.request));
      break;
    default:
      event.respondWith(fetch(event.request));
  }
});

// Cache-first strategy with size limits
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Check if cache entry is expired
      const cacheDate = cachedResponse.headers.get('sw-cache-date');
      if (cacheDate && Date.now() - parseInt(cacheDate) > MAX_CACHE_AGE) {
        await caches.delete(request);
      } else {
        return cachedResponse;
      }
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      
      // Add timestamp header
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache-date': Date.now().toString()
        }
      });
      
      // Limit cache size
      await limitCacheSize(cache, MAX_CACHE_SIZE);
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache-first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network-first strategy with cache limits
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      
      // Add timestamp for expiration
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache-date': Date.now().toString()
        }
      });
      
      // Limit cache size
      await limitCacheSize(cache, MAX_CACHE_SIZE);
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  } catch (error) {
    console.log('Network-first failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Cache size limiter function
async function limitCacheSize(cache, maxSize) {
  const keys = await cache.keys();
  if (keys.length >= maxSize) {
    // Remove oldest entries (FIFO)
    const entriesToDelete = keys.length - maxSize + 1;
    for (let i = 0; i < entriesToDelete; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// Clean expired cache entries
async function cleanExpiredCache() {
  const cacheNames = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  for (const cacheName of cacheNames) {
    try {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const request of keys) {
        const response = await cache.match(request);
        const cacheDate = response?.headers.get('sw-cache-date');
        
        if (cacheDate && Date.now() - parseInt(cacheDate) > MAX_CACHE_AGE) {
          await cache.delete(request);
          console.log('Deleted expired cache:', request.url);
        }
      }
    } catch (error) {
      console.error('Error cleaning cache:', cacheName, error);
    }
  }
}

// Stale-while-revalidate strategy with cache limits
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(async networkResponse => {
    if (networkResponse.ok) {
      // Add timestamp
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache-date': Date.now().toString()
        }
      });
      
      // Limit cache size
      await limitCacheSize(cache, MAX_CACHE_SIZE);
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Background sync for offline actions with enhanced functionality
self.addEventListener('sync', event => {
  console.log('🔄 Background sync triggered:', event.tag);

  switch (event.tag) {
    case 'background-sync':
      event.waitUntil(doBackgroundSync());
      break;
    case 'analytics-sync':
      event.waitUntil(syncAnalyticsData());
      break;
    case 'form-sync':
      event.waitUntil(syncPendingForms());
      break;
    default:
      console.log('Unknown sync tag:', event.tag);
  }
});

// Enhanced background sync with retry logic
async function doBackgroundSync() {
  try {
    console.log('Starting background sync...');

    // Get pending offline actions from IndexedDB or localStorage
    const pendingActions = await getPendingActions();

    if (pendingActions.length === 0) {
      console.log('No pending actions to sync');
      return;
    }

    // Process each pending action
    const results = await Promise.allSettled(
      pendingActions.map(action => processPendingAction(action))
    );

    // Log results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Background sync completed: ${successful} successful, ${failed} failed`);

    // Clean up processed actions
    await cleanupProcessedActions(pendingActions);

  } catch (error) {
    console.error('Background sync failed:', error);
    // Retry logic could be implemented here
  }
}

// Sync analytics data
async function syncAnalyticsData() {
  try {
    // Get stored analytics data
    const analyticsData = await getStoredAnalytics();

    if (analyticsData.length === 0) return;

    // Send to analytics endpoint
    const response = await fetch('/api/analytics/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: analyticsData })
    });

    if (response.ok) {
      await clearStoredAnalytics();
      console.log('Analytics data synced successfully');
    }
  } catch (error) {
    console.error('Analytics sync failed:', error);
  }
}

// Sync pending forms
async function syncPendingForms() {
  try {
    const pendingForms = await getPendingForms();

    for (const form of pendingForms) {
      try {
        const response = await fetch(form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });

        if (response.ok) {
          await markFormAsSynced(form.id);
          console.log('Form synced:', form.id);
        }
      } catch (error) {
        console.error('Form sync failed:', form.id, error);
      }
    }
  } catch (error) {
    console.error('Form sync process failed:', error);
  }
}

// Enhanced push notifications with action buttons
self.addEventListener('push', event => {
  console.log('🔔 Push notification received');

  if (!event.data) {
    console.log('No push data received');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push data:', data);

    const options = {
      body: data.body || 'You have a new notification',
      icon: data.icon || '/assets/images/others/envirnoment-logo.webp',
      badge: data.badge || '/assets/images/others/envirnoment-logo.webp',
      image: data.image, // Hero image for rich notifications
      vibrate: data.vibrate || [100, 50, 100],
      data: {
        url: data.url || '/',
        action: data.action,
        id: data.id
      },
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
      tag: data.tag, // Group similar notifications
      renotify: data.renotify || false,
      actions: data.actions || [
        {
          action: 'view',
          title: 'View',
          icon: '/assets/images/icons/view.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'EcoLife Notification', options)
    );
  } catch (error) {
    console.error('Error processing push notification:', error);
  }
});

// Enhanced notification click handling
self.addEventListener('notificationclick', event => {
  console.log('🔔 Notification clicked:', event.action);

  event.notification.close();

  const notificationData = event.notification.data || {};
  let url = notificationData.url || '/';

  // Handle different actions
  switch (event.action) {
    case 'view':
      // Open the specified URL
      url = notificationData.url || '/';
      break;
    case 'dismiss':
      // Just close, no action
      return;
    case 'like':
      // Handle like action
      handleNotificationAction('like', notificationData.id);
      return;
    case 'share':
      // Handle share action
      handleNotificationAction('share', notificationData.id);
      url = generateShareUrl(notificationData.id);
      break;
    default:
      // Default action
      url = notificationData.url || '/';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Check if there's already a window open with this URL
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Handle notification actions
function handleNotificationAction(action, id) {
  // Send action to main thread or API
  console.log(`Handling notification action: ${action} for ID: ${id}`);

  // Could send to analytics or perform action
  if (id) {
    // Track the action
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'NOTIFICATION_ACTION',
          action: action,
          id: id
        });
      });
    });
  }
}

// Generate share URL for notifications
function generateShareUrl(id) {
  return `/share/${id}`;
}

// Periodic background sync for maintenance tasks
self.addEventListener('periodicsync', event => {
  console.log('🔄 Periodic sync triggered:', event.tag);

  switch (event.tag) {
    case 'update-cache':
      event.waitUntil(updateCachePeriodically());
      break;
    case 'cleanup':
      event.waitUntil(performCleanup());
      break;
    default:
      console.log('Unknown periodic sync tag:', event.tag);
  }
});

// Periodic cache updates
async function updateCachePeriodically() {
  try {
    console.log('Updating cache periodically...');

    // Update static assets that might have changed
    const cache = await caches.open(STATIC_CACHE);
    const keys = await cache.keys();

    // Check for updates to critical resources
    for (const request of keys) {
      try {
        const networkResponse = await fetch(request, { cache: 'no-cache' });
        if (networkResponse.ok) {
          await cache.put(request, networkResponse);
        }
      } catch (error) {
        // Keep existing cached version
      }
    }

    console.log('Cache update completed');
  } catch (error) {
    console.error('Periodic cache update failed:', error);
  }
}

// Periodic cleanup tasks
async function performCleanup() {
  try {
    console.log('Performing periodic cleanup...');

    // Clean up old cache entries
    const cacheNames = await caches.keys();
    const currentVersion = CACHE_NAME.split('-').pop();

    for (const cacheName of cacheNames) {
      if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE &&
          cacheName !== DYNAMIC_CACHE && cacheName !== IMAGE_CACHE) {
        await caches.delete(cacheName);
        console.log('Deleted old cache:', cacheName);
      }
    }

    // Clean up old IndexedDB data if applicable
    // This would depend on your specific data storage needs

    console.log('Cleanup completed');
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
}

// Enhanced message handling
self.addEventListener('message', event => {
  const { type, data } = event.data || {};

  switch (type) {
    case 'GET_CACHE_STATS':
      getCacheStats().then(stats => {
        event.ports[0].postMessage(stats);
      });
      break;

    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;

    case 'UPDATE_CACHE':
      updateSpecificCache(data).then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;

    case 'REGISTER_BACKGROUND_SYNC':
      registerBackgroundSync(data.tag, data.options).then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;

    default:
      console.log('Unknown message type:', type);
  }
});

// Clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('All caches cleared');
}

// Update specific cache entry
async function updateSpecificCache(data) {
  const { url, strategy = 'network-first' } = data;
  if (!url) return;

  const request = new Request(url);
  let response;

  if (strategy === 'network-first') {
    response = await fetch(request);
  } else {
    // Implement other strategies as needed
    response = await fetch(request);
  }

  if (response.ok) {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response);
    console.log('Cache updated for:', url);
  }
}

// Register background sync
async function registerBackgroundSync(tag, options = {}) {
  try {
    await self.registration.sync.register(tag, options);
    console.log('Background sync registered:', tag);
  } catch (error) {
    console.error('Failed to register background sync:', error);
  }
}

// Placeholder functions for data persistence (implement based on your needs)
async function getPendingActions() {
  // Implement based on your data storage (IndexedDB, localStorage, etc.)
  return [];
}

async function processPendingAction(action) {
  // Implement action processing logic
  console.log('Processing action:', action);
}

async function cleanupProcessedActions(actions) {
  // Implement cleanup logic
  console.log('Cleaning up processed actions');
}

async function getStoredAnalytics() {
  // Implement analytics data retrieval
  return [];
}

async function clearStoredAnalytics() {
  // Implement analytics data cleanup
}

async function getPendingForms() {
  // Implement pending forms retrieval
  return [];
}

async function markFormAsSynced(id) {
  // Implement form sync marking
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'GET_CACHE_STATS') {
    getCacheStats().then(stats => {
      event.ports[0].postMessage(stats);
    });
  }
});

async function getCacheStats() {
  const cacheNames = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  const stats = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = keys.length;
  }

  return stats;
}