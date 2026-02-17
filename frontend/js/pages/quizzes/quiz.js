// Import QuizLoader
import QuizLoader from '../../utils/quiz-loader.js';

// DOM elements
const elements = {
  startScreen: document.getElementById('startScreen'),
  quizScreen: document.getElementById('quizScreen'),
  loadingScreen: document.getElementById('loadingScreen'),
  resultScreen: document.getElementById('resultScreen'),
  reviewScreen: document.getElementById('reviewScreen'),
  questionEl: document.getElementById('question'),
  optionsEl: document.getElementById('options'),
  timeEl: document.getElementById('time'),
  scoreEl: document.getElementById('finalScore'),
  remarkEl: document.getElementById('remark'),
  progressText: document.getElementById('progressText'),
  progressFill: document.getElementById('progressBar') ? document.getElementById('progressBar').querySelector('.progress-fill') : null
};

// Load quiz using QuizLoader
let kidsEcoQuiz = null;

// Custom overrides for kids eco quiz specific behavior
const customOverrides = {
  startQuiz: function() {
    const timeSelect = document.getElementById('timeSelect');

    // Clear existing progress
    this.clearProgress();

    // Select 10 random questions instead of using all
    this.questions = [...this.config.questions].sort(() => 0.5 - Math.random()).slice(0, 10);

    // Reset state
    this.index = 0;
    this.score = 0;
    this.time = parseInt(timeSelect.value);
    this.answers = new Array(this.questions.length).fill(null);

    // Transition screens
    this.elements.startScreen.style.display = "none";
    this.elements.quizScreen.style.display = "block";
    this.elements.quizScreen.classList.add('slide-up');

    // Load first question and start timer
    this.loadQuestion();
    this.startTimer();
  },

  loadQuestion: function() {
    // Call parent method
    BaseQuiz.prototype.loadQuestion.call(this);

    // Add staggered pop-in animation for options
    const options = this.elements.optionsEl.querySelectorAll('.option');
    options.forEach((option, index) => {
      option.style.animation = `popIn 0.5s ease backwards ${index * 0.1}s`;
    });
  },

  nextQuestion: function() {
    // Check if answer was selected
    if (this.answers[this.index] == null) {
      // Shake animation for feedback
      const nextBtn = document.querySelector('.nextBtn');
      if (nextBtn) {
        nextBtn.classList.add('shake-it');
        setTimeout(() => nextBtn.classList.remove('shake-it'), 300);
      }
      return;
    }

    // Call parent method
    BaseQuiz.prototype.nextQuestion.call(this);
  },

  showResult: function() {
    // Stop timer and clear progress
    clearInterval(this.timer);
    this.clearProgress();

    // Transition screens with loading animation
    this.elements.quizScreen.style.display = "none";
    this.elements.loadingScreen.style.display = "block";
    this.elements.loadingScreen.classList.add('slide-up');

    // Simulate processing time
    setTimeout(() => {
      this.elements.loadingScreen.style.display = "none";
      this.elements.resultScreen.style.display = "block";
      this.elements.resultScreen.classList.add('slide-up');

      // Display score and remark
      this.elements.scoreEl.textContent = this.score;

      // Custom remarks for kids eco quiz
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Amazing! You're an Eco Hero!";
      } else if (this.score >= 5) {
        remark = "👍 Good Job! Keep it green!";
      } else {
        remark = "🌱 Nice try! Learn more & play again!";
      }

      if (this.elements.remarkEl) {
        this.elements.remarkEl.textContent = remark;
      }
    }, 2000); // 2 second loading time
  }
};

// Load quiz on page load
async function loadKidsEcoQuiz() {
  kidsEcoQuiz = await QuizLoader.loadQuiz('kids-eco-quiz', elements, customOverrides);
}

// ===== FLOATING BACKGROUND SYSTEM =====
/**
 * Create animated floating background elements for visual appeal
 * Generates random environmental icons that float across the screen
 */
function createFloatingElements() {
  const container = document.getElementById('floating-container');
  const icons = ['🌱', '🌿', '☁️', '☀️', '🦋', '🐝', '🍃'];

  // Create 15 floating elements
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.className = 'floater';
    span.textContent = icons[Math.floor(Math.random() * icons.length)];

    // Random positioning and animation properties
    const left = Math.random() * 100;           // Random horizontal position
    const duration = Math.random() * 10 + 10;   // 10-20s animation duration
    const delay = Math.random() * 10;           // Random start delay
    const size = Math.random() * 2 + 1;         // 1-3rem font size

    // Apply CSS properties for animation
    span.style.left = `${left}%`;
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `-${delay}s`;
    span.style.fontSize = `${size}rem`;

    container.appendChild(span);
  }
}



// ===== INITIALIZATION =====
/**
 * Initialize the quiz application on page load
 */
async function initializeQuiz() {
  createFloatingElements();
  await loadKidsEcoQuiz();

  // Check for existing progress on page load
  if (kidsEcoQuiz && kidsEcoQuiz.progressManager.canResume()) {
    const resumeSection = document.getElementById('resumeSection');
    if (resumeSection) {
      resumeSection.style.display = 'block';
    }
  }
}

// Call initialization
initializeQuiz();

// ===== GLOBAL FUNCTIONS FOR HTML ONCLICK HANDLERS =====
/**
 * Start a new quiz session
 */
window.startQuiz = () => {
  if (kidsEcoQuiz) kidsEcoQuiz.startQuiz();
};

/**
 * Resume a saved quiz session
 */
window.resumeQuiz = () => {
  if (kidsEcoQuiz) kidsEcoQuiz.resumeQuiz();
};

/**
 * Move to the next question
 */
window.nextQuestion = () => {
  if (kidsEcoQuiz) kidsEcoQuiz.nextQuestion();
};

/**
 * Show answer review screen
 */
window.showReview = () => {
  if (kidsEcoQuiz) {
    // Transition to review screen
    kidsEcoQuiz.elements.resultScreen.style.display = "none";
    kidsEcoQuiz.elements.reviewScreen.style.display = "block";

    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = "";

    // Generate review items for each question
    kidsEcoQuiz.questions.forEach((question, questionIndex) => {
      let reviewItem = document.createElement("div");
      const isCorrect = kidsEcoQuiz.answers[questionIndex] === question.a;

      reviewItem.className = `review-item ${isCorrect ? 'correct-ans' : 'wrong-ans'}`;
      reviewItem.style.animationDelay = `${questionIndex * 0.1}s`; // Staggered animation

      reviewItem.innerHTML = `
        <strong>Q${questionIndex + 1}: ${question.q}</strong><br>
        <div style="margin-top:5px;font-size:0.9rem">
          Your Answer: <span>${question.o[kidsEcoQuiz.answers[questionIndex]] || "Skipped 🚫"}</span> ${isCorrect ? '✅' : '❌'}<br>
          ${!isCorrect ? `Correct Answer: <b>${question.o[question.a]}</b>` : ''}
        </div>
      `;

      reviewList.appendChild(reviewItem);
    });

    // Restore previous selection if navigating back
    if (answers[index] === optionIndex) {
      optionButton.classList.add("selected");
    }

    optionsEl.appendChild(optionButton);
  });
}

// ===== ANSWER SELECTION =====
/**
 * Handle user selection of an answer option
 * @param {HTMLElement} element - The clicked option button
 * @param {number} optionIndex - Index of the selected option (0-3)
 */
function selectOption(element, optionIndex) {
  // Remove previous selection
  document.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));

  // Highlight selected option
  element.classList.add("selected");
  element.setAttribute("aria-pressed", "true");

  // Store user's answer
  answers[index] = optionIndex;

  // Save progress after each answer selection
  progressManager.saveProgress({
    currentIndex: index,
    answers: answers,
    score: score,
    remainingTime: seconds,
    quizQuestions: quiz
  });

  // Provide visual feedback
  if (optionIndex === quiz[index].a) {
    element.classList.add("correct");
    // Add checkmark
    const check = document.createElement("span");
    check.textContent = " ✅";
    element.appendChild(check);
  } else {
    element.classList.add("incorrect");
    const cross = document.createElement("span");
    cross.textContent = " ❌";
    element.appendChild(cross);

    // Highlight correct answer
    const buttons = document.querySelectorAll(".option");
    if (buttons[quiz[index].a]) {
      buttons[quiz[index].a].classList.add("correct");
      const check = document.createElement("span");
      check.textContent = " ✅";
      buttons[quiz[index].a].appendChild(check);
    }
  }

  // Disable all options to prevent changing answer
  document.querySelectorAll(".option").forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = "default";
  });

  // Auto-advance after short delay
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// ===== QUESTION NAVIGATION =====
/**
 * Advance to the next question or show results if quiz is complete
 */
function nextQuestion() {
  // Check if answer was selected
  if (answers[index] == null) {
    // Shake animation for feedback
    const nextBtn = document.querySelector('.nextBtn');
    nextBtn.classList.add('shake-it');
    setTimeout(() => nextBtn.classList.remove('shake-it'), 300);
    return;
  }

  // Check answer and update score
  if (answers[index] === quiz[index].a) {
    score++;
  }
};

// ===== PARALLAX EFFECTS =====
/**
 * Mouse parallax effect for hero section background layers
 * Creates depth illusion by moving background elements based on mouse position
 */
document.addEventListener('mousemove', (e) => {
  const hero = document.getElementById('heroScene');
  const layers = document.querySelectorAll('.scene-layer');

  // Calculate mouse position relative to screen center
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;

  // Apply parallax movement to background layers
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.5; // Different speeds for depth effect
    const xOffset = x * speed;
    const yOffset = y * speed;

    // Apply transform to create parallax effect
    if (layer.classList.contains('hills-back') || layer.classList.contains('hills-front')) {
      layer.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
    }
  });
});

// Expose functions to global window object for HTML inline events
window.startQuiz = startQuiz;
window.resumeQuiz = resumeQuiz;
window.nextQuestion = nextQuestion;
window.showReview = showReview;
window.selectOption = selectOption; // Though usually called via listener, good to have if needed check
