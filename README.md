# 🌍 EcoLife – Environment & Animal Safety Hub

EcoLife is an interactive and visually engaging platform created to promote environment protection, waste management, animal safety, and climate awareness. It encourages users — especially kids — to take part in real-life eco-friendly activities through education and quizzes.

---

## 🚨 Mandatory Contributor Registration

Before starting any contribution, you MUST complete the registration form.

👉 **Registration Form:** [https://forms.gle/2aVtenoaHg65qi4G7](https://forms.gle/2aVtenoaHg65qi4G7)

⚠️ Pull Requests without registration will be closed.  
⚠️ Submitted data is confidential and visible only to the Project Admin.

---

## 🧑‍💻 Open Source Contributors Welcome!

Join our official Discord server to:
- Ask and clear doubts
- Discuss issues and Pull Requests
- Get guidance from mentors
- Collaborate with contributors

👉 **Discord:** [https://discord.gg/3FKndgyuJp](https://discord.gg/3FKndgyuJp)

---

## ✨ Features

### 🐾 Animal Protection & Adoption
- Adopt and support stray animals
- Learn how to protect endangered wildlife
- **Animal First Aid Guide** - Essential first aid techniques for common animal injuries and emergencies
- **Wildlife Incidents Reporting** - How and when to report wildlife sightings, injuries, and illegal activities

### 🗑 Waste Segregation
- Reduce, reuse & recycle with simple guidance
- Awareness for community clean-ups

### 🌡 Climate Change Awareness
- Learn how to reduce carbon footprint
- Save energy and plant more trees for a greener world

### 🌱 Plant Care & Animal Feeding
- Basic tips to take care of common plants
- Feed animals safely and responsibly

### 🎯 Kids Quiz Section
- Fun quiz for children to learn sustainability interactively

### 📝 Report & Contact
- Report environmental issues or animal abuse
- Contact page for assistance or volunteering

---

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Purpose |
|------|---------|---------|
| [Git](https://git-scm.com/) | Latest | Version control |
| [Node.js](https://nodejs.org/) | v18.x or higher | Backend runtime |
| [npm](https://www.npmjs.com/) | v9.x or higher | Package management |
| [VS Code](https://code.visualstudio.com/) | Latest (recommended) | Code editor |
| [MongoDB](https://www.mongodb.com/) | Latest (optional) | Database for backend features |

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/motalib-code/Environment_Animal_Safety_Hub.git
   cd Environment_Animal_Safety_Hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env    # On Windows: copy .env.example .env
   
   # Edit .env with your configuration
   ```

4. **Initialize the database (optional)**
   ```bash
   npm run init-db
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **View the application**
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - Frontend: Open `frontend/index.html` in your browser
   - Or use VS Code's Live Server extension for hot reloading

---

## 🖥 Backend Server Entry Clarification

The official and primary backend entry point for this project is:

`server.js` (root directory)

This file is used by:
- `npm start`
- `npm run dev`
- Production deployments

A previously existing file (`backend/server.js`) was reviewed and removed to eliminate duplication and architectural ambiguity.

All backend routes, middleware, and configurations are centralized and managed through the root-level `server.js` file.

---

## 📁 Project Structure

```text
Environment_Animal_Safety_Hub/
├── 📂 frontend/               # All frontend source code
│   ├── 📂 assets/             # Static assets
│   │   ├── 📂 audio/          # Audio files
│   │   ├── 📂 data/           # JSON data files
│   │   ├── 📂 icons/          # Icon files (PNG, SVG)
│   │   └── 📂 images/         # Image assets
│   │       ├── 📂 3d/         # 3D illustrations
│   │       └── 📂 badges/     # Achievement badges
│   ├── 📂 components/         # Reusable HTML components
│   ├── 📂 css/                # Stylesheets
│   │   ├── 📂 components/     # Component-specific styles
│   │   ├── 📂 global/         # Global styles & variables
│   │   ├── 📂 pages/          # Page-specific styles
│   │   └── style.css          # Main stylesheet
│   ├── 📂 js/                 # JavaScript files
│   ├── 📂 pages/              # HTML pages
│   │   └── style-guide.html   # 📚 Design System Reference
│   ├── index.html             # Main entry point
│   └── manifest.json          # PWA manifest
├── 📂 backend/                # Backend routes, models & configuration
│   ├── 📂 api/                # API routes
│   ├── 📂 models/             # Database models
│   └── init-db.js             # Database initialization
├── 📂 .github/                # GitHub templates & workflows
├── 📂 docs/                   # Markdown documentation
│   ├── CONTRIBUTING.md        # Contribution guidelines
│   └── [topic]_README.md      # Topic-specific docs
├── package.json               # Project dependencies
├── server.js                  # Express server entry
└── README.md                  # This file
```

### Key Directories

| Directory | Description |
|-----------|-------------|
| `frontend/` | Contains all frontend code (HTML, CSS, JS) |
| `frontend/css/` | Stylesheets organized by scope |
| `frontend/css/global/` | Design tokens, variables, resets |
| `frontend/css/components/` | Component styles (navbar, footer, cards) |
| `frontend/js/` | JavaScript modules and utilities |
| `frontend/pages/` | Individual HTML pages |
| `frontend/assets/images/3d/` | 3D illustrations (WebP format) |
| `backend/` | Server-side code and API |

---

## 📱 Service Worker Clarification

The official and actively registered service worker file for this project is:

`frontend/sw.js`

This file is registered through:

- `frontend/js/global/main.js`
- Other feature-specific JavaScript files where applicable

The previously existing file:

`frontend/service-worker.js`

was reviewed and removed to eliminate duplication and architectural ambiguity.

All PWA caching, offline support, and background functionality are now centralized within `sw.js`.

This refactor ensures:
- Clear service worker ownership
- No caching conflicts
- Improved frontend maintainability
- Better onboarding clarity for contributors

--- 

## 🎨 Design System

We have a comprehensive **Living Style Guide** that documents all UI components.

👉 **View Style Guide:** Open `frontend/pages/style-guide.html` in your browser

### Color Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| 🟢 Primary Green | `#2E7D32` | `--primary-color` | Main brand color, buttons, links |
| 🟢 Primary Dark | `#1b5e20` | `--primary-dark` | Hover states, emphasis |
| 🟢 Primary Light | `#4caf50` | `--primary-light` | Highlights, gradients |
| 🟠 Secondary Orange | `#ff9800` | `--secondary-color` | CTAs, accents |
| 🔵 Accent Cyan | `#00bcd4` | `--accent-color` | Special highlights |

### Typography

- **Font Family:** Poppins (Google Fonts)
- **Base Size:** 16px
- **Line Height:** 1.6

### Standard Icons (FontAwesome)

| Icon | Class | Usage |
|------|-------|-------|
| 🍃 | `fa-leaf` | Environment, sustainability |
| 🐾 | `fa-paw` | Animals, pets |
| 🌳 | `fa-tree` | Nature, forests |
| ♻️ | `fa-recycle` | Recycling, waste |
| 🌱 | `fa-seedling` | Growth, planting |
| 🌍 | `fa-globe-americas` | Global, world |
| 💧 | `fa-water` | Water conservation |
| 🕊️ | `fa-dove` | Peace, wildlife |

---

## 🛠 Tech Stack

| Technology | Role |
|------------|------|
| HTML5 | Structure & layout |
| CSS3 | Styling, responsiveness & UI design |
| JavaScript | Functional interactivity |
| Node.js | Backend runtime |
| Express.js | Web server framework |
| MongoDB | Database (optional) |

---

## 📸 UI Preview

![Homepage UI Preview](frontend/assets/images/Readme/IMG_1.png)
![Features Section Preview](frontend/assets/images/Readme/IMG_2.png)
![Quiz Section Preview](frontend/assets/images/Readme/IMG_3.png)

---

## 🤝 Contributing

We welcome contributions! Please read our contribution guidelines before getting started.

### Quick Contribution Steps

1. **Fork the repository** on GitHub
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/Environment_Animal_Safety_Hub.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b fix-issue-name
   ```
4. **Make your changes** and test them
5. **Commit with a descriptive message**
   ```bash
   git add .
   git commit -m "Fix: short description of change"
   ```
6. **Push and create a Pull Request**
   ```bash
   git push origin fix-issue-name
   ```

For detailed guidelines, see [CONTRIBUTING.md](docs/CONTRIBUTING.md)


---

## 👥 Contributors

We thank all our contributors for their valuable contributions to making EcoLife better!

### Core Team

| Name | Role |
|------|------|
| Jagrati | Project Owner & Developer |
| Nikhil Singh | Mentor |

### All Contributors

<a href="https://github.com/motalib-code/Environment_Animal_Safety_Hub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=motalib-code/Environment_Animal_Safety_Hub" />
</a>

_Thanks to everyone supporting this initiative!_ 💚

---

## 🚀 Future Enhancements

For a detailed roadmap of planned features for v2.0, see [ROADMAP.md](docs/ROADMAP.md).


- Admin dashboard to manage content
- User login & save quiz score feature
- Animations & interactive infographics
- Dark mode and accessibility improvements

---

## 📚 Additional Resources

- **Style Guide:** `frontend/pages/style-guide.html`
- **API Documentation:** See `backend/README.md`
- **Component Documentation:** See individual component files

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This project is created for educational & awareness purposes.

---

### ⭐ Support the Project

If you like this project, please give it a ⭐ on GitHub!

Together we can make Earth a better place! 🌏💚