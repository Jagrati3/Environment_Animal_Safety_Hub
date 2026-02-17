// local-food-system-explorer.js
// Main dashboard logic for Local Food System Explorer

// Map initialization
let map = L.map('map').setView([40.7128, -74.0060], 12); // Default to NYC
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Data (placeholder, will be replaced by API calls)
let locations = [
  {
    id: 1,
    name: "Union Square Greenmarket",
    type: "farmers-market",
    region: "north",
    lat: 40.7359,
    lng: -73.9911,
    info: "Open Mon, Wed, Fri, Sat."
  },
  {
    id: 2,
    name: "Brooklyn Grange",
    type: "community-garden",
    region: "east",
    lat: 40.7532,
    lng: -73.9436,
    info: "Urban rooftop farm."
  },
  {
    id: 3,
    name: "Park Slope Food Coop",
    type: "food-coop",
    region: "south",
    lat: 40.6732,
    lng: -73.9786,
    info: "Member-owned grocery."
  }
];

let markers = [];

// Fetch food locations from backend API
async function fetchLocations() {
  const response = await fetch('/backend/category-api.js/api/food-locations');
  if (!response.ok) return locations;
  const data = await response.json();
  return data.data || locations;
}

// Update renderLocations to use API
async function updateLocationsFromAPI() {
  locations = await fetchLocations();
  renderLocations(locations);
}

// Initial render (with API)
updateLocationsFromAPI();

function renderLocations(filteredLocations) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('locations');
  list.innerHTML = '';

  filteredLocations.forEach(loc => {
    // Add marker
    let marker = L.marker([loc.lat, loc.lng]).addTo(map);
    marker.bindPopup(`<b>${loc.name}</b><br>${loc.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${loc.name}</strong> (${loc.type.replace('-', ' ')}) - ${loc.info}`;
    list.appendChild(li);
  });
}

function filterLocations() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = locations.filter(loc => types.includes(loc.type));
  if (region !== 'all') {
    filtered = filtered.filter(loc => loc.region === region);
  }
  renderLocations(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterLocations();
});

// Community engagement section
const events = [
  {
    title: "Spring Planting Festival",
    date: "2026-03-21",
    location: "Brooklyn Grange",
    description: "Join us for a day of planting and workshops."
  },
  {
    title: "Farmers' Market Meetup",
    date: "2026-04-10",
    location: "Union Square Greenmarket",
    description: "Meet local farmers and sample fresh produce."
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
