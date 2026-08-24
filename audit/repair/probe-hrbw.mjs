import { HR_TABLES } from "@/data/hr-module";
import { BW_TABLES } from "@/data/bw-module";
import { VERIFIED_OBJECTS, LO_HU_DOMAIN } from "@/data/verified-objects";
const sample = (a) => a[0];
console.log("HR_TABLES", HR_TABLES.length, "BW_TABLES", BW_TABLES.length);
console.log("HR keys:", Object.keys(HR_TABLES[0]).join(","));
console.log("HR sample:", JSON.stringify(HR_TABLES[0]).slice(0, 900));
console.log("BW sample:", JSON.stringify(BW_TABLES[0]).slice(0, 700));
const agg = (a) => ({
  n: a.length,
  fields: a.reduce((s, t) => s + (t.fields || []).length, 0),
  rel: a.reduce((s, t) => s + (t.rel || []).length, 0),
  cds: a.reduce((s, t) => s + (t.cds || []).length, 0),
  funcs: a.reduce((s, t) => s + (t.funcs || []).length, 0),
  zones: [...new Set(a.map((t) => t.zone))],
  mods: [...new Set(a.map((t) => t.mod))],
});
console.log("HR agg", JSON.stringify(agg(HR_TABLES)));
console.log("BW agg", JSON.stringify(agg(BW_TABLES)));
console.log("VERIFIED sample:", JSON.stringify(VERIFIED_OBJECTS.find((o) => o.name === "VEKP")));
console.log("verified agg:", JSON.stringify({
  n: VERIFIED_OBJECTS.length,
  withTcodes: VERIFIED_OBJECTS.filter((o) => o.tcodes?.length).length,
  withUse: VERIFIED_OBJECTS.filter((o) => o.useCases?.length).length,
  withPpPi: VERIFIED_OBJECTS.filter((o) => o.ppPi).length,
  areas: [...new Set(VERIFIED_OBJECTS.map((o) => o.area))],
  domains: [...new Set(VERIFIED_OBJECTS.map((o) => o.domain).filter(Boolean))],
}));
console.log("LO_HU members:", LO_HU_DOMAIN.members.join(","));
