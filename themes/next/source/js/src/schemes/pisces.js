$(document).ready(function () {
  var $headerInner = $('.header-inner');
  var sidebarTop = $headerInner.height() + 10;

  $('#sidebar').css({ 'margin-top': sidebarTop }).show()
  .affix();
  $('.headband').css({'position':'fixed', top:0,width:'100%',zIndex:1});
  $headerInner.css({'position':'fixed', top:0})
  // $('#sidebar').css({ 'margin-top': 0 }).show().appendTo($headerInner);
  // $headerInner.affix({
  //   offset: {
  //     top: 0
  //   }
  // })
});
