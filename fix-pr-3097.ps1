# Script to create clean ISSUE-3097 PR without conflicts

Write-Host "Starting PR fix for ISSUE-3097..." -ForegroundColor Green

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
Write-Host "Creating clean branch ISSUE-3097-v2..." -ForegroundColor Yellow
git checkout -b ISSUE-3097-v2

# Copy only the 3 energy bill predictor files from ISSUE-3097
Write-Host "Copying energy bill predictor files..." -ForegroundColor Yellow
git checkout ISSUE-3097 -- frontend/pages/energy-bill-predictor.html 2>$null
git checkout ISSUE-3097 -- frontend/pages/energy-bill-predictor.js 2>$null
git checkout ISSUE-3097 -- frontend/pages/energy-bill-predictor.css 2>$null

# Check if files exist
if (Test-Path "frontend/pages/energy-bill-predictor.html") {
    Write-Host "Files copied successfully!" -ForegroundColor Green
    
    # Stage files
    git add frontend/pages/energy-bill-predictor.html
    git add frontend/pages/energy-bill-predictor.js
    git add frontend/pages/energy-bill-predictor.css
    
    # Commit
    Write-Host "Creating commit..." -ForegroundColor Yellow
    git commit -m "feat: Add Energy Bill Predictor with ML predictions and visualizations

- Added Chart.js line chart for historical vs predicted bills
- Implemented linear regression and moving average algorithms
- Created seasonal breakdown visualization
- Added recommendation cards with actionable insights
- Implemented CSV export functionality
- Added sample data for immediate testing

Closes #3097"
    
    # Push
    Write-Host "Pushing to origin..." -ForegroundColor Yellow
    git push -u origin ISSUE-3097-v2
    
    Write-Host "`nSuccess! ✓" -ForegroundColor Green
    Write-Host "Now create a PR from branch: ISSUE-3097-v2" -ForegroundColor Cyan
    Write-Host "This PR will have ZERO conflicts!" -ForegroundColor Green
    
} else {
    Write-Host "Error: Files not found. Check if ISSUE-3097 branch exists." -ForegroundColor Red
    git checkout ISSUE-3097
}
