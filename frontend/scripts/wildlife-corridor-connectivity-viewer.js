// wildlife-corridor-connectivity-viewer.js
// Dashboard logic for Wildlife Corridor Connectivity Viewer

// Map initialization
let map = L.map('map').setView([36.7783, -119.4179], 7); // Default to California
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let features = [
  {
    id: 1,
    name: "Sierra Nevada Wildlife Corridor",
    type: "corridor",
    region: "north",
    lat: 39.5501,
    lng: -120.0331,
    info: "Major migration route for deer and mountain lions."
  },
  {
    id: 2,
    name: "Highway 101 Wildlife Overpass",
    type: "crossing-structure",
    region: "west",
    lat: 34.1533,
    lng: -118.7617,
    info: "Bridge for safe animal crossing over highway."
  },
  {
    id: 3,
    name: "Central Valley Connectivity Project",
    type: "connectivity-project",
    region: "south",
    lat: 36.7783,
    lng: -119.4179,
    info: "Restoration of habitat corridors for multiple species."
  }
];

let markers = [];

function renderFeatures(filteredFeatures) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('features');
  list.innerHTML = '';

  filteredFeatures.forEach(feature => {
    // Add marker
    let marker = L.marker([feature.lat, feature.lng]).addTo(map);
    marker.bindPopup(`<b>${feature.name}</b><br>${feature.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${feature.name}</strong> (${feature.type.replace('-', ' ')}) - ${feature.info}`;
    list.appendChild(li);
  });
}

function filterFeatures() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = features.filter(feature => types.includes(feature.type));
  if (region !== 'all') {
    filtered = filtered.filter(feature => feature.region === region);
  }
  renderFeatures(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterFeatures();
});

// Initial render
renderFeatures(features);

// Community engagement section
const events = [
  {
    title: "Wildlife Corridor Restoration Day",
    date: "2026-03-30",
    location: "Central Valley Connectivity Project",
    description: "Volunteer to help restore habitat corridors."
  },
  {
    title: "Wildlife Overpass Awareness Walk",
    date: "2026-04-20",
    location: "Highway 101 Wildlife Overpass",
    description: "Learn about animal crossings and safe migration."
  }
];

function renderEvents() {
  const eventsDiv = document.getElementById('events');
  eventsDiv.innerHTML = '';
  events.forEach(ev => {
    let div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `<h3>${ev.title}</h3><p><strong>Date:</strong> ${ev.date}<br><strong>Location:</strong> ${ev.location}<br>${ev.description}</p>`;
    eventsDiv.appendChild(div);
  });
}

renderEvents();

// ...more code for API integration, user submissions, and advanced features...
