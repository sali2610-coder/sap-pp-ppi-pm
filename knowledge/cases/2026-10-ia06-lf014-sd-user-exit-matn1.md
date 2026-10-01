# Case · IA06: הקלדת מק"ט ברכיבים נחסמת ב-S4Q (LF014) בגלל User Exit של SD

<div dir="rtl">

| | |
|---|---|
| **תאריך** | 01.10.2026 |
| **לקוח / מערכת** | CBC / **S4Q** (בדיקות S/4HANA) מול **ECC** (בדיקות) |
| **מודול** | PM (Task Lists) · נגרם ע"י קוד SD · Cross |
| **Intent** | Incident → Root Cause, מעבר ECC→S/4 |
| **Confidence** | **Verified** — הטריגר (Exit) והמנגנון ב-S/4 (Notes 3479804/3603616 ב-`LCMDIIPM`) הוכחו בדיבאגר בשתי המערכות ובהשוואת קוד מלא. פתוח: Cause/Resolution של KBA 3695113 ותוכן Note 3637601 |
| **Runbook** | `../runbooks/material-input-blocked-user-exit-matn1.md` |

## Problem
ב-S4Q, בהקלדת מק"ט בלשונית הרכיבים של רשימת משימות (`IA05`/`IA06`, מסך `SAPLCMDI` 3500, שדה `RIHSTPX-IDNRK`) קופצת הודעה **`LF014` "לא נמצא זיהוי חומר עבור EAN מספר ..."**, ואחריה **`CI100` "בחירה לא תקפה"**. **השורה לא נקלטת.** קורה **לכל מק"ט**. ב-ECC אותה פעולה ממלאת את השורה (תיאור, יחידה) אוטומטית.

## Root Cause
**שתי שכבות:**
1. **הגורם (קוד Z):** User Exit `EXIT_SAPLOMCV_001` (שיפור `MGA00003`, include **`ZXMG0U08`**, פרויקט **`YSDGEN`**, נוצר 2009 ע"י צוות SD) רץ בתוך **שגרת המרת המק"ט `MATN1`**, כלומר **על כל הקלדת מק"ט בכל טרנזקציה**. הקוד נכתב לסריקת ברקוד ב-`VA01`/`VA02`, אבל מבצע `CONVERSION_EXIT_ALPHA_OUTPUT` ו-`GET_MATERIAL_ID` (בדיקת EAN) **לפני** בדיקת `sy-tcode`. כך כל מק"ט נשלח לבדיקת ברקוד, שנכשלת (`EAN_NOT_FOUND`, הודעה `E014` עם `RAISING`).
2. **למה רק ב-S/4 — נמצא (01.10.2026, דיבאגר ב-S4Q + השוואת קוד מלא):** SAP Notes **3479804** (השער `IF sy-msgty <> 'E'`) ו-**3603616** (מחיקת השורה והצגת ההודעה) הוסיפו, ושניהם חסרים ב-ECC. בניסוח המקורי כאן יוחס הכל ל-3603616 בלבד — תוקן. ניסוח מקורי: Note 3603616 הוסיף ב-`SAPLCMDI`/`LCMDIIPM` (מודול `RIHSTPX-IDNRK_NEW`) בדיקה: אם ההודעה האחרונה בזיכרון (`sy-msgty`) היא `E` → מחיקת השורה והצגת ההודעה. ה-Exit שלנו משאיר `LF014` מסוג `E` בזיכרון (מ-`MESSAGE ... RAISING` שנתפס). ראה פירוט בהמשך. (אומת: ב-ECC הנוטים לא קיימים.)
   - *הניסוח הקודם (נשמר לתיעוד):* **למה רק ב-S/4 — לא הוכח.** מה שנבדק: קוד ה-Z ו-`LLMGTF01` **זהים**, ערימת הקריאות זהה עד `GET_MATERIAL_ID`, והתוצאה שונה (ECC: השורה נקלטת, S4Q: `LF014`). **ב-ECC לא נצפה שהפונקציה נכשלה** — הדיבאגר עצר לפני הקריאה ואז F8 עד הסוף, `SY-SUBRC` לא נבדק. "נבלע בשקט" הוא הסקה מ-`MEAN` ריקה ומקוד זהה. חלופה פתוחה: ב-ECC הפונקציה **לא נכשלת** (מוצאת התאמה או יוצאת במסלול אחר). בדיקה: בדיבאגר, עצירה ב-`GET_MATERIAL_ID`, F7 (חזרה ל-`ZXMG0U08`), ואז `SY-SUBRC` (0 = נמצא, 2 = `EAN_NOT_FOUND`). לבצע בשתי המערכות. מה **שלא** נבדק: קוד SAP **אחרי** חזרת החריגה — `CONVERSION_EXIT_MATN1_INPUT` / `LOMCVU01` ומסך `SAPLCMDI` 3500. דומיין 40 מול 18 והזזת שורת הקריאה ל-Exit (30 מול 33) הם **רמזים בלבד, לא השוואת קוד**. הטענה "SAP כתבה מחדש את MATN1" היא **השערה**.
   - **השלכה:** אם ההתנהגות השתנתה בקוד SAP, ייתכן שגם ב-`VA01`/`VA02` הקלדת מק"ט רגיל (לא ברקוד) תיחסם ב-S/4, כי שם ה-Exit ממשיך לקרוא ל-`GET_MATERIAL_ID`. התיקון המוצע לא מכסה את זה. **חובה לבדוק לפני שסוגרים את התיקון.**

## Evidence (נבדק בפועל)
| בדיקה | ECC | S4Q |
|---|---|---|
| Performance Assistant | — | `LF014` @ `SAPLLMGT`/`LLMGTF01` ש' 224; `CI100` @ `SAPLCMDI`/`LCMDIFPM` ש' 4614 |
| `OMSL` | 18, ללא לקסיקוגרפי/אפסים | זהה |
| `MARC` 9000013206 / 0500 | — | קיימת |
| `MEAN` למק"ט | ריקה | — |
| `SE37` Where-Used `GET_MATERIAL_ID` | — | כולל `ZXMG0U08` |
| קוד `ZXMG0U08` (323 שורות) | זהה | זהה |
| `MODACT` / `MODATTR` `YSDGEN` | `A` פעיל | `A` פעיל |
| קוד `LLMGTF01` (`E014 ... RAISING`) | זהה | זהה |
| דומיין `MATNR` | CHAR **18**, `MATN1` | CHAR **40**, `MATN1` |
| דיבאגר, ערימת קריאות | `IA06`→`SAPLCMDI` 3500→`MATN1`→`EXIT_SAPLOMCV_001`/`ZXMG0U08`:48→`GET_MATERIAL_ID` | זהה |
| `MATNR`/`XI_EAN` בדיבאגר | `9000013206`, (18)C | `9000013206`, (40)C |
| תוצאה סופית | **השורה נקלטת, בלי הודעה** | **LF014 + CI100, השורה נדחית** |

### ECC — המשך דיבאג (01.10.2026, נבדק בפועל, `QE6`)
- אחרי `GET_MATERIAL_ID` (F7, חזרה ל-`ZXMG0U08` ש' 61 `IF SY-SUBRC = 0`): **`SY-SUBRC = 2`** (`EAN_NOT_FOUND`). הפונקציה **נכשלת גם ב-ECC**; החריגה נתפסת ב-`EXCEPTIONS`, לכן ההודעה לא מוצגת.
- אחרי חזרה ל-`CONVERSION_EXIT_MATN1_INPUT` (`SAPLOMCV`): **`SY-SUBRC = 0`** — ה-Exit לא העביר את הכישלון החוצה.
- קוד SAP ב-ECC אחרי הקריאה ל-Exit (ש' 32-48):
  ```abap
  SY-SUBRC = 0.
  CALL CUSTOMER-FUNCTION '001'
    CHANGING  MATNR = INPUT
    EXCEPTIONS IGNORE_REST = 1
               LENGTH_ERROR = 3   "note 2121667
               OTHERS = 2.
  IF SY-SUBRC EQ 3.               "v note 2121667
    MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
      WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4 RAISING LENGTH_ERROR.
  ENDIF.                          "^ note 2121667
  IF SY-SUBRC EQ 1. OUTPUT = INPUT. EXIT. ENDIF.
  ```
- **משמעות:** ב-ECC ההודעה שה-Exit השאיר בזיכרון מוצגת **רק** אם ה-Exit מעלה במפורש `LENGTH_ERROR` (3). `ZXMG0U08` לא מעלה → `SY-SUBRC = 0` → שקט. **הבליעה ב-ECC מוכחת.**
### S4Q — אותו דיבאג (01.10.2026, נבדק בפועל)
- אחרי `GET_MATERIAL_ID`: **`SY-SUBRC = 2`**, בלי הודעה בזמן F7 — זהה ל-ECC.
- `CONVERSION_EXIT_MATN1_INPUT` (`LOMCVU01`): **אותו בלוק בדיוק** (`LENGTH_ERROR = 3`, `IF sy-subrc EQ 3` → `MESSAGE ID sy-msgid ...`, note 2121667), מוזז 3 שורות (נוסף `DATA lv_numeric TYPE xfeld`). שוני נוסף שנראה: `IF g_badi_matn1_new IS BOUND` (ש' 50) — לא קיים בקטע המקביל ב-ECC.
- **מסקנה ביניים:** הבלוק של note 2121667 **אינו** ההבדל. ההודעה מוצגת ב-S4Q **אחרי** חזרת ה-Exit, במקום אחר (המשך `MATN1` ב-S/4 — BAdI חדש — או קוד המסך `SAPLCMDI`). השערת "MATN1 נכתב מחדש" לא נתמכת בקטע שנבדק.
- הבא: Breakpoint at Statement `MESSAGE` ב-S4Q כדי לתפוס את פקודת ההודעה שמציגה את `LF014`.
- **ממצא: קריאה שנייה ל-`GET_MATERIAL_ID` ב-S4Q, ממסלול אחר** (נבדק בפועל): `SAPLCMDI` מודול PAI `RIHSTPX-IDNRK_NEW` → `FREIE_ZUORDNUNG` → `CI_04_NEW_ITEM` (`SAPLCI04`) → `CS_BOM_CALL_DIALOG...` → `SAPLCSDI` מסך 0825 PBO → `RFC_RC29B_INIT` → `RFC_FIELD_CONVERT` → `RS_CONV_EX_2_IN` (`SAPLRSCONVERT`) → `CONVERT_EX_2_IN` (`RSDYNSS0`) → `CONVERSION_EXIT_MATN1_INPUT` → `EXIT_SAPLOMCV_001` → `GET_MATERIAL_ID`. כלומר אחרי ההמרה הראשונה, מסך הרכיבים פותח ברקע דיאלוג פריט BOM שממיר את המק"ט שוב. **מועמד מוביל למקור `LF014`** (השערה). לבדוק: (א) MESSAGE breakpoint במסלול הזה ב-S4Q; (ב) האם ECC נכנס בכלל ל-`CS_BOM_CALL_DIALOG`/`RFC_FIELD_CONVERT`.

### S4Q — נמצאה הפקודה שמציגה את ההודעה (01.10.2026, נבדק בפועל)
- MESSAGE breakpoint, אחרי 4 קריאות "שקטות" ל-`GET_MATERIAL_ID` (מסך הרכיבים 3500 + דיאלוג BOM ב-`SAPLCSDI` מסכים 0825/0130/0830), עצירה ב:
  **`SAPLCMDI` / include `LCMDIIPM` / מודול PAI `RIHSTPX-IDNRK_NEW`, שורה 686**:
  ```abap
        CALL FUNCTION 'CM_BT_PLMZ_APPEND' ... APPEND planmz_pm.
  *StartNote 3603616
      ENDIF.
    ELSE.
      CLEAR rihstpx.
      MESSAGE ID sy-msgid TYPE 'I' NUMBER sy-msgno
        WITH sy-msgv1 sy-msgv2 sy-msgv3 sy-msgv4.
  *EndNote 3603616
    ENDIF.                                  "N3479804
  ```
- **משמעות:** קוד שנוסף ב-**SAP Note 3603616** (מספר מהערת הקוד; כותרת ותוכן לא נבדקו) — בענף ה-`ELSE` **מנקה את שורת הרכיב** (`CLEAR rihstpx`) ומציג כהודעת מידע את **מה שנשאר ב-`sy-msg*`**. שם נשאר `LF014` מה-`MESSAGE ... RAISING` ה"שקט" של `GET_MATERIAL_ID` (קריאת ה-Exit שלנו). זה מסביר: הודעה מסוג I (חלון), השורה נמחקת.
- **התנאי (נבדק בפועל, מצילום):**
  ```abap
  IF sy-msgty <> 'E' OR ( sy-msgty = 'E' AND sy-msgid = 'M3' AND sy-msgno = '748' ).  "N3603616
    MOVE-CORRESPONDING planmz_pm TO plmzd.
    rihstpx-meins = planmz_pm-imein.                                                  "N3603616
    CALL FUNCTION 'CM_BT_PLMZ_APPEND' ...
    APPEND planmz_pm.
  ELSE.                                  "StartNote 3603616
    CLEAR rihstpx.
    MESSAGE ID sy-msgid TYPE 'I' NUMBER sy-msgno WITH sy-msgv1 ... sy-msgv4.
  ENDIF.                                 "EndNote 3603616
  ```
  Note 3603616 מחליט אם לקבל את הרכיב **לפי `sy-msgty` שנשאר בזיכרון** אחרי עיבוד פריט ה-BOM: הודעה אחרונה מסוג `E` = כישלון. העצירה בשורה 686 (בתוך ה-`ELSE`) מוכיחה ש-`sy-msgty = 'E'` בנקודה זו.
- **תיקון (קוד `LCMDIIPM` המלא מ-S4Q, הועתק ע"י המשתמש):** ה-`ELSE` שייך ל-`IF` **חיצוני** של **Note 3479804**, לא ל-`IF` של 3603616. המבנה המלא בענף "שיוך חופשי":
  ```abap
  PERFORM freie_zuordnung ...                 " דיאלוג BOM — שם ה-Exit רץ 4 פעמים
  PERFORM datentransfer_freie_komponente ...
  * StartNote 3479804
  *  TO not add material if it has run into error in BOM
  IF sy-msgty <> 'E'.                          " ← השער: Note 3479804
    ... note 3450441 (producttype) ...
    IF sy-msgty <> 'E' OR ( ... 'M3' '748' ).  "N3603616
      CM_BT_PLMZ_APPEND ... APPEND planmz_pm.
  * StartNote 3603616
    ENDIF.
  ELSE.                                        " ← שייך ל-3479804
    CLEAR rihstpx.
    MESSAGE ID sy-msgid TYPE 'I' ...           " ← נוסף ב-3603616
  * EndNote 3603616
  ENDIF.                                       "N3479804
  ```
  כלומר: **Note 3479804** הוסיף את השער ("לא להוסיף חומר אם הייתה שגיאה ב-BOM", לפי הערת הקוד) — הוא שחוסם את ההוספה. **Note 3603616** הוסיף את מחיקת השורה והצגת ההודעה בענף ה-`ELSE`, וחריג להודעה M3 748. SAP מניחה ש-`sy-msgty` אחרי `freie_zuordnung` משקף שגיאה אמיתית ב-BOM; הודעת ה-`E` ה"ישנה" מה-Exit מטעה את הבדיקה. **שני הנוטים לא קיימים ב-ECC** (אומת בהשוואת קוד מלא). כותרות ותוכן שני הנוטים — לא נבדקו (לפתוח ב-SAP for Me).
- **שרשרת השורש המלאה:**
  1. `ZXMG0U08` קורא ל-`GET_MATERIAL_ID` בכל המרת מק"ט (4 פעמים בהקלדה אחת ב-IA06).
  2. `GET_MATERIAL_ID` מבצע `MESSAGE E014 ... RAISING EAN_NOT_FOUND`; החריגה נתפסת → אין הצגה, אבל **`sy-msgty='E'`, `sy-msgid='LF'`, `sy-msgno='014'` נשארים בזיכרון**.
  3. ב-S4Q, השער של Note 3479804 ב-`LCMDIIPM` קורא את `sy-msgty`, רואה `E` ולא מוסיף את הרכיב; ענף ה-`ELSE` (Note 3603616) מוחק את השורה ומציג את `LF014` כהודעת מידע.
  4. ב-ECC הכישלון "נבלע" — **`LCMDIIPM` ב-ECC, חיפוש `3603616`: לא נמצא** (01.10.2026, מצילום מסך). כלומר הבדיקה של `sy-msgty` לא קיימת ב-ECC. **אימות משלים בוצע (קוד `LCMDIIPM` המלא מ-ECC, הועתק ע"י המשתמש):** 3 קריאות ל-`CM_BT_PLMZ_APPEND` במודול `RIHSTPX-IDNRK_NEW`; באף אחת אין בדיקת `sy-msgty`. בענף "שיוך חופשי" (`PERFORM freie_zuordnung` → `datentransfer_freie_komponente` → `CM_BT_PLMZ_APPEND` → `APPEND planmz_pm`) — המסלול שנראה בערימת הקריאות ב-S4Q (`FREIE_ZUORDNUNG`) — ההוספה **ללא תנאי**. גם הערות `3450441` ו-`3479804` שקיימות ב-S4Q לא מופיעות ב-ECC. **ההבדל בין המערכות מוכח.**
- **השלכה על התיקון:** תיקון `ZXMG0U08` (בדיקת `sy-tcode` לפני `GET_MATERIAL_ID`) מונע את ההודעה ה"ישנה" ב-PM → `sy-msgty` לא `E` → הרכיב יתקבל. **התיקון מספיק ל-PM**, בכפוף לבדיקת רגרסיה. המלצה הגנתית למפתח (לשיקולו): ב-VA01/VA02, אחרי כישלון `GET_MATERIAL_ID`, לנקות את `sy-msgty`/`sy-msgid`/`sy-msgno` כדי לא להשאיר הודעת `E` "ישנה" לקוד סטנדרטי שבודק אותה.
- **`CI100` — תוצאת המשך (נבדק בפועל):** אחרי סגירת `LF014`, עצירה ב-`SAPLCMDI`/`LCMDIFPM` ש' 4614, FORM `RIHSTPX-RECIPIENTLOCATIONCODE` (מודול PAI באותו מסך 3500): `READ TABLE planmz_pm INDEX inxp-tabpt` → **`SY-SUBRC = 4`** → `MESSAGE i100(ci)`, `CLEAR rihstpx`, `RETURN`. הרכיב לא נמצא בטבלה כי ענף ה-`ELSE` דילג על `APPEND planmz_pm`. כלומר `CI100` היא **השלכה** של אותו שורש, לא תקלה נפרדת. `CI100` נוספת ממודול `ADSUB_BEIKZ` (FORM `ADSUB_UPDATE_BEIKZ`, ש' 109), אותו דפוס. מצב סופי: שורת הרכיב ריקה (בדיקה זו בוצעה על קבוצה 100815, פעולה 0005 — מאשר "לכל מק"ט / כל קבוצה").
- **היסטורי (נסגר):** מה התנאי שמוביל ל-`ELSE` (השורות מעל 671). אם הענף נובע מכישלון אחר — `LF014` היא רק "הודעה ישנה" שמסתירה את הסיבה האמיתית, והתיקון ב-`ZXMG0U08` יחליף את ההודעה אך לא בהכרח יפתור. לבדוק: (א) התנאי; (ב) `SY-MSGID/MSGNO/MSGV1` בנקודה זו; (ג) ב-ECC: האם `LCMDIIPM` מכיל את Note 3603616.

### ניתוח Gemini שני (01.10.2026) — נבדק מול הראיות
| טענה | בדיקה |
|---|---|
| KBA 3695113 "Message No. CI100 raised within Task List transactions when adding a Material to an Operation the 1st time" | **אומת — קיים** (צילום Preview מהמשתמש). Symptom: "'Invalid Selection' is shown when adding a Material to a Task List the 1st time. When trying a 2nd time, the Material is added successfully". Keywords: IA01, IA02, IA06, IA11, IA12, **LCMDIIPM**, PM-PRM-TL. Cause/Resolution — מאחורי Login, **לא נקראו**. קשור לאותו קוד; האם הסיבה זהה לשלנו — פתוח. השערה (לא נבדקה): בפעם הראשונה `freie_zuordnung` יוצר פריט BOM ברקע, ובפעם השנייה המסלול עובר דרך `g_free_stpo_tab` (`datentransfer_freie_schon_da`) — ענף **ללא** השער של 3479804 |
| `CI100` נוצרת ב-`MODULE rc27x-flg_sel` | **סותר את הדיבאגר:** `CI100` נעצרה ב-`LCMDIFPM` 4614 (`RIHSTPX-RECIPIENTLOCATIONCODE`) וב-`ADSUB_UPDATE_BEIKZ` 109 |
| ה-Exit "הקפיץ" `LF014` וזה קטע את המסך | **סותר:** ה-Exit לא הציג כלום (`MESSAGE ... RAISING` נתפס, `SY-SUBRC=2`). `LF014` הוצגה ע"י קוד SAP (Note 3603616) אחרי השער של Note 3479804 |
| ההבדל בין המערכות הוא `/CWM/` | **סותר:** ההרחבה `/CWM/APPL_PM_SAPLCMDI` פעילה גם ב-ECC ("active version"), והיא במודול `rihstpx-rgekz` — לא במסלול שלנו |
| סדר PAI שונה ב-S/4 | ללא ראיה |
| תיקון ה-Exit יפתור | **מסכים** — אבל מהסיבה שהוכחה (אין `E` בזיכרון → השער של 3479804 פתוח) |

### Note 3603616 — **אומת מצילום SAP for Me** (01.10.2026)
- "...added with different item category - 3603616", SAP Note **Version 8, Released 28.07.2025**, רכיב **PM-PRM-TL**, Software Component **SAP_APPL**.
- Symptom: "...is added error CI053 'Component ****** already assigned to current operation'". Other Terms: Bill of Material, IA11, IA12, IA01, IA02, IA06, IA05, plmz, IDNRK, Text material, STPO, Standard BOM, **LCMDIIPM, rihstpx-idnrk_new**, CI 053, postp, **CI 100**. Reason: program error. Solution: implement correction instructions.
- Referenced by: **3794756** (PM-PRM-TL, "...number but different item category is added"). **Causing side effects:** **3637601** "DIMP: Follow up note 3603616".
- כותרת מלאה: **"CI053: Error when two materials are added with different item category"**. Symptom מלא: "In IA06/IA12/IA02 transactions when material is added directly (Standard BOM). After which same material with different item category is added error CI053...".
- Software Components: **SAP_APPL 606, 617, 618** (גם ECC EHP6/7/8!) · **S4CORE 102–109**. Correction Instructions: SAP_APPL 1, S4CORE 2.
- **Prerequisite: Note 3479804 "IA05/06: Components in task list duplicated when an error is raised"** (S4CORE 107–108) → מסביר את השער `IF sy-msgty <> 'E'`: SAP מנעה שכפול רכיבים כשעיבוד ה-BOM נכשל, וזיהתה כישלון לפי `sy-msgty`.
- Support Packages (חלקי): SAPK-10217INS4CORE, 10315, 10413, 10511, 10609 (S4CORE 102–106)...
- **השלכה:** הנוט חל גם על SAP_APPL של ECC — ב-ECC שלנו הוא לא מותקן (SP נמוך / לא יושם). אם יותקן ב-ECC — אותה תקלה תופיע שם.
- **Note 3479804 — אומת מצילום:** "IA05/06: Components in task list duplicated when an error is raised", Version 3, Released 22.04.2025, PM-PRM-TL, Program error, medium priority. Symptom: "You are trying to add a material in Component Overview screen for an operation in task list. If you encounter an error, the previous component in the list is duplicated." Other terms: IA01/IA02/IA05/IA06/IA11/IA12, 29 120, 29 770. Prerequisite: 3450441 "Lean Service component shows up on the material tab" (S4CORE 107/108). → השער `sy-msgty <> 'E'` הוא תיקון לגיטימי של SAP לבאג שכפול; לא מסירים אותו. התיקון נשאר ב-Exit.
- **Note 3637601 — אומת מצילום:** "DIMP: Follow up note 3603616", Version 2, Released 08.08.2025, רכיב **IS-ADEC-SSP** (Industry: Aerospace&Defense / E&C — DIMP). Symptom: לקוח שמיישם 3603616 צריך לבדוק תופעות לוואי בקוד DIMP. Solution: ליישם יחד עם 3603616 "to achieve consistent system behavior". Other terms: ERP2005, Enhancement Framework. **לא נוגע לשער `sy-msgty` / לענף ה-ELSE** — רלוונטי רק להרחבות DIMP (כנראה ה-ENHO `ADSUB_LCMDIIPM IS-AD-SUC` שבקוד). **ממצא הנוטים סגור: אין תיקון SAP לבעיה שלנו; התיקון ב-Exit.**
- (היסטורי) הבא: לפתוח **3637601** (Side effect) ו-3794756; ב-S4Q: System → Status → רכיב S4CORE (release + SP), ו-`SNOTE` לסטטוס 3637601.

### Note 3603616 — כותרת (לפי צילומי SAP for Me שהמשתמש הציג ל-Gemini; לא נראו כאן ישירות)
- כותרת: **"CI053: Error when two materials are added with different item category"**. Prerequisite: 3479804. Follow-up: **3637601** "DIMP: Follow up note 3603616".
- **תואם לקוד S4Q:** 3603616 הוסיף `AND postp = rihstpx-postp "N3603616` ללולאות `g_stpo_tab`/`g_free_stpo_tab`/`planmz_pm`, ו-`i053(ci)` היא הודעת "כבר משויך". כלומר הנוט נועד ל-CI053; את ה-`ELSE` שמציג את ההודעה שבזיכרון הוא הוסיף כחלק מאותו שינוי.
- **Gemini טוען** ש-`LF014` "קופצת לפני שהקוד הזה רלוונטי" ושהטמעת שרשרת הנוטים לא תפתור — **מסגור שגוי:** הנוטים **כבר מותקנים** ב-S4Q (ראינו את הקוד), והדיבאגר עצר על הצגת `LF014` **בתוך** ה-`ELSE` שלהם (ש' 686). אף אחד לא הציע להטמיע אותם; הם מה שחשף את הבעיה.
- **מוביל פתוח:** Note 3637601 (follow-up). לבדוק את תוכנו ואם מותקן ב-S4Q (`SNOTE`) — ייתכן שהוא משנה את ענף ה-`ELSE`.
- המלצת Gemini `IF sy-tcode NOT CP 'VA*'` רחבה מהקוד המקורי (VA01/VA02 בלבד, כולל VA03 וכו'); להשאיר למפתח, עדיף להתאים לתנאי הקיים.

### סבב HQ (Oracle · Sherlock · Memory), 01.10.2026
- **Oracle:** אין מידע ציבורי על 3479804/3603616/3637601/3695113 (SAP for Me חסום). תיעוד ABAP: ב-input conversion מותרות הודעות A/E/S; אין הנחיית SAP לנקות `sy-msg*` ב-Exit. השער `IF sy-msgty <> 'E'` נשען על ערך ישן — שביר מבחינת תכנון (טיעון סביר, לא עובדה).
- **Sherlock (ביקורת נגדית):** מנגנון 85%, ספיקות תיקון ל-PM 70%. פערים: (א) ייתכן כישלון אמיתי ב-`freie_zuordnung` בלי `MESSAGE` שמוסתר ע"י LF014; (ב) אחרי התיקון השער יקרא את ה-`sy-msg*` הקודם — E ממקור אחר יחזיר חסימה; (ג) KBA 3695113 מתאר את התופעה **בלי** קוד Z → ייתכן מקור SAP נוסף + Note תיקון. המלצות: לעבור על כל אזכורי `sy-tcode` ב-323 שורות; במקום `CLEAR sy-msg*` — לשמור ולשחזר, או לקרוא ל-`GET_MATERIAL_ID` רק אם הקלט נראה EAN (ספרות, 8/13/14); ניסיון שני ב-S4Q עם breakpoint על השער + `PLMZ`/`STPO` לפריט יתום; `RS_ABAP_SOURCE_SCAN` על `N3479804`/`sy-msgty <> 'E'`; רגרסיה רחבה (IA01/IA11/CA02/C202/CS02/IW32/MIGO, BAPI/BDC, מק"ט קצר/40/אלפאנומרי).
- **Memory:** אין מקרה קודם דומה. פערים: `hq-ops.sh search` לא סורק `knowledge/`; `migration-ecc-to-s4.md` לא מפנה לקייס; חסר playbook "מעבר ל-S/4 חושף קוד Z ישן".

## הופרכו בדרך
- פורמט מק"ט (`OMSL`) שונה — זהה.
- חומר לא מורחב לאתר — קיים ב-`MARC`.
- נתוני EAN / הסבת נתונים — קורה לכל מק"ט, `MEAN` ריקה גם ב-ECC.
- "הורדת האפסים משבשת את המק"ט" — הערך נשאר `9000013206`.
- "ב-ECC ה-Exit לא רץ" — הדיבאגר עצר בו גם ב-ECC.
- ניתוח AI חיצוני (Gemini): BAdI `EAM_TASKLIST_REUSE_COMP_S`, "Fast Entry", מק"ט 40 פעיל, KBA 3420207 — לא נמצא מקור / סתירה לראיות. KBA 3420207 עוסק בהודעה 00151.

## Resolution (מומלץ, בבעלות SD + פיתוח)
1. ב-`ZXMG0U08`: להעביר את בדיקת `sy-tcode` (`VA01`/`VA02`) **לפני** `CONVERSION_EXIT_ALPHA_OUTPUT` ו-`GET_MATERIAL_ID`; מחוץ למכירות לצאת מיד בלי לגעת ב-`MATNR`.
2. להסיר `break nadiash` שנשכח בקוד.
3. רגרסיה: סריקת ברקוד ב-`VA01`/`VA02` (כולל משתמשי מסופון), ורכיבים ב-`IA05`/`IA06`/`IW31`/`IW32`.
4. **לא Note ולא OSS** — Customer Exit הוא קוד לקוח.

## Prevention
- כל User Exit / BAdI ב-**שגרת המרה** (`MGA00003`, `BADI_MATN1`) רץ על כל שדה מק"ט במערכת. לבדוק אותו **ראשון** בכל תקלת "מק"ט לא נקלט בכל המסכים".
- ברשימת בדיקות ההסבה ל-S/4: לסרוק Exits פעילים שרצים בתוך המרות (`MODACT` לפי `MGA00003`).

## Self Evaluation
- **מה עבד:** הודעה → מספר → תוכנית → Where-Used → קוד Z → `MODATTR` → דיבאגר בשתי מערכות. כל שלב הפיל או אישר השערה אחת.
- **מה לא עבד:** בתחילה הסתמכות על ניתוח AI חיצוני והשערות ללא מספר הודעה. מספר ההודעה (Performance Assistant) היה צריך להיות צעד ראשון.
- **טעות שלי:** כתבתי "SAP שינתה את הקוד" כעובדה בלי להשוות את קוד ה-SAP. הוכחנו **מה מפעיל** את התקלה, לא **מה השתנה**.
- **פתוח (עדכני):** Cause/Resolution של KBA 3695113; תוכן Note 3637601 וסטטוס `SNOTE` שלו ב-S4Q; אישור SD להקלדה ידנית ב-VA01. (מחקר רשת של Oracle, 01.10.2026: אין מידע ציבורי על ארבעת המספרים; תיעוד ABAP — ב-input conversion מותרות הודעות A/E/S; אין הנחיה SAP לנקות `sy-msg*` ב-Exit.)
- **היסטורי (נסגר — פריטים 1-2 בוצעו, 3 דווח ע"י SD):**
  1. דיבאגר בשתי המערכות: Breakpoint at → **Statement** → `MESSAGE`, ואחרי עצירה ב-`GET_MATERIAL_ID` לצאת עם F7 צעד-צעד ולתעד איפה המסלולים נפרדים ואיזו פקודת `MESSAGE` מציגה בפועל את `LF014` ב-S4Q.
  2. השוואת קוד SAP: `SE37` → `CONVERSION_EXIT_MATN1_INPUT` בשתי המערכות (Utilities → Versions → Version Management → Remote Comparison, אם יש RFC; אחרת העתקה ו-diff).
  3. בדיקה ב-S4Q: `VA01`, הקלדת מק"ט רגיל (לא ברקוד). אם נחסם — התיקון המוצע לא מספיק ו-SD צריכים פתרון רחב יותר.
     - **עדכון (דיווח צוות SD, לא נבדק על ידינו):** SD ביצעו בדיקות ב-S4Q ולא דיווחו על בעיה ב-`VA01`/`VA02`. התיקון לא משנה את המסלול של `VA01`/`VA02`, כך שאינו מוסיף להם סיכון. אם `VA01` עובד עם מק"ט רגיל, ההשערה "S/4 מציג כל כישלון ב-MATN1" נחלשת, והפער כנראה תלוי במסך (`SAPLCMDI` 3500). נשאר פתוח, לא חוסם. לבקש מ-SD אישור מפורש שהבדיקות כללו **הקלדת** מק"ט ולא רק סריקה.

</div>
