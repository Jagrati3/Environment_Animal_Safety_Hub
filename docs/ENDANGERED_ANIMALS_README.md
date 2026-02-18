# 🌍 Endangered Animals Database - Quick Setup

A simple, lightweight endangered animals database that works with your existing EcoLife website structure.

## ✨ Features Added

- **Searchable Database**: 10 endangered animals with full details
- **Smart Filtering**: Filter by conservation status (CR, EN, VU)
- **Detailed Modals**: Complete animal information with rescue organizations
- **Responsive Design**: Works on all devices
- **No Dependencies**: Uses existing HTML/CSS/JS structure

## 📁 Files Added

```
frontend/src/
├── assets/data/
│   └── endangered-animals.json          # Animal data
├── pages/
│   └── endangered-animals.html          # Main page
└── js/pages/
    └── endangered-animals.js            # Functionality
```

## 🚀 How to Use

1. **Access the Database**
   - Open your website: `frontend/src/index.html`
   - Click "🐾 Endangered Animals" in navigation
   - Or directly visit: `frontend/src/pages/endangered-animals.html`

2. **Features Available**
   - **Search**: Type animal names in search bar
   - **Filter**: Click status buttons (All, Critically Endangered, etc.)
   - **Details**: Click any animal card to see full information
   - **Help**: Each animal shows rescue organizations with donation links

## 🔧 Customization

### Add More Animals
Edit `frontend/src/assets/data/endangered-animals.json`:

```json
{
  "id": 11,
  "name": "New Animal",
  "scientificName": "Scientific name",
  "status": "EN",
  "statusText": "Endangered",
  "description": "Description...",
  "habitat": "Habitat type",
  "population": "Population estimate",
  "threats": ["Threat 1", "Threat 2"],
  "locations": ["Location 1", "Location 2"],
  "facts": ["Fact 1", "Fact 2"],
  "organizations": [
    {
      "name": "Organization Name",
      "website": "https://website.com",
      "donate": "https://donate-link.com"
    }
  ],
  "image": "https://image-url.com"
}
```

### Modify Styling
- Colors: Edit CSS variables in the `<style>` section of `endangered-animals.html`
- Layout: Modify grid classes and responsive breakpoints
- Animations: Add CSS transitions or use existing AOS animations

## 🌐 Integration

The database is fully integrated with your existing:
- ✅ Navigation system
- ✅ CSS styling
- ✅ Footer and header components
- ✅ Responsive design
- ✅ No new dependencies required

## 📱 Mobile Friendly

- Responsive grid layout
- Touch-friendly buttons
- Optimized modal for mobile
- Fast loading with optimized images

## 🔍 Search Features

- **Real-time search** as you type
- **Debounced input** (300ms delay)
- **Multiple field search** (name, scientific name, description)
- **Filter combinations** (search + status filter)

## 🎯 Performance

- **Lightweight**: Only ~50KB total
- **Fast loading**: Optimized images and minimal JS
- **No external APIs**: All data stored locally
- **Cached images**: Uses Unsplash CDN for fast loading

## 🚀 Ready to Deploy

The database works immediately with your existing setup:
- No server required
- No database setup needed
- No additional installations
- Works with any web server (Apache, Nginx, etc.)

---

**🌍 Together we can protect endangered species! 💚**