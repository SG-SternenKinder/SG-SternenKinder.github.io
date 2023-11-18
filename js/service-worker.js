// service-worker.js

const CACHE_NAME = 'my-pwa-cache-v1';

// Installationsereignis: Wird ausgelöst, wenn der Service Worker installiert wird.
self.addEventListener('install', (event) => {
    event.waitUntil(
      // Öffne den Cache mit dem Namen 'CACHE_NAME'.
      caches.open('CACHE_NAME').then((cache) => {
        // Füge die erforderlichen Ressourcen zum Cache hinzu.
        return cache.addAll([
          '/',
          '/index.html',
          '/img/icon.png',
          // Füge hier alle Dateien hinzu, die zwischengespeichert werden sollen
        ]);
      })
    );
  });
  
  // Fetch-Ereignis: Wird ausgelöst, wenn die Webseite Ressourcen anfordert.
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      // Überprüfe den Cache auf die angeforderte Ressource.
      caches.match(event.request).then((response) => {
        // Wenn die Ressource im Cache gefunden wurde, gib sie zurück.
        if (response) {
          return response;
        }
  
        // Ansonsten lade die Ressource vom Netzwerk.
        return fetch(event.request).then((response) => {
          // Überprüfe, ob die Antwort gültig ist.
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
  
          // Klone die Antwort, um sie im Cache zu speichern und dann zurückzugeben.
          const responseToCache = response.clone();
  
          caches.open('CACHE_NAME').then((cache) => {
            cache.put(event.request, responseToCache);
          });
  
          return response;
        });
      })
    );
  });
  