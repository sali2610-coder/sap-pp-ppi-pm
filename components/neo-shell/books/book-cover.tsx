// THE BOOK AS AN OBJECT — six real faces in CSS 3D, no photograph, no canvas.
//
// The reference deck for this surface renders its book in WebGL: two GL
// canvases, 6.2 MB of payload, eighty images. Project NEO is 100% offline and
// the brief rules out both WebGL and image sequences, so the physicality here is
// built from geometry instead of from pixels. Nothing below is fetched, nothing
// is rasterised, and the whole object is one element tree the browser composites
// on the GPU from transforms alone.
//
// THE GEOMETRY. `.nb-cov` is a plain, transform-free box — it is the layout
// rect, and keeping it clean is load-bearing: the shared-element flight in
// ./quick-view.tsx measures THIS box on both ends, so a book that is turned on
// the shelf still hands the FLIP an honest, unrotated rectangle. Every transform
// lives on `.nb-cov-3d` inside it, which is the `preserve-3d` stage:
//
//   front   the cover. Hinged on the binding edge, so it can open.
//   leaf    the first page, sitting just behind the cover — what you see
//           through the gap once the cover starts to open.
//   spine   the bound edge. A real face, rotated 90° about the binding edge.
//   fore    the page block's outer edge, on the opposite side.
//   top     the head of the text block, rotated 90° about the top edge.
//   back    the back board, one thickness behind the front.
//
// The front face sits at z = 0 and the block extends BACKWARD, which is what
// lets the object be lifted toward the viewer without any face crossing the
// perspective origin.
//
// DIRECTION. 3D rotations are physical; binding is logical. A Hebrew book binds
// on the right and a Latin one on the left, so the sheet carries a single
// `--side` multiplier (-1 RTL, +1 LTR) plus the matching hinge origins, and
// every rotation below is expressed against it rather than duplicated.
//
// HONESTY. Title, module, publisher and page count are the book's own metadata.
// There is no cover art, no author, no subtitle and no blurb in the project, so
// none is drawn. The block's DEPTH is the book's real page count normalised
// across the shelf (books-data.ts); a book with no page count is drawn at the
// midpoint and prints that its pages are undocumented.

import type { BookCard } from "./books-data";
import { coverTitle } from "./cover-title";

const nf = new Intl.NumberFormat("he-IL");

/** The subject's size tier. A cover is set from the SUBJECT, not from the whole
 *  title, which is what lets a two-word subject be large. Two things can force
 *  it down: too many words, or one word too long to fit the printable measure —
 *  "Sales and Operations Planning" and "Prerequisites" fail for opposite
 *  reasons, so both are tested. */
function subjectTier(subject: string): "xl" | "lg" | "md" | "sm" {
  const words = subject.split(/\s+/).filter(Boolean);
  const longest = words.reduce((m, w) => Math.max(m, w.length), 0);

  // Two independent limits, because a subject can fail to fit in two unrelated
  // ways. "Prerequisites" is ONE word that is too wide for the measure;
  // "Sales and Operations Planning" is four short words that are too tall.
  // Sizing on word count alone set "Plant Maintenance" at the largest tier and
  // split it across a line break as "Maintenan / ce", so the longest WORD has
  // to be tested too, and the stricter of the two limits wins.
  const byWord = longest <= 6 ? 0 : longest <= 9 ? 1 : longest <= 13 ? 2 : 3;
  const byCount = words.length <= 2 ? 0 : words.length === 3 ? 1 : words.length === 4 ? 2 : 3;

  return (["xl", "lg", "md", "sm"] as const)[Math.max(byWord, byCount)];
}

/** `book7` -> `07`. The id itself, not a position on the shelf. */
const plate = (id: string) => {
  const n = id.replace(/\D/g, "");
  return n ? n.padStart(2, "0") : id.slice(0, 2).toUpperCase();
};

export function BookCover({
  b,
  size = "shelf",
  /** Draws the front cover hinged back off the block. The entry and hub sizes
   *  use it so the book reads as an opened book rather than a closed one. */
  open = false,
}: {
  b: BookCard;
  size?: "shelf" | "entry";
  open?: boolean;
}) {
  const main = b.titleHe || b.titleEn;
  const under = b.titleHe ? b.titleEn : null;
  const r = coverTitle(main);
  const tier = subjectTier(r.subject);

  return (
    <span
      className="nb-cov"
      data-size={size}
      data-fit={b.fit}
      data-open={open ? "1" : undefined}
      /* Two variables, two different jobs. `--cloth` is what this book is BOUND
         in and is the book's own; `--m`, inherited from the card, is the module
         and stays the colour of everything printed ON the binding. Separating
         them is what turns four PM books from four identical objects into four
         books that still say PM. */
      style={{ "--thick": b.thick, "--cloth": b.cloth } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="nb-cov-3d">
        {/* THE BACK BOARD — one thickness behind the front. */}
        <span className="nb-f nb-f-back" />

        {/* THE TEXT BLOCK. Three faces of paper: the top page you see under an
            opening cover, the head, and the fore-edge. The stripes are a
            repeating gradient, so "paper" costs no asset. */}
        <span className="nb-f nb-f-leaf" />
        <span className="nb-f nb-f-top" />
        <span className="nb-f nb-f-fore" />

        {/* THE SPINE. A real face on the binding edge, carrying the same three
            things a real spine carries: the title, the module, and the shelf
            plate. Nothing else fits on 26 pixels and nothing else is invented. */}
        <span className="nb-f nb-f-spine">
          <span className="nb-sp-head">
            <span className="nb-sp-mod">{b.module}</span>
          </span>
          <span className="nb-sp-t" lang={b.titleHe ? "he" : "en"}>{main}</span>
          <span className="nb-sp-band" />
          <span className="nb-sp-n">{plate(b.id)}</span>
        </span>

        {/* THE FRONT COVER. Hinged on the binding edge — the only face that
            moves independently, which is what makes the open read as an open. */}
        <span className="nb-f nb-f-front">
          <span className="nb-cov-board" />
          <span className="nb-cov-cloth" />

          {/* THE JACKET.
              Four zones, composed like a real technical jacket rather than a
              paragraph of title text:

                head    module plate, hairline, volume numeral
                field   the module code blind-stamped into the cloth. This is
                        the cover's graphic, and it is real metadata rather
                        than ornament, which is why it is allowed to be huge.
                type    seated LOW: foil rule, kicker, subject, platform,
                        subtitle. Seating it low moves the empty space above
                        the type, where it reads as margin instead of as an
                        unfinished cover.
                foot    publisher and extent, letterspaced.

              Every string here is the book's own metadata. Nothing is invented:
              coverTitle() only RANKS the real title and refuses its own output
              if a token would be lost. */}
          <span className="nb-cov-face" data-tier={tier}>
            <span className="nb-cov-frame" aria-hidden="true" />

            <span className="nb-cov-top">
              <span className="nb-cov-mod">{b.module}</span>
              <span className="nb-cov-vol">{plate(b.id)}</span>
            </span>

            <span className="nb-cov-stamp" aria-hidden="true">{b.module}</span>

            <span className="nb-cov-type">
              <span className="nb-cov-foil" />
              {r.kicker && <span className="nb-cov-kick" lang="en">{r.kicker}</span>}
              <span className="nb-cov-subj" lang={b.titleHe ? "he" : "en"}>{r.subject}</span>
              {r.platform && (
                <span className="nb-cov-plat" lang={b.titleHe ? "he" : "en"}>{r.platform}</span>
              )}
              {r.subtitle && (
                <span className="nb-cov-sub" lang={b.titleHe ? "he" : "en"}>{r.subtitle}</span>
              )}
              {/* The English title under a Hebrew one. It is a second real
                  title, not a translation we produced, so it stays. */}
              {under && <span className="nb-cov-alt" lang="en">{under}</span>}
            </span>

            <span className="nb-cov-rule" />
            <span className="nb-cov-pub">
              <span>{b.publisher ?? "ללא מוציא לאור במטא-דאטה"}</span>
              <span className="nb-cov-pg">
                {b.pages === null ? "עמודים לא מתועדים" : `${nf.format(b.pages)} עמ׳`}
              </span>
            </span>
          </span>

          <span className="nb-cov-gloss" />
          {/* THE BOARD'S OWN THICKNESS. A cover is not a plane, and this is the
              face that says so: it hangs off the fore-edge of the front board
              and hinges WITH it, so the thickness swings as the book opens
              instead of sitting there as a painted line. */}
          <span className="nb-cov-edge" aria-hidden="true" />
          {/* The inside of the front board. Only ever seen while the cover is
              open, and only from behind — hence its own face. */}
          <span className="nb-cov-inner" />
        </span>
      </span>

      {/* The contact shadow. Outside the 3D stage on purpose: a shadow belongs
          to the shelf the book stands on, not to the book, so it must not turn
          with it. */}
      <span className="nb-cov-cast" />
    </span>
  );
}
