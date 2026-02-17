const filterState = {
  search: '',
  availability: '',
  amenities: '',
  distance: ''
};

const plotModal = document.getElementById('plot-modal');
const toast = document.getElementById('toast');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

const toggleModal = (open) => {
  plotModal.classList.toggle('active', open);
};

const updateFilters = () => {
  const cards = document.querySelectorAll('.garden-card');
  cards.forEach((card) => {
    const matchesSearch = card.querySelector('h3').textContent.toLowerCase().includes(filterState.search);
    const matchesAvailability = !filterState.availability || card.dataset.availability === filterState.availability;
    const matchesAmenities = !filterState.amenities || card.dataset.amenities.includes(filterState.amenities);
    const matchesDistance = !filterState.distance || Number(card.dataset.distance) <= Number(filterState.distance);

    card.style.display = matchesSearch && matchesAvailability && matchesAmenities && matchesDistance ? 'block' : 'none';
  });
};

const resetFilters = () => {
  filterState.search = '';
  filterState.availability = '';
  filterState.amenities = '';
  filterState.distance = '';

  document.getElementById('search-input').value = '';
  document.getElementById('availability-filter').value = '';
  document.getElementById('amenities-filter').value = '';
  document.getElementById('distance-filter').value = '';

  updateFilters();
};

const activateChip = (chip) => {
  document.querySelectorAll('.chip').forEach((btn) => btn.classList.remove('active'));
  chip.classList.add('active');
};

// Event listeners

document.getElementById('search-input').addEventListener('input', (event) => {
  filterState.search = event.target.value.toLowerCase();
  updateFilters();
});

document.getElementById('availability-filter').addEventListener('change', (event) => {
  filterState.availability = event.target.value;
  updateFilters();
});

document.getElementById('amenities-filter').addEventListener('change', (event) => {
  filterState.amenities = event.target.value;
  updateFilters();
});

document.getElementById('distance-filter').addEventListener('change', (event) => {
  filterState.distance = event.target.value;
  updateFilters();
});

document.getElementById('reset-filters').addEventListener('click', resetFilters);

document.getElementById('open-plot').addEventListener('click', () => toggleModal(true));

document.querySelectorAll('[data-close="plot-modal"]').forEach((btn) => {
  btn.addEventListener('click', () => toggleModal(false));
});

document.getElementById('plot-form').addEventListener('submit', (event) => {
  event.preventDefault();
  toggleModal(false);
  showToast('Plot request sent! We will follow up soon.');
  event.target.reset();
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    activateChip(chip);
    showToast(`Map updated: ${chip.textContent}`);
  });
});

document.getElementById('locate-me').addEventListener('click', () => {
  showToast('Centering map on your location...');
});

document.getElementById('view-calendar').addEventListener('click', () => {
  showToast('Opening seasonal calendar...');
});

document.getElementById('open-messages').addEventListener('click', () => {
  showToast('You have no new messages.');
});

document.getElementById('add-garden').addEventListener('click', () => {
  showToast('Garden submission form coming soon.');
});

plotModal.addEventListener('click', (event) => {
  if (event.target === plotModal) {
    toggleModal(false);
  }
});
