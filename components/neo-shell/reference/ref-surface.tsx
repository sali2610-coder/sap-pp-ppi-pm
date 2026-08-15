"use client";

/* ============================================================================
   PROJECT NEO · THE REFERENCE DIRECTORY — one surface, five directories.
   ----------------------------------------------------------------------------
   /neo/bapi · /neo/cds · /neo/idoc · /neo/fiori-apps · /neo/enhancements were
   Stage-1 placeholders. They are real directories now, and they are deliberately
   the SAME directory as /neo/tables and /neo/transactions: the same header, the
   same stats plate, the same toolbar, the same facet strip, the same row and the
   same empty state, rendered through app/neo/data.css so the namespace has ONE
   composition rather than three that merely look alike.

   WHY ONE COMPONENT AND NOT FIVE
     The five record kinds differ in what they know, not in how they are chosen.
     Each builder (bapi-data.ts, cds-data.ts, …) resolves its own dataset at BUILD
     time into the common RefDir shape, so nothing here imports `@/data/*` and no
     SAP dataset crosses into the browser bundle.

   CONTROL LANGUAGE (app/neo/ui.css)
     .nu-tab     switches the view in place — list, by area, by class.
     .nu-filter  narrows what is on screen. Every one carries its real count.
     .nu-chip    a value. Not clickable, no hover, no pointer.
     .nu-status  dot + word — the record's S/4 standing, a real state.
     .nu-card    the row, a whole selectable region that opens the record.
     .nu-btn2    a real secondary action (show more, open the class facet).
     .nu-ghost   clear the query / clear the filters.
   There is no control on this surface that does nothing.

   COLOUR, per the form rule above --mod-pm in globals.css
     MODULE  edge (.nxd-mark), ring + tint (.nxd-mod, a pressed .nu-filter) and
             the surface wash when exactly one module is selected. Never a dot.
     STATUS  only .nu-status — the S/4 standing of the record. Dot plus word.
     ACCENT  brand red marks ONE thing: tone === "changed", i.e. the project data
             states this record materially changes in S/4HANA.
   ========================================================================== */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Boxes, LayoutGrid, ListTree, Search, X } from "lucide-react";
import {
  SmartReturn, consumeReturn, rememberOrigin, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { MOD_HE, modVar } from "../mod-var";
import { Glyph } from "./icons";
import type { RefDir, RefRow } from "./types";

const nf = new Intl.NumberFormat("he-IL");
const PAGE = 90;

type View = "list" | "group" | "kind";
type Sort = "name" | "rank" | "s4";

/** The NEO canvas is the scroller, not the window (see .nx-canvas in
 *  app/globals.css), so a restored offset has to be read from it. */
const canvas = (): HTMLElement | null =>
  typeof document === "undefined" ? null : document.getElementById("main");

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that satisfies the nav-context OriginState contract. */
type RefListState = {
  view: string; q: string; sort: string;
  mods: string[]; kinds: string[]; caps: string[];
  limit: number; y: number; id: string;
};

/* --------------------------------------------------------------- matching
   The same three tiers the transaction centre uses: a prefix beats an inner
   substring beats an in-order subsequence. Every token has to land, so a
   two-word query narrows instead of widening. It searches the record's own
   words only — it never completes free text and never guesses a name. */

function tokenScore(hay: string, q: string): number {
  const i = hay.indexOf(q);
  if (i === 0) return 100;
  if (i > 0) return 70 - Math.min(i, 30);
  let qi = 0;
  for (let h = 0; h < hay.length && qi < q.length; h++) if (hay[h] === q[qi]) qi++;
  return qi === q.length ? 28 : 0;
}
function fuzzyScore(hay: string, query: string): number {
  let total = 0;
  for (const t of query.split(/\s+/).filter(Boolean)) {
    const s = tokenScore(hay, t);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

const TONE_ORDER: Record<string, number> = { changed: 0, replacement: 1, compare: 2, unknown: 3, stable: 4 };

/* -------------------------------------------------------------------- row */

function Row({ r, onOpen }: { r: RefRow; onOpen: (id: string) => void }) {
  return (
    <li
      className="nxd-item"
      data-code={r.id}
      style={{ "--m": modVar(r.mods[0]) } as React.CSSProperties}
    >
      <Link
        href={r.href}
        prefetch={false}
        onClick={() => onOpen(r.id)}
        className="nu-card nxd-row nxr-row"
        data-impacted={r.s4.tone === "changed" ? "1" : undefined}
      >
        <span className="nxd-mark" aria-hidden="true" />

        <span className="nxd-id">
          <b className="nx-sap">{r.name}</b>
          <span className="nxd-mods">
            {r.mods.map((m) => (
              <span key={m} className="nu-chip nxd-mod" style={{ "--m": modVar(m) } as React.CSSProperties}>
                <i aria-hidden="true" />
                {m}
                {MOD_HE[m] ? <em>{MOD_HE[m]}</em> : null}
              </span>
            ))}
            {r.kind ? <span className="nu-chip nxr-kind">{r.kind}</span> : null}
          </span>
        </span>

        <span className="nxd-body">
          <span className="nxd-he">{r.he || "אין מידע מאומת במאגר"}</span>
          <span className="nxd-sub">
            {r.en ? <span className="nxd-en" dir="ltr">{r.en}</span> : null}
            {r.en && r.group ? <span className="nxd-dot" aria-hidden="true">·</span> : null}
            {r.group ? <span>{r.group}</span> : null}
          </span>
        </span>

        {/* Values, not controls: .nu-chip has no hover and no pointer. The unit
            travels with the number so a bare figure is never read out alone. */}
        <span className="nxd-nums">
          {r.nums.map((n) => (
            <span key={n.sr} className="nu-chip">
              <Glyph i={n.i} size={11} />
              <span className="nx-sr">{n.sr}</span>
              {n.v}
            </span>
          ))}
        </span>

        <span className="nxd-s4">
          <span className="nu-status" style={{ "--s": r.s4.status.color } as React.CSSProperties}>
            {r.s4.status.he}
          </span>
          <span className="nxd-s4-t">{r.s4.text || "המאגר אינו מציין הערת S/4 לרשומה זו"}</span>
        </span>

        <span className="nxd-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function RefSurface({ dir, children }: { dir: RefDir; children?: React.ReactNode }) {
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("list");
  const [sort, setSort] = useState<Sort>("name");
  const [mods, setMods] = useState<string[]>([]);
  const [kinds, setKinds] = useState<string[]>([]);
  const [caps, setCaps] = useState<string[]>([]);
  const [kindsOpen, setKindsOpen] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const toggle = (list: string[], v: string): string[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  const views = useMemo(() => {
    const out: { v: View; he: string }[] = [{ v: "list", he: "רשימה" }];
    if (dir.groupLabel) out.push({ v: "group", he: dir.groupLabel });
    if (dir.kinds.length > 1) out.push({ v: "kind", he: dir.kindsLabel });
    return out;
  }, [dir.groupLabel, dir.kinds.length, dir.kindsLabel]);

  const sorts = useMemo(() => {
    const out: { s: Sort; he: string }[] = [{ s: "name", he: "שם טכני" }];
    if (dir.rankLabel) out.push({ s: "rank", he: dir.rankLabel });
    out.push({ s: "s4", he: "משתנה ב-S/4 קודם" });
    return out;
  }, [dir.rankLabel]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const base = dir.rows.filter((r) => {
      if (mods.length && !mods.some((m) => r.mods.includes(m))) return false;
      if (kinds.length && !kinds.includes(r.kind)) return false;
      for (const c of caps) if (!r.caps.includes(c)) return false;
      return true;
    });
    if (needle) {
      return base
        .map((r) => ({ r, sc: fuzzyScore(r.hay, needle) }))
        .filter((x) => x.sc > 0)
        .sort((a, b) => b.sc - a.sc || a.r.name.localeCompare(b.r.name))
        .map((x) => x.r);
    }
    return [...base].sort((a, b) => {
      if (sort === "rank") return b.rank - a.rank || a.name.localeCompare(b.name);
      if (sort === "s4") return TONE_ORDER[a.s4.tone] - TONE_ORDER[b.s4.tone] || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
  }, [dir.rows, q, mods, kinds, caps, sort]);

  /** The groups the chosen view really produces — never an empty bucket. */
  const groups = useMemo(() => {
    if (view === "list") return null;
    const map = new Map<string, RefRow[]>();
    for (const r of rows) {
      const k = (view === "group" ? r.group : r.kind) || "ללא סיווג במאגר";
      const list = map.get(k);
      if (list) list.push(r);
      else map.set(k, [r]);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "he"));
  }, [rows, view]);

  const dirty = !!q || mods.length > 0 || kinds.length > 0 || caps.length > 0;
  const reset = () => { setQ(""); setMods([]); setKinds([]); setCaps([]); setLimit(PAGE); };

  const shown = groups ? rows : rows.slice(0, limit);
  const hidden = groups ? 0 : Math.max(0, rows.length - shown.length);

  // One module selected ⇒ the whole surface takes that module's hue. Two, or
  // none, and it correctly stays neutral rather than picking a side.
  const surfaceMod = mods.length === 1 ? mods[0] : undefined;

  /* ------------------------------------------------------- smart return
     SENDING. Recreated every render on purpose and deliberately NOT memoised:
     it has to close over the values that are true right now, because "the view
     I left" is only knowable at the moment of leaving. One function per render,
     shared by every row, so there is nothing to save by freezing it. */
  const onOpen = (id: string) => {
    // What to CALL this view in Hebrew. Only narrowings that are really applied
    // are named — an unfiltered list says nothing extra rather than inventing a
    // description of itself.
    const detail = [
      ...mods,
      ...kinds,
      ...caps.map((c) => dir.caps.find((x) => x.id === c)?.he || ""),
      q.trim() ? `חיפוש «${q.trim()}»` : "",
      view === "list" ? "" : views.find((v) => v.v === view)?.he || "",
    ].filter(Boolean).join(" · ");
    const state: RefListState = { view, q, sort, mods, kinds, caps, limit, y: canvas()?.scrollTop ?? 0, id };
    rememberOrigin({
      to: `/neo/${dir.id}/${encodeURIComponent(id)}/`,
      href: `/neo/${dir.id}/`,
      label: dir.title,
      detail,
      surface: dir.surface,
      state,
    });
  };

  // RECEIVING. The packet arrives on the first client render after a return and
  // is applied DURING that render — adjusting state to a changed external value,
  // which is the one place React sanctions a set during render. An effect would
  // be a cascading render on a prerendered page, and the list would visibly
  // rebuild itself in front of the reader.
  const packet = useReturnPacket(dir.surface);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<RefListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as RefListState;
    setBack(s);
    setView((views.some((v) => v.v === s.view) ? s.view : "list") as View);
    setQ(s.q || "");
    setSort((sorts.some((x) => x.s === s.sort) ? s.sort : "name") as Sort);
    setMods(Array.isArray(s.mods) ? s.mods : []);
    setKinds(Array.isArray(s.kinds) ? s.kinds : []);
    setCaps(Array.isArray(s.caps) ? s.caps : []);
    setLimit(Math.max(PAGE, Number(s.limit) || PAGE));
  }
  // Spend the packet. A write to an external store and nothing else.
  useEffect(() => { if (packet) consumeReturn(dir.surface); }, [packet, dir.surface]);

  // RESTORING the viewport is a second step on purpose: the row can only be
  // scrolled to once the restored `limit` has actually rendered it. The row wins
  // over the raw offset — a list is not a canvas, and "where I was" means the
  // record, not the pixel. `back` is set exactly once per return, so this effect
  // runs exactly once and needs no guard flag.
  useEffect(() => {
    if (!back) return;
    const raf = requestAnimationFrame(() => {
      const el = back.id
        ? document.querySelector<HTMLElement>(`.nxd-item[data-code="${CSS.escape(back.id)}"]`)
        : null;
      if (el) el.scrollIntoView({ block: "center", behavior: "auto" });
      else canvas()?.scrollTo({ top: Number(back.y) || 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(raf);
  }, [back]);

  return (
    <div
      className="nxd nxr-dir"
      data-surface={dir.id}
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <SmartReturn
        fallback={{ href: "/neo/", label: "Project NEO" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      <header className="nxd-head">
        {surfaceMod ? <span className="nx-modbar" aria-hidden="true" /> : null}
        <span className="nx-eyebrow">{dir.eyebrow}</span>
        <h1 className="nx-h1">{dir.title}</h1>
        <p className="nx-lede">{dir.lede}</p>
      </header>

      <section className="nx-card nxd-stats" aria-label="מספרי המאגר">
        {dir.stats.map((s) => (
          <div key={s.l} className="nxd-stat">
            <span className="nxd-stat-i" aria-hidden="true"><Glyph i={s.i} /></span>
            <b>{nf.format(s.v)}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <div className="nxd-tools">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
            placeholder={dir.searchPlaceholder}
            aria-label={`חיפוש · ${dir.title}`}
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="נקה חיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        {views.length > 1 ? (
          <div className="nxd-tabs" role="tablist" aria-label="תצוגה">
            {views.map((x) => (
              <button
                key={x.v}
                type="button"
                role="tab"
                className="nu-tab"
                aria-selected={view === x.v}
                onClick={() => { setView(x.v); setLimit(PAGE); }}
              >
                {x.v === "list" ? <ListTree size={13} strokeWidth={1.75} /> : x.v === "group" ? <LayoutGrid size={13} strokeWidth={1.75} /> : <Boxes size={13} strokeWidth={1.75} />}
                {x.he}
              </button>
            ))}
          </div>
        ) : null}

        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            {sorts.map((s) => <option key={s.s} value={s.s}>{s.he}</option>)}
          </select>
        </label>
      </div>

      <div className="nxd-facets">
        {dir.mods.length > 1 ? (
          <div className="nxd-facet" role="group" aria-label="סינון לפי מודול">
            <span className="nxd-facet-l">מודול</span>
            {dir.mods.map((m) => (
              <button
                key={m.id}
                type="button"
                className="nu-filter"
                style={{ "--m": modVar(m.id) } as React.CSSProperties}
                aria-pressed={mods.includes(m.id)}
                onClick={() => { setMods((v) => toggle(v, m.id)); setLimit(PAGE); }}
              >
                {m.he}<b>{nf.format(m.n)}</b>
              </button>
            ))}
          </div>
        ) : null}

        {dir.caps.length || dir.kinds.length > 1 ? (
          <div className="nxd-facet" role="group" aria-label="סינון לפי מאפיין">
            <span className="nxd-facet-l">מאפיין</span>
            {dir.caps.map((c) => (
              <button
                key={c.id}
                type="button"
                className="nu-filter"
                aria-pressed={caps.includes(c.id)}
                onClick={() => { setCaps((v) => toggle(v, c.id)); setLimit(PAGE); }}
              >
                {c.he}<b>{nf.format(c.n)}</b>
              </button>
            ))}
            {dir.kinds.length > 1 ? (
              <button
                type="button"
                className="nu-btn2 nxd-more"
                aria-expanded={kindsOpen}
                onClick={() => setKindsOpen((o) => !o)}
              >
                <Boxes size={13} strokeWidth={1.75} />
                {dir.kindsLabel}
                {kinds.length ? <b>{kinds.length}</b> : null}
              </button>
            ) : null}
          </div>
        ) : null}

        {kindsOpen && dir.kinds.length > 1 ? (
          <div className="nxd-facet" role="group" aria-label={`סינון לפי ${dir.kindsLabel}`}>
            <span className="nxd-facet-l">{dir.kindsLabel}</span>
            {dir.kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                className="nu-filter"
                aria-pressed={kinds.includes(k.id)}
                onClick={() => { setKinds((v) => toggle(v, k.id)); setLimit(PAGE); }}
              >
                {k.he}<b>{nf.format(k.n)}</b>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="nxd-count" aria-live="polite">
        <b>{nf.format(rows.length)}</b> מתוך {nf.format(dir.rows.length)} רשומות
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>נקה סינון</button></> : null}
      </p>

      {rows.length === 0 ? (
        <div className="nx-card nxd-none">
          <p><b>אין רשומה במאגר שעונה על הסינון הזה.</b></p>
          <p className="nx-muted">{dir.emptyNote}</p>
          <div className="nxd-none-a">
            <button type="button" className="nu-btn" onClick={reset}>הצג את כל הרשומות</button>
            {q ? <button type="button" className="nu-btn2" onClick={() => setQ("")}>נקה רק את החיפוש</button> : null}
          </div>
        </div>
      ) : groups ? (
        <div className="nxd-groups">
          {groups.map(([label, list]) => (
            <section key={label} className="nxd-group" aria-label={label}>
              <h2 className="nxd-group-h">
                <i aria-hidden="true" />
                <span>{label}</span>
                <em>{nf.format(list.length)}</em>
              </h2>
              <ul className="nxd-list">
                {list.map((r) => <Row key={r.id} r={r} onOpen={onOpen} />)}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <>
          <ul className="nxd-list">
            {shown.map((r) => <Row key={r.id} r={r} onOpen={onOpen} />)}
          </ul>
          {hidden > 0 ? (
            <p className="nxd-page">
              <button type="button" className="nu-btn2" onClick={() => setLimit((n) => n + PAGE)}>
                הצג עוד
                <span className="nxd-page-n">{nf.format(hidden)}</span>
              </button>
            </p>
          ) : null}
        </>
      )}

      {children}

      <p className="nxd-foot">{dir.foot}</p>
    </div>
  );
}
