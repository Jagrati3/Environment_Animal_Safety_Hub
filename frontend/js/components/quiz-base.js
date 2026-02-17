/**
 * Base Quiz Class - Common functionality for all quiz implementations
 *
 * This class provides the core quiz functionality that is shared across all
 * specific quiz types (waste management, animal first aid, etc.). Specific
 * quizzes should extend this class and provide their own configuration.
 *
 * Now uses ProgressManager for unified progress tracking.
 *
 * @class BaseQuiz
 */

// Import ProgressManager (assuming it's loaded via script tag in HTML)
class BaseQuiz {
  /**
   * Create a new quiz instance
   * @param {Object} config - Quiz configuration object
   * @param {Array} config.questions - Array of quiz questions
   * @param {number} config.timeLimit - Time limit in seconds
   * @param {string} config.progressKey - localStorage key for progress
   * @param {string} config.iconClass - FontAwesome icon class for options
   * @param {Object} config.elements - DOM element references
   * @param {Object} config.scoring - Scoring configuration with remarks
   * @param {string} config.progressType - Type of progress display ('standard' or 'time-spent')
   */
  constructor(config) {
    this.config = config;
    this.questions = config.questions;
    this.timeLimit = config.timeLimit;
    this.progressKey = config.progressKey || `${config.id}-progress`;
    this.iconClass = config.iconClass;
    this.elements = config.elements;
    this.scoring = config.scoring;
    this.progressType = config.progressType || 'standard';

    // Initialize ProgressManager
    this.progressManager = new ProgressManager(this.progressKey);

    // Quiz state
    this.index = 0;
    this.score = 0;
    this.time = this.timeLimit;
    this.timer = null;
    this.answers = [];
  }



  /**
   * Initialize the quiz on page load
   */
  initializeQuiz() {
    // Check for existing progress using ProgressManager
    if (this.progressManager.canResume()) {
      const resumeSection = document.getElementById('resumeSection');
      if (resumeSection) {
        resumeSection.style.display = 'block';
      }
    }
  }

  /**
   * Start a new quiz session
   */
  startQuiz() {
    // Clear existing progress
    this.clearProgress();

    // Reset state
    this.index = 0;
    this.score = 0;
    this.time = this.timeLimit;
    this.answers = new Array(this.questions.length).fill(null);

    // Transition screens
    this.elements.startScreen.style.display = "none";
    this.elements.quizScreen.style.display = "block";

    // Load first question and start timer
    this.loadQuestion();
    this.startTimer();
  }

  /**
   * Resume a saved quiz session
   */
  resumeQuiz() {
    if (this.loadProgress()) {
      // Transition to quiz screen
      this.elements.startScreen.style.display = "none";
      this.elements.quizScreen.style.display = "block";

      // Load current question and resume timer
      this.loadQuestion();
      this.startTimer();
    }
  }

  /**
   * Start the countdown timer
   */
  startTimer() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.time--;
      this.updateTime();
      if (this.time <= 0) {
        this.showResult();
      }
    }, 1000);
  }

  /**
   * Update the timer display
   */
  updateTime() {
    let minutes = Math.floor(this.time / 60);
    let seconds = this.time % 60;
    this.elements.timeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  /**
   * Load and display the current question
   */
  loadQuestion() {
    let currentQuestion = this.questions[this.index];

    // Update progress text if element exists
    if (this.elements.progressText) {
      this.elements.progressText.textContent = `Question ${this.index + 1} of ${this.questions.length}`;
    }

    // Update progress bar if element exists
    if (this.elements.progressFill) {
      const progressPercent = ((this.index + 1) / this.questions.length) * 100;
      this.elements.progressFill.style.width = `${progressPercent}%`;
    }

    // Display question
    this.elements.questionEl.textContent = `Q${this.index + 1}. ${currentQuestion.q}`;

    // Clear previous options
    this.elements.optionsEl.innerHTML = "";

    // Create option elements
    currentQuestion.o.forEach((optionText, optionIndex) => {
      let optionDiv = document.createElement("div");
      optionDiv.className = "option";

      // Add icon and option text
      optionDiv.innerHTML = `<i class="${this.iconClass}"></i> ${optionText}`;

      // Click handler
      optionDiv.onclick = () => this.selectOption(optionDiv, optionIndex);

      // Restore previous selection
      if (this.answers[this.index] === optionIndex) {
        optionDiv.classList.add("selected");
      }

      this.elements.optionsEl.appendChild(optionDiv);
    });
  }

  /**
   * Handle option selection
   * @param {HTMLElement} element - Selected option element
   * @param {number} optionIndex - Index of selected option
   */
  selectOption(element, optionIndex) {
    // Remove previous selection
    document.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));

    // Highlight selected option
    element.classList.add("selected");

    // Store answer
    this.answers[this.index] = optionIndex;

    // Store correctness for validation
    element.dataset.correct = (optionIndex === this.questions[this.index].a).toString();

    // Save progress
    this.saveProgress();
  }

  /**
   * Move to next question or show results
   */
  nextQuestion() {
    let selectedOption = document.querySelector(".option.selected");

    // Require selection
    if (!selectedOption) {
      alert("Please select an option 😊");
      return;
    }

    // Update score
    if (selectedOption.dataset.correct === "true") {
      this.score++;
    }

    // Move to next question or show results
    this.index++;
    if (this.index < this.questions.length) {
      this.loadQuestion();
    } else {
      this.showResult();
    }
  }

  /**
   * Display quiz results
   */
  showResult() {
    // Stop timer and clear progress
    clearInterval(this.timer);
    this.clearProgress();

    // Transition screens
    this.elements.quizScreen.style.display = "none";
    this.elements.resultScreen.style.display = "block";

    // Display score
    this.elements.scoreEl.textContent = `${this.score}/${this.questions.length}`;

    // Performance-based remark from config
    let remark = "";
    if (this.scoring) {
      if (this.score >= (this.scoring.excellent?.min || 8)) {
        remark = this.scoring.excellent?.remark || "🌟 Excellent!";
      } else if (this.score >= (this.scoring.good?.min || 5)) {
        remark = this.scoring.good?.remark || "👍 Good Effort!";
      } else {
        remark = this.scoring.poor?.remark || "🌱 Keep Learning!";
      }
    } else {
      // Fallback to hardcoded remarks if scoring config is missing
      if (this.score >= 8) {
        remark = "🌟 Excellent!";
      } else if (this.score >= 5) {
        remark = "👍 Good Effort!";
      } else {
        remark = "🌱 Keep Learning!";
      }
    }

    if (this.elements.remarkEl) {
      this.elements.remarkEl.textContent = remark;
    }

    // Report progress to global system
    if (window.UserProgress) {
      window.UserProgress.completeQuiz(
        this.config.id || 'unknown-quiz', // Ensure config has ID
        this.score,
        this.questions.length
      );
    }
  }

  /**
   * Save quiz progress using ProgressManager
   */
  saveProgress() {
    return this.progressManager.saveProgress({
      currentIndex: this.index,
      answers: this.answers,
      score: this.score,
      remainingTime: this.time
    });
  }

  /**
   * Load saved progress using ProgressManager
   * @returns {boolean} True if progress was loaded
   */
  loadProgress() {
    const progress = this.progressManager.loadProgress();
    if (progress) {
      this.index = progress.currentIndex || 0;
      this.answers = progress.answers || [];
      this.score = progress.score || 0;
      this.time = progress.remainingTime || this.timeLimit;
      return true;
    }
    return false;
  }

  /**
   * Clear saved progress using ProgressManager
   */
  clearProgress() {
    return this.progressManager.clearProgress();
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BaseQuiz;
}
