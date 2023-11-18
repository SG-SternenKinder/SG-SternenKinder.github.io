// service-worker.js

// Cach Versionsname
const CACHE_NAME = 'cache-v1';

// Installationsereignis: Wird ausgelöst, wenn der Service Worker installiert wird.
self.addEventListener('install', (event) => {
    event.waitUntil(
        // Öffne den Cache mit dem Namen CACHE_NAME.
        caches.open(CACHE_NAME).then((cache) => {
            // Füge die erforderlichen Ressourcen zum Cache hinzu.
            return cache.addAll([
                '/',
                '/index.html',
                '/img/favicon/favicon.ico',
                // Füge hier alle Dateien hinzu, die zwischengespeichert werden sollen
            ]);
        })
    );
});

//Network-first-fallback-to-Cach event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Versuche die Ressource vom Netzwerk zu laden und fallbacke auf den Cache, falls erforderlich.
        fetch(event.request).then((response) => {
            // Aktualisiere den Cache mit der neuen Ressource
            return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response.clone());
                return response;
            });
        }).catch(() => {
            //prüfe, ob der Service Worker offline ist
            if (!navigator.onLine) {
                // Service Worker ist offline, sende eine Nachricht an die Seite
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => client.postMessage('offline'));
                });
            }
            // Falle auf den Cache zurück, wenn das Netzwerk nicht verfügbar ist
            return caches.match(event.request);
        })
    );
});

// Add this event listener for offline detection
self.addEventListener('message', (event) => {
    if (event.data === 'offline') {
        // If offline, send a message to the clients to show the offline popup
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage('showOfflinePopup'));
        });
    }
});