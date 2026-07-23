// Generate Google Play graphic assets from vectors (crisp, on-brand).
//  - feature-graphic.png  1024x500  (required Play listing banner)
//  - play-icon-512.png    512x512   full-bleed square (Play applies its own mask)
// Output: docs/play-store/  (NOT public/ — these are store-upload assets, not
// served by the web app). Run: node scripts/gen-play-assets.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "play-store");
mkdirSync(OUT, { recursive: true });

const markWhite = `
  <g stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none">
    <line x1="33" y1="37" x2="67" y2="35"/><line x1="33" y1="37" x2="50" y2="68"/><line x1="67" y1="35" x2="50" y2="68"/>
  </g>
  <g fill="#fff"><circle cx="33" cy="37" r="8"/><circle cx="67" cy="35" r="8"/><circle cx="50" cy="68" r="10.5"/></g>`;

const feature = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">
  <defs>
    <radialGradient id="g" cx="22%" cy="12%" r="120%">
      <stop offset="0%" stop-color="#e23b41"/><stop offset="48%" stop-color="#d62027"/><stop offset="100%" stop-color="#8f1418"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="500" fill="url(#g)"/>
  <g opacity="0.08" stroke="#fff" stroke-width="2" fill="none">
    <circle cx="880" cy="90" r="60"/><circle cx="960" cy="360" r="90"/><line x1="820" y1="120" x2="920" y2="300"/>
  </g>
  <g transform="translate(96 168) scale(1.64)">${markWhite}</g>
  <text x="300" y="228" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800" fill="#ffffff" letter-spacing="-1">SAP by Sali</text>
  <text x="300" y="286" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff" opacity="0.85" letter-spacing="4">PROJECT NEO</text>
  <text x="302" y="342" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff" opacity="0.92" text-anchor="start">אחזקה · ייצור · PP-PI · מעבר ל-S/4HANA</text>
</svg>`;

// full-bleed square icon (no rounded corners — Play masks it itself)
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs><radialGradient id="g" cx="30%" cy="18%" r="130%">
    <stop offset="0%" stop-color="#e23b41"/><stop offset="46%" stop-color="#d62027"/><stop offset="100%" stop-color="#a3171c"/>
  </radialGradient></defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <g transform="translate(128 128) scale(2.56)">${markWhite}</g>
</svg>`;

await sharp(Buffer.from(feature)).png().toFile(join(OUT, "feature-graphic.png"));
await sharp(Buffer.from(playIcon)).png().toFile(join(OUT, "play-icon-512.png"));
console.log("generated: feature-graphic.png (1024x500), play-icon-512.png (512x512)");
