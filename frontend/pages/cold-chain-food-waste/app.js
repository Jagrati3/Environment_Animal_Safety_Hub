// Cold-Chain Food Waste Leakage Tracker
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class Incident {
    constructor(id, foodType, stage, location, date, lossAmount, status, cause, notes) {
        this.id = id;
        this.foodType = foodType;
        this.stage = stage; // Storage, Transport, Handling
        this.location = location;
        this.date = date;
        this.lossAmount = lossAmount; // kg
        this.status = status; // 'Lost' or 'Saved'
        this.cause = cause; // e.g., 'Power Cut', 'Refrigeration Failure', 'Poor Handling'
        this.notes = notes;
    }
}

// ======================
// Section 2: Data Store
// ======================

const incidentData = [
    new Incident(1, 'Milk', 'Storage', 'Warehouse A', '2026-01-10', 120, 'Lost', 'Power Cut', 'No backup generator'),
    new Incident(2, 'Chicken', 'Transport', 'Route 5', '2026-01-12', 80, 'Lost', 'Refrigeration Failure', 'Truck breakdown'),
    new Incident(3, 'Vegetables', 'Handling', 'Market X', '2026-01-15', 60, 'Saved', 'Quick Response', 'Moved to cold room'),
    new Incident(4, 'Fish', 'Storage', 'Dock 3', '2026-01-18', 200, 'Lost', 'Power Cut', 'Long outage'),
    new Incident(5, 'Ice Cream', 'Transport', 'Route 2', '2026-01-20', 50, 'Lost', 'Refrigeration Failure', 'No monitoring'),
];

let nextIncidentId = 6;

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

function createIncidentTable() {
    const table = document.createElement('table');
    table.className = 'incident-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['ID', 'Food Type', 'Stage', 'Location', 'Date', 'Loss (kg)', 'Status', 'Cause', 'Notes'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    incidentData.forEach(incident => {
        const tr = document.createElement('tr');
        [incident.id, incident.foodType, incident.stage, incident.location, incident.date, incident.lossAmount, incident.status, incident.cause, incident.notes].forEach((val, i) => {
            const td = document.createElement('td');
            if (i === 6) {
                td.textContent = val;
                td.className = val === 'Lost' ? 'status-lost' : 'status-saved';
            } else {
                td.textContent = val;
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createAddIncidentForm() {
    const form = document.createElement('form');
    form.className = 'card';
    form.id = 'add-incident-form';
    form.innerHTML = `
        <h3>Report New Incident</h3>
        <label>Food Type: <input type="text" name="foodType" required></label><br><br>
        <label>Stage: 
            <select name="stage">
                <option value="Storage">Storage</option>
                <option value="Transport">Transport</option>
                <option value="Handling">Handling</option>
            </select>
        </label><br><br>
        <label>Location: <input type="text" name="location" required></label><br><br>
        <label>Date: <input type="date" name="date" required></label><br><br>
        <label>Loss Amount (kg): <input type="number" name="lossAmount" min="0" required></label><br><br>
        <label>Status: 
            <select name="status">
                <option value="Lost">Lost</option>
                <option value="Saved">Saved</option>
            </select>
        </label><br><br>
        <label>Cause: <input type="text" name="cause" required></label><br><br>
        <label>Notes: <input type="text" name="notes"></label><br><br>
        <button type="submit">Report Incident</button>
        <div id="form-msg" style="margin-top:1rem;color:#1e90ff;"></div>
    `;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const incident = new Incident(
            nextIncidentId++,
            data.get('foodType'),
            data.get('stage'),
            data.get('location'),
            data.get('date'),
            parseFloat(data.get('lossAmount')),
            data.get('status'),
            data.get('cause'),
            data.get('notes')
        );
        incidentData.push(incident);
        document.getElementById('dashboard').replaceWith(createSection('dashboard', 'Incident Dashboard', createIncidentTable()));
        document.getElementById('form-msg').textContent = 'Incident reported!';
        setTimeout(() => { document.getElementById('form-msg').textContent = ''; }, 3000);
        form.reset();
    });
    return form;
}

function createAnalyticsSection() {
    const section = document.createElement('section');
    section.id = 'analytics';
    const h2 = document.createElement('h2');
    h2.textContent = 'Food Loss Analytics';
    section.appendChild(h2);
    const lost = incidentData.filter(i => i.status === 'Lost').reduce((sum, i) => sum + i.lossAmount, 0);
    const saved = incidentData.filter(i => i.status === 'Saved').reduce((sum, i) => sum + i.lossAmount, 0);
    const total = lost + saved;
    const p = document.createElement('p');
    p.innerHTML = `<strong>Total Loss:</strong> ${lost} kg &nbsp; <span class="status-saved">Saved: ${saved} kg</span> &nbsp; <strong>Total Reported:</strong> ${total} kg`;
    section.appendChild(p);
    // Chart placeholder
    const chartDiv = document.createElement('div');
    chartDiv.className = 'data-visual';
    chartDiv.innerHTML = `
        <canvas id="lossChart" width="400" height="220"></canvas>
        <p style="font-size:0.9rem;color:#555;">Loss by Stage</p>
    `;
    section.appendChild(chartDiv);
    setTimeout(renderLossChart, 100);
    return section;
}

function renderLossChart() {
    const ctx = document.getElementById('lossChart').getContext('2d');
    if (!window.Chart) {
        loadChartJs(() => renderLossChart());
        return;
    }
    // Group by stage
    const stages = {};
    incidentData.forEach(incident => {
        if (!stages[incident.stage]) stages[incident.stage] = 0;
        if (incident.status === 'Lost') stages[incident.stage] += incident.lossAmount;
    });
    const labels = Object.keys(stages);
    const data = labels.map(s => stages[s]);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Food Lost (kg)',
                    data,
                    backgroundColor: '#1e90ff'
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
                        text: 'kg lost'
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

function createSolutionsSection() {
    const section = document.createElement('section');
    section.id = 'solutions';
    const h2 = document.createElement('h2');
    h2.textContent = 'Targeted Solutions';
    section.appendChild(h2);
    const ul = document.createElement('ul');
    [
        'Install backup generators for cold storage facilities.',
        'Use temperature loggers and real-time monitoring in transport.',
        'Train staff in proper food handling and cold-chain protocols.',
        'Develop rapid response plans for power or equipment failures.',
        'Promote local supply chains to reduce transport time.'
    ].forEach(sol => {
        const li = document.createElement('li');
        li.textContent = sol;
        ul.appendChild(li);
    });
    section.appendChild(ul);
    return section;
}

// ======================
// Section 4: Page Assembly
// ======================

function loadSections() {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    // About Section
    main.appendChild(createSection('about', 'About Cold-Chain Food Waste', 'This page shows where temperature-sensitive foods are lost across storage and transport due to unreliable refrigeration, power cuts, or poor handling. The goal is to identify weak points and enable targeted fixes in local supply chains.'));
    // Dashboard
    main.appendChild(createSection('dashboard', 'Incident Dashboard', createIncidentTable()));
    // Add Incident
    main.appendChild(createSection('add-incident', 'Report a New Incident', createAddIncidentForm()));
    // Analytics
    main.appendChild(createAnalyticsSection());
    // Solutions
    main.appendChild(createSolutionsSection());
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

// Placeholder for future features (e.g., map integration, notifications, user accounts)
// ...
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).
