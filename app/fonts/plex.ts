/* Self-hosted OFL fonts (licences beside each family). Nothing loads from a remote host.
   Each family is split into a Hebrew and a Latin instance with its own unicode-range, so a
   page downloads only the subsets its text needs; CSS stacks them per character:
   font-family: var(--f-x-he), var(--f-x-lat), <system fallback>.
   next/font gives each instance a metric-matched Arial fallback face by default. On the
   Hebrew instances it would sit before the Latin face and catch every Latin letter, so
   it is switched off there; the Latin instance keeps it, last in the stack.
   next/font needs literal option values, hence the repeated ranges. */
import localFont from "next/font/local";

export const plexHe = localFont({
  src: [
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-400-normal.woff2", weight: "400" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-500-normal.woff2", weight: "500" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-600-normal.woff2", weight: "600" },
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-700-normal.woff2", weight: "700" },
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
    { path: "./plex-sans-hebrew/ibm-plex-sans-hebrew-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--f-plex-lat",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});

export const plexMono = localFont({
  src: [
    { path: "./plex-mono/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./plex-mono/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
    { path: "./plex-mono/ibm-plex-mono-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--f-plex-mono",
  display: "swap",
  preload: false,
});

export const frankHe = localFont({
  src: "./frank-ruhl-libre/frank-ruhl-libre-hebrew-wght-normal.woff2",
  weight: "300 900",
  variable: "--f-frank-he",
  adjustFontFallback: false,
  display: "swap",
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

export const assistantHe = localFont({
  src: "./assistant/assistant-hebrew-wght-normal.woff2",
  weight: "200 800",
  variable: "--f-assistant-he",
  adjustFontFallback: false,
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F" }],
});

export const assistantLat = localFont({
  src: "./assistant/assistant-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--f-assistant-lat",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});

export const jbMono = localFont({
  src: "./jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--f-jb-mono",
  display: "swap",
  preload: false,
});
