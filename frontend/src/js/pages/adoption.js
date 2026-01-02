// adoption.js: keyboard accessibility, modal control, focus trap
(function(){
  const modal = document.getElementById('pet-modal');
  const modalBody = document.getElementById('modalBody');
  const cards = document.querySelectorAll('.pet-card[role="button"]');
  const sr = document.getElementById('sr-announcer');
  let lastFocused = null;

  function getFocusableElements(root = modal) {
    if (!root) return [];
    return Array.from(root.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled'));
  }

  function openModalWithData(data, sourceElement) {
    lastFocused = sourceElement || document.activeElement;
    modalBody.innerHTML = '';
    const content = document.createElement('div');
    content.innerHTML = `
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Type:</strong> ${escapeHtml(data.type)}</p>
      <p><strong>Age:</strong> ${escapeHtml(data.age)}</p>
      <p>${escapeHtml(data.bio)}</p>
    `;
    modalBody.appendChild(content);

    modal.setAttribute('aria-hidden', 'false');

    // hide main content to assistive tech and disable background interactions
    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('aria-hidden', 'true');
      if ('inert' in main) main.inert = true;
    }

    // announce to screen reader
    if (sr) sr.textContent = `Dialog opened: ${data.name}, ${data.type}, ${data.age}`;

    // prevent background scroll while modal is open
    document.body.style.overflow = 'hidden';

    // ensure modal is focusable and focus it
    if (modal && !modal.hasAttribute('tabindex')) modal.setAttribute('tabindex','-1');
    modal.focus();

    // attach listeners
    document.addEventListener('keydown', handleKeyDown);
    modal.addEventListener('keydown', trapFocus);

    // sentinel handlers
    const start = document.getElementById('sentinel-start');
    const end = document.getElementById('sentinel-end');
    if (start) start.addEventListener('focus', () => {
      const focusable = getFocusableElements();
      if (focusable.length) focusable[focusable.length - 1].focus();
    });
    if (end) end.addEventListener('focus', () => {
      const focusable = getFocusableElements();
      if (focusable.length) focusable[0].focus();
    });

    // backdrop click closes the modal
    modal.addEventListener('click', backdropClick);
  }

  function backdropClick(e) {
    if (e.target === modal) closeModal();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');

    const main = document.getElementById('main-content');
    if (main) {
      main.removeAttribute('aria-hidden');
      if ('inert' in main) main.inert = false;
    }

    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyDown);
    modal.removeEventListener('keydown', trapFocus);
    modal.removeEventListener('click', backdropClick);

    // clear SR announcement
    if (sr) sr.textContent = '';

    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closeModal();
    }
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || document.activeElement === modal) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function handleCardKeydown(e, card) {
    const key = e.key || e.keyIdentifier || e.keyCode;
    if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 13 || key === 32) {
      e.preventDefault();
      const data = JSON.parse(card.getAttribute('data-pet'));
      openModalWithData(data, card);
    }
  }

  // attach to cards
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const data = JSON.parse(card.getAttribute('data-pet'));
      openModalWithData(data, card);
    });

    card.addEventListener('keydown', (e) => handleCardKeydown(e, card));
  });

  // close button
  // find close button dynamically (modal is outside main now)
  const closeBtn = modal ? modal.querySelector('[data-close]') : null;
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault(); closeModal();
      }
    });
  }

  // adopt action (for demo): close modal and announce
  const adoptBtn = document.getElementById('adoptButton');
  if (adoptBtn) {
    adoptBtn.addEventListener('click', () => {
      closeModal();
      if (sr) sr.textContent = 'Thanks for choosing to adopt!';
      setTimeout(() => { if (sr) sr.textContent = ''; }, 2000);
      alert('Thanks for choosing to adopt!');
    });
    adoptBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault(); adoptBtn.click();
      }
    });
  }

  // helper: escape HTML to prevent injection in data attributes
  function escapeHtml(unsafe) {
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Ensure focus returns properly on page unload
  window.addEventListener('beforeunload', () => {
    if (modal) modal.removeAttribute('aria-hidden');
  });

})();