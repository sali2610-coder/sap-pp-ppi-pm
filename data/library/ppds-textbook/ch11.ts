// ===== PP/DS Digital Textbook — Chapter 11 (Migration to Embedded PP/DS) =====
// Four flat, deep subchapters — each a complete 18-facet LearningNode of
// authored Hebrew (beginner + consultant friendly). CBC = Coca-Cola bottling
// migration from APO / standalone PP/DS to embedded PP/DS in S/4HANA.
// SAP object names verbatim English. Inner quotes escaped (פק\"ע).
import type { TextbookChapter } from "./types";

export const CH11: TextbookChapter = {
  n: 11,
  titleHe: "מעבר ל-PP/DS מוטמע (Migration)",
  titleEn: "Migration to Embedded PP/DS",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למעבר ל-PP/DS המוטמע (embedded PP/DS) ב-SAP S/4HANA. בעבר PP/DS חי בתוך SAP APO — מערכת נפרדת המחוברת דרך CIF (Core Interface). ב-S/4HANA אותו מנוע-תכנון רץ ישירות בתוך מערכת ה-ERP, על אותו בסיס-נתונים, ללא רפליקציה. הפרק מציג שלושה נתיבי-מעבר רשמיים של SAP — new implementation (greenfield), system conversion (brownfield), ו-SAP S/4HANA Landscape Transformation (selective / SLT-DMLT) — ובסיכום משווה ביניהם ובוחר את הנתיב ל-CBC. כל אחד מארבעת תתי-הפרקים הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות-הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך (flow), טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: להבין ולבחור נתיב-מעבר ל-PP/DS המוטמע בלי הספר המקורי.",
  subchapters: [
    // ============================================================ 11.1
    {
      id: "11.1",
      titleHe: "מימוש חדש (New Implementation / Greenfield)",
      titleEn: "New Implementation (Greenfield)",
      execHe:
        "new implementation (greenfield) הוא הקמת מערכת S/4HANA חדשה מאפס והפעלת embedded PP/DS בה כיכולת מובנית, ללא נשיאת מטען-העבר של ECC או APO. נתוני-האב והעסקאות מועברים סלקטיבית דרך migration cockpit (LTMC / LTMOM) ולא דרך המרה טכנית של מסד-נתונים קיים. זהו הנתיב ה'נקי' ביותר: מאפשר עיצוב-מחדש של תהליכי-התכנון, אימוץ best practices של SAP, וביטול קוד-Z והגדרות-עבר. המחיר: מאמץ העברת-נתונים גבוה, אימות מקיף, וצורך לבנות מחדש כל אינטגרציה.",
      beginnerHe:
        "תאר מעבר לבית חדש לגמרי במקום לשפץ את הישן. ב-greenfield מקימים מערכת S/4HANA ריקה, מדליקים בה את PP/DS המובנה, ומעבירים רק את הנתונים שבאמת צריך — חומרים, BOM, מרכזי-עבודה, מלאי פתיחה. לא גוררים את כל ה'בלגן' של המערכת הישנה. היתרון: מתחילים נקי ועושים דברים נכון. החיסרון: צריך לבנות הכל מחדש ולהעביר נתונים בזהירות, וזה לוקח זמן.",
      consultantHe:
        "greenfield = re-implementation. PP/DS מופעל דרך Business Function ו-Activate Advanced Planning, ונתוני-התכנון (planning-relevant master data) נוצרים ישירות במודל ה-S/4HANA. ההעברה מתבצעת ב-SAP S/4HANA migration cockpit (LTMC בענן/אונפרם, LTMOM ל-mapping ו-migration objects) עם תבניות-XML או staging tables. נקודות-מפתח ליועץ: (1) advanced-planning master data — Product (MATERIAL), Location (PLANT), Resource, PDS (Production Data Structure) — נוצרים מנתוני-ה-ERP דרך CURTO_CREATE, לא דרך CIF היסטורי; (2) אין צורך ב-CIF integration models בין מערכות — ב-embedded ה-PP/DS חולק את אותם MARA/MARC, וה-master data מסונכרן דרך integration ב-Customizing (Advanced Planning ► Master Data); (3) הזדמנות לאמץ את ה-SAP Best Practices content (scope item) ל-PP/DS; (4) ביטול enhancements ישנים — חובת fit-to-standard workshops. סיכון עיקרי: data quality בהעברה, ובניית ה-PDS/Resource model נכון מההתחלה.",
      purposeHe:
        "המטרה: לקבל פלטפורמת-תכנון מודרנית ונקייה כשהמערכת הקיימת ישנה מדי, מותאמת-יתר, או כשהארגון רוצה להגדיר-מחדש תהליכי-תכנון (re-engineering). מתאים כשעלות שיפוץ-העבר גבוהה מעלות-הבנייה-מחדש, או כשעוברים מ-non-SAP / מ-APO standalone שלא כדאי לגרור.",
      processExampleHe:
        "ארגון עם APO standalone ו-ECC מחליט על greenfield: (1) מקים S/4HANA חדש; (2) מפעיל Advanced Planning ו-PP/DS; (3) מגדיר migration objects ב-LTMOM לחומרים, BOM, routings, work centers, מלאי-פתיחה; (4) מעלה תבניות עם הנתונים הנקיים בלבד; (5) מריץ simulate ➔ validate ➔ migrate; (6) מייצר PDS ו-Resources מנתוני-ה-ERP שהועברו; (7) מריץ PP/DS heuristics ו-optimizer לאימות; (8) cutover מבוקר. ה-APO הישן מושבת — אין CIF, אין qRFC בין מערכות.",
      cbcHe:
        "ב-CBC: המפעל-החדש בבאר-שבע מוקם כ-greenfield על S/4HANA חדש עם embedded PP/DS, בעוד המפעלים הוותיקים נשארים זמנית. מועברים רק חומרי-המשקה הפעילים (FERT/HALB/ROH), עצי-מוצר נקיים, קווי-המילוי כ-Resources, ומלאי-פתיחה ליום ה-go-live. כל ה-Z-reports הישנים מ-APO לא נגררים; תכנון-קווי-המילוי נבנה מחדש על heuristics סטנדרטיים של SAP. אלרגנים ומתכונים מתוקננים מחדש בהעברה.",
      navHe: [
        "SPRO ► Production Planning for Process Industries / Production ► Advanced Planning ► Basic Settings ► Activate Advanced Planning for Material",
        "SAP S/4HANA Migration Cockpit (Fiori) ► Migrate Your Data — Migration Objects",
        "LTMOM ► Migration Object Modeler ► Define Migration Objects + Field Mapping",
        "SPRO ► Advanced Planning ► Master Data ► Production Data Structure (PDS) ► Define Settings for Transfer (CURTO_CREATE)",
      ],
      tables: ["MARA", "MARC", "/SAPAPO/MATKEY", "/SAPAPO/LOC", "/SAPAPO/PDS_HEAD", "RESC"],
      tcodes: ["LTMC", "LTMOM", "CURTO_CREATE", "/SAPAPO/CURTO_SIMU", "/SAPAPO/RES01", "MATERIAL"],
      fiori: ["F1611", "F2336", "F1421"],
      configHe: [
        "Activate Advanced Planning: הפעלת PP/DS כיכולת מובנית (Business Function / Advanced Planning switch) — תנאי-סף לכל אובייקטי-התכנון.",
        "Migration Cockpit (LTMC): בחירת approach — File/Staging; הגדרת project ו-mass transfer.",
        "Migration Object Modeler (LTMOM): field mapping, rules, fixed values, value-mapping בין קוד-עבר לקוד-יעד.",
        "PDS transfer settings (CURTO_CREATE): יצירת Production Data Structure מ-BOM+Routing+Production Version של ה-ERP.",
        "Resource generation (/SAPAPO/RES01): המרת Work Centers ל-PP/DS Resources (single/multi-mixed/bucket).",
      ],
      flow: [
        { he: "הקמת S/4HANA חדש", code: "—", note: "מערכת ריקה" },
        { he: "הפעלת Advanced Planning + PP/DS", code: "Activate", note: "switch" },
        { he: "הגדרת migration objects", code: "LTMOM", note: "mapping" },
        { he: "העלאה + simulate", code: "LTMC", note: "validate" },
        { he: "migrate נתוני-אב + מלאי", code: "LTMC" },
        { he: "יצירת PDS + Resources", code: "CURTO_CREATE", note: "planning model" },
        { he: "אימות heuristics/optimizer", code: "/SAPAPO/RRP3" },
        { he: "Cutover ל-go-live", code: "—", note: "השבתת APO" },
      ],
      masterDataHe: [
        "Product (PP/DS) נוצר מ-MARA/MARC עם advanced-planning views; Location = Plant.",
        "PDS (Production Data Structure) מחליפה את PPM/Runtime-objects של APO — נוצרת מ-BOM+Routing+Production Version.",
        "Resource (RESC) מומר מ-Work Center; חובה לקבוע resource category נכון.",
        "מלאי-פתיחה ו-stock/requirements מועברים כ-initial load; אין רפליקציית-CIF שוטפת.",
      ],
      mistakesHe: [
        "גרירת קוד-Z והגדרות-עבר 'ליתר ביטחון' — מבטל את יתרון ה-greenfield ומשכפל חוב-טכני.",
        "העברת נתוני-אב מלוכלכים ללא ניקוי — שגיאות-תכנון מיובאות למערכת החדשה.",
        "שכחת יצירת PDS/Resources אחרי העברת ה-master data — אין מודל-תכנון, ה-heuristics לא רצים.",
        "אי-הפעלת Advanced Planning לפני ההעברה — אובייקטי-PP/DS לא נוצרים.",
      ],
      troubleshootHe: [
        "PP/DS לא מתכנן חומר ➔ Advanced Planning לא הופעל לחומר, או חסרה advanced-planning view.",
        "אין מקור-אספקה לתכנון ➔ PDS לא נוצרה (CURTO_CREATE) או Production Version חסרה.",
        "heuristic לא משבץ פעולות ➔ Resource לא הומר/לא משויך לפעולות ב-PDS.",
        "migration נכשל בשורות ➔ value-mapping חסר ב-LTMOM או נתון-מקור לא תקין.",
      ],
      bestPracticeHe: [
        "ערוך fit-to-standard workshops והעדף SAP Best Practices ל-PP/DS על-פני שכפול-העבר.",
        "נקה נתוני-אב לפני ההעברה — חומרים פעילים בלבד, BOM/Routing מאומתים.",
        "הרץ simulate מלא ב-LTMC לפני migrate; אמת ספירות-שורות ו-mapping.",
        "ודא רצף: master data ➔ PDS ➔ Resources ➔ אימות-תכנון לפני cutover.",
      ],
      interviewHe: [
        { qHe: "מהו greenfield במעבר ל-embedded PP/DS?", aHe: "הקמת S/4HANA חדש מאפס והפעלת PP/DS מובנה בו, עם העברת-נתונים סלקטיבית דרך migration cockpit — ללא המרה טכנית של מערכת קיימת ובלי לגרור קוד/הגדרות-עבר." },
        { qHe: "במה PP/DS מובנה שונה מ-APO לעניין נתוני-אב?", aHe: "ב-embedded אין CIF בין מערכות; ה-PP/DS חולק את אותם MARA/MARC, וה-master data מסונכרן דרך Customizing פנימי. ה-PDS מחליפה את ה-PPM/Runtime objects של APO." },
        { qHe: "מתי greenfield עדיף על system conversion?", aHe: "כשהמערכת הקיימת ישנה/מותאמת-יתר, כשרוצים re-engineering של תהליכי-תכנון, או כשעוברים מ-non-SAP / APO standalone שלא כדאי לגרור." },
      ],
      takeawaysHe: [
        "greenfield = מערכת S/4HANA חדשה + העברת-נתונים סלקטיבית דרך migration cockpit (LTMC/LTMOM).",
        "PP/DS מופעל כ-Advanced Planning מובנה; אין CIF בין מערכות.",
        "חובה ליצור PDS ו-Resources מנתוני-ה-ERP אחרי ההעברה — אחרת אין מודל-תכנון.",
        "היתרון: התחלה נקייה ו-best practices; המחיר: מאמץ-העברה ואימות גבוהים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · המרת מערכת (11.2)", href: "/library/ppds/chapter-11/#sub-11.2" },
        { labelHe: "PP/DS · סיכום ובחירת נתיב (11.4)", href: "/library/ppds/chapter-11/#sub-11.4" },
        { labelHe: "אובייקט · PDS", href: "/library/ppds/object/PDS/" },
      ],
    },
    // ============================================================ 11.2
    {
      id: "11.2",
      titleHe: "המרת מערכת (System Conversion / Brownfield)",
      titleEn: "System Conversion (Brownfield)",
      execHe:
        "system conversion (brownfield) הוא המרה טכנית של מערכת ECC קיימת ל-S/4HANA במקום (in-place), תוך שמירת היסטוריה, נתונים ו-customizing. ב-PP/DS המשמעות: ארגונים שהשתמשו ב-APO PP/DS עוברים מ-standalone ל-embedded, או ארגונים שתכננו ב-ECC-only מפעילים PP/DS לראשונה. ההמרה מתבצעת ב-Software Update Manager (SUM) עם Database Migration Option (DMO), מוקדמת ב-Readiness Check ו-Simplification Item Check. היתרון: שימור-העבר ופרויקט מהיר-יחסית; המחיר: נשיאת חוב-טכני, צורך לתקן custom code, והתאמת מודל-התכנון מ-APO ל-embedded.",
      beginnerHe:
        "תאר שיפוץ הבית הקיים במקום לבנות חדש. ב-brownfield לוקחים את מערכת ה-ECC הקיימת, על כל הנתונים וההיסטוריה, וממירים אותה 'במקום' ל-S/4HANA. כל מה שהיה — נשאר. אם השתמשת ב-APO לתכנון, עכשיו ה-PP/DS עובר לחיות בתוך אותה מערכת. היתרון: לא צריך להעביר נתונים ידנית, וההיסטוריה נשמרת. החיסרון: גוררים גם את הבעיות הישנות, וצריך לתקן קוד מותאם שלא תואם S/4HANA.",
      consultantHe:
        "brownfield = in-place conversion דרך SUM/DMO. רצף: (1) Maintenance Planner — תאימות add-ons; (2) SAP Readiness Check — תמונת-מצב; (3) Simplification Item Check (/SDF/RC_START_CHECK) — חסמים; (4) Custom Code Migration (SCI + ATC עם variant S4HANA_READINESS) — תיקון Z-code; (5) SUM/DMO — המרה טכנית; (6) post-conversion — הפעלת Advanced Planning והעברת תכנון מ-APO ל-embedded. נקודות-מפתח ל-PP/DS: ה-CIF ההיסטורי בין ECC↔APO מוחלף ב-integration פנימי; אובייקטי-תכנון של APO (PPM/PDS, location products, resources) נבנים-מחדש מתוך נתוני-ה-S/4HANA דרך CURTO_CREATE ו-/SAPAPO/RES01; היסטוריית-תכנון של APO standalone אינה נגררת אוטומטית — רק נתוני-ה-master וה-transactional של ה-ERP מומרים. שים לב ל-Simplification Items של PP (למשל data model של work-center, MRP-area), שמשפיעים על מקורות ה-PP/DS.",
      purposeHe:
        "המטרה: לעבור ל-S/4HANA ולהפעיל embedded PP/DS תוך שימור מקסימלי של ההשקעה הקיימת — נתונים, היסטוריה, customizing ותהליכים מוכרים — וכך לקצר זמן-פרויקט ולהקטין סיכון-עסקי לעומת re-implementation מלא. מתאים כשהמערכת הקיימת בריאה-יחסית והתהליכים עדיין מתאימים.",
      processExampleHe:
        "ארגון עם ECC + APO PP/DS standalone מבצע brownfield: (1) Readiness Check + Simplification Item Check; (2) ניקוי custom code לפי ATC; (3) SUM/DMO ממיר את ה-ECC ל-S/4HANA במקום; (4) post-conversion — הפעלת Advanced Planning; (5) בניית PDS/Resources מנתוני-ה-S/4HANA המומרים (CURTO_CREATE, RES01); (6) הגדרת integration פנימי במקום CIF; (7) השוואת תוצאות-תכנון מול ה-APO הישן; (8) השבתת APO. ההיסטוריה העסקית של ה-ERP נשמרה במלואה.",
      cbcHe:
        "ב-CBC: מפעל אשקלון הוותיק, שתכנן בקווי-מילוי דרך APO PP/DS, עובר brownfield — ה-ECC שלו מומר במקום ל-S/4HANA עם embedded PP/DS. כל ההיסטוריה (פק\"ע, אישורי-ייצור, מלאי) נשמרת. ה-CIF בין ה-ECC ל-APO מוחלף ב-integration פנימי; קווי-המילוי נבנים-מחדש כ-Resources מתוך ה-Work Centers המומרים, וה-PDS נוצרת מ-BOM+Recipe+Production Version. תכנון-המשקאות נבדק מול ה-APO הישן לפני השבתתו.",
      navHe: [
        "Maintenance Planner (SAP for Me) ► Plan Conversion / Add-on compatibility",
        "SAP Readiness Check ► Analyze ECC system",
        "SPRO / report ► Simplification Item Check (/SDF/RC_START_CHECK)",
        "SE80 / ATC ► Custom Code Migration (variant S4HANA_READINESS)",
        "SPRO ► Advanced Planning ► Activate + Define Integration (post-conversion)",
      ],
      tables: ["MARC", "CRHD", "RESC", "/SAPAPO/PDS_HEAD", "TCIF", "PPDS_ORDER"],
      tcodes: ["SUM", "DMO", "/SDF/RC_START_CHECK", "SCI", "CURTO_CREATE", "/SAPAPO/RES01"],
      fiori: ["F1611", "F2336", "F1421"],
      configHe: [
        "Maintenance Planner: stack-XML להמרה; אימות תאימות add-ons (כולל APO add-on אם קיים).",
        "Simplification Item Check: זיהוי חסמים — PP/DS, work-center, MRP-area data model.",
        "Custom Code Migration: ATC עם variant S4HANA_READINESS; תיקון Z-code שאינו תואם.",
        "Activate Advanced Planning post-conversion: הפעלת PP/DS המובנה אחרי SUM/DMO.",
        "Integration (במקום CIF): הגדרת סנכרון-master-data פנימי ב-Advanced Planning ► Integration.",
      ],
      flow: [
        { he: "Maintenance Planner", code: "—", note: "add-ons" },
        { he: "Readiness Check", code: "—", note: "תמונת-מצב" },
        { he: "Simplification Item Check", code: "/SDF/RC_START_CHECK", note: "חסמים" },
        { he: "Custom Code Migration", code: "ATC", note: "תיקון Z" },
        { he: "המרה טכנית", code: "SUM/DMO", note: "in-place" },
        { he: "הפעלת Advanced Planning", code: "Activate", note: "post" },
        { he: "בניית PDS + Resources", code: "CURTO_CREATE", note: "מ-S/4 data" },
        { he: "אימות מול APO + השבתה", code: "—" },
      ],
      masterDataHe: [
        "נתוני-אב ו-transactional של ה-ERP מומרים in-place — לא צריך להעבירם ידנית.",
        "אובייקטי-תכנון של APO (PPM/PDS, location products, resources) נבנים-מחדש מנתוני-ה-S/4HANA.",
        "Work Centers מומרים ל-Resources (RES01); BOM+Routing+Production Version ➔ PDS (CURTO_CREATE).",
        "היסטוריית-תכנון של APO standalone אינה נגררת אוטומטית — נדרשת אסטרטגיית-ארכיון/השוואה.",
      ],
      mistakesHe: [
        "דילוג על Simplification Item Check / Custom Code Migration — ההמרה נתקעת או שובר את ה-PP/DS post-conversion.",
        "הנחה שהיסטוריית-APO תיגרר אוטומטית — היא לא; רק ה-ERP מומר.",
        "אי-החלפת CIF ב-integration פנימי — סנכרון-master-data לא עובד ב-embedded.",
        "שכחת בניית PDS/Resources אחרי ההמרה — מודל-התכנון ריק למרות שה-master data קיים.",
      ],
      troubleshootHe: [
        "SUM/DMO נכשל ➔ add-on לא-תואם ב-Maintenance Planner או Simplification Item פתוח.",
        "PP/DS לא מתכנן אחרי המרה ➔ Advanced Planning לא הופעל / integration פנימי לא הוגדר.",
        "אין מקורות-אספקה ➔ PDS לא נבנתה-מחדש (CURTO_CREATE) מנתוני-ה-S/4HANA המומרים.",
        "Z-program נכשל אחרי המרה ➔ custom code לא הותאם ל-S/4HANA (ATC findings לא טופלו).",
      ],
      bestPracticeHe: [
        "הרץ Readiness Check + Simplification Item Check מוקדם ככל האפשר — לפני תכנון-לוחות-זמנים.",
        "טפל ב-custom code עם ATC (S4HANA_READINESS) לפני ה-SUM, לא אחריו.",
        "בנה תכנית post-conversion מפורשת ל-PP/DS: Activate ➔ Integration ➔ PDS ➔ Resources ➔ אימות.",
        "הרץ trial conversion (sandbox) מלא והשווה תוצאות-תכנון מול ה-APO הקיים.",
      ],
      interviewHe: [
        { qHe: "מהו brownfield ובמה הוא שונה מ-greenfield?", aHe: "brownfield = המרה טכנית in-place של ECC קיים ל-S/4HANA דרך SUM/DMO, תוך שימור נתונים והיסטוריה. greenfield מקים מערכת חדשה ומעביר נתונים סלקטיבית. brownfield מהיר ושומר-עבר; greenfield נקי אך עתיר-העברה." },
        { qHe: "אילו בדיקות מקדימות חובה ב-system conversion?", aHe: "Maintenance Planner (תאימות add-ons), SAP Readiness Check, Simplification Item Check (/SDF/RC_START_CHECK) ו-Custom Code Migration עם ATC (variant S4HANA_READINESS)." },
        { qHe: "מה קורה למודל-התכנון של APO אחרי brownfield?", aHe: "ה-CIF מוחלף ב-integration פנימי; אובייקטי-התכנון (PDS, Resources, location products) נבנים-מחדש מנתוני-ה-S/4HANA המומרים; היסטוריית-APO standalone אינה נגררת אוטומטית." },
      ],
      takeawaysHe: [
        "brownfield = המרה טכנית in-place דרך SUM/DMO, שומרת נתונים, היסטוריה ו-customizing.",
        "חובה: Maintenance Planner, Readiness Check, Simplification Item Check, Custom Code Migration.",
        "post-conversion: הפעלת Advanced Planning, החלפת CIF ב-integration פנימי, בניית PDS+Resources.",
        "מהיר ושומר-עבר, אך נושא חוב-טכני ולא גורר אוטומטית את היסטוריית-ה-APO.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מימוש חדש (11.1)", href: "/library/ppds/chapter-11/#sub-11.1" },
        { labelHe: "PP/DS · טרנספורמציית נוף (11.3)", href: "/library/ppds/chapter-11/#sub-11.3" },
        { labelHe: "אובייקט · Resource", href: "/library/ppds/object/RESC/" },
      ],
    },
    // ============================================================ 11.3
    {
      id: "11.3",
      titleHe: "טרנספורמציית נוף-המערכות (Landscape Transformation / Selective)",
      titleEn: "Landscape Transformation (Selective)",
      execHe:
        "SAP S/4HANA Landscape Transformation (LT) הוא הנתיב ה'סלקטיבי' (selective data transition) — שילוב-ביניים בין greenfield ל-brownfield. הוא מאפשר להעביר רק חלק מהמערכת: מפעל מסוים, חברה (company code), אזור-תכנון או נתח-נתונים מוגדר, ולמזג/לפצל מערכות קיימות לתוך S/4HANA חדש או קיים. הכלים: SAP S/4HANA Landscape Transformation engine ו-SLT (SAP Landscape Transformation Replication Server) / DMLT (Data Management & Landscape Transformation) services. ב-PP/DS: מאפשר להעביר ולהפעיל embedded PP/DS למפעל/לקבוצת-מפעלים נבחרים בלבד, בלי 'הכל-או-כלום', תוך שמירת היסטוריה רלוונטית.",
      beginnerHe:
        "תאר העברה של רק חלק מהבית — למשל רק המטבח — לבית חדש, ולא הכל בבת-אחת. selective transition מאפשר לבחור מה להעביר: מפעל אחד, חברה אחת, או רק נתונים מסוימים, ולמזג כמה מערכות לאחת. זה אמצע-הדרך: לא נקי-לגמרי כמו greenfield, ולא 'הכל-במקום' כמו brownfield. מתאים לארגונים גדולים עם הרבה מפעלים שרוצים לעבור בשלבים. החיסרון: זה המורכב והיקר ביותר טכנית.",
      consultantHe:
        "selective data transition מבוצע דרך SAP S/4HANA Landscape Transformation engine בשילוב SLT (trigger-based real-time replication) ו-DMLT services (מבית SAP / שותף מוסמך — לרוב פרויקט מודרך). תרחישים: company-code merge, plant carve-out, system consolidation, mandant/client split, ו-phased rollout. ל-PP/DS: ניתן להעביר master + transactional של scope מוגדר (set of plants / planning-relevant org units) ולהפעיל Advanced Planning רק לאותו scope. נקודות-מפתח: (1) shell conversion / selective — בונים shell של S/4HANA ומעבירים בורר-נתונים; (2) SLT לרפליקציה רציפה בזמן cutover, מאפשר near-zero-downtime ו-coexistence תקופתית; (3) data harmonization — מיזוג קוד-ארגוני בין מקורות (למשל אחדת Material/Plant codes); (4) אובייקטי-PP/DS (PDS, Resources) נבנים-מחדש בצד-היעד ל-scope המועבר; (5) שירות מבוסס DMLT — דורש מעורבות SAP, אינו self-service מלא. זהו הנתיב היקר והמורכב, אך הגמיש ביותר.",
      purposeHe:
        "המטרה: לאפשר מעבר מדורג וגמיש לארגונים מורכבים — multi-plant, multi-company, M&A — שלא יכולים לעצור הכל ולעבור בבת-אחת (כמו brownfield) ולא רוצים לאבד היסטוריה (כמו greenfield). מאפשר לאחד נוף-מערכות מבוזר, לפצל ישות שנמכרה, או לעבור מפעל-אחר-מפעל ל-embedded PP/DS עם downtime מינימלי.",
      processExampleHe:
        "תאגיד עם 3 מערכות-ECC אזוריות מאחד ל-S/4HANA אחד: (1) בונה shell של S/4HANA; (2) מגדיר scope — אילו company codes/plants ואיזו היסטוריה; (3) DMLT/SLT מעביר ומאחד את הנתונים עם data harmonization (אחדת קודי-חומר/מפעל); (4) מפעיל Advanced Planning ל-scope המועבר; (5) בונה PDS/Resources בצד-היעד; (6) SLT מסנכרן בזמן-אמת עד ה-cutover ל-near-zero-downtime; (7) מעביר את האזור הבא בגל נפרד.",
      cbcHe:
        "ב-CBC: התאגיד מפעיל phased rollout — מפעל באר-שבע (greenfield) ראשון, ואז selective transition מעביר את מפעלי אשקלון וחיפה ל-S/4HANA המאוחד, מפעל-אחר-מפעל, עם data harmonization של קודי-המשקה והמפעלים. SLT מסנכרן את מפעלי-המעבר בזמן-אמת לצמצום-downtime בקווי-המילוי, ו-embedded PP/DS מופעל לכל מפעל בתורו. היסטוריית-הייצור הרלוונטית מועברת; ה-scope נבחר לפי company code.",
      navHe: [
        "SAP S/4HANA Landscape Transformation (DMLT engagement) ► Define Transformation Scope",
        "SLT (SAP Landscape Transformation Replication Server) ► LTRC / LTRS — Configuration + Replication",
        "Data Harmonization ► Value Mapping / Conversion Rules (selective)",
        "SPRO ► Advanced Planning ► Activate (per scope) + Define Integration",
      ],
      tables: ["MARC", "T001", "T001W", "DMC_MT_DEST", "/SAPAPO/PDS_HEAD", "RESC"],
      tcodes: ["LTRC", "LTRS", "LTR", "CURTO_CREATE", "/SAPAPO/RES01"],
      fiori: ["F1611", "F2336", "F1421"],
      configHe: [
        "Transformation Scope: בחירת company codes / plants / org units ונתח-היסטוריה להעברה.",
        "SLT Configuration (LTRC/LTRS): mass transfer, replication settings, advanced replication rules.",
        "Data Harmonization: conversion/value-mapping לאחדת קוד-ארגוני בין מערכות-מקור.",
        "Activate Advanced Planning per scope: הפעלת PP/DS רק ל-plants המועברים.",
        "PDS/Resource rebuild בצד-היעד ל-scope המועבר (CURTO_CREATE, RES01).",
      ],
      flow: [
        { he: "בניית shell S/4HANA", code: "—", note: "יעד" },
        { he: "הגדרת scope + היסטוריה", code: "DMLT", note: "selective" },
        { he: "Data harmonization", code: "—", note: "אחדת קודים" },
        { he: "רפליקציה + מיזוג", code: "SLT/LTRC", note: "near-ZDT" },
        { he: "הפעלת Advanced Planning ל-scope", code: "Activate" },
        { he: "בניית PDS + Resources", code: "CURTO_CREATE" },
        { he: "Cutover גל נוכחי", code: "—" },
        { he: "גל-מפעל הבא", code: "—", note: "phased" },
      ],
      masterDataHe: [
        "מועבר נתח-נתונים מוגדר (plants/company codes) — לא כל המערכת, לא 'מאפס'.",
        "Data harmonization מאחד קודי-חומר/מפעל בין מערכות-מקור לפני המיזוג ל-S/4HANA.",
        "אובייקטי-PP/DS (PDS, Resources) נבנים-מחדש בצד-היעד ל-scope המועבר בלבד.",
        "SLT מאפשר coexistence ורפליקציה רציפה עד ה-cutover — חלון-downtime מינימלי.",
      ],
      mistakesHe: [
        "ניסיון selective transition כ-self-service ללא DMLT/שותף-מוסמך — הנתיב דורש מעורבות-SAP.",
        "דילוג על data harmonization — קודי-ארגון כפולים/מתנגשים שוברים את המודל המאוחד.",
        "הגדרת scope לא-עקבי (מפעל בלי ה-company code שלו) — שלמות-נתונים נפגעת.",
        "אי-בניית PDS/Resources ל-scope המועבר — ה-plants החדשים לא מתכננים.",
      ],
      troubleshootHe: [
        "רפליקציית-SLT נתקעת ➔ בדוק LTRC/LTRS — triggers, logging tables, RFC connection.",
        "התנגשות-קודים אחרי מיזוג ➔ conversion/value-mapping ב-data harmonization חסר.",
        "PP/DS לא פעיל ל-plant מועבר ➔ Advanced Planning לא הופעל ל-scope, או integration לא הוגדר.",
        "downtime ארוך מהצפוי ➔ replication delta גדול; הקדם את ה-initial load ב-SLT.",
      ],
      bestPracticeHe: [
        "שתף SAP DMLT / שותף-מוסמך מההתחלה — אין self-service מלא לנתיב הזה.",
        "תכנן scope עקבי: plant + company code + org units יחד, לא בנפרד.",
        "השקע ב-data harmonization מוקדם — אחדת קודים היא לב-הליבה של מיזוג.",
        "נצל SLT ל-near-zero-downtime ול-coexistence בזמן ה-phased rollout.",
      ],
      interviewHe: [
        { qHe: "מהו selective data transition / Landscape Transformation?", aHe: "נתיב-ביניים בין greenfield ל-brownfield שמעביר רק חלק מהמערכת (plant/company code/נתח-נתונים) ומאפשר מיזוג/פיצול מערכות. מבוצע דרך SAP S/4HANA LT engine עם SLT ו-DMLT services." },
        { qHe: "מתי בוחרים בו על-פני שני הנתיבים האחרים?", aHe: "בארגונים מורכבים (multi-plant, multi-company, M&A) שצריכים מעבר מדורג, מיזוג/פיצול נוף-מערכות, ושמירת היסטוריה — כשגם brownfield 'הכל-או-כלום' וגם greenfield 'מאפס' אינם מתאימים." },
        { qHe: "מה תפקיד SLT בנתיב הזה?", aHe: "SLT (Replication Server) מבצע רפליקציה רציפה trigger-based בזמן-אמת, מאפשר coexistence ו-near-zero-downtime עד ה-cutover, ומשמש גם ל-initial load ו-delta." },
      ],
      takeawaysHe: [
        "Landscape Transformation = selective transition, אמצע-הדרך בין greenfield ל-brownfield.",
        "מעביר scope מוגדר (plant/company code) וממזג/מפצל מערכות; מבוסס SLT + DMLT.",
        "מאפשר phased rollout של embedded PP/DS מפעל-אחר-מפעל עם downtime מינימלי.",
        "הנתיב הגמיש ביותר — אך היקר, המורכב, ודורש מעורבות-SAP/שותף.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · המרת מערכת (11.2)", href: "/library/ppds/chapter-11/#sub-11.2" },
        { labelHe: "PP/DS · סיכום ובחירת נתיב (11.4)", href: "/library/ppds/chapter-11/#sub-11.4" },
        { labelHe: "אובייקט · SLT", href: "/library/ppds/object/SLT/" },
      ],
    },
    // ============================================================ 11.4
    {
      id: "11.4",
      titleHe: "סיכום ובחירת נתיב-המעבר",
      titleEn: "Summary",
      execHe:
        "סיכום הפרק: שלושת נתיבי-המעבר ל-embedded PP/DS — new implementation (greenfield), system conversion (brownfield), ו-SAP S/4HANA Landscape Transformation (selective) — נבדלים בשלושה צירים: כמה מ-העבר נשמר, כמה מאמץ-העברה נדרש, ומידת-הגמישות. greenfield = נקי, re-engineering, עתיר-העברה. brownfield = שומר-עבר, in-place, מהיר אך נושא חוב-טכני. selective = גמיש, מדורג, יקר-ומורכב. בכל הנתיבים, אחרי המעבר הטכני נדרשת אותה עבודת-PP/DS: הפעלת Advanced Planning, החלפת CIF ב-integration פנימי, ובניית PDS ו-Resources. הבחירה היא החלטה-אסטרטגית התלויה במצב המערכת, במורכבות-הארגון ובתיאבון-לסיכון.",
      beginnerHe:
        "שלוש דרכים לעבור ל-PP/DS המובנה: (1) greenfield — בית חדש, נקי, אך צריך להעביר נתונים; (2) brownfield — שיפוץ-במקום, מהיר, אך גוררים את הישן; (3) selective — מעבירים חלק-חלק, גמיש אך מורכב ויקר. אין דרך 'נכונה' אחת — בוחרים לפי כמה ישנה המערכת, כמה מפעלים יש, וכמה סיכון אפשר לקחת. הדבר המשותף: בכל דרך, בסוף מדליקים את PP/DS, בונים את מודל-התכנון (PDS ו-Resources), ובודקים שהתכנון עובד.",
      consultantHe:
        "מטריצת-החלטה ליועץ. greenfield: כשהמערכת ישנה/מותאמת-יתר, רוצים re-engineering, או מקור non-SAP/APO standalone; כלים LTMC/LTMOM; סיכון = data quality. brownfield: כשהמערכת בריאה והתהליכים מתאימים, רוצים שימור-היסטוריה ופרויקט מהיר; כלים SUM/DMO + Readiness/Simplification/ATC; סיכון = custom code וחוב-טכני. selective (LT): כשהארגון מורכב (M&A, consolidation, carve-out, phased rollout); כלים SLT/DMLT; סיכון = עלות, מורכבות, תלות-בשותף. נקודות-משותפות לכל הנתיבים ב-PP/DS: (1) Activate Advanced Planning; (2) embedded מבטל CIF — integration פנימי על אותם MARA/MARC; (3) PDS מחליפה PPM/Runtime-objects; (4) Resources מ-Work Centers; (5) אימות heuristics/optimizer מול הבייסליין. המלצה: הרץ Readiness Check בכל מקרה, גם ל-greenfield, כדי להבין את ה-baseline.",
      purposeHe:
        "המטרה: לתת ללומד מסגרת-החלטה ברורה לבחירת נתיב-המעבר, ולעגן את המכנה-המשותף של עבודת-ה-PP/DS שמתבצעת אחרי כל מעבר טכני — כדי שהבחירה תהיה מושכלת ולא 'ברירת-מחדל של הספק'.",
      processExampleHe:
        "תהליך-החלטה טיפוסי: (1) Readiness Check + הערכת data quality ו-custom code; (2) מיפוי מורכבות-ארגונית (מפעלים, חברות, M&A); (3) שקלול תיאבון-סיכון מול חלון-downtime; (4) בחירת נתיב — greenfield אם רוצים re-engineering, brownfield אם המערכת בריאה ומהירות חשובה, selective אם מורכבות גבוהה ומעבר מדורג; (5) בכל מקרה — תכנית post-go-live ל-PP/DS: Activate ➔ Integration ➔ PDS ➔ Resources ➔ אימות.",
      cbcHe:
        "ב-CBC הבחירה היא היברידית: greenfield למפעל-החדש בבאר-שבע (התחלה נקייה), ו-selective transition לאיחוד מפעלי אשקלון וחיפה הוותיקים ל-S/4HANA המאוחד תוך שמירת היסטוריה. brownfield נשקל ונדחה — נוף-המערכות מבוזר מדי ל'הכל-או-כלום'. בכל המפעלים, embedded PP/DS מופעל, CIF מבוטל, וקווי-המילוי נבנים כ-Resources עם PDS — תכנון-המשקאות מאומת מול ה-APO הישן לפני השבתתו.",
      navHe: [
        "SAP Readiness Check ► Baseline assessment (כל הנתיבים)",
        "SAP Activate Methodology ► Transition Path Decision",
        "SPRO ► Advanced Planning ► Activate + Integration (post-transition, כל הנתיבים)",
        "SAP S/4HANA Migration / Conversion / Landscape Transformation — לפי הנתיב הנבחר",
      ],
      tables: ["MARC", "/SAPAPO/PDS_HEAD", "RESC", "TCIF"],
      tcodes: ["LTMC", "SUM", "LTRC", "CURTO_CREATE", "/SAPAPO/RES01", "/SAPAPO/RRP3"],
      fiori: ["F1611", "F2336", "F1421"],
      configHe: [
        "Decision matrix: greenfield (re-engineering) / brownfield (in-place מהיר) / selective (מדורג-גמיש).",
        "מכנה-משותף post-transition: Activate Advanced Planning + Integration פנימי (במקום CIF).",
        "מכנה-משותף: בניית PDS (CURTO_CREATE) ו-Resources (RES01) מנתוני-ה-S/4HANA.",
        "אימות: הרצת heuristics/optimizer והשוואה ל-baseline של ה-APO/ECC.",
      ],
      flow: [
        { he: "Readiness Check + baseline", code: "—", note: "כל נתיב" },
        { he: "הערכת data quality + custom code", code: "ATC" },
        { he: "מיפוי מורכבות-ארגונית", code: "—" },
        { he: "בחירת נתיב", code: "—", note: "green/brown/selective" },
        { he: "מעבר טכני", code: "LTMC/SUM/LT" },
        { he: "Activate PP/DS + Integration", code: "Activate" },
        { he: "PDS + Resources", code: "CURTO_CREATE" },
        { he: "אימות מול baseline", code: "/SAPAPO/RRP3" },
      ],
      masterDataHe: [
        "בכל הנתיבים: PDS מחליפה PPM/Runtime-objects; Resources מ-Work Centers.",
        "embedded מבטל CIF — master data על אותם MARA/MARC עם integration פנימי.",
        "ההבדל הוא רק כיצד הנתונים מגיעים (selective/in-place/חדש), לא מה בונים אחר-כך.",
      ],
      mistakesHe: [
        "בחירת-נתיב מתוך נוחות-הספק במקום ניתוח מצב-המערכת ומורכבות-הארגון.",
        "התעלמות מהמכנה-המשותף — שכחה שגם אחרי כל מעבר צריך Activate + PDS + Resources.",
        "אי-הרצת Readiness Check בנתיב greenfield 'כי בונים מאפס' — מאבדים תובנת-baseline.",
        "הזנחת אימות-תכנון מול ה-baseline הישן — go-live בלי ביטחון שהתכנון תקין.",
      ],
      troubleshootHe: [
        "התלבטות בין נתיבים ➔ דרג לפי data quality, custom code, מורכבות-ארגונית ו-downtime מותר.",
        "PP/DS לא פעיל אחרי כל מעבר ➔ נשכח השלב המשותף Activate Advanced Planning + Integration.",
        "תוצאות-תכנון שונות מהצפוי ➔ PDS/Resources לא נבנו נכון; השווה ל-baseline.",
        "go-live מתעכב ➔ חוסר baseline לאימות; הרץ Readiness Check והגדר KPIs מראש.",
      ],
      bestPracticeHe: [
        "הרץ Readiness Check בכל נתיב — גם greenfield — לקבל baseline להחלטה ולאימות.",
        "בחר נתיב לפי מטריצה: מצב-מערכת × מורכבות-ארגון × תיאבון-סיכון × חלון-downtime.",
        "תכנן מראש את המכנה-המשותף ל-PP/DS: Activate ➔ Integration ➔ PDS ➔ Resources ➔ אימות.",
        "הגדר KPIs לתכנון (תפוקת-קווים, on-time, capacity load) והשווה לפני/אחרי המעבר.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת נתיבי-המעבר ל-embedded PP/DS וההבדל ביניהם?", aHe: "greenfield (new implementation) — מערכת חדשה + העברה סלקטיבית, נקי אך עתיר-העברה. brownfield (system conversion) — המרה in-place דרך SUM/DMO, מהיר ושומר-עבר. selective (Landscape Transformation) — העברת-scope מדורגת עם SLT/DMLT, גמיש אך יקר-ומורכב." },
        { qHe: "מה משותף לכל שלושת הנתיבים בצד ה-PP/DS?", aHe: "אחרי המעבר הטכני: הפעלת Advanced Planning, החלפת CIF ב-integration פנימי על אותם MARA/MARC, בניית PDS (במקום PPM/Runtime-objects) ו-Resources (מ-Work Centers), ואימות heuristics/optimizer מול baseline." },
        { qHe: "כיצד בוחרים את הנתיב הנכון?", aHe: "לפי מטריצה: מצב-המערכת (data quality, custom code), מורכבות-הארגון (multi-plant/M&A), תיאבון-לסיכון וחלון-downtime. אין נתיב 'נכון' אחד — לעיתים בוחרים גישה היברידית, כמו ב-CBC." },
      ],
      takeawaysHe: [
        "שלושה נתיבים: greenfield (נקי), brownfield (in-place), selective/LT (מדורג-גמיש).",
        "ההבדל בין הנתיבים הוא כיצד הנתונים מגיעים; עבודת-ה-PP/DS אחר-כך זהה.",
        "מכנה-משותף: Activate Advanced Planning, integration פנימי (לא CIF), PDS + Resources, אימות.",
        "בחר לפי מטריצת מצב-מערכת × מורכבות × סיכון × downtime — לעיתים היברידי (כמו CBC).",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מימוש חדש (11.1)", href: "/library/ppds/chapter-11/#sub-11.1" },
        { labelHe: "PP/DS · המרת מערכת (11.2)", href: "/library/ppds/chapter-11/#sub-11.2" },
        { labelHe: "PP/DS · טרנספורמציית נוף (11.3)", href: "/library/ppds/chapter-11/#sub-11.3" },
      ],
    },
  ],
};
