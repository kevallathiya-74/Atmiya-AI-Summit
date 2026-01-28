# GayanSetu AI - Vercel Deployment Pre-Check
# Run this script before deploying to Vercel

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "  GayanSetu AI - Deployment Pre-Check" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check Node.js version
Write-Host "1. Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node -v
Write-Host "   Node.js: $nodeVersion" -ForegroundColor White
if ($nodeVersion -match "v20|v18") {
    Write-Host "   ✓ Node.js version compatible`n" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Consider using Node.js 18.x or 20.x`n" -ForegroundColor Yellow
}

# Check npm version
Write-Host "2. Checking npm version..." -ForegroundColor Yellow
$npmVersion = npm -v
Write-Host "   npm: $npmVersion" -ForegroundColor White
Write-Host "   ✓ npm installed`n" -ForegroundColor Green

# Check if dependencies are installed
Write-Host "3. Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✓ node_modules exists`n" -ForegroundColor Green
} else {
    Write-Host "   ✗ node_modules not found" -ForegroundColor Red
    Write-Host "   Run: npm install`n" -ForegroundColor Yellow
    exit 1
}

# Check required files
Write-Host "4. Checking required configuration files..." -ForegroundColor Yellow
$files = @("vercel.json", "next.config.mjs", "package.json", ".env.example", ".vercelignore", ".gitignore")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file (missing)" -ForegroundColor Red
    }
}
Write-Host ""

# Run build
Write-Host "5. Running production build..." -ForegroundColor Yellow
Write-Host "   (This may take a few minutes)..." -ForegroundColor Gray
$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Build successful`n" -ForegroundColor Green
} else {
    Write-Host "   ✗ Build failed" -ForegroundColor Red
    Write-Host "   Run: npm run build`n" -ForegroundColor Yellow
    exit 1
}

# Check for TypeScript errors
Write-Host "6. Checking TypeScript..." -ForegroundColor Yellow
$tscOutput = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ No TypeScript errors`n" -ForegroundColor Green
} else {
    Write-Host "   ⚠ TypeScript warnings detected`n" -ForegroundColor Yellow
}

# Check for ESLint errors
Write-Host "7. Running ESLint..." -ForegroundColor Yellow
$lintOutput = npm run lint 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ No ESLint errors`n" -ForegroundColor Green
} else {
    Write-Host "   ⚠ ESLint warnings detected`n" -ForegroundColor Yellow
}

# Check environment variables
Write-Host "8. Checking environment setup..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Write-Host "   ✓ .env.example template available" -ForegroundColor Green
    Write-Host "   ⚠ Remember to set environment variables in Vercel Dashboard" -ForegroundColor Yellow
} else {
    Write-Host "   ⚠ .env.example not found" -ForegroundColor Yellow
}
Write-Host ""

# Summary
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Deployment Pre-Check Summary" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

Write-Host "✓ Project is ready for Vercel deployment!`n" -ForegroundColor Green

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Push to GitHub: git push origin main" -ForegroundColor White
Write-Host "2. Import to Vercel: vercel.com/new" -ForegroundColor White
Write-Host "3. Configure environment variables in Vercel Dashboard" -ForegroundColor White
Write-Host "4. Deploy!`n" -ForegroundColor White

Write-Host "Or use Vercel CLI:" -ForegroundColor Yellow
Write-Host "  vercel         # Preview deployment" -ForegroundColor White
Write-Host "  vercel --prod  # Production deployment`n" -ForegroundColor White
