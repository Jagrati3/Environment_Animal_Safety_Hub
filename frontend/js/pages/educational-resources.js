// Educational Resources Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeEducationalResources();
});

function initializeEducationalResources() {
    // Initialize components
    setupSearchFunctionality();
    setupFilterButtons();
    setupCategoryButtons();
    setupLearningPaths();
    setupCategoryOverviews();
    loadResources();
    setupNewsletter();
    setupModal();

    // Load recent activity
    loadRecentActivity();
}

// Sample resources data
const resourcesData = [
    {
        id: 'understanding-animal-behavior',
        title: 'Understanding Animal Behavior',
        description: 'Learn to interpret your pet\'s body language and communication signals through comprehensive video lessons.',
        type: 'video',
        category: 'behavior',
        duration: '2h 30m',
        icon: 'fas fa-brain',
        featured: true,
        content: `
            <div class="resource-detail">
                <div class="resource-video">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Video Content Coming Soon</p>
                    </div>
                </div>
                <div class="resource-info">
                    <h4>Course Overview</h4>
                    <p>This comprehensive course covers:</p>
                    <ul>
                        <li>Reading body language signals</li>
                        <li>Understanding vocal communications</li>
                        <li>Behavioral patterns in different species</li>
                        <li>Problem-solving techniques</li>
                        <li>Building stronger bonds with your pets</li>
                    </ul>
                    <div class="resource-actions">
                        <button class="btn-primary">Start Course</button>
                        <button class="btn-secondary">Download Materials</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'emergency-pet-care',
        title: 'Emergency Pet Care',
        description: 'Essential knowledge for handling pet emergencies and providing first aid when professional help isn\'t immediately available.',
        type: 'course',
        category: 'emergency',
        duration: '4h 15m',
        icon: 'fas fa-ambulance',
        featured: true,
        content: `
            <div class="resource-detail">
                <div class="resource-info">
                    <h4>Emergency Response Guide</h4>
                    <p>Critical skills covered in this course:</p>
                    <ul>
                        <li>Recognizing emergency situations</li>
                        <li>Basic first aid techniques</li>
                        <li>When to seek professional help</li>
                        <li>Creating an emergency preparedness plan</li>
                        <li>Common pet emergencies and responses</li>
                    </ul>
                    <div class="certification-badge">
                        <i class="fas fa-certificate"></i>
                        <span>Certificate upon completion</span>
                    </div>
                    <div class="resource-actions">
                        <button class="btn-primary">Enroll Now</button>
                        <button class="btn-secondary">Preview Course</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'sustainable-pet-ownership',
        title: 'Sustainable Pet Ownership',
        description: 'Reduce your environmental impact while providing excellent care for your pets. Learn about eco-friendly products and practices.',
        type: 'article',
        category: 'environment',
        duration: '15 min read',
        icon: 'fas fa-leaf',
        featured: true,
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>The Environmental Impact of Pet Ownership</h4>
                    <p>Did you know that pet ownership has a significant environmental footprint? From food production to waste management, our pets contribute to various environmental challenges. However, there are many ways to minimize this impact while still providing excellent care for our animal companions.</p>

                    <h5>Key Environmental Considerations:</h5>
                    <ul>
                        <li><strong>Food Production:</strong> Commercial pet food often requires significant resources and contributes to greenhouse gas emissions.</li>
                        <li><strong>Waste Management:</strong> Pet waste contains nutrients that can pollute waterways if not properly managed.</li>
                        <li><strong>Product Consumption:</strong> Plastic toys, packaging, and disposable products add to landfill waste.</li>
                        <li><strong>Transportation:</strong> Visits to vet clinics and pet stores contribute to carbon emissions.</li>
                    </ul>

                    <h5>Sustainable Solutions:</h5>
                    <ul>
                        <li>Choose eco-friendly pet food brands</li>
                        <li>Compost pet waste responsibly</li>
                        <li>Opt for durable, natural toys</li>
                        <li>Use reusable products when possible</li>
                        <li>Consider local veterinary services</li>
                    </ul>

                    <div class="resource-actions">
                        <button class="btn-primary">Read Full Article</button>
                        <button class="btn-secondary">Share Article</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'pet-nutrition-guide',
        title: 'Complete Pet Nutrition Guide',
        description: 'Understanding proper nutrition for different life stages and health conditions.',
        type: 'guide',
        category: 'health',
        duration: '25 min read',
        icon: 'fas fa-utensils',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Nutrition Fundamentals for Pet Health</h4>
                    <p>Proper nutrition is the foundation of your pet's health, affecting everything from energy levels to disease prevention. This comprehensive guide covers nutritional needs across different life stages and health conditions.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Read Guide</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'common-pet-diseases',
        title: 'Common Pet Diseases & Prevention',
        description: 'Learn about prevalent health issues in pets and how to prevent them.',
        type: 'article',
        category: 'health',
        duration: '20 min read',
        icon: 'fas fa-stethoscope',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Preventive Healthcare for Pets</h4>
                    <p>Knowledge is the best defense against pet health issues. Understanding common diseases and their prevention can help you keep your pets healthy and happy.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Read Article</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'positive-reinforcement-training',
        title: 'Positive Reinforcement Training',
        description: 'Effective, humane training methods that strengthen the bond between you and your pet.',
        type: 'video',
        category: 'behavior',
        duration: '1h 45m',
        icon: 'fas fa-graduation-cap',
        content: `
            <div class="resource-detail">
                <div class="resource-video">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Training Video Series</p>
                    </div>
                </div>
                <div class="resource-info">
                    <h4>Modern Training Techniques</h4>
                    <p>Learn positive reinforcement methods that work for all pets.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Watch Videos</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'animal-welfare-ethics',
        title: 'Animal Welfare Ethics',
        description: 'Understanding ethical considerations in animal care and welfare standards.',
        type: 'article',
        category: 'welfare',
        duration: '18 min read',
        icon: 'fas fa-balance-scale',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Ethical Frameworks in Animal Welfare</h4>
                    <p>Explore the ethical principles that guide responsible animal care and welfare standards in modern society.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Read Article</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'home-safety-pet-proofing',
        title: 'Home Safety & Pet-Proofing',
        description: 'Create a safe environment for your pets by identifying and eliminating household hazards.',
        type: 'guide',
        category: 'safety',
        duration: '12 min read',
        icon: 'fas fa-home',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Making Your Home Pet-Safe</h4>
                    <p>A comprehensive checklist for pet-proofing your home and preventing accidents.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">View Guide</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'wildlife-conservation-pets',
        title: 'Wildlife Conservation & Pets',
        description: 'How pet ownership affects wildlife and what you can do to help conservation efforts.',
        type: 'article',
        category: 'environment',
        duration: '22 min read',
        icon: 'fas fa-tree',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Pets and Biodiversity</h4>
                    <p>Understanding the complex relationship between domestic pets and wild animal populations.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Read Article</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'senior-pet-care',
        title: 'Senior Pet Care Guide',
        description: 'Specialized care considerations for aging pets and managing age-related health issues.',
        type: 'guide',
        category: 'health',
        duration: '30 min read',
        icon: 'fas fa-heart',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Caring for Senior Pets</h4>
                    <p>Comprehensive guidance for providing the best care for your aging companions.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Read Guide</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'disaster-preparedness-pets',
        title: 'Disaster Preparedness for Pets',
        description: 'Prepare your pets for natural disasters and emergency situations.',
        type: 'guide',
        category: 'emergency',
        duration: '16 min read',
        icon: 'fas fa-exclamation-triangle',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Emergency Planning for Pets</h4>
                    <p>Essential preparation steps to keep your pets safe during disasters.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">View Guide</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'animal-cruelty-prevention',
        title: 'Animal Cruelty Prevention',
        description: 'Understanding animal cruelty, its signs, and how to prevent and report it.',
        type: 'article',
        category: 'welfare',
        duration: '14 min read',
        icon: 'fas fa-hand-paper',
        content: `
            <div class="resource-detail">
                <div class="resource-content">
                    <h4>Recognizing and Preventing Cruelty</h4>
                    <p>Learn to identify signs of animal cruelty and take action to protect animals.</p>
                    <div class="resource-actions">
                        <button class="btn-primary">Read Article</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'microplastic-terrestrial-animals',
        title: 'Microplastic Accumulation in Terrestrial Animals',
        description: 'Investigate how microplastics enter land-based food chains and their impact on wildlife health and reproduction.',
        type: 'article',
        category: 'environment',
        duration: '12 min read',
        icon: 'fas fa-microscope',
        featured: false,
        content: `
            <div class="resource-detail">
                <div class="resource-info">
                    <h4>The Invisible Threat to Terrestrial Wildlife</h4>
                    <p>Explore the concerning rise of microplastic pollution in land-based ecosystems. This comprehensive article covers:</p>
                    <ul>
                        <li>Pathways of microplastic entry into terrestrial food chains</li>
                        <li>Bioaccumulation and biomagnification processes</li>
                        <li>Physiological impacts on wildlife health</li>
                        <li>Reproductive and developmental consequences</li>
                        <li>Prevention and mitigation strategies</li>
                    </ul>
                    <div class="resource-actions">
                        <a href="microplastic-terrestrial-animals.html" class="btn-primary">Read Full Article</a>
                    </div>
                </div>
            </div>
        `
    }
];

let currentFilter = 'all';
let currentCategory = 'all';
let searchQuery = '';
let displayedResources = 12;

function setupSearchFunctionality() {
    const searchInput = document.getElementById('resource-search');
    searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase();
        filterResources();
    });
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current filter
            currentFilter = this.dataset.filter;
            filterResources();
        });
    });
}

function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current category
            currentCategory = this.dataset.category;
            filterResources();
        });
    });
}

function setupCategoryOverviews() {
    const categoryOverviews = document.querySelectorAll('.category-overview');
    categoryOverviews.forEach(overview => {
        overview.addEventListener('click', function() {
            const category = this.dataset.category;
            // Update category filter
            currentCategory = category;
            // Update UI
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });
            filterResources();
            // Scroll to resources section
            document.querySelector('.resources-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function setupLearningPaths() {
    const pathButtons = document.querySelectorAll('.path-card .btn-secondary');
    pathButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pathCard = this.closest('.path-card');
            const pathTitle = pathCard.querySelector('h3').textContent;

            // Show learning path modal or redirect
            showNotification(`Starting learning path: ${pathTitle}`, 'success');
        });
    });
}

function filterResources() {
    let filteredResources = resourcesData.filter(resource => {
        // Filter by type
        const typeMatch = currentFilter === 'all' || resource.type === currentFilter;

        // Filter by category
        const categoryMatch = currentCategory === 'all' || resource.category === currentCategory;

        // Filter by search query
        const searchMatch = searchQuery === '' ||
            resource.title.toLowerCase().includes(searchQuery) ||
            resource.description.toLowerCase().includes(searchQuery);

        return typeMatch && categoryMatch && searchMatch;
    });

    displayResources(filteredResources);
    updateResultsCount(filteredResources.length);
}

function displayResources(resources) {
    const resourcesGrid = document.getElementById('resources-grid');
    resourcesGrid.innerHTML = '';

    const resourcesToShow = resources.slice(0, displayedResources);

    resourcesToShow.forEach((resource, index) => {
        const resourceCard = createResourceCard(resource);
        resourceCard.style.animationDelay = `${index * 0.1}s`;
        resourcesGrid.appendChild(resourceCard);
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (resources.length > displayedResources) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => loadMoreResources(resources);
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.onclick = () => openResource(resource.id);

    card.innerHTML = `
        <div class="resource-image">
            <i class="${resource.icon}"></i>
            <div class="resource-type">${resource.type}</div>
        </div>
        <div class="resource-content">
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <div class="resource-meta">
                <span class="resource-category">${getCategoryName(resource.category)}</span>
                <span class="resource-duration">${resource.duration}</span>
            </div>
        </div>
    `;

    return card;
}

function getCategoryName(category) {
    const categoryNames = {
        welfare: 'Animal Welfare',
        safety: 'Pet Safety',
        environment: 'Environment',
        health: 'Pet Health',
        behavior: 'Animal Behavior',
        conservation: 'Conservation',
        emergency: 'Emergency Response'
    };
    return categoryNames[category] || category;
}

function loadMoreResources(allResources) {
    displayedResources += 12;
    displayResources(allResources);
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    resultsCount.textContent = `Showing ${Math.min(count, displayedResources)} of ${count} resources`;
}

function loadResources() {
    displayResources(resourcesData);
}

function openResource(resourceId) {
    const resource = resourcesData.find(r => r.id === resourceId);
    if (!resource) return;

    const modal = document.getElementById('resource-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = resource.title;
    modalBody.innerHTML = resource.content;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Add to recent activity
    addToRecentActivity(resource);
}

function closeResourceModal() {
    const modal = document.getElementById('resource-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function setupModal() {
    // Close modal when clicking outside
    document.getElementById('resource-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeResourceModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeResourceModal();
        }
    });
}

function addToRecentActivity(resource) {
    let recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]');

    // Remove if already exists
    recentActivity = recentActivity.filter(item => item.id !== resource.id);

    // Add to beginning
    recentActivity.unshift({
        id: resource.id,
        title: resource.title,
        type: resource.type,
        timestamp: new Date().toISOString()
    });

    // Keep only last 5
    recentActivity = recentActivity.slice(0, 5);

    localStorage.setItem('recentActivity', JSON.stringify(recentActivity));
    loadRecentActivity();
}

function loadRecentActivity() {
    const recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]');
    const activityList = document.getElementById('recent-activity');

    if (recentActivity.length === 0) {
        activityList.innerHTML = '<p class="no-activity">No recent activity. Start exploring resources above!</p>';
        return;
    }

    activityList.innerHTML = recentActivity.map(item => `
        <div class="activity-item" onclick="openResource('${item.id}')">
            <div class="activity-icon">
                <i class="fas fa-${getActivityIcon(item.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${item.title}</h4>
                <span class="activity-type">${item.type}</span>
                <span class="activity-time">${getTimeAgo(item.timestamp)}</span>
            </div>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    const icons = {
        video: 'play-circle',
        course: 'graduation-cap',
        article: 'file-alt',
        guide: 'book'
    };
    return icons[type] || 'file';
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
}

function setupNewsletter() {
    // Newsletter subscription functionality
    window.subscribeNewsletter = function() {
        const email = document.getElementById('newsletter-email').value;
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate subscription
        showNotification('Thank you for subscribing! You\'ll receive updates about new educational resources.', 'success');
        document.getElementById('newsletter-email').value = '';
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        border-left: 4px solid #4CAF50;
    }

    .notification-success i {
        color: #4CAF50;
    }

    .notification-error {
        border-left: 4px solid #F44336;
    }

    .notification-error i {
        color: #F44336;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);