import Link from "next/link";
import { WifiOff, Home, RotateCcw } from "lucide-react";

export const metadata = { title: "לא מקוון · SAP by Sali", robots: { index: false, follow: false } };

// Offline fallback — served by the service worker when a never-visited page is
// requested with no network. Branded, calm, actionable. Visited pages come from
// the runtime cache and never hit this.
export default function OfflinePage() {
  return (
    <div dir="rtl" className="grid min-h-[70vh] place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex items-center justify-center gap-2.5">
          <span className="grid size-14 place-items-center rounded-[26%] text-white shadow-lg shadow-brand/30" style={{ background: "radial-gradient(130% 130% at 30% 18%, #e23b41, #d62027 46%, #a3171c)" }}>
            <svg viewBox="0 0 100 100" width="34" height="34" fill="none" aria-hidden>
              <g stroke="#fff" strokeWidth="6" strokeLinecap="round"><line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" /></g>
              <g fill="#fff"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
            </svg>
          </span>
          <div className="text-start"><div className="text-[13px] font-extrabold tracking-tight text-ink-1">SAP by Sali</div><div className="text-[11px] font-semibold text-ink-3">Project NEO</div></div>
        </div>
        <div className="mx-auto mt-6 grid size-12 place-items-center rounded-2xl bg-surface-2 text-ink-3"><WifiOff className="size-6" /></div>
        <h1 className="mt-3 text-xl font-extrabold text-ink-1">אין חיבור לרשת</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-3">העמוד הזה עדיין לא נשמר במכשיר. עמודים שכבר ביקרת בהם זמינים גם ללא רשת — חזור לקוקפיט או נסה שוב כשהחיבור יחזור.</p>
        <div className="mt-5 flex justify-center gap-2">
          <Link href="/" className="tap inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-extrabold text-white shadow-sm shadow-brand/25 active:scale-95"><Home className="size-4" />לקוקפיט</Link>
          <a href="" className="tap inline-flex items-center gap-1.5 rounded-xl border-2 border-hairline px-4 py-2.5 text-sm font-bold text-ink-2 hover:border-brand/40 hover:text-brand active:scale-95"><RotateCcw className="size-4" />נסה שוב</a>
        </div>
      </div>
    </div>
  );
}
