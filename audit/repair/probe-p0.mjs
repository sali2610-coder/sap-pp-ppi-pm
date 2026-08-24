const out = {};
const tryLoad = async (label, fn) => { try { out[label] = await fn(); } catch (e) { out[label] = "ERR: " + e.message.slice(0, 120); } };

await tryLoad("domains", async () => {
  const m = await import("@/data/domains");
  const d = await import("@/data/domain-detail");
  const slugs = m.DOMAINS.map((x) => x.slug);
  const det = Object.keys(d.DOMAIN_DETAIL);
  return {
    DOMAINS: m.DOMAINS.length,
    byModule: m.DOMAINS.reduce((a, x) => (a[x.module] = (a[x.module] || 0) + 1, a), {}),
    DOMAIN_DETAIL: det.length,
    slugs_without_detail: slugs.filter((s) => !det.includes(s)),
    detail_without_domain: det.filter((s) => !slugs.includes(s)),
    exports_domains: Object.keys(m), exports_detail: Object.keys(d),
    flowSteps: m.DOMAINS.reduce((a, x) => a + x.flow.length, 0),
    tables: new Set(m.DOMAINS.flatMap((x) => x.tables)).size,
    tcodes: new Set(m.DOMAINS.flatMap((x) => x.tcodes)).size,
    bapis: new Set(m.DOMAINS.flatMap((x) => x.bapis)).size,
    trouble: m.DOMAINS.reduce((a, x) => a + x.trouble.length, 0),
    learning: m.DOMAINS.reduce((a, x) => a + x.learning.length, 0),
  };
});

await tryLoad("migration_cockpit", async () => {
  const m = await import("@/data/migration-cockpit");
  const ecc = new Set(m.MIG_OBJECTS.flatMap((o) => o.ecc));
  return {
    exports: Object.keys(m),
    MIG_OBJECTS: m.MIG_OBJECTS.length,
    byCat: m.MIG_OBJECTS.reduce((a, o) => (a[o.cat] = (a[o.cat] || 0) + 1, a), {}),
    unique_ecc_tables: ecc.size,
    total_ecc_refs: m.MIG_OBJECTS.reduce((a, o) => a + o.ecc.length, 0),
    ...Object.fromEntries(Object.entries(m).filter(([k, v]) => Array.isArray(v)).map(([k, v]) => ["len_" + k, v.length])),
  };
});

for (const [label, path] of [["s4_objects", "@/data/s4-objects"], ["s4_architecture", "@/data/s4-architecture"], ["s4_transformation", "@/data/s4-transformation"], ["ecc_s4", "@/data/ecc-s4"], ["s4_impact", "@/data/s4-impact"], ["domain_model", "@/data/domain-model"]]) {
  await tryLoad(label, async () => {
    const m = await import(path);
    const r = { exports: Object.keys(m) };
    for (const [k, v] of Object.entries(m)) {
      if (Array.isArray(v)) r["len_" + k] = v.length;
      else if (v && typeof v === "object") r["keys_" + k] = Object.keys(v).length;
    }
    return r;
  });
}
console.log(JSON.stringify(out, null, 1));
