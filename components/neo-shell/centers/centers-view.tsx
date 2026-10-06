/* ============================================================================
   PROJECT NEO · CENTERS — the hub and the detail surface
   ----------------------------------------------------------------------------
   A shared template is allowed; loss of information is not. Every field the
   legacy center detail rendered travels through here: all five section types
   (text / bullets / steps / chips / linkchips), each section's tone, the item's
   tag, module and accent, and the ECC→S/4HANA verdict. Nothing is summarised.

   THE TOPIC PAGE IN THE RECORD LANGUAGE (2026-10, components/neo-shell/
   record-kit.tsx and app/neo/record.css): the catalog's hero, every section as
   the catalog's Sig, the module as a ring and a tint (the item's accent and
   each section's tone were painted as markers; the eleven accents included
   violet and brand red, so they are no longer drawn), the contextual return,
   and the credit at the foot. The S/4HANA section now carries every dimension
   the item records: it showed two (what changes, the migration impact) of the
   eight the legacy topic page rendered through EccS4Block.

   The one thing this surface adds is HONESTY ABOUT COVERAGE. The legacy grid
   showed a card per item and said nothing about which items carry a validated
   S/4 verdict, so a reader could reasonably assume they all do. Here the count
   is stated, and an item without a verdict says so rather than rendering an
   empty block that looks like a missing value.
   ========================================================================== */

import Link from "next/link";
import {
  AlignRight, ArrowLeft, ArrowRightLeft, Layers, List, ListOrdered, ListTree, Tags,
} from "lucide-react";
import type { CenterItem } from "@/components/topic-center";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { CopyId } from "../copy-id";
import { RecordHead } from "../record-kit";
import { CatalogFoot, Sig } from "../data/catalog-kit";
import { learnModVar } from "../learn/mod";
import { CENTER_FAMILIES, CENTER_S4_ROWS as S4_ROWS, centerTotals, type CenterFamily } from "./centers-data";

/** The toolkit items are templates and checklists. "Copy template" (design audit
 *  §7) hands the whole item over as plain text: title, purpose line, then every
 *  section with its lines, steps numbered. Nothing is rewritten. */
const templateText = (it: CenterItem): string => [
  `${it.he} · ${it.title}`,
  it.sub,
  "",
  ...it.sections.flatMap((s) => {
    const lines = s.type === "text"
      ? [s.text || ""]
      : (s.items || []).map((x, i) => (s.type === "steps" ? `${i + 1}. ${x}` : `- ${x}`));
    return [s.title, ...lines, ""];
  }),
].join("\n");

const nf = new Intl.NumberFormat("he-IL");

/* --------------------------------------------------------------------- hub */

export function CentersHub() {
  const t = centerTotals();
  return (
    <div className="nct nm-scene" data-surface="centers" data-scene="cream">
      <header className="nct-hero">
        <p className="nct-eye">
          <Layers size={13} strokeWidth={2} aria-hidden="true" />
          מרכזי ידע · CENTERS
        </p>
        <h1 className="nct-h1">מרכזי הידע של הפרויקט</h1>
        <p className="nct-lede">
          {t.families} מרכזים, {nf.format(t.items)} נושאים ו-{nf.format(t.sections)} מקטעי תוכן.
          כל נושא נכתב כיחידת עבודה: מטרה, מתי להשתמש, רשימת בדיקה, מלכודות נפוצות ואימות.
          {" "}{t.withS4} מהנושאים כוללים הכרעת מעבר מתועדת ל-<span className="nct-sap">S/4HANA</span>.
        </p>
        <p className="nx-gate-note">
          כאן: איך עושים. <b>מרכז הידע</b> מסביר מה זה (מושגי SAP), <b>התחומים העסקיים</b> מראים איפה זה קורה בתהליך.
        </p>
      </header>

      <div className="nct-grid">
        {CENTER_FAMILIES.map((f, i) => (
          <Link
            key={f.id}
            href={`/neo/centers/${f.id}/`}
            prefetch={false}
            className="nct-fam nm-rise nm-once"
            style={{ "--nm-i": i } as React.CSSProperties}
          >
            <span className="nct-fam-top">
              <b className="nct-fam-he">{f.he}</b>
              <span className="nct-fam-n">{f.items.length}</span>
            </span>
            <span className="nct-fam-en" dir="ltr">{f.en}</span>
            <span className="nct-fam-lede">{f.lede}</span>
            <span className="nct-fam-go">
              <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
              פתיחת המרכז
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ family */

export function CenterFamilyView({ fam }: { fam: CenterFamily }) {
  const withS4 = fam.items.filter((i) => i.eccS4).length;
  return (
    <div className="nct nm-scene" data-surface="centers" data-scene="cream">
      <header className="nct-hero">
        <p className="nct-eye">
          <ListTree size={13} strokeWidth={2} aria-hidden="true" />
          מרכז הידע
          <i aria-hidden="true" />
          <span className="nct-sap" dir="ltr">{fam.en}</span>
        </p>
        <h1 className="nct-h1">{fam.he}</h1>
        <p className="nct-lede">
          {fam.lede} {fam.items.length} נושאים,
          {withS4 ? ` מתוכם ${withS4} עם הכרעת מעבר ל-S/4HANA.` : " ללא הכרעת מעבר מתועדת."}
        </p>
      </header>

      <ul className="nct-items">
        {fam.items.map((it, i) => (
          <li key={it.slug} className="nm-rise nm-once" style={{ "--nm-i": i } as React.CSSProperties}>
            <Link href={`/neo/centers/${fam.id}/${it.slug}/`} prefetch={false} className="nct-item">
              <span className="nct-item-bar" style={{ background: it.accent }} aria-hidden="true" />
              <span className="nct-item-body">
                <b className="nct-item-he">{it.he}</b>
                <span className="nct-item-en" dir="ltr">{it.title}</span>
                <span className="nct-item-sub">{it.sub}</span>
              </span>
              <span className="nct-item-meta">
                {it.module ? <span className="nct-tag nct-tag--mod">{it.module}</span> : null}
                {it.tag ? <span className="nct-tag">{it.tag}</span> : null}
                {it.eccS4 ? <span className="nct-tag nct-tag--s4">S/4HANA</span> : null}
                <span className="nct-item-n">{it.sections.length} מקטעים</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ detail */

const TYPE_ICON: Record<string, React.ReactNode> = {
  text: <AlignRight size={15} strokeWidth={1.75} />,
  bullets: <List size={15} strokeWidth={1.75} />,
  steps: <ListOrdered size={15} strokeWidth={1.75} />,
  chips: <Tags size={15} strokeWidth={1.75} />,
  linkchips: <Tags size={15} strokeWidth={1.75} />,
};

export function CenterDetailView({ fam, item }: { fam: CenterFamily; item: CenterItem }) {
  const m = learnModVar(item.module);
  const s4 = item.eccS4 ? S4_ROWS.filter((r) => item.eccS4?.[r.key]) : [];
  return (
    <article className="nct nct-detail nrc nm-scene" data-surface="centers" data-scene="cream"
      style={{ "--m": m, "--ct": m } as React.CSSProperties}>
      <SmartReturn fallback={{ href: `/neo/centers/${fam.id}/`, label: fam.he }} />

      <RecordHead
        icon={<Layers size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow={`${fam.he} · ${item.eyebrow}`}
        title={item.he}
        en={item.title || undefined}
        lede={item.sub || undefined}
        actions={fam.id === "toolkit" ? <CopyId value={templateText(item)} label="העתק תבנית" /> : undefined}
        meta={
          item.module || item.tag ? (
            <>
              {item.module ? <span className="nu-chip nxt-mod"><i aria-hidden="true" />{item.module}</span> : null}
              {/* The tag, unless it only repeats the module chip next to it. */}
              {item.tag && item.tag !== item.module ? <span className="nu-chip">{item.tag}</span> : null}
            </>
          ) : undefined
        }
      />

      {/* The sections are independent facets of the topic (scope, actors,
          inputs, …), so on a wide screen they flow in two balanced columns. */}
      <div className="nrc-cols">
      {item.sections.map((s, i) => (
        <Sig key={i} id={`ct-${i + 1}`} icon={TYPE_ICON[s.type] ?? <List size={15} strokeWidth={1.75} />} title={s.title}>
          {s.type === "text" && <p className="nct-p">{s.text}</p>}

          {s.type === "bullets" && (
            <ul className="nct-bul">
              {(s.items || []).map((x, k) => <li key={k}>{x}</li>)}
            </ul>
          )}

          {s.type === "steps" && (
            <ol className="nct-steps">
              {(s.items || []).map((x, k) => (
                <li key={k}><span className="nct-step-n">{k + 1}</span><span>{x}</span></li>
              ))}
            </ol>
          )}

          {(s.type === "chips" || s.type === "linkchips") && (
            <div className="nct-chips">
              {(s.items || []).map((x) => (
                <span key={x} className="nct-chip nx-sap" dir="ltr">{x}</span>
              ))}
            </div>
          )}
        </Sig>
      ))}
      </div>

      {/* THE S/4 VERDICT, OR AN HONEST ABSENCE.
          The legacy detail simply omitted this block when eccS4 was missing,
          which on a platform whose whole premise is the migration reads as
          "no change" rather than as "not documented". It says which. */}
      <Sig
        id="ct-s4"
        icon={<ArrowRightLeft size={15} strokeWidth={1.75} />}
        title="המעבר ל-S/4HANA"
        count={s4.length ? `${nf.format(s4.length)} מתוך ${nf.format(S4_ROWS.length)} ממדים מתועדים` : undefined}
      >
        {s4.length ? (
          <dl className="nxt-grid nct-s4dl">
            {s4.map((r) => (
              <div key={r.key} className="nxt-fact" data-k={r.key}>
                <dt className="nxt-l">{r.he}</dt>
                <dd className="nxt-v">{item.eccS4?.[r.key]}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="nct-p nct-none">
            לנושא זה לא קיימת הכרעת מעבר מתועדת במאגר. נדרש אימות נוסף בהתאם לגרסת המערכת.
          </p>
        )}
      </Sig>

      <CatalogFoot>התוכן מוצג כפי שנכתב בתיעוד הפרויקט.</CatalogFoot>
    </article>
  );
}
