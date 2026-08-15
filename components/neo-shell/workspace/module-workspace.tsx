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
import type { Zone } from "@/lib/studio-graph";
import type { S4Class, WsData, WsRow } from "./workspace-data";
import { Chapter, type ChapterMeta } from "./workspace-chapter";
import { BUILD_KEYS, WorkspaceBuild } from "./workspace-build";
import { WorkspaceContext } from "./workspace-context";
import { WorkspaceHero } from "./workspace-header";
import { WorkspaceIface } from "./workspace-iface";
import { WorkspaceIndex } from "./workspace-index";
import { WorkspaceLearn } from "./workspace-learn";
import { WorkspaceMap } from "./workspace-map";
import { WorkspaceOps } from "./workspace-ops";
import { WorkspaceS4 } from "./workspace-s4";
import { WorkspaceTable, S4_HE, s4Dot, type SortKey } from "./workspace-table";

const nf = new Intl.NumberFormat("he-IL");

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
  const [s4, setS4] = useState<S4Class | null>(null);
  const [sharedOnly, setSharedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("f");
  const [dir, setDir] = useState<1 | -1>(-1);
  const [panel, setPanel] = useState(false);

  const rows = useMemo(() => {
    const needle = q.trim().toUpperCase();
    const out = data.rows.filter((r) => {
      if (topic !== null && r.tp !== topic) return false;
      if (zone && r.z !== zone) return false;
      if (s4 !== null && r.s4 !== s4) return false;
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
    s4 !== null ? `S/4HANA · ${S4_HE[s4]}` : null,
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
    setS4(null);
    setSharedOnly(false);
  };

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
      { key: "map", id: "nw-map", kicker: "מפת המודול", title: "שלוש דרכים להיכנס לאותו מילון", count: data.counts.topics, countLabel: "נושאים" },
      { key: "s4", id: "nw-s4", kicker: "המעבר ל-S/4HANA", title: "מה משתנה במודול במעבר ל-S/4HANA", count: data.s4x.changed.length, countLabel: "טבלאות משתנות" },
      { key: "tbl", id: "nw-tbl", kicker: "מילון הנתונים", title: "טבלאות הליבה של המודול", count: data.counts.rows, countLabel: "שורות מילון" },
      { key: "ops", id: "nw-ops", kicker: "טרנזקציות ודוחות", title: "איך עובדים במודול בפועל", count: data.counts.tcodes, countLabel: "טרנזקציות" },
      { key: "rel", id: "nw-rel", kicker: "קשרים ומודל הנתונים", title: "איפה המודול נוגע בשאר המערכת", count: data.rel.edges, countLabel: "קשרים ממודלים" },
      { key: "iface", id: "nw-if", kicker: "ממשקים · CDS · Fiori", title: "מה מדבר עם המודול", count: data.counts.funcEntries, countLabel: "רשומות ממשק" },
      ...(buildRows
        ? [{ key: "build", id: "nw-build", kicker: "קונפיגורציה וכלים", title: "מה המיישם נוגע בו", count: buildRows, countLabel: "רשומות בגיליונות" }]
        : []),
      { key: "learn", id: "nw-learn", kicker: "ידע ופעילות", title: "מה ללמוד הלאה, ואיפה הייתם", count: data.books.length + data.courses.length, countLabel: "ספרים וקורסים" },
    ];

    const numbered: ChapterMeta[] = plan.map((p, i) => ({ ...p, n: i + 1 }));
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

  return (
    <div className="nw" data-mod={data.key} ref={root} style={{ "--m": data.m } as React.CSSProperties}>
      <div className="nw-light" aria-hidden="true">
        <i className="nw-light-a" />
        <i className="nw-light-b" />
      </div>

      <WorkspaceHero d={data} />

      <WorkspaceIndex chapters={chapters} />

      <WorkspaceMap
        d={data}
        meta={ch.map}
        topic={topic}
        zone={zone}
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
            {nf.format(data.counts.rows)} שורות מילון על {nf.format(data.counts.tables)} טבלאות ייחודיות,{" "}
            {nf.format(data.counts.fields)} שדות מתועדים. שם של טבלה פותח את עמוד האובייקט המלא שלה; החץ
            בסוף השורה פותח את התיעוד שלה כאן, בלי לעזוב את העמוד.
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
                נקה הכול
              </button>
            ) : null}
          </div>

          <p className="nw-scope">
            <b className="nw-sap">{nf.format(scope.rows)}</b>
            <span>
              שורות מילון · <b className="nw-sap">{nf.format(scope.tables)}</b> טבלאות ·{" "}
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
              <span className="nw-scope-all">ללא סינון — כל המילון של המודול</span>
            )}
          </p>

          {panel ? (
            <div className="nw-panel" id="nw-panel">
              <div className="nw-fgroup" role="group" aria-label="מצב ב-S/4HANA">
                <span className="nw-fk">מצב ב-S/4HANA</span>
                {([0, 1, 2] as S4Class[]).map((k) => {
                  const n = k === 0 ? data.s4.kept : k === 1 ? data.s4.replaced : data.s4.removed;
                  return (
                    <button
                      key={k}
                      type="button"
                      className="nu-card nw-frow"
                      data-on={s4 === k ? "1" : undefined}
                      aria-pressed={s4 === k}
                      disabled={n === 0}
                      onClick={() => setS4((c) => (c === k ? null : k))}
                    >
                      {/* STATUS colour appears only as a small filled dot
                          immediately followed by its own word. */}
                      <span className="nu-status" style={{ "--s": s4Dot(k) } as React.CSSProperties}>
                        {S4_HE[k]}
                      </span>
                      <em className="nw-sap">{nf.format(n)}</em>
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="nu-card nw-frow"
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
                נושא ומחלקת אובייקט נבחרים במפת המודול שמעל, כדי שהבחירה תיעשה מול המספרים ולא מול רשימת
                תוויות.
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

      <p className="nw-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}
