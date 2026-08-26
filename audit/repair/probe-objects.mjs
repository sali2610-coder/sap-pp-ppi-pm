import { ALL_TABLES } from "@/lib/data";
import { HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { verifiedNames, VERIFIED_OBJECTS } from "@/data/verified-objects";
import { tableNames } from "@/components/neo-shell/erd/model";

const bp = new Set(ALL_TABLES.map((t) => t.tableName));
const neo = new Set(tableNames());
const hr = new Set(HR_BW_NAMES);
const ver = new Set(verifiedNames());
const all = new Set([...bp, ...hr, ...ver]);

const missing = [...all].filter((n) => !neo.has(n));
const mHr = missing.filter((n) => hr.has(n));
const mVer = missing.filter((n) => ver.has(n) && !hr.has(n));
const mBp = missing.filter((n) => bp.has(n) && !hr.has(n) && !ver.has(n));

console.log(JSON.stringify({
  old_union: all.size,
  blueprint: bp.size,
  hr_bw: hr.size,
  verified: ver.size,
  neo_current: neo.size,
  missing_total: missing.length,
  missing_hr_bw: mHr.length,
  missing_verified: mVer.length,
  missing_blueprint_only: mBp.length,
  mVer, mBp,
  blueprint_and_verified: [...bp].filter((n) => ver.has(n)),
  verified_status_breakdown: VERIFIED_OBJECTS.reduce((a, o) => (a[o.status] = (a[o.status] || 0) + 1, a), {}),
}, null, 1));
