# תיקוני SAP · סבב 2 של ביקורת העיצוב (2026-09-21) · EvidenceRecords

כל תיקון להלן שינה טענה מקצועית במאגר. לכל אחד רשומת ראיה בפורמט התדריך (מזהה אובייקט, סוג, מודול/תהליך, הטענה המדויקת, Release, Edition, מקור רשמי, URL, תאריך/גרסה, קטע תומך, סטטוס, תאריך אימות, Confidence). שיטת הגישה: `scripts/sap-help-search.mjs` (רשומות חיפוש רשמיות של help.sap.com; גוף העמודים אינו נשלף) ו-PDF רשמי אחד שנקרא במלואו. לא נעשתה בדיקה במערכת SAP חיה (ה-MCP של sc4sap לא התחבר בסשן זה).

חוק שנשמר: לא הומצא שם טבלה, שדה, טרנזקציה, BAPI/FM, IDoc, CDS, אפליקציית Fiori, אובייקט עסקי או יורש. כל שם חדש מצוטט ממקור רשמי או מהמאגר עצמו, וכל מה שלא אומת נשאר `verification_required`.

---

## FIX-1 · `tx:IP30` · פריט הפישוט הרשמי נוקב ב-IP30 וב-RISTRA20

| שדה | ערך |
|---|---|
| מזהה אובייקט | `tx:IP30` |
| סוג | Transaction (PM-PRM, Deadline Monitoring for Maintenance Plans) |
| מודול/תהליך | PM · אחזקה מונעת · תזמון תכניות תחזוקה |
| הטענה המדויקת (חדשה) | IP30 מכוסה בפריט פישוט רשמי (4.1.2, S4TWL - Scheduling of Maintenance Plan): זמינה ב-S/4HANA On-Premise, מבוססת Batch Input שאינה "טכנולוגיה עתידית", SAP מתכננת להפסיקה באחת המהדורות הבאות; הנתיב לתזמון המוני הוא IP30H (תוכנית RISTRA20H). RISTRA20 היא התוכנית של IP30. |
| הטענה הקודמת (שהוסרה) | "לא נמצאה רשומת Simplification Item הנוקבת ב-IP30" ו"שם התוכנית RISTRA20 … לא נמצא במקור רשמי"; סטטוס `unchanged`. |
| Release / Edition | 2025 FPS01 · on-premise (הפריט חל מ-1511) |
| מקור רשמי | Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1, Document Version 1.36 (2026-02-18), item 4.1.2, p. 76, Application Component PM-PRM, Related Note (Business Impact) 0002270078 |
| URL | https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf (md5 של הקובץ שנקרא: `c1ccf8ebcd92d51fdc80e4b4873f3b73`) |
| קטע תומך (verbatim) | "Transaction IP30 is doing scheduling for Maintenance Plans. Within this scheduling outdated technology (Batch Input) is used. Functionality available in SAP S/4HANA on-premise edition 1511 delivery but not considered as future technology. Functional equivalent is not available yet. We plan to discontinue this in one of the next Releases. The new transaction for doing mass scheduling is IP30H which is optimized for HANA and is offering parallel processing at a much hiher speed [כך במקור]." … "Review your background Jobs which you most probably have scheduled periodically for transaction IP30 (Reports RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)." |
| סטטוס | `simplified` (פריט פישוט) · לא `deprecated`, כי היורשת IP30H אינה ביקום מזהי המאגר ואין לה רשומה לקישור |
| תאריך אימות | 2026-09-21 |
| Confidence | High (PDF רשמי נקרא במלואו) |
| קבצים | `data/verification/transactions.ts` (ראיה `IP30_SIMPL_ITEM`, status, notes) |
| סיכון שנותר | `tx-intel.ts#IP30.s4Delta` עדיין מפנה ל-F4072 כ"תזמון בודד" בעוד המזהה מתועד רשמית כ-Screen Maintenance Requests (סתירה פתוחה בתור ה-Fiori); הוספת IP30H כרשומת טרנזקציה תאפשר סטטוס `deprecated` עם יורשת מקושרת. |

## FIX-2 · `fm:NOTIF_TASK_READ` / `fm:NOTIF_ACTIVITY_READ` · QMMA = Activities, QMSM = Tasks

| שדה | ערך |
|---|---|
| מזהה אובייקט | `fm:NOTIF_TASK_READ`, `fm:NOTIF_ACTIVITY_READ` (שניהם `inferred`) |
| סוג | Function Module (שמות לא מאומתים; מיפוי הטבלאות הוא הטענה המתוקנת) |
| מודול/תהליך | PM · הודעות אחזקה |
| הטענה המדויקת (חדשה) | משימות הודעה (Tasks) נשמרות ב-QMSM; פעילויות הודעה (Activities) נשמרות ב-QMMA. NOTIF_TASK_READ מפנה ל-QMSM בלבד; NOTIF_ACTIVITY_READ מפנה ל-QMMA. |
| הטענה הקודמת (שהוסרה) | NOTIF_TASK_READ: "משימות הודעה (Tasks) — QMMA/QMSM" (ערבוב); NOTIF_ACTIVITY_READ: "פעילויות … QMSM" (הפוך). |
| Release / Edition | 2025.001 · on-premise |
| מקור רשמי | Archiving Maintenance Notifications (PM-WOC-MN) · Data Archiving in Plant Maintenance and Customer Service (PM/CS), loio `60adb6531de6b64ce10000000a174cb4`; המקבילה לשירות SM_QMEL loio `63adb6531de6b64ce10000000a174cb4` |
| URL | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/60adb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001 |
| קטע תומך (verbatim) | "The archiving object PM_QMEL for maintenance notifications is composed of the following tables: Table Name Contents QMEL Notification header data QMFE Items QMMA Activities QMSM [...] Tasks QMUR Causes" |
| אימות צולב במאגר | הבלופרינט PM:QMMA מונה את NOTIF_ACTIVITY_READ, PM:QMSM מונה את NOTIF_TASK_READ (מסכים עם המקור הרשמי); רק `function-intel.ts` היה הפוך. |
| סטטוס | הטבלאות: `sap_official_verified`; שמות ה-FM: נשארים `inferred` / נדרש אימות ב-SE37 |
| תאריך אימות | 2026-09-21 (הראיה נרשמה לראשונה ברשומת `table:QMMA`, 2026-09-15) |
| Confidence | High למיפוי הטבלאות; Low לשמות ה-FM |
| קבצים | `data/function-intel.ts` (שתי הרשומות), `data/verification/tables.ts` (הערת הפתרון ברשומת QMMA) |

## FIX-3 · `table:QMAT` · טרנזקציות הגדרת הבדיקה

| שדה | ערך |
|---|---|
| מזהה אובייקט | `table:QMAT` (Inspection Setup, תצוגת QM באב החומר) |
| סוג | Table · עמודת הטרנזקציות במאגר (`data/table-tcodes.json` → `data/sapData.*` שנוצרו מחדש) |
| מודול/תהליך | PP-PI/QM · הגדרת בדיקה לחומר |
| הטענה המדויקת (חדשה) | הנתיבים לתחזוקת הגדרת הבדיקה הם תצוגת QM של אב החומר (MM01/MM02/MM03) ושינוי המוני ב-QA08. |
| הטענה הקודמת (שהוסרה) | `"QMAT": "QM01, MM02"` — QM01 יוצרת הודעת איכות ואינה נתיב Inspection Setup. |
| Release / Edition | 2025.001 · on-premise |
| מקור רשמי | 'Inspection Setup' (Logistics — General, loio `f35e650eb0bb478cb4f3a4c38728c5c7`); 'Making Mass Changes to the Inspection Setup' (loio `e122bd534f22b44ce10000000a174cb4`); 'Editing Inspection Setup Data Individually' (loio `e422bd534f22b44ce10000000a174cb4`) |
| URL | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE (loios לעיל, version=2025.001) |
| קטע תומך | "QM-specific data in the material master to control the quality inspection process and to define whether a material is to be posted to inspection stock"; "You can use mass-processing transactions to change the inspection setup for materials, activate and deactivate inspection types" (ראיות שנרשמו ברשומת `table:QMAT`, 2026-09-15). QA08 מתועד כטרנזקציית השינוי ההמוני; MM01/MM02/MM03 הן תחזוקת אב החומר. |
| סטטוס | `sap_official_verified` לנתיב; כל ארבע הטרנזקציות ביקום המסלולים (`/neo/transactions/<code>/`) |
| תאריך אימות | 2026-09-21 |
| Confidence | High |
| קבצים | `data/table-tcodes.json`, `data/sapData.pppi.ts` (נוצר מחדש ב-`node scripts/extract-xlsx.mjs`; diff של שורה אחת), `data/verification/tables.ts` (טענת המאגר, המלצה והערות ברשומת QMAT) |

## FIX-4 · `table:TJ30T` · קריאת סניפט ה-DataSource לפי סדר העמודות

| שדה | ערך |
|---|---|
| מזהה אובייקט | `table:TJ30T` |
| סוג | Table · תיקון קריאת ראיה (לא שינוי סטטוס) |
| מודול/תהליך | ניהול סטטוס · טקסטים של סטטוס משתמש |
| הטענה המדויקת (חדשה) | בטבלת המיפוי של ה-DataSource (Field in Extraction Structure · Description · Origin Table · Field in Origin Table): שדה החילוץ TXTSH ('Short Description') מקורו ב-TXT04 של TJ02T/TJ30T; שדה החילוץ TXTMD ('Medium Description') מקורו ב-TXT30; SPRAS הוא שדה המקור של LANGU. |
| הטענה הקודמת (שהוסרה) | "TXT04 (טקסט קצר) ו-TXT30 (טקסט בינוני)" — קריאה לפי התווית שייחסה את תיאורי שדות החילוץ לשדות המקור. |
| Release / Edition | 2025.001 · on-premise |
| מקור רשמי | Texts for the System Status (Field 1) · SAP Portfolio and Project Management, loio `34c68853630b3d58e10000000a174cb4` |
| URL | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/34c68853630b3d58e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001 |
| קטע תומך (verbatim) | "SPRAS STATUS BW Status DPR_BW_SYSSTAT / DPR_BW_USERSTAT BWSTATUS TXTSH Short Description TJ02T / TJ30T TXT04 TXTMD Medium Description TJ02T / TJ30T TXT30 TXTLG Long Description" |
| סטטוס | ללא שינוי בפסיקה (`unchanged`, 2023.latest); הראיה והפסיקה מנוסחות מחדש |
| תאריך אימות | 2026-09-21 |
| Confidence | High לקריאת סדר העמודות; מבנה ה-DDIC עדיין לא אומת רשמית |
| קבצים | `data/verification/tables.ts` (ראיה 3, status.he, notes) |

## FIX-5 · חמישה מפתחות ב-`function-intel.ts` שאינם מודולי פונקציה

| מפתח | סיווג חדש | מקור | פעולה |
|---|---|---|---|
| `MATMAS` | `kind: "idoc"` | כבר מאומת ברשומת `idoc:msg:MATMAS` | לא נספר עוד כפונקציה (היה מוחרג ב-NEO, נספר בדוח הכיסוי) |
| `LOIPRO` | `kind: "idoc"` | כבר מאומת ברשומת `idoc:msg:LOIPRO` | כנ"ל |
| `BOMMAT` | `kind: "idoc"` + `IDOC_RE` ב-`lib/object-intel.ts` | ראו EvidenceRecord להלן | עבר ל-/neo/idoc/BOMMAT/, רשומת `idoc:msg:BOMMAT` חדשה; תיאור ההעשרה "שם מבנה/טבלה של נתוני BOM" הוחלף |
| `Control Recipe` | `kind: "concept"` | Process Management (PP-PI-PMA) loio `c387bf53f106b44ce10000000a174cb4`; Process Instructions and Process Instruction Categories loio `0372b6535fe6b74ce10000000a174cb4` ("Control recipes consist of process instructions"); Download of all Control Recipes Initiated by SAP PP-PI loio `0c72b6535fe6b74ce10000000a174cb4` | העמוד נשמר עם התוכן, מסומן "מושג תהליכי מהבלופרינט (לא FM)", לא נספר כפונקציה, ללא מזהה fm: |
| `PPCC1` | `kind: "concept"` | חיפוש Help 'PPCC1' (2026-09-21, 21 תוצאות) החזיר רק /SAPAPO/PPC1 ו-PPC* — אף רשומה רשמית אינה נוקבת ב-PPCC1 | העמוד נשמר; רשומת ההעשרה שטענה "קוד טרנזקציה — אינו FM" הוחלפה ב-`requires-verification` (המהות לא אומתה); לא נספר כפונקציה |

**EvidenceRecord · `idoc:msg:BOMMAT`**

| שדה | ערך |
|---|---|
| מזהה אובייקט | `idoc:msg:BOMMAT` |
| סוג | IDoc message type (עץ מוצר לחומר, Material BOM) |
| מודול/תהליך | PP-PI/LO · הפצת עצי מוצר ב-ALE |
| הטענה המדויקת | BOMMAT הוא סוג הודעת IDoc להפצת עצי מוצר לחומר; סוגים בסיסיים BOMMAT01 (3.1G), BOMMAT03 (4.6B), BOMMAT07 (כיוון נכנס, מידע טכני 2025 FPS01); הפצה ידנית ב-BD30; פונקציות CRE/CNG/DEL. |
| הטענה הקודמת (שהוסרה) | סיווג "מודול פונקציה" (נספר בקטלוג הפונקציות) ותיאור ההעשרה "שם מבנה/טבלה של נתוני BOM — אינו FM". |
| Release / Edition | 2025.001 · on-premise |
| מקורות רשמיים | Distributing BOM Data within ID PDM (Library of ALE Business Processes) loio `f4e3e4535dd4414de10000000a174cb4`; Technical Information: Bill of Materials (LO) loio `7f7567563889c159e10000000a441470` (Retail: `27ff4a5616bcf81ae10000000a441470`); PDR: Connecting the Systems (PLM) loio `d9725995bfba44b181e63037842a2d0a`; What's New 1809 FPS01 loio `e29bd2a5a04f4d7893f73cf2182cc1e1` |
| קטע תומך (verbatim) | "Message type: BOMMAT 3.1G Basis type: BOMMAT01 3.1G Manual distribution (transaction BD30) Functions: CRE, CNG, and DEL … New basis type BOMMAT03 with corrected field type 4.6B"; "Logical Message IDoc Type Process Code Bill of material Inbound BOMMAT BOMMAT07 BOMM…"; "BOMMAT BOMs: material BOM"; "can be exchanged via ALE using an IDoc (message type BOMMAT)" |
| סטטוס | `unchanged` (מתועד ב-2025 FPS01, לא נמצא מקור המסמן החלפה/הגבלה) |
| תאריך אימות | 2026-09-21 |
| Confidence | High לסיווג; קוד התהליך הנכנס והמקטעים לא נראו בסניפט |
| קבצים | `data/verification/idocs.ts`, `lib/object-intel.ts`, `data/function-intel.ts`, `data/bapi-enrichment.pppi.ts`, `lib/route-manifest.generated.ts` (BOMMAT ב-`idocs`), `scripts/report-coverage.mjs`, `components/neo-shell/reference/bapi-data.ts`, `components/neo-shell/reference/idoc-data.ts` |

## FIX-6 · שתי שורות ב-`data/exits.ts` שאינן הרחבות בשם

| שדה | ערך |
|---|---|
| מזהי אובייקט | `enh:technique:customer-exit`, `enh:technique:implicit-enhancement` (הבית של התוכן) |
| סוג | Enhancement technique · תיקון שלמות קטלוג (לא שינוי עובדה SAP) |
| הטענה | `CMOD/SMOD` הוא צמד טרנזקציות הניהול של Customer Exits ו-`Implicit Enhancement` היא טכניקה; שתיהן אינן הרחבות בשם ואינן יכולות לקבל מזהה קנוני (לוכסן/רווח). |
| מקור | תור ההעשרות `research-queue-enhancements.md` (catalog-integrity finding, 2026-09-21) + רשומות הטכניקה שנכתבו ב-batch 3 ממקורות SAP רשמיים (Enhancement Framework; Changing the SAP Standard (BC)) |
| שימור תוכן | כל משפט ייחודי משתי השורות (purpose, trigger, example, debugging, eccS4.unchanged/changed/migration) הועבר ל-`note` של רשומות הטכניקה ב-`data/enhancements.ts`; דפי הטכניקה מציגים אותו. |
| סטטוס | APPLIED · קטלוג ההרחבות: 40 שורות נספרות = 40 שורות בנות מזהה (היה 42/40) |
| תאריך | 2026-09-21 |
| קבצים | `data/exits.ts`, `data/enhancements.ts` |
| סיכון | הדפים הישנים `/exits/CMOD-SMOD/` ו-`/exits/Implicit-Enhancement/` אינם נבנים עוד; הקישורים אליהם נוצרו דינמית מ-EXITS ולכן אין קישור שבור (מאומת בסריקת הקישורים). |

## FIX-7 · `fm:BAPI_PROCORD_GET_DETAIL` (ו-`fm:BAPI_ALM_ORDER_GET_DETAIL`) · מיזוג ההעשרה ושיוך הבלופרינט

| שדה | ערך |
|---|---|
| מזהי אובייקט | `fm:BAPI_PROCORD_GET_DETAIL`, `fm:BAPI_ALM_ORDER_GET_DETAIL` (אותו כשל מבני) |
| סוג | BAPI · תיקון קוד + הצגה (לא שינוי עובדה SAP) |
| הבעיה | `lib/bapi-registry.ts` פרס את שלושת קובצי ההעשרה בשלמותם (`{...PM, ...PPPI, ...SWEEP}`), כך שרשומת הסריקה החליפה את רשומת PP-PI כולה ו-COR3, AFKO/AFPO/AFVC ו-BUS2116 אבדו; במקביל הבלופרינט של PP-PI משתמש בצמד BAPI_PROCORD_CREATE/GET_DETAIL כערך ברירת מחדל בשורות רשימות פעולות, ולכן עמוד ה-BAPI קישר C202/C203/CA01… במקום COR3. |
| התיקון | מיזוג לפי שדות (`mergePatch`: סקלר מאוחר דורס, מערכים מאוחדים, undefined לא דורס); עמוד ה-BAPI מציג "טבלאות SAP ברשומה המאומתת"/"טרנזקציות ברשומה המאומתת" ובנפרד "טבלאות הבלופרינט המזכירות את האובייקט (שיוך לפי עמודת הפונקציות)"; רשימה נגזרת בלבד מסומנת כשיוך עקיף. |
| מקור | ממצאי הרצה שנרשמו ברשומת `fm:BAPI_PROCORD_GET_DETAIL` (2026-09-21) ובתור הפונקציות; רשומת PP-PI: `data/bapi-enrichment.pppi.ts#BAPI_PROCORD_GET_DETAIL` (COR3, AFKO/AFPO/AFVC, BUS2116) |
| סטטוס | APPLIED · `data/sapData.pppi.ts` (generated) לא נערך |
| תאריך | 2026-09-21 |
| קבצים | `lib/bapi-registry.ts`, `components/neo-shell/reference/bapi-data.ts`, `data/verification/functions.ts` (הערות הפתרון) |

## FIX-8 · אשכול שמות שגויים

| # | קובץ | לפני | אחרי | מקור רשמי | קטע תומך |
|---|---|---|---|---|---|
| 8a | `data/bapi-enrichment.pppi.ts#BAPI_PROCORDCONF_GETLIST` | `tx: ["COConf"]` (טרנזקציה שאינה קיימת) | `tx: ["COR6", "COR6N", "CORK", "CORS", "CORT"]` | Documentary Batches in Production, loio `36ffb753128eb44ce10000000a174cb4`, 2025.001 | "Time Ticket for Process Order (COR6, COR6N) Confirmation of process order (CORK) Cancel Confirmation for Process Order (CORS) (display only) Display Confirmation for Process Order (CORT)" |
| 8b | `data/fiori/apps.ts#F3364`, `data/centers/fiori.ts` | `odata: "API_PROCORDCONF"` | `API_PROC_ORDER_CONFIRMATION_2_SRV` | What's New 2023 FPS03, loio `fe27113cd73e4219ac8dd23a4db1ef16`; APIs for Manufacturing 2025.001 loio `168e4e9eb0564cc7945ed8db4b8cfbb5` | "OData API: Process Order Confirmation (API_PROC_ORDER_CONFIRMATION_2_SRV)"; "/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV" |
| 8c | `data/bapi-enrichment.pppi.ts#BAPI_BATCH_CREATE` | `bor: "BUS1001_BATCH"` | `bor: "BUS1001002"` | Reference Objects · Production Planning and Control, loio `62d3b65334e6b54ce10000000a174cb4`, 2025.001 | "BUS1001 Material BUS1001002 Batch" |
| 8d | `data/function-intel.ts` (2), `data/concepts.ts`, `data/solutions.ts` (2), `data/processes.ts`, `data/lifecycle.ts`, `data/fiori/apps.ts` (2), `data/ecc-s4.ts`, `data/domain-detail.ts`, `data/centers/migration.ts` (2), `data/centers/fiori.ts`, `data/academy/lessons/pp-generated.ts` (2) | `API_PROCESSORDER_2` | `API_PROCESS_ORDER_2_SRV` | Process Order (Version 2) · What's New / APIs, loios `416a177f863f4f96823c1c7a11cd22f6` (2025), `819376ea260c46248b73e2ce63b383c6` (2023 FPS03); api.sap.com/api/API_PROCESS_ORDER_2_SRV/overview | "Overview \| Process Order (Version 2)"; השם API_PROCESSORDER_2 אינו מופיע באף רשומה רשמית |

הרשומות ההיסטוריות ב-`data/verification/functions.ts` ו-`fiori.ts` שתיארו את השמות השגויים עודכנו ל"היה … עד 2026-09-21" כדי שלא תישאר סתירה בין רובד הראיות למאגר. `API_PRODUCTION_ORDER_2` (פקודת ייצור, `data/ecc-s4.ts`) לא שונה: לא אומת בסבב זה ונשאר `verification_required`.

---

## מדדים לפני/אחרי (`npm run report:coverage`)

| קטלוג | לפני | אחרי | הסבר |
|---|---|---|---|
| functions | 145 | 142 | BOMMAT → idocs; Control Recipe ו-PPCC1 מושגים, לא נספרים |
| idocs | 2 | 3 | BOMMAT נוסף עם רשומה מאומתת (L5) |
| enhancements | 42 (40 ברי-מזהה) | 40 | שתי השורות חסרות-המזהה הוסרו, תוכנן נשמר |
| רשומות overlay | 281 | 282 | `idoc:msg:BOMMAT` |
| `npm test` (2026-09-21) | 201/201 | 201/201 | |

---

## שני איחודים נלווים שנחשפו בבדיקת המסך של הסבב

| # | מה נמצא | תיקון | קבצים |
|---|---|---|---|
| U-1 | `/neo/transactions/IP30/`: לוח ה-S/4 בראש העמוד הציג "משתנה ב-S/4HANA" (נגזר מ-tx-intel) בעוד בלוק הראיות מתחתיו הציג "פריט פישוט (Simplification Item)" — שני אוצרות מילים על עמוד אחד (אותה תקלה שתוקנה לטבלאות בסבב 1, ממצא §5 בדוח) | כאשר קיימת רשומת overlay מאומתת, כותרת הלוח היא התווית הקנונית של בלוק הראיות וה-disposition (צבע/פריסה) עוקב אחריה; `verification_required` משאיר את ה-disposition הנגזר ומחליף רק את הכותרת | `components/neo-shell/data/tx-detail.ts` |
| U-2 | `/neo/idoc/BOMMAT/`: הכותרת הציגה "תלוי גרסה: נדרש אימות נוסף" ו"אמת זמינות ב-S/4" (מ-`function-intel.ts`, `inferred: true`) בעוד בלוק הראיות הציג "ללא שינוי ב-S/4HANA · מאומת מול תיעוד SAP רשמי" | טקסט ה-S/4 וה-ECC של הרשומה מנוסח מהמקורות הרשמיים של `idoc:msg:BOMMAT`; דגל `inferred` הוסר (המהות מתועדת ב-2025 FPS01); MAST נוסף לטבלאות הקשורות לפי ספריית ה-ALE | `data/function-intel.ts` |

---

## FIX-9 · IP30H כרשומת טרנזקציה מקורית, ו-IP30 כ"לא אסטרטגי" עם יורשת מקושרת (המשך ביקורת העיצוב, §18, 2026-09-22)

| שדה | ערך |
|---|---|
| מזהה | `tx:IP30H` (חדש) · `tx:IP30` (עדכון מחזור חיים) |
| טענה | IP30H (תוכנית RISTRA20H) היא הטרנזקציה החדשה של S/4HANA לתזמון המוני של תכניות אחזקה, והנתיב שרשימת הפישוט מפנה אליו במקום עבודות הרקע של IP30 (RISTRA20); IP30 זמינה אך "לא נחשבת טכנולוגיה עתידית" עם כוונת הפסקה במהדורה עתידית |
| Release / Edition | SAP S/4HANA On-Premise 2025 FPS01 (רשימת הפישוט v1.36, פריט 4.1.2) ו-2023 FPS03 (פריט 29.6, רכיבים PM, PM-PRM, אותו נוסח); Help 2025.001 |
| מקורות | Simplification List OP2025 §4.1.2 "S4TWL - Scheduling of Maintenance Plan" (PM-PRM, Business Impact Note 2270078) · Simplification List OP2023 §29.6 (`help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf`) · SAP Help "Maintenance Plan Scheduling 1 \| Logistics" 2025.001 (loio `c9e717b3620e4898a1aba5db9bf03afc`, Business Function LOG_EAM_MPS1 "introduces the scheduling function Mass Schedule Maintenance Plans (transaction IP30H)") · KBA 3776496 "Plan is unable to schedule in IP30H due to error IP735" (`me.sap.com/notes/3776496`; תצוגה מקדימה ללא כניסה) |
| קטע תומך | "The new transaction for doing mass scheduling is IP30H which is optimized for HANA and is offering parallel processing at a much hiher speed [כך במקור] … Review your background Jobs which you most probably have scheduled periodically for transaction IP30 (Reports RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)" |
| מה שונה | `data/transactions.ts`: רשומת IP30H (PM · אחזקה מונעת) → דף `/neo/transactions/IP30H/` + מזהה במניפסט המסלולים (`gen:routes`); `data/verification/transactions.ts`: רשומה `tx:IP30H` (s4_native, on-premise, 4 ראיות רשמיות + ראיית מאגר, xrefs ל-IP30/IP10/MPLA/MPOS/MHIS/MHIO/I_MaintenancePlan); `tx:IP30`: `simplified` → `deprecated` ("לא אסטרטגי ב-S/4HANA") עם `successor: tx:IP30H`, `secondary: [simplified]`, xref ל-IP30H, הערות מתוארכות |
| מה לא שונה | הסטטוס `deprecated` ניתן רק על סמך לשון הפריט בשתי רשימות פישוט (ראיה מתאימה למהדורה); לא נקבע `not_available`; ה-OData API‏ API_MAINTENANCEPLAN לא נכלל כראיה (נתיב נפרד); הסתירה F4072 ב-tx-intel נסגרה באותו יום ב-FIX-10 (קומיט bb8573d6) |
| בדיקות | `test/ip30h.test.ts` (3 בדיקות: רשומה מקורית + מניפסט; s4_native על ראיות רשמיות; IP30 לא אסטרטגי עם יורשת מקושרת) · `test/evidence-schema` / `evidence-xref` עוברות |
| מגבלה | לא בוצעה בדיקה במערכת SAP חיה (sc4sap לא התחבר); עמוד Help loio `2d396b50389ff015e10000000a44176d` הוחזר כמעטפת JS ולא נקרא; גוף ה-KBA דורש S-user |
| סקירת איכות תוכן (2026-09-22) | `neo-sap-content-quality-reviewer` (סקירה בלבד): 0 חוסמים, 3 עיקריים, 7 משניים. תוקנו באותו יום: מספר הפריט ברשימת 2023 מ-29.7 ל-29.6 והרכיבים ל-PM, PM-PRM (הקובץ המקומי SIMPL_OP2023.pdf.txt, שורה 38505; 29.7 הוא Mobile Asset Management), release הראיה `2023 FPS03`; ראיית המאגר על `s4Delta` של IP30 מצטטת עכשיו את הנוסח הנוכחי (IP30H, F2774) במקום הנוסח הישן (F4072); הטענה `s4_native` של IP30H נתחמה בטקסט ("חדשה" ביחס ל-IP30 ולפי תיעוד S/4HANA; תקציר ה-KBA מונה גם SAP ERP; זמינות ב-ECC לא נבדקה); הערות ישנות ("IP30H אינה ביקום", "11 xrefs") סויגו בתאריך; קווים מפרידים ארוכים הוסרו; הכינוי RISTRA20H (שם תוכנית) הוסר מרשימת ה-aliases של רשומת הטרנזקציה ונשאר בפרוזה; המונח אוחד ל"תכניות תחזוקה" בשכבת האימות. הטוקן `s4_native` נשמר (test/ip30h.test.ts) כי פריט הפישוט מציג את IP30H כטרנזקציה החדשה ביחס ל-IP30 ואין ראיה רשמית לזמינותה ב-ECC; אם תימצא, הטוקן ייבדק מחדש. הערות המשניות על `data/verification/functions.ts` (Archive Information System ללא ראיה ב-ARCHIVE_GET_NEXT_OBJECT; sourceType של SIMPL_OP2025 ב-BAPI_EQUI_CREATE; "הודעות אחזקה" ב-ARCHIVE_OPEN_FOR_WRITE) מיושמות אחרי סיום כתיבת אצווה 9 באותו קובץ. |

---

## FIX-10 · F4072 = Screen Maintenance Requests (המשך ביקורת העיצוב, §11 Fiori, 2026-09-22)

| שדה | ערך |
|---|---|
| מזהה | `fiori:F4072` · `data/fiori/apps.ts#F4072` · `data/centers/fiori.ts` · `data/tx-intel.ts` (IP01 / IP02 / IP03 / IP10 / IP30 / IP41 s4Delta) |
| טענה | המזהה F4072 שייך ליישום Screen Maintenance Requests (סינון וקבלה של בקשות אחזקה), לא ל-"Schedule Maintenance Plans"; תזמון תכניות אחזקה ב-Fiori מתועד תחת F2774 (Mass Schedule Maintenance Plans) ו-F5325 (Manage Maintenance Plans) |
| Release / Edition | SAP S/4HANA On-Premise 2025 FPS01 (Maintenance Management), What's New 2021 (App New) |
| מקורות | Maintenance Management 2025.001, loio `5ae0d3b492dc4df3a0eb1b8cad02cda3` ("Screen Maintenance Requests app (F4072)… With this app, you can screen and accept maintenance requests") · SAP Fiori Apps Reference Library appId=F4072 · Mass Schedule Maintenance Plans 2025.001, loio `12f60922946c4ec49807c81ad93d5ba4` (App ID F2774) · What's New 2022, loio `a784971bbee742b2bc491a97583a3621` (Manage Maintenance Plans F5325) |
| מה שונה | רשומת הקטלוג: שם, שם עברי, slug (`screen-maintenance-requests`), סוג, trust `verified-docs`, מטרה לפי הציטוט; תפקיד/קטלוג/OData/GUI/טבלאות רוקנו (המקורות לא מציינים); `similar` של שלושה יישומים אחרים לא מפנה עוד לרשומה; מרכז ה-Fiori: שורה מתוקנת; tx-intel: שש שורות s4Delta ללא F4072 (מפנות ל-F5325 / F2774 "לפי תיעוד SAP, אין רשומה בפרויקט", ו-IP30 גם ל-IP30H); רשומת האימות: ראיית המאגר מ-`conflicting_sources` ל-`repository_verified` (תוקן), status.he / recommendedAction / notes מעודכנים |
| מה לא שונה | לא נוצרו רשומות ל-F2774 / F5325 בתיקון הזה (דרשו מחקר ואימות נפרדים). **עדכון 2026-09-22:** שתיהן נוספו מאוחר יותר באותו יום לקטלוג ולשכבת האימות (fiori:F2774 Mass Schedule Maintenance Plans, fiori:F5325 Manage Maintenance Plans), כל שדה מתוך קטע רשמי של SAP Help. לא נקבע successor ל-F4072 (F5777 מתועד לענן הציבורי בלבד) |
| בדיקות | `npm test` · `gen:routes` + `check:routes` · crawl (0 dead links) בשערי הסיום |
| מגבלה | תפקיד/קטלוג/OData של F4072 לא נקראו מהספרייה (app shell) |

---

## FIX-11 · סוגי ההודעה M1/M2/M3 ו-IW24 / IW25 / IW26 / IW51 (אימות SAP S/4HANA, 2026-09-24)

| שדה | ערך |
|---|---|
| מזהה | `data/tx-intel.ts` (IW21, IW24, IW25, IW26, IW51) · `data/domains.ts#pm-notifications` · `data/domain-detail.ts` · `data/pm-master-data-facets.ts` · `data/knowledge/object-intel.ts#T352B` · `data/academy/lessons/pm-generated.ts` (שיעור ההודעות, כולל שאלת תרגול) · `data/best-practices/pm-processes.ts` · `data/verification/tables.ts` (ציטוט מאגר מתוארך) |
| טענה | סוגי ההודעה בתקן SAP: M1 = Maintenance Request, M2 = Malfunction Report, M3 = Activity Report. המאגר כתב M1 = תקלה ו-M2 = בקשה (ו-object-intel: M2 פעילות, M3 בקשה). IW24 = Create PM Malfunction Report, IW25 = Create PM Activity Report, IW26 = Create Maintenance Request, IW51 = Create Service Notification-General |
| Release / Edition | SAP S/4HANA On-Premise 2025 FPS01 (2025.001); Fiori Apps Library S32OP |
| מקורות | help.sap.com, Changing the Notification Type (Notifications CS-CM-SN/PM-WOC-MN, 2025.001), loio `b0e2855487f92257e10000000a44176d`: "Maintenance Requests (M1) Malfunction Reports (M2) Activity Reports (M3)"; אותו רצף בעמוד אובייקט ההגירה "PM - Maintenance notification" (Data Migration 2025.001, loio `71b5125d83124e369aea0167e539af4f`) · Fiori Apps Library (scripts/fal-app.mjs --tcode, S32OP): IW24 / IW25 / IW26 / IW51 כרשומות SAP GUI בשמות שלמעלה, בלי יורש · Book 9 (מקור אנגלי): "create a normal maintenance request with notification type M1 but accidentally selected notification type M2 for malfunction reports" |
| מה שונה | tx-intel: IW25 ו-IW26 נשאו כל אחת את התוכן של השנייה; התוכן הוחלף ביניהן והאותיות תוקנו. זנב IW26 (מסך בחירה, זרימה, דיבאג, דוגמאות) תיאר דיווח תקלה, ולכן לא עבר ל-IW25 (התוכן הזה קיים ב-IW24). IW24: M1 → M2, שדה ה-Fiori ריק (F2929 הוא Record Defects של QM), F2023 מתואר לפי קישורי הספרייה (IW31 מובילה, IW21/IW22/IW32/IW41). IW26: Fiori = Request Maintenance (F1511), שהספרייה מונה את IW26 בין טרנזקציות ה-GUI שלו; F2974 אינו בספרייה והוסר. IW21: אותיות, וצימוד F1511A/F1511. IW51: שדות הראש תיארו הודעת תחזוקה ונכתבו מחדש כהודעת שירות, בהתאם לזנב הרשומה עצמה ולספרייה. בשאר הקבצים: האותיות בלבד, וציטוטי מאגר מתוארכים קיבלו הערת תיקון במקום שכתוב |
| מה לא שונה | `data/academy/lessons/pmu-generated.ts` נוצר מ-`data/library/pmu-textbook` (ספר מוגן), ושכבות העברית של ספרים 1 ו-8 כותבות את אותו מיפוי הפוך: לא נגעתי בספרים, מדווח כממצא הדורש החלטת בעלים. המודול של IW51 נשאר PM (שינוי מודול משפיע על ניווט) |
| בדיקות | `tsc --noEmit` 0 · `npm test` 212/212 · סריקת המיפוי ההפוך מחוץ לספרים: נותרו רק שני ציטוטים מתוארכים ו-pmu-generated |

---

## FIX-12 · צימודי מזהה Fiori לשם, נבדקו מול ספריית ה-Fiori (אימות SAP S/4HANA, 2026-09-24)

| שדה | ערך |
|---|---|
| שיטה | כל צמד "שם יישום (Fnnnn)" בנתונים שנכתבו ביד (68 מזהים) נבדק ב-`scripts/fal-app.mjs` מול רשומת המזהה עצמו ב-S32OP (S/4HANA 2025 FPS01) ומול היישומים המובילים והקשורים של כל טרנזקציה (`--tcode`) |
| מקור | SAP Fiori Apps Reference Library, ערוץ ה-OData הציבורי, S32OP (ו-S27OP להשוואה); ספר 7 (Fiori Quick Reference) ורשימת היישומים המוטמעת תואמים לספרייה בכל המזהים שנבדקו |
| מה שונה | F1511 = Request Maintenance ו-F1511A = Create Maintenance Request (`258c628f`); F1814 הוא Sales Order (S/4HANA), ויישום ה-BOM הוא F1813 Maintain Bill Of Material (`0e1ca17d`); ב-tx-intel, ב-lifecycle וב-solutions: VA01 → F3893, OB52 → F2293, F-03 → F1579, F-04 → F1345, MSC1N/MSC3N → F2462, MB21/MB22 → F4839, MB23 → F5690, FBL3N → F2217, שמות F0711/F0712/F0842A/F1077 לפי הספרייה, ו-F0798/F0859/F1622/F3069/F0018/F0247/F1568 הוסרו היכן שהספרייה אינה מקשרת יישום (`a13460fa`); F2336 ו-F4072 ברשומות המרכז (`8a2f0b78`, `0e1ca17d`). ציטוטי מאגר מתוארכים קיבלו הערת תיקון |
| מה לא שונה | F0843 (זהות היישום היא החלטת מוצר פתוחה ברשומה fiori:F0843); F0247 בקטלוג ובמרכז ממתין לאצוות Fiori 3 (F0247A, F0251). השיעורים שנוצרו מספרי הלימוד המוגנים (`mm-generated.ts` 12 צמדים, `ppds-generated.ts` 1) נושאים צימודים שגויים, למשל F2360 בתור Manage Purchase Requisitions (הספרייה וספר 7: Quality Engineer Overview): לא נגעתי, מדווח ב-BLOCKERS כהחלטת בעלים |
| בדיקות | `tsc` 0 · `npm test` 212/212 בעץ נקי לכל commit |

---

## FIX-13 · אובייקט ה-BOR של פקודת תהליך: BUS0001, לא BUS2116 (אימות SAP S/4HANA, 2026-09-24)

| שדה | ערך |
|---|---|
| מזהה | `data/bapi-enrichment.pppi.ts` (BAPI_PROCORD_CREATE / GET_DETAIL / GET_LIST / RELEASE / COMPLETE_TECH, BAPI_PROCORDCONF_CREATE_TT) · `data/academy/lessons/pp-generated.ts` · `data/best-practices/pppi-processes.ts` · ציטוטי מאגר ב-`data/verification/functions.ts` |
| טענה | BUS0001 = Process Order, BUS2016 = Process Order Confirmation, BUS2116 = Production Order Confirmation |
| מקור | Reference Objects · Production Planning and Control, 2025.001, loio `62d3b65334e6b54ce10000000a174cb4` (גוף העמוד נקרא ב-`scripts/sap-help-body.mjs`): "BUS1001 Material BUS1001002 Batch BUS2004 Planned Order BUS2005 Production Order BUS0001 Process Order BUS2116 Production Order Confirmation BUS2016 Process Order Confirmation BUS2038 Maintenance Notification BUS2007 Maintenance Order EQUI Equipment BUS0010 Functional Location"; זיהוי הצמדים נשען על העוגנים המוכרים באותה רשימה. אותו עמוד שימש ב-FIX-8c. הממצא עלה מאצוות האובייקטים (`obj:process-order`) |
| מה שונה | שכבת ההעשרה: BUS2116 → BUS0001 (ולאישור BUS2016); המקור הקודם היה se80.co.uk ו-SD, לא מקור SAP רשמי. השיעור ושיטת העבודה עודכנו; ציטוטי המאגר ברשומות הפונקציות ובשיטת העבודה קיבלו הערת תיקון מתוארכת. שורת SAP-7 במטריצה (קבלה שנכתבה ב-FIX-7 על בסיס שכבת ההעשרה) קיבלה הערת תיקון, והבדיקה `astra-extra-check` מחפשת BUS0001 |
| מה לא שונה | מחרוזות שאילתה היסטוריות ברשומות הפונקציות ('BAPIs for Process Order BUS2116' וכו') נשארו כתיעוד החיפוש שבוצע |
| בדיקות | `tsc` 0 · `npm test` 211/211 |

---

## FIX-14 · כותרות טרנזקציה ותוכן עומק שתיארו טרנזקציה אחרת (אימות SAP S/4HANA, 2026-09-24)

| שדה | ערך |
|---|---|
| שיטה | הכותרת האנגלית של כל טרנזקציה במאגר (`data/tcode-catalog.ts`) והכותרת האנגלית שבתיאורי `data/tx-intel.ts` הושוו לרשומת ה-GUI של אותה טרנזקציה בספריית ה-Fiori (S32OP, כבר רשומה ב-`transactions-auto.ts`); זוג בלי מילה משותפת נבדק ידנית, ושמות אחרים לאותה טרנזקציה (WBS מול Project, PIRs) נשארו |
| מה שונה | `tcode-catalog.ts`: 65 כותרות (למשל IB01 'Create Material Serial Number' → 'Create Equipment BOM', IW64 עד IW67 פעילויות ומשימות ולא הודעות, FCH5, בלוק LX/LT של WM, QA05/QA06, QG*, QP08, QPV2, VB31/VB41, VL51/VL52) קיבלו את כותרת הספרייה ותרגום עברי (`48e7d9ac`). `tx-intel.ts`: 16 רשומות עומק שתיארו טרנזקציה אחרת נבנו מחדש ממה שהמקורות תומכים בו בלבד (כותרת הספרייה וזמינות; לרשימות ההודעות מיפוי הטבלאות QMMA/QMSM של FIX-2): IW64, IW65, IW66, QGA2, QGA3 (`3ae1fde8`), IK07, LT02, LT09, LT0A, LX09, QS22 עד QS25 (שהוסטו באחד), QM13, KSV5 (חלוקה ולא הקצאה). שדות ששיקפו את הטרנזקציה הלא נכונה (שגיאות, שיטות עבודה, דוגמאות) רוקנו במקום להיכתב מחדש מהזיכרון, והרשומות סומנו needs-verification. הרשומות שנוצרו אוטומטית מצטטות את הטקסט המתוקן (`--resimpl`) |
| מה לא שונה | כותרות שהן שם אחר לאותה טרנזקציה; רשומות שבהן הפער היה רק ניסוח |
| בדיקות | `tsc` 0 · `npm test` 211/211 |
