# File Organization Guide

## Overview
This guide outlines the organized structure for CSS and JavaScript assets in the Environment Animal Safety Hub project.

## Directory Structure

```
frontend/
├── css/
│   ├── global/          # Global styles (reset, variables, typography)
│   ├── components/      # Reusable component styles (navbar, footer, modals)
│   └── pages/           # Page-specific styles
│       ├── animal-safety/
│       ├── community/
│       ├── education/
│       ├── environment/
│       ├── science/
│       └── sustainability/
├── js/
│   ├── global/          # Global scripts (utilities, helpers)
│   ├── components/      # Component scripts
│   └── pages/           # Page-specific scripts
└── assets/
    ├── images/
    ├── audio/
    └── videos/
```

## Naming Conventions

### CSS Files
- Use kebab-case: `eco-product-finder.css`
- Prefix with feature: `animal-safety-tracker.css`
- Avoid generic names: Use `dashboard-main.css` instead of `dashboard.css`

### JavaScript Files
- Match CSS naming: `eco-product-finder.js`
- Use descriptive names: `impact-calculator-logic.js`

## Best Practices

1. **One CSS/JS file per page/component**
2. **Organize in subfolders** under `css/pages/` and `js/pages/`
3. **Minify files** using `optimize.ps1` script
4. **Update HTML links** when moving files
5. **Remove unused files** regularly

## Maintenance

- Run `optimize.ps1 -All` after changes
- Check for broken links after reorganization
- Use consistent folder structure for new features

## Recent Changes

- Moved scattered CSS/JS from `frontend/` root to organized subfolders
- Removed duplicate files (endangered-animals.css, myth-vs-fact.css, etc.)
- Updated all HTML references
- Minified assets for better performance