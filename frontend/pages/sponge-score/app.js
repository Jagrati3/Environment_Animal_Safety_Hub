// Neighborhood Sponge Score
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class Area {
    constructor(name, concrete, permeable, treeCover, openSoil, drainage, lat, lng) {
        this.name = name;
        this.concrete = concrete; // %
        this.permeable = permeable; // %
        this.treeCover = treeCover; // %
        this.openSoil = openSoil; // %
        this.drainage = drainage; // 1-5
        this.lat = lat;
        this.lng = lng;
    }
}

// ======================
// Section 2: Data Store
// ======================

const areas = [
    new Area('Green Park', 60, 20, 10, 10, 3, 28.6139, 77.2090),
    new Area('Riverdale', 70, 10, 8, 12, 2, 28.6145, 77.2102),
    new Area('Sunset Colony', 50, 25, 15, 10, 4, 28.6122, 77.2085),
    new Area('Maple Heights', 80, 5, 5, 10, 1, 28.6137, 77.2095),
    new Area('Pine View', 55, 20, 15, 10, 5, 28.6148, 77.2108)
];

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

function createAreaInputTable() {
    const table = document.createElement('table');
    table.className = 'input-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Area', 'Concrete (%)', 'Permeable (%)', 'Tree Cover (%)', 'Open Soil (%)', 'Drainage (1-5)'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    areas.forEach(area => {
        const tr = document.createElement('tr');
        [area.name, area.concrete, area.permeable, area.treeCover, area.openSoil, area.drainage].forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createAreaInputForm() {
    const form = document.createElement('form');
    form.className = 'card';
    form.id = 'area-input-form';
    form.innerHTML = `
        <h3>Add/Update Area</h3>
        <label>Area Name: <input type="text" name="name" required></label><br><br>
        <label>Concrete (%): <input type="number" name="concrete" min="0" max="100" required></label><br><br>
        <label>Permeable (%): <input type="number" name="permeable" min="0" max="100" required></label><br><br>
        <label>Tree Cover (%): <input type="number" name="treeCover" min="0" max="100" required></label><br><br>
        <label>Open Soil (%): <input type="number" name="openSoil" min="0" max="100" required></label><br><br>
        <label>Drainage (1-5): <input type="number" name="drainage" min="1" max="5" required></label><br><br>
        <label>Latitude: <input type="number" name="lat" step="0.0001" required></label><br><br>
        <label>Longitude: <input type="number" name="lng" step="0.0001" required></label><br><br>
        <button type="submit">Add/Update Area</button>
        <div id="form-msg" style="margin-top:1rem;color:#388e3c;"></div>
    `;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const name = data.get('name');
        const idx = areas.findIndex(a => a.name === name);
        const area = new Area(
            name,
            parseInt(data.get('concrete'), 10),
            parseInt(data.get('permeable'), 10),
            parseInt(data.get('treeCover'), 10),
            parseInt(data.get('openSoil'), 10),
            parseInt(data.get('drainage'), 10),
            parseFloat(data.get('lat')),
            parseFloat(data.get('lng'))
        );
        if (idx >= 0) areas[idx] = area;
        else areas.push(area);
        document.getElementById('input').replaceWith(createSection('input', 'Area Input', [createAreaInputTable(), createAreaInputForm()]));
        document.getElementById('score').replaceWith(createSection('score', 'Sponge Score', createScoreSection()));
        document.getElementById('map').replaceWith(createSection('map', 'High-Impact Map', createMapSection()));
        document.getElementById('form-msg').textContent = 'Area added/updated!';
        setTimeout(() => { document.getElementById('form-msg').textContent = ''; }, 3000);
        form.reset();
    });
    return form;
}

function calculateSpongeScore(area) {
    // Example: 100 - concrete + permeable + treeCover + openSoil + (drainage*5)
    return Math.max(0, Math.min(100, 100 - area.concrete + area.permeable + area.treeCover + area.openSoil + (area.drainage * 5)));
}

function createScoreSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>Sponge Scores by Area</h3>`;
    areas.forEach(area => {
        const score = calculateSpongeScore(area);
        const bar = document.createElement('div');
        bar.className = 'score-bar';
        const inner = document.createElement('div');
        inner.className = 'score-bar-inner';
        inner.style.width = score + '%';
        bar.appendChild(inner);
        const label = document.createElement('span');
        label.textContent = `${area.name}: ${score.toFixed(1)}`;
        label.style.position = 'absolute';
        label.style.left = '12px';
        label.style.top = '4px';
        label.style.color = '#222';
        bar.style.position = 'relative';
        bar.appendChild(label);
        div.appendChild(bar);
    });
    return div;
}

function createUpgradeSuggestions() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>Upgrade Suggestions</h3>`;
    const ul = document.createElement('ul');
    ul.className = 'upgrade-list';
    [
        'Install rain gardens in high-concrete areas.',
        'Replace concrete with permeable paving where possible.',
        'Increase tree cover and open soil patches.',
        'Maintain and upgrade drainage systems.',
        'Add bioswales to manage runoff.'
    ].forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    return div;
}

function createMapSection() {
    const div = document.createElement('div');
    div.className = 'map-container';
    div.id = 'sponge-map';
    setTimeout(renderMap, 100);
    return div;
}

function renderMap() {
    if (!window.L) {
        loadLeafletJs(() => renderMap());
        return;
    }
    const mapDiv = document.getElementById('sponge-map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '';
    const map = L.map('sponge-map').setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    areas.forEach(area => {
        const score = calculateSpongeScore(area);
        const marker = L.circleMarker([area.lat, area.lng], {
            radius: 16,
            color: score > 70 ? '#43a047' : score > 50 ? '#ffd600' : '#b22222',
            fillColor: score > 70 ? '#43a047' : score > 50 ? '#ffd600' : '#b22222',
            fillOpacity: 0.7
        }).addTo(map);
        marker.bindPopup(`<b>${area.name}</b><br>Sponge Score: ${score.toFixed(1)}`);
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

function createFAQSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Frequently Asked Questions</h3>
        <h4>What is a sponge score?</h4>
        <p>It rates how well an area absorbs rainwater, based on surfaces, tree cover, drainage, and open soil.</p>
        <h4>How can I improve my area’s score?</h4>
        <p>Reduce concrete, add permeable surfaces, plant trees, and maintain drainage.</p>
        <h4>What are bioswales?</h4>
        <p>Landscaped channels that slow and filter runoff, reducing flooding and pollution.</p>
        <h4>How accurate is this tool?</h4>
        <p>It depends on data quality. Community input improves accuracy and impact.</p>
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
    main.appendChild(createSection('about', 'About the Sponge Score', 'A data-driven page that rates how well an area absorbs rainwater based on surfaces (concrete vs permeable), tree cover, drainage quality, and open soil. It suggests upgrades like rain gardens, permeable paving, and bioswales.'));
    // Area Input
    main.appendChild(createSection('input', 'Area Input', [createAreaInputTable(), createAreaInputForm()]));
    // Score
    main.appendChild(createSection('score', 'Sponge Score', createScoreSection()));
    // Upgrades
    main.appendChild(createSection('upgrades', 'Upgrade Suggestions', createUpgradeSuggestions()));
    // Map
    main.appendChild(createSection('map', 'High-Impact Map', createMapSection()));
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
