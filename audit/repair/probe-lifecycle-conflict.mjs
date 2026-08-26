import { LIFECYCLE } from "@/data/lifecycle";
import { txDetail, txDetailCodes } from "@/components/neo-shell/data/tx-detail";

const codes = txDetailCodes();
const have = new Set(codes.map((c) => c.toUpperCase()));
const lc = Object.keys(LIFECYCLE);

/* lifecycle.ts says a code is GONE in S/4 (s4:false).
   tx-intel says a code is available (disposition superseded/changed/unchanged
   rather than "removed"). Where both speak, do they agree? */
const rows = [];
for (const code of lc) {
  const L = LIFECYCLE[code];
  const d = have.has(code) ? txDetail(code) : null;
  const dispo = d?.s4?.disposition ?? null;
  const note = d?.s4?.note ?? "";
  rows.push({ code, lcStatus: L.status, lcS4: L.s4, dispo, saysLegacyOrAvailable: /legacy|זמינ/i.test(note), onNeoPage: !!d });
}
const gone = rows.filter((r) => r.lcS4 === false);
const contested = gone.filter((r) => r.onNeoPage && r.dispo && r.dispo !== "removed");
const agree = gone.filter((r) => r.onNeoPage && r.dispo === "removed");
const silent = gone.filter((r) => !r.onNeoPage);

console.log(JSON.stringify({
  lifecycleEntries: lc.length,
  markedGoneInS4: gone.length,
  ofThose_haveNeoPage: gone.filter((r) => r.onNeoPage).length,
  AGREE_neoAlsoSaysRemoved: agree.length,
  CONTESTED_neoSaysAvailableOrChanged: contested.length,
  noNeoPage: silent.length,
  contestedCodes: contested.map((r) => `${r.code}(${r.lcStatus} vs ${r.dispo}${r.saysLegacyOrAvailable ? "/legacy" : ""})`),
  statusBreakdown: rows.reduce((a, r) => (a[r.lcStatus] = (a[r.lcStatus] || 0) + 1, a), {}),
}, null, 1));
