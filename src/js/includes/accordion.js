$(document).on('click', '.accordion-item__label', function (e) {
  const $item = $(this).closest('.accordion-item');
  const $accordion = $item.closest('.accordion');
  const $content = $item.children('.accordion-item__collapse');
  const isActive = $item.hasClass('active');

  // $accordion.css('border', '1px solid red');
  $accordion.children('.accordion-item').removeClass('active');
  $accordion.children('.accordion-item').find('.accordion-item__collapse').slideUp();
  // $accordion.children('.accordion__item').removeClass('active');


  if (isActive) {

    $content.slideUp(function () {
      // smootherRefresh();
    });

    $item.removeClass('active');
  } else {

    $content.slideDown(function () {
      // smootherRefresh();
    });

    $item.addClass('active');
  }


});

$(document).on('click', '.accordions__item-title', function (e) {


  const $item = $(this).closest('.accordions__item');
  const $accordion = $item.closest('.accordions');
  const $content = $item.children('.accordions__item-content');
  const isActive = $item.hasClass('accordions__item--active');
  $item.removeClass('accordions__item--active');
  $accordion.children('.accordions__item').find('.accordions__item-content').slideUp();

  $accordion.children('.accordions__toggle-icon').removeClass('accordions__toggle-icon--minus');
  if (isActive) {
    $item.find('.accordions__toggle-icon').removeClass('accordions__toggle-icon--minus');
    $content.slideUp();
  } else {
    $item.addClass('accordions__item--active');
    $item.find('.accordions__toggle-icon').addClass('accordions__toggle-icon--minus');
    $content.slideDown();
  }

});