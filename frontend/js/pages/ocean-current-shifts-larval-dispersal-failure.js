// Ocean Current Shifts and Larval Dispersal Failure - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initCurrentSimulator();
  initDispersalNetwork();
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
        const hasDash = text.includes('-');

        if (isPercentage || hasDash) {
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

// Ocean current simulator
function initCurrentSimulator() {
  const speedSlider = document.getElementById('currentSpeed');
  const directionSlider = document.getElementById('currentDirection');
  const speedValue = document.getElementById('speedValue');
  const directionValue = document.getElementById('directionValue');
  const recruitmentFill = document.getElementById('recruitmentFill');
  const recruitmentLabel = document.getElementById('recruitmentLabel');
  const simulatorText = document.getElementById('simulatorText');
  const currentFlow = document.getElementById('currentFlow');
  const larvaeGroup = document.getElementById('larvaeGroup');

  function updateSimulator() {
    const speed = parseInt(speedSlider.value);
    const direction = parseInt(directionSlider.value);

    speedValue.textContent = speed + '%';
    directionValue.textContent = direction + '°';

    // Calculate recruitment success based on speed and direction
    // Optimal: high speed (80-100%), minimal direction shift (0°)
    const speedFactor = Math.max(0, (speed - 20) / 80); // 0-1 scale
    const directionFactor = Math.max(0, 1 - Math.abs(direction) / 45); // 0-1 scale
    const recruitmentSuccess = Math.min(100, Math.max(0, (speedFactor * directionFactor * 100)));

    recruitmentFill.style.width = recruitmentSuccess + '%';

    // Update animations
    const speedMultiplier = speed / 100;
    currentFlow.style.animationDuration = (3 / speedMultiplier) + 's';
    larvaeGroup.style.animationDuration = (3 / speedMultiplier) + 's';

    // Update direction (simplified visual)
    const directionOffset = (direction / 45) * 50; // Max 50px offset
    currentFlow.style.transform = `translateY(calc(-50% + ${directionOffset}px))`;
    larvaeGroup.style.transform = `translateY(calc(-50% + ${directionOffset}px))`;

    // Update labels and text
    if (recruitmentSuccess > 80) {
      recruitmentFill.style.background = '#27ae60';
      recruitmentLabel.textContent = 'High Recruitment';
      simulatorText.textContent = 'Optimal conditions: larvae successfully reach settlement sites with high survival rates.';
    } else if (recruitmentSuccess > 50) {
      recruitmentFill.style.background = '#f39c12';
      recruitmentLabel.textContent = 'Moderate Recruitment';
      simulatorText.textContent = 'Suboptimal conditions: some larvae reach settlement sites but survival is reduced.';
    } else {
      recruitmentFill.style.background = '#e74c3c';
      recruitmentLabel.textContent = 'Low Recruitment';
      simulatorText.textContent = 'Poor conditions: most larvae fail to reach suitable settlement habitats, leading to population decline.';
    }
  }

  speedSlider.addEventListener('input', updateSimulator);
  directionSlider.addEventListener('input', updateSimulator);

  updateSimulator();
}

// Larval dispersal network visualization
function initDispersalNetwork() {
  const network = document.createElement('div');
  network.className = 'dispersal-network';
  network.innerHTML = `
    <h3>🌊 Marine Population Connectivity Network</h3>
    <div class="network-container">
      <div class="network-node spawning">
        <div class="node-icon">🏖️</div>
        <div class="node-label">Spawning Site</div>
      </div>
      <div class="network-node larvae">
        <div class="node-icon">🐟</div>
        <div class="node-label">Larval Drift</div>
      </div>
      <div class="network-node settlement">
        <div class="node-icon">🌿</div>
        <div class="node-label">Settlement Site</div>
      </div>
      <div class="network-node population">
        <div class="node-icon">🐠</div>
        <div class="node-label">Adult Population</div>
      </div>
      <svg class="network-links" viewBox="0 0 500 150">
        <defs>
          <marker id="currentArrow" markerWidth="10" markerHeight="7"
           refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3498db" />
          </marker>
          <marker id="brokenArrow" markerWidth="10" markerHeight="7"
           refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c" />
          </marker>
        </defs>
        <line x1="60" y1="75" x2="140" y2="75" stroke="#27ae60" stroke-width="3" marker-end="url(#currentArrow)" class="link spawning-larvae" />
        <line x1="220" y1="75" x2="300" y2="75" stroke="#3498db" stroke-width="3" marker-end="url(#currentArrow)" class="link larvae-settlement" />
        <line x1="380" y1="75" x2="460" y2="75" stroke="#27ae60" stroke-width="3" marker-end="url(#currentArrow)" class="link settlement-population" />
        <line x1="250" y1="40" x2="250" y2="110" stroke="#95a5a6" stroke-width="2" stroke-dasharray="5,5" class="link feedback" />
      </svg>
    </div>
    <div class="network-controls">
      <button id="disruptCurrents" class="control-btn">🌊 Disrupt Ocean Currents</button>
      <button id="restoreCurrents" class="control-btn">🔄 Restore Normal Flow</button>
    </div>
    <div class="network-status">
      <p id="networkText">Normal ocean currents maintain healthy larval dispersal and population connectivity.</p>
    </div>
  `;

  // Insert after the ecological consequences section
  const consequencesSection = document.querySelector('.section:nth-of-type(3)');
  if (consequencesSection) {
    consequencesSection.appendChild(network);
  }

  // Add event listeners
  const disruptBtn = document.getElementById('disruptCurrents');
  const restoreBtn = document.getElementById('restoreCurrents');
  const networkText = document.getElementById('networkText');

  disruptBtn.addEventListener('click', function() {
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
      if (link.classList.contains('larvae-settlement')) {
        link.setAttribute('stroke', '#e74c3c');
        link.setAttribute('marker-end', 'url(#brokenArrow)');
        link.style.strokeDasharray = '10,5';
      }
    });
    networkText.textContent = 'Disrupted currents break larval connectivity! Settlement sites are not receiving larvae, leading to recruitment failure.';
    disruptBtn.style.display = 'none';
    restoreBtn.style.display = 'inline-block';
  });

  restoreBtn.addEventListener('click', function() {
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
      if (link.classList.contains('larvae-settlement')) {
        link.setAttribute('stroke', '#3498db');
        link.setAttribute('marker-end', 'url(#currentArrow)');
        link.style.strokeDasharray = 'none';
      }
    });
    networkText.textContent = 'Currents restored! Larval dispersal pathways are reconnected, allowing normal population replenishment.';
    restoreBtn.style.display = 'none';
    disruptBtn.style.display = 'inline-block';
  });

  // Add CSS for network
  const style = document.createElement('style');
  style.textContent = `
    .dispersal-network {
      margin-top: 40px;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 12px;
    }
    .network-container {
      position: relative;
      height: 150px;
      margin: 30px 0;
    }
    .network-node {
      position: absolute;
      text-align: center;
      transition: all 0.3s ease;
    }
    .network-node.spawning { left: 10px; top: 60px; }
    .network-node.larvae { left: 130px; top: 60px; }
    .network-node.settlement { left: 290px; top: 60px; }
    .network-node.population { left: 410px; top: 60px; }
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
    .network-controls {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
    }
    .control-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      background: #3498db;
      color: white;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .control-btn:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }
    .network-status {
      text-align: center;
      margin-top: 20px;
    }
    .network-status p {
      color: #555;
      font-weight: 500;
    }
  `;
  document.head.appendChild(style);
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
`;
document.head.appendChild(animationStyles);