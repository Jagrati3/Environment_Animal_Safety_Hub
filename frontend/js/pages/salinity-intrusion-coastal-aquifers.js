// Salinity Intrusion Coastal Aquifers - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initSalineWedgeVisualizer();
  initSpeciesToleranceSimulator();
  initVegetationImpactModel();
  initManagementTabs();
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
  const sections = document.querySelectorAll('.overview-section, .interactive-section, .species-section, .vegetation-section, .management-section, .case-studies-section');
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
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/B/g, '').replace(/\+/g, ''));

        if (isNumber) {
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
  const hasB = finalText.includes('B');
  const hasM = finalText.includes('m');
  const isNumber = /^\d+$/.test(finalText.replace(/,/g, '').replace(/B/g, '').replace(/m/g, ''));

  let finalValue;
  if (hasB) {
    finalValue = parseInt(finalText.replace('B', '').replace(',', ''));
  } else if (hasM) {
    finalValue = parseInt(finalText.replace('m', '').replace(',', ''));
  } else {
    finalValue = parseInt(finalText.replace(/,/g, ''));
  }

  let currentValue = 0;
  const increment = finalValue / 50;
  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      currentValue = finalValue;
      clearInterval(timer);
    }

    let displayText;
    if (hasB) {
      displayText = Math.floor(currentValue).toLocaleString() + 'B';
    } else if (hasM) {
      displayText = Math.floor(currentValue).toLocaleString() + 'm';
    } else {
      displayText = Math.floor(currentValue).toLocaleString();
    }

    element.textContent = displayText;
  }, 30);
}

// Interactive Saline Wedge Visualizer
function initSalineWedgeVisualizer() {
  const wedgeContainer = document.getElementById('salineWedge');
  const extractionSlider = document.getElementById('extractionRate');
  const seaLevelSlider = document.getElementById('seaLevel');
  const extractionValue = document.getElementById('extractionValue');
  const seaLevelValue = document.getElementById('seaLevelValue');
  const resetBtn = document.getElementById('resetWedge');

  let extractionRate = 50;
  let seaLevelRise = 10;

  // Create SVG wedge visualization
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.background = "linear-gradient(to bottom, #e3f2fd 0%, #f8f9fa 50%, #fff3cd 100%)";

  wedgeContainer.innerHTML = '';
  wedgeContainer.appendChild(svg);

  // Create layers
  const freshwaterLayer = document.createElementNS(svgNS, "rect");
  const salineWedge = document.createElementNS(svgNS, "path");
  const coastline = document.createElementNS(svgNS, "line");

  svg.appendChild(freshwaterLayer);
  svg.appendChild(salineWedge);
  svg.appendChild(coastline);

  // Add labels
  const freshwaterLabel = document.createElementNS(svgNS, "text");
  const salineLabel = document.createElementNS(svgNS, "text");
  const oceanLabel = document.createElementNS(svgNS, "text");

  freshwaterLabel.setAttribute("x", "50");
  freshwaterLabel.setAttribute("y", "150");
  freshwaterLabel.setAttribute("fill", "#2980b9");
  freshwaterLabel.setAttribute("font-weight", "bold");
  freshwaterLabel.textContent = "Freshwater";

  salineLabel.setAttribute("x", "200");
  salineLabel.setAttribute("y", "300");
  salineLabel.setAttribute("fill", "#e74c3c");
  salineLabel.setAttribute("font-weight", "bold");
  salineLabel.textContent = "Saline Wedge";

  oceanLabel.setAttribute("x", "300");
  oceanLabel.setAttribute("y", "350");
  oceanLabel.setAttribute("fill", "#2c3e50");
  oceanLabel.setAttribute("font-weight", "bold");
  oceanLabel.textContent = "Ocean";

  svg.appendChild(freshwaterLabel);
  svg.appendChild(salineLabel);
  svg.appendChild(oceanLabel);

  function updateVisualization() {
    const width = wedgeContainer.offsetWidth;
    const height = wedgeContainer.offsetHeight;

    // Update freshwater layer
    const freshwaterHeight = height * (0.6 - (extractionRate / 100) * 0.3 - (seaLevelRise / 100) * 0.2);
    freshwaterLayer.setAttribute("x", "0");
    freshwaterLayer.setAttribute("y", "0");
    freshwaterLayer.setAttribute("width", width * 0.7);
    freshwaterLayer.setAttribute("height", freshwaterHeight);
    freshwaterLayer.setAttribute("fill", "#e3f2fd");
    freshwaterLayer.setAttribute("stroke", "#2980b9");
    freshwaterLayer.setAttribute("stroke-width", "2");

    // Update saline wedge
    const wedgeDepth = height * (0.4 + (extractionRate / 100) * 0.3 + (seaLevelRise / 100) * 0.2);
    const wedgePath = `M ${width * 0.7} 0 L ${width} 0 L ${width} ${wedgeDepth} L ${width * 0.7} ${freshwaterHeight} Z`;
    salineWedge.setAttribute("d", wedgePath);
    salineWedge.setAttribute("fill", "#fff3cd");
    salineWedge.setAttribute("stroke", "#e74c3c");
    salineWedge.setAttribute("stroke-width", "2");

    // Update coastline
    coastline.setAttribute("x1", width * 0.7);
    coastline.setAttribute("y1", "0");
    coastline.setAttribute("x2", width);
    coastline.setAttribute("y2", "0");
    coastline.setAttribute("stroke", "#2c3e50");
    coastline.setAttribute("stroke-width", "3");
  }

  // Event listeners
  extractionSlider.addEventListener('input', function() {
    extractionRate = parseInt(this.value);
    extractionValue.textContent = extractionRate + '%';
    updateVisualization();
  });

  seaLevelSlider.addEventListener('input', function() {
    seaLevelRise = parseInt(this.value);
    seaLevelValue.textContent = seaLevelRise + ' cm';
    updateVisualization();
  });

  resetBtn.addEventListener('click', function() {
    extractionRate = 50;
    seaLevelRise = 10;
    extractionSlider.value = extractionRate;
    seaLevelSlider.value = seaLevelRise;
    extractionValue.textContent = extractionRate + '%';
    seaLevelValue.textContent = seaLevelRise + ' cm';
    updateVisualization();
  });

  // Initial render
  updateVisualization();
}

// Species Tolerance Simulator
function initSpeciesToleranceSimulator() {
  const toleranceBars = document.querySelectorAll('.tolerance-level');

  const toleranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateToleranceBar(entry.target);
      }
    });
  }, { threshold: 0.5 });

  toleranceBars.forEach(bar => {
    toleranceObserver.observe(bar);
  });
}

function animateToleranceBar(bar) {
  const toleranceValue = bar.nextElementSibling;
  const targetWidth = parseFloat(bar.style.width);

  let currentWidth = 0;
  const increment = targetWidth / 50;

  const timer = setInterval(() => {
    currentWidth += increment;
    if (currentWidth >= targetWidth) {
      currentWidth = targetWidth;
      clearInterval(timer);
    }
    bar.style.width = currentWidth + '%';
  }, 20);
}

// Vegetation Impact Model
function initVegetationImpactModel() {
  // Add hover effects and animations to vegetation response cards
  const responseCards = document.querySelectorAll('.response-card');

  responseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Animate community shift visualization
  const shiftVisualization = document.querySelector('.shift-visualization');

  const shiftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('shift-animate');
      }
    });
  }, { threshold: 0.5 });

  if (shiftVisualization) {
    shiftObserver.observe(shiftVisualization);
  }
}

// Management Strategy Tabs
function initManagementTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
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

  .shift-animate .original-community,
  .shift-animate .altered-community {
    animation: slideIn 0.8s ease-out forwards;
  }

  .shift-animate .original-community {
    animation-delay: 0.2s;
  }

  .shift-animate .altered-community {
    animation-delay: 0.4s;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .tolerance-level {
    width: 0%;
    transition: width 1s ease-out;
  }

  .response-card {
    transition: all 0.3s ease;
  }

  .strategy-card:hover i {
    animation: bounce 0.6s ease;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

document.head.appendChild(style);

// Add dark mode support for interactive elements
function updateInteractiveElements() {
  const isDarkMode = document.body.classList.contains('dark-mode');

  // Update SVG colors if they exist
  const svgTexts = document.querySelectorAll('svg text');
  svgTexts.forEach(text => {
    if (isDarkMode) {
      text.setAttribute('fill', '#e9ecef');
    } else {
      // Reset to original colors
      if (text.textContent === 'Freshwater') {
        text.setAttribute('fill', '#2980b9');
      } else if (text.textContent === 'Saline Wedge') {
        text.setAttribute('fill', '#e74c3c');
      } else {
        text.setAttribute('fill', '#2c3e50');
      }
    }
  });
}

// Listen for theme changes
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    setTimeout(updateInteractiveElements, 100);
  });
}

// Initialize on load
updateInteractiveElements();</content>
<parameter name="filePath">c:\Users\Gupta\Downloads\Environment_Animal_Safety_Hub\frontend\js\pages\salinity-intrusion-coastal-aquifers.js