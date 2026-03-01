// Cryoprotectant Protein Decline at Elevated Winter Temperatures - JavaScript

// Global variables
let proteinDeclineChart = null;
let declineSimulationChart = null;
let currentTab = 'overview';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    setupAccessibility();
    initializeCalculator();
    loadSavedData();
});

// Initialize Charts
function initializeCharts() {
    initializeProteinDeclineChart();
    initializeDeclineSimulationChart();
}

// Protein Decline Chart
function initializeProteinDeclineChart() {
    const ctx = document.getElementById('proteinDeclineChart');
    if (!ctx) return;

    const data = {
        labels: ['-20°C', '-15°C', '-10°C', '-5°C', '0°C', '+5°C'],
        datasets: [{
            label: 'AFP Expression Level (%)',
            data: [100, 85, 67, 45, 25, 10],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            label: 'Freezing Tolerance (°C)',
            data: [-25, -20, -15, -10, -5, -2],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ef4444',
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
                intersect: false,
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
                    borderColor: '#3b82f6',
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
                        display: false
                    },
                    min: -30,
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

// Decline Simulation Chart
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
            tension: 0.4
        }, {
            label: 'Survival Probability',
            data: [100, 95, 85, 70, 50, 30],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            yAxisID: 'y1'
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
                    text: 'Cryoprotectant Decline Simulation',
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
                    title: {
                        display: true,
                        text: 'Time (days)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Protein Expression (%)'
                    },
                    min: 0,
                    max: 100
                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Survival Probability (%)'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    };

    declineSimulationChart = new Chart(ctx, config);
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.textContent.toLowerCase().replace(' ', '-');
            showTab(tabId);
        });
    });

    // Calculator button
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCryoprotectantDecline);
    }

    // Input validation
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', formatInput);
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Window resize
    window.addEventListener('resize', handleResize);
}

// Show Tab
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
    }

    currentTab = tabId;

    // Update URL hash
    window.location.hash = tabId;

    // Announce tab change to screen readers
    announceToScreenReader(`Switched to ${tabId.replace('-', ' ')} tab`);

    // Lazy load charts if needed
    if (tabId === 'calculator' && !declineSimulationChart) {
        initializeDeclineSimulationChart();
    }
}

// Calculator Logic
function calculateCryoprotectantDecline() {
    const baselineTemp = parseFloat(document.getElementById('baselineTemp').value);
    const elevatedTemp = parseFloat(document.getElementById('elevatedTemp').value);
    const speciesType = document.getElementById('speciesType').value;
    const exposureTime = parseFloat(document.getElementById('exposureTime').value);

    if (!validateCalculatorInputs(baselineTemp, elevatedTemp, exposureTime)) {
        return;
    }

    // Calculate temperature difference
    const tempDiff = elevatedTemp - baselineTemp;

    // Species-specific parameters
    const speciesParams = {
        'fish': { sensitivity: 0.8, baselineExpression: 100 },
        'invertebrate': { sensitivity: 0.6, baselineExpression: 90 },
        'plant': { sensitivity: 0.4, baselineExpression: 80 },
        'amphibian': { sensitivity: 0.7, baselineExpression: 95 }
    };

    const params = speciesParams[speciesType];

    // Calculate AFP expression decline
    const afpDecline = calculateAFPDecline(tempDiff, exposureTime, params);
    const toleranceLoss = calculateToleranceLoss(tempDiff, afpDecline);
    const survivalProb = calculateSurvivalProbability(afpDecline, exposureTime);
    const recoveryTime = calculateRecoveryTime(tempDiff, speciesType);

    // Update results
    updateCalculatorResults(afpDecline, toleranceLoss, survivalProb, recoveryTime);

    // Update simulation chart
    updateSimulationChart(tempDiff, exposureTime, params);

    // Save calculation to localStorage
    saveCalculation({
        baselineTemp,
        elevatedTemp,
        speciesType,
        exposureTime,
        afpDecline,
        toleranceLoss,
        survivalProb,
        recoveryTime,
        timestamp: new Date().toISOString()
    });

    // Announce results
    announceCalculationResults(afpDecline, toleranceLoss, survivalProb, recoveryTime);
}

// Calculate AFP Decline
function calculateAFPDecline(tempDiff, exposureTime, params) {
    // Exponential decline model
    const baseDecline = Math.max(0, tempDiff * params.sensitivity);
    const timeFactor = Math.min(1, exposureTime / 30); // Normalize to 30 days
    const decline = baseDecline * timeFactor * (1 + Math.log(exposureTime + 1) * 0.1);

    return Math.min(100, Math.max(0, decline));
}

// Calculate Tolerance Loss
function calculateToleranceLoss(tempDiff, afpDecline) {
    // Linear relationship between AFP decline and tolerance loss
    const baseLoss = tempDiff * 0.5;
    const declineFactor = afpDecline / 100;
    return baseLoss + (declineFactor * 5);
}

// Calculate Survival Probability
function calculateSurvivalProbability(afpDecline, exposureTime) {
    // Logistic survival model
    const declineFactor = afpDecline / 100;
    const timeFactor = Math.min(1, exposureTime / 60);
    const risk = declineFactor * timeFactor;
    return Math.max(0, (1 - risk) * 100);
}

// Calculate Recovery Time
function calculateRecoveryTime(tempDiff, speciesType) {
    const baseTime = 14; // days
    const tempFactor = Math.abs(tempDiff) * 0.5;
    const speciesFactor = speciesType === 'fish' ? 1.2 : speciesType === 'plant' ? 0.8 : 1.0;
    return Math.round(baseTime + tempFactor * speciesFactor);
}

// Update Calculator Results
function updateCalculatorResults(afpDecline, toleranceLoss, survivalProb, recoveryTime) {
    document.getElementById('afpDecline').textContent = afpDecline.toFixed(1) + '%';
    document.getElementById('toleranceLoss').textContent = toleranceLoss.toFixed(1) + '°C';
    document.getElementById('survivalProb').textContent = survivalProb.toFixed(1) + '%';
    document.getElementById('recoveryTime').textContent = recoveryTime;

    // Color coding
    updateResultColor('afpDecline', afpDecline, [30, 60, 80]);
    updateResultColor('toleranceLoss', Math.abs(toleranceLoss), [2, 4, 6]);
    updateResultColor('survivalProb', survivalProb, [70, 40, 20], true);
}

// Update Result Color
function updateResultColor(elementId, value, thresholds, reverse = false) {
    const element = document.getElementById(elementId);
    const parent = element.parentElement;

    // Remove existing classes
    parent.classList.remove('text-success', 'text-warning', 'text-error');

    if (reverse) {
        if (value >= thresholds[0]) {
            parent.classList.add('text-success');
        } else if (value >= thresholds[1]) {
            parent.classList.add('text-warning');
        } else {
            parent.classList.add('text-error');
        }
    } else {
        if (value <= thresholds[0]) {
            parent.classList.add('text-success');
        } else if (value <= thresholds[1]) {
            parent.classList.add('text-warning');
        } else {
            parent.classList.add('text-error');
        }
    }
}

// Update Simulation Chart
function updateSimulationChart(tempDiff, exposureTime, params) {
    if (!declineSimulationChart) return;

    const days = Math.min(35, exposureTime);
    const labels = [];
    const expressionData = [];
    const survivalData = [];

    for (let i = 0; i <= days; i += Math.ceil(days / 7)) {
        labels.push(`Day ${i}`);
        const decline = calculateAFPDecline(tempDiff, i, params);
        expressionData.push(Math.max(0, params.baselineExpression - decline));
        survivalData.push(calculateSurvivalProbability(decline, i));
    }

    declineSimulationChart.data.labels = labels;
    declineSimulationChart.data.datasets[0].data = expressionData;
    declineSimulationChart.data.datasets[1].data = survivalData;
    declineSimulationChart.update();
}

// Validate Calculator Inputs
function validateCalculatorInputs(baselineTemp, elevatedTemp, exposureTime) {
    let isValid = true;
    let errors = [];

    if (baselineTemp >= elevatedTemp) {
        errors.push('Elevated temperature must be higher than baseline temperature');
        isValid = false;
    }

    if (baselineTemp < -30 || baselineTemp > 0) {
        errors.push('Baseline temperature must be between -30°C and 0°C');
        isValid = false;
    }

    if (elevatedTemp < -30 || elevatedTemp > 10) {
        errors.push('Elevated temperature must be between -30°C and 10°C');
        isValid = false;
    }

    if (exposureTime < 1 || exposureTime > 365) {
        errors.push('Exposure time must be between 1 and 365 days');
        isValid = false;
    }

    if (!isValid) {
        showValidationErrors(errors);
    } else {
        hideValidationErrors();
    }

    return isValid;
}

// Show Validation Errors
function showValidationErrors(errors) {
    let errorContainer = document.getElementById('validation-errors');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'validation-errors';
        errorContainer.className = 'error-container';
        document.querySelector('.calculator-container').appendChild(errorContainer);
    }

    errorContainer.innerHTML = `
        <h4>Validation Errors:</h4>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    errorContainer.style.display = 'block';
}

// Hide Validation Errors
function hideValidationErrors() {
    const errorContainer = document.getElementById('validation-errors');
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
}

// Input Validation
function validateInput(event) {
    const input = event.target;
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);

    if (isNaN(value) || value < min || value > max) {
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
    }
}

// Format Input
function formatInput(event) {
    const input = event.target;
    const value = parseFloat(input.value);

    if (!isNaN(value)) {
        input.value = value.toFixed(1);
    }
}

// Accessibility Setup
function setupAccessibility() {
    // Add ARIA labels
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('role', 'tab');
    });

    const activeButton = document.querySelector('.tab-btn.active');
    if (activeButton) {
        activeButton.setAttribute('aria-selected', 'true');
    }

    // Add ARIA labels to tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', content.id + '-tab');
    });

    // Add live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
}

// Announce to Screen Reader
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
    }
}

// Announce Calculation Results
function announceCalculationResults(afpDecline, toleranceLoss, survivalProb, recoveryTime) {
    const message = `Calculation complete. AFP expression decline: ${afpDecline.toFixed(1)} percent. Freezing tolerance loss: ${toleranceLoss.toFixed(1)} degrees Celsius. Survival probability: ${survivalProb.toFixed(1)} percent. Recovery time: ${recoveryTime} days.`;
    announceToScreenReader(message);
}

// Keyboard Navigation
function handleKeyboardNavigation(event) {
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const currentIndex = tabButtons.findIndex(button => button.classList.contains('active'));

    if (event.key === 'ArrowLeft' && currentIndex > 0) {
        event.preventDefault();
        tabButtons[currentIndex - 1].click();
    } else if (event.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
        event.preventDefault();
        tabButtons[currentIndex + 1].click();
    }
}

// Handle Resize
function handleResize() {
    // Reinitialize charts on resize for responsive behavior
    if (proteinDeclineChart) {
        proteinDeclineChart.resize();
    }
    if (declineSimulationChart) {
        declineSimulationChart.resize();
    }
}

// Initialize Calculator
function initializeCalculator() {
    // Set default values
    document.getElementById('baselineTemp').value = -15;
    document.getElementById('elevatedTemp').value = -5;
    document.getElementById('speciesType').value = 'fish';
    document.getElementById('exposureTime').value = 30;
}

// Save Calculation
function saveCalculation(data) {
    try {
        const calculations = JSON.parse(localStorage.getItem('cryoprotectant-calculations') || '[]');
        calculations.unshift(data);

        // Keep only last 10 calculations
        if (calculations.length > 10) {
            calculations.splice(10);
        }

        localStorage.setItem('cryoprotectant-calculations', JSON.stringify(calculations));
    } catch (error) {
        console.warn('Failed to save calculation:', error);
    }
}

// Load Saved Data
function loadSavedData() {
    try {
        const calculations = JSON.parse(localStorage.getItem('cryoprotectant-calculations') || '[]');
        if (calculations.length > 0) {
            const lastCalculation = calculations[0];
            // Optionally restore last calculation values
            console.log('Last calculation:', lastCalculation);
        }
    } catch (error) {
        console.warn('Failed to load saved data:', error);
    }
}

// Export Data
function exportData() {
    const data = {
        proteinDeclineData: proteinDeclineChart ? proteinDeclineChart.data : null,
        calculations: JSON.parse(localStorage.getItem('cryoprotectant-calculations') || '[]'),
        timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cryoprotectant-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    announceToScreenReader('Data exported successfully');
}

// Performance Monitoring
function monitorPerformance() {
    if ('performance' in window && 'mark' in window.performance) {
        performance.mark('page-load-end');
        performance.measure('page-load', 'navigationStart', 'page-load-end');

        const measure = performance.getEntriesByName('page-load')[0];
        console.log('Page load time:', measure.duration, 'ms');
    }
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // Could send to error reporting service
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Could send to error reporting service
});

// Service Worker Registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Progressive Web App features
let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(event) {
    event.preventDefault();
    deferredPrompt = event;

    // Show install button if desired
    // showInstallButton();
});

// Install PWA
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Share functionality
function shareResults() {
    const results = {
        afpDecline: document.getElementById('afpDecline').textContent,
        toleranceLoss: document.getElementById('toleranceLoss').textContent,
        survivalProb: document.getElementById('survivalProb').textContent,
        recoveryTime: document.getElementById('recoveryTime').textContent
    };

    if (navigator.share) {
        navigator.share({
            title: 'Cryoprotectant Protein Decline Results',
            text: `AFP Decline: ${results.afpDecline}, Tolerance Loss: ${results.toleranceLoss}, Survival: ${results.survivalProb}, Recovery: ${results.recoveryTime}`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const text = `Cryoprotectant Results:\nAFP Decline: ${results.afpDecline}\nTolerance Loss: ${results.toleranceLoss}\nSurvival Probability: ${results.survivalProb}\nRecovery Time: ${results.recoveryTime}`;
        navigator.clipboard.writeText(text).then(function() {
            announceToScreenReader('Results copied to clipboard');
        });
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Theme switching (if needed)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize theme on load
loadTheme();

// Performance monitoring
monitorPerformance();

// Export functions for global access
window.exportData = exportData;
window.shareResults = shareResults;
window.printPage = printPage;
window.toggleFullscreen = toggleFullscreen;
window.toggleTheme = toggleTheme;
window.installPWA = installPWA;