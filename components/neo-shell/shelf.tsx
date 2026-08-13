"use client";

// The shelf — one box, three intelligences: what you kept (pinned), what you
// touched (recent), and where you are (context). They share the box and
// cross-fade, so the rail never grows to accommodate a mode.
//
// Recent and pinned read the product's real stores (neo:obj:recent /
// neo:obj:fav), so an empty shelf on a fresh browser is the truth and is stated
// as such. The prototype shipped a hand-written RECENT array with invented
// relative times; none of that survived the port.

import { useFavorites } from "@/lib/prefs";
import { Ico } from "./icon";
import { relTime } from "./store";
import type { ObjectContext, ObjectMeta, ShelfTab } from "./types";
import { modVar } from "./mod-var";

const TABS: { id: ShelfTab; he: string; icon: string }[] = [
  { id: "recent", he: "אחרונים", icon: "History" },
  { id: "pinned", he: "מוצמדים", icon: "Pin" },
  { id: "context", he: "הקשר", icon: "Layers" },
];

export function ShelfTabs({
  tab, onTab, tabsRef, indRef,
}: {
  tab: ShelfTab;
  onTab: (t: ShelfTab) => void;
  tabsRef: React.RefObject<HTMLDivElement | null>;
  indRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="nx-shelf-tabs" role="tablist" aria-label="מדף הקשר" ref={tabsRef}>
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          data-shelftab={t.id}
          aria-selected={tab === t.id}
          aria-controls={`nx-shelfpane-${t.id}`}
          onClick={() => onTab(t.id)}
        >
          <Ico name={t.icon} size={12} />
          <span>{t.he}</span>
        </button>
      ))}
      {/* one travelling underline, tinted by the active module hue */}
      <span className="nx-shelf-ind" ref={indRef} aria-hidden="true" />
    </div>
  );
}

export function RecentPane({
  names, objects, seen, onOpen,
}: {
  names: string[];
  objects: Record<string, ObjectMeta>;
  seen: Record<string, number>;
  onOpen: (name: string) => void;
}) {
  const rows = names.map((n) => objects[n]).filter(Boolean);
  if (!rows.length) {
    return (
      <p className="nx-empty">
        עדיין לא נפתח אובייקט. פתיחת טבלה מהעמוד או מהחיפוש תוסיף אותה לכאן —
        זו אותה רשימה שהמוצר כבר שומר, לא רשימה נפרדת.
      </p>
    );
  }
  return (
    <ul className="nx-striplist">
      {rows.map((o) => (
        <li key={o.name}>
          <button
            type="button"
            className="nx-striprow"
            style={{ "--m": modVar(o.mods[0]) } as React.CSSProperties}
            onClick={() => onOpen(o.name)}
          >
            <i aria-hidden="true" />
            <span className="nx-sap">{o.name}</span>
            <span className="nx-s">{o.he}</span>
            <span className="nx-w">{seen[o.name] ? relTime(seen[o.name]) : ""}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function PinnedPane({
  objects, onOpen,
}: {
  objects: Record<string, ObjectMeta>;
  onOpen: (name: string) => void;
}) {
  // The product's own favourites list (lib/prefs, capped at 50, synced across
  // tabs) — pinning here pins everywhere.
  const favs = useFavorites();
  const rows = favs.map((n) => objects[n]).filter(Boolean);
  if (!rows.length) {
    return <p className="nx-empty">אין אובייקטים מוצמדים. הצמדה נעשית מעמוד האובייקט ומשותפת לכל המוצר.</p>;
  }
  return (
    <>
      <ul className="nx-pins">
        {rows.map((o) => (
          <li key={o.name}>
            <button
              type="button"
              className="nx-pin"
              style={{ "--m": modVar(o.mods[0]) } as React.CSSProperties}
              onClick={() => onOpen(o.name)}
            >
              <span className="nx-sap">{o.name}</span>
              <span className="nx-n">{o.fields}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="nx-shelf-note">{rows.length} אובייקטים מוצמדים · לחיצה טוענת את ההקשר המלא</p>
    </>
  );
}

export function ContextPane({ ctx, onOpen }: { ctx: ObjectContext | null; onOpen: (name: string) => void }) {
  if (!ctx) {
    return <p className="nx-empty">אין הקשר טעון. בחירת טבלה מהעמוד או מהמדף תטען לכאן את ההקשר המלא שלה.</p>;
  }
  return (
    <div className="nx-ctx">
      <div className="nx-ctx-head">
        <span className="nx-eyebrow">הקשר נוכחי</span>
        <b className="nx-sap">{ctx.name}</b>
        <span className="nx-ctx-he">{ctx.he}</span>
        <span className="nx-ctx-mods">
          {ctx.mods.map((m) => (
            <span key={m} className="nx-mchip" style={{ "--m": modVar(m) } as React.CSSProperties}>{m}</span>
          ))}
        </span>
      </div>
      {ctx.shared ? (
        <p className="nx-ctx-shared">
          <Ico name="GitBranch" size={12} />
          טבלה משותפת ל-PM ול-PP-PI, ולכן שני ההקשרים מוצגים — אין כאן בחירה שרירותית של מודול.
        </p>
      ) : null}

      <div className="nx-ctx-sec">
        <h5>הקשרי מודול ({ctx.contexts.length})</h5>
        <ul className="nx-ctx-list">
          {ctx.contexts.map((c, i) => (
            <li key={`${c.module}-${i}`} style={{ "--m": modVar(c.module) } as React.CSSProperties}>
              <b>{c.module}</b>
              <span>{c.topic}</span>
              {c.tcodes ? <em className="nx-sap">{c.tcodes}</em> : null}
            </li>
          ))}
        </ul>
      </div>

      {ctx.tcodes.length ? (
        <div className="nx-ctx-sec">
          <h5>טרנזקציות ({ctx.tcodes.length})</h5>
          <div className="nx-ctx-codes">
            {ctx.tcodes.map((c) => <span key={c} className="nx-tcode"><span className="nx-sap">{c}</span></span>)}
          </div>
        </div>
      ) : null}

      {ctx.relations.length ? (
        <div className="nx-ctx-sec">
          <h5>קשרים ({ctx.relations.length})</h5>
          <ul className="nx-ctx-joins">
            {ctx.relations.map((r) => (
              <li key={r.table}>
                <button type="button" onClick={() => onOpen(r.table)}>
                  <span className="nx-sap">{r.table}</span>
                  {r.card ? <span className="nx-card">{r.card}</span> : null}
                </button>
                {r.join ? <code>{r.join}</code> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
