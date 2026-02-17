# 📖 EcoLife Developer Handbook

Welcome to the EcoLife Developer Handbook! This comprehensive guide covers everything you need to know to develop, maintain, and extend the EcoLife platform.

---

## 📋 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [Design System Deep Dive](#-design-system-deep-dive)
3. [Component Development](#-component-development)
4. [CSS Architecture](#-css-architecture)
5. [JavaScript Patterns](#-javascript-patterns)
6. [Accessibility Guidelines](#-accessibility-guidelines)
7. [Performance Best Practices](#-performance-best-practices)
8. [Testing Guidelines](#-testing-guidelines)
9. [Deployment](#-deployment)
10. [Troubleshooting](#-troubleshooting)

---

## 🏗 Architecture Overview

EcoLife follows a **modular architecture** with clear separation between frontend and backend:

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │   HTML    │  │    CSS    │  │    JS     │       │
│  │  (Pages)  │  │  (Styles) │  │  (Logic)  │       │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘       │
│        │              │              │              │
│        └──────────────┼──────────────┘              │
│                       ▼                             │
│              ┌───────────────┐                      │
│              │  Components   │                      │
│              └───────────────┘                      │
└─────────────────────────────────────────────────────┘
                        │
                        ▼ API Calls
┌─────────────────────────────────────────────────────┐
│                    BACKEND                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │  Express  │──│   Routes  │──│  Models   │       │
│  │  Server   │  │   (API)   │  │ (MongoDB) │       │
│  └───────────┘  └───────────┘  └───────────┘       │
└─────────────────────────────────────────────────────┘
```

### Key Principles

1. **Progressive Enhancement** - Core content works without JavaScript
2. **Mobile-First** - Design for mobile, enhance for desktop
3. **Component-Based** - Reusable UI components
4. **Theme Support** - Light and dark themes
5. **Accessibility First** - WCAG 2.1 AA compliance

---

## 🎨 Design System Deep Dive

### CSS Custom Properties (Variables)

All design tokens are defined in `frontend/css/global/variables.css` and `frontend/css/style.css`.

#### Color Tokens

```css
:root {
  /* Primary Palette */
  --primary-color: #2e7d32;      /* Main brand green */
  --primary-dark: #1b5e20;       /* Darker green for hover/emphasis */
  --primary-light: #4caf50;      /* Lighter green for highlights */

  /* Secondary Palette */
  --secondary-color: #ff9800;    /* Orange for CTAs */
  --secondary-dark: #f57c00;     /* Darker orange */

  /* Accent */
  --accent-color: #00bcd4;       /* Cyan for special elements */

  /* Text Colors */
  --text-primary: #1a1a1a;       /* Main text */
  --text-secondary: #666666;     /* Supporting text */
  --text-muted: #888888;         /* Disabled/placeholder text */
  --text-light: #ffffff;         /* Text on dark backgrounds */

  /* Background Colors */
  --bg-primary: #f8fff9;         /* Page background */
  --bg-secondary: #f8faf8;       /* Section backgrounds */
  --bg-tertiary: #e8f5e9;        /* Cards, inputs */
  --bg-card: #ffffff;            /* Card backgrounds */
  --bg-input: #ffffff;           /* Form inputs */
}
```

#### Spacing Tokens

```css
:root {
  --radius-sm: 8px;              /* Small elements */
  --radius-md: 12px;             /* Cards, inputs */
  --radius-lg: 20px;             /* Large cards, modals */
  --radius-xl: 30px;             /* Pills, tags */
  --radius-full: 50%;            /* Circles */

  --section-padding: 100px 0;    /* Section spacing */
  --container-padding: 0 20px;   /* Container margins */
}
```

#### Animation Tokens

```css
:root {
  --transition-fast: 0.2s ease;    /* Quick interactions */
  --transition-normal: 0.3s ease;  /* Standard animations */
  --transition-slow: 0.5s ease;    /* Deliberate animations */
}
```

### Theme Switching

The app supports light and dark themes via the `data-theme` attribute:

```html
<html data-theme="light">  <!-- or "dark" -->
```

Theme-specific overrides are defined:

```css
[data-theme="dark"] {
  --primary-color: #4ade80;
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... */
}
```

---

## 🧱 Component Development

### Creating a New Component

1. **Create the HTML structure** in `frontend/pages/` or as a reusable partial in `frontend/components/`

2. **Create component CSS** in `frontend/css/components/your-component.css`

3. **Follow the naming convention:**
   ```css
   .component-name { }
   .component-name-header { }
   .component-name-body { }
   .component-name-footer { }
   ```

### Example: Card Component

```html
<!-- HTML -->
<div class="eco-card">
    <div class="eco-icon">
        <i class="fas fa-leaf"></i>
    </div>
    <h3>Card Title</h3>
    <p>Card description text goes here.</p>
    <button class="btn btn-primary">Action</button>
</div>
```

```css
/* CSS */
.eco-card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    padding: 1.6rem;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: transform var(--transition-normal),
                box-shadow var(--transition-normal);
}

.eco-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}
```

---

## 🎨 CSS Architecture

### File Organization

```
frontend/css/
├── global/
│   ├── variables.css     # Design tokens
│   ├── reset.css         # CSS reset
│   ├── layout.css        # Grid, containers
│   ├── utilities.css     # Helper classes
│   ├── theme.css         # Theme switching
│   └── accessibility.css # A11y styles
├── components/
│   ├── navbar.css        # Navigation
│   ├── footer.css        # Footer
│   ├── card.css          # Cards
│   ├── hero.css          # Hero sections
│   ├── modal.css         # Modals
│   └── quiz.css          # Quiz component
├── pages/
│   └── [page-name].css   # Page-specific styles
└── style.css             # Main entry, imports
```

### CSS Naming Conventions

```css
/* Component: Block */
.card { }

/* Element: Part of component */
.card-header { }
.card-body { }
.card-footer { }

/* Modifier: Variant */
.card--featured { }
.card--compact { }

/* State */
.card.is-active { }
.card.is-loading { }
```

### Responsive Breakpoints

```css
/* Mobile First Approach */

/* Base: Mobile (< 576px) */
.element { }

/* Small: Tablets (≥ 576px) */
@media (min-width: 576px) { }

/* Medium: Small Laptops (≥ 768px) */
@media (min-width: 768px) { }

/* Large: Desktops (≥ 1024px) */
@media (min-width: 1024px) { }

/* Extra Large: Large Screens (≥ 1200px) */
@media (min-width: 1200px) { }
```

---

## 📜 JavaScript Patterns

### Module Pattern

```javascript
// js/modules/quiz.js
const QuizModule = (() => {
    // Private variables
    let currentQuestion = 0;
    let score = 0;

    // Private functions
    const showQuestion = (index) => {
        // ...
    };

    // Public API
    return {
        init: () => {
            // Initialize quiz
        },
        nextQuestion: () => {
            currentQuestion++;
            showQuestion(currentQuestion);
        },
        getScore: () => score
    };
})();

// Usage
QuizModule.init();
```

### Event Delegation

```javascript
// Good: Single event listener for multiple elements
document.querySelector('.card-container').addEventListener('click', (e) => {
    const card = e.target.closest('.eco-card');
    if (card) {
        handleCardClick(card);
    }
});

// Avoid: Individual listeners
// cards.forEach(card => card.addEventListener('click', handler));
```

### DOM Ready Pattern

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initTheme();
    initQuiz();
});
```

---

## ♿ Accessibility Guidelines

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```html
<!-- Good: Focusable and has role -->
<button type="button" class="menu-toggle" aria-expanded="false">
    <span class="sr-only">Toggle menu</span>
    <i class="fas fa-bars"></i>
</button>

<!-- Good: Skip link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### ARIA Attributes

```html
<!-- Navigation -->
<nav aria-label="Main navigation">

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">

<!-- Loading state -->
<button aria-busy="true" aria-disabled="true">
    <span class="spinner"></span> Loading...
</button>
```

### Screen Reader Text

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
```

### Color Contrast

Ensure text meets WCAG AA contrast ratios:
- **Normal text:** 4.5:1 minimum
- **Large text:** 3:1 minimum
- **Graphics:** 3:1 minimum

---

## ⚡ Performance Best Practices

### Images

```html
<!-- Use WebP format -->
<img src="image.webp" alt="Description" loading="lazy" width="400" height="300">

<!-- Responsive images -->
<picture>
    <source srcset="image-small.webp" media="(max-width: 576px)">
    <source srcset="image-medium.webp" media="(max-width: 1024px)">
    <img src="image-large.webp" alt="Description">
</picture>
```

### CSS

```css
/* Prefer transforms over position changes */
.card:hover {
    transform: translateY(-5px);  /* ✅ Performant */
    /* top: -5px;  ❌ Triggers layout */
}

/* Use will-change sparingly */
.animated-element {
    will-change: transform;
}
```

### JavaScript

```javascript
// Debounce scroll/resize handlers
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

window.addEventListener('scroll', debounce(handleScroll, 100));
```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Works on mobile devices
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Dark mode works
- [ ] No console errors
- [ ] Images load correctly
- [ ] Forms validate properly

### Browser DevTools Checks

1. **Lighthouse Audit:** Aim for 90+ on all metrics
2. **Accessibility Audit:** Check for WCAG violations
3. **Performance:** Check for layout shifts, long tasks
4. **Network:** Verify asset sizes and loading order

---

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `MONGODB_URI` | Database connection | Optional |
| `NODE_ENV` | Environment mode | Yes |

---

## 🔧 Troubleshooting

### Common Issues

#### CSS not updating

```bash
# Clear browser cache or hard refresh
Ctrl + Shift + R  # Windows/Linux
Cmd + Shift + R   # Mac
```

#### JavaScript errors

```javascript
// Check browser console for errors
// Common: Undefined variables, missing elements
```

#### Images not loading

```
1. Check file path (relative vs absolute)
2. Check file extension (case-sensitive on Linux)
3. Check file exists in correct location
```

### Getting Help

- Check existing issues on GitHub
- Ask on Discord
- Open a new issue with details

---

## 📚 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [A11y Project](https://www.a11yproject.com/)
- [FontAwesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)

---

_Last Updated: February 2026_
