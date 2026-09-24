// Every transaction code with no overlay record, in the mandate's module order
// (PM, PP, PP-PI, MM, QM, WM/EWM, SD, FI/CO, PS, IBP/PP-DS, cross, then the
// technical modules), split into two queues: codes an official Simplification
// List names (a lead with a citation) and codes named by neither list (a
// documented negative search, never a verdict). Both are written as chain
// arguments in batches of 8 for scripts/workflows/enrich-chain.js.
//   node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/qa/gen-tx-queue-rest.mts
import { readFileSync, writeFileSync } from "node:fs";
import { txRegistry } from "@/lib/tx-registry";

const authored = new Set(
  [...(readFileSync("data/verification/transactions.ts", "utf8") + readFileSync("data/verification/transactions-b.ts", "utf8")).matchAll(/^\s{4}id:\s*"tx:([^"]+)"/gm)].map((m) => m[1]),
);
const index = JSON.parse(readFileSync("audit/master-completion/simpl-tcode-index.json", "utf8"));
const lists: Record<string, string> = Object.fromEntries(index.lists.map((l: any) => [l.key, l.release]));
const listNames = index.lists.map((l: any) => `${l.release} (document version ${l.version || "n/a"})`).join(", ");
const core = new Set(
  JSON.parse(readFileSync("audit/master-completion/tx-chain-args.json", "utf8")).batches.flatMap((b: any) => b.queue.map((q: any) => q.id.replace(/^tx:/, ""))),
);
const ORDER = ["PM", "PP", "PP-PI", "MM", "QM", "WM", "SD", "FI", "CO", "PS", "LE", "INTEGRATION", "FIORI", "BASIS", "ABAP", "SECURITY", "HR"];
const rank = (m: string) => { const i = ORDER.indexOf(m); return i < 0 ? ORDER.length : i; };
const STANDING = "Establish the ECC and S/4HANA On-Premise standing, the successor transaction or Fiori app only where an official source names it, and keep a code the item does not rule on at verification_required with the search on record.";
const reg = txRegistry();
type Row = { id: string; he: string; hint: string; module: string };
const named: Row[] = []; const rest: Row[] = [];
for (const [code, r] of reg) {
  if (authored.has(code) || core.has(code)) continue;
  const byList = index.codes[code] as Record<string, { item: string; title: string }[]> | undefined;
  const head = `Registry: module ${r.module}${r.area ? `, area '${r.area.slice(0, 80)}'` : ""}${r.en ? `, English title '${r.en}'` : ""}.`;
  if (byList) {
    const cites = Object.entries(byList).map(([k, items]) => `${lists[k] || k}: ${items.map((x) => `${x.item} '${x.title}'`).join("; ")}`).join(" | ");
    named.push({ id: `tx:${code}`, he: (r.he || "").slice(0, 180), module: r.module || "", hint: `${head} Named in the official Simplification Lists: ${cites}. A mention is a lead: read the item and state what it says about THIS code (replaced, removed, changed, or only listed), quoting it; the item title alone is not a verdict. ${STANDING}` });
  } else {
    rest.push({ id: `tx:${code}`, he: (r.he || "").slice(0, 180), module: r.module || "", hint: `${head} Named in neither official Simplification List (${listNames}): a documented negative search, not a verdict and not proof of availability. Search help.sap.com for the code and its English title in the S/4HANA On-Premise and the SAP_ERP scopes, and the Fiori Apps Library for a successor app. ${STANDING}` });
  }
}
const sortRows = (rows: Row[]) => rows.sort((a, b) => rank(a.module) - rank(b.module) || a.module.localeCompare(b.module) || a.id.localeCompare(b.id));
sortRows(named); sortRows(rest);
const chain = (rows: Row[], size: number) => {
  const batches = [] as { catalog: string; queue: Omit<Row, "module">[] }[];
  for (let i = 0; i < rows.length; i += size) batches.push({ catalog: "transactions", queue: rows.slice(i, i + size).map(({ module, ...q }) => q) });
  return batches;
};
const stamp = new Date().toISOString().slice(0, 10);
writeFileSync("audit/master-completion/tx-queue-rest.json", JSON.stringify({ generatedAt: stamp, named, rest }, null, 1));
writeFileSync("audit/master-completion/tx-chain-args-2.json", JSON.stringify({ accessedAt: stamp, batches: chain(named, 8) }, null, 1));
writeFileSync("audit/master-completion/tx-chain-args-3.json", JSON.stringify({ accessedAt: stamp, batches: chain(rest, 8) }, null, 1));
const byMod = (rows: Row[]) => { const o: Record<string, number> = {}; rows.forEach((r) => { o[r.module || "?"] = (o[r.module || "?"] || 0) + 1; }); return JSON.stringify(o); };
console.log(`named (after the ${core.size} core codes): ${named.length} ${byMod(named)}`);
console.log(`named by neither list: ${rest.length} ${byMod(rest)}`);
