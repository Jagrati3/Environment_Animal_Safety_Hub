// Deep-Sea Mining Sediment Plumes - Frontend JavaScript

// ======================== Initialization ========================

document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeCharts();
    initializePlumeSimulation();
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
    createImpactScaleChart();
    createImpactAssessmentChart();
    createVulnerabilityChart();
}

function createImpactScaleChart() {
    const ctx = document.getElementById('impactScaleChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Near-Field', 'Mid-Field', 'Far-Field'],
            datasets: [{
                label: 'Sediment Concentration (mg/L)',
                data: [1000, 100, 10],
                backgroundColor: [
                    '#dc2626', // Red for high impact
                    '#f59e0b', // Orange for medium impact
                    '#10b981'  // Green for low impact
                ],
                borderColor: [
                    '#b91c1c',
                    '#d97706',
                    '#059669'
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
                        text: 'Sediment Concentration (mg/L)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Distance from Mining Site'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Sediment Plume Concentration by Distance'
                }
            }
        }
    });
}

function createImpactAssessmentChart() {
    const ctx = document.getElementById('impactAssessmentChart').getContext('2d');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Smothering', 'Habitat Loss', 'Food Chain', 'Reproduction', 'Recovery Time'],
            datasets: [{
                label: 'Impact Severity',
                data: [9, 8, 7, 6, 10],
                backgroundColor: 'rgba(30, 58, 138, 0.2)',
                borderColor: '#1e3a8a',
                borderWidth: 2,
                pointBackgroundColor: '#1e3a8a',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#1e3a8a'
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
                    text: 'Benthic Impact Assessment (1-10 Scale)'
                }
            }
        }
    });
}

function createVulnerabilityChart() {
    const ctx = document.getElementById('vulnerabilityChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Vulnerability', 'Medium-High', 'Medium'],
            datasets: [{
                data: [50, 30, 20],
                backgroundColor: [
                    '#dc2626', // High
                    '#f59e0b', // Medium-High
                    '#10b981'  // Medium
                ],
                borderColor: [
                    '#b91c1c',
                    '#d97706',
                    '#059669'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Species Vulnerability Distribution'
                }
            }
        }
    });
}

// ======================== Plume Simulation ========================

function initializePlumeSimulation() {
    const intensitySlider = document.getElementById('miningIntensity');
    const currentSlider = document.getElementById('currentSpeed');
    const intensityValue = document.getElementById('intensityValue');
    const currentValue = document.getElementById('currentValue');
    const simulateBtn = document.getElementById('simulateBtn');
    const canvas = document.getElementById('plumeCanvas');
    const ctx = canvas.getContext('2d');

    // Update slider values
    intensitySlider.addEventListener('input', () => {
        intensityValue.textContent = intensitySlider.value;
    });

    currentSlider.addEventListener('input', () => {
        currentValue.textContent = currentSlider.value;
    });

    // Initialize canvas
    drawInitialCanvas(ctx);

    // Simulation
    simulateBtn.addEventListener('click', () => {
        runPlumeSimulation(ctx, parseInt(intensitySlider.value), parseInt(currentSlider.value));
    });
}

function drawInitialCanvas(ctx) {
    const canvas = ctx.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ocean background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.5, '#3b82f6');
    gradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw mining site
    ctx.fillStyle = '#64748b';
    ctx.fillRect(canvas.width / 2 - 10, canvas.height - 20, 20, 20);

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Mining Site', canvas.width / 2, canvas.height - 25);
}

function runPlumeSimulation(ctx, intensity, currentSpeed) {
    const canvas = ctx.canvas;
    let animationId;
    let frame = 0;
    const maxFrames = 200;

    function animate() {
        frame++;

        // Clear and redraw background
        drawInitialCanvas(ctx);

        // Draw plume
        drawPlume(ctx, frame, intensity, currentSpeed);

        if (frame < maxFrames) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // Cancel any existing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    animate();
}

function drawPlume(ctx, frame, intensity, currentSpeed) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const startY = canvas.height - 20;

    // Plume parameters
    const maxRadius = Math.min(canvas.width, canvas.height) / 3;
    const plumeLength = (frame / 200) * canvas.height * 0.8;
    const plumeWidth = (intensity / 10) * maxRadius;

    // Current effect (horizontal drift)
    const drift = (currentSpeed / 10) * (frame / 200) * canvas.width * 0.3;

    // Draw plume as gradient ellipse
    const gradient = ctx.createRadialGradient(
        centerX + drift, startY - plumeLength/2,
        0,
        centerX + drift, startY - plumeLength/2,
        plumeWidth
    );

    gradient.addColorStop(0, 'rgba(100, 116, 139, 0.8)');
    gradient.addColorStop(0.5, 'rgba(100, 116, 139, 0.4)');
    gradient.addColorStop(1, 'rgba(100, 116, 139, 0.1)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
        centerX + drift,
        startY - plumeLength/2,
        plumeWidth,
        plumeLength/2,
        0, 0, 2 * Math.PI
    );
    ctx.fill();

    // Draw dispersion particles
    drawDispersionParticles(ctx, centerX, startY, plumeLength, drift, intensity);
}

function drawDispersionParticles(ctx, centerX, startY, plumeLength, drift, intensity) {
    const particleCount = intensity * 20;

    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';

    for (let i = 0; i < particleCount; i++) {
        const progress = Math.random();
        const y = startY - (progress * plumeLength);
        const x = centerX + drift + (Math.random() - 0.5) * 200 * progress;
        const size = (1 - progress) * 3 + 1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
    }
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
    const charts = ['impactScaleChart', 'impactAssessmentChart', 'vulnerabilityChart'];
    charts.forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (canvas && canvas.chart) {
            canvas.chart.resize();
        }
    });
}

window.addEventListener('resize', debounce(handleResize, 250));