// Permafrost Thaw and Methane-Driven Habitat Change - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initFeedbackLoopAnimation();
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
  const sections = document.querySelectorAll('.mechanisms-section, .methane-section, .species-section, .solutions-section, .cta-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animated counters for statistics
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        animateCounter(target, targetValue);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.mechanism-card, .species-card, .solution-card, .stat-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
  });
}

// Feedback loop animation
function initFeedbackLoopAnimation() {
  const loopSteps = document.querySelectorAll('.loop-step');
  const loopArrows = document.querySelectorAll('.loop-arrow');

  const loopObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateFeedbackLoop();
      }
    });
  }, { threshold: 0.5 });

  if (loopSteps.length > 0) {
    loopObserver.observe(loopSteps[0]);
  }
}

function animateFeedbackLoop() {
  const loopSteps = document.querySelectorAll('.loop-step');
  const loopArrows = document.querySelectorAll('.loop-arrow');

  loopSteps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('animate-pulse');
      if (loopArrows[index]) {
        loopArrows[index].classList.add('animate-arrow');
      }
    }, index * 500);
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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

  .animate-pulse {
    animation: pulse 0.6s ease-in-out;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
    }
  }

  .animate-arrow {
    animation: arrowPulse 0.6s ease-in-out;
  }

  @keyframes arrowPulse {
    0%, 100% {
      color: var(--primary-color);
      transform: scale(1);
    }
    50% {
      color: var(--secondary-color);
      transform: scale(1.2);
    }
  }

  /* Enhanced hover effects */
  .mechanism-card:hover h3,
  .species-card:hover h3,
  .solution-card:hover h3 {
    color: var(--primary-color);
    transition: color 0.3s ease;
  }

  /* Loop diagram responsive adjustments */
  @media (max-width: 768px) {
    .loop-diagram {
      flex-direction: column !important;
    }

    .loop-arrow {
      transform: rotate(0deg) !important;
    }
  }

  /* Arctic theme specific animations */
  .hero::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    animation: iceShimmer 3s ease-in-out infinite;
  }

  @keyframes iceShimmer {
    0%, 100% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

// Interactive thaw timeline (placeholder for future enhancement)
function initThawTimeline() {
  // This could include an interactive timeline showing permafrost thaw progression
  console.log('Thaw timeline initialized');
}

// Methane impact calculator (placeholder for future enhancement)
function initMethaneCalculator() {
  // This could calculate greenhouse gas impacts of methane release
  console.log('Methane calculator initialized');
}

// Species range visualizer (placeholder for future enhancement)
function initSpeciesVisualizer() {
  // This could show dynamic maps of changing species ranges
  console.log('Species visualizer initialized');
}

// Export functions for potential future use
window.PermafrostThaw = {
  initThawTimeline,
  initMethaneCalculator,
  initSpeciesVisualizer
};</content>
<parameter name="filePath">c:\Users\Gupta\Downloads\Environment_Animal_Safety_Hub\frontend\js\pages\permafrost-thaw.js