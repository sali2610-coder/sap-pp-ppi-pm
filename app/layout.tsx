import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { Analytics } from "@vercel/analytics/next";

const SITE = "https://sapbysali.app";
const DESC =
  "SAP by Sali · Project NEO — a single source of truth for SAP ECC → S/4HANA migration. Live Architecture Studio, technical data dictionary, status cockpit for PM & PP-PI. 100% offline · RTL.";
const DESC_HE =
  "מקור אמת יחיד למיגרציית SAP ECC ל-S/4HANA — סטודיו ארכיטקטורה חי, מילון נתונים טכני וקוקפיט סטטוס ל-PM ו-PP-PI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "SAP by Sali | Project NEO Cockpit",
    template: "SAP by Sali | %s",
  },
  description: DESC,
  applicationName: "SAP by Sali",
  authors: [{ name: "Sali Khalif" }],
  creator: "Sali Khalif",
  publisher: "CBC Israel",
  keywords: ["SAP", "S/4HANA", "ECC", "PP-PI", "PM", "Architecture", "Migration", "Project NEO", "CBC Israel", "Fiori", "CDS", "BAPI"],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: "SAP by Sali · Project NEO",
    url: SITE,
    title: "SAP by Sali | Project NEO Cockpit",
    description: DESC_HE,
    locale: "he_IL",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SAP by Sali — Project NEO · SAP Architecture Command Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP by Sali | Project NEO Cockpit",
    description: DESC,
    images: ["/og.png"],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "SAP by Sali" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#d62027",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "SAP by Sali · Project NEO",
      description: DESC,
      inLanguage: "he-IL",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "Project NEO — CBC Israel",
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      founder: { "@type": "Person", name: "Sali Khalif", jobTitle: "Web Coding · Architecture & Development" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body className="flex min-h-full flex-col">
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
