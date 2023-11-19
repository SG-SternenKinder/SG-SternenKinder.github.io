// service-worker.js

// Cach Versionsname
const FILE_VERSION = 'v0.0.0.9';
const CACHE_NAME = 'cache-' + FILE_VERSION;

// Installationsereignis: Wird ausgelöst, wenn der Service Worker installiert wird.
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('fetch', async (event) => {
    console.log('Fetching:', event.request.url);

    try {
        const response = await fetch(event.request);

        console.log('Fetch successful:', response);

        // Hier prüfen, ob die Anfrage erfolgreich war
        if (!response || response.status !== 200 || response.type !== 'basic') {
            console.log('Fetching failed');
            // Hier kannst du eine benutzerdefinierte Offline-Seite anzeigen oder die Anfrage ablehnen
            // z.B.: return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);

        // Hier kann auch auf die Offline-Status-Nachricht reagiert werden
        const clients = await self.clients.matchAll();
        clients.forEach(client => client.postMessage('offline'));

        // Dieser Teil kann nach deinen Anforderungen angepasst werden
        // z.B.: return caches.match('/offline.html');
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