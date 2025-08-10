const CACHE_NAME = 'porte-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/porte3.png',
  '/p1.mp4',
  '/p1rev.mp4',
  '/p2.mp4',
  '/p3.mp4',
  '/p4.mp4',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => 
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
