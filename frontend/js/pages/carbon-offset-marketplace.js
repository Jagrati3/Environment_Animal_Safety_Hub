// Carbon Offset Marketplace - JavaScript

// Sample Projects Database
const projectsDatabase = [
    {
        id: 1,
        name: 'Amazon Rainforest Restoration',
        category: 'reforestation',
        location: 'Brazil, South America',
        price: 15,
        creditsAvailable: 50000,
        rating: 4.8,
        reviews: 342,
        image: 'amazon.jpg',
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
        image: 'wind.jpg',
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
        image: 'mangrove.jpg',
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
        image: 'solar.jpg',
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
        image: 'peatland.jpg',
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
        image: 'renewable.jpg',
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

// Cart Management
let cart = JSON.parse(localStorage.getItem('carbonOffsetCart') || '[]');
let currentProject = null;
let selectedQuantity = 1;

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const projectSearch = document.getElementById('projectSearch');
const sortFilter = document.getElementById('sortFilter');
const certificationFilter = document.getElementById('certificationFilter');
const categoryTabs = document.querySelectorAll('.category-tab');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const cartWidget = document.getElementById('cartWidget');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProjects(projectsDatabase);
    updateCartCount();
    animateCounters();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search & Filters
    projectSearch.addEventListener('input', filterProjects);
    sortFilter.addEventListener('change', filterProjects);
    certificationFilter.addEventListener('change', filterProjects);
    
    // Category Tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterProjects();
        });
    });
    
    // Modal
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
    
    // Cart
    cartButton.addEventListener('click', openCartModal);
    cartModalClose.addEventListener('click', closeCartModal);
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
    });
    
    // Quantity Controls
    document.getElementById('decreaseQty').addEventListener('click', () => changeQuantity(-1));
    document.getElementById('increaseQty').addEventListener('click', () => changeQuantity(1));
    document.getElementById('quantity').addEventListener('change', (e) => {
        selectedQuantity = Math.max(1, parseInt(e.target.value) || 1);
        updateTotalPrice();
    });
    
    // Add to Cart
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    
    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    
    // Modal Tabs
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
        });
    });
}

// Display Projects
function displayProjects(projects) {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProjectModal(${project.id})">
            <div class="project-image">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                    <i class="fas fa-${getCategoryIcon(project.category)}"></i>
                </div>
                <div class="project-category-badge">${getCategoryName(project.category)}</div>
                <div class="certification-badges">
                    ${project.certifications.map(cert => `<div class="cert-badge">${cert}</div>`).join('')}
                </div>
            </div>
            <div class="project-content">
                <div class="project-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${project.location}</span>
                </div>
                <h3 class="project-name">${project.name}</h3>
                
                <div class="project-stats">
                    <div class="stat-box">
                        <div class="stat-label">Credits Available</div>
                        <div class="stat-value">${project.creditsAvailable.toLocaleString()}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">CO₂ Prevented</div>
                        <div class="stat-value">${(project.emissionsPrevented / 1000).toFixed(0)}k tons</div>
                    </div>
                </div>
                
                <div class="project-metrics">
                    ${project.treesPlanted > 0 ? `
                        <div class="metric-item">
                            <i class="fa-solid fa-tree"></i>
                            <span>${(project.treesPlanted / 1000).toFixed(0)}k trees</span>
                        </div>
                    ` : `
                        <div class="metric-item">
                            <i class="fa-solid fa-bolt"></i>
                            <span>Clean Energy</span>
                        </div>
                    `}
                    <div class="metric-item">
                        <i class="fa-solid fa-users"></i>
                        <span>${project.communitiesHelped} communities</span>
                    </div>
                </div>
                
                <div class="project-rating">
                    <div class="stars">
                        ${generateStars(project.rating)}
                    </div>
                    <span class="rating-text">${project.rating} (${project.reviews} reviews)</span>
                </div>
                
                <div class="project-progress">
                    <div class="progress-label">
                        <span>Project Progress</span>
                        <span>${project.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                </div>
                
                <div class="project-footer">
                    <div class="project-price">
                        <span class="price-label">Price per ton CO₂</span>
                        <span class="price-amount">$${project.price}</span>
                    </div>
                    <button class="view-details-btn" onclick="event.stopPropagation(); openProjectModal(${project.id})">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Projects
function filterProjects() {
    const searchTerm = projectSearch.value.toLowerCase();
    const activeCategory = document.querySelector('.category-tab.active').dataset.category;
    const certification = certificationFilter.value;
    const sortBy = sortFilter.value;
    
    let filtered = projectsDatabase.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm) ||
                            project.location.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
        const matchesCert = !certification || project.certifications.some(c => 
            c.toLowerCase() === certification.split('-').join(' ').toLowerCase() || 
            (certification === 'gold-standard' && c === 'GS') ||
            (certification === 'vcs' && c === 'VCS') ||
            (certification === 'iso' && c === 'ISO') ||
            (certification === 'ccb' && c === 'CCB')
        );
        
        return matchesSearch && matchesCategory && matchesCert;
    });
    
    // Sort
    switch(sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'impact':
            filtered.sort((a, b) => b.emissionsPrevented - a.emissionsPrevented);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filtered.sort((a, b) => b.reviews - a.reviews);
    }
    
    displayProjects(filtered);
    
    if (filtered.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <p style="color: #999; font-size: 1.1rem;">No projects found matching your criteria</p>
            </div>
        `;
    }
}

// Open Project Modal
function openProjectModal(projectId) {
    const project = projectsDatabase.find(p => p.id === projectId);
    if (!project) return;
    
    currentProject = project;
    selectedQuantity = 1;
    document.getElementById('quantity').value = 1;
    
    // Set header
    document.getElementById('modalHeader').innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 10px;">${project.name}</h2>
        <p style="opacity: 0.9; margin-bottom: 20px;">
            <i class="fa-solid fa-location-dot"></i> ${project.location}
        </p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Price per ton CO₂</div>
                <div style="font-size: 1.8rem; font-weight: 700;">$${project.price}</div>
            </div>
            <div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Credits Available</div>
                <div style="font-size: 1.8rem; font-weight: 700;">${project.creditsAvailable.toLocaleString()}</div>
            </div>
            <div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Rating</div>
                <div style="font-size: 1.8rem; font-weight: 700;">${project.rating} ⭐</div>
            </div>
        </div>
    `;
    
    // Overview Tab
    document.getElementById('overviewTab').innerHTML = `
        <h3 style="margin-bottom: 15px;">About This Project</h3>
        <p style="line-height: 1.8; color: #666; margin-bottom: 20px;">${project.description}</p>
        
        <h3 style="margin-bottom: 15px;">Project Timeline</h3>
        <p style="color: #666; margin-bottom: 20px;">${project.timeline}</p>
        
        <h3 style="margin-bottom: 15px;">Category</h3>
        <div style="display: inline-block; padding: 10px 20px; background: #ecfdf5; border-radius: 20px; color: #10b981; font-weight: 600;">
            ${getCategoryName(project.category)}
        </div>
    `;
    
    // Impact Tab
    document.getElementById('impactTab').innerHTML = `
        <h3 style="margin-bottom: 20px;">Environmental Impact</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="padding: 20px; background: #ecfdf5; border-radius: 10px; text-align: center;">
                <i class="fa-solid fa-cloud" style="font-size: 2rem; color: #10b981; margin-bottom: 10px;"></i>
                <div style="font-size: 1.5rem; font-weight: 700; color: #333;">${project.emissionsPrevented.toLocaleString()}</div>
                <div style="color: #666; font-size: 0.9rem;">Tons CO₂ Prevented</div>
            </div>
            ${project.treesPlanted > 0 ? `
                <div style="padding: 20px; background: #ecfdf5; border-radius: 10px; text-align: center;">
                    <i class="fa-solid fa-tree" style="font-size: 2rem; color: #10b981; margin-bottom: 10px;"></i>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #333;">${project.treesPlanted.toLocaleString()}</div>
                    <div style="color: #666; font-size: 0.9rem;">Trees Planted</div>
                </div>
            ` : ''}
            <div style="padding: 20px; background: #ecfdf5; border-radius: 10px; text-align: center;">
                <i class="fa-solid fa-users" style="font-size: 2rem; color: #10b981; margin-bottom: 10px;"></i>
                <div style="font-size: 1.5rem; font-weight: 700; color: #333;">${project.communitiesHelped}</div>
                <div style="color: #666; font-size: 0.9rem;">Communities Helped</div>
            </div>
        </div>
        
        <h3 style="margin-bottom: 15px;">Progress</h3>
        <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
            <span>Project Completion</span>
            <span style="font-weight: 700;">${project.progress}%</span>
        </div>
        <div style="width: 100%; height: 10px; background: #e5e7eb; border-radius: 10px;">
            <div style="width: ${project.progress}%; height: 100%; background: linear-gradient(90deg, #10b981 0%, #34d399 100%); border-radius: 10px;"></div>
        </div>
    `;
    
    // Verification Tab
    document.getElementById('verificationTab').innerHTML = `
        <h3 style="margin-bottom: 20px;">Certifications & Standards</h3>
        <div style="display: grid; gap: 15px;">
            ${project.verifications.map(cert => `
                <div style="padding: 20px; background: #f9fafb; border-left: 4px solid #10b981; border-radius: 8px;">
                    <div style="font-weight: 700; color: #333; margin-bottom: 8px;">
                        <i class="fa-solid fa-certificate" style="color: #10b981;"></i> ${cert}
                    </div>
                    <div style="color: #666; font-size: 0.9rem;">Verified and audited by independent third parties</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Reviews Tab
    document.getElementById('reviewsTab').innerHTML = `
        <h3 style="margin-bottom: 20px;">Community Reviews</h3>
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 3rem; color: #fbbf24; margin-bottom: 10px;">⭐</div>
            <div style="font-size: 2rem; font-weight: 700; margin-bottom: 5px;">${project.rating}</div>
            <div style="color: #666;">Based on ${project.reviews} reviews</div>
        </div>
    `;
    
    updateTotalPrice();
    projectModal.classList.add('active');
}

// Close Project Modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    currentProject = null;
}

// Change Quantity
function changeQuantity(delta) {
    selectedQuantity = Math.max(1, selectedQuantity + delta);
    document.getElementById('quantity').value = selectedQuantity;
    updateTotalPrice();
}

// Update Total Price
function updateTotalPrice() {
    if (!currentProject) return;
    const total = currentProject.price * selectedQuantity;
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}

// Add to Cart
function addToCart() {
    if (!currentProject) return;
    
    const existingItem = cart.find(item => item.projectId === currentProject.id);
    
    if (existingItem) {
        existingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            projectId: currentProject.id,
            projectName: currentProject.name,
            price: currentProject.price,
            quantity: selectedQuantity
        });
    }
    
    localStorage.setItem('carbonOffsetCart', JSON.stringify(cart));
    updateCartCount();
    closeProjectModal();
    
    // Show confirmation
    alert(`Added ${selectedQuantity} ton(s) of CO₂ credits to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Open Cart Modal
function openCartModal() {
    displayCartItems();
    cartModal.classList.add('active');
}

// Close Cart Modal
function closeCartModal() {
    cartModal.classList.remove('active');
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #999;">
                <i class="fa-solid fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        document.getElementById('totalCO2').textContent = '0 tons';
        document.getElementById('cartTotal').textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image"></div>
            <div class="cart-item-details">
                <h4>${item.projectName}</h4>
                <p>${item.quantity} ton(s) CO₂ @ $${item.price}/ton</p>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
            <div class="cart-item-price">
                <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');
    
    const totalCO2 = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('totalCO2').textContent = `${totalCO2} tons`;
    document.getElementById('cartTotal').textContent = `$${totalAmount.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('carbonOffsetCart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const totalCO2 = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`Checkout successful!\n\nTotal CO₂ Offset: ${totalCO2} tons\nTotal Amount: $${totalAmount.toFixed(2)}\n\nThank you for supporting environmental projects!`);
    
    cart = [];
    localStorage.setItem('carbonOffsetCart', JSON.stringify(cart));
    updateCartCount();
    closeCartModal();
}

// Helper Functions
function getCategoryName(category) {
    const names = {
        'reforestation': 'Reforestation',
        'renewable-energy': 'Renewable Energy',
        'wetland': 'Wetland Protection',
        'solar': 'Solar Energy',
        'wind': 'Wind Energy'
    };
    return names[category] || category;
}

function getCategoryIcon(category) {
    const icons = {
        'reforestation': 'tree',
        'renewable-energy': 'bolt',
        'wetland': 'water',
        'solar': 'sun',
        'wind': 'wind'
    };
    return icons[category] || 'leaf';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let html = '';
    for (let i = 0; i < fullStars; i++) html += '<i class="fa-solid fa-star"></i>';
    if (halfStar) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    for (let i = 0; i < emptyStars; i++) html += '<i class="fa-regular fa-star"></i>';
    
    return html;
}

// Animate Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .impact-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}
