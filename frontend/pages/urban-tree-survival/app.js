// Urban Tree Survival Tracker
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes.

// ======================
// Section 1: Data Models
// ======================

class Tree {
    constructor(id, species, location, datePlanted, status, watering, maintenance, notes) {
        this.id = id;
        this.species = species;
        this.location = location;
        this.datePlanted = datePlanted;
        this.status = status; // 'Alive' or 'Dead'
        this.watering = watering; // e.g., 'Regular', 'Irregular', 'None'
        this.maintenance = maintenance; // e.g., 'Good', 'Average', 'Poor'
        this.notes = notes;
    }
}

// ======================
// Section 2: Data Store
// ======================

const treeData = [
    new Tree(1, 'Neem', 'Sector 12 Park', '2025-07-10', 'Alive', 'Regular', 'Good', 'Thriving'),
    new Tree(2, 'Peepal', 'Main Road', '2025-08-15', 'Dead', 'Irregular', 'Poor', 'Died after 2 months'),
    new Tree(3, 'Banyan', 'School Campus', '2025-09-01', 'Alive', 'Regular', 'Good', 'Strong growth'),
    new Tree(4, 'Ashoka', 'Sector 5', '2025-07-20', 'Alive', 'Irregular', 'Average', 'Needs more water'),
    new Tree(5, 'Gulmohar', 'Lake Side', '2025-08-05', 'Dead', 'None', 'Poor', 'No maintenance'),
];

let nextTreeId = 6;

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

function createTreeTable() {
    const table = document.createElement('table');
    table.className = 'tree-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['ID', 'Species', 'Location', 'Date Planted', 'Status', 'Watering', 'Maintenance', 'Notes'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    treeData.forEach(tree => {
        const tr = document.createElement('tr');
        [tree.id, tree.species, tree.location, tree.datePlanted, tree.status, tree.watering, tree.maintenance, tree.notes].forEach((val, i) => {
            const td = document.createElement('td');
            if (i === 4) {
                td.textContent = val;
                td.className = val === 'Alive' ? 'status-alive' : 'status-dead';
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

function createAddTreeForm() {
    const form = document.createElement('form');
    form.className = 'card';
    form.id = 'add-tree-form';
    form.innerHTML = `
        <h3>Add New Tree</h3>
        <label>Species: <input type="text" name="species" required></label><br><br>
        <label>Location: <input type="text" name="location" required></label><br><br>
        <label>Date Planted: <input type="date" name="datePlanted" required></label><br><br>
        <label>Status: 
            <select name="status">
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
            </select>
        </label><br><br>
        <label>Watering: 
            <select name="watering">
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
                <option value="None">None</option>
            </select>
        </label><br><br>
        <label>Maintenance: 
            <select name="maintenance">
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
            </select>
        </label><br><br>
        <label>Notes: <input type="text" name="notes"></label><br><br>
        <button type="submit">Add Tree</button>
        <div id="form-msg" style="margin-top:1rem;color:#228b22;"></div>
    `;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const tree = new Tree(
            nextTreeId++,
            data.get('species'),
            data.get('location'),
            data.get('datePlanted'),
            data.get('status'),
            data.get('watering'),
            data.get('maintenance'),
            data.get('notes')
        );
        treeData.push(tree);
        document.getElementById('dashboard').replaceWith(createSection('dashboard', 'Tree Dashboard', createTreeTable()));
        document.getElementById('form-msg').textContent = 'Tree added!';
        setTimeout(() => { document.getElementById('form-msg').textContent = ''; }, 3000);
        form.reset();
    });
    return form;
}

function createAnalyticsSection() {
    const section = document.createElement('section');
    section.id = 'analytics';
    const h2 = document.createElement('h2');
    h2.textContent = 'Survival Analytics';
    section.appendChild(h2);
    const alive = treeData.filter(t => t.status === 'Alive').length;
    const dead = treeData.filter(t => t.status === 'Dead').length;
    const total = treeData.length;
    const p = document.createElement('p');
    p.innerHTML = `<strong>Total Trees:</strong> ${total} &nbsp; <span class="status-alive">Alive: ${alive}</span> &nbsp; <span class="status-dead">Dead: ${dead}</span>`;
    section.appendChild(p);
    // Chart placeholder
    const chartDiv = document.createElement('div');
    chartDiv.className = 'data-visual';
    chartDiv.innerHTML = `
        <canvas id="survivalChart" width="400" height="220"></canvas>
        <p style="font-size:0.9rem;color:#555;">Survival by Species</p>
    `;
    section.appendChild(chartDiv);
    setTimeout(renderSurvivalChart, 100);
    return section;
}

function renderSurvivalChart() {
    const ctx = document.getElementById('survivalChart').getContext('2d');
    if (!window.Chart) {
        loadChartJs(() => renderSurvivalChart());
        return;
    }
    // Group by species
    const species = {};
    treeData.forEach(tree => {
        if (!species[tree.species]) species[tree.species] = {Alive: 0, Dead: 0};
        species[tree.species][tree.status]++;
    });
    const labels = Object.keys(species);
    const aliveData = labels.map(s => species[s].Alive);
    const deadData = labels.map(s => species[s].Dead);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Alive',
                    data: aliveData,
                    backgroundColor: '#228b22'
                },
                {
                    label: 'Dead',
                    data: deadData,
                    backgroundColor: '#b22222'
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
                        text: 'Number of Trees'
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

function createMaintenanceSection() {
    const section = document.createElement('section');
    section.id = 'maintenance';
    const h2 = document.createElement('h2');
    h2.textContent = 'Maintenance Quality';
    section.appendChild(h2);
    const summary = {};
    treeData.forEach(tree => {
        if (!summary[tree.maintenance]) summary[tree.maintenance] = 0;
        summary[tree.maintenance]++;
    });
    const ul = document.createElement('ul');
    Object.entries(summary).forEach(([key, val]) => {
        const li = document.createElement('li');
        li.textContent = `${key}: ${val} trees`;
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
    main.appendChild(createSection('about', 'About Urban Tree Survival', 'This tool tracks not just tree planting numbers, but long-term survival rates by species, location, watering, and maintenance. Focus is on “trees alive,” not just “trees planted.”'));
    // Dashboard
    main.appendChild(createSection('dashboard', 'Tree Dashboard', createTreeTable()));
    // Add Tree
    main.appendChild(createSection('add-tree', 'Add a New Tree', createAddTreeForm()));
    // Analytics
    main.appendChild(createAnalyticsSection());
    // Maintenance
    main.appendChild(createMaintenanceSection());
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
// This file is intentionally verbose and modular for educational and demonstration purposes.
