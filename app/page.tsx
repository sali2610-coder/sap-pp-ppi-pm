import { ALL_TABLES } from "@/lib/data";
import { HubCards } from "@/components/hub-cards";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* hero */}
      <section className="space-y-4 pt-6 text-center animate-float-in">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          CBC Israel · Project NEO
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Project NEO Cockpit</h1>
        <p className="mx-auto max-w-2xl text-balance text-muted-foreground sm:text-lg">
          מקור אמת יחיד למיגרציית <span className="font-semibold text-foreground">SAP ECC ➔ S/4HANA</span> —
          ניהול סטטוס מיגרציה ומילון נתונים טכני, במקום אחד, 100% Offline.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{ALL_TABLES.length} טבלאות</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">2 מודולים · PM · PP-PI</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">⌘K חיפוש מהיר</span>
        </div>
      </section>

      <HubCards />
    </div>
  );
}
