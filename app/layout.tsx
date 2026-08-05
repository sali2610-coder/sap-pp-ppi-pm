import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DEVICE_DETECT_SOURCE } from "@/lib/device";
import { AppShell } from "@/components/app-shell";
import { SWRegister } from "@/components/sw-register";
import { THEME_BOOT } from "@/lib/theme-boot";

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
        {/* Device class, decided BEFORE first paint so the shell never flashes the
            wrong layout. Desktop-first: a desktop OS always gets the desktop UI,
            whatever the monitor size, resolution, OS scaling or browser zoom. */}
        <script dangerouslySetInnerHTML={{ __html:
          `try{performance.mark("neo:html-head")}catch(e){};` +
          // Theme before paint, for the same reason as the device class below:
          // applying it in an effect paints light first, then flashes to dark.
          THEME_BOOT +
          `document.documentElement.dataset.device=${DEVICE_DETECT_SOURCE};` +
          `try{performance.mark("neo:device-detected");` +
          `document.addEventListener("DOMContentLoaded",function(){try{performance.mark("neo:dom-ready")}catch(e){}});` +
          `window.addEventListener("load",function(){try{performance.mark("neo:window-load")}catch(e){}});}catch(e){}` +
          // window.__neoTimeline(enteredAt?) — prints the full startup timeline for
          // THIS page. Built to be run from the console inside the corporate browser,
          // where no tooling can be installed. Pass the wall-clock moment you pressed
          // Enter ("HH:MM:SS") to expose the time spent BEFORE the navigation started —
          // proxy decision, quota, isolation container startup — which the Navigation
          // Timing API cannot see, because it defines navigationStart as 0.
          `window.__neoTimeline=function(enteredAt){` +
          `var n=performance.getEntriesByType("navigation")[0]||{};` +
          `var P=function(k){var e=performance.getEntriesByType("paint").find(function(p){return p.name===k});return e?Math.round(e.startTime):null};` +
          `var M=function(k){var m=performance.getEntriesByType("mark").filter(function(x){return x.name===k});return m.length?Math.round(m[0].startTime):null};` +
          `var L=null;try{var l=performance.getEntriesByType("largest-contentful-paint");if(l.length)L=Math.round(l[l.length-1].startTime)}catch(e){}` +
          `var r=[["Navigation Start",0],["DNS",Math.round(n.domainLookupEnd-n.domainLookupStart)],` +
          `["TCP connect",Math.round(n.connectEnd-n.connectStart)],` +
          `["TLS",n.secureConnectionStart?Math.round(n.connectEnd-n.secureConnectionStart):0],` +
          `["Request Start",Math.round(n.requestStart)],["TTFB",Math.round(n.responseStart-n.requestStart)],` +
          `["HTML Received",Math.round(n.responseEnd)],["First Paint",P("first-paint")],` +
          `["First Contentful Paint",P("first-contentful-paint")],["Largest Contentful Paint",L],` +
          `["React shell render",M("neo:shell-render")],["React hydration complete",M("neo:shell-hydrated")],` +
          `["First interactive",M("neo:first-interaction")],["Total to load event",Math.round(n.loadEventEnd)]];` +
          `var out=r.map(function(x){return String(x[0]).padEnd(30)+": "+(x[1]==null?"n/a":x[1]+" ms")}).join("\\n");` +
          `var o=performance.timeOrigin;` +
          `out+="\\nnavigation started at".padEnd(31)+": "+new Date(o).toLocaleTimeString("en-GB",{hour12:false});` +
          `if(enteredAt){var m=String(enteredAt).match(/^(\\d{1,2}):(\\d{2}):(\\d{2})$/);` +
          `if(m){var d=new Date(o);d.setHours(+m[1],+m[2],+m[3],0);var gap=o-d.getTime();` +
          `var usable=M("neo:shell-hydrated")||Math.round(n.loadEventEnd)||0;` +
          `out+="\\n"+"BEFORE navigation (proxy/isolation)".padEnd(30)+": "+Math.round(gap)+" ms";` +
          `out+="\\n"+"TOTAL Enter -> usable".padEnd(30)+": "+Math.round(gap+usable)+" ms";` +
          `out+="\\n"+"  application share".padEnd(30)+": "+usable+" ms ("+Math.round(usable/(gap+usable)*100)+"%)";` +
          `out+="\\n"+"  delivery-path share".padEnd(30)+": "+Math.round(gap)+" ms ("+Math.round(gap/(gap+usable)*100)+"%)";}}` +
          `console.log(out);try{copy(out)}catch(e){}return out;};`
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body className="flex min-h-full flex-col">
        <AppShell>{children}</AppShell>
        <SWRegister />
      </body>
    </html>
  );
}
