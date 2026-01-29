/**
 * Environment Awareness Quiz
 *
 * A comprehensive quiz designed to test and educate users about basic
 * environmental concepts, conservation practices, and ecological awareness.
 * Features 10 carefully crafted questions covering key environmental topics.
 *
 * Uses QuizLoader for unified loading and initialization.
 *
 * @author Environment Animal Safety Hub Team
 * @version 3.0.0
 * @since 2024
 */

// Create quiz loader with custom overrides
const environmentAwarenessLoader = new QuizLoader('environment-awareness', {
  customElements: {
    progressText: document.querySelector('.progress-metrics span:first-child'),
    progressFill: document.getElementById('progressFill')
  },
  customOverrides: {
    // Custom loadQuestion for progress metrics
    loadQuestion: function() {
      // Call parent method
      BaseQuiz.prototype.loadQuestion.call(this);

      // Update custom progress metrics
      if (this.config.elements.progressText) {
        const timeSpent = this.config.timeLimit - this.time;
        this.config.elements.progressText.textContent = `Time Spent: ${timeSpent}s`;
      }

      const questionsCompleted = document.querySelector('.progress-metrics span:last-child');
      if (questionsCompleted) {
        questionsCompleted.textContent = `Completed: ${this.index + 1}/${this.questions.length}`;
      }
    },

    // Custom showResult for environment awareness remarks
    showResult: function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for environment awareness
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Eco Champion!";
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
  const quiz = environmentAwarenessLoader.getQuiz();
  if (quiz) quiz.startQuiz();
};
window.resumeQuiz = () => {
  const quiz = environmentAwarenessLoader.getQuiz();
  if (quiz) quiz.resumeQuiz();
};
window.nextQuestion = () => {
  const quiz = environmentAwarenessLoader.getQuiz();
  if (quiz) quiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', () => {
  environmentAwarenessLoader.loadQuiz();
});
