// Climate-Driven Tree Line Advancement - JavaScript
// Interactive simulator and visualizations for biodiversity shifts

class TreeLineSimulator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateSimulator();
        this.setupAccessibility();
        this.setupNavigation();
        this.setupMechanismExplorer();
    }

    initializeElements() {
        // Simulator controls
        this.temperatureSlider = document.getElementById('temperature-increase');
        this.co2Slider = document.getElementById('co2-level');
        this.precipitationSlider = document.getElementById('precipitation-change');
        this.regionSelect = document.getElementById('region-select');

        // Control value displays
        this.temperatureValue = document.getElementById('temperature-value');
        this.co2Value = document.getElementById('co2-value');
        this.precipitationValue = document.getElementById('precipitation-value');

        // Result displays
        this.advancementRate = document.getElementById('advancement-rate');
        this.biodiversityImpact = document.getElementById('biodiversity-impact');
        this.carbonSequestration = document.getElementById('carbon-sequestration');
        this.ecosystemState = document.getElementById('ecosystem-state');

        // Risk indicators
        this.advancementBar = document.getElementById('advancement-bar');
        this.carbonBar = document.getElementById('carbon-bar');
        this.tundraFill = document.getElementById('tundra-fill');
        this.forestFill = document.getElementById('forest-fill');

        // Impact indicators
        this.speciesLoss = document.getElementById('species-loss');
        this.habitatChange = document.getElementById('habitat-change');
        this.carbonImpact = document.getElementById('carbon-impact');

        // Climate metrics
        this.arcticTemp = document.getElementById('arctic-temp');
        this.alpineTemp = document.getElementById('alpine-temp');
        this.growingSeason = document.getElementById('growing-season');
        this.frostFreq = document.getElementById('frost-freq');

        // CO2 effects
        this.photosynthesis = document.getElementById('photosynthesis');
        this.waterUse = document.getElementById('water-use');
        this.nutrientUptake = document.getElementById('nutrient-uptake');
        this.herbivory = document.getElementById('herbivory');
    }

    setupEventListeners() {
        // Simulator controls
        this.temperatureSlider.addEventListener('input', () => this.updateSimulator());
        this.co2Slider.addEventListener('input', () => this.updateSimulator());
        this.precipitationSlider.addEventListener('input', () => this.updateSimulator());
        this.regionSelect.addEventListener('change', () => this.updateSimulator());

        // Update value displays
        this.temperatureSlider.addEventListener('input', (e) => {
            this.temperatureValue.textContent = e.target.value + '°C';
        });

        this.co2Slider.addEventListener('input', (e) => {
            this.co2Value.textContent = e.target.value;
        });

        this.precipitationSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.precipitationValue.textContent = (value > 0 ? '+' : '') + value + '%';
        });
    }

    updateSimulator() {
        const temperature = parseFloat(this.temperatureSlider.value);
        const co2 = parseFloat(this.co2Slider.value);
        const precipitation = parseFloat(this.precipitationSlider.value);
        const region = this.regionSelect.value;

        // Calculate advancement rate
        const advancementRate = this.calculateAdvancementRate(temperature, co2, precipitation, region);
        this.updateAdvancementDisplay(advancementRate);

        // Calculate biodiversity impact
        const biodiversityImpact = this.calculateBiodiversityImpact(temperature, co2, region);
        this.updateBiodiversityDisplay(biodiversityImpact);

        // Calculate carbon sequestration
        const carbonSequestration = this.calculateCarbonSequestration(temperature, co2, advancementRate);
        this.updateCarbonDisplay(carbonSequestration);

        // Update ecosystem state
        const ecosystemState = this.calculateEcosystemState(advancementRate);
        this.updateEcosystemState(ecosystemState);

        // Update climate metrics
        this.updateClimateMetrics(temperature, co2);
    }

    calculateAdvancementRate(temperature, co2, precipitation, region) {
        // Base calculations with regional modifiers
        const regionalModifiers = {
            arctic: 1.0,
            rockies: 0.8,
            tibet: 0.9,
            patagonia: 0.6,
            alaska: 1.2
        };

        const tempFactor = temperature * 8; // 8m per °C
        const co2Factor = (co2 - 280) * 0.02; // 0.02m per ppm above pre-industrial
        const precipFactor = precipitation * 0.1; // 0.1m per % precipitation change

        const baseRate = tempFactor + co2Factor + precipFactor;
        return Math.round(baseRate * regionalModifiers[region] * 10) / 10;
    }

    calculateBiodiversityImpact(temperature, co2, region) {
        const totalStress = temperature + (co2 - 280) * 0.01;

        if (totalStress < 1.5) return 'Low';
        if (totalStress < 3.0) return 'Moderate';
        if (totalStress < 4.5) return 'High';
        return 'Critical';
    }

    calculateCarbonSequestration(temperature, co2, advancementRate) {
        // Carbon sequestration in Pg C over 50 years
        const areaConverted = advancementRate * 0.5; // km² per decade
        const sequestrationRate = 0.5; // Mg C/ha/year
        const sequestration = areaConverted * sequestrationRate * 50 / 1000; // Convert to Pg
        return Math.round(sequestration * 100) / 100;
    }

    calculateEcosystemState(advancementRate) {
        if (advancementRate < 20) return 'Stable Tundra';
        if (advancementRate < 50) return 'Early Transition';
        if (advancementRate < 80) return 'Active Transition';
        return 'Forest Dominated';
    }

    updateAdvancementDisplay(rate) {
        this.advancementRate.textContent = rate + ' m/decade';
        const percentage = Math.min((rate / 100) * 100, 100);
        this.advancementBar.style.width = percentage + '%';
    }

    updateBiodiversityDisplay(impact) {
        this.biodiversityImpact.textContent = impact;

        // Update impact indicators
        const indicators = [this.speciesLoss, this.habitatChange, this.carbonImpact];
        indicators.forEach(indicator => {
            indicator.style.opacity = impact === 'Low' ? '0.3' : '1';
        });

        // Color coding based on impact level
        const colors = {
            'Low': '#4CAF50',
            'Moderate': '#FF9800',
            'High': '#F44336',
            'Critical': '#B71C1C'
        };

        this.biodiversityImpact.style.color = colors[impact] || '#34495E';
    }

    updateCarbonDisplay(sequestration) {
        const sign = sequestration > 0 ? '+' : '';
        this.carbonSequestration.textContent = sign + sequestration + ' Pg C';
        const percentage = Math.min(Math.abs(sequestration) / 5 * 100, 100);
        this.carbonBar.style.width = percentage + '%';
    }

    updateEcosystemState(state) {
        this.ecosystemState.textContent = state;

        // Update state indicators based on advancement
        let tundraPercent = 100;
        let forestPercent = 0;

        switch(state) {
            case 'Stable Tundra':
                tundraPercent = 90;
                forestPercent = 10;
                break;
            case 'Early Transition':
                tundraPercent = 70;
                forestPercent = 30;
                break;
            case 'Active Transition':
                tundraPercent = 50;
                forestPercent = 50;
                break;
            case 'Forest Dominated':
                tundraPercent = 20;
                forestPercent = 80;
                break;
        }

        this.tundraFill.style.width = tundraPercent + '%';
        this.forestFill.style.width = forestPercent + '%';
    }

    updateClimateMetrics(temperature, co2) {
        // Update temperature metrics
        this.arcticTemp.textContent = '+' + (2.1 + temperature * 0.5).toFixed(1) + '°C';
        this.alpineTemp.textContent = '+' + (1.8 + temperature * 0.4).toFixed(1) + '°C';
        this.growingSeason.textContent = '+' + Math.round(15 + temperature * 3) + ' days';
        this.frostFreq.textContent = '-' + Math.round(40 + temperature * 5) + '%';

        // Update CO2 effects
        const co2Increase = (co2 - 280) / 280 * 100;
        this.photosynthesis.textContent = '+' + Math.round(25 + co2Increase * 0.1) + '%';
        this.waterUse.textContent = '+' + Math.round(15 + co2Increase * 0.05) + '%';
        this.nutrientUptake.textContent = '+' + Math.round(20 + co2Increase * 0.07) + '%';
        this.herbivory.textContent = '-' + Math.round(10 + co2Increase * 0.03) + '%';
    }

    initializeCharts() {
        this.initializeAdvancementChart();
        this.initializeGlobalTreeLineChart();
    }

    initializeAdvancementChart() {
        const ctx = document.getElementById('advancementChart').getContext('2d');

        const data = {
            labels: ['Coniferous', 'Deciduous', 'Shrubs'],
            datasets: [{
                label: 'Advancement Rate (m/decade)',
                data: [75, 45, 25],
                backgroundColor: [
                    'rgba(46, 125, 50, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.8)'
                ],
                borderColor: [
                    'rgba(46, 125, 50, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(139, 195, 74, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
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
                                return context.parsed.y + ' m/decade advancement';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Advancement Rate (m/decade)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tree Type'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        this.advancementChart = new Chart(ctx, config);
    }

    initializeGlobalTreeLineChart() {
        const ctx = document.getElementById('globalTreeLineChart').getContext('2d');

        const data = {
            labels: ['Arctic Tundra', 'Rocky Mountains', 'Tibetan Plateau', 'Patagonia', 'Alaska', 'Other Regions'],
            datasets: [{
                label: 'Tundra Area at Risk (million km²)',
                data: [3.2, 1.8, 2.1, 0.9, 1.5, 1.5],
                backgroundColor: [
                    'rgba(179, 229, 252, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(255, 152, 0, 0.8)',
                    'rgba(244, 67, 54, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(121, 85, 72, 0.8)'
                ],
                borderColor: [
                    'rgba(179, 229, 252, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 152, 0, 1)',
                    'rgba(244, 67, 54, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(121, 85, 72, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed + ' million km² at risk';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        };

        this.globalTreeLineChart = new Chart(ctx, config);
    }

    setupAccessibility() {
        // High contrast toggle
        window.toggleHighContrast = () => {
            document.body.classList.toggle('high-contrast');
            this.announceToScreenReader('High contrast mode ' +
                (document.body.classList.contains('high-contrast') ? 'enabled' : 'disabled'));
        };

        // Font size toggle
        window.toggleFontSize = () => {
            const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
            const newSize = currentSize === 16 ? 20 : 16;
            document.body.style.fontSize = newSize + 'px';
            this.announceToScreenReader('Font size ' + (newSize === 20 ? 'increased' : 'normal'));
        };

        // Reduced motion toggle
        window.toggleReducedMotion = () => {
            const currentPref = document.body.style.getPropertyValue('--transition-fast');
            const newPref = currentPref === '0.01ms ease' ? '0.2s ease' : '0.01ms ease';
            document.body.style.setProperty('--transition-fast', newPref);
            document.body.style.setProperty('--transition-normal', newPref);
            document.body.style.setProperty('--transition-slow', newPref);
            this.announceToScreenReader('Reduced motion ' +
                (newPref === '0.01ms ease' ? 'enabled' : 'disabled'));
        };
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        document.body.appendChild(announcement);
        announcement.textContent = message;

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = e.target.dataset.tab;

                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                // Show target section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetTab) {
                        section.classList.add('active');
                    }
                });

                // Smooth scroll to section
                document.getElementById(targetTab).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    setupMechanismExplorer() {
        const mechanismTabs = document.querySelectorAll('.mechanism-tab');
        const mechanismPanels = document.querySelectorAll('.mechanism-panel');

        mechanismTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const mechanism = tab.dataset.mechanism;

                // Update active tab
                mechanismTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show corresponding panel
                mechanismPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === mechanism + '-panel') {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    // Performance monitoring
    monitorPerformance() {
        if ('performance' in window && 'mark' in window.performance) {
            performance.mark('simulator-initialized');

            // Monitor simulator updates
            this.updateStartTime = 0;
            this.originalUpdateSimulator = this.updateSimulator;

            this.updateSimulator = () => {
                this.updateStartTime = performance.now();
                this.originalUpdateSimulator();
                const updateTime = performance.now() - this.updateStartTime;

                if (updateTime > 16.67) { // More than one frame at 60fps
                    console.warn('Simulator update took longer than 16.67ms:', updateTime);
                }
            };
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new TreeLineSimulator();

    // Performance monitoring
    simulator.monitorPerformance();

    // Add loading animation
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 100);

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.content-card, .case-study, .solution-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Keyboard navigation for simulator
    document.addEventListener('keydown', (e) => {
        const focused = document.activeElement;

        if (focused && focused.type === 'range') {
            const step = parseFloat(focused.step) || 1;
            const min = parseFloat(focused.min) || 0;
            const max = parseFloat(focused.max) || 100;
            let value = parseFloat(focused.value);

            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                e.preventDefault();
                value = Math.min(value + step, max);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                e.preventDefault();
                value = Math.max(value - step, min);
            }

            focused.value = value;
            focused.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    // Add resize handler for charts
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (simulator.advancementChart) {
                simulator.advancementChart.resize();
            }
            if (simulator.globalTreeLineChart) {
                simulator.globalTreeLineChart.resize();
            }
        }, 250);
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send to error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to error reporting service
});