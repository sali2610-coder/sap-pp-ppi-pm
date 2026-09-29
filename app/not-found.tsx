import Link from "next/link";
import { BookOpen, Home, Table2, Terminal } from "lucide-react";
import { plexHe, plexLat, plexMono } from "@/app/fonts/plex";
import { SiteFooter } from "@/components/neo-shell/site-footer";
// The NEO look outside the NEO shell: the ground (and this page's own frame,
// §404 in ground.css), then the 2026 tokens, which must come after it, the
// controls, and the footer's rules (rail.css). Every rule in them is scoped to
// .nx-app, so nothing reaches another route.
import "@/app/neo/ground.css";
import "@/app/neo/system.css";
import "@/app/neo/ui.css";
import "@/app/neo/rail.css";

/* The site's 404. One exported file (out/404.html) answers every unknown URL,
   the unknown /neo/ addresses included, so it stands on its own: the NEO
   tokens, Plex and the night theme through .nx-app and the font variables
   (the theme attribute is set before paint by the root layout's script), and
   the footer with the credit and the three legal documents (gate 3, major 12;
   gate 5, blocker 3). The markup does not depend on the address, so it is the
   same HTML wherever it is served. The React #418 on a /neo/ address comes
   from the shell choosing its branch by pathname (components/app-shell.tsx),
   not from this page. */

const FONTS = [plexHe, plexLat, plexMono].map((f) => f.variable).join(" ");

export default function NotFound() {
  return (
    <div dir="rtl" className={`nx-app nx-nf ${FONTS}`}>
      {/* The same first stop as every NEO page (gate 8, m8). */}
      <a href="#main" className="nx-skip">מעבר לתוכן הראשי</a>
      <main id="main" className="nx-nf-main">
        <div className="nx-nf-box">
          <p className="nx-nf-eye"><bdi>SAP by Sali</bdi> · <bdi>Project NEO</bdi></p>
          <p className="nx-nf-code" dir="ltr">404</p>
          <h1 className="nx-nf-h1">העמוד לא נמצא</h1>
          <p className="nx-nf-lede">
            ייתכן שהקישור השתנה, או שהעמוד עבר לכתובת חדשה. אפשר להמשיך מאחת הכניסות:
          </p>
          <nav className="nx-nf-go" aria-label="לאן אפשר להמשיך">
            <Link href="/neo/" prefetch={false} className="nu-btn"><Home size={16} strokeWidth={1.75} aria-hidden="true" />למסך הבית</Link>
            <Link href="/neo/tables/" prefetch={false} className="nu-btn2"><Table2 size={16} strokeWidth={1.75} aria-hidden="true" />טבלאות SAP</Link>
            <Link href="/neo/transactions/" prefetch={false} className="nu-btn2"><Terminal size={16} strokeWidth={1.75} aria-hidden="true" />טרנזקציות</Link>
            <Link href="/neo/books/" prefetch={false} className="nu-btn2"><BookOpen size={16} strokeWidth={1.75} aria-hidden="true" />ספריית SAP</Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
