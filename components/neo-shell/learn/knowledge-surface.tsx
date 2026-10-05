"use client";

/* ============================================================================
   PROJECT NEO · /neo/knowledge — THE Knowledge Center.
   ----------------------------------------------------------------------------
   ONE centre, two bodies of knowledge, because the sidebar used to carry two
   entries and they were never duplicates of each other:

     מושגים        33 terms   (data/concepts.ts)   — what does this mean?
     מרכזי עבודה   89 topics  (data/centers/*)     — how do I carry it out?

   Measured before consolidating: zero shared slugs, zero shared titles. So the
   two could not be flattened into one ranked list — a glossary term and a work
   topic are different kinds of record. The body switch chooses which one is
   listed; each keeps its own facets, its own count and its own columns.

   THE SHAPE (2026-10) is the Reference catalogs' (components/neo-shell/data/
   catalog-kit.tsx). The ledger's counts are the bodies and the concept views
   themselves; the signature is the two bodies side by side, each ranked by its
   own subdivision (the four concept groups, the eleven centres), every bar a
   filter; the rows are aligned columns under a sticky head, cards when narrow.

   COLOUR. Status form (dot + word) is used once: how the concept's own S/4
   sentence is worded, which is a real state of the record. A work topic carries
   a migration verdict on every one of the 89 rows, so it is shown as the
   sentence alone: a pill identical on every row would say nothing. The topics'
   own accent colours stay on their own pages; here they would be decoration.
   ========================================================================== */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, Layers, ListTree, Search, X } from "lucide-react";
import {
  OriginLink, SmartReturn, consumeReturn, restoreScroll, scrollOffset, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { CatalogFoot, CatalogHero, Cell, Cols, Ledger, RankList, Sig, fmt } from "../data/catalog-kit";
import { ViewTabs } from "../data/view-tabs";
import { learnModVar } from "./mod";
import type { CenterRow, ConceptRow, KnowledgeData } from "./knowledge-data";

const SURFACE = "neo:knowledge";
const NONE = "לא קיים תיעוד מאומת במאגר";

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that satisfies the smart-return module's OriginState. */
type ListState = { body: string; view: string; q: string; group: string; y: number; slug: string };

/** Which body of the centre is on screen. */
type Body = "terms" | "work";

/** The concept views. A work topic always carries a verdict (89 of 89), so the
 *  views are the concepts' alone. */
type View = "all" | "s4" | "same";

/** The concept's own S/4 line decides one thing only: whether it opens with
 *  "ללא שינוי". The other 21 lines say what S/4HANA adds or prefers ("קיים;
 *  חלופה מודרנית: OData", "CDS I_Equipment + Fiori", "מועדף BAdI"), which is
 *  guidance and not a claim that the concept changed, so that is its name. */
const VIEW_HE: Record<View, string> = {
  all: "כל המושגים",
  s4: "עם הנחיה ל-S/4HANA",
  same: "ללא שינוי לפי התיעוד",
};

const TERM_COLS = [
  { k: "id", l: "מושג" },
  { k: "he", l: "משמעות עסקית" },
  { k: "nums", l: "דוגמאות וקשרים" },
  { k: "s4", l: "S/4HANA" },
];

const WORK_COLS = [
  { k: "id", l: "נושא עבודה" },
  { k: "he", l: "תקציר" },
  { k: "mod", l: "מודול" },
  { k: "sec", l: "מקטעים" },
  { k: "s4", l: "השפעת המעבר" },
];

/** A topic's slug is unique only WITHIN its centre (`pm-preventive` is in two),
 *  so a work row is keyed by both. */
const workKey = (c: CenterRow) => `${c.famId}/${c.slug}`;

type MakeOrigin = (key: string) => {
  href: string; label: string; detail: string; surface: string; state: ListState;
};

/* ------------------------------------------------------------------- rows */

function TermRow({ c, makeOrigin, landed }: { c: ConceptRow; makeOrigin: MakeOrigin; landed: boolean }) {
  return (
    <li className="nxd-item" data-key={c.slug} data-back={landed ? "1" : undefined}>
      <OriginLink href={c.href} className="nxd-row" origin={() => makeOrigin(c.slug)}>
        <span className="nxd-c" data-k="id">
          <span className="nxd-lead">{c.he}</span>
          {/* Some terms have no Hebrew name (BAPI, IDoc, BAdI), and some carry
              the English term in their Hebrew name already ("מבנה (Structure)"):
              either way it is not printed twice. */}
          {!c.he.toLowerCase().includes(c.title.toLowerCase())
            ? <span className="nxd-sub" dir="ltr">{c.title}</span>
            : null}
        </span>

        <span className="nxd-c" data-k="he">
          <span className="nxd-he nxd-he--soft"><Rtl s={c.biz || NONE} /></span>
          <span className="nxd-sub"><Rtl s={c.groupHe} /></span>
        </span>

        <Cell k="nums" l="דוגמאות וקשרים">
          <span className="nxd-nums">
            <span className="nxd-num"><span className="nxd-num-l">דוגמאות</span> <b>{fmt(c.examples.length)}</b></span>
            <span className="nxd-num"><span className="nxd-num-l">מושגים קשורים</span> <b>{fmt(c.related.length)}</b></span>
          </span>
        </Cell>

        <span className="nxd-c" data-k="s4">
          {/* The anchored "no change" is a state; the rest is guidance, drawn
              with the neutral dot this product keeps for "no verdict". */}
          <StatusPill
            label={c.s4Changed ? VIEW_HE.s4 : VIEW_HE.same}
            dot={c.s4Changed ? "var(--status-not-started)" : "var(--status-done)"}
          />
          <span className="nxd-s4-t"><Rtl s={c.s4 || NONE} /></span>
        </span>
      </OriginLink>
    </li>
  );
}

function WorkRow({ c, makeOrigin, landed }: { c: CenterRow; makeOrigin: MakeOrigin; landed: boolean }) {
  // The tag is printed only where it says something the module and the title
  // do not already say (a template, an interface technology).
  const tag = c.tag && c.tag !== c.module && c.tag !== c.title ? c.tag : "";
  return (
    <li
      className="nxd-item"
      data-key={workKey(c)}
      data-back={landed ? "1" : undefined}
      style={{ "--m": learnModVar(c.module) } as React.CSSProperties}
    >
      <OriginLink href={c.href} className="nxd-row" origin={() => makeOrigin(workKey(c))}>
        <span className="nxd-c" data-k="id">
          <span className="nxd-lead">{c.he}</span>
          {!c.he.toLowerCase().includes(c.title.toLowerCase())
            ? <span className="nxd-sub" dir="ltr">{c.title}</span>
            : null}
        </span>

        <span className="nxd-c" data-k="he">
          <span className="nxd-he nxd-he--soft"><Rtl s={c.sub || NONE} /></span>
          <span className="nxd-sub">
            {c.famHe}
            {tag ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}<bdi>{tag}</bdi></> : null}
          </span>
        </span>

        <Cell k="mod" l="מודול" sr="מודול ">
          {c.module
            ? <span className="nxd-mods"><span className="nxd-mod">{c.module}</span></span>
            : <span className="nxd-nil">לא צוין</span>}
        </Cell>

        <Cell k="sec" l="מקטעים" sr="מקטעי תוכן ">
          <b className="nx-sap">{fmt(c.sections)}</b>
        </Cell>

        <span className="nxd-c" data-k="s4">
          <span className="nxd-s4-t"><Rtl s={c.s4Text || NONE} /></span>
        </span>
      </OriginLink>
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function KnowledgeSurface({ data }: { data: KnowledgeData }) {
  const { rows, groups, centers, families, totals } = data;

  const [body, setBody] = useState<Body>("terms");
  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");
  const [allFams, setAllFams] = useState(false);

  const isWork = body === "work";
  const tokens = useMemo(() => q.trim().toLowerCase().split(/\s+/).filter(Boolean), [q]);

  const list = useMemo(() => {
    let out = rows;
    if (view === "s4") out = out.filter((r) => r.s4Changed);
    else if (view === "same") out = out.filter((r) => !r.s4Changed);
    if (group) out = out.filter((r) => r.group === group);
    if (tokens.length) out = out.filter((r) => tokens.every((t) => r.hay.includes(t)));
    return out;
  }, [rows, view, group, tokens]);

  const workList = useMemo(() => {
    let out = centers;
    if (group) out = out.filter((c) => c.famId === group);
    if (tokens.length) out = out.filter((c) => tokens.every((t) => c.hay.includes(t)));
    return out;
  }, [centers, group, tokens]);

  /* The signature's two lanes, counted from the two real arrays. */
  const groupS4 = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) if (r.s4Changed) m.set(r.group, (m.get(r.group) ?? 0) + 1);
    return m;
  }, [rows]);
  const famSections = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of centers) m.set(c.famId, (m.get(c.famId) ?? 0) + c.sections);
    return m;
  }, [centers]);

  const shown = isWork ? workList.length : list.length;
  const bodyTotal = isWork ? totals.centers : totals.concepts;

  /* Switching body clears what cannot mean anything in the other body: a
     concept group is not a centre, and the S/4 views are the concepts' own.
     The query survives, because a search term usually still makes sense. */
  const switchBody = (b: Body) => {
    if (b === body) return;
    setBody(b); setGroup("");
    if (b === "work") setView("all");
  };
  const dirty = !!q || !!group || (!isWork && view !== "all");
  const reset = () => { setQ(""); setGroup(""); setView("all"); };
  const openBody = (b: Body) => { setBody(b); setQ(""); setGroup(""); setView("all"); };
  const onView = (v: View) => {
    if (isWork) { setBody("terms"); setGroup(""); setView(v); return; }
    setView((cur) => (cur === v ? "all" : v));
  };
  const pickGroup = (b: Body, id: string) => {
    if (b !== body) { setBody(b); if (b === "work") setView("all"); setGroup(id); return; }
    setGroup((cur) => (cur === id ? "" : id));
  };

  /* -------------------------------------------------------- smart return */

  // Rebuilt every render and called at CLICK time: "the view I left" is only
  // knowable at the moment of leaving.
  const makeOrigin: MakeOrigin = (key) => {
    const parts = [
      isWork ? "מרכזי עבודה" : "מושגים",
      group ? (isWork ? families : groups).find((g) => g.id === group)?.he || group : "",
      !isWork && view !== "all" ? VIEW_HE[view] : "",
      q.trim() ? `חיפוש «${q.trim()}»` : "",
    ].filter(Boolean);
    return {
      href: "/neo/knowledge/",
      label: "מרכז הידע",
      detail: parts.join(" · "),
      surface: SURFACE,
      state: { body, view, q, group, y: scrollOffset(), slug: key },
    };
  };

  // The packet arrives on the first client render after a return and is applied
  // DURING that render — adjusting state to a changed external value, the one
  // place React sanctions a set during render.
  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<ListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as ListState;
    setBack(s);
    setBody(s.body === "work" ? "work" : "terms");
    setView((s.body !== "work" && Object.hasOwn(VIEW_HE, s.view) ? s.view : "all") as View);
    setQ(s.q || "");
    setGroup(s.group || "");
  }
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);
  // The ROW wins over the raw offset: a list is not a canvas.
  useEffect(() => {
    if (!back) return;
    return restoreScroll(Number(back.y) || 0, back.slug ? `.nxd-item[data-key="${CSS.escape(back.slug)}"]` : undefined);
  }, [back]);

  const facetName = (id: string) => (isWork ? families : groups).find((g) => g.id === id)?.he || id;
  const chips = [
    ...(!isWork && view !== "all" ? [{ k: "v", he: VIEW_HE[view], off: () => setView("all") }] : []),
    ...(group ? [{ k: "g", he: facetName(group), off: () => setGroup("") }] : []),
    ...(q.trim() ? [{ k: "q", he: `«${q.trim()}»`, off: () => setQ("") }] : []),
  ];

  return (
    <div className="nxd nm-scene" data-scene="cream" data-surface="knowledge">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<BrainCircuit size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="ידע ולמידה · Knowledge Center"
        title="מרכז הידע"
        lede={
          <>
            {fmt(totals.all)} רשומות בשני גופי ידע: {fmt(totals.concepts)} מושגי SAP,
            {" "}לכל אחד הסבר עסקי, הסבר טכני והשוואה בין ECC ל-S/4HANA, ולצידם
            {" "}{fmt(totals.centers)} נושאי עבודה ב-{fmt(totals.families)} מרכזים
            {" "}({fmt(totals.sections)} מקטעי תוכן).
          </>
        }
        facts={[
          { v: totals.examples, l: "דוגמאות במושגים" },
          { v: totals.links, l: "הפניות מקושרות לעמוד" },
          { v: totals.sections, l: "מקטעי תוכן בנושאי העבודה" },
          { v: totals.centersS4, l: totals.centersS4 === totals.centers ? "נושאי עבודה, כולם עם השפעת מעבר מתועדת" : "נושאי עבודה עם השפעת מעבר מתועדת" },
        ]}
      >
        <Ledger
          label="מרכז הידע במספרים. כל מספר מציג את הרשומות שהוא סופר"
          items={[
            { v: totals.concepts, l: "מושגים", on: !isWork && !dirty, onClick: () => openBody("terms") },
            { v: totals.centers, l: "נושאי עבודה", on: isWork && !dirty, onClick: () => openBody("work") },
            { v: totals.s4Changed, l: VIEW_HE.s4, on: !isWork && view === "s4", onClick: () => onView("s4") },
            { v: totals.s4Same, l: VIEW_HE.same, on: !isWork && view === "same", onClick: () => onView("same") },
            { v: totals.families, l: "מרכזים", href: "#nxd-sig" },
          ]}
        />
      </CatalogHero>

      <Sig
        id="nxd-sig"
        icon={<Layers size={15} strokeWidth={1.75} />}
        title="שני גופי הידע"
        count={`${fmt(groups.length)} קבוצות · ${fmt(families.length)} מרכזים`}
        lede="מושג מסביר מה זה; נושא עבודה מסביר איך עושים. שני הגופים אינם חופפים, ולכן כל אחד נמדד לבד. כל פס מציג את הרשומות שלו ברשימה."
      >
        <div className="nxd-lanes nxd-lanes--rank nxd-lanes--wide">
          <section className="nxd-lane" aria-labelledby="kn-terms-h">
            <h3 className="nxd-lane-h" id="kn-terms-h">
              <BrainCircuit size={15} strokeWidth={1.75} aria-hidden="true" />
              מושגים <em>{fmt(totals.concepts)} · מה זה</em>
            </h3>
            <RankList
              label="המושגים לפי קבוצה"
              items={groups.map((g) => ({
                id: g.id,
                label: <Rtl s={g.he} />,
                n: g.n,
                part: groupS4.get(g.id) || 0,
                sub: <>{fmt(groupS4.get(g.id) || 0)} {VIEW_HE.s4}</>,
                on: !isWork && group === g.id,
                onClick: () => pickGroup("terms", g.id),
              }))}
            />
          </section>
          <section className="nxd-lane" aria-labelledby="kn-work-h">
            <h3 className="nxd-lane-h" id="kn-work-h">
              <ListTree size={15} strokeWidth={1.75} aria-hidden="true" />
              מרכזי עבודה <em>{fmt(totals.centers)} · איך עושים</em>
            </h3>
            <RankList
              label="נושאי העבודה לפי מרכז"
              cols
              fold
              open={allFams}
              onToggle={() => setAllFams((o) => !o)}
              moreLabel={`הצגת כל ${fmt(families.length)} המרכזים`}
              items={[...families].sort((a, b) => b.n - a.n || a.he.localeCompare(b.he, "he")).map((f) => ({
                id: f.id,
                label: <Rtl s={f.he} />,
                n: f.n,
                sub: <>{fmt(famSections.get(f.id) || 0)} מקטעים</>,
                on: isWork && group === f.id,
                onClick: () => pickGroup("work", f.id),
              }))}
            />
          </section>
        </div>
      </Sig>

      <div className="nxd-tools nm-fade nm-once">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={isWork ? "נושא · מרכז · מודול · השפעת מעבר" : "שם עברי · מונח אנגלי · הסבר · דוגמה"}
            aria-label={isWork ? "חיפוש נושאי עבודה" : "חיפוש מושגים"}
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <ViewTabs
          id="neo-knowledge-body"
          value={body}
          onChange={switchBody}
          options={[
            { value: "terms" as Body, label: "מושגים", count: totals.concepts, icon: <BrainCircuit size={15} aria-hidden="true" /> },
            { value: "work" as Body, label: "מרכזי עבודה", count: totals.centers, icon: <ListTree size={15} aria-hidden="true" /> },
          ]}
        />
      </div>

      <div className="nxd-count">
        <p>
          <b aria-live="polite">{fmt(shown)}</b> מתוך {fmt(bodyTotal)} {isWork ? "נושאי עבודה" : "מושגים"}
        </p>
        {chips.length ? (
          <div className="nxd-toks" role="group" aria-label="הסינון הפעיל">
            {chips.map((tk) => (
              <button key={tk.k} type="button" className="nu-ghost nxd-tok" onClick={tk.off} aria-label={`הסרת הסינון ${tk.he}`}>
                <X size={12} strokeWidth={2} aria-hidden="true" />{tk.he}
              </button>
            ))}
            <button type="button" className="nu-ghost nxd-tok-all" onClick={reset}>ניקוי הסינון</button>
          </div>
        ) : null}
      </div>

      <div
        className="nxd-results"
        data-cols={isWork ? "topics" : "concepts"}
        id="neo-knowledge-body-panel"
        role="tabpanel"
        aria-labelledby={`neo-knowledge-body-${body}`}
      >
        {shown === 0 ? (
          <div className="nxd-none">
            <p><b>לא נמצאו תוצאות התואמות לסינון שנבחר</b></p>
            <p className="nx-muted">
              {isWork
                ? "החיפוש מכסה את שם הנושא, המונח האנגלי, התקציר, שם המרכז, המודול והשפעת המעבר."
                : "החיפוש מכסה את השם העברי, המונח האנגלי, ההסבר העסקי והטכני, שורות ה-ECC וה-S/4HANA והדוגמאות."}
            </p>
            <div className="nxd-none-a">
              <button type="button" className="nu-btn2" onClick={reset}>
                {isWork ? "הצגת כל הנושאים" : "הצגת כל המושגים"}
              </button>
              {q ? <button type="button" className="nu-ghost" onClick={() => setQ("")}>ניקוי החיפוש בלבד</button> : null}
            </div>
          </div>
        ) : (
          <div className="nxd-table">
            <Cols cols={isWork ? WORK_COLS : TERM_COLS} />
            <ul className="nxd-list">
              {isWork
                ? workList.map((c) => (
                  <WorkRow key={workKey(c)} c={c} makeOrigin={makeOrigin} landed={!!back && back.slug === workKey(c)} />
                ))
                : list.map((c) => (
                  <TermRow key={c.slug} c={c} makeOrigin={makeOrigin} landed={!!back && back.slug === c.slug} />
                ))}
            </ul>
          </div>
        )}
      </div>

      <CatalogFoot
        notes={[
          isWork
            ? <>לכל אחד מ-{fmt(totals.centers)} נושאי העבודה מתועדת השפעת מעבר; היא מוצגת כלשונה, ונדרש אימות נוסף לפני יישום.
                {" "}עיון לפי מרכז: <Link href="/neo/centers/" prefetch={false}>כל {fmt(totals.families)} המרכזים</Link>.</>
            : <>החלוקה נגזרת מניסוח המושג: מושג ששורת ה-S/4HANA שלו נפתחת במילים «ללא שינוי» נספר תחת «{VIEW_HE.same}»,
                {" "}וכל מושג אחר תחת «{VIEW_HE.s4}»: השורה שלו מתארת חלופה, העדפה או ערוץ חדש ב-S/4HANA, ולא בהכרח שינוי במושג עצמו.</>,
          <>
            שלושה שערים, שלושה תפקידים: <b>מרכז הידע</b> מסביר מה זה (מושגים ונושאי עבודה); <b>מרכזי הידע</b> מסבירים איך עושים
            {" "}(יחידות עבודה עם רשימת בדיקה); <b>התחומים העסקיים</b> מראים איפה זה קורה בתהליך של PM ו-PP-PI.
          </>,
        ]}
      >
        מקור: <span className="nx-sap">{isWork ? "data/centers/*" : "data/concepts.ts"}</span>: תיעוד SAP מאומת,
        {" "}שאינו נקרא ממערכת חיה. נדרש אימות במערכת לפני יישום.
      </CatalogFoot>
    </div>
  );
}
