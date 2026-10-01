# Gate 02 - Knowledge architecture - round 3 (second pass)

Reviewer: sap-knowledge-architect (project skill), read-only. No repository file was edited, no server, browser or build was started.
Repository: /Users/salihalif/Desktop/My-Projects/neo-redesign, branch design/neo-experience-redesign, HEAD e226fb17 (27 commits in 2031581e..HEAD; gate-10 fix commits b0914b8e..e226fb17 read with `git log --stat 41677306..e226fb17` and their diffs).
Evidence: the cold build of e226fb17 in neo-redesign-evidence/r3/final4/ (out/ timestamps 19:24 match build-full.log).

## Verdict

**FAIL - 0 BLOCKER, 1 MAJOR, 4 MINOR.** Graph integrity score by the skill's scale: 100 - 8 - 4x2 = 84. The gate rule (PASS only with 0/0/0) makes it FAIL.

## Method

- The skill's "gen:routes" and "build + crawl" steps were not run (read-only gate). Their results are taken from final4/gates (routes.log, sitemap.log, crawl.log, legacy-redirects.log), final4/legacy-redirect-check.log and final4/http-status.log/json.
- Legacy register: every one of the 466 rows (not only a sample) was checked with a script that emulates vercel.json's redirects in order (first match, path-to-regexp turned into a regex, the www host rule skipped), and that tests out/<from>/index.html and out/<to>/index.html. A stratified 51-row sample covering all 41 families is in Appendix A.
- Same-slug scan: for each row, any built page under out/neo/ whose last path segment equals the legacy slug (case-insensitive), to find rows whose "no NEO page" reason is wrong.
- NEO to legacy links: all 3,225 built HTML pages under out/neo/ scanned for hrefs into the 72 legacy roots (first segments of the 4,643 legacy pages in r3/redirect-report-final.json) and for href="/"; all JSON and sw.js under out/ (outside _next) scanned for legacy URLs; source grep of components/neo-shell and app/neo.
- Evidence files the brief lists that were not present when read (19:35-19:41): axe.json, motion-rest.json, clip-reach-desk.json, clip-reach-phone.json, text-layout.json (only text-layout.log) and shots/. None of them is needed by this gate. Every file this gate needs was present.

## 1. Knowledge consistency report

| id | severity | category | issue | evidence | fix |
|---|---|---|---|---|---|
| G2-1 | MAJOR | X-REF / DUPLICATE risk | A P1 legacy record reaches the hub although its NEO record exists, and the register says it has none. `/sap-notes/mrp-no-planned-orders/` goes to `/neo/incidents/`, reason "רשומה עם 611 תווי טקסט משלה, ואין לה עמוד NEO". out/neo/incidents/mrp-no-planned-orders/index.html is built: h1 "MRP לא יוצר הזמנות מתוכננות", title "... · PP · Project NEO". The legacy page: h1 "ריצת MRP לא יוצרת הזמנות מתוכננות", title "(MRP run creates no planned orders / requirements) · PP". Same symptom, module and slug. The owner action on the row ("move the content to an exact NEO page") would create a second NEO page for one incident. | legacy-register.csv:55; LEGACY-REGISTER.md:118; NAV-LEGACY.md:61 ("אין עמוד NEO לרשומה" for all 466); vercel.json redirects[443] `/sap-notes/:slug/ -> /neo/incidents/` | In scripts/gen-legacy-redirects.mjs send `/sap-notes/<slug>/` to `/neo/incidents/<slug>/` when that page is built (kind equivalent, or exact once the NEO incident is checked to carry the legacy page's notes). Regenerate vercel.json, the redirect report and the register (465 hub rows). If the content differs, keep the hub but rewrite the row's reason to name the existing NEO page and merge into it. The same-slug scan found no other row of this kind (1 of 23 `/sap-notes/` rows). |
| G2-2 | MINOR | HIERARCHY / LINK | The claim that each row "reaches the closest NEO section" is not true for 7 rows. 5 `/learn/pm-*` rows (pm-ecc-s4, pm-execution, pm-fundamentals, pm-planning, pm-troubleshooting) go to `/neo/academy/` while `/neo/academy/pm/` is built. `/learn/pp-pi/` (h1 "PP-PI · יסודות") goes to `/neo/academy/` while `/neo/academy/pp-pi/` is built. `/workbench/debugging/` (h1 "ABAP Debugging Workbench") goes to `/neo/centers/` while `/neo/centers/debugging/` ("אבחון תקלות") is built. | LEGACY-REGISTER.md:5, :179, :185, :527; legacy-register.csv:116, :122, :464; vercel.json redirects[444] `/learn/:slug/ -> /neo/academy/`, redirects[453] `/workbench/:slug/ -> /neo/centers/` | Put module rules before redirects[444], the same way redirects[407-414] already do for `/academy/lesson/:slug(pm-[^/]+)/`: `/learn/:slug(pm-[^/]+)/ -> /neo/academy/pm/`, `/learn/pp-pi/ -> /neo/academy/pp-pi/`, and an explicit `/workbench/debugging/ -> /neo/centers/debugging/`. Or reword the claim to "a NEO section". The 6 other `/learn/pp*` rows are owner candidates for /neo/academy/pp-pi/ or /neo/academy/pp-ds/. |
| G2-3 | MINOR | X-REF (data integrity) | `/tcode/ECC/` is marked P1, "exact page needed: כן", as a transaction record (1,518 chars). Its legacy title is "ECC - SAP Transaction Code", h1 "ECC", and "ECC" sits in the legacy T-code list. By SAP naming, ECC is the ERP release, not a transaction code (knowledge, not checked in a SAP system: דורש אימות במערכת SAP). If someone follows the row, it creates /neo/transactions/ECC/, a T-code record the blueprint may not support. | legacy-register.csv:94; LEGACY-REGISTER.md:157; lib/route-manifest.generated.ts:5 | Mark the row לבדיקה with the reason "verify the source row in the blueprint, probably not a transaction code". Do not create a NEO record until that is verified. |
| G2-4 | MINOR | HIERARCHY (classification) | The rules as written do not produce the table's values for 2 families. `/workbench/` (4 rows, tool pages titled "... Workbench") gets "כן", but the exact-page rule sends tools to "החלטת בעלים". `/process-explorer/` (5 rows, e.g. "ניהול אחזקה (EAM) · Maintenance Management") gets P3, but the priority rule puts process content at P2. P3 for `/qa-testing/` (10), `/guides/` (4) and `/story/` (2) rests on "old concept pages", a family list the document never prints. Everything else is consistent (see Passed checks). | LEGACY-REGISTER.md:9-11 (rules); family table rows for /workbench/, /process-explorer/, /qa-testing/, /guides/, /story/ | Print the family-to-kind (record / tool / course) and family-to-priority lists that neo-redesign-evidence/tools/legacy-register.py actually uses, or move the 2 families into line with the rules. |
| G2-5 | MINOR | LINK (canonical) | The sitemap advertises redirect sources, not canonical routes. Of out/sitemap.xml's 4,521 entries, 4,518 are legacy paths from the redirect report, `/` is redirects[1] and `/bapi/Control%20Recipe/` matches redirects[431]. Only `/neo/` is a NEO URL. In production all 4,644 legacy addresses answer 307 (http-status.log "other 4644"), and all 3,225 NEO pages carry rel=canonical to /neo/ plus `noindex, nofollow`. The noindex is deliberate and is an open owner question, so this is not a product defect. The gap is that gates/sitemap.log ("OK - 4521 URLs, covers all 4521 indexable pages, 0 dead entries") is measured on out/ without the redirect layer, so it does not show that the sitemap lists canonical routes, and question 8.1 does not state this consequence. | out/sitemap.xml; final4/http-status.log; app/neo/layout.tsx:19-28; app/neo/page.tsx:23-28; OWNER-QUESTIONS.md:70 (8.1); BLOCKERS.md:26 | (a) Make scripts/check-sitemap.mjs report entries that match a vercel.json redirect source (expect 4,520 today). (b) Add the consequence to question 8.1: "keeping noindex leaves a sitemap of 4,520 redirecting legacy URLs and no NEO record". (c) Once 8.1 is answered, generate the sitemap from the NEO routes, or drop the redirected entries. |

**Crawl result:** M1 drift: pass (gates/routes.log "manifest in sync with built routes"). M2 dead links: 0 (gates/crawl.log "pages=7885 validRoutes=7885 DEAD_LINKS=0"). The crawl treats links into built legacy pages as valid, so the "0 links from NEO into legacy" result below comes from this gate's own scan, not from crawl.log.

**Uniformity matrix:** not re-measured in this pass. It is outside the scope given for round 3, and no gate-10 commit touches lib/module-portal.ts or components/object-expert.tsx.

### Observation deferred to gate 10 / neo-architecture-studio-reviewer (rendering, not counted here)

The structural part of the b0914b8e deep link holds. 105 distinct `/neo/erd/#TABLE` links on 210 built NEO pages (components/neo-shell/data/tables-detail.ts:464, object/object-view.tsx:259) all name a table present in the ERD page payload. The arrival code frames only a table that is in the graph (`if (sel && live.pos.has(sel))`, erd-workspace.tsx under the comment at :874). In erd-hash-AUFK-1440-light.png, AUFK is selected in the list, the inspector and the breadcrumb.

The framing claim of b0914b8e, however, is not borne out by the final4 measurement. final4/erd-hash.log puts the deep-linked node below the stage for AUFK at 1440x900 (node top 1243 vs stage bottom 867, 3 of 20 tables inside) and at 1280x800 (node top 1189 vs stage bottom 767), and for IFLOT at 1280x800 (node top 1147 vs 767). AFKO at 1440 is cut off at the stage edge (node 850-953 vs stage bottom 867). PLKO at 1728x1080 is inside. "3 of 20" is exactly the pre-fix state that the comment in the commit describes. On the screenshot, the canvas shows MAPL and PLKO and no AUFK card. This is for gate 10 to confirm.

## 2. Missing relationships

- ONE-WAY / DANGLING: none found. ERD deep links resolve 105/105. NEO pages link into legacy routes 0 times.
- MISROUTED (legacy to NEO): `/sap-notes/mrp-no-planned-orders/` should reach `/neo/incidents/mrp-no-planned-orders/` (G2-1).
- COARSER THAN NEEDED: 7 rows land one level above an existing NEO section (G2-2).

## 3. Suggested cross-links and guards

- `/learn/pm-*` to `/neo/academy/pm/`, `/learn/pp-pi/` to `/neo/academy/pp-pi/`, `/workbench/debugging/` to `/neo/centers/debugging/`: redirect rules (G2-2).
- Prevention, not a defect: let crawl-dead-links fail any link from /neo/** into a vercel.json redirect source. Today such a link would pass, because the legacy pages are still built.
- check-sitemap: report redirected entries (G2-5).

## Passed checks (with evidence)

- **Register totals and rules.** The register has 466 rows, which equals byKind.hub 466 in r3/redirect-report-final.json and in gates/legacy-redirects.log. Split: כן 208, לבדיקה 232, החלטת בעלים 26; P1 111, P2 304, P3 51. These match LEGACY-REGISTER.md:13 and the family table. No `from` appears twice, and each family has one priority. The P1 families (tcode 32, sap-notes 23, exits 28, ecc-s4 13, solutions 15) add up to 111. The character rule has 0 violations: every כן has at least 300 chars, and every record-type לבדיקה has fewer than 300 (the `/library/pp/object/` to-check rows run 114-257 chars, and PP10 at 530 is the single כן). The 9 course-page rows are the `/library/academy/` pages.
- **No hub shown as complete.** LEGACY-REGISTER.md:5 says "None of them is complete". owner_decision is filled on 466/466, and NAV-LEGACY.md:61 lists all 466 as "מדור". The 176 "equivalent" redirects were also checked, so they do not hide hubs. They are either section roots mapped to NEO section roots (e.g. `/exits/` to `/neo/enhancements/`) or legacy stubs whose own heading is "הקורס עבר ל-SAP Academy החדשה" (e.g. `/library/qm-academy/chapter-01/`). NAV-LEGACY.md:122's legacy-links/redirect-report.json is byte-identical to r3/redirect-report-final.json.
- **Redirects against the export, all 466 rows.** Each row matches a vercel.json rule (65 explicit, 401 pattern), and the destination equals the register's `to` in 466/466. out/<from>/index.html is built 466/466, and out/<to>/index.html is built 466/466. The 32 `/tcode/` rows are explicit rules ahead of the exact pattern redirects[416], and no out/neo/transactions/<code>/ exists for any of them.
- **Manifest.** app/manifest.ts:15-17 sets id "/", start_url "/neo/", scope "/". The shortcuts at app/manifest.ts:36-41 point to /neo/academy/, /neo/studio/, /neo/knowledge/ and /neo/tables/, and the built final4/manifest.webmanifest carries the same values. All 5 URLs are built in out/. Screenshots answer 6/6 with 200 (final4/manifest-screens.log).
- **Final gates.** gates/summary.txt: HEAD e226fb17, every gate rc=0, protected files changed 0. legacy-redirects.log: upToDate true, misses 0, 4,643 legacy pages (exact 4001 / equivalent 176 / hub 466). legacy-redirect-check.log: 4,644/4,644 redirected into NEO, 0 failures, 3,174 distinct targets. http-status.log: 7,883 pages, 3,239 at 200, 4,644 at 307; the control /neo/nope/ answers 404.
- **NEO to legacy links.** The 3,225 built NEO pages have 0 hrefs into legacy roots and 0 href="/". The NEO JSON has 0 legacy URLs. The only file that carries them is out/tx-search-index.json, read by the legacy components/tx-search.tsx:35 and app/transactions/page.tsx:13, and no NEO file imports a legacy component. The source grep found 7 hits, all benign: lesson-neo-links.ts:11 and :59-61 are comments, :90 parses a legacy href to map it into /neo/; neo-reader.tsx:458 fetches /books/<id>/fig*.json data (vercel.json has no /books rule); search/types.ts:109 and :113 are comments.
- **Gate-10 commits.** They change no link target. workspace-header.tsx:93 still links /neo/erd/, and tables-surface.tsx only changes counters. Every path that the root PRODUCT.md and DESIGN.md point to exists (12/12).

## Appendix A - register sample (51 rows, all 41 families, first row of each family plus every 40th row)

| csv line | legacy `from` | register `to` | vercel.json rule (index: source) | rule destination = `to` | out/<from>/index.html | out/<to>/index.html |
|---|---|---|---|---|---|---|
| 2 | `/ecc-s4/atp/` | `/neo/s4-readiness/` | 455: `/ecc-s4/:slug/` | yes | yes | yes |
| 15 | `/exits/BADI-EAM-TOB/` | `/neo/enhancements/` | 442: `/exits/:slug/` | yes | yes | yes |
| 42 | `/exits/WORKORDER-UPDATE/` | `/neo/enhancements/` | 442: `/exits/:slug/` | yes | yes | yes |
| 43 | `/sap-notes/authorization-org-level/` | `/neo/incidents/` | 443: `/sap-notes/:slug/` | yes | yes | yes |
| 66 | `/solutions/authorization/` | `/neo/best-practices/` | 447: `/solutions/:slug/` | yes | yes | yes |
| 81 | `/tcode/AOBJ/` | `/neo/transactions/` | 370: `/tcode/AOBJ/` | yes | yes | yes |
| 82 | `/tcode/BS02/` | `/neo/transactions/` | 371: `/tcode/BS02/` | yes | yes | yes |
| 113 | `/learn/onboarding-org/` | `/neo/academy/` | 444: `/learn/:slug/` | yes | yes | yes |
| 122 | `/learn/pp-pi/` | `/neo/academy/` | 444: `/learn/:slug/` | yes | yes | yes |
| 131 | `/library/academy/fiori/` | `/neo/fiori-apps/` | 61: `/library/academy/fiori/` | yes | yes | yes |
| 140 | `/library/pp/object/AUSP/` | `/neo/academy/pp-pi/` | 424: `/library/pp/object/:code/` | yes | yes | yes |
| 162 | `/library/pp/object/CORY/` | `/neo/academy/pp-pi/` | 424: `/library/pp/object/:code/` | yes | yes | yes |
| 202 | `/library/pp/object/MC78/` | `/neo/academy/pp-pi/` | 424: `/library/pp/object/:code/` | yes | yes | yes |
| 242 | `/library/pp/object/OP55/` | `/neo/academy/pp-pi/` | 424: `/library/pp/object/:code/` | yes | yes | yes |
| 282 | `/library/pp/object/PP20/` | `/neo/academy/pp-pi/` | 424: `/library/pp/object/:code/` | yes | yes | yes |
| 322 | `/library/pp/object/SAP_BR_BOM_ENGINEER/` | `/neo/academy/pp-pi/` | 424: `/library/pp/object/:code/` | yes | yes | yes |
| 348 | `/oic/batch/` | `/neo/knowledge/` | 446: `/oic/:slug/` | yes | yes | yes |
| 361 | `/pm/bapis/` | `/neo/pm/` | 448: `/pm/:slug/` | yes | yes | yes |
| 362 | `/pm/best-practices/` | `/neo/pm/` | 448: `/pm/:slug/` | yes | yes | yes |
| 376 | `/pp-pi/bapis/` | `/neo/pp-pi/` | 449: `/pp-pi/:slug/` | yes | yes | yes |
| 391 | `/process/PM-1/` | `/neo/domain-model/` | 445: `/process/:slug/` | yes | yes | yes |
| 402 | `/process/PM-9/` | `/neo/domain-model/` | 445: `/process/:slug/` | yes | yes | yes |
| 410 | `/security/actvt/` | `/neo/centers/process-auth/` | 450: `/security/:slug/` | yes | yes | yes |
| 417 | `/academy/dashboard/` | `/neo/academy/` | 4: `/academy/dashboard/` | yes | yes | yes |
| 418 | `/alm/` | `/neo/` | 6: `/alm/` | yes | yes | yes |
| 419 | `/connector/` | `/neo/` | 27: `/connector/` | yes | yes | yes |
| 420 | `/delivery/` | `/neo/centers/toolkit/` | 30: `/delivery/` | yes | yes | yes |
| 421 | `/design/concept-d-spec/` | `/neo/` | 454: `/design/:slug/` | yes | yes | yes |
| 425 | `/evolution/` | `/neo/` | 40: `/evolution/` | yes | yes | yes |
| 426 | `/graph/` | `/neo/erd/` | 45: `/graph/` | yes | yes | yes |
| 427 | `/guides/pm-calibration-process/` | `/neo/centers/` | 456: `/guides/:slug/` | yes | yes | yes |
| 431 | `/import/` | `/neo/` | 52: `/import/` | yes | yes | yes |
| 432 | `/knowledge/coverage/` | `/neo/knowledge/` | 56: `/knowledge/coverage/` | yes | yes | yes |
| 433 | `/library/mm-quality-report/` | `/neo/academy/mm/` | 91: `/library/mm-quality-report/` | yes | yes | yes |
| 434 | `/library/pm-quality-report/` | `/neo/academy/pm/` | 102: `/library/pm-quality-report/` | yes | yes | yes |
| 435 | `/library/pmu-quality-report/` | `/neo/academy/pm-user/` | 114: `/library/pmu-quality-report/` | yes | yes | yes |
| 436 | `/library/pp-quality-report/` | `/neo/academy/pp-pi/` | 115: `/library/pp-quality-report/` | yes | yes | yes |
| 437 | `/library/ppds-quality-report/` | `/neo/academy/pp-ds/` | 276: `/library/ppds-quality-report/` | yes | yes | yes |
| 438 | `/library/qm-quality-report/` | `/neo/academy/qm/` | 298: `/library/qm-quality-report/` | yes | yes | yes |
| 439 | `/library/sop-quality-report/` | `/neo/academy/sop/` | 315: `/library/sop-quality-report/` | yes | yes | yes |
| 440 | `/library/wm-quality-report/` | `/neo/academy/wm/` | 327: `/library/wm-quality-report/` | yes | yes | yes |
| 441 | `/lineage/` | `/neo/erd/` | 328: `/lineage/` | yes | yes | yes |
| 442 | `/notes-graph/` | `/neo/knowledge/` | 333: `/notes-graph/` | yes | yes | yes |
| 443 | `/onboarding/` | `/neo/academy/` | 340: `/onboarding/` | yes | yes | yes |
| 444 | `/process-explorer/maintenance-management/` | `/neo/domain-model/` | 452: `/process-explorer/:slug/` | yes | yes | yes |
| 449 | `/qa-testing/batch-validation/` | `/neo/centers/` | 451: `/qa-testing/:slug/` | yes | yes | yes |
| 459 | `/quality-audit/` | `/neo/s4-readiness/` | 347: `/quality-audit/` | yes | yes | yes |
| 460 | `/sap-infrastructure/` | `/neo/` | 351: `/sap-infrastructure/` | yes | yes | yes |
| 461 | `/story/pm-maintenance/` | `/neo/domain-model/` | 366: `/story/pm-maintenance/` | yes | yes | yes |
| 463 | `/verification/` | `/neo/s4hana/` | 405: `/verification/` | yes | yes | yes |
| 464 | `/workbench/debugging/` | `/neo/centers/` | 453: `/workbench/:slug/` | yes | yes | yes |

All 51 sampled rows pass all three checks. The full 466-row run gives the same result.
