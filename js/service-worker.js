/**
 * Service Worker mit erweitertem Caching und Offline-Funktionalität
 * @version v0.0.1.6
 */
'use strict';

const FILE_VERSION = 'v0.0.1.7';
const CACHE_NAME = `cache-${FILE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

// Zu cachende Ressourcen
const PRECACHE_RESOURCES = [
  '/',
  '/site.webmanifest',
  '/css/style.css',

  '/js/jquery-3.7.1.min.js',
  '/js/cookie.js',
  '/js/popup.js',
  '/consolenManager.js',
  '/js/language-switcher.js',
  '/js/background.js',
  '/js/footer.js',
  '/js/noscript-loading.js',
  '/js/scrollback.js',
  '/js/toggleMenu.js',
  '/js/error-popup.js',

  '/img/favicon/favicon.ico',
  '/img/favicon/icon.svg',
  '/img/favicon/apple-touch-icon.png',
  '/img/background.png',

  '/img/svg-icons/tiktok2.svg',
  '/img/svg-icons/instagram.svg',
  '/img/svg-icons/discord.svg',
  '/img/svg-icons/globe.svg',
  '/img/svg-icons/arrow-up.svg',

  OFFLINE_PAGE
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
