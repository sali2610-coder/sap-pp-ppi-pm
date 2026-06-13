// ===== MM Digital Textbook — Chapter 16 (gold-standard learning chapter) =====
// Integration of SAP S/4HANA Sourcing & Procurement with SAP Signavio and
// external networks (SAP Ariba, SAP Business Network, SAP Fieldglass,
// SAP SuccessFactors). Every node is a complete 18-facet LearningNode of
// authored Hebrew. Source hierarchy + ids preserved exactly.
// Transformative Hebrew; SAP identifiers verbatim EN (cXML/SOAP/SAP Integration
// Suite, Managed Gateway for Spend Management, SAP Business Network, …).
import type { TextbookChapter } from "./types";

export const CH16: TextbookChapter = {
  n: 16,
  titleHe: "שילוב עם SAP Signavio ומערכות חיצוניות",
  titleEn: "Integrating SAP S/4HANA with SAP Signavio and External Systems",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב SAP S/4HANA Sourcing & Procurement עם רשתות ומערכות חיצוניות: SAP Ariba, SAP Business Network (לסחר, לשרשרת-אספקה, ללוגיסטיקה ולתחזוקת-נכסים), SAP Fieldglass, SAP SuccessFactors ו-SAP Signavio. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים זרימת-נתונים, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הדגש הוא אינטגרציה: זרימת-מסמכים (cXML/SOAP), Middleware (SAP Integration Suite) וכרייה-תהליכית (SAP Signavio Process Intelligence). המטרה: ללמוד את השילוב ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 16.1
    {
      id: "16.1", titleHe: "פרויקטי שילוב SAP Ariba ו-SAP Business Network", titleEn: "SAP Ariba and SAP Business Network Integration Projects",
      execHe:
        "SAP Ariba ו-SAP Business Network מרחיבים את ה-Procurement של S/4HANA אל מעבר לארגון — אל רשת-ספקים גלובלית. פרויקט-שילוב מחבר את תהליכי הרכש הפנימיים (Purchase Requisition, Purchase Order, Invoice) לתהליכי-ספק חיצוניים (אישור-הזמנה, אישפוז-משלוח, חשבונית) דרך רשת-מסחר ענן. זהו לב ה-Source-to-Pay הדיגיטלי: פחות נייר, פחות שגיאות, יותר נראות.",
      beginnerHe:
        "דמיין ש-S/4HANA הוא המשרד הפנימי שלך, ו-SAP Business Network הוא 'הדואר' שמחבר אותך לכל הספקים. במקום לשלוח הזמנה במייל או בפקס, ההזמנה זורמת אוטומטית דרך הרשת לספק, והספק מחזיר אישור וחשבונית באותה דרך. SAP Ariba הוא ה'אפליקציות' שרצות מעל הרשת — מכרזים, חוזים, קטלוגים.",
      consultantHe:
        "פרויקט-שילוב טיפוסי כולל: בחירת תרחיש (Indirect/Direct, Catalog, Invoice), הגדרת Middleware (SAP Integration Suite, Managed Gateway for Spend Management), מיפוי מסמכי cXML מול IDocs/SOAP של S/4HANA, רישום (Onboarding) הספקים ב-Business Network, וטסטים מקצה-לקצה. שים לב לבחירת מודל-הפריסה: Standard vs Mediated integration, ולמספר ה-ANID (Ariba Network ID) של הקונה. נקודת-כשל נפוצה: אי-התאמה בין Unit of Measure או Tax codes בין המערכות.",
      purposeHe:
        "המטרה: לדגֵם את שרשרת ה-Source-to-Pay כך שכל מסמך זורם דיגיטלית בין קונה לספק — להאיץ מחזורי-רכש, להפחית שגיאות-הקלדה, לאפשר תאימות-חוזים ולקבל נראות מלאה על ההוצאה (Spend visibility).",
      processExampleHe:
        "רוכש יוצר Purchase Order ב-S/4HANA. ה-PO נשלח כ-cXML דרך SAP Integration Suite אל SAP Business Network, ומגיע לספק. הספק שולח Order Confirmation, ואז Advance Ship Notice (ASN), ובסוף חשבונית (Invoice) — כולם זורמים חזרה ל-S/4HANA, מתאימים אוטומטית (3-way match) ומאושרים לתשלום.",
      cbcHe:
        "ב-CBC: רכש חומרי-אריזה (בקבוקים, פקקים, תוויות) מספקים גלובליים מנוהל דרך SAP Business Network; ההזמנות לקווי-המילוי זורמות כ-cXML, והספקים מחזירים ASN שמעדכן את תכנון-הקבלה במחסן-החומרים.",
      navHe: [
        "Materials Management ► Purchasing ► Integration with SAP Business Network ► Define Buyer Profile (ANID)",
        "SPRO ► Integration with Other SAP Components ► SAP Ariba / SAP Business Network ► Basic Settings",
        "SAP Integration Suite ► Discover ► Integration Packages ► SAP S/4HANA Integration with SAP Business Network",
      ],
      tables: ["EKKO", "EKPO", "EDID4", "EDIDC", "BBP_PDIGP"],
      tcodes: ["ME21N", "ME23N", "MIRO", "WE02", "SXMB_MONI"],
      fiori: ["F0842A", "F1048", "F2384"],
      configHe: [
        "Buyer Profile / ANID: רישום מזהה-הקונה ברשת ושיוכו ל-S/4HANA כתנאי-סף לזרימת-מסמכים.",
        "Document Scope: בחירת המסמכים בתחום (PO, Order Confirmation, ASN, Invoice, Service Sheet).",
        "Message mapping: מיפוי cXML ↔ IDoc/SOAP (ORDERS, ORDRSP, DESADV, INVOIC).",
        "Master-data alignment: UoM, Tax codes, Currency ו-Supplier mapping בין S/4HANA ל-Business Network.",
      ],
      flow: [
        { he: "יצירת PO", code: "ME21N", note: "S/4HANA" },
        { he: "המרה ל-cXML", code: "Integration Suite", note: "Middleware" },
        { he: "מסירה לספק", code: "SAP Business Network" },
        { he: "Order Confirmation / ASN", code: "ORDRSP/DESADV" },
        { he: "Invoice + 3-way match", code: "MIRO/INVOIC" },
      ],
      masterDataHe: [
        "Vendor/Supplier master (LFA1) ↔ Business Network Supplier (ANID) — מיפוי חובה.",
        "Purchasing Info Record + Catalog mapping לזיהוי פריט מול קוד-ספק.",
        "Tax & UoM mapping tables — מקור נפוץ לכשלי-התאמה בחשבונית.",
      ],
      mistakesHe: [
        "התחלת רישום-ספקים (Onboarding) מאוחר מדי — הספקים לא מוכנים בתאריך ה-Go-Live.",
        "אי-התאמת Unit of Measure/Tax בין המערכות ➔ דחיית חשבוניות אוטומטית.",
        "דילוג על בדיקת מקצה-לקצה לכל סוג-מסמך בנפרד.",
        "חוסר תיאום ANID — מסמכים 'נעלמים' ברשת בלי מסירה.",
      ],
      troubleshootHe: [
        "PO לא מגיע לספק ➔ בדוק ANID, Document Scope ו-monitoring ב-SAP Integration Suite.",
        "חשבונית נדחית ➔ אי-התאמת UoM/Tax/מחיר מול ה-PO (3-way match נכשל).",
        "ASN לא מעדכן קבלה ➔ מיפוי DESADV או חוסר התאמת פריט/יחידה.",
        "מסמך תקוע ➔ בדוק SXMB_MONI / Message Processing Log ב-Integration Suite.",
      ],
      bestPracticeHe: [
        "התחל Supplier Onboarding מוקדם ובגלים, לא בבת-אחת.",
        "ייצב את ה-master-data mapping (UoM/Tax/Supplier) לפני זרימת-מסמכים.",
        "בדוק כל סוג-מסמך מקצה-לקצה לפני הרחבה ל-production.",
        "הקם monitoring מרכזי ב-Integration Suite לעקיבות מלאה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין SAP Ariba ל-SAP Business Network?", aHe: "SAP Business Network היא רשת-המסחר (תשתית-הקישוריות בין קונים לספקים); SAP Ariba הן האפליקציות (Sourcing, Contracts, Buying) הרצות מעל הרשת." },
        { qHe: "מהו ANID?", aHe: "Ariba Network ID — מזהה ייחודי של ארגון (קונה או ספק) ב-SAP Business Network, המשמש לניתוב מסמכים." },
        { qHe: "אילו מסמכים זורמים בשילוב טיפוסי?", aHe: "PO (ORDERS), Order Confirmation (ORDRSP), ASN (DESADV) ו-Invoice (INVOIC) — כ-cXML דרך ה-Middleware." },
      ],
      takeawaysHe: [
        "השילוב מדגֵם את כל ה-Source-to-Pay בין קונה לספק.",
        "SAP Business Network = רשת; SAP Ariba = אפליקציות מעליה.",
        "התאמת master-data (UoM/Tax/ANID) היא תנאי-הצלחה.",
        "Onboarding מוקדם ובדיקת-מסמכים מקצה-לקצה מורידים סיכון Go-Live.",
      ],
      relatedHe: [
        { labelHe: "MM · SAP Integration Suite (16.2)", href: "/library/mm/chapter-16/#sub-16.2" },
        { labelHe: "MM · Business Network Commerce (16.2.3)", href: "/library/mm/chapter-16/#sub-16.2.3" },
      ],
    },
    // ============================================================ 16.2
    {
      id: "16.2", titleHe: "SAP Integration Suite, Managed Gateway for Spend Management", titleEn: "SAP Integration Suite, Managed Gateway for Spend Management",
      execHe:
        "SAP Integration Suite, Managed Gateway for Spend Management הוא שכבת-ה-Middleware המנוהלת המחברת את S/4HANA לעולם ה-Spend Management של SAP — Ariba ו-Business Network. הוא מנהל את התרגום, הניתוב והניטור של כל המסמכים העסקיים, כך שהארגון אינו צריך לבנות ולתחזק קישוריות נקודה-לנקודה לכל תרחיש.",
      beginnerHe:
        "כשנציג שתי מערכות שמדברות שפות שונות — S/4HANA מדבר IDoc/SOAP, והרשת מדברת cXML — צריך 'מתורגמן' באמצע. ה-Managed Gateway הוא המתורגמן הזה. הוא 'מנוהל' (Managed) כלומר SAP מפעילה ומתחזקת אותו בענן, ואתה רק מגדיר אותו.",
      consultantHe:
        "ה-Managed Gateway הוא חבילת-תוכן (Integration Content) מוכנה מראש על גבי SAP Integration Suite (Cloud Integration). הוא כולל iFlows מוגדרים-מראש לתרחישי Spend Management, מיפויי-מסמכים סטנדרטיים, וטיפול-שגיאות. היתרון: עדכוני-תוכן מנוהלים על-ידי SAP, פחות תחזוקה עצמית. שים לב להבחנה מול שילוב 'self-managed' שבו הלקוח מתחזק את ה-iFlows.",
      purposeHe:
        "המטרה: לספק תשתית-קישוריות סטנדרטית, מנוהלת ומעודכנת בין S/4HANA לפתרונות ה-Spend Management, ולקצר משמעותית את זמן-המימוש (Time-to-Value) של פרויקטי-שילוב.",
      processExampleHe:
        "מסמך PO יוצא מ-S/4HANA כ-IDoc; ה-Managed Gateway קולט אותו, ממפה ל-cXML לפי תבנית-הסטנדרט, ומנתב אל Business Network. בכיוון-החזרה, חשבונית cXML מתורגמת ל-IDoc INVOIC ונכנסת ל-S/4HANA — הכל דרך iFlows מנוהלים.",
      cbcHe:
        "ב-CBC ה-Managed Gateway משמש כצינור-יחיד לכל זרימות-המסמכים מול ספקי-האריזה והחומרים — הזמנות, אישורים וחשבוניות — עם ניטור מרכזי שמאפשר לצוות-הרכש לעקוב אחר תקיעות.",
      navHe: [
        "SAP Integration Suite ► Cloud Integration ► Manage Integration Content",
        "SAP Business Network ► Administration ► Electronic Order Routing / Integration Settings",
        "SPRO ► Integration with Other SAP Components ► Managed Gateway for Spend Management ► General Settings",
      ],
      tables: ["EDIDC", "EDID4", "SXMSPMAST", "TBD05"],
      tcodes: ["WE20", "WE21", "SXMB_MONI", "SOAMANAGER"],
      fiori: ["F2384", "F1048"],
      configHe: [
        "הפעלת חבילת-התוכן 'SAP S/4HANA Integration with SAP Business Network' ב-Integration Suite.",
        "הגדרת Communication Arrangements / Partner Profiles (WE20) ב-S/4HANA.",
        "הזנת פרטי-חיבור: ANID, אישורי-אבטחה (certificates), endpoints.",
        "הפעלת ניטור והתראות-שגיאה (Alerting) על iFlows.",
      ],
      flow: [
        { he: "IDoc/SOAP יוצא", code: "S/4HANA" },
        { he: "iFlow מנוהל", code: "Cloud Integration" },
        { he: "מיפוי ל-cXML", code: "Managed Gateway" },
        { he: "ניתוב לרשת/חזרה", code: "Business Network" },
      ],
      masterDataHe: [
        "Partner Profiles (WE20) + Ports (WE21) להגדרת זרימת-IDoc.",
        "ANID + Endpoint configuration ברמת ה-Gateway.",
      ],
      mistakesHe: [
        "ערבוב בין מודל Managed ל-self-managed באותו תרחיש.",
        "אי-עדכון אישורי-אבטחה (certificates) שפגי-תוקף ➔ ניתוק חיבור.",
        "חוסר הגדרת Alerting ➔ שגיאות מתגלות מאוחר.",
      ],
      troubleshootHe: [
        "מסמכים לא זורמים ➔ בדוק סטטוס iFlow, certificates ו-Communication Arrangement.",
        "שגיאת-מיפוי ➔ Message Processing Log ב-Cloud Integration.",
        "IDoc תקוע ב-S/4HANA ➔ WE02/WE05 וסטטוס Partner Profile.",
      ],
      bestPracticeHe: [
        "העדף את חבילות-התוכן המנוהלות על-פני iFlows מותאמים-אישית.",
        "תזמן חידוש-אישורים (certificates) מראש כדי למנוע ניתוקים.",
        "הפעל Alerting פרואקטיבי על כל ה-iFlows הקריטיים.",
      ],
      interviewHe: [
        { qHe: "מהו תפקיד ה-Managed Gateway for Spend Management?", aHe: "שכבת-Middleware מנוהלת (על SAP Integration Suite) הממפה, מנתבת ומנטרת מסמכי-Spend בין S/4HANA ל-Ariba/Business Network, עם תוכן מעודכן על-ידי SAP." },
        { qHe: "מה היתרון של מודל 'Managed' מול 'self-managed'?", aHe: "SAP מתחזקת ומעדכנת את תוכן-האינטגרציה, מה שמפחית תחזוקה עצמית ומקצר Time-to-Value." },
      ],
      takeawaysHe: [
        "ה-Managed Gateway = ה-Middleware הסטנדרטי בין S/4HANA ל-Spend Management.",
        "מבוסס iFlows מנוהלים על SAP Integration Suite.",
        "מקצר מימוש ומפחית תחזוקה עצמית.",
      ],
      relatedHe: [
        { labelHe: "MM · פרויקטי שילוב Ariba (16.1)", href: "/library/mm/chapter-16/#sub-16.1" },
      ],
      children: [
        {
          id: "16.2.1", titleHe: "הגדרת SAP Integration Suite, Managed Gateway", titleEn: "Configuring SAP Integration Suite, Managed Gateway",
          execHe: "הגדרת ה-Managed Gateway כוללת הפעלת חבילת-התוכן, הקמת חיבורי-אבטחה והגדרת ה-Partner Profiles בשני הצדדים. זהו השלב הטכני שמפעיל בפועל את זרימת-המסמכים בין S/4HANA לרשת.",
          beginnerHe: "כדי שהמתורגמן יתחיל לעבוד, צריך 'להדליק' אותו: לטעון את חבילת-התוכן המוכנה, לחבר אותה ל-S/4HANA מצד אחד ולרשת מצד שני, ולוודא שהזהויות והאבטחה תקינות.",
          consultantHe: "תהליך: (1) Provisioning של Integration Suite tenant; (2) הפעלת חבילת-התוכן הרלוונטית; (3) הגדרת Communication Arrangement/User ב-S/4HANA; (4) הזנת ANID ו-credentials של Business Network; (5) הקמת certificates ו-security material; (6) בדיקת-קצה. כל iFlow נושא קונפיגורציה (externalized parameters) שמותאמת ללקוח.",
          purposeHe: "להפעיל בפועל את הקישוריות המנוהלת — מהתקנה ועד מסמך-ראשון שזורם — בצורה סטנדרטית, מאובטחת וניתנת-לניטור.",
          processExampleHe: "מהנדס-אינטגרציה מפעיל את חבילת-התוכן, מזין את ה-ANID ואת ה-endpoints, מעלה certificate, ומריץ בדיקת-PO. ה-PO זורם, ובכך מאומת שהגדרת-הקצה תקינה.",
          cbcHe: "ב-CBC צוות-ה-Basis מפעיל את ה-Integration Suite tenant ומחבר אותו ל-Business Network של ספקי-האריזה; iFlow ה-PO נבדק עם ספק-פיילוט אחד לפני הרחבה.",
          navHe: [
            "SAP Integration Suite ► Discover ► Integration Packages ► Copy & Deploy",
            "SAP Integration Suite ► Monitor ► Manage Integration Content",
            "SPRO ► Integration ► Managed Gateway ► Maintain Communication Arrangements",
          ],
          tables: ["EDIDC", "SXMSPMAST"],
          tcodes: ["SOAMANAGER", "WE20", "WE21"],
          fiori: ["F2384"],
          configHe: [
            "Deploy של חבילת-התוכן + הגדרת externalized parameters (ANID, endpoints).",
            "Communication Arrangement + Communication User ב-S/4HANA.",
            "העלאת certificates ו-keystore לאימות הדדי (mutual TLS).",
          ],
          mistakesHe: ["דילוג על externalized parameters ➔ iFlow מפנה ל-endpoint ברירת-מחדל שגוי.", "certificate שגוי/פג ➔ כשל-חיבור מיידי."],
          troubleshootHe: ["iFlow נכשל בהרצה ➔ בדוק parameters, endpoint ו-certificate.", "401/403 ➔ Communication User או credentials שגויים."],
          bestPracticeHe: ["תעד את כל ה-externalized parameters לכל סביבה (Dev/QA/Prod).", "בדוק קצה עם ספק-פיילוט יחיד לפני הרחבה."],
          interviewHe: [
            { qHe: "מהם השלבים העיקריים בהגדרת ה-Managed Gateway?", aHe: "הפעלת חבילת-התוכן, הגדרת Communication Arrangement ב-S/4HANA, הזנת ANID/endpoints, הקמת certificates, ובדיקת-קצה." },
          ],
          takeawaysHe: ["ההגדרה = חבילת-תוכן + Communication Arrangement + certificates.", "externalized parameters מתאימים iFlow ללקוח.", "בדוק קצה לפני הרחבה."],
        },
        {
          id: "16.2.2", titleHe: "שילוב SAP Ariba Strategic Sourcing Suite", titleEn: "SAP Ariba Strategic Sourcing Suite Integration",
          execHe: "SAP Ariba Strategic Sourcing Suite מכסה את החלק האסטרטגי של הרכש — Sourcing (מכרזים), Contracts (חוזים) ו-Supplier Management. שילובו עם S/4HANA מחבר חוזים ומחירי-מכרז שנקבעו ב-Ariba אל ה-Purchasing הפעולתי ב-S/4HANA.",
          beginnerHe: "לפני שקונים, צריך להחליט ממי ובאיזה מחיר — זה החלק האסטרטגי: מכרזים וחוזים. SAP Ariba Strategic Sourcing עושה את זה, ואז מעביר את התוצאה (חוזה, מחיר) ל-S/4HANA כדי שההזמנות בפועל יישענו עליו.",
          consultantHe: "השילוב מזרים נתוני-מאסטר ותוצאות: חוזה ב-Ariba Contracts יכול להפוך ל-Outline Agreement / Contract ב-S/4HANA (או לשמש כמקור-מחיר), נתוני-ספק מסונכרנים, ו-Sourcing awards מזינים Info Records. שים לב לכיווניות: לרוב Ariba הוא ה-system-of-record לחוזה האסטרטגי, ו-S/4HANA לביצוע.",
          purposeHe: "לחבר את ההחלטות האסטרטגיות (ממי לקנות ובאיזה תנאי) לביצוע הפעולתי (הזמנות וחשבוניות), כך שכל רכישה תישען על חוזה ומחיר מאושרים.",
          processExampleHe: "מכרז ב-Ariba Sourcing מסתיים ב-award לספק; נוצר חוזה ב-Ariba Contracts; החוזה/המחיר מסונכרן ל-S/4HANA כ-Outline Agreement; הזמנות-רכש עתידיות מתייחסות אליו אוטומטית.",
          cbcHe: "ב-CBC מכרז שנתי לבקבוקי-PET מתנהל ב-Ariba Sourcing; החוזה הזוכה מסונכרן ל-S/4HANA, וכל הזמנות-המילוי נשענות על מחיר-החוזה.",
          navHe: [
            "SAP Ariba ► Sourcing ► Events / Awards",
            "SAP Ariba ► Contracts ► Contract Workspaces",
            "S/4HANA ► Materials Management ► Purchasing ► Outline Agreement ► Contract (ME31K)",
          ],
          tables: ["EKKO", "EKPO", "EINA", "EINE"],
          tcodes: ["ME31K", "ME32K", "ME33K", "ME11"],
          fiori: ["F1600", "F1982"],
          configHe: [
            "הגדרת תרחיש-שילוב Strategic Sourcing דרך ה-Managed Gateway.",
            "מיפוי Ariba Contract ↔ S/4HANA Outline Agreement / Info Record.",
            "סנכרון נתוני-ספק ו-commodity codes בין המערכות.",
          ],
          mistakesHe: ["סנכרון חד-פעמי בלבד של חוזים ➔ פערי-מחיר עם הזמן.", "ערבוב system-of-record — שני הצדדים 'בעלים' של החוזה."],
          troubleshootHe: ["מחיר-חוזה לא חל על PO ➔ בדוק מיפוי Outline Agreement/Info Record ותוקף.", "חוזה לא מסונכרן ➔ סטטוס iFlow ושדות-חובה חסרים."],
          bestPracticeHe: ["קבע system-of-record יחיד לחוזה האסטרטגי.", "סנכרן חוזים אוטומטית ולא ידנית."],
          interviewHe: [
            { qHe: "מה כולל SAP Ariba Strategic Sourcing Suite?", aHe: "Sourcing (מכרזים), Contracts (חוזים) ו-Supplier Management — החלק האסטרטגי של הרכש, להבדיל מהביצוע הפעולתי ב-S/4HANA." },
            { qHe: "כיצד חוזה Ariba משפיע על S/4HANA?", aHe: "הוא מסונכרן כ-Outline Agreement / מקור-מחיר, וכל הזמנות-הרכש העתידיות נשענות על תנאיו." },
          ],
          takeawaysHe: ["Strategic Sourcing = Sourcing + Contracts + Supplier Management.", "Ariba = אסטרטגי; S/4HANA = ביצוע.", "סנכרן חוזים אוטומטית עם system-of-record יחיד."],
        },
        {
          id: "16.2.3", titleHe: "אוטומציית סחר ב-SAP Business Network", titleEn: "SAP Business Network Commerce Automation",
          execHe: "Commerce Automation הוא תרחיש ה-Business Network הקלאסי: אוטומציה של מחזור ה-Procure-to-Pay התפעולי — PO, אישור-הזמנה, משלוח (ASN) וחשבונית — בין קונה לספק, עם התאמה אוטומטית (matching) ותשלום.",
          beginnerHe: "זהו 'הדואר האוטומטי' של הרכש היומיומי: הזמנה יוצאת, הספק מאשר, שולח, ושולח חשבונית — והכל מתבצע ומתאים את עצמו אוטומטית בלי הקלדה-מחדש.",
          consultantHe: "התרחיש מכסה את מסמכי ה-cXML: OrderRequest, ConfirmationRequest, ShipNoticeRequest, InvoiceDetailRequest. ה-Business Network אוכף כללי-validation (למשל Invoice rules נגד ה-PO) לפני שהחשבונית מגיעה ל-S/4HANA, מה שמפחית דחיות. תומך גם ב-Service Sheets ו-Goods Receipt-based invoicing.",
          purposeHe: "להפוך את הרכש התפעולי (Procure-to-Pay) לאוטומטי, מהיר ונקי-משגיאות — מ-PO ועד תשלום — עם נראות-סטטוס לשני הצדדים.",
          processExampleHe: "PO זורם לספק; הספק מאשר ושולח ASN; הסחורה מתקבלת ב-S/4HANA (GR); הספק שולח חשבונית; ה-Business Network מאמת מול ה-PO/GR (3-way) ומעביר ל-S/4HANA לתשלום אוטומטי.",
          cbcHe: "ב-CBC כל הזמנות חומרי-האריזה השוטפות עוברות ב-Commerce Automation; ASN מספק מעדכן את חלון-הקבלה במחסן, וחשבוניות מאומתות-מראש מצמצמות חריגות-תשלום.",
          navHe: [
            "SAP Business Network ► Workbench ► Orders / Invoices",
            "SAP Business Network ► Administration ► Transaction Rules (Invoice/Order Rules)",
            "S/4HANA ► Logistics Invoice Verification ► Enter Invoice (MIRO)",
          ],
          tables: ["EKKO", "EKPO", "EKBE", "RBKP", "RSEG"],
          tcodes: ["ME21N", "MIGO", "MIRO", "MRBR"],
          fiori: ["F0842A", "F1982", "F0859"],
          configHe: [
            "הגדרת Document Scope (Order, Confirmation, ASN, Invoice, Service Sheet).",
            "Transaction Rules ב-Business Network (Invoice rules נגד ה-PO).",
            "מיפוי GR-based / PO-based invoice verification ל-S/4HANA.",
          ],
          mistakesHe: ["Invoice rules רפויים ➔ חשבוניות-שגיאה מגיעות ל-S/4HANA.", "אי-הפעלת ASN ➔ אובדן נראות-משלוח."],
          troubleshootHe: ["חשבונית נדחית ב-MIRO ➔ אי-התאמת PO/GR (3-way) או Tax.", "ASN לא יוצר נראות ➔ מיפוי DESADV/פריט."],
          bestPracticeHe: ["הדק Invoice rules ברשת כדי לתפוס שגיאות לפני S/4HANA.", "הפעל ASN לקבלת נראות-משלוח מלאה."],
          interviewHe: [
            { qHe: "מהו Commerce Automation?", aHe: "תרחיש Business Network לאוטומציית Procure-to-Pay תפעולי — PO, אישור, ASN וחשבונית — עם validation והתאמה אוטומטית." },
            { qHe: "כיצד Transaction Rules מפחיתות דחיות-חשבונית?", aHe: "הן אוכפות validation ברשת (מול ה-PO) לפני שהחשבונית מגיעה ל-S/4HANA, כך ששגיאות נתפסות מוקדם." },
          ],
          takeawaysHe: ["Commerce Automation = P2P תפעולי אוטומטי.", "מסמכי cXML: Order/Confirmation/ShipNotice/Invoice.", "Transaction Rules ברשת מפחיתות דחיות."],
          relatedHe: [{ labelHe: "MM · פרויקטי שילוב Ariba (16.1)", href: "/library/mm/chapter-16/#sub-16.1" }],
        },
      ],
    },
    // ============================================================ 16.3
    {
      id: "16.3", titleHe: "SAP Business Network Supply Chain Collaboration", titleEn: "SAP Business Network Supply Chain Collaboration",
      execHe:
        "SAP Business Network Supply Chain Collaboration (SCC) מרחיב את הרשת מעבר לרכש עקיף אל שיתוף-פעולה ישיר בשרשרת-האספקה: שיתוף תחזיות, ניהול מלאי-בבעלות-ספק (consignment), Subcontracting ושיתוף איכות. הוא מחבר את MRP ואת הייצור של S/4HANA לספקי-החומרים בזמן-אמת.",
      beginnerHe:
        "ברכש רגיל אתה רק מזמין ומקבל. ב-Supply Chain Collaboration אתה גם משתף עם הספק את התחזית שלך ('אצטרך כך-וכך בחודש הבא'), את רמות-המלאי, ואת רכיבי ה-Subcontracting — כך שהספק מתכנן יחד איתך ולא רק מגיב.",
      consultantHe:
        "SCC תומך בתרחישי Direct procurement: Forecast collaboration, Purchase Order collaboration, Scheduling Agreement releases (SA), Consignment, Subcontracting (כולל רכיבים מסופקים), Quality collaboration ו-Returns. הזרימה מבוססת cXML/OAGIS ומסונכרנת מול MRP. שים לב להבדל מ-Commerce Automation: כאן הדגש על חומרים-ישירים ועל תכנון-משותף, לא רק על מסמכי-רכש בודדים.",
      purposeHe:
        "לקצר את שרשרת-האספקה הישירה: לתת לספקים נראות-תחזית מוקדמת, לסנכרן אספקות מול קווי-הייצור, ולנהל Subcont, Consignment ואיכות ברשת אחת — להפחית מחסור ועודף.",
      processExampleHe:
        "MRP ב-S/4HANA מפיק תחזית-דרישות לחומר-גלם; התחזית משותפת לספק דרך ה-Business Network; הספק מתחייב לכמויות; Scheduling Agreement releases זורמים אוטומטית; הספק שולח ASN שמסונכרן עם הקבלה.",
      cbcHe:
        "ב-CBC תחזית-הדרישות לתרכיז ולסוכר משותפת לספקים דרך SCC; הספקים מתכננים אספקה לקווי-המילוי, ומלאי-Consignment של חומרי-אריזה מנוהל ברשת עם משיכה לפי-צריכה.",
      navHe: [
        "SAP Business Network ► Supply Chain Collaboration ► Planning / Orders / Quality",
        "S/4HANA ► MRP ► Scheduling Agreement (ME31L / ME38)",
        "SPRO ► Integration ► Business Network ► Supply Chain Collaboration ► Scenario Settings",
      ],
      tables: ["EKKO", "EKPO", "EKET", "RESB", "MDKP"],
      tcodes: ["ME31L", "ME38", "ME2O", "MD04", "MIGO"],
      fiori: ["F0842A", "F2228", "F1421"],
      configHe: [
        "הפעלת תרחישי SCC: Forecast, PO, SA release, Consignment, Subcontracting, Quality.",
        "מיפוי Scheduling Agreement releases ל-cXML/OAGIS.",
        "הגדרת Consignment ו-Subcontracting component visibility.",
      ],
      flow: [
        { he: "תחזית MRP", code: "MD04", note: "S/4HANA" },
        { he: "שיתוף תחזית", code: "Business Network SCC" },
        { he: "התחייבות-ספק", code: "Commit" },
        { he: "SA release / ASN", code: "ME38/DESADV" },
        { he: "קבלה + סנכרון", code: "MIGO" },
      ],
      masterDataHe: [
        "Scheduling Agreement (EKKO/EKPO/EKET) כבסיס לשחרורי-אספקה.",
        "Subcontracting BOM components (RESB) הנשלחים לספק.",
        "Consignment Info Records לניהול מלאי-בבעלות-ספק.",
      ],
      mistakesHe: [
        "שיתוף-תחזית בלי תהליך-התחייבות ➔ הספק לא מחויב לכמויות.",
        "Subcontracting בלי נראות-רכיבים ➔ הספק חסר חומרים.",
        "ערבוב SCC עם Commerce Automation בלי הבחנת-תרחיש.",
      ],
      troubleshootHe: [
        "Release לא מגיע לספק ➔ בדוק Scheduling Agreement, scope ו-iFlow.",
        "מלאי-Consignment לא מתעדכן ➔ מיפוי תנועות-Consignment.",
        "רכיבי-Subcontract חסרים ➔ נראות-רכיבים לא הופעלה.",
      ],
      bestPracticeHe: [
        "שלב תחזית עם תהליך-התחייבות (commit) מסודר.",
        "הפעל נראות-רכיבים מלאה ל-Subcontracting.",
        "הבחן ברור בין תרחישי SCC ל-Commerce Automation.",
      ],
      interviewHe: [
        { qHe: "במה שונה SCC מ-Commerce Automation?", aHe: "Commerce Automation מתמקד ברכש תפעולי (P2P) ובמסמכים בודדים; SCC מתמקד בחומרים-ישירים ובתכנון-משותף — תחזית, Consignment, Subcontracting ואיכות מסונכרנים מול MRP." },
        { qHe: "אילו תרחישים נתמכים ב-SCC?", aHe: "Forecast collaboration, PO collaboration, Scheduling Agreement releases, Consignment, Subcontracting, Quality collaboration ו-Returns." },
      ],
      takeawaysHe: [
        "SCC = שיתוף-פעולה בשרשרת-אספקה ישירה, לא רק רכש.",
        "מסנכרן תחזית/Consignment/Subcontracting מול MRP.",
        "שונה מ-Commerce Automation בהיותו תכנון-משותף לחומרים-ישירים.",
      ],
      relatedHe: [
        { labelHe: "MM · Business Network ללוגיסטיקה (16.4)", href: "/library/mm/chapter-16/#sub-16.4" },
      ],
      children: [
        {
          id: "16.3.1", titleHe: "פונקציונליות המוצר", titleEn: "Product Functionality",
          execHe: "הפונקציונליות של SCC מתפרסת על-פני שיתוף-תחזית, שחרורי-לוח-זמנים, ניהול-Consignment, Subcontracting ושיתוף-איכות — סט-יכולות מובנה המכסה את כל מחזור החומר-הישיר מול הספק.",
          beginnerHe: "המוצר מגיע עם 'ארגז-כלים' של תרחישים מוכנים: לשתף תחזית, לשלוח שחרורי-אספקה, לנהל מלאי-ספק, לשלוח רכיבים ל-Subcontract ולשתף נתוני-איכות. אינך בונה אותם מאפס.",
          consultantHe: "כל תרחיש הוא 'collaboration document type' עם מצב (status) משותף לשני הצדדים: Forecast, Order, Schedule Line, Receipt, Consignment Movement, Quality Notification. המידע דו-כיווני ומשקף את ה-S/4HANA כמעט בזמן-אמת. ה-Workbench מספק תצוגות-חריגה (exceptions) להתערבות מהירה.",
          purposeHe: "לספק יכולות-שיתוף מוכנות-לשימוש לכל שלב במחזור-החומר-הישיר, כדי לקצר מימוש ולסטנדרט את שיתוף-הפעולה.",
          processExampleHe: "ספק נכנס ל-Workbench, רואה תחזית מעודכנת, מתחייב לכמויות, צופה ב-schedule lines, מאשר משלוח ושולח ASN — הכל מתוך ממשק-רשת אחד.",
          cbcHe: "ב-CBC ספק-הסוכר משתמש ב-Workbench לצפייה בתחזית-הדרישות ולהתחייבות לאספקה שבועית לקווי-המילוי.",
          navHe: ["SAP Business Network ► Supply Chain Collaboration ► Workbench (Planning/Orders/Quality/Consignment)"],
          tables: ["EKET", "RESB", "QMEL"],
          tcodes: ["MD04", "ME38", "ME2O"],
          fiori: ["F2228", "F1421"],
          configHe: ["הפעלת ה-collaboration document types הרצויים.", "הגדרת Workbench views ו-exception thresholds."],
          mistakesHe: ["הפעלת כל התרחישים בבת-אחת ➔ עומס על הספקים.", "אי-הגדרת exception views ➔ חריגות לא-מטופלות."],
          troubleshootHe: ["ספק לא רואה תחזית ➔ scope/הרשאה ל-document type.", "חריגה לא-מוצגת ➔ thresholds לא הוגדרו."],
          bestPracticeHe: ["הפעל תרחישים בהדרגה לפי בשלות-ספק.", "הגדר exception views ממוקדות."],
          interviewHe: [{ qHe: "מהי 'collaboration document type'?", aHe: "ישות-שיתוף עם סטטוס משותף לקונה ולספק (Forecast/Order/Schedule/Consignment/Quality), המשקפת את S/4HANA כמעט בזמן-אמת." }],
          takeawaysHe: ["סט-יכולות מובנה לכל מחזור החומר-הישיר.", "Workbench דו-כיווני עם תצוגות-חריגה.", "הפעל בהדרגה."],
        },
        {
          id: "16.3.2", titleHe: "קונפיגורציה", titleEn: "Configuration",
          execHe: "קונפיגורציית SCC כוללת הפעלת התרחישים ב-S/4HANA וב-Business Network, מיפוי מסמכי-תכנון/אספקה, והגדרת ה-Scheduling Agreements כבסיס. ההגדרה מקשרת את MRP אל הרשת.",
          beginnerHe: "כדי שהשיתוף יעבוד, מגדירים בשני הצדדים אילו תרחישים פעילים, איך כל מסמך ממופה, ומחברים את הסכמי-האספקה (Scheduling Agreements) שמהם נגזרים שחרורי-האספקה.",
          consultantHe: "שלבים: (1) הפעלת scope ב-Business Network admin; (2) הגדרת iFlows ב-Managed Gateway לתרחישי SCC; (3) הקמת Scheduling Agreements (ME31L) + output ל-SA release; (4) מיפוי Consignment/Subcontracting movements; (5) בדיקת סנכרון מול MD04. שים לב להתאמת לוחות-זמנים (delivery schedule lines, EKET) ולתזמון השחרורים.",
          purposeHe: "להפעיל בפועל את תרחישי שיתוף-הפעולה ולחבר אותם לתכנון (MRP) ולמסמכי-האספקה, כך שהשיתוף ישקף נתוני-אמת.",
          processExampleHe: "יועץ מפעיל את תרחיש Forecast+SA, מקים Scheduling Agreement, מגדיר output ל-release, ובודק ש-schedule lines מ-EKET זורמים לרשת ושה-ASN חוזר ומסנכרן את הקבלה.",
          cbcHe: "ב-CBC מוקמים Scheduling Agreements לתרכיז ולסוכר עם output ל-Business Network; ה-iFlows ל-SA release ול-ASN נבדקים עם ספק-פיילוט.",
          navHe: [
            "SAP Business Network ► Administration ► Supply Chain Collaboration Scope",
            "S/4HANA ► MRP ► Scheduling Agreement (ME31L) ► Maintain Delivery Schedule (ME38)",
          ],
          tables: ["EKKO", "EKPO", "EKET", "RESB"],
          tcodes: ["ME31L", "ME38", "ME2O", "MD04"],
          fiori: ["F1421", "F2228"],
          configHe: [
            "הפעלת scope ב-Business Network + iFlows ל-SCC ב-Managed Gateway.",
            "הקמת Scheduling Agreement (ME31L) + output type ל-SA release.",
            "מיפוי Consignment ו-Subcontracting movements ל-cXML.",
          ],
          mistakesHe: ["output ל-SA release לא הוגדר ➔ שחרורים לא יוצאים.", "delivery schedule lines לא מתוחזקים ➔ אין מה לשתף."],
          troubleshootHe: ["SA release לא יוצא ➔ output type/condition records או iFlow.", "schedule line לא מסונכרן ➔ EKET/מיפוי DESADV."],
          bestPracticeHe: ["בסס SCC על Scheduling Agreements עם output מסודר.", "בדוק סנכרון EKET↔רשת לפני production."],
          interviewHe: [{ qHe: "מהו הבסיס למסמכי-האספקה ב-SCC?", aHe: "Scheduling Agreement (ME31L) עם delivery schedule lines (EKET); ה-SA releases זורמים לרשת והספק מגיב ב-ASN." }],
          takeawaysHe: ["הקונפיגורציה מקשרת MRP ↔ רשת.", "Scheduling Agreement + output = בסיס השחרורים.", "בדוק סנכרון לפני production."],
          relatedHe: [{ labelHe: "MM · הגדרת Managed Gateway (16.2.1)", href: "/library/mm/chapter-16/#sub-16.2.1" }],
        },
      ],
    },
    // ============================================================ 16.4
    {
      id: "16.4", titleHe: "SAP Business Network for Logistics", titleEn: "SAP Business Network for Logistics",
      execHe:
        "SAP Business Network for Logistics מרחיב את הרשת אל שיתוף-פעולה לוגיסטי: ניהול-מובילים (carriers), נראות-משלוחים בזמן-אמת (Freight Collaboration / Global Track and Trace) וחיבור ל-Transportation Management. הוא מחבר את שלב ההובלה והקבלה אל אותה רשת-מסחר.",
      beginnerHe:
        "אחרי שהספק שלח את הסחורה, מי מוביל אותה? SAP Business Network for Logistics מחבר את חברות-ההובלה — כדי שתדע איפה המשלוח עכשיו, מתי יגיע, ואיך הוא מתקדם, בזמן-אמת.",
      consultantHe:
        "הפתרון משלב Freight Collaboration עם מובילים ו-Global Track and Trace לנראות-אירועים (events) לאורך המסלול. הוא מתממשק ל-SAP Transportation Management (TM) ול-S/4HANA Logistics, ומבוסס על שיתוף סטטוסי-משלוח (milestones) ומסמכי-הובלה. שים לב לתלות ב-master-data של locations, carriers ו-tracked objects.",
      purposeHe:
        "לתת נראות מקצה-לקצה על תנועת-הסחורה — מהספק, דרך המוביל, ועד הקבלה — כדי לשפר תכנון-קבלה, לזהות עיכובים מוקדם ולתאם בין כל הצדדים בשרשרת.",
      processExampleHe:
        "משלוח יוצא מהספק; המוביל מדווח milestones (Picked up, In transit, Customs, Delivered) דרך Global Track and Trace; S/4HANA/TM מציג ETA מעודכן; מחסן-הקבלה מתכנן את חלון-הפריקה בהתאם.",
      cbcHe:
        "ב-CBC משלוחי חומרי-אריזה ותרכיז ממובילים בינלאומיים מנוטרים ב-Track and Trace; ETA מעודכן מאפשר ל-CBC לתזמן את קבלות-המחסן ולמנוע צווארי-בקבוק בקווי-המילוי.",
      navHe: [
        "SAP Business Network ► Logistics ► Freight Collaboration / Track and Trace",
        "S/4HANA ► Transportation Management ► Freight Order Management",
        "SPRO ► Integration ► Business Network for Logistics ► Connectivity Settings",
      ],
      tables: ["VTTK", "VTTP", "VTTS", "LIKP"],
      tcodes: ["VT01N", "VT02N", "VL31N", "VL32N"],
      fiori: ["F0286", "F3702"],
      configHe: [
        "חיבור carriers + locations כ-tracked objects ב-Track and Trace.",
        "מיפוי milestones / events לאורך מסלול-ההובלה.",
        "אינטגרציה ל-SAP TM / S/4HANA Logistics לעדכון ETA.",
      ],
      flow: [
        { he: "יצירת משלוח", code: "VL31N", note: "Inbound" },
        { he: "שיתוף עם מוביל", code: "Freight Collaboration" },
        { he: "milestones בזמן-אמת", code: "Track and Trace" },
        { he: "ETA ל-TM/S4", code: "Freight Order" },
        { he: "תכנון-קבלה", code: "MIGO" },
      ],
      masterDataHe: [
        "Carrier master + transportation lanes/locations.",
        "Tracked objects (Freight Orders / Deliveries) ל-event visibility.",
      ],
      mistakesHe: [
        "חוסר master-data של locations/carriers ➔ אין נראות.",
        "אי-מיפוי milestones ➔ אירועים לא מוצגים.",
      ],
      troubleshootHe: [
        "אין נראות-משלוח ➔ בדוק tracked object, carrier connectivity ומיפוי-events.",
        "ETA לא מתעדכן ➔ אינטגרציית TM/event לא פעילה.",
      ],
      bestPracticeHe: [
        "ייצב master-data של carriers/locations לפני הפעלה.",
        "הגדר סט-milestones אחיד לכל המובילים.",
      ],
      interviewHe: [
        { qHe: "מה מספק SAP Business Network for Logistics?", aHe: "שיתוף-פעולה עם מובילים ונראות-משלוחים בזמן-אמת (Freight Collaboration / Global Track and Trace), מחובר ל-SAP TM ול-S/4HANA Logistics." },
        { qHe: "מהם milestones בהקשר זה?", aHe: "אירועי-מסלול (Picked up, In transit, Customs, Delivered) המשותפים על-ידי המוביל ומעדכנים ETA ונראות." },
      ],
      takeawaysHe: [
        "מרחיב את הרשת אל שלב ההובלה והנראות.",
        "Freight Collaboration + Track and Trace = ETA בזמן-אמת.",
        "תלוי ב-master-data של carriers/locations.",
      ],
      relatedHe: [
        { labelHe: "MM · Supply Chain Collaboration (16.3)", href: "/library/mm/chapter-16/#sub-16.3" },
      ],
    },
    // ============================================================ 16.5
    {
      id: "16.5", titleHe: "SAP Business Network for Asset Management", titleEn: "SAP Business Network for Asset Management",
      execHe:
        "SAP Business Network for Asset Management הוא רשת לשיתוף-פעולה סביב נכסים וציוד: שיתוף מידע-ציוד, מסמכי-תחזוקה, חלקי-חילוף ומפרטים בין בעלי-הנכסים, היצרנים ונותני-השירות. הוא מחבר את עולם ה-PM/EAM אל הרשת.",
      beginnerHe:
        "כל מכונה או ציוד מגיע עם המון מידע — מפרטים, מדריכי-תחזוקה, רשימת חלקי-חילוף. במקום שכל חברה תנהל את זה לבד, הרשת מאפשרת לבעל-הנכס, ליצרן ולטכנאי לשתף את אותו מידע-ציוד מהימן ומעודכן.",
      consultantHe:
        "הפתרון (לשעבר Asset Intelligence Network) מנהל 'equipment models' ו-'equipment instances' משותפים, עם מסמכים, מאפיינים והוראות-תחזוקה. הוא מתממשק ל-S/4HANA Asset Management (EAM) ולציוד (EQUI), ומאפשר שיתוף בין יצרן-הציוד למפעיל. שימושי לשרשראות-אספקה של חלפים ולתחזוקה-מבוססת-יצרן.",
      purposeHe:
        "ליצור 'מקור-אמת יחיד' למידע-ציוד לאורך מחזור-חייו, לשתפו בין כל בעלי-העניין, ולקשר תחזוקה וחלקי-חילוף לרשת-הספקים — להפחית downtime ולשפר אמינות.",
      processExampleHe:
        "יצרן-מכונה מפרסם equipment model ברשת; CBC מחבר את ה-EQUI ב-S/4HANA למודל; הוראות-תחזוקה וחלקי-חילוף מסונכרנים; כשנדרש חלף, ההזמנה זורמת לספק דרך אותה רשת.",
      cbcHe:
        "ב-CBC קווי-המילוי וממלאות-הבקבוקים רשומים כ-equipment ב-EAM; חיבורם ל-Asset Management network מאפשר קבלת עדכוני-מפרט מהיצרן ורכש-חלפים מהיר דרך הרשת — קריטי לזמינות-קו גבוהה.",
      navHe: [
        "SAP Business Network ► Asset Management ► Equipment Models / Instances",
        "S/4HANA ► Asset Management (EAM) ► Equipment (IE01/IE02)",
        "SPRO ► Plant Maintenance ► Integration ► Business Network for Asset Management",
      ],
      tables: ["EQUI", "EQKT", "ILOA", "IFLOT"],
      tcodes: ["IE01", "IE02", "IE03", "IL01"],
      fiori: ["F2929", "F1828"],
      configHe: [
        "חיבור EQUI ב-S/4HANA ל-equipment instance ברשת.",
        "סנכרון מסמכי-ציוד, מאפיינים והוראות-תחזוקה.",
        "מיפוי חלקי-חילוף לרכש דרך Business Network.",
      ],
      masterDataHe: [
        "Equipment (EQUI/EQKT) + Functional Location (IFLOT) כעוגן.",
        "Equipment model ↔ instance mapping בין יצרן למפעיל.",
      ],
      mistakesHe: [
        "אי-קישור EQUI למודל ➔ אין סנכרון מידע-יצרן.",
        "ניהול-כפול של מפרטים בתוך ומחוץ לרשת.",
      ],
      troubleshootHe: [
        "מידע-ציוד לא מתעדכן ➔ קישור EQUI↔instance או scope-סנכרון.",
        "חלף לא נמצא ➔ מיפוי spare-part לרשת חסר.",
      ],
      bestPracticeHe: [
        "קבע את הרשת כמקור-אמת למפרטי-ציוד.",
        "קשר כל ציוד-קריטי ל-instance ברשת.",
      ],
      interviewHe: [
        { qHe: "מה מטרת SAP Business Network for Asset Management?", aHe: "ליצור מקור-אמת משותף למידע-ציוד (מפרטים, תחזוקה, חלפים) בין בעלי-נכסים, יצרנים ונותני-שירות, מחובר ל-EAM ול-EQUI." },
        { qHe: "כיצד הוא מתחבר ל-S/4HANA?", aHe: "דרך קישור ה-Equipment (EQUI) ב-EAM ל-equipment instance ברשת, וסנכרון מסמכים/חלפים." },
      ],
      takeawaysHe: [
        "רשת לשיתוף מידע-ציוד לאורך מחזור-חייו.",
        "מחברת EAM/EQUI אל היצרן ונותני-השירות.",
        "מקצרת רכש-חלפים ומשפרת זמינות-נכס.",
      ],
      relatedHe: [
        { labelHe: "MM · Business Network ללוגיסטיקה (16.4)", href: "/library/mm/chapter-16/#sub-16.4" },
      ],
    },
    // ============================================================ 16.6
    {
      id: "16.6", titleHe: "SAP Fieldglass", titleEn: "SAP Fieldglass",
      execHe:
        "SAP Fieldglass היא פלטפורמת-ענן לניהול כוח-עבודה חיצוני (External Workforce) ושירותים: עובדים-זמניים (Contingent Workers), קבלני-שירות (SOW — Statement of Work) ושירותים-מנוהלים. שילובה עם S/4HANA מחבר את ההוצאה על כוח-אדם-חיצוני אל ה-Procurement וה-Finance.",
      beginnerHe:
        "לא כל מי שעובד בארגון הוא עובד-קבוע. יש קבלנים, עובדי-קבלן וספקי-שירות. SAP Fieldglass מנהל את כל ה'כוח-אדם החיצוני' הזה — מי הוזמן, כמה שעות עבד, וכמה זה עולה — ומחבר את זה למערכת-הרכש והכספים.",
      consultantHe:
        "Fieldglass מנהל את מחזור ה-Procure-to-Pay של שירותים: דרישה ➔ פרסום ➔ בחירת-ספק ➔ אישור-שעות (time sheets) ➔ חשבונית. השילוב עם S/4HANA יוצר Purchase Orders / Service Entry Sheets ומזרים חשבוניות-שירות. תרחישים: Contingent Workforce Management (CWM) ו-Services Procurement (SOW). שים לב לחיבור ל-Cost Centers וב-WBS לחיוב-עלות נכון.",
      purposeHe:
        "לתת נראות ובקרה על ההוצאה הגדלה על כוח-אדם-חיצוני ושירותים — לאכוף תהליכי-רכש, לאמת שעות ותפוקות, ולחייב-עלות נכון, במקום הוצאה לא-מנוהלת.",
      processExampleHe:
        "מנהל יוצר דרישה ל-2 מפתחי-קבלן ב-Fieldglass; ספקי-כוח-אדם מציעים מועמדים; לאחר בחירה נוצר PO/Work Order; העובד מדווח שעות; ה-time sheet המאושר יוצר Service Entry Sheet וחשבונית ב-S/4HANA.",
      cbcHe:
        "ב-CBC עובדי-תחזוקה קבלניים וצוותי-פרויקט להקמת-קווים מנוהלים ב-Fieldglass; שעותיהם מאומתות ומחויבות ל-Cost Centers / WBS של הפרויקט ב-S/4HANA דרך Service Entry Sheets.",
      navHe: [
        "SAP Fieldglass ► Procurement ► Work Orders / SOW",
        "S/4HANA ► MM ► Service Procurement ► Service Entry Sheet (ML81N)",
        "SPRO ► Integration ► SAP Fieldglass ► Connectivity & Account Determination",
      ],
      tables: ["EKKO", "EKPO", "ESSR", "ESLL", "ML_ESLL"],
      tcodes: ["ME21N", "ML81N", "MIRO", "ME23N"],
      fiori: ["F1645", "F0842A"],
      configHe: [
        "הגדרת תרחיש CWM / SOW ומיפוי ל-PO/Service Entry Sheet.",
        "מיפוי Cost Center / WBS / G/L לחיוב-עלות.",
        "חיבור Fieldglass ↔ S/4HANA דרך Middleware (Integration Suite).",
      ],
      flow: [
        { he: "דרישת-שירות/עובד", code: "Fieldglass" },
        { he: "בחירת-ספק + Work Order", code: "PO" },
        { he: "דיווח-שעות", code: "Time Sheet" },
        { he: "אישור ➔ SES", code: "ML81N" },
        { he: "חשבונית", code: "MIRO" },
      ],
      masterDataHe: [
        "Service master / activity ל-SOW.",
        "Cost Center / WBS / G/L לחיוב-עלות נכון.",
      ],
      mistakesHe: [
        "חוסר מיפוי Cost Center/WBS ➔ עלות לא-מחויבת נכון.",
        "אישור-שעות ללא בקרה ➔ הוצאה לא-מנוהלת.",
      ],
      troubleshootHe: [
        "SES לא נוצר ➔ מיפוי time-sheet↔SES או scope-שילוב.",
        "חשבונית לא תואמת ➔ אי-התאמת SES/PO.",
      ],
      bestPracticeHe: [
        "אכוף חיוב-עלות (Cost Center/WBS) בכל Work Order.",
        "הפרד תרחישי CWM (עובדים) מ-SOW (תפוקות) בקונפיגורציה.",
      ],
      interviewHe: [
        { qHe: "מה מנהל SAP Fieldglass?", aHe: "כוח-עבודה חיצוני ושירותים — Contingent Workers (CWM) ו-Statement of Work (SOW) — מדרישה ועד חשבונית, מחובר ל-Procurement של S/4HANA." },
        { qHe: "מה ההבדל בין CWM ל-SOW?", aHe: "CWM מנהל עובדים-זמניים לפי שעות; SOW מנהל פרויקטי-שירות לפי תפוקות/אבני-דרך — שני תרחישי-שילוב שונים." },
      ],
      takeawaysHe: [
        "Fieldglass = ניהול כוח-עבודה חיצוני ושירותים.",
        "שני תרחישים: CWM (עובדים) ו-SOW (תפוקות).",
        "מתחבר ל-S/4HANA דרך PO/Service Entry Sheet עם חיוב-עלות.",
      ],
      relatedHe: [
        { labelHe: "MM · SAP SuccessFactors (16.7)", href: "/library/mm/chapter-16/#sub-16.7" },
      ],
      children: [
        {
          id: "16.6.1", titleHe: "טכנולוגיות מפתח", titleEn: "Key Technologies",
          execHe: "השילוב של Fieldglass נשען על טכנולוגיות-קישוריות: SAP Integration Suite כ-Middleware, ממשקי-SOAP/REST API, ומיפוי-מסמכים בין Work Orders/Time Sheets לבין PO/Service Entry Sheet — תשתית המאפשרת זרימה אוטומטית ומאובטחת.",
          beginnerHe: "כדי ש-Fieldglass ו-S/4HANA ידברו, צריך 'צינורות' טכניים: ממשקי-API שמעבירים נתונים, מתורגמן (Integration Suite) שממפה ביניהם, ואבטחה שמוודאת שרק הצדדים הנכונים מדברים.",
          consultantHe: "הרכיבים: SAP Integration Suite (Cloud Integration) עם iFlows מוכנים, SOAP/REST APIs של Fieldglass ושל S/4HANA, OAuth/certificates לאימות, ו-message mapping (Work Order↔PO, Time Sheet↔SES, Invoice↔INVOIC). חבילות-תוכן מוכנות מקצרות מימוש. שים לב ל-error handling ול-monitoring ברמת ה-iFlow.",
          purposeHe: "לספק את התשתית-הטכנית המאובטחת והסטנדרטית שמאפשרת זרימת-נתונים אוטומטית בין Fieldglass ל-S/4HANA, עם ניטור וטיפול-שגיאות.",
          processExampleHe: "time sheet מאושר ב-Fieldglass מפעיל קריאת-API; iFlow ב-Integration Suite ממפה אותו ל-Service Entry Sheet ומזרים ל-S/4HANA דרך SOAP — אוטומטית ומאובטחת.",
          cbcHe: "ב-CBC צוות-ה-Basis מפעיל את חבילת-התוכן של Fieldglass ב-Integration Suite, מגדיר OAuth ו-endpoints, ובודק זרימת time-sheet↔SES עם ספק-פיילוט.",
          navHe: ["SAP Integration Suite ► Cloud Integration ► Fieldglass Integration Package", "SAP Fieldglass ► Integration ► Connectors / API"],
          tables: ["EDIDC", "ESSR"],
          tcodes: ["SOAMANAGER", "SXMB_MONI"],
          fiori: ["F2384"],
          configHe: ["Deploy של חבילת-התוכן + OAuth/certificates.", "מיפוי Work Order/Time Sheet/Invoice ל-S/4HANA objects.", "הגדרת monitoring ו-error handling."],
          mistakesHe: ["OAuth/certificate שגוי ➔ כשל-אימות.", "חוסר error handling ➔ הודעות-נכשלות אובדות."],
          troubleshootHe: ["API נכשל ➔ credentials/endpoint/scope.", "מסמך לא ממופה ➔ Message Processing Log."],
          bestPracticeHe: ["השתמש בחבילות-התוכן המוכנות.", "הפעל monitoring ו-retry על iFlows."],
          interviewHe: [{ qHe: "אילו טכנולוגיות מאפשרות את שילוב Fieldglass?", aHe: "SAP Integration Suite כ-Middleware, SOAP/REST APIs, OAuth/certificates ומיפוי-מסמכים בין Work Order/Time Sheet ל-PO/Service Entry Sheet." }],
          takeawaysHe: ["Integration Suite + APIs + OAuth = התשתית.", "מיפוי Work Order/Time Sheet ל-PO/SES.", "חבילות-תוכן מקצרות מימוש."],
        },
        {
          id: "16.6.2", titleHe: "שילוב ניהול כוח-עבודה זמני (Contingent Workforce Management)", titleEn: "Integrating SAP Fieldglass Contingent Workforce Management",
          execHe: "שילוב CWM מחבר את ניהול העובדים-הזמניים ב-Fieldglass אל ה-Procurement של S/4HANA: דרישות-כוח-אדם הופכות ל-Work Orders, שעות מאומתות הופכות ל-Service Entry Sheets, וחשבוניות זורמות לאימות-חשבוניות.",
          beginnerHe: "כשצריך עובד-קבלן, מפרסמים דרישה ב-Fieldglass, בוחרים מועמד, והוא מתחיל לעבוד. כל שעה שהוא מדווח ומאשרים — הופכת אוטומטית להוצאה מאומתת ב-S/4HANA, בלי הקלדה כפולה.",
          consultantHe: "מחזור CWM: Job Posting ➔ Candidate ➔ Work Order ➔ Time/Expense ➔ Invoice. השילוב יוצר PO רקורסיבי או Work Order שמתורגם ל-Service Procurement ב-S/4HANA, עם Service Entry Sheets לכל תקופת-דיווח. שים לב ל-rate cards, ל-tenure tracking (מגבלת-זמן העסקה) ולחיוב Cost Center נכון.",
          purposeHe: "לנהל את העובדים-הזמניים בבקרה מלאה — מדרישה ועד חשבונית — עם אימות-שעות, אכיפת-תעריפים ומעקב-עלות, ולמנוע הוצאה לא-מבוקרת על כוח-אדם.",
          processExampleHe: "דרישה ל-3 עובדי-מחסן זמניים מפורסמת; ספקי-כוח-אדם מציעים; נבחרים ומתחילים; כל שבוע מדווחות שעות, מאושרות, ויוצרות SES; חשבונית חודשית מאומתת מול ה-SES ב-S/4HANA.",
          cbcHe: "ב-CBC בעונת-השיא מגויסים עובדי-מחסן זמניים דרך CWM; שעותיהם מאומתות ומחויבות ל-Cost Center של הלוגיסטיקה, וחשבוניות-הקבלן מאומתות מול ה-Service Entry Sheets.",
          navHe: [
            "SAP Fieldglass ► Contingent ► Job Postings / Work Orders / Time Sheets",
            "S/4HANA ► MM ► Service Procurement ► Service Entry Sheet (ML81N)",
          ],
          tables: ["EKKO", "EKPO", "ESSR", "ESLL"],
          tcodes: ["ME21N", "ML81N", "MIRO"],
          fiori: ["F1645", "F0842A"],
          configHe: [
            "מיפוי Work Order ↔ PO ו-Time Sheet ↔ Service Entry Sheet.",
            "הגדרת rate cards ו-tenure rules.",
            "מיפוי Cost Center / G/L לחיוב.",
          ],
          mistakesHe: ["אי-מעקב tenure ➔ סיכון העסקה-יתר / co-employment.", "חיבור שעות בלי SES ➔ חשבונית לא-מאומתת."],
          troubleshootHe: ["שעות לא יוצרות SES ➔ מיפוי time-sheet↔SES.", "חשבונית נדחית ➔ אי-התאמת SES/PO/rate."],
          bestPracticeHe: ["אכוף tenure tracking ו-rate cards.", "ודא חיוב Cost Center בכל Work Order."],
          interviewHe: [
            { qHe: "כיצד CWM זורם ל-S/4HANA?", aHe: "Work Order ↔ PO, Time Sheet מאושר ↔ Service Entry Sheet, וחשבונית מאומתת מול ה-SES באימות-חשבוניות." },
            { qHe: "מהו tenure tracking ולמה הוא חשוב?", aHe: "מעקב משך-העסקה של עובד-זמני; חיוני למניעת סיכוני co-employment ולעמידה ברגולציה." },
          ],
          takeawaysHe: ["CWM: Job ➔ Work Order ➔ Time ➔ SES ➔ Invoice.", "שעות מאושרות הופכות ל-Service Entry Sheets.", "tenure + rate cards + Cost Center הם בקרות-מפתח."],
          relatedHe: [{ labelHe: "MM · SAP Fieldglass (16.6)", href: "/library/mm/chapter-16/#sub-16.6" }],
        },
      ],
    },
    // ============================================================ 16.7
    {
      id: "16.7", titleHe: "SAP SuccessFactors", titleEn: "SAP SuccessFactors",
      execHe:
        "SAP SuccessFactors היא חבילת-ה-HXM (Human Experience Management) הענן של SAP. בהקשר ה-Procurement, השילוב מזרים נתוני-עובדים, ארגון ו-Cost Centers מ-SuccessFactors Employee Central אל S/4HANA — בסיס לזיהוי-מבקש (requester), אישורים (approvals) וחיוב-עלות נכון ברכש.",
      beginnerHe:
        "כדי שמערכת-הרכש תדע מי מבקש, מי המנהל שצריך לאשר, ולאיזו מחלקה לחייב — היא צריכה נתוני-עובדים מעודכנים. SuccessFactors הוא 'מאגר-העובדים' הראשי, וה-S/4HANA מקבל ממנו את הנתונים האלה.",
      consultantHe:
        "Employee Central (EC) הוא ה-system-of-record ל-HR. השילוב מזרים Employee/Org data, Cost Center assignments ו-manager hierarchy אל S/4HANA (כ-HR mini-master או BP). הזרימה משמשת ל-workflow approvals, ל-requester determination ול-account assignment. קיימים שני נתיבים: ישיר (S/4HANA↔EC) ודרך SAP Cloud Integration. שים לב לתזמון הסנכרון (delta vs full).",
      purposeHe:
        "לוודא שנתוני-העובדים והארגון ב-S/4HANA מעודכנים ומדויקים — כדי שאישורי-רכש, זיהוי-מבקשים וחיוב-עלות יעבדו נכון — מבלי לתחזק נתוני-HR בכפילות.",
      processExampleHe:
        "עובד חדש נקלט ב-Employee Central עם Cost Center ומנהל; הנתון מסונכרן ל-S/4HANA; כשהעובד יוצר Purchase Requisition, ה-workflow מנתב לאישור-מנהלו, וההוצאה מחויבת ל-Cost Center הנכון.",
      cbcHe:
        "ב-CBC עובדי-הרכש והלוגיסטיקה מנוהלים ב-Employee Central; הסנכרון ל-S/4HANA מבטיח ש-Purchase Requisitions מנותבות לאישור הנכון ומחויבות ל-Cost Centers של המחלקות.",
      navHe: [
        "SAP SuccessFactors ► Employee Central ► Employee / Org Data",
        "S/4HANA ► Personnel Administration / HR mini-master (PA30)",
        "SPRO ► Integration ► SuccessFactors Employee Central ► Replication Settings",
      ],
      tables: ["PA0001", "PA0105", "HRP1000", "CSKS"],
      tcodes: ["PA20", "PA30", "PFAL", "PPOSE"],
      fiori: ["F0845", "F2344"],
      configHe: [
        "הגדרת replication של Employee/Org/Cost Center מ-EC ל-S/4HANA.",
        "מיפוי manager hierarchy ל-workflow approvals.",
        "בחירת נתיב-שילוב: ישיר או דרך SAP Cloud Integration.",
      ],
      flow: [
        { he: "קליטת-עובד", code: "Employee Central" },
        { he: "Replication", code: "Middleware/Direct" },
        { he: "HR mini-master", code: "S/4HANA" },
        { he: "Workflow / Cost Center", code: "Approvals" },
      ],
      masterDataHe: [
        "Employee mini-master (PA0001) + Cost Center assignment (CSKS).",
        "Org hierarchy (HRP1000) ל-approval routing.",
      ],
      mistakesHe: [
        "סנכרון לא-תדיר ➔ עובדים/מנהלים לא-מעודכנים ➔ אישורים תקועים.",
        "ניהול-כפול של נתוני-HR בשתי המערכות.",
      ],
      troubleshootHe: [
        "Workflow לא מוצא מאשר ➔ org/manager לא סונכרן.",
        "חיוב Cost Center שגוי ➔ Cost Center assignment לא-מעודכן.",
      ],
      bestPracticeHe: [
        "קבע את EC כ-system-of-record יחיד ל-HR.",
        "תזמן delta replication תדיר לשמירת-עדכניות.",
      ],
      interviewHe: [
        { qHe: "למה ה-Procurement צריך נתוני SuccessFactors?", aHe: "לזיהוי-מבקש, לניתוב-אישורים (manager hierarchy) ולחיוב-עלות (Cost Center) — כולם נשענים על נתוני-עובד/ארגון מעודכנים מ-Employee Central." },
        { qHe: "מהו ה-system-of-record ל-HR?", aHe: "SuccessFactors Employee Central; S/4HANA מקבל ממנו replication ולא מתחזק נתוני-HR בכפילות." },
      ],
      takeawaysHe: [
        "SuccessFactors EC = מקור-האמת לנתוני-עובד/ארגון.",
        "מזרים Employee/Org/Cost Center ל-S/4HANA לאישורים וחיוב.",
        "תזמון-סנכרון תדיר מונע אישורים תקועים.",
      ],
      relatedHe: [
        { labelHe: "MM · SAP Fieldglass (16.6)", href: "/library/mm/chapter-16/#sub-16.6" },
      ],
      children: [
        {
          id: "16.7.1", titleHe: "שילוב SAP S/4HANA עם SuccessFactors Employee Central", titleEn: "SAP S/4HANA Integration with SAP SuccessFactors Employee Central",
          execHe: "נתיב השילוב הישיר מחבר את S/4HANA ל-Employee Central ללא Middleware נפרד — ה-S/4HANA צורך את נתוני-העובד והארגון ישירות דרך APIs מובנים. מתאים כשרוצים אדריכלות פשוטה יותר.",
          beginnerHe: "יש שתי דרכים לחבר את שתי המערכות. הדרך הראשונה היא 'ישירה' — S/4HANA מדבר עם Employee Central בלי תחנת-ביניים. פחות רכיבים, פשוט יותר.",
          consultantHe: "השילוב הישיר מבוסס על integration content מובנה ב-S/4HANA הצורך את ה-EC OData/SOAP APIs, עם replication של Employee + Org. הוא מתאים לתרחישים סטנדרטיים ללא טרנספורמציות מורכבות. שים לב למגבלות-המיפוי: כשנדרשת לוגיקת-מיפוי עשירה, עדיף הנתיב דרך Cloud Integration (16.7.2).",
          purposeHe: "לספק חיבור פשוט וישיר בין EC ל-S/4HANA לתרחישים סטנדרטיים, עם פחות רכיבי-תשתית לתחזוקה.",
          processExampleHe: "S/4HANA מריץ replication job שקורא Employee/Org מ-EC דרך API, וממלא את ה-HR mini-master — בלי iFlow ביניים.",
          cbcHe: "ב-CBC, בהיעדר טרנספורמציות-HR מורכבות, נבחר הנתיב הישיר לסנכרון עובדי-הרכש מ-EC ל-S/4HANA.",
          navHe: ["S/4HANA ► Integration ► Employee Central Direct Integration ► Replication", "SAP SuccessFactors ► Employee Central ► API Center"],
          tables: ["PA0001", "HRP1000", "CSKS"],
          tcodes: ["PFAL", "PA30"],
          fiori: ["F2344"],
          configHe: ["הגדרת Communication Arrangement ל-EC APIs.", "תזמון replication jobs (Employee + Org).", "מיפוי שדות-בסיס ללא Middleware."],
          mistakesHe: ["בחירת נתיב ישיר כשנדרשות טרנספורמציות מורכבות ➔ מגבלות-מיפוי.", "credentials/scope ל-EC API שגויים."],
          troubleshootHe: ["replication נכשל ➔ EC API credentials/scope.", "שדה לא ממופה ➔ מגבלת הנתיב הישיר."],
          bestPracticeHe: ["בחר ישיר רק לתרחישים סטנדרטיים.", "תזמן delta replication תדיר."],
          interviewHe: [{ qHe: "מתי לבחור בנתיב הישיר ל-EC?", aHe: "בתרחישים סטנדרטיים ללא טרנספורמציות-מיפוי מורכבות — הוא פשוט יותר ובעל פחות רכיבי-תשתית; לוגיקה עשירה דורשת Cloud Integration." }],
          takeawaysHe: ["נתיב ישיר = S/4HANA↔EC בלי Middleware.", "מתאים לתרחישים סטנדרטיים.", "פחות רכיבים, פחות תחזוקה."],
        },
        {
          id: "16.7.2", titleHe: "SAP Cloud Integration עם SuccessFactors Employee Central", titleEn: "SAP Cloud Integration with SAP SuccessFactors Employee Central",
          execHe: "הנתיב דרך SAP Cloud Integration (חלק מ-SAP Integration Suite) מוסיף שכבת-Middleware בין EC ל-S/4HANA — מאפשר מיפוי, טרנספורמציה, סינון וניתוב מתקדמים. מתאים לתרחישים מורכבים או רב-מערכתיים.",
          beginnerHe: "הדרך השנייה לחבר היא דרך 'מתורגמן' (Cloud Integration) באמצע. הוא יקר יותר בתחזוקה, אבל מאפשר התאמות חכמות — לסנן, לשנות ולנתב נתונים בדרך.",
          consultantHe: "Cloud Integration מריץ iFlows מוכנים (SAP-delivered) לתרחיש EC↔S/4HANA, עם message mapping עשיר, value mapping, error handling ו-monitoring מרכזי. מתאים כשיש כללי-מיפוי מורכבים, מספר מערכות-יעד, או צורך בטרנספורמציות. שים לב לתחזוקת ה-iFlows ולעדכוני-תוכן.",
          purposeHe: "לתמוך בתרחישי-שילוב מורכבים בין EC ל-S/4HANA עם יכולות מיפוי, טרנספורמציה וניטור מתקדמות, מעבר למה שהנתיב הישיר מאפשר.",
          processExampleHe: "נתון-עובד מ-EC נכנס ל-iFlow ב-Cloud Integration; עובר value mapping (למשל המרת קודי-מחלקה), מסונן, ומנותב גם ל-S/4HANA וגם למערכת-שכר נוספת.",
          cbcHe: "ב-CBC, אם נדרש לנתב נתוני-עובד גם ל-S/4HANA וגם למערכת-נוכחות מקומית, נבחר הנתיב דרך Cloud Integration עם value mapping לקודי-המחלקות הישראליים.",
          navHe: ["SAP Integration Suite ► Cloud Integration ► EC to S/4HANA Integration Package", "SAP SuccessFactors ► Employee Central ► Integration Center"],
          tables: ["PA0001", "HRP1000", "EDIDC"],
          tcodes: ["PFAL", "SXMB_MONI"],
          fiori: ["F2384", "F2344"],
          configHe: ["Deploy של חבילת-התוכן EC↔S/4HANA ב-Cloud Integration.", "הגדרת message/value mapping ו-error handling.", "תזמון ו-monitoring של ה-iFlows."],
          mistakesHe: ["בחירת נתיב-Middleware מורכב לתרחיש פשוט ➔ תחזוקה מיותרת.", "value mapping לא-מתוחזק ➔ קודים שגויים."],
          troubleshootHe: ["נתון לא מגיע ➔ Message Processing Log ב-Cloud Integration.", "קוד שגוי ➔ value mapping לא-מעודכן."],
          bestPracticeHe: ["בחר Cloud Integration כשנדרשת לוגיקה/ניתוב מורכבים.", "תחזק value mappings בתהליך מסודר."],
          interviewHe: [
            { qHe: "מתי עדיף הנתיב דרך SAP Cloud Integration?", aHe: "כשנדרשים מיפוי/טרנספורמציה מורכבים, ניתוב לכמה מערכות-יעד או ניטור מרכזי — מעבר ליכולת הנתיב הישיר." },
            { qHe: "מה ההבדל העיקרי מהנתיב הישיר?", aHe: "Cloud Integration מוסיף שכבת-Middleware עם message/value mapping ו-error handling, במחיר תחזוקה גבוה יותר." },
          ],
          takeawaysHe: ["Cloud Integration = Middleware עם מיפוי/טרנספורמציה.", "מתאים לתרחישים מורכבים ורב-מערכתיים.", "עשיר יותר אך יקר-תחזוקה מהנתיב הישיר."],
          relatedHe: [{ labelHe: "MM · שילוב EC ישיר (16.7.1)", href: "/library/mm/chapter-16/#sub-16.7.1" }],
        },
      ],
    },
    // ============================================================ 16.8
    {
      id: "16.8", titleHe: "SAP Signavio", titleEn: "SAP Signavio",
      execHe:
        "SAP Signavio היא חבילת-ניהול-תהליכים (Business Process Transformation) של SAP. רכיב-המפתח, SAP Signavio Process Intelligence, מבצע כריית-תהליכים (Process Mining): הוא משחזר את התהליך האמיתי מתוך נתוני-ה-S/4HANA (event logs) ומציף צווארי-בקבוק, חריגות וסטיות מהתהליך-הרצוי — בסיס לשיפור-מתמיד ב-Procurement.",
      beginnerHe:
        "אנחנו חושבים שאנחנו יודעים איך תהליך-הרכש שלנו רץ — אבל המציאות שונה. SAP Signavio 'מצלם' את התהליך האמיתי מתוך הנתונים: כל הזמנה, אישור ותשלום משאירים עקבות, ו-Signavio מרכיב מהם את המפה האמיתית ומראה איפה נתקעים.",
      consultantHe:
        "Signavio Process Intelligence צורך event logs מ-S/4HANA (Procurement: PR➔PO➔GR➔Invoice➔Payment) ובונה graph של התהליך-בפועל. הוא מזהה rework, maverick buying, עיכובי-אישור וסטיות מ-target process. מרכיבים נוספים: Process Manager (מידול BPMN), Process Governance, ו-Process Insights (תובנות מוכנות ל-S/4HANA). השילוב מבוסס על data extraction (CDS/OData/CSV) אל Signavio cloud.",
      purposeHe:
        "לתת לארגון אמת-מבוססת-נתונים על תהליכי-הרכש שלו — לזהות צווארי-בקבוק, חוסר-ציות (off-contract buying), ו-rework — ולהניע שיפור-תהליכים מתמשך לפני ואחרי מעבר ל-S/4HANA.",
      processExampleHe:
        "Signavio מושך event log של 100,000 הזמנות-רכש; הוא מגלה ש-15% מהן עוקפות חוזה (maverick buying) ושאישורים מעל סכום מסוים מתעכבים 4 ימים בממוצע; הארגון מתקן את ה-workflow ואת מדיניות-החוזים.",
      cbcHe:
        "ב-CBC נעשה שימוש ב-SAP Signavio Process Intelligence לכריית תהליך ה-Procure-to-Pay: זוהו עיכובי-אישור בקווי-הרכש לחומרי-אריזה וחריגות מחוזי-ספקים; התובנות הזינו אופטימיזציה של זרימת-האישורים לפני ה-Go-Live של S/4HANA.",
      navHe: [
        "SAP Signavio ► Process Intelligence ► Investigations / Process Graph",
        "SAP Signavio ► Process Manager ► BPMN Modeling",
        "S/4HANA ► Data Extraction (CDS Views / OData) ► Signavio Ingestion",
      ],
      tables: ["EKKO", "EKPO", "EKBE", "RBKP", "CDHDR"],
      tcodes: ["ME2N", "ME80FN", "SE16N", "RSA1"],
      fiori: ["F2384", "F0842A"],
      configHe: [
        "הגדרת data extraction מ-S/4HANA (CDS/OData/CSV) אל Signavio.",
        "מידול ה-target process ב-Process Manager (BPMN) להשוואה.",
        "הגדרת KPIs ו-investigations ב-Process Intelligence.",
      ],
      flow: [
        { he: "אירועי-תהליך ב-S/4HANA", code: "Event Log", note: "PR➔PO➔GR➔INV" },
        { he: "Extraction", code: "CDS/OData" },
        { he: "כריית-תהליך", code: "Process Intelligence" },
        { he: "זיהוי חריגות/צווארים", code: "Investigations" },
        { he: "שיפור-תהליך", code: "Process Manager" },
      ],
      masterDataHe: [
        "Event log fields: timestamps, activity, case-id (PO/PR number).",
        "Change documents (CDHDR/CDPOS) ל-rework detection.",
      ],
      mistakesHe: [
        "extraction חלקי ➔ תמונת-תהליך מעוותת.",
        "כרייה בלי target process ➔ אין מול-מה להשוות.",
        "התעלמות מ-data privacy בנתוני-event.",
      ],
      troubleshootHe: [
        "גרף-תהליך לא-הגיוני ➔ event log חסר/שדות-timestamp שגויים.",
        "case לא-מקושר ➔ case-id (PO/PR) לא ממופה נכון.",
      ],
      bestPracticeHe: [
        "חבר כרייה (as-is) למידול target (to-be) למעגל-שיפור סגור.",
        "ודא שלמות-event-log ו-data privacy.",
        "התמקד ב-KPIs מעטים ומשמעותיים (cycle time, on-contract %).",
      ],
      interviewHe: [
        { qHe: "מהו Process Mining ומה תפקיד SAP Signavio Process Intelligence?", aHe: "כריית-תהליכים: שחזור התהליך האמיתי מתוך event logs של S/4HANA. Signavio Process Intelligence בונה graph של התהליך-בפועל, מזהה צווארי-בקבוק, rework וסטיות, ומניע שיפור." },
        { qHe: "כיצד נתונים מגיעים מ-S/4HANA ל-Signavio?", aHe: "דרך data extraction (CDS Views / OData / CSV) של event logs (PR➔PO➔GR➔Invoice➔Payment) אל ה-Signavio cloud." },
        { qHe: "מה הקשר בין Process Intelligence ל-Process Manager?", aHe: "Process Intelligence מראה את ה-as-is מהנתונים; Process Manager ממדל את ה-to-be (BPMN) — יחד הם סוגרים מעגל-שיפור." },
      ],
      takeawaysHe: [
        "Signavio Process Intelligence = כריית-תהליכים מ-event logs של S/4HANA.",
        "מציף צווארי-בקבוק, maverick buying ו-rework ב-Procurement.",
        "Process Manager ממדל את ה-to-be לסגירת מעגל-שיפור.",
        "מבוסס data extraction (CDS/OData) אל Signavio cloud.",
      ],
      relatedHe: [
        { labelHe: "MM · פרויקטי שילוב Ariba (16.1)", href: "/library/mm/chapter-16/#sub-16.1" },
        { labelHe: "MM · סיכום (16.9)", href: "/library/mm/chapter-16/#sub-16.9" },
      ],
    },
    // ============================================================ 16.9
    {
      id: "16.9", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד S/4HANA Sourcing & Procurement מתרחב מעבר לגבולות-הארגון אל רשת ומערכות חיצוניות — SAP Ariba ו-SAP Business Network לסחר, לשרשרת-אספקה, ללוגיסטיקה ולנכסים; SAP Fieldglass לכוח-עבודה חיצוני; SAP SuccessFactors לנתוני-עובד; ו-SAP Signavio לכריית-תהליכים. החוט-המקשר: שכבת-Middleware (SAP Integration Suite, Managed Gateway for Spend Management) המתרגמת ומנתבת מסמכים בין הפנים לחוץ.",
      beginnerHe:
        "סיכום: S/4HANA לבדו אינו 'אי'. הוא מחובר לרשת-ספקים (Business Network/Ariba), לעובדים-חיצוניים (Fieldglass), לנתוני-HR (SuccessFactors) ולכלי-ניתוח-תהליכים (Signavio). בכל מקרה יש 'מתורגמן' (Integration Suite) שמחבר ביניהם, ושפת-מסמכים משותפת (cXML/SOAP).",
      consultantHe:
        "ארכיטקטורת-העל: S/4HANA כליבה תפעולית; SAP Integration Suite + Managed Gateway כ-Middleware; ורשתות/מערכות-ענן בקצוות. עקרונות-מפתח שחזרו: התאמת master-data (UoM/Tax/ANID/Cost Center), system-of-record יחיד לכל ישות, ניטור מרכזי וטיפול-שגיאות, ו-Onboarding הדרגתי. Signavio סוגר את הלולאה — מודד את התהליך-בפועל ומניע שיפור. כל אלה יחד מהווים את ה-Intelligent, Networked Enterprise.",
      purposeHe:
        "לאחד את כל תכני-הפרק לתמונת-על אחת: כיצד לחבר את ה-Procurement של S/4HANA לרשת ולמערכות החיצוניות בצורה סטנדרטית, מנוטרת ובת-קיימא, ולהשתמש ב-Process Mining לשיפור-מתמיד.",
      processExampleHe:
        "מקצה-לקצה: SuccessFactors מספק את המבקש; Signavio מצביע על צוואר-בקבוק באישורים; ה-PR מאושר; ה-PO זורם דרך Managed Gateway ל-Business Network; הספק מאשר ושולח (SCC/Logistics); Fieldglass מנהל את כוח-האדם הקבלני; והחשבונית חוזרת ומאומתת — מעגל אחד, נתונים זורמים.",
      cbcHe:
        "ב-CBC: כל שרשרת ה-Source-to-Pay לחומרי-המשקה מחוברת — Ariba/Business Network לספקים, Logistics לנראות-משלוח, Fieldglass לקבלנים, SuccessFactors לעובדים, ו-Signavio לאופטימיזציית-התהליך — סביב ליבת S/4HANA אחת.",
      navHe: [
        "SAP Integration Suite ► Discover ► Integration Packages (ריכוז כל התרחישים)",
        "SAP Business Network ► Administration ► Integration Overview",
      ],
      tables: ["EKKO", "EKPO", "EDIDC", "ESSR", "PA0001"],
      tcodes: ["ME21N", "MIRO", "ML81N", "SXMB_MONI"],
      fiori: ["F2384", "F0842A"],
      configHe: [
        "ודא Middleware אחיד (Integration Suite/Managed Gateway) לכל התרחישים.",
        "אכוף התאמת master-data ו-system-of-record יחיד בכל שילוב.",
        "הקם ניטור מרכזי ו-Alerting חוצה-תרחישים.",
      ],
      masterDataHe: [
        "Master-data alignment (UoM/Tax/ANID/Cost Center/Supplier) הוא ה-DNA של כל שילוב.",
      ],
      mistakesHe: [
        "התייחסות לכל שילוב כפרויקט-נפרד בלי ארכיטקטורת-Middleware אחידה.",
        "הזנחת master-data alignment ➔ כשלי-מסמכים חוזרים בכל התרחישים.",
        "דילוג על Process Mining ➔ שיפור-תהליך 'באינטואיציה' במקום בנתונים.",
      ],
      troubleshootHe: [
        "כשלי-שילוב חוזרים ➔ בדוק master-data alignment ו-monitoring מרכזי.",
        "תהליך לא-משתפר ➔ הפעל Signavio Process Intelligence ל-as-is מבוסס-נתונים.",
      ],
      bestPracticeHe: [
        "תכנן ארכיטקטורת-Integration אחידה לפני התרחיש הראשון.",
        "קבע system-of-record יחיד לכל ישות (חוזה/עובד/ספק).",
        "סגור מעגל עם Process Mining — מדוד, שפר, חזור.",
        "בצע Onboarding הדרגתי וניטור מרכזי.",
      ],
      interviewHe: [
        { qHe: "מהו החוט-המקשר בין כל השילובים בפרק?", aHe: "שכבת-Middleware (SAP Integration Suite, Managed Gateway for Spend Management) המתרגמת ומנתבת מסמכים (cXML/SOAP) בין S/4HANA לרשתות ולמערכות-הענן החיצוניות." },
        { qHe: "אילו עקרונות-שילוב חוזרים על-פני כל התרחישים?", aHe: "התאמת master-data, system-of-record יחיד, ניטור מרכזי וטיפול-שגיאות, Onboarding הדרגתי, ושימוש ב-Process Mining לסגירת מעגל-שיפור." },
        { qHe: "כיצד SAP Signavio משלים את התמונה?", aHe: "הוא מודד את התהליך-בפועל (Process Intelligence) על נתוני-S/4HANA, מזהה חריגות וצווארים, ומניע שיפור-מתמיד — סוגר את הלולאה בין תפעול לאופטימיזציה." },
      ],
      takeawaysHe: [
        "S/4HANA Procurement הוא מחובר: Ariba/Business Network, Fieldglass, SuccessFactors, Signavio.",
        "SAP Integration Suite + Managed Gateway = ה-Middleware המאחד.",
        "Master-data alignment ו-system-of-record יחיד הם תנאי-הצלחה אוניברסליים.",
        "SAP Signavio Process Intelligence סוגר את מעגל השיפור-המתמיד.",
      ],
      relatedHe: [
        { labelHe: "MM · פרויקטי שילוב Ariba (16.1)", href: "/library/mm/chapter-16/#sub-16.1" },
        { labelHe: "MM · SAP Signavio (16.8)", href: "/library/mm/chapter-16/#sub-16.8" },
      ],
    },
  ],
};
