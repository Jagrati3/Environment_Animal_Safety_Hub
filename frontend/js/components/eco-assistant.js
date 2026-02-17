class EcoAssistant {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.synth = window.speechSynthesis;

    this.triggers = {
      navigation: {
        home: ['home', 'top', 'start'],
        about: ['about', 'who are you', 'mission'],
        animal: ['animal', 'pet', 'adopt', 'rescue'],
        environment: ['environment', 'nature', 'planet'],
        plants: ['plant', 'garden', 'green'],
        'climate-quiz': ['quiz', 'game', 'play'],
      },
      actions: {
        recycle:
          'Recycling saves energy and resources. Sort your waste into wet and dry bins.',
        batteries:
          'Batteries contain toxic chemicals. Drop them at e-waste centers.',
        plastic:
          'Avoid single-use plastics. Use cloth bags and reusable bottles.',
        hello:
          'Hello! I am EcoLife, your eco-friendly assistant. How can I help you?',
        help:
          'You can ask me to navigate to sections or ask for recycling tips.',
      },
    };

    this.init();
  }

  init() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;

    this.bindMicButton();
    this.createFeedbackUI();
    this.attachRecognitionEvents();
  }

  /* 🔗 Bind to EXISTING mic button (FAB) */
  bindMicButton() {
    const micBtn = document.querySelector('.mic-btn');

    if (!micBtn) {
      console.warn('Mic button (.mic-btn) not found in DOM.');
      return;
    }

    this.ui = { btn: micBtn };

    micBtn.addEventListener('click', () => this.toggleListening());
  }

  /* 🧠 Feedback UI only (no button creation) */
  createFeedbackUI() {
    const feedback = document.createElement('div');
    feedback.className = 'eco-assistant-feedback';
    feedback.innerHTML = `
      <h4>Eco Assistant</h4>
      <p id="eco-feedback-text">Listening...</p>
    `;

    document.body.appendChild(feedback);

    this.ui.feedback = feedback;
    this.ui.text = feedback.querySelector('p');
  }

  attachRecognitionEvents() {
    this.recognition.onstart = () => {
      this.isListening = true;
      this.ui.btn.classList.add('listening');
      this.showFeedback('Listening...', true);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.ui.btn.classList.remove('listening');
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      this.processCommand(transcript);
    };

    this.recognition.onerror = () => {
      this.speak("Sorry, I didn't catch that.");
      this.showFeedback("Sorry, I didn't catch that.", true);
      setTimeout(() => this.hideFeedback(), 3000);
    };
  }

  toggleListening() {
    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  processCommand(transcript) {
    this.showFeedback(`You said: "${transcript}"`, true);

    let handled = false;

    for (const [id, keys] of Object.entries(this.triggers.navigation)) {
      if (keys.some((k) => transcript.includes(k))) {
        this.scrollToSection(id);
        this.speak(`Navigating to ${id.replace('-', ' ')} section.`);
        handled = true;
        break;
      }
    }

    if (!handled) {
      for (const [key, response] of Object.entries(this.triggers.actions)) {
        if (transcript.includes(key)) {
          this.speak(response);
          this.showFeedback(response, true);
          handled = true;
          break;
        }
      }
    }

    if (!handled) {
      const msg =
        "I'm not sure how to help with that. Try asking about recycling.";
      this.speak(msg);
      this.showFeedback(msg, true);
    }

    setTimeout(() => this.hideFeedback(), 5000);
  }

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  speak(text) {
    if (this.synth.speaking) this.synth.cancel();
    this.synth.speak(new SpeechSynthesisUtterance(text));
  }

  showFeedback(text, active) {
    this.ui.text.textContent = text;
    if (active) this.ui.feedback.classList.add('active');
  }

  hideFeedback() {
    this.ui.feedback.classList.remove('active');
  }
}

/* 🚀 Init */
document.addEventListener('DOMContentLoaded', () => {
  window.ecoAssistant = new EcoAssistant();
});
