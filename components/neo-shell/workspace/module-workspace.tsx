"use client";

// Project NEO · the PM / PP-PI workspace shell.
//
// Receives ONE plain object built on the server by workspace-data.ts. It owns
// no data of its own: every number it renders is either a value from that
// object or a sum taken over it in front of the user (the scope readout).
// Nothing here is authored, and nothing is fetched.
//
// THE SHAPE OF THE PAGE, and it is the same shape in both modules so that
// switching between them feels like the same room with different light:
//
//   1  HERO ............... identity, the lede, the counts, and three routes
//   2  מפת המודול ......... key topics · business process · core objects,
//                           as three views of ONE block
//   3  טבלאות הליבה ....... the working table — the centre of gravity
//   4  מהמודול החוצה ...... transactions · relationships · the data model
//   5  מעבר ל-S/4HANA ..... the verdict split and what needs attention
//   6  ידע ופעילות ........ books / academy · recent activity
//
// The previous version put four instruments and a three-card context column
// between the hero and the table. That is the density the client rejected.
// Everything is still here — it is grouped, and the detail opens on demand.
//
// THE CONTROL SURFACE. The rail above the table used to carry roughly twenty
// controls at once: search, six sort chips, one chip per object class, three
// verdict chips and a shared toggle. It now carries three things — search, one
// filter disclosure, one clear — because the two BIG scopes (topic and object
// class) are now driven from the map block, where they are legible.

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, Table2, X } from "lucide-react";
import type { Zone } from "@/lib/studio-graph";
import type { S4Class, WsData, WsRow } from "./workspace-data";
import { WorkspaceContext } from "./workspace-context";
import { WorkspaceHero } from "./workspace-header";
import { WorkspaceLearn } from "./workspace-learn";
import { WorkspaceMap } from "./workspace-map";
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

      <WorkspaceMap
        d={data}
        topic={topic}
        zone={zone}
        onTopic={(t) => setTopic((cur) => (cur === t ? null : t))}
        onZone={(z) => setZone((cur) => (cur === z ? null : z))}
      />

      {/* ============================================== 3 · the working table */}
      <section className="nw-block nw-block--work" aria-labelledby="nw-tbl-h">
        <div className="nw-block-h">
          <p className="nw-block-k">
            <Table2 size={14} strokeWidth={1.75} aria-hidden="true" />
            טבלאות הליבה
          </p>
          <h2 className="nw-block-t" id="nw-tbl-h">מילון הנתונים של המודול</h2>
          <p className="nw-block-s">
            {nf.format(data.counts.rows)} שורות מילון על {nf.format(data.counts.tables)} טבלאות ייחודיות. שם של
            טבלה פותח את עמוד האובייקט המלא שלה; החץ בסוף השורה פותח את התיעוד שלה כאן, בלי לעזוב את העמוד.
          </p>
        </div>

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
      </section>

      <WorkspaceContext d={data} />
      <WorkspaceS4 d={data} />
      <WorkspaceLearn d={data} />

      <p className="nw-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}
