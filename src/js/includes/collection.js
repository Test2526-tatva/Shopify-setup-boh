$(document).on('click', '.js-card-quickbuy__trigger', function (e) {
  e.preventDefault();

  $('.product-card').removeClass('product-card--show-quickbuy');
  $(this).closest('.product-card').addClass('product-card--show-quickbuy');
});

$(document).on('click', function (e) {
  $('.product-card').removeClass('product-card--show-quickbuy');
});

$(document).on('click', '.js-card-quickbuy__trigger, .product-card__quickbuy', function (e) {
  e.stopPropagation();
});

$(window).scroll(function () {
  if ($('.featured-collection__column .featured-collection__item:first-child').length) {
    var scrollTop = $(window).scrollTop();
    var elementOffset = $('.featured-collection__column').offset().top;
    var distance = elementOffset - scrollTop;

    if (distance < 10) {
      $('.featured-collection__column .featured-collection__item:first-child .featured-collection__content').addClass('sticky__content');
    } else {
      $('.featured-collection__column .featured-collection__item:first-child .featured-collection__content').removeClass('sticky__content');
    }

    if ($('.featured-collection__column .featured-collection__item:nth-child(2)').length) {
      var secondElementOffset = $('.featured-collection__column .featured-collection__item:nth-child(2)').offset().top;
      var secondDistance = secondElementOffset - scrollTop;

      if (secondDistance < 150) {
        $('.featured-collection__column .featured-collection__item:first-child .featured-collection__content').removeClass('sticky__content');
      }
    }


  }
});