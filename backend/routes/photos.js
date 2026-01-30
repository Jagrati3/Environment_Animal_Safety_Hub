const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../frontend/assets/uploads/photos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only image files are allowed.'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

/**
 * @route   POST /api/photos/analyze
 * @desc    Analyze photo with AI for species identification
 * @access  Public
 */
router.post('/analyze', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No photo provided' });
        }

        // Mock AI analysis - Replace with actual AI service (TensorFlow.js, Azure Computer Vision, etc.)
        const mockAnalysis = {
            species: [
                {
                    name: 'Bengal Tiger',
                    scientificName: 'Panthera tigris tigris',
                    confidence: 94,
                    description: 'Large carnivorous feline found in Indian subcontinent'
                },
                {
                    name: 'Striped Cat',
                    scientificName: 'Felis catus',
                    confidence: 78,
                    description: 'Domestic or feral cat variant'
                }
            ],
            behavior: [
                {
                    type: 'Activity',
                    description: 'Resting in shade, appears relaxed',
                    confidence: 88
                },
                {
                    type: 'Temperament',
                    description: 'Alert but calm, not showing aggressive behavior',
                    confidence: 92
                },
                {
                    type: 'Social Status',
                    description: 'Appears to be solitary individual',
                    confidence: 85
                }
            ],
            environment: [
                {
                    type: 'Habitat Type',
                    value: 'Tropical Deciduous Forest'
                },
                {
                    type: 'Terrain',
                    value: 'Rocky outcrop with vegetation'
                },
                {
                    type: 'Time of Day',
                    value: 'Afternoon (shadows indicate 2-4 PM)'
                },
                {
                    type: 'Weather',
                    value: 'Partly cloudy, clear visibility'
                }
            ],
            conservation: [
                {
                    species: 'Bengal Tiger',
                    status: 'Endangered (EN)',
                    population: 'Approximately 2,500 individuals',
                    threats: 'Habitat loss, poaching, human-wildlife conflict',
                    protectionLevel: 'Schedule I (India)', 
                    conservationEfforts: 'Multiple tiger reserves and anti-poaching operations'
                }
            ],
            location: {
                possibleRegions: ['Central India', 'Western Ghats', 'Sundarbans'],
                ecosystem: 'Tropical Forest'
            },
            photography: {
                quality: 'Excellent',
                clarity: 'Sharp focus on subject',
                composition: 'Well-framed with good environmental context',
                recommendations: 'Perfect capture for wildlife documentation'
            }
        };

        return res.status(200).json({
            success: true,
            message: 'Photo analyzed successfully',
            species: mockAnalysis.species,
            behavior: mockAnalysis.behavior,
            environment: mockAnalysis.environment,
            conservation: mockAnalysis.conservation,
            photoPath: `/assets/uploads/photos/${req.file.filename}`
        });

    } catch (error) {
        console.error('Photo analysis error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error analyzing photo',
            error: error.message
        });
    }

/**
 * @route   GET /api/photos/gallery
 * @desc    Get user's photo gallery
 * @access  Private
 */
router.get('/gallery', (req, res) => {
    try {
        // This would typically fetch from a database
        res.status(200).json({
            success: true,
            photos: []
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/photos/contribute
 * @desc    Contribute analyzed photo to wildlife database
 * @access  Private
 */
router.post('/contribute', async (req, res) => {
    try {
        const { photoPath, analysis, userInfo } = req.body;

        // Save to database
        // await Photo.create({...})

        res.status(201).json({
            success: true,
            message: 'Photo successfully contributed to wildlife database',
            data: {
                contributionId: Date.now(),
                timestamp: new Date(),
                status: 'Verified'
            }
        });

    } catch (error) {
        console.error('Contribution error:', error);
        res.status(500).json({
            success: false,
            message: 'Error contributing photo',
            error: error.message
        });
    }
});

/**
 * @route   DELETE /api/photos/:id
 * @desc    Delete photo from gallery
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
    try {
        // Delete from database and storage
        res.status(200).json({
            success: true,
            message: 'Photo deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting photo',
            error: error.message
        });
    }
});

module.exports = router;
