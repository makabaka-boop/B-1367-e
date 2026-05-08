import { SELECTORS, MESSAGES, TIMING, ROUTES } from './config.js';
import { AuthManager } from './auth.js';

export function createBookingHandler(toaster) {
    return function handleBooking(e) {
        e.preventDefault();
        const btn = e.currentTarget;

        if (AuthManager.isLoggedIn()) {
            if (btn.disabled) return;

            toaster.show(MESSAGES.BOOKING_SUCCESS, 'success');

            const card = btn.closest(SELECTORS.CAR_CARD);
            if (!card.querySelector(SELECTORS.BOOKED_BADGE)) {
                const header = card.querySelector(SELECTORS.CAR_HEADER);
                const badge = document.createElement('span');
                badge.className = 'booked-badge';
                badge.textContent = MESSAGES.BOOKED_LABEL;
                header.appendChild(badge);
                btn.textContent = MESSAGES.BOOK_AGAIN;
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        } else {
            toaster.show(MESSAGES.LOGIN_TO_BOOK, 'error');
            setTimeout(() => {
                window.location.href = ROUTES.LOGIN;
            }, TIMING.BOOKING_REDIRECT_DELAY);
        }
    };
}

export function renderHeader(toaster) {
    const isLoggedIn = AuthManager.isLoggedIn();
    const loginBtn = document.querySelector(SELECTORS.LOGIN_BTN);
    const existingProfile = document.querySelector(SELECTORS.USER_PROFILE);

    if (isLoggedIn) {
        if (loginBtn) loginBtn.classList.add('hidden');

        if (!existingProfile) {
            const user = AuthManager.getUser();
            const profileHtml = `
                <div class="user-profile">
                    <span class="user-name">${MESSAGES.WELCOME_PREFIX}${user.name}</span>
                    <a href="#" class="logout-link">${MESSAGES.LOGOUT_LABEL}</a>
                </div>
            `;
            const nav = document.querySelector(SELECTORS.NAV);
            nav.insertAdjacentHTML('afterend', profileHtml);

            document.querySelector(SELECTORS.LOGOUT_LINK).addEventListener('click', (e) => {
                e.preventDefault();
                AuthManager.logout();
                toaster.show(MESSAGES.LOGOUT_SUCCESS, 'info');
                setTimeout(() => window.location.reload(), TIMING.LOGOUT_RELOAD_DELAY);
            });
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (existingProfile) existingProfile.remove();
    }
}
