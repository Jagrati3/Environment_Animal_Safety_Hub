/**
 * Animal First Aid Quiz - Emergency Animal Care Assessment
 *
 * An interactive quiz focused on proper first aid procedures for injured animals.
 * Tests knowledge of emergency response, wound treatment, and when to seek professional help.
 *
 * Uses QuizLoader for unified loading and initialization.
 *
 * @author Environment Animal Safety Hub Team
 * @version 3.0.0
 * @since 2024
 */

// Create quiz loader with custom overrides
const animalFirstAidLoader = new QuizLoader('animal-first-aid', {
  customOverrides: {
    // Custom showResult for animal first aid remarks
    showResult: function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for animal first aid
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Animal Hero!";
      } else if (this.score >= 5) {
        remark = "👍 Good Effort!";
      } else {
        remark = "🐾 Keep Learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    }
  }
});

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  const quiz = animalFirstAidLoader.getQuiz();
  if (quiz) quiz.startQuiz();
};
window.resumeQuiz = () => {
  const quiz = animalFirstAidLoader.getQuiz();
  if (quiz) quiz.resumeQuiz();
};
window.nextQuestion = () => {
  const quiz = animalFirstAidLoader.getQuiz();
  if (quiz) quiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', () => {
  animalFirstAidLoader.loadQuiz();
});
