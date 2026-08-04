// Re-mounts on each navigation → clean fade-in page transition.
//
// This used to be a framer-motion `motion.div` with `initial={{ opacity: 0 }}`.
// In a static export framer serialises that initial state into the HTML as
// `style="opacity:0;transform:translateY(10px)"`, so every prerendered page
// shipped fully populated but invisible, and only appeared once the
// framer-motion chunk had downloaded and React had hydrated. That is the
// blank content area seen in the corporate environment.
//
// The `neo-fade` CSS animation produces the same transition but starts at
// parse time, so first paint no longer depends on any JavaScript. Because
// `template.tsx` remounts on every navigation, React creates a fresh element
// each time and the animation replays exactly as it did before.
//
// Opacity-only (no transform) so a route change cannot shift layout mid-fade.
// No "use client" needed any more — this is now a server component, which also
// drops framer-motion from the critical path of every single route.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="neo-fade">{children}</div>;
}
