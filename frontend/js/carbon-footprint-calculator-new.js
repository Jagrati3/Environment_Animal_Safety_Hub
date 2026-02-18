/* Carbon Footprint Calculator - Comprehensive JavaScript */

// ==================== CONFIGURATION ====================
const CARBON_EMISSIONS = {
    transport: {
        car: 0.21,           // kg CO2 per km
        suv: 0.27,
        motorcycle: 0.05,
        bus: 0.05,
        train: 0.04,
        bike: 0,
        walk: 0,
        'flight': 0.255,     // kg CO2 per km (short haul)
        'flight-long': 0.195 // kg CO2 per km (long haul)
    },
    energy: {
        electricity: 0.412,  // kg CO2 per kWh
        'natural-gas': 2.04, // kg CO2 per therm
        'heating-oil': 10.2  // kg CO2 per gallon
    },
    food: {
        beef: 0.99,          // kg CO2 per serving
        pork: 0.33,
        chicken: 0.17,
        fish: 0.15,
        dairy: 0.12,
        vegetables: 0.05,
        fruits: 0.04,
        grains: 0.10,
        processed: 0.25
    },
    shopping: 0.005,        // kg CO2 per dollar spent
    waste: {
        general: 0.5,        // kg CO2 per kg waste
        recycled: 0.1,
        composted: 0.05,
        hazardous: 1.0
    }
};

// Achievement badges
const BADGES = [
    { id: 'first-log', name: 'First Step', icon: '👣', description: 'Log your first activity', requirement: 1 },
    { id: 'eco-tracker', name: 'Eco Tracker', icon: '📊', description: 'Log 10 activities', requirement: 10 },
    { id: 'carbon-monitor', name: 'Carbon Monitor', icon: '🌍', description: 'Log 50 activities', requirement: 50 },
    { id: 'low-carbon-day', name: 'Low Carbon Day', icon: '🌱', description: 'Day under 5 kg CO₂e', requirement: { type: 'daily', value: 5 } },
    { id: 'green-week', name: 'Green Week', icon: '🏆', description: 'Weekly avg under 8 kg CO₂e', requirement: { type: 'weekly', value: 8 } },
    { id: 'transport-champ', name: 'Transport Champ', icon: '🚗', description: 'Zero transportation for 7 days', requirement: { type: 'category', value: 7 } },
    { id: 'energy-saver', name: 'Energy Saver', icon: '⚡', description: 'Reduce energy consumption 20%', requirement: { type: 'reduction', value: 20 } },
    { id: 'plant-based', name: 'Plant-Based Pro', icon: '🥗', description: '5 meals without meat', requirement: { type: 'vegan', value: 5 } },
    { id: 'conscious-shopper', name: 'Conscious Shopper', icon: '🛍️', description: 'Track shopping for 30 days', requirement: 30 },
    { id: 'sustainability-guru', name: 'Sustainability Guru', icon: '🌿', description: 'Maintain 90-day streak', requirement: { type: 'streak', value: 90 } }
];

// ==================== STATE MANAGEMENT ====================
let state = {
    activities: [],
    dailyData: {},
    badges: {},
    goals: {
        monthlyReduction: 0,
        targetEmissions: 8.0
    },
    currentTheme: 'light'
};

// Initialize state from localStorage
function initializeState() {
    const saved = localStorage.getItem('carbonFootprintData');
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load saved data:', e);
        }
    }
    
    // Initialize badges
    BADGES.forEach(badge => {
        if (!state.badges[badge.id]) {
            state.badges[badge.id] = { unlocked: false, unlockedDate: null };
        }
    });
    
    loadTheme();
    saveState();
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('carbonFootprintData', JSON.stringify(state));
}

// ==================== THEME MANAGEMENT ====================
function loadTheme() {
    const theme = localStorage.getItem('carbonTheme') || 'light';
    state.currentTheme = theme;
    applyTheme(theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('carbonTheme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }
});

// ==================== ACTIVITY MANAGEMENT ====================
function addActivity(category) {
    let activity = null;
    const today = new Date().toISOString().split('T')[0];
    
    switch(category) {
        case 'transport':
            const transportType = document.getElementById('transportType').value;
            const distance = parseFloat(document.getElementById('transportDistance').value) || 0;
            const emission = CARBON_EMISSIONS.transport[transportType] * distance;
            activity = {
                id: Date.now(),
                category: 'transport',
                type: transportType,
                value: distance,
                unit: 'km',
                co2: emission,
                date: today,
                timestamp: new Date(),
                description: `${transportType.toUpperCase()}: ${distance} km`
            };
            break;
            
        case 'energy':
            const energySource = document.getElementById('energySource').value;
            const energyAmount = parseFloat(document.getElementById('energyAmount').value) || 0;
            const energyUnit = document.getElementById('energyUnit').value;
            let convAmount = energyAmount;
            if (energyUnit === 'mwh') convAmount *= 1000;
            const energyEmission = CARBON_EMISSIONS.energy[energySource] * convAmount;
            activity = {
                id: Date.now(),
                category: 'energy',
                type: energySource,
                value: energyAmount,
                unit: energyUnit,
                co2: energyEmission,
                date: today,
                timestamp: new Date(),
                description: `${energySource.toUpperCase()}: ${energyAmount} ${energyUnit}`
            };
            break;
            
        case 'food':
            const foodType = document.getElementById('foodType').value;
            const foodQuantity = parseFloat(document.getElementById('foodQuantity').value) || 0;
            const foodEmission = CARBON_EMISSIONS.food[foodType] * foodQuantity;
            activity = {
                id: Date.now(),
                category: 'food',
                type: foodType,
                value: foodQuantity,
                unit: 'servings',
                co2: foodEmission,
                date: today,
                timestamp: new Date(),
                description: `${foodType.toUpperCase()}: ${foodQuantity} servings`
            };
            break;
            
        case 'shopping':
            const shoppingCategory = document.getElementById('shoppingCategory').value;
            const shoppingAmount = parseFloat(document.getElementById('shoppingAmount').value) || 0;
            const shoppingEmission = shoppingAmount * CARBON_EMISSIONS.shopping;
            activity = {
                id: Date.now(),
                category: 'shopping',
                type: shoppingCategory,
                value: shoppingAmount,
                unit: '$',
                co2: shoppingEmission,
                date: today,
                timestamp: new Date(),
                description: `${shoppingCategory.toUpperCase()}: $${shoppingAmount}`
            };
            break;
            
        case 'waste':
            const wasteType = document.getElementById('wasteType').value;
            const wasteWeight = parseFloat(document.getElementById('wasteWeight').value) || 0;
            const wasteEmission = CARBON_EMISSIONS.waste[wasteType] * wasteWeight;
            activity = {
                id: Date.now(),
                category: 'waste',
                type: wasteType,
                value: wasteWeight,
                unit: 'kg',
                co2: wasteEmission,
                date: today,
                timestamp: new Date(),
                description: `${wasteType.toUpperCase()}: ${wasteWeight} kg`
            };
            break;
    }
    
    if (activity && activity.co2 > 0) {
        state.activities.push(activity);
        saveState();
        updateDashboard();
        displayTodayActivities();
        clearForm(category);
        
        // Check badge unlocks
        checkBadgeUnlock('first-log');
        checkBadgeUnlock('eco-tracker');
        checkBadgeUnlock('carbon-monitor');
    }
}

function clearForm(category) {
    if (category === 'transport') {
        document.getElementById('transportType').value = 'car';
        document.getElementById('transportDistance').value = '';
    } else if (category === 'energy') {
        document.getElementById('energySource').value = 'electricity';
        document.getElementById('energyAmount').value = '';
    } else if (category === 'food') {
        document.getElementById('foodType').value = 'beef';
        document.getElementById('foodQuantity').value = '';
    } else if (category === 'shopping') {
        document.getElementById('shoppingCategory').value = 'clothing';
        document.getElementById('shoppingAmount').value = '';
    } else if (category === 'waste') {
        document.getElementById('wasteType').value = 'general';
        document.getElementById('wasteWeight').value = '';
    }
}

function displayTodayActivities() {
    const today = new Date().toISOString().split('T')[0];
    const todayActivities = state.activities.filter(a => a.date === today);
    const list = document.getElementById('activitiesList');
    
    if (todayActivities.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #888;">No activities logged today yet</p>';
        return;
    }
    
    list.innerHTML = todayActivities.map(activity => `
        <div class="activity-item" style="border-left-color: ${getCategoryColor(activity.category)};">
            <div class="activity-info">
                <h4>${activity.description}</h4>
                <p>${new Date(activity.timestamp).toLocaleTimeString()}</p>
            </div>
            <div class="activity-co2">${activity.co2.toFixed(2)}<br><span style="font-size: 0.75rem;">kg CO₂</span></div>
        </div>
    `).join('');
}

function getCategoryColor(category) {
    const colors = {
        transport: '#ff6b6b',
        energy: '#ffd93d',
        food: '#6bcf7f',
        shopping: '#4d96ff',
        waste: '#a78bfa'
    };
    return colors[category] || '#10b981';
}

// ==================== DASHBOARD UPDATES ====================
function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    // Today's footprint
    const todayActivities = state.activities.filter(a => a.date === today);
    const todayTotal = todayActivities.reduce((sum, a) => sum + a.co2, 0);
    document.getElementById('todayFootprint').textContent = todayTotal.toFixed(1);
    
    // Monthly average
    const last30Activities = state.activities.filter(a => new Date(a.date) > last30Days);
    const uniqueDays = new Set(last30Activities.map(a => a.date)).size || 1;
    const monthlyTotal = last30Activities.reduce((sum, a) => sum + a.co2, 0);
    const monthlyAvg = monthlyTotal / (uniqueDays || 1);
    document.getElementById('monthlyAverage').textContent = monthlyAvg.toFixed(1);
    
    // Goal progress
    const goalProgress = Math.min(100, Math.round((monthlyAvg / state.goals.targetEmissions) * 100));
    document.getElementById('goalProgress').textContent = goalProgress;
    
    // Reduction score (30-day trend)
    updateReductionScore();
    
    // Category totals
    updateCategoryTotals(today);
    
    // Update charts
    updateCharts();
    
    // Update insights
    updateAIInsights();
    
    // Generate badges
    generateBadgesDisplay();
}

function updateCategoryTotals(today) {
    const categories = ['transport', 'energy', 'food', 'shopping', 'waste'];
    let totalEmissions = 0;
    const categoryTotals = {};
    
    categories.forEach(cat => {
        const catEmissions = state.activities
            .filter(a => a.category === cat && a.date === today)
            .reduce((sum, a) => sum + a.co2, 0);
        categoryTotals[cat] = catEmissions;
        totalEmissions += catEmissions;
    });
    
    categories.forEach(cat => {
        const percent = totalEmissions > 0 ? ((categoryTotals[cat] / totalEmissions) * 100) : 0;
        document.getElementById(cat + 'Total').textContent = categoryTotals[cat].toFixed(1) + ' kg';
        document.getElementById(cat + 'Percent').textContent = Math.round(percent) + '%';
    });
}

function updateReductionScore() {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const last60Days = new Date();
    last60Days.setDate(last60Days.getDate() - 60);
    
    const period1 = state.activities.filter(a => new Date(a.date) > last30Days);
    const period2 = state.activities.filter(a => {
        const d = new Date(a.date);
        return d > last60Days && d <= last30Days;
    });
    
    const avg1 = period1.length > 0 ? period1.reduce((s, a) => s + a.co2, 0) / new Set(period1.map(a => a.date)).size : 0;
    const avg2 = period2.length > 0 ? period2.reduce((s, a) => s + a.co2, 0) / new Set(period2.map(a => a.date)).size : 0;
    
    const reduction = avg2 > 0 ? Math.round(((avg2 - avg1) / avg2) * 100) : 0;
    document.getElementById('reductionScore').textContent = (reduction > 0 ? '+' : '') + reduction + '%';
}

// ==================== CHART MANAGEMENT ====================
let charts = {
    daily: null,
    category: null,
    monthly: null,
    trend: null,
    categoryTrend: null
};

function updateCharts() {
    updateDailyChart();
    updateCategoryChart();
    updateMonthlyChart();
    updateTrendChart();
    updateCategoryTrendChart();
}

function updateDailyChart() {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const labels = [];
    const data = [];
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        const dayEmissions = state.activities
            .filter(a => a.date === dateStr)
            .reduce((sum, a) => sum + a.co2, 0);
        data.push(dayEmissions);
    }
    
    const ctx = document.getElementById('dailyChart');
    if (!ctx) return;
    
    if (charts.daily) charts.daily.destroy();
    
    charts.daily = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily CO₂e (kg)',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'kg CO₂e' }
                }
            }
        }
    });
}

function updateCategoryChart() {
    const today = new Date().toISOString().split('T')[0];
    const categories = ['transport', 'energy', 'food', 'shopping', 'waste'];
    const data = categories.map(cat => 
        state.activities
            .filter(a => a.category === cat && a.date === today)
            .reduce((sum, a) => sum + a.co2, 0)
    );
    
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    if (charts.category) charts.category.destroy();
    
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#a78bfa'];
    
    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
            datasets: [{
                data: data,
                backgroundColor: colors
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

function updateMonthlyChart() {
    const months = [];
    const monthData = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
        months.push(monthStr);
        
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const monthEmissions = state.activities
            .filter(a => {
                const d = new Date(a.date);
                return d >= monthStart && d <= monthEnd;
            })
            .reduce((sum, a) => sum + a.co2, 0);
        
        const uniqueDays = new Set(state.activities
            .filter(a => {
                const d = new Date(a.date);
                return d >= monthStart && d <= monthEnd;
            })
            .map(a => a.date)).size || 1;
        
        monthData.push(monthEmissions / uniqueDays);
    }
    
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;
    
    if (charts.monthly) charts.monthly.destroy();
    
    charts.monthly = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Avg Daily CO₂e (kg)',
                data: monthData,
                backgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function updateTrendChart() {
    const periodBtn = document.querySelector('.period-btn.active');
    const period = periodBtn ? parseInt(periodBtn.dataset.period) : 30;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);
    
    const labels = [];
    const data = [];
    
    for (let i = period - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        const dayEmissions = state.activities
            .filter(a => a.date === dateStr)
            .reduce((sum, a) => sum + a.co2, 0);
        data.push(dayEmissions);
    }
    
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    if (charts.trend) charts.trend.destroy();
    
    charts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily CO₂e Trend',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointBackgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function updateCategoryTrendChart() {
    const categories = ['transport', 'energy', 'food'];
    const labels = [];
    const datasets = [];
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f'];
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    categories.forEach((cat, idx) => {
        const data = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const catEmissions = state.activities
                .filter(a => a.category === cat && a.date === dateStr)
                .reduce((sum, a) => sum + a.co2, 0);
            data.push(catEmissions);
        }
        
        datasets.push({
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
            data: data,
            borderColor: colors[idx],
            backgroundColor: colors[idx] + '33',
            tension: 0.4,
            fill: false,
            pointRadius: 2
        });
    });
    
    const ctx = document.getElementById('categoryTrendChart');
    if (!ctx) return;
    
    if (charts.categoryTrend) charts.categoryTrend.destroy();
    
    charts.categoryTrend = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// ==================== HISTORY STATISTICS ====================
function updateHistoryStats() {
    const periodBtn = document.querySelector('.period-btn.active');
    const period = periodBtn ? parseInt(periodBtn.dataset.period) : 30;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);
    
    let maxDay = 0;
    let minDay = Infinity;
    let total = 0;
    const dailyTotals = {};
    
    state.activities
        .filter(a => new Date(a.date) >= startDate)
        .forEach(a => {
            if (!dailyTotals[a.date]) dailyTotals[a.date] = 0;
            dailyTotals[a.date] += a.co2;
            total += a.co2;
        });
    
    Object.values(dailyTotals).forEach(daily => {
        maxDay = Math.max(maxDay, daily);
        minDay = Math.min(minDay, daily);
    });
    
    const avgDay = Object.keys(dailyTotals).length > 0 ? total / Object.keys(dailyTotals).length : 0;
    
    document.getElementById('highestDay').textContent = maxDay.toFixed(1);
    document.getElementById('lowestDay').textContent = (minDay === Infinity ? 0 : minDay).toFixed(1);
    document.getElementById('avgDay').textContent = avgDay.toFixed(1);
    document.getElementById('totalEmissions').textContent = total.toFixed(1);
}

// ==================== AI INSIGHTS ==================== 
function updateAIInsights() {
    const today = new Date().toISOString().split('T')[0];
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    
    // Get category breakdown
    const categories = {};
    state.activities
        .filter(a => new Date(a.date) >= last7Days)
        .forEach(a => {
            if (!categories[a.category]) categories[a.category] = 0;
            categories[a.category] += a.co2;
        });
    
    // Generate recommendations
    const recommendations = generateRecommendations(categories);
    displayRecommendations(recommendations);
    
    // Update comparison
    const todayTotal = state.activities
        .filter(a => a.date === today)
        .reduce((sum, a) => sum + a.co2, 0);
    
    const globalAvg = 16.0;
    const percent = Math.round((todayTotal / globalAvg) * 100);
    document.getElementById('yourAvgValue').textContent = todayTotal.toFixed(1) + ' kg/day';
    const yourAvgBar = document.querySelector('#yourAvgBar');
    if (yourAvgBar) {
        yourAvgBar.style.width = Math.min(100, percent) + '%';
    }
    
    // Generate AI analysis
    generateAIAnalysis(categories, todayTotal);
}

function generateRecommendations(categories) {
    const recommendations = [];
    
    if (categories.transport > 5) {
        recommendations.push({
            title: 'Reduce Transportation',
            description: 'Transportation is your largest source. Try carpooling, public transit, or cycling.',
            impact: 'Could save ~2-3 kg CO₂e daily'
        });
    }
    
    if (categories.energy > 4) {
        recommendations.push({
            title: 'Lower Energy Usage',
            description: 'Switch to renewable energy or improve insulation to reduce heating/cooling needs.',
            impact: 'Could save ~1-2 kg CO₂e daily'
        });
    }
    
    if (categories.food > 2) {
        recommendations.push({
            title: 'Plant-Based Eating',
            description: 'Swap one meat meal weekly for plant-based alternatives.',
            impact: 'Could save ~0.5 kg CO₂e daily'
        });
    }
    
    if (categories.shopping > 1) {
        recommendations.push({
            title: 'Mindful Shopping',
            description: 'Buy secondhand, choose durable items, and avoid impulse purchases.',
            impact: 'Could save ~0.3 kg CO₂e daily'
        });
    }
    
    if (!recommendations.length) {
        recommendations.push({
            title: 'Great Job!',
            description: 'Your carbon footprint is well-balanced. Keep up the sustainable practices!',
            impact: 'You\'re below average'
        });
    }
    
    return recommendations;
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('aiRecommendations');
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
            <p style="color: #10b981; font-weight: 600; margin-top: 0.5rem;">${rec.impact}</p>
        </div>
    `).join('');
}

function generateAIAnalysis(categories, todayTotal) {
    const container = document.getElementById('aiAnalysis');
    
    let analysis = `<p>`;
    
    if (todayTotal < 5) {
        analysis += `🌟 Excellent! Your ${todayTotal.toFixed(1)} kg CO₂e footprint today is well below average. Keep maintaining these sustainable habits!`;
    } else if (todayTotal < 8) {
        analysis += `✅ Good effort! Your ${todayTotal.toFixed(1)} kg CO₂e is close to the global average. Small optimizations could help further.`;
    } else if (todayTotal < 12) {
        analysis += `⚠️ Your ${todayTotal.toFixed(1)} kg CO₂e is slightly above average. Focus on the highest-impact areas.`;
    } else {
        analysis += `❌ Your ${todayTotal.toFixed(1)} kg CO₂e is significantly higher than global average. Prioritize transportation and energy reductions.`;
    }
    
    analysis += `</p>`;
    
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    if (topCategory) {
        analysis += `<p style="margin-top: 1rem;">Your largest impact comes from <strong>${topCategory[0]}</strong> (${topCategory[1].toFixed(1)} kg CO₂e). This is a great area to focus improvements.</p>`;
    }
    
    container.innerHTML = analysis;
}

function setReductionGoal() {
    const goal = parseFloat(document.getElementById('goalTarget').value) || 10;
    state.goals.monthlyReduction = goal;
    saveState();
    alert(`Reduction goal set to ${goal}%`);
}

// ==================== BADGE SYSTEM ==================== 
function checkBadgeUnlock(badgeId) {
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge || state.badges[badgeId].unlocked) return;
    
    let unlocked = false;
    const activityCount = state.activities.length;
    
    if (badgeId === 'first-log' && activityCount >= 1) unlocked = true;
    if (badgeId === 'eco-tracker' && activityCount >= 10) unlocked = true;
    if (badgeId === 'carbon-monitor' && activityCount >= 50) unlocked = true;
    
    if (unlocked) {
        state.badges[badgeId].unlocked = true;
        state.badges[badgeId].unlockedDate = new Date().toISOString();
        saveState();
        displayBadgeNotification(badge);
    }
}

function displayBadgeNotification(badge) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        animation: slideUp 0.4s ease-out;
        z-index: 1000;
    `;
    notif.innerHTML = `<strong>🏆 Badge Unlocked!</strong><p>${badge.icon} ${badge.name}</p>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

function generateBadgesDisplay() {
    const container = document.getElementById('badgesGrid');
    if (!container) return;
    
    container.innerHTML = BADGES.map(badge => {
        const unlocked = state.badges[badge.id].unlocked;
        return `
            <div class="badge ${unlocked ? 'unlocked' : 'locked'} ${!unlocked ? 'badge-locked' : ''}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
                ${unlocked ? `<p style="margin-top: 0.5rem; font-size: 0.7rem; color: #10b981;">✓ Unlocked</p>` : ''}
            </div>
        `;
    }).join('');
}

// ==================== EXPORT FUNCTIONALITY ==================== 
function exportData(format) {
    if (format === 'pdf') {
        exportPDF();
    } else if (format === 'csv') {
        exportCSV();
    } else if (format === 'json') {
        exportJSON();
    } else if (format === 'print') {
        printData();
    }
}

function exportPDF() {
    alert('PDF export would require jsPDF library. For now, use Print to PDF feature.');
    printData();
}

function exportCSV() {
    let csv = 'Date,Category,Type,Value,Unit,CO2 Emissions (kg)\n';
    
    state.activities.forEach(activity => {
        csv += `${activity.date},${activity.category},${activity.type},${activity.value},${activity.unit},${activity.co2}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    downloadFile(blob, 'carbon-footprint-data.csv');
}

function exportJSON() {
    const data = {
        exportDate: new Date().toISOString(),
        activities: state.activities,
        badges: state.badges,
        goals: state.goals
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadFile(blob, 'carbon-footprint-data.json');
}

function printData() {
    window.print();
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==================== TAB SWITCHING ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tracker-form').forEach(f => f.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const category = btn.dataset.category;
            const form = document.getElementById(category + '-form');
            if (form) form.classList.add('active');
        });
    });
    
    // Period buttons for history
    const periodButtons = document.querySelectorAll('.period-btn');
    periodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            periodButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateHistoryStats();
            updateTrendChart();
        });
    });
    
    // Initialize
    initializeState();
    updateDashboard();
    displayTodayActivities();
    updateHistoryStats();
    generateBadgesDisplay();
    
    // Auto-save every 10 seconds
    setInterval(saveState, 10000);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
