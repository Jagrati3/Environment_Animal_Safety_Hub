/**
 * Climate Change Quiz
 *
 * An interactive quiz focused on climate change awareness and environmental impact.
 *
 * Uses QuizLoader for unified loading and initialization.
 *
 * @author Environment Animal Safety Hub Team
 * @version 3.0.0
 * @since 2024
 */

// Create quiz loader with custom overrides
const climateChangeLoader = new QuizLoader('climate-change', {
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

    // Custom showResult for climate change remarks
    showResult: function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for climate change
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Climate Champion!";
      } else if (this.score >= 5) {
        remark = "👍 Good effort!";
      } else {
        remark = "🌱 Keep learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    }
  }
});

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  const quiz = climateChangeLoader.getQuiz();
  if (quiz) quiz.startQuiz();
};
window.resumeQuiz = () => {
  const quiz = climateChangeLoader.getQuiz();
  if (quiz) quiz.resumeQuiz();
};
window.nextQuestion = () => {
  const quiz = climateChangeLoader.getQuiz();
  if (quiz) quiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', () => {
  climateChangeLoader.loadQuiz();
});
