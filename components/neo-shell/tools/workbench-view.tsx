/* ============================================================================
   PROJECT NEO · /neo/workbench/ — the consultant workbenches.
   ----------------------------------------------------------------------------
   Port of app/workbench/page.tsx and components/workbench-view.tsx over
   data/workbenches(-ext).ts: Debugging, QM, PM advanced and PP-PI advanced,
   each with its twelve sections. Every field travels: concepts, architecture,
   process flow, tables, transactions, FMs/BAPIs, BAdIs, user exits (each with
   its evidence tag: READ-ONLY, UPDATE-RISKY, verify SE18/SE37), common
   incidents, debug entry points, ECC vs S/4HANA and the organisation's
   examples. Codes link only where a NEO page is generated for them.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WORKBENCHES, type Workbench, type WbItem } from "@/data/workbenches";
import { incidentBySlug } from "@/data/troubleshooting";
import { enLang } from "../lang";
import { bapiHref, incidentLink, tableLink, txHref } from "./links";
import { Bullets, Codes, Onward, Sec, ToolPage } from "./kit";

/* The index card line per workbench, verbatim from app/workbench/page.tsx. */
const SUB: Record<string, string> = {
  Debugging: "אבחון תקלות ABAP/SAP לפי סולם דרגות — מלוגים ומוניטורים אל ה-debugger.",
  QM: "ניהול איכות מקצה-לקצה — מנה לבדיקה, רישום תוצאות, החלטת שימוש ושחרור אצווה.",
  PM: "אחזקה מתקדמת — ציוד ומיקומים, הודעה→פקודה→אישור→סגירה, תכנון אחזקה.",
  "PP-PI": "ייצור תהליכי מתקדם — מתכון, גרסת ייצור, פקודת תהליך, control recipe ו-backflush.",
};

const TAG_ST: Record<string, string> = { "READ-ONLY": "ok", "UPDATE-RISKY": "hi", "verify SE18": "mid", "verify SE37": "mid" };

export function WorkbenchIndex() {
  return (
    <ToolPage
      surface="workbench"
      back={{ href: "/neo/knowledge/", label: "מרכז הידע" }}
      eye="שולחן עבודה ליועץ"
      eyeEn="Consultant Workbenches"
      title="שולחנות עבודה ליועץ"
      lede={
        <p className="ntl-lede-p">
          ארבעה שולחנות עבודה ברמת יועץ בכיר — <span dir="ltr">Debugging, QM</span>, <span dir="ltr">PM</span> מתקדם, <span dir="ltr">PP-PI</span> מתקדם.
          {" "}כל אחד עם 12 מקטעים: מושגים, ארכיטקטורה, זרימת תהליך, טבלאות, טרנזקציות, <span dir="ltr">FMs, BAdIs, User Exits</span>, תקלות,
          {" "}נקודות <span dir="ltr">Debug</span>, <span dir="ltr">ECC↔S/4</span> ו-הארגון.
        </p>
      }
    >
      <ul className="nct-items">
        {WORKBENCHES.map((w) => (
          <li key={w.slug}>
            <Link href={`/neo/workbench/${w.slug}/`} prefetch={false} className="nct-item">
              <span className="nct-item-bar" aria-hidden="true" />
              <span className="nct-item-body">
                <b className="nct-item-he">{w.he}</b>
                <span className="nct-item-en" dir="ltr" lang={enLang(w.title)}>{w.title}</span>
                <span className="nct-item-sub">{SUB[w.module] ?? w.intro}</span>
              </span>
              <span className="nct-item-meta">
                <span className="nct-tag nct-tag--mod" dir="ltr">{w.module}</span>
                <span className="nct-item-n">12 מקטעים</span>
                <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Onward items={[
        { href: "/neo/centers/debugging/", label: "מדריך אבחון תקלות" },
        { href: "/neo/incidents/", label: "תקלות" },
        { href: "/neo/knowledge/", label: "מרכז הידע" },
      ]} />
    </ToolPage>
  );
}

function Items({ items, href }: { items: WbItem[]; href?: (n: string) => string | null }) {
  return (
    <dl className="ntl-dl">
      {items.map((it) => {
        const h = href && it.name !== "—" ? href(it.name) : null;
        return (
          <div key={it.name}>
            <dt className="ntl-item-t">
              {h
                ? <Link href={h} prefetch={false} className="nu-link"><span className="nx-sap" dir="ltr">{it.name}</span></Link>
                : <span className="nx-sap" dir="ltr">{it.name}</span>}
              {it.tag ? <span className="ntl-state" data-st={TAG_ST[it.tag] || "lo"} dir="ltr">{it.tag}</span> : null}
            </dt>
            <dd>{it.desc}</dd>
          </div>
        );
      })}
    </dl>
  );
}

export function WorkbenchDetail({ w }: { w: Workbench }) {
  const incidents = w.incidents.map((s) => incidentBySlug(s)).filter((x): x is NonNullable<ReturnType<typeof incidentBySlug>> => !!x);
  return (
    <ToolPage
      surface="workbench"
      back={{ href: "/neo/workbench/", label: "שולחנות עבודה" }}
      eye={`שולחן עבודה · ${w.module}`}
      title={w.he}
      titleEn={w.title}
      lede={<p className="ntl-lede-p">{w.intro}</p>}
      foot={<>מקור: <span className="nx-sap" dir="ltr">data/workbenches</span>. פריט עם תיוג <span dir="ltr">verify</span> דורש אימות במערכת לפני שימוש.</>}
    >
      <Sec id="concepts" title="מושגים" en="Concepts">
        <dl className="ntl-dl">
          {w.concepts.map((c) => (
            <div key={c.term}>
              <dt><span dir="ltr" lang={enLang(c.term)}>{c.term}</span> · {c.he}</dt>
              <dd>{c.desc}</dd>
            </div>
          ))}
        </dl>
      </Sec>

      <Sec id="architecture" title="ארכיטקטורה" en="Architecture">
        <Bullets items={w.architecture} />
      </Sec>

      <Sec id="flow" title="זרימת תהליך" en="Process Flow">
        <ol className="nct-steps">
          {w.processFlow.map((f, i) => (
            <li key={i}>
              <span className="nct-step-n">{i + 1}</span>
              <span><b dir="auto">{f.step}</b> — {f.detail}</span>
            </li>
          ))}
        </ol>
      </Sec>

      <Sec id="tables" title="טבלאות" en="Tables">
        <dl className="ntl-dl ntl-dl--2">
          {w.tables.map((t) => {
            const h = tableLink(t.name);
            return (
              <div key={t.name}>
                <dt>{h
                  ? <Link href={h} prefetch={false} className="nu-link"><span className="nx-sap" dir="ltr">{t.name}</span></Link>
                  : <span className="nx-sap" dir="ltr">{t.name}</span>}</dt>
                <dd>{t.desc}</dd>
              </div>
            );
          })}
        </dl>
      </Sec>

      <Sec id="transactions" title="טרנזקציות" en="Transactions">
        <Codes items={w.transactions} href={txHref} />
      </Sec>

      <Sec id="fms" title="Function Modules / BAPIs">
        <Items items={w.functionModules} href={bapiHref} />
      </Sec>

      <Sec id="badis" title="BAdIs">
        <Items items={w.badis} />
      </Sec>

      <Sec id="exits" title="User Exits">
        <Items items={w.userExits} />
      </Sec>

      <Sec id="debug" title="נקודות Debug" en="Debug Entry Points">
        <Bullets items={w.debugEntry} />
      </Sec>

      <Sec id="ecc-s4" title="ECC מול S/4HANA">
        <div className="ntl-pairs">
          {w.eccS4.map((d, i) => (
            <dl key={i} className="ntl-pair">
              <div><dt dir="ltr">ECC</dt><dd>{d.ecc}</dd></div>
              <div><dt dir="ltr">S/4HANA</dt><dd>{d.s4}</dd></div>
            </dl>
          ))}
        </div>
      </Sec>

      <Sec id="incidents" title="תקלות נפוצות קשורות" en="Common Incidents">
        {incidents.length ? (
          <ul className="ntl-links">
            {incidents.map((inc) => {
              const h = incidentLink(inc.slug);
              return <li key={inc.slug}>{h ? <Link href={h} prefetch={false} className="nu-link">{inc.he}</Link> : inc.he}</li>;
            })}
          </ul>
        ) : <p className="ntl-none">אין תקלה מקושרת במאגר לשולחן עבודה זה.</p>}
      </Sec>

      <Sec id="org" title="דוגמאות הארגון" en="Organisation examples">
        <Bullets items={w.scenario} />
      </Sec>

      <Onward items={[
        { href: "/neo/workbench/", label: "שולחנות העבודה" },
        ...WORKBENCHES.filter((x) => x.slug !== w.slug).map((x) => ({ href: `/neo/workbench/${x.slug}/`, label: x.he })),
      ]} />
    </ToolPage>
  );
}
