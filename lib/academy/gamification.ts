"use client";

// Academy gamification (streak / weekly goal / badges) + activity logging.
// Now derived from the single Academy store (lib/academy/store.ts, `neo:academy:v2`).
// Thin re-export so existing importers (academy-home, lesson-view, learning-path)
// are unchanged. Streak/badges are computed HONESTLY from real activity.
export {
  recordActivity,
  useGamification,
  useLessonPct,
  computeGamification,
  WEEKLY_TARGET,
  type Gamification,
} from "./store";
