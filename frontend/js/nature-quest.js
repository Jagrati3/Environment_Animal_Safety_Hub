        AOS.init({duration:800,once:true});

        const adventures = [
            { name:"Misty Pine Traverse", difficulty:"moderate", days:5, loc:"Sierra Nevada", desc:"Ancient forest, hot springs, elk.", price:"$299", icon:"fa-tree", type:"backpacking" },
            { name:"Canyon Dawn", difficulty:"strenuous", days:3, loc:"Zion region", desc:"Slot canyons, sandstone cliffs, camp under stars.", price:"$189", icon:"fa-mountain", type:"hiking" },
            { name:"River Paddle", difficulty:"easy", days:2, loc:"Boundary Waters", desc:"Canoe, loons, camp on islands.", price:"$149", icon:"fa-water", type:"canoe" },
            { name:"Wildflower Ridge", difficulty:"easy", days:1, loc:"Blue Ridge", desc:"Wildflower meadows, picnic, easy hike.", price:"$79", icon:"fa-feather", type:"day hike" },
            { name:"Glacier Outlook", difficulty:"strenuous", days:6, loc:"North Cascades", desc:"Glacier views, ice axe training, alpine lakes.", price:"$499", icon:"fa-snowflake", type:"mountaineering" },
            { name:"Wolf Tracking", difficulty:"moderate", days:4, loc:"Yellowstone", desc:"Learn tracking, wildlife biology, wolf howls.", price:"$359", icon:"fa-paw", type:"wildlife" }
        ];

        function renderQuests() {
            const grid = document.getElementById('questsGrid');
            grid.innerHTML = adventures.map(a => `
                <div class="quest-card" onclick="showQuest('${a.name}','${a.desc} · ${a.loc} · ${a.difficulty}')">
                    <div class="quest-image"><i class="fas ${a.icon}"></i><span class="difficulty">${a.difficulty}</span></div>
                    <div class="quest-content">
                        <span class="quest-type">${a.type}</span>
                        <div class="quest-title">${a.name}</div>
                        <div class="quest-location"><i class="fas fa-map-pin"></i> ${a.loc}</div>
                        <p class="quest-description">${a.desc}</p>
                        <div class="quest-meta">
                            <span class="meta-item"><i class="fas fa-clock"></i> ${a.days} days</span>
                            <span class="meta-item"><i class="fas fa-signal"></i> ${a.difficulty}</span>
                        </div>
                        <div class="quest-footer">
                            <span class="quest-price">${a.price} <small>/person</small></span>
                            <button class="join-btn" onclick="embark(event, '${a.name}')"><i class="fas fa-binoculars"></i> join</button>
                        </div>
                    </div>
                </div>`).join('');
        }
        renderQuests();

        window.showQuest = (name,desc) => {
            document.getElementById('modalQuestName').innerText = name;
            document.getElementById('modalQuestDesc').innerText = desc;
            document.getElementById('questModal').classList.add('active');
        };
        window.closeModal = () => document.getElementById('questModal').classList.remove('active');
        window.embark = (e, name) => {
            if(e) e.stopPropagation();
            alert(`🌲 ready to embark on ${name || 'the quest'}! check your email for trail notes.`);
        };

        // back to top
        const topBtn = document.getElementById('backToTop');
        window.addEventListener('scroll',()=> { window.scrollY>500 ? topBtn.classList.add('visible') : topBtn.classList.remove('visible'); });
        topBtn.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});

        // escape
        document.addEventListener('keydown',(e)=> { if(e.key==='Escape') closeModal(); });
        window.onclick = (e) => { if(e.target===document.getElementById('questModal')) closeModal(); };