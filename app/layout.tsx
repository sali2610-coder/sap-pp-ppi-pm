import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { Analytics } from "@vercel/analytics/next";

const SITE = "https://sapbysali.app";
const AUTHOR = "Sali Halif";
const DESC =
  "Interactive SAP PP, PP-PI and PM knowledge platform including architecture explorer, table explorer, business processes, SAP learning resources and enterprise documentation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "SAP by Sali | Project NEO",
    template: "SAP by Sali | %s",
  },
  description: DESC,
  applicationName: "SAP by Sali",
  authors: [{ name: AUTHOR, url: SITE }],
  creator: AUTHOR,
  publisher: "SAP by Sali",
  keywords: ["SAP", "S/4HANA", "ECC", "PP", "PP-PI", "PM", "Architecture", "Table Explorer", "Business Processes", "Project NEO", "SAP by Sali", "Fiori", "CDS", "BAPI"],
  alternates: { canonical: SITE },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: "SAP by Sali",
    url: SITE,
    title: "SAP by Sali | Project NEO",
    description: DESC,
    locale: "he_IL",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SAP by Sali — Project NEO · Interactive SAP Knowledge Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP by Sali | Project NEO",
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
      name: "SAP by Sali",
      alternateName: "Project NEO",
      description: DESC,
      inLanguage: "he-IL",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "SAP by Sali",
      alternateName: "Project NEO — SAP Knowledge Platform",
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      founder: { "@type": "Person", name: AUTHOR, jobTitle: "Architecture & Development" },
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
