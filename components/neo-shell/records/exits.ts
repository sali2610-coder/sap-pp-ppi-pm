/* ============================================================================
   PROJECT NEO · /neo/exits — the named PM / PP / PP-PI exits and BAdIs.
   ----------------------------------------------------------------------------
   data/exits.ts, field by field: kind, module, Hebrew purpose, purpose,
   trigger, technical object, T-Codes, example, debugging, the ECC→S/4HANA
   block and the trust level. Two addresses were rows that left the catalogue
   on 2026-09-21 (a technique, not a named exit); their pages say so and lead
   to the technique record, as the legacy compatibility pages did.
   ========================================================================== */

import { EXITS, exitBySlug, exitSlug, type Exit } from "@/data/exits";
import { trustExit } from "@/lib/trust";
import { enhHref } from "../reference/ref-links";
import { ECC_S4_EMPTY, eccS4Rows, trustStatus } from "./common";
import { plain, txRef } from "./links";
import type { Block, Head, RecordData, RowGroup } from "./kit";

const BACK = { href: "/neo/exits/", label: "מרכז ההרחבות" };
const MODULES: Exit["module"][] = ["PM", "PP", "PP-PI", "Cross"];
const MOD_HE: Record<Exit["module"], string> = { PM: "אחזקה (PM)", PP: "ייצור (PP)", "PP-PI": "תהליכי (PP-PI)", Cross: "חוצה-מודול" };

/** The two compatibility addresses (app/exits/<name>/page.tsx), verbatim. */
const RECLASSIFIED: Record<string, { en: string; lede: string; body: string[]; target: string; targetLabel: string }> = {
  "Implicit-Enhancement": {
    en: "Implicit Enhancement",
    lede: "הכתובת הישנה של הרשומה. נקודת הרחבה משתמעת היא טכניקה של ה-Enhancement Framework ולא Exit בשם, ולכן הרשומה סווגה מחדש ב-2026-09-21 ותוכנה עבר לרשומת הטכניקה.",
    body: [
      "מה השתנה: השורה \"Implicit Enhancement\" הוסרה מקטלוג ה-Exits כי שמה אינו מזהה של Exit (רווח) והתוכן שלה תיאר את המנגנון עצמו (נקודות הרחבה משתמעות בתחילת ובסוף מודולי קוד). התוכן לא נמחק: הוא נמצא היום בדף הטכניקה.",
      "הדף הזה נשאר כדי שקישורים ישנים לא יישברו. הקישור למטה מוביל לרשומה המלאה.",
    ],
    target: "implicit-enhancement",
    targetLabel: "Implicit Enhancement · הרשומה המלאה",
  },
  "CMOD-SMOD": {
    en: "CMOD / SMOD",
    lede: "הכתובת הישנה של הרשומה. CMOD ו-SMOD הן טרנזקציות המימוש של טכניקת ה-Customer Exit, לא Exit בפני עצמן, ולכן הרשומה סווגה מחדש ב-2026-09-21 ותוכנה עבר לרשומת הטכניקה.",
    body: [
      "מה השתנה: השורה \"CMOD/SMOD\" הוסרה מקטלוג ה-Exits כי שמה אינו מזהה של Exit (לוכסן) והתוכן שלה תיאר את מנגנון ה-Customer Exit (SMOD להגדרה, CMOD לפרויקט ההרחבה). התוכן לא נמחק: הוא נמצא היום בדף הטכניקה.",
      "הדף הזה נשאר כדי שקישורים ישנים לא יישברו. הקישור למטה מוביל לרשומה המלאה.",
    ],
    target: "customer-exit",
    targetLabel: "Customer Exit · הרשומה המלאה",
  },
};

export const exitParams = (): string[] => [...EXITS.map((e) => exitSlug(e.name)), ...Object.keys(RECLASSIFIED)];

export function exitRecord(slug: string): RecordData | null {
  const r = RECLASSIFIED[slug];
  if (r) {
    return {
      title: `${r.en} · הרשומה סווגה מחדש`,
      description: r.lede,
      head: { back: BACK, eyebrow: "Enhancements · reclassified", h1: "הרשומה סווגה מחדש", en: r.en, lede: r.lede },
      blocks: [
        { t: "text", title: "מה השתנה", text: r.body },
        { t: "refs", title: "הרשומה המלאה", items: [{ label: r.targetLabel, href: enhHref(r.target) }] },
      ],
    };
  }
  const e = exitBySlug(slug);
  if (!e) return null;
  const s4 = eccS4Rows(e.eccS4);
  return {
    title: `${e.name} · ${e.he}`,
    description: e.purpose,
    head: {
      back: BACK,
      eyebrow: `${e.kind} · ${e.module}`,
      h1: e.he,
      en: e.name,
      lede: e.purpose,
      tags: [e.module, e.kind],
      status: trustStatus(trustExit(e.inferred)),
    },
    blocks: [
      { t: "text", title: "נקודת הפעלה (Trigger)", text: e.trigger },
      { t: "ids", title: "אובייקט טכני", items: [plain(e.object)] },
      { t: "text", title: "דוגמת שימוש", text: e.example },
      { t: "text", title: "שיטת Debug", text: e.debugging },
      ...(e.tcodes.length ? [{ t: "ids", title: "טרנזקציות קשורות", items: e.tcodes.map((c) => txRef(c)) } as Block] : []),
      { t: "kv", title: `ECC6 → S/4HANA · ${e.name}`, rows: s4, empty: ECC_S4_EMPTY },
    ],
  };
}

export function exitsIndex(): { head: Head; groups: RowGroup[] } {
  const pm = EXITS.filter((e) => e.module === "PM").length;
  const pp = EXITS.filter((e) => e.module === "PP" || e.module === "PP-PI").length;
  const badi = EXITS.filter((e) => e.kind === "BAdI").length;
  return {
    head: {
      back: { href: "/neo/enhancements/", label: "הרחבות" },
      eyebrow: "User Exit / BAdI Center",
      h1: "מרכז הרחבות בשמות",
      lede: `קטלוג של ${EXITS.length} Exits / BAdIs אמיתיים: ${pm} ב-PM, ${pp} ב-PP/PP-PI, ומתוכם ${badi} BAdIs. לכל אחד: מטרה, נקודת הפעלה בתהליך, T-Codes ואובייקט, דוגמה, שיטת Debug ובלוק ECC↔S/4.`,
    },
    groups: MODULES.map((m) => ({
      title: MOD_HE[m],
      rows: EXITS.filter((e) => e.module === m)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((e) => ({
          href: `/neo/exits/${exitSlug(e.name)}/`,
          he: e.he,
          en: e.name,
          sub: `נקודת הפעלה: ${e.trigger}`,
          tags: [e.kind, e.module],
        })),
    })).filter((g) => g.rows.length),
  };
}
