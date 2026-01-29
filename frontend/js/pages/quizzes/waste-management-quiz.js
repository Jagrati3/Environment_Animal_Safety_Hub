/**
 * Waste Management Quiz - Environmental Education Assessment
 *
 * An interactive quiz focused on proper waste disposal, recycling practices,
 * and environmental awareness. Designed to educate users about waste segregation,
 * recycling, and sustainable waste management practices.
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
let wasteManagementQuiz = null;

async function loadWasteManagementQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'waste-management');
    if (!quizData) {
      throw new Error('Waste management quiz data not found');
    }

    const quizConfig = {
      questions: quizData.questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    wasteManagementQuiz = new BaseQuiz(quizConfig);

    // Override loadQuestion to include custom progress metrics
    wasteManagementQuiz.loadQuestion = function() {
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
    wasteManagementQuiz.showResult = function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for waste management
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Waste Warrior!";
      } else if (this.score >= 5) {
        remark = "👍 Good Effort!";
      } else {
        remark = "🌱 Keep Learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    };

    wasteManagementQuiz.initializeQuiz();

    // Add event listeners for quiz interactions
    // Start quiz button
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => wasteManagementQuiz.startQuiz());
    }

    // Resume saved quiz button
    const resumeSavedBtn = document.getElementById('resumeSavedQuizBtn');
    if (resumeSavedBtn) {
      resumeSavedBtn.addEventListener('click', () => wasteManagementQuiz.resumeQuiz());
    }

    // Next question button
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => wasteManagementQuiz.nextQuestion());
    }

    // Pause button
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        clearInterval(wasteManagementQuiz.timer);
        wasteManagementQuiz.timer = null;
        wasteManagementQuiz.saveProgress();
        pauseBtn.style.display = 'none';
        document.getElementById('resumeBtn').style.display = 'inline-block';
        alert("Quiz paused! Click resume to continue.");
      });
    }

    // Resume button
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        resumeBtn.style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        wasteManagementQuiz.startTimer();
      });
    }

    // Play again button
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => location.reload());
    }

    // Back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => window.location.href = '../games/kids-zone.html');
    }
  } catch (error) {
    console.error('Error loading waste management quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
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
