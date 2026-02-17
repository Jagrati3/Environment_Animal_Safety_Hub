// ===========================
// Circular Closet Planner App
// ===========================

class CircularClosetPlanner {
    constructor() {
        this.wardrobeItems = [];
        this.outfits = [];
        this.swapEvents = [];
        this.currentFilter = 'all';
        this.currentSort = 'recent';
        this.currentView = 'grid';
        this.selectedColors = [];
        this.selectedOutfitItems = [];

        // Load data from localStorage
        this.loadData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderWardrobe();
        this.updateStats();
        this.initializeChallenges();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Add item button
        document.getElementById('addItemBtn').addEventListener('click', () => {
            this.openModal('addItemModal');
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal.id);
            });
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Add item form
        document.getElementById('submitAddItem').addEventListener('click', () => {
            this.addItem();
        });

        document.getElementById('cancelAddItem').addEventListener('click', () => {
            this.closeModal('addItemModal');
        });

        // Color selection
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.classList.toggle('selected');
            });
        });

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderWardrobe();
            });
        });

        // Sort select
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderWardrobe();
        });

        // View toggle
        document.getElementById('gridView').addEventListener('click', () => {
            this.switchView('grid');
        });

        document.getElementById('listView').addEventListener('click', () => {
            this.switchView('list');
        });

        // Quick actions
        document.getElementById('logOutfitBtn').addEventListener('click', () => {
            this.openLogOutfitModal();
        });

        document.getElementById('scheduleSwapBtn').addEventListener('click', () => {
            this.openModal('scheduleSwapModal');
        });

        document.getElementById('markRepairBtn').addEventListener('click', () => {
            this.showToast('Select an item from your wardrobe to mark for repair');
        });

        document.getElementById('viewChallengesBtn').addEventListener('click', () => {
            this.showChallenges();
        });

        // Log outfit modal
        document.getElementById('closeLogOutfitModal').addEventListener('click', () => {
            this.closeModal('logOutfitModal');
        });

        document.getElementById('cancelLogOutfit').addEventListener('click', () => {
            this.closeModal('logOutfitModal');
        });

        document.getElementById('submitLogOutfit').addEventListener('click', () => {
            this.logOutfit();
        });

        document.getElementById('outfitSearch').addEventListener('input', (e) => {
            this.filterSelectableItems(e.target.value);
        });

        // Schedule swap modal
        document.getElementById('cancelScheduleSwap').addEventListener('click', () => {
            this.closeModal('scheduleSwapModal');
        });

        document.getElementById('submitScheduleSwap').addEventListener('click', () => {
            this.scheduleSwapEvent();
        });

        // Nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                
                if (href === '#swaps') {
                    this.showSwapEvents();
                } else if (href === '#achievements') {
                    this.showChallenges();
                }
            });
        });
    }

    // Add Wardrobe Item
    addItem() {
        const name = document.getElementById('itemName').value.trim();
        const category = document.getElementById('itemCategory').value;
        const brand = document.getElementById('itemBrand').value.trim();
        const price = parseFloat(document.getElementById('itemPrice').value) || 0;
        const purchaseDate = document.getElementById('itemPurchaseDate').value;
        const notes = document.getElementById('itemNotes').value.trim();

        if (!name || !category) {
            this.showToast('Please fill in required fields');
            return;
        }

        // Get selected colors
        const selectedColors = Array.from(document.querySelectorAll('.color-btn.selected'))
            .map(btn => btn.dataset.color);

        const item = {
            id: Date.now(),
            name: name,
            category: category,
            brand: brand,
            price: price,
            purchaseDate: purchaseDate || new Date().toISOString().split('T')[0],
            colors: selectedColors,
            notes: notes,
            wearCount: 0,
            lastWorn: null,
            needsRepair: false,
            dateAdded: new Date().toISOString()
        };

        this.wardrobeItems.push(item);
        this.saveData();
        this.renderWardrobe();
        this.updateStats();
        this.closeModal('addItemModal');
        this.resetAddItemForm();
        this.showToast(`${name} added to your wardrobe!`);
    }

    resetAddItemForm() {
        document.getElementById('addItemForm').reset();
        document.querySelectorAll('.color-btn.selected').forEach(btn => {
            btn.classList.remove('selected');
        });
    }

    // Render Wardrobe
    renderWardrobe() {
        const container = document.getElementById('wardrobeGrid');
        const emptyState = document.getElementById('emptyState');

        let filteredItems = this.wardrobeItems;

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filteredItems = filteredItems.filter(item => item.category === this.currentFilter);
        }

        // Apply sorting
        filteredItems = this.sortItems(filteredItems);

        if (filteredItems.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyState.style.display = 'none';

        container.innerHTML = filteredItems.map(item => this.createItemCard(item)).join('');

        // Attach event listeners
        this.attachItemEventListeners();
    }

    sortItems(items) {
        const sorted = [...items];

        switch (this.currentSort) {
            case 'most-worn':
                return sorted.sort((a, b) => b.wearCount - a.wearCount);
            case 'least-worn':
                return sorted.sort((a, b) => a.wearCount - b.wearCount);
            case 'cost-per-wear':
                return sorted.sort((a, b) => {
                    const cpwA = a.wearCount > 0 ? a.price / a.wearCount : a.price;
                    const cpwB = b.wearCount > 0 ? b.price / b.wearCount : b.price;
                    return cpwA - cpwB;
                });
            case 'recent':
            default:
                return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
    }

    createItemCard(item) {
        const costPerWear = item.wearCount > 0 ? (item.price / item.wearCount).toFixed(2) : item.price.toFixed(2);
        const isListView = this.currentView === 'list';
        const icon = this.getCategoryIcon(item.category);

        return `
            <div class="wardrobe-item ${isListView ? 'list-view' : ''}" data-id="${item.id}">
                <div class="item-image-container">
                    <i class="fas ${icon} item-icon"></i>
                    ${item.needsRepair ? '<div class="item-badge needs-repair">Needs Repair</div>' : 
                      `<div class="item-badge">${item.wearCount} wears</div>`}
                    ${item.colors.length > 0 ? `
                        <div class="item-color-dots">
                            ${item.colors.slice(0, 3).map(color => `
                                <span class="color-dot" style="background: ${this.getColorHex(color)};"></span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="item-content">
                    <div class="item-header">
                        <div>
                            <div class="item-name">${item.name}</div>
                            <div class="item-category">${item.category}${item.brand ? ` • ${item.brand}` : ''}</div>
                        </div>
                    </div>
                    
                    <div class="item-stats">
                        <div class="item-stat">
                            <div class="item-stat-value">${item.wearCount}</div>
                            <div class="item-stat-label">Wears</div>
                        </div>
                        <div class="item-stat">
                            <div class="item-stat-value">$${costPerWear}</div>
                            <div class="item-stat-label">Cost/Wear</div>
                        </div>
                        ${item.lastWorn ? `
                            <div class="item-stat">
                                <div class="item-stat-value">${this.getDaysAgo(item.lastWorn)}</div>
                                <div class="item-stat-label">Days Ago</div>
                            </div>
                        ` : ''}
                    </div>

                    <div class="item-actions">
                        <button class="btn-icon btn-view-item" data-id="${item.id}" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-wear-item" data-id="${item.id}" title="Log Wear">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon btn-repair-item" data-id="${item.id}" title="Mark for Repair">
                            <i class="fas fa-wrench"></i>
                        </button>
                        <button class="btn-icon btn-delete-item" data-id="${item.id}" title="Remove Item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachItemEventListeners() {
        // View item
        document.querySelectorAll('.btn-view-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.id);
                this.viewItemDetails(itemId);
            });
        });

        // Log wear
        document.querySelectorAll('.btn-wear-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.id);
                this.logItemWear(itemId);
            });
        });

        // Mark for repair
        document.querySelectorAll('.btn-repair-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.id);
                this.toggleRepairStatus(itemId);
            });
        });

        // Delete item
        document.querySelectorAll('.btn-delete-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.id);
                this.deleteItem(itemId);
            });
        });

        // Click on card to view details
        document.querySelectorAll('.wardrobe-item').forEach(card => {
            card.addEventListener('click', () => {
                const itemId = parseInt(card.dataset.id);
                this.viewItemDetails(itemId);
            });
        });
    }

    getCategoryIcon(category) {
        const icons = {
            tops: 'fa-shirt',
            bottoms: 'fa-person-half-dress',
            dresses: 'fa-dress',
            outerwear: 'fa-vest',
            shoes: 'fa-shoe-prints',
            accessories: 'fa-hat-cowboy'
        };
        return icons[category] || 'fa-tshirt';
    }

    getColorHex(colorName) {
        const colors = {
            black: '#000000',
            white: '#ffffff',
            gray: '#6b7280',
            red: '#ef4444',
            pink: '#ec4899',
            purple: '#8b5cf6',
            blue: '#3b82f6',
            green: '#10b981',
            yellow: '#f59e0b',
            orange: '#f97316',
            brown: '#92400e',
            navy: '#1e3a8a'
        };
        return colors[colorName] || '#6b7280';
    }

    getDaysAgo(date) {
        const now = new Date();
        const lastWorn = new Date(date);
        const diffTime = Math.abs(now - lastWorn);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Item Actions
    logItemWear(itemId) {
        const item = this.wardrobeItems.find(i => i.id === itemId);
        if (!item) return;

        item.wearCount++;
        item.lastWorn = new Date().toISOString();

        this.saveData();
        this.renderWardrobe();
        this.updateStats();
        this.checkChallenges();
        this.showToast(`Wear logged for ${item.name}! 🎉`);
    }

    toggleRepairStatus(itemId) {
        const item = this.wardrobeItems.find(i => i.id === itemId);
        if (!item) return;

        item.needsRepair = !item.needsRepair;
        this.saveData();
        this.renderWardrobe();
        this.updateStats();

        const status = item.needsRepair ? 'marked for repair' : 'repair completed';
        this.showToast(`${item.name} ${status}`);
    }

    deleteItem(itemId) {
        const item = this.wardrobeItems.find(i => i.id === itemId);
        if (!item) return;

        if (confirm(`Are you sure you want to remove "${item.name}" from your wardrobe?`)) {
            this.wardrobeItems = this.wardrobeItems.filter(i => i.id !== itemId);
            this.saveData();
            this.renderWardrobe();
            this.updateStats();
            this.showToast(`${item.name} removed from wardrobe`);
        }
    }

    viewItemDetails(itemId) {
        const item = this.wardrobeItems.find(i => i.id === itemId);
        if (!item) return;

        const modal = document.getElementById('itemDetailsModal');
        const modalName = document.getElementById('itemDetailsName');
        const modalContent = document.getElementById('itemDetailsContent');

        modalName.textContent = item.name;

        const costPerWear = item.wearCount > 0 ? (item.price / item.wearCount).toFixed(2) : item.price.toFixed(2);
        const purchaseDate = new Date(item.purchaseDate).toLocaleDateString();
        const outfitsWithItem = this.outfits.filter(outfit => outfit.items.includes(itemId)).length;

        modalContent.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem;">Category</strong>
                        <p style="font-size: 1.125rem; margin-top: 0.25rem; text-transform: capitalize;">${item.category}</p>
                    </div>
                    ${item.brand ? `
                        <div>
                            <strong style="color: var(--text-secondary); font-size: 0.875rem;">Brand</strong>
                            <p style="font-size: 1.125rem; margin-top: 0.25rem;">${item.brand}</p>
                        </div>
                    ` : ''}
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem;">Purchase Date</strong>
                        <p style="font-size: 1.125rem; margin-top: 0.25rem;">${purchaseDate}</p>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem;">Purchase Price</strong>
                        <p style="font-size: 1.125rem; margin-top: 0.25rem;">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--primary-color);">${item.wearCount}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">Total Wears</div>
                </div>
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--success-color);">$${costPerWear}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">Cost Per Wear</div>
                </div>
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--secondary-color);">${outfitsWithItem}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">Outfits</div>
                </div>
            </div>

            ${item.colors.length > 0 ? `
                <div style="margin-bottom: 2rem;">
                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">Colors</strong>
                    <div style="display: flex; gap: 0.75rem; margin-top: 0.75rem;">
                        ${item.colors.map(color => `
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: ${this.getColorHex(color)}; border: 3px solid var(--border-color);"></div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${item.lastWorn ? `
                <div style="margin-bottom: 2rem;">
                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">Last Worn</strong>
                    <p style="margin-top: 0.5rem;">${new Date(item.lastWorn).toLocaleDateString()} (${this.getDaysAgo(item.lastWorn)} days ago)</p>
                </div>
            ` : ''}

            ${item.notes ? `
                <div style="margin-bottom: 2rem;">
                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">Notes</strong>
                    <p style="margin-top: 0.5rem;">${item.notes}</p>
                </div>
            ` : ''}

            ${item.needsRepair ? `
                <div style="background: #fee2e2; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border-left: 4px solid #ef4444;">
                    <strong style="color: #dc2626;">⚠️ This item needs repair</strong>
                </div>
            ` : ''}

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" onclick="app.logItemWear(${item.id}); app.closeModal('itemDetailsModal');" style="flex: 1;">
                    <i class="fas fa-check"></i> Log Wear
                </button>
                <button class="btn-secondary" onclick="app.toggleRepairStatus(${item.id}); app.closeModal('itemDetailsModal');" style="flex: 1;">
                    <i class="fas fa-wrench"></i> ${item.needsRepair ? 'Mark Repaired' : 'Mark for Repair'}
                </button>
            </div>
        `;

        this.openModal('itemDetailsModal');
    }

    // Log Outfit
    openLogOutfitModal() {
        if (this.wardrobeItems.length === 0) {
            this.showToast('Add some items to your wardrobe first!');
            return;
        }

        this.selectedOutfitItems = [];
        this.renderSelectableItems();
        this.updateSelectedItems();
        this.openModal('logOutfitModal');
    }

    renderSelectableItems(searchTerm = '') {
        const container = document.getElementById('selectableItems');
        
        let items = this.wardrobeItems;
        if (searchTerm) {
            items = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        container.innerHTML = items.map(item => `
            <div class="selectable-item ${this.selectedOutfitItems.includes(item.id) ? 'selected' : ''}" 
                 data-id="${item.id}">
                <i class="fas ${this.getCategoryIcon(item.category)}"></i>
                <div class="selectable-item-name">${item.name}</div>
            </div>
        `).join('');

        // Attach click listeners
        container.querySelectorAll('.selectable-item').forEach(el => {
            el.addEventListener('click', () => {
                const itemId = parseInt(el.dataset.id);
                this.toggleOutfitItem(itemId);
            });
        });
    }

    filterSelectableItems(searchTerm) {
        this.renderSelectableItems(searchTerm);
    }

    toggleOutfitItem(itemId) {
        const index = this.selectedOutfitItems.indexOf(itemId);
        
        if (index > -1) {
            this.selectedOutfitItems.splice(index, 1);
        } else {
            this.selectedOutfitItems.push(itemId);
        }

        this.renderSelectableItems(document.getElementById('outfitSearch').value);
        this.updateSelectedItems();
    }

    updateSelectedItems() {
        const container = document.getElementById('selectedItems');
        
        if (this.selectedOutfitItems.length === 0) {
            container.innerHTML = '<p class="helper-text">Select items from your wardrobe to create an outfit</p>';
            return;
        }

        container.innerHTML = this.selectedOutfitItems.map(itemId => {
            const item = this.wardrobeItems.find(i => i.id === itemId);
            if (!item) return '';

            return `
                <div class="selected-item-chip">
                    <i class="fas ${this.getCategoryIcon(item.category)}"></i>
                    ${item.name}
                    <button onclick="app.toggleOutfitItem(${itemId})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    logOutfit() {
        if (this.selectedOutfitItems.length === 0) {
            this.showToast('Please select at least one item');
            return;
        }

        const occasion = document.getElementById('outfitOccasion').value;
        const notes = document.getElementById('outfitNotes').value.trim();

        const outfit = {
            id: Date.now(),
            items: [...this.selectedOutfitItems],
            occasion: occasion,
            notes: notes,
            date: new Date().toISOString()
        };

        this.outfits.push(outfit);

        // Update wear counts for all items in outfit
        this.selectedOutfitItems.forEach(itemId => {
            this.logItemWear(itemId);
        });

        this.saveData();
        this.closeModal('logOutfitModal');
        this.showToast(`Outfit logged with ${this.selectedOutfitItems.length} items! 👗`);

        // Reset
        this.selectedOutfitItems = [];
        document.getElementById('outfitSearch').value = '';
        document.getElementById('outfitNotes').value = '';
    }

    // Swap Events
    scheduleSwapEvent() {
        const name = document.getElementById('swapEventName').value.trim();
        const date = document.getElementById('swapEventDate').value;
        const time = document.getElementById('swapEventTime').value;
        const location = document.getElementById('swapEventLocation').value.trim();
        const items = document.getElementById('swapEventItems').value.trim();

        if (!name || !date || !time) {
            this.showToast('Please fill in required fields');
            return;
        }

        const event = {
            id: Date.now(),
            name: name,
            date: date,
            time: time,
            location: location,
            items: items,
            created: new Date().toISOString()
        };

        this.swapEvents.push(event);
        this.saveData();
        this.closeModal('scheduleSwapModal');
        document.getElementById('scheduleSwapForm').reset();
        this.showToast(`Swap event "${name}" scheduled! 📅`);
    }

    showSwapEvents() {
        const modal = document.getElementById('swapEventsModal');
        const container = document.getElementById('eventsList');

        const upcomingEvents = this.swapEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= new Date();
        }).sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcomingEvents.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-calendar" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No upcoming swap events</p>
                </div>
            `;
        } else {
            container.innerHTML = upcomingEvents.map(event => `
                <div class="event-card">
                    <div class="event-header">
                        <div class="event-name">${event.name}</div>
                        <button class="btn-icon" onclick="app.deleteSwapEvent(${event.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="event-date">
                        <i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()} at ${event.time}
                    </div>
                    ${event.location ? `
                        <div class="event-details">
                            <i class="fas fa-location-dot"></i> ${event.location}
                        </div>
                    ` : ''}
                    ${event.items ? `
                        <div class="event-details" style="margin-top: 0.5rem;">
                            <strong>Items to bring:</strong><br>${event.items}
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }

        this.openModal('swapEventsModal');
    }

    deleteSwapEvent(eventId) {
        if (confirm('Delete this swap event?')) {
            this.swapEvents = this.swapEvents.filter(e => e.id !== eventId);
            this.saveData();
            this.showSwapEvents();
            this.showToast('Event deleted');
        }
    }

    // Challenges & Achievements
    initializeChallenges() {
        this.challenges = [
            {
                id: 1,
                title: '30-Day Re-Wear Challenge',
                description: 'Wear items from your existing wardrobe for 30 consecutive days without buying new clothes',
                target: 30,
                reward: '🏆 Sustainable Style Master',
                type: 'streak'
            },
            {
                id: 2,
                title: 'Cost Per Wear Champion',
                description: 'Get 5 items to under $5 cost per wear',
                target: 5,
                reward: '💰 Thrifty Fashionista',
                type: 'cost-per-wear'
            },
            {
                id: 3,
                title: 'Outfit Master',
                description: 'Log 50 different outfits',
                target: 50,
                reward: '👗 Style Curator',
                type: 'outfits'
            },
            {
                id: 4,
                title: 'Repair Hero',
                description: 'Mark and repair 10 items instead of replacing them',
                target: 10,
                reward: '🔧 Repair Champion',
                type: 'repairs'
            },
            {
                id: 5,
                title: 'Swap Enthusiast',
                description: 'Participate in 5 clothing swap events',
                target: 5,
                reward: '🔄 Circular Economy Hero',
                type: 'swaps'
            }
        ];

        this.achievements = [
            { id: 1, name: 'First Steps', description: 'Add your first item', icon: '👕', unlocked: this.wardrobeItems.length > 0 },
            { id: 2, name: 'Wardrobe Builder', description: 'Add 10 items', icon: '🏗️', unlocked: this.wardrobeItems.length >= 10 },
            { id: 3, name: 'Fashion Forward', description: 'Log your first outfit', icon: '📸', unlocked: this.outfits.length > 0 },
            { id: 4, name: 'Repair Pro', description: 'Mark an item for repair', icon: '🔧', unlocked: this.wardrobeItems.some(i => i.needsRepair) },
            { id: 5, name: 'Swap Starter', description: 'Schedule your first swap event', icon: '🔄', unlocked: this.swapEvents.length > 0 },
            { id: 6, name: 'Cost Conscious', description: 'Track cost per wear', icon: '💵', unlocked: this.wardrobeItems.some(i => i.wearCount > 0 && i.price > 0) }
        ];
    }

    checkChallenges() {
        // Update achievements based on current state
        this.achievements[0].unlocked = this.wardrobeItems.length > 0;
        this.achievements[1].unlocked = this.wardrobeItems.length >= 10;
        this.achievements[2].unlocked = this.outfits.length > 0;
        this.achievements[3].unlocked = this.wardrobeItems.some(i => i.needsRepair);
        this.achievements[4].unlocked = this.swapEvents.length > 0;
        this.achievements[5].unlocked = this.wardrobeItems.some(i => i.wearCount > 0 && i.price > 0);
    }

    showChallenges() {
        const modal = document.getElementById('challengesModal');
        const challengesContainer = document.getElementById('challengesContainer');
        const achievementsGrid = document.getElementById('achievementsGrid');

        // Update challenges status
        this.checkChallenges();

        // Render challenges
        challengesContainer.innerHTML = this.challenges.map(challenge => {
            let progress = 0;
            let progressText = '';

            switch (challenge.type) {
                case 'streak':
                    progress = this.calculateStreak();
                    progressText = `${progress} / ${challenge.target} days`;
                    break;
                case 'cost-per-wear':
                    const lowCostItems = this.wardrobeItems.filter(i => 
                        i.wearCount > 0 && (i.price / i.wearCount) < 5
                    ).length;
                    progress = lowCostItems;
                    progressText = `${progress} / ${challenge.target} items`;
                    break;
                case 'outfits':
                    progress = this.outfits.length;
                    progressText = `${progress} / ${challenge.target} outfits`;
                    break;
                case 'repairs':
                    const repairedCount = this.wardrobeItems.filter(i => i.needsRepair).length;
                    progress = repairedCount;
                    progressText = `${progress} / ${challenge.target} items`;
                    break;
                case 'swaps':
                    progress = this.swapEvents.length;
                    progressText = `${progress} / ${challenge.target} events`;
                    break;
            }

            const progressPercent = Math.min((progress / challenge.target) * 100, 100);

            return `
                <div class="challenge-card">
                    <div class="challenge-header">
                        <div class="challenge-title">${challenge.title}</div>
                        <div class="challenge-reward">${challenge.reward}</div>
                    </div>
                    <div class="challenge-description">${challenge.description}</div>
                    <div class="challenge-progress">
                        <div class="progress-text">${progressText}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Render achievements
        achievementsGrid.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : ''}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `).join('');

        this.openModal('challengesModal');
    }

    // Update Stats
    updateStats() {
        // Total items
        document.getElementById('totalItems').textContent = this.wardrobeItems.length;

        // Total wears
        const totalWears = this.wardrobeItems.reduce((sum, item) => sum + item.wearCount, 0);
        document.getElementById('totalWears').textContent = totalWears;

        // Average cost per wear
        const itemsWithWears = this.wardrobeItems.filter(i => i.wearCount > 0 && i.price > 0);
        let avgCostPerWear = 0;
        if (itemsWithWears.length > 0) {
            const totalCostPerWear = itemsWithWears.reduce((sum, item) => 
                sum + (item.price / item.wearCount), 0
            );
            avgCostPerWear = totalCostPerWear / itemsWithWears.length;
        }
        document.getElementById('avgCostPerWear').textContent = `$${avgCostPerWear.toFixed(2)}`;

        // Items needing repair
        const needsRepair = this.wardrobeItems.filter(i => i.needsRepair).length;
        document.getElementById('needsRepair').textContent = needsRepair;

        // Streak
        const streak = this.calculateStreak();
        document.getElementById('streakCount').textContent = streak;
    }

    calculateStreak() {
        if (this.outfits.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = 0;
        let currentDate = new Date(today);

        while (true) {
            const hasOutfitOnDate = this.outfits.some(outfit => {
                const outfitDate = new Date(outfit.date);
                outfitDate.setHours(0, 0, 0, 0);
                return outfitDate.getTime() === currentDate.getTime();
            });

            if (hasOutfitOnDate) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    // View Management
    switchView(view) {
        this.currentView = view;
        
        document.getElementById('gridView').classList.toggle('active', view === 'grid');
        document.getElementById('listView').classList.toggle('active', view === 'list');

        const grid = document.getElementById('wardrobeGrid');
        grid.classList.toggle('list-view', view === 'list');

        this.renderWardrobe();
    }

    // Modal Management
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Toast Notification
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Data Persistence
    saveData() {
        localStorage.setItem('circularClosetWardrobe', JSON.stringify(this.wardrobeItems));
        localStorage.setItem('circularClosetOutfits', JSON.stringify(this.outfits));
        localStorage.setItem('circularClosetSwapEvents', JSON.stringify(this.swapEvents));
    }

    loadData() {
        const wardrobeData = localStorage.getItem('circularClosetWardrobe');
        const outfitsData = localStorage.getItem('circularClosetOutfits');
        const swapEventsData = localStorage.getItem('circularClosetSwapEvents');

        this.wardrobeItems = wardrobeData ? JSON.parse(wardrobeData) : [];
        this.outfits = outfitsData ? JSON.parse(outfitsData) : [];
        this.swapEvents = swapEventsData ? JSON.parse(swapEventsData) : [];
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CircularClosetPlanner();
});
