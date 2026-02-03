// Storage Keys
const STORAGE_KEYS = {
  ECO_SCORE: "ecoScore",
  CATEGORIES: "ecoCategories",
  HABITS: "ecoHabits",
  CHALLENGES: "ecoChallenges",
  BADGES: "ecoBadges",
  USER_PROFILE: "ecoUserProfile"
};

// User Profile
let userProfile = {
  name: "Eco Advocate",
  joinDate: new Date(2023, 8, 15),
  communityRank: 142,
  daysStreak: 23
};

// Score Categories Data
const CATEGORIES_DATA = {
  lifestyle: {
    name: "Lifestyle",
    icon: "🏠",
    description: "Your daily eco-friendly practices",
    score: 85,
    habits: 8,
    streak: 12,
    impact: 250,
    tips: [
      "Buy secondhand clothes and furniture",
      "Use reusable water bottles and containers",
      "Reduce single-use plastic consumption",
      "Support local eco-friendly businesses",
      "Switch to eco-friendly cleaning products"
    ]
  },
  consumption: {
    name: "Consumption",
    icon: "🛍️",
    description: "Your purchasing habits",
    score: 72,
    habits: 5,
    streak: 8,
    impact: 180,
    tips: [
      "Buy only what you need",
      "Choose products with minimal packaging",
      "Support sustainable brands",
      "Repair items instead of replacing",
      "Participate in swap communities"
    ]
  },
  energy: {
    name: "Energy",
    icon: "⚡",
    description: "Your home energy efficiency",
    score: 88,
    habits: 6,
    streak: 15,
    impact: 320,
    tips: [
      "Switch to LED bulbs",
      "Use smart thermostats",
      "Unplug devices when not in use",
      "Switch to renewable energy provider",
      "Improve home insulation"
    ]
  },
  waste: {
    name: "Waste",
    icon: "♻️",
    description: "Your waste reduction efforts",
    score: 75,
    habits: 7,
    streak: 10,
    impact: 200,
    tips: [
      "Start composting at home",
      "Reduce food waste through meal planning",
      "Properly sort recyclables",
      "Use reusable bags for shopping",
      "Avoid single-use plastics"
    ]
  },
  transport: {
    name: "Transport",
    icon: "🚴",
    description: "Your transportation choices",
    score: 78,
    habits: 6,
    streak: 11,
    impact: 290,
    tips: [
      "Use public transportation",
      "Bike or walk for short trips",
      "Carpool with colleagues",
      "Use electric vehicles when possible",
      "Offset carbon from flights"
    ]
  },
  food: {
    name: "Food",
    icon: "🌱",
    description: "Your dietary choices",
    score: 82,
    habits: 7,
    streak: 14,
    impact: 270,
    tips: [
      "Eat more plant-based meals",
      "Buy local and seasonal produce",
      "Reduce food waste",
      "Support organic farmers",
      "Choose sustainable seafood"
    ]
  }
};

// Sample Habits
const SAMPLE_HABITS = [
  { id: 1, name: "Use reusable shopping bags", category: "consumption", frequency: "daily", streak: 45, active: true },
  { id: 2, name: "Bike to work", category: "transport", frequency: "daily", streak: 28, active: true },
  { id: 3, name: "Turn off lights", category: "energy", frequency: "daily", streak: 60, active: true },
  { id: 4, name: "Compost food waste", category: "waste", frequency: "daily", streak: 32, active: true },
  { id: 5, name: "Buy organic produce", category: "food", frequency: "weekly", streak: 12, active: true },
  { id: 6, name: "Cold shower day", category: "energy", frequency: "weekly", streak: 8, active: true },
  { id: 7, name: "Meatless Monday", category: "food", frequency: "weekly", streak: 15, active: true }
];

// Sample Challenges
const SAMPLE_CHALLENGES = [
  {
    id: 1,
    name: "Zero Waste Week",
    category: "waste",
    duration: 7,
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    completed: false,
    progress: 65,
    impact: 50,
    description: "Try to produce zero waste for 7 days"
  },
  {
    id: 2,
    name: "Energy Saver Challenge",
    category: "energy",
    duration: 14,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    completed: false,
    progress: 35,
    impact: 75,
    description: "Reduce energy consumption by 30%"
  },
  {
    id: 3,
    name: "Plant-Based Week",
    category: "food",
    duration: 7,
    startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    completed: true,
    progress: 100,
    impact: 40,
    description: "Eat only plant-based meals for a week"
  },
  {
    id: 4,
    name: "No Single-Use Plastic",
    category: "consumption",
    duration: 14,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completed: false,
    progress: 50,
    impact: 60,
    description: "Avoid all single-use plastic for 2 weeks"
  },
  {
    id: 5,
    name: "Active Transportation",
    category: "transport",
    duration: 30,
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    completed: false,
    progress: 32,
    impact: 100,
    description: "Use active transport for 30 days"
  }
];

// Sample Badges
const SAMPLE_BADGES = [
  { id: 1, name: "Eco Starter", icon: "🌱", description: "Join the Eco Score platform", unlocked: true },
  { id: 2, name: "Green Day", icon: "📗", description: "Score 50+ in a day", unlocked: true },
  { id: 3, name: "Carbon Crusader", icon: "🌍", description: "Save 100kg CO₂", unlocked: true },
  { id: 4, name: "7-Day Streak", icon: "🔥", description: "Maintain 7-day streak", unlocked: true },
  { id: 5, name: "Category Champion", icon: "🏆", description: "Score 90+ in one category", unlocked: true },
  { id: 6, name: "Habit Master", icon: "⭐", description: "Create 10 habits", unlocked: true },
  { id: 7, name: "Challenge Complete", icon: "✅", description: "Complete 5 challenges", unlocked: true },
  { id: 8, name: "Community Hero", icon: "🦸", description: "Top 100 leaderboard", unlocked: true },
  { id: 9, name: "Eco Legend", icon: "👑", description: "Score 100+", unlocked: false },
  { id: 10, name: "30-Day Warrior", icon: "💪", description: "30-day streak", unlocked: false },
  { id: 11, name: "Sustainability Master", icon: "🎓", description: "100+ score in all categories", unlocked: false },
  { id: 12, name: "Global Impact", icon: "🌐", description: "Offset 1000kg CO₂", unlocked: false },
  { id: 13, name: "Zero Waste", icon: "♻️", description: "Complete Zero Waste challenge", unlocked: false },
  { id: 14, name: "Green Commuter", icon: "🚴", description: "Transport score 95+", unlocked: false },
  { id: 15, name: "Planet Protector", icon: "🛡️", description: "Overall score 85+", unlocked: true }
];

// Sample Leaderboard
const SAMPLE_LEADERBOARD = {
  week: [
    { rank: 1, name: "Green Guardian", score: 485, badge: "🥇", impact: 250 },
    { rank: 2, name: "Eco Champion", score: 468, badge: "🥈", impact: 240 },
    { rank: 3, name: "Nature Protector", score: 445, badge: "🥉", impact: 220 },
    { rank: 4, name: "Sustainable Sage", score: 412, badge: "", impact: 200 }
  ],
  month: [
    { rank: 1, name: "Green Guardian", score: 1850, badge: "🥇", impact: 950 },
    { rank: 2, name: "Eco Champion", score: 1720, badge: "🥈", impact: 880 },
    { rank: 3, name: "Sustainability Guru", score: 1650, badge: "🥉", impact: 840 },
    { rank: 4, name: "Nature Protector", score: 1520, badge: "", impact: 750 }
  ],
  alltime: [
    { rank: 1, name: "Green Guardian", score: 12450, badge: "🥇", impact: 6200 },
    { rank: 2, name: "Eco Champion", score: 10850, badge: "🥈", impact: 5450 },
    { rank: 3, name: "Environmental Hero", score: 9720, badge: "🥉", impact: 4900 },
    { rank: 4, name: "Sustainability Guru", score: 8950, badge: "", impact: 4500 }
  ]
};

// Initialize
function init() {
  loadOrCreateData();
  setupEventListeners();
  setupTabNavigation();
  
  renderOverview();
  updateScoreCircle();
  renderRecommendations();
}

function loadOrCreateData() {
  // Load habits
  if (!localStorage.getItem(STORAGE_KEYS.HABITS)) {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(SAMPLE_HABITS));
  }
  
  // Load challenges
  if (!localStorage.getItem(STORAGE_KEYS.CHALLENGES)) {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(SAMPLE_CHALLENGES));
  }
  
  // Load badges
  if (!localStorage.getItem(STORAGE_KEYS.BADGES)) {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(SAMPLE_BADGES));
  }
  
  // Load user profile
  if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userProfile));
  }
  
  document.getElementById("userName").textContent = userProfile.name;
}

function setupEventListeners() {
  document.getElementById("exportBtn").addEventListener("click", exportReport);
  document.getElementById("newChallengeBtn").addEventListener("click", openAddChallengeModal);
  
  document.getElementById("addChallengeForm").addEventListener("submit", handleAddChallenge);
  document.getElementById("editHabitForm").addEventListener("submit", handleEditHabit);
  
  // Category selection
  document.addEventListener("click", (e) => {
    if (e.target.closest(".category-card")) {
      const categoryId = e.target.closest(".category-card").dataset.category;
      renderCategoryDetails(categoryId);
    }
  });
  
  // Challenge filters
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderChallenges(e.target.dataset.filter);
    });
  });
  
  // Leaderboard tabs
  document.querySelectorAll(".leaderboard-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".leaderboard-tab").forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");
      renderLeaderboard(e.target.dataset.period);
    });
  });
  
  // Challenge completion
  document.addEventListener("click", (e) => {
    if (e.target.closest(".challenge-btn-primary")) {
      const challengeId = e.target.closest(".challenge-card").dataset.challengeId;
      completeChallenge(parseInt(challengeId));
    }
  });
}

function setupTabNavigation() {
  document.querySelectorAll(".tab-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = e.target.dataset.tab;
      
      document.querySelectorAll(".tab-link").forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");
      
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      document.getElementById(tabName).classList.add("active");
      
      if (tabName === "categories") renderCategoriesTab();
      if (tabName === "challenges") renderChallenges();
      if (tabName === "community") renderCommunity();
      if (tabName === "badges") renderBadgesTab();
    });
  });
}

// Overview Tab
function renderOverview() {
  const habits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS) || "[]");
  const challenges = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHALLENGES) || "[]");
  
  document.getElementById("habitCount").textContent = habits.length;
  document.getElementById("co2Saved").textContent = "45 kg";
  document.getElementById("waterSaved").textContent = "380 L";
  document.getElementById("wasteReduced").textContent = "12 kg";
  document.getElementById("challengesComplete").textContent = 
    `${challenges.filter(c => c.completed).length}/${challenges.length}`;
  document.getElementById("communityImpact").textContent = "142 pts";
  
  renderBreakdownChart();
  renderProgressChart();
}

function updateScoreCircle() {
  const score = 78;
  const circumference = 2 * Math.PI * 115;
  const offset = circumference - (score / 100) * circumference;
  
  const ring = document.getElementById("scoreRing");
  if (ring) {
    ring.style.strokeDashoffset = offset;
  }
  
  document.getElementById("ecoScore").textContent = score;
  document.getElementById("scoreDescription").textContent = 
    score >= 75 ? "Your sustainability practices put you in the top 25% of our community." :
    score >= 50 ? "You're doing well! Keep improving your eco habits." :
    "You've started your sustainability journey. Keep going!";
}

function renderRecommendations() {
  const recommendations = [
    { title: "Switch to renewable energy", impact: "Save 50kg CO₂/month" },
    { title: "Reduce food waste by planning meals", impact: "Save 10kg waste/week" },
    { title: "Use public transit 3x/week", impact: "Save 25kg CO₂/week" },
    { title: "Buy seasonal, local produce", impact: "Support local economy" }
  ];
  
  const html = recommendations.map(r => `
    <div class="recommendation-item">
      <strong>${r.title}</strong>
      <p>${r.impact}</p>
    </div>
  `).join("");
  
  document.getElementById("topRecommendations").innerHTML = html;
}

function renderBreakdownChart() {
  const categories = Object.values(CATEGORIES_DATA);
  const canvas = document.getElementById("breakdownChart");
  
  if (!canvas || canvas.chart) return;
  
  canvas.chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: categories.map(c => c.name),
      datasets: [{
        data: categories.map(c => c.score),
        backgroundColor: ["#10b981", "#06b6d4", "#f59e0b", "#8b5cf6", "#ec4899", "#0ea5e9"],
        borderColor: white,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { padding: 15, font: { size: 12 } }
        }
      }
    }
  });
}

function renderProgressChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const scores = [45, 52, 58, 65, 72, 78];
  const canvas = document.getElementById("progressChart");
  
  if (!canvas || canvas.chart) return;
  
  canvas.chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "Eco Score",
        data: scores,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#10b981"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, max: 100, ticks: { color: "#64748b" }, grid: { color: "#e2e8f0" } },
        x: { ticks: { color: "#64748b" }, grid: { color: "#e2e8f0" } }
      }
    }
  });
}

// Categories Tab
function renderCategoriesTab() {
  const categories = Object.entries(CATEGORIES_DATA);
  const html = categories.map(([key, cat]) => `
    <div class="category-card ${key === 'lifestyle' ? 'active' : ''}" data-category="${key}">
      <div class="category-icon">${cat.icon}</div>
      <div class="category-name">${cat.name}</div>
      <div class="category-score">${cat.score}</div>
    </div>
  `).join("");
  
  document.getElementById("categoriesGrid").innerHTML = html;
  renderCategoryDetails("lifestyle");
}

function renderCategoryDetails(categoryId) {
  const cat = CATEGORIES_DATA[categoryId];
  if (!cat) return;
  
  document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
  document.querySelector(`[data-category="${categoryId}"]`).classList.add("active");
  
  document.getElementById("selectedCategoryTitle").textContent = cat.name;
  document.getElementById("categoryScore").textContent = cat.score;
  document.getElementById("categoryHabits").textContent = cat.habits;
  document.getElementById("categoryStreak").textContent = cat.streak;
  document.getElementById("categoryImpact").textContent = cat.impact;
  
  // Habits
  const habits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS) || "[]")
    .filter(h => h.category === categoryId);
  
  const habitsHtml = habits.map(h => `
    <div class="habit-item">
      <strong>${h.name}</strong>
      <span style="color: #10b981; font-weight: 600;">🔥 ${h.streak}</span>
      <div class="habit-actions">
        <button class="habit-btn" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="habit-btn" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");
  
  document.getElementById("categoryHabitsList").innerHTML = habitsHtml;
  
  // Tips
  const tipsHtml = cat.tips.map(tip => `
    <div class="tip-item">
      <i class="fas fa-lightbulb"></i>
      <span>${tip}</span>
    </div>
  `).join("");
  
  document.getElementById("categoryTipsList").innerHTML = tipsHtml;
}

// Challenges Tab
function renderChallenges(filter = "all") {
  const challenges = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHALLENGES) || "[]");
  let filtered = challenges;
  
  if (filter === "active") filtered = challenges.filter(c => !c.completed);
  if (filter === "completed") filtered = challenges.filter(c => c.completed);
  
  const html = filtered.map(c => {
    const endDate = new Date(c.startDate);
    endDate.setDate(endDate.getDate() + c.duration);
    
    return `
      <div class="challenge-card ${c.completed ? 'completed' : ''}" data-challenge-id="${c.id}">
        <div class="challenge-header">
          <div>
            <div class="challenge-title">${c.name}</div>
            <span class="challenge-badge">${c.category}</span>
          </div>
        </div>
        <div class="challenge-details">
          <span>⏱️ ${c.duration} days</span>
          <span>⚡ ${c.impact} points</span>
          <span>${c.completed ? '✅ Completed' : '🔄 In Progress'}</span>
        </div>
        <div class="challenge-progress">
          <div class="progress-label">
            <span>${c.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${c.progress}%"></div>
          </div>
        </div>
        <div class="challenge-actions">
          <button class="challenge-btn challenge-btn-primary" ${c.completed ? 'disabled' : ''}>
            ${c.completed ? '✓ Completed' : 'Mark Complete'}
          </button>
          <button class="challenge-btn challenge-btn-secondary">Learn More</button>
        </div>
      </div>
    `;
  }).join("");
  
  document.getElementById("challengesGrid").innerHTML = html;
}

function completeChallenge(challengeId) {
  let challenges = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHALLENGES) || "[]");
  const challenge = challenges.find(c => c.id === challengeId);
  
  if (challenge && !challenge.completed) {
    challenge.completed = true;
    challenge.progress = 100;
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
    renderChallenges();
    showToast(`🎉 Challenge completed! You earned ${challenge.impact} points!`);
  }
}

function openAddChallengeModal() {
  document.getElementById("addChallengeModal").classList.add("active");
}

function closeAddChallengeModal() {
  document.getElementById("addChallengeModal").classList.remove("active");
}

function handleAddChallenge(e) {
  e.preventDefault();
  
  const challenge = {
    id: Date.now(),
    name: document.getElementById("challengeName").value,
    category: document.getElementById("challengeCategory").value,
    duration: parseInt(document.getElementById("challengeDuration").value),
    startDate: new Date(),
    completed: false,
    progress: 0,
    impact: parseInt(document.getElementById("challengeImpact").value),
    description: ""
  };
  
  let challenges = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHALLENGES) || "[]");
  challenges.push(challenge);
  localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  
  document.getElementById("addChallengeForm").reset();
  closeAddChallengeModal();
  showToast("Challenge added! 🚀");
  renderChallenges();
}

function closeEditHabitModal() {
  document.getElementById("editHabitModal").classList.remove("active");
}

function handleEditHabit(e) {
  e.preventDefault();
  showToast("Habit updated!");
  closeEditHabitModal();
}

// Community Tab
function renderCommunity() {
  renderCommunityComparison();
  renderLeaderboard("week");
}

function renderCommunityComparison() {
  const canvas = document.getElementById("communityChart");
  if (!canvas || canvas.chart) return;
  
  canvas.chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["You", "Community Avg", "Top 25%"],
      datasets: [{
        label: "Eco Score",
        data: [78, 62, 85],
        backgroundColor: ["#10b981", "#f59e0b", "#0ea5e9"],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: "x",
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 100, ticks: { color: "#64748b" }, grid: { color: "#e2e8f0" } },
        x: { ticks: { color: "#64748b" }, grid: { display: false } }
      }
    }
  });
}

function renderLeaderboard(period = "week") {
  const leaderboard = SAMPLE_LEADERBOARD[period];
  
  const html = leaderboard.map(person => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank ${person.rank === 1 ? 'gold' : person.rank === 2 ? 'silver' : person.rank === 3 ? 'bronze' : ''}">
        ${person.rank}
      </div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${person.name}</div>
        <div class="leaderboard-detail">${person.impact} pts</div>
      </div>
      <div class="leaderboard-score">${person.score} ${person.badge}</div>
    </div>
  `).join("");
  
  document.getElementById("leaderboardContainer").innerHTML = html;
}

// Badges Tab
function renderBadgesTab() {
  const badges = JSON.parse(localStorage.getItem(STORAGE_KEYS.BADGES) || "[]");
  const unlocked = badges.filter(b => b.unlocked).length;
  
  document.getElementById("unlockedBadges").textContent = unlocked;
  document.getElementById("totalBadges").textContent = badges.length;
  document.getElementById("badgeProgress").textContent = Math.round((unlocked / badges.length) * 100) + "%";
  
  const html = badges.map(b => `
    <div class="badge-item ${!b.unlocked ? 'locked' : ''}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-description">${b.description}</div>
      <div class="badge-unlocked">${b.unlocked ? '✓ Unlocked' : 'Locked'}</div>
    </div>
  `).join("");
  
  document.getElementById("badgesGrid").innerHTML = html;
}

// Export Report
function exportReport() {
  const score = 78;
  const habits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS) || "[]");
  const challenges = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHALLENGES) || "[]");
  const badges = JSON.parse(localStorage.getItem(STORAGE_KEYS.BADGES) || "[]");
  
  const report = `
ECO SCORE REPORT
================
Generated: ${new Date().toLocaleDateString()}

OVERALL SCORE: ${score}/100

STATISTICS:
- Total Habits: ${habits.length}
- Active Challenges: ${challenges.filter(c => !c.completed).length}
- Completed Challenges: ${challenges.filter(c => c.completed).length}
- Achievements Unlocked: ${badges.filter(b => b.unlocked).length}/${badges.length}

CO₂ IMPACT:
- CO₂ Saved: 45 kg
- Water Saved: 380 liters
- Waste Reduced: 12 kg

CATEGORY BREAKDOWN:
${Object.entries(CATEGORIES_DATA).map(([k, c]) => `- ${c.name}: ${c.score}/100`).join('\n')}

Keep up the great work toward sustainability!
  `;
  
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `eco-score-report-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  
  showToast("Report exported!");
}

// Utilities
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Make functions globally accessible
window.openAddChallengeModal = openAddChallengeModal;
window.closeAddChallengeModal = closeAddChallengeModal;
window.closeEditHabitModal = closeEditHabitModal;
window.exportReport = exportReport;

// Initialize on load
document.addEventListener("DOMContentLoaded", init);
