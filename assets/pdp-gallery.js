class CustomCursor {
  constructor() {

  }

  static show(cursor) {
    gsap.to(cursor, {
      autoAlpha: 1,
    })
  }

  static hide(cursor) {
    gsap.to(cursor, {
      autoAlpha: 0,
    })
  }

  static init() {
    document.querySelectorAll(".custom-cursor__trigger").forEach(el => {
      const cursor = document.querySelector(el.getAttribute('data-cursor'));

      el.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY
        })
      })

      el.addEventListener('mouseenter', event => {
        CustomCursor.show(cursor);
      })
      
      el.addEventListener('mouseleave', event => {
        CustomCursor.hide(cursor);
      })
      
      el.addEventListener('mousedown', event => {
        cursor.classList.add('custom-cursor--mouse-down');
      })
      el.addEventListener('mouseup', event => {
        cursor.classList.remove('custom-cursor--mouse-down');
      })


      // el.querySelectorAll(', .owl-dots').forEach(disabledEl => {
      //   disabledEl.addEventListener('mouseenter', event => {
      //     CustomCursor.hide(cursor);
      //   })
        
      //   disabledEl.addEventListener('mouseleave', event => {
      //     CustomCursor.show(cursor);
      //   })
      // });

      $(el).on('mouseenter', '.custom-cursor__disable, .owl-dots', () => {
        CustomCursor.hide(cursor);
      }).on('mouseleave', '.custom-cursor__disable, .owl-dots', () => {
        CustomCursor.show(cursor);
      })

    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  CustomCursor.init();
  
  document.querySelectorAll('.custom-cursor__trigger--gallery').forEach(gallery => {
    let dims = gallery.getBoundingClientRect();
    $(window).on("resize", function() {
      dims = gallery.getBoundingClientRect();
    });
    const cursor = document.querySelector(gallery.getAttribute('data-cursor'));
  
  
    gallery.addEventListener('mousemove', event => {  
      if( (event.clientX - dims.x) > dims.width/2 ) {
        cursor.classList.add('custom-cursor--right');
        cursor.classList.remove('custom-cursor--left');
      } else {
        cursor.classList.add('custom-cursor--left');
        cursor.classList.remove('custom-cursor--right');
      }
    })
  })
  
});
