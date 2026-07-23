import type { MetadataRoute } from "next";

// PWA manifest — installable, standalone, branded. Static (offline-safe).
// Drives Add-to-Home-Screen, the Android install prompt, the TWA splash, and the
// richer install UI (screenshots + shortcuts). background_color is LIGHT to match
// the app shell so the splash doesn't flash a dark panel before the UI paints.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAP by Sali · Project NEO",
    short_name: "SAP by Sali",
    description: "Interactive SAP PP, PP-PI and PM knowledge platform — architecture explorer, table explorer, business processes, learning resources and enterprise documentation.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#fcfcfd",
    theme_color: "#d62027",
    lang: "he",
    dir: "rtl",
    categories: ["business", "productivity", "education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-256.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/icon-384.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-1024.png", sizes: "1024x1024", type: "image/png", purpose: "any" },
      { src: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-monochrome.png", sizes: "512x512", type: "image/png", purpose: "monochrome" },
    ],
    shortcuts: [
      { name: "SAP Academy", short_name: "Academy", description: "מסלולי לימוד מובנים ל-SAP", url: "/academy/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Architecture Studio", short_name: "Studio", description: "מפת קשרים אינטראקטיבית", url: "/studio/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "מרכז הידע", short_name: "Knowledge", description: "כל מרכזי הידע והעיון", url: "/knowledge/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "חוקר טבלאות", short_name: "Tables", description: "כל טבלאות ה-SAP בהיקף", url: "/tables/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
    ],
    screenshots: [
      { src: "/screenshots/phone-home.png", sizes: "1080x1920", type: "image/png", form_factor: "narrow", label: "מסך הבית — קוקפיט NEO" },
      { src: "/screenshots/phone-knowledge.png", sizes: "1080x1920", type: "image/png", form_factor: "narrow", label: "מרכז הידע" },
      { src: "/screenshots/phone-academy.png", sizes: "1080x1920", type: "image/png", form_factor: "narrow", label: "SAP Academy" },
      { src: "/screenshots/wide-studio.png", sizes: "1920x1080", type: "image/png", form_factor: "wide", label: "Architecture Studio" },
      { src: "/screenshots/wide-tables.png", sizes: "1920x1080", type: "image/png", form_factor: "wide", label: "חוקר טבלאות" },
    ],
  };
}
