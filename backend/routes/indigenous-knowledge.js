const express = require('express');
const router = express.Router();
const IndigenousKnowledge = require('../models/IndigenousKnowledge');
const { authenticateToken, requireRole } = require('../middleware/security');

// Validation middleware
const validateKnowledgeData = (req, res, next) => {
  const { title, description, category, region } = req.body;

  if (!title || !description || !category || !region) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['title', 'description', 'category', 'region']
    });
  }

  // Validate category and region enums
  const validCategories = ['fire_management', 'water_conservation', 'species_identification', 'seasonal_practices', 'habitat_protection', 'climate_adaptation', 'resource_harvesting', 'other'];
  const validRegions = ['amazon', 'pacific_islands', 'african_savanna', 'arctic', 'australian_aboriginal', 'southeast_asia', 'north_america', 'other'];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  if (!validRegions.includes(region)) {
    return res.status(400).json({ error: 'Invalid region' });
  }

  next();
};

// GET /api/indigenous-knowledge - Get all published indigenous knowledge
router.get('/', async (req, res) => {
  try {
    const {
      category,
      region,
      conservation_value,
      documentation_status,
      limit = 20,
      offset = 0,
      search
    } = req.query;

    // Build query
    const query = { status: 'published' };

    if (category) query.category = category;
    if (region) query.region = region;
    if (conservation_value) query['biodiversityImpact.conservationValue'] = conservation_value;
    if (documentation_status) query.documentationStatus = documentation_status;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const knowledge = await IndigenousKnowledge
      .find(query)
      .populate('submittedBy', 'name email')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await IndigenousKnowledge.countDocuments(query);

    res.json({
      knowledge,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + knowledge.length < total
      }
    });
  } catch (error) {
    console.error('Error fetching indigenous knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch indigenous knowledge' });
  }
});

// GET /api/indigenous-knowledge/critical - Get critical knowledge at risk
router.get('/critical', async (req, res) => {
  try {
    const criticalKnowledge = await IndigenousKnowledge.getCriticalKnowledge()
      .populate('submittedBy', 'name email')
      .sort({ 'knowledgeLoss.percentage': -1 });

    res.json({ knowledge: criticalKnowledge });
  } catch (error) {
    console.error('Error fetching critical knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch critical knowledge' });
  }
});

// GET /api/indigenous-knowledge/regions/:region - Get knowledge by region
router.get('/regions/:region', async (req, res) => {
  try {
    const { region } = req.params;

    const knowledge = await IndigenousKnowledge.getByRegion(region)
      .populate('submittedBy', 'name email');

    res.json({ knowledge });
  } catch (error) {
    console.error('Error fetching knowledge by region:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge by region' });
  }
});

// GET /api/indigenous-knowledge/:id - Get specific knowledge entry
router.get('/:id', async (req, res) => {
  try {
    const knowledge = await IndigenousKnowledge
      .findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('verifiedBy', 'name email');

    if (!knowledge) {
      return res.status(404).json({ error: 'Knowledge entry not found' });
    }

    // Check visibility permissions
    if (knowledge.visibility !== 'public' && !req.user) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ knowledge });
  } catch (error) {
    console.error('Error fetching knowledge entry:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge entry' });
  }
});

// POST /api/indigenous-knowledge - Create new knowledge entry
router.post('/', authenticateToken, validateKnowledgeData, async (req, res) => {
  try {
    const knowledgeData = {
      ...req.body,
      submittedBy: req.user.id,
      status: 'submitted' // New submissions start as submitted
    };

    const knowledge = new IndigenousKnowledge(knowledgeData);
    await knowledge.save();

    await knowledge.populate('submittedBy', 'name email');

    res.status(201).json({
      message: 'Knowledge entry submitted successfully',
      knowledge
    });
  } catch (error) {
    console.error('Error creating knowledge entry:', error);
    res.status(500).json({ error: 'Failed to create knowledge entry' });
  }
});

// PUT /api/indigenous-knowledge/:id - Update knowledge entry
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const knowledge = await IndigenousKnowledge.findById(req.params.id);

    if (!knowledge) {
      return res.status(404).json({ error: 'Knowledge entry not found' });
    }

    // Check permissions
    const isOwner = knowledge.submittedBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    const isModerator = req.user.role === 'moderator';

    if (!isOwner && !isAdmin && !isModerator) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update allowed fields based on user role
    const allowedFields = isAdmin || isModerator ?
      Object.keys(req.body) :
      ['title', 'description', 'traditionalPractices', 'tags', 'culturalNotes'];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        knowledge[field] = req.body[field];
      }
    });

    await knowledge.save();
    await knowledge.populate('submittedBy', 'name email');
    await knowledge.populate('verifiedBy', 'name email');

    res.json({
      message: 'Knowledge entry updated successfully',
      knowledge
    });
  } catch (error) {
    console.error('Error updating knowledge entry:', error);
    res.status(500).json({ error: 'Failed to update knowledge entry' });
  }
});

// POST /api/indigenous-knowledge/:id/verify - Verify knowledge entry (moderators/admins only)
router.post('/:id/verify', authenticateToken, requireRole(['moderator', 'admin']), async (req, res) => {
  try {
    const knowledge = await IndigenousKnowledge.findById(req.params.id);

    if (!knowledge) {
      return res.status(404).json({ error: 'Knowledge entry not found' });
    }

    // Add verifier if not already verified by this user
    if (!knowledge.verifiedBy.includes(req.user.id)) {
      knowledge.verifiedBy.push(req.user.id);
    }

    // Auto-publish if verified by 2+ users or admin
    if (knowledge.verifiedBy.length >= 2 || req.user.role === 'admin') {
      knowledge.status = 'verified';
    }

    await knowledge.save();
    await knowledge.populate('verifiedBy', 'name email');

    res.json({
      message: 'Knowledge entry verified successfully',
      knowledge
    });
  } catch (error) {
    console.error('Error verifying knowledge entry:', error);
    res.status(500).json({ error: 'Failed to verify knowledge entry' });
  }
});

// POST /api/indigenous-knowledge/:id/publish - Publish knowledge entry (admins only)
router.post('/:id/publish', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const knowledge = await IndigenousKnowledge.findById(req.params.id);

    if (!knowledge) {
      return res.status(404).json({ error: 'Knowledge entry not found' });
    }

    knowledge.status = 'published';
    await knowledge.save();

    res.json({
      message: 'Knowledge entry published successfully',
      knowledge
    });
  } catch (error) {
    console.error('Error publishing knowledge entry:', error);
    res.status(500).json({ error: 'Failed to publish knowledge entry' });
  }
});

// DELETE /api/indigenous-knowledge/:id - Delete knowledge entry
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const knowledge = await IndigenousKnowledge.findById(req.params.id);

    if (!knowledge) {
      return res.status(404).json({ error: 'Knowledge entry not found' });
    }

    // Check permissions
    const isOwner = knowledge.submittedBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await IndigenousKnowledge.findByIdAndDelete(req.params.id);

    res.json({ message: 'Knowledge entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting knowledge entry:', error);
    res.status(500).json({ error: 'Failed to delete knowledge entry' });
  }
});

// GET /api/indigenous-knowledge/stats/overview - Get knowledge statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await IndigenousKnowledge.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          byCategory: {
            $push: '$category'
          },
          byRegion: {
            $push: '$region'
          },
          byConservationValue: {
            $push: '$biodiversityImpact.conservationValue'
          },
          avgPreservationScore: {
            $avg: {
              $add: [
                // Calculate preservation score components
                {
                  $switch: {
                    branches: [
                      { case: { $eq: ['$documentationStatus', 'fully_documented'] }, then: 100 },
                      { case: { $eq: ['$documentationStatus', 'partially_documented'] }, then: 70 },
                      { case: { $eq: ['$documentationStatus', 'oral_tradition_only'] }, then: 40 },
                      { case: { $eq: ['$documentationStatus', 'at_risk'] }, then: 20 },
                      { case: { $eq: ['$documentationStatus', 'lost'] }, then: 0 }
                    ],
                    default: 0
                  }
                },
                {
                  $switch: {
                    branches: [
                      { case: { $eq: ['$restorationStatus', 'successful_restoration'] }, then: 100 },
                      { case: { $eq: ['$restorationStatus', 'active_restoration'] }, then: 80 },
                      { case: { $eq: ['$restorationStatus', 'planned_restoration'] }, then: 50 },
                      { case: { $eq: ['$restorationStatus', 'no_efforts'] }, then: 0 }
                    ],
                    default: 0
                  }
                }
              ]
            }
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({
        totalEntries: 0,
        byCategory: {},
        byRegion: {},
        byConservationValue: {},
        avgPreservationScore: 0
      });
    }

    const result = stats[0];

    // Count occurrences
    const countOccurrences = (arr) => {
      return arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
    };

    res.json({
      totalEntries: result.totalEntries,
      byCategory: countOccurrences(result.byCategory),
      byRegion: countOccurrences(result.byRegion),
      byConservationValue: countOccurrences(result.byConservationValue),
      avgPreservationScore: Math.round(result.avgPreservationScore / 2) // Divide by 2 since we added two components
    });
  } catch (error) {
    console.error('Error fetching knowledge statistics:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge statistics' });
  }
});

module.exports = router;