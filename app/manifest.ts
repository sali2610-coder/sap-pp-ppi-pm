import type { MetadataRoute } from "next";

// PWA manifest — installable, standalone, branded. Static (offline-safe).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAP by Sali · Project NEO Cockpit",
    short_name: "SAP by Sali",
    description: "SAP ECC → S/4HANA migration command center — Live Architecture Studio, data dictionary & status cockpit for PM & PP-PI.",
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
