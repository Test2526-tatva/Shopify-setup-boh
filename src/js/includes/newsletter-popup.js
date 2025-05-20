
$('.contact-modal').on('click', '.contact-modal__close', function() {
  $('.news-letter').css('display', ''); // hide
  //set cookie
  Cookies.set('contact-modal', 'dismissed', {
    expires: liquid__newsletterDismiss,
    path: '/'
  });
  $('.contact-modal').removeClass('contact-modal--active');
})

if ($('section').hasClass('contact-modal')){
  if (Cookies.get('contact-modal') != 'dismissed') {
    // if news-letter = dismissed cookie is present, show popup and add overlay to <body> as long as newsletter popup is visible
    
    $('.contact-modal').delay(10000).fadeIn(400);

  }
}

setTimeout(function(){
  $('.contact-modal').addClass('active');
}, liquid__newsletterDelay * 1000);
