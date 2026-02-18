// Microplastic Tracker Application Logic

// Initialize data structure
const appData = {
    logs: [],
    reductions: [],
    lastWeekScore: 0
};

// Load data from localStorage
function loadData() {
    const stored = localStorage.getItem('microplasticTrackerData');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            appData.logs = data.logs || [];
            appData.reductions = data.reductions || [];
            appData.lastWeekScore = data.lastWeekScore || 0;
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('microplasticTrackerData', JSON.stringify(appData));
}

// Safer alternatives database
const alternativesDatabase = [
    {
        id: 1,
        name: 'Bamboo Toothbrush',
        category: 'cosmetics',
        icon: '🪥',
        description: 'Biodegradable toothbrush made from sustainable bamboo',
        cost: '$2-5',
        effectiveness: '95%',
        benefits: ['Biodegradable', 'Plastic-free', 'Sustainable']
    },
    {
        id: 2,
        name: 'Solid Shampoo Bar',
        category: 'cosmetics',
        icon: '🧼',
        description: 'Concentrated shampoo with no plastic packaging or microbeads',
        cost: '$5-12',
        effectiveness: '98%',
        benefits: ['No microplastics', 'Long-lasting', 'Plastic-free']
    },
    {
        id: 3,
        name: 'Natural Soap Bar',
        category: 'cosmetics',
        icon: '🧴',
        description: 'Plant-based soap without synthetic components',
        cost: '$3-8',
        effectiveness: '99%',
        benefits: ['Skin-friendly', 'Biodegradable', 'No chemicals']
    },
    {
        id: 4,
        name: 'Glass Water Bottle',
        category: 'water',
        icon: '🥛',
        description: 'Reusable glass bottle with no microplastic leaching',
        cost: '$15-30',
        effectiveness: '100%',
        benefits: ['Durable', 'No plastic', 'Reusable']
    },
    {
        id: 5,
        name: 'Microfiber-Free Laundry Ball',
        category: 'laundry',
        icon: '🧺',
        description: 'Ball-shaped cleaner that reduces microfiber shedding in wash',
        cost: '$20-40',
        effectiveness: '85%',
        benefits: ['Reduces fibers', 'Reusable', '1000 washes']
    },
    {
        id: 6,
        name: 'Natural Fiber Clothing',
        category: 'laundry',
        icon: '👚',
        description: 'Clothing made from cotton, linen, or wool instead of synthetics',
        cost: 'Variable',
        effectiveness: '90%',
        benefits: ['No shedding', 'Breathable', 'Durable']
    },
    {
        id: 7,
        name: 'Loose-Leaf Tea Infuser',
        category: 'packaging',
        icon: '🫖',
        description: 'Metal tea infuser to avoid microplastics from tea bags',
        cost: '$5-15',
        effectiveness: '92%',
        benefits: ['Plastic-free', 'Reusable', 'Better flavor']
    },
    {
        id: 8,
        name: 'Metal Straws',
        category: 'packaging',
        icon: '🔗',
        description: 'Reusable stainless steel straws instead of plastic',
        cost: '$8-20',
        effectiveness: '100%',
        benefits: ['Durable', 'Reusable', 'No waste']
    },
    {
        id: 9,
        name: 'Cloth Shopping Bags',
        category: 'packaging',
        icon: '🛍️',
        description: 'Reusable fabric bags to replace plastic shopping bags',
        cost: '$5-15',
        effectiveness: '95%',
        benefits: ['Reusable', 'Durable', 'Eco-friendly']
    },
    {
        id: 10,
        name: 'Stainless Steel Lunch Container',
        category: 'packaging',
        icon: '🍱',
        description: 'Metal food container instead of plastic takeout containers',
        cost: '$15-40',
        effectiveness: '98%',
        benefits: ['Durable', 'No leaching', 'Microwave safe']
    },
    {
        id: 11,
        name: 'Natural Deodorant',
        category: 'cosmetics',
        icon: '⭐',
        description: 'Plant-based deodorant without microplastic components',
        cost: '$4-10',
        effectiveness: '90%',
        benefits: ['No synthetics', 'Skin-safe', 'Biodegradable']
    },
    {
        id: 12,
        name: 'Water Filter Pitcher',
        category: 'water',
        icon: '💧',
        description: 'Filtered tap water reduces microplastic ingestion',
        cost: '$20-50',
        effectiveness: '88%',
        benefits: ['Filters particles', 'Cost-effective', 'Sustainable']
    }
];

// Product scanner database with common microplastic products
const productScanner = {
    data: {
        'microbeads': { risk: 'high', category: 'Cosmetics', description: 'Tiny plastic particles used for exfoliation' },
        'polyethylene': { risk: 'high', category: 'Cosmetics', description: 'Plastic polymer used in many beauty products' },
        'polypropylene': { risk: 'high', category: 'Packaging', description: 'Common plastic used in food containers' },
        'nylon': { risk: 'high', category: 'Textiles', description: 'Synthetic fiber that sheds microplastics' },
        'polyester': { risk: 'high', category: 'Textiles', description: 'Synthetic fabric that releases fibers in laundry' },
        'acrylic': { risk: 'high', category: 'Textiles', description: 'Plastic-based fiber for clothing' },
        'polyurethane': { risk: 'medium', category: 'Various', description: 'Plastic polymer with multiple uses' },
        'acrylates': { risk: 'medium', category: 'Cosmetics', description: 'Plastic-based compounds in nail polish' },
        'dimethicone': { risk: 'medium', category: 'Cosmetics', description: 'Silicone-based ingredient' },
        'plastic': { risk: 'high', category: 'Packaging', description: 'General plastic material' },
        'pvc': { risk: 'high', category: 'Packaging', description: 'Polyvinyl chloride plastic' },
        'pet': { risk: 'high', category: 'Packaging', description: 'Polyethylene terephthalate plastic' }
    },
    search(query) {
        const q = query.toLowerCase();
        const results = [];
        for (const [key, value] of Object.entries(this.data)) {
            if (key.includes(q) || q.includes(key)) {
                results.push({ name: key, ...value });
            }
        }
        return results.length > 0 ? results : null;
    }
};

// Tab Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        
        // Remove active class from all
        navTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab
        e.currentTarget.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Room Selection
const roomButtons = document.querySelectorAll('.room-btn');
const selectedRoomInput = document.getElementById('selectedRoom');

roomButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        roomButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedRoomInput.value = btn.dataset.room;
    });
});

// Exposure Slider
const exposureSlider = document.getElementById('exposure');
const exposureValue = document.getElementById('exposureValue');

exposureSlider.addEventListener('input', (e) => {
    exposureValue.textContent = e.target.value;
});

// Logger Form
const loggerForm = document.getElementById('loggerForm');

loggerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const sourceType = document.getElementById('sourceType').value;
    const productName = document.getElementById('productName').value;
    const exposure = parseInt(exposureSlider.value);
    const room = selectedRoomInput.value;
    const frequency = document.getElementById('frequency').value;
    const notes = document.getElementById('notes').value;
    
    if (!sourceType || !productName || !room) {
        alert('Please fill all required fields');
        return;
    }
    
    const logEntry = {
        id: Date.now(),
        sourceType,
        productName,
        exposure,
        room,
        frequency,
        notes,
        date: new Date().toISOString(),
        displayDate: new Date().toLocaleDateString()
    };
    
    appData.logs.push(logEntry);
    saveData();
    
    // Reset form
    loggerForm.reset();
    roomButtons.forEach(b => b.classList.remove('active'));
    selectedRoomInput.value = '';
    exposureSlider.value = 5;
    exposureValue.textContent = '5';
    
    // Show success notification
    showNotification('Entry logged successfully!', 'success');
    
    // Update UI
    updateRecentLogs();
    updateDashboard();
});

// Display Recent Logs
function updateRecentLogs() {
    const logsList = document.getElementById('logsList');
    
    if (appData.logs.length === 0) {
        logsList.innerHTML = '<p class="empty-state">No logs yet. Start tracking your microplastic exposure!</p>';
        return;
    }
    
    const recentLogs = appData.logs.slice().reverse().slice(0, 10);
    logsList.innerHTML = recentLogs.map(log => `
        <div class="log-entry">
            <div class="log-header">
                <span class="log-title">${log.productName}</span>
                <span class="log-badge">${log.sourceType.replace('-', ' ')}</span>
            </div>
            <div class="log-details">
                <div class="log-detail">
                    <i class="fas fa-location-dot"></i> ${log.room}
                </div>
                <div class="log-detail">
                    <i class="fas fa-fire"></i> Exposure: ${log.exposure}/10
                </div>
                <div class="log-detail">
                    <i class="fas fa-calendar"></i> ${log.displayDate}
                </div>
            </div>
            ${log.notes ? `<p style="margin-top: 8px; font-size: 12px; color: var(--text-secondary);">${log.notes}</p>` : ''}
            <button class="log-delete" onclick="deleteLog(${log.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Delete Log Entry
function deleteLog(id) {
    if (confirm('Are you sure you want to delete this log?')) {
        appData.logs = appData.logs.filter(log => log.id !== id);
        saveData();
        updateRecentLogs();
        updateDashboard();
    }
}

// Calculate Microplastic Score
function calculateMicroplasticScore() {
    if (appData.logs.length === 0) return 0;
    
    const weights = {
        cosmetics: 15,
        laundry: 20,
        water: 10,
        packaging: 12,
        fibers: 18
    };
    
    let totalScore = 0;
    
    appData.logs.forEach(log => {
        const weight = weights[log.sourceType] || 10;
        const frequencyMultiplier = {
            'daily': 7,
            '3-times-week': 3,
            'weekly': 1,
            'monthly': 0.3
        }[log.frequency] || 1;
        
        totalScore += (log.exposure * frequencyMultiplier * weight) / 100;
    });
    
    // Cap at 100
    return Math.min(Math.round(totalScore), 100);
}

// Calculate Exposure Breakdown
function calculateExposureBySource() {
    const breakdown = {
        cosmetics: 0,
        laundry: 0,
        water: 0,
        packaging: 0,
        fibers: 0
    };
    
    if (appData.logs.length === 0) return breakdown;
    
    appData.logs.forEach(log => {
        if (breakdown.hasOwnProperty(log.sourceType)) {
            breakdown[log.sourceType] += log.exposure;
        }
    });
    
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    
    const percentages = {};
    for (const [key, value] of Object.entries(breakdown)) {
        percentages[key] = total > 0 ? Math.round((value / total) * 100) : 0;
    }
    
    return percentages;
}

// Update Dashboard
function updateDashboard() {
    const score = calculateMicroplasticScore();
    const exposure = calculateExposureBySource();
    
    // Update score circle
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreFill = document.getElementById('scoreFill');
    const scoreBadge = document.getElementById('scoreBadge');
    const currentScore = document.getElementById('currentScore');
    
    scoreNumber.textContent = score;
    currentScore.textContent = score;
    
    // Determine badge
    let badgeText = 'Low';
    let badgeClass = 'low';
    if (score >= 70) {
        badgeText = 'High';
        badgeClass = 'high';
    } else if (score >= 40) {
        badgeText = 'Medium';
        badgeClass = 'medium';
    }
    
    scoreBadge.textContent = badgeText;
    scoreBadge.className = `score-badge ${badgeClass}`;
    
    // Update SVG circle
    const circumference = 2 * Math.PI * 55;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    scoreFill.style.strokeDasharray = circumference;
    scoreFill.style.strokeDashoffset = strokeDashoffset;
    
    // Update trend
    const lastWeek = appData.lastWeekScore || 0;
    const trendValue = document.getElementById('trendValue');
    const lastWeekDisplay = document.getElementById('lastWeekScore');
    
    lastWeekDisplay.textContent = lastWeek;
    
    if (lastWeek > 0) {
        if (score < lastWeek) {
            trendValue.textContent = '↓';
            trendValue.classList.add('down');
            trendValue.classList.remove('up');
        } else if (score > lastWeek) {
            trendValue.textContent = '↑';
            trendValue.classList.add('up');
            trendValue.classList.remove('down');
        } else {
            trendValue.textContent = '→';
            trendValue.classList.remove('up', 'down');
        }
    }
    
    // Update exposure bars
    updateExposureBar('cosmetics', exposure.cosmetics);
    updateExposureBar('laundry', exposure.laundry);
    updateExposureBar('water', exposure.water);
    updateExposureBar('packaging', exposure.packaging);
    updateExposureBar('fibers', exposure.fibers);
}

function updateExposureBar(source, percentage) {
    document.getElementById(`${source}-bar`).style.width = percentage + '%';
    document.getElementById(`${source}-val`).textContent = percentage + '%';
}

// Product Scanner
const scanBtn = document.getElementById('scanBtn');
const scannerInput = document.getElementById('scannerInput');
const scannerResults = document.getElementById('scannerResults');
const resultContent = document.getElementById('resultContent');

scanBtn.addEventListener('click', () => {
    const query = scannerInput.value.trim();
    
    if (!query) {
        alert('Please enter a product name or ingredient');
        return;
    }
    
    const results = productScanner.search(query);
    
    if (results) {
        let html = '<div style="display: grid; gap: 15px;">';
        results.forEach(result => {
            html += `
                <div class="result-item" style="padding: 15px; background: ${result.risk === 'high' ? '#fee2e2' : '#fef3c7'}; border-radius: 8px; border-left: 4px solid ${result.risk === 'high' ? '#ef4444' : '#f59e0b'};">
                    <div style="margin-bottom: 10px;">
                        <span style="font-weight: 700; font-size: 14px; display: block; margin-bottom: 5px;">📍 ${result.name.toUpperCase()}</span>
                        <span class="result-risk ${result.risk}">Risk: ${result.risk.toUpperCase()}</span>
                    </div>
                    <div style="font-size: 13px; color: #333;">
                        <p><strong>Category:</strong> ${result.category}</p>
                        <p>${result.description}</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        resultContent.innerHTML = html;
    } else {
        resultContent.innerHTML = `
            <div style="text-align: center; padding: 40px; background: var(--surface-alt); border-radius: 8px;">
                <p style="color: var(--text-secondary); margin-bottom: 10px;">No results found for "<strong>${query}</strong>"</p>
                <p style="font-size: 12px; color: var(--text-light);">Try searching for common plastic ingredients like "microbeads", "polyethylene", or "nylon"</p>
            </div>
        `;
    }
    
    scannerResults.style.display = 'block';
});

scannerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') scanBtn.click();
});

// Alternatives Display
function renderAlternatives(filter = 'all') {
    const grid = document.getElementById('alternativesGrid');
    
    let filtered = alternativesDatabase;
    if (filter !== 'all') {
        filtered = alternativesDatabase.filter(alt => alt.category === filter);
    }
    
    grid.innerHTML = filtered.map(alt => `
        <div class="alternative-card">
            <div class="alternative-image">${alt.icon}</div>
            <div class="alternative-content">
                <span class="alternative-category">${alt.category}</span>
                <h3 class="alternative-name">${alt.name}</h3>
                <p class="alternative-description">${alt.description}</p>
                <div class="alternative-info">
                    <div class="info-badge">
                        <span class="info-label">Cost</span>
                        <span class="info-value">${alt.cost}</span>
                    </div>
                    <div class="info-badge">
                        <span class="info-label">Effectiveness</span>
                        <span class="info-value">${alt.effectiveness}</span>
                    </div>
                </div>
                <div class="alternative-benefits">
                    ${alt.benefits.map(b => `<div class="benefit">${b}</div>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Alternatives Filter
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderAlternatives(e.target.dataset.filter);
    });
});

// Timeline Management
function updateTimeline() {
    const timelineEvents = document.getElementById('timelineEvents');
    
    if (appData.reductions.length === 0) {
        timelineEvents.innerHTML = '<p class="empty-state">Log your first reduction to start your timeline!</p>';
        return;
    }
    
    const events = appData.reductions.slice().reverse();
    
    timelineEvents.innerHTML = events.map(event => {
        const date = new Date(event.date);
        const localeDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        
        return `
            <div class="timeline-event">
                <div class="event-marker"></div>
                <div class="event-content">
                    <div class="event-date">${localeDate}</div>
                    <div class="event-title">${event.reductionType}</div>
                    <div class="event-description">
                        Estimated microplastics avoided: <strong>${event.microplasticsSpared}mg</strong>
                    </div>
                    <span class="event-impact">+${event.microplasticsSpared}mg saved</span>
                </div>
            </div>
        `;
    }).join('');
}

function updateTimelineStats() {
    const totalReductions = document.getElementById('totalReductions');
    const microplasticsAvoided = document.getElementById('microplasticsAvoided');
    const scoreImprovement = document.getElementById('scoreImprovement');
    
    const totalCount = appData.reductions.length;
    const totalMicroplastics = appData.reductions.reduce((sum, r) => sum + r.microplasticsSpared, 0);
    
    totalReductions.textContent = totalCount;
    microplasticsAvoided.textContent = totalMicroplastics + ' mg';
    
    if (appData.lastWeekScore > 0) {
        const currentScore = calculateMicroplasticScore();
        const improvement = Math.max(0, ((appData.lastWeekScore - currentScore) / appData.lastWeekScore) * 100);
        scoreImprovement.textContent = Math.round(improvement) + '%';
    }
}

// Add Reduction Entry
const reductionModal = document.getElementById('reductionModal');
const reductionForm = document.getElementById('reductionForm');
const modalClose = document.querySelector('.modal-close');

// Modal functions
function openReductionModal() {
    reductionModal.classList.add('active');
}

function closeReductionModal() {
    reductionModal.classList.remove('active');
    reductionForm.reset();
}

modalClose.addEventListener('click', closeReductionModal);

reductionModal.addEventListener('click', (e) => {
    if (e.target === reductionModal) {
        closeReductionModal();
    }
});

reductionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reductionType = document.getElementById('reductionType').value;
    const microplasticsSpared = parseInt(document.getElementById('microplasticsSpared').value);
    
    const reduction = {
        id: Date.now(),
        reductionType,
        microplasticsSpared,
        date: new Date().toISOString()
    };
    
    appData.reductions.push(reduction);
    saveData();
    
    closeReductionModal();
    updateTimeline();
    updateTimelineStats();
    
    showNotification('Reduction logged successfully!', 'success');
});

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

// Add SVG Gradient to page
function addSVGGradient() {
    if (!document.getElementById('gradientSVG')) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'gradientSVG';
        svg.style.display = 'none';
        svg.innerHTML = `
            <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0066cc;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#00d9ff;stop-opacity:1" />
                </linearGradient>
            </defs>
        `;
        document.body.appendChild(svg);
    }
}

// Initialize Application
function initializeApp() {
    loadData();
    addSVGGradient();
    renderAlternatives();
    updateDashboard();
    updateRecentLogs();
    updateTimeline();
    updateTimelineStats();
    
    // Weekly reset check
    checkAndResetWeekly();
}

// Weekly Reset Logic
function checkAndResetWeekly() {
    const lastReset = localStorage.getItem('lastWeeklyReset');
    const now = new Date();
    const currentWeek = Math.ceil((now.getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    if (!lastReset || parseInt(lastReset) !== currentWeek) {
        appData.lastWeekScore = calculateMicroplasticScore();
        localStorage.setItem('lastWeeklyReset', currentWeek.toString());
        saveData();
    }
}

// Add custom CSS for notifications
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
window.microplasticTracker = {
    calculateScore: calculateMicroplasticScore,
    getExposure: calculateExposureBySource,
    openReductionModal,
    closeReductionModal,
    deleteLog
};
