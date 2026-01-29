/**
 * Water Conservation Quiz
 *
 * An interactive quiz focused on water conservation practices and awareness.
 *
 * Uses QuizLoader for unified loading and initialization.
 *
 * @author Environment Animal Safety Hub Team
 * @version 3.0.0
 * @since 2024
 */

// Create quiz loader with custom elements and overrides
const waterConservationLoader = new QuizLoader('water-conservation', {
  customElements: {
    startScreen: document.getElementById('readyScreen'),
    quizScreen: document.getElementById('quizScreen'),
    resultScreen: document.getElementById('quizScreen'), // Reuse quiz screen for results
    questionEl: document.getElementById('question'),
    optionsEl: document.getElementById('options'),
    timeEl: null, // No timer display
    scoreEl: document.getElementById('score'),
    remarkEl: document.getElementById('feedback')
  },
  customOverrides: {
    // Custom loadQuestion to handle option buttons
    loadQuestion: function() {
      // Call parent method
      BaseQuiz.prototype.loadQuestion.call(this);

      // Custom styling for option buttons
      const optionButtons = document.querySelectorAll('.option-btn');
      optionButtons.forEach(button => {
        button.style.backgroundColor = "#e8f5e9";
        button.disabled = false;
      });
    },

    // Custom selectOption to handle feedback
    selectOption: function(element, optionIndex) {
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
    },

    // Custom showResult for completion display
    showResult: function() {
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
    },

    // Custom startQuiz for screen transitions
    startQuiz: function() {
      // Custom screen transition
      const readyScreen = document.getElementById('readyScreen');
      const quizScreen = document.getElementById('quizScreen');

      if (readyScreen) readyScreen.classList.add('hidden');
      if (quizScreen) quizScreen.classList.remove('hidden');

      // Call parent method
      BaseQuiz.prototype.startQuiz.call(this);
    }
  }
});

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  const quiz = waterConservationLoader.getQuiz();
  if (quiz) quiz.startQuiz();
};
window.resumeQuiz = () => {
  const quiz = waterConservationLoader.getQuiz();
  if (quiz) quiz.resumeQuiz();
};
window.nextQuestion = () => {
  const quiz = waterConservationLoader.getQuiz();
  if (quiz) quiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', () => {
  waterConservationLoader.loadQuiz();
});
