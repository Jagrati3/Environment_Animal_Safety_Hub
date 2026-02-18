// Artificial Nighttime Cooling Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCoolingPage();
});

function initializeCoolingPage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Action button functions
function learnMore() {
    // Open educational resources about microclimate engineering
    const learnUrl = 'https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/microclimate';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening scientific resources on agricultural microclimate engineering!', 'info');
}

function supportResearch() {
    // Open research funding or collaboration opportunities
    const researchUrl = 'https://www.nsf.gov/funding/';
    window.open(researchUrl, '_blank');

    // Show information about supporting research
    showNotification('Opening National Science Foundation research funding opportunities!', 'info');
}

function findAlternatives() {
    // Open sustainable agriculture resources
    const alternativesUrl = 'https://www.sare.org/';
    window.open(alternativesUrl, '_blank');

    // Show information about alternatives
    showNotification('Opening Sustainable Agriculture Research & Education resources!', 'info');
}

// Interactive functions for detailed impact information
function showImpactDetails(impact) {
    const impacts = {
        'wildlife-behavior': {
            title: 'Wildlife Behavior Disruption',
            content: `
                <h4>Thermal Gradient Effects</h4>
                <p>Cooling zones create artificial thermal refuges that alter normal wildlife movement patterns and habitat use.</p>

                <h4>Behavioral Changes</h4>
                <ul>
                    <li><strong>Nocturnal Activity:</strong> Altered activity patterns as animals are drawn to or repelled by cooled areas</li>
                    <li><strong>Foraging Patterns:</strong> Changes in food availability and predator-prey dynamics</li>
                    <li><strong>Reproductive Timing:</strong> Potential disruption of breeding cycles due to temperature cues</li>
                    <li><strong>Migration Routes:</strong> Cooling oases may create artificial stopover sites</li>
                </ul>

                <h4>Species-Specific Impacts</h4>
                <p>Different species respond variably - some nocturnal animals benefit from cooling while diurnal species may be negatively affected.</p>
            `
        },
        'insect-populations': {
            title: 'Insect Population Shifts',
            content: `
                <h4>Microclimate Preferences</h4>
                <p>Cooling systems create temperature conditions that favor certain insect species over others, altering community composition.</p>

                <h4>Ecosystem Services Impact</h4>
                <ul>
                    <li><strong>Pollination:</strong> Changes in pollinator abundance and diversity affect crop yields</li>
                    <li><strong>Pest Control:</strong> Natural predator populations may decline in cooled areas</li>
                    <li><strong>Food Web Disruption:</strong> Altered insect availability affects birds and other insectivores</li>
                    <li><strong>Biodiversity Loss:</strong> Some species unable to tolerate cooled microclimates</li>
                </ul>

                <h4>Agricultural Implications</h4>
                <p>While cooling benefits crops, it may inadvertently increase pest pressure by disrupting natural biological control mechanisms.</p>
            `
        },
        'plant-communities': {
            title: 'Plant Community Changes',
            content: `
                <h4>Competitive Advantages</h4>
                <p>Cooling alters competitive relationships between plant species, potentially favoring invasive or weedy species.</p>

                <h4>Vegetation Shifts</h4>
                <ul>
                    <li><strong>Species Composition:</strong> Native plants may be outcompeted by species adapted to cooler conditions</li>
                    <li><strong>Phenology Changes:</strong> Altered flowering and fruiting times affect wildlife food availability</li>
                    <li><strong>Seed Dispersal:</strong> Changes in plant communities affect animal seed dispersal patterns</li>
                    <li><strong>Habitat Structure:</strong> Modified vegetation structure impacts habitat quality for wildlife</li>
                </ul>

                <h4>Long-term Consequences</h4>
                <p>Persistent cooling may lead to permanent changes in local plant communities and associated wildlife habitats.</p>
            `
        },
        'soil-moisture': {
            title: 'Soil Moisture Dynamics',
            content: `
                <h4>Humidity and Dew Formation</h4>
                <p>Cooling increases atmospheric humidity and dew formation, altering soil moisture patterns in surrounding areas.</p>

                <h4>Soil Ecosystem Effects</h4>
                <ul>
                    <li><strong>Microbial Activity:</strong> Changes in soil temperature and moisture affect decomposition and nutrient cycling</li>
                    <li><strong>Earthworm Populations:</strong> Altered soil conditions may affect beneficial soil organisms</li>
                    <li><strong>Nutrient Availability:</strong> Modified microbial activity changes nutrient release patterns</li>
                    <li><strong>Soil Structure:</strong> Changes in moisture affect soil aggregation and root penetration</li>
                </ul>

                <h4>Agricultural Edge Effects</h4>
                <p>Areas adjacent to cooled fields may experience different soil conditions, creating management challenges for farmers.</p>
            `
        },
        'migratory-patterns': {
            title: 'Migratory Pattern Disruption',
            content: `
                <h4>Artificial Stopover Sites</h4>
                <p>Cooling creates thermal refuges that may attract migratory species, potentially altering traditional migration routes.</p>

                <h4>Migration Impacts</h4>
                <ul>
                    <li><strong>Route Alteration:</strong> Migrants may be drawn off traditional pathways to cooling oases</li>
                    <li><strong>Stopover Duration:</strong> Extended stays in cooled areas may delay migration timing</li>
                    <li><strong>Energy Expenditure:</strong> Detours to cooling areas increase migration costs</li>
                    <li><strong>Population Connectivity:</strong> Altered routes may affect gene flow between populations</li>
                </ul>

                <h4>Conservation Concerns</h4>
                <p>While cooling may benefit some migrants, it could disrupt carefully evolved migration strategies adapted to natural conditions.</p>
            `
        },
        'predator-prey': {
            title: 'Predator-Prey Dynamics',
            content: `
                <h4>Temperature-Dependent Interactions</h4>
                <p>Cooling affects the metabolic rates and activity patterns of both predators and prey, altering interaction dynamics.</p>

                <h4>Food Web Changes</h4>
                <ul>
                    <li><strong>Metabolic Shifts:</strong> Different species respond differently to temperature changes</li>
                    <li><strong>Activity Patterns:</strong> Nocturnal species may become more active in cooled areas</li>
                    <li><strong>Hunting Success:</strong> Altered visibility and prey behavior affect predation rates</li>
                    <li><strong>Population Balance:</strong> Shifts in predator-prey ratios can destabilize ecosystems</li>
                </ul>

                <h4>Cascade Effects</h4>
                <p>Changes in predator-prey dynamics can ripple through entire food webs, affecting biodiversity and ecosystem stability.</p>
            `
        }
    };

    const details = impacts[impact];
    if (details) {
        showModal(details.title, details.content);
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'info' ? '#20B2AA' : '#2E8B57',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '1000',
        maxWidth: '300px',
        fontSize: '0.9rem'
    });

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showModal(title, content) {
    // Create modal for detailed information
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <div class="modal-body">
                ${content}
            </div>
            <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">Close</button>
        </div>
    `;

    // Style the modal
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    });

    const modalContent = modal.querySelector('.modal-content');
    Object.assign(modalContent.style, {
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
    });

    const closeBtn = modal.querySelector('.close-modal');
    Object.assign(closeBtn.style, {
        background: '#2E8B57',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '1rem'
    });

    const modalBody = modal.querySelector('.modal-body');
    Object.assign(modalBody.style, {
        margin: '1rem 0',
        lineHeight: '1.6'
    });

    document.body.appendChild(modal);
}