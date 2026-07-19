"use client";

// Per-lesson block-completion progress. Now backed by the single Academy store
// (lib/academy/store.ts, `neo:academy:v2`). Kept as a thin re-export so existing
// importers (lesson-view) are unchanged. Same signature, same return shape.
export { useLessonProgress } from "./store";
