# Script to create clean ISSUE-3096 PR without conflicts

Write-Host "Starting PR fix for ISSUE-3096 (Water Conservation Tracker)..." -ForegroundColor Green

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
Write-Host "Creating clean branch ISSUE-3096-v2..." -ForegroundColor Yellow
git checkout -b ISSUE-3096-v2

# Copy only the Water Conservation Tracker files from ISSUE-3096
Write-Host "Copying water conservation tracker files..." -ForegroundColor Yellow
git checkout ISSUE-3096 -- frontend/pages/sustainability/water-conservation-tracker.html 2>$null
git checkout ISSUE-3096 -- frontend/pages/water-conservation-tracker.js 2>$null
git checkout ISSUE-3096 -- frontend/pages/water-conservation-tracker.css 2>$null

# Check if files exist
if (Test-Path "frontend/pages/sustainability/water-conservation-tracker.html") {
    Write-Host "Files copied successfully!" -ForegroundColor Green
    
    # Stage files
    git add frontend/pages/sustainability/water-conservation-tracker.html
    git add frontend/pages/water-conservation-tracker.js
    git add frontend/pages/water-conservation-tracker.css
    
    # Commit
    Write-Host "Creating commit..." -ForegroundColor Yellow
    git commit -m "feat: Add Water Conservation Tracker with charts and analytics

- Added Chart.js line chart for 12-week usage trends
- Implemented localStorage for data persistence
- Created weekly/monthly toggle views
- Added comparison metrics vs. average user consumption (500L/week)
- Implemented data export functionality (CSV download)
- Added metric cards for usage statistics
- Created responsive design for mobile devices

Closes #3096"
    
    # Push
    Write-Host "Pushing to origin..." -ForegroundColor Yellow
    git push -u origin ISSUE-3096-v2
    
    Write-Host "`nSuccess! ✓" -ForegroundColor Green
    Write-Host "Now create a PR from branch: ISSUE-3096-v2" -ForegroundColor Cyan
    Write-Host "This PR will have ZERO conflicts!" -ForegroundColor Green
    
} else {
    Write-Host "Error: Files not found. Check if ISSUE-3096 branch exists." -ForegroundColor Red
    git checkout ISSUE-3096
}
