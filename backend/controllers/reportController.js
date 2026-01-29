const Report = require('../models/Report');

// @desc    Submit a new incident report
// @route   POST /api/reports
// @access  Public
const submitReport = async (req, res) => {
  try {
    const {
      incidentType,
      reporter,
      location,
      animals,
      incident,
      evidence
    } = req.body;

    // Validate required fields
    if (!incidentType || !location?.address || !location?.date || !animals?.type || !incident?.description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: incidentType, location.address, location.date, animals.type, and incident.description are required'
      });
    }

    // Create the report
    const report = new Report({
      incidentType,
      reporter: {
        name: reporter?.name || 'Anonymous',
        email: reporter?.email || '',
        phone: reporter?.phone || '',
        contactPreference: reporter?.contactPreference || 'none'
      },
      location: {
        address: location.address,
        description: location.description || '',
        coordinates: location.coordinates || {},
        date: new Date(location.date),
        time: location.time || ''
      },
      animals: {
        type: animals.type,
        count: animals.count || 1,
        description: animals.description || ''
      },
      incident: {
        description: incident.description,
        urgency: incident.urgency || 'medium',
        ongoing: incident.ongoing || 'recent',
        additionalInfo: incident.additionalInfo || ''
      },
      evidence: {
        photos: evidence?.photos || [],
        videos: evidence?.videos || []
      },
      status: 'pending'
    });

    const savedReport = await report.save();

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: {
        id: savedReport._id,
        status: savedReport.status,
        createdAt: savedReport.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting report:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while submitting report'
    });
  }
};

// @desc    Get report status by ID (for public users to track their report)
// @route   GET /api/reports/:id/status
// @access  Public
const getReportStatus = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).select('status createdAt updatedAt incidentType');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: report._id,
        status: report.status,
        incidentType: report.incidentType,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching report status:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching report status'
    });
  }
};

module.exports = {
  submitReport,
  getReportStatus
};
