# Item 6 — the S/4HANA verdict was wrong on PP-PI

## What was on screen

`/neo/pp-pi/` reported its S/4HANA split as:

```
נשמר 68  ·  הוחלף 0  ·  הוסר 0
```

That tells a migration team **nothing in PP-PI moves in S/4HANA**. It is false.
The same blueprint's own S/4 column marks `BUT000` as:

> "הוחלף - Business Partner חובה (CVI); ראה SAP Note 2265093."

The mandatory Business Partner conversion — one of the hardest gates in any S/4
conversion — was rendered on the page as "נשמר".

## Root cause

`workspace-data.ts s4Of()` and `lib/module-portal.ts eccS4()` both derived the
verdict from **`s4AltTable`**:

```ts
if (alt && !identical) return 1;   // replaced
return 0;                          // kept
```

That reads the wrong column. Coverage of `s4AltTable` per blueprint sheet:

| module | s4Note | s4AltTable |
|--------|--------|------------|
| PM     | 58/58  | **58/58**  |
| PP-PI  | 68/68  | **0/68**   |

So the verdict was a function of *which sheet you were looking at*. PM looked
right by accident. PP-PI could not produce anything except "kept", for every
row, forever. This was a symptom-level invisible bug: no error, no warning, a
confident and wrong number.

## The fix

One classifier, `lib/s4-class.ts`, reading `s4Note` — the column both sheets
actually fill — and shared by the module workspace, the ECC↔S/4 page and Home so
they cannot drift again. `s4AltTable` is still shown as a successor hint; it no
longer decides anything.

## Why the match is anchored, and not a search

A loose `/מחליף|הוחלף/` over the prose publishes a false SAP claim. `MARC`:

> "MRP Live מחליף MRP קלאסי; שדות תכנון נשמרים אך הביצוע ב-MATDOC/ACDOCA."

What is replaced there is **classic MRP, by MRP Live**. `MARC` itself persists
in S/4HANA. A substring match marks MARC as a replaced table and invents a
migration finding no source states. The token is therefore honoured **only at
the start of the note**, which is the convention the blueprint genuinely uses
(`"הוחלף - …"`, `"מותאם (תואם)"`, `"ללא שינוי (תואם)"`).

Guard test, run against the real `eccS4()` code path:

```
BUT000 in PP-PI now REPLACED : true
MARC NOT falsely replaced    : true  (bucket = undecided)
```

## A note on `\b`

The first anchored attempt matched **0 of 126** rows. Not a data problem:
JavaScript defines `\b` against `\w === [A-Za-z0-9_]`, so between `שינוי` and a
space *both* sides are non-word characters and there is no boundary.

```js
/^(ללא שינוי)\b/.test("ללא שינוי (תואם)")  // false
/^(ללא שינוי)/.test("ללא שינוי (תואם)")    // true
```

`\b` is inert after Hebrew. The delimiter is an explicit character class.

## Before / after, from the real code path

| | PM before | PM after | PP-PI before | PP-PI after |
|---|---|---|---|---|
| ללא שינוי | 53 | 43 | **68** | 51 |
| מותאם | — | 8 | — | 5 |
| הוחלף | 5 | 5 | **0** | **1** |
| הוסר | 0 | 0 | 0 | 0 |
| לא הוכרע במקור | — | 0 | — | **11** |

## OPEN — 11 PP-PI rows state no verdict

These carry an S/4 note with no leading verdict token. They are shown as
**"לא הוכרע במקור"** and are **not** guessed into a bucket. Deciding them needs
the blueprint owner, not an inference:

```
MARA  MARC  MARD  MBEW  MLGN  MLGT  MDMA  MKAL  CRCO  CSLA  T438M
```

Each note is real content and still renders verbatim on the row; only the
one-word verdict is absent. Example: `MKAL` — "חובה 100% ב-S/4HANA - הרץ C223
ובדוק תוקף/עקביות לכל חומר מיוצר לפני ההמרה (Pre-check קריטי)." That is clearly
migration-relevant, but it does not state whether the *table* is kept, changed,
replaced or removed, so the surface says so instead of choosing for it.

## Verified by interaction, not by reading the source

- PP-PI chips: `ללא שינוי 51` · `מותאם 5` · `הוחלף 1` · `הוסר 0` (disabled) · `לא הוכרע במקור 11`
- PM chips: `43 · 8 · 5 · 0` (disabled) · `0` (disabled)
- colours: `#10b981` stable · `#f59e0b` needs analysis · `#3b82f6` moves · `#dc2626` gone · `#94a3b8` no verdict
- filter `הוחלף` on PP-PI: 68 rows → **1 row, BUT000**
- filter `לא הוכרע במקור`: → exactly the 11 above
- section rail: 8 numbered sections, pinned at 63px across 9,000px of scroll,
  active chip auto-advanced 01 → 02 → 03, counter tracked `02/08` → `05/08`
- PM/PP-PI × light/dark × mobile: 0 console errors, 0 horizontal overflow,
  0 off-screen controls, 0 buttons without an accessible name
