// water-conservation-action-tracker.js
// Dashboard logic for Water Conservation Action Tracker

// Map initialization
let map = L.map('map').setView([34.0522, -118.2437], 11); // Default to Los Angeles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let initiatives = [
  {
    id: 1,
    name: "City Park Water-Saving Retrofit",
    type: "water-saving",
    region: "north",
    lat: 34.0736,
    lng: -118.4004,
    info: "Low-flow irrigation installed."
  },
  {
    id: 2,
    name: "Rainwater Harvesting at Community Center",
    type: "rainwater-harvesting",
    region: "east",
    lat: 34.0622,
    lng: -118.2437,
    info: "Rain barrels and cisterns in use."
  },
  {
    id: 3,
    name: "Drought-Resilient Garden Project",
    type: "drought-landscaping",
    region: "south",
    lat: 34.0407,
    lng: -118.2468,
    info: "Native plants and xeriscaping."
  }
];

let markers = [];

function renderInitiatives(filteredInitiatives) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('initiatives');
  list.innerHTML = '';

  filteredInitiatives.forEach(init => {
    // Add marker
    let marker = L.marker([init.lat, init.lng]).addTo(map);
    marker.bindPopup(`<b>${init.name}</b><br>${init.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${init.name}</strong> (${init.type.replace('-', ' ')}) - ${init.info}`;
    list.appendChild(li);
  });
}

function filterInitiatives() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = initiatives.filter(init => types.includes(init.type));
  if (region !== 'all') {
    filtered = filtered.filter(init => init.region === region);
  }
  renderInitiatives(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterInitiatives();
});

// Initial render
renderInitiatives(initiatives);

// Community engagement section
const events = [
  {
    title: "Rainwater Harvesting Workshop",
    date: "2026-03-15",
    location: "Community Center",
    description: "Learn to install rain barrels and conserve water."
  },
  {
    title: "Drought-Resilient Landscaping Tour",
    date: "2026-04-05",
    location: "City Park",
    description: "Tour native plant gardens and xeriscaping projects."
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
