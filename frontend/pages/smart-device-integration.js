// Smart Device Integration JS
// Handles device connection, dashboard, and energy impact

document.addEventListener('DOMContentLoaded', function() {
  const deviceForm = document.getElementById('deviceForm');
  const devicesList = document.getElementById('devicesList');
  const energyImpact = document.getElementById('energyImpact');

  let devices = [];

  // Device connection
  deviceForm.onsubmit = function(e) {
    e.preventDefault();
    const type = document.getElementById('deviceType').value;
    const name = document.getElementById('deviceName').value;
    if (!type || !name) return;
    // Simulate device status and energy usage
    const status = 'Online';
    const energy = Math.round(5 + Math.random()*20); // kWh
    devices.push({ type, name, status, energy });
    renderDevices();
    renderEnergyImpact();
    deviceForm.reset();
  };

  // Device controls (simulate on/off)
  function toggleDevice(index) {
    devices[index].status = devices[index].status === 'Online' ? 'Offline' : 'Online';
    renderDevices();
    renderEnergyImpact();
  }

  // Render devices
  function renderDevices() {
    devicesList.innerHTML = '';
    devices.forEach((d, i) => {
      const div = document.createElement('div');
      div.className = 'device';
      div.innerHTML = `
        <div><strong>${d.name}</strong> (${d.type})</div>
        <div class='device-status'>Status: ${d.status}</div>
        <div class='device-control'><button onclick='window.toggleDevice(${i})'>Toggle</button></div>
      `;
      devicesList.appendChild(div);
    });
  }

  // Render energy impact
  function renderEnergyImpact() {
    energyImpact.innerHTML = '';
    let total = 0;
    devices.forEach(d => {
      total += d.status === 'Online' ? d.energy : 0;
      energyImpact.innerHTML += `<div class='energy-impact-row'><span>${d.name}</span><span class='energy-impact-value'>${d.status === 'Online' ? d.energy+' kWh' : '0 kWh'}</span></div>`;
    });
    energyImpact.innerHTML += `<div class='energy-impact-row'><span>Total Impact</span><span class='energy-impact-value'>${total} kWh</span></div>`;
  }

  // Expose toggleDevice globally for inline button
  window.toggleDevice = toggleDevice;
});
