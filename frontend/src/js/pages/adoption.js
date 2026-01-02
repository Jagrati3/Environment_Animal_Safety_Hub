const DATA_URL = '../assets/data/adoption-data.json';
const COMPONENTS = {
  card: '../components/card.html',
  modal: '../components/modal.html'
};

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.text();
}

function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

function interpolate(template, data) {
  return template.replace(/{{(\w+)}}/g, (_, key) => (data[key] ?? ''));
}

async function init() {
  const [dataText, cardHtml, modalHtml] = await Promise.all([
    fetchText(DATA_URL),
    fetchText(COMPONENTS.card),
    fetchText(COMPONENTS.modal)
  ]);

  const animals = JSON.parse(dataText);
  const templatesContainer = document.getElementById('component-templates');
  templatesContainer.innerHTML = cardHtml + modalHtml;

  const cardTemplate = document.getElementById('animal-card-template');
  const modalTemplate = document.getElementById('animal-modal-template');

  const listEl = document.getElementById('animal-list');
  const noResults = document.getElementById('no-results');
  const searchInput = document.getElementById('search');
  const speciesFilter = document.getElementById('filter-species');

  function render(items) {
    listEl.innerHTML = '';
    if (!items.length) {
      noResults.hidden = false;
      return;
    }
    noResults.hidden = true;

    items.forEach(item => {
      const clone = document.importNode(cardTemplate.content, true);
      let html = clone.firstElementChild.outerHTML;
      html = interpolate(html, item);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      const card = wrapper.firstElementChild;

      // wire buttons
      card.querySelector('.btn-view').addEventListener('click', () => openModal(item));
      card.querySelector('.btn-adopt').addEventListener('click', () => adopt(item));

      listEl.appendChild(card);
    });
  }

  function openModal(item) {
    // remove existing modal if any
    const existing = document.querySelector('.modal');
    if (existing) existing.remove();

    const clone = document.importNode(modalTemplate.content, true);
    let html = clone.firstElementChild.outerHTML;
    html = interpolate(html, item);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    const modalEl = wrapper.firstElementChild;

    // attach close handlers
    modalEl.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => modalEl.remove()));
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        modalEl.remove();
        document.removeEventListener('keydown', escHandler);
      }
    });

    // adopt button
    const adoptBtn = modalEl.querySelector('.btn-adopt');
    adoptBtn.addEventListener('click', () => adopt(item));

    document.body.appendChild(modalEl);
    modalEl.querySelector('.modal-panel').focus?.();
  }

  function adopt(item) {
    const subject = encodeURIComponent(`Adoption Interest - ${item.name}`);
    const body = encodeURIComponent(`Hi,\n\nI am interested in adopting ${item.name} (id: ${item.id}). Please share the next steps.\n\nThanks,`);
    window.location.href = `mailto:adoptions@example.org?subject=${subject}&body=${body}`;
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const species = speciesFilter.value;
    const filtered = animals.filter(a => {
      const matchesQ = q === '' || [a.name, a.species, a.location, a.description].join(' ').toLowerCase().includes(q);
      const matchesSpecies = !species || a.species === species;
      return matchesQ && matchesSpecies;
    });
    render(filtered);
  }

  searchInput.addEventListener('input', () => applyFilters());
  speciesFilter.addEventListener('change', () => applyFilters());

  // initial render
  render(animals);
}

// initialize when DOM is ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();