// Keystone Seed Dispersers Decline - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initSeedDispersalAnimations();
  initCaseStudyInteractions();
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
        const targetValue = parseInt(target.textContent.replace(/[^\d]/g, ''));
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
    const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Enhanced card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.overview-card, .case-study');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.3)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// Seed dispersal animation simulation
function initSeedDispersalAnimations() {
  const dispersalCard = document.querySelector('.overview-card h3');
  if (!dispersalCard) return;

  // Create floating seed animation
  function createFloatingSeed() {
    const seed = document.createElement('div');
    seed.innerHTML = '🌱';
    seed.style.position = 'absolute';
    seed.style.fontSize = '20px';
    seed.style.pointerEvents = 'none';
    seed.style.zIndex = '1000';
    seed.style.animation = 'floatSeed 3s ease-in-out forwards';

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    seed.style.left = startX + 'px';
    seed.style.top = window.innerHeight + 'px';

    document.body.appendChild(seed);

    // Remove after animation
    setTimeout(() => {
      if (seed.parentNode) {
        seed.parentNode.removeChild(seed);
      }
    }, 3000);
  }

  // Trigger seed animation on card hover
  dispersalCard.parentElement.addEventListener('mouseenter', () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingSeed, i * 200);
    }
  });
}

// Case study interactive features
function initCaseStudyInteractions() {
  const caseStudies = document.querySelectorAll('.case-study');

  caseStudies.forEach(study => {
    // Add click to expand functionality
    study.addEventListener('click', function() {
      this.classList.toggle('expanded');

      // Animate expansion
      if (this.classList.contains('expanded')) {
        this.style.maxHeight = this.scrollHeight + 'px';
      } else {
        this.style.maxHeight = '';
      }
    });

    // Add region-specific styling
    const title = study.querySelector('h4');
    if (title) {
      if (title.textContent.includes('African')) {
        study.style.borderLeftColor = '#F59E0B';
      } else if (title.textContent.includes('Southeast')) {
        study.style.borderLeftColor = '#EF4444';
      } else if (title.textContent.includes('Neotropical')) {
        study.style.borderLeftColor = '#10B981';
      }
    }
  });
}

// Add CSS animations for floating seeds
const style = document.createElement('style');
style.textContent = `
  @keyframes floatSeed {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: translateY(-100px) rotate(180deg);
      opacity: 0.8;
    }
    100% {
      transform: translateY(-200px) rotate(360deg);
      opacity: 0;
    }
  }

  .case-study.expanded {
    background: rgba(16, 185, 129, 0.1);
    transition: all 0.3s ease;
  }

  .case-study.expanded h4 {
    color: #059669;
  }
`;
document.head.appendChild(style);

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
          event_label: 'keystone-seed-dispersers',
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
  const cards = document.querySelectorAll('.overview-card, .case-study');
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
window.KeystoneSeedDispersers = {
  initScrollAnimations,
  initStatCounters,
  initCardHoverEffects,
  animateCounter
};