/**
 * Header functionality
 */

// Search popup functionality
function initHeaderFunctionality() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchPopup = document.querySelector('.search-popup');
    const searchClose = document.querySelector('.search-close');
    const searchOverlay = document.querySelector('.search-popup-overlay');
    const bannerClose = document.querySelector('.banner-close');
    const topBanner = document.querySelector('.top-banner');

    // const navbarToggler = document.querySelector('.navbar-toggler');
    // const navbarCollapse = document.querySelector('.navbar-collapse');
    // if (navbarToggler && navbarCollapse) {
    //     // Optional: Add smooth transition
    //     navbarCollapse.style.transition = 'all 0.3s ease-in-out';
    //
    //     // Optional: Close menu when clicking on nav links
    //     const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    //     navLinks.forEach(link => {
    //         link.addEventListener('click', function() {
    //             // Only close if it's not a dropdown toggle
    //             if (!this.classList.contains('dropdown-toggle')) {
    //                 navbarCollapse.classList.remove('show');
    //             }
    //         });
    //     });
    // }

    // const toggler = document.querySelector('.navbar-toggler');
    // const menu = document.querySelector('.navbar-collapse');
    //
    // if (toggler && menu) {
    //     toggler.addEventListener('click', function() {
    //         console.log('Toggler clicked!');
    //         menu.classList.toggle('show');
    //     });
    // }

    // Open search popup
    if (searchToggle && searchPopup) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Search toggle clicked');
            searchPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close search popup
    function closeSearchPopup() {
        if (searchPopup) {
            searchPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearchPopup);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearchPopup);
    }

    // Close banner
    // if (bannerClose && topBanner) {
    //     bannerClose.addEventListener('click', function() {
    //         topBanner.style.display = 'none';
    //         // Optional: Set cookie to remember closed state
    //         document.cookie = "topBannerClosed=true; max-age=" + 60*60*24; // 1 day
    //     });
    // }

    // Check if banner was previously closed
    if (document.cookie.includes('topBannerClosed=true')) {
        if (topBanner) {
            topBanner.style.display = 'none';
        }
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchPopup && searchPopup.classList.contains('active')) {
            closeSearchPopup();
        }
    });

    // Prevent search form submission from closing popup
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.stopPropagation();
        });
    }
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');

        // Prevent link navigation on mobile when clicking to open dropdown
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) { // Mobile breakpoint
                e.preventDefault();
                const isOpen = menu.classList.contains('show');

                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('show');
                    }
                });

                // Toggle current dropdown
                menu.classList.toggle('show');
            }
            // On desktop, the link will navigate normally due to hover CSS
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    });

    // Close dropdowns on window resize
    window.addEventListener('resize', function() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderFunctionality);
} else {
    initHeaderFunctionality();
}
