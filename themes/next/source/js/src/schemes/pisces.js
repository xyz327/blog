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
  // $('#sidebar').css({ 'margin-top': 0 }).show().appendTo($headerInner);
  // $headerInner.affix({
  //   offset: {
  //     top: 0
  //   }
  // })
});