// Eco Challenges - JavaScript

// User Data (stored in localStorage)
let userData = JSON.parse(localStorage.getItem('ecoChallengeUser') || '{"points": 0, "streak": 0, "completedChallenges": [], "rank": "-"}');

// Challenge Database
const challengesDatabase = {
    daily: [
        {
            id: 'meatless-monday',
            title: 'Meatless Monday',
            description: 'Skip meat for the entire day and explore delicious plant-based alternatives',
            icon: '🥗',
            category: 'food',
            difficulty: 'easy',
            points: 50,
            duration: 1,
            impact: 'Saves 4kg CO₂',
            tips: ['Try lentil curry', 'Make a veggie stir-fry', 'Explore tofu recipes']
        },
        {
            id: 'plastic-free-day',
            title: 'Plastic-Free Day',
            description: 'Avoid all single-use plastics for 24 hours',
            icon: '♻️',
            category: 'waste',
            difficulty: 'medium',
            points: 75,
            duration: 1,
            impact: 'Prevents 0.5kg waste',
            tips: ['Bring reusable bags', 'Use refillable water bottle', 'Buy package-free produce']
        },
        {
            id: 'no-car-challenge',
            title: 'No Car Challenge',
            description: 'Use public transit, bike, or walk instead of driving',
            icon: '🚴',
            category: 'transport',
            difficulty: 'medium',
            points: 80,
            duration: 1,
            impact: 'Saves 8kg CO₂',
            tips: ['Plan your route ahead', 'Bike to nearby places', 'Try carpooling']
        },
        {
            id: 'water-saving',
            title: 'Water Warrior',
            description: 'Take a 5-minute shower and turn off taps while brushing',
            icon: '💧',
            category: 'water',
            difficulty: 'easy',
            points: 40,
            duration: 1,
            impact: 'Saves 50L water',
            tips: ['Use a timer', 'Install low-flow showerhead', 'Fix leaky faucets']
        },
        {
            id: 'energy-audit',
            title: 'Energy Audit',
            description: 'Turn off all idle devices and unplug chargers not in use',
            icon: '⚡',
            category: 'energy',
            difficulty: 'easy',
            points: 45,
            duration: 1,
            impact: 'Saves 2kWh energy',
            tips: ['Use power strips', 'Enable sleep mode', 'Switch to LED bulbs']
        }
    ],
    weekly: [
        {
            id: 'plant-something',
            title: 'Plant Something',
            description: 'Grow a plant, herb, or vegetable in your home or garden',
            icon: '🌱',
            category: 'community',
            difficulty: 'easy',
            points: 100,
            duration: 7,
            impact: 'Produces oxygen',
            tips: ['Start with herbs', 'Use recycled containers', 'Research plant care']
        },
        {
            id: 'donate-clothes',
            title: 'Closet Cleanout',
            description: 'Donate or recycle unused clothes and items',
            icon: '👕',
            category: 'waste',
            difficulty: 'medium',
            points: 120,
            duration: 7,
            impact: 'Reduces 5kg waste',
            tips: ['Find local donation centers', 'Organize a swap party', 'Upcycle old items']
        },
        {
            id: 'zero-waste-week',
            title: 'Zero Waste Week',
            description: 'Minimize waste by composting, recycling, and avoiding disposables',
            icon: '🗑️',
            category: 'waste',
            difficulty: 'hard',
            points: 200,
            duration: 7,
            impact: 'Prevents 10kg waste',
            tips: ['Start composting', 'Buy in bulk', 'Use reusable containers']
        },
        {
            id: 'local-food',
            title: 'Local Food Champion',
            description: 'Buy only locally-sourced food for one week',
            icon: '🏪',
            category: 'food',
            difficulty: 'medium',
            points: 150,
            duration: 7,
            impact: 'Reduces transport emissions',
            tips: ['Visit farmers markets', 'Join local CSA', 'Check food labels']
        }
    ],
    monthly: [
        {
            id: 'beach-cleanup',
            title: 'Beach/Park Cleanup',
            description: 'Organize or join cleanup events totaling 4+ hours this month',
            icon: '🏖️',
            category: 'community',
            difficulty: 'medium',
            points: 300,
            duration: 30,
            impact: 'Removes 20kg litter',
            tips: ['Bring gloves and bags', 'Document your impact', 'Invite friends']
        },
        {
            id: 'car-free-month',
            title: 'Car-Free Month',
            description: 'Use alternative transportation for the entire month',
            icon: '🚇',
            category: 'transport',
            difficulty: 'hard',
            points: 500,
            duration: 30,
            impact: 'Saves 240kg CO₂',
            tips: ['Get a transit pass', 'Plan routes in advance', 'Try bike commuting']
        },
        {
            id: 'plastic-free-month',
            title: 'Plastic-Free Month',
            description: 'Avoid single-use plastics for 30 days',
            icon: '🚫',
            category: 'waste',
            difficulty: 'hard',
            points: 450,
            duration: 30,
            impact: 'Prevents 15kg plastic waste',
            tips: ['Shop package-free', 'Bring your own bags', 'Use reusable containers']
        },
        {
            id: 'solar-switch',
            title: 'Renewable Energy Switch',
            description: 'Research and switch to renewable energy provider',
            icon: '☀️',
            category: 'energy',
            difficulty: 'medium',
            points: 400,
            duration: 30,
            impact: 'Reduces carbon footprint',
            tips: ['Compare providers', 'Check government incentives', 'Calculate savings']
        }
    ],
    custom: []
};

// Achievements Database
const achievementsDatabase = [
    {
        id: 'first-challenge',
        title: 'Getting Started',
        description: 'Complete your first challenge',
        icon: '🎯',
        unlocked: false
    },
    {
        id: 'week-streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        unlocked: false
    },
    {
        id: 'hundred-points',
        title: 'Century Club',
        description: 'Earn 100 points',
        icon: '💯',
        unlocked: false
    },
    {
        id: 'five-challenges',
        title: 'Eco Enthusiast',
        description: 'Complete 5 challenges',
        icon: '⭐',
        unlocked: false
    },
    {
        id: 'monthly-master',
        title: 'Monthly Master',
        description: 'Complete a monthly challenge',
        icon: '👑',
        unlocked: false
    },
    {
        id: 'thousand-points',
        title: 'Eco Legend',
        description: 'Earn 1000 points',
        icon: '🏆',
        unlocked: false
    }
];

// Mock Leaderboard Data
const leaderboardData = {
    global: [
        { rank: 1, name: 'EcoWarrior23', username: '@eco_warrior', points: 2450, streak: 45, avatar: 'E' },
        { rank: 2, name: 'GreenQueen', username: '@green_queen', points: 2280, streak: 38, avatar: 'G' },
        { rank: 3, name: 'PlantDaddy', username: '@plant_daddy', points: 2150, streak: 42, avatar: 'P' },
        { rank: 4, name: 'ClimateChampion', username: '@climate_champ', points: 1950, streak: 35, avatar: 'C' },
        { rank: 5, name: 'ZeroWasteZara', username: '@zero_waste', points: 1820, streak: 30, avatar: 'Z' },
        { rank: 6, name: 'SolarSam', username: '@solar_sam', points: 1650, streak: 28, avatar: 'S' },
        { rank: 7, name: 'RecycleRita', username: '@recycle_rita', points: 1540, streak: 25, avatar: 'R' },
        { rank: 8, name: 'BikeLife', username: '@bike_life', points: 1420, streak: 22, avatar: 'B' },
        { rank: 9, name: 'CompostKing', username: '@compost_king', points: 1350, streak: 20, avatar: 'C' },
        { rank: 10, name: 'You', username: '@current_user', points: userData.points, streak: userData.streak, avatar: 'Y', isCurrentUser: true }
    ]
};

let currentChallengeType = 'daily';
let currentChallenge = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    displayChallenges('daily');
    displayLeaderboard('global');
    displayAchievements();
    startTimer();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Challenge tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (type === 'custom') {
                openCustomChallengeModal();
            } else {
                currentChallengeType = type;
                displayChallenges(type);
            }
        });
    });

    // Leaderboard tabs
    document.querySelectorAll('.leaderboard-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const scope = btn.dataset.scope;
            document.querySelectorAll('.leaderboard-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayLeaderboard(scope);
        });
    });

    // Modal close buttons
    document.getElementById('modalClose').addEventListener('click', closeChallengeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeChallengeModal);
    document.getElementById('customModalClose').addEventListener('click', closeCustomChallengeModal);
    document.getElementById('cancelCustomBtn').addEventListener('click', closeCustomChallengeModal);

    // Modal overlay clicks
    document.getElementById('challengeModal').addEventListener('click', (e) => {
        if (e.target.id === 'challengeModal') closeChallengeModal();
    });
    document.getElementById('customChallengeModal').addEventListener('click', (e) => {
        if (e.target.id === 'customChallengeModal') closeCustomChallengeModal();
    });

    // Complete button
    document.getElementById('completeBtn').addEventListener('click', completeChallenge);

    // Create custom challenge button
    document.getElementById('createCustomBtn').addEventListener('click', createCustomChallenge);
}

// Load User Data
function loadUserData() {
    document.getElementById('userStreak').textContent = userData.streak;
    document.getElementById('userPoints').textContent = userData.points;
    document.getElementById('userRank').textContent = userData.rank || '-';
    document.getElementById('completedChallenges').textContent = userData.completedChallenges.length;
}

// Display Challenges
function displayChallenges(type) {
    const challenges = challengesDatabase[type] || [];
    const grid = document.getElementById('challengesGrid');
    
    // Update title
    const titles = {
        daily: "Today's Challenges",
        weekly: "This Week's Challenges",
        monthly: "This Month's Challenges"
    };
    document.getElementById('challengesTitle').textContent = titles[type] || 'Challenges';
    
    if (challenges.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <i class="fas fa-leaf" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <p style="color: #999; font-size: 1.1rem;">No challenges available yet</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = challenges.map(challenge => {
        const isCompleted = userData.completedChallenges.includes(challenge.id);
        
        return `
            <div class="challenge-card ${isCompleted ? 'completed' : ''}" onclick="openChallengeModal('${challenge.id}', '${type}')">
                <div class="challenge-header">
                    <div class="challenge-icon">${challenge.icon}</div>
                    <div class="challenge-badges">
                        <span class="challenge-badge badge-difficulty">${challenge.difficulty}</span>
                        <span class="challenge-badge badge-points">+${challenge.points} pts</span>
                    </div>
                </div>
                
                <h3 class="challenge-title">${challenge.title}</h3>
                <p class="challenge-description">${challenge.description}</p>
                
                <div class="challenge-meta">
                    <div class="meta-item">
                        <i class="fa-solid fa-calendar"></i>
                        <span>${challenge.duration} ${challenge.duration === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fa-solid fa-tag"></i>
                        <span>${getCategoryName(challenge.category)}</span>
                    </div>
                </div>
                
                ${isCompleted ? `
                    <div class="challenge-progress">
                        <div class="progress-label">
                            <span>Completed</span>
                            <span>100%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 100%"></div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="challenge-footer">
                    <div class="challenge-impact">
                        <i class="fa-solid fa-leaf"></i>
                        <span>${challenge.impact}</span>
                    </div>
                    <button class="challenge-btn ${isCompleted ? 'completed-btn' : ''}" onclick="event.stopPropagation(); openChallengeModal('${challenge.id}', '${type}')">
                        ${isCompleted ? '<i class="fa-solid fa-check"></i> Completed' : 'Start Challenge'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Open Challenge Modal
function openChallengeModal(challengeId, type) {
    const challenges = challengesDatabase[type];
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    currentChallenge = challenge;
    const isCompleted = userData.completedChallenges.includes(challenge.id);
    
    document.getElementById('modalHeader').innerHTML = `
        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 15px;">
            <div style="font-size: 4rem;">${challenge.icon}</div>
            <div>
                <h2>${challenge.title}</h2>
                <p>${challenge.description}</p>
            </div>
        </div>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
            <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 10px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Points</div>
                <div style="font-size: 1.8rem; font-weight: 700;">+${challenge.points}</div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 10px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Duration</div>
                <div style="font-size: 1.8rem; font-weight: 700;">${challenge.duration} ${challenge.duration === 1 ? 'day' : 'days'}</div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 10px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Impact</div>
                <div style="font-size: 1.8rem; font-weight: 700;">${challenge.impact}</div>
            </div>
        </div>
    `;
    
    document.getElementById('modalBody').innerHTML = `
        <h3 style="margin-bottom: 15px;">
            <i class="fa-solid fa-lightbulb" style="color: var(--primary-color);"></i>
            Tips for Success
        </h3>
        <ul style="list-style: none; padding: 0;">
            ${challenge.tips.map(tip => `
                <li style="padding: 12px; margin-bottom: 10px; background: var(--bg-light); border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                    <i class="fa-solid fa-check-circle" style="color: var(--success-color); font-size: 1.2rem;"></i>
                    <span>${tip}</span>
                </li>
            `).join('')}
        </ul>
        
        ${isCompleted ? `
            <div style="margin-top: 30px; padding: 20px; background: #d1fae5; border-radius: 10px; text-align: center;">
                <i class="fa-solid fa-trophy" style="font-size: 2.5rem; color: var(--success-color); margin-bottom: 10px;"></i>
                <h3 style="color: var(--success-color); margin-bottom: 5px;">Challenge Completed!</h3>
                <p style="color: #065f46;">You've already completed this challenge. Great job!</p>
            </div>
        ` : ''}
    `;
    
    const completeBtn = document.getElementById('completeBtn');
    if (isCompleted) {
        completeBtn.style.display = 'none';
    } else {
        completeBtn.style.display = 'flex';
    }
    
    document.getElementById('challengeModal').classList.add('active');
}

// Close Challenge Modal
function closeChallengeModal() {
    document.getElementById('challengeModal').classList.remove('active');
    currentChallenge = null;
}

// Complete Challenge
function completeChallenge() {
    if (!currentChallenge) return;
    
    if (userData.completedChallenges.includes(currentChallenge.id)) {
        alert('You have already completed this challenge!');
        return;
    }
    
    // Update user data
    userData.points += currentChallenge.points;
    userData.streak++;
    userData.completedChallenges.push(currentChallenge.id);
    
    // Check achievements
    checkAchievements();
    
    // Save data
    localStorage.setItem('ecoChallengeUser', JSON.stringify(userData));
    
    // Update UI
    loadUserData();
    displayChallenges(currentChallengeType);
    displayAchievements();
    closeChallengeModal();
    
    // Show success message
    alert(`🎉 Challenge Completed!\n\nYou earned ${currentChallenge.points} points!\nTotal Points: ${userData.points}\nStreak: ${userData.streak} days`);
}

// Check Achievements
function checkAchievements() {
    const achievements = achievementsDatabase;
    
    // First challenge
    if (userData.completedChallenges.length === 1 && !achievements[0].unlocked) {
        achievements[0].unlocked = true;
        showAchievementUnlocked(achievements[0]);
    }
    
    // Week streak
    if (userData.streak >= 7 && !achievements[1].unlocked) {
        achievements[1].unlocked = true;
        showAchievementUnlocked(achievements[1]);
    }
    
    // 100 points
    if (userData.points >= 100 && !achievements[2].unlocked) {
        achievements[2].unlocked = true;
        showAchievementUnlocked(achievements[2]);
    }
    
    // 5 challenges
    if (userData.completedChallenges.length >= 5 && !achievements[3].unlocked) {
        achievements[3].unlocked = true;
        showAchievementUnlocked(achievements[3]);
    }
    
    // 1000 points
    if (userData.points >= 1000 && !achievements[5].unlocked) {
        achievements[5].unlocked = true;
        showAchievementUnlocked(achievements[5]);
    }
}

// Show Achievement Unlocked
function showAchievementUnlocked(achievement) {
    setTimeout(() => {
        alert(`🏆 Achievement Unlocked!\n\n${achievement.icon} ${achievement.title}\n${achievement.description}`);
    }, 500);
}

// Display Leaderboard
function displayLeaderboard(scope) {
    const data = leaderboardData[scope] || leaderboardData.global;
    const container = document.getElementById('leaderboardTable');
    
    // Update current user's points in leaderboard
    const currentUserEntry = data.find(entry => entry.isCurrentUser);
    if (currentUserEntry) {
        currentUserEntry.points = userData.points;
        currentUserEntry.streak = userData.streak;
    }
    
    // Sort by points
    data.sort((a, b) => b.points - a.points);
    
    // Update ranks
    data.forEach((entry, index) => {
        entry.rank = index + 1;
    });
    
    container.innerHTML = data.map(entry => `
        <div class="leaderboard-item ${entry.isCurrentUser ? 'current-user' : ''}">
            <div class="rank ${entry.rank <= 3 ? 'top-3' : ''}">
                ${entry.rank <= 3 ? 
                    (entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉') 
                    : `#${entry.rank}`
                }
            </div>
            <div class="user-info">
                <div class="user-avatar">${entry.avatar}</div>
                <div class="user-details">
                    <h4>${entry.name}</h4>
                    <p>${entry.username}</p>
                </div>
            </div>
            <div class="points">${entry.points.toLocaleString()} pts</div>
            <div class="streak">
                <i class="fa-solid fa-fire"></i>
                <span>${entry.streak} days</span>
            </div>
        </div>
    `).join('');
}

// Display Achievements
function displayAchievements() {
    const container = document.getElementById('achievementsGrid');
    
    container.innerHTML = achievementsDatabase.map(achievement => `
        <div class="achievement-card ${!achievement.unlocked ? 'locked' : ''}">
            <div class="achievement-icon">${achievement.icon}</div>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
            <p class="achievement-date">
                ${achievement.unlocked ? '✓ Unlocked' : '🔒 Locked'}
            </p>
        </div>
    `).join('');
}

// Timer for daily reset
function startTimer() {
    function updateTimer() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('challengeTimer').textContent = 
            `Resets in ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Custom Challenge Functions
function openCustomChallengeModal() {
    document.getElementById('customChallengeModal').classList.add('active');
}

function closeCustomChallengeModal() {
    document.getElementById('customChallengeModal').classList.remove('active');
    document.getElementById('customChallengeForm').reset();
}

function createCustomChallenge() {
    const name = document.getElementById('challengeName').value;
    const description = document.getElementById('challengeDescription').value;
    const category = document.getElementById('challengeCategory').value;
    const difficulty = document.getElementById('challengeDifficulty').value;
    const duration = parseInt(document.getElementById('challengeDuration').value);
    const points = parseInt(document.getElementById('challengePoints').value);
    
    if (!name || !description || !category) {
        alert('Please fill in all required fields');
        return;
    }
    
    const customChallenge = {
        id: `custom-${Date.now()}`,
        title: name,
        description: description,
        icon: getCategoryIcon(category),
        category: category,
        difficulty: difficulty,
        points: points,
        duration: duration,
        impact: 'Custom Impact',
        tips: ['Complete the challenge as described', 'Track your progress', 'Share your success']
    };
    
    challengesDatabase.custom.push(customChallenge);
    
    closeCustomChallengeModal();
    alert('Custom challenge created successfully!');
    
    // Switch to custom tab
    document.querySelector('.tab-btn[data-type="custom"]').click();
    displayChallenges('custom');
}

// Helper Functions
function getCategoryName(category) {
    const names = {
        'food': 'Food & Diet',
        'waste': 'Waste Reduction',
        'transport': 'Transportation',
        'energy': 'Energy Saving',
        'water': 'Water Conservation',
        'community': 'Community Action'
    };
    return names[category] || category;
}

function getCategoryIcon(category) {
    const icons = {
        'food': '🍽️',
        'waste': '♻️',
        'transport': '🚲',
        'energy': '⚡',
        'water': '💧',
        'community': '👥'
    };
    return icons[category] || '🌍';
}
