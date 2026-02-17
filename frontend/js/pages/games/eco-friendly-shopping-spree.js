// Eco-Friendly Shopping Spree Game Logic

class EcoShoppingGame {
    constructor() {
        this.ecoScore = 0;
        this.cart = [];
        this.level = 'Beginner';
        this.badges = [];
        this.items = [
            {
                id: 1,
                name: 'Reusable Shopping Bag',
                emoji: '🛍️',
                description: 'Durable cloth bag that can be used hundreds of times',
                ecoScore: 10,
                isEco: true,
                tip: 'Reusable bags reduce plastic waste and last for years!'
            },
            {
                id: 2,
                name: 'Plastic Shopping Bag',
                emoji: '🛒',
                description: 'Single-use plastic bag',
                ecoScore: -5,
                isEco: false,
                tip: 'Plastic bags contribute to pollution and take hundreds of years to decompose.'
            },
            {
                id: 3,
                name: 'Organic Apples',
                emoji: '🍎',
                description: 'Locally grown organic fruit',
                ecoScore: 8,
                isEco: true,
                tip: 'Organic farming reduces chemical pollution and supports local farmers!'
            },
            {
                id: 4,
                name: 'Imported Bananas',
                emoji: '🍌',
                description: 'Bananas shipped from far away',
                ecoScore: -3,
                isEco: false,
                tip: 'Food miles contribute to carbon emissions. Choose local when possible!'
            },
            {
                id: 5,
                name: 'Bamboo Toothbrush',
                emoji: '🪥',
                description: 'Biodegradable bamboo toothbrush',
                ecoScore: 12,
                isEco: true,
                tip: 'Bamboo is renewable and biodegradable, unlike plastic toothbrushes!'
            },
            {
                id: 6,
                name: 'Plastic Toothbrush',
                emoji: '🧽',
                description: 'Standard plastic toothbrush',
                ecoScore: -4,
                isEco: false,
                tip: 'Plastic toothbrushes contribute to microplastic pollution in oceans.'
            },
            {
                id: 7,
                name: 'Glass Water Bottle',
                emoji: '🫧',
                description: 'Reusable glass bottle',
                ecoScore: 9,
                isEco: true,
                tip: 'Glass is recyclable and doesn\'t leach chemicals like plastic bottles!'
            },
            {
                id: 8,
                name: 'Plastic Water Bottle',
                emoji: '🥤',
                description: 'Single-use plastic bottle',
                ecoScore: -6,
                isEco: false,
                tip: 'Plastic bottles create massive waste and can harm wildlife.'
            },
            {
                id: 9,
                name: 'Cotton T-Shirt',
                emoji: '👕',
                description: 'Organic cotton t-shirt',
                ecoScore: 7,
                isEco: true,
                tip: 'Organic cotton uses less water and no harmful pesticides!'
            },
            {
                id: 10,
                name: 'Synthetic T-Shirt',
                emoji: '🧵',
                description: 'Polyester t-shirt',
                ecoScore: -2,
                isEco: false,
                tip: 'Synthetic fabrics release microplastics when washed.'
            },
            {
                id: 11,
                name: 'Compostable Plates',
                emoji: '🍽️',
                description: 'Biodegradable dinnerware',
                ecoScore: 11,
                isEco: true,
                tip: 'Compostable items break down naturally and enrich soil!'
            },
            {
                id: 12,
                name: 'Plastic Plates',
                emoji: '🥡',
                description: 'Disposable plastic plates',
                ecoScore: -7,
                isEco: false,
                tip: 'Plastic plates contribute to landfill waste for centuries.'
            }
        ];

        this.init();
    }

    init() {
        this.renderItems();
        this.updateUI();
        this.bindEvents();
    }

    renderItems() {
        const itemsGrid = document.getElementById('itemsGrid');
        itemsGrid.innerHTML = '';

        this.items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <div class="item-indicator ${item.isEco ? 'eco' : 'non-eco'}">
                    ${item.isEco ? '✓' : '✗'}
                </div>
                <div class="item-emoji">${item.emoji}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
            `;
            itemsGrid.appendChild(itemCard);
        });
    }

    bindEvents() {
        document.getElementById('itemsGrid').addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const itemId = parseInt(e.target.dataset.id);
                this.addToCart(itemId);
            }
        });

        document.getElementById('cartItems').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const itemId = parseInt(e.target.dataset.id);
                this.removeFromCart(itemId);
            }
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addToCart(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            this.cart.push(item);
            this.updateUI();
            this.playSound('addToCartSound');

            // Show tip for non-eco items
            if (!item.isEco) {
                this.showTip(item.tip);
            }
        }
    }

    removeFromCart(itemId) {
        const index = this.cart.findIndex(item => item.id === itemId);
        if (index > -1) {
            this.cart.splice(index, 1);
            this.updateUI();
        }
    }

    updateUI() {
        // Update stats
        this.ecoScore = this.cart.reduce((sum, item) => sum + item.ecoScore, 0);
        document.getElementById('ecoScore').textContent = this.ecoScore;
        document.getElementById('cartCount').textContent = this.cart.length;
        document.getElementById('totalScore').textContent = this.ecoScore;

        // Update level
        this.updateLevel();
        document.getElementById('level').textContent = this.level;

        // Update cart display
        const cartItems = document.getElementById('cartItems');
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Start shopping!</p>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div>
                        <span class="cart-item-name">${item.emoji} ${item.name}</span>
                        <span class="cart-item-score">${item.ecoScore > 0 ? '+' : ''}${item.ecoScore}</span>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">×</button>
                </div>
            `).join('');
        }

        // Enable/disable checkout button
        document.getElementById('checkoutBtn').disabled = this.cart.length === 0;

        // Update badges
        this.updateBadges();
    }

    updateLevel() {
        if (this.ecoScore >= 50) {
            this.level = 'Eco Champion';
        } else if (this.ecoScore >= 30) {
            this.level = 'Green Shopper';
        } else if (this.ecoScore >= 10) {
            this.level = 'Eco Beginner';
        } else {
            this.level = 'Beginner';
        }
    }

    updateBadges() {
        this.badges = [];

        if (this.ecoScore >= 10) {
            this.badges.push({ name: 'First Steps', emoji: '👶', description: 'Made your first eco-friendly choice!' });
        }
        if (this.ecoScore >= 30) {
            this.badges.push({ name: 'Green Shopper', emoji: '🛒', description: 'Consistently choosing eco-friendly options!' });
        }
        if (this.ecoScore >= 50) {
            this.badges.push({ name: 'Eco Champion', emoji: '🏆', description: 'Master of sustainable shopping!' });
        }
        if (this.cart.filter(item => item.isEco).length >= 5) {
            this.badges.push({ name: 'Bulk Eco', emoji: '📦', description: 'Bought 5+ eco-friendly items!' });
        }

        const badgesSection = document.getElementById('badgesSection');
        const badgesContainer = document.getElementById('badges');

        if (this.badges.length > 0) {
            badgesSection.style.display = 'block';
            badgesContainer.innerHTML = this.badges.map(badge => `
                <div class="badge">
                    <span>${badge.emoji}</span>
                    <span>${badge.name}</span>
                </div>
            `).join('');
        } else {
            badgesSection.style.display = 'none';
        }
    }

    showTip(tipText) {
        document.getElementById('tipText').textContent = tipText;
        document.getElementById('tipsSection').style.display = 'block';
        setTimeout(() => {
            document.getElementById('tipsSection').style.display = 'none';
        }, 5000);
    }

    checkout() {
        this.playSound('checkoutSound');

        let modalText = `Great job! Your eco-score is ${this.ecoScore}.\n\n`;

        if (this.ecoScore > 0) {
            modalText += 'You\'re making positive choices for the planet! 🌍\n\n';
        } else if (this.ecoScore < 0) {
            modalText += 'Consider choosing more eco-friendly options next time. Every choice matters! ♻️\n\n';
        } else {
            modalText += 'You balanced your choices well! Keep learning about sustainable options. 🌱\n\n';
        }

        modalText += 'Remember: Small changes in shopping habits can make a big difference for our environment!';

        document.getElementById('modalText').textContent = modalText;
        document.getElementById('tipModal').classList.add('active');
    }

    playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // Ignore errors if audio can't play
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EcoShoppingGame();
});

// Modal close function
function closeModal() {
    document.getElementById('tipModal').classList.remove('active');
}
