// ui.css owns every control on this route (.nu-btn, .nu-btn2, .nu-ghost,
// .nu-filter, .nu-chip, .nu-card). Imported here rather than assumed: a CSS
// import is deduplicated by the bundler, so this is safe even once the shell
// layout pulls the same file in, and it means the ERD can never render its
// controls unstyled.
import "@/app/neo/ui.css";
import "@/app/neo/erd.css";
import { erdPayload } from "@/components/neo-shell/erd/erd-data";
import { ErdWorkspace } from "@/components/neo-shell/erd/erd-workspace";

export const metadata = {
  title: "מודל הנתונים · Project NEO",
  description: "תרשים ER אינטראקטיבי של מילון הטבלאות — PM ו־PP-PI, קשרים אמיתיים וניסוחי JOIN מקוריים.",
  robots: { index: false, follow: false },
};

// Server component. erdPayload() reads the SAP datasets and solves the dagre
// layout at BUILD time; the workspace receives finished coordinates and owns
// interaction only. Static export — no server runtime, no client layout engine.
export default function NeoErd() {
  return <ErdWorkspace data={erdPayload()} />;
}
