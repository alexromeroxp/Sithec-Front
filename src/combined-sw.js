
const cacheName = "Sithec1";
var version = "v1" // increase for new version
var staticCacheName = version + "_pwa-static";
var dynamicCacheName = version + "_pwa-dynamic";
self.addEventListener("install", (event) => {
  console.log("Service Worker : Installed!")

  event.waitUntil(
    (async () => {
      try {
        cache_obj = await caches.open(cacheName)
        cache_obj.addAll(caching_files)
      }
      catch {
        console.log("error occured while caching...")
      }
    })()
  )
})

function forceSWupdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.update()
      }
    })
  }
}
forceSWupdate()

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          if (!cacheName.startsWith(staticCacheName) &&
            !cacheName.startsWith(dynamicCacheName)) {
            return true;
          }
        }).map(function (cacheName) {
          // completely deregister for ios to get changes too
          console.log('deregistering Serviceworker')
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
              registrations.map(r => {
                r.unregister()
              })
            })
            window.location.reload(true)
          }

          console.log('Removing old cache.', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});