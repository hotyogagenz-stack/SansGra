document.addEventListener('DOMContentLoaded', () => {
    initFloatingSanskrit();
});

function initFloatingSanskrit() {
    const container = document.getElementById('floating-sanskrit-container');
    if (!container) return;

    const words = [
        'अइउण्', 'ऋऌक्', 'एओङ्', 'ऐऔच्', 'हयवरट्', 'लण्', 'ञमङणनम्', 'झभञ्', 'घढधष्', 'जबगडदश्', 'खफछठथचटतव्', 'कपय्', 'शषसर्', 'हल्',
        'अ', 'इ', 'उ', 'ण्', 'ऋ', 'ऌ', 'क्', 'ए', 'ओ', 'ङ्', 'ऐ', 'औ', 'च्', 
        'ह', 'य', 'व', 'र', 'ट्', 'ल', 'ण्', 'ञ', 'म', 'ङ', 'ण', 'न', 'म्', 
        'झ', 'भ', 'ञ्', 'घ', 'ढ', 'ध', 'ष्', 'ज', 'ब', 'ग', 'ड', 'द', 'श्', 
        'ख', 'फ', 'छ', 'ठ', 'थ', 'च', 'ट', 'त', 'व्', 'क', 'प', 'य्', 
        'श', 'ष', 'स', 'र्', 'ह', 'ल्', 'ॐ', '॥', 'श्र', 'प्र', 'वि', 'अनु', 'प्रति',
        'सं', 'अधि', 'अति', 'नि', 'सु', 'उत', 'अभि', 'परि', 'उप', 'आ'
    ];

    const wordCount = 150;

    // Initial burst from center for "Woooow" factor
    for (let i = 0; i < 40; i++) {
        setTimeout(() => createFloatingWord(container, words, true), i * 30);
    }

    // Steady flow
    for (let i = 0; i < wordCount; i++) {
        createFloatingWord(container, words, false);
    }
}

function createFloatingWord(container, words, isBurst) {
    const wordEl = document.createElement('div');
    wordEl.className = 'floating-word';

    const randomWord = words[Math.floor(Math.random() * words.length)];
    wordEl.textContent = randomWord;

    // Start positions
    let startX, startZ, endX, duration, delay;

    if (isBurst) {
        // Burst from the center of the screen
        startX = 50 + (Math.random() * 20 - 10); 
        startZ = (Math.random() * -300);
        endX = startX + (Math.random() * 80 - 40);
        duration = Math.random() * 4 + 3; // Fast burst
        delay = 0;
    } else {
        // Normal drift
        startX = Math.random() * 100;
        startZ = (Math.random() * -600) - 100;
        endX = startX + (Math.random() * 40 - 20);
        duration = Math.random() * 10 + 15;
        delay = Math.random() * -30;
    }

    const fontSize = Math.random() * 1.5 + 1.2;
    const maxOpacity = Math.random() * 0.25 + 0.05;

    wordEl.style.left = `${startX}%`;
    wordEl.style.fontSize = `${fontSize}rem`;
    wordEl.style.animationDuration = `${duration}s`;
    wordEl.style.animationDelay = `${delay}s`;
    wordEl.style.setProperty('--max-opacity', maxOpacity);
    wordEl.style.setProperty('--start-x', `${startX}vw`);
    wordEl.style.setProperty('--start-y', isBurst ? '50vh' : '110vh');
    wordEl.style.setProperty('--start-z', `${startZ}px`);
    wordEl.style.setProperty('--end-x', `${endX}vw`);

    if (isBurst) {
        wordEl.style.filter = 'blur(0px)';
        wordEl.style.zIndex = '100';
    }

    container.appendChild(wordEl);
    
    // Remove burst items after animation ends to keep DOM clean
    if (isBurst) {
        setTimeout(() => wordEl.remove(), duration * 1000);
    }
}
