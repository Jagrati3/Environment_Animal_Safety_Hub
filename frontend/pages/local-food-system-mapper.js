// Local Food System Mapper JS
// Handles tab navigation, map, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
  // --- Tab Navigation ---
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      document.getElementById(tab + 'Tab').classList.add('active');
    });
  });

  // --- Map (Map Tab) ---
  if (document.getElementById('foodMap')) {
    const map = L.map('foodMap').setView([40.7128, -74.0060], 12); // Default: NYC
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example data (replace with real data or API)
    const locations = [
      { type: 'producer', name: 'Green Valley Farm', desc: 'Organic vegetables and eggs', lat: 40.715, lng: -74.002 },
      { type: 'market', name: 'Union Square Market', desc: 'Saturday farmers market', lat: 40.735, lng: -73.991 },
      { type: 'producer', name: 'Urban Roots', desc: 'Hydroponic greens', lat: 40.722, lng: -74.01 },
      { type: 'market', name: 'Brooklyn Borough Hall Market', desc: 'Tuesday & Thursday', lat: 40.692, lng: -73.990 },
      { type: 'producer', name: 'Sunrise Orchards', desc: 'Fruit and cider', lat: 40.75, lng: -73.98 }
    ];
    const markerIcons = {
      producer: L.divIcon({ className: 'marker-producer', html: '🌾', iconSize: [28,28] }),
      market: L.divIcon({ className: 'marker-market', html: '🛒', iconSize: [28,28] })
    };
    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng], { icon: markerIcons[loc.type] })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
    });

    // Add marker on map click (for form)
    let newMarker = null;
    map.on('click', function(e) {
      if (newMarker) map.removeLayer(newMarker);
      newMarker = L.marker(e.latlng).addTo(map);
      // Optionally, store lat/lng for form submission
    });
  }

  // --- Filter Buttons (Dashboard) ---
  window.switchTab = function(tab) {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    document.querySelector(`.nav-tab[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
  };

  // --- Modal Handling (for forms) ---
  window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
  };
  // Add more modal logic as needed

  // --- Example: Fill stats (Dashboard)
  document.getElementById('marketCount').textContent = '3';
  document.getElementById('csaCount').textContent = '2';
  document.getElementById('gardenCount').textContent = '1';
  document.getElementById('wasteCount').textContent = '1';
  document.getElementById('carbonSaved').textContent = '120';
  document.getElementById('waterSaved').textContent = '800';
  document.getElementById('wastePrevented').textContent = '15';
});
