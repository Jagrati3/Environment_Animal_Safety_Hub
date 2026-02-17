// Behavioral Homogenization in Urban Wildlife - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initUrbanSelectionSimulator();
  initConvergenceNetwork();
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
  const sections = document.querySelectorAll('.pressures-section, .simulator-section, .convergence-section, .research-section, .solutions-section, .cta-section');
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
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/\+/g, ''));

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

// Counter animation function
function animateCounter(element, finalText) {
  if (element.hasAttribute('data-animated')) return;

  element.setAttribute('data-animated', 'true');

  // Extract number from text
  const numberMatch = finalText.match(/[\d,]+/);
  if (!numberMatch) return;

  const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
  const isPercentage = finalText.includes('%');
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
    else if (hasPlus) displayText += '+';

    element.textContent = displayText;
  }, duration / steps);
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.pressure-card, .study-card, .solution-card');

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

// Urban Selection Simulator
function initUrbanSelectionSimulator() {
  const speciesSelect = document.getElementById('species-select');
  const urbanLevel = document.getElementById('urban-level');
  const urbanValue = document.getElementById('urban-value');
  const speciesImage = document.getElementById('species-image');
  const speciesName = document.getElementById('species-name');
  const speciesDescription = document.getElementById('species-description');

  // Species data
  const speciesData = {
    pigeon: {
      name: 'Urban Pigeon',
      icon: 'fa-dove',
      description: 'A classic urban adapter showing multiple behavioral convergences with other city birds',
      traits: {
        activity: 80,
        boldness: 85,
        diet: 90,
        social: 75
      }
    },
    squirrel: {
      name: 'City Squirrel',
      icon: 'fa-tree',
      description: 'Eastern gray squirrels in urban areas develop bolder behaviors and flexible foraging',
      traits: {
        activity: 70,
        boldness: 80,
        diet: 85,
        social: 60
      }
    },
    raccoon: {
      name: 'Urban Raccoon',
      icon: 'fa-paw',
      description: 'Raccoons show remarkable behavioral plasticity, becoming nocturnal foragers in cities',
      traits: {
        activity: 75,
        boldness: 90,
        diet: 95,
        social: 70
      }
    },
    sparrow: {
      name: 'House Sparrow',
      icon: 'fa-kiwi-bird',
      description: 'Highly urban-adapted birds showing extreme behavioral convergence with other species',
      traits: {
        activity: 85,
        boldness: 88,
        diet: 92,
        social: 80
      }
    },
    coyote: {
      name: 'Urban Coyote',
      icon: 'fa-wolf-pack-battalion',
      description: 'Large carnivores adapting to city life with behavioral changes in hunting and movement',
      traits: {
        activity: 65,
        boldness: 75,
        diet: 80,
        social: 55
      }
    }
  };

  function updateSpeciesDisplay() {
    const species = speciesSelect.value;
    const data = speciesData[species];

    speciesImage.innerHTML = `<i class="fas ${data.icon}"></i>`;
    speciesName.textContent = data.name;
    speciesDescription.textContent = data.description;

    updateTraitBars(data.traits);
  }

  function updateTraitBars(baseTraits) {
    const urbanLevelValue = parseInt(urbanLevel.value) / 100;

    // Calculate urban trait levels (base trait + urbanization effect)
    const urbanTraits = {
      activity: Math.min(100, baseTraits.activity + (urbanLevelValue * 20)),
      boldness: Math.min(100, baseTraits.boldness + (urbanLevelValue * 15)),
      diet: Math.min(100, baseTraits.diet + (urbanLevelValue * 10)),
      social: Math.min(100, baseTraits.social + (urbanLevelValue * 25))
    };

    // Update the bars
    document.getElementById('activity-urban').style.width = urbanTraits.activity + '%';
    document.getElementById('boldness-urban').style.width = urbanTraits.boldness + '%';
    document.getElementById('diet-urban').style.width = urbanTraits.diet + '%';
    document.getElementById('social-urban').style.width = urbanTraits.social + '%';
  }

  // Event listeners
  speciesSelect.addEventListener('change', updateSpeciesDisplay);
  urbanLevel.addEventListener('input', function() {
    urbanValue.textContent = this.value + '%';
    const currentSpecies = speciesSelect.value;
    updateTraitBars(speciesData[currentSpecies].traits);
  });

  // Initialize
  updateSpeciesDisplay();
}

// Convergence Network Visualization
function initConvergenceNetwork() {
  const canvas = document.getElementById('convergence-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;

  // Set canvas size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Network data
  const species = [
    { name: 'Pigeon', rural: { x: 100, y: 100 }, urban: { x: 300, y: 150 } },
    { name: 'Sparrow', rural: { x: 150, y: 200 }, urban: { x: 350, y: 180 } },
    { name: 'Squirrel', rural: { x: 200, y: 300 }, urban: { x: 400, y: 250 } },
    { name: 'Raccoon', rural: { x: 250, y: 400 }, urban: { x: 450, y: 350 } },
    { name: 'Coyote', rural: { x: 300, y: 500 }, urban: { x: 500, y: 450 } }
  ];

  function drawNetwork() {
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw connections between urban populations (showing convergence)
    ctx.strokeStyle = 'rgba(142, 68, 173, 0.3)';
    ctx.lineWidth = 2;

    for (let i = 0; i < species.length; i++) {
      for (let j = i + 1; j < species.length; j++) {
        const species1 = species[i];
        const species2 = species[j];

        ctx.beginPath();
        ctx.moveTo(species1.urban.x, species1.urban.y);
        ctx.lineTo(species2.urban.x, species2.urban.y);
        ctx.stroke();
      }
    }

    // Draw rural populations
    species.forEach(spec => {
      // Rural node
      ctx.fillStyle = '#27ae60';
      ctx.beginPath();
      ctx.arc(spec.rural.x, spec.rural.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Rural label
      ctx.fillStyle = '#2c3e50';
      ctx.font = '12px Poppins';
      ctx.fillText(spec.name, spec.rural.x + 15, spec.rural.y + 4);
    });

    // Draw urban populations
    species.forEach(spec => {
      // Urban node
      ctx.fillStyle = '#8e44ad';
      ctx.beginPath();
      ctx.arc(spec.urban.x, spec.urban.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Urban label
      ctx.fillStyle = '#2c3e50';
      ctx.font = '12px Poppins';
      ctx.fillText(spec.name + ' (Urban)', spec.urban.x + 15, spec.urban.y + 4);
    });

    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '14px Poppins';
    ctx.fillText('Rural Populations', 50, 50);
    ctx.fillText('Urban Populations', 350, 50);
    ctx.fillText('(Behavioral Convergence)', 300, 550);
  }

  // Animate the network
  function animateNetwork() {
    // Add some movement to nodes
    species.forEach(spec => {
      spec.rural.x += (Math.random() - 0.5) * 0.5;
      spec.rural.y += (Math.random() - 0.5) * 0.5;
      spec.urban.x += (Math.random() - 0.5) * 0.5;
      spec.urban.y += (Math.random() - 0.5) * 0.5;

      // Keep within bounds
      spec.rural.x = Math.max(50, Math.min(200, spec.rural.x));
      spec.rural.y = Math.max(50, Math.min(550, spec.rural.y));
      spec.urban.x = Math.max(300, Math.min(550, spec.urban.x));
      spec.urban.y = Math.max(50, Math.min(550, spec.urban.y));
    });

    drawNetwork();
    animationId = requestAnimationFrame(animateNetwork);
  }

  // Start animation
  animateNetwork();

  // Stop animation on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
}

// Add CSS for animations
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

  .species-image {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }

  .trait-fill {
    transition: width 0.5s ease;
  }
`;
document.head.appendChild(style);