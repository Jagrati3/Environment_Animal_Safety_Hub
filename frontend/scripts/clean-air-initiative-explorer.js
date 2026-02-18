// clean-air-initiative-explorer.js
// Dashboard logic for Clean Air Initiative Explorer

// Map initialization
let map = L.map('map').setView([29.7604, -95.3698], 12); // Default to Houston
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let activities = [
  {
    id: 1,
    name: "Downtown Air Quality Station",
    type: "monitoring-station",
    region: "north",
    lat: 29.7633,
    lng: -95.3636,
    info: "Continuous air quality monitoring."
  },
  {
    id: 2,
    name: "Clean Air Campaign - East Side",
    type: "campaign",
    region: "east",
    lat: 29.7520,
    lng: -95.3200,
    info: "Community-led anti-pollution campaign."
  },
  {
    id: 3,
    name: "Green Roof Project at City Hall",
    type: "green-infrastructure",
    region: "west",
    lat: 29.7600,
    lng: -95.3700,
    info: "Green roof installation for air quality improvement."
  }
];

let markers = [];

function renderActivities(filteredActivities) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('activities');
  list.innerHTML = '';

  filteredActivities.forEach(act => {
    // Add marker
    let marker = L.marker([act.lat, act.lng]).addTo(map);
    marker.bindPopup(`<b>${act.name}</b><br>${act.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${act.name}</strong> (${act.type.replace('-', ' ')}) - ${act.info}`;
    list.appendChild(li);
  });
}

function filterActivities() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = activities.filter(act => types.includes(act.type));
  if (region !== 'all') {
    filtered = filtered.filter(act => act.region === region);
  }
  renderActivities(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterActivities();
});

// Initial render
renderActivities(activities);

// Community engagement section
const events = [
  {
    title: "Air Quality Awareness Day",
    date: "2026-03-25",
    location: "Downtown Air Quality Station",
    description: "Learn about air quality and participate in activities."
  },
  {
    title: "Green Infrastructure Workshop",
    date: "2026-04-16",
    location: "City Hall",
    description: "Discover how green roofs improve air quality."
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
