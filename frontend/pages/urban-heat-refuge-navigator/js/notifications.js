// notifications.js - Notification and alert logic for Urban Heat Refuge Navigator

export function showAlert(message) {
    alert(message);
}

export function showHydrationReminder() {
    // Show hydration reminder every 30 minutes
    setInterval(() => {
        alert('Hydration Reminder: Please drink water and stay cool!');
    }, 1800000);
}
