// Dark Sky Conservation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDarkSkyPage();
});

function initializeDarkSkyPage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Quiz data
const darkSkyQuiz = [
    {
        question: "What is light pollution?",
        options: [
            "Too much artificial light at night",
            "Pollution from light bulbs",
            "Light from the sun during the day",
            "Natural moonlight"
        ],
        correct: 0
    },
    {
        question: "Which animals are most affected by light pollution?",
        options: [
            "Daytime animals only",
            "Nocturnal animals like bats and owls",
            "Fish in the ocean",
            "Birds that migrate during the day"
        ],
        correct: 1
    },
    {
        question: "How does light pollution affect bats?",
        options: [
            "Makes them fly faster",
            "Disrupts their navigation and feeding",
            "Helps them see better at night",
            "Makes them sleep more"
        ],
        correct: 1
    },
    {
        question: "What can you do to reduce light pollution?",
        options: [
            "Leave all lights on all night",
            "Use motion-sensor lights and point them downward",
            "Install bright floodlights everywhere",
            "Use only fluorescent lights"
        ],
        correct: 1
    },
    {
        question: "Why is protecting dark skies important?",
        options: [
            "Only for astronomers",
            "For wildlife, human health, and energy conservation",
            "To make cities brighter",
            "For better street lighting"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Action button functions
function checkLocalLightPollution() {
    // Open a modal or redirect to light pollution map
    const lightPollutionUrl = 'https://www.lightpollutionmap.info/';
    window.open(lightPollutionUrl, '_blank');

    // Show information about checking local light pollution
    showNotification('Opening light pollution map in new tab. Check your area\'s light pollution level!', 'info');
}

function joinDarkSkyMovement() {
    // Open International Dark-Sky Association website
    const darkSkyUrl = 'https://www.darksky.org/';
    window.open(darkSkyUrl, '_blank');

    // Show information about joining
    showNotification('Opening International Dark-Sky Association website. Learn how to get involved!', 'info');
}

function learnMore() {
    // Show additional resources
    const resources = [
        { name: 'NASA Night Sky Network', url: 'https://nightsky.jpl.nasa.gov/' },
        { name: 'Dark Sky International', url: 'https://www.darkskyinternational.org/' },
        { name: 'The World Atlas of Night Sky Brightness', url: 'https://www.worldatlasofnightskies.com/' }
    ];

    showResourcesModal(resources);
}

// Quiz functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = darkSkyQuiz[currentQuestionIndex];
    document.getElementById('question-container').innerHTML = `<h3>${question.question}</h3>`;
    
    const optionsHtml = question.options.map((option, index) => 
        `<button class="option-btn" onclick="selectAnswer(${index})">${option}</button>`
    ).join('');
    
    document.getElementById('options-container').innerHTML = optionsHtml;
    document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = darkSkyQuiz[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    optionButtons.forEach(btn => btn.disabled = true);
    
    // Highlight correct and selected answers
    if (selectedIndex === question.correct) {
        optionButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
        optionButtons[question.correct].classList.add('correct');
    }
    
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < darkSkyQuiz.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const percentage = Math.round((score / darkSkyQuiz.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excellent! You know a lot about dark sky conservation!';
    } else if (percentage >= 60) {
        message = 'Good job! Keep learning about nocturnal wildlife.';
    } else {
        message = 'Keep exploring! There\'s more to learn about protecting our night skies.';
    }
    
    document.getElementById('score-display').innerHTML = `You scored ${score} out of ${darkSkyQuiz.length} (${percentage}%)<br>${message}`;
}

function restartQuiz() {
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
}

// Action button functions
function checkLocalLightPollution() {
    // Open a modal or redirect to light pollution map
    const lightPollutionUrl = 'https://www.lightpollutionmap.info/';
    window.open(lightPollutionUrl, '_blank');

    // Show information about checking local light pollution
    showNotification('Opening light pollution map in new tab. Check your area\'s light pollution level!', 'info');
}

function joinDarkSkyMovement() {
    // Open International Dark-Sky Association website
    const darkSkyUrl = 'https://www.darksky.org/';
    window.open(darkSkyUrl, '_blank');

    // Show information about joining
    showNotification('Opening International Dark-Sky Association website. Learn how to get involved!', 'info');
}

function learnMore() {
    // Show additional resources
    const resources = [
        { name: 'NASA Night Sky Network', url: 'https://nightsky.jpl.nasa.gov/' },
        { name: 'Dark Sky International', url: 'https://www.darkskyinternational.org/' },
        { name: 'The World Atlas of Night Sky Brightness', url: 'https://www.worldatlasofnightskies.com/' }
    ];

    showResourcesModal(resources);
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
        background: type === 'info' ? '#2196F3' : '#4CAF50',
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

function showResourcesModal(resources) {
    // Create modal for resources
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Additional Resources</h3>
            <div class="resources-list">
                ${resources.map(resource => `
                    <div class="resource-item">
                        <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                            ${resource.name} <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                `).join('')}
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
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
    });

    const closeBtn = modal.querySelector('.close-modal');
    Object.assign(closeBtn.style, {
        background: '#1a1a2e',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '1rem'
    });

    const resourcesList = modal.querySelector('.resources-list');
    Object.assign(resourcesList.style, {
        margin: '1rem 0'
    });

    const resourceItems = modal.querySelectorAll('.resource-item');
    resourceItems.forEach(item => {
        Object.assign(item.style, {
            margin: '0.5rem 0'
        });

        const link = item.querySelector('a');
        Object.assign(link.style, {
            color: '#1a1a2e',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        });

        link.addEventListener('mouseenter', () => link.style.textDecoration = 'underline');
        link.addEventListener('mouseleave', () => link.style.textDecoration = 'none');
    });

    document.body.appendChild(modal);
}