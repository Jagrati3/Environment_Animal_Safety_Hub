// Urban Green Space Finder UI Logic
// Requires: urban-green-spaces-data.js

document.addEventListener('DOMContentLoaded', function() {
  const listEl = document.getElementById('urbanGreenList');
  const searchEl = document.getElementById('urbanGreenSearch');
  let data = window.greenSpaces || [];

  function renderList(filter = "") {
    let filtered = data.filter(space => {
      const search = filter.toLowerCase();
      return (
        space.name.toLowerCase().includes(search) ||
        space.address.toLowerCase().includes(search) ||
        space.amenities.some(a => a.toLowerCase().includes(search))
      );
    });
    if (filtered.length === 0) {
      listEl.innerHTML = '<div style="color:#888;padding:2rem;text-align:center">No green spaces found.</div>';
      return;
    }
    listEl.innerHTML = filtered.map(space => renderCard(space)).join('');
    // Attach review form listeners
    filtered.forEach(space => attachReviewHandler(space.id));
  }

  function renderCard(space) {
    return `
      <div class="urban-green-card" id="green-card-${space.id}">
        <div class="urban-green-name">${space.name}</div>
        <div class="urban-green-address">${space.address}</div>
        <div class="urban-green-amenities">
          ${space.amenities.map(a => `<span class="urban-green-amenity">${a}</span>`).join(' ')}
        </div>
        <div class="urban-green-reviews">
          <b>Reviews:</b>
          <ul style="margin:0.3rem 0 0 1.2rem;padding:0;">
            ${space.reviews.map(r => `<li><span class="urban-green-rating">★${r.rating}</span> ${r.user}: ${r.comment}</li>`).join('')}
          </ul>
        </div>
        <div class="urban-green-activities">
          <b>Eco Activities/Events:</b>
          <ul style="margin:0.3rem 0 0 1.2rem;padding:0;">
            ${space.activities.map(ev => `<li>${ev}</li>`).join('')}
          </ul>
        </div>
        <form class="urban-green-add-review" id="review-form-${space.id}" autocomplete="off">
          <input type="text" name="user" placeholder="Your name" required style="width:110px">
          <input type="number" name="rating" min="1" max="5" placeholder="★" required style="width:60px">
          <textarea name="comment" rows="1" placeholder="Add a review..." required style="width:160px"></textarea>
          <button type="submit">Add Review</button>
        </form>
      </div>
    `;
  }

  function attachReviewHandler(id) {
    const form = document.getElementById(`review-form-${id}`);
    if (!form) return;
    form.onsubmit = function(e) {
      e.preventDefault();
      const user = form.user.value.trim();
      const rating = parseInt(form.rating.value);
      const comment = form.comment.value.trim();
      if (!user || !comment || isNaN(rating) || rating < 1 || rating > 5) return;
      const idx = data.findIndex(s => s.id === id);
      if (idx !== -1) {
        data[idx].reviews.push({ user, rating, comment });
        renderList(searchEl.value);
      }
    };
  }

  searchEl.addEventListener('input', e => {
    renderList(e.target.value);
  });

  renderList();
});
