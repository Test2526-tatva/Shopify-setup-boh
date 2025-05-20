// $('.terms-main__sidebar--menu--active').on('click', function () {
//   $(this).closest('.terms-main__sidebar--menu').toggleClass('active');
// });

$(document).on('click', '.cart-dropdown__selected', function () {
  $(this).closest('.cart-dropdown').toggleClass('active');
});

$('.article-video__play-button').on('click', function (e) {
  //$('.article-video__content video')[0].play();
  const src = $('.article-video__content iframe')[0].src;

  if (src.includes('?')) {
    $('.article-video__content iframe')[0].src += "&autoplay=1";
  } else {
    $('.article-video__content iframe')[0].src += "?autoplay=1";
  }

  e.preventDefault();
  $(this).hide();
});