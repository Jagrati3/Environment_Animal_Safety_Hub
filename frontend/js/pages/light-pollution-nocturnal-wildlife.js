// Light Pollution and Nocturnal Wildlife Disruption - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initLightSourceCards();
  initCircadianCards();
  initNavigationCards();
  initEcosystemChain();
  initSpeciesCards();
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
    '.overview-section, .sources-section, .circadian-section, .navigation-section, ' +
    '.predator-prey-section, .species-section, .mitigation-section, .case-studies-section, .cta-section'
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

// Interactive light source cards
function initLightSourceCards() {
  const lightCards = document.querySelectorAll('.light-source-card');

  lightCards.forEach(card => {
    card.addEventListener('click', function() {
      // Toggle expanded state
      this.classList.toggle('expanded');

      // Animate impact stats
      const impacts = this.querySelectorAll('.source-impact span');
      impacts.forEach((impact, index) => {
        setTimeout(() => {
          impact.style.transform = this.classList.contains('expanded') ? 'scale(1.05)' : 'scale(1)';
          impact.style.background = this.classList.contains('expanded') ?
            'rgba(44, 62, 80, 0.2)' : 'rgba(44, 62, 80, 0.1)';
        }, index * 100);
      });
    });
  });
}

// Interactive circadian rhythm cards
function initCircadianCards() {
  const rhythmCards = document.querySelectorAll('.rhythm-card');

  rhythmCards.forEach(card => {
    const listItems = card.querySelectorAll('li');

    card.addEventListener('mouseenter', function() {
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(5px)';
          item.style.color = '#34495e';
        }, index * 50);
      });
    });

    card.addEventListener('mouseleave', function() {
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(0)';
          item.style.color = '#555';
        }, index * 50);
      });
    });
  });
}

// Interactive navigation cards
function initNavigationCards() {
  const navCards = document.querySelectorAll('.nav-card');

  navCards.forEach(card => {
    const effects = card.querySelectorAll('.nav-effects span');

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

// Ecosystem chain animation
function initEcosystemChain() {
  const chainLevels = document.querySelectorAll('.chain-species');
  const arrows = document.querySelectorAll('.chain-arrow');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate chain levels sequentially
        chainLevels.forEach((level, index) => {
          setTimeout(() => {
            level.style.opacity = '1';
            level.style.transform = 'translateY(0) scale(1)';
          }, index * 400);
        });

        // Animate arrows
        arrows.forEach((arrow, index) => {
          setTimeout(() => {
            arrow.style.opacity = '1';
            arrow.style.transform = 'scale(1)';
          }, (index + 1) * 400);
        });
      }
    });
  }, { threshold: 0.5 });

  const ecosystemChain = document.querySelector('.ecosystem-chain');
  if (ecosystemChain) {
    observer.observe(ecosystemChain);

    // Set initial states
    chainLevels.forEach(level => {
      level.style.opacity = '0';
      level.style.transform = 'translateY(20px) scale(0.9)';
      level.style.transition = 'all 0.5s ease';
    });

    arrows.forEach(arrow => {
      arrow.style.opacity = '0';
      arrow.style.transform = 'scale(0.8)';
      arrow.style.transition = 'all 0.3s ease';
    });
  }
}

// Interactive species cards
function initSpeciesCards() {
  const speciesCards = document.querySelectorAll('.species-card');

  speciesCards.forEach(card => {
    const stats = card.querySelectorAll('.impact-stats span');

    card.addEventListener('mouseenter', function() {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          stat.style.transform = 'scale(1.05)';
          stat.style.background = 'rgba(39, 174, 96, 0.2)';
        }, index * 100);
      });
    });

    card.addEventListener('mouseleave', function() {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          stat.style.transform = 'scale(1)';
          stat.style.background = 'rgba(39, 174, 96, 0.1)';
        }, index * 100);
      });
    });
  });
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
  .light-source-card.expanded {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .rhythm-card li, .nav-effects span, .impact-stats span {
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

  .chain-species {
    transition: all 0.5s ease;
  }

  .chain-arrow {
    transition: all 0.3s ease;
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

// Starfield effect for hero background
function createStarfield() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    hero.appendChild(star);
  }
}

// Add starfield CSS
const starStyle = document.createElement('style');
starStyle.textContent = `
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(241, 196, 15, 0.8);
    border-radius: 50%;
    animation: twinkle 3s infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;
document.head.appendChild(starStyle);

// Initialize starfield
createStarfield();

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

// Add loading animation for stat cards
function animateStatCards() {
  const cards = document.querySelectorAll('.stat-card');

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Set initial states and animate on load
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
  });

  // Animate after a short delay
  setTimeout(animateStatCards, 500);
});

// Initialize theme toggle if available
if (typeof initThemeToggle === 'function') {
  initThemeToggle();
}