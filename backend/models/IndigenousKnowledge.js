const mongoose = require('mongoose');

const indigenousKnowledgeSchema = new mongoose.Schema({
  // Basic information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['fire_management', 'water_conservation', 'species_identification', 'seasonal_practices', 'habitat_protection', 'climate_adaptation', 'resource_harvesting', 'other'],
    required: true
  },

  // Geographic information
  region: {
    type: String,
    required: true,
    enum: ['amazon', 'pacific_islands', 'african_savanna', 'arctic', 'australian_aboriginal', 'southeast_asia', 'north_america', 'other']
  },
  indigenousGroup: {
    type: String,
    trim: true
  },

  // Knowledge content
  traditionalPractices: [{
    practice: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    benefits: [String],
    challenges: [String]
  }],

  // Biodiversity impact
  biodiversityImpact: {
    speciesAffected: [String],
    ecosystemServices: [String],
    conservationValue: {
      type: String,
      enum: ['critical', 'high', 'moderate', 'low']
    }
  },

  // Documentation
  documentationStatus: {
    type: String,
    enum: ['fully_documented', 'partially_documented', 'oral_tradition_only', 'at_risk', 'lost'],
    default: 'oral_tradition_only'
  },

  sources: [{
    type: {
      type: String,
      enum: ['academic_paper', 'community_member', 'ethnographer', 'documentation_project', 'other']
    },
    reference: String,
    year: Number,
    credibility: {
      type: String,
      enum: ['verified', 'community_verified', 'unverified']
    }
  }],

  // Impact assessment
  knowledgeLoss: {
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    timeframe: String,
    causes: [String]
  },

  // Restoration efforts
  restorationStatus: {
    type: String,
    enum: ['active_restoration', 'planned_restoration', 'no_efforts', 'successful_restoration'],
    default: 'no_efforts'
  },

  restorationInitiatives: [{
    initiative: String,
    organization: String,
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'planned', 'cancelled']
    },
    startYear: Number,
    description: String
  }],

  // Metadata
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  verifiedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  tags: [String],

  // Status and visibility
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'verified', 'published', 'archived'],
    default: 'draft'
  },

  visibility: {
    type: String,
    enum: ['public', 'community_only', 'researchers_only', 'private'],
    default: 'public'
  },

  // Cultural sensitivity
  culturalNotes: {
    accessRestrictions: String,
    culturalProtocols: String,
    contactInformation: String
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
indigenousKnowledgeSchema.index({ category: 1, region: 1 });
indigenousKnowledgeSchema.index({ status: 1 });
indigenousKnowledgeSchema.index({ 'biodiversityImpact.conservationValue': 1 });
indigenousKnowledgeSchema.index({ tags: 1 });

// Virtual for calculating knowledge preservation score
indigenousKnowledgeSchema.virtual('preservationScore').get(function() {
  let score = 0;

  // Documentation status scoring
  const docScores = {
    'fully_documented': 100,
    'partially_documented': 70,
    'oral_tradition_only': 40,
    'at_risk': 20,
    'lost': 0
  };
  score += docScores[this.documentationStatus] || 0;

  // Restoration status scoring
  const restorationScores = {
    'successful_restoration': 100,
    'active_restoration': 80,
    'planned_restoration': 50,
    'no_efforts': 0
  };
  score += restorationScores[this.restorationStatus] || 0;

  // Verification scoring
  if (this.verifiedBy && this.verifiedBy.length > 0) {
    score += 20;
  }

  // Sources credibility scoring
  const verifiedSources = this.sources.filter(source => source.credibility === 'verified').length;
  score += Math.min(verifiedSources * 10, 30);

  return Math.min(score, 100);
});

// Virtual for biodiversity impact summary
indigenousKnowledgeSchema.virtual('impactSummary').get(function() {
  return {
    speciesCount: this.biodiversityImpact.speciesAffected ? this.biodiversityImpact.speciesAffected.length : 0,
    servicesCount: this.biodiversityImpact.ecosystemServices ? this.biodiversityImpact.ecosystemServices.length : 0,
    conservationValue: this.biodiversityImpact.conservationValue,
    practicesCount: this.traditionalPractices ? this.traditionalPractices.length : 0
  };
});

// Pre-save middleware to update timestamps
indigenousKnowledgeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to get knowledge by region
indigenousKnowledgeSchema.statics.getByRegion = function(region) {
  return this.find({ region, status: 'published' });
};

// Static method to get critical knowledge at risk
indigenousKnowledgeSchema.statics.getCriticalKnowledge = function() {
  return this.find({
    'biodiversityImpact.conservationValue': 'critical',
    documentationStatus: { $in: ['at_risk', 'oral_tradition_only'] },
    status: 'published'
  });
};

// Instance method to calculate knowledge loss impact
indigenousKnowledgeSchema.methods.calculateLossImpact = function() {
  const baseImpact = {
    species: 0,
    ecosystem: 0,
    cultural: 0
  };

  // Species impact based on number of affected species
  if (this.biodiversityImpact.speciesAffected) {
    baseImpact.species = Math.min(this.biodiversityImpact.speciesAffected.length * 5, 100);
  }

  // Ecosystem impact based on services
  if (this.biodiversityImpact.ecosystemServices) {
    baseImpact.ecosystem = Math.min(this.biodiversityImpact.ecosystemServices.length * 10, 100);
  }

  // Cultural impact based on documentation status
  const culturalScores = {
    'lost': 100,
    'at_risk': 80,
    'oral_tradition_only': 60,
    'partially_documented': 30,
    'fully_documented': 0
  };
  baseImpact.cultural = culturalScores[this.documentationStatus] || 50;

  return baseImpact;
};

module.exports = mongoose.model('IndigenousKnowledge', indigenousKnowledgeSchema);