export const SELECTORS = {
    TOAST_CONTAINER: '.toast-container',
    LOGIN_BTN: '.login-btn',
    USER_PROFILE: '.user-profile',
    LOGOUT_LINK: '.logout-link',
    NAV: '.nav',
    NAV_LINK: '.nav-link',
    PENDING_FEATURE: '.pending-feature',
    REGISTER_LINK: '.register',
    RENT_BTN: '.rent-btn',
    SEARCH_BTN: '#search-btn',
    LOGIN_FORM: '#login-form',
    EMAIL_INPUT: '#email',
    PASSWORD_INPUT: '#password',
    TYPE_SELECT: '#type',
    LOCATION_INPUT: '#location',
    CAR_CARD: '.car-card',
    CAR_NAME: '.car-name',
    CAR_HEADER: '.car-header',
    CAR_GRID: '.car-grid',
    NO_RESULTS: '.no-results',
    BOOKED_BADGE: '.booked-badge',
};

export const AUTH = {
    LOGIN_KEY: 'user_logged_in',
    DEFAULT_USER: { name: 'Admin User', avatar: 'assets/images/user.png', role: 'admin' },
    TEST_CREDENTIALS: { account: 'admin', password: 'admin123' },
};

export const CAR_TYPE_MAP = {
    sedan: '轿车',
    suv: 'suv',
    luxury: '跑车',
};

export const MESSAGES = {
    LOGIN_SUCCESS: '登录成功！正在跳转...',
    LOGIN_FAIL: '账号或密码错误 (提示: admin/admin123)',
    LOGIN_REQUIRED: '请填写所有必填项',
    LOGOUT_SUCCESS: '已安全退出',
    BOOKING_SUCCESS: '预订成功！客服稍后联系您',
    LOGIN_TO_BOOK: '请先登录后进行预订',
    SEARCH_FOUND: '找到匹配车辆',
    SEARCH_NOT_FOUND: '未找到匹配车辆',
    NO_RESULTS_TEXT: '抱歉，未找到匹配车型',
    PENDING_ADMIN: '尊敬的管理员，该模块即将上线',
    PENDING_GUEST: '该功能正在开发中，敬请期待！',
    BOOKED_LABEL: '已预订',
    BOOK_AGAIN: '再次预订',
    WELCOME_PREFIX: '欢迎, ',
    LOGOUT_LABEL: '退出登录',
};

export const TOAST_ICONS = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
};

export const TIMING = {
    TOAST_DURATION: 2000,
    LOGIN_REDIRECT_DELAY: 1000,
    BOOKING_REDIRECT_DELAY: 1500,
    LOGOUT_RELOAD_DELAY: 1000,
};

export const ROUTES = {
    HOME: 'index.html',
    LOGIN: 'login.html',
};
