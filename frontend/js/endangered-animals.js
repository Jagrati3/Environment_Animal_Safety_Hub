// Import species data
let speciesData = [];
let filteredData = [];

// Load species data
async function loadSpeciesData() {
    try {
        // Import the data module
        const module = await import('../assets/data/endangered-species.js');
        speciesData = module.endangeredSpeciesData;
        filteredData = [...speciesData];
        
        // Initialize the page
        initializePage();
    } catch (error) {
        console.error('Error loading species data:', error);
        // Fallback to inline data if import fails
        loadInlineData();
    }
}

// Fallback inline data loader
function loadInlineData() {
    // Species data will be loaded from the external file
    // This is a fallback if module import fails
    const script = document.createElement('script');
    script.src = '../assets/data/endangered-species.js';
    script.onload = () => {
        if (window.endangeredSpeciesData) {
            speciesData = window.endangeredSpeciesData;
            filteredData = [...speciesData];
            initializePage();
        }
    };
    document.head.appendChild(script);
}

// Initialize page
function initializePage() {
    updateStatistics();
    displaySpecies(filteredData);
    setupEventListeners();
}

// Update hero statistics
function updateStatistics() {
    const criticalCount = speciesData.filter(s => s.status === 'CR').length;
    const endangeredCount = speciesData.filter(s => s.status === 'EN').length;
    const vulnerableCount = speciesData.filter(s => s.status === 'VU').length;
    
    document.getElementById('criticallyEndangeredCount').textContent = criticalCount;
    document.getElementById('endangeredCount').textContent = endangeredCount;
    document.getElementById('vulnerableCount').textContent = vulnerableCount;
}

// Display species cards
function displaySpecies(data) {
    const grid = document.getElementById('speciesGrid');
    const noResults = document.getElementById('noResults');
    const displayCount = document.getElementById('displayCount');
    
    displayCount.textContent = data.length;
    
    if (data.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    grid.innerHTML = '';
    
    data.forEach(species => {
        const card = createSpeciesCard(species);
        grid.appendChild(card);
    });
}

// Create species card element
function createSpeciesCard(species) {
    const card = document.createElement('div');
    card.className = 'species-card';
    card.setAttribute('data-status', species.status);
    card.setAttribute('data-habitat', species.habitat);
    
    const statusInfo = getStatusInfo(species.status);
    
    card.innerHTML = `
        <div class="card-header">
            <span class="species-icon">${species.image}</span>
            <div class="species-names">
                <h3 class="common-name">${species.commonName}</h3>
                <p class="scientific-name">${species.scientificName}</p>
            </div>
            <span class="status-badge" style="background-color: ${statusInfo.color}">
                ${statusInfo.label}
            </span>
        </div>
        
        <div class="card-body">
            <div class="info-row">
                <i class="fas fa-users"></i>
                <div class="info-content">
                    <div class="info-label">Population</div>
                    <div class="info-value">${species.population}</div>
                </div>
            </div>
            
            <div class="info-row">
                <i class="fas fa-map-marker-alt"></i>
                <div class="info-content">
                    <div class="info-label">Geographic Range</div>
                    <div class="info-value">${species.geographicRange}</div>
                </div>
            </div>
            
            <div class="info-row">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="info-content">
                    <div class="info-label">Primary Threats</div>
                    <div class="threats-list">
                        ${species.threats.map(threat => 
                            `<span class="threat-tag">${threat}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            <div class="fun-fact">
                <div class="fun-fact-title">
                    <i class="fas fa-lightbulb"></i>
                    <span>Did You Know?</span>
                </div>
                <p class="fun-fact-text">${species.funFact}</p>
            </div>
        </div>
        
        <div class="card-footer">
            <button class="support-btn" onclick="supportConservation('${species.commonName}')">
                <i class="fas fa-heart"></i>
                Support Conservation
            </button>
        </div>
    `;
    
    return card;
}

// Get status information
function getStatusInfo(status) {
    const statusConfig = {
        CR: {
            label: "Critically Endangered",
            color: "#ef5350"
        },
        EN: {
            label: "Endangered",
            color: "#ff7043"
        },
        VU: {
            label: "Vulnerable",
            color: "#ffa726"
        }
    };
    
    return statusConfig[status] || statusConfig.VU;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(filterSpecies, 300));
    
    // Filter dropdowns
    const statusFilter = document.getElementById('statusFilter');
    const habitatFilter = document.getElementById('habitatFilter');
    
    statusFilter.addEventListener('change', filterSpecies);
    habitatFilter.addEventListener('change', filterSpecies);
    
    // Reset button
    const resetBtn = document.getElementById('resetFilters');
    resetBtn.addEventListener('click', resetFilters);
}

// Filter species based on search and filters
function filterSpecies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const habitatFilter = document.getElementById('habitatFilter').value;
    
    filteredData = speciesData.filter(species => {
        // Search filter
        const matchesSearch = 
            species.commonName.toLowerCase().includes(searchTerm) ||
            species.scientificName.toLowerCase().includes(searchTerm) ||
            species.geographicRange.toLowerCase().includes(searchTerm);
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || species.status === statusFilter;
        
        // Habitat filter
        const matchesHabitat = habitatFilter === 'all' || species.habitat === habitatFilter;
        
        return matchesSearch && matchesStatus && matchesHabitat;
    });
    
    displaySpecies(filteredData);
}

// Reset all filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('habitatFilter').value = 'all';
    
    filteredData = [...speciesData];
    displaySpecies(filteredData);
}

// Support conservation button handler
function supportConservation(speciesName) {
    // Show confirmation message
    const message = `Thank you for your interest in supporting ${speciesName} conservation! Redirecting to donation page...`;
    
    if (confirm(message)) {
        // Redirect to donation page with species parameter
        window.location.href = `./donate.html?species=${encodeURIComponent(speciesName)}`;
    }
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', () => {
    // Load species data when page loads
    loadSpeciesData();
    
    // Smooth scroll for anchor links
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
    
    // Add scroll animation for cards
    observeElements();
});

// Intersection Observer for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards when they're added to the DOM
    const observeCards = () => {
        document.querySelectorAll('.species-card').forEach(card => {
            observer.observe(card);
        });
    };
    
    // Use MutationObserver to watch for new cards
    const gridObserver = new MutationObserver(observeCards);
    const grid = document.getElementById('speciesGrid');
    
    if (grid) {
        gridObserver.observe(grid, {
            childList: true
        });
    }
}

// Export functions for use in HTML
window.supportConservation = supportConservation;
