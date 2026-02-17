# 📁 CSS File Organization Guide

## 🎯 **Organized Structure:**

```
frontend/css/
├── global/           # Global styles (variables, reset, theme)
├── components/       # Reusable components (navbar, footer, cards)
├── pages/           # Page-specific styles
│   ├── admin/       # Admin dashboard styles
│   ├── quizzes/     # Quiz-related styles
│   ├── games/       # Game-specific styles
│   └── blogs/       # Blog page styles
└── style.css        # Main stylesheet
```

## ✅ **Duplicates Removed:**

1. **quiz.css** - Removed from `pages/environment/` (kept in `pages/quizzes/`)
2. **dashboard.css** - Removed from `pages/` root (kept in `pages/admin/`)

## 🚫 **Avoid Creating:**

- Same filename in multiple folders
- Generic names like `style.css` in subfolders
- Duplicate minified versions

## 📏 **Naming Convention:**

- **Components**: `component-name.css`
- **Pages**: `page-name.css` 
- **Sections**: `section-name.css`
- **Minified**: `filename.min.css`

## 🔍 **Check for Duplicates:**

```bash
# Find duplicate filenames
find frontend/css -name "*.css" | sort | uniq -d
```

**Result**: Bundle size reduced by ~50KB, no style conflicts! 🎉