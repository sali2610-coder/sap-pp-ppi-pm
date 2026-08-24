import { s4ObjectTotals, transformTotals, migTotals, s4Readiness } from "@/components/neo-shell/s4/s4-data";
console.log("s4ObjectTotals", JSON.stringify(s4ObjectTotals(), null, 1));
console.log("transformTotals", JSON.stringify(transformTotals()));
console.log("migTotals", JSON.stringify(migTotals()));
const r = s4Readiness();
console.log("readiness", JSON.stringify({ available: r.available, tables: r.tables, overall: r.overall, mods: r.mods.length, bands: r.bands, highRisk: r.highRisk }));
