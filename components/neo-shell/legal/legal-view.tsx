/* The three legal documents, rendered from legal-content.ts. One view for the
   NEO routes (/neo/privacy/, /neo/terms/, /neo/accessibility/) and for the
   legacy /privacy/ that the Play Store listing points at, so the two can never
   say different things. Every "owner" block renders as a visible marker with
   the REQUIRES_OWNER_INPUT token, and the header counts them: a draft says it is
   a draft. Styles: app/neo/legal.css (scoped to .nlg, with fallbacks, because
   the legacy route renders outside the NEO shell). */

import Link from "next/link";
import { LEGAL_DOCS, type LegalBlock, type LegalDoc } from "./legal-content";

function Block({ b }: { b: LegalBlock }) {
  if (b.t === "p") return <p>{b.text}</p>;
  if (b.t === "ul") return <ul>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
  return (
    <p className="nlg-owner" data-owner="REQUIRES_OWNER_INPUT">
      <b>ממתין לבעל האתר:</b> {b.what}. <code dir="ltr">REQUIRES_OWNER_INPUT</code>
    </p>
  );
}

export function LegalView({ doc }: { doc: LegalDoc }) {
  const pending = doc.sections.reduce((n, s) => n + s.blocks.filter((b) => b.t === "owner").length, 0);
  return (
    <article className="nlg" dir="rtl">
      <header className="nlg-head">
        <h1>{doc.title}</h1>
        <p className="nlg-lede">{doc.lede}</p>
        <p className="nlg-meta">עודכן: {doc.revised}</p>
        {pending ? (
          <p className="nlg-draft">
            זו טיוטה: {pending} פרטים ממתינים להשלמה מבעל האתר, וכל אחד מהם מסומן במקומו בטקסט.
          </p>
        ) : null}
      </header>

      <nav className="nlg-toc" aria-label={`תוכן: ${doc.title}`}>
        <ol>
          {doc.sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.h}</a></li>
          ))}
        </ol>
      </nav>

      <div className="nlg-body">
        {doc.sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
            <h2 id={`${s.id}-h`}>{s.h}</h2>
            {s.blocks.map((b, i) => <Block key={i} b={b} />)}
          </section>
        ))}
      </div>

      <nav className="nlg-other" aria-label="מסמכים נוספים">
        {Object.values(LEGAL_DOCS).filter((d) => d.slug !== doc.slug).map((d) => (
          <Link key={d.slug} href={`/neo/${d.slug}/`} prefetch={false}>{d.title}</Link>
        ))}
      </nav>
    </article>
  );
}
