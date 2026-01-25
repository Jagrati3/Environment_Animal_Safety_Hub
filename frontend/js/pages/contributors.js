const mentorsGrid = document.getElementById("mentors-grid");
const contributorsGrid = document.getElementById("contributors-grid");

const githubUsername = "omkarhole";
const repoName = "Environment_Animal_Safety_Hub";

const API_URL = `https://api.github.com/repos/${githubUsername}/${repoName}/contributors`;

async function loadContributors() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch contributors");

    const contributors = await response.json();

    // Clear grids
    mentorsGrid.innerHTML = "";
    contributorsGrid.innerHTML = "";

    // First 2 are mentors
    const mentors = contributors.slice(0, 2);
    const others = contributors.slice(2);

    mentors.forEach(user => {
      mentorsGrid.appendChild(createCard(user, true));
    });

    others.forEach(user => {
      contributorsGrid.appendChild(createCard(user, false));
    });

  } catch (error) {
    console.error(error);
    contributorsGrid.innerHTML = "<p>Unable to load contributors.</p>";
  }
}

function createCard(user, isMentor) {
  const card = document.createElement("div");
  card.className = isMentor
    ? "contributor-card mentor-card"
    : "contributor-card";

  card.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.login}">
    <h3>${user.login}</h3>
    <p>${isMentor ? "Mentor" : user.contributions + " contributions"}</p>
    <a href="${user.html_url}" target="_blank">
      <i class="fa-brands fa-github"></i>
    </a>
  `;
  return card;
}

loadContributors();
