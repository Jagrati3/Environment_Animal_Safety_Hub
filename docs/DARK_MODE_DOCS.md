# Dark/Light Mode Feature Documentation

## Overview
The Dark/Light Mode feature allows users to switch between two distinct visual themes. It respects system preferences and persists user choices across sessions.

## Key Features
- **Auto-Detection**: Respects `prefers-color-scheme` to set the initial theme based on OS/Browser settings.
- **Persistence**: Remembers the user's theme choice using `localStorage`.
- **Seamless Switching**: Uses a dedicated toggle button in the navbar for easy access.
- **Smooth Transitions**: Implements CSS transitions to smoothly animate color changes when the theme is toggled.
- **Unified Style System**: Centralized variables in `variables.css` manage the color palette for both themes.

## Technical Implementation
- **Attribute-Based Theming**: The theme is applied by setting a `data-theme` attribute on the `<html>` element.
- **CSS Variables**: Core colors are defined as variables (e.g., `--bg-color`, `--text-color`) and swap values based on the root theme attribute.
- **Early Execution**: The theme logic runs in the `<head>` of `index.html` to prevent Flash of Unstyled Content (FOUC).
- **Global Integration**: Dynamically loaded components (like the navbar) automatically inherit and interact with the theme state.

## Usage
Click the **Sun/Moon icon** in the navigation bar to toggle between themes.
