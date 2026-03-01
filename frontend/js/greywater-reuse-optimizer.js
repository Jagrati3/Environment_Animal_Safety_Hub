// Household Greywater Reuse Optimizer JS
// Handles form, logic, and results rendering

document.addEventListener('DOMContentLoaded', () => {
    renderOptimizerForm();
    renderGuidelines();
});

function renderOptimizerForm() {
    const section = document.getElementById('optimizer-form-section');
    section.innerHTML = `
        <h2>Greywater Reuse Decision Tool</h2>
        <form id="greywater-form">
            <label>Water Source:
                <select name="source" required>
                    <option value="sink">Sink</option>
                    <option value="shower">Shower</option>
                    <option value="laundry">Laundry</option>
                </select>
            </label>
            <label>Household Size:
                <input name="size" type="number" min="1" max="20" required value="3">
            </label>
            <label>Average Daily Water Use (L per person):
                <input name="dailyuse" type="number" min="10" max="500" required value="50">
            </label>
            <label>Preferred Reuse Category:
                <select name="reuse" required>
                    <option value="garden">Garden Irrigation</option>
                    <option value="toilet">Toilet Flushing</option>
                    <option value="cleaning">Cleaning (Floors, Vehicles)</option>
                </select>
            </label>
            <label>Willing to Install Filtration?
                <select name="filtration" required>
                    <option value="basic">Basic (mesh/sediment)</option>
                    <option value="advanced">Advanced (bio/UV/activated carbon)</option>
                    <option value="none">No Filtration</option>
                </select>
            </label>
            <button type="submit">Optimize</button>
        </form>
        <div id="optimizer-form-status"></div>
    `;
    document.getElementById('greywater-form').onsubmit = function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this).entries());
        showOptimizerResults(data);
    };
}

function showOptimizerResults(data) {
    const section = document.getElementById('optimizer-results-section');
    // Calculate estimated water available
    const totalWater = parseInt(data.size) * parseInt(data.dailyuse);
    let filtrationLevel = 'None';
    let reuseOptions = [];
    let warnings = [];
    // Decision logic
    if (data.filtration === 'none') {
        filtrationLevel = 'None';
        if (data.reuse === 'garden') reuseOptions.push('Garden Irrigation');
        if (data.reuse === 'cleaning') reuseOptions.push('Cleaning (Floors, Vehicles)');
        if (data.reuse === 'toilet') warnings.push('Toilet flushing is not recommended without filtration.');
    } else if (data.filtration === 'basic') {
        filtrationLevel = 'Basic (mesh/sediment)';
        if (data.reuse === 'garden') reuseOptions.push('Garden Irrigation');
        if (data.reuse === 'cleaning') reuseOptions.push('Cleaning (Floors, Vehicles)');
        if (data.reuse === 'toilet') reuseOptions.push('Toilet Flushing (with caution)');
    } else if (data.filtration === 'advanced') {
        filtrationLevel = 'Advanced (bio/UV/activated carbon)';
        reuseOptions.push('Garden Irrigation', 'Toilet Flushing', 'Cleaning (Floors, Vehicles)');
    }
    // Source-specific notes
    let sourceNote = '';
    if (data.source === 'laundry') sourceNote = 'Laundry water may contain detergents; avoid food crops.';
    if (data.source === 'sink') sourceNote = 'Avoid reusing kitchen sink water for edible plants.';
    // Render results
    section.innerHTML = `
        <h2>Optimization Results</h2>
        <table class="result-table">
            <tr><th>Estimated Water Available</th><td>${totalWater} L/day</td></tr>
            <tr><th>Recommended Filtration</th><td>${filtrationLevel}</td></tr>
            <tr><th>Safe Reuse Options</th><td>${reuseOptions.join(', ')}</td></tr>
        </table>
        <ul>
            ${warnings.map(w => `<li style='color:#b71c1c;'>${w}</li>`).join('')}
            ${sourceNote ? `<li style='color:#b71c1c;'>${sourceNote}</li>` : ''}
        </ul>
    `;
}

function renderGuidelines() {
    const section = document.getElementById('optimizer-guidelines-section');
    section.innerHTML = `
        <h2>Greywater Reuse Guidelines</h2>
        <ul>
            <li>Never use greywater for drinking, cooking, or bathing.</li>
            <li>Use eco-friendly, low-salt detergents and soaps.</li>
            <li>Filter and store greywater only as long as needed (avoid stagnation).</li>
            <li>Do not use greywater on edible parts of food crops.</li>
            <li>Clean and maintain filtration systems regularly.</li>
            <li>Check local regulations before implementing reuse systems.</li>
        </ul>
    `;
}
