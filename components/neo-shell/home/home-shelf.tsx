/* ============================================================================
   PROJECT NEO · THE LIBRARY, ON HOME
   ----------------------------------------------------------------------------
   The Books scene was a burgundy background with a headline that said "10
   technical books" and showed none of them. A colour is not a library.

   This renders the actual shelf: the ten validated books as bound objects,
   using the SAME BookCover the library itself uses. Reusing it rather than
   drawing a second, simpler book on purpose — two book renderers in one product
   is how a spine ends up one colour on Home and another in the library.

   It is deliberately NOT the /neo/books shelf. That surface is a client
   component with filters, FLIP transitions and detail panels; Home needs a
   picture, not a second copy of an application. So this is static, server
   rendered, and its only interaction is the link out.
   ========================================================================== */

import Link from "next/link";
import { BookCover } from "@/components/neo-shell/books/book-cover";
import type { BookCard } from "@/components/neo-shell/books/books-data";

export function HomeShelf({ books }: { books: BookCard[] }) {
  return (
    <ul className="nhb-shelf" aria-label={`${books.length} ספרים בספרייה`}>
      {books.map((b, i) => (
        <li
          className="nhb-book nm-rise"
          key={b.id}
          /* The stagger is the shelf being filled left to right, and it rides
             the existing sequence motion rather than adding a new engine. */
          style={{ "--i": i, "--m": b.mod } as React.CSSProperties}
        >
          <Link href={b.hubHref} prefetch={false} className="nhb-link">
            <BookCover b={b} size="shelf" />
            <span className="nhb-meta">
              <b className="nx-sap">{b.module}</b>
              <em>
                {b.chapters} פרקים
                {b.pages ? ` · ${b.pages} עמודים` : ""}
              </em>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
