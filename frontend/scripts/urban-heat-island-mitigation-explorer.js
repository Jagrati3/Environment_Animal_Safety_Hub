// urban-heat-island-mitigation-explorer.js
// Dashboard logic for Urban Heat Island Mitigation Explorer

// Map initialization
let map = L.map('map').setView([32.7767, -96.7970], 11); // Default to Dallas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let initiatives = [
  {
    id: 1,
    name: "Downtown Cool Roof Retrofit",
    type: "cool-roof",
    region: "north",
    lat: 32.7900,
    lng: -96.8000,
    info: "Reflective roofing to reduce heat absorption."
  },
  {
    id: 2,
    name: "Trinity Park Urban Greening",
    type: "urban-greening",
    region: "west",
    lat: 32.7590,
    lng: -96.8300,
    info: "Tree planting and green space expansion."
  },
  {
    id: 3,
    name: "Southside Heat Mitigation Project",
    type: "heat-mitigation",
    region: "south",
    lat: 32.7300,
    lng: -96.8000,
    info: "Community shade structures and cool pavements."
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
    li.className = 'initiative-card';
    li.innerHTML = `<strong>${init.name}</strong> <span class="badge ${init.type}">${init.type.replace('-', ' ')}</span><br><span class="info">${init.info}</span>`;
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
    title: "Cool Roofs Community Workshop",
    date: "2026-03-24",
    location: "Downtown Cool Roof Retrofit",
    description: "Learn about cool roofs and how to get involved."
  },
  {
    title: "Urban Greening Volunteer Day",
    date: "2026-04-13",
    location: "Trinity Park Urban Greening",
    description: "Help plant trees and expand green spaces."
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
