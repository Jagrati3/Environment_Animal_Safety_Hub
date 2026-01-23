/**
 * Main Module Loader
 * Coordinates all JavaScript modules and handles initialization
 */

class ModuleLoader {
  constructor() {
    this.modules = {};
    this.initialized = false;
    this.init();
  }

  async init() {
    try {
      // Initialize core modules
      await this.loadCoreModules();
      
      // Initialize component modules
      await this.loadComponentModules();
      
      // Initialize page-specific modules
      this.loadPageModules();
      
      this.initialized = true;
      console.log('✅ All modules loaded successfully');
    } catch (error) {
      console.error('❌ Error loading modules:', error);
      this.handleModuleError('Failed to load modules', error);
    }
  }

  async loadCoreModules() {
    const coreModules = ['utilities', 'scroll-controls', 'error-handler'];

    for (const moduleName of coreModules) {
      try {
        const module = await import(`./components/${moduleName}.js`);
        this.modules[moduleName] = module.default;
      } catch (error) {
        console.warn(`Failed to load core module: ${moduleName}`, error);
        this.handleModuleError(`Core module ${moduleName} failed`, error);
      }
    }
  }

  async loadComponentModules() {
    const componentModules = ['quiz', 'dictionary', 'environmental-effects', 'garden-game', 'survival-score'];

    for (const moduleName of componentModules) {
      try {
        const module = await import(`./components/${moduleName}.js`);
        this.modules[moduleName] = module.default;
      } catch (error) {
        console.warn(`Failed to load component module: ${moduleName}`, error);
        // Don't break the app for non-critical components
      }
    }
  }

  loadPageModules() {
    // Load page-specific modules based on current page
    const currentPage = this.getCurrentPageType();
    
    switch (currentPage) {
      case 'home':
        this.loadHomePageModules();
        break;
      case 'quiz':
        this.loadQuizPageModules();
        break;
      case 'games':
        this.loadGamePageModules();
        break;
      default:
        console.log('No specific page modules to load');
    }
  }

  getCurrentPageType() {
    const path = window.location.pathname;
    if (path.includes('quiz')) return 'quiz';
    if (path.includes('game')) return 'games';
    if (path === '/' || path.includes('index')) return 'home';
    return 'other';
  }

  loadHomePageModules() {
    // Home page specific initialization
    this.initializeHomeFeatures();
  }

  loadQuizPageModules() {
    // Quiz page specific initialization
    console.log('Loading quiz page modules');
  }

  loadGamePageModules() {
    // Game page specific initialization
    console.log('Loading game page modules');
  }

  initializeHomeFeatures() {
    // Initialize home page specific features
    this.initializeStatCounters();
    this.initializeModalHandlers();
    this.initializeChallengeButtons();
  }

  initializeStatCounters() {
    // Animate statistics counters
    const statElements = document.querySelectorAll('.stat-num[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          this.animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    });

    statElements.forEach(el => observer.observe(el));
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 20);
  }

  initializeModalHandlers() {
    // Handle modal opening
    const modalButtons = document.querySelectorAll('.open-modal-btn');
    modalButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.dataset.id;
        this.openModal(modalId);
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById('infoModal');
    const modalHeader = document.getElementById('modalHeader');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalHeader || !modalBody) return;

    const modalContent = this.getModalContent(modalId);
    modalHeader.innerHTML = modalContent.header;
    modalBody.innerHTML = modalContent.body;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  getModalContent(modalId) {
    const content = {
      'animal-rescue': {
        header: '<h2><i class="fa-solid fa-paw"></i> Animal Rescue Program</h2>',
        body: '<p>Join our 24/7 animal rescue operations. We provide emergency care, rehabilitation, and find loving homes for rescued animals.</p><ul><li>Emergency response team</li><li>Veterinary care</li><li>Rehabilitation facilities</li><li>Adoption services</li></ul>'
      },
      'wildlife': {
        header: '<h2><i class="fa-solid fa-shield-heart"></i> Wildlife Protection</h2>',
        body: '<p>Protecting endangered species and their habitats through conservation efforts and community education.</p>'
      },
      'feeding': {
        header: '<h2><i class="fa-solid fa-bowl-food"></i> Animal Feeding Program</h2>',
        body: '<p>Learn safe and responsible ways to feed stray animals. Join our community feeding programs.</p>'
      }
    };

    return content[modalId] || {
      header: '<h2>Information</h2>',
      body: '<p>Content not available.</p>'
    };
  }

  initializeChallengeButtons() {
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    challengeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('completed')) {
          btn.textContent = 'Completed ✓';
          btn.classList.add('completed');
          
          // Update survival score if available
          if (window.survivalScore) {
            window.survivalScore.simulateAction('plant-tree');
          }
        }
      });
    });
  }

  // Public methods for external access
  getModule(name) {
    return this.modules[name];
  }

  isInitialized() {
    return this.initialized;
  }

  handleModuleError(message, error) {
    console.error('ModuleLoader Error:', message, error);
    
    // Show user notification for critical errors
    if (window.globalErrorHandler) {
      window.globalErrorHandler.logError('Module Error', error);
    }
  }

  // Cleanup method
  destroy() {
    try {
      Object.values(this.modules).forEach(module => {
        if (module && typeof module.destroy === 'function') {
          module.destroy();
        }
      });
      this.modules = {};
      this.initialized = false;
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
}

// Global modal close function (for inline onclick handlers)
window.closeInfoModal = function() {
  const modal = document.getElementById('infoModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// Initialize module loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.moduleLoader = new ModuleLoader();
  } catch (error) {
    console.error('Failed to initialize ModuleLoader:', error);
    if (window.globalErrorHandler) {
      window.globalErrorHandler.logError('Critical Error', error);
    }
  }
});

export default ModuleLoader;