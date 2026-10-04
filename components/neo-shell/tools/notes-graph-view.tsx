/* ============================================================================
   PROJECT NEO · /neo/notes-graph/ — SAP-note topics and what they connect.
   ----------------------------------------------------------------------------
   Port of app/notes-graph/page.tsx over data/sap-notes.ts. One row per note
   topic (by application component): its incidents, the business objects those
   incidents touch, and the OSS search keywords. No note numbers: the dataset
   keeps topics and keywords, and so does this page.

   LINKS. A topic opens /neo/sap-notes/<slug>/ and an incident
   /neo/incidents/<slug>/. An object is the OIC object whose table an incident
   names (the legacy derivation, unchanged); it opens that object's Object
   Intelligence page, /neo/oic/<slug>/, as the legacy /oic/<slug>/ link did
   (inspection-lot's table QALS has no /neo/object/ page; its OIC page exists).
   ========================================================================== */

import Link from "next/link";
import { SAP_NOTES } from "@/data/sap-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { oicHref } from "../records/links";
import { incidentLink, noteLink } from "./links";
import { Onward, ToolPage, nf } from "./kit";

export function NotesGraphView() {
  const incBySlug = new Map(INCIDENTS.map((i) => [i.slug, i]));
  const rows = SAP_NOTES.map((n) => {
    const incs = (n.relatedIncidents || []).map((s) => incBySlug.get(s)).filter((x): x is (typeof INCIDENTS)[number] => !!x);
    const objs = OIC_OBJECTS.filter((o) => incs.some((i) => i.tables.includes(o.table)));
    return { n, incs, objs };
  });
  return (
    <ToolPage
      surface="notes-graph"
      back={{ href: "/neo/incidents/", label: "תקלות" }}
      eye="גרף SAP Notes"
      eyeEn="SAP Notes Graph"
      title="גרף SAP Notes"
      lede={
        <p className="ntl-lede-p">
          {nf.format(SAP_NOTES.length)} נושאי <span dir="ltr">Note</span> (לפי <span dir="ltr">Application Component</span>) — כל צומת מקשר
          {" "}לתקלות, אובייקטים מושפעים ונתיבי פתרון. ללא מספרי <span dir="ltr">Note</span> מומצאים; חיפוש לפי רכיב + מילות מפתח.
        </p>
      }
      foot={<>מקור: <span className="nx-sap" dir="ltr">data/sap-notes</span> · <span className="nx-sap" dir="ltr">data/troubleshooting</span> · אובייקטי <span dir="ltr">OIC</span>.</>}
    >
      <ul className="ntl-graph" aria-label="נושאי SAP Notes">
        {rows.map(({ n, incs, objs }) => (
          <li key={n.slug} className="nct-sec ntl-node">
            <h2 className="ntl-node-h">
              <span className="nct-tag nct-tag--mod" dir="ltr">{n.module}</span>
              <span className="nct-chip nx-sap" dir="ltr">{n.component}</span>
              <Link href={noteLink(n.slug)} prefetch={false} className="nu-link ntl-node-t">{n.he}</Link>
            </h2>
            <dl className="ntl-dl ntl-dl--3">
              <div>
                <dt>↔ תקלות</dt>
                <dd>
                  {incs.length ? (
                    <ul className="ntl-links">
                      {incs.map((i) => {
                        const href = incidentLink(i.slug);
                        return <li key={i.slug}>{href ? <Link href={href} prefetch={false} className="nu-link">{i.he}</Link> : i.he}</li>;
                      })}
                    </ul>
                  ) : <span className="ntl-none">אין תקלה מקושרת במאגר.</span>}
                </dd>
              </div>
              <div>
                <dt>↔ אובייקטים</dt>
                <dd>
                  {objs.length ? (
                    <ul className="ntl-links">
                      {objs.map((o) => {
                        const href = oicHref(o.slug);
                        const label = <>{o.he} <span className="nx-sap" dir="ltr">{o.table}</span></>;
                        return <li key={o.slug}>{href ? <Link href={href} prefetch={false} className="nu-link">{label}</Link> : label}</li>;
                      })}
                    </ul>
                  ) : <span className="ntl-none">אין אובייקט מקושר במאגר.</span>}
                </dd>
              </div>
              <div>
                <dt>↔ מילות חיפוש OSS</dt>
                <dd>
                  <ul className="ntl-codes">
                    {n.keywords.map((k) => <li key={k}><span className="nct-chip nx-sap" dir="ltr">{k}</span></li>)}
                  </ul>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <Onward items={[
        { href: "/neo/incidents/", label: "תקלות" },
        { href: "/neo/knowledge/", label: "מרכז הידע" },
      ]} />
    </ToolPage>
  );
}
