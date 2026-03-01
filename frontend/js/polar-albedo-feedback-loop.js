document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSimulator();
    initImpactMap();
    drawTrendChart();
});

function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.section');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(item => item.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
}

function initSimulator() {
    const slider = document.getElementById('tempRise');
    if (!slider) return;

    const render = (temp) => {
        const albedo = clamp(0.82 - ((temp - 0.8) / 3.2) * 0.42, 0.35, 0.82);
        const absorption = clamp(100 - (albedo * 100), 18, 90);
        const extent = clamp(6.8 - ((temp - 0.8) * 1.36), 0.6, 6.8);

        setText('tempValue', `${temp.toFixed(1)}°C`);
        setText('albedoIndex', albedo.toFixed(2));
        setText('heatAbsorb', `${Math.round(absorption)}%`);
        setText('iceExtent', `${extent.toFixed(1)} M km²`);

        const severity = getSeverity(temp, extent);
        setText('severityText', severity);

        drawSimulationChart(temp, extent);
        drawTrendChart(temp);
        updateImpactBars(temp);
    };

    slider.addEventListener('input', (event) => render(Number(event.target.value)));
    render(Number(slider.value));
}

function getSeverity(temp, extent) {
    if (temp < 1.4 && extent > 4.2) return 'High';
    if (temp < 2.2 && extent > 2.8) return 'Very High';
    if (temp < 3.0 && extent > 1.8) return 'Critical';
    return 'Extreme';
}

function drawSimulationChart(temp, startExtent) {
    const canvas = document.getElementById('simChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 36;

    ctx.clearRect(0, 0, width, height);

    const points = [];
    const years = 20;
    for (let i = 0; i <= years; i++) {
        const t = i / years;
        const declineFactor = (0.07 + (temp - 0.8) * 0.03) * i;
        const extraFeedback = Math.pow(t, 2) * (temp - 0.8) * 0.9;
        const value = Math.max(0.2, startExtent - declineFactor - extraFeedback);
        points.push(value);
    }

    const maxY = Math.max(...points, 7);
    const minY = 0;

    drawAxes(ctx, width, height, padding);

    ctx.beginPath();
    points.forEach((value, i) => {
        const x = padding + (i / years) * (width - padding * 2);
        const y = height - padding - ((value - minY) / (maxY - minY)) * (height - padding * 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#7ee5ff';
    ctx.stroke();

    ctx.fillStyle = 'rgba(126, 229, 255, 0.16)';
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#d9f7ff';
    ctx.font = '12px Poppins';
    ctx.fillText('Year 0', padding - 8, height - 12);
    ctx.fillText('Year 20', width - padding - 24, height - 12);
    ctx.fillText('Sea-ice extent projection', padding + 6, padding - 12);
}

function drawTrendChart(temp = 1.2) {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 44;

    ctx.clearRect(0, 0, width, height);
    drawAxes(ctx, width, height, padding);

    const years = 40;
    const observed = [];
    const projected = [];

    for (let i = 0; i <= years; i++) {
        const obs = 7.5 - (i * 0.08);
        observed.push(Math.max(2.5, obs));

        const projectionSlope = 0.095 + (temp - 0.8) * 0.04;
        const proj = 7.5 - (i * projectionSlope) - Math.pow(i / years, 2) * (temp - 0.8) * 2.2;
        projected.push(Math.max(0.5, proj));
    }

    plotLine(ctx, observed, '#9be6ff', width, height, padding, years, 8);
    plotLine(ctx, projected, '#ff8f8f', width, height, padding, years, 8);

    ctx.fillStyle = '#e9fbff';
    ctx.font = '12px Poppins';
    ctx.fillText('1985', padding - 10, height - 16);
    ctx.fillText('2025', width / 2 - 14, height - 16);
    ctx.fillText('2065', width - padding - 20, height - 16);

    ctx.fillStyle = '#9be6ff';
    ctx.fillRect(width - 238, 16, 14, 3);
    ctx.fillStyle = '#e6fbff';
    ctx.fillText('Observed extent', width - 216, 22);

    ctx.fillStyle = '#ff8f8f';
    ctx.fillRect(width - 238, 36, 14, 3);
    ctx.fillStyle = '#e6fbff';
    ctx.fillText('Projection at selected warming', width - 216, 42);
}

function initImpactMap() {
    updateImpactBars(1.2);
}

function updateImpactBars(temp) {
    const arctic = clamp(38 + (temp - 1.2) * 10, 22, 76);
    const greenland = clamp(22 + (temp - 1.2) * 8, 10, 61);
    const antarctic = clamp(14 + (temp - 1.2) * 7, 5, 52);

    setBar('arcticFill', arctic);
    setBar('greenlandFill', greenland);
    setBar('antarcticFill', antarctic);

    setText('arcticLabel', `Observed decline: ${Math.round(arctic)}%`);
    setText('greenlandLabel', `Observed decline: ${Math.round(greenland)}%`);
    setText('antarcticLabel', `Observed decline: ${Math.round(antarctic)}%`);
}

function setBar(id, value) {
    const node = document.getElementById(id);
    if (node) node.style.width = `${value}%`;
}

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
}

function clamp(num, min, max) {
    return Math.min(max, Math.max(min, num));
}

function drawAxes(ctx, width, height, padding) {
    ctx.strokeStyle = 'rgba(201, 242, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
}

function plotLine(ctx, values, color, width, height, padding, length, maxY) {
    ctx.beginPath();
    values.forEach((value, index) => {
        const x = padding + (index / length) * (width - padding * 2);
        const y = height - padding - (value / maxY) * (height - padding * 2);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}