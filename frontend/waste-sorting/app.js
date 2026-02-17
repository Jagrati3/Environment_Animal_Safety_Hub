const wasteDB = [
  { name: 'Plastic Bottle', type: 'recycle', info: 'Empty and rinse before recycling.' },
  { name: 'Banana Peel', type: 'compost', info: 'Compostable food waste.' },
  { name: 'Pizza Box', type: 'landfill', info: 'Greasy boxes go to landfill.' },
  { name: 'Glass Jar', type: 'recycle', info: 'Remove lid, rinse, and recycle.' },
  { name: 'Paper Towel', type: 'compost', info: 'Compost if clean, landfill if soiled with chemicals.' },
  { name: 'Styrofoam Cup', type: 'landfill', info: 'Not recyclable in most areas.' },
  { name: 'Aluminum Can', type: 'recycle', info: 'Rinse and recycle.' },
  { name: 'Tea Bag', type: 'compost', info: 'Remove staple before composting.' },
  { name: 'Chip Bag', type: 'landfill', info: 'Plastic/foil bags go to landfill.' },
  { name: 'Eggshell', type: 'compost', info: 'Crush before composting.' }
];

const tips = [
  'Reduce single-use plastics by using reusable containers.',
  'Compost food scraps to reduce landfill waste.',
  'Rinse recyclables to avoid contamination.',
  'Buy in bulk to minimize packaging.',
  'Donate or repurpose items before discarding.'
];

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  const results = document.getElementById('results');
  const tipsList = document.getElementById('tips-list');

  // Show tips
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  // Search handler
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    results.innerHTML = '';
    if (query.length === 0) return;
    const matches = wasteDB.filter(item => item.name.toLowerCase().includes(query));
    if (matches.length === 0) {
      results.innerHTML = '<p>No results found.</p>';
      return;
    }
    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = `result-card ${item.type}`;
      div.innerHTML = `<strong>${item.name}</strong> <span class="type">(${item.type.charAt(0).toUpperCase() + item.type.slice(1)})</span><br><small>${item.info}</small>`;
      results.appendChild(div);
    });
  });
});
