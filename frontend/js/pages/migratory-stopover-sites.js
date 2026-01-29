// ========== MIGRATORY STOPOVER SITES PAGE JAVASCRIPT ==========

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Initialize all components
    initializeHeroStats();
    initializeFeatureCards();
    initializeThreatCards();
    initializeSolutionCards();
    initializeScrollEffects();
    initializeCTAAnimations();
});

// ========== HERO STATS COUNTER ==========
function initializeHeroStats() {
    const statItems = document.querySelectorAll('.hero-stats .stat-item');

    statItems.forEach((item, index) => {
        const statNumber = item.querySelector('.stat-number');
        const targetValue = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
        const suffix = statNumber.textContent.replace(/[0-9]/g, '');

        // Animate counter on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(statNumber, 0, targetValue, 2000, suffix);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(item);
    });
}

function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const endTime = startTime + duration;

    function updateCounter(currentTime) {
        if (currentTime < endTime) {
            const progress = (currentTime - startTime) / duration;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const currentValue = Math.floor(start + (end - start) * easeOutProgress);
            element.textContent = currentValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + suffix;
        }
    }

    requestAnimationFrame(updateCounter);
}

// ========== FEATURE CARDS INTERACTIONS ==========
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach((card, index) => {
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click animations
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
}

// ========== THREAT CARDS INTERACTIONS ==========
function initializeThreatCards() {
    const threatCards = document.querySelectorAll('.threat-card');

    threatCards.forEach((card, index) => {
        // Stagger animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';

        observer.observe(card);
    });
}

// ========== SOLUTION CARDS INTERACTIONS ==========
function initializeSolutionCards() {
    const solutionCards = document.querySelectorAll('.solution-card');

    solutionCards.forEach((card, index) => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.offsetX - 10) + 'px';
            ripple.style.top = (e.offsetY - 10) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroOverlay = document.querySelector('.hero-overlay');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (heroOverlay) {
            heroOverlay.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });

    // Fade in sections on scroll
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// ========== CTA ANIMATIONS ==========
function initializeCTAAnimations() {
    const ctaSection = document.querySelector('.cta-section');
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');

    if (ctaSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate buttons with stagger
                    ctaButtons.forEach((button, index) => {
                        setTimeout(() => {
                            button.style.opacity = '1';
                            button.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Initial state for buttons
        ctaButtons.forEach(button => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.style.transition = 'all 0.6s ease';
        });

        observer.observe(ctaSection);
    }
}

// ========== RESPONSIVE ADJUSTMENTS ==========
function handleResponsiveAdjustments() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Adjust animations for mobile
        const cards = document.querySelectorAll('.feature-card, .threat-card, .solution-card');
        cards.forEach(card => {
            card.style.transition = 'transform 0.3s ease';
        });
    }
}

// Initialize responsive adjustments
window.addEventListener('resize', handleResponsiveAdjustments);
handleResponsiveAdjustments();

// ========== ACCESSIBILITY IMPROVEMENTS ==========
function initializeAccessibility() {
    // Add focus indicators for interactive elements
    const interactiveElements = document.querySelectorAll('.feature-card, .threat-card, .solution-card, .btn');

    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #22c55e';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Keyboard navigation for cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('feature-card') ||
                focusedElement.classList.contains('threat-card') ||
                focusedElement.classList.contains('solution-card')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });
}

// Initialize accessibility features
initializeAccessibility();