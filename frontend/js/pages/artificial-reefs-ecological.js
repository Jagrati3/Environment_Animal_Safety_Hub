// Artificial Reefs and Ecological Misrepresentation - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initReefComparisonAnimation();
  initMetricBarsAnimation();
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
  const sections = document.querySelectorAll('.science-section, .misrepresentation-section, .evidence-section, .case-studies-section, .alternatives-section, .cta-section');
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
  const cards = document.querySelectorAll('.misrep-card, .case-card, .alternative-card, .stat-card, .reef-card');

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

// Reef comparison animation
function initReefComparisonAnimation() {
  const reefCards = document.querySelectorAll('.reef-card');

  const reefObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-reef');
        }, index * 150);
      }
    });
  }, { threshold: 0.5 });

  reefCards.forEach(card => {
    reefObserver.observe(card);
  });
}

// Metric bars animation
function initMetricBarsAnimation() {
  const metricsSection = document.querySelector('.comparison-tool');

  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateMetricBars();
      }
    });
  }, { threshold: 0.5 });

  if (metricsSection) {
    metricsObserver.observe(metricsSection);
  }
}

function animateMetricBars() {
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || '0%';
      bar.classList.add('animate-bar');
    }, index * 200);
  });
}

// Interactive reef comparison tool (placeholder for future enhancement)
function initReefComparisonTool() {
  // This could include interactive sliders to compare
  // natural vs artificial reef characteristics
  console.log('Reef comparison tool initialized');
}

// Evidence assessment framework (placeholder for future enhancement)
function initEvidenceFramework() {
  // This could include interactive elements to evaluate
  // artificial reef claims vs evidence
  console.log('Evidence assessment framework initialized');
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

  .animate-reef {
    animation: slideInFromLeft 0.6s ease-out forwards;
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-bar {
    animation: fillBar 1.5s ease-out forwards;
  }

  .bar {
    width: 0;
  }

  /* Enhanced hover effects */
  .misrep-card:hover h3,
  .case-card:hover h3,
  .alternative-card:hover h3 {
    color: #FF6B6B;
    transition: color 0.3s ease;
  }

  .mechanism-item:hover {
    border-left-color: #00A6FB;
    transition: border-left-color 0.3s ease;
  }

  .evidence-item:hover {
    border-left-color: #00D4FF;
    transition: border-left-color 0.3s ease;
  }

  /* Reef card animations */
  .reef-card {
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .animate-reef {
    opacity: 1;
    transform: translateY(0);
  }

  /* Metric bar animations */
  @keyframes fillBar {
    to {
      width: var(--target-width, 100%);
    }
  }

  .bar.natural {
    --target-width: 90%;
  }

  .bar.artificial {
    --target-width: 30%;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .animate-in {
      animation-duration: 0.6s;
    }

    .animate-reef {
      animation-duration: 0.4s;
    }
  }
`;
document.head.appendChild(style);

// Initialize additional features when ready
window.addEventListener('load', function() {
  initReefComparisonTool();
  initEvidenceFramework();

  // Set up metric bar target widths
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.setProperty('--target-width', targetWidth);
    bar.style.width = '0';
  });
});

// Export functions for potential future use
window.ArtificialReefs = {
  initReefComparisonTool,
  initEvidenceFramework,
  animateMetricBars
};