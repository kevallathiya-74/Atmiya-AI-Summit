# PWA Icons - Important Notice

## Current Icons (SVG Placeholders)

The current icons are **SVG placeholders** for development and testing purposes.

### For Production Deployment:

You need to convert these SVGs to PNG format using proper dimensions:

#### Required PNG Icons:
1. **icon-192x192.png** - For Android home screen
2. **icon-512x512.png** - For splash screens and high-res displays

#### How to Create PNG Icons:

**Option 1: Use Online Tools**
- Visit: https://favicon.io/favicon-converter/
- Or: https://realfavicongenerator.net/
- Upload your logo/design
- Download 192x192 and 512x512 PNG versions

**Option 2: Use Image Editor**
1. Open SVG in Figma, Adobe Illustrator, or Inkscape
2. Export as PNG with exact dimensions:
   - 192x192px for icon-192x192.png
   - 512x512px for icon-512x512.png
3. Save with transparent background
4. Replace SVG files in `/public/icons/`

**Option 3: Use Command Line (ImageMagick)**
```bash
# Install ImageMagick first
convert icon-192x192.svg -resize 192x192 icon-192x192.png
convert icon-512x512.svg -resize 512x512 icon-512x512.png
```

**Option 4: Use Node.js Script**
```bash
npm install sharp
```

Create `scripts/generate-icons.js`:
```javascript
const sharp = require('sharp');

sharp('public/icons/icon-192x192.svg')
  .resize(192, 192)
  .png()
  .toFile('public/icons/icon-192x192.png');

sharp('public/icons/icon-512x512.svg')
  .resize(512, 512)
  .png()
  .toFile('public/icons/icon-512x512.png');
```

Run: `node scripts/generate-icons.js`

---

## Why PNG is Required

While SVG works in some browsers, PNG is the standard format for PWA icons because:
- ✅ Universal browser support
- ✅ Works on all Android devices
- ✅ Works with iOS home screen
- ✅ Proper splash screen rendering
- ✅ Better performance for icons

---

## Checklist Before Deploying to Vercel:

- [ ] Create proper 192x192 PNG icon
- [ ] Create proper 512x512 PNG icon
- [ ] Update manifest.json if needed (already configured)
- [ ] Test PWA install on Chrome (desktop & mobile)
- [ ] Test on actual Android device
- [ ] Verify icons appear correctly on home screen

---

## Current SVG Icons Work For:
✅ Development testing
✅ Verifying PWA manifest loads
✅ Seeing install prompt
⚠️ May not display correctly on all devices

## PNG Icons Required For:
✅ Production deployment
✅ Android home screen
✅ iOS home screen (via apple-touch-icon)
✅ Splash screens
✅ App drawer icons
