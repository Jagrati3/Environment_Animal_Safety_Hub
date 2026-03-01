// Flood Memory Atlas
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class FloodEvent {
    constructor(id, neighborhood, street, date, waterDepth, recoveryTime, drainageFailure, notes, lat, lng) {
        this.id = id;
        this.neighborhood = neighborhood;
        this.street = street;
        this.date = date;
        this.waterDepth = waterDepth; // in cm
        this.recoveryTime = recoveryTime; // in hours
        this.drainageFailure = drainageFailure; // true/false
        this.notes = notes;
        this.lat = lat;
        this.lng = lng;
    }
}

// ======================
// Section 2: Data Store
// ======================

const floodEvents = [
    new FloodEvent(1, 'Green Park', 'Maple St', '2025-08-10', 45, 12, true, 'Drain blocked, water up to knees', 28.6139, 77.2090),
    new FloodEvent(2, 'Riverdale', 'Elm Ave', '2025-09-15', 30, 6, false, 'Quick recovery, minor overflow', 28.6145, 77.2102),
    new FloodEvent(3, 'Sunset Colony', 'Palm Rd', '2025-07-22', 60, 24, true, 'Severe flooding, cars stranded', 28.6122, 77.2085),
    new FloodEvent(4, 'Green Park', 'Oak St', '2025-08-11', 20, 3, false, 'Localized puddle', 28.6137, 77.2095),
    new FloodEvent(5, 'Riverdale', 'Pine St', '2025-09-16', 35, 8, true, 'Drainage slow, water up to ankles', 28.6148, 77.2108)
];

let nextFloodEventId = 6;

// ======================
// Section 3: UI Components
// ======================

function createSection(id, title, content) {
    const section = document.createElement('section');
    section.id = id;
    const h2 = document.createElement('h2');
    h2.textContent = title;
    section.appendChild(h2);
    if (typeof content === 'string') {
        const p = document.createElement('p');
        p.innerHTML = content;
        section.appendChild(p);
    } else if (content instanceof HTMLElement) {
        section.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach(el => section.appendChild(el));
    }
    return section;
}

function createFloodEventTable() {
    const table = document.createElement('table');
    table.className = 'event-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['ID', 'Neighborhood', 'Street', 'Date', 'Water Depth (cm)', 'Recovery Time (hrs)', 'Drainage Failure', 'Notes'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    floodEvents.forEach(event => {
        const tr = document.createElement('tr');
        [event.id, event.neighborhood, event.street, event.date, event.waterDepth, event.recoveryTime, event.drainageFailure ? 'Yes' : 'No', event.notes].forEach((val, i) => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createLogFloodForm() {
    const form = document.createElement('form');
    form.className = 'card';
    form.id = 'log-flood-form';
    form.innerHTML = `
        <h3>Log New Flood Event</h3>
        <label>Neighborhood: <input type="text" name="neighborhood" required></label><br><br>
        <label>Street: <input type="text" name="street" required></label><br><br>
        <label>Date: <input type="date" name="date" required></label><br><br>
        <label>Water Depth (cm): <input type="number" name="waterDepth" min="0" required></label><br><br>
        <label>Recovery Time (hours): <input type="number" name="recoveryTime" min="0" required></label><br><br>
        <label>Drainage Failure: <input type="checkbox" name="drainageFailure"></label><br><br>
        <label>Notes: <input type="text" name="notes"></label><br><br>
        <label>Latitude: <input type="number" name="lat" step="0.0001" required></label><br><br>
        <label>Longitude: <input type="number" name="lng" step="0.0001" required></label><br><br>
        <button type="submit">Log Event</button>
        <div id="form-msg" style="margin-top:1rem;color:#4682b4;"></div>
    `;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const event = new FloodEvent(
            nextFloodEventId++,
            data.get('neighborhood'),
            data.get('street'),
            data.get('date'),
            parseInt(data.get('waterDepth'), 10),
            parseInt(data.get('recoveryTime'), 10),
            data.get('drainageFailure') === 'on',
            data.get('notes'),
            parseFloat(data.get('lat')),
            parseFloat(data.get('lng'))
        );
        floodEvents.push(event);
        document.getElementById('atlas').replaceWith(createSection('atlas', 'Memory Map', createMemoryMap()));
        document.getElementById('log').replaceWith(createSection('log', 'Log Flood Event', createLogFloodForm()));
        document.getElementById('form-msg').textContent = 'Flood event logged!';
        setTimeout(() => { document.getElementById('form-msg').textContent = ''; }, 3000);
        form.reset();
    });
    return form;
}

function createMemoryMap() {
    const div = document.createElement('div');
    div.className = 'map-container';
    div.id = 'memory-map';
    setTimeout(renderMemoryMap, 100);
    return div;
}

function renderMemoryMap() {
    if (!window.L) {
        loadLeafletJs(() => renderMemoryMap());
        return;
    }
    const mapDiv = document.getElementById('memory-map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '';
    const map = L.map('memory-map').setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    floodEvents.forEach(event => {
        const marker = L.marker([event.lat, event.lng]).addTo(map);
        marker.bindPopup(`<b>${event.neighborhood}, ${event.street}</b><br>Date: ${event.date}<br>Depth: ${event.waterDepth}cm<br>Recovery: ${event.recoveryTime}h<br>Drainage Failure: ${event.drainageFailure ? 'Yes' : 'No'}<br>${event.notes}`);
    });
}

function loadLeafletJs(callback) {
    if (window.L) {
        callback();
        return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
    script.onload = callback;
    document.body.appendChild(script);
}

function createAnalyticsSection() {
    const section = document.createElement('section');
    section.id = 'analytics';
    const h2 = document.createElement('h2');
    h2.textContent = 'Flood Analytics';
    section.appendChild(h2);
    const total = floodEvents.length;
    const drainage = floodEvents.filter(e => e.drainageFailure).length;
    const avgDepth = (floodEvents.reduce((sum, e) => sum + e.waterDepth, 0) / total).toFixed(1);
    const avgRecovery = (floodEvents.reduce((sum, e) => sum + e.recoveryTime, 0) / total).toFixed(1);
    const p = document.createElement('p');
    p.innerHTML = `<strong>Total Events:</strong> ${total} &nbsp; <strong>Drainage Failures:</strong> ${drainage} &nbsp; <strong>Avg. Depth:</strong> ${avgDepth}cm &nbsp; <strong>Avg. Recovery:</strong> ${avgRecovery}h`;
    section.appendChild(p);
    // Chart placeholder
    const chartDiv = document.createElement('div');
    chartDiv.className = 'data-visual';
    chartDiv.innerHTML = `
        <canvas id="floodChart" width="400" height="220"></canvas>
        <p style="font-size:0.9rem;color:#555;">Floods by Neighborhood</p>
    `;
    section.appendChild(chartDiv);
    setTimeout(renderFloodChart, 100);
    return section;
}

function renderFloodChart() {
    const ctx = document.getElementById('floodChart').getContext('2d');
    if (!window.Chart) {
        loadChartJs(() => renderFloodChart());
        return;
    }
    // Group by neighborhood
    const neighborhoods = {};
    floodEvents.forEach(event => {
        if (!neighborhoods[event.neighborhood]) neighborhoods[event.neighborhood] = 0;
        neighborhoods[event.neighborhood]++;
    });
    const labels = Object.keys(neighborhoods);
    const data = labels.map(n => neighborhoods[n]);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Flood Events',
                    data,
                    backgroundColor: '#4682b4'
                }
            ]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Events'
                    }
                }
            }
        }
    });
}

function loadChartJs(callback) {
    if (window.Chart) {
        callback();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = callback;
    document.body.appendChild(script);
}

function createFAQSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Frequently Asked Questions</h3>
        <h4>Why log local flood events?</h4>
        <p>Street-level data helps communities and planners understand real flood risks and improve preparedness.</p>
        <h4>How accurate is the memory map?</h4>
        <p>It depends on community participation. More logs mean better accuracy over time.</p>
        <h4>Can I edit or remove events?</h4>
        <p>Currently, events can only be added. Future versions may allow editing or removal.</p>
        <h4>Is my location data safe?</h4>
        <p>This demo stores data only in your browser session. No personal data is collected.</p>
    `;
    return div;
}

// ======================
// Section 4: Page Assembly
// ======================

function loadSections() {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    // About Section
    main.appendChild(createSection('about', 'About the Flood Memory Atlas', 'A community-driven page where neighborhoods log past flood points, drainage failure spots, street-level water depth, and recovery time, creating a “memory map” of local flood behavior over years.'));
    // Log Flood Event
    main.appendChild(createSection('log', 'Log Flood Event', createLogFloodForm()));
    // Memory Map
    main.appendChild(createSection('atlas', 'Memory Map', createMemoryMap()));
    // Analytics
    main.appendChild(createAnalyticsSection());
    // FAQ
    main.appendChild(createSection('faq', 'FAQ', createFAQSection()));
}

document.addEventListener('DOMContentLoaded', () => {
    loadSections();
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ======================
// Section 5: Utility Functions
// ======================

// Debounce utility for future use
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ======================
// Section 6: Future Extensions
// ======================

// Placeholder for future features (e.g., user accounts, export, map layers)
// ...
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).
