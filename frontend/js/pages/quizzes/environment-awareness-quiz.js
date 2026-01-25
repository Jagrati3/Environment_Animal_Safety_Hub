/**
 * Environment Awareness Quiz
 *
 * A comprehensive quiz designed to test and educate users about basic
 * environmental concepts, conservation practices, and ecological awareness.
 * Features 10 carefully crafted questions covering key environmental topics.
 *
 * Now extends BaseQuiz for unified progress tracking.
 *
 * @author Environment Animal Safety Hub Team
 * @version 2.0.0
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

// Load quiz data and create instance
let environmentAwarenessQuiz = null;

async function loadEnvironmentAwarenessQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'environment-awareness');
    if (!quizData) {
      throw new Error('Environment awareness quiz data not found');
    }

    const quizConfig = {
      questions: quizData.questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    environmentAwarenessQuiz = new BaseQuiz(quizConfig);

    // Override loadQuestion to include custom progress metrics
    environmentAwarenessQuiz.loadQuestion = function() {
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
    };

    // Override showResult for custom remarks
    environmentAwarenessQuiz.showResult = function() {
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
    };

    environmentAwarenessQuiz.initializeQuiz();
  } catch (error) {
    console.error('Error loading environment awareness quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
}

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  if (environmentAwarenessQuiz) environmentAwarenessQuiz.startQuiz();
};
window.resumeQuiz = () => {
  if (environmentAwarenessQuiz) environmentAwarenessQuiz.resumeQuiz();
};
window.nextQuestion = () => {
  if (environmentAwarenessQuiz) environmentAwarenessQuiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadEnvironmentAwarenessQuiz);
