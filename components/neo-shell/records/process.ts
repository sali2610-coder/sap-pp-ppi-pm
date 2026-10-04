/* ============================================================================
   PROJECT NEO · /neo/process — a module topic as a business process.
   ----------------------------------------------------------------------------
   lib/object-intel processIntel(): every value is derived from the generated
   dataset (data/sapData) — the topic's tables with their Hebrew description,
   the T-Codes those tables name (first 16) and their BAPIs/functions (first
   12), exactly the lists the legacy page drew. The legacy family had no
   index; /neo/process/ lists the same processes so a record has a parent.
   ========================================================================== */

import { cleanFunc, listProcesses, processIntel } from "@/lib/object-intel";
import { funcHref, tableRef, txRef } from "./links";
import type { Block, Head, RecordData, RowGroup } from "./kit";

const BACK = { href: "/neo/process/", label: "תהליכי המודולים" };
const NOTE = "תהליך = נושא מודול במאגר";

export function processRecord(slug: string): RecordData | null {
  const x = processIntel(slug);
  if (!x) return null;
  const counts = `${x.tables.length} טבלאות · ${x.tcodes.length} טרנזקציות · ${x.bapis.length} BAPI/FM בתהליך ${x.title}.`;
  return {
    title: `${x.title} · ${x.module}`,
    foot: "מקור: נגזר ממאגר הטבלאות של הפרויקט.",
    description: counts,
    head: {
      back: BACK,
      eyebrow: `Business Process · ${x.module}`,
      h1: x.title,
      en: x.slug,
      lede: `${NOTE}: ${counts}`,
      tags: [x.module],
    },
    blocks: [
      { t: "ids", title: "טבלאות מקושרות", count: x.tables.length, items: x.tables.map((t) => tableRef(t.name, t.he)), empty: "אין טבלאות מקושרות במאגר." },
      ...(x.tcodes.length ? [{ t: "ids", title: "T-Codes", count: x.tcodes.length, items: x.tcodes.map((c) => txRef(c)) } as Block] : []),
      ...(x.bapis.length ? [{
        t: "ids", title: "BAPIs / Functions", count: x.bapis.length,
        items: x.bapis.map((b) => ({ label: cleanFunc(b), href: funcHref(b) })),
      } as Block] : []),
    ],
  };
}

export const processParams = (): string[] => listProcesses().map((p) => p.slug);

export function processesIndex(): { head: Head; groups: RowGroup[] } {
  const all = listProcesses();
  return {
    head: {
      back: { href: "/neo/domain-model/", label: "תחומים עסקיים" },
      eyebrow: "Business Process",
      h1: "תהליכי המודולים",
      lede: `${all.length} תהליכים. ${NOTE}: הטבלאות שלו, הטרנזקציות שהן מפנות אליהן וה-BAPI/FM שלהן.`,
    },
    groups: [...new Set(all.map((p) => p.module))].map((m) => ({
      title: m,
      rows: all.filter((p) => p.module === m).map((p) => ({
        href: `/neo/process/${p.slug}/`,
        he: p.title,
        en: p.slug,
        tags: [p.module],
        meta: `${p.count} טבלאות`,
      })),
    })),
  };
}
