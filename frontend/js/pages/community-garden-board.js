const STORAGE_KEY = "communityGardenBoardPosts";
const LIKE_KEY = "communityGardenBoardLikes";

const elements = {
  postForm: document.getElementById("postForm"),
  authorName: document.getElementById("authorName"),
  categorySelect: document.getElementById("categorySelect"),
  postContent: document.getElementById("postContent"),
  photoUpload: document.getElementById("photoUpload"),
  postTags: document.getElementById("postTags"),
  resetFormBtn: document.getElementById("resetFormBtn"),
  filterSelect: document.getElementById("filterSelect"),
  postsGrid: document.getElementById("postsGrid"),
  moderationList: document.getElementById("moderationList"),
  scrollToBoardBtn: document.getElementById("scrollToBoardBtn")
};

const demoPosts = [
  {
    id: "demo-1",
    author: "Ayaan",
    category: "Gardening",
    content: "Started a balcony herb garden using reused containers! 🌿",
    photo: "",
    tags: ["herbs", "upcycle"],
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    likes: 4,
    comments: [
      { id: "c1", author: "Maya", text: "Love this! I did the same with mason jars." }
    ],
    reports: []
  },
  {
    id: "demo-2",
    author: "Jagrati",
    category: "Recycling",
    content: "Tip: Keep a small bin near the kitchen for compostable scraps.",
    photo: "",
    tags: ["compost", "kitchen"],
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    likes: 7,
    comments: [],
    reports: []
  }
];

function init() {
  elements.scrollToBoardBtn?.addEventListener("click", () => {
    document.getElementById("boardWrapper").scrollIntoView({ behavior: "smooth" });
  });

  elements.postForm.addEventListener("submit", handlePostSubmit);
  elements.resetFormBtn.addEventListener("click", resetForm);
  elements.filterSelect.addEventListener("change", renderPosts);

  if (getPosts().length === 0) {
    savePosts(demoPosts);
  }

  renderPosts();
  renderModerationQueue();
}

function handlePostSubmit(event) {
  event.preventDefault();

  const author = elements.authorName.value.trim();
  const category = elements.categorySelect.value;
  const content = elements.postContent.value.trim();
  const tags = elements.postTags.value
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);

  if (!author || !content) {
    alert("Please provide your name and a post.");
    return;
  }

  const createPost = (photoData) => {
    const posts = getPosts();
    const post = {
      id: `post-${Date.now()}`,
      author,
      category,
      content,
      photo: photoData || "",
      tags,
      createdAt: Date.now(),
      likes: 0,
      comments: [],
      reports: []
    };

    posts.unshift(post);
    savePosts(posts);
    resetForm();
    renderPosts();
  };

  const file = elements.photoUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => createPost(reader.result);
    reader.readAsDataURL(file);
  } else {
    createPost("");
  }
}

function resetForm() {
  elements.postForm.reset();
}

function getPosts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getLikedPosts() {
  const saved = localStorage.getItem(LIKE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

function saveLikedPosts(liked) {
  localStorage.setItem(LIKE_KEY, JSON.stringify(liked));
}

function renderPosts() {
  const filter = elements.filterSelect.value;
  const posts = getPosts();
  const likedPosts = getLikedPosts();

  const filtered = filter === "All" ? posts : posts.filter(post => post.category === filter);

  elements.postsGrid.innerHTML = "";

  if (filtered.length === 0) {
    elements.postsGrid.innerHTML = `<div class="post-card"><p class="muted">No posts yet in this category. Be the first to share!</p></div>`;
    return;
  }

  filtered.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
      <div class="post-header">
        <div class="post-meta">
          <strong>${post.author}</strong>
          <span class="post-category">${post.category}</span>
          <span class="muted">${formatDate(post.createdAt)}</span>
        </div>
        <button class="icon-btn" data-action="report" data-id="${post.id}">
          <i class="fa-solid fa-flag"></i>
        </button>
      </div>
      <p>${post.content}</p>
      ${post.photo ? `<div class="post-photo"><img src="${post.photo}" alt="${post.category} post" /></div>` : ""}
      ${post.tags.length ? `<div class="muted">#${post.tags.join(" #")}</div>` : ""}
      <div class="post-actions">
        <button class="secondary-btn" data-action="like" data-id="${post.id}">
          <i class="fa-solid fa-heart"></i> ${likedPosts.includes(post.id) ? "Liked" : "Like"}
        </button>
        <span>❤️ ${post.likes}</span>
        <span>💬 ${post.comments.length}</span>
      </div>
      <div class="comment-section">
        <div class="comment-list">
          ${post.comments.map(comment => `<div class="comment"><strong>${comment.author}:</strong> ${comment.text}</div>`).join("")}
        </div>
        <form class="comment-form" data-id="${post.id}">
          <input type="text" name="commentAuthor" placeholder="Your name" maxlength="24" required />
          <textarea name="commentText" rows="2" placeholder="Write a comment" required></textarea>
          <button type="submit" class="ghost-btn">Add Comment</button>
        </form>
      </div>
    `;

    card.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", handlePostAction);
    });

    card.querySelector(".comment-form").addEventListener("submit", handleCommentSubmit);

    elements.postsGrid.appendChild(card);
  });
}

function handlePostAction(event) {
  const action = event.currentTarget.getAttribute("data-action");
  const postId = event.currentTarget.getAttribute("data-id");

  if (action === "like") {
    toggleLike(postId);
  }

  if (action === "report") {
    reportPost(postId);
  }
}

function toggleLike(postId) {
  const posts = getPosts();
  const likedPosts = getLikedPosts();
  const post = posts.find(item => item.id === postId);
  if (!post) return;

  if (likedPosts.includes(postId)) {
    post.likes = Math.max(0, post.likes - 1);
    saveLikedPosts(likedPosts.filter(id => id !== postId));
  } else {
    post.likes += 1;
    likedPosts.push(postId);
    saveLikedPosts(likedPosts);
  }

  savePosts(posts);
  renderPosts();
}

function handleCommentSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const postId = form.getAttribute("data-id");
  const author = form.commentAuthor.value.trim();
  const text = form.commentText.value.trim();

  if (!author || !text) {
    return;
  }

  const posts = getPosts();
  const post = posts.find(item => item.id === postId);
  if (!post) return;

  post.comments.push({
    id: `comment-${Date.now()}`,
    author,
    text
  });

  savePosts(posts);
  renderPosts();
}

function reportPost(postId) {
  const reason = prompt("Why are you reporting this post? (optional)") || "Unspecified";
  const posts = getPosts();
  const post = posts.find(item => item.id === postId);
  if (!post) return;

  post.reports.push({
    id: `report-${Date.now()}`,
    reason,
    date: Date.now()
  });

  savePosts(posts);
  renderPosts();
  renderModerationQueue();
}

function renderModerationQueue() {
  const posts = getPosts();
  const reportedPosts = posts.filter(post => post.reports.length > 0);
  elements.moderationList.innerHTML = "";

  if (reportedPosts.length === 0) {
    elements.moderationList.innerHTML = `<div class="moderation-card"><p class="muted">No reported posts right now.</p></div>`;
    return;
  }

  reportedPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "moderation-card";
    card.innerHTML = `
      <strong>${post.author} · ${post.category}</strong>
      <p>${post.content}</p>
      <div class="muted">Reports: ${post.reports.length}</div>
      <ul class="muted">
        ${post.reports.map(report => `<li>${formatDate(report.date)} — ${report.reason}</li>`).join("")}
      </ul>
      <div class="action-row">
        <button class="secondary-btn" data-action="approve" data-id="${post.id}">Approve</button>
        <button class="ghost-btn" data-action="delete" data-id="${post.id}">Delete</button>
      </div>
    `;

    card.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", handleModerationAction);
    });

    elements.moderationList.appendChild(card);
  });
}

function handleModerationAction(event) {
  const action = event.currentTarget.getAttribute("data-action");
  const postId = event.currentTarget.getAttribute("data-id");

  if (action === "approve") {
    approvePost(postId);
  }

  if (action === "delete") {
    deletePost(postId);
  }
}

function approvePost(postId) {
  const posts = getPosts();
  const post = posts.find(item => item.id === postId);
  if (!post) return;

  post.reports = [];
  savePosts(posts);
  renderModerationQueue();
  renderPosts();
}

function deletePost(postId) {
  const posts = getPosts().filter(item => item.id !== postId);
  savePosts(posts);
  renderModerationQueue();
  renderPosts();
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

init();
