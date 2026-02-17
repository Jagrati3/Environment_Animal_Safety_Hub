# AR Climate Visualizer - "Future Lens" 🔮

## Feature Overview

**Future Lens** is a web-based Augmented Reality (WebAR) feature that allows users to point their camera at their surroundings and visualize the potential effects of climate change. This powerful tool creates an emotional connection to climate issues by showing users what their own environment could look like under different climate change scenarios.

## Issue Reference
This implementation addresses **Issue #1291**: Feature: AR Climate Visualizer – "Future Lens"

## Features Implemented

### 🌊 Climate Filters

1. **Sea Level Rise**
   - Overlays realistic water effects at different heights (1-3 meters)
   - Animated waves with foam and caustics effects
   - Shows impact on 680+ million coastal residents

2. **Air Pollution & Smog**
   - Dynamic haze/fog filter based on AQI levels (100-500)
   - Particle cloud animations
   - Color tinting based on pollution severity

3. **Deforestation**
   - Barren landscape visualization
   - Dead tree silhouettes overlay
   - Dust particle effects
   - Shows 10M hectares lost annually

4. **Extreme Heat**
   - Heat shimmer/distortion effects
   - Sun glare visualization
   - Temperature increase simulation (+1°C to +4°C)

### 🎮 Interactive Features

- **Real-time Camera Feed**: Uses device camera with WebRTC
- **Adjustable Intensity**: Control the severity of each effect
- **Screenshot Capture**: Save AR visualizations as images
- **Social Sharing**: Share experience on Twitter, Facebook, LinkedIn, WhatsApp
- **Filter Switching**: Easily switch between climate scenarios

### 📚 Educational Content

Each climate effect includes:
- Scientific facts and statistics
- Impact projections for future years
- Actionable steps users can take
- Links to related tools (Carbon Calculator, Community Hub)

## Technology Stack

- **Camera Access**: WebRTC (`getUserMedia` API)
- **AR Rendering**: HTML5 Canvas 2D API
- **Animations**: CSS3 Animations + requestAnimationFrame
- **Effects**: Custom canvas-based shader-like effects
- **Responsive**: Works on desktop and mobile devices

## File Structure

```
frontend/
├── pages/
│   └── environment/
│       └── ar-climate-visualizer.html    # Main HTML page
├── css/
│   └── pages/
│       └── ar-climate-visualizer.css     # Styling
├── js/
│   └── pages/
│       └── ar-climate-visualizer.js      # AR functionality
└── components/
    └── navbar.html                        # Updated with AR link
```

## How to Use

1. Navigate to the AR Climate Visualizer page via Education menu
2. Select a climate filter (Sea Level Rise, Smog, Deforestation, or Heat)
3. Adjust the intensity slider for each effect
4. Click "Launch AR Experience" button
5. Allow camera access when prompted
6. Point your camera at your surroundings
7. Switch filters, adjust intensity, capture screenshots, or share

## Browser Compatibility

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (iOS 11+)
- ✅ Edge (Chromium)
- ⚠️ Requires HTTPS for camera access on most browsers

## Design Highlights

- **Glassmorphism UI**: Modern frosted-glass effect design
- **Gradient Animations**: Smooth color transitions
- **Responsive Layout**: Works on all screen sizes
- **Dark Theme**: Optimized for low-light usage
- **Accessible**: Keyboard navigation and screen reader support

## Screenshots

### Hero Section
The landing page features an immersive hero section with:
- Floating particle animations
- Phone mockup preview
- Key climate statistics
- Call-to-action buttons

### Filter Selection
Interactive filter cards with:
- Animated icons
- Adjustable sliders
- Impact statistics
- Visual previews

### AR Experience
Full-screen AR mode with:
- Real-time camera feed
- Overlay effects
- Control panel
- Info panel with scenario details

## Contributing

This feature was created to address Issue #1291. Future enhancements could include:

- [ ] More climate scenarios (drought, wildfires, ice melt)
- [ ] Location-based projections using GPS
- [ ] Machine learning for object detection (actual tree recognition)
- [ ] WebXR integration for immersive VR mode
- [ ] Multiplayer AR experiences

## Why This Matters

> "Climate Change is often invisible. Seeing your own street underwater or covered in smog creates a powerful emotional response and urgency."

Future Lens transforms abstract climate data into tangible, personal experiences. By visualizing scientific projections in familiar surroundings, users develop a deeper understanding of climate risks and are more motivated to take action.

---

**Created for:** Environment & Animal Safety Hub  
**Issue:** #1291  
**Author:** Open Source Contributor  
**Date:** January 2026
