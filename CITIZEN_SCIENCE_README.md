# Citizen Science – Local Flora & Fauna Database

## Overview

The **Citizen Science – Local Flora & Fauna Database** is a crowdsourced platform where users can log sightings of local plants, birds, and animals. This feature creates a "living map" of biodiversity in communities, helping track migration patterns, blooming seasons, and the presence of invasive species.

## Features

### 🔬 Core Features

1. **Sighting Submission Form**
   - Multi-step wizard for easy submission
   - Photo upload with drag & drop support
   - Camera integration for direct capture
   - Geolocation-based location selection
   - Interactive map for location pinpointing
   - Date/time recording
   - Species category selection
   - Behavior/activity tracking
   - Quantity observation

2. **Species Identification System**
   - Community-driven identification suggestions
   - Expert (Admin) verification system
   - Confidence level ratings
   - Status tracking (Verified, Pending, Needs ID)

3. **Biodiversity Map**
   - Interactive Leaflet.js map
   - Marker clustering for dense areas
   - Category-based color coding
   - Advanced filtering (category, time range, verification status)
   - User location centering
   - Popup details for each sighting

4. **Species Wiki**
   - Comprehensive species database
   - Scientific names and descriptions
   - Diet and habitat information
   - Conservation status
   - Sighting count and contributor stats
   - Alphabetical filtering
   - Search functionality

5. **Community Features**
   - Top contributors leaderboard
   - Observer rankings
   - Identifier rankings
   - Achievement badges system
   - Like and comment functionality

## Technical Implementation

### Files Created

```
frontend/
├── pages/community/
│   └── citizen-science.html       # Main HTML page
├── css/pages/community/
│   └── citizen-science.css        # Premium styling
└── js/pages/community/
    └── citizen-science.js         # Full functionality
```

### Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Glassmorphism, animations, responsive design
- **JavaScript (ES6+)** - Interactive functionality
- **Leaflet.js** - Map integration
- **MarkerCluster** - Map marker clustering
- **Font Awesome** - Icons
- **Google Fonts** - Inter & Outfit typography

### Design Features

- 🌙 Dark mode with glassmorphism effects
- ✨ Smooth animations and micro-interactions
- 📱 Fully responsive design
- 🎨 Premium color palette with gradients
- 🖼️ Modern card-based UI

## How to Use

### Logging a Sighting

1. Click "Log a Sighting" button
2. **Step 1**: Upload photos (drag & drop or click to select)
3. **Step 2**: Enter species details (category, name if known, quantity, behavior)
4. **Step 3**: Select location (use GPS or click on map) and set date/time
5. **Step 4**: Review and submit

### Exploring the Map

1. Navigate to the "Biodiversity Map" section
2. Use filters to narrow down sightings
3. Click on markers to view sighting details
4. Use "My Location" to center map on your position

### Identifying Species

1. Find sightings marked "Needs ID"
2. Click to view details
3. Click "Suggest Identification"
4. Enter species name and confidence level
5. Submit for community review

## Issue Solved

This feature addresses **Issue #1288** - Citizen Science – Local Flora & Fauna Database:

- ✅ Submission Form with photo, date, time, and location
- ✅ User/Expert identification and verification system
- ✅ Biodiversity Map with recent sightings
- ✅ Wiki integration with species information

## Scientific Value

- **Migration Tracking**: Log seasonal bird sightings to track patterns
- **Blooming Seasons**: Document plant flowering times
- **Invasive Species**: Report and map invasive species presence
- **Biodiversity Index**: Contribute to local biodiversity assessments

## Future Enhancements

- [ ] Mobile app integration
- [ ] AI-powered species identification
- [ ] Export data for research
- [ ] Seasonal reports and analytics
- [ ] Integration with iNaturalist API
- [ ] Advanced filtering and search
- [ ] Social sharing capabilities

## Contributing

We welcome contributions! Please follow the standard Git workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is part of the EcoLife - Environment & Animal Safety Hub initiative.
