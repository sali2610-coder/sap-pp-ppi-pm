import type { ReactNode } from "react";

// Subtle mount reveal for section bodies (GOAL-3 tasteful motion).
//
// Was a framer-motion `motion.div` with `initial={{ opacity: 0, y: 8 }}`. In a
// static export that initial state is serialised into the HTML as inline
// opacity:0, so the section shipped fully populated but invisible and only
// appeared once framer-motion had downloaded and hydrated. The `neo-rise` CSS
// utility gives the identical 0.28s ease-out rise but starts at parse time,
// so the content is never gated on JavaScript.
//
// No "use client" and no hook needed any more — reduced motion is handled by
// the `prefers-reduced-motion` rule attached to `.neo-rise` in globals.css.
export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <div className="neo-rise" style={{ "--neo-y": "8px", "--neo-dur": "0.28s" } as React.CSSProperties}>
      {children}
    </div>
  );
}
