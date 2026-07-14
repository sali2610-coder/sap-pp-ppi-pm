import type { Metadata } from "next";
import { ALL_TABLES } from "@/lib/data";
import { HomePortal, type ModuleCard } from "@/components/home-portal";
import { MobileHome } from "@/components/mobile-home";
import { LEARN_PATHS } from "@/data/learn/paths";
import { listFuncs } from "@/lib/object-intel";
import { listCdsViews } from "@/data/cds-map";

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
import { CommandCenter } from "@/components/command-center";
import { registryStats } from "@/lib/tx-registry";
import { FIORI_APPS } from "@/data/centers/fiori";

const fieldsOf = (arr: typeof ALL_TABLES) => arr.reduce((a, t) => a + (t.fields?.length || 0), 0);

export default function HomePage() {
  const pm = ALL_TABLES.filter((t) => t.module === "PM");
  const ppi = ALL_TABLES.filter((t) => t.module === "PP-PI");

  const counts = {
    tables: ALL_TABLES.length,
    fields: fieldsOf(ALL_TABLES),
    relations: ALL_TABLES.reduce((a, t) => a + (t.relations?.length || 0), 0),
    transactions: registryStats().total,
    bapis: listFuncs("BAPI").length,
    fms: listFuncs("FM").length,
    idocs: listFuncs("IDoc").length,
    cds: listCdsViews().length,
    fiori: FIORI_APPS.length,
    tcodes: 0,
  };

  const modules: ModuleCard[] = [
    { code: "PM", label: "אחזקה", he: "Plant Maintenance", href: "/pm/", tint: "#f97316", tables: pm.length, fields: fieldsOf(pm),
      desc: "ציוד, מיקומים פונקציונליים, הודעות ופקודות עבודה, אחזקה מונעת — ומיפוי ECC→S/4HANA." },
    { code: "PP-PI", label: "ייצור תהליכי", he: "Process Industries", href: "/pp-pi/", tint: "#6d28d9", tables: ppi.length, fields: fieldsOf(ppi),
      desc: "אב חומר, עצי מוצר, מתכוני ייצור, פקודות תהליך, מתכון בקרה וממשקי Zetes/Daymax." },
    { code: "DM", label: "מודל נתונים", he: "Cross-module data model", href: "/sap-infrastructure/", tint: "#2563eb", tables: ALL_TABLES.length, fields: fieldsOf(ALL_TABLES),
      desc: "מפת התשתית: אזורי מודל → מודולי SAP → אובייקטים, קשרים ותהליכים חוצי-מודול." },
  ];

  return (
    <>
      {/* Mobile + tablet get a purpose-built native app home; desktop keeps the portal. */}
      <MobileHome counts={counts} modules={modules} learnPaths={Object.values(LEARN_PATHS).map((p) => ({ id: p.id, he: p.he, accent: p.accent, total: p.steps.length }))} />
      <div className="space-y-12 max-xl:hidden sm:space-y-16">
        <HomePortal counts={counts} modules={modules} />
        <CommandCenter />
      </div>
    </>
  );
}
