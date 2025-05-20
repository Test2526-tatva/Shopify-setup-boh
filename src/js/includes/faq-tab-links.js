import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.faq-category__anchor').forEach((el, Index) => {
  const id = el.getAttribute('id');
  const title = el.getAttribute('data-title');

  const item = document.createElement('li');
  const link = document.createElement('a');
  const span = document.createElement('span');

  link.href = `#${id}`;
  span.innerText = title;

  link.appendChild(span);
  item.appendChild(link);
  item.classList.add("nav-link");
  item.setAttribute('data-product-id', `product-${id}-${Index}`);


  document.querySelector('.faq-main__tab-links').appendChild(item);
});

$('.faq-category__toggle').on('click', function () {
  const $target = $(this).closest('.faq-main-category');
  $('.faq-main-category.active').not($target).removeClass('active');
  $target.toggleClass('active');
});

$(document).ready(function () {
  $('.faq-main__tab-links li:first-child a').addClass('active');
});
$('.faq-main__tab-links li a').on('click', function (e) {
  $(".faq-main__tab-links li a").removeClass('active');
  $(this).addClass('active');
});

ScrollTrigger.matchMedia({
  "(min-width: 992px)": function () {

    const offset = $('.navbar').height() + 70;
    // const offsetBottom = $('.faq-main__tab-links').height() + offset + 100;

    const ST = ScrollTrigger.create({
      trigger: '.faq-main__left--sticky',
      endTrigger: '.ranges-carousel',
      start: `${-offset} top`,
      end: `top bottom`,
      pin: true,
      pinSpacing: false,
    })

  }
})
