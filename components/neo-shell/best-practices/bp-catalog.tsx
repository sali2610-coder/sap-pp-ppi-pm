"use client";

/* ============================================================================
   PROJECT NEO · /neo/best-practices — the catalog.
   ----------------------------------------------------------------------------
   THE SHAPE (2026-10) is the Reference catalogs' (components/neo-shell/data/
   catalog-kit.tsx): a hero whose ledger counts are filters, one signature band,
   the count line with removable tokens, and the practices as aligned rows under
   a sticky column head that become cards on a narrow width.

   TRUST IS THIS CATALOG'S SUBJECT, so the ledger counts the verification levels
   the records carry (each one the filter it counts) and the signature ranks the
   practices by module with the officially verified share drawn darker. Every
   number is counted here from the rows bpList() hands over at build time:
   35 small objects, which is why this is a client island at all.

   The record (/neo/best-practices/<slug>/) is untouched: it is still the server
   view in ./bp-view.tsx, and it answers the return this list records.
   ========================================================================== */

import { useEffect, useMemo, useState } from "react";
import { ClipboardCheck, Search, ShieldCheck, X } from "lucide-react";
import {
  OriginLink, SmartReturn, consumeReturn, restoreScroll, scrollOffset, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { CatalogFoot, CatalogHero, Cell, Cols, Ledger, RankList, Sig, fmt } from "../data/catalog-kit";
import { modVar } from "../mod-var";
import { LEVEL_RANK } from "@/lib/evidence/s4-status";
import type { BpRow } from "./bp-data";

const SURFACE = "neo:best-practices";
const NONE = "לא קיים תיעוד מאומת במאגר";
/** The level the signature draws darker. */
const OFFICIAL = "sap_official_verified";

/** How a level reads in a sentence about several practices. */
const LEVEL_PLURAL: Record<string, string> = {
  sap_official_verified: "מאומתות מולו",
  conflicting_sources: "עם מקורות סותרים",
  repository_verified: "מאומתות מול נתוני הפרויקט",
};
const rankOf = (key: string) => LEVEL_RANK[key as keyof typeof LEVEL_RANK] ?? -1;

type ListState = { q: string; mod: string; lvl: string; y: number; slug: string };

const COLS = [
  { k: "id", l: "שיטת עבודה" },
  { k: "he", l: "תקציר" },
  { k: "mod", l: "מודול" },
  { k: "nums", l: "תוכן" },
  { k: "ver", l: "אימות" },
];

type MakeOrigin = (slug: string) => {
  href: string; label: string; detail: string; surface: string; state: ListState;
};

function Row({ r, makeOrigin, landed }: { r: BpRow; makeOrigin: MakeOrigin; landed: boolean }) {
  return (
    <li
      className="nxd-item"
      data-slug={r.slug}
      data-back={landed ? "1" : undefined}
      style={{ "--m": modVar(r.module) } as React.CSSProperties}
    >
      <OriginLink href={r.href} className="nxd-row" origin={() => makeOrigin(r.slug)}>
        <span className="nxd-c" data-k="id">
          <span className="nxd-lead"><Rtl s={r.he} /></span>
          {r.en ? <span className="nxd-sub" dir="ltr">{r.en}</span> : null}
        </span>

        <span className="nxd-c" data-k="he">
          <span className="nxd-he nxd-he--soft"><Rtl s={r.summary || NONE} /></span>
        </span>

        <Cell k="mod" l="מודול" sr="מודול ">
          <span className="nxd-mods">
            <span className="nxd-mod" title={r.moduleHe || undefined}>{r.module}</span>
          </span>
        </Cell>

        <Cell k="nums" l="תוכן">
          <span className="nxd-nums">
            <span className="nxd-num"><span className="nxd-num-l">צעדים</span> <b>{fmt(r.steps)}</b></span>
            <span className="nxd-num"><span className="nxd-num-l">דפוסים שגויים</span> <b>{fmt(r.antiPatterns)}</b></span>
            <span className="nxd-num"><span className="nxd-num-l">בדיקות</span> <b>{fmt(r.checks)}</b></span>
            <span className="nxd-num"><span className="nxd-num-l">מקורות</span> <b>{fmt(r.sources)}</b></span>
            <span className="nxd-num"><span className="nxd-num-l">הפניות מקושרות</span> <b>{fmt(r.xrefsLinked)}</b> מתוך {fmt(r.xrefs)}</span>
          </span>
        </Cell>

        <Cell k="ver" l="אימות" sr="רמת אימות: ">
          <StatusPill label={r.levelHe} dot={r.levelDot} />
          <small>עומק L{r.depth}{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}{r.depthHe}</small>
          {r.profile ? <small>פרופיל תהליך: {fmt(r.profile.filled)} מתוך {fmt(r.profile.total)} שדות</small> : null}
        </Cell>
      </OriginLink>
    </li>
  );
}

export function BpCatalog({ rows }: { rows: BpRow[] }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [lvl, setLvl] = useState("");

  /* Every figure on the page, counted from the rows. */
  const t = useMemo(() => {
    const sum = (f: (r: BpRow) => number) => rows.reduce((a, r) => a + f(r), 0);
    return {
      total: rows.length,
      steps: sum((r) => r.steps),
      anti: sum((r) => r.antiPatterns),
      checks: sum((r) => r.checks),
      sources: sum((r) => r.sources),
      xrefs: sum((r) => r.xrefs),
      linked: sum((r) => r.xrefsLinked),
      official: rows.filter((r) => r.officialWithUrl > 0).length,
      processes: rows.filter((r) => r.profile).length,
    };
  }, [rows]);

  const levels = useMemo(() => {
    const m = new Map<string, { key: string; he: string; dot: string; n: number }>();
    for (const r of rows) {
      const e = m.get(r.levelKey) || { key: r.levelKey, he: r.levelHe, dot: r.levelDot, n: 0 };
      e.n++;
      m.set(r.levelKey, e);
    }
    // The product's own evidence order (lib/evidence), strongest first: the
    // order of the doors must not change when a count does.
    return [...m.values()].sort((a, b) => rankOf(b.key) - rankOf(a.key) || b.n - a.n);
  }, [rows]);

  /* WHAT "AN OFFICIAL SOURCE" MEANS HERE. A practice can link an official SAP
     source and still have its sources disagree, so the sentence says how the
     linked ones are verified instead of calling them all "backed". */
  const linked = useMemo(() => {
    const m = new Map<string, { key: string; he: string; n: number }>();
    for (const r of rows) {
      if (r.officialWithUrl <= 0) continue;
      const e = m.get(r.levelKey) || { key: r.levelKey, he: r.levelHe, n: 0 };
      e.n++;
      m.set(r.levelKey, e);
    }
    return [...m.values()].sort((a, b) => rankOf(b.key) - rankOf(a.key) || b.n - a.n);
  }, [rows]);

  const modules = useMemo(() => {
    const m = new Map<string, { id: string; he: string; n: number; official: number }>();
    for (const r of rows) {
      const e = m.get(r.module) || { id: r.module, he: r.moduleHe, n: 0, official: 0 };
      e.n++;
      if (r.levelKey === OFFICIAL) e.official++;
      m.set(r.module, e);
    }
    return [...m.values()].sort((a, b) => b.n - a.n || a.id.localeCompare(b.id));
  }, [rows]);

  const hay = useMemo(
    () => new Map(rows.map((r) => [r.slug, [r.he, r.en, r.summary, r.module, r.moduleHe, r.levelHe].join(" ").toLowerCase()])),
    [rows],
  );

  const list = useMemo(() => {
    const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return rows.filter((r) =>
      (!mod || r.module === mod) &&
      (!lvl || r.levelKey === lvl) &&
      (!tokens.length || tokens.every((tk) => (hay.get(r.slug) || "").includes(tk))));
  }, [rows, q, mod, lvl, hay]);

  const dirty = !!q || !!mod || !!lvl;
  const reset = () => { setQ(""); setMod(""); setLvl(""); };

  /* -------------------------------------------------------- smart return */

  const makeOrigin: MakeOrigin = (slug) => {
    const parts = [
      mod ? modules.find((m) => m.id === mod)?.he || mod : "",
      lvl ? levels.find((l) => l.key === lvl)?.he || "" : "",
      q.trim() ? `חיפוש «${q.trim()}»` : "",
    ].filter(Boolean);
    return {
      href: "/neo/best-practices/",
      label: "שיטות עבודה מומלצות",
      detail: parts.join(" · "),
      surface: SURFACE,
      state: { q, mod, lvl, y: scrollOffset(), slug },
    };
  };

  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<ListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as ListState;
    setBack(s);
    setQ(s.q || "");
    setMod(s.mod || "");
    setLvl(s.lvl || "");
  }
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);
  useEffect(() => {
    if (!back) return;
    return restoreScroll(Number(back.y) || 0, back.slug ? `.nxd-item[data-slug="${CSS.escape(back.slug)}"]` : undefined);
  }, [back]);

  const surfaceMod = mod && mod !== "Cross" ? mod : undefined;

  const chips = [
    ...(mod ? [{ k: "m", he: mod === "Cross" ? modules.find((m) => m.id === mod)?.he || mod : mod, off: () => setMod("") }] : []),
    ...(lvl ? [{ k: "l", he: levels.find((l) => l.key === lvl)?.he || lvl, off: () => setLvl("") }] : []),
    ...(q.trim() ? [{ k: "q", he: `«${q.trim()}»`, off: () => setQ("") }] : []),
  ];

  return (
    <div
      className="nxd nm-scene"
      data-scene="cream"
      data-surface="best-practices"
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<ClipboardCheck size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="ידע ולמידה · Best Practices"
        title="שיטות עבודה מומלצות ל-SAP S/4HANA"
        lede={
          <>
            {fmt(t.total)} שיטות עבודה מתועדות, מצעד ראשון ועד בדיקות התוצאה.
            {" "}בכל שיטה: צעדי עבודה, דפוסים שגויים שכדאי להכיר וקישורים לרשומות הרלוונטיות באתר.
            {" "}
            {t.official === 0
              ? "כולן נגזרות מרשומות מתועדות של המאגר, וטרם צורף להן מקור SAP רשמי מקושר."
              : <>
                ל-{fmt(t.official)} מהן מקור SAP רשמי מקושר:{" "}
                {linked.map((l, i) => (
                  <span key={l.key}>
                    {i ? (i === linked.length - 1 ? " ו-" : ", ") : ""}{fmt(l.n)} {LEVEL_PLURAL[l.key] || l.he}
                  </span>
                ))}.
                {t.total > t.official ? <>{" "}{fmt(t.total - t.official)} האחרות נגזרות מרשומות המאגר.</> : null}
              </>}
          </>
        }
        facts={[
          { v: t.steps, l: "צעדי עבודה" },
          { v: t.anti, l: "דפוסים שגויים" },
          { v: t.checks, l: "בדיקות" },
          { v: t.sources, l: "מקורות ברשומות" },
          { v: t.linked, l: `מתוך ${fmt(t.xrefs)} הפניות מקושרות לעמוד` },
          ...(t.processes ? [{ v: t.processes, l: "רשומות עם פרופיל תהליך" }] : []),
        ]}
      >
        <Ledger
          label="שיטות העבודה לפי רמת האימות. כל מספר מסנן את הרשימה"
          items={[
            { v: t.total, l: "שיטות עבודה", on: !dirty, onClick: reset },
            ...levels.map((l) => ({
              v: l.n, l: l.he, on: lvl === l.key,
              onClick: () => setLvl((cur) => (cur === l.key ? "" : l.key)),
            })),
          ]}
        />
      </CatalogHero>

      <Sig
        id="nxd-sig"
        icon={<ShieldCheck size={15} strokeWidth={1.75} />}
        title="שיטות העבודה לפי תחום"
        count={`${fmt(modules.length)} תחומים`}
        lede="אורך הפס הוא מספר השיטות בתחום, והחלק המודגש הוא השיטות המאומתות מול תיעוד SAP רשמי. לחיצה מסננת את הרשימה."
      >
        <RankList
          label="שיטות העבודה לפי תחום"
          cols
          items={modules.map((m) => ({
            id: m.id,
            label: m.id === "Cross" ? m.he || m.id : <><bdi>{m.id}</bdi> · {m.he}</>,
            n: m.n,
            part: m.official,
            sub: <>{fmt(m.official)} מאומתות מול תיעוד SAP רשמי</>,
            on: mod === m.id,
            onClick: () => setMod((cur) => (cur === m.id ? "" : m.id)),
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
            placeholder="שם השיטה · תקציר · מודול"
            aria-label="חיפוש בשיטות העבודה"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="nxd-count">
        <p>
          <b aria-live="polite">{fmt(list.length)}</b> מתוך {fmt(t.total)} שיטות עבודה
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

      <div className="nxd-results" data-cols="bp" id="bp-list">
        {!rows.length ? (
          <p className="nxd-none">{NONE} · שיטות עבודה</p>
        ) : list.length === 0 ? (
          <div className="nxd-none">
            <p><b>לא נמצאו שיטות עבודה התואמות לסינון שנבחר</b></p>
            <p className="nx-muted">החיפוש מכסה את שם השיטה בעברית ובאנגלית, את התקציר, את המודול ואת רמת האימות.</p>
            <div className="nxd-none-a">
              <button type="button" className="nu-btn2" onClick={reset}>הצגת כל שיטות העבודה</button>
              {q ? <button type="button" className="nu-ghost" onClick={() => setQ("")}>ניקוי החיפוש בלבד</button> : null}
            </div>
          </div>
        ) : (
          <div className="nxd-table">
            <Cols cols={COLS} />
            <ul className="nxd-list">
              {list.map((r) => (
                <Row key={r.slug} r={r} makeOrigin={makeOrigin} landed={!!back && back.slug === r.slug} />
              ))}
            </ul>
          </div>
        )}
      </div>

      {t.processes > 0 ? (
        <details className="nxd-compare">
          <summary>
            מה כולל פרופיל תהליך?
            <em>{fmt(t.processes)} רשומות מציגות פרופיל תהליך</em>
          </summary>
          <div className="nxd-cmp-b">
            <p>{fmt(t.processes)} רשומות מציגות פרופיל תהליך: מטרה וטריגר, תנאים מוקדמים, נתוני אב ותפקידים; שלבי עבודה, טרנזקציות וטבלאות; אינטגרציה, תוצרים וחריגים; בקרות ומדדים; שינויי ECC ל־S/4HANA והגירה; מקורות וקישורים צולבים.</p>
            <p>שדה שלא תועד מוצג כפער. הפניה נפתחת כקישור רק כאשר קיים לה עמוד בפרויקט.</p>
          </div>
        </details>
      ) : null}

      <CatalogFoot
        notes={["בכל שיטה מוצגים רמת האימות, המקורות ועומק התיעוד שלה, כדי שיהיה ברור מה מתועד ומה עדיין דורש בדיקה."]}
      >
        התוכן מבוסס על הפניות מפורשות לרשומות המאגר. נדרש אימות במערכת SAP לפני יישום.
      </CatalogFoot>
    </div>
  );
}
