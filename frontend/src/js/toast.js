import { SELECTORS, TOAST_ICONS, TIMING } from './config.js';

export class ToastManager {
    constructor() {
        let container = document.querySelector(SELECTORS.TOAST_CONTAINER);
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        this.container = container;
    }

    show(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = TOAST_ICONS[type] || '';
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
        }, TIMING.TOAST_DURATION);
    }
}
