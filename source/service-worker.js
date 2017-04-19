
var cacheName = 'xyz32-service-worker-v0.1';
var filesToCache = [
    'https://blog.xyz327.cn/',
    'https://blog.xyz327.cn/js/src/utils.js?v=5.1.0',
    'https://blog.xyz327.cn/js/src/motion.js?v=5.1.0',
    'https://blog.xyz327.cn/js/src/affix.js?v=5.1.0',
    'https://blog.xyz327.cn/js/src/schemes/pisces.js?v=5.1.0',
    'https://blog.xyz327.cn/js/src/bootstrap.js?v=5.1.0',
    'https://blog.xyz327.cn/js/src/hook-duoshuo.js?v=5.1.0',
    'https://blog.xyz327.cn/images/avatar/avatar_1.jpg',
    'https://blog.xyz327.cn/css/style.css?v=5.1.0',
    'https://blog.xyz327.cn/css/main.css?v=5.1.0',

    'https://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css',
    'https://fonts.googleapis.com/css?family=Lato:300,300italic,400,400italic,700,700italic&subset=latin,latin-ext',
    'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js',
    'https://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js',
    'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js',
    'https://cdn.bootcss.com/velocity/1.2.1/velocity.min.js',
    'https://cdn.bootcss.com/velocity/1.2.1/velocity.ui.min.js',
    'https://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.pack.js',
    'https://cdn.bootcss.com/UAParser.js/0.7.9/ua-parser.min.js',
    'https://cdn1.lncld.net/static/js/av-core-mini-0.6.1.js',
    'https://fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2',
    'https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
    'https://fonts.gstatic.com/s/lato/v13/H2DMvhDLycM56KNuAtbJYA.woff2',
    'https://fonts.gstatic.com/s/lato/v13/PLygLKRVCQnA5fhu3qk5fQ.woff2'
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
