const mongoose = require('mongoose');

const carbonActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      enum: [
        'car',
        'car-electric',
        'public-transport',
        'flight',
        'bike',
        'electricity',
        'gas',
        'water',
        'meat',
        'dairy',
        'vegetables',
        'shopping',
        'waste',
        'recycling',
      ],
      required: true,
    },
    category: {
      type: String,
      enum: ['transportation', 'energy', 'consumption', 'waste'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ['km', 'miles', 'kwh', 'liters', 'kg', 'gallons', 'items'],
      required: true,
    },
    emissionsCO2: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const carbonGoalsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    dailyGoal: {
      type: Number,
      default: 5,
      min: 0,
      description: 'kg CO2 per day',
    },
    weeklyGoal: {
      type: Number,
      default: 35,
      min: 0,
      description: 'kg CO2 per week',
    },
    monthlyGoal: {
      type: Number,
      default: 150,
      min: 0,
      description: 'kg CO2 per month',
    },
    yearlyGoal: {
      type: Number,
      default: 1800,
      min: 0,
      description: 'kg CO2 per year',
    },
    reductionTarget: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
      description: 'Target reduction percentage',
    },
  },
  { timestamps: true }
);

const carbonStatisticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalEmissions: {
      type: Number,
      default: 0,
    },
    averageDailyEmissions: {
      type: Number,
      default: 0,
    },
    averageWeeklyEmissions: {
      type: Number,
      default: 0,
    },
    averageMonthlyEmissions: {
      type: Number,
      default: 0,
    },
    emissionsByCategory: {
      transportation: { type: Number, default: 0 },
      energy: { type: Number, default: 0 },
      consumption: { type: Number, default: 0 },
      waste: { type: Number, default: 0 },
    },
    bestDay: {
      date: { type: Date },
      emissions: { type: Number },
    },
    worstDay: {
      date: { type: Date },
      emissions: { type: Number },
    },
    longestGreenStreak: {
      type: Number,
      default: 0,
      description: 'Days consecutive below daily goal',
    },
    treesNeededToOffset: {
      type: Number,
      default: 0,
    },
    comparisonToAverage: {
      global: { type: Number, default: 0 }, // Percentage
      national: { type: Number, default: 0 }, // Percentage
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const carbonInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      description: 'Potential CO2 savings',
    },
    category: {
      type: String,
      enum: ['transportation', 'energy', 'consumption', 'waste', 'lifestyle'],
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    adopted: {
      type: Boolean,
      default: false,
    },
    adoptedDate: {
      type: Date,
    },
    savingsPotential: {
      type: Number,
      description: 'kg CO2 saved if adopted',
    },
  },
  { timestamps: true }
);

const carbonAchievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementId: {
      type: String,
      enum: [
        'first-step',
        'green-warrior',
        'daily-legend',
        'eco-champion',
        'zero-waste',
        'green-commuter',
        'carbon-cutter',
        'plant-based-hero',
        'renewable-advocate',
        'sustainability-expert',
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    unlockedDate: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const CarbonActivity = mongoose.model('CarbonActivity', carbonActivitySchema);
const CarbonGoals = mongoose.model('CarbonGoals', carbonGoalsSchema);
const CarbonStatistics = mongoose.model('CarbonStatistics', carbonStatisticsSchema);
const CarbonInsight = mongoose.model('CarbonInsight', carbonInsightSchema);
const CarbonAchievement = mongoose.model('CarbonAchievement', carbonAchievementSchema);

module.exports = {
  CarbonActivity,
  CarbonGoals,
  CarbonStatistics,
  CarbonInsight,
  CarbonAchievement,
};
