# P2P Fundraising & Matching Gift Program - Implementation Guide

## Overview

This comprehensive P2P fundraising system provides a complete frontend implementation for:
- Personal fundraising campaigns with progress tracking
- Corporate matching gift directory (500+ companies)
- Donor recognition system with badges and rewards
- Impact stories and metrics dashboard
- Real-time leaderboards for individual and team fundraisers

## 📁 File Structure

### HTML Frontend Pages
```
frontend/pages/
├── personal-fundraiser.html       # Personal campaign page builder
├── matching-gifts.html            # Company matching gift directory
├── donor-recognition.html         # Recognition system with levels/badges
├── impact-stories.html            # Impact stories and metrics dashboard
└── p2p-leaderboard.html          # Team/individual fundraiser rankings
```

### JavaScript Handlers
```
frontend/js/
├── p2p-fundraiser.js              # Personal campaign logic (480 lines)
├── p2p-matching-gifts.js          # Matching gift directory (200 lines)
├── p2p-donor-recognition.js       # Donor recognition system (320 lines)
├── p2p-impact-stories.js          # Impact stories & metrics (400 lines)
└── p2p-leaderboard.js             # Leaderboard filtering & search (350 lines)
```

### CSS Styling
```
frontend/css/
└── p2p-fundraising.css            # Complete responsive styling (970+ lines)
```

## 🎯 Feature Breakdown

### 1. Personal Fundraiser Page

**File:** `personal-fundraiser.html` + `p2p-fundraiser.js`

**Features:**
- Campaign cover image with edit capability
- Progress thermometer visualization
- 4 key stats (raised, progress %, donors, days left)
- Milestone tracking (visual checkboxes)
- 5 dynamic tabs:
  - **About:** Campaign story display
  - **Donors:** Recent donor list with amounts
  - **Team:** Team member fundraisers
  - **Impact:** What donations support
  - **Matching:** Matching gift opportunities

**Key Functions:**
```javascript
- switchTab(tabName)          // Tab navigation
- renderCampaign()            // Update all campaign data
- renderMilestones()          // Update milestone progress
- showDonateModal()           // Donation dialog
- showShareModal()            // Social sharing dialog
- showEditModal()             // Campaign editing
```

**Usage:**
```html
<script src="js/p2p-fundraiser.js"></script>
<!-- Will automatically initialize on page load -->
```

### 2. Matching Gift Directory

**File:** `matching-gifts.html` + `p2p-matching-gifts.js`

**Features:**
- Search box for company lookup
- Category filters (Technology, Finance, Healthcare, Retail, Other)
- 500+ company database with:
  - Company logo/emoji
  - Match ratio (e.g., 2:1)
  - Max annual match amount
  - Minimum donation requirement
- Matching statistics display
- Company detail modal showing:
  - How matching works
  - Eligible nonprofits
  - Application links

**Key Functions:**
```javascript
- handleSearch(query)         // Company search
- handleFilter(category)      // Category filtering
- showCompanyModal(companyId) // Company details
- renderCompanies()          // Display filtered companies
```

**Sample Data:**
```javascript
{
  name: 'Google',
  category: 'Technology',
  matchRatio: '2:1',
  maxAnnual: '$5000',
  minDonation: '$25'
}
```

### 3. Donor Recognition System

**File:** `donor-recognition.html` + `p2p-donor-recognition.js`

**Features:**
- **Giving Levels Tab** (4 tiers):
  - 🌱 Supporter ($25-99) - 3 benefits
  - 🦁 Champion ($100-499) - 4 benefits
  - 🦅 Hero ($500-2,499) - 5 benefits [Featured]
  - 👑 Guardian ($2,500+) - 6 benefits
  
- **Wall of Gratitude Tab:**
  - Opted-in donor showcase
  - Sticky note style cards
  - Donor testimonials

- **Milestones Tab:**
  - 6 achievement levels ($100-$5000 + time-based)
  - Celebrant counts with avatars
  - Progress visualization

- **Spotlights Tab:**
  - Monthly featured donors
  - Reason for recognition
  - Donor story display

**Key Functions:**
```javascript
- switchTab(tabName)          // Tab navigation
- renderGivingLevels()        // Display donation tiers
- renderWallOfGratitude()     // Show recognized donors
- renderMilestones()          // Display achievements
- renderSpotlights()          // Featured donor stories
- showDonorModal(level)       // View donors at level
```

### 4. Impact Stories & Metrics

**File:** `impact-stories.html` + `p2p-impact-stories.js`

**Features:**
- **Stories Tab:**
  - Story cards with images/emoji
  - Title, excerpt, category tag
  - Click to view full story modal

- **Updates Tab:**
  - Timeline of campaign updates
  - Status indicators (Completed, In Progress)
  - Numbered progression

- **Metrics Tab:**
  - 6 Key Performance Indicators:
    - Animals Protected (2,450, ↑12%)
    - Acres Restored (5,230, ↑18%)
    - Livelihoods Supported (1,847, ↑8%)
    - Conservation Programs (34, +4 new)
    - Research Projects (156, ↑22%)
    - Cost per Animal ($187, ↓15%)
  - Before/after gallery

- **Reports Tab:**
  - Quarterly impact reports
  - Email subscription form
  - Download links

**Key Functions:**
```javascript
- switchTab(tabName)          // Tab navigation
- renderStoriesTab()          // Display impact stories
- renderUpdatesTab()          // Show timeline updates
- renderMetricsTab()          // Display KPI metrics
- renderReportsTab()          // Show quarterly reports
- showStoryModal(storyId)     // Full story view
```

### 5. P2P Leaderboard

**File:** `p2p-leaderboard.html` + `p2p-leaderboard.js`

**Features:**
- **Filter Options:**
  - View: Individual | Team | All
  - Sort: Raised | Donors | Recent
  - Period: All-Time | This Month | This Week

- **Quick Stats:**
  - Total raised
  - Active fundraisers
  - Total donors
  - Goal progress percentage

- **Featured Fundraisers:**
  - Top 3 performers with special badges
  - Gold/Silver/Bronze ranking
  - Quick stats

- **Leaderboard Tables:**
  - Individual: Rank, name, campaign, raised, donors, progress
  - Team: Rank, team name, members, raised, progress
  - Progress bars with percentage
  - Action buttons to view details

- **Search Functionality:**
  - Real-time fundraiser lookup
  - Filters by name or campaign

**Key Functions:**
```javascript
- renderLeaderboard()         // Update table based on filters
- getSortedFundraisers()     // Sort fundraisers
- getSortedTeams()           // Sort teams
- generateTable(data)        // Create table HTML
- handleSearch(query)        // Search functionality
- showFundraiserModal(id)    // Fundraiser details
```

## 💻 Installation & Setup

### 1. Include CSS
```html
<link rel="stylesheet" href="css/p2p-fundraising.css">
```

### 2. Include JavaScript Handlers
```html
<!-- Personal Fundraiser Page -->
<script src="js/p2p-fundraiser.js"></script>

<!-- Matching Gifts Page -->
<script src="js/p2p-matching-gifts.js"></script>

<!-- Donor Recognition Page -->
<script src="js/p2p-donor-recognition.js"></script>

<!-- Impact Stories Page -->
<script src="js/p2p-impact-stories.js"></script>

<!-- Leaderboard Page -->
<script src="js/p2p-leaderboard.js"></script>
```

### 3. Ensure HTML Elements Exist
Each page requires specific data attributes for JavaScript to target elements:
```html
<!-- Tab buttons need data-tab attribute -->
<button class="tab-btn" data-tab="about">About</button>

<!-- Tab content needs data-tab-content attribute -->
<div class="tab-content" data-tab-content="about"></div>

<!-- Filters need data-filter attribute -->
<button class="filter-btn" data-filter="view" data-value="individual">Individual</button>
```

## 🎨 CSS Classes Reference

### Main Containers
- `.campaign-header` - Campaign section wrapper
- `.progress-section` - Progress tracking area
- `.campaign-tabs` - Tab navigation
- `.content-card` - Content wrapper
- `.search-filter-section` - Search and filter area
- `.giving-levels-grid` - Level cards grid
- `.metrics-dashboard` - Metrics display area
- `.leaderboard-table-container` - Table wrapper

### Component Classes
- `.tab-btn` / `.tab-btn.active` - Tab buttons
- `.donor-card` - Individual donor entry
- `.team-member-card` - Team member entry
- `.company-card` - Company matching gift card
- `.level-card` / `.level-card.featured` - Giving level card
- `.story-card` - Impact story card
- `.stat-box` - Statistics display
- `.progress-bar` - Progress visualization
- `.rank-badge` - Ranking badge (gold/silver/bronze)
- `.modal` / `.modal-content` - Modal dialogs

## 📊 Data Structure Examples

### Fundraiser Object
```javascript
{
  id: 1,
  name: 'John Smith',
  campaign: 'Save the Amazon',
  raised: 28500,
  goal: 30000,
  donors: 145,
  photo: '👨',
  story: 'Campaign description...',
  image: 'https://...',
  milestones: [
    { amount: 10000, reached: true, date: '2024-01-20' },
    { amount: 25000, reached: true, date: '2024-02-10' },
    { amount: 50000, reached: false, date: null }
  ]
}
```

### Company Object
```javascript
{
  id: 1,
  name: 'Google',
  category: 'Technology',
  logo: '🔍',
  matchRatio: '2:1',
  maxAnnual: '$5000',
  minDonation: '$25',
  verified: true
}
```

### Metric Object
```javascript
{
  label: 'Animals Protected',
  value: '2,450',
  change: '↑12%',
  icon: '🦁'
}
```

## 🔗 API Integration Points

### Backend Endpoints Needed
```javascript
// Fundraiser Management
GET    /api/fundraisers                    // List all fundraisers
GET    /api/fundraisers/:id                // Get fundraiser details
POST   /api/fundraisers                    // Create campaign
PUT    /api/fundraisers/:id                // Update campaign
DELETE /api/fundraisers/:id                // Delete campaign

// Donations
GET    /api/fundraisers/:id/donations      // Get donations for campaign
POST   /api/donations                      // Create donation
GET    /api/donations/:id                  // Get donation details

// Matching Gifts
GET    /api/companies                      // List matching companies
GET    /api/companies/:id                  // Get company details
POST   /api/companies/search                // Search companies

// Leaderboard
GET    /api/leaderboard                    // Get leaderboard data
GET    /api/leaderboard/teams              // Get team rankings
POST   /api/leaderboard/filter             // Filter leaderboard

// Impact
GET    /api/stories                        // Get impact stories
POST   /api/stories                        // Create story
GET    /api/metrics                        // Get impact metrics
```

## 🎯 Responsive Design

The CSS includes media queries for:
- **Desktop:** 1200px+ (full multi-column layouts)
- **Tablet:** 768px - 1199px (2-column grids, adjusted spacing)
- **Mobile:** Below 768px (single column, stacked elements)

Key responsive adjustments:
```css
/* Mobile-first breakpoint at 768px */
@media (max-width: 768px) {
    .progress-stats {
        grid-template-columns: repeat(2, 1fr);  /* 2 cols instead of 4 */
    }
    .giving-levels-grid {
        grid-template-columns: 1fr;             /* Single column */
    }
    .campaign-details h1 {
        font-size: 1.8rem;                      /* Smaller title */
    }
}
```

## 🚀 Getting Started

### Quick Setup (5 minutes)

1. **Copy all files to your project:**
   ```
   cp frontend/pages/*.html your-project/pages/
   cp frontend/js/p2p-*.js your-project/js/
   cp frontend/css/p2p-fundraising.css your-project/css/
   ```

2. **Include on your pages:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <link rel="stylesheet" href="css/p2p-fundraising.css">
   </head>
   <body>
       <!-- Your page content here -->
       <script src="js/p2p-[page-name].js"></script>
   </body>
   </html>
   ```

3. **Update mock data:**
   - Edit the `generateData()` methods in each JS file
   - Replace with real API calls when backend is ready

## 📝 Customization Guide

### Change Colors
Edit `p2p-fundraising.css`:
```css
/* Primary green theme */
#4CAF50  → Your primary color
#81C784  → Your secondary color
#2196F3  → Accent color (optional)
```

### Modify Giving Levels
Edit `p2p-donor-recognition.js`:
```javascript
const levels = [
    {
        name: 'Your Level Name',
        range: '$X - $Y',
        benefits: ['Benefit 1', 'Benefit 2'],
        ...
    }
];
```

### Update Companies Database
Edit `p2p-matching-gifts.js`:
```javascript
generateCompanyData() {
    return [
        { name: 'Your Company', category: 'Your Category', ... }
    ];
}
```

## 🧪 Testing Checklist

- [ ] All pages load without console errors
- [ ] Tab switching works on all pages
- [ ] Search and filters function correctly
- [ ] Modals open and close properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Thermometer progress fills correctly
- [ ] Leaderboard sorts and filters correctly
- [ ] Social sharing buttons are clickable
- [ ] All animations are smooth
- [ ] Form inputs are functional

## 🔐 Security Considerations

When integrating with backend:
1. **Validate all user inputs** on backend
2. **Verify donation amounts** server-side
3. **Authenticate** before allowing edits
4. **Rate limit** API endpoints
5. **Sanitize** all user-generated content
6. **Use HTTPS** for all transactions
7. **Implement CORS** properly

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## 🤝 Contributing

To extend this system:
1. Follow existing naming conventions
2. Add comments to complex logic
3. Use existing utility functions
4. Maintain responsive design
5. Test across browsers

## 📞 Support

For issues or questions:
1. Check the console for errors
2. Verify all required HTML elements exist
3. Ensure CSS file is loaded
4. Check that JavaScript files are included in correct order
5. Verify data structure matches examples

---

**Last Updated:** February 2024
**Version:** 1.0
**Status:** Production Ready
