        AOS.init({duration:800,once:true});

        // ---------- leaflet map ----------
        const map = L.map('map').setView([40.7128, -74.0060], 12); // NYC demo

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // sample planting markers
        const plantings = [
            { lat: 40.78, lng: -73.97, name: "Central Park", trees: 120 },
            { lat: 40.69, lng: -73.99, name: "Brooklyn Bridge Park", trees: 85 },
            { lat: 40.85, lng: -73.93, name: "Highbridge Park", trees: 200 },
            { lat: 40.73, lng: -74.03, name: "Liberty State Park", trees: 60 },
        ];

        plantings.forEach(p => {
            L.marker([p.lat, p.lng]).addTo(map)
                .bindPopup(`<b>${p.name}</b><br>🌱 ${p.trees} trees planned`);
        });

        // ---------- upcoming events data ----------
        const events = [
            { name:"Riverside Planting", date:"May 25, 9am", location:"East River Park", trees:150, icon:"fa-tree" },
            { name:"School Grove", date:"May 28, 10am", location:"PS 123", trees:80, icon:"fa-school" },
            { name:"Urban Forest", date:"June 2, 8am", location:"Queens", trees:300, icon:"fa-city" },
            { name:"Community Garden", date:"June 5, 9am", location:"Brooklyn", trees:40, icon:"fa-seedling" },
            { name:"Park Restoration", date:"June 8, 9am", location:"The Bronx", trees:220, icon:"fa-tree" },
        ];

        // render event list in sidebar
        function renderEventList() {
            const container = document.getElementById('eventList');
            container.innerHTML = events.slice(0,3).map(e => `
                <div class="event-item" onclick="showEvent('${e.name}','${e.date} at ${e.location} · planting ${e.trees} trees')">
                    <i class="fas ${e.icon}"></i> ${e.name} · ${e.date}
                </div>`).join('');
        }

        // render events grid
        function renderEventsGrid() {
            const grid = document.getElementById('eventsGrid');
            grid.innerHTML = events.map(e => `
                <div class="event-card" onclick="showEvent('${e.name}','${e.date} · ${e.location} · ${e.trees} native trees to plant')">
                    <div class="event-image"><i class="fas ${e.icon}"></i></div>
                    <div class="event-content">
                        <span class="event-date">${e.date}</span>
                        <div class="event-title">${e.name}</div>
                        <div><i class="fas fa-map-pin"></i> ${e.location}</div>
                        <div style="margin-top:0.8rem;">🌲 ${e.trees} trees</div>
                    </div>
                </div>`).join('');
        }

        window.showEvent = (title, desc) => {
            document.getElementById('modalEventTitle').innerText = title;
            document.getElementById('modalEventDesc').innerText = desc;
            document.getElementById('plantModal').classList.add('active');
        };

        window.closeModal = () => document.getElementById('plantModal').classList.remove('active');
        window.joinCommunity = () => alert('🌍 thank you for joining! you’ll receive updates about local plantings.');
        window.rsvpEvent = () => { alert('✅ you’re registered! see you there.'); closeModal(); };

        // back to top
        const topBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', ()=> { window.scrollY>500 ? topBtn.classList.add('visible') : topBtn.classList.remove('visible'); });
        topBtn.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});

        // modal escape
        document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal(); });
        window.onclick = (e) => { if(e.target===document.getElementById('plantModal')) closeModal(); };

        // initial render
        renderEventList();
        renderEventsGrid();