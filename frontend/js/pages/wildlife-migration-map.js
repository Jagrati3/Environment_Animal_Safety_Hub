const speciesData = [
    {
        id: "arctic-tern",
        name: "Arctic Tern",
        category: "Birds",
        status: "Near Threatened",
        color: "#38bdf8",
        seasons: ["Spring", "Summer"],
        distanceKm: 71000,
        durationDays: 90,
        regions: "Arctic → Antarctic",
        description: "Arctic terns complete the longest known migration, riding seasonal winds between polar oceans.",
        route: [
            [120, 90],
            [220, 120],
            [320, 180],
            [420, 240],
            [520, 310],
            [620, 370],
            [720, 420]
        ]
    },
    {
        id: "humpback-whale",
        name: "Humpback Whale",
        category: "Marine",
        status: "Vulnerable",
        color: "#4ade80",
        seasons: ["Summer", "Fall"],
        distanceKm: 9600,
        durationDays: 55,
        regions: "North Pacific → Tropical Breeding",
        description: "Humpback whales migrate thousands of kilometers to warm breeding lagoons and return to polar feeding grounds.",
        route: [
            [240, 180],
            [280, 220],
            [340, 270],
            [400, 320],
            [480, 350],
            [560, 360]
        ]
    },
    {
        id: "leatherback-turtle",
        name: "Leatherback Turtle",
        category: "Marine",
        status: "Endangered",
        color: "#f472b6",
        seasons: ["Spring", "Fall", "Winter"],
        distanceKm: 10500,
        durationDays: 120,
        regions: "Atlantic → West Africa",
        description: "Leatherback turtles follow jellyfish blooms across the Atlantic, nesting on tropical beaches.",
        route: [
            [580, 210],
            [540, 250],
            [500, 300],
            [470, 340],
            [430, 360],
            [380, 370]
        ]
    },
    {
        id: "wildebeest",
        name: "Wildebeest",
        category: "Land",
        status: "Least Concern",
        color: "#f59e0b",
        seasons: ["Winter", "Spring"],
        distanceKm: 1600,
        durationDays: 45,
        regions: "Serengeti → Maasai Mara",
        description: "The great wildebeest migration follows rainfall patterns across East African savannas.",
        route: [
            [520, 310],
            [540, 320],
            [560, 330],
            [580, 340],
            [600, 350]
        ]
    },
    {
        id: "monarch-butterfly",
        name: "Monarch Butterfly",
        category: "Land",
        status: "Endangered",
        color: "#a855f7",
        seasons: ["Fall", "Winter"],
        distanceKm: 4800,
        durationDays: 75,
        regions: "North America → Mexico",
        description: "Monarch butterflies travel multi-generational routes guided by temperature and daylight.",
        route: [
            [200, 140],
            [230, 180],
            [260, 220],
            [300, 260],
            [340, 280]
        ]
    }
];

const mapLayer = document.getElementById("mapLayer");
const routesLayer = document.getElementById("routesLayer");
const markersLayer = document.getElementById("markersLayer");
const legendList = document.getElementById("legendList");
const speciesInfo = document.getElementById("speciesInfo");
const activeRoutesEl = document.getElementById("activeRoutes");
const avgDistanceEl = document.getElementById("avgDistance");
const activeSeasonLabel = document.getElementById("activeSeasonLabel");
const totalRoutesEl = document.getElementById("totalRoutes");
const longestJourneyEl = document.getElementById("longestJourney");
const avgDurationEl = document.getElementById("avgDuration");
const filteredSpeciesEl = document.getElementById("filteredSpecies");
const categoryFilter = document.getElementById("categoryFilter");
const seasonToggle = document.getElementById("seasonToggle");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetViewBtn = document.getElementById("resetView");
const migrationMap = document.getElementById("migrationMap");

let activeSeason = "Spring";
let activeCategory = "All";
let scale = 1;
let translateX = 0;
let translateY = 0;
let isPanning = false;
let startPoint = { x: 0, y: 0 };

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const createSvgElement = (tag, attrs = {}) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
};

const formatNumber = (value) => value.toLocaleString("en-US");

const setTransform = () => {
    mapLayer.setAttribute(
        "transform",
        `translate(${translateX} ${translateY}) scale(${scale})`
    );
    routesLayer.setAttribute(
        "transform",
        `translate(${translateX} ${translateY}) scale(${scale})`
    );
    markersLayer.setAttribute(
        "transform",
        `translate(${translateX} ${translateY}) scale(${scale})`
    );
};

const calculateStats = (filtered) => {
    if (filtered.length === 0) {
        return {
            avgDistance: 0,
            longest: 0,
            avgDuration: 0
        };
    }
    const totalDistance = filtered.reduce((sum, item) => sum + item.distanceKm, 0);
    const totalDuration = filtered.reduce((sum, item) => sum + item.durationDays, 0);
    return {
        avgDistance: Math.round(totalDistance / filtered.length),
        longest: Math.max(...filtered.map((item) => item.distanceKm)),
        avgDuration: Math.round(totalDuration / filtered.length)
    };
};

const buildLegend = (filtered) => {
    legendList.innerHTML = "";
    filtered.forEach((species) => {
        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `
            <span class="legend-dot" style="background:${species.color}"></span>
            <span>${species.name}</span>
        `;
        legendList.appendChild(item);
    });
};

const buildRoutes = (filtered) => {
    routesLayer.innerHTML = "";
    markersLayer.innerHTML = "";

    filtered.forEach((species) => {
        const points = species.route.map((point) => point.join(",")).join(" ");
        const path = createSvgElement("polyline", {
            points,
            class: "route-line",
            stroke: species.color,
            "data-id": species.id
        });

        const glow = createSvgElement("polyline", {
            points,
            class: "route-glow",
            stroke: species.color
        });

        routesLayer.appendChild(glow);
        routesLayer.appendChild(path);

        const [startX, startY] = species.route[0];
        const [endX, endY] = species.route[species.route.length - 1];

        const createMarker = (x, y) => {
            const group = createSvgElement("g", {
                class: "marker",
                "data-id": species.id
            });
            const ring = createSvgElement("circle", {
                cx: x,
                cy: y,
                r: 10,
                class: "marker-ring",
                stroke: species.color,
                "stroke-width": 2
            });
            const core = createSvgElement("circle", {
                cx: x,
                cy: y,
                r: 5,
                class: "marker-core",
                stroke: species.color
            });
            group.appendChild(ring);
            group.appendChild(core);
            markersLayer.appendChild(group);
        };

        createMarker(startX, startY);
        createMarker(endX, endY);

        const pathLength = path.getTotalLength();
        path.style.setProperty("--dash-offset", pathLength);
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.addEventListener("mouseenter", () => path.classList.add("active"));
        path.addEventListener("mouseleave", () => path.classList.remove("active"));
        path.addEventListener("click", () => showSpecies(species.id));
    });

    markersLayer.querySelectorAll(".marker").forEach((marker) => {
        marker.addEventListener("click", (event) => {
            const { id } = event.currentTarget.dataset;
            showSpecies(id);
        });
    });
};

const showSpecies = (id) => {
    const species = speciesData.find((item) => item.id === id);
    if (!species) {
        return;
    }

    speciesInfo.innerHTML = `
        <h4>${species.name}</h4>
        <div class="species-meta">
            <span class="meta-pill"><strong>Category:</strong> ${species.category}</span>
            <span class="meta-pill"><strong>Status:</strong> ${species.status}</span>
            <span class="meta-pill"><strong>Regions:</strong> ${species.regions}</span>
        </div>
        <p class="species-description">${species.description}</p>
        <div class="stats-grid">
            <div class="stat-box">
                <span>Distance</span>
                <strong>${formatNumber(species.distanceKm)} km</strong>
            </div>
            <div class="stat-box">
                <span>Journey Duration</span>
                <strong>${species.durationDays} days</strong>
            </div>
            <div class="stat-box">
                <span>Active Seasons</span>
                <strong>${species.seasons.join(", ")}</strong>
            </div>
        </div>
    `;
};

const updateDashboard = () => {
    const filtered = speciesData.filter((species) => {
        const seasonMatch = species.seasons.includes(activeSeason);
        const categoryMatch = activeCategory === "All" || species.category === activeCategory;
        return seasonMatch && categoryMatch;
    });

    activeSeasonLabel.textContent = activeSeason;
    filteredSpeciesEl.textContent = filtered.length;
    activeRoutesEl.textContent = filtered.length;

    const stats = calculateStats(filtered);
    avgDistanceEl.textContent = `${formatNumber(stats.avgDistance)} km`;
    totalRoutesEl.textContent = filtered.length;
    longestJourneyEl.textContent = `${formatNumber(stats.longest)} km`;
    avgDurationEl.textContent = `${stats.avgDuration} days`;

    buildLegend(filtered);
    buildRoutes(filtered);

    if (filtered.length > 0) {
        showSpecies(filtered[0].id);
    } else {
        speciesInfo.innerHTML = "<p class=\"species-description\">No migration routes available for this filter combination.</p>";
    }
};

const handleSeasonToggle = (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }
    seasonToggle.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeSeason = button.dataset.season;
    updateDashboard();
};

const handleCategoryChange = (event) => {
    activeCategory = event.target.value;
    updateDashboard();
};

const onPointerDown = (event) => {
    isPanning = true;
    startPoint = { x: event.clientX - translateX, y: event.clientY - translateY };
};

const onPointerMove = (event) => {
    if (!isPanning) {
        return;
    }
    translateX = event.clientX - startPoint.x;
    translateY = event.clientY - startPoint.y;
    setTransform();
};

const onPointerUp = () => {
    isPanning = false;
};

const onWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    scale = clamp(scale + delta, 0.7, 2.5);
    setTransform();
};

const zoom = (direction) => {
    scale = clamp(scale + direction, 0.7, 2.5);
    setTransform();
};

const resetView = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    setTransform();
};

seasonToggle.addEventListener("click", handleSeasonToggle);
categoryFilter.addEventListener("change", handleCategoryChange);

migrationMap.addEventListener("pointerdown", onPointerDown);
migrationMap.addEventListener("pointermove", onPointerMove);
migrationMap.addEventListener("pointerup", onPointerUp);
migrationMap.addEventListener("pointerleave", onPointerUp);
migrationMap.addEventListener("wheel", onWheel, { passive: false });

zoomInBtn.addEventListener("click", () => zoom(0.2));
zoomOutBtn.addEventListener("click", () => zoom(-0.2));
resetViewBtn.addEventListener("click", resetView);

updateDashboard();
