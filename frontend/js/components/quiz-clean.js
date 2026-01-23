/**
 * Quiz Module - Climate Quiz Battle
 * Handles quiz functionality, scoring, and AI interaction
 */

class QuizModule {
  constructor() {
    try {
      this.quizData = [
        {
          q: "Which gas causes global warming the most?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          answer: 1
        },
        {
          q: "Which is a renewable energy source?",
          options: ["Coal", "Solar", "Oil", "Gas"],
          answer: 1
        },
        {
          q: "Main cause of deforestation?",
          options: ["Recycling", "Tree planting", "Agriculture", "Rain"],
          answer: 2
        }
      ];

      this.index = 0;
      this.score = 0;
      this.combo = 0;
      this.time = 10;
      this.timer = null;

      this.elements = {
        question: document.getElementById("question"),
        options: document.querySelectorAll(".option"),
        scoreEl: document.getElementById("score"),
        comboEl: document.getElementById("combo"),
        timerEl: document.getElementById("timer"),
        aiResult: document.getElementById("ai-result"),
        nextBtn: document.getElementById("nextBtn")
      };

      this.init();
    } catch (error) {
      console.error('QuizModule initialization failed:', error);
      this.handleError('Failed to initialize quiz');
    }
  }

  init() {
    try {
      if (!this.elements.question) {
        throw new Error('Quiz elements not found');
      }
      
      this.bindEvents();
      this.loadQuestion();
    } catch (error) {
      console.error('Quiz init failed:', error);
      this.handleError('Quiz initialization failed');
    }
  }

  bindEvents() {
    if (this.elements.nextBtn) {
      this.elements.nextBtn.onclick = () => this.nextQuestion();
    }
  }

  loadQuestion() {
    try {
      this.clearTimer();
      this.time = 10;
      
      if (this.elements.timerEl) {
        this.elements.timerEl.textContent = this.time;
      }

      const q = this.quizData[this.index];
      if (!q) throw new Error('Question data not found');
      
      this.elements.question.textContent = q.q;

      this.elements.options.forEach((btn, i) => {
        if (btn && q.options[i]) {
          btn.textContent = q.options[i];
          btn.className = "option";
          btn.onclick = () => this.selectAnswer(i);
        }
      });

      if (this.elements.aiResult) {
        this.elements.aiResult.textContent = "Thinking...";
      }
      this.startTimer();
    } catch (error) {
      console.error('Load question failed:', error);
      this.handleError('Failed to load question');
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time--;
      if (this.elements.timerEl) {
        this.elements.timerEl.textContent = this.time;
      }
      if (this.time === 0) {
        this.clearTimer();
        this.combo = 0;
        if (this.elements.comboEl) {
          this.elements.comboEl.textContent = this.combo;
        }
        this.aiTurn();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  selectAnswer(i) {
    try {
      this.clearTimer();
      const correct = this.quizData[this.index]?.answer;
      
      if (correct === undefined) {
        throw new Error('Answer data not found');
      }

      if (i === correct) {
        this.elements.options[i]?.classList.add("correct");
        this.score += 10 + this.combo * 5;
        this.combo++;
      } else {
        this.elements.options[i]?.classList.add("wrong");
        this.elements.options[correct]?.classList.add("correct");
        this.combo = 0;
      }

      if (this.elements.scoreEl) {
        this.elements.scoreEl.textContent = this.score;
      }
      if (this.elements.comboEl) {
        this.elements.comboEl.textContent = this.combo;
      }
      this.aiTurn();
    } catch (error) {
      console.error('Select answer failed:', error);
      this.handleError('Failed to process answer');
    }
  }

  aiTurn() {
    if (this.elements.aiResult) {
      this.elements.aiResult.textContent = Math.random() > 0.5
        ? "AI answered correctly 🤖✔️"
        : "AI answered wrong 🤖❌";
    }
  }

  nextQuestion() {
    this.index = (this.index + 1) % this.quizData.length;
    this.loadQuestion();
  }

  handleError(message) {
    if (this.elements.question) {
      this.elements.question.textContent = `Error: ${message}`;
    }
    console.error('QuizModule Error:', message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    new QuizModule();
  } catch (error) {
    console.error('Failed to initialize QuizModule:', error);
  }
});

export default QuizModule;