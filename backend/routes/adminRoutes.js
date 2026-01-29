const express = require('express');
const router = express.Router();
const {
  getAllReports,
  getReportById,
  updateReportStatus,
  addAdminNote,
  getReportStatistics,
  getUrgentReports,
  deleteReport
} = require('../controllers/adminController');

// GET /api/admin/reports/statistics - Get dashboard statistics
router.get('/reports/statistics', getReportStatistics);

// GET /api/admin/reports/urgent - Get urgent/critical reports
router.get('/reports/urgent', getUrgentReports);

// GET /api/admin/reports - Get all reports with filtering
router.get('/reports', getAllReports);

// GET /api/admin/reports/:id - Get single report by ID
router.get('/reports/:id', getReportById);

// PATCH /api/admin/reports/:id/status - Update report status
router.patch('/reports/:id/status', updateReportStatus);

// POST /api/admin/reports/:id/notes - Add admin note
router.post('/reports/:id/notes', addAdminNote);

// DELETE /api/admin/reports/:id - Delete a report
router.delete('/reports/:id', deleteReport);

module.exports = router;
