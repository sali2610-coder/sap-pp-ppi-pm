"use client";

// Project NEO · Stage 2B — the PM / PP-PI workspace shell.
//
// Receives ONE plain object built on the server by workspace-data.ts. It owns
// no data of its own: every number it renders is either a value from that
// object or a sum taken over it in front of the user (the scope rail). Nothing
// here is authored, and nothing is fetched.
//
// The header FRAMES the working table — it is a masthead band, not a grid of
// cards. The table below it is the centre of gravity and keeps the full width.

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { Zone } from "@/lib/studio-graph";
import type { S4Class, WsData, WsRow } from "./workspace-data";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceTable, S4_HE, type SortKey } from "./workspace-table";

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

  const filtered = topic !== null || !!zone || s4 !== null || sharedOnly || !!q.trim();
  const topicTitle = topic === null ? null : data.topics.find((t) => t.idx === topic)?.title ?? null;

  /** One sort control, two surfaces: the column headers on a wide canvas and
   *  the chip row on a touch canvas. Picking the active key flips direction. */
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

  // Two sticky layers, one edge. The scope rail sticks to the top of the
  // scroller and the table head has to stick UNDER it, so the rail's real
  // height is published as a custom property instead of being guessed per
  // breakpoint — the rail wraps differently at every canvas width. Written
  // straight to the node: this is a measurement, not application state, and
  // routing it through useState would re-render the whole table on a resize.
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

      <WorkspaceHeader d={data} topic={topic} onTopic={(t) => setTopic((cur) => (cur === t ? null : t))} />

      <section className="nw-work" aria-label="טבלת העבודה של המודול">
        <div className="nw-rail" ref={rail}>
          <div className="nw-scope">
            <span className="nw-scope-k">היקף נוכחי</span>
            <b className="nw-sap">{nf.format(scope.rows)}</b>
            <span className="nw-scope-l">
              שורות מילון · <b className="nw-sap">{nf.format(scope.tables)}</b> טבלאות ·{" "}
              <b className="nw-sap">{nf.format(scope.fields)}</b> שדות ·{" "}
              <b className="nw-sap">{nf.format(scope.topics)}</b> נושאים
            </span>
            {topicTitle ? <span className="nw-scope-t">{topicTitle}</span> : null}
            {filtered ? (
              <button type="button" className="nw-clear" onClick={clear}>
                <X size={13} strokeWidth={1.75} aria-hidden="true" />
                נקה סינון
              </button>
            ) : (
              <span className="nw-scope-all">ללא סינון — כל המילון של המודול</span>
            )}
          </div>

          <div className="nw-tools">
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

            <div className="nw-sortset" role="group" aria-label="מיון">
              <span className="nw-tools-k">מיון</span>
              {SORTS.map((s) => (
                <button
                  key={s.k}
                  type="button"
                  className="nw-chip"
                  data-on={sort === s.k ? "1" : undefined}
                  aria-pressed={sort === s.k}
                  onClick={() => pickSort(s.k)}
                >
                  {s.he}
                  {sort === s.k ? <em className="nw-sap">{dir === -1 ? "↓" : "↑"}</em> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="nw-filters">
            <div className="nw-filterset" role="group" aria-label="מחלקת אובייקט">
              <span className="nw-tools-k">מחלקה</span>
              {data.zones.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  className="nw-chip nw-chip--obj"
                  style={{ "--o": z.obj } as React.CSSProperties}
                  data-on={zone === z.id ? "1" : undefined}
                  aria-pressed={zone === z.id}
                  onClick={() => setZone((c) => (c === z.id ? null : z.id))}
                >
                  <i aria-hidden="true" />
                  {z.he}
                  <em className="nw-sap">{z.n}</em>
                </button>
              ))}
            </div>

            <div className="nw-filterset" role="group" aria-label="מצב ב-S/4HANA">
              <span className="nw-tools-k">S/4HANA</span>
              {([0, 1, 2] as S4Class[]).map((k) => {
                const n = k === 0 ? data.s4.kept : k === 1 ? data.s4.replaced : data.s4.removed;
                return (
                  <button
                    key={k}
                    type="button"
                    className="nw-chip nw-chip--st"
                    data-k={k}
                    data-on={s4 === k ? "1" : undefined}
                    aria-pressed={s4 === k}
                    disabled={n === 0}
                    onClick={() => setS4((c) => (c === k ? null : k))}
                  >
                    {/* STATUS colour appears only as a small filled dot immediately
                        followed by its own word label — never as a surface or ring. */}
                    <i aria-hidden="true" />
                    {S4_HE[k]}
                    <em className="nw-sap">{n}</em>
                  </button>
                );
              })}
              <button
                type="button"
                className="nw-chip"
                data-on={sharedOnly ? "1" : undefined}
                aria-pressed={sharedOnly}
                onClick={() => setSharedOnly((v) => !v)}
              >
                משותפות עם {data.key === "PM" ? "PP-PI" : "PM"}
                <em className="nw-sap">{data.counts.shared}</em>
              </button>
            </div>
          </div>
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

      <p className="nw-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}
