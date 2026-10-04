/* ============================================================================
   PROJECT NEO · /neo/quality-audit/ — the knowledge-base quality audit.
   ----------------------------------------------------------------------------
   Port of app/quality-audit/page.tsx. A static scan of the dataset's own
   consistency, computed at build time from the data modules exactly as the
   legacy page computed it: duplicate incident slugs, the deep ∩ directory
   T-Code overlap, and orphan references (incident → table, note → incident,
   process → incident, solution → incident, OIC object → table). The legacy
   table printed the first eight orphan pairs; the full lists fold below it.
   ========================================================================== */

import { ALL_TABLES } from "@/data/sapData";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY } from "@/data/tcode-directory";
import { INCIDENTS } from "@/data/troubleshooting";
import { SAP_NOTES } from "@/data/sap-notes";
import { SOLUTIONS } from "@/data/solutions";
import { PROCESS_MAPS } from "@/data/processes";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { More, Onward, Sec, Stats, ToolPage, nf } from "./kit";

type Sev = "pass" | "info" | "warn";
interface Check { area: string; result: number; detail: string; severity: Sev; all?: string[] }

const SEV: Record<Sev, { he: string; st: string }> = {
  pass: { he: "תקין", st: "ok" },
  info: { he: "מידע", st: "lo" },
  warn: { he: "לתשומת לב", st: "mid" },
};

export function auditChecks() {
  const tableSet = new Set(ALL_TABLES.map((t) => t.tableName));
  const incSet = new Set(INCIDENTS.map((i) => i.slug));

  const incCount: Record<string, number> = {};
  INCIDENTS.forEach((i) => (incCount[i.slug] = (incCount[i.slug] || 0) + 1));
  const dupIncidents = Object.entries(incCount).filter(([, n]) => n > 1).map(([s]) => s);

  const deepSet = new Set(TRANSACTIONS.map((t) => t.code.toUpperCase()));
  const overlap = TCODE_DIRECTORY.filter((t) => deepSet.has(t.code.toUpperCase())).map((t) => t.code);

  const incOrphanTables = INCIDENTS.flatMap((i) => i.tables.filter((t) => /^[A-Z][A-Z0-9_]+$/.test(t) && !tableSet.has(t)).map((t) => `${i.slug}→${t}`));
  const noteOrphanInc = SAP_NOTES.flatMap((n) => (n.relatedIncidents || []).filter((s) => !incSet.has(s)).map((s) => `${n.slug}→${s}`));
  const procOrphanInc = PROCESS_MAPS.flatMap((p) => p.steps.flatMap((st) => (st.incidents || []).filter((s) => !incSet.has(s)).map((s) => `${p.slug}→${s}`)));
  const solOrphanInc = SOLUTIONS.flatMap((s) => s.incidents.filter((x) => !incSet.has(x)).map((x) => `${s.slug}→${x}`));
  const oicOrphanTable = OIC_OBJECTS.filter((o) => !tableSet.has(o.table)).map((o) => o.table);

  const checks: Check[] = [
    { area: "כפילות slug תקלות", result: dupIncidents.length, detail: dupIncidents.join(", ") || "אין", severity: dupIncidents.length ? "warn" : "pass" },
    { area: "חפיפת T-Code (deep∩directory)", result: overlap.length, detail: `${overlap.length} קודים — deduped אוטומטית במנוע (deep גובר). אינפורמטיבי.`, severity: "info", all: overlap },
    { area: "תקלות→טבלה לא במאגר", result: incOrphanTables.length, detail: incOrphanTables.slice(0, 8).join(", ") || "אין — כל הטבלאות מאומתות", severity: incOrphanTables.length > 12 ? "warn" : "info", all: incOrphanTables },
    { area: "Notes→תקלה לא קיימת", result: noteOrphanInc.length, detail: noteOrphanInc.join(", ") || "אין — כל ה-relatedIncidents תקפים", severity: noteOrphanInc.length ? "warn" : "pass" },
    { area: "Process→תקלה לא קיימת", result: procOrphanInc.length, detail: procOrphanInc.join(", ") || "אין", severity: procOrphanInc.length ? "warn" : "pass" },
    { area: "Solution→תקלה לא קיימת", result: solOrphanInc.length, detail: solOrphanInc.join(", ") || "אין", severity: solOrphanInc.length ? "warn" : "pass" },
    { area: "OIC→טבלה לא במאגר", result: oicOrphanTable.length, detail: oicOrphanTable.length ? `${oicOrphanTable.join(", ")} (QM table-less — מטופל ב-fallback)` : "אין", severity: "info" },
  ];
  const scanned = ALL_TABLES.length + TRANSACTIONS.length + TCODE_DIRECTORY.length + INCIDENTS.length;
  return { checks, scanned, dup: dupIncidents.length };
}

export function QualityAuditView() {
  const { checks, scanned, dup } = auditChecks();
  const warns = checks.filter((c) => c.severity === "warn").length;
  return (
    <ToolPage
      surface="quality-audit"
      back={{ href: "/neo/", label: "מסך הבית" }}
      eye="ביקורת איכות ידע"
      eyeEn="Knowledge Quality Audit"
      title="ביקורת איכות ידע"
      lede={
        <p className="ntl-lede-p">
          סריקה סטטית של עקביות המאגר — כפילויות, הפניות יתומות, קישורים שבורים. {nf.format(warns)} ממצאים לתשומת לב.
        </p>
      }
      foot={
        <>
          הערה: כל קישורי ה-<span dir="ltr">cross-link</span> החיצוניים מוגנים-קיום (רנדור כצ&apos;יפ-מידע אם היעד חסר), ולכן 0 לינקים שבורים ב-<span dir="ltr">build</span>.
          {" "}הפניות-תוכן יתומות מוצגות לעיל לשיפור תוכן.
        </>
      }
    >
      <Stats label="סיכום הסריקה" items={[
        { l: "ישויות נסרקות", v: scanned },
        { l: "כפילות slug", v: dup },
        { l: "קישורים שבורים", v: 0, s: "כל הקישורים החוצים מוגנים-קיום" },
      ]} />

      <Sec id="checks" title="בדיקות" en="Checks">
        <div className="ntl-tablewrap">
          <table className="ntl-table">
            <thead>
              <tr>
                <th scope="col">בדיקה</th>
                <th scope="col" className="ntl-num">תוצאה</th>
                <th scope="col">חומרה</th>
                <th scope="col" className="ntl-wide">פירוט</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((c) => (
                <tr key={c.area}>
                  <th scope="row">{c.area}</th>
                  <td className="ntl-num">{c.result}</td>
                  <td><span className="ntl-state" data-st={SEV[c.severity].st}>{SEV[c.severity].he}</span></td>
                  <td><span dir="auto">{c.detail}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {checks.filter((c) => c.all && c.all.length).map((c) => (
          <More key={c.area} summary={<>הרשימה המלאה · {c.area} · {nf.format(c.all!.length)}</>}>
            <ul className="ntl-codes">
              {c.all!.map((x, i) => <li key={`${x}-${i}`}><span className="nct-chip nx-sap" dir="ltr">{x}</span></li>)}
            </ul>
          </More>
        ))}
      </Sec>

      <Onward items={[
        { href: "/neo/verification/", label: "לוח אימות מאגר" },
        { href: "/neo/knowledge/coverage/", label: "דוח כיסוי ידע" },
        { href: "/neo/incidents/", label: "תקלות" },
      ]} />
    </ToolPage>
  );
}
