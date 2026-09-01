"use client";

// Project NEO · the PM / PP-PI workspace shell.
//
// Receives ONE plain object built on the server by workspace-data.ts. It owns
// no data of its own: every number it renders is either a value from that
// object or a sum taken over it in front of the user (the scope readout).
// Nothing here is authored, and nothing is fetched.
//
// THE SHAPE OF THE PAGE. The hero is the approved part and is untouched;
// everything below it was rebuilt as numbered CHAPTERS, because the client's
// objection — "hierarchy is weak, too many equal-weight elements, the page feels
// compressed, the user cannot clearly understand the next action" — is a
// hierarchy problem and not a spacing one. A chapter is a dominant unit: a
// number, a kicker, the biggest title below the hero, one sentence and one lead
// route. Nothing else on the page competes at that weight.
//
//   HERO .................. identity, lede, counts, three routes  (approved)
//   INDEX ................. every chapter, with its real count, as a route
//   01  מפת המודול ........ topics · process · object classes, tabbed
//   02  המעבר ל-S/4HANA ... risk mix · what moves · the blueprint's verdict ·
//                           the Simplification list · the SAP references
//   03  מילון הנתונים ..... the working table
//   04  טרנזקציות ודוחות .. ranked codes + the blueprint's own directory
//   05  קשרים ומודל נתונים  cardinality mix + the busiest tables
//   06  ממשקים · CDS · Fiori every interface object, view and app, by name
//   07  קונפיגורציה וכלים . the remaining verbatim blueprint sheets
//   08  ידע ופעילות ....... books · academy · recent activity
//
// S/4HANA MOVED UP. It used to sit fifth, below the table, as a comparison
// footnote. The brief makes it the primary forward context, so it is now the
// chapter directly under the map — read before the dictionary, not after it.
//
// COMPLETENESS. Chapters 04, 06 and 07 are new surfaces for data the blueprints
// always carried and the workspace never showed: the transaction and report
// directory, the implementer toolkit, the PP-vs-PP-PI comparison, the SPRO
// configuration guide, the 46-row custom-code check, and every interface object,
// CDS view and Fiori app by name. The rail correctly stopped carrying the
// module's sub-tree; this is where that completeness lives instead.
//
// A CHAPTER WITH NO DATA IS NOT RENDERED and does not consume a number. PM and
// PP-PI therefore get different chapter counts, because their blueprints are
// different documents — which is the honest outcome, not a defect.
//
// THE CONTROL SURFACE. The rail above the table carries three things — search,
// one filter disclosure, one clear — because the two BIG scopes (topic and
// object class) are driven from the map chapter, where they are legible.

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, Table2, X } from "lucide-react";
import {
  SmartReturn, consumeReturn, restoreScroll, scrollOffset, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import type { Zone } from "@/lib/studio-graph";
import type { S4Class, WsData, WsRow } from "./workspace-data";
import { WorkspaceOriginProvider, type WsOrigin } from "./workspace-origin";
import { Chapter, type ChapterMeta } from "./workspace-chapter";
import { BUILD_KEYS, WorkspaceBuild } from "./workspace-build";
import { WorkspaceContext } from "./workspace-context";
import { WorkspaceHero } from "./workspace-header";
import { WorkspaceIface } from "./workspace-iface";
import { WorkspaceIndex } from "./workspace-index";
import { WorkspaceLearn } from "./workspace-learn";
import { WorkspaceMap, type MapView } from "./workspace-map";
import { WorkspaceOps } from "./workspace-ops";
import { WorkspaceS4 } from "./workspace-s4";
import { WorkspaceTable, type SortKey } from "./workspace-table";
import { s4He, s4Dot, s4CountOf, S4_ORDER } from "@/lib/s4-class";

/** Every verdict the dataset can hold, plus the honest "no verdict" bucket. */
const S4_FILTERS: (S4Class | null)[] = [...S4_ORDER, null];
import { SectionNav } from "./section-nav";

const nf = new Intl.NumberFormat("he-IL");

/* --------------------------------------------------------------- returning

   SMART RETURN, both halves (components/neo-shell/nav-context).

   SENDING    every link that leaves the workspace for an object page records,
              at the moment it is clicked, the view being left: which reading of
              the map was open, which topic was scoping the working table, what
              was typed into it, where the canvas was scrolled and which table
              was opened. The record is built by ONE function published through
              workspace-origin.tsx, so the hero, the process chain, the table,
              the S/4 callouts, the hub list and the recent list cannot describe
              the same view differently.
   RECEIVING  on the render after a return the packet is taken back and the same
              view is rebuilt — tab, topic, query — and then the row the reader
              left is put back under the eye.

   Everything live is read at CLICK time and not at render time: a scroll offset
   captured during render is the offset before the reader scrolled. */

const SURFACE = "neo:workspace";

/** A type alias and not an interface: only an alias picks up the implicit index
 *  signature that lets it satisfy the module's OriginState contract. */
type WsBack = {
  tab: string;
  /** The topic INDEX that was scoping the table, or null for the whole module. */
  topic: number | null;
  q: string;
  y: number;
  /** The table that was opened — the record the return scrolls back to. */
  name: string;
};

/** The workspace route per module. Both are real generated pages. */
const HOME: Record<string, string> = { PM: "/neo/pm/", "PP-PI": "/neo/pp-pi/" };

/** THE GROUND CARRIES THE MODULE. app/neo/ground.css defines exactly five
 *  scenes, two of which exist for precisely this: entering PM must not look
 *  like entering PP-PI, and the thing that says so is the ground the whole page
 *  stands on rather than a small coloured chip somewhere in the chrome. */
const SCENE: Record<string, "pm" | "pppi"> = { PM: "pm", "PP-PI": "pppi" };

const SORTS: { k: SortKey; he: string }[] = [
  { k: "f", he: "שדות" },
  { k: "rel", he: "קשרים" },
  { k: "tc", he: "טרנזקציות" },
  { k: "fn", he: "ממשקים" },
  { k: "tp", he: "נושא" },
  { k: "n", he: "שם" },
];

export function ModuleWorkspace({ data }: { data: WsData }) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<number | null>(null);
  const [zone, setZone] = useState<Zone | null>(null);
  // `undefined` = no filter. `null` = filter ON the undecided bucket.
  const [s4, setS4] = useState<S4Class | null | undefined>(undefined);
  const [sharedOnly, setSharedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("f");
  const [dir, setDir] = useState<1 | -1>(-1);
  const [panel, setPanel] = useState(false);
  // The map's reading (topics · process · object classes) lives here rather
  // than inside WorkspaceMap, because it is part of "the view I was in" and a
  // return has to be able to put it back.
  const [tab, setTab] = useState<MapView>("topics");

  const rows = useMemo(() => {
    const needle = q.trim().toUpperCase();
    const out = data.rows.filter((r) => {
      if (topic !== null && r.tp !== topic) return false;
      if (zone && r.z !== zone) return false;
      if (s4 !== undefined && r.s4 !== s4) return false;
      if (sharedOnly && !r.shared) return false;
      if (!needle) return true;
      return (
        r.n.toUpperCase().includes(needle) ||
        r.he.includes(q.trim()) ||
        r.en.toUpperCase().includes(needle) ||
        r.tc.some((c) => c.includes(needle)) ||
        r.funcs.some((f) => f.n.toUpperCase().includes(needle))
      );
    });
    const val = (r: WsRow): number | string => {
      switch (sort) {
        case "n": return r.n;
        case "tp": return r.tp;
        case "rel": return r.rel;
        case "tc": return r.tc.length;
        case "fn": return r.fnEntries;
        default: return r.f;
      }
    };
    return [...out].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      const c = typeof x === "string" ? x.localeCompare(y as string) : (x as number) - (y as number);
      return c !== 0 ? c * dir : a.n.localeCompare(b.n);
    });
  }, [data.rows, q, topic, zone, s4, sharedOnly, sort, dir]);

  // The scope readout is summed over the CURRENT result set, in front of the
  // user. It is the one place in the workspace where a number is computed on
  // the client — and it is computed from the same rows on screen.
  const scope = useMemo(() => {
    const names = new Set(rows.map((r) => r.n));
    const topics = new Set(rows.map((r) => r.tp));
    return {
      rows: rows.length,
      tables: names.size,
      fields: rows.reduce((a, r) => a + r.f, 0),
      topics: topics.size,
    };
  }, [rows]);

  const topicTitle = topic === null ? null : data.topics.find((t) => t.idx === topic)?.title ?? null;
  const zoneTitle = zone === null ? null : data.zones.find((z) => z.id === zone)?.he ?? null;

  // Named, so the rail can show WHICH scopes are on rather than only that some
  // are. Each one is a .nu-chip: a value, not a control — every one of them is
  // switched off where it was switched on.
  const active: string[] = [
    topicTitle ? `נושא · ${topicTitle}` : null,
    zoneTitle ? `מחלקה · ${zoneTitle}` : null,
    s4 !== undefined ? `S/4HANA · ${s4He(s4)}` : null,
    sharedOnly ? `משותפות עם ${data.key === "PM" ? "PP-PI" : "PM"}` : null,
    q.trim() ? `חיפוש · ${q.trim()}` : null,
  ].filter((x): x is string => !!x);

  /** One sort control, two surfaces: the column headers on a wide canvas and
   *  the chip row inside the filter panel on a touch canvas. Picking the
   *  active key flips direction. */
  const pickSort = (k: SortKey) => {
    if (sort === k) setDir((v) => (v === 1 ? -1 : 1));
    else {
      setSort(k);
      setDir(k === "n" ? 1 : -1);
    }
  };

  const clear = () => {
    setQ("");
    setTopic(null);
    setZone(null);
    setS4(undefined);
    setSharedOnly(false);
  };

  /* ------------------------------------------------------- smart return */

  // Rebuilt every render on purpose, and deliberately NOT memoised: it has to
  // close over the values that are true right now. <OriginLink/> calls it at
  // CLICK time, so the query, the tab and the scroll offset it reads are the
  // ones at the moment of leaving.
  const makeOrigin: WsOrigin = (name) => ({
    href: HOME[data.key] || "/neo/",
    label: data.key,
    // The scope the reader chose when there is one; otherwise the topic the
    // blueprint documents the opened table under. Both are titles the source
    // workbook wrote — nothing here is a description of the page invented on
    // its behalf.
    detail:
      topicTitle ||
      data.topics.find((t) => t.idx === data.rows.find((r) => r.n === name)?.tp)?.title ||
      "",
    surface: SURFACE,
    state: { tab, topic, q, y: scrollOffset(), name },
  });

  // The other half. The packet arrives on the first client render after a
  // return and is applied DURING that render — adjusting state to a changed
  // external value, which is the one place React sanctions a set during render.
  // An effect instead would be a cascading render, and the reader would watch
  // the workspace rebuild itself out of the wrong view first.
  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<WsBack | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as WsBack;
    setBack(s);
    setTab(s.tab === "flow" || s.tab === "classes" ? s.tab : "topics");
    setTopic(typeof s.topic === "number" ? s.topic : null);
    setQ(typeof s.q === "string" ? s.q : "");
  }
  // Spend the packet. A write to an external store and nothing else.
  useEffect(() => {
    if (packet) consumeReturn(SURFACE);
  }, [packet]);

  // The viewport is a second step on purpose: the row can only be scrolled to
  // once the restored topic and query have actually rendered it. The ROW wins
  // over the raw offset — a table that re-rendered at a different density has
  // moved every pixel, but the row the reader opened is still that row.
  useEffect(() => {
    if (!back) return;
    return restoreScroll(
      Number(back.y) || 0,
      back.name ? `.nw-row[data-name="${CSS.escape(back.name)}"]` : undefined,
    );
  }, [back]);

  // THE CHAPTER PLAN. Built here, once, from the server object — so the index
  // band, the anchors and the numbering can never drift from what is actually
  // rendered. A chapter with nothing behind it is not planned, does not get a
  // number and does not appear in the index; the numbers stay contiguous
  // because they are assigned after the empty ones are dropped.
  const { chapters, ch } = useMemo(() => {
    const buildRows = data.sheets
      .filter((s) => BUILD_KEYS.includes(s.key))
      .reduce((a, s) => a + s.rows.length, 0);

    const plan: (Omit<ChapterMeta, "n"> & { key: string })[] = [
      { key: "map", id: "nw-map", kicker: "מפת המודול", title: "מפת המודול: נושאים, תהליך עסקי ומחלקות אובייקט", count: data.counts.topics, countLabel: "נושאים" },
      // The one chapter the page is really for. It is marked here, once, and the
      // running bar reads the flag — nothing about S/4HANA is hard-coded into a
      // component that five other screens also use.
      { key: "s4", id: "nw-s4", kicker: "המעבר ל-S/4HANA", title: "מה משתנה במודול במעבר ל-S/4HANA", count: data.s4x.changed.length, countLabel: "טבלאות משתנות", feature: true },
      { key: "tbl", id: "nw-tbl", kicker: "קטלוג טבלאות SAP", title: "טבלאות SAP של המודול", count: data.counts.rows, countLabel: "רשומות תיעוד" },
      { key: "ops", id: "nw-ops", kicker: "טרנזקציות ודוחות", title: "הטרנזקציות שהתיעוד קושר למודול", count: data.counts.tcodes, countLabel: "טרנזקציות" },
      { key: "rel", id: "nw-rel", kicker: "קשרים ומודל הנתונים", title: "קשרי הנתונים של המודול עם שאר המערכת", count: data.rel.edges, countLabel: "קשרים ממודלים" },
      { key: "iface", id: "nw-if", kicker: "ממשקים · CDS · Fiori", title: "ממשקים, תצוגות CDS ויישומי Fiori של המודול", count: data.counts.funcEntries, countLabel: "רשומות ממשק" },
      ...(buildRows
        ? [{ key: "build", id: "nw-build", kicker: "קונפיגורציה וכלים", title: "קונפיגורציה, קוד מותאם וכלי יישום", count: buildRows, countLabel: "רשומות בגיליונות" }]
        : []),
      { key: "learn", id: "nw-learn", kicker: "ידע ופעילות", title: "ספרים, קורסים ופעילות אחרונה", count: data.books.length + data.courses.length, countLabel: "ספרים וקורסים" },
    ];

    // Every chapter stands on the module's own scene. It costs nothing visually
    // — the page root already wears that ground — and it is what lets the shell
    // observer hand the ground BACK after the S/4HANA band has taken `deep`.
    const numbered: ChapterMeta[] = plan.map((p, i) => ({ ...p, n: i + 1, scene: SCENE[data.key] }));
    const by = Object.fromEntries(plan.map((p, i) => [p.key, numbered[i]])) as Record<string, ChapterMeta>;
    return { chapters: numbered, ch: by };
  }, [data]);

  // Two sticky layers, one edge. The rail sticks to the top of the scroller and
  // the table head has to stick UNDER it, so the rail's real height is
  // published as a custom property instead of being guessed per breakpoint —
  // the rail wraps differently at every canvas width, and the filter panel
  // changes its height on demand. Written straight to the node: this is a
  // measurement, not application state, and routing it through useState would
  // re-render the whole table on a resize.
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const r = root.current;
    const b = rail.current;
    if (!r || !b || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => r.style.setProperty("--nw-railh", `${b.offsetHeight}px`));
    ro.observe(b);
    return () => ro.disconnect();
  }, []);

  // The page itself, unchanged. It is handed to the origin provider below
  // rather than being wrapped in place, so adopting Smart Return costs the
  // workspace's markup no indentation and no restructuring.
  const body = (
    <div
      className="nw"
      data-mod={data.key}
      // MODULE IDENTITY IS THE GROUND. Everything under this node inherits the
      // scene's ink, hairline and accent, so entering PM and entering PP-PI are
      // two different places rather than the same place with a different badge.
      data-scene={SCENE[data.key]}
      ref={root}
      style={{ "--m": data.m } as React.CSSProperties}
    >
      <div className="nw-light nm-par" aria-hidden="true">
        <i className="nw-light-a" />
        <i className="nw-light-b" />
      </div>

      {/* Where the reader came from, when the session knows — the rail, the
          ERD, a search, an object page. With no memory it falls back to the NEO
          home, which is this page's real parent. Never dead, never blank. */}
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <WorkspaceHero d={data} />

      <WorkspaceIndex chapters={chapters} />

      {/* The running index. The band above is the full picture, read once; this
          is the same list kept under the eye, so moving from chapter 02 to
          chapter 03 never costs a trip back to the top of the page. Both are
          built from `chapters`, so neither can drift from what is rendered. */}
      <SectionNav
        label="פרקי המודול"
        topLabel="חזרה לראש העמוד"
        sections={chapters.map((c) => ({ id: c.id, label: c.kicker, feature: c.feature }))}
      />

      <WorkspaceMap
        d={data}
        meta={ch.map}
        topic={topic}
        zone={zone}
        view={tab}
        onView={setTab}
        onTopic={(t) => setTopic((cur) => (cur === t ? null : t))}
        onZone={(z) => setZone((cur) => (cur === z ? null : z))}
      />

      <WorkspaceS4 d={data} meta={ch.s4} />

      {/* ================================================= the working table */}
      <Chapter
        meta={ch.tbl}
        wide
        icon={<Table2 size={17} strokeWidth={1.75} />}
        lede={
          <>
            {nf.format(data.counts.rows)} רשומות תיעוד על {nf.format(data.counts.tables)} טבלאות ייחודיות,{" "}
            {nf.format(data.counts.fields)} שדות מתועדים. שם הטבלה פותח את עמוד האובייקט המלא; החץ בסוף
            השורה פותח את פירוט הרשומה כאן, באותו עמוד.
          </>
        }
      >
        <div className="nw-rail" ref={rail}>
          <div className="nw-railtop">
            <label className="nw-find">
              <Search size={15} strokeWidth={1.75} aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="חיפוש בטבלה · שם, תיאור, T-Code, ממשק"
                aria-label="חיפוש בטבלת העבודה"
                dir="auto"
              />
            </label>

            <button
              type="button"
              className="nu-filter"
              aria-expanded={panel}
              aria-controls="nw-panel"
              data-on={panel ? "1" : undefined}
              onClick={() => setPanel((v) => !v)}
            >
              <SlidersHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
              סינון ומיון
            </button>

            {active.length ? (
              <button type="button" className="nu-btn2" onClick={clear}>
                <X size={14} strokeWidth={1.75} aria-hidden="true" />
                איפוס הסינון
              </button>
            ) : null}
          </div>

          <p className="nw-scope">
            <b className="nw-sap">{nf.format(scope.rows)}</b>
            <span>
              רשומות תיעוד · <b className="nw-sap">{nf.format(scope.tables)}</b> טבלאות ·{" "}
              <b className="nw-sap">{nf.format(scope.fields)}</b> שדות ·{" "}
              <b className="nw-sap">{nf.format(scope.topics)}</b> נושאים
            </span>
            {active.length ? (
              active.map((a) => (
                <span key={a} className="nu-chip">
                  {a}
                </span>
              ))
            ) : (
              <span className="nw-scope-all">ללא סינון: כל טבלאות המודול</span>
            )}
          </p>

          {panel ? (
            <div className="nw-panel" id="nw-panel">
              <div className="nw-fgroup" role="group" aria-label="מצב ב-S/4HANA">
                <span className="nw-fk">מצב ב-S/4HANA</span>
                {S4_FILTERS.map((k) => {
                  const n = s4CountOf(data.s4, k);
                  return (
                    <button
                      key={k}
                      type="button"
                      className="nu-card nw-frow nm-sel"
                      data-on={s4 === k ? "1" : undefined}
                      aria-pressed={s4 === k}
                      disabled={n === 0}
                      onClick={() => setS4((c) => (c === k ? undefined : k))}
                    >
                      {/* STATUS colour appears only as a small filled dot
                          immediately followed by its own word. */}
                      <span className="nu-status" style={{ "--s": s4Dot(k) } as React.CSSProperties}>
                        {s4He(k)}
                      </span>
                      <em className="nw-sap">{nf.format(n)}</em>
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="nu-card nw-frow nm-sel"
                  data-on={sharedOnly ? "1" : undefined}
                  aria-pressed={sharedOnly}
                  onClick={() => setSharedOnly((v) => !v)}
                >
                  <span>משותפות עם {data.key === "PM" ? "PP-PI" : "PM"}</span>
                  <em className="nw-sap">{nf.format(data.counts.shared)}</em>
                </button>
              </div>

              {/* The touch canvas has no column headers to sort from, so the
                  sort keys live here. On a wide canvas this group is hidden by
                  CSS: a second sort surface next to a sortable header is
                  exactly the duplicated control the client objected to. */}
              <div className="nw-fgroup nw-fgroup--sort" role="group" aria-label="מיון">
                <span className="nw-fk">מיון</span>
                {SORTS.map((s) => (
                  <button
                    key={s.k}
                    type="button"
                    className="nu-filter"
                    data-on={sort === s.k ? "1" : undefined}
                    aria-pressed={sort === s.k}
                    onClick={() => pickSort(s.k)}
                  >
                    {s.he}
                    {sort === s.k ? <em className="nw-sap">{dir === -1 ? "↓" : "↑"}</em> : null}
                  </button>
                ))}
              </div>

              <p className="nw-fine">
                סינון לפי נושא או לפי מחלקת אובייקט נעשה במפת המודול שלמעלה.
              </p>
            </div>
          ) : null}
        </div>

        <WorkspaceTable
          rows={rows}
          topics={data.topics}
          total={data.rows.length}
          onClear={clear}
          sort={sort}
          dir={dir}
          onSort={pickSort}
        />
      </Chapter>

      <WorkspaceOps d={data} meta={ch.ops} />
      <WorkspaceContext d={data} meta={ch.rel} />
      <WorkspaceIface d={data} meta={ch.iface} />
      {ch.build ? <WorkspaceBuild d={data} meta={ch.build} /> : null}
      <WorkspaceLearn d={data} meta={ch.learn} />

      <p className="nw-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );

  return <WorkspaceOriginProvider value={makeOrigin}>{body}</WorkspaceOriginProvider>;
}
