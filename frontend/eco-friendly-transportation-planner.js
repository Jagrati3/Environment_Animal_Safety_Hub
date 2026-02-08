// Demo emissions saved per km (kg CO2)
const emissionsPerKm = {
  bike: 0,
  walk: 0,
  public: 0.05,
  carpool: 0.09
};

// Demo routes and schedules
const demoRoutes = [
  {
    mode: 'bike',
    route: 'Greenway Trail',
    schedule: 'Open 24/7',
    details: 'Safe bike path connecting downtown to parks.'
  },
  {
    mode: 'public',
    route: 'Metro Line 2',
    schedule: 'Every 15 min, 6am-11pm',
    details: 'Connects main neighborhoods and business districts.'
  },
  {
    mode: 'carpool',
    route: 'Carpool Lane - Elm St',
    schedule: 'Weekdays 7am-9am, 4pm-6pm',
    details: 'Dedicated lane for carpool vehicles.'
  },
  {
    mode: 'walk',
    route: 'City Walkway',
    schedule: 'Open 24/7',
    details: 'Pedestrian-friendly route through city center.'
  }
];

function planTrip(start, end, option) {
  // Demo: Assume 8km trip
  const distance = 8;
  const emissionsSaved = (0.18 - emissionsPerKm[option]) * distance;
  return {
    distance,
    emissionsSaved,
    option
  };
}

document.getElementById('tripForm').onsubmit = function(e) {
  e.preventDefault();
  const start = document.getElementById('startLocation').value;
  const end = document.getElementById('endLocation').value;
  const option = document.getElementById('transportOption').value;
  const trip = planTrip(start, end, option);
  const results = document.getElementById('tripResults');
  results.innerHTML = `
    <div style="font-weight:600;color:#43cea2;">${capitalize(option)} trip from <span style="color:#185a9d;">${start}</span> to <span style="color:#185a9d;">${end}</span></div>
    <div>Distance: <strong>${trip.distance} km</strong></div>
    <div>Estimated Emissions Saved: <strong style="color:#43cea2;">${trip.emissionsSaved.toFixed(2)} kg CO<sub>2</sub></strong></div>
  `;
  renderRoutesInfo(option);
  this.reset();
};

function renderRoutesInfo(option) {
  const info = document.getElementById('routesInfo');
  const routes = demoRoutes.filter(r => r.mode === option);
  if (routes.length === 0) {
    info.innerHTML = '<p style="color:#888;">No routes or schedules found for this option.</p>';
    return;
  }
  info.innerHTML = routes.map(r => `
    <div style="margin-bottom:1rem;">
      <strong>Route:</strong> ${r.route}<br>
      <strong>Schedule:</strong> ${r.schedule}<br>
      <span style="color:#185a9d;">${r.details}</span>
    </div>
  `).join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
