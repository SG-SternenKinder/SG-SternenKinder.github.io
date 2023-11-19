// service-worker.js

// Cach Versionsname
const FILE_VERSION = 'v0.0.0.6';
const CACHE_NAME = 'cache-' + FILE_VERSION;

// Definiere die URLs ohne Dateinamen
const urlsToCache = [
    removeFileName('https://sg-sternenkinder.github.io/index.html'),
    removeFileName('https://sg-sternenkinder.github.io/about/index.html'),
    removeFileName('https://sg-sternenkinder.github.io/privacy/index.html'),
    removeFileName('https://sg-sternenkinder.github.io/imprint/index.html'),
    removeFileName('https://sg-sternenkinder.github.io/cookies/cookies.html'),
    removeFileName('https://sg-sternenkinder.github.io/contact/index.html')
];

// Definiere die URLs, die nicht modifiziert werden sollen
const RessourceToCache = [
    './',
    './img/favicon/favicon.ico',
    './img/language/de-32.png',
    './img/language/en-32.png',
    './js/announcement.js',
    './js/cookie.js',
    './js/footer.js',
    './js/language-switcher.js',
    './js/popup.js',
    './js/scrollback.js',
    './language/language-de.txt',
    './language/language-en.txt',
    './css/style.css',
    './css/media.css',
    './fontawesome/js/fontawesome.js',
    './fontawesome/js/brand.js',
    './fontawesome/js/solid.js'
];

// Installationsereignis: Wird ausgelöst, wenn der Service Worker installiert wird.
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
        // Öffne den Cache mit dem Namen CACHE_NAME.
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened');

            // Füge zum Cache hinzu
            const modifiedCachePromise = cache.addAll(urlsToCache);

            // Füge zum Cache hinzu
            const unmodifiedCachePromise = cache.addAll(RessourceToCache);

            // Warte darauf, dass beide Vorgänge abgeschlossen sind
            return Promise.all([modifiedCachePromise, unmodifiedCachePromise]);
        }).then(() => {
            console.log('Resources added to cache');
        }).catch((error) => {
            console.error('Error adding to cache:', error);
        })
    );
});

//Network-first-fallback-to-Cach event
self.addEventListener('fetch', async (event) => {
    console.log('Fetching:', event.request.url);

    try {
        const response = await fetch(event.request);

        console.log('Fetch successful:', response);

        // Hier prüfen, ob die Anfrage erfolgreich war
        if (!response || response.status !== 200 || response.type !== 'basic') {
            console.log('Fetching failed, falling back to cache');
            return caches.match(event.request);
        }

        // Aktualisiere den Cache mit der neuen Ressource
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());

        return response;
    } catch (error) {
        console.error('Fetch error:', error);

        // Hier kann auch auf die Offline-Status-Nachricht reagiert werden
        const clients = await self.clients.matchAll();
        clients.forEach(client => client.postMessage('offline'));

        // Falle auf den Cache zurück, wenn das Netzwerk nicht verfügbar ist
        return caches.match(event.request);
    }
});

// Add this event listener for offline detection
self.addEventListener('message', (event) => {
    console.log('Message event:', event.data);
    if (event.data.type === 'offline') {
        console.log('Offline message received');
        // Wenn offline, sende eine Nachricht an die Clients, um das Offline-Popup anzuzeigen
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ type: 'showOfflinePopup', data: event.data.data }));
        });
    }
});