// Smart Recycling Guide & Tracker JavaScript

// ===== DATA STRUCTURES =====
const RECYCLING_DATABASE = {
  // Plastic Items
  'plastic bottle': {
    icon: '🥤',
    recyclable: true,
    category: 'plastic',
    tips: 'Remove cap and rinse thoroughly. Flatten to save space.',
    preparation: 'Rinse with water, remove labels if possible, cap is recyclable in most areas.',
    impact: 'Plastic production uses significant energy. Recycling saves 2/3 of energy vs new plastic.',
    where: 'All curbside programs accept PET bottles (code 1). Check local guidelines.',
    xpReward: 10,
    co2Saved: 0.15
  },
  'plastic bag': {
    icon: '🛍️',
    recyclable: false,
    category: 'plastic',
    tips: 'Do NOT put bags in curbside recycling. They jam sorting machinery.',
    preparation: 'Reuse bags or take to grocery stores for drop-off programs.',
    impact: 'Each plastic bag takes 20 years to decompose. Reuse instead!',
    where: 'Most grocery stores accept plastic bags at customer service counters.',
    xpReward: 5,
    co2Saved: 0.08
  },
  'plastic container': {
    icon: '📦',
    recyclable: true,
    category: 'plastic',
    tips: 'Check #1-7 on bottom for recyclability. Rinse food residue.',
    preparation: 'Rinse clean, remove labels, stack to save space.',
    impact: 'Recycling containers reduces landfill waste by 80%.',
    where: 'Check code on bottom. Most #1-6 accepted, #7 usually not.',
    xpReward: 10,
    co2Saved: 0.12
  },
  'plastic straw': {
    icon: '🥤',
    recyclable: false,
    category: 'plastic',
    tips: 'Use reusable alternatives. Plastic straws often escape recycling.',
    preparation: 'Refuse plastic straws - bring your own or use none.',
    impact: 'Single-use straws are major ocean pollutants.',
    where: 'Most facilities cannot process thin straws - use metal/bamboo alternatives.',
    xpReward: 5,
    co2Saved: 0
  },

  // Metal Items
  'aluminum can': {
    icon: '🥫',
    recyclable: true,
    category: 'metal',
    tips: 'Rinse and crush if desired. Aluminium is infinitely recyclable.',
    preparation: 'Rinse thoroughly. Can be crushed to save space.',
    impact: 'Aluminium recycling saves 95% of energy vs new production.',
    where: 'Accepted in all curbside programs. Separated by magnetic properties.',
    xpReward: 10,
    co2Saved: 0.25
  },
  'steel can': {
    icon: '🥫',
    recyclable: true,
    category: 'metal',
    tips: 'Rinse well. Steel is magnetic and easy to separate.',
    preparation: 'Remove labels, rinse, both ends can be recycled.',
    impact: 'Steel recycling saves 75% energy and reduces emissions.',
    where: 'All curbside programs accept steel cans.',
    xpReward: 10,
    co2Saved: 0.2
  },
  'aluminum foil': {
    icon: '🥘',
    recyclable: true,
    category: 'metal',
    tips: 'Clean off food residue. Form into tight ball (silver dollar size).',
    preparation: 'Clean and form into ball to prevent loss in sorting.',
    impact: 'Foil recycling supports circular economy.',
    where: 'Most programs accept clean foil in curbside. Check locally.',
    xpReward: 8,
    co2Saved: 0.15
  },

  // Paper & Cardboard
  'cardboard box': {
    icon: '📦',
    recyclable: true,
    category: 'paper',
    tips: 'Break down flat and separate boxes. Remove styrofoam and plastic.',
    preparation: 'Flatten boxes, remove all tape, remove packagfing materials.',
    impact: 'Cardboard recycling creates new packaging, reduces trees.',
    where: 'All programs accept cardboard. Break down and bundle.',
    xpReward: 15,
    co2Saved: 0.5
  },
  'newspaper': {
    icon: '📰',
    recyclable: true,
    category: 'paper',
    tips: 'Keep dry. Bundle with twine. Glossy inserts can stay.',
    preparation: 'Keep dry, remove plastic bags, bundle if possible.',
    impact: 'Paper recycling protects forests and saves energy.',
    where: 'Accepted in all curbside programs.',
    xpReward: 10,
    co2Saved: 0.18
  },
  'paper bag': {
    icon: '🛍️',
    recyclable: true,
    category: 'paper',
    tips: 'Remove plastic windows and liners. Place in recycling bin.',
    preparation: 'Remove plastic components, check for contamination.',
    impact: 'Paper bag recycling reduces deforestation.',
    where: 'Most curbside programs accept paper bags.',
    xpReward: 8,
    co2Saved: 0.12
  },

  // Glass
  'glass bottle': {
    icon: '🍾',
    recyclable: true,
    category: 'glass',
    tips: 'Rinse and remove caps. Separate by color if requested.',
    preparation: 'Rinse thoroughly, remove lid and cork.',
    impact: 'Glass is infinitely recyclable, saves sand mining.',
    where: 'Accepted in most curbside programs. Some prefer separate collection.',
    xpReward: 12,
    co2Saved: 0.28
  },
  'glass jar': {
    icon: '🫙',
    recyclable: true,
    category: 'glass',
    tips: 'Remove metal bands and lids. Rinse well.',
    preparation: 'Rinse, remove metal components.',
    impact: 'Glass recycling has 100% reusability rate.',
    where: 'All curbside programs accept glass containers.',
    xpReward: 12,
    co2Saved: 0.25
  },
  'broken glass': {
    icon: '🔨',
    recyclable: false,
    category: 'glass',
    tips: 'Wrap in newspaper and label. Very unsafe for sorters.',
    preparation: 'Wrap securely and label "BROKEN GLASS".',
    impact: 'Broken glass hazardous to workers, handle separately.',
    where: 'Wrap and place in regular trash or hazardous waste collection.',
    xpReward: 0,
    co2Saved: 0
  },

  // Electronics
  'old phone': {
    icon: '📱',
    recyclable: true,
    category: 'electronics',
    tips: 'Take to manufacturer or e-waste recycler. Contains valuable metals.',
    preparation: 'Erase data, remove battery if possible.',
    impact: 'E-waste contains gold, copper, rare earth elements.',
    where: 'Take to manufacturer programs, e-waste recyclers, or retailers.',
    xpReward: 25,
    co2Saved: 1.5
  },
  'laptop': {
    icon: '💻',
    recyclable: true,
    category: 'electronics',
    tips: 'Wipe hard drive. Take specialized e-waste facility.',
    preparation: 'Secure hard drive destruction before recycling.',
    impact: 'Laptops contain 60+ elements, highly valuable to recover.',
    where: 'Take to Best Buy, manufacturer, or certified e-waste recycler.',
    xpReward: 30,
    co2Saved: 2
  },
  'light bulb': {
    icon: '💡',
    recyclable: true,
    category: 'electronics',
    tips: 'LED/CFL bulbs contain mercury - do NOT throw in trash.',
    preparation: 'Handle carefully, keep intact if possible.',
    impact: 'Mercury recovery is critical - prevents water contamination.',
    where: 'Take to hardware stores (Home Depot, Lowe\'s) or hazmat facility.',
    xpReward: 8,
    co2Saved: 0.1
  },

  // Textiles
  'old clothes': {
    icon: '👕',
    recyclable: true,
    category: 'textiles',
    tips: 'Donate to charities first. Recycling is last resort.',
    preparation: 'Clean and in good condition for donation.',
    impact: 'Textile production is water-intensive, reuse is best option.',
    where: 'Goodwill, Salvation Army, textile recyclers, or specialized programs.',
    xpReward: 15,
    co2Saved: 3
  },
  'old shoes': {
    icon: '👟',
    recyclable: true,
    category: 'textiles',
    tips: 'Donate or look for shoe-specific recycling programs.',
    preparation: 'Clean, in reasonable condition.',
    impact: 'Shoe production requires lots of water and chemicals.',
    where: 'Nike Reuse-A-Shoe, Soles4Souls, or textile recyclers.',
    xpReward: 15,
    co2Saved: 2
  }
};

// Challenges Data
const CHALLENGES = [
  {
    id: 1,
    name: 'Recycling Rockstar',
    description: 'Recycle 10 items in a single day',
    difficulty: 'Easy',
    target: 10,
    reward: 50,
    icon: '⭐'
  },
  {
    id: 2,
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day recycling streak',
    difficulty: 'Medium',
    target: 7,
    reward: 100,
    icon: '💪'
  },
  {
    id: 3,
    name: 'Platinum Planet',
    description: 'Recycle 100 items total',
    difficulty: 'Hard',
    target: 100,
    reward: 250,
    icon: '🌍'
  },
  {
    id: 4,
    name: 'Plastic Protector',
    description: 'Recycle 15 plastic items',
    difficulty: 'Medium',
    target: 15,
    reward: 80,
    icon: '🛡️'
  },
  {
    id: 5,
    name: 'Metal Master',
    description: 'Recycle 10 metal items',
    difficulty: 'Easy',
    target: 10,
    reward: 60,
    icon: '⚙️'
  }
];

// Achievements Data
const ACHIEVEMENTS = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Log your first recycling item',
    icon: '🌱',
    condition: (stats) => stats.totalItems >= 1
  },
  {
    id: 2,
    name: 'Eco Enthusiast',
    description: 'Recycle 25 items',
    icon: '🌿',
    condition: (stats) => stats.totalItems >= 25
  },
  {
    id: 3,
    name: 'Planet Guardian',
    description: 'Recycle 50 items',
    icon: '🌍',
    condition: (stats) => stats.totalItems >= 50
  },
  {
    id: 4,
    name: 'Perfect Week',
    description: 'Maintain a 7-day recycling streak',
    icon: '📅',
    condition: (stats) => stats.currentStreak >= 7
  },
  {
    id: 5,
    name: 'Carbon Warrior',
    description: 'Save 5kg of CO₂ equivalent',
    icon: '♻️',
    condition: (stats) => stats.co2Saved >= 5
  },
  {
    id: 6,
    name: 'Variety Champion',
    description: 'Recycle items from 5 different categories',
    icon: '🎯',
    condition: (stats) => stats.categoriesRecycled >= 5
  }
];

// Recycling Tips
const TIPS = [
  {
    title: 'Rinse Before Recycling',
    description: 'Always rinse containers to prevent contamination and pests.',
    icon: '💧'
  },
  {
    title: 'Remove Plastic from Paper',
    description: 'Separate plastic windows and components from paper products.',
    icon: '✂️'
  },
  {
    title: 'Know Your Codes',
    description: 'Learn the #1-7 plastic codes on containers to know what\'s recyclable.',
    icon: '🔢'
  },
  {
    title: 'Avoid Bagging',
    description: 'Don\'t put items in plastic bags - they jam sorting equipment.',
    icon: '🚫'
  },
  {
    title: 'Flatten Boxes',
    description: 'Break down cardboard to save space and make collection easier.',
    icon: '📦'
  },
  {
    title: 'Donate First',
    description: 'Donate clothes and electronics before recycling when possible.',
    icon: '💝'
  }
];

// ===== STATE MANAGEMENT =====
let userState = {
  level: 1,
  xp: 0,
  totalXP: 0,
  itemsRecycled: 0,
  activities: [],
  unlockedAchievements: [],
  currentStreak: 0,
  lastRecycleDate: null,
  co2Saved: 0,
  categoriesRecycled: new Set(),
  challengeProgress: {}
};

const LEVEL_XP_REQUIREMENTS = [100, 250, 450, 700, 1000];
const TITLES = [
  'Recycling Rookie',
  'Eco Enthusiast',
  'Green Guardian',
  'Environmental Expert',
  'Planetary Champion'
];

// ===== INITIALIZATION =====
function initializeApp() {
  loadStateFromStorage();
  renderUI();
  setupEventListeners();
}

function loadStateFromStorage() {
  const saved = localStorage.getItem('recyclingAppState');
  if (saved) {
    const parsed = JSON.parse(saved);
    userState = {
      ...userState,
      ...parsed,
      categoriesRecycled: new Set(parsed.categoriesRecycled || [])
    };
  }
}

function saveStateToStorage() {
  const toSave = {
    ...userState,
    categoriesRecycled: Array.from(userState.categoriesRecycled)
  };
  localStorage.setItem('recyclingAppState', JSON.stringify(toSave));
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('focus', showSearchResults);
  document.addEventListener('click', handleSearchClickOutside);
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(event) {
  const query = event.target.value.trim().toLowerCase();
  const clearBtn = document.getElementById('clearBtn');
  
  if (query) {
    clearBtn.style.display = 'block';
    showSearchResults();
  } else {
    clearBtn.style.display = 'none';
    hideSearchResults();
  }
}

function showSearchResults() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) return;

  const results = Object.keys(RECYCLING_DATABASE).filter(item =>
    item.toLowerCase().includes(query)
  );

  const resultsContainer = document.getElementById('searchResults');
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-light);">
        No items found. Try searching for: plastic bottle, aluminum can, etc.
      </div>
    `;
  } else {
    resultsContainer.innerHTML = results.map(item => `
      <div class="search-result-item" onclick="selectSearchResult('${item}')">
        <div class="search-result-icon">${RECYCLING_DATABASE[item].icon}</div>
        <div class="search-result-text">
          <h4>${capitalizeWords(item)}</h4>
          <p>${RECYCLING_DATABASE[item].recyclable ? '✅ Recyclable' : '❌ Not Recyclable'}</p>
        </div>
      </div>
    `).join('');
  }

  resultsContainer.classList.remove('hidden');
}

function hideSearchResults() {
  document.getElementById('searchResults').classList.add('hidden');
}

function handleSearchClickOutside(event) {
  const searchContainer = document.querySelector('.search-container');
  if (!searchContainer.contains(event.target)) {
    hideSearchResults();
  }
}

function selectSearchResult(itemKey) {
  showItemDetail(itemKey);
  hideSearchResults();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearBtn').style.display = 'none';
  hideSearchResults();
}

function searchCategory(category) {
  const items = Object.keys(RECYCLING_DATABASE).filter(
    item => RECYCLING_DATABASE[item].category === category
  );

  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = items.map(item => `
    <div class="search-result-item" onclick="selectSearchResult('${item}')">
      <div class="search-result-icon">${RECYCLING_DATABASE[item].icon}</div>
      <div class="search-result-text">
        <h4>${capitalizeWords(item)}</h4>
        <p>${RECYCLING_DATABASE[item].recyclable ? '✅ Recyclable' : '❌ Not Recyclable'}</p>
      </div>
    </div>
  `).join('');

  resultsContainer.classList.remove('hidden');
  document.getElementById('searchInput').focus();
  document.getElementById('searchInput').value = '';
}

// ===== ITEM DETAIL MODAL =====
function showItemDetail(itemKey) {
  const item = RECYCLING_DATABASE[itemKey];
  if (!item) return;

  const section = document.getElementById('itemDetailSection');
  
  document.getElementById('itemIcon').textContent = item.icon;
  document.getElementById('itemName').textContent = capitalizeWords(itemKey);
  
  const badge = document.getElementById('recyclabilityBadge');
  const badgeClass = item.recyclable ? 'recyclable' : 'not-recyclable';
  badge.className = `recyclability-badge ${badgeClass}`;
  badge.textContent = item.recyclable ? '✅ Recyclable' : '❌ Not Recyclable';
  
  document.getElementById('itemTips').textContent = item.tips;
  document.getElementById('itemPreparation').textContent = item.preparation;
  document.getElementById('itemImpact').textContent = item.impact;
  document.getElementById('itemWhere').textContent = item.where;
  
  // Store current item for logging
  window.currentSelectedItem = itemKey;
  
  section.classList.remove('hidden');
}

function closeItemDetail() {
  document.getElementById('itemDetailSection').classList.add('hidden');
  window.currentSelectedItem = null;
}

// ===== ACTIVITY LOGGING =====
function logRecyclingActivity() {
  const itemKey = window.currentSelectedItem;
  if (!itemKey) return;

  const item = RECYCLING_DATABASE[itemKey];
  const now = new Date();

  // Update user state
  userState.itemsRecycled++;
  userState.totalXP += item.xpReward;
  userState.xp += item.xpReward;
  userState.co2Saved += item.co2Saved;
  userState.categoriesRecycled.add(item.category);

  // Update streak
  const today = now.toDateString();
  if (userState.lastRecycleDate !== today) {
    const lastDate = userState.lastRecycleDate ? new Date(userState.lastRecycleDate) : null;
    if (lastDate) {
      const diffTime = Math.abs(now - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      userState.currentStreak = diffDays === 1 ? userState.currentStreak + 1 : 1;
    } else {
      userState.currentStreak = 1;
    }
    userState.lastRecycleDate = today;
  }

  // Check level up
  checkLevelUp();

  // Add activity
  userState.activities.push({
    itemKey: itemKey,
    itemName: capitalizeWords(itemKey),
    timestamp: now.toISOString(),
    xpEarned: item.xpReward
  });

  // Update challenge progress
  updateChallengeProgress();

  // Check achievements
  updateAchievements();

  // Save and update UI
  saveStateToStorage();
  renderUI();
  closeItemDetail();

  // Show success message
  showAlert(`Great! You recycled a ${capitalizeWords(itemKey)}! +${item.xpReward} XP`);
}

function checkLevelUp() {
  while (userState.xp >= LEVEL_XP_REQUIREMENTS[userState.level - 1]) {
    userState.xp -= LEVEL_XP_REQUIREMENTS[userState.level - 1];
    userState.level = Math.min(userState.level + 1, TITLES.length);
  }
}

function updateChallengeProgress() {
  // Update daily activity count
  const today = new Date().toDateString();
  const today_key = `today_${today}`;
  if (!userState.challengeProgress[today_key]) {
    userState.challengeProgress[today_key] = 0;
  }
  userState.challengeProgress[today_key]++;
}

function updateAchievements() {
  const stats = {
    totalItems: userState.itemsRecycled,
    currentStreak: userState.currentStreak,
    co2Saved: userState.co2Saved,
    categoriesRecycled: userState.categoriesRecycled.size
  };

  ACHIEVEMENTS.forEach(achievement => {
    if (!userState.unlockedAchievements.includes(achievement.id)) {
      if (achievement.condition(stats)) {
        userState.unlockedAchievements.push(achievement.id);
        showAlert(`🎉 Achievement Unlocked: ${achievement.name}!`);
      }
    }
  });
}

// ===== FILTERING =====
function filterActivities(filter) {
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  renderActivityLog(filter);
}

function getFilteredActivities(filter) {
  const now = new Date();
  let filtered = userState.activities;

  if (filter === 'today') {
    const today = now.toDateString();
    filtered = filtered.filter(a => new Date(a.timestamp).toDateString() === today);
  } else if (filter === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(a => new Date(a.timestamp) >= weekAgo);
  } else if (filter === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(a => new Date(a.timestamp) >= monthAgo);
  }

  return filtered.reverse();
}

// ===== RENDERING UI =====
function renderUI() {
  renderProfile();
  renderStats();
  renderChallenges();
  renderAchievements();
  renderActivityLog('all');
  renderTips();
  renderLeaderboard();
}

function renderProfile() {
  const title = TITLES[Math.min(userState.level - 1, TITLES.length - 1)];
  document.getElementById('userLevel').textContent = userState.level;
  document.getElementById('userTitle').textContent = title;
  document.getElementById('itemsRecycled').textContent = userState.itemsRecycled;

  // XP bar
  const totalXpForLevel = LEVEL_XP_REQUIREMENTS[userState.level - 1] || 1000;
  const percentage = (userState.xp / totalXpForLevel) * 100;
  document.getElementById('xpFill').style.width = percentage + '%';
  document.getElementById('xpText').textContent = `${userState.xp} / ${totalXpForLevel} XP`;
}

function renderStats() {
  document.getElementById('totalRecycled').textContent = userState.itemsRecycled;
  document.getElementById('currentStreak').textContent = userState.currentStreak;
  document.getElementById('co2Saved').textContent = userState.co2Saved.toFixed(1);
  document.getElementById('achievementCount').textContent = userState.unlockedAchievements.length;
}

function renderChallenges() {
  const grid = document.getElementById('challengesGrid');
  const today = new Date().toDateString();
  const today_key = `today_${today}`;
  const todayCount = userState.challengeProgress[today_key] || 0;

  grid.innerHTML = CHALLENGES.map(challenge => {
    let progress = 0;
    if (challenge.id === 1) progress = Math.min(todayCount, challenge.target);
    else if (challenge.id === 2) progress = Math.min(userState.currentStreak, challenge.target);
    else if (challenge.id === 3) progress = Math.min(userState.itemsRecycled, challenge.target);
    else if (challenge.id === 4) {
      const plasticItems = userState.activities.filter(a => 
        RECYCLING_DATABASE[a.itemKey]?.category === 'plastic'
      ).length;
      progress = Math.min(plasticItems, challenge.target);
    } else if (challenge.id === 5) {
      const metalItems = userState.activities.filter(a => 
        RECYCLING_DATABASE[a.itemKey]?.category === 'metal'
      ).length;
      progress = Math.min(metalItems, challenge.target);
    }

    const completed = progress >= challenge.target;

    return `
      <div class="challenge-card">
        <div class="challenge-header">
          <div>
            <h3>${challenge.icon} ${challenge.name}</h3>
            <p class="challenge-description">${challenge.description}</p>
          </div>
          <span class="challenge-difficulty">${challenge.difficulty}</span>
        </div>
        <div class="challenge-reward">
          <i class="fas fa-star"></i>
          <span class="challenge-reward-text">+${challenge.reward} XP</span>
        </div>
        <div class="challenge-progress">
          <div class="challenge-progress-label">
            <span>Progress</span>
            <span>${progress} / ${challenge.target}</span>
          </div>
          <div class="challenge-progress-bar">
            <div class="challenge-progress-fill" style="width: ${(progress / challenge.target) * 100}%"></div>
          </div>
        </div>
        <button class="challenge-action-btn" ${completed ? 'disabled' : 'disabled'}>
          ${completed ? '✅ Completed!' : 'In Progress...'}
        </button>
      </div>
    `;
  }).join('');
}

function renderAchievements() {
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = ACHIEVEMENTS.map(achievement => {
    const unlocked = userState.unlockedAchievements.includes(achievement.id);
    return `
      <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-description">${achievement.description}</div>
        <div class="achievement-progress">${unlocked ? '🔓 Unlocked' : '🔒 Locked'}</div>
      </div>
    `;
  }).join('');
}

function renderActivityLog(filter = 'all') {
  const logContainer = document.getElementById('activityLog');
  const activities = getFilteredActivities(filter);

  if (activities.length === 0) {
    logContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>No recycling activities yet. Start logging to track your impact!</p>
      </div>
    `;
    return;
  }

  logContainer.innerHTML = activities.map(activity => {
    const item = RECYCLING_DATABASE[activity.itemKey];
    const date = new Date(activity.timestamp);
    const timeString = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div class="activity-item">
        <div class="activity-icon">${item.icon}</div>
        <div class="activity-details">
          <div class="activity-item-name">${activity.itemName}</div>
          <div class="activity-timestamp">${timeString}</div>
        </div>
        <div class="activity-xp">+${activity.xpEarned} XP</div>
      </div>
    `;
  }).join('');
}

function renderTips() {
  const grid = document.getElementById('tipsGrid');
  grid.innerHTML = TIPS.map(tip => `
    <div class="tip-card">
      <h3><i class="fas fa-lightbulb"></i> ${tip.title}</h3>
      <p>${tip.description}</p>
    </div>
  `).join('');
}

function renderLeaderboard() {
  const uniqueDays = new Set(userState.activities.map(a => new Date(a.timestamp).toDateString()));
  
  let mostRecycled = '-';
  if (userState.activities.length > 0) {
    const itemCounts = {};
    userState.activities.forEach(a => {
      itemCounts[a.itemKey] = (itemCounts[a.itemKey] || 0) + 1;
    });
    mostRecycled = capitalizeWords(Object.keys(itemCounts).reduce((a, b) => 
      itemCounts[a] > itemCounts[b] ? a : b
    ));
  }

  document.getElementById('totalItems').textContent = userState.itemsRecycled;
  document.getElementById('totalDays').textContent = uniqueDays.size;
  document.getElementById('mostRecycled').textContent = mostRecycled;
  document.getElementById('totalXP').textContent = userState.totalXP;
}

// ===== UTILITIES =====
function capitalizeWords(str) {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
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

// ===== INITIALIZE ON PAGE LOAD =====
window.addEventListener('DOMContentLoaded', initializeApp);
