        AOS.init({duration:900,once:true});

        const insights = [
            { title:"smart thermostat", category:"home", impact:"high", desc:"AI schedule reduces HVAC run 22%", co2:"-0.8t", icon:"fa-thermometer-half" },
            { title:"EV charging optimizer", category:"mobility", impact:"high", desc:"shift to off-peak, solar match", co2:"-1.1t", icon:"fa-car" },
            { title:"plant-forward meals", category:"diet", impact:"medium", desc:"replace 3 meat meals/week", co2:"-0.5t", icon:"fa-carrot" },
            { title:"LED + smart plugs", category:"home", impact:"medium", desc:"cut standby & lighting 15%", co2:"-0.3t", icon:"fa-lightbulb" },
            { title:"bike/transit shift", category:"mobility", impact:"high", desc:"15 car-free days/month", co2:"-1.4t", icon:"fa-bicycle" },
            { title:"solar panel sizing", category:"renewable", impact:"high", desc:"rooftop potential 6.2kW", co2:"-3.2t", icon:"fa-sun" }
        ];

        function renderCards() {
            const grid = document.getElementById('advisorGrid');
            grid.innerHTML = insights.map(i => `
                <div class="advisor-card" onclick="showAdvice('${i.title}','${i.desc} · estimated ${i.co2} CO₂e/year · impact: ${i.impact}')">
                    <div class="card-image"><i class="fas ${i.icon}"></i><span class="confidence">AI confidence ${Math.floor(85+Math.random()*10)}%</span></div>
                    <div class="card-content">
                        <span class="card-category">${i.category}</span>
                        <div class="card-title">${i.title}</div>
                        <p class="card-desc">${i.desc}</p>
                        <div class="card-footer">
                            <span class="impact"><i class="fas fa-leaf"></i> ${i.co2}</span>
                            <button class="advise-btn" onclick="event.stopPropagation(); showAdvice('${i.title}','${i.desc} · ${i.co2} CO₂e/year · impact: ${i.impact}')">advise me</button>
                        </div>
                    </div>
                </div>`).join('');
        }
        renderCards();

        window.showAdvice = (title, desc) => {
            document.getElementById('modalAdviceTitle').innerText = title;
            document.getElementById('modalAdviceText').innerText = desc;
            document.getElementById('adviseModal').classList.add('active');
        };
        window.closeModal = () => document.getElementById('adviseModal').classList.remove('active');
        window.advise = () => { alert('🤖 AI advisor: recommendation applied (simulated). your dashboard updates.'); };
        window.applyAdvice = () => { alert('✅ green action recorded! +5 impact points.'); closeModal(); };

        // back to top
        const topBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', ()=> { window.scrollY>500 ? topBtn.classList.add('visible') : topBtn.classList.remove('visible'); });
        topBtn.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});

        // escape modal
        document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal(); });
        window.onclick = (e) => { if(e.target===document.getElementById('adviseModal')) closeModal(); };