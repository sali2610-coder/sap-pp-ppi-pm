// The transaction codes an official Simplification List names but no overlay
// record covers yet, ordered PM, PP-PI, PP, then the rest, each with a hint
// built only from the registry and the official-list index. A mention is a
// lead, never a verdict: the hint says which item to read.
//   node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/qa/gen-tx-queue.mts
import { readFileSync, writeFileSync } from "node:fs";
import { txRegistry } from "@/lib/tx-registry";

const authored = new Set(
  [...(readFileSync("data/verification/transactions.ts", "utf8") + readFileSync("data/verification/transactions-b.ts", "utf8")).matchAll(/^\s{4}id:\s*"tx:([^"]+)"/gm)].map((m) => m[1]),
);
const index = JSON.parse(readFileSync("audit/master-completion/simpl-tcode-index.json", "utf8"));
const lists: Record<string, string> = Object.fromEntries(index.lists.map((l: any) => [l.key, l.release]));
const ORDER: Record<string, number> = { PM: 0, "PP-PI": 1, PP: 2 };
const reg = txRegistry();
const rows = Object.entries(index.codes as Record<string, Record<string, { item: string; title: string }[]>>)
  .filter(([code]) => !authored.has(code))
  .map(([code, byList]) => {
    const r = reg.get(code);
    const named = Object.entries(byList)
      .map(([k, items]) => `${lists[k] || k}: ${items.map((x) => `${x.item} '${x.title}'`).join("; ")}`)
      .join(" | ");
    const hint = [
      r ? `Registry: module ${r.module}${r.area ? `, area '${r.area.slice(0, 80)}'` : ""}${r.en ? `, English title '${r.en}'` : ""}.` : "",
      `Named in the official Simplification Lists: ${named}. A mention is a lead: read the item and state what it says about THIS code (replaced, removed, changed, or only listed), quoting it; the item title alone is not a verdict.`,
      "Establish the ECC and S/4HANA On-Premise standing, the successor transaction or Fiori app only where an official source names it, and keep a code the item does not rule on at verification_required with the search on record.",
    ].filter(Boolean).join(" ");
    return { id: `tx:${code}`, he: (r?.he || "").slice(0, 180), hint, module: r?.module || "", _rank: ORDER[r?.module || ""] ?? 3 };
  })
  .sort((a, b) => a._rank - b._rank || a.module.localeCompare(b.module) || a.id.localeCompare(b.id))
  .map(({ _rank, ...r }) => r);
writeFileSync("audit/master-completion/tx-queue.json", JSON.stringify(rows, null, 1));
const byMod: Record<string, number> = {};
rows.forEach((r) => { byMod[r.module || "?"] = (byMod[r.module || "?"] || 0) + 1; });
console.log(`${rows.length} named transaction codes without a record`, JSON.stringify(byMod));
