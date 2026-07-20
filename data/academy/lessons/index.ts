import type { Lesson } from "@/lib/academy/lesson-types";
import { PILOT_LESSONS } from "./pm-maintenance-order";
import { PM_GENERATED_LESSONS } from "./pm-generated";
import { PP_GENERATED_LESSONS } from "./pp-generated";
import { QM_GENERATED_LESSONS } from "./qm-generated";
import { PMU_GENERATED_LESSONS } from "./pmu-generated";
import { MM_GENERATED_LESSONS } from "./mm-generated";
import { WM_GENERATED_LESSONS } from "./wm-generated";
import { PPDS_GENERATED_LESSONS } from "./ppds-generated";
import { SOP_GENERATED_LESSONS } from "./sop-generated";

// Single lesson registry — pilot + pipeline-authored PM + PP-PI + QM + migrated PM-User lessons.
// Pages, generateStaticParams and the learning paths all read from ALL_LESSONS so
// new lessons appear everywhere by adding data only (no component change).
export const ALL_LESSONS: Record<string, Lesson> = { ...PILOT_LESSONS, ...PM_GENERATED_LESSONS, ...PP_GENERATED_LESSONS, ...QM_GENERATED_LESSONS, ...PMU_GENERATED_LESSONS, ...MM_GENERATED_LESSONS, ...WM_GENERATED_LESSONS, ...PPDS_GENERATED_LESSONS, ...SOP_GENERATED_LESSONS };
export const lessonBySlug = (slug: string): Lesson | undefined => ALL_LESSONS[slug];
export const allLessonSlugs = (): string[] => Object.keys(ALL_LESSONS);
