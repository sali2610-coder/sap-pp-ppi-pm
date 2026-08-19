import type { Metadata } from "next";
import { NeoShell } from "@/components/neo-shell/neo-shell";
import { shellData } from "@/components/neo-shell/nav-data";
import { NeoDock } from "@/components/neo-shell/dock/neo-dock";
import { MotionProvider } from "@/components/neo-shell/motion/motion-provider";
// Imported here rather than by the dock component, so the two controls are
// styled on the very first paint of every NEO route instead of when the client
// bundle for the dock arrives.
import "./dock.css";
// The ground has to land before any surface paints, or the first frame is the
// old neutral canvas and the warmth arrives as a flash. Motion is imported
// after it because its selectors consume the scene tokens the ground defines.
import "./ground.css";
import "./motion.css";

// noindex is not optional here. scripts/gen-sitemap.mjs derives the sitemap from
// out/ rather than from a list, and its ONLY exclusion mechanism is a page
// declaring content="noindex" itself — so without this, every design-phase page
// would ship to Google and be pushed through scripts/indexnow-submit.mjs.
// scripts/check-sitemap.mjs then hard-fails on any indexable page missing from
// the sitemap, so the two have to agree.
export const metadata: Metadata = {
  title: "Project NEO · שלב עיצוב",
  description: "מעטפת האפליקציה והניווט של Project NEO: שלב 1.",
  robots: { index: false, follow: false },
};

// Server component: shellData() reads the SAP datasets at BUILD time and hands
// the client rail a small plain object. Importing lib/module-portal from a
// client component would pull the whole knowledge base into the browser bundle.
export default function NeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <NeoShell data={shellData()}>
      {children}
      {/* Both are siblings of the page, not part of it, so a route change never
          remounts them: the font panel survives navigation, and the motion
          level is re-published rather than re-initialised. */}
      <MotionProvider />
      <NeoDock />
    </NeoShell>
  );
}
