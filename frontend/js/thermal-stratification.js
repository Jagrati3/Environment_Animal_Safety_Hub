// Thermal Stratification in Freshwater Lakes JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCounters();
    initializeOxygenChart();
    initializeSeasonalAnimation();
    initializeImpacts();
    initializeStratificationLayers();
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

// Oxygen dynamics chart
function initializeOxygenChart() {
    const ctx = document.getElementById('oxygenChart');
    if (!ctx) return;

    const data = {
        labels: ['Surface (Epilimnion)', 'Thermocline', 'Bottom (Hypolimnion)'],
        datasets: [{
            label: 'Oxygen Concentration (mg/L)',
            data: [8.5, 2.0, 0.5],
            backgroundColor: [
                'rgba(66, 165, 245, 0.8)',
                'rgba(255, 152, 0, 0.8)',
                'rgba(97, 97, 97, 0.8)'
            ],
            borderColor: [
                'rgba(66, 165, 245, 1)',
                'rgba(255, 152, 0, 1)',
                'rgba(97, 97, 97, 1)'
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Oxygen Concentration (mg/L)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Oxygen: ${context.parsed.y} mg/L`;
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Seasonal stratification animation
function initializeSeasonalAnimation() {
    const seasons = document.querySelectorAll('.season');
    const lakeLayers = document.querySelector('.lake-layers');

    seasons.forEach(season => {
        season.addEventListener('click', () => {
            // Remove active class from all seasons
            seasons.forEach(s => s.classList.remove('active'));
            season.classList.add('active');

            // Animate lake layers based on season
            const seasonType = season.textContent.toLowerCase().split(' ')[0];

            switch(seasonType) {
                case 'summer':
                    animateStratification('strong');
                    break;
                case 'fall':
                    animateStratification('breaking');
                    break;
                case 'winter':
                    animateStratification('mixed');
                    break;
                case 'spring':
                    animateStratification('breaking');
                    break;
            }
        });
    });
}

function animateStratification(type) {
    const layers = document.querySelectorAll('.layer');

    layers.forEach(layer => {
        layer.style.transition = 'all 0.8s ease';
    });

    switch(type) {
        case 'strong':
            // Strong stratification - clear layers
            layers[0].style.opacity = '1'; // epilimnion
            layers[1].style.opacity = '1'; // thermocline
            layers[2].style.opacity = '1'; // hypolimnion
            layers[1].style.height = '20%'; // thermocline
            break;
        case 'breaking':
            // Breaking stratification - mixing
            layers[0].style.opacity = '0.7';
            layers[1].style.opacity = '0.3';
            layers[2].style.opacity = '0.7';
            layers[1].style.height = '10%';
            break;
        case 'mixed':
            // Mixed - uniform appearance
            layers[0].style.opacity = '0.8';
            layers[1].style.opacity = '0.1';
            layers[2].style.opacity = '0.8';
            layers[1].style.height = '5%';
            break;
    }
}

// Impacts interactive functionality
function initializeImpacts() {
    const impactButtons = document.querySelectorAll('.impact-btn');
    const impactContents = document.querySelectorAll('.impact-content');

    impactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const impact = button.getAttribute('data-impact');

            // Remove active class from all buttons and contents
            impactButtons.forEach(btn => btn.classList.remove('active'));
            impactContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.querySelector(`.impact-content[data-impact="${impact}"]`).classList.add('active');
        });
    });
}

// Stratification layers interaction
function initializeStratificationLayers() {
    const layers = document.querySelectorAll('.layer');

    layers.forEach(layer => {
        layer.addEventListener('mouseenter', function() {
            // Highlight the layer
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';

            // Show tooltip with information
            showLayerTooltip(this);
        });

        layer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
            hideLayerTooltip();
        });
    });
}

function showLayerTooltip(layer) {
    const existingTooltip = document.querySelector('.layer-tooltip');
    if (existingTooltip) existingTooltip.remove();

    const layerName = layer.querySelector('h3').textContent;
    let tooltipText = '';

    switch(layerName) {
        case 'Epilimnion':
            tooltipText = 'Warm surface layer with high oxygen and light. Primary production zone.';
            break;
        case 'Thermocline':
            tooltipText = 'Zone of rapid temperature change. Acts as a barrier to mixing.';
            break;
        case 'Hypolimnion':
            tooltipText = 'Cold bottom layer with low oxygen. Nutrient accumulation zone.';
            break;
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'layer-tooltip';
    tooltip.textContent = tooltipText;

    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '0.9rem';
    tooltip.style.maxWidth = '200px';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = layer.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideLayerTooltip() {
    const tooltip = document.querySelector('.layer-tooltip');
    if (tooltip) tooltip.remove();
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
document.querySelectorAll('.info-card, .mechanism-card, .consequence-item, .solution-phase').forEach(card => {
    observer.observe(card);
});

// Add CSS for animations
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

    .layer-tooltip {
        animation: fadeInTooltip 0.3s ease;
    }

    @keyframes fadeInTooltip {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
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

    // Add ARIA labels for impact buttons
    document.querySelectorAll('.impact-btn').forEach(button => {
        const impact = button.getAttribute('data-impact');
        button.setAttribute('aria-controls', `impact-${impact}`);
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });

    // Update ARIA when impacts change
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('impact-btn')) {
            document.querySelectorAll('.impact-btn').forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
            });
            e.target.setAttribute('aria-selected', 'true');
        }
    });
}

improveAccessibility();

// Data visualization for stratification intensity
function createStratificationIntensityChart() {
    // This could be expanded to show historical data or predictions
    const intensityData = {
        labels: ['1980s', '1990s', '2000s', '2010s', '2020s'],
        datasets: [{
            label: 'Stratification Intensity Index',
            data: [2.1, 2.4, 2.8, 3.2, 3.8],
            borderColor: 'rgba(25, 118, 210, 1)',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    // This could be displayed in a modal or additional section
    console.log('Stratification intensity data:', intensityData);
}

// Initialize additional features
createStratificationIntensityChart();

// Export functions for potential reuse
window.ThermalStratification = {
    initializeTabs,
    initializeCounters,
    initializeOxygenChart,
    initializeSeasonalAnimation,
    initializeImpacts,
    initializeStratificationLayers
};