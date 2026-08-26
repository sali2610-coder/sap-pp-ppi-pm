import { ALL_TABLES } from "@/data/sapData";
const c = {};
let pkfk = [];
for (const t of ALL_TABLES) for (const f of t.fields) {
  const k = (f.key || "").trim(); c[k] = (c[k] || 0) + 1;
  if (k.includes("/")) pkfk.push(`${t.tableName}.${f.tech}`);
}
console.log(JSON.stringify(c), "\nPK/FK fields:", pkfk.length);
console.log(pkfk.slice(0, 12).join(" "));
