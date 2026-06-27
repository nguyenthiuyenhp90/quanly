// ====================================================================
// Service Worker — MES App PWA
// Cache-first cho assets tĩnh, network-first cho CDN scripts
// ====================================================================

const CACHE_NAME = "mes-app-v1";

// Các file cần cache khi install
const PRECACHE_ASSETS = [
  "./index.html",
  "./manifest.json"
];

// ------------------------------------------------------------------ //
// INSTALL: pre-cache shell
// ------------------------------------------------------------------ //
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Kích hoạt ngay, không chờ tab cũ đóng
  self.skipWaiting();
});

// ------------------------------------------------------------------ //
// ACTIVATE: xóa cache cũ
// ------------------------------------------------------------------ //
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ------------------------------------------------------------------ //
// FETCH: stale-while-revalidate cho CDN, cache-first cho local assets
// ------------------------------------------------------------------ //
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bỏ qua các request không phải GET
  if (request.method !== "GET") return;

  // Bỏ qua chrome-extension và non-http
  if (!url.protocol.startsWith("http")) return;

  // CDN (unpkg, cdnjs, esm.sh…): stale-while-revalidate
  if (
    url.hostname.includes("unpkg.com") ||
    url.hostname.includes("cdnjs.cloudflare.com") ||
    url.hostname.includes("esm.sh") ||
    url.hostname.includes("cdn.jsdelivr.net")
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Mọi thứ còn lại (local files): cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      });
    })
  );
});

// ------------------------------------------------------------------ //
// Helper: stale-while-revalidate
// ------------------------------------------------------------------ //
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached); // offline: trả về cached nếu network lỗi

  return cached || networkFetch;
}
