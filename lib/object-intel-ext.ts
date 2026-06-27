// Accessor for the Object Intelligence layer (data/knowledge/object-intel.ts).
// Returns curated facets when available; derives a generic actor hint from the
// module so the Wiki view never shows a hard-empty "who" — generic hints are
// clearly labeled in the UI (not presented as verified-specific).
import { OBJECT_INTEL, type ObjectIntelExt } from "@/data/knowledge/object-intel";

export type { ObjectIntelExt };

export const objectIntelExt = (name: string): ObjectIntelExt | undefined => OBJECT_INTEL[name];

const MODULE_ACTORS: Record<string, { creates: string[]; reads: string[]; updates: string[] }> = {
  PM: { creates: ["מתכנן אחזקה", "טכנאי"], reads: ["מנהל אחזקה", "בקרת עלויות"], updates: ["טכנאי", "מתכנן אחזקה"] },
  "PP-PI": { creates: ["מתכנן ייצור"], reads: ["מנהל ייצור", "איכות (QM)"], updates: ["מתכנן ייצור", "מפעיל קו"] },
  HR: { creates: ["מנהל משאבי אנוש", "אדמין HR"], reads: ["מנהל ישיר", "עובד"], updates: ["אדמין HR", "מנהל שכר"] },
  BW: { creates: ["מפתח BW", "ארכיטקט נתונים"], reads: ["אנליסט עסקי", "הנהלה"], updates: ["מפתח BW"] },
};

// Generic, module-derived actor hint (used only when no curated entry exists).
export const deriveActors = (module?: string) => MODULE_ACTORS[module || ""] || { creates: ["משתמש עסקי"], reads: ["משתמש עסקי", "הנהלה"], updates: ["משתמש עסקי"] };

export const hasObjectIntel = (name: string): boolean => !!OBJECT_INTEL[name];
