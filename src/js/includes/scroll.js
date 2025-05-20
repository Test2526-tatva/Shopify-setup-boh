import debounce from 'lodash.debounce';

if( $('body').hasClass('template--blog-faq') ) {

  window.addEventListener('scroll', debounce(function () {
    $('.faq-group__links a.active').removeClass('active');

    document.querySelectorAll('.faq-group__anchor').forEach(el => {
      const scrollTop = $(window).scrollTop();
      const elOffset = $(el).offset().top - 10;

      if( scrollTop > elOffset ) {
        $('.faq-group__links a.active').removeClass('active');
        $(`.faq-group__links a[href="#${ el.getAttribute('id') }"]`).addClass('active');
      }
    });
    
  }, 150, {
    maxWait: 150
  }), { passive: true });
}