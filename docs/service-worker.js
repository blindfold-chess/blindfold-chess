const CACHE_NAME = 'blindfold-chess-v5';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about/',
  '/about/index.html',
  '/libs/chess.js',
  '/libs/stockfish.js',
  // Audio files
  '/audio/en/voice-a/board.mp3',
  '/audio/en/voice-a/white.mp3',
  '/audio/en/voice-a/black.mp3',
  '/audio/en/voice-a/king.mp3',
  '/audio/en/voice-a/queen.mp3',
  '/audio/en/voice-a/rook.mp3',
  '/audio/en/voice-a/bishop.mp3',
  '/audio/en/voice-a/knight.mp3',
  '/audio/en/voice-a/pawn.mp3',
  '/audio/en/voice-a/from.mp3',
  '/audio/en/voice-a/to.mp3',
  '/audio/en/voice-a/takes.mp3',
  '/audio/en/voice-a/check.mp3',
  '/audio/en/voice-a/checkmate.mp3',
  '/audio/en/voice-a/stalemate.mp3',
  '/audio/en/voice-a/draw.mp3',
  '/audio/en/voice-a/castles.mp3',
  '/audio/en/voice-a/promoted.mp3',
  '/audio/en/voice-a/choose-promotion-piece.mp3',
  '/audio/en/voice-a/illegal-move.mp3',
  '/audio/en/voice-a/illegal-starting-square.mp3',
  '/audio/en/voice-a/a.mp3',
  '/audio/en/voice-a/b.mp3',
  '/audio/en/voice-a/c.mp3',
  '/audio/en/voice-a/d.mp3',
  '/audio/en/voice-a/e.mp3',
  '/audio/en/voice-a/f.mp3',
  '/audio/en/voice-a/g.mp3',
  '/audio/en/voice-a/h.mp3',
  '/audio/en/voice-a/1.mp3',
  '/audio/en/voice-a/2.mp3',
  '/audio/en/voice-a/3.mp3',
  '/audio/en/voice-a/4.mp3',
  '/audio/en/voice-a/5.mp3',
  '/audio/en/voice-a/6.mp3',
  '/audio/en/voice-a/7.mp3',
  '/audio/en/voice-a/8.mp3',
  '/audio/en/voice-b/board.mp3',
  '/audio/en/voice-b/white.mp3',
  '/audio/en/voice-b/black.mp3',
  '/audio/en/voice-b/king.mp3',
  '/audio/en/voice-b/queen.mp3',
  '/audio/en/voice-b/rook.mp3',
  '/audio/en/voice-b/bishop.mp3',
  '/audio/en/voice-b/knight.mp3',
  '/audio/en/voice-b/pawn.mp3',
  '/audio/en/voice-b/from.mp3',
  '/audio/en/voice-b/to.mp3',
  '/audio/en/voice-b/takes.mp3',
  '/audio/en/voice-b/check.mp3',
  '/audio/en/voice-b/checkmate.mp3',
  '/audio/en/voice-b/stalemate.mp3',
  '/audio/en/voice-b/draw.mp3',
  '/audio/en/voice-b/castles.mp3',
  '/audio/en/voice-b/promoted.mp3',
  '/audio/en/voice-b/choose-promotion-piece.mp3',
  '/audio/en/voice-b/illegal-move.mp3',
  '/audio/en/voice-b/illegal-starting-square.mp3',
  '/audio/en/voice-b/a.mp3',
  '/audio/en/voice-b/b.mp3',
  '/audio/en/voice-b/c.mp3',
  '/audio/en/voice-b/d.mp3',
  '/audio/en/voice-b/e.mp3',
  '/audio/en/voice-b/f.mp3',
  '/audio/en/voice-b/g.mp3',
  '/audio/en/voice-b/h.mp3',
  '/audio/en/voice-b/1.mp3',
  '/audio/en/voice-b/2.mp3',
  '/audio/en/voice-b/3.mp3',
  '/audio/en/voice-b/4.mp3',
  '/audio/en/voice-b/5.mp3',
  '/audio/en/voice-b/6.mp3',
  '/audio/en/voice-b/7.mp3',
  '/audio/en/voice-b/8.mp3',
  // Icons
  '/icons/web-app-manifest-192x192.png',
  '/icons/web-app-manifest-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-96x96.png',
  '/icons/favicon.ico',
  '/icons/favicon.svg'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing blindfold-chess.app for offline play...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating for offline use...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache of blindfold-chess.app for offline play...', cacheName);
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
