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
