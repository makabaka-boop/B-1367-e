const CONFIG = {
    AUTH: {
        LOGIN_KEY: 'user_logged_in',
        DEFAULT_USER: {
            name: 'Admin User',
            avatar: 'assets/images/user.png',
            role: 'admin'
        },
        TEST_CREDENTIALS: {
            account: 'admin',
            password: 'admin123'
        },
        LOGIN_ERROR_MESSAGE: '账号或密码错误 (提示: admin/admin123)',
        LOGIN_SUCCESS_MESSAGE: '登录成功！正在跳转...',
        LOGOUT_MESSAGE: '已安全退出'
    },
    
    SELECTORS: {
        TOAST_CONTAINER: '.toast-container',
        LOGIN_BTN: '.login-btn',
        USER_PROFILE: '.user-profile',
        NAV: '.nav',
        NAV_LINK: '.nav-link',
        REGISTER_LINK: '.register',
        PENDING_FEATURE: '.pending-feature',
        RENT_BTN: '.rent-btn',
        SEARCH_BTN: '#search-btn',
        LOGIN_FORM: '#login-form',
        TYPE_SELECT: '#type',
        LOCATION_INPUT: '#location',
        CAR_CARD: '.car-card',
        CAR_NAME: '.car-name',
        CAR_HEADER: '.car-header',
        CAR_GRID: '.car-grid',
        NO_RESULTS: '.no-results',
        EMAIL_INPUT: '#email',
        PASSWORD_INPUT: '#password',
        LOGOUT_LINK: '.logout-link',
        BOOKED_BADGE: '.booked-badge',
        EMAIL_FIELD: '#email',
        PASSWORD_FIELD: '#password'
    },
    
    MESSAGES: {
        PENDING_FEATURE_LOGGED_IN: '尊敬的管理员，该模块即将上线',
        PENDING_FEATURE_LOGGED_OUT: '该功能正在开发中，敬请期待！',
        BOOKING_SUCCESS: '预订成功！客服稍后联系您',
        BOOKING_LOGIN_REQUIRED: '请先登录后进行预订',
        SEARCH_SUCCESS: '找到匹配车辆',
        SEARCH_NO_RESULTS: '未找到匹配车辆',
        SEARCH_NO_RESULTS_MESSAGE: '抱歉，未找到匹配车型',
        LOGIN_FORM_EMPTY: '请填写所有必填项'
    },
    
    CAR_TYPE_MAP: {
        'sedan': '轿车',
        'suv': 'suv',
        'luxury': '跑车'
    },
    
    TOAST: {
        DURATION: 2000,
        ICONS: {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        }
    },
    
    REDIRECTS: {
        LOGIN_PAGE: 'login.html',
        HOME_PAGE: 'index.html',
        LOGIN_DELAY: 1500,
        LOGOUT_DELAY: 1000,
        LOGIN_SUCCESS_DELAY: 1000
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
