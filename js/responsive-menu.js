jQuery(document).ready(function($) {
  var menuLinks = $('.header-links');
  $('.header-links-btn').click(function () {
    menuLinks.slideToggle();
  });
});
