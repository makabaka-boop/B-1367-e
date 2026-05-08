import { SELECTORS, CAR_TYPE_MAP, MESSAGES } from './config.js';

export function filterCards(typeValue, locValue) {
    const cards = document.querySelectorAll(SELECTORS.CAR_CARD);
    let hasResults = false;

    cards.forEach((card) => {
        const carName = card.querySelector(SELECTORS.CAR_NAME).textContent.toLowerCase();
        const fullText = card.textContent.toLowerCase();

        let typeMatch = true;
        if (typeValue) {
            const keyword = CAR_TYPE_MAP[typeValue] || typeValue;
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

    return hasResults;
}

export function updateNoResultsMessage(hasResults) {
    let noResultMsg = document.querySelector(SELECTORS.NO_RESULTS);
    if (!noResultMsg) {
        const grid = document.querySelector(SELECTORS.CAR_GRID);
        noResultMsg = document.createElement('div');
        noResultMsg.className = 'no-results';
        noResultMsg.textContent = MESSAGES.NO_RESULTS_TEXT;
        grid.appendChild(noResultMsg);
    }

    if (hasResults) {
        noResultMsg.classList.remove('show');
    } else {
        noResultMsg.classList.add('show');
    }

    return noResultMsg;
}

export function createSearchHandler(toaster) {
    return function handleSearch() {
        const typeSelect = document.getElementById('type');
        const locationInput = document.getElementById('location');

        const typeValue = typeSelect ? typeSelect.value.toLowerCase() : '';
        const locValue = locationInput ? locationInput.value.toLowerCase().trim() : '';

        const hasResults = filterCards(typeValue, locValue);
        updateNoResultsMessage(hasResults);

        if (hasResults) {
            toaster.show(MESSAGES.SEARCH_FOUND, 'success');
        } else {
            toaster.show(MESSAGES.SEARCH_NOT_FOUND, 'info');
        }
    };
}
