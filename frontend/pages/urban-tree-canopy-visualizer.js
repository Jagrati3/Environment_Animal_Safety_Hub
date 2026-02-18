// Urban Tree Canopy Visualizer JS
// Handles map, benefits, and suggestions

document.addEventListener('DOMContentLoaded', function() {
  // --- Map ---
  if (document.getElementById('treeMap')) {
    const map = L.map('treeMap').setView([40.7128, -74.0060], 13); // Default: NYC
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example tree data (replace with real data or API)
    const trees = [
      { lat: 40.715, lng: -74.002, species: 'Oak', age: 12 },
      { lat: 40.722, lng: -74.01, species: 'Maple', age: 8 },
      { lat: 40.735, lng: -73.991, species: 'Elm', age: 20 },
      { lat: 40.728, lng: -74.005, species: 'Ginkgo', age: 5 }
    ];
    const suggestions = [
      { lat: 40.719, lng: -74.008, reason: 'Low canopy, high pedestrian area' },
      { lat: 40.731, lng: -73.995, reason: 'Near school, shade needed' },
      { lat: 40.725, lng: -74.012, reason: 'Parking lot, heat island' }
    ];
    const treeIcon = L.divIcon({ className: 'marker-tree', html: '🌳', iconSize: [28,28] });
    const suggestIcon = L.divIcon({ className: 'marker-suggest', html: '🟡', iconSize: [22,22] });
    trees.forEach(tree => {
      L.marker([tree.lat, tree.lng], { icon: treeIcon })
        .addTo(map)
        .bindPopup(`<b>${tree.species} Tree</b><br>Age: ${tree.age} years`);
    });
    suggestions.forEach(s => {
      L.marker([s.lat, s.lng], { icon: suggestIcon })
        .addTo(map)
        .bindPopup(`<b>Suggested Planting</b><br>${s.reason}`);
    });
  }

  // --- Benefits ---
  const benefits = [
    { icon: '🌳', title: 'Shade Provided', desc: 'Reduces urban heat and energy use for cooling.' },
    { icon: '🍃', title: 'Air Quality', desc: 'Filters pollutants and produces oxygen.' },
    { icon: '🦋', title: 'Biodiversity', desc: 'Supports birds, insects, and urban wildlife.' },
    { icon: '💧', title: 'Stormwater', desc: 'Intercepts rainfall, reducing runoff and flooding.' },
    { icon: '🏙️', title: 'Aesthetics', desc: 'Beautifies neighborhoods and increases property value.' }
  ];
  const benefitsGrid = document.getElementById('benefitsGrid');
  benefits.forEach(b => {
    const card = document.createElement('div');
    card.className = 'benefit-card';
    card.innerHTML = `<div class="benefit-icon">${b.icon}</div><div class="benefit-title">${b.title}</div><div class="benefit-desc">${b.desc}</div>`;
    benefitsGrid.appendChild(card);
  });

  // --- Suggestions List ---
  const suggestList = document.getElementById('suggestList');
  suggestions.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.reason} (Lat: ${s.lat.toFixed(3)}, Lng: ${s.lng.toFixed(3)})`;
    suggestList.appendChild(li);
  });
});
