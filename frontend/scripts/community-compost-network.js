// community-compost-network.js
// Dashboard logic for Community Compost Network

// Map initialization
let map = L.map('map').setView([37.7749, -122.4194], 12); // Default to San Francisco
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let sites = [
  {
    id: 1,
    name: "Mission Compost Drop-Off",
    type: "drop-off",
    region: "south",
    lat: 37.7599,
    lng: -122.4148,
    info: "Open daily, accepts food scraps."
  },
  {
    id: 2,
    name: "Golden Gate Municipal Facility",
    type: "municipal",
    region: "north",
    lat: 37.7715,
    lng: -122.4687,
    info: "Large-scale composting, accepts yard waste."
  },
  {
    id: 3,
    name: "Bayview Community Compost Initiative",
    type: "community",
    region: "east",
    lat: 37.7294,
    lng: -122.3826,
    info: "Neighborhood-run, educational workshops."
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
    title: "Compost Workshop",
    date: "2026-03-10",
    location: "Bayview Community Compost Initiative",
    description: "Learn how to compost at home and reduce waste."
  },
  {
    title: "Municipal Facility Tour",
    date: "2026-04-02",
    location: "Golden Gate Municipal Facility",
    description: "Tour the facility and see large-scale composting in action."
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
