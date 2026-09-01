/* ============================================================================
   PROJECT NEO · EVIDENCE FOUNDATION — the unified S/4HANA status.
   ----------------------------------------------------------------------------
   PURE MODULE (type imports only; see types.ts header).

   ONE mapping from every legacy vocabulary the repository already carries to
   the unified S4Status. Every derived claim:
     · edition "on-premise" (the MANIFEST's declared primary context)
     · release null, source null
     · derivedFrom set, an explanation that names its origin
     · NEVER a successor read from prose. Only structured successors are
       carried (lifecycle.alt as a bare code, tx supersededBy passed in by the
       builder, the blueprint's s4AltTable when it is a bare table name).
   The overlay-only statuses (compatibility_scope, simplified,
   released_api_available) are never emitted here.

   A value outside a vocabulary throws: a silent default would be a verdict
   nobody wrote.
   ========================================================================== */

import type {
  CanonicalId, DerivedSource, Edition, Evidence, S4Status, S4StatusClaim, VerificationLevel,
} from "./types";

const ON_PREM: Edition = "on-premise";

/* Same regexes as canonical.ts ID_SYNTAX.tx / .table. Duplicated on purpose
   (pure module); test/s4-status.test.ts asserts they agree. */
const BARE_TX = /^[A-Z0-9_\/]{2,20}$/;
const BARE_TABLE = /^[A-Z0-9_\/]{2,30}$/;

/** The recommended action per unified status. Hebrew, one sentence each. */
export const ACTION_HE: Record<S4Status, string> = {
  s4_native: "אובייקט S/4HANA ללא מקבילה ישירה ב-ECC; לתעד את הסצנריו שבו הוא נכנס לשימוש.",
  unchanged: "ניתן להמשיך להשתמש; לאמת מול תיעוד SAP לפני החלטת מעבר.",
  changed: "לבדוק את השינוי מול תיעוד SAP ולעדכן קוד, ממשקים ובדיקות בהתאם.",
  simplified: "לקרוא את פריט הפישוט הרשמי ולבצע את בדיקות הקוד המותאם שהוא מגדיר.",
  replaced: "לעבור לאובייקט העוקב; לבדוק קוד מותאם וממשקים שנשענים על האובייקט הישן.",
  restricted: "לא לשימוש כממשק אינטגרציה; לבחור BAPI או API משוחרר.",
  deprecated: "לא לבנות פיתוח חדש על האובייקט; לתכנן מעבר לחלופה.",
  not_available: "אין להסתמך על האובייקט ב-S/4HANA; לזהות חלופה מתועדת.",
  compatibility_scope: "האובייקט זמין בהיקף תאימות בלבד; לתכנן יציאה ממנו בהתאם לתיעוד SAP.",
  fiori_alternative_available: "לשקול את חלופת ה-Fiori לתרחישים חדשים; מסך ה-SAP GUI ממשיך לפעול.",
  released_api_available: "להעדיף את ה-API המשוחרר לאינטגרציות חדשות.",
  legacy_ecc_only: "רלוונטי ל-ECC בלבד; לזהות את המקבילה ב-S/4HANA.",
  verification_required: "נדרש אימות מול תיעוד SAP או מערכת S/4HANA לפני החלטה.",
  not_applicable: "השם אינו אובייקט SAP תקני; לתקן את ההפניה במאגר.",
};

function claim(status: S4Status, from: DerivedSource, he: string, extra: Partial<S4StatusClaim> = {}): S4StatusClaim {
  return {
    status,
    he,
    edition: ON_PREM,
    release: null,
    source: null,
    recommendedAction: ACTION_HE[status],
    derivedFrom: from,
    ...extra,
  };
}

const bare = (raw: string | undefined, re: RegExp): string | null => {
  const s = (raw || "").trim().toUpperCase();
  return s && re.test(s) ? s : null;
};

const unmapped = (fn: string, v: unknown): never => {
  throw new Error(`${fn}: value outside the vocabulary: ${JSON.stringify(v)}`);
};

/* ------------------------------------------------------------- mappers */

/** lib/s4-class: the blueprint's own verdict. `altTable` is only carried when
 *  it is a bare table name (the PM blueprint writes prose in that column). */
export function fromBlueprintClass(k: 0 | 1 | 2 | 3 | null, altTable?: string): S4StatusClaim {
  const origin = "לפי עמודת S/4HANA בתיעוד המקור (blueprint)";
  switch (k) {
    case 0: return claim("unchanged", "blueprint", `${origin}: ללא שינוי`);
    case 1: return claim("changed", "blueprint", `${origin}: מותאם`);
    case 2: {
      const alt = bare(altTable, BARE_TABLE);
      return claim("replaced", "blueprint", `${origin}: הוחלף`, alt ? { successor: `table:${alt}` } : {});
    }
    case 3: return claim("not_available", "blueprint", `${origin}: הוסר`);
    case null: return claim("verification_required", "blueprint", `${origin}: לא הוכרע במקור`);
  }
  return unmapped("fromBlueprintClass", k);
}

/** lib/s4 trust → verification tier only (no status). */
export function fromS4Trust(trust: "verified" | "partial" | "needs"): VerificationLevel {
  switch (trust) {
    case "verified": return "repository_verified";
    case "partial": return "repository_verified";
    case "needs": return "verification_required";
  }
  return unmapped("fromS4Trust", trust);
}

/** data/s4-objects. `release` is a structured field there ("S/4 1511") and is
 *  the one derived value allowed to carry a release. */
export function fromS4Object(
  status: "stays" | "changed" | "replaced" | "removed",
  release?: string,
  trust?: "curated" | "needs-verification",
): S4StatusClaim {
  const map: Record<string, S4Status> = { stays: "unchanged", changed: "changed", replaced: "replaced", removed: "not_available" };
  const s = map[status];
  if (!s) return unmapped("fromS4Object", status);
  const rel = (release || "").trim() || null;
  const he = `לפי קטלוג אובייקטי ה-S/4HANA של הפרויקט: ${status}${rel ? ` (${rel})` : ""}`;
  return claim(s, "s4-objects", he, { release: rel, inferred: trust === "needs-verification" || undefined });
}

/** data/lifecycle. Map ONLY an explicit record, never the DEFAULT fallback:
 *  the caller must not pass lifecycle(code) for a code that is absent. */
export function fromLifecycle(l: {
  status: "Active" | "Deprecated" | "Obsolete"; ecc: boolean; s4: boolean; alt?: string; fiori?: string;
}): S4StatusClaim {
  const origin = "לפי שכבת מחזור החיים של הטרנזקציה בפרויקט";
  const alt = bare(l.alt, BARE_TX);
  const succ: Partial<S4StatusClaim> = alt ? { successor: `tx:${alt}` } : {};
  const fiori = (l.fiori || "").trim();
  const flag: Partial<S4StatusClaim> = fiori && fiori !== "—" ? { secondary: ["fiori_alternative_available"] } : {};
  switch (l.status) {
    case "Active":
      if (l.s4 && l.ecc) return claim("unchanged", "lifecycle", `${origin}: פעיל ב-ECC וב-S/4HANA`, flag);
      if (l.s4 && !l.ecc) return claim("s4_native", "lifecycle", `${origin}: פעיל ב-S/4HANA בלבד`, flag);
      return claim("legacy_ecc_only", "lifecycle", `${origin}: פעיל ב-ECC בלבד`, flag);
    case "Deprecated":
      return claim("deprecated", "lifecycle", `${origin}: לא אסטרטגי`, { ...succ, ...flag });
    case "Obsolete":
      return l.s4
        ? claim("deprecated", "lifecycle", `${origin}: הוסר מהמסלול המומלץ אך עדיין קיים`, { ...succ, ...flag })
        : claim("not_available", "lifecycle", `${origin}: הוסר ב-S/4HANA`, { ...succ, ...flag });
  }
  return unmapped("fromLifecycle", l.status);
}

/** data/ecc-s4 ChangeStatus. */
export function fromChangeStatus(s: "Unchanged" | "Changed" | "Replaced" | "Deprecated"): S4StatusClaim {
  const map: Record<string, S4Status> = { Unchanged: "unchanged", Changed: "changed", Replaced: "replaced", Deprecated: "deprecated" };
  const st = map[s];
  if (!st) return unmapped("fromChangeStatus", s);
  return claim(st, "ecc-s4", `לפי נושא ההשוואה ECC מול S/4HANA במאגר: ${s}`);
}

/** components/neo-shell/data/tx-detail disposition. The successor, when the
 *  builder has one, is the already-resolved `tx:` id of supersededBy[0]. */
export function fromTxDisposition(
  d: "superseded" | "changed" | "available" | "unknown",
  trust: "verified" | "partial" | "needs",
  successor?: CanonicalId,
): S4StatusClaim {
  const TRUST_HE: Record<string, string> = { verified: "מאומת", partial: "חלקי", needs: "נדרש אימות" };
  if (!(trust in TRUST_HE)) return unmapped("fromTxDisposition.trust", trust);
  const origin = `לפי רשומת הטרנזקציה במאגר (tx-intel); רמת אמון: ${TRUST_HE[trust]}`;
  const inferred = trust === "needs" || undefined;
  switch (d) {
    case "superseded": return claim("replaced", "tx-intel", `${origin}: קיימת טרנזקציה עוקבת`, { successor, inferred });
    case "changed": return claim("changed", "tx-intel", `${origin}: משתנה ב-S/4HANA`, { inferred });
    case "available": return claim("unchanged", "tx-intel", `${origin}: זמינה ב-S/4HANA`, { inferred });
    case "unknown": return claim("verification_required", "tx-intel", `${origin}: לא קיים תיעוד מאומת במאגר`, { inferred });
  }
  return unmapped("fromTxDisposition", d);
}

/** lib/bapi-registry. */
export function fromFuncRegistry(o: {
  verificationStatus: string; s4OnPremSupport: string; cloudSupport: string; stability: string;
  releasedStatus?: string; verificationSource?: string;
}): { status: S4StatusClaim; level: VerificationLevel } {
  const VS_HE: Record<string, string> = {
    "verified-system": "אומת במערכת SAP",
    "verified-docs": "אומת מול תיעוד SAP",
    "requires-verification": "נדרש אימות במערכת SAP",
    "version-dependent": "תלוי גרסה",
    "internal-unsupported": "מודול פונקציה פנימי",
    "invalid-name": "השם אינו אובייקט SAP תקני",
    deprecated: "הוצא משימוש",
  };
  const TRI_HE: Record<string, string> = { yes: "כן", no: "לא", unknown: "לא צוין" };
  const vs = o.verificationStatus;
  if (!(vs in VS_HE)) return unmapped("fromFuncRegistry", vs);
  if (!(o.s4OnPremSupport in TRI_HE)) return unmapped("fromFuncRegistry.s4OnPremSupport", o.s4OnPremSupport);

  let status: S4Status;
  if (o.s4OnPremSupport === "no") status = "not_available";
  else if (vs === "verified-docs" || vs === "verified-system") status = o.s4OnPremSupport === "yes" ? "unchanged" : "verification_required";
  else if (vs === "version-dependent") status = "changed";
  else if (vs === "internal-unsupported") status = "restricted";
  else if (vs === "deprecated") status = "deprecated";
  else if (vs === "invalid-name") status = "not_applicable";
  else status = "verification_required";

  const level: VerificationLevel =
    vs === "requires-verification" || status === "verification_required" ? "verification_required" : "repository_verified";
  const he =
    `לפי רישום אובייקטי הפונקציה של הפרויקט: ${VS_HE[vs]}; תמיכה ב-S/4HANA On-Premise: ${TRI_HE[o.s4OnPremSupport]}` +
    (o.releasedStatus ? `; ${o.releasedStatus}` : "");
  return { status: claim(status, "bapi-registry", he, { inferred: level === "verification_required" || undefined }), level };
}

/** lib/fiori/types Trust → tier. The record status itself is s4_native. */
export function fromFioriTrust(t: "verified-docs" | "curated" | "needs-review", hasUrl: boolean): VerificationLevel {
  switch (t) {
    case "verified-docs": return hasUrl ? "sap_official_verified" : "repository_verified";
    case "curated": return "repository_verified";
    case "needs-review": return "verification_required";
  }
  return unmapped("fromFioriTrust", t);
}

/** data/cds-enrichment. "verified" there carries templated source strings, not
 *  URLs, so it can never become sap_official_verified here. */
export function fromCdsEnrichment(e?: { verified?: string; sources?: string[] }): { status: S4StatusClaim; level: VerificationLevel } {
  const v = e?.verified;
  if (v !== undefined && v !== "verified" && v !== "needs-verification") return unmapped("fromCdsEnrichment", v);
  const level: VerificationLevel = v === "verified" ? "repository_verified" : "verification_required";
  const tail = !e
    ? "ללא רשומת העשרה"
    : v === "verified"
      ? "רשומת ההעשרה מסומנת כמאומתת במאגר (ללא קישור לתיעוד רשמי)"
      : "רשומת ההעשרה מסומנת כנדרש אימות";
  return {
    status: claim("s4_native", "cds-enrichment", `תצוגת CDS של S/4HANA לפי מיפוי הפרויקט; ${tail}`, {
      inferred: level === "verification_required" || undefined,
    }),
    level,
  };
}

/** The structured EccS4 block (exits, transactions, domain-detail, guides).
 *  `inferred` keeps the status readable but drops the tier. */
export function fromEccS4Block(
  b: { unchanged?: string; changed?: string; replaced?: string; deprecated?: string; fiori?: string; cds?: string },
  opts: { inferred?: boolean } = {},
): S4StatusClaim {
  const has = (s?: string) => !!(s || "").trim();
  const origin = "לפי בלוק ECC מול S/4HANA ברשומה";
  const extra: Partial<S4StatusClaim> = {
    ...(has(b.fiori) ? { secondary: ["fiori_alternative_available"] } : {}),
    ...(opts.inferred ? { inferred: true } : {}),
  };
  if (has(b.deprecated)) return claim("deprecated", "eccs4-block", `${origin}: קיימת הערת הסרה`, extra);
  if (has(b.replaced)) return claim("replaced", "eccs4-block", `${origin}: קיימת הערת החלפה`, extra);
  if (has(b.changed)) return claim("changed", "eccs4-block", `${origin}: קיימת הערת שינוי`, extra);
  if (has(b.unchanged)) return claim("unchanged", "eccs4-block", `${origin}: הערת "ללא שינוי" בלבד`, extra);
  return claim("verification_required", "eccs4-block", `${origin}: הבלוק ריק`, extra);
}

/** data/verified-objects VStatus. */
export function fromVStatus(s: "verified" | "needs-review" | "cross-module" | "s4-only" | "ecc-only"): S4StatusClaim {
  const origin = "לפי רישום האובייקטים המאומתים של הפרויקט";
  switch (s) {
    case "s4-only": return claim("s4_native", "verified-objects", `${origin}: S/4HANA בלבד`);
    case "ecc-only": return claim("legacy_ecc_only", "verified-objects", `${origin}: ECC בלבד`);
    case "verified": return claim("unchanged", "verified-objects", `${origin}: מאומת`);
    case "cross-module": return claim("unchanged", "verified-objects", `${origin}: אובייקט חוצה מודולים`);
    case "needs-review": return claim("verification_required", "verified-objects", `${origin}: נדרשת סקירה`, { inferred: true });
  }
  return unmapped("fromVStatus", s);
}

/** data/migration-cockpit Trust → tier only. */
export function fromCockpitTrust(t: "curated" | "needs-verification"): VerificationLevel {
  switch (t) {
    case "curated": return "repository_verified";
    case "needs-verification": return "verification_required";
  }
  return unmapped("fromCockpitTrust", t);
}

/** A record whose whole existence is S/4HANA (a Fiori app, a CDS view). */
export function S4_NATIVE_DERIVED(from: DerivedSource, inferred = false): S4StatusClaim {
  return claim("s4_native", from, "אובייקט S/4HANA לפי רשומת המקור במאגר", inferred ? { inferred: true } : {});
}

/* ------------------------------------------------------------- choosing */

/** Authored wins; a derived fallback keeps its derivedFrom. */
export function pickStatus(authored: S4StatusClaim | undefined, derived: S4StatusClaim): S4StatusClaim {
  return authored ?? derived;
}

/** The tier a derived claim earns on its own: the repository is its source. */
export function derivedLevel(c: S4StatusClaim): VerificationLevel {
  return c.status === "verification_required" || c.inferred ? "verification_required" : "repository_verified";
}

export const LEVEL_RANK: Record<VerificationLevel, number> = {
  sap_official_verified: 5,
  repository_verified: 4,
  supported_secondary_source: 3,
  legacy_context_only: 2,
  verification_required: 1,
  conflicting_sources: 0,
};

/** Best tier present; any recorded conflict → conflicting_sources; none →
 *  verification_required. */
export function levelOf(evidence: Evidence[]): VerificationLevel {
  if (!evidence || evidence.length === 0) return "verification_required";
  if (evidence.some((e) => (e.conflictingEvidence?.length ?? 0) > 0 || e.verificationLevel === "conflicting_sources")) {
    return "conflicting_sources";
  }
  let best: VerificationLevel = "verification_required";
  for (const e of evidence) if (LEVEL_RANK[e.verificationLevel] > LEVEL_RANK[best]) best = e.verificationLevel;
  return best;
}
