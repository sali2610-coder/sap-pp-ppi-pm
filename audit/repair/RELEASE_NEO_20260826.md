# Project NEO — release record, 2026-08-26

## Identity

| | |
|---|---|
| release candidate | `design/neo-concept-d` @ `39d93331` |
| release tag | `release/neo-20260826` → `39d93331` |
| merge commit | `d23be74b` (`--no-ff`, 88 commits preserved) |
| main before | `cf1244dc` |
| main after | `d23be74b` |
| **rollback tag** | `rollback/pre-neo-20260826` → `cf1244dc` |
| merged / pushed (UTC) | 2026-08-26T16:05:33Z |
| preview (accepted) | https://sap-pp-ppi-pm-git-design-neo-concept-d-sali2610-coders-projects.vercel.app |
| production | https://sapbysali.app |

### Rollback

```
git push --force-with-lease origin rollback/pre-neo-20260826^{commit}:main
```

Vercel redeploys `main` to Production automatically. `cf1244dc` is the exact
commit Production served immediately before this release, so the rollback is a
return to a known-good, previously-live state rather than a reconstruction.

## Release gate — run against the merged tree

| check | result |
|---|---|
| working tree clean | yes |
| branch | `design/neo-concept-d` → merged into `main` |
| route manifest drift | none, in sync |
| TypeScript | **0 errors** |
| ESLint | **0 errors** (406 warnings, unchanged baseline) |
| production build | static export OK |
| dead internal links | **0** over **7,802** pages |
| sitemap | 4,506 URLs, parses valid |
| hydration warnings | **0** across 14 critical pages |
| console errors | **0** across 14 critical pages |
| desktop / mobile | 72 renders over 24 surfaces — 0 horizontal overflow, 0 unreachable controls, 0 buttons without an accessible name, 0 tap targets under 24px |
| light / dark | both verified on every surface above |
| reduced motion | honoured; longest surviving animation 0.12s |
| generated-data drift | **zero** |

### Two gate items that looked like defects and were not

**Sitemap contains 0 `/neo/` URLs.** Correct. `/neo/*` is `noindex, nofollow`
(`app/neo/layout.tsx:25`, confirmed in the built HTML as
`<meta name="robots" content="noindex, nofollow">`). A noindex route must not
appear in a sitemap; including it would be the error.

**181 output files contain the string `CBC`.** Identical to `main`,
pre-existing, and CBC Israel is the client this cockpit was built for. The
shipped output contains **0** occurrences of `Coca-Cola` or `Central Bottling`.
Not modified, per the freeze.

## SAP data integrity

Re-running `scripts/extract-xlsx.mjs` against the two xlsx blueprints
reproduces the committed dataset byte-for-byte:

```
PM   : 58 tables · 280 fields · 121 relations
PP-PI: 68 tables · 326 fields · 129 relations
```

No SAP value in this release was authored by hand.

The one substantive data-layer change is a **read** fix, not a data edit. The
S/4HANA verdict is now decided from the blueprint's own `s4Note` column instead
of from `s4AltTable`, which is populated 58/58 on the PM sheet and **0/68** on
the PP-PI sheet. That defect made `/neo/pp-pi/` report *"68 kept / 0 replaced"* —
telling a migration team that nothing in PP-PI moves in S/4HANA — while the same
blueprint marks `BUT000` as replaced by the mandatory Business Partner
conversion (SAP Note 2265093). Details: `audit/repair/S4_VERDICT_FIX.md`.

## Intentionally unresolved — NOT fabricated

These were left exactly as the source leaves them. None was guessed into a
bucket to produce a tidier Production result.

**11 PP-PI tables whose S/4 note states no verdict** render as
`לא הוכרע במקור`:

```
MARA  MARC  MARD  MBEW  MLGN  MLGT  MDMA  MKAL  CRCO  CSLA  T438M
```

`MARC` is the instructive one. Its note reads *"MRP Live מחליף MRP קלאסי; שדות
תכנון נשמרים אך הביצוע ב-MATDOC/ACDOCA."* — what is replaced there is classic
MRP by MRP Live, not the table. A substring match would have marked MARC as a
replaced table and invented a migration finding no source states.

**17 lifecycle conflicts** — `audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md`.
One input unblocks 12 of them: the project's target S/4HANA release.

**1 source conflict on MB1A** — `audit/repair/SOURCE_CONFLICT_MB1A.md`.

**Em-dash style rule vs content rule** —
`audit/repair/ITEM9_COPY_AND_POLISH.md`. The remaining em-dashes sit in
published book titles and SAP definitional text; resolving them means editing
validated content, so the line was left for the project owner to draw.

## AI backend

Out of scope for this release, per instruction. The UI's failure path was
verified by forcing the API to fail: it renders the real message
(`"אירעה שגיאה זמנית. נסה שוב בעוד רגע."`) with `text: ""`, `policy: "REFUSE"`,
`citations: []`. It cannot fabricate an answer when the backend is down.

## Production deployment

| | |
|---|---|
| deployment id | `6107510271` |
| state | **success** |
| commit | `d23be74b` |
| registered | ~20 min after push (GitHub Actions queue delay, not a build failure) |
| URL | https://sapbysali.app |

During the swap Production continued to serve the previous complete build
(`/`, `/pm/`, `/pp-pi/`, `/tables/`, `/library/` all 200). At no point was
Production in a half-built state.

## Production smoke test — 21 surfaces × {desktop light, desktop dark, phone}

63 renders. **0 console errors, 0 horizontal overflow, 0 unreachable controls**
on every one.

All 21 surfaces returned real content, e.g. Reader 79,776 chars,
Transactions 25,145, PM 21,932, PP-PI 21,146, Tables 20,472.

### Two smoke flags, resolved

**Home returned 304 on one render.** `304 Not Modified` is a successful cache
revalidation. The assertion was `status !== 200`. Not a defect.

**Footer credit missing from `innerText` on 12 of 21 mobile renders.** The
credit is present in the DOM on every page with `display: block` and
`visibility: visible`; on mobile it sits inside the collapsed navigation rail
and measures 0×0, so `innerText` omits it. It renders correctly on desktop for
all 21 surfaces and on mobile for 9 of them.

This is **not a regression** — it is identical to the Preview that was reviewed
and accepted, and it does not block any function. Left unchanged under the
freeze and recorded here as an open item for a later pass.
