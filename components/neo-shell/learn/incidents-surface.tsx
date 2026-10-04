"use client";

/* ============================================================================
   PROJECT NEO · /neo/incidents — the incident catalogue.
   ----------------------------------------------------------------------------
   Real troubleshooting records, listed the way a consultant actually triages
   them: what stops work first, in which module, with which symptom.

   CONTROL LANGUAGE (app/neo/ui.css)
     .nu-tab     switches which slice of the catalogue is listed.
     .nu-filter  narrows it. A count on a filter is always the real count.
     .nu-chip    a value — the module, a measured count. Never clickable.
     .nu-status  dot + word. Used for one thing only: the record's OWN business
                 impact tag, which is a real state of the incident. The word
                 carries the meaning; the dot only says "this is a state".
     .nu-card    the row, which opens /neo/incidents/<slug>/.
     .nu-btn2    a real action — paging and clearing.
     .nu-link    the contextual return at the top of the surface.

   COLOUR
     MODULE arrives as the row's leading edge and as the ring/tint of the module
     chip — line, edge, ring, tint, never a dot. "Cross" is not a module and is
     deliberately left neutral. Brand red appears on one condition only: the
     record carries an explicit ECC↔S/4HANA split, which is the thing this
     product exists to surface.
   ========================================================================== */

import { rovingKeys } from "../focus";
import { enLang } from "../lang";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Bug, GitCompareArrows, ListChecks, Search, ShieldCheck, Table as TableIcon, Terminal, X,
} from "lucide-react";
import { SmartReturn, consumeReturn, rememberOrigin, useReturnPacket } from "@/components/neo-shell/nav-context";
import { learnModVar } from "./mod";
import type { IncidentRow, IncidentsData } from "./incidents-data";
import { IMPACT_UNTAGGED } from "./incidents-impact";

const nf = new Intl.NumberFormat("he-IL");
const SURFACE = "neo:incidents";
const PAGE = 40;

const canvas = (): HTMLElement | null =>
  typeof document === "undefined" ? null : document.getElementById("main");

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that satisfies the smart-return module's OriginState. */
type ListState = { view: string; q: string; mod: string; imp: string; more: boolean; y: number; slug: string };

type View = "all" | "s4" | "prevent";

const VIEWS: { v: View; he: string }[] = [
  { v: "all", he: "כל הקטלוג" },
  { v: "s4", he: "עם הבחנה בין ECC ל-S/4HANA" },
  { v: "prevent", he: "עם צעדי מניעה" },
];

/** Severity is not invented here. The record's own tag chooses the dot; the
 *  Hebrew word next to it carries the whole meaning. */
const IMPACT_DOT: Record<string, string> = {
  BLOCKING: "var(--status-in-analysis)",
  "FINANCIAL POSTING RISK": "var(--status-in-analysis)",
  FINANCIAL: "var(--status-in-conversion)",
  "DATA INCONSISTENCY": "var(--status-in-conversion)",
  PARTIAL: "var(--status-tested)",
  "USER-SPECIFIC": "var(--status-tested)",
  "MONITORING NOISE": "var(--status-not-started)",
  MONITORING: "var(--status-not-started)",
};

function Row({ r, impactHe, onOpen }: { r: IncidentRow; impactHe: string; onOpen: (slug: string) => void }) {
  return (
    <li className="nxl-item" data-slug={r.slug} style={{ "--m": learnModVar(r.module) } as React.CSSProperties}>
      <Link href={r.href} className="nu-card nxl-row" prefetch={false} onClick={() => onOpen(r.slug)}>
        <span className="nxl-mark" aria-hidden="true" />

        <span className="nxl-body">
          <span className="nxl-t1">
            <b>{r.he}</b>
            <em className="nx-sap" dir="ltr">{r.slug}</em>
          </span>
          <span className="nxl-desc">{r.symptom || "אין תיעוד מאומת במאגר"}</span>
          <span className="nxl-meta">
            <span className="nu-chip nxl-mod">
              <i aria-hidden="true" />
              {r.module}
              {r.moduleHe ? <em>{r.moduleHe}</em> : null}
            </span>
            {r.impactKind ? (
              <span className="nu-status" style={{ "--s": IMPACT_DOT[r.impactKind] || "var(--status-not-started)" } as React.CSSProperties}>
                {impactHe}
              </span>
            ) : null}
            {r.rootCauses.length ? (
              <span className="nu-chip">
                <Bug size={11} strokeWidth={1.75} />
                <span className="nxl-sr">סיבות שורש </span>
                {nf.format(r.rootCauses.length)}
              </span>
            ) : null}
            {r.tcodes.length ? (
              <span className="nu-chip">
                <Terminal size={11} strokeWidth={1.75} />
                <span className="nxl-sr">טרנזקציות אבחון </span>
                {nf.format(r.tcodes.length)}
              </span>
            ) : null}
            {r.tables.length ? (
              <span className="nu-chip">
                <TableIcon size={11} strokeWidth={1.75} />
                <span className="nxl-sr">טבלאות לבדיקה </span>
                {nf.format(r.tables.length)}
              </span>
            ) : null}
            {r.fix.length ? (
              <span className="nu-chip">
                <ListChecks size={11} strokeWidth={1.75} />
                <span className="nxl-sr">צעדי תיקון </span>
                {nf.format(r.fix.length)}
              </span>
            ) : null}
          </span>
        </span>

        <span className="nxl-side" data-s4={r.hasS4 ? "1" : "0"}>
          {r.hasS4 ? (
            <>
              <span className="nxl-side-l">S/4HANA</span>
              <span className="nxl-side-v" lang={enLang(r.s4 || r.ecc)}>{r.s4 || r.ecc}</span>
            </>
          ) : r.error ? (
            <>
              <span className="nxl-side-l">הודעת השגיאה</span>
              <span className="nxl-side-v" lang={enLang(r.error)}>{r.error}</span>
            </>
          ) : r.rootCauses.length ? (
            <>
              <span className="nxl-side-l">סיבת שורש ראשונה</span>
              <span className="nxl-side-v" lang={enLang(r.rootCauses[0])}>{r.rootCauses[0]}</span>
            </>
          ) : (
            <>
              <span className="nxl-side-l">הודעת השגיאה</span>
              <span className="nxl-side-v">אין תיעוד מאומת במאגר</span>
            </>
          )}
        </span>

        <span className="nxl-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>
    </li>
  );
}

export function IncidentsSurface({ data }: { data: IncidentsData }) {
  const { rows, modules, impacts, totals } = data;

  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [imp, setImp] = useState("");
  // The first PAGE rows are listed; the rest sit in a native <details>, so
  // every row is in the HTML and the page still opens calm.
  const [more, setMore] = useState(false);
  // The catalogue bar every catalogue shares (knowledge gate 2, finding 7).
  const [sort, setSort] = useState<"repo" | "he">("repo");

  const impactHe = useMemo(
    () => Object.fromEntries(impacts.map((f) => [f.id, f.he])) as Record<string, string>,
    [impacts],
  );

  const list = useMemo(() => {
    let out = rows;
    if (view === "s4") out = out.filter((r) => r.hasS4);
    else if (view === "prevent") out = out.filter((r) => r.prevention.length > 0);
    if (mod) out = out.filter((r) => r.module === mod);
    if (imp) out = out.filter((r) => (imp === IMPACT_UNTAGGED ? !r.impactKind : r.impactKind === imp));
    const s = q.trim().toLowerCase();
    if (s) {
      const tokens = s.split(/\s+/).filter(Boolean);
      out = out.filter((r) => tokens.every((t) => r.hay.includes(t)));
    }
    return sort === "he" ? [...out].sort((a, b) => a.he.localeCompare(b.he, "he")) : out;
  }, [rows, view, mod, imp, q, sort]);

  const shown = list.slice(0, PAGE);
  const rest = list.slice(PAGE);
  const dirty = !!q || !!mod || !!imp;
  const reset = () => { setQ(""); setMod(""); setImp(""); setMore(false); };
  const onView = (v: View) => { setView(v); setMore(false); };

  /* -------------------------------------------------------- smart return */

  const onOpen = (slug: string) => {
    const parts = [
      mod ? modules.find((m) => m.id === mod)?.he || mod : "",
      imp ? impactHe[imp] || "" : "",
      view === "all" ? "" : VIEWS.find((v) => v.v === view)?.he || "",
      q.trim() ? `חיפוש «${q.trim()}»` : "",
    ].filter(Boolean);
    const state: ListState = { view, q, mod, imp, more, y: canvas()?.scrollTop ?? 0, slug };
    rememberOrigin({
      to: `/neo/incidents/${slug}/`,
      href: "/neo/incidents/",
      label: "תקלות ופתרון בעיות",
      detail: parts.join(" · "),
      surface: SURFACE,
      state,
    });
  };

  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<ListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as ListState;
    setBack(s);
    setView((VIEWS.some((v) => v.v === s.view) ? s.view : "all") as View);
    setQ(s.q || "");
    setMod(s.mod || "");
    setImp(s.imp || "");
    setMore(!!s.more);
  }
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);

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

  const surfaceMod = mod && mod !== "Cross" ? mod : undefined;

  return (
    <div
      className="nxl"
      data-surface="incidents"
      style={surfaceMod ? ({ "--m": learnModVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <header className="nxl-head">
        {surfaceMod ? <span className="nx-modbar" aria-hidden="true" /> : null}
        <span className="nx-eyebrow">ידע ולמידה</span>
        <h1 className="nx-h1">תקלות ופתרון בעיות</h1>
        <p className="nx-lede">
          קטלוג של {nf.format(totals.incidents)} תקלות מתועדות ב-{nf.format(totals.modules)} מודולים: סימפטום,
          {" "}סיבות שורש, טרנזקציות לאבחון, טבלאות לבדיקה וצעדי תיקון. כל תקלה נפתחת לרשומה המלאה.
        </p>
      </header>

      <div className="nxl-tools">
        <div className="nxl-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setMore(false); }}
            placeholder="סימפטום · הודעת שגיאה · טרנזקציה (COGI) · טבלה (AFFW)"
            aria-label="חיפוש תקלות"
          />
          {q ? (
            <button type="button" className="nu-ghost nxl-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <div className="nxl-tabs" role="tablist" aria-label="תצוגה" onKeyDown={rovingKeys}>
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
              {x.he}
              <b>
                {nf.format(
                  x.v === "all" ? totals.incidents : x.v === "s4" ? totals.withS4 : totals.withPrevention,
                )}
              </b>
            </button>
          ))}
        </div>

        <label className="nxl-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => { setSort(e.target.value as "repo" | "he"); setMore(false); }}>
            <option value="repo">סדר המאגר</option>
            <option value="he">לפי כותרת</option>
          </select>
        </label>
      </div>

      <div className="nxl-facets">
        <div className="nxl-facet" role="group" aria-label="סינון לפי מודול">
          <span className="nxl-facet-l">מודול</span>
          {modules.map((m) => (
            <button
              key={m.id}
              type="button"
              className="nu-filter"
              style={{ "--m": learnModVar(m.id) } as React.CSSProperties}
              aria-pressed={mod === m.id}
              onClick={() => { setMod(mod === m.id ? "" : m.id); setMore(false); }}
            >
              {m.id}<b>{nf.format(m.n)}</b>
            </button>
          ))}
        </div>
        <div className="nxl-facet" role="group" aria-label="סינון לפי השפעה עסקית">
          <span className="nxl-facet-l">השפעה</span>
          {impacts.map((f) => (
            <button
              key={f.id}
              type="button"
              className="nu-filter"
              aria-pressed={imp === f.id}
              onClick={() => { setImp(imp === f.id ? "" : f.id); setMore(false); }}
            >
              {f.he}<b>{nf.format(f.n)}</b>
            </button>
          ))}
        </div>
      </div>

      <section className="nx-card nxl-stats" aria-label="סיכום הקטלוג">
        {[
          { v: totals.incidents, l: "תקלות בקטלוג", i: <Bug size={14} strokeWidth={1.75} /> },
          { v: totals.tcodes, l: "טרנזקציות אבחון", i: <Terminal size={14} strokeWidth={1.75} /> },
          { v: totals.tables, l: "טבלאות לבדיקה", i: <TableIcon size={14} strokeWidth={1.75} /> },
          { v: totals.withFix, l: "עם צעדי תיקון", i: <ListChecks size={14} strokeWidth={1.75} /> },
          { v: totals.withPrevention, l: "עם צעדי מניעה", i: <ShieldCheck size={14} strokeWidth={1.75} /> },
          { v: totals.withS4, l: "עם הבחנה בין ECC ל-S/4HANA", i: <GitCompareArrows size={14} strokeWidth={1.75} /> },
        ].map((s) => (
          <div key={s.l} className="nxl-stat">
            <span className="nxl-stat-i" aria-hidden="true">{s.i}</span>
            <b>{nf.format(s.v)}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <p className="nxl-count">
        {/* The count is live, the button is not: inside the region it was read out again on every change (gate 8, m4). */}
        <span aria-live="polite">
          <b>{nf.format(list.length)}</b> מתוך {nf.format(totals.incidents)} תקלות
        </span>
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>ניקוי הסינון</button></> : null}
      </p>

      {list.length === 0 ? (
        <div className="nx-card nxl-none">
          <p><b>לא נמצאו תוצאות התואמות לסינון שנבחר</b></p>
          <p className="nx-muted">
            החיפוש מכסה את הכותרת, הסימפטום, הודעת השגיאה, סיבות השורש, צעדי התיקון והמניעה, וקודי
            {" "}הטרנזקציות והטבלאות שברשומה.
          </p>
          <div className="nxl-none-a">
            {dirty ? <button type="button" className="nu-btn" onClick={reset}>ניקוי הסינון</button> : null}
            {view !== "all" ? <button type="button" className="nu-btn2" onClick={() => onView("all")}>הצגת כל הקטלוג</button> : null}
          </div>
        </div>
      ) : (
        <>
          <ul className="nxl-list">
            {shown.map((r) => (
              <Row key={r.slug} r={r} impactHe={impactHe[r.impactKind] || r.impactKind} onOpen={onOpen} />
            ))}
          </ul>
          {rest.length ? (
            <details className="nxl-more" open={more} onToggle={(e) => setMore(e.currentTarget.open)}>
              <summary className="nu-btn2">
                {more ? "הסתרת" : "הצגת עוד"} {nf.format(rest.length)}
              </summary>
              <ul className="nxl-list">
                {rest.map((r) => (
                  <Row key={r.slug} r={r} impactHe={impactHe[r.impactKind] || r.impactKind} onOpen={onOpen} />
                ))}
              </ul>
            </details>
          ) : null}
        </>
      )}

      <nav className="nxr-also" aria-labelledby="inc-also-h">
        <h2 className="nxr-also-h" id="inc-also-h">ראו גם</h2>
        <ul>
          <li><Link href="/neo/sap-notes/" prefetch={false} className="nu-link">מרכז SAP Notes — נתיבי פתרון</Link></li>
        </ul>
      </nav>

      <div className="nxl-foot">
        <p>
          {nf.format(totals.incidents - rows.filter((r) => r.impactKind).length)} רשומות ללא תג מסומנות «ללא תג השפעה».
        </p>
        <p>
          מקור: קטלוג התקלות של הפרויקט, ידע תחום (לא bench-verified) שאינו מחובר
          {" "}למערכת SAP. הרשומות כוללות מילות חיפוש ל-SAP Notes, ללא מספרי Note.
        </p>
      </div>
    </div>
  );
}
