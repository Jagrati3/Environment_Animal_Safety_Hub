// Urban Green Roofs Ecological Filters JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTabs();
    initializeCounters();
    initializeCharts();
    initializeDesignOptimizer();
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
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Animated counters for hero stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100; // Adjust speed here
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

        // Start animation when element comes into view
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

// Biodiversity trends chart
function initializeCharts() {
    const ctx = document.getElementById('biodiversityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Plant Species',
                data: [15, 22, 28, 32, 35],
                borderColor: '#2d5a3d',
                backgroundColor: 'rgba(45, 90, 61, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Invertebrates',
                data: [8, 15, 25, 35, 42],
                borderColor: '#f4a261',
                backgroundColor: 'rgba(244, 162, 97, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Bird Species',
                data: [2, 3, 5, 7, 9],
                borderColor: '#6b9e78',
                backgroundColor: 'rgba(107, 158, 120, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Biodiversity Development Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Species'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time After Installation'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Design optimizer functionality
function initializeDesignOptimizer() {
    const sizeSlider = document.getElementById('roof-size');
    const depthSlider = document.getElementById('substrate-depth');
    const nativeSlider = document.getElementById('native-species');
    const connectivitySelect = document.getElementById('connectivity-level');

    const sizeValue = document.getElementById('size-value');
    const depthValue = document.getElementById('depth-value');
    const nativeValue = document.getElementById('native-value');
    const biodiversityScore = document.getElementById('biodiversity-score');
    const scoreFill = document.getElementById('score-fill');
    const recommendations = document.getElementById('recommendations');

    function updateValues() {
        sizeValue.textContent = sizeSlider.value + ' m²';
        depthValue.textContent = depthSlider.value + ' cm';
        nativeValue.textContent = nativeSlider.value + '%';
    }

    function calculateScore() {
        const size = parseInt(sizeSlider.value);
        const depth = parseInt(depthSlider.value);
        const native = parseInt(nativeSlider.value);
        const connectivity = connectivitySelect.value;

        // Scoring algorithm (simplified)
        let score = 0;

        // Size factor (larger is better, but diminishing returns)
        score += Math.min(size / 10, 20);

        // Depth factor (deeper substrate supports more diversity)
        score += (depth / 50) * 25;

        // Native species factor
        score += (native / 100) * 30;

        // Connectivity factor
        const connectivityBonus = {
            'isolated': 0,
            'connected': 15,
            'networked': 25
        };
        score += connectivityBonus[connectivity];

        // Ensure score is between 0 and 100
        score = Math.max(0, Math.min(100, score));

        return Math.round(score);
    }

    function updateScore() {
        const score = calculateScore();
        biodiversityScore.textContent = score;
        scoreFill.style.width = score + '%';

        // Update recommendations based on score
        let recommendation = '';
        if (score < 40) {
            recommendation = 'Consider increasing substrate depth and native species percentage for better biodiversity.';
        } else if (score < 70) {
            recommendation = 'Good foundation! Adding connectivity features could significantly improve the ecological value.';
        } else {
            recommendation = 'Excellent design! This green roof should support diverse and sustainable ecosystems.';
        }
        recommendations.innerHTML = '<p>' + recommendation + '</p>';
    }

    function updateScoreColor() {
        const score = calculateScore();
        if (score < 40) {
            scoreFill.style.background = 'linear-gradient(90deg, #dc3545, #fd7e14)';
        } else if (score < 70) {
            scoreFill.style.background = 'linear-gradient(90deg, #f4a261, #2a9d8f)';
        } else {
            scoreFill.style.background = 'linear-gradient(90deg, #2a9d8f, #1b4332)';
        }
    }

    // Event listeners
    sizeSlider.addEventListener('input', () => {
        updateValues();
        updateScore();
        updateScoreColor();
    });

    depthSlider.addEventListener('input', () => {
        updateValues();
        updateScore();
        updateScoreColor();
    });

    nativeSlider.addEventListener('input', () => {
        updateValues();
        updateScore();
        updateScoreColor();
    });

    connectivitySelect.addEventListener('change', () => {
        updateScore();
        updateScoreColor();
    });

    // Initialize
    updateValues();
    updateScore();
    updateScoreColor();
}

// Smooth scrolling for navigation links
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

// Add loading animation for tab content
function addLoadingAnimation() {
    const tabContents = document.querySelectorAll('.tab-content');

    tabContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Trigger animation when tab becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(20px)';
                }
            }
        });
    });

    tabContents.forEach(content => {
        observer.observe(content, { attributes: true });
    });
}

// Initialize loading animation
addLoadingAnimation();

// Add hover effects for interactive elements
document.querySelectorAll('.species-item, .roof-type, .policy-item, .case-study').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click tracking for analytics (placeholder)
document.querySelectorAll('.tab-button, .cta-btn').forEach(button => {
    button.addEventListener('click', function() {
        // In a real application, you would send this data to analytics
        console.log('Button clicked:', this.textContent.trim());
    });
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels where needed
    document.querySelectorAll('.tab-button').forEach(button => {
        const tabId = button.dataset.tab;
        button.setAttribute('aria-controls', tabId);
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });

    // Update ARIA selected when tabs change
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            button.setAttribute('aria-selected', 'true');
        });
    });

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-button.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-button'));
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
}

// Initialize accessibility improvements
improveAccessibility();

// Performance optimization: Lazy load chart
let chartLoaded = false;
function lazyLoadChart() {
    if (!chartLoaded) {
        const chartContainer = document.querySelector('.trends-chart');
        if (chartContainer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Chart is already initialized in initializeCharts()
                        chartLoaded = true;
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(chartContainer);
        }
    }
}

// Initialize lazy loading
lazyLoadChart();