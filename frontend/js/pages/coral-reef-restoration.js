// Coral Reef Restoration Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCoralReefPage();
});

function initializeCoralReefPage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Action button functions
function exploreProjects() {
    // Open coral restoration project finder
    const projectsUrl = 'https://www.coralrestoration.org/projects/';
    window.open(projectsUrl, '_blank');

    // Show information about finding projects
    showNotification('Opening coral restoration project directory. Find opportunities to get involved!', 'info');
}

function learnTechniques() {
    // Open learning resources
    const learnUrl = 'https://www.coralrestoration.org/training/';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening training resources. Learn coral restoration techniques!', 'info');
}

function supportResearch() {
    // Open donation/support page
    const supportUrl = 'https://www.coralrestoration.org/donate/';
    window.open(supportUrl, '_blank');

    // Show information about supporting research
    showNotification('Opening donation page. Your support helps advance coral restoration research!', 'info');
}

// Additional interactive functions
function showMethodDetails(methodName) {
    const details = {
        'coral-farming': {
            title: 'Coral Farming Techniques',
            content: `
                <h4>Land-Based Nurseries</h4>
                <p>Controlled environment facilities where coral fragments are grown in tanks with optimized water conditions.</p>

                <h4>Ocean-Based Nurseries</h4>
                <p>Floating or submerged structures in natural reef environments for coral cultivation.</p>

                <h4>Microfragmentation</h4>
                <p>Breaking coral colonies into tiny fragments that grow rapidly into new colonies.</p>
            `
        },
        '3d-structures': {
            title: '3D Reef Structures',
            content: `
                <h4>Design Process</h4>
                <p>Using 3D scanning of healthy reefs to create artificial structures that mimic natural topography.</p>

                <h4>Materials</h4>
                <p>Biodegradable polymers, concrete, and metal alloys designed for marine environments.</p>

                <h4>Deployment</h4>
                <p>Structures are placed on degraded reefs to provide settlement surfaces for coral larvae.</p>
            `
        },
        'genetic-tech': {
            title: 'Genetic Technologies',
            content: `
                <h4>Selective Breeding</h4>
                <p>Breeding corals that show natural resistance to bleaching and disease.</p>

                <h4>Gene Editing</h4>
                <p>Using CRISPR technology to enhance coral resilience to environmental stressors.</p>

                <h4>Microbiome Research</h4>
                <p>Studying and manipulating the microorganisms that live in association with corals.</p>
            `
        }
    };

    const method = details[methodName];
    if (method) {
        showModal(method.title, method.content);
    }
}

function showCaseStudy(studyName) {
    const studies = {
        'great-barrier-reef': {
            title: 'Great Barrier Reef Restoration',
            content: `
                <p>The Great Barrier Reef Foundation has implemented the world's largest coral restoration program.</p>
                <ul>
                    <li><strong>Scale:</strong> Over 5 million corals planted</li>
                    <li><strong>Methods:</strong> Nursery-grown corals and microfragmentation</li>
                    <li><strong>Impact:</strong> 85% survival rate after 2 years</li>
                    <li><strong>Funding:</strong> $50M+ invested in restoration</li>
                </ul>
                <p>This project demonstrates the potential for large-scale reef rehabilitation through innovative techniques.</p>
            `
        },
        'hawaii-restoration': {
            title: 'Hawaii Coral Restoration',
            content: `
                <p>The Hawaii Institute of Marine Biology leads genetic research for coral resilience.</p>
                <ul>
                    <li><strong>Focus:</strong> Heat-resistant coral strains</li>
                    <li><strong>Methods:</strong> Selective breeding and genetic analysis</li>
                    <li><strong>Results:</strong> 90% bleaching resistance in lab conditions</li>
                    <li><strong>Species:</strong> 20+ coral species under study</li>
                </ul>
                <p>This work is crucial for developing corals that can survive in warming oceans.</p>
            `
        }
    };

    const study = studies[studyName];
    if (study) {
        showModal(study.title, study.content);
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
        background: type === 'info' ? '#00A6FB' : '#4CAF50',
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
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
    });

    const closeBtn = modal.querySelector('.close-modal');
    Object.assign(closeBtn.style, {
        background: '#006994',
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