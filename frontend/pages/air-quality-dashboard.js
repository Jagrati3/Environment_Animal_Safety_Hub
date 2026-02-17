// Air Quality Awareness Dashboard JS
// Handles AQI visualization, health impacts, and actions

document.addEventListener('DOMContentLoaded', function() {
  // --- AQI Visualization ---
  const aqiData = [
    { title: 'PM2.5', value: 42, desc: 'Fine particles from vehicles, industry, and fires.' },
    { title: 'PM10', value: 65, desc: 'Dust, pollen, and larger particles.' },
    { title: 'Ozone (O3)', value: 28, desc: 'Ground-level ozone from sunlight and pollution.' },
    { title: 'NO2', value: 19, desc: 'Nitrogen dioxide from traffic and power plants.' },
    { title: 'CO', value: 7, desc: 'Carbon monoxide from incomplete combustion.' }
  ];
  const aqiGrid = document.getElementById('aqiGrid');
  aqiData.forEach(aqi => {
    const card = document.createElement('div');
    card.className = 'aqi-card';
    card.innerHTML = `<div class="aqi-title">${aqi.title}</div><div class="aqi-value">${aqi.value}</div><div class="aqi-desc">${aqi.desc}</div>`;
    aqiGrid.appendChild(card);
  });

  // --- Health Impacts ---
  const healthImpacts = [
    'High PM2.5 can worsen asthma and heart conditions.',
    'Ozone exposure irritates lungs and reduces immunity.',
    'NO2 increases risk of respiratory infections.',
    'CO exposure can cause headaches and dizziness.',
    'Children, elderly, and those with chronic illnesses are most vulnerable.'
  ];
  const healthList = document.getElementById('healthList');
  healthImpacts.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    healthList.appendChild(li);
  });

  // --- Actionable Steps ---
  const actions = [
    'Check daily AQI and limit outdoor activity on poor air days.',
    'Use air purifiers and keep windows closed during high pollution.',
    'Avoid burning trash or using wood stoves indoors.',
    'Support clean energy and public transit initiatives.',
    'Plant trees and maintain indoor plants to improve air quality.'
  ];
  const actionsList = document.getElementById('actionsList');
  actions.forEach(a => {
    const li = document.createElement('li');
    li.textContent = a;
    actionsList.appendChild(li);
  });
});
