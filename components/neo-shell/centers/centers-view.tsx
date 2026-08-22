/* ============================================================================
   PROJECT NEO · CENTERS — the hub and the detail surface
   ----------------------------------------------------------------------------
   A shared template is allowed; loss of information is not. Every field the
   legacy center detail rendered travels through here: all five section types
   (text / bullets / steps / chips / linkchips), each section's tone, the item's
   tag, module and accent, and the ECC→S/4HANA verdict. Nothing is summarised.

   The one thing this surface adds is HONESTY ABOUT COVERAGE. The legacy grid
   showed a card per item and said nothing about which items carry a validated
   S/4 verdict, so a reader could reasonably assume they all do. Here the count
   is stated, and an item without a verdict says so rather than rendering an
   empty block that looks like a missing value.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, Layers, ListTree, Sparkles } from "lucide-react";
import type { CenterItem } from "@/components/topic-center";
import { CENTER_FAMILIES, centerTotals, type CenterFamily } from "./centers-data";

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
          {t.families} מרכזים, {nf.format(t.items)} נושאים ו־{nf.format(t.sections)} מקטעי תוכן.
          כל נושא נכתב כיחידת עבודה: מטרה, מתי להשתמש, צ׳ק ליסט, מלכודות נפוצות ואימות.
          {" "}{t.withS4} מהנושאים נושאים הכרעת מעבר ל־<span className="nct-sap">S/4HANA</span> מאומתת.
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
              פתח את המרכז
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
          מרכז ידע
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

export function CenterDetailView({ fam, item }: { fam: CenterFamily; item: CenterItem }) {
  return (
    <article className="nct nct-detail nm-scene" data-surface="centers" data-scene="cream"
      style={{ "--ct": item.accent } as React.CSSProperties}>
      <header className="nct-hero nct-hero--item">
        <p className="nct-eye">
          <Link href={`/neo/centers/${fam.id}/`} prefetch={false} className="nct-back">{fam.he}</Link>
          <i aria-hidden="true" />
          <span className="nct-sap" dir="ltr">{item.eyebrow}</span>
        </p>
        <h1 className="nct-h1">{item.he}</h1>
        <p className="nct-h1-en" dir="ltr">{item.title}</p>
        <p className="nct-lede">{item.sub}</p>
        <div className="nct-hero-tags">
          {item.module ? <span className="nct-tag nct-tag--mod">{item.module}</span> : null}
          {item.tag ? <span className="nct-tag">{item.tag}</span> : null}
        </div>
      </header>

      <div className="nct-secs">
        {item.sections.map((s, i) => (
          <section key={i} className="nct-sec nm-rise nm-once"
            style={{ "--st": s.tone || "var(--ct)", "--nm-i": i } as React.CSSProperties}>
            <h2 className="nct-sec-h"><i aria-hidden="true" />{s.title}</h2>

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
          </section>
        ))}

        {/* THE S/4 VERDICT, OR AN HONEST ABSENCE.
            The legacy detail simply omitted this block when eccS4 was missing,
            which on a platform whose whole premise is the migration reads as
            "no change" rather than as "not documented". It says which. */}
        {item.eccS4 ? (
          <section className="nct-sec nct-s4">
            <h2 className="nct-sec-h"><i aria-hidden="true" />ECC ← S/4HANA</h2>
            <p className="nct-s4-changed">{item.eccS4.changed}</p>
            {item.eccS4.migration ? (
              <p className="nct-p"><b>המעבר: </b>{item.eccS4.migration}</p>
            ) : null}
          </section>
        ) : (
          <section className="nct-sec nct-s4 nct-s4--none">
            <h2 className="nct-sec-h"><i aria-hidden="true" />ECC ← S/4HANA</h2>
            <p className="nct-p nct-none">
              לנושא הזה לא תועדה הכרעת מעבר במאגר. הריק כאן מכוון, ואינו אומר שאין שינוי.
            </p>
          </section>
        )}
      </div>

      <p className="nct-foot">
        <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
        התוכן מוצג כפי שנכתב במאגר הפרויקט. לא נוסחו כאן עובדות SAP חדשות.
      </p>
    </article>
  );
}
