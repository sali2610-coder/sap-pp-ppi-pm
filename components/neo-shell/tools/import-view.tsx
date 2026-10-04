/* ============================================================================
   PROJECT NEO · /neo/import/ — the SAP import engine, as architecture.
   ----------------------------------------------------------------------------
   Port of app/import/page.tsx over lib/import-engine.ts: the extraction package
   (which SAP repository tables to export, with which transaction, filter and
   fields, into which NEO data), the import flow and the automatic-validation
   value. No connection exists; the status line reads the module's ENABLED flag.
   ========================================================================== */

import { ENABLED, EXTRACTION_PACKAGE } from "@/lib/import-engine";
import { Bullets, Onward, Sec, Steps, ToolPage } from "./kit";

const FLOW = [
  "חלץ מ-SAP (SE16N export / RFC) לקבצי CSV/JSON",
  "Parser ממיר raw rows → רשומות NEO (ImportParsers)",
  "Mapper ממזג לקבצי data/*.ts",
  "Validation: צולב מול תוכן מחבר → upgrade trust / סימון mismatch",
  "ImportReport: matched / upgraded / mismatched / new",
];

const VALUE = [
  "FM שמסומן 'inferred' שקיים ב-TADIR → upgrade ל-Verified.",
  "FM שלא קיים ב-TADIR → אישור RED + הסרה/סימון.",
  "אורך/מפתח טבלה מ-DD03L → אימות SAPField.",
  "Tcode→program מ-SE93/TSTC → אימות lineage.",
  "CDS base tables מ-DDLDEPENDENCY → אימות cds-map.",
];

export function ImportView() {
  return (
    <ToolPage
      surface="import"
      back={{ href: "/neo/", label: "מסך הבית" }}
      eye="מנוע ייבוא SAP"
      eyeEn="SAP Import Engine (Architecture)"
      title="מנוע ייבוא SAP (ארכיטקטורה)"
      lede={
        <p className="ntl-lede-p">
          חבילת חילוץ + מנוע ייבוא להעשרה/אימות אוטומטי מ-<span dir="ltr">SAP</span> אמיתי. ארכיטקטורה בלבד — ללא חיבור.
          {" "}הפעלה על-ידי <span className="nx-sap" dir="ltr">ENABLED</span> + הזרקת <span dir="ltr">adapter</span> (<span dir="ltr">RFC / sc4sap MCP</span> / העלאת קובץ).
        </p>
      }
      foot={
        <>
          קוד: <span className="nx-sap" dir="ltr">lib/import-engine.ts</span> — <span dir="ltr">record shapes (TSTC/TSTCT/DD02L/DD03L/TADIR/SE93) + ImportParsers interface + offline stub</span>.
          {" "}ללא חיבור, <span dir="ltr">NEO</span> נשאר 100% offline.
        </>
      }
    >
      <p className="ntl-note" role="status">
        <span className="ntl-state" data-st={ENABLED ? "ok" : "mid"}>
          סטטוס: {ENABLED ? "ENABLED" : "ארכיטקטורה בלבד · ENABLED=false"}
        </span>
      </p>

      <Sec id="package" title="חבילת חילוץ" en="SAP Extraction Package">
        <div className="ntl-tablewrap">
          <table className="ntl-table ntl-table--wide">
            <thead>
              <tr>
                <th scope="col">מקור</th>
                <th scope="col">חילוץ (T-Code)</th>
                <th scope="col">סינון</th>
                <th scope="col">שדות</th>
                <th scope="col">יעד ב-NEO</th>
              </tr>
            </thead>
            <tbody>
              {EXTRACTION_PACKAGE.map((e) => (
                <tr key={e.source}>
                  <th scope="row"><span className="nx-sap" dir="ltr">{e.source}</span></th>
                  <td><span className="nx-sap" dir="ltr">{e.tx}</span></td>
                  <td><span dir="ltr" lang="en">{e.selection}</span></td>
                  <td><span className="nx-sap" dir="ltr">{e.fields}</span></td>
                  <td><span className="nx-sap" dir="ltr">{e.target}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sec>

      <Sec id="flow" title="זרימת ייבוא" en="Import flow">
        <Steps items={FLOW} />
      </Sec>

      <Sec id="value" title="ערך אימות אוטומטי" en="Automatic validation">
        <Bullets items={VALUE} />
      </Sec>

      <Onward items={[
        { href: "/neo/connector/", label: "הכנת מחבר SAP חי" },
        { href: "/neo/verification/", label: "לוח אימות מאגר" },
        { href: "/neo/knowledge/coverage/", label: "דוח כיסוי ידע" },
      ]} />
    </ToolPage>
  );
}
