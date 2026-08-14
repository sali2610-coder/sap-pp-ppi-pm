"use client";

// Project NEO · /neo/tables — the dictionary, carried into the NEO shell.
//
// WHAT THIS IS NOT: a second, thinner copy of the live explorer. The live page
// (app/tables/page.tsx + components/tables-explorer.tsx) already answers three
// questions well — which tables exist, which module owns them, and how heavily
// connected each one is — and its data layer is imported unchanged by
// tables-data.ts. This surface keeps those three answers and adds the ones the
// blueprint already contains and the live table drops: key-field counts, the
// real transaction list, the ER cardinality, the BAPI/IDoc count, the Fiori app
// and the S/4 replacement transaction.
//
// CONTROL LANGUAGE (app/neo/ui.css, loaded globally)
//   .nu-tab     switches the view in place — list, by topic, by object class.
//   .nu-filter  narrows what is on screen. Every one carries its real count.
//   .nu-chip    a value. Not clickable, no hover, no pointer.
//   .nu-card    the row — a whole selectable region that opens the object page.
//   .nu-ghost   the row's second action: load this object into the rail's shelf.
//   .nu-btn2    a real secondary action (reset the query, expand a facet group).
// There is no control on this surface that does nothing.
//
// COLOUR. Module identity is an edge, a ring and a surface tint — never a dot.
// Object class is the one small marker globals.css sanctions on a visualisation
// surface. Status form (dot + word) is used once, for the S/4 disposition of a
// table, which is a real state of the record.

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft, Boxes, Database, GitBranch, KeyRound, Layers, LayoutGrid,
  ListTree, Search, Sigma, Table as TableIcon, Terminal, X,
} from "lucide-react";
import { MOD_HE, modVar } from "../mod-var";
import type { NeoTableRow, NeoTablesData } from "./types";

const nf = new Intl.NumberFormat("he-IL");

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

const CAPS: { id: Cap; he: string }[] = [
  { id: "s4", he: "מוחלפת ב-S/4" },
  { id: "cds", he: "יש CDS" },
  { id: "fiori", he: "יש Fiori" },
  { id: "hub", he: "צומת קשרים (6+)" },
  { id: "shared", he: "משותפת לשני המודולים" },
];

/** The S/4 disposition of a table, read only from what the blueprint states.
 *  A table whose note is silent gets the honest "לא צוין" rather than a made-up
 *  "no material change". STATUS FORM: a small dot plus its word, never a ring. */
function s4State(r: NeoTableRow): { he: string; s: string } {
  if (r.s4Alt) return { he: "מוחלפת", s: "var(--status-in-conversion)" };
  if (/הוסר|בוטל|removed|obsolete/i.test(r.s4)) return { he: "הוסרה", s: "var(--status-in-analysis)" };
  if (r.s4) return { he: "נשמרת", s: "var(--status-done)" };
  return { he: "לא צוין", s: "var(--status-not-started)" };
}

const openContext = (name: string) =>
  window.dispatchEvent(new CustomEvent("neo:nx:object", { detail: name }));

/* -------------------------------------------------------------------- row */

function Row({ r, q }: { r: NeoTableRow; q: string }) {
  const st = s4State(r);
  return (
    <li
      className="nxd-item"
      style={{ "--m": modVar(r.mods[0]), "--o": r.obj } as React.CSSProperties}
    >
      <Link href={r.href} className="nu-card nxd-row" prefetch={false}>
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
          </span>
        </span>

        <span className="nxd-body">
          <span className="nxd-he">{r.he || "אין תיאור עסקי בקובץ המקור"}</span>
          <span className="nxd-sub">
            <span className="nxd-zone"><i aria-hidden="true" />{r.zoneHe}</span>
            <span className="nxd-dot" aria-hidden="true">·</span>
            <span>{r.topics.join(" · ")}</span>
          </span>
        </span>

        {/* Values, not controls: .nu-chip has no hover and no pointer. The unit
            is carried for the screen reader so a bare number is never read out
            on its own. */}
        <span className="nxd-nums">
          <span className="nu-chip"><Database size={11} strokeWidth={1.75} /><span className="nx-sr">שדות </span>{nf.format(r.fields)}</span>
          <span className="nu-chip"><KeyRound size={11} strokeWidth={1.75} /><span className="nx-sr">שדות מפתח </span>{nf.format(r.keys)}</span>
          <span className="nu-chip"><GitBranch size={11} strokeWidth={1.75} /><span className="nx-sr">קשרי ER </span>{nf.format(r.rels.length)}</span>
          <span className="nu-chip"><Terminal size={11} strokeWidth={1.75} /><span className="nx-sr">טרנזקציות </span>{nf.format(r.tcodes.length)}</span>
          {r.cds.length ? (
            <span className="nu-chip is-sap"><Sigma size={11} strokeWidth={1.75} /><span className="nx-sr">תצוגת CDS </span>{r.cds[0]}</span>
          ) : null}
        </span>

        <span className="nxd-s4">
          <span className="nu-status" style={{ "--s": st.s } as React.CSSProperties}>{st.he}</span>
          <span className="nxd-s4-t">
            {r.s4Alt ? <b className="nx-sap">{r.s4Alt}</b> : null}
            {r.s4 || (r.s4Alt ? "" : "קובץ המקור אינו מציין הערת S/4 לטבלה זו")}
          </span>
        </span>

        <span className="nxd-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>

      <button
        type="button"
        className="nu-ghost nxd-ctx"
        onClick={() => openContext(r.name)}
        aria-label={`טען את ההקשר של ${r.name} למדף הניווט`}
      >
        <Layers size={13} strokeWidth={1.75} />
        <span>הקשר</span>
      </button>

      {q && r.tcodes.length ? (
        <p className="nxd-tc" dir="ltr">
          {r.tcodes.slice(0, 8).map((c) => (
            <span key={c} className="nu-chip is-sap">{c}</span>
          ))}
          {r.tcodes.length > 8 ? <span className="nu-chip">+{r.tcodes.length - 8}</span> : null}
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
  const [zonesOpen, setZonesOpen] = useState(false);

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

  const dirty = !!q || mods.length > 0 || caps.length > 0 || zones.length > 0;
  const reset = () => { setQ(""); setMods([]); setCaps([]); setZones([]); };

  // One module selected ⇒ the whole surface takes that module's hue. Two, or
  // none, and it correctly stays neutral rather than picking a side.
  const surfaceMod = mods.length === 1 ? mods[0] : undefined;

  const t = data.totals;

  return (
    <div
      className="nxd"
      data-surface="tables"
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <header className="nxd-head">
        {surfaceMod ? <span className="nx-modbar" aria-hidden="true" /> : null}
        <span className="nx-eyebrow">עיון · Reference</span>
        <h1 className="nx-h1">טבלאות המילון</h1>
        <p className="nx-lede">
          {nf.format(t.tables)} טבלאות מתוך שני קובצי המקור — PM ו-PP-PI — עם {nf.format(t.fields)} שדות מתועדים,
          {" "}{nf.format(t.rels)} קשרי ER ו-{nf.format(t.tcodes)} טרנזקציות. כל שורה נפתחת לעמוד האובייקט המלא
          שלה: שדות, מפתחות, מפת קשרים והקשר המודול.
        </p>
      </header>

      <section className="nx-card nxd-stats" aria-label="מספרי המילון">
        {[
          { v: t.tables, l: "טבלאות", i: <TableIcon size={14} strokeWidth={1.75} /> },
          { v: t.fields, l: "שדות", i: <Database size={14} strokeWidth={1.75} /> },
          { v: t.keys, l: "שדות מפתח", i: <KeyRound size={14} strokeWidth={1.75} /> },
          { v: t.rels, l: "קשרי ER", i: <GitBranch size={14} strokeWidth={1.75} /> },
          { v: t.tcodes, l: "טרנזקציות", i: <Terminal size={14} strokeWidth={1.75} /> },
          { v: t.shared, l: "משותפות לשני המודולים", i: <Boxes size={14} strokeWidth={1.75} /> },
          { v: t.s4, l: "עם טבלה חלופית ב-S/4", i: <ArrowLeft size={14} strokeWidth={1.75} /> },
          { v: t.cds, l: "עם תצוגת CDS", i: <Sigma size={14} strokeWidth={1.75} /> },
        ].map((s) => (
          <div key={s.l} className="nxd-stat">
            <span className="nxd-stat-i" aria-hidden="true">{s.i}</span>
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
            onChange={(e) => setQ(e.target.value)}
            placeholder="שם טבלה · תיאור · נושא · טרנזקציה · CDS"
            aria-label="חיפוש בטבלאות המילון"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="נקה חיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <div className="nxd-tabs" role="tablist" aria-label="תצוגה">
          {VIEWS.map((x) => (
            <button
              key={x.v}
              type="button"
              role="tab"
              className="nu-tab"
              aria-selected={view === x.v}
              onClick={() => setView(x.v)}
            >
              {x.v === "list" ? <ListTree size={13} strokeWidth={1.75} /> : x.v === "topic" ? <LayoutGrid size={13} strokeWidth={1.75} /> : <Boxes size={13} strokeWidth={1.75} />}
              {x.he}
            </button>
          ))}
        </div>

        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            {SORTS.map((s) => <option key={s.s} value={s.s}>{s.he}</option>)}
          </select>
        </label>
      </div>

      <div className="nxd-facets">
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
              {m.he}<b>{nf.format(m.n)}</b>
            </button>
          ))}
        </div>

        <div className="nxd-facet" role="group" aria-label="סינון לפי מאפיין">
          <span className="nxd-facet-l">מאפיין</span>
          {CAPS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="nu-filter"
              aria-pressed={caps.includes(c.id)}
              onClick={() => setCaps((v) => toggle(v, c.id))}
            >
              {c.he}
            </button>
          ))}
          <button
            type="button"
            className="nu-btn2 nxd-more"
            aria-expanded={zonesOpen}
            onClick={() => setZonesOpen((o) => !o)}
          >
            <Boxes size={13} strokeWidth={1.75} />
            מחלקת אובייקט
            {zones.length ? <b>{zones.length}</b> : null}
          </button>
        </div>

        {zonesOpen ? (
          <div className="nxd-facet" role="group" aria-label="סינון לפי מחלקת אובייקט">
            <span className="nxd-facet-l">מחלקה</span>
            {data.zones.map((z) => (
              <button
                key={z.id}
                type="button"
                className="nu-filter"
                aria-pressed={zones.includes(z.id)}
                onClick={() => setZones((v) => toggle(v, z.id))}
              >
                {z.he}<b>{nf.format(z.n)}</b>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="nxd-count" aria-live="polite">
        <b>{nf.format(rows.length)}</b> מתוך {nf.format(t.tables)} טבלאות
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>נקה סינון</button></> : null}
      </p>

      {rows.length === 0 ? (
        <div className="nx-card nxd-none">
          <p><b>אין טבלה במילון שעונה על הסינון הזה.</b></p>
          <p className="nx-muted">
            החיפוש עובר על {nf.format(t.tables)} טבלאות אמיתיות מקובצי המקור — שם, תיאור, נושא, טרנזקציה ו-CDS.
            הוא אינו מנחש ואינו משלים טקסט חופשי.
          </p>
          <div className="nxd-none-a">
            <button type="button" className="nu-btn" onClick={reset}>הצג את כל הטבלאות</button>
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
                {list.map((r) => <Row key={r.name} r={r} q={q} />)}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="nxd-list">
          {rows.map((r) => <Row key={r.name} r={r} q={q} />)}
        </ul>
      )}

      <p className="nxd-foot">
        המקור הוא שני קובצי המקור של הפרויקט. שדה שקובץ המקור שותק לגביו מוצג כ«לא צוין» ולא מולא בערך סביר.
      </p>
    </div>
  );
}
