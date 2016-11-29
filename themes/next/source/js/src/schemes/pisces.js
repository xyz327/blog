$(document).ready(function () {
  var $headerInner = $('.header-inner');
  var sidebarTop = $headerInner.height() + 10;

  // $('#sidebar').css({ 'margin-top': sidebarTop }).show();
  $('#sidebar').css({ 'margin-top': 0 }).show().appendTo($headerInner);
  $headerInner.affix({
    offset: {
      top: 0
    }
  })
});
