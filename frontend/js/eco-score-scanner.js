// Eco-Score Product Database & Scanner - Sample Data & UI Logic

document.addEventListener('DOMContentLoaded', function () {
    // Sample product data
    const products = [
        { name: 'Organic Apple', brand: 'GreenFarm', category: 'Groceries', score: 'A', desc: 'Low impact, organic, local' },
        { name: 'Shampoo', brand: 'EcoCare', category: 'Personal Care', score: 'B', desc: 'Biodegradable, recyclable bottle' },
        { name: 'Plastic Bottle', brand: 'QuickDrink', category: 'Beverages', score: 'D', desc: 'Single-use plastic, avoid if possible' },
        { name: 'Almond Milk', brand: 'NutriLife', category: 'Groceries', score: 'B', desc: 'Plant-based, moderate water use' }
    ];

    // Scan form logic
    document.getElementById('scanForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.getElementById('scanInput').value.trim().toLowerCase();
        const result = products.find(p => p.name.toLowerCase().includes(input) || p.brand.toLowerCase().includes(input));
        const scanResult = document.getElementById('scanResult');
        if (result) {
            scanResult.innerHTML = `<div class="result-card">
                <div class="result-title">${result.name}</div>
                <div class="result-brand">${result.brand}</div>
                <div class="result-category">${result.category}</div>
                <div class="result-score score-${result.score.toLowerCase()}">Eco-Score: ${result.score}</div>
                <div class="result-desc">${result.desc}</div>
            </div>`;
        } else {
            scanResult.innerHTML = '<div class="result-card">No product found. Try another name or barcode.</div>';
        }
    });
});
