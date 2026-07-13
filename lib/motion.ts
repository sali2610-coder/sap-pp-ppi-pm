/**
 * Project NEO — signature motion tokens (Phase 13.2).
 * One source of truth so every reader interaction shares the same rhythm.
 * Transform/opacity only (60fps). Gate transform-based motion behind
 * useReducedMotion() at call sites; CSS side is handled in globals.css.
 */

// durations (seconds, for framer-motion)
export const DUR = { fast: 0.12, base: 0.24, page: 0.32, slow: 0.5 } as const;

// easing curves (cubic-bezier control points)
export const EASE = {
  out: [0.2, 0, 0, 1] as [number, number, number, number],          // signature — appearing/settling
  emphasized: [0.05, 0.7, 0.1, 1] as [number, number, number, number], // hero/content entrance
  accelerate: [0.3, 0, 0.8, 0.15] as [number, number, number, number], // exits
};

// the ONE spring — reserved for the shared-element figure morph
export const SPRING_MORPH = { type: "spring", stiffness: 260, damping: 30 } as const;

// transition helper
export const t = (d: number = DUR.base, e = EASE.out) => ({ duration: d, ease: e });

// content-entrance variant (fade + slight rise); pair with useReducedMotion()
export const enter = (reduce: boolean) =>
  reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.12 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: DUR.page, ease: EASE.emphasized } };
