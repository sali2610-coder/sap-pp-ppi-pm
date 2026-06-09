import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteLogo } from "@/components/site-logo";
import { OmniSearch } from "@/components/omni-search";

export const metadata: Metadata = {
  title: "Project NEO Cockpit · CBC Israel",
  description:
    "מקור אמת יחיד למיגרציית SAP ECC ל-S/4HANA — ניהול סטטוס ומילון נתונים טכני (PM · PP-PI).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* ===== Header — brand bar + global Omni-Search (constant) ===== */}
        <header className="sticky top-0 z-50 border-b border-brand-dark bg-brand text-brand-foreground shadow-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="shrink-0">
              <SiteLogo />
            </Link>
            <div className="sm:flex sm:flex-1 sm:justify-center">
              <OmniSearch />
            </div>
            <nav className="hidden shrink-0 items-center gap-4 text-sm font-medium sm:flex">
              <Link href="/pm/" className="hover:underline">
                PM
              </Link>
              <Link href="/pp-pi/" className="hover:underline">
                PP-PI
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>

        {/* ===== Footer — mandatory development credit ===== */}
        <footer className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-muted-foreground">
            הערת פיתוח: האתר נבנה עבור המפתח ב-Web Coding, סאלי חליף. (Project NEO - CBC Israel)
          </div>
        </footer>
      </body>
    </html>
  );
}
