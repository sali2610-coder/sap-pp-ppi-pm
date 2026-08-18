"use client";

// Project NEO · HOW THE MODULE IS OPERATED — transactions and reports.
//
// Two different records of the same question, and the chapter keeps them apart
// because they are not the same evidence:
//
//   · THE RANKING is derived, in front of the reader, from the dictionary: how
//     many of the module's tables name each code. It is a documentation
//     measure, not a usage measure, and the caption says exactly that rather
//     than letting a bar imply a frequency nobody measured.
//   · THE DIRECTORY is verbatim. PP-PI's blueprint carries a 27-row transaction
//     and report guide with, per code, a Hebrew functional explanation, the
//     S/4HANA structural change and the Fiori successor. That sheet had no
//     surface anywhere in the workspace before this pass.
//
// A T-Code here is a .nu-chip: app/neo/ui.css defines that as a VALUE that is
// deliberately not interactive, and this project has no per-code destination
// inside the /neo namespace. The chapter therefore carries exactly one route —
// the NEO transaction registry — instead of ninety pills that look clickable
// and are not.

import Link from "next/link";
import { ArrowLeft, ScrollText, Terminal } from "lucide-react";
import type { WsData } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";
import { WorkspaceSheet } from "./workspace-sheet";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceOps({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const maxTc = Math.max(1, ...d.tcodes.map((t) => t.n));
  const dir = d.sheets.find((s) => s.key === "tcodesDir") || null;

  return (
    <Chapter
      meta={meta}
      icon={<Terminal size={17} strokeWidth={1.75} />}
      lede={
        <>
          המילון של המודול מחזיק <b className="nw-sap">{nf.format(d.counts.tcodes)}</b> קודי טרנזקציה.
          כאן הם מדורגים לפי כמה טבלאות מצביעות על כל אחד. זו מידת תיעוד, לא מידת שימוש בפועל.
        </>
      }
      lead={
        <Link className="nu-link" href="/neo/transactions/" prefetch={false}>
          המרשם המלא של הטרנזקציות
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      }
    >
      <Sub
        id={`${meta.id}-rank`}
        icon={<Terminal size={13} strokeWidth={1.75} />}
        title="הקודים שהמודול נשען עליהם"
        note="אורך הפס הוא מספר הטבלאות במילון שמצביעות על הקוד, מול הקוד המצוטט ביותר במודול."
      >
        <ul className="nw-rank nw-rank--tight">
          {d.tcodes.map((t) => (
            <li key={t.code}>
              <span className="nw-tcrow">
                <b className="nw-sap">{t.code}</b>
                <span className="nw-bar nm-grow" aria-hidden="true">
                  <i style={{ "--p": t.n / maxTc } as React.CSSProperties} />
                </span>
                <em className="nw-sap">
                  {nf.format(t.n)}
                  <span>טבלאות</span>
                </em>
              </span>
            </li>
          ))}
        </ul>
      </Sub>

      {dir ? (
        <Sub
          id={`${meta.id}-dir`}
          icon={<ScrollText size={13} strokeWidth={1.75} />}
          title={dir.title}
          note={`${nf.format(dir.rows.length)} רשומות מהתכנון של המודול. לכל קוד ההסבר הפונקציונלי, השינוי המבני ב-S/4HANA והיורש ב-Fiori.`}
        >
          <WorkspaceSheet
            sheet={dir}
            lede="הגיליון מוצג מילה במילה, בסדר שנכתב. עמודה שהמקור השאיר ריקה אינה מודפסת."
          />
        </Sub>
      ) : (
        <p className="nw-fine">
          התכנון של המודול הזה אינו מחזיק מדריך טרנזקציות נפרד. הקודים שלמעלה הם כל מה שהמילון קושר
          לטבלאות שלו.
        </p>
      )}
    </Chapter>
  );
}
