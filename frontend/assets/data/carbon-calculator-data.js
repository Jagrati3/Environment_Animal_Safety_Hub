// Carbon Calculator Data and Constants

// Emission factors (kg CO2e per unit)
const emissionFactors = {
    transportation: {
        carTypes: {
            none: 0,
            electric: 0.05,  // kg CO2e per mile
            hybrid: 0.2,
            average: 0.411,
            suv: 0.65
        },
        publicTransit: 0.14,  // kg CO2e per mile
        flightShort: 200,  // kg CO2e per flight
        flightLong: 1100   // kg CO2e per flight
    },
    homeEnergy: {
        electricity: 12,  // kg CO2e per dollar
        naturalGas: 5.3,  // kg CO2e per dollar
        heatingOil: 10.2,  // kg CO2e per gallon
        water: {
            low: 50,      // kg CO2e per year
            average: 100,
            high: 200
        }
    },
    food: {
        dietTypes: {
            vegan: 1500,        // kg CO2e per year
            vegetarian: 1700,
            pescatarian: 1900,
            'low-meat': 2300,
            average: 2500,
            'high-meat': 3300
        },
        localFood: {
            always: 0.8,   // multiplier
            often: 0.9,
            sometimes: 1.0,
            never: 1.15
        },
        organicFood: {
            all: 0.85,     // multiplier
            most: 0.9,
            some: 0.95,
            none: 1.0
        },
        foodWaste: {
            minimal: 0.85,  // multiplier
            average: 1.0,
            high: 1.3
        }
    },
    lifestyle: {
        shopping: {
            minimal: 200,      // kg CO2e per year
            average: 500,
            frequent: 1000,
            excessive: 2000
        },
        secondHand: {
            mostly: 0.6,    // multiplier
            often: 0.75,
            sometimes: 0.9,
            rarely: 1.0,
            never: 1.0
        },
        recycling: {
            all: 0.7,       // multiplier
            most: 0.85,
            some: 0.95,
            none: 1.0
        },
        composting: {
            yes: 0.9,       // multiplier
            no: 1.0
        },
        singleUsePlastic: {
            none: 0.7,      // multiplier
            minimal: 0.85,
            average: 1.0,
            high: 1.3
        },
        digitalUsage: {
            low: 100,       // kg CO2e per year
            average: 200,
            high: 400
        }
    }
};

// Global and regional averages (tons CO2e per year)
const averages = {
    global: 4.0,
    target: 2.0,
    countries: {
        usa: 16.0,
        canada: 15.5,
        australia: 15.3,
        germany: 8.9,
        uk: 5.5,
        france: 4.6,
        china: 7.4,
        india: 1.9,
        brazil: 2.2
    }
};

// Sustainability tips database
const sustainabilityTips = [
    {
        id: 1,
        title: "Switch to Renewable Energy",
        description: "Install solar panels or switch to a renewable energy provider for your home electricity",
        category: "energy",
        impact: "high",
        difficulty: "hard",
        co2Reduction: "2.5 tons/year",
        icon: "fa-solar-panel"
    },
    {
        id: 2,
        title: "Reduce Car Usage",
        description: "Walk, bike, or use public transportation for short trips instead of driving",
        category: "transportation",
        impact: "high",
        difficulty: "moderate",
        co2Reduction: "1.8 tons/year",
        icon: "fa-walking"
    },
    {
        id: 3,
        title: "Adopt a Plant-Based Diet",
        description: "Reduce meat consumption and eat more plant-based meals throughout the week",
        category: "food",
        impact: "high",
        difficulty: "moderate",
        co2Reduction: "0.8 tons/year",
        icon: "fa-leaf"
    },
    {
        id: 4,
        title: "Avoid Air Travel",
        description: "Choose train or bus for regional trips and limit international flights",
        category: "transportation",
        impact: "high",
        difficulty: "moderate",
        co2Reduction: "1.6 tons/year",
        icon: "fa-plane-slash"
    },
    {
        id: 5,
        title: "Upgrade to LED Lighting",
        description: "Replace all incandescent bulbs with energy-efficient LED lights",
        category: "energy",
        impact: "medium",
        difficulty: "easy",
        co2Reduction: "0.3 tons/year",
        icon: "fa-lightbulb"
    },
    {
        id: 6,
        title: "Install Smart Thermostat",
        description: "Use programmable thermostat to optimize heating and cooling automatically",
        category: "energy",
        impact: "medium",
        difficulty: "moderate",
        co2Reduction: "0.5 tons/year",
        icon: "fa-temperature-low"
    },
    {
        id: 7,
        title: "Buy Second-Hand Goods",
        description: "Purchase used clothing, furniture, and electronics instead of new items",
        category: "lifestyle",
        impact: "medium",
        difficulty: "easy",
        co2Reduction: "0.4 tons/year",
        icon: "fa-recycle"
    },
    {
        id: 8,
        title: "Start Composting",
        description: "Compost food scraps and yard waste to reduce methane from landfills",
        category: "waste",
        impact: "medium",
        difficulty: "easy",
        co2Reduction: "0.3 tons/year",
        icon: "fa-seedling"
    },
    {
        id: 9,
        title: "Reduce Food Waste",
        description: "Plan meals, store food properly, and use leftovers to minimize waste",
        category: "food",
        impact: "medium",
        difficulty: "easy",
        co2Reduction: "0.4 tons/year",
        icon: "fa-apple-alt"
    },
    {
        id: 10,
        title: "Improve Home Insulation",
        description: "Add insulation to walls, attic, and windows to reduce heating/cooling needs",
        category: "energy",
        impact: "high",
        difficulty: "hard",
        co2Reduction: "1.2 tons/year",
        icon: "fa-home"
    },
    {
        id: 11,
        title: "Use Reusable Bags and Bottles",
        description: "Eliminate single-use plastics by carrying reusable shopping bags and water bottles",
        category: "waste",
        impact: "low",
        difficulty: "easy",
        co2Reduction: "0.1 tons/year",
        icon: "fa-shopping-bag"
    },
    {
        id: 12,
        title: "Buy Local and Seasonal Food",
        description: "Purchase produce from local farmers markets to reduce transportation emissions",
        category: "food",
        impact: "medium",
        difficulty: "easy",
        co2Reduction: "0.3 tons/year",
        icon: "fa-map-marker-alt"
    },
    {
        id: 13,
        title: "Carpool or Rideshare",
        description: "Share rides with coworkers or use carpooling apps for regular commutes",
        category: "transportation",
        impact: "medium",
        difficulty: "easy",
        co2Reduction: "0.7 tons/year",
        icon: "fa-users"
    },
    {
        id: 14,
        title: "Line Dry Clothes",
        description: "Air dry laundry instead of using an electric dryer when possible",
        category: "energy",
        impact: "low",
        difficulty: "easy",
        co2Reduction: "0.2 tons/year",
        icon: "fa-tshirt"
    },
    {
        id: 15,
        title: "Switch to Electric Vehicle",
        description: "Replace gas-powered car with an electric or hybrid vehicle",
        category: "transportation",
        impact: "high",
        difficulty: "hard",
        co2Reduction: "2.4 tons/year",
        icon: "fa-charging-station"
    },
    {
        id: 16,
        title: "Unplug Electronics",
        description: "Disconnect devices when not in use to eliminate phantom energy drain",
        category: "energy",
        impact: "low",
        difficulty: "easy",
        co2Reduction: "0.15 tons/year",
        icon: "fa-plug"
    },
    {
        id: 17,
        title: "Choose Sustainable Brands",
        description: "Support companies with strong environmental and ethical practices",
        category: "lifestyle",
        impact: "medium",
        difficulty: "moderate",
        co2Reduction: "0.3 tons/year",
        icon: "fa-certificate"
    },
    {
        id: 18,
        title: "Reduce Water Consumption",
        description: "Take shorter showers, fix leaks, and install low-flow fixtures",
        category: "energy",
        impact: "low",
        difficulty: "easy",
        co2Reduction: "0.2 tons/year",
        icon: "fa-tint"
    },
    {
        id: 19,
        title: "Recycle Properly",
        description: "Learn local recycling guidelines and sort waste correctly",
        category: "waste",
        impact: "low",
        difficulty: "easy",
        co2Reduction: "0.15 tons/year",
        icon: "fa-recycle"
    },
    {
        id: 20,
        title: "Minimize Streaming Hours",
        description: "Reduce video streaming quality and duration to lower digital carbon footprint",
        category: "lifestyle",
        impact: "low",
        difficulty: "easy",
        co2Reduction: "0.1 tons/year",
        icon: "fa-video"
    }
];

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { emissionFactors, averages, sustainabilityTips };
}
