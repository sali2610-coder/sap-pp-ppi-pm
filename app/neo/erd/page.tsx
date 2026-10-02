// ui.css owns every control on this route (.nu-btn, .nu-btn2, .nu-ghost,
// .nu-filter, .nu-chip, .nu-card). Imported here rather than assumed: a CSS
// import is deduplicated by the bundler, so this is safe even once the shell
// layout pulls the same file in, and it means the ERD can never render its
// controls unstyled.
import "@/app/neo/ui.css";
import "@/app/neo/erd.css";
import { erdCatalog } from "@/components/neo-shell/erd/erd-catalog";
import { MODULE_ORDER } from "@/components/neo-shell/erd/erd-types";
import { ErdWorkspace } from "@/components/neo-shell/erd/erd-workspace";

export const metadata = {
  title: "מודל הנתונים · Project NEO",
  // The module count is derived, never authored: the page once said "13" while
  // the catalog rendered 15.
  description: `תרשים ERD אינטראקטיבי של מודל הנתונים: ${MODULE_ORDER.length} מודולי SAP, קשרי טבלאות, קרדינליות ותנאי JOIN מתיעוד הפרויקט.`,
  robots: { index: false, follow: false },
};

// Server component. erdCatalog() reads public/sap-infrastructure/dataset.json
// plus the curated ERD membership in app/sap-infrastructure/meta.ts (read-only)
// and solves every dagre layout at BUILD time; the workspace receives finished
// coordinates and owns interaction only. Static export — no server runtime, no
// client layout engine.
// A deep link (#AUFK) is applied only after hydration, so the bar, the filters
// and the inspector first paint in the overview state and flip at ~170ms: a
// layout shift (CLS 0.025 at 1440, 0.031 at 834; motion QA, 2026-10-02). The
// hash is known before the first paint, so this marks <html> while it is
// pending; editorial.css keeps those regions invisible until the workspace has
// applied it (or 1.5s pass), and an invisible region's move is not a shift.
const ERD_PENDING = `(function(){try{if(location.hash.length<2)return;var d=document.documentElement;d.setAttribute("data-erd-pending","");var done=function(){d.removeAttribute("data-erd-pending")};var t=setTimeout(done,1500);var mo=new MutationObserver(function(){var n=document.querySelector(".ne");if(n&&(n.getAttribute("data-sel")==="1"||n.getAttribute("data-level")!=="overview")){clearTimeout(t);mo.disconnect();requestAnimationFrame(function(){requestAnimationFrame(done)})}});mo.observe(d,{subtree:true,attributes:true,attributeFilter:["data-sel","data-level"]})}catch(e){}})();`;

export default function NeoErd() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ERD_PENDING }} />
      <ErdWorkspace data={erdCatalog()} />
    </>
  );
}
