"use client";

import { useReducedMotion } from "framer-motion";
import { EXIT, SPRING_MORPH, SPRING_SHEET, SPRING_SNAP } from "@/lib/motion";

/**
 * The navigation's single motion source.
 *
 * WHY THIS EXISTS
 *
 * `app/globals.css` zeroes every animation and transition duration under
 * `prefers-reduced-motion`, which covers CSS and nothing else. Framer Motion
 * springs are driven by requestAnimationFrame writing inline transforms, so the
 * media query cannot touch them. Measured before this hook: with Reduce Motion
 * enabled, the entire mobile sheet system, the centers sheet, the command
 * palette and the workspace inspector still sprang, dragged and slid at full
 * amplitude — `useReducedMotion()` was absent from all four.
 *
 * Coverage was partial even where the hook was present: the contextual FAB
 * gated its action-stack entrance but not its own tap scale or its 135° icon
 * rotation, and the object rail gated scrolling but not its `layoutId` ink.
 *
 * So the rule is now structural rather than a habit: navigation components read
 * their transitions from here and never call `useReducedMotion()` themselves.
 * If a transition is not in this file, it does not belong in the navigation.
 *
 * WHAT REDUCED MOTION MEANS HERE
 *
 * Not "no feedback" — state changes must still be perceivable, or the interface
 * becomes ambiguous. Instead:
 *   - the Signal SNAPS to its new position instead of travelling
 *   - sheets and panels cross-fade instead of sliding
 *   - press feedback drops the scale but keeps the colour change
 *   - drag gestures keep working; only the springy settle is removed
 */
export interface NavMotion {
  /** true when the user asked for reduced motion */
  readonly reduced: boolean;
  /** The Signal travelling along the spine. A shared-element morph. */
  readonly signal: object;
  /** Sheets, overlay panel, drawers. */
  readonly sheet: object;
  /** Taps, chips, toggles, expand/collapse chevrons. */
  readonly snap: object;
  /** Every exit. */
  readonly exit: object;
  /** Scale factor for press feedback — 1 disables it. */
  readonly pressScale: number;
  /** Per-item stagger in seconds — 0 disables it. */
  readonly stagger: number;
}

/** An instant, non-animated transition used across the board when motion is reduced. */
const INSTANT = { duration: 0 } as const;

export function useNavMotion(): NavMotion {
  const reduced = useReducedMotion() ?? false;

  if (reduced) {
    return {
      reduced: true,
      signal: INSTANT,
      sheet: { duration: 0.12 },
      snap: INSTANT,
      exit: { duration: 0.1 },
      pressScale: 1,
      stagger: 0,
    };
  }

  return {
    reduced: false,
    signal: SPRING_MORPH,
    sheet: SPRING_SHEET,
    snap: SPRING_SNAP,
    exit: EXIT,
    pressScale: 0.97,
    stagger: 0.024,
  };
}
