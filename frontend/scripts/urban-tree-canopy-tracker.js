// urban-tree-canopy-tracker.js
// Dashboard logic for Urban Tree Canopy Tracker

// Map initialization
let map = L.map('map').setView([39.9526, -75.1652], 12); // Default to Philadelphia
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let sites = [
  {
    id: 1,
    name: "Fairmount Park Tree Planting",
    type: "planting-site",
    region: "north",
    lat: 39.9832,
    lng: -75.2107,
    info: "Annual tree planting event."
  },
  {
    id: 2,
    name: "East Philly Forestry Project",
    type: "forestry-project",
    region: "east",
    lat: 39.9700,
    lng: -75.1200,
    info: "Community-led urban forestry initiative."
  },
  {
    id: 3,
    name: "South Street Tree Maintenance",
    type: "maintenance-event",
    region: "south",
    lat: 39.9400,
    lng: -75.1600,
    info: "Monthly tree care and pruning."
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
    title: "Tree Planting Day",
    date: "2026-03-22",
    location: "Fairmount Park Tree Planting",
    description: "Join the annual tree planting event."
  },
  {
    title: "Forestry Project Workshop",
    date: "2026-04-14",
    location: "East Philly Forestry Project",
    description: "Learn about urban forestry and get involved."
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
