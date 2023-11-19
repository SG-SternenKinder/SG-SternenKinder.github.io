// service-worker.js

// Cach Versionsname
const CACHE_NAME = 'cache-v1.1.2.6';

// Installationsereignis: Wird ausgelöst, wenn der Service Worker installiert wird.
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
        // Öffne den Cache mit dem Namen CACHE_NAME.
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened');
            // Füge die erforderlichen Ressourcen zum Cache hinzu.
            return cache.addAll([
                new URL('index.html', self.registration.scope),
                'https://sg-sternenkinder.github.io/index.html',
                'https://sg-sternenkinder.github.io/about/index.html',
                'https://sg-sternenkinder.github.io/privacy/index.html',
                'https://sg-sternenkinder.github.io/imprint/index.html',
                'https://sg-sternenkinder.github.io/cookies/index.html',
                'https://sg-sternenkinder.github.io/contact/index.html',
                'https://sg-sternenkinder.github.io/img/favicon/favicon.ico',
                'https://sg-sternenkinder.github.io/img/language/de-32.png',
                'https://sg-sternenkinder.github.io/img/language/en-32.png',
                'https://sg-sternenkinder.github.io/js/announcement.js',
                'https://sg-sternenkinder.github.io/js/cookie.js',
                'https://sg-sternenkinder.github.io/js/footer.js',
                'https://sg-sternenkinder.github.io/js/language-switcher.js',
                'https://sg-sternenkinder.github.io/js/popup.js',
                'https://sg-sternenkinder.github.io/js/scrollback.js',
                'https://sg-sternenkinder.github.io/language/language-de.txt',
                'https://sg-sternenkinder.github.io/language/language-en.txt',
                'https://sg-sternenkinder.github.io/css/style.css',
                'https://sg-sternenkinder.github.io/css/media.css',
                'https://sg-sternenkinder.github.io/fontawesome/js/fontawesome.js',
                'https://sg-sternenkinder.github.io/fontawesome/js/brand.js',
                'https://sg-sternenkinder.github.io/fontawesome/js/solid.js'
            ]);
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