/**
 * Accordion Frontend Script
 * File: assets/src/js/accordion-scripts.js
 *
 * This handles the accordion functionality on the frontend
 * Only the first item is open by default
 */

document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.suitepress-accordion');

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');

        items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header-item');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon');

            // Set initial state - only first item open
            const isOpen = item.getAttribute('data-open') === 'true';

            if (isOpen) {
                // Open state
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '−';
            } else {
                // Closed state
                content.style.maxHeight = '0';
                icon.textContent = '+';
            }

            // Click handler
            header.addEventListener('click', function() {
                const isCurrentlyOpen = item.getAttribute('data-open') === 'true';

                if (isCurrentlyOpen) {
                    // Close
                    content.style.maxHeight = '0';
                    icon.textContent = '+';
                    item.setAttribute('data-open', 'false');
                } else {
                    // Open
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '−';
                    item.setAttribute('data-open', 'true');
                }
            });

            // Recalculate height on window resize (only for open items)
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    if (item.getAttribute('data-open') === 'true') {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }, 250);
            });
        });
    });
});
