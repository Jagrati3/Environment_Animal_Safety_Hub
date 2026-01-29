// Wildlife Captivity Ethics Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeWildlifeCaptivityPage();
});

function initializeWildlifeCaptivityPage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Action button functions
function findEthicalAlternatives() {
    // Open resources for finding ethical entertainment alternatives
    const alternativesUrl = 'https://www.worldanimalprotection.org/our-work/animals-entertainment';
    window.open(alternativesUrl, '_blank');

    // Show information about finding alternatives
    showNotification('Opening World Animal Protection resources for ethical entertainment alternatives!', 'info');
}

function supportSanctuaries() {
    // Open animal sanctuary directory
    const sanctuariesUrl = 'https://www.animalsanctuary.org/';
    window.open(sanctuariesUrl, '_blank');

    // Show information about supporting sanctuaries
    showNotification('Opening animal sanctuary directory. Find sanctuaries to support!', 'info');
}

function advocateChange() {
    // Open advocacy resources
    const advocacyUrl = 'https://www.hsi.org/issues/captive-wildlife/';
    window.open(advocacyUrl, '_blank');

    // Show information about advocacy
    showNotification('Opening Humane Society resources for animal advocacy!', 'info');
}

// Interactive functions for detailed information
function showEthicalFramework(framework) {
    const frameworks = {
        'animal-rights': {
            title: 'Animal Rights Perspective',
            content: `
                <h4>Core Principles</h4>
                <p>Animals have inherent rights that cannot be violated for human entertainment or convenience.</p>

                <h4>Key Arguments</h4>
                <ul>
                    <li><strong>Intrinsic Value:</strong> Animals are not property but sentient beings with moral standing</li>
                    <li><strong>Autonomy:</strong> Animals should not be forced to perform or live in unnatural conditions</li>
                    <li><strong>Exploitation:</strong> Using animals for entertainment commodifies living beings</li>
                </ul>

                <h4>Implications for Entertainment</h4>
                <p>Complete rejection of animal captivity for entertainment purposes, regardless of welfare standards.</p>
            `
        },
        'utilitarian': {
            title: 'Utilitarian Perspective',
            content: `
                <h4>Core Principles</h4>
                <p>Actions are ethical if they maximize overall happiness and minimize suffering.</p>

                <h4>Key Arguments</h4>
                <ul>
                    <li><strong>Suffering Assessment:</strong> Compare animal suffering against human benefits</li>
                    <li><strong>Conservation Value:</strong> Weigh educational and conservation benefits</li>
                    <li><strong>Alternatives:</strong> Consider if the same benefits can be achieved without animals</li>
                </ul>

                <h4>Implications for Entertainment</h4>
                <p>Acceptable only if animal welfare is maximized and benefits clearly outweigh harms.</p>
            `
        },
        'conservation': {
            title: 'Conservation Ethics Perspective',
            content: `
                <h4>Core Principles</h4>
                <p>Actions should contribute to species survival and ecosystem health.</p>

                <h4>Key Arguments</h4>
                <ul>
                    <li><strong>Species Preservation:</strong> Captive breeding for endangered species</li>
                    <li><strong>Education:</strong> Public awareness and support for conservation</li>
                    <li><strong>Research:</strong> Scientific understanding of species biology</li>
                </ul>

                <h4>Implications for Entertainment</h4>
                <p>Acceptable if primary purpose is conservation, not entertainment profit.</p>
            `
        }
    };

    const frameworkData = frameworks[framework];
    if (frameworkData) {
        showModal(frameworkData.title, frameworkData.content);
    }
}

function showIndustryChange(change) {
    const changes = {
        'zoos': {
            title: 'Zoos and Aquariums Transformation',
            content: `
                <h4>Modern Zoo Mission</h4>
                <p>Contemporary zoos focus on conservation, education, research, and animal welfare rather than entertainment.</p>

                <h4>Key Changes</h4>
                <ul>
                    <li><strong>Conservation Focus:</strong> Species Survival Plans and breeding programs for endangered species</li>
                    <li><strong>Education Priority:</strong> Science-based learning experiences</li>
                    <li><strong>Animal Welfare:</strong> Enriched habitats and behavioral research</li>
                    <li><strong>Community Engagement:</strong> Local conservation partnerships</li>
                </ul>

                <h4>Examples</h4>
                <p>San Diego Zoo, Smithsonian National Zoo, and many others have eliminated entertainment elements and focus on genuine conservation work.</p>
            `
        },
        'circuses': {
            title: 'Circus Industry Changes',
            content: `
                <h4>Global Bans</h4>
                <p>Over 40 countries have banned or restricted wild animal acts in circuses.</p>

                <h4>Industry Response</h4>
                <ul>
                    <li><strong>Animal-Free Shows:</strong> Human performers, acrobatics, and technology</li>
                    <li><strong>Retirement Programs:</strong> Placing retired animals in sanctuaries</li>
                    <li><strong>Public Education:</strong> Explaining the transition to audiences</li>
                </ul>

                <h4>Success Stories</h4>
                <p>Ringling Bros. Circus retired its elephants to a conservation center, and many smaller circuses have successfully transitioned to animal-free entertainment.</p>
            `
        },
        'film': {
            title: 'Film Industry Standards',
            content: `
                <h4>Animal Welfare Guidelines</h4>
                <p>Industry organizations have developed comprehensive animal handling standards.</p>

                <h4>Key Standards</h4>
                <ul>
                    <li><strong>American Humane:</strong> "No Animals Were Harmed" certification</li>
                    <li><strong>Training Methods:</strong> Positive reinforcement only</li>
                    <li><strong>Retirement Plans:</strong> Guaranteed care for animals after filming</li>
                    <li><strong>CGI Alternatives:</strong> Computer-generated animals when possible</li>
                </ul>

                <h4>Implementation</h4>
                <p>Major studios now require animal welfare oversight on productions involving live animals.</p>
            `
        }
    };

    const changeData = changes[change];
    if (changeData) {
        showModal(changeData.title, changeData.content);
    }
}

function showAlternativeDetails(alternative) {
    const alternatives = {
        'sanctuaries': {
            title: 'Animal Sanctuaries Explained',
            content: `
                <h4>What Are Sanctuaries?</h4>
                <p>Facilities dedicated to providing lifelong care for rescued animals without breeding, performing, or exploitation.</p>

                <h4>Key Characteristics</h4>
                <ul>
                    <li><strong>No Breeding:</strong> No captive breeding programs</li>
                    <li><strong>No Performance:</strong> No shows, rides, or entertainment</li>
                    <li><strong>Rescue Focus:</strong> Primarily care for rescued and retired animals</li>
                    <li><strong>Education:</strong> Public education about conservation and animal welfare</li>
                </ul>

                <h4>Examples</h4>
                <p>Center for Elephant Conservation, Wildlife Waystation, and numerous smaller sanctuaries worldwide.</p>
            `
        },
        'virtual-reality': {
            title: 'Virtual Reality Wildlife Experiences',
            content: `
                <h4>VR Technology Applications</h4>
                <p>Immersive experiences that allow people to "visit" wildlife without impacting animals.</p>

                <h4>Benefits</h4>
                <ul>
                    <li><strong>No Animal Contact:</strong> Completely non-invasive</li>
                    <li><strong>Scalable:</strong> Unlimited visitors without habitat impact</li>
                    <li><strong>Educational:</strong> Interactive learning experiences</li>
                    <li><strong>Accessible:</strong> Available to people worldwide</li>
                </ul>

                <h4>Current Examples</h4>
                <p>Google Expeditions, VR zoos, and wildlife documentaries with interactive elements.</p>
            `
        },
        'ecotourism': {
            title: 'Conservation-Focused Ecotourism',
            content: `
                <h4>Ethical Wildlife Tourism</h4>
                <p>Guided wildlife experiences that directly support conservation and benefit local communities.</p>

                <h4>Principles</h4>
                <ul>
                    <li><strong>Low Impact:</strong> Minimal disturbance to wildlife and habitats</li>
                    <li><strong>Local Benefits:</strong> Economic benefits to local communities</li>
                    <li><strong>Conservation Funding:</strong> Direct support for protection efforts</li>
                    <li><strong>Education:</strong> Guided experiences with conservation messaging</li>
                </ul>

                <h4>Certification Programs</h4>
                <p>Ecotourism certification ensures operators meet ethical and conservation standards.</p>
            `
        }
    };

    const altData = alternatives[alternative];
    if (altData) {
        showModal(altData.title, altData.content);
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
        background: type === 'info' ? '#6B6B9A' : '#5CB85C',
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
        background: '#4A4A8A',
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