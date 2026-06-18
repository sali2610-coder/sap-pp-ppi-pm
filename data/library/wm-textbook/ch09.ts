// ===== EWM Digital Textbook — Chapter 9 (Plant Maintenance Integration) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Only three subchapters (9.1, 9.2 with 9.2.1/9.2.2, 9.3) — each authored deep.
// CBC = Coca-Cola bottling EWM issuing spare parts to PM orders for fill-line equipment.
// SAP objects verbatim English; relates to /library/pm-academy/chapter-05/.
import type { TextbookChapter } from "./types";

export const CH9: TextbookChapter = {
  n: 9,
  titleHe: "שילוב עם תחזוקת מפעל (PM)",
  titleEn: "Plant Maintenance Integration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב בין EWM (Extended Warehouse Management) לבין Plant Maintenance (PM). בעולם של מפעל-מילוי כמו CBC, כל השבתה של קו-מילוי עולה כסף בכל דקה — ולכן זרימה חלקה של חלקי-חילוף מהמחסן אל הזמנת-התחזוקה (PM order) היא קריטית. הפרק מסביר כיצד EWM מקבל ביקוש לחלקי-חילוף מתוך reservation של PM order, מנפיק אותם דרך EWM outbound delivery, ומטפל בהחזרת חלקים שלא נוצלו חזרה למלאי. שלושת תת-הפרקים — סקירת ה-PM, שימוש בהזמנות-תחזוקה (outbound + inbound), וסיכום — נכתבו כל אחד כיחידה עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא לעומק בלי הספר המקורי.",
  subchapters: [
    // ============================================================ 9.1
    {
      id: "9.1",
      titleHe: "סקירת תחזוקת מפעל (Plant Maintenance)",
      titleEn: "Overview of Plant Maintenance",
      execHe:
        "Plant Maintenance (PM) הוא המודול של SAP המנהל את תחזוקת הציוד — אחזקה מונעת, אחזקת-שבר ושיפוצים. בלב התהליך עומדת ה-PM order (הזמנת-תחזוקה), שמתעדת את העבודה, את כוח-האדם ואת חלקי-החילוף הנדרשים. נקודת-המגע עם EWM היא בדיוק כאן: כשטכנאי זקוק לחלק-חילוף, ה-PM order יוצרת reservation מול המלאי, וה-EWM הוא זה שמנפיק את החלק פיזית מהמחסן. הבנה של PM היא תנאי-סף להבנת השילוב — בלי לדעת איך נולד הביקוש לחלק, אי-אפשר להבין כיצד EWM מספק אותו.",
      beginnerHe:
        "דמיין שיש לך מכונה גדולה — קו-מילוי בקבוקים — וצריך להחליף בה מסוע או מנוע. ב-SAP הטכנאי פותח 'הזמנת-תחזוקה' (PM order). בתוך ההזמנה יש רשימת-חלקים שצריך: מסבים, רצועות, חיישנים. כל חלק כזה הופך ל'הזמנה למחסן' (reservation) — בקשה לקחת את החלק מהמלאי. המחסן, שמנוהל ב-EWM, מקבל את הבקשה הזו ומכין את החלקים. כך PM 'מזמין' ו-EWM 'מספק'. ה-PM הוא בעצם המוסך של המפעל, וה-EWM הוא מחסן-החלפים שלו.",
      consultantHe:
        "ב-PM, אובייקט הציוד מיוצג ב-Equipment (טבלה EQUI) ובמיקום-טכני (Functional Location, IFLOT). ה-PM order נשמרת ב-AUFK/AFKO/AFPO; שורות חלקי-החילוף הן components של ההזמנה ויוצרות reservation בטבלה RESB עם movement type 261 (Goods Issue for order). כאשר ה-Storage Location מנוהל ב-EWM (EWM-managed storage location, דרך mapping ב-/SCWM/ ובהקצאת Warehouse Number), ה-reservation אינה מנופקת ישירות ב-ECC/S4 inventory management — היא זורמת ל-EWM כ-outbound delivery (או דרך posting-change/staging) ושם מתבצע ה-Goods Issue בפועל. שתי ארכיטקטורות עיקריות: decentralized EWM (מערכת נפרדת, חיבור דרך qRFC/CIF ו-delivery distribution) ו-embedded EWM (באותה מערכת S/4HANA). בשני המקרים ה-PM order היא ה-document of demand וה-EWM outbound delivery for spare parts היא ה-document of execution. ראה גם /library/pm-academy/chapter-05/ להעמקה בצד ה-PM.",
      purposeHe:
        "המטרה העסקית: להבטיח שחלק-החילוף הנכון מגיע לטכנאי הנכון בזמן הנכון, תוך שמירה על דיוק-מלאי ועל עקיבות-עלות. ה-PM order היא גם מסמך-עלות (כל חלק שנופק נזקף לעלות-ההזמנה דרך ה-CO), וגם מסמך-תכנון (היא קובעת מתי ומה צריך). EWM מוסיף את שכבת-הביצוע הלוגיסטי: איפה במחסן נמצא החלק, מי מלקט אותו, ואיך מתעדים את התנועה. ביחד הם סוגרים את הפער בין 'צריך חלק' ל'החלק ביד הטכנאי'.",
      processExampleHe:
        "תהליך מקצה-לקצה: (1) חיישן בקו-מילוי מתקלקל; טכנאי-תחזוקה פותח PM order מסוג PM01 על ה-Equipment. (2) הוא מוסיף לרשימת-הרכיבים את חלק-החילוף 'חיישן-מילוי' בכמות 1. (3) שמירת ההזמנה יוצרת reservation (RESB) מול ה-Storage Location המנוהל ב-EWM. (4) הביקוש זורם ל-EWM ונוצרת EWM outbound delivery; המערכת מייצרת warehouse task ללקט מהבין הנכון. (5) פועל-מחסן מלקט את החיישן ומאשר את ה-warehouse task. (6) מתבצע Goods Issue — המלאי יורד והעלות נזקפת ל-PM order. (7) הטכנאי מתקין ומדווח confirmation על ההזמנה.",
      cbcHe:
        "ב-CBC, מפעל-המילוי מפעיל עשרות קווי-מילוי, מערבלים ומסועים. כל פריט-ציוד כזה הוא Equipment ב-PM, מקושר ל-Functional Location של 'אולם-מילוי 3 / קו 7'. מחסן חלקי-החילוף — מסבים, רצועות-הינע, ראשי-מילוי, חיישנים, אטמים — מנוהל ב-EWM כ-Warehouse Number נפרד. כשמערבל מתקלקל בלילה, צוות-התחזוקה פותח PM order, וה-EWM מנפיק את החלפים בלילה דרך outbound delivery for spare parts כדי שהקו יחזור לפעול לפני משמרת-הבוקר. מהירות הזרימה הזו היא ההבדל בין השבתה של שעה לבין השבתה של משמרת.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Define Order Types",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► General Data ► Define Default Values for Component Item Categories",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Interfaces ► ERP Integration ► General Settings ► Map Storage Locations from ERP System to EWM",
      ],
      tables: ["EQUI", "IFLOT", "AUFK", "AFKO", "AFPO", "RESB"],
      tcodes: ["IW31", "IW32", "IW33", "IE01", "IE02", "IL01", "/SCWM/MON"],
      fiori: ["F1828", "F2929", "F2176"],
      configHe: [
        "Order Type (IW31): קובע טווח-מספרים, ברירות-מחדל ופרופיל-תזמון של ה-PM order; PM01 לתחזוקת-שבר נפוצה.",
        "Component Item Category (L = stock item): רכיב-מלאי המייצר reservation מול ה-Storage Location.",
        "EWM-managed Storage Location: מיפוי ב-SPRO (ERP↔EWM) הקובע אילו Storage Locations מנופקים דרך EWM ולא דרך IM ישירות.",
        "Reservation relevance: וידוא שה-movement type 261 פעיל ל-PM order ושה-Availability Check מוגדר.",
      ],
      flow: [
        { he: "תקלה בציוד", code: "EQUI", note: "Equipment / Func. Location" },
        { he: "פתיחת PM order", code: "IW31", note: "Order Type PM01" },
        { he: "רכיבי חלקי-חילוף", code: "RESB", note: "reservation 261" },
        { he: "ביקוש זורם ל-EWM", code: "EWM", note: "EWM-managed SLoc" },
        { he: "ביצוע לוגיסטי", code: "/SCWM/MON", note: "outbound delivery" },
      ],
      masterDataHe: [
        "EQUI = Equipment master (פריט-ציוד) · IFLOT = Functional Location (מיקום-טכני).",
        "AUFK = כותרת-הזמנה · AFKO/AFPO = פרטי-ייצור/פריט · RESB = שורות-reservation לחלקי-חילוף.",
        "Material master של חלק-החילוף חייב תצוגות EWM (Warehouse Number) ותצוגת MRP/Plant ב-Storage Location המנוהל.",
      ],
      mistakesHe: [
        "פתיחת PM order מול Storage Location שאינו ממופה ל-EWM — הביקוש לא זורם ל-EWM והמלאי לא יורד שם.",
        "חלק-חילוף ללא תצוגת Warehouse (EWM) באב-החומר — אי-אפשר ללקט אותו במחסן.",
        "שימוש ב-Component Item Category לא-נכונה (N במקום L) — נוצרת דרישת-רכש במקום reservation מהמלאי.",
        "התעלמות מ-Availability Check — ההזמנה משוחררת אף שאין מלאי, והפועל מגלה זאת רק בלקיטה.",
      ],
      troubleshootHe: [
        "הביקוש לא הופיע ב-EWM ➔ בדוק שה-Storage Location ממופה ל-Warehouse Number וש-delivery distribution פעיל.",
        "reservation נוצרה אך אין outbound delivery ➔ בדוק EWM-relevance של ה-SLoc ואת ה-CIF/queue (decentralized).",
        "לא ניתן ללקט את החלק ➔ חסרה תצוגת EWM באב-החומר או שאין מלאי בבין.",
        "העלות לא נזקפה ל-PM order ➔ ה-Goods Issue לא הושלם ב-EWM או movement type שגוי.",
      ],
      bestPracticeHe: [
        "הגדר מראש אילו Storage Locations הם EWM-managed ותעד זאת — מונע ביקוש 'אבוד'.",
        "ודא שכל חלק-חילוף שמופיע ב-PM orders נושא תצוגת EWM מלאה לפני go-live.",
        "השתמש ב-Order Type ייעודי לתחזוקה (PM01) עם ברירות-מחדל אחידות לרכיבים.",
        "נטר את תור-ההפצה (delivery distribution) ב-decentralized EWM כדי לזהות ביקוש שנתקע.",
      ],
      interviewHe: [
        { qHe: "כיצד נוצר הביקוש לחלק-חילוף בשילוב PM-EWM?", aHe: "דרך component שמתווסף ל-PM order; שמירת ההזמנה יוצרת reservation (RESB, movement type 261) מול ה-Storage Location. אם ה-SLoc מנוהל ב-EWM, הביקוש זורם ל-EWM כ-outbound delivery." },
        { qHe: "מה ההבדל בין decentralized ל-embedded EWM בהקשר PM?", aHe: "ב-decentralized ה-EWM הוא מערכת נפרדת והביקוש מגיע דרך delivery distribution/qRFC; ב-embedded הכל באותה מערכת S/4HANA. בשני המקרים ה-PM order היא מסמך-הביקוש וה-EWM outbound delivery היא מסמך-הביצוע." },
        { qHe: "מהו תפקיד ה-Equipment וה-Functional Location?", aHe: "Equipment (EQUI) הוא פריט-הציוד עצמו; Functional Location (IFLOT) הוא המיקום-הטכני שבו הוא מותקן. ה-PM order נפתחת מולם וכך נשמרת עקיבות-תחזוקה לכל קו-מילוי." },
      ],
      takeawaysHe: [
        "PM order = מסמך-הביקוש לחלקי-חילוף; EWM = מסמך-הביצוע הלוגיסטי.",
        "component ב-PM order יוצר reservation (movement type 261) שזורם ל-EWM אם ה-SLoc מנוהל-EWM.",
        "Equipment ו-Functional Location מספקים עקיבות-תחזוקה לכל פריט-ציוד.",
        "מיפוי Storage Location ↔ Warehouse Number הוא תנאי-הסף לכל הזרימה.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · ניהול הזמנות-תחזוקה", href: "/library/pm-academy/chapter-05/" },
        { labelHe: "אובייקט · RESB", href: "/library/pm/object/RESB/" },
        { labelHe: "אובייקט · EQUI", href: "/library/pm/object/EQUI/" },
      ],
    },
    // ============================================================ 9.2
    {
      id: "9.2",
      titleHe: "שימוש בהזמנות תחזוקה (Plant Maintenance Orders)",
      titleEn: "Using Plant Maintenance Orders",
      execHe:
        "תת-פרק זה הוא לב השילוב: כיצד EWM מטפל בפועל בחלקי-החילוף של PM order. שני תהליכים מנוגדים מרכיבים אותו — תהליך-יוצא (Outbound): ניפוק חלק-חילוף מהמחסן אל הטכנאי; ותהליך-נכנס (Inbound): החזרת חלק שלא נוצל חזרה למלאי. שניהם נשענים על EWM delivery כעוגן הביצוע, על warehouse task כליבת-העבודה, ועל Goods Movement כנקודת-העדכון של המלאי והעלות. שליטה בשני הכיוונים היא ההבדל בין מחסן-חלפים שמדמם מלאי-שגוי לבין מחסן שמסונכרן לחלוטין עם התחזוקה.",
      beginnerHe:
        "יש שני מצבים. במצב הראשון (Outbound) הטכנאי צריך חלק — המחסן מוציא אותו ושולח אליו; המלאי יורד. במצב השני (Inbound) הטכנאי לקח חלק אך לא השתמש בו (אולי לקח שניים ליתר-ביטחון) — אז הוא מחזיר אותו, והמחסן מכניס אותו חזרה; המלאי עולה. כמו ספרייה: שאלת ספר (outbound), והחזרת ספר שלא קראת (inbound). EWM מתעד את שני הכיוונים בדיוק כדי שתמיד נדע כמה חלקים באמת יש במחסן.",
      consultantHe:
        "מנגנונית: ה-reservation של ה-PM order יוצרת outbound delivery ב-EWM (document category OUT). מתוכה נוצרות warehouse tasks (טבלאות /SCWM/ORDIM_O) המנחות לקיטה. אישור ה-task והשלמת ה-Goods Issue מבצעים movement type 261 ומעדכנים את העלות ב-PM order. בכיוון ההפוך, החזרה מבוצעת כ-inbound delivery (movement type 262 — reversal of GI for order) או דרך posting-change, ובה warehouse tasks (/SCWM/ORDIM_I) לאחסון מחדש (putaway). שתי הדלתות חולקות את אותו anchor — ה-PM order — אך הן document categories שונים ו-process types שונים ב-EWM (PDO/PPF determination). הקפד על תיאום ה-warehouse process type עם ה-document type כדי שה-determination יבחר נכון את ה-storage-type search וה-bin.",
      purposeHe:
        "המטרה: לשמור על דיוק-מלאי דו-כיווני ועל עקיבות-עלות מלאה. כל חלק שיצא חייב לרדת מהמלאי ולהיזקף לעלות-ההזמנה; כל חלק שחזר חייב לעלות חזרה ולהזכות את ההזמנה. בלי הכיוון הנכנס, מחסן-החלפים מצטבר 'מלאי-רפאים' — חלקים שהמערכת חושבת שנוצלו אך פיזית חזרו למדף.",
      processExampleHe:
        "ניפוק והחזרה: טכנאי מבקש 2 מסבים ל-PM order. EWM מנפיק outbound delivery, מלקט 2 מסבים, מבצע GI — המלאי יורד ב-2 והעלות נזקפת. בפועל נדרש רק מסב אחד. הטכנאי מחזיר מסב אחד: נוצרת inbound delivery, ה-warehouse task מאחסן אותו חזרה בבין, ומתבצע reversal (262) — המלאי עולה ב-1 והעלות מתקזזת. בסוף-התהליך המלאי וה-PM order משקפים בדיוק את הצריכה האמיתית: מסב אחד.",
      cbcHe:
        "ב-CBC, החלפת ראש-מילוי בקו 7 דורשת ערכת-חלפים שלמה. צוות-הלילה מושך את כל הערכה (outbound) כדי לא לעצור באמצע. בבוקר מתברר ששלושה אטמים מתוך הערכה לא נדרשו — הם מוחזרים (inbound) למחסן-החלפים. בלי הכיוון הנכנס, ה-CBC היה 'מאבד' שלושה אטמים בכל החלפה, וכעבור חודש המלאי-בספרים היה רחוק מהמלאי-במדף.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery ► Define Document Types for Outbound Delivery Process",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Warehouse Process Type",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery ► Define Document Types for Inbound Delivery Process",
      ],
      tables: ["RESB", "AFKO", "/SCWM/ORDIM_O", "/SCWM/ORDIM_I", "/SCDL/DB_PROCH_O"],
      tcodes: ["IW31", "IW32", "/SCWM/PRDO", "/SCWM/PRDI", "/SCWM/MON"],
      fiori: ["F2929", "F1828", "F0843"],
      configHe: [
        "Warehouse Process Type: קובע storage-type search, bin determination ו-confirmation control לכל סוג-תנועה (outbound/inbound).",
        "Document Type (outbound): מקשר את ה-EWM outbound delivery לסוג-תהליך הניפוק לחלקי-חילוף.",
        "Document Type (inbound): מגדיר את תהליך-ההחזרה (return-to-stock) של חלקים שלא נוצלו.",
        "PPF / determination: התאמת process type ל-document type כדי שה-warehouse task ייווצר נכון.",
      ],
      flow: [
        { he: "reservation מ-PM order", code: "RESB", note: "anchor" },
        { he: "outbound delivery (ניפוק)", code: "/SCWM/PRDO", note: "261" },
        { he: "warehouse task לקיטה", code: "/SCWM/ORDIM_O" },
        { he: "inbound delivery (החזרה)", code: "/SCWM/PRDI", note: "262" },
        { he: "warehouse task לאחסון", code: "/SCWM/ORDIM_I" },
      ],
      masterDataHe: [
        "RESB = שורות-reservation; הן ה-anchor לשני הכיוונים.",
        "אב-החומר של חלק-החילוף: תצוגת Warehouse (EWM) + Storage-type/Bin assignment.",
        "/SCWM/ORDIM_O = warehouse tasks יוצאים · /SCWM/ORDIM_I = warehouse tasks נכנסים.",
      ],
      mistakesHe: [
        "שימוש ב-process type זהה ל-outbound ול-inbound — ה-bin determination מתבלבל.",
        "דילוג על תהליך-ההחזרה — חלקים שלא נוצלו 'נעלמים' והמלאי מתנפח שגוי.",
        "ביצוע GI ב-EWM בלי לאשר את ה-warehouse task — המלאי לא מתעדכן בבין הנכון.",
        "החזרה כ-outbound הופכי במקום inbound delivery — מאבדים את הקשר ל-PM order ולעלות.",
      ],
      troubleshootHe: [
        "outbound delivery לא נוצרה ➔ בדוק EWM-relevance של ה-SLoc ואת ה-document-type determination.",
        "warehouse task לא נוצר ➔ Warehouse Process Type חסר storage-type search או bin.",
        "החזרה לא הזכתה את ה-PM order ➔ נעשתה כ-posting-change במקום reversal 262, או חסר קישור ל-order.",
        "מלאי-בספרים ≠ מלאי-פיזי ➔ כיוון inbound לא הופעל / החזרות לא נרשמו.",
      ],
      bestPracticeHe: [
        "הפרד process types בין ניפוק להחזרה — בהירות ב-determination ובדיווח.",
        "הגדר תהליך-החזרה כחלק מהתכנון, לא כ-afterthought — מחסן-חלפים בלי החזרות מדמם מלאי.",
        "אכוף אישור-task לפני GI כדי לשמור על דיוק-בין.",
        "נטר ב-/SCWM/MON deliveries תקועות בשני הכיוונים מדי משמרת.",
      ],
      interviewHe: [
        { qHe: "מהם שני התהליכים המרכזיים בשילוב PM-EWM?", aHe: "Outbound — ניפוק חלק-חילוף מהמחסן ל-PM order (GI, movement type 261); ו-Inbound — החזרת חלק שלא נוצל חזרה למלאי (reversal, movement type 262). שניהם נעוגנים ב-reservation של ה-PM order." },
        { qHe: "מדוע חשוב כיוון ה-inbound (ההחזרה)?", aHe: "בלי ההחזרה, חלקים שנמשכו אך לא נוצלו נשארים 'צרוכים' בספרים בעוד שהם פיזית במדף — נוצר פער בין מלאי-בספרים למלאי-פיזי ועלות-ההזמנה מנופחת." },
        { qHe: "כיצד EWM יודע לאן ללקט / לאן לאחסן?", aHe: "דרך ה-Warehouse Process Type, שקובע storage-type search ו-bin determination; הוא נבחר אוטומטית לפי ה-document type של ה-delivery (outbound או inbound)." },
      ],
      takeawaysHe: [
        "שני כיוונים: outbound (ניפוק, 261) ו-inbound (החזרה, 262), שניהם נעוגנים ב-reservation.",
        "EWM delivery הוא עוגן-הביצוע; warehouse task הוא ליבת-העבודה.",
        "Warehouse Process Type קובע איפה מלקטים ואיפה מאחסנים.",
        "בלי תהליך-ההחזרה, מחסן-החלפים מדמם דיוק-מלאי.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · ניהול הזמנות-תחזוקה", href: "/library/pm-academy/chapter-05/" },
        { labelHe: "EWM · סקירת PM (9.1)", href: "/library/wm/chapter-09/#sub-9.1" },
      ],
      children: [
        // ---------------------------------------------------- 9.2.1
        {
          id: "9.2.1",
          titleHe: "תהליך יוצא (Outbound Process)",
          titleEn: "Outbound Process",
          execHe:
            "התהליך-היוצא הוא ניפוק חלק-החילוף מהמחסן אל ה-PM order. הוא מתחיל ב-reservation שנוצרת מ-component של ההזמנה, ממשיך ב-EWM outbound delivery for spare parts, עובר דרך warehouse task לקיטה, ומסתיים ב-Goods Issue (movement type 261) שמוריד את המלאי וזוקף את העלות ל-PM order. זהו הכיוון הנפוץ והקריטי-בזמן: כשקו-מילוי מושבת, מהירות הניפוק היא שקובעת מתי הוא חוזר לעבוד.",
          beginnerHe:
            "הטכנאי צריך חלק. המחסן עושה ארבעה דברים: (1) מקבל את הבקשה (reservation), (2) פותח 'תעודת-משלוח' פנימית (outbound delivery), (3) שולח פועל ללקט את החלק מהמדף (warehouse task), (4) רושם שהחלק יצא (Goods Issue) — וכך המלאי יורד. זה הכיוון של 'החלק יוצא מהמחסן אל הטכנאי'.",
          consultantHe:
            "ה-reservation (RESB, 261) של ה-PM order מפעילה יצירת outbound delivery ב-EWM. ב-decentralized EWM הביקוש זורם דרך delivery distribution; ב-embedded הוא נוצר ישירות. מ-ה-delivery נוצרות warehouse tasks (/SCWM/ORDIM_O) לפי ה-Warehouse Process Type — הוא קובע storage-type search ו-bin determination. אישור ה-task (/SCWM/PRDO או /SCWM/RFUI) מבצע את הלקיטה; השלמת ה-Goods Issue מעדכנת את ה-IM/PM order עם movement type 261, זוקפת את עלות-החלק ל-PM order דרך ה-CO, ומסנכרנת את המלאי. ב-decentralized חשוב לוודא שה-GI מתבצע ב-EWM ומזרים בחזרה את ה-confirmation ל-ECC/S4.",
          purposeHe:
            "המטרה: לספק את החלק הנכון לטכנאי במהירות ובדיוק, תוך עדכון-מלאי ועדכון-עלות מיידיים. כל ניפוק נזקף לעלות-ההזמנה — כך מנהל-התחזוקה רואה כמה באמת עלתה כל תיקון, וכך המלאי במחסן תמיד מעודכן.",
          processExampleHe:
            "טכנאי מוסיף 'רצועת-הינע' כ-component ל-PM order ושומר ➔ reservation (RESB, 261) נוצרת מול ה-SLoc המנוהל-EWM ➔ EWM outbound delivery for spare parts נוצרת ➔ warehouse task מנחה ללקט מהבין B-04-12 ➔ פועל מלקט ומאשר ➔ Goods Issue (261) מבוצע: המלאי יורד ב-1, העלות נזקפת ל-PM order ➔ הטכנאי מקבל את הרצועה ומתקין.",
          cbcHe:
            "ב-CBC, בשעה 02:00 קו 7 מושבת בגלל רצועת-הינע קרועה. הטכנאי פותח PM order ומוסיף את הרצועה. EWM outbound delivery נוצרת מיד, פועל-לילה מלקט מהבין, מבצע GI, והרצועה ביד הטכנאי תוך 15 דקות. הקו חוזר לפעול לפני משמרת-הבוקר — זה הערך הישיר של תהליך-יוצא חלק.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery ► Define Document Types for Outbound Delivery Process",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Warehouse Process Type",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Interfaces ► ERP Integration ► Delivery Processing ► Map Document Types from ERP to EWM",
          ],
          tables: ["RESB", "/SCDL/DB_PROCH_O", "/SCWM/ORDIM_O", "AUFK"],
          tcodes: ["IW32", "/SCWM/PRDO", "/SCWM/RFUI", "/SCWM/MON"],
          fiori: ["F2929", "F1828"],
          configHe: [
            "Outbound Document Type: מקשר את ה-EWM outbound delivery לתהליך ניפוק חלקי-חילוף.",
            "Warehouse Process Type (outbound): storage-type search לקיטה + confirmation control.",
            "ERP↔EWM document mapping: מבטיח שה-reservation/PM-delivery ממופה ל-EWM document type הנכון.",
            "Goods Issue movement type 261 פעיל ל-PM order ומסונכרן ב-decentralized.",
          ],
          flow: [
            { he: "component ב-PM order", code: "IW32" },
            { he: "reservation", code: "RESB", note: "261" },
            { he: "EWM outbound delivery", code: "/SCWM/PRDO" },
            { he: "warehouse task לקיטה", code: "/SCWM/ORDIM_O" },
            { he: "Goods Issue", code: "GI", note: "מלאי↓, עלות↑" },
          ],
          masterDataHe: [
            "RESB = שורת-reservation היוצרת את הביקוש.",
            "אב-החומר: תצוגת EWM + bin assignment כדי שה-warehouse task יוכל ללקט.",
            "/SCWM/ORDIM_O = ה-warehouse task היוצא.",
          ],
          mistakesHe: [
            "ביצוע GI ב-ECC/IM ישירות במקום ב-EWM ➔ ה-EWM נשאר עם מלאי שגוי.",
            "Warehouse Process Type בלי storage-type search ➔ אין warehouse task.",
            "שכחת אישור ה-task לפני GI ➔ המלאי לא יורד מהבין הנכון.",
          ],
          troubleshootHe: [
            "outbound delivery לא נוצרה ➔ document-type mapping (ERP↔EWM) חסר או SLoc לא EWM-relevant.",
            "warehouse task לא נוצר ➔ Warehouse Process Type חסר storage-type search.",
            "GI לא הזרים confirmation ל-ECC ➔ בעיית delivery distribution / queue ב-decentralized.",
          ],
          bestPracticeHe: [
            "תעדף outbound deliveries של תחזוקה (wave/priority) — זמן-השבתה יקר.",
            "אכוף GI דרך EWM בלבד לחלקי-חילוף מנוהלי-EWM.",
            "השתמש ב-RF (/SCWM/RFUI) ללקיטה מהירה ברצפת-המחסן.",
          ],
          interviewHe: [
            { qHe: "מה מתחיל את התהליך-היוצא?", aHe: "reservation שנוצרת מ-component של ה-PM order (RESB, movement type 261) מול Storage Location מנוהל-EWM; היא מפעילה יצירת EWM outbound delivery for spare parts." },
            { qHe: "מתי המלאי יורד בפועל?", aHe: "רק בהשלמת ה-Goods Issue ב-EWM (לאחר אישור ה-warehouse task), שמבצע movement type 261 וזוקף את העלות ל-PM order." },
          ],
          takeawaysHe: [
            "Outbound = ניפוק: reservation ➔ outbound delivery ➔ warehouse task ➔ GI (261).",
            "המלאי יורד והעלות נזקפת רק בהשלמת ה-GI ב-EWM.",
            "מהירות הניפוק = זמן-החזרה-לעבודה של הקו.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · ניהול הזמנות-תחזוקה", href: "/library/pm-academy/chapter-05/" },
            { labelHe: "EWM · תהליך נכנס (9.2.2)", href: "/library/wm/chapter-09/#sub-9.2.2" },
          ],
        },
        // ---------------------------------------------------- 9.2.2
        {
          id: "9.2.2",
          titleHe: "תהליך נכנס (Inbound Process)",
          titleEn: "Inbound Process",
          execHe:
            "התהליך-הנכנס הוא החזרת חלק-חילוף שלא נוצל חזרה למלאי. הוא מתחיל כשהטכנאי מחזיר חלק שנמשך אך לא הותקן, ממשיך ב-EWM inbound delivery (return-to-stock), עובר דרך warehouse task לאחסון (putaway), ומסתיים ב-reversal of Goods Issue (movement type 262) שמעלה את המלאי חזרה ומזכה את ה-PM order. בלי הכיוון הזה, כל חלק-עודף שנמשך 'נאבד' בספרים — לכן הוא קריטי לדיוק-מלאי לאורך-זמן.",
          beginnerHe:
            "הטכנאי לקח שני חלקים ליתר-ביטחון אבל השתמש רק באחד. את השני הוא מחזיר. המחסן עושה את ההפך מהניפוק: (1) פותח 'תעודת-קבלה' פנימית (inbound delivery), (2) שולח פועל להחזיר את החלק למדף (warehouse task), (3) רושם שהחלק חזר (reversal) — וכך המלאי עולה בחזרה. זה הכיוון של 'החלק חוזר מהטכנאי אל המחסן'.",
          consultantHe:
            "ההחזרה מבוצעת כ-inbound delivery ב-EWM הקשורה ל-PM order, עם movement type 262 (reversal of GI for order). מ-ה-delivery נוצרות warehouse tasks (/SCWM/ORDIM_I) ל-putaway לפי ה-Warehouse Process Type הנכנס. אישור ה-task והשלמת ה-Goods Receipt/Reversal מעדכנים את המלאי כלפי-מעלה ומזכים את עלות-ה-PM order דרך ה-CO. חשוב להבחין: זו אינה GR רגיל מספק — זו החזרה-ל-order ולכן movement type 262 ולא 101. ב-embedded EWM ה-262 מתבצע אוטומטית עם ה-GR; ב-decentralized יש לוודא הזרמת ה-confirmation בחזרה ל-ECC.",
          purposeHe:
            "המטרה: לסגור את לולאת-המלאי. כל חלק שנמשך אך לא נוצל חייב לחזור למלאי ולהזכות את ההזמנה, כדי שמלאי-הספרים ישקף את המלאי-הפיזי ושעלות-ההזמנה תשקף את הצריכה-האמיתית בלבד.",
          processExampleHe:
            "מתוך 2 מסבים שנופקו, רק 1 הותקן. הטכנאי מחזיר 1 ➔ נוצרת EWM inbound delivery הקשורה ל-PM order ➔ warehouse task מנחה לאחסן בבין B-04-12 ➔ פועל מאחסן ומאשר ➔ reversal (262) מבוצע: המלאי עולה ב-1, עלות-ה-PM order מתקזזת ב-1 מסב ➔ בסוף-התהליך נצרך מסב אחד בלבד, והמלאי מדויק.",
          cbcHe:
            "ב-CBC, אחרי החלפת ראש-המילוי בקו 7, שלושה אטמים מהערכה לא נדרשו. הטכנאי מחזיר אותם: EWM inbound delivery נפתחת, warehouse task מאחסן אותם חזרה במחסן-החלפים, ו-reversal 262 מעלה את המלאי ומזכה את ה-PM order. בלי השלב הזה, ה-CBC היה 'צורך' שלושה אטמים-רפאים בכל החלפה.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery ► Define Document Types for Inbound Delivery Process",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Warehouse Process Type",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Putaway Control ► Define Storage Type Search",
          ],
          tables: ["RESB", "/SCDL/DB_PROCH_I", "/SCWM/ORDIM_I", "AUFK"],
          tcodes: ["IW32", "/SCWM/PRDI", "/SCWM/RFUI", "/SCWM/MON"],
          fiori: ["F0843", "F1828"],
          configHe: [
            "Inbound Document Type: מגדיר את תהליך החזרת-החלקים (return-to-stock) ל-PM order.",
            "Warehouse Process Type (inbound): storage-type search ל-putaway + confirmation control.",
            "Movement type 262 (reversal of GI for order) פעיל ומסונכרן עם ה-PM order.",
            "Putaway storage-type search: היכן לאחסן חזרה את החלק המוחזר.",
          ],
          flow: [
            { he: "החזרת חלק לא-מנוצל", code: "IW32" },
            { he: "EWM inbound delivery", code: "/SCWM/PRDI" },
            { he: "warehouse task ל-putaway", code: "/SCWM/ORDIM_I" },
            { he: "reversal of GI", code: "262", note: "מלאי↑, עלות↓" },
            { he: "מלאי מדויק + order מזוכה", code: "AUFK" },
          ],
          masterDataHe: [
            "RESB = ה-reservation המקורית; ההחזרה מקזזת מולה.",
            "אב-החומר: תצוגת EWM + putaway storage-type search לקביעת בין-האחסון.",
            "/SCWM/ORDIM_I = ה-warehouse task הנכנס (putaway).",
          ],
          mistakesHe: [
            "החזרה כ-GR רגיל (101) במקום reversal (262) ➔ מנותקת מה-PM order, העלות לא מתקזזת.",
            "דילוג על ההחזרה ➔ מלאי-רפאים והפרש מלאי-ספרים מול פיזי.",
            "Warehouse Process Type נכנס בלי putaway search ➔ אין warehouse task לאחסון.",
            "אישור putaway לבין שגוי ➔ החלק 'נמצא' במקום הלא-נכון בלקיטה הבאה.",
          ],
          troubleshootHe: [
            "ההחזרה לא הזכתה את ה-PM order ➔ נעשתה כ-101 במקום 262, או חסר קישור ל-order.",
            "inbound delivery לא נוצרה ➔ inbound document-type determination חסר.",
            "warehouse task ל-putaway לא נוצר ➔ Warehouse Process Type חסר storage-type search.",
            "מלאי לא עלה אחרי ההחזרה ➔ ה-Goods Receipt/Reversal לא הושלם ב-EWM.",
          ],
          bestPracticeHe: [
            "הגדר תהליך-החזרה ייעודי ל-PM (return-to-stock) ולא להסתמך על תיקוני-מלאי ידניים.",
            "אכוף 262 (לא 101) לכל החזרת חלק-חילוף — שמירה על קישור-העלות.",
            "כוון putaway לבין-המקור כדי לשמר עקיבות-מיקום.",
            "נטר deliveries נכנסות תקועות ב-/SCWM/MON — החזרות שנשכחות מעוותות מלאי.",
          ],
          interviewHe: [
            { qHe: "כיצד מחזירים חלק-חילוף שלא נוצל ב-EWM?", aHe: "דרך EWM inbound delivery הקשורה ל-PM order, עם warehouse task ל-putaway, ובהשלמתה reversal of GI (movement type 262) — המלאי עולה והעלות מתקזזת מ-ה-PM order." },
            { qHe: "מדוע 262 ולא 101 בהחזרה?", aHe: "262 הוא reversal של ה-GI-for-order, ולכן נשאר קשור ל-PM order ומקזז את עלותה; 101 הוא GR רגיל מספק שמנותק מההזמנה ולא מתקן את העלות." },
          ],
          takeawaysHe: [
            "Inbound = החזרה: inbound delivery ➔ warehouse task (putaway) ➔ reversal (262).",
            "262 שומר על הקישור ל-PM order ומקזז את העלות; 101 לא.",
            "הכיוון הזה סוגר את לולאת-המלאי ומונע מלאי-רפאים.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · ניהול הזמנות-תחזוקה", href: "/library/pm-academy/chapter-05/" },
            { labelHe: "EWM · תהליך יוצא (9.2.1)", href: "/library/wm/chapter-09/#sub-9.2.1" },
          ],
        },
      ],
    },
    // ============================================================ 9.3
    {
      id: "9.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "שילוב PM-EWM מחבר את עולם-התחזוקה לעולם-המחסן דרך עוגן אחד — ה-PM order. ה-reservation שלה מגדירה את הביקוש, וה-EWM delivery מבצעת אותו פיזית בשני כיוונים: outbound (ניפוק, 261) ו-inbound (החזרה, 262). שליטה בשני הכיוונים מבטיחה דיוק-מלאי, עקיבות-עלות וזמינות-קו. זהו ההבדל בין מחסן-חלפים שמסונכרן עם התחזוקה לבין מחסן ש'מדמם' מלאי בכל תיקון.",
      beginnerHe:
        "סיכום פשוט: PM אומר 'צריך חלק', EWM מספק ('outbound') או מקבל-חזרה ('inbound'). שני הכיוונים יחד שומרים שהמלאי-בספרים תמיד יהיה זהה למלאי-במדף, ושנדע כמה באמת עלה כל תיקון. אם זוכרים רק את הניפוק ושוכחים את ההחזרה — המספרים מתחילים לשקר.",
      consultantHe:
        "מבחינה ארכיטקטונית: ה-PM order (AUFK/AFKO/RESB) היא document-of-demand; ה-EWM outbound/inbound delivery היא document-of-execution; ה-warehouse task (/SCWM/ORDIM_O/I) היא ליבת-העבודה; וה-movement types 261/262 הם נקודות-עדכון המלאי והעלות. ההגדרות הקריטיות: מיפוי Storage Location ↔ Warehouse Number, document-type determination (ERP↔EWM), ו-Warehouse Process Type לכל כיוון. ב-decentralized יש לנטר את delivery distribution; ב-embedded הזרימה ישירה. נקודת-הכשל הנפוצה ביותר היא היעדר תהליך-החזרה מסודר. להעמקה בצד ה-PM ראה /library/pm-academy/chapter-05/.",
      purposeHe:
        "המטרה של הפרק כולו: לתת ליועץ ולמתחיל תמונה שלמה של זרימת חלקי-החילוף בין PM ל-EWM — מהיווצרות-הביקוש ועד עדכון-המלאי-והעלות — כך שיוכלו לתכנן, ליישם ולפתור תקלות בשילוב הזה בלי הספר.",
      processExampleHe:
        "מחזור מלא: PM order ➔ reservation ➔ outbound delivery ➔ לקיטה ➔ GI (261, מלאי↓ עלות↑) ➔ [עודף] החזרה ➔ inbound delivery ➔ putaway ➔ reversal (262, מלאי↑ עלות↓). בסוף, המלאי וה-PM order משקפים בדיוק את הצריכה-האמיתית.",
      cbcHe:
        "ב-CBC, שילוב PM-EWM הוא מה שמאפשר לקווי-המילוי לחזור לעבוד תוך דקות ולא תוך משמרת, ושומר שמחסן-החלפים יהיה מדויק חודש אחרי חודש — שני הדברים שמודדים את הצלחת ה-go-live של המודול.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Interfaces ► ERP Integration ► General Settings ► Map Storage Locations from ERP System to EWM",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Warehouse Process Type",
      ],
      tables: ["AUFK", "RESB", "/SCWM/ORDIM_O", "/SCWM/ORDIM_I"],
      tcodes: ["IW31", "/SCWM/PRDO", "/SCWM/PRDI", "/SCWM/MON"],
      fiori: ["F1828", "F2929", "F0843"],
      configHe: [
        "מיפוי Storage Location ↔ Warehouse Number — תנאי-הסף לכל הזרימה.",
        "Document-type determination (ERP↔EWM) ל-outbound ול-inbound.",
        "Warehouse Process Type נפרד לכל כיוון (ניפוק / החזרה).",
        "movement types 261 (GI) ו-262 (reversal) פעילים ומסונכרנים ל-PM order.",
      ],
      flow: [
        { he: "PM order ➔ reservation", code: "RESB" },
        { he: "outbound ➔ GI", code: "261", note: "מלאי↓" },
        { he: "החזרת עודף ➔ inbound", code: "262", note: "מלאי↑" },
        { he: "מלאי + עלות מדויקים", code: "AUFK" },
      ],
      masterDataHe: [
        "PM order (AUFK/AFKO/RESB) = ביקוש · EWM delivery = ביצוע.",
        "אב-החומר של חלק-החילוף עם תצוגות EWM מלאות = תנאי לזרימה דו-כיוונית.",
      ],
      mistakesHe: [
        "יישום outbound בלבד בלי inbound — מקור מס' 1 לאי-דיוק-מלאי.",
        "מיפוי SLoc↔Warehouse חסר — ביקוש 'אבוד' בין המערכות.",
        "הסתמכות על תיקוני-מלאי ידניים במקום תהליך-החזרה מסודר.",
      ],
      troubleshootHe: [
        "פערי מלאי-ספרים מול פיזי ➔ כמעט תמיד החזרות (inbound) שלא נרשמו.",
        "ביקוש לא מגיע ל-EWM ➔ מיפוי SLoc או delivery distribution.",
        "עלות-PM order שגויה ➔ GI/reversal לא הושלם או movement type שגוי.",
      ],
      bestPracticeHe: [
        "תכנן את שני הכיוונים יחד מההתחלה — outbound ו-inbound הם זוג.",
        "אכוף ביצוע תנועות-מלאי דרך EWM בלבד לחלקי-חילוף מנוהלי-EWM.",
        "נטר deliveries תקועות בשני הכיוונים מדי משמרת.",
        "תעד את מיפוי ה-Storage Locations וה-process types כחלק מתיק-המימוש.",
      ],
      interviewHe: [
        { qHe: "מה העוגן המשותף לכל זרימת PM-EWM?", aHe: "ה-PM order ו-ה-reservation שלה: הן מגדירות את הביקוש לחלקי-חילוף, וה-EWM delivery (outbound/inbound) מבצעת אותו פיזית בשני הכיוונים." },
        { qHe: "מהי נקודת-הכשל הנפוצה ביותר בשילוב?", aHe: "היעדר תהליך-החזרה (inbound) מסודר — מה שגורם לחלקים שנמשכו אך לא נוצלו להישאר 'צרוכים' בספרים ולעוות גם את המלאי וגם את עלות-ההזמנה." },
      ],
      takeawaysHe: [
        "PM order = ביקוש; EWM delivery = ביצוע; warehouse task = עבודה; 261/262 = עדכון מלאי+עלות.",
        "outbound ו-inbound הם זוג בלתי-נפרד — מי שמיישם רק את הניפוק מקלקל את הדיוק.",
        "מיפוי SLoc↔Warehouse ו-process types נכונים הם תנאי-הסף.",
        "התוצאה: זמינות-קו גבוהה + מחסן-חלפים מדויק לאורך-זמן.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · ניהול הזמנות-תחזוקה", href: "/library/pm-academy/chapter-05/" },
        { labelHe: "EWM · שימוש בהזמנות-תחזוקה (9.2)", href: "/library/wm/chapter-09/#sub-9.2" },
      ],
    },
  ],
};
