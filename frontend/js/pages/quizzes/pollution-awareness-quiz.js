/**
 * Pollution Awareness Quiz - Environmental Education Assessment
 *
 * An interactive quiz focused on different types of pollution, their impacts,
 * and ways to reduce pollution. Designed to educate users about air, water,
 * soil, and noise pollution and promote sustainable practices.
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
let pollutionAwarenessQuiz = null;

async function loadPollutionAwarenessQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'pollution-awareness');
    if (!quizData) {
      throw new Error('Pollution awareness quiz data not found');
    }

    const quizConfig = {
      questions: quizData.questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    pollutionAwarenessQuiz = new BaseQuiz(quizConfig);

    // Override loadQuestion to include custom progress metrics
    pollutionAwarenessQuiz.loadQuestion = function() {
      // Call parent method
      BaseQuiz.prototype.loadQuestion.call(this);

      // Update custom progress metrics
      const timeSpentEl = document.getElementById('timeSpent');
      if (timeSpentEl) {
        const timeSpent = this.config.timeLimit - this.time;
        timeSpentEl.textContent = `Time Spent: ${timeSpent}s`;
      }

      const questionsCompleted = document.getElementById('questionsCompleted');
      if (questionsCompleted) {
        questionsCompleted.textContent = `Completed: ${this.index + 1}/${this.questions.length}`;
      }
    };

    // Override showResult for custom remarks
    pollutionAwarenessQuiz.showResult = function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for pollution awareness
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Pollution Fighter!";
      } else if (this.score >= 5) {
        remark = "👍 Good Awareness!";
      } else {
        remark = "🌱 Keep Learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    };

    pollutionAwarenessQuiz.initializeQuiz();

    // Add event listeners for quiz interactions
    setupEventListeners();
  } catch (error) {
    console.error('Error loading pollution awareness quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
}

// Setup event listeners
function setupEventListeners() {
  // Start quiz button
  const startBtn = document.getElementById('startQuizBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => pollutionAwarenessQuiz.startQuiz());
  }

  // Resume saved quiz button
  const resumeSavedBtn = document.getElementById('resumeSavedQuizBtn');
  if (resumeSavedBtn) {
    resumeSavedBtn.addEventListener('click', () => pollutionAwarenessQuiz.resumeQuiz());
  }

  // Next question button
  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => pollutionAwarenessQuiz.nextQuestion());
  }

  // Pause button
  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      clearInterval(pollutionAwarenessQuiz.timer);
      pollutionAwarenessQuiz.timer = null;
      pollutionAwarenessQuiz.saveProgress();
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
      pollutionAwarenessQuiz.startTimer();
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
}

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadPollutionAwarenessQuiz);
