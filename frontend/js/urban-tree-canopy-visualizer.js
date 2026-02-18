// Urban Tree Canopy Visualizer JS
// Demo data for neighborhoods and canopy coverage
const neighborhoods = [
  {
    name: "Greenfield",
    coords: [40.7128, -74.006],
    canopy: 75,
    initiatives: [
      "Volunteer for Greenfield Tree Day!",
      "Sponsor a sapling in Greenfield Park",
      "Join the local tree census"
    ]
  },
  {
    name: "Maplewood",
    coords: [40.715, -74.002],
    canopy: 45,
    initiatives: [
      "Maplewood Community Planting Drive",
      "Adopt-a-Tree program",
      "Attend the Tree Care Workshop"
    ]
  },
  {
    name: "Sunset District",
    coords: [40.718, -74.012],
    canopy: 20,
    initiatives: [
      "Sunset Tree Revival Project",
      "Neighborhood Greening Grants",
      "Monthly Tree-Planting Meetup"
    ]
  }
];

const map = L.map('utc-map').setView([40.714, -74.006], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

neighborhoods.forEach(n => {
  let color;
  if (n.canopy >= 60) color = '#43cea2';
  else if (n.canopy >= 35) color = '#ffe066';
  else color = '#ff6f61';

  const marker = L.circleMarker(n.coords, {
    radius: 22,
    color: '#185a9d',
    weight: 2,
    fillColor: color,
    fillOpacity: 0.85
  }).addTo(map);

  marker.on('click', () => {
    showNeighborhoodInfo(n);
  });

  marker.bindTooltip(`<b>${n.name}</b><br>Canopy: ${n.canopy}%`, {direction: 'top'});
});

function showNeighborhoodInfo(n) {
  document.getElementById('utc-neighborhood-info').innerHTML = `
    <strong>${n.name}</strong><br>
    Tree Canopy Coverage: <b>${n.canopy}%</b><br>
    ${n.canopy < 40 ? '<span style="color:#ff6f61">Low green cover! Needs urgent planting.</span>' : n.canopy < 60 ? '<span style="color:#ffe066">Moderate green cover. Improvement needed.</span>' : '<span style="color:#43cea2">Excellent green cover!</span>'}
  `;
  const ul = document.getElementById('utc-initiatives');
  ul.innerHTML = '';
  n.initiatives.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li);
  });
}
