// Behavioral Addiction to Human Food Subsidies - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initAddictionSimulator();
  initDependenceNetwork();
  initQuizSystem();
});

// Scroll animations for sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all major sections
  const sections = document.querySelectorAll('.section, .cta-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animated counters for statistics
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const isPercentage = text.includes('%');
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/-/g, ''));

        if (isNumber || isPercentage) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(number => {
    counterObserver.observe(number);
  });
}

// Counter animation function
function animateCounter(element, finalText) {
  if (element.hasAttribute('data-animated')) return;

  element.setAttribute('data-animated', 'true');

  // Extract number from text
  const numberMatch = finalText.match(/[\d,]+/);
  if (!numberMatch) return;

  const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
  const isPercentage = finalText.includes('%');
  const hasDash = finalText.includes('-');

  let currentNumber = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = finalNumber / steps;

  const timer = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= finalNumber) {
      currentNumber = finalNumber;
      clearInterval(timer);
    }

    let displayText = Math.floor(currentNumber).toLocaleString();
    if (isPercentage) displayText += '%';
    else if (hasDash) displayText += '-';

    element.textContent = displayText;
  }, duration / steps);
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.mechanism-card, .impact-card, .solution-item, .evidence-item');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
  });
}

// Addiction progression simulator
function initAddictionSimulator() {
  const simulator = document.createElement('div');
  simulator.className = 'addiction-simulator';
  simulator.innerHTML = `
    <h3>🧠 Simulate Addiction Formation</h3>
    <div class="simulator-controls">
      <label>Human Food Availability: <span id="foodLevel">50%</span></label>
      <input type="range" id="foodSlider" min="0" max="100" value="50">
      <label>Natural Food Availability: <span id="naturalLevel">50%</span></label>
      <input type="range" id="naturalSlider" min="0" max="100" value="50">
    </div>
    <div class="simulator-result">
      <div class="addiction-meter">
        <div class="meter-fill" id="addictionFill"></div>
        <span class="meter-label" id="addictionLabel">Low Risk</span>
      </div>
      <p id="simulatorText">Adjust food availability to see how wildlife addiction risk changes.</p>
    </div>
  `;

  // Insert after the mechanisms section
  const mechanismsSection = document.querySelector('.section:nth-of-type(2)');
  if (mechanismsSection) {
    mechanismsSection.appendChild(simulator);
  }

  // Add event listeners
  const foodSlider = document.getElementById('foodSlider');
  const naturalSlider = document.getElementById('naturalSlider');

  function updateSimulator() {
    const foodLevel = parseInt(foodSlider.value);
    const naturalLevel = parseInt(naturalSlider.value);

    document.getElementById('foodLevel').textContent = foodLevel + '%';
    document.getElementById('naturalLevel').textContent = naturalLevel + '%';

    // Calculate addiction risk (higher human food + lower natural food = higher risk)
    const addictionRisk = Math.min(100, Math.max(0, (foodLevel * 1.5) - (naturalLevel * 0.8)));

    const fill = document.getElementById('addictionFill');
    const label = document.getElementById('addictionLabel');
    const text = document.getElementById('simulatorText');

    fill.style.width = addictionRisk + '%';

    if (addictionRisk < 30) {
      fill.style.background = '#27ae60';
      label.textContent = 'Low Risk';
      text.textContent = 'Natural foraging behaviors are likely to be maintained.';
    } else if (addictionRisk < 70) {
      fill.style.background = '#f39c12';
      label.textContent = 'Moderate Risk';
      text.textContent = 'Some behavioral changes may occur with persistent human food availability.';
    } else {
      fill.style.background = '#e74c3c';
      label.textContent = 'High Risk';
      text.textContent = 'Strong addiction formation likely, with significant behavioral and ecological impacts.';
    }
  }

  foodSlider.addEventListener('input', updateSimulator);
  naturalSlider.addEventListener('input', updateSimulator);

  updateSimulator();
}

// Dependence network visualization
function initDependenceNetwork() {
  const network = document.createElement('div');
  network.className = 'dependence-network';
  network.innerHTML = `
    <h3>🔗 Wildlife Dependence Network</h3>
    <div class="network-container">
      <div class="network-node human-food">
        <div class="node-icon">🍕</div>
        <div class="node-label">Human Food</div>
      </div>
      <div class="network-node wildlife">
        <div class="node-icon">🦊</div>
        <div class="node-label">Wildlife</div>
      </div>
      <div class="network-node natural-food">
        <div class="node-icon">🌰</div>
        <div class="node-label">Natural Food</div>
      </div>
      <svg class="network-links" viewBox="0 0 400 200">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7"
           refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e67e22" />
          </marker>
        </defs>
        <line x1="80" y1="100" x2="160" y2="100" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead)" class="link human-wildlife" />
        <line x1="240" y1="100" x2="320" y2="100" stroke="#27ae60" stroke-width="3" marker-end="url(#arrowhead)" class="link wildlife-natural" />
        <line x1="200" y1="60" x2="200" y2="140" stroke="#95a5a6" stroke-width="2" stroke-dasharray="5,5" class="link feedback" />
      </svg>
    </div>
    <div class="network-legend">
      <div class="legend-item">
        <div class="legend-color" style="background: #e67e22;"></div>
        <span>Strong Addiction Link</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #27ae60;"></div>
        <span>Natural Foraging Link</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #95a5a6; height: 2px;"></div>
        <span>Feedback Loop</span>
      </div>
    </div>
  `;

  // Insert after the ecological consequences section
  const consequencesSection = document.querySelector('.section:nth-of-type(3)');
  if (consequencesSection) {
    consequencesSection.appendChild(network);
  }

  // Add CSS for network
  const style = document.createElement('style');
  style.textContent = `
    .dependence-network {
      margin-top: 40px;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 12px;
    }
    .network-container {
      position: relative;
      height: 200px;
      margin: 30px 0;
    }
    .network-node {
      position: absolute;
      text-align: center;
      transition: all 0.3s ease;
    }
    .network-node.human-food { left: 20px; top: 80px; }
    .network-node.wildlife { left: 180px; top: 80px; }
    .network-node.natural-food { left: 340px; top: 80px; }
    .node-icon {
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin: 0 auto 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .node-label {
      font-weight: 600;
      color: #2c3e50;
    }
    .network-links {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .network-legend {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 3px;
    }
  `;
  document.head.appendChild(style);
}

// Quiz system
function initQuizSystem() {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizResult = document.getElementById('quizResult');
  let currentQuestion = 0;
  let score = 0;

  const questions = [
    {
      correct: 'true',
      explanation: 'Over 80% of terrestrial ecosystems near human settlements are affected by food subsidies from tourism and urban waste.'
    },
    {
      correct: 'true',
      explanation: 'Dopamine reward pathways in the brain are primarily responsible for the addictive nature of human food subsidies.'
    }
  ];

  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      const questionIndex = Array.from(this.parentElement.parentElement.children).indexOf(this.parentElement);
      const isCorrect = this.getAttribute('data-correct') === 'true';

      // Remove previous selections
      this.parentElement.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
      });

      // Mark answer
      if (isCorrect) {
        this.classList.add('correct');
        score++;
      } else {
        this.classList.add('incorrect');
        // Show correct answer
        this.parentElement.querySelector('[data-correct="true"]').classList.add('correct');
      }

      // Show result after all questions
      if (questionIndex === questions.length - 1) {
        showQuizResult();
      }
    });
  });

  function showQuizResult() {
    quizResult.classList.remove('success', 'error');

    if (score === questions.length) {
      quizResult.classList.add('success');
      quizResult.textContent = `🎉 Perfect! You got all ${score} questions correct. You have a great understanding of food subsidy addiction!`;
    } else if (score >= questions.length * 0.7) {
      quizResult.classList.add('success');
      quizResult.textContent = `👍 Well done! You got ${score} out of ${questions.length} questions correct. Keep learning about wildlife conservation!`;
    } else {
      quizResult.classList.add('error');
      quizResult.textContent = `📚 You got ${score} out of ${questions.length} questions correct. Review the content above to learn more about food subsidy addiction.`;
    }

    quizResult.style.display = 'block';
  }
}

// Add some CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .addiction-simulator {
    margin-top: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
    border-radius: 12px;
    border: 2px solid #e67e22;
  }

  .simulator-controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }

  .simulator-controls label {
    font-weight: 600;
    color: #2c3e50;
  }

  .simulator-controls input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #ddd;
    outline: none;
  }

  .simulator-controls input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e67e22;
    cursor: pointer;
  }

  .addiction-meter {
    width: 100%;
    height: 30px;
    background: #eee;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;
  }

  .meter-fill {
    height: 100%;
    width: 0%;
    transition: width 0.5s ease;
  }

  .meter-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }
`;
document.head.appendChild(animationStyles);