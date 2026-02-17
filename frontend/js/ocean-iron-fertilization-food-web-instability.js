// Ocean Iron Fertilization and Food Web Instability JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTabs();
    initializeCounters();
    initializeCharts();
    initializeSimulator();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Animated counters for hero stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100; // Adjust speed here
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Initialize experiment comparison charts
function initializeCharts() {
    // Phytoplankton Response Chart
    const phytoCtx = document.getElementById('phytoplanktonChart');
    if (phytoCtx) {
        new Chart(phytoCtx, {
            type: 'bar',
            data: {
                labels: ['IronEx I', 'SOFeX', 'EIFEX', 'LOHAFEX'],
                datasets: [{
                    label: 'Chlorophyll Increase (x-fold)',
                    data: [3, 2.5, 10, 3],
                    backgroundColor: 'rgba(231, 126, 34, 0.6)',
                    borderColor: 'rgba(231, 126, 34, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Fold Increase'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Carbon Export Chart
    const exportCtx = document.getElementById('exportChart');
    if (exportCtx) {
        new Chart(exportCtx, {
            type: 'doughnut',
            data: {
                labels: ['Exported to Deep Ocean', 'Remained in Surface', 'Respired'],
                datasets: [{
                    data: [25, 50, 25],
                    backgroundColor: [
                        'rgba(39, 174, 96, 0.6)',
                        'rgba(52, 152, 219, 0.6)',
                        'rgba(231, 76, 60, 0.6)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Food Web Impact Chart
    const foodwebCtx = document.getElementById('foodwebChart');
    if (foodwebCtx) {
        new Chart(foodwebCtx, {
            type: 'radar',
            data: {
                labels: ['Phytoplankton', 'Zooplankton', 'Fish Larvae', 'Carbon Export'],
                datasets: [{
                    label: 'Impact Magnitude',
                    data: [8, 6, 4, 7],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }
}

// Food web impact simulator
function initializeSimulator() {
    const ironSlider = document.getElementById('iron-concentration');
    const ironValue = document.getElementById('iron-value');
    const regionSelect = document.getElementById('ocean-region');
    const seasonSelect = document.getElementById('season');
    const runButton = document.getElementById('run-simulation');

    // Update iron concentration display
    ironSlider.addEventListener('input', function() {
        ironValue.textContent = this.value + ' μmol/L';
    });

    // Run simulation
    runButton.addEventListener('click', function() {
        runSimulation();
    });

    // Initialize with default values
    ironValue.textContent = ironSlider.value + ' μmol/L';
}

function runSimulation() {
    const iron = parseFloat(document.getElementById('iron-concentration').value);
    const region = document.getElementById('ocean-region').value;
    const season = document.getElementById('season').value;

    // Simulation parameters based on region and season
    const regionFactors = {
        southern: { phyto: 1.8, zoo: 1.3, fish: 0.8, export: 1.6 },
        equatorial: { phyto: 1.5, zoo: 1.2, fish: 0.9, export: 1.2 },
        subarctic: { phyto: 1.3, zoo: 1.1, fish: 0.95, export: 1.1 }
    };

    const seasonFactors = {
        spring: { phyto: 1.4, zoo: 1.2, fish: 1.1, export: 1.3 },
        summer: { phyto: 1.2, zoo: 1.0, fish: 0.9, export: 1.1 },
        fall: { phyto: 1.1, zoo: 0.9, fish: 0.8, export: 0.9 },
        winter: { phyto: 0.8, zoo: 0.7, fish: 0.6, export: 0.7 }
    };

    const regionFactor = regionFactors[region];
    const seasonFactor = seasonFactors[season];

    // Calculate iron effect (diminishing returns)
    const ironEffect = Math.min(iron / 2, 2);

    // Calculate results
    const phytoBiomass = Math.round((regionFactor.phyto * seasonFactor.phyto * ironEffect - 1) * 100);
    const zooResponse = Math.round((regionFactor.zoo * seasonFactor.zoo * ironEffect - 1) * 100);
    const fishRecruitment = Math.round((regionFactor.fish * seasonFactor.fish * ironEffect - 1) * 100);
    const carbonExport = Math.round((regionFactor.export * seasonFactor.export * ironEffect - 1) * 100);

    // Update display
    updateResult('phyto-biomass', phytoBiomass, 'phyto-bar');
    updateResult('zoo-response', zooResponse, 'zoo-bar');
    updateResult('fish-recruitment', fishRecruitment, 'fish-bar');
    updateResult('carbon-export', carbonExport, 'export-bar');

    // Update warnings
    updateWarnings(phytoBiomass, zooResponse, fishRecruitment);
}

function updateResult(elementId, value, barId) {
    const element = document.getElementById(elementId);
    const bar = document.getElementById(barId);

    // Update value display
    const sign = value >= 0 ? '+' : '';
    element.textContent = sign + value + '%';

    // Update color based on value
    if (value > 0) {
        element.style.color = '#27ae60';
    } else {
        element.style.color = '#e74c3c';
    }

    // Update bar width (normalize to 0-100%)
    const normalizedValue = Math.max(0, Math.min(100, 50 + value));
    bar.style.width = normalizedValue + '%';

    // Update bar color
    if (value > 50) {
        bar.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';
    } else if (value > 0) {
        bar.style.background = 'linear-gradient(90deg, #f39c12, #e67e22)';
    } else {
        bar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
    }
}

function updateWarnings(phyto, zoo, fish) {
    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = '';

    const warnings = [];

    if (phyto > zoo + 20) {
        warnings.push('Potential trophic mismatch: Phytoplankton growth exceeds grazer capacity');
    }

    if (fish < -20) {
        warnings.push('Significant risk to fish recruitment and fisheries');
    }

    if (phyto > 200) {
        warnings.push('Excessive bloom may lead to oxygen depletion');
    }

    if (warnings.length === 0) {
        warnings.push('Simulation indicates manageable ecosystem response');
    }

    warnings.forEach(warning => {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning-item';
        warningDiv.innerHTML = `
            <span class="warning-icon">⚠️</span>
            <span>${warning}</span>
        `;
        warningsContainer.appendChild(warningDiv);
    });
}

// Scenario analysis tabs
document.addEventListener('DOMContentLoaded', function() {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    const scenarioContents = document.querySelectorAll('.scenario-content');

    scenarioButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            scenarioButtons.forEach(btn => btn.classList.remove('active'));
            scenarioContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const scenarioId = button.dataset.scenario;
            document.getElementById(scenarioId).classList.add('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.ocean-region, .impact-item, .result-card, .scenario-btn').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click tracking for analytics (placeholder)
document.querySelectorAll('.tab-button, .scenario-btn, .simulate-btn').forEach(button => {
    button.addEventListener('click', function() {
        // In a real application, you would send this data to analytics
        console.log('Button clicked:', this.textContent.trim());
    });
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels where needed
    document.querySelectorAll('.tab-button').forEach(button => {
        const tabId = button.dataset.tab;
        button.setAttribute('aria-controls', tabId);
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });

    // Update ARIA selected when tabs change
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            button.setAttribute('aria-selected', 'true');
        });
    });

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-button.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = allTabs.indexOf(activeTab);

            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
            } else {
                newIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
            }

            allTabs[newIndex].click();
        }
    });

    // Add ARIA labels for form controls
    document.querySelectorAll('input[type="range"], select').forEach(control => {
        const label = control.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            control.setAttribute('aria-labelledby', label.id || label.textContent.replace(/\s+/g, '-').toLowerCase());
        }
    });
}

// Initialize accessibility improvements
improveAccessibility();

// Performance optimization: Lazy load charts
let chartsLoaded = false;
function lazyLoadCharts() {
    if (!chartsLoaded) {
        const chartContainers = document.querySelectorAll('.metric-chart');
        if (chartContainers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Charts are already initialized in initializeCharts()
                        chartsLoaded = true;
                        observer.unobserve(entry.target);
                    }
                });
            });
            chartContainers.forEach(container => {
                observer.observe(container);
            });
        }
    }
}

// Initialize lazy loading
lazyLoadCharts();

// Add loading animation for simulation results
function addSimulationAnimation() {
    const runButton = document.getElementById('run-simulation');
    if (runButton) {
        runButton.addEventListener('click', function() {
            this.textContent = 'Running Simulation...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = 'Run Simulation';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Initialize simulation animation
addSimulationAnimation();