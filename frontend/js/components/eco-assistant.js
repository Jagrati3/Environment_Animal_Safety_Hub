class EcoAssistant {
    constructor() {
        this.isListening = false;
        this.recognition = null;
        this.synth = window.speechSynthesis;
        this.triggers = {
            navigation: {
                'home': ['home', 'top', 'start'],
                'about': ['about', 'who are you', 'mission'],
                'animal': ['animal', 'pet', 'adopt', 'rescue'],
                'environment': ['environment', 'nature', 'planet'],
                'plants': ['plant', 'garden', 'green'],
                'climate-quiz': ['quiz', 'game', 'play']
            },
            actions: {
                'recycle': 'Recycling saves energy and resources. Sort your waste into wet and dry bins using the green and blue bins respectively.',
                'batteries': 'Batteries contain toxic chemicals. Please drop them off at designated e-waste collection centers, do not throw them in regular trash.',
                'plastic': 'Avoid single-use plastics. Use cloth bags and reusable bottles. Plastic takes hundreds of years to decompose.',
                'hello': 'Hello! I am EcoLife, your eco-friendly assistant. How can I help you today?',
                'help': 'You can ask me to navigate to sections like animals or quiz, or ask about recycling tips.'
            }
        };

        this.init();
    }

    init() {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech Recognition API not supported in this browser.');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;

        this.createUI();
        this.attachEvents();
    }

    createUI() {
        const container = document.createElement('div');
        container.className = 'eco-assistant-container';

        const feedback = document.createElement('div');
        feedback.className = 'eco-assistant-feedback';
        feedback.innerHTML = `
            <h4>Eco Assistant</h4>
            <p id="eco-feedback-text">Listening...</p>
        `;

        const btn = document.createElement('button');
        btn.className = 'eco-assistant-btn';
        btn.setAttribute('aria-label', 'Activate Voice Assistant');
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';

        container.appendChild(feedback);
        container.appendChild(btn);
        document.body.appendChild(container);

        this.ui = {
            container,
            btn,
            feedback,
            text: feedback.querySelector('p')
        };
    }

    attachEvents() {
        this.ui.btn.addEventListener('click', () => {
            this.toggleListening();
        });

        this.recognition.onstart = () => {
            this.isListening = true;
            this.ui.btn.classList.add('listening');
            this.showFeedback('Listening...', true);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.ui.btn.classList.remove('listening');
            // Hide feedback after a delay if no result was processed immediately
            // But we usually hide it after speaking response
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            this.processCommand(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            this.showFeedback('Sorry, I didn\'t catch that.', true);
            this.speak('Sorry, I didn\'t catch that.');
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

        let actionFound = false;

        // Check Navigation
        for (const [sectionId, keywords] of Object.entries(this.triggers.navigation)) {
            if (keywords.some(k => transcript.includes(k))) {
                this.scrollToSection(sectionId);
                this.speak(`Navigating to ${sectionId.replace('-', ' ')} section.`);
                actionFound = true;
                break;
            }
        }

        // Check Q&A / Actions
        if (!actionFound) {
            for (const [key, response] of Object.entries(this.triggers.actions)) {
                if (transcript.includes(key)) {
                    this.speak(response);
                    this.showFeedback(response, true);
                    actionFound = true;
                    break;
                }
            }
        }

        if (!actionFound) {
            const defaultMsg = "I'm not sure how to help with that. Try asking about recycling or navigation.";
            this.speak(defaultMsg);
            this.showFeedback(defaultMsg, true);
        }

        // Auto hide feedback after speaking completes (rough estimate)
        setTimeout(() => this.hideFeedback(), 5000);
    }

    scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Section #${id} not found.`);
        }
    }

    speak(text) {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        this.synth.speak(utterance);
    }

    showFeedback(text, active) {
        this.ui.text.textContent = text;
        if (active) this.ui.feedback.classList.add('active');
    }

    hideFeedback() {
        this.ui.feedback.classList.remove('active');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.ecoAssistant = new EcoAssistant();
});
