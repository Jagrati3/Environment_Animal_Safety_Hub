// Fashion Impact Calculator Application

class FashionImpactCalculator {
    constructor() {
        this.currentTab = 'dashboard';
        this.wardrobe = this.loadWardrobe();
        this.initializeEventListeners();
        this.updateDashboard();
    }

    // Material Impact Data (per garment average)
    static MATERIAL_IMPACTS = {
        'conventional-cotton': {
            water: 2700, // liters
            co2: 3.3, // kg
            chemicals: 8.8, // grams (pesticides)
            microplastics: 0, // grams
            label: 'Conventional Cotton'
        },
        'organic-cotton': {
            water: 1800,
            co2: 2.5,
            chemicals: 1.2,
            microplastics: 0,
            label: 'Organic Cotton'
        },
        'polyester': {
            water: 0,
            co2: 5.4,
            chemicals: 3.5,
            microplastics: 0.022,
            label: 'Polyester'
        },
        'recycled-polyester': {
            water: 0,
            co2: 2.1,
            chemicals: 1.8,
            microplastics: 0.011,
            label: 'Recycled Polyester'
        },
        'nylon': {
            water: 500,
            co2: 4.9,
            chemicals: 4.2,
            microplastics: 0.018,
            label: 'Nylon'
        },
        'recycled-nylon': {
            water: 100,
            co2: 2.3,
            chemicals: 1.5,
            microplastics: 0.009,
            label: 'Recycled Nylon'
        },
        'wool': {
            water: 500,
            co2: 8.1,
            chemicals: 2.1,
            microplastics: 0,
            label: 'Wool'
        },
        'organic-wool': {
            water: 400,
            co2: 7.5,
            chemicals: 0.5,
            microplastics: 0,
            label: 'Organic Wool'
        },
        'silk': {
            water: 2700,
            co2: 6.1,
            chemicals: 1.8,
            microplastics: 0,
            label: 'Silk'
        },
        'linen': {
            water: 330,
            co2: 1.9,
            chemicals: 0.8,
            microplastics: 0,
            label: 'Linen'
        }
    };

    // Country Labor Ratings
    static COUNTRY_LABOR_RATINGS = {
        'Bangladesh': { score: 2, description: 'Low labor standards - high risk' },
        'Vietnam': { score: 3, description: 'Developing labor standards' },
        'China': { score: 3, description: 'Developing labor standards' },
        'Indonesia': { score: 3, description: 'Developing labor standards' },
        'India': { score: 3, description: 'Developing labor standards' },
        'Thailand': { score: 4, description: 'Moderate labor standards' },
        'Mexico': { score: 4, description: 'Moderate labor standards' },
        'Portugal': { score: 5, description: 'High labor standards' },
        'Italy': { score: 5, description: 'High labor standards' },
        'USA': { score: 5, description: 'High labor standards' },
        'Canada': { score: 5, description: 'High labor standards' },
        'Germany': { score: 5, description: 'High labor standards' },
        'France': { score: 5, description: 'High labor standards' }
    };

    // Sustainable Brands Database
    static SUSTAINABLE_BRANDS = [
        {
            name: 'Everlane',
            sustainability_score: 78,
            price_range: '$',
            styles: ['Basics', 'Denim', 'Jackets'],
            certifications: ['Transparent', 'Ethical Production'],
            description: 'Known for radical transparency in pricing and sourcing'
        },
        {
            name: 'Patagonia',
            sustainability_score: 92,
            price_range: '$$',
            styles: ['Outdoor', 'Casual', 'Athletic'],
            certifications: ['Fair Trade', 'Organic', 'Recycled'],
            description: 'Environmental commitment with 1% for the planet'
        },
        {
            name: 'Reformation',
            sustainability_score: 85,
            price_range: '$$',
            styles: ['Dresses', 'Denim', 'Activewear'],
            certifications: ['Organic', 'GOTS', 'Carbon Neutral'],
            description: 'Fashion-forward sustainable clothing brand'
        },
        {
            name: 'Uniqlo',
            sustainability_score: 65,
            price_range: '$',
            styles: ['Basics', 'Casual', 'Seasonal'],
            certifications: ['Organic Cotton', 'Ethical'],
            description: 'Affordable sustainable basics for everyday wear'
        },
        {
            name: 'Allbirds',
            sustainability_score: 84,
            price_range: '$$',
            styles: ['Shoes', 'Accessories'],
            certifications: ['Sustainable Materials', 'Carbon Neutral'],
            description: 'Eco-friendly footwear from renewable resources'
        },
        {
            name: 'Veja',
            sustainability_score: 82,
            price_range: '$$',
            styles: ['Sneakers', 'Accessories'],
            certifications: ['Fair Trade', 'Ethical', 'Organic'],
            description: 'Premium sustainable sneakers with fair trade principles'
        },
        {
            name: 'Tentree',
            sustainability_score: 86,
            price_range: '$$',
            styles: ['Casual', 'Basics', 'Activewear'],
            certifications: ['Organic', 'Ethical', 'Trees Planted'],
            description: 'Plants trees for every item sold and uses organic materials'
        },
        {
            name: 'Waffect',
            sustainability_score: 79,
            price_range: '$',
            styles: ['Basics', 'Casual'],
            certifications: ['Fair Trade', 'Organic'],
            description: 'Berlin-based sustainable fashion brand'
        },
        {
            name: 'Armedangels',
            sustainability_score: 88,
            price_range: '$$',
            styles: ['Casual', 'Denim', 'Basics'],
            certifications: ['Fair Trade', 'Organic', 'GOTS'],
            description: 'German brand with strict sustainability standards'
        },
        {
            name: 'Know The Origin',
            sustainability_score: 90,
            price_range: '$$',
            styles: ['Luxury', 'Basics', 'Accessories'],
            certifications: ['Fair Trade', 'Transparent', 'Ethical'],
            description: 'Complete transparency on where and how items are made'
        }
    ];

    // Repair Guides
    static REPAIR_GUIDES = [
        {
            issue: 'Torn Seams',
            icon: '🪡',
            repairOption: 'Take to tailor for $15-30',
            environOption: 'Learn to hand stitch ($0)',
            envScore: 10,
            cost: 0
        },
        {
            issue: 'Stained Fabric',
            icon: '🧼',
            repairOption: 'Professional dry cleaning',
            environOption: 'DIY with vinegar and baking soda',
            envScore: 9,
            cost: 0
        },
        {
            issue: 'Loose Buttons',
            icon: '🔘',
            repairOption: 'Seamstress replacement',
            environOption: 'Sew it yourself (5 min)',
            envScore: 10,
            cost: 0
        },
        {
            issue: 'Faded Color',
            icon: '🎨',
            repairOption: 'Professional dyeing service',
            environOption: 'DIY fabric dye at home',
            envScore: 8,
            cost: 5
        },
        {
            issue: 'Stretched Fabric',
            icon: '📏',
            repairOption: 'Tailor alterations $30-50',
            environOption: 'Hand wash in cold water, block dry',
            envScore: 9,
            cost: 0
        },
        {
            issue: 'Pilling',
            icon: '🧶',
            repairOption: 'Professional depilling',
            environOption: 'Use fabric shaver or sweater comb',
            envScore: 10,
            cost: 0
        },
        {
            issue: 'Broken Zipper',
            icon: '⚙️',
            repairOption: 'Tailor replacement $20-40',
            environOption: 'Watch tutorial + replacement kit $5',
            envScore: 9,
            cost: 5
        },
        {
            issue: 'Hemming',
            icon: '✂️',
            repairOption: 'Professional hemming $15-30',
            environOption: 'Hand stitch or fabric glue',
            envScore: 9,
            cost: 3
        }
    ];

    // Upcycling Ideas
    static UPCYCLING_IDEAS = [
        { item: 'T-shirt', idea: 'Convert to tote bag or pillow case', impact: 'Extends life ~5 years', icon: '👜' },
        { item: 'Old Jeans', idea: 'Cut into shorts or patch onto other items', impact: 'Prevents 5kg CO2', icon: '👖' },
        { item: 'Sweater', idea: 'Use sleeves for leg warmers or arm warmers', impact: 'Prevents waste', icon: '🧥' },
        { item: 'Dress', idea: 'Shorten to skirt or add panels to make larger', impact: 'Gives 2-3 more years use', icon: '👗' },
        { item: 'Scarf', idea: 'Create headband, belt, or hair accessory', impact: 'New wardrobe items', icon: '🧣' },
        { item: 'Damaged Cotton', idea: 'Make cleaning rags or stitch into quilt', impact: 'Complete waste prevention', icon: '🧹' },
        { item: 'Wool Sweater', idea: 'Felt and create slippers or coasters', impact: 'Beautiful new items', icon: '🧤' },
        { item: 'Bedsheet', idea: 'Sew into skirt or tunic top', impact: 'Multiple new pieces', icon: '🛏️' },
        { item: 'Buttons', idea: 'Create unique jewelry or craft supplies', impact: 'Zero waste craft', icon: '✨' },
        { item: 'Denim Scraps', idea: 'Create patchwork accessory or wall hanging', impact: 'Decorative + sustainable', icon: '🎨' }
    ];

    // Initialize Event Listeners
    initializeEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Form submissions
        const addItemForm = document.getElementById('addItemForm');
        if (addItemForm) {
            addItemForm.addEventListener('submit', (e) => this.addGarment(e));
        }

        const calculatorForm = document.getElementById('calculatorForm');
        if (calculatorForm) {
            calculatorForm.addEventListener('submit', (e) => this.calculateImpact(e));
        }

        // Filter and sort
        document.getElementById('garmentTypeFilter')?.addEventListener('change', () => this.updateAudit());
        document.getElementById('garmentSortBy')?.addEventListener('change', () => this.updateAudit());
        document.getElementById('brandSearch')?.addEventListener('input', () => this.filterBrands());
        document.getElementById('priceFilter')?.addEventListener('change', () => this.filterBrands());

        // Modal
        document.getElementById('addItemBtn')?.addEventListener('click', () => this.openModal());
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('addItemModal');
            if (e.target === modal) this.closeModal();
        });
    }

    // Tab Management
    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.nav-tab').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const tabElement = document.getElementById(`${tabName}Tab`);
        const btnElement = document.querySelector(`[data-tab="${tabName}"]`);
        if (tabElement) tabElement.classList.add('active');
        if (btnElement) btnElement.classList.add('active');

        this.currentTab = tabName;

        // Update content
        if (tabName === 'audit') this.updateAudit();
        if (tabName === 'brands') this.populateBrands();
        if (tabName === 'repair') this.populateRepairGuides();
    }

    // Dashboard Management
    updateDashboard() {
        const garmentCount = this.wardrobe.length;
        const totalWater = this.wardrobe.reduce((sum, g) => sum + (g.water || 0), 0);
        const totalCO2 = this.wardrobe.reduce((sum, g) => sum + (g.co2 || 0), 0);
        const totalChemicals = this.wardrobe.reduce((sum, g) => sum + (g.chemicals || 0), 0);

        // Update summary cards
        document.getElementById('dashboardGarments')?.textContent || 'All Items: ' + garmentCount;
        document.getElementById('dashboardWater')?.textContent || totalWater.toFixed(0);
        document.getElementById('dashboardCO2')?.textContent || totalCO2.toFixed(1);
        document.getElementById('dashboardChemicals')?.textContent || totalChemicals.toFixed(0);

        // Update material breakdown
        this.updateMaterialBreakdown();
    }

    updateMaterialBreakdown() {
        const materialCount = {};
        this.wardrobe.forEach(garment => {
            const type = garment.type || 'Other';
            materialCount[type] = (materialCount[type] || 0) + 1;
        });

        const breakdownContainer = document.querySelector('.material-breakdown');
        if (breakdownContainer) {
            breakdownContainer.innerHTML = '';
            Object.entries(materialCount).forEach(([type, count]) => {
                const percentage = (count / this.wardrobe.length) * 100;
                breakdownContainer.innerHTML += `
                    <div class="material-item">
                        <span class="material-label">${type}</span>
                        <div class="material-bar">
                            <div class="material-fill" style="width: ${percentage}%">
                                <span>${count}</span>
                            </div>
                        </div>
                        <span class="material-value">${percentage.toFixed(0)}%</span>
                    </div>
                `;
            });
        }
    }

    // Wardrobe Management
    addGarment(event) {
        event.preventDefault();

        const formData = {
            id: Date.now(),
            name: document.getElementById('garmentName').value,
            type: document.getElementById('garmentType').value,
            weight: parseFloat(document.getElementById('garmentWeight').value) || 0.5,
            material: document.getElementById('garmentMaterial').value,
            brand: document.getElementById('garmentBrand').value,
            purchaseDate: document.getElementById('purchaseDate').value,
            condition: document.getElementById('condition').value,
            wearFrequency: document.getElementById('wearFrequency').value,
            washFrequency: document.getElementById('washFrequency').value,
            price: parseFloat(document.getElementById('price').value) || 0,
            certifications: this.getSelectedCertifications(),
            notes: document.getElementById('notes').value,
            dateAdded: new Date().toISOString()
        };

        // Calculate impact
        const impact = this.calculateGarmentImpact(formData);
        Object.assign(formData, impact);

        this.wardrobe.push(formData);
        this.saveWardrobe();
        this.closeModal();
        document.getElementById('addItemForm').reset();
        this.updateDashboard();
        this.updateAudit();

        alert(`✅ Added "${formData.name}" to your wardrobe!`);
    }

    getSelectedCertifications() {
        const checkboxes = document.querySelectorAll('input[name="certifications"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    calculateGarmentImpact(garment) {
        const material = FashionImpactCalculator.MATERIAL_IMPACTS[garment.material] || 
                        FashionImpactCalculator.MATERIAL_IMPACTS['conventional-cotton'];
        
        const weight = garment.weight || 0.5;
        let impact = {
            water: material.water * weight,
            co2: material.co2 * weight,
            chemicals: material.chemicals * weight,
            microplastics: material.microplastics * weight
        };

        // Labor impact based on country
        const countryInfo = FashionImpactCalculator.COUNTRY_LABOR_RATINGS[garment.brand] || { score: 3 };
        impact.laborScore = countryInfo.score;

        // Calculate sustainability score (0-100)
        let sustainabilityScore = 50; // baseline
        if (garment.certifications.length > 0) sustainabilityScore += garment.certifications.length * 10;
        if (countryInfo.score >= 4) sustainabilityScore += 15;
        if (material.water < 500) sustainabilityScore += 10;
        if (material.chemicals < 2) sustainabilityScore += 10;
        sustainabilityScore = Math.min(sustainabilityScore, 100);

        impact.sustainabilityScore = sustainabilityScore;
        impact.costPerWear = garment.price / (garment.wearFrequency === 'daily' ? 100 : 
                                             garment.wearFrequency === 'weekly' ? 52 : 10);

        return impact;
    }

    updateAudit() {
        const filterType = document.getElementById('garmentTypeFilter')?.value || 'all';
        const sortBy = document.getElementById('garmentSortBy')?.value || 'date';

        let filtered = this.wardrobe;
        if (filterType !== 'all') {
            filtered = this.wardrobe.filter(g => g.type === filterType);
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date') return new Date(b.dateAdded) - new Date(a.dateAdded);
            if (sortBy === 'impact') return b.sustainabilityScore - a.sustainabilityScore;
            if (sortBy === 'age') {
                const ageA = new Date() - new Date(a.purchaseDate);
                const ageB = new Date() - new Date(b.purchaseDate);
                return ageB - ageA;
            }
            return 0;
        });

        const container = document.querySelector('.wardrobe-list');
        if (!container) return;

        container.innerHTML = filtered.length === 0 ? 
            '<div class="empty-state"><p>📦 No garments yet. Start by adding items to your wardrobe!</p></div>' :
            filtered.map(garment => this.createGarmentCard(garment)).join('');

        // Add delete listeners
        document.querySelectorAll('.delete-garment').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteGarment(e.target.dataset.id));
        });
    }

    createGarmentCard(garment) {
        const conditionClass = `condition-${garment.condition}`;
        const ageMonths = Math.floor((new Date() - new Date(garment.purchaseDate)) / (30 * 24 * 60 * 60 * 1000));
        
        return `
            <div class="wardrobe-item">
                <div class="item-header">
                    <span class="item-name">${garment.name}</span>
                    <div class="item-actions">
                        <button class="item-action-btn delete-garment" data-id="${garment.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <span class="item-condition ${conditionClass}">${garment.condition.toUpperCase()}</span>
                <div class="item-meta">
                    <div class="meta-item">
                        <span class="meta-label">Type</span>
                        <span class="meta-value">${garment.type}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Material</span>
                        <span class="meta-value">${FashionImpactCalculator.MATERIAL_IMPACTS[garment.material]?.label || 'Unknown'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Age</span>
                        <span class="meta-value">${ageMonths} months</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Cost/Wear</span>
                        <span class="meta-value">$${garment.costPerWear.toFixed(2)}</span>
                    </div>
                </div>
                <div class="item-impact-mini">
                    <div class="mini-impact">
                        <span class="mini-impact-icon">💧</span>
                        <span class="mini-impact-value">${garment.water.toFixed(0)}L</span>
                    </div>
                    <div class="mini-impact">
                        <span class="mini-impact-icon">🌍</span>
                        <span class="mini-impact-value">${garment.co2.toFixed(1)}kg</span>
                    </div>
                </div>
                <div style="padding-top: 10px; border-top: 1px solid var(--border-color); font-size: 12px; color: var(--text-secondary);">
                    ${garment.notes ? `📝 ${garment.notes}` : 'No notes'}
                </div>
            </div>
        `;
    }

    deleteGarment(id) {
        if (confirm('Delete this garment from your wardrobe?')) {
            this.wardrobe = this.wardrobe.filter(g => g.id !== parseInt(id));
            this.saveWardrobe();
            this.updateAudit();
            this.updateDashboard();
        }
    }

    calculateImpact(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('calcGarmentName').value,
            type: document.getElementById('calcGarmentType').value,
            weight: parseFloat(document.getElementById('calcGarmentWeight').value) || 0.5,
            material: document.getElementById('calcMaterial').value,
            brand: document.getElementById('calcBrand').value,
            purchaseDate: document.getElementById('calcPurchaseDate').value,
            condition: document.getElementById('calcCondition').value,
            wearFrequency: document.getElementById('calcWearFrequency').value,
            washFrequency: document.getElementById('calcWashFrequency').value,
            price: parseFloat(document.getElementById('calcPrice').value) || 0,
            certifications: document.getElementById('calcCertifications').value.split(',').filter(c => c),
            notes: document.getElementById('calcNotes').value
        };

        const impact = this.calculateGarmentImpact(formData);

        // Display results
        const resultsDiv = document.getElementById('calculationResults');
        resultsDiv.innerHTML = `
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-icon">💧</div>
                    <span class="result-label">WATER CONSUMED</span>
                    <span class="result-value">${impact.water.toFixed(0)}</span>
                    <span class="result-unit">liters</span>
                </div>
                <div class="result-card">
                    <div class="result-icon">🌍</div>
                    <span class="result-label">CO2 EMISSIONS</span>
                    <span class="result-value">${impact.co2.toFixed(2)}</span>
                    <span class="result-unit">kg CO2</span>
                </div>
                <div class="result-card">
                    <div class="result-icon">☢️</div>
                    <span class="result-label">CHEMICAL WASTE</span>
                    <span class="result-value">${impact.chemicals.toFixed(1)}</span>
                    <span class="result-unit">grams</span>
                </div>
                <div class="result-card">
                    <div class="result-icon">🔬</div>
                    <span class="result-label">MICROPLASTICS</span>
                    <span class="result-value">${impact.microplastics.toFixed(4)}</span>
                    <span class="result-unit">grams</span>
                </div>
                <div class="result-card">
                    <div class="result-icon">👥</div>
                    <span class="result-label">LABOR RATING</span>
                    <span class="result-value">${impact.laborScore}/5</span>
                    <span class="result-unit">fairness</span>
                </div>
                <div class="result-card">
                    <div class="result-icon">⭐</div>
                    <span class="result-label">SUSTAINABILITY</span>
                    <span class="result-value">${impact.sustainabilityScore}</span>
                    <span class="result-unit">/100</span>
                </div>
            </div>
            <div class="result-details">
                <h3>Impact Breakdown</h3>
                <div class="breakdown-item">
                    <span>Water equivalent to showers:</span>
                    <span>${(impact.water / 15).toFixed(1)} min showers</span>
                </div>
                <div class="breakdown-item">
                    <span>CO2 equivalent to km driven:</span>
                    <span>${(impact.co2 / 0.21).toFixed(1)} km by car</span>
                </div>
                <div class="breakdown-item">
                    <span>Certifications:</span>
                    <span>${formData.certifications.length > 0 ? formData.certifications.join(', ') : 'None'}</span>
                </div>
                <div class="breakdown-item">
                    <span>Cost per wear (estimated):</span>
                    <span>$${impact.costPerWear.toFixed(2)}</span>
                </div>
            </div>
        `;
    }

    populateBrands() {
        const container = document.querySelector('.brands-grid');
        if (!container) return;

        container.innerHTML = FashionImpactCalculator.SUSTAINABLE_BRANDS
            .map(brand => `
                <div class="brand-card">
                    <div class="brand-name">${brand.name}</div>
                    <div class="brand-description">${brand.description}</div>
                    <div class="brand-info">
                        <div class="brand-stat">
                            <span class="brand-stat-label">Sustainability</span>
                            <span class="brand-stat-value">${brand.sustainability_score}/100</span>
                        </div>
                        <div class="brand-stat">
                            <span class="brand-stat-label">Price Range</span>
                            <span class="brand-stat-value">${brand.price_range}</span>
                        </div>
                    </div>
                    <div class="brand-certifications">
                        ${brand.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
                    </div>
                </div>
            `).join('');
    }

    filterBrands() {
        const searchTerm = document.getElementById('brandSearch')?.value.toLowerCase() || '';
        const priceFilter = document.getElementById('priceFilter')?.value || 'all';

        const filtered = FashionImpactCalculator.SUSTAINABLE_BRANDS.filter(brand => {
            const matchesSearch = brand.name.toLowerCase().includes(searchTerm) || 
                                brand.description.toLowerCase().includes(searchTerm);
            const matchesPrice = priceFilter === 'all' || brand.price_range === priceFilter;
            return matchesSearch && matchesPrice;
        });

        const container = document.querySelector('.brands-grid');
        if (container) {
            container.innerHTML = filtered.map(brand => `
                <div class="brand-card">
                    <div class="brand-name">${brand.name}</div>
                    <div class="brand-description">${brand.description}</div>
                    <div class="brand-info">
                        <div class="brand-stat">
                            <span class="brand-stat-label">Sustainability</span>
                            <span class="brand-stat-value">${brand.sustainability_score}/100</span>
                        </div>
                        <div class="brand-stat">
                            <span class="brand-stat-label">Price Range</span>
                            <span class="brand-stat-value">${brand.price_range}</span>
                        </div>
                    </div>
                    <div class="brand-certifications">
                        ${brand.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    populateRepairGuides() {
        const issuesContainer = document.querySelector('.repair-issues');
        if (issuesContainer) {
            issuesContainer.innerHTML = FashionImpactCalculator.REPAIR_GUIDES
                .map(guide => `
                    <div class="issue-card">
                        <div class="issue-title">
                            <span class="issue-icon">${guide.icon}</span>
                            ${guide.issue}
                        </div>
                        <div class="issue-comparison">
                            <div class="repair-option">
                                <h4>🛍️ Buy New</h4>
                                <p>${guide.repairOption}</p>
                            </div>
                            <div class="repair-option">
                                <h4>♻️ Repair</h4>
                                <p>${guide.environOption}</p>
                                <p style="margin-top: 6px; color: var(--success-color); font-weight: 600;">
                                    💚 Impact Score: ${guide.envScore}/10
                                </p>
                            </div>
                        </div>
                    </div>
                `).join('');
        }

        const upcyclingContainer = document.querySelector('.upcycling-grid');
        if (upcyclingContainer) {
            upcyclingContainer.innerHTML = FashionImpactCalculator.UPCYCLING_IDEAS
                .map(idea => `
                    <div class="upcycling-card">
                        <div class="upcycling-icon">${idea.icon}</div>
                        <h3>${idea.item}</h3>
                        <p><strong>${idea.idea}</strong></p>
                        <p style="margin-top: 10px; font-size: 12px; color: var(--success-color);">
                            ✅ ${idea.impact}
                        </p>
                    </div>
                `).join('');
        }
    }

    // Modal Management
    openModal() {
        document.getElementById('addItemModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('addItemModal').classList.remove('active');
    }

    // LocalStorage Management
    saveWardrobe() {
        localStorage.setItem('fashionWardrobe', JSON.stringify(this.wardrobe));
    }

    loadWardrobe() {
        const saved = localStorage.getItem('fashionWardrobe');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FashionImpactCalculator();
});
