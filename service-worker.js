const CACHE_NAME = 'coding-editor-cache-v1';
const assetsToCache = [
   './index.html',
   './index.css',
   './app.js',
   // more files if i want
];

self.addEventListener('install', (event) => {
   event.waitUntil(
     caches.open(CACHE_NAME).then((cache) => {
       return cache.addAll(assetsToCache);
     })
   );
});

self.addEventListener('fetch', (event) => {
   event.respondWith(
     caches.match(event.request).then((response) => {
       return response || fetch(event.request);
     })
   );
});
