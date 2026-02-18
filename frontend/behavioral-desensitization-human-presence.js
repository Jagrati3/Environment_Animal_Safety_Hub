// Behavioral Desensitization to Human Presence - JavaScript
// Interactive Wildlife Behavior Simulator and Data Visualizations

class BehavioralSimulator {
    constructor() {
        this.humanDensity = 25;
        this.exposureDuration = 10;
        this.speciesSensitivity = 5;

        this.initializeElements();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateSimulator();
    }

    initializeElements() {
        // Simulator controls
        this.humanDensitySlider = document.getElementById('human-density');
        this.exposureDurationSlider = document.getElementById('exposure-duration');
        this.speciesSensitivitySlider = document.getElementById('species-sensitivity');

        // Control value displays
        this.humanDensityValue = document.getElementById('human-density-value');
        this.exposureDurationValue = document.getElementById('exposure-duration-value');
        this.speciesSensitivityValue = document.getElementById('species-sensitivity-value');

        // Result displays
        this.stressLevel = document.getElementById('stress-level');
        this.reproductionRate = document.getElementById('reproduction-rate');
        this.predatorResponse = document.getElementById('predator-response');
        this.populationFitness = document.getElementById('population-fitness');

        // Progress bars
        this.stressBar = document.getElementById('stress-bar');
        this.reproductionBar = document.getElementById('reproduction-bar');
        this.predatorBar = document.getElementById('predator-bar');
        this.fitnessBar = document.getElementById('fitness-bar');
    }

    setupEventListeners() {
        // Slider event listeners
        this.humanDensitySlider.addEventListener('input', () => {
            this.humanDensity = parseInt(this.humanDensitySlider.value);
            this.humanDensityValue.textContent = this.humanDensity;
            this.updateSimulator();
        });

        this.exposureDurationSlider.addEventListener('input', () => {
            this.exposureDuration = parseInt(this.exposureDurationSlider.value);
            this.exposureDurationValue.textContent = this.exposureDuration;
            this.updateSimulator();
        });

        this.speciesSensitivitySlider.addEventListener('input', () => {
            this.speciesSensitivity = parseInt(this.speciesSensitivitySlider.value);
            this.speciesSensitivityValue.textContent = this.speciesSensitivity;
            this.updateSimulator();
        });
    }

    calculateStressLevel() {
        // Stress increases with human density and exposure duration
        // Higher species sensitivity amplifies the effect
        const baseStress = (this.humanDensity / 100) * (this.exposureDuration / 50);
        const sensitivityMultiplier = this.speciesSensitivity / 10;
        return Math.min(100, Math.max(0, (baseStress * sensitivityMultiplier * 100)));
    }

    calculateReproductionRate() {
        // Reproduction decreases with stress and human density
        const stressImpact = this.calculateStressLevel() / 100;
        const humanImpact = this.humanDensity / 100;
        const baseRate = 100 - (stressImpact * 40) - (humanImpact * 30);
        return Math.max(0, baseRate);
    }

    calculatePredatorResponse() {
        // Anti-predator response degrades with habituation
        const habituationFactor = (this.humanDensity / 100) * (this.exposureDuration / 50);
        const sensitivityProtection = (11 - this.speciesSensitivity) / 10;
        const baseResponse = 100 - (habituationFactor * 60) + (sensitivityProtection * 20);
        return Math.max(0, Math.min(100, baseResponse));
    }

    calculatePopulationFitness() {
        // Overall fitness combines all factors
        const reproduction = this.calculateReproductionRate() / 100;
        const predator = this.calculatePredatorResponse() / 100;
        const stress = 1 - (this.calculateStressLevel() / 100);
        const fitness = (reproduction * 0.4 + predator * 0.4 + stress * 0.2) * 100;
        return Math.max(0, fitness);
    }

    updateSimulator() {
        const stress = this.calculateStressLevel();
        const reproduction = this.calculateReproductionRate();
        const predator = this.calculatePredatorResponse();
        const fitness = this.calculatePopulationFitness();

        // Update text displays
        this.stressLevel.textContent = Math.round(stress) + '%';
        this.reproductionRate.textContent = Math.round(reproduction) + '%';
        this.predatorResponse.textContent = Math.round(predator) + '%';
        this.populationFitness.textContent = Math.round(fitness) + '%';

        // Update progress bars with smooth animation
        this.animateBar(this.stressBar, stress);
        this.animateBar(this.reproductionBar, reproduction);
        this.animateBar(this.predatorBar, predator);
        this.animateBar(this.fitnessBar, fitness);

        // Update chart data if charts exist
        if (this.behaviorChart) {
            this.updateBehaviorChart();
        }
    }

    animateBar(barElement, percentage) {
        barElement.style.width = percentage + '%';
    }

    initializeCharts() {
        this.initializeBehaviorChart();
        this.initializeImpactChart();
    }

    initializeBehaviorChart() {
        const ctx = document.getElementById('behaviorChart');
        if (!ctx) return;

        const data = this.generateBehaviorData();

        this.behaviorChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Natural Avoidance', 'Predator Recognition', 'Foraging Efficiency', 'Social Behavior', 'Reproductive Success', 'Stress Response'],
                datasets: [{
                    label: 'Natural Behavior',
                    data: data.natural,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3498db'
                }, {
                    label: 'Habituated Behavior',
                    data: data.habituated,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    pointBackgroundColor: '#e74c3c',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#e74c3c'
                }, {
                    label: 'Maladaptive Changes',
                    data: data.maladaptive,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.2)',
                    pointBackgroundColor: '#f39c12',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#f39c12'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.r + '%';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
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

    generateBehaviorData() {
        // Generate data based on current simulator settings
        const habituationFactor = (this.humanDensity / 100) * (this.exposureDuration / 50);

        return {
            natural: [95, 90, 85, 88, 92, 85], // Baseline natural behaviors
            habituated: [
                Math.max(0, 95 - habituationFactor * 60), // Avoidance
                Math.max(0, 90 - habituationFactor * 50), // Recognition
                Math.max(0, 85 - habituationFactor * 40), // Foraging
                Math.max(0, 88 - habituationFactor * 35), // Social
                Math.max(0, 92 - habituationFactor * 45), // Reproduction
                Math.max(0, 85 - habituationFactor * 30)  // Stress
            ],
            maladaptive: [
                Math.min(100, habituationFactor * 80), // Increased human approach
                Math.min(100, habituationFactor * 70), // Reduced predator avoidance
                Math.min(100, habituationFactor * 60), // Altered foraging
                Math.min(100, habituationFactor * 50), // Disrupted social
                Math.min(100, habituationFactor * 65), // Reproductive issues
                Math.min(100, habituationFactor * 90)  // Chronic stress
            ]
        };
    }

    updateBehaviorChart() {
        if (!this.behaviorChart) return;

        const data = this.generateBehaviorData();
        this.behaviorChart.data.datasets[1].data = data.habituated;
        this.behaviorChart.data.datasets[2].data = data.maladaptive;
        this.behaviorChart.update();
    }

    initializeImpactChart() {
        const ctx = document.getElementById('impactChart');
        if (!ctx) return;

        this.impactChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Grizzly Bears', 'African Elephants', 'Urban Koalas', 'Whale Watching', 'Urban Deer', 'Island Foxes'],
                datasets: [{
                    label: 'Population Decline (%)',
                    data: [40, 60, 80, 25, 35, 95],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(230, 126, 34, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)'
                    ],
                    borderColor: [
                        '#e74c3c',
                        '#e67e22',
                        '#f1c40f',
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Population Decline: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Population Decline (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Species/Case Study'
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
}

// Tab Navigation System
class TabNavigation {
    constructor() {
        this.tabs = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.content-section');
        this.setupEventListeners();
        this.initializeTabState();
    }

    setupEventListeners() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = e.target.dataset.tab;
                this.switchTab(targetTab);
            });

            // Keyboard navigation
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetTab = e.target.dataset.tab;
                    this.switchTab(targetTab);
                }
            });
        });
    }

    initializeTabState() {
        // Set initial active tab (science)
        this.switchTab('science');
    }

    switchTab(targetTab) {
        // Remove active class from all tabs and sections
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.sections.forEach(section => section.classList.remove('active'));

        // Add active class to target tab and section
        const targetTabElement = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetSection = document.getElementById(targetTab);

        if (targetTabElement && targetSection) {
            targetTabElement.classList.add('active');
            targetSection.classList.add('active');

            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL hash without triggering scroll
            history.replaceState(null, null, `#${targetTab}`);
        }
    }
}

// Mechanism Explorer
class MechanismExplorer {
    constructor() {
        this.tabs = document.querySelectorAll('.mechanism-tab');
        this.panels = document.querySelectorAll('.mechanism-panel');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const mechanism = tab.dataset.mechanism;
                this.switchMechanism(mechanism);
            });
        });
    }

    switchMechanism(mechanism) {
        // Remove active class from all tabs and panels
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.panels.forEach(panel => panel.classList.remove('active'));

        // Add active class to target tab and panel
        const targetTab = document.querySelector(`[data-mechanism="${mechanism}"]`);
        const targetPanel = document.getElementById(`${mechanism}-panel`);

        if (targetTab && targetPanel) {
            targetTab.classList.add('active');
            targetPanel.classList.add('active');
        }
    }
}

// Accessibility Features
class AccessibilityManager {
    constructor() {
        this.highContrastEnabled = false;
        this.largeFontEnabled = false;
        this.reducedMotionEnabled = false;
        this.setupEventListeners();
        this.loadPreferences();
    }

    setupEventListeners() {
        // High contrast toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('.accessibility-btn') && e.target.textContent.includes('High Contrast')) {
                this.toggleHighContrast();
            }
        });

        // Font size toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('.accessibility-btn') && e.target.textContent.includes('Font Size')) {
                this.toggleFontSize();
            }
        });

        // Reduced motion toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('.accessibility-btn') && e.target.textContent.includes('Reduced Motion')) {
                this.toggleReducedMotion();
            }
        });
    }

    toggleHighContrast() {
        this.highContrastEnabled = !this.highContrastEnabled;
        document.body.classList.toggle('high-contrast', this.highContrastEnabled);
        this.savePreferences();
        this.announceChange('High contrast mode ' + (this.highContrastEnabled ? 'enabled' : 'disabled'));
    }

    toggleFontSize() {
        this.largeFontEnabled = !this.largeFontEnabled;
        document.body.classList.toggle('large-font', this.largeFontEnabled);
        this.savePreferences();
        this.announceChange('Large font mode ' + (this.largeFontEnabled ? 'enabled' : 'disabled'));
    }

    toggleReducedMotion() {
        this.reducedMotionEnabled = !this.reducedMotionEnabled;
        document.body.classList.toggle('reduced-motion', this.reducedMotionEnabled);
        this.savePreferences();
        this.announceChange('Reduced motion mode ' + (this.reducedMotionEnabled ? 'enabled' : 'disabled'));
    }

    savePreferences() {
        const preferences = {
            highContrast: this.highContrastEnabled,
            largeFont: this.largeFontEnabled,
            reducedMotion: this.reducedMotionEnabled
        };
        localStorage.setItem('behavioral-simulator-accessibility', JSON.stringify(preferences));
    }

    loadPreferences() {
        const preferences = localStorage.getItem('behavioral-simulator-accessibility');
        if (preferences) {
            const prefs = JSON.parse(preferences);
            this.highContrastEnabled = prefs.highContrast || false;
            this.largeFontEnabled = prefs.largeFont || false;
            this.reducedMotionEnabled = prefs.reducedMotion || false;

            document.body.classList.toggle('high-contrast', this.highContrastEnabled);
            document.body.classList.toggle('large-font', this.largeFontEnabled);
            document.body.classList.toggle('reduced-motion', this.reducedMotionEnabled);
        }
    }

    announceChange(message) {
        // Create temporary announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        announcement.textContent = message;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            interactionCount: 0,
            chartRenderTime: 0
        };
        this.initializeMonitoring();
    }

    initializeMonitoring() {
        // Track page load time
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.pageLoadTime.toFixed(2)}ms`);
        });

        // Track user interactions
        document.addEventListener('click', () => {
            this.metrics.interactionCount++;
        });

        // Monitor chart rendering performance
        this.monitorChartPerformance();
    }

    monitorChartPerformance() {
        // Override Chart.js render method to track performance
        const originalRender = Chart.prototype.render;
        Chart.prototype.render = function() {
            const startTime = performance.now();
            originalRender.call(this);
            const renderTime = performance.now() - startTime;

            if (window.performanceMonitor) {
                window.performanceMonitor.metrics.chartRenderTime = renderTime;
                console.log(`Chart rendered in ${renderTime.toFixed(2)}ms`);
            }
        };
    }

    getMetrics() {
        return { ...this.metrics };
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const simulator = new BehavioralSimulator();
    const navigation = new TabNavigation();
    const mechanismExplorer = new MechanismExplorer();
    const accessibility = new AccessibilityManager();
    const performanceMonitor = new PerformanceMonitor();

    // Make simulator globally accessible for debugging
    window.behavioralSimulator = simulator;
    window.performanceMonitor = performanceMonitor;

    // Handle URL hash for direct tab navigation
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        setTimeout(() => {
            navigation.switchTab(hash);
        }, 100);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + 1-4 for tab navigation
        if (e.altKey && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const tabs = ['science', 'impacts', 'mechanisms', 'solutions'];
            const tabIndex = parseInt(e.key) - 1;
            if (tabs[tabIndex]) {
                navigation.switchTab(tabs[tabIndex]);
            }
        }

        // Escape key to close any open modals (future feature)
        if (e.key === 'Escape') {
            // Handle escape key actions
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.content-card, .case-study, .solution-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('Behavioral Desensitization Simulator initialized successfully');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error reports to monitoring service
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BehavioralSimulator,
        TabNavigation,
        MechanismExplorer,
        AccessibilityManager,
        PerformanceMonitor
    };
}