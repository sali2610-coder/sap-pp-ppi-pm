"use client";

// Project NEO · WHAT THE IMPLEMENTER TOUCHES — configuration, custom code,
// toolkit, and the PP vs PP-PI decision.
//
// These are the remaining verbatim sheets of the two blueprints, and they are
// the sections the client meant by "EVERY important PM / PP-PI section must
// exist INSIDE the module workspace". None of them existed anywhere in the
// workspace before this pass:
//
//   PM      config       6 rows · the SPRO configuration guide, per object, with
//                        the IMG path and the term glossary the project wrote.
//           customCode  46 rows · the user-exit / BAdI custom-code check, each
//                        with its review status and its S/4 recommendation.
//   PP-PI   tools       18 rows · the implementer / Basis toolkit.
//           ppvs        14 rows · PP (discrete) against PP-PI (process), which
//                        is the decision record for why this module is PP-PI.
//
// The chapter renders whichever of them the module actually carries and says
// nothing at all about the ones it does not. The two modules therefore get
// visibly different chapters here, which is correct: their blueprints are
// different documents.

import { Blocks, GitCompareArrows, Settings2, Wrench } from "lucide-react";
import type { WsData, WsSheet } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";
import { WorkspaceSheet } from "./workspace-sheet";

const nf = new Intl.NumberFormat("he-IL");

/** One sentence per sheet, describing what the sheet IS. Never a summary of
 *  what it says — the rows say that themselves, verbatim. */
const ABOUT: Record<WsSheet["key"], { icon: React.ReactNode; lede: string }> = {
  config: {
    icon: <Settings2 size={13} strokeWidth={1.75} />,
    lede: "לכל אובייקט קונפיגורציה: הטרנזקציה, נתיב ה-SPRO, ההסבר הפונקציונלי ומילון המונחים — כפי שנכתבו בגיליון.",
  },
  customCode: {
    icon: <Blocks size={13} strokeWidth={1.75} />,
    lede: "בדיקת הקוד המותאם: User Exits ו-BAdIs, עם סטטוס הבדיקה וההמלצה למעבר ל-S/4 שנרשמו בגיליון.",
  },
  tools: {
    icon: <Wrench size={13} strokeWidth={1.75} />,
    lede: "ערכת הכלים של המיישם וה-Basis: מה כל כלי עושה, מה קורה לו ב-S/4HANA ומה היורש שלו ב-Launchpad.",
  },
  ppvs: {
    icon: <GitCompareArrows size={13} strokeWidth={1.75} />,
    lede: "ההשוואה שהתכנון עצמו ערך בין ייצור בדיד לייצור תהליכי — הרשומה שמסבירה למה המודול הזה הוא PP-PI.",
  },
  simplification: { icon: null, lede: "" },
  tcodesDir: { icon: null, lede: "" },
};

/** The sheets this chapter owns. The Simplification list lives in the S/4HANA
 *  chapter and the transaction directory in the operations chapter, so neither
 *  is rendered twice. */
export const BUILD_KEYS: WsSheet["key"][] = ["config", "customCode", "tools", "ppvs"];

export function WorkspaceBuild({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const sheets = d.sheets.filter((s) => BUILD_KEYS.includes(s.key));
  const rows = sheets.reduce((a, s) => a + s.rows.length, 0);

  return (
    <Chapter
      meta={meta}
      icon={<Settings2 size={17} strokeWidth={1.75} />}
      lede={
        <>
          מעבר למילון הטבלאות, התכנון של המודול מחזיק{" "}
          <b className="nw-sap">{nf.format(sheets.length)}</b> גיליונות עבודה נוספים ובהם{" "}
          <b className="nw-sap">{nf.format(rows)}</b> רשומות. הם מוצגים כאן מילה במילה, בלי סיכום ובלי
          פרשנות.
        </>
      }
    >
      {sheets.map((s) => (
        <Sub
          key={s.key}
          id={`${meta.id}-${s.key}`}
          icon={ABOUT[s.key].icon}
          title={s.title}
          note={`${nf.format(s.rows.length)} רשומות · ${nf.format(s.headers.length)} עמודות בגיליון המקורי.`}
        >
          <WorkspaceSheet sheet={s} lede={ABOUT[s.key].lede} />
        </Sub>
      ))}
    </Chapter>
  );
}
