// Community Groups Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize groups page
    initializeGroupsPage();

    // Load featured groups
    loadFeaturedGroups();

    // Update statistics
    updateGroupStats();
});

function initializeGroupsPage() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && !window.__ECO_THEME_TOGGLE_BOUND__) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterGroupsByCategory(category);
        });
    });

    // Modal functionality
    initializeModals();
}

function initializeModals() {
    // Join Group Modal
    const joinModal = document.getElementById('join-modal');
    const joinModalClose = document.getElementById('join-modal-close');
    const joinCancelBtn = document.getElementById('join-cancel-btn');
    const joinConfirmBtn = document.getElementById('join-confirm-btn');

    // Create Group Modal
    const createModal = document.getElementById('create-modal');
    const createModalClose = document.getElementById('create-modal-close');
    const createCancelBtn = document.getElementById('create-cancel-btn');
    const createGroupForm = document.getElementById('create-group-form');

    // Close modals
    [joinModalClose, joinCancelBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => closeModal(joinModal));
        }
    });

    [createModalClose, createCancelBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => closeModal(createModal));
        }
    });

    // Join group confirmation
    if (joinConfirmBtn) {
        joinConfirmBtn.addEventListener('click', joinGroup);
    }

    // Create group form submission
    if (createGroupForm) {
        createGroupForm.addEventListener('submit', handleCreateGroup);
    }

    // Close modal when clicking outside
    [joinModal, createModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });
}

function loadFeaturedGroups() {
    const groupsGrid = document.getElementById('featured-groups');
    if (!groupsGrid) return;

    // Sample featured groups data
    const featuredGroups = [
        {
            id: 1,
            name: "Urban Wildlife Protectors",
            category: "wildlife",
            members: 1250,
            description: "Dedicated to protecting urban wildlife habitats and educating communities about coexistence.",
            image: "🦊",
            isJoined: false
        },
        {
            id: 2,
            name: "Zero Waste Living",
            category: "sustainable",
            members: 2100,
            description: "A community committed to eliminating waste through sustainable living practices.",
            image: "♻️",
            isJoined: true
        },
        {
            id: 3,
            name: "Climate Action Network",
            category: "education",
            members: 3500,
            description: "Educating and mobilizing communities for effective climate action and policy change.",
            image: "🌍",
            isJoined: false
        },
        {
            id: 4,
            name: "Animal Rescue Alliance",
            category: "animal-welfare",
            members: 1800,
            description: "Coordinating rescue efforts and providing support for abandoned and injured animals.",
            image: "🐾",
            isJoined: true
        },
        {
            id: 5,
            name: "Green Technology Innovators",
            category: "sustainable",
            members: 950,
            description: "Exploring and developing innovative green technologies for a sustainable future.",
            image: "⚡",
            isJoined: false
        },
        {
            id: 6,
            name: "Ocean Conservation Society",
            category: "wildlife",
            members: 2800,
            description: "Working to protect marine ecosystems and reduce ocean pollution worldwide.",
            image: "🌊",
            isJoined: false
        }
    ];

    // Load custom groups from localStorage
    const customGroups = JSON.parse(localStorage.getItem('community_groups') || '[]');
    const allGroups = [...customGroups, ...featuredGroups];

    groupsGrid.innerHTML = allGroups.map(group => createGroupCard(group)).join('');
}

function createGroupCard(group) {
    const joinButtonText = group.isJoined ? 'Leave Group' : 'Join Group';
    const joinButtonClass = group.isJoined ? 'btn-secondary' : 'btn-primary';

    return `
        <div class="group-card" data-group-id="${group.id}">
            <div class="group-header">
                <div class="group-avatar">
                    <span class="group-emoji">${group.image}</span>
                </div>
                <div class="group-info">
                    <h3 class="group-name">${group.name}</h3>
                    <span class="group-category">${getCategoryName(group.category)}</span>
                </div>
            </div>
            <p class="group-description">${group.description}</p>
            <div class="group-stats">
                <span class="stat"><i class="fa-solid fa-users"></i> ${group.members.toLocaleString()} members</span>
            </div>
            <div class="group-actions">
                <button class="btn ${joinButtonClass} join-btn" data-group-id="${group.id}">
                    <i class="fa-solid ${group.isJoined ? 'fa-sign-out-alt' : 'fa-user-plus'}"></i>
                    ${joinButtonText}
                </button>
                <button class="btn btn-outline view-btn" data-group-id="${group.id}">
                    <i class="fa-solid fa-eye"></i>
                    View Details
                </button>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const categories = {
        'wildlife': 'Wildlife Conservation',
        'sustainable': 'Sustainable Living',
        'education': 'Environmental Education',
        'animal-welfare': 'Animal Welfare',
        'climate': 'Climate Action',
        'ocean': 'Ocean Cleanups'
    };
    return categories[category] || category;
}

function updateGroupStats() {
    // Update statistics with sample data
    const stats = {
        totalGroups: 247,
        totalMembers: 45280,
        totalEvents: 156
    };

    document.getElementById('total-groups').textContent = stats.totalGroups;
    document.getElementById('total-members').textContent = stats.totalMembers.toLocaleString();
    document.getElementById('total-events').textContent = stats.totalEvents;
}

function filterGroupsByCategory(category) {
    const groupCards = document.querySelectorAll('.group-card');
    const categoryCards = document.querySelectorAll('.category-card');

    // Update active category
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === category) {
            card.classList.add('active');
        }
    });

    // Filter groups
    groupCards.forEach(card => {
        const groupCategory = card.querySelector('.group-category').textContent.toLowerCase();
        const categoryName = getCategoryName(category).toLowerCase();

        if (category === 'all' || groupCategory.includes(categoryName)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openJoinGroupModal(groupId) {
    const modal = document.getElementById('join-modal');
    const groupPreview = document.getElementById('join-group-preview');

    // Find group data
    const groupCard = document.querySelector(`.group-card[data-group-id="${groupId}"]`);
    if (!groupCard) return;

    const groupName = groupCard.querySelector('.group-name').textContent;
    const groupCategory = groupCard.querySelector('.group-category').textContent;
    const groupEmoji = groupCard.querySelector('.group-emoji').textContent;

    groupPreview.innerHTML = `
        <div class="group-preview-header">
            <span class="preview-emoji">${groupEmoji}</span>
            <div class="preview-info">
                <h4 class="preview-name">${groupName}</h4>
                <span class="preview-category">${groupCategory}</span>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function joinGroup() {
    // Simulate joining group
    showNotification('Successfully joined the group!', 'success');
    closeModal(document.getElementById('join-modal'));

    // Update button state (in a real app, this would be handled by the backend)
    setTimeout(() => {
        location.reload(); // Simple way to refresh the state
    }, 1500);
}

function openCreateGroupModal() {
    const modal = document.getElementById('create-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function handleCreateGroup(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const groupData = {
        name: formData.get('groupName'),
        category: formData.get('groupCategory'),
        description: formData.get('groupDescription'),
        privacy: formData.get('groupPrivacy')
    };

    // Simulate creating group
    showNotification('Group created successfully!', 'success');
    closeModal(document.getElementById('create-modal'));
    e.target.reset();

    // In a real app, you would send this data to the server
    console.log('Creating group:', groupData);
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('ecolife_theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('ecolife_theme', 'dark');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fa-solid fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Event delegation for dynamically created elements
document.addEventListener('click', function(e) {
    // Join group buttons
    if (e.target.closest('.join-btn')) {
        const groupId = e.target.closest('.join-btn').dataset.groupId;
        openJoinGroupModal(groupId);
    }

    // View details buttons
    if (e.target.closest('.view-btn')) {
        const groupId = e.target.closest('.view-btn').dataset.groupId;
        window.location.href = `group-details.html?id=${groupId}`;
    }
});

// Apply saved theme on page load
const savedTheme = localStorage.getItem('ecolife_theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}