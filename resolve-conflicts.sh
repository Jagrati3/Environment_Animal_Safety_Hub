#!/bin/bash
# Merge Conflict Resolution Script

echo "🔧 Resolving merge conflicts..."

# Replace conflicted files with clean versions
cp frontend/js/components/quiz-clean.js frontend/js/components/quiz.js
cp frontend/js/components/dictionary-clean.js frontend/js/components/dictionary.js  
cp frontend/js/main-modules-clean.js frontend/js/main-modules.js

# Remove temporary clean files
rm frontend/js/components/quiz-clean.js
rm frontend/js/components/dictionary-clean.js
rm frontend/js/main-modules-clean.js

echo "✅ Merge conflicts resolved"
echo "✅ Files updated with error handling"
echo "✅ Ready for commit"

# Git commands to resolve conflicts
git add frontend/js/components/dictionary.js
git add frontend/js/components/quiz.js
git add frontend/js/main-modules.js

echo "✅ Files staged for commit"