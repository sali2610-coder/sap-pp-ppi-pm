// ===== MM Digital Textbook — Chapter 15 (Sourcing & Procurement Analytics) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly, analytics/Fiori-heavy (tcodes often "—").
// Hierarchy preserved exactly; SAP objects (VDM, CDS views, KPI, SAC) kept EN.
import type { TextbookChapter } from "./types";

export const CH15: TextbookChapter = {
  n: 15,
  titleHe: "אנליטיקת רכש ואספקה",
  titleEn: "Sourcing and Procurement Analytics",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לאנליטיקת רכש ואספקה ב-SAP S/4HANA. בעידן S/4HANA הדיווח אינו עוד 'אצווה לילית' מ-Data Warehouse נפרד, אלא embedded analytics בזמן-אמת מעל בסיס-הנתונים HANA, הבנוי על Virtual Data Model (VDM) של Core Data Services (CDS views). כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC (אנליטיקת הוצאות וביצועי-ספקים בחברת-בקבוק של קוקה-קולה), ניווט וקונפיגורציה, אפליקציות Fiori, KPI ו-SAP Analytics Cloud (SAC), טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לדעת לנתח רכש, להגדיר KPIs ולהבין את ה-VDM/CDS ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 15.1
    {
      id: "15.1", titleHe: "נראות הוצאות (Spend Visibility)", titleEn: "Spend Visibility",
      execHe:
        "Spend Visibility הוא היכולת לראות 'לאן הולך הכסף' ברכש — כמה הוצאנו, על מה, אצל אילו ספקים, ובאיזו קטגוריה — בזמן-אמת ובחיתוכים מרובים. זו אבן-היסוד של כל אסטרטגיית-רכש: בלי לראות את ההוצאה לא ניתן לנהל אותה, לאחד נפחים, לנהל-משא-ומתן או לזהות הוצאה לא-מנוהלת (maverick spend). ב-S/4HANA הנראות מסופקת דרך embedded analytics על בסיס ה-VDM, ללא צורך בחילוץ-נתונים.",
      beginnerHe:
        "תחשוב על דוח-הוצאות-של-משק-בית: כמה על מזון, כמה על דלק, כמה אצל כל חנות. Spend Visibility עושה זאת לארגון — מסכם את כל הזמנות-הרכש והחשבוניות לפי ספק, קבוצת-חומרים, מפעל ותקופה, ומציג זאת בלוח-מחוונים (dashboard) שאפשר לחתוך ולסנן. כך הקנייָן רואה מיד היכן מרוכזת ההוצאה.",
      consultantHe:
        "מקור-האמת הוא נתוני ה-PO וה-Invoice (EKKO/EKPO/EKBE, RSEG/RBKP) המוגשים דרך CDS analytical views כגון C_PURCHASEORDERITEM ו-Spend-cubes ב-VDM. ה-aggregation לפי Spend Category נשען על Material Group (EKPO-MATKL) ועל Purchasing Category. ב-S/4HANA Fiori מספק 'Monitor Purchasing Spend' ו-Overview Pages עם cards. כדי שהנראות תהיה אמינה נדרשת היגיינת-נתונים: Material Group עקבי, ספקים ממוזגים (Business Partner) וסיווג-הוצאה אחיד. Spend לא-מסווג (Material Group גנרי) הוא האויב מספר אחת של נראות.",
      purposeHe:
        "להמיר נתוני-עסקה גולמיים לתובנה אסטרטגית: זיהוי ספקים מובילים, ריכוז-הוצאה לקטגוריה, הזדמנויות-איחוד (consolidation), חוזים שלא מנוצלים והוצאה-עוקפת-תהליך. זהו הקלט ל-Sourcing ולניהול-קטגוריות.",
      processExampleHe:
        "מנהל-רכש פותח את 'Monitor Purchasing Spend', מסנן לרבעון אחרון, ומקבץ לפי Material Group. הוא רואה ש-40% מההוצאה מרוכזת בקטגוריית-אריזה אצל שלושה ספקים, ושיש 12% הוצאה ללא-חוזה — מועמד מיידי לפעולת-Sourcing.",
      cbcHe:
        "ב-CBC: לוח-Spend מציג הוצאה לפי קטגוריה — תרכיז, סוכר, CO2, בקבוקים, פקקים, תוויות, אנרגיה ולוגיסטיקה. ההנהלה מגלה שהוצאת-האנרגיה במפעל-המילוי קפצה 18% ושהוצאה על חומרי-אריזה מפוזרת על שמונה ספקים — בסיס לאיחוד-נפחים ולמשא-ומתן מרוכז.",
      navHe: [
        "SAP Fiori Launchpad ► Procurement ► Purchasing Analytics ► Monitor Purchasing Spend",
        "VDM: C_PURCHASEORDERITEM / I_PurchaseOrderItem ► Spend analytical query",
        "Material Group ► Logistics – General ► Material Master ► Settings for Key Fields ► Define Material Groups (OMSF)",
      ],
      tables: ["EKKO", "EKPO", "EKBE", "RBKP", "RSEG"],
      tcodes: ["ME2M", "ME80FN", "—"],
      fiori: ["F0863 Monitor Purchasing Spend", "F2718 Purchasing Spend Overview", "C_PurchaseOrderItem (analytical query)", "Overview Page – Procurement"],
      configHe: [
        "Material Group (OMSF): התשתית לסיווג-הוצאה — חייב להיות עקבי ומבוקר; קבוצה גנרית = נראות אבודה.",
        "Purchasing Category (ב-SAP Ariba / Category Management): מבנה-קטגוריות היררכי מעל Material Group.",
        "הרשאות-תצוגה (PFCG): גישה ל-analytical apps לפי ארגון-רכש/מפעל.",
        "סיווג-ספק (Business Partner grouping): מיזוג כפילויות-ספק כדי שההוצאה תצטבר נכון.",
      ],
      flow: [
        { he: "עסקאות-רכש", code: "EKKO/EKPO", note: "PO + GR + IR" },
        { he: "VDM / CDS view", code: "C_PURCHASEORDERITEM", note: "embedded" },
        { he: "Analytical query", code: "—", note: "aggregation לפי קטגוריה" },
        { he: "Fiori dashboard", code: "F0863", note: "Monitor Purchasing Spend" },
        { he: "תובנה ➔ Sourcing", code: "—", note: "consolidation / חוזה" },
      ],
      masterDataHe: [
        "EKPO-MATKL = Material Group — מפתח-הסיווג של ההוצאה.",
        "Business Partner (Supplier) — מיזוג-כפילויות חיוני לצבירה נכונה.",
        "Purchasing Category — היררכיית-קטגוריות מעל Material Group.",
      ],
      mistakesHe: [
        "Material Group גנרי/חסר ➔ הוצאה 'בלתי-מסווגת' שאי-אפשר לנתח.",
        "ספקים כפולים (לא ממוזגים) ➔ הוצאה מפוזרת ולא-מצטברת.",
        "הסתכלות על PO בלבד בלי GR/IR ➔ נראות-התחייבות ולא נראות-הוצאה ממומשת.",
        "ערבוב מטבעות ללא המרה ל-Group Currency ➔ סכומים מטעים.",
      ],
      troubleshootHe: [
        "הוצאה לא מופיעה ב-dashboard ➔ בדוק Material Group, סטטוס-מסמך והרשאת-ארגון.",
        "סכומי-הוצאה נמוכים מהצפוי ➔ מטבע לא-מומר או סינון-תקופה שגוי.",
        "ספק מופיע פעמיים ➔ Business Partner כפול שלא מוזג.",
        "קטגוריה ריקה ➔ Material Group לא ממופה ל-Purchasing Category.",
      ],
      bestPracticeHe: [
        "אכוף Material Group חובה בכל PO; בקר חריגות באופן שוטף.",
        "מזג ספקים כפולים והחזק ספק-יחיד לכל ישות-משפטית.",
        "נתח הוצאה-ממומשת (Invoice) ולא רק הוצאה-מחויבת (PO).",
        "בנה היררכיית-קטגוריות יציבה לפני הסתמכות על dashboards.",
      ],
      interviewHe: [
        { qHe: "מהי Spend Visibility ולמה היא קריטית?", aHe: "היכולת לראות לאן הולך כסף-הרכש בחיתוכים מרובים בזמן-אמת. קריטית כי בלי לראות הוצאה אי-אפשר לאחד נפחים, לנהל-משא-ומתן או לזהות maverick spend." },
        { qHe: "מה ההבדל בין הוצאה-מחויבת להוצאה-ממומשת?", aHe: "מחויבת = ערך-ה-PO; ממומשת = ערך-החשבונית/קבלה. נראות-הוצאה אמיתית מסתמכת על הממומשת (IR/GR)." },
        { qHe: "מהו maverick spend?", aHe: "הוצאה העוקפת חוזים/תהליך-רכש מאושר — יקרה ולא-מנוהלת; Spend Visibility חושפת אותה." },
      ],
      takeawaysHe: [
        "Spend Visibility = הבסיס לכל ניהול-רכש אסטרטגי.",
        "נשען על VDM/CDS (C_PURCHASEORDERITEM) — embedded, בזמן-אמת.",
        "היגיינת-נתונים (Material Group + מיזוג-ספקים) קובעת את האמינות.",
        "נתח הוצאה-ממומשת, לא רק מחויבת.",
      ],
      relatedHe: [
        { labelHe: "MM · Sourcing (15.3)", href: "/library/mm/chapter-15/#sub-15.3" },
        { labelHe: "MM · SAP Ariba Category Management (15.7)", href: "/library/mm/chapter-15/#sub-15.7" },
        { labelHe: "אובייקט · EKPO", href: "/library/mm/object/EKPO/" },
      ],
    },
    // ============================================================ 15.2
    {
      id: "15.2", titleHe: "תפוגת חוזים (Contract Expiration)", titleEn: "Contract Expiration",
      execHe:
        "ניתוח תפוגת-חוזים מזהה אילו הסכמי-מסגרת (Outline Agreements — Contracts ו-Scheduling Agreements) עומדים לפוג, מנוצלים-מדי או תת-מנוצלים, כדי שהרכש יחדש/יחליף/ינהל-מחדש בזמן. חוזה שפג ללא חידוש מאלץ רכש-ספוט יקר ולא-מנוהל; חוזה שמוצה לפני הזמן יוצר חשיפה. נראות-תפוגה הופכת את ניהול-החוזים מתגובתי ליזום.",
      beginnerHe:
        "כמו תזכורת לחדש ביטוח לפני שהוא פג. לארגון יש הסכמים עם ספקים לתקופה או לסכום מסוים. הניתוח מראה אילו הסכמים מסתיימים בקרוב (לפי תאריך) או נגמרים (לפי כמות/ערך שנוצל), כדי שלא 'ניתפס' בלי חוזה ונאלץ לקנות ביוקר ברגע האחרון.",
      consultantHe:
        "המקור הוא טבלאות החוזה: EKKO/EKPO עם Document Category K (Contract) או L (Scheduling Agreement), שדה-תוקף KDATB/KDATE, וערך-מטרה KTWRT מול ערך-משוחרר (release value מ-EKAB/EKBE). CDS view C_PurchaseContractItem ושאילתות-אנליטיקה מציגים target vs. released vs. remaining ותאריך-פקיעה. ב-Fiori 'Monitor Contract Compliance' ו-'Manage Purchase Contracts' מציגים זאת. תזכורות אוטומטיות אפשריות דרך Situation Handling ב-S/4HANA — חוזה מתקרב-לפקיעה מפעיל situation לקנייָן האחראי.",
      purposeHe:
        "למנוע פערי-כיסוי (חוזה פג ➔ רכש-ספוט) ולמקסם ניצול-חוזה (compliance) — להבטיח שהארגון קונה תחת התנאים שהושגו ולא מחוצה להם, ולנהל חידושים יזומים.",
      processExampleHe:
        "קנייָן מריץ 'Monitor Contract Compliance' ל-90 הימים הקרובים: שני חוזים פגים תוך 30 יום, ואחד נוצל ב-95% מערך-המטרה. הוא יוזם RFQ לחידוש לפני הפקיעה ומגדיל את ערך-המטרה של החוזה השלישי.",
      cbcHe:
        "ב-CBC חוזי-מסגרת לסוכר ולתרכיז הם קריטיים-לרצף-ייצור. לוח תפוגת-חוזים מתריע שחוזה-הסוכר השנתי פג בעוד 45 יום ושחוזה-ה-CO2 נוצל ב-88% — הרכש פותח משא-ומתן-חידוש מבעוד-מועד כדי למנוע עצירת קווי-מילוי.",
      navHe: [
        "SAP Fiori ► Procurement ► Contract Management ► Monitor Contract Compliance",
        "SAP Fiori ► Procurement ► Manage Purchase Contracts",
        "VDM: C_PurchaseContractItem ► תוקף + Target/Released value",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "EKBE"],
      tcodes: ["ME3M", "ME33K", "ME33L"],
      fiori: ["F2317 Monitor Contract Compliance", "F1600 Manage Purchase Contracts", "C_PurchaseContractItem", "Situation: Contract Expiring (Situation Handling)"],
      configHe: [
        "Outline Agreement types (SPRO ► MM ► Purchasing ► Contract / Scheduling Agreement ► Define Document Types).",
        "Situation Handling: הגדרת template 'Contract Expiring' עם תנאי-זמן (X ימים לפני KDATE) ונמען (Purchasing Group).",
        "Release strategy לחוזים — שמירה על compliance בעת חידוש.",
        "Value/Quantity contract — קביעת ערך-מטרה (KTWRT) לניטור-ניצול.",
      ],
      flow: [
        { he: "Outline Agreement", code: "ME31K/ME31L", note: "Contract / SA" },
        { he: "ניצול ב-PO", code: "EKAB", note: "release documentation" },
        { he: "Target vs Released", code: "C_PurchaseContractItem", note: "remaining + תוקף" },
        { he: "Situation/התראה", code: "—", note: "X ימים לפני פקיעה" },
        { he: "חידוש / RFQ", code: "—", note: "פעולה יזומה" },
      ],
      masterDataHe: [
        "EKKO-BSTYP/BSART = Document Category/Type (K Contract, L Scheduling Agreement).",
        "EKKO-KDATB / KDATE = תחילת/סוף תוקף · EKPO-KTWRT = ערך-מטרה.",
        "EKAB = תיעוד-שחרור (release order documentation) לניצול-החוזה.",
      ],
      mistakesHe: [
        "אי-ניטור תאריך-פקיעה ➔ פער-כיסוי ורכש-ספוט יקר.",
        "התעלמות מערך-מטרה ➔ חוזה שמוצה ללא חידוש מבעוד-מועד.",
        "הזמנות שלא מקושרות לחוזה ➔ off-contract spend ו-compliance נמוך.",
        "אי-שימוש ב-Situation Handling ➔ הסתמכות על זיכרון אנושי לחידושים.",
      ],
      troubleshootHe: [
        "חוזה לא מופיע בלוח-תפוגה ➔ Document Category/תאריכי-תוקף שגויים.",
        "ניצול נראה אפס ➔ ה-PO לא קושר לחוזה (אין release documentation/EKAB).",
        "התראת-פקיעה לא נשלחת ➔ Situation template לא פעיל או נמען שגוי.",
        "ערך-נותר שגוי ➔ ערך-מטרה (KTWRT) לא הוזן או מטבע לא-מומר.",
      ],
      bestPracticeHe: [
        "הפעל Situation Handling להתראות-פקיעה אוטומטיות.",
        "אכוף קישור-PO-לחוזה כדי למדוד compliance אמיתי.",
        "סקור חוזים-פגים מדי רבעון במחזור קבוע.",
        "נטר גם תאריך וגם ניצול-ערך — שניהם 'מסיימים' חוזה.",
      ],
      interviewHe: [
        { qHe: "מהם שני האופנים שבהם חוזה 'נגמר'?", aHe: "לפי תאריך (KDATE) ולפי ניצול ערך/כמות-מטרה (KTWRT) — יש לנטר את שניהם." },
        { qHe: "כיצד מודדים contract compliance?", aHe: "יחס ההוצאה-תחת-חוזה לעומת ההוצאה הכוללת בקטגוריה; דורש קישור-PO-לחוזה דרך release documentation (EKAB)." },
        { qHe: "כיצד S/4HANA מאוטומט התראות-פקיעה?", aHe: "דרך Situation Handling — template 'Contract Expiring' מפעיל situation לקנייָן X ימים לפני הפקיעה." },
      ],
      takeawaysHe: [
        "נראות-תפוגה הופכת ניהול-חוזים מתגובתי ליזום.",
        "חוזה מסתיים לפי תאריך וגם לפי ניצול-ערך.",
        "Situation Handling מאוטומט התראות-חידוש.",
        "קישור-PO-לחוזה הוא תנאי למדידת compliance.",
      ],
      relatedHe: [
        { labelHe: "MM · Spend Visibility (15.1)", href: "/library/mm/chapter-15/#sub-15.1" },
        { labelHe: "MM · Sourcing (15.3)", href: "/library/mm/chapter-15/#sub-15.3" },
        { labelHe: "אובייקט · EKAB", href: "/library/mm/object/EKAB/" },
      ],
    },
    // ============================================================ 15.3
    {
      id: "15.3", titleHe: "מקורות אספקה (Sourcing)", titleEn: "Sourcing",
      execHe:
        "אנליטיקת Sourcing תומכת בהחלטה 'ממי לקנות' — השוואת-ספקים, ניתוח-מחירים, ריכוז-נפחים והערכת-סיכון-אספקה. היא מבוססת על נתוני source list, info records, RFQ/quotation ו-PO היסטוריים, ומגישה אותם דרך embedded analytics. Sourcing טוב חוסך עלות, מקטין סיכון ומקדם תחרותיות-ספקים — והכל בזמן-אמת מעל ה-VDM.",
      beginnerHe:
        "Sourcing זה לבחור את הספק הנכון לכל קנייה. האנליטיקה עוזרת להשוות: מי מציע מחיר טוב יותר, מי מספק בזמן, מי אמין. במקום להחליט 'לפי תחושה', הקנייָן רואה נתונים — מחיר היסטורי, אחוז-אספקה-בזמן, איכות — ומחליט מושכל.",
      consultantHe:
        "מבני-המקור: EORD (Source List), EINA/EINE (Purchasing Info Records), EKKO/EKPO (RFQ category A, quotation). CDS analytical views חושפים price comparison ו-spend-by-source. ב-S/4HANA 'Manage Sources of Supply', 'Process Purchasing Categories' ו-Sourcing-cockpit מספקים תמיכת-החלטה. אינטגרציה ל-SAP Ariba Sourcing מרחיבה ל-eSourcing (eRFx, eAuction). מדדי-ליבה: Price variance מול info record/חוזה, Number of sources לכל חומר, ו-Single-source risk (חומר עם ספק יחיד).",
      purposeHe:
        "לבסס החלטות-מקור על נתונים: למזער עלות תוך איזון סיכון (single-source), לעודד תחרות, ולהבטיח כיסוי-אספקה לחומרים קריטיים. זהו הגשר בין Spend Visibility לבין פעולת-רכש בפועל.",
      processExampleHe:
        "קנייָן מנתח חומר-אריזה: שלושה ספקים פעילים, פער-מחיר 9% בין הזול ליקר, אך הזול עם 82% אספקה-בזמן בלבד. הוא מנהל-משא-ומתן עם הספק האמין להתאמת-מחיר ומעביר 60% מהנפח אליו — איזון עלות מול סיכון.",
      cbcHe:
        "ב-CBC חומרים קריטיים כמו תרכיז הם לרוב single-source (ספק-מותג בלעדי) — האנליטיקה מסמנת אותם כסיכון-אספקה גבוה ומחייבת מלאי-ביטחון מוגדל; לעומתם, סוכר ובקבוקים הם multi-source ומנוהלים תחרותית לפי מחיר וביצועים.",
      navHe: [
        "SAP Fiori ► Procurement ► Sourcing ► Manage Sources of Supply",
        "SAP Fiori ► Procurement ► Process Purchasing Categories",
        "VDM: C_PurchasingSource / Info-record analytical query",
      ],
      tables: ["EORD", "EINA", "EINE", "EKKO", "EKPO"],
      tcodes: ["ME01", "ME11", "ME47", "ME49"],
      fiori: ["F1990 Manage Sources of Supply", "F2425 Process Purchasing Categories", "C_PurchasingSource (analytical)", "Quotation Price Comparison"],
      configHe: [
        "Source List requirement (SPRO ► MM ► Purchasing ► Source List ► Define Source List Requirement at Plant Level).",
        "Automatic Source Determination — קביעת מקור אוטומטית לפי source list/info record/חוזה.",
        "Purchasing Info Record categories (Standard/Subcontracting/Pipeline/Consignment).",
        "אינטגרציה ל-SAP Ariba Sourcing (eRFx/eAuction) דרך SAP Business Network.",
      ],
      flow: [
        { he: "Source List / Info Records", code: "EORD/EINA", note: "מקורות זמינים" },
        { he: "RFQ / Quotation", code: "ME47/ME49", note: "השוואת-מחירים" },
        { he: "Analytical comparison", code: "—", note: "מחיר × אמינות × סיכון" },
        { he: "החלטת-מקור", code: "F1990", note: "Manage Sources of Supply" },
        { he: "Outline Agreement / PO", code: "—", note: "מימוש" },
      ],
      masterDataHe: [
        "EORD = Source List (חומר↔ספק↔מפעל, fixed/blocked).",
        "EINA/EINE = Info Record — מחיר, lead time, תנאי-מסירה לכל ספק.",
        "EKKO-BSTYP = A (RFQ) לתהליך-quotation.",
      ],
      mistakesHe: [
        "בחירת ספק לפי מחיר בלבד ➔ התעלמות מאמינות-אספקה ומסיכון.",
        "single-source לא-מנוטר ➔ חשיפה לעצירת-ייצור.",
        "Info Records מיושנים ➔ השוואת-מחירים על נתונים לא-עדכניים.",
        "Source List לא מתוחזק ➔ קביעת-מקור אוטומטית שגויה.",
      ],
      troubleshootHe: [
        "קביעת-מקור אוטומטית נכשלת ➔ Source List חסר/חסום או Info Record ללא תוקף.",
        "השוואת-מחיר מטעה ➔ Info Records לא-עדכניים או מטבעות מעורבים.",
        "ספק לא נבחר אוטומטית ➔ אינדיקטור 'fixed source' חסר ב-EORD.",
        "RFQ ללא הצעות ➔ סבב-quotation לא הוזן (ME47).",
      ],
      bestPracticeHe: [
        "אזן עלות מול סיכון — אל תבחר רק לפי מחיר.",
        "סמן וְנטר חומרי single-source עם מלאי-ביטחון מוגדל.",
        "תחזק Info Records ו-Source List כנתוני-אב חיים.",
        "השתמש ב-eSourcing (Ariba) לקטגוריות תחרותיות.",
      ],
      interviewHe: [
        { qHe: "אילו אובייקטי-מקור קיימים ב-MM?", aHe: "Source List (EORD), Purchasing Info Record (EINA/EINE), Outline Agreement ו-RFQ/Quotation. הם הקלט לאנליטיקת-Sourcing." },
        { qHe: "מהו single-source risk וכיצד מנהלים אותו?", aHe: "חומר עם ספק יחיד — חשיפה לעצירת-אספקה. מנהלים עם מלאי-ביטחון, ספק-גיבוי וניטור-סיכון מוגבר." },
        { qHe: "כיצד Ariba משתלב ב-Sourcing?", aHe: "דרך SAP Business Network — eRFx ו-eAuction ל-Strategic Sourcing, עם החזרת תוצאות לחוזים/Info Records ב-S/4HANA." },
      ],
      takeawaysHe: [
        "Sourcing = החלטת 'ממי לקנות', מבוססת-נתונים.",
        "נשען על Source List, Info Records ו-RFQ/Quotation.",
        "אזן עלות מול אמינות-אספקה וסיכון single-source.",
        "Ariba Sourcing מרחיב ל-eRFx/eAuction.",
      ],
      relatedHe: [
        { labelHe: "MM · Contract Expiration (15.2)", href: "/library/mm/chapter-15/#sub-15.2" },
        { labelHe: "MM · Supplier Performance (15.4)", href: "/library/mm/chapter-15/#sub-15.4" },
        { labelHe: "אובייקט · EINA", href: "/library/mm/object/EINA/" },
      ],
    },
    // ============================================================ 15.4
    {
      id: "15.4", titleHe: "ביצועי ספקים (Supplier Performance)", titleEn: "Supplier Performance",
      execHe:
        "אנליטיקת ביצועי-ספקים מודדת עד כמה ספק מספק כפי שהובטח — אספקה-בזמן (On-Time Delivery), איכות, ציות-כמות, ותגובתיות. היא מספקת ציון אובייקטיבי לכל ספק, מזינה החלטות-Sourcing, מבססת שיחות-שיפור ומזהה סיכוני-אספקה לפני שהם משבשים ייצור. ב-S/4HANA זו embedded analytics בזמן-אמת על נתוני GR/IR/QM.",
      beginnerHe:
        "כמו לתת לספק 'תעודת-ציונים': האם הוא מגיע בזמן? האם הסחורה תקינה? האם הכמות נכונה? המערכת אוספת כל קבלת-סחורה וכל בדיקת-איכות והופכת אותם לציון. ספק עם ציון נמוך מקבל תשומת-לב לשיפור או מאבד נפח לספק טוב יותר.",
      consultantHe:
        "מקורות: EKBE (history — GR/IR), EKES (confirmations), MSEG/MKPF (movements), QM inspection results. KPIs נפוצים: On-Time Delivery %, Quantity Reliability, Quality/Defect rate, Price compliance. ב-S/4HANA אלה מסופקים דרך CDS analytical views ו-Fiori 'Supplier Evaluation' / 'Monitor Supplier Confirmations'. Score classic (ME61/MEDV) עדיין קיים, אך הדגש עובר ל-real-time embedded KPIs. החלון-לחישוב On-Time נשען על Statistical Delivery Date (EKET-SLFDT) מול Posting Date של ה-GR.",
      purposeHe:
        "להפוך 'תחושה' לגבי ספק למדד אובייקטיבי, להניע שיפור-ספקים, להזין החלטות-מקור ולנהל סיכון-אספקה. ספק שאינו נמדד אינו מנוהל.",
      processExampleHe:
        "מנהל-רכש סוקר את לוח-ביצועי-הספקים: ספק-בקבוקים מוביל ירד ל-86% אספקה-בזמן ול-2.4% פגמים. הוא מזמן שיחת-שיפור עם יעדים מדידים, ומעביר זמנית 20% מהנפח לספק-גיבוי עד שיפור.",
      cbcHe:
        "ב-CBC ספק-תרכיז נמדד בעיקר על איכות וציות-מפרט (קריטי-למותג), בעוד ספקי-אריזה נמדדים על אספקה-בזמן ועל פגמי-מימדים. לוח-ביצועים מציג Heatmap של כל הספקים — ירוק/צהוב/אדום — והרכש פועל לפי הצבעים.",
      navHe: [
        "SAP Fiori ► Procurement ► Supplier Management ► Monitor Supplier Performance / Supplier Evaluation",
        "VDM: C_SupplierEvaluationScore / Purchase order item delivery KPIs",
        "SPRO ► MM ► Purchasing ► Supplier Evaluation ► Define Criteria / Weighting Keys",
      ],
      tables: ["EKBE", "EKES", "EKET", "ELBK", "ELBP"],
      tcodes: ["ME61", "ME6H", "MC$G", "—"],
      fiori: ["F2718 Monitor Supplier Performance", "F0865 Supplier Evaluation", "C_SupplierEvaluationScore", "Overview Page – Supplier Management"],
      configHe: [
        "Supplier Evaluation criteria & weighting (SPRO ► MM ► Purchasing ► Supplier Evaluation): Price, Quality, Delivery, Service.",
        "Statistical Delivery Date (EKET-SLFDT) — בסיס מדידת On-Time מול Posting Date.",
        "Scoring scale (main/sub-criteria, weighting keys) להגדרת משקלים.",
        "אינטגרציה ל-QM (inspection results) להזנת מדד-איכות.",
      ],
      flow: [
        { he: "GR / IR", code: "EKBE", note: "מועד וכמות בפועל" },
        { he: "Statistical Date vs Actual", code: "EKET-SLFDT", note: "On-Time?" },
        { he: "QM inspection", code: "—", note: "מדד-איכות" },
        { he: "Score / KPI", code: "C_SupplierEvaluationScore", note: "ציון משוקלל" },
        { he: "פעולה: שיפור / re-source", code: "—", note: "החלטה" },
      ],
      masterDataHe: [
        "EKET-SLFDT = Statistical Delivery Date — עוגן מדידת אספקה-בזמן.",
        "EKBE = PO history (סוגי-תנועה GR/IR) — מקור הכמות והמועד בפועל.",
        "ELBK/ELBP = Supplier Evaluation records (classic scoring).",
      ],
      mistakesHe: [
        "מדידת On-Time מול Delivery Date במקום Statistical Date ➔ מדד מעוות.",
        "התעלמות מ-confirmations (EKES) ➔ אספקה-בזמן לא נמדדת מול ההתחייבות.",
        "משקלי-קריטריון לא-מתואמים-לעסק ➔ ציון מטעה.",
        "ספקים כפולים ➔ ביצועים מפוצלים ולא-מצטברים.",
      ],
      troubleshootHe: [
        "On-Time % נראה שגוי ➔ Statistical Delivery Date לא מתוחזק.",
        "ציון-ספק ריק ➔ קריטריונים/משקלים לא הוגדרו או אין נתוני-GR.",
        "מדד-איכות חסר ➔ אין אינטגרציה ל-QM inspection results.",
        "ספק מופיע פעמיים בלוח ➔ Business Partner כפול.",
      ],
      bestPracticeHe: [
        "מדוד On-Time מול Statistical/Confirmed date, לא מול תאריך-יעד גולמי.",
        "התאם משקלי-קריטריון לחשיבות העסקית של כל ספק/קטגוריה.",
        "שלב QM לתוך הציון — איכות חשובה כמו מועד.",
        "סקור ביצועים במחזור קבוע והנע שיחות-שיפור מדידות.",
      ],
      interviewHe: [
        { qHe: "מהם מדדי-הליבה של ביצועי-ספק?", aHe: "On-Time Delivery %, Quantity Reliability, Quality/Defect rate, ו-Price compliance — משוקללים לציון." },
        { qHe: "מול איזה תאריך מודדים אספקה-בזמן?", aHe: "מול Statistical Delivery Date (EKET-SLFDT) או מול ה-confirmation, ולא מול תאריך-המסירה הראשוני הגולמי." },
        { qHe: "מה ההבדל בין classic Supplier Evaluation ל-embedded analytics ב-S/4HANA?", aHe: "Classic (ME61/ELBK) חישוב-תקופתי; embedded analytics מספק KPIs בזמן-אמת מעל CDS views, ללא ריצת-רקע." },
      ],
      takeawaysHe: [
        "ספק שאינו נמדד אינו מנוהל.",
        "מדדי-ליבה: On-Time, Quantity, Quality, Price.",
        "Statistical Delivery Date הוא עוגן מדידת-המועד.",
        "S/4HANA מעביר מ-scoring תקופתי ל-KPIs בזמן-אמת.",
      ],
      relatedHe: [
        { labelHe: "MM · Sourcing (15.3)", href: "/library/mm/chapter-15/#sub-15.3" },
        { labelHe: "MM · Predictive Analytics (15.4.2)", href: "/library/mm/chapter-15/#sub-15.4.2" },
        { labelHe: "אובייקט · EKBE", href: "/library/mm/object/EKBE/" },
      ],
      children: [
        {
          id: "15.4.1", titleHe: "דוחות מסמכי-רכש ואנליטיקה מוטמעת", titleEn: "Purchasing Document Reports and Embedded Analytics",
          execHe:
            "דוחות מסמכי-הרכש הם הבסיס התפעולי של האנליטיקה: רשימות-PO, מצב-מסירות, חשבוניות פתוחות והיסטוריית-מסמך. ב-S/4HANA הם עברו מ-list reports קלאסיים (ME2*) ל-embedded analytics אינטראקטיבי — Fiori list-report + analytical apps מעל ה-VDM, עם drill-down בזמן-אמת מ-KPI ועד שורת-מסמך בודדת.",
          beginnerHe:
            "אלה ה'דוחות היומיומיים' של הקנייָן: רשימת כל ההזמנות, מי טרם סיפק, אילו חשבוניות פתוחות. פעם הם היו טבלאות-טקסט (ME2M, ME2L); היום הם אפליקציות-Fiori אינטראקטיביות שאפשר לסנן, למיין ולצלול מהן ישר לפרטי-המסמך — והכל מתעדכן בזמן-אמת.",
          consultantHe:
            "Embedded analytics = analytical CDS queries (annotation @Analytics.query: true) מעל ה-VDM, מוגשות דרך Fiori Analytical List Page / Overview Page / Smart Business KPI tiles. C_PURCHASEORDERITEM ו-I_PurchaseOrderItem הם consumption views נפוצים. היתרון: אין העתקת-נתונים — הדוח רץ ישירות מעל טבלאות-העסקה ב-HANA, עם drill-down ל-fact level. ה-list reports הקלאסיים (ME2M/ME2L/ME2N, ME80FN) עדיין קיימים לתאימות.",
          purposeHe:
            "לתת לקנייָן ולמנהל כלי-עבודה תפעולי-אנליטי אחד: לראות מצב, לסנן, לצלול ולפעול — בלי לעבור בין מערכת-תפעול למערכת-דיווח נפרדת.",
          processExampleHe:
            "קנייָן פותח Analytical List Page של PO items, מסנן ל'מסירות-באיחור', ממיין לפי ערך, ומ-card של 'Overdue Deliveries' צולל ישר לשורת-ה-PO הבעייתית ופותח את ה-confirmation מול הספק.",
          cbcHe:
            "ב-CBC צוות-הרכש משתמש ב-Overview Page המאחד cards: PO פתוחים, מסירות-באיחור לקווי-המילוי, חשבוניות-בבלוקד וערך-הוצאה-יומי — מסך-בקרה אחד לתפעול-הרכש של המפעל.",
          navHe: [
            "SAP Fiori ► Procurement ► Purchase Order Processing ► Manage Purchase Orders (Analytical List Page)",
            "SAP Fiori ► Procurement ► Procurement Overview Page",
            "VDM: C_PURCHASEORDERITEM / I_PurchaseOrderItem (consumption views)",
          ],
          tables: ["EKKO", "EKPO", "EKBE", "EKET"],
          tcodes: ["ME2M", "ME2L", "ME2N", "ME80FN"],
          fiori: ["F0842A Manage Purchase Orders", "Procurement Overview Page", "C_PURCHASEORDERITEM (analytical query)", "Smart Business KPI tiles"],
          configHe: [
            "Analytical query הפעלה: CDS view עם @Analytics.query: true מעל ה-VDM.",
            "Fiori Overview Page configuration — בחירת cards ו-KPIs רלוונטיים לתפקיד.",
            "Smart Business KPI modeling (KPI/Evaluation/Tile) ל-launchpad.",
            "הרשאות-תצוגה לפי ארגון-רכש/קבוצת-רכש.",
          ],
          flow: [
            { he: "טבלאות-עסקה", code: "EKKO/EKPO", note: "ב-HANA" },
            { he: "Consumption CDS view", code: "C_PURCHASEORDERITEM", note: "@Analytics.query" },
            { he: "Analytical List / Overview Page", code: "F0842A", note: "אינטראקטיבי" },
            { he: "Drill-down ל-fact", code: "—", note: "עד שורת-מסמך" },
          ],
          masterDataHe: [
            "C_PURCHASEORDERITEM / I_PurchaseOrderItem = consumption views של PO.",
            "EKET = Schedule Lines (מועדי-מסירה) לדוחות-מסירה.",
          ],
          mistakesHe: [
            "הסתמכות בלעדית על ME2* קלאסי ➔ ויתור על drill-down ועל real-time.",
            "בניית query מעל basic interface view במקום consumption view ➔ שבירה בעדכון.",
            "Overview Page עמוס ב-cards לא-רלוונטיים ➔ עומס-קוגניטיבי.",
          ],
          troubleshootHe: [
            "Analytical app ריקה ➔ הרשאות-ארגון או CDS query לא-מופעל.",
            "drill-down לא עובד ➔ associations חסרים ב-CDS view.",
            "ביצועים איטיים ➔ query לא-אופטימלי / חוסר aggregation ברמת-DB.",
          ],
          bestPracticeHe: [
            "העדף embedded analytics על list reports קלאסיים לעבודה יומיומית.",
            "בנה תמיד מעל consumption views (C_*), לא מעל basic views.",
            "התאם Overview Page לתפקיד — רק cards רלוונטיים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין ME2M קלאסי ל-Manage Purchase Orders Fiori?", aHe: "ME2M = list report סטטי; ה-Fiori app = Analytical List Page מעל VDM עם סינון, KPIs ו-drill-down בזמן-אמת." },
            { qHe: "מהו consumption view?", aHe: "שכבת ה-VDM הפונה-למשתמש (C_*), הנושאת annotations של UI/Analytics; היא מה שאפליקציה צורכת, מעל basic/composite views." },
          ],
          takeawaysHe: [
            "דוחות-מסמך עברו מ-list reports ל-embedded analytics.",
            "מבוסס consumption CDS views (C_PURCHASEORDERITEM).",
            "drill-down בזמן-אמת מ-KPI עד שורת-מסמך — בלי מערכת-דיווח נפרדת.",
          ],
          relatedHe: [
            { labelHe: "MM · VDM ו-CDS (15.8.3)", href: "/library/mm/chapter-15/#sub-15.8.3" },
            { labelHe: "אובייקט · EKPO", href: "/library/mm/object/EKPO/" },
          ],
        },
        {
          id: "15.4.2", titleHe: "אנליטיקה חיזויית", titleEn: "Predictive Analytics",
          execHe:
            "אנליטיקה-חיזויית מסיטה את הרכש מ'מה קרה' ל'מה צפוי לקרות' — חיזוי איחורי-מסירה, סיכון-אי-עמידה של ספק, וחיזוי-ביקוש לקטגוריה. ב-S/4HANA היא מסופקת דרך embedded Predictive Analytics Integrator (PAI / Intelligent Scenarios) ו-SAP Analytics Cloud Smart Predict, מעל אותו VDM — מאפשרת התערבות יזומה לפני שיבוש.",
          beginnerHe:
            "במקום לחכות שהמשלוח יאחר, המודל מנבא מראש: 'לפי ההיסטוריה, המשלוח הזה צפוי לאחר 3 ימים בהסתברות 70%'. הקנייָן יכול לפעול עכשיו — להאיץ, להזמין מספק-גיבוי או להגדיל מלאי. זו תחזית מבוססת-נתונים, לא ניחוש.",
          consultantHe:
            "מנגנונים: Intelligent Scenario Management (ISLM) להטמעת מודלים ב-S/4HANA, Predictive Analytics Integrator (PAI) להרצת-מודל בזמן-אמת מעל CDS, ו-SAP Analytics Cloud Smart Predict לבניית מודלי classification/regression. תרחישי-רכש: late-delivery prediction, supplier-default risk, demand forecast. ה-features נשאבים מ-VDM (היסטוריית On-Time, lead-time variance, נפח). הפלט מוטמע כעמודת-תחזית/ציון-סיכון ב-Fiori app.",
          purposeHe:
            "להפוך רכש מ-reactive ל-proactive: לזהות סיכון לפני שהוא מתממש, להפחית אי-ודאות-אספקה ולמטב מלאי-ביטחון והחלטות-מקור על בסיס תחזית.",
          processExampleHe:
            "מודל late-delivery רץ על PO פתוחים ומסמן 30 שורות בסיכון-איחור-גבוה. הקנייָן מתעדף אותן ב-'Monitor Supplier Confirmations', יוצר קשר עם הספקים ומאיץ — לפני שהאיחור פוגע בייצור.",
          cbcHe:
            "ב-CBC מודל-סיכון מנבא איחורי-תרכיז על-בסיס היסטוריית-ספק ועונתיות; כשהסיכון גבוה לפני שיא-הקיץ, הרכש מקדים-הזמנה ומגדיל מלאי-ביטחון כדי להגן על קווי-המילוי.",
          navHe: [
            "SAP Fiori ► Predictive Analytics ► Intelligent Scenarios (ISLM)",
            "SAP Analytics Cloud ► Smart Predict (Classification / Regression)",
            "VDM features: On-Time history / lead-time variance מ-C_PURCHASEORDERITEM",
          ],
          tables: ["EKBE", "EKET", "EKES"],
          tcodes: ["—"],
          fiori: ["Intelligent Scenario Management (ISLM)", "Predictive Analytics Integrator (PAI)", "SAC Smart Predict", "Predicted Delivery Delay (KPI column)"],
          configHe: [
            "Intelligent Scenario (ISLM): הגדרת תרחיש, בחירת CDS view כ-data source, אימון ופריסת-מודל.",
            "Predictive Analytics Integrator (PAI): רישום-מודל והרצה בזמן-אמת מעל CDS.",
            "SAC Smart Predict: בניית Classification/Regression model והחזרת ציון ל-S/4HANA.",
            "בחירת features מתוך ה-VDM (lead-time variance, On-Time%, נפח, עונתיות).",
          ],
          flow: [
            { he: "Features מ-VDM", code: "—", note: "On-Time / lead-time variance" },
            { he: "אימון מודל", code: "ISLM/SAC", note: "classification/regression" },
            { he: "Score בזמן-אמת", code: "PAI", note: "מעל CDS" },
            { he: "תחזית ב-Fiori", code: "—", note: "עמודת-סיכון/איחור" },
            { he: "התערבות יזומה", code: "—", note: "האצה / גיבוי / מלאי" },
          ],
          masterDataHe: [
            "היסטוריית EKBE/EKET = מאגר-features לאימון.",
            "EKES = confirmations — בסיס לחיזוי-איחור מול ההתחייבות.",
          ],
          mistakesHe: [
            "אימון על נתונים מועטים/מוטים ➔ תחזית לא-אמינה.",
            "אי-ניטור drift של המודל ➔ דעיכת-דיוק לאורך-זמן.",
            "טיפול בתחזית כוודאות ➔ התעלמות מההסתברות וטעויות-החלטה.",
          ],
          troubleshootHe: [
            "ציון-תחזית לא מופיע ➔ Intelligent Scenario לא-פרוס או PAI לא-רשום.",
            "דיוק נמוך ➔ features חלשים או חוסר-נתונים; שקול re-train.",
            "תחזית לא מתעדכנת ➔ scenario inactive / data source CDS שגוי.",
          ],
          bestPracticeHe: [
            "התחל מתרחיש-יחיד בעל-ערך-ברור (late delivery) לפני הרחבה.",
            "נטר ביצועי-מודל ובצע re-train תקופתי מול drift.",
            "הצג תחזית עם רמת-ביטחון, לא כעובדה מוחלטת.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין ISLM ל-PAI?", aHe: "ISLM (Intelligent Scenario Lifecycle Management) מנהל מחזור-חיי-מודל בתוך S/4HANA; PAI (Predictive Analytics Integrator) מריץ את המודל בזמן-אמת מעל CDS views." },
            { qHe: "מהו תרחיש-חיזוי טיפוסי ברכש?", aHe: "Late-delivery prediction, supplier-default risk ו-demand forecast — מבוססי-features מה-VDM." },
            { qHe: "מהו תפקיד SAC Smart Predict?", aHe: "כלי no-code לבניית מודלי classification/regression; הציון מוחזר ומוטמע באפליקציות-S/4HANA." },
          ],
          takeawaysHe: [
            "חיזוי מעביר רכש מ-reactive ל-proactive.",
            "ISLM + PAI מטמיעים מודלים בזמן-אמת מעל ה-VDM.",
            "SAC Smart Predict בונה classification/regression.",
            "נטר drift ובצע re-train; הצג הסתברות, לא ודאות.",
          ],
          relatedHe: [
            { labelHe: "MM · Machine Learning ו-AI (15.6)", href: "/library/mm/chapter-15/#sub-15.6" },
            { labelHe: "MM · Supplier Performance (15.4)", href: "/library/mm/chapter-15/#sub-15.4" },
          ],
        },
      ],
    },
    // ============================================================ 15.5
    {
      id: "15.5", titleHe: "דיווח (Reporting)", titleEn: "Reporting",
      execHe:
        "Reporting הוא שכבת-ההגשה של האנליטיקה — איך הנתונים מוצגים, מופצים ונצרכים. ב-S/4HANA קיים ספקטרום: מ-embedded analytics (Fiori KPIs, Analytical List Pages) דרך query-tools (Query Browser, View Browser, Manage KPIs) ועד דוחות-תכן (Multidimensional Reports) ו-SAP Analytics Cloud. הבחירה תלויה בקהל: תפעולי בזמן-אמת מול אסטרטגי-מאוחד.",
      beginnerHe:
        "אחרי שיש נתונים, צריך 'לצייר' אותם — בטבלה, בגרף, בלוח-מחוונים. Reporting זה האוסף של הכלים שמציגים את האנליטיקה: חלקם מובנים ב-Fiori (לעבודה יומית), חלקם כלי-בנייה (Query Browser) שמאפשרים לבנות דוח חדש בלי תכנות, וחלקם כלים-אסטרטגיים (SAC) לתמונה רחבה.",
      consultantHe:
        "ערכת-הכלים: Query Browser (הרצת analytical CDS queries), View Browser (חיפוש CDS views ב-VDM), Multidimensional Report (pivot מעל query), Manage KPIs and Reports (Smart Business modeling), ו-Custom Analytical Queries (KQ — query designer ללא-קוד מעל cube/dimension CDS views). מעבר ל-embedded: SAP Analytics Cloud לדיווח-אסטרטגי-מאוחד ו-Datasphere ל-cross-system. עיקרון: real-time operational reporting נשאר ב-S/4 embedded; reporting אנליטי-מאוחד עובר ל-SAC.",
      purposeHe:
        "להתאים את אופן-ההגשה לקהל ולצורך: דיווח-תפעולי מהיר ובזמן-אמת לקנייָן, מול דיווח-אסטרטגי-מאוחד וחוצה-מערכות להנהלה — בלי לכפות כלי אחד על כל הצרכים.",
      processExampleHe:
        "אנליסט-רכש משתמש ב-Query Browser למצוא query מתאים, פותח אותו כ-Multidimensional Report, מסובב ממדים (ספק × קטגוריה × חודש), שומר variant אישי ומשתף אותו עם הצוות — הכל ללא תכנות.",
      cbcHe:
        "ב-CBC צוות-הרכש בונה Custom Analytical Query להוצאה-לפי-קטגוריה-וחודש, מפרסם אותה כ-Multidimensional Report, ובמקביל ההנהלה רואה תמונה-מאוחדת ב-SAC המשלבת רכש, מלאי וייצור.",
      navHe: [
        "SAP Fiori ► Analytics Specialist ► Query Browser / View Browser",
        "SAP Fiori ► Multidimensional Report",
        "SAP Fiori ► Manage KPIs and Reports / Custom Analytical Queries",
      ],
      tables: ["—"],
      tcodes: ["RSRT", "—"],
      fiori: ["F1077 Query Browser", "F2170 View Browser", "Multidimensional Report", "Custom Analytical Queries (KQ)", "Manage KPIs and Reports"],
      configHe: [
        "Custom Analytical Query (KQ): בחירת cube/dimension CDS views, הגדרת dimensions/measures, variables ו-display hierarchy.",
        "Manage KPIs and Reports: מודלינג KPI ➔ Evaluation ➔ Tile/Report ל-launchpad.",
        "Query Browser/View Browser — חיפוש והפעלת queries/views קיימים מה-VDM.",
        "הרשאות-תצוגה ו-row-level (analytical authorizations) לפי ארגון.",
      ],
      flow: [
        { he: "VDM CDS query", code: "—", note: "מקור-הדיווח" },
        { he: "Query/View Browser", code: "F1077", note: "איתור" },
        { he: "Multidim Report", code: "—", note: "pivot + slice/dice" },
        { he: "KPI Tile / SAC", code: "—", note: "הגשה לקהל" },
      ],
      masterDataHe: [
        "Custom Analytical Query (KQ) = הגדרת-דיווח ללא-קוד מעל ה-VDM.",
        "Smart Business KPI/Evaluation = אובייקטי-מודלינג ל-tiles.",
      ],
      mistakesHe: [
        "שכפול query קיים במקום שימוש-חוזר ➔ ריבוי-תחזוקה.",
        "בניית-דיווח כבד מעל transactional views ➔ ביצועים ירודים.",
        "ערבוב דיווח-תפעולי ואסטרטגי בכלי אחד ➔ אי-התאמה לקהל.",
        "התעלמות מ-analytical authorizations ➔ חשיפת-נתונים לא-מורשית.",
      ],
      troubleshootHe: [
        "Query Browser לא מציג query ➔ הרשאות או ה-query לא-released.",
        "Multidim Report ריק ➔ variables/סינון שגוי או אין נתונים בתקופה.",
        "KPI tile לא מתעדכן ➔ Evaluation לא פעיל / cache.",
        "ביצועים איטיים ➔ query מעל view לא-אופטימלי ל-analytics.",
      ],
      bestPracticeHe: [
        "השתמש מחדש ב-queries קיימות לפני בניית-חדשות.",
        "שמור דיווח-תפעולי ב-embedded ודיווח-אסטרטגי ב-SAC.",
        "בנה queries מעל cube/dimension views המיועדים ל-analytics.",
        "אכוף analytical authorizations לאבטחת-שורות.",
      ],
      interviewHe: [
        { qHe: "מהו Custom Analytical Query?", aHe: "כלי query-designer ללא-קוד (KQ) הבונה דיווח מעל cube/dimension CDS views — dimensions, measures ו-variables — בלי ABAP." },
        { qHe: "מתי להשתמש ב-embedded reporting מול SAC?", aHe: "Embedded לדיווח-תפעולי בזמן-אמת בתוך S/4; SAC לדיווח-אסטרטגי-מאוחד, חוצה-מערכות ועתיר-ויזואליזציה." },
        { qHe: "מהו Query Browser?", aHe: "אפליקציית-Fiori לאיתור והרצת analytical CDS queries הקיימות ב-VDM, ולפתיחתן כ-Multidimensional Report." },
      ],
      takeawaysHe: [
        "Reporting = שכבת-ההגשה; הכלי תלוי-קהל.",
        "ערכת-כלים: Query/View Browser, Multidim Report, KQ, Manage KPIs.",
        "תפעולי ➔ embedded; אסטרטגי-מאוחד ➔ SAC.",
        "השתמש-מחדש ב-queries ואכוף analytical authorizations.",
      ],
      relatedHe: [
        { labelHe: "MM · יצירת KPI (15.8.1)", href: "/library/mm/chapter-15/#sub-15.8.1" },
        { labelHe: "MM · אינטגרציה עם SAC (15.8.4)", href: "/library/mm/chapter-15/#sub-15.8.4" },
      ],
    },
    // ============================================================ 15.6
    {
      id: "15.6", titleHe: "למידת מכונה ובינה מלאכותית", titleEn: "Machine Learning and Artificial Intelligence",
      execHe:
        "Machine Learning ו-AI מטמיעים אינטליגנציה בתהליכי-הרכש עצמם — לא רק דיווח, אלא אוטומציה והמלצה: התאמת-חשבוניות אוטומטית, סיווג-הוצאה אוטומטי, המלצת-מקור, וזיהוי-אנומליות. ב-S/4HANA אלה מסופקים כ-Intelligent Scenarios מובנים, ובהמשך דרך SAP Business AI / Joule (copilot). המטרה: לצמצם עבודה-ידנית ולשפר החלטות.",
      beginnerHe:
        "ML/AI נותנים למערכת 'ללמוד' מהעבר ולעזור בהווה: לזהות לבד לאיזו קטגוריה שייכת הוצאה, להתאים חשבונית ל-PO גם כשהפרטים לא זהים-לחלוטין, או לסמן עסקה חריגה החשודה-כטעות. במקום שאדם יעשה כל זאת ידנית, ה-AI מציע והאדם מאשר.",
      consultantHe:
        "תרחישים מובנים ב-S/4HANA: 'Propose Account Assignment', 'Invoice Matching/exception', 'Spend classification', ו-'Anomaly detection בחשבוניות'. הם נשענים על SAP HANA ML (PAL/APL), Intelligent Scenario Management, ו-CDS features. מעטפת חדשה: SAP Business AI ו-Joule — copilot generative בתוך Fiori. עקרון-ליבה: AI מציע, אדם מחליט (human-in-the-loop) בנקודות-בקרה, עם שקיפות ו-auditability. ה-VDM הוא מקור-ה-features.",
      purposeHe:
        "לאוטמט משימות-רכש שגרתיות (סיווג, התאמה), לשפר דיוק-החלטה, ולשחרר את הקנייָן לעבודה אסטרטגית. AI הוא מכפיל-כוח, לא מחליף-שיקול-דעת.",
      processExampleHe:
        "חשבונית נכנסת ללא PO-reference מדויק; מודל-ההתאמה מציע את ה-PO הסביר ביותר ואת חשבון-ה-G/L; הפקיד מאשר בלחיצה. במקביל, anomaly detection מסמן חשבונית עם סכום חריג-לספק לבדיקה.",
      cbcHe:
        "ב-CBC סיווג-הוצאה אוטומטי ממפה אלפי שורות-חשבונית לקטגוריות (אריזה/אנרגיה/חומרי-גלם) בלי מיון-ידני, ו-anomaly detection מסמן קפיצת-מחיר חריגה בספק-תרכיז — חוסך שעות-עבודה ומונע טעויות-תשלום.",
      navHe: [
        "SAP Fiori ► Intelligent Scenarios (ISLM) ► Procurement scenarios",
        "SAP Business AI / Joule (copilot) בתוך Fiori Launchpad",
        "VDM features ► SAP HANA ML (PAL/APL)",
      ],
      tables: ["RBKP", "RSEG", "EKPO"],
      tcodes: ["—"],
      fiori: ["Propose Account Assignment (Intelligent Scenario)", "Invoice Exception/Matching", "Spend Classification", "Joule (Business AI copilot)"],
      configHe: [
        "Intelligent Scenario activation (ISLM): בחירת תרחיש מובנה, אימון ופריסה.",
        "Human-in-the-loop thresholds: מתי AI מציע אוטומטית מול דורש-אישור.",
        "SAP HANA ML (PAL/APL) — אלגוריתמים מובנים ל-classification/anomaly.",
        "Joule / Business AI enablement (BTP) — copilot generative בתוך התהליך.",
      ],
      flow: [
        { he: "Features מ-VDM", code: "—", note: "היסטוריית-עסקה" },
        { he: "מודל ML (PAL/APL)", code: "ISLM", note: "classification/anomaly" },
        { he: "המלצה ב-Fiori", code: "—", note: "proposal" },
        { he: "אישור-אדם", code: "—", note: "human-in-the-loop" },
        { he: "פעולה אוטומטית", code: "—", note: "posting / סיווג" },
      ],
      masterDataHe: [
        "RBKP/RSEG = חשבוניות — קלט להתאמה ול-anomaly detection.",
        "היסטוריית-סיווג (Material Group/Category) = labels לאימון-classification.",
      ],
      mistakesHe: [
        "אוטומציה מלאה ללא human-in-the-loop ➔ סיכון להעברות-שגויות.",
        "אימון על נתונים מוטים ➔ הטיה שיטתית בהמלצות.",
        "חוסר-שקיפות/auditability ➔ קושי לבקר החלטות-AI.",
        "ציפייה ש-AI יחליף שיקול-דעת אסטרטגי ➔ אכזבה.",
      ],
      troubleshootHe: [
        "המלצות לא מופיעות ➔ Intelligent Scenario לא פרוס/פעיל.",
        "המלצות שגויות-עקבית ➔ נתוני-אימון מוטים; שקול re-train.",
        "Joule לא זמין ➔ Business AI enablement חסר ב-BTP.",
        "התאמת-חשבונית כושלת ➔ features/labels לא-מספיקים.",
      ],
      bestPracticeHe: [
        "שמור human-in-the-loop בנקודות-בקרה קריטיות.",
        "ודא שקיפות ו-auditability לכל המלצת-AI.",
        "התחל מתרחיש מובנה אחד והרחב בהדרגה.",
        "נטר הטיה ודיוק ובצע re-train תקופתי.",
      ],
      interviewHe: [
        { qHe: "מהו עקרון 'human-in-the-loop'?", aHe: "ה-AI מציע, אך אדם מאשר בנקודות-בקרה — שילוב אוטומציה עם פיקוח, שקיפות ו-auditability." },
        { qHe: "תן דוגמאות לתרחישי-AI ברכש ב-S/4HANA.", aHe: "Spend classification, Invoice matching/exception, Propose Account Assignment, ו-anomaly detection בחשבוניות." },
        { qHe: "מהו Joule?", aHe: "ה-copilot ה-generative של SAP Business AI, המוטמע ב-Fiori לסיוע-בהקשר לתהליכי-עבודה." },
      ],
      takeawaysHe: [
        "ML/AI מטמיעים אינטליגנציה בתהליך, לא רק בדיווח.",
        "תרחישים: סיווג-הוצאה, התאמת-חשבונית, anomaly, המלצת-מקור.",
        "Human-in-the-loop + auditability הם חובה.",
        "Joule / Business AI מוסיף copilot generative.",
      ],
      relatedHe: [
        { labelHe: "MM · Predictive Analytics (15.4.2)", href: "/library/mm/chapter-15/#sub-15.4.2" },
        { labelHe: "MM · אינטגרציה עם ענן (15.8.5)", href: "/library/mm/chapter-15/#sub-15.8.5" },
      ],
    },
    // ============================================================ 15.7
    {
      id: "15.7", titleHe: "SAP Ariba Category Management", titleEn: "SAP Ariba Category Management",
      execHe:
        "SAP Ariba Category Management הוא כלי-ענן לניהול-קטגוריות אסטרטגי — בניית אסטרטגיית-קטגוריה, מחקר-שוק, הערכת-סיכון-ספקים ותכנון-Sourcing — מעבר לתפעול-הרכש שב-S/4HANA. הוא מחבר אנליטיקת-הוצאה (Spend) לאסטרטגיה: מקבץ הוצאה לקטגוריות, מספק תובנות-שוק מובנות (guided), ומתרגם אותן לתוכניות-פעולה ול-Sourcing events.",
      beginnerHe:
        "במקום לנהל כל קנייה בנפרד, מנהלים 'קטגוריות' שלמות — כל האריזה, כל האנרגיה, כל הלוגיסטיקה. Category Management ב-Ariba עוזר לבנות תוכנית לכל קטגוריה: מה השוק, מי הספקים, מה הסיכונים, ומה האסטרטגיה (לאחד? להחליף? להתמקח?). זה הצד האסטרטגי-מתכנן של הרכש.",
      consultantHe:
        "Ariba Category Management פועל ב-SAP Business Network / Intelligent Spend Management. הוא משלב spend data (לרוב מ-S/4HANA דרך אינטגרציה), market intelligence ו-supplier risk (Ariba Supplier Risk) ל-guided category strategy עם templates, segmentation (Kraljic-like) ו-action plans. הפלט מזין eSourcing (Ariba Sourcing) ו-contracts בחזרה ל-S/4HANA. האינטגרציה היא דו-כיוונית דרך SAP Business Network ו-Cloud Integration (CPI/BTP).",
      purposeHe:
        "להעלות את הרכש מ-tactical ל-strategic: לבנות אסטרטגיה מנומקת-נתונים לכל קטגוריה, לתעדף מאמצי-Sourcing לפי ערך וסיכון, ולנהל ספקים כפורטפוליו ולא כעסקאות בודדות.",
      processExampleHe:
        "מנהל-קטגוריה פותח קטגוריית-אריזה ב-Ariba: רואה spend מאוחד מ-S/4, market intelligence על מחירי-שוק, וסגמנטציית-סיכון. הוא בונה action plan — איחוד מ-8 ל-3 ספקים — ומשיק eSourcing event שתוצאותיו חוזרות כחוזה ל-S/4HANA.",
      cbcHe:
        "ב-CBC קטגוריות-מפתח (סוכר, תרכיז, אריזה, אנרגיה, לוגיסטיקה) מנוהלות ב-Ariba Category Management; אסטרטגיית-הסוכר משלבת תחזית-מחירי-סחורות ו-supplier risk כדי להחליט בין חוזה-קבוע למחיר-משתנה — והתוצאה מתבצעת כחוזה-מסגרת ב-S/4HANA.",
      navHe: [
        "SAP Ariba ► Category Management ► Category Strategy / Action Plans",
        "SAP Ariba ► Supplier Risk / Supplier Management",
        "אינטגרציה: SAP Business Network ◄► SAP S/4HANA (CPI/BTP)",
      ],
      tables: ["—"],
      tcodes: ["—"],
      fiori: ["SAP Ariba Category Management (cloud)", "SAP Ariba Sourcing (eRFx/eAuction)", "SAP Ariba Supplier Risk", "SAP Business Network"],
      configHe: [
        "אינטגרציית Spend: זרימת spend data מ-S/4HANA ל-Ariba (master data + transactional).",
        "Category hierarchy & segmentation: הגדרת מבנה-קטגוריות ומודל-סגמנטציה (value × risk).",
        "Action plan templates & guided strategy ב-Ariba.",
        "החזרת תוצאות: contracts/awards מ-Ariba Sourcing ל-S/4HANA Outline Agreements.",
      ],
      flow: [
        { he: "Spend מ-S/4HANA", code: "—", note: "אינטגרציה" },
        { he: "Category Strategy", code: "—", note: "guided + market intel" },
        { he: "Segmentation (value×risk)", code: "—", note: "תעדוף" },
        { he: "Action Plan / eSourcing", code: "—", note: "Ariba Sourcing" },
        { he: "Contract ל-S/4HANA", code: "—", note: "Outline Agreement" },
      ],
      masterDataHe: [
        "Category hierarchy (Ariba) הממופה ל-Material Groups ב-S/4HANA.",
        "Supplier master מסונכרן דרך SAP Business Network.",
      ],
      mistakesHe: [
        "אינטגרציית-spend חלקית ➔ אסטרטגיה על נתונים חסרים.",
        "מיפוי-קטגוריות לא-עקבי בין Ariba ל-S/4 ➔ הוצאה לא-מצטברת.",
        "אסטרטגיה בלי action plan ➔ תובנה שלא הופכת לפעולה.",
        "התעלמות מ-supplier risk ➔ אסטרטגיה מבוססת-מחיר-בלבד.",
      ],
      troubleshootHe: [
        "Spend לא מופיע ב-Ariba ➔ אינטגרציה (CPI/BTP) או מיפוי-קטגוריה שבור.",
        "חוזה מ-Ariba לא חוזר ל-S/4 ➔ תקלת-אינטגרציה הפוכה.",
        "קטגוריה ריקה ➔ Material Group לא ממופה להיררכיית-Ariba.",
        "supplier risk לא מתעדכן ➔ מנוי/feed של Supplier Risk לא פעיל.",
      ],
      bestPracticeHe: [
        "ודא היררכיית-קטגוריות עקבית בין Ariba ל-S/4HANA.",
        "שלב spend + market intelligence + supplier risk לאסטרטגיה.",
        "תרגם כל אסטרטגיה ל-action plan מדיד.",
        "סגור את הלולאה — תוצאות-Sourcing חזרה לחוזי-S/4.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Category Management ל-Sourcing תפעולי?", aHe: "Category Management אסטרטגי — בונה תוכנית-קטגוריה (שוק, סיכון, אסטרטגיה); Sourcing תפעולי מבצע את הקנייה. הראשון מזין את השני." },
        { qHe: "כיצד Ariba משתלב עם S/4HANA?", aHe: "דו-כיוונית דרך SAP Business Network ו-Cloud Integration (CPI/BTP): spend ו-master data ל-Ariba, contracts/awards חזרה ל-S/4HANA." },
        { qHe: "מהי סגמנטציית-קטגוריות?", aHe: "סיווג קטגוריות לפי ערך × סיכון (גישה Kraljic-like) לתעדוף מאמצי-Sourcing ולבחירת-אסטרטגיה." },
      ],
      takeawaysHe: [
        "Ariba Category Management = הצד האסטרטגי-מתכנן של הרכש.",
        "משלב spend + market intelligence + supplier risk.",
        "אינטגרציה דו-כיוונית עם S/4HANA דרך Business Network.",
        "מתרגם אסטרטגיה ל-action plans ול-eSourcing.",
      ],
      relatedHe: [
        { labelHe: "MM · Spend Visibility (15.1)", href: "/library/mm/chapter-15/#sub-15.1" },
        { labelHe: "MM · אינטגרציה עם ענן (15.8.5)", href: "/library/mm/chapter-15/#sub-15.8.5" },
      ],
    },
    // ============================================================ 15.8
    {
      id: "15.8", titleHe: "קונפיגורציה", titleEn: "Configuration",
      execHe:
        "תת-פרק זה מרכז את ההגדרות הטכניות שמאחורי האנליטיקה: יצירת KPIs, הגדרת דיווח בזמן-אמת, הבנת ה-Virtual Data Model ו-CDS views, ואינטגרציה ל-SAP Analytics Cloud ולאפליקציות-ענן. אלה ה'תשתית' שהופכת נתוני-עסקה ל-insight — מי שמבין אותה יכול לבנות, להרחיב ולפתור-תקלות באנליטיקה, ולא רק לצרוך dashboards מוכנים.",
      beginnerHe:
        "עד כה ראינו 'מה' האנליטיקה מציגה; כאן לומדים 'איך מרכיבים אותה'. נלמד לבנות מדד (KPI), להפעיל דיווח-בזמן-אמת, להבין את מבנה-הנתונים שמתחת (VDM/CDS), ולחבר ל-SAP Analytics Cloud ולענן. זה ארגז-הכלים של מי שבונה אנליטיקה, לא רק מסתכל עליה.",
      consultantHe:
        "הליבה הטכנית: Smart Business KPI modeling (KPI/Evaluation/Tile), analytical CDS queries מעל ה-VDM (basic ► composite ► consumption), Custom Analytical Queries (KQ), live/import connections ל-SAP Analytics Cloud, ו-cloud integration (BTP/CPI, SAP Business Network) ל-Ariba/Fieldglass. הבנת שלוש-שכבות-ה-VDM וה-annotations (@Analytics, @ObjectModel, @UI) היא המפתח. תת-הסעיפים מפרקים כל רכיב.",
      purposeHe:
        "לתת ליועץ/למפתח-הפונקציונלי את היכולת לבנות ולתחזק את שכבת-האנליטיקה בעצמו — להגדיר KPIs, queries, ולחבר מערכות — במקום להסתמך אך-ורק על תוכן-סטנדרטי.",
      processExampleHe:
        "צוות-יישום מקים KPI חדש (On-Time Delivery), פורס אותו כ-tile ב-launchpad, בונה Custom Analytical Query תומכת, ומחבר live connection ל-SAC לדיווח-הנהלה — כל זאת ללא ABAP מותאם.",
      cbcHe:
        "ב-CBC צוות-ה-IT מגדיר חבילת-KPIs לרכש (Spend, On-Time, Contract Compliance), בונה queries מעל ה-VDM, ומחבר live ל-SAC כדי שההנהלה תראה תמונת-רכש מאוחדת לצד ייצור ומלאי.",
      navHe: [
        "SAP Fiori ► Manage KPIs and Reports / Custom Analytical Queries",
        "SPRO / VDM ► Core Data Services views (basic ► composite ► consumption)",
        "SAP Analytics Cloud ► Connections (Live / Import) ◄► S/4HANA",
      ],
      tables: ["—"],
      tcodes: ["STMS", "—"],
      fiori: ["Manage KPIs and Reports", "Custom Analytical Queries (KQ)", "Query Browser / View Browser", "SAC Connection Management"],
      configHe: [
        "Smart Business: KPI ► Evaluation ► Tile/Drill-down להגשה ב-launchpad.",
        "VDM layering: basic interface ► composite ► consumption; annotations @Analytics/@UI/@ObjectModel.",
        "SAC connections: Live (real-time, ללא-העתקה) מול Import (snapshot).",
        "Cloud integration (BTP/CPI, Business Network) ל-Ariba/Fieldglass/Concur.",
      ],
      flow: [
        { he: "VDM CDS views", code: "—", note: "שכבת-נתונים" },
        { he: "Analytical query / KQ", code: "—", note: "מודל-דיווח" },
        { he: "KPI / Tile", code: "—", note: "Smart Business" },
        { he: "SAC / Cloud", code: "—", note: "הגשה-מאוחדת" },
      ],
      masterDataHe: [
        "CDS views = ה-Virtual Data Model (מקור-האמת האנליטי).",
        "KPI/Evaluation/Query = אובייקטי-מודלינג של שכבת-הדיווח.",
      ],
      mistakesHe: [
        "בניית-אנליטיקה ישירות מעל טבלאות במקום מעל ה-VDM ➔ שבירה בעדכון.",
        "ערבוב שכבות-VDM (query מעל basic view) ➔ תחזוקה שברירית.",
        "import connection ל-SAC כשנדרש real-time ➔ נתונים לא-עדכניים.",
        "אי-ניהול transports ל-KPIs/queries ➔ אי-עקביות בין סביבות.",
      ],
      troubleshootHe: [
        "KPI לא מופיע ➔ Evaluation לא פעיל או הרשאה חסרה.",
        "Query שגוי ➔ נבנה מעל view לא-מתאים-ל-analytics.",
        "SAC לא מציג נתונים ➔ connection (live/import) או הרשאות-system.",
        "הגדרה לא עברה לסביבה ➔ transport (STMS) לא שוחרר.",
      ],
      bestPracticeHe: [
        "בנה תמיד מעל ה-VDM ובשכבה הנכונה (consumption לצריכה).",
        "השתמש ב-Smart Business modeling לפני פיתוח-מותאם.",
        "בחר Live connection ל-SAC כשנדרש real-time.",
        "נהל KPIs/queries דרך transports בין סביבות.",
      ],
      interviewHe: [
        { qHe: "מהן שלוש שכבות-ה-VDM?", aHe: "Basic interface views (I_*), composite views, ו-consumption views (C_*); analytical queries נבנות מעל ה-consumption/composite, לא מעל basic." },
        { qHe: "Live מול Import connection ב-SAC?", aHe: "Live = שאילתה בזמן-אמת מול S/4 ללא-העתקת-נתונים; Import = snapshot מועתק ל-SAC לעיבוד עצמאי." },
        { qHe: "כיצד בונים KPI ללא ABAP?", aHe: "דרך Manage KPIs and Reports (Smart Business): מגדירים KPI מעל query, Evaluation, ו-Tile — הכל no-code." },
      ],
      takeawaysHe: [
        "Configuration = ארגז-הכלים לבניית-אנליטיקה, לא רק צריכתה.",
        "ליבה: KPIs, queries, VDM/CDS, חיבורי-SAC ו-cloud.",
        "בנה מעל ה-VDM בשכבה הנכונה; נהל דרך transports.",
        "Live ל-real-time, Import ל-snapshot.",
      ],
      relatedHe: [
        { labelHe: "MM · Reporting (15.5)", href: "/library/mm/chapter-15/#sub-15.5" },
        { labelHe: "MM · VDM ו-CDS (15.8.3)", href: "/library/mm/chapter-15/#sub-15.8.3" },
      ],
      children: [
        {
          id: "15.8.1", titleHe: "יצירת מדד ביצוע מרכזי (KPI)", titleEn: "Creating a Key Performance Indicator",
          execHe:
            "יצירת KPI ב-S/4HANA נעשית דרך Smart Business: מגדירים מדד (KPI), שיטת-הערכה (Evaluation) עם ערכי-יעד/סף, ואריח (Tile) להצגה ב-launchpad. התוצאה — אריח-KPI עם צבע-סטטוס ו-drill-down — בלי שורת-ABAP אחת. זו הדרך הסטנדרטית להפוך מדד-עסקי לאובייקט-ניטור חי.",
          beginnerHe:
            "KPI הוא 'מספר-מטרה' שרוצים לעקוב אחריו — למשל 'אספקה-בזמן ≥ 95%'. כאן לומדים לבנות אותו: מהו המדד, מה היעד, ומאיזה צבע מתחילים להיות מודאגים. בסוף מקבלים אריח צבעוני ב-launchpad שלוחצים עליו וצוללים לפרטים.",
          consultantHe:
            "התהליך: (1) KPI — בחירת analytical CDS query ו-measure; (2) Evaluation — קביעת thresholds (targets, warning/critical), ממדי-סינון וברירות-מחדל; (3) Tile/Drill-down — סוג-אריח (numeric/trend/comparison) ו-configured drill-down. הכל ב-'Create KPI' / 'Manage KPIs and Reports'. ה-query חייב להיות @Analytics.query: true מעל ה-VDM. הרשאות-תצוגה ו-transport נדרשים לפריסה בין-סביבתית.",
          purposeHe:
            "להפוך מדד-עסקי מופשט לאובייקט-ניטור פעיל, גלוי וניתן-ל-drill-down — שכל בעל-תפקיד רואה את מצבו בזמן-אמת ופועל לפי הצבע.",
          processExampleHe:
            "יועץ בונה KPI 'On-Time Delivery': בוחר query, measure=OnTime%, מגדיר target 95% (ירוק) / 90% (צהוב) / מתחת (אדום), יוצר numeric tile עם drill-down לספק × חודש, ומשייך ל-catalog של הקנייָנים.",
          cbcHe:
            "ב-CBC נבנה KPI 'Contract Compliance' עם יעד 90%; אריח אדום מתריע מיד על הוצאה-עוקפת-חוזה בקטגוריית-אריזה, והקנייָן צולל מהאריח לרשימת-ה-PO החריגים.",
          navHe: [
            "SAP Fiori ► Analytics Specialist ► Create KPI / Manage KPIs and Reports",
            "Evaluation ► Thresholds (Target / Warning / Critical) + default filters",
            "Tile ► Numeric / Trend / Comparison + Drill-down configuration",
          ],
          tables: ["—"],
          tcodes: ["—"],
          fiori: ["Create KPI", "Manage KPIs and Reports", "Evaluation configuration", "KPI Tile (Smart Business)"],
          configHe: [
            "KPI: בחירת analytical CDS query (@Analytics.query) ו-measure ראשי + יחידה.",
            "Evaluation: thresholds (Target/Warning/Critical), input parameters, default values וממדי-סינון.",
            "Tile: סוג (numeric/trend/comparison/dual) + drill-down dimensions.",
            "Catalog assignment + הרשאות + transport לסביבות.",
          ],
          flow: [
            { he: "בחירת query+measure", code: "—", note: "KPI" },
            { he: "הגדרת thresholds", code: "—", note: "Evaluation" },
            { he: "סוג-אריח + drill-down", code: "—", note: "Tile" },
            { he: "שיוך ל-catalog", code: "—", note: "launchpad" },
          ],
          masterDataHe: [
            "Analytical CDS query = מקור-המדד.",
            "KPI/Evaluation/Tile = שלושת אובייקטי-המודלינג.",
          ],
          mistakesHe: [
            "בחירת query לא-analytical ➔ ה-KPI לא ייבנה.",
            "thresholds לא-מתואמים-לעסק ➔ אריחים תמיד-אדומים/תמיד-ירוקים.",
            "שכחת transport ➔ ה-KPI קיים ב-DEV אך לא ב-PRD.",
            "drill-down ללא ממדים שימושיים ➔ אריח שאי-אפשר לחקור.",
          ],
          troubleshootHe: [
            "KPI לא ניתן-ליצירה ➔ query ללא @Analytics.query.",
            "אריח ריק ➔ סינון-ברירת-מחדל מסנן הכל או אין נתונים.",
            "צבע תמיד אותו-דבר ➔ thresholds שגויים.",
            "אריח לא מופיע למשתמש ➔ catalog/הרשאות.",
          ],
          bestPracticeHe: [
            "התאם thresholds לערכים עסקיים אמיתיים, לא שרירותיים.",
            "ספק drill-down משמעותי (ספק/קטגוריה/תקופה).",
            "נהל KPIs דרך transports בין סביבות.",
            "בנה מעל queries קיימות לפני יצירת-חדשות.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת אובייקטי-ה-Smart Business ליצירת KPI?", aHe: "KPI (query+measure), Evaluation (thresholds+filters), ו-Tile/Drill-down (תצוגה) — כולם no-code." },
            { qHe: "מהו תנאי-הסף ב-query ל-KPI?", aHe: "ה-CDS query חייב להיות annotated @Analytics.query: true מעל ה-VDM." },
          ],
          takeawaysHe: [
            "KPI נבנה no-code דרך Smart Business.",
            "שלושה אובייקטים: KPI ► Evaluation ► Tile.",
            "ה-query חייב להיות analytical (@Analytics.query).",
            "התאם thresholds עסקית ונהל דרך transports.",
          ],
          relatedHe: [
            { labelHe: "MM · Reporting (15.5)", href: "/library/mm/chapter-15/#sub-15.5" },
            { labelHe: "MM · קונפיגורציית דיווח (15.8.2)", href: "/library/mm/chapter-15/#sub-15.8.2" },
          ],
        },
        {
          id: "15.8.2", titleHe: "הגדרת דיווח/שאילתות בזמן-אמת", titleEn: "Configuring Real-Time Reporting/Queries",
          execHe:
            "דיווח בזמן-אמת ב-S/4HANA אפשרי מפני שהאנליטיקה רצה ישירות מעל טבלאות-העסקה ב-HANA דרך analytical CDS queries — אין ETL, אין replication, אין latency. הגדרת דיווח-בזמן-אמת היא בעיקרה הגדרת/הפעלת ה-queries הנכונות מעל ה-VDM וחשיפתן ב-Query Browser, ב-Multidimensional Report וב-KPIs.",
          beginnerHe:
            "פעם, דוח התעדכן 'אתמול' כי הנתונים הועתקו בלילה למחסן-נתונים. ב-HANA הדוח רץ ישר על הנתונים החיים — מה שקרה לפני דקה כבר מופיע. כאן לומדים להגדיר את ה-queries שמאפשרות זאת, בלי תהליך-העתקה.",
          consultantHe:
            "המנגנון: analytical CDS query (@Analytics.query: true) מעל cube view (@Analytics.dataCategory: #CUBE) ו-dimension views (#DIMENSION). ה-query נחשף אוטומטית ב-Query Browser, RSRT, Multidimensional Report ו-Smart Business. אפשר להגדיר variables, restricted/calculated measures ו-display hierarchies. כיוון שאין persistence נפרד, הביצועים תלויים באיכות-המידול (aggregation, associations) — לכן בניית cube/dimension נכונה היא קריטית.",
          purposeHe:
            "לספק החלטות על נתונים-חיים: מצב-מסירות, הוצאה ו-compliance ברגע-זה — ולא תמונת-אתמול. זה היתרון המהותי של embedded analytics על Data Warehouse קלאסי.",
          processExampleHe:
            "יועץ מפעיל analytical query על PO items, מסמן dataCategory CUBE, מגדיר variable לתקופה, ומפרסם. הקנייָן פותח אותה כ-Multidimensional Report ורואה הוצאה-מתעדכנת תוך-כדי שעמיתיו רושמים PO חדשים.",
          cbcHe:
            "ב-CBC לוח-מסירות-לקווי-המילוי רץ בזמן-אמת: ברגע שנרשם GR לסוכר, מדד-המלאי וה-On-Time מתעדכנים מיד — מנהל-המשמרת רואה תמונה חיה, לא דוח-בוקר.",
          navHe: [
            "SAP Fiori ► Query Browser / View Browser (חשיפת queries)",
            "CDS: @Analytics.query: true מעל @Analytics.dataCategory: #CUBE / #DIMENSION",
            "Multidimensional Report / RSRT להרצה",
          ],
          tables: ["—"],
          tcodes: ["RSRT", "—"],
          fiori: ["Query Browser", "View Browser", "Multidimensional Report", "Custom Analytical Queries (KQ)"],
          configHe: [
            "Cube view: @Analytics.dataCategory: #CUBE; dimension views: #DIMENSION; query: @Analytics.query: true.",
            "Variables (mandatory/optional), restricted & calculated measures, display hierarchies.",
            "חשיפה אוטומטית ב-Query Browser / RSRT / Smart Business.",
            "Analytical authorizations (PFCG) לאבטחת-שורות בזמן-אמת.",
          ],
          flow: [
            { he: "Cube + Dimension views", code: "—", note: "#CUBE/#DIMENSION" },
            { he: "Analytical query", code: "—", note: "@Analytics.query" },
            { he: "חשיפה אוטומטית", code: "—", note: "Query Browser/RSRT" },
            { he: "צריכה בזמן-אמת", code: "—", note: "Report/KPI" },
          ],
          masterDataHe: [
            "Cube/Dimension CDS views = מבנה-המידול ל-real-time analytics.",
            "Analytical query = יחידת-הצריכה הנחשפת לכלים.",
          ],
          mistakesHe: [
            "query ללא #CUBE source ➔ לא נחשף ל-Query Browser.",
            "מידול חלש (חוסר aggregation/associations) ➔ ביצועי-זמן-אמת ירודים.",
            "variables לא-מוגדרים ➔ הרצות כבדות ללא-סינון.",
            "התעלמות מ-analytical authorizations ➔ דליפת-נתונים.",
          ],
          troubleshootHe: [
            "Query לא ב-Query Browser ➔ חסר @Analytics.query / לא-מעל cube.",
            "ביצועים איטיים ➔ מידול לא-אופטימלי; בדוק aggregation.",
            "תוצאות חסרות ➔ analytical authorization חוסם שורות.",
            "variable לא נדרש ➔ הוגדר optional בטעות.",
          ],
          bestPracticeHe: [
            "בנה cube/dimension נכון — הביצועים תלויים במידול.",
            "הגדר variables לסינון יעיל וברירות-מחדל הגיוניות.",
            "אכוף analytical authorizations לאבטחת-שורות.",
            "השתמש-מחדש ב-VDM standard לפני בניית-cube מותאם.",
          ],
          interviewHe: [
            { qHe: "מדוע דיווח-בזמן-אמת אפשרי ב-S/4HANA?", aHe: "כי analytical CDS queries רצות ישירות מעל טבלאות-העסקה ב-HANA — אין ETL/replication/latency." },
            { qHe: "מהם @Analytics.dataCategory CUBE ו-DIMENSION?", aHe: "annotations המסמנים view כ-fact-cube או כ-dimension; analytical query נבנית מעל cube עם associations ל-dimensions." },
          ],
          takeawaysHe: [
            "Real-time = query מעל טבלאות-עסקה ב-HANA, ללא ETL.",
            "Cube (#CUBE) + Dimension (#DIMENSION) + Query (@Analytics.query).",
            "ביצועים תלויים באיכות-המידול.",
            "אכוף analytical authorizations.",
          ],
          relatedHe: [
            { labelHe: "MM · VDM ו-CDS (15.8.3)", href: "/library/mm/chapter-15/#sub-15.8.3" },
            { labelHe: "MM · Reporting (15.5)", href: "/library/mm/chapter-15/#sub-15.5" },
          ],
        },
        {
          id: "15.8.3", titleHe: "חקר ה-Virtual Data Model ו-Core Data Services", titleEn: "Exploring the Virtual Data Model and Core Data Services",
          execHe:
            "ה-Virtual Data Model (VDM) הוא שכבת-הסמנטיקה של S/4HANA — אוסף Core Data Services (CDS) views המתרגמים את טבלאות-המסד הטכניות (EKKO, EKPO) לאובייקטים-עסקיים מובנים (PurchaseOrder, Supplier). זהו מקור-האמת היחיד לכל האנליטיקה, ה-Fiori וה-OData. הבנת ה-VDM היא תנאי לכל פיתוח/הרחבה אנליטית.",
          beginnerHe:
            "טבלאות-ה-SAP הגולמיות קשות לקריאה — שמות-שדה מקודדים, יחסים מורכבים. ה-VDM הוא 'תרגום' שלהן לשפה-עסקית: במקום EKPO-MATKL רואים PurchaseOrderItem.MaterialGroup. CDS views הם הלבנים של התרגום הזה, וכל האנליטיקה יושבת עליהם — לא על הטבלאות עצמן.",
          consultantHe:
            "ה-VDM בנוי בשלוש-שכבות: Basic interface views (I_*) — 1:1 מעל טבלאות עם associations וסמנטיקה; Composite views — join/aggregation לוגיקה-עסקית; Consumption views (C_*) — פונים-למשתמש עם annotations של @UI/@Analytics. סוגי-views: interface, consumption, ו-extension. annotations מרכזיים: @Analytics (query/cube/dimension), @ObjectModel (semantic keys/associations), @UI (Fiori layout), @VDM.viewType. Tools: View Browser לחיפוש, ADT (Eclipse) לפיתוח. הרחבות דרך CDS extend / custom CDS (Custom CDS Views app).",
          purposeHe:
            "לספק שכבת-סמנטיקה אחת, יציבה ושמישה-מחדש מעל המסד הטכני — כך שאנליטיקה, Fiori ו-APIs כולם צורכים את אותו 'מקור-אמת' עקבי, מבלי לגעת בטבלאות.",
          processExampleHe:
            "מפתח מחפש ב-View Browser את I_PurchaseOrderItem, רואה את ה-associations שלו (לספק, לחומר, ל-plant), בונה מעליו composite עם aggregation, ולבסוף consumption view (C_*) עם @Analytics.query לחשיפה ב-Query Browser.",
          cbcHe:
            "ב-CBC צוות-ה-IT מרחיב את ה-VDM של PO ב-custom CDS view המוסיף שדה 'production line' מטבלה-מותאמת, כדי לנתח הוצאה לפי קו-מילוי — בלי לשנות את ה-views הסטנדרטיים (extend-in).",
          navHe: [
            "SAP Fiori ► View Browser (חיפוש CDS views ב-VDM)",
            "ADT (Eclipse) ► Core Data Services ► DDL Source",
            "SAP Fiori ► Custom CDS Views (key-user extensibility)",
          ],
          tables: ["EKKO", "EKPO", "—"],
          tcodes: ["—"],
          fiori: ["F2170 View Browser", "Custom CDS Views", "I_PurchaseOrderItem / C_PURCHASEORDERITEM", "ADT – CDS development"],
          configHe: [
            "שכבות-VDM: Basic (I_*) ► Composite ► Consumption (C_*); הימנע מ-query מעל basic.",
            "Annotations: @Analytics (query/dataCategory), @ObjectModel, @UI, @VDM.viewType.",
            "Associations במקום joins — ניווט-נתונים סמנטי.",
            "הרחבה: CDS extend / Custom CDS Views (key-user) ל-fields/views מותאמים.",
          ],
          flow: [
            { he: "טבלאות", code: "EKKO/EKPO", note: "מסד-טכני" },
            { he: "Basic view I_*", code: "—", note: "1:1 + associations" },
            { he: "Composite view", code: "—", note: "join/aggregation" },
            { he: "Consumption C_*", code: "—", note: "@UI/@Analytics" },
            { he: "צריכה: Fiori/OData/Query", code: "—", note: "מקור-אמת אחד" },
          ],
          masterDataHe: [
            "I_* basic views = שכבת-הבסיס מעל הטבלאות.",
            "C_* consumption views = השכבה הפונה-למשתמש, נושאת annotations.",
          ],
          mistakesHe: [
            "צריכה ישירה מטבלאות במקום מה-VDM ➔ אובדן-סמנטיקה ותחזוקה.",
            "query מעל basic view (I_*) ➔ שבירה בעדכוני-SAP.",
            "שינוי views סטנדרטיים במקום extend ➔ אובדן בעדכון.",
            "התעלמות מ-associations ➔ joins ידניים ושבירים.",
          ],
          troubleshootHe: [
            "View לא נמצא ב-View Browser ➔ שם שגוי או הרשאה.",
            "annotation לא נתפס ➔ שכבה שגויה (basic במקום consumption).",
            "הרחבה נשברה אחרי עדכון ➔ שונה view סטנדרטי במקום extend.",
            "ביצועים ➔ הרבה שכבות/joins במקום associations.",
          ],
          bestPracticeHe: [
            "צרוך תמיד מה-VDM, לעולם לא ישירות מטבלאות.",
            "בנה queries מעל consumption/composite, לא מעל basic.",
            "הרחב דרך extend / Custom CDS Views, אל תשנה standard.",
            "השתמש ב-associations במקום joins ידניים.",
          ],
          interviewHe: [
            { qHe: "מהו ה-Virtual Data Model?", aHe: "שכבת-סמנטיקה של CDS views מעל הטבלאות הטכניות, המתרגמת אותן לאובייקטים-עסקיים ומשמשת מקור-אמת אחיד לאנליטיקה, Fiori ו-OData." },
            { qHe: "מהן שלוש שכבות-ה-VDM ומה ההבדל I_* מול C_*?", aHe: "Basic (I_*) 1:1 מעל טבלאות; Composite ל-join/aggregation; Consumption (C_*) פונה-למשתמש עם @UI/@Analytics. בונים queries מעל C_/composite, לא מעל I_." },
            { qHe: "כיצד מרחיבים ללא שבירת-עדכון?", aHe: "דרך CDS extend או Custom CDS Views (key-user) — מוסיפים שדות/views מבלי לשנות את ה-views הסטנדרטיים." },
          ],
          takeawaysHe: [
            "VDM = שכבת-סמנטיקה (CDS) מעל הטבלאות; מקור-אמת אחד.",
            "שלוש שכבות: Basic (I_*) ► Composite ► Consumption (C_*).",
            "annotations (@Analytics/@UI/@ObjectModel) נושאות את ההתנהגות.",
            "הרחב דרך extend/Custom CDS — לעולם אל תשנה standard.",
          ],
          relatedHe: [
            { labelHe: "MM · דיווח בזמן-אמת (15.8.2)", href: "/library/mm/chapter-15/#sub-15.8.2" },
            { labelHe: "MM · אנליטיקה מוטמעת (15.4.1)", href: "/library/mm/chapter-15/#sub-15.4.1" },
          ],
        },
        {
          id: "15.8.4", titleHe: "אינטגרציה של SAP S/4HANA עם כלי SAP Analytics", titleEn: "Integration of SAP S/4HANA with SAP Analytics Tools",
          execHe:
            "מעבר ל-embedded analytics, S/4HANA משתלב עם כלי-אנליטיקה ייעודיים — בעיקר SAP Analytics Cloud (SAC) ו-SAP Datasphere — לדיווח-אסטרטגי, planning, ו-cross-system. SAC מתחבר Live (בזמן-אמת מול ה-VDM, ללא-העתקה) או Import (snapshot). זהו הגשר בין דיווח-תפעולי-מוטמע לבין דיווח-ארגוני-מאוחד ועתיר-ויזואליזציה.",
          beginnerHe:
            "Embedded analytics מצוין לתפעול היומי, אבל ההנהלה רוצה תמונה רחבה — לשלב רכש, מכירות, כספים, ולתכנן קדימה. כאן נכנס SAP Analytics Cloud: כלי-ענן שמתחבר ל-S/4 ומציג dashboards יפים ותכנון. Live = רואה נתונים-חיים; Import = מעתיק תמונת-מצב פנימה.",
          consultantHe:
            "SAC live connection ניגש ישירות ל-analytical CDS queries (InA protocol) — אין העתקת-נתונים, אבטחה ו-authorizations נשמרים ב-S/4. Import connection מושך snapshot ל-SAC (לעיבוד/בלנדינג עצמאי). SAP Datasphere משמש כשכבת-data-fabric לשילוב מקורות (S/4, non-SAP) ולחשיפה ל-SAC. בחירה: Live ל-real-time וממשל-מרכזי; Import לביצועים-עצמאיים ולשילוב-מקורות. כלים נוספים: SAP Analysis for Office (Excel front-end מעל queries).",
          purposeHe:
            "להרחיב את האנליטיקה מעבר ל-S/4: דיווח-מאוחד חוצה-תחומים, תכנון (planning), ויזואליזציה-עשירה ושיתוף — בלי לכפות הכל על embedded analytics, ותוך שמירה על מקור-אמת אחד (ה-VDM).",
          processExampleHe:
            "צוות-BI יוצר live connection מ-SAC ל-S/4, מושך את C_PURCHASEORDERITEM, ובונה story המשלבת Spend, On-Time ו-Contract Compliance בלוח-הנהלה אחד — הנתונים חיים, בלי replication.",
          cbcHe:
            "ב-CBC ההנהלה צורכת story ב-SAC המשלבת רכש (מ-S/4 live), מכירות ומלאי; בנוסף, צוות-הכספים מריץ planning ב-SAC לתקצוב-רכש-שנתי — והכל מעל אותו VDM כמקור-אמת.",
          navHe: [
            "SAP Analytics Cloud ► Connections ► Live (InA) / Import",
            "SAP Datasphere ► data fabric (S/4 + non-SAP) ◄► SAC",
            "SAP Analysis for Office (Excel) מעל analytical queries",
          ],
          tables: ["—"],
          tcodes: ["—"],
          fiori: ["SAP Analytics Cloud (SAC)", "SAP Datasphere", "SAP Analysis for Office", "Live Connection (InA protocol)"],
          configHe: [
            "Live connection (InA): גישה ישירה ל-analytical queries ב-S/4, ללא-העתקה, authorizations נשמרים.",
            "Import connection: snapshot ל-SAC לעיבוד/בלנדינג עצמאי.",
            "SAP Datasphere: data fabric לשילוב S/4 + מקורות-חוץ וחשיפה ל-SAC.",
            "Analysis for Office: front-end Excel מעל אותן queries.",
          ],
          flow: [
            { he: "VDM analytical query", code: "—", note: "מקור" },
            { he: "Live (InA) / Import", code: "—", note: "סוג-חיבור" },
            { he: "SAC / Datasphere", code: "—", note: "מודל + story" },
            { he: "Story / Planning", code: "—", note: "הגשה + תכנון" },
          ],
          masterDataHe: [
            "Analytical CDS query = נקודת-החיבור של SAC ל-S/4.",
            "Datasphere data fabric = שכבת-שילוב חוצה-מקורות.",
          ],
          mistakesHe: [
            "Import כשנדרש real-time ➔ נתוני-snapshot מיושנים.",
            "Live ללא תכנון-עומס ➔ עומס על S/4 בריצות-כבדות.",
            "שכפול-מודל ב-SAC במקום צריכת-VDM ➔ אי-עקביות מקור-אמת.",
            "התעלמות מ-authorizations בחיבור ➔ דליפת-נתונים.",
          ],
          troubleshootHe: [
            "SAC לא מציג נתונים ➔ connection/הרשאות-system/query לא-released.",
            "Live איטי ➔ query לא-אופטימלי או עומס-בו-זמני.",
            "Import לא מתעדכן ➔ scheduling של ה-import.",
            "authorizations לא חלים ➔ live מוגדר שגוי (לא InA).",
          ],
          bestPracticeHe: [
            "העדף Live לדיווח-real-time ולממשל-מרכזי.",
            "השתמש ב-Import/Datasphere לשילוב-מקורות ולעצמאות-ביצועים.",
            "צרוך את ה-VDM כמקור-אמת — אל תשכפל מודל ב-SAC.",
            "ודא ש-authorizations נשמרים דרך live (InA).",
          ],
          interviewHe: [
            { qHe: "Live מול Import ב-SAC — מתי כל אחד?", aHe: "Live = real-time ללא-העתקה, authorizations נשמרים ב-S/4 — לדיווח-תפעולי-מאוחד; Import = snapshot מועתק — לעצמאות-ביצועים, בלנדינג ו-planning." },
            { qHe: "מה תפקיד SAP Datasphere?", aHe: "data fabric המשלב S/4 ומקורות-חוץ לשכבת-נתונים אחת ומגיש ל-SAC — לדיווח חוצה-מערכות." },
            { qHe: "מהו SAP Analysis for Office?", aHe: "תוסף-Excel המאפשר לנתח analytical queries של S/4 בסביבת-Excel מוכרת." },
          ],
          takeawaysHe: [
            "SAC/Datasphere מרחיבים אנליטיקה מעבר ל-embedded.",
            "Live (InA) = real-time ללא-העתקה; Import = snapshot.",
            "ה-VDM נשאר מקור-האמת גם ל-SAC.",
            "Datasphere לשילוב חוצה-מקורות; Analysis for Office ל-Excel.",
          ],
          relatedHe: [
            { labelHe: "MM · Reporting (15.5)", href: "/library/mm/chapter-15/#sub-15.5" },
            { labelHe: "MM · VDM ו-CDS (15.8.3)", href: "/library/mm/chapter-15/#sub-15.8.3" },
          ],
        },
        {
          id: "15.8.5", titleHe: "אינטגרציה עם אפליקציות ענן", titleEn: "Integration with Cloud Applications",
          execHe:
            "אנליטיקת-רכש מלאה דורשת נתונים גם מאפליקציות-ענן של SAP מחוץ ל-S/4: SAP Ariba (sourcing/contracts/spend), SAP Fieldglass (כוח-אדם-חיצוני/services) ו-SAP Concur (נסיעות-והוצאות). האינטגרציה — דרך SAP Business Network ו-SAP Integration Suite (BTP/CPI) — מאחדת spend ישיר ועקיף לתמונה אחת, ומאפשרת אנליטיקת-spend הוליסטית.",
          beginnerHe:
            "לא כל ההוצאה נרשמת ב-S/4. הוצאה על שירותים וכוח-אדם-חיצוני יושבת ב-Fieldglass, נסיעות ב-Concur, ו-sourcing ב-Ariba. כדי לראות את 'כל ההוצאה' צריך לחבר את כל הענני-האלה ל-S/4 ולאנליטיקה. כאן לומדים איך מחברים אותם.",
          consultantHe:
            "מנגנוני-אינטגרציה: SAP Business Network (Ariba/B2B), SAP Integration Suite (Cloud Integration/CPI) ל-mapping ו-orchestration, ו-pre-built integration content (iFlows). Ariba מזרים contracts/awards ו-invoices; Fieldglass מזרים services procurement (SOW/contingent labor); Concur מזרים T&E. הנתונים מאוחדים ל-spend analytics (לרוב דרך S/4 או Datasphere/SAC). אתגרים: master-data harmonization (ספקים, קטגוריות), category mapping, ו-timing/reconciliation. ממשל-נתונים אחיד הוא תנאי לאנליטיקה אמינה חוצה-ענן.",
          purposeHe:
            "להשיג נראות-spend מלאה — ישיר (חומרים) ועקיף (שירותים, נסיעות, כוח-אדם) — במקום אחד, כדי שניהול-הקטגוריות וה-Sourcing יתבססו על התמונה השלמה ולא על חלקה.",
          processExampleHe:
            "iFlow ב-Integration Suite מסנכרן contracts מ-Ariba ל-S/4 ו-services-spend מ-Fieldglass; אנליטיקת-ה-spend מציגה כעת ישיר+עקיף מאוחד, וחושפת שהוצאת-השירותים גדולה מהמשוער.",
          cbcHe:
            "ב-CBC הוצאת-לוגיסטיקה ושירותי-תחזוקה (Fieldglass) ונסיעות-מכירות (Concur) מאוחדות עם רכש-חומרים (S/4) ו-sourcing (Ariba) — ההנהלה רואה לראשונה את total spend האמיתי של החברה, כולל ההוצאה-העקיפה שהוסתרה קודם.",
          navHe: [
            "SAP Integration Suite (BTP) ► Cloud Integration (iFlows) ► Ariba/Fieldglass/Concur",
            "SAP Business Network ◄► SAP S/4HANA",
            "Spend consolidation ► S/4 / Datasphere / SAC",
          ],
          tables: ["—"],
          tcodes: ["—"],
          fiori: ["SAP Integration Suite (Cloud Integration)", "SAP Business Network", "SAP Ariba / Fieldglass / Concur", "Pre-built integration content (iFlows)"],
          configHe: [
            "SAP Integration Suite (CPI): iFlows ל-mapping/orchestration בין הענן ל-S/4.",
            "SAP Business Network: ערוץ ל-Ariba ול-B2B documents.",
            "Master-data harmonization: מיפוי ספקים וקטגוריות אחיד בין מערכות.",
            "Spend consolidation target: S/4 / Datasphere / SAC לאנליטיקה-מאוחדת.",
          ],
          flow: [
            { he: "Cloud apps", code: "—", note: "Ariba/Fieldglass/Concur" },
            { he: "Integration Suite (iFlows)", code: "—", note: "mapping/orchestration" },
            { he: "S/4 / Datasphere", code: "—", note: "consolidation" },
            { he: "Holistic spend analytics", code: "—", note: "ישיר + עקיף" },
          ],
          masterDataHe: [
            "Supplier & Category mapping = תנאי לצבירת-spend חוצה-ענן.",
            "iFlows (pre-built content) = לוגיקת-האינטגרציה.",
          ],
          mistakesHe: [
            "master-data לא-מהורמן ➔ ספקים/קטגוריות לא-מצטברים בין מערכות.",
            "התעלמות מ-spend עקיף ➔ תמונת-הוצאה חלקית.",
            "אינטגרציה point-to-point במקום Integration Suite ➔ תחזוקה שברירית.",
            "אי-reconciliation של timing ➔ כפילויות/פערים ב-spend.",
          ],
          troubleshootHe: [
            "spend מ-Ariba/Fieldglass חסר ➔ iFlow כשל או mapping שגוי.",
            "ספק כפול בין מערכות ➔ master-data harmonization חסר.",
            "קטגוריה לא מצטברת ➔ category mapping לא-עקבי.",
            "סכומים כפולים ➔ אי-reconciliation בין מקורות.",
          ],
          bestPracticeHe: [
            "השתמש ב-pre-built integration content (iFlows) לפני בנייה-מותאמת.",
            "הַרְמֵן master-data (ספקים/קטגוריות) לפני איחוד-spend.",
            "כלול spend עקיף (Fieldglass/Concur) לתמונה מלאה.",
            "נהל אינטגרציה דרך Integration Suite, לא point-to-point.",
          ],
          interviewHe: [
            { qHe: "אילו אפליקציות-ענן מזינות אנליטיקת-spend הוליסטית?", aHe: "SAP Ariba (sourcing/contracts), SAP Fieldglass (services/contingent labor), ו-SAP Concur (T&E) — בנוסף ל-S/4HANA." },
            { qHe: "מהו תפקיד SAP Integration Suite?", aHe: "פלטפורמת-אינטגרציה (BTP/CPI) עם iFlows ל-mapping ו-orchestration בין אפליקציות-הענן ל-S/4HANA." },
            { qHe: "מהו האתגר המרכזי באנליטיקת-spend חוצה-ענן?", aHe: "Master-data harmonization — איחוד ספקים וקטגוריות בין מערכות, אחרת ה-spend לא מצטבר נכון." },
          ],
          takeawaysHe: [
            "spend הוליסטי דורש Ariba+Fieldglass+Concur לצד S/4.",
            "אינטגרציה דרך Business Network ו-Integration Suite (iFlows).",
            "Master-data harmonization הוא תנאי-יסוד.",
            "כלול spend עקיף — לא רק רכש-חומרים.",
          ],
          relatedHe: [
            { labelHe: "MM · Ariba Category Management (15.7)", href: "/library/mm/chapter-15/#sub-15.7" },
            { labelHe: "MM · Spend Visibility (15.1)", href: "/library/mm/chapter-15/#sub-15.1" },
          ],
        },
      ],
    },
    // ============================================================ 15.9
    {
      id: "15.9", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק 15 הראה כיצד S/4HANA הופך נתוני-רכש גולמיים לתובנה אסטרטגית בזמן-אמת. השרשרת: Spend Visibility (לאן הולך הכסף) ► Contract Expiration (ניהול-חוזים יזום) ► Sourcing (ממי לקנות) ► Supplier Performance (איך הספק מבצע, כולל embedded analytics וחיזוי) ► Reporting (איך מציגים) ► ML/AI (אוטומציה והמלצה) ► Ariba Category Management (אסטרטגיה). הבסיס הטכני המשותף: Virtual Data Model (VDM) של CDS views, embedded analytics, KPIs ו-SAP Analytics Cloud.",
      beginnerHe:
        "הפרק לימד את 'מסע-האנליטיקה' של הרכש: קודם רואים את ההוצאה, אז מנהלים חוזים, בוחרים ספקים, מודדים את ביצועיהם, מדווחים, ולבסוף מוסיפים AI ואסטרטגיית-קטגוריות. מתחת לכל זה יושב מבנה-נתונים אחד (VDM/CDS) שמאפשר לראות הכל בזמן-אמת ולחבר גם ל-SAP Analytics Cloud ולענני-Ariba/Fieldglass/Concur.",
      consultantHe:
        "מבחינת-מימוש: הצלחת-אנליטיקה תלויה ב-(1) היגיינת-נתונים — Material Group, מיזוג-ספקים, category mapping; (2) הבנת ה-VDM ושכבותיו לבניית KPIs ו-queries נכונים; (3) בחירת כלי-הגשה נכון (embedded לתפעולי, SAC לאסטרטגי); (4) אינטגרציה חוצה-ענן עם harmonization. הדגש ב-S/4HANA הוא real-time, no-code (Smart Business/KQ) ו-human-in-the-loop ב-AI. שלוט במשולש VDM↔Analytics↔Cloud ותוכל לבנות, להרחיב ולפתור-תקלות בכל שכבת-האנליטיקה.",
      purposeHe:
        "לקשור את כל רכיבי-הפרק לתמונה אחת ולתת לקורא מפת-דרכים: ממה מורכבת אנליטיקת-רכש מודרנית, מה התשתית הטכנית, ואיך כל חלק תורם לניהול-רכש מבוסס-נתונים.",
      processExampleHe:
        "ארגון מטמיע את המסע המלא: מקים Spend dashboard, מפעיל התראות-תפוגת-חוזים, מנתח Sourcing וביצועי-ספקים, בונה KPIs מעל ה-VDM, מוסיף חיזוי-איחורים ו-anomaly detection, ומחבר Ariba ו-SAC — ומגיע לרכש יזום, מאוחד ומבוסס-נתונים.",
      cbcHe:
        "ב-CBC התוצאה: ההנהלה רואה total spend מאוחד (ישיר+עקיף), מקבלת התראות-חוזה לפני פקיעה, מנהלת ספקים לפי ציון-ביצועים אובייקטיבי, וצופה איחורי-תרכיז לפני שיא-הקיץ — כל זאת בזמן-אמת מעל ה-VDM, עם SAC להנהלה ו-Ariba לאסטרטגיה.",
      navHe: [
        "מסע: Spend ► Contracts ► Sourcing ► Supplier Performance ► Reporting ► ML/AI ► Category Management",
        "תשתית: VDM (CDS views) ► embedded analytics ► KPIs ► SAC / Cloud",
        "SAP Fiori Launchpad ► Procurement ► Purchasing Analytics (כל האפליקציות)",
      ],
      tables: ["EKKO", "EKPO", "EKBE", "EKET"],
      tcodes: ["—"],
      fiori: ["Procurement Overview Page", "Monitor Purchasing Spend", "Supplier Evaluation", "SAP Analytics Cloud"],
      configHe: [
        "היגיינת-נתונים: Material Group, מיזוג-ספקים, category mapping — בסיס לכל אנליטיקה.",
        "VDM mastery: שכבות (I_/composite/C_) ו-annotations כתנאי לבנייה/הרחבה.",
        "בחירת-כלי: embedded (תפעולי, real-time) מול SAC (אסטרטגי, מאוחד).",
        "אינטגרציה חוצה-ענן עם master-data harmonization.",
      ],
      flow: [
        { he: "Spend Visibility", code: "—", note: "לאן הכסף" },
        { he: "Contracts + Sourcing", code: "—", note: "ניהול יזום + בחירה" },
        { he: "Supplier Performance + חיזוי", code: "—", note: "מדידה + נבואה" },
        { he: "Reporting + ML/AI", code: "—", note: "הגשה + אוטומציה" },
        { he: "Category Management", code: "—", note: "אסטרטגיה (Ariba)" },
      ],
      masterDataHe: [
        "VDM (CDS views) = מקור-האמת המשותף לכל הפרק.",
        "Material Group + Supplier + Category mapping = תשתית-הסיווג.",
      ],
      mistakesHe: [
        "השקעה ב-dashboards לפני היגיינת-נתונים ➔ תובנה מטעה.",
        "התעלמות מ-VDM ➔ אנליטיקה שברירית מעל טבלאות.",
        "כלי-הגשה לא-מתאים-לקהל ➔ אימוץ נמוך.",
        "spend עקיף לא-מאוחד ➔ תמונה חלקית.",
      ],
      troubleshootHe: [
        "תובנות לא-עקביות ➔ חזור להיגיינת-נתונים (Material Group/ספקים).",
        "אנליטיקה נשברת בעדכון ➔ נבנתה מעל טבלאות/basic ולא VDM.",
        "אימוץ נמוך ➔ כלי-הגשה לא-תואם-קהל.",
        "spend חסר ➔ אינטגרציה חוצה-ענן לא-שלמה.",
      ],
      bestPracticeHe: [
        "התחל מהיגיינת-נתונים, אז בנה אנליטיקה.",
        "שלוט ב-VDM — הוא הבסיס לכל השאר.",
        "התאם כלי-הגשה לקהל (embedded/SAC).",
        "אחד spend ישיר ועקיף לתמונה מלאה.",
      ],
      interviewHe: [
        { qHe: "מהי השרשרת הלוגית של אנליטיקת-רכש?", aHe: "Spend Visibility ► Contracts ► Sourcing ► Supplier Performance ► Reporting ► ML/AI ► Category Management — כולן מעל ה-VDM." },
        { qHe: "מהו הבסיס הטכני המשותף לכל הפרק?", aHe: "ה-Virtual Data Model (CDS views) — מקור-האמת ל-embedded analytics, KPIs, ול-SAP Analytics Cloud." },
        { qHe: "מה הכי קריטי להצלחת-אנליטיקה?", aHe: "היגיינת-נתונים (Material Group, מיזוג-ספקים, category mapping) — בלעדיה כל dashboard מטעה." },
      ],
      takeawaysHe: [
        "אנליטיקת-רכש = מסע מ-Spend ל-Strategy מעל VDM אחד.",
        "S/4HANA = real-time, no-code, embedded analytics.",
        "היגיינת-נתונים קודמת לכל dashboard.",
        "embedded לתפעולי, SAC/Ariba לאסטרטגי; אחד ישיר+עקיף.",
      ],
      relatedHe: [
        { labelHe: "MM · Spend Visibility (15.1)", href: "/library/mm/chapter-15/#sub-15.1" },
        { labelHe: "MM · קונפיגורציה (15.8)", href: "/library/mm/chapter-15/#sub-15.8" },
      ],
    },
  ],
};
