// Sample data for projects/events
const projects = [
  {
    name: "River Cleanup Event",
    lat: 40.7128,
    lng: -74.0060,
    description: "Join us to clean up the riverbank and help restore local habitats.",
    date: "2026-03-10"
  },
  {
    name: "Community Garden Initiative",
    lat: 40.7306,
    lng: -73.9352,
    description: "Help plant and maintain a new community garden.",
    date: "2026-03-15"
  },
  {
    name: "Tree Planting Drive",
    lat: 40.7580,
    lng: -73.9855,
    description: "Volunteer to plant trees in urban areas.",
    date: "2026-03-20"
  },
  {
    name: "Beach Restoration Project",
    lat: 40.5800,
    lng: -73.8300,
    description: "Help restore native vegetation and clean up the beach.",
    date: "2026-03-22"
  },
  {
    name: "Wildlife Habitat Survey",
    lat: 40.7000,
    lng: -73.9000,
    description: "Participate in a survey to monitor local wildlife habitats.",
    date: "2026-03-25"
  },
  {
    name: "Park Litter Patrol",
    lat: 40.7500,
    lng: -73.9700,
    description: "Join a group to patrol and clean up city parks.",
    date: "2026-03-28"
  },
  {
    name: "Green Tech Workshop",
    lat: 40.7200,
    lng: -73.9900,
    description: "Learn about sustainable technology and eco-friendly solutions.",
    date: "2026-03-30"
  },
  {
    name: "Urban Wetlands Cleanup",
    lat: 40.6700,
    lng: -73.9400,
    description: "Help clean and restore urban wetlands for biodiversity.",
    date: "2026-04-02"
  }
];

// Initialize map
const map = L.map('map').setView([40.7306, -73.9352], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for each project/event
projects.forEach(project => {
  const marker = L.marker([project.lat, project.lng]).addTo(map);
  marker.bindPopup(
    `<b>${project.name}</b><br>${project.description}<br><b>Date:</b> ${project.date}`
  );
});
