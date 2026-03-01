// Photoperiod Mismatch and Circadian Drift in Copepods - JavaScript

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    const clickedButton = Array.from(tabButtons).find(button =>
        button.onclick.toString().includes(tabName)
    );
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // Update URL hash for bookmarking
    window.location.hash = tabName;

    // Initialize charts if switching to tabs that contain them
    if (tabName === 'overview') {
        initializePhotoperiodChart();
    } else if (tabName === 'calculator') {
        initializeDriftSimulationChart();
    }
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check URL hash and show corresponding tab
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showTab(hash);
    } else {
        showTab('overview');
    }

    // Initialize overview chart
    initializePhotoperiodChart();
});

// Photoperiod Chart Initialization
function initializePhotoperiodChart() {
    const ctx = document.getElementById('photoperiodChart');
    if (!ctx) return;

    const data = {
        labels: ['1980', '1990', '2000', '2010', '2020', '2030', '2040', '2050'],
        datasets: [{
            label: 'Ice-Free Days',
            data: [45, 52, 61, 73, 89, 112, 145, 189],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Circadian Drift (hours/year)',
            data: [0.1, 0.2, 0.4, 0.7, 1.2, 1.8, 2.5, 3.4],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            yAxisID: 'y1',
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
                    text: 'Arctic Ice Melt and Circadian Drift Trends',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Ice-Free Days'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Circadian Drift (hours/year)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Calculator functionality
function calculateCircadianDrift() {
    const iceThickness = parseFloat(document.getElementById('iceThickness').value) || 0;
    const latitude = parseFloat(document.getElementById('latitude').value) || 0;
    const dayOfYear = parseFloat(document.getElementById('dayOfYear').value) || 0;
    const cloudCover = parseFloat(document.getElementById('cloudCover').value) || 0;

    // Add calculating class to button
    const button = document.querySelector('.calculate-btn');
    button.classList.add('calculating');
    button.disabled = true;

    // Simulate calculation delay for better UX
    setTimeout(() => {
        // Calculate light penetration based on ice thickness
        const lightPenetration = calculateLightPenetration(iceThickness, cloudCover);

        // Calculate photoperiod duration
        const photoperiodDuration = calculatePhotoperiod(latitude, dayOfYear);

        // Calculate circadian drift
        const circadianDrift = calculateDrift(lightPenetration, photoperiodDuration);

        // Calculate reproductive impact
        const reproductiveImpact = calculateReproductiveImpact(circadianDrift);

        // Update results
        document.getElementById('lightPenetration').textContent = lightPenetration.toFixed(1) + '%';
        document.getElementById('photoperiodDuration').textContent = photoperiodDuration.toFixed(1) + ' hours';
        document.getElementById('circadianDrift').textContent = circadianDrift.toFixed(2) + ' hours/year';
        document.getElementById('reproductiveImpact').textContent = reproductiveImpact.toFixed(1) + '%';

        // Update simulation chart
        updateDriftSimulationChart(circadianDrift, reproductiveImpact);

        // Remove calculating class
        button.classList.remove('calculating');
        button.disabled = false;
    }, 1000);
}

// Light penetration calculation
function calculateLightPenetration(iceThickness, cloudCover) {
    // Simplified model: thicker ice = less light penetration
    // Cloud cover reduces light availability
    const basePenetration = Math.max(0, 100 - (iceThickness * 2));
    const cloudEffect = (100 - cloudCover) / 100;
    return basePenetration * cloudEffect;
}

// Photoperiod calculation
function calculatePhotoperiod(latitude, dayOfYear) {
    // Simplified calculation of day length
    const latRad = latitude * Math.PI / 180;
    const dayAngle = 2 * Math.PI * (dayOfYear - 81) / 365;
    const declination = 23.45 * Math.sin(dayAngle) * Math.PI / 180;

    const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(declination));
    const dayLength = (2 * hourAngle * 24) / (2 * Math.PI);

    return Math.max(0, Math.min(24, dayLength));
}

// Circadian drift calculation
function calculateDrift(lightPenetration, photoperiodDuration) {
    // Drift increases with abnormal light conditions
    const normalPhotoperiod = 12; // hours
    const photoperiodDeviation = Math.abs(photoperiodDuration - normalPhotoperiod);
    const lightDeviation = Math.abs(lightPenetration - 50); // 50% is "normal"

    return (photoperiodDeviation * 0.1) + (lightDeviation * 0.02);
}

// Reproductive impact calculation
function calculateReproductiveImpact(drift) {
    // Higher drift = lower reproductive success
    return Math.max(0, 100 - (drift * 15));
}

// Drift Simulation Chart
let driftSimulationChart;

function initializeDriftSimulationChart() {
    const ctx = document.getElementById('driftSimulationChart');
    if (!ctx) return;

    const data = {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [{
            label: 'Circadian Drift Accumulation',
            data: [0, 0, 0, 0, 0],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Reproductive Success',
            data: [100, 100, 100, 100, 100],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            yAxisID: 'y1',
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
                    text: 'Projected Circadian Drift and Reproductive Impact',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Drift (hours)'
                    },
                    min: 0,
                    max: 20
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Reproductive Success (%)'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    };

    driftSimulationChart = new Chart(ctx, config);
}

function updateDriftSimulationChart(driftRate, reproductiveImpact) {
    if (!driftSimulationChart) {
        initializeDriftSimulationChart();
    }

    const driftData = [];
    const reproductiveData = [];
    let accumulatedDrift = 0;

    for (let year = 1; year <= 5; year++) {
        accumulatedDrift += driftRate;
        driftData.push(accumulatedDrift);

        // Reproductive success decreases with accumulated drift
        const success = Math.max(0, reproductiveImpact - (accumulatedDrift * 2));
        reproductiveData.push(success);
    }

    driftSimulationChart.data.datasets[0].data = driftData;
    driftSimulationChart.data.datasets[1].data = reproductiveData;
    driftSimulationChart.update();
}

// Input validation
function validateInputs() {
    const inputs = document.querySelectorAll('.input-group input');
    let isValid = true;

    inputs.forEach(input => {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || Infinity;

        if (isNaN(value) || value < min || value > max) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const calculator = document.querySelector('.calculator-container');
    const existingError = calculator.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    calculator.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Success feedback
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        color: var(--success-color);
        background-color: rgba(16, 185, 129, 0.1);
        padding: 1rem;
        border-radius: var(--border-radius);
        margin: 1rem 0;
        border: 1px solid var(--success-color);
    `;

    const calculator = document.querySelector('.calculator-container');
    const existingSuccess = calculator.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    calculator.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Enhanced calculator with validation
function calculateCircadianDrift() {
    if (!validateInputs()) {
        showError('Please enter valid values within the specified ranges.');
        return;
    }

    const iceThickness = parseFloat(document.getElementById('iceThickness').value) || 0;
    const latitude = parseFloat(document.getElementById('latitude').value) || 0;
    const dayOfYear = parseFloat(document.getElementById('dayOfYear').value) || 0;
    const cloudCover = parseFloat(document.getElementById('cloudCover').value) || 0;

    // Add calculating class to button
    const button = document.querySelector('.calculate-btn');
    button.classList.add('calculating');
    button.disabled = true;

    // Simulate calculation delay for better UX
    setTimeout(() => {
        try {
            // Calculate light penetration based on ice thickness
            const lightPenetration = calculateLightPenetration(iceThickness, cloudCover);

            // Calculate photoperiod duration
            const photoperiodDuration = calculatePhotoperiod(latitude, dayOfYear);

            // Calculate circadian drift
            const circadianDrift = calculateDrift(lightPenetration, photoperiodDuration);

            // Calculate reproductive impact
            const reproductiveImpact = calculateReproductiveImpact(circadianDrift);

            // Update results
            document.getElementById('lightPenetration').textContent = lightPenetration.toFixed(1) + '%';
            document.getElementById('photoperiodDuration').textContent = photoperiodDuration.toFixed(1) + ' hours';
            document.getElementById('circadianDrift').textContent = circadianDrift.toFixed(2) + ' hours/year';
            document.getElementById('reproductiveImpact').textContent = reproductiveImpact.toFixed(1) + '%';

            // Update simulation chart
            updateDriftSimulationChart(circadianDrift, reproductiveImpact);

            // Show success message
            showSuccess('Calculation completed successfully!');

        } catch (error) {
            showError('An error occurred during calculation. Please try again.');
            console.error('Calculation error:', error);
        }

        // Remove calculating class
        button.classList.remove('calculating');
        button.disabled = false;
    }, 1000);
}

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
        const activeButton = document.querySelector('.tab-btn.active');
        const currentIndex = tabButtons.indexOf(activeButton);

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
        } else {
            newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
        }

        const tabName = tabButtons[newIndex].onclick.toString().match(/'([^']+)'/)[1];
        showTab(tabName);
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Export data functionality
function exportData() {
    const data = {
        iceThickness: document.getElementById('iceThickness').value,
        latitude: document.getElementById('latitude').value,
        dayOfYear: document.getElementById('dayOfYear').value,
        cloudCover: document.getElementById('cloudCover').value,
        lightPenetration: document.getElementById('lightPenetration').textContent,
        photoperiodDuration: document.getElementById('photoperiodDuration').textContent,
        circadianDrift: document.getElementById('circadianDrift').textContent,
        reproductiveImpact: document.getElementById('reproductiveImpact').textContent,
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'circadian-drift-calculation.json';
    link.click();
}

// Share functionality
function shareResults() {
    const results = {
        lightPenetration: document.getElementById('lightPenetration').textContent,
        circadianDrift: document.getElementById('circadianDrift').textContent,
        reproductiveImpact: document.getElementById('reproductiveImpact').textContent
    };

    const shareText = `Circadian Drift Analysis Results:
Light Penetration: ${results.lightPenetration}
Circadian Drift: ${results.circadianDrift}
Reproductive Impact: ${results.reproductiveImpact}

Check out the Photoperiod Mismatch and Circadian Drift in Copepods analysis!`;

    if (navigator.share) {
        navigator.share({
            title: 'Circadian Drift Analysis',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showSuccess('Results copied to clipboard!');
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check URL hash and show corresponding tab
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showTab(hash);
    } else {
        showTab('overview');
    }

    // Initialize overview chart
    initializePhotoperiodChart();

    // Add export and share buttons to calculator
    const calculatorContainer = document.querySelector('.calculator-container');
    if (calculatorContainer) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 1rem; margin-top: 1rem;';

        const exportButton = document.createElement('button');
        exportButton.textContent = 'Export Data';
        exportButton.onclick = exportData;
        exportButton.style.cssText = `
            padding: 0.5rem 1rem;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 0.9rem;
        `;

        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share Results';
        shareButton.onclick = shareResults;
        shareButton.style.cssText = `
            padding: 0.5rem 1rem;
            background: var(--success-color);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 0.9rem;
        `;

        buttonContainer.appendChild(exportButton);
        buttonContainer.appendChild(shareButton);
        calculatorContainer.appendChild(buttonContainer);
    }
});

// Performance monitoring
let calculationCount = 0;
const originalCalculate = calculateCircadianDrift;

calculateCircadianDrift = function() {
    const startTime = performance.now();
    originalCalculate.apply(this, arguments);
    const endTime = performance.now();

    calculationCount++;
    console.log(`Calculation #${calculationCount} took ${(endTime - startTime).toFixed(2)}ms`);
};

// Error boundary for chart initialization
function safeChartInit(chartFunction, chartId) {
    try {
        chartFunction();
    } catch (error) {
        console.error(`Failed to initialize chart ${chartId}:`, error);
        const chartContainer = document.getElementById(chartId)?.parentElement;
        if (chartContainer) {
            chartContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--error-color);">
                    <p>Chart initialization failed. Please refresh the page.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    }
}