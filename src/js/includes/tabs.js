$('.care-main__tab--headers a').on('click', function (e) {
   // alert('test')
  e.preventDefault();
  $(this).closest('.care-main__section').find('.care-main__tab--item.active, li > a.active').removeClass('active');
  $(this).addClass('active');
  $($(this).attr('href')).addClass('active');

});

// $('.compare-modal__tab-links a').on('click', function (e) {
//   // alert('test')
//   e.preventDefault();
//   $(this).closest('.compare-modal__tab').find('.compare-modal__tab-links.active, li > a.active').removeClass('active');
//   $(this).addClass('active');
//   $($(this).attr('href')).addClass('active');

// });

$('.grid-item__content--icons').on('click', function (e) {
  e.preventDefault();
 
const $target = $(this).closest('.grid-item').find('.grid-item__content');
$('.grid-item__content.active').not($target).removeClass('active');
$target.toggleClass('active');

});