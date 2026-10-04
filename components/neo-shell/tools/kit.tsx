/* ============================================================================
   PROJECT NEO · TOOLS — the shared frame of the tool and dashboard pages.
   ----------------------------------------------------------------------------
   The pre-NEO site had a family of one-off tool pages (ALM, delivery, the
   evolution table, the notes graph, verification, the workbenches …). Each now
   has its own page at its old address under /neo/. They share this frame, which
   is the centers surface (app/neo/centers.css: .nct hero, .nct-sec sheets) plus
   app/neo/tools.css for what centers has no shape for: stat rows, data tables,
   code lists. Server components only; no record text is written here.
   ========================================================================== */

import Link from "next/link";
import type { ReactNode } from "react";
import { enLang } from "../lang";
import { SmartReturn, type ParentRef } from "../nav-context";

/* ------------------------------------------------------------------ page */

export function ToolPage({
  back, eye, eyeEn, title, titleEn, lede, children, foot, surface,
}: {
  back: ParentRef;
  eye: string;
  eyeEn?: string;
  title: string;
  titleEn?: string;
  lede?: ReactNode;
  children: ReactNode;
  foot?: ReactNode;
  surface: string;
}) {
  return (
    <article className="nct ntl" data-surface={surface}>
      <SmartReturn fallback={back} />
      <header className="nct-hero">
        <p className="nct-eye">
          {eye}
          {eyeEn ? (
            <>
              <i aria-hidden="true" />
              <span className="nct-sap" dir="ltr" lang={enLang(eyeEn)}>{eyeEn}</span>
            </>
          ) : null}
        </p>
        <h1 className="nct-h1">{title}</h1>
        {titleEn ? <p className="nct-h1-en" dir="ltr" lang={enLang(titleEn)}>{titleEn}</p> : null}
        {lede ? <div className="nct-lede">{lede}</div> : null}
      </header>
      <div className="ntl-body">{children}</div>
      {foot ? <footer className="nct-foot ntl-foot">{foot}</footer> : null}
    </article>
  );
}

/* --------------------------------------------------------------- section */

export function Sec({ id, title, en, children, note }: {
  id?: string; title: string; en?: string; children: ReactNode; note?: ReactNode;
}) {
  return (
    <section className="nct-sec ntl-sec" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <h2 className="nct-sec-h" id={id ? `${id}-h` : undefined}>
        <i aria-hidden="true" />
        {title}
        {en ? <span className="ntl-sec-en" dir="ltr" lang={enLang(en)}>{en}</span> : null}
      </h2>
      {note ? <p className="ntl-note">{note}</p> : null}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------- SAP codes */

/** A link to a NEO page. next/link reads a path whose last segment holds a dot
 *  as a file and drops its trailing slash: the T-Code F.01 rendered as
 *  /neo/transactions/F.01, while the export holds F.01/index.html. Such a path
 *  is a plain anchor that keeps the slash; every other one stays a Link. */
export function Go({ href, className, dir, children }: { href: string; className?: string; dir?: "ltr"; children: ReactNode }) {
  return /\.[^/]+\/$/.test(href.split(/[?#]/)[0])
    ? <a href={href} className={className} dir={dir}>{children}</a>
    : <Link href={href} prefetch={false} className={className} dir={dir}>{children}</Link>;
}

/** One SAP identifier in its own LTR island; a link only when href is real. */
export function Code({ v, href }: { v: string; href?: string | null }) {
  if (href) return <Go href={href} className="nct-chip nx-sap ntl-go" dir="ltr">{v}</Go>;
  return <span className="nct-chip nx-sap" dir="ltr">{v}</span>;
}

export function Codes({ items, href }: { items: string[]; href?: (v: string) => string | null }) {
  const list = items.filter((x) => x && x.trim() && x.trim() !== "—");
  if (!list.length) return <p className="ntl-none">אין ערכים במאגר לשדה זה.</p>;
  return (
    <ul className="ntl-codes">
      {list.map((x) => <li key={x}><Code v={x} href={href ? href(x) : null} /></li>)}
    </ul>
  );
}

/** Running Hebrew text that holds SAP codes or English: the paragraph keeps
 *  its base direction and the browser isolates the Latin runs (dir="auto" on
 *  English-only strings). */
export function Txt({ s, as = "p", className }: { s: string; as?: "p" | "span" | "li"; className?: string }) {
  const El = as;
  const en = enLang(s);
  return <El className={className} dir={en ? "ltr" : undefined} lang={en}>{s}</El>;
}

/* ---------------------------------------------------------------- stats */

export function Stats({ items, label }: {
  items: { v: ReactNode; l: string; s?: ReactNode }[]; label: string;
}) {
  return (
    <dl className="ntl-stats" aria-label={label}>
      {items.map((k) => (
        <div key={k.l} className="ntl-stat">
          <dt>{k.l}</dt>
          <dd><b>{k.v}</b></dd>
          {k.s ? <dd className="ntl-stat-s">{k.s}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

/* ----------------------------------------------------------- data table */

/** A wide table scrolls inside its own frame, never the page. The frame is a
 *  named region in the tab order, so a keyboard reaches it and scrolls it
 *  (axe scrollable-region-focusable; the module sections' Scroll does the same). */
export function TableWrap({ label, children }: { label: string; children: ReactNode }) {
  return <div className="ntl-tablewrap" role="region" aria-label={label} tabIndex={0}>{children}</div>;
}

/* ---------------------------------------------------------------- lists */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="nct-bul">
      {items.map((x, i) => <li key={i} lang={enLang(x)}>{x}</li>)}
    </ul>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="nct-steps">
      {items.map((x, i) => (
        <li key={i}><span className="nct-step-n">{i + 1}</span><span>{x}</span></li>
      ))}
    </ol>
  );
}

/** An ordered chain (A → B → C), as text: the order is the content. */
export function Flow({ items, label }: { items: string[]; label: string }) {
  return (
    <ol className="ntl-flow" aria-label={label}>
      {items.map((x, i) => <li key={i} lang={enLang(x)}>{x}</li>)}
    </ol>
  );
}

/** Long secondary content stays in the HTML and folds natively. */
export function More({ summary, children, open }: { summary: ReactNode; children: ReactNode; open?: boolean }) {
  return (
    <details className="ntl-more" open={open}>
      <summary>{summary}</summary>
      <div className="ntl-more-b">{children}</div>
    </details>
  );
}

/* ------------------------------------------------------------ cross-links */

export function Onward({ items, label = "המשך ב-Project NEO" }: {
  items: { href: string; label: string }[]; label?: string;
}) {
  if (!items.length) return null;
  return (
    <nav className="ntl-onward" aria-label={label}>
      <h2 className="ntl-onward-h">{label}</h2>
      <ul>
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} prefetch={false} className="nu-link">{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** A share: the number is the content, the bar is its picture. */
export function Bar({ pct }: { pct: number }) {
  return (
    <span className="ntl-bar">
      <b>{pct}%</b>
      <i aria-hidden="true"><span style={{ "--w": `${pct}%` } as React.CSSProperties} /></i>
    </span>
  );
}

export const nf = new Intl.NumberFormat("he-IL");
