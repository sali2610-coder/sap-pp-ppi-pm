/* Project NEO — service worker (hand-rolled, offline-first, zero external deps).
 *
 * Strategy:
 *  - Navigations (HTML): NETWORK-FIRST → always fresh when online; on failure fall
 *    back to the cached page, then to the branded /offline/ shell. Avoids stale
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
const SW_VERSION = "neo-v1";
const PRECACHE = `${SW_VERSION}-precache`;
const RUNTIME = `${SW_VERSION}-runtime`;

// Minimal offline boot shell (kept tiny — the rest is runtime-cached on visit).
const PRECACHE_URLS = [
  "/",
  "/offline/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-512-maskable.png",
];

const isStaticAsset = (url) => url.pathname.startsWith("/_next/static/");
const isCacheable = (url) =>
  /\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|json|webmanifest)$/i.test(url.pathname);

// Never persist a transient server/proxy error as an immutable build asset.
// Also validate old entries on read, without clearing visited pages or data.
const usable = (request, response) => {
  if (!response || !response.ok || response.type === "opaque") return false;
  const type = (response.headers.get("content-type") || "").split(";", 1)[0].trim().toLowerCase();
  const path = new URL(request.url).pathname;
  if (request.mode === "navigate" || path === "/offline/") return type === "text/html";
  if (/\.css$/i.test(path)) return type === "text/css";
  if (/\.(?:m?js)$/i.test(path)) return /^(?:text|application)\/(?:javascript|ecmascript|x-javascript)$/.test(type);
  // A successful HTML error/sign-in response is not an image, font or JSON.
  return type !== "text/html" && type !== "application/xhtml+xml";
};

const cachedResponse = async (request) => {
  try {
    const cached = await caches.match(request);
    return usable(request, cached) ? cached : undefined;
  } catch { return undefined; } // Storage may be unavailable in an isolated browser.
};

const remember = (event, request, response) => {
  if (!usable(request, response)) return;
  const copy = response.clone();
  event.waitUntil(caches.open(RUNTIME).then((cache) => cache.put(request, copy)).catch(() => {
    // Cache quota/policy failures must not interrupt a successful page load.
  }));
};

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

  // 1) Navigations → network-first, cache fallback, offline shell last.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          remember(event, request, res);
          return res;
        })
        .catch(() =>
          cachedResponse(request).then(async (cached) => cached ||
            await cachedResponse(new Request(new URL("/offline/", self.location.origin))) ||
            new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } })),
        ),
    );
    return;
  }

  // 2) Hashed build assets → cache-first (immutable).
  if (isStaticAsset(url)) {
    event.respondWith(
      cachedResponse(request).then((cached) =>
        cached ||
        fetch(request).then((res) => {
          remember(event, request, res);
          return res;
        }),
      ),
    );
    return;
  }

  // 3) Images / icons / fonts / manifest → stale-while-revalidate.
  if (isCacheable(url)) {
    event.respondWith(
      cachedResponse(request).then((cached) => {
        const network = fetch(request)
          .then((res) => {
            remember(event, request, res);
            return res;
          })
          .catch(() => cached || Response.error());
        event.waitUntil(network.then(() => undefined));
        return cached || network;
      }),
    );
  }
});
