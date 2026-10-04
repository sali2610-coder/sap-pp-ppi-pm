/* ============================================================================
   PROJECT NEO · /neo/academy/pp-pi/objects/ — the PP textbook's object index.
   ----------------------------------------------------------------------------
   Server components. lib/pp-object-index.ts aggregates every SAP identifier the
   PP knowledge module names (data/library/pp-knowledge.ts) to the chapters it
   appears in, with the glossary's Hebrew note where one exists. Each object
   page carries the code, its kinds, the note, every chapter with the page
   range of the source book, a link to the NEO chapter that carries that
   chapter, and the object's full NEO record when NEO has one.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, BookOpen, Boxes, Database, Info, Layers } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { PP_CHAPTERS, PP_STATS } from "@/data/library/pp-knowledge";
import { KIND_LABEL, PP_OBJECTS, type PPObject } from "@/lib/pp-object-index";
import { learnModVar } from "../learn/mod";
import { chapterHref, ppObjectHref, recordLink, textbookHref } from "./textbook-data";
import { Code, nf } from "./parts";

const COURSE = "pp-pi";

export function PPObjectView({ obj }: { obj: PPObject }) {
  const chapters = obj.chapters.map((n) => PP_CHAPTERS.find((c) => c.n === n)).filter((c): c is (typeof PP_CHAPTERS)[number] => !!c);
  const record = recordLink(obj.code);
  return (
    <div className="nxv nxa" data-surface="textbook" style={{ "--m": learnModVar("PP-PI") } as React.CSSProperties}>
      <SmartReturn fallback={{ href: "/neo/academy/pp-pi/objects/", label: "אובייקטי ה-PP" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">SAP Academy · ספר הלימוד PP · אובייקט SAP</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nxv-h1--rec nx-sap" dir="ltr">{obj.code}</h1>
        </div>
        <div className="nxv-meta">
          {obj.kinds.map((k) => <span key={k} className="nu-chip" dir="ltr">{KIND_LABEL[k]}</span>)}
          <span className="nu-chip">{nf.format(chapters.length)} פרקים</span>
        </div>
      </header>

      {obj.he ? (
        <p className="nxv-lede">{obj.he}</p>
      ) : (
        <p className="nx-muted">למזהה זה אין הערה במונחון של ספר ה-PP.</p>
      )}

      <section className="nxv-sec" aria-labelledby="po-ch">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Layers size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="po-ch">מופיע בפרקים</h2>
          <em className="nxv-sec-n">{nf.format(chapters.length)}</em>
        </div>
        <ul className="nxc-lessons">
          {chapters.map((c) => (
            <li key={c.n}>
              <Link className="nu-card nxc-l nxa-chrow" href={chapterHref(COURSE, c.n)} prefetch={false}>
                <span className="nxc-l-n">{c.n} .</span>
                <span className="nxc-l-t">
                  {c.he}
                  <span className="nxa-en" lang="en" dir="ltr">{c.en}</span>
                </span>
                <span className="nxc-l-s"><span className="nu-chip" dir="ltr">pp. {c.pages[0]} – {c.pages[1]}</span></span>
                <span className="nxc-l-go" aria-hidden="true"><ArrowLeft size={14} strokeWidth={2} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="nxv-sec" aria-labelledby="po-rec">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Database size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="po-rec">הרשומה ב-Project NEO</h2>
        </div>
        {record ? (
          <p>
            <Link className="nu-btn2" href={record} prefetch={false}>
              <Boxes size={15} strokeWidth={1.75} aria-hidden="true" />
              הרשומה המלאה של <span className="nx-sap" dir="ltr">{obj.code}</span>
              <ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" />
            </Link>
          </p>
        ) : (
          <p className="nx-muted">ל-<span className="nx-sap" dir="ltr">{obj.code}</span> אין עמוד רשומה ב-Project NEO. המזהה מתועד כאן מתוך ספר ה-PP בלבד.</p>
        )}
      </section>

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: מודול הידע של ספר ה-PP (<span lang="en" dir="ltr">{PP_STATS.book}</span>). טווחי העמודים הם של ספר המקור.{" "}
            <Link className="nxa-a" href="/neo/academy/pp-pi/objects/" prefetch={false}>כל אובייקטי ה-PP</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export function PPObjectsIndexView() {
  const byKind = new Map<string, number>();
  for (const o of PP_OBJECTS) for (const k of o.kinds) byKind.set(k, (byKind.get(k) ?? 0) + 1);
  return (
    <div className="nxv nxa" data-surface="textbook" style={{ "--m": learnModVar("PP-PI") } as React.CSSProperties}>
      <SmartReturn fallback={{ href: textbookHref(COURSE), label: "ספר הלימוד · תכנון ייצור ובקרה" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">SAP Academy · ספר הלימוד PP</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nx-display">כל אובייקטי ה-PP</h1>
          <p className="nxv-en" lang="en">{PP_STATS.book}</p>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip">{nf.format(PP_OBJECTS.length)} מזהים</span>
          {[...byKind.entries()].map(([k, n]) => (
            <span key={k} className="nu-chip"><span dir="ltr">{KIND_LABEL[k as keyof typeof KIND_LABEL]}</span> · {nf.format(n)}</span>
          ))}
        </div>
      </header>

      <p className="nxv-lede">
        כל מזהה SAP שמודול הידע של ספר ה-PP מזכיר, עם הפרקים שבהם הוא מופיע והערה מהמונחון כשיש.
      </p>

      <div className="nxs-tbl-w">
        <table className="nxs-tbl nxa-tbl">
          <thead>
            <tr><th scope="col">מזהה</th><th scope="col">סוג</th><th scope="col">פרקים</th><th scope="col">הערה</th></tr>
          </thead>
          <tbody>
            {PP_OBJECTS.map((o) => (
              <tr key={o.code}>
                <td><Code code={o.code} href={ppObjectHref(o.code)} /></td>
                <td dir="ltr" className="nxa-kinds">{o.kinds.map((k) => KIND_LABEL[k]).join(" · ")}</td>
                <td className="nxa-num" dir="ltr">{o.chapters.join(", ")}</td>
                <td>{o.he}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="nxv-foot">
        <p className="nxv-src">
          <BookOpen size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: מודול הידע של ספר ה-PP. <Link className="nxa-a" href={textbookHref(COURSE)} prefetch={false}>ספר הלימוד</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
