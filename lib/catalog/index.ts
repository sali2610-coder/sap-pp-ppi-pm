/**
 * Catalog registry (Plan §9). Concatenates every kind adapter into one universal
 * object list, plus prebuilt indexes so filtering/search scales to thousands of
 * objects (O(bucket), not O(n) scans). Built once, memoized at module load.
 *
 * Adding a kind later = register its adapter here. No UI change.
 */
import type { CatalogObject, ObjectKind, TrustLevel } from "@/lib/catalog/types";
import { bapiFmObjects } from "@/lib/catalog/adapters/bapi-fm";

const ADAPTERS: Array<() => CatalogObject[]> = [
  bapiFmObjects,
  // future: tableObjects, cdsObjects, idocObjects, tcodeObjects, ...
];

let _objects: CatalogObject[] | null = null;
export function listObjects(): CatalogObject[] {
  if (_objects) return _objects;
  _objects = ADAPTERS.flatMap((a) => a()).sort((a, b) => a.name.localeCompare(b.name));
  return _objects;
}

let _byId: Map<string, CatalogObject> | null = null;
export function getObject(id: string): CatalogObject | undefined {
  if (!_byId) _byId = new Map(listObjects().map((o) => [o.id, o]));
  return _byId.get(id);
}
export function getObjectByName(name: string): CatalogObject | undefined {
  return listObjects().find((o) => o.name === name);
}

/* ---------- Prebuilt indexes for scale ---------- */
export interface CatalogIndex {
  byKind: Map<ObjectKind, CatalogObject[]>;
  byModule: Map<string, CatalogObject[]>;
  byProcess: Map<string, CatalogObject[]>;
  byTrust: Map<TrustLevel, CatalogObject[]>;
  byLetter: Map<string, CatalogObject[]>;
}
let _index: CatalogIndex | null = null;
function push<K>(m: Map<K, CatalogObject[]>, k: K, o: CatalogObject) { (m.get(k) || m.set(k, []).get(k)!).push(o); }
export function catalogIndex(): CatalogIndex {
  if (_index) return _index;
  const idx: CatalogIndex = { byKind: new Map(), byModule: new Map(), byProcess: new Map(), byTrust: new Map(), byLetter: new Map() };
  for (const o of listObjects()) {
    push(idx.byKind, o.kind, o);
    push(idx.byModule, o.module, o);
    if (o.process) push(idx.byProcess, o.process, o);
    push(idx.byTrust, o.trust.level, o);
    push(idx.byLetter, o.name[0].toUpperCase(), o);
  }
  _index = idx;
  return idx;
}

/* ---------- Lightweight tokenized search (name + purpose) ---------- */
export function searchObjects(query: string, limit = 50): CatalogObject[] {
  const q = query.trim().toLowerCase();
  if (!q) return listObjects().slice(0, limit);
  const out: CatalogObject[] = [];
  for (const o of listObjects()) {
    if (o.name.toLowerCase().includes(q) || o.purpose.toLowerCase().includes(q) || (o.process || "").toLowerCase().includes(q)) {
      out.push(o);
      if (out.length >= limit) break;
    }
  }
  return out;
}

/** Verification summary for the deliverable (Plan §6). */
export function trustSummary(): Record<TrustLevel, number> {
  const s: Record<TrustLevel, number> = { official: 0, community: 0, curated: 0, "needs-review": 0, invalid: 0 };
  for (const o of listObjects()) s[o.trust.level]++;
  return s;
}
