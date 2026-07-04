import type { MetadataRoute } from "next";

// PWA manifest — installable, standalone, branded. Static (offline-safe).
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
    orientation: "any",
    background_color: "#0b1220",
    theme_color: "#d62027",
    lang: "he",
    dir: "rtl",
    categories: ["business", "productivity", "education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
