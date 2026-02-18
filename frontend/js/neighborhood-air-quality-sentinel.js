const logModal = document.getElementById('log-modal');
const toast = document.getElementById('toast');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

const toggleModal = (open) => {
  logModal.classList.toggle('active', open);
};

document.getElementById('open-log').addEventListener('click', () => toggleModal(true));

document.querySelectorAll('[data-close="log-modal"]').forEach((btn) => {
  btn.addEventListener('click', () => toggleModal(false));
});

logModal.addEventListener('click', (event) => {
  if (event.target === logModal) {
    toggleModal(false);
  }
});

document.getElementById('log-form').addEventListener('submit', (event) => {
  event.preventDefault();
  toggleModal(false);
  showToast('Observation logged. Thanks for helping your neighborhood.');
  event.target.reset();
});

document.getElementById('open-route').addEventListener('click', () => {
  showToast('Safe route options updated.');
});

document.getElementById('open-tips').addEventListener('click', () => {
  showToast('Indoor air tips sent to your dashboard.');
});

document.getElementById('share-alert').addEventListener('click', () => {
  showToast('Alert shared with community.');
});

document.getElementById('open-alerts').addEventListener('click', () => {
  showToast('Alert preferences saved.');
});

document.getElementById('reset-filters').addEventListener('click', () => {
  document.getElementById('search-input').value = '';
  document.getElementById('time-filter').value = '';
  document.getElementById('risk-filter').value = '';
  document.getElementById('symptom-filter').value = '';
  showToast('Filters cleared.');
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((btn) => btn.classList.remove('active'));
    chip.classList.add('active');
    showToast(`Map layer: ${chip.textContent}`);
  });
});
