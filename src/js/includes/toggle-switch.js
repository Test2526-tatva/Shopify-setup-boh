$(document).ready(function() {
  $(document).on('change', '#toggle-swith__checkbox', function() {
    if ($(this).is(':checked')) {
      $('body').addClass('toggle-switch--checked');
      $('body').removeClass('toggle-switch--unchecked');
    } else {
      $('body').removeClass('toggle-switch--checked');
      $('body').addClass('toggle-switch--unchecked');
    }
  });
  
  $(document).on('change', '.compare-modal__toggle-switch .toggle-switch__checkbox', function() {
    $parent = $(this).closest('.compare-modal');
    $parent.toggleClass('umbrella--closed', $(this).is(':checked'));
  });
});