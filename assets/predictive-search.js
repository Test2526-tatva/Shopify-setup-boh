class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('#search-input');
    this.predictiveSearchResults = document.querySelector('#search-results');

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = encodeURIComponent(this.input.value.trim());

    if (!searchTerm.length) {
      $(this.predictiveSearchResults).fadeOut(function () {
        $('.search__initial').fadeIn()
      });

      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search?q=${searchTerm}&type=product,article&options[unavailable_products]=show&options[prefix]=last&view=predictive`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();

          throw error;
        }



        return response.text();
      })
      .then((text) => {
        // console.log({ text });
        if (text.indexOf('no-results') != -1) {
          $('.navbar__search').addClass('search-results--no-results');

          return;
        }

        $('.navbar__search').removeClass('search-results--no-results');


        // const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        const resultsMarkup = text;
        this.predictiveSearchResults.innerHTML = resultsMarkup;

        window.updateProductCardsWishlist?.();

        if ($('.search__initial').is(':visible')) {
          $(this.predictiveSearchResults).hide();

          $('.search__initial').fadeOut(() => {
            this.open();
          });
        } else {
          this.open();
        }

      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    $(this.predictiveSearchResults).fadeIn();
    console.log('open');
  }

  close() {
    $(this.predictiveSearchResults).fadeOut();
    console.log('close');
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}

customElements.define('predictive-search', PredictiveSearch);
