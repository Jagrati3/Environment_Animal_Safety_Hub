// Pharmaceutical Pollution in Freshwater Ecosystems - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initPharmaCards();
  initBehaviorCards();
  initBioaccumulationAnimation();
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
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all major sections
  const sections = document.querySelectorAll(
    '.overview-section, .sources-section, .pharma-section, .bioaccumulation-section, ' +
    '.behavior-section, .reproduction-section, .case-studies-section, .solutions-section, .cta-section'
  );
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
        const isNumber = /^\d+$/.test(text.replace(/,/g, ''));

        if (isNumber || isPercentage) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
}

// Animate counter values
function animateCounter(element, targetText) {
  const isPercentage = targetText.includes('%');
  const numericValue = parseInt(targetText.replace(/,/g, '').replace('%', ''));
  const suffix = isPercentage ? '%' : '';

  let current = 0;
  const increment = numericValue / 50; // 50 steps for smooth animation
  const duration = 1500; // 1.5 seconds
  const step = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= numericValue) {
      current = numericValue;
      clearInterval(timer);
    }

    // Format number with commas for large numbers
    const formatted = Math.floor(current).toLocaleString();
    element.textContent = formatted + suffix;
  }, step);
}

// Interactive pharmaceutical cards
function initPharmaCards() {
  const pharmaCards = document.querySelectorAll('.pharma-card');

  pharmaCards.forEach(card => {
    card.addEventListener('click', function() {
      // Toggle expanded state
      this.classList.toggle('expanded');

      // Animate concentration bars
      const items = this.querySelectorAll('.pharma-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = this.classList.contains('expanded') ? 'scale(1.02)' : 'scale(1)';
          item.style.boxShadow = this.classList.contains('expanded') ?
            '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 5px rgba(0,0,0,0.1)';
        }, index * 100);
      });
    });
  });
}

// Interactive behavior cards
function initBehaviorCards() {
  const behaviorCards = document.querySelectorAll('.behavior-card');

  behaviorCards.forEach(card => {
    const effects = card.querySelectorAll('.behavior-effects span');

    card.addEventListener('mouseenter', function() {
      effects.forEach((effect, index) => {
        setTimeout(() => {
          effect.style.transform = 'translateY(-2px)';
          effect.style.background = 'rgba(52, 152, 219, 0.2)';
        }, index * 50);
      });
    });

    card.addEventListener('mouseleave', function() {
      effects.forEach((effect, index) => {
        setTimeout(() => {
          effect.style.transform = 'translateY(0)';
          effect.style.background = 'rgba(52, 152, 219, 0.1)';
        }, index * 50);
      });
    });
  });
}

// Bioaccumulation chain animation
function initBioaccumulationAnimation() {
  const chainLevels = document.querySelectorAll('.chain-level');
  const arrows = document.querySelectorAll('.chain-arrow');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate levels sequentially
        chainLevels.forEach((level, index) => {
          setTimeout(() => {
            level.style.opacity = '1';
            level.style.transform = 'translateY(0)';
          }, index * 300);
        });

        // Animate arrows
        arrows.forEach((arrow, index) => {
          setTimeout(() => {
            arrow.style.opacity = '1';
            arrow.style.transform = 'scale(1)';
          }, (index + 1) * 300);
        });
      }
    });
  }, { threshold: 0.5 });

  const bioaccumulationSection = document.querySelector('.bioaccumulation-visual');
  if (bioaccumulationSection) {
    observer.observe(bioaccumulationSection);

    // Set initial states
    chainLevels.forEach(level => {
      level.style.opacity = '0';
      level.style.transform = 'translateY(20px)';
      level.style.transition = 'all 0.5s ease';
    });

    arrows.forEach(arrow => {
      arrow.style.opacity = '0';
      arrow.style.transform = 'scale(0.8)';
      arrow.style.transition = 'all 0.3s ease';
    });
  }
}

// Case study interactions
function initCaseStudyInteractions() {
  const caseStudies = document.querySelectorAll('.case-study');

  caseStudies.forEach(study => {
    const findings = study.querySelector('.findings');

    study.addEventListener('click', function() {
      // Toggle findings visibility with animation
      if (findings.style.maxHeight) {
        findings.style.maxHeight = null;
        findings.style.opacity = '0';
      } else {
        findings.style.maxHeight = findings.scrollHeight + 'px';
        findings.style.opacity = '1';
      }
    });

    // Set initial state
    findings.style.maxHeight = null;
    findings.style.opacity = '0';
    findings.style.overflow = 'hidden';
    findings.style.transition = 'all 0.3s ease';
  });
}

// Add CSS for expanded state
const style = document.createElement('style');
style.textContent = `
  .pharma-card.expanded {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .behavior-effects span {
    transition: all 0.3s ease;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .stat-card:hover i {
    animation: pulse 1s infinite;
  }
`;
document.head.appendChild(style);

// Add smooth scrolling for action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Add click ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .action-btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(rippleStyle);

// Initialize theme toggle if available
if (typeof initThemeToggle === 'function') {
  initThemeToggle();
}

// Performance optimization: Lazy load images if any
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading
lazyLoadImages();

// Add loading animation for concentration bars
function animateConcentrationBars() {
  const bars = document.querySelectorAll('.concentration-bar');

  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || '0%';
      bar.style.transition = 'width 1.5s ease-out';
    }, index * 200);
  });
}

// Animate bars when they come into view
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateConcentrationBars();
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const bioaccumulationSection = document.querySelector('.bioaccumulation-visual');
if (bioaccumulationSection) {
  barObserver.observe(bioaccumulationSection);
}