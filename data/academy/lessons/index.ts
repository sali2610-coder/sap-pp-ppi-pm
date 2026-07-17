import type { Lesson } from "@/lib/academy/lesson-types";
import { PILOT_LESSONS } from "./pm-maintenance-order";
import { PM_GENERATED_LESSONS } from "./pm-generated";

// Single lesson registry — the pilot + the pipeline-authored PM lessons. Pages,
// generateStaticParams and the learning path all read from ALL_LESSONS so new
// lessons appear everywhere by adding data only (no component change).
export const ALL_LESSONS: Record<string, Lesson> = { ...PILOT_LESSONS, ...PM_GENERATED_LESSONS };
export const lessonBySlug = (slug: string): Lesson | undefined => ALL_LESSONS[slug];
export const allLessonSlugs = (): string[] => Object.keys(ALL_LESSONS);
