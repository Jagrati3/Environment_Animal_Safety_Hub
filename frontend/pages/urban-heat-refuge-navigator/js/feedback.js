// feedback.js - User feedback and reporting for Urban Heat Refuge Navigator

export function enableFeedbackForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <h3>Report a Cooling Center</h3>
        <input type='text' name='name' placeholder='Name' required />
        <input type='text' name='address' placeholder='Address' required />
        <button type='submit'>Submit</button>
    `;
    form.onsubmit = function(e) {
        e.preventDefault();
        // Simulate feedback submission
        alert('Thank you for your feedback!');
        form.reset();
    };
    document.getElementById('info-panel').appendChild(form);
}
