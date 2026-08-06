// D5 · Scroll-reveal wrapper — gentle fade-up on enter, once.
//
// Was a framer-motion `motion.div` with `initial={{ opacity: 0, y: 20 }}` and
// `whileInView`. Two problems in a static export:
//   1. `initial` is serialised into the HTML as inline opacity:0, so wrapped
//      content shipped fully populated but invisible until framer-motion had
//      downloaded and hydrated.
//   2. `whileInView` means JavaScript decides whether content may be seen at
//      all — anything above the fold was hidden for no benefit.
//
// Now a `neo-rise` CSS animation with the same 0.5s duration and easing. It
// runs on mount rather than on scroll; for below-the-fold content the user
// cannot tell the difference, and for above-the-fold content that change is
// the whole point. Reduced motion is handled by the CSS media query, so the
// hook and the "use client" directive are both gone.
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={className ? `${className} neo-rise` : "neo-rise"}
      style={{ "--neo-y": "20px", "--neo-dur": "0.5s", animationDelay: `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
