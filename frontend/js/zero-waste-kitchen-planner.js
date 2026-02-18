// Zero-Waste Kitchen Planner

const RECIPES = [
  {
    id: 1,
    name: 'Green Grain Bowl',
    ingredients: ['spinach', 'rice', 'chickpeas', 'lemon'],
    tags: ['15 min', 'plant-based'],
    wasteSaved: 0.4
  },
  {
    id: 2,
    name: 'Frittata Clean-Out',
    ingredients: ['eggs', 'onion', 'bell pepper', 'cheese'],
    tags: ['high protein', 'pantry saver'],
    wasteSaved: 0.35
  },
  {
    id: 3,
    name: 'Veggie Stir Fry',
    ingredients: ['carrot', 'broccoli', 'soy sauce', 'garlic'],
    tags: ['20 min', 'stovetop'],
    wasteSaved: 0.3
  },
  {
    id: 4,
    name: 'Tomato Lentil Soup',
    ingredients: ['tomato', 'lentils', 'onion', 'stock'],
    tags: ['batch cook', 'warm'],
    wasteSaved: 0.5
  },
  {
    id: 5,
    name: 'Overnight Oats Remix',
    ingredients: ['oats', 'milk', 'banana', 'nuts'],
    tags: ['no-cook', 'breakfast'],
    wasteSaved: 0.25
  },
  {
    id: 6,
    name: 'Sheet Pan Mix',
    ingredients: ['potato', 'zucchini', 'olive oil', 'herbs'],
    tags: ['30 min', 'easy'],
    wasteSaved: 0.45
  }
];

const CHALLENGES = [
  {
    id: 1,
    title: 'Log 5 meals',
    target: 5,
    progressKey: 'mealsLogged'
  },
  {
    id: 2,
    title: 'Add 10 pantry items',
    target: 10,
    progressKey: 'itemsAdded'
  },
  {
    id: 3,
    title: 'Use 3 expiring items',
    target: 3,
    progressKey: 'expiringUsed'
  }
];

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'First Cook',
    description: 'Log your first meal',
    icon: 'fa-utensils',
    check: (state) => state.mealLogs.length >= 1
  },
  {
    id: 2,
    title: 'Pantry Pro',
    description: 'Track 15 pantry items',
    icon: 'fa-boxes-stacked',
    check: (state) => state.pantryItems.length >= 15
  },
  {
    id: 3,
    title: 'Waste Warrior',
    description: 'Save 5 kg of food',
    icon: 'fa-seedling',
    check: (state) => state.wasteSaved >= 5
  },
  {
    id: 4,
    title: 'Consistent Chef',
    description: 'Log 10 meals',
    icon: 'fa-award',
    check: (state) => state.mealLogs.length >= 10
  }
];

const DEFAULT_STATE = {
  pantryItems: [],
  mealLogs: [],
  wasteSaved: 0,
  weeklyProgress: {
    startDate: null,
    mealsLogged: 0,
    itemsAdded: 0,
    expiringUsed: 0
  },
  unlockedAchievements: []
};

let appState = { ...DEFAULT_STATE };

// Initialization
function initApp() {
  loadState();
  ensureWeeklyWindow();
  renderAll();
  bindEvents();
}

function loadState() {
  const saved = localStorage.getItem('zeroWasteKitchenState');
  if (saved) {
    appState = {
      ...DEFAULT_STATE,
      ...JSON.parse(saved)
    };
  }
}

function saveState() {
  localStorage.setItem('zeroWasteKitchenState', JSON.stringify(appState));
}

function bindEvents() {
  document.getElementById('pantryForm').addEventListener('submit', handleAddPantry);
  document.getElementById('mealForm').addEventListener('submit', handleQuickMeal);
}

// Pantry
function handleAddPantry(event) {
  event.preventDefault();
  const itemName = document.getElementById('itemName').value.trim();
  const qty = parseFloat(document.getElementById('itemQty').value);
  const unit = document.getElementById('itemUnit').value;
  const category = document.getElementById('itemCategory').value;
  const expiry = document.getElementById('itemExpiry').value;

  if (!itemName || !expiry || qty <= 0) {
    showAlert('Please fill in all pantry fields.');
    return;
  }

  appState.pantryItems.push({
    id: crypto.randomUUID(),
    name: itemName.toLowerCase(),
    qty,
    unit,
    category,
    expiry
  });

  appState.weeklyProgress.itemsAdded += 1;
  saveState();
  renderAll();
  event.target.reset();
  showAlert('Pantry item added.');
}

function filterPantry(type) {
  setActiveFilter('.filters .filter-btn', type);
  renderPantry(type);
}

function renderPantry(filter = 'all') {
  const list = document.getElementById('pantryList');
  const now = new Date();

  const items = appState.pantryItems.filter((item) => {
    const days = daysUntil(item.expiry);
    if (filter === 'expiring') return days >= 0 && days <= 3;
    if (filter === 'expired') return days < 0;
    return true;
  });

  if (items.length === 0) {
    list.innerHTML = '<p class="dashboard-subtext">No pantry items for this filter.</p>';
    return;
  }

  list.innerHTML = items.map((item) => {
    const days = daysUntil(item.expiry);
    const badge = days < 0 ? 'badge-expired' : days <= 3 ? 'badge-soon' : 'badge-ok';
    const statusLabel = days < 0 ? 'Expired' : days <= 3 ? 'Use soon' : 'Fresh';

    return `
      <div class="pantry-item">
        <div>
          <strong>${formatName(item.name)}</strong>
          <div class="pantry-meta">${item.qty} ${item.unit} | ${item.category}</div>
        </div>
        <div class="pantry-meta">Expires: ${formatDate(item.expiry)}</div>
        <span class="pantry-badge ${badge}">${statusLabel}</span>
        <div class="pantry-actions">
          <button onclick="removePantryItem('${item.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function removePantryItem(id) {
  appState.pantryItems = appState.pantryItems.filter((item) => item.id !== id);
  saveState();
  renderAll();
}

// Recipes
function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  const pantryNames = appState.pantryItems.map((item) => item.name);

  const recipes = RECIPES.map((recipe) => {
    const matchCount = recipe.ingredients.filter((ing) => pantryNames.includes(ing)).length;
    return { ...recipe, matchCount };
  }).sort((a, b) => b.matchCount - a.matchCount);

  grid.innerHTML = recipes.map((recipe) => {
    return `
      <div class="recipe-card">
        <h3>${recipe.name}</h3>
        <div class="recipe-tags">
          ${recipe.tags.map((tag) => `<span class="recipe-tag">${tag}</span>`).join('')}
        </div>
        <div class="dashboard-subtext">Uses: ${recipe.ingredients.join(', ')}</div>
        <div class="dashboard-subtext">Pantry match: ${recipe.matchCount}/${recipe.ingredients.length}</div>
        <button class="recipe-btn" onclick="logRecipeMeal(${recipe.id})">Log this meal</button>
      </div>
    `;
  }).join('');
}

function logRecipeMeal(recipeId) {
  const recipe = RECIPES.find((item) => item.id === recipeId);
  if (!recipe) return;

  let expiringUsed = 0;
  const usedItems = [];

  recipe.ingredients.forEach((ingredient) => {
    const pantryItem = appState.pantryItems.find((item) => item.name === ingredient);
    if (pantryItem) {
      pantryItem.qty = Math.max(pantryItem.qty - 1, 0);
      usedItems.push(ingredient);
      if (daysUntil(pantryItem.expiry) <= 3) {
        expiringUsed += 1;
      }
    }
  });

  appState.pantryItems = appState.pantryItems.filter((item) => item.qty > 0);

  const log = {
    id: crypto.randomUUID(),
    name: recipe.name,
    items: usedItems.length ? usedItems : recipe.ingredients,
    wasteSaved: recipe.wasteSaved,
    date: new Date().toISOString()
  };

  appState.mealLogs.unshift(log);
  appState.wasteSaved += recipe.wasteSaved;
  appState.weeklyProgress.mealsLogged += 1;
  appState.weeklyProgress.expiringUsed += expiringUsed;

  updateAchievements();
  saveState();
  renderAll();
  showAlert('Meal logged from recipe.');
}

function handleQuickMeal(event) {
  event.preventDefault();
  const name = document.getElementById('mealName').value.trim();
  const items = document.getElementById('mealItems').value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const waste = parseFloat(document.getElementById('mealWaste').value);

  if (!name || items.length === 0 || Number.isNaN(waste)) {
    showAlert('Please fill in all meal details.');
    return;
  }

  let expiringUsed = 0;
  items.forEach((ingredient) => {
    const pantryItem = appState.pantryItems.find((item) => item.name === ingredient);
    if (pantryItem) {
      pantryItem.qty = Math.max(pantryItem.qty - 1, 0);
      if (daysUntil(pantryItem.expiry) <= 3) {
        expiringUsed += 1;
      }
    }
  });

  appState.pantryItems = appState.pantryItems.filter((item) => item.qty > 0);

  appState.mealLogs.unshift({
    id: crypto.randomUUID(),
    name,
    items,
    wasteSaved: waste,
    date: new Date().toISOString()
  });

  appState.wasteSaved += waste;
  appState.weeklyProgress.mealsLogged += 1;
  appState.weeklyProgress.expiringUsed += expiringUsed;

  updateAchievements();
  saveState();
  renderAll();
  event.target.reset();
  showAlert('Meal logged successfully.');
}

// Challenges and achievements
function renderChallenges() {
  const grid = document.getElementById('challengesGrid');
  grid.innerHTML = CHALLENGES.map((challenge) => {
    const current = appState.weeklyProgress[challenge.progressKey];
    const percentage = Math.min((current / challenge.target) * 100, 100);
    return `
      <div class="challenge-card">
        <strong>${challenge.title}</strong>
        <div class="dashboard-subtext">${current} / ${challenge.target}</div>
        <div class="challenge-progress">
          <div class="challenge-progress-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function updateAchievements() {
  ACHIEVEMENTS.forEach((achievement) => {
    if (!appState.unlockedAchievements.includes(achievement.id) && achievement.check(appState)) {
      appState.unlockedAchievements.push(achievement.id);
    }
  });
}

function renderAchievements() {
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = ACHIEVEMENTS.map((achievement) => {
    const unlocked = appState.unlockedAchievements.includes(achievement.id);
    return `
      <div class="achievement-card ${unlocked ? 'unlocked' : ''}">
        <i class="fas ${achievement.icon}"></i>
        <strong>${achievement.title}</strong>
        <p class="dashboard-subtext">${achievement.description}</p>
      </div>
    `;
  }).join('');
}

// Stats and dashboard
function renderStats() {
  document.getElementById('pantryCount').textContent = appState.pantryItems.length;
  document.getElementById('mealsLogged').textContent = appState.mealLogs.length;
  document.getElementById('achievementCount').textContent = appState.unlockedAchievements.length;

  const expiring = appState.pantryItems.filter((item) => {
    const days = daysUntil(item.expiry);
    return days >= 0 && days <= 3;
  }).length;
  document.getElementById('expiringCount').textContent = expiring;
}

function renderMealLog() {
  const log = document.getElementById('mealLog');
  if (appState.mealLogs.length === 0) {
    log.innerHTML = '<p class="dashboard-subtext">No meals logged yet.</p>';
    return;
  }

  log.innerHTML = appState.mealLogs.slice(0, 6).map((meal) => {
    return `
      <div class="meal-item">
        <div>
          <strong>${meal.name}</strong>
          <div class="meal-meta">${meal.items.join(', ')}</div>
        </div>
        <div class="meal-meta">${formatDateTime(meal.date)}</div>
        <span class="meal-badge">${meal.wasteSaved.toFixed(1)} kg saved</span>
      </div>
    `;
  }).join('');
}

function renderDashboard() {
  document.getElementById('totalWasteSaved').textContent = `${appState.wasteSaved.toFixed(1)} kg`;
  document.getElementById('wasteSavedValue').textContent = appState.wasteSaved.toFixed(1);

  const progress = Math.min((appState.wasteSaved / 10) * 100, 100);
  document.getElementById('wasteProgress').style.width = `${progress}%`;

  const mostUsed = getMostUsedItem();
  document.getElementById('mostUsedItem').textContent = mostUsed || '-';

  const total = appState.pantryItems.length;
  const notExpired = appState.pantryItems.filter((item) => daysUntil(item.expiry) >= 0).length;
  const health = total ? Math.round((notExpired / total) * 100) : 100;
  document.getElementById('pantryHealth').textContent = `${health}%`;
}

function getMostUsedItem() {
  const counts = {};
  appState.mealLogs.forEach((meal) => {
    meal.items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
  });

  const entries = Object.entries(counts);
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  return formatName(entries[0][0]);
}

// Weekly resets
function ensureWeeklyWindow() {
  const now = new Date();
  if (!appState.weeklyProgress.startDate) {
    appState.weeklyProgress.startDate = now.toISOString();
    return;
  }

  const start = new Date(appState.weeklyProgress.startDate);
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  if (diffDays >= 7) {
    appState.weeklyProgress = {
      startDate: now.toISOString(),
      mealsLogged: 0,
      itemsAdded: 0,
      expiringUsed: 0
    };
  }
}

// Utilities
function daysUntil(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diff = date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatName(name) {
  return name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function showAlert(message) {
  const banner = document.getElementById('alertBanner');
  document.getElementById('alertMessage').textContent = message;
  banner.classList.remove('hidden');
  setTimeout(closeAlert, 3000);
}

function closeAlert() {
  document.getElementById('alertBanner').classList.add('hidden');
}

function setActiveFilter(selector, type) {
  document.querySelectorAll(selector).forEach((btn) => btn.classList.remove('active'));
  if (type === 'all') document.querySelectorAll(selector)[0].classList.add('active');
  if (type === 'expiring') document.querySelectorAll(selector)[1].classList.add('active');
  if (type === 'expired') document.querySelectorAll(selector)[2].classList.add('active');
}

function renderAll() {
  updateAchievements();
  renderStats();
  renderPantry('all');
  renderRecipes();
  renderMealLog();
  renderChallenges();
  renderAchievements();
  renderDashboard();
  saveState();
}

window.addEventListener('DOMContentLoaded', initApp);
