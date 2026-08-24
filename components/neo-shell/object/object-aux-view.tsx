/* ============================================================================
   PROJECT NEO · THE SUPPLEMENTAL OBJECT PAGE.
   ----------------------------------------------------------------------------
   SERVER component. The 81 objects that are not in the PM/PP-PI blueprint get
   this page instead of the blueprint workspace.

   THE DESIGN DECISION THAT MATTERS HERE

     The temptation with a thinner record is to fill the same eleven sections
     and let the empty ones read as "not applicable". That produces a page that
     LOOKS like a documented object and is not one — the exact failure the whole
     product is built to avoid. So this page renders only the sections its
     registry can actually fill, and it opens by NAMING the registry it came
     from and what that registry does and does not carry. A reader knows within
     one line whether they are looking at blueprint depth or reference depth.

   It reuses the object page's own chrome — .no / .no-hero / .no-sec / .no-stat —
   because it IS an object page, not a second visual language. The handful of
   .nox-* rules in app/neo/object.css cover the two things this page has and the
   blueprint page does not: an alias cloud and a cross-module domain card.
   ========================================================================== */

import Link from "next/link";
import {
  BadgeCheck, Boxes, Cable, Columns3, GitBranch, Info, KeyRound, Layers,
  Route, Search, ShieldQuestion, Table2, Terminal,
} from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { ObjectReturn } from "./object-return";
import { auxSummary, type AuxLink, type AuxView } from "./object-aux";

const nf = new Intl.NumberFormat("he-IL");

/** Object-class hue for the two supplemental families. HR and BW are not
 *  functional zones of the blueprint, so they do not borrow a zone colour: they
 *  take the neutral "text" object token, which is what the palette already uses
 *  for an object whose class the project does not classify. */
const FAM_OBJ: Record<string, string> = {
  HR: "var(--obj-master)",
  BW: "var(--obj-structure)",
};

function Sec({
  id, n, icon, eyebrow, title, lede, children,
}: {
  id: string; n: number; icon: React.ReactNode; eyebrow: string;
  title: string; lede?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="no-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="no-sec-h">
        <span className="no-sec-n" aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <p className="no-sec-k">
          <span className="no-sec-ico" aria-hidden="true">{icon}</span>
          {eyebrow}
        </p>
        <h2 className="no-h2" id={`${id}-h`}>{title}</h2>
        {lede ? <p className="no-sec-s">{lede}</p> : null}
      </header>
      <div className="no-sec-b">{children}</div>
    </section>
  );
}

/** An identifier chip. A destination when the project generates the page, plain
 *  text when it does not — the value is never withheld, only the link is. */
function Chip({ l }: { l: AuxLink }) {
  const body = (
    <>
      <b className="nx-sap" dir="ltr">{l.t}</b>
      {l.he ? <em>{l.he}</em> : null}
    </>
  );
  return l.href
    ? <Link className="nox-chip" href={l.href} prefetch={false} data-live="1">{body}</Link>
    : <span className="nox-chip" data-live="0">{body}</span>;
}

function Chips({ items, empty }: { items: AuxLink[]; empty: string }) {
  if (!items.length) return <p className="no-silent">{empty}</p>;
  return <div className="nox-chips">{items.map((l) => <Chip key={l.t} l={l} />)}</div>;
}

export function AuxObjectPage({ v }: { v: AuxView }) {
  const s = auxSummary(v);
  const from = { href: `/neo/object/${v.name}/`, label: "אובייקט", detail: v.name };
  const obj = FAM_OBJ[v.family] || "var(--obj-text)";

  /* WHAT THIS REGISTRY CARRIES, SAID OUT LOUD.
     Not a disclaimer at the bottom — the first paragraph on the page, because it
     is the single most important thing a consultant needs to know before they
     read anything below it. */
  const provenance = v.source === "hrbw"
    ? "הרשומה מגיעה ממרשם ה-HR/BW של הפרויקט: טבלת מילון אמיתית שאינה חלק מתכנון ההגירה של PM ו-PP-PI. היא נושאת מפתח, שדות, קשרים וטרנזקציות משלה, ואינה מופיעה במודל ה-ER — למודל הזה יש גבול מוגדר, ולא הוספנו לו צמתים."
    : "הרשומה מגיעה ממרשם האובייקטים המאומתים: אובייקט SAP סטנדרטי חוצה-מודולים שנשמר כדי שחיפוש אמיתי לא יחזיר “לא נמצא”. במכוון הוא אינו נושא רשימת שדות — הפרויקט לא אימת אחת, ולכן לא נכתבה כאן.";

  const stats: [string, string][] = v.source === "hrbw"
    ? [
        [nf.format(s.fields), "שדות מתועדים"],
        [nf.format(s.keys), "שדות מפתח"],
        [nf.format(s.relations), "קשרים מוצהרים"],
        [nf.format(s.tcodes), "טרנזקציות"],
      ]
    : [
        [nf.format(v.modules.length), "מודולים משתמשים"],
        [nf.format(s.related), "אובייקטים קשורים"],
        [nf.format(s.tcodes), "טרנזקציות"],
        [nf.format(v.aliases.length), "שמות נרדפים"],
      ];

  const nav: [string, string][] = [];
  const push = (id: string, he: string) => { nav.push([id, he]); return nav.length; };

  const nIdent = push("nox-what", "מה האובייקט הזה");
  const nFields = v.fields.length ? push("nox-fields", "שדות ומפתח") : 0;
  const nRel = v.relations.length ? push("nox-rel", "קשרים") : 0;
  const nAlias = v.aliases.length ? push("nox-alias", "שמות וחיפוש") : 0;
  const nUse = v.useCases.length || v.ppPi ? push("nox-use", "שימוש בפועל") : 0;
  const nTx = push("nox-tx", "טרנזקציות ואובייקטים");
  const nS4 = push("nox-s4", "ECC ו-S/4HANA");
  const nDomain = v.domain ? push("nox-domain", "התחום הלוגיסטי") : 0;
  const nSib = v.siblings.length ? push("nox-sib", "באותו אזור") : 0;

  return (
    <div className="no nox" style={{ "--o": obj } as React.CSSProperties}>
      <ObjectReturn />

      {/* ==================================================== IDENTITY */}
      <header className="no-hero nm-rise nm-once">
        <div className="no-hero-copy">
          <p className="no-eye">
            <OriginLink href="/neo/tables/" origin={from}>עיון</OriginLink>
            <i aria-hidden="true" />
            {v.familyHe}
            <i aria-hidden="true" />
            {v.source === "hrbw" ? "טבלת SAP" : "אובייקט מאומת"}
          </p>

          <h1 className="no-mega">
            <span className="no-cls" aria-hidden="true" />
            <span className="nx-sap">{v.name}</span>
          </h1>

          <p className="no-lede">{v.he || "המרשם אינו מחזיק תיאור עברי לאובייקט הזה."}</p>
          {v.en ? <p className="no-en nx-sap">{v.en}</p> : null}

          <ul className="no-mods" aria-label="שיוך">
            <li style={{ "--m": obj } as React.CSSProperties}>
              <span className="no-mod-bar" aria-hidden="true" />
              <b>{v.family}</b>
              <em>{v.area || v.familyHe}</em>
            </li>
            {v.landscape ? (
              <li className="no-mods-cls">
                <i aria-hidden="true" />
                נוף מערכות · {v.landscape}
              </li>
            ) : null}
            {v.statusHe ? (
              <li className="no-mods-cls">
                <i aria-hidden="true" />
                מצב אימות · {v.statusHe}
              </li>
            ) : null}
          </ul>

          {v.pk.length ? (
            <p className="no-keyline">
              <span className="no-keyline-g" data-k="PK">
                <b>PK</b>
                {v.pk.map((f) => <span key={f} className="nx-sap" dir="ltr">{f}</span>)}
              </span>
            </p>
          ) : null}

          <div className="no-stats">
            {stats.map(([n, l]) => (
              <span className="no-stat" key={l}>
                <b className="nx-sap">{n}</b>
                <em>{l}</em>
              </span>
            ))}
          </div>
        </div>
      </header>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {/* ======================================================== WHAT */}
      <Sec
        id="nox-what" n={nIdent}
        icon={<Info size={15} strokeWidth={1.75} />}
        eyebrow="מקור הרשומה"
        title="מה האובייקט הזה, ומאיפה הידע"
        lede="לפני כל שדה: מאיזה מרשם הדף הזה נבנה, ומה המרשם הזה מכיל."
      >
        <p className="no-quote">{provenance}</p>
        {v.guide ? <p className="no-guide">{v.guide}</p> : null}
        {v.modules.length > 1 ? (
          <p className="no-note">
            <Layers size={14} strokeWidth={1.75} aria-hidden="true" />
            {" "}מודולים שמשתמשים באובייקט לפי המרשם: {v.modules.join(" · ")}.
          </p>
        ) : null}
      </Sec>

      {/* ====================================================== FIELDS */}
      {nFields ? (
        <Sec
          id="nox-fields" n={nFields}
          icon={<Columns3 size={15} strokeWidth={1.75} />}
          eyebrow="מילון"
          title="שדות ומפתח"
          lede={`${nf.format(v.fields.length)} שדות כפי שהמרשם רשם אותם. אורך ריק נשאר ריק.`}
        >
          <table className="nox-tbl">
            <thead>
              <tr>
                <th scope="col">מפתח</th>
                <th scope="col">שדה</th>
                <th scope="col">משמעות</th>
                <th scope="col">אורך</th>
              </tr>
            </thead>
            <tbody>
              {v.fields.map((f) => (
                <tr key={f.tech} data-k={f.key.toUpperCase()}>
                  <td>
                    {f.key.toUpperCase() === "PK" ? (
                      <span className="nox-k" data-k="PK"><KeyRound size={11} strokeWidth={2.25} aria-hidden="true" />PK</span>
                    ) : f.key && f.key !== "-" ? (
                      <span className="nox-k" data-k="FK">{f.key}</span>
                    ) : (
                      <span className="nox-k" data-k="-" aria-label="לא שדה מפתח">·</span>
                    )}
                  </td>
                  <td><b className="nx-sap" dir="ltr">{f.tech}</b></td>
                  <td>{f.en || <span className="no-none">—</span>}</td>
                  <td className="nx-sap" dir="ltr">{f.len || <span className="no-none">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sec>
      ) : null}

      {/* =================================================== RELATIONS */}
      {nRel ? (
        <Sec
          id="nox-rel" n={nRel}
          icon={<GitBranch size={15} strokeWidth={1.75} />}
          eyebrow="קשרים"
          title="מה תלוי במה"
          lede="הקשרים כפי שהמרשם מצהיר עליהם. אין כאן JOIN — המרשם אינו מנסח אחד, ולא נוסח כאן."
        >
          <ul className="no-rels">
            {v.relations.map((r) => (
              <li key={`${r.role}:${r.table}`} className="no-rel-row">
                <span className="no-rel-dir">{r.role === "child" ? "בן" : "אב"}</span>
                <span className="no-rel-name">
                  {r.href
                    ? <Link className="nx-sap" href={r.href} prefetch={false} dir="ltr">{r.table}</Link>
                    : <b className="nx-sap" dir="ltr">{r.table}</b>}
                  {r.card ? <em className="nx-sap" dir="ltr">{r.card}</em> : null}
                </span>
                <span className="nox-rel-desc">{r.desc || <span className="no-none">המרשם לא ניסח את הקשר במילים.</span>}</span>
              </li>
            ))}
          </ul>
        </Sec>
      ) : null}

      {/* ================================================== ALIAS CLOUD */}
      {nAlias ? (
        <Sec
          id="nox-alias" n={nAlias}
          icon={<Search size={15} strokeWidth={1.75} />}
          eyebrow="חיפוש"
          title="באילו שמות מחפשים את זה"
          lede="השמות הנרדפים והמונחים שהמרשם רושם, בעברית ובאנגלית. הם קיימים כדי שחיפוש אמיתי יגיע לכאן."
        >
          <div className="nox-cloud">
            {v.aliases.map((a) => <span key={a} className="nox-alias">{a}</span>)}
          </div>
          {v.keywords.length ? (
            <>
              <h3 className="no-h3">תחומים ותהליכים</h3>
              <div className="nox-cloud" data-tone="soft">
                {v.keywords.map((k) => <span key={k} className="nox-alias">{k}</span>)}
              </div>
            </>
          ) : null}
        </Sec>
      ) : null}

      {/* ======================================================== USE */}
      {nUse ? (
        <Sec
          id="nox-use" n={nUse}
          icon={<Route size={15} strokeWidth={1.75} />}
          eyebrow="בשטח"
          title="שימוש בפועל"
          lede="מקרי השימוש כפי שנכתבו במרשם. לא נוסחו כאן מקרים חדשים."
        >
          {v.ppPi ? (
            <div className="nox-pppi">
              <h3 className="no-h3">בזרימת PP-PI</h3>
              <p className="no-quote">{v.ppPi}</p>
            </div>
          ) : null}
          {v.useCases.length ? (
            <ol className="nox-steps">
              {v.useCases.map((u, i) => (
                <li key={i}><span className="nox-step-n">{i + 1}</span><span>{u}</span></li>
              ))}
            </ol>
          ) : null}
        </Sec>
      ) : null}

      {/* ================================================ TX / OBJECTS */}
      <Sec
        id="nox-tx" n={nTx}
        icon={<Terminal size={15} strokeWidth={1.75} />}
        eyebrow="הפעלה"
        title="טרנזקציות ואובייקטים קשורים"
        lede={
          s.tcodes
            ? `${nf.format(s.tcodes)} טרנזקציות במרשם, ${nf.format(s.linkedTcodes)} מהן עם דף במרשם הטרנזקציות של הפרויקט.`
            : "המרשם אינו רושם טרנזקציה לאובייקט הזה."
        }
      >
        <h3 className="no-h3">טרנזקציות</h3>
        <Chips items={v.tcodes} empty="המרשם אינו רושם טרנזקציה לאובייקט הזה." />

        {v.related.length || v.source === "verified" ? (
          <>
            <h3 className="no-h3">אובייקטים קשורים</h3>
            <Chips items={v.related} empty="המרשם אינו רושם אובייקטים קשורים." />
          </>
        ) : null}

        {v.cds.length ? (
          <>
            <h3 className="no-h3">תצוגות CDS</h3>
            <Chips items={v.cds} empty="" />
          </>
        ) : null}

        {v.funcs.length ? (
          <>
            <h3 className="no-h3">מודולי פונקציה</h3>
            <Chips items={v.funcs} empty="" />
          </>
        ) : null}

        {v.fiori ? (
          <>
            <h3 className="no-h3">אפליקציית Fiori</h3>
            <p className="no-raw nx-sap" dir="ltr">{v.fiori.t}</p>
          </>
        ) : null}
      </Sec>

      {/* ========================================================= S/4 */}
      <Sec
        id="nox-s4" n={nS4}
        icon={<BadgeCheck size={15} strokeWidth={1.75} />}
        eyebrow="מעבר"
        title="ECC ו-S/4HANA"
        lede="מה שהמרשם כותב על זמינות האובייקט, מילה במילה. לא הופעל כאן פותר ה-S/4 של תכנון ההגירה — הוא ממופה על טבלאות התכנון, ותשובה שלו על אובייקט שאינו שם הייתה נשמעת כמו ידע ואינה כזאת."
      >
        <dl className="no-kv">
          {v.ecc ? (<><dt>ECC</dt><dd>{v.ecc}</dd></>) : null}
          {v.s4 ? (<><dt>S/4HANA</dt><dd>{v.s4}</dd></>) : null}
          {v.s4alt ? (<><dt>אובייקט חלופי</dt><dd className="nx-sap" dir="ltr">{v.s4alt}</dd></>) : null}
        </dl>
        {!v.ecc && !v.s4 ? (
          <p className="no-silent">
            <ShieldQuestion size={14} strokeWidth={1.75} aria-hidden="true" />
            {" "}המרשם אינו מחזיק הצהרת זמינות ל-ECC או ל-S/4HANA עבור האובייקט הזה. הריק מכוון, ואינו אומר שאין שינוי.
          </p>
        ) : null}
      </Sec>

      {/* ====================================================== DOMAIN */}
      {nDomain && v.domain ? (
        <Sec
          id="nox-domain" n={nDomain}
          icon={<Boxes size={15} strokeWidth={1.75} />}
          eyebrow="תחום נתונים"
          title={`${v.domain.he} · ${v.domain.en}`}
          lede={v.domain.component}
        >
          <p className="no-quote">{v.domain.summary}</p>
          <h3 className="no-h3">טבלאות הליבה של התחום</h3>
          <Chips
            items={v.domain.members.map((m) => ({
              t: m,
              href: m === v.name ? null : `/neo/object/${encodeURIComponent(m)}/`,
            }))}
            empty=""
          />
          <h3 className="no-h3">נקודות אינטגרציה מאומתות</h3>
          <ul className="nox-int">
            {v.domain.connections.map((c) => (
              <li key={c.module}>
                <b className="nx-sap" dir="ltr">{c.module}</b>
                <span>{c.he}</span>
              </li>
            ))}
          </ul>
        </Sec>
      ) : null}

      {/* ==================================================== SIBLINGS */}
      {nSib ? (
        <Sec
          id="nox-sib" n={nSib}
          icon={<Table2 size={15} strokeWidth={1.75} />}
          eyebrow="הקשר"
          title={`אובייקטים נוספים באזור ${v.area}`}
          lede="לא קשר מודלי — פשוט מה שהמרשם ממקם באותו אזור."
        >
          <Chips items={v.siblings} empty="" />
        </Sec>
      ) : null}

      <p className="no-credit nm-fade nm-once">
        <Cable size={13} strokeWidth={1.75} aria-hidden="true" />
        {" "}Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding
      </p>
    </div>
  );
}
