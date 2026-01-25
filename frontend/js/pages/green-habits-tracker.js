/**
 * Green Habits Tracker - JavaScript
 * 30-Day Eco-Challenge Tracker
 * Issue #1106
 */

// ===================================
// Challenge Data
// ===================================
const challenges = [
    {
        id: 'plastic-free-week',
        title: 'Plastic-Free Week',
        emoji: '🚫🥤',
        description: 'Go one week without using any single-use plastics. Carry reusable bags, bottles, and containers.',
        duration: 7,
        difficulty: 'beginner',
        participants: 1247,
        successRate: 78,
        impact: {
            plasticBottles: 14,
            co2Kg: 3.5,
            description: 'Avoid 14 plastic items and save 3.5kg of CO₂'
        },
        tips: [
            'Carry a reusable water bottle everywhere',
            'Bring your own shopping bags',
            'Say no to plastic straws',
            'Use beeswax wraps instead of plastic wrap'
        ]
    },
    {
        id: 'meatless-mondays',
        title: 'Meatless Mondays',
        emoji: '🥗',
        description: 'Skip meat every Monday for a month. Discover delicious plant-based alternatives!',
        duration: 30,
        difficulty: 'beginner',
        participants: 2156,
        successRate: 85,
        impact: {
            meatMeals: 4,
            co2Kg: 12,
            description: 'Skip 4 meat meals and save 12kg of CO₂'
        },
        tips: [
            'Try new vegetarian recipes each week',
            'Explore legumes and beans as protein sources',
            'Meal prep on Sundays for easy Monday meals',
            'Join online communities for recipe ideas'
        ]
    },
    {
        id: 'zero-waste-month',
        title: 'Zero-Waste Month',
        emoji: '♻️',
        description: 'Aim for zero landfill waste for 30 days. Compost, recycle, and refuse what you can\'t reuse.',
        duration: 30,
        difficulty: 'expert',
        participants: 543,
        successRate: 45,
        impact: {
            wasteKg: 30,
            co2Kg: 25,
            description: 'Divert 30kg of waste from landfills'
        },
        tips: [
            'Start a compost bin for food scraps',
            'Learn your local recycling rules',
            'Buy in bulk to reduce packaging',
            'Choose products with minimal packaging'
        ]
    },
    {
        id: 'walk-or-bike',
        title: 'Walk or Bike Week',
        emoji: '🚴',
        description: 'Replace car trips with walking or biking for one week. Good for you and the planet!',
        duration: 7,
        difficulty: 'intermediate',
        participants: 892,
        successRate: 72,
        impact: {
            kmSaved: 35,
            co2Kg: 8,
            description: 'Save 8kg of CO₂ from car emissions'
        },
        tips: [
            'Plan your routes in advance',
            'Start with short distances',
            'Get a good bike lock for security',
            'Check weather and dress appropriately'
        ]
    },
    {
        id: 'cold-shower-challenge',
        title: 'Cold Shower Challenge',
        emoji: '🚿❄️',
        description: 'End your showers with 30 seconds of cold water for 14 days. Save energy and boost immunity!',
        duration: 14,
        difficulty: 'intermediate',
        participants: 678,
        successRate: 65,
        impact: {
            energySaved: 28,
            co2Kg: 5,
            description: 'Save energy equivalent to 5kg of CO₂'
        },
        tips: [
            'Start with just 10 seconds and build up',
            'Focus on breathing through the cold',
            'End cold, not start cold',
            'Track how you feel each day'
        ]
    },
    {
        id: 'digital-detox',
        title: 'Digital Detox Weekend',
        emoji: '📵',
        description: 'Unplug from screens for one weekend. Reduce e-waste awareness and energy consumption.',
        duration: 3,
        difficulty: 'beginner',
        participants: 1534,
        successRate: 68,
        impact: {
            energySaved: 5,
            co2Kg: 2,
            description: 'Save energy and reduce screen time'
        },
        tips: [
            'Tell friends and family about your detox',
            'Plan offline activities in advance',
            'Use analog alternatives (books, board games)',
            'Keep your phone out of reach'
        ]
    },
    {
        id: 'local-food-month',
        title: 'Eat Local Month',
        emoji: '🌽',
        description: 'Only eat locally-sourced food for 30 days. Support local farmers and reduce food miles.',
        duration: 30,
        difficulty: 'intermediate',
        participants: 445,
        successRate: 55,
        impact: {
            foodMiles: 1500,
            co2Kg: 15,
            description: 'Reduce 1500 food miles and save 15kg CO₂'
        },
        tips: [
            'Visit your local farmers market',
            'Research seasonal produce in your area',
            'Connect with local CSA programs',
            'Learn to preserve seasonal foods'
        ]
    },
    {
        id: 'energy-saver',
        title: 'Energy Saver Week',
        emoji: '💡',
        description: 'Reduce your energy consumption by 30% for one week. Every watt counts!',
        duration: 7,
        difficulty: 'beginner',
        participants: 1876,
        successRate: 82,
        impact: {
            kwhSaved: 35,
            co2Kg: 15,
            description: 'Save 35 kWh of electricity'
        },
        tips: [
            'Unplug devices when not in use',
            'Use natural light during the day',
            'Take shorter showers',
            'Air dry clothes instead of using dryer'
        ]
    },
    {
        id: 'tree-planting',
        title: 'Plant a Tree Challenge',
        emoji: '🌳',
        description: 'Plant at least one tree and care for it for 30 days. Watch it grow!',
        duration: 30,
        difficulty: 'intermediate',
        participants: 723,
        successRate: 88,
        impact: {
            treesPlanted: 1,
            co2Kg: 20,
            description: 'One tree absorbs ~20kg CO₂ per year'
        },
        tips: [
            'Research native tree species for your area',
            'Choose the right spot with enough sunlight',
            'Water regularly, especially in first weeks',
            'Document your tree\'s growth with photos'
        ]
    },
    {
        id: 'clothing-fast',
        title: '30-Day Clothing Fast',
        emoji: '👕',
        description: 'No new clothes for 30 days. Appreciate what you have and reduce fast fashion impact.',
        duration: 30,
        difficulty: 'intermediate',
        participants: 567,
        successRate: 75,
        impact: {
            clothingItems: 5,
            co2Kg: 35,
            description: 'Save 35kg CO₂ from fashion industry'
        },
        tips: [
            'Organize and rediscover your wardrobe',
            'Learn basic clothing repairs',
            'Try new outfit combinations',
            'Explore clothing swaps with friends'
        ]
    },
    {
        id: 'water-conservation',
        title: 'Water Warrior Week',
        emoji: '💧',
        description: 'Reduce water usage by 20% for one week. Every drop matters!',
        duration: 7,
        difficulty: 'beginner',
        participants: 1654,
        successRate: 80,
        impact: {
            litersSaved: 350,
            description: 'Save 350 liters of water'
        },
        tips: [
            'Take 5-minute showers',
            'Fix any leaky faucets',
            'Turn off water while brushing teeth',
            'Collect rainwater for plants'
        ]
    },
    {
        id: 'paperless-week',
        title: 'Paperless Week',
        emoji: '📄',
        description: 'Go completely paperless for one week. Use digital alternatives for everything.',
        duration: 7,
        difficulty: 'beginner',
        participants: 1234,
        successRate: 70,
        impact: {
            sheetsSaved: 100,
            treesSaved: 0.01,
            co2Kg: 3,
            description: 'Save 100 sheets of paper'
        },
        tips: [
            'Use digital notes and documents',
            'Opt for e-receipts',
            'Read news and books digitally',
            'Cancel paper junk mail subscriptions'
        ]
    }
];

// ===================================
// Badge Data
// ===================================
const badges = [
    { id: 'first-step', name: 'First Step', icon: '🌱', requirement: 'Complete your first day', unlockCondition: { completedDays: 1 } },
    { id: 'week-warrior', name: 'Week Warrior', icon: '⚡', requirement: 'Complete 7 days', unlockCondition: { completedDays: 7 } },
    { id: 'streak-star', name: 'Streak Star', icon: '🔥', requirement: '7-day streak', unlockCondition: { streak: 7 } },
    { id: 'eco-champion', name: 'Eco Champion', icon: '🏆', requirement: 'Complete 1 challenge', unlockCondition: { challengesCompleted: 1 } },
    { id: 'planet-protector', name: 'Planet Protector', icon: '🌍', requirement: 'Complete 3 challenges', unlockCondition: { challengesCompleted: 3 } },
    { id: 'green-legend', name: 'Green Legend', icon: '👑', requirement: 'Complete 5 challenges', unlockCondition: { challengesCompleted: 5 } },
    { id: 'plastic-free', name: 'Plastic Free', icon: '🚯', requirement: 'Complete Plastic-Free Week', unlockCondition: { specificChallenge: 'plastic-free-week' } },
    { id: 'veggie-hero', name: 'Veggie Hero', icon: '🥬', requirement: 'Complete Meatless Mondays', unlockCondition: { specificChallenge: 'meatless-mondays' } },
    { id: 'zero-waste-master', name: 'Zero Waste Master', icon: '♻️', requirement: 'Complete Zero-Waste Month', unlockCondition: { specificChallenge: 'zero-waste-month' } },
    { id: 'impact-maker', name: 'Impact Maker', icon: '💚', requirement: 'Save 50kg CO₂', unlockCondition: { co2Saved: 50 } },
    { id: 'tree-hugger', name: 'Tree Hugger', icon: '🌳', requirement: 'Plant a tree', unlockCondition: { specificChallenge: 'tree-planting' } },
    { id: 'water-saver', name: 'Water Saver', icon: '💧', requirement: 'Complete Water Warrior Week', unlockCondition: { specificChallenge: 'water-conservation' } }
];

// ===================================
// Leaderboard Data (Mock)
// ===================================
const leaderboardData = [
    { name: 'EcoSarah', score: 2450, streak: 45 },
    { name: 'GreenMike', score: 2280, streak: 38 },
    { name: 'NatureLover', score: 2150, streak: 32 },
    { name: 'PlantPal', score: 1980, streak: 28 },
    { name: 'EarthGuard', score: 1850, streak: 25 }
];

// ===================================
// Community Tips Data
// ===================================
const communityTips = [
    { author: 'EcoSarah', text: 'I keep a reusable bag in my car so I never forget it when shopping!' },
    { author: 'GreenMike', text: 'Batch cooking on Sundays makes Meatless Mondays so much easier.' },
    { author: 'NatureLover', text: 'I use a refillable water bottle and save 3 plastic bottles daily!' },
    { author: 'PlantPal', text: 'Starting a small herb garden was easier than I thought. Try basil first!' },
    { author: 'EarthGuard', text: 'Switching to LED bulbs cut my electricity bill by 20%.' }
];

// ===================================
// User Data Management
// ===================================
const STORAGE_KEY = 'greenHabitsTracker';

function getDefaultUserData() {
    return {
        name: '',
        isRegistered: false,
        activeChallenge: null,
        activeChallengeStartDate: null,
        challengeProgress: [],
        completedChallenges: [],
        totalCompletedDays: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastCheckIn: null,
        impactStats: {
            plasticBottles: 0,
            meatMeals: 0,
            co2Saved: 0,
            treesEquivalent: 0
        },
        earnedBadges: [],
        notifications: {
            browser: false,
            email: false,
            reminderTime: '09:00'
        }
    };
}

function loadUserData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return getDefaultUserData();
}

function saveUserData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let userData = loadUserData();

// ===================================
// DOM Elements
// ===================================
const elements = {
    userDashboard: document.getElementById('userDashboard'),
    signupPrompt: document.getElementById('signupPrompt'),
    userName: document.getElementById('userName'),
    userNameInput: document.getElementById('userNameInput'),
    startJourneyBtn: document.getElementById('startJourneyBtn'),
    currentStreak: document.getElementById('currentStreak'),
    completedDays: document.getElementById('completedDays'),
    challengesCompleted: document.getElementById('challengesCompleted'),
    impactScore: document.getElementById('impactScore'),
    badgesEarned: document.getElementById('badgesEarned'),
    activeChallengeSection: document.getElementById('activeChallengeSection'),
    activeChallengeCard: document.getElementById('activeChallengeCard'),
    activeChallengeIcon: document.getElementById('activeChallengeIcon'),
    activeChallengeName: document.getElementById('activeChallengeName'),
    activeChallengeDesc: document.getElementById('activeChallengeDesc'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    challengeCalendar: document.getElementById('challengeCalendar'),
    checkinBtn: document.getElementById('checkinBtn'),
    skipBtn: document.getElementById('skipBtn'),
    plasticSaved: document.getElementById('plasticSaved'),
    meatSkipped: document.getElementById('meatSkipped'),
    co2Saved: document.getElementById('co2Saved'),
    treesEquivalent: document.getElementById('treesEquivalent'),
    challengesGrid: document.getElementById('challengesGrid'),
    leaderboardList: document.getElementById('leaderboardList'),
    tipsCarousel: document.getElementById('tipsCarousel'),
    badgesGrid: document.getElementById('badgesGrid'),
    notificationModal: document.getElementById('notificationModal'),
    notificationBell: document.getElementById('notificationBell'),
    closeNotificationModal: document.getElementById('closeNotificationModal'),
    browserNotifications: document.getElementById('browserNotifications'),
    emailReminders: document.getElementById('emailReminders'),
    reminderTime: document.getElementById('reminderTime'),
    saveNotifications: document.getElementById('saveNotifications'),
    challengeCompleteModal: document.getElementById('challengeCompleteModal'),
    completionMessage: document.getElementById('completionMessage'),
    impactReveal: document.getElementById('impactReveal'),
    earnedBadge: document.getElementById('earnedBadge'),
    continueBtn: document.getElementById('continueBtn'),
    filterBtns: document.querySelectorAll('.filter-btn')
};

// ===================================
// Initialize Application
// ===================================
function init() {
    if (userData.isRegistered) {
        showDashboard();
        updateDashboardStats();
        checkAndUpdateStreak();
        renderActiveChallenge();
        renderImpactStats();
    } else {
        elements.signupPrompt.style.display = 'block';
        elements.userDashboard.style.display = 'none';
    }

    renderChallenges();
    renderLeaderboard();
    renderTips();
    renderBadges();
    setupEventListeners();
}

// ===================================
// Event Listeners
// ===================================
function setupEventListeners() {
    // Start Journey Button
    elements.startJourneyBtn.addEventListener('click', handleStartJourney);

    // Enter key on name input
    elements.userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleStartJourney();
        }
    });

    // Check-in Button
    elements.checkinBtn.addEventListener('click', handleCheckIn);

    // Skip Button
    elements.skipBtn.addEventListener('click', handleSkip);

    // Notification Bell
    elements.notificationBell.addEventListener('click', () => {
        elements.notificationModal.classList.add('active');
        loadNotificationSettings();
    });

    // Close Notification Modal
    elements.closeNotificationModal.addEventListener('click', () => {
        elements.notificationModal.classList.remove('active');
    });

    // Save Notifications
    elements.saveNotifications.addEventListener('click', saveNotificationSettings);

    // Continue Button in Completion Modal
    elements.continueBtn.addEventListener('click', () => {
        elements.challengeCompleteModal.classList.remove('active');
    });

    // Filter Buttons
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderChallenges(btn.dataset.filter);
        });
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// ===================================
// Handle Start Journey
// ===================================
function handleStartJourney() {
    const name = elements.userNameInput.value.trim();
    if (name.length < 2) {
        elements.userNameInput.style.borderColor = '#ef4444';
        elements.userNameInput.placeholder = 'Please enter at least 2 characters';
        return;
    }

    userData.name = name;
    userData.isRegistered = true;
    saveUserData(userData);

    showDashboard();
    updateDashboardStats();

    // Welcome confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#0ea5e9', '#8b5cf6']
        });
    }
}

// ===================================
// Show Dashboard
// ===================================
function showDashboard() {
    elements.signupPrompt.style.display = 'none';
    elements.userDashboard.style.display = 'block';
    elements.userName.textContent = userData.name;
}

// ===================================
// Update Dashboard Stats
// ===================================
function updateDashboardStats() {
    elements.currentStreak.textContent = userData.currentStreak;
    elements.completedDays.textContent = userData.totalCompletedDays;
    elements.challengesCompleted.textContent = userData.completedChallenges.length;
    elements.impactScore.textContent = calculateImpactScore();
    elements.badgesEarned.textContent = userData.earnedBadges.length;
}

// ===================================
// Calculate Impact Score
// ===================================
function calculateImpactScore() {
    const stats = userData.impactStats;
    return Math.round(
        stats.plasticBottles * 2 +
        stats.meatMeals * 5 +
        stats.co2Saved * 3 +
        userData.totalCompletedDays * 10
    );
}

// ===================================
// Check and Update Streak
// ===================================
function checkAndUpdateStreak() {
    if (!userData.lastCheckIn) return;

    const lastCheckIn = new Date(userData.lastCheckIn);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastCheckIn.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - lastCheckIn) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // Streak broken
        userData.currentStreak = 0;
        saveUserData(userData);
        updateDashboardStats();
    }
}

// ===================================
// Render Active Challenge
// ===================================
function renderActiveChallenge() {
    if (!userData.activeChallenge) {
        elements.activeChallengeSection.style.display = 'none';
        elements.checkinBtn.disabled = true;
        elements.skipBtn.disabled = true;
        return;
    }

    elements.activeChallengeSection.style.display = 'block';
    const challenge = challenges.find(c => c.id === userData.activeChallenge);

    if (!challenge) return;

    elements.activeChallengeIcon.textContent = challenge.emoji;
    elements.activeChallengeName.textContent = challenge.title;
    elements.activeChallengeDesc.textContent = `Day ${userData.challengeProgress.length + 1} of ${challenge.duration}`;

    // Update progress circle
    const progress = (userData.challengeProgress.length / challenge.duration) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;
    elements.progressBar.style.strokeDashoffset = offset;
    elements.progressText.textContent = `${Math.round(progress)}%`;

    // Render calendar
    renderChallengeCalendar(challenge);

    // Enable/disable buttons
    const today = new Date().toDateString();
    const lastProgress = userData.challengeProgress[userData.challengeProgress.length - 1];
    const canCheckIn = !lastProgress || new Date(lastProgress.date).toDateString() !== today;

    elements.checkinBtn.disabled = !canCheckIn;
    elements.skipBtn.disabled = !canCheckIn;
}

// ===================================
// Render Challenge Calendar
// ===================================
function renderChallengeCalendar(challenge) {
    elements.challengeCalendar.innerHTML = '';

    const startDate = new Date(userData.activeChallengeStartDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < challenge.duration; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i + 1;

        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);
        dayDate.setHours(0, 0, 0, 0);

        const progress = userData.challengeProgress.find(p => {
            const pDate = new Date(p.date);
            pDate.setHours(0, 0, 0, 0);
            return pDate.getTime() === dayDate.getTime();
        });

        if (progress) {
            if (progress.status === 'completed') {
                day.classList.add('completed');
                day.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (progress.status === 'skipped') {
                day.classList.add('skipped');
                day.innerHTML = '<i class="fa-solid fa-forward"></i>';
            }
        } else if (dayDate.getTime() === today.getTime()) {
            day.classList.add('today');
        } else if (dayDate > today) {
            day.classList.add('future');
        }

        elements.challengeCalendar.appendChild(day);
    }
}

// ===================================
// Handle Check-In
// ===================================
function handleCheckIn() {
    if (!userData.activeChallenge) return;

    const today = new Date();
    userData.challengeProgress.push({
        date: today.toISOString(),
        status: 'completed'
    });

    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const lastCheckIn = userData.lastCheckIn ? new Date(userData.lastCheckIn) : null;
    if (lastCheckIn) {
        lastCheckIn.setHours(0, 0, 0, 0);
    }

    if (!lastCheckIn || lastCheckIn.getTime() === yesterday.getTime()) {
        userData.currentStreak++;
    } else if (!lastCheckIn || lastCheckIn.getTime() !== today.setHours(0, 0, 0, 0)) {
        userData.currentStreak = 1;
    }

    if (userData.currentStreak > userData.longestStreak) {
        userData.longestStreak = userData.currentStreak;
    }

    userData.lastCheckIn = today.toISOString();
    userData.totalCompletedDays++;

    // Update impact stats based on challenge
    updateImpactForChallenge();

    // Check for badges
    checkForBadges();

    // Check if challenge is complete
    const challenge = challenges.find(c => c.id === userData.activeChallenge);
    if (userData.challengeProgress.length >= challenge.duration) {
        completeChallenge(challenge);
    }

    saveUserData(userData);
    updateDashboardStats();
    renderActiveChallenge();
    renderImpactStats();
    renderBadges();

    // Celebration animation
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
        });
    }

    elements.checkinBtn.disabled = true;
    elements.skipBtn.disabled = true;
}

// ===================================
// Handle Skip
// ===================================
function handleSkip() {
    if (!userData.activeChallenge) return;

    const today = new Date();
    userData.challengeProgress.push({
        date: today.toISOString(),
        status: 'skipped'
    });

    // Reset streak
    userData.currentStreak = 0;
    userData.lastCheckIn = today.toISOString();

    saveUserData(userData);
    updateDashboardStats();
    renderActiveChallenge();

    elements.checkinBtn.disabled = true;
    elements.skipBtn.disabled = true;
}

// ===================================
// Update Impact Stats for Challenge
// ===================================
function updateImpactForChallenge() {
    const challenge = challenges.find(c => c.id === userData.activeChallenge);
    if (!challenge) return;

    const dailyImpact = {
        plasticBottles: challenge.impact.plasticBottles ? challenge.impact.plasticBottles / challenge.duration : 0,
        meatMeals: challenge.impact.meatMeals ? challenge.impact.meatMeals / challenge.duration : 0,
        co2Kg: challenge.impact.co2Kg ? challenge.impact.co2Kg / challenge.duration : 0
    };

    userData.impactStats.plasticBottles = Math.round((userData.impactStats.plasticBottles + dailyImpact.plasticBottles) * 10) / 10;
    userData.impactStats.meatMeals += dailyImpact.meatMeals;
    userData.impactStats.co2Saved = Math.round((userData.impactStats.co2Saved + dailyImpact.co2Kg) * 10) / 10;
    userData.impactStats.treesEquivalent = Math.round(userData.impactStats.co2Saved / 20 * 10) / 10; // 1 tree ≈ 20kg CO2/year
}

// ===================================
// Complete Challenge
// ===================================
function completeChallenge(challenge) {
    userData.completedChallenges.push({
        id: challenge.id,
        completedAt: new Date().toISOString(),
        progress: [...userData.challengeProgress]
    });

    // Award completion badge
    checkForBadges();

    // Show completion modal
    showCompletionModal(challenge);

    // Reset active challenge
    userData.activeChallenge = null;
    userData.activeChallengeStartDate = null;
    userData.challengeProgress = [];
}

// ===================================
// Show Completion Modal
// ===================================
function showCompletionModal(challenge) {
    elements.completionMessage.textContent = `You've completed the "${challenge.title}" challenge!`;

    elements.impactReveal.innerHTML = `
    <h4>Your Impact:</h4>
    <p>${challenge.impact.description}</p>
    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px;">
      <div style="text-align: center;">
        <span style="font-size: 2rem; display: block;">${challenge.impact.co2Kg || 0}</span>
        <span style="font-size: 0.8rem; color: #64748b;">kg CO₂ Saved</span>
      </div>
    </div>
  `;

    // Show earned badge
    const newBadge = badges.find(b => b.unlockCondition.specificChallenge === challenge.id);
    if (newBadge && !userData.earnedBadges.includes(newBadge.id)) {
        userData.earnedBadges.push(newBadge.id);
        elements.earnedBadge.innerHTML = `
      <h4>Badge Earned!</h4>
      <div style="font-size: 4rem;">${newBadge.icon}</div>
      <p><strong>${newBadge.name}</strong></p>
    `;
    } else {
        elements.earnedBadge.innerHTML = '';
    }

    elements.challengeCompleteModal.classList.add('active');

    // Celebration confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#22c55e', '#ffd700', '#8b5cf6', '#ec4899']
        });
    }
}

// ===================================
// Check for Badges
// ===================================
function checkForBadges() {
    badges.forEach(badge => {
        if (userData.earnedBadges.includes(badge.id)) return;

        const condition = badge.unlockCondition;
        let earned = false;

        if (condition.completedDays && userData.totalCompletedDays >= condition.completedDays) {
            earned = true;
        }
        if (condition.streak && userData.currentStreak >= condition.streak) {
            earned = true;
        }
        if (condition.challengesCompleted && userData.completedChallenges.length >= condition.challengesCompleted) {
            earned = true;
        }
        if (condition.co2Saved && userData.impactStats.co2Saved >= condition.co2Saved) {
            earned = true;
        }
        if (condition.specificChallenge) {
            if (userData.completedChallenges.some(c => c.id === condition.specificChallenge)) {
                earned = true;
            }
        }

        if (earned) {
            userData.earnedBadges.push(badge.id);
        }
    });
}

// ===================================
// Render Impact Stats
// ===================================
function renderImpactStats() {
    elements.plasticSaved.textContent = Math.round(userData.impactStats.plasticBottles);
    elements.meatSkipped.textContent = Math.round(userData.impactStats.meatMeals);
    elements.co2Saved.textContent = Math.round(userData.impactStats.co2Saved * 10) / 10;
    elements.treesEquivalent.textContent = Math.round(userData.impactStats.treesEquivalent * 10) / 10;
}

// ===================================
// Render Challenges
// ===================================
function renderChallenges(filter = 'all') {
    elements.challengesGrid.innerHTML = '';

    const filteredChallenges = filter === 'all'
        ? challenges
        : challenges.filter(c => c.difficulty === filter);

    filteredChallenges.forEach((challenge, index) => {
        const card = document.createElement('div');
        card.className = `challenge-card ${challenge.difficulty}`;
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());

        const isActive = userData.activeChallenge === challenge.id;
        const isCompleted = userData.completedChallenges.some(c => c.id === challenge.id);

        card.innerHTML = `
      <div class="challenge-card-header">
        <span class="challenge-emoji">${challenge.emoji}</span>
        <h3 class="challenge-title">${challenge.title}</h3>
        <span class="challenge-duration">
          <i class="fa-solid fa-calendar"></i> ${challenge.duration} days
        </span>
        <span class="difficulty-badge">${challenge.difficulty}</span>
      </div>
      <div class="challenge-card-body">
        <p class="challenge-description">${challenge.description}</p>
        <div class="challenge-stats">
          <div class="challenge-stat">
            <span class="challenge-stat-value">${challenge.participants.toLocaleString()}</span>
            <span class="challenge-stat-label">Participants</span>
          </div>
          <div class="challenge-stat">
            <span class="challenge-stat-value">${challenge.successRate}%</span>
            <span class="challenge-stat-label">Success Rate</span>
          </div>
          <div class="challenge-stat">
            <span class="challenge-stat-value">${challenge.impact.co2Kg || 0}kg</span>
            <span class="challenge-stat-label">CO₂ Saved</span>
          </div>
        </div>
        <div class="challenge-actions">
          <button class="btn-start-challenge" 
                  onclick="startChallenge('${challenge.id}')"
                  ${isActive ? 'disabled' : ''}
                  ${!userData.isRegistered ? 'disabled' : ''}>
            ${isCompleted ? '<i class="fa-solid fa-redo"></i> Retry' :
                isActive ? '<i class="fa-solid fa-spinner fa-spin"></i> In Progress' :
                    '<i class="fa-solid fa-play"></i> Start Challenge'}
          </button>
          <button class="btn-info" onclick="showChallengeInfo('${challenge.id}')" title="More Info">
            <i class="fa-solid fa-info"></i>
          </button>
        </div>
      </div>
    `;

        elements.challengesGrid.appendChild(card);
    });
}

// ===================================
// Start Challenge
// ===================================
function startChallenge(challengeId) {
    if (!userData.isRegistered) {
        alert('Please enter your name first to start tracking!');
        document.getElementById('userNameInput').focus();
        return;
    }

    if (userData.activeChallenge) {
        if (!confirm('You already have an active challenge. Starting a new one will reset your current progress. Continue?')) {
            return;
        }
        userData.challengeProgress = [];
    }

    userData.activeChallenge = challengeId;
    userData.activeChallengeStartDate = new Date().toISOString();
    userData.challengeProgress = [];

    saveUserData(userData);
    updateDashboardStats();
    renderActiveChallenge();
    renderChallenges();

    // Scroll to dashboard
    elements.userDashboard.scrollIntoView({ behavior: 'smooth' });

    // Celebration
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 80,
            spread: 50,
            origin: { y: 0.6 }
        });
    }
}

// ===================================
// Show Challenge Info
// ===================================
function showChallengeInfo(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const tips = challenge.tips.map(tip => `<li>${tip}</li>`).join('');

    alert(`${challenge.title}\n\n${challenge.description}\n\nTips:\n${challenge.tips.join('\n• ')}\n\nImpact: ${challenge.impact.description}`);
}

// ===================================
// Render Leaderboard
// ===================================
function renderLeaderboard() {
    elements.leaderboardList.innerHTML = '';

    leaderboardData.forEach((leader, index) => {
        const li = document.createElement('li');
        li.className = `leaderboard-item ${index < 3 ? 'top-3' : ''}`;
        li.innerHTML = `
      <span class="leader-rank">${index + 1}</span>
      <span class="leader-name">${leader.name}</span>
      <span class="leader-score">${leader.score.toLocaleString()} pts</span>
    `;
        elements.leaderboardList.appendChild(li);
    });
}

// ===================================
// Render Tips
// ===================================
function renderTips() {
    elements.tipsCarousel.innerHTML = '';

    communityTips.forEach(tip => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.innerHTML = `
      <span class="tip-author">💬 ${tip.author}</span>
      <p class="tip-text">${tip.text}</p>
    `;
        elements.tipsCarousel.appendChild(tipCard);
    });
}

// ===================================
// Render Badges
// ===================================
function renderBadges() {
    elements.badgesGrid.innerHTML = '';

    badges.forEach(badge => {
        const isEarned = userData.earnedBadges.includes(badge.id);
        const badgeCard = document.createElement('div');
        badgeCard.className = `badge-card ${isEarned ? '' : 'locked'}`;
        badgeCard.innerHTML = `
      <span class="badge-icon">${badge.icon}</span>
      <span class="badge-name">${badge.name}</span>
      <span class="badge-requirement">${badge.requirement}</span>
    `;
        elements.badgesGrid.appendChild(badgeCard);
    });
}

// ===================================
// Notification Settings
// ===================================
function loadNotificationSettings() {
    elements.browserNotifications.checked = userData.notifications.browser;
    elements.emailReminders.checked = userData.notifications.email;
    elements.reminderTime.value = userData.notifications.reminderTime;
}

function saveNotificationSettings() {
    userData.notifications.browser = elements.browserNotifications.checked;
    userData.notifications.email = elements.emailReminders.checked;
    userData.notifications.reminderTime = elements.reminderTime.value;

    // Request browser notification permission if enabled
    if (userData.notifications.browser && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                userData.notifications.browser = false;
                elements.browserNotifications.checked = false;
                alert('Browser notifications were denied. You can enable them in your browser settings.');
            }
        });
    }

    saveUserData(userData);
    elements.notificationModal.classList.remove('active');

    // Show confirmation
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: #22c55e;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-weight: 500;
    z-index: 1001;
    animation: fadeInUp 0.3s ease;
  `;
    toast.textContent = '✓ Settings saved!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===================================
// Add SVG Gradient Definition
// ===================================
function addProgressGradient() {
    const svg = document.querySelector('.progress-circle svg');
    if (!svg) return;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e" />
      <stop offset="100%" style="stop-color:#0ea5e9" />
    </linearGradient>
  `;
    svg.insertBefore(defs, svg.firstChild);
}

// ===================================
// Schedule Notification Reminders
// ===================================
function scheduleReminder() {
    if (!userData.notifications.browser || !('Notification' in window)) return;

    const now = new Date();
    const [hours, minutes] = userData.notifications.reminderTime.split(':').map(Number);
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const delay = reminderTime - now;

    setTimeout(() => {
        if (Notification.permission === 'granted' && userData.activeChallenge) {
            new Notification('🌱 Green Habits Reminder', {
                body: 'Time for your daily eco check-in! Keep up the great work!',
                icon: '/assets/images/others/envirnoment-logo.png'
            });
        }
        // Schedule next day
        scheduleReminder();
    }, delay);
}

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    addProgressGradient();
    scheduleReminder();
});

// Make startChallenge available globally
window.startChallenge = startChallenge;
window.showChallengeInfo = showChallengeInfo;
