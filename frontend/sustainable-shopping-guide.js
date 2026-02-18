// Demo sustainable products, brands, and stores
const shoppingData = [
  {
    id: 1,
    title: "Eco Bamboo Toothbrush",
    category: "products",
    rating: 4.7,
    labels: ["Organic", "Recycled"],
    description: "Biodegradable bamboo toothbrush with recycled packaging.",
    brand: "GreenSmile",
    store: "EcoMart"
  },
  {
    id: 2,
    title: "GreenSmile",
    category: "brands",
    rating: 4.5,
    labels: ["Fair Trade", "Organic"],
    description: "Brand specializing in sustainable oral care products.",
    store: "EcoMart"
  },
  {
    id: 3,
    title: "EcoMart",
    category: "stores",
    rating: 4.8,
    labels: ["Energy Star", "FSC"],
    description: "Store offering a wide range of eco-friendly products.",
    brand: "GreenSmile"
  },
  {
    id: 4,
    title: "Reusable Grocery Bag",
    category: "products",
    rating: 4.9,
    labels: ["Recycled", "Fair Trade"],
    description: "Durable grocery bag made from recycled materials.",
    brand: "EcoCarry",
    store: "EcoMart"
  },
  {
    id: 5,
    title: "EcoCarry",
    category: "brands",
    rating: 4.6,
    labels: ["Organic"],
    description: "Brand focused on sustainable bags and accessories.",
    store: "EcoMart"
  }
];

let bookmarks = [];

function renderShoppingList(data) {
  const list = document.getElementById('shoppingList');
  list.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'shopping-card';
    card.innerHTML = `
      <div class="card-title">${item.title}</div>
      <div class="card-category">${capitalize(item.category)}</div>
      <div class="card-rating">${renderStars(item.rating)} <span style="color:#888;font-size:0.95rem;">${item.rating.toFixed(1)}</span></div>
      <div class="card-labels">${item.labels.map(l => `<span>${l}</span>`).join('')}</div>
      <div class="card-desc">${item.description}</div>
      <div class="card-actions">
        <button class="bookmark-btn${bookmarks.includes(item.id) ? ' bookmarked' : ''}" title="Bookmark" onclick="toggleBookmark(${item.id})">
          <i class="fa${bookmarks.includes(item.id) ? 's' : 'r'} fa-bookmark"></i>
        </button>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa${i <= Math.round(rating) ? 's' : 'r'} fa-star" style="color:#43cea2"></i>`;
  }
  return stars;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterShoppingList() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  let filtered = shoppingData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search) || (item.brand && item.brand.toLowerCase().includes(search)) || (item.store && item.store.toLowerCase().includes(search));
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });
  renderShoppingList(filtered);
}

document.getElementById('searchInput').addEventListener('input', filterShoppingList);
document.getElementById('categoryFilter').addEventListener('change', filterShoppingList);

function toggleBookmark(id) {
  if (bookmarks.includes(id)) {
    bookmarks = bookmarks.filter(b => b !== id);
  } else {
    bookmarks.push(id);
  }
  filterShoppingList();
  renderBookmarks();
}

function renderBookmarks() {
  const bookmarkList = document.getElementById('bookmarkList');
  bookmarkList.innerHTML = '';
  bookmarks.forEach(id => {
    const item = shoppingData.find(i => i.id === id);
    if (item) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.title} <span style="color:#43cea2;font-size:0.9rem;">(${capitalize(item.category)})</span></span>
        <button class="remove-btn" title="Remove bookmark" onclick="toggleBookmark(${item.id})"><i class="fa fa-times"></i></button>
      `;
      bookmarkList.appendChild(li);
    }
  });
}

// Initial render
renderShoppingList(shoppingData);
renderBookmarks();