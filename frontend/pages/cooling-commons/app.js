// Community Cooling Commons
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class CoolingAsset {
    constructor(type, name, location, lat, lng, description, contact) {
        this.type = type; // Shade, Fountain, Mist, Cooling Room, Volunteer Zone
        this.name = name;
        this.location = location;
        this.lat = lat;
        this.lng = lng;
        this.description = description;
        this.contact = contact;
    }
}

// ======================
// Section 2: Data Store
// ======================

const assets = [
    new CoolingAsset('Shade', 'Maple Street Trees', 'Maple St', 28.6139, 77.2090, 'Dense tree cover, cool walking route.', ''),
    new CoolingAsset('Fountain', 'Central Park Fountain', 'Central Park', 28.6145, 77.2102, 'Public fountain, open 9am-7pm.', 'Park Office'),
    new CoolingAsset('Mist', 'Sunset Mist Station', 'Sunset Colony', 28.6122, 77.2085, 'Misting station, open afternoons.', 'Colony Committee'),
    new CoolingAsset('Cooling Room', 'Community Hall', 'Riverdale', 28.6137, 77.2095, 'Air-conditioned room, open for vulnerable groups.', 'Hall Manager'),
    new CoolingAsset('Volunteer Zone', 'Pine View Check-In', 'Pine View', 28.6148, 77.2108, 'Volunteer check-in for heat emergencies.', 'Local Volunteers')
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

function createAssetTable() {
    const table = document.createElement('table');
    table.className = 'asset-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Type', 'Name', 'Location', 'Description', 'Contact'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    assets.forEach(asset => {
        const tr = document.createElement('tr');
        [asset.type, asset.name, asset.location, asset.description, asset.contact].forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createAssetForm() {
    const form = document.createElement('form');
    form.className = 'card';
    form.id = 'asset-form';
    form.innerHTML = `
        <h3>Add Cooling Asset</h3>
        <label>Type:
            <select name="type">
                <option value="Shade">Shade</option>
                <option value="Fountain">Fountain</option>
                <option value="Mist">Mist</option>
                <option value="Cooling Room">Cooling Room</option>
                <option value="Volunteer Zone">Volunteer Zone</option>
            </select>
        </label><br><br>
        <label>Name: <input type="text" name="name" required></label><br><br>
        <label>Location: <input type="text" name="location" required></label><br><br>
        <label>Latitude: <input type="number" name="lat" step="0.0001" required></label><br><br>
        <label>Longitude: <input type="number" name="lng" step="0.0001" required></label><br><br>
        <label>Description: <input type="text" name="description"></label><br><br>
        <label>Contact: <input type="text" name="contact"></label><br><br>
        <button type="submit">Add Asset</button>
        <div id="form-msg" style="margin-top:1rem;color:#00bcd4;"></div>
    `;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const asset = new CoolingAsset(
            data.get('type'),
            data.get('name'),
            data.get('location'),
            parseFloat(data.get('lat')),
            parseFloat(data.get('lng')),
            data.get('description'),
            data.get('contact')
        );
        assets.push(asset);
        document.getElementById('assets').replaceWith(createSection('assets', 'Add Cooling Asset', [createAssetTable(), createAssetForm()]));
        document.getElementById('map').replaceWith(createSection('map', 'Cooling Map', createMapSection()));
        document.getElementById('form-msg').textContent = 'Asset added!';
        setTimeout(() => { document.getElementById('form-msg').textContent = ''; }, 3000);
        form.reset();
    });
    return form;
}

function createMapSection() {
    const div = document.createElement('div');
    div.className = 'map-container';
    div.id = 'cooling-map';
    setTimeout(renderMap, 100);
    return div;
}

function renderMap() {
    if (!window.L) {
        loadLeafletJs(() => renderMap());
        return;
    }
    const mapDiv = document.getElementById('cooling-map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '';
    const map = L.map('cooling-map').setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    assets.forEach(asset => {
        const marker = L.marker([asset.lat, asset.lng]).addTo(map);
        marker.bindPopup(`<b>${asset.name}</b><br>Type: ${asset.type}<br>Location: ${asset.location}<br>${asset.description}<br>Contact: ${asset.contact}`);
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

function createTipsSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Resilience Tips</h3>
        <ul>
            <li>Use shaded routes and cooling rooms during heatwaves.</li>
            <li>Check in on vulnerable neighbors and share cooling assets.</li>
            <li>Report broken fountains or mist stations for quick repair.</li>
            <li>Volunteer at check-in zones during emergencies.</li>
            <li>Stay hydrated and avoid outdoor activity during peak heat.</li>
        </ul>
    `;
    return div;
}

function createFAQSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Frequently Asked Questions</h3>
        <h4>How do I add a cooling asset?</h4>
        <p>Use the form to add details and location. Assets appear on the map and in the table.</p>
        <h4>Who manages cooling rooms?</h4>
        <p>Usually local government or community groups. Contact info is listed for each asset.</p>
        <h4>Can I volunteer?</h4>
        <p>Yes, join check-in zones or contact local groups to help during heat emergencies.</p>
        <h4>How accurate is the map?</h4>
        <p>It depends on community input. More assets and updates improve accuracy.</p>
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
    main.appendChild(createSection('about', 'About Cooling Commons', 'A collaborative platform where residents map and share cooling assets like shaded streets, public fountains, mist stations, cooling rooms, and volunteer check-in zones for vulnerable groups.'));
    // Map
    main.appendChild(createSection('map', 'Cooling Map', createMapSection()));
    // Assets
    main.appendChild(createSection('assets', 'Add Cooling Asset', [createAssetTable(), createAssetForm()]));
    // Tips
    main.appendChild(createSection('tips', 'Resilience Tips', createTipsSection()));
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

// Placeholder for future features (e.g., user accounts, export, asset status tracking)
// ...
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).
