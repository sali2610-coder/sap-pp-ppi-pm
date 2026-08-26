/* ============================================================================
   PROJECT NEO · CENTERS — one registry over eleven validated datasets
   ----------------------------------------------------------------------------
   WHAT THIS REPLACES, AND WHY IT IS NOT A REWRITE

     The legacy app had eleven routes — /manufacturing/, /authorizations/,
     /toolkit/, /playbooks/, /migration/, /integration/, /config/, /debugging/,
     /abap/, /blueprints/, /fiori/ — that all rendered the SAME two components
     (CenterHeader + CenterIndexGrid) over a different dataset. Measured, each
     weighed an identical 16KB because they shared those components, not
     because each was 16KB of unique work.

     So this is not eleven migrations. It is one surface over eleven datasets.

   THE RULE THIS FILE EXISTS TO ENFORCE

     A shared template is allowed. Loss of information is not.

     Nothing here reshapes, trims, summarises or re-authors a CenterItem. The
     registry only ADDRESSES them — it adds a `family` so two datasets may reuse
     a slug, and it counts. Every field the legacy detail page rendered
     (sections of all five types, tone, tag, module, accent, eccS4) travels
     through untouched and is rendered by the NEO detail route.

   SLUG COLLISION IS REAL

     Legacy addressed items as /<family>/<slug>/, so slugs are only unique
     WITHIN a dataset. Flattening to /neo/centers/<slug>/ would silently drop
     whichever item lost the collision. Addressing is /<family>/<slug>/ here for
     the same reason it was there.
   ========================================================================== */

import type { CenterItem } from "@/components/topic-center";

import { ABAP_TOOLS } from "@/data/centers/abap";
import { BLUEPRINTS } from "@/data/centers/blueprints";
import { CONFIG_TOPICS } from "@/data/centers/config";
import { DEBUGGINGS } from "@/data/centers/debugging";
import { FIORI_APPS as FIORI_CENTER } from "@/data/centers/fiori";
import { INTEGRATIONS } from "@/data/centers/integration";
import { MFG_SCENARIOS } from "@/data/centers/manufacturing";
import { MIGRATIONS } from "@/data/centers/migration";
import { PLAYBOOKS } from "@/data/centers/playbooks";
import { PROCESS_AUTH } from "@/data/centers/process-auth";
import { TOOLKIT } from "@/data/centers/toolkit";

export interface CenterFamily {
  /** URL segment. Matches the legacy route name so old links stay meaningful. */
  id: string;
  /** Hebrew name, as a consultant would say it. */
  he: string;
  /** The English discipline, kept because SAP work is bilingual. */
  en: string;
  /** One line of what the family answers. Never marketing. */
  lede: string;
  items: CenterItem[];
}

/* Order is editorial, not alphabetical: the families a consultant reaches for
   during an implementation come before the ones used while running it. */
export const CENTER_FAMILIES: CenterFamily[] = [
  { id: "blueprints", he: "בלופרינטים", en: "Blueprints",
    lede: "מסמכי אפיון לתהליכי ליבה, מהדרישה העסקית עד ההגדרה במערכת.", items: BLUEPRINTS },
  { id: "config", he: "הגדרות מערכת", en: "Configuration",
    lede: "נושאי Customizing לפי תחום, עם נתיב IMG והשלכות.", items: CONFIG_TOPICS },
  { id: "manufacturing", he: "תרחישי ייצור", en: "Manufacturing Scenarios",
    lede: "תרחישי ייצור מלאים: משקה, תרכיז, אצוות, CIP, אריזה ומחזורי פקודה.", items: MFG_SCENARIOS },
  { id: "process-auth", he: "הרשאות לתהליכים", en: "Process Authorizations",
    lede: "אובייקטי הרשאה לכל תהליך PM ו-PP-PI, כשלים נפוצים ונתיב אבחון SU53 ל-PFCG.", items: PROCESS_AUTH },
  { id: "integration", he: "אינטגרציה", en: "Integration",
    lede: "ממשקים בין SAP למערכות היקפיות: פרוטוקול, מבנה ונקודות כשל.", items: INTEGRATIONS },
  { id: "migration", he: "מעבר ל-S/4HANA", en: "S/4HANA Migration",
    lede: "לכל נושא: מה נשאר, מה משתנה, מה הוסר, ומה מחליף אותו ב-Fiori, CDS ו-API.", items: MIGRATIONS },
  { id: "fiori", he: "Fiori בתהליך", en: "Fiori in Process",
    lede: "אפליקציות Fiori לפי התהליך שהן משרתות, לא לפי קטלוג.", items: FIORI_CENTER },
  { id: "abap", he: "כלי ABAP", en: "ABAP Tooling",
    lede: "כלי הפיתוח והניתוח שיועץ טכני נדרש להם בשטח.", items: ABAP_TOOLS },
  { id: "debugging", he: "אבחון תקלות", en: "Debugging",
    lede: "נתיבי אבחון מסודרים: מהסימפטום, דרך הראיה, אל הסיבה.", items: DEBUGGINGS },
  { id: "toolkit", he: "ערכת היועץ", en: "Consultant Toolkit",
    lede: "תבניות עבודה: ראיון, סדנה, בלופרינט, QA, Cutover, Hypercare ו-Go-Live.", items: TOOLKIT },
  { id: "playbooks", he: "מדריכי יישום", en: "Implementation Playbooks",
    lede: "לכל תהליך: מטרה עסקית, קונפיגורציה, נתוני אב, בדיקות וסיכוני Go-Live.", items: PLAYBOOKS },
];

const BY_ID = new Map(CENTER_FAMILIES.map((f) => [f.id, f]));

export const centerFamily = (id: string): CenterFamily | null => BY_ID.get(id) ?? null;

export function centerItem(family: string, slug: string): { fam: CenterFamily; item: CenterItem } | null {
  const fam = BY_ID.get(family);
  const item = fam?.items.find((i) => i.slug === slug);
  return fam && item ? { fam, item } : null;
}

/** Every (family, slug) pair, for generateStaticParams. */
export const allCenterParams = (): { family: string; slug: string }[] =>
  CENTER_FAMILIES.flatMap((f) => f.items.map((i) => ({ family: f.id, slug: i.slug })));

/** Counted from the datasets, never written down. */
export const centerTotals = () => ({
  families: CENTER_FAMILIES.length,
  items: CENTER_FAMILIES.reduce((n, f) => n + f.items.length, 0),
  /* How many carry a validated ECC→S/4HANA verdict. Stated rather than assumed:
     the surface must not imply every entry has one. */
  withS4: CENTER_FAMILIES.reduce((n, f) => n + f.items.filter((i) => i.eccS4).length, 0),
  /* Sections across the whole corpus — the honest measure of how much content
     the shared template has to carry without dropping any of it. */
  sections: CENTER_FAMILIES.reduce(
    (n, f) => n + f.items.reduce((m, i) => m + (i.sections?.length ?? 0), 0), 0),
});
