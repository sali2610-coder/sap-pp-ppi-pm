"use client";

/* ONE TOPIC LIST UNDER THE CENTRE CARDS (knowledge gate 2, finding 7). The
   hub's eleven cards open a centre each; below them the 89 work topics carry
   the catalogue bar every catalogue shares: search, a centre filter, sort and
   the "N מתוך M" count. The rows and the card are the knowledge centre's own
   ("מרכזי עבודה" body, knowledge-data and CenterCard), not a second copy. */
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CenterCard } from "../learn/knowledge-surface";
import type { CenterRow, ConceptFacet } from "../learn/knowledge-data";

const nf = new Intl.NumberFormat("he-IL");
const noop = () => {};

export function CenterTopics({ rows, families }: { rows: CenterRow[]; families: ConceptFacet[] }) {
  const [q, setQ] = useState("");
  const [fam, setFam] = useState("");
  const [sort, setSort] = useState<"repo" | "he">("repo");

  const list = useMemo(() => {
    const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let out = rows;
    if (fam) out = out.filter((c) => c.famId === fam);
    if (tokens.length) out = out.filter((c) => tokens.every((t) => c.hay.includes(t)));
    return sort === "he" ? [...out].sort((a, b) => a.he.localeCompare(b.he, "he")) : out;
  }, [rows, q, fam, sort]);

  const dirty = !!q || !!fam;
  const reset = () => { setQ(""); setFam(""); };

  return (
    <section className="nct-topics" aria-labelledby="nct-topics-h">
      <h2 className="nx-h2" id="nct-topics-h">כל הנושאים</h2>

      <div className="nxl-tools">
        <div className="nxl-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="נושא · מרכז · מודול · השפעת מעבר"
            aria-label="חיפוש נושאי עבודה"
          />
          {q ? (
            <button type="button" className="nu-ghost nxl-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>
        <label className="nxl-sort">
          <span>מיון</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as "repo" | "he")}>
            <option value="repo">סדר המרכזים</option>
            <option value="he">לפי שם</option>
          </select>
        </label>
      </div>

      <div className="nxl-facets">
        <div className="nxl-facet" role="group" aria-label="סינון לפי מרכז">
          <span className="nxl-facet-l">מרכז</span>
          {families.map((f) => (
            <button
              key={f.id}
              type="button"
              className="nu-filter"
              aria-pressed={fam === f.id}
              onClick={() => setFam(fam === f.id ? "" : f.id)}
            >
              {f.he}<b>{nf.format(f.n)}</b>
            </button>
          ))}
        </div>
      </div>

      <p className="nxl-count" aria-live="polite">
        <b>{nf.format(list.length)}</b> מתוך {nf.format(rows.length)} נושאי עבודה
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>ניקוי הסינון</button></> : null}
      </p>

      {list.length ? (
        <ul className="nxl-list">
          {list.map((c) => <CenterCard key={`${c.famId}/${c.slug}`} c={c} onOpen={noop} />)}
        </ul>
      ) : (
        <div className="nx-card nxl-none">
          <p><b>לא נמצאו נושאים מתאימים. אפשר לשנות את החיפוש או לנקות את המסננים.</b></p>
          <p className="nx-muted">החיפוש מכסה את שם הנושא, המונח האנגלי, התקציר, שם המרכז, המודול והשפעת המעבר.</p>
          <div className="nxl-none-a">
            <button type="button" className="nu-btn" onClick={reset}>הצגת כל הנושאים</button>
          </div>
        </div>
      )}
    </section>
  );
}
