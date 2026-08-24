import { CENTER_FAMILIES } from "@/components/neo-shell/centers/centers-data";
import { CONCEPTS } from "@/data/concepts";
const items = CENTER_FAMILIES.flatMap((f) => f.items.map((i) => ({ fam: f.id, slug: i.slug, he: i.he, title: i.title, sections: i.sections.length })));
const seen = new Map();
for (const i of items) { if (!seen.has(i.slug)) seen.set(i.slug, []); seen.get(i.slug).push(i); }
console.log("=== duplicate slugs across families ===");
for (const [slug, list] of seen) if (list.length > 1)
  console.log(` ${slug}: ` + list.map((x) => `${x.fam}/"${x.he}"(${x.sections} sec)`).join("  vs  "));
console.log("\n=== concepts groups ===");
const g = {}; for (const c of CONCEPTS) g[c.group] = (g[c.group] || 0) + 1;
console.log(JSON.stringify(g, null, 1));
console.log("\nconcepts with ecc/s4 filled:", CONCEPTS.filter((c) => (c.ecc||"").trim() || (c.s4||"").trim()).length, "/", CONCEPTS.length);
console.log("centers items with eccS4      :", items.length - CENTER_FAMILIES.flatMap(f=>f.items).filter(i=>!i.eccS4).length, "/", items.length);
