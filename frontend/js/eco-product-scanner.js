// ===========================
// Eco-Product Scanner App
// ===========================

class EcoProductScanner {
    constructor() {
        this.scanHistory = [];
        this.ecoChoices = 0;
        this.currentProduct = null;
        this.productDatabase = this.initializeProductDatabase();
        
        this.loadData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStats();
    }

    // Initialize Product Database
    initializeProductDatabase() {
        return {
            '1234567890': {
                name: 'Single-Use Plastic Water Bottle',
                brand: 'AquaPure',
                category: 'Beverages',
                barcode: '1234567890',
                image: 'https://source.unsplash.com/400x400/?plastic,bottle,water',
                sustainabilityScore: 25,
                scoreFactors: {
                    materials: 20,
                    production: 30,
                    packaging: 15,
                    endOfLife: 25,
                    certifications: 30
                },
                environmentalImpact: {
                    carbonFootprint: '250g CO₂',
                    waterUsage: '3L water',
                    plasticWaste: '15g plastic',
                    recyclability: 'Partially recyclable'
                },
                certifications: [],
                materials: [
                    { name: 'PET Plastic', type: 'caution' },
                    { name: 'BPA',  type: 'harmful' },
                    { name: 'Synthetic Polymers', type: 'caution' }
                ],
                pros: [
                    'Convenient and portable',
                    'Widely available'
                ],
                cons: [
                    'Contributes to plastic pollution',
                    'High environmental footprint',
                    'Single-use only',
                    'Petroleum-based material',
                    'Takes 450+ years to decompose'
                ],
                alternatives: ['2345678901', '3456789012']
            },
            '2345678901': {
                name: 'Reusable Stainless Steel Water Bottle',
                brand: 'EcoFlow',
                category: 'Reusable Products',
                barcode: '2345678901',
                image: 'https://source.unsplash.com/400x400/?steel,bottle,reusable',
                sustainabilityScore: 92,
                scoreFactors: {
                    materials: 95,
                    production: 85,
                    packaging: 90,
                    endOfLife: 98,
                    certifications: 92
                },
                environmentalImpact: {
                    carbonFootprint: '15g CO₂ per use',
                    waterUsage: '0.5L per use',
                    plasticWaste: '0g plastic',
                    recyclability: '100% recyclable'
                },
                certifications: [
                    { name: 'Cradle to Cradle', icon: '🔄' },
                    { name: 'Carbon Neutral', icon: '🌍' },
                    { name: 'Fair Trade', icon: '🤝' }
                ],
                materials: [
                    { name: 'Stainless Steel 304', type: 'safe' },
                    { name: 'Food-Grade Silicone', type: 'safe' },
                    { name: 'BPA-Free', type: 'safe' }
                ],
                pros: [
                    'Reusable for years',
                    'No harmful chemicals',
                    'Keeps drinks hot or cold',
                    'Durable and long-lasting',
                    'Fully recyclable',
                    'Reduces plastic waste'
                ],
                cons: [
                    'Higher initial cost',
                    'Heavier than plastic'
                ],
                alternatives: []
            },
            '3456789012': {
                name: 'Organic Trail Mix',
                brand: 'Nature\'s Harvest',
                category: 'Food',
                barcode: '3456789012',
                image: 'https://source.unsplash.com/400x400/?organic,snack,nuts',
                sustainabilityScore: 85,
                scoreFactors: {
                    materials: 90,
                    production: 88,
                    packaging: 75,
                    endOfLife: 85,
                    certifications: 90
                },
                environmentalImpact: {
                    carbonFootprint: '50g CO₂',
                    waterUsage: '2L water',
                    plasticWaste: '5g compostable',
                    recyclability: 'Compostable packaging'
                },
                certifications: [
                    { name: 'USDA Organic', icon: '🌿' },
                    { name: 'Non-GMO', icon: '🧬' },
                    { name: 'Rainforest Alliance', icon: '🌳' }
                ],
                materials: [
                    { name: 'Organic Almonds', type: 'safe' },
                    { name: 'Organic Raisins', type: 'safe' },
                    { name: 'Compostable Film', type: 'safe' },
                    { name: 'Plant-Based Ink', type: 'safe' }
                ],
                pros: [
                    'Certified organic ingredients',
                    'Compostable packaging',
                    'No artificial additives',
                    'Supports sustainable farming',
                    'Non-GMO verified'
                ],
                cons: [
                    'Slightly higher price point',
                    'Limited shelf life'
                ],
                alternatives: []
            },
            '4567890123': {
                name: 'LED Smart Bulb',
                brand: 'BrightGreen',
                category: 'Electronics',
                barcode: '4567890123',
                image: 'https://source.unsplash.com/400x400/?led,bulb,light',
                sustainabilityScore: 88,
                scoreFactors: {
                    materials: 85,
                    production: 82,
                    packaging: 88,
                    endOfLife: 92,
                    certifications: 93
                },
                environmentalImpact: {
                    carbonFootprint: '8kg CO₂ lifetime',
                    waterUsage: 'Minimal',
                    plasticWaste: '12g recyclable',
                    recyclability: '90% recyclable'
                },
                certifications: [
                    { name: 'Energy Star', icon: '⭐' },
                    { name: 'RoHS Compliant', icon: '♻️' },
                    { name: 'FCC Certified', icon: '✓' }
                ],
                materials: [
                    { name: 'LED Diodes', type: 'safe' },
                    { name: 'Aluminum Heat Sink', type: 'safe' },
                    { name: 'Recyclable Plastic', type: 'safe' },
                    { name: 'Mercury-Free', type: 'safe' }
                ],
                pros: [
                    'Uses 85% less energy than incandescent',
                    'Lasts 25,000+ hours',
                    'Mercury-free',
                    'Recyclable components',
                    'Smart home compatible'
                ],
                cons: [
                    'Higher upfront cost',
                    'Contains some electronic waste'
                ],
                alternatives: []
            },
            '5678901234': {
                name: 'Conventional Laundry Detergent',
                brand: 'CleanMax',
                category: 'Cleaning',
                barcode: '5678901234',
                image: 'https://source.unsplash.com/400x400/?detergent,laundry',
                sustainabilityScore: 35,
                scoreFactors: {
                    materials: 25,
                    production: 40,
                    packaging: 30,
                    endOfLife: 35,
                    certifications: 45
                },
                environmentalImpact: {
                    carbonFootprint: '180g CO₂',
                    waterUsage: '8L water',
                    plasticWaste: '45g plastic',
                    recyclability: 'Limited recyclability'
                },
                certifications: [],
                materials: [
                    { name: 'Synthetic Fragrances', type: 'harmful' },
                    { name: 'Phosphates', type: 'harmful' },
                    { name: 'Optical Brighteners', type: 'caution' },
                    { name: 'Petroleum-based Surfactants', type: 'caution' }
                ],
                pros: [
                    'Effective cleaning power',
                    'Affordable price'
                ],
                cons: [
                    'Contains harmful chemicals',
                    'Water pollution concerns',
                    'Non-biodegradable ingredients',
                    'Plastic packaging',
                    'Harmful to aquatic life'
                ],
                alternatives: ['6789012345']
            },
            '6789012345': {
                name: 'Plant-Based Eco Laundry Detergent',
                brand: 'GreenWash',
                category: 'Cleaning',
                barcode: '6789012345',
                image: 'https://source.unsplash.com/400x400/?eco,detergent',
                sustainabilityScore: 91,
                scoreFactors: {
                    materials: 95,
                    production: 90,
                    packaging: 88,
                    endOfLife: 94,
                    certifications: 88
                },
                environmentalImpact: {
                    carbonFootprint: '40g CO₂',
                    waterUsage: '2L water',
                    plasticWaste: '0g - refillable',
                    recyclability: '100% biodegradable'
                },
                certifications: [
                    { name: 'EPA Safer Choice', icon: '✓' },
                    { name: 'Leaping Bunny', icon: '🐰' },
                    { name: 'USDA BioPreferred', icon: '🌿' }
                ],
                materials: [
                    { name: 'Plant-Based Surfactants', type: 'safe' },
                    { name: 'Essential Oils', type: 'safe' },
                    { name: 'Natural Enzymes', type: 'safe' },
                    { name: 'Biodegradable Formula', type: 'safe' }
                ],
                pros: [
                    'Plant-based ingredients',
                    'Biodegradable formula',
                    'Cruelty-free certified',
                    'Refillable packaging',
                    'Safe for septic systems',
                    'Hypoallergenic'
                ],
                cons: [
                    'May cost slightly more',
                    'Requires slightly more product per load'
                ],
                alternatives: []
            }
        };
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Scan button
        document.getElementById('scanButton').addEventListener('click', () => {
            this.scanProduct();
        });

        // Enter key in input
        document.getElementById('manualBarcodeInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.scanProduct();
            }
        });

        // Sample product buttons
        document.querySelectorAll('.sample-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.target.dataset.code;
                document.getElementById('manualBarcodeInput').value = code;
                this.scanProduct();
            });
        });

        // Back button
        document.getElementById('backButton').addEventListener('click', () => {
            this.showScanner();
        });

        // History link
        document.getElementById('historyLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showHistory();
        });

        // Clear history
        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.clearHistory();
        });

        // Action buttons
        document.getElementById('compareBtn').addEventListener('click', () => {
            this.showToast('Compare feature coming soon!');
        });

        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareResults();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveToHistory();
        });

        // Method buttons
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on outside click
        document.getElementById('infoModal').addEventListener('click', (e) => {
            if (e.target.id === 'infoModal') {
                this.closeModal();
            }
        });
    }

    // Scan Product
    async scanProduct() {
        const input = document.getElementById('manualBarcodeInput');
        const barcode = input.value.trim();

        if (!barcode) {
            this.showToast('Please enter a barcode or product name');
            return;
        }

        // Show loading
        this.showLoading();

        // Simulate scanning delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Find product
        const product = this.productDatabase[barcode];

        this.hideLoading();

        if (product) {
            this.currentProduct = product;
            this.displayProduct(product);
            input.value = '';
        } else {
            this.showToast('Product not found. Try our sample products!');
        }
    }

    // Display Product Results
    displayProduct(product) {
        // Hide scanner, show results
        document.getElementById('scannerSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';

        // Product info
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productBrand').textContent = product.brand;
        document.getElementById('productCategory').textContent = product.category;

        // Badge
        const badge = document.getElementById('productBadge');
        const { label, className } = this.getScoreLabel(product.sustainabilityScore);
        badge.textContent = label;
        badge.className = `product-badge ${className}`;

        // Sustainability score
        this.displayScore(product);

        // Environmental impact
        this.displayImpact(product);

        // Certifications
        this.displayCertifications(product);

        // Materials
        this.displayMaterials(product);

        // Pros and cons
        this.displayProsAndCons(product);

        // Alternatives
        this.displayAlternatives(product);

        // Update stats
        this.incrementTotalScans();
        this.updateStats();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    displayScore(product) {
        const score = product.sustainabilityScore;
        const scoreValue = document.getElementById('scoreValue');
        const scoreLabel = document.getElementById('scoreLabel');
        const scoreProgress = document.getElementById('scoreProgress');

        scoreValue.textContent = score;
        const { label } = this.getScoreLabel(score);
        scoreLabel.textContent = label;

        // Animate circle
        const circumference = 2 * Math.PI * 85;
        const offset = circumference - (score / 100) * circumference;
        scoreProgress.style.strokeDashoffset = offset;

        // Color based on score
        if (score >= 80) {
            scoreProgress.style.stroke = '#10b981';
            scoreValue.style.color = '#10b981';
        } else if (score >= 60) {
            scoreProgress.style.stroke = '#3b82f6';
            scoreValue.style.color = '#3b82f6';
        } else if (score >= 40) {
            scoreProgress.style.stroke = '#f59e0b';
            scoreValue.style.color = '#f59e0b';
        } else {
            scoreProgress.style.stroke = '#ef4444';
            scoreValue.style.color = '#ef4444';
        }

        // Score breakdown
        const breakdown = document.getElementById('scoreBreakdown');
        breakdown.innerHTML = Object.entries(product.scoreFactors).map(([factor, value]) => `
            <div class="score-factor">
                <div class="factor-header">
                    <span class="factor-name">${this.formatFactorName(factor)}</span>
                    <span class="factor-value">${value}/100</span>
                </div>
                <div class="factor-bar">
                    <div class="factor-fill" style="width: ${value}%;"></div>
                </div>
            </div>
        `).join('');
    }

    displayImpact(product) {
        const impactGrid = document.getElementById('impactGrid');
        const impact = product.environmentalImpact;

        impactGrid.innerHTML = Object.entries(impact).map(([key, value]) => {
            let className = '';
            if (key === 'carbonFootprint' && value.includes('250g')) className = 'danger';
            if (key === 'plasticWaste' && value.includes('15g')) className = 'warning';

            return `
                <div class="impact-item ${className}">
                    <div class="impact-label">${this.formatFactorName(key)}</div>
                    <div class="impact-value">${value}</div>
                </div>
            `;
        }).join('');
    }

    displayCertifications(product) {
        const section = document.getElementById('certificationsSection');
        const grid = document.getElementById('certificationsGrid');

        if (product.certifications.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        grid.innerHTML = product.certifications.map(cert => `
            <div class="certification-badge">
                <div class="certification-icon">${cert.icon}</div>
                <div class="certification-name">${cert.name}</div>
            </div>
        `).join('');
    }

    displayMaterials(product) {
        const section = document.getElementById('materialsSection');
        const list = document.getElementById('materialsList');

        if (product.materials.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        list.innerHTML = product.materials.map(material => `
            <span class="material-tag ${material.type}">${material.name}</span>
        `).join('');
    }

    displayProsAndCons(product) {
        const prosList = document.getElementById('prosList');
        const consList = document.getElementById('consList');

        prosList.innerHTML = product.pros.map(pro => `<li>${pro}</li>`).join('');
        consList.innerHTML = product.cons.map(con => `<li>${con}</li>`).join('');
    }

    displayAlternatives(product) {
        const section = document.getElementById('alternativesSection');
        const grid = document.getElementById('alternativesGrid');

        if (product.alternatives.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        const alternatives = product.alternatives.map(barcode => this.productDatabase[barcode]);

        grid.innerHTML = alternatives.map(alt => `
            <div class="alternative-card" onclick="app.scanAlternative('${alt.barcode}')">
                <div class="alternative-header">
                    <div class="alternative-name">${alt.name}</div>
                    <div class="alternative-score">${alt.sustainabilityScore}</div>
                </div>
                <div class="alternative-brand">${alt.brand}</div>
                <div class="alternative-benefits">
                    ${alt.sustainabilityScore >= 80 ? '<span class="benefit-badge">Eco-Friendly</span>' : ''}
                    ${alt.certifications.length > 0 ? '<span class="benefit-badge">Certified</span>' : ''}
                    ${alt.scoreFactors.materials >= 90 ? '<span class="benefit-badge">Safe Materials</span>' : ''}
                    ${alt.scoreFactors.endOfLife >= 90 ? '<span class="benefit-badge">Recyclable</span>' : ''}
                </div>
            </div>
        `).join('');
    }

    scanAlternative(barcode) {
        const product = this.productDatabase[barcode];
        if (product) {
            this.currentProduct = product;
            this.displayProduct(product);
            this.ecoChoices++;
            this.saveData();
            this.showToast('Great choice! You selected an eco-friendly alternative! 🌱');
        }
    }

    // History Management
    showHistory() {
        document.getElementById('scannerSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('historySection').style.display = 'block';

        const historyGrid = document.getElementById('historyGrid');
        const emptyHistory = document.getElementById('emptyHistory');

        if (this.scanHistory.length === 0) {
            historyGrid.style.display = 'none';
            emptyHistory.style.display = 'block';
        } else {
            historyGrid.style.display = 'grid';
            emptyHistory.style.display = 'none';

            historyGrid.innerHTML = this.scanHistory.map(item => `
                <div class="history-item" onclick="app.viewHistoryItem('${item.barcode}')">
                    <div class="history-item-name">${item.name}</div>
                    <div class="history-item-score">Score: ${item.score}</div>
                    <div class="history-item-date">${new Date(item.date).toLocaleDateString()}</div>
                </div>
            `).join('');
        }
    }

    viewHistoryItem(barcode) {
        const product = this.productDatabase[barcode];
        if (product) {
            this.currentProduct = product;
            this.displayProduct(product);
        }
    }

    saveToHistory() {
        if (!this.currentProduct) return;

        const exists = this.scanHistory.some(item => item.barcode === this.currentProduct.barcode);
        
        if (exists) {
            this.showToast('Product already in history');
            return;
        }

        const historyItem = {
            barcode: this.currentProduct.barcode,
            name: this.currentProduct.name,
            score: this.currentProduct.sustainabilityScore,
            date: new Date().toISOString()
        };

        this.scanHistory.push(historyItem);
        this.saveData();
        this.showToast('Saved to history!');
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all scan history?')) {
            this.scanHistory = [];
            this.saveData();
            this.showHistory();
            this.showToast('History cleared');
        }
    }

    // Utility Functions
    getScoreLabel(score) {
        if (score >= 80) return { label: 'Excellent', className: 'excellent' };
        if (score >= 60) return { label: 'Good', className: 'good' };
        if (score >= 40) return { label: 'Fair', className: 'fair' };
        return { label: 'Poor', className: 'poor' };
    }

    formatFactorName(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    showScanner() {
        document.getElementById('scannerSection').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('historySection').style.display = 'none';
    }

    shareResults() {
        if (!this.currentProduct) return;

        const text = `I scanned ${this.currentProduct.name} and it has a sustainability score of ${this.currentProduct.sustainabilityScore}/100! Check out Eco Scanner to make sustainable choices. 🌱`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Eco Scanner Results',
                text: text
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Results copied to clipboard!');
            });
        }
    }

    incrementTotalScans() {
        const currentScans = parseInt(localStorage.getItem('ecoScannerTotalScans') || '0');
        localStorage.setItem('ecoScannerTotalScans', (currentScans + 1).toString());
    }

    updateStats() {
        // Total scans
        const totalScans = parseInt(localStorage.getItem('ecoScannerTotalScans') || '0');
        document.getElementById('totalScans').textContent = totalScans;

        // Eco choices
        document.getElementById('ecoChoices').textContent = this.ecoChoices;

        // CO2 saved (rough estimate: each eco choice saves ~200g CO2)
        const co2Saved = (this.ecoChoices * 0.2).toFixed(1);
        document.getElementById('co2Saved').textContent = co2Saved;
    }

    // UI Functions
    showLoading() {
        document.getElementById('loadingOverlay').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    openModal(title, content) {
        const modal = document.getElementById('infoModal');
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('infoModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Data Persistence
    saveData() {
        localStorage.setItem('ecoScannerHistory', JSON.stringify(this.scanHistory));
        localStorage.setItem('ecoScannerEcoChoices', this.ecoChoices.toString());
    }

    loadData() {
        const historyData = localStorage.getItem('ecoScannerHistory');
        const ecoChoicesData = localStorage.getItem('ecoScannerEcoChoices');

        this.scanHistory = historyData ? JSON.parse(historyData) : [];
        this.ecoChoices = ecoChoicesData ? parseInt(ecoChoicesData) : 0;
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EcoProductScanner();
});
