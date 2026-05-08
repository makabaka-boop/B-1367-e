class AuthManager {
    static login(account, password) {
        if (account === CONFIG.AUTH.TEST_CREDENTIALS.account && 
            password === CONFIG.AUTH.TEST_CREDENTIALS.password) {
            localStorage.setItem(CONFIG.AUTH.LOGIN_KEY, JSON.stringify(CONFIG.AUTH.DEFAULT_USER));
            return { success: true };
        }
        return { success: false, message: CONFIG.AUTH.LOGIN_ERROR_MESSAGE };
    }

    static logout() {
        localStorage.removeItem(CONFIG.AUTH.LOGIN_KEY);
    }

    static isLoggedIn() {
        return !!localStorage.getItem(CONFIG.AUTH.LOGIN_KEY);
    }

    static getUser() {
        return JSON.parse(localStorage.getItem(CONFIG.AUTH.LOGIN_KEY));
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
