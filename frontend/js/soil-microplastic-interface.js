// Soil Microplastic-Root Interface Interference JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCounters();
    initializeChart();
    initializeMechanisms();
    initializeSolutions();
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

// Impact visualization chart
function initializeChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Root Exudation', 'Rhizosphere Chemistry', 'Nutrient Uptake', 'Microbial Activity', 'Plant Growth', 'Soil Fertility'],
            datasets: [{
                label: 'Impact Severity (%)',
                data: [85, 75, 90, 70, 80, 65],
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                borderColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(46, 125, 50, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(46, 125, 50, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Mechanism visualization controls
function initializeMechanisms() {
    const controlButtons = document.querySelectorAll('.control-btn');
    const rootParticles = document.querySelectorAll('.root-particle');

    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');

            // Reset all particles
            rootParticles.forEach(particle => {
                particle.style.transform = 'scale(1)';
                particle.style.opacity = '1';
            });

            // Apply specific action
            switch(action) {
                case 'show-adsorption':
                    showAdsorption();
                    break;
                case 'show-barrier':
                    showBarrier();
                    break;
                case 'show-chemistry':
                    showChemistry();
                    break;
            }
        });
    });
}

function showAdsorption() {
    const microplastic = document.querySelector('.root-particle[data-type="microplastic"]');
    const exudate = document.querySelector('.root-particle[data-type="exudate"]');

    microplastic.style.transform = 'scale(1.5)';
    exudate.style.transform = 'scale(0.5)';
    exudate.style.opacity = '0.5';

    // Animate particles moving closer
    setTimeout(() => {
        microplastic.style.transform = 'scale(1.5) translateX(-20px)';
        exudate.style.transform = 'scale(0.5) translateX(20px)';
    }, 500);
}

function showBarrier() {
    const microplastic = document.querySelector('.root-particle[data-type="microplastic"]');
    const healthy = document.querySelector('.root-particle[data-type="healthy"]');

    microplastic.style.transform = 'scale(2)';
    healthy.style.opacity = '0.3';

    // Show barrier effect
    setTimeout(() => {
        microplastic.style.transform = 'scale(2) rotate(45deg)';
    }, 500);
}

function showChemistry() {
    const particles = document.querySelectorAll('.root-particle');

    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.transform = `scale(${1 + index * 0.2}) rotate(${index * 30}deg)`;
            particle.style.opacity = '0.7';
        }, index * 200);
    });
}

// Solutions interactive functionality
function initializeSolutions() {
    const solutionButtons = document.querySelectorAll('.solution-btn');
    const solutionContents = document.querySelectorAll('.solution-content');

    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Remove active class from all buttons and contents
            solutionButtons.forEach(btn => btn.classList.remove('active'));
            solutionContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.querySelector(`.solution-content[data-category="${category}"]`).classList.add('active');
        });
    });
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
document.querySelectorAll('.info-card, .mechanism-item, .impact-card').forEach(card => {
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
`;
document.head.appendChild(style);

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    }
}

window.addEventListener('load', logPerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send to error reporting service
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels where needed
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
}

improveAccessibility();

// Export functions for potential reuse
window.SoilMicroplasticInterface = {
    initializeTabs,
    initializeCounters,
    initializeChart,
    initializeMechanisms,
    initializeSolutions
};