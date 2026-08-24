import { TABLE_ENRICHMENT } from "@/data/table-enrichment";
import { objectNames, objectSource } from "@/components/neo-shell/object/object-names";
const keys = Object.keys(TABLE_ENRICHMENT);
const names = new Set(objectNames());
const bySource = {};
for (const k of keys) { const s = names.has(k) ? objectSource(k) : "NO PAGE"; bySource[s] = (bySource[s]||0)+1; }
const f = (k) => keys.filter((x) => TABLE_ENRICHMENT[x][k]?.length || TABLE_ENRICHMENT[x][k]).length;
console.log(JSON.stringify({
  enriched: keys.length, bySource,
  orphan: keys.filter((k) => !names.has(k)),
  fields: { purposeDeep: f("purposeDeep"), primaryKey: f("primaryKey"), foreignKeys: f("foreignKeys"),
    indexes: f("indexes"), matdocNote: f("matdocNote"), perfNotes: f("perfNotes"),
    abapExample: f("abapExample"), sqlExample: f("sqlExample"), debugExample: f("debugExample"), sources: f("sources") },
  verifiedFlag: keys.reduce((a,k)=>(a[TABLE_ENRICHMENT[k].verified||"none"]=(a[TABLE_ENRICHMENT[k].verified||"none"]||0)+1,a),{}),
}, null, 1));
