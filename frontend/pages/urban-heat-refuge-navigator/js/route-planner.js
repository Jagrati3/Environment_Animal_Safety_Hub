// route-planner.js - Route planning logic for Urban Heat Refuge Navigator

import { coolingCenters, shadedRoutes } from './data.js';
import { showInfo } from './ui.js';

export function planRoute(start, end) {
    // Simulate route planning: find nearest shaded route between start and end
    // In real app, use routing API and risk overlays
    let route = shadedRoutes[0]; // Pick first for demo
    showInfo('Planned Route', `Route from (${start}) to (${end}) using shaded paths.`);
    return route;
}

export function enableRouteSelection(map) {
    let start = null, end = null;
    map.on('click', function(e) {
        if (!start) {
            start = e.latlng;
            showInfo('Route Planner', 'Select destination point.');
        } else if (!end) {
            end = e.latlng;
            planRoute(start, end);
            start = end = null;
        }
    });
}
