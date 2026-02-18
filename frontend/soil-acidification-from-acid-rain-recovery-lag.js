// Soil Acidification from Acid Rain Recovery Lag - JavaScript
// Interactive features: Chart.js visualizations, real-time simulator, accessibility

class AcidificationSimulator {
    constructor() {
        this.charts = {};
        this.currentTab = 'science';
        this.isHighContrast = false;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        this.setupAccessibility();
        this.setupSimulator();
        this.setupCharts();
        this.setupNavigation();
        this.setupTabs();
        this.setupPerformanceMonitoring();

        // Initial simulator run
        this.runSimulation();

        // Setup event listeners
        this.setupEventListeners();
    }

    setupAccessibility() {
        // High contrast mode toggle
        const contrastBtn = document.querySelector('.contrast-toggle');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => {
                this.toggleHighContrast();
            });
        }

        // Keyboard navigation for tabs
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });

        // Screen reader announcements
        this.announce = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            setTimeout(() => document.body.removeChild(announcement), 1000);
        };
    }

    toggleHighContrast() {
        this.isHighContrast = !this.isHighContrast;
        document.body.classList.toggle('high-contrast', this.isHighContrast);

        const btn = document.querySelector('.contrast-toggle');
        if (btn) {
            btn.textContent = this.isHighContrast ? 'Normal Contrast' : 'High Contrast';
            this.announce(`Switched to ${this.isHighContrast ? 'high' : 'normal'} contrast mode`);
        }
    }

    setupSimulator() {
        this.simulator = {
            emissionLevel: 50,      // 0-100 (tons/hectare/year)
            recoveryYears: 0,       // 0-50 years
            soilType: 'sandy',      // sandy, loamy, clay
            management: 'none',     // none, liming, afforestation
            sulfurDeposition: 20,   // kg/ha/year
            nitrogenDeposition: 15  // kg/ha/year
        };

        // Setup control elements
        this.controls = {
            emissionLevel: document.getElementById('emission-level'),
            recoveryYears: document.getElementById('recovery-years'),
            soilType: document.getElementById('soil-type'),
            management: document.getElementById('management'),
            sulfurDep: document.getElementById('sulfur-deposition'),
            nitrogenDep: document.getElementById('nitrogen-deposition')
        };

        // Setup display elements
        this.displays = {
            soilPh: document.getElementById('soil-ph'),
            recoveryStatus: document.getElementById('recovery-status'),
            calciumLevel: document.getElementById('calcium-level'),
            magnesiumLevel: document.getElementById('magnesium-level'),
            aluminumLevel: document.getElementById('aluminum-level'),
            forestHealth: document.getElementById('forest-health'),
            soilVitality: document.getElementById('soil-vitality'),
            phBar: document.querySelector('.ph-bar'),
            calciumBar: document.querySelector('.calcium-fill'),
            magnesiumBar: document.querySelector('.magnesium-fill'),
            aluminumBar: document.querySelector('.aluminum-fill'),
            growthBar: document.querySelector('.growth-fill'),
            vitalityBar: document.querySelector('.vitality-fill')
        };
    }

    setupEventListeners() {
        // Simulator controls
        Object.keys(this.controls).forEach(key => {
            const control = this.controls[key];
            if (control) {
                if (control.type === 'range') {
                    control.addEventListener('input', () => this.updateSimulator(key));
                    control.addEventListener('change', () => this.runSimulation());
                } else {
                    control.addEventListener('change', () => this.runSimulation());
                }
            }
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Mechanism tabs
        document.querySelectorAll('.mechanism-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const panel = tab.getAttribute('data-panel');
                this.switchMechanismPanel(panel);
            });
        });

        // Window resize for charts
        window.addEventListener('resize', () => {
            this.resizeCharts();
        });
    }

    updateSimulator(key) {
        const control = this.controls[key];
        if (control && control.type === 'range') {
            this.simulator[key] = parseFloat(control.value);
            const valueDisplay = control.parentElement.querySelector('.control-value');
            if (valueDisplay) {
                const unit = key.includes('Years') ? ' years' :
                           key.includes('Level') ? ' t/ha/yr' : '';
                valueDisplay.textContent = this.simulator[key] + unit;
            }
        }
    }

    runSimulation() {
        // Update simulator values from controls
        Object.keys(this.controls).forEach(key => {
            const control = this.controls[key];
            if (control && control.type !== 'range') {
                this.simulator[key] = control.value;
            }
        });

        // Calculate acidification effects
        const results = this.calculateAcidification();

        // Update displays
        this.updateDisplays(results);

        // Update charts
        this.updateCharts(results);

        // Announce results for screen readers
        this.announceSimulationResults(results);
    }

    calculateAcidification() {
        const { emissionLevel, recoveryYears, soilType, management, sulfurDeposition, nitrogenDeposition } = this.simulator;

        // Base soil pH (neutral = 7.0)
        const basePh = 7.0;

        // Acid deposition effect (sulfur + nitrogen)
        const totalDeposition = sulfurDeposition + nitrogenDeposition;
        const acidLoad = (emissionLevel / 100) * totalDeposition * 0.1; // Simplified acid load factor

        // Soil type buffer capacity
        const bufferCapacity = {
            sandy: 0.3,   // Low buffering
            loamy: 0.6,   // Medium buffering
            clay: 0.9     // High buffering
        };

        // Management effects
        const managementEffect = {
            none: 0,
            liming: 0.5,      // pH increase
            afforestation: 0.3 // Natural recovery
        };

        // Current acidification
        const currentAcidification = acidLoad * (1 - bufferCapacity[soilType]);

        // Recovery over time (exponential decay)
        const recoveryRate = 0.05; // 5% recovery per year
        const timeRecovery = 1 - Math.exp(-recoveryRate * recoveryYears);

        // Management recovery
        const managementRecovery = managementEffect[management] * Math.min(recoveryYears / 10, 1);

        // Total recovery
        const totalRecovery = Math.min(timeRecovery + managementRecovery, 1);

        // Final pH
        const finalPh = basePh - currentAcidification + (currentAcidification * totalRecovery);

        // Nutrient availability (affected by pH)
        const calciumAvailability = Math.max(0, Math.min(100, 50 + (finalPh - 4) * 10));
        const magnesiumAvailability = Math.max(0, Math.min(100, 60 + (finalPh - 4) * 8));
        const aluminumToxicity = Math.max(0, Math.min(100, 100 - (finalPh - 3) * 25));

        // Ecosystem health
        const forestHealth = Math.max(0, Math.min(100, 40 + (finalPh - 4) * 15));
        const soilVitality = Math.max(0, Math.min(100, 50 + (finalPh - 4) * 12));

        // Recovery status
        let recoveryStatus = 'Critical';
        if (finalPh > 5.5) recoveryStatus = 'Good';
        else if (finalPh > 4.5) recoveryStatus = 'Moderate';
        else if (finalPh > 4.0) recoveryStatus = 'Poor';

        return {
            soilPh: finalPh.toFixed(1),
            recoveryStatus,
            calciumLevel: calciumAvailability.toFixed(0),
            magnesiumLevel: magnesiumAvailability.toFixed(0),
            aluminumLevel: aluminumToxicity.toFixed(0),
            forestHealth: forestHealth.toFixed(0),
            soilVitality: soilVitality.toFixed(0),
            phPercentage: ((finalPh - 3) / 4) * 100, // 3-7 pH range
            acidificationTrend: this.generateTrendData(recoveryYears, finalPh),
            depositionData: this.generateDepositionData()
        };
    }

    generateTrendData(years, finalPh) {
        const data = [];
        for (let i = 0; i <= years; i += Math.max(1, Math.floor(years / 10))) {
            const progress = i / Math.max(years, 1);
            const ph = 7.0 - (7.0 - finalPh) * (1 - progress);
            data.push({ year: i, ph: ph.toFixed(1) });
        }
        return data;
    }

    generateDepositionData() {
        return {
            labels: ['Sulfur Dioxide', 'Nitrogen Oxides', 'Total Acid'],
            sulfur: this.simulator.sulfurDeposition,
            nitrogen: this.simulator.nitrogenDeposition,
            total: this.simulator.sulfurDeposition + this.simulator.nitrogenDeposition
        };
    }

    updateDisplays(results) {
        // Update text displays
        Object.keys(results).forEach(key => {
            if (this.displays[key] && typeof results[key] === 'string') {
                this.displays[key].textContent = results[key];
            }
        });

        // Update progress bars
        if (this.displays.phBar) {
            this.displays.phBar.style.width = `${Math.max(0, Math.min(100, results.phPercentage))}%`;
        }

        if (this.displays.calciumBar) {
            this.displays.calciumBar.style.width = `${results.calciumLevel}%`;
        }

        if (this.displays.magnesiumBar) {
            this.displays.magnesiumBar.style.width = `${results.magnesiumLevel}%`;
        }

        if (this.displays.aluminumBar) {
            this.displays.aluminumBar.style.width = `${results.aluminumLevel}%`;
        }

        if (this.displays.growthBar) {
            this.displays.growthBar.style.width = `${results.forestHealth}%`;
        }

        if (this.displays.vitalityBar) {
            this.displays.vitalityBar.style.width = `${results.soilVitality}%`;
        }

        // Update status colors
        this.updateStatusColors(results);
    }

    updateStatusColors(results) {
        const statusElement = this.displays.recoveryStatus;
        if (statusElement) {
            statusElement.className = 'metric-value';
            switch (results.recoveryStatus) {
                case 'Good':
                    statusElement.classList.add('status-good');
                    break;
                case 'Moderate':
                    statusElement.classList.add('status-moderate');
                    break;
                case 'Poor':
                    statusElement.classList.add('status-poor');
                    break;
                case 'Critical':
                    statusElement.classList.add('status-critical');
                    break;
            }
        }
    }

    setupCharts() {
        // Acidification trend chart
        const trendCtx = document.getElementById('acidification-trend-chart');
        if (trendCtx) {
            this.charts.trend = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Soil pH',
                        data: [],
                        borderColor: 'var(--primary-acid)',
                        backgroundColor: 'rgba(255, 87, 34, 0.1)',
                        tension: 0.4,
                        fill: true
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
                                label: (context) => `pH: ${context.parsed.y}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Years After Emission Reduction'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Soil pH'
                            },
                            min: 3,
                            max: 7
                        }
                    },
                    animation: !this.isReducedMotion
                }
            });
        }

        // Deposition composition chart
        const depositionCtx = document.getElementById('deposition-composition-chart');
        if (depositionCtx) {
            this.charts.deposition = new Chart(depositionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Sulfur Deposition', 'Nitrogen Deposition'],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            'var(--deposition-sulfur)',
                            'var(--deposition-nitrogen)'
                        ],
                        borderWidth: 2,
                        borderColor: 'white'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.label}: ${context.parsed} kg/ha/year`
                            }
                        }
                    },
                    animation: !this.isReducedMotion
                }
            });
        }

        // Global impact chart
        const globalCtx = document.getElementById('global-impact-chart');
        if (globalCtx) {
            this.charts.global = new Chart(globalCtx, {
                type: 'bar',
                data: {
                    labels: ['Europe', 'North America', 'Asia', 'Global Average'],
                    datasets: [{
                        label: 'Soil pH Decline',
                        data: [0.8, 0.6, 0.4, 0.5],
                        backgroundColor: 'var(--primary-acid)',
                        borderColor: 'var(--primary-acid)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'pH Units Below Natural'
                            }
                        }
                    },
                    animation: !this.isReducedMotion
                }
            });
        }
    }

    updateCharts(results) {
        // Update trend chart
        if (this.charts.trend && results.acidificationTrend) {
            this.charts.trend.data.labels = results.acidificationTrend.map(d => d.year);
            this.charts.trend.data.datasets[0].data = results.acidificationTrend.map(d => d.ph);
            this.charts.trend.update();
        }

        // Update deposition chart
        if (this.charts.deposition && results.depositionData) {
            this.charts.deposition.data.datasets[0].data = [
                results.depositionData.sulfur,
                results.depositionData.nitrogen
            ];
            this.charts.deposition.update();
        }
    }

    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
    }

    setupNavigation() {
        // Smooth scrolling navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: this.isReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    navigateToSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Show section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Update URL hash
        history.pushState(null, null, `#${sectionId}`);

        this.announce(`Navigated to ${sectionId} section`);
    }

    setupTabs() {
        // Handle URL hash on load
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.navigateToSection(hash);
        }

        // Mechanism tabs
        this.switchMechanismPanel('deposition');
    }

    switchMechanismPanel(panelId) {
        // Update tab buttons
        document.querySelectorAll('.mechanism-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-panel="${panelId}"]`).classList.add('active');

        // Show panel
        document.querySelectorAll('.mechanism-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(panelId).classList.add('active');

        this.announce(`Switched to ${panelId} mechanism panel`);
    }

    handleTabNavigation(e) {
        // Enhanced keyboard navigation for interactive elements
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusedElement = document.activeElement;
        const focusableArray = Array.from(focusableElements);

        if (e.shiftKey) {
            // Shift + Tab
            const prevIndex = focusableArray.indexOf(focusedElement) - 1;
            if (prevIndex >= 0) {
                focusableArray[prevIndex].focus();
                e.preventDefault();
            }
        } else {
            // Tab
            const nextIndex = focusableArray.indexOf(focusedElement) + 1;
            if (nextIndex < focusableArray.length) {
                focusableArray[nextIndex].focus();
                e.preventDefault();
            }
        }
    }

    announceSimulationResults(results) {
        const announcement = `Simulation results: Soil pH is ${results.soilPh}, recovery status is ${results.recoveryStatus}, forest health is ${results.forestHealth} percent.`;
        this.announce(announcement);
    }

    setupPerformanceMonitoring() {
        // Monitor performance for large datasets
        this.performanceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 100) { // Log slow operations
                    console.warn(`Slow operation: ${entry.name} took ${entry.duration}ms`);
                }
            }
        });

        this.performanceObserver.observe({ entryTypes: ['measure'] });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AcidificationSimulator();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Could send to error reporting service
});

// Service worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker for caching
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}