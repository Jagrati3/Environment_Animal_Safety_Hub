// sustainable-waterway-restoration-tracker.js
// Dashboard logic for Sustainable Waterway Restoration Tracker

// Map initialization
let map = L.map('map').setView([38.9072, -77.0369], 10); // Default to Washington, D.C.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let activities = [
  {
    id: 1,
    name: "Potomac River Cleanup",
    type: "river-cleanup",
    region: "north",
    lat: 38.9955,
    lng: -77.0269,
    info: "Annual river cleanup event."
  },
  {
    id: 2,
    name: "Anacostia Wetland Restoration",
    type: "wetland-restoration",
    region: "east",
    lat: 38.8951,
    lng: -76.9500,
    info: "Ongoing wetland restoration project."
  },
  {
    id: 3,
    name: "Southside Community Waterway Project",
    type: "community-project",
    region: "south",
    lat: 38.8600,
    lng: -77.0300,
    info: "Community-led waterway conservation."
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

  filteredActivities.forEach(activity => {
    // Add marker
    let marker = L.marker([activity.lat, activity.lng]).addTo(map);
    marker.bindPopup(`<b>${activity.name}</b><br>${activity.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${activity.name}</strong> (${activity.type.replace('-', ' ')}) - ${activity.info}`;
    list.appendChild(li);
  });
}

function filterActivities() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = activities.filter(activity => types.includes(activity.type));
  if (region !== 'all') {
    filtered = filtered.filter(activity => activity.region === region);
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
    title: "Wetland Restoration Workshop",
    date: "2026-03-29",
    location: "Anacostia Wetland Restoration",
    description: "Learn about wetland restoration and volunteer."
  },
  {
    title: "River Cleanup Day",
    date: "2026-04-19",
    location: "Potomac River Cleanup",
    description: "Join the annual river cleanup event."
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
