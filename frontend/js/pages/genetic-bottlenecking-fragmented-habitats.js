// Genetic Bottlenecking in Fragmented Habitats - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCaseStudyInteractions();
  initMechanismCards();
  initConsequenceCards();
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
    '.overview-section, .mechanisms-section, .case-studies-section, ' +
    '.consequences-section, .solutions-section, .research-section, .cta-section'
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
        const isMultiplier = text.includes('x');

        if (isPercentage || isMultiplier) {
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
  const isMultiplier = targetText.includes('x');
  const numericValue = parseInt(targetText.replace(/[^\d]/g, ''));
  const suffix = isPercentage ? '%' : (isMultiplier ? 'x' : '');

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

// Interactive mechanism cards
function initMechanismCards() {
  const mechanismCards = document.querySelectorAll('.mechanism-card');

  mechanismCards.forEach(card => {
    const icon = card.querySelector('.mechanism-icon');

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

// Interactive consequence cards
function initConsequenceCards() {
  const consequenceCards = document.querySelectorAll('.consequence-card');

  consequenceCards.forEach(card => {
    const icon = card.querySelector('.consequence-icon');

    card.addEventListener('mouseenter', function() {
      // Animate the top border
      const border = document.createElement('div');
      border.style.position = 'absolute';
      border.style.top = '0';
      border.style.left = '0';
      border.style.right = '0';
      border.style.height = '4px';
      border.style.background = 'linear-gradient(90deg, #3498db, #e74c3c, #27ae60)';
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
      this.style.boxShadow = '0 15px 40px rgba(39, 174, 96, 0.3)';
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
          item.style.color = '#3498db';
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

// Create floating DNA helix animation
function initFloatingElements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create floating DNA strands
  for (let i = 0; i < 15; i++) {
    const dna = document.createElement('div');
    dna.className = 'floating-dna';
    dna.textContent = '🧬';
    dna.style.left = Math.random() * 100 + '%';
    dna.style.top = Math.random() * 100 + '%';
    dna.style.animationDelay = Math.random() * 8 + 's';
    dna.style.fontSize = (Math.random() * 30 + 20) + 'px';
    dna.style.opacity = Math.random() * 0.5 + 0.2;
    hero.appendChild(dna);
  }

  // Create floating genetic symbols
  const symbols = ['🧬', '🔬', '🧫', '🧪', '📊'];
  for (let i = 0; i < 10; i++) {
    const symbol = document.createElement('div');
    symbol.className = 'floating-symbol';
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + '%';
    symbol.style.top = Math.random() * 100 + '%';
    symbol.style.animationDelay = Math.random() * 6 + 's';
    symbol.style.fontSize = (Math.random() * 25 + 15) + 'px';
    hero.appendChild(symbol);
  }
}

// Add CSS for floating elements
const style = document.createElement('style');
style.textContent = `
  .floating-dna, .floating-symbol {
    position: absolute;
    animation: float-dna 8s infinite ease-in-out;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes float-dna {
    0%, 100% {
      transform: translateY(0px) rotate(0deg) scale(1);
    }
    25% {
      transform: translateY(-20px) rotate(90deg) scale(1.1);
    }
    50% {
      transform: translateY(-10px) rotate(180deg) scale(0.9);
    }
    75% {
      transform: translateY(-25px) rotate(270deg) scale(1.05);
    }
  }

  .mechanism-card:hover .mechanism-icon {
    animation: pulse-mechanism 1s infinite;
  }

  @keyframes pulse-mechanism {
    0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
    100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
  }

  .solution-card:hover .solution-icon {
    animation: rotate-solution 2s infinite linear;
  }

  @keyframes rotate-solution {
    from { transform: scale(1.2) rotate(0deg); }
    to { transform: scale(1.2) rotate(360deg); }
  }

  .case-study:hover .case-study-header {
    background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
    transition: background 0.3s ease;
  }

  .consequence-card:hover::before {
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60);
    transition: background 0.3s ease;
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

// Create interactive genetic pathway visualization
function createGeneticPathway() {
  const mechanismsSection = document.querySelector('.mechanisms-section');
  if (!mechanismsSection) return;

  const pathway = document.createElement('div');
  pathway.className = 'genetic-pathway';
  pathway.innerHTML = `
    <div class="pathway-step" data-step="1">
      <div class="pathway-icon">🏠</div>
      <div class="pathway-text">Habitat Fragmentation</div>
    </div>
    <div class="pathway-arrow">→</div>
    <div class="pathway-step" data-step="2">
      <div class="pathway-icon">👥</div>
      <div class="pathway-text">Population Isolation</div>
    </div>
    <div class="pathway-arrow">→</div>
    <div class="pathway-step" data-step="3">
      <div class="pathway-icon">🎲</div>
      <div class="pathway-text">Genetic Drift</div>
    </div>
    <div class="pathway-arrow">→</div>
    <div class="pathway-step" data-step="4">
      <div class="pathway-icon">💔</div>
      <div class="pathway-text">Inbreeding Depression</div>
    </div>
    <div class="pathway-arrow">→</div>
    <div class="pathway-step" data-step="5">
      <div class="pathway-icon">⚠️</div>
      <div class="pathway-text">Extinction Risk</div>
    </div>
  `;

  mechanismsSection.appendChild(pathway);

  // Add pathway styles
  const pathwayStyle = document.createElement('style');
  pathwayStyle.textContent = `
    .genetic-pathway {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 3rem;
      padding: 2rem;
      background: rgba(44, 62, 80, 0.05);
      border-radius: 15px;
    }

    .pathway-step {
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

    .pathway-step:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .pathway-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .pathway-text {
      font-size: 0.9rem;
      font-weight: 600;
      color: #2c3e50;
      text-align: center;
    }

    .pathway-arrow {
      font-size: 1.5rem;
      color: #3498db;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .genetic-pathway {
        flex-direction: column;
        gap: 0.5rem;
      }

      .pathway-arrow {
        transform: rotate(90deg);
      }
    }
  `;
  document.head.appendChild(pathwayStyle);

  // Add click interactions for pathway steps
  const steps = pathway.querySelectorAll('.pathway-step');
  steps.forEach((step, index) => {
    step.addEventListener('click', function() {
      // Highlight the clicked step and show related mechanism
      steps.forEach(s => s.classList.remove('active'));
      this.classList.add('active');

      // Scroll to corresponding mechanism card
      const mechanismCards = document.querySelectorAll('.mechanism-card');
      if (mechanismCards[index]) {
        mechanismCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        mechanismCards[index].style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          mechanismCards[index].style.animation = '';
        }, 500);
      }
    });
  });
}

// Initialize genetic pathway
createGeneticPathway();

// Add active state styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .pathway-step.active {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
  }

  .pathway-step.active .pathway-text {
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
        focusedElement.classList.contains('mechanism-card') ||
        focusedElement.classList.contains('solution-card')) {
      focusedElement.click();
    }
  }
});

// Initialize theme toggle if available
if (typeof initThemeToggle === 'function') {
  initThemeToggle();
}