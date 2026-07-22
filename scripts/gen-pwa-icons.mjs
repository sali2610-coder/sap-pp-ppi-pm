// Generate the full PWA / Android icon set from a single vector master, so every
// size is pixel-crisp (no upscaling) and visually identical to the shipped icon:
// the NEO network mark (3 nodes + triangle edges) in white on a red radial-gradient
// tile. Produces: any (rounded), maskable (full-bleed, safe-zone), monochrome.
// Run: node scripts/gen-pwa-icons.mjs   (requires sharp — already a dep)
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

// The mark in a 100x100 coordinate space (matches components/site-logo.tsx).
const mark = (stroke = "#fff", fill = "#fff", sw = 6) => `
  <g stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" fill="none">
    <line x1="33" y1="37" x2="67" y2="35"/><line x1="33" y1="37" x2="50" y2="68"/><line x1="67" y1="35" x2="50" y2="68"/>
  </g>
  <g fill="${fill}"><circle cx="33" cy="37" r="8"/><circle cx="67" cy="35" r="8"/><circle cx="50" cy="68" r="10.5"/></g>`;

// full-bleed red tile with the mark centred + scaled by `k` (fraction of tile).
const redTile = (S, k, rounded) => {
  const inner = S * k, off = (S - inner) / 2, s = inner / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <defs>
      <radialGradient id="g" cx="30%" cy="18%" r="130%">
        <stop offset="0%" stop-color="#e23b41"/><stop offset="46%" stop-color="#d62027"/><stop offset="100%" stop-color="#a3171c"/>
      </radialGradient>
      <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="42%" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${S}" height="${S}" rx="${rounded ? S * 0.22 : 0}" fill="url(#g)"/>
    <rect x="0" y="0" width="${S}" height="${S}" rx="${rounded ? S * 0.22 : 0}" fill="url(#gloss)"/>
    <g transform="translate(${off} ${off}) scale(${s})">${mark("#fff", "#fff", 6)}</g>
  </svg>`;
};

// monochrome: solid mark on transparent (OS tints it). Bold so it reads at 24px.
const mono = (S) => {
  const k = 0.7, inner = S * k, off = (S - inner) / 2, s = inner / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <g transform="translate(${off} ${off}) scale(${s})">${mark("#000", "#000", 8)}</g></svg>`;
};

const png = (svg, file) => sharp(Buffer.from(svg)).png().toFile(join(OUT, file));

const jobs = [
  // "any" — rounded tile, mark at ~0.5 (matches current icon framing)
  ...[192, 256, 384, 512, 1024].map((s) => [redTile(s, 0.5, true), `icon-${s}.png`]),
  // maskable — full-bleed (no radius; OS masks), mark inside the 80% safe zone (k≈0.46)
  [redTile(192, 0.46, false), "icon-192-maskable.png"],
  [redTile(512, 0.46, false), "icon-512-maskable.png"],
  // monochrome — for notification / monochrome contexts
  [mono(512), "icon-monochrome.png"],
];

await Promise.all(jobs.map(([svg, f]) => png(svg, f)));
console.log(`generated ${jobs.length} icons:`, jobs.map(([, f]) => f).join(", "));
