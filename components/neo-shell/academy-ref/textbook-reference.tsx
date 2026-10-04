/* ============================================================================
   PROJECT NEO · /neo/academy/<course>/textbook/reference/ — a textbook's
   reference index.
   ----------------------------------------------------------------------------
   Server component. The four indexes the old library computed for each
   textbook (data/library/academy-index.ts#bookReference): T-Codes, tables,
   Fiori apps and the SAP-object glossary. Every entry keeps its count, the
   other textbooks that also name it, and its first twelve occurrences — the
   same twelve the old page listed — each opening the NEO page that carries
   that unit. All four lists are in the HTML; the long ones fold.
   ========================================================================== */

import Link from "next/link";
import { ChevronDown, Info, ListTree } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { enLang } from "../lang";
import { learnModVar, LEARN_MOD_HE } from "../learn/mod";
import type { RefRow, ReferencePage } from "./textbook-data";
import { Code, nf } from "./parts";

function IndexTable({ rows, label }: { rows: RefRow[]; label: string }) {
  return (
    <div className="nxs-tbl-w">
      <table className="nxs-tbl nxa-tbl">
        <thead>
          <tr>
            <th scope="col">{label}</th>
            <th scope="col">הופעות</th>
            <th scope="col">יחידות הלימוד שבהן מופיע</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.code}>
              <td>
                <Code code={e.code} href={e.href} />
                {e.books.length ? <span className="nxa-books">{e.books.join("·")}</span> : null}
              </td>
              <td className="nxa-num">{nf.format(e.count)} הופעות</td>
              <td>
                <ul className="nxa-refs">
                  {e.refs.map((r) => (
                    <li key={r.id}>
                      {r.href ? (
                        <Link className="nxa-a" href={r.href} prefetch={false}>
                          <span className="nx-sap" dir="ltr">{r.id}</span> {r.titleHe}
                        </Link>
                      ) : (
                        <span><span className="nx-sap" dir="ltr">{r.id}</span> {r.titleHe}</span>
                      )}
                    </li>
                  ))}
                  {e.count > e.refs.length ? <li className="nx-muted">ועוד {nf.format(e.count - e.refs.length)}</li> : null}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TextbookReferenceView({ d }: { d: ReferencePage }) {
  const { book } = d;
  const lists: { id: string; label: string; col: string; rows: RefRow[] }[] = [
    { id: "tcodes", label: "T-Codes", col: "T-Code", rows: d.tcodes },
    { id: "tables", label: "טבלאות", col: "טבלה", rows: d.tables },
    { id: "fiori", label: "Fiori Apps", col: "אפליקציית Fiori", rows: d.fiori },
  ];
  return (
    <div className="nxv nxa" data-surface="textbook" style={{ "--m": learnModVar(book.courseModule) } as React.CSSProperties}>
      <SmartReturn fallback={{ href: book.href, label: `ספר הלימוד · ${book.titleHe}` }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">SAP Academy · {LEARN_MOD_HE[book.courseModule] || book.module} · אינדקסים</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nx-display">{book.titleHe} — אינדקס מקצועי</h1>
          <p className="nxv-en" lang={enLang(book.titleEn)}>{book.titleEn}</p>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip nxv-mod"><i aria-hidden="true" />{book.module}</span>
          {lists.map((l) => <span key={l.id} className="nu-chip">{l.label} · {nf.format(l.rows.length)}</span>)}
          <span className="nu-chip">מילון · {nf.format(d.glossary.length)}</span>
        </div>
      </header>

      <p className="nxv-lede">
        כל מזהה SAP שספר הלימוד מזכיר, עם מספר ההופעות, הספרים האחרים שמזכירים אותו ועד שתים-עשרה יחידות הלימוד הראשונות שבהן הוא מופיע.
      </p>

      {lists.map((l, i) => (
        <details key={l.id} className="nxl-more" id={`ref-${l.id}`} open={i === 0}>
          <summary>
            <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
            <span dir="auto">{l.label}</span>
            <em>{nf.format(l.rows.length)}</em>
          </summary>
          <div className="nxl-more-b">
            {l.rows.length ? <IndexTable rows={l.rows} label={l.col} /> : <p className="nx-muted">אין בספר זה מזהים מסוג זה.</p>}
          </div>
        </details>
      ))}

      <details className="nxl-more" id="ref-glossary">
        <summary>
          <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          מילון
          <em>{nf.format(d.glossary.length)} מונחים</em>
        </summary>
        <div className="nxl-more-b">
          <div className="nxs-tbl-w">
            <table className="nxs-tbl nxa-tbl">
              <thead>
                <tr><th scope="col">מונח</th><th scope="col">סוג</th><th scope="col">הופעה ראשונה בספר</th></tr>
              </thead>
              <tbody>
                {d.glossary.map((g) => (
                  <tr key={`${g.kind}-${g.term}`}>
                    <td>
                      <Code code={g.term} href={g.href} />
                      {g.books.length ? <span className="nxa-books">{g.books.join("·")}</span> : null}
                    </td>
                    <td>{g.kind}</td>
                    <td>{g.he}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>

      <div className="nxv-foot">
        <p className="nxv-src">
          <ListTree size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            האינדקס מחושב מיחידות הלימוד של הספר. רשימת הספרים ליד מזהה מציינת את ספרי האקדמיה האחרים שמזכירים אותו.
          </span>
        </p>
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מזהה עם קישור פותח את הרשומה שלו ב-Project NEO; מזהה בלי קישור הוא מזהה שאין לו עמוד ב-NEO.{" "}
            <Link className="nxa-a" href={book.href} prefetch={false}>חזרה לספר הלימוד</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
