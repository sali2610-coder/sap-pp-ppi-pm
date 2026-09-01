"use client";

/* ============================================================================
   PROJECT NEO · /neo/knowledge — THE Knowledge Center.
   ----------------------------------------------------------------------------
   ONE centre, two bodies of knowledge, because the sidebar used to carry two
   entries and they were never duplicates of each other:

     מושגים        33 terms   (data/concepts.ts)   — what does this mean?
     מרכזי עבודה   89 topics  (data/centers/*)     — how do I carry it out?

   Measured before consolidating: zero shared slugs, zero shared titles. So the
   second entry could not be deleted, and the two could not be flattened into
   one ranked list either — a glossary term and a work topic are different kinds
   of record. A body switch sits above the tools; each body keeps its own tools,
   its own facets and its own count, and the two never mix.

   THE VISUAL TREATMENT IS THE ONE THAT WAS ALREADY HERE. Same .nu-tab body
   switch, same .nu-filter facets, same .nu-card row, same S/4HANA side panel.
   The 89 topics were rebuilt INTO this language rather than the language being
   changed to accommodate them.

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
import { ArrowLeft, BrainCircuit, Layers, Link2, Lightbulb, ListTree, Search, Sparkles, X } from "lucide-react";
import { SmartReturn, consumeReturn, rememberOrigin, useReturnPacket } from "@/components/neo-shell/nav-context";
import type { CenterRow, ConceptRow, KnowledgeData } from "./knowledge-data";

const nf = new Intl.NumberFormat("he-IL");
const SURFACE = "neo:knowledge";

/** The NEO canvas is the scroller, not the window (see .nx-canvas in
 *  app/globals.css), so a restored scroll offset has to be read from it. */
const canvas = (): HTMLElement | null =>
  typeof document === "undefined" ? null : document.getElementById("main");

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that satisfies the smart-return module's OriginState. */
type ListState = { body: string; view: string; q: string; group: string; y: number; slug: string };

/** Which body of the centre is on screen. */
type Body = "terms" | "work";

type View = "all" | "s4" | "same";

const VIEWS: { v: View; he: string }[] = [
  { v: "all", he: "כל המושגים" },
  { v: "s4", he: "שינוי מתועד ב-S/4HANA" },
  { v: "same", he: "ללא שינוי מתועד" },
];

/** A WORK TOPIC, in the same row language as a concept: mark, body, S/4HANA
 *  side panel, go arrow. The side panel states whether the topic carries a
 *  validated migration verdict — and says so plainly when it does not. */
function CenterCard({ c, onOpen }: { c: CenterRow; onOpen: (slug: string) => void }) {
  return (
    <li className="nxl-item" data-slug={c.slug}>
      <Link
        href={c.href}
        className="nu-card nxl-row"
        prefetch={false}
        onClick={() => onOpen(c.slug)}
        style={{ "--o": c.accent } as React.CSSProperties}
      >
        <span className="nxl-mark" aria-hidden="true" />
        <span className="nxl-body">
          <span className="nxl-t1">
            <b>{c.he}</b>
            <em className="nx-sap" dir="ltr">{c.title}</em>
          </span>
          <span className="nxl-desc">{c.sub}</span>
          <span className="nxl-meta">
            <span className="nu-chip">{c.famHe}</span>
            {c.module ? <span className="nu-chip">{c.module}</span> : null}
            {c.tag ? <span className="nu-chip">{c.tag}</span> : null}
            <span className="nu-chip">
              <ListTree size={11} strokeWidth={2} aria-hidden="true" />
              {nf.format(c.sections)}
              <span className="nxl-sr"> מקטעים</span>
            </span>
          </span>
        </span>
        <span className="nxl-side" data-s4={c.s4 ? "1" : "0"}>
          <span className="nxl-side-l">S/4HANA</span>
          <span className="nxl-side-v">
            {c.s4Text || "לא קיים תיעוד מאומת במאגר"}
          </span>
          <span className="nu-status" data-tone={c.s4 ? "done" : "idle"}>
            {c.s4 ? "השפעת מעבר מתועדת" : "ללא תיעוד מעבר"}
          </span>
        </span>
        <span className="nxl-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>
    </li>
  );
}

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
          <span className="nxl-desc">{c.biz || "לא קיים תיעוד מאומת במאגר"}</span>
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
          <span className="nxl-side-v">{c.s4 || "לא קיים תיעוד מאומת במאגר"}</span>
          <span
            className="nu-status"
            style={{ "--s": c.s4Changed ? "var(--status-in-conversion)" : "var(--status-done)" } as React.CSSProperties}
          >
            {c.s4Changed ? "שינוי לפי התיעוד" : "ללא שינוי לפי התיעוד"}
          </span>
        </span>

        <span className="nxl-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>
    </li>
  );
}

export function KnowledgeSurface({ data }: { data: KnowledgeData }) {
  const { rows, groups, centers, families, totals } = data;

  const [body, setBody] = useState<Body>("terms");
  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");

  const tokens = useMemo(() => q.trim().toLowerCase().split(/\s+/).filter(Boolean), [q]);

  const list = useMemo(() => {
    let out = rows;
    if (view === "s4") out = out.filter((r) => r.s4Changed);
    else if (view === "same") out = out.filter((r) => !r.s4Changed);
    if (group) out = out.filter((r) => r.group === group);
    if (tokens.length) out = out.filter((r) => tokens.every((t) => r.hay.includes(t)));
    return out;
  }, [rows, view, group, tokens]);

  /* The work topics get the SAME three controls, reading their own fields: the
     S/4 view keys off whether the topic carries a verdict, and the facet is the
     family rather than the concept group. */
  const workList = useMemo(() => {
    let out = centers;
    if (view === "s4") out = out.filter((c) => c.s4);
    else if (view === "same") out = out.filter((c) => !c.s4);
    if (group) out = out.filter((c) => c.famId === group);
    if (tokens.length) out = out.filter((c) => tokens.every((t) => c.hay.includes(t)));
    return out;
  }, [centers, view, group, tokens]);

  const isWork = body === "work";
  const shown = isWork ? workList.length : list.length;
  const bodyTotal = isWork ? totals.centers : totals.concepts;
  const facets = isWork ? families : groups;

  /* Switching body clears a filter that cannot mean anything in the other body:
     a concept group is not a centre family. The query survives, because a
     search term usually still makes sense. */
  const switchBody = (b: Body) => { if (b === body) return; setBody(b); setGroup(""); };

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
    const state: ListState = { body, view, q, group, y: canvas()?.scrollTop ?? 0, slug };
    rememberOrigin({
      // A work topic lives under /neo/centers/<family>/<slug>/, a concept under
      // /neo/knowledge/<slug>/. The return packet has to name the real
      // destination or the reader comes back to the wrong surface.
      to: isWork
        ? (centers.find((c) => c.slug === slug)?.href ?? `/neo/knowledge/${slug}/`)
        : `/neo/knowledge/${slug}/`,
      href: "/neo/knowledge/",
      label: "מרכז הידע",
      detail: [isWork ? "מרכזי עבודה" : "מושגים", ...parts].filter(Boolean).join(" · "),
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
    setBody(s.body === "work" ? "work" : "terms");
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
        <h1 className="nx-h1">מרכז הידע</h1>
        <p className="nx-lede">
          {nf.format(totals.all)} רשומות בשני גופי ידע: {nf.format(totals.concepts)} מושגי SAP,
          לכל אחד הסבר עסקי, הסבר טכני והשוואה בין ECC ל-S/4HANA, ולצידם
          {" "}{nf.format(totals.centers)} נושאי עבודה ב-{nf.format(totals.families)} מרכזים
          {" "}({nf.format(totals.sections)} מקטעי תוכן).
        </p>
      </header>

      <section className="nx-card nxl-stats" aria-label="סיכום מרכז הידע">
        {(isWork
          ? [
              { v: totals.centers, l: "נושאי עבודה", i: <ListTree size={14} strokeWidth={1.75} /> },
              { v: totals.families, l: "מרכזים", i: <Layers size={14} strokeWidth={1.75} /> },
              { v: totals.sections, l: "מקטעי תוכן", i: <Lightbulb size={14} strokeWidth={1.75} /> },
              { v: totals.centersS4, l: "עם השפעת מעבר מתועדת", i: <Sparkles size={14} strokeWidth={1.75} /> },
            ]
          : [
              { v: totals.concepts, l: "מושגים", i: <BrainCircuit size={14} strokeWidth={1.75} /> },
              { v: totals.groups, l: "קבוצות", i: <Layers size={14} strokeWidth={1.75} /> },
              { v: totals.s4Changed, l: "שינוי מתועד ב-S/4HANA", i: <Sparkles size={14} strokeWidth={1.75} /> },
              { v: totals.s4Same, l: "ללא שינוי לפי התיעוד", i: <Layers size={14} strokeWidth={1.75} /> },
              { v: totals.examples, l: "דוגמאות", i: <Lightbulb size={14} strokeWidth={1.75} /> },
              { v: totals.links, l: "הפניות מקושרות לעמוד", i: <Link2 size={14} strokeWidth={1.75} /> },
            ]
        ).map((s) => (
          <div key={s.l} className="nxl-stat">
            <span className="nxl-stat-i" aria-hidden="true">{s.i}</span>
            <b>{nf.format(s.v)}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      {/* THE BODY SWITCH. Two bodies of one centre, never mixed into one list.
          It uses .nu-tab, the same control the view switch below uses, so the
          selected state is the strong filled one this surface already had. */}
      <div className="nxl-bodies" role="tablist" aria-label="גוף הידע">
        {([
          { b: "terms" as Body, he: "מושגים", n: totals.concepts, i: <BrainCircuit size={14} strokeWidth={1.75} /> },
          { b: "work" as Body, he: "מרכזי עבודה", n: totals.centers, i: <ListTree size={14} strokeWidth={1.75} /> },
        ]).map((x) => (
          <button
            key={x.b}
            type="button"
            role="tab"
            className="nu-tab nxl-bodytab"
            aria-selected={body === x.b}
            onClick={() => switchBody(x.b)}
          >
            <span className="nxl-bodytab-i" aria-hidden="true">{x.i}</span>
            {x.he}
            <b>{nf.format(x.n)}</b>
          </button>
        ))}
      </div>

      <div className="nxl-tools">
        <div className="nxl-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={isWork ? "נושא · מרכז · מודול · השפעת מעבר" : "שם עברי · מונח אנגלי · הסבר · דוגמה"}
            aria-label={isWork ? "חיפוש נושאי עבודה" : "חיפוש מושגים"}
          />
          {q ? (
            <button type="button" className="nu-ghost nxl-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
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
              {x.v === "all" ? (isWork ? "כל הנושאים" : x.he) : x.he}
              <b>{nf.format(
                x.v === "all" ? bodyTotal
                  : x.v === "s4" ? (isWork ? totals.centersS4 : totals.s4Changed)
                  : (isWork ? totals.centers - totals.centersS4 : totals.s4Same),
              )}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="nxl-facets">
        <div className="nxl-facet" role="group" aria-label={isWork ? "סינון לפי מרכז" : "סינון לפי קבוצה"}>
          <span className="nxl-facet-l">{isWork ? "מרכז" : "קבוצה"}</span>
          {facets.map((g) => (
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
        <b>{nf.format(shown)}</b> {isWork ? "נושאי עבודה" : "מושגים"}
        {view === "all" && !dirty ? <> מתוך {nf.format(bodyTotal)}</> : null}
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>ניקוי הסינון</button></> : null}
      </p>

      {shown === 0 ? (
        <div className="nx-card nxl-none">
          <p><b>לא נמצאו תוצאות התואמות לסינון שנבחר</b></p>
          <p className="nx-muted">
            {isWork
              ? "החיפוש מכסה את שם הנושא, המונח האנגלי, התקציר, שם המרכז, המודול והשפעת המעבר."
              : "החיפוש מכסה את השם העברי, המונח האנגלי, ההסבר העסקי והטכני, שורות ה-ECC וה-S/4HANA והדוגמאות."}
          </p>
          <div className="nxl-none-a">
            {dirty ? <button type="button" className="nu-btn" onClick={reset}>ניקוי הסינון</button> : null}
            {view !== "all" ? (
              <button type="button" className="nu-btn2" onClick={() => setView("all")}>
                {isWork ? "הצגת כל הנושאים" : "הצגת כל המושגים"}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <ul className="nxl-list">
          {isWork
            ? workList.map((c) => <CenterCard key={`${c.famId}/${c.slug}`} c={c} onOpen={onOpen} />)
            : list.map((c) => <Row key={c.slug} c={c} onOpen={onOpen} />)}
        </ul>
      )}

      <div className="nxl-foot">
        {isWork ? (
          <p>
            «שינוי מתועד ב-S/4HANA» כולל נושאים שמתועדת בהם השפעת מעבר.
            {" "}נושא ללא תיעוד כזה מוצג תחת «ללא שינוי מתועד»; נדרש אימות נוסף לפני הסקה שהנושא לא השתנה.
          </p>
        ) : (
          <p>
            החלוקה נגזרת מניסוח המושג: מושג ששורת ה-S/4HANA שלו נפתחת במילים «ללא שינוי» נספר תחת «ללא שינוי מתועד»,
            {" "}וכל מושג אחר תחת «שינוי מתועד ב-S/4HANA».
          </p>
        )}
        <p>
          מקור: <span className="nx-sap">{isWork ? "data/centers/*" : "data/concepts.ts"}</span>: תיעוד SAP מאומת,
          {" "}שאינו נקרא ממערכת חיה. נדרש אימות במערכת לפני יישום.
        </p>
        {isWork ? (
          <p>
            עיון לפי מרכז:{" "}
            <Link className="nu-link" href="/neo/centers/" prefetch={false}>כל {nf.format(totals.families)} המרכזים</Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
