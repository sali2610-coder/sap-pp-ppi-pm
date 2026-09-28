/* Self-hosted OFL font: JetBrains Mono (Atlas direction board only) (licence beside the files). Nothing loads from a remote host.
   One module per family on purpose: next/font preloads every preloadable face declared in a
   module that a route imports, so a shared module made each page download every family.
   Hebrew and Latin are separate instances with their own unicode-range; CSS stacks them per
   character: font-family: var(--f-x-he), var(--f-x-lat), <system fallback>. The Hebrew
   instance has no metric fallback face (it would catch Latin before the Latin face); the Latin
   instance keeps it, last in the stack. next/font needs literal option values. */
import localFont from "next/font/local";

export const jbMono = localFont({
  src: "./jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--f-jb-mono",
  display: "swap",
  preload: false,
});
