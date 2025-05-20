import debounce from 'lodash.debounce';

const settings = {
  scrollOffset: 100
}

if( 
    document.body.classList.contains('template--article') 
  ) {
  settings.scrollOffset = window.innerHeight;
}

if( 
    document.body.classList.contains('template--product') 
    || document.body.classList.contains('template--page-about-2') 
    || document.body.classList.contains('template--page-sustainability') 
  ) {
  settings.scrollOffset = window.innerHeight - $('.navbar').height();
}


window.addEventListener('DOMContentLoaded', function() {
  // alert('test');
  $('body').toggleClass('navbar--scrolled', $(window).scrollTop() > settings.scrollOffset);

  window.addEventListener('scroll', debounce(function () {
    $('body').toggleClass('scrolled-down', $(window).scrollTop() > window.oldScrollTop);
    window.oldScrollTop = $(window).scrollTop();

    $('body').toggleClass('navbar--scrolled', $(window).scrollTop() > settings.scrollOffset);
    $('body').toggleClass('footer--in-view', $(window).scrollTop() > ($('.footer').offset().top - window.innerHeight ) );

  }, 300, {
    maxWait: 300
  }), { passive: true });


  $('.js-mobile-menu__toggle').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('navbar--show-mobile-menu');
  });



});


$(document).on('mouseenter', '[data-popup-target]', function(e) {
  const $target = $(`[data-popup='${ $(this).attr('data-popup-target') }']`);

  $('body').addClass('navbar--show-popup');
  $('body').removeClass('navbar--show-search');
  $('[data-popup].active').removeClass('active');
  $target.addClass('active');
});

// $(document).on('click', function(e) {
//   $('body').removeClass('navbar--show-popup');
// });

const timeoutDuration = 300;
let popupTimeout = -1;

$(document).on('mouseleave', '[data-popup-target], .navbar-popup', function(e) {
  popupTimeout = setTimeout(function() {
    $('body').removeClass('navbar--show-popup');
  }, timeoutDuration);
});

$(document).on('mouseenter', '[data-popup-target], .navbar-popup', function(e) {
  clearTimeout(popupTimeout);
});