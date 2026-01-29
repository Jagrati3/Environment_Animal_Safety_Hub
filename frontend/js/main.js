/**
 * ===========================================
 * MAIN JAVASCRIPT - Environment Animal Safety Hub
 * ===========================================
 *
 * Main application initialization and core functionality
 * Handles all interactive features, animations, and user interactions
 *
 * @author Environment Animal Safety Hub Team
 * @version 1.0.0
 * @license MIT
 */

// ===========================================
// CONFIGURATION & CONSTANTS
// ===========================================

/**
 * Carbon Calculator Weights Configuration
 * Defines scoring weights for different environmental factors
 * @type {Object}
 */
const CARBON_CALCULATOR_WEIGHTS = {
  transport: { walk: 1, public: 2, bike: 3, car: 5 },
  electricity: { low: 1, medium: 3, high: 5 },
  plastic: { low: 1, medium: 3, high: 5 },
};

/**
 * Modal Content Configuration
 * Contains all modal dialog content for various services and features
 * @type {Object}
 */
const MODAL_CONTENT = {
  'animal-rescue': {
    icon: 'fa-truck-medical',
    title: 'Animal Rescue Services',
    body: `
      <p>Our rescue team works 24/7 to help injured and abandoned animals. We provide emergency medical care, rehabilitation, and shelter.</p>
      <h4>How it works:</h4>
      <ul>
        <li>Report an injured animal via our helpline or app.</li>
        <li>Our rescue van reaches the location within 30-60 mins.</li>
        <li>Animal receives immediate first-aid and transport to shelter.</li>
      </ul>
      <p><strong>Emergency Helpline: +91 98765 43210</strong></p>
    `
  },
  'waste-mgmt': {
    icon: 'fa-recycle',
    title: 'Waste Management',
    body: `
      <p>We help communities implement effective waste segregation and recycling systems.</p>
      <h4>Our Initiatives:</h4>
      <ul>
        <li>Door-to-door dry waste collection.</li>
        <li>Composting workshops for wet waste.</li>
        <li>E-waste recycling drives every weekend.</li>
      </ul>
    `
  },
  'climate-action': {
    icon: 'fa-cloud-sun',
    title: 'Climate Action Awareness',
    body: `
      <p>Join our movement to combat climate change through local actions and global awareness.</p>
      <p>We organize weekly seminars, school programs, and policy advocacy campaigns to push for greener regulations.</p>
      <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 15px 0;">
        <h4 style="color: #856404; margin: 0 0 10px 0;"><i class="fas fa-exclamation-triangle"></i> LEVEL 3 EMERGENCY</h4>
        <p style="color: #856404; margin: 0;"><strong>Shipping Noise Pollution Crisis:</strong> Marine mammals face critical communication disruption from underwater shipping noise.</p>
        <a href="./pages/noise-pollution-shipping.html" class="btn btn-warning" style="margin-top: 10px;">
          <i class="fas fa-volume-up"></i> View Crisis Details
        </a>
      </div>
      <h4>Climate Adaptation Resources:</h4>
      <ul>
        <li><a href="./pages/environment/climate-resilient-habitats.html" class="btn btn-primary" style="margin:5px;"> 🛡️ Climate-Resilient Habitats</a></li>
        <li><a href="./pages/environment/climate-awareness.html" class="btn btn-primary" style="margin:5px;"> 🌡️ Climate Awareness</a></li>
      </ul>
    `
  },
  'tree-plant': {
    icon: 'fa-seedling',
    title: 'Tree Plantation Drives',
    body: `
      <p>Help us turn the city green! We organize massive plantation drives every Sunday.</p>
      <h4>Join us:</h4>
      <ul>
        <li><strong>When:</strong> Every Sunday, 7:00 AM</li>
        <li><strong>Where:</strong> City Park & Outskirts</li>
        <li><strong>Provided:</strong> Saplings, tools, and refreshments.</li>
      </ul>
    `
  },
  'adopt-pets': {
    icon: 'fa-paw',
    title: 'Adopt, Don\'t Shop',
    body: `
      <p>Give a loving home to a rescued animal. We have dogs, cats, and rabbits waiting for a family.</p>
      <p>Process involves: Application > House Visit > Adoption. All pets are vaccinated and sterilized.</p>
      <a href="./pages/pet-adoption.html" class="btn btn-primary" style="margin-top:10px;">View Available Pets</a>
    `
  },
  'wildlife': {
    icon: 'fa-shield-cat',
    title: 'Wildlife Protection',
    body: `
      <p>We work to protect urban wildlife including birds, squirrels, and reptiles from urban hazards.</p>
      <p>Learn how to coexist with nature and what to do if you spot wild animals in distress.</p>
      <a href="./pages/wildlife.html" class="btn btn-primary" style="margin-top:10px;"> Learn More </a>
    `
  },
  'feeding': {
    icon: 'fa-bowl-food',
    title: 'Stray Feeding Program',
    body: `
      <p>Hunger is the biggest enemy of stray animals. Join our community feeding program.</p>
      <h4>Guidelines:</h4>
      <ul>
        <li>Feed at designated spots away from traffic.</li>
        <li>Use eco-friendly bowls or clean up afterwards.</li>
        <li>Provide fresh water along with food.</li>
      </ul>
      <a href="./pages/feeding.html" class="btn btn-primary" style="margin-top:10px;"> Join Us! </a>
    `
  },
  'plastic': {
    icon: 'fa-bottle-water',
    title: 'Reduce Plastic Usage',
    body: `
      <p>Plastic takes up to 1000 years to decompose. Here are simple tips to reduce it:</p>
      <ul>
        <li>Carry your own cloth bag.</li>
        <li>Use a reusable water bottle.</li>
        <li>Say no to plastic straws and cutlery.</li>
      </ul>
    `
  },
  'energy': {
    icon: 'fa-lightbulb',
    title: 'Save Energy Tips',
    body: `
      <p>Saving energy saves money and the planet.</p>
      <ul>
        <li>Switch to LED bulbs.</li>
        <li>Unplug electronics when not in use.</li>
        <li>Use natural light during the day.</li>
      </ul>
    `
  },
  'tree-drive': {
    icon: 'fa-tree',
    title: 'Join Our Plantation Drive',
    body: `
      <p>Next Drive Details:</p>
      <p><strong>Location:</strong> Central Park Zone B<br><strong>Date:</strong> This Sunday<br><strong>Time:</strong> 8:00 AM - 11:00 AM</p>
      <p>Bring your friends and family!</p>
    `
  }
};

/**
 * Glossary Data Array
 * Contains environmental and animal-related terms and definitions
 * @type {Array<Object>}
 */
const GLOSSARY_DATA = [
  { term: "Biodiversity", definition: "The variety of plants, animals, and living organisms on Earth." },
  { term: "Carbon Footprint", definition: "The amount of greenhouse gases released due to human activities." },
  { term: "Climate Change", definition: "Long-term changes in temperature and weather patterns." },
  { term: "Renewable Energy", definition: "Energy that comes from natural sources like sunlight and wind." },
  { term: "Sustainability", definition: "Using resources wisely so future generations can meet their needs." },
  { term: "Recycling", definition: "The process of converting waste into reusable materials." },
  { term: "Deforestation", definition: "Cutting down trees on a large scale, harming the environment." },
  { term: "Composting", definition: "Turning food and garden waste into nutrient-rich soil." },
  { term: "E-Waste", definition: "Discarded electronic devices like phones and computers." },
  { term: "Zero-Waste", definition: "A lifestyle aiming to produce no trash or landfill waste." },
  { term: "Upcycling", definition: "Turning old items into something new and useful." },
  { term: "Energy Efficiency", definition: "Using less energy to perform the same task." },
  { term: "Greenhouse Gases", definition: "Gases that trap heat in the atmosphere, causing global warming." },
  { term: "Habitat Restoration", definition: "Restoring damaged natural environments for wildlife." },
  { term: "Endangered Species", definition: "Animals or plants at risk of extinction." },
  { term: "Water Footprint", definition: "The amount of water used to produce goods or sustain a lifestyle." },
  { term: "Air Quality", definition: "A measure of how clean or polluted the air is." },
  { term: "Pollution", definition: "The presence of harmful substances in the environment." },
  { term: "Acid Rain", definition: "Rain containing pollutants that harm plants, animals, and buildings." },
  { term: "Circular Economy", definition: "An economic system focused on reusing and recycling resources." },
  { term: "Organic Farming", definition: "Farming without synthetic fertilizers or pesticides." },
  { term: "Climate Resilience", definition: "The ability to adapt and recover from climate-related changes." },
  { term: "Carbon Neutral", definition: "Balancing the amount of carbon emitted with actions that remove it." },
  { term: "Eco-Friendly", definition: "Products or actions that have a minimal impact on the environment." },
  { term: "Rainwater Harvesting", definition: "Collecting and storing rainwater for reuse." },
  { term: "Sustainable Transport", definition: "Travel methods that reduce environmental impact, like biking or public transit." },
  { term: "Poaching", definition: "Illegal hunting of animals, often threatening endangered species." },
  { term: "Microplastics", definition: "Tiny plastic particles that pollute oceans and harm wildlife." },
  { term: "Carbon Tax", definition: "A fee on companies for emitting greenhouse gases to encourage reduction." },
  { term: "Green Bonds", definition: "Investments that fund environmentally-friendly projects." },
  { term: "Decarbonization", definition: "Reducing carbon emissions in energy and industry." },
  { term: "Sustainable Supply Chain", definition: "A production system that minimizes environmental and social harm." },
  { term: "Green Economy", definition: "An economy that focuses on sustainable and environmentally-friendly growth." },
  { term: "Urban Farming", definition: "Growing food in cities to reduce transportation and waste." },
  { term: "Plastic Pollution", definition: "The accumulation of plastic products harming wildlife and the environment." },
  { term: "Sustainable Fashion", definition: "Clothing produced in environmentally-friendly and ethical ways." },
  { term: "Green Jobs", definition: "Jobs that contribute to environmental protection and sustainability." },
  { term: "Eco-Tourism", definition: "Travel that focuses on conserving nature and helping local communities." },
  { term: "Carbon Offset", definition: "Actions that compensate for carbon emissions, like planting trees." },
  { term: "Climate Justice", definition: "Fair treatment of all people regarding the impacts of climate change." },
  { term: "Biodiversity Loss", definition: "The reduction in the variety of life in ecosystems." },
  { term: "Water Conservation", definition: "Using water efficiently to prevent waste and preserve resources." },
  { term: "Renewable Resources", definition: "Resources that can be naturally replenished, like sunlight and wind." },
  { term: "Non-Renewable Resources", definition: "Resources that cannot be replaced easily, like fossil fuels." },
  { term: "Eco-Innovation", definition: "Creating new products or technologies that are environmentally friendly." },
  { term: "Sustainable Cities", definition: "Cities designed to reduce pollution, waste, and energy use." },
  { term: "Climate Mitigation", definition: "Actions taken to reduce or prevent greenhouse gas emissions." },
  { term: "Climate Adaptation", definition: "Adjusting to the effects of climate change to reduce harm." }
];

/**
 * Eco Facts Array
 * Contains interesting facts about environment and animals
 * @type {Array<Object>}
 */
const ECO_FACTS = [
  { text: "Elephants can recognize themselves in mirrors, showing high intelligence.", category: "Animal Fact", icon: "🐘" },
  { text: "Recycling one aluminum can saves enough energy to run a TV for 3 hours.", category: "Recycling Tip", icon: "⚡" },
  { text: "Planting trees helps absorb carbon dioxide and fight climate change.", category: "Climate Fact", icon: "🌱" },
  { text: "Plastic waste can take up to 1000 years to decompose.", category: "Recycling Tip", icon: "🗑️" },
  { text: "Bees are responsible for pollinating nearly 75% of the world's crops.", category: "Animal Fact", icon: "🐝" },
  { text: "Turning off unused lights can significantly reduce your carbon footprint.", category: "Climate Tip", icon: "💡" }
];

// ===========================================
// MAIN APPLICATION INITIALIZATION
// ===========================================

/**
 * Main application initialization function
 * Called when DOM content is loaded
 * Initializes all core application features
 */
document.addEventListener("DOMContentLoaded", function() {
  // Core navigation and UI components
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initScrollProgress();

  // Animation and visual effects
  initAOS();
  initCounterAnimation();
  initParticles();

  // Form handlers
  initFormHandlers();

  // Interactive features
  initEcoChallenges();
  initModalSystem();
  initTestimonialSlider();

  // Performance optimizations
  initLazyLoading();
  initPreloader();

  // Additional features
  initAdditionalFeatures();
});

/**
 * Initialize additional features that run after main initialization
 * Called separately to avoid blocking main initialization
 */
function initAdditionalFeatures() {
  // Educational features
  initGlossary();
  initEcoFacts();

  // Interactive simulations
  initGardenSimulation();
  initImpactSimulation();

  // Timeline and visualization
  initTimeline();
  initFutureVisualization();
  initSurvivalScore();

  // Theme and accessibility
  initThemeToggle();
  initScrollBottomButton();

  // Earth visualization
  initEarthVisualization();

  // Wildlife features
  initWildlifeFilter();
  initFlipCards();

  // Crisis alert systems
  initNoiseCrisisAlert();
  initIndigenousCrisisAlert();
}

// ===========================================
// NAVIGATION SYSTEM
// ===========================================

/**
 * Initialize mobile navigation functionality
 * Handles navbar toggling and smooth scrolling
 */
function initNavbar() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });

    // Close navbar when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      });
    });
  }
}

/**
 * Initialize navbar active state based on scroll position
 * Highlights current section in navigation
 */
function initNavbarActiveState() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Check if elements exist before adding event listener
  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener("scroll", function() {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      // Check if link exists before manipulating it
      if (link) {
        link.classList.remove("active");
        if (current && link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      }
    });
  });
}

/**
 * Initialize scroll progress indicator
 * Shows progress bar at top of page based on scroll position
 */
function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

// ===========================================
// SMOOTH SCROLLING & NAVIGATION
// ===========================================

/**
 * Initialize smooth scrolling for anchor links
 * Provides smooth scrolling behavior for internal page links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Initialize back-to-top button functionality
 * Shows/hides button based on scroll position and handles click events
 */
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  window.addEventListener("scroll", function() {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===========================================
// ANIMATIONS & VISUAL EFFECTS
// ===========================================

/**
 * Initialize AOS (Animate On Scroll) library
 * Configures animation settings for scroll-triggered animations
 */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 100,
    });
  }
}

/**
 * Initialize counter animation for statistics
 * Animates number counters when they come into view
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");
  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = formatNumber(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = formatNumber(target);
      }
    };

    updateCounter();
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K+";
    }
    return num.toLocaleString() + "+";
  };

  // Intersection Observer for triggering animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * Initialize particle animation system - Memory Safe Version
 * Creates floating particles for visual enhancement
 */
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 30; // Reduced from 50
  const particles = new Set();
  
  for (let i = 0; i < particleCount; i++) {
    const particle = createParticle(particlesContainer);
    particles.add(particle);
  }
  
  // Store particles for cleanup
  particlesContainer._particles = particles;
}

/**
 * Create individual particle element - Memory Safe Version
 * @param {HTMLElement} container - Container element for particles
 */
function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random properties
  const size = Math.random() * 3 + 1; // Reduced size
  const left = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 15 + 8; // Shorter duration
  const opacity = Math.random() * 0.3 + 0.1; // Lower opacity

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, ${opacity});
    border-radius: 50%;
    left: ${left}%;
    bottom: -10px;
    animation: particleFloat ${duration}s linear ${delay}s infinite;
    pointer-events: none;
  `;

  container.appendChild(particle);
  return particle;
}

// Add particle animation to stylesheet
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes particleFloat {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

// ===========================================
// FORM HANDLERS
// ===========================================

/**
 * Initialize all form handlers
 * Sets up event listeners for various forms on the page
 */
function initFormHandlers() {
  // Report Form
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", function(e) {
      e.preventDefault();
      handleReportSubmit(this);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      handleNewsletterSubmit(this);
    });
  }

  // File upload preview
  const fileInput = document.querySelector('.file-upload input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", function() {
      const fileName = this.files[0]?.name;
      const label = this.parentElement.querySelector(".file-upload-label span");
      if (fileName && label) {
        label.textContent = fileName;
      }
    });
  }

  // Carbon Calculator Form
  const carbonForm = document.getElementById("carbonForm");
  if (carbonForm) {
    carbonForm.addEventListener("submit", handleCarbonSubmit);
    carbonForm.addEventListener("change", updateLiveScore);
  }
}

/**
 * Handle report form submission
 * Processes animal rescue or environmental report submissions
 * @param {HTMLFormElement} form - The report form element
 */
function handleReportSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Report Submitted!';
    submitBtn.style.background = "linear-gradient(135deg, #4caf50, #2e7d32)";

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;

      // Show success message
      showNotification(
        "Report submitted successfully! We will review it shortly.",
        "success"
      );
    }, 2000);
  }, 1500);
}

/**
 * Handle newsletter subscription form submission
 * Processes email subscription requests
 * @param {HTMLFormElement} form - The newsletter form element
 */
function handleNewsletterSubmit(form) {
  const email = form.querySelector('input[type="email"]').value;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showNotification(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
    }, 2000);
  }, 1000);
}

/**
 * Update live carbon score display
 * Calculates and displays carbon footprint score in real-time
 */
function updateLiveScore() {
  const liveScore = document.getElementById("liveScore");
  const progressBar = document.getElementById("carbonProgress");

  if (!liveScore || !progressBar) return;

  let score = 0;
  let filled = 0;

  ["transport", "electricity", "plastic"].forEach((id) => {
    const val = document.getElementById(id)?.value;
    if (val) {
      score += CARBON_CALCULATOR_WEIGHTS[id][val];
      filled++;
    }
  });

  progressBar.style.width = `${(filled / 3) * 100}%`;
  liveScore.textContent = filled ? score : "—";
}

/**
 * Handle carbon calculator form submission
 * Processes carbon footprint calculation and displays results
 * @param {Event} e - Form submit event
 */
function handleCarbonSubmit(e) {
  e.preventDefault();

  const transport = document.getElementById("transport").value;
  const electricity = document.getElementById("electricity").value;
  const plastic = document.getElementById("plastic").value;

  if (!transport || !electricity || !plastic) {
    showNotification("Please fill all fields!", "error");
    return;
  }

  let score = CARBON_CALCULATOR_WEIGHTS.transport[transport] +
             CARBON_CALCULATOR_WEIGHTS.electricity[electricity] +
             CARBON_CALCULATOR_WEIGHTS.plastic[plastic];

  const carbonResult = document.getElementById("carbonResult");
  const carbonScoreEl = document.getElementById("carbonScore");
  const carbonLevelEl = document.getElementById("carbonLevel");
  const carbonTipsEl = document.getElementById("carbonTips");
  const carbonBadge = document.getElementById("carbonBadge");

  if (!carbonResult || !carbonScoreEl || !carbonLevelEl) return;

  carbonScoreEl.textContent = score;
  carbonTipsEl.innerHTML = "";
  carbonBadge.className = "carbon-badge";

  if (score <= 4) {
    carbonLevelEl.textContent = "Excellent! You live a very eco-friendly life 🌱";
    carbonBadge.textContent = "Low Impact";
    carbonBadge.classList.add("low");
    carbonTipsEl.innerHTML += `<li><i class="fa-solid fa-check"></i> Keep inspiring others!</li>`;
  } else if (score <= 8) {
    carbonLevelEl.textContent = "Moderate footprint. Small changes can help 🌍";
    carbonBadge.textContent = "Medium Impact";
    carbonBadge.classList.add("medium");
    carbonTipsEl.innerHTML += `
      <li><i class="fa-solid fa-leaf"></i> Use public transport more</li>
      <li><i class="fa-solid fa-lightbulb"></i> Reduce power usage</li>
    `;
  } else {
    carbonLevelEl.textContent = "High footprint. Time to act now 🚨";
    carbonBadge.textContent = "High Impact";
    carbonBadge.classList.add("high");
    carbonTipsEl.innerHTML += `
      <li><i class="fa-solid fa-recycle"></i> Cut plastic usage</li>
      <li><i class="fa-solid fa-bus"></i> Avoid private vehicles</li>
      <li><i class="fa-solid fa-tree"></i> Plant trees regularly</li>
    `;
  }

  carbonResult.style.display = "block";
  carbonResult.classList.add("success");
  carbonResult.scrollIntoView({ behavior: "smooth" });
}

// ===========================================
// NOTIFICATION SYSTEM
// ===========================================

/**
 * Display notification message to user
 * @param {string} message - The notification message
 * @param {string} type - Notification type (success, error, info, warning)
 */
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    info: "fa-circle-info",
    warning: "fa-triangle-exclamation",
  };

  notification.innerHTML = `
    <i class="fa-solid ${icons[type]}"></i>
    <span>${message}</span>
    <button class="notification-close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"};
    color: white;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 400px;
  `;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Close button handler
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    opacity: 0.7;
    transition: opacity 0.2s;
  `;
  closeBtn.addEventListener("click", () => removeNotification(notification));

  // Auto remove after 5 seconds
  setTimeout(() => removeNotification(notification), 5000);
}

/**
 * Remove notification from DOM with animation
 * @param {HTMLElement} notification - The notification element to remove
 */
function removeNotification(notification) {
  notification.style.animation = "slideOut 0.3s ease forwards";
  setTimeout(() => notification.remove(), 300);
}

// ===========================================
// ECO CHALLENGES SYSTEM
// ===========================================

/**
 * Initialize eco challenges functionality
 * Sets up event listeners for challenge completion buttons
 */
function initEcoChallenges() {
  const challengeButtons = document.querySelectorAll(".challenge-btn");
  if (challengeButtons.length === 0) return;

  challengeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("completed")) return;

      btn.classList.add("completed");
      btn.innerText = "Completed ✓";
      btn.disabled = true;

      // Use existing notification system
      showNotification(
        "Great job! 🌱 Small actions create a big impact.",
        "success"
      );
    });
  });
}

// ===========================================
// MODAL SYSTEM
// ===========================================

/**
 * Initialize modal system for service information
 * Sets up modal dialogs for various environmental services
 */
function initModalSystem() {
  const modal = document.getElementById('infoModal');
  if (!modal) return;

  const closeBtn = document.querySelector('.custom-modal-close');
  const modalButtons = document.querySelectorAll('.open-modal-btn');

  // Open Modal
  modalButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const contentId = this.getAttribute('data-id');
      const content = MODAL_CONTENT[contentId];

      if (content) {
        // Populate content
        document.getElementById('modalHeader').innerHTML = `
          <i class="fa-solid ${content.icon}"></i>
          <h2>${content.title}</h2>
        `;
        document.getElementById('modalBody').innerHTML = content.body;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });
  });

  // Close functions
  window.closeInfoModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on overlay click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeInfoModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeInfoModal();
    }
  });
}

// ===========================================
// TESTIMONIAL SLIDER
// ===========================================

/**
 * Initialize testimonial slider with touch support
 * Enables horizontal scrolling and drag functionality for testimonials
 */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  // Add touch support for mobile
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// ===========================================
// PERFORMANCE OPTIMIZATIONS
// ===========================================

/**
 * Initialize lazy loading for images
 * Uses Intersection Observer to load images when they come into view
 */
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });
    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Initialize preloader functionality
 * Hides loading screen when page is fully loaded
 */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  window.addEventListener("load", function() {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      document.body.classList.remove("loading");
    }, 500);
  });
}

// ===========================================
// EDUCATIONAL FEATURES
// ===========================================

/**
 * Initialize glossary system
 * Sets up searchable environmental terms dictionary
 */
function initGlossary() {
  const glossaryList = document.getElementById("glossaryList");
  const searchInput = document.getElementById("glossarySearch");

  if (!glossaryList || !searchInput) return;

  /**
   * Render glossary items based on search filter
   * @param {string} filter - Search term to filter glossary items
   */
  function renderGlossary(filter = "") {
    glossaryList.innerHTML = "";
    GLOSSARY_DATA
      .filter(item =>
        item.term.toLowerCase().startsWith(filter.toLowerCase()) ||
        item.term.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.term.localeCompare(b.term))
      .forEach(item => {
        const div = document.createElement("div");
        div.className = "glossary-item";
        div.innerHTML = `
          <h4>${item.term}</h4>
          <p>${item.definition}</p>
        `;
        glossaryList.appendChild(div);
      });
  }

  // Initial render
  renderGlossary();

  // Live search
  searchInput.addEventListener("input", e => {
    renderGlossary(e.target.value);
  });
}

/**
 * Initialize eco facts display system
 * Rotates through interesting environmental facts
 */
function initEcoFacts() {
  const ecoFactText = document.getElementById("ecoFactText");
  const factCategory = document.getElementById("factCategory");
  const factIcon = document.getElementById("factIcon");

  if (!ecoFactText || !factCategory || !factIcon) return;

  let factIndex = 0;

  /**
   * Display next eco fact in rotation
   */
  function showEcoFact() {
    const fact = ECO_FACTS[factIndex];
    ecoFactText.innerText = fact.text;
    factCategory.innerText = fact.category;
    factIcon.innerText = fact.icon;
    factIndex = (factIndex + 1) % ECO_FACTS.length;
  }

  // Initial call
  showEcoFact();

  // Change fact every 5 seconds
  setInterval(showEcoFact, 5000);
}

// ===========================================
// INTERACTIVE SIMULATIONS
// ===========================================

/**
 * Initialize garden simulation with drag-and-drop functionality
 * Allows users to plant virtual trees and track oxygen production
 */
function initGardenSimulation() {
  const plants = document.querySelectorAll(".plant");
  const garden = document.getElementById("garden-plot");
  const oxygenFill = document.getElementById("oxygen-fill");

  if (!plants.length || !garden || !oxygenFill) return;

  let oxygen = 0;

  plants.forEach(plant => {
    plant.addEventListener("dragstart", e => {
      e.dataTransfer.setData("plant", plant.outerHTML);
      e.dataTransfer.setData("oxygen", plant.dataset.oxygen);
    });
  });

  garden.addEventListener("dragover", e => e.preventDefault());

  garden.addEventListener("drop", e => {
    e.preventDefault();
    const plantHTML = e.dataTransfer.getData("plant");
    const oxygenValue = parseInt(e.dataTransfer.getData("oxygen"));

    const placeholder = garden.querySelector("p");
    if (placeholder) placeholder.remove();

    garden.innerHTML += plantHTML;
    oxygen += oxygenValue;

    if (oxygen > 100) oxygen = 100;
    oxygenFill.style.width = oxygen + "%";
    oxygenFill.textContent = oxygen + "%";
  });
}

/**
 * Initialize impact simulation for environmental actions
 * Updates progress bars based on user selections
 */
function initImpactSimulation() {
  const buttons = document.querySelectorAll(".sim-btn");
  if (!buttons.length) return;

  const impacts = {
    plastic: { animals: 80, water: 70, air: 60 },
    trees: { animals: 90, water: 60, air: 50 }
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const impactType = btn.dataset.impact;
      document.getElementById("animals-bar").style.width = impacts[impactType].animals + "%";
      document.getElementById("water-bar").style.width = impacts[impactType].water + "%";
      document.getElementById("air-bar").style.width = impacts[impactType].air + "%";
    });
  });
}

// ===========================================
// TIMELINE & VISUALIZATION SYSTEMS
// ===========================================

/**
 * Initialize timeline animation system
 * Reveals timeline items as they scroll into view
 */
function initTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!timelineItems.length) return;

  /**
   * Check and reveal timeline items in viewport
   */
  function revealTimeline() {
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (itemTop < windowHeight - 100) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealTimeline);
  revealTimeline(); // Initial check
}

/**
 * Initialize future visualization system
 * Shows different Earth scenarios based on environmental impact
 */
function initFutureVisualization() {
  const futureDisplay = document.getElementById("futureDisplay");
  if (!futureDisplay) return;

  /**
   * Show future Earth scenario
   * @param {string} year - Time period to display (present, 2050, 2100)
   */
  window.showFuture = function(year) {
    if (year === "present") {
      futureDisplay.innerHTML = `
        🌍 <h3>Earth Today</h3>
        <p>Nature is still healing. Our actions matter.</p>
      `;
      futureDisplay.style.background = "#c8e6c9";
    }

    if (year === "2050") {
      futureDisplay.innerHTML = `
        🌎 <h3>Earth in 2050</h3>
        <p>Less trees 🌳, hotter climate ☀️, rising seas 🌊</p>
      `;
      futureDisplay.style.background = "#fff3cd";
    }

    if (year === "2100") {
      futureDisplay.innerHTML = `
        🌑 <h3>Earth in 2100</h3>
        <p>Extreme heat ☀️, wildlife loss 🐾, water scarcity 💧</p>
      `;
      futureDisplay.style.background = "#f8d7da";
    }
  }
}

/**
 * Initialize survival score calculation system
 * Updates survival metrics based on environmental factors
 */
function initSurvivalScore() {
  const finalScore = document.getElementById("finalScore");
  if (!finalScore) return;

  /**
   * Update survival score display
   * @param {number} air - Air quality percentage
   * @param {number} water - Water quality percentage
   * @param {number} bio - Biodiversity percentage
   */
  window.updateSurvivalScore = function(air, water, bio) {
    const airBar = document.getElementById("airBar");
    const waterBar = document.getElementById("waterBar");
    const bioBar = document.getElementById("bioBar");
    const scoreMessage = document.getElementById("scoreMessage");

    if (!airBar || !waterBar || !bioBar || !scoreMessage) return;

    airBar.style.width = air + "%";
    airBar.textContent = air + "%";
    waterBar.style.width = water + "%";
    waterBar.textContent = water + "%";
    bioBar.style.width = bio + "%";
    bioBar.textContent = bio + "%";

    const survival = Math.round((air + water + bio) / 3);
    finalScore.textContent = "Survival Score: " + survival + "%";

    if (survival >= 75) {
      scoreMessage.textContent = "🌱 Earth is thriving! Life is safe.";
    } else if (survival >= 40) {
      scoreMessage.textContent = "⚠️ Earth is struggling. Action needed!";
    } else {
      scoreMessage.textContent = "☀️ Earth is in danger! Immediate action required!";
    }
  }
}

// ===========================================
// THEME & ACCESSIBILITY FEATURES
// ===========================================

/**
 * Initialize theme toggle functionality
 * Handles light/dark theme switching with localStorage persistence
 */
function initThemeToggle() {
  if (typeof window.initThemeToggle === 'function') {
    window.initThemeToggle();
    return;
  }

  // Minimal fallback if global theme-toggle.js is not loaded
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const icon = toggle.querySelector("i");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    if (icon) icon.classList.replace("fa-moon", "fa-sun");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");

    if (icon) {
      icon.classList.toggle("fa-moon", !isDark);
      icon.classList.toggle("fa-sun", isDark);
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/**
 * Initialize scroll to bottom button
 * Provides quick navigation to bottom of page
 */
function initScrollBottomButton() {
  const scrollBtn = document.getElementById("scrollBottomBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  });
}

// ===========================================
// EARTH VISUALIZATION SYSTEM
// ===========================================

/**
 * Initialize Earth visualization with emotional states
 * Updates Earth appearance based on environmental score
 */
function initEarthVisualization() {
  const earth = document.getElementById("earth");
  if (!earth) return;

  /**
   * Update Earth visualization based on score
   * @param {number} score - Environmental impact score (0-100)
   */
  window.updateEarth = function(score) {
    const earthText = document.getElementById("earthText");
    const sun = document.querySelector(".sun-rays");
    const rain = document.querySelector(".rain");
    const birds = document.getElementById("birdsSound");
    const heart = document.getElementById("heartSound");

    earth.className = "earth";

    if (sun) sun.style.opacity = 0;
    if (rain) rain.style.opacity = 0;
    if (birds) {
      birds.pause();
      birds.currentTime = 0;
    }
    if (heart) {
      heart.pause();
      heart.currentTime = 0;
    }

    if (score >= 60) {
      earth.classList.add("happy");
      if (sun) sun.style.opacity = 1;
      if (birds) birds.play();
      if (earthText) earthText.innerText = "Earth is happy and thriving 🌱";
    } else if (score >= 20) {
      earth.classList.add("sad");
      if (rain) rain.style.opacity = 1;
      if (earthText) earthText.innerText = "Earth is sad... needs care 💧";
    } else {
      earth.classList.add("critical");
      if (rain) rain.style.opacity = 1;
      if (heart) heart.play();
      if (earthText) earthText.innerText = "Earth is critical! Act now 🚨";
    }
  }
}

// ===========================================
// WILDLIFE FEATURES
// ===========================================

/**
 * Initialize wildlife filter system
 * Enables filtering of wildlife cards by category
 */
function initWildlifeFilter() {
  // Learn More toggle
  document.querySelectorAll(".learn-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const info = btn.previousElementSibling;
      info.style.display = info.style.display === "block" ? "none" : "block";
      btn.textContent = info.style.display === "block" ? "Show Less" : "Learn More";
    });
  });

  // Filter system
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".wildlife-card");

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Initialize flip card functionality
 * Enables 3D card flipping animations
 */
function initFlipCards() {
  const flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach(card => {
    card.addEventListener("click", function() {
      this.classList.toggle("flipped");
    });
  });
}

/**
 * Initialize noise pollution crisis alert system
 * Manages Level 3 emergency alerts for shipping noise pollution
 */
function initNoiseCrisisAlert() {
  // Initialize the crisis alert manager
  window.noiseCrisisManager = new NoiseCrisisAlertManager();
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Debounce function for scroll events
 * Prevents excessive function calls during scroll events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for resize events
 * Limits function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===========================================
// NOISE POLLUTION CRISIS ALERT SYSTEM
// ===========================================

/**
 * Noise Pollution Crisis Alert Management
 * Handles Level 3 emergency alerts for shipping noise pollution
 */
class NoiseCrisisAlertManager {
  constructor() {
    this.alertBanner = document.getElementById('noise-crisis-alert-banner');
    this.isDismissed = this.getDismissedStatus();
    this.init();
  }

  init() {
    if (!this.isDismissed && this.shouldShowAlert()) {
      this.showAlert();
    }
  }

  shouldShowAlert() {
    // Show alert on homepage and relevant pages
    const currentPath = window.location.pathname;
    const allowedPages = ['/', '/index.html', ''];
    return allowedPages.some(page => currentPath.endsWith(page));
  }

  showAlert() {
    if (this.alertBanner) {
      // Add body class for layout adjustments
      document.body.classList.add('noise-crisis-alert-shown');

      // Show banner with animation
      this.alertBanner.style.display = 'block';
      this.alertBanner.style.animation = 'slideDown 0.5s ease-out';

      // Announce to screen readers
      this.announceToScreenReader('Level 3 Emergency: Shipping noise pollution crisis affecting marine mammals. Critical communication disruption detected.');
    }
  }

  hideAlert() {
    if (this.alertBanner) {
      this.alertBanner.classList.add('closing');
      document.body.classList.remove('noise-crisis-alert-shown');

      setTimeout(() => {
        this.alertBanner.style.display = 'none';
        this.alertBanner.classList.remove('closing');
      }, 500);
    }
  }

  dismissAlert() {
    this.setDismissedStatus(true);
    this.hideAlert();
  }

  getDismissedStatus() {
    return localStorage.getItem('noiseCrisisAlertDismissed') === 'true';
  }

  setDismissedStatus(dismissed) {
    localStorage.setItem('noiseCrisisAlertDismissed', dismissed.toString());
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('status-messages');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }
}

// INDIGENOUS KNOWLEDGE LOSS CRISIS ALERT SYSTEM
/**
 * Indigenous Knowledge Loss Crisis Alert Management
 * Handles the display and dismissal of Level 3 indigenous knowledge crisis alerts
 */
class IndigenousCrisisAlertManager {
  constructor() {
    this.alertBanner = document.getElementById('indigenous-crisis-alert-banner');
    this.isDismissed = this.getDismissedState();

    // Show alert if not dismissed and conditions are met
    if (!this.isDismissed && this.shouldShowAlert()) {
      this.showAlert();
    }
  }

  shouldShowAlert() {
    // Always show for Level 3 crisis (can add more complex logic later)
    return true;
  }

  showAlert() {
    if (this.alertBanner) {
      // Add slide-in animation
      this.alertBanner.style.display = 'block';
      this.alertBanner.style.transform = 'translateY(-100%)';
      this.alertBanner.style.transition = 'transform 0.5s ease-out';

      // Trigger animation
      setTimeout(() => {
        this.alertBanner.style.transform = 'translateY(0)';
      }, 100);

      // Add body class for layout adjustments
      document.body.classList.add('indigenous-crisis-alert-shown');

      // Announce to screen readers
      this.announceToScreenReader('Level 3 Emergency: Indigenous ecological knowledge loss crisis. Traditional conservation practices are disappearing, threatening biodiversity and ecosystem resilience.');
    }
  }

  dismissAlert() {
    if (this.alertBanner) {
      // Add closing animation
      this.alertBanner.classList.add('closing');
      this.alertBanner.style.transform = 'translateY(-100%)';

      // Remove body class
      document.body.classList.remove('indigenous-crisis-alert-shown');

      // Store dismissal state
      this.setDismissedState(true);

      // Remove the banner after animation completes
      setTimeout(() => {
        this.alertBanner.style.display = 'none';
        this.alertBanner.classList.remove('closing');
      }, 500);
    }
  }

  getDismissedState() {
    return localStorage.getItem('indigenousCrisisAlertDismissed') === 'true';
  }

  setDismissedState(dismissed) {
    localStorage.setItem('indigenousCrisisAlertDismissed', dismissed.toString());
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('status-messages');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }
}

// Global function for close button
function closeIndigenousCrisisAlert() {
  if (window.indigenousCrisisManager) {
    window.indigenousCrisisManager.dismissAlert();
  }
}

// Global function for close button
function closeNoiseCrisisAlert() {
  if (window.noiseCrisisManager) {
    window.noiseCrisisManager.dismissAlert();
  }
}

/**
 * Initialize indigenous knowledge loss crisis alert system
 */
function initIndigenousCrisisAlert() {
  // Initialize the crisis alert manager
  window.indigenousCrisisManager = new IndigenousCrisisAlertManager();
}

// ===========================================
// CONSOLE LOGO & DEBUGGING
// ===========================================

// Display application branding in console
console.log(
  "%c🌿 EcoLife - Protect Our Planet & Animals 🐾",
  "font-size: 20px;font-weight: bold;color: #2e7d32;text-shadow: 2px 2px 4px rgba(0,0,0,0.1);"
);

console.log(
  "%cBuilt with ❤️ for a greener future",
  "font-size: 14px;color: #666;"
);

// ===========================================
// CRISIS ALERT FUNCTIONALITY
// ===========================================

/**
 * Close the Level 3 Crisis Alert Banner
 * Stores user preference in localStorage to prevent repeated display
 */
function closeCrisisAlert() {
  const alertBanner = document.getElementById('crisisAlert');
  if (alertBanner) {
    // Add closing animation
    alertBanner.classList.add('closing');
    
    // Remove crisis alert styling from body
    document.body.classList.remove('crisis-alert-shown');
    
    // Remove the banner after animation completes
    setTimeout(() => {
      alertBanner.remove();
    }, 500);
    
    // Store user preference (optional - can be removed if always want to show alert)
    localStorage.setItem('fireCrisisAlertClosed', 'true');
    
    console.log('🚨 Crisis Alert Closed - User has been informed about Level 3 Fire Crisis');
  }
}

/**
 * Initialize Crisis Alert Banner
 * Checks if user has previously dismissed the alert
 */
function initCrisisAlert() {
  const alertClosed = localStorage.getItem('fireCrisisAlertClosed');
  
  // For Level 3 Crisis, show alert regardless of previous dismissal
  // Remove the next 3 lines if you want to respect user's dismissal
  if (alertClosed === 'true') {
    // For emergency situations, we want to show the alert again after 24 hours
    const dismissTime = localStorage.getItem('fireCrisisAlertDismissTime');
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    if (!dismissTime || parseInt(dismissTime) < oneDayAgo) {
      localStorage.removeItem('fireCrisisAlertClosed');
      localStorage.setItem('fireCrisisAlertDismissTime', Date.now().toString());
    }
  }
  
  // Show emergency notification after 5 seconds if user hasn't interacted
  setTimeout(() => {
    const alertBanner = document.getElementById('crisisAlert');
    if (alertBanner && !alertBanner.classList.contains('closing')) {
      showEmergencyNotification();
    }
  }, 5000);
}

/**
 * Show additional emergency notification for Level 3 Crisis
 */
function showEmergencyNotification() {
  // Create floating emergency notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(45deg, #8B0000, #FF0000);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(255, 0, 0, 0.6);
    z-index: 2001;
    animation: urgentPulse 2s infinite;
    max-width: 300px;
    font-weight: 600;
  `;
  
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <i class="fas fa-fire" style="font-size: 1.2rem; animation: urgentFlash 1s infinite;"></i>
      <div>
        <strong>URGENT ACTION NEEDED</strong><br>
        <small>Level 3 Fire Crisis - Wildlife at Risk</small>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer; padding: 5px;">×</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
  
  console.log('🔥 Emergency notification displayed - Level 3 Crisis requires immediate attention');
}

// Initialize crisis alert on page load
document.addEventListener('DOMContentLoaded', initCrisisAlert);

// Make closeCrisisAlert globally available
window.closeCrisisAlert = closeCrisisAlert;

// ===========================================
// END OF MAIN.JS
// ===========================================