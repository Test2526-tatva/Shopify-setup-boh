
/* product modal start */
function privacynavbar() {
    var $navLinks = $(".nav-sections .privacy-nav .nav-list");
    var $prevBtn = $(".privacy-nav .prev-btn");
    var $nextBtn = $(".privacy-nav .next-btn");

    // Function to update button states
    function updateButtonStates() {
        var currentScroll = $navLinks.scrollLeft();
        var scrollwidth = $navLinks[0].scrollWidth;
        var clientWidth = $navLinks[0].clientWidth;

        if (currentScroll <= 0) {
            $prevBtn.addClass('disable');
        } else {
            $prevBtn.removeClass('disable');
        }

        if (currentScroll >= (scrollwidth - clientWidth) - 1) {
            $nextBtn.addClass('disable');
        } else {
            $nextBtn.removeClass('disable');
        }
    }

    function updateScrollAmount() {
        // Update scroll amount to handle changes
        updateButtonStates();
    }

    $(".privacy-nav .next-btn").click(function () {

        var currentScroll = $navLinks.scrollLeft();
        var newScroll = Math.min(currentScroll + $navLinks.innerWidth(), $navLinks[0].scrollWidth - $navLinks.innerWidth());

        $navLinks.animate(
            {
                scrollLeft: newScroll,
            },
            350,
            function () {
                // Callback to update button states after animation completes
                updateButtonStates();
            }
        );
    });

    $(".privacy-nav .prev-btn").click(function () {
        var currentScroll = $navLinks.scrollLeft();
        var newScroll = Math.max(currentScroll - $navLinks.innerWidth(), 0);

        $navLinks.animate(
            {
                scrollLeft: newScroll,
            },
            350,
            function () {
                // Callback to update button states after animation completes
                updateButtonStates();
            }
        );
    });

    $(window).resize(updateScrollAmount); // Update button states on window resize
    $(document).ready(updateScrollAmount); // Set the initial button states

    $navLinks.on('scroll', updateButtonStates); // Update button states on scroll
}
/* product modal end */

$(window).ready(function () {
    privacynavbar();
})
$(window).resize(function () {
    privacynavbar();
})