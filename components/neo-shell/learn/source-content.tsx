import Link from "next/link";
import type { LearningNode } from "@/data/library/pp-textbook/types";
import { neoCodeHref } from "./lesson-neo-links";
import { sourceRelatedHref } from "./source-data";
import { SourceFlow } from "./source-flow";
import { CodeCopy } from "./code-copy";


function Codes({ title, kind, codes }: { title: string; kind: string; codes: string[] }) {
  if (!codes.length) return null;
  return <div className="nxa-facet"><h3>{title}</h3><ul className="nxa-source-codes">{codes.map((code, i) => {
    const href = neoCodeHref(kind, code);
    return <li key={`${code}-${i}`}>{href ? <Link className="nu-link" href={href} prefetch={false}><bdi dir="ltr">{code}</bdi></Link> : <bdi dir="ltr">{code}</bdi>}<CodeCopy code={code} /></li>;
  })}</ul></div>;
}

export function SourceContent({ node: n }: { node: LearningNode }) {
  const prose = [
    ["מבט כללי", n.execHe], ["הסבר יסודי", n.beginnerHe], ["מבט המיישם", n.consultantHe],
    ["המטרה העסקית", n.purposeHe], ["דוגמת תהליך", n.processExampleHe], ["תרחיש", n.scenarioHe],
  ];
  const lists: [string, string[] | undefined][] = [
    ["ניווט במערכת", n.navHe], ["הגדרות", n.configHe], ["נתוני אב", n.masterDataHe],
    ["טעויות נפוצות", n.mistakesHe], ["פתרון תקלות", n.troubleshootHe],
    ["שיטות עבודה מומלצות", n.bestPracticeHe], ["דגשים לסיכום", n.takeawaysHe],
  ];
  return <section className="nxa-source-node" id={`source-${n.id}`} aria-labelledby={`source-title-${n.id}`}>
    <header><span className="nx-eyebrow"><bdi dir="ltr">{n.id}</bdi></span><h2 className="nx-h2" id={`source-title-${n.id}`}>{n.titleHe}</h2><p dir="ltr" className="nx-muted">{n.titleEn}</p></header>
    {prose.filter(([, text]) => text).map(([title, text]) => <div className="nxa-facet" key={title}><h3>{title}</h3><p dir="auto">{text}</p></div>)}
    {n.flow?.length ? <div className="nxa-facet"><h3>שלבי התהליך</h3><SourceFlow steps={n.flow} /></div> : null}
    <Codes title="טבלאות SAP" kind="tables" codes={n.tables} />
    <Codes title="טרנזקציות" kind="tcodes" codes={n.tcodes} />
    <Codes title="יישומי Fiori" kind="fiori" codes={n.fiori} />
    {lists.filter(([, items]) => items?.length).map(([title, items]) => <div className="nxa-facet" key={title}><h3>{title}</h3><ul>{items!.map((text, i) => <li key={i} dir="auto">{text}</li>)}</ul></div>)}
    {n.interviewHe.length ? <div className="nxa-facet"><h3>שאלות ותשובות</h3>{n.interviewHe.map((q, i) => <details key={i}><summary>{q.qHe}</summary><p dir="auto">{q.aHe}</p></details>)}</div> : null}
    {n.relatedHe?.length ? <div className="nxa-facet"><h3>נושאים קשורים</h3><ul>{n.relatedHe.map((r, i) => {
      const href = sourceRelatedHref(r.href);
      return <li key={i}>{href ? <Link className="nu-link" href={href} prefetch={false}>{r.labelHe}</Link> : r.labelHe}</li>;
    })}</ul></div> : null}
    <a className="nu-link" href="#source-top">חזרה לתוכן הפרק</a>
  </section>;
}
