const __default = $('.main-product__clearcut > img').attr('src');

class Product {
  static $swatch;

  static init() {
    Product.$swatch = $('#main-product-form').find('[name=id]:checked');

    Product.onVariantChange(false);

    $(document).on('change', '#main-product-form', function() {
      const $form = $(this);
      Product.$swatch = $form.find('[name=id]:checked');

      Product.onVariantChange();
    });

    $(document).on('click', '.product-form__atc', function(e) {
      $('.variant-bar--expanded').removeClass('variant-bar--expanded');
      $('.size-dropdown').removeClass('active');
    });


    $(document).on('click', '.size-dropdown__selected', function(e) {
      e.preventDefault();
      $('.size-dropdown').toggleClass('active');
    });
  }

  static updateURL(url) {
    history.replaceState({}, '', url);
    
    const pageviewEvent = new Event('pageview');
    window.dispatchEvent(pageviewEvent);
  }

  static onVariantChange(updateUrl = true) {
    const variantId = Product.$swatch.val();
    const productId = Product.$swatch.attr('data-product-id');
    $swatch = Product.$swatch;

    if( updateUrl ) {
      Product.updateURL( $swatch.attr('data-url') );
    }

    $('.swatch-dropdown__swatch > .swatch-preview').replaceWith( $swatch.closest('label').find('.swatch-preview').clone() );
    $('.swatch-dropdown__swatch > label').text( $swatch.attr('data-name') );

    // $('.main-product__bg').attr('style', `background: linear-gradient(to top, ${ $swatch.attr('data-color-2') }, ${ $swatch.attr('data-color-1') });`)

    $('body').toggleClass('product--dark', $swatch.attr('data-dark-text') == 'true' );
    $('body').toggleClass('product--out-of-stock', $swatch.attr('data-out-of-stock') == 'true' );
    $('body').toggleClass('product--limited-edition', $swatch.attr('data-limited-edition') == 'true' );


    const newImage = $swatch.data('clearcut');
    if( newImage ) {
      $('.main-product__clearcut > img').attr('src', newImage);
    }

    $('[data-variant-show].active, [data-product-show].active').removeClass('active');
    $(`[data-variant-show="${ variantId }"], [data-product-show="${ productId }"]`).addClass('active');
    
  }

}

Product.init();


class ProductCard {
  static init() {
    $(document).on('change', '.card-quickbuy__form', function(e) {
      const $form = $(this);
      const $swatch = $form.find('[name=id]:checked');

      ProductCard.onVariantChange($swatch);
    })
  }

  static onVariantChange($swatch) {
    const $card = $swatch.closest('.product-card');
    $('.card-image img', $card).removeAttr('srcset');
    $('.card-image img', $card).removeAttr('sizes');

    $('.card-image > img', $card).attr('src', $swatch.data('card-image'));
    $('.card-image__hover > img', $card).attr('src', $swatch.data('card-hover-image'));
    $('.product-card__link', $card).attr('href', $swatch.data('url'));
    
    $('.card-quickbuy__active-color > .swatch-preview', $card).replaceWith( $swatch.closest('label').find('.swatch-preview').clone() );
    $('.card-header__swatch > .swatch-preview', $card).replaceWith( $swatch.closest('label').find('.swatch-preview').clone() );

    $('.card-quickbuy__active-color > p', $card).text( $swatch.attr('data-name') );
    
    $('[data-variant-id]', $card).removeClass('active');
    $(`[data-variant-id="${ $swatch.val() }"]`, $card).addClass('active');
  }
}
ProductCard.init();



const featureVideos = document.querySelectorAll('.key-feature video');
let videoStarted = false;
let videoQueue = [...featureVideos];
videoQueue = videoQueue.reverse();

featureVideos.forEach(el => {
  el.pause();
  el.currentTime = 0;
});

function playInQueue(videoEl) {
  if( videoEl ) {
    videoEl.play();
    videoEl.addEventListener('ended', function() {
      // videoEl.loop = true;
      // videoEl.play();

      playInQueue(videoQueue.pop());
    });
  } else {
    return;
  }
}

if( $('.key-feature').length ) {
  window.addEventListener('scroll', function () {
    if( !videoStarted ) {
      if( $(window).scrollTop() > ( $('.key-feature').offset().top - 100 ) ) {
        playInQueue(videoQueue.pop());
        videoStarted = true;
      }
    }
  }, { passive: true });
}

document.querySelectorAll('.variant-option__content .product-swatches').forEach(el => {
  if( el.querySelectorAll('ul > li').length == 0 ) {
    el.remove();
  }
})



document.addEventListener('DOMContentLoaded', function() {
  function handleBIS() {
    if( $('.stock-notify--success').length ) {
      window.location.href = '/pages/all-collections';

      return false;
    }

    const emailInput = $('.stock-notify__input > input')[0];
    if( !emailInput?.reportValidity() ) {
      return;
    }

    const variantId = $('#main-product-form [name="id"]:checked').val();
    const country = window.storeCountry;
    const APIKeys = {
      'NZ': 'H9Zutj',
      'AU': 'QWHHnn',
      'UK': 'UcDdzA',
      'US': 'dJbwti',
    };
    const APIKey = APIKeys[country];
    const email = $('.stock-notify__input > input').val();
    // const email = `test-${ Date.now() }@almond.studio`;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2023-08-15',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'back-in-stock-subscription',
          attributes: {
            profile: {
              data: {
                type: 'profile', 
                attributes: {
                  email,
                }
              }
            },
            channels: ["EMAIL"]
          },
          relationships: {
            variant: {
              data: {
                type: 'catalog-variant', 
                id: `$shopify:::$default:::${ variantId }`
              }
            }
          }
        }
      })
    };
  
    fetch(`https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${ APIKey }`, options)
      .then(response => {
        console.log({ response });

        if( response.ok ) {
          onSuccess();
        } else {
          onError();
        }

        return response.text();
      })
      .then(response => {
        console.log({ response });

        window.klaviyo_response = response;
      })
      .catch(err => {
        console.error(err)
      });

    

    function onSuccess() {
      $('.variant-bar').toggleClass('stock-notify--success', true);
      $('.stock-notify__input > input').val('');
    }
    function onError() {
      $('.variant-bar').toggleClass('stock-notify--error', true);
    }
  };

  $('.stock-notify__submit').on('click', handleBIS);
  $('.stock-notify__input > input').on('keydown', function(e) {
    if( e.keyCode == 13 ) {
      e.preventDefault();

      handleBIS();

      return false;
    }
  });

});
