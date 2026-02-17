// waste-sort.js - Smart Waste Sorting App logic
// Simulated image recognition for demo; replace with real ML API for production

const wasteForm = document.getElementById('waste-form');
const wasteImage = document.getElementById('waste-image');
const resultDiv = document.getElementById('result');
const ecoImpactDiv = document.getElementById('eco-impact');
const tipsDiv = document.getElementById('tips');

// Sample data for demo
const sampleWasteItems = [
  { name: 'Plastic Bottle', category: 'recycle', emoji: '♻️' },
  { name: 'Banana Peel', category: 'compost', emoji: '🌱' },
  { name: 'Pizza Box (greasy)', category: 'landfill', emoji: '🗑️' },
  { name: 'Glass Jar', category: 'recycle', emoji: '♻️' },
  { name: 'Eggshells', category: 'compost', emoji: '🌱' },
  { name: 'Chip Bag', category: 'landfill', emoji: '🗑️' },
  { name: 'Newspaper', category: 'recycle', emoji: '♻️' },
  { name: 'Coffee Grounds', category: 'compost', emoji: '🌱' },
  { name: 'Styrofoam Cup', category: 'landfill', emoji: '🗑️' },
];

const wasteCategories = [
  { type: 'recycle', label: 'Recycle', emoji: '♻️', tips: [
    'Rinse containers before recycling.',
    'Flatten cardboard boxes to save space.',
    'Check local recycling rules for plastics.'
  ]},
  { type: 'compost', label: 'Compost', emoji: '🌱', tips: [
    'Compost fruit and veggie scraps, coffee grounds, and eggshells.',
    'Avoid composting meat, dairy, or oily foods.',
    'Use compost in your garden to enrich soil.'
  ]},
  { type: 'landfill', label: 'Landfill', emoji: '🗑️', tips: [
    'Reduce landfill waste by reusing and recycling when possible.',
    'Hazardous waste (batteries, electronics) should not go in landfill.',
    'Try to buy products with less packaging.'
  ]}
];

function fakeImageRecognition(file) {
  // Simulate recognition: random category for demo
  const idx = Math.floor(Math.random() * wasteCategories.length);
  return wasteCategories[idx];
}

function updateEcoImpact(category) {
  // Simple eco-impact tracker (demo)
  let count = Number(localStorage.getItem('ecoCount_' + category.type) || 0);
  count++;
  localStorage.setItem('ecoCount_' + category.type, count);
  ecoImpactDiv.innerHTML = `You have sorted <b>${count}</b> items as <b>${category.label}</b>!`;
}

function showTips(category) {
  const tips = category.tips;
  tipsDiv.innerHTML = `<b>Tips:</b><ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>`;
}

wasteForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const file = wasteImage.files[0];
  if (!file) return;
  // Simulate recognition
  const category = fakeImageRecognition(file);
  resultDiv.textContent = `${category.emoji} This item should go in: ${category.label}`;
  resultDiv.className = `result ${category.type}`;
  updateEcoImpact(category);
  showTips(category);
});

// Render sample data
function renderSampleData() {
  const sampleList = document.getElementById('sample-list');
  if (!sampleList) return;
  sampleList.innerHTML = sampleWasteItems.map(item =>
    `<div class="sample-item ${item.category}"><span class="emoji">${item.emoji}</span> ${item.name}</div>`
  ).join('');
}

renderSampleData();
