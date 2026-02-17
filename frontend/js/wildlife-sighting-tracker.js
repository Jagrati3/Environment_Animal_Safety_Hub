// Wildlife Sighting Tracker JS
let sightings = [
  {
    species: "Red Fox",
    date: "2026-02-06",
    time: "07:30",
    location: "Greenbank Park",
    notes: "Seen near the river, appeared healthy.",
    photo: null,
    lat: 40.7138,
    lng: -74.0065
  },
  {
    species: "Blue Jay",
    date: "2026-02-05",
    time: "15:10",
    location: "Orchard St",
    notes: "Two birds feeding on berries.",
    photo: null,
    lat: 40.7152,
    lng: -74.0021
  }
];

const wildlifeMap = L.map('wildlifeMap').setView([40.715, -74.006], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(wildlifeMap);
let sightingMarkers = [];

function renderSightings() {
  // List
  const list = document.getElementById('wildlifeSightingList');
  list.innerHTML = '';
  if (sightings.length === 0) {
    list.innerHTML = '<li>No sightings yet.</li>';
    return;
  }
  sightings.slice().reverse().forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${s.species}</strong> <span style="font-size:0.95em;">(${s.date} ${s.time})</span><br>
      <span><i class="fa fa-map-marker-alt"></i> ${s.location}</span><br>
      ${s.photo ? `<img src="${s.photo}" class="wildlife-sighting-photo" alt="${s.species} photo">` : ''}
      <span>${s.notes || ''}</span>
    `;
    list.appendChild(li);
  });
  // Map
  sightingMarkers.forEach(m => wildlifeMap.removeLayer(m));
  sightingMarkers = [];
  sightings.forEach(s => {
    const marker = L.marker([s.lat, s.lng]).addTo(wildlifeMap);
    marker.bindPopup(`<b>${s.species}</b><br>${s.date} ${s.time}<br>${s.location}`);
    sightingMarkers.push(marker);
  });
}

// Modal logic
const sightingModal = document.getElementById('wildlifeSightingModal');
const openSightingModalBtn = document.getElementById('openSightingModal');
const closeSightingModalBtn = document.getElementById('closeSightingModal');
const sightingForm = document.getElementById('wildlifeSightingForm');

openSightingModalBtn.onclick = () => { sightingModal.style.display = 'flex'; };
closeSightingModalBtn.onclick = () => { sightingModal.style.display = 'none'; };

sightingForm.onsubmit = function(e) {
  e.preventDefault();
  const species = this.speciesName.value;
  const date = this.sightingDate.value;
  const time = this.sightingTime.value;
  const location = this.sightingLocation.value;
  const notes = this.sightingNotes.value;
  let photo = null;
  if (this.sightingPhoto.files && this.sightingPhoto.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      photo = evt.target.result;
      addSighting(species, date, time, location, notes, photo);
    };
    reader.readAsDataURL(this.sightingPhoto.files[0]);
    sightingModal.style.display = 'none';
    this.reset();
    return;
  }
  addSighting(species, date, time, location, notes, photo);
  sightingModal.style.display = 'none';
  this.reset();
};

function addSighting(species, date, time, location, notes, photo) {
  // For demo, randomize lat/lng near center
  const baseLat = 40.715, baseLng = -74.006;
  const lat = baseLat + (Math.random() - 0.5) * 0.01;
  const lng = baseLng + (Math.random() - 0.5) * 0.01;
  sightings.push({ species, date, time, location, notes, photo, lat, lng });
  renderSightings();
}

// Modal close on outside click
window.onclick = function(event) {
  if (event.target === sightingModal) sightingModal.style.display = 'none';
};

renderSightings();
