"use client";

// The S/4HANA object catalogue with a local filter and an action on every
// change (design audit §7, 2026-09-21). The cards are the same S4ObjView
// records the server page built; nothing is re-authored. The four severity
// groups are <details>: the two that demand action (removed, replaced) open,
// the rest on demand, so the page stops being 5,000px of blue field.

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Code2, Search, X } from "lucide-react";
import type { S4Link, S4ObjView } from "./s4-data";

const nf = new Intl.NumberFormat("he-IL");
const RISK_HE: Record<string, string> = { high: "סיכון גבוה", medium: "סיכון בינוני", low: "סיכון נמוך" };
const RISK_C: Record<string, string> = { high: "var(--status-blocked, #dc2626)", medium: "var(--status-in-analysis, #d97706)", low: "var(--status-done, #16a34a)" };
const TRUST_HE: Record<string, string> = { curated: "תיעוד מאומת", "needs-verification": "נדרש אימות נוסף" };
const ORDER: { k: string; he: string; open: boolean }[] = [
  { k: "removed", he: "בוטל", open: true },
  { k: "replaced", he: "הוחלף", open: true },
  { k: "changed", he: "השתנה", open: false },
  { k: "stays", he: "נשאר", open: false },
];

const Trust = ({ t }: { t?: string }) => (!t ? null : <span className="ns4-trust" data-t={t}>{TRUST_HE[t] || t}</span>);
const Risk = ({ r }: { r?: string }) => (!r ? null : <span className="ns4-risk" style={{ "--r": RISK_C[r] } as React.CSSProperties}>{RISK_HE[r] || r}</span>);

function Chips({ items }: { items: S4Link[] }) {
  if (!items.length) return null;
  return (
    <div className="ns4-chips">
      {items.map((l) =>
        l.href
          ? <Link key={l.t} className="ns4-chip" data-live="1" href={l.href} prefetch={false}><span className="nx-sap" dir="ltr">{l.t}</span></Link>
          : <span key={l.t} className="ns4-chip" data-live="0"><span className="nx-sap" dir="ltr">{l.t}</span></span>,
      )}
    </div>
  );
}

export function S4Catalog({ objs }: { objs: S4ObjView[] }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const mods = useMemo(() => [...new Set(objs.flatMap((o) => o.modules))].sort(), [objs]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return objs.filter((o) =>
      (!mod || o.modules.includes(mod)) &&
      (!status || o.status === status) &&
      (!needle || [o.name, o.he, o.kind, o.ecc, o.s4, o.why || ""].join(" ").toLowerCase().includes(needle)));
  }, [objs, q, mod, status]);
  const active = !!q.trim() || !!mod || !!status;
  const clear = () => { setQ(""); setMod(null); setStatus(null); };

  return (
    <>
      <div className="ns4-tools" role="search">
        <label className="ns4-find">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש אובייקט · שם, סוג, מה השתנה"
            aria-label="חיפוש בקטלוג אובייקטי S/4HANA"
            dir="auto"
          />
          {q ? <button type="button" className="nu-ghost" onClick={() => setQ("")} aria-label="ניקוי החיפוש"><X size={13} strokeWidth={2} aria-hidden="true" /></button> : null}
        </label>
        <div className="ns4-chipsrow" role="group" aria-label="סינון לפי סוג השינוי">
          {ORDER.map((g) => {
            const n = objs.filter((o) => o.status === g.k).length;
            return (
              <button key={g.k} type="button" className="nu-tab" aria-pressed={status === g.k} disabled={!n} onClick={() => setStatus((c) => (c === g.k ? null : g.k))}>
                {g.he}<em className="nx-sap">{nf.format(n)}</em>
              </button>
            );
          })}
        </div>
        <div className="ns4-chipsrow" role="group" aria-label="סינון לפי מודול">
          {mods.map((m) => (
            <button key={m} type="button" className="nu-tab" aria-pressed={mod === m} onClick={() => setMod((c) => (c === m ? null : m))}>
              <span className="nx-sap" dir="ltr">{m}</span>
              <em className="nx-sap">{nf.format(objs.filter((o) => o.modules.includes(m)).length)}</em>
            </button>
          ))}
        </div>
      </div>
      <p className="ns4-count" aria-live="polite">
        {active
          ? <>{nf.format(shown.length)} מתוך {nf.format(objs.length)} אובייקטים{status ? ` · ${ORDER.find((g) => g.k === status)?.he}` : ""}{mod ? ` · ${mod}` : ""}{q.trim() ? ` · «${q.trim()}»` : ""}</>
          : <>{nf.format(objs.length)} אובייקטים · ללא סינון · לפי חומרת השינוי</>}
        {active ? <button type="button" className="nu-ghost" onClick={clear}><X size={13} strokeWidth={2} aria-hidden="true" /> ניקוי הסינון</button> : null}
      </p>

      {shown.length === 0 ? (
        <div className="nx-card ns4-none">
          <p><b>לא נמצאו אובייקטים מתאימים. נסה חיפוש אחר או נקה מסננים.</b></p>
          <button type="button" className="nu-btn2" onClick={clear}>הצגת כל האובייקטים</button>
        </div>
      ) : null}

      {ORDER.map(({ k, he, open }) => {
        const list = shown.filter((o) => o.status === k);
        if (!list.length) return null;
        return (
          <details key={k} className="ns4-group ns4-group-d" open={open || active}>
            <summary className="ns4-h3">
              <i aria-hidden="true" style={{ background: list[0].statusColor }} />
              {he}
              <span className="ns4-h3-n">{list.length}</span>
              <span className="ns4-h3-hint" aria-hidden="true">הצגה / צמצום</span>
            </summary>
            <div className="ns4-objs">
              {list.map((o) => (
                <article key={o.name} className="ns4-obj" id={`s4o-${o.name}`} style={{ "--s": o.statusColor } as React.CSSProperties}>
                  <header className="ns4-obj-h">
                    {o.href
                      ? <Link className="ns4-obj-n nx-sap" href={o.href} prefetch={false} dir="ltr">{o.name}</Link>
                      : <b className="ns4-obj-n nx-sap" dir="ltr">{o.name}</b>}
                    <span className="ns4-kind">{o.kind}</span>
                    <Risk r={o.risk} />
                    {o.release ? <span className="ns4-rel nx-sap" dir="ltr">{o.release}</span> : null}
                    <Trust t={o.trust} />
                  </header>
                  <p className="ns4-obj-he">{o.he}</p>

                  <dl className="ns4-ba">
                    <div><dt>ECC</dt><dd>{o.ecc}</dd></div>
                    <div><dt>S/4HANA</dt><dd>{o.s4}</dd></div>
                  </dl>

                  {o.why ? <p className="ns4-why"><b>סיבת השינוי: </b>{o.why}</p> : null}

                  {o.replacesLinks.length ? (
                    <>
                      <h4 className="ns4-h4">מחליף את</h4>
                      <Chips items={o.replacesLinks} />
                    </>
                  ) : null}

                  {(o.abap || []).length ? (
                    <>
                      <h4 className="ns4-h4"><Code2 size={12} strokeWidth={2} aria-hidden="true" /> השפעה על קוד ABAP</h4>
                      <ul className="ns4-abap">
                        {(o.abap || []).map((a, i) => (
                          <li key={i}>
                            <span className="ns4-abap-k nx-sap" dir="ltr">{a.k}</span>
                            <span className="ns4-abap-b">
                              <span>{a.note}</span>
                              {a.code ? <code className="ns4-code" dir="ltr">{a.code}</code> : null}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {(o.checklist || []).length ? (
                    <>
                      <h4 className="ns4-h4"><ClipboardList size={12} strokeWidth={2} aria-hidden="true" /> נקודות לבדיקה בפרויקט</h4>
                      <ul className="ns4-check">
                        {(o.checklist || []).map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </>
                  ) : null}

                  <footer className="ns4-obj-f">
                    <span className="ns4-mods">{o.modules.join(" · ")}</span>
                    {o.relatedLinks.length ? <Chips items={o.relatedLinks} /> : null}
                    {/* The action next to the change: the object's own page when the
                        project generates one, otherwise the honest absence. */}
                    {o.href ? (
                      <Link className="nu-link ns4-act" href={o.href} prefetch={false}>
                        פתיחת עמוד האובייקט
                        <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="ns4-act ns4-act--none">אין עמוד אובייקט במאגר לרשומה זו</span>
                    )}
                  </footer>
                </article>
              ))}
            </div>
          </details>
        );
      })}
    </>
  );
}
