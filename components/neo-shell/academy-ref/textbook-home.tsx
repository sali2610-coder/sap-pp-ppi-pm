/* ============================================================================
   PROJECT NEO · /neo/academy/<course>/textbook/ — one academy textbook.
   ----------------------------------------------------------------------------
   Server component. The textbook as the old library presented it: its titles,
   its standing (status, review kind, score, last update), its measured size,
   and its chapters, each opening the NEO chapter page. For PP it also carries
   the PP knowledge module's executive summary, figures and glossary.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, BookOpen, Boxes, ChevronDown, FileText, GraduationCap, Info, LayoutGrid, Layers, ListTree } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { PP_CHAPTERS, PP_EXEC_HE, PP_GLOSSARY, PP_STATS } from "@/data/library/pp-knowledge";
import { nodeWordCount, countNodes, type TextbookChapter } from "@/data/library/pp-textbook/types";
import { enLang } from "../lang";
import { learnModVar, LEARN_MOD_HE } from "../learn/mod";
import { type TextbookMeta, chapterHref, fioriIndexHref, nodeMinutes, ppObjectsHref } from "./textbook-data";
import { Txt, hoursHe, nf } from "./parts";

const subtreeWords = (ch: TextbookChapter) =>
  ch.subchapters.reduce((s, n) => {
    const walk = (x: typeof n): number => nodeWordCount(x) + (x.children ?? []).reduce((a, c) => a + walk(c), 0);
    return s + walk(n);
  }, 0);

export function TextbookHomeView({ book, chapters }: { book: TextbookMeta; chapters: TextbookChapter[] }) {
  const pp = book.id === "pp";
  return (
    <div className="nxv nxa" data-surface="textbook" style={{ "--m": learnModVar(book.courseModule) } as React.CSSProperties}>
      <SmartReturn fallback={{ href: book.courseHref, label: `קורס · ${book.courseTitle || book.titleHe}` }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">SAP Academy · {LEARN_MOD_HE[book.courseModule] || book.module} · ספר לימוד</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nx-display">{book.titleHe}</h1>
          <p className="nxv-en" lang={enLang(book.titleEn)}>{book.titleEn}</p>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip nxv-mod"><i aria-hidden="true" />{book.module}</span>
          {book.status === "live" ? (
            <span className="nu-status" style={{ "--s": "var(--status-done)" } as React.CSSProperties}>הושלם</span>
          ) : null}
          <span className="nu-chip">{book.validationKind === "reviewed" ? "נבדק" : "מבני"}</span>
          <span className="nu-chip">ציון {nf.format(book.score)}</span>
          <span className="nu-chip">עודכן {book.lastUpdated}</span>
        </div>
      </header>

      <p className="nxa-figs">
        <span><b>{nf.format(book.stats.chapters)}</b> פרקים</span>
        <span><b>{nf.format(book.stats.subs)}</b> תת-פרקים</span>
        <span><b>{nf.format(book.stats.nodes)}</b> יחידות לימוד</span>
        <span><b>{nf.format(book.stats.words)}</b> מילים</span>
        <span><b>~{hoursHe(book.stats.readMin)}</b> קריאה</span>
      </p>

      <p className="nxv-lede">
        {book.migrated
          ? <>תתי-הפרקים של הספר הם השיעורים של הקורס <Link className="nxa-a" href={book.courseHref} prefetch={false}>{book.courseTitle}</Link>. עמוד כל פרק מציג את מבוא הפרק, את מבנה היחידות ואת תרשימי התהליך, ומפנה לשיעורים.</>
          : <>הספר מוצג כאן במלואו, פרק אחר פרק. הקורס <Link className="nxa-a" href={book.courseHref} prefetch={false}>{book.courseTitle}</Link> בנוי משיעורים לפי נושא ואינו מחליף את הספר.</>}
      </p>

      {pp ? (
        <section className="nxv-sec" aria-labelledby="tb-pp">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><BookOpen size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="tb-pp">מודול ידע — תכנון ייצור (PP)</h2>
          </div>
          <p className="nxv-v">{PP_EXEC_HE}</p>
          <div className="nxv-meta">
            <span className="nu-chip" lang="en">{PP_STATS.book}</span>
            <span className="nu-chip">{nf.format(PP_STATS.chapters)} פרקים</span>
            <span className="nu-chip" dir="ltr">{PP_STATS.pages} pages</span>
            <span className="nu-chip" dir="ltr">{PP_STATS.tcodes} T-Codes</span>
            <span className="nu-chip">{nf.format(PP_STATS.glossary)} מונחים</span>
            <span className="nu-chip" dir="ltr">{PP_STATS.crossLinks} cross-links</span>
          </div>
        </section>
      ) : null}

      <section className="nxv-sec" aria-labelledby="tb-ch">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Layers size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="tb-ch">פרקי הספר</h2>
          <em className="nxv-sec-n">{nf.format(chapters.length)} פרקים</em>
        </div>
        <ul className="nxc-lessons">
          {chapters.map((ch) => {
            const units = ch.subchapters.reduce((s, n) => s + countNodes(n), 0);
            const ppc = pp ? PP_CHAPTERS.find((c) => c.n === ch.n) : null;
            return (
              <li key={ch.n}>
                <Link className="nu-card nxc-l nxa-chrow" href={chapterHref(book.courseId, ch.n)} prefetch={false}>
                  <span className="nxc-l-n">{String(ch.n).padStart(2, "0")}</span>
                  <span className="nxc-l-t">
                    {ch.titleHe}
                    {ch.titleEn ? <span className="nxa-en" lang={enLang(ch.titleEn)} dir="ltr">{ch.titleEn}</span> : null}
                  </span>
                  <span className="nxc-l-s">
                    <span className="nu-chip">{nf.format(ch.subchapters.length)} תת-פרקים</span>
                    <span className="nu-chip">{nf.format(units)} יחידות</span>
                    <span className="nu-chip">~{nf.format(nodeMinutes(subtreeWords(ch)))} דק׳</span>
                    {ppc ? <span className="nu-chip" dir="ltr">pp. {ppc.pages[0]}–{ppc.pages[1]}</span> : null}
                  </span>
                  <span className="nxc-l-go" aria-hidden="true"><ArrowLeft size={14} strokeWidth={2} /></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="nxv-sec" aria-labelledby="tb-more">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><ListTree size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="tb-more">אינדקסים ובקרת איכות</h2>
        </div>
        <ul className="nxa-links">
          <li><Link className="nu-btn2" href={book.referenceHref} prefetch={false}><ListTree size={15} strokeWidth={1.75} aria-hidden="true" />אינדקס T-Codes, טבלאות, Fiori ומילון</Link></li>
          <li><Link className="nu-btn2" href={book.qualityHref} prefetch={false}><FileText size={15} strokeWidth={1.75} aria-hidden="true" />דוח איכות</Link></li>
          {pp ? <li><Link className="nu-btn2" href={ppObjectsHref} prefetch={false}><Boxes size={15} strokeWidth={1.75} aria-hidden="true" />כל אובייקטי ה-PP</Link></li> : null}
          <li><Link className="nu-btn2" href={fioriIndexHref} prefetch={false}><LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />אינדקס אפליקציות Fiori</Link></li>
          <li><Link className="nu-btn2" href={book.courseHref} prefetch={false}><GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />הקורס · {book.courseTitle}</Link></li>
        </ul>
      </section>

      {pp ? (
        <details className="nxl-more">
          <summary>
            <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
            גלוסר (דו-לשוני)
            <em>{nf.format(PP_GLOSSARY.length)} מונחים</em>
          </summary>
          <div className="nxl-more-b">
            <dl className="nxa-gloss">
              {PP_GLOSSARY.map((g) => (
                <div key={g.term}><dt className="nx-sap" dir="ltr">{g.term}</dt><dd>{g.he}</dd></div>
              ))}
            </dl>
          </div>
        </details>
      ) : null}

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>מקור: ספר הלימוד הדיגיטלי של SAP Academy · <Txt s={book.titleEn} />. זמן הקריאה מחושב לפי 180 מילים לדקה.</span>
        </p>
      </div>
    </div>
  );
}
