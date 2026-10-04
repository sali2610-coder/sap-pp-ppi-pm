/* PROJECT NEO · which T-Codes have a /neo/transactions/<CODE>/ page.
   SERVER ONLY. Kept apart from blocks.ts so a surface that only needs to know
   whether a transaction page exists (ref-links, search) can ask without
   loading the legacy pages' data modules. */

import { listTcodes } from "@/lib/object-intel";
import { registryCodes } from "@/lib/tx-registry";

/** "ECC" stands in the blueprint's T-Code column (BUT000) as a release name.
 *  It is not a transaction and gets no page. */
const NOT_A_TX = new Set(["ECC"]);

let _bp: string[] | null = null;
/** Codes the PM / PP-PI blueprint lists on a table that the canonical registry
 *  does not carry. They get a page that says so. */
export function blueprintOnlyCodes(): string[] {
  if (_bp) return _bp;
  const reg = new Set(registryCodes());
  _bp = listTcodes().filter((c) => !reg.has(c) && !NOT_A_TX.has(c)).sort();
  return _bp;
}

let _pages: Set<string> | null = null;
/** Does /neo/transactions/<code>/ exist? The registry plus the blueprint-only
 *  codes: exactly the list the route generates. */
export const hasTxPage = (code: string): boolean =>
  (_pages ??= new Set([...registryCodes(), ...blueprintOnlyCodes()])).has(code.trim().toUpperCase());
