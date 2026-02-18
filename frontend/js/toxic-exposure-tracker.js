const auditModal = document.getElementById('audit-modal');
const toast = document.getElementById('toast');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

const toggleModal = (open) => {
  auditModal.classList.toggle('active', open);
};

document.getElementById('start-audit').addEventListener('click', () => toggleModal(true));

document.querySelectorAll('[data-close="audit-modal"]').forEach((btn) => {
  btn.addEventListener('click', () => toggleModal(false));
});

auditModal.addEventListener('click', (event) => {
  if (event.target === auditModal) {
    toggleModal(false);
  }
});

document.getElementById('audit-form').addEventListener('submit', (event) => {
  event.preventDefault();
  toggleModal(false);
  showToast('Audit started. We will guide you room-by-room.');
  event.target.reset();
});

document.getElementById('open-scan').addEventListener('click', () => {
  showToast('Scanner opened. Point your camera at a barcode.');
});

document.getElementById('view-report').addEventListener('click', () => {
  showToast('Generating your personalized report...');
});

document.getElementById('open-plan').addEventListener('click', () => {
  showToast('Action plan created with three priorities.');
});
