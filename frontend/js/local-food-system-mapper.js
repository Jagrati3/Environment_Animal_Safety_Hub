// Local Food System Mapper Application

class LocalFoodSystemMapper {
    constructor() {
        this.currentTab = 'dashboard';
        this.farmerMarkets = this.loadData('markets') || this.initializeMarkets();
        this.csaPrograms = this.loadData('csa') || this.initializeCSA();
        this.farms = this.loadData('farms') || this.initializeFarms();
        this.gardens = this.loadData('gardens') || [];
        this.foodWaste = this.loadData('waste') || [];
        this.restaurantRatings = this.loadData('restaurants') || this.initializeRestaurants();
        this.forumPosts = this.loadData('forum') || [];
        this.userImpact = this.loadData('impact') || { carbon: 0, water: 0, waste: 0 };
        this.initializeEventListeners();
        this.updateDashboard();
    }

    // Initialize Database - Farmers Markets
    initializeMarkets() {
        return [
            {
                id: 1,
                name: 'Downtown Farmers Market',
                day: 'Saturday',
                hours: '8am - 1pm',
                location: 'Main Street Park',
                distance: 0.5,
                vendors: 25,
                produce: ['vegetables', 'fruits', 'herbs', 'dairy', 'meat'],
                highlights: 'Organic certified, Live music'
            },
            {
                id: 2,
                name: 'Riverside Market',
                day: 'Wednesday',
                hours: '4pm - 8pm',
                location: 'Riverside Park',
                distance: 1.2,
                vendors: 18,
                produce: ['vegetables', 'fruits', 'baked goods', 'honey'],
                highlights: 'Evening market, Free parking'
            },
            {
                id: 3,
                name: 'Sunday Commons Market',
                day: 'Sunday',
                hours: '10am - 2pm',
                location: 'Commons Plaza',
                distance: 2.3,
                vendors: 32,
                produce: ['vegetables', 'fruits', 'dairy', 'meat', 'prepared foods'],
                highlights: 'Largest market, Kids activities'
            }
        ];
    }

    // CSA Programs Database
    initializeCSA() {
        return [
            {
                id: 1,
                name: 'Green Valley CSA',
                farm: 'Green Valley Farm',
                deliveryType: 'pickup',
                pickupLocation: 'Farm - 3 miles',
                price: '$22/week',
                produce: 'Mixed vegetables, seasonal fruits',
                season: 'Year-round',
                rating: 4.8,
                members: 145,
                share: 'Small',
                description: 'Certified organic, diverse vegetables'
            },
            {
                id: 2,
                name: 'Urban Harvest CSA',
                farm: 'Urban Harvest Urban Farm',
                deliveryType: 'delivery',
                pickupLocation: 'Home delivery within 5 miles',
                price: '$28/week',
                produce: 'Vegetables, herbs, microgreens',
                season: 'Year-round',
                rating: 4.6,
                members: 98,
                share: 'Medium',
                description: 'Delivered fresh Tuesday evenings'
            },
            {
                id: 3,
                name: 'Organic Premium CSA',
                farm: 'Hill Valley Organic',
                deliveryType: 'both',
                pickupLocation: 'Farm or home delivery',
                price: '$35/week',
                produce: 'Premium organic vegetables, fruits, eggs',
                season: 'Summer/Fall',
                rating: 4.9,
                members: 67,
                share: 'Large',
                description: 'Premium quality, award-winning farm'
            }
        ];
    }

    // Farms Database
    initializeFarms() {
        return [
            {
                id: 1,
                name: 'Sunny Acres Farm',
                type: 'vegetable',
                certified: 'organic',
                activities: ['upick', 'sales'],
                crops: 'Berries, stone fruits, vegetables',
                season: 'Year-round',
                hours: 'Daily 9am-5pm',
                rating: 4.7,
                description: 'Family farm with u-pick berry season'
            },
            {
                id: 2,
                name: 'Heritage Pastures Ranch',
                type: 'meat',
                certified: 'grass-fed',
                activities: ['tours', 'sales'],
                crops: 'Beef, poultry, pork',
                season: 'Year-round',
                hours: 'Wednesday-Saturday 10am-4pm',
                rating: 4.5,
                description: 'Sustainable livestock operation'
            },
            {
                id: 3,
                name: 'Orchard Hill Farm',
                type: 'fruit',
                certified: 'organic',
                activities: ['upick', 'tours', 'events'],
                crops: 'Apples, pears, cherries',
                season: 'Summer-Fall',
                hours: 'Varies by season',
                rating: 4.8,
                description: 'Historical orchard with agritourism'
            }
        ];
    }

    // Restaurant Database
    initializeRestaurants() {
        return [
            {
                id: 1,
                name: 'Farm to Table Kitchen',
                cuisine: 'farm-to-table',
                rating: 4.9,
                localSources: '85%',
                menu: 'Seasonal menu changes weekly',
                highlights: 'Chef-owned, local farmers partners',
                description: 'Award-winning farm to table restaurant'
            },
            {
                id: 2,
                name: 'Green Leaf Vegan',
                cuisine: 'vegan',
                rating: 4.7,
                localSources: '70%',
                menu: 'All plant-based, GMO-free',
                highlights: 'Organic certified kitchen',
                description: 'Plant-forward cuisine using local produce'
            },
            {
                id: 3,
                name: 'The Root Vegetable',
                cuisine: 'vegetarian',
                rating: 4.6,
                localSources: '75%',
                menu: 'Vegetarian with local dairy',
                highlights: 'Compostable packaging',
                description: 'Farm partnerships for daily vegetables'
            }
        ];
    }

    // Seasonal Produce Database
    static SEASONAL_PRODUCE = {
        spring: [
            {
                name: 'Asparagus',
                localImpact: 'Minimal miles, peak season',
                benefits: 'Rich in nutrients, supports spring appetites',
                carbonScore: 'Very Low'
            },
            {
                name: 'Lettuce',
                localImpact: 'Local greenhouses, fresh daily',
                benefits: 'Crisp spring salads, local varieties',
                carbonScore: 'Very Low'
            },
            {
                name: 'Spinach',
                localImpact: 'Peak season production',
                benefits: 'Iron-rich, supports energy',
                carbonScore: 'Very Low'
            },
            {
                name: 'Peas',
                localImpact: 'Brief season, local gardens',
                benefits: 'Sweet spring crop, nitrogen-fixing plant',
                carbonScore: 'Very Low'
            },
            {
                name: 'Artichokes',
                localImpact: 'Regional farms, sustainable',
                benefits: 'Fiber-rich, unique flavors',
                carbonScore: 'Low'
            },
            {
                name: 'Strawberries',
                localImpact: 'Early season, short shelf life drives local',
                benefits: 'Peak sweetness, antioxidants',
                carbonScore: 'Low'
            }
        ],
        summer: [
            {
                name: 'Tomatoes',
                localImpact: 'Abundant local production',
                benefits: 'Peak flavor season, lycopene rich',
                carbonScore: 'Very Low'
            },
            {
                name: 'Corn',
                localImpact: 'Fields throughout region',
                benefits: 'Sweet summer staple, quick growing',
                carbonScore: 'Very Low'
            },
            {
                name: 'Zucchini',
                localImpact: 'Prolific summer crop',
                benefits: 'Versatile, productive gardens',
                carbonScore: 'Very Low'
            },
            {
                name: 'Bell Peppers',
                localImpact: 'Late summer harvest',
                benefits: 'Full flavor at peak season',
                carbonScore: 'Low'
            },
            {
                name: 'Blueberries',
                localImpact: 'Regional orchards, brief season',
                benefits: 'Antioxidants, superfood',
                carbonScore: 'Low'
            },
            {
                name: 'Cucumbers',
                localImpact: 'Gardens and farms abundant',
                benefits: 'Refreshing, hydrating',
                carbonScore: 'Very Low'
            }
        ],
        fall: [
            {
                name: 'Apples',
                localImpact: 'Regional orchards at peak',
                benefits: 'Long storage, multiple local varieties',
                carbonScore: 'Low'
            },
            {
                name: 'Squash',
                localImpact: 'Abundant harvest, stores well',
                benefits: 'Nutritious, variety of types',
                carbonScore: 'Low'
            },
            {
                name: 'Carrots',
                localImpact: 'Root crops, storage crops',
                benefits: 'Beta-carotene rich, stores well',
                carbonScore: 'Low'
            },
            {
                name: 'Pumpkin',
                localImpact: 'Iconic fall crop, local farms',
                benefits: 'Vitamin A, spice season',
                carbonScore: 'Very Low'
            },
            {
                name: 'Kale',
                localImpact: 'Cold-hardy crop extends season',
                benefits: 'Superfood, cold improves sweetness',
                carbonScore: 'Very Low'
            },
            {
                name: 'Pears',
                localImpact: 'September-October peak',
                benefits: 'Creamy texture, local heritage varieties',
                carbonScore: 'Low'
            }
        ],
        winter: [
            {
                name: 'Cabbage',
                localImpact: 'Storage crops from fall harvest',
                benefits: 'Long-term storage, fermentation',
                carbonScore: 'Low'
            },
            {
                name: 'Root Vegetables',
                localImpact: 'Harvested and stored locally',
                benefits: 'Beets, parsnips, turnips variety',
                carbonScore: 'Low'
            },
            {
                name: 'Broccoli',
                localImpact: 'Late-season hardy crop',
                benefits: 'Sulforaphane, cold hardy',
                carbonScore: 'Low'
            },
            {
                name: 'Citrus',
                localImpact: 'Regional growing regions peak',
                benefits: 'Vitamin C, winter immune support',
                carbonScore: 'Medium'
            },
            {
                name: 'Pears Storage',
                localImpact: 'Cold-stored from fall harvest',
                benefits: 'Ripens in storage, less transport',
                carbonScore: 'Very Low'
            },
            {
                name: 'Potatoes Storage',
                localImpact: 'Root cellar storage, local',
                benefits: 'Staple crop, unlimited storage',
                carbonScore: 'Very Low'
            }
        ]
    };

    // Carbon Footprint Data
    static FOOD_CARBON_DATA = {
        'tomato': { local: 0.15, imported: 2.5 },
        'tomato-import': { local: 0.15, imported: 2.5 },
        'lettuce': { local: 0.18, imported: 2.8 },
        'lettuce-import': { local: 0.18, imported: 2.8 },
        'apple': { local: 0.25, imported: 1.8 },
        'apple-import': { local: 0.25, imported: 1.8 },
        'chicken': { local: 3.5, industrial: 4.2 },
        'chicken-industrial': { local: 3.5, industrial: 4.2 },
        'beef': { co2: 27.0 },
        'dairy': { co2: 2.8 },
        'bread': { local: 1.2, standard: 1.5 },
        'pasta': { co2: 1.8 },
        'coffee-import': { co2: 12.5 }
    };

    // Initialize Event Listeners
    initializeEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchMainTab(e.target.dataset.tab));
        });

        // Secondary Tabs
        document.querySelectorAll('.secondary-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchSecondaryTab(e.target));
        });

        // Season Buttons
        document.querySelectorAll('.season-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectSeason(e.target));
        });

        // Filters
        document.getElementById('marketSearch')?.addEventListener('input', () => this.filterMarkets());
        document.getElementById('dayFilter')?.addEventListener('change', () => this.filterMarkets());
        document.getElementById('gardenSearch')?.addEventListener('input', () => this.filterGardens());
        document.getElementById('forumSearch')?.addEventListener('input', () => this.filterForum());
        document.getElementById('restaurantSearch')?.addEventListener('input', () => this.filterRestaurants());

        // Modal Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    // Tab Management
    switchMainTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
        
        const tabEl = document.getElementById(`${tabName}Tab`);
        const btnEl = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (tabEl) tabEl.classList.add('active');
        if (btnEl) btnEl.classList.add('active');
        
        this.currentTab = tabName;

        if (tabName === 'farmers-markets') this.displayMarkets();
        if (tabName === 'csa-farms') this.displayCSA();
        if (tabName === 'food-network') this.displayGardens();
        if (tabName === 'seasonal') this.displaySeasonal();
        if (tabName === 'community') this.displayRestaurants();
    }

    switchSecondaryTab(tabBtn) {
        const parent = tabBtn.closest('.csa-container, .network-container, .seasonal-container, .community-container');
        if (!parent) return;

        parent.querySelectorAll('.secondary-tab').forEach(t => t.classList.remove('active'));
        parent.querySelectorAll('.secondary-content').forEach(c => c.classList.remove('active'));
        
        tabBtn.classList.add('active');
        const contentId = tabBtn.dataset.secondary + 'Content';
        document.getElementById(contentId)?.classList.add('active');
    }

    // Dashboard Update
    updateDashboard() {
        document.getElementById('marketCount').textContent = this.farmerMarkets.length;
        document.getElementById('csaCount').textContent = this.csaPrograms.length;
        document.getElementById('gardenCount').textContent = this.gardens.length;
        document.getElementById('wasteCount').textContent = this.foodWaste.length;

        document.getElementById('carbonSaved').textContent = this.userImpact.carbon.toFixed(0);
        document.getElementById('waterSaved').textContent = this.userImpact.water.toFixed(0);
        document.getElementById('wastePrevented').textContent = this.userImpact.waste.toFixed(1);
    }

    // Display Farmers Markets
    displayMarkets() {
        const container = document.getElementById('marketsList');
        container.innerHTML = this.farmerMarkets.map(market => `
            <div class="market-card">
                <div class="card-title">${market.name}</div>
                <div class="card-meta">
                    <div class="meta-item">
                        <span class="meta-label">📅 ${market.day}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">🕐 ${market.hours}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">📍 ${market.distance} mi</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">👥 ${market.vendors} vendors</span>
                    </div>
                </div>
                <div class="card-description">${market.highlights}</div>
                <div class="card-footer">
                    <div class="rating">⭐ Fresh Local Produce</div>
                    <button class="card-action" onclick="showMarketDetails(${market.id})">Learn More</button>
                </div>
            </div>
        `).join('');
    }

    filterMarkets() {
        const search = document.getElementById('marketSearch').value.toLowerCase();
        const day = document.getElementById('dayFilter').value;
        
        const filtered = this.farmerMarkets.filter(m => 
            m.name.toLowerCase().includes(search) && (!day || m.day === day)
        );
        
        const container = document.getElementById('marketsList');
        container.innerHTML = filtered.map(market => `
            <div class="market-card">
                <div class="card-title">${market.name}</div>
                <div class="card-meta">
                    <div class="meta-item"><span class="meta-label">📅 ${market.day}</span></div>
                    <div class="meta-item"><span class="meta-label">🕐 ${market.hours}</span></div>
                    <div class="meta-item"><span class="meta-label">📍 ${market.distance} mi</span></div>
                    <div class="meta-item"><span class="meta-label">👥 ${market.vendors} vendors</span></div>
                </div>
                <div class="card-description">${market.highlights}</div>
                <div class="card-footer">
                    <div class="rating">⭐ Fresh Local Produce</div>
                    <button class="card-action">Learn More</button>
                </div>
            </div>
        `).join('');
    }

    // Display CSA Programs
    displayCSA() {
        const container = document.getElementById('csaList');
        container.innerHTML = this.csaPrograms.map(csa => `
            <div class="csa-card">
                <div class="card-title">${csa.name}</div>
                <div class="card-meta">
                    <div class="meta-item">
                        <span class="meta-label">💚 ${csa.deliveryType}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">⭐ ${csa.rating}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">💰 ${csa.price}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">👥 ${csa.members}</span>
                    </div>
                </div>
                <div class="card-description">${csa.farm}</div>
                <div class="card-description">${csa.produce}</div>
                <div class="card-footer">
                    <button class="card-action">Subscribe Now</button>
                </div>
            </div>
        `).join('');

        const farmContainer = document.getElementById('farmsList');
        farmContainer.innerHTML = this.farms.map(farm => `
            <div class="farm-card">
                <div class="card-title">${farm.name}</div>
                <div class="card-meta">
                    <div class="meta-item"><span class="meta-label">🌾 ${farm.type}</span></div>
                    <div class="meta-item"><span class="meta-label">✓ ${farm.certified}</span></div>
                    <div class="meta-item"><span class="meta-label">⭐ ${farm.rating}</span></div>
                </div>
                <div class="card-description">${farm.crops}</div>
                <div class="card-description">🕐 ${farm.hours}</div>
                <div class="card-footer">
                    <button class="card-action">Visit Farm</button>
                </div>
            </div>
        `).join('');
    }

    // Display Gardens
    displayGardens() {
        const container = document.getElementById('gardenList');
        if (this.gardens.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No gardens listed yet. Be the first to share! 🌱</p></div>';
            return;
        }

        container.innerHTML = this.gardens.map(g => `
            <div class="listing-card">
                <div class="card-title">${g.produce}</div>
                <div class="card-meta">
                    <div class="meta-item"><span class="meta-label">📦 ${g.quantity}</span></div>
                    <div class="meta-item"><span class="meta-label">⏰ ${new Date(g.date).toLocaleDateString()}</span></div>
                </div>
                <div class="card-description">${g.pickup}</div>
                <div class="card-footer">
                    <button class="card-action">Request</button>
                </div>
            </div>
        `).join('');
    }

    filterGardens() {
        const search = document.getElementById('gardenSearch')?.value.toLowerCase() || '';
        const filtered = this.gardens.filter(g => g.produce.toLowerCase().includes(search));
        
        const container = document.getElementById('gardenList');
        container.innerHTML = filtered.length === 0 ? 
            '<div class="empty-state">No matching produce found</div>' :
            filtered.map(g => `
                <div class="listing-card">
                    <div class="card-title">${g.produce}</div>
                    <div class="card-meta">
                        <div class="meta-item"><span class="meta-label">📦 ${g.quantity}</span></div>
                    </div>
                    <div class="card-description">${g.pickup}</div>
                    <div class="card-footer">
                        <button class="card-action">Request</button>
                    </div>
                </div>
            `).join('');
    }

    // Seasonal Display
    displaySeasonal() {
        const season = 'summer'; // Default
        this.updateSeasonalDisplay(season);
    }

    updateSeasonalDisplay(season) {
        const produce = LocalFoodSystemMapper.SEASONAL_PRODUCE[season] || [];
        const container = document.getElementById('seasonalProduce');
        
        container.innerHTML = produce.map(p => `
            <div class="produce-card">
                <h3>${p.name}</h3>
                <div class="card-description">
                    <strong>${p.localImpact}</strong><br>
                    🌍 ${p.carbonScore} Carbon Impact
                </div>
                <div class="produce-benefits">✨ ${p.benefits}</div>
            </div>
        `).join('');
    }

    selectSeason(btn) {
        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateSeasonalDisplay(btn.dataset.season);
    }

    // Carbon Footprint Calculator
    calculateCarbonFootprint() {
        const item = document.getElementById('foodItem').value;
        const quantity = parseFloat(document.getElementById('quantity').value) || 1;

        if (!item) {
            alert('Please select a food item');
            return;
        }

        const data = LocalFoodSystemMapper.FOOD_CARBON_DATA[item];
        if (!data) return;

        const carbonLocal = (data.local || data.co2 || 0) * quantity;
        const carbonImported = (data.imported || 0) * quantity;

        const savings = carbonImported - carbonLocal;
        const percentage = carbonImported > 0 ? ((savings / carbonImported) * 100).toFixed(0) : 0;

        const resultsDiv = document.getElementById('carbonResults');
        resultsDiv.classList.add('active');
        resultsDiv.innerHTML = `
            <div class="comparison-row">
                <div class="comparison-item">
                    <span class="comparison-label">Local Source</span>
                    <span class="comparison-value">${carbonLocal.toFixed(2)} kg CO₂</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-label">Imported</span>
                    <span class="comparison-value">${carbonImported.toFixed(2)} kg CO₂</span>
                </div>
            </div>
            <div style="text-align: center; padding: 12px; background: var(--primary-light); border-radius: 6px; margin-top: 12px;">
                <strong>💚 Choosing local saves ${savings.toFixed(2)} kg CO₂ (${percentage}% reduction)</strong>
            </div>
        `;

        this.userImpact.carbon += savings;
        this.saveData('impact', this.userImpact);
        this.updateDashboard();
    }

    // Display Restaurants
    displayRestaurants() {
        const container = document.getElementById('restaurantsList');
        container.innerHTML = this.restaurantRatings.map(r => `
            <div class="restaurant-card">
                <div class="card-title">${r.name}</div>
                <div class="card-meta">
                    <div class="meta-item"><span class="meta-label">⭐ ${r.rating}</span></div>
                    <div class="meta-item"><span class="meta-label">🌱 ${r.localSources}</span></div>
                </div>
                <div class="card-description"><strong>${r.menu}</strong></div>
                <div class="card-description">${r.highlights}</div>
                <div class="card-footer">
                    <button class="card-action">Visit Website</button>
                </div>
            </div>
        `).join('');
    }

    filterRestaurants() {
        const search = document.getElementById('restaurantSearch')?.value.toLowerCase() || '';
        const filtered = this.restaurantRatings.filter(r => r.name.toLowerCase().includes(search));
        
        const container = document.getElementById('restaurantsList');
        container.innerHTML = filtered.map(r => `
            <div class="restaurant-card">
                <div class="card-title">${r.name}</div>
                <div class="card-meta">
                    <div class="meta-item"><span class="meta-label">⭐ ${r.rating}</span></div>
                    <div class="meta-item"><span class="meta-label">🌱 ${r.localSources}</span></div>
                </div>
                <button class="card-action">Learn More</button>
            </div>
        `).join('');
    }

    // Forum Management
    filterForum() {
        const search = document.getElementById('forumSearch')?.value.toLowerCase() || '';
        const filtered = this.forumPosts.filter(p => 
            p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search)
        );
        
        const container = document.getElementById('forumPosts');
        container.innerHTML = filtered.map(p => this.createForumPostHTML(p)).join('');
    }

    createForumPostHTML(post) {
        return `
            <div class="forum-post">
                <div class="post-header">
                    <div class="post-title">${post.title}</div>
                    <span class="post-category">${post.category}</span>
                </div>
                <div class="post-meta">
                    <span>By ${post.author}</span>
                    <span>•</span>
                    <span>${new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>${post.replies || 0} replies</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-footer">
                    <button class="post-btn">💬 Reply</button>
                    <button class="post-btn">❤️ Like</button>
                    <button class="post-btn">⚑ Report</button>
                </div>
            </div>
        `;
    }

    // Data Management
    saveData(key, data) {
        localStorage.setItem(`lfsm_${key}`, JSON.stringify(data));
    }

    loadData(key) {
        const data = localStorage.getItem(`lfsm_${key}`);
        return data ? JSON.parse(data) : null;
    }
}

// Global Functions
function switchTab(tabName) {
    const app = window.lfsmApp;
    app.switchMainTab(tabName);
}

function toggleGardenForm() {
    document.getElementById('gardenModal').classList.add('active');
}

function toggleForumPostForm() {
    document.getElementById('forumModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function addGarden(event) {
    event.preventDefault();
    const app = window.lfsmApp;
    
    const garden = {
        id: Date.now(),
        produce: document.getElementById('gardenProduce').value,
        quantity: document.getElementById('gardenQuantity').value,
        pickup: document.getElementById('gardenPickup').value,
        date: new Date().toISOString(),
        author: 'You'
    };

    app.gardens.push(garden);
    app.saveData('gardens', app.gardens);
    app.displayGardens();
    closeModal('gardenModal');
    document.getElementById('gardenForm').reset();
    alert('✅ Your produce is now listed!');
}

function addForumPost(event) {
    event.preventDefault();
    const app = window.lfsmApp;
    
    const post = {
        id: Date.now(),
        title: document.getElementById('forumTitle').value,
        category: document.getElementById('forumCategory').value,
        content: document.getElementById('forumContent').value,
        author: 'Community Member',
        date: new Date().toISOString(),
        replies: 0
    };

    app.forumPosts.push(post);
    app.saveData('forum', app.forumPosts);
    app.filterForum();
    closeModal('forumModal');
    document.getElementById('forumForm').reset();
    alert('✅ Your post has been shared!');
}

function calculateCarbonFootprint() {
    const app = window.lfsmApp;
    app.calculateCarbonFootprint();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.lfsmApp = new LocalFoodSystemMapper();
});
