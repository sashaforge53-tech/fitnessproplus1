[file name]: sw.js
const CACHE_NAME = 'fitnesspro-v4';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://img.icons8.com/color/96/000000/weightlift.png'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование файлов...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем из кэша, если есть
        if (response) {
          return response;
        }
        
        // Иначе загружаем из сети
        return fetch(event.request)
          .then(response => {
            // Проверяем валидность ответа
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Клонируем ответ
            const responseToCache = response.clone();
            
            // Сохраняем в кэш
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Если сеть недоступна, пытаемся вернуть запасную страницу
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});