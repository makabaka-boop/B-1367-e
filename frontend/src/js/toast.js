class ToastManager {
    constructor() {
        let existingContainer = document.querySelector(CONFIG.SELECTORS.TOAST_CONTAINER);
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
        
        const icon = CONFIG.TOAST.ICONS[type] || '';
        toast.innerHTML = `<span style="margin-right:10px;font-size:16px;">${icon}</span>${message}`;
        
        this.container.appendChild(toast);
        
        void toast.offsetWidth;

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, CONFIG.TOAST.DURATION);
    }
}

const toastManager = new ToastManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ToastManager, toastManager };
}
