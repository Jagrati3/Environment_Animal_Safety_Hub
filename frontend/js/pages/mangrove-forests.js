// Mangrove Forests Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeMangrovePage();
});

function initializeMangrovePage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Action button functions
function learnMore() {
    // Open educational resources about mangroves
    const learnUrl = 'https://www.worldwildlife.org/places/mangrove-forests';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening World Wildlife Fund mangrove resources. Learn about these vital ecosystems!', 'info');
}

function supportConservation() {
    // Open mangrove conservation organizations
    const conservationUrl = 'https://www.mangrovealliance.org/';
    window.open(conservationUrl, '_blank');

    // Show information about supporting conservation
    showNotification('Opening Mangrove Alliance. Support global mangrove conservation efforts!', 'info');
}

function findRestoration() {
    // Open mangrove restoration project finder
    const restorationUrl = 'https://www.iucn.org/theme/marine-and-polar-species/restoration';
    window.open(restorationUrl, '_blank');

    // Show information about finding restoration projects
    showNotification('Opening IUCN restoration resources. Find mangrove restoration projects to support!', 'info');
}

// Interactive functions for detailed information
function showBiodiversityDetails(species) {
    const biodiversity = {
        'marine-nursery': {
            title: 'Marine Nursery Function',
            content: `
                <h4>Why Mangroves Matter for Fish</h4>
                <p>Mangroves provide essential nursery habitat for over 75% of commercially important fish species in tropical waters.</p>

                <h4>Protection Services</h4>
                <ul>
                    <li><strong>Shelter:</strong> Complex root systems protect juvenile fish from predators</li>
                    <li><strong>Food:</strong> Abundant organic matter and microorganisms provide nutrition</li>
                    <li><strong>Water Quality:</strong> Filtration of pollutants and maintenance of optimal salinity</li>
                    <li><strong>Growth:</strong> Calm waters allow young fish to grow before entering open ocean</li>
                </ul>

                <h4>Economic Impact</h4>
                <p>Healthy mangrove nurseries support fisheries worth billions of dollars annually and provide food security for coastal communities.</p>
            `
        },
        'bird-habitats': {
            title: 'Bird Habitats in Mangroves',
            content: `
                <h4>Bird Species Diversity</h4>
                <p>Over 200 bird species use mangroves, including migratory birds, waders, and resident species.</p>

                <h4>Habitat Functions</h4>
                <ul>
                    <li><strong>Nesting:</strong> Dense canopy provides safe nesting sites</li>
                    <li><strong>Feeding:</strong> Mudflats and waterways offer rich feeding grounds</li>
                    <li><strong>Migration:</strong> Important stopover sites for migratory birds</li>
                    <li><strong>Roosting:</strong> Protection from predators and weather</li>
                </ul>

                <h4>Conservation Importance</h4>
                <p>Mangroves are critical for bird conservation, especially as other wetland habitats are lost to development.</p>
            `
        },
        'invertebrates': {
            title: 'Invertebrate Communities',
            content: `
                <h4>Diverse Invertebrate Life</h4>
                <p>Mangroves support thousands of invertebrate species including crabs, shrimp, mollusks, and insects.</p>

                <h4>Ecological Roles</h4>
                <ul>
                    <li><strong>Decomposers:</strong> Break down organic matter and recycle nutrients</li>
                    <li><strong>Food Source:</strong> Essential food for fish, birds, and mammals</li>
                    <li><strong>Burrowers:</strong> Create channels that oxygenate sediments</li>
                    <li><strong>Bioindicators:</strong> Signal environmental health changes</li>
                </ul>

                <h4>Commercial Value</h4>
                <p>Many invertebrates are harvested for food and aquaculture, supporting local economies.</p>
            `
        }
    };

    const details = biodiversity[species];
    if (details) {
        showModal(details.title, details.content);
    }
}

function showProtectionDetails(type) {
    const protections = {
        'storm-protection': {
            title: 'Storm Protection Services',
            content: `
                <h4>How Mangroves Protect Coasts</h4>
                <p>Mangroves act as natural barriers that reduce the impact of storms, waves, and tidal surges.</p>

                <h4>Protection Mechanisms</h4>
                <ul>
                    <li><strong>Wave Attenuation:</strong> Roots and trunks absorb and dissipate wave energy</li>
                    <li><strong>Drag Effect:</strong> Dense vegetation slows water movement</li>
                    <li><strong>Bank Stabilization:</strong> Roots prevent erosion and land loss</li>
                    <li><strong>Surge Reduction:</strong> Can reduce storm surge height by up to 66%</li>
                </ul>

                <h4>Case Studies</h4>
                <p>During Hurricane Katrina (2005), areas with intact mangroves experienced significantly less damage than deforested areas.</p>
            `
        },
        'erosion-control': {
            title: 'Erosion Control Benefits',
            content: `
                <h4>Soil Stabilization</h4>
                <p>Mangrove root systems create a living barrier that prevents coastal erosion and land loss.</p>

                <h4>Erosion Prevention</h4>
                <ul>
                    <li><strong>Root Binding:</strong> Extensive root networks hold soil in place</li>
                    <li><strong>Sediment Trapping:</strong> Slow water flow allows sediment deposition</li>
                    <li><strong>Land Building:</strong> Can increase land area through sediment accretion</li>
                    <li><strong>Shoreline Protection:</strong> Prevent wave undercutting of coastal land</li>
                </ul>

                <h4>Restoration Benefits</h4>
                <p>Restored mangroves can rebuild eroded shorelines at rates of 1-10 cm per year.</p>
            `
        },
        'carbon-storage': {
            title: 'Carbon Storage Capacity',
            content: `
                <h4>Carbon Storage Champion</h4>
                <p>Mangroves store up to 1,000 tons of carbon per hectare, making them one of the most carbon-dense ecosystems.</p>

                <h4>Carbon Storage Forms</h4>
                <ul>
                    <li><strong>Above Ground:</strong> Tree biomass stores significant carbon</li>
                    <li><strong>Below Ground:</strong> Roots and soil store majority of carbon</li>
                    <li><strong>Sediments:</strong> Organic matter accumulation in anaerobic soils</li>
                    <li><strong>Long-term Storage:</strong> Carbon can be stored for centuries</li>
                </ul>

                <h4>Climate Benefits</h4>
                <p>Mangrove conservation and restoration can be part of climate change solutions through carbon credits and avoided emissions.</p>
            `
        }
    };

    const details = protections[type];
    if (details) {
        showModal(details.title, details.content);
    }
}

function showRegionDetails(region) {
    const regions = {
        'asia-pacific': {
            title: 'Asia-Pacific Mangroves',
            content: `
                <h4>Largest Mangrove Region</h4>
                <p>The Asia-Pacific region contains 42% of the world's mangroves, with Indonesia having the most extensive coverage.</p>

                <h4>Key Countries</h4>
                <ul>
                    <li><strong>Indonesia:</strong> 23% of global mangroves, highest biodiversity</li>
                    <li><strong>Malaysia:</strong> Significant areas in Sabah and Sarawak</li>
                    <li><strong>Myanmar:</strong> Important for fisheries and coastal protection</li>
                    <li><strong>Philippines:</strong> High species diversity and endemism</li>
                </ul>

                <h4>Conservation Challenges</h4>
                <p>High deforestation rates due to aquaculture, urbanization, and timber harvesting. Conservation efforts focus on community management and sustainable use.</p>
            `
        },
        'africa': {
            title: 'African Mangroves',
            content: `
                <h4>African Mangrove Distribution</h4>
                <p>Africa contains 21% of global mangroves, primarily along the Atlantic and Indian Ocean coasts.</p>

                <h4>Key Countries</h4>
                <ul>
                    <li><strong>Nigeria:</strong> Largest mangrove area in Africa</li>
                    <li><strong>Mozambique:</strong> Important for coastal protection</li>
                    <li><strong>Tanzania:</strong> Significant areas in Rufiji Delta</li>
                    <li><strong>Madagascar:</strong> High biodiversity and endemism</li>
                </ul>

                <h4>Unique Features</h4>
                <p>African mangroves often occur in arid coastal areas and play crucial roles in supporting local fisheries and protecting against desertification.</p>
            `
        },
        'americas': {
            title: 'American Mangroves',
            content: `
                <h4>Americas Mangrove Coverage</h4>
                <p>The Americas contain 23% of global mangroves, with extensive areas in Latin America and the Caribbean.</p>

                <h4>Key Regions</h4>
                <ul>
                    <li><strong>Brazil:</strong> Largest area in the Americas</li>
                    <li><strong>Mexico:</strong> Significant areas on both coasts</li>
                    <li><strong>Central America:</strong> Important biodiversity hotspots</li>
                    <li><strong>United States:</strong> Florida and Hawaii have important areas</li>
                </ul>

                <h4>Conservation Status</h4>
                <p>Many areas are protected, but threats from development and climate change continue to impact these ecosystems.</p>
            `
        }
    };

    const details = regions[region];
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