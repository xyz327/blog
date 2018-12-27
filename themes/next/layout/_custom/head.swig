{#
Custom head.
#}
<script type="text/javascript" >
if('serviceWorker' in navigator) {
	//注册上一步创建的js文件
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function() { console.log('Service Worker Registered'); })
        .catch(function(err) {                                                                         
        // 注册失败 :(
        console.log('ServiceWorker registration failed: ', err);
      });;
}
</script>
