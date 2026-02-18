// Climate-Induced Host-Symbiont Mismatch - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initSymbiosisInteractions();
  initMechanismAnimations();
  initCaseStudyEffects();
  initResearchVisualizations();
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
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Animated counters for crisis statistics
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
        const target = entry.target;
        const targetValue = parseInt(target.textContent.replace(/[^\d.]/g, ''));
        target.setAttribute('data-animated', 'true');
        animateCounter(target, targetValue);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Counter animation function
function animateCounter(element, target) {
  const duration = 2000; // 2 seconds
  const start = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = target < 10 ? (startValue + (target - startValue) * easeOutQuart).toFixed(1) : Math.floor(startValue + (target - startValue) * easeOutQuart);

    element.textContent = currentValue + (element.textContent.match(/[^\d.]/) ? element.textContent.match(/[^\d.]/)[0] : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Symbiosis card interactions
function initSymbiosisInteractions() {
  const symbiosisCards = document.querySelectorAll('.symbiosis-card');

  symbiosisCards.forEach(card => {
    const icon = card.querySelector('.symbiosis-icon');

    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 15px 40px rgba(167, 139, 250, 0.3)';

      // Add pulsing animation to icon
      icon.style.animation = 'pulse 1s infinite';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
      icon.style.animation = 'none';
    });

    // Add click interaction for more details
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
      const content = this.querySelector('p');

      if (this.classList.contains('expanded')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        this.style.background = 'rgba(167, 139, 250, 0.1)';
      } else {
        content.style.maxHeight = '';
        this.style.background = '';
      }
    });
  });
}

// Mechanism animations
function initMechanismAnimations() {
  const mechanismCards = document.querySelectorAll('.mechanism-card');

  mechanismCards.forEach((card, index) => {
    // Staggered animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateY(0deg)';
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) rotateY(10deg)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Case study effects
function initCaseStudyEffects() {
  const caseStudies = document.querySelectorAll('.case-study');

  caseStudies.forEach(study => {
    study.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(15px) scale(1.02)';
      this.style.boxShadow = '0 10px 30px rgba(167, 139, 250, 0.2)';
    });

    study.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// Research visualization effects
function initResearchVisualizations() {
  const researchCards = document.querySelectorAll('.research-card');

  researchCards.forEach(card => {
    // Add hover effect with icon animation
    const icon = document.createElement('div');
    icon.innerHTML = '🔬';
    icon.style.fontSize = '2rem';
    icon.style.marginBottom = '15px';
    icon.style.transition = 'transform 0.3s ease';

    card.insertBefore(icon, card.firstChild);

    card.addEventListener('mouseenter', function() {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      this.style.borderColor = '#a78bfa';
    });

    card.addEventListener('mouseleave', function() {
      icon.style.transform = 'scale(1) rotate(0deg)';
      this.style.borderColor = '';
    });
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .symbiosis-card.expanded {
    background: rgba(167, 139, 250, 0.1);
    transition: all 0.3s ease;
  }

  .symbiosis-card.expanded p {
    max-height: none;
    transition: max-height 0.3s ease;
  }

  .mechanism-card:nth-child(1) { background: linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%); }
  .mechanism-card:nth-child(2) { background: linear-gradient(135deg, rgba(196, 181, 253, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%); }
  .mechanism-card:nth-child(3) { background: linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); }
  .mechanism-card:nth-child(4) { background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%); }

  .research-card:hover {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(196, 181, 253, 0.2) 100%);
  }

  .conservation-card {
    position: relative;
    overflow: hidden;
  }

  .conservation-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .conservation-card:hover::before {
    left: 100%;
  }
`;
document.head.appendChild(style);

// Climate impact simulation
function initClimateSimulation() {
  // Create a simple temperature increase simulation
  const simulationContainer = document.createElement('div');
  simulationContainer.id = 'climate-simulation';
  simulationContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    z-index: 1000;
    display: none;
  `;

  simulationContainer.innerHTML = `
    <div style="margin-bottom: 10px;">🌡️ Climate Impact Simulation</div>
    <div>Temperature: <span id="temp-display">0</span>°C rise</div>
    <div style="margin-top: 10px;">
      <button id="start-simulation" style="background: #7c3aed; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Start</button>
      <button id="reset-simulation" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Reset</button>
    </div>
  `;

  document.body.appendChild(simulationContainer);

  let simulationRunning = false;
  let temperature = 0;
  let interval;

  document.getElementById('start-simulation').addEventListener('click', () => {
    if (!simulationRunning) {
      simulationRunning = true;
      interval = setInterval(() => {
        temperature += 0.1;
        document.getElementById('temp-display').textContent = temperature.toFixed(1);

        // Visual feedback based on temperature
        if (temperature > 2) {
          document.body.style.filter = `hue-rotate(${Math.min(temperature * 10, 60)}deg)`;
        }

        if (temperature >= 4) {
          clearInterval(interval);
          simulationRunning = false;
          alert('Critical temperature threshold reached! Symbiotic breakdown imminent.');
        }
      }, 100);
    }
  });

  document.getElementById('reset-simulation').addEventListener('click', () => {
    clearInterval(interval);
    simulationRunning = false;
    temperature = 0;
    document.getElementById('temp-display').textContent = '0';
    document.body.style.filter = '';
  });

  // Show simulation button in hero section
  setTimeout(() => {
    simulationContainer.style.display = 'block';
  }, 2000);
}

// Initialize climate simulation
initClimateSimulation();

// Performance monitoring
function initPerformanceMonitoring() {
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;

      console.log(`Page load time: ${loadTime}ms`);

      // Send analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          event_category: 'performance',
          event_label: 'climate-induced-host-symbiont-mismatch',
          value: Math.round(loadTime)
        });
      }
    });
  }
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Accessibility improvements
function initAccessibilityFeatures() {
  // Add keyboard navigation for cards
  const cards = document.querySelectorAll('.symbiosis-card, .mechanism-card, .research-card, .conservation-card, .case-study');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add ARIA labels
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    const number = card.querySelector('.stat-number');
    const label = card.querySelector('.stat-label');
    if (number && label) {
      card.setAttribute('aria-label', `${number.textContent} ${label.textContent}`);
    }
  });
}

// Initialize accessibility features
initAccessibilityFeatures();

// Export functions for potential reuse
window.ClimateInducedMismatch = {
  initScrollAnimations,
  initStatCounters,
  initSymbiosisInteractions,
  animateCounter
};