/* Project NEO · best practices — the registry.
   The record shape lives in lib/evidence/types.ts (BestPracticeLike) so the
   pure rule engine can validate it; this module gives it its public name and
   merges the module files. Throws at module load on a duplicate slug. */
import type { BestPracticeLike } from "@/lib/evidence/types";
import { PM_BEST_PRACTICES } from "./pm";
import { PPPI_BEST_PRACTICES } from "./pp-pi";

export type BestPractice = BestPracticeLike;

export const BEST_PRACTICES: BestPractice[] = (() => {
  const merged = [...PM_BEST_PRACTICES, ...PPPI_BEST_PRACTICES];
  const seen = new Set<string>();
  for (const b of merged) {
    if (seen.has(b.slug)) throw new Error(`data/best-practices: duplicate slug ${b.slug}`);
    seen.add(b.slug);
  }
  return merged;
})();

export const bpSlugs = (): string[] => BEST_PRACTICES.map((b) => b.slug);
export const bpBySlug = (slug: string): BestPractice | undefined =>
  BEST_PRACTICES.find((b) => b.slug === slug);
