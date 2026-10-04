/* ============================================================================
   PROJECT NEO · MODULE SECTIONS — the small shared pieces. Server components.
   A code is always shown; it is a link only when its href arrived non-null
   (section-data.ts gates every one against the generated routes).
   ========================================================================== */

import Link from "next/link";
import type { ReactNode } from "react";
import { enLang } from "../lang";
import type { MsSheet } from "./section-data";

export const nf = new Intl.NumberFormat("he-IL");

/** A SAP identifier in its own LTR island; a link when its page exists. */
export function Code({ id, href }: { id: string; href: string | null }) {
  const body = <span className="nx-sap" dir="ltr">{id}</span>;
  return href ? (
    <Link className="nms-code" data-live="1" href={href} prefetch={false}>{body}</Link>
  ) : (
    <span className="nms-code" data-live="0">{body}</span>
  );
}

export function Codes({ items }: { items: { id: string; href: string | null }[] }) {
  return (
    <ul className="nms-codes">
      {items.map((x) => <li key={x.id}><Code id={x.id} href={x.href} /></li>)}
    </ul>
  );
}

/** One section of the page: an h2, its count, one sentence, then the body. */
export function Sec({
  id, title, count, unit, lede, children,
}: { id: string; title: ReactNode; count?: number; unit?: string; lede?: ReactNode; children: ReactNode }) {
  return (
    <section className="nms-sec" id={id} aria-labelledby={`${id}-h`}>
      <header className="nms-sec-h">
        <h2 className="nms-h2" id={`${id}-h`}>{title}</h2>
        {count !== undefined ? <p className="nms-sec-n"><b>{nf.format(count)}</b> {unit}</p> : null}
        {lede ? <p className="nms-sec-s">{lede}</p> : null}
      </header>
      {children}
    </section>
  );
}

/** A wide table scrolls inside its own frame, never the page. Focusable, so a
 *  keyboard can scroll it too. */
export function Scroll({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="nms-tw" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}

/** The dataset holds nothing here, said so. */
export const Empty = ({ text }: { text: string }) => <p className="nms-empty">{text}</p>;

/** Long secondary content: in the HTML, folded. */
export function More({ label, open, children }: { label: string; open?: boolean; children: ReactNode }) {
  return (
    <details className="nms-more" open={open}>
      <summary>{label}</summary>
      <div className="nms-more-b">{children}</div>
    </details>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return <ul className="nms-bul">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
}

/** A cell that is a bare SAP identifier reads LTR; a Hebrew sentence does not. */
const isCode = (s: string) => /^[A-Z0-9_\-/;.,()\s]+$/.test(s.trim()) && /[A-Z0-9]/.test(s);

/** A blueprint aux sheet, verbatim. Its columns are named once, in its own
 *  words; each row leads with the sheet's identity column, and an empty cell
 *  is dropped, never filled. */
export function Sheet({ sheet }: { sheet: MsSheet }) {
  const ord = sheet.headers.findIndex((h) => /^מס'/.test(h));
  return (
    <div className="nms-sheet">
      <p className="nms-sheet-cols">
        עמודות הגיליון:{" "}
        {sheet.headers.map((h, i) => (
          <span key={i} lang={enLang(h)}>{i ? " · " : ""}{h}</span>
        ))}
      </p>
      <ol className="nms-sheet-l">
        {sheet.rows.map((row, i) => {
          const head = (row[sheet.keyCol] || "").trim();
          return (
            <li key={i} className="nms-sheet-r">
              <p className="nms-sheet-h">
                <span className="nms-sheet-i nx-sap" dir="ltr">{(ord >= 0 && row[ord]) || i + 1}</span>
                <b className={isCode(head) ? "nx-sap" : undefined} dir={isCode(head) ? "ltr" : undefined} lang={enLang(head)}>{head || "–"}</b>
              </p>
              <dl className="nms-kv">
                {sheet.headers.map((h, c) => {
                  const v = (row[c] || "").trim();
                  if (!v || c === sheet.keyCol || c === ord) return null;
                  return (
                    <div key={c}>
                      <dt lang={enLang(h)}>{h}</dt>
                      <dd className={isCode(v) ? "nx-sap" : undefined} dir={isCode(v) ? "ltr" : undefined} lang={enLang(v)}>{v}</dd>
                    </div>
                  );
                })}
              </dl>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
