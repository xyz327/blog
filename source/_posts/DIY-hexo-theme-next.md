---
title: 折腾hexo的主题--NexT
date: 2016-11-29 23:11:04
tags: [hexo, theme, NexT]
categories: hexo
---
**针对NexT.Pisces**
 ## 固定边侧栏
 修改
 >theme/next/source/js/src/schemes/pisces.js

 ```javascript
 $(document).ready(function () {
   var $headerInner = $('.header-inner');
   var $sidebar = $('#sidebar');
   $sidebar.show();
   // 固定顶部黑条
   $('.headband').css({'position':'fixed', top:0,width:'100%',zIndex:1});
   $headerInner.css({top:0})
   var affix = function() {
     var sidebarTop = $headerInner.height() + 10;
     $('#sidebar').css({ 'margin-top': sidebarTop }).affix();
     if (document.body.clientWidth < 991) {
       $headerInner.css({position: 'static'})
     } else {
       $headerInner.css({position: 'fixed'})
     }
   };
   affix()
   $(window).on('resize', function(){
        affix()
   });
 });
 ```
## 修改文章页面滚动站点信息栏会覆盖菜单栏
>theme/next/source/js/src/util.js

把 needAffix方法修改为始终返回false
```javascript
    needAffix = function () {
      return false;//this.isPisces();
    }
```

~~修改后会影响搜索弹出框,下次解决...~~
## 修改搜索弹出框会被遮住
>theme/next/layout/_script/third-party/localsearch.swig

```javascript
//在首行添加
$('.popup').appendTo($('body'));
//并注释
// $('.popup').detach().appendTo('.header-inner');
```
~~## 修改静态js等文件使用七牛~~
~~> stheme/next/lauout/_script/commons.swig~~
~~> theme/next/lauout/_partials/head.swig~~
~~> theme/next/lauout/_script/bootstrap.swig~~
~~> theme/next/lauout/_script/schemes/pisces.swig~~

```ejsfont
//在循环添加script之前添加
url_for()改为
(config.qiniu.siteUrlPrefix || url_for())+'/'+theme.js
```
 ~~在项目_config.yaml 中的七牛下添加siteUrlPrefix（这样会影响https）~~
done！
