// ===== MM Digital Textbook — Chapter 9 (Enterprise Contract Management) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// enough to study Enterprise Contract Management (ECM) without the original book.
// This domain is Fiori-driven; fiori[] is rich and tcodes are usually "—".
// CBC = Coca-Cola bottling legal contract assembly for supplier agreements.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH9: TextbookChapter = {
  n: 9,
  titleHe: "ניהול חוזים ארגוני והרכבה",
  titleEn: "Enterprise Contract Management and Assembly",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה ל-Enterprise Contract Management (ECM) ב-SAP S/4HANA — הפתרון המשפטי לניהול חוזים, מסמכים משפטיים והרכבת-מסמכים (Document Assembly). בניגוד לרוב תהליכי ה-MM, ECM הוא Fiori-driven לחלוטין: אין כמעט T-Codes קלאסיים, והעבודה היומיומית נעשית כולה דרך אפליקציות Fiori; הקונפיגורציה יושבת ב-SPRO תחת Legal Content Management / Enterprise Contract Management. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא ללא הספר המקורי. ההקשר העסקי לאורך הפרק: CBC (מבקבק Coca-Cola) המרכיב הסכמי-ספקים משפטיים — הסכמי-אספקת-תרכיז, חוזי-לוגיסטיקה והסכמי-NDA — דרך הרכבת-מסמכים אוטומטית.",
  subchapters: [
    // ============================================================ 9.1
    {
      id: "9.1",
      titleHe: "מהו ניהול חוזים ארגוני והרכבה?",
      titleEn: "What Is Enterprise Contract Management and Assembly?",
      execHe:
        "Enterprise Contract Management (ECM) הוא הפתרון המשפטי-תאגידי של SAP S/4HANA לניהול מחזור-החיים המלא של חוזים ומסמכים משפטיים — מבקשה, דרך ניסוח והרכבה (Document Assembly), אישור, חתימה, ועד תזכורות וחידוש. הוא נשען על Legal Content Management (LCM) ומספק מאגר-אמת אחד למסמכים משפטיים, מקושר ישירות לאובייקטים העסקיים (הזמנות-רכש, חוזי-רכש, ספקים). הערך: הפחתת-סיכון משפטי, סטנדרטיזציה של נוסחים ושקיפות מלאה.",
      beginnerHe:
        "דמיין מחלקה-משפטית דיגיטלית בתוך SAP. במקום קבצי-Word מפוזרים בתיקיות, ECM שומר כל חוזה כ'מסמך משפטי' מובנה עם נתונים (Legal Transaction), מסמך-טקסט (Legal Document) ומשימות (Legal Tasks). 'הרכבה' (Assembly) פירושה שהמערכת בונה את החוזה אוטומטית מרכיבי-טקסט (Clauses) לפי הקשר — כמו להרכיב מסמך מקטעי-לגו מאושרים מראש, במקום לכתוב מאפס.",
      consultantHe:
        "ECM בנוי על Legal Content Management (LCM). אובייקטי-הליבה: Legal Transaction (העִסקה המשפטית — מטא-דאטה, צדדים, תאריכים), Legal Document (המסמך עצמו, מורכב מ-Content/Clauses), Legal Entity/Context (היררכיית-הקשר), ו-Legal Task (פעולות-טיפול). ההרכבה נשענת על Document Assembly עם Clause Library ו-Template-ים. שילוב עם MM נעשה דרך Linked Object Types (קישור Legal Transaction להזמנת-רכש/חוזה-רכש/ספק). זהו פתרון Fiori-only — כל העבודה דרך אפליקציות; הקונפיגורציה ב-SPRO תחת Legal Content Management ו-Enterprise Contract Management.",
      purposeHe:
        "המטרה: למרכז את כל החוזים המשפטיים במאגר-אמת אחד, לתקנן נוסחים מאושרים מראש (להפחית סיכון משפטי), לקשר חוזה לאובייקט-העסקי שהוא תומך בו, ולנהל תזכורות-חידוש כך שלא יפוג חוזה קריטי בלי שמישהו ידע. ECM מגשר בין המחלקה-המשפטית למחלקות-הרכש והתפעול.",
      processExampleHe:
        "Procure-to-Contract: מחלקת-רכש מגישה Request Legal Contract להסכם-אספקה חדש ► המערכת יוצרת Legal Transaction עם מטא-דאטה ► היועץ-המשפטי מרכיב Legal Document מ-Clauses מאושרים דרך Document Assembly ► המסמך עובר Legal Tasks לאישור (Workflow) ► לאחר חתימה ה-Transaction מקושר להזמנת-הרכש (Linked Object Type) ► Reminder Type שולח תזכורת 60 יום לפני פקיעה.",
      cbcHe:
        "ב-CBC: הסכם-אספקת-תרכיז עם ספק-תרכיז גלובלי מנוהל כ-Legal Transaction. ה-Legal Document מורכב מ-Clauses סטנדרטיים (תנאי-תשלום, SLA-אספקה, סודיות) + Clauses ספציפיים לשוק-הישראלי. ה-Transaction מקושר לחוזה-הרכש (Purchase Contract) ב-MM דרך Linked Object Type, וכל ה-NDAs מול ספקי-לוגיסטיקה מורכבים מאותה Clause Library.",
      navHe: [
        "SPRO ► Cross-Application Components ► Legal Content Management ► Basic Settings",
        "SPRO ► Cross-Application Components ► Enterprise Contract Management ► Basic Settings",
        "SAP Fiori Launchpad ► Enterprise Contract Management (Space/Page)",
      ],
      tables: ["LCM_TRANS", "LCM_DOC", "LCM_TASK", "LCM_CTX", "LCM_LNK"],
      tcodes: ["—", "SPRO"],
      fiori: ["F4072 (Manage Legal Transactions)", "F4070 (Manage Legal Documents)", "F4631 (Request Legal Contract)"],
      configHe: [
        "ECM נשען על שתי תיקיות-IMG: Legal Content Management (תשתית — Contexts, Content Types, Profiles) ו-Enterprise Contract Management (העסקי — Document Types, Date/Reminder Types).",
        "Activation: יש להפעיל את ה-Business Function / Scope Item המתאים ולוודא הרשאות (Business Catalogs) ל-Fiori.",
        "אובייקט-הליבה Legal Transaction נוצר תמיד עם Profile + Document Type הקובעים את ההתנהגות.",
      ],
      flow: [
        { he: "בקשת-חוזה", code: "F4631", note: "Request Legal Contract" },
        { he: "יצירת Legal Transaction", note: "מטא-דאטה + צדדים" },
        { he: "הרכבת Legal Document", note: "Document Assembly מ-Clauses" },
        { he: "Legal Tasks לאישור", code: "Workflow" },
        { he: "קישור לאובייקט-עסקי", note: "Linked Object Type → PO/Contract" },
        { he: "תזכורת-חידוש", code: "Reminder Type" },
      ],
      masterDataHe: [
        "Legal Transaction = רשומת-העל המשפטית (מטא-דאטה, צדדים, תאריכים, סטטוס).",
        "Legal Document = המסמך עצמו, מורכב מ-Content/Clauses לפי Document Type.",
        "Context/Entity = ההיררכיה הארגונית-משפטית המסווגת את ה-Transaction.",
      ],
      mistakesHe: [
        "התייחסות ל-ECM כאל ניהול-קבצים בלבד — והחמצת ערך ההרכבה (Assembly) והקישור לאובייקטים-עסקיים.",
        "אי-הפעלת ה-Scope Item / Business Catalogs — האפליקציות לא מופיעות ב-Launchpad.",
        "ערבוב בין Legal Content Management (תשתית) ל-Enterprise Contract Management (עסקי) בקונפיגורציה.",
      ],
      troubleshootHe: [
        "אפליקציות ECM לא מופיעות ב-Fiori ➔ Business Catalog/Role לא הוקצה או Scope Item לא הופעל.",
        "לא ניתן ליצור Legal Transaction ➔ חסר Profile/Document Type פעיל או טווח-מספרים.",
        "החוזה לא מתקשר להזמנת-רכש ➔ Linked Object Type לא הוגדר.",
      ],
      bestPracticeHe: [
        "התחל מהגדרת ההיררכיה (Contexts/Entities) לפני יצירת Transactions — היא שלד-המערכת.",
        "תקנן Clause Library מאושרת-משפטית לפני הרכבה — איכות-ההרכבה תלויה בה.",
        "הגדר Linked Object Types מוקדם כדי לחבר את העולם-המשפטי לעולם-הרכש.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Legal Transaction ל-Legal Document?", aHe: "Legal Transaction = העִסקה המשפטית עם המטא-דאטה (צדדים, תאריכים, סטטוס); Legal Document = המסמך-הטקסטואלי עצמו, המורכב מ-Clauses. ל-Transaction אחת יכולים להיות מספר Documents." },
        { qHe: "מהי 'הרכבה' (Assembly) ב-ECM?", aHe: "Document Assembly — בניית מסמך-משפטי אוטומטית מרכיבי-טקסט מאושרים (Clauses/Templates) לפי הקשר, במקום ניסוח מאפס. זה מבטיח סטנדרטיזציה ומפחית סיכון." },
        { qHe: "על מה נשען ECM?", aHe: "על Legal Content Management (LCM) — תשתית ניהול-התוכן-המשפטי המספקת Contexts, Content Types, Profiles ו-Clause Library." },
      ],
      takeawaysHe: [
        "ECM = ניהול מחזור-חיי חוזים משפטיים מבקשה ועד חידוש, נשען על LCM.",
        "אובייקטי-ליבה: Legal Transaction, Legal Document, Context, Legal Task.",
        "Document Assembly מרכיב חוזים מ-Clauses מאושרים — סטנדרטיזציה והפחתת-סיכון.",
        "פתרון Fiori-only: עבודה דרך אפליקציות, קונפיגורציה ב-SPRO.",
      ],
      relatedHe: [
        { labelHe: "MM · חוזי-רכש (Purchase Contracts)", href: "/library/mm/chapter-08/" },
        { labelHe: "MM · אובייקט · LCM_TRANS", href: "/library/mm/object/LCM_TRANS/" },
      ],
    },
    // ============================================================ 9.2
    {
      id: "9.2",
      titleHe: "סקירת אפליקציות SAP Fiori לניהול חוזים ארגוני",
      titleEn: "SAP Fiori Apps for Enterprise Contract Management Overview",
      execHe:
        "ECM הוא פתרון Fiori-first: כל העבודה התפעולית נעשית דרך חבילת אפליקציות Fiori ייעודיות — מ-Home Page המרכזת את העבודה, דרך ניהול Contexts, Categories, Legal Documents, Tasks, Transactions, ועד Workflow Templates. הבנת מפת-האפליקציות היא תנאי-סף לעבודה ב-ECM, שכן אין כמעט חלופת-T-Code.",
      beginnerHe:
        "במקום מסכי-SAP ישנים (SAPGUI), ECM נותן לך 'אפליקציות' מודרניות בדפדפן. כל אפליקציה מטפלת בחלק אחד: אחת לניהול ההקשרים-הארגוניים, אחת למסמכים, אחת למשימות, אחת לעסקאות. כמו אפליקציות בטלפון — כל אחת לתפקיד אחר, וכולן עובדות יחד על אותם נתונים.",
      consultantHe:
        "האפליקציות מבוססות SAPUI5/Fiori Elements ומופצות דרך Business Catalogs ב-Launchpad. הן נחלקות לקבוצות: ניהול-תוכן (Manage Contexts, Categories, Legal Documents), תפעול (Manage Legal Transactions, Request Legal Contract), זרימת-עבודה (Manage Legal Tasks, Manage Workflow Templates), וסקירה (Home Page/Overview). כל אפליקציה נושאת App ID (Fxxxx) ומחייבת Business Role מתאים. ה-Overview Page מספקת KPIs ו-Cards אינטראקטיביים.",
      purposeHe:
        "המטרה: לספק חוויית-עבודה מודרנית, מבוססת-תפקיד, לכל בעלי-העניין במחזור-החיים המשפטי — משפטנים, רוכשים, מנהלים — כשכל תפקיד מקבל את האפליקציות הרלוונטיות לו דרך Business Catalogs.",
      processExampleHe:
        "משפטן נכנס ל-Launchpad ► Home Page מציגה משימות-פתוחות ו-KPIs ► לוחץ על משימה ► נפתחת Manage Legal Tasks ► מסיים ביקורת ► עובר ל-Manage Legal Documents להרכבה ► ל-Manage Legal Transactions לעדכון-סטטוס. כל המעבר חלק, על אותם נתונים.",
      cbcHe:
        "ב-CBC: צוות-הרכש משתמש ב-Request Legal Contract לפתיחת-בקשות; הצוות-המשפטי ב-Manage Legal Documents ל-Assembly; ומנהל-החוזים ב-Home Page למעקב-KPIs על חוזי-הספקים הפעילים והפגים-קרובים.",
      navHe: [
        "SAP Fiori Launchpad ► Enterprise Contract Management (Space)",
        "SPRO ► Cross-Application Components ► Enterprise Contract Management ► Basic Settings",
      ],
      tables: ["LCM_TRANS", "LCM_DOC", "LCM_TASK", "LCM_CTX", "LCM_CATEGORY"],
      tcodes: ["—"],
      fiori: ["F-Overview (Home Page)", "Manage Contexts", "Manage Legal Documents", "Manage Legal Tasks", "Request Legal Contract", "Manage Legal Transactions", "Manage Workflow Templates"],
      configHe: [
        "האפליקציות מופעלות דרך Business Catalogs + Business Roles (Maintain Business Roles).",
        "Launchpad Space/Page מסדרים את האפליקציות לפי תפקיד.",
        "Overview Page מורכבת מ-Cards הניתנים להתאמה (KPI/List Cards).",
      ],
      flow: [
        { he: "Launchpad → ECM Space", note: "אפליקציות לפי תפקיד" },
        { he: "Home Page/Overview", note: "KPIs + משימות" },
        { he: "ניווט לאפליקציה ייעודית", note: "Transactions/Documents/Tasks" },
        { he: "עבודה על נתונים משותפים" },
      ],
      mistakesHe: [
        "חיפוש T-Code במקום אפליקציה — ECM הוא Fiori-only.",
        "אי-הקצאת Business Catalog נכון — חלק מהאפליקציות חסרות למשתמש.",
      ],
      troubleshootHe: [
        "אפליקציה חסרה ב-Launchpad ➔ Business Catalog/Role לא הוקצה.",
        "Overview ריק ➔ אין נתונים או הרשאת-קריאה חסרה ל-CDS שמאחורי ה-Cards.",
      ],
      bestPracticeHe: [
        "הקצה Business Roles לפי תפקיד-עסקי (משפטן/רוכש/מנהל) ולא לפי-משתמש.",
        "ארגן את ה-Space/Page כך שכל תפקיד רואה תחילה את האפליקציות התכופות לו.",
      ],
      interviewHe: [
        { qHe: "מדוע ל-ECM כמעט אין T-Codes?", aHe: "ECM הוא פתרון Fiori-first של S/4HANA — נבנה מראש כאפליקציות UI5/Fiori Elements; העבודה כולה דרך Launchpad, וה-T-Codes שנשארו הם בעיקר SPRO לקונפיגורציה." },
        { qHe: "כיצד מקבל משתמש את אפליקציות ה-ECM?", aHe: "דרך Business Catalogs המוקצים ב-Business Role; ה-Role נכנס ל-Launchpad Space/Page ומציג את האפליקציות הרלוונטיות." },
      ],
      takeawaysHe: [
        "ECM = חבילת אפליקציות Fiori לפי-תפקיד, ללא T-Codes תפעוליים.",
        "קבוצות: ניהול-תוכן, תפעול, זרימת-עבודה, סקירה.",
        "גישה נשלטת דרך Business Catalogs ו-Business Roles.",
      ],
      relatedHe: [
        { labelHe: "MM · אובייקט · LCM_TRANS", href: "/library/mm/object/LCM_TRANS/" },
      ],
      children: [
        {
          id: "9.2.1",
          titleHe: "דף הבית וסקירה כללית",
          titleEn: "Home Page and Overview",
          execHe:
            "דף-הבית (Home Page) וה-Overview Page הם נקודת-הכניסה ל-ECM: הם מרכזים KPIs, משימות-פתוחות, חוזים-פגים-קרובים ופעולות-מהירות בכרטיסים (Cards) אינטראקטיביים. זהו לוח-המחוונים של מנהל-החוזים.",
          beginnerHe:
            "כמו מסך-הבית של אפליקציה: רואים במבט-אחד מה דורש טיפול — כמה חוזים פעילים, מה מחכה לאישור, מה עומד לפוג. כל 'כרטיס' הוא קיצור-דרך לעבודה.",
          consultantHe:
            "ה-Overview Page בנוי על Fiori Elements עם Cards מסוג KPI/List/Analytical, הניזונים מ-CDS Views. כל Card ניתן ל-drill-down לאפליקציה הרלוונטית. ההתאמה נעשית דרך Manage KPIs/Cards והרשאות-CDS שולטות במה שכל תפקיד רואה.",
          purposeHe:
            "לתת תמונת-מצב מיידית ולקצר זמן-טיפול: במקום לחפש משימות בכל אפליקציה, מנהל-החוזים רואה הכל במקום אחד ומנווט בלחיצה.",
          processExampleHe:
            "מנהל-חוזים פותח את Home Page ► רואה Card 'Contracts Expiring in 60 Days = 4' ► לוחץ ► נפתחת רשימה ► בוחר חוזה ► מתחיל תהליך-חידוש דרך Request Legal Contract.",
          cbcHe:
            "ב-CBC: ה-Home Page מציג Card 'Supplier Agreements Expiring' המתריע על הסכם-תרכיז הפג בעוד 45 יום, ומנהל-החוזים יוזם חידוש בעוד מועד.",
          navHe: ["SAP Fiori Launchpad ► Enterprise Contract Management ► Overview / Home"],
          tables: ["LCM_TRANS", "LCM_TASK"],
          tcodes: ["—"],
          fiori: ["ECM Overview Page", "Home Page (ECM Space)"],
          configHe: [
            "התאם Cards דרך Manage Cards/KPIs; שלוט בנראות דרך Business Role.",
            "הגדר Drill-down Navigation מכל Card לאפליקציית-היעד.",
          ],
          mistakesHe: ["הצגת יותר מדי Cards — עומס-מידע מטשטש את הקריטי.", "אי-הגדרת Drill-down — ה-Card אינפורמטיבי בלבד ולא פעיל."],
          troubleshootHe: ["Card ריק/שגוי ➔ CDS View ללא נתונים או הרשאת-קריאה חסרה.", "Drill-down לא עובד ➔ Target Mapping של אפליקציית-היעד חסר."],
          bestPracticeHe: ["הצג רק 4–6 Cards קריטיים לתפקיד.", "ודא שכל Card מוביל לפעולה (Drill-down), לא רק מידע."],
          interviewHe: [
            { qHe: "מה מטרת ה-Overview Page ב-ECM?", aHe: "לרכז KPIs, משימות וחוזים-פגים בכרטיסים אינטראקטיביים — תמונת-מצב מיידית עם Drill-down לאפליקציות." },
          ],
          takeawaysHe: ["Home/Overview = לוח-מחוונים של מנהל-החוזים.", "Cards מבוססי-CDS עם Drill-down.", "נראות נשלטת דרך Business Role."],
        },
        {
          id: "9.2.2",
          titleHe: "ניהול הקשרים",
          titleEn: "Manage Contexts",
          execHe:
            "Manage Contexts היא האפליקציה לניהול ההיררכיה הארגונית-משפטית (Contexts) המסווגת כל Legal Transaction. ה-Context קובע איזה אזור-עסקי/יחידה/תחום-משפטי החוזה משתייך אליו, ומשם נגזרות הגדרות-ברירת-מחדל והרשאות.",
          beginnerHe:
            "Context הוא 'התיקייה הארגונית' שהחוזה שייך אליה — למשל 'רכש-ישראל' או 'משפטי-תאגידי'. הוא עוזר למיין, להרשות ולקבוע ברירות-מחדל לחוזים לפי השתייכותם.",
          consultantHe:
            "Context הוא היררכיית-עץ (Entity-based) שמקושרת ל-Profiles ול-Document Types. הוא משמש לסיווג, להרשאות (Authorization-relevant) ולגזירת-ברירות-מחדל. השינוי נעשה דרך Manage Contexts ומאוחסן ב-LCM_CTX; ה-Entity Types (9.3.5) מגדירים את סוגי-הצמתים בעץ.",
          purposeHe:
            "לבנות שלד-סיווג שמאפשר ניהול-לפי-הקשר: הרשאות ממוקדות, דיווח-לפי-יחידה וברירות-מחדל אוטומטיות — כך שחוזה 'יודע' מאליו לאיזה אזור הוא שייך.",
          processExampleHe:
            "אדמין יוצר Context 'Procurement-Israel' תחת 'Corporate-Legal' ► מקשר Profile ו-Document Types מותרים ► מעתה כל Legal Transaction שנפתח תחת ה-Context יורש את ההגדרות ואת ההרשאות.",
          cbcHe:
            "ב-CBC: עץ ה-Contexts = 'CBC-Israel' → 'Supplier-Agreements' → 'Concentrate-Suppliers' | 'Logistics-Suppliers'. כל הסכם-תרכיז נפתח תחת הצומת המתאים ויורש הרשאות וברירות-מחדל.",
          navHe: ["SAP Fiori Launchpad ► Manage Contexts", "SPRO ► Legal Content Management ► Configure Contexts / Entity Types"],
          tables: ["LCM_CTX", "LCM_ENTITY"],
          tcodes: ["—"],
          fiori: ["Manage Contexts"],
          configHe: [
            "בנה את עץ ה-Contexts לפי Entity Types המוגדרים מראש (9.3.5).",
            "קשר לכל Context את ה-Profile וה-Document Types המותרים.",
            "סמן Contexts כ-Authorization-relevant לבקרת-גישה.",
          ],
          mistakesHe: ["עץ-Contexts שטוח מדי — מאבד יכולת-סיווג והרשאה.", "עץ עמוק מדי — תחזוקה מסורבלת."],
          troubleshootHe: ["משתמש לא רואה חוזים של יחידה ➔ Context לא הוקצה להרשאתו.", "ברירות-מחדל לא נגזרות ➔ Profile לא מקושר ל-Context."],
          bestPracticeHe: ["עצב את ההיררכיה לפי המבנה-הארגוני האמיתי.", "הגדר Entity Types לפני בניית-העץ."],
          interviewHe: [
            { qHe: "מה תפקיד ה-Context ב-ECM?", aHe: "סיווג היררכי של Legal Transactions לפי יחידה/תחום, המשמש להרשאות, דיווח וגזירת-ברירות-מחדל." },
            { qHe: "במה תלוי מבנה ה-Context?", aHe: "ב-Entity Types המגדירים את סוגי-הצמתים בעץ-ההיררכיה." },
          ],
          takeawaysHe: ["Context = ההיררכיה הארגונית-משפטית המסווגת חוזים.", "מקושר ל-Profiles ו-Document Types.", "בסיס להרשאות ולברירות-מחדל."],
          relatedHe: [{ labelHe: "MM · סוגי-ישות (9.3.5)", href: "/library/mm/chapter-09/#sub-9.3.5" }],
        },
        {
          id: "9.2.3",
          titleHe: "קטגוריות לתוכן משפטי",
          titleEn: "Categories for Legal Content",
          execHe:
            "Categories for Legal Content הן ממד-סיווג נוסף (מעבר ל-Context) המתייג תוכן-משפטי לפי נושא/סוג — למשל 'NDA', 'Supply Agreement', 'Service Contract'. הן מאפשרות חיפוש, סינון ודיווח רוחביים על-פני ההיררכיה הארגונית.",
          beginnerHe:
            "אם Context הוא 'התיקייה' (לפי יחידה), Category היא 'התגית' (לפי נושא). חוזה יכול להיות בתיקיית 'רכש-ישראל' ועם תגית 'הסכם-סודיות'. תגיות עוזרות למצוא ולקבץ חוזים דומים מכל הארגון.",
          consultantHe:
            "Categories הן טקסונומיה רוחבית המוקצית ל-Legal Documents/Transactions, נשמרות ב-LCM_CATEGORY. בניגוד ל-Context (היררכיה ארגונית), Category היא סיווג-תוכני. היא משמשת לסינון באפליקציות, ל-Assembly (בחירת Clauses לפי קטגוריה) ולדיווח. מנוהלות דרך Manage Categories / Customizing.",
          purposeHe:
            "לאפשר חיתוך-תוכני רוחבי: 'הראה לי את כל ה-NDAs בארגון, ללא קשר ליחידה'. זה משלים את ה-Context הארגוני בממד-נושאי.",
          processExampleHe:
            "משפטן מסנן ב-Manage Legal Documents לפי Category='NDA' ► מקבל את כל הסכמי-הסודיות מכל היחידות ► מוודא שכולם משתמשים בנוסח-העדכני.",
          cbcHe:
            "ב-CBC: Categories = 'Concentrate-Supply', 'Logistics', 'NDA', 'Equipment-Lease'. מנהל-החוזים מסנן לפי 'Concentrate-Supply' ורואה את כל הסכמי-התרכיז בכל המדינות.",
          navHe: ["SAP Fiori Launchpad ► Manage Categories", "SPRO ► Legal Content Management ► Categories for Legal Content"],
          tables: ["LCM_CATEGORY", "LCM_DOC"],
          tcodes: ["—"],
          fiori: ["Manage Categories"],
          configHe: [
            "הגדר עץ-Categories תוכני (נושאי) הנפרד מ-Contexts הארגוני.",
            "קשר Categories ל-Document Types וכבסיס לבחירת-Clauses ב-Assembly.",
          ],
          mistakesHe: ["בלבול בין Category (נושא) ל-Context (ארגון) — שניהם ממדים שונים.", "ריבוי Categories כפולות — מקשה סינון."],
          troubleshootHe: ["סינון-Category לא מחזיר תוצאות ➔ Category לא הוקצתה למסמכים.", "Clauses לא נבחרים ב-Assembly ➔ Category לא מקושרת ל-Clause Library."],
          bestPracticeHe: ["שמור טקסונומיה רזה ועקבית של Categories.", "תאם Categories עם Clause Library כדי לתמוך ב-Assembly."],
          interviewHe: [
            { qHe: "מה ההבדל בין Context ל-Category?", aHe: "Context = היררכיה ארגונית (לפי יחידה/תחום); Category = סיווג תוכני-נושאי (NDA, Supply…). הם שני ממדים משלימים." },
          ],
          takeawaysHe: ["Category = סיווג תוכני-נושאי רוחבי.", "משלימה את ה-Context הארגוני.", "תומכת בסינון, דיווח ובחירת-Clauses ל-Assembly."],
          relatedHe: [{ labelHe: "MM · ניהול-הקשרים (9.2.2)", href: "/library/mm/chapter-09/#sub-9.2.2" }],
        },
        {
          id: "9.2.4",
          titleHe: "ניהול מסמכים משפטיים",
          titleEn: "Manage Legal Documents",
          execHe:
            "Manage Legal Documents היא אפליקציית-הליבה ליצירה, הרכבה (Assembly) ועריכה של מסמכים משפטיים. כאן מורכב החוזה מ-Clauses, נערך, עובר גרסאות (Versioning), ומקבל Document Stamps. זהו ה'עורך-המשפטי' של ECM.",
          beginnerHe:
            "כאן בונים את החוזה עצמו. במקום לכתוב מאפס, בוחרים 'סעיפים' (Clauses) מאושרים-מראש והמערכת מרכיבה מהם מסמך. אפשר לערוך, לשמור גרסאות ולהוסיף 'חותמות' (Stamps) כמו 'טיוטה' או 'סופי'.",
          consultantHe:
            "האפליקציה מנהלת Legal Documents (LCM_DOC) הבנויים מ-Content/Clauses לפי Document Type ו-Profile. ה-Document Assembly מאחד Clauses מ-Clause Library לפי כללים/קטגוריה, תומך ב-Versioning, ב-Document Stamps (9.3.10), וב-Content Types (9.3.9). אינטגרציה עם עיבוד-מסמכים (DMS/ODF) לפלט Word/PDF.",
          purposeHe:
            "לספק סביבת-עריכה משפטית מובנית: הרכבה אוטומטית מסטנדרטים מאושרים → הפחתת-סיכון; Versioning → מעקב-שינויים; Stamps → ניהול-סטטוס ויזואלי.",
          processExampleHe:
            "משפטן פותח Manage Legal Documents ► יוצר מסמך מ-Document Type 'Supply Agreement' ► Assembly מרכיב אוטומטית Clauses חובה (תשלום, סודיות) ► מוסיף Clause ספציפי ► שומר Version 1 ► מחיל Stamp 'Draft' ► לאחר אישור Stamp 'Final'.",
          cbcHe:
            "ב-CBC: הסכם-אספקת-תרכיז מורכב מ-Clauses: 'Payment Terms NET-30', 'Concentrate SLA', 'Confidentiality', + Clause ישראלי על-מע\"מ. כל גרסה נשמרת; Stamp 'Approved' מוחל לפני חתימה.",
          navHe: ["SAP Fiori Launchpad ► Manage Legal Documents", "SPRO ► Enterprise Contract Management ► Document Types / Content Types"],
          tables: ["LCM_DOC", "LCM_CLAUSE", "LCM_VERSION"],
          tcodes: ["—"],
          fiori: ["Manage Legal Documents"],
          configHe: [
            "Document Types (9.3.12) קובעים מבנה, Content Types מותרים ו-Profile.",
            "Document Stamps (9.3.10) מגדירים סטטוסים ויזואליים.",
            "Clause Library + כללי-Assembly קובעים אילו Clauses נכנסים אוטומטית.",
          ],
          flow: [
            { he: "יצירה לפי Document Type", note: "מבנה + Profile" },
            { he: "Document Assembly", note: "הרכבה מ-Clauses" },
            { he: "עריכה + Versioning" },
            { he: "החלת Document Stamp", note: "Draft → Final" },
            { he: "פלט Word/PDF", note: "DMS/ODF" },
          ],
          mistakesHe: ["עריכה ידנית של Clauses מאושרים — מאבדת את יתרון-הסטנדרטיזציה.", "אי-שימוש ב-Versioning — אובדן מעקב-שינויים.", "ערבוב Content Types לא-מותרים ל-Document Type."],
          troubleshootHe: ["Clauses לא מורכבים אוטומטית ➔ כללי-Assembly/Category לא מוגדרים.", "Stamp לא ניתן להחלה ➔ Document Stamp לא מוגדר ל-Document Type.", "פלט-Word נכשל ➔ אינטגרציית-DMS/ODF חסרה."],
          bestPracticeHe: ["העדף Assembly מ-Clause Library על-פני כתיבה-חופשית.", "אכוף Versioning לכל שינוי מהותי.", "השתמש ב-Stamps לסמן סטטוס ברור (Draft/Approved/Final)."],
          interviewHe: [
            { qHe: "כיצד מורכב Legal Document ב-ECM?", aHe: "דרך Document Assembly — איחוד Clauses מ-Clause Library לפי Document Type/Category/כללים, עם Versioning ו-Stamps." },
            { qHe: "מה תפקיד Document Stamps?", aHe: "סימון-סטטוס ויזואלי של המסמך (Draft/Approved/Final) — שליטה ויזואלית במחזור-החיים." },
          ],
          takeawaysHe: ["Manage Legal Documents = העורך-המשפטי של ECM.", "Assembly מ-Clauses + Versioning + Stamps.", "המבנה נקבע ב-Document Type ו-Content Types."],
          relatedHe: [
            { labelHe: "MM · סוגי-מסמכים (9.3.12)", href: "/library/mm/chapter-09/#sub-9.3.12" },
            { labelHe: "MM · חותמות-מסמך (9.3.10)", href: "/library/mm/chapter-09/#sub-9.3.10" },
          ],
        },
        {
          id: "9.2.5",
          titleHe: "ניהול משימות משפטיות",
          titleEn: "Manage Legal Tasks",
          execHe:
            "Manage Legal Tasks מנהלת את פעולות-הטיפול במחזור-חיי החוזה — אישורים, ביקורות, חתימות והקצאות. כל Task משויכת ל-Legal Transaction/Document ומקדמת אותו בזרימת-העבודה. זהו ה'תור-המשימות' של הצוות-המשפטי.",
          beginnerHe:
            "כל דבר שצריך לעשות עם חוזה — לאשר, לבדוק, לחתום — הוא 'משימה'. האפליקציה מציגה את רשימת-המשימות שלך, מי אחראי על מה, ומה הסטטוס. כמו תיבת-נכנס של משימות.",
          consultantHe:
            "Legal Tasks (LCM_TASK) נוצרות אוטומטית מ-Workflow Templates (9.2.8) או ידנית, ומשויכות ל-Transaction/Document. הן נושאות Owner, Due Date, Status ו-Task Type. האפליקציה תומכת ב-Reassignment, ב-Escalation ובמעקב-SLA. אינטגרציה עם SAP Business Workflow / Flexible Workflow.",
          purposeHe:
            "להבטיח שאף שלב לא נופל בין הכיסאות: כל פעולה נדרשת הופכת ל-Task עם אחראי ו-Due Date, ומחזור-החיים מתקדם בשקיפות.",
          processExampleHe:
            "מסמך מוכן ► Workflow יוצר Task 'Legal Review' למשפטן + Task 'Approve' למנהל ► המשפטן מסיים את שלו ► ה-Task של המנהל נפתח ► לאחר אישור נוצר Task 'Sign'.",
          cbcHe:
            "ב-CBC: בהסכם-תרכיז נוצרות Tasks: 'Procurement Review' → 'Legal Review' → 'CFO Approval' (לסכומים גבוהים) → 'Sign'. כל Task עם Due Date; חריגה מפעילה Escalation.",
          navHe: ["SAP Fiori Launchpad ► Manage Legal Tasks", "SPRO ► Enterprise Contract Management ► Configure Workflow"],
          tables: ["LCM_TASK", "LCM_TRANS"],
          tcodes: ["—", "SWDD"],
          fiori: ["Manage Legal Tasks", "My Inbox"],
          configHe: [
            "Task Types נגזרים מ-Workflow Templates (9.2.8).",
            "הגדר Due Dates/Escalation ב-Workflow / Date Types (9.3.3).",
            "אינטגרציה עם Flexible Workflow ל-Approvals.",
          ],
          flow: [
            { he: "Workflow יוצר Tasks", code: "Template" },
            { he: "הקצאה ל-Owners" },
            { he: "טיפול + עדכון-סטטוס" },
            { he: "Escalation בחריגת-Due-Date" },
            { he: "סגירה → קידום-Transaction" },
          ],
          mistakesHe: ["Tasks ללא Due Date — אין מעקב-SLA.", "אי-הגדרת Escalation — משימות תקועות נשכחות.", "הקצאה ידנית במקום אוטומציית-Workflow."],
          troubleshootHe: ["Task לא נוצרת ➔ Workflow Template לא הופעל/קושר ל-Document Type.", "Task לא מתקדמת ➔ Owner לא מוגדר או הרשאה חסרה.", "Escalation לא רץ ➔ Job/Date Type לא מוגדר."],
          bestPracticeHe: ["נהל את כל הפעולות דרך Workflow ולא ידנית.", "הגדר Due Dates ו-Escalation לכל Task-Type קריטי.", "השתמש ב-My Inbox לריכוז משימות."],
          interviewHe: [
            { qHe: "מהי Legal Task וכיצד היא נוצרת?", aHe: "פעולת-טיפול (אישור/ביקורת/חתימה) המשויכת ל-Transaction/Document; נוצרת אוטומטית מ-Workflow Template או ידנית, עם Owner ו-Due Date." },
          ],
          takeawaysHe: ["Legal Tasks = תור-המשימות של מחזור-החיי המשפטי.", "נוצרות מ-Workflow Templates, נושאות Owner/Due Date.", "תומכות ב-Escalation ו-SLA."],
          relatedHe: [{ labelHe: "MM · תבניות-זרימת-עבודה (9.2.8)", href: "/library/mm/chapter-09/#sub-9.2.8" }],
        },
        {
          id: "9.2.6",
          titleHe: "בקשת חוזה משפטי",
          titleEn: "Request Legal Contract",
          execHe:
            "Request Legal Contract היא נקודת-הכניסה למשתמשים-עסקיים (לרוב רכש): טופס-בקשה שיוצר אוטומטית Legal Transaction ומפעיל את זרימת-העבודה המשפטית. זהו ה'שער' שדרכו הארגון מבקש חוזה חדש.",
          beginnerHe:
            "כשמישהו ברכש צריך חוזה חדש, הוא לא פונה למשפטנים במייל — הוא ממלא 'בקשת-חוזה' באפליקציה. המערכת פותחת את העסקה-המשפטית ומעבירה אוטומטית למשפטנים לטיפול.",
          consultantHe:
            "האפליקציה מספקת Self-Service ליוזמי-חוזים: מילוי טופס (סוג-חוזה, צד, ערך, צירוף-מסמכים) → יצירת Legal Transaction עם Document Type ו-Context מתאימים → הפעלת Workflow. ניתן לקשר את הבקשה לאובייקט-עסקי-מקור (PR/PO) דרך Linked Object Types. מפחית עומס על המחלקה-המשפטית.",
          purposeHe:
            "לדמוקרטיזציה של פתיחת-חוזים: לאפשר למשתמש-העסקי ליזום חוזה דרך טופס-מובנה, להבטיח שכל בקשה נכנסת לתהליך מסודר עם כל המידע הדרוש.",
          processExampleHe:
            "רוכש זקוק להסכם-שירות חדש ► ממלא Request Legal Contract (ספק, ערך, סוג) ► המערכת יוצרת Legal Transaction + מפעילה Workflow ► נוצר Task 'Legal Review' ► המשפטן מתחיל הרכבה.",
          cbcHe:
            "ב-CBC: מנהל-לוגיסטיקה זקוק להסכם-הובלה חדש ► ממלא Request Legal Contract עם פרטי-המוביל וערך-החוזה ► נוצר Legal Transaction תחת Context 'Logistics-Suppliers' ► עובר לצוות-המשפטי.",
          navHe: ["SAP Fiori Launchpad ► Request Legal Contract"],
          tables: ["LCM_TRANS", "LCM_LNK"],
          tcodes: ["—"],
          fiori: ["Request Legal Contract", "F4631"],
          configHe: [
            "הגדר אילו Document Types זמינים לבקשה ולאיזה Context הם נכנסים.",
            "קשר את הבקשה ל-Workflow Template המתאים.",
            "אפשר קישור ל-Source Object (PR/PO) דרך Linked Object Types (9.3.8).",
          ],
          flow: [
            { he: "מילוי טופס-בקשה", code: "F4631" },
            { he: "יצירת Legal Transaction", note: "Document Type + Context" },
            { he: "הפעלת Workflow" },
            { he: "Task → צוות-משפטי" },
          ],
          mistakesHe: ["טופס-בקשה עמוס בשדות — מרתיע יוזמים.", "אי-קישור לאובייקט-מקור — אובדן-הקשר עם הרכש."],
          troubleshootHe: ["בקשה לא יוצרת Transaction ➔ Document Type/Context לא מוגדר לבקשה.", "Workflow לא מופעל ➔ Template לא קושר ל-Document Type."],
          bestPracticeHe: ["שמור טופס-בקשה מינימלי וברור.", "קשר תמיד לאובייקט-המקור-העסקי לשמירת-הקשר."],
          interviewHe: [
            { qHe: "מי משתמש ב-Request Legal Contract ולמה?", aHe: "משתמשים-עסקיים (בעיקר רכש) — ליזום חוזה חדש בטופס Self-Service שיוצר Legal Transaction ומפעיל את התהליך-המשפטי, ללא פנייה ידנית למשפטנים." },
          ],
          takeawaysHe: ["Request Legal Contract = שער-הכניסה ליזום-חוזה Self-Service.", "יוצר Legal Transaction + מפעיל Workflow.", "ניתן לקשר לאובייקט-מקור (PR/PO)."],
          relatedHe: [{ labelHe: "MM · סוגי-אובייקט-מקושרים (9.3.8)", href: "/library/mm/chapter-09/#sub-9.3.8" }],
        },
        {
          id: "9.2.7",
          titleHe: "ניהול עסקאות משפטיות",
          titleEn: "Manage Legal Transactions",
          execHe:
            "Manage Legal Transactions היא האפליקציה המרכזית לניהול ה-Legal Transaction — רשומת-העל המשפטית: צדדים, תאריכים, סטטוס, מסמכים-מקושרים וקישורים-לאובייקטים-עסקיים. כאן מנהלים את העסקה לאורך כל מחזור-חייה.",
          beginnerHe:
            "Legal Transaction הוא 'התיק' של החוזה — מי הצדדים, מתי נחתם, מתי פג, אילו מסמכים שייכים לו ולאיזו הזמנת-רכש הוא קשור. האפליקציה הזו היא המקום שבו רואים ומנהלים את כל התיק.",
          consultantHe:
            "ה-Transaction (LCM_TRANS) מאגד Legal Documents, Dates (לפי Date Types 9.3.3), Internal/External Contacts (9.3.4/9.3.6), Reminders (9.3.2) ו-Linked Objects (9.3.8). האפליקציה תומכת בכל מחזור-החיים: יצירה, עדכון, קישור, סטטוס וחידוש. ה-Profile (9.3.11) קובע את ההתנהגות והשדות-הזמינים.",
          purposeHe:
            "לספק תצוגת-360 על העסקה-המשפטית: כל מה שקשור לחוזה במקום אחד — מסמכים, צדדים, תאריכים, תזכורות וקישורים — לניהול ובקרה מלאים.",
          processExampleHe:
            "משפטן פותח Legal Transaction ► מוסיף External Contact (נציג-הספק) ► מגדיר Date Type 'Expiration' = 31.12 ► מקשר את ה-Legal Document המורכב ► מקשר Linked Object להזמנת-הרכש ► קובע Reminder 60 יום לפני פקיעה.",
          cbcHe:
            "ב-CBC: ה-Legal Transaction של הסכם-התרכיז מאגד את ה-Document המורכב, את נציג-הספק (External Contact), את מנהל-הרכש (Internal Contact), תאריך-פקיעה, Reminder, וקישור לחוזה-הרכש ב-MM.",
          navHe: ["SAP Fiori Launchpad ► Manage Legal Transactions", "SPRO ► Enterprise Contract Management ► Profiles / Document Types"],
          tables: ["LCM_TRANS", "LCM_DOC", "LCM_LNK", "LCM_DATE"],
          tcodes: ["—"],
          fiori: ["Manage Legal Transactions", "F4072"],
          configHe: [
            "Profile (9.3.11) קובע את התנהגות-ה-Transaction ואת השדות.",
            "Date Types (9.3.3) ו-Reminder Types (9.3.2) זמינים לפי Profile.",
            "Linked Object Types (9.3.8) מאפשרים קישור ל-PO/Contract/Supplier.",
          ],
          flow: [
            { he: "יצירת/פתיחת Transaction", note: "Profile + Document Type" },
            { he: "הוספת Contacts + Dates" },
            { he: "קישור Legal Documents" },
            { he: "קישור Linked Objects", note: "PO/Contract" },
            { he: "Reminders + מעקב-סטטוס" },
          ],
          masterDataHe: [
            "Legal Transaction = רשומת-העל (LCM_TRANS): צדדים, סטטוס, תאריכים.",
            "מאגדת Documents, Dates, Contacts, Reminders ו-Linked Objects.",
          ],
          mistakesHe: ["ניהול חוזה ללא Date Type 'Expiration' — אין בסיס ל-Reminder.", "אי-קישור Linked Object — ניתוק מהעולם-העסקי.", "Profile שגוי — שדות/התנהגות לא-מתאימים."],
          troubleshootHe: ["Reminder לא נשלח ➔ Date Type-מקור או Reminder Type לא מוגדר.", "לא ניתן לקשר PO ➔ Linked Object Type חסר.", "שדה חסר ב-Transaction ➔ Profile לא מאפשר אותו."],
          bestPracticeHe: ["הגדר תמיד תאריך-פקיעה + Reminder לחוזים מתחדשים.", "קשר כל Transaction לאובייקט-העסקי שהיא תומכת בו.", "בחר Profile מתאים לסוג-החוזה."],
          interviewHe: [
            { qHe: "מה מאגד ה-Legal Transaction?", aHe: "את כל מרכיבי-החוזה: Legal Documents, תאריכים (Date Types), אנשי-קשר פנימיים/חיצוניים, Reminders וקישורים לאובייקטים-עסקיים (PO/Contract)." },
            { qHe: "מה קובע ה-Profile ב-Transaction?", aHe: "את ההתנהגות, השדות-הזמינים, ואת ה-Date/Reminder Types המותרים ל-Transaction." },
          ],
          takeawaysHe: ["Manage Legal Transactions = תצוגת-360 על העסקה-המשפטית.", "מאגד Documents, Dates, Contacts, Reminders, Linked Objects.", "ה-Profile קובע התנהגות ושדות."],
          relatedHe: [
            { labelHe: "MM · פרופילים (9.3.11)", href: "/library/mm/chapter-09/#sub-9.3.11" },
            { labelHe: "MM · סוגי-תאריך (9.3.3)", href: "/library/mm/chapter-09/#sub-9.3.3" },
          ],
        },
        {
          id: "9.2.8",
          titleHe: "ניהול תבניות זרימת-עבודה",
          titleEn: "Manage Workflow Templates",
          execHe:
            "Manage Workflow Templates מגדירה את תהליכי-האישור והטיפול האוטומטיים: אילו Tasks נוצרות, באיזה סדר, למי, ובאילו תנאים. התבניות הופכות את מחזור-החיי המשפטי מתהליך-ידני לזרימה-אוטומטית מבוקרת.",
          beginnerHe:
            "תבנית-זרימה היא 'המתכון' של התהליך: 'קודם המשפטן בודק, אחר-כך המנהל מאשר, ואם הסכום גבוה גם ה-CFO'. במקום לזכור את הסדר בכל פעם, התבנית מייצרת את המשימות הנכונות אוטומטית.",
          consultantHe:
            "התבניות מבוססות Flexible Workflow / SAP Business Workflow. כל Template מגדיר Steps (Task Types), Agents (Roles/Responsibility), תנאים (Start/Step Conditions) ו-Escalation. ב-S/4HANA מומלץ Flexible Workflow (Manage Workflows) עם Preconditions מבוססות-נתוני-Transaction (ערך/Document Type). התבנית מקושרת ל-Document Type כדי שתופעל אוטומטית.",
          purposeHe:
            "לתקנן ולאכוף תהליכי-אישור: כל סוג-חוזה עובר את שרשרת-האישורים הנכונה אוטומטית, עם בקרת-תנאים (סכום, סוג) ו-Escalation — ממשל-תאגידי אכיף.",
          processExampleHe:
            "Template 'Supply Agreement Approval': Step 1 Legal Review → Step 2 Procurement Approval → Step 3 (אם ערך>1M) CFO Approval → Step 4 Sign. בעת יצירת מסמך מסוג זה, ה-Tasks נוצרות אוטומטית בסדר.",
          cbcHe:
            "ב-CBC: Template להסכמי-תרכיז מחייב CFO-Approval מעל 500K€ ו-Legal-Review תמיד; הסכמי-NDA עוברים מסלול-מקוצר (Legal-Review → Sign בלבד). התנאים מבוססים על ערך-החוזה ו-Category.",
          navHe: ["SAP Fiori Launchpad ► Manage Workflows / Manage Workflow Templates", "SPRO ► Enterprise Contract Management ► Configure Flexible Workflow"],
          tables: ["LCM_TASK", "SWD_HEADER", "LCM_TRANS"],
          tcodes: ["—", "SWDD", "SWDD_SCENARIO"],
          fiori: ["Manage Workflows", "Manage Workflow Templates"],
          configHe: [
            "הגדר Steps (Task Types), Agents (Roles) ו-Step Conditions.",
            "השתמש ב-Preconditions מבוססות-נתונים (ערך/Document Type/Category) ל-routing.",
            "קשר Template ל-Document Type להפעלה-אוטומטית; הגדר Escalation.",
          ],
          flow: [
            { he: "הגדרת Template", note: "Steps + Agents" },
            { he: "Preconditions", note: "ערך/Type/Category" },
            { he: "קישור ל-Document Type" },
            { he: "הפעלה-אוטומטית → Tasks" },
            { he: "Escalation בחריגה" },
          ],
          mistakesHe: ["תבנית נוקשה ללא Conditions — כל חוזה עובר אותו מסלול גם כשמיותר.", "Agents מוגדרים למשתמש ולא ל-Role — שביר בעזיבת-עובד.", "אי-קישור Template ל-Document Type — לא מופעל."],
          troubleshootHe: ["Workflow לא מתחיל ➔ Start Condition לא מתקיים או Template לא פעיל/מקושר.", "Step מדלג על-אישור ➔ Step Condition שגוי.", "Agent לא נמצא ➔ Responsibility/Role לא מאוכלס."],
          bestPracticeHe: ["העדף Flexible Workflow עם Preconditions מבוססות-נתונים.", "הקצה Agents לפי Role ולא לפי-משתמש.", "בנה מסלולים שונים לערכים/סוגים שונים."],
          interviewHe: [
            { qHe: "מה מגדירה Workflow Template ב-ECM?", aHe: "את שלבי-הטיפול (Task Types), האחראים (Agents/Roles), התנאים (Preconditions/Step Conditions) וה-Escalation — ויוצרת את ה-Legal Tasks אוטומטית." },
            { qHe: "כיצד מנתבים אישורים לפי ערך-חוזה?", aHe: "דרך Preconditions/Step Conditions ב-Flexible Workflow המבוססים על נתוני-ה-Transaction (ערך, Document Type, Category)." },
          ],
          takeawaysHe: ["Workflow Templates = מנוע-האוטומציה של מחזור-החיי המשפטי.", "מגדירות Steps, Agents, Conditions, Escalation.", "Flexible Workflow עם Preconditions מבוססות-נתונים מומלץ."],
          relatedHe: [{ labelHe: "MM · ניהול-משימות (9.2.5)", href: "/library/mm/chapter-09/#sub-9.2.5" }],
        },
      ],
    },
    // ============================================================ 9.3
    {
      id: "9.3",
      titleHe: "התאמה אישית של ניהול חוזים ארגוני",
      titleEn: "Customizing Enterprise Contract Management",
      execHe:
        "פרק-הקונפיגורציה של ECM, היושב ב-SPRO תחת Enterprise Contract Management / Legal Content Management. כאן מגדירים את כל אבני-הבניין: טווחי-מספרים, סוגי-תזכורת/תאריך, אנשי-קשר, סוגי-ישות, סוגי-אובייקטים-מקושרים, סוגי-תוכן, חותמות, פרופילים, סוגי-מסמכים והגדרות-Job. ללא קונפיגורציה זו, האפליקציות ריקות.",
      beginnerHe:
        "לפני שעובדים ב-ECM צריך 'להכין את המגרש' ב-SPRO: להגדיר מאיזה מספר חוזים מתחילים, אילו סוגי-תזכורת קיימים, אילו סוגי-תאריך, מי אנשי-הקשר, איך מקשרים להזמנות-רכש וכו'. כל הגדרה כאן מאפשרת חלק מהעבודה היומיומית באפליקציות.",
      consultantHe:
        "כל ה-Customizing מבוצע ב-IMG. ההיררכיה: Legal Content Management מספק תשתית-תוכן (Content Types, Contexts, Entity Types, Technical/Linked Object Types, Profiles), בעוד Enterprise Contract Management מוסיף את השכבה-העסקית (Number Ranges, Reminder/Date Types, Contacts, Document Stamps, Document Types, Background Jobs). הסדר חשוב: Entity/Technical Types לפני Contexts/Linked Objects; Content Types/Profiles לפני Document Types.",
      purposeHe:
        "להגדיר את כל אבני-הבניין המאפשרות את ECM: מטווחי-מספרים ועד תבניות-מסמך. קונפיגורציה נכונה = אפליקציות עובדות; חסרה = שגיאות וחוסר-יכולת ליצור Transactions/Documents.",
      processExampleHe:
        "מימוש ECM: מגדירים Number Ranges → Entity Types → Contexts → Content Types → Profiles → Document Types → Date/Reminder Types → Contacts → Linked Object Types → Document Stamps → Background Jobs. רק אז האפליקציות מוכנות לעבודה.",
      cbcHe:
        "ב-CBC: צוות-המימוש מגדיר טווח-מספרים נפרד להסכמי-ספקים, Reminder Type ל-60/30 יום לפני פקיעה, Date Types 'Effective/Expiration', Linked Object Type לחוזה-רכש, ו-Document Type לכל סוג-הסכם (תרכיז/לוגיסטיקה/NDA).",
      navHe: [
        "SPRO ► Cross-Application Components ► Enterprise Contract Management",
        "SPRO ► Cross-Application Components ► Legal Content Management",
      ],
      tables: ["LCM_TRANS", "LCM_DOC", "LCM_CTX", "TNRO", "LCM_DTYPE"],
      tcodes: ["SPRO", "SNRO"],
      fiori: ["—"],
      configHe: [
        "Legal Content Management = תשתית; Enterprise Contract Management = שכבה-עסקית.",
        "סדר-מימוש מומלץ: Number Ranges → Entity/Technical Types → Contexts/Linked Objects → Content Types/Profiles → Document Types → Dates/Reminders/Contacts/Stamps → Jobs.",
        "רוב ההגדרות הן Cross-Client (Customizing) — נדרש Transport.",
      ],
      mistakesHe: [
        "התחלת-קונפיגורציה מ-Document Types לפני Content Types/Profiles — תלות שבורה.",
        "דילוג על Number Ranges — לא ניתן ליצור Transactions.",
        "אי-תכנון סדר-המימוש — חזרות ותיקונים מיותרים.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור Transaction ➔ Number Range/Profile/Document Type חסר.",
        "אפליקציה זורקת שגיאת-קונפיגורציה ➔ אובייקט-תלוי (Content Type/Entity) לא הוגדר.",
        "הגדרה לא נראית במערכת-יעד ➔ Transport לא הועבר.",
      ],
      bestPracticeHe: [
        "עקוב אחר סדר-המימוש המומלץ — מהתשתית לעסקי.",
        "תעד כל אובייקט-קונפיגורציה ואת תלויותיו.",
        "בדוק End-to-End ב-QA לפני Production.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין שתי תיקיות-ה-IMG של ECM?", aHe: "Legal Content Management = תשתית-התוכן (Contexts, Content Types, Profiles, Entity/Linked Types); Enterprise Contract Management = השכבה-העסקית (Number Ranges, Reminder/Date Types, Document Types, Jobs)." },
        { qHe: "מהו סדר-המימוש הנכון?", aHe: "טווחי-מספרים, סוגי-ישות/טכניים, Contexts וסוגי-אובייקטים-מקושרים, סוגי-תוכן ופרופילים, ואז סוגי-מסמכים, תאריכים/תזכורות/אנשי-קשר/חותמות, ולבסוף Jobs." },
      ],
      takeawaysHe: [
        "כל ה-Customizing של ECM ב-SPRO תחת שתי תיקיות: LCM (תשתית) ו-ECM (עסקי).",
        "סדר-המימוש קריטי: מהתשתית לעסקי, מכבדים תלויות.",
        "ללא קונפיגורציה — האפליקציות ריקות ולא-פעילות.",
      ],
      relatedHe: [{ labelHe: "MM · ניהול-עסקאות-משפטיות (9.2.7)", href: "/library/mm/chapter-09/#sub-9.2.7" }],
      children: [
        {
          id: "9.3.1",
          titleHe: "טווחי מספרים",
          titleEn: "Number Ranges",
          execHe:
            "Number Ranges קובעים את מזהי ה-Legal Transactions/Documents — פנימי (מערכת מקצה) או חיצוני (משתמש מזין), טווח וקידומת. ללא טווח-מספרים פעיל לא ניתן ליצור אף עסקה משפטית.",
          beginnerHe:
            "כל חוזה צריך 'מספר-זהות'. טווח-המספרים קובע מאיזה מספר מתחילים ומה הטווח — למשל 1000000–1999999. המערכת מקצה את המספר הבא הפנוי אוטומטית (פנימי) או שהמשתמש מקליד (חיצוני).",
          consultantHe:
            "מוגדר דרך SNRO / IMG עם Number Range Object ייעודי ל-ECM. כל Object נושא Intervals (פנימי/חיצוני) המשויכים ל-Profile/Document Type. הקצאה פנימית מומלצת לעקביות; חיצונית למיגרציה. ה-Buffer של טווח-המספרים יכול לגרום ל'חורים' במספור.",
          purposeHe:
            "להבטיח מזהה ייחודי וניתן-למעקב לכל עסקה/מסמך, ולאפשר הפרדת-טווחים לפי סוג-חוזה לצורכי-זיהוי ודיווח.",
          processExampleHe:
            "אדמין מגדיר Interval 1000000–1999999 כפנימי לעסקאות-רכש ► בעת יצירת Legal Transaction המערכת מקצה 1000001 ► החוזה הבא יקבל 1000002.",
          cbcHe:
            "ב-CBC: טווח-מספרים נפרד להסכמי-ספקים (3000000–3999999) להבדילם מחוזים-משפטיים-תאגידיים (1000000–1999999), לזיהוי-מהיר בדיווח.",
          navHe: ["SPRO ► Enterprise Contract Management ► Basic Settings ► Define Number Ranges", "SNRO (Number Range Object)"],
          tables: ["TNRO", "NRIV", "LCM_TRANS"],
          tcodes: ["SNRO", "SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Number Range Object ו-Intervals (פנימי/חיצוני).",
            "שייך את הטווח ל-Profile/Document Type המתאים.",
            "העדף הקצאה-פנימית; שמור חיצונית למיגרציה.",
          ],
          mistakesHe: ["אי-הגדרת טווח — חוסם יצירת-Transactions.", "טווח קטן מדי — אוזל ועוצר עבודה.", "ערבוב פנימי/חיצוני ללא-צורך."],
          troubleshootHe: ["'No number range' בעת יצירה ➔ Interval לא מוגדר/לא-משויך.", "'Number range exhausted' ➔ הטווח אזל — הרחב.", "'חורים' במספור ➔ Buffering (תקין, לא-שגיאה)."],
          bestPracticeHe: ["הגדר טווחים נדיבים מראש.", "הפרד טווחים לפי סוג-חוזה לזיהוי.", "השתמש בהקצאה-פנימית כברירת-מחדל."],
          interviewHe: [
            { qHe: "מה ההבדל בין טווח-מספרים פנימי לחיצוני?", aHe: "פנימי = המערכת מקצה את המספר-הבא אוטומטית (עקבי); חיצוני = המשתמש מזין ידנית (למיגרציה/אינטגרציה)." },
          ],
          takeawaysHe: ["Number Range = מזהה ייחודי לכל Transaction/Document.", "פנימי (אוטומטי) או חיצוני (ידני).", "תנאי-סף ליצירת עסקאות."],
        },
        {
          id: "9.3.2",
          titleHe: "סוגי תזכורת",
          titleEn: "Reminder Types",
          execHe:
            "Reminder Types מגדירים תזכורות-אוטומטיות לאירועי-מפתח בחוזה — בעיקר לפני פקיעה/חידוש. כל Type קובע מתי (יחסית לתאריך-מקור), למי, ומה-תוכן ההתראה. זהו מנגנון מניעת 'פקיעת-חוזה-בהפתעה'.",
          beginnerHe:
            "תזכורת אומרת למערכת 'הזכר לי 60 יום לפני שהחוזה פג'. סוג-התזכורת קובע את מספר-הימים, את מי להזכיר ומה לכתוב. כך אף חוזה קריטי לא פג בלי שמישהו ידע.",
          consultantHe:
            "Reminder Type מקושר ל-Date Type-מקור (9.3.3) ולתזמון (offset בימים, חזרתיות). הוא מופעל דרך Background Job (9.3.13) הסורק תאריכים ומפיק התראות (Notification/Email/Task). מומלץ לקשר Reminder ל-Profile כך שכל Transaction רלוונטי יורש אותו.",
          purposeHe:
            "לנהל פרואקטיבית חידושי-חוזים ומועדים-קריטיים: התראה-בזמן מאפשרת חידוש/משא-ומתן לפני פקיעה, ומונעת המשך-אספקה-ללא-חוזה או קנסות.",
          processExampleHe:
            "Reminder Type 'Pre-Expiration-60' מקושר ל-Date Type 'Expiration' עם offset=-60 ► Background Job יומי מזהה חוזה הפג בעוד 60 יום ► שולח התראה למנהל-החוזים + יוצר Task 'Initiate Renewal'.",
          cbcHe:
            "ב-CBC: שני Reminder Types להסכם-תרכיז — 'Pre-Expiration-90' (התראה אסטרטגית למנהל-רכש) ו-'Pre-Expiration-30' (התראה דחופה + Task-חידוש). מבטיח שהסכם-התרכיז הקריטי לעולם לא פג.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define Reminder Types"],
          tables: ["LCM_RTYPE", "LCM_DATE", "LCM_TRANS"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Reminder Type, קשר ל-Date Type-מקור ו-offset (ימים, סימן +/-).",
            "קבע נמענים (Role/Contact) ופעולה (Notification/Email/Task).",
            "קשר ל-Profile והפעל Background Job (9.3.13) שמריץ אותו.",
          ],
          flow: [
            { he: "הגדרת Reminder Type", note: "Date-source + offset" },
            { he: "קישור ל-Profile" },
            { he: "Background Job סורק תאריכים", code: "9.3.13" },
            { he: "התראה/Task לנמען" },
          ],
          mistakesHe: ["Reminder ללא Background Job פעיל — לא נשלח לעולם.", "offset קצר מדי — אין זמן לחידוש.", "Date-source שגוי — מזכיר על תאריך לא-נכון."],
          troubleshootHe: ["תזכורת לא נשלחת ➔ Background Job לא מתוזמן או Reminder לא מקושר ל-Profile.", "תזכורת על תאריך-שגוי ➔ Date Type-מקור שגוי.", "נמען לא מקבל ➔ Role/Contact ריק."],
          bestPracticeHe: ["הגדר תזכורות-מדורגות (90/30 יום) לחוזים קריטיים.", "ודא תמיד שה-Background Job פעיל.", "קשר Reminder ל-Task-חידוש לפעולה, לא רק להתראה."],
          interviewHe: [
            { qHe: "כיצד פועל Reminder Type ב-ECM?", aHe: "מקושר ל-Date Type-מקור עם offset; Background Job יומי סורק את התאריכים ומפיק התראה/Task לנמען לפני האירוע (למשל 60 יום לפני פקיעה)." },
            { qHe: "מה תנאי-הכרחי כדי שתזכורת תישלח?", aHe: "Background Job (9.3.13) פעיל ומתוזמן שמריץ את סריקת-התאריכים." },
          ],
          takeawaysHe: ["Reminder Types = התראות-אוטומטיות לפני אירועי-מפתח.", "מקושרים ל-Date Type עם offset, מורצים ע\"י Background Job.", "מונעים פקיעת-חוזה-בהפתעה."],
          relatedHe: [
            { labelHe: "MM · סוגי-תאריך (9.3.3)", href: "/library/mm/chapter-09/#sub-9.3.3" },
            { labelHe: "MM · הגדרות-Job (9.3.13)", href: "/library/mm/chapter-09/#sub-9.3.13" },
          ],
        },
        {
          id: "9.3.3",
          titleHe: "סוגי תאריך",
          titleEn: "Date Types",
          execHe:
            "Date Types מגדירים את התאריכים-המשמעותיים שניתן לתחזק ב-Legal Transaction — Effective, Expiration, Signature, Renewal וכו'. הם הבסיס ל-Reminders, ל-Workflow-conditions ולדיווח-מועדים.",
          beginnerHe:
            "כל חוזה נושא תאריכים חשובים: מתי נכנס-לתוקף, מתי פג, מתי נחתם. Date Types הם 'סוגי-התאריך' שמגדירים אילו תאריכים אפשר לתחזק, וכל אחד מקבל שם ומשמעות.",
          consultantHe:
            "כל Date Type נושא מאפיינים: חובה/אופציונלי, ניתן-לחישוב (Derived מ-Date אחר), ומשמש כ-source ל-Reminders. מקושר ל-Profile (אילו Date Types זמינים). תאריכים מאוחסנים ב-LCM_DATE. ניתן להגדיר Date-Rules (חישוב Expiration מ-Effective + Term).",
          purposeHe:
            "לתקנן את שפת-התאריכים בחוזים, לאפשר תזכורות ותנאי-Workflow מבוססי-תאריך, ולתמוך בדיווח 'אילו חוזים פגים ברבעון הבא'.",
          processExampleHe:
            "Date Type 'Effective'=1.1, 'Term'=12 חודשים → Date-Rule מחשבת 'Expiration'=31.12 → Reminder Type מתבסס על 'Expiration' להתראת-חידוש.",
          cbcHe:
            "ב-CBC: הסכם-תרכיז נושא Date Types 'Effective', 'Expiration', 'Auto-Renewal-Notice'. ה-Expiration נגזרת אוטומטית מ-Effective + תקופה, וה-Auto-Renewal-Notice מזין תזכורת.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define Date Types"],
          tables: ["LCM_DTYPE", "LCM_DATE", "LCM_TRANS"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Date Types ומאפיינים: חובה/אופציונלי, Derived (Date-Rule).",
            "קשר ל-Profile לקביעת זמינות ב-Transaction.",
            "הגדר Date-Rules לחישוב-תאריכים (Expiration = Effective + Term).",
          ],
          mistakesHe: ["אי-הגדרת Date Type 'Expiration' — אין בסיס ל-Reminder.", "כל התאריכים אופציונליים — נתונים חסרים.", "אי-שימוש ב-Date-Rules — חישוב-ידני שגוי."],
          troubleshootHe: ["Reminder אין-לו-מקור ➔ Date Type-מקור לא מוגדר/לא-מאוכלס.", "Date Type לא זמין ב-Transaction ➔ לא מקושר ל-Profile.", "Expiration לא מחושב ➔ Date-Rule חסר."],
          bestPracticeHe: ["סמן Date Types קריטיים (Expiration) כחובה.", "השתמש ב-Date-Rules לחישוב-אוטומטי.", "תאם Date Types עם Reminder/Workflow."],
          interviewHe: [
            { qHe: "מדוע Date Types חשובים ב-ECM?", aHe: "הם הבסיס ל-Reminders, לתנאי-Workflow ולדיווח-מועדים; בלעדיהם אין מנגנון תזכורות-חידוש." },
            { qHe: "מהו Date-Rule?", aHe: "כלל-חישוב הגוזר תאריך מתאריך-אחר (Expiration = Effective + Term), למניעת-טעויות ידניות." },
          ],
          takeawaysHe: ["Date Types = התאריכים-המשמעותיים בחוזה.", "בסיס ל-Reminders, Workflow ודיווח.", "Date-Rules מחשבים תאריכים-נגזרים."],
          relatedHe: [{ labelHe: "MM · סוגי-תזכורת (9.3.2)", href: "/library/mm/chapter-09/#sub-9.3.2" }],
        },
        {
          id: "9.3.4",
          titleHe: "אנשי קשר פנימיים",
          titleEn: "Internal Contacts",
          execHe:
            "Internal Contacts מגדירים את התפקידים-הפנימיים המשויכים ל-Legal Transaction — מנהל-החוזה, היועץ-המשפטי, הרוכש-האחראי. הם קובעים אחריות, נמעני-תזכורות ו-Agents ל-Workflow.",
          beginnerHe:
            "לכל חוזה יש 'אנשים מטעם החברה' שאחראים עליו — מי הרוכש, מי המשפטן. Internal Contacts הם רשימת-התפקידים האלה, כדי שהמערכת תדע למי לשלוח תזכורות ומשימות.",
          consultantHe:
            "Internal Contact Types מקושרים ל-User/Business Partner/Org-Role ומשויכים ל-Transaction. הם משמשים כ-Agents ב-Workflow, כנמעני-Reminders וכבסיס-להרשאות. מומלץ לקשר ל-Role ולא ל-User ספציפי לעמידות בעזיבת-עובד.",
          purposeHe:
            "להגדיר בעלות ואחריות פנימית ברורה לכל חוזה, ולספק את הנמענים ל-Workflow ול-Reminders אוטומטית.",
          processExampleHe:
            "Internal Contact Type 'Contract Owner' = מנהל-החוזים, 'Legal Counsel' = המשפטן ► Workflow מנתב Tasks אליהם ► Reminders נשלחות ל-'Contract Owner'.",
          cbcHe:
            "ב-CBC: בהסכם-תרכיז Internal Contacts = 'Procurement Lead' (רוכש-תרכיז), 'Legal Counsel' (משפטן-CBC), 'Contract Owner' (מנהל-חוזים). כולם מקבלים תזכורות ומשימות לפי-תפקיד.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define Internal Contact Types"],
          tables: ["LCM_CONTACT", "LCM_TRANS"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Internal Contact Types (Owner/Counsel/Buyer).",
            "קשר ל-Role/Business Partner ולא ל-User ספציפי.",
            "שייך לתזכורות ול-Workflow-Agents.",
          ],
          mistakesHe: ["קישור ל-User ולא ל-Role — שביר בעזיבה.", "אי-הגדרת Owner — אין נמען ברור לתזכורות."],
          troubleshootHe: ["תזכורת/Task לא מגיעה ➔ Internal Contact לא מאוכלס ב-Transaction.", "Agent חסר ב-Workflow ➔ Contact Type לא מקושר ל-Step."],
          bestPracticeHe: ["קשר Internal Contacts ל-Roles ארגוניים.", "הגדר תמיד 'Contract Owner' כברירת-מחדל."],
          interviewHe: [
            { qHe: "לְמה משמשים Internal Contacts?", aHe: "להגדרת בעלות-פנימית על החוזה ולספק Agents ל-Workflow ונמענים ל-Reminders; מומלץ לקשר ל-Role." },
          ],
          takeawaysHe: ["Internal Contacts = תפקידים-פנימיים האחראים על החוזה.", "Agents ל-Workflow ונמעני-Reminders.", "קשר ל-Role, לא ל-User."],
        },
        {
          id: "9.3.5",
          titleHe: "סוגי ישות",
          titleEn: "Entity Types",
          execHe:
            "Entity Types מגדירים את סוגי-הצמתים בהיררכיית ה-Contexts — למשל 'Company', 'Business Unit', 'Region', 'Category'. הם השלד המבני שעליו נבנה עץ ה-Contexts (9.2.2).",
          beginnerHe:
            "לפני שבונים את 'עץ-התיקיות' (Contexts), צריך להגדיר אילו 'סוגי-צמתים' קיימים — האם צומת הוא חברה, יחידה-עסקית, אזור וכו'. Entity Types הם רשימת-הסוגים האלה.",
          consultantHe:
            "Entity Types מגדירים את ה-levels/types המותרים בעץ ה-Context (LCM_ENTITY). כל Type נושא מאפיינים (Authorization-relevance, ניתן-להכלה תחת Type אחר). הם נדרשים לפני בניית-Contexts. מאפשרים מבנה-היררכי עקבי ואכיף.",
          purposeHe:
            "לספק מבנה עקבי ואכיף להיררכיית-ה-Context: להגדיר אילו סוגי-יחידות קיימים וכיצד הם מתקננים, כדי שעץ-ההקשרים יהיה הגיוני ובר-תחזוקה.",
          processExampleHe:
            "אדמין מגדיר Entity Types 'Company'→'Region'→'Business Unit' ► בבניית-Contexts הוא יוצר צמתים מסוגים אלה לפי-סדר-ההיררכיה המותר.",
          cbcHe:
            "ב-CBC: Entity Types = 'Corporation' (CBC) → 'Country' (Israel) → 'Function' (Procurement) → 'Supplier-Group'. עליהם נבנה עץ ה-Contexts של הסכמי-הספקים.",
          navHe: ["SPRO ► Legal Content Management ► Define Entity Types"],
          tables: ["LCM_ENTITY", "LCM_CTX"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Entity Types ואת כללי-ההכלה ביניהם (מי-תחת-מי).",
            "סמן Authorization-relevance לפי-צורך.",
            "הגדר לפני בניית-Contexts (9.2.2).",
          ],
          mistakesHe: ["בניית-Contexts לפני הגדרת-Entity-Types — מבנה לא-עקבי.", "סוגים רבים מדי — היררכיה מסורבלת."],
          troubleshootHe: ["לא ניתן ליצור Context-צומת ➔ Entity Type לא מוגדר/לא-מותר תחת ההורה.", "הרשאות-Context לא עובדות ➔ Entity Type לא סומן Authorization-relevant."],
          bestPracticeHe: ["הגדר Entity Types לפי המבנה-הארגוני האמיתי.", "שמור מספר-סוגים מצומצם ועקבי."],
          interviewHe: [
            { qHe: "מה הקשר בין Entity Types ל-Contexts?", aHe: "Entity Types מגדירים את סוגי-הצמתים והיררכיית-ההכלה; עליהם נבנה עץ ה-Contexts. חייבים להגדירם לפני בניית-Contexts." },
          ],
          takeawaysHe: ["Entity Types = סוגי-הצמתים בעץ ה-Context.", "השלד המבני להיררכיה.", "מוגדרים לפני Contexts."],
          relatedHe: [{ labelHe: "MM · ניהול-הקשרים (9.2.2)", href: "/library/mm/chapter-09/#sub-9.2.2" }],
        },
        {
          id: "9.3.6",
          titleHe: "אנשי קשר חיצוניים",
          titleEn: "External Contacts",
          execHe:
            "External Contacts מגדירים את הצדדים-החיצוניים לחוזה — נציגי-הספק/הלקוח, עורכי-דין-חיצוניים. הם מקושרים ל-Business Partner ומאפשרים זיהוי-צד, התכתבות ודיווח לפי-ספק.",
          beginnerHe:
            "לכל חוזה יש 'צד שני' — האדם או החברה שמולם חותמים. External Contacts הם רשימת-אנשי-הקשר החיצוניים, כדי שהמערכת תדע מי הצד-השני ואיך ליצור איתו קשר.",
          consultantHe:
            "External Contact Types מקושרים ל-Business Partner (Supplier/Customer/Person) ומשויכים ל-Transaction. בניגוד ל-Internal Contacts (תפקידים-פנימיים), אלה צדדים-חיצוניים. משמשים לזיהוי-צד-חוזי, להתכתבות, ולדיווח 'כל החוזים מול ספק X'. מאוחסנים ב-LCM_CONTACT עם הבחנת Internal/External.",
          purposeHe:
            "לזהות ולתעד את הצדדים-החיצוניים לחוזה, לאפשר ניתוח-ספק רוחבי ('כמה חוזים פעילים מול ספק זה') ולתמוך בהתכתבות-חוזית.",
          processExampleHe:
            "External Contact Type 'Supplier Representative' מקושר ל-Business Partner של הספק ► משויך ל-Transaction ► מאפשר דיווח 'כל החוזים מול ספק זה' ושליחת-מסמכים אליו.",
          cbcHe:
            "ב-CBC: External Contacts בהסכם-תרכיז = 'Supplier Account Manager' (נציג-ספק-התרכיז) ו-'External Legal Counsel' (עו\"ד-חיצוני). מקושרים ל-BP של הספק לזיהוי וניתוח.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define External Contact Types"],
          tables: ["LCM_CONTACT", "BUT000", "LCM_TRANS"],
          tcodes: ["SPRO", "BP"],
          fiori: ["—"],
          configHe: [
            "הגדר External Contact Types (Supplier Rep/External Counsel).",
            "קשר ל-Business Partner (Supplier/Person).",
            "אבחן מ-Internal Contacts (9.3.4) — אלה צדדים-חיצוניים.",
          ],
          mistakesHe: ["בלבול בין External ל-Internal Contacts.", "אי-קישור ל-Business Partner — אובדן זיהוי-צד ודיווח-ספק."],
          troubleshootHe: ["דיווח-לפי-ספק ריק ➔ External Contact לא מקושר ל-BP.", "Contact Type לא זמין ➔ לא מוגדר/לא-מקושר ל-Profile."],
          bestPracticeHe: ["קשר External Contacts ל-Business Partner קיים, לא לטקסט-חופשי.", "הבחן בבירור בין צדדים-פנימיים לחיצוניים."],
          interviewHe: [
            { qHe: "מה ההבדל בין Internal ל-External Contacts?", aHe: "Internal = תפקידים-פנימיים בחברה (Owner/Counsel) המשמשים כ-Agents/נמענים; External = צדדים-חיצוניים (ספק/עו\"ד-חיצוני) המקושרים ל-Business Partner." },
          ],
          takeawaysHe: ["External Contacts = הצדדים-החיצוניים לחוזה.", "מקושרים ל-Business Partner.", "מאפשרים זיהוי-צד ודיווח-ספק."],
          relatedHe: [{ labelHe: "MM · אנשי-קשר-פנימיים (9.3.4)", href: "/library/mm/chapter-09/#sub-9.3.4" }],
        },
        {
          id: "9.3.7",
          titleHe: "סוגים טכניים לסוגי אובייקטים מקושרים",
          titleEn: "Technical Types for Linked Object Types",
          execHe:
            "Technical Types for Linked Object Types מגדירים את התשתית-הטכנית לקישור — אילו אובייקטים-טכניים (BO/CDS/Class) ניתן לקשר ל-Legal Transaction. הם השכבה-הטכנית שעליה נבנים ה-Linked Object Types העסקיים (9.3.8).",
          beginnerHe:
            "לפני שמגדירים 'איזה הזמנת-רכש לקשר לחוזה' (השכבה-העסקית), צריך להגדיר את ה'איך-טכני' — איזה סוג-אובייקט-מערכת זה ואיך ניגשים אליו. זו הגדרה טכנית שמכינה את הקרקע.",
          consultantHe:
            "Technical Type מגדיר את ה-Object Implementation: Business Object/CDS View/Class המספק את ה-API לקריאה/ניווט אל האובייקט-המקושר. הוא כולל את ה-Determination של מפתח, תיאור ו-Navigation-target. ה-Linked Object Type (9.3.8) מצביע על Technical Type. הפרדה זו מאפשרת שימוש-חוזר טכני בין סוגים-עסקיים.",
          purposeHe:
            "להפריד את ה'איך-טכני' מה'מה-עסקי' בקישורים: שכבה-טכנית בת-שימוש-חוזר שמגדירה כיצד ניגשים לאובייקט, שעליה נבנים סוגי-קישור עסקיים מרובים.",
          processExampleHe:
            "מגדירים Technical Type 'PurchaseOrder' המצביע על ה-CDS/BO של PO עם API-קריאה ו-Navigation ► Linked Object Type 'Sourcing PO' (9.3.8) מבוסס עליו ► קישור ל-Transaction מאפשר ניווט ל-PO.",
          cbcHe:
            "ב-CBC: Technical Types ל-'PurchaseContract', 'PurchaseOrder' ו-'Supplier' (Business Partner) — התשתית-הטכנית שמאפשרת לקשר הסכם-תרכיז לחוזה-הרכש ולספק.",
          navHe: ["SPRO ► Legal Content Management ► Define Technical Types for Linked Object Types"],
          tables: ["LCM_TECHTYPE", "LCM_LNK"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Technical Type והצבע על ה-Implementation (BO/CDS/Class).",
            "הגדר Key-determination, Description ו-Navigation-target.",
            "הגדר לפני Linked Object Types (9.3.8).",
          ],
          mistakesHe: ["הגדרת Linked Object Type ללא Technical Type תקין — הקישור לא עובד.", "Navigation-target שגוי — ניווט-לאובייקט נכשל."],
          troubleshootHe: ["ניווט מהחוזה לאובייקט נכשל ➔ Navigation-target/Implementation שגוי ב-Technical Type.", "אובייקט לא נטען ➔ CDS/BO לא נגיש או הרשאה חסרה."],
          bestPracticeHe: ["הגדר Technical Types גנריים בני-שימוש-חוזר.", "ודא Navigation-target נכון לכל סוג."],
          interviewHe: [
            { qHe: "מה ההבדל בין Technical Type ל-Linked Object Type?", aHe: "Technical Type = השכבה-הטכנית (BO/CDS/Class + API/Navigation) של איך-ניגשים לאובייקט; Linked Object Type = השכבה-העסקית שמגדירה איזה אובייקט מקשרים, ומבוססת על Technical Type." },
          ],
          takeawaysHe: ["Technical Types = התשתית-הטכנית לקישור (BO/CDS/Class).", "מספקים API ו-Navigation לאובייקט.", "בסיס בן-שימוש-חוזר ל-Linked Object Types."],
          relatedHe: [{ labelHe: "MM · סוגי-אובייקט-מקושרים (9.3.8)", href: "/library/mm/chapter-09/#sub-9.3.8" }],
        },
        {
          id: "9.3.8",
          titleHe: "סוגי אובייקטים מקושרים",
          titleEn: "Linked Object Types",
          execHe:
            "Linked Object Types מגדירים אילו אובייקטים-עסקיים ניתן לקשר ל-Legal Transaction — הזמנת-רכש, חוזה-רכש, ספק, פרויקט. זהו הגשר המחבר את העולם-המשפטי לעולם-העסקי-התפעולי של MM.",
          beginnerHe:
            "חוזה לא חי בָּחלל — הוא תומך בהזמנת-רכש או בספק כלשהו. Linked Object Types מגדירים אילו אובייקטים-עסקיים אפשר 'להצמיד' לחוזה, כדי שמהחוזה אפשר לקפוץ ישר להזמנה ולהפך.",
          consultantHe:
            "Linked Object Type מבוסס על Technical Type (9.3.7) ומגדיר את הקשר העסקי: סוג-אובייקט (Purchase Order/Contract/Supplier), כיווניות, וחוקיות-קישור (1:1/1:N). הקישור נשמר ב-LCM_LNK ומאפשר ניווט-דו-כיווני ודיווח-משולב. זהו ערך-הליבה של ECM ב-MM: ראיית-החוזה-מאחורי-ההזמנה.",
          purposeHe:
            "לחבר חוזה לאובייקט-העסקי שהוא מסדיר — כך שרוכש הרואה הזמנת-רכש יכול לקפוץ לחוזה-המסדיר, ומשפטן הרואה חוזה רואה את כל ההזמנות-הנשענות עליו.",
          processExampleHe:
            "Linked Object Type 'Governing Purchase Contract' מקשר Legal Transaction לחוזה-רכש ► מתוך הזמנת-הרכש רואים את החוזה-המשפטי המסדיר ► מתוך החוזה רואים את כל ה-POs שנשענים עליו.",
          cbcHe:
            "ב-CBC: הסכם-התרכיז (Legal Transaction) מקושר דרך Linked Object Type לחוזה-הרכש (Purchase Contract) ולספק (Business Partner). הרוכש קופץ מההזמנה לחוזה-המשפטי, והמשפטן רואה את כל הזמנות-התרכיז תחת ההסכם.",
          navHe: ["SPRO ► Legal Content Management ► Define Linked Object Types", "SPRO ► Enterprise Contract Management ► Assign Linked Object Types"],
          tables: ["LCM_LNK", "LCM_TECHTYPE", "LCM_TRANS"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Linked Object Type מעל Technical Type (9.3.7).",
            "קבע סוג-אובייקט (PO/Contract/Supplier), כיווניות וחוקיות (1:1/1:N).",
            "שייך ל-Document Type/Profile לקביעת-זמינות.",
          ],
          flow: [
            { he: "Technical Type", code: "9.3.7", note: "תשתית" },
            { he: "Linked Object Type", note: "סוג-אובייקט עסקי" },
            { he: "קישור ב-Transaction" },
            { he: "ניווט דו-כיווני", note: "חוזה ↔ PO/Contract" },
          ],
          mistakesHe: ["אי-הגדרת Linked Object Type — חוזה מנותק מהעולם-העסקי.", "חוקיות-קישור שגויה (1:1 במקום 1:N) — חוסם קישורים-מרובים.", "דילוג על Technical Type — הקישור לא עובד."],
          troubleshootHe: ["לא ניתן לקשר PO/Contract ➔ Linked Object Type לא מוגדר/לא-משויך.", "ניווט נכשל ➔ Technical Type שגוי (9.3.7).", "קישור-מרובה נחסם ➔ חוקיות 1:1 במקום 1:N."],
          bestPracticeHe: ["הגדר Linked Object Types לכל אובייקט-MM רלוונטי (PO/Contract/Supplier).", "ודא ניווט-דו-כיווני לערך-מירבי.", "תכנן חוקיות-קישור (1:N) לחוזי-מסגרת."],
          interviewHe: [
            { qHe: "מהו הערך של Linked Object Types ב-MM?", aHe: "הם מחברים את החוזה-המשפטי לאובייקט-העסקי (הזמנת-רכש/חוזה-רכש/ספק) ומאפשרים ניווט-דו-כיווני — ראיית-החוזה-מאחורי-ההזמנה ולהפך." },
            { qHe: "על מה מבוסס Linked Object Type?", aHe: "על Technical Type (9.3.7) המספק את שכבת-הגישה-הטכנית (BO/CDS/Navigation) לאובייקט." },
          ],
          takeawaysHe: ["Linked Object Types = הגשר בין החוזה-המשפטי לעולם-MM.", "מבוססים על Technical Types; מאפשרים ניווט-דו-כיווני.", "ערך-הליבה של ECM ב-Sourcing & Procurement."],
          relatedHe: [
            { labelHe: "MM · סוגים-טכניים (9.3.7)", href: "/library/mm/chapter-09/#sub-9.3.7" },
            { labelHe: "MM · חוזי-רכש", href: "/library/mm/chapter-08/" },
          ],
        },
        {
          id: "9.3.9",
          titleHe: "סוגי תוכן",
          titleEn: "Content Types",
          execHe:
            "Content Types מגדירים את סוגי-התוכן המותרים בתוך Legal Document — Clause, Free Text, Attachment, Template. הם קובעים אילו אבני-בניין יכולות להיכנס למסמך ומאפשרים את ה-Document Assembly.",
          beginnerHe:
            "מסמך-משפטי בנוי מ'חתיכות-תוכן' שונות — סעיפים (Clauses), טקסט-חופשי, צרופות. Content Types הם רשימת-סוגי-החתיכות המותרות, שמהן המערכת מרכיבה את החוזה.",
          consultantHe:
            "Content Types (LCM_CONTENT) מגדירים את הקטגוריות-המבניות של תוכן ב-Document: Clause (מ-Clause Library), Free Text, Reference, Attachment. הם משויכים ל-Document Type (9.3.12) הקובע אילו Content Types מותרים. הם הבסיס למנוע-ה-Assembly — שמרכיב Document מ-Content-blocks לפי-כללים.",
          purposeHe:
            "להגדיר את אבני-הבניין של מסמך-משפטי ולאפשר הרכבה-מובנית: רק סוגי-תוכן-מותרים נכנסים, מה שמבטיח עקביות-מבנית ותומך ב-Assembly אוטומטי.",
          processExampleHe:
            "Document Type 'Supply Agreement' מתיר Content Types 'Standard Clause' + 'Negotiated Free Text' + 'Attachment' ► מנוע-ה-Assembly מרכיב Clauses חובה ► המשפטן מוסיף Free Text במו\"מ.",
          cbcHe:
            "ב-CBC: הסכם-תרכיז מתיר Content Types 'Standard Clause' (מהספרייה), 'Israel-Specific Clause', ו-'Attachment' (נספח-מחירים). מבטיח שכל הסכם בנוי מאותן אבני-בניין מאושרות.",
          navHe: ["SPRO ► Legal Content Management ► Define Content Types"],
          tables: ["LCM_CONTENT", "LCM_DOC", "LCM_CLAUSE"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Content Types (Clause/Free Text/Attachment/Reference).",
            "שייך ל-Document Types (9.3.12) המתירים אותם.",
            "קשר Clause-Content ל-Clause Library ל-Assembly.",
          ],
          mistakesHe: ["התרת Free Text בלבד — אובדן-סטנדרטיזציה.", "אי-קישור Clause-Content לספרייה — אין Assembly אוטומטי."],
          troubleshootHe: ["סוג-תוכן לא ניתן-להוספה ➔ Content Type לא מותר ל-Document Type.", "Clauses לא מורכבים ➔ Content Type לא מקושר ל-Clause Library."],
          bestPracticeHe: ["העדף Clause-Content מהספרייה על Free Text.", "הגבל Free Text לסעיפים-נסחרים בלבד."],
          interviewHe: [
            { qHe: "מה תפקיד Content Types ב-Assembly?", aHe: "הם מגדירים את אבני-הבניין המותרות במסמך (Clause/Free Text/Attachment); מנוע-ה-Assembly מרכיב את ה-Document מ-Content-blocks אלה לפי-כללים." },
          ],
          takeawaysHe: ["Content Types = אבני-הבניין המותרות במסמך-משפטי.", "משויכים ל-Document Type; בסיס ל-Assembly.", "Clause-Content מהספרייה > Free Text."],
          relatedHe: [{ labelHe: "MM · סוגי-מסמכים (9.3.12)", href: "/library/mm/chapter-09/#sub-9.3.12" }],
        },
        {
          id: "9.3.10",
          titleHe: "חותמות מסמך",
          titleEn: "Document Stamps",
          execHe:
            "Document Stamps מגדירים סימוני-סטטוס ויזואליים על המסמך — 'Draft', 'Approved', 'Final', 'Confidential'. הם מספקים שליטה-ויזואלית במחזור-החיי של המסמך ומונעים שימוש בגרסה-לא-נכונה.",
          beginnerHe:
            "כמו חותמת-גומי על מסמך-נייר: 'טיוטה', 'מאושר', 'סופי'. ב-ECM, Document Stamps מסמנים את סטטוס-המסמך באופן-ויזואלי, כדי שכולם ידעו אם זו טיוטה או גרסה-סופית.",
          consultantHe:
            "Document Stamps מקושרים ל-Document Type ומופיעים ויזואלית בפלט (Watermark/Header). חלקם נושאים לוגיקה (מעבר ל-'Final' נועל-עריכה). מנוהלים ב-IMG ומשולבים עם Versioning/Status. ניתן להתנות Stamp ב-Workflow-status (Approved רק לאחר אישור).",
          purposeHe:
            "לספק אינדיקציה-ויזואלית חד-משמעית של מצב-המסמך, למנוע שימוש-בטעות בטיוטה כסופי, ולתמוך בבקרת-גרסאות ובהיבטי-ציות.",
          processExampleHe:
            "מסמך נוצר עם Stamp 'Draft' ► עובר Workflow ► לאחר אישור מקבל אוטומטית Stamp 'Approved' ► לאחר חתימה 'Final' (נועל-עריכה). הפלט-PDF נושא Watermark מתאים.",
          cbcHe:
            "ב-CBC: הסכם-תרכיז נושא 'Draft' במו\"מ, 'Approved' לאחר CFO-Approval, ו-'Final/Executed' לאחר חתימת-שני-הצדדים. ה-Watermark מונע שליחת-טיוטה בטעות לספק.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define Document Stamps"],
          tables: ["LCM_STAMP", "LCM_DOC"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Document Stamps (Draft/Approved/Final/Confidential).",
            "שייך ל-Document Type והגדר Watermark/Header.",
            "התנה Stamps ב-Workflow-status ולוגיקת-נעילה (Final = read-only).",
          ],
          mistakesHe: ["Stamps ללא לוגיקה — 'Final' לא נועל-עריכה.", "אי-החלת Watermark — טיוטה נראית כסופית."],
          troubleshootHe: ["Stamp לא ניתן-להחלה ➔ לא מוגדר ל-Document Type.", "מסמך-Final עדיין-ניתן-לעריכה ➔ לוגיקת-נעילה לא הוגדרה.", "Watermark חסר בפלט ➔ אינטגרציית-DMS/ODF."],
          bestPracticeHe: ["קשר Stamps ל-Workflow-status לאוטומציה.", "אכוף נעילת-עריכה ב-'Final'.", "השתמש ב-Watermark למניעת-שימוש-בטעות."],
          interviewHe: [
            { qHe: "מה תפקיד Document Stamps?", aHe: "סימון-סטטוס ויזואלי (Draft/Approved/Final) של המסמך, לרוב עם Watermark ולוגיקת-נעילה, למניעת שימוש-בגרסה-שגויה ולתמיכה-בציות." },
          ],
          takeawaysHe: ["Document Stamps = סימוני-סטטוס ויזואליים.", "מקושרים ל-Document Type ול-Workflow-status.", "'Final' נועל-עריכה ומונע שימוש-בטעות."],
          relatedHe: [{ labelHe: "MM · ניהול-מסמכים (9.2.4)", href: "/library/mm/chapter-09/#sub-9.2.4" }],
        },
        {
          id: "9.3.11",
          titleHe: "פרופילים",
          titleEn: "Profiles",
          execHe:
            "Profiles הם הגדרת-העל הקושרת יחד את כל אבני-הבניין של Legal Transaction — Document Types מותרים, Date/Reminder Types, Contacts, Linked Objects ו-Number Range. ה-Profile קובע את ההתנהגות הכוללת של עסקה משפטית.",
          beginnerHe:
            "Profile הוא 'התבנית הראשית' של חוזה: הוא מחבר יחד את כל ההגדרות — אילו תאריכים, אילו תזכורות, אילו סוגי-מסמך, אילו קישורים. במקום להגדיר כל דבר בנפרד לכל חוזה, ה-Profile עושה זאת פעם-אחת.",
          consultantHe:
            "Profile (LCM_PROFILE) הוא ה-Controlling Object של Legal Transaction. הוא מקבץ: Document Types זמינים, Date Types, Reminder Types, Internal/External Contact Types, Linked Object Types, ו-Number Range. ה-Transaction נוצר תמיד עם Profile הקובע שדות, התנהגות והרשאות. מקושר ל-Context. שינוי-Profile משפיע על כל ה-Transactions הנגזרים.",
          purposeHe:
            "לרכז את כל הגדרות-ההתנהגות של סוג-עסקה במקום-אחד, להבטיח עקביות בין חוזים-דומים, ולפשט תחזוקה (שינוי במקום-אחד משפיע על-הכל).",
          processExampleHe:
            "Profile 'Supplier Agreement' מקבץ Document Types (Supply/Service/NDA), Date Types (Effective/Expiration), Reminder (60/30), Linked Object (Purchase Contract) ► כל Transaction-ספק נוצר עם Profile זה ויורש הכל.",
          cbcHe:
            "ב-CBC: Profile 'CBC-Supplier-Agreement' מאגד את כל ההגדרות להסכמי-ספקים — Document Types, תאריכים, תזכורות-90/30, וקישור-לחוזה-רכש. כל הסכם-ספק חדש משתמש בו אוטומטית.",
          navHe: ["SPRO ► Legal Content Management ► Define Profiles", "SPRO ► Enterprise Contract Management ► Assign Profile Settings"],
          tables: ["LCM_PROFILE", "LCM_TRANS", "LCM_CTX"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Profile ושייך לו Document Types, Date/Reminder Types, Contacts, Linked Objects ו-Number Range.",
            "קשר Profile ל-Context (9.2.2).",
            "ה-Transaction נוצר תמיד עם Profile — בלעדיו לא ניתן.",
          ],
          flow: [
            { he: "הגדרת Profile", note: "Controlling Object" },
            { he: "שיוך אבני-בניין", note: "Doc/Date/Reminder/Linked" },
            { he: "קישור ל-Context" },
            { he: "Transaction יורש הכל מ-Profile" },
          ],
          mistakesHe: ["Profiles רבים-מדי כפולים — תחזוקה מסורבלת.", "אי-שיוך Number Range ל-Profile — לא ניתן ליצור Transaction.", "שינוי-Profile בלי-הבנת-ההשפעה על Transactions קיימים."],
          troubleshootHe: ["לא ניתן ליצור Transaction ➔ Profile חסר/לא-שלם (Number Range/Document Type).", "Date/Reminder Type לא זמין ➔ לא-משויך ל-Profile.", "התנהגות-שגויה ➔ Profile לא-מתאים נבחר."],
          bestPracticeHe: ["צור Profiles מעטים ומכלילים לפי-סוג-עסקה.", "ודא שכל Profile שלם (Number Range + Document Types).", "תעד את ההגדרות בכל Profile."],
          interviewHe: [
            { qHe: "מה תפקיד ה-Profile ב-ECM?", aHe: "הוא ה-Controlling Object של Legal Transaction — מקבץ Document Types, Date/Reminder Types, Contacts, Linked Objects ו-Number Range, וקובע התנהגות, שדות והרשאות. כל Transaction נוצר עם Profile." },
            { qHe: "מה הקשר בין Profile ל-Context?", aHe: "ה-Profile מקושר ל-Context; ה-Context מסווג ארגונית וה-Profile קובע התנהגות — יחד הם קובעים אילו עסקאות ואיך נפתחות תחת כל יחידה." },
          ],
          takeawaysHe: ["Profile = ה-Controlling Object המאגד את כל הגדרות-העסקה.", "מקבץ Document/Date/Reminder/Contact/Linked + Number Range.", "כל Transaction נוצר עם Profile; מקושר ל-Context."],
          relatedHe: [
            { labelHe: "MM · סוגי-מסמכים (9.3.12)", href: "/library/mm/chapter-09/#sub-9.3.12" },
            { labelHe: "MM · ניהול-הקשרים (9.2.2)", href: "/library/mm/chapter-09/#sub-9.2.2" },
          ],
        },
        {
          id: "9.3.12",
          titleHe: "סוגי מסמכים",
          titleEn: "Document Types",
          execHe:
            "Document Types מגדירים את סוגי-המסמכים-המשפטיים — Supply Agreement, Service Contract, NDA. כל Type קובע מבנה, Content Types מותרים, Stamps, ותבנית-Assembly. זהו ה'תבנית' שלפיה כל מסמך נבנה.",
          beginnerHe:
            "כמו 'סוג-טופס': הסכם-אספקה שונה במבנהו מ-NDA. Document Types מגדירים את סוגי-המסמכים, וכל סוג קובע אילו רכיבים, אילו חותמות ואיזו תבנית-הרכבה משמשים אותו.",
          consultantHe:
            "Document Type (LCM_DTYPE) קובע: Content Types מותרים (9.3.9), Document Stamps (9.3.10), Assembly-Template/Clause-set, Workflow Template (9.2.8), ו-Number Range. הוא משויך ל-Profile (9.3.11). זהו האובייקט המרכזי שמגדיר 'איך-נראה-ומתנהג' כל סוג-חוזה — מהמבנה ועד תהליך-האישור.",
          purposeHe:
            "לתקנן כל סוג-חוזה: מבנה אחיד, רכיבים-מותרים, תהליך-אישור ותבנית-הרכבה — כך שכל 'Supply Agreement' נראה ומתנהג זהה, ללא תלות-במנסח.",
          processExampleHe:
            "Document Type 'NDA' קובע: Content Types = Clauses-סודיות בלבד, Workflow = מסלול-מקוצר, Stamps = Draft/Final, Assembly-Template = NDA-standard ► כל NDA חדש נבנה לפי-תבנית זו אוטומטית.",
          cbcHe:
            "ב-CBC: Document Types = 'Concentrate Supply Agreement' (מבנה-מלא, Workflow עם CFO), 'Logistics Agreement', ו-'Supplier NDA' (מסלול-מקוצר). כל סוג נושא תבנית-Assembly ותהליך-אישור משלו.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define Document Types", "SPRO ► Legal Content Management ► Assign Content Types to Document Types"],
          tables: ["LCM_DTYPE", "LCM_DOC", "LCM_CONTENT"],
          tcodes: ["SPRO"],
          fiori: ["—"],
          configHe: [
            "הגדר Document Type ושייך Content Types (9.3.9), Stamps (9.3.10) ו-Number Range.",
            "קשר Workflow Template (9.2.8) ותבנית-Assembly/Clause-set.",
            "שייך ל-Profile (9.3.11).",
          ],
          flow: [
            { he: "הגדרת Document Type", note: "תבנית-חוזה" },
            { he: "שיוך Content Types + Stamps" },
            { he: "קישור Workflow + Assembly-Template" },
            { he: "שיוך ל-Profile" },
            { he: "מסמך נבנה לפי-Type" },
          ],
          mistakesHe: ["Document Types רבים-מדי — תחזוקה ובחירה מסובכות.", "אי-קישור Workflow ל-Type — אין אישור-אוטומטי.", "Content Types לא-מתאימים — מבנה-מסמך שגוי."],
          troubleshootHe: ["מסמך נבנה ללא Clauses ➔ Assembly-Template/Content Types לא מוגדרים.", "אין-אישור-אוטומטי ➔ Workflow Template לא-מקושר.", "Document Type לא-זמין בבקשה ➔ לא-משויך ל-Profile/Context."],
          bestPracticeHe: ["הגדר Document Type לכל סוג-חוזה אמיתי בלבד.", "קשר תמיד Workflow ותבנית-Assembly.", "תאם Content Types ו-Stamps לכל Type."],
          interviewHe: [
            { qHe: "מה מגדיר Document Type ב-ECM?", aHe: "את מבנה-המסמך: Content Types מותרים, Stamps, תבנית-Assembly, Workflow Template ו-Number Range. הוא קובע איך-נראה-ומתנהג כל סוג-חוזה ומשויך ל-Profile." },
            { qHe: "מה הקשר בין Document Type ל-Profile?", aHe: "ה-Profile מקבץ אילו Document Types זמינים לעסקה; ה-Document Type מגדיר את מבנה-והתנהגות המסמך הספציפי בתוכה." },
          ],
          takeawaysHe: ["Document Types = תבניות-החוזה לפי-סוג.", "קובעים Content Types, Stamps, Assembly ו-Workflow.", "משויכים ל-Profile; מתקננים כל סוג-חוזה."],
          relatedHe: [
            { labelHe: "MM · פרופילים (9.3.11)", href: "/library/mm/chapter-09/#sub-9.3.11" },
            { labelHe: "MM · סוגי-תוכן (9.3.9)", href: "/library/mm/chapter-09/#sub-9.3.9" },
          ],
        },
        {
          id: "9.3.13",
          titleHe: "הגדרות עבודות רקע",
          titleEn: "Background Job Definitions",
          execHe:
            "Background Job Definitions מגדירות את משימות-הרקע המתוזמנות של ECM — בעיקר סריקת-תאריכים והפקת-Reminders, עדכוני-סטטוס וחישובי-Date-Rules. ללא Jobs מתוזמנים, תזכורות-אוטומטיות לא נשלחות.",
          beginnerHe:
            "חלק מהפעולות ב-ECM רצות 'מאחורי-הקלעים' באופן-מתוזמן — למשל בדיקה-יומית אילו חוזים פגים-בקרוב כדי לשלוח תזכורות. Background Jobs הן ההגדרות שקובעות מתי ואיך משימות-אלה רצות.",
          consultantHe:
            "ה-Jobs (Application Jobs / SM36-style, או Application Job Templates ב-S/4HANA) מריצים תוכניות-רקע: סריקת-Date-Types מול offset-של-Reminders, הפקת-Notifications/Tasks, וחישובי-Date-Rules. מתוזמנים דרך Schedule Background Jobs (Fiori) או SM36. תדירות-יומית מומלצת ל-Reminders. כשל-Job = תזכורות-לא-נשלחות (תקלה-שקטה ומסוכנת).",
          purposeHe:
            "להריץ את האוטומציות-המתוזמנות של ECM — בעיקר את מנוע-התזכורות — כך שהמערכת פרואקטיבית: מתריעה על פקיעות בלי התערבות-ידנית.",
          processExampleHe:
            "Job 'ECM Reminder Run' מתוזמן יומית ב-06:00 ► סורק את כל ה-Date Types מול ה-Reminder-offsets ► לחוזה הפג בעוד 60 יום מפיק Notification + Task 'Initiate Renewal'.",
          cbcHe:
            "ב-CBC: Job יומי 'Supplier-Agreement Reminders' רץ כל לילה, סורק את תאריכי-הפקיעה של הסכמי-התרכיז והלוגיסטיקה, ומפיק את התראות-90/30-יום. ניטור-הצלחת-ה-Job הוא חלק מתחזוקת-המערכת.",
          navHe: ["SPRO ► Enterprise Contract Management ► Define Background Job Settings", "SAP Fiori Launchpad ► Schedule Background Jobs / Application Jobs"],
          tables: ["TBTCO", "LCM_RTYPE", "LCM_DATE"],
          tcodes: ["SM36", "SM37", "SJOBREPO"],
          fiori: ["Application Jobs", "Schedule Background Jobs"],
          configHe: [
            "הגדר Application Job Template למנוע-התזכורות ולעדכוני-סטטוס.",
            "תזמן הרצה-יומית (Schedule Background Jobs / SM36).",
            "נטר הצלחה ב-SM37 / Application Jobs — כשל-שקט חוסם תזכורות.",
          ],
          flow: [
            { he: "הגדרת Job Template", note: "Reminder-engine" },
            { he: "תזמון יומי", code: "SM36/Fiori" },
            { he: "סריקת-תאריכים מול offset" },
            { he: "הפקת Notifications/Tasks" },
            { he: "ניטור-הצלחה", code: "SM37" },
          ],
          mistakesHe: ["אי-תזמון ה-Job — תזכורות לעולם-לא-נשלחות (תקלה-שקטה).", "תדירות נמוכה מדי — תזכורות מאחרות.", "אי-ניטור — כשל-Job עובר-בשקט."],
          troubleshootHe: ["תזכורות לא-נשלחות ➔ Job לא-מתוזמן/נכשל — בדוק SM37.", "תזכורות-מאחרות ➔ תדירות-Job נמוכה מדי.", "Job נכשל ➔ הרשאת-RFC/תוכנית או נתוני-Date שגויים — בדוק Job-Log."],
          bestPracticeHe: ["תזמן את Job-התזכורות יומית, מחוץ-לשעות-שיא.", "נטר הצלחת-Job אקטיבית (SM37/התראת-כשל).", "תעד את כל ה-Jobs המתוזמנים של ECM."],
          interviewHe: [
            { qHe: "למה משמשים Background Jobs ב-ECM?", aHe: "להרצת-אוטומציות-מתוזמנות — בעיקר מנוע-התזכורות הסורק תאריכים מול offset-ה-Reminders ומפיק התראות/Tasks; וגם עדכוני-סטטוס וחישובי-Date-Rules." },
            { qHe: "מה הסיכון בכשל-Job-תזכורות?", aHe: "תקלה-שקטה: תזכורות-לא-נשלחות וחוזים-קריטיים פגים-בהפתעה. לכן ניטור-Job (SM37) הוא קריטי." },
          ],
          takeawaysHe: ["Background Jobs = האוטומציות-המתוזמנות של ECM.", "המנוע-העיקרי: סריקת-תאריכים והפקת-Reminders.", "כשל-שקט מסוכן — נטר ב-SM37."],
          relatedHe: [
            { labelHe: "MM · סוגי-תזכורת (9.3.2)", href: "/library/mm/chapter-09/#sub-9.3.2" },
            { labelHe: "MM · סוגי-תאריך (9.3.3)", href: "/library/mm/chapter-09/#sub-9.3.3" },
          ],
        },
      ],
    },
    // ============================================================ 9.4
    {
      id: "9.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "Enterprise Contract Management הוא הפתרון המשפטי-תאגידי המלא של S/4HANA: מאגר-אמת אחד לחוזים, הרכבת-מסמכים מ-Clauses מאושרים (Document Assembly), אינטגרציה לעולם-MM דרך Linked Object Types, וניהול-פרואקטיבי דרך Reminders ו-Workflow. הוא Fiori-driven לחלוטין, נשען על Legal Content Management, ומונע סיכון-משפטי דרך סטנדרטיזציה.",
      beginnerHe:
        "סיכמנו את מסע-החוזה ב-ECM: מבקשה (Request Legal Contract), דרך הרכבה (Manage Legal Documents), אישור (Legal Tasks + Workflow), קישור (Linked Objects ל-PO), ועד תזכורת-חידוש (Reminders). הכל באפליקציות-Fiori, מעל קונפיגורציה ב-SPRO. הרעיון: חוזים מתוקננים, מקושרים, ולא-נשכחים.",
      consultantHe:
        "ארכיטקטונית: LCM מספק תשתית (Contexts, Entity/Technical Types, Content Types, Profiles, Clause Library), ECM את השכבה-העסקית (Number Ranges, Date/Reminder Types, Contacts, Stamps, Document Types, Jobs). מימוש מוצלח מכבד את סדר-התלויות (Entity→Context, Technical→Linked, Content/Profile→Document Type). הערך-ל-MM: ניווט-דו-כיווני חוזה↔PO/Contract, סטנדרטיזציית-נוסחים, ותזכורות-חידוש אוטומטיות הנשענות על Background Jobs.",
      purposeHe:
        "לאחד את העולם-המשפטי והעולם-התפעולי: להבטיח שכל חוזה מתוקנן, מאושר-כראוי, מקושר-לעסקי, ולא-פג-בהפתעה — ובכך להפחית סיכון-משפטי, תפעולי ופיננסי.",
      processExampleHe:
        "מחזור-חיים מלא: Request ► Legal Transaction (Profile/Document Type) ► Document Assembly מ-Clauses ► Legal Tasks/Workflow לאישור ► Stamps (Draft→Final) ► Linked Object ל-Purchase Contract ► Date Types + Reminders ► Background Job מתריע על-חידוש ► חידוש דרך Request מחדש.",
      cbcHe:
        "ב-CBC: הסכם-אספקת-התרכיז עבר את כל המסע — נפתח בבקשה, הורכב מ-Clauses-מאושרים+סעיף-ישראלי, אושר ב-CFO-Approval, סומן Final, קושר לחוזה-הרכש, וקיבל תזכורות-90/30. כך CBC מנהל את כל הסכמי-הספקים שלו: מתוקננים, מקושרים, ופרואקטיביים.",
      navHe: [
        "SAP Fiori Launchpad ► Enterprise Contract Management",
        "SPRO ► Cross-Application Components ► Legal Content Management / Enterprise Contract Management",
      ],
      tables: ["LCM_TRANS", "LCM_DOC", "LCM_CTX", "LCM_LNK", "LCM_PROFILE"],
      tcodes: ["—", "SPRO", "SM37"],
      fiori: ["Manage Legal Transactions", "Manage Legal Documents", "Manage Legal Tasks", "Request Legal Contract", "Manage Workflow Templates"],
      configHe: [
        "סדר-מימוש: Number Ranges → Entity/Technical Types → Contexts/Linked Objects → Content Types/Profiles → Document Types → Date/Reminder/Contacts/Stamps → Background Jobs.",
        "ECM = Fiori-driven; קונפיגורציה ב-SPRO תחת LCM + ECM.",
        "ניטור Background Jobs קריטי לתזכורות פעילות.",
      ],
      mistakesHe: [
        "התייחסות ל-ECM כניהול-קבצים — והחמצת Assembly, Linked Objects ו-Reminders.",
        "אי-כיבוד סדר-התלויות בקונפיגורציה.",
        "אי-ניטור Background Jobs — תזכורות-שקטות שלא-נשלחות.",
      ],
      troubleshootHe: [
        "אפליקציות חסרות ➔ Business Catalogs/Roles.",
        "לא ניתן ליצור Transaction ➔ Profile/Number Range/Document Type חסר.",
        "תזכורות לא-נשלחות ➔ Background Job/Reminder Type/Date Type.",
      ],
      bestPracticeHe: [
        "בנה תשתית (Contexts/Profiles/Clause Library) לפני תפעול.",
        "תקנן נוסחים ב-Clause Library — לב-הערך-המשפטי.",
        "קשר כל חוזה לאובייקט-עסקי ונטר Background Jobs.",
      ],
      interviewHe: [
        { qHe: "סכם את ערך-הליבה של ECM ל-MM.", aHe: "מאגר-אמת אחד לחוזים, הרכבת-מסמכים מתוקננת (Assembly), קישור-דו-כיווני לאובייקטי-רכש (Linked Object Types), ותזכורות-חידוש אוטומטיות — סטנדרטיזציה והפחתת-סיכון, הכל Fiori-driven." },
        { qHe: "מהו סדר-המימוש הנכון של ECM?", aHe: "Number Ranges, Entity/Technical Types, Contexts ו-Linked Objects, Content Types ו-Profiles, Document Types, ואז Date/Reminder Types, Contacts, Stamps, ולבסוף Background Jobs." },
      ],
      takeawaysHe: [
        "ECM = ניהול מחזור-חיי-חוזה מלא, Fiori-driven, מעל LCM.",
        "Document Assembly מתקנן נוסחים ומפחית סיכון.",
        "Linked Object Types מגשרים חוזה↔עולם-MM (PO/Contract/Supplier).",
        "Reminders + Background Jobs = ניהול-חוזים פרואקטיבי שלא-מחמיץ-חידוש.",
      ],
      relatedHe: [
        { labelHe: "MM · ניהול-עסקאות-משפטיות (9.2.7)", href: "/library/mm/chapter-09/#sub-9.2.7" },
        { labelHe: "MM · התאמה-אישית (9.3)", href: "/library/mm/chapter-09/#sub-9.3" },
      ],
    },
  ],
};
