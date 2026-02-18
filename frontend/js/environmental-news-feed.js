// Environmental News Feed JS
const newsData = [
  {
    title: "Global Climate Summit Sets Ambitious Targets",
    topic: "Climate",
    region: "Global",
    date: "2026-02-07",
    summary: "World leaders agree on new emissions goals and funding for green tech.",
    url: "https://news.example.com/climate-summit"
  },
  {
    title: "Wildlife Corridors Boost Biodiversity in Asia",
    topic: "Wildlife",
    region: "Asia",
    date: "2026-02-06",
    summary: "New research shows animal crossings are helping endangered species thrive.",
    url: "https://news.example.com/wildlife-corridors"
  },
  {
    title: "EU Passes Landmark Environmental Policy",
    topic: "Policy",
    region: "Europe",
    date: "2026-02-05",
    summary: "The European Union adopts strict new rules on plastic waste and emissions.",
    url: "https://news.example.com/eu-policy"
  },
  {
    title: "Breakthrough in Ocean Cleanup Technology",
    topic: "Research",
    region: "Global",
    date: "2026-02-04",
    summary: "Scientists unveil a new device that removes microplastics from the sea.",
    url: "https://news.example.com/ocean-cleanup"
  },
  {
    title: "Community Forests Drive Conservation in Africa",
    topic: "Conservation",
    region: "Africa",
    date: "2026-02-03",
    summary: "Local communities are leading efforts to restore and protect forests.",
    url: "https://news.example.com/community-forests"
  }
];

let bookmarks = [];
let filteredNews = newsData;

function renderNewsFeed() {
  const list = document.getElementById('newsFeedList');
  list.innerHTML = '';
  if (filteredNews.length === 0) {
    list.innerHTML = '<li>No news articles found.</li>';
    return;
  }
  filteredNews.forEach((n, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="news-article-title">${n.title}</div>
      <div class="news-article-meta">${n.topic} | ${n.region} | ${n.date}</div>
      <div class="news-article-summary">${n.summary}</div>
      <div class="news-article-actions">
        <a href="${n.url}" target="_blank" class="btn btn-primary"><i class="fa fa-external-link-alt"></i> Read More</a>
        <button onclick="bookmarkArticle(${idx})"><i class="fa fa-bookmark"></i> Bookmark</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderBookmarks() {
  const list = document.getElementById('newsBookmarksList');
  list.innerHTML = '';
  if (bookmarks.length === 0) {
    list.innerHTML = '<li>No bookmarks yet.</li>';
    return;
  }
  bookmarks.forEach((n, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="news-article-title">${n.title}</div>
      <div class="news-article-meta">${n.topic} | ${n.region} | ${n.date}</div>
      <div class="news-article-summary">${n.summary}</div>
      <div class="news-article-actions">
        <a href="${n.url}" target="_blank" class="btn btn-primary"><i class="fa fa-external-link-alt"></i> Read More</a>
        <button onclick="removeBookmark(${idx})"><i class="fa fa-trash"></i> Remove</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function filterNews() {
  const search = document.getElementById('newsSearch').value.toLowerCase();
  const topic = document.getElementById('newsTopicFilter').value;
  const region = document.getElementById('newsRegionFilter').value;
  filteredNews = newsData.filter(n =>
    (n.title.toLowerCase().includes(search) || n.summary.toLowerCase().includes(search)) &&
    (topic === '' || n.topic === topic) &&
    (region === '' || n.region === region)
  );
  renderNewsFeed();
}

document.getElementById('newsSearch').oninput = filterNews;
document.getElementById('newsTopicFilter').onchange = filterNews;
document.getElementById('newsRegionFilter').onchange = filterNews;

window.bookmarkArticle = function(idx) {
  const article = filteredNews[idx];
  if (!bookmarks.some(b => b.title === article.title)) {
    bookmarks.push(article);
    renderBookmarks();
  }
};

window.removeBookmark = function(idx) {
  bookmarks.splice(idx, 1);
  renderBookmarks();
};

renderNewsFeed();
renderBookmarks();
