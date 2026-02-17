// Sustainable Shopping Guide JS
// Handles product display, ratings, and tips

document.addEventListener('DOMContentLoaded', function() {
  // --- Products ---
  const products = [
    { title: 'Reusable Water Bottle', rating: '★★★★★', desc: 'Reduces single-use plastic waste.' },
    { title: 'Organic Cotton Tote', rating: '★★★★☆', desc: 'Eco-friendly alternative to plastic bags.' },
    { title: 'Bamboo Toothbrush', rating: '★★★★★', desc: 'Biodegradable and sustainable material.' },
    { title: 'Refillable Cleaning Spray', rating: '★★★★☆', desc: 'Minimizes packaging waste.' },
    { title: 'Solar Charger', rating: '★★★★☆', desc: 'Harnesses renewable energy for devices.' },
    { title: 'Compostable Food Wrap', rating: '★★★☆☆', desc: 'Breaks down naturally, replaces plastic wrap.' }
  ];
  const productGrid = document.getElementById('productGrid');
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<div class="product-title">${p.title}</div><div class="product-rating">${p.rating}</div><div class="product-desc">${p.desc}</div>`;
    productGrid.appendChild(card);
  });

  // --- Tips ---
  const tips = [
    'Choose products with minimal or recyclable packaging.',
    'Buy in bulk to reduce packaging waste.',
    'Support brands with transparent sustainability practices.',
    'Opt for reusable items over single-use products.',
    'Check for eco-certifications and ratings.',
    'Repair and reuse before replacing.'
  ];
  const tipsList = document.getElementById('tipsList');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });
});
