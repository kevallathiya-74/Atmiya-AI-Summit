# GayanSetu.AI Development Setup

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "`nInstalling additional required packages..." -ForegroundColor Cyan
npm install tailwindcss-animate

Write-Host "`n✅ Installation complete!" -ForegroundColor Green
Write-Host "`n🚀 Starting development server..." -ForegroundColor Cyan
Write-Host "`n📱 Open http://localhost:3000 in your browser" -ForegroundColor Yellow
Write-Host "`n💡 Demo Login: Use any email and password (6+ characters)" -ForegroundColor Magenta
Write-Host "`n" -ForegroundColor White

npm run dev
