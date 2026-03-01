# Script to create clean ISSUE-3098 PR without conflicts

Write-Host "Starting PR fix for ISSUE-3098 (Plastic Footprint Calculator)..." -ForegroundColor Green

# Abort any pending git operations
Write-Host "Cleaning up any pending git operations..." -ForegroundColor Yellow
git cherry-pick --abort 2>$null
git merge --abort 2>$null
git rebase --abort 2>$null

# Get latest main
Write-Host "Fetching latest main branch..." -ForegroundColor Yellow
git fetch origin main
git checkout main
git pull origin main

# Create new clean branch
Write-Host "Creating clean branch ISSUE-3098-v2..." -ForegroundColor Yellow
git checkout -b ISSUE-3098-v2

# Copy only the Plastic Footprint Calculator files from ISSUE-3098
Write-Host "Copying plastic footprint calculator files..." -ForegroundColor Yellow
git checkout ISSUE-3098 -- frontend/pages/science/pollution/plastic-footprint-calculator.html 2>$null
git checkout ISSUE-3098 -- frontend/pages/plastic-footprint-calculator.js 2>$null
git checkout ISSUE-3098 -- frontend/pages/plastic-footprint-calculator.css 2>$null

# Check if files exist
if (Test-Path "frontend/pages/science/pollution/plastic-footprint-calculator.html") {
    Write-Host "Files copied successfully!" -ForegroundColor Green
    
    # Stage files
    git add frontend/pages/science/pollution/plastic-footprint-calculator.html
    git add frontend/pages/plastic-footprint-calculator.js
    git add frontend/pages/plastic-footprint-calculator.css
    
    # Commit
    Write-Host "Creating commit..." -ForegroundColor Yellow
    git commit -m "feat: Add Plastic Footprint Calculator with charts and badges

- Added Chart.js doughnut chart for category breakdown (5 categories)
- Implemented comparison metrics vs. national average (45 items/week)
- Created 5 achievement badges with unlock animations
- Added monthly progress timeline (last 6 months)
- Implemented localStorage for historical tracking
- Added goal achievement notifications
- Created milestone celebrations (3 months below average)
- Responsive grid layouts for all sections

Closes #3098"
    
    # Push
    Write-Host "Pushing to origin..." -ForegroundColor Yellow
    git push -u origin ISSUE-3098-v2
    
    Write-Host "`nSuccess! ✓" -ForegroundColor Green
    Write-Host "Now create a PR from branch: ISSUE-3098-v2" -ForegroundColor Cyan
    Write-Host "This PR will have ZERO conflicts!" -ForegroundColor Green
    
} else {
    Write-Host "Error: Files not found. Check if ISSUE-3098 branch exists." -ForegroundColor Red
    git checkout ISSUE-3098
}
