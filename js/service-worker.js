/**
 * Service Worker mit erweitertem Caching und Offline-Funktionalität
 */
'use strict';

const FILE_VERSION = 'v0.0.1.7.1';
const CACHE_NAME = `sg-sternenkinder-cache-${FILE_VERSION}`;
const OFFLINE_PAGE = 'https://sg-sternenkinder.github.io/offline.html';

// Zu cachende Ressourcen
const PRECACHE_RESOURCES = [
  'https://sg-sternenkinder.github.io/',
  'https://sg-sternenkinder.github.io/site.webmanifest',
  'https://sg-sternenkinder.github.io/css/style.css',

  'https://sg-sternenkinder.github.io/js/jquery-3.7.1.min.js',
  'https://sg-sternenkinder.github.io/js/cookie.js',
  'https://sg-sternenkinder.github.io/js/popup.js',
  'https://sg-sternenkinder.github.io/consolenManager.js',
  'https://sg-sternenkinder.github.io/js/language-switcher.js',
  'https://sg-sternenkinder.github.io/js/footer.js',
  'https://sg-sternenkinder.github.io/js/noscript-loading.js',
  'https://sg-sternenkinder.github.io/js/scrollback.js',
  'https://sg-sternenkinder.github.io/js/toggleMenu.js',
  'https://sg-sternenkinder.github.io/js/error-popup.js',

  'https://sg-sternenkinder.github.io/img/favicon/favicon.ico',
  'https://sg-sternenkinder.github.io/img/favicon/apple-touch-icon.png',
  'https://sg-sternenkinder.github.io/img/background.png',

  'https://sg-sternenkinder.github.io/img/svg-icons/tiktok2.svg',
  'https://sg-sternenkinder.github.io/img/svg-icons/instagram.svg',
  'https://sg-sternenkinder.github.io/img/svg-icons/discord.svg',
  'https://sg-sternenkinder.github.io/img/svg-icons/globe.svg',
  'https://sg-sternenkinder.github.io/img/svg-icons/arrow-up.svg',

  '/offline.html'
];

// Installationsereignis - Precaching wichtiger Ressourcen
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Precaching resources');
                return cache.addAll(PRECACHE_RESOURCES);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Removing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );

            await self.clients.claim();

            const clients = await self.clients.matchAll();
            clients.forEach(client => {
                if (client.type === 'window' && 'navigate' in client) {
                    client.navigate(client.url);
                }
            });
        })()
    );
});

// Fetch-Strategie: Network First, Fallback to Cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests and chrome-extension requests
    if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Nur erfolgreiche Responses cachen
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseToCache));
                }
                return response;
            })
            .catch(async () => {
                // Fallback zu Cache oder Offline-Seite
                const cachedResponse = await caches.match(event.request);
                return cachedResponse || caches.match(OFFLINE_PAGE);
            })
    );
});

// Nachrichtenhandler für Offline-Kommunikation
self.addEventListener('message', (event) => {
    if (!event.data) return;

    switch (event.data.type) {
        case 'offline':
            notifyClients('showOfflinePopup', event.data.data);
            break;
        case 'checkConnection':
            checkConnection().then(isOnline => {
                notifyClients('connectionStatus', { isOnline });
            });
            break;
        default:
            console.log('[SW] Unknown message type:', event.data.type);
    }
});

/**
 * Benachrichtigt alle Clients
 * @param {string} type - Nachrichtentyp
 * @param {object} data - Zu sendende Daten
 */
function notifyClients(type, data = {}) {
    self.clients.matchAll()
        .then(clients => {
            clients.forEach(client => {
                client.postMessage({ type, data });
            });
        });
}

/**
 * Überprüft die Verbindung
 * @returns {Promise<boolean>} - true wenn online
 */
function checkConnection() {
    return fetch('/health-check', { method: 'HEAD' })
        .then(() => true)
        .catch(() => false);
}
