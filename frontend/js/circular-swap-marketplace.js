/* ============================================
   CIRCULAR SWAP MARKETPLACE - JAVASCRIPT
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================

class SwapMarketplace {
  constructor() {
    this.items = this.loadData('swapItems', []);
    this.requests = this.loadData('swapRequests', []);
    this.history = this.loadData('swapHistory', []);
    this.userProfile = this.loadData('userProfile', this.getDefaultUserProfile());
    this.init();
  }

  getDefaultUserProfile() {
    return {
      id: this.generateId(),
      name: `User${Math.floor(Math.random() * 10000)}`,
      rating: 5.0,
      totalSwaps: 0,
      itemsReused: 0,
      wasteAvoided: 0,
      co2Saved: 0,
      location: 'San Francisco, CA'
    };
  }

  init() {
    this.setupEventListeners();
    this.populateLeaderboard();
    this.renderMarketplace();
    this.updateImpactBanner();
  }

  // ============================================
  // LOCALDB OPERATIONS
  // ============================================

  loadData(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error loading ${key}:`, e);
      return defaultValue;
    }
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key}:`, e);
    }
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab));
    });

    // Post item buttons
    document.getElementById('post-item-btn').addEventListener('click', () => this.openModal('post-item-modal'));
    document.getElementById('my-listings-post-btn').addEventListener('click', () => this.openModal('post-item-modal'));

    // Form submission
    document.getElementById('item-form').addEventListener('submit', (e) => this.handlePostItem(e));
    document.getElementById('request-form').addEventListener('submit', (e) => this.handleSendRequest(e));

    // Search and filters
    document.getElementById('search-input').addEventListener('input', (e) => this.handleSearch(e));
    document.getElementById('clear-search').addEventListener('click', () => this.clearSearch());
    document.getElementById('category-filter').addEventListener('change', () => this.renderMarketplace());
    document.getElementById('type-filter').addEventListener('change', () => this.renderMarketplace());
    document.getElementById('condition-filter').addEventListener('change', () => this.renderMarketplace());
    document.getElementById('sort-by').addEventListener('change', () => this.renderMarketplace());

    // Inbox and leaderboard filters
    document.getElementById('inbox-filter').addEventListener('change', () => this.renderInbox());
    document.getElementById('leaderboard-filter').addEventListener('change', () => this.populateLeaderboard());

    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-close');
        this.closeModal(modalId);
      });
    });

    // Modal background close
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });
  }

  // ============================================
  // TAB SWITCHING
  // ============================================

  switchTab(tabElement) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tabElement.classList.add('active');

    // Update active content
    const tabName = tabElement.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Special handling for tabs
    if (tabName === 'leaderboard') {
      this.populateLeaderboard();
    } else if (tabName === 'my-listings') {
      this.renderMyListings();
    } else if (tabName === 'inbox') {
      this.renderInbox();
    } else if (tabName === 'history') {
      this.renderHistory();
    }
  }

  // ============================================
  // MARKETPLACE RENDERING
  // ============================================

  renderMarketplace() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const type = document.getElementById('type-filter').value;
    const condition = document.getElementById('condition-filter').value;
    const sortBy = document.getElementById('sort-by').value;

    let filtered = this.items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
                           item.description.toLowerCase().includes(searchTerm);
      const matchesCategory = !category || item.category === category;
      const matchesType = !type || item.type === type || item.type === 'both';
      const matchesCondition = !condition || item.condition === condition;

      return matchesSearch && matchesCategory && matchesType && matchesCondition;
    });

    // Remove user's own items
    filtered = filtered.filter(item => item.userId !== this.userProfile.id);

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'most-requested':
          return (b.requests || 0) - (a.requests || 0);
        case 'newest':
        default:
          return b.createdAt - a.createdAt;
      }
    });

    this.renderItemsGrid(filtered, 'items-grid');
  }

  renderItemsGrid(items, gridId) {
    const grid = document.getElementById(gridId);

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="no-items">
          <i class="fas fa-inbox"></i>
          <p>${gridId === 'my-listings-grid' ? 
            "You haven't posted any items yet. Start by posting your first item!" :
            'No items match your search. Try adjusting filters or post your first item!'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => this.createItemCardHTML(item)).join('');

    // Add event listeners to cards
    document.querySelectorAll('.item-card').forEach(card => {
      const itemId = card.getAttribute('data-item-id');
      const item = this.items.find(i => i.id === itemId);

      card.addEventListener('click', () => this.openItemDetail(item));

      const swapBtn = card.querySelector('.btn-swap');
      const donateBtn = card.querySelector('.btn-donate');

      if (swapBtn) {
        swapBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openRequestModal(item);
        });
      }

      if (donateBtn) {
        donateBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openRequestModal(item);
        });
      }
    });
  }

  createItemCardHTML(item) {
    const user = this.getUserById(item.userId);
    const requests = this.requests.filter(r => r.itemId === item.id).length;

    let actionButtons = '';
    if (item.type === 'swap' || item.type === 'both') {
      actionButtons += `<button class="btn btn-primary btn-swap"><i class="fas fa-arrows-alt"></i> Swap</button>`;
    }
    if (item.type === 'donate' || item.type === 'both') {
      actionButtons += `<button class="btn btn-secondary btn-donate"><i class="fas fa-hand-holding-heart"></i> Request</button>`;
    }

    return `
      <div class="item-card" data-item-id="${item.id}">
        <div class="item-image">
          ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<i class="fas fa-image"></i>'}
          <div class="item-badges">
            <span class="badge-type ${item.type === 'donate' ? 'donate' : ''}">${item.type.toUpperCase()}</span>
            <span class="badge-condition">${item.condition}</span>
          </div>
        </div>
        <div class="item-content">
          <div class="item-category">${item.category}</div>
          <h3 class="item-title">${item.title}</h3>
          <p class="item-description">${item.description}</p>
          <div class="item-meta">
            <span><i class="fas fa-weight"></i> ${item.weight ? item.weight + ' kg' : 'N/A'}</span>
            <span class="item-requests"><i class="fas fa-comment"></i> ${requests} request${requests !== 1 ? 's' : ''}</span>
          </div>
          <div class="item-location">
            <i class="fas fa-map-marker-alt"></i> ${item.location}
          </div>
        </div>
        <div class="item-footer">
          ${actionButtons}
        </div>
      </div>
    `;
  }

  handleSearch(e) {
    const clearBtn = document.getElementById('clear-search');
    if (e.target.value) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
    this.renderMarketplace();
  }

  clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('clear-search').style.display = 'none';
    this.renderMarketplace();
  }

  // ============================================
  // POSTING ITEMS
  // ============================================

  handlePostItem(e) {
    e.preventDefault();

    const item = {
      id: this.generateId(),
      userId: this.userProfile.id,
      title: document.getElementById('item-title').value,
      category: document.getElementById('item-category').value,
      condition: document.getElementById('item-condition').value,
      description: document.getElementById('item-description').value,
      weight: parseFloat(document.getElementById('item-weight').value) || 0,
      type: document.querySelector('input[name="item-type"]:checked').value,
      location: document.getElementById('item-location').value,
      image: document.getElementById('item-image').value || null,
      createdAt: Date.now(),
      requests: 0
    };

    this.items.push(item);
    this.saveData('swapItems', this.items);

    this.showToast('Item posted successfully!');
    this.closeModal('post-item-modal');
    e.target.reset();
    this.renderMarketplace();
  }

  renderMyListings() {
    const myItems = this.items.filter(item => item.userId === this.userProfile.id);
    this.renderItemsGrid(myItems, 'my-listings-grid');

    // Add delete buttons to my listings
    document.querySelectorAll('#my-listings-grid .item-footer button').forEach(btn => {
      const card = btn.closest('.item-card');
      const itemId = card.getAttribute('data-item-id');

      if (btn.classList.contains('btn-swap') || btn.classList.contains('btn-donate')) {
        btn.remove();
      }
    });

    // Add delete button
    document.querySelectorAll('#my-listings-grid .item-footer').forEach(footer => {
      const card = footer.closest('.item-card');
      const itemId = card.getAttribute('data-item-id');
      footer.innerHTML = `
        <button class="btn btn-danger btn-delete"><i class="fas fa-trash"></i> Delete</button>
      `;
      footer.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        this.openConfirmModal('Delete Item', 'Are you sure you want to delete this item?', () => {
          this.deleteItem(itemId);
        });
      });
    });
  }

  deleteItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveData('swapItems', this.items);
    this.showToast('Item deleted successfully!');
    this.renderMyListings();
  }

  // ============================================
  // SWAP REQUESTS
  // ============================================

  openRequestModal(item) {
    const infoDiv = document.getElementById('interested-item-info');
    infoDiv.innerHTML = `
      <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md);">
        <strong>${item.title}</strong><br>
        <small style="color: var(--text-secondary);">${item.category} • ${item.condition}</small>
      </div>
    `;
    document.getElementById('request-form').setAttribute('data-item-id', item.id);
    this.openModal('request-modal');
  }

  handleSendRequest(e) {
    e.preventDefault();

    const itemId = document.getElementById('request-form').getAttribute('data-item-id');
    const item = this.items.find(i => i.id === itemId);

    const request = {
      id: this.generateId(),
      itemId: itemId,
      itemTitle: item.title,
      senderId: this.userProfile.id,
      senderName: this.userProfile.name,
      senderRating: this.userProfile.rating,
      recipientId: item.userId,
      message: document.getElementById('request-message').value,
      contact: document.getElementById('request-contact').value,
      status: 'pending',
      createdAt: Date.now()
    };

    this.requests.push(request);
    this.saveData('swapRequests', this.requests);

    // Increment request count for item
    const itemIndex = this.items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      this.items[itemIndex].requests = (this.items[itemIndex].requests || 0) + 1;
      this.saveData('swapItems', this.items);
    }

    this.showToast('Request sent successfully!');
    this.closeModal('request-modal');
    e.target.reset();
  }

  renderInbox() {
    const filterValue = document.getElementById('inbox-filter').value;

    let requests = this.requests.filter(req => req.recipientId === this.userProfile.id);

    if (filterValue) {
      requests = requests.filter(req => req.status === filterValue);
    }

    const inboxList = document.getElementById('inbox-list');

    if (requests.length === 0) {
      inboxList.innerHTML = `
        <div class="no-items">
          <i class="fas fa-inbox"></i>
          <p>No requests yet. Start swapping with community members!</p>
        </div>
      `;
      return;
    }

    inboxList.innerHTML = requests.map(req => `
      <div class="inbox-item ${req.status}" data-request-id="${req.id}">
        <div class="inbox-header">
          <div>
            <div class="inbox-from"><i class="fas fa-user"></i> ${req.senderName}</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">⭐ ${req.senderRating}</div>
          </div>
          <span class="inbox-status ${req.status}">${req.status.toUpperCase()}</span>
        </div>
        <div class="inbox-item-name">Item: <strong>${req.itemTitle}</strong></div>
        <div class="inbox-message">"${req.message}"</div>
        ${req.contact ? `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">📞 ${req.contact}</div>` : ''}
        <div class="inbox-actions">
          ${req.status === 'pending' ? `
            <button class="btn btn-primary btn-accept" data-request-id="${req.id}"><i class="fas fa-check"></i> Accept</button>
            <button class="btn btn-secondary btn-decline" data-request-id="${req.id}"><i class="fas fa-times"></i> Decline</button>
          ` : ''}
          <button class="btn btn-secondary btn-view" data-request-id="${req.id}"><i class="fas fa-eye"></i> View</button>
        </div>
      </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.btn-accept').forEach(btn => {
      btn.addEventListener('click', () => this.updateRequestStatus(btn.getAttribute('data-request-id'), 'accepted'));
    });

    document.querySelectorAll('.btn-decline').forEach(btn => {
      btn.addEventListener('click', () => this.updateRequestStatus(btn.getAttribute('data-request-id'), 'declined'));
    });

    document.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', () => this.openInboxDetail(btn.getAttribute('data-request-id')));
    });

    this.updateInboxBadge();
  }

  updateRequestStatus(requestId, status) {
    const requestIndex = this.requests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
      this.requests[requestIndex].status = status;
      this.saveData('swapRequests', this.requests);

      if (status === 'accepted') {
        this.showToast('Request accepted! 🎉');
      }

      this.renderInbox();
    }
  }

  openInboxDetail(requestId) {
    const request = this.requests.find(r => r.id === requestId);
    const item = this.items.find(i => i.id === request.itemId);
    const sender = this.getUserById(request.senderId);

    const detailContent = document.getElementById('inbox-detail-content');
    detailContent.innerHTML = `
      <div class="request-detail-item">
        <div class="request-detail-item-title">Item: ${request.itemTitle}</div>
        <small style="color: var(--text-secondary);">${item.category} • ${item.condition}</small>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <strong>From:</strong>
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.75rem;">
          <div class="user-avatar">${sender.name.charAt(0).toUpperCase()}</div>
          <div>
            <div><strong>${request.senderName}</strong></div>
            <div style="font-size: 0.9rem; color: var(--text-secondary);">⭐ ${request.senderRating}</div>
          </div>
        </div>
      </div>

      <div class="request-detail-message">
        <strong>Message:</strong><br>
        ${request.message}
      </div>

      ${request.contact ? `
        <div style="margin-bottom: 1.5rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
          <strong>Contact:</strong><br>
          📞 ${request.contact}
        </div>
      ` : ''}

      <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
        Sent: ${new Date(request.createdAt).toLocaleDateString()} at ${new Date(request.createdAt).toLocaleTimeString()}
      </div>

      <div class="request-detail-actions">
        ${request.status === 'pending' ? `
          <button class="btn btn-primary" onclick="swapApp.updateRequestStatus('${request.id}', 'accepted')"><i class="fas fa-check"></i> Accept</button>
          <button class="btn btn-secondary" onclick="swapApp.updateRequestStatus('${request.id}', 'declined')"><i class="fas fa-times"></i> Decline</button>
        ` : `
          <span style="text-align: center; color: var(--text-secondary);">Status: <strong>${request.status.toUpperCase()}</strong></span>
        `}
      </div>
    `;

    this.openModal('inbox-detail-modal');
  }

  updateInboxBadge() {
    const pendingCount = this.requests.filter(r => r.recipientId === this.userProfile.id && r.status === 'pending').length;
    const badge = document.getElementById('inbox-badge');

    if (pendingCount > 0) {
      badge.textContent = pendingCount;
      badge.style.display = 'inline';
    } else {
      badge.style.display = 'none';
    }
  }

  // ============================================
  // HISTORY & IMPACT
  // ============================================

  renderHistory() {
    const timeline = document.getElementById('history-timeline');

    if (this.history.length === 0) {
      timeline.innerHTML = `
        <div class="no-items">
          <i class="fas fa-history"></i>
          <p>Your swap history will appear here once you complete your first swap.</p>
        </div>
      `;
      return;
    }

    const sortedHistory = [...this.history].sort((a, b) => b.completedAt - a.completedAt);

    timeline.innerHTML = sortedHistory.map(h => `
      <div class="timeline-item">
        <div class="timeline-date">${new Date(h.completedAt).toLocaleDateString()}</div>
        <div class="timeline-title">
          <i class="fas fa-handshake"></i> ${h.type === 'swap' ? 'Swap Completed' : 'Donation Received'}
        </div>
        <div class="timeline-description">
          You ${h.type === 'swap' ? 'swapped with' : 'received from'} <strong>${h.partnerName}</strong>
        </div>
        <div class="timeline-items">
          <div class="timeline-item-detail">
            <strong>Item:</strong> ${h.itemTitle}
          </div>
          <div class="timeline-item-detail">
            <strong>Impact:</strong> ${h.co2Saved} kg CO₂
          </div>
        </div>
      </div>
    `).join('');

    this.updateHistoryStats();
  }

  updateHistoryStats() {
    const totalSwaps = this.history.length;
    const totalItems = this.history.length;
    const rating = this.userProfile.rating;

    document.getElementById('total-swaps').textContent = totalSwaps;
    document.getElementById('total-items-traded').textContent = totalItems;
    document.getElementById('user-rating').textContent = `${rating.toFixed(1)} ⭐`;
  }

  updateImpactBanner() {
    const totalReused = this.history.length;
    const totalWaste = this.history.reduce((sum, h) => sum + (h.weight || 0), 0);
    const totalCO2 = this.userProfile.co2Saved;

    document.getElementById('items-reused').textContent = totalReused;
    document.getElementById('waste-avoided').textContent = `${totalWaste.toFixed(1)} kg`;
    document.getElementById('co2-saved').textContent = `${totalCO2.toFixed(1)} kg`;
  }

  // ============================================
  // LEADERBOARD
  // ============================================

  populateLeaderboard() {
    const filterValue = document.getElementById('leaderboard-filter')?.value || 'reusers';
    let leaderboardData = this.generateLeaderboardData(filterValue);

    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = leaderboardData.map((user, index) => {
      const medals = ['🥇', '🥈', '🥉'];
      const medal = index < 3 ? medals[index] : (index + 1);

      return `
        <div class="leaderboard-row">
          <div class="rank-col medal">${medal}</div>
          <div class="name-col">
            <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="user-info">
              <div class="user-name">${user.name}</div>
              <div class="user-rating">⭐ ${user.rating}</div>
            </div>
          </div>
          <div class="stat-col">${user.swaps}</div>
          <div class="stat-col">${user.items}</div>
          <div class="stat-col">${user.co2} kg CO₂</div>
          <div class="rating-col">${user.rating}/5</div>
        </div>
      `;
    }).join('');
  }

  generateLeaderboardData(filterType) {
    // Generate mock leaderboard with user data included
    const baseData = [
      {
        name: this.userProfile.name,
        swaps: this.history.length,
        items: this.items.filter(i => i.userId === this.userProfile.id).length,
        co2: this.userProfile.co2Saved,
        rating: this.userProfile.rating
      },
      {
        name: 'EcoWarrior23',
        swaps: 24,
        items: 42,
        co2: 156.8,
        rating: 4.9
      },
      {
        name: 'GreenMind',
        swaps: 18,
        items: 35,
        co2: 128.5,
        rating: 5.0
      },
      {
        name: 'SustainableAlex',
        swaps: 16,
        items: 28,
        co2: 112.3,
        rating: 4.8
      },
      {
        name: 'ReuseMaster',
        swaps: 12,
        items: 22,
        co2: 87.6,
        rating: 4.7
      },
      {
        name: 'EcoFriendly99',
        swaps: 10,
        items: 18,
        co2: 76.4,
        rating: 4.6
      },
      {
        name: 'WasteWatcher',
        swaps: 8,
        items: 15,
        co2: 58.2,
        rating: 4.5
      },
      {
        name: 'CircularThinking',
        swaps: 6,
        items: 12,
        co2: 42.1,
        rating: 4.4
      }
    ];

    switch (filterType) {
      case 'donors':
        return baseData.sort((a, b) => b.items - a.items);
      case 'impact':
        return baseData.sort((a, b) => b.co2 - a.co2);
      case 'reusers':
      default:
        return baseData.sort((a, b) => b.swaps - a.swaps);
    }
  }

  // ============================================
  // MODAL MANAGEMENT
  // ============================================

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
  }

  // ============================================
  // ITEM DETAIL
  // ============================================

  openItemDetail(item) {
    const seller = this.getUserById(item.userId);
    const requests = this.requests.filter(r => r.itemId === item.id).length;

    const detailContent = document.getElementById('item-detail-content');
    detailContent.innerHTML = `
      <div class="item-detail-image">
        ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<i class="fas fa-image"></i>'}
      </div>

      <div class="item-detail-header">
        <div class="item-detail-title">${item.title}</div>
        <div class="item-detail-meta">
          <div class="detail-meta-item">
            <div class="detail-meta-label">Category</div>
            <div class="detail-meta-value">${item.category}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Condition</div>
            <div class="detail-meta-value">${item.condition}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Weight</div>
            <div class="detail-meta-value">${item.weight ? item.weight + ' kg' : 'N/A'}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Type</div>
            <div class="detail-meta-value">${item.type.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div class="item-detail-description">
        ${item.description}
      </div>

      <div class="item-detail-seller">
        <div class="seller-info">
          <div class="seller-avatar">${seller.name.charAt(0).toUpperCase()}</div>
          <div>
            <div class="seller-name">${seller.name}</div>
            <div class="seller-rating">⭐ ${seller.rating} • ${requests} swap request${requests !== 1 ? 's' : ''}</div>
            <div class="seller-contact"><i class="fas fa-map-marker-alt"></i> ${item.location}</div>
          </div>
        </div>
      </div>

      <div class="item-detail-actions">
        ${item.type === 'swap' || item.type === 'both' ? `
          <button class="btn btn-primary" onclick="swapApp.openRequestModal({id: '${item.id}', title: '${item.title.replace(/'/g, "\\'")}', category: '${item.category}', condition: '${item.condition}'})">
            <i class="fas fa-arrows-alt"></i> Send Swap Request
          </button>
        ` : ''}
        ${item.type === 'donate' || item.type === 'both' ? `
          <button class="btn btn-secondary" onclick="swapApp.openRequestModal({id: '${item.id}', title: '${item.title.replace(/'/g, "\\'")}', category: '${item.category}', condition: '${item.condition}'})">
            <i class="fas fa-hand-holding-heart"></i> Request Donation
          </button>
        ` : ''}
      </div>
    `;

    this.openModal('item-detail-modal');
  }

  // ============================================
  // CONFIRMATION MODAL
  // ============================================

  openConfirmModal(title, message, onConfirm) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;

    const confirmBtn = document.getElementById('confirm-btn');
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.addEventListener('click', () => {
      onConfirm();
      this.closeModal('confirm-modal');
    });

    this.openModal('confirm-modal');
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================

  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  getUserById(userId) {
    if (userId === this.userProfile.id) {
      return this.userProfile;
    }

    // Return a mock user for demo purposes
    const mockUsers = {
      'user1': { id: 'user1', name: 'EcoWarrior23', rating: 4.9 },
      'user2': { id: 'user2', name: 'GreenMind', rating: 5.0 },
      'user3': { id: 'user3', name: 'SustainableAlex', rating: 4.8 }
    };

    return mockUsers[userId] || { id: userId, name: userId, rating: 4.5 };
  }
}

// ============================================
// INITIALIZE APP
// ============================================

let swapApp;

document.addEventListener('DOMContentLoaded', () => {
  swapApp = new SwapMarketplace();

  // Add some sample data if empty for demo purposes
  if (swapApp.items.length === 0) {
    const sampleItems = [
      {
        id: 'sample1',
        userId: 'user1',
        title: 'Vintage Bookshelf',
        category: 'furniture',
        condition: 'like-new',
        description: 'Beautiful wooden bookshelf in excellent condition. Perfect for small spaces. No scratches or damage.',
        weight: 15,
        type: 'both',
        location: 'San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1890747885825-85f3b4af1a13?w=400',
        createdAt: Date.now() - 86400000 * 2,
        requests: 3
      },
      {
        id: 'sample2',
        userId: 'user2',
        title: 'Gaming Laptop',
        category: 'electronics',
        condition: 'good',
        description: 'Dell laptop with i7, 16GB RAM, and RTX 3060. Runs all games smoothly. Minor keyboard wear.',
        weight: 2.5,
        type: 'swap',
        location: 'Oakland, CA',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        createdAt: Date.now() - 86400000,
        requests: 5
      },
      {
        id: 'sample3',
        userId: 'user3',
        title: 'Winter Jacket Collection',
        category: 'clothing',
        condition: 'good',
        description: 'Mix of 3 winter jackets - North Face, Columbia, and Patagonia. All in good condition.',
        weight: 5,
        type: 'donate',
        location: 'Berkeley, CA',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400',
        createdAt: Date.now() - 86400000 * 3,
        requests: 2
      },
      {
        id: 'sample4',
        userId: 'user1',
        title: 'Coffee Table',
        category: 'furniture',
        condition: 'fair',
        description: 'Glass and wood coffee table. Some minor scratches on glass top but very sturdy.',
        weight: 20,
        type: 'both',
        location: 'San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
        createdAt: Date.now() - 86400000 * 5,
        requests: 1
      }
    ];

    swapApp.items = sampleItems;
    swapApp.saveData('swapItems', swapApp.items);
    swapApp.renderMarketplace();
  }
});
