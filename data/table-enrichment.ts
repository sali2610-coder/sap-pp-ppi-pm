// ============================================================================
// Phase 14 · Sprint 2 — Table enrichment layer (VERIFIED, additive).
//
// `data/sapData.*` is GENERATED from the xlsx blueprints and must never be
// hand-edited. This layer sits ALONGSIDE it, keyed by tableName, and adds only
// the Enterprise-template fields the generated dataset does not carry (deep
// purpose, key notes, indexes, performance, ABAP/SQL/debug examples, ECC↔S/4).
//
// Every fact is standard DDIC / SAP Help content. Uncertain specifics (e.g.
// exact secondary-index names) are omitted, never invented. Merged into the
// object page render only when an entry exists → tables without enrichment are
// visually unchanged.  Mirrors the data/bapi-enrichment.* architecture.
// ============================================================================

export interface TableEnrichment {
  purposeDeep?: string;        // deep functional purpose
  primaryKey?: string[];       // key fields (with meaning)
  foreignKeys?: string[];      // FK relationships to other tables
  indexes?: string[];          // notable access paths / index guidance
  matdocNote?: string;         // MATDOC / ACDOCA (S/4) impact where relevant
  perfNotes?: string[];        // performance considerations
  abapExample?: string;        // ABAP snippet
  sqlExample?: string;         // SQL / CDS join snippet
  debugExample?: string;       // how to inspect / debug this table's data
  verified?: "verified" | "needs-verification";
  sources?: string[];
}

export const TABLE_ENRICHMENT: Record<string, TableEnrichment> = {
  AUFK: {
    purposeDeep: "כותרת אב-הזמנה (Order master data) — משותפת להזמנות PM (אחזקה), PP (ייצור/תהליך) ו-CO (פנימיות). מחזיקה את מספר ההזמנה (AUFNR), סוג הזמנה (AUART), אזור בקרה, קוד חברה, מפעל, ומספר אובייקט לסטטוס (OBJNR).",
    primaryKey: ["MANDT — client", "AUFNR — Order Number"],
    foreignKeys: ["AUART → T003O (Order Type)", "OBJNR → JEST/JSTO (System/User Status)", "KOKRS → TKA01 (Controlling Area)"],
    indexes: ["גישה תמיד לפי AUFNR (מפתח ראשי)", "לסטטוס — join דרך OBJNR ל-JEST"],
    perfNotes: ["בחר לפי AUFNR; חיבורים ל-AFKO (כותרת מורחבת), AFPO (פריטים), AFVC (פעולות)", "לנפחים גדולים — join סטטוס דרך OBJNR ולא סריקה"],
    abapExample: "SELECT SINGLE * FROM aufk INTO @DATA(ls_aufk) WHERE aufnr = @lv_aufnr.",
    sqlExample: "SELECT a~aufnr, a~auart, h~gamng\n  FROM aufk AS a\n  INNER JOIN afko AS h ON h~aufnr = a~aufnr\n  WHERE a~auart = 'PM01'.",
    debugExample: "סטטוס: FM STATUS_READ עם OBJNR; אובייקט ההזמנה נטען דרך CO_BT_ORDER_OBJECT_MANAGE.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AUFK", "SAP Help Portal — Order Master Data"],
  },
  AFKO: {
    purposeDeep: "נתוני כותרת הזמנה (Order header data) — הרחבת הכותרת להזמנות ייצור/תהליך/אחזקה. מחזיקה הפניה ל-Routing/BOM (PLNBEZ, AUFPL — מספר ה-routing של ההזמנה), תאריכי תזמון, כמות כוללת (GAMNG) ו-MRP controller.",
    primaryKey: ["MANDT — client", "AUFNR — Order Number"],
    foreignKeys: ["AUFNR → AUFK (Order master)", "AUFPL → AFVC (Operations)", "PLNBEZ → MARA (Material)"],
    indexes: ["גישה לפי AUFNR", "AUFPL הוא מפתח ה-routing המקשר ל-AFVC/AFVV (פעולות + ערכים)"],
    perfNotes: ["AUFPL הוא הצומת לפעולות — join אליו ל-AFVC לקבלת operations", "GAMNG/GLTRP לתזמון וכמות"],
    abapExample: "SELECT SINGLE aufpl, gamng, gstrp, gltrp\n  FROM afko INTO @DATA(ls_afko) WHERE aufnr = @lv_aufnr.",
    sqlExample: "SELECT h~aufnr, o~vornr, o~arbid\n  FROM afko AS h\n  INNER JOIN afvc AS o ON o~aufpl = h~aufpl.",
    debugExample: "תזמון: ניתוח שדות GSTRP/GLTRP; פעולות דרך AUFPL ב-AFVC.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AFKO", "SAP Help Portal — Production/Process Orders"],
  },
  AFPO: {
    purposeDeep: "פריט הזמנה (Order item) — החומר לייצור, כמויות, אחסון, אספקה ודרישה. הזמנת ייצור/תהליך יכולה להכיל פריט אחד או יותר (co-products). מפתח AUFNR + POSNR.",
    primaryKey: ["MANDT — client", "AUFNR — Order Number", "POSNR — Item Number"],
    foreignKeys: ["AUFNR → AUFK / AFKO (Order header)", "MATNR → MARA (Material)", "PWERK → T001W (Plant)"],
    indexes: ["גישה לפי AUFNR (+POSNR); ל-material — סינון על MATNR"],
    perfNotes: ["הרוב המכריע של ההזמנות = פריט בודד (POSNR 0001)", "co-products/by-products → פריטים נוספים"],
    abapExample: "SELECT * FROM afpo INTO TABLE @DATA(lt_afpo) WHERE aufnr = @lv_aufnr ORDER BY posnr.",
    sqlExample: "SELECT i~aufnr, i~posnr, i~matnr, i~psmng\n  FROM afpo AS i WHERE i~aufnr = @aufnr.",
    debugExample: "כמות מתוכננת PSMNG מול WEMNG (התקבל); ניתוח דרישה דרך RESB (רכיבים).",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AFPO", "SAP Help Portal — Order Items"],
  },
  EQUI: {
    purposeDeep: "רשומת אב ציוד (Equipment master record) — אובייקט טכני מרכזי ב-EAM. מחזיקה מספר ציוד (EQUNR), קטגוריה (EQTYP), ומספר אובייקט לסטטוס (OBJNR). הטקסט ב-EQKT; שיוך מיקום/חשבונאות ב-ILOA (דרך ILOAN); סיווג דרך INOB/AUSP.",
    primaryKey: ["MANDT — client", "EQUNR — Equipment Number"],
    foreignKeys: ["EQUNR → EQKT (Short text)", "ILOAN → ILOA (Location/Account assignment)", "OBJNR → JEST (Status)", "EQUNR → INOB/AUSP (Classification)"],
    indexes: ["גישה לפי EQUNR", "לחיפוש לפי מיקום — דרך ILOA/IFLOT"],
    perfNotes: ["טקסט תמיד ב-EQKT (join לפי EQUNR+SPRAS)", "היסטוריית שינויים ב-EQUZ (time segments) אם מנוהלת"],
    abapExample: "SELECT SINGLE e~equnr, t~eqktx\n  FROM equi AS e\n  INNER JOIN eqkt AS t ON t~equnr = e~equnr AND t~spras = @sy-langu\n  WHERE e~equnr = @lv_equnr.",
    sqlExample: "SELECT e~equnr, l~tplnr, l~kostl\n  FROM equi AS e\n  INNER JOIN iloa AS l ON l~iloan = e~iloan.",
    debugExample: "סטטוס ציוד דרך OBJNR ב-JEST; סיווג דרך CLAF_CLASSIFICATION_OF_OBJECTS.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — EQUI/EQKT/ILOA", "SAP Help Portal — Equipment (PM/EAM)"],
  },
  MCH1: {
    purposeDeep: "אב אצווה ברמת החומר (Batch master, material level) — מפתח MATNR + CHARG. מחזיקה תכונות אצווה, תאריך תפוגה (VFDAT/SLED) והפניה לסיווג. MCHA = אצווה ברמת מפעל; MCHB = מלאי אצווה. רמת האצווה (client/plant/material) נקבעת בהגדרות.",
    primaryKey: ["MANDT — client", "MATNR — Material", "CHARG — Batch Number"],
    foreignKeys: ["MATNR → MARA (Material)", "Classification → INOB/AUSP (Class Type 023)", "אצווה/מפעל → MCHA", "מלאי → MCHB"],
    indexes: ["גישה לפי MATNR+CHARG", "לתכונות — דרך AUSP (Class Type 023)"],
    perfNotes: ["בחר תמיד עם MATNR+CHARG", "מלאי אצווה ב-MCHB (לא ב-MCH1)", "SLED (VFDAT) ל-FEFO"],
    abapExample: "SELECT SINGLE * FROM mch1 INTO @DATA(ls_mch1)\n  WHERE matnr = @lv_matnr AND charg = @lv_charg.",
    sqlExample: "SELECT b~matnr, b~charg, s~clabs\n  FROM mch1 AS b\n  INNER JOIN mchb AS s ON s~matnr = b~matnr AND s~charg = b~charg.",
    debugExample: "תכונות סיווג דרך AUSP (OBJEK = MATNR+CHARG, KLART='023'); FM VB_BATCH_DETAIL.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MCH1/MCHA/MCHB", "SAP Help Portal — Batch Management (LO-BM)"],
  },

  // ── Sprint 2b — 7 more verified core tables ──
  AFVC: {
    purposeDeep: "פעולה בהזמנה (Operation within order) — הפעולות של הזמנת ייצור/תהליך/אחזקה. כל שורה = פעולה עם מרכז עבודה (ARBID), Control Key (STEUS), ערכי סטנדרט וזמן. הזמן/ערכים בפועל ב-AFVV הצמודה.",
    primaryKey: ["MANDT — client", "AUFPL — Routing/Operation plan", "APLZL — General counter"],
    foreignKeys: ["AUFPL → AFKO (Order header)", "ARBID → CRHD (Work Center/Resource)", "STEUS → T430 (Control Key)"],
    indexes: ["גישה לפי AUFPL (ממספר ה-routing של ההזמנה)", "AFVV = ערכים/זמנים; AFFL = flow (רצף)"],
    perfNotes: ["AFVC (טקסטואלי/מפתח) + AFVV (כמותי) נטענות יחד", "VORNR = מספר הפעולה המוצג למשתמש"],
    abapExample: "SELECT o~vornr, o~steus, o~arbid\n  FROM afvc AS o WHERE o~aufpl = @lv_aufpl ORDER BY o~aplzl.",
    sqlExample: "SELECT o~vornr, c~arbpl\n  FROM afvc AS o\n  INNER JOIN crhd AS c ON c~objid = o~arbid AND c~objty = 'A'.",
    debugExample: "Control Key STEUS קובע scheduling/costing/confirmation; ערכי זמן ב-AFVV.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AFVC/AFVV", "SAP Help Portal — Order Operations"],
  },
  RESB: {
    purposeDeep: "הזמנה/דרישה תלויה (Reservation / dependent requirements) — רכיבי החומר של הזמנות (ייצור/תהליך/אחזקה) ודרישות תלויות מ-MRP. מחזיקה כמות דרושה (BDMNG), שנמשכה (ENMNG), סוג תנועה (BWART) ודגלי backflush/מסירה.",
    primaryKey: ["MANDT — client", "RSNUM — Reservation number", "RSPOS — Item", "RSART — Record type"],
    foreignKeys: ["MATNR → MARA (Material)", "AUFNR → AUFK (Order)", "WERKS → T001W (Plant)"],
    indexes: ["גישה לפי RSNUM+RSPOS או לפי AUFNR (רכיבי הזמנה)", "לניתוח דרישות — סינון XLOEK (deletion) ו-KZEAR (final issue)"],
    perfNotes: ["טבלה גדולה מאוד — סנן על AUFNR/MATNR/WERKS", "BDMNG מול ENMNG = חוסר/עודף משיכה", "רכיבי backflush מדווחים בדיווח (COGI לשגיאות)"],
    abapExample: "SELECT matnr, bdmng, enmng, bwart\n  FROM resb WHERE aufnr = @lv_aufnr AND xloek = @abap_false.",
    sqlExample: "SELECT r~matnr, r~bdmng, m~maktx\n  FROM resb AS r\n  INNER JOIN makt AS m ON m~matnr = r~matnr AND m~spras = @sy-langu.",
    debugExample: "משיכת רכיב = תנועה 261 (BWART); שגיאות תנועה נופלות ל-COGI/AFFW.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — RESB", "SAP Help Portal — Reservations / Order Components"],
  },
  MARA: {
    purposeDeep: "נתוני אב חומר — כלליים (Material master, general/client data) — הנתונים החוצים-מפעל של החומר: סוג (MTART), קבוצת חומרים (MATKL), יחידת מידה בסיסית (MEINS), משקל, נפח ומאפייני סיווג. נתוני מפעל ב-MARC, מכירות ב-MVKE, שיערוך ב-MBEW.",
    primaryKey: ["MANDT — client", "MATNR — Material Number"],
    foreignKeys: ["MTART → T134 (Material Type)", "MATKL → T023 (Material Group)", "MEINS → T006 (Unit)"],
    indexes: ["גישה לפי MATNR", "טקסט ב-MAKT (MATNR+SPRAS)"],
    perfNotes: ["MATNR הוא המפתח; ל-plant view — join ל-MARC", "אורך MATNR: 18 (קלאסי) → עד 40 ב-S/4 (Extended Material Number)"],
    abapExample: "SELECT SINGLE m~matnr, m~mtart, m~matkl, t~maktx\n  FROM mara AS m\n  INNER JOIN makt AS t ON t~matnr = m~matnr AND t~spras = @sy-langu\n  WHERE m~matnr = @lv_matnr.",
    sqlExample: "SELECT a~matnr, a~mtart, c~werks, c~dismm\n  FROM mara AS a\n  INNER JOIN marc AS c ON c~matnr = a~matnr.",
    debugExample: "views לפי ארגון (MARC/MVKE/MBEW); סיווג דרך AUSP (KLART material class).",
    matdocNote: "ללא שינוי מבני ב-S/4; אורך MATNR הורחב לעד 40 תווים (Extended Material Number — נדרש טיפול בקוד Z).",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MARA/MAKT", "SAP Help Portal — Material Master"],
  },
  MARC: {
    purposeDeep: "נתוני אב חומר — מפעל (Material master, plant data) — הנתונים ברמת המפעל: סוג MRP (DISMM), MRP Controller (DISPO), רכש (BESKZ), גודל אצווה (DISLS), זמני אספקה, checking group ל-ATP (MTVFP) ואסטרטגיית תכנון.",
    primaryKey: ["MANDT — client", "MATNR — Material", "WERKS — Plant"],
    foreignKeys: ["MATNR → MARA (Material general)", "WERKS → T001W (Plant)", "DISPO → T024D (MRP Controller)"],
    indexes: ["גישה לפי MATNR+WERKS", "לתכנון — DISMM/DISPO; ל-ATP — MTVFP"],
    perfNotes: ["MTVFP (checking group) קובע התנהגות בדיקת זמינות (CO09)", "DISMM קובע האם/איך MRP מתכנן"],
    abapExample: "SELECT SINGLE dismm, dispo, beskz, mtvfp\n  FROM marc INTO @DATA(ls_marc)\n  WHERE matnr = @lv_matnr AND werks = @lv_werks.",
    sqlExample: "SELECT c~matnr, c~werks, c~dispo, d~dsnam\n  FROM marc AS c\n  INNER JOIN t024d AS d ON d~werks = c~werks AND d~dispo = c~dispo.",
    debugExample: "התנהגות MRP → DISMM; זמינות → MTVFP; רכש → BESKZ (E/F/X).",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MARC", "SAP Help Portal — Material Master (MRP views)"],
  },
  IFLOT: {
    purposeDeep: "אב מיקום פונקציונלי (Functional Location master) — האובייקט הטכני המייצג מיקום/פונקציה במבנה המפעל (קו/תא/מכונה). מחזיק מזהה מובנה (TPLNR), קטגוריה, מבנה היררכי ומספר אובייקט לסטטוס. טקסט ב-IFLOTX; שיוך מיקום/חשבונאות ב-ILOA.",
    primaryKey: ["MANDT — client", "TPLNR — Functional Location label"],
    foreignKeys: ["TPLNR → IFLOTX (Text)", "TPLNR → ILOA (Location/Account via ILOAN)", "OBJNR → JEST (Status)"],
    indexes: ["גישה לפי TPLNR", "מבנה היררכי דרך TPLMA (superior)"],
    perfNotes: ["ה-structure indicator (edit mask) קובע את תחביר ה-TPLNR וההיררכיה", "ציוד מותקן במיקום — דרך EQUI/ILOA"],
    abapExample: "SELECT SINGLE f~tplnr, x~pltxt\n  FROM iflot AS f\n  INNER JOIN iflotx AS x ON x~tplnr = f~tplnr AND x~spras = @sy-langu\n  WHERE f~tplnr = @lv_tplnr.",
    sqlExample: "SELECT f~tplnr, l~kostl\n  FROM iflot AS f\n  INNER JOIN iloa AS l ON l~iloan = f~iloan.",
    debugExample: "היררכיה דרך TPLMA; ציוד מותקן דרך EQUI (join על ILOA/מבנה).",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — IFLOT/IFLOTX/ILOA", "SAP Help Portal — Functional Locations (PM/EAM)"],
  },
  JEST: {
    purposeDeep: "סטטוס אובייקט בודד (Individual Object Status) — כל שורה = סטטוס בודד (מערכת I#### או משתמש E####) של אובייקט (OBJNR) עם דגל פעיל/לא-פעיל (INACT). הבסיס לניהול הסטטוסים של הזמנות, הודעות, ציוד, פרויקטים ועוד. כותרת סטטוס ב-JSTO.",
    primaryKey: ["MANDT — client", "OBJNR — Object Number", "STAT — Status"],
    foreignKeys: ["OBJNR → JSTO (Status object header)", "STAT (I####) → TJ02T (System status text)", "STAT (E####) → TJ30T (User status text)"],
    indexes: ["גישה לפי OBJNR", "סנן INACT = space לסטטוסים פעילים בלבד"],
    perfNotes: ["INACT='X' = סטטוס לא פעיל (היסטורי)", "OBJNR מקשר לכל אובייקט (AUFK-OBJNR, EQUI-OBJNR, QMEL-OBJNR...)"],
    abapExample: "SELECT stat FROM jest\n  WHERE objnr = @lv_objnr AND inact = @space.  \"active statuses",
    sqlExample: "SELECT j~stat, t~txt04\n  FROM jest AS j\n  INNER JOIN tj02t AS t ON t~istat = j~stat AND t~spras = @sy-langu\n  WHERE j~objnr = @objnr AND j~inact = @space.",
    debugExample: "קריאת סטטוס דרך FM STATUS_READ (OBJNR); בדיקת סטטוס דרך STATUS_CHECK; תצוגה ב-BS22/BS23.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — JEST/JSTO/TJ02T/TJ30T", "SAP Help Portal — Status Management"],
  },
  MSEG: {
    purposeDeep: "פריט מסמך חומר (Material Document Segment) — שורות תנועת המלאי: חומר (MATNR), סוג תנועה (BWART), כמות (MENGE), מפעל/מחסן (WERKS/LGORT), אצווה ואובייקט-ייחוס. כותרת המסמך ב-MKPF. כל תנועת מלאי (קליטה/ניפוק/העברה) יוצרת רשומות MSEG.",
    primaryKey: ["MANDT — client", "MBLNR — Material Document", "MJAHR — Document Year", "ZEILE — Item"],
    foreignKeys: ["MBLNR+MJAHR → MKPF (Document header)", "MATNR → MARA (Material)", "BWART → T156 (Movement Type)", "AUFNR/RSNUM → order/reservation"],
    indexes: ["גישה לפי MBLNR+MJAHR; לפי חומר — אינדקס משני על MATNR+WERKS (משתנה)", "לניתוח תנועות — סנן BWART"],
    perfNotes: ["טבלה עצומה — סנן תמיד על מפתח/חומר/תקופה", "מסמכי חומר לא ניתנים לשינוי (רק ביטול/היפוך)"],
    abapExample: "SELECT matnr, bwart, menge, meins\n  FROM mseg WHERE mblnr = @lv_mblnr AND mjahr = @lv_mjahr.",
    sqlExample: "SELECT h~budat, i~matnr, i~bwart, i~menge\n  FROM mkpf AS h\n  INNER JOIN mseg AS i ON i~mblnr = h~mblnr AND i~mjahr = h~mjahr.",
    debugExample: "כל תנועה = BWART (261 ניפוק, 101 קליטה, 311 העברה); שגיאות עדכון → SM13; היפוך דרך MBST.",
    matdocNote: "ב-S/4HANA: MKPF+MSEG אוחדו לטבלת ה-MATDOC היחידה (Universal). MKPF/MSEG נותרות כ-Compatibility Views (CDS) לקריאה בלבד — קוד Z שכותב/קורא ישירות דורש התאמה.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MKPF/MSEG", "SAP Help Portal — Inventory Management", "SAP S/4HANA Simplification — MATDOC"],
  },

  // ── Sprint 2c — 6 more verified core tables ──
  AFRU: {
    purposeDeep: "דיווח הזמנה (Order Confirmation) — רשומות הדיווח על ביצוע פעולות: כמות שיוצרה (LMNGA yield), פסולת (XMNGA scrap), עבודה/פעילויות, ותאריכים. כל דיווח (CO11N/COR6N) יוצר רשומת AFRU, ומפעיל Backflush ו-Auto GR.",
    primaryKey: ["MANDT — client", "RUECK — Confirmation number", "RMZHL — Confirmation counter"],
    foreignKeys: ["AUFPL/APLZL → AFVC (Operation)", "AUFNR → AUFK (Order)", "ARBID → CRHD (Work Center)"],
    indexes: ["גישה לפי RUECK+RMZHL, או לפי AUFNR (דיווחי הזמנה)", "STOKZ='X' = דיווח מבוטל (reversal)"],
    perfNotes: ["ביטול דיווח (CO13/CORS) יוצר רשומת reversal, לא מוחק", "שגיאות תנועת חומר בדיווח → COGI/AFFW"],
    abapExample: "SELECT lmnga, xmnga, ismnw, stokz\n  FROM afru WHERE aufnr = @lv_aufnr AND stokz = @space.",
    sqlExample: "SELECT r~rueck, r~lmnga, o~vornr\n  FROM afru AS r\n  INNER JOIN afvc AS o ON o~aufpl = r~aufpl AND o~aplzl = r~aplzl.",
    debugExample: "Backflush/Auto-GR מופעל בדיווח; שגיאות → COGI. FM BAPI_PRODORDCONF_GET_TT לקריאה.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AFRU", "SAP Help Portal — Confirmations"],
  },
  PLKO: {
    purposeDeep: "כותרת רשימת פעולות (Task List Header) — הכותרת של Routing/Master Recipe/רשימת פעולות אחזקה. מחזיקה סוג (PLNTY), קבוצה (PLNNR) ומונה (PLNAL), שימוש (VERWE), סטטוס (STATU) וטווח גודל אצווה. הקישור לחומר דרך MAPL.",
    primaryKey: ["MANDT — client", "PLNTY — Task list type", "PLNNR — Group", "PLNAL — Group counter"],
    foreignKeys: ["Operations → PLPO (via PLNTY+PLNNR)", "Material assignment → MAPL", "VERWE → T412 (Usage)"],
    indexes: ["גישה לפי PLNTY+PLNNR+PLNAL", "PLNTY: N=Routing · 2=Master Recipe · A/E=maintenance/reference"],
    perfNotes: ["רשימת פעולות אחת יכולה לשרת חומרים רבים (דרך MAPL)", "STATU (סטטוס) קובע זמינות לשימוש בהזמנות"],
    abapExample: "SELECT SINGLE plnnr, plnal, verwe, statu\n  FROM plko INTO @DATA(ls_plko)\n  WHERE plnty = @lv_plnty AND plnnr = @lv_plnnr AND plnal = @lv_plnal.",
    sqlExample: "SELECT h~plnnr, o~vornr, o~arbid\n  FROM plko AS h\n  INNER JOIN plpo AS o ON o~plnty = h~plnty AND o~plnnr = h~plnnr.",
    debugExample: "שיוך חומר↔רשימת פעולות דרך MAPL; explosion בהזמנה טוען PLKO→PLPO.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — PLKO/MAPL", "SAP Help Portal — Routings / Master Recipes"],
  },
  PLPO: {
    purposeDeep: "פעולה ברשימת פעולות (Task List Operation) — הפעולות של Routing/Master Recipe: מרכז עבודה/משאב (ARBID), Control Key (STEUS), ערכי סטנדרט, תיאור ו-Phases (ב-PP-PI). הבסיס לתזמון ולעלויות בהזמנה.",
    primaryKey: ["MANDT — client", "PLNTY — Type", "PLNNR — Group", "PLNKN — Node number"],
    foreignKeys: ["Header → PLKO", "ARBID → CRHD (Work Center/Resource)", "STEUS → T430 (Control Key)"],
    indexes: ["גישה דרך PLNTY+PLNNR (+PLNKN)", "PLAS מקשר operation ל-group counter (sequences)"],
    perfNotes: ["ערכי סטנדרט (VGW01-06) מזינים scheduling/costing דרך הנוסחאות", "Control Key STEUS קובע internal/external, confirmation, costing"],
    abapExample: "SELECT vornr, arbid, steus, vgw01\n  FROM plpo WHERE plnty = @lv_plnty AND plnnr = @lv_plnnr ORDER BY plnkn.",
    sqlExample: "SELECT o~vornr, c~arbpl\n  FROM plpo AS o\n  INNER JOIN crhd AS c ON c~objid = o~arbid AND c~objty = 'A'.",
    debugExample: "ב-explosion להזמנה, PLPO→AFVC; Control Key STEUS קובע התנהגות הפעולה.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — PLPO/PLAS", "SAP Help Portal — Operations in Task Lists"],
  },
  MKPF: {
    purposeDeep: "כותרת מסמך חומר (Material Document Header) — הכותרת של תנועת מלאי: תאריך רישום (BUDAT), תאריך מסמך (BLDAT), משתמש (USNAM), מסמך ייחוס (XBLNR). השורות ב-MSEG. כל תנועת מלאי = מסמך MKPF+MSEG אחד.",
    primaryKey: ["MANDT — client", "MBLNR — Material Document", "MJAHR — Document Year"],
    foreignKeys: ["Items → MSEG (via MBLNR+MJAHR)", "USNAM → user", "VGART → T158 (Transaction/Event type)"],
    indexes: ["גישה לפי MBLNR+MJAHR", "לניתוח לפי תאריך — אינדקס על BUDAT (משתנה)"],
    perfNotes: ["BUDAT (posting date) קובע תקופה חשבונאית", "מסמכים אינם ניתנים לשינוי — רק היפוך (MBST)"],
    abapExample: "SELECT SINGLE budat, bldat, usnam, xblnr\n  FROM mkpf INTO @DATA(ls_mkpf)\n  WHERE mblnr = @lv_mblnr AND mjahr = @lv_mjahr.",
    sqlExample: "SELECT h~mblnr, h~budat, i~matnr, i~bwart\n  FROM mkpf AS h\n  INNER JOIN mseg AS i ON i~mblnr = h~mblnr AND i~mjahr = h~mjahr.",
    debugExample: "תקופה חשבונאית דרך BUDAT (MMPV/OB52); היפוך דרך MBST; עדכון שנכשל → SM13.",
    matdocNote: "ב-S/4HANA: MKPF+MSEG אוחדו לטבלת MATDOC היחידה. MKPF/MSEG נותרות כ-Compatibility Views (CDS) לקריאה — קוד Z שכותב ישירות דורש התאמה.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MKPF", "SAP Help Portal — Inventory Management", "SAP S/4HANA Simplification — MATDOC"],
  },
  QMEL: {
    purposeDeep: "כותרת הודעה (Notification Header) — משותפת ל-QM (הודעת איכות) ו-PM (הודעת תחזוקה). מחזיקה מספר הודעה (QMNUM), סוג (QMART), אובייקט ייחוס (EQUNR/TPLNR/MATNR), עדיפות, תאריכים ומספר אובייקט לסטטוס (OBJNR). פריטים/פעילויות בטבלאות QMFE/QMMA/QMSM.",
    primaryKey: ["MANDT — client", "QMNUM — Notification Number"],
    foreignKeys: ["QMART → TQ80 (Notification Type)", "OBJNR → JEST (Status)", "EQUNR → EQUI / TPLNR → IFLOT (Reference object)", "AUFNR → AUFK (linked order)"],
    indexes: ["גישה לפי QMNUM", "לפי אובייקט — סינון EQUNR/TPLNR; לפי סטטוס — OBJNR→JEST"],
    perfNotes: ["QMART מבחין PM (M1/M2/M3) מ-QM (Q1/Q2/Q3)", "הודעה יכולה לייצר הזמנת PM (AUFNR)"],
    abapExample: "SELECT qmnum, qmart, qmdat, objnr\n  FROM qmel WHERE equnr = @lv_equnr ORDER BY qmdat DESCENDING.",
    sqlExample: "SELECT n~qmnum, n~qmtxt, f~fecod\n  FROM qmel AS n\n  INNER JOIN qmfe AS f ON f~qmnum = n~qmnum.",
    debugExample: "סטטוס הודעה דרך OBJNR ב-JEST; פריטים ב-QMFE, סיבות/פעולות ב-QMUR/QMMA/QMSM.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — QMEL/QMFE", "SAP Help Portal — Notifications (PM / QM)"],
  },
  MBEW: {
    purposeDeep: "שיערוך חומר (Material Valuation) — נתוני השיערוך ברמת אזור השיערוך: בקרת מחיר (VPRSV — S=Standard / V=Moving Avg), מחיר סטנדרטי (STPRS), מחיר ממוצע נע (VERPR), ערך מלאי ותקופה (LFGJA/LFMON). מפתח MATNR+BWKEY(+BWTAR ל-split valuation).",
    primaryKey: ["MANDT — client", "MATNR — Material", "BWKEY — Valuation Area", "BWTAR — Valuation Type"],
    foreignKeys: ["MATNR → MARA (Material)", "BWKEY → T001K (Valuation Area)", "BWTAR → split valuation types"],
    indexes: ["גישה לפי MATNR+BWKEY", "BWTAR ריק = ללא split valuation"],
    perfNotes: ["VPRSV קובע Standard (S) מול Moving Average (V)", "ערכי מלאי מתעדכנים בכל תנועה עם השלכה חשבונאית"],
    abapExample: "SELECT SINGLE vprsv, stprs, verpr, salk3\n  FROM mbew INTO @DATA(ls_mbew)\n  WHERE matnr = @lv_matnr AND bwkey = @lv_bwkey AND bwtar = @space.",
    sqlExample: "SELECT b~matnr, b~vprsv, b~stprs, b~verpr\n  FROM mbew AS b WHERE b~bwkey = @werks.",
    debugExample: "בקרת מחיר VPRSV; שינוי מחיר דרך MR21/CK24; ב-S/4 Material Ledger מנהל את השיערוך.",
    matdocNote: "ב-S/4HANA: Material Ledger פעיל תמיד; MBEW משולבת עם ACDOCA ו-Actual Costing. מבנה MBEW נשמר אך המחירים מנוהלים דרך ה-ML.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MBEW", "SAP Help Portal — Material Valuation", "SAP S/4HANA — Material Ledger"],
  },
};

export const getTableEnrichment = (name?: string): TableEnrichment | undefined =>
  name ? TABLE_ENRICHMENT[name.toUpperCase()] : undefined;
