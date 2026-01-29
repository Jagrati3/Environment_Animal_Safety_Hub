const Report = require('../models/Report');

// @desc    Get all reports with filtering, sorting, and pagination
// @route   GET /api/admin/reports
// @access  Admin
const getAllReports = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      incidentType,
      urgency,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      startDate,
      endDate
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (incidentType) {
      filter.incidentType = incidentType;
    }

    if (urgency) {
      filter['incident.urgency'] = urgency;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reports, total] = await Promise.all([
      Report.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Report.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: {
        reports,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalReports: total,
          hasNextPage: skip + reports.length < total,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reports'
    });
  }
};

// @desc    Get a single report by ID
// @route   GET /api/admin/reports/:id
// @access  Admin
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Error fetching report:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching report'
    });
  }
};

// @desc    Update report status
// @route   PATCH /api/admin/reports/:id/status
// @access  Admin
const updateReportStatus = async (req, res) => {
  try {
    const { status, note, adminName } = req.body;

    const validStatuses = ['pending', 'under_review', 'in_progress', 'resolved', 'closed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Update status
    report.status = status;

    // Add admin note if provided
    if (note) {
      report.adminNotes.push({
        note,
        addedBy: adminName || 'Admin',
        addedAt: new Date()
      });
    }

    // Set resolvedAt if status is resolved
    if (status === 'resolved' && !report.resolvedAt) {
      report.resolvedAt = new Date();
    }

    await report.save();

    res.status(200).json({
      success: true,
      message: 'Report status updated successfully',
      data: {
        id: report._id,
        status: report.status,
        updatedAt: report.updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating report status:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating report status'
    });
  }
};

// @desc    Add admin note to report
// @route   POST /api/admin/reports/:id/notes
// @access  Admin
const addAdminNote = async (req, res) => {
  try {
    const { note, adminName } = req.body;

    if (!note) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    report.adminNotes.push({
      note,
      addedBy: adminName || 'Admin',
      addedAt: new Date()
    });

    await report.save();

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: {
        id: report._id,
        notes: report.adminNotes
      }
    });

  } catch (error) {
    console.error('Error adding note:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while adding note'
    });
  }
};

// @desc    Get report statistics for dashboard
// @route   GET /api/admin/reports/statistics
// @access  Admin
const getReportStatistics = async (req, res) => {
  try {
    const stats = await Report.getStatistics();

    // Format the statistics for easier consumption
    const formattedStats = {
      total: stats.total,
      recentWeek: stats.recentWeek,
      byStatus: stats.byStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byType: stats.byType.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byUrgency: stats.byUrgency.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };

    res.status(200).json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

// @desc    Get urgent/critical reports
// @route   GET /api/admin/reports/urgent
// @access  Admin
const getUrgentReports = async (req, res) => {
  try {
    const reports = await Report.findUrgent();

    res.status(200).json({
      success: true,
      data: {
        count: reports.length,
        reports
      }
    });

  } catch (error) {
    console.error('Error fetching urgent reports:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching urgent reports'
    });
  }
};

// @desc    Delete a report
// @route   DELETE /api/admin/reports/:id
// @access  Admin
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting report:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting report'
    });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  updateReportStatus,
  addAdminNote,
  getReportStatistics,
  getUrgentReports,
  deleteReport
};
