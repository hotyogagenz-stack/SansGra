// ==================================================
// ENHANCED SUGGESTION SYSTEM FOR HINGLISH AUTOCOMPLETE
// ==================================================

/**
 * Calculate Levenshtein distance for fuzzy matching
 */
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

/**
 * Find the best fuzzy match position and score
 */
function fuzzyMatchScore(text, query) {
    if (!text || !query) return { score: 0, index: -1, matched: false };
    
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Exact match gets highest score
    if (textLower.includes(queryLower)) {
        return { 
            score: 100, 
            index: textLower.indexOf(queryLower),
            matched: true 
        };
    }
    
    // Try phonetic variations
    const phoneticVariants = generatePhoneticVariants(queryLower);
    for (const variant of phoneticVariants) {
        if (textLower.includes(variant)) {
            return { 
                score: 90, 
                index: textLower.indexOf(variant),
                matched: true 
            };
        }
    }
    
    // Fuzzy match using Levenshtein distance
    const words = textLower.split(/\s+/);
    let bestScore = 0;
    let bestIndex = -1;
    
    for (const word of words) {
        if (word.length < 2) continue;
        
        const distance = levenshteinDistance(word, queryLower);
        const maxLen = Math.max(word.length, queryLower.length);
        const similarity = 1 - (distance / maxLen);
        const score = similarity * 80; // Max 80 for fuzzy matches
        
        if (score > bestScore && similarity > 0.6) {
            bestScore = score;
            bestIndex = textLower.indexOf(word);
        }
    }
    
    return { 
        score: bestScore, 
        index: bestIndex,
        matched: bestScore > 0 
    };
}

/**
 * Generate phonetic variants for Hinglish typing variations
 */
function generatePhoneticVariants(query) {
    const variants = [query];
    
    // Common Hinglish spelling variations
    const replacements = [
        ['sh', 's'], ['sh', 'shh'], ['ch', 'c'], ['ch', 'chh'],
        ['th', 't'], ['th', 'd'], ['dh', 'd'], ['dh', 'dh'],
        ['ph', 'f'], ['ph', 'p'], ['gh', 'g'], ['gh', 'gh'],
        ['kh', 'k'], ['kh', 'kh'], ['bh', 'b'], ['bh', 'bh'],
        ['j', 'z'], ['j', 'jh'], ['v', 'w'], ['v', 'b'],
        ['r', 'ri'], ['r', 'ree'], ['l', 'le'], ['l', 'li'],
        ['y', 'yi'], ['y', 'ye'], ['t', 'th'], ['d', 'dh'],
        ['n', 'n\''], ['n', 'n.'], ['m', 'm\''], ['m', 'm.'],
        // Long vowel variations
        ['aa', 'a'], ['aa', 'ah'], ['ii', 'i'], ['ii', 'ee'],
        ['uu', 'u'], ['uu', 'oo'], ['ai', 'ei'], ['ai', 'ay'],
        ['au', 'ou'], ['au', 'ow'], ['ri', 'ree'], ['ri', 'rhi'],
        ['e', 'eh'], ['e', 'ay'], ['o', 'oh'], ['o', 'oa']
    ];
    
    for (const [orig, repl] of replacements) {
        if (query.includes(orig)) {
            variants.push(query.replace(orig, repl));
        }
        if (query.includes(repl) && orig !== repl) {
            variants.push(query.replace(repl, orig));
        }
    }
    
    // Add common Hinglish endings
    if (query.length > 2) {
        variants.push(query + 'a');
        variants.push(query + 'e');
        variants.push(query + 'i');
        variants.push(query + 'ee');
        variants.push(query + 'u');
        variants.push(query + 'oo');
    }
    
    return [...new Set(variants)].filter(v => v.length > 0);
}

/**
 * Highlight matched text in Devanagari
 */
function highlightMatch(text, query, matchIndex) {
    if (!text || !query || matchIndex < 0) return text;
    
    const queryLower = query.toLowerCase();
    const phoneticVariants = generatePhoneticVariants(queryLower);
    
    // Find the actual matched substring
    let matchLength = query.length;
    let actualIndex = matchIndex;
    
    // Check for phonetic variant matches
    for (const variant of phoneticVariants) {
        const idx = text.toLowerCase().indexOf(variant);
        if (idx >= 0) {
            actualIndex = idx;
            matchLength = variant.length;
            break;
        }
    }
    
    // Create highlighted version
    const before = text.substring(0, actualIndex);
    const matched = text.substring(actualIndex, actualIndex + matchLength);
    const after = text.substring(actualIndex + matchLength);
    
    return `${before}<span class="match-highlight">${matched}</span>${after}`;
}

/**
 * Enhanced suggestion rendering with Devanagari and meanings
 */
function renderEnhancedSuggestions(suggestions, dropdown, dropdownId, query) {
    if (!suggestions || suggestions.length === 0) {
        dropdown.innerHTML = '<div class="no-suggestions">कोई परिणाम नहीं मिला</div>';
        dropdown.classList.add('show');
        return;
    }
    
    let html = '';
    
    suggestions.forEach((item, index) => {
        let devanagari = '';
        let hinglish = '';
        let meaning = '';
        let type = '';
        let score = 0;
        
        if (item.key && item.label) {
            // Dhatu format
            devanagari = item.key;
            hinglish = item.key;
            meaning = item.label;
            type = 'धातु';
            
            // Calculate match score
            const matchResult = fuzzyMatchScore(item.key + ' ' + item.label, query);
            score = matchResult.score;
            
            // Highlight matches
            if (matchResult.matched && matchResult.index >= 0) {
                devanagari = highlightMatch(item.key, query, matchResult.index);
            }
        } else if (item.id) {
            // Upasarga format
            devanagari = item.id;
            hinglish = item.id;
            meaning = item.label || '';
            type = 'उपसर्ग';
            
            const matchResult = fuzzyMatchScore(item.id + ' ' + (item.label || ''), query);
            score = matchResult.score;
            
            if (matchResult.matched && matchResult.index >= 0) {
                devanagari = highlightMatch(item.id, query, matchResult.index);
            }
        } else if (item.key) {
            // Pratyaya format
            devanagari = item.key;
            hinglish = item.key;
            meaning = `${item.real || ''} ${item.type || ''} ${item.lopa || ''}`.trim();
            type = 'प्रत्यय';
            
            const matchResult = fuzzyMatchScore(item.key + ' ' + meaning, query);
            score = matchResult.score;
            
            if (matchResult.matched && matchResult.index >= 0) {
                devanagari = highlightMatch(item.key, query, matchResult.index);
            }
        }
        
        // Sort by score (higher is better)
        html += `
            <div class="suggestion-item" 
                 data-value="${devanagari.replace(/</g, '<').replace(/>/g, '>')}" 
                 data-index="${index}" 
                 data-score="${score}"
                 onclick="selectSuggestion('${dropdownId}', '${devanagari.replace(/'/g, "\\'")}')">
                <div class="suggestion-main">
                    <div class="suggestion-devanagari">${devanagari}</div>
                    <div class="suggestion-details">
                        <div class="suggestion-hinglish">
                            ${type ? `<span class="suggestion-meta">${type}</span>` : ''}
                        </div>
                        <div class="suggestion-meaning">${meaning}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Add keyboard navigation hint
    html += `
        <div class="suggestion-kbd-hint">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>Enter</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
        </div>
    `;
    
    dropdown.innerHTML = html;
    dropdown.classList.add('show');
    
    // Re-sort items by score (for visual consistency)
    sortSuggestionsByScore(dropdown);
}

/**
 * Sort suggestion items by their score
 */
function sortSuggestionsByScore(dropdown) {
    const items = Array.from(dropdown.querySelectorAll('.suggestion-item'));
    if (items.length <= 1) return;
    
    items.sort((a, b) => {
        const scoreA = parseFloat(a.dataset.score) || 0;
        const scoreB = parseFloat(b.dataset.score) || 0;
        return scoreB - scoreA; // Descending order
    });
    
    // Re-append sorted items (before the keyboard hint)
    const kbdHint = dropdown.querySelector('.suggestion-kbd-hint');
    items.forEach(item => dropdown.insertBefore(item, kbdHint));
}

/**
 * Enhanced getSuggestions with fuzzy matching
 */
function getEnhancedSuggestions(query, type) {
    const lowerQuery = query.toLowerCase().trim();
    const maxResults = 10;
    let results = [];
    
    if (!lowerQuery) return results;
    
    if (type === 'upasarga') {
        const upasargas = sanskritDatabase.upasargas || [];
        results = upasargas.filter(u => {
            if (!u || !u.id) return false;
            const combined = `${u.id} ${u.label || ''}`;
            const match = fuzzyMatchScore(combined, lowerQuery);
            return match.matched;
        }).map(u => ({ ...u, _matchScore: fuzzyMatchScore(`${u.id} ${u.label || ''}`, lowerQuery).score }));
    } 
    else if (type === 'dhatu') {
        const dhatus = sanskritDatabase.dhatus || {};
        results = Object.entries(dhatus)
            .filter(([key, d]) => {
                if (!d) return false;
                const combined = `${key} ${d.label || ''} ${d.clean || ''}`;
                const match = fuzzyMatchScore(combined, lowerQuery);
                return match.matched;
            })
            .map(([key, d]) => ({ 
                ...d, 
                key, 
                label: d.label,
                _matchScore: fuzzyMatchScore(`${key} ${d.label || ''}`, lowerQuery).score
            }));
    }
    else if (type === 'pratyaya') {
        const pratyayas = pratyayaDB || {};
        results = Object.entries(pratyayas)
            .filter(([key, p]) => {
                if (!p) return false;
                const combined = `${key} ${p.real || ''} ${p.type || ''}`;
                const match = fuzzyMatchScore(combined, lowerQuery);
                return match.matched;
            })
            .map(([key, p]) => ({ 
                ...p, 
                key,
                _matchScore: fuzzyMatchScore(`${key} ${p.real || ''}`, lowerQuery).score
            }));
    }
    
    // Sort by match score and limit results
    results.sort((a, b) => (b._matchScore || 0) - (a._matchScore || 0));
    return results.slice(0, maxResults);
}

// Override the original functions with enhanced versions
const originalGetSuggestions = window.getSuggestions;
const originalRenderSuggestions = window.renderSuggestions;

window.getSuggestions = function(query, type) {
    return getEnhancedSuggestions(query, type);
};

window.renderSuggestions = function(suggestions, dropdown, dropdownId) {
    const query = document.getElementById(dropdownId.replace('Suggestions', '').replace('upa', 'upasarga').replace('dhatu', 'dhatu').replace('prat', 'pratyaya'))?.value || '';
    renderEnhancedSuggestions(suggestions, dropdown, dropdownId, query);
};

console.log('Enhanced suggestion system loaded!');