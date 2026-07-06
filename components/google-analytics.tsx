"use client";

import Script from "next/script";

// GA4 loader — activates ONLY when a measurement id is provided (set
// NEXT_PUBLIC_GA_ID in Vercel). With no id the site loads no remote analytics,
// so the default build stays offline-clean. Inlined at build time for the
// static export.
export function GoogleAnalytics({ id }: { id?: string }) {
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
