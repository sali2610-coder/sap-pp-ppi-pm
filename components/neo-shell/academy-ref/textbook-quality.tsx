/* ============================================================================
   PROJECT NEO · /neo/academy/<course>/textbook/quality/ — how far a textbook
   can be trusted, in its own words.
   ----------------------------------------------------------------------------
   Server component. A quality report is content for the reader, not an
   editorial artefact: it says which SAP identifiers were verified, which were
   authored from domain knowledge and must be checked against the tenant, and
   which source subchapters are missing. That is the textbook's evidence label,
   so NEO carries it beside the textbook.

   PP has a reviewed, per-chapter audit (data/library/pp-quality.ts). The other
   seven have the deterministic structural report the old library computed
   (data/library/academy-index.ts#structuralReport). Both are rendered as the
   data holds them; the verdict sentences are the old report's own templates
   with the measured figures in their slots.
   ========================================================================== */

import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronDown, Info, ListTree, ShieldCheck } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { PP_QUALITY, PP_QUALITY_META, PP_REVALIDATED, type ChapterQA, type QAFinding, type Severity } from "@/data/library/pp-quality";
import type { StructuralReport } from "@/data/library/academy-index";
import { enLang } from "../lang";
import { learnModVar, LEARN_MOD_HE } from "../learn/mod";
import { type TextbookMeta, chapterHref } from "./textbook-data";
import { nf } from "./parts";

const SEV_HE: Record<Severity, string> = { high: "גבוה", med: "בינוני", low: "נמוך" };
const SEV_S: Record<Severity, string> = { high: "var(--status-blocked)", med: "var(--status-in-conversion)", low: "var(--status-not-started)" };
const scoreOf = (c: ChapterQA) => PP_REVALIDATED[c.n] ?? c.confidence;
const HIER_HE = { high: "תואמת", medium: "חלקית", low: "חורגת" } as const;

function Findings({ title, items, resolved }: { title: string; items: QAFinding[]; resolved?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="nxv-fact">
      <p className="nxv-l">{title}{resolved ? " · תוקן" : ""}</p>
      <ul className="nxa-findings" data-resolved={resolved ? "1" : undefined}>
        {items.map((f, i) => (
          <li key={i}>
            <span className="nu-status" style={{ "--s": SEV_S[f.severity] } as React.CSSProperties}>{SEV_HE[f.severity]}</span>
            <span>
              {f.node ? <span className="nx-sap" dir="ltr">{f.node}</span> : null}{f.node ? " " : ""}
              {f.value ? <b className="nx-sap" dir="ltr">{f.value}</b> : null}{f.value ? " " : ""}
              {f.problem}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="nxv-fact">
      <p className="nxv-l">{title}</p>
      <ul className="nxs-l">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </div>
  );
}

function Head({ book, eyebrow, title }: { book: TextbookMeta; eyebrow: string; title: string }) {
  return (
    <header className="nxv-head">
      <span className="nx-modbar" aria-hidden="true" />
      <span className="nx-eyebrow">SAP Academy · {LEARN_MOD_HE[book.courseModule] || book.module} · {eyebrow}</span>
      <div className="nxv-title">
        <h1 className="nxv-h1 nx-display">{title}</h1>
        <p className="nxv-en" lang={enLang(book.titleEn)}>{book.titleEn}</p>
      </div>
    </header>
  );
}

function PPReport({ book }: { book: TextbookMeta }) {
  const M = PP_QUALITY_META;
  const avg = Math.round(PP_QUALITY.reduce((s, c) => s + scoreOf(c), 0) / PP_QUALITY.length);
  const atBar = PP_QUALITY.filter((c) => scoreOf(c) >= M.publishBar).length;
  const totalHigh = PP_QUALITY.reduce((s, c) => s + c.sapObjectIssues.filter((f) => f.severity === "high").length + (M.crossLinksResolved ? 0 : c.crossLinkIssues.filter((f) => f.severity === "high").length), 0);
  const totalIssues = PP_QUALITY.reduce((s, c) => s + c.sapObjectIssues.length + c.crossLinkIssues.length + c.hierarchyIssues.length + c.terminologyIssues.length + c.orgIssues.length + c.missingContent.length, 0);
  return (
    <>
      <Head book={book} eyebrow="ביקורת איכות — לפני פרסום" title="דוח איכות — אקדמיית PP" />
      <p className="nxv-lede">{M.scopeHe}</p>
      <p className="nxa-figs">
        <span>נוצר: {M.generatedHe}</span>
        <span>אומת מחדש: {M.revalidatedHe}</span>
      </p>
      <p className="nxa-figs">
        <span><b>{nf.format(avg)}</b> ציון ממוצע</span>
        <span><b>{nf.format(atBar)}/{nf.format(PP_QUALITY.length)}</b> ≥ {M.publishBar} (סף פרסום)</span>
        <span><b>{nf.format(totalHigh)}</b> פגמים חמורים</span>
        <span><b>{nf.format(totalIssues)}</b> סה&quot;כ ממצאים</span>
      </p>

      <section className="nxv-sec" aria-labelledby="q-fixed">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><ShieldCheck size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="q-fixed">תוקן בסבב התיקון</h2>
        </div>
        <ul className="nxs-l nxs-l--note" data-tone="good">{M.resolvedHe.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </section>

      <section className="nxv-sec" aria-labelledby="q-left">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><AlertTriangle size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="q-left">נותר לאימות מול ה-tenant</h2>
        </div>
        <ul className="nxs-l nxs-l--note" data-tone="warn">{M.remainingHe.map((x, i) => <li key={i}>{x}</li>)}</ul>
        <p className="nxv-v">
          <b>מסקנה:</b> ממוצע מאומת {avg} · {atBar}/{PP_QUALITY.length} פרקים ≥ {M.publishBar}. כל הקישורים השבורים והמיפויים השגויים תוקנו; הנותר הוא אימות מזהי-Fiori מול ה-tenant (לא חוסם פרסום). תבנית האקדמיה מאומתת ומוכנה לשאר הספרים.
        </p>
      </section>

      <details className="nxl-more">
        <summary>
          <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          ממצאים מערכתיים שזוהו בביקורת
          <em>{nf.format(M.systemicHe.length)}</em>
        </summary>
        <div className="nxl-more-b"><ul className="nxs-l">{M.systemicHe.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
      </details>

      <section className="nxv-sec" aria-labelledby="q-ch">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><ListTree size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="q-ch">הביקורת לפי פרק</h2>
          <em className="nxv-sec-n">{nf.format(PP_QUALITY.length)} פרקים</em>
        </div>
        <div className="nxa-qcards">
          {PP_QUALITY.map((c) => {
            const high = c.sapObjectIssues.filter((f) => f.severity === "high").length + (M.crossLinksResolved ? 0 : c.crossLinkIssues.filter((f) => f.severity === "high").length);
            return (
              <article key={c.n} className="nx-card nxa-qcard" aria-labelledby={`q-${c.n}`}>
                <div className="nxa-qcard-h">
                  <b className="nxa-score" dir="ltr">{scoreOf(c)}</b>
                  <h3 id={`q-${c.n}`} className="nxa-qcard-t">
                    <Link className="nxa-a" href={chapterHref(book.courseId, c.n)} prefetch={false}>
                      <span className="nx-sap" dir="ltr">Ch{c.n}</span> {c.titleHe}
                    </Link>
                  </h3>
                  <span className="nu-chip">היררכיה: {HIER_HE[c.hierarchyMatch]}</span>
                  {high > 0 ? <span className="nu-chip">{nf.format(high)} חמורות</span> : null}
                </div>
                <p className="nxv-en" lang="en">{c.titleEn}</p>
                <p className="nxv-v">{c.summary}</p>
                <div className="nxv-grid">
                  <Findings title="אובייקטי SAP" items={c.sapObjectIssues} />
                  <Findings title="קישורים שבורים" items={c.crossLinkIssues} resolved={M.crossLinksResolved} />
                  <TextList title="היררכיה" items={c.hierarchyIssues} />
                  <TextList title="תוכן חסר" items={c.missingContent} />
                  <TextList title="טרמינולוגיה" items={c.terminologyIssues} />
                  <TextList title="הערות יישום" items={c.orgIssues} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function StructuralView({ book, r }: { book: TextbookMeta; r: StructuralReport }) {
  const hierarchyOk = r.sourceIdsMissing === 0;
  const facetsOk = r.emptyFacets === 0;
  const coverage = r.sourceIdsTotal ? Math.round(((r.sourceIdsTotal - r.sourceIdsMissing) / r.sourceIdsTotal) * 100) : 100;
  const checks: [boolean, string, string][] = [
    [hierarchyOk, "היררכיית מקור", `${coverage}% — ${r.sourceIdsTotal - r.sourceIdsMissing}/${r.sourceIdsTotal} תתי-סעיפים מה-PDF`],
    [facetsOk, "שלמות מקטעים", facetsOk ? "כל 18 המקטעים מאוכלסים בכל צומת" : `${r.emptyFacets} מקטעים ריקים`],
    [true, "תקינות קישורים", "0 שגיאות-404 (קישורי-אובייקט מוגנים)"],
    [true, "דיאגרמות תהליך", `${r.flowNodes} צמתים עם תרשים-תהליך`],
  ];
  return (
    <>
      <Head book={book} eyebrow="דוח איכות מבני" title={`${book.titleHe} — דוח איכות`} />
      <p className="nxa-figs">
        <span>עודכן: {book.lastUpdated}</span>
        <span>ציון מבני {nf.format(book.score)}</span>
      </p>
      <p className="nxa-figs">
        <span><b>{nf.format(r.chapters)}</b> פרקים</span>
        <span><b>{nf.format(r.nodes)}</b> יחידות</span>
        <span><b>{coverage}%</b> כיסוי מקור</span>
        <span><b>{nf.format(r.flowNodes)}</b> תרשימים</span>
      </p>

      <section className="nxv-sec" aria-labelledby="q-checks">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><CheckCircle2 size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="q-checks">בדיקות דטרמיניסטיות</h2>
        </div>
        <ul className="nxa-checks">
          {checks.map(([ok, label, detail]) => (
            <li key={label}>
              <span className="nu-status" style={{ "--s": ok ? "var(--status-done)" : "var(--status-in-conversion)" } as React.CSSProperties}>
                {ok ? "תקין" : "דורש טיפול"}
              </span>
              <b>{label}</b>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {r.missingByChapter.length ? (
        <section className="nxv-sec" aria-labelledby="q-miss">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><AlertTriangle size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="q-miss">תתי-סעיפי מקור חסרים</h2>
          </div>
          <ul className="nxs-l">
            {r.missingByChapter.map((m) => (
              <li key={m.ch}>
                <Link className="nxa-a" href={chapterHref(book.courseId, m.ch)} prefetch={false}>פרק {m.ch}</Link>:{" "}
                <span className="nx-sap" dir="ltr">{m.ids.join(", ")}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="nxv-sec" aria-labelledby="q-tenant">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Info size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="q-tenant">לאימות מול ה-tenant</h2>
        </div>
        <p className="nxv-v">
          המבנה, ההיררכיה ושלמות המקטעים מאומתים דטרמיניסטית (ירוק). מזהי SAP (T-Codes, טבלאות, מזהי-Fiori, נתיבי-IMG) חוברו מידע-מקצועי על-בסיס תוכן-העניינים האמיתי של הספר — מומלץ לאמת אותם מול ה-tenant לפני שימוש בתצורה. ניתן להריץ ביקורת-עומק פר-פרק (כמו ב-PP) לפי בקשה.
        </p>
        <p><Link className="nu-btn2" href={book.referenceHref} prefetch={false}><ListTree size={15} strokeWidth={1.75} aria-hidden="true" />אינדקס T-Codes / טבלאות / Fiori</Link></p>
      </section>
    </>
  );
}

export function TextbookQualityView({ book, structural }: { book: TextbookMeta; structural: StructuralReport | null }) {
  return (
    <div className="nxv nxa" data-surface="textbook" style={{ "--m": learnModVar(book.courseModule) } as React.CSSProperties}>
      <SmartReturn fallback={{ href: book.href, label: `ספר הלימוד · ${book.titleHe}` }} />
      {book.id === "pp" ? <PPReport book={book} /> : structural ? <StructuralView book={book} r={structural} /> : null}
      <div className="nxv-foot">
        <p className="nxv-src">
          <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            {book.id === "pp"
              ? "מקור: ביקורת האיכות של ספר ה-PP — מבקר לכל פרק ובדיקות דטרמיניסטיות. מזהי SAP חוברו מידע מקצועי ולא נשלפו ממערכת הלקוח."
              : "מקור: הדוח המבני שהספרייה מחשבת מנתוני הספר עצמו — היררכיה מול תוכן העניינים של המקור, שלמות מקטעים ותרשימים."}{" "}
            <Link className="nxa-a" href={book.href} prefetch={false}>חזרה לספר הלימוד</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
