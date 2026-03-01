        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Tours Data
        const tours = [
            {
                id: 1,
                title: "Amazon Rainforest",
                location: "Brazil/Peru",
                category: "rainforest",
                continent: "south-america",
                duration: "75 min",
                rating: 4.9,
                reviews: 1243,
                price: "$19.99",
                description: "Explore the world's most biodiverse rainforest. Encounter toucans, sloths, monkeys, and pink river dolphins.",
                guide: "Dr. Sarah Chen",
                language: "English/Spanish",
                viewers: 234,
                icon: "fa-tree"
            },
            {
                id: 2,
                title: "Great Barrier Reef",
                location: "Australia",
                category: "coral",
                continent: "australia",
                duration: "60 min",
                rating: 4.8,
                reviews: 987,
                price: "$17.99",
                description: "Snorkel the world's largest coral reef system. See sea turtles, colorful fish, and vibrant corals.",
                guide: "James O'Malley",
                language: "English",
                viewers: 156,
                icon: "fa-fish"
            },
            {
                id: 3,
                title: "Sahara Desert",
                location: "Morocco",
                category: "desert",
                continent: "africa",
                duration: "45 min",
                rating: 4.7,
                reviews: 654,
                price: "$14.99",
                description: "Experience the vast Sahara. Ride camels, camp under stars, and meet Berber communities.",
                guide: "Ahmed Hassan",
                language: "English/Arabic",
                viewers: 89,
                icon: "fa-sun"
            },
            {
                id: 4,
                title: "Himalayan Trek",
                location: "Nepal/Tibet",
                category: "mountains",
                continent: "asia",
                duration: "90 min",
                rating: 4.9,
                reviews: 876,
                price: "$21.99",
                description: "Trek through the Himalayas. See Everest, visit monasteries, and learn about Sherpa culture.",
                guide: "Tenzing Norgay Jr.",
                language: "English/Nepali",
                viewers: 312,
                icon: "fa-mountain"
            },
            {
                id: 5,
                title: "Arctic Expedition",
                location: "Svalbard, Norway",
                category: "arctic",
                continent: "europe",
                duration: "80 min",
                rating: 4.8,
                reviews: 543,
                price: "$19.99",
                description: "Polar bear spotting, Northern Lights, and ice fjords. Live from the Arctic Circle.",
                guide: "Erik Johansen",
                language: "English/Norwegian",
                viewers: 178,
                icon: "fa-snowflake"
            },
            {
                id: 6,
                title: "Serengeti Safari",
                location: "Tanzania",
                category: "wildlife",
                continent: "africa",
                duration: "70 min",
                rating: 5.0,
                reviews: 1567,
                price: "$22.99",
                description: "Witness the great migration. Lions, elephants, giraffes, and zebras in their natural habitat.",
                guide: "Grace Mbeki",
                language: "English/Swahili",
                viewers: 445,
                icon: "fa-paw"
            },
            {
                id: 7,
                title: "Galapagos Islands",
                location: "Ecuador",
                category: "wildlife",
                continent: "south-america",
                duration: "65 min",
                rating: 4.9,
                reviews: 765,
                price: "$18.99",
                description: "Follow in Darwin's footsteps. Giant tortoises, marine iguanas, and blue-footed boobies.",
                guide: "Dr. Maria Santos",
                language: "English/Spanish",
                viewers: 201,
                icon: "fa-turtle"
            },
            {
                id: 8,
                title: "Northern Lights",
                location: "Tromsø, Norway",
                category: "arctic",
                continent: "europe",
                duration: "50 min",
                rating: 5.0,
                reviews: 2345,
                price: "$16.99",
                description: "Chase the aurora borealis. Learn the science and mythology behind the lights.",
                guide: "Astrid Larsen",
                language: "English",
                viewers: 567,
                icon: "fa-star"
            }
        ];

        // DOM Elements
        const toursGrid = document.getElementById('toursGrid');
        const backToTop = document.getElementById('backToTop');
        const modal = document.getElementById('tourModal');

        // Render tours
        function renderTours() {
            toursGrid.innerHTML = tours.map(tour => `
                <div class="tour-card" onclick="showTourDetails(${tour.id})">
                    <div class="tour-image">
                        <i class="fas ${tour.icon}"></i>
                        <span class="tour-badge">⭐ ${tour.rating}</span>
                        <span class="tour-duration"><i class="fas fa-clock"></i> ${tour.duration}</span>
                    </div>
                    <div class="tour-content">
                        <span class="tour-category">${tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}</span>
                        <h3 class="tour-title">${tour.title}</h3>
                        <div class="tour-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${tour.location}</span>
                        </div>
                        <p class="tour-description">${tour.description}</p>
                        <div class="tour-meta">
                            <span class="tour-meta-item"><i class="fas fa-user"></i> ${tour.guide}</span>
                            <span class="tour-meta-item"><i class="fas fa-users"></i> ${tour.viewers} watching</span>
                        </div>
                        <div class="tour-footer">
                            <span class="tour-price">${tour.price} <small>/person</small></span>
                            <button class="tour-btn" onclick="startTour(${tour.id}, event)">
                                <i class="fas fa-play"></i> Start
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter category
        window.filterCategory = function(category) {
            document.querySelectorAll('.category-pill').forEach(pill => {
                pill.classList.remove('active');
                if (pill.textContent.toLowerCase().includes(category) || 
                    (category === 'all' && pill.textContent.includes('All'))) {
                    pill.classList.add('active');
                }
            });
            
            // Filter logic would go here
            console.log('Filtering by:', category);
        };

        // Show tour details
        window.showTourDetails = function(id) {
            const tour = tours.find(t => t.id === id);
            if (!tour) return;

            document.getElementById('modalTitle').textContent = tour.title;
            document.getElementById('modalSubtitle').textContent = tour.location;
            
            document.getElementById('modalBody').innerHTML = `
                <div style="text-align: center;">
                    <i class="fas ${tour.icon}" style="font-size: 5rem; color: #00695c; margin: 2rem;"></i>
                    <h3 style="color: #004d40; margin-bottom: 1rem;">About This Tour</h3>
                    <p style="color: #666; line-height: 1.8; margin-bottom: 2rem;">${tour.description}</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 2rem 0;">
                        <div style="background: #f5f5f5; padding: 1rem; border-radius: 20px;">
                            <i class="fas fa-user" style="color: #ffd54f;"></i>
                            <h4>Guide</h4>
                            <p>${tour.guide}</p>
                        </div>
                        <div style="background: #f5f5f5; padding: 1rem; border-radius: 20px;">
                            <i class="fas fa-language" style="color: #ffd54f;"></i>
                            <h4>Language</h4>
                            <p>${tour.language}</p>
                        </div>
                        <div style="background: #f5f5f5; padding: 1rem; border-radius: 20px;">
                            <i class="fas fa-clock" style="color: #ffd54f;"></i>
                            <h4>Duration</h4>
                            <p>${tour.duration}</p>
                        </div>
                        <div style="background: #f5f5f5; padding: 1rem; border-radius: 20px;">
                            <i class="fas fa-star" style="color: #ffd54f;"></i>
                            <h4>Rating</h4>
                            <p>${tour.rating} (${tour.reviews} reviews)</p>
                        </div>
                    </div>
                    
                    <button class="featured-btn" style="margin-top: 2rem;" onclick="startTour(${tour.id})">
                        <i class="fas fa-play"></i> Start Virtual Tour Now
                    </button>
                </div>
            `;
            
            modal.classList.add('active');
        };

        // Start tour
        window.startTour = function(id, event) {
            if (event) event.stopPropagation();
            alert(`🎬 Starting virtual tour! (Demo - Full 360° video experience would open here)`);
        };

        // Book tour
        window.bookTour = function() {
            alert('📅 Booking page coming soon! Tours are free during beta testing.');
        };

        // Close modal
        window.closeModal = function() {
            modal.classList.remove('active');
        };

        // Testimonial slider
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slider-dot');

        window.showTestimonial = function(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        };

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        setInterval(nextTestimonial, 5000);

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
            renderTours();
        });