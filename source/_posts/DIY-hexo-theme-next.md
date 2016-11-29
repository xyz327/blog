---
title: 折腾hexo的主题--NexT
date: 2016-11-29 23:11:04
tags: [hexo, theme, NexT]
categories: hexo
---
 我想一直固定左侧边栏，记录下改动
 修改 theme/next/source/js/src/schemes/pisces.js
 ```javascript
 $(document).ready(function () {
   var $headerInner = $('.header-inner');
   var sidebarTop = $headerInner.height() + 10;

   $('#sidebar').css({ 'margin-top': sidebarTop }).show()
   .affix();
   $('.headband').css({'position':'fixed', top:0,width:'100%',zIndex:1});
   $headerInner.css({top:0})
   var affix = function() {
       if(document.body.clientWidth < 991){
           $headerInner.css({position: 'static'})
       }else{
            $headerInner.css({position: 'fixed'})
       }
   }
   affix()
   $(window).on('resize', function(){
        affix()
   });
 });
 ```
还需要修改 theme/next/source/js/src/util.js
把 needAffix方法修改为始终返回false
```javascript
    needAffix = function () {
      return false;//this.isPisces();
    }
```
>修改后会影响搜索弹出框,下次解决...

done！
