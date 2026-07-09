// SAP by Sali · Project NEO wordmark — inline, offline-safe. Project NEO network
// monogram (matches favicon / OG) + wordmark. tone="light" for red surfaces,
// tone="dark" for the neutral v2 shell.
export function SiteLogo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <span className={className} aria-label="SAP by Sali · Project NEO" role="img">
      <span className="inline-flex items-center gap-2.5">
        <svg width="34" height="34" viewBox="0 0 100 100" fill="none" aria-hidden>
          {dark ? (
            <>
              <defs>
                <radialGradient id="lg-bg" cx="30%" cy="18%" r="130%">
                  <stop offset="0" stopColor="#e23b41" /><stop offset="0.46" stopColor="#d62027" /><stop offset="1" stopColor="#a3171c" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#lg-bg)" />
              <g stroke="#fff" strokeWidth="6" strokeLinecap="round">
                <line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" />
              </g>
              <g fill="#fff"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
            </>
          ) : (
            <>
              <rect width="100" height="100" rx="24" fill="white" />
              <g stroke="#d62027" strokeWidth="6" strokeLinecap="round">
                <line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" />
              </g>
              <g fill="#d62027"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
            </>
          )}
        </svg>
        <span className="flex flex-col leading-none">
          <span className={`text-[15px] font-extrabold tracking-tight ${dark ? "text-ink-1" : ""}`}>SAP by Sali</span>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-ink-3" : "text-white/70"}`}>Project NEO</span>
        </span>
      </span>
    </span>
  );
}
