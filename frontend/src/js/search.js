function handleSearch() {
    const typeSelect = document.querySelector(CONFIG.SELECTORS.TYPE_SELECT);
    const locationInput = document.querySelector(CONFIG.SELECTORS.LOCATION_INPUT);
    
    const typeValue = typeSelect ? typeSelect.value.toLowerCase() : '';
    const locValue = locationInput ? locationInput.value.toLowerCase().trim() : '';
    
    const cards = document.querySelectorAll(CONFIG.SELECTORS.CAR_CARD);
    let hasResults = false;

    cards.forEach(card => {
        const carName = card.querySelector(CONFIG.SELECTORS.CAR_NAME).textContent.toLowerCase();
        const fullText = card.textContent.toLowerCase();
        
        let typeMatch = true;
        if (typeValue) {
            const keyword = CONFIG.CAR_TYPE_MAP[typeValue] || typeValue;
            if (!fullText.includes(keyword)) typeMatch = false;
        }

        let locMatch = true;
        if (locValue) {
            const safeName = carName || '';
            if (!safeName.includes(locValue)) locMatch = false;
        }

        if (typeMatch && locMatch) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    let noResultMsg = document.querySelector(CONFIG.SELECTORS.NO_RESULTS);
    if (!noResultMsg) {
        const grid = document.querySelector(CONFIG.SELECTORS.CAR_GRID);
        noResultMsg = document.createElement('div');
        noResultMsg.className = 'no-results';
        noResultMsg.textContent = CONFIG.MESSAGES.SEARCH_NO_RESULTS_MESSAGE;
        grid.appendChild(noResultMsg);
    }
    
    if (hasResults) {
        noResultMsg.classList.remove('show');
        toastManager.show(CONFIG.MESSAGES.SEARCH_SUCCESS, 'success');
    } else {
        noResultMsg.classList.add('show');
        toastManager.show(CONFIG.MESSAGES.SEARCH_NO_RESULTS, 'info');
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = handleSearch;
}
