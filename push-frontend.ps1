# Frontend GitHub Push Script
$env:Path += ";C:\Program Files\Git\cmd"

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  Frontend Repository - GitHub Setup" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend
cd c:\Users\ELCOT\Downloads\demo\demo\frontend

# Repository name suggestion
$repoName = "hostel-management-frontend"
Write-Host "Suggested repository name: $repoName" -ForegroundColor Yellow
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

if (-not $username) {
    Write-Host "Username is required!" -ForegroundColor Red
    exit 1
}

# Construct repository URL
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Repository will be created at:" -ForegroundColor Cyan
Write-Host $repoUrl -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Please create this repository on GitHub first!" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: $repoName" -ForegroundColor White
Write-Host "3. Description: React frontend for Hostel Management System" -ForegroundColor White
Write-Host "4. Choose Public or Private" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Have you created the repository on GitHub? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Please create the repository first, then run this script again." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Configuring remote repository..." -ForegroundColor Yellow

# Check if remote already exists
$existingRemote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Removing existing remote..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote
git remote add origin $repoUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote added successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed to add remote" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host ""

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host "  Frontend pushed successfully!" -ForegroundColor Green
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Push failed!" -ForegroundColor Red
    Write-Host "This might be due to authentication." -ForegroundColor Yellow
    Write-Host "Try using a Personal Access Token (PAT) instead of password." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press Enter to continue..."
Read-Host
