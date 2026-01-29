document.addEventListener('DOMContentLoaded', () => {
  initRepFinder();
  initTemplateSystem();
  initCampaignTracker();
});

// --- 1. Representative Finder (Mock API for Demo) ---
const mockReps = {
  '90210': [
    { name: 'Dianne Feinstein', title: 'U.S. Senator', party: 'Democrat', image: 'https://cdn.britannica.com/39/187239-050-3A2F6241/Dianne-Feinstein-2013.jpg' },
    { name: 'Alex Padilla', title: 'U.S. Senator', party: 'Democrat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Alex_Padilla_117th_U.S._Congress_portrait.jpg/330px-Alex_Padilla_117th_U.S._Congress_portrait.jpg' },
    { name: 'Karen Bass', title: 'Mayor', party: 'Democrat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Karen_Bass_official_portrait_116th_Congress.jpg/330px-Karen_Bass_official_portrait_116th_Congress.jpg' }
  ],
  'default': [
    { name: 'John Doe', title: 'City Council', party: 'Independent', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { name: 'Jane Smith', title: 'State Senator', party: 'Green Party', image: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png' }
  ]
};

function initRepFinder() {
  const searchBtn = document.getElementById('searchRepsBtn');
  const zipInput = document.getElementById('zipCodeInput');
  const resultsContainer = document.getElementById('repResults');

  searchBtn.addEventListener('click', () => {
    const zip = zipInput.value.trim();
    if (!zip) {
      alert('Please enter a valid zip code.');
      return;
    }

    resultsContainer.innerHTML = '<p>Searching...</p>';

    // Simulate API delay
    setTimeout(() => {
      const data = mockReps[zip] || mockReps['default'];
      displayReps(data);
    }, 800);
  });
}

function displayReps(reps) {
  const resultsContainer = document.getElementById('repResults');
  resultsContainer.innerHTML = '';

  reps.forEach(rep => {
    const card = document.createElement('div');
    card.className = 'rep-card';
    card.innerHTML = `
      <img src="${rep.image}" alt="${rep.name}">
      <h3>${rep.name}</h3>
      <p><strong>${rep.title}</strong></p>
      <p class="text-muted">${rep.party}</p>
      <button class="btn btn-outline btn-sm" onclick="selectRep('${rep.name}')">Contact</button>
    `;
    resultsContainer.appendChild(card);
  });
}

function selectRep(name) {
  // Scroll to template section
  document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
  alert(`Selected ${name}. Now choose a template below to draft your message.`);
}

// --- 2. Template System ---
const templates = {
  'pipeline': {
    subject: 'Urgent: Stop the Proposed Oil Pipeline',
    body: 'Dear [Official Name],\n\nI am writing to express my strong opposition to the proposed new oil pipeline in our region. This project poses significant risks to our local environment, water sources, and community health.\n\nInvesting in fossil fuel infrastructure ignores the urgent reality of climate change. I urge you to reject this proposal and support renewable energy alternatives instead.\n\nSincerely,\n[Your Name]'
  },
  'plastic': {
    subject: 'Support the Ban on Single-Use Plastics',
    body: 'Dear [Official Name],\n\nPlastic pollution is overwhelming our communities and harming wildlife. I urge you to vote YES on the upcoming legislation to ban single-use plastics.\n\nWe need bold action to reduce waste and protect our ecosystem for future generations.\n\nSincerely,\n[Your Name]'
  },
  'clean-water': {
    subject: 'Prioritize Clean Water for Our Community',
    body: 'Dear [Official Name],\n\naccess to clean and safe drinking water is a fundamental human right. Recent reports regarding water quality in our area are concerning.\n\nI request immediate action to improve water filtration systems and stricter regulations on industrial dumping.\n\nSincerely,\n[Your Name]'
  },
  'urban-green': {
    subject: 'Protect Our Urban Green Spaces',
    body: 'Dear [Official Name],\n\nOur city parks and green spaces are vital for mental health, air quality, and community well-being. Please oppose any development plans that would reduce our existing green coverage.\n\nInstead, I ask that you support initiatives to expand and maintain these essential areas.\n\nSincerely,\n[Your Name]'
  }
};

function initTemplateSystem() {
  const issueSelect = document.getElementById('issueSelect');
  const previewDiv = document.getElementById('templatePreview');
  const subjectInput = document.getElementById('emailSubject');
  const bodyInput = document.getElementById('emailBody');
  const copyBtn = document.getElementById('copyTextBtn');
  const emailBtn = document.getElementById('sendEmailBtn');

  issueSelect.addEventListener('change', (e) => {
    const issue = e.target.value;
    const template = templates[issue];

    if (template) {
      subjectInput.value = template.subject;
      bodyInput.value = template.body;
      previewDiv.style.display = 'block';
      
      // Update Mailto Link
      emailBtn.href = `mailto:?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
    }
  });

  copyBtn.addEventListener('click', () => {
    bodyInput.select();
    document.execCommand('copy');
    alert('Email body copied to clipboard!');
  });
}

// --- 3. Campaign Tracker ---
function initCampaignTracker() {
  const progressBar = document.getElementById('campaignProgress');
  const countSpan = document.getElementById('campaignCount');
  const maxGoal = 500;
  
  // Simulate live progress
  let currentCount = 342;
  const targetPercent = (currentCount / maxGoal) * 100;

  // Animate from 0 to current
  setTimeout(() => {
    progressBar.style.width = `${targetPercent}%`;
  }, 500);
}

// --- 4. Social Sharing ---
// Exposed purely for the onclick handlers in HTML
window.shareSocial = function(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('I just took action for the environment on EcoLife! Join me:');
  
  let shareUrl = '';
  switch(platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=Voice%20of%20Change&summary=${text}`;
      break;
  }
  
  window.open(shareUrl, '_blank', 'width=600,height=400');
};
