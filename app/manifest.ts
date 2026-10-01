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
    description: "מאגר ידע מקצועי בעברית ל-SAP PM ו-PP-PI: טבלאות, טרנזקציות, תהליכים עסקיים, ERD, ספרים והמעבר מ-ECC ל-S/4HANA.",
    // id stays "/" so an installed app keeps its identity; it opens in NEO.
    id: "/",
    start_url: "/neo/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#fbf8f1", // the NEO paper ground (art direction r3), so the splash matches the first paint
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
      // The canonical NEO addresses: the pre-NEO ones only redirect here.
      { name: "SAP Academy", short_name: "Academy", description: "קורסים ושיעורים מתוך ספרי SAP", url: "/neo/academy/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Architecture Studio", short_name: "Studio", description: "מפת הארכיטקטורה של המודולים", url: "/neo/studio/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "מרכז הידע", short_name: "ידע", description: "מושגים, מדריכים והסברים", url: "/neo/knowledge/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "טבלאות SAP", short_name: "טבלאות", description: "טבלאות SAP מתיעוד PM ו-PP-PI", url: "/neo/tables/", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
    ],
    // The current NEO, day and night, phone and wide (art direction r3). The
    // earlier shots of the previous design stay in public/screenshots/ unused.
    screenshots: [
      { src: "/screenshots/neo-phone-home-day.png", sizes: "1080x1920", type: "image/png", form_factor: "narrow", label: "מסך הבית · Project NEO" },
      { src: "/screenshots/neo-phone-tables-night.png", sizes: "1080x1920", type: "image/png", form_factor: "narrow", label: "טבלאות SAP · תצוגת לילה" },
      { src: "/screenshots/neo-phone-academy-day.png", sizes: "1080x1920", type: "image/png", form_factor: "narrow", label: "SAP Academy" },
      { src: "/screenshots/neo-wide-home-day.png", sizes: "1920x1080", type: "image/png", form_factor: "wide", label: "מסך הבית" },
      { src: "/screenshots/neo-wide-erd-night.png", sizes: "1920x1080", type: "image/png", form_factor: "wide", label: "מודל הנתונים · ERD · תצוגת לילה" },
      { src: "/screenshots/neo-wide-reader-day.png", sizes: "1920x1080", type: "image/png", form_factor: "wide", label: "קורא הספרים" },
    ],
  };
}
