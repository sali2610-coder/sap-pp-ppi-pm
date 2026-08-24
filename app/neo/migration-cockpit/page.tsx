// Project NEO · /neo/migration-cockpit/ — what loads, in what order.
//
// 24 migration objects and their 56 ECC table references (49 distinct tables).
// The load sequence is DERIVED from the objects' own `dependsOn` edges by
// longest path — see components/neo-shell/s4/s4-data — so the order shown can
// never contradict the dependencies stored.
import "@/app/neo/ui.css";
import "@/app/neo/s4.css";
import { MigrationCockpit } from "@/components/neo-shell/s4/s4-view";
import { migTotals } from "@/components/neo-shell/s4/s4-data";

export function generateMetadata() {
  const t = migTotals();
  return {
    title: "קוקפיט מיגרציה · Project NEO",
    description: `${t.objects} אובייקטי הגירה, ${t.eccTables} טבלאות ECC, רצף טעינה מחושב, ${t.errors} דפוסי שגיאה ו-${t.checklist} צעדי ביצוע.`,
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <MigrationCockpit />;
}
