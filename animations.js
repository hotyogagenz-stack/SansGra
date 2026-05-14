document.addEventListener('DOMContentLoaded', () => {
    initFloatingSanskrit();
    initTypingPlaceholder();
});

const SEARCH_PLACEHOLDERS = {
    hi: [
        "उदाहरण खोजें...",
        "कृदन्त खोजें...",
        "तिङन्त खोजें...",
        "तद्धितान्त खोजें...",
        "सुबन्त खोजें...",
        "सूत्र खोजें...",
        "धातु खोजें...",
        "शब्दरूप खोजें...",
        "धातुरूप खोजें...",
        "प्रश्नोत्तरी AI से पूछें..."
    ],
    sa: [
        "उदाहरणम् अन्वेषय...",
        "कृदन्तम् अन्वेषय...",
        "तिङन्तम् अन्वेषय...",
        "तद्धितान्तम् अन्वेषय...",
        "सुबन्तम् अन्वेषय...",
        "सूत्राणि अन्वेषय...",
        "धातून् अन्वेषय...",
        "शब्दरूपाणि अन्वेषय...",
        "धातुरूपाणि अन्वेषय...",
        "प्रश्नोत्तरी AI पृच्छ..."
    ],
    en: [
        "Search Examples...",
        "Search Kridanta...",
        "Search Tinnanta...",
        "Search Taddhitanta...",
        "Search Subanta...",
        "Search Sutras...",
        "Search Dhatus...",
        "Search Shabda Rupa...",
        "Search Dhatu Rupa...",
        "Ask Q&A AI..."
    ]
};

function initTypingPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const inputEl = document.getElementById('searchInput');
        if (!inputEl) return;
        const lang = localStorage.getItem('siteLang') || 'hi';
        const phrases = SEARCH_PLACEHOLDERS[lang] || SEARCH_PLACEHOLDERS['hi'];
        
        if (phraseIndex >= phrases.length) {
            phraseIndex = 0;
        }

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            inputEl.setAttribute('placeholder', currentPhrase.substring(0, charIndex));
            charIndex--;
            typingSpeed = 35;
        } else {
            inputEl.setAttribute('placeholder', currentPhrase.substring(0, charIndex + 1));
            charIndex++;
            typingSpeed = 75;
        }

        let delay = typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2200; // Pause when phrase is fully typed
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400; // Pause before typing next phrase
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 600);
}

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
