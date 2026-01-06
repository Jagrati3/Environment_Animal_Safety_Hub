/* ===== ECOLIFE MAIN JAVASCRIPT ===== */

/**
 * Main application entry point.
 * Initializes all modular components when the DOM is fully loaded.
 * This serves as the central initialization hub for the entire application,
 * calling init functions from all imported modules in the correct order.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initAOS();
  initCounterAnimation();
  initParticles();
  initFormHandlers();
  initNavbarActiveState();
  initScrollProgress()
  initEcoChallenges();
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });
  }

  // Close mobile nav on link click
  const navLinkItems = document.querySelectorAll(".nav-link");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("nav-open");
    });
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains("active")) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("nav-open");
    }
  });
}

function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}
/* ===== ECO CHALLENGES ===== */
function initEcoChallenges() {
  const challengeButtons = document.querySelectorAll(".challenge-btn");

  if (challengeButtons.length === 0) return;

  challengeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("completed")) return;

      btn.classList.add("completed");
      btn.innerText = "Completed ✔";
      btn.disabled = true;

      // Use existing notification system
      showNotification(
        "Great job! 🌱 Small actions create a big impact.",
        "success"
      );
    });
  });
}

/* ===== NAVBAR ACTIVE STATE ===== */
function initNavbarActiveState() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
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
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
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

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  if (!backToTop) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ===== AOS (Animate On Scroll) ===== */
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

/* ===== COUNTER ANIMATION ===== */
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

/* ===== PARTICLES EFFECT ===== */
function initParticles() {
  const particlesContainer = document.getElementById("particles");

  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random properties
  const size = Math.random() * 5 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 20 + 10;
  const opacity = Math.random() * 0.5 + 0.1;

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${left}%;
        bottom: -10px;
        animation: particleFloat ${duration}s linear ${delay}s infinite;
    `;

  container.appendChild(particle);
}

// Add particle animation to stylesheet
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

/* ===== FORM HANDLERS ===== */
function initFormHandlers() {
  // Report Form
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleReportSubmit(this);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleNewsletterSubmit(this);
    });
  }

  // File upload preview
  const fileInput = document.querySelector('.file-upload input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0]?.name;
      const label = this.parentElement.querySelector(".file-upload-label span");
      if (fileName && label) {
        label.textContent = fileName;
      }
    });
  }
}

function handleReportSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
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

/* ===== NOTIFICATION SYSTEM ===== */
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
        background: ${
          type === "success"
            ? "#4caf50"
            : type === "error"
            ? "#f44336"
            : "#2196f3"
        };
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

function removeNotification(notification) {
  notification.style.animation = "slideOut 0.3s ease forwards";
  setTimeout(() => notification.remove(), 300);
}

/* ===== TESTIMONIAL SLIDER (Optional Enhancement) ===== */
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

/* ===== LAZY LOADING IMAGES ===== */
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

/* ===== PRELOADER (Optional) ===== */
function initPreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      document.body.classList.remove("loading");
    }, 500);
  });
}

/* ===== UTILITY FUNCTIONS ===== */

// Debounce function for scroll events
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

// Throttle function for resize events
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* ===== CONSOLE MESSAGE ===== */
console.log(
  "%c🌿 EcoLife - Protect Our Planet & Animals 🐾",
  "font-size: 20px; font-weight: bold; color: #2e7d32; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);"
);
console.log(
  "%cBuilt with ❤️ for a greener future",
  "font-size: 14px; color: #666;"
);


/* ===== POPUP MODAL LOGIC ===== */

// Data for all popups
const modalContent = {
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
    <a href="./pages/wildlife.html" class="btn btn-primary" style="margin-top:10px;">
      Learn More
    </a>
  `
}
,
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
            <a href="./pages/feeding.html" class="btn btn-primary" style="margin-top:10px;">
      Join Us!
    </a>
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

// Initialize Modal System
function initModalSystem() {
    const modal = document.getElementById('infoModal');
    const closeBtn = document.querySelector('.custom-modal-close');
    const modalButtons = document.querySelectorAll('.open-modal-btn');
    
    // Open Modal
    modalButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-id');
            const content = modalContent[contentId];
            
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

// Call this function when DOM loads
document.addEventListener("DOMContentLoaded", function () {
    // ... existing init calls ...
    initModalSystem(); // Add this line
});

document.getElementById("carbonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;
  const tips = [];

  const transport = document.getElementById("transport").value;
  const electricity = document.getElementById("electricity").value;
  const plastic = document.getElementById("plastic").value;

  // Transport score
  if (transport === "walk") score += 5;
  else if (transport === "public") score += 15;
  else if (transport === "bike") score += 25;
  else if (transport === "car") {
    score += 40;
    tips.push("Use public transport or carpool whenever possible.");
  }

  // Electricity score
  if (electricity === "low") score += 10;
  else if (electricity === "medium") {
    score += 25;
    tips.push("Switch to LED bulbs and turn off unused appliances.");
  } else if (electricity === "high") {
    score += 40;
    tips.push("Reduce AC usage and use energy-efficient appliances.");
  }

  // Plastic score
  if (plastic === "low") score += 10;
  else if (plastic === "medium") {
    score += 20;
    tips.push("Carry a cloth bag and avoid plastic packaging.");
  } else if (plastic === "high") {
    score += 35;
    tips.push("Replace single-use plastics with reusable alternatives.");
  }

  // Result level
  let level = "";
  if (score <= 40) level = "🌱 Low Footprint – Great job!";
  else if (score <= 80) level = "🌿 Medium Footprint – You can improve!";
  else level = "🔥 High Footprint – Time to take action!";

  // Display result
  const resultDiv = document.getElementById("carbonResult");
  document.getElementById("carbonScore").innerText = score;
  document.getElementById("carbonLevel").innerText = level;

  const tipsList = document.getElementById("carbonTips");
  tipsList.innerHTML = "";
  tips.forEach(tip => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa-solid fa-lightbulb"></i> ${tip}`;
    tipsList.appendChild(li);
  });

  resultDiv.style.display = "block";
  resultDiv.classList.add("success");

  // Scroll to result
  resultDiv.scrollIntoView({ behavior: "smooth", block: "center" });
});


const glossaryData = [
  {
    term: "Biodiversity",
    definition: "The variety of plants, animals, and living organisms on Earth."
  },
  {
    term: "Carbon Footprint",
    definition: "The amount of greenhouse gases released due to human activities."
  },
  {
    term: "Climate Change",
    definition: "Long-term changes in temperature and weather patterns."
  },
  {
    term: "Renewable Energy",
    definition: "Energy that comes from natural sources like sunlight and wind."
  },
  {
    term: "Sustainability",
    definition: "Using resources wisely so future generations can meet their needs."
  },
  {
    term: "Recycling",
    definition: "The process of converting waste into reusable materials."
  },
  {
    term: "Deforestation",
    definition: "Cutting down trees on a large scale, harming the environment."
  },
  {
    term: "Composting",
    definition: "Turning food and garden waste into nutrient-rich soil."
  },
  {
    term: "E-Waste",
    definition: "Discarded electronic devices like phones and computers."
  },
  {
    term: "Zero-Waste",
    definition: "A lifestyle aiming to produce no trash or landfill waste."
  },
  {
    term: "Upcycling",
    definition: "Turning old items into something new and useful."
  },
  {
    term: "Energy Efficiency",
    definition: "Using less energy to perform the same task."
  },
  {
    term: "Greenhouse Gases",
    definition: "Gases that trap heat in the atmosphere, causing global warming."
  },
  {
    term: "Habitat Restoration",
    definition: "Restoring damaged natural environments for wildlife."
  },
  {
    term: "Endangered Species",
    definition: "Animals or plants at risk of extinction."
  },
  {
    term: "Water Footprint",
    definition: "The amount of water used to produce goods or sustain a lifestyle."
  },
  {
    term: "Air Quality",
    definition: "A measure of how clean or polluted the air is."
  },
  {
    term: "Pollution",
    definition: "The presence of harmful substances in the environment."
  },
  {
    term: "Acid Rain",
    definition: "Rain containing pollutants that harm plants, animals, and buildings."
  },
  {
    term: "Circular Economy",
    definition: "An economic system focused on reusing and recycling resources."
  },
  {
    term: "Organic Farming",
    definition: "Farming without synthetic fertilizers or pesticides."
  },
  {
    term: "Climate Resilience",
    definition: "The ability to adapt and recover from climate-related changes."
  },
  {
    term: "Carbon Neutral",
    definition: "Balancing the amount of carbon emitted with actions that remove it."
  },
  {
    term: "Eco-Friendly",
    definition: "Products or actions that have a minimal impact on the environment."
  },
  {
    term: "Rainwater Harvesting",
    definition: "Collecting and storing rainwater for reuse."
  },
  {
    term: "Sustainable Transport",
    definition: "Travel methods that reduce environmental impact, like biking or public transit."
  },
  {
    term: "Poaching",
    definition: "Illegal hunting of animals, often threatening endangered species."
  },
  {
    term: "Microplastics",
    definition: "Tiny plastic particles that pollute oceans and harm wildlife."
  },
  {
    term: "Carbon Tax",
    definition: "A fee on companies for emitting greenhouse gases to encourage reduction."
  },
  {
    term: "Green Bonds",
    definition: "Investments that fund environmentally-friendly projects."
  },
  {
    term: "Decarbonization",
    definition: "Reducing carbon emissions in energy and industry."
  },
  {
    term: "Sustainable Supply Chain",
    definition: "A production system that minimizes environmental and social harm."
  },
  {
    term: "Green Economy",
    definition: "An economy that focuses on sustainable and environmentally-friendly growth."
  },
  {
    term: "Urban Farming",
    definition: "Growing food in cities to reduce transportation and waste."
  },
  {
    term: "Plastic Pollution",
    definition: "The accumulation of plastic products harming wildlife and the environment."
  },
  {
    term: "Sustainable Fashion",
    definition: "Clothing produced in environmentally-friendly and ethical ways."
  },
  {
    term: "Green Jobs",
    definition: "Jobs that contribute to environmental protection and sustainability."
  },
  {
    term: "Eco-Tourism",
    definition: "Travel that focuses on conserving nature and helping local communities."
  },
  {
    term: "Carbon Offset",
    definition: "Actions that compensate for carbon emissions, like planting trees."
  },
  {
    term: "Climate Justice",
    definition: "Fair treatment of all people regarding the impacts of climate change."
  },
  {
    term: "Biodiversity Loss",
    definition: "The reduction in the variety of life in ecosystems."
  },
  {
    term: "Water Conservation",
    definition: "Using water efficiently to prevent waste and preserve resources."
  },
  {
    term: "Renewable Resources",
    definition: "Resources that can be naturally replenished, like sunlight and wind."
  },
  {
    term: "Non-Renewable Resources",
    definition: "Resources that cannot be replaced easily, like fossil fuels."
  },
  {
    term: "Eco-Innovation",
    definition: "Creating new products or technologies that are environmentally friendly."
  },
  {
    term: "Sustainable Cities",
    definition: "Cities designed to reduce pollution, waste, and energy use."
  },
  {
    term: "Climate Mitigation",
    definition: "Actions taken to reduce or prevent greenhouse gas emissions."
  },
  {
    term: "Climate Adaptation",
    definition: "Adjusting to the effects of climate change to reduce harm."
  }
];


const glossaryList = document.getElementById("glossaryList");
const searchInput = document.getElementById("glossarySearch");

function renderGlossary(filter = "") {
  glossaryList.innerHTML = "";

  glossaryData
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
function toggleCard(card) {
  card.classList.toggle("flipped");
}

const ecoFacts = [
  {
    text: "Elephants can recognize themselves in mirrors, showing high intelligence.",
    category: "Animal Fact",
    icon: "🐘"
  },
  {
    text: "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    category: "Recycling Tip",
    icon: "♻️"
  },
  {
    text: "Planting trees helps absorb carbon dioxide and fight climate change.",
    category: "Climate Fact",
    icon: "🌱"
  },
  {
    text: "Plastic waste can take up to 1000 years to decompose.",
    category: "Recycling Tip",
    icon: "🧴"
  },
  {
    text: "Bees are responsible for pollinating nearly 75% of the world’s crops.",
    category: "Animal Fact",
    icon: "🐝"
  },
  {
    text: "Turning off unused lights can significantly reduce your carbon footprint.",
    category: "Climate Tip",
    icon: "💡"
  }
];

let factIndex = 0;

function showEcoFact() {
  const fact = ecoFacts[factIndex];
  document.getElementById("ecoFactText").innerText = fact.text;
  document.getElementById("factCategory").innerText = fact.category;
  document.getElementById("factIcon").innerText = fact.icon;

  factIndex = (factIndex + 1) % ecoFacts.length;
}

// Initial call
showEcoFact();

// Change fact every 5 seconds
setInterval(showEcoFact, 5000);

const plants = document.querySelectorAll(".plant");
const garden = document.getElementById("garden-plot");
const oxygenFill = document.getElementById("oxygen-fill");

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

const buttons = document.querySelectorAll(".sim-btn");

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



const carbonForm = document.getElementById("carbonForm");
const carbonResult = document.getElementById("carbonResult");
const carbonScoreEl = document.getElementById("carbonScore");
const carbonLevelEl = document.getElementById("carbonLevel");
const carbonTipsEl = document.getElementById("carbonTips");
const carbonBadge = document.getElementById("carbonBadge");
const liveScore = document.getElementById("liveScore");
const progressBar = document.getElementById("carbonProgress");

const weights = {
  transport: { walk: 1, public: 2, bike: 3, car: 5 },
  electricity: { low: 1, medium: 3, high: 5 },
  plastic: { low: 1, medium: 3, high: 5 },
};

function updateLiveScore() {
  let score = 0;
  let filled = 0;

  ["transport", "electricity", "plastic"].forEach((id) => {
    const val = document.getElementById(id).value;
    if (val) {
      score += weights[id][val];
      filled++;
    }
  });

  progressBar.style.width = `${(filled / 3) * 100}%`;
  liveScore.textContent = filled ? score : "—";
}

carbonForm.addEventListener("change", updateLiveScore);

carbonForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let score =
    weights.transport[transport.value] +
    weights.electricity[electricity.value] +
    weights.plastic[plastic.value];

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
      <li><i class="fa-solid fa-lightbulb"></i> Reduce power usage</li>`;
  } else {
    carbonLevelEl.textContent = "High footprint. Time to act now 🚨";
    carbonBadge.textContent = "High Impact";
    carbonBadge.classList.add("high");
    carbonTipsEl.innerHTML += `
      <li><i class="fa-solid fa-recycle"></i> Cut plastic usage</li>
      <li><i class="fa-solid fa-bus"></i> Avoid private vehicles</li>
      <li><i class="fa-solid fa-tree"></i> Plant trees regularly</li>`;
  }

  carbonResult.classList.add("success");
  carbonResult.scrollIntoView({ behavior: "smooth" });
});
const timelineItems = document.querySelectorAll(".timeline-item");

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

// Initial check
revealTimeline();



function showFuture(year) {
  const box = document.getElementById("futureDisplay");

  if (year === "present") {
    box.innerHTML = `
      🌍
      <h3>Earth Today</h3>
      <p>Nature is still healing. Our actions matter.</p>`;
    box.style.background = "#c8e6c9";
  }

  if (year === "2050") {
    box.innerHTML = `
      🌎
      <h3>Earth in 2050</h3>
      <p>Less trees 🌳, hotter climate 🌡️, rising seas 🌊</p>`;
    box.style.background = "#fff3cd";
  }

  if (year === "2100") {
    box.innerHTML = `
      🌑
      <h3>Earth in 2100</h3>
      <p>Extreme heat ☠️, wildlife loss 🐾, water scarcity 💧</p>`;
    box.style.background = "#f8d7da";
  }
}



function updateSurvivalScore(air, water, bio) {
  document.getElementById("airBar").style.width = air + "%";
  document.getElementById("airBar").textContent = air + "%";

  document.getElementById("waterBar").style.width = water + "%";
  document.getElementById("waterBar").textContent = water + "%";

  document.getElementById("bioBar").style.width = bio + "%";
  document.getElementById("bioBar").textContent = bio + "%";

  const survival = Math.round((air + water + bio) / 3);
  document.getElementById("finalScore").textContent =
    "Survival Score: " + survival + "%";

  const msg = document.getElementById("scoreMessage");

  if (survival >= 75) {
    msg.textContent = "🌱 Earth is thriving! Life is safe.";
  } else if (survival >= 40) {
    msg.textContent = "⚠️ Earth is struggling. Action needed!";
  } else {
    msg.textContent = "☠️ Earth is in danger. Immediate action required!";
  }
}

/* Example values – connect with your game */
updateSurvivalScore(70, 55, 65);


const toggle = document.getElementById("themeToggle");
  const icon = toggle.querySelector("i");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  const scrollBtn = document.getElementById("scrollBottomBtn");

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

 

function updateEarth(score) {
  const earth = document.getElementById("earth");
  const text = document.getElementById("earthText");
  const sun = document.querySelector(".sun-rays");
  const rain = document.querySelector(".rain");
  const birds = document.getElementById("birdsSound");
  const heart = document.getElementById("heartSound");

  earth.className = "earth";
  sun.style.opacity = 0;
  rain.style.opacity = 0;

  birds.pause();
  heart.pause();
  birds.currentTime = 0;
  heart.currentTime = 0;

  if (score >= 60) {
    earth.classList.add("happy");
    sun.style.opacity = 1;
    birds.play();
    text.innerText = "Earth is happy and thriving 🌱";
  }
  else if (score >= 20) {
    earth.classList.add("sad");
    rain.style.opacity = 1;
    text.innerText = "Earth is sad... needs care 💧";
  }
  else {
    earth.classList.add("critical");
    rain.style.opacity = 1;
    heart.play();
    text.innerText = "Earth is critical! Act now 🚨";
  }
}

/* Example auto-call */
updateEarth(75);

// Learn More toggle
  document.querySelectorAll(".learn-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const info = btn.previousElementSibling;
      info.style.display =
        info.style.display === "block" ? "none" : "block";
      btn.textContent =
        info.style.display === "block" ? "Show Less" : "Learn More";
    });
  });

  // Filter system
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".wildlife-card");

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

  