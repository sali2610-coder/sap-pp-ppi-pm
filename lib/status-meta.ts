import type { MigrationStatus } from "@/lib/types";

interface StatusMeta {
  he: string;
  en: string;
  colorVar: string; // CSS var name
  badge: string; // tailwind classes for badge
}

// Hebrew + English labels + the brand-aligned status palette (mirrors globals.css).
export const STATUS_META: Record<MigrationStatus, StatusMeta> = {
  "Not started": { he: "לא התחיל", en: "Not started", colorVar: "--status-not-started", badge: "bg-status-not-started/15 text-status-not-started" },
  "In analysis": { he: "בניתוח", en: "In analysis", colorVar: "--status-in-analysis", badge: "bg-status-in-analysis/15 text-status-in-analysis" },
  "In conversion": { he: "בהמרה", en: "In conversion", colorVar: "--status-in-conversion", badge: "bg-status-in-conversion/15 text-status-in-conversion" },
  Tested: { he: "נבדק", en: "Tested", colorVar: "--status-tested", badge: "bg-status-tested/15 text-status-tested" },
  Done: { he: "הושלם", en: "Done", colorVar: "--status-done", badge: "bg-status-done/15 text-status-done" },
};

export function statusColor(s: MigrationStatus): string {
  return `var(${STATUS_META[s].colorVar})`;
}
