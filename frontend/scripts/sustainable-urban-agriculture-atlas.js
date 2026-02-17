// sustainable-urban-agriculture-atlas.js
// Dashboard logic for Sustainable Urban Agriculture Atlas

// Map initialization
let map = L.map('map').setView([40.7306, -73.9352], 12); // Default to New York City
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let sites = [
  {
    id: 1,
    name: "Brooklyn Grange Rooftop Farm",
    type: "rooftop-farm",
    region: "north",
    lat: 40.7532,
    lng: -73.9436,
    info: "Largest rooftop soil farm in NYC."
  },
  {
    id: 2,
    name: "Hydroponic Greenhouse at PS 333",
    type: "hydroponic-system",
    region: "west",
    lat: 40.7794,
    lng: -73.9800,
    info: "School-based hydroponic system."
  },
  {
    id: 3,
    name: "East Village Urban Agriculture Project",
    type: "urban-agriculture-project",
    region: "east",
    lat: 40.7265,
    lng: -73.9815,
    info: "Community-run urban farm and education center."
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
    title: "Urban Farming Workshop",
    date: "2026-03-28",
    location: "East Village Urban Agriculture Project",
    description: "Learn about urban farming and sustainable food systems."
  },
  {
    title: "Hydroponics Open House",
    date: "2026-04-18",
    location: "Hydroponic Greenhouse at PS 333",
    description: "Tour the hydroponic greenhouse and see how it works."
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
