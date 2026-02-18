/* ============================================
   ECO-FRIENDLY SHOPPING SCORECARD - JAVASCRIPT
   ============================================ */

class EcoShoppingScorecard {
  constructor() {
    this.purchases = this.loadData('purchases', []);
    this.goals = this.loadData('goals', []);
    this.badges = this.loadData('badges', this.initializeBadges());
    this.settings = this.loadData('settings', {
      notifications: true,
      tips: true,
      leaderboard: true,
      neighborhood: 'San Francisco, CA'
    });
    this.init();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  init() {
    this.setupEventListeners();
    this.renderDashboard();
    this.updateAllScores();
    this.populateLeaderboard();
    this.renderBadges();
    this.renderTips();
    this.checkAndUnlockBadges();
    this.addSampleData();
  }

  // ============================================
  // DATA MANAGEMENT
  // ============================================

  loadData(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error loading ${key}:`, e);
      return defaultValue;
    }
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key}:`, e);
    }
  }

  initializeBadges() {
    return [
      {
        id: 'first-purchase',
        name: 'Conscious Shopper',
        icon: '🛍️',
        description: 'Log your first eco-friendly purchase',
        unlocked: false,
        points: 10
      },
      {
        id: 'streak-7',
        name: 'Green Streak',
        icon: '🔥',
        description: 'Maintain a 7-day eco purchasing streak',
        unlocked: false,
        points: 25
      },
      {
        id: 'score-80',
        name: 'Eco Champion',
        icon: '🏆',
        description: 'Achieve an 80+ eco score',
        unlocked: false,
        points: 50
      },
      {
        id: 'zero-waste',
        name: 'Zero Waste Warrior',
        icon: '♻️',
        description: 'Buy 10 items with recyclable packaging',
        unlocked: false,
        points: 40
      },
      {
        id: 'perfect-month',
        name: 'Perfect Month',
        icon: '⭐',
        description: 'Maintain 90+ score for a entire month',
        unlocked: false,
        points: 75
      },
      {
        id: 'category-master',
        name: 'Category Master',
        icon: '🎯',
        description: 'Get 90+ score in all categories',
        unlocked: false,
        points: 60
      },
      {
        id: 'savings-guru',
        name: 'Savings Guru',
        icon: '💰',
        description: 'Save $100+ through eco-friendly purchases',
        unlocked: false,
        points: 45
      },
      {
        id: 'leader-board',
        name: 'Leaderboard King',
        icon: '👑',
        description: 'Rank #1 on neighborhood leaderboard',
        unlocked: false,
        points: 100
      }
    ];
  }

  addSampleData() {
    if (this.purchases.length === 0) {
      const today = new Date();
      this.purchases = [
        {
          id: this.generateId(),
          date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'food',
          product: 'Organic Vegetables',
          brand: 'Local Farmer Market',
          amount: 25.50,
          ecoScore: 5,
          recyclable: true
        },
        {
          id: this.generateId(),
          date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'apparel',
          product: 'Sustainable Cotton Shirt',
          brand: 'Patagonia',
          amount: 89.99,
          ecoScore: 4,
          recyclable: true
        },
        {
          id: this.generateId(),
          date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'electronics',
          product: 'Eco USB-C Cables',
          brand: 'EarthWise',
          amount: 19.99,
          ecoScore: 5,
          recyclable: true
        },
        {
          id: this.generateId(),
          date: today.toISOString(),
          category: 'home',
          product: 'Bamboo Cutting Board',
          brand: 'EcoHome',
          amount: 35.00,
          ecoScore: 5,
          recyclable: false
        }
      ];
      this.saveData('purchases', this.purchases);
    }
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-tab, .bottom-nav-btn').forEach(tab => {
      tab.addEventListener('click', (e) => this.switchTab(e.currentTarget));
    });

    // Forms
    document.getElementById('purchase-form').addEventListener('submit', (e) => this.handlePurchaseSubmit(e));
    document.getElementById('goal-form').addEventListener('submit', (e) => this.handleGoalSubmit(e));

    // Category selection
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.selectCategory(e.currentTarget));
    });

    // Eco rating
    document.querySelectorAll('.rating-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.selectEcoScore(e.currentTarget));
    });

    // Period selector
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.changePeriod(e.currentTarget));
    });

    // Leaderboard filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.changeLeaderboardFilter(e.currentTarget));
    });

    // Modals
    document.getElementById('add-goal-btn').addEventListener('click', () => this.openGoalModal());
    document.getElementById('goal-close').addEventListener('click', () => this.closeGoalModal());
    document.getElementById('goal-cancel').addEventListener('click', () => this.closeGoalModal());

    document.getElementById('settings-btn').addEventListener('click', () => this.openSettingsModal());
    document.getElementById('settings-close').addEventListener('click', () => this.closeSettingsModal());
    document.getElementById('settings-cancel').addEventListener('click', () => this.closeSettingsModal());
    document.getElementById('settings-save').addEventListener('click', () => this.saveSettings());

    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  // ============================================
  // TAB SWITCHING
  // ============================================

  switchTab(element) {
    const tabName = element.getAttribute('data-tab');

    // Update active tabs
    document.querySelectorAll('.nav-tab, .bottom-nav-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(t => t.classList.add('active'));

    // Update active content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    // Special handling
    if (tabName === 'analytics') {
      setTimeout(() => this.renderCharts(), 100);
    } else if (tabName === 'leaderboard') {
      this.populateLeaderboard();
    }
  }

  // ============================================
  // DASHBOARD RENDERING
  // ============================================

  renderDashboard() {
    this.updateOverallScore();
    this.updateCategoryScores();
    this.renderRecentPurchases();
  }

  updateOverallScore() {
    const score = this.calculateOverallScore();
    const targetScore = 100;
    const percentage = (score / targetScore) * 100;

    document.getElementById('overall-score').textContent = Math.round(score);
    document.getElementById('target-score').textContent = Math.round(score);
    document.getElementById('progress-fill').style.width = percentage + '%';
    document.getElementById('eco-score-value').textContent = Math.round(percentage) + '%';

    // Update SVG ring
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    document.getElementById('score-ring').style.strokeDashoffset = offset;

    this.updateImpactStats();
  }

  updateImpactStats() {
    const totalSpent = this.purchases.reduce((sum, p) => sum + p.amount, 0);
    const todaySpent = this.purchases
      .filter(p => new Date(p.date).toDateString() === new Date().toDateString())
      .reduce((sum, p) => sum + p.amount, 0);

    document.getElementById('today-spent').textContent = '$' + todaySpent.toFixed(2);
    document.getElementById('savings-value').textContent = '$' + (totalSpent * 0.15).toFixed(2);
    document.getElementById('co2-offset').textContent = (this.calculateCO2Offset()).toFixed(2) + ' kg';
    document.getElementById('waste-avoided').textContent = (this.calculateWasteAvoided()).toFixed(2) + ' lbs';

    // Update streak
    document.getElementById('streak-days').textContent = this.calculateStreak();
  }

  updateAllScores() {
    this.updateOverallScore();
    this.updateCategoryScores();
  }

  updateCategoryScores() {
    const categories = ['food', 'apparel', 'electronics', 'home'];

    categories.forEach(cat => {
      const categoryPurchases = this.purchases.filter(p => p.category === cat);
      const score = categoryPurchases.length > 0
        ? (categoryPurchases.reduce((sum, p) => sum + p.ecoScore, 0) / categoryPurchases.length) * 20
        : 0;

      document.getElementById(`${cat}-score`).textContent = Math.round(score);
      document.getElementById(`${cat}-count`).textContent = categoryPurchases.length + ' purchase' + (categoryPurchases.length !== 1 ? 'es' : '');

      // Update ring
      const ring = document.getElementById(`${cat}-ring`);
      const offset = 100 - (score / 100) * 100;
      ring.style.strokeDashoffset = offset;

      // Add focus class if low
      const card = document.getElementById(`${cat}-card`);
      if (score < 60 && categoryPurchases.length > 0) {
        card.classList.add('focus');
      } else {
        card.classList.remove('focus');
      }
    });
  }

  // ============================================
  // PURCHASE LOGGING
  // ============================================

  selectCategory(btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('selected-category').value = btn.getAttribute('data-category');
  }

  selectEcoScore(btn) {
    document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const score = btn.getAttribute('data-rating');
    document.getElementById('eco-score').value = score;

    const labels = {
      '1': 'Not very eco-friendly',
      '2': 'Somewhat eco-friendly',
      '3': 'Moderately eco-friendly',
      '4': 'Very eco-friendly',
      '5': 'Extremely eco-friendly'
    };
    document.getElementById('rating-label').textContent = labels[score];
  }

  handlePurchaseSubmit(e) {
    e.preventDefault();

    const purchase = {
      id: this.generateId(),
      date: new Date().toISOString(),
      category: document.getElementById('selected-category').value,
      product: document.getElementById('product-name').value,
      brand: document.getElementById('product-brand').value,
      amount: parseFloat(document.getElementById('amount-spent').value),
      ecoScore: parseInt(document.getElementById('eco-score').value),
      recyclable: document.getElementById('recyclable-packaging').checked,
      notes: document.getElementById('notes').value
    };

    this.purchases.push(purchase);
    this.saveData('purchases', this.purchases);

    this.showToast('Purchase logged successfully! 🎉', 'success');
    this.renderDashboard();
    this.checkAndUnlockBadges();
    this.renderTips();
    e.target.reset();
    document.querySelectorAll('.category-btn, .rating-btn').forEach(b => b.classList.remove('active'));
    this.switchTab(document.querySelector('[data-tab="dashboard"]'));
  }

  renderRecentPurchases() {
    const list = document.getElementById('purchases-list');
    const recent = [...this.purchases].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

    if (recent.length === 0) {
      list.innerHTML = `
        <div class="no-data">
          <i class="fas fa-shopping-bag"></i>
          <p>No purchases logged yet</p>
        </div>
      `;
      return;
    }

    list.innerHTML = recent.map(p => `
      <div class="purchase-item">
        <div class="purchase-info">
          <div class="purchase-name">${p.product}</div>
          <div class="purchase-meta">${p.brand} • ${new Date(p.date).toLocaleDateString()}</div>
        </div>
        <div class="purchase-amount">$${p.amount.toFixed(2)}</div>
        <div class="purchase-score">
          ${'🌿'.repeat(p.ecoScore)}
        </div>
      </div>
    `).join('');
  }

  // ============================================
  // IMPACT CALCULATIONS
  // ============================================

  calculateOverallScore() {
    if (this.purchases.length === 0) return 78; // Default demo score

    const avgEcoScore = (this.purchases.reduce((sum, p) => sum + p.ecoScore, 0) / this.purchases.length) * 20;
    const recyclableRatio = (this.purchases.filter(p => p.recyclable).length / this.purchases.length) * 20;
    const weeklyConsistency = Math.min(20, this.purchases.filter(p => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(p.date) > weekAgo;
    }).length * 5);

    return Math.min(100, avgEcoScore + recyclableRatio + weeklyConsistency);
  }

  calculateCO2Offset() {
    const baseEmission = 10; // kg CO2 per purchase
    return this.purchases.length * baseEmission * (this.calculateOverallScore() / 100);
  }

  calculateWasteAvoided() {
    return this.purchases.filter(p => p.recyclable).length * 2.5;
  }

  calculateStreak() {
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    while (true) {
      const dateStr = currentDate.toISOString();
      const hasPurchase = this.purchases.some(p => {
        const pDate = new Date(p.date);
        pDate.setHours(0, 0, 0, 0);
        return pDate.getTime() === currentDate.getTime();
      });

      if (hasPurchase) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  // ============================================
  // GOALS MANAGEMENT
  // ============================================

  openGoalModal() {
    document.getElementById('goal-modal').classList.add('active');
  }

  closeGoalModal() {
    document.getElementById('goal-modal').classList.remove('active');
    document.getElementById('goal-form').reset();
  }

  handleGoalSubmit(e) {
    e.preventDefault();

    const goal = {
      id: this.generateId(),
      name: document.getElementById('goal-name').value,
      type: document.getElementById('goal-type').value,
      target: parseInt(document.getElementById('goal-target').value),
      deadline: document.getElementById('goal-deadline').value,
      progress: 0,
      completed: false
    };

    this.goals.push(goal);
    this.saveData('goals', this.goals);

    this.showToast('Goal created successfully!', 'success');
    this.renderGoals();
    this.closeGoalModal();
  }

  renderGoals() {
    const goalsList = document.getElementById('goals-list');

    if (this.goals.length === 0) {
      goalsList.innerHTML = `
        <div class="no-data" style="padding: 2rem 0;">
          <p>No goals set yet. Create one to stay motivated!</p>
        </div>
      `;
      return;
    }

    goalsList.innerHTML = this.goals.map(goal => {
      const progress = this.calculateGoalProgress(goal);
      return `
        <div class="goal-item">
          <div class="goal-info">
            <h4>${goal.name}</h4>
            <div class="goal-progress-small">
              <div class="goal-progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="goal-deadline">${goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'No deadline'}</div>
          </div>
          <div class="goal-actions">
            <button class="goal-btn" onclick="ecoApp.deleteGoal('${goal.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join('');
  }

  calculateGoalProgress(goal) {
    const score = this.calculateOverallScore();
    const savings = this.purchases.reduce((sum, p) => sum + p.amount, 0) * 0.15;
    const streak = this.calculateStreak();

    switch (goal.type) {
      case 'score':
        return Math.min(100, (score / goal.target) * 100);
      case 'spending':
        return Math.min(100, (savings / goal.target) * 100);
      case 'streak':
        return Math.min(100, (streak / goal.target) * 100);
      case 'purchases':
        return Math.min(100, (this.purchases.length / goal.target) * 100);
      default:
        return 0;
    }
  }

  deleteGoal(goalId) {
    this.goals = this.goals.filter(g => g.id !== goalId);
    this.saveData('goals', this.goals);
    this.renderGoals();
    this.showToast('Goal deleted', 'success');
  }

  // ============================================
  // BADGES & ACHIEVEMENTS
  // ============================================

  renderBadges() {
    const container = document.getElementById('badges-container');
    const earned = this.badges.filter(b => b.unlocked).length;
    const totalPoints = this.badges.filter(b => b.unlocked).reduce((sum, b) => sum + b.points, 0);

    document.getElementById('earned-badges').textContent = earned;
    document.getElementById('total-points').textContent = totalPoints;

    container.innerHTML = this.badges.map(badge => `
      <div class="badge-item ${badge.unlocked ? 'unlocked' : ''}">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.description}</div>
        <div class="badge-status">${badge.unlocked ? '✓ Unlocked' : 'Locked'}</div>
      </div>
    `).join('');

    this.renderGoals();
  }

  checkAndUnlockBadges() {
    const score = this.calculateOverallScore();
    const streak = this.calculateStreak();
    const recyclableCount = this.purchases.filter(p => p.recyclable).length;
    const totalSpent = this.purchases.reduce((sum, p) => sum + p.amount, 0);
    const savings = totalSpent * 0.15;

    const conditions = {
      'first-purchase': this.purchases.length >= 1,
      'streak-7': streak >= 7,
      'score-80': score >= 80,
      'zero-waste': recyclableCount >= 10,
      'perfect-month': score >= 90,
      'category-master': this.allCategoriesHigh(),
      'savings-guru': savings >= 100,
      'leader-board': this.isLeaderboardFirst()
    };

    let newBadges = false;
    for (let badgeId in conditions) {
      const badge = this.badges.find(b => b.id === badgeId);
      if (badge && !badge.unlocked && conditions[badgeId]) {
        badge.unlocked = true;
        newBadges = true;
        this.showToast(`🎉 Badge Unlocked: ${badge.name}!`, 'success');
      }
    }

    if (newBadges) {
      this.saveData('badges', this.badges);
      this.renderBadges();
    }
  }

  allCategoriesHigh() {
    const categories = ['food', 'apparel', 'electronics', 'home'];
    return categories.every(cat => {
      const categoryPurchases = this.purchases.filter(p => p.category === cat);
      const score = categoryPurchases.length > 0
        ? (categoryPurchases.reduce((sum, p) => sum + p.ecoScore, 0) / categoryPurchases.length) * 20
        : 0;
      return score >= 90;
    });
  }

  isLeaderboardFirst() {
    const userScore = this.calculateOverallScore();
    const leaderboard = this.generateLeaderboardData();
    return leaderboard.length > 0 && leaderboard[0].score === userScore;
  }

  // ============================================
  // TIPS & RECOMMENDATIONS
  // ============================================

  renderTips() {
    const container = document.getElementById('tips-container');
    const tips = this.generateTips();

    container.innerHTML = tips.map(tip => `
      <div class="tip-card">
        <div class="tip-icon"><i class="fas ${tip.icon}"></i></div>
        <div class="tip-content">
          <h4>${tip.title}</h4>
          <p>${tip.description}</p>
          <a href="#" class="tip-action">${tip.action}<i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    `).join('');
  }

  generateTips() {
    const categories = ['food', 'apparel', 'electronics', 'home'];
    const lowScoreCategories = [];

    categories.forEach(cat => {
      const categoryPurchases = this.purchases.filter(p => p.category === cat);
      if (categoryPurchases.length > 0) {
        const score = (categoryPurchases.reduce((sum, p) => sum + p.ecoScore, 0) / categoryPurchases.length) * 20;
        if (score < 70) {
          lowScoreCategories.push(cat);
        }
      }
    });

    const tips = [];

    if (lowScoreCategories.includes('apparel')) {
      tips.push({
        title: 'Boost Your Apparel Score',
        description: 'Consider shopping from sustainable brands that use organic materials and ethical manufacturing.',
        icon: 'fa-lightbulb',
        action: 'Learn More'
      });
    }

    if (lowScoreCategories.includes('food')) {
      tips.push({
        title: 'Go Organic',
        description: 'Choose organic and locally-sourced products to reduce your food carbon footprint.',
        icon: 'fa-leaf',
        action: 'Explore Options'
      });
    }

    if (lowScoreCategories.includes('electronics')) {
      tips.push({
        title: 'Refurbished Electronics',
        description: 'Buy refurbished or second-hand electronics to avoid e-waste and save money.',
        icon: 'fa-laptop',
        action: 'Shop Now'
      });
    }

    if (tips.length === 0) {
      tips.push({
        title: '🌟 Keep It Up!',
        description: "You're doing amazing with your eco-friendly choices! Keep maintaining these great habits.",
        icon: 'fa-star',
        action: 'View All Tips'
      });
    }

    return tips;
  }

  // ============================================
  // ANALYTICS & CHARTS
  // ============================================

  renderCharts() {
    this.renderScoreTrendChart();
    this.renderCategoryChart();
    this.renderSpendingImpactChart();
    this.renderEcoPurchasesChart();
  }

  renderScoreTrendChart() {
    const ctx = document.getElementById('score-trend-chart');
    if (!ctx || ctx.chart) return;

    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayPurchases = this.purchases.filter(p => {
        const pDate = new Date(p.date);
        return pDate >= dayStart && pDate <= dayEnd;
      });

      const score = dayPurchases.length > 0
        ? (dayPurchases.reduce((sum, p) => sum + p.ecoScore, 0) / dayPurchases.length) * 20
        : null;

      last30Days.push(score);
    }

    ctx.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        datasets: [{
          label: 'Eco Score',
          data: last30Days,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          filler: { propagate: true }
        },
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }

  renderCategoryChart() {
    const ctx = document.getElementById('category-chart');
    if (!ctx || ctx.chart) return;

    const categories = { food: 0, apparel: 0, electronics: 0, home: 0 };
    this.purchases.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });

    ctx.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categories).map(c => c.charAt(0).toUpperCase() + c.slice(1)),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'],
          borderColor: 'white',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  renderSpendingImpactChart() {
    const ctx = document.getElementById('spending-impact-chart');
    if (!ctx || ctx.chart) return;

    const last12Months = [];
    const spending = [];
    const impact = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toLocaleString('default', { month: 'short' });
      last12Months.push(monthStr);

      const monthPurchases = this.purchases.filter(p => {
        const pDate = new Date(p.date);
        return pDate.getMonth() === date.getMonth() && pDate.getFullYear() === date.getFullYear();
      });

      spending.push(monthPurchases.reduce((sum, p) => sum + p.amount, 0));
      impact.push(monthPurchases.reduce((sum, p) => sum + (p.ecoScore * 2), 0));
    }

    ctx.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: last12Months,
        datasets: [
          {
            label: 'Spending ($)',
            data: spending,
            backgroundColor: '#3b82f6',
            borderRadius: 4
          },
          {
            label: 'Impact Score',
            data: impact,
            backgroundColor: '#10b981',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  renderEcoPurchasesChart() {
    const ctx = document.getElementById('eco-purchases-chart');
    if (!ctx || ctx.chart) return;

    const totalPurchases = this.purchases.length;
    const ecoPurchases = this.purchases.filter(p => p.ecoScore >= 4).length;
    const standardPurchases = this.purchases.filter(p => p.ecoScore < 4).length;

    ctx.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Eco-Friendly (4-5⭐)', 'Standard (1-3⭐)'],
        datasets: [{
          data: [ecoPurchases, standardPurchases],
          backgroundColor: ['#10b981', '#d1d5db'],
          borderColor: 'white',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + ' purchases';
              }
            }
          }
        }
      }
    });
  }

  // ============================================
  // LEADERBOARD
  // ============================================

  generateLeaderboardData() {
    const baseData = [
      {
        rank: 1,
        name: 'Your Name',
        avatar: 'Y',
        score: this.calculateOverallScore(),
        badges: this.badges.filter(b => b.unlocked).length,
        value: (this.purchases.reduce((sum, p) => sum + p.amount, 0) * 0.15).toFixed(2)
      },
      { rank: 2, name: 'EcoWarrior', avatar: 'E', score: 85, badges: 6, value: 145.50 },
      { rank: 3, name: 'GreenMind', avatar: 'G', score: 82, badges: 5, value: 132.00 },
      { rank: 4, name: 'SustainAlex', avatar: 'S', score: 79, badges: 4, value: 118.75 },
      { rank: 5, name: 'NatureLover', avatar: 'N', score: 76, badges: 3, value: 95.50 },
      { rank: 6, name: 'EcoChamp22', avatar: 'E', score: 73, badges: 2, value: 87.25 },
      { rank: 7, name: 'GreenAct', avatar: 'G', score: 70, badges: 2, value: 75.00 },
      { rank: 8, name: 'EarthFriend', avatar: 'E', score: 67, badges: 1, value: 62.50 }
    ];

    return baseData.sort((a, b) => b.score - a.score);
  }

  populateLeaderboard() {
    const leaderboard = this.generateLeaderboardData();
    const body = document.getElementById('leaderboard-body');

    body.innerHTML = leaderboard.map((member, index) => {
      const medals = ['🥇', '🥈', '🥉'];
      const medal = index < 3 ? medals[index] : (index + 1);

      return `
        <div class="leaderboard-row">
          <div class="rank-col ${index < 3 ? 'medal' : ''}">${medal}</div>
          <div class="name-col">
            <div class="member-avatar">${member.avatar}</div>
            <div class="member-info">
              <div class="member-name">${member.name}</div>
              <div class="member-tag">Eco Shopper</div>
            </div>
          </div>
          <div class="score-col">${member.score}</div>
          <div class="badge-col">${member.badges}</div>
          <div class="value-col">$${member.value}</div>
        </div>
      `;
    }).join('');

    // Update your rank
    const yourRank = leaderboard.findIndex(m => m.name === 'Your Name') + 1;
    document.getElementById('your-rank').textContent = yourRank;
    document.getElementById('rank-name').textContent = 'You';
    document.getElementById('rank-score').textContent = this.calculateOverallScore();

    const messages = [
      'Keep shopping eco-friendly to climb the ranks!',
      'You\'re on the right track! Keep it up!',
      'Wow! You\'re a top eco-shopper! 🌟',
      'Congratulations! You\'re a sustainability champion!'
    ];

    const messageIndex = Math.min(Math.floor(yourRank / 2), 3);
    document.getElementById('rank-message').textContent = messages[messageIndex];
  }

  changeLeaderboardFilter(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.populateLeaderboard();
  }

  // ============================================
  // SETTINGS
  // ============================================

  openSettingsModal() {
    document.getElementById('settings-modal').classList.add('active');
    document.getElementById('notifications-toggle').checked = this.settings.notifications;
    document.getElementById('tips-toggle').checked = this.settings.tips;
    document.getElementById('leaderboard-toggle').checked = this.settings.leaderboard;
    document.getElementById('neighborhood').value = this.settings.neighborhood;
  }

  closeSettingsModal() {
    document.getElementById('settings-modal').classList.remove('active');
  }

  saveSettings() {
    this.settings.notifications = document.getElementById('notifications-toggle').checked;
    this.settings.tips = document.getElementById('tips-toggle').checked;
    this.settings.leaderboard = document.getElementById('leaderboard-toggle').checked;
    this.settings.neighborhood = document.getElementById('neighborhood').value;

    this.saveData('settings', this.settings);
    this.showToast('Settings saved!', 'success');
    this.closeSettingsModal();
  }

  // ============================================
  // UTILITIES
  // ============================================

  changePeriod(btn) {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Regenerate charts with new period
    setTimeout(() => this.renderCharts(), 100);
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.querySelector('.toast-icon').className = `toast-icon fas ${icon}`;
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add(type);

    toast.style.animation = 'none';
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease';
    }, 10);

    setTimeout(() => {
      toast.classList.remove(type);
    }, 3000);
  }
}

// ============================================
// INITIALIZE APP
// ============================================

let ecoApp;

document.addEventListener('DOMContentLoaded', () => {
  ecoApp = new EcoShoppingScorecard();
});
