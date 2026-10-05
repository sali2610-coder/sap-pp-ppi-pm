"use client";

// The S/4HANA object catalogue: the transformation board, a local filter, and
// one compact card per object. The cards are the same S4ObjView records the
// server page built; nothing is re-authored.
//
// THE BOARD is the whole transformation on one screen: the 29 objects in four
// columns by what happens to them (removed, replaced, changed, stays). Each
// name opens its card. A filter dims what it leaves out instead of reshaping
// the board, so the picture stays the same picture.
//
// The four severity groups below are <details>: the two that demand action
// (removed, replaced) open, the rest on demand. A link to a card opens its
// group (S4Reveal).

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Code2, FileText, Search, X } from "lucide-react";
import { EDITION_HE } from "@/lib/evidence/types";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { S4Reveal } from "./s4-reveal";
import type { S4Link, S4ObjView } from "./s4-data";

const nf = new Intl.NumberFormat("he-IL");
const count = (n: number, one: string, many: string) => (n === 1 ? one : `${nf.format(n)} ${many}`);
const RISK_HE: Record<string, string> = { high: "סיכון גבוה", medium: "סיכון בינוני", low: "סיכון נמוך" };
const RISK_C: Record<string, string> = { high: "var(--status-blocked, #dc2626)", medium: "var(--status-in-analysis, #d97706)", low: "var(--status-done, #16a34a)" };
const TRUST_HE: Record<string, string> = { curated: "תיעוד הפרויקט", "needs-verification": "נדרש אימות נוסף" };
const ORDER: { k: string; he: string; open: boolean; sub: string }[] = [
  { k: "removed", he: "בוטל", open: true, sub: "אין מקבילה ישירה" },
  { k: "replaced", he: "הוחלף", open: true, sub: "עבר למבנה אחר" },
  { k: "changed", he: "השתנה", open: false, sub: "קיים, בהתנהגות שונה" },
  { k: "stays", he: "נשאר", open: false, sub: "ללא שינוי מהותי" },
];

/** STATUS: a small dot immediately followed by its own word. */
const Dot = ({ c, children }: { c: string; children: React.ReactNode }) => (
  <span className="ns4-st" style={{ "--c": c } as React.CSSProperties}>{children}</span>
);
const Risk = ({ r }: { r?: string }) => (!r ? null : <Dot c={RISK_C[r]}>{RISK_HE[r] || r}</Dot>);
const Trust = ({ t }: { t?: string }) => (!t ? null : <span className="ns4-trust" data-t={t}>{TRUST_HE[t] || t}</span>);

function Chips({ items }: { items: S4Link[] }) {
  if (!items.length) return null;
  return (
    <div className="ns4-chips">
      {items.map((l, i) =>
        l.href
          ? <Link key={`${l.t}-${i}`} className="ns4-chip" data-live="1" href={l.href} prefetch={false}><span className="nx-sap" dir="ltr">{l.t}</span></Link>
          : <span key={`${l.t}-${i}`} className="ns4-chip" data-live="0"><span className="nx-sap" dir="ltr">{l.t}</span></span>,
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
  const inView = useMemo(() => new Set(shown.map((o) => o.name)), [shown]);
  const active = !!q.trim() || !!mod || !!status;
  const clear = () => { setQ(""); setMod(null); setStatus(null); };

  return (
    <>
      <S4Reveal prefix="s4o-" />

      {/* ------------------------------------------------ the board */}
      <div className="ns4-board" data-filter={active ? "1" : undefined} role="list" aria-label="לוח השינויים: כל האובייקטים לפי סוג השינוי">
        {ORDER.map(({ k, he, sub }) => {
          const list = objs.filter((o) => o.status === k);
          if (!list.length) return null;
          return (
            <section key={k} className="ns4-board-c" role="listitem" aria-labelledby={`ns4-b-${k}`}>
              <header className="ns4-board-h">
                <h3 id={`ns4-b-${k}`}><Dot c={list[0].statusColor}>{he}</Dot></h3>
                <b className="nx-sap">{nf.format(list.length)}</b>
                <span>{sub}</span>
              </header>
              <ul>
                {list.map((o) => (
                  <li key={o.name} data-dim={active && !inView.has(o.name) ? "1" : undefined}>
                    <a href={`#s4o-${o.name}`}>
                      <b className="nx-sap" dir="ltr">{o.name}</b>
                      <span>{o.he}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* ------------------------------------------------ the filter */}
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
        <div className="ns4-fgroup">
        <span className="ns4-lbl" id="ns4-f-status">סוג השינוי</span>
        <div className="ns4-seg" role="group" aria-labelledby="ns4-f-status">
          {ORDER.map((g) => {
            const n = objs.filter((o) => o.status === g.k).length;
            return (
              <button key={g.k} type="button" aria-pressed={status === g.k} disabled={!n} onClick={() => setStatus((c) => (c === g.k ? null : g.k))}>
                {g.he}<em className="nx-sap">{nf.format(n)}</em>
              </button>
            );
          })}
        </div>
        </div>
        <div className="ns4-fgroup">
        <span className="ns4-lbl" id="ns4-f-mod">מודול</span>
        <div className="ns4-seg" role="group" aria-labelledby="ns4-f-mod">
          {mods.map((m) => (
            <button key={m} type="button" aria-pressed={mod === m} onClick={() => setMod((c) => (c === m ? null : m))}>
              <bdi dir="ltr">{m}</bdi>
              <em className="nx-sap">{nf.format(objs.filter((o) => o.modules.includes(m)).length)}</em>
            </button>
          ))}
        </div>
        </div>
      </div>
      <p className="ns4-count">
        <span aria-live="polite">
          {active
            ? <>{nf.format(shown.length)} מתוך {nf.format(objs.length)} אובייקטים{status ? ` · ${ORDER.find((g) => g.k === status)?.he}` : ""}{mod ? <> · <bdi dir="ltr">{mod}</bdi></> : null}{q.trim() ? <> · «<bdi>{q.trim()}</bdi>»</> : null}</>
            : <>{nf.format(objs.length)} אובייקטים · ללא סינון · לפי חומרת השינוי</>}
        </span>
        {active ? <button type="button" className="nu-ghost" onClick={clear}><X size={13} strokeWidth={2} aria-hidden="true" /> ניקוי הסינון</button> : null}
      </p>

      {shown.length === 0 ? (
        <div className="nx-card ns4-none">
          <p><b>לא נמצאו אובייקטים מתאימים. נסה חיפוש אחר או נקה מסננים.</b></p>
          <button type="button" className="nu-btn2" onClick={clear}>הצגת כל האובייקטים</button>
        </div>
      ) : null}

      {/* ------------------------------------------------ the cards */}
      {ORDER.map(({ k, he, open }) => {
        const list = shown.filter((o) => o.status === k);
        if (!list.length) return null;
        return (
          <details key={k} className="ns4-group" open={open || active}>
            <summary>
              <Dot c={list[0].statusColor}>{he}</Dot>
              <span className="ns4-pill">{count(list.length, "אובייקט אחד", "אובייקטים")}</span>
              <span className="ns4-sum-hint" aria-hidden="true">הצגה / צמצום</span>
            </summary>
            <div className="ns4-grid">
              {list.map((o) => (
                <article key={o.name} className="ns4-obj" id={`s4o-${o.name}`}>
                  <header className="ns4-obj-h">
                    <h3 className="ns4-obj-t">
                      {o.href
                        ? <Link className="nx-sap" href={o.href} prefetch={false} dir="ltr">{o.name}</Link>
                        : <span className="nx-sap" dir="ltr">{o.name}</span>}
                    </h3>
                    <Risk r={o.risk} />
                  </header>
                  <p className="ns4-obj-he"><Rtl s={o.he} /></p>
                  <p className="ns4-meta">
                    <span className="ns4-tag" lang="en">{o.kind}</span>
                    {o.release ? <span className="ns4-tag nx-sap" dir="ltr">{o.release}</span> : null}
                    <span className="ns4-tag nx-sap" dir="ltr">{o.modules.join(" · ")}</span>
                    <Trust t={o.trust} />
                  </p>

                  <dl className="ns4-ft">
                    <div><dt>ECC</dt><dd><Rtl s={o.ecc} /></dd></div>
                    <div data-k="s4"><dt>S/4HANA</dt><dd><Rtl s={o.s4} /></dd></div>
                  </dl>

                  {o.why ? <p className="ns4-why"><b>סיבת השינוי</b> <Rtl s={o.why} /></p> : null}

                  {o.evidence?.map((source) => (
                    <p className="ns4-src-line" key={`${source.url}-${source.claim}`}>
                      <FileText size={12} strokeWidth={2} aria-hidden="true" />
                      <span>
                        <b>מקור לשינוי </b>
                        {source.url
                          ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.sourceTitle}</a>
                          : source.sourceTitle}
                        {" · "}<bdi dir="ltr" className="nx-sap">{EDITION_HE[source.edition]} {source.release}</bdi>
                        {source.lastVerifiedAt ? <> · נבדק <time dir="ltr" dateTime={source.lastVerifiedAt}>{source.lastVerifiedAt}</time></> : null}
                        <br /><Rtl s={source.claim} />
                      </span>
                    </p>
                  ))}

                  {o.replacesLinks.length ? (
                    <div className="ns4-kv">
                      <span className="ns4-lbl">מחליף את</span>
                      <Chips items={o.replacesLinks} />
                    </div>
                  ) : null}

                  {(o.abap || []).length ? (
                    <div className="ns4-sub">
                      <h4 className="ns4-h4"><Code2 size={12} strokeWidth={2} aria-hidden="true" /> השפעה על קוד ABAP</h4>
                      <ul className="ns4-abap">
                        {(o.abap || []).map((a, i) => (
                          <li key={i}>
                            <span className="ns4-abap-k nx-sap" dir="ltr">{a.k}</span>
                            <div className="ns4-abap-b">
                              <p><Rtl s={a.note} /></p>
                              {a.code ? <code className="ns4-code" dir="ltr">{a.code}</code> : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {(o.checklist || []).length ? (
                    <div className="ns4-sub">
                      <h4 className="ns4-h4"><ClipboardList size={12} strokeWidth={2} aria-hidden="true" /> נקודות לבדיקה בפרויקט</h4>
                      <ul className="ns4-check">
                        {(o.checklist || []).map((c, i) => <li key={i}><Rtl s={c} /></li>)}
                      </ul>
                    </div>
                  ) : null}

                  <footer className="ns4-obj-f">
                    {o.relatedLinks.length ? (
                      <div className="ns4-kv">
                        <span className="ns4-lbl">קשורים</span>
                        <Chips items={o.relatedLinks} />
                      </div>
                    ) : null}
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
