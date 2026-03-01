// Groundwater Depletion Awareness Gap - Dynamic Page Loader
// Author: Ayaanshaikh12243 & Contributors
// Description: Shows groundwater stress, recharge, extraction, and conservation actions

document.addEventListener('DOMContentLoaded', () => {
    renderSections();
    setupNavLinks();
});

function renderSections() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section id="about">
            <h2>About</h2>
            <p>This page visualizes local groundwater stress, recharge potential, extraction pressure, and household-level conservation actions. It helps make hidden water risk visible before shortages occur.</p>
        </section>
        <section id="stress-map">
            <h2>Groundwater Stress Map</h2>
            <div id="map" style="height:350px;width:100%;border-radius:10px;margin-bottom:1rem;"></div>
            <div id="map-legend"></div>
        </section>
        <section id="trends">
            <h2>Trends & Analytics</h2>
            <canvas id="trend-chart" height="120"></canvas>
        </section>
        <section id="recharge">
            <h2>Recharge Potential</h2>
            <div id="recharge-info"></div>
        </section>
        <section id="extraction">
            <h2>Extraction Pressure</h2>
            <div id="extraction-info"></div>
        </section>
        <section id="actions">
            <h2>Household Conservation Actions</h2>
            <ul id="actions-list"></ul>
        </section>
        <section id="faq">
            <h2>FAQ</h2>
            <div id="faq-list"></div>
        </section>
    `;
    renderMap();
    renderTrends();
    renderRecharge();
    renderExtraction();
    renderActions();
    renderFAQ();
}

function setupNavLinks() {
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function renderMap() {
    // Use Leaflet for interactive map (simulated data)
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
    script.onload = () => {
        const map = L.map('map').setView([28.6, 77.2], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        // Simulated stress overlay
        const stressAreas = [
            { coords: [28.7, 77.1], level: 'High' },
            { coords: [28.4, 77.3], level: 'Medium' },
            { coords: [28.9, 77.0], level: 'Low' }
        ];
        stressAreas.forEach(area => {
            L.circle(area.coords, {
                color: area.level === 'High' ? '#e53935' : area.level === 'Medium' ? '#ffb300' : '#43a047',
                fillColor: area.level === 'High' ? '#e57373' : area.level === 'Medium' ? '#ffe082' : '#b9f6ca',
                fillOpacity: 0.4,
                radius: 20000
            }).addTo(map).bindPopup(`<b>Stress Level:</b> ${area.level}`);
        });
        document.getElementById('map-legend').innerHTML = `
            <span style="display:inline-block;width:18px;height:18px;background:#e53935;border-radius:50%;margin-right:6px;"></span> High
            <span style="display:inline-block;width:18px;height:18px;background:#ffb300;border-radius:50%;margin:0 6px 0 18px;"></span> Medium
            <span style="display:inline-block;width:18px;height:18px;background:#43a047;border-radius:50%;margin:0 6px 0 18px;"></span> Low
        `;
    };
    document.head.appendChild(script);
}

function renderTrends() {
    // Use Chart.js for groundwater trend chart (simulated data)
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
        const ctx = document.getElementById('trend-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'],
                datasets: [{
                    label: 'Water Table (m below ground)',
                    data: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25,118,210,0.08)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: { beginAtZero: false, title: { display: true, text: 'Meters below ground' } }
                }
            }
        });
    };
    document.head.appendChild(script);
}

function renderRecharge() {
    document.getElementById('recharge-info').innerHTML = `
        <ul>
            <li><b>Rainwater Harvesting Potential:</b> High (avg. 800mm/year)</li>
            <li><b>Soil Permeability:</b> Moderate</li>
            <li><b>Green Cover:</b> 32%</li>
            <li><b>Recharge Structures:</b> 12 per sq km</li>
        </ul>
    `;
}

function renderExtraction() {
    document.getElementById('extraction-info').innerHTML = `
        <ul>
            <li><b>Annual Extraction:</b> 2.1 billion m³</li>
            <li><b>Major Use:</b> Agriculture (68%)</li>
            <li><b>Industrial Use:</b> 18%</li>
            <li><b>Household Use:</b> 14%</li>
            <li><b>Extraction Pressure Index:</b> <span style="color:#e53935;font-weight:bold;">High</span></li>
        </ul>
    `;
}

function renderActions() {
    document.getElementById('actions-list').innerHTML = `
        <li>Install low-flow taps and showerheads</li>
        <li>Fix leaks promptly</li>
        <li>Harvest rainwater for garden/cleaning</li>
        <li>Use buckets instead of hoses for washing</li>
        <li>Reuse RO wastewater for plants</li>
        <li>Water lawns early morning or late evening</li>
        <li>Educate family on water-saving habits</li>
    `;
}

function renderFAQ() {
    document.getElementById('faq-list').innerHTML = `
        <b>Q: How do I know if my area is at risk?</b><br>A: Check the stress map and trends above.<br><br>
        <b>Q: What is recharge potential?</b><br>A: The ability of the ground to absorb and store rainwater.<br><br>
        <b>Q: What is extraction pressure?</b><br>A: The demand on groundwater from agriculture, industry, and homes.<br><br>
        <b>Q: How can I help?</b><br>A: See the conservation actions section for tips.
    `;
}
