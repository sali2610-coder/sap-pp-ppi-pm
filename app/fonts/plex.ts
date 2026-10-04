/* Self-hosted OFL font: IBM Plex Sans Hebrew and IBM Plex Mono (licence beside the files). Nothing loads from a remote host.
   One module per family on purpose: next/font preloads every preloadable face declared in a
   module that a route imports, so a shared module made each page download every family.
   Hebrew and Latin are separate instances with their own unicode-range; CSS stacks them per
   character: font-family: var(--f-x-he), var(--f-x-lat), <system fallback>. None of the three
   takes next/font's metric fallback face: the Hebrew one would catch Latin before the Latin
   face, the Latin one is sized from the font's average width rather than this UI's text, and
   the mono one is an Arial 16% wider than Plex Mono, so the counts in the catalogue filters
   re-wrapped the whole filter row when Plex arrived (gate 4, major 6: CLS 0.29 on
   /neo/transactions/ at 1440). app/neo/system.css declares the three fallback faces instead,
   measured against this UI's own text. next/font needs literal option values. */
import localFont from "next/font/local";

export const plexHe = localFont({
  src: [
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-400-normal.woff2", weight: "400" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-500-normal.woff2", weight: "500" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-600-normal.woff2", weight: "600" },
  ],
  variable: "--f-plex-he",
  adjustFontFallback: false,
  // optional, like plexLat below (16,796 bytes, preloaded already). With every
  // face 700ms late the home's lede at 390 still went from 3 lines to 4 when
  // this one swapped in over "NEO Hebrew Fallback" (CLS 0.10; 0.08 at 320): no
  // fallback metric fits mixed Hebrew and Latin text at every width.
  display: "optional",
  declarations: [{ prop: "unicode-range", value: "U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F" }],
});

export const plexLat = localFont({
  src: [
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-latin-400-normal.woff2", weight: "400" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-latin-500-normal.woff2", weight: "500" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--f-plex-lat",
  adjustFontFallback: false,
  // optional + preload (spec P1 §11, 2026-10-03). Under `swap` with no preload
  // (gate 9) a face that arrived late re-wrapped a line: the home's lede at 390
  // moved 0.28 to 0.29 with a 700ms font delay, and the 300ms gate that hid the
  // page content while it waited could not prevent it. Now the face is fetched
  // with the page and used if it is there within the block period; otherwise
  // "NEO Latin Fallback" (app/neo/system.css) stays for the life of the page and
  // nothing moves when the face lands. 60,472 bytes on a first visit, cached
  // after; the Slow-4G cost against the no-preload variant is measured in
  // docs/rollout-2026-10/STATUS.md.
  display: "optional",
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});

export const plexMono = localFont({
  src: [
    { path: "./plex-mono/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./plex-mono/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
    { path: "./plex-mono/ibm-plex-mono-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--f-plex-mono",
  adjustFontFallback: false,
  // optional + preload, for the same reason as plexLat (45,216 bytes).
  display: "optional",
});
