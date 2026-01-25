/**
 * Water Conservation Quiz
 *
 * An interactive quiz focused on water conservation practices and awareness.
 *
 * Now extends BaseQuiz for unified progress tracking.
 *
 * @author Environment Animal Safety Hub Team
 * @version 2.0.0
 * @since 2024
 */

// DOM elements
const elements = {
  startScreen: document.getElementById('readyScreen'),
  quizScreen: document.getElementById('quizScreen'),
  resultScreen: document.getElementById('quizScreen'), // Reuse quiz screen for results
  questionEl: document.getElementById('question'),
  optionsEl: document.getElementById('options'),
  timeEl: null, // No timer display
  scoreEl: document.getElementById('score'),
  remarkEl: document.getElementById('feedback')
};

// Load quiz data and create instance
let waterConservationQuiz = null;

async function loadWaterConservationQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'water-conservation');
    if (!quizData) {
      throw new Error('Water conservation quiz data not found');
    }

    const quizConfig = {
      questions: quizData.questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    waterConservationQuiz = new BaseQuiz(quizConfig);

    // Override loadQuestion to handle custom option buttons
    waterConservationQuiz.loadQuestion = function() {
      // Call parent method
      BaseQuiz.prototype.loadQuestion.call(this);

      // Custom styling for option buttons
      const optionButtons = document.querySelectorAll('.option-btn');
      optionButtons.forEach(button => {
        button.style.backgroundColor = "#e8f5e9";
        button.disabled = false;
      });
    };

    // Override selectOption to handle custom feedback
    waterConservationQuiz.selectOption = function(element, optionIndex) {
      // Call parent method
      BaseQuiz.prototype.selectOption.call(this, element, optionIndex);

      // Custom feedback and styling
      const feedbackEl = document.getElementById('feedback');
      const nextBtn = document.getElementById('nextBtn');
      const optionButtons = document.querySelectorAll('.option-btn');

      optionButtons.forEach(b => b.disabled = true);

      if (element.dataset.correct === "true") {
        element.style.background = "#a5d6a7";
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.style.color = "green";
      } else {
        element.style.background = "#ef9a9a";
        feedbackEl.textContent = "❌ Not quite right";
        feedbackEl.style.color = "red";
      }

      if (nextBtn) nextBtn.disabled = false;
    };

    // Override showResult for custom completion display
    waterConservationQuiz.showResult = function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom completion display
      const questionEl = document.getElementById('question');
      const optionsEl = document.querySelector('.options');
      const nextBtn = document.getElementById('nextBtn');
      const feedbackEl = document.getElementById('feedback');

      questionEl.textContent = "🎉 Quiz Completed!";
      if (optionsEl) optionsEl.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      feedbackEl.textContent = `Final score ${this.score}/${this.questions.length}`;
      feedbackEl.style.color = "#2e7d32";
    };

    // Override startQuiz to handle screen transitions
    waterConservationQuiz.startQuiz = function() {
      // Custom screen transition
      const readyScreen = document.getElementById('readyScreen');
      const quizScreen = document.getElementById('quizScreen');

      if (readyScreen) readyScreen.classList.add('hidden');
      if (quizScreen) quizScreen.classList.remove('hidden');

      // Call parent method
      BaseQuiz.prototype.startQuiz.call(this);
    };

    waterConservationQuiz.initializeQuiz();
  } catch (error) {
    console.error('Error loading water conservation quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
}

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  if (waterConservationQuiz) waterConservationQuiz.startQuiz();
};
window.resumeQuiz = () => {
  if (waterConservationQuiz) waterConservationQuiz.resumeQuiz();
};
window.nextQuestion = () => {
  if (waterConservationQuiz) waterConservationQuiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadWaterConservationQuiz);
