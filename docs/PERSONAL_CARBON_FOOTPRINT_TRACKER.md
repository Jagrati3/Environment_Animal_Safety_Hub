# Personal Carbon Footprint Tracker

## Overview

The Personal Carbon Footprint Tracker is a comprehensive tool that enables users to monitor their daily environmental impact, track carbon emissions from various activities, receive personalized reduction tips, and visualize their progress toward sustainability goals.

## Features

### 🎯 Core Features

1. **Activity Logging**
   - Log daily activities across 4 main categories:
     - **Transportation**: Car, electric vehicle, public transport, flights, cycling/walking
     - **Energy**: Electricity, natural gas, water usage
     - **Consumption**: Meat, dairy, plant-based meals, shopping
     - **Waste**: Waste generation, recycling
   - Real-time emission calculations
   - Optional notes for additional context

2. **Real-Time Metrics Dashboard**
   - **Today's Emissions**: Current day's CO₂ footprint with percentage change
   - **Weekly Emissions**: Last 7 days' total with trend comparison
   - **Monthly Emissions**: Last 30 days' total with trend comparison
   - **Monthly Goal Progress**: Visual progress bar and percentage

3. **Interactive Visualizations**
   - **Pie Chart**: Emissions breakdown by category (Transportation, Energy, Consumption, Waste)
   - **Line Chart**: 7-day emission trend with daily goal reference line
   - **Category Legend**: Detailed emission values for each activity category

4. **Goal Setting & Tracking**
   - Customizable daily, weekly, monthly, and yearly goals
   - Visual progress tracking
   - Goal status indicators (On Track, Slightly Over, Over Goal)
   - Achievement of goals rewards with streak tracking

5. **Personalized Reduction Tips**
   - Context-aware recommendations based on user's activity patterns
   - Tips for:
     - Reducing car usage (save 2.1 kg CO₂ per km)
     - Switching to plant-based meals (save 26.5 kg CO₂ per meal)
     - Energy efficiency improvements (40% reduction potential)
     - Water conservation (0.2 kg CO₂ per liter)
     - Buying local products (1.5 kg CO₂ savings)
     - Recycling and composting (0.5-2 kg CO₂ per item)

6. **Comparison & Impact Metrics**
   - Trees needed to offset emissions (1 tree offsets ~20 kg CO₂/year)
   - Equivalent to car kilometers driven
   - Comparison to global average (100% = 333 kg CO₂/month)
   - Comparison to national average

7. **Achievement System**
   - **First Step**: Log 1 activity
   - **Green Warrior**: Log 10 activities
   - **Daily Legend**: Stay under daily goal for 7 consecutive days
   - **Eco Champion**: Reach 30-day streak
   - **Zero Waste**: Log 10 recycling activities
   - **Green Commuter**: Log 20 bike/walk activities

8. **Activity Management**
   - Recent activity log with detailed information
   - Delete activities if needed
   - Filter activities by type and date range
   - Activity metadata (date, type, value, estimated emissions)

## UI/UX Highlights

### Design Excellence
- **Green-themed color palette**: Primary green (#10b981) with professional accents
- **Hero Section**: Eye-catching gradient header with animated carbon meter
- **Card-Based Layout**: Clear, organized information hierarchy
- **Responsive Grid**: Adapts from desktop to mobile seamlessly
- **Interactive Charts**: Chart.js powered visualizations with smooth animations
- **Modal Dialogs**: Clean goal editing and filtering interfaces
- **Icon Integration**: FontAwesome icons for intuitive visual recognition

### User Experience
- **Real-time calculations**: Emissions update as you input data
- **Hover effects**: Subtle animations for interactive elements
- **Color-coded categories**: Easy visual identification of activity types
- **Progress indicators**: Visual progress bars with smooth animations
- **Empty states**: Helpful messages when no data is available
- **Dark mode ready**: CSS variables support theme switching

### Mobile Responsive
- Single-column layout on mobile devices
- Touch-friendly button sizes (min 44px height)
- Optimized chart heights for mobile viewing
- Flexible grid system

## Technical Architecture

### Frontend
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern styling with CSS variables and Grid/Flexbox
- **JavaScript**: Vanilla JS with class-based architecture
- **Chart.js**: Interactive data visualization
- **localStorage**: Client-side data persistence

### Backend
- **Node.js/Express**: REST API
- **MongoDB/Mongoose**: Data persistence
- **Models**: CarbonActivity, CarbonGoals, CarbonStatistics, CarbonInsight, CarbonAchievement

## Emission Factors (kg CO₂)

### Transportation
- Car: 0.21 per km
- Electric Car: 0.05 per km
- Public Transport: 0.05 per km
- Flight: 0.255 per km
- Bike/Walking: 0 (zero emissions)

### Energy
- Electricity: 0.29 per kWh
- Natural Gas: 2.04 per cubic meter
- Water: 0.2 per liter

### Consumption
- Meat: 27 per kg
- Dairy: 1.3 per liter
- Plant-based: 0.5 per kg
- Shopping: 5 per item

### Waste
- Waste: 0.5 per kg
- Recycling: -0.2 per kg (offset)

## API Endpoints

### Activities
- `POST /api/carbon-footprint/activities` - Log new activity
- `GET /api/carbon-footprint/activities/:userId` - Get user activities
- `GET /api/carbon-footprint/activities/:userId/daily/:date` - Get daily activities
- `DELETE /api/carbon-footprint/activities/:activityId` - Delete activity

### Goals
- `POST /api/carbon-footprint/goals/:userId` - Set/update goals
- `GET /api/carbon-footprint/goals/:userId` - Get user goals

### Statistics
- `GET /api/carbon-footprint/statistics/:userId` - Get statistics
- `GET /api/carbon-footprint/statistics/:userId/comparison` - Get comparison data

### Insights
- `GET /api/carbon-footprint/insights/:userId` - Get reduction tips

## Data Models

### CarbonActivity
```javascript
{
  userId: ObjectId,
  activityType: String, // car, flight, electricity, meat, etc.
  category: String, // transportation, energy, consumption, waste
  value: Number,
  unit: String, // km, miles, kwh, kg, liters, items
  emissionsCO2: Number,
  date: Date,
  notes: String,
  verified: Boolean,
  timestamps: true
}
```

### CarbonGoals
```javascript
{
  userId: ObjectId,
  dailyGoal: Number, // kg CO2
  weeklyGoal: Number,
  monthlyGoal: Number,
  yearlyGoal: Number,
  reductionTarget: Number // percentage
}
```

### CarbonStatistics
```javascript
{
  userId: ObjectId,
  totalEmissions: Number,
  averageDailyEmissions: Number,
  averageWeeklyEmissions: Number,
  averageMonthlyEmissions: Number,
  emissionsByCategory: Object,
  bestDay: Object,
  worstDay: Object,
  longestGreenStreak: Number,
  treesNeededToOffset: Number,
  comparisonToAverage: Object
}
```

## Installation & Setup

### Frontend Files
1. `frontend/pages/personal-carbon-footprint-tracker.html` - Main page
2. `frontend/css/personal-carbon-footprint-tracker.css` - Styling
3. `frontend/js/personal-carbon-footprint-tracker.js` - JavaScript logic

### Backend Files
1. `backend/models/CarbonFootprint.js` - Data models
2. `backend/routes/carbon-footprint.js` - API routes

### Integration
1. Add route to backend: `app.use('/api/carbon-footprint', require('./routes/carbon-footprint'));`
2. Add navigation link to main navbar
3. Include in sitemap and navigation menus

## Usage Examples

### Logging an Activity
1. Navigate to Personal Carbon Footprint Tracker
2. Select date and activity type
3. Enter value and unit
4. (Optional) Add notes
5. Click "Log Activity"
6. View updated statistics and charts

### Setting Goals
1. Click "Edit" button in Goals section
2. Update daily, weekly, and monthly targets
3. Save changes
4. View progress against new goals

### Viewing Analytics
1. Check pie chart for emissions by category
2. Monitor line chart for weekly trends
3. Compare your emissions to global and national averages
4. Track achievement progress

## Performance Optimization

- **Lazy loading**: Charts only load when needed
- **Client-side storage**: localStorage reduces API calls
- **Efficient calculations**: Minimal DOM reflows
- **CSS optimization**: Variables and reusable classes
- **Image optimization**: SVG meter gauge for sharp display

## Accessibility Features

- Semantic HTML structure
- ARIA labels for form inputs
- Color contrast compliance
- Keyboard navigation support
- Focus indicators on interactive elements
- Alt text for icons

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full responsive support

## Future Enhancements

1. **Social Features**
   - Share achievements on social media
   - Community challenges
   - Leaderboards
   - Friend comparisons

2. **Advanced Analytics**
   - Predictive trends
   - Custom date ranges
   - Data export (PDF/CSV)
   - Advanced filtering

3. **Integration**
   - API integrations with fitness trackers
   - Smart home device integration
   - Carbon offset marketplace
   - Renewable energy tracking

4. **Gamification**
   - Daily challenges
   - Seasonal competitions
   - Badge system
   - Rewards program

5. **Mobile App**
   - Native iOS/Android apps
   - Offline support
   - Push notifications
   - Photo-based activity logging

## Contributing

Please refer to the main project's CONTRIBUTING.md for guidelines.

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.
