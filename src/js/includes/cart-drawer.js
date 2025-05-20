
$(document).on('click', '.navbar__cart-link, .cart-drawer__trigger', function(e) {
  e.preventDefault();
  $('body').toggleClass('cart-drawer--show');
});

$(document).on('click', '.cart-drawer__open', function(e) {
  $('body').toggleClass('cart-drawer--show');
});


$(document).on('click', '.cart-drawer__close, .cart-drawer__overlay', function(e) {
  e.stopPropagation();
  $('body').removeClass('cart-drawer--show');
});

$(document).on('click', '.packaging-popup__toggle', function() {
  $(this).closest('.cart-drawer__packaging-options').toggleClass('packaging-popup--show');
});