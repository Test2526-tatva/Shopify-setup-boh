document.addEventListener('DOMContentLoaded', function() {
  const $form = $('#repairs-form');

  $form.on('submit', function(e) {
    e.preventDefault();

    $form.addClass('is-loading');

    $.ajax({
      type: 'POST',
      data: $form.serialize(),
      url: $form.attr('action'),
      success: function(data) {
        $form.removeClass('is-loading');
        
        if( data.success ) {
          $('body').addClass('repairs-form--success');
        } else {
          $('.repairs-form__message').html(`
            <div>
              ${ data.error || 'Some unknown error occurred.' }
            </div>
          `);
        }
      }
    })
  });
});