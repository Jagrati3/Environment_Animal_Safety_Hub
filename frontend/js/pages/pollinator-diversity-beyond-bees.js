// Loss of Pollinator Diversity Beyond Bees - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initPollinatorCards();
  initThreatCards();
  initRoleChain();
  initCropCards();
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
    '.overview-section, .pollinators-section, .threats-section, .roles-section, ' +
    '.agricultural-section, .conservation-section, .case-studies-section, .cta-section'
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

// Interactive pollinator cards
function initPollinatorCards() {
  const pollinatorCards = document.querySelectorAll('.pollinator-card');

  pollinatorCards.forEach(card => {
    card.addEventListener('click', function() {
      // Toggle expanded state
      this.classList.toggle('expanded');

      // Animate facts
      const facts = this.querySelectorAll('.pollinator-facts span');
      facts.forEach((fact, index) => {
        setTimeout(() => {
          fact.style.transform = this.classList.contains('expanded') ? 'scale(1.05)' : 'scale(1)';
          fact.style.background = this.classList.contains('expanded') ?
            'rgba(39, 174, 96, 0.2)' : 'rgba(39, 174, 96, 0.1)';
        }, index * 100);
      });
    });
  });
}

// Interactive threat cards
function initThreatCards() {
  const threatCards = document.querySelectorAll('.threat-card');

  threatCards.forEach(card => {
    const listItems = card.querySelectorAll('li');

    card.addEventListener('mouseenter', function() {
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(5px)';
          item.style.color = '#c0392b';
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

// Role chain animation
function initRoleChain() {
  const roleItems = document.querySelectorAll('.role-item');
  const arrows = document.querySelectorAll('.role-arrow');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate role items sequentially
        roleItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
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

  const roleChain = document.querySelector('.role-chain');
  if (roleChain) {
    observer.observe(roleChain);

    // Set initial states
    roleItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px) scale(0.9)';
      item.style.transition = 'all 0.5s ease';
    });

    arrows.forEach(arrow => {
      arrow.style.opacity = '0';
      arrow.style.transform = 'scale(0.8)';
      arrow.style.transition = 'all 0.3s ease';
    });
  }
}

// Interactive crop cards
function initCropCards() {
  const cropCards = document.querySelectorAll('.crop-card');

  cropCards.forEach(card => {
    const cropItems = card.querySelectorAll('.crop-item');

    card.addEventListener('mouseenter', function() {
      cropItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateY(-2px)';
          item.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }, index * 50);
      });
    });

    card.addEventListener('mouseleave', function() {
      cropItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateY(0)';
          item.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }, index * 50);
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
  .pollinator-card.expanded {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .threat-card li, .crop-item {
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

  .role-item {
    transition: all 0.5s ease;
  }

  .role-arrow {
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

// Create floating flower animation
function createFlowerField() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍃'];

  for (let i = 0; i < 20; i++) {
    const flower = document.createElement('div');
    flower.className = 'floating-flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.top = Math.random() * 100 + '%';
    flower.style.animationDelay = Math.random() * 5 + 's';
    flower.style.fontSize = (Math.random() * 20 + 10) + 'px';
    hero.appendChild(flower);
  }
}

// Add floating flower CSS
const flowerStyle = document.createElement('style');
flowerStyle.textContent = `
  .floating-flower {
    position: absolute;
    animation: float 6s infinite ease-in-out;
    opacity: 0.6;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;
document.head.appendChild(flowerStyle);

// Initialize flower field
createFlowerField();

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

// Pollinator hover effects
function addPollinatorHoverEffects() {
  const pollinatorCards = document.querySelectorAll('.pollinator-card');

  pollinatorCards.forEach(card => {
    const icon = card.querySelector('h3 i');

    card.addEventListener('mouseenter', function() {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Initialize pollinator effects
addPollinatorHoverEffects();

// Initialize theme toggle if available
if (typeof initThemeToggle === 'function') {
  initThemeToggle();
}