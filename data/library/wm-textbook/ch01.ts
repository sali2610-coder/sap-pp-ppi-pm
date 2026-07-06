// ===== WM/EWM Digital Textbook — Chapter 1 (gold-standard learning chapter) =====
// Introduction to Extended Warehouse Management (EWM).
// Every node (parent + nested) is a complete 18-facet LearningNode in authored
// Hebrew — beginner-friendly AND consultant-grade. SAP identifiers verbatim EN.
// Source hierarchy preserved exactly (ids + order); nothing invented or dropped.
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "מבוא ל-Extended Warehouse Management (EWM)",
  titleEn: "Introduction to Extended Warehouse Management",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לעולם ה-Extended Warehouse Management (EWM) של SAP. נתחיל בשאלה 'מה זה EWM ובמה הוא נבדל מ-WM הקלאסי', נמשיך באבולוציה של המוצר (מ-EWM 5.0 כתוסף ל-SCM ועד embedded EWM ב-S/4HANA וענן), נסקור את אפשרויות-הפריסה (On-Premise, Cloud, NetWeaver, decentralized מול ERP זר), נבין כיצד נתונים זורמים בין SAP ERP / S/4HANA לבין EWM (CIF / qRFC / DRF), נמפה את האינטגרציה עם MM-IM, PP, QM, TM ו-LE, נדון באימוץ בתעשייה, ונסכם את ה-SAP Notes המהותיים. כל תת-פרק ותת-סעיף הורחב ליחידה עצמאית בת 18 מקטעים: שלוש רמות-הסבר, מטרה עסקית, דוגמת-תהליך, דוגמת הארגון (מפעל-הבקבוק של מוצר לדוגמה ישראל), ניווט/SPRO, טבלאות/T-Codes/Fiori, קונפיגורציה, תרשים-תהליך, טעויות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות. המטרה: ללמוד את הנושא במלואו ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1",
      titleHe: "מהו Extended Warehouse Management?",
      titleEn: "What Is Extended Warehouse Management?",
      execHe:
        "SAP Extended Warehouse Management (EWM) הוא פתרון ניהול-מחסן מתקדם המנהל את כל זרימת-החומר והמלאי בתוך מרכז-לוגיסטי ברזולוציה של מיקום-אחסון (storage bin). בניגוד ל-WM הקלאסי שהוא רכיב בתוך ה-ERP, EWM הוא מנוע-מחסן עשיר התומך בתהליכים מורכבים: ניהול עבודה (Labor Management), גלי-ליקוט (Wave Management), Yard Management, slotting, cross-docking, ו-RF mobile. ב-S/4HANA הוא זמין כ-embedded (באותו מערכת) או decentralized (מערכת נפרדת).",
      beginnerHe:
        "דמיין מחסן ענק עם אלפי מדפים. כל פינה במדף היא 'תא' (storage bin) עם כתובת מדויקת. EWM יודע בכל רגע מה יושב בכל תא, מנתב את העובד עם מסופון (RF) בדיוק לתא הנכון, ומחליט באיזה סדר לבצע משימות. WM הקלאסי ידע 'איפה כללית' החומר נמצא; EWM יודע בדיוק, ומנהל גם אנשים, ציוד, חצר-משאיות ובקרת-איכות — הכול במקום אחד.",
      consultantHe:
        "EWM בנוי סביב Warehouse Number עצמאי המקושר ל-Plant/Storage Location בצד ה-ERP. אובייקטי-הליבה: Activity Areas, Storage Types/Sections/Bins, Warehouse Process Types (WPT), Storage Control (Layout-Oriented + Process-Oriented), Warehouse Tasks (WT) ו-Warehouse Orders (WO). מסמך-המפתח הוא ה-Inbound/Outbound Delivery בצד EWM, נפרד ממסמך ה-ERP ומסונכרן דרך queued RFC. המנוע משתמש ב-condition technique (PPF — Post Processing Framework) להפעלת פעולות, וב-MFS לאינטגרציית-אוטומציה. ההבחנה המהותית מ-WM הקלאסי: EWM הוא מערכת-תיעוד נפרדת עם Stock Identification ו-Handling Units מובנים, ולא הרחבה של MM-IM.",
      purposeHe:
        "המטרה: לתת לארגון עם מחסנים מורכבים שליטה ברמת-bin, ניצול-מיטבי של שטח וכוח-אדם, נראות בזמן-אמת, ותהליכים מתקדמים (גלים, cross-docking, VAS, kitting) שאינם אפשריים ב-WM הקלאסי. EWM מקצר זמני-מחזור, מפחית טעויות-ליקוט ומאפשר אוטומציה (מסועים, AS/RS, AGV).",
      processExampleHe:
        "קבלת-טובין: משאית מגיעה ➔ ASN/Inbound Delivery זורמת מה-ERP ל-EWM ➔ EWM יוצר Warehouse Task לפריקה ל-bin קבלה ➔ אופציונלי QM inspection ➔ putaway WT מנתב ל-bin אחסון לפי אסטרטגיית-Putaway ➔ אישור ה-WT מעדכן מלאי ב-EWM וגוזר Goods Receipt בחזרה ל-ERP. כל שלב מתועד ברמת ה-Handling Unit.",
      scenarioHe:
        "בארגון (מוצר לדוגמה ישראל): מרכז-ההפצה האזורי מקבל משטחי-משקאות מוגמרים מקו-המילוי וחומרי-אריזה מספקים. EWM מנהל את ה-bins של המקררים והמדפים, מנתב מלגזות ב-RF, מבצע גלי-ליקוט להזמנות-לקוח (סופרמרקטים), ושומר FEFO לפי תוקף-המשקה. ההחלטה embedded מול decentralized תלויה בנפח: מרכז-הפצה גדול עם אוטומציה ⟵ decentralized.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Warehouse Number Control",
        "SAP Easy Access ► Logistics ► SCM Extended Warehouse Management ► Extended Warehouse Management",
      ],
      tables: ["/SCWM/T301", "/SCWM/LAGP", "/SCWM/ORDIM_O", "/SCWM/ORDIM_C", "/SCWM/HUHDR"],
      tcodes: ["/SCWM/MON", "/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/RFUI", "/SCWM/ADGI"],
      fiori: ["F2148", "W0001", "F4022"],
      configHe: [
        "Warehouse Number: ישות-העל של EWM; מקושרת ל-ERP Warehouse Number/Plant דרך mapping ב-IMG.",
        "Storage Type / Section / Bin: ההיררכיה הפיזית; bin הוא הרזולוציה הסופית.",
        "Warehouse Process Type (WPT): קובע את אופי המשימה (putaway/picking) ומכוון את Storage Control.",
        "Activity Areas: קיבוץ bins לצורכי ליקוט/ספירה — בסיס ל-Warehouse Order creation.",
      ],
      flow: [
        { he: "מסמך אספקה זורם מ-ERP", code: "Inbound/Outbound Delivery", note: "qRFC" },
        { he: "יצירת Warehouse Task", code: "/SCWM/ORDIM_O" },
        { he: "ניתוב לפי Storage Control", code: "WPT" },
        { he: "ביצוע ב-RF", code: "/SCWM/RFUI", note: "מסופון" },
        { he: "אישור WT ועדכון מלאי", code: "/SCWM/LAGP" },
        { he: "GR/GI חוזר ל-ERP", code: "qRFC" },
      ],
      masterDataHe: [
        "Storage Bin (/SCWM/LAGP) = הכתובת הפיזית · Product Master (EWM view) · Packaging Specification.",
        "Handling Unit (/SCWM/HUHDR) = יחידת-טיפול לוגית (משטח/ארגז) עם תכולה ומשקל.",
      ],
      mistakesHe: [
        "בלבול בין EWM Warehouse Number ל-ERP Warehouse Number — הם נפרדים וממופים זה לזה.",
        "ניסיון לתחזק מלאי ישירות ב-MM-IM כאשר ה-management עבר ל-EWM — גורם לאי-התאמות.",
        "התעלמות מ-Handling Unit management — EWM מבוסס-HU ברוב התהליכים.",
      ],
      troubleshootHe: [
        "מסמך-אספקה לא מגיע ל-EWM ➔ בדוק qRFC queues (SMQ1/SMQ2) ו-Distribution Model (CIF).",
        "Warehouse Task לא נוצר ➔ WPT/Storage Control חסר או Storage-Type-Search ריק.",
        "מלאי ב-EWM ≠ מלאי ב-ERP ➔ בדוק stock-comparison report (/SCWM/ERP_STOCKCHECK).",
      ],
      bestPracticeHe: [
        "הגדר היררכיית-bins ברורה והאחיד מוסכמת-מספור bins.",
        "השתמש ב-Warehouse Management Monitor (/SCWM/MON) כנקודת-בקרה מרכזית.",
        "תכנן את ההחלטה embedded מול decentralized מוקדם — היא משפיעה על כל הארכיטקטורה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל המהותי בין EWM ל-WM הקלאסי?", aHe: "WM הוא רכיב בתוך ה-ERP המנהל מלאי ברמת storage type/bin בסיסית; EWM הוא מנוע-מחסן עצמאי עם מסמכי-אספקה משלו, Handling Units, Labor/Wave/Yard Management, RF ואוטומציה — ניהול ברזולוציה ובעומק גבוהים בהרבה." },
        { qHe: "מהו Warehouse Number ב-EWM?", aHe: "ישות-העל המגדירה מחסן לוגי ב-EWM, עצמאית מ-ERP Warehouse Number וממופה אליו; תחתיה יושבים Storage Types, Sections ו-Bins." },
        { qHe: "מהי Handling Unit?", aHe: "יחידת-טיפול לוגית (משטח/ארגז/מכולה) הנושאת תכולה, אריזה ומשקל; EWM הוא HU-centric ברוב התהליכים." },
      ],
      takeawaysHe: [
        "EWM = מנוע-מחסן עצמאי לניהול ברמת bin, לא הרחבה של MM-IM.",
        "מסמכי Inbound/Outbound Delivery בצד EWM נפרדים ומסונכרנים מול ה-ERP.",
        "Handling Units, Storage Control ו-Warehouse Tasks הם אבני-היסוד.",
        "זמין כ-embedded או decentralized ב-S/4HANA.",
      ],
      relatedHe: [
        { labelHe: "EWM · אבולוציה של המוצר (1.2)", href: "/library/wm-academy/chapter-01/#sub-1.2" },
        { labelHe: "MM · ניהול מלאי MM-IM", href: "/library/mm/chapter-04/" },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2",
      titleHe: "האבולוציה של EWM",
      titleEn: "The Progression of EWM",
      execHe:
        "EWM עבר מסע ארוך: מתוסף נפרד על גבי SAP SCM/SCE (גרסאות 5.0–9.5), דרך הטמעה כ-embedded EWM בתוך S/4HANA וגם decentralized EWM כמערכת ייעודית, ועד הצעת cloud-based EWM. הבנת ההיסטוריה חיונית כי קונפיגורציה, יכולות ונתיב-שדרוג שונים בכל דור.",
      beginnerHe:
        "בהתחלה EWM היה 'תוכנה נפרדת' שהתקנת לצד ה-ERP. עם הזמן SAP הכניס אותו לתוך ה-S/4HANA עצמו (embedded), אבל השאיר גם אפשרות להריץ אותו במערכת נפרדת (decentralized) למחסנים גדולים מאוד. היום יש גם גרסת-ענן. ככל שהדור חדש יותר — היכולות עשירות יותר וההתקנה פשוטה יותר.",
      consultantHe:
        "ציר-הזמן: EWM הופיע ב-SCM 5.0 (2005) כחלק מ-SCE, התפתח דרך 7.0 (NetWeaver) ועד 9.x. עם S/4HANA 1610 הוצג embedded EWM (אותו מק\"ט/לקוח כמו ה-ERP, אך לוגיקה נפרדת), ובמקביל decentralized EWM on S/4HANA כמערכת עצמאית המוזנת מ-ERP/S4 כלשהו. ההבחנה הקריטית: Basic vs Advanced EWM ב-S/4 (רישוי), והמעבר מ-CIF-מבוסס (בעולם SCM) ל-DRF/qRFC ב-embedded. נתיב-המעבר מ-LE-WM/SCM-EWM ל-S/4 EWM הוא פרויקט-המרה (migration), לא שדרוג-בלבד.",
      purposeHe:
        "המטרה של הבנת-האבולוציה: לבחור את דור-הפריסה הנכון לארגון, להעריך מאמץ-המרה מ-WM/SCM-EWM ל-S/4, ולהבין אילו פיצ'רים זמינים באיזו גרסה (למשל MFS, advanced production integration).",
      processExampleHe:
        "ארגון על ECC + SCM EWM 9.5 שעובר ל-S/4HANA: צוות-הפרויקט מחליט בין embedded EWM (פשטות, מערכת אחת) ל-decentralized EWM on S/4 (ביצועים, ניתוק-תחזוקה). ההחלטה מכתיבה אסטרטגיית-המרה, mapping מחדש של Warehouse Numbers, והעברת master data.",
      scenarioHe:
        "בארגון: מחסן-משקאות קטן בסניף ⟵ embedded EWM (פשוט, מערכת אחת); מרכז-הפצה ארצי אוטומטי עם נפח-תנועות עצום ⟵ decentralized EWM כדי לבודד עומס ולאפשר חלונות-תחזוקה נפרדים מה-S/4 הפיננסי.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Warehouse Number Control",
        "SAP S/4HANA ► IMG ► SCM Extended Warehouse Management ► Master Data",
      ],
      tables: ["/SCWM/T300", "/SCWM/T300_MD", "/SCWM/TMAPLGN"],
      tcodes: ["/SCWM/MON", "SPRO", "/SCWM/VALID_LGN"],
      fiori: ["F2148"],
      configHe: [
        "Warehouse Number mapping (/SCWM/TMAPLGN): קישור EWM Warehouse Number ל-ERP Plant/SLoc — שונה בין SCM-EWM ל-S/4 embedded.",
        "Basic vs Advanced EWM: רישוי ב-S/4 הקובע אילו פיצ'רים (MFS, Labor, Yard, slotting) זמינים.",
        "נתיב-המרה: SCM/LE-WM ➔ S/4 EWM נדרשת Conversion (לא רק upgrade).",
      ],
      flow: [
        { he: "SCM 5.0 — תוסף נפרד", note: "SCE add-on" },
        { he: "SCM 7.0–9.5 — בשלות NetWeaver" },
        { he: "S/4 1610 — embedded EWM" },
        { he: "decentralized EWM on S/4" },
        { he: "Cloud-based EWM" },
      ],
      mistakesHe: [
        "הנחה ש-S/4 embedded EWM = SCM EWM ישן עם אותה קונפיגורציה — חלקים שונים מהותית.",
        "תכנון 'upgrade' במקום 'conversion/migration' במעבר מ-LE-WM.",
        "אי-בדיקת רישוי Basic vs Advanced — פיצ'ר מתוכנן מתגלה כלא-זמין.",
      ],
      troubleshootHe: [
        "פיצ'ר (MFS/Labor) לא זמין ➔ רישוי Basic EWM במקום Advanced.",
        "אחרי conversion — Warehouse Number לא מגיב ➔ mapping ב-/SCWM/TMAPLGN לא הוגדר.",
      ],
      bestPracticeHe: [
        "מפה את הגרסה הנוכחית ואת היעד לפני תכנון-מעבר.",
        "החלט embedded מול decentralized על-בסיס נפח, אוטומציה וחלונות-תחזוקה.",
        "תעד אילו פיצ'רים דורשים Advanced EWM.",
      ],
      interviewHe: [
        { qHe: "מהן תחנות-המפתח באבולוציה של EWM?", aHe: "תוסף SCM 5.0 ➔ בשלות SCM 7.0–9.5 ➔ embedded EWM ב-S/4HANA 1610 ➔ decentralized EWM on S/4 ➔ cloud-based EWM." },
        { qHe: "מה ההבדל בין Basic ל-Advanced EWM ב-S/4?", aHe: "סוגיית-רישוי: Basic מספק תהליכי-מחסן ליבה; Advanced פותח MFS, Labor Management, Yard, slotting, VAS ועוד — נדרש לתרחישים מורכבים." },
      ],
      takeawaysHe: [
        "EWM התפתח מתוסף-SCM נפרד ל-embedded/decentralized בתוך S/4HANA ולענן.",
        "המעבר מ-LE-WM/SCM-EWM ל-S/4 הוא המרה, לא שדרוג.",
        "רישוי Basic מול Advanced קובע אילו פיצ'רים זמינים.",
      ],
      relatedHe: [
        { labelHe: "EWM · אפשרויות פריסה (1.3)", href: "/library/wm-academy/chapter-01/#sub-1.3" },
      ],
      children: [
        {
          id: "1.2.1",
          titleHe: "SAP EWM עם S/4HANA שאינו-SAP (5.0 עד 9.5)",
          titleEn: "SAP EWM with Non-SAP S/4HANA (5.0 to 9.5)",
          execHe:
            "בדורות 5.0–9.5, EWM רץ כרכיב של SAP SCM/SCE על NetWeaver, ויכול היה לשרת מערכות-ERP שונות — כולל ERP שאינו S/4HANA או אפילו לא-SAP — דרך שכבת-אינטגרציה (CIF / IDoc / BAPI). זהו דור 'EWM כמערכת-לוויין נפרדת'.",
          beginnerHe:
            "בגרסאות הישנות EWM היה תמיד מערכת נפרדת. הוא לא היה חייב להתחבר דווקא ל-SAP החדש — אפשר היה לחבר אותו ל-ERP ישן או אפילו למערכת לא-SAP, באמצעות 'גשרי-נתונים' (IDoc/BAPI/CIF).",
          consultantHe:
            "EWM 5.0–9.5 מבוסס SCM Basis. החיבור ל-ERP נעשה דרך CIF (Core Interface) להעברת master data ו-queued RFC/IDoc לתנועות. כאשר ה-ERP אינו SAP, האינטגרציה נשענת על IDoc (DELVRY03/SHPMNT) ו-BAPIs במקום CIF המלא, עם middleware (PI/PO) למיפוי. נדרשת הקפדה על mapping של Plant/StorageLocation ל-Warehouse Number ועל סנכרון-מלאי דו-כיווני.",
          purposeHe:
            "לאפשר לארגונים להריץ EWM מתקדם גם כשה-ERP שלהם ישן או זר, בלי להמתין למעבר S/4 — תוך שמירה על מנוע-מחסן עשיר.",
          processExampleHe:
            "ERP לא-SAP שולח ASN כ-IDoc ➔ middleware ממפה ל-Inbound Delivery של EWM ➔ EWM מבצע putaway ➔ Goods Receipt מוחזר כ-IDoc חוזר לעדכון מלאי ב-ERP הזר.",
          scenarioHe:
            "תרחיש היסטורי בארגון: מחסן שהורץ על SCM-EWM 9.x מול ECC, עם CIF להעברת חומרי-אריזה ומשקאות; כיום נשקל מעבר ל-embedded EWM ב-S/4.",
          navHe: [
            "SCM ► Advanced Planning and Optimization ► Master Data ► Core Interface (CIF)",
            "SCM Extended Warehouse Management ► Interfaces ► ERP Integration",
          ],
          tables: ["/SCWM/T300", "TRFCQOUT", "EDIDC"],
          tcodes: ["CFM1", "CFM2", "SMQ1", "WE02"],
          fiori: [],
          configHe: [
            "CIF Integration Models (CFM1/CFM2): הגדרת אילו master data ותנועות עוברים ל-EWM.",
            "ERP-זר: אינטגרציית IDoc (DELVRY03) + middleware (PI/PO) במקום CIF מלא.",
            "qRFC queues: ערוץ העברת-התנועות; ניטור ב-SMQ1/SMQ2.",
          ],
          mistakesHe: [
            "הנחה שכל יכולות-CIF זמינות מול ERP לא-SAP — חלקן דורשות IDoc/middleware.",
            "אי-ניטור qRFC queues — תנועות תקועות גורמות לפער-מלאי.",
          ],
          troubleshootHe: [
            "master data לא מגיע ➔ Integration Model לא Active (CFM2).",
            "ASN לא נקלט ➔ בדוק IDoc status (WE02) ו-mapping ב-middleware.",
          ],
          bestPracticeHe: [
            "תעד את גבול-האחריות בין EWM ל-ERP-הזר (מי בעל-המלאי).",
            "הקם ניטור-יזום ל-qRFC ול-IDoc.",
          ],
          interviewHe: [
            { qHe: "כיצד EWM 9.x מתחבר ל-ERP לא-SAP?", aHe: "דרך IDoc (DELVRY03/SHPMNT) ו-BAPIs עם middleware (PI/PO) למיפוי, במקום CIF המלא הזמין מול SAP ERP." },
            { qHe: "מהו CIF בהקשר EWM?", aHe: "Core Interface — מנגנון SCM להעברת master data ותנועות מ-SAP ERP ל-EWM, מנוהל דרך Integration Models (CFM1/CFM2)." },
          ],
          takeawaysHe: [
            "בדורות 5.0–9.5 EWM הוא מערכת-SCM נפרדת.",
            "חיבור ל-SAP ERP דרך CIF; ל-ERP זר דרך IDoc/BAPI + middleware.",
            "ניטור qRFC/IDoc קריטי למניעת פערי-מלאי.",
          ],
        },
        {
          id: "1.2.2",
          titleHe: "Embedded EWM ו-Decentralized EWM",
          titleEn: "Embedded EWM and Decentralized EWM",
          execHe:
            "ב-S/4HANA קיימים שני דגמי-פריסה לוגיים: embedded EWM — רץ בתוך אותה מערכת S/4 כמו ה-ERP, ללא CIF, עם אינטגרציה פנימית מהירה; ו-decentralized EWM — מערכת S/4 ייעודית למחסן בלבד, המחוברת ל-ERP/S4 מרכזי. הבחירה היא החלטת-אדריכלות מרכזית.",
          beginnerHe:
            "embedded = EWM 'חי בתוך' ה-S/4 שלך — מערכת אחת, פשוט. decentralized = EWM הוא מחשב נפרד שמתמחה רק במחסן, ומדבר עם ה-S/4 הראשי. הראשון פשוט יותר; השני חזק יותר למחסנים ענקיים.",
          consultantHe:
            "embedded EWM: אין CIF — האינטגרציה דרך internal queues; master data משותף; mapping Warehouse Number ⟵ Plant/SLoc. יתרון: latency נמוך, פשטות, מערכת אחת. חיסרון: כל עומס-המחסן על אותו DB כמו הפיננסי, חלונות-תחזוקה משותפים. decentralized EWM: מערכת S/4 נפרדת המוזנת מ-ERP/S4 דרך qRFC ו-DRF (Data Replication Framework); מבודד ביצועים, מאפשר ריבוי-ERP, אך מוסיף תחזוקת-אינטגרציה. ההחלטה לפי נפח-תנועות, אוטומציה (MFS), ו-SLA.",
          purposeHe:
            "לאזן בין פשטות-תפעול (embedded) ובידוד-ביצועים/גמישות (decentralized) בהתאם לגודל ולמורכבות המחסן.",
          processExampleHe:
            "ב-embedded: Outbound Delivery נוצרת ב-SD, נראית מיד ל-EWM באותה מערכת, EWM מבצע ליקוט ומאשר Goods Issue פנימית. ב-decentralized: ה-Delivery משוכפלת דרך qRFC למערכת-EWM הנפרדת, וה-GI מוחזר ל-S/4 המרכזי.",
          scenarioHe:
            "בארגון: מחסן-סניף ⟵ embedded (פשטות); מרכז-הפצה ארצי עם מסועים ו-AS/RS ⟵ decentralized EWM כדי לבודד עומס-Peak (חגים/קיץ) מה-S/4 הפיננסי.",
          navHe: [
            "IMG ► SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Warehouse Number Control",
            "IMG ► Integration with Other SAP Components ► EWM Integration",
          ],
          tables: ["/SCWM/TMAPLGN", "/SCWM/T300", "DRFD_OUTB_LOG"],
          tcodes: ["/SCWM/MON", "DRFOUT", "SMQ1"],
          fiori: ["F2148"],
          configHe: [
            "embedded: ללא CIF; Warehouse Number mapping ל-Plant/SLoc באותה מערכת.",
            "decentralized: DRF (Data Replication Framework) להעברת master data; qRFC לתנועות.",
            "החלטה לפי נפח, MFS/אוטומציה, SLA וחלונות-תחזוקה.",
          ],
          flow: [
            { he: "בחירת דגם-פריסה", note: "embedded / decentralized" },
            { he: "embedded — internal queues", code: "אותה מערכת" },
            { he: "decentralized — DRF + qRFC", code: "DRFOUT" },
            { he: "mapping Warehouse Number", code: "/SCWM/TMAPLGN" },
          ],
          mistakesHe: [
            "בחירת embedded למחסן-ענק אוטומטי ➔ עומס על ה-S/4 הפיננסי.",
            "בחירת decentralized למחסן-קטן ➔ תקורת-אינטגרציה מיותרת.",
          ],
          troubleshootHe: [
            "decentralized — master data חסר ➔ DRF replication נכשל (DRFOUT/SMQ1).",
            "embedded — Delivery לא נראה ל-EWM ➔ internal mapping/queue תקול.",
          ],
          bestPracticeHe: [
            "החלט מוקדם; ההחלטה משפיעה על כל הארכיטקטורה.",
            "decentralized כש: נפח גבוה, אוטומציה כבדה, או ריבוי-ERP.",
            "embedded כש: מחסן פשוט, מערכת אחת, TCO נמוך.",
          ],
          interviewHe: [
            { qHe: "מתי תבחר decentralized על-פני embedded EWM?", aHe: "בנפח-תנועות גבוה, אוטומציה כבדה (MFS/AS-RS), צורך לבודד ביצועים מה-S/4 הפיננסי, חלונות-תחזוקה נפרדים, או חיבור למספר מערכות-ERP." },
            { qHe: "במה שונה האינטגרציה בין embedded ל-decentralized?", aHe: "embedded משתמש ב-internal queues ללא CIF; decentralized משכפל נתונים דרך DRF ומעביר תנועות ב-qRFC בין שתי מערכות." },
          ],
          takeawaysHe: [
            "embedded = מערכת אחת, פשטות, latency נמוך.",
            "decentralized = מערכת נפרדת, בידוד-ביצועים, גמישות.",
            "embedded ללא CIF; decentralized משתמש ב-DRF + qRFC.",
          ],
          relatedHe: [
            { labelHe: "EWM · העברות נתונים (1.4)", href: "/library/wm-academy/chapter-01/#sub-1.4" },
          ],
        },
        {
          id: "1.2.3",
          titleHe: "EWM מבוסס-ענן",
          titleEn: "Cloud-Based SAP EWM",
          execHe:
            "SAP מציעה את EWM גם בתצורת-ענן — כחלק מ-S/4HANA Cloud (public/private edition) — המספקת יכולות-מחסן ליבה כשירות מנוהל, עם עדכוני-גרסה תכופים ומודל-רישוי מנוי. מתאים לארגונים המעדיפים OPEX ותחזוקה מינימלית.",
          beginnerHe:
            "במקום להתקין ולתחזק שרתים, מקבלים את EWM 'כשירות' באינטרנט — SAP מנהלת את התשתית והעדכונים, והארגון משלם מנוי. נוח, אך פחות גמיש להתאמות-עומק.",
          consultantHe:
            "ב-S/4HANA Cloud (public edition) EWM זמין כ-embedded עם scope items מוגדרים-מראש (best-practice content) ו-extensibility מוגבל (in-app / side-by-side ב-BTP). private edition מאפשר יותר התאמה. מגבלות: לא כל פיצ'ר Advanced/MFS זמין בכל edition, ושינויי-קוד מוגבלים. עדכונים תכופים מחייבים regression-testing על תהליכי-מחסן.",
          purposeHe:
            "להוריד TCO ותקורת-תפעול, לקצר time-to-value עם best-practice content, ולקבל עדכונים שוטפים — במחיר גמישות-התאמה מופחתת.",
          processExampleHe:
            "ארגון חדש מאמץ S/4HANA Cloud public: מפעיל scope item של EWM, מגדיר Warehouse Number ו-bins דרך Fiori, ומתחיל תהליכי-מחסן ליבה תוך ימים — ללא התקנת-תשתית.",
          scenarioHe:
            "בארגון: מחסן-משנה קטן או יחידה חדשה יכולים לרוץ על EWM בענן (best-practice) במהירות; מרכז-ההפצה האוטומטי הראשי נשאר on-premise/private בשל צורכי-MFS והתאמות.",
          navHe: [
            "SAP S/4HANA Cloud ► Manage Your Solution ► Configure Your Solution ► Extended Warehouse Management",
            "SAP Central Business Configuration ► Scoping ► Warehouse Management",
          ],
          tables: ["/SCWM/T300", "/SCWM/LAGP"],
          tcodes: [],
          fiori: ["F2148", "W0001", "F4022"],
          configHe: [
            "Scope items מוגדרים-מראש (best-practice) מפעילים תהליכי-EWM ליבה.",
            "Extensibility: in-app (Fiori/Key User) + side-by-side ב-SAP BTP; אין שינוי-קוד חופשי.",
            "מגבלת-פיצ'רים: לא כל Advanced/MFS זמין בכל edition — בדוק scope.",
          ],
          mistakesHe: [
            "הנחה שכל פיצ'ר on-premise זמין בענן — חלקם מוגבלים/לא-נתמכים.",
            "תכנון התאמות-עומק (Z-code) בענן public — בלתי-אפשרי; נדרש side-by-side.",
          ],
          troubleshootHe: [
            "פיצ'ר חסר ➔ אינו ב-scope של ה-edition; בדוק roadmap/scope items.",
            "התאמה נכשלת ➔ נדרש BTP side-by-side במקום in-app.",
          ],
          bestPracticeHe: [
            "אמץ best-practice content ככל-האפשר; מזער התאמות.",
            "בצע regression-testing אחרי כל עדכון-גרסה.",
            "השאר תרחישי-MFS מורכבים ב-private/on-premise בעת הצורך.",
          ],
          interviewHe: [
            { qHe: "מהן המגבלות העיקריות של EWM בענן public?", aHe: "extensibility מוגבל (in-app + side-by-side BTP, ללא Z-code חופשי), לא כל פיצ'ר Advanced/MFS זמין, ועדכונים תכופים המחייבים regression-testing." },
            { qHe: "מתי ענן מתאים ומתי on-premise/private?", aHe: "ענן public מתאים למחסנים סטנדרטיים עם best-practice ו-TCO נמוך; private/on-premise נדרש לאוטומציה כבדה (MFS) והתאמות-עומק." },
          ],
          takeawaysHe: [
            "EWM בענן = שירות מנוהל עם best-practice content ועדכונים שוטפים.",
            "extensibility מוגבל; חלק מ-Advanced/MFS אינו זמין בכל edition.",
            "מאזן TCO נמוך מול גמישות-התאמה מופחתת.",
          ],
        },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3",
      titleHe: "סביבת-המערכת ואפשרויות-הפריסה",
      titleEn: "System Environment and Deployment Options",
      execHe:
        "EWM נפרס במגוון סביבות: On-Premise (שליטה מלאה), Cloud (שירות מנוהל), על-גבי SAP NetWeaver (הדורות הישנים), ו-decentralized מול מערכות-ERP שאינן-SAP. כל אפשרות מאזנת אחרת בין שליטה, גמישות, TCO ומורכבות-אינטגרציה.",
      beginnerHe:
        "איפה ירוץ EWM? אפשרויות: על שרתים שלך (On-Premise), בענן של SAP (Cloud), על-גבי תשתית NetWeaver הישנה, או כמערכת נפרדת המחוברת ל-ERP — אפילו ERP שאינו של SAP. כל בחירה משפיעה על עלות, שליטה וקלות-תחזוקה.",
      consultantHe:
        "ארבע משפחות-פריסה: (1) On-Premise — embedded או decentralized ב-S/4 בבעלות-הלקוח; (2) Cloud — S/4HANA Cloud; (3) NetWeaver — SCM EWM 7.0–9.x ההיסטורי; (4) decentralized מול non-SAP ERP. הבחירה משפיעה על מודל-האינטגרציה (CIF/DRF/qRFC/IDoc), על נתיב-העדכון ועל extensibility. שיקולי-מפתח: ביצועים, רגולציה/דאטה-רזידנסי, אוטומציה (MFS), ו-TCO.",
      purposeHe:
        "להתאים את ארכיטקטורת-EWM לאילוצי-הארגון: שליטה ובקרה (On-Premise), זריזות ו-TCO (Cloud), המשכיות-מורשת (NetWeaver), או אינטגרציה הטרוגנית (non-SAP).",
      processExampleHe:
        "צוות-אדריכלות ממפה: מחסן רגולטורי עם דרישות-דאטה-רזידנסי ➔ On-Premise/private; יחידה חדשה ➔ Cloud; מחסן מורשת ➔ נשאר NetWeaver עד המרה; אתר עם ERP זר ➔ decentralized EWM.",
      scenarioHe:
        "בארגון: ה-S/4 הראשי On-Premise/private; מרכז-הפצה אוטומטי כ-decentralized EWM; שיקול דאטה-רזידנסי בישראל מטה לטובת private/On-Premise במקום public-cloud.",
      navHe: [
        "IMG ► SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data",
        "SAP S/4HANA Cloud ► Configure Your Solution ► Extended Warehouse Management",
      ],
      tables: ["/SCWM/T300", "/SCWM/TMAPLGN"],
      tcodes: ["SPRO", "/SCWM/MON"],
      fiori: ["F2148"],
      configHe: [
        "On-Premise: בחירת embedded מול decentralized; שליטה מלאה ב-extensibility.",
        "Cloud: scope items + extensibility מוגבל.",
        "NetWeaver: SCM EWM ההיסטורי, CIF-מבוסס.",
        "non-SAP: decentralized EWM עם IDoc/BAPI + middleware.",
      ],
      flow: [
        { he: "מיפוי אילוצי-ארגון", note: "TCO/רגולציה/אוטומציה" },
        { he: "בחירת משפחת-פריסה", code: "On-Prem / Cloud / NW / non-SAP" },
        { he: "קביעת מודל-אינטגרציה", code: "CIF/DRF/qRFC/IDoc" },
        { he: "תכנון נתיב-עדכון/המרה" },
      ],
      mistakesHe: [
        "בחירת-פריסה ללא מיפוי רגולציה/דאטה-רזידנסי.",
        "התעלמות מצורכי-MFS/אוטומציה בבחירת Cloud public.",
      ],
      troubleshootHe: [
        "ביצועים ירודים ➔ פריסת-embedded למחסן-ענק; שקול decentralized.",
        "אינטגרציה הטרוגנית כושלת ➔ middleware/IDoc mapping לא תקין.",
      ],
      bestPracticeHe: [
        "התחל מאילוצי-העסק (רגולציה, נפח, TCO) ורק אז בחר פריסה.",
        "תעד את מודל-האינטגרציה לכל אתר.",
      ],
      interviewHe: [
        { qHe: "אילו משפחות-פריסה קיימות ל-EWM?", aHe: "On-Premise (embedded/decentralized), Cloud (S/4HANA Cloud), NetWeaver (SCM EWM היסטורי), ו-decentralized מול ERP שאינו-SAP." },
        { qHe: "אילו שיקולים מכריעים בבחירת-פריסה?", aHe: "ביצועים ונפח, רגולציה ודאטה-רזידנסי, צורכי-אוטומציה (MFS), extensibility, ו-TCO." },
      ],
      takeawaysHe: [
        "ארבע משפחות-פריסה, כל אחת עם איזון שונה.",
        "הפריסה קובעת את מודל-האינטגרציה ונתיב-העדכון.",
        "בחר לפי אילוצי-עסק, לא לפי טכנולוגיה.",
      ],
      relatedHe: [
        { labelHe: "EWM · embedded ו-decentralized (1.2.2)", href: "/library/wm-academy/chapter-01/#sub-1.2.2" },
      ],
      children: [
        {
          id: "1.3.1",
          titleHe: "On-Premise",
          titleEn: "On-Premise",
          execHe:
            "פריסת On-Premise מריצה את EWM (embedded או decentralized) על תשתית בבעלות/ניהול הלקוח. היא מספקת שליטה מלאה על גרסאות, extensibility (כולל קוד-Z), ושילוב-אוטומציה — תמורת אחריות-תחזוקה ו-TCO גבוה יותר.",
          beginnerHe:
            "EWM רץ על השרתים של הארגון (או בדאטה-סנטר שלו). הארגון שולט בכל — מתי לעדכן, מה להתאים — אבל גם אחראי לתחזק, לגבות ולאבטח.",
          consultantHe:
            "On-Premise תומך גם ב-embedded וגם ב-decentralized. יתרון: extensibility מלא (BAdIs, enhancements, Z-tables), שליטה בגרסה ובחלונות-תחזוקה, ואינטגרציית-MFS עמוקה למסועים/AS-RS. אינטגרציה: embedded ⟵ internal queues; decentralized ⟵ DRF + qRFC. חיסרון: תקורת-Basis, חומרה, ו-upgrade עצמאי.",
          purposeHe:
            "מתאים לארגונים עם מחסנים מורכבים/אוטומטיים, דרישות-רגולציה מחמירות, או צורך בהתאמות-עומק שאינן אפשריות בענן.",
          processExampleHe:
            "מרכז-הפצה אוטומטי On-Premise: MFS שולט במסועים ו-AS/RS בזמן-אמת; צוות-Basis מנהל גרסאות וחלונות-תחזוקה לפי לוח עונתי.",
          scenarioHe:
            "בארגון מרכז-ההפצה הראשי רץ On-Premise/private עם MFS לקווי-המסוע ול-AS/RS של המשטחים — שליטה מלאה נדרשת בשל האוטומציה.",
          navHe: [
            "IMG ► SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Warehouse Number Control",
            "IMG ► SCM Extended Warehouse Management ► Interfaces ► ERP Integration",
          ],
          tables: ["/SCWM/T300", "/SCWM/TMAPLGN", "/SCWM/MFS_*"],
          tcodes: ["SPRO", "/SCWM/MON", "/SCWM/PLC"],
          fiori: ["F2148"],
          configHe: [
            "בחירת embedded מול decentralized בתוך הסביבה הבבעלות.",
            "extensibility מלא: BAdIs, enhancements, Z-objects.",
            "MFS configuration למסועים/PLC (Advanced EWM).",
          ],
          mistakesHe: [
            "התעלמות מתקורת-Basis ו-upgrade בתכנון-TCO.",
            "הזנחת אבטחה/גיבוי באחריות-עצמית.",
          ],
          troubleshootHe: [
            "MFS לא מגיב ➔ PLC/telegram mapping תקול (/SCWM/PLC).",
            "decentralized — נתונים חסרים ➔ DRF/qRFC.",
          ],
          bestPracticeHe: [
            "נצל extensibility באחריות — מזער שינויי-ליבה.",
            "תכנן חלונות-תחזוקה עונתיים סביב Peak.",
          ],
          interviewHe: [
            { qHe: "מהם היתרונות העיקריים של פריסת On-Premise?", aHe: "שליטה מלאה בגרסאות ובחלונות-תחזוקה, extensibility מלא (BAdIs/Z-code), ואינטגרציית-MFS עמוקה לאוטומציה." },
          ],
          takeawaysHe: [
            "On-Premise = שליטה מלאה + extensibility מלא, תמורת TCO ותחזוקה.",
            "תומך embedded ו-decentralized כאחד.",
            "הבחירה הטבעית למחסנים אוטומטיים עם MFS.",
          ],
        },
        {
          id: "1.3.2",
          titleHe: "פריסת-ענן",
          titleEn: "Cloud Deployment",
          execHe:
            "פריסת-ענן מספקת EWM כשירות מנוהל ב-S/4HANA Cloud (public/private), עם best-practice content, עדכונים שוטפים ו-TCO נמוך — תמורת extensibility מוגבל וזמינות-פיצ'רים תלוית-edition.",
          beginnerHe:
            "SAP מריצה ומתחזקת את EWM בענן; הארגון מגדיר ומשתמש דרך Fiori. פחות תחזוקה, מהיר להתחלה, אך פחות חופש להתאמות-עומק.",
          consultantHe:
            "public edition: embedded EWM עם scope items, in-app extensibility ו-side-by-side ב-BTP; חלק מ-Advanced/MFS לא זמין. private edition: יותר התאמה (קרוב ל-On-Premise) בענן מנוהל. עדכונים תכופים מחייבים regression-testing. דאטה-רזידנסי תלוי-region.",
          purposeHe:
            "time-to-value מהיר, TCO נמוך, ותחזוקה מינימלית — למחסנים סטנדרטיים שאינם דורשים התאמות-עומק.",
          processExampleHe:
            "יחידה חדשה מפעילה scope item של EWM ב-S/4HANA Cloud, מגדירה Warehouse Number ו-bins דרך Fiori, ומתחילה תהליכי-ליבה תוך ימים.",
          scenarioHe:
            "בארגון: מחסן-משנה/יחידה חדשה על ענן (best-practice) להפעלה מהירה; הליבה האוטומטית נשארת private/On-Premise.",
          navHe: [
            "SAP S/4HANA Cloud ► Configure Your Solution ► Extended Warehouse Management",
            "SAP Central Business Configuration ► Scoping",
          ],
          tables: ["/SCWM/T300", "/SCWM/LAGP"],
          tcodes: [],
          fiori: ["F2148", "W0001", "F4022"],
          configHe: [
            "scope items מפעילים תהליכי-ליבה.",
            "extensibility: in-app + side-by-side BTP.",
            "זמינות-פיצ'רים תלוית-edition (public/private).",
          ],
          mistakesHe: [
            "תכנון פיצ'ר Advanced/MFS שאינו ב-scope.",
            "ציפייה ל-Z-code בענן public.",
          ],
          troubleshootHe: [
            "פיצ'ר חסר ➔ מחוץ ל-scope; שקול private edition.",
            "התאמה נכשלת ➔ נדרש side-by-side BTP.",
          ],
          bestPracticeHe: [
            "אמץ best-practice ומזער התאמות.",
            "regression-test אחרי כל עדכון.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין public ל-private edition לעניין EWM?", aHe: "public = embedded עם scope items ו-extensibility מוגבל, חלק מ-Advanced/MFS לא זמין; private = קרוב ל-On-Premise בענן מנוהל, עם יותר התאמה." },
          ],
          takeawaysHe: [
            "ענן = שירות מנוהל, best-practice, עדכונים שוטפים.",
            "extensibility מוגבל; פיצ'רים תלויי-edition.",
            "מהיר ל-time-to-value, TCO נמוך.",
          ],
          relatedHe: [
            { labelHe: "EWM · EWM מבוסס-ענן (1.2.3)", href: "/library/wm-academy/chapter-01/#sub-1.2.3" },
          ],
        },
        {
          id: "1.3.3",
          titleHe: "פריסות SAP NetWeaver",
          titleEn: "SAP NetWeaver Deployments",
          execHe:
            "הדורות ההיסטוריים של EWM (SCM EWM 7.0–9.x) רצו על-גבי שכבת-היישום SAP NetWeaver כרכיב של SAP SCM. פריסות אלו עדיין בשטח אצל ארגונים שטרם המירו ל-S/4, ומחייבות הבנה של ארכיטקטורת-NetWeaver וה-CIF.",
          beginnerHe:
            "לפני S/4HANA, EWM רץ על תשתית-התוכנה של SAP בשם NetWeaver, כחלק מחבילת-SCM. הרבה ארגונים עדיין שם, ומתכננים מתישהו לעבור.",
          consultantHe:
            "SCM EWM on NetWeaver: שכבת-יישום ABAP מסורתית (לא HANA-optimized בהכרח), אינטגרציה דרך CIF + qRFC/IDoc, ו-extensibility מלא. המעבר ל-S/4 EWM הוא conversion (לא upgrade): מיפוי-מחדש של Warehouse Numbers, העברת master/transaction data, והתאמת קוד-Z. תמיכה (maintenance) של גרסאות NetWeaver מוגבלת-בזמן — יש לבדוק SAP Note ולוח-תמיכה.",
          purposeHe:
            "להבטיח המשכיות-מורשת לארגונים על NetWeaver עד למעבר מתוכנן, ולתכנן את ה-conversion ל-S/4 EWM נכון.",
          processExampleHe:
            "ארגון על SCM EWM 9.5 / NetWeaver מתכנן conversion ל-embedded EWM ב-S/4: ממפה Warehouse Numbers מחדש, מעביר bins ו-stock, ובודק קוד-Z להתאמה.",
          scenarioHe:
            "תרחיש-מורשת בארגון: מחסן שרץ על SCM EWM/NetWeaver מול ECC; תכנית-המעבר ל-S/4 כוללת conversion ולא שדרוג-בלבד.",
          navHe: [
            "SCM ► Master Data ► Core Interface (CIF)",
            "SCM Extended Warehouse Management ► Interfaces ► ERP Integration",
          ],
          tables: ["/SCWM/T300", "TRFCQOUT", "EDIDC"],
          tcodes: ["CFM1", "CFM2", "SMQ1", "WE02"],
          fiori: [],
          configHe: [
            "ארכיטקטורת-NetWeaver: שכבת-יישום ABAP, CIF-מבוסס.",
            "Integration Models (CFM1/CFM2) ל-master data ותנועות.",
            "תכנון conversion ל-S/4 (לא upgrade) עם מיפוי-מחדש.",
          ],
          mistakesHe: [
            "תכנון 'upgrade' במקום 'conversion' ל-S/4.",
            "התעלמות מלוח תום-תמיכה של גרסת-NetWeaver.",
          ],
          troubleshootHe: [
            "תנועות תקועות ➔ qRFC queues (SMQ1).",
            "master data חסר ➔ Integration Model לא Active (CFM2).",
          ],
          bestPracticeHe: [
            "בדוק SAP Note + לוח-תמיכה לגרסת-NetWeaver.",
            "תכנן conversion מוקדם — מיפוי, נתונים, קוד-Z.",
          ],
          interviewHe: [
            { qHe: "מדוע המעבר מ-SCM EWM/NetWeaver ל-S/4 הוא conversion ולא upgrade?", aHe: "כי הארכיטקטורה ומודל-האינטגרציה שונים: נדרש מיפוי-מחדש של Warehouse Numbers, העברת master/transaction data, והתאמת קוד-Z — לא רק עדכון-גרסה." },
          ],
          takeawaysHe: [
            "SCM EWM 7.0–9.x רץ על NetWeaver, CIF-מבוסס.",
            "המעבר ל-S/4 EWM הוא conversion, לא upgrade.",
            "בדוק תום-תמיכה ותכנן מעבר מוקדם.",
          ],
        },
        {
          id: "1.3.4",
          titleHe: "מערכות-ERP שאינן-SAP עם Decentralized EWM",
          titleEn: "Non-SAP ERP Systems with Decentralized EWM",
          execHe:
            "decentralized EWM יכול לשרת גם מערכת-ERP שאינה של SAP. EWM מספק את מנוע-המחסן המתקדם, וה-ERP הזר מספק הזמנות, רכש ומלאי-כספי — האינטגרציה נשענת על IDoc/BAPI ו-middleware במקום CIF/DRF המלא.",
          beginnerHe:
            "גם אם ה-ERP של הארגון אינו של SAP, אפשר להשתמש ב-EWM המתקדם כמחסן נפרד. ה'גשר' בין השניים בנוי מהודעות-תקן (IDoc) ומתורגמן באמצע (middleware).",
          consultantHe:
            "EWM נפרד מחובר ל-non-SAP ERP דרך delivery-based integration: IDoc (DELVRY03) ו-BAPIs להזמנות/אספקות, עם PI/PO (או middleware אחר) למיפוי-פורמטים. בעלות-המלאי-הכספית נשארת ב-ERP הזר; EWM הוא system-of-record התפעולי של המחסן. אתגרים: סנכרון-מלאי דו-כיווני, mapping יחידות/אריזות, וטיפול-בשגיאות אסינכרוני (qRFC/IDoc).",
          purposeHe:
            "לאפשר אימוץ מנוע-המחסן המתקדם של SAP בלי להחליף ERP זר — שדרוג-מחסן ממוקד עם השקעה מינימלית בליבת-ה-ERP.",
          processExampleHe:
            "ERP זר שולח Sales Order/Delivery כ-IDoc ➔ middleware ממפה ל-Outbound Delivery של EWM ➔ EWM מבצע ליקוט ו-GI ➔ אישור-GI מוחזר כ-IDoc לעדכון מלאי וחשבונאות ב-ERP הזר.",
          scenarioHe:
            "תרחיש היפותטי בארגון: שותף-לוגיסטיקה (3PL) עם ERP זר מפעיל EWM כמחסן-מתקדם; אינטגרציית-IDoc מסנכרנת אספקות-משקאות ומלאי בין EWM ל-ERP של ה-3PL.",
          navHe: [
            "IMG ► SCM Extended Warehouse Management ► Interfaces ► ERP Integration ► IDoc/BAPI",
            "IMG ► SCM Extended Warehouse Management ► Goods Receipt/Issue",
          ],
          tables: ["EDIDC", "EDIDS", "TRFCQOUT", "/SCWM/T300"],
          tcodes: ["WE02", "WE19", "SMQ1", "BD87"],
          fiori: [],
          configHe: [
            "delivery-based integration: IDoc (DELVRY03) + BAPIs במקום CIF/DRF.",
            "middleware (PI/PO) למיפוי-פורמטים בין EWM ל-ERP הזר.",
            "הגדרת בעלות-מלאי: ERP זר = כספי, EWM = תפעולי.",
          ],
          flow: [
            { he: "ERP זר שולח Delivery", code: "IDoc DELVRY03" },
            { he: "middleware ממפה", code: "PI/PO" },
            { he: "EWM מבצע ליקוט/putaway", code: "/SCWM/MON" },
            { he: "GR/GI חוזר כ-IDoc", code: "BD87" },
          ],
          mistakesHe: [
            "הנחה שזמינה אינטגרציית-CIF מלאה — מול non-SAP נדרש IDoc/BAPI.",
            "הזנחת טיפול-שגיאות אסינכרוני (IDoc/qRFC) ➔ פערי-מלאי.",
          ],
          troubleshootHe: [
            "IDoc בשגיאה ➔ WE02/BD87 — בדוק mapping ו-status 51/64.",
            "מלאי לא מסונכרן ➔ הודעת-GI חוזרת תקועה.",
          ],
          bestPracticeHe: [
            "הגדר בעלות-מלאי וגבול-אחריות בבירור.",
            "בנה ניטור-יזום ל-IDoc ול-qRFC עם התראות.",
          ],
          interviewHe: [
            { qHe: "כיצד decentralized EWM מתחבר ל-ERP שאינו-SAP?", aHe: "דרך delivery-based integration: IDoc (DELVRY03) ו-BAPIs עם middleware (PI/PO) למיפוי, במקום CIF/DRF; בעלות-המלאי-הכספית נשארת ב-ERP הזר ו-EWM הוא ה-system-of-record התפעולי." },
            { qHe: "מהם האתגרים העיקריים באינטגרציה הטרוגנית כזו?", aHe: "סנכרון-מלאי דו-כיווני, mapping יחידות/אריזות, וטיפול-בשגיאות אסינכרוני (IDoc/qRFC) למניעת פערי-מלאי." },
          ],
          takeawaysHe: [
            "EWM נפרד יכול לשרת ERP שאינו-SAP.",
            "אינטגרציה דרך IDoc/BAPI + middleware, לא CIF/DRF.",
            "ERP זר = בעלות כספית; EWM = תפעול-המחסן.",
          ],
          relatedHe: [
            { labelHe: "EWM · העברות נתונים (1.4)", href: "/library/wm-academy/chapter-01/#sub-1.4" },
          ],
        },
      ],
    },
    // ============================================================ 1.4
    {
      id: "1.4",
      titleHe: "העברות-נתונים בין SAP ERP או SAP S/4HANA לבין SAP EWM",
      titleEn: "Data Transfers between SAP ERP or SAP S/4HANA and SAP EWM",
      execHe:
        "EWM אינו אי בודד — הוא נשען על זרימת-נתונים מתמדת מול ה-ERP/S4: master data (חומרים, ספקים, לקוחות, batch) ו-transaction data (הזמנות, אספקות, תנועות-טובין). הערוצים: CIF (SCM), DRF (decentralized S/4), internal queues (embedded), ו-IDoc/BAPI (non-SAP). ניהול-תקין של ערוצים אלו הוא תנאי-לתקינות-המלאי.",
      beginnerHe:
        "EWM צריך לדעת מה החומרים, מי הספקים, ואילו הזמנות יש — כל זה מגיע מה-ERP. ויש זרימה חזרה: כשמקבלים או מנפיקים טובין, EWM מודיע ל-ERP כדי שהמלאי והכספים יתעדכנו. אם 'הצינור' נסתם, המלאי בשתי המערכות מתפצל.",
      consultantHe:
        "סוגי-הזרימה: (1) master data — חומר (EWM product view), ספק/לקוח (Business Partner), batch, packaging spec; (2) delivery-based — Inbound/Outbound Delivery requests; (3) goods movements — GR/GI חוזר ל-ERP. ערוצים: embedded ⟵ internal/qRFC (ללא CIF); decentralized S/4 ⟵ DRF ל-master + qRFC ל-deliveries; SCM ⟵ CIF; non-SAP ⟵ IDoc/BAPI. נקודות-בקרה: SMQ1/SMQ2 (qRFC), DRFOUT/DRFLOG (DRF), WE02/BD87 (IDoc), ו-stock-comparison (/SCWM/ERP_STOCKCHECK). PPF מפעיל הודעות-יציאה.",
      purposeHe:
        "לשמור על מקור-אמת-יחיד למלאי בין EWM ל-ERP: כל תנועה במחסן משתקפת בערך-המלאי ובחשבונאות, וכל master data חדש זמין ל-EWM בזמן.",
      processExampleHe:
        "חומר חדש נפתח ב-ERP ➔ מועבר ל-EWM (DRF/CIF) כ-product עם EWM views ➔ Purchase Order ➔ Inbound Delivery זורמת ל-EWM (qRFC) ➔ putaway ➔ אישור-WT גוזר Goods Receipt חוזר ל-ERP (qRFC) ➔ מלאי וחשבונאות מתעדכנים.",
      scenarioHe:
        "בארגון: מק\"ט-משקה חדש נפתח ב-S/4, מועבר ל-EWM עם נתוני-אריזה (packaging spec) ו-batch (תוקף); אספקות-לקוח זורמות מ-SD ל-EWM, וה-Goods Issue חוזר לעדכון מלאי ומכר.",
      navHe: [
        "IMG ► Integration with Other SAP Components ► Extended Warehouse Management ► Goods Issue/Receipt",
        "IMG ► Data Replication Framework (DRF) ► Define Replication Models",
      ],
      tables: ["/SCWM/ORDIM_O", "TRFCQOUT", "TRFCQIN", "DRFD_OUTB_LOG", "EDIDC"],
      tcodes: ["SMQ1", "SMQ2", "DRFOUT", "BD87", "/SCWM/ERP_STOCKCHECK"],
      fiori: ["F2148"],
      configHe: [
        "Distribution/Replication Model: אילו master data מועברים (DRF) / Integration Models (CIF).",
        "qRFC queues: ערוץ ה-deliveries וה-GR/GI; ניטור SMQ1/SMQ2.",
        "PPF (Post Processing Framework): מפעיל הודעות-יציאה (למשל GR confirmation).",
        "stock-comparison: השוואת-מלאי תקופתית EWM↔ERP (/SCWM/ERP_STOCKCHECK).",
      ],
      flow: [
        { he: "master data ➔ EWM", code: "DRF / CIF", note: "product/BP/batch" },
        { he: "Delivery request ➔ EWM", code: "qRFC" },
        { he: "ביצוע במחסן", code: "/SCWM/MON" },
        { he: "GR/GI ➔ ERP", code: "qRFC", note: "PPF" },
        { he: "השוואת-מלאי", code: "/SCWM/ERP_STOCKCHECK" },
      ],
      masterDataHe: [
        "Product (EWM view), Business Partner (ספק/לקוח), Batch, Packaging Specification, Storage Bin.",
      ],
      mistakesHe: [
        "אי-ניטור qRFC/DRF — תנועות תקועות גורמות לפער-מלאי שקט.",
        "פתיחת-חומר ללא העברה ל-EWM ➔ Delivery נכשל.",
        "התעלמות מ-stock-comparison תקופתי.",
      ],
      troubleshootHe: [
        "Delivery לא מגיע ל-EWM ➔ qRFC (SMQ1/SMQ2) או Distribution/Replication Model.",
        "GR לא חוזר ל-ERP ➔ PPF action / queue יוצא תקוע.",
        "פער-מלאי EWM↔ERP ➔ הרץ /SCWM/ERP_STOCKCHECK ותקן queues.",
      ],
      bestPracticeHe: [
        "הקם ניטור-יזום ל-qRFC, DRF ו-IDoc עם התראות.",
        "הרץ stock-comparison תקופתי כבקרה.",
        "תעד אילו master data מועברים ובאיזה ערוץ.",
      ],
      interviewHe: [
        { qHe: "אילו ערוצי-נתונים מקשרים EWM ל-ERP/S4?", aHe: "embedded — internal/qRFC ללא CIF; decentralized S/4 — DRF ל-master + qRFC ל-deliveries; SCM — CIF; non-SAP — IDoc/BAPI עם middleware." },
        { qHe: "כיצד מאתרים ומתקנים פער-מלאי בין EWM ל-ERP?", aHe: "מריצים stock-comparison (/SCWM/ERP_STOCKCHECK), בודקים qRFC queues (SMQ1/SMQ2) ו-PPF actions תקועים, ומשחררים/מתקנים את ההודעות." },
        { qHe: "מהו תפקיד ה-PPF בהעברת-נתונים?", aHe: "Post Processing Framework מפעיל הודעות-יציאה מבוססות-תנאי (condition technique), למשל שליחת Goods Receipt confirmation חזרה ל-ERP." },
      ],
      takeawaysHe: [
        "EWM↔ERP מעבירים master data, deliveries ו-goods movements.",
        "ערוצים: internal/qRFC (embedded), DRF+qRFC (decentralized), CIF (SCM), IDoc/BAPI (non-SAP).",
        "ניטור queues + stock-comparison מונע פערי-מלאי.",
        "PPF מפעיל את הודעות-היציאה.",
      ],
      relatedHe: [
        { labelHe: "EWM · אינטגרציה עם מודולים אחרים (1.5)", href: "/library/wm-academy/chapter-01/#sub-1.5" },
        { labelHe: "MM · ניהול מלאי MM-IM", href: "/library/mm/chapter-04/" },
      ],
    },
    // ============================================================ 1.5
    {
      id: "1.5",
      titleHe: "אינטגרציה עם מודולים ותהליכים עסקיים אחרים ב-SAP",
      titleEn: "Integration with Other SAP Modules and Business Processes",
      execHe:
        "EWM אינו פועל בבדידות: הוא משתלב עם MM-IM (מלאי ורכש), SD/LE (משלוחים), PP/PP-PI (אספקת-רכיבים וקבלת-תוצר), QM (בקרת-איכות), ו-TM (תחבורה). כל אינטגרציה מרחיבה את שרשרת-הערך — מקבלת-טובין ועד משלוח-ללקוח, כולל production staging ו-quality inspection.",
      beginnerHe:
        "EWM הוא 'מנהל-המחסן', אבל המחסן משרת תהליכים אחרים: רכש מביא חומרים, ייצור צורך חומרים ומחזיר מוצרים, איכות בודקת, ומשלוחים יוצאים ללקוחות. EWM מדבר עם כל המודולים האלה כדי שהכול יזרום חלק.",
      consultantHe:
        "נקודות-אינטגרציה מרכזיות: MM-IM — GR/GI, stock types (unrestricted/quality/blocked); SD/LE — Outbound Delivery, picking, GI, ATP; PP/PP-PI — production material staging (לקו-ייצור) וקבלת-תוצר (production receipt) דרך manufacturing integration; QM — inspection lot ב-putaway/in-process עם quality stock; TM — תכנון-תחבורה, freight units ו-loading. ב-S/4 embedded האינטגרציה הדוקה (אותה מערכת); ב-decentralized דרך qRFC/DRF. Stock-type mapping בין EWM ל-MM-IM הוא נקודה רגישה.",
      purposeHe:
        "לחבר את המחסן לכל שרשרת-הערך הלוגיסטית, כך שתנועות-מחסן משקפות נכון רכש, ייצור, איכות ומשלוח — ללא ממשקים ידניים או פערים.",
      processExampleHe:
        "production staging: פק\"ע ב-PP דורשת רכיבים ➔ EWM מקבל בקשת-staging ➔ יוצר WT לליקוט הרכיבים ל-production supply area (PSA) ➔ הייצור צורך; בסיום, התוצר נקלט ל-EWM (production receipt) ומנותב ל-putaway.",
      scenarioHe:
        "בארגון: EWM מנהל staging של תרכיז/סוכר/אריזה לקו-המילוי (PP-PI), קולט את המשקאות המוגמרים מהקו (production receipt) עם batch ותוקף, מפנה דגימות ל-QM, ומשלח להזמנות-לקוח דרך SD/LE — והכול עם TM לתכנון-המשאיות.",
      navHe: [
        "IMG ► Integration with Other SAP Components ► Extended Warehouse Management",
        "IMG ► SCM EWM ► Extended Warehouse Management ► Goods Receipt Process / Goods Issue Process",
      ],
      tables: ["/SCWM/ORDIM_O", "/SCWM/AQUA", "QALS", "VBAK", "AUFK"],
      tcodes: ["/SCWM/MON", "/SCWM/PSASTAGE", "QA32", "VL10B"],
      fiori: ["F2148", "F0842", "F1990"],
      configHe: [
        "MM-IM: mapping של stock types (unrestricted/quality/blocked) בין EWM ל-IM.",
        "PP/PP-PI: Production Supply Area (PSA) ו-staging methods; production receipt.",
        "QM: הפעלת inspection ב-putaway/in-process ו-quality stock.",
        "SD/LE + TM: Outbound Delivery, picking/GI, freight units ו-loading.",
      ],
      flow: [
        { he: "רכש ➔ Inbound Delivery", code: "MM" },
        { he: "QM inspection (אופציונלי)", code: "QA32" },
        { he: "production staging ➔ PP", code: "/SCWM/PSASTAGE" },
        { he: "production receipt ➔ putaway", code: "PP-PI" },
        { he: "Outbound Delivery ➔ GI", code: "SD/LE" },
        { he: "תכנון-תחבורה", code: "TM" },
      ],
      masterDataHe: [
        "Production Supply Area (PSA) · Inspection Type/Lot (QM) · Freight Unit (TM) · stock-type mapping (MM-IM).",
      ],
      mistakesHe: [
        "stock-type mapping שגוי בין EWM ל-MM-IM ➔ מלאי בקטגוריה לא-נכונה.",
        "אי-הגדרת PSA ➔ staging לייצור נכשל.",
        "התעלמות מ-QM integration ➔ חומר-איכות נכנס ל-unrestricted.",
      ],
      troubleshootHe: [
        "staging לא מתבצע ➔ PSA/staging method חסר או WPT שגוי.",
        "inspection lot לא נוצר ➔ inspection type לא פעיל לחומר.",
        "Delivery לא נלקט ➔ ATP/stock removal strategy או WPT.",
      ],
      bestPracticeHe: [
        "תאם stock-type mapping בין EWM, MM-IM ו-QM מראש.",
        "הגדר PSA ו-staging methods לכל קו-ייצור.",
        "שלב TM כשיש תכנון-תחבורה מורכב.",
      ],
      interviewHe: [
        { qHe: "כיצד EWM משתלב עם PP/PP-PI?", aHe: "דרך production material staging — ליקוט רכיבים ל-Production Supply Area (PSA) לקו-הייצור, ו-production receipt — קליטת התוצר המוגמר ל-EWM וניתובו ל-putaway." },
        { qHe: "מהי נקודת-האינטגרציה הרגישה מול MM-IM?", aHe: "mapping של stock types (unrestricted/quality/blocked) בין EWM ל-IM — מיפוי שגוי משבץ מלאי בקטגוריה לא-נכונה." },
        { qHe: "כיצד QM נכנס לתהליך-EWM?", aHe: "דרך inspection lot ב-putaway או in-process, עם quality stock המופרד עד החלטת-שימוש (Usage Decision)." },
      ],
      takeawaysHe: [
        "EWM משתלב עם MM-IM, SD/LE, PP/PP-PI, QM ו-TM.",
        "production staging + production receipt מחברים ל-ייצור.",
        "stock-type mapping מול MM-IM הוא נקודה רגישה.",
        "embedded = אינטגרציה הדוקה; decentralized = qRFC/DRF.",
      ],
      relatedHe: [
        { labelHe: "PP-PI · אספקת-חומרים לקו-ייצור", href: "/library/pp/chapter-03/" },
        { labelHe: "QM · בקרת-איכות בקבלה", href: "/library/qm/chapter-02/" },
      ],
    },
    // ============================================================ 1.6
    {
      id: "1.6",
      titleHe: "אימוץ פתרונות EWM בתעשייה",
      titleEn: "Industry Adoption of EWM Solutions",
      execHe:
        "EWM אומץ רוחבית בתעשיות שונות — מזון-ומשקאות, פארמה, קמעונאות, רכב ולוגיסטיקה (3PL) — בזכות תמיכתו בתהליכים רגולטוריים (FEFO, batch, סריאליזציה), אוטומציה (MFS), ונפחי-תנועות גבוהים. ההבנה איזו תעשייה ממנפת אילו פיצ'רים מסייעת בעיצוב-הפתרון.",
      beginnerHe:
        "הרבה ענפים משתמשים ב-EWM, וכל אחד מדגיש משהו אחר: מזון/משקאות — תוקף ואצוות; פארמה — מעקב-קפדני וסריאליזציה; קמעונאות — נפח ומהירות; רכב — אספקה-לקו (JIT); 3PL — ניהול-מלאי-של-לקוחות-רבים.",
      consultantHe:
        "מיפוי תעשייה⟵פיצ'ר: מזון/משקאות — batch + FEFO + shelf-life + catch-weight; פארמה — serial numbers, GxP, סריאליזציה (track & trace); קמעונאות/e-commerce — wave + cross-docking + slotting לנפח; רכב — JIT/JIS, kitting, sequencing; 3PL — Stock Ownership + party entitled to dispose + billing (LSP). הבחירה embedded/decentralized ו-Advanced/Basic נגזרת לרוב מצורכי-התעשייה (MFS לאוטומציה, Labor Mgmt לנפח).",
      purposeHe:
        "ללמוד מתבניות-אימוץ מוכחות, להאיץ עיצוב-פתרון, ולהתאים את פיצ'רי-EWM לדרישות-הרגולציה והתפעול של הענף.",
      processExampleHe:
        "ב-e-commerce: גלי-ליקוט (waves) מקבצים מאות הזמנות קטנות, cross-docking מעביר פריטים מהיר מקבלה למשלוח, ו-slotting ממקם פריטים מהירי-תנועה קרוב לאזורי-הליקוט — להגדלת-תפוקה.",
      scenarioHe:
        "בארגון (מזון/משקאות): FEFO לפי תוקף-המשקה, batch management לאצוות-ייצור, catch-weight היכן רלוונטי, ו-shelf-life expiration להבטחת-טריות — תבנית-אימוץ קלאסית של תעשיית-המשקאות.",
      navHe: [
        "IMG ► SCM EWM ► Extended Warehouse Management ► Cross-Process Settings ► Batch Management / Serial Numbers",
        "IMG ► SCM EWM ► Goods Receipt Process ► Strategies (FEFO/Putaway)",
      ],
      tables: ["/SCWM/AQUA", "/SCWM/HUHDR", "/SCWM/SERIAL"],
      tcodes: ["/SCWM/MON", "/SCWM/WAVE", "/SCWM/SLOT"],
      fiori: ["F2148", "F4022"],
      configHe: [
        "מזון/משקאות: batch + FEFO + shelf-life + catch-weight.",
        "פארמה: serial numbers + GxP + track & trace.",
        "קמעונאות/e-commerce: wave + cross-docking + slotting.",
        "3PL: Stock Ownership + party entitled to dispose + LSP billing.",
      ],
      mistakesHe: [
        "אימוץ-פיצ'רים מתעשייה לא-רלוונטית — מורכבות מיותרת.",
        "התעלמות מדרישות-רגולציה ענפיות (FEFO/GxP/סריאליזציה).",
      ],
      troubleshootHe: [
        "FEFO לא נאכף ➔ shelf-life/batch לא פעיל או strategy שגויה.",
        "wave לא נוצר ➔ wave template/condition חסר.",
      ],
      bestPracticeHe: [
        "התחל מתבנית-אימוץ ענפית מוכחת.",
        "הפעל רק פיצ'רים שהענף באמת דורש.",
        "תאם רגולציה (מזון/פארמה) עם הקונפיגורציה.",
      ],
      interviewHe: [
        { qHe: "אילו פיצ'רי-EWM אופייניים לתעשיית מזון/משקאות?", aHe: "batch management, FEFO, shelf-life expiration ו-catch-weight — להבטחת-טריות, מעקב-אצווה וניהול-משקל." },
        { qHe: "במה שונה אימוץ-EWM ב-3PL?", aHe: "דגש על Stock Ownership ו-party entitled to dispose (ניהול מלאי בבעלות לקוחות-רבים) ועל LSP billing — שירות-מחסן כמודל-עסקי." },
      ],
      takeawaysHe: [
        "EWM מאומץ רוחבית; כל תעשייה ממנפת פיצ'רים אחרים.",
        "מזון/משקאות = batch/FEFO/shelf-life; פארמה = serial/GxP; e-commerce = wave/cross-dock/slotting; 3PL = Stock Ownership.",
        "התחל מתבנית-ענפית מוכחת ומזער מורכבות.",
      ],
      relatedHe: [
        { labelHe: "EWM · אינטגרציה (1.5)", href: "/library/wm-academy/chapter-01/#sub-1.5" },
      ],
    },
    // ============================================================ 1.7
    {
      id: "1.7",
      titleHe: "SAP Notes מהותיים בנושא אפשרויות-הפריסה",
      titleEn: "Significant SAP Notes on Deployment Options",
      execHe:
        "SAP מפרסמת SAP Notes (ו-KBAs) המגדירים רשמית את אפשרויות-הפריסה הנתמכות, מטריצות-תאימות, ומגבלות בין embedded, decentralized, Cloud ו-non-SAP. לפני כל החלטת-אדריכלות חובה לאמת מול ה-Note המעודכן — תמיכה וזמינות-פיצ'רים משתנות בין releases.",
      beginnerHe:
        "SAP Note הוא 'מסמך-תקנה' רשמי של SAP. לפני שמחליטים איך לפרוס EWM, קוראים את ה-Notes הרלוונטיים כדי לדעת מה נתמך, מה מומלץ, ומה אסור — אלה גוברים על כל מדריך.",
      consultantHe:
        "Notes מרכזיים מכסים: הגדרת embedded EWM ב-S/4 ותאימות-release; decentralized EWM on S/4 (תרחישי-פריסה ומגבלות); אינטגרציה מול non-SAP ERP; ו-restriction notes (פיצ'רים לא-נתמכים בענן/Basic). הגישה הנכונה: חיפוש ב-SAP for Me / Support Portal לפי component (SCM-EWM, LE-WM) ו-release, וקריאת ה-collective/central note לכל תרחיש לפני design-decision. תמיד אמת מול הגרסה המדויקת.",
      purposeHe:
        "להבטיח שהחלטות-הפריסה נשענות על מקור רשמי ומעודכן, למנוע תכנון תרחיש לא-נתמך, ולזהות מגבלות-release מוקדם.",
      processExampleHe:
        "לפני בחירת decentralized EWM on S/4: צוות-האדריכלות מחפש את ה-central note לתרחיש, מאמת תאימות-release בין ה-S/4 המרכזי למערכת-ה-EWM, ובודק restriction notes לפיצ'רים מתוכננים (MFS/Labor).",
      scenarioHe:
        "בארגון: לפני אישור decentralized EWM למרכז-ההפצה, ה-Basis וצוות-ה-SAP מאמתים את ה-Notes לתאימות-release ולתמיכת-MFS, ומתעדים אותם ב-design document.",
      navHe: [
        "SAP for Me ► Knowledge Base ► Search Notes (component SCM-EWM / LE-WM)",
        "SAP Support Portal ► SAP Notes & KBA Search",
      ],
      tables: [],
      tcodes: ["SNOTE"],
      fiori: [],
      configHe: [
        "חפש לפי component (SCM-EWM, SCM-EWM-DLP, LE-WM) ו-release מדויק.",
        "קרא central/collective notes לכל תרחיש-פריסה (embedded/decentralized/Cloud).",
        "אתר restriction notes לפיצ'רים לא-נתמכים (Cloud/Basic).",
        "תעד את מספרי-ה-Notes ב-design document; אמת מול הגרסה.",
      ],
      mistakesHe: [
        "הסתמכות על מדריך/בלוג במקום על SAP Note רשמי ומעודכן.",
        "אי-בדיקת תאימות-release בין S/4 מרכזי ל-decentralized EWM.",
        "התעלמות מ-restriction notes ➔ תכנון פיצ'ר לא-נתמך.",
      ],
      troubleshootHe: [
        "התנהגות לא-צפויה ➔ חפש SAP Note לפי הודעת-השגיאה והרכיב.",
        "פיצ'ר לא-זמין ➔ restriction note לאותו release/edition.",
      ],
      bestPracticeHe: [
        "אמת תמיד מול ה-Note העדכני ביותר ל-release המדויק.",
        "תעד את ה-Notes שעליהם נשענת החלטת-האדריכלות.",
        "השתמש ב-SNOTE ליישום-תיקונים נדרשים.",
      ],
      interviewHe: [
        { qHe: "מדוע חובה לבדוק SAP Notes לפני החלטת-פריסה ב-EWM?", aHe: "כי ה-Notes הם המקור הרשמי לאפשרויות-הפריסה הנתמכות, מטריצות-תאימות ומגבלות-release/edition — והם גוברים על מדריכים; הסתמכות עליהם מונעת תכנון תרחיש לא-נתמך." },
        { qHe: "לפי אילו components מחפשים Notes של EWM?", aHe: "בעיקר SCM-EWM (ותתי-רכיביו, למשל SCM-EWM-DLP) ו-LE-WM למורשת — לצד ה-release המדויק." },
      ],
      takeawaysHe: [
        "SAP Notes הם המקור הרשמי לתמיכת-פריסה ולמגבלות.",
        "אמת מול ה-Note העדכני ל-release המדויק לפני design-decision.",
        "תעד את ה-Notes ב-design document והשתמש ב-SNOTE לתיקונים.",
      ],
    },
    // ============================================================ 1.8
    {
      id: "1.8",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק-המבוא ביסס את התשתית להבנת EWM: מהו (מנוע-מחסן עצמאי ברמת-bin), כיצד התפתח (תוסף-SCM ➔ embedded/decentralized ב-S/4 ➔ ענן), אילו אפשרויות-פריסה קיימות (On-Premise, Cloud, NetWeaver, non-SAP), כיצד נתונים זורמים מול ה-ERP (CIF/DRF/qRFC/IDoc), כיצד הוא משתלב במודולים (MM/SD/PP/QM/TM), כיצד תעשיות שונות מאמצות אותו, ומדוע חובה לאמת מול SAP Notes. אלה המסגרת לכל הפרקים הבאים.",
      beginnerHe:
        "סיכמנו את 'התמונה-הגדולה': EWM הוא מנהל-מחסן חכם; אפשר להריץ אותו במקומות שונים (בתוך ה-S/4, נפרד, או בענן); הוא מדבר עם ה-ERP כל הזמן; הוא מחובר לרכש, ייצור, איכות ומשלוחים; וכל ענף משתמש בו קצת אחרת. עכשיו יש בסיס לצלול לפרטים.",
      consultantHe:
        "הפרק קישר את הצירים שמכתיבים את כל פרויקט-ה-EWM: דגם-פריסה (embedded/decentralized/Cloud) ⟵ מודל-אינטגרציה (internal/DRF/CIF/IDoc) ⟵ רישוי (Basic/Advanced) ⟵ צורכי-תעשייה (MFS/batch/FEFO/serial) ⟵ אימות מול SAP Notes. ההחלטות הללו שלובות: בחירת-פריסה משפיעה על אינטגרציה, על extensibility ועל זמינות-פיצ'רים. הפרקים הבאים יפרטו master data, מבנה-מחסן, inbound/outbound, ותהליכים מתקדמים.",
      purposeHe:
        "לעגן את מסגרת-ההחלטות של EWM לפני הצלילה הטכנית, ולוודא שכל בחירה (פריסה/אינטגרציה/רישוי) נעשית מתוך הבנת-ההשלכות הרוחביות.",
      processExampleHe:
        "צוות-פרויקט מסכם את פרק-המבוא בהחלטת-אדריכלות מתועדת: decentralized EWM on S/4 למרכז-ההפצה, DRF+qRFC לאינטגרציה, Advanced EWM ל-MFS, ואימות מול ה-SAP Notes הרלוונטיים — מסמך שמנחה את כל ההמשך.",
      scenarioHe:
        "בארגון: סיכום-המבוא מתורגם להחלטה — מחסני-סניף embedded, מרכז-הפצה ארצי decentralized עם Advanced EWM/MFS, תבנית-אימוץ מזון/משקאות (batch/FEFO/shelf-life), והכול מאומת מול SAP Notes ומתועד.",
      navHe: [
        "SAP Easy Access ► Logistics ► SCM Extended Warehouse Management ► Extended Warehouse Management",
        "IMG ► SCM Extended Warehouse Management ► Extended Warehouse Management",
      ],
      tables: ["/SCWM/T300", "/SCWM/T301", "/SCWM/LAGP", "/SCWM/ORDIM_O"],
      tcodes: ["/SCWM/MON", "SPRO"],
      fiori: ["F2148"],
      configHe: [
        "מסגרת-החלטה: פריסה ⟵ אינטגרציה ⟵ רישוי ⟵ תעשייה ⟵ SAP Notes.",
        "embedded לפשטות; decentralized לנפח/אוטומציה.",
        "Advanced EWM לפיצ'רים מתקדמים (MFS/Labor/Yard/slotting).",
      ],
      mistakesHe: [
        "קבלת-החלטות-פריסה במנותק מהשלכות-האינטגרציה והרישוי.",
        "דילוג על אימות-SAP-Notes לפני design.",
      ],
      troubleshootHe: [
        "אי-התאמה בין פריסה לאינטגרציה ➔ חזור למסגרת-ההחלטות של הפרק.",
        "פיצ'ר חסר ➔ בדוק רישוי (Basic/Advanced) ו-edition.",
      ],
      bestPracticeHe: [
        "תעד את כל החלטות-המבוא ב-design document יחיד.",
        "ודא שכל החלטה מתואמת על-פני הצירים (פריסה/אינטגרציה/רישוי/תעשייה).",
        "אמת הכול מול SAP Notes לפני מעבר לפרקים הטכניים.",
      ],
      interviewHe: [
        { qHe: "מהם הצירים העיקריים שמכתיבים פרויקט-EWM?", aHe: "דגם-פריסה (embedded/decentralized/Cloud), מודל-אינטגרציה (internal/DRF/CIF/IDoc), רישוי (Basic/Advanced), צורכי-תעשייה (MFS/batch/FEFO/serial), ואימות מול SAP Notes — כולם שלובים." },
        { qHe: "מדוע ההחלטות הללו שלובות זו-בזו?", aHe: "כי בחירת-פריסה קובעת את מודל-האינטגרציה, ה-extensibility וזמינות-הפיצ'רים; שינוי בציר אחד משפיע על האחרים, ולכן יש לתכנן אותם יחד." },
      ],
      takeawaysHe: [
        "EWM = מנוע-מחסן עצמאי, נפרס embedded/decentralized/Cloud.",
        "פריסה ⟵ אינטגרציה ⟵ רישוי ⟵ תעשייה — צירים שלובים.",
        "האינטגרציה מול ה-ERP (master+deliveries+movements) היא לב-המערכת.",
        "אמת כל החלטה מול SAP Notes לפני הצלילה הטכנית.",
      ],
      relatedHe: [
        { labelHe: "EWM · מבוא (1.1)", href: "/library/wm-academy/chapter-01/#sub-1.1" },
        { labelHe: "EWM · אפשרויות-פריסה (1.3)", href: "/library/wm-academy/chapter-01/#sub-1.3" },
      ],
    },
  ],
};
