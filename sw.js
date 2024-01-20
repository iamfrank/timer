const cacheName = 'timer-v2.2'
const contentToCache = [
  '/timer/index.html',
  '/timer/js/main.js',
  '/timer/js/components/stopwatch/stopWatch.js',
  '/timer/js/components/visualclock/visualClock.js',
  '/timer/js/components/workouttimer/workoutTimer.js',
  '/timer/js/components/workouttimer/wtReady.js',
  '/timer/js/components/workouttimer/wtSet.js',
  '/timer/js/components/workouttimer/wtWork.js',
  '/timer/js/modules/screenlock.js',
  '/timer/js/modules/sound.js',
  '/timer/js/modules/soundEffects.js',
  '/timer/js/modules/state.js',
  '/timer/css/main.css',
  '/timer/css/base.css',
  '/timer/css/navbar.css',
  '/timer/css/stopwatch.css',
  '/timer/css/workouttimer.css',
  '/timer/images/logo_48x48.png',
  '/timer/images/logo_72x72.png',
  '/timer/images/logo_96x96.png',
  '/timer/images/logo_144x144.png',
  '/timer/images/logo_192x192.png',
  '/timer/images/logo_512x512.png'
]

// Install serviceworker
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName)
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
    if (r) { return r }
    const response = await fetch(event.request)
    const cache = await caches.open(cacheName)
    cache.put(event.request, response.clone())
    return response
  })())
})
