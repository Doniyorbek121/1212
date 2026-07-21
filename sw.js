/* IELTS Master — service worker for offline support.
   Cache-first for our own assets; network fallback for the rest. */
const CACHE = 'ielts-master-v4';
const ASSETS = [
  './', 'index.html', 'courses.html', 'practice.html', 'dashboard.html',
  'reading.html', 'listening.html', 'writing.html', 'speaking.html',
  'ai-tutor.html', 'vocabulary.html', 'calculator.html', 'about.html',
  'resources.html', 'plan.html', 'admin.html', '404.html', 'manifest.json',
  'assets/css/style.css',
  'assets/js/main.js', 'assets/js/store.js', 'assets/js/ai.js',
  'assets/js/reading.js', 'assets/js/reading-data.js',
  'assets/js/listening.js', 'assets/js/listening-data.js',
  'assets/js/writing.js', 'assets/js/speaking.js',
  'assets/js/vocabulary.js', 'assets/js/calculator.js',
  'assets/js/practice.js', 'assets/js/tutor.js', 'assets/js/dashboard.js',
  'assets/js/admin.js', 'assets/js/plan.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // never cache the Gemini API or cross-origin font requests via SW logic
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => cached))
  );
});
