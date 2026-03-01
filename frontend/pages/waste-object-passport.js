// Waste Object Passport JS
// Handles product lookup, passport details, actions, history, feedback

let products = [
  {
    code: 'A123',
    name: 'Smartphone',
    material: 'Aluminum, Glass, Plastic',
    footprint: '45 kg CO₂',
    repairability: 'Medium',
    reuse: ['Donate', 'Resell'],
    resale: 'High',
    endOfLife: ['Recycle', 'E-waste Facility'],
    bestAction: 'Resell',
    origin: 'China',
    history: []
  },
  {
    code: 'B456',
    name: 'Cotton T-shirt',
    material: 'Cotton',
    footprint: '2.1 kg CO₂',
    repairability: 'High',
    reuse: ['Donate', 'Upcycle'],
    resale: 'Medium',
    endOfLife: ['Recycle', 'Compost'],
    bestAction: 'Donate',
    origin: 'India',
    history: []
  },
  {
    code: 'C789',
    name: 'Plastic Bottle',
    material: 'PET Plastic',
    footprint: '0.12 kg CO₂',
    repairability: 'None',
    reuse: ['Upcycle'],
    resale: 'Low',
    endOfLife: ['Recycle'],
    bestAction: 'Recycle',
    origin: 'USA',
    history: []
  }
];
let objectHistory = [];
let feedbacks = [];

// --- Passport Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const passportForm = document.getElementById('passportForm');
  const productCode = document.getElementById('productCode');
  const passportDetails = document.getElementById('passportDetails');
  const passportActions = document.getElementById('passportActions');
  const objectHistoryDiv = document.getElementById('objectHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');
  const scanArea = document.getElementById('scanArea');

  // Render scan area (placeholder)
  function renderScan() {
    scanArea.innerHTML = 'Scan barcode or QR code here.';
  }

  // Lookup product
  passportForm.onsubmit = function(e) {
    e.preventDefault();
    const code = productCode.value.trim();
    const product = products.find(p => p.code === code || p.name.toLowerCase() === code.toLowerCase());
    if (!product) {
      passportDetails.innerHTML = '<div class="passport-row">Product not found.</div>';
      passportActions.innerHTML = '';
      return;
    }
    renderPassport(product);
    renderActions(product);
    addToHistory(product);
    passportForm.reset();
  };

  // Render passport details
  function renderPassport(product) {
    passportDetails.innerHTML = `
      <div class='passport-row selected'>
        <strong>${product.name}</strong>
        <span>Material Origin: ${product.origin}</span>
        <span>Production Footprint: ${product.footprint}</span>
        <span>Repairability: ${product.repairability}</span>
        <span>Reuse Paths: ${product.reuse.join(', ')}</span>
        <span>Resale Potential: ${product.resale}</span>
        <span>End-of-Life Options: ${product.endOfLife.join(', ')}</span>
      </div>
    `;
  }

  // Render recommended actions
  function renderActions(product) {
    passportActions.innerHTML = '';
    product.reuse.forEach(a => {
      passportActions.innerHTML += `<div class='action-row'>Reuse: ${a}</div>`;
    });
    product.endOfLife.forEach(a => {
      passportActions.innerHTML += `<div class='action-row'>End-of-Life: ${a}</div>`;
    });
    passportActions.innerHTML += `<div class='action-row best'>Best Next Action: ${product.bestAction}</div>`;
  }

  // Add to history
  function addToHistory(product) {
    objectHistory.push({ name: product.name, code: product.code, date: new Date().toLocaleString(), action: product.bestAction });
    renderHistory();
  }

  // Render history
  function renderHistory() {
    objectHistoryDiv.innerHTML = '';
    objectHistory.slice(-10).reverse().forEach(h => {
      objectHistoryDiv.innerHTML += `<div class='history-row'><span>${h.name}</span><span>${h.code}</span><span>${h.action}</span><span>${h.date}</span></div>`;
    });
  }

  // Feedback logic
  feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    const text = feedbackInput.value.trim();
    if (!text) return;
    feedbacks.push({ text, date: new Date().toLocaleString() });
    renderFeedbacks();
    feedbackForm.reset();
  };
  function renderFeedbacks() {
    feedbackList.innerHTML = '';
    feedbacks.slice(-10).reverse().forEach(f => {
      feedbackList.innerHTML += `<div class='feedback-row'><span>${f.text}</span><small>${f.date}</small></div>`;
    });
  }

  // Initial render
  renderScan();
  renderHistory();
  renderFeedbacks();
});
