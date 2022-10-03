const cacheName = 'stopwatch-v1'
const contentToCache = [
  '/',
  '/index.html',
  '/js/main.js',
  '/css/main.css',
  '/css/normalize.min.css',
  '/images/logo_48x48.png',
  '/images/logo_72x72.png',
  '/images/logo_96x96.png',
  '/images/logo_144x144.png',
  '/images/logo_192x192.png',
  '/images/logo_512x512.png'
]

// Install serviceworker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install')
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName)
    console.log('[Service Worker] Caching')
    await cache.addAll(contentToCache)
  })())
})

// Fetch content
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const r = await caches.match(event.request)
    console.log(`[Service Worker] Fetching resource: ${event.request.url}`)
    if (r) { return r }
    const response = await fetch(event.request)
    const cache = await caches.open(cacheName)
    console.log(`[Service Worker] Caching new resource: ${event.request.url}`)
    cache.put(e.request, response.clone())
    return response
  })())
})
