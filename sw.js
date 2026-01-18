const CACHE = "hours-bank-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/clock-192.png",
  "/icons/clock-512.png",
  "/sw.js",
  "/css/styles.css",  // 假设您的样式文件路径是 css/styles.css，如果有其他样式文件，您需要手动更新
  "/js/app.js"         // 假设您的 JavaScript 文件路径是 js/app.js，如果有其他 JavaScript 文件，您需要手动更新
];

// 安装 Service Worker，缓存文件
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 拦截请求，首先尝试从缓存中读取，如果没有缓存，再去网络请求
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
