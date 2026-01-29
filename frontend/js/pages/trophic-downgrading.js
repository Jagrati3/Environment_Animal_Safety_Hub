// Trophic Downgrading After Predator Removal - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initFoodWebAnimation();
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
  const sections = document.querySelectorAll('.mechanisms-section, .predators-section, .case-studies-section, .consequences-section, .solutions-section, .cta-section');
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
  const cards = document.querySelectorAll('.mechanism-card, .case-study-card, .consequence-card, .solution-card, .stat-card');

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

// Food web animation
function initFoodWebAnimation() {
  const trophicLevels = document.querySelectorAll('.trophic-level');

  const webObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-level');
        }, index * 200);
      }
    });
  }, { threshold: 0.5 });

  trophicLevels.forEach(level => {
    webObserver.observe(level);
  });
}

// Interactive trophic cascade simulation (placeholder for future enhancement)
function initCascadeSimulator() {
  // This could include interactive sliders showing how predator removal affects populations
  console.log('Cascade simulator initialized');
}

// Case study comparison tool (placeholder for future enhancement)
function initCaseStudyComparison() {
  // This could allow users to compare different predator removal scenarios
  console.log('Case study comparison initialized');
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

  .animate-level {
    animation: levelAppear 0.6s ease-out forwards;
  }

  .trophic-level {
    opacity: 0;
    transform: scale(0.8);
  }

  @keyframes levelAppear {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Enhanced hover effects */
  .mechanism-card:hover h3,
  .case-study-card:hover h3,
  .consequence-card:hover h3,
  .solution-card:hover h3 {
    color: var(--primary-color);
    transition: color 0.3s ease;
  }

  /* Food web connections (visual enhancement) */
  .web-diagram::before {
    content: '';
    position: absolute;
    top: 50px;
    left: 50%;
    width: 2px;
    height: calc(100% - 100px);
    background: linear-gradient(to bottom, #DC143C, #FF8C00, #228B22, #8B4513);
    transform: translateX(-50%);
    z-index: -1;
  }

  .web-diagram {
    position: relative;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .animate-in {
      animation-duration: 0.6s;
    }

    .web-diagram::before {
      display: none;
    }
  }
`;
document.head.appendChild(style);

// Export functions for potential future use
window.TrophicDowngrading = {
  initCascadeSimulator,
  initCaseStudyComparison
};</content>
<parameter name="filePath">c:\Users\Gupta\Downloads\Environment_Animal_Safety_Hub\frontend\js\pages\trophic-downgrading.js