// Ice-Albedo Feedback and Coastal Marine Productivity - JavaScript
// Interactive features for educational web interface

class IceAlbedoSimulator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeCharts();
        this.resetToDefaults();
        this.updateSimulator();
    }

    initializeElements() {
        // Simulator controls
        this.iceExtentSlider = document.getElementById('ice-extent');
        this.iceThicknessSlider = document.getElementById('ice-thickness');
        this.regionSelect = document.getElementById('region-select');
        this.seasonSelect = document.getElementById('season-select');

        // Display values
        this.iceExtentValue = document.getElementById('ice-extent-value');
        this.iceThicknessValue = document.getElementById('ice-thickness-value');

        // Results
        this.albedoValue = document.getElementById('albedo-value');
        this.albedoBar = document.querySelector('.albedo-bar');
        this.productivityValue = document.getElementById('productivity-value');
        this.productivityFill = document.querySelector('.productivity-fill');
        this.feedbackStrength = document.getElementById('feedback-strength');
        this.warmingAmplification = document.getElementById('warming-amplification');

        // Impact indicators
        this.iceFill = document.querySelector('.ice-fill');
        this.waterFill = document.querySelector('.water-fill');

        // Charts
        this.productivityChart = null;
        this.feedbackChart = null;
        this.globalImpactChart = null;
    }

    setupEventListeners() {
        // Slider events
        this.iceExtentSlider.addEventListener('input', () => this.updateSimulator());
        this.iceThicknessSlider.addEventListener('input', () => this.updateSimulator());

        // Select events
        this.regionSelect.addEventListener('change', () => this.updateSimulator());
        this.seasonSelect.addEventListener('change', () => this.updateSimulator());

        // Accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    initializeCharts() {
        this.createProductivityChart();
        this.createFeedbackChart();
        this.createGlobalImpactChart();
    }

    createProductivityChart() {
        const ctx = document.getElementById('productivity-chart');
        if (!ctx) return;

        this.productivityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Phytoplankton Biomass',
                    data: [45, 52, 58, 65, 72, 78, 75, 68, 55, 48, 42, 38],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Zooplankton Population',
                    data: [35, 42, 48, 55, 62, 68, 65, 58, 45, 38, 32, 28],
                    borderColor: '#42A5F5',
                    backgroundColor: 'rgba(66, 165, 245, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Fish Larvae',
                    data: [25, 32, 38, 45, 52, 58, 55, 48, 35, 28, 22, 18],
                    borderColor: '#8BC34A',
                    backgroundColor: 'rgba(139, 195, 74, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Seasonal Marine Productivity Changes',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Biomass Index'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createFeedbackChart() {
        const ctx = document.getElementById('feedback-chart');
        if (!ctx) return;

        this.feedbackChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Ice Extent', 'Albedo Change', 'Heat Absorption', 'Ocean Warming', 'Atmospheric Warming', 'Feedback Strength'],
                datasets: [{
                    label: 'Current Conditions',
                    data: [65, 70, 60, 55, 50, 62],
                    borderColor: '#FF5722',
                    backgroundColor: 'rgba(255, 87, 34, 0.2)',
                    pointBackgroundColor: '#FF5722',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#FF5722'
                }, {
                    label: 'Projected 2050',
                    data: [45, 50, 75, 70, 65, 78],
                    borderColor: '#F44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    pointBackgroundColor: '#F44336',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#F44336'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ice-Albedo Feedback Amplification',
                        font: { size: 16, weight: 'bold' }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createGlobalImpactChart() {
        const ctx = document.getElementById('global-impact-chart');
        if (!ctx) return;

        this.globalImpactChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Arctic', 'Subarctic', 'North Atlantic', 'North Pacific', 'Global Average'],
                datasets: [{
                    label: 'Productivity Increase (%)',
                    data: [45, 32, 28, 35, 25],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.8)',
                        'rgba(139, 195, 74, 0.8)',
                        'rgba(205, 220, 57, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 87, 34, 0.8)'
                    ],
                    borderColor: [
                        '#4CAF50',
                        '#8BC34A',
                        '#CDDC39',
                        '#FFC107',
                        '#FF5722'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Regional Marine Productivity Impacts',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Productivity Increase (%)'
                        }
                    }
                },
                animation: {
                    duration: 1200,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    resetToDefaults() {
        this.iceExtentSlider.value = 65;
        this.iceThicknessSlider.value = 2.5;
        this.regionSelect.value = 'arctic';
        this.seasonSelect.value = 'summer';
    }

    updateSimulator() {
        const iceExtent = parseFloat(this.iceExtentSlider.value);
        const iceThickness = parseFloat(this.iceThicknessSlider.value);
        const region = this.regionSelect.value;
        const season = this.seasonSelect.value;

        // Update display values
        this.iceExtentValue.textContent = `${iceExtent}%`;
        this.iceThicknessValue.textContent = `${iceThickness}m`;

        // Calculate albedo
        const albedo = this.calculateAlbedo(iceExtent, iceThickness, region, season);
        this.albedoValue.textContent = `${albedo.toFixed(2)}`;
        this.albedoBar.style.width = `${albedo * 100}%`;

        // Calculate productivity
        const productivity = this.calculateProductivity(iceExtent, region, season);
        this.productivityValue.textContent = `${productivity.toFixed(1)}%`;
        this.productivityFill.style.width = `${Math.min(productivity, 100)}%`;

        // Calculate feedback strength
        const feedbackStrength = this.calculateFeedbackStrength(iceExtent, region);
        this.feedbackStrength.textContent = `${feedbackStrength.toFixed(1)}x`;
        this.warmingAmplification.textContent = `${(feedbackStrength * 1.5).toFixed(1)}°C`;

        // Update impact indicators
        this.updateImpactIndicators(iceExtent);

        // Update charts
        this.updateCharts(iceExtent, region, season);
    }

    calculateAlbedo(iceExtent, iceThickness, region, season) {
        // Base albedo calculations
        const iceAlbedo = 0.85; // Fresh snow/ice
        const waterAlbedo = 0.07; // Open water
        const meltPondAlbedo = 0.3; // Melt ponds

        // Regional adjustments
        const regionMultiplier = {
            'arctic': 1.0,
            'antarctic': 0.95,
            'greenland': 1.05,
            'barents': 0.9
        };

        // Seasonal adjustments
        const seasonMultiplier = {
            'winter': 1.1,
            'spring': 0.95,
            'summer': 0.8,
            'fall': 0.9
        };

        // Thickness effect (thinner ice has lower albedo)
        const thicknessEffect = Math.min(iceThickness / 3, 1);

        const baseAlbedo = iceExtent * iceAlbedo + (100 - iceExtent) * waterAlbedo;
        const adjustedAlbedo = baseAlbedo * regionMultiplier[region] * seasonMultiplier[season] * thicknessEffect;

        return Math.max(0.05, Math.min(0.95, adjustedAlbedo));
    }

    calculateProductivity(iceExtent, region, season) {
        // Productivity increases with more open water
        const openWater = 100 - iceExtent;

        // Regional productivity baselines
        const regionBaselines = {
            'arctic': 25,
            'antarctic': 20,
            'greenland': 30,
            'barents': 35
        };

        // Seasonal productivity multipliers
        const seasonMultipliers = {
            'winter': 0.3,
            'spring': 0.8,
            'summer': 1.2,
            'fall': 0.9
        };

        const baseline = regionBaselines[region];
        const seasonalMultiplier = seasonMultipliers[season];

        // Productivity boost from open water (non-linear relationship)
        const productivityBoost = Math.pow(openWater / 100, 0.7) * 50;

        return baseline * seasonalMultiplier + productivityBoost;
    }

    calculateFeedbackStrength(iceExtent, region) {
        // Feedback strength increases as ice extent decreases
        const iceLoss = 100 - iceExtent;

        // Regional feedback sensitivities
        const regionFeedback = {
            'arctic': 1.8,
            'antarctic': 2.1,
            'greenland': 1.5,
            'barents': 2.0
        };

        // Non-linear feedback amplification
        const feedbackMultiplier = regionFeedback[region];
        const baseFeedback = 1 + (iceLoss / 100) * feedbackMultiplier;

        return Math.min(3.0, baseFeedback);
    }

    updateImpactIndicators(iceExtent) {
        const icePercentage = iceExtent;
        const waterPercentage = 100 - iceExtent;

        this.iceFill.style.width = `${icePercentage}%`;
        this.waterFill.style.width = `${waterPercentage}%`;
    }

    updateCharts(iceExtent, region, season) {
        if (this.productivityChart) {
            const productivityData = this.generateProductivityData(iceExtent, region, season);
            this.productivityChart.data.datasets.forEach((dataset, index) => {
                dataset.data = productivityData[index];
            });
            this.productivityChart.update('active');
        }

        if (this.feedbackChart) {
            const feedbackData = this.generateFeedbackData(iceExtent, region);
            this.feedbackChart.data.datasets[0].data = feedbackData.current;
            this.feedbackChart.data.datasets[1].data = feedbackData.projected;
            this.feedbackChart.update('active');
        }
    }

    generateProductivityData(iceExtent, region, season) {
        const openWater = 100 - iceExtent;
        const productivityBoost = openWater * 0.5;

        // Seasonal baselines
        const seasonBaselines = {
            'winter': [25, 20, 15],
            'spring': [35, 30, 25],
            'summer': [55, 50, 45],
            'fall': [40, 35, 30]
        };

        const baselines = seasonBaselines[season];

        return [
            baselines.map(b => b + productivityBoost * 1.2), // Phytoplankton
            baselines.map(b => b + productivityBoost * 0.9),  // Zooplankton
            baselines.map(b => b + productivityBoost * 0.7)   // Fish larvae
        ];
    }

    generateFeedbackData(iceExtent, region) {
        const iceLoss = 100 - iceExtent;

        return {
            current: [
                iceExtent,
                70 - iceLoss * 0.3,
                60 + iceLoss * 0.2,
                55 + iceLoss * 0.15,
                50 + iceLoss * 0.1,
                62 + iceLoss * 0.2
            ],
            projected: [
                Math.max(20, iceExtent - 25),
                50 - (iceLoss + 25) * 0.3,
                75 + (iceLoss + 25) * 0.2,
                70 + (iceLoss + 25) * 0.15,
                65 + (iceLoss + 25) * 0.1,
                78 + (iceLoss + 25) * 0.2
            ]
        };
    }

    handleKeyboard(e) {
        // Accessibility keyboard navigation
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('mechanism-tab')) {
                e.preventDefault();
                this.switchMechanismTab(focused.dataset.tab);
            }
        }
    }
}

// Tab Navigation System
class TabNavigation {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeTabs();
    }

    initializeElements() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.contentSections = document.querySelectorAll('.content-section');
        this.mechanismTabs = document.querySelectorAll('.mechanism-tab');
        this.mechanismPanels = document.querySelectorAll('.mechanism-panel');
    }

    setupEventListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        this.mechanismTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleMechanismTabClick(e));
        });

        // URL hash handling
        window.addEventListener('hashchange', () => this.handleHashChange());
        window.addEventListener('load', () => this.handleHashChange());
    }

    initializeTabs() {
        // Set default active tab
        const hash = window.location.hash.substring(1) || 'science';
        this.switchToSection(hash);
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetSection = e.target.dataset.section;
        this.switchToSection(targetSection);
        window.location.hash = targetSection;
    }

    handleMechanismTabClick(e) {
        const targetTab = e.target.dataset.tab;
        this.switchMechanismTab(targetTab);
    }

    switchToSection(sectionId) {
        // Update navigation
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });

        // Update content
        this.contentSections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        // Scroll to top of content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    switchMechanismTab(tabId) {
        // Update tabs
        this.mechanismTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        // Update panels
        this.mechanismPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === tabId);
        });
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            this.switchToSection(hash);
        }
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeAccessibility();
    }

    initializeElements() {
        this.accessibilityControls = document.querySelector('.accessibility-controls');
        this.highContrastBtn = document.getElementById('high-contrast');
        this.reducedMotionBtn = document.getElementById('reduced-motion');
        this.fontSizeIncreaseBtn = document.getElementById('font-increase');
        this.fontSizeDecreaseBtn = document.getElementById('font-decrease');
    }

    setupEventListeners() {
        if (this.highContrastBtn) {
            this.highContrastBtn.addEventListener('click', () => this.toggleHighContrast());
        }

        if (this.reducedMotionBtn) {
            this.reducedMotionBtn.addEventListener('click', () => this.toggleReducedMotion());
        }

        if (this.fontSizeIncreaseBtn) {
            this.fontSizeIncreaseBtn.addEventListener('click', () => this.increaseFontSize());
        }

        if (this.fontSizeDecreaseBtn) {
            this.fontSizeDecreaseBtn.addEventListener('click', () => this.decreaseFontSize());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    initializeAccessibility() {
        // Check for saved preferences
        const highContrast = localStorage.getItem('highContrast') === 'true';
        const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
        const fontSize = parseInt(localStorage.getItem('fontSize')) || 100;

        if (highContrast) {
            document.body.classList.add('high-contrast');
            this.highContrastBtn?.classList.add('active');
        }

        if (reducedMotion) {
            document.body.classList.add('reduced-motion');
            this.reducedMotionBtn?.classList.add('active');
        }

        this.setFontSize(fontSize);
    }

    toggleHighContrast() {
        const isActive = document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', isActive);
        this.highContrastBtn?.classList.toggle('active', isActive);
    }

    toggleReducedMotion() {
        const isActive = document.body.classList.toggle('reduced-motion');
        localStorage.setItem('reducedMotion', isActive);
        this.reducedMotionBtn?.classList.toggle('active', isActive);
    }

    increaseFontSize() {
        const currentSize = parseInt(localStorage.getItem('fontSize')) || 100;
        const newSize = Math.min(currentSize + 10, 150);
        this.setFontSize(newSize);
    }

    decreaseFontSize() {
        const currentSize = parseInt(localStorage.getItem('fontSize')) || 100;
        const newSize = Math.max(currentSize - 10, 80);
        this.setFontSize(newSize);
    }

    setFontSize(size) {
        document.documentElement.style.fontSize = `${size}%`;
        localStorage.setItem('fontSize', size);
    }

    handleKeyboardNavigation(e) {
        // Skip links for screen readers
        if (e.key === '1' && e.altKey) {
            e.preventDefault();
            const mainContent = document.querySelector('.main-content');
            mainContent?.focus();
        }

        // Tab navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const focused = document.activeElement;
            if (focused.classList.contains('mechanism-tab')) {
                e.preventDefault();
                this.navigateMechanismTabs(e.key === 'ArrowRight' ? 1 : -1);
            }
        }
    }

    navigateMechanismTabs(direction) {
        const tabs = Array.from(document.querySelectorAll('.mechanism-tab'));
        const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
        const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;

        tabs[nextIndex].click();
        tabs[nextIndex].focus();
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.initializeMonitoring();
    }

    initializeMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.measurePageLoad();
        });

        // Monitor user interactions
        this.monitorInteractions();

        // Monitor chart rendering performance
        this.monitorChartPerformance();
    }

    measurePageLoad() {
        const perfData = performance.getEntriesByType('navigation')[0];
        this.metrics.pageLoad = {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            totalTime: perfData.loadEventEnd - perfData.fetchStart
        };

        console.log('Page Load Performance:', this.metrics.pageLoad);
    }

    monitorInteractions() {
        let interactionCount = 0;
        const interactionHandler = () => {
            interactionCount++;
            if (interactionCount % 10 === 0) {
                console.log(`User interactions: ${interactionCount}`);
            }
        };

        document.addEventListener('click', interactionHandler);
        document.addEventListener('input', interactionHandler);
        document.addEventListener('change', interactionHandler);
    }

    monitorChartPerformance() {
        // Monitor Chart.js rendering performance
        const originalRender = Chart.prototype.render;
        Chart.prototype.render = function() {
            const startTime = performance.now();
            const result = originalRender.apply(this, arguments);
            const renderTime = performance.now() - startTime;

            if (renderTime > 50) {
                console.warn(`Slow chart render: ${renderTime.toFixed(2)}ms for ${this.canvas.id}`);
            }

            return result;
        };
    }

    getMetrics() {
        return this.metrics;
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.observer = null;
        this.initializeIntersectionObserver();
    }

    initializeIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe elements that should animate in
        document.querySelectorAll('.content-card, .case-study, .solution-card').forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const simulator = new IceAlbedoSimulator();
    const navigation = new TabNavigation();
    const accessibility = new AccessibilityManager();
    const performance = new PerformanceMonitor();
    const animations = new AnimationManager();

    // Make components globally available for debugging
    window.iceAlbedoSimulator = simulator;
    window.tabNavigation = navigation;
    window.accessibilityManager = accessibility;
    window.performanceMonitor = performance;
    window.animationManager = animations;

    console.log('Ice-Albedo Feedback Simulator initialized successfully');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error reports to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error reports to monitoring service
});