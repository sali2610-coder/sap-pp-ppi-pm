/* Self-hosted OFL font: Frank Ruhl Libre (display titles on gateway and reading screens) (licence beside the files). Nothing loads from a remote host.
   One module per family on purpose: next/font preloads every preloadable face declared in a
   module that a route imports, so a shared module made each page download every family.
   Hebrew and Latin are separate instances with their own unicode-range; CSS stacks them per
   character: font-family: var(--f-x-he), var(--f-x-lat), <system fallback>. The Hebrew
   instance has no metric fallback face (it would catch Latin before the Latin face); the Latin
   instance keeps it, last in the stack. next/font needs literal option values. */
import localFont from "next/font/local";

// Not preloaded, "swap" (gate 9, majors 1 and 2). Preloaded, the face's two
// files (63 KB) rode on every NEO route although only the display titles paint
// it (531 of 3,225 pages), and they came before the stylesheets on a slow link.
// Now the browser fetches it only where a title uses it. Until it arrives the
// title is set in "NEO Display … Fallback" (app/neo/system.css): Times New
// Roman Bold sized to this face's widths, measured over the 443 display titles
// in the export (Hebrew 102.78%, Latin 103.68%), so the swap does not re-wrap a
// line. The previous "swap" without that fallback fell back to Plex, much wider,
// and moved the phone home title (CLS 0.11).
export const frankHe = localFont({
  src: "./frank-ruhl-libre/frank-ruhl-libre-hebrew-wght-normal.woff2",
  weight: "300 900",
  variable: "--f-frank-he",
  adjustFontFallback: false,
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F" }],
});

export const frankLat = localFont({
  src: "./frank-ruhl-libre/frank-ruhl-libre-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--f-frank-lat",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});
