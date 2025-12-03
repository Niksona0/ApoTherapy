"use strict";

// Modal functionality
const openModal = id => {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = "block";
    setTimeout(() => modal.classList.add("open"), 10);
    document.body.classList.add("jw-modal-open");

    // Set volume for videos inside modal
    modal.querySelectorAll("video").forEach(video => {
        video.volume = 0.1;
        // video.play();
    });
};

const closeModal = () => {
    const activeModal = document.querySelector(".jw-modal.open");
    if (!activeModal) return;

    activeModal.classList.remove("open");

    setTimeout(() => {
        activeModal.style.display = "none";
        activeModal.querySelectorAll("video").forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }, 300); // faster + smoother than 800ms

    document.body.classList.remove("jw-modal-open");
};

// Close modal by clicking background
document.addEventListener("click", event => {
    if (event.target.classList.contains("jw-modal")) {
        closeModal();
    }
});

// jQuery-based functionality
(function ($) {
    $(document).ready(() => {

        // Dropdown hover fix
        const toggleNavbarMethod = () => {
            if ($(window).width() > 992) {
                $(".navbar .dropdown")
                    .off("mouseenter mouseleave") // prevent duplicates
                    .on("mouseenter", function () {
                        $(this).find(".dropdown-toggle").dropdown("show");
                    })
                    .on("mouseleave", function () {
                        $(this).find(".dropdown-toggle").dropdown("hide");
                    });
            } else {
                $(".navbar .dropdown").off("mouseenter mouseleave");
            }
        };

        toggleNavbarMethod();
        $(window).on("resize", toggleNavbarMethod);

        // Back to top button
        $(window).on("scroll", () => {
            $(".back-to-top").toggle($(window).scrollTop() > 100);
        });

        $(".back-to-top").on("click", () => {
            $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
            return false;
        });

        // Counter up
        $("[data-toggle='counter-up']").each(function () {
            const $this = $(this);
            const finalValue = parseInt($this.text(), 10);
            $this.text("0");

            $({ Counter: 0 }).animate({ Counter: finalValue }, {
                duration: 1500,
                easing: "swing",
                step: function (now) {
                    $this.text(Math.ceil(now) + "+");
                }
            });
        });

        // Datetime pickers
        if ($("#date").length) $("#date").datetimepicker({ format: "L" });
        if ($("#time").length) $("#time").datetimepicker({ format: "LT" });
    });
})(jQuery);

// Manual smooth scroll
function forceSmoothScroll(targetY, duration = 700) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease =
            progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startY + diff * ease);

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Smooth scroll for anchors
window.addEventListener("load", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").slice(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                e.preventDefault();
                const targetY =
                    targetEl.getBoundingClientRect().top + window.scrollY;
                forceSmoothScroll(targetY, 800);
            }
        });
    });
});