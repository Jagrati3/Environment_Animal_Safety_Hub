// Smart Waste Management Dashboard JS
// Handles map, filters, and dynamic list rendering

let map;
const wasteData = [
  {
    id: 1,
    name: "Smart Bin - Main Square",
    type: "smart-bin",
    region: "north",
    lat: 40.7128,
    lng: -74.0060,
    description: "Solar-powered smart bin with fill-level sensors."
  },
  {
    id: 2,
    name: "Green Recycling Center",
    type: "recycling-center",
    region: "east",
    lat: 40.7138,
    lng: -74.0010,
    description: "Accepts plastics, glass, paper, and e-waste."
  },
  {
    id: 3,
    name: "Zero Waste Initiative",
    type: "waste-reduction",
    region: "south",
    lat: 40.7100,
    lng: -74.0080,
    description: "Community program for waste reduction and composting."
  },
  {
    id: 4,
    name: "Smart Bin - Riverside Park",
    type: "smart-bin",
    region: "west",
    lat: 40.7150,
    lng: -74.0150,
    description: "Smart bin with real-time monitoring."
  },
  {
    id: 5,
    name: "Eco Recycling Hub",
    type: "recycling-center",
    region: "north",
    lat: 40.7180,
    lng: -74.0020,
    description: "Drop-off for recyclables and hazardous waste."
  }
];

const communityEvents = [
  {
    title: "Neighborhood Clean-Up Day",
    date: "2026-03-15",
    description: "Join us for a community clean-up and recycling drive!"
  },
  {
    title: "E-Waste Collection Event",
    date: "2026-04-10",
    description: "Safely dispose of your old electronics at the recycling center."
  }
];

function initMap() {
  map = L.map('map').setView([40.7138, -74.0060], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

function renderOptions(filtered) {
  const list = document.getElementById('options');
  list.innerHTML = '';
  filtered.forEach(item => {
    const li = document.createElement('li');
    li.className = `option-card ${item.type}`;
    li.innerHTML = `<strong>${item.name}</strong><br><span class="badge ${item.type}">${formatType(item.type)}</span><br>${item.description}`;
    list.appendChild(li);
  });
}

function renderMapMarkers(filtered) {
  if (!map) return;
  if (window.markersLayer) {
    window.markersLayer.clearLayers();
  } else {
    window.markersLayer = L.layerGroup().addTo(map);
  }
  filtered.forEach(item => {
    const marker = L.marker([item.lat, item.lng]).addTo(window.markersLayer);
    marker.bindPopup(`<b>${item.name}</b><br>${item.description}`);
  });
}

function formatType(type) {
  switch(type) {
    case 'smart-bin': return 'Smart Bin';
    case 'recycling-center': return 'Recycling Center';
    case 'waste-reduction': return 'Waste Reduction';
    default: return type;
  }
}

function filterData() {
  const checkedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = document.getElementById('region-select').value;
  return wasteData.filter(item =>
    checkedTypes.includes(item.type) &&
    (region === 'all' || item.region === region)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderOptions(wasteData);
  renderMapMarkers(wasteData);

  // Render community events
  const eventsDiv = document.getElementById('events');
  eventsDiv.innerHTML = communityEvents.map(ev =>
    `<div class="event-card"><strong>${ev.title}</strong><br><span class="event-date">${ev.date}</span><br>${ev.description}</div>`
  ).join('');

  // Filter form
  document.getElementById('filter-form').addEventListener('submit', e => {
    e.preventDefault();
    const filtered = filterData();
    renderOptions(filtered);
    renderMapMarkers(filtered);
  });
});
