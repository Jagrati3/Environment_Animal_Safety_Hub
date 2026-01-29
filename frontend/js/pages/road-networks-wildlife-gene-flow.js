// Impact of Road Networks on Wildlife Gene Flow - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCaseStudyInteractions();
  initImpactCards();
  initSolutionCards();
  initTechnologyCards();
  initSuccessCards();
  initRoadVisualization();
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
    '.solutions-section, .technology-section, .success-section, .cta-section'
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
        const isNumber = /^\d+M?$/.test(text.replace(/,/g, ''));

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
  const isMillion = targetText.includes('M');
  const numericValue = parseInt(targetText.replace(/[^\d]/g, ''));
  const suffix = isPercentage ? '%' : (isMillion ? 'M' : '');

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
    const formatted = Math.floor(current).toLocaleString();
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
      this.style.borderColor = '#e74c3c';
    });

    card.addEventListener('mouseleave', function() {
      icon.style.transform = 'scale(1) rotate(0deg)';
      this.style.borderColor = 'transparent';
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

// Interactive technology cards
function initTechnologyCards() {
  const techCards = document.querySelectorAll('.tech-card');

  techCards.forEach(card => {
    const listItems = card.querySelectorAll('li');

    card.addEventListener('mouseenter', function() {
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(10px)';
          item.style.color = '#34495e';
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

// Interactive success cards
function initSuccessCards() {
  const successCards = document.querySelectorAll('.success-card');

  successCards.forEach(card => {
    const metrics = card.querySelectorAll('.metrics span');

    card.addEventListener('mouseenter', function() {
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          metric.style.transform = 'scale(1.05)';
          metric.style.background = '#27ae60';
          metric.style.transition = 'all 0.3s ease';
        }, index * 100);
      });
    });

    card.addEventListener('mouseleave', function() {
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          metric.style.transform = 'scale(1)';
          metric.style.background = '#27ae60';
        }, index * 50);
      });
    });
  });
}

// Create interactive road visualization
function initRoadVisualization() {
  const impactsSection = document.querySelector('.impacts-section');
  if (!impactsSection) return;

  const roadViz = document.createElement('div');
  roadViz.className = 'road-visualization';
  roadViz.innerHTML = `
    <div class="road-lane">
      <div class="road-line"></div>
      <div class="road-line dashed"></div>
      <div class="road-line"></div>
    </div>
    <div class="wildlife-crossing">
      <div class="crossing-animal" data-species="bear">🐻</div>
      <div class="crossing-animal" data-species="deer">🦌</div>
      <div class="crossing-animal" data-species="wolf">🐺</div>
      <div class="crossing-animal" data-species="bird">🐦</div>
    </div>
    <div class="road-barrier">
      <div class="barrier-post"></div>
      <div class="barrier-post"></div>
      <div class="barrier-post"></div>
    </div>
  `;

  impactsSection.appendChild(roadViz);

  // Add road visualization styles
  const roadStyle = document.createElement('style');
  roadStyle.textContent = `
    .road-visualization {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 3rem auto;
      max-width: 800px;
      padding: 2rem;
      background: linear-gradient(to right, #4a5568 0%, #2d3748 50%, #4a5568 100%);
      border-radius: 15px;
      position: relative;
      overflow: hidden;
    }

    .road-lane {
      display: flex;
      align-items: center;
      gap: 2rem;
      position: relative;
    }

    .road-line {
      width: 4px;
      height: 100px;
      background: #f39c12;
      border-radius: 2px;
    }

    .road-line.dashed {
      background: repeating-linear-gradient(
        to bottom,
        #f39c12 0px,
        #f39c12 10px,
        transparent 10px,
        transparent 20px
      );
    }

    .wildlife-crossing {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 1rem;
      z-index: 10;
    }

    .crossing-animal {
      font-size: 2rem;
      animation: cross-road 3s infinite ease-in-out;
      opacity: 0;
    }

    .crossing-animal:nth-child(1) { animation-delay: 0s; }
    .crossing-animal:nth-child(2) { animation-delay: 0.5s; }
    .crossing-animal:nth-child(3) { animation-delay: 1s; }
    .crossing-animal:nth-child(4) { animation-delay: 1.5s; }

    @keyframes cross-road {
      0% { transform: translateX(-100px); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateX(100px); opacity: 0; }
    }

    .road-barrier {
      position: absolute;
      top: -20px;
      left: 0;
      right: 0;
      height: 140px;
      pointer-events: none;
    }

    .barrier-post {
      position: absolute;
      width: 6px;
      height: 140px;
      background: #e74c3c;
      border-radius: 3px 3px 0 0;
    }

    .barrier-post:nth-child(1) { left: 20%; }
    .barrier-post:nth-child(2) { left: 50%; transform: translateX(-50%); }
    .barrier-post:nth-child(3) { right: 20%; }

    @media (max-width: 768px) {
      .road-visualization {
        flex-direction: column;
        gap: 1rem;
      }

      .wildlife-crossing {
        position: static;
        transform: none;
        flex-wrap: wrap;
        justify-content: center;
      }

      .crossing-animal {
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(roadStyle);

  // Add click interaction for animals
  const animals = roadViz.querySelectorAll('.crossing-animal');
  animals.forEach(animal => {
    animal.addEventListener('click', function() {
      // Pause animation and show info
      this.style.animationPlayState = 'paused';
      this.style.transform = 'scale(1.5)';

      // Show species info
      const species = this.dataset.species;
      const speciesInfo = {
        bear: 'Grizzly bears need large territories and safe crossings to maintain genetic diversity',
        deer: 'White-tailed deer populations are fragmented by roads, affecting migration patterns',
        wolf: 'Gray wolves require connected habitats for pack territories and hunting grounds',
        bird: 'Migratory birds face barriers that disrupt ancient flight paths'
      };

      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'animal-tooltip';
      tooltip.textContent = speciesInfo[species];
      tooltip.style.position = 'absolute';
      tooltip.style.top = '-50px';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.background = 'rgba(0,0,0,0.8)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '0.5rem 1rem';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '0.9rem';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.zIndex = '1000';

      this.appendChild(tooltip);

      // Remove tooltip after delay
      setTimeout(() => {
        this.style.animationPlayState = 'running';
        this.style.transform = 'scale(1)';
        tooltip.remove();
      }, 3000);
    });
  });
}

// Add CSS for floating elements
const style = document.createElement('style');
style.textContent = `
  .impact-card:hover .impact-icon {
    animation: pulse-impact 1s infinite;
  }

  @keyframes pulse-impact {
    0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
    100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
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

  .success-card:hover {
    border-left-color: #f39c12;
    transition: border-left-color 0.3s ease;
  }

  .metrics span:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;
document.head.appendChild(style);

// Add smooth scrolling for action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Add click ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    borderRadius = '50%';
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

// Create connectivity pathway visualization
function createConnectivityPathway() {
  const solutionsSection = document.querySelector('.solutions-section');
  if (!solutionsSection) return;

  const pathway = document.createElement('div');
  pathway.className = 'connectivity-pathway';
  pathway.innerHTML = `
    <div class="pathway-node" data-type="problem">
      <div class="node-icon">🚧</div>
      <div class="node-text">Road Barrier</div>
    </div>
    <div class="pathway-connector">→</div>
    <div class="pathway-node" data-type="solution">
      <div class="node-icon">🌉</div>
      <div class="node-text">Wildlife Crossing</div>
    </div>
    <div class="pathway-connector">→</div>
    <div class="pathway-node" data-type="result">
      <div class="node-icon">🔄</div>
      <div class="node-text">Gene Flow Restored</div>
    </div>
  `;

  solutionsSection.appendChild(pathway);

  // Add pathway styles
  const pathwayStyle = document.createElement('style');
  pathwayStyle.textContent = `
    .connectivity-pathway {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 3rem auto;
      padding: 2rem;
      background: rgba(52, 73, 94, 0.05);
      border-radius: 15px;
      max-width: 900px;
    }

    .pathway-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      min-width: 150px;
      text-align: center;
    }

    .pathway-node:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }

    .pathway-node[data-type="problem"] {
      border-left: 4px solid #e74c3c;
    }

    .pathway-node[data-type="solution"] {
      border-left: 4px solid #27ae60;
    }

    .pathway-node[data-type="result"] {
      border-left: 4px solid #3498db;
    }

    .node-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .node-text {
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .pathway-connector {
      font-size: 2rem;
      color: #34495e;
      font-weight: bold;
      animation: bounce-arrow 2s infinite;
    }

    @keyframes bounce-arrow {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(5px); }
    }

    @media (max-width: 768px) {
      .connectivity-pathway {
        flex-direction: column;
        gap: 1rem;
      }

      .pathway-connector {
        transform: rotate(90deg);
        animation: none;
      }
    }
  `;
  document.head.appendChild(pathwayStyle);

  // Add click interactions for pathway nodes
  const nodes = pathway.querySelectorAll('.pathway-node');
  nodes.forEach((node, index) => {
    node.addEventListener('click', function() {
      // Highlight the clicked node
      nodes.forEach(n => n.classList.remove('active'));
      this.classList.add('active');

      // Scroll to corresponding solution card
      const solutionCards = document.querySelectorAll('.solution-card');
      if (index < solutionCards.length) {
        solutionCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        solutionCards[index].style.animation = 'highlight 1s ease';
        setTimeout(() => {
          solutionCards[index].style.animation = '';
        }, 1000);
      }
    });
  });
}

// Initialize connectivity pathway
createConnectivityPathway();

// Add active state styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .pathway-node.active {
    transform: scale(1.1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .pathway-node.active .node-icon {
    animation: pulse-node 1s infinite;
  }

  @keyframes pulse-node {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes highlight {
    0% { background: rgba(39, 174, 96, 0.1); }
    50% { background: rgba(39, 174, 96, 0.3); }
    100% { background: rgba(39, 174, 96, 0.1); }
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

// Initialize theme toggle if available
if (typeof initThemeToggle === 'function') {
  initThemeToggle();
}