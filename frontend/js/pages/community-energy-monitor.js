const ENERGY_STORAGE = {
  CAMPAIGNS: "communityEnergyCampaigns",
  INSIGHTS: "communityEnergyInsights"
};

const sampleDemand = [120, 135, 150, 142, 160, 188, 205, 210, 198, 184, 170, 155];
const sampleZones = {
  Downtown: 28,
  Riverside: 22,
  Uptown: 18,
  Midtown: 17,
  Lakeside: 15
};

const renewableMix = {
  Solar: 42,
  Wind: 28,
  Hydro: 18,
  Battery: 12
};

const adoptionProgress = [
  { label: "Solar rooftops", value: 68, target: 80, note: "120 homes remaining" },
  { label: "Heat pump upgrades", value: 52, target: 70, note: "18 community rebates" },
  { label: "Smart meters", value: 74, target: 85, note: "12% pending installs" },
  { label: "EV-ready homes", value: 46, target: 65, note: "Focus on Westside" }
];

let demandChart;
let zoneChart;
let renewableChart;

function init() {
  setupTabs();
  setupButtons();
  renderCharts();
  renderInsights();
  renderAdoptionProgress();
  renderCampaigns();
  updateSummary();
}

function setupTabs() {
  document.querySelectorAll(".tab-link").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-link").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function setupButtons() {
  document.getElementById("loadSampleBtn").addEventListener("click", () => {
    showToast("Sample energy data loaded!");
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    showToast("Report exported successfully!");
  });

  document.getElementById("campaignForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const campaign = {
      title: document.getElementById("campaignTitle").value,
      goal: document.getElementById("campaignGoal").value,
      date: document.getElementById("campaignDate").value,
      notes: document.getElementById("campaignNotes").value,
      progress: 0
    };

    const campaigns = getCampaigns();
    campaigns.unshift(campaign);
    localStorage.setItem(ENERGY_STORAGE.CAMPAIGNS, JSON.stringify(campaigns));
    renderCampaigns();
    e.target.reset();
    showToast("Campaign launched!");
  });
}

function renderCharts() {
  const demandCtx = document.getElementById("demandChart");
  demandChart = new Chart(demandCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Demand (MW)",
        data: sampleDemand,
        borderColor: "#1d4ed8",
        backgroundColor: "rgba(29, 78, 216, 0.12)",
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  const zoneCtx = document.getElementById("zoneChart");
  zoneChart = new Chart(zoneCtx, {
    type: "bar",
    data: {
      labels: Object.keys(sampleZones),
      datasets: [{
        label: "Usage %",
        data: Object.values(sampleZones),
        backgroundColor: ["#1d4ed8", "#0ea5e9", "#22c55e", "#f59e0b", "#64748b"],
        borderRadius: 8
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  const renewableCtx = document.getElementById("renewableChart");
  renewableChart = new Chart(renewableCtx, {
    type: "doughnut",
    data: {
      labels: Object.keys(renewableMix),
      datasets: [{
        data: Object.values(renewableMix),
        backgroundColor: ["#22c55e", "#38bdf8", "#0ea5e9", "#94a3b8"]
      }]
    },
    options: {
      plugins: { legend: { position: "bottom" } }
    }
  });
}

function renderInsights() {
  const insights = [
    "Peak demand shifted 30 minutes later vs last month.",
    "Riverside reduced evening load by 8% after campaign.",
    "Solar adoption is strongest in Midtown (+6%).",
    "EV charging events scheduled to avoid peak times."
  ];

  const list = insights.map(text => `
    <div class="insight-item">
      <strong>${text}</strong>
    </div>
  `).join("");

  document.getElementById("insightsList").innerHTML = list;
}

function renderAdoptionProgress() {
  const html = adoptionProgress.map(item => `
    <div class="progress-item">
      <div>
        <strong>${item.label}</strong>
        <p>${item.note}</p>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${item.value}%;"></div>
      </div>
      <small>${item.value}% of ${item.target}% target</small>
    </div>
  `).join("");

  document.getElementById("adoptionProgress").innerHTML = html;
}

function getCampaigns() {
  const stored = localStorage.getItem(ENERGY_STORAGE.CAMPAIGNS);
  if (stored) return JSON.parse(stored);
  return [
    {
      title: "Evening Peak Reduction",
      goal: 35,
      date: "2026-02-05",
      notes: "Focus on HVAC and EV charging shifts.",
      progress: 62
    },
    {
      title: "Community Solar Week",
      goal: 18,
      date: "2026-02-12",
      notes: "Neighborhood solar info booths and incentives.",
      progress: 38
    }
  ];
}

function renderCampaigns() {
  const campaigns = getCampaigns();
  const html = campaigns.map(item => `
    <div class="campaign-card">
      <header>
        <div>
          <h4>${item.title}</h4>
          <p>Start: ${item.date}</p>
        </div>
        <span class="pill info">Goal ${item.goal} MWh</span>
      </header>
      <p>${item.notes}</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${item.progress}%;"></div>
      </div>
      <small>${item.progress}% complete</small>
    </div>
  `).join("");

  document.getElementById("campaignList").innerHTML = html;
}

function updateSummary() {
  document.getElementById("currentDemand").textContent = "210 MW";
  document.getElementById("renewableAdoption").textContent = "64%";
  document.getElementById("participatingHomes").textContent = "1,284";
  document.getElementById("weeklySavings").textContent = "38.6 MWh";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

document.addEventListener("DOMContentLoaded", init);
