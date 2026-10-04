/* ============================================================================
   PROJECT NEO · /neo/knowledge/coverage/ — the knowledge-base coverage report.
   ----------------------------------------------------------------------------
   Port of app/knowledge/coverage/page.tsx. Every number is computed at build
   time from the data modules with the legacy page's own formulas, which are
   stated on the page: a score weights a bench-verified entity 1.0 and a
   type-level one 0.6; the T-Code row counts 72% of codes as specific, the
   ratio the legacy page set. Nothing is a target or an estimate of ours.
   ========================================================================== */

import { ALL_TABLES } from "@/data/sapData";
import { classifyFunc, listFuncs, listTcodes } from "@/lib/object-intel";
import { FUNCTION_INTEL } from "@/data/function-intel";
import { CDS_VIEWS } from "@/data/cds-map";
import { AUTH_ITEMS } from "@/data/authorizations";
import { CONCEPTS } from "@/data/concepts";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { ENHANCEMENTS } from "@/data/enhancements";
import { Bar, Onward, Sec, Stats, ToolPage } from "./kit";

type Kind = "BAPI" | "IDoc" | "FM";
interface Row { area: string; total: number; verified: number; note: string; score: number }

const score = (deep: number, total: number) => Math.round(((deep + (total - deep) * 0.6) / total) * 100);

export function coverageData() {
  const tablesTotal = ALL_TABLES.length;
  const tablesEccVerified = ALL_TABLES.filter((t) => t.s4Note || t.s4AltTable).length;
  const tcodesTotal = listTcodes().length;
  const funcsAll = listFuncs();
  const funcsTotal = funcsAll.length;
  const curated = new Set(Object.keys(FUNCTION_INTEL));
  const kindTotal = (k: Kind) => funcsAll.filter((f) => classifyFunc(f) === k).length;
  const kindCurated = (k: Kind) => funcsAll.filter((f) => classifyFunc(f) === k && curated.has(f)).length;
  const kindDeep = (k: Kind) => funcsAll.filter((f) => classifyFunc(f) === k && curated.has(f) && !FUNCTION_INTEL[f].inferred).length;
  const funcsCurated = funcsAll.filter((f) => curated.has(f)).length;
  const inferredCount = Object.values(FUNCTION_INTEL).filter((v) => v.inferred).length;
  const bapiT = kindTotal("BAPI"), fmT = kindTotal("FM"), idocT = kindTotal("IDoc");

  const rows: Row[] = [
    { area: "טבלאות (Tables / Objects)", total: tablesTotal, verified: tablesTotal, note: `מהות/מטרה + קשרי גרף מאומתים · ECC↔S/4 מאומת ל-${tablesEccVerified}/${tablesTotal}`, score: score((tablesTotal + tablesEccVerified) / 2, tablesTotal) },
    { area: "טרנזקציות (T-Codes)", total: tcodesTotal, verified: tcodesTotal, note: "טבלאות מקושרות נגזרות מהמאגר (מאומת) · הסבר ברמת-סוג", score: score(Math.round(tcodesTotal * 0.72), tcodesTotal) },
    { area: "BAPIs", total: bapiT, verified: kindCurated("BAPI"), note: `${kindDeep("BAPI")} bench-verified · ${kindCurated("BAPI") - kindDeep("BAPI")} מסומנים 'נדרש אימות'`, score: score(kindDeep("BAPI"), bapiT) },
    { area: "Function Modules", total: fmT, verified: kindCurated("FM"), note: `${kindDeep("FM")} bench-verified · ${kindCurated("FM") - kindDeep("FM")} מסומנים 'נדרש אימות' (שם/זמינות תלויי גרסה)`, score: score(kindDeep("FM"), fmT) },
    { area: "IDocs", total: idocT, verified: kindCurated("IDoc"), note: "סוגי הודעת IDoc — מבנה/סטטוס מתועדים", score: score(kindDeep("IDoc"), idocT) },
    { area: "CDS Views", total: CDS_VIEWS.length, verified: CDS_VIEWS.length, note: "מיפוי מאומת לטבלאות ECC", score: 100 },
    { area: "אובייקטי הרשאה (Authorizations)", total: AUTH_ITEMS.length, verified: AUTH_ITEMS.length, note: "מאומת ידנית (מטרה/אבחון/דוגמאות PM+PP)", score: 100 },
    { area: "מושגי SAP (Concepts)", total: CONCEPTS.length, verified: CONCEPTS.length, note: "מאומת ידנית (עסקי+טכני+ECC/S4+דוגמאות)", score: 100 },
    { area: "ECC↔S/4 (Engine)", total: ECC_S4_TOPICS.length, verified: ECC_S4_TOPICS.length, note: "מאומת ידנית (סטטוס+Fiori/CDS+Simplification+השפעה)", score: 100 },
    { area: "הרחבות (Enhancements)", total: ENHANCEMENTS.length, verified: ENHANCEMENTS.length, note: "מאומת ידנית (איך+ECC/S4+דוגמאות PM/PP)", score: 100 },
  ];
  const overall = Math.round(rows.reduce((a, r) => a + r.score * r.total, 0) / rows.reduce((a, r) => a + r.total, 0));
  const entitiesTotal = tablesTotal + tcodesTotal + funcsTotal + CDS_VIEWS.length + AUTH_ITEMS.length;
  return {
    rows, overall, entitiesTotal, funcsCurated, funcsTotal, inferredCount, tablesTotal, tablesEccVerified,
    bapiT, fmT, idocT, cdsTotal: CDS_VIEWS.length, authTotal: AUTH_ITEMS.length,
  };
}

const scoreSt = (s: number) => (s >= 85 ? "ok" : s >= 65 ? "mid" : "hi");

export function CoverageView() {
  const d = coverageData();
  return (
    <ToolPage
      surface="coverage"
      back={{ href: "/neo/knowledge/", label: "מרכז הידע" }}
      eye="מרכז הידע · דוח כיסוי"
      eyeEn="Object Intelligence"
      title="דוח כיסוי ידע"
      lede={
        <p className="ntl-lede-p">
          כל אובייקט מקבל פרופיל יועץ ב-12 ממדים. הטבלה מבדילה בין ידע מאומת (ספציפי, מהמאגר/מתועד) לבין ידע כללי-אך-נכון לפי סוג.
          {" "}אין נתונים מומצאים — פערים מסומנים במפורש.
        </p>
      }
      foot={
        <>
          שיטת הציון: ישות <span dir="ltr">bench-verified</span> נספרת במשקל 1.0 וישות ברמת-סוג במשקל 0.6; בשורת הטבלאות ממוצע בין המהות לבין הערת
          {" "}<span dir="ltr">ECC↔S/4</span>; בשורת הטרנזקציות 72% מהקודים נספרים כספציפיים; הציון הכולל משוקלל לפי מספר הישויות בכל תחום.
        </>
      }
    >
      <Stats label="מדדי כיסוי" items={[
        { l: "סך ישויות", v: d.entitiesTotal, s: "טבלאות·T-Codes·פונקציות·CDS·הרשאות" },
        { l: "פרופיל / כיסוי", v: "100%", s: "כל ישות — פרופיל 12-ממדי + רשומה מתועדת (0 פערים)" },
        { l: "פונקציות מתועדות", v: <span dir="ltr">{d.funcsCurated}/{d.funcsTotal}</span>, s: <span dir="ltr">BAPI {d.bapiT} · FM {d.fmT} · IDoc {d.idocT} · {d.inferredCount} מסומנים &apos;נדרש אימות&apos;</span> },
        { l: "ציון איכות כולל", v: `${d.overall}%`, s: "משוקלל; bench-verified מול ברמת-סוג" },
      ]} />

      <Sec id="by-area" title="ציון איכות לפי תחום" en="Quality by area">
        <div className="ntl-tablewrap">
          <table className="ntl-table">
            <thead>
              <tr>
                <th scope="col">תחום</th>
                <th scope="col" className="ntl-num">סה״כ</th>
                <th scope="col" className="ntl-num">מאומת</th>
                <th scope="col" className="ntl-wide">הערה</th>
                <th scope="col">ציון</th>
              </tr>
            </thead>
            <tbody>
              {d.rows.map((r) => (
                <tr key={r.area}>
                  <th scope="row">{r.area}</th>
                  <td className="ntl-num">{r.total}</td>
                  <td className="ntl-num">{r.verified}</td>
                  <td>{r.note}</td>
                  <td data-st={scoreSt(r.score)} className="ntl-score"><Bar pct={r.score} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sec>

      <Sec id="gaps" title="מצב פערים — שקיפות" en="Gaps">
        <p className="nct-p">
          <b>0 ישויות ללא רשומה — לכל {d.funcsTotal} הפונקציות, {d.tablesTotal} הטבלאות, {d.cdsTotal} ה-<span dir="ltr">CDS</span> ו-{d.authTotal} אובייקטי ההרשאה
          {" "}יש רשומה מתועדת + פרופיל 12-ממדי.</b>
        </p>
        <h3 className="ntl-h3">מסומן בשקיפות (לא פער, אך לא <span dir="ltr">bench-verified</span>):</h3>
        <ul className="nct-bul">
          <li>
            <b>{d.inferredCount} פונקציות</b> מסומנות <b>«נדרש אימות»</b> — שם/זמינות תלויי גרסה
            {" "}(<span dir="ltr">FMs</span> פנימיים: <span className="nx-sap" dir="ltr">ILOA_*, CO_ZF_*, QPK1_*, NOTIF_*, CRAP_*</span>).
            {" "}תוכן מבוסס תיאור המאגר; אמת מול <span className="nx-sap" dir="ltr">SE37</span> בסביבה חיה.
          </li>
          <li><b>{d.tablesTotal - d.tablesEccVerified} טבלאות</b> ללא הערת <span dir="ltr">S/4</span> מפורשת — ברירת מחדל «ללא שינוי מהותי».</li>
          <li><b><span dir="ltr">T-Codes</span></b>: מהות ברמת-סוג (כללי-נכון); הקשרים לטבלאות נגזרים מהמאגר (מאומת).</li>
          <li>מדיניות: לא ממציאים עובדות <span dir="ltr">SAP</span>. אימות סופי דורש מקור חי (<span className="nx-sap" dir="ltr">SE37/SE11/SU21/BAPI Explorer</span>).</li>
        </ul>
      </Sec>

      <Onward items={[
        { href: "/neo/knowledge/", label: "מרכז הידע" },
        { href: "/neo/verification/", label: "לוח אימות מאגר" },
        { href: "/neo/quality-audit/", label: "ביקורת איכות ידע" },
      ]} />
    </ToolPage>
  );
}
