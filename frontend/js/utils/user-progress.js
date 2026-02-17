import { checkNewBadges } from './achievements.js';

const STORAGE_KEY = 'env_hub_user_progress';

class UserProgressService {
    constructor() {
        this.state = this.loadState();
        this.listeners = [];
    }

    get defaultState() {
        return {
            xp: 0,
            level: 1,
            nextLevelXp: 500,
            badges: [], // Array of badge objects
            quizzes: {}, // { quizId: { completed: true, maxScore: 80, date: ... } }
            games: {},   // { gameId: { highScore: 100, plays: 5, lastPlayed: ... } }
            lastLogin: new Date().toISOString()
        };
    }

    loadState() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...this.defaultState, ...JSON.parse(stored) };
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
        return this.defaultState;
    }

    saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            this.notifyListeners();
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }

    // --- Actions ---

    addXP(amount) {
        this.state.xp += amount;
        this.checkLevelUp();
        this.checkBadges();
        this.saveState();
        this.showToast(`+${amount} XP`);
    }

    /**
     * Records a quiz result.
     * @param {string} quizId 
     * @param {number} score 
     * @param {number} maxScore 
     */
    completeQuiz(quizId, score, maxPossibleScore) {
        const existing = this.state.quizzes[quizId] || {};
        const isNewCompletion = !existing.completed;
        const currentHigh = existing.maxScore || 0;

        this.state.quizzes[quizId] = {
            completed: true,
            maxScore: Math.max(currentHigh, score),
            lastTaken: new Date().toISOString(),
            attempts: (existing.attempts || 0) + 1
        };

        // Award XP logic
        let xpGained = 0;
        if (isNewCompletion) {
            xpGained = 50; // First time completion bonus
        } else if (score > currentHigh) {
            xpGained = 10; // Improved score bonus
        } else {
            xpGained = 5; // Participation
        }

        this.addXP(xpGained);
    }

    /**
     * Records a game session.
     * @param {string} gameId 
     * @param {number} score 
     */
    recordGame(gameId, score) {
        const existing = this.state.games[gameId] || {};
        const currentHigh = existing.highScore || 0;

        let isNewRecord = false;
        if (score > currentHigh) {
            isNewRecord = true;
        }

        this.state.games[gameId] = {
            highScore: Math.max(currentHigh, score),
            plays: (existing.plays || 0) + 1,
            lastPlayed: new Date().toISOString()
        };

        // Game XP Logic
        let xpGained = 10; // Participation
        if (isNewRecord && (existing.plays || 0) > 0) {
            xpGained += 20; // New Record Bonus (not valid for first play technically, but simple enough)
        }

        if (score > 0) {
            this.addXP(xpGained);
            if (isNewRecord) {
                this.showToast('🏆 New High Score!');
            }
        } else {
            this.saveState(); // Just save the play count
        }
    }

    // --- Internal Checks ---

    checkLevelUp() {
        // Simple linear leveling for now: Level * 500 XP required
        // Or accumulating: Level 2 at 500, Level 3 at 1000...
        const xpNeeded = this.state.level * 500;
        if (this.state.xp >= xpNeeded) {
            this.state.level++;
            this.state.nextLevelXp = this.state.level * 500;
            this.showToast(`🎉 Level Up! You are now Level ${this.state.level}`);
        }
    }

    checkBadges() {
        const newBadges = checkNewBadges(this.state);
        if (newBadges.length > 0) {
            this.state.badges.push(...newBadges);
            newBadges.forEach(b => {
                this.showToast(`🏅 Badge Unlocked: ${b.name}`);
            });
        }
    }

    // --- UI Integration ---

    subscribe(listener) {
        this.listeners.push(listener);
        // Immediately invoke with current state
        listener(this.state);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(l => l(this.state));
    }

    showToast(message) {
        // Dispatch a custom event that the UI component will listen for
        window.dispatchEvent(new CustomEvent('progress-toast', { detail: { message } }));
        console.log(`[Progress] ${message}`);
    }
}

// Singleton export
export const UserProgress = new UserProgressService();
// Expose to window for debugging
window.UserProgress = UserProgress; 
