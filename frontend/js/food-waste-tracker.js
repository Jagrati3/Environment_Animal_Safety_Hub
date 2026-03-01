document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = {
    entries: 'foodWasteEntriesV1',
    reminders: 'foodWasteRemindersV1',
    shopping: 'foodWasteShoppingV1',
    goal: 'foodWasteReductionGoalV1'
  };

  const AVERAGE_HOUSEHOLD_LBS_PER_WEEK = 20;
  const KG_TO_LBS = 2.20462;
  const MAX_HISTORY_DAYS = 365;

  const CATEGORY_GROUPS = ['produce', 'dairy', 'meat', 'grains', 'prepared-meals'];
  const CATEGORY_LABELS = {
    produce: 'Produce',
    dairy: 'Dairy',
    meat: 'Meat',
    grains: 'Grains',
    'prepared-meals': 'Prepared Meals'
  };
  const CATEGORY_COLORS = {
    produce: '#4caf50',
    dairy: '#00acc1',
    meat: '#ef5350',
    grains: '#ffb300',
    'prepared-meals': '#ab47bc'
  };

  const RECIPES = [
    { title: 'Vegetable Stir-Fry Bowl', ingredient: 'vegetables', time: '20 min', tip: 'Great for soft vegetables.' },
    { title: 'Fruit Smoothie Rescue', ingredient: 'fruits', time: '10 min', tip: 'Use ripe fruits before they spoil.' },
    { title: 'Bread Pudding', ingredient: 'bread', time: '35 min', tip: 'Perfect for stale bread.' },
    { title: 'Creamy Dairy Pasta', ingredient: 'dairy', time: '25 min', tip: 'Use milk/cream nearing expiry.' },
    { title: 'Leftover Grain Salad', ingredient: 'bread', time: '15 min', tip: 'Use cooked rice/quinoa quickly.' },
    { title: 'Soup From Leftovers', ingredient: 'vegetables', time: '30 min', tip: 'Any leftover produce works.' }
  ];

  const STORAGE_TIPS = [
    'Keep herbs fresh: store stems in water and cover loosely.',
    'Place dairy on middle shelves (not on the door) for stable temperature.',
    'Freeze leftover cooked meals in portions within 2 hours.',
    'Store apples away from leafy greens to slow spoilage.',
    'Use clear containers so older food is visible first.'
  ];

  let wasteEntries = loadJSON(STORAGE_KEYS.entries, []);
  let reminders = loadJSON(STORAGE_KEYS.reminders, []);
  let shoppingList = loadJSON(STORAGE_KEYS.shopping, []);
  let reductionGoal = Number(localStorage.getItem(STORAGE_KEYS.goal) || 20);
  let currentFilter = { category: 'all', type: 'all', date: 'today' };
  let currentPatternView = 'week';
  let recipeOffset = 0;
  let storageTipOffset = 0;
  let chart = null;

  pruneEntriesTo12Months();
  bindEvents();
  seedDefaults();
  renderAll();

  function bindEvents() {
    const form = document.getElementById('wasteForm');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        addWasteFromForm();
      });
    }

    const recipeSearch = document.getElementById('recipeSearch');
    const recipeIngredient = document.getElementById('recipeIngredient');
    if (recipeSearch) recipeSearch.addEventListener('input', renderRecipes);
    if (recipeIngredient) recipeIngredient.addEventListener('change', renderRecipes);

    const now = new Date();
    const wasteDate = document.getElementById('wasteDate');
    if (wasteDate && !wasteDate.value) {
      wasteDate.value = toLocalDatetimeInput(now);
    }
  }

  function seedDefaults() {
    if (!Array.isArray(shoppingList) || shoppingList.length === 0) {
      shoppingList = [
        { id: id(), text: 'Buy smaller milk pack', checked: false },
        { id: id(), text: 'Plan 2 leftover meals this week', checked: false }
      ];
      saveShopping();
    }
  }

  function addWasteFromForm() {
    const category = valueOf('wasteCategory');
    const type = valueOf('wasteType');
    const weight = Number(valueOf('wasteWeight'));
    const itemName = valueOf('itemName');
    const itemCost = Number(valueOf('itemCost') || 0);
    const wasteDateValue = valueOf('wasteDate');
    const reason = valueOf('wasteReason');

    if (!category || !type || !weight || !itemName || !wasteDateValue) {
      showAlert('Please fill all required waste fields.');
      return;
    }

    const entry = {
      id: id(),
      category,
      groupedCategory: normalizeCategory(category),
      type,
      weight,
      itemName,
      itemCost,
      reason,
      date: new Date(wasteDateValue).toISOString(),
      compostable: isCompostable(category, type)
    };

    wasteEntries.push(entry);
    pruneEntriesTo12Months();
    saveEntries();

    const form = document.getElementById('wasteForm');
    form.reset();
    document.getElementById('wasteDate').value = toLocalDatetimeInput(new Date());

    showAlert(`Logged ${weight}kg of ${itemName}.`, 'success');
    checkAchievements();
    renderAll();
  }

  function renderAll() {
    renderStats();
    renderImpact();
    renderComparison();
    renderGoal();
    renderWasteLog();
    renderExpiryList();
    renderShoppingList();
    renderRecipes();
    renderStorageTips();
    renderPatternHeatmap();
    renderTrendsChart();
    renderSuggestions();
    renderAchievementBadges();
    renderFooterStats();
  }

  function renderStats() {
    const today = sumWeight(filterByDateRange(wasteEntries, 'today'));
    const week = sumWeight(filterByDateRange(wasteEntries, 'week'));
    const monthEntries = filterByDateRange(wasteEntries, 'month');
    const monthWaste = sumWeight(monthEntries);
    const monthCost = monthEntries.reduce((total, entry) => total + entry.itemCost, 0);

    setText('todayWaste', today.toFixed(1));
    setText('weekWaste', week.toFixed(1));
    setText('totalWasteKg', monthWaste.toFixed(1));
    setText('monetaryWaste', `$${monthCost.toFixed(2)}`);

    const compostableWeight = monthEntries.filter(entry => entry.compostable).reduce((sum, entry) => sum + entry.weight, 0);
    const compostablePercent = monthWaste > 0 ? (compostableWeight / monthWaste) * 100 : 0;
    setText('compostablePercent', compostablePercent.toFixed(0));
    const compostBar = document.getElementById('compostProgressBar');
    if (compostBar) compostBar.style.width = `${Math.min(100, compostablePercent)}%`;

    const todayStatus = document.getElementById('todayStatus');
    if (todayStatus) {
      todayStatus.textContent = today <= 0.5 ? 'Great' : today <= 1.5 ? 'Normal' : 'High';
    }

    const weekChange = getWeekChangePercent();
    const weekChangeEl = document.getElementById('weekChange');
    if (weekChangeEl) {
      const sign = weekChange > 0 ? '+' : '';
      weekChangeEl.textContent = `${sign}${weekChange.toFixed(0)}%`;
      weekChangeEl.style.color = weekChange <= 0 ? '#2e7d32' : '#d32f2f';
    }

    const costTrendEl = document.getElementById('costTrend');
    if (costTrendEl) {
      const prevMonthEntries = filterByPreviousMonth(wasteEntries);
      const prevCost = prevMonthEntries.reduce((total, entry) => total + entry.itemCost, 0);
      if (monthCost < prevCost) {
        costTrendEl.textContent = 'Improving';
        costTrendEl.style.color = '#2e7d32';
      } else if (monthCost > prevCost) {
        costTrendEl.textContent = 'Increasing';
        costTrendEl.style.color = '#d32f2f';
      } else {
        costTrendEl.textContent = 'Stable';
        costTrendEl.style.color = '#6d4c41';
      }
    }
  }

  function renderImpact() {
    const monthEntries = filterByDateRange(wasteEntries, 'month');
    const totalKg = sumWeight(monthEntries);
    const compostableKg = monthEntries.filter(entry => entry.compostable).reduce((sum, entry) => sum + entry.weight, 0);

    const carbon = totalKg * 2.5;
    const water = totalKg * 250;
    const land = totalKg * 1.8;

    setText('carbonImpact', carbon.toFixed(1));
    setText('waterImpact', water.toFixed(0));
    setText('landImpact', land.toFixed(1));
    setText('compostableKg', compostableKg.toFixed(1));

    const msg = document.getElementById('impactMessage');
    if (msg) {
      if (totalKg === 0) {
        msg.textContent = 'Start logging your food waste to see environmental impact.';
      } else if (totalKg < 8) {
        msg.textContent = 'Nice work. Your monthly waste is low and your impact is improving.';
      } else if (totalKg < 15) {
        msg.textContent = 'You are mid-range. Focus on highest-waste categories to reduce impact further.';
      } else {
        msg.textContent = 'High waste month detected. Prioritize meal planning and timely leftovers.';
      }
    }
  }

  function renderComparison() {
    const weekKg = sumWeight(filterByDateRange(wasteEntries, 'week'));
    const weekLbs = weekKg * KG_TO_LBS;
    const yourPercent = Math.min(100, (weekLbs / AVERAGE_HOUSEHOLD_LBS_PER_WEEK) * 100);

    const yourBar = document.getElementById('yourWasteBar');
    if (yourBar) yourBar.style.width = `${Math.max(4, yourPercent)}%`;

    setText('yourWasteValue', `${weekLbs.toFixed(1)} lbs`);

    const compMsg = document.getElementById('comparisonMessage');
    if (compMsg) {
      if (weekLbs === 0) {
        compMsg.innerHTML = '<i class="fas fa-lightbulb"></i><p>Start tracking to compare! Every bit helps.</p>';
      } else if (weekLbs <= AVERAGE_HOUSEHOLD_LBS_PER_WEEK) {
        compMsg.innerHTML = `<i class="fas fa-thumbs-up"></i><p>You are below average household waste (${AVERAGE_HOUSEHOLD_LBS_PER_WEEK} lbs/week). Great work!</p>`;
      } else {
        const over = weekLbs - AVERAGE_HOUSEHOLD_LBS_PER_WEEK;
        compMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>You are ${over.toFixed(1)} lbs above average. Reduce high-loss categories first.</p>`;
      }
    }

    setText('yourWaste', `${sumWeight(filterByDateRange(wasteEntries, 'month')).toFixed(1)}kg waste`);
  }

  function renderGoal() {
    const monthKg = sumWeight(filterByDateRange(wasteEntries, 'month'));
    setText('currentGoal', `${reductionGoal} kg`);

    const fill = document.getElementById('goalProgressFill');
    const progressText = document.getElementById('goalProgressText');
    if (fill && progressText) {
      const progress = reductionGoal > 0 ? Math.min(100, (monthKg / reductionGoal) * 100) : 0;
      fill.style.width = `${progress}%`;
      progressText.textContent = `${monthKg.toFixed(1)}kg of monthly goal (${reductionGoal}kg)`;
    }
  }

  function renderWasteLog() {
    const log = document.getElementById('wasteLog');
    if (!log) return;

    let entries = [...wasteEntries];
    entries = applyFilters(entries, currentFilter);
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (entries.length === 0) {
      log.innerHTML = '<div class="empty-state"><i class="fas fa-leaf"></i><p>No food waste logged yet</p><small>Start tracking to see your waste patterns</small></div>';
      return;
    }

    log.innerHTML = entries.map((entry) => `
      <div class="log-item">
        <div class="log-main">
          <strong>${escapeHtml(entry.itemName)}</strong>
          <span>${formatCategory(entry.category)} • ${entry.weight.toFixed(1)}kg • ${formatDate(entry.date)}</span>
          <small>${entry.type}${entry.reason ? ` • ${escapeHtml(entry.reason)}` : ''}</small>
        </div>
        <div class="log-actions">
          <span>$${entry.itemCost.toFixed(2)}</span>
          <button class="btn btn-secondary" onclick="deleteWasteEntry('${entry.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  function renderTrendsChart() {
    const canvas = document.getElementById('wasteCategoryChart');
    if (!canvas) return;

    const weeklyByCategory = aggregateByCategory(filterByDateRange(wasteEntries, 'week'));
    const monthlyByCategory = aggregateByCategory(filterByDateRange(wasteEntries, 'month'));

    const labels = CATEGORY_GROUPS.map(category => CATEGORY_LABELS[category]);
    const weeklyData = CATEGORY_GROUPS.map(category => Number((weeklyByCategory[category] || 0).toFixed(2)));
    const monthlyData = CATEGORY_GROUPS.map(category => Number((monthlyByCategory[category] || 0).toFixed(2)));

    if (chart) chart.destroy();

    chart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Weekly Waste (kg)',
            data: weeklyData,
            backgroundColor: CATEGORY_GROUPS.map(category => CATEGORY_COLORS[category]),
            borderRadius: 8
          },
          {
            type: 'line',
            label: 'Monthly Waste (kg)',
            data: monthlyData,
            borderColor: '#1e88e5',
            backgroundColor: 'rgba(30,136,229,0.12)',
            borderWidth: 3,
            tension: 0.35,
            fill: false,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} kg`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Waste (kg)' }
          }
        }
      }
    });

    const legend = document.getElementById('categoryLegend');
    if (legend) {
      legend.innerHTML = CATEGORY_GROUPS.map(category => {
        const week = weeklyByCategory[category] || 0;
        const month = monthlyByCategory[category] || 0;
        return `<div class="legend-item"><span class="legend-dot" style="background:${CATEGORY_COLORS[category]}"></span>${CATEGORY_LABELS[category]}: ${week.toFixed(1)}kg week / ${month.toFixed(1)}kg month</div>`;
      }).join('');
    }
  }

  function renderPatternHeatmap() {
    const heatmap = document.getElementById('patternHeatmap');
    if (!heatmap) return;

    const buckets = {};
    const entries = filterByDateRange(wasteEntries, currentPatternView === 'week' ? 'week' : 'month');

    entries.forEach((entry) => {
      const date = new Date(entry.date);
      const key = currentPatternView === 'week'
        ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
        : `W${Math.ceil(date.getDate() / 7)}`;
      buckets[key] = (buckets[key] || 0) + entry.weight;
    });

    const keys = currentPatternView === 'week'
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['W1', 'W2', 'W3', 'W4', 'W5'];
    const max = Math.max(0.1, ...Object.values(buckets));

    heatmap.innerHTML = keys.map((key) => {
      const value = buckets[key] || 0;
      const intensity = value / max;
      const alpha = Math.max(0.08, intensity * 0.9);
      return `<div class="heat-cell" style="background: rgba(211,47,47,${alpha});"><strong>${key}</strong><span>${value.toFixed(1)}kg</span></div>`;
    }).join('');
  }

  function renderExpiryList() {
    const list = document.getElementById('expiryList');
    if (!list) return;

    if (!reminders.length) {
      list.innerHTML = '<div class="empty-state"><small>No reminders yet.</small></div>';
      return;
    }

    const sorted = [...reminders].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    list.innerHTML = sorted.map((item) => {
      const daysLeft = daysUntil(item.expiryDate);
      const status = daysLeft < 0 ? 'Expired' : daysLeft === 0 ? 'Today' : `${daysLeft}d left`;
      return `
        <div class="reminder-item">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <small>${item.location} • ${formatDate(item.expiryDate)}</small>
          </div>
          <div>
            <span>${status}</span>
            <button class="btn btn-secondary" onclick="deleteReminder('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderRecipes() {
    const container = document.getElementById('recipeContainer');
    if (!container) return;

    const search = (valueOf('recipeSearch') || '').toLowerCase();
    const ingredient = valueOf('recipeIngredient');

    const filtered = RECIPES.filter((recipe) => {
      const ingredientOk = !ingredient || recipe.ingredient === ingredient;
      const searchOk = !search || `${recipe.title} ${recipe.tip}`.toLowerCase().includes(search);
      return ingredientOk && searchOk;
    });

    const shown = filtered.slice(recipeOffset, recipeOffset + 3);
    const output = shown.length ? shown : filtered.slice(0, 3);

    container.innerHTML = output.map((recipe) => `
      <div class="recipe-item">
        <strong>${recipe.title}</strong>
        <small>${recipe.time}</small>
        <p>${recipe.tip}</p>
      </div>
    `).join('') || '<div class="empty-state"><small>No recipe matches found.</small></div>';
  }

  function renderStorageTips() {
    const container = document.getElementById('storageContainer');
    if (!container) return;

    const tips = [
      STORAGE_TIPS[storageTipOffset % STORAGE_TIPS.length],
      STORAGE_TIPS[(storageTipOffset + 1) % STORAGE_TIPS.length],
      STORAGE_TIPS[(storageTipOffset + 2) % STORAGE_TIPS.length]
    ];

    container.innerHTML = tips.map((tip) => `<div class="tip-item">💡 ${tip}</div>`).join('');
  }

  function renderShoppingList() {
    const container = document.getElementById('shoppingList');
    if (!container) return;

    if (!shoppingList.length) {
      container.innerHTML = '<div class="empty-state"><small>No smart list items yet.</small></div>';
      return;
    }

    container.innerHTML = shoppingList.map((item) => `
      <label class="shopping-item">
        <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItem('${item.id}')" />
        <span>${escapeHtml(item.text)}</span>
        <button class="btn btn-secondary" onclick="removeShoppingItem('${item.id}')">×</button>
      </label>
    `).join('');
  }

  function renderSuggestions() {
    const container = document.getElementById('recipeContainer');
    if (!container) return;

    const monthly = aggregateByCategory(filterByDateRange(wasteEntries, 'month'));
    const dominant = CATEGORY_GROUPS.reduce((max, category) => {
      return monthly[category] > monthly[max] ? category : max;
    }, CATEGORY_GROUPS[0]);

    if (!wasteEntries.length) return;

    const messages = {
      produce: 'High produce waste: buy smaller batches and prep just 2-3 days ahead.',
      dairy: 'High dairy waste: choose smaller packs and front-load near-expiry items.',
      meat: 'High meat waste: portion and freeze on purchase day.',
      grains: 'High grains waste: cook measured servings and repurpose leftovers next day.',
      'prepared-meals': 'High prepared-meal waste: schedule one leftover night every 2 days.'
    };

    const alertBox = document.getElementById('alertBanner');
    const alertMessage = document.getElementById('alertMessage');
    if (alertBox && alertMessage) {
      alertMessage.textContent = `Smart suggestion: ${messages[dominant]}`;
      alertBox.classList.remove('hidden');
    }
  }

  function renderAchievementBadges() {
    const rightColumn = document.querySelector('.right-column');
    if (!rightColumn) return;

    let badgeSection = document.getElementById('achievementBadges');
    if (!badgeSection) {
      badgeSection = document.createElement('section');
      badgeSection.id = 'achievementBadges';
      badgeSection.className = 'card';
      badgeSection.innerHTML = '<h2><i class="fas fa-award"></i> Achievement Badges</h2><div id="badgeList" class="tips-container"></div>';
      rightColumn.prepend(badgeSection);
    }

    const monthKg = sumWeight(filterByDateRange(wasteEntries, 'month'));
    const weekLbs = sumWeight(filterByDateRange(wasteEntries, 'week')) * KG_TO_LBS;
    const streakDays = computeRecentLogStreak();

    const badges = [
      { label: 'Tracker Starter', unlocked: wasteEntries.length >= 1, hint: 'Log your first waste entry' },
      { label: 'Low Waste Week', unlocked: weekLbs > 0 && weekLbs <= AVERAGE_HOUSEHOLD_LBS_PER_WEEK, hint: 'Stay under 20 lbs/week' },
      { label: 'Monthly Saver', unlocked: monthKg > 0 && monthKg <= reductionGoal, hint: `Stay within ${reductionGoal}kg this month` },
      { label: 'Consistency Champ', unlocked: streakDays >= 5, hint: 'Log activity for 5+ recent days' }
    ];

    const badgeList = document.getElementById('badgeList');
    if (badgeList) {
      badgeList.innerHTML = badges.map((badge) => `
        <div class="tip-item" style="opacity:${badge.unlocked ? 1 : 0.6};">
          ${badge.unlocked ? '🏅' : '🔒'} <strong>${badge.label}</strong> — ${badge.unlocked ? 'Unlocked' : badge.hint}
        </div>
      `).join('');
    }
  }

  function renderFooterStats() {
    const monthly = sumWeight(filterByDateRange(wasteEntries, 'month'));
    const prevented = Math.max(0, reductionGoal - monthly);
    setText('totalWastePrevented', `${prevented.toFixed(1)} kg`);

    const saved = Math.max(0, prevented * 4.2);
    setText('totalSaved', `$${saved.toFixed(0)}`);

    const meals = Math.max(0, Math.round(prevented / 0.45));
    setText('mealsRescued', String(meals));
  }

  function checkAchievements() {
    const weekLbs = sumWeight(filterByDateRange(wasteEntries, 'week')) * KG_TO_LBS;
    if (weekLbs <= AVERAGE_HOUSEHOLD_LBS_PER_WEEK && weekLbs > 0) {
      showAlert('🏅 Achievement: Low Waste Week unlocked!', 'success');
    }
  }

  function saveEntries() {
    localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(wasteEntries));
  }

  function saveReminders() {
    localStorage.setItem(STORAGE_KEYS.reminders, JSON.stringify(reminders));
  }

  function saveShopping() {
    localStorage.setItem(STORAGE_KEYS.shopping, JSON.stringify(shoppingList));
  }

  function pruneEntriesTo12Months() {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - MAX_HISTORY_DAYS);
    wasteEntries = wasteEntries.filter((entry) => new Date(entry.date) >= cutoff);
    saveEntries();
  }

  function aggregateByCategory(entries) {
    return entries.reduce((acc, entry) => {
      const category = entry.groupedCategory || normalizeCategory(entry.category);
      acc[category] = (acc[category] || 0) + entry.weight;
      return acc;
    }, { produce: 0, dairy: 0, meat: 0, grains: 0, 'prepared-meals': 0 });
  }

  function normalizeCategory(category) {
    if (['vegetables', 'fruits'].includes(category)) return 'produce';
    if (['cooked', 'packaged', 'other'].includes(category)) return 'prepared-meals';
    if (category === 'meat') return 'meat';
    if (category === 'dairy') return 'dairy';
    if (category === 'grains') return 'grains';
    return 'prepared-meals';
  }

  function isCompostable(category, type) {
    const compostableCategories = ['vegetables', 'fruits', 'grains', 'cooked'];
    return compostableCategories.includes(category) && type !== 'packaged';
  }

  function getWeekChangePercent() {
    const now = new Date();
    const thisWeekStart = startOfWeek(now);
    const prevWeekStart = new Date(thisWeekStart);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    const prevWeekEnd = new Date(thisWeekStart);
    prevWeekEnd.setMilliseconds(-1);

    const current = wasteEntries.filter(entry => new Date(entry.date) >= thisWeekStart).reduce((sum, entry) => sum + entry.weight, 0);
    const previous = wasteEntries
      .filter(entry => {
        const date = new Date(entry.date);
        return date >= prevWeekStart && date <= prevWeekEnd;
      })
      .reduce((sum, entry) => sum + entry.weight, 0);

    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  function filterByDateRange(entries, scope) {
    const now = new Date();
    if (scope === 'all') return entries;

    let start;
    if (scope === 'today') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (scope === 'week') {
      start = startOfWeek(now);
    } else {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return entries.filter(entry => new Date(entry.date) >= start);
  }

  function filterByPreviousMonth(entries) {
    const now = new Date();
    const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return entries.filter(entry => {
      const date = new Date(entry.date);
      return date >= startPreviousMonth && date < startCurrentMonth;
    });
  }

  function applyFilters(entries, filter) {
    let filtered = [...entries];

    if (filter.category !== 'all') {
      filtered = filtered.filter(entry => entry.category === filter.category);
    }

    if (filter.type !== 'all') {
      filtered = filtered.filter(entry => entry.type === filter.type);
    }

    if (filter.date && filter.date !== 'all') {
      filtered = filterByDateRange(filtered, filter.date);
    }

    return filtered;
  }

  function startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.getFullYear(), d.getMonth(), diff);
  }

  function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatCategory(category) {
    return category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function sumWeight(entries) {
    return entries.reduce((sum, entry) => sum + Number(entry.weight || 0), 0);
  }

  function daysUntil(dateValue) {
    const now = new Date();
    const target = new Date(dateValue);
    const ms = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
  }

  function showAlert(message, type = 'warning') {
    const banner = document.getElementById('alertBanner');
    const msg = document.getElementById('alertMessage');
    if (!banner || !msg) return;

    msg.textContent = message;
    banner.classList.remove('hidden');
    banner.style.borderLeft = type === 'success' ? '4px solid #2e7d32' : '4px solid #ef6c00';
  }

  function hideAlert() {
    const banner = document.getElementById('alertBanner');
    if (banner) banner.classList.add('hidden');
  }

  function valueOf(idName) {
    const node = document.getElementById(idName);
    return node ? node.value.trim() : '';
  }

  function setText(idName, text) {
    const node = document.getElementById(idName);
    if (node) node.textContent = text;
  }

  function id() {
    return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function toLocalDatetimeInput(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  function computeRecentLogStreak() {
    if (!wasteEntries.length) return 0;
    const daySet = new Set(wasteEntries.map(entry => new Date(entry.date).toDateString()));
    let streak = 0;
    const cursor = new Date();
    for (let i = 0; i < 14; i++) {
      const key = cursor.toDateString();
      if (daySet.has(key)) streak += 1;
      else if (i > 0) break;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  window.quickLog = (category, type, weight, itemName) => {
    wasteEntries.push({
      id: id(),
      category,
      groupedCategory: normalizeCategory(category),
      type,
      weight: Number(weight),
      itemName,
      itemCost: 0,
      reason: 'Quick log',
      date: new Date().toISOString(),
      compostable: isCompostable(category, type)
    });
    pruneEntriesTo12Months();
    saveEntries();
    renderAll();
    showAlert(`Quick logged ${itemName}.`, 'success');
  };

  window.addExpiryReminder = () => {
    const name = valueOf('expiryItem');
    const expiryDate = valueOf('expiryDate');
    const location = valueOf('expiryLocation') || 'fridge';

    if (!name || !expiryDate) {
      showAlert('Enter item name and expiry date.');
      return;
    }

    reminders.push({ id: id(), name, expiryDate, location });
    saveReminders();

    document.getElementById('expiryItem').value = '';
    document.getElementById('expiryDate').value = '';
    renderExpiryList();
    showAlert('Expiry reminder added.', 'success');
  };

  window.deleteReminder = (reminderId) => {
    reminders = reminders.filter(item => item.id !== reminderId);
    saveReminders();
    renderExpiryList();
  };

  window.loadMoreRecipes = () => {
    recipeOffset += 3;
    if (recipeOffset >= RECIPES.length) recipeOffset = 0;
    renderRecipes();
  };

  window.rotatStorageTips = () => {
    storageTipOffset = (storageTipOffset + 1) % STORAGE_TIPS.length;
    renderStorageTips();
  };

  window.changePatternView = (view) => {
    currentPatternView = view === 'month' ? 'month' : 'week';
    document.querySelectorAll('.pattern-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.textContent.toLowerCase().includes(currentPatternView));
    });
    renderPatternHeatmap();
  };

  window.toggleGoalEdit = () => {
    const form = document.getElementById('goalEditForm');
    if (form) form.classList.toggle('hidden');
  };

  window.setReductionGoal = (goal) => {
    const input = document.getElementById('newReductionGoal');
    if (input) input.value = goal;
  };

  window.saveReductionGoal = () => {
    const value = Number(valueOf('newReductionGoal') || reductionGoal);
    if (!value || value < 1) {
      showAlert('Goal must be at least 1kg.');
      return;
    }

    reductionGoal = value;
    localStorage.setItem(STORAGE_KEYS.goal, String(reductionGoal));
    renderGoal();
    renderAchievementBadges();
    window.toggleGoalEdit();
    showAlert('Reduction goal updated.', 'success');
  };

  window.addToShoppingList = () => {
    const text = valueOf('newListItem');
    if (!text) return;

    shoppingList.push({ id: id(), text, checked: false });
    saveShopping();
    document.getElementById('newListItem').value = '';
    renderShoppingList();
  };

  window.toggleShoppingItem = (itemId) => {
    shoppingList = shoppingList.map((item) => item.id === itemId ? { ...item, checked: !item.checked } : item);
    saveShopping();
    renderShoppingList();
  };

  window.removeShoppingItem = (itemId) => {
    shoppingList = shoppingList.filter((item) => item.id !== itemId);
    saveShopping();
    renderShoppingList();
  };

  window.exportShoppingList = () => {
    if (!shoppingList.length) {
      showAlert('Shopping list is empty.');
      return;
    }

    const rows = ['Item,Completed', ...shoppingList.map((item) => `${item.text},${item.checked ? 'Yes' : 'No'}`)];
    downloadCsv('smart-shopping-list.csv', rows.join('\n'));
  };

  window.joinFoodChallenge = () => {
    showAlert('You joined the Zero Waste Challenge! Track daily to climb the leaderboard.', 'success');
  };

  window.toggleWasteFilter = () => {
    const panel = document.getElementById('filterPanel');
    if (panel) panel.classList.toggle('hidden');
  };

  window.applyWasteFilter = () => {
    currentFilter = {
      category: valueOf('categoryFilter') || 'all',
      type: valueOf('typeFilter') || 'all',
      date: valueOf('dateFilter') || 'today'
    };
    renderWasteLog();
  };

  window.exportWasteData = () => {
    if (!wasteEntries.length) {
      showAlert('No waste data to export.');
      return;
    }

    const rows = [
      'Date,Category,Grouped Category,Type,Item,Weight (kg),Cost ($),Reason',
      ...wasteEntries.map((entry) => [
        new Date(entry.date).toISOString(),
        entry.category,
        entry.groupedCategory || normalizeCategory(entry.category),
        entry.type,
        (entry.itemName || '').replaceAll(',', ' '),
        Number(entry.weight || 0).toFixed(2),
        Number(entry.itemCost || 0).toFixed(2),
        (entry.reason || '').replaceAll(',', ' ')
      ].join(','))
    ];

    downloadCsv('food-waste-history.csv', rows.join('\n'));
  };

  window.deleteWasteEntry = (entryId) => {
    wasteEntries = wasteEntries.filter((entry) => entry.id !== entryId);
    saveEntries();
    renderAll();
  };

  window.closeAlert = () => hideAlert();

  function downloadCsv(filename, content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
});
