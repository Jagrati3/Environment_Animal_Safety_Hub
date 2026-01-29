// Endocrine Disruption from Agricultural Pesticides - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initSpeciesAnimations();
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
  const sections = document.querySelectorAll('.mechanism-section, .species-section, .case-studies-section, .solutions-section, .cta-section');
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
        const isNumber = /^\d+$/.test(text.replace(/\+/g, ''));

        if (isNumber || isPercentage || isMultiplier) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
}

// Counter animation function
function animateCounter(element, finalText) {
  if (element.hasAttribute('data-animated')) return;

  element.setAttribute('data-animated', 'true');

  // Extract number from text
  const numberMatch = finalText.match(/[\d,]+/);
  if (!numberMatch) return;

  const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
  const isPercentage = finalText.includes('%');
  const isMultiplier = finalText.includes('x');
  const hasPlus = finalText.includes('+');

  let currentNumber = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = finalNumber / steps;

  const timer = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= finalNumber) {
      currentNumber = finalNumber;
      clearInterval(timer);
    }

    let displayText = Math.floor(currentNumber).toLocaleString();
    if (isPercentage) displayText += '%';
    else if (isMultiplier) displayText += 'x';
    else if (hasPlus) displayText += '+';

    element.textContent = displayText;
  }, duration / steps);
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.mechanism-card, .solution-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
  });
}

// Species section animations
function initSpeciesAnimations() {
  const speciesSections = document.querySelectorAll('.species-section');

  const speciesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('slide-in-species');
        }, index * 300);
      }
    });
  }, { threshold: 0.2 });

  speciesSections.forEach(section => {
    speciesObserver.observe(section);
  });
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .slide-in-species {
    animation: slideInFromSide 0.8s ease-out forwards;
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

  @keyframes slideInFromSide {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .mechanism-section, .species-section, .case-studies-section,
  .solutions-section, .cta-section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }

  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .slide-in-species {
    opacity: 1 !important;
    transform: translateX(0) !important;
  }

  /* Visual placeholder hover effects */
  .visual-placeholder {
    transition: all 0.3s ease;
  }

  .visual-placeholder:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    border-color: #adb5bd;
  }

  .visual-placeholder:hover i {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;
document.head.appendChild(style);

// Smooth scrolling for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', function(e) {
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
});

// Add loading animation for stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';

  setTimeout(() => {
    card.style.transition = 'all 0.6s ease-out';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 100);
});

// Add interactive effects to case studies
document.querySelectorAll('.case-study').forEach(study => {
  study.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
  });

  study.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
  });
});