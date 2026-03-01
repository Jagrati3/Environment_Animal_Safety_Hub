// ===============================
// Urban Tree Canopy Visualizer
// ===============================

// --------- MAP INITIALIZATION ---------
const map = L.map("treeMap").setView([23.3441, 85.3096], 13); 
// Default: Dhanbad (you can change coordinates)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


// --------- DATA ---------

// Existing Trees (sample coordinates)
const existingTrees = [
  { lat: 23.3441, lng: 85.3096 },
  { lat: 23.3500, lng: 85.3150 },
  { lat: 23.3380, lng: 85.3000 },
  { lat: 23.3600, lng: 85.3200 }
];

// Suggested Planting Areas
const suggestedAreas = [
  { lat: 23.3455, lng: 85.3300, area: "Near City Park - Low canopy density" },
  { lat: 23.3300, lng: 85.2900, area: "Residential Zone - Heat hotspot" },
  { lat: 23.3550, lng: 85.2950, area: "Roadside Corridor - Pollution buffer" }
];


// --------- ICONS ---------
const treeIcon = L.circleMarker;

function addTreeMarker(lat, lng) {
  return L.circleMarker([lat, lng], {
    radius: 8,
    fillColor: "#2e7d32",
    color: "#1b5e20",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  }).addTo(map);
}

function addSuggestionMarker(lat, lng, text) {
  return L.circleMarker([lat, lng], {
    radius: 8,
    fillColor: "#fbc02d",
    color: "#f57f17",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  })
  .addTo(map)
  .bindPopup(`<strong>Suggested Planting</strong><br>${text}`);
}


// --------- RENDER MAP DATA ---------
existingTrees.forEach(tree => {
  addTreeMarker(tree.lat, tree.lng);
});

suggestedAreas.forEach(area => {
  addSuggestionMarker(area.lat, area.lng, area.area);
});


// --------- BENEFITS CALCULATION ---------

// Simple estimation logic
const totalTrees = existingTrees.length;

const benefitsData = [
  {
    icon: "🌿",
    title: "CO₂ Absorption",
    value: `${(totalTrees * 21).toLocaleString()} kg/year`,
    desc: "Estimated annual carbon dioxide absorption"
  },
  {
    icon: "🌡️",
    title: "Temperature Reduction",
    value: `${(totalTrees * 0.15).toFixed(1)}°C`,
    desc: "Localized cooling impact"
  },
  {
    icon: "💨",
    title: "Air Pollution Reduction",
    value: `${(totalTrees * 1.4).toFixed(1)} kg/year`,
    desc: "Particulate matter filtered"
  },
  {
    icon: "🌧️",
    title: "Stormwater Control",
    value: `${(totalTrees * 900).toLocaleString()} L/year`,
    desc: "Rainwater interception capacity"
  }
];


// --------- RENDER BENEFITS ---------
const benefitsGrid = document.getElementById("benefitsGrid");

benefitsData.forEach(benefit => {
  const card = document.createElement("div");
  card.className = "benefit-card";

  card.innerHTML = `
    <div class="benefit-icon">${benefit.icon}</div>
    <div class="benefit-title">${benefit.title}</div>
    <div class="benefit-value" style="font-weight:700; margin-bottom:6px;">
      ${benefit.value}
    </div>
    <div class="benefit-desc">${benefit.desc}</div>
  `;

  benefitsGrid.appendChild(card);
});


// --------- RENDER SUGGESTION LIST ---------
const suggestList = document.getElementById("suggestList");

suggestedAreas.forEach(area => {
  const li = document.createElement("li");
  li.textContent = area.area;

  li.addEventListener("click", () => {
    map.setView([area.lat, area.lng], 15);
  });

  suggestList.appendChild(li);
});


// --------- OPTIONAL: FIT MAP TO MARKERS ---------
const allPoints = [
  ...existingTrees.map(t => [t.lat, t.lng]),
  ...suggestedAreas.map(a => [a.lat, a.lng])
];

if (allPoints.length > 0) {
  map.fitBounds(allPoints);
}