// Eco-Friendly Home Tips Hub JS
const tipsData = [
  {
    title: "Switch to LED Bulbs",
    category: "Energy",
    tip: "LED bulbs use up to 80% less energy than traditional bulbs and last much longer."
  },
  {
    title: "Fix Leaky Faucets",
    category: "Water",
    tip: "A dripping faucet can waste over 3,000 gallons of water a year. Fix leaks promptly."
  },
  {
    title: "Compost Food Scraps",
    category: "Waste",
    tip: "Composting reduces landfill waste and creates nutrient-rich soil for your garden."
  },
  {
    title: "Use Natural Cleaners",
    category: "Cleaning",
    tip: "Vinegar, baking soda, and lemon are effective, non-toxic cleaning alternatives."
  },
  {
    title: "Collect Rainwater",
    category: "Gardening",
    tip: "Use rain barrels to collect water for your plants and reduce tap water use."
  },
  {
    title: "Unplug Devices",
    category: "Energy",
    tip: "Electronics draw power even when off. Unplug to save energy and money."
  },
  {
    title: "Shorten Showers",
    category: "Water",
    tip: "Reducing your shower by 2 minutes can save up to 150 gallons of water per month."
  },
  {
    title: "Grow Native Plants",
    category: "Gardening",
    tip: "Native plants require less water and support local wildlife."
  }
];

let favorites = [];
let filteredTips = tipsData;

function renderTips() {
  const list = document.getElementById('tipsList');
  list.innerHTML = '';
  if (filteredTips.length === 0) {
    list.innerHTML = '<li>No tips found.</li>';
    return;
  }
  filteredTips.forEach((t, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="tips-tip-title">${t.title}</div>
      <div class="tips-tip-category">${t.category}</div>
      <div class="tips-tip-desc">${t.tip}</div>
      <div class="tips-tip-actions">
        <button onclick="saveTip(${idx})"><i class="fa fa-bookmark"></i> Save</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderFavorites() {
  const list = document.getElementById('tipsFavoritesList');
  list.innerHTML = '';
  if (favorites.length === 0) {
    list.innerHTML = '<li>No saved tips yet.</li>';
    return;
  }
  favorites.forEach((t, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="tips-tip-title">${t.title}</div>
      <div class="tips-tip-category">${t.category}</div>
      <div class="tips-tip-desc">${t.tip}</div>
      <div class="tips-tip-actions">
        <button onclick="removeTip(${idx})"><i class="fa fa-trash"></i> Remove</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function filterTips() {
  const search = document.getElementById('tipsSearch').value.toLowerCase();
  const category = document.getElementById('tipsCategoryFilter').value;
  filteredTips = tipsData.filter(t =>
    (t.title.toLowerCase().includes(search) || t.tip.toLowerCase().includes(search)) &&
    (category === '' || t.category === category)
  );
  renderTips();
}

document.getElementById('tipsSearch').oninput = filterTips;
document.getElementById('tipsCategoryFilter').onchange = filterTips;

window.saveTip = function(idx) {
  const tip = filteredTips[idx];
  if (!favorites.some(f => f.title === tip.title)) {
    favorites.push(tip);
    renderFavorites();
  }
};

window.removeTip = function(idx) {
  favorites.splice(idx, 1);
  renderFavorites();
};

renderTips();
renderFavorites();
