"use client";

/* ============================================================================
   PROJECT NEO · /neo/knowledge — the concept reference.
   ----------------------------------------------------------------------------
   The 33 authored SAP concepts as a real reference surface: search, group
   facets, an S/4HANA view, and one destination per concept.

   CONTROL LANGUAGE (app/neo/ui.css)
     .nu-tab     switches which slice of the catalogue is listed.
     .nu-filter  narrows it. A count on a filter is always the real count.
     .nu-chip    a value — the concept's group. Never clickable.
     .nu-status  dot + word. Used for exactly one thing: how the concept's own
                 S/4 sentence is worded, which is a real state of the record.
     .nu-card    the row, which opens /neo/knowledge/<slug>/.
     .nu-btn2    a real action — clearing the filter.
     .nu-link    the contextual return at the top of the surface.

   SMART RETURN
     This surface plays both parts. Every row records, at the moment it is
     clicked, the view the reader is leaving — the tab, the query, the group and
     where the canvas was scrolled — and on the render after a return it takes
     that packet back and rebuilds the same list.
   ========================================================================== */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BrainCircuit, Layers, Link2, Lightbulb, Search, Sparkles, X } from "lucide-react";
import { SmartReturn, consumeReturn, rememberOrigin, useReturnPacket } from "@/components/neo-shell/nav-context";
import type { ConceptRow, KnowledgeData } from "./knowledge-data";

const nf = new Intl.NumberFormat("he-IL");
const SURFACE = "neo:knowledge";

/** The NEO canvas is the scroller, not the window (see .nx-canvas in
 *  app/globals.css), so a restored scroll offset has to be read from it. */
const canvas = (): HTMLElement | null =>
  typeof document === "undefined" ? null : document.getElementById("main");

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that satisfies the smart-return module's OriginState. */
type ListState = { view: string; q: string; group: string; y: number; slug: string };

type View = "all" | "s4" | "same";

const VIEWS: { v: View; he: string }[] = [
  { v: "all", he: "כל המושגים" },
  { v: "s4", he: "משתנים ב-S/4HANA" },
  { v: "same", he: "ללא שינוי מהותי" },
];

function Row({ c, onOpen }: { c: ConceptRow; onOpen: (slug: string) => void }) {
  return (
    <li className="nxl-item" data-slug={c.slug}>
      <Link href={c.href} className="nu-card nxl-row" prefetch={false} onClick={() => onOpen(c.slug)}>
        <span className="nxl-mark" aria-hidden="true" />

        <span className="nxl-body">
          <span className="nxl-t1">
            <b>{c.he}</b>
            <em>{c.title}</em>
          </span>
          <span className="nxl-desc">{c.biz || "אין מידע מאומת במאגר"}</span>
          <span className="nxl-meta">
            <span className="nu-chip">{c.groupHe}</span>
            {c.examples.length ? (
              <span className="nu-chip">
                <Lightbulb size={11} strokeWidth={1.75} />
                <span className="nxl-sr">דוגמאות </span>
                {nf.format(c.examples.length)}
              </span>
            ) : null}
            {c.related.length ? (
              <span className="nu-chip">
                <Link2 size={11} strokeWidth={1.75} />
                <span className="nxl-sr">מושגים קשורים </span>
                {nf.format(c.related.length)}
              </span>
            ) : null}
          </span>
        </span>

        <span className="nxl-side" data-s4={c.s4Changed ? "1" : "0"}>
          <span className="nxl-side-l">S/4HANA</span>
          <span className="nxl-side-v">{c.s4 || "אין מידע מאומת במאגר"}</span>
          <span
            className="nu-status"
            style={{ "--s": c.s4Changed ? "var(--status-in-conversion)" : "var(--status-done)" } as React.CSSProperties}
          >
            {c.s4Changed ? "המקור מתאר שינוי" : "המקור כותב «ללא שינוי»"}
          </span>
        </span>

        <span className="nxl-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>
    </li>
  );
}

export function KnowledgeSurface({ data }: { data: KnowledgeData }) {
  const { rows, groups, totals } = data;

  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");

  const list = useMemo(() => {
    let out = rows;
    if (view === "s4") out = out.filter((r) => r.s4Changed);
    else if (view === "same") out = out.filter((r) => !r.s4Changed);
    if (group) out = out.filter((r) => r.group === group);
    const s = q.trim().toLowerCase();
    if (s) {
      const tokens = s.split(/\s+/).filter(Boolean);
      out = out.filter((r) => tokens.every((t) => r.hay.includes(t)));
    }
    return out;
  }, [rows, view, group, q]);

  const dirty = !!q || !!group;
  const reset = () => { setQ(""); setGroup(""); };

  /* -------------------------------------------------------- smart return */

  // Recreated every render on purpose and deliberately NOT memoised: it has to
  // close over the values that are true right now, because "the view I left" is
  // only knowable at the moment of leaving.
  const onOpen = (slug: string) => {
    const parts = [
      group ? groups.find((g) => g.id === group)?.he || group : "",
      view === "all" ? "" : VIEWS.find((v) => v.v === view)?.he || "",
      q.trim() ? `חיפוש «${q.trim()}»` : "",
    ].filter(Boolean);
    const state: ListState = { view, q, group, y: canvas()?.scrollTop ?? 0, slug };
    rememberOrigin({
      to: `/neo/knowledge/${slug}/`,
      href: "/neo/knowledge/",
      label: "מרכז המושגים",
      detail: parts.join(" · "),
      surface: SURFACE,
      state,
    });
  };

  // The packet arrives on the first client render after a return and is applied
  // DURING that render — adjusting state to a changed external value, the one
  // place React sanctions a set during render. An effect instead would be a
  // cascading render on a prerendered page and the list would visibly rebuild.
  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<ListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as ListState;
    setBack(s);
    setView((VIEWS.some((v) => v.v === s.view) ? s.view : "all") as View);
    setQ(s.q || "");
    setGroup(s.group || "");
  }
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);

  // Restoring the viewport is a second step: the row wins over the raw offset —
  // a list is not a canvas, and "where I was" means the record, not the pixel.
  useEffect(() => {
    if (!back) return;
    const id = requestAnimationFrame(() => {
      const el = back.slug
        ? document.querySelector<HTMLElement>(`.nxl-item[data-slug="${CSS.escape(back.slug)}"]`)
        : null;
      if (el) el.scrollIntoView({ block: "center", behavior: "auto" });
      else canvas()?.scrollTo({ top: Number(back.y) || 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [back]);

  return (
    <div className="nxl" data-surface="knowledge">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <header className="nxl-head">
        <span className="nx-eyebrow">ידע ולמידה</span>
        <h1 className="nx-h1">מרכז המושגים</h1>
        <p className="nx-lede">
          {nf.format(totals.concepts)} מושגי SAP כתובים — לכל אחד הסבר עסקי, הסבר טכני, ההתנהגות ב-ECC
          {" "}וההתנהגות ב-S/4HANA. אין כאן מושג שלא נכתב במאגר, ואין שדה שהושלם בניחוש.
        </p>
      </header>

      <section className="nx-card nxl-stats" aria-label="מספרי המאגר">
        {[
          { v: totals.concepts, l: "מושגים", i: <BrainCircuit size={14} strokeWidth={1.75} /> },
          { v: totals.groups, l: "קבוצות", i: <Layers size={14} strokeWidth={1.75} /> },
          { v: totals.s4Changed, l: "מתארים שינוי ב-S/4", i: <Sparkles size={14} strokeWidth={1.75} /> },
          { v: totals.s4Same, l: "כתוב «ללא שינוי»", i: <Layers size={14} strokeWidth={1.75} /> },
          { v: totals.examples, l: "דוגמאות מהמאגר", i: <Lightbulb size={14} strokeWidth={1.75} /> },
          { v: totals.links, l: "הפניות שנפתרו לעמוד", i: <Link2 size={14} strokeWidth={1.75} /> },
        ].map((s) => (
          <div key={s.l} className="nxl-stat">
            <span className="nxl-stat-i" aria-hidden="true">{s.i}</span>
            <b>{nf.format(s.v)}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <div className="nxl-tools">
        <div className="nxl-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="שם עברי · מונח אנגלי · הסבר · דוגמה"
            aria-label="חיפוש מושגים"
          />
          {q ? (
            <button type="button" className="nu-ghost nxl-clear" onClick={() => setQ("")} aria-label="נקה חיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <div className="nxl-tabs" role="tablist" aria-label="תצוגה">
          {VIEWS.map((x) => (
            <button
              key={x.v}
              type="button"
              role="tab"
              className="nu-tab"
              aria-selected={view === x.v}
              onClick={() => setView(x.v)}
            >
              {x.he}
              <b>{nf.format(x.v === "all" ? totals.concepts : x.v === "s4" ? totals.s4Changed : totals.s4Same)}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="nxl-facets">
        <div className="nxl-facet" role="group" aria-label="סינון לפי קבוצה">
          <span className="nxl-facet-l">קבוצה</span>
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              className="nu-filter"
              aria-pressed={group === g.id}
              onClick={() => setGroup(group === g.id ? "" : g.id)}
            >
              {g.he}<b>{nf.format(g.n)}</b>
            </button>
          ))}
        </div>
      </div>

      <p className="nxl-count" aria-live="polite">
        <b>{nf.format(list.length)}</b> מושגים
        {view === "all" && !dirty ? <> מתוך {nf.format(totals.concepts)}</> : null}
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>נקה סינון</button></> : null}
      </p>

      {list.length === 0 ? (
        <div className="nx-card nxl-none">
          <p><b>אין מושג במאגר שעונה על הסינון</b></p>
          <p className="nx-muted">
            החיפוש עובר על השם העברי, המונח האנגלי, ההסבר העסקי והטכני, שורות ה-ECC וה-S/4 והדוגמאות — ולא על טקסט חופשי.
          </p>
          <div className="nxl-none-a">
            {dirty ? <button type="button" className="nu-btn" onClick={reset}>נקה את הסינון</button> : null}
            {view !== "all" ? <button type="button" className="nu-btn2" onClick={() => setView("all")}>הצג את כל המושגים</button> : null}
          </div>
        </div>
      ) : (
        <ul className="nxl-list">
          {list.map((c) => <Row key={c.slug} c={c} onOpen={onOpen} />)}
        </ul>
      )}

      <div className="nxl-foot">
        <p>
          החלוקה בין «משתנים ב-S/4HANA» ל«ללא שינוי מהותי» נגזרת מהניסוח של המושג עצמו: מושג ששורת ה-S/4 שלו
          {" "}נפתחת במילים «ללא שינוי» נספר כלא-משתנה, וכל השאר מוצגים כפי שנכתבו — בלי לקבוע עבורם מה בדיוק השתנה.
        </p>
        <p>
          מקור: <span className="nx-sap">data/concepts.ts</span> — ידע SAP כתוב, לא נגזר ממערכת חיה. נדרש אימות מול המערכת לפני יישום.
        </p>
      </div>
    </div>
  );
}
