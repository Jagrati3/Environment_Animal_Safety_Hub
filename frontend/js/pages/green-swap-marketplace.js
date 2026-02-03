// Storage Keys
const STORAGE_KEYS = {
  LISTINGS: "greenSwapListings",
  WISHLIST: "greenSwapWishlist",
  SWAPS: "greenSwapSwaps",
  MESSAGES: "greenSwapMessages",
  USER_PROFILE: "greenSwapUserProfile"
};

// Current User
let currentUser = {
  id: "user-1",
  name: "Anonymous",
  location: "Your City",
  bio: "",
  joinDate: "2026-01-01",
  rating: 0,
  reviews: 0,
  listings: 0,
  swaps: 0
};

// Demo Data
const demoListings = [
  {
    id: "item-1",
    name: "Heirloom Tomato Seeds",
    category: "Seeds",
    type: "Swap",
    condition: "New",
    description: "50+ organic heirloom tomato seeds. Multiple varieties including Cherokee Purple and Brandywine.",
    location: "Brooklyn, NY",
    coordinates: { lat: 40.6782, lng: -73.9442 },
    photos: [],
    userId: "user-2",
    userName: "Sarah Green",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    status: "active"
  },
  {
    id: "item-2",
    name: "Garden Trowel Set",
    category: "Tools",
    type: "Lend",
    condition: "Good",
    description: "High-quality stainless steel trowel set. Perfect for planting and transplanting.",
    location: "Queens, NY",
    coordinates: { lat: 40.7282, lng: -73.7949 },
    photos: [],
    userId: "user-3",
    userName: "Mike Torres",
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    status: "active"
  },
  {
    id: "item-3",
    name: "Compost Bin",
    category: "Composting",
    type: "Donate",
    condition: "Like New",
    description: "60-gallon tumbling compost bin. Used only one season. Great for small yards.",
    location: "Manhattan, NY",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    photos: [],
    userId: "user-4",
    userName: "Emma Wilson",
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    status: "active"
  }
];

// State
let currentListingId = null;
let currentRecipient = null;
let currentSwapStatus = "pending";
let uploadedPhotos = [];
let map = null;
let markers = [];

// DOM Elements
const elements = {
  // Buttons
  listItemBtn: document.getElementById("listItemBtn"),
  browseItemsBtn: document.getElementById("browseItemsBtn"),
  filterToggleBtn: document.getElementById("filterToggleBtn"),
  clearFiltersBtn: document.getElementById("clearFiltersBtn"),
  
  // Forms
  listItemForm: document.getElementById("listItemForm"),
  profileForm: document.getElementById("profileForm"),
  messageForm: document.getElementById("messageForm"),
  reportForm: document.getElementById("reportForm"),
  
  // Modals
  listItemModal: document.getElementById("listItemModal"),
  itemDetailsModal: document.getElementById("itemDetailsModal"),
  messageModal: document.getElementById("messageModal"),
  reportModal: document.getElementById("reportModal"),
  
  // Close buttons
  closeListModal: document.getElementById("closeListModal"),
  closeDetailsModal: document.getElementById("closeDetailsModal"),
  closeMessageModal: document.getElementById("closeMessageModal"),
  closeReportModal: document.getElementById("closeReportModal"),
  cancelListBtn: document.getElementById("cancelListBtn"),
  cancelMessageBtn: document.getElementById("cancelMessageBtn"),
  cancelReportBtn: document.getElementById("cancelReportBtn"),
  
  // Tabs
  tabBtns: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),
  swapTabBtns: document.querySelectorAll(".swap-tab-btn"),
  
  // Filters
  filtersPanel: document.getElementById("filtersPanel"),
  searchInput: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  typeFilter: document.getElementById("typeFilter"),
  conditionFilter: document.getElementById("conditionFilter"),
  radiusFilter: document.getElementById("radiusFilter"),
  
  // Content areas
  listingsGrid: document.getElementById("listingsGrid"),
  wishlistGrid: document.getElementById("wishlistGrid"),
  swapsList: document.getElementById("swapsList"),
  conversationsList: document.getElementById("conversationsList"),
  chatContainer: document.getElementById("chatContainer"),
  nearbyList: document.getElementById("nearbyList"),
  itemDetailsBody: document.getElementById("itemDetailsBody"),
  userListingsGrid: document.getElementById("userListingsGrid"),
  photoPreview: document.getElementById("photoPreview"),
  
  // Stats
  totalItems: document.getElementById("totalItems"),
  totalSwaps: document.getElementById("totalSwaps"),
  activeUsers: document.getElementById("activeUsers"),
  wishlistBadge: document.getElementById("wishlistBadge"),
  messagesBadge: document.getElementById("messagesBadge"),
  
  // Profile
  profileAvatar: document.getElementById("profileAvatar"),
  profileName: document.getElementById("profileName"),
  reputationStars: document.getElementById("reputationStars"),
  ratingText: document.getElementById("ratingText"),
  reviewsCount: document.getElementById("reviewsCount"),
  userListings: document.getElementById("userListings"),
  userSwaps: document.getElementById("userSwaps"),
  memberSince: document.getElementById("memberSince"),
  displayName: document.getElementById("displayName"),
  userLocation: document.getElementById("userLocation"),
  userBio: document.getElementById("userBio"),
  
  // Form inputs
  itemName: document.getElementById("itemName"),
  itemCategory: document.getElementById("itemCategory"),
  itemType: document.getElementById("itemType"),
  itemCondition: document.getElementById("itemCondition"),
  itemDescription: document.getElementById("itemDescription"),
  itemLocation: document.getElementById("itemLocation"),
  itemPhotos: document.getElementById("itemPhotos"),
  messageRecipient: document.getElementById("messageRecipient"),
  messageText: document.getElementById("messageText"),
  reportReason: document.getElementById("reportReason"),
  reportDetails: document.getElementById("reportDetails")
};

// Initialize
function init() {
  // Load demo data
  if (!getListings().length) {
    saveListings(demoListings);
  }
  
  // Load user profile
  loadUserProfile();
  
  // Event listeners
  setupEventListeners();
  
  // Render initial content
  updateStats();
  renderListings();
  renderProfile();
}

function setupEventListeners() {
  // Modal triggers
  elements.listItemBtn?.addEventListener("click", () => openModal("listItemModal"));
  elements.browseItemsBtn?.addEventListener("click", () => switchTab("browse"));
  
  // Modal closes
  elements.closeListModal?.addEventListener("click", () => closeModal("listItemModal"));
  elements.closeDetailsModal?.addEventListener("click", () => closeModal("itemDetailsModal"));
  elements.closeMessageModal?.addEventListener("click", () => closeModal("messageModal"));
  elements.closeReportModal?.addEventListener("click", () => closeModal("reportModal"));
  elements.cancelListBtn?.addEventListener("click", () => closeModal("listItemModal"));
  elements.cancelMessageBtn?.addEventListener("click", () => closeModal("messageModal"));
  elements.cancelReportBtn?.addEventListener("click", () => closeModal("reportModal"));
  
  // Click outside to close
  [elements.listItemModal, elements.itemDetailsModal, elements.messageModal, elements.reportModal].forEach(modal => {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });
  
  // Forms
  elements.listItemForm?.addEventListener("submit", handleListItem);
  elements.profileForm?.addEventListener("submit", handleProfileUpdate);
  elements.messageForm?.addEventListener("submit", handleSendMessage);
  elements.reportForm?.addEventListener("submit", handleReportSubmit);
  
  // Tabs
  elements.tabBtns.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
  
  // Swap tabs
  elements.swapTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.swapTabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentSwapStatus = btn.dataset.status;
      renderSwaps();
    });
  });
  
  // Filters
  elements.filterToggleBtn?.addEventListener("click", toggleFilters);
  elements.clearFiltersBtn?.addEventListener("click", clearFilters);
  elements.searchInput?.addEventListener("input", renderListings);
  elements.categoryFilter?.addEventListener("change", renderListings);
  elements.typeFilter?.addEventListener("change", renderListings);
  elements.conditionFilter?.addEventListener("change", renderListings);
  elements.radiusFilter?.addEventListener("change", renderListings);
  
  // Photo upload
  elements.itemPhotos?.addEventListener("change", handlePhotoUpload);
}

// Tab Navigation
function switchTab(tabName) {
  elements.tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  
  elements.tabContents.forEach(content => {
    content.classList.toggle("active", content.id === `${tabName}-tab`);
  });
  
  // Initialize map when map tab is opened
  if (tabName === "map" && !map) {
    setTimeout(initMap, 100);
  }
  
  // Render content for specific tabs
  if (tabName === "wishlist") renderWishlist();
  if (tabName === "swaps") renderSwaps();
  if (tabName === "messages") renderMessages();
  if (tabName === "profile") renderProfile();
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// Filters
function toggleFilters() {
  elements.filtersPanel?.classList.toggle("active");
}

function clearFilters() {
  if (elements.searchInput) elements.searchInput.value = "";
  if (elements.categoryFilter) elements.categoryFilter.value = "all";
  if (elements.typeFilter) elements.typeFilter.value = "all";
  if (elements.conditionFilter) elements.conditionFilter.value = "all";
  if (elements.radiusFilter) elements.radiusFilter.value = "all";
  renderListings();
}

// Photo Upload
function handlePhotoUpload(e) {
  const files = Array.from(e.target.files);
  
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      showToast(`${file.name} is too large. Maximum 5MB.`, "error");
      return;
    }
    
    if (uploadedPhotos.length >= 5) {
      showToast("Maximum 5 photos allowed", "error");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedPhotos.push(event.target.result);
      renderPhotoPreview();
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoPreview() {
  if (!elements.photoPreview) return;
  
  elements.photoPreview.innerHTML = uploadedPhotos.map((photo, index) => `
    <div class="preview-item">
      <img src="${photo}" alt="Preview ${index + 1}" />
      <button type="button" class="remove-photo" onclick="removePhoto(${index})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join("");
}

function removePhoto(index) {
  uploadedPhotos.splice(index, 1);
  renderPhotoPreview();
}

// List Item
function handleListItem(e) {
  e.preventDefault();
  
  const listing = {
    id: `item-${Date.now()}`,
    name: elements.itemName.value.trim(),
    category: elements.itemCategory.value,
    type: elements.itemType.value,
    condition: elements.itemCondition.value,
    description: elements.itemDescription.value.trim(),
    location: elements.itemLocation.value.trim(),
    coordinates: { lat: 40.7589 + (Math.random() - 0.5) * 0.1, lng: -73.9851 + (Math.random() - 0.5) * 0.1 },
    photos: uploadedPhotos,
    userId: currentUser.id,
    userName: currentUser.name,
    createdAt: Date.now(),
    status: "active"
  };
  
  const listings = getListings();
  listings.unshift(listing);
  saveListings(listings);
  
  // Update user stats
  currentUser.listings++;
  saveUserProfile();
  
  // Reset form
  elements.listItemForm.reset();
  uploadedPhotos = [];
  elements.photoPreview.innerHTML = "";
  
  closeModal("listItemModal");
  showToast("Item listed successfully!");
  
  updateStats();
  renderListings();
  renderProfile();
}

// Render Listings
function renderListings() {
  let listings = getListings().filter(l => l.status === "active");
  
  // Apply filters
  const search = elements.searchInput?.value.toLowerCase() || "";
  const category = elements.categoryFilter?.value || "all";
  const type = elements.typeFilter?.value || "all";
  const condition = elements.conditionFilter?.value || "all";
  
  if (search) {
    listings = listings.filter(l => 
      l.name.toLowerCase().includes(search) ||
      l.description.toLowerCase().includes(search) ||
      l.category.toLowerCase().includes(search)
    );
  }
  
  if (category !== "all") {
    listings = listings.filter(l => l.category === category);
  }
  
  if (type !== "all") {
    listings = listings.filter(l => l.type === type);
  }
  
  if (condition !== "all") {
    listings = listings.filter(l => l.condition === condition);
  }
  
  if (!elements.listingsGrid) return;
  
  if (listings.length === 0) {
    elements.listingsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-search"></i>
        <h3>No Items Found</h3>
        <p>Try adjusting your filters or be the first to list an item!</p>
      </div>
    `;
    return;
  }
  
  elements.listingsGrid.innerHTML = listings.map(listing => {
    const wishlist = getWishlist();
    const isInWishlist = wishlist.includes(listing.id);
    
    return `
      <div class="listing-card" onclick="viewListingDetails('${listing.id}')">
        <div class="listing-image">
          ${listing.photos && listing.photos.length > 0 
            ? `<img src="${listing.photos[0]}" alt="${listing.name}" />`
            : `<i class="fas fa-leaf"></i>`
          }
          <div class="listing-type-badge ${listing.type.toLowerCase()}">${listing.type}</div>
          <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${listing.id}')">
            <i class="fas fa-heart"></i>
          </button>
        </div>
        <div class="listing-content">
          <div class="listing-header">
            <h3>${listing.name}</h3>
            <span class="category-badge">${listing.category}</span>
          </div>
          <p class="listing-description">${listing.description}</p>
          <div class="listing-meta">
            <div class="meta-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${listing.location}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>${getTimeAgo(listing.createdAt)}</span>
            </div>
          </div>
          <div class="listing-footer">
            <div class="user-info">
              <div class="user-avatar">${listing.userName.charAt(0)}</div>
              <span class="user-name">${listing.userName}</span>
            </div>
            <span class="condition-badge">${listing.condition}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// View Listing Details
function viewListingDetails(id) {
  const listing = getListings().find(l => l.id === id);
  if (!listing) return;
  
  currentListingId = id;
  const wishlist = getWishlist();
  const isInWishlist = wishlist.includes(id);
  
  elements.itemDetailsBody.innerHTML = `
    <div class="item-details-header">
      <div class="item-gallery">
        <div class="main-image">
          ${listing.photos && listing.photos.length > 0 
            ? `<img src="${listing.photos[0]}" alt="${listing.name}" id="mainImage" />`
            : `<i class="fas fa-leaf"></i>`
          }
        </div>
        ${listing.photos && listing.photos.length > 1 ? `
          <div class="thumbnail-gallery">
            ${listing.photos.map((photo, index) => `
              <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${photo}', this)">
                <img src="${photo}" alt="Thumbnail ${index + 1}" />
              </div>
            `).join("")}
          </div>
        ` : ''}
      </div>
      
      <div class="item-info">
        <h2>${listing.name}</h2>
        <div class="item-badges">
          <span class="listing-type-badge ${listing.type.toLowerCase()}">${listing.type}</span>
          <span class="category-badge">${listing.category}</span>
          <span class="condition-badge">${listing.condition}</span>
        </div>
        
        <div class="item-details-meta">
          <div class="meta-item">
            <i class="fas fa-user"></i>
            <span><strong>Listed by:</strong> ${listing.userName}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span><strong>Location:</strong> ${listing.location}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span><strong>Posted:</strong> ${getTimeAgo(listing.createdAt)}</span>
          </div>
        </div>
        
        <div style="margin-top: 24px;">
          <h3 style="margin-bottom: 12px; color: var(--swap-primary);">Description</h3>
          <p style="line-height: 1.8; color: #6b7280;">${listing.description}</p>
        </div>
        
        <div class="details-actions">
          <button class="primary-btn" onclick="initiateSwap('${listing.id}')">
            <i class="fas fa-exchange-alt"></i> Request ${listing.type}
          </button>
          <button class="icon-btn" onclick="contactSeller('${listing.id}')">
            <i class="fas fa-envelope"></i> Message
          </button>
          <button class="icon-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist('${listing.id}')">
            <i class="fas fa-heart"></i> ${isInWishlist ? 'Saved' : 'Save'}
          </button>
          <button class="icon-btn report-btn" onclick="reportListing('${listing.id}')">
            <i class="fas fa-flag"></i> Report
          </button>
        </div>
      </div>
    </div>
  `;
  
  openModal("itemDetailsModal");
}

function changeMainImage(src, thumbnail) {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) mainImage.src = src;
  
  document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));
  thumbnail.classList.add("active");
}

// Wishlist
function toggleWishlist(id) {
  let wishlist = getWishlist();
  
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(itemId => itemId !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist!");
  }
  
  saveWishlist(wishlist);
  updateWishlistBadge();
  renderListings();
  renderWishlist();
}

function renderWishlist() {
  const wishlist = getWishlist();
  const listings = getListings().filter(l => wishlist.includes(l.id));
  
  if (!elements.wishlistGrid) return;
  
  if (listings.length === 0) {
    elements.wishlistGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-heart-broken"></i>
        <h3>Your Wishlist is Empty</h3>
        <p>Start saving items you're interested in!</p>
      </div>
    `;
    return;
  }
  
  elements.wishlistGrid.innerHTML = listings.map(listing => `
    <div class="listing-card" onclick="viewListingDetails('${listing.id}')">
      <div class="listing-image">
        ${listing.photos && listing.photos.length > 0 
          ? `<img src="${listing.photos[0]}" alt="${listing.name}" />`
          : `<i class="fas fa-leaf"></i>`
        }
        <div class="listing-type-badge ${listing.type.toLowerCase()}">${listing.type}</div>
        <button class="wishlist-btn active" onclick="event.stopPropagation(); toggleWishlist('${listing.id}')">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="listing-content">
        <div class="listing-header">
          <h3>${listing.name}</h3>
          <span class="category-badge">${listing.category}</span>
        </div>
        <p class="listing-description">${listing.description}</p>
        <div class="listing-meta">
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${listing.location}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-user"></i>
            <span>${listing.userName}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Swaps
function initiateSwap(listingId) {
  const listing = getListings().find(l => l.id === listingId);
  if (!listing) return;
  
  const swap = {
    id: `swap-${Date.now()}`,
    listingId: listingId,
    listingName: listing.name,
    listingPhoto: listing.photos[0] || "",
    requesterId: currentUser.id,
    requesterName: currentUser.name,
    ownerId: listing.userId,
    ownerName: listing.userName,
    type: listing.type,
    status: "pending",
    createdAt: Date.now()
  };
  
  const swaps = getSwaps();
  swaps.unshift(swap);
  saveSwaps(swaps);
  
  closeModal("itemDetailsModal");
  showToast(`${listing.type} request sent successfully!`);
  
  // Switch to swaps tab
  switchTab("swaps");
  renderSwaps();
}

function renderSwaps() {
  const swaps = getSwaps().filter(s => s.status === currentSwapStatus);
  
  if (!elements.swapsList) return;
  
  if (swaps.length === 0) {
    elements.swapsList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exchange-alt"></i>
        <h3>No ${currentSwapStatus.charAt(0).toUpperCase() + currentSwapStatus.slice(1)} Swaps</h3>
        <p>Your ${currentSwapStatus} swaps will appear here.</p>
      </div>
    `;
    return;
  }
  
  elements.swapsList.innerHTML = swaps.map(swap => `
    <div class="swap-card">
      <div class="swap-items">
        <div class="swap-item-preview">
          ${swap.listingPhoto 
            ? `<img src="${swap.listingPhoto}" alt="${swap.listingName}" />`
            : `<i class="fas fa-leaf"></i>`
          }
        </div>
      </div>
      
      <div class="swap-info">
        <h4>${swap.listingName}</h4>
        <p><i class="fas fa-user"></i> With: ${swap.ownerName}</p>
        <p><i class="fas fa-exchange-alt"></i> Type: ${swap.type}</p>
        <p><i class="fas fa-clock"></i> ${getTimeAgo(swap.createdAt)}</p>
      </div>
      
      <div class="swap-status ${swap.status}">${swap.status}</div>
    </div>
  `).join("");
}

// Messages
function contactSeller(listingId) {
  const listing = getListings().find(l => l.id === listingId);
  if (!listing) return;
  
  currentRecipient = {
    id: listing.userId,
    name: listing.userName,
    listingId: listingId,
    listingName: listing.name
  };
  
  elements.messageRecipient.textContent = listing.userName;
  closeModal("itemDetailsModal");
  openModal("messageModal");
}

function handleSendMessage(e) {
  e.preventDefault();
  
  const message = {
    id: `msg-${Date.now()}`,
    conversationId: `conv-${currentUser.id}-${currentRecipient.id}`,
    senderId: currentUser.id,
    senderName: currentUser.name,
    receiverId: currentRecipient.id,
    receiverName: currentRecipient.name,
    listingId: currentRecipient.listingId,
    listingName: currentRecipient.listingName,
    text: elements.messageText.value.trim(),
    timestamp: Date.now(),
    read: false
  };
  
  const messages = getMessages();
  messages.unshift(message);
  saveMessages(messages);
  
  elements.messageForm.reset();
  closeModal("messageModal");
  showToast("Message sent successfully!");
  
  updateMessagesBadge();
}

function renderMessages() {
  const messages = getMessages();
  const conversations = {};
  
  // Group messages by conversation
  messages.forEach(msg => {
    if (!conversations[msg.conversationId]) {
      conversations[msg.conversationId] = {
        id: msg.conversationId,
        otherUser: msg.senderId === currentUser.id ? msg.receiverName : msg.senderName,
        lastMessage: msg.text,
        timestamp: msg.timestamp,
        unread: !msg.read && msg.receiverId === currentUser.id,
        messages: []
      };
    }
    conversations[msg.conversationId].messages.push(msg);
  });
  
  const convArray = Object.values(conversations);
  
  if (!elements.conversationsList) return;
  
  if (convArray.length === 0) {
    elements.conversationsList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-comments"></i>
        <p>No messages yet</p>
      </div>
    `;
    return;
  }
  
  elements.conversationsList.innerHTML = convArray.map(conv => `
    <div class="conversation-item">
      <h4>${conv.otherUser}</h4>
      <p>${conv.lastMessage.substring(0, 40)}...</p>
      ${conv.unread ? '<span class="unread-badge"></span>' : ''}
    </div>
  `).join("");
}

// Report
function reportListing(listingId) {
  currentListingId = listingId;
  closeModal("itemDetailsModal");
  openModal("reportModal");
}

function handleReportSubmit(e) {
  e.preventDefault();
  
  // In a real app, this would send to backend
  showToast("Report submitted. Thank you for helping keep our community safe.");
  elements.reportForm.reset();
  closeModal("reportModal");
}

// Map
function initMap() {
  map = L.map("itemsMap").setView([40.7589, -73.9851], 11);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);
  
  updateMapMarkers();
}

function updateMapMarkers() {
  if (!map) return;
  
  // Clear existing markers
  markers.forEach(marker => marker.remove());
  markers = [];
  
  const listings = getListings().filter(l => l.status === "active");
  
  listings.forEach(listing => {
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: ${getTypeColor(listing.type)}; color: white; 
             width: 36px; height: 36px; border-radius: 50%; display: flex; 
             align-items: center; justify-content: center; font-size: 18px; 
             border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
             font-weight: 700;">
             ${getTypeIcon(listing.type)}
           </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
    
    const marker = L.marker([listing.coordinates.lat, listing.coordinates.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="padding: 12px; min-width: 220px;">
          <h4 style="margin: 0 0 8px 0; color: #16a34a;">${listing.name}</h4>
          <p style="margin: 4px 0; color: #6b7280; font-size: 0.9rem;">
            <strong>${listing.type}</strong> • ${listing.category}
          </p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 0.9rem;">
            <i class="fas fa-map-marker-alt"></i> ${listing.location}
          </p>
          <button onclick="viewListingDetails('${listing.id}')" 
                  style="margin-top: 12px; padding: 10px 16px; background: #16a34a; 
                  color: white; border: none; border-radius: 8px; cursor: pointer; 
                  font-weight: 600; width: 100%;">
            View Details
          </button>
        </div>
      `);
    
    markers.push(marker);
  });
  
  // Update nearby list
  renderNearbyList(listings);
}

function renderNearbyList(listings) {
  if (!elements.nearbyList) return;
  
  elements.nearbyList.innerHTML = listings.slice(0, 10).map(listing => `
    <div class="nearby-item" onclick="viewListingDetails('${listing.id}')">
      <h4>${listing.name}</h4>
      <p><i class="fas fa-map-marker-alt"></i> ${listing.location}</p>
    </div>
  `).join("");
}

// Profile
function loadUserProfile() {
  const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (saved) {
    currentUser = JSON.parse(saved);
  }
}

function saveUserProfile() {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(currentUser));
}

function handleProfileUpdate(e) {
  e.preventDefault();
  
  currentUser.name = elements.displayName.value.trim();
  currentUser.location = elements.userLocation.value.trim();
  currentUser.bio = elements.userBio.value.trim();
  
  saveUserProfile();
  renderProfile();
  showToast("Profile updated successfully!");
}

function renderProfile() {
  if (!elements.profileName) return;
  
  // Update profile display
  const initial = currentUser.name.charAt(0).toUpperCase();
  elements.profileAvatar.textContent = initial;
  elements.profileName.textContent = currentUser.name;
  
  // Reputation stars
  const rating = currentUser.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<i class="fas fa-star"></i>';
    } else if (i === fullStars && hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHTML += '<i class="far fa-star"></i>';
    }
  }
  
  elements.reputationStars.innerHTML = starsHTML;
  elements.ratingText.textContent = rating.toFixed(1);
  elements.reviewsCount.textContent = `(${currentUser.reviews || 0} reviews)`;
  
  // Stats
  const userListings = getListings().filter(l => l.userId === currentUser.id);
  const userSwaps = getSwaps().filter(s => s.requesterId === currentUser.id || s.ownerId === currentUser.id);
  
  elements.userListings.textContent = userListings.length;
  elements.userSwaps.textContent = userSwaps.filter(s => s.status === "completed").length;
  elements.memberSince.textContent = new Date(currentUser.joinDate).getFullYear();
  
  // Form fields
  elements.displayName.value = currentUser.name;
  elements.userLocation.value = currentUser.location;
  elements.userBio.value = currentUser.bio;
  
  // User listings
  if (elements.userListingsGrid) {
    if (userListings.length === 0) {
      elements.userListingsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <i class="fas fa-box-open"></i>
          <p>You haven't listed any items yet</p>
        </div>
      `;
    } else {
      elements.userListingsGrid.innerHTML = userListings.map(listing => `
        <div class="listing-card" onclick="viewListingDetails('${listing.id}')">
          <div class="listing-image">
            ${listing.photos && listing.photos.length > 0 
              ? `<img src="${listing.photos[0]}" alt="${listing.name}" />`
              : `<i class="fas fa-leaf"></i>`
            }
          </div>
          <div class="listing-content">
            <h3>${listing.name}</h3>
            <p class="listing-description">${listing.description}</p>
          </div>
        </div>
      `).join("");
    }
  }
}

// Stats
function updateStats() {
  const listings = getListings().filter(l => l.status === "active");
  const swaps = getSwaps().filter(s => s.status === "completed");
  const uniqueUsers = new Set(listings.map(l => l.userId));
  
  if (elements.totalItems) elements.totalItems.textContent = listings.length;
  if (elements.totalSwaps) elements.totalSwaps.textContent = swaps.length;
  if (elements.activeUsers) elements.activeUsers.textContent = uniqueUsers.size;
  
  updateWishlistBadge();
  updateMessagesBadge();
}

function updateWishlistBadge() {
  const wishlist = getWishlist();
  if (elements.wishlistBadge) {
    elements.wishlistBadge.textContent = wishlist.length;
  }
}

function updateMessagesBadge() {
  const messages = getMessages().filter(m => m.receiverId === currentUser.id && !m.read);
  if (elements.messagesBadge) {
    elements.messagesBadge.textContent = messages.length;
  }
}

// Storage Functions
function getListings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTINGS) || "[]");
  } catch {
    return [];
  }
}

function saveListings(listings) {
  localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST) || "[]");
  } catch {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
}

function getSwaps() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SWAPS) || "[]");
  } catch {
    return [];
  }
}

function saveSwaps(swaps) {
  localStorage.setItem(STORAGE_KEYS.SWAPS, JSON.stringify(swaps));
}

function getMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || "[]");
  } catch {
    return [];
  }
}

function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
}

// Utility Functions
function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}

function getTypeColor(type) {
  const colors = {
    Swap: "#16a34a",
    Lend: "#3b82f6",
    Donate: "#f59e0b"
  };
  return colors[type] || "#16a34a";
}

function getTypeIcon(type) {
  const icons = {
    Swap: "⇄",
    Lend: "⟳",
    Donate: "♥"
  };
  return icons[type] || "•";
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Make functions globally accessible
window.viewListingDetails = viewListingDetails;
window.toggleWishlist = toggleWishlist;
window.changeMainImage = changeMainImage;
window.initiateSwap = initiateSwap;
window.contactSeller = contactSeller;
window.reportListing = reportListing;
window.removePhoto = removePhoto;

// Initialize on load
document.addEventListener("DOMContentLoaded", init);
