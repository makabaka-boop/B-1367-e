function updateHeader() {
    const isLoggedIn = AuthManager.isLoggedIn();
    const loginBtn = document.querySelector(CONFIG.SELECTORS.LOGIN_BTN);
    const existingProfile = document.querySelector(CONFIG.SELECTORS.USER_PROFILE);

    if (isLoggedIn) {
        if (loginBtn) loginBtn.classList.add('hidden');
        
        if (!existingProfile) {
            const user = AuthManager.getUser();
            const profileHtml = `
                <div class="user-profile">
                    <span class="user-name">欢迎, ${user.name}</span>
                    <a href="#" class="logout-link">退出登录</a>
                </div>
            `;
            const nav = document.querySelector(CONFIG.SELECTORS.NAV);
            nav.insertAdjacentHTML('afterend', profileHtml);
            
            document.querySelector(CONFIG.SELECTORS.LOGOUT_LINK).addEventListener('click', (e) => {
                e.preventDefault();
                AuthManager.logout();
                toastManager.show(CONFIG.AUTH.LOGOUT_MESSAGE, 'info');
                setTimeout(() => window.location.reload(), CONFIG.REDIRECTS.LOGOUT_DELAY);
            });
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (existingProfile) existingProfile.remove();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.querySelector(CONFIG.SELECTORS.EMAIL_FIELD).value.trim();
    const password = document.querySelector(CONFIG.SELECTORS.PASSWORD_FIELD).value.trim();
    
    if (!email || !password) {
        toastManager.show(CONFIG.MESSAGES.LOGIN_FORM_EMPTY, 'error');
        return;
    }

    const result = AuthManager.login(email, password);
    
    if (result.success) {
        toastManager.show(CONFIG.AUTH.LOGIN_SUCCESS_MESSAGE, 'success');
        setTimeout(() => {
            window.location.href = CONFIG.REDIRECTS.HOME_PAGE;
        }, CONFIG.REDIRECTS.LOGIN_SUCCESS_DELAY);
    } else {
        toastManager.show(result.message, 'error');
    }
}

function initPendingFeatureHandler() {
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest(CONFIG.SELECTORS.PENDING_FEATURE);
        if (target) {
            e.preventDefault();
            if (AuthManager.isLoggedIn()) {
                toastManager.show(CONFIG.MESSAGES.PENDING_FEATURE_LOGGED_IN, 'info');
            } else {
                toastManager.show(CONFIG.MESSAGES.PENDING_FEATURE_LOGGED_OUT, 'info');
            }
        }
    });

    document.querySelectorAll(CONFIG.SELECTORS.NAV_LINK).forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toastManager.show(CONFIG.MESSAGES.PENDING_FEATURE_LOGGED_OUT, 'info');
        });
    });

    document.querySelector(CONFIG.SELECTORS.REGISTER_LINK)?.addEventListener('click', (e) => {
        e.preventDefault();
        toastManager.show(CONFIG.MESSAGES.PENDING_FEATURE_LOGGED_OUT, 'info');
    });
}

function initSearch() {
    const searchBtn = document.querySelector(CONFIG.SELECTORS.SEARCH_BTN);
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
}

function initLoginForm() {
    const loginForm = document.querySelector(CONFIG.SELECTORS.LOGIN_FORM);
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function init() {
    updateHeader();
    initPendingFeatureHandler();
    initRentButtons();
    initSearch();
    initLoginForm();
}

document.addEventListener('DOMContentLoaded', init);
