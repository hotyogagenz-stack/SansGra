let sanskritDatabase = {};
let pratyayaDB = {}; 

// ==================================================
// 1. वर्ण संयोजन और सन्धि (Halant + Vowel Joiner & Sandhi)
// ==================================================
function joinSanskrit(text) {
    const vowelMap = { '्अ': '', '्आ': 'ा', '्इ': 'ि', '्ई': 'ी', '्उ': 'ु', '्ऊ': 'ू', '्ऋ': 'ृ', '्ए': 'े', '्ऐ': 'ै', '्ओ': 'ो', '्औ': 'ौ' };
    for (let [key, val] of Object.entries(vowelMap)) { text = text.split(key).join(val); }
    return text;
}

function autoGuna(d) {
    if (d.endsWith('ि') || d.endsWith('ी')) return d.slice(0, -1) + 'े';
    if (d.endsWith('ु') || d.endsWith('ू')) return d.slice(0, -1) + 'ो';
    if (d.endsWith('ृ')) return d.slice(0, -1) + 'र्'; 
    if (d.endsWith('्')) {
        return d.replace(/ि([क-ह]्)$/, 'े$1').replace(/ु([क-ह]्)$/, 'ो$1').replace(/ृ([क-ह]्)$/, 'र्$1');
    }
    return d; 
}

function autoVriddhi(d) {
    if (d.endsWith('ि') || d.endsWith('ी')) return d.slice(0, -1) + 'ै';
    if (d.endsWith('ु') || d.endsWith('ू')) return d.slice(0, -1) + 'ौ';
    if (d.endsWith('ृ')) return d.slice(0, -1) + 'ार्'; 
    if (d.endsWith('्') && !d.match(/[ािीुूृेैोौ][क-ह]्$/) && !d.match(/[क-ह]्[क-ह]्$/)) {
        return d.replace(/([क-ह])([क-ह]्)$/, '$1ा$2'); 
    }
    if (d.endsWith('्')) {
        return d.replace(/ि([क-ह]्)$/, 'ै$1').replace(/ु([क-ह]्)$/, 'ौ$1').replace(/ृ([क-ह]्)$/, 'ार्$1');
    }
    return d; 
}

function applySandhi(word1, word2) {
    if (!word1) return word2;
    if (!word2) return word1;

    let w1 = word1.slice(0, -1); 
    let lastChar = word1.slice(-1); 
    let firstChar = word2.charAt(0); 
    let w2 = word2.slice(1); 

    let isVowel = ['अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ'].includes(firstChar);
    let isConsonantWithImplicitA = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".includes(lastChar);

    if (isConsonantWithImplicitA) {
        if (firstChar === 'अ' || firstChar === 'आ') return w1 + lastChar + 'ा' + w2; 
        if (firstChar === 'इ' || firstChar === 'ई') return w1 + lastChar + 'े' + w2; 
        if (firstChar === 'उ' || firstChar === 'ऊ') return w1 + lastChar + 'ो' + w2; 
        if (firstChar === 'ऋ') return w1 + lastChar + 'र्' + w2; 
        if (firstChar === 'ए' || firstChar === 'ऐ') return w1 + lastChar + 'ै' + w2;
        if (firstChar === 'ओ' || firstChar === 'औ') return w1 + lastChar + 'ौ' + w2;
    }

    // --- ६.१.७७ इको यणचि (सुधार: व्/य् के साथ स्वर को तुरंत जोड़ना ताकि पिछला वर्ण आधा रहे) ---
    if ((lastChar === 'ि' || lastChar === 'ी') && isVowel) return w1 + '्' + joinSanskrit('य्' + firstChar) + w2;
    if ((lastChar === 'ु' || lastChar === 'ू') && isVowel) return w1 + '्' + joinSanskrit('व्' + firstChar) + w2;
    if ((lastChar === 'ृ' || lastChar === 'ॄ') && isVowel) return w1 + '्' + joinSanskrit('र्' + firstChar) + w2;

    if (lastChar === 'े' && isVowel) return w1 + joinSanskrit('य्' + firstChar) + w2; 
    if (lastChar === 'ै' && isVowel) return w1 + joinSanskrit('ाय्' + firstChar) + w2;
    if (lastChar === 'ो' && isVowel) return w1 + joinSanskrit('व्' + firstChar) + w2;
    if (lastChar === 'ौ' && isVowel) return w1 + joinSanskrit('ाव्' + firstChar) + w2;

    if (lastChar === 'म्' && !isVowel) return w1 + 'ं' + firstChar + w2;

    if (lastChar === 'श्' && firstChar === 'त') return w1 + 'ष्ट' + w2; 
    if (lastChar === 'च्' && firstChar === 'त') return w1 + 'क्त' + w2; 
    if (lastChar === 'ज्' && firstChar === 'त') return w1 + 'क्त' + w2; 

    return word1 + word2;
}

// ==================================================
// 2. डेटाबेस लोडिंग (Concurrent JSON loading)
// ==================================================
async function loadDatabase() {
    try {
        const timestamp = new Date().getTime();
        const [dhatusRes, sutrasRes, examplesRes, pratyayasRes] = await Promise.all([
            fetch(`dhatus.json?v=${timestamp}`),
            fetch(`sutras.json?v=${timestamp}`),
            fetch(`examples.json?v=${timestamp}`),
            fetch(`pratyayas.json?v=${timestamp}`)
        ]);

        if (!dhatusRes.ok || !sutrasRes.ok || !examplesRes.ok || !pratyayasRes.ok) {
            throw new Error("JSON files missing or broken.");
        }

    const dhatusData = await dhatusRes.json();
    const sutrasData = await sutrasRes.json();
    const examplesData = await examplesRes.json();
    const pratyayasData = await pratyayasRes.json();

    // expose sutras data globally for pages like sutras.html that render the lists
    try { window.sutrasData = sutrasData; } catch (e) { /* ignore */ }

        sanskritDatabase = { ...dhatusData, ...sutrasData, ...examplesData };
        pratyayaDB = pratyayasData.pratyayaDB;

        initializeUI();
    } catch (error) { 
        console.error(error);
        alert("डेटा लोड नहीं हो सका। कृपया JSON फ़ाइलों की जाँच करें।"); 
    }
}

function initializeUI() {
    let upaList = document.getElementById("upaList");
    if (upaList && sanskritDatabase.upasargas) {
        upaList.innerHTML = '<option value="">कोई उपसर्ग नहीं</option>';
        sanskritDatabase.upasargas.forEach(u => { if(u.id !== "") upaList.insertAdjacentHTML('beforeend', `<option value="${u.id}">${u.label}</option>`); });
    }
    
    let dhatuList = document.getElementById("dhatuList");
    if (dhatuList && sanskritDatabase.dhatus) {
        dhatuList.innerHTML = '<option value="">धातु चुनें...</option>';
        for (let key in sanskritDatabase.dhatus) { 
            dhatuList.insertAdjacentHTML('beforeend', `<option value="${key}">${sanskritDatabase.dhatus[key].label}</option>`); 
        }
    }
    
    let pratList = document.getElementById("pratList");
    if (pratList && pratyayaDB) {
        pratList.innerHTML = '<option value="">प्रत्यय चुनें...</option>';
        for (let key in pratyayaDB) { 
            pratList.insertAdjacentHTML('beforeend', `<option value="${key}">${key}</option>`); 
        }
    }

    let dropdownContainer = document.getElementById("sutraDropdown");
    // Only populate the inline dropdown if the element explicitly opts-in via data-render="dropdown".
    // This avoids injecting large content into pages that don't want the dropdown (prevents displacement).
    if (dropdownContainer && dropdownContainer.getAttribute('data-render') === 'dropdown') {
        dropdownContainer.innerHTML = "";
        const padaConfig = [
            { key: 'samjnaSutras', color: '#10b981' }, { key: 'pada_1_2', color: '#3b82f6' }, { key: 'pada_1_3', color: '#ec4899' }, { key: 'pada_1_4', color: '#eab308' },
            { key: 'pada_2_1', color: '#b91c1c' }, { key: 'pada_2_2', color: '#f97316' }, { key: 'pada_2_3', color: '#d946ef' }, { key: 'pada_2_4', color: '#06b6d4' },
            { key: 'pada_3_1', color: '#8b5cf6' }, { key: 'pada_3_2', color: '#14b8a6' }, { key: 'pada_3_3', color: '#6366f1' }, { key: 'pada_3_4', color: '#dc2626' },
            { key: 'pada_4_1', color: '#f472b6' }, { key: 'pada_4_2', color: '#9333ea' }, { key: 'pada_4_3', color: '#e11d48' }, { key: 'pada_4_4', color: '#10b981' },
            { key: 'pada_5_1', color: '#4f46e5' }, { key: 'pada_5_2', color: '#ea580c' }, { key: 'pada_5_3', color: '#14b8a6' }, { key: 'pada_5_4', color: '#0ea5e9' },
            { key: 'pada_6_1', color: '#78350f' }, { key: 'pada_6_2', color: '#475569' }, { key: 'pada_6_3', color: '#3b82f6' }, { key: 'pada_6_4', color: '#f59e0b' },
            { key: 'pada_7_1', color: '#8b5cf6' }, { key: 'pada_7_2', color: '#db2777' }, { key: 'pada_7_3', color: '#0284c7' }, { key: 'pada_7_4', color: '#84cc16' },
            { key: 'pada_8_1', color: '#dc2626' }, { key: 'pada_8_2', color: '#f97316' }, { key: 'pada_8_3', color: '#eab308' }, { key: 'pada_8_4', color: '#ec4899' }
        ];
        padaConfig.forEach(config => {
            if (sanskritDatabase[config.key]) {
                sanskritDatabase[config.key].forEach(s => {
                    dropdownContainer.insertAdjacentHTML('beforeend', `<div class="sutra-item" style="border-left: 3px solid ${config.color};"><div class="sutra-header sanskrit-text" onclick="toggleAccordion(event, this)">[${s.id}] ${s.name} <i class="fa-solid fa-chevron-down"></i></div><div class="sutra-desc sanskrit-text"><br>${s.desc}<br><br></div></div>`);
                });
            }
        });
    }
}
window.onload = loadDatabase;

// ==================================================
// 🛠️ 3. DYNAMIC PANINIAN ENGINE 🛠️
// ==================================================
function generateKridanta() {
    let upa = document.getElementById("upasarga").value.trim();
    let dhatuStr = document.getElementById("dhatu").value.trim();
    let rawPratStr = document.getElementById("pratyaya").value.trim().replace(/\s+/g, '');

    if(!dhatuStr || !rawPratStr) { alert("कृपया कम से कम एक धातु और प्रत्यय टाइप करें!"); return; }

    let steps = [];
    let baseForm = "";
    let finalForm = "";

    steps.push(`<b>शुरुआत:</b> ${upa ? upa + ' + ' : ''}${dhatuStr} + ${rawPratStr}`);

    let pratStr = rawPratStr;
    if (pratStr === "क्त्वा" && upa !== "") {
        steps.push(`उपसर्ग होने के कारण 'समासेऽनञ्पूर्वे क्त्वो ल्यप्' (7.1.37) से 'क्त्वा' को 'ल्यप्' आदेश हुआ।`);
        pratStr = "ल्यप्";
    }

    let dhatuData = sanskritDatabase.dhatus ? sanskritDatabase.dhatus[dhatuStr] : null;
    let activeDhatu = dhatuStr;

    if (!dhatuData) {
        steps.push(`<i>(नोट: धातु कस्टम है, सिस्टम सामान्य उपधा नियमों से काम कर रहा है)</i>`);
        dhatuData = { isSet: true, guna: autoGuna(dhatuStr), vriddhi: autoVriddhi(dhatuStr), clean: dhatuStr };
    } else {
        activeDhatu = dhatuData.clean;
        if(dhatuData.anubandha && dhatuData.anubandha !== "none") {
            steps.push(`<b>इत्-संज्ञा व लोप:</b> 'आदिर्ञिटुडवः/हलन्त्यम्' आदि से <b>${dhatuData.anubandha}</b> का लोप हुआ। शेष धातु: <b>${activeDhatu}</b>`);
        }
    }

    let pratData = pratyayaDB[pratStr];
    if (!pratData) {
        steps.push(`<i>(नोट: प्रत्यय डेटाबेस में नहीं है, सिस्टम सामान्य रूप से जोड़ रहा है)</i>`);
        pratData = { real: pratStr, type: "akit", lopa: "अज्ञात" };
    } else {
        steps.push(`<b>इत्-लोप:</b> ${pratData.lopa}। शेष बचा: <b>${pratData.real}</b>`);
    }

    let activePratyaya = pratData.real;

    if (pratData.type === "kit" || pratData.type === "ngit" || pratData.type === "git") {
        steps.push(`<b>गुण/वृद्धि निषेध:</b> प्रत्यय कित्/ङित्/गित् है, अतः 'क्ङिति च (1.1.5)' से गुण/वृद्धि निषिद्ध।`);
    } else if (pratData.type === "nnit" || pratData.type === "nit") {
        activeDhatu = dhatuData.vriddhi;
        steps.push(`<b>वृद्धि:</b> प्रत्यय ञित्/णित् होने से 'अचो ञ्णिति/अत उपधायाः' से धातु को वृद्धि -> <b>${activeDhatu}</b>`);
    } else {
        activeDhatu = dhatuData.guna;
        steps.push(`<b>गुण:</b> 'सार्वधातुकार्धधातुकयोः' से धातु को गुण हुआ -> <b>${activeDhatu}</b>`);
    }

    if (pratData.kutva || pratData.type === "ghit") {
        if (activeDhatu.endsWith('च्') || activeDhatu.endsWith('ज्')) {
            activeDhatu = activeDhatu.replace(/च्$/, 'क्').replace(/ज्$/, 'ग्');
            steps.push(`<b>कुत्व:</b> 'चजोः कु घिण्ण्यतोः' से 'च्/ज्' के स्थान पर 'क्/ग्' हुआ -> <b>${activeDhatu}</b>`);
        }
    }

    if (pratData.type === "dit") {
        activeDhatu = activeDhatu.replace(/[अाइईउऊऋएऐओऔ][क-ह]्?$/, ''); 
        steps.push(`<b>टि-लोप:</b> डित् प्रत्यय परे होने से 'टेः' (6.4.143) से अन्त्य भाग का लोप -> <b>${activeDhatu}</b>`);
    }

    if (pratStr === "ल्यप्") {
        let shortVowels = ["अ", "इ", "उ", "ऋ", "ि", "ु", "ृ"]; 
        if (shortVowels.includes(activeDhatu.slice(-1))) {
            activePratyaya = "त्य";
            steps.push(`<b>तुक् आगम:</b> धातु ह्रस्वान्त है, अतः 'ह्रस्वस्य पिति कृति तुक्' से 'त्' जुड़ा।`);
        }
    }

    if ((activeDhatu.endsWith("म्") || activeDhatu.endsWith("न्")) && (pratData.type === "kit" || pratData.type === "ngit")) {
        activeDhatu = activeDhatu.slice(0, -1);
        steps.push(`<b>अनुनासिक लोप:</b> 'अनुदात्तोपदेश...' (6.4.37) से म्/न् का लोप हुआ -> <b>${activeDhatu}</b>`);
    }

    let isValadi = !['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ', 'य'].includes(activePratyaya.charAt(0));
    let itAgama = false;
    if (dhatuData.isSet && isValadi && pratStr !== "ल्यप्") {
        itAgama = true;
        steps.push(`<b>इट्-आगम:</b> धातु 'सेट्' है और प्रत्यय वलादि है, अतः 'आर्धधातुकस्येड् वलादेः' (7.2.35) से 'इ' का आगम हुआ।`);
    }

    if (itAgama) baseForm = applySandhi(activeDhatu, "इ" + activePratyaya);
    else baseForm = applySandhi(activeDhatu, activePratyaya);

    if (baseForm.includes("म्त") || baseForm.includes("म्त्व")) {
        baseForm = baseForm.replace("म्त", "न्त").replace("म्त्व", "न्त्व");
        steps.push(`<b>परसवर्ण:</b> 'अनुस्वारस्य ययि परसवर्णः' से 'म्' को 'न्' हुआ।`);
    }

    // अंतिम वर्ण संयोजन (Join)
    let joinedForm = joinSanskrit(baseForm);
    if(baseForm !== joinedForm) {
        steps.push(`<b>वर्ण संयोजन:</b> स्वर और व्यंजन मिलकर पूर्ण पद बने -> <b>${joinedForm}</b>`);
        baseForm = joinedForm;
    }

    if (pratData.gender === "m") {
        baseForm = baseForm + "ः";
        steps.push(`<b>सुप्-विभक्ति:</b> पुँल्लिङ्ग प्रथमा एकवचन 'सु' का विसर्ग (ः) हुआ -> <b>${baseForm}</b>`);
    } else if (pratData.gender === "n") {
        baseForm = baseForm + "म्";
        steps.push(`<b>सुप्-विभक्ति:</b> नपुंसकलिङ्ग में 'सु' को 'अम्' हुआ -> <b>${baseForm}</b>`);
    } else if (pratData.gender === "f") {
        baseForm = baseForm + "ः"; 
        steps.push(`<b>सुप्-विभक्ति:</b> स्त्रीलिङ्ग प्रथमा एकवचन 'सु' का विसर्ग (ः) हुआ -> <b>${baseForm}</b>`);
    }

    if (upa !== "") {
        let uBase = upa === "आङ्" ? "आ" : upa;
        steps.push(`<b>उपसर्ग योग:</b> '${uBase}' का '${baseForm}' के साथ योग।`);
        finalForm = applySandhi(uBase, baseForm);
        finalForm = joinSanskrit(finalForm);
        if(finalForm !== uBase + baseForm) steps.push(`<b>सन्धि:</b> पाणिनीय सन्धि नियमों से शब्द बना -> <b>${finalForm}</b>`);
    } else {
        finalForm = baseForm;
    }

    steps.push(`<b>सिद्ध रूप:</b> <span style="color:#ec4899; font-size:1.2em;">${finalForm}</span>`);

    document.getElementById("finalOutput").innerText = finalForm;
    let stepsHtml = steps.map((s, index) => `<li class="step-item"><div style="background:#3b82f6; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-weight:bold; font-size:14px;">${index+1}</div> <div>${s}</div></li>`).join("");
    document.getElementById("prakriyaSteps").innerHTML = stepsHtml;

    document.getElementById("resultSection").classList.add("active");
    document.getElementById("prakriyaBox").classList.remove("show");
    setTimeout(() => { document.getElementById("resultSection").scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
}

// UI Interaction Helpers
function togglePrakriya() { document.getElementById("prakriyaBox").classList.toggle("show"); }
function toggleMobileMenu() {
    const nav = document.getElementById("nav-menu");
    const icon = document.getElementById("menu-icon");
    nav.classList.toggle("active");
    if(nav.classList.contains("active")) { icon.classList.replace("fa-bars", "fa-xmark"); document.body.style.overflow = "hidden"; } 
    else { icon.classList.replace("fa-xmark", "fa-bars"); document.body.style.overflow = "auto"; }
}
function closeMobileMenu() { if(window.innerWidth <= 768) toggleMobileMenu(); }
function toggleSutraDropdown(event) { event.stopPropagation(); document.getElementById("sutraDropdown").classList.toggle("show"); }
function toggleAccordion(event, element) { event.stopPropagation(); element.parentElement.classList.toggle("active"); }
window.onclick = function(event) { if (!event.target.closest('.nav-dropdown')) document.querySelectorAll(".dropdown-content.show").forEach(el => el.classList.remove('show')); }
// mini menu toggle and outside click close
function toggleMiniMenu(event) {
    event.stopPropagation();
    const btn = document.getElementById('miniMenuBtn');
    const dd = document.getElementById('miniMenuDropdown');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    dd.classList.toggle('show');
    dd.setAttribute('aria-hidden', expanded ? 'true' : 'false');
}
// close mini menu on outside click
document.addEventListener('click', function(e) {
    const dd = document.getElementById('miniMenuDropdown');
    const btn = document.getElementById('miniMenuBtn');
    if (!dd || !btn) return;
    if (!e.target.closest('.mini-menu')) {
        dd.classList.remove('show'); btn.setAttribute('aria-expanded', 'false'); dd.setAttribute('aria-hidden', 'true');
    }
});
function toggleDark() {
    const willDark = !document.body.classList.contains('dark');
    if (willDark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    // update theme icon if present (some pages have a different id)
    const icon = document.getElementById("theme-icon") || document.getElementById("theme-icon-mini");
    if (icon && icon.classList) {
        const toRemove = document.body.classList.contains("dark") ? "fa-moon" : "fa-sun";
        const toAdd = document.body.classList.contains("dark") ? "fa-sun" : "fa-moon";
        icon.classList.replace(toRemove, toAdd);
    }
    closeMobileMenu();
    try { localStorage.setItem('siteDark', document.body.classList.contains('dark') ? '1' : '0'); } catch(e){}
}

// Persist theme selection and helper to apply saved theme on load
function applySavedTheme() {
    const saved = localStorage.getItem('siteDark');
    const shouldDark = saved === '1';
    if (shouldDark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    // sync icon(s)
    const icons = [document.getElementById('theme-icon'), document.getElementById('theme-icon-mini')];
    icons.forEach(icon => {
        if (!icon || !icon.classList) return;
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
        }
    });
}

// Simple language switcher stub (expand as needed)
function setLang(lang) {
    // lang: 'hi' | 'en' | 'sa'
    try {
        localStorage.setItem('siteLang', lang);
        applyTranslations(lang);
        console.log('Language set to', lang);
    } catch (e) { console.warn('Could not set language', e); }
}

// Comprehensive translations for all pages
const TRANSLATIONS = {
    en: {
        // Brand & basic nav
        brand: 'Sanskrit',
        home: 'Home',
        search_examples: 'Search Examples',
        builder: 'Builder',
        sutra: 'Grammar Rules',
        dark_mode: 'Dark Mode',
        
        // Builder page labels
        label_upa: 'Upasarga',
        label_dhatu: 'Dhatu (Root)',
        label_prat: 'Pratyaya',
        placeholder_upa: 'Select or type...',
        placeholder_dhatu: 'e.g. kṛ, paṭh, likh...',
        placeholder_prat: 'e.g. tavya, ktva...',
        no_upasarga: 'No Upasarga',
        select_dhatu: 'Select Dhatu...',
        select_pratyaya: 'Select Pratyaya...',
        
        // Buttons
        generate_word: 'Generate Word!',
        dummy1: 'Dummy Item 1',
        dummy2: 'Dummy Item 2',
        dummy3: 'Dummy Item 3',
        
        // Hero text
        hero_title: 'Word Formation Process! ✨',
        hero_subtitle: 'Pure derivation using Ashtadhyayi rules (1.1.1 - 1.1.75)!',
        
        // Scroll overlay (index page)
        scroll_title: '॥ तस्मै पाऽणिनये नमः ॥',
        scroll_line1: 'येनाक्षरसमान्याभिषङ्ग्य महेशरात् | कृत्स्नं व्याकरणं प्रोतं तस्मै पाणिनये नमः ||',
        scroll_line2: 'येन धौत गिरः पुंसां विमलेः शब्दवारिधि: । तमश्रज्ञानंज भिन्नं तस्मै पाणिनये नमः ॥',
        scroll_line3: 'अज्ञानन्धस्य लोकस्य ज्ञानान्शश्लाकया चदुःक्ष्मीलितेन येन तस्मै पाणिनये नमः ।',
        scroll_line4: 'वाक्यकारं वररुचं भाष्कारं पतञ्जलिम् । पाणिनि सूत्रकारं च प्रणतोऽस्मि मुनीन्यम् ॥',
        
        // Mini menu items
        mini_dummy1: 'Dummy Item 1',
        mini_dummy2: 'Dummy Item 2',
        mini_dummy3: 'Dummy Item 3',
        
        // Result section
        result_hint: 'How was this formed? (Tap to see process)',
        
        // Prakriya (steps)
        prakriya_title: 'Paninian Derivation Process:',
        
        // Search modal
        search_title: 'Search Examples',
        search_placeholder: 'Search by dhatu, pratyaya or rule no. (e.g. 1.1.1)',
        search_no_results: 'No results found.',
        search_loading: 'Database loading...',
        
        // Footer
        footer_title: 'Paninian Grammar Engine v2.0',
        footer_desc: 'This engine creates derived words based on Ashtadhyayi sutras.',
        footer_copyright: '© 2026 Created by Hotyoga',
        
        // Sutra dropdown
        sutra_samjna: 'Lakaras',
        sutra_pada1_2: '1.2 - Samjna Sutras',
        sutra_pada1_3: '1.3 - Miscellaneous',
        sutra_pada1_4: '1.4 - Git',
        sutra_pada2_1: '2.1 - Atmanepada',
        sutra_pada2_2: '2.2 - Parasmaipada',
        sutra_pada2_3: '2.3 - Ardhadhatuka',
        sutra_pada2_4: '2.4 - Sarvadhatuka',
        sutra_pada3_1: '3.1 - Krt',
        sutra_pada3_2: '3.2 - Krt',
        sutra_pada3_3: '3.3 - Krt',
        sutra_pada3_4: '3.4 - Krt',
        sutra_pada4_1: '4.1 - Krt',
        sutra_pada4_2: '4.2 - Krt',
        sutra_pada4_3: '4.3 - Krt',
        sutra_pada4_4: '4.4 - Krt',
        sutra_pada5_1: '5.1 - Krt',
        sutra_pada5_2: '5.2 - Krt',
        sutra_pada5_3: '5.3 - Krt',
        sutra_pada5_4: '5.4 - Krt',
        sutra_pada6_1: '6.1 - Krt',
        sutra_pada6_2: '6.2 - Krt',
        sutra_pada6_3: '6.3 - Krt',
        sutra_pada6_4: '6.4 - Krt',
        sutra_pada7_1: '7.1 - Krt',
        sutra_pada7_2: '7.2 - Krt',
        sutra_pada7_3: '7.3 - Krt',
        sutra_pada7_4: '7.4 - Krt',
        sutra_pada8_1: '8.1 - Krt',
        sutra_pada8_2: '8.2 - Krt',
        sutra_pada8_3: '8.3 - Krt',
        sutra_pada8_4: '8.4 - Krt',
        
        // Engine messages
        msg_select_dhatu_prat: 'Please enter at least one dhatu and pratyaya!',
        msg_database_missing: 'Data could not be loaded. Please check JSON files.',
        msg_custom_dhatu: '(Note: Custom dhatu, system working with general rules)',
        msg_it_agama: '(Note: Dhatu \'set\' is and pratyaya is valadi, \'it\' agama by 7.2.35)',
        
        // Generated word labels
        word_final: 'Final Form:',
        word_siddha: 'Siddha Rupa:'
    },
    hi: {
        // Brand & basic nav
        brand: 'संस्कृत',
        home: 'होम',
        search_examples: 'उदाहरण खोजें',
        builder: 'शब्द निर्माण',
        sutra: 'व्याकरण सूत्र',
        dark_mode: 'डार्क मोड',
        
        // Builder page labels
        label_upa: 'उपसर्ग',
        label_dhatu: 'धातु (मूल)',
        label_prat: 'प्रत्यय',
        placeholder_upa: 'चुनें या टाइप करें...',
        placeholder_dhatu: 'उदा. कृ, पठ्, लिख्...',
        placeholder_prat: 'उदा. तव्यत्, क्त्वा...',
        no_upasarga: 'कोई उपसर्ग नहीं',
        select_dhatu: 'धातु चुनें...',
        select_pratyaya: 'प्रत्यय चुनें...',
        
        // Buttons
        generate_word: 'शब्द बनाओ!',
        dummy1: 'डमी आइटम 1',
        dummy2: 'डमी आइटम 2',
        dummy3: 'डमी आइटम 3',
        
        // Hero text
        hero_title: 'शब्द निर्माण की प्रक्रिया! ✨',
        hero_subtitle: 'अष्टाध्यायी के नियमों (१.१.१ - १.१.७५) के साथ शुद्ध रूप सिद्धि!',
        
        // Scroll overlay (index page)
        scroll_title: '॥ तस्मै पाऽणिनये नमः ॥',
        scroll_line1: 'येनाक्षरसमान्याभिषङ्ग्य महेशरात् | कृत्स्नं व्याकरणं प्रोतं तस्मै पाणिनये नमः ||',
        scroll_line2: 'येन धौत गिरः पुंसां विमलेः शब्दवारिधि: । तमश्रज्ञानंज भिन्नं तस्मै पाणिनये नमः ॥',
        scroll_line3: 'अज्ञानन्धस्य लोकस्य ज्ञानान्शश्लाकया चदुःक्ष्मीलितेन येन तस्मै पाणिनये नमः ।',
        scroll_line4: 'वाक्यकारं वररुचं भाष्कारं पतञ्जलिम् । पाणिनि सूत्रकारं च प्रणतोऽस्मि मुनीन्यम् ॥',
        
        // Mini menu items
        mini_dummy1: 'डमी आइटम 1',
        mini_dummy2: 'डमी आइटम 2',
        mini_dummy3: 'डमी आइटम 3',
        
        // Result section
        result_hint: 'यह कैसे बना? (प्रक्रिया देखने के लिए टैप करें)',
        
        // Prakriya (steps)
        prakriya_title: 'पाणिनीय सिद्धि प्रक्रिया:',
        
        // Search modal
        search_title: 'उदाहरण खोजें',
        search_placeholder: 'धातु, प्रत्यय या सूत्र संख्या से खोजें (उदा: 1.1.1)',
        search_no_results: 'कोई परिणाम नहीं मिला।',
        search_loading: 'डेटाबेस लोड हो रहा है...',
        
        // Footer
        footer_title: 'पाणिनीय व्याकरण यन्त्र v2.0',
        footer_desc: 'यह यन्त्र अष्टाध्यायी के सूत्रों के आधार पर कृदन्त शब्दों की रचना करता है।',
        footer_copyright: '© 2026 Hotyoga द्वारा निर्मित',
        
        // Sutra dropdown
        sutra_samjna: 'संज्ञा सूत्र',
        sutra_pada1_2: '१.२ - संज्ञा सूत्र',
        sutra_pada1_3: '१.३ - विविध सूत्र',
        sutra_pada1_4: '१.४ - गित्',
        sutra_pada2_1: '२.१ - आत्मनेपद',
        sutra_pada2_2: '२.२ - परस्मैपद',
        sutra_pada2_3: '२.३ - अर्धधातुक',
        sutra_pada2_4: '२.४ - सर्वधातुक',
        sutra_pada3_1: '३.१ - कृत्',
        sutra_pada3_2: '३.२ - कृत्',
        sutra_pada3_3: '३.३ - कृत्',
        sutra_pada3_4: '३.४ - कृत्',
        sutra_pada4_1: '४.१ - कृत्',
        sutra_pada4_2: '४.२ - कृत्',
        sutra_pada4_3: '४.३ - कृत्',
        sutra_pada4_4: '४.४ - कृत्',
        sutra_pada5_1: '५.१ - कृत्',
        sutra_pada5_2: '५.२ - कृत्',
        sutra_pada5_3: '५.३ - कृत्',
        sutra_pada5_4: '५.४ - कृत्',
        sutra_pada6_1: '६.१ - कृत्',
        sutra_pada6_2: '६.२ - कृत्',
        sutra_pada6_3: '६.३ - कृत्',
        sutra_pada6_4: '६.४ - कृत्',
        sutra_pada7_1: '७.१ - कृत्',
        sutra_pada7_2: '७.२ - कृत्',
        sutra_pada7_3: '७.३ - कृत्',
        sutra_pada7_4: '७.४ - कृत्',
        sutra_pada8_1: '८.१ - कृत्',
        sutra_pada8_2: '८.२ - कृत्',
        sutra_pada8_3: '८.३ - कृत्',
        sutra_pada8_4: '८.४ - कृत्',
        
        // Engine messages
        msg_select_dhatu_prat: 'कृपया कम से कम एक धातु और प्रत्यय टाइप करें!',
        msg_database_missing: 'डेटा लोड नहीं हो सका। कृपया JSON फ़ाइलों की जाँच करें।',
        msg_custom_dhatu: '(नोट: धातु कस्टम है, सिस्टम सामान्य उपधा नियमों से काम कर रहा है)',
        msg_it_agama: '(इट्-आगम: धातु \'सेट्\' है और प्रत्यय वलादि है, \'आर्धधातुकस्येड् वलादेः\' से \'इ\' का आगम हुआ।)',
        
        // Generated word labels
        word_final: 'अंतिम रूप:',
        word_siddha: 'सिद्ध रूप:'
    },
    sa: {
        // Brand & basic nav
        brand: 'संस्कृत',
        home: 'गृहम्',
        search_examples: 'उदाहरणान्वेषणम्',
        builder: 'निर्माणकार्यम्',
        sutra: 'सूत्राणि',
        dark_mode: 'निशाकरः',
        
        // Builder page labels
        label_upa: 'उपसर्गः',
        label_dhatu: 'धातु (मूलम्)',
        label_prat: 'प्रत्ययः',
        placeholder_upa: 'विन्यस्य वा टाइप करें...',
        placeholder_dhatu: 'उदा. कृ, पठ्, लिख्...',
        placeholder_prat: 'उदा. तव्यत्, क्त्वा...',
        no_upasarga: 'नास्ति उपसर्गः',
        select_dhatu: 'धातुं विन्यस्य...',
        select_pratyaya: 'प्रत्ययं विन्यस्य...',
        
        // Buttons
        generate_word: 'पदम् निर्माय!',
        dummy1: 'नमूनार्थ 1',
        dummy2: 'नमूनार्थ 2',
        dummy3: 'नमूनार्थ 3',
        
        // Hero text
        hero_title: 'पदनिर्माणप्रक्रिया! ✨',
        hero_subtitle: 'अष्टाध्यायी-सूत्रैः (१.१.१ - १.१.७५) शुद्धरूपसिद्धिः!',
        
        // Scroll overlay (index page)
        scroll_title: '॥ तस्मै पाऽणिनये नमः ॥',
        scroll_line1: 'येनाक्षरसमान्याभिषङ्ग्य महेशरात् | कृत्स्नं व्याकरणं प्रोतं तस्मै पाणिनये नमः ||',
        scroll_line2: 'येन धौत गिरः पुंसां विमलेः शब्दवारिधि: । तमश्रज्ञानंज भिन्नं तस्मै पाणिनये नमः ॥',
        scroll_line3: 'अज्ञानन्धस्य लोकस्य ज्ञानान्शश्लाकया चदुःक्ष्मीलितेन येन तस्मै पाणिनये नमः ।',
        scroll_line4: 'वाक्यकारं वररुचं भाष्कारं पतञ्जलिम् । पाणिनि सूत्रकारं च प्रणतोऽस्मि मुनीन्यम् ॥',
        
        // Mini menu items
        mini_dummy1: 'नमूनार्थ 1',
        mini_dummy2: 'नमूनार्थ 2',
        mini_dummy3: 'नमूनार्थ 3',
        
        // Result section
        result_hint: 'कथं निर्मितम्? (प्रक्रियां द्रष्टुं टैप करें)',
        
        // Prakriya (steps)
        prakriya_title: 'पाणिनीय सिद्धिप्रक्रिया:',
        
        // Search modal
        search_title: 'उदाहरणान्वेषणम्',
        search_placeholder: 'धातु, प्रत्यय वा सूत्रसङ्ख्यायाः अन्वेषणम् (उदा: 1.1.1)',
        search_no_results: 'उत्तराणि न सन्ति।',
        search_loading: 'डेटाबेस लोड हो रहा है...',
        
        // Footer
        footer_title: 'पाणिनीय व्याकरणयन्त्रम् v2.0',
        footer_desc: 'अष्टाध्यायी-सूत्रैः कृतान्तात् कृदन्तपदानि निर्मिति भवति।',
        footer_copyright: '© 2026 Hotyoga द्वारा निर्मितम्',
        
        // Sutra dropdown
        sutra_samjna: 'संज्ञासूत्राणि',
        sutra_pada1_2: '१.२ - संज्ञासूत्राणि',
        sutra_pada1_3: '१.३ - विविधसूत्राणि',
        sutra_pada1_4: '१.४ - गित्',
        sutra_pada2_1: '२.१ - आत्मनेपदम्',
        sutra_pada2_2: '२.२ - परस्मैपदम्',
        sutra_pada2_3: '२.३ - अर्धधातुकम्',
        sutra_pada2_4: '२.४ - सर्वधातुकम्',
        sutra_pada3_1: '३.१ - कृत्',
        sutra_pada3_2: '३.२ - कृत्',
        sutra_pada3_3: '३.३ - कृत्',
        sutra_pada3_4: '३.४ - कृत्',
        sutra_pada4_1: '४.१ - कृत्',
        sutra_pada4_2: '४.२ - कृत्',
        sutra_pada4_3: '४.३ - कृत्',
        sutra_pada4_4: '४.४ - कृत्',
        sutra_pada5_1: '५.१ - कृत्',
        sutra_pada5_2: '५.२ - कृत्',
        sutra_pada5_3: '५.३ - कृत्',
        sutra_pada5_4: '५.४ - कृत्',
        sutra_pada6_1: '६.१ - कृत्',
        sutra_pada6_2: '६.२ - कृत्',
        sutra_pada6_3: '६.३ - कृत्',
        sutra_pada6_4: '६.४ - कृत्',
        sutra_pada7_1: '७.१ - कृत्',
        sutra_pada7_2: '७.२ - कृत्',
        sutra_pada7_3: '७.३ - कृत्',
        sutra_pada7_4: '७.४ - कृत्',
        sutra_pada8_1: '८.१ - कृत्',
        sutra_pada8_2: '८.२ - कृत्',
        sutra_pada8_3: '८.३ - कृत्',
        sutra_pada8_4: '८.४ - कृत्',
        
        // Engine messages
        msg_select_dhatu_prat: 'कृपया अल्पंतमम् एकं धातुं च प्रत्ययं वा लिख्यताम्!',
        msg_database_missing: 'विवरणानि लोड् न भवन्ति। कृपया JSON-सङ्ख्यानि पश्यतु।',
        msg_custom_dhatu: '(टिप्पणी: धातुः प्रत्ययः, सिस्टम सामान्य नियमैः कार्यं करोति)',
        msg_it_agama: '(इट्-आगमः: धातुः \'सेट्\' अस्ति च प्रत्ययः वलादि, \'आर्धधातुकस्येड् वलादेः\' से \'इ\' आगमः।)',
        
        // Generated word labels
        word_final: 'अन्तिमरूपम्:',
        word_siddha: 'सिद्धरूपम्:'
    }
};

function applyTranslations(lang) {
    const map = TRANSLATIONS[lang] || TRANSLATIONS['hi'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (map[key]) el.innerText = map[key];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
}

function applyTranslationsExtended(lang) {
    const map = TRANSLATIONS[lang] || TRANSLATIONS['hi'];
    const hiMap = TRANSLATIONS['hi'] || {};
    const reverse = {};
    Object.keys(hiMap).forEach(k => {
        const v = (hiMap[k] || '').toString().trim();
        if (v) reverse[v] = k;
    });
    function replaceTextNode(node) {
        const txt = node.nodeValue.trim();
        if (!txt) return;
        const key = reverse[txt];
        if (key && map[key]) node.nodeValue = node.nodeValue.replace(txt, map[key]);
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while ((n = walker.nextNode())) {
        const parent = n.parentElement;
        if (!parent) continue;
        const tag = parent.tagName.toLowerCase();
        if (['script','style','noscript'].includes(tag)) continue;
        if (parent.closest('.no-translate')) continue;
        replaceTextNode(n);
    }
    const attrList = ['placeholder','title','alt','value'];
    document.querySelectorAll('*').forEach(el => {
        if (el.closest && el.closest('.no-translate')) return;
        attrList.forEach(attr => {
            if (el.hasAttribute && el.hasAttribute(attr)) {
                const v = el.getAttribute(attr).toString().trim();
                const key = reverse[v];
                if (key && map[key]) el.setAttribute(attr, map[key]);
            }
        });
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (map[key]) el.setAttribute('placeholder', map[key]);
    });
}

function openSearchModal() { document.getElementById("searchModal").style.display = "block"; document.getElementById("searchInput").focus(); }
function closeSearchModal() { document.getElementById("searchModal").style.display = "none"; document.getElementById("searchInput").value = ""; document.getElementById("searchResults").innerHTML = ""; }
window.addEventListener('click', function(event) { if (event.target == document.getElementById("searchModal")) closeSearchModal(); });

// Load shared header/footer fragments and initialize language on page load
async function loadSharedHeaderFooter() {
    try {
        const [headerRes, footerRes] = await Promise.all([fetch('header.html'), fetch('footer.html')]);
        if (headerRes.ok) {
            const headerHtml = await headerRes.text();
            document.getElementById('site-header')?.insertAdjacentHTML('afterbegin', headerHtml);
        }
        if (footerRes.ok) {
            const footerHtml = await footerRes.text();
            document.getElementById('site-footer')?.insertAdjacentHTML('afterbegin', footerHtml);
        }
    } catch (e) { console.warn('Could not load shared header/footer', e); }
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadSharedHeaderFooter();
    // apply persisted theme first so fragments render with correct colors
    try { applySavedTheme(); } catch(e) {}
    const saved = localStorage.getItem('siteLang') || 'hi';
    applyTranslationsExtended(saved);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === saved));
});

function getSutraDetails(sutraId) {
    const allArrays = [
        'samjnaSutras', 'pada_1_2', 'pada_1_3', 'pada_1_4', 'pada_2_1', 'pada_2_2', 'pada_2_3', 'pada_2_4', 
        'pada_3_1', 'pada_3_2', 'pada_3_3', 'pada_3_4', 'pada_4_1', 'pada_4_2', 'pada_4_3', 'pada_4_4',
        'pada_5_1', 'pada_5_2', 'pada_5_3', 'pada_5_4', 'pada_6_1', 'pada_6_2', 'pada_6_3', 'pada_6_4',
        'pada_7_1', 'pada_7_2', 'pada_7_3', 'pada_7_4', 'pada_8_1', 'pada_8_2', 'pada_8_3', 'pada_8_4'
    ];
    for (let arrayName of allArrays) {
        if (sanskritDatabase[arrayName]) {
            let foundSutra = sanskritDatabase[arrayName].find(s => s.id === sutraId);
            if (foundSutra) return foundSutra;
        }
    }
    return { name: "अज्ञात सूत्र", desc: "विवरण उपलब्ध नहीं" };
}

function performSearch() {
    let query = document.getElementById("searchInput").value.trim();
    let resultsDiv = document.getElementById("searchResults");
    if (query.length === 0) { resultsDiv.innerHTML = ""; return; }
    if (!sanskritDatabase.examples) { resultsDiv.innerHTML = `<p style="color:red; text-align:center;">डेटाबेस लोड हो रहा है...</p>`; return; }

    let matchedExamples = sanskritDatabase.examples.filter(item => item.ex.includes(query) || item.sutra.includes(query));
    if (matchedExamples.length === 0) { resultsDiv.innerHTML = `<p style="color:red; text-align:center; margin-top:20px;">कोई परिणाम नहीं मिला।</p>`; return; }

    let htmlOutput = "";
    matchedExamples.forEach(match => {
        let sutraInfo = getSutraDetails(match.sutra);
        let regex = new RegExp(query, 'gi');
        let highlightedEx = match.ex.replace(regex, `<span style="background-color:yellow; color:black; border-radius:2px; padding:0 2px;">$&</span>`);
        htmlOutput += `<div class="result-card"><div class="ex-text sanskrit-text">${highlightedEx}</div><div class="su-text sanskrit-text"><b>सूत्र:</b> [${match.sutra}] ${sutraInfo.name}</div><div class="desc-text sanskrit-text">${sutraInfo.desc}</div></div>`;
    });
    resultsDiv.innerHTML = htmlOutput;
}
