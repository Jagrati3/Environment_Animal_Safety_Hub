// Decline of Scavenger Species and Disease Risk - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initDiseaseMechanismAnimations();
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
  const sections = document.querySelectorAll('.ecology-section, .disease-section, .case-studies-section, .solutions-section, .cta-section');
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
  const cards = document.querySelectorAll('.mechanism-card, .case-card, .solution-card, .stat-card, .species-card');

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

// Disease mechanism animations
function initDiseaseMechanismAnimations() {
  const mechanisms = document.querySelectorAll('.mechanism-card');

  const mechanismObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-mechanism');
        }, index * 200);
      }
    });
  }, { threshold: 0.5 });

  mechanisms.forEach(mechanism => {
    mechanismObserver.observe(mechanism);
  });
}

// Interactive disease transmission simulator (placeholder for future enhancement)
function initDiseaseSimulator() {
  // This could include interactive elements showing how disease spreads
  // without vultures vs with vultures
  console.log('Disease simulator initialized');
}

// Population decline visualization (placeholder for future enhancement)
function initPopulationVisualization() {
  // This could include animated charts showing vulture population declines
  console.log('Population visualization initialized');
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

  .animate-mechanism {
    animation: pulseMechanism 0.6s ease-out forwards;
  }

  @keyframes pulseMechanism {
    0% {
      transform: scale(1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 15px 40px rgba(220, 20, 60, 0.2);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
  }

  /* Enhanced hover effects */
  .mechanism-card:hover h3,
  .case-card:hover h3,
  .solution-card:hover h3 {
    color: #DC143C;
    transition: color 0.3s ease;
  }

  .role-item:hover {
    border-left-color: #DC143C;
    transition: border-left-color 0.3s ease;
  }

  /* Species card animations */
  .species-card {
    transition: all 0.3s ease;
  }

  .species-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.2);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .animate-in {
      animation-duration: 0.6s;
    }

    .animate-mechanism {
      animation-duration: 0.4s;
    }
  }
`;
document.head.appendChild(style);

// Initialize additional features when ready
window.addEventListener('load', function() {
  initDiseaseSimulator();
  initPopulationVisualization();
});

// Export functions for potential future use
window.ScavengerDecline = {
  initDiseaseSimulator,
  initPopulationVisualization
};