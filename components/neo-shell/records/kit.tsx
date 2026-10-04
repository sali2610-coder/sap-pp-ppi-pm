/* ============================================================================
   PROJECT NEO · RECORDS — one kit for the legacy record families rebuilt at
   their old address under /neo/.
   ----------------------------------------------------------------------------
   Eleven pre-NEO families (exits, sap-notes, solutions, ecc-s4, oic,
   qa-testing, security, process-explorer, guides, process, story) had no NEO
   page and redirected to a hub. Each now has ONE adapter beside this file that
   maps its dataset onto the types below, field by field. This file only draws.

   It is the centres detail view (../centers/centers-view.tsx) generalised: the
   same nct-* markup and rhythm from app/neo/centers.css, which the editorial
   layer already paints (head band, section sheets), plus the section types the
   record families need. app/neo/records.css adds only those.

   LINKS. Every href arrives already gated by ./links.ts: a string only when a
   NEO page exists, otherwise the value is shown and not linked.
   ========================================================================== */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { enLang } from "../lang";
import { SmartReturn } from "../nav-context";
import { StatusPill } from "../evidence/status-pill";

/* ------------------------------------------------------------------ types */

/** A value that may lead to a NEO page. `id` is an LTR code shown beside a
 *  Hebrew label; `sub` is the words that describe it. */
export interface Ref { label: string; href?: string | null; id?: string; sub?: string }
export interface Step {
  text: string;
  label?: string;
  ids?: Ref[];
  /** Labelled values under the step (T-Codes, tables, interfaces…). */
  groups?: Group[];
  notes?: { k: string; v: string }[];
}
export interface Side { label: string; text: string }
export interface Kv { k: string; v?: string; ids?: Ref[]; list?: string[] }
export interface Group { label: string; items: Ref[]; codes?: boolean; empty?: string }
/** A state: mark + word. `key` is a canonical S/4HANA status (lib/evidence),
 *  drawn by the shared StatusPill with its glyph. */
export interface Status { label: string; dot: string; title?: string; key?: string }

export type Block = { title: string; fold?: boolean; lede?: string; count?: number } & (
  | { t: "text"; text: string | string[] }
  | { t: "bullets"; items: string[] }
  | { t: "numbered"; items: string[] }
  | { t: "steps"; items: Step[] }
  /** SAP codes, each in an LTR island; rows when the codes carry words. */
  | { t: "ids"; items: Ref[]; empty?: string }
  /** Hebrew-labelled references (incidents, objects, topics). */
  | { t: "refs"; items: Ref[]; empty?: string }
  | { t: "compare"; a: Side; b: Side }
  | { t: "kv"; rows: Kv[]; empty?: string }
  | { t: "warn"; text: string }
  | { t: "groups"; groups: Group[] }
  /** Several of the above under one heading; each part takes an h3. */
  | { t: "stack"; parts: Block[]; status?: Status[] }
  /** A radial drawing of a record's neighbourhood: the record in the centre,
   *  each neighbour with its kind. A picture of lists the page also carries. */
  | { t: "graph"; center: { label: string; sub: string }; nodes: { label: string; kind: string }[] }
);

export interface Head {
  /** The family index (or the closest hub): the eyebrow's link and the return. */
  back: { href: string; label: string };
  eyebrow?: string;
  h1: string;
  /** The English name or the SAP id, in its own LTR line. */
  en?: string;
  lede?: string;
  tags?: string[];
  status?: Status[];
  facts?: Kv[];
}

/** What an adapter hands a record route: the page, plus the metadata title
 *  and description assembled from the same record fields. */
export interface RecordData { head: Head; blocks: Block[]; title: string; description: string; foot?: string }

/** The provenance line every record closes on, as the centres detail does. */
const SOURCE = "מקור: תיעוד הפרויקט.";

export interface Row { href: string; he: string; en?: string; sub?: string; tags?: string[]; meta?: string }
export interface RowGroup { title?: string; lede?: string; rows: Row[] }

/* ------------------------------------------------------------ the pieces */

const rise = (i: number) => ({ "--nm-i": i }) as CSSProperties;
const dirOf = (s?: string) => (enLang(s) ? "ltr" : undefined);

function Code({ r }: { r: Ref }) {
  return r.href ? (
    <Link href={r.href} prefetch={false} className="nct-chip nx-sap nrc-go" dir="ltr">{r.label}</Link>
  ) : (
    <span className="nct-chip nx-sap" dir="ltr">{r.label}</span>
  );
}

function Codes({ items, empty }: { items: Ref[]; empty?: string }) {
  if (!items.length) return empty ? <p className="nct-p nct-none">{empty}</p> : null;
  if (!items.some((r) => r.sub)) {
    return <div className="nct-chips">{items.map((r) => <Code key={r.label} r={r} />)}</div>;
  }
  return (
    <ul className="nrc-rows">
      {items.map((r) => (
        <li key={r.label}>
          <Code r={r} />
          {r.sub ? <span lang={enLang(r.sub)} dir={dirOf(r.sub)}>{r.sub}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function Refs({ items, empty }: { items: Ref[]; empty?: string }) {
  if (!items.length) return empty ? <p className="nct-p nct-none">{empty}</p> : null;
  return (
    <ul className="nrc-refs">
      {items.map((r, i) => {
        const body = (
          <>
            <span className="nrc-ref-l" lang={enLang(r.label)} dir={dirOf(r.label)}>{r.label}</span>
            {r.id ? <span className="nrc-ref-id nx-sap" dir="ltr">{r.id}</span> : null}
            {r.sub ? <span className="nrc-ref-s" lang={enLang(r.sub)} dir={dirOf(r.sub)}>{r.sub}</span> : null}
          </>
        );
        return (
          <li key={`${r.label}-${i}`}>
            {r.href
              ? <Link href={r.href} prefetch={false} className="nrc-ref nrc-ref--go">{body}</Link>
              : <span className="nrc-ref">{body}</span>}
          </li>
        );
      })}
    </ul>
  );
}

function Statuses({ items }: { items?: Status[] }) {
  if (!items?.length) return null;
  return (
    <div className="nrc-status">
      {items.map((s) => s.key ? (
        <StatusPill key={s.label} status={s.key} label={s.label} dot={s.dot} title={s.title} />
      ) : (
        <span key={s.label} className="nu-status" style={{ "--s": s.dot } as CSSProperties} title={s.title}
          lang={enLang(s.label)}>
          {s.label}
        </span>
      ))}
    </div>
  );
}

function KvList({ rows, empty }: { rows: Kv[]; empty?: string }) {
  if (!rows.length) return empty ? <p className="nct-p nct-none">{empty}</p> : null;
  return (
    <dl className="nrc-kv">
      {rows.map((r, i) => (
        <div key={`${r.k}-${i}`}>
          <dt lang={enLang(r.k)}>{r.k}</dt>
          <dd>
            {r.v ? <span lang={enLang(r.v)} dir={dirOf(r.v)}>{r.v}</span> : null}
            {r.list?.length ? (
              <ul className="nct-bul">{r.list.map((x, k) => <li key={k} lang={enLang(x)}>{x}</li>)}</ul>
            ) : null}
            {r.ids?.length ? <Codes items={r.ids} /> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="nct-steps nrc-steps">
      {items.map((s, k) => (
        <li key={k}>
          <span className="nct-step-n">{k + 1}</span>
          <div className="nrc-step">
            {s.label ? <span className="nrc-step-l">{s.label}</span> : null}
            <p className="nrc-step-t" lang={enLang(s.text)}>{s.text}</p>
            {s.ids?.length ? <Codes items={s.ids} /> : null}
            {s.groups?.filter((g) => g.items.length).map((g) => (
              <div key={g.label} className="nrc-step-g">
                <span className="nrc-step-l">{g.label}</span>
                {g.codes ? <Codes items={g.items} /> : <Refs items={g.items} />}
              </div>
            ))}
            {s.notes?.map((n, j) => (
              <p key={j} className="nrc-step-note"><b>{n.k}</b> <span lang={enLang(n.v)}>{n.v}</span></p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The legacy drawing truncated a label at 16 characters; so does this one. */
const clip = (s: string, n = 16) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const HE = /[\u0590-\u05FF]/;

function Graph({ center, nodes, label }: { center: { label: string; sub: string }; nodes: { label: string; kind: string }[]; label: string }) {
  // An ellipse rather than the legacy circle: wide labels at the top and the
  // bottom of the ring no longer overlap.
  const W = 760, H = 520, cx = W / 2, cy = H / 2, RX = 300, RY = 205;
  const at = (i: number) => {
    const a = (i / (nodes.length || 1)) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + RX * Math.cos(a), y: cy + RY * Math.sin(a) };
  };
  return (
    <svg className="nrc-graph" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} direction="ltr">
      {nodes.map((_, i) => { const p = at(i); return <line key={`l${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} className="nrc-g-edge" />; })}
      <circle cx={cx} cy={cy} r="46" className="nrc-g-hub" />
      <text x={cx} y={cy - 4} textAnchor="middle" className="nrc-g-hub-t">{center.label}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="nrc-g-hub-s">{center.sub}</text>
      {nodes.map((n, i) => {
        const p = at(i);
        const t = clip(n.label);
        const w = Math.max(70, t.length * 7.2 + 16);
        return (
          <g key={`n${i}`}>
            <rect x={p.x - w / 2} y={p.y - 15} width={w} height={30} rx="4" className="nrc-g-node" />
            <text x={p.x} y={p.y - 2} textAnchor="middle" direction={HE.test(t) ? "rtl" : "ltr"} className={HE.test(t) ? "nrc-g-l nrc-g-he" : "nrc-g-l"}>{t}</text>
            <text x={p.x} y={p.y + 10} textAnchor="middle" direction={HE.test(n.kind) ? "rtl" : "ltr"} className="nrc-g-k">{n.kind}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** The content of a block, without its heading. Parts of a stack recurse here. */
function Body({ b }: { b: Block }): ReactNode {
  switch (b.t) {
    case "text": {
      const ps = Array.isArray(b.text) ? b.text : [b.text];
      return ps.filter(Boolean).map((p, i) => <p key={i} className="nct-p" lang={enLang(p)}>{p}</p>);
    }
    case "bullets":
      return <ul className="nct-bul">{b.items.map((x, k) => <li key={k} lang={enLang(x)}>{x}</li>)}</ul>;
    case "numbered":
      return <Steps items={b.items.map((text) => ({ text }))} />;
    case "steps":
      return <Steps items={b.items} />;
    case "ids":
      return <Codes items={b.items} empty={b.empty} />;
    case "refs":
      return <Refs items={b.items} empty={b.empty} />;
    case "compare":
      return (
        <div className="nrc-cmp">
          {[b.a, b.b].map((s) => (
            <div key={s.label}>
              <p className="nrc-cmp-l" lang={enLang(s.label)}>{s.label}</p>
              <p className="nct-p" lang={enLang(s.text)}>{s.text}</p>
            </div>
          ))}
        </div>
      );
    case "kv":
      return <KvList rows={b.rows} empty={b.empty} />;
    case "warn":
      return (
        <p className="nrc-warn" role="note">
          <TriangleAlert size={15} strokeWidth={2} aria-hidden="true" />
          <span lang={enLang(b.text)}>{b.text}</span>
        </p>
      );
    case "groups":
      return b.groups.map((g) => (
        <div key={g.label} className="nrc-grp">
          <h3 className="nrc-h3">{g.label}<span className="nrc-n">{g.items.length}</span></h3>
          {g.codes ? <Codes items={g.items} empty={g.empty} /> : <Refs items={g.items} empty={g.empty} />}
        </div>
      ));
    case "graph":
      return <Graph center={b.center} nodes={b.nodes} label={b.title} />;
    case "stack":
      return (
        <>
          <Statuses items={b.status} />
          {b.parts.map((p, i) => (
            <div key={`${p.title}-${i}`} className="nrc-part">
              {p.title ? <h3 className="nrc-h3" lang={enLang(p.title)}>{p.title}</h3> : null}
              {p.lede ? <p className="nct-p">{p.lede}</p> : null}
              <Body b={p} />
            </div>
          ))}
        </>
      );
  }
}

function Heading({ b }: { b: Block }) {
  return (
    <h2 className="nct-sec-h" lang={enLang(b.title)}>
      <i aria-hidden="true" />
      {b.title}
      {b.count != null ? <span className="nrc-n">{b.count}</span> : null}
    </h2>
  );
}

function Section({ b, i }: { b: Block; i: number }) {
  const inner = (
    <>
      {b.lede ? <p className="nct-p nrc-lede">{b.lede}</p> : null}
      <Body b={b} />
    </>
  );
  if (b.fold) {
    return (
      <details className="nct-sec nrc-fold">
        <summary className="nrc-sum"><Heading b={b} /></summary>
        {inner}
      </details>
    );
  }
  return (
    <section className={`nct-sec nm-rise nm-once${b.t === "warn" ? " nrc-sec-warn" : ""}`} style={rise(i)}>
      <Heading b={b} />
      {inner}
    </section>
  );
}

function RecordHead({ head, item }: { head: Head; item: boolean }) {
  return (
    <header className={item ? "nct-hero nct-hero--item" : "nct-hero"}>
      <p className="nct-eye">
        <Link href={head.back.href} prefetch={false} className="nct-back">{head.back.label}</Link>
        {head.eyebrow ? (
          <>
            <i aria-hidden="true" />
            <span className="nct-sap" dir="auto" lang={enLang(head.eyebrow)}>{head.eyebrow}</span>
          </>
        ) : null}
      </p>
      <h1 className="nct-h1" lang={enLang(head.h1)} dir={dirOf(head.h1)}>{head.h1}</h1>
      {head.en ? <p className="nct-h1-en" dir="ltr" lang={enLang(head.en)}>{head.en}</p> : null}
      {head.lede ? <p className="nct-lede" lang={enLang(head.lede)}>{head.lede}</p> : null}
      {head.tags?.length ? (
        <div className="nct-hero-tags">
          {head.tags.map((t, i) => (
            <span key={t} className={i === 0 ? "nct-tag nct-tag--mod" : "nct-tag"} dir="auto">{t}</span>
          ))}
        </div>
      ) : null}
      <Statuses items={head.status} />
      {head.facts?.length ? <KvList rows={head.facts} /> : null}
    </header>
  );
}

/* ------------------------------------------------------------ the pages */

export function RecordPage({ head, blocks, foot = SOURCE }: { head: Head; blocks: Block[]; foot?: string }) {
  return (
    <article className="nct nct-detail nrc nm-scene" data-surface="records" data-scene="cream">
      <SmartReturn fallback={head.back} />
      <RecordHead head={head} item />
      <div className="nct-secs">
        {blocks.map((b, i) => <Section key={`${b.title}-${i}`} b={b} i={i} />)}
      </div>
      <p className="nct-foot">{foot}</p>
    </article>
  );
}

export function RecordIndex({ head, intro = [], groups, blocks = [], foot }: {
  head: Head; intro?: Block[]; groups: RowGroup[]; blocks?: Block[]; foot?: string;
}) {
  return (
    <div className="nct nrc nm-scene" data-surface="records" data-scene="cream">
      <SmartReturn fallback={head.back} />
      <RecordHead head={head} item={false} />
      {intro.length ? (
        <div className="nct-secs nrc-intro">
          {intro.map((b, i) => <Section key={`${b.title}-${i}`} b={b} i={i} />)}
        </div>
      ) : null}
      {groups.map((g, gi) => (
        <section key={g.title || gi} className="nrc-index">
          {g.title ? <h2 className="nrc-gh">{g.title}<span className="nrc-n">{g.rows.length}</span></h2> : null}
          {g.lede ? <p className="nct-p nrc-lede">{g.lede}</p> : null}
          <ul className="nct-items">
            {g.rows.map((r, i) => (
              <li key={r.href} className="nm-rise nm-once" style={rise(i)}>
                <Link href={r.href} prefetch={false} className="nct-item">
                  <span className="nct-item-bar" aria-hidden="true" />
                  <span className="nct-item-body">
                    <b className="nct-item-he" lang={enLang(r.he)}>{r.he}</b>
                    {r.en ? <span className="nct-item-en" dir="ltr" lang={enLang(r.en)}>{r.en}</span> : null}
                    {r.sub ? <span className="nct-item-sub" lang={enLang(r.sub)}>{r.sub}</span> : null}
                  </span>
                  <span className="nct-item-meta">
                    {(r.tags || []).map((t) => <span key={t} className="nct-tag" dir="auto">{t}</span>)}
                    {r.meta ? <span className="nct-item-n">{r.meta}</span> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {blocks.length ? (
        <div className="nct-secs">
          {blocks.map((b, i) => <Section key={`${b.title}-${i}`} b={b} i={i} />)}
        </div>
      ) : null}
      {foot ? <p className="nct-foot">{foot}</p> : null}
    </div>
  );
}
