# Motion checklist: the 59 items, as they stand in NEO

The source is `docs/redesign-2026-09/OLD-NEO-MOTION-INVENTORY.md` (59 items: KEEP 29, ADAPT 14, REBUILD 1, REJECT 15). The acceptance criteria come from the `motion-doctrine` skill (AGENT-LOG S3):
- no idle loops;
- motion ignited on the frame of its cause;
- entry up to 800ms, exit about 75% of entry;
- stagger up to 500ms in total;
- no bounce or elastic;
- under reduced motion, motion is removed, not slowed.

**Status key:** "live" means already in the redesign before this round. "Done" means implemented in this round. "Off" means the REJECT holds at runtime. "Measured" means checked in the browser (`scratchpad/r5/idle-anim.mjs`, `march.mjs`).

| # | Item | Decision | Status in NEO | Where |
|---|---|---|---|---|
| 1 | `nm-rise`, scroll reveal | REJECT | Removed from the code (round 2026-10). §12 had already cancelled it; measured | `motion.css` |
| 2 | `nm-fade` | REJECT | Removed from the code | `motion.css` |
| 3 | `nm-seq`, a sequence instead of a wall | ADAPT | Done in the command palette (#13). Catalogue filters update in place: lists of 100+ rows, where the result count states the change. | `search.css` |
| 4 | `nm-par`, parallax | REJECT | Removed from the code | `motion.css` |
| 5 | `nm-pin`, sticky scene | REJECT | Removed from the code; no NEO component used it | `motion.css` |
| 6 | `nm-kin`, kinetic headlines | REJECT | Removed from the code | `motion.css` |
| 7 | `nm-grow`, a growing bar | ADAPT | Live. The value bars move on `scaleX` with a transition when the value arrives from the reader's store or when a filter changes. Static bars do not animate on load. | `workspace.css` `.nw-bar`, `learn.css` `.nxl-bar-f`, `reader.css` |
| 8 | `nm-lift`, a raised card | REJECT | Off (§12). This round I removed a deeper shadow on sheet hover that I had added; hover now changes colour only. | `editorial.css` |
| 9 | `nm-sel`, a four-signal selection | KEEP | Live | `motion.css` §12 |
| 10 | Amplitude per screen type, trimmed for coarse pointers | KEEP | Live (`MotionProvider`/`level.ts` publish `data-motion`). Done: a new token `--nm-enter` sets the travel of anything that arrives because something changed. | `motion.css` §1 |
| 11 | Reduced motion means removal | KEEP | Live | `motion.css`, `globals.css` |
| 12 | Opening the command palette | ADAPT | Live (240ms, no overshoot) | `rail.css` |
| 13 | Result rows entering the palette | ADAPT | Done: 240ms with 16ms per row, first 8 rows only, only rows that are new | `search.css`, `command-surface.tsx` (`--i`) |
| 14 | The rail search button | ADAPT | Done: 240ms on the ease-out curve, overshoot removed | `globals.css` `.nx-railsrch` |
| 15 | The rail pill with its directional trail | ADAPT | Live: transform and opacity only, no `height` transition | `rail.css` `.nx-ind` |
| 16 | Hover on a rail item, 4 transitions | REJECT | Off | — |
| 17 | Section-nav progress bar | KEEP | Live, measured (`nxs-progress` is the only animation running at rest) | `section-nav.css` |
| 18 | Section-nav fade | KEEP | Live | — |
| 19 | The ground's colour when the scene changes | ADAPT | Done: only the rail pill changes to the family colour, in 240ms, instead of repainting the whole viewport | `editorial.css` |
| 20 | Dock panel | KEEP | Live | `dock.css` |
| 21 | Preview host | KEEP | Live | — |
| 22 | Phone tabs | KEEP | Live | — |
| 23 | Arrow on a catalogue row | ADAPT | Live: the arrow moves, the row does not lift | `data.css` `.nxd-go` |
| 24 | "You came from here" ring | ADAPT | Live (`nxd-land`, one shot, opacity) | `data.css`, `tables-surface`, `transactions-surface` |
| 25 | Press feedback | KEEP | Live (scale .98) | `globals.css` |
| 26 | Lifts on hover | REJECT | Off (see #8) | — |
| 27 | Busy spinner on a button | KEEP | Live: bounded by the state | `ui.css` |
| 28 | Arrow nudge on a link | KEEP | Done: 2px along the reading direction, 120ms, on hover and focus-visible; RTL and LTR | `ui.css` |
| 29 | ERD camera glide | KEEP | Live (`TWEEN = 460`); to be measured with a real click in the verification matrix | `erd-workspace.tsx` |
| 30 | ERD tween within the same picture | KEEP | Live | — |
| 31 | `ne-enter` | KEEP | Live | `erd.css` |
| 32 | `ne-unfold` | KEEP | Live | `erd.css` |
| 33 | Dimming the neighbours | KEEP | Live | `erd.css` |
| 34 | Marching edges, `ne-march` | REJECT | Off: the CSS still exists, but a later rule cancels it. Measured: `animationName: none`, 0 running on `/neo/erd/#AUFK` | `erd.css`; `march.mjs` |
| 35 | ERD flow dots | ADAPT | Live: 2 iterations, then still | `erd.css` |
| 36 | Breathing halo on the object | REJECT | Off | — |
| 37 | `nol-flow` | REJECT | Off: not present | — |
| 38 | Travelling pulse on the object graph | ADAPT | Done (agent B): 2 iterations, then still | `object.css` |
| 39 | Satellites | KEEP | Live | `object.css` |
| 40 | Studio stage | KEEP | Live | `studio.css` |
| 41 | Studio selection | KEEP | Live | `studio.css` |
| 42 | Process map on the home page | REBUILD | Live (signature moment) | `home.css` |
| 43 | Panel highlight on the home page | REJECT | Off | — |
| 44 | Progress bar on the home page | KEEP | Live (`nh-prog`) | `home-scene.tsx` |
| 45 | Home gate (900ms headline) | REJECT | Off | — |
| 46 | Neighbours on the shelf | KEEP (a regression) | Assigned to agent F: a `translate` transition of 400ms | `books.css` |
| 47 | 3D book cover | KEEP | Live | `books.css` |
| 48 | A book arriving and opening | ADAPT | Assigned to agent F: up to 600ms, only when a book opens | `books.css` |
| 49 | Scrim | KEEP | Live | `books.css` |
| 50 | Chapter arrives in the reader | KEEP | Live | `reader.css` |
| 51 | Reader loading mark | KEEP | Adapted: the mark is still (`editorial.css`), and the route's loading state is still too (#P1 §12) | `editorial.css`, `app/loading.tsx` |
| 52 | Success feedback | ADAPT | Done: `data-done="1"` scales by 1.8% over 420ms, once. Applied to copying an identifier or template (`CopyId`) and to adding a bookmark in the reader. Removing a bookmark does not get it. | `ui.css`, `copy-id.tsx`, `neo-reader.tsx` |
| 53 | Conversation turn in NEO AI | KEEP | Live | `chat.css` |
| 54 | Idle loops in NEO AI | REJECT | Done: the librarian's idle breathe is removed; thinking and writing stay as bounded states | `chat.css` |
| 55 | Work states in NEO AI | ADAPT | Done: the blinking caret is removed | `chat.css` |
| 56 | NEO AI sheet | KEEP | Live | `chat.css` |
| 57 | Academy disclosure and bar | KEEP | Live | `learn.css` |
| 58 | Centre cards on hover | REJECT | Assigned to agent D: colour only, no lift | `centers.css` |
| 59 | Switching the theme | KEEP | Live | — |

## The scroll engine, removed

`motion.css` sections 2 to 8 (reveal, stagger, parallax, pin, kinetic headline, growing bars, lift) were removed from the code. With the rollout, §12 already cancelled them on every route, so nothing visible changed.
- **CSS:** 6,550 → 2,126 bytes gzip, on every page.
- **JS:** `MotionProvider` drops its Safari observer (an IntersectionObserver plus a MutationObserver on the whole document). It only drove the reveals.
- **Classes:** `.nm-rise` and its kin stay in the markup but are now inert.

## Measurements so far (build 04, before this round's changes)

- **At rest:** 15 routes across every family. 0 infinite animations; the only running one is the section-nav progress bar (#17). Tool: `scratchpad/r5/idle-anim.mjs`.
- **`ne-march` on `/neo/erd/#AUFK`:** 23 edges with `animationName: none` and 0 running. Tool: `march.mjs`.

**Still to measure**, in the integration build's verification matrix:
- the same probe on every family after the changes;
- reduced motion;
- a real click on the ERD (#29);
- the result rows (#13);
- the success feedback (#52).
