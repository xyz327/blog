(function(){
  var themeVersion = '7.3.0';
  var cacheName = 'xyz32-service-worker-v0.1';
  var filesToCache = [
      'https://blog.xyz327.cn/',
      'https://blog.xyz327.cn/js/src/utils.js?v='+themeVersion,
      'https://blog.xyz327.cn/js/src/motion.js?v='+themeVersion,
      'https://blog.xyz327.cn/js/src/affix.js?v='+themeVersion,
      'https://blog.xyz327.cn/js/src/bootstrap.js?v='+themeVersion,
      'https://blog.xyz327.cn/images/avatar/avatar.jpg',
      'https://blog.xyz327.cn/css/style.css?v='+themeVersion,
      'https://blog.xyz327.cn/css/main.css?v='+themeVersion,
  
  
  ];
  
  self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
  });
  
  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          console.log('[ServiceWorker] Removing old cache', key);
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
  
  self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetch', e.request.url);
  
  //  var allDataUrl = extendDataUrl.concat(filesToCache);
    var url = e.request.url//.split('?')[0];
    var excludeUrls = ['https://hm.baidu.com','https://sp0.baidu.com', 'chrome-extension']
    for (var index in excludeUrls) {
      if (excludeUrls.hasOwnProperty(index)) {
        var element = excludeUrls[index];
        if(url.indexOf(url) === 0){
          //不做处理
          //e.respondWith(fetch(e.request));
          return;
        }
      }
    }
    if(e.request.method === 'GET'){
      e.respondWith(
        caches.match(e.request).then(function(response) {
          return response || fetch(e.request).then(function (response) {
            return caches.open(cacheName).then(function(cache){
              cache.put(e.request.url, response.clone());
              console.log('[ServiceWorker] Fetched&Cached Data');
              return response;
            })
          });
        })
      );
      /*e.respondWith(fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function(cache){
          cache.put(e.request.url, response.clone());
          console.log('[ServiceWorker] Fetched&Cached Data');
          return response;
        })
      }));*/
    } else {
      e.respondWith(fetch(e.request));
    }
  
  });
  
})()
