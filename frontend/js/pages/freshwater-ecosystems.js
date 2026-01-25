// Freshwater Ecosystems Under Threat - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initScrollAnimations();
  initStatCounters();
  initThreatCards();
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
  const sections = document.querySelectorAll('.threat-section, .dam-section, .climate-section, .species-section, .solutions-section');
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

function animateCounter(element, finalText) {
  const isPercentage = finalText.includes('%');
  const numericValue = parseFloat(finalText.replace(/[^\d.]/g, ''));
  const suffix = isPercentage ? '%' : '';

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
    element.textContent = displayValue.toLocaleString() + suffix;
  }, duration / steps);
}

// Interactive threat cards
function initThreatCards() {
  const threatCards = document.querySelectorAll('.threat-card, .climate-card, .solution-card');

  threatCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .threat-section, .dam-section, .climate-section, .species-section, .solutions-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .threat-card, .climate-card, .solution-card {
    transition: transform 0.3s ease;
  }

  .threat-card:hover, .climate-card:hover, .solution-card:hover {
    transform: translateY(-5px) scale(1.02);
  }
`;
document.head.appendChild(style);

// Smooth scrolling for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    // For now, just show an alert. In a real implementation, these would link to actual pages
    alert('This feature will be implemented soon! Check back later for more information on ' + this.textContent.trim() + '.');
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