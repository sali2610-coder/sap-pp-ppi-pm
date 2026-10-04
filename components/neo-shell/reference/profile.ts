/* ============================================================================
   PROJECT NEO · THE REFERENCE DIRECTORIES — the object profile.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time. lib/object-profile is the project's
   consultant profile of an object in twelve dimensions, each flagged as
   verified (read from the record) or general (true of the whole object class,
   data/kind-intel). The legacy CDS and IDoc pages printed it in full; here it is
   one folded section, its trust marks kept and its links resolved to NEO routes
   only — a related name the project has no NEO page for stays a plain value.
   ========================================================================== */

import { buildProfile } from "@/lib/object-profile";
import type { ProfileKind } from "@/data/kind-intel";
import { bapiHref, cdsHref, idocHref, objectHref, txHref } from "./ref-links";
import type { RefSection, RefStatus } from "./types";

const VERIFIED: RefStatus = { he: "אומת", color: "var(--status-done)" };
const GENERAL: RefStatus = { he: "ידע כללי", color: "var(--status-in-analysis)" };
const mark = (verified: boolean): RefStatus => (verified ? VERIFIED : GENERAL);

/** The NEO page of a related name, chosen by the family its legacy link named;
 *  a name the legacy page could not link is tried against every family. */
function neoHref(name: string, legacy?: string): string | null {
  switch ((legacy || "").split("/")[1]) {
    case "object": return objectHref(name);
    case "tcode": return txHref(name);
    case "cds": return cdsHref(name);
    case "idoc": return idocHref(name);
    case "bapi": return bapiHref(name);
    default: return objectHref(name) || txHref(name) || bapiHref(name) || idocHref(name) || cdsHref(name);
  }
}

export function profileSection(name: string, kind: ProfileKind): RefSection | null {
  const p = buildProfile(name, kind);
  if (!p) return null;
  const related = p.related.map((r) => ({ t: r.name, href: neoHref(r.name, r.href) }));
  return {
    id: "profile",
    icon: "bookOpen",
    title: "תבונת אובייקט · מדריך יועץ בכיר",
    fold: "מה, למה, מי ומתי, מחזור חיים, תלויות, תקלות, שאלות ראיון ודוגמאות",
    facts: [
      { label: "מה זה", text: p.what.text, status: mark(p.what.verified) },
      { label: "למה קיים", text: p.why.text, status: mark(p.why.verified) },
      { label: "מי משתמש", text: p.who },
      { label: "מתי משתמשים", text: p.when },
      { label: "מחזור חיים", text: p.lifecycle },
      { label: "תלויות", bullets: p.dependencies, absent: "אין תלויות מתועדות במאגר." },
      { label: "אובייקטים קשורים", codes: related.length ? related : undefined, absent: "אין אובייקטים קשורים במאגר." },
      { label: "פתרון תקלות נפוץ", bullets: p.troubleshooting },
      { label: "שאלות ראיון", steps: p.interview },
      { label: "ECC מול S/4HANA", text: p.eccS4.text, status: mark(p.eccS4.verified) },
      { label: "דוגמה — אחזקה (PM)", text: p.pmExample.text, status: mark(p.pmExample.verified) },
      { label: "דוגמה — ייצור (PP/PP-PI)", text: p.ppExample.text, status: mark(p.ppExample.verified) },
    ],
  };
}
