// Sustainable Living Tips Library JS
// Searchable library of practical tips

const tips = [
    {
        category: "energy",
        tip: "Switch to LED light bulbs to reduce electricity consumption."
    },
    {
        category: "energy",
        tip: "Unplug devices when not in use to avoid phantom energy drain."
    },
    {
        category: "energy",
        tip: "Install solar panels to generate clean energy at home."
    },
    {
        category: "energy",
        tip: "Use a programmable thermostat to optimize heating and cooling."
    },
    {
        category: "energy",
        tip: "Wash clothes in cold water to save energy."
    },
    {
        category: "waste",
        tip: "Compost food scraps to reduce landfill waste and enrich soil."
    },
    {
        category: "waste",
        tip: "Use reusable shopping bags instead of single-use plastic bags."
    },
    {
        category: "waste",
        tip: "Choose products with minimal packaging."
    },
    {
        category: "waste",
        tip: "Donate unwanted items instead of throwing them away."
    },
    {
        category: "waste",
        tip: "Repair broken items before replacing them."
    },
    {
        category: "water",
        tip: "Fix leaky faucets and pipes to save water."
    },
    {
        category: "water",
        tip: "Take shorter showers to conserve water."
    },
    {
        category: "water",
        tip: "Collect rainwater for garden use."
    },
    {
        category: "water",
        tip: "Install low-flow showerheads and toilets."
    },
    {
        category: "water",
        tip: "Turn off the tap while brushing your teeth."
    },
    {
        category: "shopping",
        tip: "Buy products with minimal packaging and recyclable materials."
    },
    {
        category: "shopping",
        tip: "Support local and sustainable brands for eco-friendly shopping."
    },
    {
        category: "shopping",
        tip: "Choose organic and fair-trade products."
    },
    {
        category: "shopping",
        tip: "Bring your own containers for bulk purchases."
    },
    {
        category: "shopping",
        tip: "Avoid fast fashion; buy quality clothes that last."
    },
    // Add more tips for robust sample data...
];

function renderTips(list) {
    const container = document.getElementById('tips-list');
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<li>No tips found.</li>';
        return;
    }
    list.forEach(t => {
        const li = document.createElement('li');
        li.className = 'tip-card';
        li.innerHTML = `<span class="tip-icon">🌱</span> <span class="tip-text">${t.tip}</span> <span class="tip-category">(${t.category.charAt(0).toUpperCase() + t.category.slice(1)})</span>`;
        container.appendChild(li);
    });
}

function filterTips() {
    const search = document.getElementById('tips-search').value.toLowerCase();
    const category = document.getElementById('tips-category').value;
    let filtered = tips.filter(t =>
        (category === 'all' || t.category === category) &&
        t.tip.toLowerCase().includes(search)
    );
    renderTips(filtered);
}

document.getElementById('tips-search').addEventListener('input', filterTips);
document.getElementById('tips-category').addEventListener('change', filterTips);

// Initial render
renderTips(tips);
