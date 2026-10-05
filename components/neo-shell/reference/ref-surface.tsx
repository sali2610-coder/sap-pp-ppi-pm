"use client";

/* ============================================================================
   PROJECT NEO · THE REFERENCE DIRECTORY — one surface, five directories.
   ----------------------------------------------------------------------------
   /neo/bapi · /neo/cds · /neo/idoc · /neo/fiori-apps · /neo/enhancements are
   real directories, and they are deliberately the SAME directory as /neo/tables
   and /neo/transactions: the same hero, ledger, signature band, toolbar,
   aligned rows and empty state (components/neo-shell/data/catalog-kit.tsx,
   app/neo/data.css), so the namespace has ONE composition rather than seven
   that merely look alike.

   WHY ONE COMPONENT AND NOT FIVE
     The five record kinds differ in what they know, not in how they are chosen.
     Each builder (bapi-data.ts, cds-data.ts, …) resolves its own dataset at BUILD
     time into the common RefDir shape, so nothing here imports `@/data/*` and no
     SAP dataset crosses into the browser bundle.

   THE LEDGER IS BUILT FROM THE CONTRACT, NOT AUTHORED HERE
     the total of the list (the reset), every filter that actually narrows it
     (a filter matching every record is a fact, not a filter), and every number
     that points at a part of the page (RefStat.href, the IDoc reference). The
     remaining numbers the builder counted go to the facts line, so nothing the
     old stats plate carried is lost.

   CONTROL LANGUAGE (app/neo/ui.css)
     .nu-tab     switches the view in place — list, by area, by class.
     .nu-filter  narrows what is on screen. Every one carries its real count.
     .nu-status  dot + word — the record's S/4 standing, a real state.
     .nu-btn2    a real secondary action (show more, open the class facet).
     .nu-ghost   clear the query / remove one filter / clear the filters.
   There is no control on this surface that does nothing.

   COLOUR
     MODULE  a ring and a tint on the module's own chip, and the surface hue when
             exactly one module is selected. Never a dot, never a stripe.
     STATUS  only the S/4 standing (StatusPill): shape, colour and word.
     ACCENT  brand ink marks ONE thing: tone === "changed", i.e. the project data
             states this record materially changes in S/4HANA. Its own S/4
             sentence is set in that ink; no stripe.
   ========================================================================== */

import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Boxes, LayoutGrid, ListTree, Search, X } from "lucide-react";
import {
  SmartReturn, consumeReturn, rememberOrigin, restoreScroll, scrollOffset, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { CatalogFoot, CatalogHero, Cell, Cols, Ledger, fmt } from "../data/catalog-kit";
import { ViewTabs } from "../data/view-tabs";
import { MOD_HE, modVar } from "../mod-var";
import { Glyph } from "./icons";
import { RefSignature } from "./ref-signature";
import type { RefDir, RefRow } from "./types";

const PAGE = 90;

type View = "list" | "group" | "kind";
type Sort = "name" | "rank" | "s4";

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

/** The caps a signature owns: they are chosen there, not in the ledger. */
const SIG_CAPS: Partial<Record<RefDir["id"], string[]>> = { "fiori-apps": ["onprem", "cloud"] };

/* -------------------------------------------------------------------- row */

function Row({ r, onOpen, landed, hasMods }: { r: RefRow; onOpen: (id: string) => void; landed?: boolean; hasMods: boolean }) {
  const lead = r.lead === "name";
  return (
    <li
      className="nxd-item"
      data-code={r.id}
      data-back={landed ? "1" : undefined}
      style={{ "--m": modVar(r.mods[0]) } as React.CSSProperties}
    >
      <Link
        href={r.href}
        prefetch={false}
        onClick={() => onOpen(r.id)}
        className="nxd-row"
        data-impacted={r.s4.tone === "changed" ? "1" : undefined}
      >
        {/* THE BUSINESS ACTION FIRST where the record is an action (the Fiori
            directory, design audit S7-CAT-6); the code everywhere else. The
            other order's information is not lost: the code moves to the line
            under the name. */}
        <span className="nxd-c" data-k="id">
          {lead
            ? <b className="nxd-lead"><Rtl s={r.he || r.name} /></b>
            : <b className="nx-sap">{r.name}</b>}
          {lead || r.kind ? (
            <span className="nxd-sub">
              {lead ? <bdi className="nx-sap">{r.name}</bdi> : null}
              {lead && r.kind ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}
              {r.kind ? <Rtl s={r.kind} /> : null}
            </span>
          ) : null}
        </span>

        <span className="nxd-c" data-k="he">
          {lead ? (
            <>
              <span className="nxd-he">{r.en ? <bdi dir="ltr">{r.en}</bdi> : "לא צוין שם באנגלית במאגר"}</span>
              <span className="nxd-sub">
                {r.group ? <>תפקיד: <bdi className="nx-sap">{r.group}</bdi></> : "לא צוין תפקיד עסקי במאגר"}
              </span>
            </>
          ) : (
            <>
              <span className="nxd-he"><Rtl s={r.he || "לא קיים תיעוד מאומת במאגר"} /></span>
              {r.en || r.group ? (
                <span className="nxd-sub">
                  {r.en ? <bdi dir="ltr" className="nxd-en">{r.en}</bdi> : null}
                  {r.en && r.group ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}
                  {r.group ? <Rtl s={r.group} /> : null}
                </span>
              ) : null}
            </>
          )}
        </span>

        {hasMods ? (
          <Cell k="mod" l="מודול" sr="מודול ">
            <span className="nxd-mods">
              {r.mods.length
                ? r.mods.map((m) => (
                  <span key={m} className="nxd-mod" style={{ "--m": modVar(m) } as React.CSSProperties} title={MOD_HE[m]}>{m}</span>
                ))
                : <span className="nxd-nil">לא צוין</span>}
            </span>
          </Cell>
        ) : null}

        {/* Values, not controls. Each figure carries its own label, for every
            reader: a bare number or a glyph says nothing on its own. */}
        <Cell k="nums" l="נתונים">
          <span className="nxd-nums">
            {r.nums.map((n, i) => (
              <span key={i} className="nxd-num">
                {n.sr.trim() ? <span className="nxd-num-l">{n.sr.trim()}</span> : null}
                <b><Rtl s={n.v} /></b>
              </span>
            ))}
          </span>
        </Cell>

        <span className="nxd-c" data-k="s4">
          <StatusPill status={r.s4.status.key} label={r.s4.status.he} dot={r.s4.status.color} />
          <span className="nxd-s4-t"><Rtl s={r.s4.text || "לא קיים תיעוד S/4HANA מאומת לרשומה זו"} /></span>
        </span>
      </Link>
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function RefSurface({ dir, children, top }: { dir: RefDir; children?: React.ReactNode; top?: React.ReactNode }) {
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
    out.push({ s: "s4", he: "משתנה ב-S/4HANA תחילה" });
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
  const hasMods = dir.mods.length > 0;

  /* ---------------------------------------------------- ledger and facts */
  const total = dir.rows.length;
  const sigCaps = SIG_CAPS[dir.id] || [];
  const ledgerCaps = dir.caps.filter((c) => c.n > 0 && c.n < total && !sigCaps.includes(c.id));
  const inLedger = new Set(ledgerCaps.map((c) => c.id));
  const totalStat = dir.stats[0] && dir.stats[0].v === total ? dir.stats[0] : null;
  const anchors = dir.stats.filter((x) => x.href);
  const facts = dir.stats.filter((x) => x !== totalStat && !x.href && !(x.cap && inLedger.has(x.cap)));

  /* ------------------------------------------------------- smart return
     SENDING. Recreated every render on purpose and deliberately NOT memoised:
     it has to close over the values that are true right now, because "the view
     I left" is only knowable at the moment of leaving. */
  const onOpen = (id: string) => {
    // What to CALL this view in Hebrew. Only narrowings that are really applied
    // are named — an unfiltered list says nothing extra.
    const detail = [
      ...mods,
      ...kinds,
      ...caps.map((c) => dir.caps.find((x) => x.id === c)?.he || ""),
      q.trim() ? `חיפוש «${q.trim()}»` : "",
      view === "list" ? "" : views.find((v) => v.v === view)?.he || "",
    ].filter(Boolean).join(" · ");
    const state: RefListState = { view, q, sort, mods, kinds, caps, limit, y: scrollOffset(), id };
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
  // which is the one place React sanctions a set during render.
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
  // scrolled to once the restored `limit` has actually rendered it. The row
  // wins over the raw offset; restoreScroll also runs in a hidden tab.
  useEffect(() => {
    if (!back) return;
    return restoreScroll(Number(back.y) || 0, back.id ? `.nxd-item[data-code="${CSS.escape(back.id)}"]` : undefined);
  }, [back]);

  // The signature's "open this group": switch to the grouped view, then bring
  // the group to the top once it has rendered (at once, when it already has).
  const jumpTo = useRef("");
  const scrollToGroup = (label: string) =>
    document.querySelector<HTMLElement>(`.nxd-group[data-group="${CSS.escape(label)}"]`)
      ?.scrollIntoView({ block: "start", behavior: "auto" });
  const openGroup = (label: string) => {
    if (view === "group") { scrollToGroup(label); return; }
    jumpTo.current = label;
    setView("group");
  };
  useEffect(() => {
    if (!jumpTo.current || !groups) return;
    const label = jumpTo.current;
    jumpTo.current = "";
    document.querySelector<HTMLElement>(`.nxd-group[data-group="${CSS.escape(label)}"]`)
      ?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [groups]);

  // "Show more": the first new row takes the focus.
  const firstNew = useRef<number | null>(null);
  const showMore = () => { firstNew.current = shown.length; setLimit((n) => n + PAGE); };
  useEffect(() => {
    if (firstNew.current === null) return;
    const i = firstNew.current;
    firstNew.current = null;
    document.querySelectorAll<HTMLElement>(`.nxd[data-surface="${dir.id}"] .nxd-list > .nxd-item > .nxd-row`)[i]?.focus();
  }, [limit, dir.id]);

  const tokens = [
    ...mods.map((m) => ({ k: `m-${m}`, he: MOD_HE[m] ? `${m} · ${MOD_HE[m]}` : m, off: () => setMods((v) => v.filter((x) => x !== m)) })),
    ...kinds.map((k) => ({ k: `k-${k}`, he: k, off: () => setKinds((v) => v.filter((x) => x !== k)) })),
    ...caps.map((c) => ({ k: `c-${c}`, he: dir.caps.find((x) => x.id === c)?.he || c, off: () => setCaps((v) => v.filter((x) => x !== c)) })),
    ...(q.trim() ? [{ k: "q", he: `«${q.trim()}»`, off: () => setQ("") }] : []),
  ];

  const cols = [
    { k: "id", l: dir.rows.some((r) => r.lead === "name") ? "יישום" : "שם" },
    { k: "he", l: dir.rows.some((r) => r.lead === "name") ? "שם באנגלית ותפקיד" : "משמעות" },
    ...(hasMods ? [{ k: "mod", l: "מודול" }] : []),
    { k: "nums", l: "נתונים" },
    { k: "s4", l: "S/4HANA" },
  ];

  const showKinds = (kindsOpen || kinds.length > 0) && dir.kinds.length > 1;

  return (
    <div
      className="nxd nm-scene"
      data-scene="cream"
      data-surface={dir.id}
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<Glyph i={dir.icon} size={14} />}
        eyebrow={dir.eyebrow}
        title={dir.title}
        lede={dir.lede}
        facts={facts.map((x) => ({ v: x.v, l: x.l }))}
      >
        <Ledger
          label="הקטלוג במספרים. כל מספר מסנן את הרשימה או מוביל לחלק שלו בעמוד"
          items={[
            { v: total, l: totalStat?.l || "רשומות בקטלוג", on: !dirty, onClick: reset },
            ...ledgerCaps.map((c) => ({
              v: c.n,
              l: c.he,
              on: caps.includes(c.id),
              onClick: () => { setCaps((v) => toggle(v, c.id)); setLimit(PAGE); },
            })),
            ...anchors.map((x) => ({ v: x.v, l: x.l, href: x.href })),
          ]}
        />
      </CatalogHero>

      {top}

      <RefSignature
        dir={dir}
        s={{
          mods, kinds, caps,
          toggleKind: (k) => { setKinds((v) => toggle(v, k)); setLimit(PAGE); },
          toggleCap: (c) => { setCaps((v) => toggle(v, c)); setLimit(PAGE); },
          slice: (m, c) => { setMods(m); setCaps(c); setLimit(PAGE); },
          openGroup,
          onOpen,
        }}
      />

      <div className="nxd-tools nm-fade nm-once">
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
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        {views.length > 1 ? (
          <ViewTabs
            id={`neo-${dir.id}-view`}
            value={view}
            onChange={(v) => { setView(v); setLimit(PAGE); }}
            options={views.map((x) => ({
              value: x.v,
              label: x.he,
              icon: x.v === "list" ? <ListTree size={15} aria-hidden="true" /> : x.v === "group" ? <LayoutGrid size={15} aria-hidden="true" /> : <Boxes size={15} aria-hidden="true" />,
            }))}
          />
        ) : null}

        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            {sorts.map((s) => <option key={s.s} value={s.s}>{s.he}</option>)}
          </select>
        </label>

        {/* The module row, unless the signature already is it (the Fiori
            matrix chooses module and deployment together). */}
        {dir.mods.length > 1 && dir.id !== "fiori-apps" ? (
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
                {m.he}<b>{fmt(m.n)}</b>
              </button>
            ))}
          </div>
        ) : null}

        {/* Kinds the signature does not already choose (CDS and the
            enhancements choose theirs on the route and the ladder). */}
        {dir.kinds.length > 1 && dir.id !== "cds" && dir.id !== "enhancements" ? (
          <div className="nxd-facet" role="group" aria-label={`סינון לפי ${dir.kindsLabel}`}>
            <button
              type="button"
              className="nu-btn2 nxd-more"
              aria-expanded={showKinds}
              onClick={() => setKindsOpen((o) => !o)}
            >
              <Boxes size={13} strokeWidth={1.75} />
              {dir.kindsLabel}
              {kinds.length ? <b>{fmt(kinds.length)}</b> : null}
            </button>
            {showKinds ? dir.kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                className="nu-filter"
                aria-pressed={kinds.includes(k.id)}
                onClick={() => { setKinds((v) => toggle(v, k.id)); setLimit(PAGE); }}
              >
                {k.he}<b>{fmt(k.n)}</b>
              </button>
            )) : null}
          </div>
        ) : null}
      </div>

      <div className="nxd-count">
        <p>
          <b aria-live="polite">{fmt(rows.length)}</b> מתוך {fmt(total)} רשומות
        </p>
        {tokens.length ? (
          <div className="nxd-toks" role="group" aria-label="הסינון הפעיל">
            {tokens.map((tk) => (
              <button key={tk.k} type="button" className="nu-ghost nxd-tok" onClick={tk.off} aria-label={`הסרת הסינון ${tk.he}`}>
                <X size={12} strokeWidth={2} aria-hidden="true" />{tk.he}
              </button>
            ))}
            <button type="button" className="nu-ghost nxd-tok-all" onClick={reset}>ניקוי הסינון</button>
          </div>
        ) : null}
      </div>

      <div
        className="nxd-results"
        data-cols="ref"
        data-mods={hasMods ? undefined : "0"}
        id={`neo-${dir.id}-view-panel`}
        role={views.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={views.length > 1 ? `neo-${dir.id}-view-${view}` : undefined}
      >
        {rows.length === 0 ? (
          <div className="nxd-none">
            <p><b>לא נמצאו רשומות מתאימות. נסה חיפוש אחר או נקה מסננים.</b></p>
            <p className="nx-muted">{dir.emptyNote}</p>
            <div className="nxd-none-a">
              <button type="button" className="nu-btn" onClick={reset}>הצגת כל הרשומות</button>
              {q ? <button type="button" className="nu-btn2" onClick={() => setQ("")}>ניקוי החיפוש בלבד</button> : null}
            </div>
          </div>
        ) : (
          <>
            <div className="nxd-table" id="nxd-list">
              <Cols cols={cols} />
              {groups ? (
                groups.map(([label, list]) => (
                  <section key={label} className="nxd-group" data-group={label} aria-label={label}>
                    <h2 className="nxd-group-h">
                      <span><Rtl s={label} /></span>
                      <em>{fmt(list.length)}</em>
                    </h2>
                    <ul className="nxd-list">
                      {list.map((r) => <Row key={r.id} r={r} onOpen={onOpen} landed={r.id === back?.id} hasMods={hasMods} />)}
                    </ul>
                  </section>
                ))
              ) : (
                <ul className="nxd-list">
                  {shown.map((r) => <Row key={r.id} r={r} onOpen={onOpen} landed={r.id === back?.id} hasMods={hasMods} />)}
                </ul>
              )}
            </div>
            {hidden > 0 ? (
              <p className="nxd-page">
                <button type="button" className="nu-btn2" onClick={showMore}>
                  הצגת רשומות נוספות
                  <span className="nxd-page-n">{fmt(hidden)}</span>
                </button>
              </p>
            ) : null}
          </>
        )}
      </div>

      {children}

      {dir.compare ? (
        <details className="nxd-compare">
          <summary>
            <span>{dir.compare.title}</span>
            <em>{dir.compare.lede}</em>
          </summary>
          <ul className="nxd-cmp">
            {dir.compare.rows.map((row) => (
              <li key={row.href}>
                <Link href={row.href} prefetch={false} className="nxd-cmp-h">
                  <bdi className="nx-sap">{row.code}</bdi>
                  {row.he && row.he !== row.code ? <span><Rtl s={row.he} /></span> : null}
                </Link>
                <dl>
                  {row.cells.map((c, i) => (
                    <div key={i} data-k={typeof c === "string" ? undefined : "status"}>
                      <dt>{dir.compare!.columns[i + 1]}</dt>
                      <dd>
                        {typeof c === "string"
                          ? (c ? <Rtl s={c} /> : <span className="nxd-nil">לא צוין</span>)
                          : <StatusPill status={c.status.key} label={c.status.he} dot={c.status.color} />}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <CatalogFoot>{dir.foot}</CatalogFoot>
    </div>
  );
}
