document.addEventListener("DOMContentLoaded", () => {
  // 1. Mark body as loaded to enable animations safely
  document.body.classList.add('js-loaded');

  /* ================================
     SCROLL ANIMATION ENGINE
     ================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe existing elements
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Helper to observe dynamically added elements
  const animateNewElement = (el, delay = 0) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${delay}s`;
    revealObserver.observe(el);
  };

  /* ================================
     DATA FETCHING (With Fallbacks)
     ================================ */
  
  // 1. Fetch Contributors
  async function fetchContributors() {
    const box = document.getElementById("contributors");
    if(!box) return;

    try {
      const res = await fetch("https://api.github.com/repos/Jagrati3/Environment_Animal_Safety_Hub/contributors");
      if (!res.ok) throw new Error("API Limit or Network Error");
      const data = await res.json();

      box.innerHTML = ""; // Clear loader

      data.slice(0, 10).forEach((c, index) => {
        const div = document.createElement("div");
        div.className = "contributor";
        
        div.innerHTML = `
          <img src="${c.avatar_url}" alt="${c.login}">
          <h4>${c.login}</h4>
          <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">${c.contributions} Commits</p>
          <a href="${c.html_url}" target="_blank" class="github-btn">
            <i class="fa-brands fa-github"></i> Profile
          </a>
        `;
        box.appendChild(div);
        animateNewElement(div, index * 0.1);
      });

    } catch (err) {
      console.warn("Contributor fetch failed, showing fallback.");
      // If API fails, show manual fallback so section isn't empty
      box.innerHTML = `
        <div class="contributor">
           <i class="fa-solid fa-users" style="font-size:3rem; color:#ccc; margin:20px 0;"></i>
           <p>Contributors list unavailable currently.</p>
           <a href="https://github.com/Jagrati3/Environment_Animal_Safety_Hub/graphs/contributors" class="github-btn">
             View on GitHub
           </a>
        </div>`;
      animateNewElement(box.children[0]);
    }
  }

  // 2. Fetch Admin/Mentor Profile
  async function fetchProfile(username, elementId, role) {
    const card = document.getElementById(elementId);
    if (!card) return;

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User fetch failed");
      const user = await res.json();

      card.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.name}" style="width:120px; height:120px; border-radius:50%; margin-bottom:15px; border:3px solid #4caf50;">
        <h3 style="margin:0; font-size:1.5rem;">${user.name || username}</h3>
        <p style="color:#2e7d32; font-weight:600; margin:5px 0 15px;">${role}</p>
        
        <div style="display:flex; gap:10px; justify-content:center;">
          <a href="${user.html_url}" target="_blank" class="github-btn">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      `;
      // No need to re-animate card if the container is already revealed
      
    } catch (err) {
      // Keep the hardcoded HTML from the HTML file if JS fails
      console.log(`Could not fetch ${username}`);
    }
  }

  // Init
  fetchContributors();
  fetchProfile("Jagrati3", "admin-card", "Project Admin");
  fetchProfile("nikhilrsingh", "mentor-card", "Project Mentor");
});


document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("explorePeopleBtn");
  const adminSection = document.getElementById("admin");

  if (exploreBtn && adminSection) {
    exploreBtn.addEventListener("click", () => {
      adminSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
});
