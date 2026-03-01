// Thermocline Instability and Vertical Migration Disruption - JavaScript
// Issue #2828 - Interactive Functionality with Advanced Features

// Global variables and configuration
let currentTab = 'overview';
let thermoclineStabilityChart = null;
let migrationSimulationChart = null;
let isInitialized = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

// Initialize the application
function initializeApplication() {
    if (isInitialized) return;

    setupEventListeners();
    initializeCharts();
    setupAccessibility();
    setupKeyboardNavigation();
    loadInitialData();

    isInitialized = true;

    // Announce page load to screen readers
    announceToScreenReader('Thermocline Instability dashboard loaded successfully');
}

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
        button.addEventListener('keydown', handleTabKeydown);
    });

    // Calculator inputs
    const inputs = document.querySelectorAll('.input-group input, .input-group select');
    inputs.forEach(input => {
        input.addEventListener('input', handleCalculatorInput);
        input.addEventListener('change', handleCalculatorInput);
    });

    // Calculate button
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleCalculateClick);
    }

    // Window resize for responsive charts
    window.addEventListener('resize', handleWindowResize);

    // Print event
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
}

// Handle tab click events
function handleTabClick(event) {
    const tabId = event.target.textContent.toLowerCase().replace(/\s+/g, '-');
    showTab(tabId);

    // Announce tab change to screen readers
    announceToScreenReader(`Switched to ${event.target.textContent} tab`);
}

// Handle tab keyboard navigation
function handleTabKeydown(event) {
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const currentIndex = tabButtons.indexOf(event.target);

    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
            tabButtons[prevIndex].focus();
            tabButtons[prevIndex].click();
            break;
        case 'ArrowRight':
            event.preventDefault();
            const nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
            tabButtons[nextIndex].focus();
            tabButtons[nextIndex].click();
            break;
        case 'Home':
            event.preventDefault();
            tabButtons[0].focus();
            tabButtons[0].click();
            break;
        case 'End':
            event.preventDefault();
            const lastIndex = tabButtons.length - 1;
            tabButtons[lastIndex].focus();
            tabButtons[lastIndex].click();
            break;
    }
}

// Show specific tab
function showTab(tabId) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to selected button
    const selectedButton = Array.from(tabButtons).find(button =>
        button.textContent.toLowerCase().replace(/\s+/g, '-') === tabId
    );
    if (selectedButton) {
        selectedButton.classList.add('active');
        selectedButton.setAttribute('aria-selected', 'true');
        selectedButton.focus();
    }

    currentTab = tabId;

    // Update URL hash without triggering navigation
    if (history.replaceState) {
        history.replaceState(null, null, `#${tabId}`);
    }

    // Lazy load tab-specific content
    lazyLoadTabContent(tabId);
}

// Lazy load tab content
function lazyLoadTabContent(tabId) {
    switch (tabId) {
        case 'calculator':
            if (!migrationSimulationChart) {
                initializeMigrationSimulationChart();
            }
            break;
        case 'overview':
            if (!thermoclineStabilityChart) {
                initializeThermoclineStabilityChart();
            }
            break;
    }
}

// Initialize charts
function initializeCharts() {
    initializeThermoclineStabilityChart();
    initializeMigrationSimulationChart();
}

// Initialize thermocline stability chart
function initializeThermoclineStabilityChart() {
    const ctx = document.getElementById('thermoclineStabilityChart');
    if (!ctx) return;

    const data = {
        labels: ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
        datasets: [{
            label: 'Thermocline Strength (°C/m)',
            data: [1.8, 1.7, 1.6, 1.4, 1.2, 0.9, 0.7],
            borderColor: '#0f766e',
            backgroundColor: 'rgba(15, 118, 110, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#0f766e',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            label: 'Mixing Events (annual)',
            data: [2, 3, 4, 6, 8, 12, 18],
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#dc2626',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: 'y1'
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
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Thermocline Stability Decline Over Time',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#0f766e',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += context.parsed.y + '°C/m';
                            } else {
                                label += context.parsed.y + ' events';
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
                        text: 'Decade',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Thermocline Strength (°C/m)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    min: 0,
                    max: 2
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Mixing Events (annual)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    min: 0,
                    max: 20
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };

    thermoclineStabilityChart = new Chart(ctx, config);
}

// Initialize migration simulation chart
function initializeMigrationSimulationChart() {
    const ctx = document.getElementById('migrationSimulationChart');
    if (!ctx) return;

    const data = {
        labels: ['Day 0', 'Day 7', 'Day 14', 'Day 21', 'Day 28'],
        datasets: [{
            label: 'Migration Success Rate',
            data: [100, 85, 70, 55, 40],
            borderColor: '#0891b2',
            backgroundColor: 'rgba(8, 145, 178, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#0891b2',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            label: 'Predation Risk',
            data: [10, 25, 40, 55, 70],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: 'y1'
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
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Migration Disruption Simulation',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#0891b2',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y + (context.datasetIndex === 0 ? '%' : '%');
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
                        text: 'Time (Days)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Migration Success (%)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    min: 0,
                    max: 100
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Predation Risk (%)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    min: 0,
                    max: 100
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            }
        }
    };

    migrationSimulationChart = new Chart(ctx, config);
}

// Handle calculator input changes
function handleCalculatorInput(event) {
    // Real-time validation
    validateInput(event.target);

    // Auto-calculate if all inputs are valid
    if (areAllInputsValid()) {
        calculateThermoclineInstability();
    }
}

// Validate individual input
function validateInput(input) {
    const value = input.value;
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    switch (input.id) {
        case 'baselineStability':
            if (value < 0 || value > 5) {
                isValid = false;
                errorMessage = 'Baseline stability must be between 0 and 5 °C/m';
            }
            break;
        case 'reducedStability':
            if (value < 0 || value > 5) {
                isValid = false;
                errorMessage = 'Reduced stability must be between 0 and 5 °C/m';
            }
            break;
        case 'predatorPressure':
            if (value < 1 || value > 10) {
                isValid = false;
                errorMessage = 'Predator pressure must be between 1 and 10';
            }
            break;
    }

    // Update input styling
    input.classList.toggle('error', !isValid);
    input.classList.toggle('success', isValid && value !== '');

    // Update or remove error message
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!isValid) {
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    } else if (errorElement) {
        errorElement.remove();
    }

    return isValid;
}

// Check if all calculator inputs are valid
function areAllInputsValid() {
    const inputs = document.querySelectorAll('.input-group input, .input-group select');
    return Array.from(inputs).every(input => {
        return input.value !== '' && !input.classList.contains('error');
    });
}

// Handle calculate button click
function handleCalculateClick() {
    if (!areAllInputsValid()) {
        announceToScreenReader('Please fill in all required fields correctly');
        return;
    }

    calculateThermoclineInstability();

    // Announce results to screen readers
    const migrationDisruption = document.getElementById('migrationDisruption').textContent;
    const predationRisk = document.getElementById('predationRisk').textContent;
    announceToScreenReader(`Calculation complete. Migration disruption: ${migrationDisruption}, Predation risk increase: ${predationRisk}`);
}

// Calculate thermocline instability
function calculateThermoclineInstability() {
    const baselineStability = parseFloat(document.getElementById('baselineStability').value);
    const reducedStability = parseFloat(document.getElementById('reducedStability').value);
    const speciesType = document.getElementById('speciesType').value;
    const predatorPressure = parseFloat(document.getElementById('predatorPressure').value);

    // Stability reduction factor
    const stabilityReduction = (baselineStability - reducedStability) / baselineStability;

    // Species-specific parameters
    const speciesParams = {
        'dvm': { sensitivity: 1.3, baseMigration: 95 },
        'seasonal': { sensitivity: 1.0, baseMigration: 90 },
        'refuge': { sensitivity: 1.5, baseMigration: 85 },
        'benthic': { sensitivity: 0.7, baseMigration: 80 }
    };

    const params = speciesParams[speciesType];

    // Calculate migration disruption
    const migrationDisruptionPercent = Math.min(100, stabilityReduction * params.sensitivity * 100);

    // Calculate predation risk increase
    const predationRiskIncrease = Math.min(100, (migrationDisruptionPercent * 0.8) + (predatorPressure * 5));

    // Calculate survival impact
    const survivalImpact = Math.min(100, migrationDisruptionPercent * 0.6 + predationRiskIncrease * 0.4);

    // Calculate depth preference shift
    const depthShift = Math.round(stabilityReduction * params.sensitivity * 15); // meters

    // Update results
    document.getElementById('migrationDisruption').textContent = migrationDisruptionPercent.toFixed(1) + '%';
    document.getElementById('predationRisk').textContent = predationRiskIncrease.toFixed(1) + '%';
    document.getElementById('survivalImpact').textContent = survivalImpact.toFixed(1) + '%';
    document.getElementById('depthShift').textContent = depthShift;

    // Update simulation chart
    updateMigrationSimulationChart(migrationDisruptionPercent, predationRiskIncrease);

    // Add visual feedback
    animateResults();
}

// Update migration simulation chart with new data
function updateMigrationSimulationChart(migrationDisruption, predationRisk) {
    if (!migrationSimulationChart) return;

    const timePoints = ['Day 0', 'Day 7', 'Day 14', 'Day 21', 'Day 28'];
    const migrationLevels = [];
    const predationLevels = [];

    for (let i = 0; i < timePoints.length; i++) {
        const disruptionRate = (i / 4) * (migrationDisruption / 100);
        migrationLevels.push(Math.max(0, 100 - (disruptionRate * 100)));
        predationLevels.push(Math.min(100, 10 + (disruptionRate * 90)));
    }

    migrationSimulationChart.data.datasets[0].data = migrationLevels;
    migrationSimulationChart.data.datasets[1].data = predationLevels;

    migrationSimulationChart.update('active');
}

// Animate results display
function animateResults() {
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach((item, index) => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s both`;
        }, 10);
    });
}

// Setup accessibility features
function setupAccessibility() {
    // Add ARIA labels and roles
    const tabs = document.querySelector('.tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Thermocline analysis tabs');

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', button.textContent.toLowerCase().replace(/\s+/g, '-'));
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', content.id + '-tab');
    });

    // Add skip links
    addSkipLinks();
}

// Add skip links for accessibility
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = '#000';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '1000';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const container = document.querySelector('.container');
    container.id = 'main-content';
    container.setAttribute('role', 'main');
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    // Handle URL hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Check initial hash
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        showTab(tabId);
    }
}

// Handle URL hash changes
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showTab(hash);
    }
}

// Handle window resize
function handleWindowResize() {
    // Debounce chart resizing
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        if (thermoclineStabilityChart) {
            thermoclineStabilityChart.resize();
        }
        if (migrationSimulationChart) {
            migrationSimulationChart.resize();
        }
    }, 250);
}

// Handle print events
function handleBeforePrint() {
    // Ensure all tabs are visible for printing
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'block';
    });
}

function handleAfterPrint() {
    // Restore tab visibility after printing
    showTab(currentTab);
}

// Load initial data
function loadInitialData() {
    // Simulate loading initial calculator values
    setTimeout(() => {
        calculateThermoclineInstability();
    }, 500);
}

// Announce to screen readers
function announceToScreenReader(message) {
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

// Export data functionality
function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        tab: currentTab,
        calculatorInputs: {
            baselineStability: document.getElementById('baselineStability').value,
            reducedStability: document.getElementById('reducedStability').value,
            speciesType: document.getElementById('speciesType').value,
            predatorPressure: document.getElementById('predatorPressure').value
        },
        calculatorResults: {
            migrationDisruption: document.getElementById('migrationDisruption').textContent,
            predationRisk: document.getElementById('predationRisk').textContent,
            survivalImpact: document.getElementById('survivalImpact').textContent,
            depthShift: document.getElementById('depthShift').textContent
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `thermocline-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    announceToScreenReader('Data exported successfully');
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window && 'mark' in window.performance) {
        performance.mark('app-initialized');

        // Measure time to interactive
        setTimeout(() => {
            performance.mark('app-interactive');
            performance.measure('initialization-time', 'app-initialized', 'app-interactive');

            const measure = performance.getEntriesByName('initialization-time')[0];
            console.log(`App initialization time: ${measure.duration}ms`);
        }, 1000);
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    announceToScreenReader('An error occurred. Please refresh the page.');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    announceToScreenReader('An unexpected error occurred.');
});

// Service worker registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Initialize performance monitoring
monitorPerformance();

// Make functions globally available for HTML onclick handlers
window.showTab = showTab;
window.calculateThermoclineInstability = calculateThermoclineInstability;
window.exportData = exportData;