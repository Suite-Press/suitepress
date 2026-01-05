document.addEventListener('DOMContentLoaded', function() {
    const words = [
        'Technical Blogs',
        'Tech Tutorials',
        'Free plugins',
        'Free Addons',
        'Free WP Support',
        'WP Tips'
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
