// Biodiversity Explorer JS
// Handles species selection, sightings tracking, and support tips

document.addEventListener('DOMContentLoaded', function() {
  // --- Species Selection ---
  const species = [
    { icon: '🦋', title: 'Monarch Butterfly', desc: 'Migratory pollinator, needs milkweed.' },
    { icon: '🐦', title: 'Songbird', desc: 'Common in urban parks and gardens.' },
    { icon: '🐝', title: 'Native Bee', desc: 'Vital for pollination, likes wildflowers.' },
    { icon: '🦔', title: 'Hedgehog', desc: 'Nocturnal, needs shelter and food.' },
    { icon: '🌳', title: 'Oak Tree', desc: 'Supports hundreds of insect species.' },
    { icon: '🐿️', title: 'Squirrel', desc: 'Active in trees, parks, and gardens.' }
  ];
  const speciesGrid = document.getElementById('speciesGrid');
  let selectedSpecies = [];
  species.forEach((s, idx) => {
    const card = document.createElement('div');
    card.className = 'species-card';
    card.innerHTML = `<div class="species-icon">${s.icon}</div><div class="species-title">${s.title}</div><div class="species-desc">${s.desc}</div>`;
    card.addEventListener('click', function() {
      if (selectedSpecies.includes(idx)) {
        selectedSpecies = selectedSpecies.filter(i => i !== idx);
        card.classList.remove('selected');
      } else {
        selectedSpecies.push(idx);
        card.classList.add('selected');
      }
      updateSightings();
      updateSupportTips();
    });
    speciesGrid.appendChild(card);
  });

  // --- Sightings Tracker ---
  function updateSightings() {
    const sightings = [];
    if (selectedSpecies.length === 0) {
      sightings.push('Select species to track sightings!');
    } else {
      selectedSpecies.forEach(i => {
        sightings.push(`Sighted: ${species[i].title}`);
      });
      sightings.push('Log your sightings and share with your community!');
    }
    const sightingsList = document.getElementById('sightingsList');
    sightingsList.innerHTML = '';
    sightings.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      sightingsList.appendChild(li);
    });
  }

  // --- Support Biodiversity Tips ---
  function updateSupportTips() {
    const tips = [];
    if (selectedSpecies.length === 0) {
      tips.push('Select species to see support tips!');
    } else {
      if (selectedSpecies.some(i => species[i].title === 'Monarch Butterfly')) {
        tips.push('Plant milkweed to support monarchs.');
      }
      if (selectedSpecies.some(i => species[i].title === 'Native Bee')) {
        tips.push('Grow wildflowers and avoid pesticides.');
      }
      if (selectedSpecies.some(i => species[i].title === 'Songbird')) {
        tips.push('Provide bird feeders and nesting boxes.');
      }
      if (selectedSpecies.some(i => species[i].title === 'Hedgehog')) {
        tips.push('Leave leaf piles and logs for shelter.');
      }
      if (selectedSpecies.some(i => species[i].title === 'Oak Tree')) {
        tips.push('Plant native trees to support insects and birds.');
      }
      if (selectedSpecies.some(i => species[i].title === 'Squirrel')) {
        tips.push('Leave acorns and nuts for squirrels.');
      }
      tips.push('Join local conservation groups and citizen science projects.');
    }
    const supportList = document.getElementById('supportList');
    supportList.innerHTML = '';
    tips.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      supportList.appendChild(li);
    });
  }

  // Initial tips
  updateSightings();
  updateSupportTips();
});
