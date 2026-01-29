// Freshwater Salinization from Road De-Icing - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initSpeciesSensitivityAnimation();
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
  const sections = document.querySelectorAll('.mechanisms-section, .fish-section, .invertebrate-section, .solutions-section, .cta-section');
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
  const cards = document.querySelectorAll('.mechanism-card, .invertebrate-card, .solution-card, .stat-card');

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

// Species sensitivity animation
function initSpeciesSensitivityAnimation() {
  const speciesBars = document.querySelectorAll('.sensitivity-bar');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-bar');
      }
    });
  }, { threshold: 0.5 });

  speciesBars.forEach(bar => {
    barObserver.observe(bar);
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

  .animate-bar {
    animation: fillBar 1.5s ease-out forwards;
  }

  .sensitivity-bar {
    width: 0;
  }

  .sensitivity-bar.high {
    background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
  }

  .sensitivity-bar.medium {
    background: linear-gradient(90deg, #f39c12 0%, #e67e22 100%);
  }

  .sensitivity-bar.low {
    background: linear-gradient(90deg, #27ae60 0%, #2ecc71 100%);
  }

  @keyframes fillBar {
    to {
      width: 100%;
    }
  }

  /* Enhanced hover effects */
  .mechanism-card:hover h3,
  .invertebrate-card:hover h3,
  .solution-card:hover h3 {
    color: var(--primary-color);
    transition: color 0.3s ease;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .animate-in {
      animation-duration: 0.6s;
    }
  }
`;
document.head.appendChild(style);

// Interactive chloride level simulator (placeholder for future enhancement)
function initChlorideSimulator() {
  // This could be expanded to include interactive salinity impact calculations
  console.log('Chloride simulator initialized');
}

// Seasonal runoff visualization (placeholder for future enhancement)
function initRunoffVisualization() {
  // This could include animated charts showing seasonal salt runoff patterns
  console.log('Runoff visualization initialized');
}

// Export functions for potential future use
window.FreshwaterSalinization = {
  initChlorideSimulator,
  initRunoffVisualization
};