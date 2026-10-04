/* ============================================================================
   PROJECT NEO · "this book is being opened" — one navigation's worth of memory.
   ----------------------------------------------------------------------------
   The hub's arrival (nb-arrive / nb-hinge, app/neo/books.css) is the moment a
   book is opened, so it plays only when the reader opens one from the shelf or
   from its card, and never on a reload, a deep link or a return to the hub.

   A module variable and nothing more. It is empty on every hard load, which is
   exactly what the server rendered, so hydration always agrees; a client
   navigation from the shelf finds it set, and the hub clears it once mounted.
   ========================================================================== */

let opening: string | null = null;

/** Called by the link that opens a book's hub. */
export const markOpening = (bookId: string): void => { opening = bookId; };

/** Read during the hub's first render. */
export const isOpening = (bookId: string): boolean => opening === bookId;

/** Called once the hub has mounted: the next visit is not an opening. */
export const clearOpening = (): void => { opening = null; };
