/* ============================================================================
   PROJECT NEO · THE ACADEMY TEXTBOOKS — the small shared pieces.
   ----------------------------------------------------------------------------
   Server components. They render a textbook's own values and nothing else:
   a code list, a bullet list, a flow, a labelled fact. Every SAP identifier is
   an LTR island; every link was resolved on the server against a page that is
   really generated, and an unresolved one is shown as a value.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { FlowStep } from "@/data/library/pp-textbook/types";
import { enLang } from "../lang";

export const nf = new Intl.NumberFormat("he-IL");

export function hoursHe(min: number): string {
  if (min < 60) return `${nf.format(min)} דק׳`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${nf.format(h)} שע׳ ${nf.format(m)} דק׳` : `${nf.format(h)} שע׳`;
}

/** An SAP identifier: a link when NEO has its page, a value when it does not. */
export function Code({ code, href }: { code: string; href: string | null }) {
  return href ? (
    <Link className="nu-link nx-sap" dir="ltr" href={href} prefetch={false}>{code}</Link>
  ) : (
    <span className="nx-sap" dir="ltr">{code}</span>
  );
}

/** A row of identifiers, each a card when it links and a chip when it does not. */
export function CodeRefs({ items }: { items: { code: string; href: string | null; label?: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="nxs-refs">
      {items.map((r) =>
        r.href ? (
          <Link key={r.code} className="nu-card nxs-ref" href={r.href} prefetch={false}>
            <span className="nxs-ref-c nx-sap" dir="ltr">{r.code}</span>
            {r.label ? <span className="nxs-ref-l">{r.label}</span> : null}
            <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
          </Link>
        ) : (
          <span key={r.code} className="nu-chip nxs-ref is-flat">
            <span className="nxs-ref-c nx-sap" dir="ltr">{r.code}</span>
            {r.label ? <span className="nxs-ref-l">{r.label}</span> : null}
          </span>
        ),
      )}
    </div>
  );
}

/** A labelled value inside a learning unit. The label names the facet; the
 *  value is the textbook's own text. */
export function Facet({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="nxv-fact nxa-facet">
      <p className="nxv-l">{label}</p>
      {children}
    </div>
  );
}

/** Text that may be English (a SPRO path, a title): marked as such. */
export function Txt({ s }: { s: string }) {
  const en = enLang(s);
  return en ? <span lang="en" dir="ltr">{s}</span> : <>{s}</>;
}

export function Bullets({ items, tone }: { items?: string[]; tone?: "warn" | "good" }) {
  const list = (items ?? []).filter((x) => x && x.trim() && x !== "—");
  if (!list.length) return null;
  return (
    <ul className={tone ? "nxs-l nxs-l--note" : "nxs-l"} data-tone={tone}>
      {list.map((x, i) => <li key={i}><Txt s={x} /></li>)}
    </ul>
  );
}

/** A process flow with every step's code and note — the parts the lesson
 *  migration did not carry. */
export function FlowSteps({ steps }: { steps?: FlowStep[] }) {
  if (!steps?.length) return null;
  return (
    <ol className="nxa-flow">
      {steps.map((s, i) => (
        <li key={i}>
          <span className="nxs-flow-n" dir="ltr">{nf.format(i + 1)}</span>
          <span className="nxa-flow-t">
            <b>{s.he}</b>
            {s.code ? <span className="nx-sap" dir="ltr">{s.code}</span> : null}
            {s.note ? <span className="nxa-flow-note">{s.note}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
