# 🤝 Contributing to EcoLife

Thank you for considering contributing to EcoLife! 🙌 Your participation helps make this project better for everyone and contributes to environmental and animal safety awareness.

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Code Style Guidelines](#-code-style-guidelines)
- [Making Contributions](#-making-contributions)
- [Pull Request Process](#-pull-request-process)
- [Issue Reporting](#-issue-reporting)
- [Community Guidelines](#-community-guidelines)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| Node.js | v18.x+ | [nodejs.org](https://nodejs.org/) |
| npm | v9.x+ | Comes with Node.js |
| VS Code | Latest | [code.visualstudio.com](https://code.visualstudio.com/) |

### Recommended VS Code Extensions

- **Live Server** - Local development server with live reload
- **Prettier** - Code formatter
- **ESLint** - JavaScript linting
- **HTMLHint** - HTML linting
- **CSS Peek** - CSS class definitions

---

## 💻 Development Setup

### 1. Fork the Repository

Click the **Fork** button at the top-right of the [repository page](https://github.com/motalib-code/Environment_Animal_Safety_Hub) to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/Environment_Animal_Safety_Hub.git
cd Environment_Animal_Safety_Hub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

```bash
# Create a .env file from the example
cp .env.example .env    # On Windows: copy .env.example .env

# Edit .env with your configuration (if needed)
```

### 5. Start Development Server

```bash
# Start the backend server
npm run dev

# OR for frontend-only development:
# Use VS Code's Live Server extension on frontend/index.html
```

### 6. View the Application

- **Backend API:** http://localhost:3000
- **Frontend:** Open `frontend/index.html` in browser

---

## 📁 Project Structure

```text
Environment_Animal_Safety_Hub/
├── frontend/                  # Frontend source code
│   ├── assets/               # Static resources
│   │   ├── images/           # Images & illustrations
│   │   │   └── 3d/           # 3D assets (WebP format)
│   │   ├── icons/            # Icon files
│   │   └── data/             # JSON data files
│   ├── components/           # Reusable HTML components
│   ├── css/                  # Stylesheets
│   │   ├── global/           # Design tokens & variables
│   │   ├── components/       # Component styles
│   │   ├── pages/            # Page-specific styles
│   │   └── style.css         # Main stylesheet
│   ├── js/                   # JavaScript modules
│   ├── pages/                # HTML pages
│   │   └── style-guide.html  # Design system reference
│   └── index.html            # Main entry point
├── backend/                  # Backend server
├── docs/                     # Documentation
├── package.json              # Dependencies
└── README.md                 # Project overview
```

---

## 🎨 Code Style Guidelines

### HTML

```html
<!-- ✅ Good: Semantic HTML with proper attributes -->
<button type="button" class="btn btn-primary" aria-label="Submit form">
    <i class="fas fa-paper-plane"></i> Submit
</button>

<!-- ❌ Bad: Non-semantic, missing attributes -->
<div class="btn" onclick="submit()">Submit</div>
```

- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Include proper `alt` attributes for all images
- Use `aria-` attributes for accessibility
- Use `type="button"` for non-submit buttons

### CSS

```css
/* ✅ Good: Use CSS variables from design system */
.card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
}

/* ❌ Bad: Hardcoded values */
.card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
```

- **Always use CSS variables** from `frontend/css/global/variables.css`
- Follow BEM naming convention when possible
- Mobile-first responsive design
- Use `rem` for font sizes, `px` for borders/shadows

### JavaScript

```javascript
// ✅ Good: Descriptive names, const/let, arrow functions
const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Process form...
};

// ❌ Bad: var, unclear naming
var x = function(e) {
    e.preventDefault();
    // ...
};
```

- Use `const` and `let` (never `var`)
- Use descriptive function and variable names
- Add comments for complex logic
- Use ES6+ features (arrow functions, template literals, destructuring)

---

## 🎨 Design System Reference

Before creating new UI components, consult the **Living Style Guide**:

📍 **Location:** `frontend/pages/style-guide.html`

### Color Palette

| Color | Hex | Variable |
|-------|-----|----------|
| Primary Green | `#2E7D32` | `--primary-color` |
| Primary Dark | `#1b5e20` | `--primary-dark` |
| Primary Light | `#4caf50` | `--primary-light` |
| Secondary Orange | `#ff9800` | `--secondary-color` |
| Accent Cyan | `#00bcd4` | `--accent-color` |

### Standard Icons

Use FontAwesome icons. Common icons:

| Icon | Class | Usage |
|------|-------|-------|
| 🍃 | `fa-leaf` | Environment |
| 🐾 | `fa-paw` | Animals |
| 🌳 | `fa-tree` | Nature |
| ♻️ | `fa-recycle` | Recycling |
| 🌱 | `fa-seedling` | Growth |

### Image Guidelines

- **Format:** Use WebP for all images
- **Max Width:** 400px for 3D illustrations
- **Location:** `frontend/assets/images/`
- **Naming:** Use kebab-case (e.g., `eco-hero-image.webp`)

---

## 📝 Making Contributions

### 1. Create a Branch

```bash
git checkout -b fix-issue-name
# Example: git checkout -b fix-navbar-responsive
```

**Branch naming conventions:**
- `fix-*` - Bug fixes
- `feature-*` - New features
- `docs-*` - Documentation
- `refactor-*` - Code refactoring

### 2. Make Your Changes

- Follow the code style guidelines above
- Test your changes locally
- Ensure responsive design works
- Check accessibility (keyboard navigation, screen readers)

### 3. Commit Your Changes

```bash
git add .
git commit -m "Fix: short description of change"
```

**Commit message format:**
- `Fix:` - Bug fixes
- `Feature:` - New features
- `Docs:` - Documentation updates
- `Style:` - CSS/UI changes
- `Refactor:` - Code improvements

### 4. Push to Your Fork

```bash
git push origin fix-issue-name
```

---

## 🔄 Pull Request Process

1. **Go to your forked repository** on GitHub
2. **Click "Compare & Pull Request"**
3. **Fill in the PR template:**
   - Describe what you changed and why
   - Reference the issue number (e.g., "Fixes #123")
   - Include screenshots for UI changes
4. **Wait for review** - Maintainers will review your PR
5. **Address feedback** if requested
6. **Merge!** 🎉

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Changes are tested locally
- [ ] No console errors or warnings
- [ ] Responsive design verified
- [ ] Accessibility checked
- [ ] Screenshots included (for UI changes)

---

## 🐛 Issue Reporting

### Found a Bug?

1. Go to [Issues](https://github.com/motalib-code/Environment_Animal_Safety_Hub/issues)
2. Click **New Issue**
3. Provide:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots (if applicable)

### Feature Request?

1. Go to Issues
2. Click **New Issue**
3. Describe:
   - The feature you'd like
   - Why it would be useful
   - Any implementation ideas

---

## 👥 Community Guidelines

- **Be respectful** in all interactions
- **Be constructive** in feedback and reviews
- **Be patient** - maintainers are volunteers
- **Be helpful** - answer questions when you can
- **Be inclusive** - welcome newcomers

---

## 📞 Getting Help

- **Discord:** [Join our server](https://discord.gg/3FKndgyuJp)
- **Issues:** Open a GitHub issue
- **Discussions:** Use GitHub Discussions for questions

---

## 🙏 Thank You!

Every contribution, no matter how small, helps make EcoLife better. Together, we're building awareness for environmental and animal safety! 🌍💚

---

_Happy Contributing! 🌱_
