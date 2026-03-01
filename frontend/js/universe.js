        AOS.init({duration:900, once:true});

        const connections = [
            { name:"Milky Way & Forest", element:"stardust", desc:"Trees glow with galactic dust. fireflies mimic stars.", icon:"fa-tree", const:"serpens" },
            { name:"Tides & Moon", element:"water", desc:"Ocean cycles follow lunar phases — nature's pulse.", icon:"fa-water", const:"cancer" },
            { name:"Aurora & Moss", element:"light", desc:"Northern lights reflect in bioluminescent moss.", icon:"fa-star", const:"aurora" },
            { name:"Sun & Sunflower", element:"fire", desc:"Heliotropism — flowers track the sun across the sky.", icon:"fa-sun", const:"leo" },
            { name:"Bird migration & Stars", element:"air", desc:"Birds navigate using celestial cues.", icon:"fa-dove", const:"cygnus" },
            { name:"Stone & Meteorite", element:"earth", desc:"Meteorites carry stories of both sky and ground.", icon:"fa-meteor", const:"orion" }
        ];

        function renderCosmic() {
            const grid = document.getElementById('cosmicGrid');
            grid.innerHTML = connections.map(c => `
                <div class="cosmic-card" onclick="showCosmic('${c.name}','${c.desc} · element: ${c.element} · constellation: ${c.const}')">
                    <div class="card-image"><i class="fas ${c.icon}"></i><span class="constellation">${c.const}</span></div>
                    <div class="card-content">
                        <span class="element-tag">${c.element}</span>
                        <div class="card-title">${c.name}</div>
                        <p class="card-desc">${c.desc}</p>
                        <div class="card-footer">
                            <span class="wonder"><i class="fas fa-sparkles"></i> wonder</span>
                            <button class="connect-btn" onclick="event.stopPropagation(); feel('${c.name}')">connect</button>
                        </div>
                    </div>
                </div>`).join('');
        }
        renderCosmic();

        window.showCosmic = (title, desc) => {
            document.getElementById('modalCosmicTitle').innerText = title;
            document.getElementById('modalCosmicDesc').innerText = desc;
            document.getElementById('cosmicModal').classList.add('active');
        };

        window.closeModal = () => document.getElementById('cosmicModal').classList.remove('active');
        window.exploreCosmic = () => { alert('🌌 journey through the cosmic tree · feel the unity.'); };
        window.feelConnection = () => { alert('✨ you are connected to the universe and nature.'); closeModal(); };
        window.feel = (name) => { alert('✨ connecting to ' + name + ' ... feel the resonance.'); };

        // back to top
        const topBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', ()=> { window.scrollY>500 ? topBtn.classList.add('visible') : topBtn.classList.remove('visible'); });
        topBtn.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});

        // modal escape
        document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal(); });
        window.onclick = (e) => { if(e.target===document.getElementById('cosmicModal')) closeModal(); };