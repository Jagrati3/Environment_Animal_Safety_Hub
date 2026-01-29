// Psychological Well-Being of Captive Animals - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initChallengeCards();
  initEnrichmentInteractions();
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
  const sections = document.querySelectorAll('.challenges-section, .enrichment-section, .case-studies-section, .assessment-section, .future-section');
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
        const hasDash = text.includes('-');
        const isNumber = /^\d+$/.test(text.replace(/[^\d.]/g, ''));

        if (isNumber || isPercentage || hasDash) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
}

function animateCounter(element, finalText) {
  const isPercentage = finalText.includes('%');
  const hasDash = finalText.includes('-');
  const numericValue = hasDash ?
    parseFloat(finalText.split('-')[0]) :
    parseFloat(finalText.replace(/[^\d.]/g, ''));
  const suffix = isPercentage ? '%' : hasDash ? `-${finalText.split('-')[1]}` : '';

  let currentValue = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = numericValue / steps;

  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= numericValue) {
      currentValue = numericValue;
      clearInterval(timer);
    }

    const displayValue = Math.floor(currentValue);
    if (hasDash) {
      const secondPart = finalText.split('-')[1];
      element.textContent = displayValue + '-' + secondPart;
    } else {
      element.textContent = displayValue + suffix;
    }
  }, duration / steps);
}

// Interactive challenge cards
function initChallengeCards() {
  const challengeCards = document.querySelectorAll('.challenge-card');

  challengeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });

    // Add click interaction to expand/collapse details
    card.addEventListener('click', function() {
      const ul = this.querySelector('ul');
      if (ul) {
        ul.classList.toggle('expanded');
      }
    });
  });
}

// Enrichment interactions
function initEnrichmentInteractions() {
  const examples = document.querySelectorAll('.example');

  examples.forEach(example => {
    example.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });

    example.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    });
  });

  // Add hover effects to enrichment categories
  const categories = document.querySelectorAll('.enrichment-category');
  categories.forEach(category => {
    category.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });

    category.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Add CSS for animations and interactions
const style = document.createElement('style');
style.textContent = `
  .challenges-section, .enrichment-section, .case-studies-section, .assessment-section, .future-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .challenge-card, .enrichment-category, .development {
    transition: transform 0.3s ease;
  }

  .challenge-card:hover, .enrichment-category:hover, .development:hover {
    transform: translateY(-5px) scale(1.02);
  }

  .example {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .challenge-card ul {
    max-height: 200px;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .challenge-card ul.expanded {
    max-height: 500px;
  }

  .challenge-card {
    cursor: pointer;
  }

  .case-study {
    transition: transform 0.3s ease;
  }

  .case-study:hover {
    transform: translateY(-3px);
  }
`;
document.head.appendChild(style);

// Smooth scrolling for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    // For now, just show an alert. In a real implementation, these would link to actual pages
    const action = this.textContent.trim();
    if (action.includes('Find Accredited')) {
      alert('🔍 Finding accredited zoos and aquariums in your area...\n\nThis feature will help you locate facilities committed to high welfare standards.');
    } else if (action.includes('Support Animal')) {
      alert('💝 Supporting animal welfare organizations...\n\nYour donation helps fund research and enrichment programs for captive animals.');
    } else if (action.includes('Learn About')) {
      alert('📚 Learning about animal behavior...\n\nAccess educational resources about animal cognition and welfare science.');
    }
  });
});

// Add loading animation for the page
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  body.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(loadingStyle);

// Add interactive tooltips for key terms
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
  .tooltip {
    position: relative;
    cursor: help;
  }

  .tooltip:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 1000;
    max-width: 200px;
    text-align: center;
  }

  .tooltip:hover::before {
    content: '';
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(0,0,0,0.8);
    z-index: 1000;
  }
`;
document.head.appendChild(tooltipStyle);

// Add tooltips to key terms
document.addEventListener('DOMContentLoaded', function() {
  const terms = [
    { selector: 'h3:contains("Stereotypic Behaviors")', tooltip: "Abnormal, repetitive behaviors indicating psychological distress" },
    { selector: 'h3:contains("Learned Helplessness")', tooltip: "A state where animals become passive due to lack of control over their environment" },
    { selector: 'h3:contains("Environmental Enrichment")', tooltip: "Techniques to improve animal welfare by providing stimulation and choices" }
  ];

  terms.forEach(term => {
    const elements = document.querySelectorAll(term.selector.replace('contains', 'contains'));
    elements.forEach(el => {
      el.classList.add('tooltip');
      el.setAttribute('data-tooltip', term.tooltip);
    });
  });
});