import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Project NEO Cockpit · CBC Israel",
  description:
    "מקור אמת יחיד למיגרציית SAP ECC ל-S/4HANA — ניהול סטטוס ומילון נתונים טכני (PM · PP-PI).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
