/**
 * Eco-Hero Story Mode - Interactive Adventure Game
 * An immersive "Choose Your Own Adventure" style narrative game
 * where players make environmental decisions and see their consequences.
 */

// ===== GAME STATE =====
const gameState = {
    currentChapter: 0,
    currentScene: 0,
    ecoScore: 0,
    karma: 50, // 0-100, 50 is neutral
    choicesMade: [],
    badgesEarned: [],
    storyPath: [],
};

// ===== BADGE DEFINITIONS =====
const badges = {
    oceanDefender: {
        id: 'oceanDefender',
        name: 'Ocean Defender',
        icon: '🐬',
        description: 'Protected marine life from plastic pollution',
        requirement: 'Complete Chapter 1 with positive karma'
    },
    beachCleaner: {
        id: 'beachCleaner',
        name: 'Beach Cleaner',
        icon: '🏖️',
        description: 'Helped clean the plastic beach',
        requirement: 'Clean up all trash in Chapter 1'
    },
    airGuardian: {
        id: 'airGuardian',
        name: 'Air Guardian',
        icon: '💨',
        description: 'Fought against air pollution',
        requirement: 'Complete Chapter 2 with positive karma'
    },
    greenThumb: {
        id: 'greenThumb',
        name: 'Green Thumb',
        icon: '🌱',
        description: 'Planted trees to help the environment',
        requirement: 'Plant trees in any chapter'
    },
    wildlifeSavior: {
        id: 'wildlifeSavior',
        name: 'Wildlife Savior',
        icon: '🦊',
        description: 'Protected animals and their habitats',
        requirement: 'Complete Chapter 3 with positive karma'
    },
    ecoHero: {
        id: 'ecoHero',
        name: 'Eco Hero',
        icon: '🦸',
        description: 'True champion of the environment',
        requirement: 'Complete all chapters with 80+ karma'
    },
    recyclingChamp: {
        id: 'recyclingChamp',
        name: 'Recycling Champion',
        icon: '♻️',
        description: 'Master of waste management',
        requirement: 'Make all recycling choices correctly'
    },
    waterWarden: {
        id: 'waterWarden',
        name: 'Water Warden',
        icon: '💧',
        description: 'Saved precious water resources',
        requirement: 'Make water-saving choices'
    },
    energySaver: {
        id: 'energySaver',
        name: 'Energy Saver',
        icon: '⚡',
        description: 'Champion of renewable energy',
        requirement: 'Choose clean energy options'
    },
    natureFriend: {
        id: 'natureFriend',
        name: 'Nature Friend',
        icon: '🌿',
        description: 'Friend to all living things',
        requirement: 'Complete any chapter with 90+ karma'
    }
};

// ===== STORY CHAPTERS =====
const chapters = {
    1: {
        id: 1,
        title: 'The Plastic Beach',
        description: 'A beautiful beach is covered in plastic waste. Can you help clean it up and save the marine life?',
        scenes: [
            {
                id: 1,
                type: 'intro',
                background: 'scene-beach',
                characters: '🦸‍♀️🏖️',
                effects: null,
                narration: `You arrive at Coral Bay Beach, once known for its crystal-clear waters and golden sand. But today, something is terribly wrong. Plastic bottles, bags, and wrappers cover the shoreline as far as you can see. A sea turtle struggles in the waves, tangled in fishing line.`,
                dialogue: null,
                choices: [
                    {
                        text: 'Rush to help the turtle',
                        description: 'The turtle needs immediate help!',
                        icon: '🐢',
                        nextScene: 2,
                        ecoPoints: 15,
                        karmaChange: 10,
                        consequence: 'positive',
                        badge: null
                    },
                    {
                        text: 'Start picking up trash first',
                        description: 'Clean the beach to prevent more harm',
                        icon: '🗑️',
                        nextScene: 3,
                        ecoPoints: 10,
                        karmaChange: 5,
                        consequence: 'positive',
                        badge: null
                    }
                ]
            },
            {
                id: 2,
                type: 'action',
                background: 'scene-ocean',
                characters: '🦸‍♀️🐢',
                effects: 'sparkle',
                narration: `You wade into the shallow water and carefully free the turtle from the fishing line. It looks at you gratefully before swimming away. But wait - you notice there are more animals in trouble along the beach.`,
                dialogue: {
                    character: '🐢',
                    name: 'Grateful Turtle',
                    text: `Thank you, young hero! But my friends - the fish and crabs - they're in danger too. The plastic is everywhere in our home!`
                },
                choices: [
                    {
                        text: 'Organize a beach cleanup',
                        description: 'Rally others to help clean the beach',
                        icon: '👥',
                        nextScene: 4,
                        ecoPoints: 20,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: 'beachCleaner'
                    },
                    {
                        text: 'Set up recycling stations',
                        description: 'Create a system to sort the waste',
                        icon: '♻️',
                        nextScene: 5,
                        ecoPoints: 25,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: 'recyclingChamp'
                    }
                ]
            },
            {
                id: 3,
                type: 'action',
                background: 'scene-beach',
                characters: '🦸‍♀️🗑️',
                effects: null,
                narration: `You begin picking up the plastic waste, filling bag after bag. It's hard work, but you're making progress! A group of local kids notices what you're doing and stops to watch.`,
                dialogue: {
                    character: '👧',
                    name: 'Curious Child',
                    text: `Wow, you're cleaning the beach all by yourself? That's so cool! Can we help too?`
                },
                choices: [
                    {
                        text: 'Welcome their help enthusiastically',
                        description: 'More hands make lighter work!',
                        icon: '🤝',
                        nextScene: 4,
                        ecoPoints: 20,
                        karmaChange: 12,
                        consequence: 'positive',
                        badge: null
                    },
                    {
                        text: 'Teach them about recycling first',
                        description: 'Knowledge is power',
                        icon: '📚',
                        nextScene: 5,
                        ecoPoints: 25,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: null
                    }
                ]
            },
            {
                id: 4,
                type: 'resolution',
                background: 'scene-positive',
                characters: '🦸‍♀️👧👦🐢🐟',
                effects: 'celebration',
                narration: `Together, you and the community work tirelessly. By sunset, the beach is transformed! The sand sparkles, the water runs clear, and happy sea creatures swim freely. Word spreads about your efforts, inspiring other beaches to organize cleanups too!`,
                dialogue: {
                    character: '🌊',
                    name: 'Spirit of the Ocean',
                    text: `Young Eco-Hero, you've shown that one person CAN make a difference. The ocean and all its creatures thank you. Remember - every piece of plastic picked up is a life saved!`
                },
                isEnding: true,
                endingType: 'positive',
                endingTitle: 'The Beach is Saved! 🏆',
                endingText: 'Thanks to your courageous actions and community leadership, Coral Bay Beach has been restored to its former glory. Marine life thrives once again, and you\'ve inspired a whole generation of eco-warriors!',
                earnedBadges: ['oceanDefender', 'beachCleaner']
            },
            {
                id: 5,
                type: 'resolution',
                background: 'scene-positive',
                characters: '🦸‍♀️♻️🌊',
                effects: 'celebration',
                narration: `Your recycling education program becomes a huge success! The community learns to sort waste properly, and a new recycling center is built. The beach becomes a model for environmental conservation.`,
                dialogue: {
                    character: '🎓',
                    name: 'Mayor',
                    text: `Young hero, your dedication has taught us all an important lesson. We're naming this beach after you and implementing recycling programs across the entire city!`
                },
                isEnding: true,
                endingType: 'positive',
                endingTitle: 'Education Wins! 🎓',
                endingText: 'Your focus on education created lasting change. Not only is the beach clean, but the entire community now understands how to prevent pollution. You\'ve created eco-warriors for life!',
                earnedBadges: ['oceanDefender', 'recyclingChamp']
            }
        ]
    },
    2: {
        id: 2,
        title: 'The Smoky City',
        description: 'Air pollution is choking the city. Make choices to reduce emissions and clear the skies!',
        scenes: [
            {
                id: 1,
                type: 'intro',
                background: 'scene-city',
                characters: '🦸‍♀️🏭',
                effects: 'smoke',
                narration: `Welcome to Metro City, where the sky hasn't been blue in years. Thick smog blankets everything, and people wear masks just to breathe. A massive factory pumps dark smoke into the air while cars create traffic jams that stretch for miles. Something has to change!`,
                dialogue: null,
                choices: [
                    {
                        text: 'Talk to the factory owner',
                        description: 'Convince them to use cleaner energy',
                        icon: '🏭',
                        nextScene: 2,
                        ecoPoints: 15,
                        karmaChange: 10,
                        consequence: 'positive',
                        badge: null
                    },
                    {
                        text: 'Start a cycling campaign',
                        description: 'Get people out of their cars',
                        icon: '🚴',
                        nextScene: 3,
                        ecoPoints: 15,
                        karmaChange: 10,
                        consequence: 'positive',
                        badge: null
                    }
                ]
            },
            {
                id: 2,
                type: 'action',
                background: 'scene-city',
                characters: '🦸‍♀️👔',
                effects: null,
                narration: `You meet Mr. Grey, the factory owner. He seems skeptical at first, but listens to your ideas about solar panels and wind turbines. The transition would be expensive, but it could work.`,
                dialogue: {
                    character: '👔',
                    name: 'Mr. Grey',
                    text: `Clean energy sounds nice, kid, but it costs money. Why should I change how we've always done things?`
                },
                choices: [
                    {
                        text: 'Show the long-term savings',
                        description: 'Clean energy is cheaper over time',
                        icon: '💰',
                        nextScene: 4,
                        ecoPoints: 25,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: 'energySaver'
                    },
                    {
                        text: 'Appeal to his humanity',
                        description: 'Think of the children\'s health!',
                        icon: '❤️',
                        nextScene: 4,
                        ecoPoints: 20,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: null
                    }
                ]
            },
            {
                id: 3,
                type: 'action',
                background: 'scene-city',
                characters: '🦸‍♀️🚴‍♀️🚴',
                effects: null,
                narration: `You set up bike stations around the city and organize a "Car-Free Sunday" event. At first, only a few people participate, but the idea catches on quickly!`,
                dialogue: {
                    character: '🚴',
                    name: 'Cyclist',
                    text: `I forgot how nice it is to breathe fresh air! Let's make EVERY day car-free... or at least reduce driving!`
                },
                choices: [
                    {
                        text: 'Push for electric busses',
                        description: 'Clean public transport for everyone',
                        icon: '🚌',
                        nextScene: 5,
                        ecoPoints: 25,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: null
                    },
                    {
                        text: 'Plant trees along roads',
                        description: 'Trees clean the air naturally',
                        icon: '🌳',
                        nextScene: 5,
                        ecoPoints: 20,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: 'greenThumb'
                    }
                ]
            },
            {
                id: 4,
                type: 'resolution',
                background: 'scene-positive',
                characters: '🦸‍♀️☀️🌤️',
                effects: 'celebration',
                narration: `One year later, the factory runs entirely on solar and wind power. The smoke stacks are gone, replaced by solar panels that sparkle in the sunlight. For the first time in decades, the citizens of Metro City can see the blue sky!`,
                dialogue: {
                    character: '👔',
                    name: 'Mr. Grey',
                    text: `You were right, young hero. Not only is the air clean, but we're actually saving money! Thank you for opening my eyes.`
                },
                isEnding: true,
                endingType: 'positive',
                endingTitle: 'Clean Skies Ahead! ☀️',
                endingText: 'Your persistence and smart thinking transformed Metro City\'s biggest polluter into a model of clean energy. The air quality has improved 80%, and other factories are following suit!',
                earnedBadges: ['airGuardian', 'energySaver']
            },
            {
                id: 5,
                type: 'resolution',
                background: 'scene-positive',
                characters: '🦸‍♀️🌳🚴🚌',
                effects: 'celebration',
                narration: `The city has been transformed! Green spaces line every street, electric buses glide silently past, and bike lanes connect every neighborhood. The smog is lifting, revealing a beautiful blue sky.`,
                dialogue: {
                    character: '👧',
                    name: 'Child',
                    text: `Mommy, look! I can see the sun! It's so pretty! Can we ride bikes every day?`
                },
                isEnding: true,
                endingType: 'positive',
                endingTitle: 'The Green City! 🌳',
                endingText: 'Your grassroots movement created a revolution in urban transportation. With more trees, fewer cars, and clean buses, Metro City has become a model for sustainable living worldwide!',
                earnedBadges: ['airGuardian', 'greenThumb']
            }
        ]
    },
    3: {
        id: 3,
        title: 'The Dying Forest',
        description: 'Deforestation threatens wildlife homes. Your choices will determine if the forest survives!',
        scenes: [
            {
                id: 1,
                type: 'intro',
                background: 'scene-forest',
                characters: '🦸‍♀️🌲',
                effects: null,
                narration: `You stand at the edge of Whispering Woods, one of the last ancient forests. But the sound of chainsaws echoes through the trees. A logging company is cutting down the forest to make room for shopping malls. Animals are fleeing in panic!`,
                dialogue: {
                    character: '🦊',
                    name: 'Frightened Fox',
                    text: `Please, help us! They're destroying our home! Where will we go? What about the baby birds who can't fly yet?`
                },
                choices: [
                    {
                        text: 'Create an animal rescue team',
                        description: 'Save the animals first!',
                        icon: '🦊',
                        nextScene: 2,
                        ecoPoints: 20,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: null
                    },
                    {
                        text: 'Chain yourself to a tree',
                        description: 'Peaceful protest to stop the loggers',
                        icon: '⛓️',
                        nextScene: 3,
                        ecoPoints: 15,
                        karmaChange: 10,
                        consequence: 'positive',
                        badge: null
                    }
                ]
            },
            {
                id: 2,
                type: 'action',
                background: 'scene-forest',
                characters: '🦸‍♀️🦊🦌🐿️',
                effects: null,
                narration: `You gather volunteers and rescue dozens of animals - squirrels, rabbits, birds, and even a family of deer. But you know this isn't enough. The forest itself needs to be saved!`,
                dialogue: {
                    character: '🦌',
                    name: 'Mama Deer',
                    text: `Thank you for saving my fawn, but what about the trees? They're our food, our shelter, our everything!`
                },
                choices: [
                    {
                        text: 'Start a reforestation project',
                        description: 'Plant new trees everywhere',
                        icon: '🌱',
                        nextScene: 4,
                        ecoPoints: 30,
                        karmaChange: 20,
                        consequence: 'positive',
                        badge: 'greenThumb'
                    },
                    {
                        text: 'Create a wildlife sanctuary',
                        description: 'Protect the remaining forest legally',
                        icon: '🏛️',
                        nextScene: 5,
                        ecoPoints: 30,
                        karmaChange: 20,
                        consequence: 'positive',
                        badge: 'wildlifeSavior'
                    }
                ]
            },
            {
                id: 3,
                type: 'action',
                background: 'scene-forest',
                characters: '🦸‍♀️📸🌲',
                effects: null,
                narration: `Your protest goes viral on social media! News crews arrive, and soon the whole world knows about Whispering Woods. The logging company is forced to pause their operations while people everywhere demand answers.`,
                dialogue: {
                    character: '📺',
                    name: 'Reporter',
                    text: `This young eco-warrior is making headlines worldwide! What message do you have for our viewers?`
                },
                choices: [
                    {
                        text: 'Call for sustainable alternatives',
                        description: 'We can build without destroying',
                        icon: '♻️',
                        nextScene: 4,
                        ecoPoints: 25,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: null
                    },
                    {
                        text: 'Demand protected forest status',
                        description: 'This forest must be saved forever',
                        icon: '🛡️',
                        nextScene: 5,
                        ecoPoints: 25,
                        karmaChange: 15,
                        consequence: 'positive',
                        badge: null
                    }
                ]
            },
            {
                id: 4,
                type: 'resolution',
                background: 'scene-positive',
                characters: '🦸‍♀️🌲🌳🦊🦌🐿️',
                effects: 'celebration',
                narration: `Five years later, Whispering Woods is larger than ever! Your reforestation project became the biggest in history. Millions of trees now grow where the loggers once threatened. Wildlife populations have doubled, and the forest is thriving!`,
                dialogue: {
                    character: '🌳',
                    name: 'Ancient Tree',
                    text: `Young hero, you've given us hope. For every tree cut, ten more now grow. You've ensured our forest will live for a thousand more years!`
                },
                isEnding: true,
                endingType: 'positive',
                endingTitle: 'The Forest Reborn! 🌲',
                endingText: 'Your dedication to reforestation created a movement that spread worldwide. Millions of trees now grow thanks to your inspiration. The forest animals have their homes back, and the ecosystem is healthier than ever!',
                earnedBadges: ['wildlifeSavior', 'greenThumb', 'natureFriend']
            },
            {
                id: 5,
                type: 'resolution',
                background: 'scene-positive',
                characters: '🦸‍♀️🏛️🌲🦊🦌',
                effects: 'celebration',
                narration: `Whispering Woods is now officially protected as a National Wildlife Sanctuary! No logging or development can ever happen here again. The forest echoes with the sounds of happy animals, and tourists come from everywhere to experience its beauty.`,
                dialogue: {
                    character: '🦊',
                    name: 'Elder Fox',
                    text: `You gave us something priceless - a forever home. Generations of animals will live safely because of you. You are truly a hero!`
                },
                isEnding: true,
                endingType: 'positive',
                endingTitle: 'Sanctuary Forever! 🏛️',
                endingText: 'Your campaign created permanent protection for Whispering Woods. It\'s now a beloved sanctuary where wildlife thrives and future generations can experience the wonder of an ancient forest!',
                earnedBadges: ['wildlifeSavior', 'natureFriend']
            }
        ]
    }
};

// ===== ENVIRONMENTAL TIPS =====
const environmentalTips = [
    'A single plastic bottle can take up to 450 years to decompose in the ocean!',
    'Planting just one tree can absorb up to 48 pounds of carbon dioxide per year.',
    'Turning off the lights when you leave a room saves enough energy to power a TV for 3 hours!',
    'Recycling one aluminum can saves enough energy to run a computer for 3 hours.',
    'If everyone in the world planted a tree, it would absorb about 205 billion tons of carbon!',
    'A dripping tap can waste up to 5,000 liters of water per year.',
    'Bees are responsible for pollinating 80% of the world\'s plants!',
    'Walking or cycling instead of driving for just 2 miles saves 1 pound of CO2 emissions.',
    'Over 1 million plastic bottles are bought every minute worldwide!',
    'Composting food waste can reduce your garbage by up to 30%.'
];

// ===== HELPER FUNCTIONS =====

/**
 * Initialize the game
 */
function initGame() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });
    }

    // Theme toggle functionality
    setupThemeToggle();

    // Create background particles
    createParticles();

    // Load saved progress
    loadProgress();

    // Render badge collection
    renderBadgeCollection();
}

/**
 * Setup theme toggle
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('ecoHeroTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            localStorage.setItem('ecoHeroTheme', body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }
}

/**
 * Create floating particle effects
 */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleEmojis = ['🌱', '🍃', '🌿', '🌸', '✨', '🦋', '🌻'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 20 + 15}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * -10}s;
      opacity: ${Math.random() * 0.5 + 0.3};
    `;
        container.appendChild(particle);
    }
}

/**
 * Start a specific chapter
 */
function startChapter(chapterNum) {
    const chapter = chapters[chapterNum];
    if (!chapter) return;

    gameState.currentChapter = chapterNum;
    gameState.currentScene = 0;
    gameState.ecoScore = 0;
    gameState.karma = 50;
    gameState.choicesMade = [];
    gameState.storyPath = [];

    // Hide chapter select, show story panel
    document.getElementById('chapter-select').style.display = 'none';
    document.getElementById('badge-collection').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('story-panel').style.display = 'block';

    // Update chapter title
    document.getElementById('chapter-title').textContent = `Chapter ${chapter.id}: ${chapter.title}`;

    // Load first scene
    loadScene(1);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Load a specific scene
 */
function loadScene(sceneId) {
    const chapter = chapters[gameState.currentChapter];
    const scene = chapter.scenes.find(s => s.id === sceneId);

    if (!scene) return;

    gameState.currentScene = sceneId;
    gameState.storyPath.push(sceneId);

    // Update progress bar
    const progress = (sceneId / chapter.scenes.length) * 100;
    document.getElementById('story-progress-bar').style.width = `${progress}%`;
    document.getElementById('scene-counter').textContent = `Scene ${sceneId}/${chapter.scenes.length}`;

    // Update scene illustration
    const sceneBg = document.getElementById('scene-bg');
    sceneBg.className = `scene-bg ${scene.background}`;

    // Update characters
    document.getElementById('scene-characters').textContent = scene.characters;

    // Apply effects
    applySceneEffects(scene.effects);

    // Update narration
    const narratorText = document.getElementById('narrator-text');
    narratorText.textContent = scene.narration;
    narratorText.style.animation = 'none';
    setTimeout(() => narratorText.style.animation = 'fadeIn 0.5s ease', 10);

    // Update dialogue if present
    const dialogueBox = document.getElementById('dialogue-box');
    if (scene.dialogue) {
        dialogueBox.style.display = 'flex';
        document.getElementById('character-portrait').textContent = scene.dialogue.character;
        document.getElementById('character-name').textContent = scene.dialogue.name;
        document.getElementById('dialogue-text').textContent = scene.dialogue.text;
        dialogueBox.style.animation = 'none';
        setTimeout(() => dialogueBox.style.animation = 'slideIn 0.4s ease', 200);
    } else {
        dialogueBox.style.display = 'none';
    }

    // Update HUD
    updateHUD();

    // Handle ending or show choices
    if (scene.isEnding) {
        setTimeout(() => showEnding(scene), 2000);
    } else {
        renderChoices(scene.choices);
    }
}

/**
 * Apply scene effects
 */
function applySceneEffects(effectType) {
    const effectsContainer = document.getElementById('scene-effects');
    effectsContainer.innerHTML = '';

    if (!effectType) return;

    switch (effectType) {
        case 'sparkle':
            for (let i = 0; i < 10; i++) {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
          position: absolute;
          font-size: ${Math.random() * 20 + 15}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: pulse 1s infinite;
          animation-delay: ${Math.random() * 1}s;
        `;
                effectsContainer.appendChild(sparkle);
            }
            break;
        case 'smoke':
            for (let i = 0; i < 5; i++) {
                const smoke = document.createElement('div');
                smoke.textContent = '💨';
                smoke.style.cssText = `
          position: absolute;
          font-size: ${Math.random() * 30 + 20}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 50}%;
          animation: smokeFloat 4s infinite;
          animation-delay: ${Math.random() * 2}s;
          opacity: 0.6;
        `;
                effectsContainer.appendChild(smoke);
            }
            break;
        case 'celebration':
            createConfetti();
            break;
    }
}

/**
 * Render choice buttons
 */
function renderChoices(choices) {
    const choicesGrid = document.getElementById('choices-grid');
    choicesGrid.innerHTML = '';

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = `choice-btn ${choice.consequence === 'positive' ? 'eco-positive' : 'eco-negative'}`;
        button.innerHTML = `
      <span class="choice-icon">${choice.icon}</span>
      <div class="choice-content">
        <h4>${choice.text}</h4>
        <p>${choice.description}</p>
      </div>
    `;
        button.style.animationDelay = `${index * 0.1}s`;
        button.addEventListener('click', () => makeChoice(choice));
        choicesGrid.appendChild(button);
    });

    document.getElementById('choices-container').style.display = 'block';
}

/**
 * Handle player choice
 */
function makeChoice(choice) {
    // Record the choice
    gameState.choicesMade.push({
        scene: gameState.currentScene,
        choice: choice.text,
        consequence: choice.consequence
    });

    // Update scores
    gameState.ecoScore += choice.ecoPoints;
    gameState.karma = Math.max(0, Math.min(100, gameState.karma + choice.karmaChange));

    // Award badge if any
    if (choice.badge && !gameState.badgesEarned.includes(choice.badge)) {
        gameState.badgesEarned.push(choice.badge);
        showBadgeNotification(choice.badge);
    }

    // Update HUD
    updateHUD();

    // Show feedback effect
    showChoiceFeedback(choice.consequence);

    // Hide choices
    document.getElementById('choices-container').style.display = 'none';

    // Load next scene after brief delay
    setTimeout(() => loadScene(choice.nextScene), 1000);
}

/**
 * Update the game HUD
 */
function updateHUD() {
    document.getElementById('eco-score').textContent = gameState.ecoScore;

    // Update karma meter position (0-100 maps to left position)
    const karmaFill = document.getElementById('karma-fill');
    karmaFill.style.left = `${gameState.karma}%`;
}

/**
 * Show choice feedback animation
 */
function showChoiceFeedback(consequence) {
    const illustration = document.getElementById('scene-illustration');

    if (consequence === 'positive') {
        illustration.classList.add('scene-positive');
        setTimeout(() => illustration.classList.remove('scene-positive'), 1000);
    } else {
        illustration.classList.add('scene-negative');
        setTimeout(() => illustration.classList.remove('scene-negative'), 1000);
    }
}

/**
 * Show badge notification
 */
function showBadgeNotification(badgeId) {
    const badge = badges[badgeId];
    if (!badge) return;

    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
    <div class="badge-icon">${badge.icon}</div>
    <div class="badge-info">
      <span class="badge-label">Badge Earned!</span>
      <span class="badge-name">${badge.name}</span>
    </div>
  `;
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ffd700, #ffb347);
    padding: 15px 30px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 10px 40px rgba(255, 183, 77, 0.5);
    z-index: 10000;
    animation: badgeSlideIn 0.5s ease forwards;
  `;

    document.body.appendChild(notification);

    // Add styles for animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes badgeSlideIn {
      0% { transform: translateX(-50%) translateY(-100px); opacity: 0; }
      100% { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
  `;
    document.head.appendChild(style);

    setTimeout(() => notification.remove(), 3000);
}

/**
 * Show ending screen
 */
function showEnding(scene) {
    // Hide story panel
    document.getElementById('story-panel').style.display = 'none';

    // Show result screen
    const resultScreen = document.getElementById('result-screen');
    resultScreen.style.display = 'flex';

    // Update result content
    document.getElementById('result-animation').textContent = scene.endingType === 'positive' ? '🎉🌟🏆' : '😢💔🌧️';
    document.getElementById('result-title').textContent = scene.endingTitle;
    document.getElementById('outcome-scene').textContent = scene.characters;
    document.getElementById('outcome-text').textContent = scene.endingText;

    // Award ending badges
    let allBadges = [...gameState.badgesEarned];
    if (scene.earnedBadges) {
        scene.earnedBadges.forEach(badgeId => {
            if (!allBadges.includes(badgeId)) {
                allBadges.push(badgeId);
            }
        });
    }

    // Check for special badges
    if (gameState.karma >= 80 && !allBadges.includes('ecoHero')) {
        allBadges.push('ecoHero');
    }
    if (gameState.karma >= 90 && !allBadges.includes('natureFriend')) {
        allBadges.push('natureFriend');
    }

    gameState.badgesEarned = allBadges;

    // Render badges
    const badgesGrid = document.getElementById('badges-grid');
    badgesGrid.innerHTML = '';
    allBadges.forEach((badgeId, index) => {
        const badge = badges[badgeId];
        if (badge) {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge-item';
            badgeEl.textContent = badge.icon;
            badgeEl.style.animationDelay = `${index * 0.2}s`;
            badgeEl.title = badge.name;
            badgesGrid.appendChild(badgeEl);
        }
    });

    // Update final stats
    document.getElementById('final-eco-score').textContent = gameState.ecoScore;
    document.getElementById('final-karma').textContent = getKarmaLevel(gameState.karma);
    document.getElementById('choices-made').textContent = gameState.choicesMade.length;

    // Show tip
    const randomTip = environmentalTips[Math.floor(Math.random() * environmentalTips.length)];
    document.getElementById('tip-text').textContent = randomTip;

    // Create confetti for positive endings
    if (scene.endingType === 'positive') {
        createConfetti();
    }

    // Save progress
    saveProgress();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Get karma level text
 */
function getKarmaLevel(karma) {
    if (karma >= 90) return '🌟 Legendary';
    if (karma >= 75) return '💚 Heroic';
    if (karma >= 60) return '🌿 Good';
    if (karma >= 40) return '⚖️ Balanced';
    if (karma >= 25) return '⚠️ Questionable';
    return '💔 Needs Work';
}

/**
 * Create confetti celebration
 */
function createConfetti() {
    const colors = ['#00c853', '#ff9800', '#536dfe', '#ff5252', '#ffc107', '#ba68c8'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 2}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => confettiContainer.remove(), 5000);
}

/**
 * Replay current chapter
 */
function replayChapter() {
    startChapter(gameState.currentChapter);
}

/**
 * Go to next chapter
 */
function nextChapter() {
    const nextChapterNum = gameState.currentChapter + 1;
    if (chapters[nextChapterNum]) {
        startChapter(nextChapterNum);
    } else {
        exitToMenu();
    }
}

/**
 * Exit to chapter selection
 */
function exitToMenu() {
    document.getElementById('story-panel').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('chapter-select').style.display = 'block';
    document.getElementById('badge-collection').style.display = 'block';

    renderBadgeCollection();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Restart current chapter
 */
function restartChapter() {
    if (confirm('Are you sure you want to restart? Your progress in this chapter will be lost.')) {
        startChapter(gameState.currentChapter);
    }
}

/**
 * Render the badge collection
 */
function renderBadgeCollection() {
    const collectionGrid = document.getElementById('collection-grid');
    if (!collectionGrid) return;

    collectionGrid.innerHTML = '';

    Object.values(badges).forEach(badge => {
        const isEarned = gameState.badgesEarned.includes(badge.id);
        const badgeEl = document.createElement('div');
        badgeEl.className = `collection-badge ${isEarned ? 'earned' : 'locked'}`;
        badgeEl.innerHTML = `
      <span class="badge-icon">${isEarned ? badge.icon : '🔒'}</span>
      <span class="badge-name">${isEarned ? badge.name : '???'}</span>
      <span class="badge-desc">${isEarned ? badge.description : 'Keep playing to unlock!'}</span>
    `;
        collectionGrid.appendChild(badgeEl);
    });
}

/**
 * Save game progress to localStorage
 */
function saveProgress() {
    const saveData = {
        badgesEarned: gameState.badgesEarned,
        lastPlayed: new Date().toISOString()
    };
    localStorage.setItem('ecoHeroProgress', JSON.stringify(saveData));
}

/**
 * Load game progress from localStorage
 */
function loadProgress() {
    const savedData = localStorage.getItem('ecoHeroProgress');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            gameState.badgesEarned = data.badgesEarned || [];
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
    }
}

// ===== INITIALIZE GAME ON DOM READY =====
document.addEventListener('DOMContentLoaded', initGame);

// Make functions globally available
window.startChapter = startChapter;
window.replayChapter = replayChapter;
window.nextChapter = nextChapter;
window.exitToMenu = exitToMenu;
window.restartChapter = restartChapter;
