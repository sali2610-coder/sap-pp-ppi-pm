import Link from "next/link";
import { Library, Table2 } from "lucide-react";
// The interaction system first, this page's own sheet second, so a .nb rule can
// refine a .nu- control without an !important.
import "../ui.css";
import "../books.css";
import { booksData } from "@/components/neo-shell/books/books-data";
import { BookShelf } from "@/components/neo-shell/books/book-shelf";

export const metadata = {
  title: "ספריית SAP · Project NEO",
  description: "ספריית SAP של Project NEO: ספרי SAP לפי מודול, תוכן העניינים של כל ספר והקישור לתיעוד הטכני.",
  robots: { index: false, follow: false },
};

const nf = new Intl.NumberFormat("he-IL");

// STAGE 2B · THE BOOKS ENTRY.
//
// This page is a DOORWAY, not a reader. Everything it knows is read on the
// SERVER at build time through the existing book registry, and the only way
// forward from it is a plain link to the existing /library/<id>/ page — which
// this stage does not touch, restyle, wrap or re-implement.
//
// Not one count below is authored. Chapters, sections, pages, publisher and
// module all come from each book's own metadata; the two dictionary figures
// come from the same overviewStats() the module pages render from.
export default function NeoBooks() {
  const d = booksData();

  return (
    <div className="nb">
      {/* THE OPENING, ON ITS OWN GROUND.
          app/neo/ground.css reserves `deep` for "a moment that is meant to feel
          like a held breath — a hero, an opening, a statement", and it is the
          one scene that is the same warm dark in both themes. Arriving at the
          shelf is that moment. The shelves themselves then move to `cream`
          (see components/neo-shell/books/book-shelf.tsx), which is the reading
          ground — so the page reads as walking out of a dark hall and up to a
          lit shelf, using two of the five scenes that already exist rather than
          inventing a sixth. */}
      <div className="nb-open nb-scene nm-scene" data-scene="deep">
      <header className="nb-mast nm-rise nm-once">
        <p className="nb-eye">
          CBC ISRAEL · PROJECT NEO
          <i aria-hidden="true" />
          מדף הספרים
        </p>
        {/* Kinetic type, per motion.css: the outer span is the mask, the inner
            span is what rises out of it. The structure is the primitive's
            contract and cannot be flattened. */}
        <h1 className="nb-mega nm-kin">
          <span><span>ספריית SAP</span></span>
          <span><span className="nb-mega-2">{d.totals.books} ספרים</span></span>
        </h1>
        <p className="nb-lede">
          {nf.format(d.totals.chapters)} פרקים ו-{nf.format(d.totals.sections)} תת-פרקים
          ב-{d.totals.modules} מודולים של SAP. כרטיס הספר מציג את תוכן העניינים עד רמת
          תת-הפרק, וכל שורה בו נפתחת בקורא של Project NEO.
        </p>

        <div className="nb-stats nm-seq">
          {([
            [nf.format(d.totals.books), "ספרים"],
            [nf.format(d.totals.chapters), "פרקים"],
            [nf.format(d.totals.sections), "תת-פרקים"],
            [nf.format(d.totals.pages), "עמודים מתועדים"],
            [nf.format(d.totals.modules), "מודולים"],
          ] as [string, string][]).map(([n, l], i) => (
            <span className="nb-stat nm-fade" key={l} style={{ "--nm-i": i } as React.CSSProperties}>
              <b className="nb-sap">{n}</b>
              <em>{l}</em>
            </span>
          ))}
        </div>

        {d.totals.pagesMissing > 0 && (
          <p className="nb-note">
            {d.totals.pagesMissing === 1
              ? "לספר אחד אין ספירת עמודים במטא-דאטה, והוא אינו נכלל בסכום העמודים."
              : `ל-${d.totals.pagesMissing} ספרים אין ספירת עמודים במטא-דאטה, והם אינם נכללים בסכום העמודים.`}
          </p>
        )}
      </header>

      <section className="nb-dictbar nm-rise nm-once" aria-label="כיסוי התיעוד הטכני">
        <p className="nb-dictbar-t">
          <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
          התיעוד הטכני של Project NEO מכסה {d.dictModules.length} מודולים מתוך {d.totals.modules}
        </p>
        <div className="nb-dictbar-l">
          {d.dictModules.map((m) => (
            <Link
              key={m.code}
              className="nb-dictbar-a"
              href={m.href}
              prefetch={false}
              style={{ "--m": m.mod } as React.CSSProperties}
            >
              <span className="nb-sap">{m.code}</span>
              <span>{m.he}</span>
              <em className="nb-sap">{nf.format(m.tables)} טבלאות</em>
            </Link>
          ))}
        </div>
        <p className="nb-note">
          {d.totals.withDict} מתוך {d.totals.books} הספרים שייכים למודול שיש לו תיעוד טכני במאגר.
          בכרטיס של שאר הספרים מצוין שלמודול שלהם לא קיים תיעוד טכני.
        </p>
      </section>
      </div>

      <BookShelf data={d} />

      {d.twinNote && <p className="nb-note nb-note--wide nm-fade">{d.twinNote}</p>}

      <footer className="nb-foot nm-fade">
        {/* The button names the DIGITAL LIBRARY — the canonical /library/ site,
            not this shelf. It used to link back to the page it sits on. */}
        <Link className="nu-btn2" href="/library/" prefetch={false}>
          <Library size={15} strokeWidth={1.75} aria-hidden="true" />
          הספרייה הדיגיטלית
        </Link>
        <p className="nb-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
      </footer>
    </div>
  );
}
