/* THE TWO "KNOWLEDGE CENTER" SIDEBAR ENTRIES — are they the same content? */
import { CONCEPTS } from "@/data/concepts";
import { CENTER_FAMILIES, centerTotals } from "@/components/neo-shell/centers/centers-data";

const norm = (s) => (s || "").replace(/[\s֐-׿]/g, (c) => c).trim().toLowerCase();

console.log("=== ENTRY 1 · 'מרכז ידע' under ידע ולמידה ===");
console.log("  dataset : data/concepts.ts  ->  CONCEPTS");
console.log("  count   :", CONCEPTS.length);
console.log("  route   : /neo/knowledge/  +  /neo/knowledge/[slug]/");
console.log("  fields  :", Object.keys(CONCEPTS[0]).join(", "));
console.log("  sample  :", JSON.stringify({ slug: CONCEPTS[0].slug, he: CONCEPTS[0].he, title: CONCEPTS[0].title }));
const cCats = [...new Set(CONCEPTS.map((c) => c.cat || c.category || "(none)"))];
console.log("  categories:", cCats.join(" · "));
const cMods = [...new Set(CONCEPTS.flatMap((c) => (Array.isArray(c.modules) ? c.modules : [c.module]).filter(Boolean)))];
console.log("  modules :", cMods.join(" · "));

console.log("\n=== ENTRY 2 · 'מרכזי ידע' under כלים ===");
const t = centerTotals();
console.log("  dataset : data/centers/*  ->  CENTER_FAMILIES");
console.log("  count   :", t.items, "(families:", t.families, ", sections:", t.sections, ")");
console.log("  route   : /neo/centers/  +  /neo/centers/[family]/  +  /neo/centers/[family]/[slug]/");
console.log("  families:", CENTER_FAMILIES.map((f) => `${f.id}(${f.items.length})`).join(" "));
const f0 = CENTER_FAMILIES[0].items[0];
console.log("  item fields:", Object.keys(f0).join(", "));
console.log("  sample  :", JSON.stringify({ slug: f0.slug, he: f0.he, title: f0.title }));

/* OVERLAP — by slug, by Hebrew title, by English title */
const cSlug = new Set(CONCEPTS.map((c) => c.slug));
const cHe = new Set(CONCEPTS.map((c) => (c.he || "").trim()));
const cEn = new Set(CONCEPTS.map((c) => (c.title || "").trim().toLowerCase()));
const items = CENTER_FAMILIES.flatMap((f) => f.items.map((i) => ({ ...i, fam: f.id })));
const bySlug = items.filter((i) => cSlug.has(i.slug));
const byHe = items.filter((i) => cHe.has((i.he || "").trim()));
const byEn = items.filter((i) => cEn.has((i.title || "").trim().toLowerCase()));
console.log("\n=== OVERLAP ===");
console.log("  centers items total     :", items.length);
console.log("  slug collision w/ concepts:", bySlug.length, bySlug.map((i) => i.slug).slice(0, 10).join(","));
console.log("  same Hebrew title       :", byHe.length, byHe.map((i) => i.he).slice(0, 10).join(" | "));
console.log("  same English title      :", byEn.length, byEn.map((i) => i.title).slice(0, 10).join(" | "));
console.log("  duplicate slugs WITHIN centers:", items.length - new Set(items.map((i) => i.slug)).size);
