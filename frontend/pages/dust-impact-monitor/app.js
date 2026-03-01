// Construction Dust Impact Monitor
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class Site {
    constructor(name, address, startDate, endDate, dustWindow, mitigation, lat, lng) {
        this.name = name;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dustWindow = dustWindow;
        this.mitigation = mitigation; // {waterSpraying, covering, barriers}
        this.lat = lat;
        this.lng = lng;
    }
}

class Report {
    constructor(site, date, description, compliance, reporter) {
        this.site = site;
        this.date = date;
        this.description = description;
        this.compliance = compliance;
        this.reporter = reporter;
    }
}

// ======================
// Section 2: Data Store
// ======================

const sites = [
    new Site('Skyline Towers', 'Maple St, Green Park', '2026-01-10', '2026-06-30', '2026-02-01 to 2026-04-15', {waterSpraying: true, covering: false, barriers: true}, 28.6139, 77.2090),
    new Site('Riverdale Mall', 'Elm Ave, Riverdale', '2026-02-15', '2026-08-20', '2026-03-01 to 2026-05-30', {waterSpraying: false, covering: true, barriers: false}, 28.6145, 77.2102),
    new Site('Sunset Colony Flats', 'Palm Rd, Sunset Colony', '2026-01-20', '2026-07-10', '2026-02-10 to 2026-05-20', {waterSpraying: true, covering: true, barriers: true}, 28.6122, 77.2085),
    new Site('Maple Heights', 'Oak St, Maple Heights', '2026-03-01', '2026-09-15', '2026-04-01 to 2026-06-30', {waterSpraying: false, covering: false, barriers: false}, 28.6137, 77.2095),
    new Site('Pine View Plaza', 'Pine St, Pine View', '2026-02-10', '2026-07-25', '2026-03-15 to 2026-06-10', {waterSpraying: true, covering: false, barriers: true}, 28.6148, 77.2108)
];

const reports = [
    new Report('Skyline Towers', '2026-02-05', 'Dust visible, water spraying in progress.', true, 'Ayaan'),
    new Report('Riverdale Mall', '2026-03-10', 'No water spraying, dust clouds observed.', false, 'Jagrati'),
    new Report('Sunset Colony Flats', '2026-02-15', 'All mitigation measures in place.', true, 'Ayaan'),
    new Report('Maple Heights', '2026-04-05', 'No mitigation, dust everywhere.', false, 'Jagrati'),
    new Report('Pine View Plaza', '2026-03-20', 'Water spraying and barriers, but no covering.', true, 'Ayaan')
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

function createSiteTable() {
    const table = document.createElement('table');
    table.className = 'site-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Site', 'Address', 'Start', 'End', 'Dust Window', 'Water Spraying', 'Covering', 'Barriers'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    sites.forEach(site => {
        const tr = document.createElement('tr');
        [site.name, site.address, site.startDate, site.endDate, site.dustWindow, site.mitigation.waterSpraying ? 'Yes' : 'No', site.mitigation.covering ? 'Yes' : 'No', site.mitigation.barriers ? 'Yes' : 'No'].forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createMitigationSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>Mitigation Compliance</h3>`;
    const ul = document.createElement('ul');
    sites.forEach(site => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${site.name}:</strong> Water Spraying: ${site.mitigation.waterSpraying ? 'Yes' : 'No'}, Covering: ${site.mitigation.covering ? 'Yes' : 'No'}, Barriers: ${site.mitigation.barriers ? 'Yes' : 'No'}`;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    return div;
}

function createReportForm() {
    const form = document.createElement('form');
    form.className = 'card';
    form.id = 'report-form';
    form.innerHTML = `
        <h3>Submit Citizen Report</h3>
        <label>Site: <select name="site" required>${sites.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}</select></label><br><br>
        <label>Date: <input type="date" name="date" required></label><br><br>
        <label>Description: <input type="text" name="description" required></label><br><br>
        <label>Mitigation Compliance: <select name="compliance"><option value="true">Yes</option><option value="false">No</option></select></label><br><br>
        <label>Reporter: <input type="text" name="reporter" required></label><br><br>
        <button type="submit">Submit Report</button>
        <div id="form-msg" style="margin-top:1rem;color:#b22222;"></div>
    `;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const report = new Report(
            data.get('site'),
            data.get('date'),
            data.get('description'),
            data.get('compliance') === 'true',
            data.get('reporter')
        );
        reports.push(report);
        document.getElementById('reports').replaceWith(createSection('reports', 'Citizen Reports', [createReportTable(), createReportForm()]));
        document.getElementById('form-msg').textContent = 'Report submitted!';
        setTimeout(() => { document.getElementById('form-msg').textContent = ''; }, 3000);
        form.reset();
    });
    return form;
}

function createReportTable() {
    const table = document.createElement('table');
    table.className = 'site-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Site', 'Date', 'Description', 'Compliance', 'Reporter'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    reports.forEach(report => {
        const tr = document.createElement('tr');
        [report.site, report.date, report.description, report.compliance ? 'Yes' : 'No', report.reporter].forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createMapSection() {
    const div = document.createElement('div');
    div.className = 'map-container';
    div.id = 'dust-map';
    setTimeout(renderMap, 100);
    return div;
}

function renderMap() {
    if (!window.L) {
        loadLeafletJs(() => renderMap());
        return;
    }
    const mapDiv = document.getElementById('dust-map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '';
    const map = L.map('dust-map').setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    sites.forEach(site => {
        const compliant = site.mitigation.waterSpraying && site.mitigation.covering && site.mitigation.barriers;
        const marker = L.circleMarker([site.lat, site.lng], {
            radius: 16,
            color: compliant ? '#43a047' : '#b22222',
            fillColor: compliant ? '#43a047' : '#b22222',
            fillOpacity: 0.7
        }).addTo(map);
        marker.bindPopup(`<b>${site.name}</b><br>Mitigation Compliance: ${compliant ? 'Yes' : 'No'}`);
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
        <h4>Why is construction dust harmful?</h4>
        <p>Dust particles can cause respiratory issues and worsen air quality, especially for children and elderly.</p>
        <h4>What mitigation measures are required?</h4>
        <p>Water spraying, covering materials, and barriers are standard practices to reduce dust.</p>
        <h4>How can citizens report violations?</h4>
        <p>Use this page to submit reports. Authorities and site managers can view and respond.</p>
        <h4>Is my report anonymous?</h4>
        <p>Reporter name is required for accountability, but no personal data is shared publicly.</p>
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
    main.appendChild(createSection('about', 'About the Dust Impact Monitor', 'A transparency page that tracks neighborhood construction sites, likely dust exposure windows, mitigation compliance (water spraying, covering, barriers), and citizen reports.'));
    // Sites & Exposure
    main.appendChild(createSection('sites', 'Sites & Exposure', createSiteTable()));
    // Mitigation Compliance
    main.appendChild(createSection('mitigation', 'Mitigation Compliance', createMitigationSection()));
    // Citizen Reports
    main.appendChild(createSection('reports', 'Citizen Reports', [createReportTable(), createReportForm()]));
    // Compliance Map
    main.appendChild(createSection('map', 'Compliance Map', createMapSection()));
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

// Placeholder for future features (e.g., authority response, site photos, air quality integration)
// ...
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).
