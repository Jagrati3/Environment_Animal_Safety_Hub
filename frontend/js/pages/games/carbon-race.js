/**
 * Carbon Footprint Racing Game
 *
 * Interactive racing game where players answer environmental questions to reduce
 * their carbon footprint while racing towards an eco-friendly goal.
 *
 * Features:
 * - 10-question environmental knowledge base
 * - Dynamic carbon footprint meter (0-100%)
 * - Hero character movement with parallax background
 * - Question thresholds at 20%, 40%, 60%, 80%, 100% progress
 * - Scoring system with badges based on performance
 * - Visual feedback for correct/incorrect answers
 * - Auto-advancing gameplay with smooth animations
 * - Performance-based achievements (Earth Guardian, Eco Warrior, etc.)
 *
 * @author Environment & Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

// ========== GAME CONFIGURATION ==========

/**
 * Game state object containing all dynamic variables
 * @typedef {Object} GameState
 * @property {number} distance - Progress distance (0-100%)
 * @property {number} carbon - Carbon footprint percentage (0-100%)
 * @property {number} correct - Number of correct answers
 * @property {number} score - Total game score
 * @property {number} currentQ - Current question index
 * @property {boolean} isAnswering - Whether player is currently answering a question
 * @property {Array} questionsForGame - Selected questions for current game session
 * @property {Array<number>} questionThresholds - Distance percentages where questions appear
 */
const gameState = {
    distance: 0,        // 0% to 100%
    carbon: 100,        // 100% to 0% (starts high, decreases with good answers)
    correct: 0,         // Number of correct answers
    score: 0,           // Total score
    currentQ: 0,        // Current question index
    isAnswering: false, // Whether player is answering
    questionsForGame: [], // Selected 5 questions for current game
    questionThresholds: [20, 40, 60, 80, 100] // Distance % when questions appear
};

// ========== QUESTION BANK ==========

/**
 * Environmental questions database
 * @type {Array<{q: string, opts: string[], ans: string, reduce: number}>}
 */
const questionBank = [
    {
        q: "Which transport is most eco-friendly?",
        opts: ["Private Car", "Bicycle", "Airplane", "Motorcycle"],
        ans: "Bicycle",
        reduce: 20 // Carbon reduction for correct answer
    },
    {
        q: "What should we do with lights when leaving a room?",
        opts: ["Leave them on", "Turn them off", "Dim them", "Doesn't matter"],
        ans: "Turn them off",
        reduce: 15
    },
    {
        q: "Which bag is best for the environment?",
        opts: ["Plastic Bag", "Reusable Cloth Bag", "Paper Bag", "Disposable Bag"],
        ans: "Reusable Cloth Bag",
        reduce: 18
    },
    {
        q: "Which energy source is renewable?",
        opts: ["Coal", "Solar Power", "Natural Gas", "Petroleum"],
        ans: "Solar Power",
        reduce: 25
    },
    {
        q: "What's the best way to save water?",
        opts: ["Long Bath", "Short Shower", "Leave Tap Running", "Wash Car Daily"],
        ans: "Short Shower",
        reduce: 22
    },
    {
        q: "Which food choice has the lowest carbon footprint?",
        opts: ["Beef", "Chicken", "Plant-based meal", "Lamb"],
        ans: "Plant-based meal",
        reduce: 20
    },
    {
        q: "What's the best way to reduce plastic waste?",
        opts: ["Recycle everything", "Use reusable containers", "Buy biodegradable plastic", "Burn plastic waste"],
        ans: "Use reusable containers",
        reduce: 18
    },
    {
        q: "Which appliance uses the most energy at home?",
        opts: ["LED Light bulb", "Air Conditioner", "Mobile charger", "Laptop"],
        ans: "Air Conditioner",
        reduce: 15
    },
    {
        q: "What's the most eco-friendly way to dispose of e-waste?",
        opts: ["Throw in trash", "Recycle at e-waste center", "Bury in backyard", "Burn it"],
        ans: "Recycle at e-waste center",
        reduce: 22
    },
    {
        q: "Which action saves the most trees?",
        opts: ["Use digital documents", "Recycle paper", "Plant one tree", "Use thicker paper"],
        ans: "Use digital documents",
        reduce: 20
    }
];

// ========== DOM ELEMENTS ==========

/**
 * DOM element references for game UI
 */
const elements = {
    // Screens
    welcomeScreen: document.getElementById('welcomeScreen'),
    gameScreen: document.getElementById('gameScreen'),
    resultScreen: document.getElementById('resultScreen'),

    // Buttons
    startBtn: document.getElementById('startBtn'),
    restartBtn: document.getElementById('restartBtn'),

    // Game elements
    hero: document.getElementById('hero'),
    parallax: document.getElementById('parallax'),
    carbonFill: document.getElementById('carbonFill'),
    carbonValue: document.getElementById('carbonValue'),
    distanceValue: document.getElementById('distanceValue'),
    correctValue: document.getElementById('correctValue'),
    scoreValue: document.getElementById('scoreValue'),
    gameMsg: document.getElementById('gameMsg'),

    // Modal elements
    modal: document.getElementById('modal'),
    questionText: document.getElementById('questionText'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),

    // Result elements
    badgeEmoji: document.getElementById('badgeEmoji'),
    badgeTitle: document.getElementById('badgeTitle'),
    badgeDesc: document.getElementById('badgeDesc'),
    finalCarbon: document.getElementById('finalCarbon'),
    finalCorrect: document.getElementById('finalCorrect'),
    finalScore: document.getElementById('finalScore')
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Shuffle array and return random 5 questions for the game
 * @returns {Array} Array of 5 randomly selected questions
 */
function getRandomQuestions() {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
}

/**
 * Switch between game screens (welcome, game, result)
 * @param {string} screen - Screen to display ('welcome', 'game', 'result')
 */
function switchScreen(screen) {
    // Hide all screens
    elements.welcomeScreen.classList.remove('active');
    elements.gameScreen.classList.remove('active');
    elements.resultScreen.classList.remove('active');

    // Show selected screen
    switch (screen) {
        case 'welcome':
            elements.welcomeScreen.classList.add('active');
            break;
        case 'game':
            elements.gameScreen.classList.add('active');
            break;
        case 'result':
            elements.resultScreen.classList.add('active');
            break;
    }
}

/**
 * Update carbon footprint meter visual and value
 */
function updateCarbonMeter() {
    const percentage = Math.max(0, Math.min(100, gameState.carbon));
    elements.carbonFill.style.width = percentage + '%';
    elements.carbonValue.textContent = Math.round(percentage) + '%';

    // Update color classes based on carbon level
    elements.carbonFill.classList.remove('low', 'medium');
    if (percentage <= 30) {
        elements.carbonFill.classList.add('low');
    } else if (percentage <= 60) {
        elements.carbonFill.classList.add('medium');
    }
}

/**
 * Update game statistics display
 */
function updateStats() {
    elements.distanceValue.textContent = Math.round(gameState.distance) + '%';
    elements.correctValue.textContent = gameState.correct;
    elements.scoreValue.textContent = gameState.score;
}

/**
 * Move hero character across the screen with parallax effect
 * @param {number} distance - Distance to move (percentage points)
 */
function moveHero(distance) {
    gameState.distance = Math.min(100, gameState.distance + distance);

    // Calculate pixel position for left-to-right movement
    const trackWidth = elements.hero.parentElement.offsetWidth - 100; // Account for hero size
    const pixelPosition = (gameState.distance / 100) * trackWidth;

    // Move hero from left to right
    elements.hero.style.transform = `translateX(${pixelPosition}px)`;

    // Parallax effect - background moves slower in opposite direction
    elements.parallax.style.transform = `translateX(-${gameState.distance * 0.5}%)`;

    updateStats();
}

/**
 * Display temporary game message
 * @param {string} text - Message text to display
 * @param {number} duration - Display duration in milliseconds (default: 2000)
 */
function showGameMessage(text, duration = 2000) {
    elements.gameMsg.textContent = text;
    elements.gameMsg.style.display = 'inline-block';

    setTimeout(() => {
        elements.gameMsg.style.display = 'none';
    }, duration);
}

// ========== GAME LOGIC ==========

/**
 * Start new game - reset all state and begin racing
 */
function startGame() {
    // Reset game state
    gameState.distance = 0;
    gameState.carbon = 100;
    gameState.correct = 0;
    gameState.score = 0;
    gameState.currentQ = 0;
    gameState.isAnswering = false;

    // Get 5 random questions for this game session
    gameState.questionsForGame = getRandomQuestions();

    // Reset UI elements
    elements.hero.style.transform = 'translateX(0)';
    elements.hero.classList.remove('slowed');
    elements.parallax.style.transform = 'translateX(0)';

    updateCarbonMeter();
    updateStats();

    // Switch to game screen and start
    switchScreen('game');
    showGameMessage('🌍 Let\'s start your eco-journey!');

    setTimeout(() => runRace(), 2500);
}

/**
 * Main game loop - handle automatic movement and question triggers
 */
function runRace() {
    // Check if race is complete
    if (gameState.distance >= 100) {
        endGame();
        return;
    }

    // Check if we've reached a question threshold
    const nextThreshold = gameState.questionThresholds[gameState.currentQ];
    if (gameState.distance >= nextThreshold &&
        gameState.currentQ < gameState.questionsForGame.length &&
        !gameState.isAnswering) {
        // Stop and show question
        showQuestion();
    } else if (gameState.distance < 100 && !gameState.isAnswering) {
        // Continue auto-moving
        setTimeout(() => {
            moveHero(1.5); // Smooth movement increment
            runRace();
        }, 80);
    }
}

/**
 * Display question modal and options
 */
function showQuestion() {
    gameState.isAnswering = true;
    const currentQuestion = gameState.questionsForGame[gameState.currentQ];

    elements.questionText.textContent = currentQuestion.q;
    elements.options.innerHTML = '';
    elements.feedback.classList.remove('active', 'correct', 'wrong');
    elements.feedback.textContent = '';

    // Create option buttons
    currentQuestion.opts.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => handleAnswer(option, button, currentQuestion);
        elements.options.appendChild(button);
    });

    elements.modal.classList.add('active');
}

/**
 * Handle player's answer selection
 * @param {string} selectedAnswer - The selected answer text
 * @param {HTMLElement} buttonElement - The clicked button element
 * @param {Object} question - The current question object
 */
function handleAnswer(selectedAnswer, buttonElement, question) {
    const isCorrect = selectedAnswer === question.ans;

    // Disable all buttons to prevent multiple clicks
    const allButtons = elements.options.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        // CORRECT ANSWER
        buttonElement.classList.add('correct');
        elements.feedback.textContent = '✅ Excellent! You\'re helping the planet!';
        elements.feedback.classList.add('active', 'correct');

        // Update score and carbon
        gameState.correct++;
        gameState.score += 20; // +20 for correct answer
        gameState.carbon = Math.max(0, gameState.carbon - question.reduce);

        // Move hero forward after delay
        setTimeout(() => {
            const remainingDistance = gameState.questionThresholds[gameState.currentQ] - gameState.distance;
            moveHero(remainingDistance + 2); // Move to threshold + extra
        }, 1200);

    } else {
        // WRONG ANSWER
        buttonElement.classList.add('wrong');
        elements.feedback.textContent = '❌ Oops! That increases your carbon footprint!';
        elements.feedback.classList.add('active', 'wrong');

        // Update score and carbon
        gameState.score = Math.max(0, gameState.score - 5); // -5 for wrong answer
        gameState.carbon = Math.min(100, gameState.carbon + 10); // Increase carbon

        // Apply slowed effect
        elements.hero.classList.add('slowed');
        setTimeout(() => elements.hero.classList.remove('slowed'), 800);

        // Move hero forward (smaller distance)
        setTimeout(() => {
            const remainingDistance = gameState.questionThresholds[gameState.currentQ] - gameState.distance;
            moveHero(Math.max(1, remainingDistance + 1));
        }, 1200);
    }

    updateCarbonMeter();
    updateStats();

    // Close modal and continue race
    setTimeout(() => {
        elements.modal.classList.remove('active');
        gameState.currentQ++;
        gameState.isAnswering = false;

        setTimeout(() => runRace(), 500);
    }, 2800);
}

/**
 * End game and display results with badge
 */
function endGame() {
    // Calculate performance-based badge
    const correctPercentage = (gameState.correct / gameState.questionsForGame.length) * 100;

    let badge = {
        emoji: '🌍',
        title: 'Eco Learner',
        desc: 'Keep learning about our planet!',
        color: '#4AB864'
    };

    if (gameState.carbon <= 20 && correctPercentage >= 80) {
        badge = {
            emoji: '🏆',
            title: 'Earth Guardian',
            desc: 'You\'re a true eco-champion!',
            color: '#FFD700'
        };
    } else if (gameState.carbon <= 40 && correctPercentage >= 60) {
        badge = {
            emoji: '⭐',
            title: 'Eco Warrior',
            desc: 'You\'re making a real difference!',
            color: '#00FF87'
        };
    } else if (gameState.carbon <= 60 && correctPercentage >= 40) {
        badge = {
            emoji: '🌱',
            title: 'Nature Friend',
            desc: 'You care about the environment!',
            color: '#5FD68A'
        };
    }

    // Update result screen
    elements.badgeEmoji.textContent = badge.emoji;
    elements.badgeTitle.textContent = badge.title;
    elements.badgeTitle.style.color = badge.color;
    elements.badgeDesc.textContent = badge.desc;
    elements.finalCarbon.textContent = Math.round(gameState.carbon) + '%';
    elements.finalCorrect.textContent = `${gameState.correct}/${gameState.questionsForGame.length}`;
    elements.finalScore.textContent = gameState.score;

    // Report to UserProgress
    if (window.UserProgress) {
        window.UserProgress.recordGame('carbon-race', gameState.score);
    }

    // Color-code carbon score
    if (gameState.carbon <= 30) {
        elements.finalCarbon.style.color = '#00FF87'; // Green
    } else if (gameState.carbon <= 60) {
        elements.finalCarbon.style.color = '#FFD700'; // Yellow
    } else {
        elements.finalCarbon.style.color = '#FF4D4D'; // Red
    }

    // Switch to result screen
    setTimeout(() => switchScreen('result'), 1000);
}

// ========== EVENT LISTENERS ==========

// Start game button
elements.startBtn.addEventListener('click', startGame);

// Restart button - complete reset without page refresh
elements.restartBtn.addEventListener('click', () => {
    // Reset all state
    gameState.distance = 0;
    gameState.carbon = 100;
    gameState.correct = 0;
    gameState.score = 0;
    gameState.currentQ = 0;
    gameState.isAnswering = false;
    gameState.questionsForGame = [];

    // Reset UI elements
    elements.hero.style.transform = 'translateX(0)';
    elements.hero.classList.remove('slowed');
    elements.parallax.style.transform = 'translateX(0)';
    elements.modal.classList.remove('active');

    updateCarbonMeter();
    updateStats();

    // Return to welcome screen
    switchScreen('welcome');
});

// Prevent modal close during active questions
elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal || e.target.classList.contains('modal-bg')) {
        if (gameState.isAnswering) {
            e.stopPropagation();
        }
    }
});

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
    switchScreen('welcome');
    updateCarbonMeter();
    updateStats();

    console.log('🌍 Eco-Runner Premium Game Loaded!');
    console.log(`📚 Question Bank: ${questionBank.length} questions available`);
});