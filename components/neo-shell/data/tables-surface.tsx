"use client";

// Project NEO · /neo/tables — the dictionary, carried into the NEO shell.
//
// WHAT THIS IS NOT: a second, thinner copy of the live explorer. The live page
// (app/tables/page.tsx + components/tables-explorer.tsx) already answers three
// questions well — which tables exist, which module owns them, and how heavily
// connected each one is — and its data layer is imported unchanged by
// tables-data.ts. This surface keeps those three answers and adds the ones the
// blueprint already contains and the live table drops: key-field counts, the
// real transaction list, the ER cardinality, the CDS view and the S/4 standing.
//
// THE SHAPE (2026-10), shared by the seven Reference catalogs through
// catalog-kit.tsx: a hero on the scene's ground whose ledger counts are the
// filters themselves, one signature band (here: the eight object classes, each
// a filter), the search and view bar, and the tables as ALIGNED ROWS under a
// column head, the PM working table's density. Each row is still one link to
// the table's page, and becomes a card when the width cannot hold the columns.
//
// CONTROL LANGUAGE (app/neo/ui.css)
//   .nu-tab     switches the view in place — list, by topic, by object class.
//   .nu-filter  narrows what is on screen. Every one carries its real count.
//   .nu-ghost   the row's second action (load this table into the rail's shelf)
//               and the removable filter tokens on the count line.
// There is no control on this surface that does nothing.
//
// COLOUR. Module identity is a ring and a tint on its own chip, never a dot and
// never a stripe. Object class is the one small swatch globals.css sanctions on
// a visualisation surface. Status form (dot + word) is used once, for the S/4
// disposition of a table, which is a real state of the record.

import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { useEffect, useMemo, useState } from "react";
import {
  Boxes, Layers, LayoutGrid, ListTree, Search, Table as TableIcon, X,
} from "lucide-react";
import {
  OriginLink, SmartReturn, consumeReturn, restoreScroll, scrollOffset, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { MOD_HE, modVar } from "../mod-var";
import type { NeoTableRow, NeoTablesData } from "./types";
import { ViewTabs } from "./view-tabs";
import { CatalogFoot, CatalogHero, Cell, Cols, Ledger, RankList, Sig, fmt } from "./catalog-kit";

/* --------------------------------------------------------------- returning

   SMART RETURN, both halves (components/neo-shell/nav-context).

   SENDING   every row records, at the moment it is clicked, which view the
             reader is leaving — the tab, the sort, the query, the three facet
             groups and where the canvas was scrolled — plus the table opened.
   RECEIVING on the render after a return it takes that packet back and rebuilds
             the same view, then puts the row they left back under the eye.

   The state is read at CLICK time and not at render time: the scroll offset and
   the live query are only true at the moment of leaving. */

const SURFACE = "neo:tables";

/** A type alias and not an interface: only an alias picks up the implicit index
 *  signature that lets it satisfy the module's OriginState contract. */
type TablesListState = {
  view: string; sort: string; q: string;
  mods: string[]; caps: string[]; zones: string[];
  y: number; name: string;
};

type View = "list" | "topic" | "zone";
type Sort = "name" | "fields" | "rels" | "tcodes";
type Cap = "s4" | "cds" | "fiori" | "hub" | "shared";

const VIEWS: { v: View; he: string }[] = [
  { v: "list", he: "רשימה" },
  { v: "topic", he: "לפי נושא" },
  { v: "zone", he: "לפי מחלקת אובייקט" },
];

const SORTS: { s: Sort; he: string }[] = [
  { s: "name", he: "שם הטבלה" },
  { s: "fields", he: "מספר שדות" },
  { s: "rels", he: "מספר קשרים" },
  { s: "tcodes", he: "מספר טרנזקציות" },
];

const CAP_HE: Record<Cap, string> = {
  s4: "עם טבלה חלופית ב-S/4HANA",
  cds: "עם תצוגת CDS",
  fiori: "עם יישום Fiori",
  hub: "צמתי קשרים (6+)",
  shared: "משותפות לשני המודולים",
};

const COLS = [
  { k: "id", l: "טבלה" },
  { k: "he", l: "תיאור" },
  { k: "mod", l: "מודול" },
  { k: "fields", l: "שדות" },
  { k: "rels", l: "קשרים" },
  { k: "tx", l: "טרנזקציות" },
  { k: "s4", l: "S/4HANA" },
  { k: "act", l: "" },
];

const openContext = (name: string) =>
  window.dispatchEvent(new CustomEvent("neo:nx:object", { detail: name }));

/* -------------------------------------------------------------------- row */

/** What the parent hands each row: a function that builds the origin record for
 *  THIS view, called at click time so the query and the scroll offset it closes
 *  over are the ones that are true at the moment of leaving. */
type MakeOrigin = (name: string) => {
  href: string; label: string; detail: string; surface: string; state: TablesListState;
};

function Row({ r, q, makeOrigin, landed }: { r: NeoTableRow; q: string; makeOrigin: MakeOrigin; landed?: boolean }) {
  // The row's whole body. It is identical whether the row is a destination or a
  // value, so the two cannot drift apart.
  const body = (
    <>
      <span className="nxd-c" data-k="id">
        <i className="nxd-sw" aria-hidden="true" />
        <b className="nx-sap">{r.name}</b>
      </span>

      <span className="nxd-c" data-k="he">
        <span className="nxd-he"><Rtl s={r.he || "לא קיים תיאור מאומת בתיעוד המקור"} /></span>
        <span className="nxd-sub"><Rtl s={[r.zoneHe, ...r.topics].filter(Boolean).join(" · ")} /></span>
      </span>

      <Cell k="mod" l="מודול" sr="מודול ">
        <span className="nxd-mods">
          {r.mods.map((m) => (
            <span key={m} className="nxd-mod" style={{ "--m": modVar(m) } as React.CSSProperties} title={MOD_HE[m]}>{m}</span>
          ))}
        </span>
      </Cell>

      <Cell k="fields" l="שדות" sr="שדות ">
        <b className="nx-sap">{fmt(r.fields)}</b>
        <small><span className="nx-sap">{fmt(r.keys)}</span> מפתח</small>
      </Cell>
      <Cell k="rels" l="קשרים" sr="קשרי ER ">
        <b className="nx-sap">{fmt(r.rels.length)}</b>
      </Cell>
      <Cell k="tx" l="טרנזקציות" sr="טרנזקציות ">
        <b className="nx-sap">{fmt(r.tcodes.length)}</b>
      </Cell>

      <span className="nxd-c" data-k="s4">
        <StatusPill status={r.status.key} label={r.status.label} dot={r.status.dot} />
        {r.s4Alt || r.s4 ? (
          <span className="nxd-s4-t">
            {r.s4Alt ? <bdi className="nx-sap nxd-alt">{r.s4Alt}</bdi> : null}
            {r.s4Alt && r.s4 ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}
            {r.s4 ? <Rtl s={r.s4} /> : null}
          </span>
        ) : (
          <span className="nxd-s4-t">תיעוד המקור אינו מציין הערת S/4HANA לטבלה זו</span>
        )}
        {/* The CDS view the S/4 map associates with the table, as the row
            always showed it, and how many more it names. */}
        {r.cds.length ? (
          <span className="nxd-cds">
            <span>CDS</span>{" "}
            <bdi className="nx-sap">{r.cds[0]}</bdi>
            {r.cds.length > 1 ? <>{" "}+{fmt(r.cds.length - 1)}</> : null}
          </span>
        ) : null}
      </span>
    </>
  );

  return (
    <li
      className="nxd-item"
      data-name={r.name}
      // SmartReturn landed on this row: data.css draws a ring that fades itself
      // out, so the reader is told WHICH of a hundred rows they left.
      data-back={landed ? "1" : undefined}
      style={{ "--m": modVar(r.mods[0]), "--o": r.obj } as React.CSSProperties}
    >
      {r.href ? (
        <OriginLink href={r.href} className="nxd-row" origin={() => makeOrigin(r.name)}>
          {body}
        </OriginLink>
      ) : (
        // No page was generated for this table, so the row is a RECORD: same
        // information, no anchor, no pointer, not in the tab order. This is the
        // shape that keeps the dead-link crawler green.
        <div className="nxd-row is-flat">
          {body}
          <span className="nxd-noent">לטבלה זו אין עמוד פרטים במאגר</span>
        </div>
      )}

      <button
        type="button"
        className="nu-ghost nxd-ctx"
        onClick={() => openContext(r.name)}
        aria-label={`טעינת ההקשר של ${r.name} למדף הניווט`}
      >
        <Layers size={13} strokeWidth={1.75} />
        <span>הקשר</span>
      </button>

      {q && r.tcodes.length ? (
        <p className="nxd-tc">
          {r.tcodes.slice(0, 8).map((c) => (
            <bdi key={c} className="nu-chip is-sap">{c}</bdi>
          ))}
          {r.tcodes.length > 8 ? <span className="nu-chip">+{fmt(r.tcodes.length - 8)}</span> : null}
        </p>
      ) : null}
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function TablesSurface({ data }: { data: NeoTablesData }) {
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("list");
  const [sort, setSort] = useState<Sort>("name");
  const [mods, setMods] = useState<string[]>([]);
  const [caps, setCaps] = useState<Cap[]>([]);
  const [zones, setZones] = useState<string[]>([]);
  const [allZones, setAllZones] = useState(false);

  const toggle = <T,>(list: T[], v: T): T[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = data.rows.filter((r) => {
      if (mods.length && !mods.some((m) => r.mods.includes(m))) return false;
      if (zones.length && !zones.includes(r.zone)) return false;
      for (const c of caps) {
        if (c === "s4" && !r.s4Alt) return false;
        if (c === "cds" && !r.cds.length) return false;
        if (c === "fiori" && !r.fiori) return false;
        if (c === "hub" && r.rels.length < 6) return false;
        if (c === "shared" && r.mods.length < 2) return false;
      }
      return !needle || r.hay.includes(needle);
    });
    out = [...out].sort((a, b) => {
      if (sort === "fields") return b.fields - a.fields || a.name.localeCompare(b.name);
      if (sort === "rels") return b.rels.length - a.rels.length || a.name.localeCompare(b.name);
      if (sort === "tcodes") return b.tcodes.length - a.tcodes.length || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
    return out;
  }, [data.rows, q, mods, caps, zones, sort]);

  /** The groups the chosen view really produces — never an empty bucket. */
  const groups = useMemo(() => {
    if (view === "list") return null;
    const map = new Map<string, NeoTableRow[]>();
    for (const r of rows) {
      const keys = view === "topic" ? r.topics : [r.zoneHe || "ללא מחלקה"];
      for (const k of keys) {
        const list = map.get(k);
        if (list) list.push(r);
        else map.set(k, [r]);
      }
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "he"));
  }, [rows, view]);

  /* ------------------------------------------------- the eight object classes
     The signature: every class with its real count, its colour and how the
     two blueprints share it, each one the class filter itself. */
  const board = useMemo(() => data.zones.map((z) => {
    const inZone = data.rows.filter((r) => r.zone === z.id);
    const pm = inZone.filter((r) => r.mods.includes("PM")).length;
    const pp = inZone.filter((r) => r.mods.includes("PP-PI")).length;
    return { ...z, obj: inZone[0]?.obj || "var(--ink-3)", pm, pp };
  }).sort((a, b) => b.n - a.n), [data.zones, data.rows]);

  const hub = useMemo(() => data.rows.filter((r) => r.rels.length >= 6).length, [data.rows]);

  /* ------------------------------------------------------- smart return */

  // Rebuilt every render on purpose, and deliberately NOT memoised: it has to
  // close over the values that are true right now. <OriginLink/> calls it at
  // CLICK time, so the scroll offset it reads is the one at the moment of
  // leaving and not the one at the last render.
  const makeOrigin: MakeOrigin = (name) => {
    // What to CALL this view in Hebrew. Only narrowings that are really applied
    // are named; an unfiltered list says nothing extra rather than inventing a
    // description of itself.
    const parts = [
      mods.join(" · "),
      zones.map((z) => data.zones.find((x) => x.id === z)?.he || "").filter(Boolean).join(" · "),
      caps.map((c) => CAP_HE[c]).join(" · "),
      q.trim() ? `חיפוש "${q.trim()}"` : "",
      view === "list" ? "" : VIEWS.find((v) => v.v === view)?.he || "",
    ].filter(Boolean);
    return {
      href: "/neo/tables/",
      label: "טבלאות SAP",
      detail: parts.join(" · "),
      surface: SURFACE,
      state: { view, sort, q, mods, caps, zones, y: scrollOffset(), name },
    };
  };

  // The other half. The packet arrives on the first client render after a
  // return and is applied DURING that render — adjusting state to a changed
  // external value, which is the one place React sanctions a set during render.
  // An effect instead would be a cascading render on a prerendered page, and
  // the list would visibly rebuild itself in front of the reader.
  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<TablesListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as TablesListState;
    setBack(s);
    setView((VIEWS.some((v) => v.v === s.view) ? s.view : "list") as View);
    setSort((SORTS.some((x) => x.s === s.sort) ? s.sort : "name") as Sort);
    setQ(s.q || "");
    setMods(Array.isArray(s.mods) ? s.mods : []);
    setCaps((Array.isArray(s.caps) ? s.caps : []) as Cap[]);
    setZones(Array.isArray(s.zones) ? s.zones : []);
  }
  // Spend the packet. A write to an external store and nothing else.
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);

  // Restoring the viewport is a second step on purpose: the row can only be
  // scrolled to once the restored filters have actually rendered it. The ROW
  // wins over the raw offset — a list is not a canvas.
  useEffect(() => {
    if (!back) return;
    return restoreScroll(Number(back.y) || 0, back.name ? `.nxd-item[data-name="${CSS.escape(back.name)}"]` : undefined);
  }, [back]);

  const dirty = !!q || mods.length > 0 || caps.length > 0 || zones.length > 0;
  const reset = () => { setQ(""); setMods([]); setCaps([]); setZones([]); };

  // One module selected ⇒ the whole surface takes that module's hue. Two, or
  // none, and it correctly stays neutral rather than picking a side.
  const surfaceMod = mods.length === 1 ? mods[0] : undefined;

  const t = data.totals;

  // The view's own copy of a table that a topic view lists twice is marked as
  // the landing row only once.
  const landedOnce = new Set<string>();
  const isLanded = (name: string) => {
    if (name !== back?.name || landedOnce.has(name)) return false;
    landedOnce.add(name);
    return true;
  };

  const tokens = [
    ...mods.map((m) => ({ k: `m-${m}`, he: MOD_HE[m] ? `${m} · ${MOD_HE[m]}` : m, off: () => setMods((v) => v.filter((x) => x !== m)) })),
    ...caps.map((c) => ({ k: `c-${c}`, he: CAP_HE[c], off: () => setCaps((v) => v.filter((x) => x !== c)) })),
    ...zones.map((z) => ({ k: `z-${z}`, he: data.zones.find((x) => x.id === z)?.he || z, off: () => setZones((v) => v.filter((x) => x !== z)) })),
    ...(q.trim() ? [{ k: "q", he: `«${q.trim()}»`, off: () => setQ("") }] : []),
  ];

  return (
    <div
      className="nxd nm-scene"
      data-scene="cream"
      data-surface="tables"
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      {/* Where the reader came from, when the session knows. With no memory it
          falls back to the NEO home, which is this page's real parent. */}
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<TableIcon size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="תיעוד טכני · Data Dictionary"
        title="טבלאות SAP"
        lede={
          <>
            {fmt(t.tables)} טבלאות SAP מתיעוד המקור של PM ו-PP-PI, עם {fmt(t.fields)} שדות מתועדים
            {" "}ו-{fmt(t.keys)} שדות מפתח, {fmt(t.rels)} קשרי ER ו-{fmt(t.tcodes)} טרנזקציות.
            {" "}
            {t.linked === t.tables
              ? <>לכל אחת מהן עמוד פרטים משלה: שדות ומפתחות, קשרים ו-JOIN, טרנזקציות, תצוגות CDS והמעבר ל-S/4HANA.</>
              : <>ל-{fmt(t.linked)} מהן עמוד פרטים משלהן: שדות ומפתחות, קשרים ו-JOIN, טרנזקציות, תצוגות CDS והמעבר ל-S/4HANA. השאר מוצגות כרשומה בלבד.</>}
          </>
        }
      >
        <Ledger
          label="המאגר במספרים. כל מספר מסנן את הרשימה"
          items={[
            { v: t.tables, l: "טבלאות", on: !dirty, onClick: reset },
            { v: t.s4, l: CAP_HE.s4, on: caps.includes("s4"), onClick: () => setCaps((v) => toggle(v, "s4" as Cap)) },
            { v: t.cds, l: CAP_HE.cds, on: caps.includes("cds"), onClick: () => setCaps((v) => toggle(v, "cds" as Cap)) },
            { v: t.fiori, l: CAP_HE.fiori, on: caps.includes("fiori"), onClick: () => setCaps((v) => toggle(v, "fiori" as Cap)) },
            { v: hub, l: CAP_HE.hub, on: caps.includes("hub"), onClick: () => setCaps((v) => toggle(v, "hub" as Cap)) },
            { v: t.shared, l: CAP_HE.shared, on: caps.includes("shared"), onClick: () => setCaps((v) => toggle(v, "shared" as Cap)) },
          ]}
        />
      </CatalogHero>

      <Sig
        id="nxd-sig"
        icon={<Boxes size={15} strokeWidth={1.75} />}
        title="מחלקות האובייקט"
        count={`${fmt(data.zones.length)} מחלקות`}
        lede="כל טבלה שייכת למחלקת אובייקט אחת. לחיצה על מחלקה מסננת את הרשימה."
      >
        <RankList
          label="מחלקות האובייקט לפי מספר הטבלאות"
          cols
          fold
          open={allZones}
          onToggle={() => setAllZones((o) => !o)}
          moreLabel={`הצגת כל ${fmt(board.length)} המחלקות`}
          items={board.map((z) => ({
            id: z.id,
            label: z.he,
            n: z.n,
            swatch: z.obj,
            sub: <><bdi>PM</bdi> {fmt(z.pm)} · <bdi>PP-PI</bdi> {fmt(z.pp)}</>,
            on: zones.includes(z.id),
            onClick: () => setZones((v) => toggle(v, z.id)),
          }))}
        />
      </Sig>

      <div className="nxd-tools nm-fade nm-once">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="שם טבלה · תיאור · נושא · טרנזקציה · CDS"
            aria-label="חיפוש בטבלאות SAP"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <ViewTabs
          id="neo-table-view"
          value={view}
          onChange={setView}
          options={VIEWS.map((x) => ({
            value: x.v, label: x.he,
            icon: x.v === "list" ? <ListTree size={15} aria-hidden="true" /> : x.v === "topic" ? <LayoutGrid size={15} aria-hidden="true" /> : <Boxes size={15} aria-hidden="true" />,
          }))}
        />

        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            {SORTS.map((s) => <option key={s.s} value={s.s}>{s.he}</option>)}
          </select>
        </label>

        <div className="nxd-facet" role="group" aria-label="סינון לפי מודול">
          <span className="nxd-facet-l">מודול</span>
          {data.mods.map((m) => (
            <button
              key={m.id}
              type="button"
              className="nu-filter"
              style={{ "--m": modVar(m.id) } as React.CSSProperties}
              aria-pressed={mods.includes(m.id)}
              onClick={() => setMods((v) => toggle(v, m.id))}
            >
              {m.he}<b>{fmt(m.n)}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="nxd-count">
        <p>
          <b aria-live="polite">{fmt(rows.length)}</b> מתוך {fmt(t.tables)} טבלאות
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

      <div className="nxd-results" data-cols="tables" id="neo-table-view-panel" role="tabpanel" aria-labelledby={`neo-table-view-${view}`}>
        {rows.length === 0 ? (
          <div className="nxd-none">
            <p><b>לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים.</b></p>
            <p className="nx-muted">
              החיפוש מכסה {fmt(t.tables)} טבלאות SAP מתיעוד המקור: שם, תיאור, נושא, טרנזקציה ותצוגת CDS.
            </p>
            <div className="nxd-none-a">
              <button type="button" className="nu-btn" onClick={reset}>הצגת כל הטבלאות</button>
              {q ? <button type="button" className="nu-btn2" onClick={() => setQ("")}>ניקוי החיפוש בלבד</button> : null}
            </div>
          </div>
        ) : (
          <div className="nxd-table">
            <Cols cols={COLS} />
            {groups ? (
              groups.map(([label, list]) => (
                <section key={label} className="nxd-group" aria-label={label}>
                  <h2 className="nxd-group-h">
                    <span>{label}</span>
                    <em>{fmt(list.length)}</em>
                  </h2>
                  <ul className="nxd-list">
                    {list.map((r) => <Row key={r.name} r={r} q={q} makeOrigin={makeOrigin} landed={isLanded(r.name)} />)}
                  </ul>
                </section>
              ))
            ) : (
              <ul className="nxd-list">
                {rows.map((r) => <Row key={r.name} r={r} q={q} makeOrigin={makeOrigin} landed={isLanded(r.name)} />)}
              </ul>
            )}
          </div>
        )}
      </div>

      <CatalogFoot>
        המקור: שני קובצי תיעוד המקור של הפרויקט, PM ו-PP-PI. שדה שאינו מתועד מוצג כ&quot;לא צוין&quot;.
      </CatalogFoot>
    </div>
  );
}
