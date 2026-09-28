# Astra re-verify · 2026-09-28T16:43:16.149Z

Base: `http://localhost:4196` · matrix: `audit/ux-2026-09/COVERAGE-MATRIX.md` (140 rows) · PASS 115 · FAIL 0 · NOT_MEASURABLE 25 · 50 runs · 1952.62s

| row | scripts | result | evidence |
|---|---|---|---|
| INS-1 | — | NOT_MEASURABLE | guidance row (הנחיות לקלוד), nothing to measure |
| INS-2 | — | NOT_MEASURABLE | guidance row (הנחיות לקלוד), nothing to measure |
| INS-3 | — | NOT_MEASURABLE | guidance row (הנחיות לקלוד), nothing to measure |
| INS-4 | — | NOT_MEASURABLE | guidance row (הנחיות לקלוד), nothing to measure |
| INS-5 | — | NOT_MEASURABLE | guidance row (הנחיות לקלוד), nothing to measure |
| INS-6 | — | NOT_MEASURABLE | guidance row (הנחיות לקלוד), nothing to measure |
| SCOPE-1 | — | NOT_MEASURABLE | scope row, nothing to measure |
| SCOPE-2 | — | NOT_MEASURABLE | scope row, nothing to measure |
| SCOPE-3 | — | NOT_MEASURABLE | scope row, nothing to measure |
| SCOPE-4 | — | NOT_MEASURABLE | scope row, nothing to measure |
| KEEP-1 | astra-extra-check | PASS | {"brand":"#d62027","canvas":[239,231,218],"card":[231,243,245],"warm":21,"canvasLum":0.909,"cardLum":0.944} |
| KEEP-2 | astra-extra-check | PASS | {"h1":"AFKO","hebrewInHeader":true} |
| KEEP-3 | astra-extra-check | PASS | {"linksPerSection":{"rel":9,"tx":8,"if":3,"books":7},"docRecordChars":557} |
| KEEP-4 | astra-extra-check | PASS | {"lanes":3,"nodes":11,"unstatedCards":10} |
| KEEP-5 | astra-extra-check | PASS | {"block":true,"status":"לא אסטרטגי ב-S/4HANA","sources":6,"needsFlag":null} |
| KEEP-6 | astra-extra-check | PASS | {"covers":11,"depth":22,"consoleErrors":0} |
| PRIO-1 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-2 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-3 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-4 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-5 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-6 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-7 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| PRIO-8 | — | NOT_MEASURABLE | priority row mapped to S-rows, nothing to measure |
| S3-1 | r3d-check, r3c-check | PASS | focus: rail=false top=false dock=false exit=true → Esc rail=true top=true; r3c erd focus=1 studio=1 reader=1; errs 0+0 |
| S3-2 | shelf-check | PASS | fresh shelf: one row h=35px (≤40; 34 in round 3.1) empty=1 tabs=false; errs 0; after direct goto AFKO: empty=1 tabs=false (not judged: direct navigation never records a recent object, only a catalog click does) |
| S3-3 | dock-check | PASS | bar controls=2 theme radio=true faces=4 sizes=4; after 'לילה': theme=dark state=לילה; errs 0 |
| S4-1 | type-profile | PASS | h1 gate=86.64px (86.6) work=36/36/36/36/36/36/36px (28–36; module heroes pm/pp-pi 56.316/56.316px as in round 6) detail=39.882/39.882/39.882/40/40/40/40px (≤40); prose<13px tables=9%(≤9) transactions=21%(≤22) bapi=0%(≤0) cds=4%(≤4) fiori-apps=2%(≤5) academy=17%(≤17) |
| S4-2 | static-fetch, catalog-cards-check | PASS | BAPI page: /neo/bapi/BAPI_ALM_CONF_CREATE/ http 200 ok; Fiori detail copy button=true code=F0247A |
| S4-3 | bidi-scan | PASS | 32 routes: latin=3802 nonIsolated=0 orderSensitive=0 |
| S5-1 | module-colour-check | PASS | light: 6 module tokens, 0 inconsistent, 0 collisions; dark: 6, 0, 0 |
| S5-2 | status-consistency | PASS | 12 records: 12 same across list/detail/ERD/palette, 0 contradictions, errs 0 |
| S5-3 | status-consistency | PASS | 12/12 records: every canonical pill carries glyph+word |
| S6-1 | ux-measure.1363x936-light-desktop | PASS | 32/32 routes 0 dim (1363 light) |
| S6-2 | ux-measure.1363x936-light-desktop, ux-measure.1440x900-light-desktop | PASS | 1363: 32/32 routes 0 overflow (cockpit canvas+0 domain-floc+0 s4-center+0); 1440: 32/32 routes 0 overflow |
| S6-3 | present-check | PASS | ERD present=1 focus=1 legend=4 zoom=100% xs .8125rem→.95rem Esc→present=0; Studio present=1 focus=1 zoom=90% exit=0; errs 0 |
| S6-4 | open-rows-check | PASS | light: list 15 rows 44px stage=false → map 26% → module 17% → card 110%, overflow 0, errs 0; dark: list 15 rows 44px stage=false → map 26% → module 17% → card 110%, overflow 0, errs 0 |
| S7-HOME-1 | ux-measure.1363x936-light-desktop | PASS | /neo/ contentH=3148px (≤4,000) |
| S7-HOME-2 | r3d-check | PASS | 5/5 home actions present: חיפוש טבלה=1 פתיחת תהליך עסקי=1 בדיקת שינוי ב-=1 המשך ללמוד=1 מודל הנתונים=1 |
| S7-HOME-3 | astra-extra-check | PASS | {"lede":"פלטפורמת ידע מקצועית למודולי PM ו-PP-PI: אובייקטים עסקיים, טבלאות, טרנזקציות, קשרי נתונים והמעבר מ-ECC ל-S/4HANA. זמינה במלואה גם ללא חיבור לרשת.","sentences":2,"structureWordsInOpener":[],"secondarySections":3} |
| S7-HOME-4 | present-check | PASS | 3 gate metrics, 3 links: 105→/neo/tables/ 148→/neo/transactions/ 14→/neo/s4hana/ |
| S7-HOME-5 | static-fetch | PASS | /neo/ has no '1[01] ספרים' count: /neo/ http 200 ok |
| S7-PM-1 | r3b-check | PASS | /neo/pm/ chapters closed=5 open=0, #nw-if anchor → open, canvasH=11057px (was 16,707); errs 0 |
| S7-PM-2 | r3b-check | PASS | → S7-PM-1: /neo/pm/ chapters closed=5 open=0, #nw-if anchor → open, canvasH=11057px (was 16,707); errs 0 |
| S7-PM-3 | r3b-check | PASS | → S7-PM-1: /neo/pm/ chapters closed=5 open=0, #nw-if anchor → open, canvasH=11057px (was 16,707); errs 0 |
| S7-PM-4 | r3-check | PASS | topic CTA 'הצג 6 טבלאות של הנושא', table top after click=122px (<936) |
| S7-PM-5 | sticky-depth-check | PASS | desktop rail@[217,106,106,-4843] filter@[217,106,106,-4843]; phone rail@[245,114,114,114] filter@[245,114,114,114]; errs 0+0 |
| S7-DOM-1 | r3-check | PASS | domains 39→5 for 'ציוד', count line '5 מתוך 39 תחומים · «ציוד» ניקוי הסינון', empty state=true |
| S7-DOM-2 | open-rows-check | PASS | steps 5/5/5/5, rows 390=3 1363=1 1440=1 1920=1, em 13.6px, chain link=true, overflow 0/0/0/0 |
| S7-S4C-1 | r3b-check | PASS | /neo/s4hana/ tools=true groups בוטל6ה:open הוחלף5:open השתנה1:closed נשאר8ה:closed actions=29 filter 'השתנה' → '10 מתוך 29 אובייקטים · השתנה ניקוי הסינון' canvasH=8652px (was 11,465) |
| S7-READ-1 | static-fetch | PASS | /neo/s4-readiness/ http 200 ok |
| S7-COCK-1 | ux-measure.1363x936-light-desktop | PASS | cockpit 1363: page+0 canvas+0 (was +208) canvasW=1083 |
| S7-COCK-2 | r3b-check | PASS | #mo-workcenter: details open=true :target=true top=116 |
| S7-COCK-3 | ux-measure.390x844-light-phone | PASS | cockpit 390 phone: page+0 canvas+0 errs 0 |
| S7-COCK-4 | r3b-check | PASS | cockpit canvasH=7327px (8,104 after round 3.3, ≤8,900; was 12,624), closed wave present=true |
| S7-CAT-1 | r3-check, static-fetch | PASS | empty state 'לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים.'; /neo/tables/ http 200 ok |
| S7-CAT-2 | catalog-cards-check | PASS | 30 tx rows, chips max 2 avg 1.5, refs chip=false, 30/30 canonical pills |
| S7-CAT-3 | catalog-cards-check | PASS | 90 function rows, 87 with operation chip, 43 with COMMIT chip |
| S7-CAT-4 | astra-extra-check | PASS | {"blockOrder":["h1","tools","filters","count","list"],"identicalAcross7":true,"perCatalog":{"/neo/tables/":"h1>tools>filters>count>list","/neo/transactions/":"h1>tools>filters>count>list","/neo/bapi/":"h1>tools>filters>count>list","/neo/idoc/":"h1>tools>filters>count>list","/neo/cds/":"h1>tools>filters>count>list","/neo/fiori-apps/":"h1>tools>filters>count>list","/neo/enhancements/":"h1>tools>filt |
| S7-CAT-5 | catalog-cards-check | PASS | /neo/cds/I_Batch/: chain=true from 2 via I_Batch to 2, copy 1/1 code blocks |
| S7-CAT-6 | catalog-cards-check | PASS | 34/34 Fiori rows name-first; detail h1='ניטור כיסוי חומרים — מקטעי נטו' code=F0247A |
| S7-CAT-7 | catalog-cards-check | PASS | enhancements table: 13 rows, 6 cols, 13 pills, 13 links, overflow-x auto |
| S7-CAT-8 | astra-extra-check | PASS | {"toolbarOrder":["search","view","sort"],"identicalAcross7":true,"perCatalog":{"/neo/tables/":"search>view>sort","/neo/transactions/":"search>view>sort","/neo/bapi/":"search>view>sort","/neo/idoc/":"search>view>sort","/neo/cds/":"search>view>sort","/neo/fiori-apps/":"search>view>sort","/neo/enhancements/":"search>view>sort"}} |
| S7-TBL-1 | catalog-cards-check | PASS | AFKO fields section at 924px = 0.99 screens (≤1.5; was 2.3); nav 01שדות ומפתחות · 02קשרים ו-JOIN · 03המעבר ל-S/4HANA |
| S7-TBL-2 | static-fetch | PASS | nxb-cta-note on /neo/tables/AFKO/: /neo/tables/AFKO/ http 200 ok |
| S7-TBL-3 | astra-extra-check | PASS | → S9-1: {"neoSourceHits":[],"legacyOpeners":{"/sap-notes/":{"status":200,"lede":"23 נושאי פתרון ל-PM/PP/PP-PI לפי רכיב SAP (Application Component) ומילות חיפוש מאומתות ל-O","builtNote":false},"/knowledge/":{"status":200,"lede":"שכבת הידע המקצועית של NEO — מאורגנת לפי מה שאתה צריך לעשות, לא לפי סוג טכני. התחל בחיפוש, ","builtNote":false}}} |
| S7-TBL-4 | catalog-cards-check | PASS | header pill 'ללא שינוי ב-S/4HANA' at 488px < evidence block 2904px |
| S7-ERD-1 | ux-measure.1363x936-light-desktop, clip-check.1363x936-light-desktop | PASS | ERD opens at zoom 61% (fit), clipped=0, overflow page+0 canvas+0 |
| S7-ERD-2 | astra-extra-check | PASS | {"at1363":{"zoom":"61%","nodes":15,"outside":0},"at1100":{"zoom":"65%","nodes":15,"outside":0},"backTo1363":{"zoom":"61%","nodes":15,"outside":0},"consoleErrors":0} |
| S7-ERD-3 | r3c-check | PASS | overview inspector 304px (≤310; 19rem), level=overview |
| S7-ERD-4 | erd-selection-check | PASS | desktop:AFKO 5/24 sel op 0.96/sw 3.2 vs 0.22/1.84; desktop:EQUI 5/24 sel op 0.96/sw 3.2 vs 0.22/1.84; phone:AFKO 5/24 sel op 0.96/sw 3.2 vs 0.22/1.84; phone:EQUI 5/24 sel op 0.96/sw 3.2 vs 0.22/1.84 |
| S7-ERD-5 | round6-misc-check | PASS | #AFKO: 5 sentences for 5 relations |
| S7-ERD-6 | r3c-check | PASS | mode chip 'מצבסקירה · כל המודולים' → 'מצבדפדוף במודול PP' |
| S7-3D-1 | — | NOT_MEASURABLE | no 3D view in this repo; the Preview is blocked by Vercel Authentication |
| S7-STU-1 | present-check | PASS | start 16 nodes / zoom 116% / label 13.7px on screen (≥11), layer 'שכבה: נתוני אב16 מתוך 56 טבלאות המודול'; all 56 nodes @ 63% |
| S7-LIB-1 | astra-extra-check | PASS | {"covers":11,"depth":22} |
| S7-LIB-2 | round6-misc-check | PASS | first cover top 675px (< 936), coverage bar 4980px after it |
| S7-LIB-3 | astra-extra-check | PASS | {"freshProfile":0,"afterReadingBook2":[{"text":"המשך קריאה בתת-הפרק","primary":true}],"consoleErrors":0} |
| S7-LIB-4 | open-rows-check | PASS | coverage line 'התיעוד הטכני של Project NEO מכסה 2 מודול…', details closed→open false→true, 3 notes, summary 44px phone / 44px desktop in view (layout 44/44px), overflow 0 |
| S7-LIB-5 | round6-misc-check | PASS | basic bar: langs=true size=true focus=true, 'עוד' toggle=true closed=true → open 6 advanced controls, aria-expanded=true |
| S7-LIB-6 | round6-misc-check, r3c-check | PASS | advanced tools folded (6 behind 'עוד'); reader focus: focus=1 rail=false dock=false top=false |
| S7-LIB-7 | verify-reader, ux-measure.1363x936-light-desktop, ux-measure.390x844-light-phone | PASS | verify-reader 108/108 passed; /neo/read/book2/ overflow 1363=0+0 390=0+0 |
| S7-AI-1 | round6-misc-check | PASS | desktop:/neo/ai/ composer 221px/936, desktop:/neo/chat/ composer 324px/936, phone:/neo/ai/ composer 264px/844, phone:/neo/chat/ composer 379px/844 |
| S7-AI-2 | r3d-check | PASS | starters chat=4 library=4 (≤4) |
| S7-AI-3 | astra-extra-check | PASS | {"/neo/ai/":{"limitsHeading":false,"advisory":"התשובות נכתבות מתוך ספרי SAP שבספרייה: הסבר, סיכום, השוואה, תרשים והפניה למקור המדויק"},"/neo/chat/":{"limitsHeading":true,"advisory":"התשובות מבוססות על ידע כללי ויש לאמת מזהים ומספרי Note מול מקור רשמי"}} |
| S7-AI-4 | round6-misc-check | PASS | chat h1 'שיחה כללית על SAP', dock 'עזרה בעמוד', panel 'עזרה בעמוד הזה', library h1 'שאל את הספרייה' |
| S7-AI-5 | ai-states-check | PASS | 27/27 controlled AI-state scenarios ok (desktop+phone) |
| S7-AI-6 | — | NOT_MEASURABLE | manual live AI test (paid external service), by design not automated |
| S7-KN-1 | open-rows-check | PASS | 33 concept rows, 0 duplicated titles; /neo/knowledge/table/ refs=6 slug-as-primary=0 |
| S7-KN-2 | static-fetch | PASS | 'העתק תבנית' on /neo/centers/toolkit/: /neo/centers/toolkit/qa-template/ http 200 ok |
| S7-KN-3 | r3d-check | PASS | nx-gate-note knowledge=true centers=true domains=true |
| S7-AC-1 | r3d-check | PASS | 'מה תלמד'=true 'התחלת הלמידה'=true |
| S7-AC-2 | static-fetch | PASS | /neo/academy/ http 200 ok |
| S7-AC-3 | r3d-check | PASS | /neo/academy/pm/pm-org-structure/: local TOC=true for 20 blocks |
| S7-AC-4 | r3d-check | PASS | exposure line=true, read word 'נצפה' on 20/20 sections after scrolling the lesson (0 before), 'נקראו' present=false |
| S7-AC-5 | r3d-check | PASS | → S7-AC-4: exposure line=true, read word 'נצפה' on 20/20 sections after scrolling the lesson (0 before), 'נקראו' present=false |
| S7-CERT-1 | r3d-check, static-fetch | PASS | academy link 'תרגול ובדיקת ידע'=true; /neo/certification/ http 200 ok |
| S7-CERT-2 | open-rows-check | PASS | pickers 3, CTA 44px phone (≥44), details 2 closed 2, /neo/certification/exam/?mod=PP-PI&level=3&len=10&start=1 → phase=run 1/10, /exam/ direct → setup; overflow 0 |
| S7-INC-1 | r3d-check | PASS | cogi-stuck offsets sym=44741 < fix=52273 < s4=53221 < scenario=54489 |
| S8-1 | crawl-dead-links, static-fetch | PASS | crawl: 0 dead; /neo/academy/mm/: 0 hrefs to /academy/lesson/, 122 to /neo/academy/mm/ |
| S8-2 | — | NOT_MEASURABLE | product/dataset decision (NOT_IN_DATASET), nothing to measure |
| S9-1 | astra-extra-check | PASS | {"neoSourceHits":[],"legacyOpeners":{"/sap-notes/":{"status":200,"lede":"23 נושאי פתרון ל-PM/PP/PP-PI לפי רכיב SAP (Application Component) ומילות חיפוש מאומתות ל-O","builtNote":false},"/knowledge/":{"status":200,"lede":"שכבת הידע המקצועית של NEO — מאורגנת לפי מה שאתה צריך לעשות, לא לפי סוג טכני. התחל בחיפוש, ","builtNote":false}}} |
| S9-2 | static-fetch | PASS | /neo/academy/pm/ http 200 ok |
| S9-3 | r3-check | PASS | tables 'לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים.'; domains 'לא נמצאו תחומים מתאימים. נסה חיפוש אחר או נקה מסננים.' |
| S9-4 | static-fetch | PASS | /neo/bapi/ http 200 ok; /neo/fiori-apps/ http 200 ok; /neo/cds/ http 200 ok; /neo/bapi/BAPI_ALM_CONF_CREATE/ http 200 ok |
| S9-5 | static-fetch | PASS | /neo/tables/AFKO/ http 200 ok |
| S9-6 | static-fetch | PASS | wording present in 1yspj1hd4z461.js |
| S10-1 | a11y-sample.light, a11y-sample.dark | PASS | light: 37 routes, 15,924 text nodes, 0 contrast failures; dark: 37 routes, 15,924 text nodes, 0 contrast failures |
| S10-2 | ux-measure.390x844-light-phone, ux-measure.834x1112-light-tablet | PASS | 390×844 iPhone UA: 32/32 routes 0 overflow; 0 routes with console errors; 834×1112 iPad UA: 834x1112-light-tablet: 32/32 routes 0 overflow; 32/32 routes 0 dim; 0 routes with console errors |
| S10-3 | a11y-sample.light | PASS | targets <24×24: 5 over 37 routes (≤5 documented exempt: 2 sr-only skip links, 2 legacy privacy links, 1 inline) · /neo/academy/ 1 (a 89×16 'תרגול ובדיקת י'), /exits/CMOD-SMOD/ 2 (a 1×1 'דלג לתוכן'; a 71×15 'מדיניות פרטיות'), /exits/Implicit-Enhancement/ 2 (a 1×1 'דלג לתוכן'; a 71×15 'מדיניות פרטיות') |
| S10-4 | keyboard-check.1363, keyboard-check.390, a11y-sample.light | PASS | 1363: 32 routes 1280 stops, 0 off-screen, 0 traps, 0 without visible ring; 390: 32 routes 1280 stops, 0 off-screen, 0 traps, 0 without visible ring; a11y-sample focus-obscured on /neo/* = 0 |
| S10-5 | ux-measure.1363x936-light-reduce-desktop, ux-measure.1363x936-dark-desktop | PASS | 1363x936-light-reduce-desktop: 32/32 routes 0 overflow; 32/32 routes 0 dim; 0 routes with console errors; 1363x936-dark-desktop: 32/32 routes 0 overflow; 32/32 routes 0 dim; 0 routes with console errors |
| S10-6 | ux-measure.1920x1080-light-desktop, ux-measure.1440x900-light-desktop | PASS | 1920x1080-light-desktop: 32/32 routes 0 overflow; 32/32 routes 0 dim; 0 routes with console errors; 1440x900-light-desktop: 32/32 routes 0 overflow; 32/32 routes 0 dim; 0 routes with console errors |
| S11-1 | astra-extra-check | PASS | {"count":"1 מתוך 105 טבלאות · ניקוי הסינון","rows":1} |
| S11-2 | astra-extra-check | PASS | {"empty":true,"buttons":["הצגת כל הטבלאות","ניקוי החיפוש בלבד"],"afterShowAll":{"count":"105 מתוך 105 טבלאות","query":""},"consoleErrors":0} |
| S11-3 | astra-extra-check | PASS | {"chip":"01שדות ומפתחות","top":118,"active":"true","consoleErrors":0} |
| S11-4 | astra-extra-check | PASS | {"lanesNodes":11,"round1":21,"consoleErrors":0} |
| S11-5 | astra-extra-check | PASS | {"afterKey0":{"zoom":"61%","nodes":15,"outside":0}} |
| S12-R1 | — | NOT_MEASURABLE | round summary row (commit references) |
| S12-R2 | — | NOT_MEASURABLE | round summary row (commit references) |
| S12-R3 | — | NOT_MEASURABLE | round summary row |
| ACC-1 | catalog-cards-check | PASS | AFKO: fields at 0.99 screens, header pill 488px < evidence 2904px |
| ACC-2 | sticky-depth-check | PASS | pressed filter visible desktop=[----] phone=[----] ('') |
| ACC-3 | status-consistency | PASS | → S5-2: 12 records: 12 same across list/detail/ERD/palette, 0 contradictions, errs 0 |
| ACC-4 | ux-measure.1363x936-light-desktop, clip-check.1363x936-light-desktop, r3c-check, r3b-check | PASS | ERD zoom 61% clipped=0 panel 304px; cockpit anchor open=true target=true |
| ACC-5 | ux-measure.1363x936-light-desktop, ux-measure.1440x900-light-desktop | PASS | → S6-2: 1363: 32/32 routes 0 overflow (cockpit canvas+0 domain-floc+0 s4-center+0); 1440: 32/32 routes 0 overflow |
| ACC-6 | astra-extra-check | PASS | {"desktop first-visit welcome dialog":true,"desktop /library/":{"href":"/neo/","w":127,"h":36},"desktop /knowledge/":{"href":"/neo/","w":127,"h":36},"desktop /tables/":{"href":"/neo/","w":127,"h":36},"desktop /sap-notes/":{"href":"/neo/","w":127,"h":36},"desktop click":{"landed":"/neo/","consoleErrors":0},"phone first-visit welcome dialog":true,"phone /library/":{"href":"/neo/","w":38,"h":36},"pho |
| S12-REC | — | NOT_MEASURABLE | round summary row |
| APPX-1 | ux-measure.1363x936-light-desktop | PASS | → S7-COCK-1: cockpit 1363: page+0 canvas+0 (was +208) canvasW=1083 |
| APPX-2 | ux-measure.1363x936-light-desktop | PASS | readiness: dim=0 min opacity 1 (was 0.45) |
| APPX-3 | ux-measure.1363x936-light-desktop, clip-check.1363x936-light-desktop | PASS | → S7-ERD-1: ERD opens at zoom 61% (fit), clipped=0, overflow page+0 canvas+0 |
| APPX-4 | astra-extra-check | PASS | {"opening":{"zoom":"61%","nodes":15,"outside":0},"fit":{"zoom":"61%","nodes":15,"outside":0}} |
| SAP-1 | astra-extra-check | PASS | {"status":200,"simplification":true,"ristra20":true,"successorIP30H":true} |
| SAP-2 | astra-extra-check | PASS | {"status":[200,200],"taskShowsQMSM":true,"activityShowsQMMA":true,"oldMixedClaim":false} |
| SAP-3 | astra-extra-check | PASS | {"status":200,"QA08":true,"MM01":true} |
| SAP-4 | astra-extra-check | PASS | {"status":200,"TXTSH":true,"TXTMD":true} |
| SAP-5 | astra-extra-check | PASS | {"status":{"bapi":200,"idocBOMMAT":200,"idoc":200},"bapiStats":["142 אובייקטי פונקציה","59 BAPIs","83 מודולי פונקציה (FM)","130 מתועדים לעומק","57 רשומות מאומתות","23 חוצי מודולים","3 משתנים ב-S/4HANA","23 עם תצוגת CDS מקבילה"],"idocStats":["3 סוגי הודעה במאגר","3 רשומות פיזיות","7 קודי סטטוס מתועדים","4 טרנזקציות ניטור","1 מודולים"]} |
| SAP-6 | astra-extra-check | PASS | {"status":[200,200],"customerExitNamesCMOD":true,"legacyCMODpointsToNeo":true,"legacyImplicitPointsToNeo":true} |
| SAP-7 | astra-extra-check | PASS | {"status":200,"missing":[]} |
| SAP-8 | astra-extra-check | PASS | {"status":[200,200],"getlistShowsCOR6N_CORK":true,"batchShowsBUS1001002":true,"oldNamesOutsideEvidence":{}} |

## Runs

| run | script | env | exit | seconds | output |
|---|---|---|---|---|---|
| ux-measure.1363x936-light-desktop | node scripts/qa/ux-measure.mjs | VW=1363 VH=936 | 0 | 44.5 | audit/master-completion/astra-reverify/runs/ux-measure.1363x936-light-desktop.json |
| ux-measure.1363x936-dark-desktop | node scripts/qa/ux-measure.mjs | VW=1363 VH=936 THEME=dark | 0 | 44.1 | audit/master-completion/astra-reverify/runs/ux-measure.1363x936-dark-desktop.json |
| ux-measure.1363x936-light-reduce-desktop | node scripts/qa/ux-measure.mjs | VW=1363 VH=936 MOTION=reduce | 0 | 44.1 | audit/master-completion/astra-reverify/runs/ux-measure.1363x936-light-reduce-desktop.json |
| ux-measure.390x844-light-phone | node scripts/qa/ux-measure.mjs | VW=390 VH=844 UA=phone | 0 | 44.2 | audit/master-completion/astra-reverify/runs/ux-measure.390x844-light-phone.json |
| ux-measure.390x844-dark-phone | node scripts/qa/ux-measure.mjs | VW=390 VH=844 UA=phone THEME=dark | 0 | 44 | audit/master-completion/astra-reverify/runs/ux-measure.390x844-dark-phone.json |
| ux-measure.320x568-light-phone | node scripts/qa/ux-measure.mjs | VW=320 VH=568 UA=phone | 0 | 43.7 | audit/master-completion/astra-reverify/runs/ux-measure.320x568-light-phone.json |
| ux-measure.682x468-zoom200-desktop | node scripts/qa/ux-measure.mjs | VW=682 VH=468 | 0 | 43.3 | audit/master-completion/astra-reverify/runs/ux-measure.682x468-zoom200-desktop.json |
| ux-measure.390x844-light-desktop | node scripts/qa/ux-measure.mjs | VW=390 VH=844 | 0 | 43.2 | audit/master-completion/astra-reverify/runs/ux-measure.390x844-light-desktop.json |
| ux-measure.320x568-light-desktop | node scripts/qa/ux-measure.mjs | VW=320 VH=568 | 0 | 43.2 | audit/master-completion/astra-reverify/runs/ux-measure.320x568-light-desktop.json |
| ux-measure.834x1112-light-tablet | node scripts/qa/ux-measure.mjs | VW=834 VH=1112 UA=tablet | 0 | 44.7 | audit/master-completion/astra-reverify/runs/ux-measure.834x1112-light-tablet.json |
| ux-measure.1440x900-light-desktop | node scripts/qa/ux-measure.mjs | VW=1440 VH=900 | 0 | 44.1 | audit/master-completion/astra-reverify/runs/ux-measure.1440x900-light-desktop.json |
| ux-measure.1920x1080-light-desktop | node scripts/qa/ux-measure.mjs | VW=1920 VH=1080 | 0 | 44.8 | audit/master-completion/astra-reverify/runs/ux-measure.1920x1080-light-desktop.json |
| clip-check.1363x936-light-desktop | node scripts/qa/clip-check.mjs | VW=1363 | 0 | 40.2 | audit/master-completion/astra-reverify/runs/clip-check.1363x936-light-desktop.json |
| clip-check.1363x936-dark-desktop | node scripts/qa/clip-check.mjs | VW=1363 THEME=dark | 0 | 39.9 | audit/master-completion/astra-reverify/runs/clip-check.1363x936-dark-desktop.json |
| clip-check.390x844-light-phone | node scripts/qa/clip-check.mjs | VW=390 UA=phone | 0 | 39.8 | audit/master-completion/astra-reverify/runs/clip-check.390x844-light-phone.json |
| clip-check.390x844-dark-phone | node scripts/qa/clip-check.mjs | VW=390 UA=phone THEME=dark | 0 | 39.8 | audit/master-completion/astra-reverify/runs/clip-check.390x844-dark-phone.json |
| clip-check.320x568-light-phone | node scripts/qa/clip-check.mjs | VW=320 UA=phone | 0 | 39.4 | audit/master-completion/astra-reverify/runs/clip-check.320x568-light-phone.json |
| clip-check.682x468-zoom200-desktop | node scripts/qa/clip-check.mjs | VW=682 | 0 | 40.3 | audit/master-completion/astra-reverify/runs/clip-check.682x468-zoom200-desktop.json |
| clip-check.390x844-light-desktop | node scripts/qa/clip-check.mjs | VW=390 | 0 | 40.6 | audit/master-completion/astra-reverify/runs/clip-check.390x844-light-desktop.json |
| clip-check.320x568-light-desktop | node scripts/qa/clip-check.mjs | VW=320 | 0 | 40.2 | audit/master-completion/astra-reverify/runs/clip-check.320x568-light-desktop.json |
| clip-check.834x1112-light-tablet | node scripts/qa/clip-check.mjs | VW=834 UA=tablet | 0 | 39 | audit/master-completion/astra-reverify/runs/clip-check.834x1112-light-tablet.json |
| axe-sweep.1363-light | node scripts/qa/axe-sweep.mjs | VW=1363 | 0 | 47.6 | audit/master-completion/astra-reverify/runs/axe-sweep.1363-light.json |
| axe-sweep.1363-dark | node scripts/qa/axe-sweep.mjs | VW=1363 THEME=dark | 0 | 47.2 | audit/master-completion/astra-reverify/runs/axe-sweep.1363-dark.json |
| axe-sweep.390-light | node scripts/qa/axe-sweep.mjs | VW=390 | 0 | 47.2 | audit/master-completion/astra-reverify/runs/axe-sweep.390-light.json |
| axe-sweep.390-dark | node scripts/qa/axe-sweep.mjs | VW=390 THEME=dark | 0 | 47.2 | audit/master-completion/astra-reverify/runs/axe-sweep.390-dark.json |
| keyboard-check.1363 | node scripts/qa/keyboard-check.mjs | VW=1363 | 0 | 107.8 | audit/master-completion/astra-reverify/runs/keyboard-check.1363.json |
| keyboard-check.390 | node scripts/qa/keyboard-check.mjs | VW=390 | 0 | 108.5 | audit/master-completion/astra-reverify/runs/keyboard-check.390.json |
| a11y-sample.light | node scripts/qa/a11y-sample.mjs | — | 0 | 45.9 | audit/master-completion/astra-reverify/runs/a11y-sample.light.json |
| a11y-sample.dark | node scripts/qa/a11y-sample.mjs | THEME=dark | 0 | 44.5 | audit/master-completion/astra-reverify/runs/a11y-sample.dark.json |
| type-profile | node scripts/qa/type-profile.mjs | — | 0 | 29 | audit/master-completion/astra-reverify/runs/type-profile.json |
| bidi-scan | node scripts/qa/bidi-scan.mjs | — | 0 | 32.8 | audit/master-completion/astra-reverify/runs/bidi-scan.json |
| shelf-check | node scripts/qa/shelf-check.mjs | — | 0 | 3.2 | audit/master-completion/astra-reverify/runs/shelf-check.stdout.log |
| dock-check | node scripts/qa/dock-check.mjs | — | 0 | 2.2 | audit/master-completion/astra-reverify/runs/dock-check.stdout.log |
| module-colour-check | node scripts/qa/module-colour-check.mjs | — | 0 | 15.1 | audit/master-completion/astra-reverify/runs/module-colour-check.stdout.log |
| status-consistency | node scripts/qa/status-consistency.mjs | — | 0 | 35.4 | audit/master-completion/astra-reverify/runs/status-consistency.stdout.log |
| present-check | node scripts/qa/present-check.mjs | — | 0 | 9.1 | audit/master-completion/astra-reverify/runs/present-check.stdout.log |
| open-rows-check | node scripts/qa/open-rows-check.mjs | — | 0 | 36.9 | audit/master-completion/astra-reverify/runs/open-rows-check.stdout.log |
| sticky-depth-check | node scripts/qa/sticky-depth-check.mjs | — | 0 | 128.2 | audit/master-completion/astra-reverify/runs/sticky-depth-check.stdout.log |
| r3-check | node scripts/qa/r3-check.mjs | — | 0 | 5.3 | audit/master-completion/astra-reverify/runs/r3-check.stdout.log |
| r3b-check | node scripts/qa/r3b-check.mjs | — | 0 | 4 | audit/master-completion/astra-reverify/runs/r3b-check.stdout.log |
| r3c-check | node scripts/qa/r3c-check.mjs | — | 0 | 8 | audit/master-completion/astra-reverify/runs/r3c-check.stdout.log |
| r3d-check | node scripts/qa/r3d-check.mjs | — | 0 | 7.9 | audit/master-completion/astra-reverify/runs/r3d-check.stdout.log |
| astra-extra-check | node scripts/qa/astra-extra-check.mjs | — | 0 | 45.3 | audit/master-completion/astra-reverify/runs/astra-extra-check.stdout.log |
| round6-misc-check | node scripts/qa/round6-misc-check.mjs | — | 0 | 13.7 | audit/master-completion/astra-reverify/runs/round6-misc-check.stdout.log |
| catalog-cards-check | node scripts/qa/catalog-cards-check.mjs | — | 0 | 9.7 | audit/master-completion/astra-reverify/runs/catalog-cards-check.stdout.log |
| erd-selection-check | node scripts/qa/erd-selection-check.mjs | — | 0 | 8.1 | audit/master-completion/astra-reverify/runs/erd-selection-check.stdout.log |
| ai-states-check | node scripts/qa/ai-states-check.mjs | — | 0 | 72.2 | audit/master-completion/astra-reverify/runs/ai-states-check.stdout.log |
| crawl-dead-links | node scripts/crawl-dead-links.mjs | — | 0 | 8.3 | audit/master-completion/astra-reverify/runs/crawl-dead-links.stdout.log |
| verify-reader | node --experimental-strip-types --no-warnings scripts/verify-reader.mjs | — | 0 | 94.9 | audit/master-completion/astra-reverify/runs/verify-reader.stdout.log |
| static-fetch | astra-reverify.mjs (fetch) | — | 0 | 0.1 | audit/master-completion/astra-reverify/runs/static-fetch.stdout.log |
