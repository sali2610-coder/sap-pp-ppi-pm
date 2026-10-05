/* What a link into the NEO reader asked for, read off the opening address the
   reader froze when it mounted (see `url` in neo-reader.tsx).

   Kept out of neo-reader.tsx, and free of imports, so the test runner can load
   it: it cannot parse TSX.

   `s` and `c` are the reader's existing contract (components/neo-shell/books/
   links.ts), with the older `#sec-` and `#ch-` fragments still honoured. `q` is
   the one thing a citation adds: the verified sentence to mark once the cited
   subchapter is on the page. It never decides where the reader lands. */

export interface Asked {
  /** A section id, matched by the reader against this book's real sections. */
  section: string;
  /** A chapter number. `Number("")`, so 0, when the address names none. */
  chapter: number;
  /** The verified sentence a citation rests on, or null. */
  quote: string | null;
}

export function askedFor(url: string | null): Asked {
  const [search, hash = ""] = (url ?? "").split("#");
  const p = new URLSearchParams(search);
  return {
    section: p.get("s") || (hash.startsWith("sec-") ? hash.slice(4) : ""),
    chapter: Number(p.get("c") || (hash.startsWith("ch-") ? hash.slice(3) : "")),
    quote: (p.get("q") || "").trim() || null,
  };
}
