// Duration Compression in Warming Arctic Waters - Interactive JavaScript
// Comprehensive functionality for data visualization, calculations, and user interactions

// Global variables for charts and data
let diapauseCompressionChart;
let thermalRegulationChart;
let populationImpactChart;
let energyThresholdChart;
let calculatorChart;
let solutionEffectivenessChart;
let researchPriorityChart;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    initializeCalculator();
    setupAccessibility();
    loadInitialData();
});

// Initialize all Chart.js charts
function initializeCharts() {
    initializeDiapauseCompressionChart();
    initializeThermalRegulationChart();
    initializePopulationImpactChart();
    initializeEnergyThresholdChart();
    initializeCalculatorChart();
    initializeSolutionEffectivenessChart();
    initializeResearchPriorityChart();
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => showTab(button.getAttribute('onclick').match(/'([^']+)'/)[1]));
    });

    // Calculator button
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCompression);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Window resize handling
    window.addEventListener('resize', handleResize);

    // Scroll animations
    setupScrollAnimations();
}

// Setup accessibility features
function setupAccessibility() {
    // Skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // ARIA labels and roles
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        tabs.setAttribute('role', 'tablist');
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((content, index) => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', `tab-${index}`);
        if (index !== 0) {
            content.setAttribute('hidden', '');
        }
    });
}

// Load initial data and setup
function loadInitialData() {
    // Simulate loading data from API or local storage
    setTimeout(() => {
        updateChartsWithData();
        hideLoadingStates();
    }, 1000);
}

// Hide loading states after data is loaded
function hideLoadingStates() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.classList.remove('loading');
    });
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    const activeElement = document.activeElement;

    // Tab navigation for tabs
    if (activeElement.classList.contains('tab-btn')) {
        const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
        const currentIndex = tabButtons.indexOf(activeElement);

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % tabButtons.length;
            tabButtons[nextIndex].focus();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
            tabButtons[prevIndex].focus();
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activeElement.click();
        }
    }
}

// Handle window resize
function handleResize() {
    // Debounce chart resizing
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        if (diapauseCompressionChart) {
            diapauseCompressionChart.resize();
        }
        if (thermalRegulationChart) {
            thermalRegulationChart.resize();
        }
        if (populationImpactChart) {
            populationImpactChart.resize();
        }
        if (energyThresholdChart) {
            energyThresholdChart.resize();
        }
        if (calculatorChart) {
            calculatorChart.resize();
        }
        if (solutionEffectivenessChart) {
            solutionEffectivenessChart.resize();
        }
        if (researchPriorityChart) {
            researchPriorityChart.resize();
        }
    }, 250);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-card, .process-card, .chart-container');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.setAttribute('hidden', '');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('tabindex', '-1');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.removeAttribute('hidden');
    }

    // Activate selected tab button
    const selectedButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
        selectedButton.setAttribute('aria-selected', 'true');
        selectedButton.setAttribute('tabindex', '0');
        selectedButton.focus();
    }

    // Update URL hash without triggering scroll
    history.replaceState(null, null, `#${tabName}`);

    // Trigger chart resize if tab contains charts
    setTimeout(() => {
        if (window.Chart) {
            window.Chart.helpers.each(window.Chart.instances, function(instance) {
                instance.resize();
            });
        }
    }, 100);
}

// Initialize diapause compression chart
function initializeDiapauseCompressionChart() {
    const ctx = document.getElementById('diapauseCompressionChart');
    if (!ctx) return;

    const data = {
        labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2030', '2040', '2050'],
        datasets: [{
            label: 'Diapause Duration (days)',
            data: [180, 175, 170, 165, 160, 155, 150, 145, 135, 125, 115],
            borderColor: '#1e3a8a',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Winter Temperature (°C)',
            data: [-2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.3, -1.1, -0.8, -0.5, -0.2],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            yAxisID: 'y1',
            tension: 0.4
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Diapause Duration vs Winter Temperature Trends',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += context.parsed.y + ' days';
                            } else {
                                label += context.parsed.y + '°C';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Diapause Duration (days)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Winter Temperature (°C)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    };

    diapauseCompressionChart = new Chart(ctx, config);
}

// Initialize thermal regulation chart
function initializeThermalRegulationChart() {
    const ctx = document.getElementById('thermalRegulationChart');
    if (!ctx) return;

    const data = {
        labels: ['-2°C', '-1°C', '0°C', '1°C', '2°C', '3°C'],
        datasets: [{
            label: 'Metabolic Rate Increase (%)',
            data: [0, 15, 32, 52, 75, 101],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Diapause Duration Reduction (%)',
            data: [0, 8, 18, 29, 42, 58],
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Effects on Metabolism and Diapause',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Winter Temperature (°C)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Change from Baseline (%)'
                    }
                }
            }
        }
    };

    thermalRegulationChart = new Chart(ctx, config);
}

// Initialize population impact chart
function initializePopulationImpactChart() {
    const ctx = document.getElementById('populationImpactChart');
    if (!ctx) return;

    const data = {
        labels: ['Copepods', 'Euphausiids', 'Amphipods', 'Fish Larvae', 'Bivalves', 'Other Zooplankton'],
        datasets: [{
            label: 'Current Population Impact (%)',
            data: [35, 42, 28, 67, 19, 31],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: '#ef4444',
            borderWidth: 1
        }, {
            label: 'Projected 2050 Impact (%)',
            data: [58, 71, 45, 89, 33, 52],
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: '#f59e0b',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Population Impacts by Taxonomic Group',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Taxonomic Group'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Population Impact (%)'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    populationImpactChart = new Chart(ctx, config);
}

// Initialize energy threshold chart
function initializeEnergyThresholdChart() {
    const ctx = document.getElementById('energyThresholdChart');
    if (!ctx) return;

    const data = {
        labels: ['Copepods', 'Euphausiids', 'Amphipods', 'Fish Larvae', 'Bivalves'],
        datasets: [{
            label: 'Survival Threshold (% lipids)',
            data: [15, 20, 10, 8, 5],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: '#10b981',
            borderWidth: 1
        }, {
            label: 'Reproduction Threshold (% lipids)',
            data: [25, 35, 20, 15, 12],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 1
        }, {
            label: 'Current Average (% lipids)',
            data: [22, 28, 18, 12, 9],
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: '#f59e0b',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Energy Thresholds by Species',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Species Group'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Lipid Content (%)'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    energyThresholdChart = new Chart(ctx, config);
}

// Initialize calculator chart
function initializeCalculatorChart() {
    const ctx = document.getElementById('calculatorChart');
    if (!ctx) return;

    const data = {
        labels: ['Baseline', 'Current', 'Future', 'Critical'],
        datasets: [{
            label: 'Lipid Reserves (% body weight)',
            data: [30, 25, 18, 15],
            borderColor: '#1e3a8a',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Lipid Reserve Projections',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Scenario'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Lipid Content (%)'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    calculatorChart = new Chart(ctx, config);
}

// Initialize solution effectiveness chart
function initializeSolutionEffectivenessChart() {
    const ctx = document.getElementById('solutionEffectivenessChart');
    if (!ctx) return;

    const data = {
        labels: ['Marine Protected Areas', 'Fishing Restrictions', 'Habitat Restoration', 'Climate Mitigation', 'Research & Monitoring'],
        datasets: [{
            label: 'Effectiveness Score (1-10)',
            data: [7.5, 8.2, 6.8, 9.1, 7.9],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(139, 92, 246, 0.8)'
            ],
            borderColor: [
                '#10b981',
                '#3b82f6',
                '#f59e0b',
                '#ef4444',
                '#8b5cf6'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Solution Effectiveness Assessment',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    };

    solutionEffectivenessChart = new Chart(ctx, config);
}

// Initialize research priority chart
function initializeResearchPriorityChart() {
    const ctx = document.getElementById('researchPriorityChart');
    if (!ctx) return;

    const data = {
        labels: ['Thermal Physiology', 'Energy Metabolism', 'Population Dynamics', 'Climate Modeling', 'Conservation Strategies', 'Monitoring Methods'],
        datasets: [{
            label: 'Research Priority Score',
            data: [9.2, 8.8, 8.5, 9.5, 8.1, 7.9],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'horizontalBar',
        data: data,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Research Priority Areas',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Priority Score (1-10)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Research Area'
                    }
                }
            }
        }
    };

    researchPriorityChart = new Chart(ctx, config);
}

// Initialize calculator functionality
function initializeCalculator() {
    // Set default values
    updateCalculatorDefaults();
}

// Update calculator with default values
function updateCalculatorDefaults() {
    const speciesSelect = document.getElementById('species');
    const currentTempInput = document.getElementById('currentTemp');
    const futureTempInput = document.getElementById('futureTemp');
    const initialLipidsInput = document.getElementById('initialLipids');
    const diapauseDurationInput = document.getElementById('diapauseDuration');

    if (speciesSelect && currentTempInput && futureTempInput && initialLipidsInput && diapauseDurationInput) {
        // Set defaults based on selected species
        updateSpeciesDefaults(speciesSelect.value);
    }
}

// Update calculator defaults based on species
function updateSpeciesDefaults(species) {
    const speciesData = {
        copepod: { lipids: 25, duration: 120 },
        euphausiid: { lipids: 35, duration: 150 },
        amphipod: { lipids: 20, duration: 100 },
        fish: { lipids: 15, duration: 90 },
        bivalve: { lipids: 12, duration: 180 }
    };

    const data = speciesData[species];
    if (data) {
        document.getElementById('initialLipids').value = data.lipids;
        document.getElementById('diapauseDuration').value = data.duration;
    }
}

// Calculator computation function
function calculateCompression() {
    const species = document.getElementById('species').value;
    const currentTemp = parseFloat(document.getElementById('currentTemp').value);
    const futureTemp = parseFloat(document.getElementById('futureTemp').value);
    const initialLipids = parseFloat(document.getElementById('initialLipids').value);
    const diapauseDuration = parseFloat(document.getElementById('diapauseDuration').value);

    // Validate inputs
    if (isNaN(currentTemp) || isNaN(futureTemp) || isNaN(initialLipids) || isNaN(diapauseDuration)) {
        showError('Please enter valid numeric values for all fields.');
        return;
    }

    if (futureTemp <= currentTemp) {
        showError('Future temperature must be higher than current temperature.');
        return;
    }

    // Calculate temperature increase
    const tempIncrease = futureTemp - currentTemp;

    // Calculate metabolic rate increase using Q10 = 2 (typical for biological processes)
    const q10 = 2.0;
    const metabolicIncrease = Math.pow(q10, tempIncrease / 10) - 1;

    // Calculate diapause duration reduction
    const durationReduction = diapauseDuration * metabolicIncrease * 0.3; // 30% coupling
    const newDuration = Math.max(0, diapauseDuration - durationReduction);

    // Calculate lipid depletion
    const dailyMetabolicRate = initialLipids / diapauseDuration; // baseline
    const increasedDailyRate = dailyMetabolicRate * (1 + metabolicIncrease);
    const finalLipids = Math.max(0, initialLipids - (increasedDailyRate * newDuration));

    // Determine threshold breach
    const speciesThresholds = {
        copepod: { survival: 15, reproduction: 25 },
        euphausiid: { survival: 20, reproduction: 35 },
        amphipod: { survival: 10, reproduction: 20 },
        fish: { survival: 8, reproduction: 15 },
        bivalve: { survival: 5, reproduction: 12 }
    };

    const thresholds = speciesThresholds[species];
    const survivalBreach = finalLipids < thresholds.survival;
    const reproductionBreach = finalLipids < thresholds.reproduction;

    // Calculate population impact
    let populationImpact = 0;
    if (survivalBreach) {
        populationImpact = 90; // Near total mortality
    } else if (reproductionBreach) {
        populationImpact = 60; // Significant reproductive failure
    } else if (finalLipids < thresholds.reproduction * 1.2) {
        populationImpact = 25; // Moderate impact
    }

    // Update results display
    updateCalculatorResults({
        tempIncrease,
        metabolicIncrease: metabolicIncrease * 100,
        durationReduction,
        newDuration,
        finalLipids,
        survivalBreach,
        reproductionBreach,
        populationImpact,
        thresholds
    });

    // Update calculator chart
    updateCalculatorChart(finalLipids, thresholds);

    // Clear any previous errors
    clearError();
}

// Update calculator results display
function updateCalculatorResults(results) {
    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) return;

    const resultsHTML = `
        <div class="results-summary">
            <h4>Calculation Results</h4>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">Temperature Increase:</span>
                    <span class="result-value">${results.tempIncrease.toFixed(1)}°C</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Metabolic Rate Increase:</span>
                    <span class="result-value">${results.metabolicIncrease.toFixed(1)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Diapause Duration Reduction:</span>
                    <span class="result-value">${results.durationReduction.toFixed(1)} days</span>
                </div>
                <div class="result-item">
                    <span class="result-label">New Duration:</span>
                    <span class="result-value">${results.newDuration.toFixed(1)} days</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Final Lipid Content:</span>
                    <span class="result-value ${results.finalLipids < results.thresholds.survival ? 'error' : results.finalLipids < results.thresholds.reproduction ? 'warning' : 'success'}">${results.finalLipids.toFixed(1)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Survival Threshold Breach:</span>
                    <span class="result-value ${results.survivalBreach ? 'error' : 'success'}">${results.survivalBreach ? 'Yes' : 'No'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Reproduction Threshold Breach:</span>
                    <span class="result-value ${results.reproductionBreach ? 'error' : 'success'}">${results.reproductionBreach ? 'Yes' : 'No'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Estimated Population Impact:</span>
                    <span class="result-value ${results.populationImpact > 50 ? 'error' : results.populationImpact > 25 ? 'warning' : 'success'}">${results.populationImpact.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = resultsHTML;
}

// Update calculator chart with new data
function updateCalculatorChart(finalLipids, thresholds) {
    if (!calculatorChart) return;

    calculatorChart.data.datasets[0].data = [30, 25, finalLipids, thresholds.survival];
    calculatorChart.update();
}

// Show error message
function showError(message) {
    clearError();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.parentNode.insertBefore(errorDiv, calculateBtn);
    }
}

// Clear error message
function clearError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

// Update charts with dynamic data
function updateChartsWithData() {
    // This function would typically fetch data from an API
    // For now, we'll just ensure charts are properly rendered
    if (diapauseCompressionChart) {
        diapauseCompressionChart.update();
    }
    if (thermalRegulationChart) {
        thermalRegulationChart.update();
    }
    if (populationImpactChart) {
        populationImpactChart.update();
    }
    if (energyThresholdChart) {
        energyThresholdChart.update();
    }
    if (calculatorChart) {
        calculatorChart.update();
    }
    if (solutionEffectivenessChart) {
        solutionEffectivenessChart.update();
    }
    if (researchPriorityChart) {
        researchPriorityChart.update();
    }
}

// Export functionality for charts
function exportChart(chartId, filename) {
    const chart = window[chartId];
    if (!chart) return;

    const link = document.createElement('a');
    link.download = filename;
    link.href = chart.toBase64Image();
    link.click();
}

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'Duration Compression in Warming Arctic Waters',
            text: 'Explore how elevated winter temperatures shorten diapause periods in Arctic marine organisms.',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('URL copied to clipboard!');
        });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-info';
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Monitor Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to monitoring service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error to monitoring service
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printPage();
    }

    // Ctrl/Cmd + S for share
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        sharePage();
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Horizontal swipe for tab navigation
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
        const activeTab = document.querySelector('.tab-btn.active');
        const currentIndex = tabButtons.indexOf(activeTab);

        if (diffX > 0 && currentIndex < tabButtons.length - 1) {
            // Swipe left - next tab
            showTab(tabButtons[currentIndex + 1].getAttribute('onclick').match(/'([^']+)'/)[1]);
        } else if (diffX < 0 && currentIndex > 0) {
            // Swipe right - previous tab
            showTab(tabButtons[currentIndex - 1].getAttribute('onclick').match(/'([^']+)'/)[1]);
        }
    }
}, false);

// Progressive enhancement for modern browsers
if ('IntersectionObserver' in window) {
    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    // Observe lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Web Vitals tracking
function trackWebVitals() {
    if ('web-vitals' in window) {
        // Track Core Web Vitals
        window.webVitals.getCLS(console.log);
        window.webVitals.getFID(console.log);
        window.webVitals.getFCP(console.log);
        window.webVitals.getLCP(console.log);
        window.webVitals.getTTFB(console.log);
    }
}

// Initialize Web Vitals tracking
trackWebVitals();

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA live regions for dynamic content
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.setAttribute('aria-live', 'polite');
        resultsContainer.setAttribute('aria-atomic', 'true');
    }

    // Improve focus management
    const modalElements = document.querySelectorAll('[role="dialog"]');
    modalElements.forEach(modal => {
        const focusableElements = modal.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );

        if (focusableElements.length > 0) {
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }

                if (e.key === 'Escape') {
                    // Close modal logic here
                    modal.style.display = 'none';
                }
            });
        }
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Data persistence
function saveCalculatorState() {
    const calculatorState = {
        species: document.getElementById('species').value,
        currentTemp: document.getElementById('currentTemp').value,
        futureTemp: document.getElementById('futureTemp').value,
        initialLipids: document.getElementById('initialLipids').value,
        diapauseDuration: document.getElementById('diapauseDuration').value,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('diapauseCalculatorState', JSON.stringify(calculatorState));
}

function loadCalculatorState() {
    const savedState = localStorage.getItem('diapauseCalculatorState');
    if (savedState) {
        const state = JSON.parse(savedState);
        document.getElementById('species').value = state.species;
        document.getElementById('currentTemp').value = state.currentTemp;
        document.getElementById('futureTemp').value = state.futureTemp;
        document.getElementById('initialLipids').value = state.initialLipids;
        document.getElementById('diapauseDuration').value = state.diapauseDuration;
    }
}

// Load saved calculator state on initialization
loadCalculatorState();

// Save calculator state when inputs change
const calculatorInputs = document.querySelectorAll('#species, #currentTemp, #futureTemp, #initialLipids, #diapauseDuration');
calculatorInputs.forEach(input => {
    input.addEventListener('change', saveCalculatorState);
});

// Export calculator results
function exportCalculatorResults() {
    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer || resultsContainer.innerHTML.trim() === '<p>Enter parameters and click calculate to see results.</p>') {
        showError('No results to export. Please run a calculation first.');
        return;
    }

    const data = {
        timestamp: new Date().toISOString(),
        inputs: {
            species: document.getElementById('species').value,
            currentTemp: document.getElementById('currentTemp').value,
            futureTemp: document.getElementById('futureTemp').value,
            initialLipids: document.getElementById('initialLipids').value,
            diapauseDuration: document.getElementById('diapauseDuration').value
        },
        results: resultsContainer.innerHTML
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diapause-calculator-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add export button to calculator
const calculatorContainer = document.querySelector('.calculator-container');
if (calculatorContainer) {
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Results';
    exportBtn.className = 'calculate-btn';
    exportBtn.style.marginTop = '1rem';
    exportBtn.onclick = exportCalculatorResults;
    calculatorContainer.appendChild(exportBtn);
}

// Theme switching functionality
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize theme
loadTheme();

// Add theme toggle button
const themeToggle = document.createElement('button');
themeToggle.textContent = 'Toggle Theme';
themeToggle.className = 'btn btn-outline';
themeToggle.style.position = 'fixed';
themeToggle.style.top = '20px';
themeToggle.style.right = '20px';
themeToggle.style.zIndex = '1000';
themeToggle.onclick = toggleTheme;
document.body.appendChild(themeToggle);

// Offline detection
function handleOnlineStatus() {
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'status-indicator';
    statusIndicator.style.position = 'fixed';
    statusIndicator.style.bottom = '20px';
    statusIndicator.style.right = '20px';
    statusIndicator.style.padding = '0.5rem 1rem';
    statusIndicator.style.borderRadius = '0.5rem';
    statusIndicator.style.zIndex = '1000';

    function updateStatus() {
        if (navigator.onLine) {
            statusIndicator.textContent = 'Online';
            statusIndicator.style.background = 'var(--success-color)';
            statusIndicator.style.color = 'white';
        } else {
            statusIndicator.textContent = 'Offline';
            statusIndicator.style.background = 'var(--warning-color)';
            statusIndicator.style.color = 'black';
        }
    }

    updateStatus();
    document.body.appendChild(statusIndicator);

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
}

// Initialize online status monitoring
handleOnlineStatus();

// Performance optimization: lazy load non-critical JavaScript
function lazyLoadScripts() {
    // Load additional scripts after main content is loaded
    setTimeout(() => {
        // Load chart plugins or additional libraries here
        console.log('Lazy loading additional scripts...');
    }, 2000);
}

// Initialize lazy loading
lazyLoadScripts();

// Memory management
function cleanupEventListeners() {
    // Clean up event listeners when page unloads
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('error', function() {});
    window.removeEventListener('unhandledrejection', function() {});
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupEventListeners);

// Final initialization check
console.log('Duration Compression Calculator initialized successfully');

// Make functions globally available for HTML onclick handlers
window.showTab = showTab;
window.calculateCompression = calculateCompression;
window.exportCalculatorResults = exportCalculatorResults;
window.toggleTheme = toggleTheme;