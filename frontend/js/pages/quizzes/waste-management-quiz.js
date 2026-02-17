/**
 * Waste Management Quiz - Environmental Education Assessment
 *
 * An interactive quiz focused on proper waste disposal, recycling practices,
 * and environmental awareness. Designed to educate users about waste segregation,
 * recycling, and sustainable waste management practices.
 *
 * Now uses QuizLoader for unified initialization and event handling.
 *
 * @author Environment Animal Safety Hub Team
 * @version 2.1.0
 * @since 2024
 */

// DOM elements
const elements = {
  startScreen: document.getElementById('startScreen'),
  quizScreen: document.getElementById('quizScreen'),
  resultScreen: document.getElementById('resultScreen'),
  questionEl: document.getElementById('question'),
  optionsEl: document.getElementById('options'),
  timeEl: document.getElementById('time'),
  scoreEl: document.getElementById('score'),
  remarkEl: document.getElementById('remark'),
  progressText: document.querySelector('.progress-metrics span:first-child'),
  progressFill: document.getElementById('progressFill')
};

// Load quiz using QuizLoader
let wasteManagementQuiz = null;

async function loadWasteManagementQuiz() {
  // Custom overrides for waste management specific behavior
  const customOverrides = {
    loadQuestion: function() {
      // Call parent method
      BaseQuiz.prototype.loadQuestion.call(this);

      // Update questions completed metric
      const questionsCompleted = document.querySelector('.progress-metrics span:last-child');
      if (questionsCompleted) {
        questionsCompleted.textContent = `Completed: ${this.index + 1}/${this.questions.length}`;
      }
    }
  };

  wasteManagementQuiz = await QuizLoader.loadQuiz('waste-management', elements, customOverrides);
}

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  if (wasteManagementQuiz) wasteManagementQuiz.startQuiz();
};
window.resumeQuiz = () => {
  if (wasteManagementQuiz) wasteManagementQuiz.resumeQuiz();
};
window.nextQuestion = () => {
  if (wasteManagementQuiz) wasteManagementQuiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadWasteManagementQuiz);
