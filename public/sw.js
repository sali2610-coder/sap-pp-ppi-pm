/* Project NEO — service worker (hand-rolled, offline-first, zero external deps).
 *
 * Strategy:
 *  - Navigations (HTML): NETWORK-FIRST → always fresh when online; on failure fall
 *    back to the cached page, then to the NEO /neo/offline/ page. Avoids stale
 *    HTML entirely while still working fully offline for visited pages.
 *  - Hashed build assets (/_next/static/**): CACHE-FIRST (immutable, content-hashed
 *    → safe to cache forever; new deploys ship new URLs).
 *  - Images / icons / fonts / manifest: STALE-WHILE-REVALIDATE.
 *  - Everything precached on install is the minimum shell needed to boot offline.
 *
 * Versioning: bump SW_VERSION to force a clean cache cycle. Old caches are purged
 * on activate. skipWaiting + clients.claim so an update takes effect promptly; the
 * page is notified so it can offer a refresh.
 */
// neo-v2: Project NEO is the only site. The precache held the pre-NEO home ("/")
// and the pre-NEO /offline/ page (old chrome, a link back to the old home); the
// bump purges every cache of v1, including any cached pre-NEO page.
const SW_VERSION = "neo-v2";
const PRECACHE = `${SW_VERSION}-precache`;
const RUNTIME = `${SW_VERSION}-runtime`;

// Minimal offline boot shell (kept tiny — the rest is runtime-cached on visit).
const PRECACHE_URLS = [
  "/neo/",
  "/neo/offline/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-512-maskable.png",
];

const isStaticAsset = (url) => url.pathname.startsWith("/_next/static/");
const isCacheable = (url) =>
  /\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|json|webmanifest)$/i.test(url.pathname);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(SW_VERSION)).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

// Allow the page to trigger an immediate activation after an update.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // never touch cross-origin

  // 1) Navigations → network-first, cache fallback, offline page last. The
  //    offline page is reached by a redirect to its own address (with the one
  //    that was asked for in ?from=), so the NEO shell hydrates at the address
  //    it was built for: served in place, it hydrated at another path and React
  //    threw #418. The offline page itself only ever comes from the cache.
  if (request.mode === "navigate") {
    if (url.pathname === "/neo/offline/") {
      event.respondWith(fetch(request).catch(() => caches.match("/neo/offline/")));
      return;
    }
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) =>
            cached || Response.redirect(`/neo/offline/?from=${encodeURIComponent(url.pathname + url.search)}`, 302)),
        ),
    );
    return;
  }

  // 2) Hashed build assets → cache-first (immutable).
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(request, copy));
          return res;
        }),
      ),
    );
    return;
  }

  // 3) Images / icons / fonts / manifest → stale-while-revalidate.
  if (isCacheable(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((res) => {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(request, copy));
            return res;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
  }
});
