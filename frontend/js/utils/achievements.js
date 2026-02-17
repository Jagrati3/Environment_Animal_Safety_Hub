/**
 * Achievement Definitions and Logic
 */

export const BADGES = {
    EARTH_START: {
        id: 'earth_start',
        name: 'Earth Guardian Initiate',
        icon: '🌱',
        description: 'Earned your first 100 XP!'
    },
    WASTE_WARRIOR: {
        id: 'waste_warrior',
        name: 'Waste Warrior',
        icon: '♻️',
        description: 'Mastered waste management by learning and playing.'
    },
    CARBON_CRUSHER: {
        id: 'carbon_crusher',
        name: 'Carbon Crusher',
        icon: '👣',
        description: 'Reduced carbon footprint in the Carbon Race.'
    },
    QUIZ_MASTER: {
        id: 'quiz_master',
        name: 'Knowledge Seeker',
        icon: '🧠',
        description: 'Completed 3 different quizzes.'
    }
};

/**
 * Checks for newly unlocked badges based on user progress.
 * @param {Object} state - The current user state (xp, quizzes, games, badges).
 * @returns {Array} - Array of newly unlocked badge objects.
 */
export function checkNewBadges(state) {
    const newBadges = [];
    const ownedBadgeIds = new Set(state.badges.map(b => b.id));

    // Helper to add badge if not owned
    const grant = (badgeDef) => {
        if (!ownedBadgeIds.has(badgeDef.id)) {
            newBadges.push(badgeDef);
            // Add to set to prevent duplicates in same check (though unlikely)
            ownedBadgeIds.add(badgeDef.id);
        }
    };

    // 1. XP Milestones
    if (state.xp >= 100) {
        grant(BADGES.EARTH_START);
    }

    // 2. Waste Warrior (Example logic: Completed specific quiz AND played specific game)
    // Adjust IDs based on actual quiz/game IDs used in the app
    const wasteQuiz = state.quizzes['waste-management'] || state.quizzes['recycling']; // robust check
    const trashGame = state.games['trash-bin-match'];

    if (wasteQuiz && trashGame) {
        grant(BADGES.WASTE_WARRIOR);
    }

    // 3. Carbon Crusher
    if (state.games['carbon-race'] && state.games['carbon-race'].highScore > 50) { // Example threshold
        grant(BADGES.CARBON_CRUSHER);
    }

    // 4. Quiz Master
    if (Object.keys(state.quizzes).length >= 3) {
        grant(BADGES.QUIZ_MASTER);
    }

    return newBadges;
}
