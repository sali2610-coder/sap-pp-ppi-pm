import { edges, nodes, modelStats } from "@/components/neo-shell/erd/model";
const es = edges();
const self = es.filter((e) => e.parent === e.child);
console.log(JSON.stringify({
  ...modelStats(),
  selfRelations: self.map((e) => e.parent),
}, null, 1));
const want = ["T006","TC60","TCA01","CRFH","T134","T023","T399X","TCK03","T438M","T003O","TJ30","BUT000","TC22","TJ02T"];
const ns = nodes();
console.log("\nthe 14 repaired rows — edges each now participates in:");
for (const t of want) {
  const inModel = ns.has(t);
  const hits = es.filter((e) => e.parent === t || e.child === t);
  console.log(`  ${t.padEnd(7)} inModel=${inModel ? "yes" : "no "} edges=${hits.length}  ${hits.map((e) => `${e.child}->${e.parent}`).join(" ")}`);
}
