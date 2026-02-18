# Air Quality Dashboard - Feature Documentation

## Issue #1101: Real-Time Air Quality & Pollution Dashboard

### Overview
This feature implements a comprehensive real-time Air Quality Dashboard that displays the Air Quality Index (AQI), pollutant levels (PM2.5, PM10, NO2, O3, CO, SO2), and weather conditions for the user's current location or searched cities.

### Features Implemented

#### 1. **Real-Time Air Quality Monitoring**
- Live AQI (Air Quality Index) display with animated gauge
- Color-coded AQI scale (Good → Hazardous)
- Detailed pollutant breakdown:
  - PM2.5 (Fine Particulate Matter)
  - PM10 (Coarse Particulate Matter)
  - NO₂ (Nitrogen Dioxide)
  - O₃ (Ozone)
  - CO (Carbon Monoxide)
  - SO₂ (Sulfur Dioxide)

#### 2. **Geolocation Support**
- Automatic location detection (with user permission)
- Manual city search functionality
- Search suggestions with auto-complete

#### 3. **Weather Conditions**
- Current temperature
- Weather description with icons
- Humidity levels
- Wind speed
- Visibility
- Atmospheric pressure

#### 4. **Interactive Pollution Heatmap**
- Leaflet.js integration for map visualization
- Multiple layer options (AQI, PM2.5, Temperature)
- Custom AQI markers with color coding
- Responsive map controls

#### 5. **Health Advisories**
- Dynamic health messages based on current AQI
- Activity recommendations (Walking, Jogging, Cycling, etc.)
- Mask recommendations
- Special advisories for sensitive groups

#### 6. **Health Tips Section**
- Stay indoors guidance
- Air purifier recommendations
- N95 mask usage tips
- Hydration reminders
- Indoor plants suggestions
- Activity planning advice

### Technical Implementation

#### Files Created
```
frontend/
├── pages/environment/
│   └── air-quality-dashboard.html    # Main HTML page
├── css/pages/
│   └── air-quality-dashboard.css     # Styling
└── js/
    └── air-quality-dashboard.js      # JavaScript functionality
```

#### APIs Used
- **OpenWeatherMap Air Pollution API** - For air quality data
- **OpenWeatherMap Weather API** - For weather conditions
- **OpenWeatherMap Geocoding API** - For city search

#### Libraries Used
- **Leaflet.js** - Interactive map visualization
- **Chart.js** - Pollutant levels chart
- **AOS** - Scroll animations
- **Font Awesome** - Icons

### Demo Mode
The dashboard includes a demo mode that generates realistic sample data when no API key is configured. This allows for testing and demonstration without requiring API credentials.

### How to Enable Live Data
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `frontend/js/air-quality-dashboard.js`
3. Replace the empty `API_KEY` variable with your key:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

### AQI Categories
| AQI Range | Category | Color | Description |
|-----------|----------|-------|-------------|
| 0-50 | Good | Green | Air quality is satisfactory |
| 51-100 | Moderate | Yellow | Acceptable, but sensitive groups should be cautious |
| 101-150 | Unhealthy for Sensitive | Orange | Sensitive groups may experience health effects |
| 151-200 | Unhealthy | Red | Everyone may experience health effects |
| 201-300 | Very Unhealthy | Purple | Health alert for everyone |
| 301+ | Hazardous | Maroon | Emergency conditions |

### Responsive Design
The dashboard is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

### Accessibility Features
- Skip navigation link
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Screen reader compatible

### Future Enhancements
- Historical AQI data charts
- Air quality forecast
- Push notifications for AQI alerts
- Multiple location comparison
- Social sharing functionality

### Screenshots
The dashboard includes:
1. Hero section with city search
2. Main AQI gauge with status
3. Pollutant level cards
4. Current weather section
5. Interactive pollution map
6. Pollutant comparison chart
7. Activity recommendations
8. Health tips grid

### Contributing
This feature was developed as part of Issue #1101. For any improvements or bug fixes, please create a new issue or pull request.

---

**Author:** Environment_Animal_Safety_Hub Contributor  
**Issue:** #1101 - Real-Time Air Quality & Pollution Dashboard  
**Date:** January 2026
