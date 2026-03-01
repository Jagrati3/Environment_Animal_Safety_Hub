// Neighborhood Rain Capture Exchange JS
// Handles map, asset registry, demand posting, exchange, forecast, analytics, trust, reminders, and guidelines

let map;
let assetMarkers = [];
let demandMarkers = [];
let exchangeLinks = [];

// --- Demo Data ---
const assets = [
    {id: 1, lat: 28.61, lng: 77.23, type: 'rooftop tank', capacity: 5000, owner: 'School', verified: true},
    {id: 2, lat: 19.07, lng: 72.87, type: 'apartment unit', capacity: 2000, owner: 'Apartment A', verified: false},
    {id: 3, lat: 12.97, lng: 77.59, type: 'commercial', capacity: 8000, owner: 'Mall', verified: true}
];
const demands = [
    {id: 1, lat: 28.62, lng: 77.25, need: 1000, user: 'Garden Group', status: 'open'},
    {id: 2, lat: 19.08, lng: 72.88, need: 500, user: 'Cleaner', status: 'open'}
];

// --- Map Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    map = L.map('rain-map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    initFilters();
    renderAssets();
    renderDemands();
    renderExchanges();
    initAssetRegistry();
    initDemandPosting();
    initExchangeCoordination();
    initForecastAnalytics();
    initTrustLayer();
    initRemindersGuidelines();
});

// --- Filters Panel ---
function initFilters() {
    const panel = document.getElementById('filters-panel');
    panel.innerHTML = `
        <h2>Filters</h2>
        <label>Asset Type:
            <select id="asset-type-filter">
                <option value="all">All</option>
                <option value="rooftop tank">Rooftop Tank</option>
                <option value="apartment unit">Apartment Unit</option>
                <option value="commercial">Commercial</option>
                <option value="school">School</option>
            </select>
        </label>
        <label>Demand Status:
            <select id="demand-status-filter">
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="fulfilled">Fulfilled</option>
            </select>
        </label>
        <button id="apply-filters">Apply Filters</button>
    `;
    document.getElementById('apply-filters').onclick = applyFilters;
}

function applyFilters() {
    renderAssets();
    renderDemands();
    renderExchanges();
}

// --- Asset Rendering ---
function renderAssets() {
    assetMarkers.forEach(m => map.removeLayer(m));
    assetMarkers = [];
    const type = document.getElementById('asset-type-filter')?.value || 'all';
    assets.filter(a => type === 'all' || a.type === type)
        .forEach(a => {
            const marker = L.marker([a.lat, a.lng], {icon: L.icon({iconUrl: a.verified ? 'https://cdn-icons-png.flaticon.com/512/190/190411.png' : 'https://cdn-icons-png.flaticon.com/512/190/190406.png', iconSize: [32,32]})})
                .bindPopup(`<b>${a.type}</b><br>Owner: ${a.owner}<br>Capacity: ${a.capacity}L<br>${a.verified ? '✅ Verified' : '❓ Unverified'}`)
                .addTo(map);
            assetMarkers.push(marker);
        });
}

// --- Demand Rendering ---
function renderDemands() {
    demandMarkers.forEach(m => map.removeLayer(m));
    demandMarkers = [];
    const status = document.getElementById('demand-status-filter')?.value || 'all';
    demands.filter(d => status === 'all' || d.status === status)
        .forEach(d => {
            const marker = L.circleMarker([d.lat, d.lng], {color: 'blue', radius: 10, fillOpacity: 0.6})
                .bindPopup(`<b>Demand</b><br>User: ${d.user}<br>Need: ${d.need}L<br>Status: ${d.status}`)
                .addTo(map);
            demandMarkers.push(marker);
        });
}

// --- Exchange Coordination ---
function renderExchanges() {
    exchangeLinks.forEach(l => map.removeLayer(l));
    exchangeLinks = [];
    // Demo: draw lines between assets and open demands within 0.03 deg
    assets.forEach(a => {
        demands.filter(d => d.status === 'open' && Math.abs(a.lat-d.lat)<0.03 && Math.abs(a.lng-d.lng)<0.03)
            .forEach(d => {
                const line = L.polyline([[a.lat, a.lng], [d.lat, d.lng]], {color: 'green', dashArray: '5 5'}).addTo(map);
                exchangeLinks.push(line);
            });
    });
}

// --- Asset Registry ---
function initAssetRegistry() {
    const section = document.getElementById('asset-registry');
    section.innerHTML = `
        <h2>Register Rainwater Asset</h2>
        <form id="asset-form">
            <label>Type:
                <select name="type">
                    <option value="rooftop tank">Rooftop Tank</option>
                    <option value="apartment unit">Apartment Unit</option>
                    <option value="commercial">Commercial</option>
                    <option value="school">School</option>
                </select>
            </label>
            <label>Capacity (L):
                <input name="capacity" type="number" required>
            </label>
            <label>Owner:
                <input name="owner" required>
            </label>
            <label>Location (lat, lng):
                <input name="lat" type="number" step="any" required placeholder="Latitude">
                <input name="lng" type="number" step="any" required placeholder="Longitude">
            </label>
            <button type="submit">Register</button>
        </form>
        <div id="asset-status"></div>
    `;
    document.getElementById('asset-form').onsubmit = function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this).entries());
        assets.push({
            id: assets.length+1,
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            type: data.type,
            capacity: parseInt(data.capacity),
            owner: data.owner,
            verified: false
        });
        renderAssets();
        document.getElementById('asset-status').textContent = 'Asset registered! (Demo: not saved)';
        this.reset();
    };
}

// --- Demand Posting ---
function initDemandPosting() {
    const section = document.getElementById('demand-posting');
    section.innerHTML = `
        <h2>Post Water Demand</h2>
        <form id="demand-form">
            <label>User:
                <input name="user" required>
            </label>
            <label>Need (L):
                <input name="need" type="number" required>
            </label>
            <label>Location (lat, lng):
                <input name="lat" type="number" step="any" required placeholder="Latitude">
                <input name="lng" type="number" step="any" required placeholder="Longitude">
            </label>
            <button type="submit">Post Demand</button>
        </form>
        <div id="demand-status"></div>
    `;
    document.getElementById('demand-form').onsubmit = function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this).entries());
        demands.push({
            id: demands.length+1,
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            need: parseInt(data.need),
            user: data.user,
            status: 'open'
        });
        renderDemands();
        renderExchanges();
        document.getElementById('demand-status').textContent = 'Demand posted! (Demo: not saved)';
        this.reset();
    };
}

// --- Exchange Coordination Section ---
function initExchangeCoordination() {
    const section = document.getElementById('exchange-coordination');
    section.innerHTML = `
        <h2>Coordinate Exchanges</h2>
        <p>Connect available assets to open demands. (Demo: Lines on map show possible exchanges within 0.03°)</p>
    `;
}

// --- Forecast & Analytics ---
function initForecastAnalytics() {
    const section = document.getElementById('forecast-analytics');
    section.innerHTML = `
        <h2>Rainfall Forecast & Missed Opportunity</h2>
        <p>Rainfall forecast: <b>Moderate showers expected in 2 days</b></p>
        <p>Estimated collection potential: <b>12,000L</b></p>
        <p>Missed rain opportunity (last event): <b>3,500L</b> (due to unregistered/overflowing assets)</p>
    `;
}

// --- Trust Layer ---
function initTrustLayer() {
    const section = document.getElementById('trust-layer');
    section.innerHTML = `
        <h2>Trust & Verification</h2>
        <ul>
            <li>Verified participants: <b>2</b></li>
            <li>Usage logs: <b>7 exchanges</b></li>
            <li>Pickup windows: <b>8am-10am, 5pm-7pm</b></li>
        </ul>
    `;
}

// --- Reminders & Guidelines ---
function initRemindersGuidelines() {
    const section = document.getElementById('reminders-guidelines');
    section.innerHTML = `
        <h2>Reminders & Guidelines</h2>
        <ul>
            <li>Check storage health monthly</li>
            <li>Clean tanks before monsoon</li>
            <li>Use rainwater for non-potable needs</li>
            <li>Follow local water quality guidelines</li>
        </ul>
    `;
}
