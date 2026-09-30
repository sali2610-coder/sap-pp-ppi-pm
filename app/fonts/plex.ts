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
  display: "swap",
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
  display: "swap",
  // Not preloaded (gate 9, P2): 60,472 bytes that competed with the render-
  // blocking CSS on every page. The faces are still requested at the first
  // render, and until they arrive "NEO Latin Fallback" (app/neo/system.css,
  // calibrated to this UI's text) holds the same metrics.
  preload: false,
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
  display: "swap",
  preload: false,
});
