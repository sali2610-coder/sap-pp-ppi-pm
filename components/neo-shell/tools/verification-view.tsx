/* ============================================================================
   PROJECT NEO · /neo/verification/ — the repository verification dashboard.
   ----------------------------------------------------------------------------
   Port of app/verification/page.tsx over lib/verification.ts: every entity
   class counted as Verified / Partially / Needs Verification, and the static
   findings (orphan links, weak mappings, duplicates, suspicious FM and BAdI
   mappings). The legacy page printed 40 items per finding and "+N"; every item
   is here, the first 40 in view and the rest folded.
   ========================================================================== */

import { classifyRows, findings } from "@/lib/verification";
import { Bar, More, Onward, Sec, Stats, ToolPage, nf } from "./kit";

const SEV_ST: Record<string, string> = { high: "hi", med: "mid", low: "lo" };
const SEV_HE: Record<string, string> = { high: "חומרה גבוהה", med: "חומרה בינונית", low: "חומרה נמוכה" };
const pct = (n: number, d: number) => (d ? Math.round((100 * n) / d) : 0);
const VIEW = 40;

function Items({ items }: { items: string[] }) {
  return (
    <ul className="ntl-codes">
      {items.map((it, i) => <li key={`${it}-${i}`}><span className="nct-chip nx-sap" dir="ltr">{it}</span></li>)}
    </ul>
  );
}

export function VerificationView() {
  const rows = classifyRows();
  const fnds = findings();
  const tot = rows.reduce((a, r) => a + r.total, 0);
  const ver = rows.reduce((a, r) => a + r.verified, 0);
  const par = rows.reduce((a, r) => a + r.partial, 0);
  const need = rows.reduce((a, r) => a + r.needs, 0);
  return (
    <ToolPage
      surface="verification"
      back={{ href: "/neo/", label: "מסך הבית" }}
      eye="לוח אימות מאגר"
      eyeEn="Audit · Verification Dashboard"
      title="לוח אימות מאגר"
      lede={
        <p className="ntl-lede-p">
          סיווג כל {nf.format(tot)} הישויות: <span dir="ltr">Verified / Partially / Needs Verification</span> + זיהוי קישורים מומצאים,
          {" "}מיפויים חלשים, כפילויות ומיפויי <span dir="ltr">FM/BAdI</span> חשודים.
        </p>
      }
      foot={
        <>
          מתודולוגיה: <span dir="ltr">Verified</span> = אובייקט <span dir="ltr">SAP</span> אמיתי מהמאגר/מתועד לעומק ·
          {" "}<span dir="ltr">Partially</span> = שם מאומת אך לא <span dir="ltr">bench-verified</span> (<span dir="ltr">Exits/Notes-keywords</span>) ·
          {" "}<span dir="ltr">Needs</span> = תלוי-גרסה/<span dir="ltr">inferred</span> → אימות <span dir="ltr">SE37/SE18</span>.
          {" "}קישורים מומצאים = הפניות ליעד שאינו במאגר (מרונדרות כצ&apos;יפ-מידע, לא לינק שבור).
        </>
      }
    >
      <Stats label="סיווג הישויות" items={[
        { l: "Verified", v: ver },
        { l: "Partially", v: par },
        { l: "Needs Verification", v: need },
        { l: "סך ישויות", v: tot },
      ]} />

      <Sec id="by-kind" title="סיווג לפי סוג" en="By kind">
        <div className="ntl-tablewrap">
          <table className="ntl-table">
            <thead>
              <tr>
                <th scope="col">סוג</th>
                <th scope="col" className="ntl-num">סה״כ</th>
                <th scope="col" className="ntl-num"><span dir="ltr">Verified</span></th>
                <th scope="col" className="ntl-num"><span dir="ltr">Partially</span></th>
                <th scope="col" className="ntl-num"><span dir="ltr">Needs</span></th>
                <th scope="col">% מאומת</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.kind}>
                  <th scope="row"><span dir="ltr" lang="en">{r.kind}</span></th>
                  <td className="ntl-num">{r.total}</td>
                  <td className="ntl-num">{r.verified}</td>
                  <td className="ntl-num">{r.partial}</td>
                  <td className="ntl-num">{r.needs}</td>
                  <td><Bar pct={pct(r.verified, r.total)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sec>

      <Sec id="findings" title="ממצאים" en="Findings">
        {fnds.map((f) => (
          <section key={f.type} className="ntl-finding" aria-label={f.type}>
            <h3 className="ntl-h3">
              <span dir="auto">{f.type}</span>
              <span className="ntl-state" data-st={f.items.length ? SEV_ST[f.severity] : "ok"}>
                {f.items.length ? `${SEV_HE[f.severity]} · ${nf.format(f.items.length)}` : "0"}
              </span>
            </h3>
            {f.items.length ? (
              <>
                <Items items={f.items.slice(0, VIEW)} />
                {f.items.length > VIEW ? (
                  <More summary={<>+{nf.format(f.items.length - VIEW)} נוספים</>}>
                    <Items items={f.items.slice(VIEW)} />
                  </More>
                ) : null}
              </>
            ) : <p className="ntl-ok">תקין — אין ממצאים.</p>}
          </section>
        ))}
      </Sec>

      <Onward items={[
        { href: "/neo/quality-audit/", label: "ביקורת איכות ידע" },
        { href: "/neo/knowledge/coverage/", label: "דוח כיסוי ידע" },
        { href: "/neo/bapi/", label: "BAPI ו-FM" },
        { href: "/neo/enhancements/", label: "הרחבות" },
      ]} />
    </ToolPage>
  );
}
