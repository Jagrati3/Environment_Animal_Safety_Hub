// eco-friendly-transportation-mapper.js
// Dashboard logic for Eco-Friendly Transportation Mapper

// Map initialization
let map = L.map('map').setView([40.7128, -74.0060], 12); // Default to New York City
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let options = [
  {
    id: 1,
    name: "Central Park Bike Share",
    type: "bike-share",
    region: "north",
    lat: 40.7851,
    lng: -73.9683,
    info: "Bike-sharing station near park entrance."
  },
  {
    id: 2,
    name: "EV Charging at Union Square",
    type: "ev-charging",
    region: "east",
    lat: 40.7359,
    lng: -73.9911,
    info: "Fast EV charging available."
  },
  {
    id: 3,
    name: "Grand Central Transit Hub",
    type: "transit-hub",
    region: "south",
    lat: 40.7527,
    lng: -73.9772,
    info: "Major subway and train hub."
  }
];

let markers = [];

function renderOptions(filteredOptions) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('options');
  list.innerHTML = '';

  filteredOptions.forEach(opt => {
    // Add marker
    let marker = L.marker([opt.lat, opt.lng]).addTo(map);
    marker.bindPopup(`<b>${opt.name}</b><br>${opt.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${opt.name}</strong> (${opt.type.replace('-', ' ')}) - ${opt.info}`;
    list.appendChild(li);
  });
}

function filterOptions() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = options.filter(opt => types.includes(opt.type));
  if (region !== 'all') {
    filtered = filtered.filter(opt => opt.region === region);
  }
  renderOptions(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterOptions();
});

// Initial render
renderOptions(options);

// Community engagement section
const events = [
  {
    title: "Bike Share Community Ride",
    date: "2026-03-18",
    location: "Central Park Bike Share",
    description: "Join a group ride and learn about bike-sharing."
  },
  {
    title: "EV Charging Demo Day",
    date: "2026-04-08",
    location: "Union Square",
    description: "See how fast EV charging works and get tips."
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
