const express = require('express');
const router = express.Router();
const {
  CarbonActivity,
  CarbonGoals,
  CarbonStatistics,
  CarbonInsight,
  CarbonAchievement,
} = require('../models/CarbonFootprint');

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  car: 0.21, // per km
  'car-electric': 0.05,
  'public-transport': 0.05,
  flight: 0.255,
  bike: 0,
  electricity: 0.29, // per kwh
  gas: 2.04, // per cubic meter
  water: 0.2, // per liter
  meat: 27, // per kg
  dairy: 1.3, // per liter
  vegetables: 0.5, // per kg
  shopping: 5, // per item
  waste: 0.5, // per kg
  recycling: -0.2, // per kg (offset)
};

const CATEGORY_MAP = {
  car: 'transportation',
  'car-electric': 'transportation',
  'public-transport': 'transportation',
  flight: 'transportation',
  bike: 'transportation',
  electricity: 'energy',
  gas: 'energy',
  water: 'energy',
  meat: 'consumption',
  dairy: 'consumption',
  vegetables: 'consumption',
  shopping: 'consumption',
  waste: 'waste',
  recycling: 'waste',
};

// ========== CARBON ACTIVITIES ==========

// Log a new carbon activity
router.post('/activities', async (req, res) => {
  try {
    const { userId, activityType, value, unit, notes } = req.body;

    // Calculate emissions
    let emissionValue = value;
    if (unit === 'miles') {
      emissionValue = value * 1.60934; // Convert to km
    } else if (unit === 'gallons') {
      emissionValue = value * 3.78541; // Convert to liters
    }

    const emissionsCO2 = emissionValue * (EMISSION_FACTORS[activityType] || 0);

    const activity = new CarbonActivity({
      userId,
      activityType,
      category: CATEGORY_MAP[activityType],
      value,
      unit,
      emissionsCO2: parseFloat(emissionsCO2.toFixed(2)),
      date: new Date(),
      notes,
    });

    await activity.save();

    // Update statistics
    await updateUserStatistics(userId);

    // Check for achievements
    await checkAchievements(userId);

    res.status(201).json({
      success: true,
      message: 'Activity logged successfully',
      data: activity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Get user's carbon activities
router.get('/activities/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, category, sortBy } = req.query;

    let query = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (category) query.category = category;

    let activities = await CarbonActivity.find(query);

    // Sort
    if (sortBy === 'recent') {
      activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'emissions-desc') {
      activities.sort((a, b) => b.emissionsCO2 - a.emissionsCO2);
    }

    res.json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get daily activities for a specific date
router.get('/activities/:userId/daily/:date', async (req, res) => {
  try {
    const { userId, date } = req.params;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const activities = await CarbonActivity.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalEmissions = activities.reduce((sum, a) => sum + a.emissionsCO2, 0);

    res.json({
      success: true,
      date,
      totalEmissions: parseFloat(totalEmissions.toFixed(2)),
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete an activity
router.delete('/activities/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;

    const activity = await CarbonActivity.findByIdAndDelete(activityId);

    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found',
      });
    }

    // Update statistics
    await updateUserStatistics(activity.userId);

    res.json({
      success: true,
      message: 'Activity deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ========== CARBON GOALS ==========

// Set or update carbon goals
router.post('/goals/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { dailyGoal, weeklyGoal, monthlyGoal, yearlyGoal, reductionTarget } = req.body;

    let goals = await CarbonGoals.findOne({ userId });

    if (!goals) {
      goals = new CarbonGoals({
        userId,
        dailyGoal: dailyGoal || 5,
        weeklyGoal: weeklyGoal || 35,
        monthlyGoal: monthlyGoal || 150,
        yearlyGoal: yearlyGoal || 1800,
        reductionTarget: reductionTarget || 20,
      });
    } else {
      if (dailyGoal !== undefined) goals.dailyGoal = dailyGoal;
      if (weeklyGoal !== undefined) goals.weeklyGoal = weeklyGoal;
      if (monthlyGoal !== undefined) goals.monthlyGoal = monthlyGoal;
      if (yearlyGoal !== undefined) goals.yearlyGoal = yearlyGoal;
      if (reductionTarget !== undefined) goals.reductionTarget = reductionTarget;
    }

    await goals.save();

    res.json({
      success: true,
      message: 'Goals updated successfully',
      data: goals,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Get user's goals
router.get('/goals/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let goals = await CarbonGoals.findOne({ userId });

    if (!goals) {
      goals = new CarbonGoals({ userId });
      await goals.save();
    }

    res.json({
      success: true,
      data: goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ========== CARBON STATISTICS ==========

// Get user's statistics
router.get('/statistics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let stats = await CarbonStatistics.findOne({ userId });

    if (!stats) {
      stats = new CarbonStatistics({ userId });
      await stats.save();
    }

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get comparison data
router.get('/statistics/:userId/comparison', async (req, res) => {
  try {
    const { userId } = req.params;

    const stats = await CarbonStatistics.findOne({ userId });

    if (!stats) {
      return res.status(404).json({
        success: false,
        error: 'Statistics not found',
      });
    }

    // Global average: 4000 kg CO2/year per person
    const globalMonthlyAverage = 4000 / 12;
    const globalPercent = ((stats.averageMonthlyEmissions / globalMonthlyAverage) * 100).toFixed(1);

    // National average (varies by country, using US avg ~5600 kg/year)
    const nationalMonthlyAverage = 5600 / 12;
    const nationalPercent = ((stats.averageMonthlyEmissions / nationalMonthlyAverage) * 100).toFixed(1);

    // Trees needed to offset (1 tree = ~20kg CO2/year)
    const treesNeeded = Math.ceil(stats.totalEmissions / 20);

    // Car equivalent (average car = 0.21 kg CO2 per km)
    const carEquivalent = (stats.totalEmissions / 0.21).toFixed(0);

    res.json({
      success: true,
      data: {
        globalComparison: {
          percentage: globalPercent,
          label: `${globalPercent}% of global average`,
        },
        nationalComparison: {
          percentage: nationalPercent,
          label: `${nationalPercent}% of national average`,
        },
        treesNeeded,
        carEquivalent,
        treesNeeded,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ========== CARBON INSIGHTS & TIPS ==========

// Get personalized reduction tips
router.get('/insights/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's statistics to provide personalized insights
    const stats = await CarbonStatistics.findOne({ userId });
    const activities = await CarbonActivity.find({ userId });

    // Generate insights based on highest emission category
    const insights = [];

    if (stats.emissionsByCategory.transportation > 0) {
      insights.push({
        category: 'transportation',
        title: 'Reduce Car Usage',
        description:
          'Your transportation emissions are significant. Consider carpooling, public transport, or cycling.',
        impact: 'Potential savings: 2.1 kg CO₂ per km',
      });
    }

    if (stats.emissionsByCategory.consumption > 0) {
      insights.push({
        category: 'consumption',
        title: 'Switch to Plant-Based Meals',
        description:
          'Reduce meat consumption to lower food-related emissions. Aim for 2-3 plant-based days per week.',
        impact: 'Potential savings: 26.5 kg CO₂ per meat meal',
      });
    }

    if (stats.emissionsByCategory.energy > 0) {
      insights.push({
        category: 'energy',
        title: 'Improve Energy Efficiency',
        description:
          'Use LED bulbs, smart thermostats, and energy-efficient appliances to cut energy use.',
        impact: 'Potential savings: 40% of energy emissions',
      });
    }

    res.json({
      success: true,
      count: insights.length,
      data: insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ========== HELPER FUNCTIONS ==========

async function updateUserStatistics(userId) {
  try {
    const activities = await CarbonActivity.find({ userId });

    if (activities.length === 0) {
      return;
    }

    // Calculate totals
    const totalEmissions = activities.reduce((sum, a) => sum + a.emissionsCO2, 0);

    // Calculate averages
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyActivities = activities.filter((a) => new Date(a.date) >= dayAgo);
    const weeklyActivities = activities.filter((a) => new Date(a.date) >= weekAgo);
    const monthlyActivities = activities.filter((a) => new Date(a.date) >= monthAgo);

    const averageDailyEmissions =
      dailyActivities.length > 0
        ? dailyActivities.reduce((sum, a) => sum + a.emissionsCO2, 0) / 1
        : 0;
    const averageWeeklyEmissions =
      weeklyActivities.length > 0
        ? weeklyActivities.reduce((sum, a) => sum + a.emissionsCO2, 0) / 1
        : 0;
    const averageMonthlyEmissions =
      monthlyActivities.length > 0
        ? monthlyActivities.reduce((sum, a) => sum + a.emissionsCO2, 0) / 1
        : 0;

    // Calculate by category
    const emissionsByCategory = {
      transportation: 0,
      energy: 0,
      consumption: 0,
      waste: 0,
    };

    activities.forEach((a) => {
      emissionsByCategory[a.category] += a.emissionsCO2;
    });

    // Find best and worst days
    const activitiesByDay = {};
    activities.forEach((a) => {
      const dayStr = a.date.toISOString().split('T')[0];
      if (!activitiesByDay[dayStr]) {
        activitiesByDay[dayStr] = 0;
      }
      activitiesByDay[dayStr] += a.emissionsCO2;
    });

    let bestDay = null;
    let worstDay = null;
    let bestEmissions = Infinity;
    let worstEmissions = 0;

    for (const [day, emissions] of Object.entries(activitiesByDay)) {
      if (emissions < bestEmissions) {
        bestEmissions = emissions;
        bestDay = { date: new Date(day), emissions };
      }
      if (emissions > worstEmissions) {
        worstEmissions = emissions;
        worstDay = { date: new Date(day), emissions };
      }
    }

    let stats = await CarbonStatistics.findOne({ userId });

    if (!stats) {
      stats = new CarbonStatistics({ userId });
    }

    stats.totalEmissions = parseFloat(totalEmissions.toFixed(2));
    stats.averageDailyEmissions = parseFloat(averageDailyEmissions.toFixed(2));
    stats.averageWeeklyEmissions = parseFloat(averageWeeklyEmissions.toFixed(2));
    stats.averageMonthlyEmissions = parseFloat(averageMonthlyEmissions.toFixed(2));
    stats.emissionsByCategory = emissionsByCategory;
    stats.bestDay = bestDay;
    stats.worstDay = worstDay;
    stats.treesNeededToOffset = Math.ceil(stats.totalEmissions / 20);
    stats.lastUpdated = new Date();

    await stats.save();
  } catch (error) {
    console.error('Error updating statistics:', error);
  }
}

async function checkAchievements(userId) {
  try {
    const activities = await CarbonActivity.find({ userId });
    const goals = await CarbonGoals.findOne({ userId });

    // Define achievement conditions
    const achievementConditions = [
      {
        id: 'first-step',
        name: 'First Step',
        icon: '👣',
        check: () => activities.length >= 1,
      },
      {
        id: 'green-warrior',
        name: 'Green Warrior',
        icon: '⚔️',
        check: () => activities.length >= 10,
      },
      {
        id: 'eco-champion',
        name: 'Eco Champion',
        icon: '🏆',
        check: () => activities.length >= 100,
      },
      {
        id: 'zero-waste',
        name: 'Zero Waste',
        icon: '♻️',
        check: () =>
          activities.filter((a) => a.activityType === 'recycling').length >= 10,
      },
      {
        id: 'green-commuter',
        name: 'Green Commuter',
        icon: '🚴',
        check: () =>
          activities.filter((a) => a.activityType === 'bike').length >= 20,
      },
    ];

    for (const achievement of achievementConditions) {
      if (achievement.check()) {
        const exists = await CarbonAchievement.findOne({
          userId,
          achievementId: achievement.id,
        });

        if (!exists) {
          const newAchievement = new CarbonAchievement({
            userId,
            achievementId: achievement.id,
            name: achievement.name,
            description: `Achievement: ${achievement.name}`,
            icon: achievement.icon,
          });
          await newAchievement.save();
        }
      }
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
}

module.exports = router;
