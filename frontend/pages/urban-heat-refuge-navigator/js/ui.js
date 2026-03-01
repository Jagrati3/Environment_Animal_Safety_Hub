// ui.js - UI rendering and interaction logic for Urban Heat Refuge Navigator

export function showInfo(title, content) {
    document.getElementById('info-content').innerHTML = `<b>${title}</b><br>${content}`;
}

export function showLoading(message = 'Loading...') {
    document.getElementById('info-content').innerHTML = `<em>${message}</em>`;
}

export function showNotification(msg, type = 'info') {
    let notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerText = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3500);
}

export function renderLegend() {
    // ...existing code for legend, can be extended for dynamic overlays
}

export function renderPopup(feature) {
    // Render detailed popup for a map feature
    // ...
}
