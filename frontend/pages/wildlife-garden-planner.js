// Wildlife-Friendly Garden Planner JS
// Handles plant selection and habitat tips

document.addEventListener('DOMContentLoaded', function() {
    // --- Map UI Initialization ---
    const gardenMapDiv = document.getElementById('gardenMap');
    if (gardenMapDiv) {
      // Initialize Leaflet map
      const map = L.map('gardenMap').setView([51.505, -0.09], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      // Optionally, add a marker or other features here
    }
  // --- Plant Selection ---
  const plants = [
    { icon: '🌻', title: 'Sunflower', desc: 'Attracts pollinators and birds.' },
    { icon: '🌱', title: 'Milkweed', desc: 'Essential for monarch butterflies.' },
    { icon: '🌸', title: 'Native Wildflowers', desc: 'Supports bees and butterflies.' },
    { icon: '🌿', title: 'Herbs (Mint, Sage)', desc: 'Provides food and shelter for insects.' },
    { icon: '🌳', title: 'Native Trees', desc: 'Habitat for birds and squirrels.' },
    { icon: '🍓', title: 'Berry Bushes', desc: 'Food source for wildlife.' }
  ];
  const plantGrid = document.getElementById('plantGrid');
  let selectedPlants = [];
  if (!plantGrid) {
    // Show error and skip appending cards
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.margin = '1rem';
    errorDiv.textContent = 'Error: Required element #plantGrid not found. Plant selection UI cannot be rendered.';
    document.body.appendChild(errorDiv);
  } else {
    plants.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'plant-card';
      card.innerHTML = `<div class="plant-icon">${p.icon}</div><div class="plant-title">${p.title}</div><div class="plant-desc">${p.desc}</div>`;
      card.addEventListener('click', function() {
        if (selectedPlants.includes(idx)) {
          selectedPlants = selectedPlants.filter(i => i !== idx);
          card.classList.remove('selected');
        } else {
          selectedPlants.push(idx);
          card.classList.add('selected');
        }
        updateHabitatTips();
      });
      plantGrid.appendChild(card);
    });
  }

  // --- Habitat Tips ---
  function updateHabitatTips() {
    const tips = [];
    if (selectedPlants.length === 0) {
      tips.push('Select plants to see habitat tips!');
    } else {
      if (selectedPlants.some(i => plants[i].title === 'Milkweed')) {
        tips.push('Milkweed supports monarch butterflies. Plant in sunny spots.');
      }
      if (selectedPlants.some(i => plants[i].title === 'Native Wildflowers')) {
        tips.push('Wildflowers attract bees and butterflies. Avoid pesticides.');
      }
      if (selectedPlants.some(i => plants[i].title === 'Native Trees')) {
        tips.push('Native trees provide nesting sites for birds and shade for wildlife.');
      }
      if (selectedPlants.some(i => plants[i].title === 'Berry Bushes')) {
        tips.push('Berry bushes offer food for birds and small mammals.');
      }
      if (selectedPlants.some(i => plants[i].title === 'Herbs (Mint, Sage)')) {
        tips.push('Herbs attract beneficial insects and can be grown in pots.');
      }
      if (selectedPlants.some(i => plants[i].title === 'Sunflower')) {
        tips.push('Sunflowers provide seeds for birds and shelter for insects.');
      }
      tips.push('Add a water source (birdbath, pond) for wildlife.');
      tips.push('Leave some leaf litter and logs for shelter and food.');
    }
    const habitatList = document.getElementById('habitatList');
    habitatList.innerHTML = '';
    tips.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      habitatList.appendChild(li);
    });
  }

  // Initial tips
  updateHabitatTips();
});
