// Storage Keys
const STORAGE_KEYS = {
  FOOTPRINT: "climateFootprint",
  ACTIVITIES: "climateActivities",
  GOALS: "climateGoals",
  CHALLENGES: "climateChallenges",
  BADGES: "climateBadges",
  USER_PROFILE: "climateUserProfile"
};

// Constants
const CARBON_FACTORS = {
  carMiles: 0.404, // kg CO2 per mile
  publicTransport: 0.089, // kg CO2 per trip
  flightHours: 90, // kg CO2 per hour
  bikeTrips: -0.5, // negative = savings
  electricity: 0.385, // kg CO2 per kWh
  naturalGas: 1.9, // kg CO2 per therm
  dietType: {
    "meat-heavy": 7.2,
    "average": 5.5,
    "low-meat": 4.0,
    "vegetarian": 3.5,
    "vegan": 2.5
  }
};

// Default Challenges
const DEFAULT_CHALLENGES = [
  {
    id: 1,
    day: 1,
    title: "Meatless Monday",
    description: "Skip meat today and try plant-based alternatives",
    impact: "2.5 kg CO₂",
    completed: false,
    progress: 0
  },
  {
    id: 2,
    day: 2,
    title: "Bike to Work",
    description: "Leave the car at home and bike/walk instead",
    impact: "5 kg CO₂",
    completed: false,
    progress: 0
  },
  {
    id: 3,
    day: 3,
    title: "Cold Water Wash",
    description: "Wash clothes in cold water instead of hot",
    impact: "1.5 kg CO₂",
    completed: false,
    progress: 0
  },
  {
    id: 4,
    day: 4,
    title: "Lights Out Challenge",
    description: "Turn off lights when not in use all day",
    impact: "1 kg CO₂",
    completed: false,
    progress: 0
  },
  {
    id: 5,
    day: 5,
    title: "Zero Waste Lunch",
    description: "Pack a lunch with zero disposable packaging",
    impact: "0.8 kg CO₂",
    completed: false,
    progress: 0
  }
];

// Default Badges
const DEFAULT_BADGES = [
  { id: 1, name: "First Step", icon: "👣", description: "Log your first activity", unlock: 1, unlocked: false },
  { id: 2, name: "Tree Planter", icon: "🌱", description: "Save 50 kg CO₂", unlock: 50, unlocked: false },
  { id: 3, name: "Carbon Crusher", icon: "💪", description: "Save 200 kg CO₂", unlock: 200, unlocked: false },
  { id: 4, name: "7-Day Warrior", icon: "⚔️", description: "Complete 7-day challenge streak", unlock: 7, unlocked: false },
  { id: 5, name: "Eco Hero", icon: "🦸", description: "Save 500 kg CO₂", unlock: 500, unlocked: false },
  { id: 6, name: "Green Commuter", icon: "🚴", description: "Bike to work 10 times", unlock: 10, unlocked: false },
  { id: 7, name: "Plant-Based Pro", icon: "🥗", description: "Complete 20 meatless days", unlock: 20, unlocked: false },
  { id: 8, name: "Energy Saver", icon: "💡", description: "Reduce energy by 30%", unlock: 30, unlocked: false },
  { id: 9, name: "Water Warrior", icon: "💧", description: "Save 1000 liters of water", unlock: 1000, unlocked: false },
  { id: 10, name: "Waste Warrior", icon: "♻️", description: "Achieve zero waste day 5 times", unlock: 5, unlocked: false },
  { id: 11, name: "Month Master", icon: "📅", description: "Track for full month", unlock: 30, unlocked: false },
  { id: 12, name: "Climate Champion", icon: "🏆", description: "Save 1000 kg CO₂", unlock: 1000, unlocked: false },
  { id: 13, name: "Consistent Creator", icon: "🎯", description: "30-day activity streak", unlock: 30, unlocked: false },
  { id: 14, name: "Goal Getter", icon: "🎖️", description: "Achieve 5 goals", unlock: 5, unlocked: false },
  { id: 15, name: "Climate Legend", icon: "👑", description: "Top 10 leaderboard", unlock: 100, unlocked: false }
];

// Sample Data
let userProfile = {
  name: "Eco Warrior",
  location: "Eco City",
  joinDate: new Date().toISOString(),
  totalCO2Saved: 0,
  currentStreak: 0,
  lastActivityDate: null
};

let sampleActivities = [
  {
    id: 1,
    type: "transport",
    description: "🚴 Biked to work instead of driving",
    impact: 5.2,
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    notes: "Beautiful weather today!"
  },
  {
    id: 2,
    type: "energy",
    description: "💡 Turned off unused lights all day",
    impact: 1.5,
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    notes: "Saved energy before leaving home"
  },
  {
    id: 3,
    type: "food",
    description: "🌱 Ate plant-based meal",
    impact: 2.8,
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    notes: "Amazing vegan lunch!"
  },
  {
    id: 4,
    type: "waste",
    description: "♻️ Recycled properly",
    impact: 1.2,
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    notes: "Sorted all recyclables"
  },
  {
    id: 5,
    type: "transport",
    description: "🚶 Walked instead of taking car",
    impact: 3.5,
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    notes: "Good exercise too"
  }
];

let sampleGoals = [
  {
    id: 1,
    name: "Reduce Transport Emissions",
    category: "transport",
    target: 100,
    progress: 68,
    period: "month",
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
  },
  {
    id: 2,
    name: "Lower Home Energy Use",
    category: "energy",
    target: 50,
    progress: 35,
    period: "month",
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000
  },
  {
    id: 3,
    name: "Reduce Overall Carbon Footprint",
    category: "overall",
    target: 200,
    progress: 158,
    period: "quarter",
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000
  }
];

let sampleLeaderboard = [
  { rank: 1, name: "Alex Green", co2Saved: 1250, activities: 85, badge: "👑" },
  { rank: 2, name: "Jordan Eco", co2Saved: 980, activities: 72, badge: "🥈" },
  { rank: 3, name: "Sam Clean", co2Saved: 750, activities: 58, badge: "🥉" },
  { rank: 4, name: "Casey Nature", co2Saved: 625, activities: 45, badge: "" },
  { rank: 5, name: "Taylor Green", co2Saved: 520, activities: 38, badge: "" }
];

// Initialize
function init() {
  // Load or create user profile
  loadUserProfile();
  
  // Initialize sample data
  if (!getActivities().length) {
    saveActivities(sampleActivities);
  }
  
  if (!getGoals().length) {
    saveGoals(sampleGoals);
  }
  
  if (!getChallenges().length) {
    saveChallenges(DEFAULT_CHALLENGES);
  }
  
  if (!getBadges().length) {
    saveBadges(DEFAULT_BADGES);
  }
  
  // Setup event listeners
  setupEventListeners();
  
  // Render initial content
  updateHeroStats();
  renderDashboard();
  renderChallenges();
  renderActivityLog();
  renderGoals();
  renderLeaderboard();
  renderBadges();
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
  
  // Form submissions
  document.getElementById("carbonCalculatorForm")?.addEventListener("submit", handleCalculatorSubmit);
  document.getElementById("logActivityForm")?.addEventListener("submit", handleLogActivity);
  document.getElementById("setGoalForm")?.addEventListener("submit", handleSetGoal);
  
  // Activity filters
  document.querySelectorAll(".activity-filters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".activity-filters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderActivityLog(btn.dataset.filter);
    });
  });
  
  // Leaderboard filters
  document.querySelectorAll(".leaderboard-filters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".leaderboard-filters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderLeaderboard(btn.dataset.period);
    });
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("active", content.id === `${tabName}-tab`);
  });
}

// Update Hero Stats
function updateHeroStats() {
  const activities = getActivities();
  const totalCO2 = activities.reduce((sum, a) => sum + a.impact, 0);
  const treesEquivalent = Math.round(totalCO2 / 21); // 21kg per tree per year
  const waterSaved = Math.round(totalCO2 * 10); // estimate
  
  document.getElementById("totalCO2Saved").textContent = totalCO2.toFixed(1);
  document.getElementById("treesEquivalent").textContent = treesEquivalent;
  document.getElementById("waterSaved").textContent = waterSaved.toLocaleString();
  document.getElementById("currentStreak").textContent = calculateStreak();
}

// Dashboard
function renderDashboard() {
  const activities = getActivities();
  const goals = getGoals();
  
  // Carbon breakdown by category
  const breakdown = {
    transport: activities.filter(a => a.type === "transport").reduce((s, a) => s + a.impact, 0),
    energy: activities.filter(a => a.type === "energy").reduce((s, a) => s + a.impact, 0),
    food: activities.filter(a => a.type === "food").reduce((s, a) => s + a.impact, 0),
    waste: activities.filter(a => a.type === "waste").reduce((s, a) => s + a.impact, 0)
  };
  
  document.getElementById("transportCO2").textContent = breakdown.transport.toFixed(1) + " kg";
  document.getElementById("energyCO2").textContent = breakdown.energy.toFixed(1) + " kg";
  document.getElementById("foodCO2").textContent = breakdown.food.toFixed(1) + " kg";
  document.getElementById("shoppingCO2").textContent = breakdown.waste.toFixed(1) + " kg";
  
  // Render charts
  renderTrendChart();
  renderBreakdownChart();
  
  // Personalized tips
  renderPersonalizedTips(breakdown);
  
  // Recent activities
  renderRecentActivities();
}

function renderTrendChart() {
  const activities = getActivities();
  const months = [...Array(6)].map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleString("default", { month: "short" });
  });
  
  const monthlyData = months.map((_, i) => {
    const target = new Date();
    target.setMonth(target.getMonth() - (5 - i));
    return activities
      .filter(a => new Date(a.timestamp).getMonth() === target.getMonth())
      .reduce((s, a) => s + a.impact, 0);
  });
  
  const canvas = document.getElementById("trendChart");
  if (canvas && !canvas.chart) {
    canvas.chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: months,
        datasets: [{
          label: "Monthly CO₂ Saved (kg)",
          data: monthlyData,
          borderColor: "#0ea5e9",
          backgroundColor: "rgba(14, 165, 233, 0.1)",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#64748b" },
            grid: { color: "#e2e8f0" }
          },
          x: {
            ticks: { color: "#64748b" },
            grid: { color: "#e2e8f0" }
          }
        }
      }
    });
  }
}

function renderBreakdownChart() {
  const activities = getActivities();
  const breakdown = {
    "Transport": activities.filter(a => a.type === "transport").reduce((s, a) => s + a.impact, 0),
    "Energy": activities.filter(a => a.type === "energy").reduce((s, a) => s + a.impact, 0),
    "Food": activities.filter(a => a.type === "food").reduce((s, a) => s + a.impact, 0),
    "Waste": activities.filter(a => a.type === "waste").reduce((s, a) => s + a.impact, 0)
  };
  
  const canvas = document.getElementById("breakdownChart");
  if (canvas && !canvas.chart) {
    canvas.chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(breakdown),
        datasets: [{
          data: Object.values(breakdown),
          backgroundColor: ["#0ea5e9", "#06b6d4", "#10b981", "#f59e0b"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: { color: "#64748b" }
          }
        }
      }
    });
  }
}

function renderPersonalizedTips(breakdown) {
  const tips = [];
  
  if (breakdown.transport > 20) tips.push({ icon: "🚴", title: "Reduce Transport Emissions", text: "Try biking or public transit more often" });
  if (breakdown.energy > 15) tips.push({ icon: "💡", title: "Save on Energy", text: "Switch to LED lights or use renewable energy" });
  if (breakdown.food > 10) tips.push({ icon: "🌱", title: "Go Plant-Based", text: "One meatless day saves 2-3 kg CO₂" });
  if (breakdown.waste > 5) tips.push({ icon: "♻️", title: "Reduce Waste", text: "Buy less new stuff and recycle properly" });
  
  if (tips.length === 0) tips.push({ icon: "🌟", title: "You're Doing Great!", text: "Keep up your eco-friendly habits!" });
  
  const tipsHtml = tips.map(tip => `
    <div class="tip-item">
      <div class="tip-icon">${tip.icon}</div>
      <div class="tip-content">
        <h4>${tip.title}</h4>
        <p>${tip.text}</p>
      </div>
    </div>
  `).join("");
  
  document.getElementById("personalizedTips").innerHTML = tipsHtml;
}

function renderRecentActivities() {
  const activities = getActivities().slice(0, 5);
  
  const activitiesHtml = activities.map(a => {
    const icons = { transport: "🚗", energy: "⚡", waste: "♻️", food: "🍽️" };
    return `
      <div class="activity-item">
        <div class="activity-info">
          <div class="activity-icon">${icons[a.type] || "✓"}</div>
          <div class="activity-details">
            <h4>${a.description}</h4>
            <p>${new Date(a.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
        <div class="activity-impact">+${a.impact.toFixed(1)} kg</div>
      </div>
    `;
  }).join("");
  
  document.getElementById("recentActivities").innerHTML = activitiesHtml;
}

// Calculator
function handleCalculatorSubmit(e) {
  e.preventDefault();
  
  const carMiles = parseFloat(document.getElementById("carMiles").value) || 0;
  const publicTransport = parseFloat(document.getElementById("publicTransport").value) || 0;
  const flightHours = parseFloat(document.getElementById("flightHours").value) || 0;
  const bikeTrips = parseFloat(document.getElementById("bikeTrips").value) || 0;
  const electricity = parseFloat(document.getElementById("electricity").value) || 0;
  const naturalGas = parseFloat(document.getElementById("naturalGas").value) || 0;
  const renewableEnergy = parseFloat(document.getElementById("renewableEnergy").value) || 0;
  const dietType = document.getElementById("dietType").value;
  
  // Calculate footprint
  let transport = (carMiles * CARBON_FACTORS.carMiles) + (publicTransport * CARBON_FACTORS.publicTransport) + (flightHours * CARBON_FACTORS.flightHours / 12) + (bikeTrips * CARBON_FACTORS.bikeTrips);
  let energy = (electricity * CARBON_FACTORS.electricity * (1 - renewableEnergy / 100)) + (naturalGas * CARBON_FACTORS.naturalGas);
  let food = CARBON_FACTORS.dietType[dietType] * 30;
  let shopping = 2; // minimal estimate
  
  let total = Math.max(0, transport + energy + food + shopping);
  
  const results = `
    <div class="result-grid">
      <div class="result-item">
        <div class="result-label">Transport CO₂</div>
        <div class="result-value">${Math.max(0, transport).toFixed(1)} kg</div>
      </div>
      <div class="result-item">
        <div class="result-label">Energy CO₂</div>
        <div class="result-value">${Math.max(0, energy).toFixed(1)} kg</div>
      </div>
      <div class="result-item">
        <div class="result-label">Food CO₂</div>
        <div class="result-value">${Math.max(0, food).toFixed(1)} kg</div>
      </div>
      <div class="result-item">
        <div class="result-label">Monthly Total</div>
        <div class="result-value">${total.toFixed(1)} kg</div>
      </div>
      <div class="result-item">
        <div class="result-label">Annual Total</div>
        <div class="result-value">${(total * 12).toFixed(0)} kg</div>
      </div>
      <div class="result-item">
        <div class="result-label">Trees to Offset</div>
        <div class="result-value">${Math.round((total * 12) / 21)}</div>
      </div>
    </div>
  `;
  
  document.getElementById("calculatorResults").innerHTML = results;
  showToast("Footprint calculated! See results below.");
}

function resetCalculator() {
  document.getElementById("carbonCalculatorForm").reset();
  document.getElementById("calculatorResults").innerHTML = "";
}

// Challenges
function renderChallenges() {
  const challenges = getChallenges();
  
  const challengesHtml = challenges.map(c => `
    <div class="challenge-card ${c.completed ? 'completed' : ''}">
      <span class="challenge-day">Day ${c.day}</span>
      <h3 class="challenge-title">${c.title}</h3>
      <p class="challenge-description">${c.description}</p>
      <div class="challenge-impact">
        <div class="challenge-impact-icon">⚡</div>
        <div class="challenge-impact-text">
          <strong>Impact: ${c.impact}</strong>
          <small>CO₂ reduction</small>
        </div>
      </div>
      <div class="challenge-progress">
        <div class="challenge-progress-bar">
          <div class="challenge-progress-fill" style="width: ${c.progress * 20}%"></div>
        </div>
        <small>${c.progress * 20}% Complete</small>
      </div>
      <button class="challenge-btn ${c.completed ? 'completed' : ''}" 
              onclick="completeChallenge(${c.id})"
              ${c.completed ? 'disabled' : ''}>
        ${c.completed ? '✓ Completed' : 'Join Challenge'}
      </button>
    </div>
  `).join("");
  
  document.getElementById("challengesGrid").innerHTML = challengesHtml;
  document.getElementById("activeChallengesBadge").textContent = challenges.filter(c => !c.completed).length;
}

function completeChallenge(id) {
  let challenges = getChallenges();
  const challenge = challenges.find(c => c.id === id);
  if (challenge && !challenge.completed) {
    challenge.completed = true;
    challenge.progress = 5;
    saveChallenges(challenges);
    renderChallenges();
    showToast(`🎉 Challenge completed! You saved ${challenge.impact}`);
    updateHeroStats();
  }
}

// Activity Log
function renderActivityLog(filter = "all") {
  const activities = getActivities();
  const filtered = filter === "all" ? activities : activities.filter(a => a.type === filter);
  
  const timelineHtml = filtered.map(a => {
    const icons = { transport: "🚗", energy: "⚡", waste: "♻️", food: "🍽️" };
    const colors = { transport: "#0ea5e9", energy: "#06b6d4", waste: "#10b981", food: "#f59e0b" };
    return `
      <div class="timeline-item" style="border-left-color: ${colors[a.type]}">
        <div class="timeline-icon">${icons[a.type] || "✓"}</div>
        <div class="timeline-content">
          <h3>${a.description}</h3>
          <p>${a.notes || "No notes"}</p>
          <span class="timeline-impact">+${a.impact.toFixed(1)} kg CO₂ saved</span>
        </div>
      </div>
    `;
  }).join("");
  
  document.getElementById("activityTimeline").innerHTML = timelineHtml || "<div class='empty-state'><i class='fas fa-list'></i><h3>No activities yet</h3><p>Start logging your green actions!</p></div>";
}

function openLogActivityModal() {
  document.getElementById("logActivityModal").classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function handleLogActivity(e) {
  e.preventDefault();
  
  const type = document.getElementById("activityType").value;
  const impact = parseFloat(document.getElementById("activityImpact").value) || 1;
  const notes = document.getElementById("activityNotes").value;
  
  const descriptions = {
    transport: "🚲 Used bike/public transport",
    energy: "💡 Turned off unused lights",
    waste: "♻️ Recycled properly",
    food: "🌱 Ate plant-based meal"
  };
  
  const activity = {
    id: Date.now(),
    type,
    description: descriptions[type] || "Green action",
    impact,
    timestamp: Date.now(),
    notes
  };
  
  let activities = getActivities();
  activities.unshift(activity);
  saveActivities(activities);
  
  document.getElementById("logActivityForm").reset();
  closeModal("logActivityModal");
  showToast(`✓ Activity logged! You saved ${impact.toFixed(1)} kg CO₂`);
  
  updateHeroStats();
  renderActivityLog();
  renderDashboard();
}

// Goals
function renderGoals() {
  const goals = getGoals();
  
  const goalsHtml = goals.map(g => `
    <div class="goal-card">
      <div class="goal-header">
        <span class="goal-category">${g.category}</span>
      </div>
      <h3 class="goal-title">${g.name}</h3>
      <p class="goal-period">Target: ${g.target} kg CO₂ | ${g.period}</p>
      <div class="goal-progress-container">
        <div class="goal-progress-label">
          <span>${g.progress} / ${g.target} kg</span>
          <span>${Math.round((g.progress / g.target) * 100)}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${Math.min(100, (g.progress / g.target) * 100)}%"></div>
        </div>
      </div>
      <div class="goal-actions">
        <button class="icon-btn" onclick="editGoal(${g.id})">✎ Edit</button>
        <button class="icon-btn" onclick="deleteGoal(${g.id})">🗑 Delete</button>
      </div>
    </div>
  `).join("");
  
  document.getElementById("goalsGrid").innerHTML = goalsHtml || "<div class='empty-state'><i class='fas fa-bullseye'></i><h3>No goals yet</h3></div>";
}

function openSetGoalModal() {
  document.getElementById("setGoalModal").classList.add("active");
}

function handleSetGoal(e) {
  e.preventDefault();
  
  const goal = {
    id: Date.now(),
    name: document.getElementById("goalName").value,
    category: document.getElementById("goalCategory").value,
    target: parseFloat(document.getElementById("goalTarget").value),
    progress: 0,
    period: document.getElementById("goalPeriod").value,
    createdAt: Date.now()
  };
  
  let goals = getGoals();
  goals.push(goal);
  saveGoals(goals);
  
  document.getElementById("setGoalForm").reset();
  closeModal("setGoalModal");
  showToast("Goal created successfully!");
  
  renderGoals();
}

function deleteGoal(id) {
  let goals = getGoals();
  goals = goals.filter(g => g.id !== id);
  saveGoals(goals);
  renderGoals();
  showToast("Goal deleted");
}

// Leaderboard
function renderLeaderboard(period = "week") {
  const leaderboardHtml = sampleLeaderboard.map(person => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank rank-${person.rank}">${person.rank}</div>
      <div class="leaderboard-user">
        <div class="leaderboard-user-name">${person.name}</div>
        <div class="leaderboard-user-info">${person.activities} activities</div>
      </div>
      <div class="leaderboard-score">${person.co2Saved} kg ${person.badge}</div>
    </div>
  `).join("");
  
  document.getElementById("leaderboardContainer").innerHTML = `<div class="leaderboard-list">${leaderboardHtml}</div>`;
}

// Badges
function renderBadges() {
  const activities = getActivities();
  const totalCO2 = activities.reduce((s, a) => s + a.impact, 0);
  const badges = getBadges();
  
  // Check unlocks
  badges.forEach(badge => {
    if (totalCO2 >= badge.unlock) {
      badge.unlocked = true;
    }
  });
  
  saveBadges(badges);
  
  const unlockedCount = badges.filter(b => b.unlocked).length;
  document.getElementById("unlockedBadges").textContent = unlockedCount;
  document.getElementById("badgeProgress").textContent = Math.round((unlockedCount / badges.length) * 100);
  
  const badgesHtml = badges.map(b => `
    <div class="badge-item ${!b.unlocked ? 'locked' : ''}">
      ${!b.unlocked ? '<div class="lock-icon"><i class="fas fa-lock"></i></div>' : ''}
      <div class="badge-icon">${b.icon}</div>
      <h3 class="badge-name">${b.name}</h3>
      <p class="badge-description">${b.description}</p>
      <div class="badge-progress-small">
        ${b.unlocked ? '<span style="color: #10b981;">✓ Unlocked</span>' : `<span>Unlock at ${b.unlock} kg</span>`}
      </div>
    </div>
  `).join("");
  
  document.getElementById("badgesGrid").innerHTML = badgesHtml;
}

// Storage Functions
function getActivities() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || "[]");
  } catch {
    return [];
  }
}

function saveActivities(activities) {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
}

function getGoals() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS) || "[]");
  } catch {
    return [];
  }
}

function saveGoals(goals) {
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
}

function getChallenges() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHALLENGES) || "[]");
  } catch {
    return [];
  }
}

function saveChallenges(challenges) {
  localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
}

function getBadges() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BADGES) || "[]");
  } catch {
    return [];
  }
}

function saveBadges(badges) {
  localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
}

function loadUserProfile() {
  const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (saved) {
    userProfile = JSON.parse(saved);
  } else {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userProfile));
  }
}

function calculateStreak() {
  const activities = getActivities();
  if (activities.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(currentDate);
    checkDate.setDate(checkDate.getDate() - i);
    
    const hasActivity = activities.some(a => {
      const actDate = new Date(a.timestamp);
      actDate.setHours(0, 0, 0, 0);
      return actDate.getTime() === checkDate.getTime();
    });
    
    if (hasActivity) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}

// Export Report (placeholder)
function exportReport() {
  showToast("Report export feature coming soon!");
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Make functions globally accessible
window.completeChallenge = completeChallenge;
window.openLogActivityModal = openLogActivityModal;
window.closeModal = closeModal;
window.openSetGoalModal = openSetGoalModal;
window.editGoal = (id) => showToast("Edit feature coming soon!");
window.deleteGoal = deleteGoal;
window.exportReport = exportReport;
window.resetCalculator = resetCalculator;

// Initialize on load
document.addEventListener("DOMContentLoaded", init);
