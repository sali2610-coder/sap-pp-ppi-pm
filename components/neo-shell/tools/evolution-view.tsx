/* ============================================================================
   PROJECT NEO · /neo/evolution/ — the T-Code evolution table.
   ----------------------------------------------------------------------------
   Port of app/evolution/page.tsx over data/lifecycle.ts: every T-Code whose
   lifecycle is not "Active", removed ones first, with its S/4 status, the
   alternative, the Fiori app, the impact and the migration note, verbatim. The
   simplification item the dataset records per row is shown as well (the legacy
   table carried it in the data but did not print it).
   ========================================================================== */

import Link from "next/link";
import { IMPACT_HE, LC_HE, LIFECYCLE, type LcImpact } from "@/data/lifecycle";
import { txHref } from "./links";
import { Code, Sec, ToolPage, nf } from "./kit";

const IMPACT_ST: Record<LcImpact, string> = { High: "hi", Medium: "mid", Low: "lo", None: "ok" };

export function evolutionRows() {
  return Object.entries(LIFECYCLE)
    .filter(([, l]) => l.status !== "Active")
    .sort((a, b) => (a[1].status === "Obsolete" ? -1 : 1) - (b[1].status === "Obsolete" ? -1 : 1));
}

export function EvolutionView() {
  const rows = evolutionRows();
  const obsolete = rows.filter(([, l]) => l.status === "Obsolete").length;
  return (
    <ToolPage
      surface="evolution"
      back={{ href: "/neo/s4hana/", label: "מרכז S/4HANA" }}
      eye="מרכז אבולוציית טרנזקציות"
      eyeEn="Transaction Evolution Center"
      title="מרכז אבולוציית טרנזקציות"
      lede={
        <p className="ntl-lede-p">
          {nf.format(rows.length)} טרנזקציות שהשתנו ב-<span className="nx-sap" dir="ltr">S/4HANA</span> ({nf.format(obsolete)} הוסרו)
          {" — "}סטטוס <span className="nx-sap" dir="ltr">ECC/S4</span>, חלופה, <span className="nx-sap" dir="ltr">Fiori</span> והשפעת מיגרציה.
          {" "}מקור: <span dir="ltr" lang="en">S/4 Simplification</span>.
        </p>
      }
      foot={
        <>
          דוגמאות: <span dir="ltr">MB1A/MB1B/MB1C → MIGO · XK01/XD01 → BP · MD01 → MD01N · NACE → BRF+ Output</span>.
          {" "}שאר ה-<span dir="ltr">T-Codes</span> (<span dir="ltr">Active</span>) — ראו{" "}
          <Link href="/neo/transactions/" prefetch={false} className="nu-link">מרכז הטרנזקציות</Link>.
        </>
      }
    >
      <Sec id="evo" title="טרנזקציות שהשתנו" en="Transaction lifecycle">
        <div className="ntl-tablewrap">
          <table className="ntl-table ntl-table--wide">
            <caption>מוסרות קודם, ואחריהן הלא-אסטרטגיות. מקור כל שורה: data/lifecycle.</caption>
            <thead>
              <tr>
                <th scope="col"><span dir="ltr">T-Code</span></th>
                <th scope="col">סטטוס S/4</th>
                <th scope="col">חלופה</th>
                <th scope="col"><span dir="ltr">Fiori</span></th>
                <th scope="col">השפעה</th>
                <th scope="col" className="ntl-wide">הערות מיגרציה</th>
                <th scope="col">פריט פישוט</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([code, l]) => (
                <tr key={code}>
                  <th scope="row"><Code v={code} href={txHref(code)} /></th>
                  <td><span className="ntl-state" data-st={l.status === "Obsolete" ? "hi" : "mid"}>{LC_HE[l.status]}</span></td>
                  <td><span className="nx-sap" dir="ltr">{l.alt || "—"}</span></td>
                  <td><span dir="ltr" lang="en">{l.fiori || "—"}</span></td>
                  <td><span className="ntl-state" data-st={IMPACT_ST[l.impact]}>{IMPACT_HE[l.impact]}</span></td>
                  <td>{l.migration}</td>
                  <td><span dir="ltr" lang="en">{l.simplification || "—"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sec>
    </ToolPage>
  );
}
