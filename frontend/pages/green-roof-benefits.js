// Green Roof Benefits Visualizer JS
// Handles benefits cards, simulator, and case studies

document.addEventListener('DOMContentLoaded', function() {
  // --- Benefits Data ---
  const benefits = [
    { icon: '🌱', title: 'Urban Heat Reduction', desc: 'Green roofs lower city temperatures by absorbing sunlight and providing natural cooling.' },
    { icon: '💧', title: 'Stormwater Management', desc: 'Absorbs rainwater, reducing runoff and easing pressure on drainage systems.' },
    { icon: '⚡', title: 'Energy Savings', desc: 'Improves building insulation, reducing heating and cooling costs.' },
    { icon: '🌬️', title: 'Air Quality Improvement', desc: 'Plants filter pollutants and CO₂, improving urban air quality.' },
    { icon: '🦋', title: 'Biodiversity Support', desc: 'Provides habitats for birds, insects, and pollinators in urban areas.' },
    { icon: '🏢', title: 'Building Longevity', desc: 'Protects roof membranes from UV and temperature extremes, extending lifespan.' },
    { icon: '🎨', title: 'Aesthetic Value', desc: 'Transforms rooftops into beautiful, usable green spaces.' },
    { icon: '🔇', title: 'Noise Reduction', desc: 'Vegetation and soil layers dampen urban noise pollution.' }
  ];
  const benefitsGrid = document.getElementById('benefitsGrid');
  benefits.forEach(b => {
    const card = document.createElement('div');
    card.className = 'benefit-card';
    card.innerHTML = `<div class="benefit-icon">${b.icon}</div><div class="benefit-title">${b.title}</div><div class="benefit-desc">${b.desc}</div>`;
    benefitsGrid.appendChild(card);
  });

  // --- Simulator ---
  const cityFactors = {
    nyc: { name: 'New York', base: 0.18 },
    la: { name: 'Los Angeles', base: 0.14 },
    toronto: { name: 'Toronto', base: 0.16 },
    berlin: { name: 'Berlin', base: 0.15 },
    singapore: { name: 'Singapore', base: 0.12 }
  };
  const simulatorForm = document.getElementById('simulatorForm');
  const simulatorResult = document.getElementById('simulatorResult');
  simulatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const size = parseFloat(document.getElementById('roofSize').value);
    const city = document.getElementById('city').value;
    if (isNaN(size) || size < 10) {
      simulatorResult.textContent = 'Please enter a valid roof size.';
      return;
    }
    // Simple simulation: savings = size * city base * random(0.9-1.1)
    const factor = cityFactors[city].base;
    const randomizer = 0.9 + Math.random() * 0.2;
    const savings = size * factor * randomizer;
    simulatorResult.textContent = `Estimated annual energy savings: $${savings.toFixed(2)} (USD)`;
  });

  // --- Case Studies ---
  const caseStudies = [
    { city: 'New York', summary: 'The Javits Center green roof, one of the largest in the US, reduced energy consumption by 26% and became a habitat for 29 bird species.' },
    { city: 'Toronto', summary: 'Toronto’s City Hall green roof project led to measurable reductions in stormwater runoff and urban heat, inspiring city-wide green roof bylaws.' },
    { city: 'Berlin', summary: 'Berlin incentivized green roofs, resulting in over 4 million m² of green roofs, improving air quality and biodiversity.' },
    { city: 'Singapore', summary: 'Singapore’s Skyrise Greenery Initiative transformed rooftops into lush gardens, reducing building temperatures and enhancing city aesthetics.' },
    { city: 'Los Angeles', summary: 'LA’s green roof pilot projects showed up to 50% reduction in rooftop surface temperatures and improved local air quality.' }
  ];
  const caseStudiesGrid = document.getElementById('caseStudiesGrid');
  caseStudies.forEach(cs => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.innerHTML = `<div class="case-city">${cs.city}</div><div class="case-summary">${cs.summary}</div>`;
    caseStudiesGrid.appendChild(card);
  });
});
