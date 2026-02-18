// Green Commute Optimizer Application Logic

// Initialize app data structure
const appData = {
    profile: {},
    trips: [],
    leaderboard: [],
    achievements: [],
    userStats: {
        cosrSavedWeekly: 0,
        moneySavedWeekly: 0,
        totalTrips: 0,
        ecoScore: 0
    }
};

// CO2 Emissions data (kg CO2 per mile)
const co2Emissions = {
    'car-alone': 0.405,
    'carpool': 0.202,
    'carpool-4': 0.101,
    'bus': 0.089,
    'train': 0.041,
    'bike': 0,
    'scooter': 0.02,
    'walk': 0,
    'hybrid': 0.15
};

// Cost data ($ per mile)
const costs = {
    'car-alone': 0.32,
    'carpool': 0.16,
    'carpool-4': 0.10,
    'bus': 0.08,
    'train': 0.12,
    'bike': 0,
    'scooter': 0.05,
    'walk': 0,
    'hybrid': 0.15
};

// Load data from storage
function loadData() {
    const stored = localStorage.getItem('greenCommuteData');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            appData.profile = data.profile || {};
            appData.trips = data.trips || [];
            appData.leaderboard = data.leaderboard || [];
            appData.achievements = data.achievements || [];
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}

// Save data to storage
function saveData() {
    localStorage.setItem('greenCommuteData', JSON.stringify(appData));
}

// Set today's date as default
document.getElementById('tripDate').valueAsDate = new Date();

// Tab Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        
        navTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Update relevant data when switching tabs
        if (tabName === 'analytics') {
            updateAnalytics();
        } else if (tabName === 'leaderboard') {
            updateLeaderboard();
        }
    });
});

// Route Options Database
const routeOptions = {
    'car-alone': {
        name: 'Drive Alone',
        icon: '🚗',
        defaultTime: 25,
        reliability: 0.7,
        exposure: 'High',
        health: 'Low',
        score: 2
    },
    'carpool': {
        name: 'Carpool (2-3)',
        icon: '🚗',
        defaultTime: 28,
        reliability: 0.85,
        exposure: 'Medium',
        health: 'Low',
        score: 5
    },
    'carpool-4': {
        name: 'Carpool (4+)',
        icon: '🚗',
        defaultTime: 30,
        reliability: 0.80,
        exposure: 'Medium',
        health: 'Low',
        score: 7
    },
    'bus': {
        name: 'Bus',
        icon: '🚌',
        defaultTime: 35,
        reliability: 0.75,
        exposure: 'Medium',
        health: 'Medium',
        score: 7
    },
    'train': {
        name: 'Train/Rail',
        icon: '🚆',
        defaultTime: 30,
        reliability: 0.90,
        exposure: 'Low',
        health: 'Medium',
        score: 8
    },
    'bike': {
        name: 'Bike',
        icon: '🚴',
        defaultTime: 40,
        reliability: 0.95,
        exposure: 'Low',
        health: 'High',
        score: 9
    },
    'scooter': {
        name: 'E-Scooter',
        icon: '🛴',
        defaultTime: 32,
        reliability: 0.80,
        exposure: 'Low',
        health: 'High',
        score: 8
    },
    'walk': {
        name: 'Walk',
        icon: '🚶',
        defaultTime: 50,
        reliability: 0.99,
        exposure: 'Very Low',
        health: 'Very High',
        score: 10
    }
};

// Planner Form
const plannerForm = document.getElementById('plannerForm');

plannerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    appData.profile = {
        startLocation: document.getElementById('startLocation').value,
        endLocation: document.getElementById('endLocation').value,
        commuteDays: parseInt(document.getElementById('commuteDays').value),
        distance: parseFloat(document.getElementById('commuteDist').value)
    };
    
    saveData();
    showNotification('Commute profile saved!', 'success');
    updateRouteComparison();
    renderTodayRoutes();
});

// Calculate CO2 for a trip
function calculateCO2(mode, distance) {
    return distance * co2Emissions[mode];
}

// Calculate cost for a trip
function calculateCost(mode, distance) {
    return distance * costs[mode];
}

// Update route comparison table
function updateRouteComparison() {
    if (!appData.profile.distance) {
        return;
    }

    const distance = appData.profile.distance;
    const modesContainer = document.getElementById('comparisonModes');
    
    let html = '';
    
    for (const [key, data] of Object.entries(routeOptions)) {
        if (key === 'carpool') key = key;
        
        const co2 = calculateCO2(key, distance);
        const cost = calculateCost(key, distance);
        const time = data.defaultTime;
        
        html += `
            <div class="table-row" onclick="selectModeDetails('${key}')">
                <div class="table-cell"><span class="mode-icon">${data.icon}</span></div>
                <div class="table-cell">${time} min</div>
                <div class="table-cell">$${cost.toFixed(2)}</div>
                <div class="table-cell">${co2.toFixed(2)} kg</div>
                <div class="table-cell">${Math.round(data.reliability * 100)}%</div>
                <div class="table-cell">${data.exposure}</div>
                <div class="table-cell"><span class="score-badge" style="background-color: hsl(${data.score * 12}, 75%, 65%)">${data.score}/10</span></div>
            </div>
        `;
    }
    
    modesContainer.innerHTML = html;
}

// Select and display mode details
function selectModeDetails(mode) {
    const distance = appData.profile.distance || 15;
    const data = routeOptions[mode];
    
    const co2 = calculateCO2(mode, distance).toFixed(2);
    const cost = calculateCost(mode, distance).toFixed(2);
    
    let detailsHtml = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div class="mode-detail-item">
                <div class="detail-header">🕐 Time</div>
                <div class="detail-content">${data.defaultTime} minutes</div>
            </div>
            <div class="mode-detail-item">
                <div class="detail-header">💰 Cost</div>
                <div class="detail-content">$${cost}</div>
            </div>
            <div class="mode-detail-item">
                <div class="detail-header">🌍 CO₂ Emissions</div>
                <div class="detail-content">${co2} kg</div>
            </div>
            <div class="mode-detail-item">
                <div class="detail-header">✓ Reliability</div>
                <div class="detail-content">${Math.round(data.reliability * 100)}%</div>
            </div>
            <div class="mode-detail-item">
                <div class="detail-header">☁️ Air Exposure</div>
                <div class="detail-content">${data.exposure}</div>
            </div>
            <div class="mode-detail-item">
                <div class="detail-header">❤️ Health Impact</div>
                <div class="detail-content">${data.health}</div>
            </div>
        </div>
    `;
    
    document.getElementById('modeDetails').innerHTML = detailsHtml;
}

// Render today's best routes
function renderTodayRoutes() {
    if (!appData.profile.distance) {
        document.getElementById('todayRoutes').innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Set your commute profile to see route recommendations</p>';
        return;
    }
    
    const distance = appData.profile.distance;
    let bestMode = 'walk';
    let bestScore = 0;
    
    let html = '';
    
    for (const [key, data] of Object.entries(routeOptions)) {
        const co2 = calculateCO2(key, distance);
        const score = data.score;
        
        if (score > bestScore) {
            bestScore = score;
            bestMode = key;
        }
        
        const isRecommended = key === bestMode ? 'selected' : '';
        
        html += `
            <div class="route-option ${isRecommended}" onclick="selectRoute('${key}')">
                <div class="route-icon">${data.icon}</div>
                <span class="route-name">${data.name}</span>
                <span class="route-score">Score: ${score}/10</span>
            </div>
        `;
    }
    
    document.getElementById('todayRoutes').innerHTML = html;
    selectRoute(bestMode);
}

// Select a route
function selectRoute(mode) {
    selectModeDetails(mode);
    
    // Update selected styling
    document.querySelectorAll('.route-option').forEach(opt => opt.classList.remove('selected'));
    event.currentTarget?.classList.add('selected');
}

// Trip Logger Form
const tripLoggerForm = document.getElementById('tripLoggerForm');

tripLoggerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const trip = {
        id: Date.now(),
        date: document.getElementById('tripDate').value,
        mode: document.getElementById('tripMode').value,
        time: parseInt(document.getElementById('tripTime').value),
        distance: parseFloat(document.getElementById('tripDistance').value),
        cost: parseFloat(document.getElementById('tripCost').value) || 0,
        notes: document.getElementById('tripNotes').value,
        co2: calculateCO2(document.getElementById('tripMode').value, parseFloat(document.getElementById('tripDistance').value))
    };
    
    appData.trips.push(trip);
    saveData();
    
    // Reset form
    tripLoggerForm.reset();
    document.getElementById('tripDate').valueAsDate = new Date();
    
    showNotification('Trip logged successfully!', 'success');
    updateRecentTrips();
    updateDashboard();
});

// Display recent trips
function updateRecentTrips() {
    const tripsList = document.getElementById('tripsList');
    
    if (appData.trips.length === 0) {
        tripsList.innerHTML = '<p class="empty-state">No trips logged yet. Start tracking your commutes!</p>';
        return;
    }
    
    const recentTrips = appData.trips.slice().reverse().slice(0, 10);
    
    tripsList.innerHTML = recentTrips.map(trip => `
        <div class="trip-entry">
            <div class="trip-header">
                <span class="trip-mode">${getTripModeDisplay(trip.mode)}</span>
                <span class="trip-date">${new Date(trip.date).toLocaleDateString()}</span>
            </div>
            <div class="trip-details">
                <div class="trip-detail">
                    <span>🕐 ${trip.time} min</span>
                </div>
                <div class="trip-detail">
                    <span>📍 ${trip.distance.toFixed(1)} mi</span>
                </div>
                <div class="trip-detail">
                    <span>💰 $${trip.cost.toFixed(2)}</span>
                </div>
                <div class="trip-detail">
                    <span class="trip-co2">🌍 ${trip.co2.toFixed(2)} kg CO₂</span>
                </div>
            </div>
            ${trip.notes ? `<p style="margin-top: 8px; font-size: 12px; color: var(--text-secondary);">${trip.notes}</p>` : ''}
            <button class="trip-delete" onclick="deleteTrip(${trip.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Get trip mode display
function getTripModeDisplay(mode) {
    const modeMap = {
        'car-alone': '🚗 Driving Alone',
        'carpool': '🚗 Carpooling',
        'carpool-4': '🚗 Carpooling (4+)',
        'bus': '🚌 Bus',
        'train': '🚆 Train',
        'bike': '🚴 Bike',
        'scooter': '🛴 E-Scooter',
        'walk': '🚶 Walk',
        'hybrid': '🔄 Multi-mode'
    };
    return modeMap[mode] || mode;
}

// Delete trip
function deleteTrip(id) {
    if (confirm('Delete this trip?')) {
        appData.trips = appData.trips.filter(t => t.id !== id);
        saveData();
        updateRecentTrips();
        updateDashboard();
    }
}

// Calculate weekly stats
function calculateWeeklyStats() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyTrips = appData.trips.filter(t => new Date(t.date) >= oneWeekAgo);
    
    let totalCO2 = 0;
    let totalCost = 0;
    let transitCount = 0;
    let bikeCount = 0;
    let carpoolCount = 0;
    let soloCount = 0;
    
    weeklyTrips.forEach(trip => {
        totalCO2 += trip.co2;
        totalCost += trip.cost;
        
        if (trip.mode === 'bus' || trip.mode === 'train') transitCount++;
        if (trip.mode === 'bike' || trip.mode === 'walk') bikeCount++;
        if (trip.mode === 'carpool' || trip.mode === 'carpool-4') carpoolCount++;
        if (trip.mode === 'car-alone') soloCount++;
    });
    
    return {
        co2: totalCO2,
        cost: totalCost,
        trips: weeklyTrips.length,
        transit: transitCount,
        bike: bikeCount,
        carpool: carpoolCount,
        solo: soloCount
    };
}

// Update dashboard
function updateDashboard() {
    const stats = calculateWeeklyStats();
    
    document.getElementById('weekCO2Saved').textContent = stats.co2.toFixed(1) + ' kg';
    document.getElementById('moneySaved').textContent = '$' + stats.cost.toFixed(2);
    document.getElementById('tripsLogged').textContent = stats.trips;
    
    // Calculate eco score
    let ecoScore = 0;
    ecoScore += stats.transit * 15;
    ecoScore += stats.bike * 20;
    ecoScore += stats.carpool * 10;
    ecoScore -= stats.solo * 8;
    
    ecoScore = Math.max(0, Math.min(100, ecoScore));
    document.getElementById('ecoScore').textContent = ecoScore;
    
    const scoreRank = ecoScore >= 80 ? 'Excellent' : ecoScore >= 60 ? 'Good' : ecoScore >= 40 ? 'Fair' : 'Needs Improvement';
    document.getElementById('scoreRank').textContent = scoreRank;
    
    // Update goal progress
    document.getElementById('transitCount').textContent = `${stats.transit}/7`;
    document.getElementById('bikeCount').textContent = `${stats.bike}/7`;
    document.getElementById('carpoolCount').textContent = `${stats.carpool}/3`;
    document.getElementById('soloCount').textContent = `${stats.solo}/2`;
    
    document.getElementById('transitBar').style.width = Math.min(100, (stats.transit / 7) * 100) + '%';
    document.getElementById('bikeBar').style.width = Math.min(100, (stats.bike / 7) * 100) + '%';
    document.getElementById('carpoolBar').style.width = Math.min(100, (stats.carpool / 3) * 100) + '%';
    document.getElementById('soloBar').style.width = Math.min(100, (stats.solo / 2) * 100) + '%';
}

// Update analytics
function updateAnalytics() {
    const stats = calculateWeeklyStats();
    
    // Fill CO2 chart
    const co2Chart = document.getElementById('co2Chart');
    let co2Html = '';
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayTrips = appData.trips.filter(t => t.date === dateStr);
        const dayCO2 = dayTrips.reduce((sum, t) => sum + t.co2, 0);
        const maxCO2 = 20;
        
        co2Html += `
            <div class="week-bar">
                <div class="week-label">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="week-bar-visual">
                    <div class="week-bar-fill" style="width: ${(dayCO2 / maxCO2) * 100}%">
                        ${dayCO2 > 0 ? dayCO2.toFixed(1) : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    co2Chart.innerHTML = co2Html;
    
    // Mode breakdown
    const modeBreakdown = document.getElementById('modeBreakdown');
    const modeCounts = {};
    
    appData.trips.forEach(trip => {
        modeCounts[trip.mode] = (modeCounts[trip.mode] || 0) + 1;
    });
    
    let breakdownHtml = '';
    for (const [mode, count] of Object.entries(modeCounts)) {
        const modeData = routeOptions[mode];
        breakdownHtml += `
            <div class="breakdown-item">
                <div class="breakdown-icon">${modeData.icon}</div>
                <div class="breakdown-info">
                    <span class="breakdown-label">${modeData.name}</span>
                    <span class="breakdown-value">${count} trips</span>
                </div>
            </div>
        `;
    }
    
    modeBreakdown.innerHTML = breakdownHtml || '<p style="text-align: center; color: var(--text-secondary);">No trip data yet</p>';
    
    // Update metrics
    document.getElementById('avgCost').textContent = stats.trips > 0 ? '$' + (stats.cost / stats.trips).toFixed(2) : '$0';
    document.getElementById('avgCO2').textContent = stats.trips > 0 ? (stats.co2 / stats.trips).toFixed(2) + ' kg' : '0 kg';
    document.getElementById('totalDist').textContent = (appData.trips.reduce((sum, t) => sum + t.distance, 0)).toFixed(0) + ' mi';
    document.getElementById('totalCost').textContent = '$' + appData.trips.reduce((sum, t) => sum + t.cost, 0).toFixed(2);
    
    // Environmental impact
    const co2Saved = stats.co2;
    const treesEquiv = Math.round(co2Saved / 21);
    const energySaved = Math.round((co2Saved / 0.4) * 10);
    const waterSaved = Math.round(co2Saved * 13.2);
    
    document.getElementById('treesEquiv').textContent = treesEquiv + ' trees';
    document.getElementById('energySaved').textContent = energySaved + ' kWh';
    document.getElementById('waterSaved').textContent = waterSaved + ' gal';
    document.getElementById('emissionsAvoided').textContent = co2Saved.toFixed(1) + ' kg CO₂';
    
    // Health benefits
    const activeTrips = appData.trips.filter(t => t.mode === 'bike' || t.mode === 'walk').length;
    const activeTime = activeTrips * 0.75;
    const caloriesBurned = Math.round(activeTrips * 225);
    
    document.getElementById('activeTime').textContent = activeTime.toFixed(1) + ' hours';
    document.getElementById('caloriesBurned').textContent = caloriesBurned + ' cal';
    
    const airQuality = stats.co2 > 15 ? 'Moderate' : stats.co2 > 8 ? 'Good' : 'Excellent';
    document.getElementById('airQuality').textContent = airQuality;
}

// Update leaderboard
function updateLeaderboard() {
    const stats = calculateWeeklyStats();
    
    // Generate mock leaderboard with user's data
    const leaderboardData = [
        { rank: 1, name: 'Sarah Green', trips: 7, score: 95, co2: 2.1, badge: '🏆' },
        { rank: 2, name: 'John Bike', trips: 6, score: 88, co2: 5.5, badge: '🥈' },
        { rank: 3, name: 'You', trips: stats.trips, score: Math.min(100, stats.transit * 15 + stats.bike * 20), co2: stats.co2, badge: '🥉' },
        { rank: 4, name: 'Emma Transit', trips: 5, score: 72, co2: 8.3, badge: '' },
        { rank: 5, name: 'Mike Car', trips: 4, score: 45, co2: 18.2, badge: '' }
    ];
    
    // Sort by score
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData.forEach((item, i) => item.rank = i + 1);
    
    // Find user's rank
    const userEntry = leaderboardData.find(e => e.name === 'You');
    if (userEntry) {
        document.getElementById('yourRank').textContent = userEntry.rank;
        document.getElementById('yourLeaderboardScore').textContent = userEntry.score + ' points';
    }
    
    // Build leaderboard list
    const leaderboardList = document.getElementById('leaderboardList');
    let html = '';
    
    leaderboardData.forEach((entry, i) => {
        if (entry.name === 'You') return;
        
        let rankClass = '';
        if (entry.rank === 1) rankClass = 'gold';
        else if (entry.rank === 2) rankClass = 'silver';
        else if (entry.rank === 3) rankClass = 'bronze';
        
        html += `
            <div class="leaderboard-entry">
                <div class="entry-rank ${rankClass}">
                    ${entry.rank}${i === 0 ? '🏆' : i === 1 ? '🥈' : '🥉'}
                </div>
                <div class="entry-info">
                    <div class="entry-name">${entry.name}</div>
                    <div class="entry-subtitle">${entry.trips} trips • ${entry.co2.toFixed(1)} kg CO₂</div>
                </div>
                <div class="entry-score">${entry.score}</div>
            </div>
        `;
    });
    
    leaderboardList.innerHTML = html;
    
    // Badge system
    const badges = [
        { icon: '🚴', name: 'Bike Master', earned: stats.bike >= 5 },
        { icon: '🚌', name: 'Transit Pro', earned: stats.transit >= 5 },
        { icon: '♻️', name: 'Eco Warrior', earned: stats.co2 < 10 },
        { icon: '🌱', name: 'Carbon Neutral', earned: stats.co2 < 5 },
        { icon: '🏃', name: 'Active Commuter', earned: (stats.bike + stats.transit) / stats.trips > 0.7 },
        { icon: '💰', name: 'Money Saver', earned: stats.cost < 20 }
    ];
    
    const badgesGrid = document.getElementById('badgesGrid');
    badgesGrid.innerHTML = badges.map(b => `
        <div class="badge ${b.earned ? 'earned' : ''}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
        </div>
    `).join('');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Weather Alert
function showWeatherAlert() {
    const weatherMessage = document.getElementById('weatherMessage');
    const weatherAlert = document.getElementById('weatherAlert');
    
    const messages = [
        '☔ Rain expected today - consider alternatives',
        '❄️ Snow in forecast - bike or transit recommended',
        '🌞 Perfect weather for biking today!',
        '🌬️ Strong winds - maybe take transit'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    weatherMessage.textContent = randomMessage;
    
    if (randomMessage.includes('Perfect')) {
        weatherAlert.style.display = 'none';
    } else {
        weatherAlert.style.display = 'block';
        setTimeout(() => {
            weatherAlert.style.display = 'none';
        }, 8000);
    }
}

// Initialize app
function initializeApp() {
    loadData();
    
    if (!appData.profile.distance) {
        // Show setup modal
        document.getElementById('setupModal').classList.add('active');
    } else {
        updateRouteComparison();
        renderTodayRoutes();
    }
    
    updateRecentTrips();
    updateDashboard();
    
    // Show weather alert
    setTimeout(showWeatherAlert, 1000);
}

// Setup Modal
const setupModal = document.getElementById('setupModal');
const setupForm = document.getElementById('setupForm');
const modalClose = document.querySelector('.modal-close');

modalClose.addEventListener('click', () => {
    setupModal.classList.remove('active');
});

setupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    appData.profile = {
        startLocation: document.getElementById('setupStart').value,
        endLocation: document.getElementById('setupEnd').value,
        distance: parseFloat(document.getElementById('setupDist').value),
        commuteDays: parseInt(document.getElementById('setupDays').value)
    };
    
    saveData();
    setupModal.classList.remove('active');
    
    document.getElementById('startLocation').value = appData.profile.startLocation;
    document.getElementById('endLocation').value = appData.profile.endLocation;
    document.getElementById('commuteDist').value = appData.profile.distance;
    document.getElementById('commuteDays').value = appData.profile.commuteDays;
    
    updateRouteComparison();
    renderTodayRoutes();
    
    showNotification('Profile setup complete!', 'success');
});

// Time filters for analytics
const timeFilters = document.querySelectorAll('.time-filter');
timeFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
        timeFilters.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
        updateAnalytics();
    });
});

// Animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(300px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(300px);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeApp);

// Export for testing
window.greenCommute = {
    calculateCO2,
    calculateCost,
    deleteTrip,
    selectRoute,
    getTripModeDisplay
};
