const STORAGE_KEYS = {
  COMMUTE_PLAN: "greenCommutePlan",
  WEEKLY_SAVINGS: "greenWeeklySavings"
};

const EMISSIONS = {
  car: 0.271,
  carpool: 0.135,
  transit: 0.089,
  ev: 0.05,
  bike: 0,
  walk: 0
};

const sampleRoutes = [
  {
    id: 1,
    name: "Metro + Walk",
    mode: "transit",
    duration: 32,
    distance: 12.5,
    cost: 3.2,
    emissions: 1.1,
    steps: ["Walk 0.6 km", "Metro Line 2", "Walk 0.3 km"]
  },
  {
    id: 2,
    name: "Bike Share Express",
    mode: "bike",
    duration: 28,
    distance: 10.8,
    cost: 1.5,
    emissions: 0,
    steps: ["Pick bike", "Protected lane", "Dock at Station 24"]
  },
  {
    id: 3,
    name: "Carpool Lane",
    mode: "carpool",
    duration: 25,
    distance: 12.5,
    cost: 2.8,
    emissions: 1.7,
    steps: ["Pickup at Elm St.", "Carpool lane", "Drop-off near office"]
  },
  {
    id: 4,
    name: "EV Direct",
    mode: "ev",
    duration: 22,
    distance: 12.5,
    cost: 4.5,
    emissions: 0.6,
    steps: ["Charge at Home", "Drive via Greenway"]
  },
  {
    id: 5,
    name: "Transit + Bike",
    mode: "transit",
    duration: 30,
    distance: 12.5,
    cost: 3.5,
    emissions: 0.9,
    steps: ["Walk 0.2 km", "Bus 15", "Bike share 1.5 km"]
  }
];

const weeklySamples = [
  { day: "Mon", saved: 2.4 },
  { day: "Tue", saved: 2.9 },
  { day: "Wed", saved: 2.1 },
  { day: "Thu", saved: 3.2 },
  { day: "Fri", saved: 2.6 },
  { day: "Sat", saved: 1.4 },
  { day: "Sun", saved: 0.9 }
];

let savingsChart;

function init() {
  setupTabs();
  setupForm();
  setupButtons();
  renderRoutes();
  renderSavings();
  hydratePlan();
  updateHeroStats();
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

function setupForm() {
  const form = document.getElementById("commuteForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const plan = collectPlan();
    const metrics = calculatePlan(plan);
    updateSummary(metrics);
    savePlan(plan, metrics);
    showToast("Commute plan updated!");
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    form.reset();
    updateSummary({ weeklyEmissions: 0, weeklySavings: 0, monthlySavings: 0, timeDiff: 0 });
  });
}

function setupButtons() {
  document.getElementById("loadSampleBtn").addEventListener("click", () => {
    const plan = {
      origin: "Downtown",
      destination: "Eco Hub",
      distance: 12.5,
      trips: 10,
      mode: "transit",
      cost: 3.2
    };
    populateForm(plan);
    const metrics = calculatePlan(plan);
    updateSummary(metrics);
    savePlan(plan, metrics);
    showToast("Sample commute loaded!");
  });

  document.getElementById("savePlanBtn").addEventListener("click", () => {
    const plan = collectPlan();
    const metrics = calculatePlan(plan);
    savePlan(plan, metrics);
    showToast("Plan saved to your profile!");
  });

  document.getElementById("routeFilter").addEventListener("change", renderRoutes);
  document.getElementById("routeSort").addEventListener("change", renderRoutes);
  document.getElementById("refreshBikeBtn").addEventListener("click", () => {
    showToast("Bike stations refreshed!");
  });

  document.getElementById("joinChallengeBtn").addEventListener("click", () => {
    showToast("Challenge joined. Good luck!");
  });
}

function collectPlan() {
  return {
    origin: document.getElementById("origin").value,
    destination: document.getElementById("destination").value,
    distance: parseFloat(document.getElementById("distance").value || "0"),
    trips: parseInt(document.getElementById("trips").value || "0", 10),
    mode: document.getElementById("mode").value,
    cost: parseFloat(document.getElementById("cost").value || "0")
  };
}

function populateForm(plan) {
  document.getElementById("origin").value = plan.origin || "";
  document.getElementById("destination").value = plan.destination || "";
  document.getElementById("distance").value = plan.distance || "";
  document.getElementById("trips").value = plan.trips || "";
  document.getElementById("mode").value = plan.mode || "transit";
  document.getElementById("cost").value = plan.cost || "";
}

function calculatePlan(plan) {
  const weeklyEmissions = (EMISSIONS[plan.mode] || 0) * plan.distance * plan.trips;
  const carEmissions = EMISSIONS.car * plan.distance * plan.trips;
  const weeklySavings = Math.max(carEmissions - weeklyEmissions, 0);
  const monthlySavings = weeklySavings * 4;
  const timeDiff = plan.mode === "bike" ? -6 : plan.mode === "transit" ? 4 : -2;

  return { weeklyEmissions, weeklySavings, monthlySavings, timeDiff };
}

function updateSummary(metrics) {
  document.getElementById("weeklyEmissions").textContent = `${metrics.weeklyEmissions.toFixed(1)} kg CO₂`;
  document.getElementById("savingsVsCar").textContent = `${metrics.weeklySavings.toFixed(1)} kg CO₂`;
  document.getElementById("monthlySavings").textContent = `${metrics.monthlySavings.toFixed(1)} kg CO₂`;
  document.getElementById("timeDifference").textContent = `${metrics.timeDiff > 0 ? "+" : ""}${metrics.timeDiff} min`;

  const insight = metrics.weeklySavings > 5
    ? "Great choice! You are cutting significant emissions weekly."
    : "Try mixing in transit or bike days to increase savings.";
  document.getElementById("insightText").textContent = insight;
  document.getElementById("weeklySavings").textContent = `${metrics.weeklySavings.toFixed(1)} kg CO₂`;
}

function savePlan(plan, metrics) {
  localStorage.setItem(STORAGE_KEYS.COMMUTE_PLAN, JSON.stringify({ plan, metrics }));
}

function hydratePlan() {
  const saved = localStorage.getItem(STORAGE_KEYS.COMMUTE_PLAN);
  if (!saved) return;
  const { plan, metrics } = JSON.parse(saved);
  populateForm(plan);
  updateSummary(metrics);
}

function renderRoutes() {
  const filter = document.getElementById("routeFilter").value;
  const sort = document.getElementById("routeSort").value;

  let routes = [...sampleRoutes];

  if (filter !== "all") {
    routes = routes.filter(route => route.mode === filter);
  }

  routes.sort((a, b) => {
    if (sort === "time") return a.duration - b.duration;
    if (sort === "cost") return a.cost - b.cost;
    return a.emissions - b.emissions;
  });

  const bestRoute = routes[0] || sampleRoutes[0];
  document.getElementById("recommendedRoute").textContent = bestRoute ? bestRoute.name : "—";

  const cards = routes.map(route => `
    <div class="route-card ${route.id === bestRoute?.id ? "highlight" : ""}">
      <h4>${route.name}</h4>
      <div class="route-meta">
        <span><i class="fa-solid fa-clock"></i> ${route.duration} min</span>
        <span><i class="fa-solid fa-coins"></i> $${route.cost.toFixed(1)}</span>
      </div>
      <div class="route-meta">
        <span><i class="fa-solid fa-smog"></i> ${route.emissions.toFixed(1)} kg CO₂</span>
        <span><i class="fa-solid fa-road"></i> ${route.distance} km</span>
      </div>
      <div class="route-tags">
        ${route.steps.map(step => `<span class="tag">${step}</span>`).join("")}
      </div>
    </div>
  `).join("");

  document.getElementById("routeCards").innerHTML = cards;

  const comparisonRows = routes.map(route => `
    <div class="comparison-row">
      <span>${route.name}</span>
      <span>${route.duration} min</span>
      <span>$${route.cost.toFixed(1)}</span>
      <span>${route.emissions.toFixed(1)} kg</span>
    </div>
  `).join("");

  document.getElementById("comparisonRows").innerHTML = comparisonRows;
}

function renderSavings() {
  const ctx = document.getElementById("savingsChart");
  if (!ctx) return;

  if (savingsChart) {
    savingsChart.destroy();
  }

  savingsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: weeklySamples.map(item => item.day),
      datasets: [
        {
          label: "CO₂ Saved (kg)",
          data: weeklySamples.map(item => item.saved),
          borderColor: "#0f766e",
          backgroundColor: "rgba(15, 118, 110, 0.12)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#0f766e"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  renderBreakdown();
}

function renderBreakdown() {
  const breakdown = [
    { label: "Transit trips", value: "8 trips", impact: "-5.6 kg" },
    { label: "Bike share", value: "3 trips", impact: "-2.1 kg" },
    { label: "Carpool", value: "2 trips", impact: "-1.2 kg" },
    { label: "Walking", value: "1 trip", impact: "-0.6 kg" }
  ];

  const list = breakdown.map(item => `
    <div class="breakdown-item">
      <div>
        <strong>${item.label}</strong>
        <p>${item.value}</p>
      </div>
      <span class="pill success">${item.impact}</span>
    </div>
  `).join("");

  document.getElementById("savingsBreakdown").innerHTML = list;
}

function updateHeroStats() {
  document.getElementById("weeklySavings").textContent = "12.4 kg CO₂";
  document.getElementById("activeCommutes").textContent = "14";
  document.getElementById("communityRank").textContent = "#42";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

document.addEventListener("DOMContentLoaded", init);
