"use strict";

// Modal functionality
const openModal = id => {
    const modal = document.getElementById(id);
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('open'), 10);
    document.body.classList.add('jw-modal-open');

    // Set volume for all videos inside this modal
    modal.querySelectorAll('video').forEach(video => {
    video.volume = 0.1;    // 10% volume
    // video.play(); // auto playistvis
  });
};

const closeModal = () => {
    const openModal = document.querySelector('.jw-modal.open');
    if (openModal) {
        openModal.classList.remove('open');
        setTimeout(() => {
            openModal.style.display = 'none';
            openModal.querySelectorAll('video').forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }, 800);
        document.body.classList.remove('jw-modal-open');
    }
};

window.addEventListener('load', () => {
    document.addEventListener('click', event => {
        if (event.target.classList.contains('jw-modal')) closeModal();
    });
});

// jQuery-based functionality
(function ($) {
    $(document).ready(() => {
        const toggleNavbarMethod = () => {
            if ($(window).width() > 992) {
                $('.navbar .dropdown')
                    .on('mouseover', function () {
                        $('.dropdown-toggle', this).trigger('click');
                    })
                    .on('mouseout', function () {
                        $('.dropdown-toggle', this).trigger('click').blur();
                    });
            } else {
                $('.navbar .dropdown').off('mouseover mouseout');
            }
        };

        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        $(window).scroll(() => {
            $('.back-to-top').toggle($(window).scrollTop() > 100);
        });

        $('.back-to-top').click(() => {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });

        $('[data-toggle="counter-up"]').each(function() {
            const $this = $(this);
            const finalValue = parseInt($this.text()); // get the number
            $this.text('0'); // start from 0

            $({ Counter: 0 }).animate({ Counter: finalValue }, {
                duration: 1500,
                easing: 'swing',
                step: function(now) {
                    $this.text(Math.ceil(now) + '+'); // append + while counting
                }
            });
        });

        $('#date').datetimepicker({ format: 'L' });
        $('#time').datetimepicker({ format: 'LT' });

        const owlCarouselSettings = {
            autoplay: true,
            smartSpeed: 1500,
            loop: true,
            dots: false,
            nav: false
        };

        $(".service-carousel").owlCarousel({
            ...owlCarouselSettings,
            responsive: {
                0: { items: 1 },
                576: { items: 2 },
                768: { items: 3 },
                992: { items: 4 },
                1200: { items: 5 }
            }
        });

        $(".pricing-carousel").owlCarousel({
            ...owlCarouselSettings,
            margin: 30,
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 }
            }
        });

        $(".testimonial-carousel").owlCarousel({
            ...owlCarouselSettings,
            margin: 30,
            dots: true,
            items: 1
        });
    });
})(jQuery);

// Manual smooth scroll function
function forceSmoothScroll(targetY, duration = 700) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startY + diff * ease);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

window.addEventListener("load", () => {
    // Attach to all anchor links with hash hrefs
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                e.preventDefault(); // stop instant jump
                const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
                forceSmoothScroll(targetY, 800); // scroll manually
            }
        });
    });
});