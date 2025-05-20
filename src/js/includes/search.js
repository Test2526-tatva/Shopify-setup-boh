$('.search__trigger, .js-search__trigger').on('click', function (e) {
  e.preventDefault();

  $('#search-results').hide();
  $('.search__initial').show();
  $('.search__input input').val('');

  $('body').removeClass('navbar--show-mobile-menu');
  $('body').toggleClass('navbar--show-search');


  setTimeout(function () {
    $('.search__input input').focus();
  }, 300);
});

$('.navbar__overlay').on('click', function () {
  $('body').removeClass('navbar--show-search navbar--show-megamenu');
});