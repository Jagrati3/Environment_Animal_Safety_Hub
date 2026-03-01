// data.js - Handles data fetching and simulation for Urban Heat Refuge Navigator

export const coolingCenters = [
    { id: 1, name: "Central Library Cooling Center", coords: [40.7122, -74.0059], address: "5th Ave & 42nd St", rating: 4.7, hours: "8am-8pm" },
    { id: 2, name: "Community Pool", coords: [40.715, -74.002], address: "123 Main St", rating: 4.2, hours: "10am-6pm" },
    { id: 3, name: "City Hall Cooling Center", coords: [40.713, -74.007], address: "City Hall Park", rating: 4.5, hours: "24/7" }
];

export const waterRefillPoints = [
    { id: 1, name: "Water Refill - Bryant Park", coords: [40.7536, -73.9832] },
    { id: 2, name: "Water Refill - Union Square", coords: [40.7359, -73.9911] }
];

export const shadedRoutes = [
    [ [40.7122, -74.0059], [40.713, -74.007], [40.715, -74.002] ],
    [ [40.7536, -73.9832], [40.7359, -73.9911] ]
];

export const lowRiskAreas = [
    { id: 1, name: "Shaded Park Area", coords: [40.714, -74.004], radius: 200 },
    { id: 2, name: "Riverside Walk", coords: [40.720, -74.010], radius: 150 }
];

// Simulated heat risk overlays by hour (0-23)
export function getHeatRiskOverlay(hour) {
    // Returns geojson polygons with risk level for the hour
    // Simulated: higher risk in afternoon
    const risk = hour >= 12 && hour <= 16 ? 'high' : hour >= 9 && hour <= 11 ? 'medium' : 'low';
    return [
        {
            type: 'Feature',
            properties: { risk },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [40.711, -74.008], [40.711, -74.002], [40.718, -74.002], [40.718, -74.008], [40.711, -74.008]
                    ]
                ]
            }
        }
    ];
}

// Simulate async data fetch
export function fetchCoolingCenters() {
    return new Promise(resolve => setTimeout(() => resolve(coolingCenters), 500));
}

export function fetchWaterRefillPoints() {
    return new Promise(resolve => setTimeout(() => resolve(waterRefillPoints), 400));
}

export function fetchShadedRoutes() {
    return new Promise(resolve => setTimeout(() => resolve(shadedRoutes), 300));
}

export function fetchLowRiskAreas() {
    return new Promise(resolve => setTimeout(() => resolve(lowRiskAreas), 300));
}
