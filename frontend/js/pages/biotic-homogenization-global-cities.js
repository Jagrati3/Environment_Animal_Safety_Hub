// Biotic Homogenization Across Global Cities - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initCardHoverEffects();
  initCityComparator();
  initWorldMap();
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
  const sections = document.querySelectorAll('.drivers-section, .comparator-section, .map-section, .research-section, .solutions-section, .cta-section');
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
  const cards = document.querySelectorAll('.driver-card, .study-card, .solution-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });
}

// City comparator functionality
function initCityComparator() {
  const city1Select = document.getElementById('city1-select');
  const city2Select = document.getElementById('city2-select');

  // City data with species information
  const cityData = {
    'newyork': {
      name: 'New York City',
      species: 250,
      commonSpecies: ['Rock Pigeon', 'European Starling', 'Norway Rat', 'House Sparrow']
    },
    'london': {
      name: 'London',
      species: 220,
      commonSpecies: ['Rock Pigeon', 'European Starling', 'House Sparrow', 'Common Rat']
    },
    'tokyo': {
      name: 'Tokyo',
      species: 180,
      commonSpecies: ['Rock Pigeon', 'Large-billed Crow', 'Brown Rat', 'House Sparrow']
    },
    'sydney': {
      name: 'Sydney',
      species: 190,
      commonSpecies: ['Rock Pigeon', 'European Starling', 'Common Myna', 'House Sparrow']
    },
    'paris': {
      name: 'Paris',
      species: 200,
      commonSpecies: ['Rock Pigeon', 'European Starling', 'House Sparrow', 'Norway Rat']
    },
    'beijing': {
      name: 'Beijing',
      species: 160,
      commonSpecies: ['Rock Pigeon', 'Eurasian Tree Sparrow', 'Brown Rat', 'Azure-winged Magpie']
    },
    'rio': {
      name: 'Rio de Janeiro',
      species: 170,
      commonSpecies: ['Rock Pigeon', 'Eared Dove', 'House Sparrow', 'Black Rat']
    },
    'cape-town': {
      name: 'Cape Town',
      species: 140,
      commonSpecies: ['Rock Pigeon', 'House Sparrow', 'European Starling', 'Cape Sparrow']
    }
  };

  function updateComparison() {
    const city1 = city1Select.value;
    const city2 = city2Select.value;

    if (!city1 || !city2 || city1 === city2) return;

    const city1Data = cityData[city1];
    const city2Data = cityData[city2];

    // Update city info
    document.getElementById('city1-name').textContent = city1Data.name;
    document.getElementById('city1-species').textContent = city1Data.species;

    document.getElementById('city2-name').textContent = city2Data.name;
    document.getElementById('city2-species').textContent = city2Data.species;

    // Calculate similarity (simplified - in reality this would be more complex)
    const similarity = calculateSimilarity(city1Data.commonSpecies, city2Data.commonSpecies);
    updateSimilarityGauge(similarity);

    // Update shared species
    updateSharedSpecies(city1Data.commonSpecies, city2Data.commonSpecies);
  }

  function calculateSimilarity(species1, species2) {
    // Simple Jaccard similarity coefficient
    const intersection = species1.filter(species => species2.includes(species)).length;
    const union = new Set([...species1, ...species2]).size;
    return Math.round((intersection / union) * 100);
  }

  function updateSimilarityGauge(percentage) {
    const gaugeFill = document.getElementById('gauge-fill');
    const percentageText = document.getElementById('similarity-percentage');

    // Calculate stroke-dashoffset for the gauge (251.2 is the circumference)
    const circumference = 251.2;
    const offset = circumference - (percentage / 100) * circumference;

    gaugeFill.style.strokeDashoffset = offset;
    percentageText.textContent = percentage + '%';
  }

  function updateSharedSpecies(species1, species2) {
    const shared = species1.filter(species => species2.includes(species));
    const container = document.getElementById('shared-species-list');

    container.innerHTML = '';

    if (shared.length === 0) {
      container.innerHTML = '<span class="species-tag">No common species</span>';
      return;
    }

    shared.forEach(species => {
      const tag = document.createElement('span');
      tag.className = 'species-tag';
      tag.textContent = species;
      container.appendChild(tag);
    });
  }

  // Event listeners
  city1Select.addEventListener('change', updateComparison);
  city2Select.addEventListener('change', updateComparison);

  // Initialize with default values
  updateComparison();
}

// World map visualization
function initWorldMap() {
  const mapContainer = document.getElementById('world-map');

  // Homogenization levels by region (simplified data)
  const homogenizationData = {
    'North America': { level: 'high', cities: ['New York', 'Los Angeles', 'Toronto'] },
    'Europe': { level: 'high', cities: ['London', 'Paris', 'Berlin'] },
    'Asia': { level: 'medium', cities: ['Tokyo', 'Beijing', 'Mumbai'] },
    'South America': { level: 'medium', cities: ['Rio de Janeiro', 'São Paulo', 'Buenos Aires'] },
    'Africa': { level: 'low', cities: ['Cape Town', 'Nairobi', 'Lagos'] },
    'Australia': { level: 'medium', cities: ['Sydney', 'Melbourne', 'Perth'] }
  };

  // Create a simple world map representation
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 800 400');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  // Simplified continent shapes (rectangles for demonstration)
  const continents = [
    { name: 'North America', x: 50, y: 50, width: 200, height: 150, color: '#e74c3c' },
    { name: 'Europe', x: 300, y: 50, width: 150, height: 100, color: '#e74c3c' },
    { name: 'Asia', x: 500, y: 50, width: 250, height: 150, color: '#f39c12' },
    { name: 'South America', x: 150, y: 220, width: 120, height: 150, color: '#f39c12' },
    { name: 'Africa', x: 320, y: 180, width: 120, height: 190, color: '#27ae60' },
    { name: 'Australia', x: 550, y: 280, width: 150, height: 80, color: '#f39c12' }
  ];

  continents.forEach(continent => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', continent.x);
    rect.setAttribute('y', continent.y);
    rect.setAttribute('width', continent.width);
    rect.setAttribute('height', continent.height);
    rect.setAttribute('fill', continent.color);
    rect.setAttribute('stroke', '#fff');
    rect.setAttribute('stroke-width', '2');
    rect.setAttribute('rx', '8');

    // Add hover effects
    rect.addEventListener('mouseenter', function() {
      this.style.opacity = '0.8';
      showContinentInfo(continent.name, homogenizationData[continent.name]);
    });

    rect.addEventListener('mouseleave', function() {
      this.style.opacity = '1';
      hideContinentInfo();
    });

    svg.appendChild(rect);

    // Add continent label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', continent.x + continent.width / 2);
    text.setAttribute('y', continent.y + continent.height / 2);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', 'bold');
    text.textContent = continent.name;
    svg.appendChild(text);
  });

  mapContainer.appendChild(svg);

  // Info tooltip
  const infoTooltip = document.createElement('div');
  infoTooltip.id = 'continent-info';
  infoTooltip.style.cssText = `
    position: absolute;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
    display: none;
    pointer-events: none;
    z-index: 1000;
  `;
  mapContainer.appendChild(infoTooltip);

  function showContinentInfo(continentName, data) {
    infoTooltip.innerHTML = `
      <strong>${continentName}</strong><br>
      Homogenization: ${data.level}<br>
      Major cities: ${data.cities.join(', ')}
    `;
    infoTooltip.style.display = 'block';
  }

  function hideContinentInfo() {
    infoTooltip.style.display = 'none';
  }

  // Update tooltip position on mouse move
  mapContainer.addEventListener('mousemove', function(e) {
    infoTooltip.style.left = e.offsetX + 10 + 'px';
    infoTooltip.style.top = e.offsetY - 10 + 'px';
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

  .species-tag {
    animation: tagFadeIn 0.5s ease-out forwards;
  }

  @keyframes tagFadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);