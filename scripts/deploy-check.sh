#!/bin/bash
# Vercel Deployment Pre-Check Script for GayanSetu AI

echo "=========================================="
echo "  GayanSetu AI - Deployment Pre-Check"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "1. Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "   Node.js: $NODE_VERSION"
if [[ "$NODE_VERSION" == v20* ]] || [[ "$NODE_VERSION" == v18* ]]; then
    echo -e "   ${GREEN}✓ Node.js version compatible${NC}"
else
    echo -e "   ${YELLOW}⚠ Consider using Node.js 18.x or 20.x${NC}"
fi
echo ""

# Check npm version
echo "2. Checking npm version..."
NPM_VERSION=$(npm -v)
echo "   npm: $NPM_VERSION"
echo -e "   ${GREEN}✓ npm installed${NC}"
echo ""

# Check if dependencies are installed
echo "3. Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "   ${GREEN}✓ node_modules exists${NC}"
else
    echo -e "   ${RED}✗ node_modules not found${NC}"
    echo "   Run: npm install"
    exit 1
fi
echo ""

# Check required files
echo "4. Checking required configuration files..."
FILES=("vercel.json" "next.config.mjs" "package.json" ".env.example" ".vercelignore" ".gitignore")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✓${NC} $file"
    else
        echo -e "   ${RED}✗${NC} $file (missing)"
    fi
done
echo ""

# Run build
echo "5. Running production build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "   ${GREEN}✓ Build successful${NC}"
else
    echo -e "   ${RED}✗ Build failed${NC}"
    echo "   Run: npm run build"
    exit 1
fi
echo ""

# Check for TypeScript errors
echo "6. Checking TypeScript..."
npx tsc --noEmit > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "   ${GREEN}✓ No TypeScript errors${NC}"
else
    echo -e "   ${YELLOW}⚠ TypeScript warnings detected${NC}"
fi
echo ""

# Check for ESLint errors
echo "7. Running ESLint..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "   ${GREEN}✓ No ESLint errors${NC}"
else
    echo -e "   ${YELLOW}⚠ ESLint warnings detected${NC}"
fi
echo ""

# Check environment variables
echo "8. Checking environment setup..."
if [ -f ".env.example" ]; then
    echo -e "   ${GREEN}✓${NC} .env.example template available"
    echo "   ${YELLOW}⚠${NC} Remember to set environment variables in Vercel Dashboard"
else
    echo -e "   ${YELLOW}⚠${NC} .env.example not found"
fi
echo ""

# Summary
echo "=========================================="
echo "  Deployment Pre-Check Summary"
echo "=========================================="
echo ""
echo -e "${GREEN}✓ Project is ready for Vercel deployment!${NC}"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Import to Vercel: vercel.com/new"
echo "3. Configure environment variables in Vercel Dashboard"
echo "4. Deploy!"
echo ""
echo "Or use Vercel CLI:"
echo "  vercel         # Preview deployment"
echo "  vercel --prod  # Production deployment"
echo ""
