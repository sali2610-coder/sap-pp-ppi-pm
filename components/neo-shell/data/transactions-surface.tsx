"use client";

// Project NEO · /neo/transactions — the canonical transaction registry, carried
// into the NEO shell.
//
// WHAT IS REUSED, NOT REBUILT
//   lib/tx-registry      the ONE canonical registry the live Transaction Center
//                        is built on (TX_INTEL → TRANSACTIONS → TCODE_DIRECTORY
//                        → TCODE_CATALOG, deduplicated, deep-first).
//   lib/tx-intel         the real popularity index and the deep intelligence
//                        record (Fiori successor, related tables).
//   lib/tx-facets        the conservative Topic / Object classification.
//   lib/tx-prefs         the product's real favourites and recently-viewed
//                        lists — the same localStorage keys the live centre and
//                        every /tcode page already read and write.
//   nav-context          the smart-return module. This surface both WRITES an
//                        origin (on every row click) and READS one back (to
//                        rebuild the exact view on return).
// /neo/transactions/<CODE>/ is the destination — the NEO detail screen, one
// generated page per code in the registry above. The production /tcode/ pages
// are untouched and still serve the live Transaction Center.
// This file imports those on the CLIENT, exactly as components/transaction-
// workspace.tsx does, so the two centres share one chunk instead of shipping a
// second copy of the registry inside an RSC payload.
//
// CONTROL LANGUAGE (app/neo/ui.css)
//   .nu-tab     switches which slice of the registry is listed.
//   .nu-filter  narrows it. Counts on a filter are always the real count.
//   .nu-chip    a value — module, area, Fiori successor. Never clickable.
//   .nu-status  dot + word. Used for one thing only: how deeply the registry
//               documents the code, which is a real state of the record.
//   .nu-card    the row, which opens /neo/transactions/<CODE>/.
//   .nu-link    the contextual return at the top of the surface.
//   .nu-ghost   the row's second action: favourite / unfavourite.
//   .nu-btn2    show more results — a real action, replacing the dead
//               "showing the first 300" note.

import { rovingKeys } from "../focus";
import { enLang, slashBreaks } from "../lang";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState, ViewTransition } from "react";
import {
  AppWindow, ArrowLeft, Clock, Flame, Layers, ListFilter, Search, SlidersHorizontal,
  Star, Terminal, X,
} from "lucide-react";
import { TX_INTEL } from "@/data/tx-intel";
import { txPopularity, txMostPopular } from "@/lib/tx-intel";
import { registryStats, txRegistry, type RegistryTx } from "@/lib/tx-registry";
import { facetsOf, presentFacets } from "@/lib/tx-facets";
import { toggleTxFavorite, useRecentTx, useTxFavorites } from "@/lib/tx-prefs";
import { SmartReturn, consumeReturn, rememberOrigin, useReturnPacket } from "@/components/neo-shell/nav-context";
import { MOD_HE, modVar } from "../mod-var";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { ActiveFilters, FacetSheet, FacetToggle } from "./facet-sheet";
import { catalogSearch, txHay } from "./catalog-match";

const nf = new Intl.NumberFormat("he-IL");
const PAGE = 120;

/* ------------------------------------------------------------ smart return
   This surface is one of the two the smart-return module is wired into. It
   plays both parts:

   SENDING   every row records, at the moment it is clicked, which view the user
             is leaving — the tab, the query, the three facets, how far they had
             paged, where the canvas was scrolled and which code they opened.
   RECEIVING on the render after a return it takes that packet back and rebuilds
             the same list: same filters, same page depth, same row under the
             cursor. Not "the transactions page" — THE view they left.

   The state is read at CLICK time, not at render time, because the scroll
   offset and the live query are only true at the moment of leaving. */

const SURFACE = "neo:transactions";
const txHref = (code: string) => `/neo/transactions/${encodeURIComponent(code)}/`;

/** The NEO canvas is the scroller, not the window (see .nx-canvas in
 *  app/globals.css), so a restored scroll offset has to be read from it. */
const canvas = (): HTMLElement | null =>
  typeof document === "undefined" ? null : document.getElementById("main");

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that lets it satisfy the module's OriginState contract. */
type TxListState = {
  view: string; q: string; mod: string; topic: string; obj: string;
  fiori: boolean; more: boolean; limit: number; y: number; code: string;
};

type View = "all" | "popular" | "deep" | "fav" | "recent";

const VIEWS: { v: View; he: string }[] = [
  { v: "all", he: "כל הקטלוג" },
  { v: "popular", he: "הנפוצות" },
  { v: "deep", he: "מתועדות לעומק" },
  { v: "fav", he: "מועדפים" },
  { v: "recent", he: "נצפו לאחרונה" },
];

// Same control order as the other six catalogs (design audit S7-CAT-8):
// search · view · sort. "Relevance" is the order the list always had (search
// score, else depth then popularity, else the view's own order).
type Sort = "rel" | "code" | "module";
const SORTS: { s: Sort; he: string }[] = [
  { s: "rel", he: "רלוונטיות" },
  { s: "code", he: "קוד הטרנזקציה" },
  { s: "module", he: "מודול" },
];

/* --------------------------------------------------------------- matching
   ./catalog-match.ts, shared with the tables and the reference directories:
   prefix beats an inner substring beats a Hebrew form (פקודה/הזמנה,
   אחזקה/תחזוקה, endings, one-letter prefixes) beats an in-order subsequence
   or a one-letter typo of the code itself. Every word has to land. */

/* -------------------------------------------------------------------- row */

function Row({ t, fav, onOpen, landed, st }: { t: RegistryTx; fav: boolean; onOpen: (code: string) => void; landed?: boolean; st?: string }) {
  const deep = t.depth === "deep";
  const intel = TX_INTEL[t.code];
  const fiori = intel?.fiori?.trim() || "";
  const f = facetsOf(t.code);
  return (
    <li
      // nm-rise + nm-once come from app/neo/motion.css. This route resolves to
      // [data-motion="2"] — an 8px rise, scrubbed on .nx-canvas's own view
      // timeline, finished while the row is still entering so scrolling back up
      // never replays it. No scroll listener and no rAF anywhere in the path.
      className="nxd-item nm-rise nm-once"
      data-code={t.code}
      // SmartReturn landed here. data.css draws a module-hued ring that fades
      // itself out, so returning from a T-Code says which row it was.
      data-back={landed ? "1" : undefined}
      style={{ "--m": modVar(t.module) } as React.CSSProperties}
    >
      {/* The destination moved from the production /tcode/ page to the NEO
          detail screen this change adds. Both exist; this surface belongs to
          the NEO namespace and now stays inside it. */}
      <Link
        href={txHref(t.code)}
        className="nu-card nxd-row nxd-row--tx"
        prefetch={false}
        onClick={() => onOpen(t.code)}
      >
        <span className="nxd-mark" aria-hidden="true" />

        <span className="nxd-id">
          {/* The list-to-record signature (tx-detail-view.tsx, same name). */}
          <ViewTransition name={`rec-tx-${t.code}`} share="rec-morph" default="none">
            <b className="nx-sap">{t.code}</b>
          </ViewTransition>
          <span className="nu-chip nxd-mod" style={{ "--m": modVar(t.module) } as React.CSSProperties}>
            <i aria-hidden="true" />
            {t.module}
            {MOD_HE[t.module] ? <em>{MOD_HE[t.module]}</em> : null}
          </span>
        </span>

        <span className="nxd-body">
          <span className="nxd-he">{slashBreaks(t.he || t.en) || "אין כותרת במאגר"}</span>
          <span className="nxd-sub">
            {t.en ? <span dir="ltr" className="nxd-en" lang={enLang(t.en)}>{slashBreaks(t.en)}</span> : null}
            {t.en && t.area ? <span className="nxd-dot" aria-hidden="true">·</span> : null}
            {t.area ? <span>{t.area}</span> : null}
          </span>
        </span>

        <span className="nxd-nums">
          {/* The canonical S/4HANA standing first — the same word, colour and
              glyph the code's page renders (design audit S5-2 / ACC-3) — then
              how deeply the registry documents the code. */}
          {st ? <StatusPill status={st} /> : null}
          <span className="nu-status" style={{ "--s": deep ? "var(--status-done)" : "var(--status-not-started)" } as React.CSSProperties}>
            {deep ? "מתועדת לעומק" : "מאומתת"}
          </span>
          {/* LESS METADATA ON THE CARD (design audit S7-CAT-2): the code, its
              meaning, where it is used and its S/4 standing. The Fiori
              successor stays because it is a door; the topic says "when";
              the reference count and the second facet moved to the page. */}
          {fiori ? <span className="nu-chip"><AppWindow size={11} strokeWidth={1.75} /><span className="nx-sr">יישום Fiori קשור </span>{fiori}</span> : null}
          {f.topics[0] ? <span className="nu-chip">{f.topics[0]}</span> : null}
        </span>

        <span className="nxd-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>

      <button
        type="button"
        className="nu-ghost nxd-ctx nxd-star"
        aria-pressed={fav}
        aria-label={fav ? `הסרת ${t.code} מהמועדפים` : `הוספת ${t.code} למועדפים`}
        onClick={() => toggleTxFavorite(t.code)}
      >
        <Star size={13} strokeWidth={1.75} />
        <span>{fav ? "במועדפים" : "מועדף"}</span>
      </button>
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function TransactionsSurface({ status, extra }: { status?: Record<string, string>; extra?: { code: string; tables: string[] }[] }) {
  const reg = useMemo(() => txRegistry(), []);
  const all = useMemo(() => [...reg.values()], [reg]);
  const stats = useMemo(() => registryStats(), []);
  const popular = useMemo(() => txMostPopular(60), []);
  const facets = useMemo(() => presentFacets(all.map((t) => t.code)), [all]);
  const modules = useMemo(
    () => Object.keys(stats.byModule).sort((a, b) => stats.byModule[b] - stats.byModule[a]),
    [stats],
  );

  const favs = useTxFavorites();
  const recent = useRecentTx();

  const [view, setView] = useState<View>("all");
  const [sort, setSort] = useState<Sort>("rel");
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [topic, setTopic] = useState("");
  const [obj, setObj] = useState("");
  const [fiori, setFiori] = useState(false);
  const [more, setMore] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  // The filter sheet on a phone (facet-sheet.tsx). A stable close, because the
  // dialog hook re-arms whenever it changes.
  const [sheet, setSheet] = useState(false);
  const closeSheet = useCallback(() => setSheet(false), []);
  const sheetId = useId();
  const toggleId = useId();

  const list = useMemo(() => {
    let base: RegistryTx[];
    if (view === "fav") base = favs.map((c) => reg.get(c)).filter(Boolean) as RegistryTx[];
    else if (view === "recent") base = recent.map((c) => reg.get(c)).filter(Boolean) as RegistryTx[];
    else if (view === "popular") base = popular.map((c) => reg.get(c)).filter(Boolean) as RegistryTx[];
    else if (view === "deep") base = all.filter((t) => t.depth === "deep");
    else base = all;

    let rows = base;
    if (mod) rows = rows.filter((t) => t.module === mod);
    if (topic) rows = rows.filter((t) => facetsOf(t.code).topics.includes(topic));
    if (obj) rows = rows.filter((t) => facetsOf(t.code).objects.includes(obj));
    if (fiori) rows = rows.filter((t) => !!TX_INTEL[t.code]?.fiori?.trim());

    const s = q.trim().toLowerCase();
    if (s) {
      rows = catalogSearch(rows, s, (t) => ({ hay: txHay(t), code: t.code.toLowerCase() }))
        .sort((a, b) => b.score - a.score || txPopularity(b.row.code) - txPopularity(a.row.code))
        .map((x) => x.row);
    } else if (view === "all" || view === "deep") {
      rows = [...rows].sort(
        (a, b) =>
          (b.depth === "deep" ? 1 : 0) - (a.depth === "deep" ? 1 : 0) ||
          txPopularity(b.code) - txPopularity(a.code) ||
          a.code.localeCompare(b.code),
      );
    }
    if (sort === "code") rows = [...rows].sort((a, b) => a.code.localeCompare(b.code));
    else if (sort === "module") rows = [...rows].sort((a, b) => a.module.localeCompare(b.module) || a.code.localeCompare(b.code));
    return rows;
  }, [all, reg, view, favs, recent, popular, mod, topic, obj, fiori, q, sort]);

  const shown = list.slice(0, limit);
  const dirty = !!q || !!mod || !!topic || !!obj || fiori;
  const reset = () => { setQ(""); setMod(""); setTopic(""); setObj(""); setFiori(false); setLimit(PAGE); };
  // The filters alone, for the sheet: its "clear" leaves the search as typed.
  const active = [
    ...(mod ? [{ key: "m", label: mod, off: () => { setMod(""); setLimit(PAGE); } }] : []),
    ...(fiori ? [{ key: "f", label: "עם יישום Fiori קשור", off: () => { setFiori(false); setLimit(PAGE); } }] : []),
    ...(topic ? [{ key: "t", label: topic, off: () => { setTopic(""); setLimit(PAGE); } }] : []),
    ...(obj ? [{ key: "o", label: obj, off: () => { setObj(""); setLimit(PAGE); } }] : []),
  ];
  const clearFilters = () => { setMod(""); setTopic(""); setObj(""); setFiori(false); setLimit(PAGE); };
  const onView = (v: View) => { setView(v); setLimit(PAGE); };

  /* ------------------------------------------------------- smart return */

  // Recreated every render on purpose, and deliberately NOT memoised: it has to
  // close over the values that are true right now, because "the view I left" is
  // only knowable at the moment of leaving. One function per render, shared by
  // every row, so there is nothing to save by freezing it.
  const onOpen = (code: string) => {
    // What to CALL this view in Hebrew. Only real, currently-applied narrowings
    // are named — an unfiltered list says nothing extra rather than inventing a
    // description of itself.
    const parts = [
      mod,
      topic,
      obj,
      fiori ? "עם יישום Fiori קשור" : "",
      q.trim() ? `חיפוש "${q.trim()}"` : "",
      view === "all" ? "" : VIEWS.find((v) => v.v === view)?.he || "",
    ].filter(Boolean);
    const state: TxListState = {
      view, q, mod, topic, obj, fiori, more, limit,
      y: canvas()?.scrollTop ?? 0,
      code,
    };
    rememberOrigin({
      to: txHref(code),
      href: "/neo/transactions/",
      label: "טרנזקציות",   // the rail's name for this page (gate 5, finding 16)
      detail: parts.join(" · "),
      surface: SURFACE,
      state,
    });
  };

  // The other half. The packet arrives on the first client render after a
  // return and is applied DURING that render — adjusting state to a changed
  // external value, which is the one place React sanctions a set during render.
  // Doing it in an effect instead would be a cascading render on a prerendered
  // page, and the list would visibly rebuild itself in front of the reader.
  // `seededAt` is state and not a ref, because the guard is part of what this
  // component renders and a ref read during render is not.
  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<TxListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as TxListState;
    setBack(s);
    setView((VIEWS.some((v) => v.v === s.view) ? s.view : "all") as View);
    setQ(s.q || "");
    setMod(s.mod || "");
    setTopic(s.topic || "");
    setObj(s.obj || "");
    setFiori(!!s.fiori);
    setMore(!!s.more);
    setLimit(Math.max(PAGE, Number(s.limit) || PAGE));
  }
  // Spend the packet. A write to an external store and nothing else.
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);

  // Restoring the viewport is a second step on purpose: the row can only be
  // scrolled to once the restored `limit` has actually rendered it. The row
  // wins over the raw offset — a list is not a canvas, and "where I was" means
  // the record, not the pixel.
  // `back` is set exactly once per return, so this effect runs exactly once —
  // no guard flag is needed and none is kept.
  useEffect(() => {
    if (!back) return;
    const id = requestAnimationFrame(() => {
      const el = back.code
        ? document.querySelector<HTMLElement>(`.nxd-item[data-code="${CSS.escape(back.code)}"]`)
        : null;
      if (el) el.scrollIntoView({ block: "center", behavior: "auto" });
      else canvas()?.scrollTo({ top: Number(back.y) || 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [back]);

  const surfaceMod = mod || undefined;

  const emptyCopy: Record<View, { t: string; h: string }> = {
    all: { t: "לא נמצאו טרנזקציות התואמות לסינון שנבחר", h: "החיפוש מכסה קוד טרנזקציה, שם עברי, שם אנגלי, אזור ומודול." },
    popular: { t: "לא נמצאו תוצאות בין הטרנזקציות הנפוצות", h: "הנפוצות: לפי מספר ההפניות במאגר." },
    deep: { t: "לא נמצאו תוצאות בין הטרנזקציות המתועדות לעומק", h: `${nf.format(stats.deep)} טרנזקציות מתועדות לעומק בעמוד מלא.` },
    fav: { t: "אין מועדפים עדיין", h: "סימון \"מועדף\" בשורה או בעמוד הטרנזקציה מוסיף אותה לכאן. הרשימה נשמרת במכשיר זה." },
    recent: { t: "לא נצפו טרנזקציות עדיין", h: "כל טרנזקציה שנפתחה תופיע כאן. הרשימה נשמרת במכשיר זה." },
  };

  return (
    <div
      className="nxd"
      data-surface="transactions"
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      {/* Where the user came from, when the session knows — the rail, the PM
          workspace, a search. With no memory it falls back to the NEO home,
          which is this page's real parent and a real page. Never dead. */}
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      {/* THE REVEAL LADDER, at L2. Information blocks rise 8px; the two control
          bands only fade, because a filter that slides while you are reaching
          for it is a filter you miss. */}
      <header className="nxd-head nm-rise nm-once">
        {surfaceMod ? <span className="nx-modbar" aria-hidden="true" /> : null}
        <span className="nx-eyebrow">קטלוג טרנזקציות</span>
        {/* One name per destination (gate 5, finding 16): the rail, the
            breadcrumb, the home's door and the return link all call this page
            "טרנזקציות"; the title had "טרנזקציות SAP". The eyebrow says what
            kind of page it is. */}
        <h1 className="nx-h1">טרנזקציות</h1>
        <p className="nx-lede">
          {nf.format(stats.total)} טרנזקציות SAP מ-{nf.format(modules.length)} מודולים בקטלוג אחד;
          {/* The lede used to end by printing the raw route /neo/transactions/
              at the reader. A URL is plumbing, not product copy, and the reader
              is already standing on it. The sentence now ends where it means. */}
          {" "}{nf.format(stats.deep)} מהן מתועדות לעומק. כל שורה נפתחת לעמוד הטרנזקציה.
        </p>
      </header>


      <div className="nxd-tools nm-fade nm-once">
        {/* ONE SEARCH (spec P1 §10): the site's search is the shell's; this
            field narrows this list, and is named and drawn as a filter. */}
        <div className="nxd-field">
          <ListFilter size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
            placeholder="סינון הרשימה: קוד (IW31) · שם עברי · שם אנגלי · אזור"
            aria-label="סינון רשימת הטרנזקציות"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי הסינון">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <div className="nxd-tabs" role="tablist" aria-label="תצוגה" onKeyDown={rovingKeys}>
          {VIEWS.map((x) => (
            <button
              key={x.v}
              type="button"
              role="tab"
              className="nu-tab"
              aria-selected={view === x.v}
              tabIndex={view === x.v ? 0 : -1}
              onClick={() => onView(x.v)}
            >
              {x.v === "popular" ? <Flame size={13} strokeWidth={1.75} />
                : x.v === "deep" ? <Layers size={13} strokeWidth={1.75} />
                : x.v === "fav" ? <Star size={13} strokeWidth={1.75} />
                : x.v === "recent" ? <Clock size={13} strokeWidth={1.75} />
                : <Terminal size={13} strokeWidth={1.75} />}
              {x.he}
              {x.v === "fav" && favs.length ? <b>{nf.format(favs.length)}</b> : null}
              {x.v === "recent" && recent.length ? <b>{nf.format(recent.length)}</b> : null}
            </button>
          ))}
        </div>

        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => { setSort(e.target.value as Sort); setLimit(PAGE); }}>
            {SORTS.map((x) => <option key={x.s} value={x.s}>{x.he}</option>)}
          </select>
        </label>
        <FacetToggle id={toggleId} open={sheet} active={active.length} controls={sheetId} onOpen={() => setSheet(true)} />
      </div>

      <ActiveFilters items={active} back={toggleId} />

      <FacetSheet
        id={sheetId}
        open={sheet}
        onClose={closeSheet}
        onClear={clearFilters}
        dirty={active.length > 0}
        shown={list.length}
        noun="טרנזקציות"
      >
        <div className="nxd-facet" role="group" aria-label="סינון לפי מודול">
          <span className="nxd-facet-l">מודול</span>
          {modules.slice(0, more ? modules.length : 8).map((m) => (
            <button
              key={m}
              type="button"
              className="nu-filter"
              style={{ "--m": modVar(m) } as React.CSSProperties}
              aria-pressed={mod === m}
              onClick={() => { setMod(mod === m ? "" : m); setLimit(PAGE); }}
            >
              {m}<b>{nf.format(stats.byModule[m])}</b>
            </button>
          ))}
          <button
            type="button"
            className="nu-filter"
            aria-pressed={fiori}
            onClick={() => { setFiori((f) => !f); setLimit(PAGE); }}
          >
            <AppWindow size={13} strokeWidth={1.75} />עם יישום Fiori קשור
          </button>
          <button
            type="button"
            className="nu-btn2 nxd-more"
            aria-expanded={more}
            onClick={() => setMore((o) => !o)}
          >
            <SlidersHorizontal size={13} strokeWidth={1.75} />
            {more ? "פחות מסננים" : "עוד מסננים"}
          </button>
        </div>

        {more ? (
          <>
            {facets.topics.length ? (
              <div className="nxd-facet" role="group" aria-label="סינון לפי נושא">
                <span className="nxd-facet-l">נושא</span>
                {facets.topics.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="nu-filter"
                    aria-pressed={topic === x}
                    onClick={() => { setTopic(topic === x ? "" : x); setLimit(PAGE); }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            ) : null}
            {facets.objects.length ? (
              <div className="nxd-facet" role="group" aria-label="סינון לפי אובייקט עסקי">
                <span className="nxd-facet-l">אובייקט</span>
                {facets.objects.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="nu-filter"
                    aria-pressed={obj === x}
                    onClick={() => { setObj(obj === x ? "" : x); setLimit(PAGE); }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </FacetSheet>

      <section className="nx-card nxd-stats nxd-stats--after nm-rise nm-once" aria-label="מספרי המאגר">
        {[
          { v: stats.total, l: "טרנזקציות במאגר", i: <Terminal size={14} strokeWidth={1.75} /> },
          { v: stats.deep, l: "מתועדות לעומק", i: <Layers size={14} strokeWidth={1.75} /> },
          { v: stats.light, l: "רשומות אימות", i: <Search size={14} strokeWidth={1.75} /> },
          { v: modules.length, l: "מודולים", i: <SlidersHorizontal size={14} strokeWidth={1.75} /> },
          { v: facets.topics.length, l: "נושאים מסווגים", i: <Flame size={14} strokeWidth={1.75} /> },
          { v: facets.objects.length, l: "אובייקטים עסקיים", i: <AppWindow size={14} strokeWidth={1.75} /> },
        ].map((s) => (
          <div key={s.l} className="nxd-stat">
            <span className="nxd-stat-i" aria-hidden="true">{s.i}</span>
            <b>{nf.format(s.v)}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <p className="nxd-count nm-fade nm-once">
        {/* The count is live, the button is not: inside the region it was read out again on every change (gate 8, m4). */}
        <span aria-live="polite">
          <b>{nf.format(list.length)}</b> מתוך {nf.format(stats.total)} טרנזקציות
        </span>
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>ניקוי הסינון</button></> : null}
      </p>

      {list.length === 0 ? (
        <div className="nx-card nxd-none nm-rise nm-once">
          <p><b>{emptyCopy[view].t}</b></p>
          <p className="nx-muted">{emptyCopy[view].h}</p>
          <div className="nxd-none-a">
            {dirty ? <button type="button" className="nu-btn" onClick={reset}>ניקוי הסינון</button> : null}
            {view !== "all" ? <button type="button" className="nu-btn2" onClick={() => onView("all")}>הצגת כל הקטלוג</button> : null}
          </div>
        </div>
      ) : (
        <>
          <ul className="nxd-list">
            {shown.map((t) => <Row key={t.code} t={t} fav={favs.includes(t.code)} onOpen={onOpen} landed={t.code === back?.code} st={status?.[t.code]} />)}
          </ul>
          {list.length > shown.length ? (
            <div className="nxd-page">
              <button type="button" className="nu-btn2" onClick={() => setLimit((n) => n + PAGE)}>
                הצגת {nf.format(Math.min(PAGE, list.length - shown.length))} נוספות
                <span className="nxd-page-n">· נותרו {nf.format(list.length - shown.length)}</span>
              </button>
            </div>
          ) : null}
        </>
      )}

      {/* Codes the blueprint lists on a table that the verified registry does
          not carry. Each has a page that says so; they are listed here, apart
          from the catalogue, so its counts stay the registry's. */}
      {extra?.length ? (
        <details className="nxd-extra">
          <summary>
            עוד <span className="nx-sap">{nf.format(extra.length)}</span> קודים שמופיעים בבלופרינט ואינם ברישום המאומת
          </summary>
          <p className="nxd-extra-p">
            כל קוד מופיע בעמודת הטרנזקציות של טבלה בבלופרינט של הפרויקט. לכל אחד עמוד משלו,
            {" "}שמציין שהקוד אינו ברישום המאומת ומה ידוע עליו מהבלופרינט.
          </p>
          <ul className="nxd-extra-l">
            {extra.map((x) => (
              <li key={x.code}>
                <Link href={`/neo/transactions/${x.code}/`} prefetch={false} className="nu-link nx-sap" dir="ltr">{x.code}</Link>
                {x.tables.length ? <span className="nxd-extra-t" dir="ltr">{x.tables.join(" · ")}</span> : null}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <p className="nxd-foot nm-fade nm-once">
        הקטלוג מאחד את מקורות הפרויקט לרשימה אחת, בלי כפילויות. קוד ללא כותרת אנגלית במקור
        {" "}מוצג בלעדיה.
      </p>
    </div>
  );
}
