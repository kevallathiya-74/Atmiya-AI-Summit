/**
 * PWA Icon Generator Script
 *
 * This script converts SVG icons to PNG format for production PWA deployment.
 *
 * Prerequisites:
 *   npm install sharp
 *
 * Usage:
 *   node scripts/generate-pwa-icons.js
 *
 * What it does:
 * - Reads SVG icons from /public/icons/
 * - Converts to PNG with exact dimensions (192x192, 512x512)
 * - Saves PNG versions in same directory
 * - Maintains transparent background
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ICONS_DIR = path.join(__dirname, "..", "public", "icons");

const icons = [
  { input: "icon-192x192.svg", output: "icon-192x192.png", size: 192 },
  { input: "icon-512x512.svg", output: "icon-512x512.png", size: 512 },
];

async function generateIcons() {
  console.log("🎨 PWA Icon Generator\n");

  for (const icon of icons) {
    const inputPath = path.join(ICONS_DIR, icon.input);
    const outputPath = path.join(ICONS_DIR, icon.output);

    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Error: ${icon.input} not found in /public/icons/`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize(icon.size, icon.size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(outputPath);

      console.log(`✅ Generated: ${icon.output} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${icon.output}:`, error.message);
    }
  }

  console.log("\n🎉 Icon generation complete!");
  console.log("\nNext steps:");
  console.log("1. Verify PNG icons in /public/icons/");
  console.log("2. Commit PNG icons to git");
  console.log("3. Deploy to Vercel");
  console.log("4. Test PWA install on production");
}

generateIcons().catch((error) => {
  console.error("❌ Icon generation failed:", error);
  process.exit(1);
});
