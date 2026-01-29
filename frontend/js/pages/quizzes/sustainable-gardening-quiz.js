/**
 * Sustainable Gardening Quiz
 *
 * An interactive quiz focused on sustainable gardening practices and environmental awareness.
 * Features randomized questions and customizable time limits.
 *
 * Uses QuizLoader for unified loading and initialization.
 *
 * @author Environment Animal Safety Hub Team
 * @version 3.0.0
 * @since 2024
 */

// Create quiz loader with randomization and custom overrides
const sustainableGardeningLoader = new QuizLoader('sustainable-gardening', {
  randomizeQuestions: { count: 7 },
  customOverrides: {
    // Custom startQuiz to handle time selection
    startQuiz: function() {
      // Check for custom time selection
      const timeSelect = document.getElementById('timeSelect');
      if (timeSelect) {
        this.timeLimit = parseInt(timeSelect.value);
      }

      // Call parent method
      BaseQuiz.prototype.startQuiz.call(this);
    },

    // Custom showResult for sustainable gardening remarks
    showResult: function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for sustainable gardening
      let remark = "";
      if (this.score >= 6) {
        remark = "🌟 Sustainable Gardening Expert!";
      } else if (this.score >= 4) {
        remark = "👍 Good Job!";
      } else {
        remark = "🌱 Keep Learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    }
  }
});

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  const quiz = sustainableGardeningLoader.getQuiz();
  if (quiz) quiz.startQuiz();
};
window.resumeQuiz = () => {
  const quiz = sustainableGardeningLoader.getQuiz();
  if (quiz) quiz.resumeQuiz();
};
window.nextQuestion = () => {
  const quiz = sustainableGardeningLoader.getQuiz();
  if (quiz) quiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', () => {
  sustainableGardeningLoader.loadQuiz();
});
