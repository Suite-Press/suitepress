document.addEventListener('DOMContentLoaded', function() {
    const words = [
        'Expert WordPress Solutions',
        'Premium Plugins & Themes',
        'Custom Development',
        'Technical Excellence',
        'Professional Support',
        'Innovative Features',
        'Reliable Performance'
    ];

    const typingElement = document.getElementById('typing-text');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of the word
            typeSpeed = 2000; // 2 second pause
            isDeleting = true;
        }
        // If word is completely deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start the typing effect
    typeWriter();
});


//Header
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.sp-top-banner');
    const closeBtn = document.querySelector('.sp-banner-close');

    // Check if user has dismissed the banner
    const bannerDismissed = localStorage.getItem('spBannerDismissed');

    if (bannerDismissed === 'true') {
        banner.remove();
        return;
    }

    // Close banner functionality
    closeBtn.addEventListener('click', function() {
        // Add hide animation
        banner.classList.add('sp-banner-hidden');

        // Remove from DOM after animation
        setTimeout(() => {
            banner.remove();
        }, 500);

        // Remember user's choice
        localStorage.setItem('spBannerDismissed', 'true');
    });

    // Add intersection observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sp-banner-visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(banner);

    // Add feature tooltips for mobile
    if (window.innerWidth <= 640) {
        const featureItems = document.querySelectorAll('.sp-feature-item');
        featureItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const tooltip = this.querySelector('.sp-feature-text');
                alert(tooltip.getAttribute('data-tooltip') || tooltip.textContent + ' - ' + this.getAttribute('title'));
            });
        });
    }
});
