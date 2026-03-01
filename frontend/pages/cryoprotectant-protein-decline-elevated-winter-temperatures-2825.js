// Cryoprotectant Protein Decline at Elevated Winter Temperatures - JavaScript
// Issue #2825 - Interactive Functionality with Advanced Features

// Global variables and configuration
let currentTab = 'overview';
let proteinDeclineChart = null;
let declineSimulationChart = null;
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
    announceToScreenReader('Cryoprotectant Protein Decline dashboard loaded successfully');
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
    const tabId = event.target.textContent.toLowerCase().replace(' ', '-');
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
        button.textContent.toLowerCase().replace(' ', '-') === tabId
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
            if (!declineSimulationChart) {
                initializeDeclineSimulationChart();
            }
            break;
        case 'overview':
            if (!proteinDeclineChart) {
                initializeProteinDeclineChart();
            }
            break;
    }
}

// Initialize charts
function initializeCharts() {
    initializeProteinDeclineChart();
    initializeDeclineSimulationChart();
}

// Initialize protein decline chart
function initializeProteinDeclineChart() {
    const ctx = document.getElementById('proteinDeclineChart');
    if (!ctx) return;

    const data = {
        labels: ['-20°C', '-15°C', '-10°C', '-5°C', '0°C', '+2°C', '+5°C'],
        datasets: [{
            label: 'AFP Expression Level (%)',
            data: [100, 95, 85, 70, 45, 25, 10],
            borderColor: '#1e3a8a',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#1e3a8a',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            label: 'Freezing Tolerance (°C)',
            data: [-8, -7.5, -6.5, -5, -3, -1.5, -0.5],
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
                    text: 'Cryoprotectant Protein Decline vs Temperature',
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
                    borderColor: '#1e3a8a',
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
                                label += context.parsed.y + '%';
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
                        text: 'Temperature (°C)',
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
                        text: 'AFP Expression (%)',
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
                        text: 'Freezing Tolerance (°C)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    min: -10,
                    max: 0
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };

    proteinDeclineChart = new Chart(ctx, config);
}

// Initialize decline simulation chart
function initializeDeclineSimulationChart() {
    const ctx = document.getElementById('declineSimulationChart');
    if (!ctx) return;

    const data = {
        labels: ['Day 0', 'Day 7', 'Day 14', 'Day 21', 'Day 28', 'Day 35'],
        datasets: [{
            label: 'Protein Expression',
            data: [100, 85, 70, 55, 40, 25],
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            label: 'Survival Probability',
            data: [100, 92, 78, 58, 35, 18],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
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
                    text: 'Cryoprotectant Decline Simulation',
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
                    borderColor: '#06b6d4',
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
                        text: 'Protein Expression (%)',
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
                        text: 'Survival Probability (%)',
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

    declineSimulationChart = new Chart(ctx, config);
}

// Handle calculator input changes
function handleCalculatorInput(event) {
    // Real-time validation
    validateInput(event.target);

    // Auto-calculate if all inputs are valid
    if (areAllInputsValid()) {
        calculateCryoprotectantDecline();
    }
}

// Validate individual input
function validateInput(input) {
    const value = input.value;
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    switch (input.id) {
        case 'baselineTemp':
            if (value < -30 || value > 0) {
                isValid = false;
                errorMessage = 'Baseline temperature must be between -30°C and 0°C';
            }
            break;
        case 'elevatedTemp':
            if (value < -30 || value > 10) {
                isValid = false;
                errorMessage = 'Elevated temperature must be between -30°C and 10°C';
            }
            break;
        case 'exposureTime':
            if (value < 1 || value > 365) {
                isValid = false;
                errorMessage = 'Exposure time must be between 1 and 365 days';
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

    calculateCryoprotectantDecline();

    // Announce results to screen readers
    const afpDecline = document.getElementById('afpDecline').textContent;
    const survivalProb = document.getElementById('survivalProb').textContent;
    announceToScreenReader(`Calculation complete. AFP decline: ${afpDecline}, Survival probability: ${survivalProb}`);
}

// Calculate cryoprotectant decline
function calculateCryoprotectantDecline() {
    const baselineTemp = parseFloat(document.getElementById('baselineTemp').value);
    const elevatedTemp = parseFloat(document.getElementById('elevatedTemp').value);
    const speciesType = document.getElementById('speciesType').value;
    const exposureTime = parseFloat(document.getElementById('exposureTime').value);

    // Temperature difference
    const tempDiff = elevatedTemp - baselineTemp;

    // Species-specific parameters
    const speciesParams = {
        'fish': { sensitivity: 1.2, baselineThreshold: -8 },
        'invertebrate': { sensitivity: 1.0, baselineThreshold: -5 },
        'plant': { sensitivity: 0.8, baselineThreshold: -10 },
        'amphibian': { sensitivity: 1.1, baselineThreshold: -3 }
    };

    const params = speciesParams[speciesType];

    // Calculate AFP expression decline
    // Formula: decline = sensitivity * tempDiff * (exposureTime / 30) * 100
    const afpDeclinePercent = Math.min(100, Math.max(0,
        params.sensitivity * Math.abs(tempDiff) * (exposureTime / 30) * 8
    ));

    // Calculate freezing tolerance loss
    const toleranceLoss = Math.abs(tempDiff) * 0.3 * (exposureTime / 30);

    // Calculate survival probability
    const survivalProb = Math.max(0, 100 - (afpDeclinePercent * 0.8) - (toleranceLoss * 5));

    // Calculate recovery time
    const recoveryTime = Math.ceil(afpDeclinePercent / 10) * 7; // Days

    // Update results
    document.getElementById('afpDecline').textContent = afpDeclinePercent.toFixed(1) + '%';
    document.getElementById('toleranceLoss').textContent = toleranceLoss.toFixed(1) + '°C';
    document.getElementById('survivalProb').textContent = survivalProb.toFixed(1) + '%';
    document.getElementById('recoveryTime').textContent = recoveryTime;

    // Update simulation chart
    updateDeclineSimulationChart(afpDeclinePercent, survivalProb, exposureTime);

    // Add visual feedback
    animateResults();
}

// Update decline simulation chart with new data
function updateDeclineSimulationChart(afpDecline, survivalProb, exposureTime) {
    if (!declineSimulationChart) return;

    const days = Math.min(35, exposureTime);
    const timePoints = [];
    const proteinLevels = [];
    const survivalLevels = [];

    for (let i = 0; i <= days; i += 7) {
        timePoints.push(`Day ${i}`);
        const declineRate = (i / days) * (afpDecline / 100);
        proteinLevels.push(Math.max(0, 100 - (declineRate * 100)));
        survivalLevels.push(Math.max(0, 100 - (declineRate * 80) - (i / days * 20)));
    }

    declineSimulationChart.data.labels = timePoints;
    declineSimulationChart.data.datasets[0].data = proteinLevels;
    declineSimulationChart.data.datasets[1].data = survivalLevels;

    declineSimulationChart.update('active');
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
    tabs.setAttribute('aria-label', 'Cryoprotectant analysis tabs');

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', button.textContent.toLowerCase().replace(' ', '-'));
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
        if (proteinDeclineChart) {
            proteinDeclineChart.resize();
        }
        if (declineSimulationChart) {
            declineSimulationChart.resize();
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
        calculateCryoprotectantDecline();
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
            baselineTemp: document.getElementById('baselineTemp').value,
            elevatedTemp: document.getElementById('elevatedTemp').value,
            speciesType: document.getElementById('speciesType').value,
            exposureTime: document.getElementById('exposureTime').value
        },
        calculatorResults: {
            afpDecline: document.getElementById('afpDecline').textContent,
            toleranceLoss: document.getElementById('toleranceLoss').textContent,
            survivalProb: document.getElementById('survivalProb').textContent,
            recoveryTime: document.getElementById('recoveryTime').textContent
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `cryoprotectant-analysis-${Date.now()}.json`;
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
window.calculateCryoprotectantDecline = calculateCryoprotectantDecline;
window.exportData = exportData;