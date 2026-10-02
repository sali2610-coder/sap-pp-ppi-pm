import Link from "next/link";

/* The one footer of every NEO page, on every device, rendered by the shell at
   the end of the canvas: the mandatory credit (the owner's own wording, kept
   verbatim) and the three legal documents. It replaces the nine per-surface
   credit lines and the phone-only credit bar, which the phone hid on eight
   surfaces and the rail's hidden and peek states never showed
   (docs/redesign-2026-09/LEGAL-READINESS.md, A9). */
export function SiteFooter() {
  return (
    <footer className="nx-foot">
      <p className="nx-foot-credit">Project NEO של CBC Israel. פותח על ידי סאלי חליף, Web Coding.</p>
      <nav className="nx-foot-legal" aria-label="מסמכים משפטיים">
        <Link href="/neo/privacy/" prefetch={false}>מדיניות פרטיות</Link>
        <Link href="/neo/terms/" prefetch={false}>תנאי שימוש</Link>
        <Link href="/neo/accessibility/" prefetch={false}>הצהרת נגישות</Link>
      </nav>
    </footer>
  );
}
