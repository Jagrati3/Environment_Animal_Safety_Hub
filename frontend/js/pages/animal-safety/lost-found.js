// Lost & Found Pets JavaScript

// Counter animation for hero stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.hero-stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});

// Alert Tab Filtering
const alertTabs = document.querySelectorAll('.alert-tab');
const alertCards = document.querySelectorAll('.alert-card');

alertTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        alertTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const filter = tab.getAttribute('data-tab');

        // Filter alert cards
        alertCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            }
        });
    });
});

// Filter Alerts Function
function filterAlerts() {
    const alertType = document.getElementById('alertType').value;
    const species = document.getElementById('species').value;
    const location = document.getElementById('location').value.toLowerCase();
    const urgency = document.getElementById('urgency').value;

    alertCards.forEach(card => {
        let show = true;

        // Filter by alert type
        if (alertType && card.getAttribute('data-category') !== alertType) {
            show = false;
        }

        // Filter by species (would need data attributes on cards)
        if (species) {
            const cardSpecies = card.querySelector('.alert-species')?.textContent.toLowerCase();
            if (!cardSpecies?.includes(species)) {
                show = false;
            }
        }

        // Filter by location
        if (location) {
            const cardLocation = card.querySelector('.detail-item span')?.textContent.toLowerCase();
            if (!cardLocation?.includes(location)) {
                show = false;
            }
        }

        // Filter by urgency
        if (urgency) {
            const hasBadge = card.querySelector(`.badge-${urgency}`);
            if (!hasBadge) {
                show = false;
            }
        }

        // Show/hide card
        if (show) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });

    // Show message if no results
    const visibleCards = Array.from(alertCards).filter(card => card.style.display !== 'none');
    const grid = document.getElementById('alertsGrid');

    let noResultsMsg = document.getElementById('noResultsMessage');
    if (visibleCards.length === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
        <i class="fa-solid fa-search"></i>
        <h3>No alerts found</h3>
        <p>Try adjusting your filters or check back later.</p>
      `;
            grid.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Contact Modal Functions
function openContactModal(petId) {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Store the pet ID for form submission
    modal.setAttribute('data-pet-id', petId);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('contactModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'contactModal') {
        closeContactModal();
    }
});

// Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const modal = document.getElementById('contactModal');
    const petId = modal.getAttribute('data-pet-id');

    const formData = {
        petId: petId,
        senderName: document.getElementById('senderName').value,
        senderEmail: document.getElementById('senderEmail').value,
        senderPhone: document.getElementById('senderPhone').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Store in localStorage (in production, this would be sent to a server)
    const messages = JSON.parse(localStorage.getItem('petMessages') || '[]');
    messages.push(formData);
    localStorage.setItem('petMessages', JSON.stringify(messages));

    // Show success message
    alert('Message sent successfully! The reporter will contact you soon.');

    // Reset form and close modal
    document.getElementById('contactForm').reset();
    closeContactModal();
});

// Share Alert Function
function shareAlert(petId) {
    const url = window.location.href + '#' + petId;

    if (navigator.share) {
        navigator.share({
            title: 'Lost/Found Pet Alert',
            text: 'Help reunite this pet with their family!',
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard! Share it to help reunite this pet.');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// Lost Pet Form Submission
document.getElementById('lostPetForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        type: 'lost',
        petName: document.getElementById('lostPetName').value,
        species: document.getElementById('lostSpecies').value,
        breed: document.getElementById('lostBreed').value,
        age: document.getElementById('lostAge').value,
        gender: document.getElementById('lostGender').value,
        location: document.getElementById('lostLocation').value,
        date: document.getElementById('lostDate').value,
        time: document.getElementById('lostTime').value,
        description: document.getElementById('lostDescription').value,
        contactName: document.getElementById('contactName').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        timestamp: new Date().toISOString(),
        status: 'pending_approval'
    };

    // Handle photo uploads
    const photos = document.getElementById('lostPhotos').files;
    if (photos.length > 0) {
        formData.photoCount = photos.length;
        // In production, photos would be uploaded to a server
    }

    // Store in localStorage (in production, this would be sent to a server)
    const alerts = JSON.parse(localStorage.getItem('petAlerts') || '[]');
    alerts.push(formData);
    localStorage.setItem('petAlerts', JSON.stringify(alerts));

    // Show success message
    alert('Lost pet alert submitted successfully! Your listing will be reviewed and published within 24 hours. We\'ll notify you via email once it\'s live.');

    // Reset form
    document.getElementById('lostPetForm').reset();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Found Pet Form Submission
document.getElementById('foundPetForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        type: 'found',
        species: document.getElementById('foundSpecies').value,
        breed: document.getElementById('foundBreed').value,
        age: document.getElementById('foundAge').value,
        gender: document.getElementById('foundGender').value,
        location: document.getElementById('foundLocation').value,
        date: document.getElementById('foundDate').value,
        time: document.getElementById('foundTime').value,
        description: document.getElementById('foundDescription').value,
        contactName: document.getElementById('foundContactName').value,
        contactPhone: document.getElementById('foundContactPhone').value,
        contactEmail: document.getElementById('foundContactEmail').value,
        status: document.querySelector('input[name="foundStatus"]:checked').value,
        timestamp: new Date().toISOString(),
        approvalStatus: 'pending_approval'
    };

    // Handle photo uploads
    const photos = document.getElementById('foundPhotos').files;
    if (photos.length > 0) {
        formData.photoCount = photos.length;
        // In production, photos would be uploaded to a server
    }

    // Store in localStorage (in production, this would be sent to a server)
    const alerts = JSON.parse(localStorage.getItem('petAlerts') || '[]');
    alerts.push(formData);
    localStorage.setItem('petAlerts', JSON.stringify(alerts));

    // Show success message
    alert('Found pet alert submitted successfully! Your listing will be reviewed and published within 24 hours. Thank you for helping reunite pets with their families!');

    // Reset form
    document.getElementById('foundPetForm').reset();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Load More Alerts
document.querySelector('.load-more-btn')?.addEventListener('click', function () {
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

    // Simulate loading more alerts
    setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-rotate"></i> Load More Alerts';
        alert('No more alerts to load at this time. Check back later!');
    }, 1000);
});

// FAQ Accordion (if needed on this page)
document.querySelectorAll('.faq-question')?.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question i').classList.replace('fa-minus', 'fa-plus');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// Set max date for date inputs to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('lostDate')?.setAttribute('max', today);
document.getElementById('foundDate')?.setAttribute('max', today);

// Photo preview functionality
function setupPhotoPreview(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 5) {
            alert('Maximum 5 photos allowed');
            input.value = '';
            return;
        }

        // Could add preview functionality here
        console.log(`${files.length} photo(s) selected`);
    });
}

setupPhotoPreview('lostPhotos');
setupPhotoPreview('foundPhotos');

// Auto-save form data to prevent loss
function autoSaveForm(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Load saved data
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[id="${key}"]`);
                if (input && input.type !== 'file') {
                    input.value = data[key];
                }
            });
        } catch (e) {
            console.error('Error loading saved form data:', e);
        }
    }

    // Save on input
    form.addEventListener('input', (e) => {
        const formData = {};
        const inputs = form.querySelectorAll('input:not([type="file"]), select, textarea');
        inputs.forEach(input => {
            if (input.id) {
                formData[input.id] = input.value;
            }
        });
        localStorage.setItem(storageKey, JSON.stringify(formData));
    });

    // Clear on submit
    form.addEventListener('submit', () => {
        localStorage.removeItem(storageKey);
    });
}

autoSaveForm('lostPetForm', 'lostPetFormDraft');
autoSaveForm('foundPetForm', 'foundPetFormDraft');

console.log('Lost & Found Pets page loaded successfully');
