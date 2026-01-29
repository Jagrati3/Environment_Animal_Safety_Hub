const express = require('express');
const router = express.Router();
const { submitReport, getReportStatus } = require('../controllers/reportController');

// POST /api/reports - Submit a new incident report
router.post('/', submitReport);

// GET /api/reports/:id/status - Get report status by ID (public tracking)
router.get('/:id/status', getReportStatus);

module.exports = router;
