// Future Memory Postcards JS
// Handles city selection, future snapshots, timeline, feedback

let cities = {
  Delhi: {
    action: {
      image: 'delhi-action.jpg',
      scene: 'Clean air, green spaces, thriving biodiversity, cool summers.',
      timeline: [
        { year: 2026, air: 'PM2.5: 60', water: 'Moderate', heat: '38°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 40', water: 'Good', heat: '36°C', bio: 'Improving' },
        { year: 2040, air: 'PM2.5: 25', water: 'Excellent', heat: '33°C', bio: 'Rich' }
      ]
    },
    noaction: {
      image: 'delhi-noaction.jpg',
      scene: 'Smog, water shortages, heat waves, loss of wildlife.',
      timeline: [
        { year: 2026, air: 'PM2.5: 60', water: 'Moderate', heat: '38°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 80', water: 'Poor', heat: '41°C', bio: 'Declining' },
        { year: 2040, air: 'PM2.5: 120', water: 'Critical', heat: '45°C', bio: 'Sparse' }
      ]
    }
  },
  Mumbai: {
    action: {
      image: 'mumbai-action.jpg',
      scene: 'Clean beaches, healthy mangroves, safe drinking water.',
      timeline: [
        { year: 2026, air: 'PM2.5: 50', water: 'Moderate', heat: '34°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 35', water: 'Good', heat: '32°C', bio: 'Improving' },
        { year: 2040, air: 'PM2.5: 20', water: 'Excellent', heat: '29°C', bio: 'Rich' }
      ]
    },
    noaction: {
      image: 'mumbai-noaction.jpg',
      scene: 'Floods, polluted water, loss of mangroves, heat stress.',
      timeline: [
        { year: 2026, air: 'PM2.5: 50', water: 'Moderate', heat: '34°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 60', water: 'Poor', heat: '36°C', bio: 'Declining' },
        { year: 2040, air: 'PM2.5: 90', water: 'Critical', heat: '39°C', bio: 'Sparse' }
      ]
    }
  },
  London: {
    action: {
      image: 'london-action.jpg',
      scene: 'Clean rivers, cool summers, urban wildlife.',
      timeline: [
        { year: 2026, air: 'PM2.5: 25', water: 'Good', heat: '22°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 18', water: 'Excellent', heat: '21°C', bio: 'Improving' },
        { year: 2040, air: 'PM2.5: 10', water: 'Excellent', heat: '19°C', bio: 'Rich' }
      ]
    },
    noaction: {
      image: 'london-noaction.jpg',
      scene: 'Dirty rivers, heat waves, loss of birds.',
      timeline: [
        { year: 2026, air: 'PM2.5: 25', water: 'Good', heat: '22°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 35', water: 'Poor', heat: '25°C', bio: 'Declining' },
        { year: 2040, air: 'PM2.5: 50', water: 'Critical', heat: '28°C', bio: 'Sparse' }
      ]
    }
  },
  'New York': {
    action: {
      image: 'ny-action.jpg',
      scene: 'Clean air, green parks, healthy rivers.',
      timeline: [
        { year: 2026, air: 'PM2.5: 30', water: 'Good', heat: '25°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 20', water: 'Excellent', heat: '23°C', bio: 'Improving' },
        { year: 2040, air: 'PM2.5: 12', water: 'Excellent', heat: '21°C', bio: 'Rich' }
      ]
    },
    noaction: {
      image: 'ny-noaction.jpg',
      scene: 'Polluted air, water shortages, heat waves.',
      timeline: [
        { year: 2026, air: 'PM2.5: 30', water: 'Good', heat: '25°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 40', water: 'Poor', heat: '28°C', bio: 'Declining' },
        { year: 2040, air: 'PM2.5: 60', water: 'Critical', heat: '32°C', bio: 'Sparse' }
      ]
    }
  },
  Sydney: {
    action: {
      image: 'sydney-action.jpg',
      scene: 'Clean beaches, healthy reefs, cool summers.',
      timeline: [
        { year: 2026, air: 'PM2.5: 20', water: 'Good', heat: '27°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 15', water: 'Excellent', heat: '25°C', bio: 'Improving' },
        { year: 2040, air: 'PM2.5: 8', water: 'Excellent', heat: '22°C', bio: 'Rich' }
      ]
    },
    noaction: {
      image: 'sydney-noaction.jpg',
      scene: 'Bleached reefs, polluted water, heat waves.',
      timeline: [
        { year: 2026, air: 'PM2.5: 20', water: 'Good', heat: '27°C', bio: 'Stable' },
        { year: 2030, air: 'PM2.5: 30', water: 'Poor', heat: '29°C', bio: 'Declining' },
        { year: 2040, air: 'PM2.5: 45', water: 'Critical', heat: '33°C', bio: 'Sparse' }
      ]
    }
  }
};
let feedbacks = [];

// --- Postcards Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const cityForm = document.getElementById('cityForm');
  const citySelect = document.getElementById('citySelect');
  const futurePostcards = document.getElementById('futurePostcards');
  const futureTimeline = document.getElementById('futureTimeline');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // City search
  cityForm.onsubmit = function(e) {
    e.preventDefault();
    const city = citySelect.value;
    if (!city || !cities[city]) return;
    renderPostcards(city);
    renderTimeline(city);
    renderNarrative(city);
    cityForm.reset();
  };

  // Share postcard
  futurePostcards.addEventListener('click', function(e) {
    if (e.target.classList.contains('postcard-row')) {
      const city = citySelect.value;
      if (!city || !cities[city]) return;
      alert('Postcard shared for ' + city + '!');
    }
  });

  // Animate timeline
  let timelineInterval;
  function animateTimeline(city) {
    const actionTimeline = cities[city].action.timeline;
    const noactionTimeline = cities[city].noaction.timeline;
    let i = 0;
    futureTimeline.innerHTML = '';
    clearInterval(timelineInterval);
    timelineInterval = setInterval(() => {
      if (i >= actionTimeline.length) {
        clearInterval(timelineInterval);
        return;
      }
      const t = actionTimeline[i];
      const na = noactionTimeline[i];
      futureTimeline.innerHTML += `<div class='timeline-row'><span>${t.year}</span><span>Action: Air ${t.air}, Water ${t.water}, Heat ${t.heat}, Bio ${t.bio}</span><span>No Action: Air ${na.air}, Water ${na.water}, Heat ${na.heat}, Bio ${na.bio}</span></div>`;
      i++;
    }, 1200);
  }

  // Narrative expansion
  function renderNarrative(city) {
    const action = cities[city].action;
    const noaction = cities[city].noaction;
    const narrativeDiv = document.createElement('div');
    narrativeDiv.className = 'narrative-section';
    narrativeDiv.innerHTML = `<h3>Short Narrative Scenes</h3><div><strong>Action:</strong> ${action.scene}</div><div><strong>No Action:</strong> ${noaction.scene}</div>`;
    futurePostcards.appendChild(narrativeDiv);
    animateTimeline(city);
  }

  function renderPostcards(city) {
    const action = cities[city].action;
    const noaction = cities[city].noaction;
    futurePostcards.innerHTML = `
      <div class='postcard-row action' tabindex='0'>
        <strong>Climate Action Future</strong>
        <img src='${action.image}' alt='Action Future' style='width:100%;max-width:320px;border-radius:8px;margin-bottom:8px;'>
        <span>${action.scene}</span>
        <button class='share-btn'>Share Postcard</button>
      </div>
      <div class='postcard-row noaction' tabindex='0'>
        <strong>No Action Future</strong>
        <img src='${noaction.image}' alt='No Action Future' style='width:100%;max-width:320px;border-radius:8px;margin-bottom:8px;'>
        <span>${noaction.scene}</span>
        <button class='share-btn'>Share Postcard</button>
      </div>
    `;
  }

  function renderTimeline(city) {
    animateTimeline(city);
  }

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

  renderFeedbacks();
});
