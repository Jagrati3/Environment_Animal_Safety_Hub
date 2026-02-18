// Cyanobacterial Bloom Expansion - Cold Regions Interactive Features
// Interactive simulator, data visualizations, and accessibility enhancements

class BloomSimulator {
    constructor() {
        this.temperature = 15;
        this.phosphorus = 5;
        this.stratification = 'moderate';
        this.initializeElements();
        this.setupEventListeners();
        this.updateSimulator();
        this.initializeCharts();
    }

    initializeElements() {
        // Simulator controls
        this.temperatureInput = document.getElementById('temperature');
        this.temperatureValue = document.getElementById('temperature-value');
        this.phosphorusInput = document.getElementById('phosphorus');
        this.phosphorusValue = document.getElementById('phosphorus-value');
        this.stratificationSelect = document.getElementById('stratification');

        // Results display
        this.bloomRisk = document.getElementById('bloom-risk');
        this.riskBar = document.getElementById('risk-bar');
        this.toxinLevel = document.getElementById('toxin-level');
        this.toxinBar = document.getElementById('toxin-bar');
        this.bloomDuration = document.getElementById('bloom-duration');
        this.durationBar = document.getElementById('duration-bar');
        this.healthRisk = document.getElementById('health-risk');

        // Health indicators
        this.drinkingRisk = document.getElementById('drinking-risk');
        this.recreationRisk = document.getElementById('recreation-risk');
        this.ecosystemRisk = document.getElementById('ecosystem-risk');

        // Climate metrics
        this.stratificationDays = document.getElementById('stratification-days');
        this.hypolimnionTemp = document.getElementById('hypolimnion-temp');
        this.iceOut = document.getElementById('ice-out');
        this.mixingReduction = document.getElementById('mixing-reduction');
        this.nutrientRunoff = document.getElementById('nutrient-runoff');
        this.stormFrequency = document.getElementById('storm-frequency');
        this.snowmelt = document.getElementById('snowmelt');
        this.lakeLevel = document.getElementById('lake-level');
    }

    setupEventListeners() {
        // Simulator controls
        this.temperatureInput.addEventListener('input', (e) => {
            this.temperature = parseInt(e.target.value);
            this.temperatureValue.textContent = `${this.temperature}°C`;
            this.updateSimulator();
        });

        this.phosphorusInput.addEventListener('input', (e) => {
            this.phosphorus = parseInt(e.target.value);
            this.phosphorusValue.textContent = this.phosphorus;
            this.updateSimulator();
        });

        this.stratificationSelect.addEventListener('change', (e) => {
            this.stratification = e.target.value;
            this.updateSimulator();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = e.target.dataset.tab;
                this.switchTab(targetTab);
            });
        });

        // Mechanism tabs
        document.querySelectorAll('.mechanism-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const mechanism = e.target.dataset.mechanism;
                this.switchMechanism(mechanism);
            });
        });

        // Accessibility controls
        document.querySelectorAll('.accessibility-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleAccessibility(e.target.textContent.toLowerCase().replace(' ', '-'));
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    updateSimulator() {
        // Calculate bloom risk based on inputs
        const riskScore = this.calculateRiskScore();
        const toxinConcentration = this.calculateToxinConcentration();
        const duration = this.calculateBloomDuration();

        // Update displays
        this.updateRiskDisplay(riskScore);
        this.updateToxinDisplay(toxinConcentration);
        this.updateDurationDisplay(duration);
        this.updateHealthRisks(riskScore, toxinConcentration);

        // Update climate metrics
        this.updateClimateMetrics();
    }

    calculateRiskScore() {
        // Risk calculation based on temperature, phosphorus, and stratification
        let baseRisk = 0;

        // Temperature factor (optimal range: 15-25°C)
        if (this.temperature >= 15 && this.temperature <= 25) {
            baseRisk += 40;
        } else if (this.temperature >= 10 && this.temperature <= 30) {
            baseRisk += 20;
        }

        // Phosphorus factor (higher = more risk)
        baseRisk += this.phosphorus * 8;

        // Stratification factor
        const stratificationFactors = {
            'weak': 10,
            'moderate': 25,
            'strong': 40
        };
        baseRisk += stratificationFactors[this.stratification] || 25;

        return Math.min(100, Math.max(0, baseRisk));
    }

    calculateToxinConcentration() {
        // Toxin concentration in µg/L
        const baseToxin = 5;
        const tempFactor = Math.max(0, (this.temperature - 10) * 2);
        const phosphorusFactor = this.phosphorus * 3;
        const stratificationFactor = this.stratification === 'strong' ? 15 :
                                   this.stratification === 'moderate' ? 8 : 3;

        return Math.round(baseToxin + tempFactor + phosphorusFactor + stratificationFactor);
    }

    calculateBloomDuration() {
        // Duration in days
        const baseDuration = 30;
        const tempFactor = Math.max(0, (this.temperature - 10) * 2);
        const phosphorusFactor = this.phosphorus * 5;
        const stratificationFactor = this.stratification === 'strong' ? 30 :
                                   this.stratification === 'moderate' ? 15 : 5;

        return Math.round(baseDuration + tempFactor + phosphorusFactor + stratificationFactor);
    }

    updateRiskDisplay(riskScore) {
        let riskLevel, color;
        if (riskScore < 30) {
            riskLevel = 'Low';
            color = '#16a34a';
        } else if (riskScore < 60) {
            riskLevel = 'Medium';
            color = '#ca8a04';
        } else if (riskScore < 80) {
            riskLevel = 'High';
            color = '#ea580c';
        } else {
            riskLevel = 'Very High';
            color = '#dc2626';
        }

        this.bloomRisk.textContent = riskLevel;
        this.bloomRisk.style.color = color;
        this.riskBar.style.width = `${riskScore}%`;
        this.riskBar.style.background = `linear-gradient(90deg, ${color}, ${this.adjustColor(color, -20)})`;
    }

    updateToxinDisplay(concentration) {
        this.toxinLevel.textContent = `${concentration} µg/L`;
        const maxToxin = 50;
        const percentage = Math.min(100, (concentration / maxToxin) * 100);
        this.toxinBar.style.width = `${percentage}%`;
    }

    updateDurationDisplay(duration) {
        this.bloomDuration.textContent = `${duration} days`;
        const maxDuration = 120;
        const percentage = Math.min(100, (duration / maxDuration) * 100);
        this.durationBar.style.width = `${percentage}%`;
    }

    updateHealthRisks(riskScore, toxinConcentration) {
        // Drinking water risk
        const drinkingThreshold = 1; // µg/L
        const drinkingRisk = toxinConcentration > drinkingThreshold ? '🚫' : '✅';
        this.drinkingRisk.textContent = `${drinkingRisk} Drinking`;

        // Recreation risk
        const recreationThreshold = 6; // µg/L
        const recreationRisk = toxinConcentration > recreationThreshold ? '⚠️' : '✅';
        this.recreationRisk.textContent = `${recreationRisk} Recreation`;

        // Ecosystem risk
        const ecosystemRisk = riskScore > 50 ? '🔴' : riskScore > 25 ? '🟡' : '🟢';
        this.ecosystemRisk.textContent = `${ecosystemRisk} Ecosystem`;

        // Overall health risk
        let overallRisk;
        if (riskScore < 30 && toxinConcentration < 10) {
            overallRisk = 'Low';
        } else if (riskScore < 60 && toxinConcentration < 20) {
            overallRisk = 'Moderate';
        } else if (riskScore < 80 || toxinConcentration < 50) {
            overallRisk = 'High';
        } else {
            overallRisk = 'Very High';
        }
        this.healthRisk.textContent = overallRisk;
    }

    updateClimateMetrics() {
        // Dynamic climate impact metrics based on temperature
        const tempDiff = this.temperature - 10; // Compared to historical baseline

        this.stratificationDays.textContent = `+${Math.max(0, tempDiff * 3)} days`;
        this.hypolimnionTemp.textContent = `+${Math.max(0, tempDiff * 0.8).toFixed(1)}°C`;
        this.iceOut.textContent = `${Math.max(0, tempDiff * 2)} weeks`;
        this.mixingReduction.textContent = `${Math.min(80, Math.max(0, tempDiff * 8))}%`;

        this.nutrientRunoff.textContent = `+${Math.max(0, tempDiff * 5)}%`;
        this.stormFrequency.textContent = `+${Math.max(0, tempDiff * 12)}%`;
        this.snowmelt.textContent = `${Math.max(0, tempDiff)} weeks earlier`;
        this.lakeLevel.textContent = `±${Math.max(0, tempDiff * 0.3).toFixed(1)}m`;
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        // Scroll to top of content
        document.getElementById(tabName).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    switchMechanism(mechanism) {
        // Update mechanism tabs
        document.querySelectorAll('.mechanism-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-mechanism="${mechanism}"]`).classList.add('active');

        // Update mechanism panels
        document.querySelectorAll('.mechanism-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${mechanism}-panel`).classList.add('active');
    }

    handleAccessibility(feature) {
        const body = document.body;

        switch(feature) {
            case 'high-contrast':
                body.classList.toggle('high-contrast');
                break;
            case 'font-size':
                body.classList.toggle('large-font');
                break;
            case 'reduced-motion':
                body.classList.toggle('reduced-motion');
                break;
        }

        // Save preferences to localStorage
        this.saveAccessibilityPreferences();
    }

    saveAccessibilityPreferences() {
        const preferences = {
            highContrast: document.body.classList.contains('high-contrast'),
            largeFont: document.body.classList.contains('large-font'),
            reducedMotion: document.body.classList.contains('reduced-motion')
        };
        localStorage.setItem('bloom-simulator-accessibility', JSON.stringify(preferences));
    }

    loadAccessibilityPreferences() {
        const preferences = JSON.parse(localStorage.getItem('bloom-simulator-accessibility') || '{}');
        if (preferences.highContrast) document.body.classList.add('high-contrast');
        if (preferences.largeFont) document.body.classList.add('large-font');
        if (preferences.reducedMotion) document.body.classList.add('reduced-motion');
    }

    initializeCharts() {
        // Toxin production chart
        const toxinCtx = document.getElementById('toxinChart').getContext('2d');
        this.toxinChart = new Chart(toxinCtx, {
            type: 'radar',
            data: {
                labels: ['Microcystins', 'Anatoxins', 'Cylindrospermopsins', 'Saxitoxins', 'Nodularins', 'BMAA'],
                datasets: [{
                    label: 'Toxin Concentration (µg/L)',
                    data: [12, 8, 5, 3, 2, 1],
                    backgroundColor: 'rgba(22, 163, 74, 0.2)',
                    borderColor: 'rgba(22, 163, 74, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(22, 163, 74, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(22, 163, 74, 1)'
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
                    r: {
                        beginAtZero: true,
                        max: 15,
                        ticks: {
                            stepSize: 3
                        }
                    }
                }
            }
        });

        // Global expansion chart
        const expansionCtx = document.getElementById('expansionChart').getContext('2d');
        this.expansionChart = new Chart(expansionCtx, {
            type: 'bar',
            data: {
                labels: ['Europe', 'North America', 'Asia', 'Australia', 'South America', 'Africa'],
                datasets: [{
                    label: 'Countries with Bloom Expansion',
                    data: [18, 12, 8, 4, 3, 2],
                    backgroundColor: [
                        'rgba(30, 58, 138, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(96, 165, 250, 0.8)',
                        'rgba(22, 163, 74, 0.8)',
                        'rgba(132, 204, 22, 0.8)',
                        'rgba(202, 138, 4, 0.8)'
                    ],
                    borderColor: [
                        'rgba(30, 58, 138, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(96, 165, 250, 1)',
                        'rgba(22, 163, 74, 1)',
                        'rgba(132, 204, 22, 1)',
                        'rgba(202, 138, 4, 1)'
                    ],
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
                        max: 20,
                        ticks: {
                            stepSize: 4
                        }
                    }
                }
            }
        });
    }

    adjustColor(color, amount) {
        // Helper function to adjust color brightness
        const usePound = color[0] === '#';
        const col = usePound ? color.slice(1) : color;

        const num = parseInt(col, 16);
        let r = (num >> 16) + amount;
        let g = (num >> 8 & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;

        r = r > 255 ? 255 : r < 0 ? 0 : r;
        g = g > 255 ? 255 : g < 0 ? 0 : g;
        b = b > 255 ? 255 : b < 0 ? 0 : b;

        return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16);
    }

    // Performance monitoring
    monitorPerformance() {
        if ('performance' in window && 'memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                console.log(`Memory usage: ${Math.round(memory.usedJSHeapSize / 1048576)} MB`);
            }, 5000);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new BloomSimulator();

    // Load saved accessibility preferences
    simulator.loadAccessibilityPreferences();

    // Start performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        simulator.monitorPerformance();
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.tab) {
            simulator.switchTab(e.state.tab);
        }
    });

    // Update URL when switching tabs
    const originalSwitchTab = simulator.switchTab;
    simulator.switchTab = function(tabName) {
        originalSwitchTab.call(this, tabName);
        history.pushState({ tab: tabName }, '', `#${tabName}`);
    };

    // Handle initial URL hash
    if (window.location.hash) {
        const initialTab = window.location.hash.substring(1);
        if (['science', 'impacts', 'mechanisms', 'solutions'].includes(initialTab)) {
            setTimeout(() => simulator.switchTab(initialTab), 100);
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Could send error reports to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error reports to monitoring service
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    });
}