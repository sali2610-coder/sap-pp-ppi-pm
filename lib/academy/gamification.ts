"use client";

// Academy gamification — streak, weekly goal, badges. Computed HONESTLY from the
// learner's REAL activity (localStorage), never faked. New users see genuine
// early/empty states (streak 0, goal 0, badges locked) — which the redesign turns
// into elegant "start learning" states rather than fake numbers.
import { useCallback, useEffect, useState } from "react";

const PROGRESS = "neo:academy:progress";   // { slug: string[] } (block kinds done) — from lesson-progress
const ACTIVITY = "neo:academy:activity";   // string[] of ISO day-stamps when any progress happened
const WEEKLY_TARGET = 3;                    // lessons/sessions per week

const today = () => new Date().toISOString().slice(0, 10);
function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const r = localStorage.getItem(key); return r ? (JSON.parse(r) as T) : fallback; } catch { return fallback; }
}

/** Record that the learner was active today (call on any lesson progress). */
export function recordActivity() {
  if (typeof window === "undefined") return;
  const days = new Set(read<string[]>(ACTIVITY, []));
  const t = today();
  if (!days.has(t)) { days.add(t); try { localStorage.setItem(ACTIVITY, JSON.stringify([...days])); } catch { /* quota */ } }
}

function streakFrom(days: string[]): { current: number; longest: number } {
  if (!days.length) return { current: 0, longest: 0 };
  const set = new Set(days);
  const d = new Date();
  // current: consecutive days ending today or yesterday
  let current = 0; const cur = new Date();
  if (!set.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1); // allow "yesterday" grace
  while (set.has(cur.toISOString().slice(0, 10))) { current++; cur.setDate(cur.getDate() - 1); }
  // longest
  const sorted = [...set].sort();
  let longest = 1, run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]); prev.setDate(prev.getDate() + 1);
    if (prev.toISOString().slice(0, 10) === sorted[i]) run++; else run = 1;
    longest = Math.max(longest, run);
  }
  void d;
  return { current, longest: Math.max(longest, current) };
}

export interface Gamification {
  streak: number; longestStreak: number;
  weeklyDone: number; weeklyTarget: number;
  activeDays7: boolean[];             // Sun..Sat this week
  lessonsInProgress: number; blocksDone: number;
  badges: { id: string; label: string; hint: string; emoji: string; earned: boolean }[];
}

export function computeGamification(): Gamification {
  const progress = read<Record<string, string[]>>(PROGRESS, {});
  const activity = read<string[]>(ACTIVITY, []);
  const { current, longest } = streakFrom(activity);
  const slugs = Object.keys(progress);
  const blocksDone = Object.values(progress).reduce((s, a) => s + a.length, 0);

  // this week's active days (Sun-start)
  const now = new Date(); const sow = new Date(now); sow.setDate(now.getDate() - now.getDay());
  const activeDays7 = Array.from({ length: 7 }, (_, i) => { const d = new Date(sow); d.setDate(sow.getDate() + i); return activity.includes(d.toISOString().slice(0, 10)); });
  const weeklyDone = activeDays7.filter(Boolean).length;

  const badges = [
    { id: "first", label: "צעד ראשון", hint: "התחלת שיעור", emoji: "🎯", earned: slugs.length >= 1 },
    { id: "blocks10", label: "10 בלוקים", hint: "10 בלוקים הושלמו", emoji: "📚", earned: blocksDone >= 10 },
    { id: "streak3", label: "רצף 3", hint: "3 ימים ברצף", emoji: "🔥", earned: current >= 3 || longest >= 3 },
    { id: "streak7", label: "רצף 7", hint: "שבוע ברצף", emoji: "⚡", earned: longest >= 7 },
    { id: "lesson", label: "שיעור שלם", hint: "השלמת שיעור", emoji: "🏭", earned: Object.values(progress).some((a) => a.length >= 12) },
  ];

  return { streak: current, longestStreak: longest, weeklyDone, weeklyTarget: WEEKLY_TARGET, activeDays7, lessonsInProgress: slugs.length, blocksDone, badges };
}

export function useGamification(): Gamification {
  const [g, setG] = useState<Gamification>(() => ({ streak: 0, longestStreak: 0, weeklyDone: 0, weeklyTarget: WEEKLY_TARGET, activeDays7: [false, false, false, false, false, false, false], lessonsInProgress: 0, blocksDone: 0, badges: computeGamification().badges.map((b) => ({ ...b, earned: false })) }));
  useEffect(() => { setG(computeGamification()); }, []);
  return g;
}

/** Progress (0..1) for one lesson slug given its total visible block count. */
export function useLessonPct(slug: string, total: number) {
  const [pct, setPct] = useState(0);
  const refresh = useCallback(() => { const p = read<Record<string, string[]>>(PROGRESS, {}); setPct(total ? Math.min(1, (p[slug]?.length || 0) / total) : 0); }, [slug, total]);
  useEffect(() => { refresh(); }, [refresh]);
  return pct;
}
