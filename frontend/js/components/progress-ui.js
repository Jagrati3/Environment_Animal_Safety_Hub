import { UserProgress } from '../utils/user-progress.js';

class ProgressUI {
    constructor() {
        this.widget = null;
        this.isOpen = false;
        this.init();
    }

    async init() {
        try {
            // Load CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = '/frontend/css/components/progress-ui.css';
            document.head.appendChild(cssLink);

            // Fetch HTML
            const response = await fetch('/frontend/components/progress-ui.html');
            const html = await response.text();

            // Create container
            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container.firstElementChild);

            this.widget = document.getElementById('eco-progress-widget');
            this.bindEvents();

            // Subscribe to updates
            UserProgress.subscribe(this.render.bind(this));

            // Listen for toasts
            window.addEventListener('progress-toast', (e) => {
                this.showToast(e.detail.message);
            });

        } catch (e) {
            console.error('Failed to init Progress UI:', e);
        }
    }

    bindEvents() {
        const toggle = document.getElementById('progressToggle');
        const close = document.getElementById('closeProgress');

        toggle.addEventListener('click', () => this.toggle());
        close.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.widget.classList.add('active');
        } else {
            this.widget.classList.remove('active');
        }
    }

    render(state) {
        if (!this.widget) return;

        // Update Mini Badge
        document.getElementById('miniLevel').textContent = state.level;

        // Update Expanded View
        document.getElementById('displayLevel').textContent = state.level;
        document.getElementById('xpText').textContent = `${state.xp} / ${state.nextLevelXp}`;

        const pct = Math.min(100, (state.xp / state.nextLevelXp) * 100);
        document.getElementById('xpBar').style.width = `${pct}%`;

        // Update Badge
        if (state.badges.length > 0) {
            const lastBadge = state.badges[state.badges.length - 1];
            document.getElementById('latestBadgeSection').style.display = 'block';
            document.getElementById('badgeIcon').textContent = lastBadge.icon;
            document.getElementById('badgeName').textContent = lastBadge.name;
        }
    }

    showToast(msg) {
        const toast = document.getElementById('progressToast');
        if (!toast) return;

        toast.textContent = msg;
        toast.classList.add('show', 'success');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ProgressUI();
});
