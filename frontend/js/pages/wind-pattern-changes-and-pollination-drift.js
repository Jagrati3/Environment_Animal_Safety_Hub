// Wind Pattern Changes and Pollination Drift - Frontend JavaScript

// ======================== Initialization ========================

document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeCharts();
    initializeWindPatterns();
    initializeDispersalSimulation();
});

// ======================== Tab Navigation ========================

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// ======================== Charts ========================

function initializeCharts() {
    createImpactTrendsChart();
    createJetStreamChart();
    createTradeWindsChart();
    createEcologicalImpactsChart();
}

function createImpactTrendsChart() {
    const ctx = document.getElementById('impactTrendsChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2000', '2005', '2010', '2015', '2020', '2025', '2030'],
            datasets: [{
                label: 'Wind Pattern Variability Index',
                data: [1.0, 1.2, 1.5, 1.8, 2.2, 2.8, 3.5],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Pollen Dispersal Efficiency',
                data: [100, 95, 88, 80, 72, 65, 58],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true
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
                        text: 'Index Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Climate Change Impact Trends'
                }
            }
        }
    });
}

function createJetStreamChart() {
    const ctx = document.getElementById('jetStreamChart').getContext('2d');

    // Initial data for current climate
    const currentData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Jet Stream Position (°N)',
            data: [45, 48, 52, 55, 58, 60, 62, 60, 55, 50, 46, 44],
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const jetStreamChart = new Chart(ctx, {
        type: 'line',
        data: currentData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Latitude (°N)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Northern Hemisphere Jet Stream'
                }
            }
        }
    });

    // Store chart reference for updates
    window.jetStreamChart = jetStreamChart;
}

function createTradeWindsChart() {
    const ctx = document.getElementById('tradeWindsChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pacific', 'Atlantic', 'Indian'],
            datasets: [{
                label: 'Current Speed (km/h)',
                data: [25, 22, 28],
                backgroundColor: [
                    'rgba(14, 165, 233, 0.8)',
                    'rgba(56, 189, 248, 0.8)',
                    'rgba(125, 211, 252, 0.8)'
                ],
                borderColor: [
                    '#0ea5e9',
                    '#38bdf8',
                    '#7dd3fc'
                ],
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
                        text: 'Wind Speed (km/h)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Trade Wind Systems'
                }
            }
        }
    });
}

function createEcologicalImpactsChart() {
    const ctx = document.getElementById('ecologicalImpactsChart').getContext('2d');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Plant Reproduction', 'Biodiversity', 'Agriculture', 'Human Health', 'Ecosystem Services'],
            datasets: [{
                label: 'Impact Severity',
                data: [8, 7, 9, 6, 7],
                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                borderColor: '#0ea5e9',
                borderWidth: 2,
                pointBackgroundColor: '#0ea5e9',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#0ea5e9'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ecological Impact Assessment (1-10 Scale)'
                }
            }
        }
    });
}

// ======================== Wind Patterns Simulation ========================

function initializeWindPatterns() {
    const scenarioSelect = document.getElementById('climateScenario');
    const seasonSelect = document.getElementById('seasonSelect');
    const simulateBtn = document.getElementById('simulatePatternsBtn');

    simulateBtn.addEventListener('click', () => {
        updateWindPatterns(scenarioSelect.value, seasonSelect.value);
    });

    // Initialize with current climate
    updateWindPatterns('current', 'winter');
}

function updateWindPatterns(scenario, season) {
    if (window.jetStreamChart) {
        let data;
        let title;

        switch (scenario) {
            case 'current':
                data = getCurrentClimateData(season);
                title = 'Northern Hemisphere Jet Stream - Current Climate';
                break;
            case 'moderate':
                data = getModerateWarmingData(season);
                title = 'Northern Hemisphere Jet Stream - Moderate Warming (+2°C)';
                break;
            case 'extreme':
                data = getExtremeWarmingData(season);
                title = 'Northern Hemisphere Jet Stream - Extreme Warming (+4°C)';
                break;
        }

        window.jetStreamChart.data.datasets[0].data = data;
        window.jetStreamChart.options.plugins.title.text = title;
        window.jetStreamChart.update();
    }
}

function getCurrentClimateData(season) {
    const baseData = {
        winter: [45, 48, 52, 55, 58, 60, 62, 60, 55, 50, 46, 44],
        spring: [48, 52, 56, 60, 64, 66, 68, 66, 62, 56, 52, 48],
        summer: [50, 54, 58, 62, 66, 68, 70, 68, 64, 58, 54, 50],
        fall: [46, 50, 54, 58, 62, 64, 66, 64, 60, 54, 50, 46]
    };
    return baseData[season] || baseData.winter;
}

function getModerateWarmingData(season) {
    const baseData = getCurrentClimateData(season);
    return baseData.map(value => value + Math.random() * 4 - 2); // Add variability
}

function getExtremeWarmingData(season) {
    const baseData = getCurrentClimateData(season);
    return baseData.map((value, index) => {
        // More extreme shifts in certain months
        const shift = (index > 5 && index < 9) ? Math.random() * 8 - 4 : Math.random() * 6 - 3;
        return Math.max(30, Math.min(80, value + shift));
    });
}

// ======================== Pollen Dispersal Simulation ========================

function initializeDispersalSimulation() {
    const windSpeedSlider = document.getElementById('windSpeed');
    const windDirectionSelect = document.getElementById('windDirection');
    const pollenTypeSelect = document.getElementById('pollenType');
    const simulateBtn = document.getElementById('simulateDispersalBtn');
    const canvas = document.getElementById('dispersalCanvas');
    const ctx = canvas.getContext('2d');

    // Update wind speed display
    windSpeedSlider.addEventListener('input', () => {
        document.getElementById('windSpeedValue').textContent = windSpeedSlider.value;
    });

    // Initialize canvas
    drawDispersalField(ctx);

    simulateBtn.addEventListener('click', () => {
        runDispersalSimulation(ctx, {
            windSpeed: parseInt(windSpeedSlider.value),
            windDirection: windDirectionSelect.value,
            pollenType: pollenTypeSelect.value
        });
    });
}

function drawDispersalField(ctx) {
    const canvas = ctx.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw field background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87ceeb'); // Sky blue
    gradient.addColorStop(0.7, '#98fb98'); // Pale green
    gradient.addColorStop(1, '#90ee90'); // Light green
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw source plant
    ctx.fillStyle = '#8b4513'; // Brown trunk
    ctx.fillRect(canvas.width / 2 - 5, canvas.height - 50, 10, 30);
    ctx.fillStyle = '#228b22'; // Green foliage
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - 50, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Label
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Pollen Source', canvas.width / 2, canvas.height - 5);
}

function runDispersalSimulation(ctx, params) {
    const canvas = ctx.canvas;
    let animationId;
    let frame = 0;
    const maxFrames = 120;

    // Reset stats
    updateDispersalStats(0, 0, 0);

    // Clear previous animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    function animate() {
        frame++;

        // Redraw field
        drawDispersalField(ctx);

        // Draw pollen dispersal
        drawPollenDispersal(ctx, frame, params);

        // Update stats
        const stats = calculateDispersalStats(frame, params);
        updateDispersalStats(stats.maxDistance, stats.effectiveRange, stats.depositionRate);

        if (frame < maxFrames) {
            animationId = requestAnimationFrame(animate);
        }
    }

    animate();
}

function drawPollenDispersal(ctx, frame, params) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const startY = canvas.height - 50;

    // Calculate dispersal parameters based on settings
    const windSpeed = params.windSpeed;
    const direction = params.windDirection;
    const pollenType = params.pollenType;

    // Adjust dispersal characteristics
    let maxDistance, spreadFactor, particleCount;

    switch (pollenType) {
        case 'light':
            maxDistance = windSpeed * 2;
            spreadFactor = 0.8;
            particleCount = 50;
            break;
        case 'medium':
            maxDistance = windSpeed * 1.5;
            spreadFactor = 0.6;
            particleCount = 40;
            break;
        case 'heavy':
            maxDistance = windSpeed * 1.0;
            spreadFactor = 0.4;
            particleCount = 30;
            break;
    }

    // Direction adjustments
    let dirX = 0, dirY = -1; // Default upward
    switch (direction) {
        case 'north': dirX = 0; dirY = -1; break;
        case 'south': dirX = 0; dirY = 1; break;
        case 'east': dirX = 1; dirY = 0; break;
        case 'west': dirX = -1; dirY = 0; break;
    }

    // Draw pollen particles
    ctx.fillStyle = 'rgba(255, 255, 0, 0.7)'; // Yellow pollen

    for (let i = 0; i < particleCount; i++) {
        const progress = (frame / 120) * (Math.random() * 0.8 + 0.2);
        const distance = progress * maxDistance;

        // Add some randomness to direction
        const angle = Math.random() * Math.PI * spreadFactor;
        const x = centerX + dirX * distance + Math.sin(angle) * distance * 0.3;
        const y = startY + dirY * distance + Math.cos(angle) * distance * 0.3;

        // Only draw if within canvas bounds
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            const size = (1 - progress) * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function calculateDispersalStats(frame, params) {
    const progress = Math.min(frame / 120, 1);
    const windSpeed = params.windSpeed;
    const pollenType = params.pollenType;

    let maxDistance, effectiveRange, depositionRate;

    switch (pollenType) {
        case 'light':
            maxDistance = Math.round(windSpeed * 2 * progress);
            effectiveRange = Math.round(maxDistance * 0.7);
            depositionRate = Math.round(progress * 85);
            break;
        case 'medium':
            maxDistance = Math.round(windSpeed * 1.5 * progress);
            effectiveRange = Math.round(maxDistance * 0.6);
            depositionRate = Math.round(progress * 75);
            break;
        case 'heavy':
            maxDistance = Math.round(windSpeed * 1.0 * progress);
            effectiveRange = Math.round(maxDistance * 0.5);
            depositionRate = Math.round(progress * 65);
            break;
    }

    return { maxDistance, effectiveRange, depositionRate };
}

function updateDispersalStats(maxDistance, effectiveRange, depositionRate) {
    document.getElementById('maxDistance').textContent = `${maxDistance} km`;
    document.getElementById('effectiveRange').textContent = `${effectiveRange} km`;
    document.getElementById('depositionRate').textContent = `${depositionRate}%`;
}

// ======================== Utility Functions ========================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ======================== Responsive Design Helpers ========================

function handleResize() {
    // Reinitialize charts on resize for responsiveness
    const charts = ['impactTrendsChart', 'jetStreamChart', 'tradeWindsChart', 'ecologicalImpactsChart'];
    charts.forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (canvas && canvas.chart) {
            canvas.chart.resize();
        }
    });
}

window.addEventListener('resize', debounce(handleResize, 250));