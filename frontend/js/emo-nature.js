        AOS.init({duration:800,once:true});

        // sample journal entries
        const entries = [
            { date:"10 may 2026", title:"morning dew", mood:"calm", preview:"The garden sparkled...", full:"Every leaf held a tiny mirror. I felt gentle.", icon:"fa-feather", emotion:"peace" },
            { date:"8 may 2026", title:"thunderstorm", mood:"awe", preview:"Power of sky...", full:"Thunder shook the house, but I felt alive. Rain washed the dust.", icon:"fa-cloud-rain", emotion:"awe" },
            { date:"5 may 2026", title:"wildflower hill", mood:"joy", preview:"Ran through flowers...", full:"So many colors! I laughed like a child.", icon:"fa-seedling", emotion:"joy" },
            { date:"2 may 2026", title:"sunset alone", mood:"melancholy", preview:"Orange sky, quiet...", full:"Missing someone, but the sunset held me.", icon:"fa-sun", emotion:"sadness" },
            { date:"28 apr 2026", title:"bird nest", mood:"hope", preview:"Found a nest...", full:"Tiny eggs, fragile life. Felt protective and hopeful.", icon:"fa-dove", emotion:"hope" }
        ];

        function renderEntries() {
            const grid = document.getElementById('journalGrid');
            grid.innerHTML = entries.map(e => `
                <div class="entry-card" onclick="showEntry('${e.title}','${e.date}','${e.full}')">
                    <div class="card-image"><i class="fas ${e.icon}"></i><span class="card-emotion">${e.emotion}</span></div>
                    <div class="card-content">
                        <div class="card-date">${e.date}</div>
                        <div class="card-title">${e.title}</div>
                        <p class="card-preview">${e.preview}</p>
                        <div class="card-footer">
                            <span class="feeling"><i class="far fa-smile"></i> ${e.mood}</span>
                            <button class="read-btn" onclick="event.stopPropagation(); showEntry('${e.title}','${e.date}','${e.full}')">read</button>
                        </div>
                    </div>
                </div>`).join('');
        }
        renderEntries();

        window.showEntry = (title, date, full) => {
            document.getElementById('modalJournalTitle').innerText = title;
            document.getElementById('modalJournalDate').innerText = date;
            document.getElementById('modalJournalEntry').innerText = full;
            document.getElementById('journalModal').classList.add('active');
        };

        window.closeModal = () => document.getElementById('journalModal').classList.remove('active');
        window.openNewEntry = () => { alert('📝 new journal page · describe your feelings in nature.'); };
        window.editEntry = () => { alert('✏️ you can now edit this entry (demo).'); };

        // back to top
        const topBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', ()=> { window.scrollY>500 ? topBtn.classList.add('visible') : topBtn.classList.remove('visible'); });
        topBtn.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});

        // modal escape
        document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal(); });
        window.onclick = (e) => { if(e.target===document.getElementById('journalModal')) closeModal(); };