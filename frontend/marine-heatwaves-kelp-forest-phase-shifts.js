// Marine Heatwaves and Kelp Forest Phase Shifts Interactive Features
// Interactive simulator, data visualizations, and accessibility enhancements

class HeatwaveSimulator {
    constructor() {
        this.temperature = 2.5;
        this.duration = 20;
        this.urchinDensity = 5;
        this.predatorPressure = 'moderate';
        this.initializeElements();
        this.setupEventListeners();
        this.updateSimulator();
        this.initializeCharts();
    }

    initializeElements() {
        // Simulator controls
        this.temperatureInput = document.getElementById('temperature');
        this.temperatureValue = document.getElementById('temperature-value');
        this.durationInput = document.getElementById('duration');
        this.durationValue = document.getElementById('duration-value');
        this.urchinDensityInput = document.getElementById('urchin-density');
        this.urchinDensityValue = document.getElementById('urchin-density-value');
        this.predatorPressureSelect = document.getElementById('predator-pressure');

        // Results display
        this.phaseShiftRisk = document.getElementById('phase-shift-risk');
        this.riskBar = document.getElementById('risk-bar');
        this.kelpSurvival = document.getElementById('kelp-survival');
        this.kelpBar = document.getElementById('kelp-bar');
        this.urchinGrowth = document.getElementById('urchin-growth');
        this.urchinBar = document.getElementById('urchin-bar');
        this.recoveryTime = document.getElementById('recovery-time');

        // Recovery indicators
        this.naturalRecovery = document.getElementById('natural-recovery');
        this.assistedRecovery = document.getElementById('assisted-recovery');
        this.activeRestoration = document.getElementById('active-restoration');

        // Climate metrics
        this.hwDuration = document.getElementById('hw-duration');
        this.hwIntensity = document.getElementById('hw-intensity');
        this.hwFrequency = document.getElementById('hw-frequency');
        this.hwSpatial = document.getElementById('hw-spatial');
        this.blockingEvents = document.getElementById('blocking-events');
        this.upwellingReduction = document.getElementById('upwelling-reduction');
        this.stratificationIncrease = document.getElementById('stratification-increase');
        this.currentShifts = document.getElementById('current-shifts');
    }

    setupEventListeners() {
        // Simulator controls
        this.temperatureInput.addEventListener('input', (e) => {
            this.temperature = parseFloat(e.target.value);
            this.temperatureValue.textContent = `${this.temperature}°C`;
            this.updateSimulator();
        });

        this.durationInput.addEventListener('input', (e) => {
            this.duration = parseInt(e.target.value);
            this.durationValue.textContent = `${this.duration} days`;
            this.updateSimulator();
        });

        this.urchinDensityInput.addEventListener('input', (e) => {
            this.urchinDensity = parseInt(e.target.value);
            this.urchinDensityValue.textContent = this.urchinDensity;
            this.updateSimulator();
        });

        this.predatorPressureSelect.addEventListener('change', (e) => {
            this.predatorPressure = e.target.value;
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
        // Calculate phase shift risk based on inputs
        const riskScore = this.calculateRiskScore();
        const kelpSurvivalRate = this.calculateKelpSurvival();
        const urchinGrowthRate = this.calculateUrchinGrowth();
        const recoveryTimeYears = this.calculateRecoveryTime();

        // Update displays
        this.updateRiskDisplay(riskScore);
        this.updateKelpDisplay(kelpSurvivalRate);
        this.updateUrchinDisplay(urchinGrowthRate);
        this.updateRecoveryDisplay(recoveryTimeYears);

        // Update climate metrics
        this.updateClimateMetrics();
    }

    calculateRiskScore() {
        // Risk calculation based on temperature, duration, urchin density, and predator pressure
        let baseRisk = 0;

        // Temperature factor (higher = more risk)
        baseRisk += this.temperature * 15;

        // Duration factor (longer = more risk)
        baseRisk += (this.duration / 30) * 25;

        // Urchin density factor (higher = more risk)
        baseRisk += this.urchinDensity * 4;

        // Predator pressure factor (lower pressure = more risk)
        const predatorFactors = {
            'high': -20,
            'moderate': 0,
            'low': 15
        };
        baseRisk += predatorFactors[this.predatorPressure] || 0;

        return Math.min(100, Math.max(0, baseRisk));
    }

    calculateKelpSurvival() {
        // Kelp survival rate as percentage
        const baseSurvival = 100;
        const tempFactor = Math.max(0, (this.temperature - 1) * 15);
        const durationFactor = Math.max(0, (this.duration - 10) * 2);
        const urchinFactor = this.urchinDensity * 3;
        const predatorFactor = this.predatorPressure === 'high' ? -10 :
                              this.predatorPressure === 'moderate' ? 0 : 10;

        return Math.max(0, Math.min(100, baseSurvival - tempFactor - durationFactor - urchinFactor + predatorFactor));
    }

    calculateUrchinGrowth() {
        // Urchin population growth rate as percentage
        const baseGrowth = 100;
        const tempFactor = Math.max(0, (this.temperature - 1) * 20);
        const durationFactor = Math.max(0, (this.duration - 10) * 5);
        const densityFactor = this.urchinDensity * 2;
        const predatorFactor = this.predatorPressure === 'high' ? -50 :
                              this.predatorPressure === 'moderate' ? 0 : 25;

        return Math.max(0, baseGrowth + tempFactor + durationFactor + densityFactor + predatorFactor);
    }

    calculateRecoveryTime() {
        // Recovery time in years
        const baseTime = 2;
        const riskFactor = (100 - this.calculateKelpSurvival()) / 10;
        const urchinFactor = this.urchinDensity / 5;
        const predatorFactor = this.predatorPressure === 'high' ? -1 :
                              this.predatorPressure === 'moderate' ? 0 : 2;

        return Math.max(1, Math.round(baseTime + riskFactor + urchinFactor + predatorFactor));
    }

    updateRiskDisplay(riskScore) {
        let riskLevel, color;
        if (riskScore < 30) {
            riskLevel = 'Low';
            color = '#16a34a';
        } else if (riskScore < 60) {
            riskLevel = 'Moderate';
            color = '#ca8a04';
        } else if (riskScore < 80) {
            riskLevel = 'High';
            color = '#ea580c';
        } else {
            riskLevel = 'Very High';
            color = '#dc2626';
        }

        this.phaseShiftRisk.textContent = riskLevel;
        this.phaseShiftRisk.style.color = color;
        this.riskBar.style.width = `${riskScore}%`;
        this.riskBar.style.background = `linear-gradient(90deg, ${color}, ${this.adjustColor(color, -20)})`;
    }

    updateKelpDisplay(survivalRate) {
        this.kelpSurvival.textContent = `${survivalRate}%`;
        this.kelpBar.style.width = `${survivalRate}%`;
    }

    updateUrchinDisplay(growthRate) {
        this.urchinGrowth.textContent = `+${growthRate}%`;
        const percentage = Math.min(100, growthRate);
        this.urchinBar.style.width = `${percentage}%`;
    }

    updateRecoveryDisplay(years) {
        this.recoveryTime.textContent = `${years} years`;

        // Update recovery indicators
        const natural = years <= 3 ? '🟢' : years <= 7 ? '🟡' : '🔴';
        const assisted = years <= 5 ? '🟢' : years <= 10 ? '🟡' : '🔴';
        const active = years <= 2 ? '🟢' : years <= 5 ? '🟡' : '🔴';

        this.naturalRecovery.textContent = `${natural} Natural`;
        this.assistedRecovery.textContent = `${assisted} Assisted`;
        this.activeRestoration.textContent = `${active} Active`;
    }

    updateClimateMetrics() {
        // Dynamic climate impact metrics based on temperature
        const tempMultiplier = this.temperature / 2.5;

        this.hwDuration.textContent = `${Math.round(5 + (tempMultiplier * 25))}-30 days`;
        this.hwIntensity.textContent = `${(2 + (tempMultiplier * 3)).toFixed(1)}-5°C above normal`;
        this.hwFrequency.textContent = `${Math.round(3 + (tempMultiplier * 2))}-4 events/decade`;
        this.hwSpatial.textContent = `${Math.round(100 + (tempMultiplier * 900))}-1000s km²`;

        this.blockingEvents.textContent = `+${Math.round(45 + (tempMultiplier * 20))}%`;
        this.upwellingReduction.textContent = `${Math.round(60 + (tempMultiplier * 20))}%`;
        this.stratificationIncrease.textContent = `+${Math.round(25 + (tempMultiplier * 15))}%`;
        this.currentShifts.textContent = `±${(2 + (tempMultiplier * 1)).toFixed(1)}-3 knots`;
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
        localStorage.setItem('heatwave-simulator-accessibility', JSON.stringify(preferences));
    }

    loadAccessibilityPreferences() {
        const preferences = JSON.parse(localStorage.getItem('heatwave-simulator-accessibility') || '{}');
        if (preferences.highContrast) document.body.classList.add('high-contrast');
        if (preferences.largeFont) document.body.classList.add('large-font');
        if (preferences.reducedMotion) document.body.classList.add('reduced-motion');
    }

    initializeCharts() {
        // Kelp vulnerability chart
        const vulnerabilityCtx = document.getElementById('vulnerabilityChart').getContext('2d');
        this.vulnerabilityChart = new Chart(vulnerabilityCtx, {
            type: 'radar',
            data: {
                labels: ['Giant Kelp', 'Bull Kelp', 'Ecklonia', 'Laminaria', 'Sargassum', 'Fucus'],
                datasets: [{
                    label: 'Heatwave Vulnerability',
                    data: [85, 75, 70, 65, 60, 55],
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
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });

        // Heatwave trends chart
        const trendsCtx = document.getElementById('heatwaveTrendsChart').getContext('2d');
        this.trendsChart = new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: ['1980', '1990', '2000', '2010', '2020', '2030'],
                datasets: [{
                    label: 'Heatwave Frequency (events/decade)',
                    data: [1, 1.5, 2, 3, 4, 5.5],
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
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
                        max: 6,
                        ticks: {
                            stepSize: 1
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
    const simulator = new HeatwaveSimulator();

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