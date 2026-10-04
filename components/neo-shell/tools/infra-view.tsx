/* ============================================================================
   PROJECT NEO · /neo/sap-infrastructure/ — the SAP infrastructure centre.
   ----------------------------------------------------------------------------
   The legacy page (app/sap-infrastructure/page.tsx) was a client-only explorer
   over public/sap-infrastructure/dataset.json and ./meta. NEO's ERD
   (/neo/erd/) already reads the same two sources: every module's tables and
   relations, the module purpose, business flow, reports and objects, and each
   table's fields, keys, T-Codes, interfaces, CDS views and S/4 note. Each
   table's knowledge and interview profile is on its NEO object page.

   This page carries what NEO had nowhere else, read verbatim, server-side:
     - the PM and PP-PI process learning steps (data/process/process-data.ts,
       the explorer's "process" tab) with each step's organisation example;
     - the HR and BW business objects and flows with their landscape labels;
     - the enriched field lists of the hub tables (meta FIELDS_PLUS);
     - the shared core objects, the cross-module processes and flows, and the
       business documents behind the explorer's counts (dataset + meta
       DOC_META);
     - the module universe as a static index: purpose, flow, objects, reports
       and member tables, linking into the NEO record pages;
     - the global knowledge graph's derived lists (from the legacy /graph/).
   The explorer's synthetic "example records" (meta genExampleRecords) are not
   carried: they were generated sample values, not data.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DOC_META, ERD_MODULES, FIELDS_PLUS, MOD_FLOW, MOD_PURPOSE, MOD_REPORTS, OBJECTS } from "@/app/sap-infrastructure/meta";
import { HR_FLOW, HR_META, HR_OBJECTS, LANDSCAPE_META } from "@/data/hr-module";
import { BW_FLOW, BW_LANDSCAPE_META, BW_META, BW_OBJECTS } from "@/data/bw-module";
import { PROCESS, STEP_MFG } from "@/data/process/process-data";
import { buildGraph, degree, graphStats, KIND_META, type RawTable } from "@/lib/knowledge-graph-global";
import { enLang } from "../lang";
import { bapiHref, cdsHref, idocHref, tableLink, txHref } from "./links";
import { Bullets, Code, Codes, Go, More, Onward, Sec, Stats, TableWrap, ToolPage, nf } from "./kit";

interface DsTable extends RawTable { degree: number; landscape?: string }
interface Ds {
  meta: { counts: Record<string, number> };
  modules: { code: string; he: string }[];
  blueprints: { code: string; purpose: string; inputs: string[]; outputs: string[]; connects: string[] }[];
  processes: { id: string; name: string; he: string; mods: string[]; docs: string[] }[];
  documents: { id: string; he: string; mod: string; tables: string[] }[];
  tables: DsTable[];
  shared: { name: string; he: string; mods: string[] }[];
  crossModule: { from: string; to: string; he: string }[];
}

let _ds: Ds | null = null;
const ds = (): Ds => (_ds ??= JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "sap-infrastructure", "dataset.json"), "utf8")) as Ds);

/* The explorer's module universe and Hebrew names, verbatim from
   app/sap-infrastructure/page.tsx (UNIVERSE, MOD_NAME_HE). */
const UNIVERSE = ["MM", "SD", "PP", "PP-PI", "PM", "QM", "HR", "BW", "CS", "FI", "CO", "BATCH", "CLASS", "IDOC", "PIPO"];
const MOD_NAME_HE: Record<string, string> = { MM: "ניהול חומרים", SD: "מכירות והפצה", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", PM: "תחזוקת מפעל", QM: "ניהול איכות", HR: "משאבי אנוש · HCM/SF", BW: "Business Warehouse · Analytics", CS: "שירות לקוחות", FI: "הנהלת חשבונות", CO: "בקרת עלויות", BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", IDOC: "מסגרת IDOC/ALE", PIPO: "ממשקי PI/PO" };
const EXT: Record<string, { title: string; flow: { he: string; en: string; tables: string[] }[]; objects: { he: string; en: string; tables: string[] }[]; meta: { tables: number; flow: number } }> = {
  HR: { title: "מחזור חיי העובד · Employee Lifecycle", flow: HR_FLOW, objects: HR_OBJECTS, meta: HR_META },
  BW: { title: "זרימת נתונים · BW Data Flow", flow: BW_FLOW, objects: BW_OBJECTS, meta: BW_META },
};
const LAND: Record<string, string> = Object.fromEntries(
  Object.entries({ ...LANDSCAPE_META, ...BW_LANDSCAPE_META }).map(([k, v]) => [k, v.he]),
);
const MOD_HREF: Record<string, string> = { PM: "/neo/pm/", "PP-PI": "/neo/pp-pi/" };
/* The dataset names four documents by abbreviation; meta DOC_META by name. */
const DOC_ABBR: Record<string, string> = { PR: "Purchase Requisition", PO: "Purchase Order", GR: "Goods Receipt", GI: "Goods Issue" };

/** A module's member tables as the explorer drew them: its ERD_MODULES list,
 *  or its sixteen most connected tables when it has none. */
function members(code: string): DsTable[] {
  const byName = new Map(ds().tables.map((t) => [t.name, t]));
  const list = (ERD_MODULES[code] || []).map((n) => byName.get(n)).filter((t): t is DsTable => !!t);
  return list.length ? list : ds().tables.filter((t) => t.mod === code).sort((a, b) => b.degree - a.degree).slice(0, 16);
}

/** A table's NEO record page, else the ERD opened on it (/neo/erd/#NAME is
 *  resolved by the ERD workspace), else nothing: the name stays plain text. */
function tHref(n: string): string | null {
  return tableLink(n) || (ds().tables.some((t) => t.name === n) ? `/neo/erd/#${encodeURIComponent(n)}` : null);
}

function TableCodes({ names }: { names: string[] }) {
  const land = new Map(ds().tables.map((t) => [t.name, t.landscape]));
  return (
    <ul className="ntl-codes">
      {names.map((n) => {
        const l = land.get(n);
        return (
          <li key={n}>
            <Code v={n} href={tHref(n)} />
            {l ? <span className="ntl-land">{LAND[l] || l}</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

function Module({ code }: { code: string }) {
  const d = ds();
  const ext = EXT[code];
  const bp = d.blueprints.find((b) => b.code === code);
  const purpose = bp?.purpose || MOD_PURPOSE[code] || "";
  const mem = members(code);
  const nTables = ext ? ext.meta.tables : mem.length;
  const nProc = ext ? ext.meta.flow : d.processes.filter((p) => p.mods.includes(code)).length;
  const flow = MOD_FLOW[code] || [];
  const objects = ext ? ext.objects : OBJECTS[code] || [];
  const reports = MOD_REPORTS[code] || [];
  return (
    <More summary={<><span className="nx-sap" dir="ltr">{code}</span> · {MOD_NAME_HE[code]} · {nf.format(nTables)} טבלאות · {nf.format(nProc)} תהליכים</>}>
      {purpose ? <p className="nct-p">{purpose}</p> : null}
      {MOD_HREF[code] ? <p className="ntl-note"><Link href={MOD_HREF[code]} prefetch={false} className="nu-link">סביבת העבודה של המודול</Link></p> : null}
      {bp ? (
        <dl className="ntl-dl ntl-dl--3">
          <div><dt>קלט</dt><dd><Bullets items={bp.inputs} /></dd></div>
          <div><dt>פלט</dt><dd><Bullets items={bp.outputs} /></dd></div>
          <div><dt>מתחבר ל-</dt><dd><Codes items={bp.connects} /></dd></div>
        </dl>
      ) : null}
      {flow.length ? (
        <div>
          <h3 className="ntl-lbl">זרימה עסקית · <span dir="ltr">{code}</span></h3>
          <ol className="ntl-flow" aria-label={`זרימה עסקית ${code}`}>
            {flow.map((s) => (
              <li key={s.en}>{s.he} <span className="ntl-en" dir="ltr" lang="en">{s.en}{s.doc && s.doc !== s.en ? ` · ${s.doc}` : ""}</span></li>
            ))}
          </ol>
        </div>
      ) : null}
      {ext ? (
        <div>
          <h3 className="ntl-lbl">{ext.title}</h3>
          <dl className="ntl-dl ntl-dl--2">
            {ext.flow.map((s, i) => (
              <div key={s.en}><dt>{i + 1}. {s.he} <span className="ntl-en" dir="ltr" lang="en">{s.en}</span></dt><dd><TableCodes names={s.tables} /></dd></div>
            ))}
          </dl>
        </div>
      ) : null}
      {objects.length ? (
        <div>
          <h3 className="ntl-lbl">אובייקטים עסקיים · <span dir="ltr">{code}</span></h3>
          <dl className="ntl-dl ntl-dl--2">
            {objects.map((o, i) => (
              <div key={`${o.en}-${i}`}><dt>{String(i + 1).padStart(2, "0")} · {o.he} <span className="ntl-en" dir="ltr" lang="en">{o.en}</span></dt><dd><TableCodes names={o.tables} /></dd></div>
            ))}
          </dl>
        </div>
      ) : null}
      {reports.length ? <div><h3 className="ntl-lbl">דוחות מרכזיים</h3><Codes items={reports} href={txHref} /></div> : null}
      {!ext && mem.length ? <div><h3 className="ntl-lbl">טבלאות מודל הנתונים · {nf.format(mem.length)}</h3><TableCodes names={mem.map((t) => t.name)} /></div> : null}
    </More>
  );
}

function nodeHref(kind: string, label: string): string | null {
  if (kind === "table") return tHref(label);
  if (kind === "bapi" || kind === "fm") return bapiHref(label);
  if (kind === "idoc") return idocHref(label);
  if (kind === "cds" || kind === "consumption") return cdsHref(label);
  if (kind === "tcode") return txHref(label);
  if (kind === "module") return MOD_HREF[label] || "/neo/erd/";
  if (kind === "migration") return "/neo/migration-cockpit/";
  return null;
}

export function InfraView() {
  const d = ds();
  const c = d.meta.counts;
  const g = buildGraph(d.tables);
  const st = graphStats(g);
  const docRows = d.documents.map((x) => ({ ...x, meta: DOC_META[x.id] || DOC_META[DOC_ABBR[x.id] || ""], en: DOC_ABBR[x.id] || x.id }));
  const used = new Set(docRows.map((r) => r.en));
  const metaOnly = Object.entries(DOC_META).filter(([k]) => !used.has(k));
  const lists: [string, string[]][] = [["הכי מקושרים", st.topConnected], ["הכי בשימוש", st.mostUsed], ["הגירה קריטית", st.critMig], ["סיכון גבוה", st.highRisk]];

  return (
    <ToolPage
      surface="sap-infrastructure"
      back={{ href: "/neo/erd/", label: "מודל הנתונים · ERD" }}
      eye="מרכז תשתיות"
      eyeEn="Infrastructure Center"
      title="תשתיות SAP"
      titleEn="SAP Architecture Explorer"
      lede={
        <p className="ntl-lede-p">
          כל מודולי ה-<span dir="ltr">SAP</span> נשענים על אותם אובייקטי ליבה. בחר מודול כדי לצלול: תהליך → אובייקטים → טבלאות → שדות.
          {" "}התרשים האינטראקטיבי של הטבלאות והקשרים נמצא ב<Link href="/neo/erd/" prefetch={false} className="nu-link">מודל הנתונים (ERD)</Link>,
          {" "}והגרף ההטרוגני של <span dir="ltr">PM</span> ו-<span dir="ltr">PP-PI</span> ב-<Link href="/neo/studio/" prefetch={false} className="nu-link">Architecture Studio</Link>.
        </p>
      }
      foot={<>מקור: <span className="nx-sap" dir="ltr">public/sap-infrastructure/dataset.json</span> · <span className="nx-sap" dir="ltr">app/sap-infrastructure/meta</span> · <span className="nx-sap" dir="ltr">data/process/process-data</span> · <span className="nx-sap" dir="ltr">data/hr-module</span> · <span className="nx-sap" dir="ltr">data/bw-module</span>.</>}
    >
      <Stats label="מוני המאגר" items={[
        { l: "מודולים", v: c.modules }, { l: "טבלאות", v: c.tables }, { l: "מסמכים", v: c.documents }, { l: "תהליכים", v: c.processes },
      ]} />

      <Sec id="core" title="SAP CORE — ליבת אובייקטים משותפים">
        <TableWrap label="ליבת אובייקטים משותפים">
          <table className="ntl-table">
            <thead><tr><th scope="col">אובייקט</th><th scope="col">תיאור</th><th scope="col">מודולים</th></tr></thead>
            <tbody>
              {d.shared.map((s) => (
                <tr key={s.name}>
                  <th scope="row"><Code v={s.name} href={tHref(s.name)} /></th>
                  <td>{s.he}</td>
                  <td><span dir="ltr">{s.mods.join(" · ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Sec>

      <Sec id="modules" title="המודולים" en="Universe" note="לכל מודול: מטרה, קלט ופלט, זרימה עסקית, אובייקטים עסקיים וטבלאות הליבה שלהם, דוחות מרכזיים וטבלאות מודל הנתונים.">
        {UNIVERSE.map((m) => <Module key={m} code={m} />)}
      </Sec>

      <Sec id="cross" title="תהליכים חוצי-מודולים" en="End-to-end processes">
        <dl className="ntl-dl ntl-dl--2">
          {d.processes.map((p) => (
            <div key={p.id}>
              <dt>{p.he} <span className="ntl-en" dir="ltr" lang="en">{p.name}</span> · <span dir="ltr">{p.mods.join(" · ")}</span></dt>
              <dd><ol className="ntl-flow" aria-label={`מסמכי ${p.he}`}>{p.docs.map((x) => <li key={x}><span dir={enLang(x) ? "ltr" : undefined} lang={enLang(x)}>{x}</span></li>)}</ol></dd>
            </div>
          ))}
        </dl>
        <h3 className="ntl-lbl">זרימות בין מודולים</h3>
        <ul className="nct-bul">
          {d.crossModule.map((x) => <li key={`${x.from}-${x.to}`}><span dir="ltr">{x.from} → {x.to}</span>: {x.he}</li>)}
        </ul>
      </Sec>

      <Sec id="docs" title="מסמכים עסקיים" en="Business documents">
        <TableWrap label="מסמכים עסקיים">
          <table className="ntl-table ntl-table--wide">
            <thead><tr><th scope="col">מסמך</th><th scope="col">מודול</th><th scope="col">טבלאות</th><th scope="col">בעלים</th><th scope="col" className="ntl-wide">מטרה</th><th scope="col">טרנזקציות</th><th scope="col">קלט → פלט</th></tr></thead>
            <tbody>
              {docRows.map((r) => (
                <tr key={r.id}>
                  <th scope="row">{r.he} <span className="ntl-en" dir="ltr" lang="en">{r.en}</span></th>
                  <td><span dir="ltr">{r.mod}</span></td>
                  <td><TableCodes names={r.tables} /></td>
                  <td>{r.meta?.owner || "—"}</td>
                  <td>{r.meta?.purpose || "אין פירוט במאגר למסמך זה."}</td>
                  <td><span className="nx-sap" dir="ltr">{r.meta?.tcodes || "—"}</span></td>
                  <td>{r.meta ? `${r.meta.inputs.join(", ")} → ${r.meta.outputs.join(", ")}` : "—"}</td>
                </tr>
              ))}
              {metaOnly.map(([k, m]) => (
                <tr key={k}>
                  <th scope="row"><span dir="ltr" lang="en">{k}</span></th>
                  <td>—</td><td>—</td>
                  <td>{m.owner}</td><td>{m.purpose}</td>
                  <td><span className="nx-sap" dir="ltr">{m.tcodes}</span></td>
                  <td>{`${m.inputs.join(", ")} → ${m.outputs.join(", ")}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Sec>

      <Sec id="process" title="תהליכי למידה · PM ו-PP-PI" en="Process Learning Workspace">
        {(["PM", "PP-PI"] as const).map((k) => {
          const def = PROCESS[k];
          return (
            <div key={k} className="ntl-proc">
              <h3 className="ntl-h3"><span dir="ltr">{k}</span> · {def.he} <span className="ntl-prog-t">{def.sub}</span></h3>
              {def.steps.map((s, i) => (
                <More key={s.id} summary={<>{i + 1}. {s.phaseHe} · {s.title}{s.object ? <> · <span className="nx-sap" dir="ltr">{s.object}</span></> : null}</>}>
                  {s.object ? <p className="ntl-note">אובייקט: <Code v={s.object} href={tHref(s.object)} /></p> : null}
                  <dl className="ntl-dl ntl-dl--2">
                    <div><dt>מה זה</dt><dd>{s.whatHe}</dd></div>
                    <div><dt>למה</dt><dd>{s.whyHe}</dd></div>
                    <div><dt>מתי</dt><dd>{s.whenHe}</dd></div>
                    <div><dt>מטרה עסקית</dt><dd>{s.businessHe}</dd></div>
                  </dl>
                  <div><h4 className="ntl-lbl">רעיונות לבדיקות QA</h4><Bullets items={s.qaHe} /></div>
                  <div>
                    <h4 className="ntl-lbl">שאלות ראיון</h4>
                    <ul className="nct-bul">{s.interview.map((q, j) => <li key={j}><b>{q.level === "senior" ? "בכיר" : "זוטר"}:</b> {q.q}</li>)}</ul>
                  </div>
                  {STEP_MFG[s.id] ? <div><h4 className="ntl-lbl">דוגמת ייצור — הארגון</h4><p className="nct-p">{STEP_MFG[s.id]}</p></div> : null}
                </More>
              ))}
            </div>
          );
        })}
      </Sec>

      <Sec id="fields" title="שדות עסקיים מרכזיים בטבלאות הליבה" en="Key business fields">
        {Object.entries(FIELDS_PLUS).map(([t, fields]) => (
          <More key={t} summary={<><span className="nx-sap" dir="ltr">{t}</span> · {nf.format(fields.length)} שדות</>}>
            {tableLink(t) ? <p className="ntl-note"><Link href={tableLink(t)!} prefetch={false} className="nu-link">דף הטבלה <span className="nx-sap" dir="ltr">{t}</span></Link></p> : null}
            <TableWrap label={`שדות עסקיים מרכזיים · ${t}`}>
              <table className="ntl-table">
                <thead><tr><th scope="col">שדה</th><th scope="col">תיאור</th><th scope="col"><span dir="ltr">Description</span></th><th scope="col">מפתח</th></tr></thead>
                <tbody>
                  {fields.map(([f, en, he, key]) => (
                    <tr key={f}><th scope="row"><span className="nx-sap" dir="ltr">{f}</span></th><td>{he}</td><td><span dir="ltr" lang="en">{en}</span></td><td><span dir="ltr">{key === "-" ? "—" : key}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </More>
        ))}
      </Sec>

      <Sec id="graph" title="גרף הידע הגלובלי" en="Global Knowledge Graph">
        <p className="nct-p">
          {nf.format(st.total)} צמתים · {nf.format(st.edges)} קשרים:{" "}
          {Object.entries(st.byKind).map(([k, n]) => `${KIND_META[k as keyof typeof KIND_META]?.he || k} ${nf.format(n)}`).join(" · ")}.
        </p>
        <dl className="ntl-dl ntl-dl--2">
          {lists.map(([label, ids]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <ul className="ntl-links">
                  {ids.map((id) => {
                    const n = g.nodes.get(id);
                    if (!n) return null;
                    const href = nodeHref(n.kind, n.label);
                    const body = <><span className={n.kind === "migration" ? undefined : "nx-sap"} dir={enLang(n.label) ? "ltr" : undefined}>{n.label}</span> · {KIND_META[n.kind].he} · {nf.format(degree(g, id))} קשרים</>;
                    return <li key={id}>{href ? <Go href={href} className="nu-link">{body}</Go> : body}</li>;
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Sec>

      <Sec id="export" title="מפת הארכיטקטורה להורדה" en="A0 poster · dataset">
        {/* The legacy export bar's four files, in its order (app/sap-infrastructure/page.tsx). */}
        <ul className="ntl-links">
          {["SAP-Enterprise-Architecture-A0.pdf", "SAP-Enterprise-Architecture-A0.png", "SAP-Enterprise-Architecture-A0.svg", "dataset.json"].map((f) => (
            <li key={f}><a href={`/sap-infrastructure/${f}`} download className="nu-link"><span dir="ltr">{f}</span></a></li>
          ))}
        </ul>
      </Sec>

      <Onward items={[
        { href: "/neo/erd/", label: "מודל הנתונים · ERD" },
        { href: "/neo/studio/", label: "Architecture Studio" },
        { href: "/neo/tables/", label: "טבלאות SAP" },
        { href: "/neo/migration-cockpit/", label: "קוקפיט המעבר" },
      ]} />
    </ToolPage>
  );
}
