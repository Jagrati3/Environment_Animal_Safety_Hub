// Wildlife Sighting Explorer JS
// Handles logging, listing, and mapping wildlife sightings

let sightings = [];

document.addEventListener('DOMContentLoaded', function() {
  const sightingForm = document.getElementById('sightingForm');
  const speciesName = document.getElementById('speciesName');
  const locationInput = document.getElementById('location');
  const sightingTime = document.getElementById('sightingTime');
  const sightingList = document.getElementById('sightingList');
  const mapArea = document.getElementById('mapArea');

    // Render map with Leaflet
    function renderMap() {
    // Helper: Geocode location to lat/lng using OpenStreetMap Nominatim
    async function geocodeLocation(location) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
      } catch (e) {
        // Ignore errors
      }
      return null;
    }
      // Clear previous map
    // Render map with Leaflet and geocoded markers
    async function renderMap() {
      mapArea.innerHTML = '';
      const mapDiv = document.createElement('div');
      mapDiv.id = 'leafletMap';
      mapDiv.style.height = '400px';
      mapArea.appendChild(mapDiv);

      // Default center
      const map = L.map('leafletMap').setView([51.505, -0.09], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Geocode all sightings and add markers
      const markerPromises = sightings.map(async s => {
        const coords = await geocodeLocation(s.location);
        if (coords) {
          return L.marker([coords.lat, coords.lng]).addTo(map)
            .bindPopup(`<strong>${s.species}</strong><br>Location: ${s.location}<br>Time: ${s.time}`);
        }
        return null;
      });
      const markers = (await Promise.all(markerPromises)).filter(m => m);

      // Auto-fit map to markers
      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));
      }
      else {
        map.setView([51.505, -0.09], 2);
        mapArea.insertAdjacentHTML('beforeend', '<div style="color:#888;margin-top:10px">No valid locations found for sightings.</div>');
      }
    }
    sightingList.innerHTML = '';
    sightings.slice(-10).reverse().forEach(s => {
      sightingList.innerHTML += `<div class='sighting-row'><strong>${s.species}</strong><span>Location: ${s.location}</span><span>Time: ${s.time}</span></div>`;
    });
    renderMap();
  }

      renderMap(); // Now async
  sightingForm.onsubmit = function(e) {
    e.preventDefault();
    const species = speciesName.value.trim();
    const location = locationInput.value.trim();
    const time = sightingTime.value;
    if (!species || !location || !time) return;
    sightings.push({ species, location, time });
    renderSightings();
    sightingForm.reset();
  };

  // Initial render
  renderSightings();
});
