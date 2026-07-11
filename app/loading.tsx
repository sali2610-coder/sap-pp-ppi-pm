// Branded route-level loading screen — shown during navigation/suspense.
// Premium, calm, on-brand (NEO network monogram + brand red).
export default function Loading() {
  return (
    <div dir="rtl" className="grid min-h-[70vh] place-items-center px-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative grid size-20 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-[26%] bg-brand/20" style={{ animationDuration: "1.8s" }} />
          <span className="relative grid size-20 place-items-center rounded-[26%] text-white shadow-lg shadow-brand/30"
            style={{ background: "radial-gradient(130% 130% at 30% 18%, #e23b41, #d62027 46%, #a3171c)" }}>
            <svg viewBox="0 0 100 100" width="46" height="46" fill="none" aria-hidden>
              <g stroke="#fff" strokeWidth="6" strokeLinecap="round">
                <line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" />
              </g>
              <g fill="#fff"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
            </svg>
          </span>
        </div>
        <p className="mt-5 text-sm font-extrabold tracking-tight text-ink-2">SAP by Sali · Project NEO</p>
        <div className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-surface-2">
          <div className="skeleton h-full w-full" />
        </div>
        <p className="mt-3 text-[12px] font-medium text-ink-3">טוען את נוף ה-SAP…</p>
      </div>
    </div>
  );
}
