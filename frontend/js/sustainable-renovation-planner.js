const planModal = document.getElementById('plan-modal');
const toast = document.getElementById('toast');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

const toggleModal = (open) => {
  planModal.classList.toggle('active', open);
};

document.getElementById('start-plan').addEventListener('click', () => toggleModal(true));

document.querySelectorAll('[data-close="plan-modal"]').forEach((btn) => {
  btn.addEventListener('click', () => toggleModal(false));
});

planModal.addEventListener('click', (event) => {
  if (event.target === planModal) {
    toggleModal(false);
  }
});

document.getElementById('plan-form').addEventListener('submit', (event) => {
  event.preventDefault();
  toggleModal(false);
  showToast('Plan created. Your upgrades are ready to track.');
  event.target.reset();
});

document.getElementById('open-rebates').addEventListener('click', () => {
  showToast('Rebate finder updated with local programs.');
});

document.getElementById('open-timeline').addEventListener('click', () => {
  showToast('Budget timeline opened.');
});

document.getElementById('open-materials').addEventListener('click', () => {
  showToast('Material comparison updated.');
});
