// Artificial Feeding and Wildlife Behavior - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCaseStudyInteractions();
  initImpactCards();
  initConflictCards();
  initSolutionCards();
  initResearchCards();
  initFloatingElements();
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
    '.overview-section, .impacts-section, .case-studies-section, ' +
    '.conflict-section, .solutions-section, .research-section, .cta-section'
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

        if (isPercentage) {
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
  const numericValue = parseInt(targetText.replace('%', ''));
  const suffix = '%';

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

    // Format number
    const formatted = Math.floor(current);
    element.textContent = formatted + suffix;
  }, step);
}

// Interactive case studies
function initCaseStudyInteractions() {
  const caseStudies = document.querySelectorAll('.case-study');

  caseStudies.forEach(study => {
    const findings = study.querySelector('.findings');

    study.addEventListener('click', function() {
      // Toggle findings visibility with animation
      if (findings.style.maxHeight) {
        findings.style.maxHeight = null;
        findings.style.opacity = '0';
        findings.style.transform = 'scaleY(0)';
      } else {
        findings.style.maxHeight = findings.scrollHeight + 'px';
        findings.style.opacity = '1';
        findings.style.transform = 'scaleY(1)';
      }
    });

    // Set initial state
    findings.style.maxHeight = null;
    findings.style.opacity = '0';
    findings.style.transform = 'scaleY(0)';
    findings.style.transformOrigin = 'top';
    findings.style.overflow = 'hidden';
    findings.style.transition = 'all 0.4s ease';
  });
}

// Interactive impact cards
function initImpactCards() {
  const impactCards = document.querySelectorAll('.impact-card');

  impactCards.forEach(card => {
    const icon = card.querySelector('.impact-icon');

    card.addEventListener('mouseenter', function() {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
      icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });

    // Add click animation
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateY(-5px)';
      }, 150);
    });
  });
}

// Interactive conflict cards
function initConflictCards() {
  const conflictCards = document.querySelectorAll('.conflict-card');

  conflictCards.forEach(card => {
    const icon = card.querySelector('.conflict-icon');

    card.addEventListener('mouseenter', function() {
      // Animate the top border
      const border = document.createElement('div');
      border.style.position = 'absolute';
      border.style.top = '0';
      border.style.left = '0';
      border.style.right = '0';
      border.style.height = '4px';
      border.style.background = 'linear-gradient(90deg, #D2691E, #DC143C, #FF8C00)';
      border.style.transform = 'scaleX(0)';
      border.style.transformOrigin = 'left';
      border.style.transition = 'transform 0.5s ease';

      this.appendChild(border);

      setTimeout(() => {
        border.style.transform = 'scaleX(1)';
      }, 10);

      // Animate icon
      icon.style.transform = 'scale(1.1) rotateY(180deg)';
      icon.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseleave', function() {
      const border = this.querySelector('div[style*="position: absolute"]');
      if (border) {
        border.style.transform = 'scaleX(0)';
        setTimeout(() => border.remove(), 500);
      }

      icon.style.transform = 'scale(1) rotateY(0deg)';
    });
  });
}

// Interactive solution cards
function initSolutionCards() {
  const solutionCards = document.querySelectorAll('.solution-card');

  solutionCards.forEach(card => {
    const icon = card.querySelector('.solution-icon');

    card.addEventListener('mouseenter', function() {
      icon.style.transform = 'scale(1.2) rotate(360deg)';
      icon.style.transition = 'transform 0.6s ease';
      this.style.boxShadow = '0 15px 40px rgba(34, 139, 34, 0.3)';
    });

    card.addEventListener('mouseleave', function() {
      icon.style.transform = 'scale(1) rotate(0deg)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
  });
}

// Interactive research cards
function initResearchCards() {
  const researchCards = document.querySelectorAll('.research-card');

  researchCards.forEach(card => {
    const listItems = card.querySelectorAll('li');

    card.addEventListener('mouseenter', function() {
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(10px)';
          item.style.color = '#D2691E';
          item.style.transition = 'all 0.3s ease';
        }, index * 100);
      });
    });

    card.addEventListener('mouseleave', function() {
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(0)';
          item.style.color = '#666';
        }, index * 50);
      });
    });
  });
}

// Create floating food and wildlife animation
function initFloatingElements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create floating food items
  const foodItems = ['🍎', '🌽', '🥕', '🍞', '🥖', '🌰', '🥜', '🍯'];
  for (let i = 0; i < 12; i++) {
    const food = document.createElement('div');
    food.className = 'floating-food';
    food.textContent = foodItems[Math.floor(Math.random() * foodItems.length)];
    food.style.left = Math.random() * 100 + '%';
    food.style.top = Math.random() * 100 + '%';
    food.style.animationDelay = Math.random() * 6 + 's';
    food.style.fontSize = (Math.random() * 25 + 15) + 'px';
    hero.appendChild(food);
  }

  // Create floating wildlife
  const wildlife = ['🦌', '🐿️', '🐦', '🦉', '🦊', '🐻', '🦆', '🐇'];
  for (let i = 0; i < 8; i++) {
    const animal = document.createElement('div');
    animal.className = 'floating-wildlife';
    animal.textContent = wildlife[Math.floor(Math.random() * wildlife.length)];
    animal.style.left = Math.random() * 100 + '%';
    animal.style.top = Math.random() * 100 + '%';
    animal.style.animationDelay = Math.random() * 8 + 's';
    animal.style.fontSize = (Math.random() * 30 + 20) + 'px';
    hero.appendChild(animal);
  }
}

// Add CSS for floating elements
const style = document.createElement('style');
style.textContent = `
  .floating-food, .floating-wildlife {
    position: absolute;
    animation: float-food 6s infinite ease-in-out;
    pointer-events: none;
    z-index: 1;
  }

  .floating-food {
    opacity: 0.7;
  }

  .floating-wildlife {
    opacity: 0.5;
    animation: float-wildlife 8s infinite ease-in-out;
  }

  @keyframes float-food {
    0%, 100% {
      transform: translateY(0px) rotate(0deg) scale(1);
    }
    25% {
      transform: translateY(-15px) rotate(90deg) scale(1.1);
    }
    50% {
      transform: translateY(-8px) rotate(180deg) scale(0.9);
    }
    75% {
      transform: translateY(-20px) rotate(270deg) scale(1.05);
    }
  }

  @keyframes float-wildlife {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(-10px) translateX(-5px);
    }
    75% {
      transform: translateY(-25px) translateX(8px);
    }
  }

  .impact-card:hover .impact-icon {
    animation: pulse-impact 1s infinite;
  }

  @keyframes pulse-impact {
    0% { box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(139, 69, 19, 0); }
    100% { box-shadow: 0 0 0 0 rgba(139, 69, 19, 0); }
  }

  .solution-card:hover .solution-icon {
    animation: rotate-solution 2s infinite linear;
  }

  @keyframes rotate-solution {
    from { transform: scale(1.2) rotate(0deg); }
    to { transform: scale(1.2) rotate(360deg); }
  }

  .case-study:hover .case-study-header {
    background: linear-gradient(135deg, #2F1B14 0%, #8B4513 100%);
    transition: background 0.3s ease;
  }

  .conflict-card:hover::before {
    background: linear-gradient(90deg, #D2691E, #FF8C00, #228B22);
    transition: background 0.3s ease;
  }

  .feeding-cycle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(139, 69, 19, 0.05);
    border-radius: 15px;
  }

  .cycle-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    min-width: 120px;
  }

  .cycle-step:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .cycle-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .cycle-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #8B4513;
    text-align: center;
  }

  .cycle-arrow {
    font-size: 1.5rem;
    color: #D2691E;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .feeding-cycle {
      flex-direction: column;
      gap: 0.5rem;
    }

    .cycle-arrow {
      transform: rotate(90deg);
    }
  }
`;
document.head.appendChild(style);

// Add smooth scrolling for action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Add click ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.4)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.8s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 800);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(6);
      opacity: 0;
    }
  }

  .action-btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(rippleStyle);

// Create interactive feeding cycle visualization
function createFeedingCycle() {
  const impactsSection = document.querySelector('.impacts-section');
  if (!impactsSection) return;

  const cycle = document.createElement('div');
  cycle.className = 'feeding-cycle';
  cycle.innerHTML = `
    <div class="cycle-step" data-step="1">
      <div class="cycle-icon">🍽️</div>
      <div class="cycle-text">Artificial Feeding</div>
    </div>
    <div class="cycle-arrow">→</div>
    <div class="cycle-step" data-step="2">
      <div class="cycle-icon">🧠</div>
      <div class="cycle-text">Behavior Change</div>
    </div>
    <div class="cycle-arrow">→</div>
    <div class="cycle-step" data-step="3">
      <div class="cycle-icon">⚠️</div>
      <div class="cycle-text">Human Conflict</div>
    </div>
    <div class="cycle-arrow">→</div>
    <div class="cycle-step" data-step="4">
      <div class="cycle-icon">💀</div>
      <div class="cycle-text">Population Decline</div>
    </div>
    <div class="cycle-arrow">→</div>
    <div class="cycle-step" data-step="5">
      <div class="cycle-icon">🔄</div>
      <div class="cycle-text">More Feeding</div>
    </div>
  `;

  impactsSection.appendChild(cycle);

  // Add click interactions for cycle steps
  const steps = cycle.querySelectorAll('.cycle-step');
  steps.forEach((step, index) => {
    step.addEventListener('click', function() {
      // Highlight the clicked step and show related impact
      steps.forEach(s => s.classList.remove('active'));
      this.classList.add('active');

      // Scroll to corresponding impact card
      const impactCards = document.querySelectorAll('.impact-card');
      if (impactCards[index]) {
        impactCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        impactCards[index].style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          impactCards[index].style.animation = '';
        }, 500);
      }
    });
  });
}

// Initialize feeding cycle
createFeedingCycle();

// Add active state styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .cycle-step.active {
    background: linear-gradient(135deg, #D2691E, #8B4513);
    color: white;
  }

  .cycle-step.active .cycle-text {
    color: white;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(activeStyle);

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
    }, index * 300);
  });
}

// Set initial states and animate on load
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
  });

  // Animate after a short delay
  setTimeout(animateStatCards, 500);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('case-study') ||
        focusedElement.classList.contains('impact-card') ||
        focusedElement.classList.contains('solution-card')) {
      focusedElement.click();
    }
  }
});

// Create warning notifications for feeding behaviors
function createFeedingWarnings() {
  const warnings = [
    { icon: '🚫', message: 'Never feed wildlife - it disrupts natural behaviors!' },
    { icon: '🗑️', message: 'Secure trash to prevent unintentional feeding' },
    { icon: '🐕', message: 'Remove pet food immediately after feeding' },
    { icon: '🌱', message: 'Plant native vegetation for natural food sources' }
  ];

  const warningContainer = document.createElement('div');
  warningContainer.className = 'feeding-warnings';
  warningContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 300px;
  `;

  warnings.forEach((warning, index) => {
    setTimeout(() => {
      const warningDiv = document.createElement('div');
      warningDiv.className = 'feeding-warning';
      warningDiv.style.cssText = `
        background: linear-gradient(135deg, #DC143C, #8B0000);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.5s ease;
        cursor: pointer;
      `;

      warningDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">${warning.icon}</span>
          <span style="font-size: 0.9rem; flex: 1;">${warning.message}</span>
          <span class="warning-close" style="cursor: pointer; opacity: 0.7;">×</span>
        </div>
      `;

      warningContainer.appendChild(warningDiv);

      // Animate in
      setTimeout(() => {
        warningDiv.style.transform = 'translateX(0)';
      }, 100);

      // Add close functionality
      const closeBtn = warningDiv.querySelector('.warning-close');
      closeBtn.addEventListener('click', () => {
        warningDiv.style.transform = 'translateX(100%)';
        setTimeout(() => warningDiv.remove(), 500);
      });

      // Auto-hide after 5 seconds
      setTimeout(() => {
        if (warningDiv.parentNode) {
          warningDiv.style.transform = 'translateX(100%)';
          setTimeout(() => warningDiv.remove(), 500);
        }
      }, 5000);

    }, index * 2000); // Stagger appearance
  });

  document.body.appendChild(warningContainer);
}

// Show warnings after page load
setTimeout(createFeedingWarnings, 3000);

// Initialize theme toggle if available
if (typeof initThemeToggle === 'function') {
  initThemeToggle();
}