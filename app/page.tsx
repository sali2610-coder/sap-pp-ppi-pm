import type { Metadata } from "next";
import { ALL_TABLES } from "@/lib/data";
import { HomeHero } from "@/components/home-hero";

// Homepage — optimized for: SAP by Sali · Project NEO · SAP PP / PM / PP-PI ·
// SAP Architecture Explorer · SAP Learning Platform · Sali Halif. Natural copy,
// no keyword stuffing.
export const metadata: Metadata = {
  // absolute — the root page is in the same segment as the layout, so the
  // "SAP by Sali | %s" template does not auto-apply here; include the brand.
  title: { absolute: "SAP by Sali | Project NEO — SAP PP, PP-PI & PM Platform" },
  description:
    "Project NEO by Sali Halif — an interactive SAP knowledge platform for PP, PP-PI and PM: architecture explorer, table explorer, business processes and SAP learning resources.",
  openGraph: {
    title: "SAP by Sali | Project NEO — SAP PP, PP-PI & PM Platform",
    description:
      "Interactive SAP knowledge platform for PP, PP-PI and PM by Sali Halif — architecture explorer, table explorer, business processes and learning resources.",
  },
};
import { ExecutiveSummary } from "@/components/executive-summary";
import { CommandCenter } from "@/components/command-center";
import { QuickAccess } from "@/components/quick-access";
import { registryStats } from "@/lib/tx-registry";
import { FIORI_APPS } from "@/data/centers/fiori";
import { appCodes } from "@/lib/apps-intel";

export default function HomePage() {
  const tables = ALL_TABLES.length;
  const relations = ALL_TABLES.reduce((a, t) => a + (t.relations?.length || 0), 0);
  const tcodes = new Set(
    ALL_TABLES.flatMap((t) => (t.tcodes || "").split(/[^A-Za-z0-9_./]+/).filter((x) => x.length >= 3 && /^[A-Z]/i.test(x)))
  ).size;
  const bapis = new Set(ALL_TABLES.flatMap((t) => (t.funcs || []).map((f) => f[0]).filter(Boolean))).size;
  const txTotal = registryStats().total;

  return (
    <div className="space-y-10 sm:space-y-12">
      <HomeHero stats={{ modules: 2, tables, relations, tcodes, bapis, books: 2 }} />
      <QuickAccess counts={{ transactions: txTotal, apps: FIORI_APPS.length, apps2: appCodes().length, tables }} />
      <CommandCenter />
      <ExecutiveSummary />
    </div>
  );
}
