// Phytoplankton Community Shifts Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePhytoplanktonPage();
});

function initializePhytoplanktonPage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Action button functions
function learnMore() {
    // Open educational resources about phytoplankton
    const learnUrl = 'https://www.whoi.edu/know-your-ocean/ocean-topics/how-we-study-the-ocean/ocean-life/phytoplankton/';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening Woods Hole Oceanographic Institution phytoplankton resources. Learn about these vital marine organisms!', 'info');
}

function supportResearch() {
    // Open marine research organizations
    const researchUrl = 'https://www.oceanconservancy.org/';
    window.open(researchUrl, '_blank');

    // Show information about supporting research
    showNotification('Opening Ocean Conservancy. Support marine research and conservation efforts!', 'info');
}

function reduceNutrients() {
    // Open resources about reducing nutrient pollution
    const nutrientUrl = 'https://www.epa.gov/nutrientpollution';
    window.open(nutrientUrl, '_blank');

    // Show information about nutrient reduction
    showNotification('Opening EPA nutrient pollution resources. Learn how to reduce nutrient runoff!', 'info');
}

// Interactive functions for detailed information
function showShiftDetails(shiftType) {
    const shifts = {
        'diatom-flagellate': {
            title: 'Diatoms to Flagellates Shift',
            content: `
                <h4>Silica Limitation Drives Change</h4>
                <p>Diatoms require silica to build their glass-like cell walls, but in nutrient-imbalanced waters, silica becomes limiting while nitrogen and phosphorus remain abundant.</p>

                <h4>Ecological Consequences</h4>
                <ul>
                    <li><strong>Size Reduction:</strong> Flagellates are smaller and less edible for many grazers</li>
                    <li><strong>Growth Rate:</strong> Flagellates reproduce faster but have lower nutritional value</li>
                    <li><strong>Food Web Disruption:</strong> Zooplankton adapted to diatoms struggle to consume flagellates</li>
                    <li><strong>Carbon Export:</strong> Smaller cells sink slower, reducing carbon sequestration</li>
                </ul>

                <h4>Global Patterns</h4>
                <p>This shift is particularly pronounced in coastal eutrophic waters and is exacerbated by climate change reducing silica availability from terrestrial sources.</p>
            `
        },
        'harmful-blooms': {
            title: 'Harmful Algal Blooms (HABs)',
            content: `
                <h4>Toxic Species Proliferation</h4>
                <p>Certain phytoplankton species produce potent toxins when nutrient conditions favor their growth over competitors.</p>

                <h4>Major HAB Groups</h4>
                <ul>
                    <li><strong>Dinoflagellates:</strong> Produce saxitoxins causing paralytic shellfish poisoning</li>
                    <li><strong>Diatoms:</strong> Some species produce domoic acid causing amnesic shellfish poisoning</li>
                    <li><strong>Cyanobacteria:</strong> Produce microcystins affecting freshwater and brackish systems</li>
                    <li><strong>Raphidophytes:</strong> Produce ichthyotoxins killing fish in aquaculture</li>
                </ul>

                <h4>Economic and Health Impacts</h4>
                <p>HABs cause billions in losses annually through fishery closures, aquaculture die-offs, and human health incidents requiring medical treatment.</p>
            `
        },
        'size-structure': {
            title: 'Phytoplankton Size Structure Changes',
            content: `
                <h4>From Large to Small Cells</h4>
                <p>Nutrient imbalance favors smaller phytoplankton species that can outcompete larger forms under high-nutrient, low-grazing conditions.</p>

                <h4>Size Classes Affected</h4>
                <ul>
                    <li><strong>Microplankton (>20μm):</strong> Large diatoms and dinoflagellates decline</li>
                    <li><strong>Nanoplankton (2-20μm):</strong> Small flagellates and coccolithophores increase</li>
                    <li><strong>Picoplankton (<2μm):</strong> Prochlorococcus and Synechococcus dominate in oligotrophic waters</li>
                    <li><strong>Biomass vs. Diversity:</strong> High biomass but low species diversity and nutritional quality</li>
                </ul>

                <h4>Trophic Implications</h4>
                <p>Smaller cells are less efficiently grazed by large zooplankton, leading to reduced energy transfer through food webs and altered carbon cycling.</p>
            `
        }
    };

    const details = shifts[shiftType];
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