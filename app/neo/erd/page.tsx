// ui.css owns every control on this route (.nu-btn, .nu-btn2, .nu-ghost,
// .nu-filter, .nu-chip, .nu-card). Imported here rather than assumed: a CSS
// import is deduplicated by the bundler, so this is safe even once the shell
// layout pulls the same file in, and it means the ERD can never render its
// controls unstyled.
import "@/app/neo/ui.css";
import "@/app/neo/erd.css";
import { erdCatalog } from "@/components/neo-shell/erd/erd-catalog";
import { ErdWorkspace } from "@/components/neo-shell/erd/erd-workspace";

export const metadata = {
  title: "מודל הנתונים · Project NEO",
  description:
    "תרשים ER אינטראקטיבי של מודל הנתונים הארגוני: 13 מודולי SAP, קשרים אמיתיים, עוצמות מקוריות וניסוחי JOIN מהמילון.",
  robots: { index: false, follow: false },
};

// Server component. erdCatalog() reads public/sap-infrastructure/dataset.json
// plus the curated ERD membership in app/sap-infrastructure/meta.ts (read-only)
// and solves every dagre layout at BUILD time; the workspace receives finished
// coordinates and owns interaction only. Static export — no server runtime, no
// client layout engine.
export default function NeoErd() {
  return <ErdWorkspace data={erdCatalog()} />;
}
