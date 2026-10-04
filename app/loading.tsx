// The route-level loading state (spec P1 §12). Calm and bounded: nothing in it
// moves, and it stays invisible for the first 400ms, so a page that arrives
// quickly never flashes a loader in front of itself. When the wait is longer it
// fades in once (160ms) and holds still until the page replaces it. It is a
// status, so a screen reader hears "טעינה…" once rather than nothing.
export default function Loading() {
  return (
    <div dir="rtl" className="nl-wait" role="status">
      <span className="nl-mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="26" height="26" fill="none">
          <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
            <line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" />
          </g>
          <g fill="currentColor"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
        </svg>
      </span>
      <p className="nl-name">SAP by Sali · Project NEO</p>
      <p className="nl-text">טעינה…</p>
    </div>
  );
}
