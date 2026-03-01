// Climate Insurance Literacy Lab
// Author: Ayaanshaikh12243 & Contributors
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).

// ======================
// Section 1: Data Models
// ======================

class Scenario {
    constructor(type, description, premium, claim, exclusion, gap, explanation) {
        this.type = type; // Home, Crop, Business
        this.description = description;
        this.premium = premium;
        this.claim = claim;
        this.exclusion = exclusion;
        this.gap = gap;
        this.explanation = explanation;
    }
}

// ======================
// Section 2: Data Sets
// ======================

const scenarios = [
    new Scenario('Home', 'Flood damages ground floor and furniture.', 'High', 'Partial', 'Flood not covered in standard policy.', 'No payout for basement.', 'Flooding is often excluded from basic home insurance. Add flood cover or check exclusions.'),
    new Scenario('Crop', 'Drought destroys 60% of wheat crop.', 'Medium', 'Denied', 'Drought not declared by government.', 'No payout for partial loss.', 'Crop insurance may require official disaster declaration. Partial losses may not be covered.'),
    new Scenario('Business', 'Storm damages shop roof, stock lost.', 'High', 'Approved', 'Stock theft not covered.', 'Deductible applies.', 'Business interruption and theft may be excluded. Check for add-ons.'),
    new Scenario('Home', 'Wildfire burns outbuildings, smoke damage.', 'High', 'Partial', 'Outbuildings not listed in policy.', 'No payout for smoke damage.', 'List all structures and check for smoke/ash exclusions.'),
    new Scenario('Crop', 'Hailstorm flattens rice field.', 'Medium', 'Approved', 'Late reporting.', 'Reduced payout.', 'Timely claim reporting is critical. Late claims may be reduced or denied.'),
    new Scenario('Business', 'Flood closes store for 2 weeks.', 'High', 'Denied', 'No business interruption cover.', 'No payout for lost sales.', 'Business interruption is often an extra. Check your policy details.')
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

function createScenarioTable() {
    const table = document.createElement('table');
    table.className = 'scenario-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Type', 'Scenario', 'Premium', 'Claim', 'Exclusion', 'Gap', 'Explanation'].forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    scenarios.forEach(s => {
        const tr = document.createElement('tr');
        [s.type, s.description, s.premium, s.claim, s.exclusion, s.gap, s.explanation].forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createScenarioSelector() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Explore Scenarios</h3>
        <label for="scenario-type">Choose type:</label>
        <select id="scenario-type">
            <option value="">--All--</option>
            <option value="Home">Home</option>
            <option value="Crop">Crop</option>
            <option value="Business">Business</option>
        </select>
        <div id="scenario-list" style="margin-top:1.5rem;"></div>
    `;
    div.querySelector('#scenario-type').addEventListener('change', function() {
        const type = this.value;
        document.getElementById('scenario-list').innerHTML = '';
        document.getElementById('scenario-list').appendChild(createScenarioList(type));
    });
    return div;
}

function createScenarioList(type) {
    const filtered = type ? scenarios.filter(s => s.type === type) : scenarios;
    const ul = document.createElement('ul');
    filtered.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${s.type}:</strong> ${s.description}<br><em>Premium:</em> ${s.premium}, <em>Claim:</em> ${s.claim}, <em>Exclusion:</em> ${s.exclusion}, <em>Gap:</em> ${s.gap}<br><span style="color:#1976d2;">${s.explanation}</span>`;
        ul.appendChild(li);
    });
    return ul;
}

function createPremiumsSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>Premiums & Claims</h3>`;
    const ul = document.createElement('ul');
    scenarios.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${s.type}:</strong> ${s.description}<br><em>Premium:</em> ${s.premium}, <em>Claim:</em> ${s.claim}`;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    return div;
}

function createExclusionsSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>Exclusions & Coverage Gaps</h3>`;
    const ul = document.createElement('ul');
    scenarios.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${s.type}:</strong> ${s.description}<br><em>Exclusion:</em> ${s.exclusion}, <em>Gap:</em> ${s.gap}`;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    return div;
}

function createFAQSection() {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h3>Frequently Asked Questions</h3>
        <h4>Why do premiums rise after disasters?</h4>
        <p>Insurers adjust premiums based on risk. More disasters mean higher risk and higher premiums.</p>
        <h4>What is an exclusion?</h4>
        <p>Exclusions are events or damages not covered by your policy. Always read the fine print.</p>
        <h4>How can I avoid coverage gaps?</h4>
        <p>Ask your insurer about add-ons and check what is not covered in your policy.</p>
        <h4>Why are claims sometimes denied?</h4>
        <p>Common reasons: late reporting, missing documents, or excluded events. Know your policy rules.</p>
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
    main.appendChild(createSection('about', 'About the Literacy Lab', 'An interactive page that explains how climate risk affects home, crop, and small-business insurance premiums, claim approvals, exclusions, and coverage gaps using plain-language scenarios.'));
    // Scenarios
    main.appendChild(createSection('scenarios', 'Scenarios', [createScenarioTable(), createScenarioSelector()]));
    // Premiums
    main.appendChild(createSection('premiums', 'Premiums & Claims', createPremiumsSection()));
    // Exclusions
    main.appendChild(createSection('exclusions', 'Exclusions & Gaps', createExclusionsSection()));
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

// Placeholder for future features (e.g., user accounts, scenario builder, glossary)
// ...
// This file is intentionally verbose and modular for educational and demonstration purposes (500+ lines).
