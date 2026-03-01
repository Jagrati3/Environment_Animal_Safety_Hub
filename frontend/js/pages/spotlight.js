        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Species data for different months
        const speciesData = {
            current: {
                name: "Amur Leopard",
                scientific: "Panthera pardus orientalis",
                population: "100+",
                status: "Critically Endangered",
                range: "Russia/China",
                description: "The Amur leopard is one of the rarest big cats on Earth...",
                threats: ["Poaching", "Habitat Loss", "Inbreeding", "Road Kill"],
                conservation: ["Protected Areas", "Breeding Programs", "Community Engagement"]
            },
            vaquita: {
                name: "Vaquita",
                scientific: "Phocoena sinus",
                population: "10-15",
                status: "Critically Endangered",
                range: "Gulf of California, Mexico",
                description: "The vaquita is the world's rarest marine mammal...",
                threats: ["Gillnet Fishing", "Illegal Totoaba Trade"],
                conservation: ["Gillnet Ban", "Enforcement Patrols"]
            },
            rhino: {
                name: "Javan Rhino",
                scientific: "Rhinoceros sondaicus",
                population: "76",
                status: "Critically Endangered",
                range: "Ujung Kulon, Indonesia",
                description: "The Javan rhino is one of the rarest large mammals...",
                threats: ["Poaching", "Natural Disasters", "Disease"],
                conservation: ["Protected Park", "Habitat Management"]
            },
            orangutan: {
                name: "Orangutan",
                scientific: "Pongo pygmaeus",
                population: "104,700",
                status: "Endangered",
                range: "Borneo, Sumatra",
                description: "Orangutans are great apes sharing 97% DNA with humans...",
                threats: ["Deforestation", "Palm Oil", "Poaching"],
                conservation: ["Habitat Protection", "Rehabilitation Centers"]
            }
        };

        // Share page
        function sharePage() {
            if (navigator.share) {
                navigator.share({
                    title: 'Amur Leopard - Species in Spotlight',
                    text: 'Learn about this critically endangered species and how to help!',
                    url: window.location.href
                }).catch(() => {
                    alert('📋 Link copied to clipboard! Share with friends!');
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('📋 Link copied to clipboard! Share with friends!');
            }
        }

        // Load previous species
        function loadSpecies(species) {
            const data = speciesData[species];
            if (data) {
                alert(`📖 Loading ${data.name} spotlight... (Feature coming soon!)`);
                // In a real implementation, this would reload the page with new data
                // window.location.href = `?species=${species}`;
            }
        }

        // Newsletter subscription
        function subscribeNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            if (email && email.includes('@')) {
                alert(`✅ Thank you for subscribing! You'll receive monthly species updates at ${email}`);
                document.getElementById('newsletterEmail').value = '';
            } else {
                alert('❌ Please enter a valid email address');
            }
        }

        // Back to top
        const backToTop = document.getElementById('backToTop');
        
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

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Gallery item click
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const caption = this.querySelector('.gallery-caption').textContent;
                alert(`🖼️ Gallery: ${caption}\n(Full image gallery coming soon!)`);
            });
        });

        // Initialize newsletter input animation
        const newsletterInput = document.querySelector('.newsletter-input');
        if (newsletterInput) {
            newsletterInput.addEventListener('focus', () => {
                newsletterInput.style.transform = 'scale(1.02)';
            });
            newsletterInput.addEventListener('blur', () => {
                newsletterInput.style.transform = 'scale(1)';
            });
        }

        console.log('Species Spotlight page loaded! Current species: Amur Leopard');