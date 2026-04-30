document.addEventListener('DOMContentLoaded', () => {
    initFloatingSanskrit();
});

function initFloatingSanskrit() {
    const container = document.getElementById('floating-sanskrit-container');
    if (!container) return;

    // A list of authentic Sanskrit words/dhatus to float around
    const words = [
        'ज्ञान', 'योग', 'धर्म', 'कर्म', 'मोक्ष', 'सत्य', 'शान्ति', 'आनन्द', 'ब्रह्म',
        'आत्मा', 'प्रज्ञा', 'ध्यान', 'भक्ति', 'शक्ति', 'मुक्ति', 'कृ', 'भू', 'गम्',
        'पठ्', 'लिख्', 'दृश्', 'स्था', 'पा', 'दा', 'श्रु', 'वद्', 'अस्', 'हन्',
        'अष्टाध्यायी', 'पाणिनि', 'सूत्र', 'धातु', 'प्रत्यय', 'उपसर्ग', 'अधिकार'
    ];

    const wordCount = 30; // Number of floating words

    for (let i = 0; i < wordCount; i++) {
        createFloatingWord(container, words);
    }
}

function createFloatingWord(container, words) {
    const wordEl = document.createElement('div');
    wordEl.className = 'floating-word';

    // Pick a random word
    const randomWord = words[Math.floor(Math.random() * words.length)];
    wordEl.textContent = randomWord;

    // Randomize positioning and animation properties
    const startX = Math.random() * 100; // 0 to 100 vw
    const startZ = (Math.random() * -600) - 100; // -100 to -700 px (depth)

    const duration = Math.random() * 15 + 15; // 15s to 30s
    const delay = Math.random() * -30; // Negative delay to start immediately at different stages

    const fontSize = Math.random() * 1.5 + 1.5; // 1.5rem to 3rem

    // Different opacities for depth effect
    const maxOpacity = Math.random() * 0.2 + 0.1; // 0.1 to 0.3

    wordEl.style.left = `${startX}%`;
    wordEl.style.fontSize = `${fontSize}rem`;
    wordEl.style.animationDuration = `${duration}s`;
    wordEl.style.animationDelay = `${delay}s`;
    wordEl.style.setProperty('--max-opacity', maxOpacity);

    // Apply some initial rotation
    const rotX = Math.random() * 360;
    const rotY = Math.random() * 360;
    const rotZ = Math.random() * 360;
    // We override transform locally if we want, but CSS animation handles it. 
    // To make it truly random 3D, we'd need to set CSS variables or use JS animation. 
    // Let's use CSS vars for start/end points.

    const endX = startX + (Math.random() * 20 - 10); // Drift left/right

    wordEl.style.setProperty('--start-x', `${startX}vw`);
    wordEl.style.setProperty('--start-z', `${startZ}px`);
    wordEl.style.setProperty('--end-x', `${endX}vw`);

    // In style.css, the keyframes float3D doesn't use vars yet, but we can dynamically add inline style 
    // if we want varied paths, or just stick to the CSS class animation.

    container.appendChild(wordEl);
}
