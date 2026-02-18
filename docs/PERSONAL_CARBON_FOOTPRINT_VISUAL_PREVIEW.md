# Personal Carbon Footprint Tracker - Visual Preview

## Page Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVBAR (Injected)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ╔═════════════════════════════════════════════════════╗    │
│  ║  🍃 Personal Carbon Footprint Tracker              ║    │
│  ║  Track your daily emissions, get reduction tips... ║    │
│  ║                          ┌─────────────┐           ║    │
│  ║                          │   Carbon    │           ║    │
│  ║                          │   Meter     │           ║    │
│  ║                          │  0kg CO₂    │           ║    │
│  ║                          └─────────────┘           ║    │
│  ╚═════════════════════════════════════════════════════╝    │
│                     HERO SECTION                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │📅 Today │  │📊 Week   │  │📆 Month  │  │🎯 Goal  │   │
│  │0 kg CO₂ │  │0 kg CO₂ │  │0 kg CO₂ │  │0% Done  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                    STATS DASHBOARD                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐    ┌──────────────────────┐       │
│  │ ➕ LOG ACTIVITY      │    │ 📊 EMISSIONS       │       │
│  │                      │    │                      │       │
│  │ Date: [____]        │    │ ┌────────────────┐   │       │
│  │ Type: [Select]      │    │ │ Pie Chart      │   │       │
│  │ Value: [__]         │    │ │                │   │       │
│  │ Unit: [Select]      │    │ └────────────────┘   │       │
│  │ Notes: [________]   │    │ Legend              │       │
│  │ Est: 0kg CO₂        │    │                      │       │
│  │ [LOG ACTIVITY]      │    └──────────────────────┘       │
│  └──────────────────────┘                                   │
│                                                               │
│  ┌──────────────────────┐    ┌──────────────────────┐       │
│  │ 📋 RECENT           │    │ 📈 WEEKLY TREND    │       │
│  │                      │    │                      │       │
│  │ ► Activity 1        │    │ ┌────────────────┐   │       │
│  │ ► Activity 2        │    │ │ Line Chart     │   │       │
│  │ ► Activity 3        │    │ │                │   │       │
│  │ ► Activity 4        │    │ └────────────────┘   │       │
│  │                      │    │                      │       │
│  └──────────────────────┘    └──────────────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🎯 GOALS              │ 💡 TIPS               │        │
│  │ Daily: 5kg           │ • Reduce car usage    │        │
│  │ Weekly: 35kg         │ • Plant-based meals   │        │
│  │ Monthly: 150kg       │ • Energy efficiency   │        │
│  │ Progress: 0%    █    │ • Water conservation  │        │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏆 ACHIEVEMENTS                                      │  │
│  │ 👣 First Step (locked) | ⚔️ Warrior (locked)     │  │
│  │ 🏆 Legend (locked) | 🌍 Champion (locked)         │  │
│  │ ♻️ Zero Waste (locked) | 🚴 Green (locked)        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔄 COMPARISON & IMPACT                             │  │
│  │                                                       │  │
│  │ 🌲 0 Trees needed  │ 🚗 0 km equivalent            │  │
│  │ 🌍 0% Global avg   │ 👤 0% National avg            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                 FOOTER (Injected)                            │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

```
Primary Green (#10b981):      ████ Used for main actions, icons, progress bars
Dark Green (#059669):         ████ Used for hover states, borders
Light Green (#d1fae5):        ████ Used for backgrounds, alerts
Lighter Green (#ecfdf5):      ████ Used for subtle backgrounds

Accent Colors:
- Blue (#0284c7):   Transportation
- Orange (#f59e0b): Goal/Energy
- Pink (#ec4899):   Consumption
- Purple (#7c3aed): Waste
- Red (#ef4444):    Danger/Warnings
- Gray (#6b7280):   Neutral text
```

## Interactive Elements

### Buttons
```
Primary Button:
[✓ LOG ACTIVITY]  - Green gradient, white text, hover lift effect

Secondary Button:
[CANCEL] - White background, green border, green text

Icon Button:
[☸] - Minimal gray, hover: filled gray background
```

### Forms
- Clean, rounded input fields (12px radius)
- 2px green border on focus
- Smooth transitions
- Form validation messages below fields

### Charts
- Chart.js powered for smooth rendering
- Interactive hover states
- Color-coded by category
- Responsive and mobile-friendly

### Modals
- Semi-transparent dark overlay
- Centered modal with slide-up animation
- Header with title and close button
- Form fields with labels
- Action buttons at bottom

## Responsive Breakpoints

```
Mobile (< 768px):
- Single column layout
- Stacked stat cards
- Full-width forms
- Charts take full width

Tablet (768px - 1200px):
- Two-column grid where appropriate
- Adjusted spacing

Desktop (> 1200px):
- Full multi-column layout
- Maximum content width: 1400px
- Optimal spacing and padding
```

## State Indicators

```
Activity Status:
🟢 Under Daily Goal   - Green indicator
🟡 Near Daily Goal    - Orange indicator
🔴 Over Daily Goal    - Red indicator

Achievement Status:
⭐ Unlocked           - Gold background, full opacity
⭐ Locked             - Gray background, reduced opacity

Chart Status:
📈 Improving          - Green upward trend
📉 Declining          - Red downward trend
━━ Stable            - Gray neutral line
```

## UI Components

### Stat Cards
- 4-column grid on desktop
- Icon on left
- Title and value in center
- Change indicator on right
- Hover: lift up 4px with larger shadow

### Activity Log Items
- Flex layout with icon, details, emissions, delete
- Category color-coded icons
- Hover: light gray background
- Delete button reveals on hover on mobile

### Tip Cards
- Icon on left
- Title and description
- Impact badge with savings
- Left border accent

### Goal Items
- Flex layout with info on left, value on right
- Light gray background with green left border
- Centered text alignment

### Comparison Items
- Icon with large emoji/icon
- Centered layout
- Hover: light green background

## Animation Details

```
Page Load:
- Stats cards: fade in with stagger
- Charts: smooth fade in
- Hero meter: 0.6s smooth fill

Interactions:
- Button hover: 0.3s translateY(-2px)
- Transitions: easeInOut
- Modal open/close: 0.3s slideUp animation

Real-time:
- Meter gauge: smooth stroke animation
- Progress bars: 0.6s smooth width animation
- Activity additions: slideIn 0.3s
```

## Feature Highlights

### Smart Calculations
- Real-time emission estimates as you type
- Automatic unit conversions
- Based on real-world emission factors

### Visual Feedback
- Progress bars with percentages
- Color-coded status indicators
- Animation on data updates
- Empty states with helpful messages

### Data Visualization
- Pie chart for category breakdown
- Line chart for weekly trends
- Legend with actual values
- Responsive sizing

### Goal Tracking
- Multi-level goals (daily/weekly/monthly)
- Visual progress indicator
- Status messaging
- Editable targets

### Achievement System
- 6 unlockable achievements
- Visual indicators (locked/unlocked)
- Progress towards next achievement
- Celebration moments

## Accessibility Features

- Semantic HTML structure
- ARIA labels on form inputs
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Focus indicators on all interactive elements
- Alt text descriptions
- Form validation messages

## Performance Metrics

```
Target Performance:
- Page Load: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Interaction to Paint: < 100ms
- Cumulative Layout Shift: < 0.1
- Largest Contentful Paint: < 2.5 seconds
```

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Browsers (iOS Safari, Chrome Mobile)

---

## Design Philosophy

The tracker follows a modern, clean design approach:
- **Green-centric**: Eco-friendly color palette reinforces sustainability
- **Data-driven**: Clear visualizations of environmental impact
- **User-friendly**: Intuitive workflows for activity logging
- **Motivating**: Achievement system and progress tracking
- **Accessible**: Inclusive design for all users
- **Responsive**: Works perfectly on any device

The UI is designed to make environmental impact visible and actionable, encouraging users to make sustainable choices.
