// Urban Thermal Trapping in Narrow Streets JS
// Handles map, data, analytics, mitigation, reporting, and overlays

let map;
document.addEventListener('DOMContentLoaded', () => {
    map = L.map('thermal-map').setView([20.5937, 78.9629], 5); // Centered on India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Initialize UI components
    initFilters();
    loadThermalDataLayers();
    initAnalyticsSection();
    initMitigationSuggestions();
    initReportingForm();
    initEducationalOverlays();
});

function initFilters() {
    const panel = document.getElementById('filters-panel');
    panel.innerHTML = `
        <h2>Filters</h2>
        <label>Time of Day:
            <select id="time-filter">
                <option value="all">All</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
                <option value="evening">Evening</option>
            </select>
        </label>
        <label>Street Width:
            <select id="width-filter">
                <option value="all">All</option>
                <option value="narrow">Narrow (&lt;6m)</option>
                <option value="medium">Medium (6-12m)</option>
                <option value="wide">Wide (&gt;12m)</option>
            </select>
        </label>
        <label>Building Height:
            <select id="height-filter">
                <option value="all">All</option>
                <option value="low">Low (&lt;3 floors)</option>
                <option value="mid">Mid (3-6 floors)</option>
                <option value="high">High (&gt;6 floors)</option>
            </select>
        </label>
        <button id="apply-filters">Apply Filters</button>
    `;
    document.getElementById('apply-filters').onclick = applyFilters;
}

function applyFilters() {
    // Placeholder: filter data layers based on selected filters
    loadThermalDataLayers();
}

function loadThermalDataLayers() {
    if (window.thermalLayerGroup) {
        map.removeLayer(window.thermalLayerGroup);
    }
    window.thermalLayerGroup = L.layerGroup().addTo(map);

    // Example: Add dummy data for hot canyons
    addThermalHotspots();
    addStreetCanyonPolygons();
}

function addThermalHotspots() {
    // Dummy data
    const hotspots = [
        {lat: 28.61, lng: 77.23, temp: 41.2, width: 'narrow', height: 'high', time: 'night'},
        {lat: 19.07, lng: 72.87, temp: 39.8, width: 'narrow', height: 'mid', time: 'evening'},
        {lat: 12.97, lng: 77.59, temp: 38.5, width: 'medium', height: 'high', time: 'day'}
    ];
    hotspots.forEach(h => {
        L.circleMarker([h.lat, h.lng], {color: 'red', radius: 10, fillOpacity: 0.7})
            .bindPopup(`<b>Hot Canyon</b><br>Temp: ${h.temp}&deg;C<br>Width: ${h.width}<br>Height: ${h.height}<br>Time: ${h.time}`)
            .addTo(window.thermalLayerGroup);
    });
}

function addStreetCanyonPolygons() {
    // Dummy data: polygons for street canyons
    const canyons = [
        [[28.6, 77.2], [28.62, 77.25], [28.58, 77.28], [28.6, 77.2]]
    ];
    canyons.forEach(poly => {
        L.polygon(poly, {color: 'orange', fillOpacity: 0.15})
            .bindPopup('<b>Street Canyon</b>')
            .addTo(window.thermalLayerGroup);
    });
}

function initAnalyticsSection() {
    const section = document.getElementById('analytics-section');
    section.innerHTML = `
        <h2>Analytics & Visualization</h2>
        <p>Analyze temperature, airflow, and risk by street. (Demo: Static data)</p>
        <ul>
            <li>Max canyon temp: <b>41.2°C</b></li>
            <li>Avg. night temp: <b>36.7°C</b></li>
            <li>Streets with high risk: <b>12</b></li>
        </ul>
    `;
}

function initMitigationSuggestions() {
    const section = document.getElementById('mitigation-suggestions');
    section.innerHTML = `
        <h2>Mitigation Suggestions</h2>
        <ul>
            <li>Install reflective road and wall materials</li>
            <li>Add shade structures and green canopies</li>
            <li>Open ventilation corridors</li>
            <li>Timed traffic control for heat reduction</li>
            <li>Community cooling stations</li>
        </ul>
    `;
}

function initReportingForm() {
    const section = document.getElementById('reporting-form');
    section.innerHTML = `
        <h2>Report Heat Incident</h2>
        <form id="heat-incident-form">
            <label>Location (lat, lng):
                <input name="lat" type="number" step="any" required placeholder="Latitude">
                <input name="lng" type="number" step="any" required placeholder="Longitude">
            </label>
            <label>Time:
                <input name="time" type="text" required placeholder="e.g. Night, Day">
            </label>
            <label>Observed Temp (°C):
                <input name="temp" type="number" step="any" required>
            </label>
            <label>Street Width:
                <select name="width">
                    <option value="narrow">Narrow</option>
                    <option value="medium">Medium</option>
                    <option value="wide">Wide</option>
                </select>
            </label>
            <label>Building Height:
                <select name="height">
                    <option value="low">Low</option>
                    <option value="mid">Mid</option>
                    <option value="high">High</option>
                </select>
            </label>
            <button type="submit">Submit Report</button>
        </form>
        <div id="heat-report-status"></div>
    `;
    document.getElementById('heat-incident-form').onsubmit = function(e) {
        e.preventDefault();
        document.getElementById('heat-report-status').textContent = 'Thank you for your report! (Demo: not saved)';
        this.reset();
    };
}

function initEducationalOverlays() {
    const section = document.getElementById('educational-overlays');
    section.innerHTML = `
        <h2>Why Do Streets Trap Heat?</h2>
        <p>Narrow streets with tall buildings block wind and trap heat, especially at night. Materials like concrete and asphalt absorb and re-radiate heat, creating persistent hot zones. Learn about urban design fixes and community actions to reduce risk.</p>
        <ul>
            <li><b>Reflective surfaces:</b> Reduce heat absorption</li>
            <li><b>Green corridors:</b> Improve airflow and cooling</li>
            <li><b>Timed traffic:</b> Lowers heat from vehicles</li>
        </ul>
    `;
}
