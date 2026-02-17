/**
 * Masthead/About Page JavaScript
 *
 * Dynamic content loading for the project masthead page with GitHub API integration.
 * Displays project contributors, admin profiles, and mentor information with
 * smooth animations and fallback handling for API failures.
 *
 * Features:
 * - GitHub API integration for real-time contributor data
 * - Intersection Observer for scroll-triggered animations
 * - Dynamic profile loading for project admin and mentor
 * - Graceful fallback handling for API rate limits
 * - Smooth scrolling navigation
 * - Responsive contributor cards with staggered animations
 * - Accessibility features and keyboard navigation
 *
 * API Integration:
 * - GitHub Contributors API for project contributors
 * - GitHub User API for admin/mentor profiles
 * - Rate limit handling with fallback content
 * - Error handling for network issues
 *
 * Animations:
 * - Intersection Observer for reveal animations
 * - Staggered loading animations for contributor cards
 * - Smooth scroll behavior for navigation
 * - CSS transitions with JavaScript delays
 *
 * @author Environment Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 * @requires IntersectionObserver API
 * @requires Fetch API
 */

// ===== INITIALIZATION =====
/**
 * Initialize masthead page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeMasthead();
});

/**
 * Initialize masthead page when DOM is loaded (duplicate handler for safety)
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeExploreButton();
});

// ===== MAIN INITIALIZATION FUNCTION =====
/**
 * Initialize all masthead functionality
 * Sets up animations, API calls, and navigation
 */
function initializeMasthead() {
    // Mark body as loaded for safe animations
    document.body.classList.add('js-loaded');

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize GitHub API calls
    initializeGitHubIntegration();
}

// ===== SCROLL ANIMATIONS =====
/**
 * Initialize Intersection Observer for scroll-triggered animations
 * Handles reveal animations for elements as they enter viewport
 */
function initializeScrollAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe existing reveal elements
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Return helper function for dynamic elements
    return (el, delay = 0) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${delay}s`;
        revealObserver.observe(el);
    };
}

// ===== GITHUB API INTEGRATION =====
/**
 * Initialize GitHub API integration for contributors and profiles
 */
function initializeGitHubIntegration() {
    // Fetch contributors list
    fetchContributors();

    // Fetch admin and mentor profiles
    fetchProfile('Jagrati3', 'admin-card', 'Project Admin');
    fetchProfile('nikhilrsingh', 'mentor-card', 'Project Mentor');
}

// ===== CONTRIBUTORS FETCHING =====
/**
 * Fetch project contributors from GitHub API
 * Displays top 10 contributors with their commit counts and profiles
 */
async function fetchContributors() {
    const contributorsBox = document.getElementById('contributors');
    if (!contributorsBox) return;

    try {
        const response = await fetch('https://api.github.com/repos/Jagrati3/Environment_Animal_Safety_Hub/contributors');

        if (!response.ok) {
            throw new Error('API Limit or Network Error');
        }

        const contributors = await response.json();

        // Clear existing content
        contributorsBox.innerHTML = '';

        // Create contributor cards (limit to 10)
        contributors.slice(0, 10).forEach((contributor, index) => {
            const contributorCard = createContributorCard(contributor, index);
            contributorsBox.appendChild(contributorCard);
        });

    } catch (error) {
        console.warn('Contributor fetch failed, showing fallback:', error.message);
        showContributorsFallback(contributorsBox);
    }
}

/**
 * Create a contributor card element
 * @param {Object} contributor - GitHub contributor data
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} Contributor card element
 */
function createContributorCard(contributor, index) {
    const card = document.createElement('div');
    card.className = 'contributor';
    card.innerHTML = `
        <img src="${contributor.avatar_url}" alt="${contributor.login} avatar">
        <h4>${contributor.login}</h4>
        <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">
            ${contributor.contributions} Commits
        </p>
        <a href="${contributor.html_url}"
           target="_blank"
           rel="noopener noreferrer external"
           class="github-btn">
            <i class="fa-brands fa-github"></i> Profile
        </a>
    `;

    // Add reveal animation with delay
    card.classList.add('reveal');
    card.style.transitionDelay = `${index * 0.1}s`;

    return card;
}

/**
 * Show fallback content when contributors API fails
 * @param {HTMLElement} container - Container element for fallback content
 */
function showContributorsFallback(container) {
    container.innerHTML = `
        <div class="contributor">
            <i class="fa-solid fa-users" style="font-size: 3rem; color: #ccc; margin: 20px 0;"></i>
            <p>Contributors list unavailable currently.</p>
            <a href="https://github.com/Jagrati3/Environment_Animal_Safety_Hub/graphs/contributors"
               target="_blank"
               rel="noopener noreferrer external"
               class="github-btn">
                View on GitHub
            </a>
        </div>
    `;

    // Add animation to fallback content
    const fallbackCard = container.children[0];
    fallbackCard.classList.add('reveal');
}

// ===== PROFILE FETCHING =====
/**
 * Fetch GitHub user profile for admin/mentor display
 * @param {string} username - GitHub username
 * @param {string} elementId - DOM element ID for the profile card
 * @param {string} role - User role (Admin/Mentor)
 */
async function fetchProfile(username, elementId, role) {
    const profileCard = document.getElementById(elementId);
    if (!profileCard) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error('User fetch failed');
        }

        const user = await response.json();

        // Update profile card with fetched data
        profileCard.innerHTML = createProfileCardHTML(user, role);

    } catch (error) {
        console.log(`Could not fetch ${username}:`, error.message);
        // Keep existing HTML content as fallback
    }
}

/**
 * Create HTML content for profile card
 * @param {Object} user - GitHub user data
 * @param {string} role - User role display text
 * @returns {string} HTML content for profile card
 */
function createProfileCardHTML(user, role) {
    return `
        <img src="${user.avatar_url}" alt="${user.name || user.login} avatar"
             style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 15px; border: 3px solid #4caf50;">
        <h3 style="margin: 0; font-size: 1.5rem;">${user.name || user.login}</h3>
        <p style="color: #2e7d32; font-weight: 600; margin: 5px 0 15px;">${role}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <a href="${user.html_url}"
               target="_blank"
               rel="noopener noreferrer external"
               class="github-btn">
                <i class="fa-brands fa-github"></i> GitHub
            </a>
        </div>
    `;
}

// ===== NAVIGATION =====
/**
 * Initialize explore button for smooth scrolling to admin section
 */
function initializeExploreButton() {
    const exploreBtn = document.getElementById('explorePeopleBtn');
    const adminSection = document.getElementById('admin');

    if (exploreBtn && adminSection) {
        exploreBtn.addEventListener('click', () => {
            adminSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}