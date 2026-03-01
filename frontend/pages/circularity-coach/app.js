// Household Circularity Coach
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class Item {
    constructor(name, category, condition, value, repairable, refillable, recyclable, repurposeIdeas) {
        this.name = name;
        this.category = category;
        this.condition = condition;
        this.value = value;
        this.repairable = repairable;
        this.refillable = refillable;
        this.recyclable = recyclable;
        this.repurposeIdeas = repurposeIdeas;
    }
}

class DecisionOption {
    constructor(type, description, impact, cost, link) {
        this.type = type; // Repair, Refill, Borrow, Repurpose, Donate, Resell, Recycle
        this.description = description;
        this.impact = impact; // e.g., 'High', 'Medium', 'Low'
        this.cost = cost; // e.g., 'Save', 'Spend', 'Neutral'
        this.link = link;
    }
}

// ======================
// Section 2: Data Sets
// ======================

const items = [
    new Item('Laptop', 'Electronics', 'Broken screen', 300, true, false, true, ['Turn into digital photo frame', 'Donate for parts']),
    new Item('Plastic Bottle', 'Packaging', 'Empty', 0.5, false, true, true, ['Use as plant pot', 'DIY bird feeder']),
    new Item('T-shirt', 'Clothing', 'Worn', 2, false, false, true, ['Make cleaning rags', 'Tote bag']),
    new Item('Sofa', 'Furniture', 'Stained', 50, true, false, false, ['Outdoor seating', 'Pet bed']),
    new Item('Book', 'Media', 'Good', 5, false, false, true, ['Donate to library', 'Art project']),
    new Item('Glass Jar', 'Packaging', 'Clean', 1, false, true, true, ['Food storage', 'Candle holder']),
    new Item('Shoes', 'Clothing', 'Sole worn', 10, true, false, true, ['Planter', 'Donate to shelter']),
    new Item('Mobile Phone', 'Electronics', 'Old model', 40, true, false, true, ['Emergency phone', 'Sell for parts']),
    new Item('Backpack', 'Accessories', 'Broken zip', 8, true, false, false, ['Tool bag', 'Toy storage']),
    new Item('Mug', 'Kitchenware', 'Chipped', 1, false, false, true, ['Pen holder', 'Succulent planter'])
];

const decisionOptions = [
    new DecisionOption('Repair', 'Fix the item to extend its life.', 'High', 'Save', 'https://repaircafe.org/en/'),
    new DecisionOption('Refill', 'Refill the item to avoid single-use waste.', 'Medium', 'Save', 'https://www.refill.org.uk/'),
    new DecisionOption('Borrow', 'Borrow instead of buying new.', 'High', 'Save', 'https://www.libraryofthings.co.uk/'),
    new DecisionOption('Repurpose', 'Give the item a new use at home.', 'Medium', 'Neutral', 'https://www.upcyclethat.com/'),
    new DecisionOption('Donate', 'Give to someone in need or a charity.', 'Medium', 'Neutral', 'https://www.donategoods.org/'),
    new DecisionOption('Resell', 'Sell to recover value and reduce waste.', 'High', 'Save', 'https://www.ebay.com/'),
    new DecisionOption('Recycle', 'Send for recycling to recover materials.', 'Low', 'Neutral', 'https://search.earth911.com/')
];

// ======================
// Section 3: UI Components
// ======================

function createSection(id, title, content) {
    const section = document.createElement('section');
    section.id = id;
    const h2 = document.createElement('h2');
    h2.textContent = title;
    section.appendChild(h2);
    if (typeof content === 'string') {
        const p = document.createElement('p');
        p.innerHTML = content;
        section.appendChild(p);
    } else if (content instanceof HTMLElement) {
        section.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach(el => section.appendChild(el));
    }
    return section;
}

function createItemTable() {
    const table = document.createElement('table');
    table.className = 'decision-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Name', 'Category', 'Condition', 'Value ($)', 'Repairable', 'Refillable', 'Recyclable', 'Repurpose Ideas'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    items.forEach(item => {
        const tr = document.createElement('tr');
        [item.name, item.category, item.condition, item.value, item.repairable ? 'Yes' : 'No', item.refillable ? 'Yes' : 'No', item.recyclable ? 'Yes' : 'No', item.repurposeIdeas.join('; ')].forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createDecisionAssistant() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Decision Assistant</h3>
        <label for="item-select">Select an item:</label>
        <select id="item-select">
            <option value="">--Choose--</option>
            ${items.map((item, i) => `<option value="${i}">${item.name} (${item.category})</option>`).join('')}
        </select>
        <div id="decision-options" style="margin-top:1.5rem;"></div>
    `;
    div.querySelector('#item-select').addEventListener('change', function() {
        const idx = this.value;
        if (idx === '') {
            document.getElementById('decision-options').innerHTML = '';
            return;
        }
        const item = items[idx];
        document.getElementById('decision-options').innerHTML = '';
        document.getElementById('decision-options').appendChild(createOptionsTable(item));
    });
    return div;
}

function createOptionsTable(item) {
    const table = document.createElement('table');
    table.className = 'decision-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Option', 'Description', 'Impact', 'Cost', 'Learn More'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    decisionOptions.forEach(option => {
        // Only show relevant options
        if (
            (option.type === 'Repair' && !item.repairable) ||
            (option.type === 'Refill' && !item.refillable) ||
            (option.type === 'Recycle' && !item.recyclable)
        ) return;
        const tr = document.createElement('tr');
        [option.type, option.description, option.impact, option.cost, option.link].forEach((val, i) => {
            const td = document.createElement('td');
            if (i === 4) {
                const a = document.createElement('a');
                a.href = val;
                a.target = '_blank';
                a.textContent = 'More';
                td.appendChild(a);
            } else {
                td.textContent = val;
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    // Repurpose ideas
    if (item.repurposeIdeas.length > 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>Repurpose</td><td>${item.repurposeIdeas.join('; ')}</td><td>Medium</td><td>Neutral</td><td><a href="https://www.upcyclethat.com/" target="_blank">More</a></td>`;
        tbody.appendChild(tr);
    }
    // Donate/Resell always available
    ['Donate', 'Resell', 'Borrow'].forEach(type => {
        const option = decisionOptions.find(o => o.type === type);
        if (option) {
            const tr = document.createElement('tr');
            [option.type, option.description, option.impact, option.cost, option.link].forEach((val, i) => {
                const td = document.createElement('td');
                if (i === 4) {
                    const a = document.createElement('a');
                    a.href = val;
                    a.target = '_blank';
                    a.textContent = 'More';
                    td.appendChild(a);
                } else {
                    td.textContent = val;
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
    });
    table.appendChild(tbody);
    return table;
}

function createImpactSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Impact & Cost Comparison</h3>
        <canvas id="impactChart" width="400" height="220"></canvas>
        <p style="font-size:0.9rem;color:#555;">Estimated impact and cost for each option</p>
    `;
    setTimeout(renderImpactChart, 100);
    return div;
}

function renderImpactChart() {
    const ctx = document.getElementById('impactChart').getContext('2d');
    if (!window.Chart) {
        loadChartJs(() => renderImpactChart());
        return;
    }
    const labels = decisionOptions.map(o => o.type);
    const impactData = decisionOptions.map(o => o.impact === 'High' ? 3 : o.impact === 'Medium' ? 2 : 1);
    const costData = decisionOptions.map(o => o.cost === 'Save' ? 3 : o.cost === 'Neutral' ? 2 : 1);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Impact (3=High)',
                    data: impactData,
                    backgroundColor: '#6a5acd'
                },
                {
                    label: 'Cost (3=Save)',
                    data: costData,
                    backgroundColor: '#ffd700'
                }
            ]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 3,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            }
        }
    });
}

function loadChartJs(callback) {
    if (window.Chart) {
        callback();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = callback;
    document.body.appendChild(script);
}

function createTipsSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Circularity Tips</h3>
        <ul>
            <li>Repair before you replace—many items can be fixed for less than buying new.</li>
            <li>Refill containers and bottles to cut down on single-use waste.</li>
            <li>Borrow or share rarely used items with neighbors or local libraries.</li>
            <li>Repurpose creatively—turn old clothes into rags, jars into storage, etc.</li>
            <li>Donate or resell items in good condition to extend their life.</li>
            <li>Recycle only as a last resort when other options are not possible.</li>
        </ul>
    `;
    return div;
}

function createFAQSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Frequently Asked Questions</h3>
        <h4>How do I know if something is repairable?</h4>
        <p>Check for local repair shops or online guides. Many electronics, clothes, and furniture can be fixed.</p>
        <h4>Where can I refill household products?</h4>
        <p>Look for refill stations at supermarkets or zero-waste stores in your area.</p>
        <h4>What if I can’t repurpose or donate?</h4>
        <p>Try to recycle responsibly. Use local recycling directories to find the right facility.</p>
        <h4>Is it worth selling low-value items?</h4>
        <p>Sometimes, but donating may be easier and more impactful for low-value goods.</p>
    `;
    return div;
}

// ======================
// Section 4: Page Assembly
// ======================

function loadSections() {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    // About Section
    main.appendChild(createSection('about', 'About the Circularity Coach', 'This decision assistant helps you choose the best circular option for everyday items—repair, refill, borrow, repurpose, donate, resell, or recycle—with impact and cost comparisons.'));
    // Coach
    main.appendChild(createSection('coach', 'Decision Assistant', [createItemTable(), createDecisionAssistant()]));
    // Impact
    main.appendChild(createSection('impact', 'Impact & Cost', createImpactSection()));
    // Tips
    main.appendChild(createSection('tips', 'Circularity Tips', createTipsSection()));
    // FAQ
    main.appendChild(createSection('faq', 'FAQ', createFAQSection()));
}

document.addEventListener('DOMContentLoaded', () => {
    loadSections();
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ======================
// Section 5: Utility Functions
// ======================

// Debounce utility for future use
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ======================
// Section 6: Future Extensions
// ======================

// Placeholder for future features (e.g., user accounts, local storage, gamification)
// ...
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).
