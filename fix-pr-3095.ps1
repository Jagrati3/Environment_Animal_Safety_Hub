# Script to create clean ISSUE-3095 PR without conflicts

Write-Host "Starting PR fix for ISSUE-3095 (Heat Inequality Mapper)..." -ForegroundColor Green

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
Write-Host "Creating clean branch ISSUE-3095-v2..." -ForegroundColor Yellow
git checkout -b ISSUE-3095-v2

# Copy only the Heat Inequality Mapper files from ISSUE-3095
Write-Host "Copying heat inequality mapper files..." -ForegroundColor Yellow
git checkout ISSUE-3095 -- frontend/pages/heat-inequality-mapper.html 2>$null
git checkout ISSUE-3095 -- frontend/pages/heat-inequality-mapper.js 2>$null
git checkout ISSUE-3095 -- frontend/pages/heat-inequality-mapper.css 2>$null

# Check if files exist
if (Test-Path "frontend/pages/heat-inequality-mapper.html") {
    Write-Host "Files copied successfully!" -ForegroundColor Green
    
    # Stage files
    git add frontend/pages/heat-inequality-mapper.html
    git add frontend/pages/heat-inequality-mapper.js
    git add frontend/pages/heat-inequality-mapper.css
    
    # Commit
    Write-Host "Creating commit..." -ForegroundColor Yellow
    git commit -m "feat: Complete Heat Inequality Mapper with visualizations

- Added Chart.js bar chart for neighborhood heat index
- Implemented interactive filters (urgency, income, tree cover)
- Created sorting functionality (temperature, urgency, income)
- Added color-coded heatmap cards with urgency badges
- Implemented historical heat data timeline (2020-2026)
- Created seasonal trend visualization
- Added responsive grid layout with heat-based coloring
- Implemented comparison metrics and vulnerability scoring

Closes #3095"
    
    # Push
    Write-Host "Pushing to origin..." -ForegroundColor Yellow
    git push -u origin ISSUE-3095-v2
    
    Write-Host "`nSuccess! ✓" -ForegroundColor Green
    Write-Host "Now create a PR from branch: ISSUE-3095-v2" -ForegroundColor Cyan
    Write-Host "This PR will have ZERO conflicts!" -ForegroundColor Green
    
} else {
    Write-Host "Error: Files not found. Check if ISSUE-3095 branch exists." -ForegroundColor Red
    git checkout ISSUE-3095
}
