/* Self-hosted OFL font: Frank Ruhl Libre (display titles on gateway and reading screens) (licence beside the files). Nothing loads from a remote host.
   One module per family on purpose: next/font preloads every preloadable face declared in a
   module that a route imports, so a shared module made each page download every family.
   Hebrew and Latin are separate instances with their own unicode-range; CSS stacks them per
   character: font-family: var(--f-x-he), var(--f-x-lat), <system fallback>. The Hebrew
   instance has no metric fallback face (it would catch Latin before the Latin face); the Latin
   instance keeps it, last in the stack. next/font needs literal option values. */
import localFont from "next/font/local";

// Preloaded and "optional". Gate 3, minor 29 had turned the preload off: the
// shell imports this module on every NEO route, so /neo/tables/, AFKO, IW31 and
// the ERD download the face without painting it. Without the preload the face
// came late: with "swap" it re-wrapped the phone home title from two lines to
// one (CLS 0.11 on /neo/ at 390px, CPU x4, 1.6 Mbps; production 0.001), and
// with "optional" it missed first paint even on a fast desktop, so the gateway
// titles lost the display face. Preloaded, it is ready at first paint;
// "optional" guarantees that a late arrival never moves the page. The cost is
// the one small file on the routes that do not paint it.
export const frankHe = localFont({
  src: "./frank-ruhl-libre/frank-ruhl-libre-hebrew-wght-normal.woff2",
  weight: "300 900",
  variable: "--f-frank-he",
  adjustFontFallback: false,
  display: "optional",
  preload: true,
  declarations: [{ prop: "unicode-range", value: "U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F" }],
});

export const frankLat = localFont({
  src: "./frank-ruhl-libre/frank-ruhl-libre-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--f-frank-lat",
  display: "optional",
  preload: true,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});
