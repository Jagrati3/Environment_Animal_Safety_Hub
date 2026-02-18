// Coastal Noise from Tourism and Reef Fish Recruitment - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initFrequencyAnalyzer();
  initSettlementSimulator();
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
  const sections = document.querySelectorAll('.settlement-section, .noise-section, .analyzer-section, .simulator-section, .research-section, .mitigation-section, .cta-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animated counters for statistics
function initStatCounters() {
  const statCards = document.querySelectorAll('.stat-card h3');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const isPercentage = text.includes('%');
        const isDecibel = text.includes('dB');
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/\+/g, ''));

        if (isNumber || isPercentage || isDecibel) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => {
    counterObserver.observe(card);
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
  const isDecibel = finalText.includes('dB');
  const hasPlus = finalText.includes('+');

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
    else if (isDecibel) displayText += 'dB';
    else if (hasPlus) displayText += '+';

    element.textContent = displayText;
  }, duration / steps);
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.cue-card, .source-card, .study-card, .solution-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
  });
}

// Frequency Analyzer
function initFrequencyAnalyzer() {
  const canvas = document.getElementById('noise-spectrum');
  const trafficSlider = document.getElementById('boat-traffic');
  const trafficValue = document.getElementById('traffic-value');

  if (!canvas || !trafficSlider) return;

  const ctx = canvas.getContext('2d');
  let animationId;

  // Set canvas size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Frequency data
  const frequencies = [];
  for (let i = 10; i <= 10000; i *= 1.1) {
    frequencies.push(i);
  }

  function drawSpectrum(trafficLevel) {
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = 0; x <= width; x += width / 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y <= height; y += height / 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw natural reef sounds (baseline)
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 3;
    ctx.beginPath();

    frequencies.forEach((freq, index) => {
      const x = (Math.log10(freq) - Math.log10(10)) / (Math.log10(10000) - Math.log10(10)) * width;
      let amplitude = 0;

      // Natural reef sound profile (peaks around settlement cue frequencies)
      if (freq >= 100 && freq <= 1000) {
        amplitude = Math.sin((freq - 100) / 900 * Math.PI) * 30 + 20;
      } else if (freq >= 50 && freq <= 2000) {
        amplitude = Math.exp(-Math.pow(freq - 500, 2) / 500000) * 40;
      }

      const y = height - (amplitude + 10);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw anthropogenic noise
    ctx.strokeStyle = '#9b59b6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    frequencies.forEach((freq, index) => {
      const x = (Math.log10(freq) - Math.log10(10)) / (Math.log10(10000) - Math.log10(10)) * width;
      let amplitude = 0;

      // Boat noise profile (increases with traffic level)
      if (freq >= 20 && freq <= 1000) {
        const baseNoise = Math.exp(-Math.pow(freq - 200, 2) / 100000) * 25;
        amplitude = baseNoise * (trafficLevel / 100) * 2;
      }

      const y = height - (amplitude + 10);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Poppins';
    ctx.fillText('Frequency (Hz)', width / 2 - 50, height - 5);

    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Amplitude (dB)', 0, 0);
    ctx.restore();
  }

  // Update traffic value display
  trafficSlider.addEventListener('input', function() {
    trafficValue.textContent = this.value + '%';
    drawSpectrum(parseInt(this.value));
  });

  // Initial draw
  drawSpectrum(50);
}

// Settlement Simulator
function initSettlementSimulator() {
  const startBtn = document.getElementById('start-sim');
  const resetBtn = document.getElementById('reset-sim');
  const noiseSlider = document.getElementById('noise-level');
  const noiseValue = document.getElementById('noise-value');
  const larvaeContainer = document.getElementById('larvae-container');
  const noiseWaves = document.getElementById('noise-waves');
  const releasedCount = document.getElementById('larvae-released');
  const settledCount = document.getElementById('larvae-settled');
  const rateDisplay = document.getElementById('settlement-rate');

  if (!startBtn || !resetBtn) return;

  let simulationRunning = false;
  let larvae = [];
  let settledLarvae = 0;
  let totalReleased = 0;
  let animationId;

  // Larvae class
  class Larva {
    constructor() {
      this.x = Math.random() * 100;
      this.y = Math.random() * 100;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.element = document.createElement('div');
      this.element.className = 'larva';
      this.element.style.left = this.x + '%';
      this.element.style.top = this.y + '%';
      this.settled = false;
      this.settlementTime = 0;
      larvaeContainer.appendChild(this.element);
    }

    update(noiseLevel) {
      if (this.settled) return;

      // Movement with noise disruption
      const disruption = noiseLevel / 100;
      this.vx += (Math.random() - 0.5) * disruption;
      this.vy += (Math.random() - 0.5) * disruption;

      // Damping
      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;

      // Boundary conditions
      if (this.x < 0) this.x = 0;
      if (this.x > 100) this.x = 100;
      if (this.y < 0) this.y = 0;
      if (this.y > 100) this.y = 100;

      // Settlement logic (near reef bottom with reduced probability under noise)
      const settlementProb = Math.max(0.1, 0.8 - (noiseLevel / 100) * 0.7);
      if (this.y > 80 && Math.random() < settlementProb * 0.01) {
        this.settle();
      }

      this.element.style.left = this.x + '%';
      this.element.style.top = this.y + '%';
    }

    settle() {
      this.settled = true;
      this.element.classList.add('settled');
      settledLarvae++;
      this.updateStats();
    }

    remove() {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }

  function updateStats() {
    releasedCount.textContent = totalReleased;
    settledCount.textContent = settledLarvae;
    const rate = totalReleased > 0 ? Math.round((settledLarvae / totalReleased) * 100) : 0;
    rateDisplay.textContent = rate + '%';
  }

  function createNoiseWaves(noiseLevel) {
    noiseWaves.innerHTML = '';
    const waveCount = Math.floor(noiseLevel / 10);

    for (let i = 0; i < waveCount; i++) {
      const wave = document.createElement('div');
      wave.className = 'noise-wave';
      wave.style.left = Math.random() * 100 + '%';
      wave.style.animationDelay = Math.random() * 2 + 's';
      wave.style.opacity = (noiseLevel / 100) * 0.6;
      noiseWaves.appendChild(wave);
    }
  }

  function animate() {
    if (!simulationRunning) return;

    // Release new larvae occasionally
    if (Math.random() < 0.1) {
      larvae.push(new Larva());
      totalReleased++;
      updateStats();
    }

    // Update existing larvae
    const noiseLevel = parseInt(noiseSlider.value);
    larvae.forEach(larva => larva.update(noiseLevel));

    // Remove larvae that have been settled for too long
    larvae = larvae.filter(larva => {
      if (larva.settled) {
        larva.settlementTime++;
        if (larva.settlementTime > 300) { // Remove after 5 seconds
          larva.remove();
          return false;
        }
      }
      return true;
    });

    animationId = requestAnimationFrame(animate);
  }

  // Event listeners
  startBtn.addEventListener('click', function() {
    if (simulationRunning) return;

    simulationRunning = true;
    startBtn.textContent = 'Running...';
    startBtn.disabled = true;
    animate();
  });

  resetBtn.addEventListener('click', function() {
    simulationRunning = false;
    cancelAnimationFrame(animationId);

    // Remove all larvae
    larvae.forEach(larva => larva.remove());
    larvae = [];
    settledLarvae = 0;
    totalReleased = 0;
    updateStats();

    // Reset button
    startBtn.textContent = 'Start Simulation';
    startBtn.disabled = false;

    // Clear noise waves
    noiseWaves.innerHTML = '';
  });

  noiseSlider.addEventListener('input', function() {
    const noiseLevel = parseInt(this.value);
    noiseValue.textContent = noiseLevel + '%';
    createNoiseWaves(noiseLevel);
  });

  // Initial setup
  createNoiseWaves(0);
}

// Add CSS for larvae and noise waves
const style = document.createElement('style');
style.textContent = `
  .larva {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ffd700;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 0 6px rgba(255, 215, 0, 0.6);
  }

  .larva.settled {
    background: #27ae60;
    box-shadow: 0 0 10px rgba(39, 174, 96, 0.8);
    animation: pulse 1s infinite;
  }

  .noise-wave {
    position: absolute;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #9b59b6, transparent);
    border-radius: 2px;
    animation: wave 2s infinite ease-in-out;
    pointer-events: none;
  }

  @keyframes wave {
    0%, 100% { transform: scaleX(0.8) scaleY(1); opacity: 0; }
    50% { transform: scaleX(1.2) scaleY(1.5); opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

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
document.head.appendChild(style);