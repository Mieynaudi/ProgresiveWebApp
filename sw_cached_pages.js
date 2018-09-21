const cacheName = "v1"

const cacheAssets = 
[
    'index.html',
    '/js/main.js'
]


self.addEventListener("install", (e) => 
{
    console.log("Worker: Installed")

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => 
            {
                console.log("Worker caching pages...")
                cache.addAll(cacheAssets)
            })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener("activate", (e) =>
{
    console.log("Worker: Activated")

    e.waitUntil(
        caches.keys().then(cacheNames => 
            {
                return Promise.all(
                    cacheNames.map(cache =>
                        {
                            if (cache != cacheName)
                            {
                                console.log("Deleting old cache...")
                                return caches.delete(cache)
                            }
                        })
                )
            })
    )
})

self.addEventListener('fetch', e =>
{
    console.log("Worker fetching...")
    e.respondWith(
        fetch(e.request)
        .catch(() => 
        {
            caches.match(e.request)
        })
    )
})