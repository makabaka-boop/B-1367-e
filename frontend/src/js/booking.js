function handleRentButtonClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    
    if (AuthManager.isLoggedIn()) {
        if (btn.disabled) return;
        
        toastManager.show(CONFIG.MESSAGES.BOOKING_SUCCESS, 'success');
        
        const card = btn.closest(CONFIG.SELECTORS.CAR_CARD);
        if (!card.querySelector(CONFIG.SELECTORS.BOOKED_BADGE)) {
            const header = card.querySelector(CONFIG.SELECTORS.CAR_HEADER);
            const badge = document.createElement('span');
            badge.className = 'booked-badge';
            badge.textContent = '已预订';
            header.appendChild(badge);
            btn.textContent = '再次预订';
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
    } else {
        toastManager.show(CONFIG.MESSAGES.BOOKING_LOGIN_REQUIRED, 'error');
        setTimeout(() => {
            window.location.href = CONFIG.REDIRECTS.LOGIN_PAGE;
        }, CONFIG.REDIRECTS.LOGIN_DELAY);
    }
}

function initRentButtons() {
    document.querySelectorAll(CONFIG.SELECTORS.RENT_BTN).forEach(btn => {
        btn.addEventListener('click', handleRentButtonClick);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { handleRentButtonClick, initRentButtons };
}
