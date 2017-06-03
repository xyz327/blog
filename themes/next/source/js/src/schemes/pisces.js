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
    if (document.body.clientWidth < 975) {
      $headerInner.css({position: 'static'})
    } else {
      $headerInner.css({position: 'fixed'})
    }
  };
  affix()
  $(window).on('resize', function(){
       affix()
  });
  // $('#sidebar').css({ 'margin-top': 0 }).show().appendTo($headerInner);
  // $headerInner.affix({
  //   offset: {
  //     top: 0
  //   }
  // })
});
