// Community Forum & Discussion Logic
// Demo: In-memory posts, replies, and sample data

const DEMO_POSTS = [
  {
    id: 1,
    title: 'How do you save water in the garden?',
    body: 'I want to reduce my outdoor water use. Any tips for watering plants efficiently?',
    author: 'Green Family',
    date: '2026-02-10',
    replies: [
      { author: 'Riverdale', body: 'Try watering early in the morning and use mulch to retain moisture.' },
      { author: 'Eco Warriors', body: 'Collect rainwater and use it for your garden!' }
    ]
  },
  {
    id: 2,
    title: 'Best ways to check for leaks?',
    body: 'What are some easy ways to find leaks in the house?',
    author: 'Blue Community',
    date: '2026-02-12',
    replies: [
      { author: 'Sunset Villas', body: 'Check your water meter before and after a period of no use.' },
      { author: 'Aqua Group', body: 'Put food coloring in the toilet tank to spot leaks.' }
    ]
  },
  {
    id: 3,
    title: 'Short showers challenge!',
    body: 'Let’s see who can take the shortest showers this week. Share your times and tips!',
    author: 'Hilltop',
    date: '2026-02-14',
    replies: [
      { author: 'Lakeside', body: 'I set a timer for 4 minutes and play music.' }
    ]
  }
];

let posts = JSON.parse(localStorage.getItem('forumPosts') || 'null') || DEMO_POSTS;
let myName = localStorage.getItem('forumUserName') || 'You';

function savePosts() {
  localStorage.setItem('forumPosts', JSON.stringify(posts));
}

// --- Render Forum List ---
function renderForumList() {
  document.getElementById('forum-section').style.display = '';
  document.getElementById('post-details-section').style.display = 'none';
  const list = document.getElementById('forum-list');
  list.innerHTML = '';
  posts.slice().reverse().forEach(post => {
    const card = document.createElement('div');
    card.className = 'forum-post-card';
    card.innerHTML = `
      <div class="forum-post-title">${post.title}</div>
      <div class="forum-post-meta">By ${post.author} on ${post.date} &nbsp;|&nbsp; ${post.replies.length} replies</div>
      <div class="forum-post-body">${post.body.length > 120 ? post.body.slice(0,120)+'...' : post.body}</div>
    `;
    card.onclick = () => showPostDetails(post.id);
    list.appendChild(card);
  });
}

// --- Show Post Details ---
function showPostDetails(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  document.getElementById('forum-section').style.display = 'none';
  document.getElementById('post-details-section').style.display = '';
  const details = document.getElementById('post-details');
  details.innerHTML = `
    <h3>${post.title}</h3>
    <div class="forum-post-meta">By ${post.author} on ${post.date}</div>
    <div class="forum-post-body">${post.body}</div>
    <form class="reply-form">
      <textarea placeholder="Write a reply..." required></textarea>
      <button type="submit">Reply</button>
    </form>
    <div class="forum-replies">
      <b>Replies:</b>
      ${post.replies.map(r => `<div class="forum-reply"><b>${r.author}:</b> ${r.body}</div>`).join('')}
    </div>
  `;
  // Reply form
  details.querySelector('.reply-form').onsubmit = function(e) {
    e.preventDefault();
    const body = this.querySelector('textarea').value.trim();
    if (!body) return;
    post.replies.push({ author: myName, body });
    savePosts();
    showPostDetails(post.id);
  };
}

document.getElementById('back-to-forum').onclick = renderForumList;

document.getElementById('create-post-btn').onclick = function() {
  document.getElementById('post-modal').style.display = '';
};
document.getElementById('close-post-modal').onclick = function() {
  document.getElementById('post-modal').style.display = 'none';
};
document.getElementById('post-form').onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('post-title').value.trim();
  const body = document.getElementById('post-body').value.trim();
  if (!title || !body) return;
  const newPost = {
    id: Date.now(),
    title,
    body,
    author: myName,
    date: new Date().toISOString().slice(0,10),
    replies: []
  };
  posts.push(newPost);
  savePosts();
  document.getElementById('post-modal').style.display = 'none';
  renderForumList();
  this.reset();
};

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', function() {
  renderForumList();
});
// --- End of forum.js ---
