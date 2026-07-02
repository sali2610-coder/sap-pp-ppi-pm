// Extra search sources for the universal search — fields (Data Dictionary) and
// the full Fiori Apps index. Verified data only: fields come from the blueprint
// tables; Fiori apps from the curated index. No fabrication.
import { ALL_TABLES } from "@/lib/data";
import APPS from "@/data/library/fiori-apps.json";

export interface FieldHit { field: string; en: string; he: string; table: string; tableHe: string; module: string }
export interface FioriHit { id: string; name: string; type: string }

// field → first owning table (a field like MATNR lives in many tables; link to a
// representative one). Deduped by field name.
let _fieldIndex: FieldHit[] | null = null;
function fieldIndex(): FieldHit[] {
  if (_fieldIndex) return _fieldIndex;
  const seen = new Set<string>();
  const out: FieldHit[] = [];
  for (const t of ALL_TABLES) {
    for (const f of t.fields || []) {
      const key = f.tech.toUpperCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ field: f.tech, en: f.en, he: f.he, table: t.tableName, tableHe: t.descriptionHe || t.descriptionEn || "", module: t.module });
    }
  }
  _fieldIndex = out;
  return out;
}

export function searchFields(q: string, limit = 6): FieldHit[] {
  const s = q.trim().toLowerCase();
  if (s.length < 2) return [];
  return fieldIndex()
    .filter((f) => f.field.toLowerCase().includes(s) || f.he.includes(q.trim()) || f.en.toLowerCase().includes(s))
    .slice(0, limit);
}

const _apps = APPS as { id: string; name: string; type: string }[];
export function searchFioriApps(q: string, limit = 6): FioriHit[] {
  const s = q.trim().toLowerCase();
  if (s.length < 2) return [];
  return _apps.filter((a) => a.id.toLowerCase().includes(s) || a.name.toLowerCase().includes(s)).slice(0, limit);
}
