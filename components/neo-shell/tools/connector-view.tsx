/* ============================================================================
   PROJECT NEO · /neo/connector/ — the live SAP connector, as architecture.
   ----------------------------------------------------------------------------
   Port of app/connector/page.tsx over lib/sap-connector.ts: which SAP
   repository objects a read-only connector would read and which NEO data each
   would feed. No connection exists; the status line reads the module's own
   USE_LIVE flag.
   ========================================================================== */

import { CONNECTOR_MAP, USE_LIVE } from "@/lib/sap-connector";
import { Onward, Sec, ToolPage } from "./kit";

export function ConnectorView() {
  return (
    <ToolPage
      surface="connector"
      back={{ href: "/neo/", label: "מסך הבית" }}
      eye="מחבר SAP חי"
      eyeEn="Live SAP Connector (Architecture)"
      title="הכנת מחבר SAP חי"
      lede={
        <p className="ntl-lede-p">
          ארכיטקטורה וממשקים בלבד — אין חיבור חי. כשתחובר מערכת <span dir="ltr">SAP</span> (או <span dir="ltr">sc4sap MCP</span>),
          {" "}המחבר <span dir="ltr">read-only</span> יעשיר/יאמת את תוכן <span dir="ltr">NEO</span> ממקור אמת.
        </p>
      }
      foot={<>מקור: <span className="nx-sap" dir="ltr">lib/sap-connector.ts</span>.</>}
    >
      <p className="ntl-note" role="status">
        <span className="ntl-state" data-st={USE_LIVE ? "ok" : "mid"}>
          סטטוס: {USE_LIVE ? "LIVE" : "ארכיטקטורה בלבד · ללא חיבור"}
        </span>
      </p>

      <Sec id="map" title="מיפוי מקורות SAP ליעדי NEO" en="Connector map">
        <div className="ntl-tablewrap">
          <table className="ntl-table">
            <thead>
              <tr>
                <th scope="col">מקור SAP</th>
                <th scope="col">אובייקט</th>
                <th scope="col">יעד ב-NEO</th>
                <th scope="col">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {CONNECTOR_MAP.map((r) => (
                <tr key={r.source}>
                  <th scope="row"><span className="nx-sap" dir="ltr">{r.source}</span></th>
                  <td><span dir="ltr" lang="en">{r.sapObject}</span></td>
                  <td><span className="nx-sap" dir="ltr">{r.neoTarget}</span></td>
                  <td><span className="ntl-state" data-st="mid" dir="ltr" lang="en">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="nct-p">
          המחבר מוגדר כ-<span className="nx-sap" dir="ltr">SapConnector</span> interface ב-<span className="nx-sap" dir="ltr">lib/sap-connector.ts</span> עם
          {" "}<span dir="ltr">stub offline</span>. מימוש עתידי דרך <span dir="ltr">RFC / sc4sap MCP (GetTable/SearchObject/GetWhereUsed) / OData</span> —
          {" "}<span dir="ltr">read-only</span> בלבד. הפעלה ע&quot;י <span className="nx-sap" dir="ltr">USE_LIVE=true</span> + הזרקת <span dir="ltr">adapter</span>.
          {" "}ללא חיבור, <span dir="ltr">NEO</span> נשאר 100% offline.
        </p>
      </Sec>

      <Onward items={[
        { href: "/neo/import/", label: "מנוע ייבוא SAP" },
        { href: "/neo/verification/", label: "לוח אימות מאגר" },
        { href: "/neo/tables/", label: "טבלאות SAP" },
      ]} />
    </ToolPage>
  );
}
