/**
 * Toast Notification System
 * Updated with glassmorphism support in CSS
 */
class ToastManager {
    constructor() {
        // Reuse existing container if present
        let existingContainer = document.querySelector('.toast-container');
        if (!existingContainer) {
            existingContainer = document.createElement('div');
            existingContainer.className = 'toast-container';
            document.body.appendChild(existingContainer);
        }
        this.container = existingContainer;
    }

    show(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Add icon based on type (simple unicode fallback)
        const iconMap = {
            'success': '✓',
            'error': '✕',
            'info': 'ℹ'
        };
        const icon = iconMap[type] || '';
        
        toast.innerHTML = `<span style="margin-right:10px;font-size:16px;">${icon}</span>${message}`;
        
        this.container.appendChild(toast);
        
        // Force reflow
        void toast.offsetWidth;

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 2000);
    }
}

/**
 * Auth Manager (LocalStorage)
 */
class AuthManager {
    static LOGIN_KEY = 'user_logged_in';
    static DEFAULT_USER = { name: 'Admin User', avatar: 'assets/images/user.png', role: 'admin' };
    
    // Test Credentials
    static TEST_CREDENTIALS = {
        account: 'admin',
        password: 'admin123'
    };

    static login(account, password) {
        if (account === this.TEST_CREDENTIALS.account && 
            password === this.TEST_CREDENTIALS.password) {
            localStorage.setItem(this.LOGIN_KEY, JSON.stringify(this.DEFAULT_USER));
            return { success: true };
        }
        return { success: false, message: '账号或密码错误 (提示: admin/admin123)' };
    }

    static logout() {
        localStorage.removeItem(this.LOGIN_KEY);
    }

    static isLoggedIn() {
        return !!localStorage.getItem(this.LOGIN_KEY);
    }

    static getUser() {
        return JSON.parse(localStorage.getItem(this.LOGIN_KEY));
    }
}

/**
 * UI Manager
 */
class UIManager {
    constructor() {
        this.toaster = new ToastManager();
    }

    init() {
        this.updateHeader();
        this.bindEvents();
    }

    updateHeader() {
        const isLoggedIn = AuthManager.isLoggedIn();
        const loginBtn = document.querySelector('.login-btn');
        const existingProfile = document.querySelector('.user-profile');

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
                const nav = document.querySelector('.nav');
                nav.insertAdjacentHTML('afterend', profileHtml);
                
                // Bind logout
                document.querySelector('.logout-link').addEventListener('click', (e) => {
                    e.preventDefault();
                    AuthManager.logout();
                    this.toaster.show('已安全退出', 'info');
                    setTimeout(() => window.location.reload(), 1000);
                });
            }
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (existingProfile) existingProfile.remove();
        }
    }

    bindEvents() {
        // 1. Global "Pending Feature" Interception (Event Delegation)
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('.pending-feature');
            if (target) {
                e.preventDefault();
                if (AuthManager.isLoggedIn()) {
                    this.toaster.show('尊敬的管理员，该模块即将上线', 'info');
                } else {
                    this.toaster.show('该功能正在开发中，敬请期待！', 'info');
                }
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.toaster.show('该功能正在开发中，敬请期待！', 'info');
            });
        });

        document.querySelector('.register')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toaster.show('该功能正在开发中，敬请期待！', 'info');
        })

        // 2. Rent Buttons
        document.querySelectorAll('.rent-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (AuthManager.isLoggedIn()) {
                    // Check if already booked
                    if (btn.disabled) return;
                    
                    this.toaster.show('预订成功！客服稍后联系您', 'success');
                    // Add visual "Booked" state
                    const card = btn.closest('.car-card');
                    if (!card.querySelector('.booked-badge')) {
                        const header = card.querySelector('.car-header');
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
                    this.toaster.show('请先登录后进行预订', 'error');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            });
        });

        // 3. Search Features
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        // 4. Login Form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    handleSearch() {
        const typeSelect = document.getElementById('type');
        const locationInput = document.getElementById('location');
        
        const typeValue = typeSelect ? typeSelect.value.toLowerCase() : '';
        const locValue = locationInput ? locationInput.value.toLowerCase().trim() : '';
        
        const cards = document.querySelectorAll('.car-card');
        let hasResults = false;

        cards.forEach(card => {
            const carName = card.querySelector('.car-name').textContent.toLowerCase();
            const fullText = card.textContent.toLowerCase();
            
            let typeMatch = true;
            if (typeValue) {
                const map = { 'sedan': '轿车', 'suv': 'suv', 'luxury': '跑车' };
                const keyword = map[typeValue] || typeValue;
                if (!fullText.includes(keyword)) typeMatch = false;
            }

            let locMatch = true;
            if (locValue) {
                // Ensure case-insensitive fuzzy match
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

        // Handle No Results
        let noResultMsg = document.querySelector('.no-results');
        if (!noResultMsg) {
             const grid = document.querySelector('.car-grid');
             noResultMsg = document.createElement('div');
             noResultMsg.className = 'no-results';
             noResultMsg.textContent = '抱歉，未找到匹配车型';
             grid.appendChild(noResultMsg);
        }
        
        if (hasResults) {
            noResultMsg.classList.remove('show');
            this.toaster.show(`找到匹配车辆`, 'success');
        } else {
            noResultMsg.classList.add('show');
            this.toaster.show('未找到匹配车辆', 'info');
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!email || !password) {
            this.toaster.show('请填写所有必填项', 'error');
            return;
        }

        const result = AuthManager.login(email, password);
        
        if (result.success) {
            this.toaster.show('登录成功！正在跳转...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            this.toaster.show(result.message, 'error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.app = new UIManager();
    window.app.init();
});
