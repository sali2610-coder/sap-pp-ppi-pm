import type { Metadata } from "next";
import { NeoShell } from "@/components/neo-shell/neo-shell";
import { shellData } from "@/components/neo-shell/nav-data";
import { NeoDock } from "@/components/neo-shell/dock/neo-dock";
import { MotionProvider } from "@/components/neo-shell/motion/motion-provider";
import { PILOT_ROUTES } from "@/components/neo-shell/pilot";
// Imported here rather than by the dock component, so the two controls are
// styled on the very first paint of every NEO route instead of when the client
// bundle for the dock arrives.
import "./dock.css";
// The ground has to land before any surface paints, or the first frame is the
// old neutral canvas and the warmth arrives as a flash. Motion is imported
// after it because its selectors consume the scene tokens the ground defines.
import "./ground.css";
import "./motion.css";
// The 2026 design system re-values the tokens every NEO stylesheet reads; it has to
// come after the ground and motion layers so its values win.
import "./system.css";
// The pilot of the art direction that passed the blind judging (Editorial
// Technology, docs/redesign-2026-09/DESIGN-SPEC-EDITORIAL.md). Scoped to the
// five pilot routes by [data-pilot="editorial"] on .nx-app; last, so it wins.
import "./editorial.css";

// noindex is not optional here. scripts/gen-sitemap.mjs derives the sitemap from
// out/ rather than from a list, and its ONLY exclusion mechanism is a page
// declaring content="noindex" itself — so without this, every design-phase page
// would ship to Google and be pushed through scripts/indexnow-submit.mjs.
// scripts/check-sitemap.mjs then hard-fails on any indexable page missing from
// the sitemap, so the two have to agree.
export const metadata: Metadata = {
  title: "Project NEO",
  description: "Project NEO: קוקפיט המעבר מ-SAP ECC ל-S/4HANA ותיעוד טכני למודולי PM ו-PP-PI.",
  robots: { index: false, follow: false },
};

// The Latin and mono faces of Plex are not preloaded (app/fonts/plex.ts, gate
// 9), and their calibrated fallbacks are close to them but not equal: at some
// widths a run of SAP codes or an English title takes one line more or less in
// the fallback, and the page below moves when the face arrives (the home's lede
// at 320 to 670, the reader's crumb row at 1024, the catalogue's filter row at
// 834 and 1024; motion QA rounds 3 to 5). On the pilot routes the page content
// waits for those faces, at most 300ms, while the shell is painted; from the
// browser's cache they load in 23 to 96ms (motion QA round 6). It runs here,
// before the shell, so after the stylesheets that declare the faces and before
// any page content is parsed. Only on the pilot: elsewhere it fetched the Latin
// display face a page did not use (44KB) and held nothing (R6-3).
const FONT_GATE = `(function(){try{var f=document.fonts;if(!f||!${PILOT_ROUTES}.test(location.pathname))return;var q=["400 1em plexLat","500 1em plexLat","600 1em plexLat","400 1em plexMono","500 1em plexMono","600 1em plexMono","400 1em frankLat"];if(q.every(function(x){return f.check(x,"PM")}))return;var d=document.documentElement;d.setAttribute("data-neo-fonts","");var done=function(){d.removeAttribute("data-neo-fonts")};var t=setTimeout(done,300);Promise.all(q.map(function(x){return f.load(x,"PM")})).then(function(){clearTimeout(t);requestAnimationFrame(done)},done)}catch(e){}})();`;

// Server component: shellData() reads the SAP datasets at BUILD time and hands
// the client rail a small plain object. Importing lib/module-portal from a
// client component would pull the whole knowledge base into the browser bundle.
export default function NeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: FONT_GATE }} />
      <NeoShell data={shellData()}>
        {children}
        {/* Both are siblings of the page, not part of it, so a route change never
            remounts them: the font panel survives navigation, and the motion
            level is re-published rather than re-initialised. */}
        <MotionProvider />
        <NeoDock />
      </NeoShell>
    </>
  );
}
