// Snowpack Loss and Alpine Hydrological Collapse - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initSnowpackSimulator();
  initBiodiversityCards();
  initStrategyCards();
  initHoverEffects();
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
  const sections = document.querySelectorAll('.overview-section, .section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Snowpack Impact Simulator
function initSnowpackSimulator() {
  const slider = document.getElementById('snowpack-slider');
  const valueDisplay = document.getElementById('snowpack-value');
  const waterImpact = document.getElementById('water-impact');
  const biodiversityImpact = document.getElementById('biodiversity-impact');
  const ecosystemImpact = document.getElementById('ecosystem-impact');

  // Impact level mappings based on snowpack reduction percentage
  const getImpactLevel = (percentage) => {
    if (percentage < 10) return { level: 'Low', color: '#27ae60' };
    if (percentage < 25) return { level: 'Moderate', color: '#f39c12' };
    if (percentage < 50) return { level: 'High', color: '#e67e22' };
    if (percentage < 75) return { level: 'Severe', color: '#e74c3c' };
    return { level: 'Critical', color: '#c0392b' };
  };

  // Update simulator results
  const updateSimulator = () => {
    const percentage = parseInt(slider.value);
    valueDisplay.textContent = `${percentage}%`;

    // Calculate impacts based on percentage
    const waterLevel = getImpactLevel(percentage * 0.8); // Water impact slightly less severe
    const bioLevel = getImpactLevel(percentage * 1.2); // Biodiversity more sensitive
    const ecoLevel = getImpactLevel(percentage); // Ecosystem impact proportional

    // Update display
    waterImpact.textContent = waterLevel.level;
    waterImpact.style.color = waterLevel.color;

    biodiversityImpact.textContent = bioLevel.level;
    biodiversityImpact.style.color = bioLevel.color;

    ecosystemImpact.textContent = ecoLevel.level;
    ecosystemImpact.style.color = ecoLevel.color;

    // Add visual feedback
    updateResultCards(percentage);
  };

  // Add visual feedback to result cards
  const updateResultCards = (percentage) => {
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
      const intensity = Math.min(percentage / 100, 1);
      const opacity = 0.1 + (intensity * 0.3);
      card.style.background = `linear-gradient(135deg, rgba(255,255,255,${1-opacity}) 0%, rgba(227,242,253,${1-opacity}) 100%)`;
    });
  };

  // Initialize
  slider.addEventListener('input', updateSimulator);
  updateSimulator(); // Set initial values
}

// Interactive biodiversity cards
function initBiodiversityCards() {
  const cards = document.querySelectorAll('.biodiversity-card');

  cards.forEach((card, index) => {
    // Add click to expand functionality
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });

    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Interactive strategy cards
function initStrategyCards() {
  const cards = document.querySelectorAll('.strategy-card');

  cards.forEach((card, index) => {
    // Add hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });

    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.15}s`;
  });
}

// Hover effects for interactive elements
function initHoverEffects() {
  // Add hover effects to section headers
  const sectionHeaders = document.querySelectorAll('.section h2, .overview-section h2');

  sectionHeaders.forEach(header => {
    header.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.2s ease';
    });

    header.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add hover effects to list items
  const listItems = document.querySelectorAll('.section li');

  listItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
      this.style.padding = '5px 10px';
      this.style.borderRadius = '6px';
      this.style.margin = '-5px -10px';
      this.style.transition = 'all 0.2s ease';
    });

    item.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'transparent';
      this.style.padding = '0';
      this.style.margin = '0';
    });
  });
}

// Add CSS animations for scroll-triggered elements
const style = document.createElement('style');
style.textContent = `
  .overview-section, .section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .overview-section.animate-in, .section.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .biodiversity-card, .strategy-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .biodiversity-card.animate-in, .strategy-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .result-card {
    transition: all 0.3s ease;
  }

  .expanded {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
  }
`;
document.head.appendChild(style);

// Trigger animations on scroll
let animationTriggered = false;
window.addEventListener('scroll', function() {
  if (!animationTriggered) {
    const cards = document.querySelectorAll('.biodiversity-card, .strategy-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    });

    cards.forEach(card => observer.observe(card));
    animationTriggered = true;
  }
});