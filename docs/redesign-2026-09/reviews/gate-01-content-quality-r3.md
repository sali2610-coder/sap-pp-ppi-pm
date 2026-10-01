# Gate 1 · Content quality · Round 3 (final6)

Reviewer: neo-sap-content-quality-reviewer (skill loaded via the Skill tool). Read-only: no repository file edited, no server, browser or build.
Repository: /Users/salihalif/Desktop/My-Projects/neo-redesign, branch design/neo-experience-redesign, HEAD 7a290be7.
Round 3 = 34 commits 2031581e..HEAD, the uncommitted docs diff (BLOCKERS, OWNER-QUESTIONS, ...) and the untracked QA-R3.md and SOURCES.md as on disk. Missing result rows in QA-R3 §5/§6 and BLOCKERS §5 were not counted.

## Method
1. `git log` / `git diff --stat` 2031581e..HEAD over components, app, lib, data, docs/redesign-2026-09; root PRODUCT.md and DESIGN.md (e226fb17).
2. Every added or changed user-visible string: JSX text, aria/role text, data-label values, CSS `content:` values, app/manifest.ts labels.
3. Docs read: BLOCKERS, OWNER-QUESTIONS, ART-DIRECTION, LEGACY-REGISTER (rules, totals, family table, per-page header), legacy-register.csv (header, totals, the /tcode/ECC/ row and 29 rows sampled every 16th row), NAV-LEGACY (round-3 diff), QA-R3, RUN-LOCAL, SOURCES, PRODUCT.md, DESIGN.md.
4. Checks: invented SAP facts, ECC vs S/4HANA attribution, canonical terms, Hebrew quality, em-dash as a sentence separator, numbers traced to evidence (16 spot-checks below), the BLOCKERS "Deprecated" wording against data/ecc-s4.ts:127 and :148.
5. Not re-verified at this gate: the BLOCKERS §3 dictionary-gap lines (QMEL–AUFK, MKAL/PLKO/MAST/AFKO) against data/sapData.*; the Vercel build time and timestamp in BLOCKERS §1 (no evidence file read).

## Checked and clean
- **New UI strings.** workspace-header.tsx: the inline count line keeps the existing labels (נושאים, רשומות תיעוד, שדות מתועדים, רשומות ממשק) and writes a zero as "<label>: אין במאגר", which says the dataset is silent and does not claim SAP has none. tables-surface.tsx: units agree in number (שדה/שדות, שדה מפתח/שדות מפתח, קשר ER/קשרי ER, טרנזקציה/טרנזקציות), and a zero reads "<plural>: אין במאגר". erd-inspector.tsx: "טבלה אחת ברשימה" / "N טבלאות ברשימה". A row from another module now leads with the module code, taken from the typed union (`PP-PI` hyphenated), followed by a real space. workspace-chapter.tsx: the collapsed-chapter head reuses the existing countLabel values. lang.ts slashBreaks inserts `<wbr>` only, so a copied SAP code is unchanged. The only new CSS `content:` is `attr(data-label)`, whose values are the enh-data.ts column names (סוג, שימוש, מגבלות והסתייגויות, מעמד ב-S/4HANA, מימוש). The manifest labels are clean ("טבלאות SAP מתיעוד PM ו-PP-PI").
- **No invented SAP facts** in any new string or doc. The csv row for `/tcode/ECC/` correctly says that ECC is a release or product name, not a T-code, and that the blueprint source row needs checking (it is marked לבדיקה, P1). The sampled register rows name only the legacy URLs themselves.
- **BLOCKERS §3 "Deprecated" matches the data in substance.** For `ewm` (entry at data/ecc-s4.ts:127, s4 text at :129), the quote "WM קלאסי במצב Compatibility (תמיכה מוגבלת בזמן); Embedded EWM הוא הכיוון" is verbatim and is read as "not strategic". For `foreign-trade` (entry at :148, s4 text at :150), the quote "SD-FT הוסר; הפונקציונליות עוברת ל-SAP GTS" is verbatim (only the trailing parenthesis is dropped) and is read as "removed". The doc says the display shows "הוסר או לא אסטרטגי". That is verified: components/neo-shell/s4/s4-data.ts:137-140 combines lib/evidence/types.ts:155 "הוסר" and :153 "לא אסטרטגי". OWNER-QUESTIONS 8.5 is consistent with both.
- **ECC vs S/4HANA.** The round adds no new release claim. The existing ones are quoted from the data and attributed.
- **Terminology.** PP-PI is hyphenated, IDoc, BAPI, CDS and S/4HANA are spelled canonically, and SAP codes stay in Latin uppercase.
- **Em/en dashes.** None in any round-3 added doc line, in QA-R3.md or in SOURCES.md. The ERD placeholder "–" predates the round and is an empty-cell mark, not a separator.
- **Doc pointers.** Every file PRODUCT.md, DESIGN.md and BLOCKERS point to exists.

## Number spot-checks (evidence = /Users/salihalif/Desktop/My-Projects/neo-redesign-evidence)
| # | doc claim | evidence | result |
|---|---|---|---|
| 1 | Sitemap has 4,521 URLs, 4,520 of them legacy redirect sources (OWNER-QUESTIONS 8.1, QA-R3 §6) | r3/final6/gates/sitemap.log | matches |
| 2 | 40 art-direction shots | r3/art-shots (40 png) | matches |
| 3 | Blind scores 73 / 70 / 69 / 53 | r3/art-blind | matches |
| 4 | Phone LCP with gzip: 1,072 / 1,504 / 1,828 ms | r3/final4/vitals-gzip.json | matches |
| 5 | Tables HTML 1,028,763 bytes; 531,649 before the reveal; 27,307 and 111,967 gzipped | r3/final5/tables-bytes.json | matches |
| 6 | 855 inline icons, 324,458 bytes, 47 distinct (61%, 31.5%) | r3/final5/tables-bytes.json, recomputed | matches |
| 7 | ERD floor: zoom 0.453, 14.5px, target 52.5px | r3/erd-label-floor-2.json, r3/final6/erd-label-floor.json | matches |
| 8 | 7,884 built pages; crawl 7,885 pages, 0 dead links | r3/final4/build-full.log, r3/final4/gates/crawl.log | matches |
| 9 | 574/574, 266 tests, 408 lint warnings, reader 108/108 | r3/final4/gates/*.log | matches |
| 10 | ERD arrival "8 of 8" | r3/final6/erd-hash-*.png (8 profiles) | count matches; wording is F7 |
| 11 | 465 register rows: 202 / 233 / 30, and P1 110 / P2 309 / P3 46 | legacy-register.csv | matches |
| 12 | 4,002 / 176 / 465; 465 rules, 413 explicit, 50 templates | legacy-links/redirect-report.r3.json | matches; the sum is F3 |
| 13 | Register "generated from r3/redirect-report-final.json" | that file says 466 hubs and 457 rules | does not match: F2 |
| 14 | Sprite "would cut the DOM by about 17%" | nothing in r3/ | not traceable: F4 |
| 15 | RUN-LOCAL "457 redirects in vercel.json" | vercel.json has 465 | stale: F1 |
| 16 | Brand red #d62027 at 5.13:1 and #e0262d at 4.68:1 against white; LCP moved by at most 32ms | recomputed by WCAG formula and from the table | matches |

## Findings
| location | severity | issue | fix |
|---|---|---|---|
| `docs/redesign-2026-09/RUN-LOCAL.md:15` | MINOR | "כולל 457 ההפניות של `vercel.json`" is stale. vercel.json has held 465 redirects since fb590bf0, and NAV-LEGACY and redirect-report.r3.json both say 465. | Change 457 to 465. |
| `docs/redesign-2026-09/LEGACY-REGISTER.md:3` | MINOR | The provenance line names `neo-redesign-evidence/r3/redirect-report-final.json` as the source. That file is the pre-fb590bf0 report (hub 466, rules 457, explicit 405), yet the register states 465 pages. The 465 traces to `legacy-links/redirect-report.r3.json` and to the csv. | Point the line at `legacy-links/redirect-report.r3.json`, or regenerate the r3 report from the final export. |
| `docs/redesign-2026-09/NAV-LEGACY.md` (the sentence after the table at :59-61) | MINOR | "465 כללים: 50 תבניות ו־413 כללים מפורשים" adds up to 463. The report itself has rules 465, explicit 413, patterns 50, so two rules are left unnamed while the colon presents the two groups as the whole. | Name the remaining 2 rules ("ועוד 2 כללים ש..."), or write "מהם 50 תבניות ו־413 כללים מפורשים". |
| `docs/redesign-2026-09/BLOCKERS.md` §6, "אייקוני הקטלוג", third sub-bullet | MINOR | "Sprite עם `<use>` יקטין את ה־DOM בכ־17%" was added in round 3 (absent at 2031581e). No evidence file in r3/ carries a DOM figure, since tables-bytes.json measures bytes only. It is stated as fact right beside a measured byte figure. | Cite the measuring file, or mark the figure "הערכה, לא נמדד", or drop it. |
| `docs/redesign-2026-09/OWNER-QUESTIONS.md` 8.4 | MINOR | It sends the owner to 'עמודה "החלטת בעלים"' in LEGACY-REGISTER.md, and the register has no column by that name. The per-row column is "owner decision" (:67, value "required" in all 465 rows). "החלטת בעלים" is one of the values of "exact page needed" and covers only 30 rows. | Point to the "owner decision" column, or rename that column "החלטת בעלים" and the 30-row value "כלי: החלטת בעלים". |
| `docs/redesign-2026-09/LEGACY-REGISTER.md:1-17, :21, :67` | MINOR | The owner-facing register is written in English: title, rules, column headers and the per-row value "required". Its values are Hebrew (כן, לבדיקה, החלטת בעלים), so tables mix the two languages. Every other round-3 owner doc is Hebrew. | Write the prose and headers in Hebrew (the csv can keep machine headers), or state at the top that the register is English by design. |
| `docs/redesign-2026-09/QA-R3.md` §2, ERD-hash table, row "אחרי" | MINOR | "AUFK ביום ובלילה, ב־1440, ‏1280 ו־390" reads as six AUFK runs. The final6 set has four: 1440 day, 1440 night, 1280 day and 390 day. Together with AFKO 1440 night, PLKO 1728 day, IFLOT 1280 night and EQUI 1440 day, that makes the 8 behind "8 מתוך 8". As written, the sentence claims night coverage that was not run. | "AUFK ב־1440 ביום ובלילה, וב־1280 וב־390 ביום". |
| `docs/redesign-2026-09/SOURCES.md:4` (and the heroui.com and vengenceui rows) | MINOR | The research logs that back the "מה נלמד" column (`research-log.md`, `research-log-2.md`, `skills-inventory.md` "בתיקיית הסבב") are at no findable path: they are in neither neo-redesign-evidence/ nor docs/. Their figures, such as HeroUI "Ocean oklch(0.140 0.020 230)", 4000ms and 200ms / 8px / 0.98, appear only in SOURCES.md and ART-DIRECTION.md. | Give the logs' absolute path, or copy them into neo-redesign-evidence/r3/. |
| `docs/redesign-2026-09/SOURCES.md` §1, row ui.shadcn.com, "מה נלמד" | MINOR | "ערך אחד עם שני ערכים ליום וללילה" contradicts itself ("one value with two values"). | "טוקן אחד, עם ערך ליום וערך ללילה". |

## Verdict
VERDICT: FAIL. 0 BLOCKER, 0 MAJOR, 9 MINOR. No invented SAP fact, the ECC/S/4HANA attribution and terms are clean, and the round's UI strings and the BLOCKERS "Deprecated" wording are correct. The 9 open MINOR items are doc accuracy and wording (a stale count, a stale provenance pointer, a sum that does not add up, an untraced 17%, a misnamed column pointer, the English register, an overstated run set, an unresolvable research-log path, one self-contradicting phrase).
