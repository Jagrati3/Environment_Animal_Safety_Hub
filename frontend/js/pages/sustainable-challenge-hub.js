/* ===================================
   Sustainable Challenge Hub JavaScript
   =================================== */

// ==================== Data Models ====================

/**
 * Challenge Library - 30+ Pre-built Challenges
 */
const CHALLENGE_LIBRARY = [
    // Transportation Challenges
    {
        id: 'bike-week',
        title: 'Bike to Work Week',
        subtitle: 'Ditch the car, ride your bike!',
        category: 'transportation',
        icon: '🚴',
        difficulty: 'intermediate',
        duration: 7,
        description: 'Commit to biking to work or errands for an entire week. Reduce emissions while getting fit!',
        why: 'Transportation accounts for 29% of greenhouse gas emissions. Biking eliminates emissions entirely.',
        tips: ['Plan your route ahead', 'Check weather forecasts', 'Invest in good lights and gear', 'Start with shorter distances'],
        impact: {
            co2Saved: 45,
            moneySaved: 60,
            waterSaved: 0,
            wasteDiverted: 0
        },
        points: 500,
        participants: 2847,
        featured: true
    },
    {
        id: 'no-drive-week',
        title: 'Car-Free Challenge',
        subtitle: 'One week without driving',
        category: 'transportation',
        icon: '🚶',
        difficulty: 'expert',
        duration: 7,
        description: 'Go completely car-free for a week. Use public transit, bike, walk, or carpool only.',
        why: 'A single week of car-free living can save significant emissions and show you sustainable alternatives.',
        tips: ['Research public transit routes', 'Coordinate with carpool buddies', 'Walk short distances', 'Plan errands efficiently'],
        impact: {
            co2Saved: 68,
            moneySaved: 85,
            waterSaved: 0,
            wasteDiverted: 0
        },
        points: 750,
        participants: 1523,
        featured: false
    },
    {
        id: 'carpool-challenge',
        title: 'Carpool Champion',
        subtitle: 'Share rides, reduce emissions',
        category: 'transportation',
        icon: '🚗',
        difficulty: 'beginner',
        duration: 14,
        description: 'Organize carpools for your commute. Cut emissions by sharing rides with colleagues or neighbors.',
        why: 'Carpooling can reduce your carbon footprint by up to 50% on commute days.',
        tips: ['Use carpool apps', 'Create a schedule rotation', 'Split gas costs', 'Be punctual'],
        impact: {
            co2Saved: 35,
            moneySaved: 45,
            waterSaved: 0,
            wasteDiverted: 0
        },
        points: 400,
        participants: 3421,
        featured: false
    },
    
    // Energy Challenges
    {
        id: 'energy-fast',
        title: '7-Day Energy Fast',
        subtitle: 'Minimize electricity usage',
        category: 'energy',
        icon: '💡',
        difficulty: 'intermediate',
        duration: 7,
        description: 'Reduce your electricity consumption by 50% for a week. Unplug, conserve, and go unplugged!',
        why: 'Electricity generation is responsible for 25% of global greenhouse gas emissions.',
        tips: ['Unplug devices when not in use', 'Use natural light during day', 'Turn off lights in empty rooms', 'Reduce AC/heating usage'],
        impact: {
            co2Saved: 28,
            moneySaved: 35,
            waterSaved: 50,
            wasteDiverted: 0
        },
        points: 450,
        participants: 2156,
        featured: true
    },
    {
        id: 'thermostat-challenge',
        title: 'Smart Thermostat Challenge',
        subtitle: 'Optimize your home temperature',
        category: 'energy',
        icon: '🌡️',
        difficulty: 'beginner',
        duration: 30,
        description: 'Adjust your thermostat to save energy. 68°F in winter, 78°F in summer for a month.',
        why: 'Heating and cooling account for nearly half of home energy use.',
        tips: ['Use programmable thermostats', 'Wear layers in winter', 'Use fans in summer', 'Close vents in unused rooms'],
        impact: {
            co2Saved: 92,
            moneySaved: 120,
            waterSaved: 200,
            wasteDiverted: 0
        },
        points: 600,
        participants: 4521,
        featured: false
    },
    {
        id: 'solar-simulation',
        title: 'Renewable Energy Week',
        subtitle: 'Power your life with renewables',
        category: 'energy',
        icon: '☀️',
        difficulty: 'intermediate',
        duration: 7,
        description: 'Switch to renewable energy sources or simulate the impact by offsetting your usage.',
        why: 'Renewable energy is key to reducing climate change impact.',
        tips: ['Research renewable energy providers', 'Consider rooftop solar', 'Use solar chargers', 'Support green energy initiatives'],
        impact: {
            co2Saved: 55,
            moneySaved: 40,
            waterSaved: 100,
            wasteDiverted: 0
        },
        points: 550,
        participants: 1876,
        featured: false
    },
    
    // Food Challenges
    {
        id: 'meatless-week',
        title: 'Meatless Monday+',
        subtitle: 'Plant-based eating for a week',
        category: 'food',
        icon: '🥗',
        difficulty: 'intermediate',
        duration: 7,
        description: 'Go completely plant-based for 7 days. Discover delicious vegan and vegetarian meals!',
        why: 'Animal agriculture produces 14.5% of global greenhouse gas emissions.',
        tips: ['Plan meals in advance', 'Try new recipes', 'Stock up on plant proteins', 'Join online vegan communities'],
        impact: {
            co2Saved: 42,
            moneySaved: 50,
            waterSaved: 450,
            wasteDiverted: 8
        },
        points: 500,
        participants: 5623,
        featured: true
    },
    {
        id: 'food-waste-warrior',
        title: 'Zero Food Waste Challenge',
        subtitle: 'Save every last bite',
        category: 'food',
        icon: '🍽️',
        difficulty: 'beginner',
        duration: 14,
        description: 'Eliminate food waste for two weeks. Meal plan, use leftovers creatively, compost scraps.',
        why: 'Food waste in landfills produces methane, a potent greenhouse gas.',
        tips: ['Create meal plans', 'Store food properly', 'Use leftovers creatively', 'Compost food scraps'],
        impact: {
            co2Saved: 25,
            moneySaved: 80,
            waterSaved: 200,
            wasteDiverted: 15
        },
        points: 400,
        participants: 3987,
        featured: false
    },
    {
        id: 'local-food-week',
        title: 'Eat Local Challenge',
        subtitle: 'Support local farmers',
        category: 'food',
        icon: '🥕',
        difficulty: 'intermediate',
        duration: 7,
        description: 'Buy only locally-sourced food for a week. Visit farmers markets and local producers.',
        why: 'Local food reduces transportation emissions and supports your local economy.',
        tips: ['Find local farmers markets', 'Join CSA programs', 'Check food origins', 'Plan seasonal meals'],
        impact: {
            co2Saved: 18,
            moneySaved: 30,
            waterSaved: 100,
            wasteDiverted: 5
        },
        points: 450,
        participants: 2765,
        featured: false
    },
    
    // Waste Challenges
    {
        id: 'zero-waste-week',
        title: 'Zero Waste Warrior',
        subtitle: 'Generate no trash for a week',
        category: 'waste',
        icon: '♻️',
        difficulty: 'expert',
        duration: 7,
        description: 'Challenge yourself to produce zero waste. Refuse, reduce, reuse, recycle, and compost everything!',
        why: 'Americans generate 4.5 pounds of trash per day. We can do better!',
        tips: ['Bring reusable bags and containers', 'Buy in bulk', 'Choose package-free products', 'Compost organic waste'],
        impact: {
            co2Saved: 22,
            moneySaved: 40,
            waterSaved: 150,
            wasteDiverted: 30
        },
        points: 800,
        participants: 1234,
        featured: true
    },
    {
        id: 'plastic-free-month',
        title: 'Plastic-Free Challenge',
        subtitle: 'Eliminate single-use plastics',
        category: 'waste',
        icon: '🚫',
        difficulty: 'intermediate',
        duration: 30,
        description: 'Go plastic-free for a month. No single-use plastics, from bags to bottles to straws.',
        why: 'Only 9% of plastic ever produced has been recycled. Most ends up in landfills and oceans.',
        tips: ['Use reusable water bottles', 'Bring cloth shopping bags', 'Choose glass containers', 'Refuse plastic straws'],
        impact: {
            co2Saved: 35,
            moneySaved: 55,
            waterSaved: 300,
            wasteDiverted: 25
        },
        points: 700,
        participants: 4123,
        featured: false
    },
    {
        id: 'recycling-master',
        title: 'Recycling Master',
        subtitle: 'Perfect your recycling habits',
        category: 'waste',
        icon: '♻️',
        difficulty: 'beginner',
        duration: 14,
        description: 'Master proper recycling techniques. Clean, sort, and recycle everything correctly.',
        why: 'Proper recycling can reduce waste to landfills by 75%.',
        tips: ['Learn local recycling rules', 'Clean containers before recycling', 'Remove caps and lids', 'Flatten cardboard boxes'],
        impact: {
            co2Saved: 15,
            moneySaved: 25,
            waterSaved: 100,
            wasteDiverted: 20
        },
        points: 350,
        participants: 5234,
        featured: false
    },
    
    // Water Challenges
    {
        id: 'water-warrior',
        title: 'Water Conservation Challenge',
        subtitle: 'Save every drop',
        category: 'water',
        icon: '💧',
        difficulty: 'intermediate',
        duration: 14,
        description: 'Reduce water usage by 30% for two weeks. Shorter showers, fix leaks, efficient appliances.',
        why: 'Freshwater is only 3% of Earth\'s water. Conservation is critical.',
        tips: ['Take 5-minute showers', 'Fix leaky faucets', 'Turn off water while brushing teeth', 'Run full loads only'],
        impact: {
            co2Saved: 12,
            moneySaved: 45,
            waterSaved: 800,
            wasteDiverted: 0
        },
        points: 450,
        participants: 3456,
        featured: false
    },
    {
        id: 'shower-challenge',
        title: 'Navy Shower Challenge',
        subtitle: 'Master the art of short showers',
        category: 'water',
        icon: '🚿',
        difficulty: 'beginner',
        duration: 7,
        description: 'Take Navy-style showers: wet, turn off water, soap up, rinse. Under 5 minutes!',
        why: 'A typical shower uses 17 gallons of water. Navy showers use less than 3 gallons.',
        tips: ['Set a timer', 'Turn water off while soaping', 'Use a water-saving showerhead', 'Make it a game'],
        impact: {
            co2Saved: 8,
            moneySaved: 30,
            waterSaved: 500,
            wasteDiverted: 0
        },
        points: 300,
        participants: 4567,
        featured: false
    },
    
    // Shopping Challenges
    {
        id: 'secondhand-week',
        title: 'Secondhand September',
        subtitle: 'Buy only used items',
        category: 'shopping',
        icon: '🛍️',
        difficulty: 'intermediate',
        duration: 30,
        description: 'Buy nothing new for a month. Shop thrift stores, consignment shops, and online marketplaces.',
        why: 'The fashion industry is responsible for 10% of global carbon emissions.',
        tips: ['Visit thrift stores', 'Use online marketplaces', 'Attend swap events', 'Upcycle and repair items'],
        impact: {
            co2Saved: 48,
            moneySaved: 150,
            waterSaved: 600,
            wasteDiverted: 12
        },
        points: 600,
        participants: 2890,
        featured: false
    },
    {
        id: 'minimal-consumption',
        title: 'Minimal Consumption Challenge',
        subtitle: 'Buy only essentials',
        category: 'shopping',
        icon: '🎯',
        difficulty: 'expert',
        duration: 30,
        description: 'Purchase only absolute necessities for a month. No impulse buys, no wants—only needs.',
        why: 'Overconsumption drives environmental destruction. Less is more!',
        tips: ['Create a needs list', 'Wait 24 hours before any purchase', 'Borrow or rent instead', 'Fix what you have'],
        impact: {
            co2Saved: 65,
            moneySaved: 300,
            waterSaved: 400,
            wasteDiverted: 15
        },
        points: 750,
        participants: 1567,
        featured: false
    },
    {
        id: 'ethical-shopping',
        title: 'Ethical Shopping Week',
        subtitle: 'Support sustainable brands',
        category: 'shopping',
        icon: '🌱',
        difficulty: 'beginner',
        duration: 7,
        description: 'Choose certified sustainable and ethical brands. Research companies before buying.',
        why: 'Your purchasing power can drive companies to adopt sustainable practices.',
        tips: ['Look for certifications', 'Research brand values', 'Choose quality over quantity', 'Support local businesses'],
        impact: {
            co2Saved: 20,
            moneySaved: 40,
            waterSaved: 200,
            wasteDiverted: 8
        },
        points: 400,
        participants: 3234,
        featured: false
    },
    
    // Nature Challenges
    {
        id: 'tree-planting',
        title: 'Tree Planting Challenge',
        subtitle: 'Plant trees for the future',
        category: 'nature',
        icon: '🌳',
        difficulty: 'beginner',
        duration: 3,
        description: 'Plant at least 5 trees over 3 days. Join local tree-planting events or plant in your yard.',
        why: 'Trees absorb CO₂, provide oxygen, and support biodiversity.',
        tips: ['Join local planting events', 'Choose native species', 'Plant in appropriate seasons', 'Care for saplings'],
        impact: {
            co2Saved: 100,
            moneySaved: 20,
            waterSaved: 0,
            wasteDiverted: 0
        },
        points: 500,
        participants: 4123,
        featured: true
    },
    {
        id: 'garden-growing',
        title: 'Start Your Garden',
        subtitle: 'Grow your own food',
        category: 'nature',
        icon: '🌱',
        difficulty: 'intermediate',
        duration: 30,
        description: 'Start a vegetable garden. Even small spaces work—balcony, windowsill, or backyard!',
        why: 'Home gardens reduce food miles and provide fresh, organic produce.',
        tips: ['Start with easy plants', 'Use compost for soil', 'Water consistently', 'Research companion planting'],
        impact: {
            co2Saved: 30,
            moneySaved: 100,
            waterSaved: 150,
            wasteDiverted: 10
        },
        points: 600,
        participants: 2876,
        featured: false
    },
    {
        id: 'pollinator-garden',
        title: 'Pollinator Paradise',
        subtitle: 'Plant for bees and butterflies',
        category: 'nature',
        icon: '🦋',
        difficulty: 'beginner',
        duration: 7,
        description: 'Create a pollinator-friendly garden with native flowers. Support bees, butterflies, and birds!',
        why: 'Pollinators are crucial for food production—1 in 3 bites of food depends on them.',
        tips: ['Choose native wildflowers', 'Avoid pesticides', 'Provide water sources', 'Plant in clusters'],
        impact: {
            co2Saved: 15,
            moneySaved: 30,
            waterSaved: 50,
            wasteDiverted: 0
        },
        points: 400,
        participants: 3456,
        featured: false
    },
    
    // Social Challenges
    {
        id: 'volunteer-week',
        title: 'Volunteer for the Planet',
        subtitle: 'Give back to your community',
        category: 'social',
        icon: '🤝',
        difficulty: 'beginner',
        duration: 7,
        description: 'Volunteer at environmental organizations. Beach cleanups, park maintenance, education programs.',
        why: 'Community action multiplies individual impact.',
        tips: ['Find local environmental groups', 'Bring friends and family', 'Document your impact', 'Share your experience'],
        impact: {
            co2Saved: 10,
            moneySaved: 0,
            waterSaved: 0,
            wasteDiverted: 50
        },
        points: 450,
        participants: 4567,
        featured: false
    },
    {
        id: 'community-cleanup',
        title: 'Community Cleanup Day',
        subtitle: 'Clean up your neighborhood',
        category: 'social',
        icon: '🧹',
        difficulty: 'beginner',
        duration: 3,
        description: 'Organize or join a community cleanup. Remove litter from parks, beaches, or streets.',
        why: 'Litter harms wildlife and pollutes waterways. Every piece counts!',
        tips: ['Bring gloves and bags', 'Invite friends', 'Target problem areas', 'Sort recyclables'],
        impact: {
            co2Saved: 5,
            moneySaved: 0,
            waterSaved: 0,
            wasteDiverted: 40
        },
        points: 350,
        participants: 5678,
        featured: false
    },
    {
        id: 'eco-education',
        title: 'Eco-Educator Challenge',
        subtitle: 'Teach others about sustainability',
        category: 'social',
        icon: '📚',
        difficulty: 'intermediate',
        duration: 14,
        description: 'Share environmental knowledge. Host workshops, create content, or mentor someone.',
        why: 'Education is the foundation of lasting change.',
        tips: ['Start social media accounts', 'Create infographics', 'Host local talks', 'Be positive and inspiring'],
        impact: {
            co2Saved: 0,
            moneySaved: 0,
            waterSaved: 0,
            wasteDiverted: 0
        },
        points: 500,
        participants: 2345,
        featured: false
    },

    // Additional Challenges
    {
        id: 'digital-declutter',
        title: 'Digital Carbon Cleanse',
        subtitle: 'Reduce digital emissions',
        category: 'energy',
        icon: '💻',
        difficulty: 'beginner',
        duration: 7,
        description: 'Clean up digital waste. Delete old emails, unused apps, and files. Reduce streaming quality.',
        why: 'Data centers consume massive energy. Digital cleanliness reduces your carbon footprint.',
        tips: ['Delete old emails', 'Unsubscribe from newsletters', 'Clear cloud storage', 'Stream at lower quality'],
        impact: {
            co2Saved: 8,
            moneySaved: 10,
            waterSaved: 20,
            wasteDiverted: 0
        },
        points: 300,
        participants: 3890,
        featured: false
    },
    {
        id: 'paperless-month',
        title: 'Paperless Pledge',
        subtitle: 'Go completely digital',
        category: 'waste',
        icon: '📄',
        difficulty: 'beginner',
        duration: 30,
        description: 'Eliminate paper usage. Digital bills, notes, and documents only for a month.',
        why: 'Paper production contributes to deforestation and generates emissions.',
        tips: ['Switch to e-bills', 'Use digital note-taking', 'Cancel junk mail', 'Refuse receipts'],
        impact: {
            co2Saved: 18,
            moneySaved: 25,
            waterSaved: 300,
            wasteDiverted: 12
        },
        points: 400,
        participants: 4234,
        featured: false
    },
    {
        id: 'sustainable-commute',
        title: 'Sustainable Commute Month',
        subtitle: 'Green your daily travel',
        category: 'transportation',
        icon: '🚆',
        difficulty: 'intermediate',
        duration: 30,
        description: 'Use only sustainable transport for a month. Public transit, bike, walk, or carpool.',
        why: 'Daily commutes are a major source of personal carbon emissions.',
        tips: ['Get a transit pass', 'Map out bike routes', 'Coordinate carpools', 'Work from home when possible'],
        impact: {
            co2Saved: 125,
            moneySaved: 180,
            waterSaved: 0,
            wasteDiverted: 0
        },
        points: 850,
        participants: 2678,
        featured: false
    },
    {
        id: 'composting-start',
        title: 'Start Composting',
        subtitle: 'Turn waste into gold',
        category: 'waste',
        icon: '🌱',
        difficulty: 'beginner',
        duration: 14,
        description: 'Begin composting food scraps. Set up a bin and learn what can be composted.',
        why: 'Composting diverts waste from landfills and creates nutrient-rich soil.',
        tips: ['Get a compost bin', 'Learn greens vs browns', 'Turn compost regularly', 'Use finished compost in garden'],
        impact: {
            co2Saved: 20,
            moneySaved: 30,
            waterSaved: 100,
            wasteDiverted: 35
        },
        points: 400,
        participants: 3567,
        featured: false
    },
    {
        id: 'energy-audit',
        title: 'Home Energy Audit',
        subtitle: 'Find and fix energy leaks',
        category: 'energy',
        icon: '🔍',
        difficulty: 'intermediate',
        duration: 7,
        description: 'Conduct a home energy audit. Identify inefficiencies and make improvements.',
        why: 'Homes waste 25-30% of energy through inefficiencies.',
        tips: ['Check for air leaks', 'Inspect insulation', 'Test appliance efficiency', 'Seal gaps and cracks'],
        impact: {
            co2Saved: 35,
            moneySaved: 80,
            waterSaved: 50,
            wasteDiverted: 0
        },
        points: 500,
        participants: 2123,
        featured: false
    },
    {
        id: 'reusable-everything',
        title: 'Reusable Revolution',
        subtitle: 'Replace disposables with reusables',
        category: 'waste',
        icon: '🔄',
        difficulty: 'beginner',
        duration: 14,
        description: 'Switch to reusable alternatives. Bags, bottles, containers, utensils—everything!',
        why: 'Single-use items create unnecessary waste and pollution.',
        tips: ['Invest in quality reusables', 'Keep them accessible', 'Clean regularly', 'Refuse disposables'],
        impact: {
            co2Saved: 22,
            moneySaved: 60,
            waterSaved: 200,
            wasteDiverted: 18
        },
        points: 400,
        participants: 4890,
        featured: false
    }
];

/**
 * Badge Definitions
 */
const BADGES = [
    { id: 'first-challenge', name: 'First Steps', icon: '🌱', requirement: 'complete-1', unlocked: false },
    { id: 'early-adopter', name: 'Early Adopter', icon: '⭐', requirement: 'complete-5', unlocked: false },
    { id: 'committed', name: 'Committed', icon: '💚', requirement: 'complete-10', unlocked: false },
    { id: 'champion', name: 'Champion', icon: '🏆', requirement: 'complete-25', unlocked: false },
    { id: 'legend', name: 'Legend', icon: '👑', requirement: 'complete-50', unlocked: false },
    { id: 'week-streak', name: '7-Day Streak', icon: '🔥', requirement: 'streak-7', unlocked: false },
    { id: 'month-streak', name: '30-Day Streak', icon: '🔥🔥', requirement: 'streak-30', unlocked: false },
    { id: 'hundred-streak', name: '100-Day Streak', icon: '💯', requirement: 'streak-100', unlocked: false },
    { id: 'transport-master', name: 'Transport Master', icon: '🚴', requirement: 'category-transportation-5', unlocked: false },
    { id: 'energy-guru', name: 'Energy Guru', icon: '💡', requirement: 'category-energy-5', unlocked: false },
    { id: 'food-hero', name: 'Food Hero', icon: '🥗', requirement: 'category-food-5', unlocked: false },
    { id: 'waste-warrior', name: 'Waste Warrior', icon: '♻️', requirement: 'category-waste-5', unlocked: false },
    { id: 'water-saver', name: 'Water Saver', icon: '💧', requirement: 'category-water-5', unlocked: false },
    { id: 'shopping-saint', name: 'Shopping Saint', icon: '🛍️', requirement: 'category-shopping-5', unlocked: false },
    { id: 'nature-lover', name: 'Nature Lover', icon: '🌳', requirement: 'category-nature-5', unlocked: false },
    { id: 'social-star', name: 'Social Star', icon: '🤝', requirement: 'category-social-5', unlocked: false },
    { id: 'point-collector', name: 'Point Collector', icon: '⭐', requirement: 'points-1000', unlocked: false },
    { id: 'point-master', name: 'Point Master', icon: '✨', requirement: 'points-5000', unlocked: false },
    { id: 'point-legend', name: 'Point Legend', icon: '💫', requirement: 'points-10000', unlocked: false },
    { id: 'sharer', name: 'Sharer', icon: '📤', requirement: 'share-5', unlocked: false },
    { id: 'beginner-complete', name: 'Beginner Master', icon: '🌱', requirement: 'difficulty-beginner-10', unlocked: false },
    { id: 'intermediate-complete', name: 'Intermediate Pro', icon: '🌿', requirement: 'difficulty-intermediate-10', unlocked: false },
    { id: 'expert-complete', name: 'Expert Legend', icon: '🌳', requirement: 'difficulty-expert-5', unlocked: false },
    { id: 'quick-starter', name: 'Quick Starter', icon: '⚡', requirement: 'complete-3-day', unlocked: false },
    { id: 'week-warrior', name: 'Week Warrior', icon: '📅', requirement: 'complete-7-day', unlocked: false },
    { id: 'month-champion', name: 'Month Champion', icon: '📆', requirement: 'complete-30-day', unlocked: false },
    { id: 'perfect-week', name: 'Perfect Week', icon: '💯', requirement: 'checkin-7-consecutive', unlocked: false },
    { id: 'early-bird', name: 'Early Bird', icon: '🌅', requirement: 'checkin-before-9am-10', unlocked: false },
    { id: 'night-owl', name: 'Night Owl', icon: '🦉', requirement: 'checkin-after-9pm-10', unlocked: false },
    { id: 'community-builder', name: 'Community Builder', icon: '👥', requirement: 'invite-5-friends', unlocked: false }
];

// ==================== State Management ====================

class ChallengeManager {
    constructor() {
        this.challenges = CHALLENGE_LIBRARY;
        this.activeChallenges = this.loadActiveChallenges();
        this.completedChallenges = this.loadCompletedChallenges();
        this.userData = this.loadUserData();
        this.badges = this.loadBadges();
        this.leaderboard = this.generateLeaderboard();
    }

    // LocalStorage Management
    loadActiveChallenges() {
        const stored = localStorage.getItem('slc_active_challenges');
        return stored ? JSON.parse(stored) : [];
    }

    saveActiveChallenges() {
        localStorage.setItem('slc_active_challenges', JSON.stringify(this.activeChallenges));
    }

    loadCompletedChallenges() {
        const stored = localStorage.getItem('slc_completed_challenges');
        return stored ? JSON.parse(stored) : [];
    }

    saveCompletedChallenges() {
        localStorage.setItem('slc_completed_challenges', JSON.stringify(this.completedChallenges));
    }

    loadUserData() {
        const stored = localStorage.getItem('slc_user_data');
        return stored ? JSON.parse(stored) : {
            name: 'Eco Warrior',
            level: 1,
            greenPoints: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalCheckins: 0,
            lastCheckinDate: null,
            joinDate: new Date().toISOString(),
            impact: {
                co2Saved: 0,
                moneySaved: 0,
                waterSaved: 0,
                wasteDiverted: 0
            }
        };
    }

    saveUserData() {
        localStorage.setItem('slc_user_data', JSON.stringify(this.userData));
    }

    loadBadges() {
        const stored = localStorage.getItem('slc_badges');
        return stored ? JSON.parse(stored) : BADGES;
    }

    saveBadges() {
        localStorage.setItem('slc_badges', JSON.stringify(this.badges));
    }

    // Challenge Management
    joinChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return false;

        // Check if already joined
        if (this.activeChallenges.some(c => c.id === challengeId)) {
            showToast('You\'re already in this challenge!');
            return false;
        }

        const activeChallenge = {
            ...challenge,
            startDate: new Date().toISOString(),
            progress: 0,
            checkins: [],
            currentStreak: 0,
            notes: []
        };

        this.activeChallenges.push(activeChallenge);
        this.saveActiveChallenges();
        
        showToast('🎉 Challenge joined! Let\'s make a difference!');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        return true;
    }

    checkIn(challengeId, note = '', photo = null) {
        const challenge = this.activeChallenges.find(c => c.id === challengeId);
        if (!challenge) return false;

        const today = new Date().toISOString().split('T')[0];
        
        // Check if already checked in today
        if (challenge.checkins.some(c => c.date === today)) {
            showToast('Already checked in today!');
            return false;
        }

        // Add check-in
        challenge.checkins.push({
            date: today,
            timestamp: new Date().toISOString(),
            note: note,
            photo: photo
        });

        // Update progress
        challenge.progress = Math.min(100, (challenge.checkins.length / challenge.duration) * 100);

        // Update streak
        this.updateStreak(challenge);

        // Update user data
        this.userData.totalCheckins++;
        this.updateUserStreak();

        // Check if completed
        if (challenge.progress >= 100) {
            this.completeChallenge(challengeId);
        }

        this.saveActiveChallenges();
        this.saveUserData();

        showToast('✅ Check-in successful! Keep it up!');
        
        return true;
    }

    updateStreak(challenge) {
        const checkins = challenge.checkins.sort((a, b) => new Date(a.date) - new Date(b.date));
        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let i = checkins.length - 1; i >= 0; i--) {
            const checkinDate = new Date(checkins[i].date);
            checkinDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((currentDate - checkinDate) / (1000 * 60 * 60 * 24));

            if (diffDays === streak) {
                streak++;
            } else {
                break;
            }
        }

        challenge.currentStreak = streak;
    }

    updateUserStreak() {
        const lastCheckin = this.userData.lastCheckinDate ? new Date(this.userData.lastCheckinDate) : null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (lastCheckin) {
            lastCheckin.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((today - lastCheckin) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day
                this.userData.currentStreak++;
            } else if (diffDays > 1) {
                // Streak broken
                this.userData.currentStreak = 1;
            }
            // If diffDays === 0, already checked in today (should not happen, but handle gracefully)
        } else {
            // First check-in
            this.userData.currentStreak = 1;
        }

        this.userData.lastCheckinDate = today.toISOString();
        
        if (this.userData.currentStreak > this.userData.longestStreak) {
            this.userData.longestStreak = this.userData.currentStreak;
        }

        this.checkBadges();
    }

    completeChallenge(challengeId) {
        const challengeIndex = this.activeChallenges.findIndex(c => c.id === challengeId);
        if (challengeIndex === -1) return false;

        const challenge = this.activeChallenges[challengeIndex];
        
        // Add to completed
        this.completedChallenges.push({
            ...challenge,
            completedDate: new Date().toISOString()
        });

        // Award points
        const pointsEarned = this.calculatePoints(challenge);
        this.userData.greenPoints += pointsEarned;

        // Update impact
        this.userData.impact.co2Saved += challenge.impact.co2Saved || 0;
        this.userData.impact.moneySaved += challenge.impact.moneySaved || 0;
        this.userData.impact.waterSaved += challenge.impact.waterSaved || 0;
        this.userData.impact.wasteDiverted += challenge.impact.wasteDiverted || 0;

        // Update level
        this.updateLevel();

        // Remove from active
        this.activeChallenges.splice(challengeIndex, 1);

        this.saveActiveChallenges();
        this.saveCompletedChallenges();
        this.saveUserData();
        this.checkBadges();

        // Celebration
        showToast(`🎉 Challenge Complete! +${pointsEarned} points!`);
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });

        return true;
    }

    calculatePoints(challenge) {
        let points = challenge.points || 0;
        
        // Difficulty multiplier
        if (challenge.difficulty === 'expert') {
            points *= 2;
        } else if (challenge.difficulty === 'intermediate') {
            points *= 1.5;
        }

        // Streak bonus
        if (challenge.currentStreak >= 7) {
            points += 100;
        }
        if (challenge.currentStreak >= 30) {
            points += 500;
        }

        return Math.round(points);
    }

    updateLevel() {
        const newLevel = Math.floor(this.userData.greenPoints / 1000) + 1;
        if (newLevel > this.userData.level) {
            this.userData.level = newLevel;
            showToast(`🎊 Level Up! You're now Level ${newLevel}!`);
        }
    }

    checkBadges() {
        const completed = this.completedChallenges.length;
        const points = this.userData.greenPoints;
        const streak = this.userData.currentStreak;

        // Update badges
        this.badges.forEach(badge => {
            if (badge.unlocked) return;

            let unlock = false;

            // Completion badges
            if (badge.requirement === 'complete-1' && completed >= 1) unlock = true;
            if (badge.requirement === 'complete-5' && completed >= 5) unlock = true;
            if (badge.requirement === 'complete-10' && completed >= 10) unlock = true;
            if (badge.requirement === 'complete-25' && completed >= 25) unlock = true;
            if (badge.requirement === 'complete-50' && completed >= 50) unlock = true;

            // Streak badges
            if (badge.requirement === 'streak-7' && streak >= 7) unlock = true;
            if (badge.requirement === 'streak-30' && streak >= 30) unlock = true;
            if (badge.requirement === 'streak-100' && streak >= 100) unlock = true;

            // Points badges
            if (badge.requirement === 'points-1000' && points >= 1000) unlock = true;
            if (badge.requirement === 'points-5000' && points >= 5000) unlock = true;
            if (badge.requirement === 'points-10000' && points >= 10000) unlock = true;

            // Category badges
            const categories = ['transportation', 'energy', 'food', 'waste', 'water', 'shopping', 'nature', 'social'];
            categories.forEach(cat => {
                const catCompleted = this.completedChallenges.filter(c => c.category === cat).length;
                if (badge.requirement === `category-${cat}-5` && catCompleted >= 5) unlock = true;
            });

            if (unlock) {
                badge.unlocked = true;
                showToast(`🏆 Badge Unlocked: ${badge.name}!`);
            }
        });

        this.saveBadges();
    }

    generateLeaderboard() {
        // Generate simulated leaderboard data
        const leaderboard = [];
        const names = ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez', 'Emma Williams', 'David Kim', 'Lisa Anderson', 'James Taylor', 'Maria Garcia', 'You'];
        
        for (let i = 0; i < 100; i++) {
            leaderboard.push({
                rank: i + 1,
                name: i === 50 ? 'You' : names[Math.floor(Math.random() * (names.length - 1))],
                points: i === 50 ? this.userData.greenPoints : Math.max(100, 15000 - (i * 100) + Math.random() * 500),
                challenges: Math.floor(Math.random() * 30) + 1,
                streak: Math.floor(Math.random() * 50),
                avatar: `https://i.pravatar.cc/150?img=${i + 1}`
            });
        }

        // Sort by points
        leaderboard.sort((a, b) => b.points - a.points);
        
        // Update ranks
        leaderboard.forEach((user, index) => {
            user.rank = index + 1;
        });

        return leaderboard;
    }

    getUserRank() {
        return this.leaderboard.find(u => u.name === 'You')?.rank || '--';
    }

    getFilteredChallenges(category, difficulty, duration, searchTerm) {
        return this.challenges.filter(challenge => {
            if (category !== 'all' && challenge.category !== category) return false;
            if (difficulty !== 'all' && challenge.difficulty !== difficulty) return false;
            if (duration !== 'all' && challenge.duration !== parseInt(duration)) return false;
            if (searchTerm && !challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                !challenge.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });
    }
}

// ==================== UI Management ====================

class UIManager {
    constructor(challengeManager) {
        this.challengeManager = challengeManager;
        this.currentTab = 'discover';
        this.filters = {
            category: 'all',
            difficulty: 'all',
            duration: 'all',
            search: '',
            sort: 'popular'
        };
    }

    init() {
        this.setupEventListeners();
        this.renderHeroStats();
        this.renderDiscoverTab();
        this.renderActiveTab();
        this.renderLeaderboardTab();
        this.renderProfileTab();
        this.applyTheme();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Filter controls
        document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.renderDiscoverTab();
        });

        document.getElementById('difficultyFilter')?.addEventListener('change', (e) => {
            this.filters.difficulty = e.target.value;
            this.renderDiscoverTab();
        });

        document.getElementById('durationFilter')?.addEventListener('change', (e) => {
            this.filters.duration = e.target.value;
            this.renderDiscoverTab();
        });

        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.renderDiscoverTab();
        });

        document.getElementById('sortBy')?.addEventListener('change', (e) => {
            this.filters.sort = e.target.value;
            this.renderDiscoverTab();
        });

        // FAB
        document.getElementById('quickAddFab')?.addEventListener('click', () => {
            this.toggleFabMenu();
        });

        // Check-in submit
        document.getElementById('submitCheckinBtn')?.addEventListener('click', () => {
            this.submitCheckin();
        });

        // Today's date
        document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}Tab`);
        });

        this.currentTab = tabName;

        // Refresh tab content
        if (tabName === 'active') this.renderActiveTab();
        if (tabName === 'leaderboard') this.renderLeaderboardTab();
        if (tabName === 'profile') this.renderProfileTab();
    }

    renderHeroStats() {
        const stats = this.challengeManager.userData;
        const activeChallenges = this.challengeManager.activeChallenges.length;
        const badges = this.challengeManager.badges.filter(b => b.unlocked).length;

        document.getElementById('heroTotalChallenges').textContent = activeChallenges;
        document.getElementById('heroCurrentStreak').textContent = stats.currentStreak;
        document.getElementById('heroGreenPoints').textContent = stats.greenPoints.toLocaleString();
        document.getElementById('heroBadges').textContent = badges;
    }

    renderDiscoverTab() {
        const filtered = this.challengeManager.getFilteredChallenges(
            this.filters.category,
            this.filters.difficulty,
            this.filters.duration,
            this.filters.search
        );

        // Sort challenges
        let sorted = [...filtered];
        if (this.filters.sort === 'popular') {
            sorted.sort((a, b) => b.participants - a.participants);
        } else if (this.filters.sort === 'newest') {
            sorted.reverse();
        } else if (this.filters.sort === 'points') {
            sorted.sort((a, b) => b.points - a.points);
        } else if (this.filters.sort === 'difficulty') {
            const diffOrder = { beginner: 1, intermediate: 2, expert: 3 };
            sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
        }

        // Featured challenges
        const featured = sorted.filter(c => c.featured);
        this.renderChallenges(featured, 'featuredChallenges');

        // All challenges
        this.renderChallenges(sorted, 'allChallenges');

        // Update count
        document.getElementById('challengeCount').textContent = sorted.length;
    }

    renderChallenges(challenges, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = challenges.map(challenge => `
            <div class="challenge-card ${challenge.featured ? 'featured' : ''}" onclick="ui.showChallengeDetail('${challenge.id}')">
                <div class="challenge-header ${challenge.category}">
                    ${challenge.featured ? '<div class="challenge-badge">⭐ Featured</div>' : ''}
                    <div class="challenge-icon">${challenge.icon}</div>
                    <h3 class="challenge-title">${challenge.title}</h3>
                    <p class="challenge-subtitle">${challenge.subtitle}</p>
                </div>
                <div class="challenge-body">
                    <p class="challenge-description">${challenge.description}</p>
                    <div class="challenge-meta">
                        <div class="meta-item">
                            <i class="fas fa-signal"></i>
                            <span>${this.capitalizeFirst(challenge.difficulty)}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${challenge.duration} days</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>${challenge.participants.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="challenge-stats">
                        <div class="stat-box">
                            <div class="stat-box-value"><i class="fas fa-star"></i>${challenge.points}</div>
                            <div class="stat-box-label">Points</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-value">${challenge.impact.co2Saved}kg</div>
                            <div class="stat-box-label">CO₂ Saved</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-value">$${challenge.impact.moneySaved}</div>
                            <div class="stat-box-label">Saved</div>
                        </div>
                    </div>
                    <div class="challenge-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); ui.joinChallenge('${challenge.id}')">
                            <i class="fas fa-plus"></i>
                            Join Challenge
                        </button>
                        <button class="btn-icon-only" onclick="event.stopPropagation(); ui.shareChallenge('${challenge.id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderActiveTab() {
        const activeChallenges = this.challengeManager.activeChallenges;
        const emptyState = document.getElementById('noActiveChallenges');
        const container = document.getElementById('activeChallengesContainer');
        const list = document.getElementById('activeChallengesList');

        if (activeChallenges.length === 0) {
            emptyState.style.display = 'block';
            container.style.display = 'none';
            document.getElementById('activeCountBadge').textContent = '0';
            return;
        }

        emptyState.style.display = 'none';
        container.style.display = 'block';
        document.getElementById('activeCountBadge').textContent = activeChallenges.length;

        list.innerHTML = activeChallenges.map(challenge => {
            const daysLeft = challenge.duration - challenge.checkins.length;
            const today = new Date().toISOString().split('T')[0];
            const checkedInToday = challenge.checkins.some(c => c.date === today);

            return `
                <div class="active-challenge-card">
                    <div class="active-challenge-header">
                        <div class="active-challenge-info">
                            <div class="active-challenge-title">
                                <span class="challenge-icon">${challenge.icon}</span>
                                <h3>${challenge.title}</h3>
                            </div>
                            <div class="active-challenge-days">
                                ${daysLeft} days remaining • ${challenge.checkins.length}/${challenge.duration} check-ins
                            </div>
                        </div>
                        <div class="streak-display">
                            <i class="fas fa-fire"></i>
                            <span>${challenge.currentStreak}</span>
                        </div>
                    </div>

                    <div class="progress-section">
                        <div class="progress-header">
                            <span>Progress</span>
                            <span class="progress-percentage">${Math.round(challenge.progress)}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${challenge.progress}%"></div>
                        </div>
                    </div>

                    <div class="checkin-grid">
                        ${this.renderCheckinDays(challenge)}
                    </div>

                    <div class="active-challenge-actions">
                        <button class="btn btn-primary" ${checkedInToday ? 'disabled' : ''} 
                                onclick="ui.openCheckinModal('${challenge.id}')">
                            <i class="fas fa-check"></i>
                            ${checkedInToday ? 'Checked In ✓' : 'Check In Today'}
                        </button>
                        <button class="btn btn-secondary" onclick="ui.viewChallengeProgress('${challenge.id}')">
                            <i class="fas fa-chart-line"></i>
                            View Progress
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderCheckinDays(challenge) {
        const days = [];
        const startDate = new Date(challenge.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < challenge.duration; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            date.setHours(0, 0, 0, 0);

            const dateStr = date.toISOString().split('T')[0];
            const checkedIn = challenge.checkins.some(c => c.date === dateStr);
            const isToday = date.getTime() === today.getTime();
            const isPast = date < today;
            const isFuture = date > today;

            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            let className = 'checkin-day';
            if (checkedIn) className += ' completed';
            if (isToday) className += ' today';

            let icon = '';
            if (checkedIn) icon = '<i class="fas fa-check day-icon"></i>';
            else if (isFuture) icon = '<i class="far fa-circle day-icon"></i>';
            else if (isPast) icon = '<i class="fas fa-times day-icon"></i>';

            days.push(`
                <div class="${className}">
                    <div class="day-label">${dayName}</div>
                    ${icon}
                </div>
            `);
        }

        return days.join('');
    }

    renderLeaderboardTab() {
        const userRank = this.challengeManager.getUserRank();
        const userData = this.challengeManager.userData;
        const leaderboard = this.challengeManager.leaderboard;

        // Update user rank card
        document.getElementById('userRank').textContent = userRank;
        document.getElementById('userPoints').textContent = userData.greenPoints.toLocaleString();
        
        const nextRank = leaderboard[userRank - 2];
        const pointsToNext = nextRank ? Math.max(0, Math.round(nextRank.points - userData.greenPoints)) : 0;
        document.getElementById('nextRankPoints').textContent = pointsToNext;
        document.getElementById('rankProgress').style.width = `${Math.min(100, (userData.greenPoints / (userData.greenPoints + pointsToNext)) * 100)}%`;

        // Render leaderboard list
        const list = document.getElementById('leaderboardList');
        list.innerHTML = leaderboard.slice(3, 20).map(user => `
            <div class="leaderboard-item ${user.name === 'You' ? 'highlight' : ''}">
                <div class="leaderboard-rank">${user.rank}</div>
                <img src="${user.avatar}" alt="${user.name}" class="leaderboard-avatar">
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${user.name}</div>
                    <div class="leaderboard-stats">
                        ${user.challenges} challenges • ${user.streak} day streak
                    </div>
                </div>
                <div class="leaderboard-points">
                    <i class="fas fa-star"></i>
                    ${Math.round(user.points).toLocaleString()}
                </div>
            </div>
        `).join('');
    }

    renderProfileTab() {
        const userData = this.challengeManager.userData;
        const completed = this.challengeManager.completedChallenges.length;
        const badges = this.challengeManager.badges;
        const unlockedBadges = badges.filter(b => b.unlocked).length;

        // Profile info
        document.getElementById('profileName').textContent = userData.name;
        document.getElementById('userLevel').textContent = userData.level;
        document.getElementById('userTitle').textContent = this.getLevelTitle(userData.level);
        document.getElementById('profileChallengesCompleted').textContent = completed;

        // Profile stats
        document.getElementById('profilePoints').textContent = userData.greenPoints.toLocaleString();
        document.getElementById('profileStreak').textContent = userData.currentStreak;
        document.getElementById('profileCompleted').textContent = completed;
        document.getElementById('profileBadges').textContent = unlockedBadges;

        // Impact
        document.getElementById('impactCO2').textContent = Math.round(userData.impact.co2Saved);
        document.getElementById('impactTrees').textContent = Math.round(userData.impact.co2Saved / 20);
        document.getElementById('impactWaste').textContent = Math.round(userData.impact.wasteDiverted);
        document.getElementById('impactBags').textContent = Math.round(userData.impact.wasteDiverted / 8);
        document.getElementById('impactWater').textContent = Math.round(userData.impact.waterSaved);
        document.getElementById('impactBottles').textContent = Math.round(userData.impact.waterSaved / 0.5);
        document.getElementById('impactMoney').textContent = Math.round(userData.impact.moneySaved);

        // Badges
        const badgesGrid = document.getElementById('badgesGrid');
        badgesGrid.innerHTML = badges.map(badge => `
            <div class="badge-item ${badge.unlocked ? '' : 'locked'}" title="${badge.name}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
            </div>
        `).join('');

        // Recent activity
        this.renderActivity();

        // Update badge count
        document.getElementById('badgeCount').textContent = unlockedBadges;
    }

    renderActivity() {
        const timeline = document.getElementById('activityTimeline');
        const recent = this.challengeManager.completedChallenges.slice(-5).reverse();

        if (recent.length === 0) {
            timeline.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No activity yet. Start a challenge!</p>';
            return;
        }

        timeline.innerHTML = recent.map(challenge => {
            const date = new Date(challenge.completedDate);
            const timeAgo = this.getTimeAgo(date);

            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        ${challenge.icon}
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Completed: ${challenge.title}</div>
                        <div class="activity-description">
                            Earned ${challenge.points} points • ${challenge.duration} days
                        </div>
                        <div class="activity-time">${timeAgo}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    showChallengeDetail(challengeId) {
        const challenge = this.challengeManager.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        const modal = document.getElementById('challengeModal');
        const detail = document.getElementById('challengeDetail');

        detail.innerHTML = `
            <div class="challenge-detail-header">
                <div class="challenge-detail-icon">${challenge.icon}</div>
                <h2 class="challenge-detail-title">${challenge.title}</h2>
                <p class="challenge-detail-subtitle">${challenge.subtitle}</p>
            </div>

            <div class="challenge-detail-body">
                <div class="detail-section">
                    <h3><i class="fas fa-info-circle"></i> Description</h3>
                    <p>${challenge.description}</p>
                </div>

                <div class="detail-section">
                    <h3><i class="fas fa-question-circle"></i> Why This Matters</h3>
                    <p>${challenge.why}</p>
                </div>

                <div class="detail-section">
                    <h3><i class="fas fa-lightbulb"></i> Tips for Success</h3>
                    <ul>
                        ${challenge.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>

                <div class="detail-section">
                    <h3><i class="fas fa-chart-line"></i> Expected Impact</h3>
                    <div class="challenge-stats">
                        <div class="stat-box">
                            <div class="stat-box-value">${challenge.impact.co2Saved}kg</div>
                            <div class="stat-box-label">CO₂ Saved</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-value">$${challenge.impact.moneySaved}</div>
                            <div class="stat-box-label">Money Saved</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-value">${challenge.impact.waterSaved}gal</div>
                            <div class="stat-box-label">Water Saved</div>
                        </div>
                    </div>
                </div>

                <div class="challenge-actions">
                    <button class="btn btn-primary" onclick="ui.joinChallenge('${challenge.id}'); closeModal('challengeModal')">
                        <i class="fas fa-plus"></i>
                        Join Challenge
                    </button>
                    <button class="btn btn-secondary" onclick="ui.shareChallenge('${challenge.id}')">
                        <i class="fas fa-share-alt"></i>
                        Share
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    joinChallenge(challengeId) {
        const success = this.challengeManager.joinChallenge(challengeId);
        if (success) {
            this.renderHeroStats();
            this.renderActiveTab();
            document.getElementById('activeCountBadge').textContent = this.challengeManager.activeChallenges.length;
        }
    }

    openCheckinModal(challengeId) {
        const challenge = this.challengeManager.activeChallenges.find(c => c.id === challengeId);
        if (!challenge) return;

        document.getElementById('checkinChallengeName').innerHTML = `
            <span style="font-size: 1.5rem;">${challenge.icon}</span>
            ${challenge.title}
        `;

        document.getElementById('checkinNote').value = '';
        const modal = document.getElementById('checkinModal');
        modal.classList.add('active');
        modal.dataset.challengeId = challengeId;
    }

    submitCheckin() {
        const modal = document.getElementById('checkinModal');
        const challengeId = modal.dataset.challengeId;
        const note = document.getElementById('checkinNote').value;

        const success = this.challengeManager.checkIn(challengeId, note);
        if (success) {
            closeModal('checkinModal');
            this.renderHeroStats();
            this.renderActiveTab();
        }
    }

    shareChallenge(challengeId) {
        const challenge = this.challengeManager.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        const shareText = `Join me in the "${challenge.title}" challenge! ${challenge.subtitle} 🌍 #SustainableLiving #EcoChallenge`;
        
        if (navigator.share) {
            navigator.share({
                title: challenge.title,
                text: shareText,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareText);
            showToast('📋 Challenge link copied to clipboard!');
        }
    }

    toggleFabMenu() {
        const menu = document.getElementById('fabMenu');
        menu.classList.toggle('active');
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('slc_theme', isDark ? 'dark' : 'light');
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    applyTheme() {
        const savedTheme = localStorage.getItem('slc_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            const icon = document.querySelector('#themeToggle i');
            if (icon) icon.className = 'fas fa-sun';
        }
    }

    // Utility methods
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getLevelTitle(level) {
        if (level >= 50) return 'Sustainability Legend';
        if (level >= 25) return 'Eco Champion';
        if (level >= 10) return 'Green Warrior';
        if (level >= 5) return 'Environmental Advocate';
        return 'Sustainability Beginner';
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
            }
        }

        return 'Just now';
    }

    viewChallengeProgress(challengeId) {
        this.showChallengeDetail(challengeId);
    }
}

// ==================== Utility Functions ====================

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

function showToast(message) {
    const toast = document.getElementById('successToast');
    const messageEl = document.getElementById('toastMessage');
    
    messageEl.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function switchTab(tabName) {
    if (window.ui) {
        window.ui.switchTab(tabName);
    }
}

function shareProgress() {
    const userData = challengeManager.userData;
    const shareText = `I've saved ${Math.round(userData.impact.co2Saved)}kg of CO₂ and earned ${userData.greenPoints} green points! Join me in making a difference! 🌍 #SustainableLiving`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Sustainability Journey',
            text: shareText,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareText);
        showToast('📋 Progress copied to clipboard!');
    }
}

// ==================== Initialize App ====================

let challengeManager;
let ui;

document.addEventListener('DOMContentLoaded', () => {
    challengeManager = new ChallengeManager();
    ui = new UIManager(challengeManager);
    ui.init();

    // Make ui globally accessible for onclick handlers
    window.ui = ui;
    window.challengeManager = challengeManager;

    console.log('🌍 Sustainable Living Challenge Hub loaded!');
    console.log(`Welcome back! You have ${challengeManager.activeChallenges.length} active challenges.`);
});
