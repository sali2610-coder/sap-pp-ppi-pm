// The cover. Authored, not photographed.
//
// Project NEO is 100% offline and no cover artwork exists for any of the eleven
// books, so a cover here is drawn entirely from the book's own metadata: its
// module (the binding colour), its title, its publisher and its page count. No
// image is fetched, no font is loaded, no glyph is invented.
//
// The physical reading comes from four stacked parts rather than from a photo:
//   spine   — the bound edge, on the INLINE-START side, so a Hebrew book binds
//             on the right and a Latin one on the left without a mirrored sheet
//   board   — the cloth face, a deep ramp of the module hue
//   edge    — the fore-edge, a stack of hairlines that reads as real paper
//   foil    — one bright rule and the module code, the only "print" on the face
//
// It renders identically on the server and on the client and carries no state:
// the tilt lives on the parent, so the same cover is used at shelf size and at
// entry size and can therefore be the shared element between them.

import type { BookCard } from "./books-data";

const nf = new Intl.NumberFormat("he-IL");

/** `book7` -> `07`. The id itself, not a position on the shelf. */
const plate = (id: string) => {
  const n = id.replace(/\D/g, "");
  return n ? n.padStart(2, "0") : id.slice(0, 2).toUpperCase();
};

export function BookCover({ b, size = "shelf" }: { b: BookCard; size?: "shelf" | "entry" }) {
  const main = b.titleHe || b.titleEn;
  const under = b.titleHe ? b.titleEn : null;

  return (
    <span className="nb-cov" data-size={size} data-fit={b.fit} aria-hidden="true">
      <span className="nb-cov-board" />
      <span className="nb-cov-cloth" />
      <span className="nb-cov-spine">
        <span className="nb-cov-spine-n">{plate(b.id)}</span>
      </span>
      <span className="nb-cov-edge" />
      <span className="nb-cov-face">
        <span className="nb-cov-top">
          <span className="nb-cov-mod">{b.module}</span>
          <span className="nb-cov-foil" />
        </span>
        <span className="nb-cov-t" lang={b.titleHe ? "he" : "en"}>{main}</span>
        {under && <span className="nb-cov-t2" lang="en">{under}</span>}
        <span className="nb-cov-rule" />
        <span className="nb-cov-pub">
          <span>{b.publisher ?? "ללא מוציא לאור במטא-דאטה"}</span>
          <span className="nb-cov-pg">
            {b.pages === null ? "עמודים לא מתועדים" : `${nf.format(b.pages)} עמ׳`}
          </span>
        </span>
      </span>
      <span className="nb-cov-gloss" />
    </span>
  );
}
