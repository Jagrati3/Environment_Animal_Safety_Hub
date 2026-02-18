// Fire Suppression and Fuel Load Accumulation - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initFuelLoadSimulator();
  initCardHoverEffects();
  initFireQuiz();
});

// Scroll animations for sections
function initScrollAnimations() {
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

  // Observe all major sections
  const sections = document.querySelectorAll('.simulator-section, .education-section, .case-studies-section, .quiz-section, .cta-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animated counters for statistics
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const isMultiplier = text.includes('x');
        const isDollar = text.includes('$');
        const hasPlus = text.includes('+');

        if (isMultiplier || isDollar || /^\d/.test(text)) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(number => {
    counterObserver.observe(number);
  });
}

// Counter animation function
function animateCounter(element, finalText) {
  if (element.hasAttribute('data-animated')) return;

  element.setAttribute('data-animated', 'true');

  // Extract number from text
  const numberMatch = finalText.match(/[\d,]+/);
  if (!numberMatch) return;

  const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
  const isMultiplier = finalText.includes('x');
  const isDollar = finalText.includes('$');
  const hasPlus = finalText.includes('+');

  let currentNumber = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = finalNumber / steps;

  const timer = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= finalNumber) {
      currentNumber = finalNumber;
      clearInterval(timer);
    }

    let displayText = Math.floor(currentNumber).toLocaleString();
    if (isDollar) displayText = '$' + displayText;
    if (isMultiplier) displayText += 'x';
    else if (hasPlus) displayText += '+';

    element.textContent = displayText;
  }, duration / steps);
}

// Fuel Load Simulator
function initFuelLoadSimulator() {
  const slider = document.getElementById('suppression-slider');
  const yearsDisplay = document.getElementById('years-display');
  const groundFuel = document.getElementById('ground-fuel');
  const ladderFuel = document.getElementById('ladder-fuel');
  const canopyFuel = document.getElementById('canopy-fuel');
  const riskLevel = document.getElementById('risk-level');
  const fuelLoad = document.getElementById('fuel-load');
  const fireIntensity = document.getElementById('fire-intensity');
  const containment = document.getElementById('containment');

  function updateSimulator(years) {
    // Calculate fuel accumulation based on years
    const groundHeight = Math.min(80, 20 + (years * 1.2)); // Base 20%, +1.2% per year
    const ladderHeight = Math.min(60, years * 0.8); // +0.8% per year
    const canopyHeight = Math.min(90, 30 + (years * 0.6)); // Base 30%, +0.6% per year

    // Update visual heights
    groundFuel.style.height = groundHeight + '%';
    ladderFuel.style.height = ladderHeight + '%';
    canopyFuel.style.height = canopyHeight + '%';

    // Update risk assessments
    if (years < 20) {
      riskLevel.textContent = 'Low';
      riskLevel.style.color = '#27ae60';
      fuelLoad.textContent = 'Low';
      fireIntensity.textContent = 'Manageable';
      containment.textContent = 'Easy';
    } else if (years < 40) {
      riskLevel.textContent = 'Moderate';
      riskLevel.style.color = '#f39c12';
      fuelLoad.textContent = 'Medium';
      fireIntensity.textContent = 'Challenging';
      containment.textContent = 'Moderate';
    } else if (years < 60) {
      riskLevel.textContent = 'High';
      riskLevel.style.color = '#e74c3c';
      fuelLoad.textContent = 'High';
      fireIntensity.textContent = 'Severe';
      containment.textContent = 'Difficult';
    } else {
      riskLevel.textContent = 'Extreme';
      riskLevel.style.color = '#c0392b';
      fuelLoad.textContent = 'Extreme';
      fireIntensity.textContent = 'Catastrophic';
      containment.textContent = 'Very High';
    }

    // Add animation class for visual feedback
    groundFuel.classList.add('fuel-accumulating');
    ladderFuel.classList.add('fuel-accumulating');
    canopyFuel.classList.add('fuel-accumulating');

    setTimeout(() => {
      groundFuel.classList.remove('fuel-accumulating');
      ladderFuel.classList.remove('fuel-accumulating');
      canopyFuel.classList.remove('fuel-accumulating');
    }, 500);
  }

  // Initialize with default value
  updateSimulator(50);

  // Update on slider change
  slider.addEventListener('input', function() {
    const years = parseInt(this.value);
    yearsDisplay.textContent = years + ' years';
    updateSimulator(years);
  });
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.education-card, .case-study');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 12px 30px rgba(231, 76, 60, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
  });
}

// Fire Ecology Quiz
function initFireQuiz() {
  const quizContainer = document.getElementById('fire-quiz');

  const questions = [
    {
      question: "What is the primary ecological role of fire in many ecosystems?",
      options: [
        "To destroy all vegetation",
        "To recycle nutrients and maintain biodiversity",
        "To create permanent deserts",
        "To eliminate all animal life"
      ],
      correct: 1,
      explanation: "Fire recycles nutrients through ash deposition and maintains biodiversity by creating diverse habitats and controlling competing vegetation."
    },
    {
      question: "How does long-term fire suppression affect fuel loads?",
      options: [
        "Decreases fuel accumulation",
        "Has no effect on fuel loads",
        "Increases fuel accumulation over time",
        "Immediately causes catastrophic fires"
      ],
      correct: 2,
      explanation: "Fire suppression allows dead and live vegetation to accumulate, creating higher fuel loads that burn hotter and faster when fires eventually occur."
    },
    {
      question: "What is a 'ladder fuel' in fire ecology?",
      options: [
        "Fuel that climbs ladders to escape fires",
        "Vegetation that allows fire to climb from ground to canopy",
        "Fuel used to build fire ladders",
        "The rungs of a fire department ladder"
      ],
      correct: 1,
      explanation: "Ladder fuels are low-lying vegetation that creates vertical continuity, allowing ground fires to climb into tree canopies and create crown fires."
    },
    {
      question: "Which management strategy helps restore natural fire regimes?",
      options: [
        "Complete fire suppression everywhere",
        "Prescribed burning under controlled conditions",
        "Planting only fire-resistant trees",
        "Building more fire stations"
      ],
      correct: 1,
      explanation: "Prescribed burning mimics natural fires, reducing fuel loads and maintaining ecosystem health while preventing catastrophic wildfires."
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  function displayQuestion() {
    const question = questions[currentQuestion];
    quizContainer.innerHTML = `
      <div class="quiz-question">
        <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>
        <p class="question-text">${question.question}</p>
        <div class="quiz-options">
          ${question.options.map((option, index) => `
            <button class="quiz-option" data-index="${index}">${option}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" style="display: none;"></div>
        <button class="next-btn" style="display: none;">Next Question</button>
      </div>
    `;

    // Add event listeners
    const options = quizContainer.querySelectorAll('.quiz-option');
    const nextBtn = quizContainer.querySelector('.next-btn');
    const feedback = quizContainer.querySelector('.quiz-feedback');

    options.forEach(option => {
      option.addEventListener('click', function() {
        const selectedIndex = parseInt(this.dataset.index);
        const isCorrect = selectedIndex === question.correct;

        // Disable all options
        options.forEach(opt => opt.disabled = true);

        // Show feedback
        if (isCorrect) {
          this.classList.add('correct');
          score++;
        } else {
          this.classList.add('incorrect');
          options[question.correct].classList.add('correct');
        }

        feedback.innerHTML = `<p><strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${question.explanation}</p>`;
        feedback.style.display = 'block';
        nextBtn.style.display = 'block';
      });
    });

    nextBtn.addEventListener('click', function() {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        showResults();
      }
    });
  }

  function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    quizContainer.innerHTML = `
      <div class="quiz-results">
        <h3>Quiz Complete!</h3>
        <div class="score-display">
          <div class="score-circle">
            <span class="score-number">${percentage}%</span>
          </div>
          <p>You got ${score} out of ${questions.length} questions correct.</p>
        </div>
        <div class="score-message">
          ${percentage >= 80 ? 'Excellent! You have a strong understanding of fire ecology.' :
            percentage >= 60 ? 'Good job! You understand the basics of fire suppression impacts.' :
            'Keep learning! Fire ecology is complex but important for ecosystem health.'}
        </div>
        <button class="restart-btn">Take Quiz Again</button>
      </div>
    `;

    const restartBtn = quizContainer.querySelector('.restart-btn');
    restartBtn.addEventListener('click', function() {
      currentQuestion = 0;
      score = 0;
      displayQuestion();
    });
  }

  // Start the quiz
  displayQuestion();
}

// Add CSS for quiz (injected via JS for simplicity)
const quizStyles = `
  .quiz-question h3 {
    color: var(--dark-color);
    margin-bottom: 15px;
  }

  .question-text {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .quiz-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }

  .quiz-option {
    padding: 12px 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }

  .quiz-option:hover {
    border-color: var(--fire-orange);
    background: #fff5f5;
  }

  .quiz-option.correct {
    border-color: var(--success-color);
    background: #d4edda;
  }

  .quiz-option.incorrect {
    border-color: var(--danger-color);
    background: #f8d7da;
  }

  .quiz-feedback {
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
    background: #f8f9fa;
    border-left: 4px solid var(--fire-orange);
  }

  .next-btn {
    background: var(--fire-orange);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
  }

  .quiz-results {
    text-align: center;
  }

  .score-display {
    margin: 30px 0;
  }

  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(var(--fire-orange) 0% var(--percentage), #eee var(--percentage) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    position: relative;
  }

  .score-circle::before {
    content: '';
    position: absolute;
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 50%;
  }

  .score-number {
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark-color);
  }

  .score-message {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
  }

  .restart-btn {
    background: var(--fire-orange);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .restart-btn:hover {
    background: var(--burnt-orange);
    transform: translateY(-2px);
  }
`;

// Inject quiz styles
const styleSheet = document.createElement('style');
styleSheet.textContent = quizStyles;
document.head.appendChild(styleSheet);

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const icon = this.querySelector('i');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
  }
});