// The remaining function registry ids, ordered for research, each with a hint
// built only from what the repository and the official lists already say.
//   node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/qa/gen-function-queue.mts
import { readFileSync, writeFileSync } from "node:fs";
import { registry } from "@/lib/bapi-registry";
import { FUNCTION_INTEL } from "@/data/function-intel";

const src = ["functions"].map((f) => readFileSync(`data/verification/${f}.ts`, "utf8")).join("\n");
const authored = new Set([...src.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)].map((m) => m[1]));
const simpl = JSON.parse(readFileSync("audit/master-completion/simpl-functions-index.json", "utf8")).codes;
const ORDER: Record<string, number> = { PM: 0, "PP-PI": 1, PP: 2 };
const rows = registry()
  .filter((o: any) => o.objectType !== "IDoc" && FUNCTION_INTEL[o.id]?.kind !== "concept")
  .filter((o: any) => !authored.has(`fm:${o.id}`))
  .map((o: any) => {
    const mods = [...new Set([o.module, FUNCTION_INTEL[o.id]?.module].filter(Boolean))];
    const named = simpl[o.id] ? Object.entries(simpl[o.id]).map(([k, v]: any) => `${k}: ${v.map((x: any) => `${x.item} '${x.title}'`).join("; ")}`).join(" | ") : "";
    const hint = [
      `Registry: ${o.objectType || "function"}${mods.length ? `, module ${mods.join("/")}` : ""}.`,
      o.tables?.length ? `Repository tables: ${o.tables.slice(0, 8).join(", ")}.` : "",
      o.transactions?.length ? `Repository transactions: ${o.transactions.slice(0, 8).join(", ")}.` : "",
      named ? `Named in the official Simplification Lists: ${named}. A mention is a lead: read the item before using it as a verdict.` : "Named in neither official Simplification List (2025 FPS01, 2023 FPS03); a documented negative, not proof of availability.",
      "Establish: official name and purpose, released or not, RFC-enabled, the parameter contract where an official page prints it, commit/rollback behaviour, ECC and S/4HANA standing, and a released successor (OData/CDS/Fiori) only when a source names it. A name that no official record prints stays verification_required; never assert non-existence.",
    ].filter(Boolean).join(" ");
    return { id: `fm:${o.id}`, he: (o.shortDescriptionHe || "").slice(0, 180), hint, _rank: Math.min(...mods.map((m) => ORDER[m] ?? 3), 3) };
  })
  .sort((a, b) => a._rank - b._rank || a.id.localeCompare(b.id))
  .map(({ _rank, ...r }) => r);
writeFileSync("audit/master-completion/function-queue.json", JSON.stringify(rows, null, 1));
console.log(`${rows.length} function ids without a record; first six:`, rows.slice(0, 6).map((r) => r.id).join(", "));
