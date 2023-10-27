// List of files to cache
const cacheName = 'my-site-cache-v1';
const assetsToCache = [
    '/',
    '/client/index.html',
    '/client/app.js',
    '/client/index.css',
    
];

// cache files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(assetsToCache);
        })
    );
});

// Fetch event: serve from cache or fetch from network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
