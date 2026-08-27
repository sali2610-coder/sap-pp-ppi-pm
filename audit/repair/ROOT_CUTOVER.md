# Root cutover — `sapbysali.app/` enters Project NEO

## The inspection, before anything was changed

| question | answer |
|---|---|
| what owns `/` | `app/page.tsx` — legacy `HomePortal` + `MobileHome`. `index, follow`, canonical `https://sapbysali.app/`, present in the sitemap. |
| what owns `/neo/` | `app/neo/page.tsx` under `app/neo/layout.tsx`. Was `noindex, nofollow`, canonical `https://sapbysali.app/neo/`, absent from the sitemap. |
| same Next.js app? | **Yes.** One `app/` tree, one root layout. NEO is a nested segment with its own nested layout. |
| mechanism | **Plain nested folders + a nested layout. Nothing else.** No route groups (0 parenthesised dirs), no rewrites, no `basePath`, no duplicated pages. `vercel.json` held only the `www`→apex redirect. |

## Why NEO was NOT moved to the root

**Twenty segment names already exist at both root and under `/neo`:**

```
academy  ai  bapi  cds  certification  chat  domain  domain-model
enhancements  fiori-apps  idoc  incidents  knowledge  migration-cockpit
object  s4-readiness  s4hana  studio  tables  transactions
```

Legacy also owns `/pm/` and `/pp-pi/`. The build is 7,800 pages — 3,170 under
`/neo`, 4,630 legacy. Renaming would collide on all twenty and require rewriting
**617** in-source `/neo` references.

## Why a redirect and not a rewrite

A rewrite keeps the URL at `/`, which looks tidier, but under `output: 'export'`
the client router reads `window.location.pathname`. Serving NEO's HTML at `/`
leaves the pathname as `/`, so:

- SmartReturn's **36** pathname prefixes (`/neo/tables/`, `/neo/erd/`, …) match nothing
- nav-data's **33** active-state keys match nothing

Both are things the brief explicitly said to preserve. A redirect keeps every
`/neo/**` URL exactly as it is, so all of that keeps working untouched.

## What changed — two lines, total

**`vercel.json`** — one redirect appended after the existing `www`→apex rule:

```json
{ "source": "/", "destination": "/neo/", "permanent": false }
```

Exactly one hop. `/neo/` is a real static page, so there is no loop. The `www`
rule runs first, so `www.sapbysali.app/` normalises to the apex host before this
rule is evaluated. `permanent: false` (307) during the cutover window so the old
root stays recoverable without browsers caching a hard 308 — **harden to `true`
once the new root has passed a full production regression.**

**`app/neo/page.tsx`** — `robots: { index: true, follow: true }`.

## The SEO trap this avoids

`/` was `index, follow` and in the sitemap. `/neo/` was `noindex, nofollow`.
Redirecting one to the other would have pointed the public homepage at a
**noindex** target and dropped the site out of search entirely.

The fix is scoped to the landing page alone. The other **41** noindex
declarations under `app/neo/` are untouched, so the 3,169 deep NEO pages stay
out of the index. `scripts/gen-sitemap.mjs` reads each built page's own robots
meta, so `/neo/` entered the sitemap automatically and `scripts/check-sitemap.mjs`
enforces it in CI — there is no second list to keep in sync.

## Nothing was deleted

Every legacy route still builds and still resolves at its own URL
(`/pm/`, `/pp-pi/`, `/tables/`, `/library/`, …). The legacy implementation is
fully intact and recoverable; it is simply no longer the landing page.

## Local verification

| check | result |
|---|---|
| `vercel.json` schema | valid |
| TypeScript | 0 errors |
| ESLint | 0 errors |
| build | static export OK |
| sitemap | 4,507 URLs, covers all 4,507 indexable pages, 0 dead entries |
| `/neo/` in sitemap | yes, exactly one entry |
| deep NEO pages | still `noindex, nofollow` (spot-checked pm, erd, tables) |
| route manifest | in sync |
| dead internal links | 0 over 7,802 pages |
| NEO home renders | yes, `index, follow`, canonical `https://sapbysali.app/neo/`, 0 console errors |

### A build-pipeline trap worth recording

`npm run build` is `next build && gen-sitemap && next build` — a deliberate
double build, because `gen-sitemap.mjs` writes `public/sitemap.xml` and only the
second build copies it into `out/`. Running `next build` directly skips the
sitemap step and `check-sitemap.mjs` then fails against a stale `out/sitemap.xml`.
That failure is a harness artefact, not a product defect. Always use
`npm run build`.

## Production verification is currently blocked by Vercel's bot mitigation

While polling the deployment I hit the domain with automated requests often
enough to trip Vercel's challenge:

```
HTTP/2 403
x-vercel-mitigated: challenge
<title>Vercel Security Checkpoint</title>
```

It challenges **every** path, including legacy `/pm/`, so it is unrelated to
this change. A real browser solves the challenge and passes; headless Chrome
does not, so automated verification from here is blocked until the mitigation
relaxes.

This is a Vercel dashboard setting. **It was not changed**, and changing project
security settings is not something to do unprompted.

## Production verification — after deployment 6125835247

`/` returns `307` with `location: /neo/`.

| check | desktop light | desktop dark | mobile |
|---|---|---|---|
| redirect hops from `/` | 1 | 1 | 1 |
| lands at | `/neo/` | `/neo/` | `/neo/` |
| NEO shell present | yes | yes | yes |
| `robots` | `index, follow` | `index, follow` | `index, follow` |
| canonical | `https://sapbysali.app/neo/` | same | same |
| refresh on `/` | 0 extra hops, no loop | same | same |
| console errors | 0 | 0 | 0 |

**Deep links: 18/18 pass** — 200, zero redirect hops, zero console errors, real
content on PM, PP-PI, ERD, Tables, Table Detail, Transactions, Tx Detail,
Object AUFK, Object EQUI, Books, Book Hub, Reader, Ask the Library, NEO AI,
Academy, Knowledge, S/4HANA, Studio.

**Behaviour**

| check | result |
|---|---|
| broken images | 0 |
| 4xx/5xx sub-resources | 0 |
| search | opens, `EQUI` matches, result panel renders |
| theme toggle | light → dark |
| SmartReturn | `/neo/tables/` → `/neo/tables/ADMI_RUN/` shows "חזרה לטבלאות" |
| browser back | returns to `/neo/tables/` |
| live sitemap | 4,507 entries, `/neo/` present exactly once |

## Follow-up owned by the project owner

1. **Harden the redirect to `permanent: true` (308)** once you are satisfied,
   so search engines consolidate ranking signals onto the new landing page.
   Right now it is a 307 on purpose, to keep the cutover reversible.
2. **Vercel Security Checkpoint** was active during verification, triggered by
   automated polling. It challenges every path. Not changed here.
