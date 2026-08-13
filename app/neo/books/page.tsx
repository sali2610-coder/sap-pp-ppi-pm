import Link from "next/link";
import { Library, Table2 } from "lucide-react";
import "../books.css";
import { booksData } from "@/components/neo-shell/books/books-data";
import { BookShelf } from "@/components/neo-shell/books/book-shelf";

export const metadata = {
  title: "ספרים · Project NEO",
  description: "מדף הספרים של Project NEO — אחד עשר ספרי SAP כאובייקטים, והדרך מהם אל המילון הטכני.",
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
      <header className="nb-mast">
        <p className="nb-eye">
          CBC ISRAEL · PROJECT NEO
          <i aria-hidden="true" />
          מדף הספרים
        </p>
        <h1 className="nb-mega">
          {d.totals.books} ספרים.
          <span className="nb-mega-2">לא רשימה — מדף.</span>
        </h1>
        <p className="nb-lede">
          {nf.format(d.totals.chapters)} פרקים ו־{nf.format(d.totals.sections)} ערכים,
          פרושים על {d.totals.modules} מודולים של SAP. כל כריכה כאן משורטטת מהמטא-דאטה של
          הספר עצמו — המודול הוא צבע הכריכה, הכותרת היא הכותרת האמיתית, ומספר העמודים הוא
          זה שמופיע במאגר. אין תמונות עטיפה בפרויקט, ולכן גם לא הומצאה אחת.
        </p>

        <div className="nb-stats">
          {([
            [nf.format(d.totals.books), "ספרים"],
            [nf.format(d.totals.chapters), "פרקים"],
            [nf.format(d.totals.sections), "ערכים"],
            [nf.format(d.totals.pages), "עמודים מתועדים"],
            [nf.format(d.totals.modules), "מודולים"],
          ] as [string, string][]).map(([n, l]) => (
            <span className="nb-stat" key={l}>
              <b className="nb-sap">{n}</b>
              <em>{l}</em>
            </span>
          ))}
        </div>

        {d.totals.pagesMissing > 0 && (
          <p className="nb-note">
            {d.totals.pagesMissing === 1
              ? "לספר אחד אין ספירת עמודים במטא-דאטה, והוא אינו נספר בסכום העמודים. הכרטיס שלו אומר זאת במפורש במקום להציג אפס."
              : `ל-${d.totals.pagesMissing} ספרים אין ספירת עמודים במטא-דאטה, והם אינם נספרים בסכום העמודים.`}
          </p>
        )}
      </header>

      <section className="nb-dictbar" aria-label="כיסוי המילון הטכני">
        <p className="nb-dictbar-t">
          <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
          המילון הטכני של NEO מתעד שני מודולים מתוך {d.totals.modules}
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
          {d.totals.withDict} מתוך {d.totals.books} הספרים נשענים על מודול שיש לו מילון טכני.
          בכרטיס של כל ספר אחר כתוב במפורש שאין לו כיסוי במילון, במקום קישור שרומז אחרת.
        </p>
      </section>

      <BookShelf data={d} />

      {d.twinNote && <p className="nb-note nb-note--wide">{d.twinNote}</p>}

      <footer className="nb-foot">
        <Link className="nb-btn" href="/neo/library/" prefetch={false}>
          <Library size={15} strokeWidth={1.75} aria-hidden="true" />
          הספרייה הדיגיטלית
        </Link>
        <p className="nb-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
      </footer>
    </div>
  );
}
