/**
 * Pollution Awareness Quiz - Environmental Education Assessment
 *
 * An interactive quiz focused on different types of pollution, their impacts,
 * and ways to reduce pollution. Designed to educate users about air, water,
 * soil, and noise pollution and promote sustainable practices.
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
let pollutionAwarenessQuiz = null;

async function loadPollutionAwarenessQuiz() {
  // Custom overrides for pollution awareness specific behavior
  const customOverrides = {
    loadQuestion: function() {
      // Call parent method
      BaseQuiz.prototype.loadQuestion.call(this);

      // Update questions completed metric
      const questionsCompleted = document.getElementById('questionsCompleted');
      if (questionsCompleted) {
        questionsCompleted.textContent = `Completed: ${this.index + 1}/${this.questions.length}`;
      }
    }
  };

  pollutionAwarenessQuiz = await QuizLoader.loadQuiz('pollution-awareness', elements, customOverrides);
}

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadPollutionAwarenessQuiz);
