/**
 * Species De-Extinction Page - Interactive Functionality
 * Handles ethics discussion interactions, comparisons, and user engagement
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100
        });
    }

    // Ethics section interactions
    initializeEthicsInteractions();

    // Comparison table interactions
    initializeComparisonInteractions();

    // Case studies interactions
    initializeCaseStudies();

    // Pledge button functionality
    initializePledgeButton();

    // Progress tracking for reading
    initializeReadingProgress();
});

/**
 * Initialize ethics section interactive elements
 */
function initializeEthicsInteractions() {
    const ethicsDetails = document.querySelectorAll('.ethics-detail');

    ethicsDetails.forEach(detail => {
        const header = detail.querySelector('h3');
        const content = detail.querySelector('p');

        // Add click to expand/collapse
        header.addEventListener('click', function() {
            detail.classList.toggle('expanded');

            // Animate content
            if (detail.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });

        // Initially collapsed
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease';
    });
}

/**
 * Initialize comparison table interactions
 */
function initializeComparisonInteractions() {
    const comparisonRows = document.querySelectorAll('.comparison-row');

    comparisonRows.forEach((row, index) => {
        if (index > 0) { // Skip header row
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });

            row.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });

            // Add click to highlight
            row.addEventListener('click', function() {
                // Remove highlight from others
                comparisonRows.forEach(r => r.classList.remove('highlighted'));

                // Add highlight to clicked
                this.classList.add('highlighted');
            });
        }
    });
}

/**
 * Initialize case studies interactions
 */
function initializeCaseStudies() {
    const caseStudies = document.querySelectorAll('.case-study-card');

    caseStudies.forEach(study => {
        const paragraphs = study.querySelectorAll('p');

        // Initially show only first paragraph
        for (let i = 1; i < paragraphs.length; i++) {
            paragraphs[i].style.display = 'none';
        }

        // Add "Read More" button
        const readMoreBtn = document.createElement('button');
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.style.cssText = `
            background: var(--primary-color, #2e7d32);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 15px;
            transition: background 0.3s ease;
        `;

        let expanded = false;
        readMoreBtn.addEventListener('click', function() {
            expanded = !expanded;

            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].style.display = expanded ? 'block' : 'none';
            }

            this.textContent = expanded ? 'Read Less' : 'Read More';

            // Animate
            paragraphs.forEach(p => {
                if (expanded) {
                    p.style.opacity = '0';
                    p.style.transform = 'translateY(20px)';
                    p.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                    setTimeout(() => {
                        p.style.opacity = '1';
                        p.style.transform = 'translateY(0)';
                    }, 10);
                }
            });
        });

        study.appendChild(readMoreBtn);
    });
}

/**
 * Initialize pledge button functionality
 */
function initializePledgeButton() {
    const pledgeButton = document.querySelector('.pledge-button');

    if (pledgeButton) {
        pledgeButton.addEventListener('click', function() {
            // Create modal or notification
            showPledgeModal();
        });
    }
}

/**
 * Show pledge modal
 */
function showPledgeModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        ">
            <h3 style="color: var(--primary-color, #2e7d32); margin-bottom: 20px;">
                <i class="fas fa-handshake"></i> Thank You for Your Support!
            </h3>
            <p style="line-height: 1.6; color: #666; margin-bottom: 30px;">
                Your commitment to ethical science helps ensure that de-extinction efforts prioritize
                animal welfare, ecological responsibility, and genuine conservation outcomes.
            </p>
            <button id="close-modal" style="
                background: var(--primary-color, #2e7d32);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
            ">Continue Learning</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    document.getElementById('close-modal').addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

/**
 * Initialize reading progress tracking
 */
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color, #2e7d32), #10b981);
        z-index: 1001;
        transition: width 0.3s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .ethics-detail.expanded .ethics-detail p {
        max-height: none !important;
    }

    .comparison-row.highlighted {
        background: rgba(46, 125, 50, 0.1) !important;
    }

    .comparison-row.highlighted .aspect {
        background: #1e5a2f !important;
    }

    .read-more-btn:hover {
        background: #1e5a2f !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// Ethics quiz functionality
function initializeEthicsQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionCounter = document.getElementById('question-counter');
    const resultsDiv = document.getElementById('quiz-results');
    const retakeBtn = document.getElementById('retake-quiz');
    const scoreText = document.getElementById('score-text');
    const resultsMessage = document.getElementById('results-message');

    let currentQuestion = 0;
    let score = 0;
    let answers = new Array(questions.length).fill(null);

    // Initialize quiz
    showQuestion(currentQuestion);
    updateNavigation();

    // Option click handlers
    questions.forEach((question, qIndex) => {
        const options = question.querySelectorAll('.quiz-option');
        options.forEach((option, oIndex) => {
            option.addEventListener('click', function() {
                // Remove previous selections
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });

                // Mark as selected and check answer
                const isCorrect = this.dataset.correct === 'true';
                answers[qIndex] = isCorrect;

                if (isCorrect) {
                    this.classList.add('correct');
                    if (qIndex === currentQuestion) score++;
                } else {
                    this.classList.add('incorrect');
                    // Highlight correct answer
                    options.forEach(opt => {
                        if (opt.dataset.correct === 'true') {
                            opt.classList.add('correct');
                        }
                    });
                }

                // Auto-advance after a delay
                setTimeout(() => {
                    if (currentQuestion < questions.length - 1) {
                        nextQuestion();
                    } else {
                        showResults();
                    }
                }, 1500);
            });
        });
    });

    // Navigation
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    retakeBtn.addEventListener('click', retakeQuiz);

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
        questionCounter.textContent = `${index + 1} of ${questions.length}`;
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateNavigation();
        } else {
            showResults();
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateNavigation();
        }
    }

    function updateNavigation() {
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Finish' : 'Next';
    }

    function showResults() {
        // Hide questions and navigation
        questions.forEach(q => q.style.display = 'none');
        document.querySelector('.quiz-navigation').style.display = 'none';

        // Calculate final score
        score = answers.filter(answer => answer === true).length;

        // Show results
        scoreText.textContent = `${score}/${questions.length}`;
        resultsMessage.textContent = getResultsMessage(score);
        resultsDiv.style.display = 'block';
    }

    function getResultsMessage(score) {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) {
            return "Excellent! You have a comprehensive understanding of de-extinction ethics. Your knowledge shows deep insight into the complex issues surrounding this technology.";
        } else if (percentage >= 75) {
            return "Very good! You understand most aspects of de-extinction ethics. Consider exploring the detailed sections above for even deeper insights.";
        } else if (percentage >= 50) {
            return "Good effort! You have a basic understanding of the ethical concerns. Review the sections on moral, ecological, and financial implications for a more complete picture.";
        } else {
            return "Keep learning! De-extinction ethics are complex. We recommend reading through the detailed discussions above to better understand these important issues.";
        }
    }

    function retakeQuiz() {
        // Reset everything
        currentQuestion = 0;
        score = 0;
        answers = new Array(questions.length).fill(null);

        // Reset UI
        questions.forEach(q => {
            q.style.display = '';
            const options = q.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
            });
        });

        document.querySelector('.quiz-navigation').style.display = '';
        resultsDiv.style.display = 'none';

        showQuestion(currentQuestion);
        updateNavigation();
    }
}

// Call quiz initialization
initializeEthicsQuiz();