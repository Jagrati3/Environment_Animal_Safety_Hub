// Eco-Chef Application Logic
class EcoChef {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleRecipes();
        this.loadShoppingList();
        this.updateImpactStats();
    }

    setupEventListeners() {
        // Recipe Finder
        const findRecipesBtn = document.getElementById('findRecipesBtn');
        if (findRecipesBtn) {
            findRecipesBtn.addEventListener('click', () => this.findRecipes());
        }

        // Shopping List Controls
        const clearListBtn = document.getElementById('clearListBtn');
        if (clearListBtn) {
            clearListBtn.addEventListener('click', () => this.clearShoppingList());
        }

        const printListBtn = document.getElementById('printListBtn');
        if (printListBtn) {
            printListBtn.addEventListener('click', () => this.printShoppingList());
        }

        const saveListBtn = document.getElementById('saveListBtn');
        if (saveListBtn) {
            saveListBtn.addEventListener('click', () => this.saveShoppingList());
        }

        // Shopping List Item Check
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.closest('.shopping-item')) {
                this.updateItemStatus(e.target);
            }
        });

        // Seasonal Item Hover Effects
        const seasonalItems = document.querySelectorAll('.seasonal-item');
        seasonalItems.forEach(item => {
            item.addEventListener('mouseenter', this.showBenefitTooltip);
            item.addEventListener('mouseleave', this.hideBenefitTooltip);
        });
    }

    findRecipes() {
        const ingredientsInput = document.getElementById('fridgeIngredients');
        const diet = document.getElementById('dietPreference').value;
        const maxTime = document.getElementById('cookingTime').value;
        
        if (!ingredientsInput.value.trim()) {
            this.showMessage('Please enter at least one ingredient', 'warning');
            return;
        }

        // Show loading
        const loadingEl = document.getElementById('recipeLoading');
        const resultsEl = document.getElementById('recipeResults');
        loadingEl.style.display = 'block';
        resultsEl.innerHTML = '';

        // Simulate API call
        setTimeout(() => {
            loadingEl.style.display = 'none';
            this.displayRecipes(this.getRecipes(ingredientsInput.value, diet, maxTime));
            this.updateShoppingList(ingredientsInput.value);
        }, 1500);
    }

    getRecipes(ingredients, diet, maxTime) {
        // Sample recipe database
        const recipes = [
            {
                id: 1,
                name: 'Veggie Stir Fry',
                description: 'Quick and colorful vegetable stir fry with tofu and sesame sauce.',
                ingredients: ['Tomato', 'Spinach', 'Bell Pepper', 'Tofu'],
                time: 25,
                diet: 'vegan',
                carbonFootprint: 'low',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
            },
            {
                id: 2,
                name: 'Seasonal Soup',
                description: 'Hearty soup made with autumn vegetables and lentils.',
                ingredients: ['Pumpkin', 'Carrot', 'Lentils', 'Kale'],
                time: 40,
                diet: 'vegan',
                carbonFootprint: 'low',
                image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w-400&h=300&fit=crop'
            },
            {
                id: 3,
                name: 'Rice Bowl',
                description: 'Nutritious bowl with rice, beans, and sautéed vegetables.',
                ingredients: ['Rice', 'Black Beans', 'Corn', 'Avocado'],
                time: 30,
                diet: 'vegetarian',
                carbonFootprint: 'low',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
            },
            {
                id: 4,
                name: 'Pasta Primavera',
                description: 'Fresh pasta with seasonal vegetables in light tomato sauce.',
                ingredients: ['Pasta', 'Tomato', 'Zucchini', 'Mushrooms'],
                time: 35,
                diet: 'vegetarian',
                carbonFootprint: 'medium',
                image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop'
            }
        ];

        // Filter recipes based on input
        const searchIngredients = ingredients.toLowerCase().split(',').map(i => i.trim());
        
        return recipes.filter(recipe => {
            // Check if recipe matches search ingredients
            const matchesIngredients = searchIngredients.some(searchIng => 
                recipe.ingredients.some(recipeIng => 
                    recipeIng.toLowerCase().includes(searchIng.toLowerCase())
                )
            );
            
            // Check diet preference
            const matchesDiet = diet === 'any' || recipe.diet === diet;
            
            // Check cooking time
            const matchesTime = maxTime === 'any' || recipe.time <= parseInt(maxTime);
            
            return matchesIngredients && matchesDiet && matchesTime;
        });
    }

    displayRecipes(recipes) {
        const resultsEl = document.getElementById('recipeResults');
        
        if (recipes.length === 0) {
            resultsEl.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No recipes found</h3>
                    <p>Try different ingredients or adjust your filters</p>
                </div>
            `;
            return;
        }

        resultsEl.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <div class="recipe-image" style="background-image: url('${recipe.image}')">
                    <div class="carbon-badge ${recipe.carbonFootprint}">
                        ${recipe.carbonFootprint} carbon
                    </div>
                </div>
                <div class="recipe-content">
                    <h4>${recipe.name}</h4>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
                        <span><i class="fas fa-leaf"></i> ${recipe.diet}</span>
                    </div>
                    <p class="recipe-description">${recipe.description}</p>
                    <button class="btn btn-primary btn-small add-to-list" data-recipe-id="${recipe.id}">
                        <i class="fas fa-plus"></i> Add to Shopping List
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to add buttons
        document.querySelectorAll('.add-to-list').forEach(button => {
            button.addEventListener('click', (e) => {
                const recipeId = e.target.closest('button').dataset.recipeId;
                this.addRecipeToShoppingList(recipeId);
            });
        });
    }

    updateShoppingList(ingredients) {
        // Parse ingredients and add to shopping list
        const items = ingredients.split(',').map(item => item.trim()).filter(item => item);
        
        items.forEach(item => {
            if (!this.isItemInList(item)) {
                this.addShoppingItem(item, 'Produce', '1 item');
            }
        });
    }

    addRecipeToShoppingList(recipeId) {
        // Get recipe details and add ingredients to shopping list
        const recipes = this.getRecipes('', 'any', 'any');
        const recipe = recipes.find(r => r.id == recipeId);
        
        if (recipe) {
            recipe.ingredients.forEach(ingredient => {
                if (!this.isItemInList(ingredient)) {
                    this.addShoppingItem(ingredient, 'Produce', 'As needed');
                }
            });
            
            this.showMessage(`${recipe.name} added to shopping list!`, 'success');
            this.updateImpactStats();
        }
    }

    addShoppingItem(name, category, quantity) {
        const listContainer = document.querySelector(`.aisle-section h4:contains('${category}')`)?.parentNode?.querySelector('.shopping-items');
        
        if (!listContainer) {
            // Create new category if it doesn't exist
            this.createAisleCategory(category);
            listContainer = document.querySelector(`.aisle-section h4:contains('${category}')`)?.parentNode?.querySelector('.shopping-items');
        }

        const itemHtml = `
            <div class="shopping-item">
                <input type="checkbox" id="item-${Date.now()}">
                <label for="item-${Date.now()}">${name}</label>
                <span class="item-quantity">${quantity}</span>
            </div>
        `;
        
        listContainer.insertAdjacentHTML('beforeend', itemHtml);
        this.saveShoppingList();
        this.updateListSummary();
    }

    createAisleCategory(category) {
        const container = document.querySelector('#shoppingListItems');
        const categoryHtml = `
            <div class="aisle-section">
                <h4><i class="fas fa-shopping-cart"></i> ${category}</h4>
                <div class="shopping-items"></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', categoryHtml);
    }

    isItemInList(itemName) {
        const items = document.querySelectorAll('.shopping-item label');
        return Array.from(items).some(label => 
            label.textContent.toLowerCase().includes(itemName.toLowerCase())
        );
    }

    updateItemStatus(checkbox) {
        const item = checkbox.closest('.shopping-item');
        if (checkbox.checked) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
        this.saveShoppingList();
    }

    clearShoppingList() {
        if (confirm('Are you sure you want to clear your shopping list?')) {
            document.querySelectorAll('.shopping-items').forEach(container => {
                container.innerHTML = '';
            });
            this.saveShoppingList();
            this.updateListSummary();
            this.showMessage('Shopping list cleared', 'info');
        }
    }

    printShoppingList() {
        window.print();
    }

    saveShoppingList() {
        const items = [];
        document.querySelectorAll('.shopping-item').forEach(item => {
            const label = item.querySelector('label').textContent;
            const quantity = item.querySelector('.item-quantity')?.textContent || '';
            const checked = item.querySelector('input').checked;
            
            items.push({ label, quantity, checked });
        });
        
        localStorage.setItem('ecoChefShoppingList', JSON.stringify(items));
    }

    loadShoppingList() {
        const saved = localStorage.getItem('ecoChefShoppingList');
        if (saved) {
            const items = JSON.parse(saved);
            items.forEach(item => {
                this.addShoppingItem(item.label, 'Produce', item.quantity);
                if (item.checked) {
                    // Mark as checked
                    const lastItem = document.querySelector('.shopping-item:last-child input');
                    if (lastItem) {
                        lastItem.checked = true;
                        lastItem.closest('.shopping-item').classList.add('checked');
                    }
                }
            });
        }
    }

    updateListSummary() {
        const itemCount = document.querySelectorAll('.shopping-item').length;
        const co2Saved = itemCount * 0.5; // Example calculation
        
        document.getElementById('itemCount').textContent = itemCount;
        document.getElementById('co2Saved').textContent = `${co2Saved.toFixed(1)} kg`;
    }

    updateImpactStats() {
        // Calculate impact based on shopping list and recipes
        const itemCount = document.querySelectorAll('.shopping-item').length;
        
        const co2Reduced = itemCount * 0.5;
        const wastePrevented = itemCount * 0.3;
        const waterSaved = itemCount * 50;
        
        document.getElementById('co2Reduced').textContent = `${co2Reduced.toFixed(1)} kg`;
        document.getElementById('wastePrevented').textContent = `${wastePrevented.toFixed(1)} kg`;
        document.getElementById('waterSaved').textContent = `${waterSaved} L`;
    }

    loadSampleRecipes() {
        // Preload some seasonal recipes
        const resultsEl = document.getElementById('recipeResults');
        if (resultsEl && resultsEl.children.length === 0) {
            resultsEl.innerHTML = `
                <div class="sample-recipes">
                    <h3>Try these seasonal favorites:</h3>
                    <div class="sample-grid">
                        <div class="sample-recipe">
                            <i class="fas fa-apple-alt"></i>
                            <span>Apple & Cinnamon Oats</span>
                        </div>
                        <div class="sample-recipe">
                            <i class="fas fa-pumpkin"></i>
                            <span>Roasted Pumpkin Soup</span>
                        </div>
                        <div class="sample-recipe">
                            <i class="fas fa-leaf"></i>
                            <span>Kale & Quinoa Salad</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    showMessage(text, type = 'info') {
        // Create and show a notification
        const message = document.createElement('div');
        message.className = `notification notification-${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${text}</span>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            message.classList.add('fade-out');
            setTimeout(() => message.remove(), 300);
        }, 3000);
        
        // Close button
        message.querySelector('.close-notification').addEventListener('click', () => message.remove());
    }

    showBenefitTooltip(e) {
        // Tooltip is shown via CSS
    }

    hideBenefitTooltip(e) {
        // Tooltip is hidden via CSS
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EcoChef();
});