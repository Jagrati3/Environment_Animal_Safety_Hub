// Migration Barriers Page JavaScript

// Action button functions
function learnMore() {
  showNotification('Opening wildlife connectivity resources...', 'info');
  setTimeout(() => {
    window.open('https://www.worldwildlife.org/initiatives/wildlife-migration', '_blank');
  }, 1000);
}

function findProjects() {
  showNotification('Finding corridor projects near you...', 'info');
  setTimeout(() => {
    window.open('https://www.wcs.org/our-work/species/greater-yellowstone-ecosystem', '_blank');
  }, 1000);
}

function supportInitiatives() {
  showNotification('Redirecting to conservation donation page...', 'info');
  setTimeout(() => {
    window.open('https://www.worldwildlife.org/donate', '_blank');
  }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;

  // Set icon based on type
  let icon = 'fas fa-info-circle';
  if (type === 'success') icon = 'fas fa-check-circle';
  if (type === 'error') icon = 'fas fa-exclamation-circle';
  if (type === 'warning') icon = 'fas fa-exclamation-triangle';

  notification.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Add notification styles dynamically
const notificationStyles = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
  }

  .notification-info {
    border-left: 4px solid #2c5530;
  }

  .notification-success {
    border-left: 4px solid #27ae60;
  }

  .notification-error {
    border-left: 4px solid #e74c3c;
  }

  .notification-warning {
    border-left: 4px solid #f39c12;
  }

  .notification i {
    font-size: 1.2rem;
  }

  .notification-info i {
    color: #2c5530;
  }

  .notification-success i {
    color: #27ae60;
  }

  .notification-error i {
    color: #e74c3c;
  }

  .notification-warning i {
    color: #f39c12;
  }

  .notification-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  }

  .notification-close:hover {
    color: #333;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    .notification {
      left: 10px;
      right: 10px;
      max-width: none;
    }
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all content sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Add animation styles
  const animationStyles = `
    .content-section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .content-section.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .barrier-card, .species-card, .solution-item, .case-study, .future-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .content-section.animate-in .barrier-card,
    .content-section.animate-in .species-card,
    .content-section.animate-in .solution-item,
    .content-section.animate-in .case-study,
    .content-section.animate-in .future-item {
      opacity: 1;
      transform: translateY(0);
    }

    .content-section.animate-in .barrier-card:nth-child(1) { transition-delay: 0.1s; }
    .content-section.animate-in .barrier-card:nth-child(2) { transition-delay: 0.2s; }
    .content-section.animate-in .barrier-card:nth-child(3) { transition-delay: 0.3s; }
    .content-section.animate-in .barrier-card:nth-child(4) { transition-delay: 0.4s; }
    .content-section.animate-in .barrier-card:nth-child(5) { transition-delay: 0.5s; }
    .content-section.animate-in .barrier-card:nth-child(6) { transition-delay: 0.6s; }

    .content-section.animate-in .species-card:nth-child(1) { transition-delay: 0.1s; }
    .content-section.animate-in .species-card:nth-child(2) { transition-delay: 0.2s; }
    .content-section.animate-in .species-card:nth-child(3) { transition-delay: 0.3s; }
    .content-section.animate-in .species-card:nth-child(4) { transition-delay: 0.4s; }

    .content-section.animate-in .solution-item:nth-child(1) { transition-delay: 0.1s; }
    .content-section.animate-in .solution-item:nth-child(2) { transition-delay: 0.2s; }
    .content-section.animate-in .solution-item:nth-child(3) { transition-delay: 0.3s; }
    .content-section.animate-in .solution-item:nth-child(4) { transition-delay: 0.4s; }
    .content-section.animate-in .solution-item:nth-child(5) { transition-delay: 0.5s; }
    .content-section.animate-in .solution-item:nth-child(6) { transition-delay: 0.6s; }
  `;

  const animStyleSheet = document.createElement('style');
  animStyleSheet.textContent = animationStyles;
  document.head.appendChild(animStyleSheet);
});

// Statistics counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
    const increment = target / speed;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.floor(current).toLocaleString();
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

// Modal functionality for detailed information
function showBarrierModal(barrierType) {
  const modalContent = {
    roads: {
      title: 'Road Barriers',
      content: `
        <h3>Road Ecology Impact</h3>
        <p>Roads fragment habitats and create barriers that prevent wildlife movement. The impact includes:</p>
        <ul>
          <li>Direct mortality from vehicle collisions</li>
          <li>Barrier effects preventing migration</li>
          <li>Habitat fragmentation</li>
          <li>Edge effects and pollution</li>
        </ul>
        <p>Solutions include wildlife crossings, fencing, and traffic calming measures.</p>
      `
    },
    fences: {
      title: 'Fence Barriers',
      content: `
        <h3>Fencing Challenges</h3>
        <p>Fences create impassable barriers for many species, particularly large mammals:</p>
        <ul>
          <li>Agricultural fences block pronghorn migration</li>
          <li>Security fences prevent wildlife movement</li>
          <li>Property boundaries fragment habitats</li>
        </ul>
        <p>Wildlife-friendly fencing and one-way gates can restore connectivity.</p>
      `
    },
    urban: {
      title: 'Urban Development',
      content: `
        <h3>Urban Sprawl Effects</h3>
        <p>Cities create permanent barriers and alter landscapes:</p>
        <ul>
          <li>Complete habitat loss in urban cores</li>
          <li>Fragmentation of remaining habitats</li>
          <li>Light and noise pollution</li>
          <li>Altered hydrology and microclimates</li>
        </ul>
        <p>Green infrastructure and wildlife corridors can mitigate these effects.</p>
      `
    }
  };

  const content = modalContent[barrierType];
  if (!content) return;

  showModal(content.title, content.content);
}

function showModal(title, content) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="closeModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add modal styles
  const modalStyles = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease-out;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      color: #2c5530;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
      padding: 0;
    }

    .modal-body {
      padding: 1.5rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;

  const modalStyleSheet = document.createElement('style');
  modalStyleSheet.textContent = modalStyles;
  document.head.appendChild(modalStyleSheet);

  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.remove();
  }
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});