// pollinator-pathways-mapper.js
// Dashboard logic for Urban Pollinator Pathways Mapper

// Map initialization
let map = L.map('map').setView([41.8781, -87.6298], 12); // Default to Chicago
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data (replace with API calls)
let habitats = [
  {
    id: 1,
    name: "Lincoln Park Pollinator Garden",
    type: "garden",
    region: "north",
    lat: 41.9214,
    lng: -87.6513,
    info: "Native flowers, bee hotels, butterfly host plants."
  },
  {
    id: 2,
    name: "City Hall Green Roof",
    type: "green-roof",
    region: "west",
    lat: 41.8837,
    lng: -87.6376,
    info: "Green roof with wildflowers and pollinator habitat."
  },
  {
    id: 3,
    name: "Wildflower Corridor on Riverwalk",
    type: "wildflower-corridor",
    region: "east",
    lat: 41.8880,
    lng: -87.6207,
    info: "Continuous wildflower strip for bees and butterflies."
  }
];

let markers = [];

function renderHabitats(filteredHabitats) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Clear list
  const list = document.getElementById('habitats');
  list.innerHTML = '';

  filteredHabitats.forEach(hab => {
    // Add marker
    let marker = L.marker([hab.lat, hab.lng]).addTo(map);
    marker.bindPopup(`<b>${hab.name}</b><br>${hab.info}`);
    markers.push(marker);

    // Add to list
    let li = document.createElement('li');
    li.innerHTML = `<strong>${hab.name}</strong> (${hab.type.replace('-', ' ')}) - ${hab.info}`;
    list.appendChild(li);
  });
}

function filterHabitats() {
  const form = document.getElementById('filter-form');
  const types = Array.from(form.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  const region = form.querySelector('#region-select').value;

  let filtered = habitats.filter(hab => types.includes(hab.type));
  if (region !== 'all') {
    filtered = filtered.filter(hab => hab.region === region);
  }
  renderHabitats(filtered);
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  filterHabitats();
});

// Initial render
renderHabitats(habitats);

// Community engagement section
const events = [
  {
    title: "Pollinator Garden Planting Day",
    date: "2026-03-20",
    location: "Lincoln Park Pollinator Garden",
    description: "Help plant native flowers and install bee hotels."
  },
  {
    title: "Green Roof Tour",
    date: "2026-04-12",
    location: "City Hall Green Roof",
    description: "Learn about urban green roofs and pollinator habitats."
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
