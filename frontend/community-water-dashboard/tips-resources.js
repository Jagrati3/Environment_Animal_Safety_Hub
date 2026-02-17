// Water-Saving Tips & Resources Logic
// Populates actionable tips dynamically

document.addEventListener('DOMContentLoaded', function() {
  const tips = [
    'Fix leaky faucets and pipes promptly.',
    'Take shorter showers and turn off the tap while brushing teeth.',
    'Use full loads in dishwashers and washing machines.',
    'Collect rainwater for gardening.',
    'Water your garden during cooler hours to reduce evaporation.',
    'Install water-saving fixtures and appliances.',
    'Sweep driveways and sidewalks instead of hosing them down.',
    'Use a broom to clean patios and walkways.',
    'Check your toilet for leaks with food coloring.',
    'Reuse water from washing vegetables to water plants.',
    'Cover your pool to reduce evaporation.',
    'Choose native plants that require less water.',
    'Compost food waste instead of using the garbage disposal.',
    'Turn off the tap while washing dishes by hand.',
    'Only water your lawn when necessary.',
    'Use a bucket to wash your car instead of a hose.',
    'Monitor your water bill for unusually high use.',
    'Educate your family and friends about water conservation.'
  ];
  const tipsList = document.getElementById('tips-list');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });
});
// --- End of tips-resources.js ---
