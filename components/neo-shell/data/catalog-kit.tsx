// Project NEO · the catalog kit — what the seven Reference catalogs share
// (/neo/tables, /neo/transactions and the five reference directories), so they
// read as one tool rather than seven pages that merely look alike:
//
//   CatalogHero  the eyebrow, the title, the lede and the facts line, sitting on
//                the scene's own ground (no card, no stripe, no wash).
//   Ledger       the counts under the title. Every count is a door: it applies
//                the filter it counts, switches to the view it names, or jumps
//                to the part of the page that holds it.
//   Sig          one signature band per catalog: the catalog's shape at a glance,
//                built only from fields the builders already carry.
//   RankList     ranked bars for a signature (object classes, modules, areas).
//   Cols         the column head over the aligned rows.
//   CatalogFoot  the source sentence and the mandatory credit.
//
// Presentational only: no state, no data access. The surfaces own both.

import type { ReactNode } from "react";

const nf = new Intl.NumberFormat("he-IL");
export const fmt = (n: number) => nf.format(n);

/** "קטלוג BAPI ו-FM · Function Catalog" → the Hebrew part and the Latin part. */
function splitEyebrow(s: string): [string, string] {
  const i = s.lastIndexOf(" · ");
  if (i < 0) return [s, ""];
  const en = s.slice(i + 3);
  return /[A-Za-z]/.test(en) && !/[֐-׿]/.test(en) ? [s.slice(0, i), en] : [s, ""];
}

export interface Fact { v: number; l: string; href?: string }

export function CatalogHero({
  icon, eyebrow, title, lede, facts, children,
}: {
  icon: ReactNode; eyebrow: string; title: string; lede: ReactNode;
  facts?: Fact[]; children?: ReactNode;
}) {
  const [he, en] = splitEyebrow(eyebrow);
  return (
    <header className="nxd-hero nm-rise nm-once">
      <p className="nxd-eye">
        {icon}
        <span>{he}</span>
        {en ? <><i aria-hidden="true" /><span lang="en">{en}</span></> : null}
      </p>
      <h1 className="nx-h1 nxd-h1">{title}</h1>
      <p className="nx-lede nxd-lede">{lede}</p>
      {facts?.length ? (
        <p className="nxd-facts">
          {facts.map((f, i) => (
            <span key={f.l}>
              {i ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}
              {f.href
                ? <a href={f.href}><b className="nx-sap">{fmt(f.v)}</b> {f.l}</a>
                : <><b className="nx-sap">{fmt(f.v)}</b> {f.l}</>}
            </span>
          ))}
        </p>
      ) : null}
      {children}
    </header>
  );
}

export interface LedgerItem {
  v: number;
  l: string;
  /** A filter or view this count turns on: pressed while it is the one applied. */
  on?: boolean;
  onClick?: () => void;
  /** A place on the page instead of a filter. */
  href?: string;
}

export function Ledger({ items, label }: { items: LedgerItem[]; label: string }) {
  return (
    <ul className="nxd-led" aria-label={label}>
      {items.map((it) => {
        const inner = <><b className="nx-sap">{fmt(it.v)}</b><span>{it.l}</span></>;
        return (
          <li key={it.l}>
            {it.onClick
              ? <button type="button" aria-pressed={!!it.on} onClick={it.onClick}>{inner}</button>
              : it.href
                ? <a href={it.href}>{inner}</a>
                : <span className="nxd-led-v">{inner}</span>}
          </li>
        );
      })}
    </ul>
  );
}

/** A signature band: a badge, the title and its count, one line of orientation. */
export function Sig({
  id, icon, title, count, lede, children,
}: {
  id: string; icon: ReactNode; title: string; count?: string; lede?: ReactNode; children: ReactNode;
}) {
  return (
    <section className="nxd-sig nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="nxd-sig-h">
        <span className="nxd-badge" aria-hidden="true">{icon}</span>
        <div className="nxd-sig-tt">
          <h2 className="nxd-sig-t" id={`${id}-h`}>
            <span>{title}</span>
            {count ? <span className="nxd-pill">{count}</span> : null}
          </h2>
          {lede ? <p className="nxd-sig-s">{lede}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

export interface RankItem {
  id: string;
  label: ReactNode;
  n: number;
  /** A darker share of the bar, e.g. the records documented in depth. */
  part?: number;
  sub?: ReactNode;
  /** An object-class colour for the leading swatch. */
  swatch?: string;
  /** Present only when the bar is a filter. */
  on?: boolean;
  onClick: () => void;
  title?: string;
}

/** Ranked bars. A neutral ink meter: length is the value, never a hue.
 *  `fold` keeps a phone to the first four bars until the reader asks for all
 *  of them (the parent owns `open`; the button exists only on a narrow width). */
export function RankList({
  items, label, cols, fold, open, onToggle, moreLabel,
}: {
  items: RankItem[]; label: string; cols?: boolean;
  fold?: boolean; open?: boolean; onToggle?: () => void; moreLabel?: string;
}) {
  const top = Math.max(1, ...items.map((i) => i.n));
  const pct = (n: number) => `${Math.max(2, (n / top) * 100)}%`;
  const folds = !!fold && !!onToggle && items.length > 4;
  return (
    <>
    <ul
      className="nxd-rank"
      data-cols={cols ? "1" : undefined}
      data-fold={folds ? "1" : undefined}
      data-open={folds && open ? "1" : undefined}
      aria-label={label}
    >
      {items.map((it) => (
        <li key={it.id}>
          <button
            type="button"
            onClick={it.onClick}
            aria-pressed={it.on === undefined ? undefined : it.on}
            title={it.title}
          >
            <span className="nxd-rank-l">
              {it.swatch ? <i className="nxd-sw" style={{ "--o": it.swatch } as React.CSSProperties} aria-hidden="true" /> : null}
              <span>{it.label}</span>
            </span>
            <span className="nxd-rank-m" aria-hidden="true">
              <i style={{ inlineSize: pct(it.n) }} />
              {it.part ? <i className="is-part" style={{ inlineSize: pct(it.part) }} /> : null}
            </span>
            <b className="nx-sap">{fmt(it.n)}</b>
            {it.sub ? <span className="nxd-rank-s">{it.sub}</span> : null}
          </button>
        </li>
      ))}
    </ul>
    {folds ? (
      <button type="button" className="nu-btn2 nxd-fold" aria-expanded={!!open} onClick={onToggle}>
        {open ? "צמצום לארבעת הראשונים" : moreLabel || `הצגת כל ${fmt(items.length)}`}
      </button>
    ) : null}
    </>
  );
}

/** The column head over the aligned rows. Visual only: every cell already
 *  says what it is to a screen reader. */
export function Cols({ cols }: { cols: { k: string; l: string }[] }) {
  return (
    <div className="nxd-cols" aria-hidden="true">
      {cols.map((c) => <span key={c.k} data-k={c.k}>{c.l}</span>)}
    </div>
  );
}

/** One labelled cell. The label is drawn only when the row becomes a card; a
 *  screen reader hears the unit once, from the hidden text. */
export function Cell({ k, l, sr, children }: { k: string; l: string; sr?: string; children: ReactNode }) {
  return (
    <span className="nxd-c" data-k={k}>
      <span className="nxd-l" aria-hidden="true">{l}</span>
      {sr ? <span className="nx-sr">{sr}</span> : null}
      {children}
    </span>
  );
}

export function CatalogFoot({ children }: { children: ReactNode }) {
  return (
    <footer className="nxd-foot">
      <p className="nxd-src">{children}</p>
      <p className="nxd-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
    </footer>
  );
}
