const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  // Report Type
  incidentType: {
    type: String,
    required: true,
    enum: ['cruelty', 'injury', 'stray', 'hoarding', 'illegal', 'environment'],
    index: true
  },

  // Reporter Information
  reporter: {
    name: { type: String, default: 'Anonymous' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    contactPreference: {
      type: String,
      enum: ['none', 'email', 'phone'],
      default: 'none'
    }
  },

  // Incident Location with Geolocation
  location: {
    address: { type: String, required: true },
    description: { type: String, default: '' },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    },
    date: { type: Date, required: true },
    time: { type: String, default: '' }
  },

  // Animal Information
  animals: {
    type: {
      type: String,
      required: true,
      enum: ['dog', 'cat', 'bird', 'rabbit', 'reptile', 'wildlife', 'farm', 'other']
    },
    count: { type: Number, default: 1, min: 1 },
    description: { type: String, default: '' }
  },

  // Incident Details
  incident: {
    description: { type: String, required: true },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
      index: true
    },
    ongoing: {
      type: String,
      enum: ['yes', 'recent', 'continuing'],
      default: 'recent'
    },
    additionalInfo: { type: String, default: '' }
  },

  // Evidence (file references - actual files stored separately)
  evidence: {
    photos: [{ type: String }], // URLs or file paths
    videos: [{ type: String }]
  },

  // Report Status for Admin Tracking
  status: {
    type: String,
    enum: ['pending', 'under_review', 'in_progress', 'resolved', 'closed', 'rejected'],
    default: 'pending',
    index: true
  },

  // Admin Notes
  adminNotes: [{
    note: { type: String },
    addedBy: { type: String },
    addedAt: { type: Date, default: Date.now }
  }],

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  }
});

// Update the updatedAt field on save
reportSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  next();
});

// Indexes for common queries
reportSchema.index({ createdAt: -1 });
reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ incidentType: 1, status: 1 });
reportSchema.index({ 'incident.urgency': 1, status: 1 });

// Virtual for formatted date
reportSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static method to get reports by status
reportSchema.statics.findByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get urgent reports
reportSchema.statics.findUrgent = function() {
  return this.find({
    'incident.urgency': { $in: ['high', 'critical'] },
    status: { $in: ['pending', 'under_review', 'in_progress'] }
  }).sort({ createdAt: -1 });
};

// Static method to get statistics
reportSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $facet: {
        byStatus: [
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ],
        byType: [
          { $group: { _id: '$incidentType', count: { $sum: 1 } } }
        ],
        byUrgency: [
          { $group: { _id: '$incident.urgency', count: { $sum: 1 } } }
        ],
        total: [
          { $count: 'count' }
        ],
        recentWeek: [
          {
            $match: {
              createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }
          },
          { $count: 'count' }
        ]
      }
    }
  ]);

  return {
    byStatus: stats[0].byStatus,
    byType: stats[0].byType,
    byUrgency: stats[0].byUrgency,
    total: stats[0].total[0]?.count || 0,
    recentWeek: stats[0].recentWeek[0]?.count || 0
  };
};

module.exports = mongoose.model('Report', reportSchema);
