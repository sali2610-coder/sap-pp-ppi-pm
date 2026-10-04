/* ============================================================================
   PROJECT NEO · /neo/academy/<course>/textbook/chapter-NN/ — one textbook
   chapter, read inside NEO.
   ----------------------------------------------------------------------------
   Server component. Two forms, decided by the data and not by taste:

   · FULL (PP, PM, QM). The NEO course is a separate set of concept lessons, so
     nothing else in NEO carries these chapters. Every node is rendered with
     all of its facets: the three explanations, purpose, process example, the
     organisation example, the flow, navigation/SPRO, configuration, T-Codes,
     tables, Fiori apps, master data, mistakes, troubleshooting, best
     practice, interview questions, takeaways and related topics. The
     executive explanation is always visible; the rest of each unit is one
     <details> away, so the page stays readable and every word stays in the
     HTML.
   · LINKED (MM, WM, PP/DS, S&OP, PM-User). Each subchapter IS a lesson of the
     NEO course. The page carries the chapter introduction, the full structure
     with Hebrew and English titles, and every flow with its codes and notes —
     the parts the lesson migration did not carry — and sends the reader to
     the lesson for the rest.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, GraduationCap, Info, Layers, ListTree, ShieldCheck } from "lucide-react";
import type { LearningNode } from "@/data/library/pp-textbook/types";
import { nodeWordCount } from "@/data/library/pp-textbook/types";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { enLang } from "../lang";
import { learnModVar, LEARN_MOD_HE } from "../learn/mod";
import {
  type ChapterPage, fioriLink, lessonOfSub, nodeAnchor, nodeMinutes, ppObjectHref, relatedLink, tableLink,
} from "./textbook-data";
import { txHref } from "../reference/ref-links";
import { Bullets, CodeRefs, Facet, FlowSteps, Txt, hoursHe, nf } from "./parts";

const flatten = (ns: LearningNode[], depth = 0): { n: LearningNode; depth: number; sub: string }[] =>
  ns.flatMap((n) => [{ n, depth, sub: n.id }, ...flatten(n.children ?? [], depth + 1).map((x) => ({ ...x, sub: n.id }))]);

/** Every node of a chapter, with its subchapter id (for the lesson link). */
function chapterNodes(roots: LearningNode[]) {
  const out: { n: LearningNode; depth: number; sub: string }[] = [];
  for (const r of roots) {
    const walk = (n: LearningNode, depth: number) => { out.push({ n, depth, sub: r.id }); (n.children ?? []).forEach((c) => walk(c, depth + 1)); };
    walk(r, 0);
  }
  return out;
}

const clean = (a?: string[]) => (a ?? []).filter((x) => x && x.trim() && x !== "—");

/** One learning unit, in full. */
function Unit({ n, depth }: { n: LearningNode; depth: number }) {
  const H = depth === 0 ? "h2" : "h3";
  const tcodes = clean(n.tcodes).map((c) => ({ code: c, href: txHref(c) }));
  const tables = clean(n.tables).map((c) => ({ code: c, href: tableLink(c) }));
  const fiori = clean(n.fiori).map((c) => ({ code: c, href: fioriLink(c) }));
  const related = (n.relatedHe ?? []).map((r) => ({ label: r.labelHe, href: relatedLink(r.href) }));
  return (
    <section className="nxa-unit" id={nodeAnchor(n.id)} data-depth={depth} aria-labelledby={`h-${nodeAnchor(n.id)}`}>
      <div className="nxa-unit-h">
        <span className="nxa-id nx-sap" dir="ltr">{n.id}</span>
        <H className={depth === 0 ? "nx-h2 nxa-unit-t" : "nxa-unit-t nxa-unit-t--sub"} id={`h-${nodeAnchor(n.id)}`}>{n.titleHe}</H>
        <em className="nxv-sec-n">{nf.format(nodeMinutes(nodeWordCount(n)))} דק׳</em>
      </div>
      {n.titleEn ? <p className="nxv-en" lang={enLang(n.titleEn)}>{n.titleEn}</p> : null}
      <Facet label="הסבר מנהלים"><p className="nxv-v">{n.execHe}</p></Facet>
      <details className="nxl-more">
        <summary>
          <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          יחידת הלימוד המלאה
          <em>הסברים, דוגמאות, קונפיגורציה, תקלות ושאלות</em>
        </summary>
        <div className="nxl-more-b">
          {n.beginnerHe ? <Facet label="הסבר למתחילים"><p className="nxv-v">{n.beginnerHe}</p></Facet> : null}
          {n.consultantHe ? <Facet label="הסבר ליועצים"><p className="nxv-v">{n.consultantHe}</p></Facet> : null}
          {n.purposeHe ? <Facet label="מטרה עסקית"><p className="nxv-v">{n.purposeHe}</p></Facet> : null}
          {n.processExampleHe ? <Facet label="דוגמת תהליך"><p className="nxv-v">{n.processExampleHe}</p></Facet> : null}
          {n.scenarioHe ? <Facet label="דוגמת הארגון"><p className="nxv-v">{n.scenarioHe}</p></Facet> : null}
          {n.flow?.length ? <Facet label="תרשים תהליך"><FlowSteps steps={n.flow} /></Facet> : null}
          {clean(n.navHe).length ? <Facet label="ניווט / SPRO"><Bullets items={n.navHe} /></Facet> : null}
          {clean(n.configHe).length ? <Facet label="קונפיגורציה"><Bullets items={n.configHe} /></Facet> : null}
          {tcodes.length ? <Facet label="T-Codes"><CodeRefs items={tcodes} /></Facet> : null}
          {tables.length ? <Facet label="Tables"><CodeRefs items={tables} /></Facet> : null}
          {fiori.length ? <Facet label="Fiori Apps"><CodeRefs items={fiori} /></Facet> : null}
          {clean(n.masterDataHe).length ? <Facet label="נתוני אב"><Bullets items={n.masterDataHe} /></Facet> : null}
          {clean(n.mistakesHe).length ? <Facet label="טעויות נפוצות"><Bullets items={n.mistakesHe} tone="warn" /></Facet> : null}
          {clean(n.troubleshootHe).length ? <Facet label="פתרון תקלות"><Bullets items={n.troubleshootHe} /></Facet> : null}
          {clean(n.bestPracticeHe).length ? <Facet label="שיטות מומלצות"><Bullets items={n.bestPracticeHe} tone="good" /></Facet> : null}
          {n.interviewHe?.length ? (
            <Facet label="שאלות ראיון">
              <dl className="nxa-qa">
                {n.interviewHe.map((q, i) => (
                  <div key={i}>
                    <dt>{q.qHe}</dt>
                    <dd>{q.aHe}</dd>
                  </div>
                ))}
              </dl>
            </Facet>
          ) : null}
          {clean(n.takeawaysHe).length ? <Facet label="מסקנות מפתח"><Bullets items={n.takeawaysHe} /></Facet> : null}
          {related.length ? (
            <Facet label="נושאים קשורים">
              <ul className="nxa-rel">
                {related.map((r, i) => (
                  <li key={i}>
                    {r.href ? <Link className="nxa-a" href={r.href} prefetch={false}>{r.label}</Link> : <span>{r.label}</span>}
                  </li>
                ))}
              </ul>
            </Facet>
          ) : null}
        </div>
      </details>
    </section>
  );
}

/** One subchapter of a migrated textbook: its lesson, its structure, its flows. */
function LinkedSub({ root, bookId }: { root: LearningNode; bookId: string }) {
  const href = lessonOfSub(bookId, root.id);
  const nodes = flatten([root]);
  const flows = nodes.filter((x) => x.n.flow?.length);
  const related = nodes.flatMap((x) => (x.n.relatedHe ?? []).map((r) => ({ label: r.labelHe, href: relatedLink(r.href) })));
  const seen = new Set<string>();
  const rel = related.filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)));
  return (
    <section className="nxa-unit" id={nodeAnchor(root.id)} data-depth={0} aria-labelledby={`h-${nodeAnchor(root.id)}`}>
      <div className="nxa-unit-h">
        <span className="nxa-id nx-sap" dir="ltr">{root.id}</span>
        <h2 className="nx-h2 nxa-unit-t" id={`h-${nodeAnchor(root.id)}`}>{root.titleHe}</h2>
      </div>
      {root.titleEn ? <p className="nxv-en" lang={enLang(root.titleEn)}>{root.titleEn}</p> : null}
      {href ? (
        <p className="nxa-go">
          <Link className="nu-btn2" href={href} prefetch={false}>
            <GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />
            קריאת השיעור בקורס
            <ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" />
          </Link>
        </p>
      ) : (
        <p className="nx-muted">לתת-פרק זה אין שיעור במאגר השיעורים.</p>
      )}
      {nodes.length > 1 ? (
        <Facet label="מבנה התת-פרק">
          <ul className="nxa-tree">
            {nodes.slice(1).map(({ n, depth }) => (
              <li key={n.id} data-depth={depth}>
                <span className="nxa-id nx-sap" dir="ltr">{n.id}</span>
                <span>{n.titleHe}</span>
                {n.titleEn ? <span className="nxa-en" lang={enLang(n.titleEn)} dir="ltr">{n.titleEn}</span> : null}
              </li>
            ))}
          </ul>
        </Facet>
      ) : null}
      {flows.length ? (
        <details className="nxl-more">
          <summary>
            <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
            תרשימי התהליך, עם הקוד וההערה של כל שלב
            <em>{nf.format(flows.length)} תרשימים</em>
          </summary>
          <div className="nxl-more-b">
            {flows.map(({ n }) => (
              <Facet key={n.id} label={`${n.id} · ${n.titleHe}`}><FlowSteps steps={n.flow} /></Facet>
            ))}
          </div>
        </details>
      ) : null}
      {rel.length ? (
        <Facet label="נושאים קשורים">
          <ul className="nxa-rel">
            {rel.map((r, i) => (
              <li key={i}>{r.href ? <Link className="nxa-a" href={r.href} prefetch={false}>{r.label}</Link> : <span>{r.label}</span>}</li>
            ))}
          </ul>
        </Facet>
      ) : null}
    </section>
  );
}

const OBJ_LABELS: { key: keyof NonNullable<ChapterPage["pp"]>["objects"]; he: string }[] = [
  { key: "tcodes", he: "T-Codes" }, { key: "tables", he: "Tables" }, { key: "cds", he: "CDS Views" },
  { key: "fiori", he: "Fiori Apps" }, { key: "bapis", he: "BAPIs" }, { key: "idocs", he: "IDocs" }, { key: "programs", he: "Programs" },
];

export function TextbookChapterView({ d }: { d: ChapterPage }) {
  const { book, chapter: ch, pp } = d;
  const full = !book.migrated;
  const nodes = chapterNodes(ch.subchapters);
  const words = nodes.reduce((s, x) => s + nodeWordCount(x.n), 0);
  const tocHref = (id: string, sub: string) => (full ? `#${nodeAnchor(id)}` : lessonOfSub(book.id, sub));

  return (
    <div className="nxv nxa" data-surface="textbook" style={{ "--m": learnModVar(book.courseModule) } as React.CSSProperties}>
      <SmartReturn fallback={{ href: book.href, label: `ספר הלימוד · ${book.titleHe}` }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">
          SAP Academy · {LEARN_MOD_HE[book.courseModule] || book.module} · ספר הלימוד · פרק {nf.format(ch.n)}
        </span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nx-display">{ch.titleHe}</h1>
          {ch.titleEn ? <p className="nxv-en" lang={enLang(ch.titleEn)}>{ch.titleEn}</p> : null}
        </div>
        <div className="nxv-meta">
          <span className="nu-chip nxv-mod"><i aria-hidden="true" />{book.module}</span>
          <span className="nu-chip">פרק {nf.format(ch.n)} מתוך {nf.format(book.stats.chapters)}</span>
          <span className="nu-chip"><Layers size={11} strokeWidth={1.75} />{nf.format(ch.subchapters.length)} תת-פרקים</span>
          <span className="nu-chip"><BookOpen size={11} strokeWidth={1.75} />{nf.format(nodes.length)} יחידות לימוד</span>
          <span className="nu-chip">~{hoursHe(nodeMinutes(words))}</span>
          {pp ? <span className="nu-chip" dir="ltr">pp. {pp.pages[0]}–{pp.pages[1]}</span> : null}
        </div>
      </header>

      {ch.introHe ? <p className="nxv-lede nxa-intro">{ch.introHe}</p> : null}

      {pp ? (
        <section className="nxv-sec" aria-labelledby="tb-pp">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><BookOpen size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="tb-pp">תקציר מנהלים</h2>
            <em className="nxv-sec-n" lang="en">{pp.en}</em>
          </div>
          <p className="nxv-v">{pp.summaryHe}</p>
          <Facet label="אובייקטי SAP בפרק">
            <div className="nxa-objs">
              {OBJ_LABELS.map(({ key, he }) => {
                const items = pp.objects[key] ?? [];
                if (!items.length) return null;
                return (
                  <div key={key} className="nxa-objs-r">
                    <span className="nxv-l">{he}</span>
                    <CodeRefs items={items.map((c) => ({ code: c, href: ppObjectHref(c) }))} />
                  </div>
                );
              })}
            </div>
          </Facet>
          {pp.configHe?.length ? <Facet label="מדריך קונפיגורציה (Walkthrough)"><Bullets items={pp.configHe} /></Facet> : null}
          {pp.runbookHe?.length ? <Facet label="Runbook"><Bullets items={pp.runbookHe} /></Facet> : null}
          {pp.patternsHe?.length ? <Facet label="דוגמת מימוש"><Bullets items={pp.patternsHe} /></Facet> : null}
          {pp.troubleshootHe?.length ? <Facet label="תרחישי פתרון תקלות"><Bullets items={pp.troubleshootHe} tone="warn" /></Facet> : null}
          {pp.lessonsHe?.length ? <Facet label="לקחים"><Bullets items={pp.lessonsHe} /></Facet> : null}
          {pp.scenarioHe ? <Facet label="הערת יישום מעשית"><p className="nxv-v">{pp.scenarioHe}</p></Facet> : null}
          {d.ppGlossary.length ? (
            <Facet label="מונחון רלוונטי">
              <dl className="nxa-gloss">
                {d.ppGlossary.map((g) => (
                  <div key={g.term}><dt className="nx-sap" dir="ltr">{g.term}</dt><dd>{g.he}</dd></div>
                ))}
              </dl>
            </Facet>
          ) : null}
          {pp.related?.length ? (
            <Facet label="נושאים קשורים">
              <ul className="nxa-rel">
                {pp.related.map((r, i) => {
                  const href = relatedLink(r.href.replace(/^\/library\/pp\/#ch(\d+)$/, "/library/pp/chapter-$1/"));
                  return (
                    <li key={i}>
                      <span className="nu-chip">{r.module}</span>
                      {href ? <Link className="nxa-a" href={href} prefetch={false}>{r.labelHe}</Link> : <span>{r.labelHe}</span>}
                    </li>
                  );
                })}
              </ul>
            </Facet>
          ) : null}
        </section>
      ) : null}

      <nav className="nxs-toc nxa-toc" aria-label="תוכן הפרק">
        <span className="nx-eyebrow"><ListTree size={12} strokeWidth={1.75} aria-hidden="true" /> תוכן הפרק · {nf.format(nodes.length)} יחידות</span>
        <ol>
          {nodes.map(({ n, depth, sub }) => {
            const href = tocHref(n.id, sub);
            return (
              <li key={n.id} data-depth={depth}>
                <span className="nxa-id nx-sap" dir="ltr">{n.id}</span>
                {href ? <a href={href}>{n.titleHe}</a> : <span>{n.titleHe}</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="nxa-units">
        {full
          ? nodes.map(({ n, depth }) => <Unit key={n.id} n={n} depth={depth} />)
          : ch.subchapters.map((s) => <LinkedSub key={s.id} root={s} bookId={book.id} />)}
      </div>

      <nav className="nxs-steps" aria-label="מעבר בין פרקים">
        {d.prev ? (
          <Link className="nu-card nxs-step" href={d.prev.href} prefetch={false} data-dir="prev">
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            <span className="nxs-step-t"><span className="nx-eyebrow">הפרק הקודם · {nf.format(d.prev.n)}</span><b>{d.prev.titleHe}</b></span>
          </Link>
        ) : <span className="nxs-step is-none">זהו הפרק הראשון בספר.</span>}
        <Link className="nu-btn2 nxs-up" href={book.href} prefetch={false}>
          <GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />
          ספר הלימוד · {nf.format(book.stats.chapters)} פרקים
        </Link>
        {d.next ? (
          <Link className="nu-card nxs-step" href={d.next.href} prefetch={false} data-dir="next">
            <span className="nxs-step-t"><span className="nx-eyebrow">הפרק הבא · {nf.format(d.next.n)}</span><b>{d.next.titleHe}</b></span>
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        ) : <span className="nxs-step is-none">זהו הפרק האחרון בספר.</span>}
      </nav>

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: ספר הלימוד הדיגיטלי של SAP Academy · <Txt s={book.titleEn} />.
            {full
              ? " כל יחידה מוצגת במלואה, כפי שנכתבה בספר."
              : " כל תת-פרק נקרא כשיעור בקורס; כאן מוצגים מבוא הפרק, המבנה ותרשימי התהליך."}
          </span>
        </p>
        <p className="nxv-src">
          <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            {book.validationKind === "reviewed" ? "בדיקת איכות: נבדק" : "בדיקת איכות: מבנית"} · ציון {nf.format(book.score)} ·{" "}
            <Link className="nxa-a" href={book.qualityHref} prefetch={false}>דוח האיכות של הספר</Link>
          </span>
        </p>
        <p>
          <Link className="nxa-a" href={book.referenceHref} prefetch={false}>אינדקס T-Codes, טבלאות ו-Fiori של הספר</Link>
        </p>
      </div>
    </div>
  );
}
