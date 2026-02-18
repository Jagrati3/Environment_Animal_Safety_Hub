const express = require('express');
const router = express.Router();
const {
  CompostingEntry,
  CompostingStats,
  CompostingAchievement,
  CompostingChallenge,
  CompostingLeaderboard,
} = require('../models/Composting');
const { authenticateToken } = require('../middleware/security');

// Waste type to CO2 conversion factors (kg CO2 per kg waste)
const wasteFactors = {
  fruits: 0.15,
  grains: 0.12,
  coffee: 0.18,
  eggshells: 0.1,
  'other-food': 0.14,
  leaves: 0.08,
  grass: 0.09,
  branches: 0.07,
  flowers: 0.08,
  newspaper: 0.11,
  cardboard: 0.13,
  'paper-bags': 0.1,
  shredded: 0.12,
};

// POST: Add composting entry
router.post('/entries', authenticateToken, async (req, res) => {
  try {
    const { wasteType, weight, method, notes, date } = req.body;

    if (!wasteType || !weight || !method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const wasteCategories = {
      fruits: 'food',
      grains: 'food',
      coffee: 'food',
      eggshells: 'food',
      'other-food': 'food',
      leaves: 'yard',
      grass: 'yard',
      branches: 'yard',
      flowers: 'yard',
      newspaper: 'paper',
      cardboard: 'paper',
      'paper-bags': 'paper',
      shredded: 'paper',
    };

    const category = wasteCategories[wasteType];
    const co2Avoided = weight * (wasteFactors[wasteType] || 0.1);

    const entry = new CompostingEntry({
      userId: req.user.id,
      wasteType,
      category,
      weight,
      method,
      notes,
      date: date ? new Date(date) : new Date(),
      co2Avoided,
    });

    await entry.save();

    // Update stats
    await updateCompostingStats(req.user.id);
    await checkAchievements(req.user.id);
    await updateLeaderboards(req.user.id);

    res.json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: All entries for user
router.get('/entries', authenticateToken, async (req, res) => {
  try {
    const entries = await CompostingEntry.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: User stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    let stats = await CompostingStats.findOne({ userId: req.user.id });

    if (!stats) {
      stats = new CompostingStats({ userId: req.user.id });
      await stats.save();
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: User achievements
router.get('/achievements', authenticateToken, async (req, res) => {
  try {
    const achievements = await CompostingAchievement.find({ userId: req.user.id }).sort({
      unlockedDate: -1,
    });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const period = req.query.period || 'all-time';

    const leaderboard = await CompostingLeaderboard.find({ period })
      .sort({ rank: 1 })
      .limit(50)
      .populate('userId', 'name email');

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Active challenges
router.get('/challenges', async (req, res) => {
  try {
    const challenges = await CompostingChallenge.find({ status: 'active' })
      .populate('participants', 'name email')
      .sort({ endDate: 1 });

    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Join challenge
router.post('/challenges/:challengeId/join', authenticateToken, async (req, res) => {
  try {
    const challenge = await CompostingChallenge.findById(req.params.challengeId);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    if (!challenge.participants.includes(req.user.id)) {
      challenge.participants.push(req.user.id);
      await challenge.save();
    }

    res.json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Remove entry
router.delete('/entries/:entryId', authenticateToken, async (req, res) => {
  try {
    const entry = await CompostingEntry.findById(req.params.entryId);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    if (entry.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await CompostingEntry.deleteOne({ _id: req.params.entryId });

    // Recalculate stats
    await updateCompostingStats(req.user.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to update composting stats
async function updateCompostingStats(userId) {
  try {
    const entries = await CompostingEntry.find({ userId });

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));

    const totalComposted = entries.reduce((sum, e) => sum + e.weight, 0);
    const monthlyComposted = entries
      .filter((e) => new Date(e.date) >= monthStart)
      .reduce((sum, e) => sum + e.weight, 0);
    const weeklyComposted = entries
      .filter((e) => new Date(e.date) >= weekStart)
      .reduce((sum, e) => sum + e.weight, 0);
    const co2Avoided = entries.reduce((sum, e) => sum + e.co2Avoided, 0);

    const wasteByCategory = {
      food: entries
        .filter((e) => e.category === 'food')
        .reduce((sum, e) => sum + e.weight, 0),
      yard: entries
        .filter((e) => e.category === 'yard')
        .reduce((sum, e) => sum + e.weight, 0),
      paper: entries
        .filter((e) => e.category === 'paper')
        .reduce((sum, e) => sum + e.weight, 0),
    };

    // Calculate streak
    let streak = 0;
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedEntries.length > 0) {
      let currentDate = new Date(sortedEntries[0].date);
      currentDate.setHours(0, 0, 0, 0);

      for (const entry of sortedEntries) {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);

        if (currentDate - entryDate === 0 || currentDate - entryDate === 86400000) {
          streak++;
          currentDate = new Date(entryDate);
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    let stats = await CompostingStats.findOne({ userId });

    if (!stats) {
      stats = new CompostingStats({ userId });
    }

    stats.totalComposted = totalComposted;
    stats.monthlyComposted = monthlyComposted;
    stats.weeklyComposted = weeklyComposted;
    stats.composingStreak = streak;
    stats.totalEntries = entries.length;
    stats.wasteByCategory = wasteByCategory;
    stats.co2Avoided = co2Avoided;
    stats.lastUpdated = new Date();

    await stats.save();
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

// Helper function to check and award achievements
async function checkAchievements(userId) {
  try {
    const achievements = [
      { id: 'first-compost', name: 'First Compost', icon: '🌱' },
      { id: 'compost-collector', name: 'Compost Collector', icon: '♻️' },
      { id: 'waste-warrior', name: 'Waste Warrior', icon: '⚔️' },
      { id: 'green-guardian', name: 'Green Guardian', icon: '🌍' },
      { id: 'community-hero', name: 'Community Hero', icon: '🦸' },
      { id: 'seven-day-streak', name: '7-Day Streak', icon: '🔥' },
    ];

    const stats = await CompostingStats.findOne({ userId });
    const hasAchievement = await CompostingAchievement.find({ userId });

    const unlockedIds = hasAchievement.map((a) => a.achievementId);

    // First Compost
    if (!unlockedIds.includes('first-compost') && stats.totalEntries >= 1) {
      await new CompostingAchievement({
        userId,
        achievementId: 'first-compost',
        name: 'First Compost',
        icon: '🌱',
      }).save();
    }

    // Compost Collector (10 entries)
    if (!unlockedIds.includes('compost-collector') && stats.totalEntries >= 10) {
      await new CompostingAchievement({
        userId,
        achievementId: 'compost-collector',
        name: 'Compost Collector',
        icon: '♻️',
      }).save();
    }

    // Waste Warrior (50kg)
    if (!unlockedIds.includes('waste-warrior') && stats.totalComposted >= 50) {
      await new CompostingAchievement({
        userId,
        achievementId: 'waste-warrior',
        name: 'Waste Warrior',
        icon: '⚔️',
      }).save();
    }

    // Green Guardian (100kg)
    if (!unlockedIds.includes('green-guardian') && stats.totalComposted >= 100) {
      await new CompostingAchievement({
        userId,
        achievementId: 'green-guardian',
        name: 'Green Guardian',
        icon: '🌍',
      }).save();
    }

    // 7-Day Streak
    if (!unlockedIds.includes('seven-day-streak') && stats.composingStreak >= 7) {
      await new CompostingAchievement({
        userId,
        achievementId: 'seven-day-streak',
        name: '7-Day Streak',
        icon: '🔥',
      }).save();
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
}

// Helper function to update leaderboards
async function updateLeaderboards(userId) {
  try {
    const stats = await CompostingStats.findOne({ userId });

    if (!stats) return;

    const score = stats.totalComposted + stats.composingStreak * 5 + stats.totalEntries * 2;

    const periods = ['all-time', 'monthly', 'weekly'];

    for (const period of periods) {
      let entry = await CompostingLeaderboard.findOne({ userId, period });

      if (!entry) {
        entry = new CompostingLeaderboard({ userId, period });
      }

      entry.score = score;
      await entry.save();

      // Update ranks
      const leaderboardEntries = await CompostingLeaderboard.find({ period })
        .sort({ score: -1 })
        .exec();

      for (let i = 0; i < leaderboardEntries.length; i++) {
        leaderboardEntries[i].rank = i + 1;
        await leaderboardEntries[i].save();
      }
    }
  } catch (error) {
    console.error('Error updating leaderboards:', error);
  }
}

module.exports = router;
