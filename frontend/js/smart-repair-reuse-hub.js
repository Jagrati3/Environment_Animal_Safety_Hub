// Smart Repair & Reuse Hub

const GUIDES = [
  {
    id: 1,
    name: 'Desk Lamp',
    icon: '💡',
    category: 'electronics',
    tags: ['easy', '30 min'],
    steps: [
      'Unplug and check cord for visible damage.',
      'Replace bulb and test the socket.',
      'Tighten loose screws in the base.',
      'Inspect switch and replace if needed.'
    ],
    tools: ['Screwdriver', 'Replacement bulb', 'Electrical tape'],
    reuse: ['Turn base into a cable organizer', 'Use shade for a pendant light'],
    tips: 'If wiring is frayed, avoid taping and replace the cord entirely.',
    co2Avoided: 0.8
  },
  {
    id: 2,
    name: 'Wooden Chair',
    icon: '🪑',
    category: 'furniture',
    tags: ['medium', '1 hr'],
    steps: [
      'Flip the chair and tighten joints with wood glue.',
      'Clamp for 20 minutes and wipe excess glue.',
      'Sand rough edges and refinish if needed.',
      'Replace missing foot pads.'
    ],
    tools: ['Wood glue', 'Clamps', 'Sandpaper', 'Finish oil'],
    reuse: ['Turn into a plant stand', 'Use parts for wall hooks'],
    tips: 'Let glue cure fully overnight before heavy use.',
    co2Avoided: 2.4
  },
  {
    id: 3,
    name: 'Bluetooth Headphones',
    icon: '🎧',
    category: 'electronics',
    tags: ['medium', '45 min'],
    steps: [
      'Clean ear cushions and inspect for cracks.',
      'Replace the headband padding if peeling.',
      'Reset firmware and test battery health.',
      'Replace the battery if charging is inconsistent.'
    ],
    tools: ['Small screwdriver', 'Replacement battery', 'Cleaning cloth'],
    reuse: ['Turn ear cups into mini speakers', 'Reuse headband for cable wrap'],
    tips: 'Check manufacturer guides for safe battery swaps.',
    co2Avoided: 1.1
  },
  {
    id: 4,
    name: 'Kitchen Blender',
    icon: '🧉',
    category: 'kitchen',
    tags: ['easy', '25 min'],
    steps: [
      'Inspect blade assembly and tighten mount.',
      'Replace the rubber gasket if leaking.',
      'Clean motor vents and test speeds.',
      'Check cord strain relief for damage.'
    ],
    tools: ['Wrench', 'Replacement gasket', 'Brush'],
    reuse: ['Use pitcher as a vase', 'Repurpose motor base as cable hub'],
    tips: 'Never submerge the motor base in water.',
    co2Avoided: 1.6
  },
  {
    id: 5,
    name: 'Rain Jacket',
    icon: '🧥',
    category: 'clothing',
    tags: ['easy', '20 min'],
    steps: [
      'Wash and dry to reset waterproof coating.',
      'Patch small tears with repair tape.',
      'Reapply DWR spray evenly.',
      'Test water beading.'
    ],
    tools: ['Repair tape', 'DWR spray', 'Lint-free cloth'],
    reuse: ['Cut into waterproof patches', 'Turn into a bike seat cover'],
    tips: 'Use low heat when reactivating waterproof layers.',
    co2Avoided: 0.7
  },
  {
    id: 6,
    name: 'Garden Hose',
    icon: '🪴',
    category: 'outdoor',
    tags: ['easy', '15 min'],
    steps: [
      'Locate puncture by running water.',
      'Cut damaged section out.',
      'Insert hose mender and clamp tightly.',
      'Test for leaks.'
    ],
    tools: ['Hose mender', 'Hose clamps', 'Utility knife'],
    reuse: ['Use leftover hose as a tool handle grip', 'Create a garden hose wreath'],
    tips: 'Warm the hose in hot water before inserting the mender.',
    co2Avoided: 0.9
  }
];

const TIPS = [
  {
    title: 'Start with Safety',
    description: 'Unplug items and use protective gear when needed.',
    icon: 'fa-shield-halved'
  },
  {
    title: 'Document Your Steps',
    description: 'Take photos before disassembly to simplify reassembly.',
    icon: 'fa-camera'
  },
  {
    title: 'Clean as You Go',
    description: 'Dust and clean parts while the item is open.',
    icon: 'fa-broom'
  },
  {
    title: 'Check Online Manuals',
    description: 'Manufacturer manuals can speed up troubleshooting.',
    icon: 'fa-book'
  }
];

const STORAGE_KEY = 'smartRepairReuseHub';

let appState = {
  completed: [],
  co2Avoided: 0
};

function initApp() {
  loadState();
  bindEvents();
  renderStats();
  renderSearchResults('');
  renderTips();
  renderLog();
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    appState = { ...appState, ...JSON.parse(saved) };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function bindEvents() {
  const input = document.getElementById('searchInput');
  input.addEventListener('input', (event) => {
    renderSearchResults(event.target.value.trim());
  });
  document.addEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
  const searchBox = document.querySelector('.search-wrapper');
  const results = document.getElementById('searchResults');
  if (!searchBox.contains(event.target) && !results.contains(event.target)) {
    results.classList.add('hidden');
  }
}

function renderSearchResults(query) {
  const results = document.getElementById('searchResults');
  const clearBtn = document.getElementById('clearBtn');
  if (!query) {
    clearBtn.style.visibility = 'hidden';
    results.classList.add('hidden');
    return;
  }

  clearBtn.style.visibility = 'visible';
  const filtered = GUIDES.filter((guide) => guide.name.toLowerCase().includes(query.toLowerCase()));

  results.innerHTML = filtered.length
    ? filtered.map((guide) => `
        <div class="search-item" onclick="openGuide(${guide.id})">
          <span>${guide.icon}</span>
          <div>
            <div><strong>${guide.name}</strong></div>
            <div class="log-meta">${guide.category} · ${guide.tags.join(' · ')}</div>
          </div>
        </div>
      `).join('')
    : '<div class="search-item">No matches found.</div>';

  results.classList.remove('hidden');
}

function selectCategory(category) {
  const results = document.getElementById('searchResults');
  const filtered = GUIDES.filter((guide) => guide.category === category);
  results.innerHTML = filtered.map((guide) => `
    <div class="search-item" onclick="openGuide(${guide.id})">
      <span>${guide.icon}</span>
      <div>
        <div><strong>${guide.name}</strong></div>
        <div class="log-meta">${guide.category} · ${guide.tags.join(' · ')}</div>
      </div>
    </div>
  `).join('');
  results.classList.remove('hidden');
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearBtn').style.visibility = 'hidden';
  document.getElementById('searchResults').classList.add('hidden');
}

function openGuide(id) {
  const guide = GUIDES.find((item) => item.id === id);
  if (!guide) return;

  document.getElementById('guideIcon').textContent = guide.icon;
  document.getElementById('guideTitle').textContent = guide.name;
  document.getElementById('guideTags').innerHTML = guide.tags.map((tag) => `
    <span class="guide-tag">${tag}</span>
  `).join('');
  document.getElementById('guideSteps').innerHTML = guide.steps.map((step) => `<li>${step}</li>`).join('');
  document.getElementById('guideTools').innerHTML = guide.tools.map((tool) => `<li>${tool}</li>`).join('');
  document.getElementById('guideReuse').innerHTML = guide.reuse.map((idea) => `<li>${idea}</li>`).join('');
  document.getElementById('guideTips').textContent = guide.tips;

  document.getElementById('guideDetail').classList.remove('hidden');
  document.getElementById('searchResults').classList.add('hidden');
  window.currentGuideId = id;
}

function closeGuide() {
  document.getElementById('guideDetail').classList.add('hidden');
  window.currentGuideId = null;
}

function logCompletion() {
  const guide = GUIDES.find((item) => item.id === window.currentGuideId);
  if (!guide) return;

  appState.completed.unshift({
    id: crypto.randomUUID(),
    guide: guide.name,
    date: new Date().toISOString(),
    co2Avoided: guide.co2Avoided
  });

  appState.co2Avoided += guide.co2Avoided;
  saveState();
  renderStats();
  renderLog();
  closeGuide();
  showAlert('Repair logged. Nice work!');
}

function renderStats() {
  document.getElementById('guideCount').textContent = GUIDES.length;
  document.getElementById('completedCount').textContent = appState.completed.length;
  document.getElementById('reuseIdeas').textContent = GUIDES.reduce((sum, guide) => sum + guide.reuse.length, 0);
  document.getElementById('co2Avoided').textContent = appState.co2Avoided.toFixed(1);
  document.getElementById('guidesCompleted').textContent = appState.completed.length;
}

function renderTips() {
  const grid = document.getElementById('tipsGrid');
  grid.innerHTML = TIPS.map((tip) => `
    <div class="tip-card">
      <h3><i class="fas ${tip.icon}"></i> ${tip.title}</h3>
      <p>${tip.description}</p>
    </div>
  `).join('');
}

function renderLog() {
  const log = document.getElementById('repairLog');
  if (appState.completed.length === 0) {
    log.innerHTML = '<p class="log-meta">No repairs logged yet.</p>';
    return;
  }

  log.innerHTML = appState.completed.slice(0, 6).map((entry) => `
    <div class="log-item">
      <div>
        <strong>${entry.guide}</strong>
        <div class="log-meta">${formatDateTime(entry.date)}</div>
      </div>
      <div class="log-meta">CO2 avoided</div>
      <span class="log-badge">${entry.co2Avoided.toFixed(1)} kg</span>
    </div>
  `).join('');
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function showAlert(message) {
  const banner = document.getElementById('alertBanner');
  document.getElementById('alertMessage').textContent = message;
  banner.classList.remove('hidden');
  setTimeout(closeAlert, 3000);
}

function closeAlert() {
  document.getElementById('alertBanner').classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', initApp);
