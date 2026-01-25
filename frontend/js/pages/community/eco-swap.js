// ===================================
// ECO-SWAP MARKETPLACE JAVASCRIPT
// ===================================

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ===================================
// SAMPLE DATA
// ===================================

const sampleItems = [
    {
        id: 1,
        title: "Vintage Leather Jacket",
        description: "Classic brown leather jacket in excellent condition. Size M. Perfect for winter.",
        category: "clothing",
        type: "sell",
        price: 2500,
        condition: "like-new",
        location: "Mumbai, Maharashtra",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
        user: { name: "Rahul Sharma", avatar: "R" },
        postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 2,
        title: "Harry Potter Complete Book Set",
        description: "All 7 books in great condition. Hardcover editions. Perfect for collectors!",
        category: "books",
        type: "swap",
        price: 0,
        condition: "good",
        location: "Delhi, NCR",
        images: ["https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=500"],
        user: { name: "Priya Patel", avatar: "P" },
        postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 3,
        title: "Wireless Bluetooth Headphones",
        description: "Sony WH-1000XM4. Barely used, comes with original box and accessories.",
        category: "electronics",
        type: "sell",
        price: 15000,
        condition: "like-new",
        location: "Bangalore, Karnataka",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
        user: { name: "Amit Kumar", avatar: "A" },
        postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 4,
        title: "Indoor Plant Collection",
        description: "5 healthy indoor plants with pots. Great for home decoration and air purification.",
        category: "home-garden",
        type: "free",
        price: 0,
        condition: "good",
        location: "Pune, Maharashtra",
        images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"],
        user: { name: "Sneha Desai", avatar: "S" },
        postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 5,
        title: "Kids Bicycle (Age 5-8)",
        description: "Red and blue bicycle with training wheels. Good condition, minor scratches.",
        category: "kids-toys",
        type: "sell",
        price: 3000,
        condition: "good",
        location: "Chennai, Tamil Nadu",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"],
        user: { name: "Vikram Reddy", avatar: "V" },
        postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 6,
        title: "Wooden Study Table",
        description: "Solid wood study table with drawer. Perfect for students. Self-pickup only.",
        category: "home-garden",
        type: "swap",
        price: 0,
        condition: "good",
        location: "Hyderabad, Telangana",
        images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500"],
        user: { name: "Neha Singh", avatar: "N" },
        postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 7,
        title: "Designer Handbag",
        description: "Authentic designer handbag, gently used. Comes with dust bag and certificate.",
        category: "clothing",
        type: "sell",
        price: 8000,
        condition: "like-new",
        location: "Kolkata, West Bengal",
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"],
        user: { name: "Ananya Roy", avatar: "A" },
        postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 8,
        title: "Programming Books Bundle",
        description: "5 books on Python, JavaScript, and Web Development. Great for beginners!",
        category: "books",
        type: "free",
        price: 0,
        condition: "good",
        location: "Ahmedabad, Gujarat",
        images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"],
        user: { name: "Rohan Mehta", avatar: "R" },
        postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 9,
        title: "Gaming Console - PS4",
        description: "PlayStation 4 with 2 controllers and 5 games. Excellent working condition.",
        category: "electronics",
        type: "sell",
        price: 18000,
        condition: "good",
        location: "Jaipur, Rajasthan",
        images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500"],
        user: { name: "Karan Gupta", avatar: "K" },
        postedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 10,
        title: "Baby Stroller",
        description: "Lightweight baby stroller, foldable. Used for 6 months only. Like new!",
        category: "kids-toys",
        type: "swap",
        price: 0,
        condition: "like-new",
        location: "Lucknow, Uttar Pradesh",
        images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
        user: { name: "Divya Sharma", avatar: "D" },
        postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 11,
        title: "Yoga Mat & Accessories",
        description: "Premium yoga mat with blocks, strap, and bag. Barely used, excellent condition.",
        category: "home-garden",
        type: "sell",
        price: 1500,
        condition: "like-new",
        location: "Chandigarh, Punjab",
        images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500"],
        user: { name: "Meera Kapoor", avatar: "M" },
        postedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        favorite: false
    },
    {
        id: 12,
        title: "Winter Jacket Collection",
        description: "3 winter jackets (M size). Different colors. All in good condition.",
        category: "clothing",
        type: "free",
        price: 0,
        condition: "good",
        location: "Surat, Gujarat",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500"],
        user: { name: "Arjun Patel", avatar: "A" },
        postedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        favorite: false
    }
];

// ===================================
// STATE MANAGEMENT
// ===================================

let allItems = [...sampleItems];
let filteredItems = [...allItems];
let currentPage = 1;
const itemsPerPage = 9;

// ===================================
// DOM ELEMENTS
// ===================================

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const sortFilter = document.getElementById('sortFilter');
const itemsGrid = document.getElementById('itemsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Modals
const createListingModal = document.getElementById('createListingModal');
const itemDetailModal = document.getElementById('itemDetailModal');
const safetyGuideModal = document.getElementById('safetyGuideModal');

// Buttons
const createListingBtn = document.getElementById('createListingBtn');
const closeCreateModal = document.getElementById('closeCreateModal');
const cancelCreateBtn = document.getElementById('cancelCreateBtn');
const closeDetailModal = document.getElementById('closeDetailModal');
const safetyGuideBtn = document.getElementById('safetyGuideBtn');
const closeSafetyModal = document.getElementById('closeSafetyModal');

// Form
const createListingForm = document.getElementById('createListingForm');
const itemType = document.getElementById('itemType');
const priceRow = document.getElementById('priceRow');
const itemImages = document.getElementById('itemImages');
const imagePreview = document.getElementById('imagePreview');

// ===================================
// UTILITY FUNCTIONS
// ===================================

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}

function getBadgeClass(type) {
    const badges = {
        free: 'badge-free',
        swap: 'badge-swap',
        sell: 'badge-sell'
    };
    return badges[type] || 'badge-free';
}

function getBadgeText(type) {
    const texts = {
        free: 'Free',
        swap: 'Swap',
        sell: 'For Sale'
    };
    return texts[type] || 'Free';
}

// ===================================
// RENDER FUNCTIONS
// ===================================

function renderItems() {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    if (itemsToShow.length === 0) {
        itemsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-search" style="font-size: 4rem; color: #e0e0e0; margin-bottom: 20px;"></i>
        <h3 style="color: #7f8c8d; margin-bottom: 10px;">No items found</h3>
        <p style="color: #95a5a6;">Try adjusting your filters or search terms</p>
      </div>
    `;
        loadMoreBtn.style.display = 'none';
        return;
    }

    itemsGrid.innerHTML = itemsToShow.map(item => `
    <div class="item-card" data-id="${item.id}">
      <div class="item-image">
        <img src="${item.images[0]}" alt="${item.title}" loading="lazy" />
        <div class="item-badge ${getBadgeClass(item.type)}">
          ${getBadgeText(item.type)}
        </div>
        <button class="item-favorite ${item.favorite ? 'active' : ''}" data-id="${item.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="item-content">
        <h3 class="item-title">${item.title}</h3>
        <p class="item-description">${item.description}</p>
        <div class="item-meta">
          ${item.type === 'sell' ? `<div class="item-price">${formatPrice(item.price)}</div>` : `<div class="item-price">${getBadgeText(item.type)}</div>`}
          <div class="item-location">
            <i class="fas fa-map-marker-alt"></i>
            ${item.location.split(',')[0]}
          </div>
        </div>
        <div class="item-footer">
          <div class="item-user">
            <div class="user-avatar">${item.user.avatar}</div>
            <span class="user-name">${item.user.name}</span>
          </div>
          <div class="item-time">${getTimeAgo(item.postedAt)}</div>
        </div>
      </div>
    </div>
  `).join('');

    // Show/hide load more button
    if (endIndex >= filteredItems.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }

    // Add click listeners
    attachItemListeners();
}

function attachItemListeners() {
    // Item card clicks
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.item-favorite')) {
                const itemId = parseInt(card.dataset.id);
                showItemDetail(itemId);
            }
        });
    });

    // Favorite button clicks
    document.querySelectorAll('.item-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.dataset.id);
            toggleFavorite(itemId);
        });
    });
}

function showItemDetail(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    const detailContent = document.getElementById('itemDetailContent');
    detailContent.innerHTML = `
    <div class="item-detail-grid">
      <div class="detail-images">
        <div class="main-image">
          <img src="${item.images[0]}" alt="${item.title}" />
        </div>
        ${item.images.length > 1 ? `
          <div class="thumbnail-images">
            ${item.images.map((img, idx) => `
              <div class="thumbnail ${idx === 0 ? 'active' : ''}">
                <img src="${img}" alt="${item.title}" />
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="detail-info">
        <h3>${item.title}</h3>
        <div class="detail-price">
          ${item.type === 'sell' ? formatPrice(item.price) : getBadgeText(item.type)}
        </div>
        <div class="detail-meta">
          <span class="meta-badge">
            <i class="fas fa-tag"></i> ${item.category.replace('-', ' & ')}
          </span>
          <span class="meta-badge">
            <i class="fas fa-star"></i> ${item.condition}
          </span>
          <span class="meta-badge">
            <i class="fas fa-map-marker-alt"></i> ${item.location}
          </span>
        </div>
        <div class="detail-description">
          <h4>Description</h4>
          <p>${item.description}</p>
        </div>
        <div class="detail-seller">
          <div class="seller-avatar">${item.user.avatar}</div>
          <div class="seller-info">
            <h5>${item.user.name}</h5>
            <p>Posted ${getTimeAgo(item.postedAt)}</p>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-primary">
            <i class="fas fa-comment"></i> Contact Seller
          </button>
          <button class="btn btn-outline">
            <i class="fas fa-share"></i> Share
          </button>
        </div>
      </div>
    </div>
  `;

    itemDetailModal.classList.add('active');
}

function toggleFavorite(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (item) {
        item.favorite = !item.favorite;
        renderItems();
    }
}

// ===================================
// FILTER & SEARCH
// ===================================

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const type = typeFilter.value;
    const sort = sortFilter.value;

    // Filter items
    filteredItems = allItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || item.category === category;
        const matchesType = type === 'all' || item.type === type;

        return matchesSearch && matchesCategory && matchesType;
    });

    // Sort items
    switch (sort) {
        case 'newest':
            filteredItems.sort((a, b) => b.postedAt - a.postedAt);
            break;
        case 'oldest':
            filteredItems.sort((a, b) => a.postedAt - b.postedAt);
            break;
        case 'price-low':
            filteredItems.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredItems.sort((a, b) => b.price - a.price);
            break;
    }

    currentPage = 1;
    renderItems();
}

// ===================================
// MODAL FUNCTIONS
// ===================================

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===================================
// FORM HANDLING
// ===================================

// Show/hide price field based on transaction type
itemType.addEventListener('change', () => {
    if (itemType.value === 'sell') {
        priceRow.style.display = 'grid';
        document.getElementById('itemPrice').required = true;
    } else {
        priceRow.style.display = 'none';
        document.getElementById('itemPrice').required = false;
    }
});

// Image upload preview
let selectedFiles = [];

itemImages.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 5) {
        alert('You can upload a maximum of 5 images');
        return;
    }

    selectedFiles = [...selectedFiles, ...files].slice(0, 5);
    displayImagePreviews();
});

function displayImagePreviews() {
    imagePreview.innerHTML = selectedFiles.map((file, index) => `
    <div class="preview-item">
      <img src="${URL.createObjectURL(file)}" alt="Preview ${index + 1}" />
      <button type="button" class="preview-remove" data-index="${index}">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

    // Add remove listeners
    document.querySelectorAll('.preview-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            selectedFiles.splice(index, 1);
            displayImagePreviews();
        });
    });
}

// Form submission
createListingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
        alert('Please upload at least one image');
        return;
    }

    // Create new item
    const newItem = {
        id: allItems.length + 1,
        title: document.getElementById('itemTitle').value,
        description: document.getElementById('itemDescription').value,
        category: document.getElementById('itemCategory').value,
        type: document.getElementById('itemType').value,
        price: document.getElementById('itemType').value === 'sell' ?
            parseInt(document.getElementById('itemPrice').value) : 0,
        condition: document.getElementById('itemCondition').value,
        location: document.getElementById('itemLocation').value,
        images: selectedFiles.map(file => URL.createObjectURL(file)),
        user: { name: "You", avatar: "Y" },
        postedAt: new Date(),
        favorite: false
    };

    allItems.unshift(newItem);
    applyFilters();

    // Reset form
    createListingForm.reset();
    selectedFiles = [];
    imagePreview.innerHTML = '';
    priceRow.style.display = 'none';

    closeModal(createListingModal);

    // Show success message
    showNotification('Item listed successfully! 🎉');
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// EVENT LISTENERS
// ===================================

// Search and filters
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
typeFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);

// Load more
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderItems();
});

// Modal controls
createListingBtn.addEventListener('click', () => openModal(createListingModal));
closeCreateModal.addEventListener('click', () => closeModal(createListingModal));
cancelCreateBtn.addEventListener('click', () => closeModal(createListingModal));
closeDetailModal.addEventListener('click', () => closeModal(itemDetailModal));
safetyGuideBtn.addEventListener('click', () => openModal(safetyGuideModal));
closeSafetyModal.addEventListener('click', () => closeModal(safetyGuideModal));

// Close modals on outside click
[createListingModal, itemDetailModal, safetyGuideModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        [createListingModal, itemDetailModal, safetyGuideModal].forEach(modal => {
            if (modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    }
});

// ===================================
// SCROLL PROGRESS
// ===================================

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// ===================================
// ANIMATE STATS
// ===================================

function animateStats() {
    const stats = [
        { id: 'totalItems', target: 1247 },
        { id: 'totalUsers', target: 3892 },
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;

        let current = 0;
        const increment = stat.target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                element.textContent = stat.target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
}

// ===================================
// INITIALIZE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    renderItems();
    animateStats();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
    document.head.appendChild(style);
});

console.log('🌱 Eco-Swap Marketplace loaded successfully!');
