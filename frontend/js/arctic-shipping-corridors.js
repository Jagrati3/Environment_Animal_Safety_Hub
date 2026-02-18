// Arctic Shipping Corridors JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCounters();
    initializeTrafficChart();
    initializeFragmentationAnimation();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Animated counters for hero stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Traffic projections chart
function initializeTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2025', '2030', '2035', '2040'],
            datasets: [{
                label: 'Northern Sea Route (Vessels)',
                data: [25, 45, 80, 120, 160],
                borderColor: 'rgba(21, 101, 192, 1)',
                backgroundColor: 'rgba(21, 101, 192, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Northwest Passage (Vessels)',
                data: [5, 15, 35, 60, 90],
                borderColor: 'rgba(66, 165, 245, 1)',
                backgroundColor: 'rgba(66, 165, 245, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Vessels'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Fragmentation barrier animation
function initializeFragmentationAnimation() {
    const diagram = document.querySelector('.barrier-diagram');
    if (!diagram) return;

    let animationRunning = false;

    function animateBarrier() {
        if (animationRunning) return;
        animationRunning = true;

        const shippingLane = diagram.querySelector('.shipping-lane');
        const leftPop = diagram.querySelector('.species-population.left');
        const rightPop = diagram.querySelector('.species-population.right');

        // Animate shipping lane expansion
        shippingLane.style.width = '6px';
        shippingLane.style.background = '#ff4444';

        // Animate population separation
        leftPop.style.transform = 'translateX(-20px) scale(0.9)';
        rightPop.style.transform = 'translateX(20px) scale(0.9)';

        // Reset after animation
        setTimeout(() => {
            shippingLane.style.width = '4px';
            shippingLane.style.background = 'var(--danger-color)';
            leftPop.style.transform = 'translateX(0) scale(1)';
            rightPop.style.transform = 'translateX(0) scale(1)';
            animationRunning = false;
        }, 2000);
    }

    // Auto-animate every 5 seconds
    setInterval(animateBarrier, 5000);

    // Allow manual trigger on click
    diagram.addEventListener('click', animateBarrier);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.route, .impact-item, .species-card, .solution-card, .case-study').forEach(card => {
    observer.observe(card);
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideUp 0.6s ease-out forwards;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .route, .impact-item, .species-card, .solution-card, .case-study {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .route.animate-in, .impact-item.animate-in, .species-card.animate-in,
    .solution-card.animate-in, .case-study.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Route highlighting on hover
document.querySelectorAll('.route').forEach(route => {
    route.addEventListener('mouseenter', function() {
        this.style.borderLeftColor = '#42a5f5';
        this.style.transform = 'translateY(-5px)';
    });

    route.addEventListener('mouseleave', function() {
        this.style.borderLeftColor = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });
});

// Impact item interactions
document.querySelectorAll('.impact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.impact-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.impact-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Species card interactions
document.querySelectorAll('.species-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.species-icon');
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.species-icon');
        icon.style.transform = 'scale(1)';
    });
});

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Arctic Shipping Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    }
}

window.addEventListener('load', logPerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Arctic Shipping page error:', e.error);
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('.tab-button').forEach(button => {
        const tabId = button.getAttribute('data-tab');
        button.setAttribute('aria-controls', tabId);
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });

    // Update ARIA when tabs change
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button')) {
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
            });
            e.target.setAttribute('aria-selected', 'true');
        }
    });

    // Add alt text for icons
    document.querySelectorAll('.impact-icon, .species-icon').forEach(icon => {
        const altText = icon.textContent;
        icon.setAttribute('aria-label', altText);
        icon.setAttribute('role', 'img');
    });
}

improveAccessibility();

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    const activeTab = document.querySelector('.tab-button.active');
    const allTabs = Array.from(document.querySelectorAll('.tab-button'));

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = allTabs.indexOf(activeTab);
        let newIndex;

        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
        } else {
            newIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
        }

        allTabs[newIndex].click();
    }
});

// Export functions for potential reuse
window.ArcticShippingInterface = {
    initializeTabs,
    initializeCounters,
    initializeTrafficChart,
    initializeFragmentationAnimation
};