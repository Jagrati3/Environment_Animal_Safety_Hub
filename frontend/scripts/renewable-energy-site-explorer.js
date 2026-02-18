// renewable-energy-site-explorer.js
// Dashboard logic for Renewable Energy Site Explorer

// Map initialization
let map = L.map('map').setView([39.8283, -98.5795], 5); // Default to USA center
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let sites = [
  {
    id: 1,
    name: "Desert Sun Solar Farm",
    type: "solar-panel",
    region: "west",
    lat: 34.9600,
    lng: -116.4194,
    info: "Large-scale solar panel installation."
  },
  {
    id: 2,
    name: "Great Plains Wind Farm",
    type: "wind-farm",
    region: "north",
    lat: 44.5000,
    lng: -100.0000,
    info: "Wind turbines generating clean energy."
  },
  {
    id: 3,
    name: "Green City Community Project",
    type: "community-project",
    region: "east",
    lat: 40.7128,
    lng: -74.0060,
    info: "Community-owned renewable energy initiative."
  }
];

let markers = [];

function renderSites(filteredSites) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('sites');
  list.innerHTML = '';

  filteredSites.forEach(site => {
    // Add marker
    let marker = L.marker([site.lat, site.lng]).addTo(map);
    marker.bindPopup(`<b>${site.name}</b><br>${site.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${site.name}</strong> (${site.type.replace('-', ' ')}) - ${site.info}`;
    list.appendChild(li);
  });
}

function filterSites() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = sites.filter(site => types.includes(site.type));
  if (region !== 'all') {
    filtered = filtered.filter(site => site.region === region);
  }
  renderSites(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterSites();
});

// Initial render
renderSites(sites);

// Community engagement section
const events = [
  {
    title: "Solar Farm Open House",
    date: "2026-03-27",
    location: "Desert Sun Solar Farm",
    description: "Tour the solar farm and learn about solar energy."
  },
  {
    title: "Wind Energy Awareness Day",
    date: "2026-04-15",
    location: "Great Plains Wind Farm",
    description: "See wind turbines up close and meet the engineers."
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
