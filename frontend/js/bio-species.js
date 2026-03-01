        AOS.init({duration:800,once:true});

        // species data
        const species = [
            { name:"Amur Leopard", scientific:"Panthera pardus orientalis", class:"mammals", habitat:"Russian Far East", population:"~100", iucn:"CR", icon:"fa-paw" },
            { name:"Vaquita", scientific:"Phocoena sinus", class:"marine", habitat:"Gulf of California", population:"<10", iucn:"CR", icon:"fa-fish" },
            { name:"Hawaiian Crow", scientific:"Corvus hawaiiensis", class:"birds", habitat:"Hawaii", population:"~20", iucn:"CR", icon:"fa-dove" },
            { name:"Northern White Rhino", scientific:"Ceratotherium simum cottoni", class:"mammals", habitat:"Africa", population:"2", iucn:"CR", icon:"fa-paw" },
            { name:"Monarch Butterfly", scientific:"Danaus plexippus", class:"insects", habitat:"North America", population:"declining", iucn:"VU", icon:"fa-butterfly" },
            { name:"Hawksbill Turtle", scientific:"Eretmochelys imbricata", class:"reptiles", habitat:"Tropical reefs", population:"~8,000 nesting females", iucn:"CR", icon:"fa-turtle" },
            { name:"Saola", scientific:"Pseudoryx nghetinhensis", class:"mammals", habitat:"Annamite Mountains", population:"unknown", iucn:"CR", icon:"fa-paw" },
            { name:"Gharial", scientific:"Gavialis gangeticus", class:"reptiles", habitat:"Indian rivers", population:"~650", iucn:"CR", icon:"fa-lizard" },
        ];

        function renderSpecies() {
            const grid = document.getElementById('speciesGrid');
            grid.innerHTML = species.map(s => `
                <div class="species-card" onclick="showSpecies('${s.name}','${s.scientific} · ${s.habitat} · IUCN ${s.iucn} · pop: ${s.population}','${s.icon}')">
                    <div class="card-image"><i class="fas ${s.icon}"></i><span class="iucn-tag">${s.iucn}</span></div>
                    <div class="card-content">
                        <span class="card-class">${s.class}</span>
                        <div class="card-title">${s.name}</div>
                        <div class="card-scientific">${s.scientific}</div>
                        <div class="card-habitat"><i class="fas fa-tree"></i> ${s.habitat}</div>
                        <div class="card-footer">
                            <span class="population">${s.population}</span>
                            <button class="watch-btn" onclick="event.stopPropagation(); watchSpecies('${s.name}')">watch</button>
                        </div>
                    </div>
                </div>`).join('');
        }
        renderSpecies();

        window.showSpecies = (title, desc, icon) => {
            document.getElementById('modalSpeciesTitle').innerText = title;
            document.getElementById('modalSpeciesDesc').innerText = desc;
            document.getElementById('modalSpeciesEmoji').innerHTML = `<i class="fas ${icon}"></i>`;
            document.getElementById('speciesModal').classList.add('active');
        };

        window.closeModal = () => document.getElementById('speciesModal').classList.remove('active');
        window.trackSpecies = (name) => alert(`🔍 tracking ${name || 'species'} ... updates will be sent.`);
        window.watchSpecies = (name) => alert(`👁️ adding ${name} to your watchlist.`);
        window.supportSpecies = () => { alert('📚 learn more about conservation efforts.'); closeModal(); };

        // back to top
        const topBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', ()=> { window.scrollY>500 ? topBtn.classList.add('visible') : topBtn.classList.remove('visible'); });
        topBtn.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});

        // modal escape
        document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal(); });
        window.onclick = (e) => { if(e.target===document.getElementById('speciesModal')) closeModal(); };