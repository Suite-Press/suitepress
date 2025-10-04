/**
 * Swiper Frontend Script
 * File: assets/src/js/swiper-scripts.js
 *
 * This handles the swiper slider functionality on the frontend
 * Requires Swiper library to be enqueued
 */

document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.suitepress-swiper');

    // Load Swiper CSS and JS dynamically if not already loaded
    function loadSwiperAssets() {
        return new Promise((resolve) => {
            if (typeof Swiper !== 'undefined') {
                resolve();
                return;
            }

            // Load Swiper CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
            document.head.appendChild(cssLink);

            // Load Swiper JS
            const jsScript = document.createElement('script');
            jsScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            jsScript.onload = resolve;
            document.head.appendChild(jsScript);
        });
    }

    function initializeSliders() {
        sliders.forEach((slider, index) => {
            const effect = slider.getAttribute('data-effect') || 'slide';
            const autoplay = slider.getAttribute('data-autoplay') === 'true';
            const delay = parseInt(slider.getAttribute('data-delay')) || 3000;
            const loop = slider.getAttribute('data-loop') === 'true';
            const navigation = slider.getAttribute('data-navigation') === 'true';
            const pagination = slider.getAttribute('data-pagination') === 'true';
            const slidesPerView = parseInt(slider.getAttribute('data-slides-per-view')) || 1;
            const spaceBetween = parseInt(slider.getAttribute('data-space-between')) || 30;

            const swiperConfig = {
                effect: effect,
                loop: loop,
                slidesPerView: slidesPerView,
                spaceBetween: spaceBetween,
                speed: 600,
                grabCursor: true,

                // Autoplay
                autoplay: autoplay ? {
                    delay: delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                } : false,

                // Navigation
                navigation: navigation ? {
                    nextEl: slider.querySelector('.swiper-button-next'),
                    prevEl: slider.querySelector('.swiper-button-prev'),
                } : false,

                // Pagination
                pagination: pagination ? {
                    el: slider.querySelector('.swiper-pagination'),
                    clickable: true,
                    dynamicBullets: true
                } : false,

                // Effect-specific settings
                coverflowEffect: effect === 'coverflow' ? {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                } : {},

                cubeEffect: effect === 'cube' ? {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                } : {},

                flipEffect: effect === 'flip' ? {
                    slideShadows: true,
                    limitRotation: true,
                } : {},

                fadeEffect: effect === 'fade' ? {
                    crossFade: true
                } : {},

                // Breakpoints for responsive design
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: Math.min(1, slidesPerView),
                        spaceBetween: 10
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: Math.min(2, slidesPerView),
                        spaceBetween: 20
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: slidesPerView,
                        spaceBetween: spaceBetween
                    }
                },

                // Accessibility
                a11y: {
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                    firstSlideMessage: 'This is the first slide',
                    lastSlideMessage: 'This is the last slide',
                    paginationBulletMessage: 'Go to slide {{index}}'
                }
            };

            // Initialize Swiper
            const swiper = new Swiper(slider, swiperConfig);

            // Add resize observer to update slider on container resize
            const resizeObserver = new ResizeObserver(() => {
                swiper.update();
            });
            resizeObserver.observe(slider);

            // Lazy load images
            const images = slider.querySelectorAll('img');
            images.forEach(img => {
                if (!img.loading) {
                    img.loading = 'lazy';
                }
            });
        });
    }

    // Initialize sliders when Swiper is loaded
    loadSwiperAssets().then(() => {
        if (typeof Swiper !== 'undefined') {
            initializeSliders();
        }
    }).catch(error => {
        console.error('Error loading Swiper:', error);
    });
});
