import { AUTH, MESSAGES } from './config.js';

export class AuthManager {
    static login(account, password) {
        if (
            account === AUTH.TEST_CREDENTIALS.account &&
            password === AUTH.TEST_CREDENTIALS.password
        ) {
            localStorage.setItem(AUTH.LOGIN_KEY, JSON.stringify(AUTH.DEFAULT_USER));
            return { success: true };
        }
        return { success: false, message: MESSAGES.LOGIN_FAIL };
    }

    static logout() {
        localStorage.removeItem(AUTH.LOGIN_KEY);
    }

    static isLoggedIn() {
        return !!localStorage.getItem(AUTH.LOGIN_KEY);
    }

    static getUser() {
        return JSON.parse(localStorage.getItem(AUTH.LOGIN_KEY));
    }
}
