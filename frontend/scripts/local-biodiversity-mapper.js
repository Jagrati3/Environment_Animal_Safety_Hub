// local-biodiversity-mapper.js
// UI logic for logging and visualizing biodiversity sightings

document.addEventListener('DOMContentLoaded', function() {
  // Sample data
  let sightings = [
    { species: "Red Maple", type: "Plant", location: "Central Park", date: "2026-02-10", notes: "Young tree, healthy leaves." },
    { species: "Monarch Butterfly", type: "Insect", location: "Riverbank Trail", date: "2026-02-09", notes: "Resting on milkweed." },
    { species: "Eastern Bluebird", type: "Bird", location: "Community Garden", date: "2026-02-08", notes: "Pair seen near nest box." },
    { species: "Gray Squirrel", type: "Mammal", location: "Oak Street", date: "2026-02-07", notes: "Foraging for acorns." },
    { species: "Painted Turtle", type: "Reptile", location: "Willow Pond", date: "2026-02-06", notes: "Basking on a log." },
    { species: "Wild Columbine", type: "Plant", location: "Hilltop Meadow", date: "2026-02-05", notes: "Blooming, pollinators present." },
    { species: "Honey Bee", type: "Insect", location: "Schoolyard Garden", date: "2026-02-04", notes: "Active on flowers." },
    { species: "Northern Cardinal", type: "Bird", location: "Elm Avenue", date: "2026-02-03", notes: "Male singing in tree." }
  ];

  // Render sightings
  function renderSightings() {
    const grid = document.getElementById('sightingsGrid');
    grid.innerHTML = '';
    sightings.slice().reverse().forEach(s => {
      const card = document.createElement('div');
      card.className = 'sighting-card';
      card.innerHTML = `
        <div class="sighting-title">${s.species}</div>
        <div class="sighting-type"><strong>Type:</strong> ${s.type}</div>
        <div class="sighting-location"><strong>Location:</strong> ${s.location}</div>
        <div class="sighting-date"><strong>Date:</strong> ${s.date}</div>
        <div class="sighting-notes">${s.notes ? `<strong>Notes:</strong> ${s.notes}` : ''}</div>
      `;
      grid.appendChild(card);
    });
  }

  // Render biodiversity stats
  function renderStats() {
    const statsDiv = document.getElementById('stats');
    const total = sightings.length;
    const byType = {};
    const uniqueSpecies = new Set();
    sightings.forEach(s => {
      byType[s.type] = (byType[s.type] || 0) + 1;
      uniqueSpecies.add(s.species);
    });
    let html = `<div><strong>Total Sightings:</strong> ${total}</div>`;
    html += `<div><strong>Unique Species:</strong> ${uniqueSpecies.size}</div>`;
    html += '<div><strong>By Type:</strong> ';
    html += Object.entries(byType).map(([type, count]) => `${type}: ${count}`).join(', ');
    html += '</div>';
    statsDiv.innerHTML = html;
  }

  // Render map (simple placeholder visualization)
  function renderMap() {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = '<span style="opacity:0.7;">[Map visualization coming soon: markers for each sighting location]</span>';
  }

  // Handle form submission
  document.getElementById('sightingForm').onsubmit = function(e) {
    e.preventDefault();
    const species = document.getElementById('species').value.trim();
    const type = document.getElementById('type').value;
    const location = document.getElementById('location').value.trim();
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value.trim();
    if (!species || !location || !date) return;
    sightings.push({ species, type, location, date, notes });
    renderSightings();
    renderStats();
    renderMap();
    document.getElementById('sightingForm').reset();
  };

  renderSightings();
  renderStats();
  renderMap();
});
