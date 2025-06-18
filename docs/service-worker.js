const CACHE_NAME = 'blindfold-chess-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/libs/chess.js',
  '/libs/stockfish.js',
  // Audio files
  '/audio/en/board.mp3',
  '/audio/en/white.mp3',
  '/audio/en/black.mp3',
  '/audio/en/king.mp3',
  '/audio/en/queen.mp3',
  '/audio/en/rook.mp3',
  '/audio/en/bishop.mp3',
  '/audio/en/knight.mp3',
  '/audio/en/pawn.mp3',
  '/audio/en/from.mp3',
  '/audio/en/to.mp3',
  '/audio/en/takes.mp3',
  '/audio/en/check.mp3',
  '/audio/en/checkmate.mp3',
  '/audio/en/stalemate.mp3',
  '/audio/en/draw.mp3',
  '/audio/en/castles.mp3',
  '/audio/en/promoted.mp3',
  '/audio/en/choose-promotion-piece.mp3',
  '/audio/en/illegal-move.mp3',
  '/audio/en/a.mp3',
  '/audio/en/b.mp3',
  '/audio/en/c.mp3',
  '/audio/en/d.mp3',
  '/audio/en/e.mp3',
  '/audio/en/f.mp3',
  '/audio/en/g.mp3',
  '/audio/en/h.mp3',
  '/audio/en/1.mp3',
  '/audio/en/2.mp3',
  '/audio/en/3.mp3',
  '/audio/en/4.mp3',
  '/audio/en/5.mp3',
  '/audio/en/6.mp3',
  '/audio/en/7.mp3',
  '/audio/en/8.mp3',
  // Icons
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching assets.');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});
