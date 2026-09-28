"use client";

// The domains hub list with a local search and a module filter (design audit
// §7, 2026-09-21: 39 rich cards and no way to narrow them). The cards are the
// same records the server hub built; nothing is re-authored here, the list is
// only narrowed, and the empty state says so in the product's own words.

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Search, Wrench, X } from "lucide-react";
import type { DomainCard } from "./domain-data";

const nf = new Intl.NumberFormat("he-IL");
const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "תחזוקת מפעל · PM", "PP-PI": "תעשיות תהליכיות · PP-PI" };

export function Card({ c, i }: { c: DomainCard; i: number }) {
  return (
    <Link
      href={`/neo/domain/${c.slug}/`}
      prefetch={false}
      className="ndm-card nm-rise nm-once"
      style={{ "--m": MOD_VAR[c.module], "--nm-i": i } as React.CSSProperties}
    >
      <span className="ndm-card-top">
        <span className="ndm-card-mod">{MOD_HE[c.module]}</span>
        {/* DEPTH, STATED. A card that carries the deep consultant record says
            so; one that carries only the spine says that instead of staying
            silent and letting the reader assume parity. */}
        <span className="ndm-depth" data-deep={c.deep ? "1" : "0"}>
          {c.deep ? "רשומה מלאה" : "רשומת בסיס"}
        </span>
      </span>
      <b className="ndm-card-he">{c.he}</b>
      <span className="ndm-card-en" dir="ltr">{c.title}</span>
      <span className="ndm-card-sum">{c.summary}</span>
      <span className="ndm-card-nums">
        <em><b>{nf.format(c.steps)}</b> שלבים</em>
        <em><b>{nf.format(c.tables)}</b> טבלאות</em>
        <em><b>{nf.format(c.tcodes)}</b> טרנזקציות</em>
        {c.s4 ? <em className="ndm-card-s4">S/4HANA</em> : null}
      </span>
      <span className="ndm-card-go">
        <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
        פתיחת התחום
      </span>
    </Link>
  );
}

type Mod = "PM" | "PP-PI";

export function DomainHubList({ cards }: { cards: DomainCard[] }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<Mod | null>(null);
  const [deepOnly, setDeepOnly] = useState(false);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return cards.filter((c) =>
      (!mod || c.module === mod) &&
      (!deepOnly || c.deep) &&
      (!needle || [c.he, c.title, c.summary, c.slug].join(" ").toLowerCase().includes(needle)));
  }, [cards, q, mod, deepOnly]);

  const groups = (["PM", "PP-PI"] as const)
    .map((m) => ({ m, list: shown.filter((c) => c.module === m) }))
    .filter((g) => g.list.length > 0);
  const active = !!q.trim() || !!mod || deepOnly;
  const clear = () => { setQ(""); setMod(null); setDeepOnly(false); };

  return (
    <>
      <div className="ndm-tools" role="search">
        <label className="ndm-find">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש תחום · שם, תהליך, תיאור"
            aria-label="חיפוש בתחומים העסקיים"
            dir="auto"
          />
          {q ? (
            <button type="button" className="nu-ghost" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : null}
        </label>
        <div className="ndm-modchips" role="group" aria-label="סינון לפי מודול">
          {(["PM", "PP-PI"] as const).map((m) => (
            <button
              key={m}
              type="button"
              className="nu-tab"
              aria-pressed={mod === m}
              onClick={() => setMod((cur) => (cur === m ? null : m))}
              style={{ "--m": MOD_VAR[m] } as React.CSSProperties}
            >
              {m === "PM" ? <Wrench size={13} strokeWidth={1.75} aria-hidden="true" /> : <FlaskConical size={13} strokeWidth={1.75} aria-hidden="true" />}
              {MOD_HE[m]}
              <em className="nx-sap">{nf.format(cards.filter((c) => c.module === m).length)}</em>
            </button>
          ))}
          <button type="button" className="nu-tab" aria-pressed={deepOnly} onClick={() => setDeepOnly((v) => !v)}>
            רשומה מלאה בלבד
            <em className="nx-sap">{nf.format(cards.filter((c) => c.deep).length)}</em>
          </button>
        </div>
      </div>

      <p className="ndm-count" aria-live="polite">
        {active
          ? <>{nf.format(shown.length)} מתוך {nf.format(cards.length)} תחומים{mod ? ` · ${MOD_HE[mod]}` : ""}{deepOnly ? " · רשומה מלאה" : ""}{q.trim() ? ` · «${q.trim()}»` : ""}</>
          : <>{nf.format(cards.length)} תחומים · ללא סינון</>}
        {active ? (
          <button type="button" className="nu-ghost" onClick={clear}>
            <X size={13} strokeWidth={2} aria-hidden="true" /> ניקוי הסינון
          </button>
        ) : null}
      </p>

      {groups.length ? groups.map(({ m, list }) => (
        <section key={m} className="ndm-mod" style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>
          <h2 className="ndm-mod-h">
            {m === "PM" ? <Wrench size={16} strokeWidth={1.75} aria-hidden="true" /> : <FlaskConical size={16} strokeWidth={1.75} aria-hidden="true" />}
            {MOD_HE[m]}
            <span className="ndm-mod-n">{list.length} תחומים</span>
          </h2>
          <div className="ndm-grid">
            {list.map((c, i) => <Card key={c.slug} c={c} i={i} />)}
          </div>
        </section>
      )) : (
        <div className="nx-card ndm-none">
          <p><b>לא נמצאו תחומים מתאימים. נסה חיפוש אחר או נקה מסננים.</b></p>
          <button type="button" className="nu-btn2" onClick={clear}>הצגת כל התחומים</button>
        </div>
      )}
    </>
  );
}
