import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteLogo } from "@/components/site-logo";
import { OmniSearch } from "@/components/omni-search";
import { CommandPalette } from "@/components/command-palette";
import { UXSettings } from "@/components/ux-settings";

export const metadata: Metadata = {
  title: "Project NEO Cockpit · CBC Israel",
  description:
    "מקור אמת יחיד למיגרציית SAP ECC ל-S/4HANA — ניהול סטטוס ומילון נתונים טכני (PM · PP-PI).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* ===== Header — gradient brand bar + Spotlight trigger ===== */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-l from-brand-dark via-brand to-brand text-brand-foreground shadow-lg shadow-brand/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02]">
              <SiteLogo />
            </Link>
            <div className="sm:flex sm:flex-1 sm:justify-center">
              <OmniSearch />
            </div>
            <nav className="hidden shrink-0 items-center gap-1 text-sm font-medium sm:flex">
              <Link href="/pm/" className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/15">
                PM
              </Link>
              <Link href="/pp-pi/" className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/15">
                PP-PI
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">{children}</main>

        {/* ===== Footer — mandatory development credit, glass ===== */}
        <footer className="glass mt-6 border-x-0 border-b-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-start">
            <p className="text-sm text-muted-foreground">
              הערת פיתוח: האתר נבנה עבור המפתח ב-
              <span className="font-semibold text-foreground">Web Coding</span>, סאלי חליף.
              <span className="text-muted-foreground/70"> (Project NEO · CBC Israel)</span>
            </p>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-status-done" />
              100% Offline · Static Export
            </span>
          </div>
        </footer>

        {/* Global overlays */}
        <CommandPalette />
        <UXSettings />
      </body>
    </html>
  );
}
