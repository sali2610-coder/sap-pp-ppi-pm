"use client";

/* THE CATALOGUE BAR ON BEST PRACTICES (knowledge gate 2, finding 7): the same
   search, module filter, sort and "N מתוך M" count the reference catalogues
   carry, in the same places. The rows themselves are rendered on the server
   (bp-view Row) and handed in by slug; this component only decides which of
   them appear and in what order, so nothing about a row is duplicated here. */
import { Fragment, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { BpRow } from "./bp-data";

const nf = new Intl.NumberFormat("he-IL");
type Sort = "repo" | "he" | "steps";

export function BpList({ rows, items }: { rows: BpRow[]; items: Record<string, React.ReactNode> }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [sort, setSort] = useState<Sort>("repo");

  const mods = useMemo(() => {
    const m = new Map<string, { id: string; he: string; n: number }>();
    for (const r of rows) {
      const x = m.get(r.module) || { id: r.module, he: r.module === "Cross" ? r.moduleHe : `${r.module} · ${r.moduleHe}`, n: 0 };
      x.n += 1;
      m.set(r.module, x);
    }
    return [...m.values()].sort((a, b) => b.n - a.n);
  }, [rows]);

  const list = useMemo(() => {
    const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let out = rows;
    if (mod) out = out.filter((r) => r.module === mod);
    if (tokens.length) {
      out = out.filter((r) => {
        const hay = `${r.he} ${r.en} ${r.summary} ${r.module} ${r.moduleHe}`.toLowerCase();
        return tokens.every((t) => hay.includes(t));
      });
    }
    if (sort === "he") out = [...out].sort((a, b) => a.he.localeCompare(b.he, "he"));
    else if (sort === "steps") out = [...out].sort((a, b) => b.steps - a.steps);
    return out;
  }, [rows, q, mod, sort]);

  const dirty = !!q || !!mod;
  const reset = () => { setQ(""); setMod(""); };

  return (
    <>
      <div className="nxd-tools">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="שם · מונח אנגלי · תקציר · מודול"
            aria-label="חיפוש שיטות עבודה"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>
        <label className="nxd-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="repo">סדר הקטלוג</option>
            <option value="he">לפי שם</option>
            <option value="steps">לפי מספר הצעדים</option>
          </select>
        </label>
      </div>

      {mods.length > 1 ? (
        <div className="nxd-facets">
          <div className="nxd-facet" role="group" aria-label="סינון לפי מודול">
            <span className="nxd-facet-l">מודול</span>
            {mods.map((m) => (
              <button
                key={m.id}
                type="button"
                className="nu-filter"
                aria-pressed={mod === m.id}
                onClick={() => setMod(mod === m.id ? "" : m.id)}
              >
                {m.he}<b>{nf.format(m.n)}</b>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <p className="nxd-count">
        {/* The count is live, the button is not: inside the region it was read out again on every change (gate 8, m4). */}
        <span aria-live="polite">
          <b>{nf.format(list.length)}</b> מתוך {nf.format(rows.length)} שיטות עבודה
        </span>
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>ניקוי הסינון</button></> : null}
      </p>

      {list.length ? (
        <ul className="nbp-list">
          {list.map((r) => <Fragment key={r.slug}>{items[r.slug]}</Fragment>)}
        </ul>
      ) : (
        <div className="nx-card nxd-none">
          <p><b>לא נמצאו שיטות עבודה מתאימות. אפשר לשנות את החיפוש או לנקות את המסננים.</b></p>
          <p className="nx-muted">החיפוש מכסה את השם, המונח האנגלי, התקציר והמודול.</p>
          <div className="nxd-none-a">
            <button type="button" className="nu-btn" onClick={reset}>הצגת כל שיטות העבודה</button>
          </div>
        </div>
      )}
    </>
  );
}
