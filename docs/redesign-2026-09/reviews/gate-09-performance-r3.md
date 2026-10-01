# Gate 9: performance, round 3

Reviewer: `enterprise-performance-reviewer` (loaded with the Skill tool), read-only.
Repository: `/Users/salihalif/Desktop/My-Projects/neo-redesign`, branch `design/neo-experience-redesign`, HEAD `60d51801`.
Round 3 = 33 commits `2031581e..HEAD`. Vitals: one cold build of `e226fb17` (`r3/final4/`).

**Verdict: FAIL. 0 BLOCKER, 0 MAJOR, 5 MINOR.** The code has no performance regression against round 2 and round 2's two font MAJORs stay closed. What fails is the evidence: four document defects the team can fix now (F1 to F4), plus one external verification gap, the Preview measurement (F5).

## Method

- This gate ran no build, no server, no browser, no npm and no vitals tool. Every number comes from the evidence files, from git, or from `out/`, measured with python, gzip level 6 and rg. No file was printed in full.
- Evidence read: `r3/final4/vitals-plain.json` (measuredAt 16:35:04Z), `r3/final4/vitals-gzip.json` (16:39:12Z), both `.log` files, `r3/vitals-gzip.json` (mid-round, 07:35:27Z, an earlier commit), `final-run-7/vitals.json` (round 2, 2026-09-30) and `r3/final4/build-full.log` (cold build, "Compiled successfully in 81s", 7,884 pages). The measuring tool is `neo-redesign-evidence/tools/vitals.mjs`.
- **`out/` is not the e226fb17 build.** It was rebuilt between 20:00 and 20:03 by the `r3/final5` batch (warm compile, 4.2s). Its log does not record the commit. That makes the final4 build's exact bytes unrecoverable: `serve-1.log` and `http-status.json` keep no response sizes. The `out/` numbers below come from that later build. Between e226fb17 and HEAD no commit touches the tables page code, so they stand for its HTML.
- The working tree had uncommitted docs during the review: `QA-R3.md` is untracked, and `BLOCKERS.md` and four other docs were modified. `QA-R3.md` grew from 117 to 130 lines while I read it. §4 itself did not change; I re-read it at the end (md5 of §4: `f97ac2df313ad07ecc9c1131e0b62c4a`). Line numbers in `BLOCKERS.md` are as read and may shift.

## 1. Performance report

### 1.1 Vitals: round 2 against round 3, plain and gzip (3-run medians)

Phone LCP / TBT / INP in ms. r2 = `final-run-7`, r3 = `r3/final4`, mid = `r3/vitals-gzip.json`.

| Route | LCP r2 plain | LCP r3 plain | LCP r3 gzip | LCP mid gzip | TBT r2 / r3 plain | TBT r3 gzip / mid gzip | INP r3 plain / gzip |
|---|---|---|---|---|---|---|---|
| `/neo/` | 4,308 | 4,320 | 1,072 | 1,052 | 19 / 28 | 34 / 7 | 40 / 40 |
| `/neo/tables/` | 9,136 | 9,120 | 1,504 | 1,504 | 115 / 113 | 168 / 194 | 96 / 104 |
| `/neo/transactions/IP30H/` | 4,368 | 4,336 | 1,116 | 1,112 | 6 / 23 | 18 / 4 | 40 / 40 |
| `/neo/erd/` | 4,316 | 4,316 | 1,064 | 1,060 | 3 / 6 | 16 / 5 | 32 / 32 |
| `/neo/best-practices/order-settlement-process/` | 4,504 | 4,536 | 1,212 | 1,224 | 82 / 109 | 120 / 79 | 56 / 56 |
| `/neo/read/book2/` | 5,484 | 5,476 | 1,828 | 1,784 | 184 / 236 | 213 / 173 | 40 / 40 |
| `/neo/academy/pm/pm-bom/` | 4,336 | 4,352 | 1,084 | 1,076 | 23 / 33 | 37 / 17 | 48 / 40 |

- Every value in the QA-R3 §4 vitals table matches the JSON. The claim "LCP moved by at most 32ms between rounds 2 and 3" is right: the largest move is 32ms, on IP30H and best-practices.
- The claim that the drop to 1.1 to 1.8 s comes from compression, not from code, is also right. Both runs used the same build, 4 minutes apart, with the same tool. Only `COMPRESS` changed.
- On desktop every LCP is 108ms or less. `/neo/tables/` has TBT 13 to 23 and INP 72. CLS is at most 0.013 on every route, and 0 on `/neo/tables/` on the phone.
- Method, from `tools/vitals.mjs`:
  - lines 2 and 13: phone 390x844 with an iPhone UA, CPU x4, 150ms latency, 1.6 Mbps down; desktop 1440x900 unthrottled.
  - line 19: **TBT is the sum of (long task minus 50ms) from navigation start.** It also includes a scripted Ctrl+K and Escape (line 40), so it is not Lighthouse's FCP-to-TTI TBT.
  - line 46: only the medians are kept.

### 1.2 Bytes of `/neo/tables/`

| | Round 2 gate (gzip) | QA-R3 §4 raw / gzip | `out/` now (final5), raw / gzip-6 |
|---|---|---|---|
| HTML | 110,889 | 1,033,229 / 111,847 | 1,028,763 / 111,967 |
| HTML before `$RC` | n/a | 535,795 / 27,031 | 531,649 / 27,307 |
| JS | 287,693 | 915,371 / 289,075 (15 files) | 915,118 / 289,124 (15 files) |
| CSS | 65,303 (9 files) | 382,156 / 66,046 (9 files) | 382,996 / 66,185 (9 files) |
| Font preloads | 8 files, 140,348 bytes | 3 Plex Hebrew, 16,796 | 3 files: 5,476 + 5,668 + 5,652 = 16,796 |

- **Did round 3 move the bytes materially? No.**
  - Against round 2: HTML is +1.0% gzip, JS +0.5%, CSS +1.4%, all far under the skill's 30 KB threshold. Round 2's gzip level is not stated, so these deltas are approximate.
  - Font preloads fell by 123,552 bytes (88%).
  - 244bcece's unit words replaced `nx-sr` spans with visible text. The net raw HTML is smaller, and the gzip size moved by +120 bytes.
  - `/neo/tables/` has 20 `<wbr>` (about 100 bytes). `slashBreaks` is used only in `bp-view.tsx:217,363` and `ref-detail-view.tsx:72`, not by the catalogue.
- Other page facts:
  - The RSC flight payload is 496,497 bytes in 14 `self.__next_f` scripts, 48.3% of the HTML.
  - The page has about 6,422 elements, 6,407 of them before `$RC`.
  - All 855 inline SVGs (324,458 bytes, 66 distinct markups) are before `$RC`, and none of them is in the flight payload.

### 1.3 Fonts and offline

- **All faces are self-hosted with `next/font/local`** (`app/fonts/assistant.ts:8`, `plex.ts:12`, `frank.ts:8`, `jetbrains.ts:8`). Preload is off for:
  - Plex Latin and mono: `plex.ts:35-39,52`.
  - Frank: `frank.ts:10,25,34`. This is the fix for round 2's majors 1 and 2 (`PROGRESS.md:27`, `31d39b4d`).
  - JetBrains: `jetbrains.ts:15`.
- `out/_next/static/media` holds 14 woff2 files, 255,376 bytes in all. `/neo/tables/` preloads 3 of them.
- **No external fetch in `out/`:**
  - None of the 7,885 HTML files in `out/` (ripgrep, 0 matches) has an http(s) `src`, or a `link` with rel stylesheet, preload, modulepreload, preconnect, dns-prefetch or prefetch pointing to an http(s) host.
  - No `url(http…)` appears in the chunk CSS.
  - No `fetch("http…")`, Google Fonts host, Vercel analytics or GTM appears in the chunks or in `sw.js`.
  - The absolute URLs on `/neo/tables/` are `rel=author`, `rel=canonical`, `og:url`, `og:image` and `twitter:image`. They are metadata and are not fetched.

### 1.4 `app/loading.tsx`

- **Kept.** The file is unchanged in round 3 (last commits `b4f87193` and `1cacdcfc`), and it is the only loading boundary under `app/`.
- **Effect on `/neo/tables/`:** the catalogue is inside the boundary and is revealed by `$RC` at byte 531,649 of 1,028,763. FCP equals LCP in every phone run, both plain (9,120) and gzip (1,504).
- My inference from those metrics, not a trace: on a cold load the fallback is not painted before the reveal, and the first paint is the revealed catalogue. The boundary makes the first paint wait for the whole hidden subtree to parse, and on a cold load it shows nothing in return.

### 1.5 Hydration and TBT

- **The whole catalogue hydrates on the client.** `components/neo-shell/data/tables-surface.tsx:1` is `"use client"`, so hydration re-renders about 150 rows, 597 chips and 855 SVGs (2,866 elements inside them).
- **`/neo/tables/` TBT is under the 200ms "good" line:** 168 (gzip), 194 (mid-round gzip), 113 (plain; round 2 had 115). On the gzip runs it is second only to book2.
- **INP:** 104 (gzip) and 96 (plain); round 2 had 104.
- **The gzip TBT exceeding the plain TBT is expected, not a regression.** Compressed HTML reaches the parser in larger chunks, so more tasks cross 50ms. TBT therefore cannot be compared across compression modes, and QA-R3 §4 does not compare it across modes.

### 1.6 What the commits after e226fb17 can move

- Shipped code:
  - `app/neo/erd.css`: one margin value.
  - `app/neo/home.css`: +13 lines, two `@container` grid rules, no animation or transition.
  - `erd-inspector.tsx` and `erd-workspace.tsx`:
    - The arrival now reads `target.pos`, which comes from the existing `useMemo` at `erd-workspace.tsx:645`, inside the `fitOnEnter` `useCallback`.
    - It makes the same single `getBoundingClientRect` per arrival as before, and it adds no listener, timer or per-frame work.
    - It adds one `" "` text node per ERD list row.
- `vercel.json`: redirect entries only (465 redirects, `headers` unchanged). These affect legacy addresses (one redirect hop), not the weight of a NEO page.
- The scripts and docs are build or QA tooling and are never shipped to the client.
- **Judgement: none of these can move bundle size, page weight or vitals measurably.** The `/neo/tables/` CSS differs by under 1 KB raw (139 bytes gzip) between QA-R3 and `out/`.
- Across all of round 3 (`2031581e..HEAD`):
  - `package.json` and the lockfile are unchanged.
  - The only added imports are `slashBreaks`/`enLang`, `createElement` and two lucide icons.
  - No dataset import, framer-motion, `next/dynamic`, graph library, or transition on a layout property was added.
  - Dataset boundary: PASS.

### 1.7 Round 2 findings re-checked

- Majors 1 and 2 (fonts): closed (1.3).
- Minor 5 (`will-change`): closed (`app/neo/motion.css:414`, `will-change: auto`).
- Minor 4 (`inert`): deferred by one frame per `PROGRESS.md:44`. Not re-measured here.
- Minors 3 and 6 to 10 (legacy-page preloads, the inline index, double props, dead animation rules, nine stylesheets, the service-worker precache) were WATCH or optional in round 2. This gate did not re-verify them, and none is a round 3 regression.

### 1.8 Is the stand-in presented honestly?

- **Yes, as an approximation.** QA-R3 §4's first line says "קירוב מקומי ל־Preview". BLOCKERS §1's last row says "מוצג כקירוב ולא כ־Preview". BLOCKERS §1 keeps performance on the Preview's NOT VERIFIED list. The QA-R3 column headers name the compression mode and the evidence folder.
- **Fidelity: the overall direction is unknown, so "approximation" is the right word.** `serve-out.py:51` calls the stand-in "conservative", but that holds for bytes only:

  | Difference from the host | Effect on the stand-in |
  |---|---|
  | gzip level 6 (`serve-out.py:88`), where Vercel would send brotli to Chrome | slower |
  | Python `http.server` with no `protocol_version`, so HTTP/1.0 and six-connection queuing | slower |
  | No TLS, no DNS, no edge | faster |
  | Latency emulated through CDP per request (`vitals.mjs:35`) | depends on the request pattern |

- **One conclusion goes beyond the stand-in: see F3.**

## 2. Findings

| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| F1 | MINOR | **The bytes table in QA-R3 §4 does not say which build it was measured on, and it is not the build the vitals came from.**<br>Its HTML and pre-`$RC` numbers match, to the byte, the comment written into `serve-out.py:49-50` by `3dfc449e` (10:05). That was before `244bcece` (19:23) rewrote the catalogue chips in `tables-surface.tsx`.<br>The table sits under the vitals of e226fb17 as if both came from the same build. The deltas are under 0.5% raw and 1% gzip, so no conclusion changes. | QA-R3 §4 bytes table; `serve-out.py:49-50`; `git show 244bcece`; the `out/` (final5) column in 1.2 | Re-measure on the final build. Label the table with the commit and "gzip level 6", or label it "measured at 3dfc449e" |
| F2 | MINOR | **The TBT caveat points in a circle and gives no numbers.**<br>QA-R3 §4's last note says "TBT רועש במכונה הזו (`BLOCKERS.md` §5)". BLOCKERS §5, row "9, 11 \| M5", says `NOT VERIFIED` and refers to "הסייג ב־`QA-R3.md` §4". Neither states the size of the noise, and the evidence keeps medians only, so the claim cannot be checked.<br>The table also does not say that this TBT counts from navigation start and includes a scripted palette open and close.<br>Because of this, round-to-round moves cannot be told from noise. The largest is book2 TBT +52ms plain (184 to 236). Two gzip runs of the same tool differ by up to 41ms. | QA-R3 §4 notes; BLOCKERS §5 (line 68 as read); `vitals.mjs:3-4,19,40,46`; `MERGE-PLAN.md:13` (the only numbers: 162 against 82) | State the caveat once, with the spread. Keep per-run values in the JSON (`vitals.mjs:46`). Name the TBT definition in the §4 header. Re-run book2 if its TBT is to be called stable |
| F3 | MINOR | **BLOCKERS §2's `app/loading.tsx` row overstates what was measured.** It says the reason measured for deletion has disappeared ("הסיבה שנמדדה למחיקה נעלמה").<br>The with/without-boundary test was run only uncompressed. Without the boundary the first text arrived at byte 45,803 and LCP was 4,444 to 4,508ms.<br>Under gzip there is no such test, and `/neo/tables/` is still 432ms (40%) behind `/neo/` and 440ms behind `/neo/erd/`. Its whole catalogue is still held back until `$RC` at byte 531,649.<br>What went away is the 9.1 s symptom, not the measured mechanism. Owner question 8.3 points the owner to this row. | BLOCKERS §2 (line 28 as read); `QA-REPORT.md:130`; `MERGE-PLAN.md:13`; `OWNER-QUESTIONS.md:72`; 1.2 and 1.4 above | Reword it to say this was not measured under compression without the boundary, and that the gap to the other routes is 432 to 440ms. Or run the single gzip test (a scratch build without `app/loading.tsx`, `COMPRESS=1`, the same tool, no commit). Do not delete `app/loading.tsx` until the owner answers 8.3 |
| F4 | MINOR | **BLOCKERS §6 overstates what a sprite would save.** It says "Sprite עם `<use>` יקטין … את ה־HTML ביותר ממחצית".<br>Measured: the icon markup is 324,458 bytes, which is 31.5% of the 1,028,763-byte HTML and 61% of the part before the reveal. None of it is in the flight payload. Removing every icon could not halve the HTML.<br>A sprite of the 66 distinct icons plus 855 `<use>` stubs saves about 230 to 280 KB: roughly 22 to 27% of the HTML, or 45 to 50% of the part before the reveal.<br>The DOM figure holds: 2,866 elements inside the SVGs (3.35 per icon), so about 1,150 fewer elements, 18%.<br>The reason given for not doing it ("the compressed LCP is already 1.5 s") leaves out the CPU side, which is where `/neo/tables/` is weakest. | BLOCKERS §6 (lines 93-95 as read); measurement in 1.2 | Correct the sentence to "the icons' markup by more than half, about a quarter of the HTML". Record hydration and TBT as the reason to revisit it |
| F5 | MINOR (open, external) | **The owner's requirement "measured first on the compressed Preview" is not met.**<br>Every Preview URL redirects to Vercel SSO, and the session's connector has no access. No Preview number exists; the local gzip stand-in replaces it. | BLOCKERS §1 ("גישה ל־Preview: BLOCKED") | The owner grants the Vercel connector access to `sap-pp-ppi-pm`, or runs `tools/vitals.mjs` with `NEO_BASE` set to the Preview from a signed-in browser context. Then add a Preview column next to the stand-in |

## 3. Optimisation suggestions

- **P1, SAFE-TO-FIX (docs only):**
  - F1: label or re-measure the bytes table.
  - F2: state the TBT spread and definition, and keep per-run values.
  - F3: rewrite the `loading.tsx` row.
  - F4: correct the sprite estimate.
- **P2, RISKY (measurement):** the gzip test with and without `app/loading.tsx` in a scratch worktree. Deleting the file stays the owner's decision (8.3).
- **P3, RISKY:** a `<symbol>` sprite for the 66 catalogue icons. Expect about 18% fewer DOM nodes and about a quarter less HTML. Measure TBT and INP before and after.
- **P4, RISKY:** render the catalogue rows on the server and keep a thin client island for filters and disclosure. The flight payload is 48% of the HTML and the whole list hydrates.

## 4. Score and verdict

- **Skill rubric for the code: 86/100, PASS-WITH-NITS.**

  | Area | Score |
  |---|---|
  | Bundle/Dataset | 27/30 |
  | Lazy-loading | 13/15 |
  | Rendering/Memory | 15/20 |
  | Animations/CWV | 18/20 |
  | Scalability | 13/15 |

  There is no dataset leak, no new dependency, bytes are flat and the font preloads fell 88%. Phone LCP on the stand-in is 1,504ms on `/neo/tables/`. TBT (168) and INP (104) are inside "good" but are the page's weakest numbers, because the client catalogue hydrates in full.
- **Gate rule: FAIL. 0 BLOCKER, 0 MAJOR, 5 MINOR** (F1 to F4 are document defects; F5 is an open external gap). The gate can pass once F1 to F4 are corrected and F5 has a Preview measurement, or once the owner accepts the stand-in in writing.
