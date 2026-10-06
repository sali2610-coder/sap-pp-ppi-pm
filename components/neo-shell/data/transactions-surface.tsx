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
// generated page per code in the registry above. This file imports those on the
// CLIENT, exactly as components/transaction-workspace.tsx does, so the two
// centres share one chunk instead of shipping a second copy of the registry
// inside an RSC payload.
//
// THE SHAPE (2026-10, catalog-kit.tsx): the hero's ledger counts open their
// slice (the whole registry, the deep records, the popular list, the codes with
// a Fiori successor); the signature ranks the 17 modules, each one the module
// filter, with the share documented in depth drawn darker; the rows are
// aligned under a column head and become cards on a narrow width.
//
// CONTROL LANGUAGE (app/neo/ui.css)
//   .nu-tab     switches which slice of the registry is listed.
//   .nu-filter  narrows it. Counts on a filter are always the real count.
//   .nu-status  dot + word. Used for one thing only: how deeply the registry
//               documents the code, which is a real state of the record.
//   .nu-ghost   the row's second action: favourite / unfavourite.
//   .nu-btn2    show more results — a real action.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Clock, Flame, Layers, Search, SlidersHorizontal,
  Star, Terminal, X,
} from "lucide-react";
import { TX_INTEL } from "@/data/tx-intel";
import { txPopularity, txMostPopular } from "@/lib/tx-intel";
import { registryStats, txRegistry, type RegistryTx } from "@/lib/tx-registry";
import { facetsOf, presentFacets } from "@/lib/tx-facets";
import { toggleTxFavorite, useRecentTx, useTxFavorites } from "@/lib/tx-prefs";
import { SmartReturn, consumeReturn, rememberOrigin, restoreScroll, scrollOffset, useReturnPacket } from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { MOD_HE, modVar } from "../mod-var";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { ViewTabs } from "./view-tabs";
import { CatalogFoot, CatalogHero, Cell, Cols, Ledger, RankList, Sig, fmt } from "./catalog-kit";

const PAGE = 120;

/* ------------------------------------------------------------ smart return
   SENDING   every row records, at the moment it is clicked, which view the user
             is leaving — the tab, the query, the three facets, how far they had
             paged, where the canvas was scrolled and which code they opened.
   RECEIVING on the render after a return it takes that packet back and rebuilds
             the same list: same filters, same page depth, same row under the
             cursor. Not "the transactions page" — THE view they left. */

const SURFACE = "neo:transactions";
const txHref = (code: string) => `/neo/transactions/${encodeURIComponent(code)}/`;

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

const COLS = [
  { k: "id", l: "קוד" },
  { k: "he", l: "שם" },
  { k: "mod", l: "מודול" },
  { k: "fiori", l: "יישום Fiori עוקב" },
  { k: "doc", l: "תיעוד" },
  { k: "s4", l: "S/4HANA" },
  { k: "act", l: "" },
];

/* --------------------------------------------------------------- matching
   Typo-tolerant, in the same three tiers the live centre uses: prefix beats an
   inner substring beats an in-order subsequence. Every token has to land, so a
   two-word query narrows instead of widening. */

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

/* -------------------------------------------------------------------- row */

function Row({ t, fav, onOpen, landed, st }: { t: RegistryTx; fav: boolean; onOpen: (code: string) => void; landed?: boolean; st?: string }) {
  const deep = t.depth === "deep";
  const intel = TX_INTEL[t.code];
  const fiori = intel?.fiori?.trim() || "";
  const f = facetsOf(t.code);
  const sub = [t.area, f.topics[0]].filter(Boolean).join(" · ");
  return (
    <li
      className="nxd-item"
      data-code={t.code}
      // SmartReturn landed here. data.css draws a ring that fades itself out,
      // so returning from a T-Code says which row it was.
      data-back={landed ? "1" : undefined}
      style={{ "--m": modVar(t.module) } as React.CSSProperties}
    >
      <Link
        href={txHref(t.code)}
        className="nxd-row"
        prefetch={false}
        onClick={() => onOpen(t.code)}
      >
        <span className="nxd-c" data-k="id"><b className="nx-sap">{t.code}</b></span>

        <span className="nxd-c" data-k="he">
          <span className="nxd-he"><Rtl s={t.he || t.en || "אין כותרת במאגר"} /></span>
          {t.en || sub ? (
            <span className="nxd-sub">
              {t.en && t.he ? <bdi dir="ltr" className="nxd-en">{t.en}</bdi> : null}
              {t.en && t.he && sub ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}
              {sub ? <Rtl s={sub} /> : null}
            </span>
          ) : null}
        </span>

        <Cell k="mod" l="מודול" sr="מודול ">
          <span className="nxd-mods">
            <span className="nxd-mod" style={{ "--m": modVar(t.module) } as React.CSSProperties} title={MOD_HE[t.module]}>{t.module}</span>
          </span>
        </Cell>

        {/* LESS METADATA ON THE ROW (design audit S7-CAT-2): the code, its
            meaning, where it is used and its S/4 standing. The Fiori successor
            stays because it is a door; the topic says "when". */}
        <Cell k="fiori" l="יישום Fiori עוקב" sr="יישום Fiori עוקב ">
          {fiori
            ? <span className="nxd-fiori"><Rtl s={fiori} /></span>
            : <><span className="nxd-nil" aria-hidden="true">–</span><span className="nx-sr">לא צוין במאגר</span></>}
        </Cell>

        <Cell k="doc" l="תיעוד" sr="רמת תיעוד ">
          <span className="nu-status" style={{ "--s": deep ? "var(--status-done)" : "var(--status-not-started)" } as React.CSSProperties}>
            {deep ? "מתועדת לעומק" : "מאומתת"}
          </span>
        </Cell>

        {/* The canonical S/4HANA standing — the same word, colour and glyph the
            code's page renders (design audit S5-2 / ACC-3). */}
        <Cell k="s4" l="S/4HANA" sr="S/4HANA ">
          {st ? <StatusPill status={st} /> : <><span className="nxd-nil" aria-hidden="true">–</span><span className="nx-sr">ללא סטטוס במאגר</span></>}
        </Cell>
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

export function TransactionsSurface({ status }: { status?: Record<string, string> }) {
  const reg = useMemo(() => txRegistry(), []);
  const all = useMemo(() => [...reg.values()], [reg]);
  const stats = useMemo(() => registryStats(), []);
  const popular = useMemo(() => txMostPopular(60), []);
  const facets = useMemo(() => presentFacets(all.map((t) => t.code)), [all]);
  const modules = useMemo(
    () => Object.keys(stats.byModule).sort((a, b) => stats.byModule[b] - stats.byModule[a]),
    [stats],
  );
  const deepBy = useMemo(() => {
    const out: Record<string, number> = {};
    for (const t of all) if (t.depth === "deep") out[t.module] = (out[t.module] || 0) + 1;
    return out;
  }, [all]);
  const withFiori = useMemo(() => all.filter((t) => !!TX_INTEL[t.code]?.fiori?.trim()).length, [all]);

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
  const [allMods, setAllMods] = useState(false);

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
      rows = rows
        .map((t) => ({ t, sc: fuzzyScore(`${t.code} ${t.area} ${t.he} ${t.en} ${t.module}`.toLowerCase(), s) }))
        .filter((x) => x.sc > 0)
        .sort((a, b) => b.sc - a.sc || txPopularity(b.t.code) - txPopularity(a.t.code))
        .map((x) => x.t);
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
  const onView = (v: View) => { setView(v); setLimit(PAGE); };

  // "Show more": the first new row takes the focus, so a keyboard reader lands
  // on what was just added instead of back at the button.
  const firstNew = useRef<number | null>(null);
  const showMore = () => { firstNew.current = shown.length; setLimit((n) => n + PAGE); };
  useEffect(() => {
    if (firstNew.current === null) return;
    const i = firstNew.current;
    firstNew.current = null;
    document.querySelectorAll<HTMLElement>(".nxd[data-surface='transactions'] .nxd-list > .nxd-item > .nxd-row")[i]?.focus();
  }, [limit]);

  /* ------------------------------------------------------- smart return */

  // Recreated every render on purpose, and deliberately NOT memoised: it has to
  // close over the values that are true right now, because "the view I left" is
  // only knowable at the moment of leaving.
  const onOpen = (code: string) => {
    // What to CALL this view in Hebrew. Only real, currently-applied narrowings
    // are named — an unfiltered list says nothing extra rather than inventing a
    // description of itself.
    const parts = [
      mod,
      topic,
      obj,
      fiori ? "עם יישום Fiori עוקב" : "",
      q.trim() ? `חיפוש "${q.trim()}"` : "",
      view === "all" ? "" : VIEWS.find((v) => v.v === view)?.he || "",
    ].filter(Boolean);
    const state: TxListState = {
      view, q, mod, topic, obj, fiori, more, limit,
      y: scrollOffset(),
      code,
    };
    rememberOrigin({
      to: txHref(code),
      href: "/neo/transactions/",
      label: "טרנזקציות SAP",
      detail: parts.join(" · "),
      surface: SURFACE,
      state,
    });
  };

  // The other half. The packet arrives on the first client render after a
  // return and is applied DURING that render — adjusting state to a changed
  // external value, which is the one place React sanctions a set during render.
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
  // wins over the raw offset. restoreScroll also runs in a hidden tab, which a
  // bare requestAnimationFrame does not.
  useEffect(() => {
    if (!back) return;
    return restoreScroll(Number(back.y) || 0, back.code ? `.nxd-item[data-code="${CSS.escape(back.code)}"]` : undefined);
  }, [back]);

  const surfaceMod = mod || undefined;

  const emptyCopy: Record<View, { t: string; h: string }> = {
    all: { t: "לא נמצאו טרנזקציות התואמות לסינון שנבחר", h: "החיפוש מכסה קוד טרנזקציה, שם עברי, שם אנגלי, אזור ומודול." },
    popular: { t: "לא נמצאו תוצאות בין הטרנזקציות הנפוצות", h: "רשימת הנפוצות נגזרת מספירת ההפניות בתוך המאגר." },
    deep: { t: "לא נמצאו תוצאות בין הטרנזקציות המתועדות לעומק", h: `${fmt(stats.deep)} טרנזקציות מתועדות לעומק בעמוד מלא.` },
    fav: { t: "אין מועדפים עדיין", h: "סימון \"מועדף\" בשורה או בעמוד הטרנזקציה מוסיף אותה לכאן. הרשימה נשמרת במכשיר זה." },
    recent: { t: "לא נצפו טרנזקציות עדיין", h: "כל טרנזקציה שנפתחה תופיע כאן. הרשימה נשמרת במכשיר זה." },
  };

  const tokens = [
    ...(mod ? [{ k: "mod", he: MOD_HE[mod] ? `${mod} · ${MOD_HE[mod]}` : mod, off: () => setMod("") }] : []),
    ...(topic ? [{ k: "topic", he: topic, off: () => setTopic("") }] : []),
    ...(obj ? [{ k: "obj", he: obj, off: () => setObj("") }] : []),
    ...(fiori ? [{ k: "fiori", he: "עם יישום Fiori עוקב", off: () => setFiori(false) }] : []),
    ...(q.trim() ? [{ k: "q", he: `«${q.trim()}»`, off: () => setQ("") }] : []),
  ];

  const MOD_TOP = 8;
  const modItems = modules.map((m) => ({
    id: m,
    label: <><bdi className="nx-sap">{m}</bdi>{MOD_HE[m] ? <span className="nxd-rank-he"> {MOD_HE[m]}</span> : null}</>,
    n: stats.byModule[m],
    part: deepBy[m] || 0,
    sub: <>{fmt(deepBy[m] || 0)} מתועדות לעומק</>,
    on: mod === m,
    onClick: () => { setMod(mod === m ? "" : m); setLimit(PAGE); },
  }));

  return (
    <div
      className="nxd nm-scene"
      data-scene="cream"
      data-surface="transactions"
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      {/* Where the user came from, when the session knows. With no memory it
          falls back to the NEO home, which is this page's real parent. */}
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<Terminal size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="קטלוג טרנזקציות · Transaction Catalog"
        title="טרנזקציות SAP"
        lede={
          <>
            {fmt(stats.total)} טרנזקציות SAP מאומתות מ-{fmt(modules.length)} מודולים בקטלוג אחד, מתוכן
            {" "}{fmt(stats.deep)} מתועדות לעומק ו-{fmt(stats.light)} רשומות אימות. כל שורה נפתחת לעמוד הטרנזקציה המלא.
          </>
        }
        facts={[
          { v: facets.topics.length, l: "נושאים מסווגים" },
          { v: facets.objects.length, l: "אובייקטים עסקיים" },
        ]}
      >
        <Ledger
          label="הקטלוג במספרים. כל מספר פותח את החתך שלו"
          items={[
            { v: stats.total, l: "טרנזקציות במאגר", on: view === "all" && !dirty, onClick: () => { reset(); onView("all"); } },
            { v: stats.deep, l: "מתועדות לעומק", on: view === "deep", onClick: () => onView(view === "deep" ? "all" : "deep") },
            { v: popular.length, l: "הנפוצות במאגר", on: view === "popular", onClick: () => onView(view === "popular" ? "all" : "popular") },
            { v: withFiori, l: "עם יישום Fiori עוקב", on: fiori, onClick: () => { setFiori((f) => !f); setLimit(PAGE); } },
            { v: modules.length, l: "מודולים", href: "#nxd-sig" },
          ]}
        />
      </CatalogHero>

      <Sig
        id="nxd-sig"
        icon={<SlidersHorizontal size={15} strokeWidth={1.75} />}
        title="הטרנזקציות לפי מודול"
        count={`${fmt(modules.length)} מודולים`}
        lede="אורך הפס הוא מספר הטרנזקציות, והחלק המודגש הוא המתועדות לעומק. לחיצה על מודול מסננת את הרשימה."
      >
        <RankList
          label="המודולים לפי מספר הטרנזקציות"
          cols
          items={allMods ? modItems : modItems.slice(0, MOD_TOP)}
        />
        {modItems.length > MOD_TOP ? (
          <button type="button" className="nu-btn2 nxd-sig-more" aria-expanded={allMods} onClick={() => setAllMods((o) => !o)}>
            {allMods ? "הצגת שמונת המודולים הגדולים בלבד" : <>הצגת כל {fmt(modItems.length)} המודולים</>}
          </button>
        ) : null}
      </Sig>

      <div className="nxd-tools nm-fade nm-once">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
            placeholder="קוד (IW31) · שם עברי · שם אנגלי · אזור"
            aria-label="חיפוש טרנזקציות"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <ViewTabs
          id="neo-tx-view"
          value={view}
          onChange={onView}
          options={VIEWS.map((x) => ({
            value: x.v, label: x.he,
            icon: x.v === "popular" ? <Flame size={15} aria-hidden="true" />
              : x.v === "deep" ? <Layers size={15} aria-hidden="true" />
              : x.v === "fav" ? <Star size={15} aria-hidden="true" />
              : x.v === "recent" ? <Clock size={15} aria-hidden="true" />
              : <Terminal size={15} aria-hidden="true" />,
            count: x.v === "fav" ? favs.length : x.v === "recent" ? recent.length : undefined,
          }))}
        />

        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => { setSort(e.target.value as Sort); setLimit(PAGE); }}>
            {SORTS.map((x) => <option key={x.s} value={x.s}>{x.he}</option>)}
          </select>
        </label>

        <div className="nxd-facet" role="group" aria-label="סינון לפי נושא ואובייקט">
          <button
            type="button"
            className="nu-btn2 nxd-more"
            aria-expanded={more || !!topic || !!obj}
            onClick={() => setMore((o) => !o)}
          >
            <SlidersHorizontal size={13} strokeWidth={1.75} />
            {more || topic || obj ? "פחות מסננים" : "נושא ואובייקט עסקי"}
            {topic || obj ? <b>{fmt([topic, obj].filter(Boolean).length)}</b> : null}
          </button>
        </div>

        {more || topic || obj ? (
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
      </div>

      <div className="nxd-count">
        <p>
          <b aria-live="polite">{fmt(list.length)}</b> תוצאות
          {view === "all" && !dirty ? <> מתוך {fmt(stats.total)}</> : null}
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

      <div className="nxd-results" data-cols="tx" id="neo-tx-view-panel" role="tabpanel" aria-labelledby={`neo-tx-view-${view}`}>
        {list.length === 0 ? (
          <div className="nxd-none">
            <p><b>{emptyCopy[view].t}</b></p>
            <p className="nx-muted">{emptyCopy[view].h}</p>
            <div className="nxd-none-a">
              {dirty ? <button type="button" className="nu-btn" onClick={reset}>ניקוי הסינון</button> : null}
              {view !== "all" ? <button type="button" className="nu-btn2" onClick={() => onView("all")}>הצגת כל הקטלוג</button> : null}
            </div>
          </div>
        ) : (
          <>
            <div className="nxd-table">
              <Cols cols={COLS} />
              <ul className="nxd-list">
                {shown.map((t) => <Row key={t.code} t={t} fav={favs.includes(t.code)} onOpen={onOpen} landed={t.code === back?.code} st={status?.[t.code]} />)}
              </ul>
            </div>
            {list.length > shown.length ? (
              <div className="nxd-page">
                <button type="button" className="nu-btn2" onClick={showMore}>
                  הצגת {fmt(Math.min(PAGE, list.length - shown.length))} נוספות
                  <span className="nxd-page-n">· נותרו {fmt(list.length - shown.length)}</span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <CatalogFoot>
        הקטלוג מאחד ארבעה מקורות מאומתים לרשימה אחת, ללא כפילויות. קוד ללא כותרת אנגלית במקור מוצג בלעדיה.
      </CatalogFoot>
    </div>
  );
}
