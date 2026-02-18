// Coral Larval Navigation Disruption by Electromagnetic Fields - Frontend JavaScript

// ======================== Initialization ========================

document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeCharts();
    initializeCableNetwork();
    initializeEMFSimulation();
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
    createResearchStatusChart();
    createLarvalDevelopmentChart();
}

function createResearchStatusChart() {
    const ctx = document.getElementById('researchStatusChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Established Evidence', 'Preliminary Studies', 'Research Gaps', 'Unknown Effects'],
            datasets: [{
                data: [15, 35, 40, 10],
                backgroundColor: [
                    '#10b981', // Green for established
                    '#f59e0b', // Yellow for preliminary
                    '#dc2626', // Red for gaps
                    '#6b7280'  // Gray for unknown
                ],
                borderColor: [
                    '#059669',
                    '#d97706',
                    '#b91c1c',
                    '#4b5563'
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
                    text: 'EMF-Coral Research Status'
                }
            }
        }
    });
}

function createLarvalDevelopmentChart() {
    const ctx = document.getElementById('larvalDevelopmentChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Fertilization', 'Embryogenesis', 'Planulation', 'Pelagic Phase', 'Competency', 'Settlement'],
            datasets: [{
                label: 'Developmental Vulnerability',
                data: [2, 3, 4, 8, 9, 6],
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#ff6b6b'
            }, {
                label: 'EMF Sensitivity',
                data: [1, 2, 3, 7, 8, 4],
                borderColor: '#0891b2',
                backgroundColor: 'rgba(8, 145, 178, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#0891b2',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#0891b2'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Sensitivity Level (1-10)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Larval Development Stages & EMF Sensitivity'
                }
            }
        }
    });
}

// ======================== Cable Network Visualization ========================

function initializeCableNetwork() {
    const canvas = document.getElementById('cableNetworkCanvas');
    const ctx = canvas.getContext('2d');
    const cableTypeSelect = document.getElementById('cableType');
    const regionSelect = document.getElementById('regionSelect');
    const updateBtn = document.getElementById('updateCablesBtn');

    // Initialize with global view
    drawCableNetwork(ctx, 'telecom', 'global');

    updateBtn.addEventListener('click', () => {
        drawCableNetwork(ctx, cableTypeSelect.value, regionSelect.value);
    });
}

function drawCableNetwork(ctx, cableType, region) {
    const canvas = ctx.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ocean background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0891b2');
    gradient.addColorStop(0.5, '#06b6d4');
    gradient.addColorStop(1, '#22d3ee');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw continents (simplified)
    drawContinents(ctx);

    // Draw cable routes based on type and region
    drawCableRoutes(ctx, cableType, region);

    // Add labels
    addCableLabels(ctx, cableType, region);
}

function drawContinents(ctx) {
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#065f46';
    ctx.lineWidth = 2;

    // Simplified continents
    // North America
    ctx.beginPath();
    ctx.rect(50, 150, 120, 80);
    ctx.fill();
    ctx.stroke();

    // Europe/Africa
    ctx.beginPath();
    ctx.rect(300, 120, 80, 120);
    ctx.fill();
    ctx.stroke();

    // Asia
    ctx.beginPath();
    ctx.rect(450, 100, 150, 100);
    ctx.fill();
    ctx.stroke();

    // Australia
    ctx.beginPath();
    ctx.rect(550, 300, 80, 60);
    ctx.fill();
    ctx.stroke();
}

function drawCableRoutes(ctx, cableType, region) {
    ctx.strokeStyle = cableType === 'power' ? '#ff6b6b' : '#0891b2';
    ctx.lineWidth = cableType === 'power' ? 4 : 2;
    ctx.setLineDash(cableType === 'both' ? [5, 5] : []);

    const routes = getCableRoutes(region);

    routes.forEach(route => {
        ctx.beginPath();
        ctx.moveTo(route.start.x, route.start.y);
        ctx.lineTo(route.end.x, route.end.y);
        ctx.stroke();
    });

    ctx.setLineDash([]); // Reset dash
}

function getCableRoutes(region) {
    const routes = {
        global: [
            { start: { x: 100, y: 200 }, end: { x: 350, y: 150 } },
            { start: { x: 350, y: 150 }, end: { x: 500, y: 120 } },
            { start: { x: 500, y: 120 }, end: { x: 580, y: 320 } },
            { start: { x: 100, y: 200 }, end: { x: 580, y: 320 } }
        ],
        pacific: [
            { start: { x: 50, y: 180 }, end: { x: 200, y: 160 } },
            { start: { x: 200, y: 160 }, end: { x: 350, y: 140 } },
            { start: { x: 350, y: 140 }, end: { x: 500, y: 120 } }
        ],
        atlantic: [
            { start: { x: 150, y: 200 }, end: { x: 320, y: 160 } },
            { start: { x: 320, y: 160 }, end: { x: 380, y: 200 } }
        ],
        indian: [
            { start: { x: 450, y: 140 }, end: { x: 550, y: 160 } },
            { start: { x: 550, y: 160 }, end: { x: 600, y: 200 } }
        ]
    };

    return routes[region] || routes.global;
}

function addCableLabels(ctx, cableType, region) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    const labels = {
        telecom: 'Telecom Cables',
        power: 'Power Cables',
        both: 'Cable Network'
    };

    ctx.fillText(`${labels[cableType]} - ${region.charAt(0).toUpperCase() + region.slice(1)} Ocean`, canvas.width / 2, 30);
}

// ======================== EMF Simulation ========================

function initializeEMFSimulation() {
    const currentSlider = document.getElementById('cableCurrent');
    const depthSlider = document.getElementById('waterDepth');
    const distanceSlider = document.getElementById('distance');
    const calculateBtn = document.getElementById('calculateEMFBtn');
    const canvas = document.getElementById('emfFieldCanvas');
    const ctx = canvas.getContext('2d');

    // Update display values
    currentSlider.addEventListener('input', () => {
        document.getElementById('currentValue').textContent = currentSlider.value;
    });

    depthSlider.addEventListener('input', () => {
        document.getElementById('depthValue').textContent = depthSlider.value;
    });

    distanceSlider.addEventListener('input', () => {
        document.getElementById('distanceValue').textContent = distanceSlider.value;
    });

    // Initialize canvas
    drawEMFField(ctx, 800, 1000, 10);

    calculateBtn.addEventListener('click', () => {
        const current = parseInt(currentSlider.value);
        const depth = parseInt(depthSlider.value);
        const distance = parseInt(distanceSlider.value);

        calculateEMFFields(current, depth, distance);
        drawEMFField(ctx, current, depth, distance);
    });

    // Initial calculation
    calculateEMFFields(800, 1000, 10);
}

function calculateEMFFields(current, depth, distance) {
    // Simplified EMF calculations (for demonstration)
    // In reality, these would use complex electromagnetic field equations

    // Magnetic field (μT) - simplified model
    const magneticField = (current * 0.002) / (2 * Math.PI * distance) * Math.exp(-distance / (depth / 10));

    // Electric field (V/m) - simplified model
    const electricField = (current * 0.0001) / (distance * distance) * Math.exp(-distance / (depth / 5));

    // Update displays
    document.getElementById('magneticField').textContent = magneticField.toFixed(2);
    document.getElementById('electricField').textContent = electricField.toFixed(2);

    // Risk assessment
    const riskLevel = document.getElementById('riskLevel');
    riskLevel.className = 'risk-indicator';

    if (magneticField > 10 || electricField > 1) {
        riskLevel.textContent = 'High';
        riskLevel.classList.add('high');
    } else if (magneticField > 5 || electricField > 0.5) {
        riskLevel.textContent = 'Medium';
        riskLevel.classList.add('medium');
    } else {
        riskLevel.textContent = 'Low';
        riskLevel.classList.add('low');
    }
}

function drawEMFField(ctx, current, depth, distance) {
    const canvas = ctx.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ocean background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0891b2');
    gradient.addColorStop(0.5, '#06b6d4');
    gradient.addColorStop(1, '#22d3ee');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cable
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.stroke();

    // Draw EMF field lines (simplified visualization)
    drawFieldLines(ctx, current, depth, distance);

    // Add labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Submarine Cable', canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText(`Distance: ${distance}m`, canvas.width / 2, 30);
}

function drawFieldLines(ctx, current, depth, distance) {
    const centerY = ctx.canvas.height / 2;
    const maxFieldLines = 10;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;

    for (let i = 1; i <= maxFieldLines; i++) {
        const fieldStrength = current / (i * distance);
        const alpha = Math.min(fieldStrength / 100, 0.8);

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;

        // Draw elliptical field lines
        const a = 50 + i * 20; // Semi-major axis
        const b = 20 + i * 10; // Semi-minor axis

        ctx.beginPath();
        ctx.ellipse(ctx.canvas.width / 2, centerY, a, b, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

// ======================== Utility Functions ========================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func => args;
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ======================== Responsive Design Helpers ========================

function handleResize() {
    // Reinitialize charts on resize for responsiveness
    const charts = ['researchStatusChart', 'larvalDevelopmentChart'];
    charts.forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (canvas && canvas.chart) {
            canvas.chart.resize();
        }
    });
}

window.addEventListener('resize', debounce(handleResize, 250));