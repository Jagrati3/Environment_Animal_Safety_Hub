# Environmental Impact Calculator Feature

## Overview
The Personal Environmental Impact Calculator is a comprehensive tool that helps users understand their carbon footprint and provides personalized recommendations to reduce their environmental impact.

## Features

### 🧮 Impact Assessment
- **Transportation**: Primary transport mode and weekly travel distance
- **Energy Usage**: Electricity consumption and heating/cooling habits
- **Diet & Food**: Dietary preferences and food waste levels
- **Water Usage**: Shower habits and conservation practices
- **Waste & Consumption**: Plastic usage and shopping habits

### 📊 Visual Results
- **Overall Impact Score**: Calculated in kg CO₂ per year
- **Interactive Charts**: Breakdown by category using Chart.js
- **Comparison**: User impact vs. average person
- **Progress Tracking**: Historical data visualization

### 💡 Personalized Recommendations
- **Smart Tips**: Based on user's specific lifestyle choices
- **Impact Quantification**: Shows potential CO₂ savings for each tip
- **Actionable Advice**: Practical steps users can take immediately

### 📈 Progress Tracking
- **Data Persistence**: Results saved in localStorage
- **History View**: Last 10 assessments stored
- **Progress Charts**: Visual tracking over time
- **Goal Setting**: Encourages regular reassessment

## Technical Implementation

### Files Created
- `pages/impact-calculator.html` - Main calculator page
- `css/pages/impact-calculator.css` - Styling for calculator
- `js/pages/impact-calculator.js` - Calculator logic and algorithms

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No external dependencies except Chart.js
- **Chart.js**: For data visualization
- **localStorage**: For data persistence

### Calculation Algorithm
The calculator uses scientifically-based coefficients to estimate annual CO₂ emissions:

```javascript
// Example coefficients (kg CO₂ per year)
transport: {
    walk: 0,
    public: 500,
    car: 2000,
    multiple: 4000
}
```

### Integration Points
- Added to main navigation menu
- Featured in environment section
- Prominent CTA section on homepage
- Footer links updated

## User Experience

### Assessment Flow
1. **Welcome**: Clear introduction and expectations
2. **Questions**: 10 categorized questions with intuitive selects
3. **Calculation**: Loading state with progress indication
4. **Results**: Comprehensive breakdown with visualizations
5. **Actions**: Save, share, and retake options

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Accessible color contrast

### Performance
- Lightweight implementation
- Fast calculation algorithms
- Efficient data storage
- Smooth animations

## Environmental Impact Categories

### Transportation (25-40% of footprint)
- Walking/Cycling: 0 kg CO₂
- Public Transport: 500 kg CO₂
- Personal Car: 2000+ kg CO₂

### Energy Usage (20-35% of footprint)
- Electricity consumption
- Heating/cooling systems
- Energy efficiency practices

### Diet & Food (15-25% of footprint)
- Dietary preferences (vegan to meat-heavy)
- Food waste levels
- Local vs. imported food

### Water Usage (5-10% of footprint)
- Daily consumption habits
- Conservation practices
- Water heating energy

### Waste & Consumption (10-20% of footprint)
- Plastic usage patterns
- Shopping frequency
- Recycling habits

## Recommendations Engine

The system provides targeted recommendations based on:
- **High Impact Areas**: Focus on biggest contributors
- **Quick Wins**: Easy changes with immediate impact
- **Long-term Goals**: Sustainable lifestyle changes
- **Local Context**: India-specific suggestions

## Future Enhancements

### Planned Features
- **Social Sharing**: Compare with friends
- **Challenges**: Monthly eco-challenges
- **Rewards System**: Badges and achievements
- **Local Data**: City-specific averages
- **API Integration**: Real-time environmental data

### Technical Improvements
- **Backend Integration**: User accounts and cloud storage
- **Advanced Analytics**: Detailed breakdowns and trends
- **Mobile App**: Native mobile experience
- **Offline Support**: PWA capabilities

## Usage Statistics

### Expected Impact
- **User Engagement**: 5-10 minute assessment
- **Retention**: Quarterly reassessments
- **Behavior Change**: 15-30% reduction in footprint
- **Awareness**: 90%+ learn something new

### Success Metrics
- **Completion Rate**: Target 80%+
- **Return Users**: Target 40%+
- **Recommendation Adoption**: Target 60%+
- **Social Shares**: Target 25%+

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant
- **Font Scaling**: Responsive text sizing
- **Focus Indicators**: Clear visual focus states

## Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works everywhere

## Contributing

To extend the calculator:
1. Update `IMPACT_COEFFICIENTS` for new categories
2. Add questions to the HTML form
3. Extend `calculateImpact()` function
4. Update `RECOMMENDATIONS` database
5. Test across different user scenarios

## License

This feature is part of the EcoLife project and follows the same licensing terms.