// Urban Wildlife Crossing Risk Map JS
// This file will handle map initialization, data layers, filters, reporting, analytics, and overlays

// --- Map Initialization ---
let map;
document.addEventListener('DOMContentLoaded', () => {
    map = L.map('risk-map').setView([20.5937, 78.9629], 5); // Centered on India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Initialize UI components
    initFilters();
    loadDataLayers();
    initReportingForm();
    initAnalyticsSection();
    initEducationalOverlays();
});

// --- Filters Panel ---
function initFilters() {
    const panel = document.getElementById('filters-panel');
    panel.innerHTML = `
        <h2>Filters</h2>
        <label>Species:
            <select id="species-filter">
                <option value="all">All</option>
                <option value="deer">Deer</option>
                <option value="leopard">Leopard</option>
                <option value="monkey">Monkey</option>
                <option value="elephant">Elephant</option>
                <option value="other">Other</option>
            </select>
        </label>
        <label>Time Window:
            <select id="time-filter">
                <option value="all">All</option>
                <option value="night">Night</option>
                <option value="dawn">Dawn</option>
                <option value="monsoon">Monsoon</option>
                <option value="migration">Migration Season</option>
            </select>
        </label>
        <button id="apply-filters">Apply Filters</button>
    `;
    document.getElementById('apply-filters').onclick = applyFilters;
}

function applyFilters() {
    // Placeholder: filter data layers based on selected species and time
    loadDataLayers();
}

// --- Data Layers ---
function loadDataLayers() {
    // Remove existing layers if any
    if (window.dataLayerGroup) {
        map.removeLayer(window.dataLayerGroup);
    }
    window.dataLayerGroup = L.layerGroup().addTo(map);

    // Example: Add dummy data for sightings, roadkill, traffic, habitats, migration
    addSightingsLayer();
    addRoadkillLayer();
    addTrafficLayer();
    addHabitatLayer();
    addMigrationLayer();
    showRiskHotspots();
}

function addSightingsLayer() {
    // Dummy data
    const sightings = [
        {lat: 28.61, lng: 77.23, species: 'deer', time: 'dawn'},
        {lat: 19.07, lng: 72.87, species: 'leopard', time: 'night'},
        {lat: 12.97, lng: 77.59, species: 'monkey', time: 'all'}
    ];
    sightings.forEach(s => {
        L.circleMarker([s.lat, s.lng], {color: 'green', radius: 7})
            .bindPopup(`<b>Sighting:</b> ${s.species}<br><b>Time:</b> ${s.time}`)
            .addTo(window.dataLayerGroup);
    });
}

function addRoadkillLayer() {
    // Dummy data
    const roadkills = [
        {lat: 22.57, lng: 88.36, species: 'deer', time: 'night'},
        {lat: 23.02, lng: 72.57, species: 'elephant', time: 'monsoon'}
    ];
    roadkills.forEach(r => {
        L.circleMarker([r.lat, r.lng], {color: 'red', radius: 8, fillOpacity: 0.7})
            .bindPopup(`<b>Roadkill:</b> ${r.species}<br><b>Time:</b> ${r.time}`)
            .addTo(window.dataLayerGroup);
    });
}

function addTrafficLayer() {
    // Dummy data: traffic intensity as heatmap (simulate with circles)
    const traffic = [
        {lat: 28.61, lng: 77.23, intensity: 0.8},
        {lat: 19.07, lng: 72.87, intensity: 0.6}
    ];
    traffic.forEach(t => {
        L.circle([t.lat, t.lng], {
            color: 'orange',
            fillColor: 'orange',
            fillOpacity: 0.2 + t.intensity * 0.5,
            radius: 5000 * t.intensity
        }).bindPopup(`<b>Traffic Intensity:</b> ${t.intensity * 100}%`)
        .addTo(window.dataLayerGroup);
    });
}

function addHabitatLayer() {
    // Dummy data: habitat fragments as polygons
    const habitat = [
        [[28.6, 77.2], [28.62, 77.25], [28.58, 77.28], [28.6, 77.2]]
    ];
    habitat.forEach(poly => {
        L.polygon(poly, {color: 'blue', fillOpacity: 0.1})
            .bindPopup('<b>Habitat Fragment</b>')
            .addTo(window.dataLayerGroup);
    });
}

function addMigrationLayer() {
    // Dummy data: migration routes as polylines
    const routes = [
        [[19.07, 72.87], [22.57, 88.36], [23.02, 72.57]]
    ];
    routes.forEach(route => {
        L.polyline(route, {color: 'purple', weight: 4, dashArray: '8 8'})
            .bindPopup('<b>Migration Route</b>')
            .addTo(window.dataLayerGroup);
    });
}

function showRiskHotspots() {
    // Dummy: show risk hotspots as red circles
    const hotspots = [
        {lat: 21.15, lng: 79.09, risk: 'high'},
        {lat: 26.91, lng: 75.79, risk: 'medium'}
    ];
    hotspots.forEach(h => {
        L.circle([h.lat, h.lng], {
            color: h.risk === 'high' ? 'red' : 'yellow',
            fillColor: h.risk === 'high' ? 'red' : 'yellow',
            fillOpacity: 0.4,
            radius: h.risk === 'high' ? 8000 : 5000
        }).bindPopup(`<b>Risk Hotspot:</b> ${h.risk}`)
        .addTo(window.dataLayerGroup);
    });
    showInterventionSuggestions(hotspots);
}

// --- Intervention Suggestions ---
function showInterventionSuggestions(hotspots) {
    const section = document.getElementById('intervention-suggestions');
    section.innerHTML = '<h2>Intervention Suggestions</h2>';
    hotspots.forEach((h, i) => {
        section.innerHTML += `
            <div class="intervention">
                <b>Hotspot ${i+1} (${h.risk} risk):</b>
                <ul>
                    <li>Speed-calming zones</li>
                    <li>Reflective signage</li>
                    <li>Wildlife underpasses/overpasses</li>
                    <li>Fencing guidance</li>
                    <li>Lighting adjustments</li>
                </ul>
            </div>
        `;
    });
}

// --- Reporting Form ---
function initReportingForm() {
    const section = document.getElementById('reporting-form');
    section.innerHTML = `
        <h2>Report Wildlife Incident</h2>
        <form id="incident-form">
            <label>Type:
                <select name="type">
                    <option value="sighting">Sighting</option>
                    <option value="roadkill">Roadkill</option>
                </select>
            </label>
            <label>Species:
                <input name="species" required placeholder="e.g. Deer, Leopard">
            </label>
            <label>Location (lat, lng):
                <input name="lat" type="number" step="any" required placeholder="Latitude">
                <input name="lng" type="number" step="any" required placeholder="Longitude">
            </label>
            <label>Time:
                <input name="time" type="text" required placeholder="e.g. Night, Dawn">
            </label>
            <button type="submit">Submit Report</button>
        </form>
        <div id="report-status"></div>
    `;
    document.getElementById('incident-form').onsubmit = function(e) {
        e.preventDefault();
        document.getElementById('report-status').textContent = 'Thank you for your report! (Demo: not saved)';
        this.reset();
    };
}

// --- Analytics and Tracking ---
function initAnalyticsSection() {
    const section = document.getElementById('analytics-tracking');
    section.innerHTML = `
        <h2>Tracking & Analytics</h2>
        <p>Track reported incidents, interventions, and wildlife mortality trends over time. (Demo: Static data)</p>
        <ul>
            <li>Incidents reported this year: <b>42</b></li>
            <li>Interventions implemented: <b>5</b></li>
            <li>Mortality reduction: <b>12%</b> (year-on-year)</li>
        </ul>
    `;
}

// --- Educational Overlays ---
function initEducationalOverlays() {
    const section = document.getElementById('educational-overlays');
    section.innerHTML = `
        <h2>Why Do Animals Cross Here?</h2>
        <p>Some species follow ancient migration routes, seek food/water, or move between fragmented habitats. Urban expansion often cuts across these paths, increasing collision risk. Learn more about local species and their movement patterns.</p>
        <ul>
            <li><b>Deer:</b> Move at dawn/dusk for food, cross open roads near forest edges.</li>
            <li><b>Leopard:</b> Night movement, follow prey, cross near water sources.</li>
            <li><b>Monkeys:</b> Urban foragers, cross roads for food, especially near temples/markets.</li>
            <li><b>Elephants:</b> Seasonal migration, cross highways during monsoon.</li>
        </ul>
    `;
}
