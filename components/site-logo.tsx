// SAP by Sali · Project NEO wordmark — inline, offline-safe. Project NEO network
// monogram (matches favicon / OG) + wordmark. tone="light" for red surfaces,
// tone="dark" for the neutral v2 shell. size scales icon + wordmark together.
type Size = "sm" | "md" | "lg" | "hero";
const SIZES: Record<Size, { icon: number; name: string; sub: string; gap: string }> = {
  sm: { icon: 28, name: "text-[13px]", sub: "text-[9px] tracking-[0.16em]", gap: "gap-2" },
  md: { icon: 38, name: "text-[16px]", sub: "text-[10px] tracking-[0.16em]", gap: "gap-2.5" },
  lg: { icon: 46, name: "text-[20px]", sub: "text-[10.5px] tracking-[0.18em]", gap: "gap-3" },
  hero: { icon: 78, name: "text-[30px] sm:text-[34px]", sub: "text-[12px] tracking-[0.24em]", gap: "gap-4" },
};

export function SiteLogo({ className, tone = "light", size = "md" }: { className?: string; tone?: "light" | "dark"; size?: Size }) {
  const dark = tone === "dark";
  const s = SIZES[size];
  const gid = `lg-bg-${size}`;
  return (
    <span className={className} aria-label="SAP by Sali · Project NEO" role="img">
      <span className={`inline-flex items-center ${s.gap}`}>
        <svg width={s.icon} height={s.icon} viewBox="0 0 100 100" fill="none" aria-hidden className="shrink-0">
          {dark ? (
            <>
              <defs>
                <radialGradient id={gid} cx="30%" cy="18%" r="130%">
                  <stop offset="0" stopColor="#e23b41" /><stop offset="0.46" stopColor="#d62027" /><stop offset="1" stopColor="#a3171c" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill={`url(#${gid})`} />
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
          <span className={`${s.name} font-extrabold tracking-tight ${dark ? "text-ink-1" : ""}`}>SAP by Sali</span>
          <span className={`mt-1 ${s.sub} font-semibold uppercase ${dark ? "text-ink-3" : "text-white/70"}`}>Project NEO</span>
        </span>
      </span>
    </span>
  );
}
