/* ============================================================================
   PROJECT NEO · /neo/academy — the academy's eight textbooks.
   ----------------------------------------------------------------------------
   Server component, handed to the client directory as its children so none of
   it ships as JavaScript. What the old academy home and dashboard said about
   the textbooks: the totals, each textbook's standing and measured size, and
   the SAP objects two or more textbooks share. Every figure is computed from
   the textbooks themselves (data/library/academy-index.ts).
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, GraduationCap, LayoutGrid, ListTree, Network } from "lucide-react";
import { learnModVar } from "../learn/mod";
import { type AcademyLibrary, fioriIndexHref, ppObjectsHref } from "./textbook-data";
import { Code, nf } from "./parts";

export function AcademyLibrarySection({ lib }: { lib: AcademyLibrary }) {
  const t = lib.totals;
  return (
    <section className="nxa-lib" aria-labelledby="ac-books">
      <div className="nxv-sec-h">
        <span className="nxv-sec-i" aria-hidden="true"><BookOpen size={16} strokeWidth={1.75} /></span>
        <h2 className="nx-h2" id="ac-books">ספרי הלימוד של האקדמיה</h2>
        <em className="nxv-sec-n">{nf.format(t.books)}</em>
      </div>
      <p className="nx-muted nxa-lib-l">
        כל קורס נשען על ספר לימוד דיגיטלי: פרקים, יחידות לימוד, אינדקס מזהי SAP ודוח איכות.
      </p>
      <p className="nxa-figs">
        <span><b>{nf.format(t.books)}</b> ספרים</span>
        <span><b>{nf.format(t.completed)}</b> הושלמו</span>
        <span><b>{nf.format(t.queued)}</b> בתור</span>
        <span><b>{nf.format(t.chapters)}</b> פרקים</span>
        <span><b>{nf.format(t.units)}</b> יחידות לימוד</span>
        <span><b dir="ltr">{`~${Math.round(t.readMin / 60)}h`}</b> לימוד</span>
      </p>

      <ul className="nxa-books-l">
        {lib.books.map((b) => (
          <li key={b.id} className="nx-card nxa-book" style={{ "--m": learnModVar(b.courseModule) } as React.CSSProperties}>
            <div className="nxa-book-h">
              <span className="nu-chip nxl-mod"><i aria-hidden="true" />{b.module}</span>
              {b.status === "live" ? (
                <span className="nu-status" style={{ "--s": "var(--status-done)" } as React.CSSProperties}>הושלם</span>
              ) : null}
              <span className="nu-chip">{b.validationKind === "reviewed" ? "נבדק" : "מבני"}</span>
              <span className="nu-chip">ציון איכות {nf.format(b.score)}</span>
            </div>
            <h3 className="nxa-book-t">
              <Link className="nxa-a" href={b.href} prefetch={false}>{b.titleHe}</Link>
            </h3>
            <p className="nxv-en" lang="en">{b.titleEn}</p>
            <p className="nxa-figs">
              <span><b>{nf.format(b.stats.chapters)}</b> פרקים</span>
              <span><b>{nf.format(b.stats.nodes)}</b> יחידות</span>
              <span>{`~ ${Math.round(b.stats.readMin / 60)} ש׳ לימוד`}</span>
              <span dir="ltr">{`~${b.stats.readMin}`}</span><span>דק׳</span>
              <span>עודכן {b.lastUpdated}</span>
            </p>
            <ul className="nxa-links">
              <li><Link className="nu-btn2" href={b.href} prefetch={false}><BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />ספר הלימוד</Link></li>
              <li><Link className="nu-btn2" href={b.referenceHref} prefetch={false}><ListTree size={15} strokeWidth={1.75} aria-hidden="true" />אינדקסים</Link></li>
              <li><Link className="nu-btn2" href={b.qualityHref} prefetch={false}><FileText size={15} strokeWidth={1.75} aria-hidden="true" />דוח איכות</Link></li>
              <li><Link className="nu-btn2" href={b.courseHref} prefetch={false}><GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />הקורס<ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" /></Link></li>
            </ul>
          </li>
        ))}
      </ul>

      <ul className="nxa-links">
        <li><Link className="nu-btn2" href={fioriIndexHref} prefetch={false}><LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />אינדקס אפליקציות Fiori</Link></li>
        <li><Link className="nu-btn2" href={ppObjectsHref} prefetch={false}><ListTree size={15} strokeWidth={1.75} aria-hidden="true" />אובייקטי ספר ה-PP</Link></li>
        <li><Link className="nu-btn2" href="/neo/academy/tracks/" prefetch={false}><GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />מסלולי למידה</Link></li>
      </ul>

      <div className="nxa-cross">
        <h3 className="nxa-book-t"><Network size={15} strokeWidth={1.75} aria-hidden="true" /> קישורים חוצי-ספרים — אובייקטי SAP משותפים</h3>
        <p className="nx-muted">
          אובייקטים המופיעים ביותר מספר אחד — נקודות החיבור בין המודולים. מוצגים {nf.format(lib.cross.length)} הראשונים מתוך {nf.format(lib.crossTotal)}.
        </p>
        <ul className="nxa-cross-l">
          {lib.cross.map((c) => (
            <li key={`${c.kind}-${c.code}`}>
              <Code code={c.code} href={c.href} />
              <span className="nxa-books">{c.books.join("·")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
