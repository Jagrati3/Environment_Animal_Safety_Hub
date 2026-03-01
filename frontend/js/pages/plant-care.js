
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Plants Data
        const plants = [
            {
                id: 1,
                name: "Snake Plant",
                scientific: "Sansevieria trifasciata",
                category: "indoor",
                difficulty: "easy",
                light: "Low to bright",
                water: "Every 2-3 weeks",
                humidity: "Low",
                soil: "Well-draining",
                petSafe: false,
                description: "Almost impossible to kill! Perfect for beginners.",
                icon: "fa-leaf"
            },
            {
                id: 2,
                name: "Monstera Deliciosa",
                scientific: "Swiss Cheese Plant",
                category: "indoor",
                difficulty: "medium",
                light: "Bright indirect",
                water: "Weekly",
                humidity: "High",
                soil: "Rich, well-draining",
                petSafe: false,
                description: "Famous for its split leaves. A tropical beauty!",
                icon: "fa-leaf"
            },
            {
                id: 3,
                name: "Lavender",
                scientific: "Lavandula angustifolia",
                category: "outdoor",
                difficulty: "easy",
                light: "Full sun",
                water: "Every 1-2 weeks",
                humidity: "Low",
                soil: "Well-draining, sandy",
                petSafe: true,
                description: "Fragrant herb that attracts pollinators.",
                icon: "fa-seedling"
            },
            {
                id: 4,
                name: "Aloe Vera",
                scientific: "Aloe barbadensis",
                category: "succulent",
                difficulty: "easy",
                light: "Bright indirect",
                water: "Every 3 weeks",
                humidity: "Low",
                soil: "Cactus mix",
                petSafe: false,
                description: "Healing gel inside leaves. Great for burns!",
                icon: "fa-leaf"
            },
            {
                id: 5,
                name: "Basil",
                scientific: "Ocimum basilicum",
                category: "herbs",
                difficulty: "easy",
                light: "Full sun",
                water: "Regular",
                humidity: "Medium",
                soil: "Rich, moist",
                petSafe: true,
                description: "Delicious culinary herb. Pinch leaves to encourage growth!",
                icon: "fa-seedling"
            },
            {
                id: 6,
                name: "Tomato",
                scientific: "Solanum lycopersicum",
                category: "vegetables",
                difficulty: "medium",
                light: "Full sun",
                water: "Regular",
                humidity: "Medium",
                soil: "Rich, well-draining",
                petSafe: false,
                description: "Homegrown tomatoes taste amazing! Stake for support.",
                icon: "fa-carrot"
            },
            {
                id: 7,
                name: "Peace Lily",
                scientific: "Spathiphyllum",
                category: "indoor",
                difficulty: "easy",
                light: "Low to medium",
                water: "Weekly",
                humidity: "Medium",
                soil: "Rich, moist",
                petSafe: false,
                description: "Elegant white flowers. Tells you when it needs water by drooping!",
                icon: "fa-leaf"
            },
            {
                id: 8,
                name: "Rosemary",
                scientific: "Salvia rosmarinus",
                category: "herbs",
                difficulty: "easy",
                light: "Full sun",
                water: "Every 1-2 weeks",
                humidity: "Low",
                soil: "Well-draining",
                petSafe: true,
                description: "Fragrant herb for cooking. Drought tolerant once established.",
                icon: "fa-seedling"
            }
        ];

        // Animal Feeding Data
        const animals = [
            {
                name: "Dogs",
                icon: "fa-dog",
                safe: ["Carrots", "Green beans", "Apple slices", "Plain cooked chicken"],
                unsafe: ["Chocolate", "Grapes", "Onions", "Xylitol"],
                warning: "Never feed chocolate, grapes, or onions - they're toxic!"
            },
            {
                name: "Cats",
                icon: "fa-cat",
                safe: ["Cooked fish", "Pumpkin", "Cat grass", "Small meat pieces"],
                unsafe: ["Onions", "Garlic", "Raw dough", "Dairy (in excess)"],
                warning: "Many cats are lactose intolerant - avoid too much milk!"
            },
            {
                name: "Birds",
                icon: "fa-dove",
                safe: ["Fresh fruits", "Leafy greens", "Cooked grains", "Bird pellets"],
                unsafe: ["Avocado", "Chocolate", "Caffeine", "Salty foods"],
                warning: "Avocado is highly toxic to birds!"
            },
            {
                name: "Squirrels",
                icon: "fa-paw",
                safe: ["Unsalted nuts", "Fresh fruits", "Corn", "Sunflower seeds"],
                unsafe: ["Processed foods", "Salty snacks", "Bread"],
                warning: "Avoid feeding too many peanuts - they need variety!"
            },
            {
                name: "Ducks",
                icon: "fa-water",
                safe: ["Frozen peas", "Corn", "Oats", "Lettuce"],
                unsafe: ["Bread", "Popcorn", "Citrus fruits"],
                warning: "Bread fills them up without nutrition - opt for peas instead!"
            },
            {
                name: "Rabbits",
                icon: "fa-paw",
                safe: ["Hay", "Leafy greens", "Carrot tops", "Apple branches"],
                unsafe: ["Lettuce (iceberg)", "Cabbage", "Processed foods"],
                warning: "Fresh hay should make up 80% of their diet!"
            }
        ];

        // Toxic Plants Data
        const toxicPlants = [
            {
                name: "Lilies",
                danger: "Highly toxic to cats",
                symptoms: "Kidney failure, vomiting",
                level: "Critical"
            },
            {
                name: "Sago Palm",
                danger: "All parts toxic to dogs",
                symptoms: "Liver failure, seizures",
                level: "Critical"
            },
            {
                name: "Philodendron",
                danger: "Toxic to cats & dogs",
                symptoms: "Oral irritation, vomiting",
                level: "Moderate"
            },
            {
                name: "Pothos",
                danger: "Toxic to pets",
                symptoms: "Oral irritation, drooling",
                level: "Moderate"
            },
            {
                name: "Aloe Vera",
                danger: "Mildly toxic to dogs",
                symptoms: "Vomiting, diarrhea",
                level: "Mild"
            },
            {
                name: "Dieffenbachia",
                danger: "Toxic to pets",
                symptoms: "Swelling, difficulty swallowing",
                level: "High"
            }
        ];

        // DOM Elements
        const plantsGrid = document.getElementById('plantsGrid');
        const animalGrid = document.getElementById('animalGrid');
        const toxicGrid = document.getElementById('toxicPlants');
        const backToTop = document.getElementById('backToTop');
        const modal = document.getElementById('plantModal');
        const modalContent = document.getElementById('modalContent');

        // Render plants
        function renderPlants(category = 'all') {
            const filtered = category === 'all' 
                ? plants 
                : plants.filter(p => p.category === category);

            plantsGrid.innerHTML = filtered.map(plant => `
                <div class="plant-card" data-aos="fade-up">
                    <div class="plant-header">
                        <i class="fas ${plant.icon}"></i>
                        <span class="difficulty-badge ${plant.difficulty}">${plant.difficulty}</span>
                    </div>
                    <div class="plant-content">
                        <h3 class="plant-title">${plant.name}</h3>
                        <p class="plant-scientific">${plant.scientific}</p>
                        
                        <div class="care-grid">
                            <div class="care-item">
                                <i class="fas fa-sun"></i>
                                <span class="value">${plant.light}</span>
                            </div>
                            <div class="care-item">
                                <i class="fas fa-droplet"></i>
                                <span class="value">${plant.water}</span>
                            </div>
                            <div class="care-item">
                                <i class="fas fa-temperature-high"></i>
                                <span class="value">${plant.humidity}</span>
                            </div>
                        </div>

                        <div class="care-details">
                            <div class="care-detail-item">
                                <i class="fas fa-seedling"></i>
                                <span>Soil: ${plant.soil}</span>
                            </div>
                            <div class="care-detail-item">
                                <i class="fas ${plant.petSafe ? 'fa-check-circle' : 'fa-exclamation-triangle'}" 
                                   style="color: ${plant.petSafe ? '#4caf50' : '#f44336'}"></i>
                                <span>${plant.petSafe ? 'Pet Safe' : 'Toxic to Pets'}</span>
                            </div>
                        </div>

                        <p style="color: #666; margin: 1rem 0;">${plant.description}</p>

                        <button class="care-btn" onclick="showPlantCare(${plant.id})">
                            <i class="fas fa-leaf"></i> Detailed Care Guide
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Render animal feeding guides
        function renderAnimals() {
            animalGrid.innerHTML = animals.map(animal => `
                <div class="animal-card">
                    <div class="animal-icon">
                        <i class="fas ${animal.icon}"></i>
                    </div>
                    <h3 class="animal-name">${animal.name}</h3>
                    
                    <div class="food-list">
                        <h4 style="color: #2d6a4f; margin-bottom: 0.5rem;">✅ Safe Foods</h4>
                        ${animal.safe.map(food => `
                            <div class="food-item yes">
                                <i class="fas fa-check-circle"></i>
                                <span>${food}</span>
                            </div>
                        `).join('')}
                        
                        <h4 style="color: #f44336; margin: 1rem 0 0.5rem;">❌ Unsafe Foods</h4>
                        ${animal.unsafe.map(food => `
                            <div class="food-item no">
                                <i class="fas fa-times-circle"></i>
                                <span>${food}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="warning-box">
                        <i class="fas fa-exclamation-triangle"></i>
                        ${animal.warning}
                    </div>
                </div>
            `).join('');
        }

        // Render toxic plants
        function renderToxicPlants() {
            toxicGrid.innerHTML = toxicPlants.map(plant => `
                <div class="warning-plant">
                    <h4><i class="fas fa-skull-crosswalk"></i> ${plant.name}</h4>
                    <p><strong>Danger:</strong> ${plant.danger}</p>
                    <p><strong>Symptoms:</strong> ${plant.symptoms}</p>
                    <span class="danger-level">${plant.level} Toxicity</span>
                </div>
            `).join('');
        }

        // Filter plants
        window.filterPlants = function(category) {
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.textContent.toLowerCase().includes(category) || 
                    (category === 'all' && tab.textContent.includes('All'))) {
                    tab.classList.add('active');
                }
            });
            renderPlants(category);
        };

        // Show plant care details
        window.showPlantCare = function(id) {
            const plant = plants.find(p => p.id === id);
            if (!plant) return;

            modalContent.innerHTML = `
                <h2 class="modal-title">${plant.name}</h2>
                <p style="color: #666; font-style: italic; margin-bottom: 2rem;">${plant.scientific}</p>
                
                <div class="care-instructions">
                    <div class="instruction-step">
                        <span class="step-number">1</span>
                        <div>
                            <h4 style="color: #2d6a4f;">Light Requirements</h4>
                            <p>Place in ${plant.light.toLowerCase()} light. ${plant.light.includes('Low') ? 'Perfect for rooms with small windows!' : plant.light.includes('Bright') ? 'Near a sunny window is ideal.' : 'Loves being outdoors in the sun.'}</p>
                        </div>
                    </div>
                    
                    <div class="instruction-step">
                        <span class="step-number">2</span>
                        <div>
                            <h4 style="color: #2d6a4f;">Watering Schedule</h4>
                            <p>Water ${plant.water.toLowerCase()}. Always check soil moisture first - if top inch is dry, it's time to water.</p>
                        </div>
                    </div>
                    
                    <div class="instruction-step">
                        <span class="step-number">3</span>
                        <div>
                            <h4 style="color: #2d6a4f;">Soil & Potting</h4>
                            <p>Use ${plant.soil.toLowerCase()} soil. Repot every 1-2 years in spring.</p>
                        </div>
                    </div>
                    
                    <div class="instruction-step">
                        <span class="step-number">4</span>
                        <div>
                            <h4 style="color: #2d6a4f;">Humidity & Temperature</h4>
                            <p>Prefers ${plant.humidity.toLowerCase()} humidity. ${plant.humidity === 'High' ? 'Mist leaves regularly or use a pebble tray.' : 'Normal room humidity is fine.'}</p>
                        </div>
                    </div>
                    
                    <div class="instruction-step">
                        <span class="step-number">5</span>
                        <div>
                            <h4 style="color: #2d6a4f;">Fertilizing</h4>
                            <p>Feed monthly during growing season (spring/summer) with balanced fertilizer. No fertilizer in winter.</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: #fff3cd; border-radius: 30px; padding: 1.5rem; margin-top: 2rem;">
                    <h4 style="color: #856404; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-heart"></i> Pro Tip
                    </h4>
                    <p style="color: #856404;">${plant.description}</p>
                </div>
            `;

            modal.classList.add('active');
        };

        // Close modal
        window.closeModal = function() {
            modal.classList.remove('active');
        };

        // Watering calculator
        function updateWaterCalculator() {
            const plantType = document.getElementById('plantType').value;
            const potSize = document.getElementById('potSize').value;
            const location = document.getElementById('location').value;
            const season = document.getElementById('season').value;
            
            let amount = "1 cup";
            let frequency = "Every 7-10 days";
            let tip = "🌅 Water in the morning for best results";
            
            // Simple logic for demo
            if (plantType === 'succulent') {
                amount = "1/4 cup";
                frequency = "Every 2-3 weeks";
            } else if (plantType === 'tropical') {
                amount = "1-2 cups";
                frequency = "Every 5-7 days";
            }
            
            if (potSize === 'large' || potSize === 'xlarge') {
                amount = "2-3 cups";
            }
            
            if (season === 'summer') {
                frequency = frequency.replace('7-10', '5-7');
            } else if (season === 'winter') {
                frequency = frequency.replace('7-10', '10-14');
            }
            
            document.getElementById('waterAmount').textContent = amount;
            document.getElementById('wateringFrequency').textContent = frequency;
            document.getElementById('wateringTip').textContent = tip;
        }

        // Show seasonal tips
        window.showSeasonalTips = function(season) {
            const tips = {
                spring: "🌸 Spring Care: Time to repot! Remove dead leaves, start fertilizing, and watch for new growth.",
                summer: "☀️ Summer Care: Water more frequently, provide shade during hottest hours, and watch for pests.",
                fall: "🍂 Fall Care: Reduce watering, stop fertilizing, and bring sensitive plants indoors before frost.",
                winter: "❄️ Winter Care: Water sparingly, increase humidity, and keep away from cold drafts."
            };
            
            modalContent.innerHTML = `
                <h2 class="modal-title">${season.charAt(0).toUpperCase() + season.slice(1)} Care Guide</h2>
                <div style="text-align: center; font-size: 4rem; margin: 2rem 0;">
                    ${season === 'spring' ? '🌸' : season === 'summer' ? '☀️' : season === 'fall' ? '🍂' : '❄️'}
                </div>
                <p style="color: #555; line-height: 1.8; font-size: 1.1rem;">${tips[season]}</p>
            `;
            modal.classList.add('active');
        };

        // Show cure for plant problems
        window.showCure = function(problem) {
            const cures = {
                yellow: "💛 Yellow Leaves: Usually overwatering. Let soil dry out completely before next watering. Check drainage holes.",
                brown: "🤎 Brown, Crispy Edges: Increase humidity with a pebble tray or mister. Water more consistently.",
                mildew: "🤍 Powdery Mildew: Improve air circulation. Remove affected leaves. Spray with milk solution (1:10 with water).",
                wilt: "💧 Wilting: Check roots. If mushy and brown, repot in fresh soil and reduce watering. If dry, water thoroughly."
            };
            
            modalContent.innerHTML = `
                <h2 class="modal-title">Plant Doctor Diagnosis</h2>
                <div style="background: #f8f9fa; border-radius: 30px; padding: 2rem;">
                    <p style="color: #555; line-height: 1.8; font-size: 1.1rem;">${cures[problem]}</p>
                </div>
            `;
            modal.classList.add('active');
        };

        // Other modal functions
        window.showPlantingGuide = function() {
            modalContent.innerHTML = `
                <h2 class="modal-title">What to Plant Now</h2>
                <p style="color: #555; margin-bottom: 1rem;">Based on current season and your location, here's what you can plant:</p>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 0.5rem 0;">🌿 Herbs: Basil, Mint, Parsley</li>
                    <li style="padding: 0.5rem 0;">🥬 Vegetables: Lettuce, Spinach, Radishes</li>
                    <li style="padding: 0.5rem 0;">🌸 Flowers: Marigolds, Petunias, Sunflowers</li>
                </ul>
            `;
            modal.classList.add('active');
        };

        window.showReminders = function() {
            alert("⏰ Reminder feature coming soon! You'll be able to set notifications for watering and fertilizing.");
        };

        window.showLayout = function() {
            alert("📐 Garden layout planner coming soon! You'll be able to design your garden online.");
        };

        // Back to top
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Event listeners for calculator
        document.querySelectorAll('#plantType, #potSize, #location, #season').forEach(input => {
            input.addEventListener('change', updateWaterCalculator);
        });

        // Close modal on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderPlants();
            renderAnimals();
            renderToxicPlants();
            updateWaterCalculator();
        });