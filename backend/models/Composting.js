const mongoose = require('mongoose');

const compostingEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    wasteType: {
      type: String,
      enum: [
        'fruits',
        'grains',
        'coffee',
        'eggshells',
        'other-food',
        'leaves',
        'grass',
        'branches',
        'flowers',
        'newspaper',
        'cardboard',
        'paper-bags',
        'shredded',
      ],
      required: true,
    },
    category: {
      type: String,
      enum: ['food', 'yard', 'paper'],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      enum: ['home', 'community', 'municipal', 'worm', 'bokashi'],
      required: true,
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
    co2Avoided: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const compostingStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalComposted: {
      type: Number,
      default: 0,
    },
    monthlyComposted: {
      type: Number,
      default: 0,
    },
    weeklyComposted: {
      type: Number,
      default: 0,
    },
    composingStreak: {
      type: Number,
      default: 0,
    },
    totalEntries: {
      type: Number,
      default: 0,
    },
    wasteByCategory: {
      food: { type: Number, default: 0 },
      yard: { type: Number, default: 0 },
      paper: { type: Number, default: 0 },
    },
    preferredMethod: {
      type: String,
      enum: ['home', 'community', 'municipal', 'worm', 'bokashi'],
    },
    rank: {
      type: Number,
      default: 0,
    },
    co2Avoided: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const compostingAchievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementId: {
      type: String,
      enum: [
        'first-compost',
        'compost-collector',
        'waste-warrior',
        'green-guardian',
        'community-hero',
        'seven-day-streak',
      ],
      required: true,
    },
    name: {
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
  },
  { timestamps: true }
);

const compostingChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['weekly', 'monthly', 'community'],
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'completed', 'upcoming'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const compostingLeaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ['all-time', 'monthly', 'weekly'],
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CompostingEntry = mongoose.model('CompostingEntry', compostingEntrySchema);
const CompostingStats = mongoose.model('CompostingStats', compostingStatsSchema);
const CompostingAchievement = mongoose.model('CompostingAchievement', compostingAchievementSchema);
const CompostingChallenge = mongoose.model('CompostingChallenge', compostingChallengeSchema);
const CompostingLeaderboard = mongoose.model('CompostingLeaderboard', compostingLeaderboardSchema);

module.exports = {
  CompostingEntry,
  CompostingStats,
  CompostingAchievement,
  CompostingChallenge,
  CompostingLeaderboard,
};
