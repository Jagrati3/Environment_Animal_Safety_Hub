const express = require('express');
const router = express.Router();

// In-memory storage (replace with database in production)
let challenges = [
    {
        id: 'meatless-monday',
        title: 'Meatless Monday',
        description: 'Skip meat for the entire day and explore delicious plant-based alternatives',
        category: 'food',
        difficulty: 'easy',
        points: 50,
        duration: 1,
        impact: 'Saves 4kg CO₂',
        type: 'daily',
        active: true
    },
    {
        id: 'plastic-free-day',
        title: 'Plastic-Free Day',
        description: 'Avoid all single-use plastics for 24 hours',
        category: 'waste',
        difficulty: 'medium',
        points: 75,
        duration: 1,
        impact: 'Prevents 0.5kg waste',
        type: 'daily',
        active: true
    },
    {
        id: 'beach-cleanup',
        title: 'Beach/Park Cleanup',
        description: 'Organize or join cleanup events totaling 4+ hours this month',
        category: 'community',
        difficulty: 'medium',
        points: 300,
        duration: 30,
        impact: 'Removes 20kg litter',
        type: 'monthly',
        active: true
    }
];

let users = [];
let completions = [];

// GET all challenges
router.get('/', (req, res) => {
    try {
        const { type, category, difficulty } = req.query;
        
        let filteredChallenges = challenges.filter(c => c.active);
        
        if (type) {
            filteredChallenges = filteredChallenges.filter(c => c.type === type);
        }
        
        if (category) {
            filteredChallenges = filteredChallenges.filter(c => c.category === category);
        }
        
        if (difficulty) {
            filteredChallenges = filteredChallenges.filter(c => c.difficulty === difficulty);
        }
        
        res.json({
            success: true,
            count: filteredChallenges.length,
            challenges: filteredChallenges
        });
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch challenges'
        });
    }
});

// GET single challenge by ID
router.get('/:id', (req, res) => {
    try {
        const challenge = challenges.find(c => c.id === req.params.id);
        
        if (!challenge) {
            return res.status(404).json({
                success: false,
                error: 'Challenge not found'
            });
        }
        
        res.json({
            success: true,
            challenge
        });
    } catch (error) {
        console.error('Error fetching challenge:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch challenge'
        });
    }
});

// POST create custom challenge
router.post('/custom', (req, res) => {
    try {
        const { title, description, category, difficulty, duration, points, userId } = req.body;
        
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        
        const customChallenge = {
            id: `custom-${Date.now()}`,
            title,
            description,
            category,
            difficulty: difficulty || 'medium',
            points: points || 50,
            duration: duration || 1,
            impact: 'Custom Impact',
            type: 'custom',
            createdBy: userId,
            active: true,
            createdAt: new Date().toISOString()
        };
        
        challenges.push(customChallenge);
        
        res.json({
            success: true,
            message: 'Custom challenge created successfully',
            challenge: customChallenge
        });
    } catch (error) {
        console.error('Error creating custom challenge:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create challenge'
        });
    }
});

// POST complete challenge
router.post('/complete', (req, res) => {
    try {
        const { challengeId, userId, userName } = req.body;
        
        if (!challengeId || !userId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        
        const challenge = challenges.find(c => c.id === challengeId);
        
        if (!challenge) {
            return res.status(404).json({
                success: false,
                error: 'Challenge not found'
            });
        }
        
        // Check if already completed
        const existingCompletion = completions.find(
            c => c.challengeId === challengeId && c.userId === userId
        );
        
        if (existingCompletion) {
            return res.status(400).json({
                success: false,
                error: 'Challenge already completed'
            });
        }
        
        // Create completion record
        const completion = {
            id: completions.length + 1,
            challengeId,
            userId,
            userName,
            points: challenge.points,
            completedAt: new Date().toISOString()
        };
        
        completions.push(completion);
        
        // Update user points
        let user = users.find(u => u.userId === userId);
        if (!user) {
            user = {
                userId,
                userName: userName || 'Anonymous',
                points: 0,
                streak: 0,
                completedChallenges: [],
                joinedAt: new Date().toISOString()
            };
            users.push(user);
        }
        
        user.points += challenge.points;
        user.streak++;
        user.completedChallenges.push(challengeId);
        
        res.json({
            success: true,
            message: 'Challenge completed successfully',
            completion,
            userStats: {
                points: user.points,
                streak: user.streak,
                totalCompleted: user.completedChallenges.length
            }
        });
    } catch (error) {
        console.error('Error completing challenge:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to complete challenge'
        });
    }
});

// GET user progress
router.get('/user/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = users.find(u => u.userId === userId);
        
        if (!user) {
            return res.json({
                success: true,
                user: {
                    userId,
                    points: 0,
                    streak: 0,
                    completedChallenges: [],
                    rank: users.length + 1
                }
            });
        }
        
        // Calculate rank
        const sortedUsers = [...users].sort((a, b) => b.points - a.points);
        const rank = sortedUsers.findIndex(u => u.userId === userId) + 1;
        
        res.json({
            success: true,
            user: {
                ...user,
                rank
            }
        });
    } catch (error) {
        console.error('Error fetching user progress:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user progress'
        });
    }
});

// GET leaderboard
router.get('/leaderboard/global', (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const sortedUsers = [...users]
            .sort((a, b) => b.points - a.points)
            .slice(0, parseInt(limit))
            .map((user, index) => ({
                rank: index + 1,
                userId: user.userId,
                userName: user.userName,
                points: user.points,
                streak: user.streak,
                completedChallenges: user.completedChallenges.length
            }));
        
        res.json({
            success: true,
            leaderboard: sortedUsers,
            totalUsers: users.length
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch leaderboard'
        });
    }
});

// GET challenge statistics
router.get('/stats/overview', (req, res) => {
    try {
        const totalChallenges = challenges.filter(c => c.active).length;
        const totalCompletions = completions.length;
        const totalUsers = users.length;
        const totalPoints = users.reduce((sum, u) => sum + u.points, 0);
        const totalCO2Saved = completions.length * 5; // Estimate
        
        // Most popular challenges
        const challengeCompletions = {};
        completions.forEach(c => {
            challengeCompletions[c.challengeId] = (challengeCompletions[c.challengeId] || 0) + 1;
        });
        
        const popularChallenges = Object.entries(challengeCompletions)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([challengeId, count]) => {
                const challenge = challenges.find(c => c.id === challengeId);
                return {
                    challengeId,
                    title: challenge?.title || 'Unknown',
                    completions: count
                };
            });
        
        res.json({
            success: true,
            stats: {
                totalChallenges,
                totalCompletions,
                totalUsers,
                totalPoints,
                estimatedCO2Saved: totalCO2Saved,
                popularChallenges
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics'
        });
    }
});

// GET user's completed challenges
router.get('/user/:userId/completed', (req, res) => {
    try {
        const { userId } = req.params;
        
        const userCompletions = completions
            .filter(c => c.userId === userId)
            .map(c => {
                const challenge = challenges.find(ch => ch.id === c.challengeId);
                return {
                    ...c,
                    challengeTitle: challenge?.title || 'Unknown',
                    challengeCategory: challenge?.category || 'unknown'
                };
            });
        
        res.json({
            success: true,
            completions: userCompletions,
            count: userCompletions.length
        });
    } catch (error) {
        console.error('Error fetching user completions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch completions'
        });
    }
});

module.exports = router;
