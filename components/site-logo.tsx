// SAP by Sali · Project NEO wordmark — inline, offline-safe. White rounded tile
// with the Project NEO network monogram (matches favicon / OG), plus wordmark.
export function SiteLogo({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="SAP by Sali · Project NEO" role="img">
      <span className="inline-flex items-center gap-2.5">
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" aria-hidden>
          <rect width="100" height="100" rx="24" fill="white" />
          <g stroke="#d62027" strokeWidth="6" strokeLinecap="round">
            <line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" />
          </g>
          <g fill="#d62027"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
        </svg>
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-extrabold tracking-tight">SAP by Sali</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">Project NEO</span>
        </span>
      </span>
    </span>
  );
}
