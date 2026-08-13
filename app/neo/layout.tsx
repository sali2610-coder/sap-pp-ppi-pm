import type { Metadata } from "next";
import { NeoShell } from "@/components/neo-shell/neo-shell";
import { shellData } from "@/components/neo-shell/nav-data";

// noindex is not optional here. scripts/gen-sitemap.mjs derives the sitemap from
// out/ rather than from a list, and its ONLY exclusion mechanism is a page
// declaring content="noindex" itself — so without this, every design-phase page
// would ship to Google and be pushed through scripts/indexnow-submit.mjs.
// scripts/check-sitemap.mjs then hard-fails on any indexable page missing from
// the sitemap, so the two have to agree.
export const metadata: Metadata = {
  title: "Project NEO · שלב עיצוב",
  description: "מעטפת האפליקציה והניווט של Project NEO — שלב 1.",
  robots: { index: false, follow: false },
};

// Server component: shellData() reads the SAP datasets at BUILD time and hands
// the client rail a small plain object. Importing lib/module-portal from a
// client component would pull the whole knowledge base into the browser bundle.
export default function NeoLayout({ children }: { children: React.ReactNode }) {
  return <NeoShell data={shellData()}>{children}</NeoShell>;
}
