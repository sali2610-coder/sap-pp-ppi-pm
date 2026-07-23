import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { SWRegister } from "@/components/sw-register";

const GSC = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const BING = process.env.NEXT_PUBLIC_BING_VERIFICATION;

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
  // relative "./" → Next resolves canonical against EACH page's own URL (not the
  // root), so every page self-canonicalizes. Pages that set their own canonical override.
  alternates: { canonical: "./" },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: "SAP by Sali",
    url: "./",
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
  // Search-engine ownership verification (HTML-tag method). Set the tokens in
  // Vercel env: NEXT_PUBLIC_GSC_VERIFICATION (Google) / NEXT_PUBLIC_BING_VERIFICATION (Bing).
  verification: {
    ...(GSC ? { google: GSC } : {}),
    ...(BING ? { other: { "msvalidate.01": BING } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#d62027",
  width: "device-width",
  initialScale: 1,
  // viewport-fit=cover draws edge-to-edge behind the notch / gesture bar AND
  // activates env(safe-area-inset-*). The shell/tab-bar/FAB already pad with those
  // insets, but without cover they resolve to 0 (no-op) on real devices.
  viewportFit: "cover",
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
      alternateName: ["Project NEO", "sapbysali"],
      description: DESC,
      inLanguage: ["he-IL", "en"],
      publisher: { "@id": `${SITE}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "SAP by Sali",
      alternateName: "Project NEO — SAP Knowledge Platform",
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      founder: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: AUTHOR,
      url: SITE,
      jobTitle: "SAP Architecture & Development",
      knowsAbout: ["SAP PP", "SAP PP-PI", "SAP PM", "SAP S/4HANA", "SAP Architecture", "SAP Fiori"],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE}/#app`,
      name: "Project NEO — SAP by Sali",
      url: SITE,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      inLanguage: ["he-IL", "en"],
      description: DESC,
      author: { "@id": `${SITE}/#person` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: ["SAP Architecture Explorer", "Table Explorer", "Business Processes", "SAP PP / PP-PI / PM", "SAP Learning Resources"],
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
        <SWRegister />
      </body>
    </html>
  );
}
