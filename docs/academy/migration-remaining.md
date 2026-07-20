# PR-9 · Migrate MM · WM · PP/DS · S&OP to the lesson engine

Same content-preserving generator as the PM-User pilot
(`scripts/migrate-academy-module.mts`). All four legacy accordion modules now open
in the unified Lesson Reader. **Zero content loss.**

| module | route | chapters | lessons | blocks | src words | gen words | SAP objects |
|--------|-------|---------:|--------:|-------:|----------:|----------:|:-----------:|
| MM   | /academy/path/mm/    | 18 | 121 | 2,032 | 114,233 | 148,303 | 760/760 |
| WM   | /academy/path/wm/    | 10 |  45 |   755 |  37,942 |  48,668 | 198/198 |
| PP/DS| /academy/path/pp-ds/ | 11 |  78 | 1,304 |  63,209 |  80,987 | 335/335 |
| S&OP | /academy/path/sop/   | 15 |  88 | 1,469 |  90,554 | 117,135 | 517/517 |

gen words ≥ src words everywhere (sub-headings/bullets add, none removed); every
T-Code/table/Fiori object preserved. One Lesson per subchapter; descendant nodes
aggregated into the lesson's blocks with titles as sub-headings.

## Wiring
ALL_LESSONS += 4 sets (332 new `/academy/lesson/*` pages) · model PATHS += 4 ·
routes mm/wm/pp-ds/sop · de-split home+dashboard book cards · accents (SOP moduleId
cleaned from `S&OP`→`sop` for URL safety).

## Gates
tsc 0 · eslint 0 · build (332 lesson pages + 4 paths) · dead-links 0 · coverage PASS.
Legacy `/library/{mm,wm,ppds,sop}-academy` left live — redirect deferred to eyeball.
