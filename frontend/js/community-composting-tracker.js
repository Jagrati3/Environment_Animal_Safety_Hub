// Community Composting Tracker - JavaScript

class CompostingTracker {
  constructor() {
    this.entries = [];
    this.communityMembers = [];
    this.tips = [
      {
        title: 'Balance Green and Brown',
        description: 'Mix 3 parts brown (leaves, cardboard) with 1 part green (food scraps, grass)',
        icon: 'fas fa-leaf',
      },
      {
        title: 'Chop Material into Smaller Pieces',
        description: 'Cut larger items to speed up decomposition by 2-3 months',
        icon: 'fas fa-cut',
      },
      {
        title: 'Keep Compost Moist',
        description: 'Maintain moisture like a wrung-out sponge for optimal decomposition',
        icon: 'fas fa-droplet',
      },
      {
        title: 'Turn Your Pile Regularly',
        description: 'Turn weekly to speed decomposition and reduce odors',
        icon: 'fas fa-rotate',
      },
      {
        title: 'Avoid Meat and Dairy',
        description: 'These attract pests and cause odors. Stick to plant-based materials',
        icon: 'fas fa-ban',
      },
      {
        title: 'Use Finished Compost',
        description: 'Dark, crumbly compost is ready in 2-3 months. Use in gardens!',
        icon: 'fas fa-flower',
      },
    ];
    this.achievements = [
      { id: 1, name: 'First Compost', icon: '🌱', condition: 'Log first entry' },
      { id: 2, name: 'Compost Collector', icon: '♻️', condition: 'Log 10 entries' },
      { id: 3, name: 'Waste Warrior', icon: '⚔️', condition: 'Compost 50kg' },
      { id: 4, name: 'Green Guardian', icon: '🌍', condition: 'Compost 100kg' },
      { id: 5, name: 'Community Hero', icon: '🦸', condition: 'Top 5 ranking' },
      { id: 6, name: '7-Day Streak', icon: '🔥', condition: 'Log 7 days straight' },
    ];
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.generateCommunityMembers();
    this.updateAllMetrics();
    this.renderLeaderboard();
    this.renderActivityList();
    this.renderTips();
    this.setupCharts();
    this.renderAchievements();
    this.renderCompetitions();
    this.setDefaultDate();
  }

  setupEventListeners() {
    document.getElementById('compostForm').addEventListener('submit', (e) =>
      this.handleFormSubmit(e)
    );
    document.getElementById('compostWeight').addEventListener('input', () =>
      this.updateEstimatedImpact()
    );
    document.getElementById('compostType').addEventListener('change', () =>
      this.updateEstimatedImpact()
    );

    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        this.renderLeaderboard(filter);
      });
    });
  }

  setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('compostDate').value = today;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const date = document.getElementById('compostDate').value;
    const type = document.getElementById('compostType').value;
    const weight = parseFloat(document.getElementById('compostWeight').value);
    const method = document.getElementById('compostMethod').value;
    const notes = document.getElementById('compostNotes').value;

    const entry = {
      id: Date.now(),
      date,
      type,
      weight,
      method,
      notes,
      timestamp: new Date().toISOString(),
    };

    this.entries.unshift(entry);
    this.saveToStorage();
    this.updateAllMetrics();
    this.renderLeaderboard();
    this.renderActivityList();
    this.setupCharts();
    this.renderAchievements();
    this.renderCompetitions();

    e.target.reset();
    this.setDefaultDate();
    this.updateEstimatedImpact();
  }

  updateEstimatedImpact() {
    const weight = parseFloat(document.getElementById('compostWeight').value) || 0;
    document.getElementById('estimatedWaste').textContent = weight.toFixed(1);
  }

  generateCommunityMembers() {
    const names = [
      'Sarah Chen',
      'Mike Johnson',
      'Emma Davis',
      'Alex Martinez',
      'Jessica Lee',
      'Tom Wilson',
      'Lisa Anderson',
      'Chris Brown',
    ];
    const yourName = 'You';
    this.communityMembers = [yourName, ...names].map((name, i) => {
      const baseWeight = Math.random() * 200;
      return {
        id: i,
        name,
        totalCompost: baseWeight,
        monthCompost: baseWeight * 0.4,
        weekCompost: baseWeight * 0.1,
        streak: Math.floor(Math.random() * 30),
        method: ['Home Compost', 'Community Bin', 'Worm Farm'][Math.floor(Math.random() * 3)],
      };
    });
  }

  updateAllMetrics() {
    this.updateMyStats();
    this.updateCommunityStats();
    this.updateCompostLevel();
  }

  updateMyStats() {
    const myTotal = this.entries.reduce((sum, e) => sum + e.weight, 0);

    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const myMonth = this.entries
      .filter((e) => new Date(e.date) >= monthAgo)
      .reduce((sum, e) => sum + e.weight, 0);

    document.getElementById('myTotal').textContent = myTotal.toFixed(1) + ' kg';
    document.getElementById('myMonth').textContent = myMonth.toFixed(1) + ' kg';

    // Update rank
    const rankedMembers = [...this.communityMembers].sort(
      (a, b) => b.totalCompost - a.totalCompost
    );
    const myRankPosition = rankedMembers.findIndex((m) => m.name === 'You') + 1;
    document.getElementById('myRank').textContent = '#' + myRankPosition;

    // Calculate streak
    const streak = this.calculateStreak();
    document.getElementById('myStreak').textContent = streak + ' days';
  }

  calculateStreak() {
    if (this.entries.length === 0) return 0;

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      if (this.entries.some((e) => e.date === dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    return streak;
  }

  updateCommunityStats() {
    const members = this.communityMembers.length;
    const total = this.communityMembers.reduce((sum, m) => sum + m.totalCompost, 0);
    const co2Avoided = total * 0.25; // 1kg compost avoids ~0.25kg CO2

    document.getElementById('communityMembers').textContent = members;
    document.getElementById('communityTotal').textContent = total.toFixed(0) + ' kg';
    document.getElementById('communityEmissions').textContent = co2Avoided.toFixed(0) + ' kg';
  }

  updateCompostLevel() {
    const total = this.entries.reduce((sum, e) => sum + e.weight, 0);
    const maxLevel = 500;
    const percentage = Math.min((total / maxLevel) * 100, 100);

    document.getElementById('totalCompost').textContent = total.toFixed(1);

    const pile = document.getElementById('compostLevel');
    const pile2 = document.querySelector('.pile');
    if (pile2) {
      pile2.style.height = percentage + '%';
    }
  }

  renderLeaderboard(filter = 'all') {
    const leaderboard = document.getElementById('leaderboard');

    let sorted = [...this.communityMembers];

    if (filter === 'month') {
      sorted.sort((a, b) => b.monthCompost - a.monthCompost);
    } else if (filter === 'week') {
      sorted.sort((a, b) => b.weekCompost - a.weekCompost);
    } else {
      sorted.sort((a, b) => b.totalCompost - a.totalCompost);
    }

    leaderboard.innerHTML = sorted
      .map((member, index) => {
        const amount =
          filter === 'month'
            ? member.monthCompost
            : filter === 'week'
              ? member.weekCompost
              : member.totalCompost;

        let rankClass = 'other';
        if (index === 0) rankClass = 'first';
        else if (index === 1) rankClass = 'second';
        else if (index === 2) rankClass = 'third';

        return `
          <div class="leaderboard-card">
            <div class="leaderboard-rank">
              <div>
                <div class="rank-badge ${rankClass}">${index + 1}</div>
              </div>
              <div class="member-name">${member.name}</div>
              <div class="compost-amount">${amount.toFixed(1)} kg</div>
            </div>
            <div class="member-info">
              <div>${member.method}</div>
              ${member.streak > 0 ? `<div class="streak-indicator"><i class="fas fa-fire"></i> ${member.streak} day streak</div>` : ''}
            </div>
          </div>
        `;
      })
      .join('');
  }

  renderActivityList() {
    const list = document.getElementById('activityList');

    if (this.entries.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-inbox"></i>
          <p>No composting entries yet. Start composting!</p>
        </div>
      `;
      return;
    }

    const typeIcons = {
      fruits: 'fas fa-apple-alt',
      grains: 'fas fa-bread-slice',
      coffee: 'fas fa-mug-hot',
      eggshells: 'fas fa-egg',
      'other-food': 'fas fa-bowl-food',
      leaves: 'fas fa-leaf',
      grass: 'fas fa-clover',
      branches: 'fas fa-tree',
      flowers: 'fas fa-flower',
      newspaper: 'fas fa-newspaper',
      cardboard: 'fas fa-boxes',
      'paper-bags': 'fas fa-bag-shopping',
      'shredded': 'fas fa-shred',
    };

    const typeNames = {
      fruits: 'Fruits & Vegetables',
      grains: 'Grains & Bread',
      coffee: 'Coffee Grounds',
      eggshells: 'Eggshells',
      'other-food': 'Other Food',
      leaves: 'Leaves',
      grass: 'Grass Clippings',
      branches: 'Small Branches',
      flowers: 'Flowers & Plants',
      newspaper: 'Newspaper',
      cardboard: 'Cardboard',
      'paper-bags': 'Paper Bags',
      'shredded': 'Shredded Paper',
    };

    list.innerHTML = this.entries
      .slice(0, 5)
      .map((entry) => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        return `
          <div class="activity-item">
            <div class="activity-icon">
              <i class="${typeIcons[entry.type]}"></i>
            </div>
            <div class="activity-details">
              <div class="activity-type">${typeNames[entry.type]}</div>
              <div class="activity-meta">${entry.method} • ${formattedDate}</div>
            </div>
            <div class="activity-weight">${entry.weight.toFixed(1)} kg</div>
          </div>
        `;
      })
      .join('');
  }

  renderTips() {
    const container = document.getElementById('tipsList');
    container.innerHTML = this.tips
      .map(
        (tip) => `
        <div class="tip-item">
          <div class="tip-icon">
            <i class="${tip.icon}"></i>
          </div>
          <div class="tip-content">
            <h4>${tip.title}</h4>
            <p>${tip.description}</p>
          </div>
        </div>
      `
      )
      .join('');
  }

  renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    container.innerHTML = this.achievements
      .map((achievement) => {
        const unlocked = this.checkAchievement(achievement.id);
        return `
          <div class="achievement ${unlocked ? 'unlocked' : ''}">
            <div class="achievement-icon">${achievement.icon}</div>
            <p class="achievement-name">${achievement.name}</p>
          </div>
        `;
      })
      .join('');
  }

  checkAchievement(id) {
    const total = this.entries.reduce((sum, e) => sum + e.weight, 0);

    switch (id) {
      case 1:
        return this.entries.length >= 1;
      case 2:
        return this.entries.length >= 10;
      case 3:
        return total >= 50;
      case 4:
        return total >= 100;
      case 5:
        return document.getElementById('myRank').textContent.includes('#1') ||
          document.getElementById('myRank').textContent.includes('#2') ||
          document.getElementById('myRank').textContent.includes('#3') ||
          document.getElementById('myRank').textContent.includes('#4') ||
          document.getElementById('myRank').textContent.includes('#5');
      case 6:
        return this.calculateStreak() >= 7;
      default:
        return false;
    }
  }

  renderCompetitions() {
    const container = document.getElementById('bracketsGrid');

    const competitions = [
      {
        name: 'Monthly Challenge',
        goal: 50,
        current: this.entries
          .filter((e) => {
            const entryDate = new Date(e.date);
            const now = new Date();
            return (
              entryDate.getMonth() === now.getMonth() &&
              entryDate.getFullYear() === now.getFullYear()
            );
          })
          .reduce((sum, e) => sum + e.weight, 0),
        participants: 8,
      },
      {
        name: 'Weekly Quest',
        goal: 15,
        current: this.entries
          .filter((e) => {
            const entryDate = new Date(e.date);
            const now = new Date();
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return entryDate >= weekAgo;
          })
          .reduce((sum, e) => sum + e.weight, 0),
        participants: 12,
      },
      {
        name: 'Community Goal',
        goal: 500,
        current: this.communityMembers.reduce((sum, m) => sum + m.totalCompost, 0),
        participants: this.communityMembers.length,
      },
    ];

    container.innerHTML = competitions
      .map((comp) => {
        const percentage = Math.min((comp.current / comp.goal) * 100, 100);
        const status = percentage >= 100 ? 'Completed' : 'In Progress';

        return `
          <div class="bracket-card">
            <div class="bracket-header">
              <div class="bracket-title">${comp.name}</div>
              <div class="bracket-status">${status}</div>
            </div>
            <div class="bracket-details">
              <div>
                <span>Progress:</span>
                <span class="bracket-value">${comp.current.toFixed(0)}/${comp.goal} kg</span>
              </div>
              <div style="margin-top: 10px; width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #8b5a3c, #a8755c); transition: width 0.3s;"></div>
              </div>
              <div style="margin-top: 10px;">
                <span>Participants:</span>
                <span class="bracket-value">${comp.participants}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  setupCharts() {
    this.setupWasteChart();
    this.setupTrendChart();
  }

  setupWasteChart() {
    const ctx = document.getElementById('wasteChart');
    if (!ctx) return;

    const wasteByType = {};
    this.entries.forEach((entry) => {
      const type = entry.type;
      wasteByType[type] = (wasteByType[type] || 0) + entry.weight;
    });

    const labels = Object.keys(wasteByType);
    const data = Object.values(wasteByType);
    const colors = [
      '#8b5a3c',
      '#a8755c',
      '#c9956f',
      '#d4a574',
      '#e0b986',
      '#e8d4c0',
      '#d4a574',
      '#c9956f',
      '#b88b5f',
      '#a8755c',
      '#9d6d52',
      '#8b5a3c',
      '#7d4f31',
    ];

    if (this.wasteChartInstance) {
      this.wasteChartInstance.destroy();
    }

    this.wasteChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors.slice(0, labels.length),
            borderColor: 'white',
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  setupTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    const last7Days = [];
    const composting = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayTotal = this.entries
        .filter((e) => e.date === dateStr)
        .reduce((sum, e) => sum + e.weight, 0);

      last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      composting.push(dayTotal);
    }

    if (this.trendChartInstance) {
      this.trendChartInstance.destroy();
    }

    this.trendChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: last7Days,
        datasets: [
          {
            label: 'Daily Composting',
            data: composting,
            borderColor: '#8b5a3c',
            backgroundColor: 'rgba(139, 90, 60, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#8b5a3c',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toFixed(1) + ' kg';
              },
            },
          },
        },
      },
    });
  }

  saveToStorage() {
    localStorage.setItem(
      'compostingData',
      JSON.stringify({
        entries: this.entries,
      })
    );
  }

  loadFromStorage() {
    const stored = localStorage.getItem('compostingData');
    if (stored) {
      const data = JSON.parse(stored);
      this.entries = data.entries || [];
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CompostingTracker();
});
