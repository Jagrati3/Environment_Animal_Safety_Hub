// Community Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && !window.__ECO_THEME_TOGGLE_BOUND__) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('ecolife_theme', isDark ? 'dark' : 'light');
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('ecolife_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Event registration functionality
    const registerButtons = document.querySelectorAll('.btn-primary');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventTitle = this.closest('.event-content').querySelector('h3').textContent;
            showRegistrationModal(eventTitle);
        });
    });

    // Create event functionality
    const createEventBtn = document.querySelector('.btn-secondary');
    if (createEventBtn) {
        createEventBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCreateEventModal();
        });
    }

    // Event filtering functionality
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
            filterEventsByCategory(category);
        });
    });
});

// Registration modal functionality
function showRegistrationModal(eventTitle) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('registration-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'registration-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Register for Event</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>You are registering for: <strong>${eventTitle}</strong></p>
                    <form id="registration-form">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone (optional)</label>
                            <input type="tel" id="phone">
                        </div>
                        <div class="form-group">
                            <label for="participants">Number of Participants</label>
                            <input type="number" id="participants" value="1" min="1" max="10">
                        </div>
                        <button type="submit" class="btn-primary">Complete Registration</button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Form submission
        const form = modal.querySelector('#registration-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration successful! You will receive a confirmation email shortly.');
            modal.remove();
        });
    }

    modal.style.display = 'block';
}

// Create event modal functionality
function showCreateEventModal() {
    let modal = document.getElementById('create-event-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'create-event-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>Create New Event</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="create-event-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="event-title">Event Title</label>
                                <input type="text" id="event-title" required>
                            </div>
                            <div class="form-group">
                                <label for="event-category">Category</label>
                                <select id="event-category" required>
                                    <option value="">Select Category</option>
                                    <option value="conservation">Conservation Activities</option>
                                    <option value="education">Educational Workshops</option>
                                    <option value="community">Community Gatherings</option>
                                    <option value="cleanup">Clean-up Drives</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="event-description">Description</label>
                            <textarea id="event-description" rows="4" required></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="event-date">Date</label>
                                <input type="date" id="event-date" required>
                            </div>
                            <div class="form-group">
                                <label for="event-time">Time</label>
                                <input type="time" id="event-time" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="event-location">Location</label>
                                <input type="text" id="event-location" required>
                            </div>
                            <div class="form-group">
                                <label for="max-participants">Max Participants</label>
                                <input type="number" id="max-participants" min="1" value="50">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="event-image">Event Image URL (optional)</label>
                            <input type="url" id="event-image" placeholder="https://example.com/image.jpg">
                        </div>
                        <button type="submit" class="btn-primary">Create Event</button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Form submission
        const form = modal.querySelector('#create-event-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Event created successfully! It will be reviewed and published soon.');
            modal.remove();
        });
    }

    modal.style.display = 'block';
}

// Filter events by category
function filterEventsByCategory(category) {
    const eventCards = document.querySelectorAll('.event-card');
    const categoryCards = document.querySelectorAll('.category-card');

    // Remove active class from all category cards
    categoryCards.forEach(card => card.classList.remove('active'));

    // Add active class to clicked category
    event.target.closest('.category-card').classList.add('active');

    // Filter events (this would need backend integration for real filtering)
    // For now, just show a message
    alert(`Filtering events by category: ${category}`);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click tracking for analytics
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`Button clicked: ${this.textContent}`);
        });
    });
});