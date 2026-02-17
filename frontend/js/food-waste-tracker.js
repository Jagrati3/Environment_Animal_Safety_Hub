// Food Waste Tracker JavaScript

// State Management
let foodData = {
  waste: [],
  reminders: [],
  shoppingList: [],
  monthlyGoal: 20, // kg
  settings: {
    alerts: true,
    threshold: 0.8
  }
};

// Category costs and environmental impact (per kg)
const categoryData = {
  vegetables: { avgCost: 3, co2: 0.5, water: 50, land: 0.3 },
  fruits: { avgCost: 4, co2: 0.8, water: 80, land: 0.4 },
  meat: { avgCost: 12, co2: 27, water: 15000, land: 0.5 },
  dairy: { avgCost: 6, co2: 2.8, water: 1000, land: 0.2 },
  grains: { avgCost: 2, co2: 1.2, water: 1000, land: 0.4 },
  cooked: { avgCost: 5, co2: 1.5, water: 200, land: 0.3 },
  packaged: { avgCost: 4, co2: 2, water: 300, land: 0.25 },
  other: { avgCost: 3, co2: 1, water: 100, land: 0.2 }
};

// Recipes database
const recipes = [
  {
    name: "Vegetable Soup",
    ingredients: ["vegetables", "bread"],
    difficulty: "Easy",
    description: "Transform wilting vegetables into a hearty, delicious soup."
  },
  {
    name: "Stale Bread Croutons",
    ingredients: ["bread"],
    difficulty: "Easy",
    description: "Turn stale bread into crispy croutons for salads."
  },
  {
    name: "Fruit Smoothie Bowl",
    ingredients: ["fruits"],
    difficulty: "Easy",
    description: "Blend overripe fruits into a nutritious smoothie bowl."
  },
  {
    name: "Leftover Fried Rice",
    ingredients: ["grains"],
    difficulty: "Easy",
    description: "Repurpose day-old rice into delicious fried rice."
  },
  {
    name: "Chicken Broth",
    ingredients: ["meat"],
    difficulty: "Medium",
    description: "Make nutritious broth from meat bones and scraps."
  },
  {
    name: "Yogurt Parfait",
    ingredients: ["dairy", "fruits"],
    difficulty: "Easy",
    description: "Combine expiring yogurt with fruits before they spoil."
  },
  {
    name: "Bread Pudding",
    ingredients: ["bread", "dairy"],
    difficulty: "Medium",
    description: "Transform stale bread into decadent bread pudding."
  },
  {
    name: "Vegetable Stock",
    ingredients: ["vegetables"],
    difficulty: "Easy",
    description: "Save vegetable scraps to make homemade stock."
  },
  {
    name: "Fruit Jam",
    ingredients: ["fruits"],
    difficulty: "Medium",
    description: "Preserve overripe fruit by making homemade jam."
  },
  {
    name: "Cheese Sauce",
    ingredients: ["dairy"],
    difficulty: "Medium",
    description: "Use aging cheese to make a delicious sauce."
  }
];

// Storage tips
const storageTips = [
  {
    title: "Store Herbs Like Flowers",
    description: "Cut stems and place herbs in water like flowers in a vase.",
    benefit: "Extends freshness by 2-3 weeks"
  },
  {
    title: "Keep Berries in Paper Towels",
    description: "Line container with paper towels to absorb excess moisture.",
    benefit: "Prevents mold and extends shelf life"
  },
  {
    title: "Wrap Celery in Aluminum Foil",
    description: "Wrap washed celery tightly in foil before refrigerating.",
    benefit: "Keeps crisp for up to 4 weeks"
  },
  {
    title: "Store Avocados Separately",
    description: "Keep avocados away from other fruits to slow ripening.",
    benefit: "Controls ripening and reduces waste"
  },
  {
    title: "Freeze Bread Immediately",
    description: "Slice and freeze bread to use later as needed.",
    benefit: "Prevents mold and extends shelf life"
  },
  {
    title: "Use Root Vegetable Greens",
    description: "Don't throw beet/carrot tops - they're edible!",
    benefit: "Zero waste and extra nutrients"
  },
  {
    title: "Store Potatoes in Cool, Dark Place",
    description: "Keep in pantry, not fridge, with ventilation.",
    benefit: "Prevents sprouting for months"
  },
  {
    title: "Pickle Vegetable Scraps",
    description: "Ferment scraps with vinegar and salt.",
    benefit: "Adds flavor and extends life"
  },
  {
    title: "Keep Dairy on Shelf Edges",
    description: "Place milk and dairy away from fridge back.",
    benefit: "Maintains consistent temperature"
  },
  {
    title: "Wrap Cheese in Parchment Paper",
    description: "Paper breathes better than plastic wrap.",
    benefit: "Prevents mold growth"
  }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initializeEventListeners();
  updateDashboard();
  loadRecipes();
  loadStorageTips();
  initializeChart();
  initializePatternHeatmap();
  setupExpiryReminders();
  
  // Set current date/time
  const now = new Date();
  document.getElementById('wasteDate').value = now.toISOString().slice(0, 16);
});

// Data Management
function loadData() {
  const saved = localStorage.getItem('foodWasteData');
  if (saved) {
    foodData = JSON.parse(saved);
  }
}

function saveData() {
  localStorage.setItem('foodWasteData', JSON.stringify(foodData));
}

// Event Listeners
function initializeEventListeners() {
  const wasteForm = document.getElementById('wasteForm');
  if (wasteForm) {
    wasteForm.addEventListener('submit', handleWasteSubmit);
  }

  // Photo upload
  const photoUpload = document.getElementById('wastePhoto');
  if (photoUpload) {
    photoUpload.addEventListener('change', handlePhotoUpload);
  }
}

// Handle waste form submission
function handleWasteSubmit(e) {
  e.preventDefault();

  const category = document.getElementById('wasteCategory').value;
  const type = document.getElementById('wasteType').value;
  const weight = parseFloat(document.getElementById('wasteWeight').value);
  const itemName = document.getElementById('itemName').value;
  const cost = parseFloat(document.getElementById('itemCost').value) || 0;
  const date = document.getElementById('wasteDate').value;
  const reason = document.getElementById('wasteReason').value;

  if (!category || !type || !weight || !itemName) {
    showAlert('Please fill in all required fields', 'warning');
    return;
  }

  const wasteEntry = {
    id: Date.now(),
    category: category,
    type: type,
    weight: weight,
    itemName: itemName,
    cost: cost,
    date: new Date(date),
    reason: reason,
    addedAt: new Date(),
    photo: null
  };

  foodData.waste.push(wasteEntry);
  saveData();
  updateDashboard();
  checkWasteThreshold();

  // Reset form
  document.getElementById('wasteForm').reset();
  document.getElementById('wasteDate').value = new Date().toISOString().slice(0, 16);

  showAlert(`${itemName} (${weight}kg) logged successfully!`, 'success');
}

// Photo upload handler
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    showAlert('Photo uploaded: ' + file.name, 'success');
  }
}

// Quick log
function quickLog(category, type, weight, itemName) {
  const cost = weight * (categoryData[category]?.avgCost || 3);
  
  const wasteEntry = {
    id: Date.now(),
    category: category,
    type: type,
    weight: weight,
    itemName: itemName,
    cost: cost,
    date: new Date(),
    reason: 'Quick logged',
    addedAt: new Date(),
    photo: null
  };

  foodData.waste.push(wasteEntry);
  saveData();
  updateDashboard();
  checkWasteThreshold();

  showAlert(`${itemName} (${weight}kg) quick logged!`, 'success');
}

// Update Dashboard
function updateDashboard() {
  const today = getTodayWaste();
  const week = getWeekWaste();
  const month = getMonthWaste();

  // Today's waste
  const todayWeight = today.reduce((sum, w) => sum + w.weight, 0);
  document.getElementById('todayWaste').textContent = todayWeight.toFixed(1);
  document.getElementById('totalWasteKg').textContent = Math.round(getMonthWaste().reduce((sum, w) => sum + w.weight, 0));

  // Week's waste
  const weekWeight = week.reduce((sum, w) => sum + w.weight, 0);
  document.getElementById('weekWaste').textContent = weekWeight.toFixed(1);

  // Monetary waste
  const monthCost = month.reduce((sum, w) => sum + w.cost, 0);
  document.getElementById('monetaryWaste').textContent = '$' + monthCost.toFixed(2);

  // Compostable percentage
  const compostableItems = month.filter(w => 
    ['vegetables', 'fruits', 'cooked', 'dairy', 'grains'].includes(w.category)
  );
  const compostableWeight = compostableItems.reduce((sum, w) => sum + w.weight, 0);
  const totalWeight = month.reduce((sum, w) => sum + w.weight, 0);
  const compostPercent = totalWeight > 0 ? Math.round((compostableWeight / totalWeight) * 100) : 0;
  
  document.getElementById('compostablePercent').textContent = compostPercent;
  if (document.getElementById('compostProgressBar')) {
    document.getElementById('compostProgressBar').style.width = compostPercent + '%';
  }

  // Status badges
  updateStatusBadges(todayWeight);

  // Environmental impact
  updateEnvironmentalImpact();

  // Comparison
  updateComparison();

  // Goal progress
  updateGoalProgress();

  // Activity log
  updateWasteLog();

  // Charts
  updateCategoryChart();

  // Footer stats
  updateFooterStats();
}

// Status badges
function updateStatusBadges(todayWeight) {
  const todayStatus = document.getElementById('todayStatus');
  const goal = foodData.monthlyGoal / 30; // Daily goal
  
  if (todayWeight < goal * 0.5) {
    todayStatus.textContent = 'Excellent!';
    todayStatus.style.background = '#d1fae5';
    todayStatus.style.color = '#059669';
  } else if (todayWeight < goal) {
    todayStatus.textContent = 'Good';
    todayStatus.style.background = '#dbeafe';
    todayStatus.style.color = '#0369a1';
  } else if (todayWeight < goal * 1.5) {
    todayStatus.textContent = 'Moderate';
    todayStatus.style.background = '#fef3c7';
    todayStatus.style.color = '#92400e';
  } else {
    todayStatus.textContent = 'High';
    todayStatus.style.background = '#fee2e2';
    todayStatus.style.color = '#991b1b';
  }
}

// Environmental impact calculation
function updateEnvironmentalImpact() {
  const monthWaste = getMonthWaste();
  
  let totalCO2 = 0;
  let totalWater = 0;
  let totalLand = 0;
  let totalCompostable = 0;

  monthWaste.forEach(w => {
    const data = categoryData[w.category] || categoryData.other;
    totalCO2 += w.weight * data.co2;
    totalWater += w.weight * data.water;
    totalLand += w.weight * data.land;
    
    if (['vegetables', 'fruits', 'cooked', 'dairy', 'grains'].includes(w.category)) {
      totalCompostable += w.weight;
    }
  });

  document.getElementById('carbonImpact').textContent = totalCO2.toFixed(1);
  document.getElementById('waterImpact').textContent = Math.round(totalWater);
  document.getElementById('landImpact').textContent = totalLand.toFixed(1);
  document.getElementById('compostableKg').textContent = totalCompostable.toFixed(1);

  // Update insight message
  const impactMessage = document.getElementById('impactMessage');
  if (totalCO2 > 0) {
    impactMessage.textContent = `This month's waste produced ${totalCO2.toFixed(1)}kg CO₂e and used ${Math.round(totalWater)}L of water!`;
  }
}

// Comparison with average
function updateComparison() {
  const monthWeight = getMonthWaste().reduce((sum, w) => sum + w.weight, 0);
  const avgHousehold = 25; // kg per month
  const ecoHousehold = 10; // kg per month

  const yourPercent = Math.min((monthWeight / avgHousehold) * 100, 100);
  
  const yourBar = document.getElementById('yourWasteBar');
  const yourValue = document.getElementById('yourWasteValue');
  
  if (yourBar && yourValue) {
    yourBar.style.width = `${yourPercent}%`;
    yourValue.textContent = `${monthWeight.toFixed(1)}kg`;
  }

  // Update message
  const compMessage = document.getElementById('comparisonMessage');
  if (monthWeight < avgHousehold) {
    const saved = (avgHousehold - monthWeight).toFixed(1);
    compMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Great! You've wasted ${saved}kg less than average this month!</p>
    `;
  } else if (monthWeight > avgHousehold) {
    const extra = (monthWeight - avgHousehold).toFixed(1);
    compMessage.innerHTML = `
      <i class="fas fa-lightbulb"></i>
      <p>You're wasting ${extra}kg more than average. Let's reduce together!</p>
    `;
  } else {
    compMessage.innerHTML = `
      <i class="fas fa-target"></i>
      <p>You're at the average. With small changes, you can do better!</p>
    `;
  }
}

// Goal progress
function updateGoalProgress() {
  const monthWeight = getMonthWaste().reduce((sum, w) => sum + w.weight, 0);
  const goal = foodData.monthlyGoal;
  const percent = Math.min((monthWeight / goal) * 100, 100);

  const fill = document.getElementById('goalProgressFill');
  const text = document.getElementById('goalProgressText');

  if (fill) fill.style.width = `${percent}%`;
  if (text) text.textContent = `${monthWeight.toFixed(1)}kg of ${goal}kg goal`;

  // Update goal display
  document.getElementById('currentGoal').textContent = goal + ' kg';
}

// Update waste log
function updateWasteLog() {
  const wasteLog = document.getElementById('wasteLog');
  const items = [...foodData.waste].reverse().slice(0, 20);

  if (items.length === 0) {
    wasteLog.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-leaf"></i>
        <p>No waste logged yet</p>
        <small>Start tracking to see your patterns</small>
      </div>
    `;
    return;
  }

  wasteLog.innerHTML = items.map(item => `
    <div class="waste-item">
      <div class="waste-icon">${getCategoryIcon(item.category)}</div>
      <div class="waste-details">
        <h4>${item.itemName}</h4>
        <p>${formatDate(item.date)} • ${item.type.replace('-', ' ')}</p>
      </div>
      <div class="waste-amount">${item.weight}kg</div>
      <div class="waste-cost">$${item.cost.toFixed(2)}</div>
      <div class="waste-actions">
        <button class="waste-btn" onclick="deleteWaste(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Update category chart
let categoryChart = null;

function updateCategoryChart() {
  const canvas = document.getElementById('wasteCategoryChart');
  if (!canvas) return;

  const monthWaste = getMonthWaste();
  const breakdown = {};

  monthWaste.forEach(w => {
    if (!breakdown[w.category]) breakdown[w.category] = 0;
    breakdown[w.category] += w.weight;
  });

  const labels = Object.keys(breakdown).map(cat => capitalizeFirst(cat));
  const data = Object.values(breakdown);
  const colors = [
    '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', 
    '#06b6d4', '#14b8a6', '#6366f1', '#f97316'
  ];

  if (categoryChart) categoryChart.destroy();

  const ctx = canvas.getContext('2d');
  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  updateCategoryLegend(breakdown, colors);
}

function updateCategoryLegend(breakdown, colors) {
  const legend = document.getElementById('categoryLegend');
  if (!legend) return;

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
  legend.innerHTML = Object.entries(breakdown).map(([cat, amount], idx) => `
    <div class="legend-item">
      <div class="legend-color" style="background: ${colors[idx]}"></div>
      <span class="legend-text">${capitalizeFirst(cat)}</span>
      <span class="legend-value">${amount.toFixed(1)}kg</span>
    </div>
  `).join('');
}

// Initialize chart
function initializeChart() {
  const canvas = document.getElementById('wasteCategoryChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['No Data'],
      datasets: [{
        data: [1],
        backgroundColor: ['#e5e7eb'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } }
    }
  });
}

// Pattern heatmap
function initializePatternHeatmap() {
  changePatternView('week');
}

function changePatternView(view) {
  document.querySelectorAll('.pattern-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const container = document.getElementById('patternHeatmap');
  if (!container) return;

  const waste = view === 'week' ? getWeekWaste() : getMonthWaste();
  const days = view === 'week' ? 7 : 30;
  const hours = 24;

  const heatmapData = {};
  const today = new Date();

  for (let d = 0; d < days; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - 1 - d));
    const dayKey = date.toISOString().split('T')[0];
    heatmapData[dayKey] = new Array(hours).fill(0);
  }

  waste.forEach(w => {
    const date = new Date(w.date);
    const dayKey = date.toISOString().split('T')[0];
    const hour = date.getHours();
    if (heatmapData[dayKey]) heatmapData[dayKey][hour] += w.weight;
  });

  const maxValue = Math.max(...Object.values(heatmapData).flat());

  let html = '<div class="pattern-heatmap" style="display:grid;grid-template-columns:80px repeat(24,1fr);gap:4px;overflow-x:auto;">';
  html += '<div class="heatmap-label"></div>';
  
  for (let h = 0; h < hours; h++) {
    html += `<div class="heatmap-label" style="display:flex;align-items:center;justify-content:center;font-size:0.8rem;">${h}</div>`;
  }

  Object.entries(heatmapData).forEach(([day, values]) => {
    const date = new Date(day);
    const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    html += `<div class="heatmap-label" style="display:flex;align-items:center;justify-content:center;font-size:0.8rem;">${dayLabel}</div>`;

    values.forEach(value => {
      const intensity = maxValue > 0 ? value / maxValue : 0;
      let level = '0';
      if (intensity > 0 && intensity < 0.25) level = 'low';
      else if (intensity >= 0.25 && intensity < 0.5) level = 'medium';
      else if (intensity >= 0.5 && intensity < 0.75) level = 'high';
      else if (intensity >= 0.75) level = 'very-high';

      html += `<div class="heatmap-cell" data-value="${level}" title="${dayLabel} ${hour}:00 - ${Math.round(value * 10) / 10}kg"></div>`;
    });
  });

  html += '</div>';
  container.innerHTML = html;
}

// Recipes
function loadRecipes() {
  const container = document.getElementById('recipeContainer');
  if (!container) return;

  const randomRecipes = shuffleArray([...recipes]).slice(0, 4);
  displayRecipes(randomRecipes);
}

function loadMoreRecipes() {
  const container = document.getElementById('recipeContainer');
  if (!container) return;

  const randomRecipes = shuffleArray([...recipes]).slice(0, 4);
  displayRecipes(randomRecipes);
}

function displayRecipes(recipeList) {
  const container = document.getElementById('recipeContainer');
  
  container.innerHTML = recipeList.map(recipe => `
    <div class="recipe-item">
      <h4>🍳 ${recipe.name}</h4>
      <p>${recipe.description}</p>
      <div class="recipe-ingredients">
        <strong>Uses:</strong> ${recipe.ingredients.join(', ')}
      </div>
      <span class="recipe-difficulty">${recipe.difficulty}</span>
    </div>
  `).join('');
}

// Storage Tips
function loadStorageTips() {
  const container = document.getElementById('storageContainer');
  if (!container) return;

  const tips = shuffleArray([...storageTips]).slice(0, 4);
  displayStorageTips(tips);
}

function rotatStorageTips() {
  loadStorageTips();
}

function displayStorageTips(tipsList) {
  const container = document.getElementById('storageContainer');

  container.innerHTML = tipsList.map(tip => `
    <div class="tip-item">
      <h4>💡 ${tip.title}</h4>
      <p>${tip.description}</p>
      <span class="tip-benefit">✨ ${tip.benefit}</span>
    </div>
  `).join('');
}

// Expiry Reminders
function setupExpiryReminders() {
  const today = new Date();
  const reminders = foodData.reminders || [];
  updateExpiryList();
}

function addExpiryReminder() {
  const itemName = document.getElementById('expiryItem').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const location = document.getElementById('expiryLocation').value;

  if (!itemName || !expiryDate) {
    showAlert('Please fill in item and date', 'warning');
    return;
  }

  const reminder = {
    id: Date.now(),
    itemName: itemName,
    expiryDate: new Date(expiryDate),
    location: location,
    added: new Date()
  };

  foodData.reminders.push(reminder);
  saveData();
  updateExpiryList();

  document.getElementById('expiryItem').value = '';
  document.getElementById('expiryDate').value = '';
  
  showAlert('Reminder added for ' + itemName, 'success');
}

function updateExpiryList() {
  const list = document.getElementById('expiryList');
  if (!list) return;

  const reminders = foodData.reminders || [];
  const today = new Date();

  if (reminders.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text-light);">No reminders set</p>';
    return;
  }

  const sorted = [...reminders].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  list.innerHTML = sorted.map(reminder => {
    const isUrgent = daysUntilExpiry(reminder.expiryDate) <= 2;
    const days = daysUntilExpiry(reminder.expiryDate);

    return `
      <div class="expiry-item ${isUrgent ? 'urgent' : ''}">
        <div class="expiry-details">
          <h4>${reminder.itemName}</h4>
          <p>${reminder.location} • Expires in ${days} day${days !== 1 ? 's' : ''}</p>
        </div>
        <div class="expiry-actions">
          <button class="expiry-btn" onclick="deleteReminder(${reminder.id})" title="Remove">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function deleteReminder(id) {
  foodData.reminders = (foodData.reminders || []).filter(r => r.id !== id);
  saveData();
  updateExpiryList();
}

// Shopping List
function addToShoppingList() {
  const input = document.getElementById('newListItem');
  const item = input.value.trim();

  if (!item) {
    showAlert('Please enter an item', 'warning');
    return;
  }

  const listItem = {
    id: Date.now(),
    name: item,
    checked: false
  };

  foodData.shoppingList.push(listItem);
  saveData();
  updateShoppingList();
  input.value = '';
}

function updateShoppingList() {
  const list = document.getElementById('shoppingList');
  if (!list) return;

  if (foodData.shoppingList.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text-light);">No items in list</p>';
    return;
  }

  list.innerHTML = foodData.shoppingList.map(item => `
    <div class="shopping-item ${item.checked ? 'checked' : ''}">
      <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItem(${item.id})" />
      <label>${item.name}</label>
      <button type="button" onclick="removeShoppingItem(${item.id})">×</button>
    </div>
  `).join('');
}

function toggleShoppingItem(id) {
  const item = foodData.shoppingList.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    saveData();
    updateShoppingList();
  }
}

function removeShoppingItem(id) {
  foodData.shoppingList = foodData.shoppingList.filter(i => i.id !== id);
  saveData();
  updateShoppingList();
}

function exportShoppingList() {
  const list = foodData.shoppingList.map(i => (i.checked ? '✓' : '○') + ' ' + i.name).join('\n');
  const text = 'SHOPPING LIST\n' + '='.repeat(30) + '\n\n' + list;
  
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'shopping-list.txt';
  a.click();
  
  showAlert('Shopping list exported!', 'success');
}

// Goal Management
function toggleGoalEdit() {
  const form = document.getElementById('goalEditForm');
  form.classList.toggle('hidden');
}

function setReductionGoal(value) {
  document.getElementById('newReductionGoal').value = value;
}

function saveReductionGoal() {
  const newGoal = parseFloat(document.getElementById('newReductionGoal').value);

  if (newGoal < 1 || newGoal > 100) {
    showAlert('Goal must be between 1 and 100 kg', 'warning');
    return;
  }

  foodData.monthlyGoal = newGoal;
  saveData();
  updateDashboard();
  toggleGoalEdit();
  showAlert('Goal updated to ' + newGoal + ' kg!', 'success');
}

// Filters and Exports
function toggleWasteFilter() {
  const panel = document.getElementById('filterPanel');
  panel.classList.toggle('hidden');
}

function applyWasteFilter() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const dateFilter = document.getElementById('dateFilter').value;

  let filtered = [...foodData.waste];

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(w => w.category === categoryFilter);
  }

  if (typeFilter !== 'all') {
    filtered = filtered.filter(w => w.type === typeFilter);
  }

  const now = new Date();
  if (dateFilter === 'today') {
    filtered = filtered.filter(w => isSameDay(new Date(w.date), now));
  } else if (dateFilter === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(w => new Date(w.date) >= weekAgo);
  } else if (dateFilter === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(w => new Date(w.date) >= monthAgo);
  }

  updateWasteLogFiltered(filtered);
  showAlert(`Showing ${filtered.length} items`, 'info');
}

function updateWasteLogFiltered(items) {
  const wasteLog = document.getElementById('wasteLog');
  const display = [...items].reverse();

  if (display.length === 0) {
    wasteLog.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-filter"></i>
        <p>No items match your filters</p>
      </div>
    `;
    return;
  }

  wasteLog.innerHTML = display.map(item => `
    <div class="waste-item">
      <div class="waste-icon">${getCategoryIcon(item.category)}</div>
      <div class="waste-details">
        <h4>${item.itemName}</h4>
        <p>${formatDate(item.date)}</p>
      </div>
      <div class="waste-amount">${item.weight}kg</div>
      <div class="waste-cost">$${item.cost.toFixed(2)}</div>
      <div class="waste-actions">
        <button class="waste-btn" onclick="deleteWaste(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function exportWasteData() {
  const csv = generateCSV();
  downloadCSV(csv, 'food-waste-data.csv');
  showAlert('Data exported successfully!', 'success');
}

function generateCSV() {
  const headers = ['Date', 'Item', 'Category', 'Type', 'Weight (kg)', 'Cost ($)', 'Reason'];
  const rows = foodData.waste.map(w => [
    new Date(w.date).toLocaleDateString(),
    w.itemName,
    w.category,
    w.type,
    w.weight,
    w.cost.toFixed(2),
    w.reason
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(r => r.map(c => `"${c}"`).join(','))
  ].join('\n');

  return csv;
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Social Challenge
function joinFoodChallenge() {
  showAlert('Thank you for joining the Zero Waste Challenge! Compete with neighbors and reduce together.', 'success');
}

// Utility Functions
function deleteWaste(id) {
  foodData.waste = foodData.waste.filter(w => w.id !== id);
  saveData();
  updateDashboard();
  showAlert('Item deleted', 'success');
}

function getTodayWaste() {
  const today = new Date();
  return foodData.waste.filter(w => isSameDay(new Date(w.date), today));
}

function getWeekWaste() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return foodData.waste.filter(w => new Date(w.date) >= weekAgo);
}

function getMonthWaste() {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  return foodData.waste.filter(w => new Date(w.date) >= monthAgo);
}

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function checkWasteThreshold() {
  if (!foodData.settings.alerts) return;

  const monthWaste = getMonthWaste().reduce((sum, w) => sum + w.weight, 0);
  const threshold = foodData.monthlyGoal * foodData.settings.threshold;

  if (monthWaste >= foodData.monthlyGoal) {
    showAlert('⚠️ You\'ve exceeded your monthly waste goal!', 'danger');
  } else if (monthWaste >= threshold) {
    const percent = Math.round((monthWaste / foodData.monthlyGoal) * 100);
    showAlert(`⚠️ You're at ${percent}% of your monthly waste goal!`, 'warning');
  }
}

function updateFooterStats() {
  const monthWaste = getMonthWaste();
  const totalWeight = monthWaste.reduce((sum, w) => sum + w.weight, 0);
  const totalCost = monthWaste.reduce((sum, w) => sum + w.cost, 0);

  // Prevented = national average - your usage
  const prevented = Math.max(0, (25 - totalWeight)).toFixed(1);
  document.getElementById('totalWastePrevented').textContent = prevented + ' kg';

  // Money saved
  document.getElementById('totalSaved').textContent = '$' + totalCost.toFixed(2);

  // Meals equivalent (assuming 0.5kg per meal)
  const meals = Math.round(totalWeight / 0.5);
  document.getElementById('mealsRescued').textContent = meals;
}

function getCategoryIcon(category) {
  const icons = {
    'vegetables': '🥬',
    'fruits': '🍎',
    'meat': '🥩',
    'dairy': '🧀',
    'grains': '🌾',
    'cooked': '🍲',
    'packaged': '📦',
    'other': '📊'
  };
  return icons[category] || '📊';
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function daysUntilExpiry(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const diffMs = expiry - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function showAlert(message, type = 'info') {
  const banner = document.getElementById('alertBanner');
  const messageEl = document.getElementById('alertMessage');

  messageEl.textContent = message;
  banner.className = `alert-banner ${type}`;
  banner.classList.remove('hidden');

  setTimeout(() => {
    banner.classList.add('hidden');
  }, 4000);
}

function closeAlert() {
  document.getElementById('alertBanner').classList.add('hidden');
}
