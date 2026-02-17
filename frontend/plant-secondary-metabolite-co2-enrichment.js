// Plant Secondary Metabolite Changes Under CO₂ Enrichment - JavaScript
// Interactive CO₂ Enrichment Impact Simulator and Plant Chemistry Visualizations

class CO2EnrichmentSimulator {
    constructor() {
        this.co2Level = 420;
        this.nitrogenLevel = 5;
        this.plantType = 'phenolics';

        this.initializeElements();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateSimulator();
    }

    initializeElements() {
        // Simulator controls
        this.co2LevelSlider = document.getElementById('co2-level');
        this.nitrogenLevelSlider = document.getElementById('nitrogen-level');
        this.plantTypeSelect = document.getElementById('plant-type');

        // Control value displays
        this.co2LevelValue = document.getElementById('co2-level-value');
        this.nitrogenLevelValue = document.getElementById('nitrogen-level-value');

        // Result displays
        this.photosynthesisRate = document.getElementById('photosynthesis-rate');
        this.defenseLevel = document.getElementById('defense-level');
        this.herbivoreRate = document.getElementById('herbivore-rate');
        this.plantFitness = document.getElementById('plant-fitness');

        // Progress bars
        this.photosynthesisBar = document.getElementById('photosynthesis-bar');
        this.defenseBar = document.getElementById('defense-bar');
        this.herbivoreBar = document.getElementById('herbivore-bar');
        this.fitnessBar = document.getElementById('fitness-bar');

        // Carbon cycle values
        this.co2UptakeValue = document.getElementById('co2-uptake');
        this.growthRateValue = document.getElementById('growth-rate');
        this.defenseDilutionValue = document.getElementById('defense-dilution');
        this.herbivorePressureValue = document.getElementById('herbivore-pressure');
    }

    setupEventListeners() {
        // Slider event listeners
        this.co2LevelSlider.addEventListener('input', () => {
            this.co2Level = parseInt(this.co2LevelSlider.value);
            this.co2LevelValue.textContent = this.co2Level;
            this.updateSimulator();
        });

        this.nitrogenLevelSlider.addEventListener('input', () => {
            this.nitrogenLevel = parseInt(this.nitrogenLevelSlider.value);
            this.nitrogenLevelValue.textContent = this.nitrogenLevel;
            this.updateSimulator();
        });

        this.plantTypeSelect.addEventListener('change', () => {
            this.plantType = this.plantTypeSelect.value;
            this.updateSimulator();
        });
    }

    calculatePhotosynthesisRate() {
        // Photosynthesis increases with CO₂, but is affected by nitrogen availability
        const co2Effect = (this.co2Level - 300) / 500; // Normalized CO₂ effect
        const nitrogenEffect = this.nitrogenLevel / 10; // Nitrogen limitation
        const baseRate = 100 + (co2Effect * 50) - (nitrogenEffect * 10);
        return Math.min(150, Math.max(80, baseRate));
    }

    calculateDefenseLevel() {
        // Defense compounds are diluted by enhanced growth, but vary by compound type
        const growthEffect = (this.calculatePhotosynthesisRate() - 100) / 50;
        const nitrogenEffect = this.nitrogenLevel / 10;
        const typeModifiers = {
            'phenolics': 1.0,
            'terpenoids': 0.8,
            'alkaloids': 1.2,
            'glucosinolates': 0.9
        };

        const baseDefense = 100 - (growthEffect * 25) + (nitrogenEffect * 15);
        const typeModifier = typeModifiers[this.plantType] || 1.0;
        return Math.max(0, baseDefense * typeModifier);
    }

    calculateHerbivoreRate() {
        // Herbivore feeding rate increases with CO₂ enrichment
        const co2Effect = (this.co2Level - 300) / 500;
        const defenseEffect = (100 - this.calculateDefenseLevel()) / 100;
        const nitrogenEffect = (11 - this.nitrogenLevel) / 10; // Lower nitrogen = higher feeding

        const baseRate = 100 + (co2Effect * 60) + (defenseEffect * 30) + (nitrogenEffect * 20);
        return Math.min(200, Math.max(50, baseRate));
    }

    calculatePlantFitness() {
        // Overall fitness balances growth benefits with herbivore costs
        const photosynthesis = this.calculatePhotosynthesisRate() / 100;
        const herbivoreCost = this.calculateHerbivoreRate() / 200; // Normalized cost
        const defenseBenefit = this.calculateDefenseLevel() / 100;

        const fitness = (photosynthesis * 0.5) - (herbivoreCost * 0.3) + (defenseBenefit * 0.2);
        return Math.max(0, fitness * 100);
    }

    updateSimulator() {
        const photosynthesis = this.calculatePhotosynthesisRate();
        const defense = this.calculateDefenseLevel();
        const herbivore = this.calculateHerbivoreRate();
        const fitness = this.calculatePlantFitness();

        // Update text displays
        this.photosynthesisRate.textContent = '+' + Math.round(photosynthesis - 100) + '%';
        this.defenseLevel.textContent = Math.round(defense - 100) + '%';
        this.herbivoreRate.textContent = '+' + Math.round(herbivore - 100) + '%';
        this.plantFitness.textContent = '+' + Math.round(fitness - 100) + '%';

        // Update progress bars with smooth animation
        this.animateBar(this.photosynthesisBar, (photosynthesis - 80) / 70 * 100); // Normalize to 0-100
        this.animateBar(this.defenseBar, defense);
        this.animateBar(this.herbivoreBar, (herbivore - 50) / 150 * 100); // Normalize
        this.animateBar(this.fitnessBar, fitness);

        // Update carbon cycle values
        this.updateCarbonCycle();

        // Update chart data if charts exist
        if (this.metaboliteChart) {
            this.updateMetaboliteChart();
        }
        if (this.impactChart) {
            this.updateImpactChart();
        }
    }

    updateCarbonCycle() {
        const co2Effect = (this.co2Level - 300) / 500;
        const nitrogenEffect = this.nitrogenLevel / 10;

        this.co2UptakeValue.textContent = '+' + Math.round(co2Effect * 40) + '%';
        this.growthRateValue.textContent = '+' + Math.round(co2Effect * 35 - nitrogenEffect * 5) + '%';
        this.defenseDilutionValue.textContent = '-' + Math.round(co2Effect * 20) + '%';
        this.herbivorePressureValue.textContent = '+' + Math.round(co2Effect * 45) + '%';
    }

    animateBar(barElement, percentage) {
        barElement.style.width = Math.max(0, Math.min(100, percentage)) + '%';
    }

    initializeCharts() {
        this.initializeMetaboliteChart();
        this.initializeImpactChart();
    }

    initializeMetaboliteChart() {
        const ctx = document.getElementById('metaboliteChart');
        if (!ctx) return;

        const data = this.generateMetaboliteData();

        this.metaboliteChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Phenolics', 'Terpenoids', 'Alkaloids', 'Glucosinolates', 'Amino Acids', 'Carbohydrates'],
                datasets: [{
                    label: 'Ambient CO₂ (300 ppm)',
                    data: data.ambient,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    pointBackgroundColor: '#27ae60',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#27ae60'
                }, {
                    label: 'Elevated CO₂ (600 ppm)',
                    data: data.elevated,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    pointBackgroundColor: '#e74c3c',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#e74c3c'
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
                        max: 150,
                        ticks: {
                            stepSize: 25
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

    generateMetaboliteData() {
        // Generate data based on current simulator settings
        const co2Effect = (this.co2Level - 300) / 500;
        const nitrogenEffect = this.nitrogenLevel / 10;

        const ambient = [100, 100, 100, 100, 100, 100]; // Baseline

        const elevated = [
            100 - co2Effect * 15 + nitrogenEffect * 10, // Phenolics
            100 - co2Effect * 30 + nitrogenEffect * 15, // Terpenoids
            100 - co2Effect * 25 + nitrogenEffect * 20, // Alkaloids
            100 - co2Effect * 20 + nitrogenEffect * 12, // Glucosinolates
            100 - co2Effect * 20 - nitrogenEffect * 15, // Amino Acids
            100 + co2Effect * 40 - nitrogenEffect * 5   // Carbohydrates
        ];

        return { ambient, elevated };
    }

    updateMetaboliteChart() {
        if (!this.metaboliteChart) return;

        const data = this.generateMetaboliteData();
        this.metaboliteChart.data.datasets[1].data = data.elevated;
        this.metaboliteChart.update();
    }

    initializeImpactChart() {
        const ctx = document.getElementById('impactChart');
        if (!ctx) return;

        this.impactChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tomato', 'Wheat', 'Oak Trees', 'Grasses', 'Soybean', 'Rice'],
                datasets: [{
                    label: 'Herbivore Performance Change (%)',
                    data: [35, 50, 25, -10, 40, 30],
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
                                return 'Performance Change: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Performance Change (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Crop/Plant Species'
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

    updateImpactChart() {
        if (!this.impactChart) return;

        // Update based on current plant type selection
        const typeMultipliers = {
            'phenolics': [1.0, 1.2, 0.8, 0.9, 1.1, 1.0],
            'terpenoids': [0.8, 1.0, 1.3, 0.7, 0.9, 1.2],
            'alkaloids': [1.2, 0.9, 1.0, 1.1, 1.3, 0.8],
            'glucosinolates': [0.9, 1.1, 0.7, 1.0, 0.8, 1.1]
        };

        const baseData = [35, 50, 25, -10, 40, 30];
        const multipliers = typeMultipliers[this.plantType] || [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

        const newData = baseData.map((value, index) => value * multipliers[index]);
        this.impactChart.data.datasets[0].data = newData;
        this.impactChart.update();
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
        localStorage.setItem('co2-simulator-accessibility', JSON.stringify(preferences));
    }

    loadPreferences() {
        const preferences = localStorage.getItem('co2-simulator-accessibility');
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
    const simulator = new CO2EnrichmentSimulator();
    const navigation = new TabNavigation();
    const mechanismExplorer = new MechanismExplorer();
    const accessibility = new AccessibilityManager();
    const performanceMonitor = new PerformanceMonitor();

    // Make simulator globally accessible for debugging
    window.co2Simulator = simulator;
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

    console.log('CO₂ Enrichment Simulator initialized successfully');
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
        CO2EnrichmentSimulator,
        TabNavigation,
        MechanismExplorer,
        AccessibilityManager,
        PerformanceMonitor
    };
}