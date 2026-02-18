// sustainable-shopping-guide.js
// Demo data for eco-friendly products
const products = [
    { name: "Bamboo Toothbrush", brand: "EcoBrush", category: "Personal Care", rating: 5, desc: "Biodegradable handle, FSC certified, vegan bristles." },
    { name: "Reusable Water Bottle", brand: "GreenSip", category: "Kitchen", rating: 4, desc: "BPA-free, stainless steel, keeps drinks cold/hot." },
    { name: "Organic Cotton T-Shirt", brand: "EarthWear", category: "Clothing", rating: 5, desc: "GOTS certified, fair trade, low-impact dyes." },
    { name: "Solar LED Lamp", brand: "SunLite", category: "Home", rating: 4, desc: "Solar powered, long battery life, Energy Star." },
    { name: "Compostable Trash Bags", brand: "BioBag", category: "Home", rating: 3, desc: "Made from plant starch, fully compostable." },
    { name: "Plant-Based Detergent", brand: "EcoClean", category: "Cleaning", rating: 4, desc: "Cruelty-free, biodegradable, no harsh chemicals." },
    { name: "Recycled Paper Towels", brand: "GreenRoll", category: "Home", rating: 3, desc: "100% recycled, unbleached, plastic-free packaging." },
    { name: "LED Light Bulb", brand: "BrightEco", category: "Home", rating: 5, desc: "Energy Star, long-lasting, low energy use." },
    { name: "Vegan Shampoo Bar", brand: "PureBar", category: "Personal Care", rating: 4, desc: "No plastic, vegan, gentle on hair and scalp." },
    { name: "Organic Tea", brand: "Leafy", category: "Food", rating: 5, desc: "Certified organic, fair trade, compostable bags." }
];

const tips = [
    "Choose products with minimal or compostable packaging.",
    "Look for eco-labels like FSC, GOTS, or Energy Star.",
    "Buy in bulk to reduce packaging waste.",
    "Support local and fair trade brands.",
    "Opt for reusable over single-use items.",
    "Check for cruelty-free and vegan certifications.",
    "Prioritize quality and durability over quantity.",
    "Track your green purchases to see your impact grow!"
];

function renderProducts(filter = "") {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
    products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.brand.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase())).forEach((p, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.name}</td>
            <td>${p.brand}</td>
            <td>${p.category}</td>
            <td>${"★".repeat(p.rating)}${"☆".repeat(5-p.rating)}</td>
            <td>${p.labels.join(", ")}</td>
            <td><button onclick="addToTracker(${i})">Add</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addToTracker(idx) {
    const tracker = JSON.parse(localStorage.getItem("greenTracker") || "[]");
    const product = products[idx];
    const now = new Date().toISOString().split("T")[0];
    tracker.push({ ...product, date: now });
    localStorage.setItem("greenTracker", JSON.stringify(tracker));
    renderTracker();
}

function renderTracker() {
    const tracker = JSON.parse(localStorage.getItem("greenTracker") || "[]");
    const tbody = document.querySelector("#trackerTable tbody");
    tbody.innerHTML = "";
    tracker.forEach((p, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.name}</td>
            <td>${p.brand}</td>
            <td>${p.date}</td>
            <td>${"★".repeat(p.rating)}${"☆".repeat(5-p.rating)}</td>
            <td><button onclick="removeFromTracker(${i})">Remove</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function removeFromTracker(idx) {
    const tracker = JSON.parse(localStorage.getItem("greenTracker") || "[]");
    tracker.splice(idx, 1);
    localStorage.setItem("greenTracker", JSON.stringify(tracker));
    renderTracker();
}

document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
    renderTracker();
    document.getElementById("searchBtn").onclick = function() {
        const filter = document.getElementById("searchInput").value;
        renderProducts(filter);
    };
});

document.addEventListener('DOMContentLoaded', function() {
  const products = [
    { name: "Bamboo Toothbrush", brand: "EcoBrush", category: "Personal Care", rating: 5, desc: "Biodegradable handle, FSC certified, vegan bristles." },
    { name: "Reusable Water Bottle", brand: "GreenSip", category: "Kitchen", rating: 4, desc: "BPA-free, stainless steel, keeps drinks cold/hot." },
    { name: "Organic Cotton T-Shirt", brand: "EarthWear", category: "Clothing", rating: 5, desc: "GOTS certified, fair trade, low-impact dyes." },
    { name: "Solar LED Lamp", brand: "SunLite", category: "Home", rating: 4, desc: "Solar powered, long battery life, Energy Star." },
    { name: "Compostable Trash Bags", brand: "BioBag", category: "Home", rating: 3, desc: "Made from plant starch, fully compostable." },
    { name: "Plant-Based Detergent", brand: "EcoClean", category: "Cleaning", rating: 4, desc: "Cruelty-free, biodegradable, no harsh chemicals." },
    { name: "Recycled Paper Towels", brand: "GreenRoll", category: "Home", rating: 3, desc: "100% recycled, unbleached, plastic-free packaging." },
    { name: "LED Light Bulb", brand: "BrightEco", category: "Home", rating: 5, desc: "Energy Star, long-lasting, low energy use." },
    { name: "Vegan Shampoo Bar", brand: "PureBar", category: "Personal Care", rating: 4, desc: "No plastic, vegan, gentle on hair and scalp." },
    { name: "Organic Tea", brand: "Leafy", category: "Food", rating: 5, desc: "Certified organic, fair trade, compostable bags." }
  ];

  const tips = [
    "Choose products with minimal or compostable packaging.",
    "Look for eco-labels like FSC, GOTS, or Energy Star.",
    "Buy in bulk to reduce packaging waste.",
    "Support local and fair trade brands.",
    "Opt for reusable over single-use items.",
    "Check for cruelty-free and vegan certifications.",
    "Prioritize quality and durability over quantity.",
    "Track your green purchases to see your impact grow!"
  ];

  // Render product cards
  const grid = document.getElementById('productGrid');
  if (grid) {
    grid.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-title">${p.name}</div>
        <div><strong>Brand:</strong> ${p.brand}</div>
        <div><strong>Category:</strong> ${p.category}</div>
        <div class="product-rating">${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}</div>
        <div class="product-desc">${p.desc}</div>
      `;
      grid.appendChild(card);
    });
  }

  // Render tips
  const tipsList = document.getElementById('tipsList');
  if (tipsList) {
    tipsList.innerHTML = '';
    tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }
});
