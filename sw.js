const cacheName = 'stopwatch-v1.1'
const contentToCache = [
  '/stopwatch/index.html',
  '/stopwatch/js/main.js',
  '/stopwatch/css/main.css',
  '/stopwatch/css/normalize.min.css',
  '/stopwatch/images/logo_48x48.png',
  '/stopwatch/images/logo_72x72.png',
  '/stopwatch/images/logo_96x96.png',
  '/stopwatch/images/logo_144x144.png',
  '/stopwatch/images/logo_192x192.png',
  '/stopwatch/images/logo_512x512.png'
]

// Install serviceworker
self.addEventListener('install', (event) => {
  // console.log('[Service Worker] Install')
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName)
    // console.log('[Service Worker] Caching')
    await cache.addAll(contentToCache)
  })())
})

// Cleans old cache files
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return }
      return caches.delete(key)
    }))
  }))
})

// Fetch content
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const r = await caches.match(event.request)
    // console.log(`[Service Worker] Fetching resource: ${event.request.url}`)
    if (r) { return r }
    const response = await fetch(event.request)
    const cache = await caches.open(cacheName)
    // console.log(`[Service Worker] Caching new resource: ${event.request.url}`)
    cache.put(event.request, response.clone())
    return response
  })())
})
