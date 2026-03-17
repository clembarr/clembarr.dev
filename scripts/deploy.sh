#!/bin/bash

# Deploy script for clembarr.dev
# This script builds the project, generates the sitemap, and prepares for deployment

set -e  # Exit on error

echo "🚀 Starting deployment process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean previous build
echo -e "${BLUE}📦 Cleaning previous build...${NC}"
rm -rf dist
echo -e "${GREEN}✓ Clean complete${NC}"
echo ""

# Step 2: Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
fi

# Step 3: Run TypeScript type checking
echo -e "${BLUE}🔍 Running TypeScript type checking...${NC}"
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Type checking passed${NC}"
else
    echo -e "${RED}✗ Type checking failed${NC}"
    exit 1
fi
echo ""

# Step 4: Generate sitemap (before build so Vite copies it into dist/)
echo -e "${BLUE}🗺️  Generating sitemap...${NC}"
node scripts/generate-sitemap.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sitemap generated${NC}"
else
    echo -e "${RED}✗ Sitemap generation failed${NC}"
    exit 1
fi
echo ""

# Step 5: Build the project (copies public/sitemap.xml into dist/)
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Step 6: Display build stats
echo -e "${BLUE}📊 Build Statistics:${NC}"
echo "-----------------------------------"
echo "Main bundle:"
ls -lh dist/assets/index-*.js | awk '{print "  " $9 " - " $5}'
echo ""
echo "CSS bundle:"
ls -lh dist/assets/index-*.css | awk '{print "  " $9 " - " $5}'
echo ""
echo "Total dist size:"
du -sh dist | awk '{print "  " $1}'
echo "-----------------------------------"
echo ""

# Step 7: Deployment ready
echo -e "${GREEN}✅ Deployment package ready!${NC}"
echo ""
echo "Next steps:"
echo "  1. Test the build locally: npm run preview"
echo "  2. Deploy the 'dist' directory to your hosting provider"
echo "  3. Verify deployment at https://clembarr.dev"
echo ""
echo "Happy deploying! 🎉"
