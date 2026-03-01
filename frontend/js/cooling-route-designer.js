// Community Cooling Route Designer JS
// Handles map, data layers, route planning, and UI

let map;
let shadeLayer, tempLayer, hydrationLayer, restStopLayer, routeLayer;
let startMarker, endMarker;

// --- Demo Data ---
const shadePolygons = [
    [[28.61, 77.23], [28.612, 77.232], [28.613, 77.229], [28.61, 77.23]],
    [[28.615, 77.235], [28.617, 77.237], [28.618, 77.233], [28.615, 77.235]]
];
const tempPoints = [
    {lat: 28.611, lng: 77.231, temp: 34},
    {lat: 28.616, lng: 77.236, temp: 38},
    {lat: 28.613, lng: 77.234, temp: 36}
];
const hydrationPoints = [
    {lat: 28.612, lng: 77.233, name: 'Water Fountain'},
    {lat: 28.617, lng: 77.236, name: 'Hydration Kiosk'}
];
const restStops = [
    {lat: 28.613, lng: 77.232, name: 'Shaded Bench'},
    {lat: 28.618, lng: 77.235, name: 'Community Center'}
];

// --- Map Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    map = L.map('cooling-map').setView([28.6139, 77.2090], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    renderShadeLayer();
    renderTempLayer();
    renderHydrationLayer();
    renderRestStopLayer();
    initRouteControls();
    updateLegend();
});

function renderShadeLayer() {
    shadeLayer = L.layerGroup();
    shadePolygons.forEach(poly => {
        L.polygon(poly, {color: 'green', fillOpacity: 0.3}).addTo(shadeLayer);
    });
    shadeLayer.addTo(map);
}

function renderTempLayer() {
    tempLayer = L.layerGroup();
    tempPoints.forEach(p => {
        L.circleMarker([p.lat, p.lng], {color: p.temp > 36 ? 'red' : 'orange', radius: 10, fillOpacity: 0.6})
            .bindPopup(`<b>Surface Temp:</b> ${p.temp}&deg;C`)
            .addTo(tempLayer);
    });
    tempLayer.addTo(map);
}

function renderHydrationLayer() {
    hydrationLayer = L.layerGroup();
    hydrationPoints.forEach(h => {
        L.marker([h.lat, h.lng], {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png', iconSize: [28,28]})})
            .bindPopup(`<b>${h.name}</b>`)
            .addTo(hydrationLayer);
    });
    hydrationLayer.addTo(map);
}

function renderRestStopLayer() {
    restStopLayer = L.layerGroup();
    restStops.forEach(r => {
        L.marker([r.lat, r.lng], {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [28,28]})})
            .bindPopup(`<b>${r.name}</b>`)
            .addTo(restStopLayer);
    });
    restStopLayer.addTo(map);
}

function initRouteControls() {
    const panel = document.getElementById('route-controls');
    panel.innerHTML = `
        <h2>Plan Your Route</h2>
        <button id="set-start">Set Start</button>
        <button id="set-end">Set End</button>
        <button id="find-route">Find Cooling Route</button>
        <div id="route-status"></div>
    `;
    let mode = null;
    document.getElementById('set-start').onclick = () => { mode = 'start'; };
    document.getElementById('set-end').onclick = () => { mode = 'end'; };
    map.on('click', e => {
        if (mode === 'start') {
            if (startMarker) map.removeLayer(startMarker);
            startMarker = L.marker(e.latlng, {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [32,32]})}).addTo(map).bindPopup('Start Point').openPopup();
            mode = null;
        } else if (mode === 'end') {
            if (endMarker) map.removeLayer(endMarker);
            endMarker = L.marker(e.latlng, {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [32,32]})}).addTo(map).bindPopup('End Point').openPopup();
            mode = null;
        }
    });
    document.getElementById('find-route').onclick = findCoolingRoute;
}

function findCoolingRoute() {
    if (!startMarker || !endMarker) {
        document.getElementById('route-status').textContent = 'Please set both start and end points.';
        return;
    }
    if (routeLayer) map.removeLayer(routeLayer);
    // Demo: Draw a simple polyline between start and end, passing through a shaded area and hydration point
    const route = [startMarker.getLatLng(), L.latLng(28.612, 77.233), L.latLng(28.613, 77.232), endMarker.getLatLng()];
    routeLayer = L.polyline(route, {color: 'blue', weight: 6, dashArray: '10 10'}).addTo(map);
    showRouteDetails(route);
    document.getElementById('route-status').textContent = 'Cooling route displayed!';
}

function showRouteDetails(route) {
    const section = document.getElementById('route-details');
    section.innerHTML = `
        <h2>Route Details</h2>
        <ul>
            <li>Distance: ~1.2 km (demo)</li>
            <li>Shade coverage: High</li>
            <li>Hydration points: 1</li>
            <li>Rest stops: 1</li>
            <li>Max surface temp: 38°C</li>
        </ul>
        <p>This route prioritizes shade, hydration, and lower surface temperatures for safer walking during heat.</p>
    `;
}

function updateLegend() {
    const section = document.getElementById('legend');
    section.innerHTML = `
        <h2>Map Legend</h2>
        <ul>
            <li><span style="color:green;">■</span> Shade Coverage</li>
            <li><span style="color:red;">●</span> High Surface Temp</li>
            <li><img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" width="18"> Hydration Point</li>
            <li><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width="18"> Rest Stop</li>
            <li><span style="color:blue;">━━</span> Cooling Route</li>
        </ul>
    `;
}
