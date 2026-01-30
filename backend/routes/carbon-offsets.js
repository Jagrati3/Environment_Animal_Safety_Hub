const express = require('express');
const router = express.Router();

// Sample database (in-memory for now)
let projects = [
    {
        id: 1,
        name: 'Amazon Rainforest Restoration',
        category: 'reforestation',
        location: 'Brazil, South America',
        price: 15,
        creditsAvailable: 50000,
        rating: 4.8,
        reviews: 342,
        certifications: ['GS', 'VCS', 'CCB'],
        progress: 75,
        treesPlanted: 250000,
        emissionsPrevented: 125000,
        communitiesHelped: 45,
        timeline: 'Ongoing since 2020',
        description: 'Supporting indigenous communities to restore degraded rainforest areas through native tree planting and sustainable land management practices.',
        impactMetrics: {
            carbonOffset: 125000,
            biodiversity: 'High',
            waterConservation: 50000000,
            jobsCreated: 150
        },
        verifications: ['Gold Standard', 'Verified Carbon Standard', 'Climate, Community & Biodiversity Standards']
    },
    {
        id: 2,
        name: 'Kenyan Wind Energy Project',
        category: 'wind',
        location: 'Lake Turkana, Kenya',
        price: 20,
        creditsAvailable: 75000,
        rating: 4.9,
        reviews: 428,
        certifications: ['GS', 'ISO'],
        progress: 90,
        treesPlanted: 0,
        emissionsPrevented: 350000,
        communitiesHelped: 28,
        timeline: 'Active since 2018',
        description: 'Africa\'s largest wind power project providing clean electricity to over 1 million people while reducing reliance on fossil fuels.',
        impactMetrics: {
            carbonOffset: 350000,
            energyProduced: 310,
            householdsServed: 350000,
            jobsCreated: 200
        },
        verifications: ['Gold Standard', 'ISO 14064']
    },
    {
        id: 3,
        name: 'Mangrove Wetland Protection',
        category: 'wetland',
        location: 'Sundarbans, Bangladesh',
        price: 18,
        creditsAvailable: 35000,
        rating: 4.7,
        reviews: 256,
        certifications: ['VCS', 'CCB'],
        progress: 65,
        treesPlanted: 180000,
        emissionsPrevented: 95000,
        communitiesHelped: 62,
        timeline: 'Ongoing since 2019',
        description: 'Protecting and restoring vital mangrove ecosystems that serve as carbon sinks and coastal protection for vulnerable communities.',
        impactMetrics: {
            carbonOffset: 95000,
            coastlineProtected: 125,
            fishSpecies: 85,
            jobsCreated: 95
        },
        verifications: ['Verified Carbon Standard', 'CCB Standards']
    },
    {
        id: 4,
        name: 'California Solar Farm Initiative',
        category: 'solar',
        location: 'California, USA',
        price: 22,
        creditsAvailable: 100000,
        rating: 4.9,
        reviews: 512,
        certifications: ['GS', 'ISO'],
        progress: 85,
        treesPlanted: 0,
        emissionsPrevented: 420000,
        communitiesHelped: 15,
        timeline: 'Active since 2017',
        description: 'Large-scale solar installation providing renewable energy to thousands of homes and businesses while creating green jobs.',
        impactMetrics: {
            carbonOffset: 420000,
            energyProduced: 450,
            householdsServed: 120000,
            jobsCreated: 185
        },
        verifications: ['Gold Standard', 'ISO 14064']
    },
    {
        id: 5,
        name: 'Indonesian Peatland Conservation',
        category: 'wetland',
        location: 'Sumatra, Indonesia',
        price: 17,
        creditsAvailable: 45000,
        rating: 4.6,
        reviews: 298,
        certifications: ['VCS', 'CCB'],
        progress: 70,
        treesPlanted: 120000,
        emissionsPrevented: 180000,
        communitiesHelped: 38,
        timeline: 'Ongoing since 2021',
        description: 'Preventing peatland fires and degradation to protect massive carbon stores while supporting local communities.',
        impactMetrics: {
            carbonOffset: 180000,
            peatlandRestored: 15000,
            wildlifeProtected: 65,
            jobsCreated: 75
        },
        verifications: ['Verified Carbon Standard', 'CCB Standards']
    },
    {
        id: 6,
        name: 'Norwegian Renewable Energy Hub',
        category: 'renewable-energy',
        location: 'Oslo Region, Norway',
        price: 25,
        creditsAvailable: 80000,
        rating: 4.8,
        reviews: 387,
        certifications: ['GS', 'ISO'],
        progress: 80,
        treesPlanted: 0,
        emissionsPrevented: 280000,
        communitiesHelped: 22,
        timeline: 'Active since 2019',
        description: 'Integrated renewable energy system combining hydroelectric, solar, and wind to power sustainable communities.',
        impactMetrics: {
            carbonOffset: 280000,
            energyProduced: 380,
            householdsServed: 95000,
            jobsCreated: 145
        },
        verifications: ['Gold Standard', 'ISO 14064']
    }
];

let purchases = [];

// GET all projects with filters
router.get('/', (req, res) => {
    try {
        const { category, certification, minPrice, maxPrice, sortBy } = req.query;
        
        let filteredProjects = [...projects];
        
        // Filter by category
        if (category && category !== 'all') {
            filteredProjects = filteredProjects.filter(p => p.category === category);
        }
        
        // Filter by certification
        if (certification) {
            filteredProjects = filteredProjects.filter(p => 
                p.certifications.some(c => c.toLowerCase() === certification.toLowerCase())
            );
        }
        
        // Filter by price
        if (minPrice) {
            filteredProjects = filteredProjects.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            filteredProjects = filteredProjects.filter(p => p.price <= parseFloat(maxPrice));
        }
        
        // Sort
        if (sortBy === 'price-low') {
            filteredProjects.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filteredProjects.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'impact') {
            filteredProjects.sort((a, b) => b.emissionsPrevented - a.emissionsPrevented);
        } else if (sortBy === 'rating') {
            filteredProjects.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({
            success: true,
            count: filteredProjects.length,
            projects: filteredProjects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch projects'
        });
    }
});

// GET single project by ID
router.get('/:id', (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }
        
        res.json({
            success: true,
            project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch project'
        });
    }
});

// POST purchase carbon credits
router.post('/purchase', (req, res) => {
    try {
        const { projectId, quantity, userEmail, userName } = req.body;
        
        // Validation
        if (!projectId || !quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                error: 'Invalid purchase data'
            });
        }
        
        const project = projects.find(p => p.id === parseInt(projectId));
        
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }
        
        // Check availability
        if (quantity > project.creditsAvailable) {
            return res.status(400).json({
                success: false,
                error: 'Insufficient credits available'
            });
        }
        
        // Create purchase record
        const purchase = {
            id: purchases.length + 1,
            projectId,
            projectName: project.name,
            quantity,
            pricePerCredit: project.price,
            totalAmount: project.price * quantity,
            userEmail,
            userName,
            purchaseDate: new Date().toISOString(),
            status: 'completed'
        };
        
        purchases.push(purchase);
        
        // Update project credits
        project.creditsAvailable -= quantity;
        
        res.json({
            success: true,
            message: 'Purchase completed successfully',
            purchase,
            remainingCredits: project.creditsAvailable
        });
    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process purchase'
        });
    }
});

// POST batch purchase (cart checkout)
router.post('/purchase/batch', (req, res) => {
    try {
        const { items, userEmail, userName } = req.body;
        
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid purchase data'
            });
        }
        
        const purchaseResults = [];
        let totalCO2Offset = 0;
        let totalAmount = 0;
        
        // Process each item
        for (const item of items) {
            const project = projects.find(p => p.id === parseInt(item.projectId));
            
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: `Project ${item.projectId} not found`
                });
            }
            
            if (item.quantity > project.creditsAvailable) {
                return res.status(400).json({
                    success: false,
                    error: `Insufficient credits for ${project.name}`
                });
            }
            
            const purchase = {
                id: purchases.length + purchaseResults.length + 1,
                projectId: item.projectId,
                projectName: project.name,
                quantity: item.quantity,
                pricePerCredit: project.price,
                totalAmount: project.price * item.quantity,
                userEmail,
                userName,
                purchaseDate: new Date().toISOString(),
                status: 'completed'
            };
            
            purchaseResults.push(purchase);
            totalCO2Offset += item.quantity;
            totalAmount += purchase.totalAmount;
            
            // Update project credits
            project.creditsAvailable -= item.quantity;
        }
        
        // Save all purchases
        purchases.push(...purchaseResults);
        
        res.json({
            success: true,
            message: 'All purchases completed successfully',
            purchases: purchaseResults,
            summary: {
                totalCO2Offset,
                totalAmount,
                projectsSupported: purchaseResults.length
            }
        });
    } catch (error) {
        console.error('Error processing batch purchase:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process purchases'
        });
    }
});

// GET global impact statistics
router.get('/stats/overview', (req, res) => {
    try {
        const totalCO2Offset = purchases.reduce((sum, p) => sum + p.quantity, 0);
        const totalRevenue = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
        const uniqueUsers = new Set(purchases.map(p => p.userEmail)).size;
        const activeProjects = projects.filter(p => p.creditsAvailable > 0).length;
        
        const stats = {
            totalCO2Offset: totalCO2Offset + 2500000, // Add baseline
            totalUsers: uniqueUsers + 85000, // Add baseline
            activeProjects: activeProjects + 150, // Add baseline
            totalRevenue: totalRevenue + 12500000, // Add baseline
            recentPurchases: purchases.slice(-10).reverse()
        };
        
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics'
        });
    }
});

// GET user's purchase history
router.get('/purchases/:email', (req, res) => {
    try {
        const { email } = req.params;
        
        const userPurchases = purchases.filter(p => p.userEmail === email);
        const totalCO2 = userPurchases.reduce((sum, p) => sum + p.quantity, 0);
        const totalSpent = userPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
        
        res.json({
            success: true,
            purchases: userPurchases,
            summary: {
                totalPurchases: userPurchases.length,
                totalCO2Offset: totalCO2,
                totalSpent
            }
        });
    } catch (error) {
        console.error('Error fetching purchase history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch purchase history'
        });
    }
});

module.exports = router;
