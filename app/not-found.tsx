import Link from "next/link";
import { BookOpen, Home, Table2, Terminal } from "lucide-react";

/* The site's 404 (2026 system). It is served for every unknown URL, so it has
   to stand on its own in both contexts it can appear in: inside the legacy
   shell, and bare (an unknown /neo/ address takes the shell's bare branch).
   It therefore uses only the theme-aware root tokens, which both themes set.
   No gradient text, no glow; the number is a plain label and the actions are
   the product's own front doors, not legacy routes. */

function Mark() {
  return (
    <span className="grid size-10 place-items-center rounded-[6px] bg-brand" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="24" height="24" fill="none">
        <g stroke="#fff" strokeWidth="6" strokeLinecap="round"><line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" /></g>
        <g fill="#fff"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
      </svg>
    </span>
  );
}

const link =
  "inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-hairline px-4 text-sm font-medium text-ink-1 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1f5fbf]";

export default function NotFound() {
  return (
    <div dir="rtl" className="grid min-h-[70vh] place-items-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3">
          <Mark />
          <p className="text-sm text-ink-2"><bdi>SAP by Sali</bdi> · <bdi>Project NEO</bdi></p>
        </div>
        <p className="mt-8 font-mono text-sm text-ink-2" dir="ltr">404</p>
        <h1 className="mt-1 text-[1.75rem] font-semibold leading-tight text-ink-1">העמוד לא נמצא</h1>
        <p className="mt-2 text-base leading-relaxed text-ink-2">
          ייתכן שהקישור השתנה, או שהעמוד עבר לכתובת חדשה. אפשר להמשיך מאחת הכניסות:
        </p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="לאן אפשר להמשיך">
          {/* Outlined like the others, first and bold: the root theme's brand
              foreground is dark on red (3.7:1), and this page must hold in both
              themes without a dark variant. */}
          <Link href="/neo/" prefetch={false} className={`${link} border-ink-2 font-semibold`}>
            <Home className="size-4" aria-hidden="true" />למסך הבית
          </Link>
          <Link href="/neo/tables/" prefetch={false} className={link}><Table2 className="size-4" aria-hidden="true" />טבלאות SAP</Link>
          <Link href="/neo/transactions/" prefetch={false} className={link}><Terminal className="size-4" aria-hidden="true" />טרנזקציות</Link>
          <Link href="/neo/books/" prefetch={false} className={link}><BookOpen className="size-4" aria-hidden="true" />ספריית SAP</Link>
        </nav>
      </div>
    </div>
  );
}
