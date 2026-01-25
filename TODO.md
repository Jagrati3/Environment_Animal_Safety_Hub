# TODO: Remove Global Functions and Use Event Listeners for Quizzes

## Overview
Remove all `window.` assignments from quiz JS files and replace onclick attributes in HTML with event listeners for better encapsulation.

## Tasks
- [x] Update pollution-awareness-quiz.js and pollution-awareness-quiz.html
- [x] Update climate-change-quiz.js and climate-change-quiz.html
- [x] Update animal-first-aid-quiz.js and animal-first-aid-quiz.html
- [x] Update environment-awareness-quiz.js and environment-awareness-quiz.html
- [x] Update sustainable-gardening-quiz.js and sustainable-gardening-quiz.html
- [x] Update waste-management-quiz.js and waste-management-quiz.html
- [x] Update water-conservation-quiz.js and water-conservation-quiz.html

## Details for Each
For each quiz:
1. Remove global window. functions from JS.
2. Add event listeners in JS using document.addEventListener('DOMContentLoaded', () => { ... });
3. Remove onclick attributes from HTML buttons.
4. Ensure quiz instance is accessible within listeners.

## Testing
- Verify start, resume, next, pause functions work via event listeners.
