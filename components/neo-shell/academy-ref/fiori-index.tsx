/* ============================================================================
   PROJECT NEO · /neo/academy/fiori/ — the academy's SAP Fiori apps index.
   ----------------------------------------------------------------------------
   Server component. The 1,450 apps of data/library/fiori-apps.json (id, name,
   type), each with the academy units that name it, as the old library's
   Fiori index listed them. An app NEO documents opens its NEO page; a unit
   opens the NEO page that carries it. Grouped by app type, the long groups
   folded, every row in the HTML.
   ========================================================================== */

import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import APPS from "@/data/library/fiori-apps.json";
import { BOOKS, SEARCH_DOCS } from "@/data/library/academy-index";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { fioriLink, nodeHref } from "./textbook-data";
import { Code, nf } from "./parts";

interface App { id: string; name: string; type: string }
const ALL = APPS as App[];
const REFS_SHOWN = 4;

/** app id → the academy units that name it, in corpus order. */
function refsByApp() {
  // The old index's own label: the textbook's route base, upper-cased (PP, PM, QM, MM, WM, PPDS, SOP, PMU).
  const label = Object.fromEntries(BOOKS.map((b) => [b.id, (b.base.split("/").pop() ?? b.id).replace("-academy", "").toUpperCase()]));
  const m = new Map<string, { label: string; id: string; href: string | null }[]>();
  for (const d of SEARCH_DOCS) {
    for (const code of d.codes.split(" ")) {
      if (!/^F\d{3,5}/.test(code)) continue;
      const list = m.get(code) ?? [];
      list.push({ label: label[d.bookId] ?? d.bookId.toUpperCase(), id: d.id, href: nodeHref(d.bookId, d.id, d.ch) });
      m.set(code, list);
    }
  }
  return m;
}

export function FioriIndexView() {
  const refs = refsByApp();
  const types = [...new Set(ALL.map((a) => a.type))].sort();
  const linked = ALL.filter((a) => refs.has(a.id)).length;
  return (
    <div className="nxv nxa" data-surface="textbook">
      <SmartReturn fallback={{ href: "/neo/academy/", label: "SAP Academy" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">SAP Academy · אינדקס אפליקציות Fiori</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nx-display">מדריך מהיר ל-Fiori — אינדקס מחיפוש</h1>
          <p className="nxv-en" lang="en">SAP Fiori Apps — Quick Reference Index</p>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip">{nf.format(ALL.length)} אפליקציות</span>
          {types.map((t) => <span key={t} className="nu-chip"><span lang="en">{t}</span> · {nf.format(ALL.filter((a) => a.type === t).length)}</span>)}
        </div>
      </header>

      <p className="nxv-lede">
        {`${ALL.length} אפליקציות · מזהה · שם · סוג · קישור לקורסי האקדמיה.`} {nf.format(linked)} מהן מוזכרות ביחידות לימוד של ספרי האקדמיה.
      </p>

      {types.map((t, i) => {
        const rows = ALL.filter((a) => a.type === t);
        return (
          <details key={t} className="nxl-more" open={i === 0 && rows.length < 300}>
            <summary>
              <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
              <span lang="en">{t}</span>
              <em>{nf.format(rows.length)} אפליקציות</em>
            </summary>
            <div className="nxl-more-b">
              <div className="nxs-tbl-w">
                <table className="nxs-tbl nxa-tbl">
                  <thead>
                    <tr><th scope="col">מזהה</th><th scope="col">שם האפליקציה</th><th scope="col">יחידות לימוד באקדמיה</th></tr>
                  </thead>
                  <tbody>
                    {rows.map((a) => {
                      const r = refs.get(a.id) ?? [];
                      return (
                        <tr key={a.id}>
                          <td><Code code={a.id} href={fioriLink(a.id)} /></td>
                          <td lang="en" dir="ltr" className="nxa-name">{a.name}</td>
                          <td>
                            {r.length ? (
                              <ul className="nxa-refs">
                                {r.slice(0, REFS_SHOWN).map((x, k) => (
                                  <li key={k}>
                                    {x.href ? (
                                      <Link className="nxa-a" href={x.href} prefetch={false}><span dir="ltr">{x.label} {x.id}</span></Link>
                                    ) : <span dir="ltr">{x.label} {x.id}</span>}
                                  </li>
                                ))}
                                {r.length > REFS_SHOWN ? <li className="nx-muted">ועוד {nf.format(r.length - REFS_SHOWN)}</li> : null}
                              </ul>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        );
      })}

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: אינדקס אפליקציות ה-Fiori של ספריית האקדמיה. מזהה עם קישור פותח את עמוד האפליקציה ב-Project NEO, שבו מתועדים התפקיד, הקטלוג ושירות ה-OData;
            לשאר האפליקציות אין עדיין תיעוד מאומת בפרויקט.
          </span>
        </p>
      </div>
    </div>
  );
}
