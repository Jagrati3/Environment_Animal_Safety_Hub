# 🏆 Eco-Teams – Group Challenges & Leaderboards

## Overview

Eco-Teams is a feature that enables users to create or join teams and compete against other teams in sustainability metrics. This feature promotes collective impact through healthy competition and makes the platform attractive for schools, families, and companies looking for CSR activities.

## Features

### 1. Team Dashboard
A dedicated page showing aggregate stats for the group:
- **Total CO₂ Saved**: Track your team's carbon footprint reduction
- **Trees Planted**: Count of trees planted by team members
- **Challenges Won**: Number of sustainability challenges completed
- **Day Streak**: Consecutive days of eco-friendly activities
- **Global Rank**: Your team's position on the leaderboard

### 2. Team Creation & Management
- Create teams with custom names and descriptions
- Choose team type: Family, School/Class, Company, Neighborhood, or Friends Group
- Set privacy settings: Public (anyone can join) or Private (invite-only)

### 3. Invite System
- **Unique Invite Code**: Share a code like `ECO-XXXX-XXXX` with friends/colleagues
- **Invite Link**: Direct link to join the team
- **Social Sharing**: Share via WhatsApp, Twitter, or Email

### 4. Leaderboards
Categorized rankings to foster healthy competition:
- **All Teams**: Global ranking of all teams
- **Top Schools**: Rankings for school/class teams
- **Top Companies**: Rankings for corporate teams
- **Top Families**: Rankings for family teams
- **Top Neighborhoods**: Rankings for community groups

### 5. Team Challenges
Weekly sustainability challenges for teams to compete:
- Tree Planting Week
- Zero Emissions Commute
- Water Conservation
- And more...

Each challenge includes:
- Progress tracking with visual progress bars
- Time remaining indicator
- Rewards (Badges + XP)

### 6. Team Members
- View all team members with their profiles
- Member roles (Leader, Member)
- Achievement badges (Tree Planter, Eco Warrior, Streak Master, etc.)
- Individual contribution stats

## Technical Implementation

### Files Created

| File | Description |
|------|-------------|
| `frontend/pages/eco-teams.html` | Main HTML page for Eco-Teams |
| `frontend/css/pages/eco-teams.css` | Styling for the Eco-Teams page |
| `frontend/js/pages/eco-teams.js` | JavaScript functionality |

### Dependencies Used
- **Chart.js**: For progress visualization charts
- **Canvas Confetti**: For celebration animations
- **AOS (Animate on Scroll)**: For scroll animations
- **Font Awesome**: For icons

### Key Components

```
├── Hero Section (Team Up for the Planet)
├── Team Dashboard
│   ├── Team Stats Grid (CO₂, Trees, Challenges, Streak)
│   ├── Progress Chart (Weekly trends)
│   └── Team Actions (Invite, Challenges, Settings)
├── Leaderboards Section
│   ├── Category Tabs
│   ├── Podium (Top 3)
│   └── Leaderboard List
├── Active Challenges Section
├── Team Members Section
└── Modals
    ├── Create Team Modal
    ├── Join Team Modal
    └── Invite Members Modal
```

## Why This Feature is Needed

1. **Collective Impact**: Shows that small individual actions add up to massive group results
2. **Social Motivation**: Healthy competition drives higher engagement than individual tracking alone
3. **Institutional Reach**: Makes the platform attractive for schools and companies looking for CSR activities

## How to Access

1. Navigate to the EcoLife website
2. Click on "🏆 Eco-Teams" in the navigation bar
3. Create your own team or join an existing one
4. Start completing challenges and climb the leaderboard!

## Future Enhancements

- Backend integration for persistent data storage
- Real-time leaderboard updates
- Team chat functionality
- More challenge types and rewards
- Monthly and yearly leaderboard filters
- Inter-team collaboration features

## Screenshots

The Eco-Teams feature includes:
- Modern, premium UI design with glassmorphism effects
- Responsive layout for all device sizes
- Dark mode support
- Smooth animations and transitions
- Intuitive user interactions

---

**Issue Reference**: #1290 - Feature: "Eco-Teams" – Group Challenges & Leaderboards

**Author**: Open Source Contributor
**Date**: January 25, 2026
