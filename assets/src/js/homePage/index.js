document.addEventListener('DOMContentLoaded', function() {
    const words = [
        'Exciting WordPress Tutorials',
        'WordPress Blogs',
        'Free/Premium WordPress Plugins',
        'WordPress Blog Themes',
        'Custom Site Development',
        'Technical Support',
        'Exciting WordPress Resources',
    ];

    const typingElement = document.getElementById('typing-text');
    let wordIndex = 0;

    function changeText() {
        typingElement.textContent = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;

        // Reset the animation by removing and adding the class again
        typingElement.style.animation = 'none';
        // Trigger a reflow
        typingElement.offsetHeight; // This will force the DOM to reflow
        typingElement.style.animation = ''; // Reapply the animation
    }

    changeText(); // Start with the first word
    setInterval(changeText, 7000); // Change text every 10 seconds
});
