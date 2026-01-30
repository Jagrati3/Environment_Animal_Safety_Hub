const express = require('express');
const router = express.Router();

/**
 * Species Database Mock
 * In production, this would be fetched from MongoDB
 */
const speciesDatabase = [
    {
        id: 1,
        name: 'Bengal Tiger',
        scientificName: 'Panthera tigris tigris',
        conservationStatus: 'endangered',
        habitat: 'Tropical and subtropical forests',
        region: 'asia',
        habitatType: 'forest',
        population: {
            current: 2500,
            trend: 'stable',
            lastCensus: 2023
        }
    },
    {
        id: 2,
        name: 'Giant Panda',
        scientificName: 'Ailuropoda melanoleuca',
        conservationStatus: 'vulnerable',
        habitat: 'Bamboo forests in mountains',
        region: 'asia',
        habitatType: 'forest',
        population: {
            current: 1864,
            trend: 'increasing',
            lastCensus: 2021
        }
    },
    {
        id: 3,
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        conservationStatus: 'vulnerable',
        habitat: 'Savannas and woodlands',
        region: 'africa',
        habitatType: 'grassland',
        population: {
            current: 400000,
            trend: 'declining',
            lastCensus: 2023
        }
    },
    {
        id: 4,
        name: 'Mountain Gorilla',
        scientificName: 'Gorilla beringei beringei',
        conservationStatus: 'critically-endangered',
        habitat: 'Montane rainforests',
        region: 'africa',
        habitatType: 'forest',
        population: {
            current: 1100,
            trend: 'stable',
            lastCensus: 2021
        }
    },
    {
        id: 5,
        name: 'Sea Turtle',
        scientificName: 'Cheloniidae & Dermochelyidae',
        conservationStatus: 'vulnerable',
        habitat: 'Tropical and subtropical oceans',
        region: 'oceania',
        habitatType: 'marine',
        population: {
            current: 200000,
            trend: 'declining',
            lastCensus: 2022
        }
    }
];

/**
 * @route   GET /api/species
 * @desc    Get all species or filter by criteria
 * @access  Public
 */
router.get('/', (req, res) => {
    try {
        const { status, habitat, region } = req.query;
        
        let filtered = [...speciesDatabase];
        
        if (status) {
            filtered = filtered.filter(s => s.conservationStatus === status);
        }
        if (habitat) {
            filtered = filtered.filter(s => s.habitatType === habitat);
        }
        if (region) {
            filtered = filtered.filter(s => s.region === region);
        }
        
        res.status(200).json({
            success: true,
            count: filtered.length,
            data: filtered
        });
    } catch (error) {
        console.error('Error fetching species:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching species',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/species/:id
 * @desc    Get detailed species profile
 * @access  Public
 */
router.get('/:id', (req, res) => {
    try {
        const species = speciesDatabase.find(s => s.id === parseInt(req.params.id));
        
        if (!species) {
            return res.status(404).json({
                success: false,
                message: 'Species not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: species
        });
    } catch (error) {
        console.error('Error fetching species details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching species details',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/species
 * @desc    Create new species profile (Admin only)
 * @access  Private
 */
router.post('/', async (req, res) => {
    try {
        const { name, scientificName, conservationStatus, habitat, region, habitatType, population } = req.body;
        
        // Validation
        if (!name || !scientificName || !conservationStatus) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        const newSpecies = {
            id: speciesDatabase.length + 1,
            name,
            scientificName,
            conservationStatus,
            habitat,
            region,
            habitatType,
            population: population || { current: 0, trend: 'unknown' }
        };
        
        speciesDatabase.push(newSpecies);
        
        res.status(201).json({
            success: true,
            message: 'Species profile created',
            data: newSpecies
        });
    } catch (error) {
        console.error('Error creating species:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating species',
            error: error.message
        });
    }
});

/**
 * @route   PUT /api/species/:id
 * @desc    Update species profile
 * @access  Private
 */
router.put('/:id', (req, res) => {
    try {
        const species = speciesDatabase.find(s => s.id === parseInt(req.params.id));
        
        if (!species) {
            return res.status(404).json({
                success: false,
                message: 'Species not found'
            });
        }
        
        // Update fields
        Object.assign(species, req.body);
        
        res.status(200).json({
            success: true,
            message: 'Species updated',
            data: species
        });
    } catch (error) {
        console.error('Error updating species:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating species',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/species/stats/overview
 * @desc    Get conservation statistics
 * @access  Public
 */
router.get('/stats/overview', (req, res) => {
    try {
        const stats = {
            totalSpecies: speciesDatabase.length,
            byStatus: {
                extinct: speciesDatabase.filter(s => s.conservationStatus === 'extinct').length,
                extinctWild: speciesDatabase.filter(s => s.conservationStatus === 'extinct-wild').length,
                criticallyEndangered: speciesDatabase.filter(s => s.conservationStatus === 'critically-endangered').length,
                endangered: speciesDatabase.filter(s => s.conservationStatus === 'endangered').length,
                vulnerable: speciesDatabase.filter(s => s.conservationStatus === 'vulnerable').length,
                nearThreatened: speciesDatabase.filter(s => s.conservationStatus === 'near-threatened').length,
                leastConcern: speciesDatabase.filter(s => s.conservationStatus === 'least-concern').length
            },
            byHabitat: {
                forest: speciesDatabase.filter(s => s.habitatType === 'forest').length,
                desert: speciesDatabase.filter(s => s.habitatType === 'desert').length,
                grassland: speciesDatabase.filter(s => s.habitatType === 'grassland').length,
                wetland: speciesDatabase.filter(s => s.habitatType === 'wetland').length,
                marine: speciesDatabase.filter(s => s.habitatType === 'marine').length,
                mountain: speciesDatabase.filter(s => s.habitatType === 'mountain').length,
                arctic: speciesDatabase.filter(s => s.habitatType === 'arctic').length
            },
            byRegion: {
                africa: speciesDatabase.filter(s => s.region === 'africa').length,
                asia: speciesDatabase.filter(s => s.region === 'asia').length,
                europe: speciesDatabase.filter(s => s.region === 'europe').length,
                americas: speciesDatabase.filter(s => s.region === 'americas').length,
                oceania: speciesDatabase.filter(s => s.region === 'oceania').length
            }
        };
        
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/species/search/:query
 * @desc    Search species by name or scientific name
 * @access  Public
 */
router.get('/search/:query', (req, res) => {
    try {
        const query = req.params.query.toLowerCase();
        
        const results = speciesDatabase.filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.scientificName.toLowerCase().includes(query)
        );
        
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        console.error('Error searching species:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching species',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/species/:id/compare
 * @desc    Compare multiple species
 * @access  Public
 */
router.post('/compare', (req, res) => {
    try {
        const { ids } = req.body;
        
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request format'
            });
        }
        
        const species = speciesDatabase.filter(s => ids.includes(s.id));
        
        res.status(200).json({
            success: true,
            count: species.length,
            data: species
        });
    } catch (error) {
        console.error('Error comparing species:', error);
        res.status(500).json({
            success: false,
            message: 'Error comparing species',
            error: error.message
        });
    }
});

module.exports = router;
