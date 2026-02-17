// Sustainable Living Challenge Hub - JavaScript

// Challenge Database - 30+ Environmental Challenges
const challenges = [
    {
        id: 1,
        title: "Zero Waste Week",
        emoji: "♻️",
        category: "zero-waste",
        difficulty: "hard",
        duration: "7 days",
        points: 50,
        description: "Produce zero waste for an entire week. Bring reusable containers, refuse single-use plastics, and compost organic waste.",
        impact: "Prevents ~2kg of waste from landfills, saves ~5kg CO2 equivalent",
        steps: [
            "Plan meals to consume all ingredients without waste",
            "Use reusable shopping bags and containers",
            "Compost food scraps and organic waste",
            "Buy package-free items when possible",
            "Recycle all possible materials",
            "Document your waste-free journey",
            "Share tips with friends"
        ],
        tips: [
            "Start by identifying your main waste sources",
            "Prepare a 'zero waste kit' with reusables",
            "Find local zero-waste shops and farmers markets",
            "Use digital receipts to reduce paper waste"
        ],
        co2Saved: 5,
        waterSaved: 10,
        plasticReduced: 2
    },
    {
        id: 2,
        title: "Plastic-Free Challenge",
        emoji: "🚫",
        category: "zero-waste",
        difficulty: "medium",
        duration: "2 weeks",
        points: 40,
        description: "Eliminate single-use plastics from your daily life. Choose plastic-free alternatives for packaging and products.",
        impact: "Prevents ~1.5kg plastic from oceans, saves ~3kg CO2",
        steps: [
            "Audit your current plastic consumption",
            "Replace plastic bags with cloth alternatives",
            "Buy package-free groceries",
            "Switch to solid toiletries",
            "Use metal or glass containers",
            "Refuse plastic straws and utensils",
            "Track your progress daily"
        ],
        tips: [
            "Start with one category at a time",
            "Keep a reusable bag in your car",
            "Buy bulk items to reduce packaging",
            "Support plastic-free businesses"
        ],
        co2Saved: 3,
        waterSaved: 8,
        plasticReduced: 1.5
    },
    {
        id: 3,
        title: "Bike to Work Week",
        emoji: "🚴",
        category: "transport",
        difficulty: "medium",
        duration: "5 days",
        points: 35,
        description: "Commute by bike instead of driving for an entire work week. Improve fitness while reducing emissions.",
        impact: "Saves ~20kg CO2, reduces air pollution by 10%",
        steps: [
            "Check your bike and make necessary repairs",
            "Plan safe routes to work",
            "Invest in safety gear (helmet, lights)",
            "Bike to work 5 consecutive days",
            "Track distance and time",
            "Notice the health and mental benefits",
            "Inspire colleagues to join"
        ],
        tips: [
            "Start on good weather days",
            "Leave extra time for your ride",
            "Use a bike lock and security measures",
            "Pack a change of clothes"
        ],
        co2Saved: 20,
        waterSaved: 0,
        plasticReduced: 0.1
    },
    {
        id: 4,
        title: "Vegan Challenge",
        emoji: "🌱",
        category: "food",
        difficulty: "hard",
        duration: "7 days",
        points: 50,
        description: "Eat fully plant-based for one week. Explore vegan cuisine and discover delicious meat-free alternatives.",
        impact: "Saves ~15kg CO2, 2,700L water, reduces deforestation",
        steps: [
            "Research vegan recipes and meal plans",
            "Shop for vegan ingredients",
            "Try one vegan meal per day first",
            "Explore plant-based proteins",
            "Join online vegan communities",
            "Cook and share vegan dishes",
            "Document your favorite recipes"
        ],
        tips: [
            "Begin with meals you already enjoy",
            "Stock your pantry with staples",
            "Try local vegan restaurants",
            "Connect with other vegans"
        ],
        co2Saved: 15,
        waterSaved: 2700,
        plasticReduced: 0.5
    },
    {
        id: 5,
        title: "Energy Saving Challenge",
        emoji: "⚡",
        category: "energy",
        difficulty: "easy",
        duration: "7 days",
        points: 30,
        description: "Reduce energy consumption by 30%. Use LED bulbs, unplug devices, and optimize heating/cooling.",
        impact: "Saves ~5kg CO2, reduces bills by ~15%",
        steps: [
            "Audit your energy usage",
            "Replace incandescent bulbs with LEDs",
            "Unplug devices when not in use",
            "Adjust thermostat settings",
            "Use natural light during the day",
            "Run full loads in appliances",
            "Monitor and track savings"
        ],
        tips: [
            "Use a power meter to identify energy hogs",
            "Set reminders to turn off lights",
            "Program smart thermostats",
            "Use cold water for laundry"
        ],
        co2Saved: 5,
        waterSaved: 100,
        plasticReduced: 0
    },
    {
        id: 6,
        title: "Water Conservation Week",
        emoji: "💧",
        category: "water",
        difficulty: "medium",
        duration: "7 days",
        points: 35,
        description: "Reduce daily water consumption by 50%. Short showers, fix leaks, and collect rainwater.",
        impact: "Saves ~3,500L water, reduces strain on local aquifers",
        steps: [
            "Install low-flow showerheads",
            "Take 5-minute showers",
            "Fix any leaking taps",
            "Full loads for laundry and dishes",
            "Collect rainwater for plants",
            "Use a broom instead of hosing",
            "Track water usage daily"
        ],
        tips: [
            "Check for hidden leaks",
            "Install dual-flush toilets",
            "Water plants in early morning",
            "Keep a bucket in shower"
        ],
        co2Saved: 2,
        waterSaved: 3500,
        plasticReduced: 0.2
    },
    {
        id: 7,
        title: "Sustainable Fashion Challenge",
        emoji: "👕",
        category: "fashion",
        difficulty: "hard",
        duration: "30 days",
        points: 60,
        description: "Only wear secondhand or sustainable clothing for a month. Embrace slow fashion and reduce textile waste.",
        impact: "Saves ~23kg CO2, prevents landfill waste, supports circular economy",
        steps: [
            "Audit your current wardrobe",
            "Visit thrift and vintage stores",
            "Explore sustainable fashion brands",
            "Swap clothes with friends",
            "Repair or upcycle worn items",
            "Wear the same 30 pieces all month",
            "Document your daily outfits"
        ],
        tips: [
            "Quality matters over quantity",
            "Learn basic sewing and repair",
            "Support local tailors",
            "Invest in versatile pieces"
        ],
        co2Saved: 23,
        waterSaved: 500,
        plasticReduced: 1
    },
    {
        id: 8,
        title: "Meat-Free Monday",
        emoji: "🥗",
        category: "food",
        difficulty: "easy",
        duration: "4 weeks",
        points: 25,
        description: "Skip meat every Monday for a month. Discover vegetarian recipes and reduce your carbon footprint.",
        impact: "Monthly: Saves ~2kg CO2, 540L water per person",
        steps: [
            "Plan vegetarian meals for Mondays",
            "Explore diverse protein sources",
            "Try new recipes each week",
            "Share meals with family",
            "Document your favorites",
            "Calculate your impact",
            "Inspire others to join"
        ],
        tips: [
            "Prepare in advance on Sunday",
            "Combine beans and grains",
            "Use colorful seasonal vegetables",
            "Experiment with global cuisines"
        ],
        co2Saved: 2,
        waterSaved: 540,
        plasticReduced: 0.3
    },
    {
        id: 9,
        title: "Digital Detox Week",
        emoji: "📵",
        category: "energy",
        difficulty: "medium",
        duration: "7 days",
        points: 40,
        description: "Reduce screen time by 50%. Limit device usage to save energy and improve well-being.",
        impact: "Saves ~3kg CO2, improves sleep and mental health",
        steps: [
            "Calculate current screen time",
            "Set daily time limits",
            "Create phone-free zones",
            "Use e-readers instead of tablets",
            "Unplug devices overnight",
            "Spend time outdoors",
            "Practice meditation or reading"
        ],
        tips: [
            "Use app blockers for accountability",
            "Replace screen time with hobbies",
            "Charge devices less frequently",
            "Join a digital detox group"
        ],
        co2Saved: 3,
        waterSaved: 50,
        plasticReduced: 0
    },
    {
        id: 10,
        title: "Community Cleanup Challenge",
        emoji: "🧹",
        category: "community",
        difficulty: "easy",
        duration: "1 day",
        points: 30,
        description: "Organize or participate in a community cleanup. Collect litter and beautify your local area.",
        impact: "Removes ~10kg waste, improves community health",
        steps: [
            "Find a local cleanup event or organize your own",
            "Gather supplies (gloves, bags, grabbers)",
            "Recruit friends and family",
            "Clean a park, beach, or street",
            "Sort waste for recycling",
            "Document progress with photos",
            "Thank volunteers and celebrate"
        ],
        tips: [
            "Focus on accessible areas first",
            "Bring water and snacks",
            "Wear protective equipment",
            "Make it fun with music and games"
        ],
        co2Saved: 1,
        waterSaved: 20,
        plasticReduced: 10
    },
    {
        id: 11,
        title: "Composting Challenge",
        emoji: "🌱",
        category: "zero-waste",
        difficulty: "medium",
        duration: "7 days",
        points: 35,
        description: "Start composting organic waste. Learn to create nutrient-rich compost for gardens.",
        impact: "Prevents ~2.5kg waste, reduces methane emissions, enriches soil",
        steps: [
            "Choose composting method (bin, pile, vermi)",
            "Collect green and brown materials",
            "Layer compostable items",
            "Maintain moisture and aeration",
            "Monitor decomposition",
            "Use finished compost in garden",
            "Track waste diverted"
        ],
        tips: [
            "Start with easy-to-compost items",
            "Keep a balanced ratio of materials",
            "Turn pile regularly for faster decomposition",
            "Share finished compost with neighbors"
        ],
        co2Saved: 3,
        waterSaved: 200,
        plasticReduced: 2.5
    },
    {
        id: 12,
        title: "Local Shopping Challenge",
        emoji: "🛒",
        category: "community",
        difficulty: "easy",
        duration: "2 weeks",
        points: 30,
        description: "Buy only from local businesses and farmers markets. Support your community and reduce transport emissions.",
        impact: "Saves ~8kg CO2, supports local economy, reduces packaging",
        steps: [
            "Find local farmers markets and shops",
            "Plan meals around seasonal produce",
            "Build relationships with local farmers",
            "Buy loose produce without packaging",
            "Support local artisans",
            "Track where your money goes",
            "Share local business recommendations"
        ],
        tips: [
            "Go early for best selection",
            "Bring reusable bags and containers",
            "Learn about seasonal produce",
            "Join a local CSA program"
        ],
        co2Saved: 8,
        waterSaved: 300,
        plasticReduced: 1.5
    },
    {
        id: 13,
        title: "Car-Free Week",
        emoji: "🚫🚗",
        category: "transport",
        difficulty: "hard",
        duration: "7 days",
        points: 50,
        description: "Skip driving entirely for a week. Use public transport, walk, bike, or carpool.",
        impact: "Saves ~75kg CO2, improves urban air quality",
        steps: [
            "Plan alternative transportation routes",
            "Get public transport pass",
            "Calculate estimated savings",
            "Use walking or biking when possible",
            "Try carpooling arrangements",
            "Experience different mobility options",
            "Track emissions avoided"
        ],
        tips: [
            "Start on a good weather week",
            "Use transit apps for navigation",
            "Leave extra travel time",
            "Combine multiple transport modes"
        ],
        co2Saved: 75,
        waterSaved: 100,
        plasticReduced: 0.5
    },
    {
        id: 14,
        title: "DIY Cleaning Products",
        emoji: "🧴",
        category: "zero-waste",
        difficulty: "easy",
        duration: "2 weeks",
        points: 25,
        description: "Make your own cleaning products using vinegar, baking soda, and lemon. Reduce plastic waste and toxic chemicals.",
        impact: "Eliminates ~1kg plastic packaging, reduces chemical waste",
        steps: [
            "Learn simple recipes (vinegar, baking soda, lemon)",
            "Gather ingredients and containers",
            "Make all-purpose, glass, and floor cleaners",
            "Test effectiveness on different surfaces",
            "Switch to DIY products completely",
            "Share recipes with family",
            "Calculate cost savings"
        ],
        tips: [
            "Use glass bottles for storage",
            "Label all products clearly",
            "Adjust recipes for preference",
            "Grow lemon trees for supply"
        ],
        co2Saved: 2,
        waterSaved: 50,
        plasticReduced: 1
    },
    {
        id: 15,
        title: "Refill Station Challenge",
        emoji: "🔄",
        category: "zero-waste",
        difficulty: "easy",
        duration: "1 month",
        points: 35,
        description: "Switch to refillable containers for shampoo, soap, and other toiletries. Reduce packaging waste.",
        impact: "Prevents ~2kg plastic waste per month",
        steps: [
            "Find local refill stations",
            "Invest in reusable containers",
            "Switch to bar soaps and shampoos",
            "Buy in bulk from zero-waste shops",
            "Join refill loyalty programs",
            "Track packaging saved",
            "Recommend stations to others"
        ],
        tips: [
            "Check ingredient quality",
            "Buy in bulk for savings",
            "Travel with refillable bottles",
            "Support sustainable brands"
        ],
        co2Saved: 2,
        waterSaved: 100,
        plasticReduced: 2
    },
    {
        id: 16,
        title: "Home Garden Challenge",
        emoji: "🌿",
        category: "food",
        difficulty: "medium",
        duration: "ongoing",
        points: 40,
        description: "Start growing your own vegetables, herbs, or flowers. From windowsill to backyard garden.",
        impact: "Saves food miles, reduces packaging, increases biodiversity",
        steps: [
            "Choose growing space (balcony/yard/windowsill)",
            "Start with easy plants (herbs, lettuce)",
            "Buy seeds online or local",
            "Prepare soil and containers",
            "Water and maintain regularly",
            "Harvest and enjoy fresh produce",
            "Share surplus with neighbors"
        ],
        tips: [
            "Start with perennials",
            "Compost on-site if possible",
            "Use rainwater for irrigation",
            "Attract pollinators with flowers"
        ],
        co2Saved: 10,
        waterSaved: 500,
        plasticReduced: 2
    },
    {
        id: 17,
        title: "Secondhand Wardrobe Week",
        emoji: "👚",
        category: "fashion",
        difficulty: "easy",
        duration: "7 days",
        points: 25,
        description: "Shop only secondhand for a week. Discover unique pieces and support circular fashion.",
        impact: "Saves ~10kg CO2, reduces textile waste",
        steps: [
            "Visit thrift stores and vintage shops",
            "Explore online secondhand platforms",
            "Swap clothes with friends",
            "Upcycle old pieces",
            "Take before and after photos",
            "Calculate your savings",
            "Share thrifting tips"
        ],
        tips: [
            "Check quality before buying",
            "Learn basic alteration skills",
            "Build unique personal style",
            "Support social enterprises"
        ],
        co2Saved: 10,
        waterSaved: 300,
        plasticReduced: 0.5
    },
    {
        id: 18,
        title: "Minimal Packaging Challenge",
        emoji: "📦",
        category: "zero-waste",
        difficulty: "hard",
        duration: "2 weeks",
        points: 45,
        description: "Buy only items with minimal or zero packaging. Reduce waste and consumption.",
        impact: "Prevents ~3kg packaging waste",
        steps: [
            "Audit current shopping habits",
            "Find bulk stores and farmers markets",
            "Bring reusable bags and containers",
            "Buy loose fruits and vegetables",
            "Choose glass over plastic",
            "Avoid overpackaged processed foods",
            "Support packaging-free businesses"
        ],
        tips: [
            "Plan meals before shopping",
            "Keep inventory of favorite items",
            "Join bulk buying groups",
            "Grow some food yourself"
        ],
        co2Saved: 5,
        waterSaved: 200,
        plasticReduced: 3
    },
    {
        id: 19,
        title: "Month Without Takeout",
        emoji: "🍽️",
        category: "food",
        difficulty: "medium",
        duration: "30 days",
        points: 50,
        description: "Cook all meals at home for a month. Save money, reduce waste, and improve health.",
        impact: "Saves ~8kg CO2, prevents packaging waste",
        steps: [
            "Plan weekly menus",
            "Shop for ingredients",
            "Learn new cooking techniques",
            "Prep meals in advance",
            "Cook from scratch daily",
            "Share meals with others",
            "Calculate money saved"
        ],
        tips: [
            "Batch cook on weekends",
            "Master a few versatile recipes",
            "Use seasonal ingredients",
            "Organize your kitchen for efficiency"
        ],
        co2Saved: 8,
        waterSaved: 500,
        plasticReduced: 5
    },
    {
        id: 20,
        title: "Eco-Friendly Workspace",
        emoji: "🖥️",
        category: "community",
        difficulty: "easy",
        duration: "2 weeks",
        points: 30,
        description: "Make your workspace more sustainable. Digital filing, energy-saving, plant-based.",
        impact: "Reduces office waste, improves air quality",
        steps: [
            "Go digital for documents",
            "Switch to refillable pens",
            "Bring a reusable water bottle",
            "Add plants to workspace",
            "Turn off equipment when idle",
            "Use natural light",
            "Encourage colleagues to join"
        ],
        tips: [
            "Use double-sided printing only when needed",
            "Organize paperless filing system",
            "Share resources with coworkers",
            "Host sustainability challenges at work"
        ],
        co2Saved: 3,
        waterSaved: 100,
        plasticReduced: 1
    },
    {
        id: 21,
        title: "Solar Power Trial",
        emoji: "☀️",
        category: "energy",
        difficulty: "hard",
        duration: "ongoing",
        points: 60,
        description: "Investigate and install solar power solutions. From solar chargers to panel installation.",
        impact: "Reduces grid electricity by 20-40%, saves ~200kg CO2 annually",
        steps: [
            "Research solar options for home",
            "Get quotes from installers",
            "Install solar chargers for gadgets",
            "Learn about battery storage",
            "Monitor energy production",
            "Calculate ROI",
            "Share experience with neighbors"
        ],
        tips: [
            "Check roof orientation and shade",
            "Research local incentives",
            "Start with small solutions",
            "Join solar community groups"
        ],
        co2Saved: 200,
        waterSaved: 50,
        plasticReduced: 0.5
    },
    {
        id: 22,
        title: "Zero Paper Challenge",
        emoji: "📱",
        category: "zero-waste",
        difficulty: "medium",
        duration: "1 month",
        points: 35,
        description: "Go paperless. Digital bills, documents, and journaling only.",
        impact: "Saves ~5 trees, prevents 20kg CO2 emissions",
        steps: [
            "Switch to digital bills",
            "Scan and organize documents",
            "Use digital note-taking apps",
            "Unsubscribe from paper mail",
            "Use digital receipts",
            "Go digital for gift cards",
            "Track paper usage daily"
        ],
        tips: [
            "Keep digital backups",
            "Use cloud storage",
            "Go paperless at work too",
            "Teach family members"
        ],
        co2Saved: 20,
        waterSaved: 200,
        plasticReduced: 0.2
    },
    {
        id: 23,
        title: "Plant-Based Protein Week",
        emoji: "🥗",
        category: "food",
        difficulty: "easy",
        duration: "7 days",
        points: 25,
        description: "Explore plant-based proteins. Beans, lentils, tofu, nuts, and seeds.",
        impact: "Saves ~5kg CO2, 1,000L water compared to meat",
        steps: [
            "Research plant protein sources",
            "Try beans and lentils recipes",
            "Experiment with tofu and tempeh",
            "Include nuts and seeds daily",
            "Cook protein-packed meals",
            "Calculate nutrition intake",
            "Share favorite recipes"
        ],
        tips: [
            "Combine grains and legumes",
            "Sprout seeds for nutrition",
            "Learn traditional recipes",
            "Batch cook proteins"
        ],
        co2Saved: 5,
        waterSaved: 1000,
        plasticReduced: 0.3
    },
    {
        id: 24,
        title: "Plastic Bottle Ban",
        emoji: "🚫🍾",
        category: "zero-waste",
        difficulty: "easy",
        duration: "1 month",
        points: 30,
        description: "Never buy bottled water. Use refillable bottles and filtered tap water.",
        impact: "Prevents ~40 plastic bottles from waste, saves $50+",
        steps: [
            "Invest in quality water bottle",
            "Check water quality at home",
            "Install/use water filter if needed",
            "Always carry reusable bottle",
            "Refill at public fountains",
            "Buy beverages in glass/aluminium",
            "Track bottles saved"
        ],
        tips: [
            "Insulated bottles keep drinks cold",
            "Test tap water quality",
            "Join bottle-free communities",
            "Advocate for public water fountains"
        ],
        co2Saved: 8,
        waterSaved: 500,
        plasticReduced: 2
    },
    {
        id: 25,
        title: "Wildlife-Friendly Garden",
        emoji: "🦋",
        category: "community",
        difficulty: "medium",
        duration: "ongoing",
        points: 40,
        description: "Create habitat for pollinators and wildlife. Plant native flowers, avoid pesticides.",
        impact: "Supports biodiversity, improves local ecosystem health",
        steps: [
            "Research native plants for your region",
            "Plant flowers for pollinators",
            "Stop using pesticides and herbicides",
            "Create water sources",
            "Leave dead wood for insects",
            "Plant berries for birds",
            "Monitor and document wildlife"
        ],
        tips: [
            "Plant diverse flowering times",
            "Group plants by water needs",
            "Build bee hotels",
            "Keep some areas wild"
        ],
        co2Saved: 5,
        waterSaved: 200,
        plasticReduced: 1
    },
    {
        id: 26,
        title: "Textile Swap Challenge",
        emoji: "👕",
        category: "fashion",
        difficulty: "easy",
        duration: "1 event",
        points: 20,
        description: "Organize or participate in a clothing swap. Give new life to old clothes.",
        impact: "Keeps ~3kg textiles from landfills",
        steps: [
            "Gather unwanted clothing items",
            "Invite friends for swap party",
            "Set clear rules and guidelines",
            "Swap items fairly",
            "Donate unsold items",
            "Take event photos",
            "Plan next swap"
        ],
        tips: [
            "Host in person or online",
            "Quality items swap more easily",
            "Clean items before swap",
            "Make it fun with music"
        ],
        co2Saved: 20,
        waterSaved: 300,
        plasticReduced: 3
    },
    {
        id: 27,
        title: "Bulk Buying Spree",
        emoji: "🛍️",
        category: "zero-waste",
        difficulty: "easy",
        duration: "2 weeks",
        points: 25,
        description: "Buy staples in bulk to reduce packaging. Pantry staples, grains, spices, and more.",
        impact: "Prevents ~1kg packaging waste, saves money",
        steps: [
            "Find bulk stores in your area",
            "List non-perishable staples",
            "Bring reusable containers",
            "Calculate cost per unit",
            "Store properly at home",
            "Share bulk items with friends",
            "Track cost savings"
        ],
        tips: [
            "Join buying co-ops",
            "Store in glass containers",
            "Label everything clearly",
            "Buy only what you'll use"
        ],
        co2Saved: 2,
        waterSaved: 50,
        plasticReduced: 1
    },
    {
        id: 28,
        title: "Tree Planting Challenge",
        emoji: "🌳",
        category: "community",
        difficulty: "medium",
        duration: "ongoing",
        points: 45,
        description: "Plant trees in your community. Support reforestation efforts.",
        impact: "Each tree: 20kg CO2 sequestered over lifetime, habitat creation",
        steps: [
            "Find local reforestation groups",
            "Select native tree species",
            "Prepare planting area",
            "Plant trees properly",
            "Water and maintain",
            "Monitor growth",
            "Organize community plantings"
        ],
        tips: [
            "Plant in fall for best results",
            "Choose deep-rooted species",
            "Protect from animals",
            "Share updates with community"
        ],
        co2Saved: 20,
        waterSaved: 500,
        plasticReduced: 0
    },
    {
        id: 29,
        title: "Eco-Friendly Beauty",
        emoji: "💄",
        category: "zero-waste",
        difficulty: "easy",
        duration: "1 month",
        points: 30,
        description: "Switch to plastic-free beauty and personal care products. Natural alternatives that work.",
        impact: "Prevents packaging waste, reduces chemical pollution",
        steps: [
            "Audit current beauty products",
            "Find plastic-free alternatives",
            "Buy bars of soap and shampoo",
            "Make DIY skincare products",
            "Choose refillable options",
            "Reduce overall consumption",
            "Track packaging saved"
        ],
        tips: [
            "Less is more with skincare",
            "Multi-use products save space",
            "Learn to make basics",
            "Support non-toxic brands"
        ],
        co2Saved: 3,
        waterSaved: 100,
        plasticReduced: 1.5
    },
    {
        id: 30,
        title: "Sustainable Gifting",
        emoji: "🎁",
        category: "community",
        difficulty: "easy",
        duration: "1 month",
        points: 25,
        description: "Give sustainable gifts only. Secondhand, homemade, experiences, or eco-products.",
        impact: "Reduces consumption and waste, supports sustainable businesses",
        steps: [
            "Plan gifts in advance",
            "Shop secondhand first",
            "Make homemade gifts",
            "Give experiences",
            "Choose eco-friendly products",
            "Use sustainable packaging",
            "Share gift ideas with friends"
        ],
        tips: [
            "Experiences make lasting memories",
            "Homemade gifts are personal",
            "Reuse packaging materials",
            "Shop from sustainable businesses"
        ],
        co2Saved: 3,
        waterSaved: 100,
        plasticReduced: 0.5
    }
];

// Achievement Badges
const badges = [
    { id: 1, name: "Eco Starter", icon: "🌱", requirement: 50, color: "green" },
    { id: 2, name: "Green Guardian", icon: "🛡️", requirement: 200, color: "green" },
    { id: 3, name: "Zero Waste Hero", icon: "♻️", requirement: 150, color: "green" },
    { id: 4, name: "Energy Saver", icon: "⚡", requirement: 100, color: "yellow" },
    { id: 5, name: "Water Warrior", icon: "💧", requirement: 100, color: "blue" },
    { id: 6, name: "Bike Enthusiast", icon: "🚴", requirement: 75, color: "orange" },
    { id: 7, name: "Plant Lover", icon: "🌳", requirement: 50, color: "green" },
    { id: 8, name: "Plastic Free", icon: "🚫", requirement: 120, color: "red" },
    { id: 9, name: "Vegan Path", icon: "🌱", requirement: 100, color: "green" },
    { id: 10, name: "Community Champion", icon: "🤝", requirement: 200, color: "purple" }
];

// State Management
const state = {
    user: {
        id: 1,
        name: "Guest User",
        avatar: "👤",
        level: 1,
        points: 0,
        streak: 0,
        joined: new Date().toLocaleDateString(),
        badges: [],
        bio: "Passionate about sustainability",
        location: "Earth",
        lastCheckIn: null
    },
    challenges: [],
    activeChallenges: [],
    completedChallenges: [],
    teams: [],
    friends: [],
    history: [],
    stats: {
        co2Saved: 0,
        waterSaved: 0,
        plasticReduced: 0,
        energySaved: 0,
        treesSaved: 0
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadState();
    initializeApp();
});

function initializeApp() {
    // Populate challenges
    state.challenges = challenges;
    
    // Generate sample data
    generateSampleTeams();
    generateSampleFriends();
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial UI
    updateDashboard();
    renderChallenges(challenges);
    renderLeaderboard();
    updateProfile();
    renderBadges();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href');
            scrollToSection(section);
        });
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Filters
    document.getElementById('difficultyFilter').addEventListener('change', filterChallenges);
    document.getElementById('categoryFilter').addEventListener('change', filterChallenges);
    document.getElementById('statusFilter').addEventListener('change', filterChallenges);
    document.getElementById('searchChallenges').addEventListener('input', filterChallenges);

    // Daily check-in
    document.getElementById('checkinBtn').addEventListener('click', dailyCheckIn);

    // Leaderboard tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateLeaderboardTab(this.dataset.tab);
        });
    });

    // Profile actions
    document.getElementById('editProfileBtn').addEventListener('click', () => openModal('profileModal'));
    document.getElementById('shareProfileBtn').addEventListener('click', shareProfile);
    document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
    document.getElementById('cancelProfileBtn').addEventListener('click', () => closeModal('profileModal'));

    // Team actions
    document.getElementById('createTeamBtn').addEventListener('click', () => openModal('teamModal'));
    document.getElementById('createTeamFormBtn').addEventListener('click', createTeam);
    document.getElementById('cancelTeamBtn').addEventListener('click', () => closeModal('teamModal'));

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Modal backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

function updateDashboard() {
    const points = state.user.points;
    const completed = state.completedChallenges.length;
    const active = state.activeChallenges.length;

    document.getElementById('userPoints').textContent = points;
    document.getElementById('userStreak').textContent = state.user.streak;
    document.getElementById('userBadges').textContent = state.user.badges.length;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('activeCount').textContent = active;
    
    // Calculate and update impact
    const co2 = state.stats.co2Saved;
    const water = state.stats.waterSaved;
    const plastic = state.stats.plasticReduced;
    const trees = Math.floor(co2 / 20);

    document.getElementById('co2Saved').textContent = co2.toFixed(1);
    document.getElementById('waterSaved').textContent = water.toFixed(0);
    document.getElementById('plasticReduced').textContent = plastic.toFixed(1);
    document.getElementById('treesSaved').textContent = trees;

    // Update progress bars
    updateProgressBars();
}

function updateProgressBars() {
    const plastic = state.stats.plasticReduced;
    const plasticProgress = Math.min((plastic / 50) * 100, 100);
    document.querySelector('#plasticProgress')?.style.setProperty('--progress', plasticProgress + '%');

    const water = state.stats.waterSaved;
    const waterProgress = Math.min((water / 10000) * 100, 100);
    document.querySelector('#waterProgress')?.style.setProperty('--progress', waterProgress + '%');

    const energy = state.stats.energySaved;
    const energyProgress = Math.min((energy / 500) * 100, 100);
    document.querySelector('#energyProgress')?.style.setProperty('--progress', energyProgress + '%');
}

function renderChallenges(challengesToRender) {
    const grid = document.getElementById('challengesGrid');
    grid.innerHTML = '';

    challengesToRender.forEach(challenge => {
        const card = createChallengeCard(challenge);
        grid.appendChild(card);
    });
}

function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    
    const status = getChallengeStatus(challenge.id);
    const progress = getProgressPercentage(challenge.id);

    card.innerHTML = `
        <div class="challenge-header">
            <div class="challenge-emoji">${challenge.emoji}</div>
            <h3 class="challenge-title">${challenge.title}</h3>
            <span class="challenge-category">${challenge.category}</span>
        </div>
        <div class="challenge-body">
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-meta">
                <div class="meta-item">
                    <span class="difficulty-badge difficulty-${challenge.difficulty}">${challenge.difficulty.toUpperCase()}</span>
                </div>
                <div class="meta-item">
                    <span class="points-badge">+${challenge.points} pts</span>
                </div>
                <div class="meta-item">
                    <span>⏱️ ${challenge.duration}</span>
                </div>
            </div>
        </div>
        <div class="challenge-footer">
            <div class="challenge-progress">
                <p class="progress-label">${status}</p>
                <div class="progress-bar-small" style="--progress: ${progress}%;"></div>
            </div>
            <div class="challenge-action">
                <button class="btn btn-primary" onclick="openChallengeModal(${challenge.id})">Details</button>
                <button class="btn btn-secondary" onclick="shareChallengeToSocial(${challenge.id})">Share</button>
            </div>
        </div>
    `;

    return card;
}

function getChallengeStatus(id) {
    if (state.completedChallenges.includes(id)) return '✅ Completed';
    if (state.activeChallenges.includes(id)) return '🔄 In Progress';
    return '🔒 Available';
}

function getProgressPercentage(id) {
    if (state.completedChallenges.includes(id)) return 100;
    if (state.activeChallenges.includes(id)) return 65;
    return 0;
}

function openChallengeModal(id) {
    const challenge = challenges.find(c => c.id === id);
    if (!challenge) return;

    document.getElementById('modalChallengeTitle').textContent = challenge.title;
    document.getElementById('modalDifficulty').textContent = challenge.difficulty.toUpperCase();
    document.getElementById('modalDifficulty').className = `difficulty-badge difficulty-${challenge.difficulty}`;
    document.getElementById('modalCategory').textContent = challenge.category;
    document.getElementById('modalPoints').textContent = `+${challenge.points}`;
    document.getElementById('modalDuration').textContent = challenge.duration;
    document.getElementById('modalDescription').textContent = challenge.description;
    document.getElementById('modalImpact').textContent = challenge.impact;

    const stepsList = document.getElementById('modalSteps');
    stepsList.innerHTML = '';
    challenge.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
    });

    const tipsList = document.getElementById('modalTips');
    tipsList.innerHTML = '';
    challenge.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });

    const btn = document.getElementById('modalActionBtn');
    if (state.completedChallenges.includes(id)) {
        btn.textContent = '✅ Completed';
        btn.disabled = true;
    } else if (state.activeChallenges.includes(id)) {
        btn.textContent = 'Track Progress';
        btn.onclick = () => openProgressModal(id);
    } else {
        btn.textContent = 'Start Challenge';
        btn.onclick = () => startChallenge(id);
        btn.disabled = false;
    }

    document.getElementById('modalShareBtn').onclick = () => shareChallengeToSocial(id);

    openModal('challengeModal');
}

function openProgressModal(id) {
    const challenge = challenges.find(c => c.id === id);
    document.getElementById('progressChallengeTitle').textContent = challenge.title;
    document.getElementById('progressSlider').value = 0;
    document.getElementById('progressPercent').textContent = '0%';
    document.getElementById('progressNotes').value = '';

    document.getElementById('completeBtn').onclick = () => completeChallenge(id);
    document.getElementById('saveProgressBtn').onclick = () => saveProgress(id);

    closeModal('challengeModal');
    openModal('progressModal');
}

function startChallenge(id) {
    if (!state.activeChallenges.includes(id)) {
        state.activeChallenges.push(id);
        state.user.points += 5; // Starting bonus
        updateDashboard();
        renderChallenges(filterActiveChallenges());
        showNotification('Challenge started! Keep going 💪');
    }
    closeModal('challengeModal');
}

function completeChallenge(id) {
    const challenge = challenges.find(c => c.id === id);
    
    if (!state.completedChallenges.includes(id)) {
        state.completedChallenges.push(id);
        state.activeChallenges = state.activeChallenges.filter(c => c !== id);

        // Add points
        state.user.points += challenge.points;

        // Update impact stats
        state.stats.co2Saved += challenge.co2Saved;
        state.stats.waterSaved += challenge.waterSaved;
        state.stats.plasticReduced += challenge.plasticReduced;

        // Add to history
        state.history.unshift({
            id: challenge.id,
            title: challenge.title,
            date: new Date().toLocaleDateString(),
            points: challenge.points
        });

        // Check for badges
        checkBadges();

        // Update streak
        updateStreak();

        updateDashboard();
        renderChallenges(state.challenges);
        updateLeaderboard();
        showNotification(`🎉 Challenge Complete! +${challenge.points} points!`);
    }
    closeModal('progressModal');
}

function saveProgress(id) {
    const notes = document.getElementById('progressNotes').value;
    const progress = document.getElementById('progressSlider').value;
    showNotification(`Progress saved! ${progress}% complete`);
}

function filterChallenges() {
    const difficulty = document.getElementById('difficultyFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const status = document.getElementById('statusFilter').value;
    const search = document.getElementById('searchChallenges').value.toLowerCase();

    let filtered = challenges.filter(c => {
        let match = true;
        if (difficulty && c.difficulty !== difficulty) match = false;
        if (category && c.category !== category) match = false;
        if (search && !c.title.toLowerCase().includes(search)) match = false;

        if (status === 'active') match = match && state.activeChallenges.includes(c.id);
        if (status === 'completed') match = match && state.completedChallenges.includes(c.id);
        if (status === 'available') match = match && !state.activeChallenges.includes(c.id) && !state.completedChallenges.includes(c.id);

        return match;
    });

    renderChallenges(filtered);
}

function filterActiveChallenges() {
    return challenges.filter(c => state.activeChallenges.includes(c.id));
}

function dailyCheckIn() {
    const today = new Date().toLocaleDateString();
    
    if (state.user.lastCheckIn === today) {
        showNotification('Already checked in today! Come back tomorrow.');
        return;
    }

    state.user.lastCheckIn = today;
    state.user.points += 10;
    state.user.streak += 1;

    updateDashboard();
    showNotification('✅ Checked in! +10 points & +1 streak');
}

function renderLeaderboard() {
    renderLeaderboardContent();
}

function renderLeaderboardContent() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';

    // Generate sample leaderboard
    const leaderboard = [
        { rank: 1, name: 'Eco Champion', points: 1250, streaks: 45, impact: 'High' },
        { rank: 2, name: 'Green Guardian', points: 1100, streaks: 38, impact: 'High' },
        { rank: 3, name: 'Nature Lover', points: 950, streaks: 32, impact: 'Medium' },
        { rank: 4, name: 'Bio Warrior', points: 850, streaks: 28, impact: 'Medium' },
        { rank: 5, name: 'Your Name', points: state.user.points, streaks: state.user.streak, impact: 'Growing' }
    ];

    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '•';
        const rankClass = `rank-${entry.rank}`;

        row.innerHTML = `
            <td><span class="leaderboard-rank ${rankClass}">${medal} ${entry.rank}</span></td>
            <td>
                <div class="user-badge">
                    <div class="user-avatar">${entry.name.charAt(0)}</div>
                    <span>${entry.name}</span>
                </div>
            </td>
            <td><strong>${entry.points}</strong></td>
            <td>🔥 ${entry.streaks}</td>
            <td>${entry.impact}</td>
        `;
        tbody.appendChild(row);
    });
}

function updateLeaderboardTab(tab) {
    renderLeaderboardContent();
}

function updateLeaderboard() {
    renderLeaderboard();
}

function updateProfile() {
    document.getElementById('userName').textContent = state.user.name;
    document.getElementById('userLevel').textContent = `Level ${state.user.level} - Eco Enthusiast`;
    document.getElementById('userJoined').textContent = `Joined ${state.user.joined}`;
    document.getElementById('userAvatar').textContent = state.user.avatar;

    // Render history
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    state.history.slice(0, 10).forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-info">
                <h4>${item.title}</h4>
                <p class="history-date">${item.date}</p>
            </div>
            <div class="history-status">+${item.points} pts</div>
        `;
        historyList.appendChild(div);
    });

    renderTeams();
}

function generateSampleTeams() {
    state.teams = [
        { id: 1, name: 'Eco Warriors', members: 5, points: 500, goal: 'Zero Waste' },
        { id: 2, name: 'Green Thumbs', members: 3, points: 300, goal: 'Gardening' }
    ];
}

function renderTeams() {
    const teamsList = document.getElementById('teamsList');
    teamsList.innerHTML = '';

    state.teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="team-name">${team.name}</div>
            <p class="team-members">👥 ${team.members} members</p>
            <p class="team-points">⭐ ${team.points} team points</p>
            <div class="team-actions">
                <button class="btn btn-secondary">View</button>
                <button class="btn btn-secondary">Chat</button>
            </div>
        `;
        teamsList.appendChild(card);
    });
}

function generateSampleFriends() {
    state.friends = [
        { id: 1, name: 'Alex Green', status: 'Active', points: 450 },
        { id: 2, name: 'Emma Earth', status: 'Active', points: 380 },
        { id: 3, name: 'Sam Nature', status: 'Offline', points: 320 }
    ];
}

function renderBadges() {
    const badgesGrid = document.getElementById('badgesGrid');
    badgesGrid.innerHTML = '';

    badges.forEach(badge => {
        const isUnlocked = state.user.badges.includes(badge.id);
        const badgeEl = document.createElement('div');
        badgeEl.className = `badge ${isUnlocked ? '' : 'badge-locked'}`;
        badgeEl.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            ${!isUnlocked ? `<small>${badge.requirement} pts needed</small>` : ''}
        `;
        badgesGrid.appendChild(badgeEl);
    });
}

function checkBadges() {
    badges.forEach(badge => {
        if (!state.user.badges.includes(badge.id) && state.user.points >= badge.requirement) {
            state.user.badges.push(badge.id);
            renderBadges();
            showNotification(`🏆 New Badge Unlocked: ${badge.name}!`);
        }
    });
}

function updateStreak() {
    state.user.level = Math.floor(state.user.points / 200) + 1;
}

function createTeam() {
    const name = document.getElementById('teamName').value;
    const desc = document.getElementById('teamDesc').value;
    const goal = document.getElementById('teamGoal').value;

    if (!name || !desc) {
        showNotification('Please fill in all fields');
        return;
    }

    const newTeam = {
        id: state.teams.length + 1,
        name: name,
        members: 1,
        points: 0,
        goal: goal
    };

    state.teams.push(newTeam);
    renderTeams();
    closeModal('teamModal');
    showNotification('🎉 Team created successfully!');
}

function saveProfile() {
    const name = document.getElementById('editName').value;
    const bio = document.getElementById('editBio').value;
    const avatar = document.getElementById('editAvatar').value;
    const location = document.getElementById('editLocation').value;

    if (!name) {
        showNotification('Name is required');
        return;
    }

    state.user.name = name;
    state.user.bio = bio;
    if (avatar) state.user.avatar = avatar;
    state.user.location = location;

    updateProfile();
    closeModal('profileModal');
    showNotification('✅ Profile updated!');
}

function shareProfile() {
    const text = `Check out my sustainability journey on EcoLife! I've earned ${state.user.points} green points and maintained a ${state.user.streak}-day streak! 🌍`;
    shareToPlatforms(text);
}

function shareChallengeToSocial(id) {
    const challenge = challenges.find(c => c.id === id);
    const text = `Just took on the "${challenge.title}" challenge on EcoLife! Join me in making a positive environmental impact! 🌱 #EcoLife #Sustainability`;
    shareToPlatforms(text);
}

function shareToPlatforms(text) {
    const encodedText = encodeURIComponent(text);
    const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`,
        whatsapp: `https://wa.me/?text=${encodedText}`
    };

    showNotification('💬 Share options available on social media!');
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
    }
}

function scrollToSection(id) {
    const section = document.querySelector(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function showNotification(message) {
    // Simple notification (can be enhanced)
    console.log('✅', message);
    // Could integrate with a toast library
}

function saveState() {
    localStorage.setItem('challengeHubState', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('challengeHubState');
    if (savedState) {
        Object.assign(state, JSON.parse(savedState));
    }
}

// Auto-save state
setInterval(saveState, 10000);

// Add progress bar styling
const style = document.createElement('style');
style.textContent = `
    .progress-bar::after {
        width: var(--progress, 35%) !important;
    }
    .progress-bar-small::after {
        width: var(--progress, 0%) !important;
    }
`;
document.head.appendChild(style);
