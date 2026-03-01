// Micro-Decision Blindness JS
// Handles decision logging, recommendations, impact tracking, history, feedback

let decisions = [];
let impact = {
  wasteEvents: 0,
  ecoScore: 100,
  guidedDecisions: 0,
  monthlyImprovement: 0
};
let feedbacks = [];

const recommendationsData = {
  buy: {
    tip: 'Consider if you really need this item. Check for eco-labeled options and compare true impact.',
    eco: 'Choose products with minimal packaging, recycled content, and local sourcing.'
  },
  repair: {
    tip: 'Repairing extends item life and reduces waste.',
    eco: 'Find local repair shops or DIY guides. Repair before replacing.'
  },
  reuse: {
    tip: 'Reuse saves resources and money.',
    eco: 'Repurpose containers, donate items, or join sharing platforms.'
  },
  refill: {
    tip: 'Refilling reduces packaging waste.',
    eco: 'Use refill stations for water, cleaning, or food products.'
  },
  borrow: {
    tip: 'Borrowing avoids unnecessary purchases.',
    eco: 'Use community libraries, tool banks, or ask neighbors.'
  }
};

// --- App Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const decisionForm = document.getElementById('decisionForm');
  const decisionType = document.getElementById('decisionType');
  const itemName = document.getElementById('itemName');
  const itemQuantity = document.getElementById('itemQuantity');
  const recommendations = document.getElementById('recommendations');
  const impactTracker = document.getElementById('impactTracker');
  const decisionHistory = document.getElementById('decisionHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Log decision
  decisionForm.onsubmit = function(e) {
    e.preventDefault();
    const type = decisionType.value;
    const name = itemName.value.trim();
    const qty = Number(itemQuantity.value);
    if (!type || !name || !qty) return;
    decisions.push({ type, name, qty, date: new Date().toLocaleString() });
    impact.guidedDecisions++;
    if (type === 'buy') impact.wasteEvents += qty;
    if (type === 'repair') impact.ecoScore += 2 * qty;
    if (type === 'reuse') impact.ecoScore += 1 * qty;
    if (type === 'refill') impact.ecoScore += 1 * qty;
    if (type === 'borrow') impact.ecoScore += 1 * qty;
    impact.monthlyImprovement = Math.max(0, impact.ecoScore - 100);
    renderRecommendations(type);
    renderImpact();
    renderHistory();
    decisionForm.reset();
  };

  // Recommendations
  function renderRecommendations(type) {
    recommendations.innerHTML = '';
    if (!recommendationsData[type]) return;
    recommendations.innerHTML = `<div class='recommend-row'><strong>Tip:</strong> ${recommendationsData[type].tip}<br><strong>Eco Advice:</strong> ${recommendationsData[type].eco}</div>`;
  }

  // Impact tracker
  function renderImpact() {
    impactTracker.innerHTML = '';
    impactTracker.innerHTML += `<div class='impact-row'><span>Waste Events</span><span>${impact.wasteEvents}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Eco Score</span><span>${impact.ecoScore}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Guided Decisions</span><span>${impact.guidedDecisions}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Monthly Improvement</span><span>${impact.monthlyImprovement}</span></div>`;
  }

  // Decision history
  function renderHistory() {
    decisionHistory.innerHTML = '';
    decisions.slice(-20).reverse().forEach(d => {
      decisionHistory.innerHTML += `<div class='history-row'><span>${d.type}</span><span>${d.name}</span><span>${d.qty}</span><span>${d.date}</span></div>`;
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
  renderImpact();
  renderHistory();
  renderFeedbacks();
});
