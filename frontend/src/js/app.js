import { SELECTORS, MESSAGES } from './config.js';
import { ToastManager } from './toast.js';
import { AuthManager } from './auth.js';
import { createSearchHandler } from './search.js';
import { createBookingHandler, renderHeader } from './booking.js';

export class App {
    constructor() {
        this.toaster = new ToastManager();
    }

    init() {
        renderHeader(this.toaster);
        this.bindEvents();
    }

    bindEvents() {
        this.bindPendingFeatures();
        this.bindNavLinks();
        this.bindRegisterLink();
        this.bindRentButtons();
        this.bindSearch();
        this.bindLoginForm();
    }

    bindPendingFeatures() {
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest(SELECTORS.PENDING_FEATURE);
            if (target) {
                e.preventDefault();
                if (AuthManager.isLoggedIn()) {
                    this.toaster.show(MESSAGES.PENDING_ADMIN, 'info');
                } else {
                    this.toaster.show(MESSAGES.PENDING_GUEST, 'info');
                }
            }
        });
    }

    bindNavLinks() {
        document.querySelectorAll(SELECTORS.NAV_LINK).forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.toaster.show(MESSAGES.PENDING_GUEST, 'info');
            });
        });
    }

    bindRegisterLink() {
        const registerLink = document.querySelector(SELECTORS.REGISTER_LINK);
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toaster.show(MESSAGES.PENDING_GUEST, 'info');
            });
        }
    }

    bindRentButtons() {
        const handler = createBookingHandler(this.toaster);
        document.querySelectorAll(SELECTORS.RENT_BTN).forEach((btn) => {
            btn.addEventListener('click', handler);
        });
    }

    bindSearch() {
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', createSearchHandler(this.toaster));
        }
    }

    bindLoginForm() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            this.toaster.show(MESSAGES.LOGIN_REQUIRED, 'error');
            return;
        }

        const result = AuthManager.login(email, password);

        if (result.success) {
            this.toaster.show(MESSAGES.LOGIN_SUCCESS, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            this.toaster.show(result.message, 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.app.init();
});
