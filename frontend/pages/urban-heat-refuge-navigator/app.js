
// Urban Heat Refuge Navigator - Modular Main JS
// Author: Ayaanshaikh12243 & Contributors
// Description: Modular, advanced map for finding cooling centers, shaded routes, water refill points, and low-risk travel windows

import { coolingCenters, waterRefillPoints, shadedRoutes, lowRiskAreas, getHeatRiskOverlay, fetchCoolingCenters, fetchWaterRefillPoints, fetchShadedRoutes, fetchLowRiskAreas } from './js/data.js';
import { showInfo, showLoading, showNotification } from './js/ui.js';
import { enableKeyboardNavigation, setAriaLabels } from './js/accessibility.js';
import { enableRouteSelection } from './js/route-planner.js';
import { showAlert, showHydrationReminder } from './js/notifications.js';
import { enableFeedbackForm } from './js/feedback.js';

const DEFAULT_COORDS = [40.7128, -74.0060];
const DEFAULT_ZOOM = 13;
let map = L.map('map').setView(DEFAULT_COORDS, DEFAULT_ZOOM);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- LAYERS ---
const coolingLayer = L.layerGroup().addTo(map);
const waterLayer = L.layerGroup().addTo(map);
const shadedLayer = L.layerGroup().addTo(map);
const lowRiskLayer = L.layerGroup().addTo(map);
const riskOverlayLayer = L.geoJSON(null, { style: feature => riskStyle(feature.properties.risk) }).addTo(map);

function riskStyle(risk) {
    if (risk === 'high') return { color: '#e53935', fillColor: '#e57373', fillOpacity: 0.4 };
    if (risk === 'medium') return { color: '#ffb300', fillColor: '#ffe082', fillOpacity: 0.3 };
    return { color: '#43a047', fillColor: '#b9f6ca', fillOpacity: 0.2 };
}

// --- DATA LOADING ---
async function loadAllData() {
    showLoading('Loading map data...');
    coolingLayer.clearLayers();
    waterLayer.clearLayers();
    shadedLayer.clearLayers();
    lowRiskLayer.clearLayers();
    // Cooling Centers
    const centers = await fetchCoolingCenters();
    centers.forEach(center => {
        const marker = L.marker(center.coords, {
            icon: L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            })
        }).bindPopup(`<b>${center.name}</b><br>${center.address}<br>Rating: ${center.rating} ⭐<br>Hours: ${center.hours}`);
        marker.on('click', () => showInfo(center.name, `${center.address}<br>Rating: ${center.rating} ⭐<br>Hours: ${center.hours}`));
        coolingLayer.addLayer(marker);
    });
    // Water Refill Points
    const waterPoints = await fetchWaterRefillPoints();
    waterPoints.forEach(point => {
        const marker = L.marker(point.coords, {
            icon: L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/2917/2917990.png',
                iconSize: [28, 28],
                iconAnchor: [14, 28],
                popupAnchor: [0, -28]
            })
        }).bindPopup(`<b>${point.name}</b>`);
        marker.on('click', () => showInfo(point.name, 'Water refill point'));
        waterLayer.addLayer(marker);
    });
    // Shaded Routes
    const routes = await fetchShadedRoutes();
    routes.forEach(route => {
        const polyline = L.polyline(route, { color: '#795548', weight: 6, opacity: 0.7, dashArray: '10,10' });
        polyline.on('click', () => showInfo('Shaded Route', 'This route offers maximum shade.'));
        shadedLayer.addLayer(polyline);
    });
    // Low Risk Areas
    const areas = await fetchLowRiskAreas();
    areas.forEach(area => {
        const circle = L.circle(area.coords, {
            color: '#ffd600',
            fillColor: '#ffd600',
            fillOpacity: 0.3,
            radius: area.radius
        }).bindPopup(`<b>${area.name}</b><br>Low heat risk area`);
        circle.on('click', () => showInfo(area.name, 'Low heat risk area'));
        lowRiskLayer.addLayer(circle);
    });
    showInfo('Map Ready', 'Select a feature on the map for more information.');
}

// --- RISK OVERLAY (Animated by time window) ---
function updateRiskOverlay(hour) {
    const overlay = getHeatRiskOverlay(hour);
    riskOverlayLayer.clearLayers();
    riskOverlayLayer.addData(overlay);
}

// --- LAYER CONTROL ---
L.control.layers(null, {
    'Cooling Centers': coolingLayer,
    'Water Refill Points': waterLayer,
    'Shaded Routes': shadedLayer,
    'Low-Risk Areas': lowRiskLayer,
    'Heat Risk Overlay': riskOverlayLayer
}).addTo(map);

// --- GEOLOCATION ---
document.getElementById('locate-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 15);
            L.marker([latitude, longitude], {
                icon: L.icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                    iconSize: [24, 24],
                    iconAnchor: [12, 24],
                    popupAnchor: [0, -24]
                })
            }).addTo(map).bindPopup('You are here!').openPopup();
        }, err => {
            showAlert('Unable to access location.');
        });
    } else {
        showAlert('Geolocation not supported.');
    }
});

// --- SEARCH (Geocoding) ---
document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        geocodeAddress(this.value);
    }
});

function geocodeAddress(address) {
    if (!address) return;
    showLoading('Searching...');
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                map.setView([parseFloat(lat), parseFloat(lon)], 15);
                L.marker([parseFloat(lat), parseFloat(lon)], {
                    icon: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                        iconSize: [24, 24],
                        iconAnchor: [12, 24],
                        popupAnchor: [0, -24]
                    })
                }).addTo(map).bindPopup(`Search result:<br>${display_name}`).openPopup();
                showInfo('Search Result', display_name);
            } else {
                showAlert('Location not found.');
            }
        });
}

// --- TIME WINDOW FILTER (Animated Risk Overlay) ---
document.getElementById('time-window').addEventListener('change', function() {
    const val = this.value;
    let hour = 12;
    if (val === 'morning') hour = 9;
    else if (val === 'afternoon') hour = 15;
    else if (val === 'evening') hour = 19;
    else hour = new Date().getHours();
    updateRiskOverlay(hour);
    showInfo('Time Window', `Showing data for: ${this.options[this.selectedIndex].text}`);
});

// --- ROUTE PLANNER ---
enableRouteSelection(map);

// --- FEEDBACK FORM ---
enableFeedbackForm();

// --- ACCESSIBILITY ---
enableKeyboardNavigation();
setAriaLabels();

// --- HYDRATION REMINDER ---
showHydrationReminder();

// --- INITIALIZE ---
loadAllData();

// --- Responsive Enhancements ---
window.addEventListener('resize', function() {
    // Optionally, adjust map or UI on resize
});

// --- Placeholder for future features (e.g., real-time risk overlays, user feedback, etc.) ---
// ...
