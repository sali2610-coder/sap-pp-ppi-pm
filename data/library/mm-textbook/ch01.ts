// ===== MM Digital Textbook — Chapter 1 (Academy Template, validated) =====
// Sourcing & Procurement (MM) — every node (parent + nested) is a complete
// 18-facet LearningNode in authored Hebrew. Hierarchy preserved verbatim from
// the source TOC; SAP identifiers kept verbatim English.
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "מבוא לרכש ואספקה",
  titleEn: "Introduction to Sourcing and Procurement",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למבוא לרכש ואספקה (Sourcing & Procurement) ב-SAP S/4HANA. כל תת-פרק וכל תת-סעיף הורחב ליחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (בקבוק קוקה-קולה ישראל), ניווט ו-SPRO/IMG, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשימי-תהליך (Source-to-Pay ו-Procure-to-Pay), טעויות נפוצות, פתרון-תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בעולם הרכש של S/4HANA — מהבסיס התפעולי ועד הסורסינג האסטרטגי — ללא מקור נוסף.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1",
      titleHe: "רכש ואספקה: מהבסיסי לאסטרטגי",
      titleEn: "Sourcing and Procurement: From Basic to Strategic",
      execHe:
        "רכש ואספקה נמתחים על רצף שלם: בקצה האחד רכש תפעולי (Operational Procurement) — ביצוע יומיומי של הזמנות, קבלות וחשבוניות; בקצה השני סורסינג אסטרטגי (Strategic Sourcing) — בחירת ספקים, ניהול חוזים-מסגרת ומשא-ומתן ארוך-טווח. ארגון בוגר נע מ'כיבוי-שריפות' תפעולי לעבר ניהול-הוצאה (Spend) אסטרטגי. SAP S/4HANA תומך בשני הקצוות ובמעבר ביניהם.",
      beginnerHe:
        "דמיין שני סוגי קניות: הקנייה היומיומית הקבועה (מזמינים שוב מספק קיים — תפעולי) מול ההחלטה הגדולה 'מאיזה ספק בכלל לקנות ובאיזה חוזה' (אסטרטגי). הראשון מהיר וחוזר; השני נדיר, גדול ומשפיע על שנים קדימה. הרכש הטוב מחבר ביניהם — ההחלטה האסטרטגית מזינה תבנית להזמנות התפעוליות.",
      consultantHe:
        "ב-S/4HANA הרצף ממומש דרך אובייקטים מקושרים: רשומת-מקור (EINA/EINE) ו-Source List (EORD) קושרות חומר↔ספק; חוזה-מסגרת (Outline Agreement, EKKO/EKPO סוג K/L) מעגן תנאים אסטרטגיים; ה-PR (EBAN) וה-PO (EKKO/EKPO) מבצעים תפעולית. Source Determination בעת יצירת PR/PO שולפת אוטומטית את המקור האסטרטגי שנקבע מראש. ההבחנה Basic-vs-Strategic אינה רק ארגונית — היא נשענת על קונפיגורציה (Source List requirement, Quota Arrangement) הקובעת עד כמה הבחירה אוטומטית.",
      purposeHe:
        "המטרה: למקסם ערך לאורך כל ההוצאה — להבטיח אספקה רציפה (תפעולי) תוך שיפור מתמיד של תנאים, סיכון ועלות-כוללת (אסטרטגי). מיפוי נכון של הרצף קובע איפה להשקיע אוטומציה (תפעולי) ואיפה שיקול-דעת אנושי (אסטרטגי).",
      processExampleHe:
        "ארגון מזהה חומר עתיר-הוצאה. הסורסינג מנהל RFQ (ME41), בוחר ספק, חותם חוזה-מסגרת (ME31K). מאותו רגע הרכש התפעולי רק מבצע: PR נוצר, Source Determination שולפת את החוזה, ה-PO מופק כ-Release Order כנגד החוזה — בלי משא-ומתן חוזר.",
      cbcHe:
        "ב-CBC: התרכיז (Concentrate) נרכש ספק-יחיד מ-The Coca-Cola Company — סורסינג אסטרטגי טהור עם חוזה ארוך-טווח. לעומתו, חומרי-אריזה (פקקים, תוויות) הם רכש תפעולי שוטף מספקים מרובים דרך Ariba. הסוכר וה-CO2 נמצאים באמצע — חוזי-מסגרת שנתיים עם Release Orders שבועיים.",
      navHe: [
        "Materials Management ► Purchasing ► Sources of Supply ► Maintain Source List (SPRO ► IMG ► MM ► Purchasing ► Source List)",
        "Materials Management ► Purchasing ► Sources of Supply ► Define Rules for Source Determination",
        "SPRO ► IMG ► Materials Management ► Purchasing ► Conditions ► Define Condition Control at Plant Level",
      ],
      tables: ["EINA", "EINE", "EORD", "EKKO", "EKPO", "EBAN"],
      tcodes: ["ME01", "ME11", "ME41", "ME31K", "ME21N", "ME51N"],
      fiori: ["F0842 (Manage Purchase Requisitions)", "F1990 (Manage Sources of Supply)", "F1985 (Manage Purchase Contracts)"],
      configHe: [
        "Source List requirement (per material/plant, ME01): כפיית בחירת-מקור מאושר — חוסם רכש 'פראי'.",
        "Source Determination rules: סדר-עדיפויות בין Quota Arrangement, חוזה, Source List ו-Info Record.",
        "Outline Agreement types (K=חוזה כמותי/ערכי, L=Scheduling Agreement) ב-SPRO ► Define Document Types.",
        "Spend categorization: שיוך חומרים ל-Material Groups כבסיס לניתוח-הוצאה אסטרטגי.",
      ],
      flow: [
        { he: "ניתוח הוצאה (Spend)", code: "ME2N/ME80FN", note: "זיהוי קטגוריות אסטרטגיות" },
        { he: "סורסינג + בחירת ספק", code: "ME41", note: "RFQ / השוואה" },
        { he: "חוזה-מסגרת", code: "ME31K", note: "עיגון תנאים אסטרטגיים" },
        { he: "Source List / Info Record", code: "ME01/ME11", note: "מקור מאושר" },
        { he: "רכש תפעולי שוטף", code: "ME21N", note: "Release Order כנגד חוזה" },
        { he: "מדידה ושיפור", code: "MCE*", note: "מחזור חזרה לאסטרטגי" },
      ],
      masterDataHe: [
        "Info Record (EINA כלל-ארגוני, EINE רמת-Org/מפעל) = חומר↔ספק + תנאי-מחיר.",
        "Source List (EORD) = מקורות מאושרים לחומר/מפעל + חלון-תוקף + סימון Fix/Block.",
        "Outline Agreement (EKKO/EKPO) = חוזה אסטרטגי המשמש בסיס ל-Release Orders.",
      ],
      mistakesHe: [
        "טיפול בכל הקטגוריות באותה רמה — בזבוז שיקול-דעת אסטרטגי על פריטים זניחים ולהפך.",
        "אי-הפעלת Source List requirement לחומרים קריטיים — נפתח פתח לרכש מספק לא-מאושר.",
        "חוזה-מסגרת ללא קישור ל-Source List — ה-PO לא 'מוצא' אוטומטית את החוזה.",
        "ערבוב Material Groups לא-עקבי — ניתוח-הוצאה אסטרטגי הופך חסר-משמעות.",
      ],
      troubleshootHe: [
        "PO לא שולף את החוזה אוטומטית ➔ Source List חסר/לא-Fix, או חלון-תוקף שגוי.",
        "Source Determination לא מציעה מקור ➔ אין Info Record/Source List פעיל לחומר/מפעל.",
        "רכש מספק לא-מאושר התאפשר ➔ Source List requirement לא הופעל לחומר.",
        "ניתוח-הוצאה לא-תקין ➔ Material Group שגוי או חסר בחומרים.",
      ],
      bestPracticeHe: [
        "סווג הוצאה לפי מטריצת Kraljic (אסטרטגי/צוואר-בקבוק/ממנף/שגרתי) והתאם רמת-טיפול.",
        "הפעל Source List requirement לכל החומרים האסטרטגיים והקריטיים.",
        "עגן כל קטגוריה אסטרטגית בחוזה-מסגרת ובמקור מאושר לפני שמתחילים PO-ים שוטפים.",
        "אחד מבנה Material Groups כבסיס אחיד לניתוח, לדיווח ול-Sourcing.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין רכש תפעולי לסורסינג אסטרטגי?", aHe: "תפעולי = ביצוע יומיומי (PR/PO/קבלה/חשבונית) של החלטות-מקור קיימות; אסטרטגי = בחירת ספקים, חוזי-מסגרת ומשא-ומתן ארוך-טווח. האסטרטגי מזין את התפעולי דרך מקורות מאושרים." },
        { qHe: "כיצד S/4HANA מבטיח שהרכש התפעולי יכבד את ההחלטה האסטרטגית?", aHe: "דרך Source List requirement, Source Determination ו-Quota Arrangement — ה-PR/PO שולפים אוטומטית את המקור/החוזה שנקבע מראש, ורכש מספק לא-מאושר נחסם." },
      ],
      takeawaysHe: [
        "רכש הוא רצף: תפעולי (ביצוע) ↔ אסטרטגי (בחירה וחוזים).",
        "האסטרטגי מזין את התפעולי דרך Source List, Info Record וחוזה-מסגרת.",
        "סיווג-הוצאה (Spend) קובע איפה להשקיע אוטומציה ואיפה שיקול-דעת.",
      ],
      relatedHe: [
        { labelHe: "MM · רכש עם S/4HANA (1.3)", href: "/library/mm-academy/chapter-01/#sub-1.3" },
        { labelHe: "MM · Source-to-Pay ו-Procure-to-Pay (1.2.2)", href: "/library/mm-academy/chapter-01/#sub-1.2.2" },
      ],
      children: [
        {
          id: "1.1.1",
          titleHe: "סורסינג (Sourcing)",
          titleEn: "Sourcing",
          execHe:
            "סורסינג הוא תהליך זיהוי, הערכה ובחירה של ספקים, וניהול היחסים והחוזים מולם. הוא עוסק בשאלה האסטרטגית 'ממי לקנות ובאילו תנאים', ולא בביצוע ההזמנה עצמה. סורסינג טוב מקטין סיכון-אספקה, משפר עלות-כוללת ובונה יתרון-תחרותי.",
          beginnerHe:
            "סורסינג = למצוא ולבחור את הספק הנכון. כמו לבחור ספק קבוע למצרך חשוב: בודקים כמה אפשרויות, משווים מחיר/איכות/אמינות, מנהלים משא-ומתן וחותמים הסכם. ההזמנה בפועל תבוא אחר-כך.",
          consultantHe:
            "ב-S/4HANA הסורסינג נשען על RFQ/Quotation (ME41/ME47/ME49), על Supplier Evaluation, ועל חוזי-מסגרת. התוצר מתועד כ-Info Record (EINA/EINE) וכ-Source List (EORD). ב-S/4HANA רבים מהתהליכים האסטרטגיים עברו ל-SAP Ariba (Sourcing, Contracts, Supplier Lifecycle) המתממשק חזרה ל-Core דרך אובייקטי-מקור. Supplier הוא Business Partner (LFA1/LFB1/LFM1 נשמרים, אך הניהול ב-BP).",
          purposeHe:
            "להבטיח שלכל קטגוריית-הוצאה יש ספק מתאים, מוערך ומחוזה — לפני שמתחיל הרכש התפעולי. הסורסינג ממיר 'הוצאה כאוטית' ל'הוצאה מנוהלת'.",
          processExampleHe:
            "קטגוריה חדשה: שולחים RFQ למספר ספקים (ME41), מקבלים הצעות (ME47), משווים (ME49), בוחרים, מעריכים ספק, וחותמים חוזה. התוצאה: Info Record + Source List שמהם ימשיך הרכש התפעולי.",
          cbcHe:
            "ב-CBC הסורסינג של בקבוקי-PET וחומרי-אריזה מנוהל ב-SAP Ariba: RFQ דיגיטלי, השוואת-הצעות וניהול חוזים. התרכיז עצמו אינו עובר סורסינג תחרותי — Single Source מחוזה The Coca-Cola Company.",
          navHe: [
            "Materials Management ► Purchasing ► RFQ/Quotation ► Define Document Types",
            "SPRO ► IMG ► Materials Management ► Purchasing ► Sources of Supply ► Purchasing Info Record ► Define Number Ranges",
          ],
          tables: ["EINA", "EINE", "EKKO", "EKPO", "LFM1"],
          tcodes: ["ME41", "ME47", "ME49", "ME11", "ME31K", "BP"],
          fiori: ["F1990 (Manage Sources of Supply)", "F2425 (Manage RFQs)"],
          configHe: [
            "RFQ document types + טווחי-מספרים (SPRO ► Define Document Types).",
            "Purchasing Info Record number ranges + control (תנאי-מחיר, Net price, סוגי-מידע).",
            "Supplier Evaluation criteria (במידה ופעיל ב-Core, או Ariba SLP).",
          ],
          mistakesHe: [
            "בחירת ספק לפי מחיר בלבד בלי שקלול איכות/אמינות/סיכון.",
            "אי-תיעוד תוצאת-הסורסינג כ-Info Record/Source List — הרכש התפעולי 'שוכח' את ההחלטה.",
            "ניהול ספק ב-LFA1 ישירות במקום דרך Business Partner ב-S/4HANA.",
          ],
          troubleshootHe: [
            "PO לא מציע את הספק שנבחר ➔ לא נוצר Info Record/Source List מתוצאת-הסורסינג.",
            "לא ניתן ליצור Supplier ➔ יש להקים Business Partner (BP) עם תפקיד-ספק, לא LFA1 ישיר.",
            "השוואת-הצעות ריקה ➔ ה-Quotations (ME47) לא הוזנו כנגד ה-RFQ.",
          ],
          bestPracticeHe: [
            "תעד כל בחירת-ספק כ-Info Record + Source List לסגירת הלולאה לתפעולי.",
            "שלב הערכת-ספקים רב-קריטריונית, לא רק מחיר.",
            "נצל את SAP Ariba לסורסינג תחרותי ולניהול-חוזים בקנה-מידה.",
          ],
          interviewHe: [
            { qHe: "מהו התוצר התפעולי של תהליך-סורסינג ב-S/4HANA?", aHe: "Purchasing Info Record (EINA/EINE) ו-Source List (EORD) — ולעיתים חוזה-מסגרת — שמהם הרכש התפעולי שולף מקור ותנאים אוטומטית." },
            { qHe: "כיצד מנוהל ספק ב-S/4HANA?", aHe: "כ-Business Partner (תפקיד FLVN01); טבלאות LFA1/LFB1/LFM1 עדיין קיימות מאחורי-הקלעים, אך התחזוקה דרך BP." },
          ],
          takeawaysHe: [
            "סורסינג = זיהוי, הערכה ובחירת ספקים + חוזים.",
            "תוצרו מתועד כ-Info Record / Source List / חוזה.",
            "ב-S/4HANA רובו עובר ל-Ariba, וספק = Business Partner.",
          ],
          relatedHe: [
            { labelHe: "MM · סורסינג אסטרטגי (1.3.2)", href: "/library/mm-academy/chapter-01/#sub-1.3.2" },
          ],
        },
        {
          id: "1.1.2",
          titleHe: "רכש תפעולי (Operational Procurement)",
          titleEn: "Operational Procurement",
          execHe:
            "רכש תפעולי הוא הביצוע היומיומי של מחזור הרכש: יצירת דרישת-רכש (PR), הזמנת-רכש (PO), קבלת-טובין (GR) ואימות-חשבונית (IR). זהו ה'מנוע' התפעולי שמבטיח שהחומר מגיע בזמן ומשולם נכון — בהיקפים גבוהים ובאוטומציה רבה.",
          beginnerHe:
            "הרכש התפעולי הוא הקנייה החוזרת והשגרתית: מישהו מבקש (PR), הרכש מזמין (PO), הסחורה מתקבלת (GR), והספק מקבל תשלום אחרי בדיקת חשבונית (IR). זה ה'יום-יום' של מחלקת הרכש.",
          consultantHe:
            "ה-flow הוא P2P: EBAN (PR) ➔ EKKO/EKPO (PO) ➔ MSEG/MKPF (GR, תנועת 101) ➔ RBKP/RSEG (חשבונית). אימות מבוסס 3-Way Match (PO↔GR↔Invoice). מנגנוני-אוטומציה: Auto-PO מ-PR (סימון ב-Info Record), Auto-GR, ו-ERS (Evaluated Receipt Settlement). ב-S/4HANA חוויית המשתמש עוברת ל-Fiori (Self-Service Procurement) ול-Situation Handling להתראות-אוטומטיות.",
          purposeHe:
            "לבצע ביעילות-מרבית את החלטות-המקור האסטרטגיות: לקנות את הכמות הנכונה, בזמן הנכון, במחיר המוסכם, ולשלם נכון — תוך מינימום התערבות-ידנית.",
          processExampleHe:
            "משתמש יוצר PR (ME51N) ל-1,000 יח'. Source Determination מצמידה ספק מ-Source List. הרכש ממיר ל-PO (ME21N) או שזה קורה אוטומטית. ה-PO נשלח, הסחורה מתקבלת ב-MIGO (101), והחשבונית מאומתת ב-MIRO מול ה-PO וה-GR.",
          cbcHe:
            "ב-CBC הזמנות-אריזה שבועיות הן רכש תפעולי טהור: PR נוצר מ-MRP, Auto-PO מפיק PO כנגד חוזה-המסגרת, GR בקבלה לקו-המילוי, ו-ERS מסלק חשבונית ללא חשבונית-נייר מהספק.",
          navHe: [
            "Materials Management ► Purchasing ► Purchase Order ► Define Document Types",
            "SPRO ► IMG ► Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Configure How Unplanned Delivery Costs Are Posted",
            "SPRO ► IMG ► Materials Management ► Purchasing ► Purchase Requisition ► Define Document Types",
          ],
          tables: ["EBAN", "EKKO", "EKPO", "EKET", "MSEG", "RSEG"],
          tcodes: ["ME51N", "ME21N", "ME59N", "MIGO", "MIRO", "ME2N"],
          fiori: ["F0842 (Manage Purchase Requisitions)", "F0843 (Manage Purchase Orders)", "F0718 (Create Supplier Invoice)"],
          configHe: [
            "PO/PR document types + טווחי-מספרים + Field Selection.",
            "Auto-PO: סימון 'Automatic PO' באב-החומר וב-Info Record ➔ ME59N.",
            "Tolerance keys לאימות-חשבונית (3-Way Match) ב-Logistics Invoice Verification.",
            "ERS (Evaluated Receipt Settlement) על Info Record לסילוק ללא חשבונית-נייר.",
          ],
          flow: [
            { he: "דרישת-רכש (PR)", code: "ME51N", note: "EBAN — מ-MRP או ידני" },
            { he: "הזמנת-רכש (PO)", code: "ME21N/ME59N", note: "EKKO/EKPO" },
            { he: "קבלת-טובין (GR)", code: "MIGO", note: "תנועה 101 — MSEG/MKPF" },
            { he: "אימות-חשבונית (IR)", code: "MIRO", note: "3-Way Match — RBKP/RSEG" },
            { he: "תשלום ל-AP", code: "F110", note: "סליקה כספית" },
          ],
          masterDataHe: [
            "Info Record (EINA/EINE) = מחיר וספק שמהם ה-PO נטען אוטומטית.",
            "אב-חומר (MARA/MARC) — תצוגות Purchasing ו-MRP מזינות PR/PO.",
            "Business Partner (ספק) + Purchasing Org data (LFM1).",
          ],
          mistakesHe: [
            "PO ללא Info Record ➔ הזנת-מחיר ידנית, סיכון לטעויות-תמחור.",
            "אימות-חשבונית ללא Tolerance keys מוגדרים ➔ חסימות-תשלום מיותרות או מעבר חופשי.",
            "GR ללא תנועת-101 נכונה ➔ מלאי/התחייבות לא משתקפים.",
          ],
          troubleshootHe: [
            "חשבונית חסומה לתשלום ➔ חריגת-Tolerance או GR חסר (3-Way Match נכשל).",
            "ME59N לא יוצר PO אוטומטי ➔ סימון Auto-PO חסר ב-Info Record/אב-חומר, או אין מקור.",
            "GR לא מעדכן התחייבות ➔ Account Assignment/Movement Type שגוי.",
          ],
          bestPracticeHe: [
            "הפעל Auto-PO ו-ERS לקטגוריות חוזרות ויציבות לצמצום עבודה-ידנית.",
            "הגדר Tolerance keys מדודים לאיזון בין בקרה לזרימה.",
            "השען על Source Determination כדי שהמחיר/ספק יגיעו מהמקור המאושר.",
          ],
          interviewHe: [
            { qHe: "מהו 3-Way Match?", aHe: "אימות חשבונית כנגד שלושה: ה-PO (כמות/מחיר מוסכם), ה-GR (כמות שהתקבלה) וה-Invoice. סטיות מעבר ל-Tolerance חוסמות תשלום." },
            { qHe: "אילו טבלאות נוגעות במחזור P2P התפעולי?", aHe: "EBAN (PR), EKKO/EKPO/EKET (PO + לוחות-זמנים), MSEG/MKPF (GR), RBKP/RSEG (חשבונית)." },
          ],
          takeawaysHe: [
            "רכש תפעולי = PR ➔ PO ➔ GR ➔ IR בהיקף גבוה.",
            "3-Way Match מבטיח תשלום נכון (PO↔GR↔Invoice).",
            "Auto-PO ו-ERS מאיצים קטגוריות חוזרות.",
          ],
          relatedHe: [
            { labelHe: "MM · רכש (1.3.3)", href: "/library/mm-academy/chapter-01/#sub-1.3.3" },
            { labelHe: "MM · חשבונאות-ספקים וחשבוניות (1.3.4)", href: "/library/mm-academy/chapter-01/#sub-1.3.4" },
          ],
        },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2",
      titleHe: "רכש ואספקה מקצה לקצה",
      titleEn: "Sourcing and Procurement from End to End",
      execHe:
        "רכש מקצה-לקצה מסתכל על כל המחזור כתהליך אחד רציף — מזיהוי-צורך ועד תשלום — ולא כאוסף שלבים מנותקים. שתי המסגרות המרכזיות הן Source-to-Pay (S2P, כולל הסורסינג האסטרטגי) ו-Procure-to-Pay (P2P, התפעולי). ראייה מקצה-לקצה חושפת חיכוכים, מאיצה אוטומציה ומשפרת ציות וניראות.",
      beginnerHe:
        "במקום להסתכל על כל שלב לבד, מסתכלים על כל הסיפור: מזהים שצריך משהו ➔ מוצאים ספק ➔ מזמינים ➔ מקבלים ➔ משלמים. כשרואים את כל השרשרת יחד, קל לראות איפה נתקעים ואיפה אפשר לחסוך זמן.",
      consultantHe:
        "End-to-End ב-S/4HANA מיושם דרך תהליכים מובנים: P2P (PR➔PO➔GR➔IR) ו-S2P (Sourcing+Contract➔P2P). ה-Embedded Analytics (CDS Views כגון C_PurchaseOrderItemDEX) וה-Procurement Overview Page נותנים ניראות חוצת-שלבים. Situation Handling ו-Intelligent Approval מאיצים את הזרימה. אינטגרציה עם Ariba (S2P) ועם MM-FI (P2P) סוגרת את הלולאה הכספית.",
      purposeHe:
        "לראות ולנהל את הרכש כשרשרת-ערך אחת: לקצר זמני-מחזור, להפחית עלות-עיבוד, לאכוף ציות-לחוזה ולשפר את ניראות ההוצאה — במקום אופטימיזציה מקומית של שלב בודד.",
      processExampleHe:
        "צורך מזוהה ➔ סורסינג בוחר ספק וחותם חוזה (S2P) ➔ PR נוצר ➔ Source Determination שולפת את החוזה ➔ PO מופק ➔ GR ➔ IR ➔ תשלום. דוח Overview מציג את כל הצנרת בזמן-אמת ומתריע על פריטים תקועים.",
      cbcHe:
        "ב-CBC השרשרת מקצה-לקצה: MRP מזהה צורך-אריזה ➔ חוזה-מסגרת (S2P, נחתם פעם בשנה) ➔ PR➔PO שבועי ➔ GR בקו-המילוי ➔ ERS/MIRO ➔ תשלום. Ariba מכסה את צד-ה-S2P; S/4HANA Core את ה-P2P.",
      navHe: [
        "SPRO ► IMG ► Materials Management ► Purchasing ► Define Default Values for Buyers",
        "Materials Management ► Purchasing ► Environment Data ► Current Settings",
        "SAP Fiori Launchpad ► Procurement Overview Page",
      ],
      tables: ["EBAN", "EKKO", "EKPO", "EKBE", "RBKP"],
      tcodes: ["ME21N", "MIGO", "MIRO", "ME2N", "ME80FN"],
      fiori: ["F2358 (Procurement Overview Page)", "F0842 (Manage Purchase Requisitions)", "F0843 (Manage Purchase Orders)"],
      configHe: [
        "הגדרת תהליכי P2P/S2P כתבנית-עבודה (Buyer default values, document types).",
        "הפעלת Embedded Analytics + Procurement Overview Page לניראות חוצת-שלבים.",
        "Situation Handling templates להתראות על PR/PO/חשבונית תקועים.",
        "אינטגרציית Ariba Network (cXML) לצד-ה-Sourcing וה-Invoicing.",
      ],
      flow: [
        { he: "זיהוי צורך", code: "MRP/ME51N", note: "PR — EBAN" },
        { he: "סורסינג + חוזה (S2P)", code: "ME31K/Ariba", note: "בחירת מקור" },
        { he: "הזמנה (PO)", code: "ME21N", note: "EKKO/EKPO" },
        { he: "קבלה (GR)", code: "MIGO", note: "EKBE — היסטוריית-PO" },
        { he: "חשבונית (IR)", code: "MIRO", note: "RBKP/RSEG" },
        { he: "תשלום + ניתוח", code: "F110/F2358", note: "סגירת הלולאה" },
      ],
      masterDataHe: [
        "EKBE = היסטוריית-PO (GR/IR per item) — עמוד-השדרה לניראות מקצה-לקצה.",
        "Info Record + Source List + Contract = שלד-המקור החוצה את כל המחזור.",
      ],
      mistakesHe: [
        "אופטימיזציה של שלב בודד (למשל PO) בלי לראות את החיכוך במורד (GR/IR).",
        "היעדר ניראות חוצת-שלבים — פריטים תקועים מתגלים מאוחר מדי.",
        "ניתוק בין S2P (Ariba) ל-P2P (Core) ➔ חוזים שלא נאכפים בהזמנות.",
      ],
      troubleshootHe: [
        "פריט 'נעלם' באמצע המחזור ➔ בדוק EKBE (היסטוריית-PO) לאיתור השלב התקוע.",
        "חוזה לא נאכף בהזמנות ➔ אינטגרציית S2P↔P2P/Source List לא מקושרת.",
        "Overview Page ריק ➔ Embedded Analytics/הרשאות-CDS לא הופעלו.",
      ],
      bestPracticeHe: [
        "נהל את הרכש כתהליך End-to-End אחד, עם KPI חוצי-שלבים (Cycle time, On-time, Compliance).",
        "השען על Procurement Overview Page ו-Situation Handling לניהול-לפי-חריגים.",
        "סגור את הלולאה S2P↔P2P כדי שכל הזמנה תכבד את החוזה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין S2P ל-P2P?", aHe: "P2P (Procure-to-Pay) = הביצוע התפעולי (PR➔PO➔GR➔IR). S2P (Source-to-Pay) רחב יותר — מוסיף את הסורסינג האסטרטגי וניהול-החוזים שלפני ה-P2P. S2P מכיל את P2P." },
        { qHe: "כיצד מקבלים ניראות מקצה-לקצה ב-S/4HANA?", aHe: "דרך EKBE (היסטוריית-PO), Embedded Analytics (CDS Views) ו-Procurement Overview Page, בתוספת Situation Handling להתראות." },
      ],
      takeawaysHe: [
        "רכש מקצה-לקצה = שרשרת אחת מזיהוי-צורך ועד תשלום.",
        "S2P מכיל את P2P (סורסינג אסטרטגי + ביצוע תפעולי).",
        "ניראות (EKBE, Overview Page) היא המפתח לניהול-לפי-חריגים.",
      ],
      relatedHe: [
        { labelHe: "MM · רכש עם S/4HANA (1.3)", href: "/library/mm-academy/chapter-01/#sub-1.3" },
      ],
      children: [
        {
          id: "1.2.1",
          titleHe: "רכש אידיאלי (Ideal Procurement)",
          titleEn: "Ideal Procurement",
          execHe:
            "רכש אידיאלי הוא חזון מצב-היעד: תהליך נטול-נגיעות (Touchless) שבו רוב ההזמנות זורמות אוטומטית מצורך ועד תשלום, שיקול-הדעת האנושי מוקדש רק לחריגים ולאסטרטגיה, וכל החלטה נסמכת על נתונים בזמן-אמת. הוא משמש כקנה-מידה למדידת בגרות-הרכש.",
          beginnerHe:
            "ה'רכש האידיאלי' הוא המצב המושלם שאליו שואפים: הזמנות שגרתיות מטופלות לבד (בלי אדם), אנשים עוסקים רק במה שחשוב ומורכב, והכל שקוף ומבוסס-נתונים. אף ארגון לא שם ב-100%, אבל זה הכיוון.",
          consultantHe:
            "המימוש נשען על: Self-Service Procurement (קטלוגים), Auto-PO/ERS, Intelligent Approval (Workflow + ML), Situation Handling, ו-Predictive Analytics. ב-S/4HANA + Ariba השאיפה ל-No-Touch Order עבור קטגוריות יציבות. מדדי-בגרות: % הזמנות אוטומטיות, Cycle time, Maverick spend, On-time delivery.",
          purposeHe:
            "להגדיר יעד ברור ולמדוד התקדמות מולו: כל פער מהאידיאל (התערבות-ידנית, חריגה-מחוזה, עיכוב) הוא הזדמנות-שיפור מדידה.",
          processExampleHe:
            "משתמש בוחר פריט מקטלוג ➔ PR נוצר ➔ אישור אוטומטי (בתוך מדיניות) ➔ Auto-PO ➔ GR ➔ ERS ➔ תשלום, ללא נגיעת-רכש אחת. רק חריג (חוסר-מקור/חריגת-מחיר) מנותב לאדם.",
          cbcHe:
            "ב-CBC הזמנות-אריזה החוזרות שואפות ל-Touchless: MRP➔Auto-PO כנגד חוזה➔GR➔ERS. רק שינוי-מחיר חריג או ספק-חדש מצריך התערבות-קניין.",
          navHe: [
            "SAP Fiori Launchpad ► Self-Service Procurement",
            "SPRO ► IMG ► Materials Management ► Purchasing ► Purchase Order ► Automatic Generation of POs",
            "SPRO ► Cross-Application Components ► Situation Handling",
          ],
          tables: ["EBAN", "EKKO", "EKPO", "EKBE"],
          tcodes: ["ME59N", "ME21N", "MIRO", "MRRL"],
          fiori: ["F2358 (Procurement Overview Page)", "F1048 (My Inbox – Approvals)"],
          configHe: [
            "Catalog / Self-Service Procurement להזמנה-עצמית.",
            "Auto-PO (ME59N) + ERS (MRRL) לקטגוריות יציבות.",
            "Flexible Workflow + Intelligent Approval (כללי-אישור אוטומטיים).",
            "Situation Handling לניתוב חריגים בלבד לאדם.",
          ],
          flow: [
            { he: "צורך מקטלוג", code: "Self-Service", note: "PR אוטומטי" },
            { he: "אישור אוטומטי", code: "Flexible WF", note: "במסגרת מדיניות" },
            { he: "Auto-PO", code: "ME59N", note: "ללא נגיעה" },
            { he: "GR + ERS", code: "MIGO/MRRL", note: "סילוק אוטומטי" },
            { he: "חריגים בלבד לאדם", code: "Situation", note: "ניהול-לפי-חריגים" },
          ],
          mistakesHe: [
            "שאיפה ל-100% אוטומציה גם בקטגוריות לא-יציבות — מייצר שגיאות במקום חיסכון.",
            "אוטומציה ללא בקרת-חריגים ➔ טעויות זורמות בלי שנעצרות.",
            "מדידת-בגרות בלי KPI ברורים (Cycle time, Maverick spend).",
          ],
          troubleshootHe: [
            "יותר מדי התערבות-ידנית ➔ זיהוי הקטגוריות שאינן ב-Auto-PO/ERS והרחבתן.",
            "חריגים זורמים בלי בקרה ➔ Situation Handling/Tolerance לא הוגדרו.",
            "אישורים תקועים ➔ Flexible Workflow לא מכוון או חסר תחליפים.",
          ],
          bestPracticeHe: [
            "התחל אוטומציה בקטגוריות היציבות ביותר והרחב בהדרגה.",
            "מדוד מול האידיאל עם KPI: % Touchless, Cycle time, Maverick spend.",
            "השאר את האדם לחריגים ולאסטרטגיה בלבד.",
          ],
          interviewHe: [
            { qHe: "מהו 'Touchless Procurement'?", aHe: "תהליך רכש שזורם אוטומטית מצורך ועד תשלום ללא התערבות-ידנית; האדם נכנס רק לחריגים ולסורסינג אסטרטגי." },
            { qHe: "אילו יכולות S/4HANA מקרבות לרכש האידיאלי?", aHe: "Self-Service Procurement, Auto-PO, ERS, Flexible/Intelligent Approval, Situation Handling ו-Embedded Analytics." },
          ],
          takeawaysHe: [
            "רכש אידיאלי = Touchless + שיקול-דעת לחריגים בלבד.",
            "ממומש דרך Auto-PO, ERS, Workflow חכם ו-Situation Handling.",
            "משמש קנה-מידה למדידת-בגרות הרכש.",
          ],
        },
        {
          id: "1.2.2",
          titleHe: "Source-to-Pay ו-Procure-to-Pay",
          titleEn: "Source-to-Pay and Procure-to-Pay",
          execHe:
            "P2P (Procure-to-Pay) הוא המחזור התפעולי: דרישה ➔ הזמנה ➔ קבלה ➔ חשבונית ➔ תשלום. S2P (Source-to-Pay) רחב יותר ומוסיף לפניו את הסורסינג האסטרטגי וניהול-החוזים. P2P מתרכז ב'ביצוע'; S2P מוסיף את 'הבחירה'. שתי המסגרות יחד מתארות את מלוא מחזור-הרכש.",
          beginnerHe:
            "P2P = מההזמנה עד התשלום (החלק התפעולי). S2P = מבחירת-הספק עד התשלום (מתחיל מוקדם יותר, כולל את הסורסינג). פשוט: S2P גדול יותר ומכיל בתוכו את P2P.",
          consultantHe:
            "P2P ב-Core: EBAN➔EKKO/EKPO➔MSEG➔RBKP/RSEG. S2P מוסיף Sourcing, RFQ, Contracts ו-Supplier Management — לרוב ב-SAP Ariba — המתממשקים חזרה לאובייקטי-מקור (Contract➔Source List➔PO). ההבחנה חשובה לתכנון-נוף-מערכת: P2P לרוב ב-S/4HANA, S2P-האסטרטגי ב-Ariba, עם אינטגרציה דו-כיוונית (cXML/Ariba Network).",
          purposeHe:
            "לתת שפה אחידה למחזור-הרכש ולחלוקת-תחומים בין מערכות וצוותים: מה תפעולי (P2P) ומה אסטרטגי (S2P), ואיפה עוברת התפר-האינטגרטיבי.",
          processExampleHe:
            "S2P: סורסינג בוחר ספק ➔ חוזה נחתם ➔ (כאן מתחיל P2P) PR ➔ PO כנגד החוזה ➔ GR ➔ IR ➔ תשלום. החוזה מ-S2P הוא ה'גשר' שמזין את ה-P2P.",
          cbcHe:
            "ב-CBC: S2P מנהל את חוזי-האריזה והסוכר ב-Ariba; P2P מבצע את ההזמנות השבועיות ב-S/4HANA כנגד אותם חוזים. התרכיז = P2P בלבד מול חוזה Single-Source קיים.",
          navHe: [
            "SAP Ariba ► Sourcing / Contracts (S2P)",
            "Materials Management ► Purchasing ► Outline Agreement ► Contract ► Define Document Types",
            "SPRO ► IMG ► Integration with Other SAP Components ► SAP Ariba",
          ],
          tables: ["EKKO", "EKPO", "EBAN", "EINA", "EINE"],
          tcodes: ["ME31K", "ME21N", "MIGO", "MIRO", "ME51N"],
          fiori: ["F1985 (Manage Purchase Contracts)", "F0842 (Manage Purchase Requisitions)", "F0843 (Manage Purchase Orders)"],
          configHe: [
            "Contract document types (K) כגשר S2P➔P2P.",
            "Ariba Network integration (cXML, Cloud Integration Gateway) לצד-ה-S2P.",
            "Source List / Quota Arrangement כדי ש-P2P יכבד את חוזה-ה-S2P.",
          ],
          flow: [
            { he: "סורסינג (S2P)", code: "Ariba/ME41", note: "בחירת ספק" },
            { he: "חוזה (S2P)", code: "ME31K", note: "EKKO/EKPO סוג K" },
            { he: "דרישה (P2P)", code: "ME51N", note: "EBAN" },
            { he: "הזמנה כנגד חוזה (P2P)", code: "ME21N", note: "Release Order" },
            { he: "GR ➔ IR ➔ תשלום (P2P)", code: "MIGO/MIRO/F110", note: "סגירה כספית" },
          ],
          masterDataHe: [
            "Contract (EKKO/EKPO סוג K) = תוצר-S2P שמזין את P2P.",
            "Info Record / Source List = מקשרים את החוזה האסטרטגי להזמנה התפעולית.",
          ],
          mistakesHe: [
            "בלבול בין S2P ל-P2P בתכנון-נוף-מערכת ➔ תחומים נופלים בין הכיסאות.",
            "חוזה S2P ללא קישור Source List ➔ P2P לא אוכף אותו (Maverick spend).",
            "אינטגרציית Ariba חלקית ➔ חוזים ב-Ariba שלא משתקפים ב-Core.",
          ],
          troubleshootHe: [
            "PO לא נוצר כ-Release Order מול החוזה ➔ Source List/Quota לא מצביעים על החוזה.",
            "חוזה Ariba לא מופיע ב-S/4HANA ➔ תקלת-אינטגרציה (cXML/CIG).",
            "Maverick spend גבוה ➔ Source List requirement לא מאכוף את חוזה-ה-S2P.",
          ],
          bestPracticeHe: [
            "מפה את התפר S2P↔P2P במפורש בתכנון-הנוף.",
            "ודא שכל חוזה-S2P מקושר ל-Source List לאכיפה ב-P2P.",
            "מדוד Contract Compliance כדי לאמוד את אפקטיביות הגשר S2P➔P2P.",
          ],
          interviewHe: [
            { qHe: "P2P הוא תת-קבוצה של S2P או להפך?", aHe: "P2P הוא תת-קבוצה של S2P. S2P מתחיל מוקדם יותר (סורסינג + חוזים) ומכיל בתוכו את P2P התפעולי." },
            { qHe: "מהו ה'גשר' בין S2P ל-P2P?", aHe: "חוזה-המסגרת (Outline Agreement) המקושר ל-Source List — תוצר-ה-S2P שמזין אוטומטית את ה-PO-ים התפעוליים." },
          ],
          takeawaysHe: [
            "P2P = ביצוע תפעולי (דרישה➔תשלום).",
            "S2P = P2P + סורסינג אסטרטגי וחוזים.",
            "החוזה+Source List הם הגשר בין השניים.",
          ],
          relatedHe: [
            { labelHe: "MM · רכש תפעולי (1.1.2)", href: "/library/mm-academy/chapter-01/#sub-1.1.2" },
          ],
        },
        {
          id: "1.2.3",
          titleHe: "תחומי תהליך מרכזיים",
          titleEn: "Key Process Areas",
          execHe:
            "מחזור-הרכש מתחלק לתחומי-תהליך מרכזיים: סורסינג אסטרטגי, רכש תפעולי, ניהול-מלאי/קבלות, אימות-חשבוניות וחשבונאות-ספקים, וניהול-ספקים. כל תחום הוא יחידת-אחריות עם נתוני-אב, T-Codes ומדדים משלו. הבנת התחומים והגבולות ביניהם היא הבסיס לעיצוב-ארגון ולחלוקת-עבודה.",
          beginnerHe:
            "אפשר לחלק את הרכש לכמה 'מגרשים': מי בוחר ספקים, מי מזמין, מי מקבל סחורה, מי מטפל בחשבוניות ותשלום, ומי מנהל את היחסים עם הספקים. כל מגרש הוא תחום עם תפקידים ומשימות משלו.",
          consultantHe:
            "התחומים ממופים למודולי-משנה: Strategic Sourcing (RFQ/Contract/Evaluation), Operational Procurement (PR/PO), Inventory Management (MM-IM: MIGO/MB*), Invoice Verification (MM-LIV: MIRO) ו-Accounts Payable (FI-AP). כל תחום נשען על אובייקטים: EINA/EINE/EORD (מקור), EKKO/EKPO (הזמנה), MSEG/MKPF (תנועות), RBKP/RSEG (חשבונית). תכנון נכון של גבולות-התחומים משפיע על הרשאות, על Fiori roles ועל KPI.",
          purposeHe:
            "לחלק את הרכש למבני-אחריות ברורים — לתכנון-תהליך, להגדרת-תפקידים, להרשאות ול-KPI — ולמנוע 'אזורים אפורים' שבהם משימות נופלות בין הכיסאות.",
          processExampleHe:
            "PR נוצר (תפעולי) ➔ Source Determination מסתמכת על הסורסינג (אסטרטגי) ➔ PO (תפעולי) ➔ GR (ניהול-מלאי) ➔ IR (אימות-חשבונית) ➔ תשלום (חשבונאות-ספקים). כל חץ הוא מעבר בין תחומי-אחריות.",
          cbcHe:
            "ב-CBC: צוות-סורסינג מנהל חוזי-תרכיז/סוכר ב-Ariba; קנייני-תפעול מוציאים PO-ים; מחסן קו-המילוי מבצע GR; AP מטפל בחשבוניות ובתשלום — חמישה תחומים, גבולות-הרשאה ברורים.",
          navHe: [
            "SPRO ► IMG ► Materials Management ► Purchasing (Operational + Sourcing)",
            "SPRO ► IMG ► Materials Management ► Inventory Management and Physical Inventory",
            "SPRO ► IMG ► Materials Management ► Logistics Invoice Verification",
          ],
          tables: ["EINA", "EKKO", "EKPO", "MSEG", "RBKP"],
          tcodes: ["ME31K", "ME21N", "MIGO", "MIRO", "FK10N"],
          fiori: ["F1990 (Manage Sources of Supply)", "F0843 (Manage Purchase Orders)", "F0718 (Create Supplier Invoice)"],
          configHe: [
            "מיפוי תחומי-תהליך לתפקידי-עבודה ול-Fiori Business Roles.",
            "הגדרת אובייקטי-הרשאה (M_BEST_*, M_MSEG_*) לפי גבולות-תחום.",
            "KPI לכל תחום: Sourcing savings, PO cycle time, GR accuracy, Invoice exceptions.",
          ],
          flow: [
            { he: "סורסינג אסטרטגי", code: "ME31K", note: "ספק + חוזה" },
            { he: "רכש תפעולי", code: "ME21N", note: "PR/PO" },
            { he: "ניהול-מלאי/קבלה", code: "MIGO", note: "MM-IM" },
            { he: "אימות-חשבונית", code: "MIRO", note: "MM-LIV" },
            { he: "חשבונאות-ספקים", code: "FK10N/F110", note: "FI-AP" },
          ],
          masterDataHe: [
            "כל תחום שולט באובייקט-אב משלו: מקור (EINA/EORD), הזמנה (EKKO), תנועה (MSEG), חשבונית (RBKP).",
            "Business Partner (ספק) חוצה את כל התחומים — נתון-אב משותף.",
          ],
          mistakesHe: [
            "גבולות-תחום מטושטשים ➔ הרשאות-יתר ומשימות שנופלות בין הכיסאות.",
            "הפרדת-תפקידים (SoD) לקויה בין הזמנה, קבלה ואישור-תשלום ➔ סיכון-הונאה.",
            "KPI לתחום אחד בלי ראייה חוצת-תחומים ➔ אופטימיזציה מקומית.",
          ],
          troubleshootHe: [
            "משימה 'בלי בעלים' ➔ תחום-תהליך לא הוגדר/לא מופה לתפקיד.",
            "הרשאה חוסמת פעולה לגיטימית ➔ מיפוי אובייקטי-הרשאה לתחום שגוי.",
            "כשל-בקרה ב-SoD ➔ אותו משתמש מבצע הזמנה+קבלה+אישור-תשלום.",
          ],
          bestPracticeHe: [
            "הגדר גבולות-תחום ברורים והקפד על הפרדת-תפקידים (SoD).",
            "מפה כל תחום ל-Fiori Business Role תואמת.",
            "נהל KPI לכל תחום בנוסף ל-KPI חוצי-תהליך (End-to-End).",
          ],
          interviewHe: [
            { qHe: "מהם תחומי-התהליך המרכזיים ברכש?", aHe: "סורסינג אסטרטגי, רכש תפעולי, ניהול-מלאי/קבלות, אימות-חשבוניות וחשבונאות-ספקים, וניהול-ספקים — כל אחד עם נתוני-אב, T-Codes ומדדים משלו." },
            { qHe: "מדוע הפרדת-תפקידים (SoD) קריטית ברכש?", aHe: "כדי שאותו אדם לא יבצע הזמנה+קבלה+אישור-תשלום — שילוב המאפשר הונאה. גבולות-תחום ברורים אוכפים זאת דרך הרשאות." },
          ],
          takeawaysHe: [
            "הרכש מתחלק לתחומי-תהליך עם אחריות ונתוני-אב נפרדים.",
            "כל תחום ➔ Fiori Role + אובייקטי-הרשאה משלו.",
            "הפרדת-תפקידים (SoD) מונעת סיכון-הונאה בין התחומים.",
          ],
        },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3",
      titleHe: "רכש עם SAP S/4HANA",
      titleEn: "Procurement with SAP S/4HANA",
      execHe:
        "SAP S/4HANA הוא ה-Digital Core המודרני של הרכש: מסד-נתונים בזיכרון (HANA), מודל-נתונים מפושט (טבלת MATDOC אחת לתנועות-מלאי), Business Partner לספקים, Embedded Analytics בזמן-אמת וחוויית Fiori. הוא מאחד תפעול ואנליטיקה במערכת אחת, ומתממשק ל-Ariba לסורסינג בענן.",
      beginnerHe:
        "S/4HANA היא הגרסה החדשה של SAP. היא מהירה יותר (הכל בזיכרון), פשוטה יותר (פחות טבלאות), ויפה יותר (מסכי Fiori במקום מסכי-SAP הישנים). ברכש זה אומר עבודה מהירה, דוחות בזמן-אמת, וחיבור לענן (Ariba).",
      consultantHe:
        "שינויי-ליבה ברכש: (1) ניהול-מלאי על MATDOC (במקום MKPF/MSEG, אם כי תאימות-תצוגה נשמרה); (2) Supplier = Business Partner חובה (טרנזקציות XK*/MK* הוחלפו ב-BP); (3) Material number עד 40 תווים; (4) Embedded Analytics דרך CDS Views (I_PurchaseOrder, C_PurchaseOrderItemDEX); (5) Fiori-first. Simplification List מתעדת אובייקטים שהוצאו/השתנו. ME21N/ME51N/MIGO/MIRO נשמרו אך מומלץ לעבור ל-Fiori.",
      purposeHe:
        "לספק פלטפורמת-רכש אחת המשלבת ביצוע, אנליטיקה ואינטליגנציה בזמן-אמת — להאיץ החלטות, להוריד עלות-בעלות-כוללת (TCO) ולאפשר תהליכים אינטליגנטיים (ML/Situation Handling).",
      processExampleHe:
        "קניין פותח את Procurement Overview Page (Fiori), רואה PR-ים פתוחים וחריגי-אספקה בזמן-אמת, ממיר PR ל-PO בכמה קליקים, וה-Embedded Analytics מציג מיד את השפעת-ההוצאה — הכל במערכת אחת ללא Data Warehouse נפרד.",
      cbcHe:
        "ב-CBC המעבר ל-S/4HANA איחד את הרכש: ניהול-מלאי קו-המילוי על MATDOC, ספקי-התרכיז/סוכר כ-Business Partners, ודוחות-הוצאה בזמן-אמת. הסורסינג של אריזה רץ ב-Ariba המקושר ל-Core.",
      navHe: [
        "SAP Fiori Launchpad ► Procurement (Business Roles)",
        "SPRO ► IMG ► Materials Management ► (S/4HANA simplified config)",
        "SPRO ► IMG ► Cross-Application Components ► SAP Business Partner",
      ],
      tables: ["MATDOC", "EKKO", "EKPO", "EBAN", "BUT000"],
      tcodes: ["ME21N", "ME51N", "MIGO", "MIRO", "BP"],
      fiori: ["F2358 (Procurement Overview Page)", "F0843 (Manage Purchase Orders)", "F1990 (Manage Sources of Supply)"],
      configHe: [
        "Business Partner חובה לספקים (CVI — Customer-Vendor Integration).",
        "ניהול-מלאי על MATDOC; תצוגות-תאימות MKPF/MSEG נשמרות לקריאה.",
        "Embedded Analytics + CDS Views; Fiori Launchpad כממשק-ראשי.",
        "Simplification List items: בדיקת אובייקטים שהוצאו/שונו לפני מעבר.",
      ],
      flow: [
        { he: "Digital Core (HANA)", code: "MATDOC", note: "מודל-נתונים מפושט" },
        { he: "ספק = Business Partner", code: "BP", note: "CVI" },
        { he: "ביצוע רכש (Fiori)", code: "ME21N/F0843", note: "PR➔PO" },
        { he: "Embedded Analytics", code: "CDS Views", note: "בזמן-אמת" },
        { he: "אינטגרציית Ariba", code: "CIG", note: "סורסינג בענן" },
      ],
      masterDataHe: [
        "Business Partner (BUT000) = ספק; LFA1/LFB1/LFM1 מאחורי-הקלעים דרך CVI.",
        "MATDOC = מסמך-חומר מאוחד לכל תנועות-המלאי.",
        "אב-חומר עד 40 תווים; אובייקטי-מקור (EINA/EINE/EORD) נשמרו.",
      ],
      mistakesHe: [
        "ניסיון להשתמש ב-XK01/MK01 ליצירת-ספק ב-S/4HANA — הוחלפו ב-BP.",
        "כתיבת-קוד מותאם ישירות מול MKPF/MSEG במקום מול CDS/MATDOC.",
        "התעלמות מ-Simplification List לפני מעבר ➔ הפתעות ב-Custom code.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור ספק ➔ השתמש ב-BP (CVI), לא ב-XK*/MK*.",
        "Custom report ריק אחרי-מעבר ➔ קריאה ישירה מ-MKPF/MSEG; נדרש מעבר ל-MATDOC/CDS.",
        "Material number נחתך ➔ הרחבת-שדה ל-40 תווים לא טופלה ב-Custom code.",
      ],
      bestPracticeHe: [
        "ודא Customer-Vendor Integration (CVI) תקין לכל הספקים לפני go-live.",
        "פתח דוחות מול CDS Views, לא מול טבלאות-בסיס.",
        "סקור את Simplification List ואת ה-Custom code לפני המעבר.",
      ],
      interviewHe: [
        { qHe: "מהו השינוי המרכזי בניהול-מלאי ב-S/4HANA?", aHe: "כל תנועות-המלאי נשמרות ב-MATDOC אחת (במקום MKPF/MSEG), עם תצוגות-תאימות לקריאה — מודל-נתונים מפושט ומהיר." },
        { qHe: "כיצד מנוהל ספק ב-S/4HANA לעומת ECC?", aHe: "ב-S/4HANA ספק = Business Partner (BP) חובה דרך CVI; ב-ECC השתמשו ב-XK01/MK01 הישירים שאינם נתמכים יותר." },
      ],
      takeawaysHe: [
        "S/4HANA = Digital Core: HANA, MATDOC, BP, Embedded Analytics, Fiori.",
        "ספק = Business Partner חובה (CVI).",
        "אנליטיקה בזמן-אמת דרך CDS Views, במערכת אחת.",
      ],
      relatedHe: [
        { labelHe: "MM · תפקידי ויישומי Fiori (1.3.5)", href: "/library/mm-academy/chapter-01/#sub-1.3.5" },
      ],
      children: [
        {
          id: "1.3.1",
          titleHe: "ענן רב-דייר מול סביבה חד-דייר",
          titleEn: "Multitenant Cloud vs Single-Tenant Environment",
          execHe:
            "S/4HANA מוצע בכמה תצורות-פריסה: Public Cloud (Multitenant — דיירים רבים על מערכת משותפת, עדכון רבעוני, התאמה מוגבלת), Private Cloud (Single-Tenant — מערכת ייעודית, גמישות-התאמה גבוהה) ו-On-Premise. הבחירה משפיעה על קצב-עדכונים, על היקף-ההתאמות ועל מודל-העלות.",
          beginnerHe:
            "ענן רב-דייר = 'דירה בבניין משותף': זול, מתוחזק, אבל פחות חופש לשנות. חד-דייר = 'בית פרטי': יותר גמישות והתאמה, אבל יותר אחריות. הארגון בוחר לפי כמה התאמה הוא צריך מול כמה תחזוקה הוא רוצה לחסוך.",
          consultantHe:
            "Public Cloud (Multitenant): התאמות דרך Extensibility מאושרת (Key-User / Developer Extensibility), Best-Practice scope, עדכונים אוטומטיים — מתאים ל-Greenfield 'Fit-to-Standard'. Private Cloud / On-Premise (Single-Tenant): גישה מלאה ל-SPRO, Classic + In-App extensibility, שליטה בלוח-עדכונים — מתאים ל-Brownfield עם התאמות-עומק. הבחירה משליכה ישירות על אסטרטגיית-המימוש ועל ה-Custom code ברכש.",
          purposeHe:
            "להתאים את מודל-הפריסה לצרכי-העסק: רב-דייר ל-TCO נמוך וסטנדרטיזציה; חד-דייר לשליטה ולהתאמות. ההחלטה מעצבת את כל פרויקט-המימוש.",
          processExampleHe:
            "ארגון 'Fit-to-Standard' בוחר Public Cloud: מאמץ Best-Practice לרכש, מסתפק ב-Key-User extensibility, ומקבל עדכונים רבעוניים. ארגון עם תהליכי-רכש ייחודיים בוחר Private Cloud לשמירת ההתאמות.",
          cbcHe:
            "ב-CBC, בהיותו חלק מרשת-בקבוק גלובלית עם תהליכי-תרכיז ייחודיים ואינטגרציות (Zetes/Daymax בלוגיסטיקה), Private Cloud / Single-Tenant מתאים — שליטה בעדכונים והתאמות-עומק לצד אימוץ-סטנדרט בליבת-הרכש.",
          navHe: [
            "SAP Cloud ALM / Maintenance Planner (תכנון-פריסה)",
            "SPRO ► IMG (זמין מלא ב-Private/On-Premise; מוגבל ב-Public Cloud)",
            "Fiori ► Custom Fields and Logic / Extensibility Cockpit",
          ],
          tables: ["EKKO", "EKPO", "MATDOC"],
          tcodes: ["SPRO", "ME21N", "MIGO"],
          fiori: ["F1481 (Custom Fields)", "F2358 (Procurement Overview Page)"],
          configHe: [
            "Public Cloud: Best-Practice scope + Key-User/Developer Extensibility בלבד.",
            "Private/On-Premise: SPRO מלא + Classic extensibility + שליטה בעדכונים.",
            "אסטרטגיית-מימוש: Greenfield (Fit-to-Standard) מול Brownfield (התאמות).",
          ],
          flow: [
            { he: "אפיון צרכי-התאמה", note: "Fit-to-Standard?" },
            { he: "בחירת תצורה", code: "Public/Private", note: "Multi vs Single tenant" },
            { he: "מודל-Extensibility", code: "Key-User/Classic", note: "לפי תצורה" },
            { he: "אסטרטגיית-עדכון", note: "רבעוני אוטומטי / מבוקר" },
          ],
          mistakesHe: [
            "בחירת Public Cloud עם דרישות-התאמה עמוקות ➔ מבוי-סתום בהתאמות.",
            "בחירת On-Premise כשהארגון יכול 'Fit-to-Standard' ➔ TCO גבוה מיותר.",
            "התעלמות מקצב-העדכונים בתכנון-תפעול.",
          ],
          troubleshootHe: [
            "התאמה נדרשת אינה אפשרית ➔ Public Cloud מגביל; שקול Private/Extensibility מאושרת.",
            "עדכון 'שבר' התאמה ➔ Custom code לא תאם לאחר עדכון-Cloud אוטומטי.",
          ],
          bestPracticeHe: [
            "התחל מ-Fit-to-Standard; בחר חד-דייר רק כשההתאמות מצדיקות.",
            "תכנן את אסטרטגיית-העדכונים מראש (רבעוני אוטומטי מול מבוקר).",
            "השתמש ב-In-App/Side-by-Side extensibility במקום מודיפיקציות-ליבה.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Public ל-Private Cloud ב-S/4HANA?", aHe: "Public = Multitenant, Best-Practice, Extensibility מוגבלת, עדכון רבעוני אוטומטי (Fit-to-Standard). Private = Single-Tenant, SPRO מלא, התאמות-עומק ושליטה בלוח-העדכונים." },
            { qHe: "כיצד תצורת-הפריסה משפיעה על מימוש-רכש?", aHe: "היא קובעת את היקף-ההתאמות המותר, את מודל-ה-Extensibility ואת קצב-העדכונים — ולכן את אסטרטגיית-המימוש (Greenfield מול Brownfield)." },
          ],
          takeawaysHe: [
            "Public (רב-דייר) = TCO נמוך, Fit-to-Standard, התאמה מוגבלת.",
            "Private/On-Premise (חד-דייר) = גמישות-התאמה ושליטה בעדכונים.",
            "התצורה מעצבת את אסטרטגיית-המימוש כולה.",
          ],
        },
        {
          id: "1.3.2",
          titleHe: "סורסינג אסטרטגי",
          titleEn: "Strategic Sourcing",
          execHe:
            "סורסינג אסטרטגי ב-S/4HANA (ועם SAP Ariba) מנהל את הצד ה'בוחר' של הרכש: ניתוח-הוצאה, RFQ/מכרזים, ניהול-חוזים, הערכת-ספקים וניהול מחזור-חיי-ספק (SLP). מטרתו ערך ארוך-טווח — עלות, סיכון, חדשנות — ולא ביצוע יומיומי.",
          beginnerHe:
            "החלק האסטרטגי: לאן ההוצאה הולכת, מאיזה ספקים כדאי לקנות, באילו חוזים, ועד כמה הספקים טובים. כל ההחלטות הגדולות שמשפיעות על שנים — לא ההזמנה הבודדת.",
          consultantHe:
            "ב-Core: RFQ/Quotation (ME41-ME49), Contracts (ME31K), Source List/Quota. ב-Ariba: Strategic Sourcing (מכרזים מתקדמים), Contract Management, Supplier Lifecycle & Performance (SLP), Spend Analysis. אינטגרציה דו-כיוונית מחזירה חוזים/ספקים ל-Core כאובייקטי-מקור. ספק = Business Partner. מדדים: Realized savings, Contract compliance, Supplier risk.",
          purposeHe:
            "למקסם ערך-הוצאה ארוך-טווח: להוריד עלות-כוללת, להפחית סיכון-אספקה, להבטיח ציות-לחוזה ולנצל חדשנות-ספקים — לפני ובמקביל לרכש התפעולי.",
          processExampleHe:
            "ניתוח-הוצאה מזהה קטגוריה עתירת-הוצאה ➔ מכרז ב-Ariba ➔ בחירת ספק ➔ חוזה ➔ קישור ל-Source List ב-Core ➔ הערכת-ספק שוטפת (SLP). מאז, P2P מבצע מול החוזה.",
          cbcHe:
            "ב-CBC הסורסינג האסטרטגי מנהל את חוזי-הסוכר ארוכי-הטווח (מחירי-סחורה תנודתיים), מכרזי-אריזה ב-Ariba, והערכת ספקי-CO2. התרכיז = Single Source מחוזה גלובלי, ללא מכרז.",
          navHe: [
            "SAP Ariba ► Sourcing / Contracts / Supplier Management",
            "Materials Management ► Purchasing ► RFQ/Quotation",
            "Materials Management ► Purchasing ► Outline Agreement ► Contract",
          ],
          tables: ["EKKO", "EKPO", "EINA", "EINE", "EORD"],
          tcodes: ["ME41", "ME49", "ME31K", "ME11", "BP"],
          fiori: ["F1985 (Manage Purchase Contracts)", "F1990 (Manage Sources of Supply)", "F2425 (Manage RFQs)"],
          configHe: [
            "RFQ + Contract document types וטווחי-מספרים.",
            "Source List / Quota Arrangement לקישור תוצאת-הסורסינג ל-P2P.",
            "אינטגרציית Ariba Sourcing/Contracts/SLP (CIG).",
            "Supplier Evaluation criteria (Core) או SLP (Ariba).",
          ],
          flow: [
            { he: "ניתוח-הוצאה (Spend)", code: "Ariba/ME80FN", note: "זיהוי קטגוריה" },
            { he: "מכרז / RFQ", code: "ME41/Ariba", note: "השוואת-הצעות" },
            { he: "בחירה + חוזה", code: "ME31K", note: "עיגון תנאים" },
            { he: "קישור ל-Source List", code: "ME01", note: "אכיפה ב-P2P" },
            { he: "הערכת-ספק שוטפת", code: "SLP", note: "סיכון + ביצוע" },
          ],
          masterDataHe: [
            "Contract (EKKO/EKPO סוג K) + Source List (EORD) = תוצר-הסורסינג.",
            "Supplier = Business Partner עם נתוני-Purchasing Org.",
            "Info Record (EINA/EINE) = מחיר/ספק לכל חומר.",
          ],
          mistakesHe: [
            "סורסינג מבוסס-מחיר בלבד בלי סיכון/איכות/חדשנות.",
            "תוצאת-סורסינג שלא מקושרת ל-Source List ➔ אין אכיפה ב-P2P (Maverick spend).",
            "אי-ניהול מחזור-חיי-ספק ➔ סיכון-אספקה לא-מנוטר.",
          ],
          troubleshootHe: [
            "חוזה לא נאכף בהזמנות ➔ Source List/Quota לא מצביעים אליו.",
            "Maverick spend גבוה ➔ Source List requirement לא הופעל.",
            "ספק-סיכון לא זוהה בזמן ➔ SLP/הערכת-ספקים לא פעילה.",
          ],
          bestPracticeHe: [
            "נהל סורסינג רב-קריטריוני (עלות+סיכון+איכות+חדשנות).",
            "קשר כל חוזה ל-Source List לאכיפה ב-P2P.",
            "הפעל Supplier Lifecycle & Performance (SLP) לניטור-סיכון.",
          ],
          interviewHe: [
            { qHe: "מה כולל סורסינג אסטרטגי ב-S/4HANA/Ariba?", aHe: "ניתוח-הוצאה, RFQ/מכרזים, ניהול-חוזים, הערכת-ספקים וניהול מחזור-חיי-ספק (SLP) — כל הצד ה'בוחר' לפני הביצוע התפעולי." },
            { qHe: "כיצד נאכף תוצר-הסורסינג ב-P2P?", aHe: "החוזה מקושר ל-Source List (ו/או Quota Arrangement) עם Source List requirement, כך שה-PO נוצר כ-Release Order מולו אוטומטית." },
          ],
          takeawaysHe: [
            "סורסינג אסטרטגי = ניתוח-הוצאה, מכרזים, חוזים, הערכת-ספקים.",
            "ב-S/4HANA רובו ב-Ariba, מקושר חזרה ל-Core.",
            "Source List + Contract אוכפים אותו על ה-P2P.",
          ],
          relatedHe: [
            { labelHe: "MM · סורסינג (1.1.1)", href: "/library/mm-academy/chapter-01/#sub-1.1.1" },
          ],
        },
        {
          id: "1.3.3",
          titleHe: "רכש (Procurement)",
          titleEn: "Procurement",
          execHe:
            "רכש ב-S/4HANA הוא הביצוע התפעולי המודרני: יצירת PR/PO, ניהול-קבלות וניהול מחזור-ההזמנה — דרך Fiori, עם Self-Service Procurement, Auto-PO, אישורים-גמישים ו-Embedded Analytics. הוא ממיר את החלטות-הסורסינג לפעולות-קנייה בפועל.",
          beginnerHe:
            "החלק שמבצע בפועל: יוצרים דרישה, הופכים אותה להזמנה, שולחים לספק, ומקבלים סחורה — עכשיו עם מסכי-Fiori נוחים, קטלוגים להזמנה-עצמית, ואוטומציה להזמנות החוזרות.",
          consultantHe:
            "Operational Procurement ב-S/4HANA: Self-Service Procurement (Fiori catalogs), Manage PR/PO apps, Auto-PO (ME59N), Flexible Workflow לאישורים, ו-Situation Handling להתראות. נתונים: EBAN, EKKO/EKPO/EKET, EKBE (היסטוריה). Central Procurement (Hub) מאפשר ניהול-רכש חוצה-מערכות. ME21N/ME51N נשמרו אך Fiori-first.",
          purposeHe:
            "לבצע ביעילות-מרבית את הקנייה: כמות נכונה, בזמן, במחיר-החוזה, עם מינימום-מאמץ-ידני ומקסימום-ניראות.",
          processExampleHe:
            "משתמש בוחר פריט מקטלוג (Self-Service) ➔ PR ➔ Flexible Workflow מאשר ➔ Auto-PO כנגד חוזה ➔ נשלח לספק דרך Ariba Network ➔ GR. כל זה מנוטר ב-Procurement Overview Page.",
          cbcHe:
            "ב-CBC הרכש התפעולי מפיק PO-ים שבועיים לאריזה/סוכר כנגד חוזי-המסגרת; הזמנות-תרכיז מול ספק-יחיד; הכל ב-Fiori עם Auto-PO ל-SKU-ים יציבים.",
          navHe: [
            "SAP Fiori Launchpad ► Self-Service Procurement",
            "Materials Management ► Purchasing ► Purchase Order ► Automatic Generation of POs",
            "SPRO ► IMG ► Materials Management ► Purchasing ► Purchase Requisition",
          ],
          tables: ["EBAN", "EKKO", "EKPO", "EKET", "EKBE"],
          tcodes: ["ME51N", "ME21N", "ME59N", "MIGO", "ME2N"],
          fiori: ["F0842 (Manage Purchase Requisitions)", "F0843 (Manage Purchase Orders)", "F2358 (Procurement Overview Page)"],
          configHe: [
            "Self-Service Procurement + קטלוגים.",
            "Auto-PO (ME59N) + Flexible Workflow לאישורים.",
            "Central Procurement (Hub) לניהול חוצה-מערכות, אם נדרש.",
            "Situation Handling להתראות על PR/PO תקועים.",
          ],
          flow: [
            { he: "דרישה (PR)", code: "ME51N/Catalog", note: "EBAN" },
            { he: "אישור (Workflow)", code: "Flexible WF", note: "My Inbox" },
            { he: "הזמנה (PO)", code: "ME21N/ME59N", note: "EKKO/EKPO" },
            { he: "שליחה לספק", code: "Ariba Network", note: "cXML" },
            { he: "קבלה (GR)", code: "MIGO", note: "EKBE" },
          ],
          masterDataHe: [
            "Info Record (EINA/EINE) = מחיר/ספק לטעינת-PO אוטומטית.",
            "אב-חומר (תצוגות Purchasing/MRP) + Business Partner (ספק).",
            "EKBE = היסטוריית-PO (GR/IR) לניראות.",
          ],
          mistakesHe: [
            "PO ידני ללא Info Record ➔ מחיר שגוי וסטיות.",
            "אי-שימוש ב-Auto-PO/Self-Service בקטגוריות חוזרות ➔ עומס-ידני.",
            "Workflow לא-מכוון ➔ אישורים תקועים.",
          ],
          troubleshootHe: [
            "PR לא הומר ל-PO ➔ אין מקור/Auto-PO לא מסומן.",
            "אישור תקוע ➔ Flexible Workflow ללא ממלא-מקום/כלל שגוי.",
            "PO לא נשלח לספק ➔ Output/Ariba Network לא הוגדר.",
          ],
          bestPracticeHe: [
            "הפעל Self-Service ו-Auto-PO לקטגוריות יציבות.",
            "השען על Source Determination למחיר/ספק נכונים.",
            "נהל לפי-חריגים עם Situation Handling ו-Overview Page.",
          ],
          interviewHe: [
            { qHe: "מהם רכיבי הרכש התפעולי המודרני ב-S/4HANA?", aHe: "Self-Service Procurement, Manage PR/PO (Fiori), Auto-PO, Flexible Workflow, Situation Handling ו-Central Procurement — מעל ה-flow הקלאסי PR➔PO➔GR." },
            { qHe: "מהו Central Procurement?", aHe: "Hub המאפשר ליצור ולנהל PR/PO באופן מרכזי על-פני מספר מערכות-Backend (S/4HANA ו-ECC) ממערכת-רכש אחת." },
          ],
          takeawaysHe: [
            "רכש = ביצוע: PR➔PO➔GR ב-Fiori.",
            "Self-Service, Auto-PO ו-Workflow גמיש מאיצים אותו.",
            "Central Procurement מנהל רכש חוצה-מערכות.",
          ],
          relatedHe: [
            { labelHe: "MM · רכש תפעולי (1.1.2)", href: "/library/mm-academy/chapter-01/#sub-1.1.2" },
          ],
        },
        {
          id: "1.3.4",
          titleHe: "חשבונאות-ספקים וחשבוניות",
          titleEn: "Accounts Payable and Invoicing",
          execHe:
            "חשבונאות-ספקים (AP) ואימות-חשבוניות סוגרים את מחזור-הרכש: אימות חשבונית-הספק כנגד ה-PO וה-GR (3-Way Match), רישום ההתחייבות ב-FI, וביצוע התשלום. כאן הרכש פוגש את הכספים — דיוק כאן מונע תשלומי-יתר ומחלוקות.",
          beginnerHe:
            "השלב האחרון: הספק שולח חשבונית, בודקים שהיא תואמת להזמנה ולמה שהתקבל, רושמים שאנחנו חייבים לו כסף, ומשלמים. אם משהו לא תואם — החשבונית נחסמת עד שמבררים.",
          consultantHe:
            "Logistics Invoice Verification (MM-LIV, MIRO): 3-Way Match מול PO (EKPO) ו-GR (EKBE), עם Tolerance keys. רישום יוצר מסמך-FI ופותח פריט-פתוח ב-AP (BSIK). אוטומציה: ERS (MRRL) ללא חשבונית-ספק, ו-Self-Billing. תשלום ב-F110. נתונים: RBKP/RSEG (חשבונית), BSIK/BSAK (AP). GR/IR Clearing account מגשר בין קבלה לחשבונית.",
          purposeHe:
            "להבטיח שמשלמים רק עבור מה שהוזמן והתקבל, במחיר-המוסכם — ולסגור את הלולאה הכספית של הרכש בדיוק ובבקרה.",
          processExampleHe:
            "חשבונית מתקבלת ➔ MIRO מאמת מול PO ו-GR ➔ אם בתוך Tolerance, נרשם מסמך-FI ופריט-פתוח ב-AP ➔ F110 משלם בתאריך-הפירעון. אם מחוץ-לטולרנס — חסימה לבירור.",
          cbcHe:
            "ב-CBC חשבוניות-אריזה השוטפות מסולקות ב-ERS (ללא חשבונית-נייר) כנגד GR; חשבוניות-תרכיז (סכומים גבוהים) עוברות MIRO עם 3-Way Match ובקרת-Tolerance הדוקה.",
          navHe: [
            "SPRO ► IMG ► Materials Management ► Logistics Invoice Verification ► Incoming Invoice",
            "SPRO ► IMG ► Materials Management ► Logistics Invoice Verification ► Invoice Block ► Set Tolerance Limits",
            "Financial Accounting ► Accounts Payable ► Business Transactions ► Outgoing Payments",
          ],
          tables: ["RBKP", "RSEG", "BSIK", "BSAK", "EKBE"],
          tcodes: ["MIRO", "MIR4", "MRBR", "MRRL", "F110"],
          fiori: ["F0718 (Create Supplier Invoice)", "F1060A (Manage Supplier Line Items)", "F0712 (Supplier Invoices List)"],
          configHe: [
            "Tolerance keys (3-Way Match) — חריגות-כמות/מחיר חוסמות תשלום.",
            "GR/IR Clearing account + automatic account determination.",
            "ERS (MRRL) ו-Self-Billing לסילוק ללא חשבונית-ספק.",
            "Invoice Block / Release (MRBR) לטיפול בחשבוניות-חסומות.",
          ],
          flow: [
            { he: "קבלת חשבונית-ספק", code: "MIRO", note: "RBKP/RSEG" },
            { he: "3-Way Match", code: "PO↔GR↔Inv", note: "Tolerance keys" },
            { he: "רישום התחייבות (FI)", code: "BSIK", note: "פריט-פתוח AP" },
            { he: "שחרור חסימות", code: "MRBR", note: "אם חרג מ-Tolerance" },
            { he: "תשלום", code: "F110", note: "סליקת BSAK" },
          ],
          masterDataHe: [
            "Business Partner (ספק) + נתוני-AP (LFB1) — תנאי-תשלום, חשבון-מפתח.",
            "Info Record (EINE) = מחיר-מוסכם לבסיס-ה-Match.",
            "GR/IR Clearing — חשבון-מעבר בין קבלה לחשבונית.",
          ],
          mistakesHe: [
            "Tolerance רחב מדי ➔ תשלומי-יתר זורמים; צר מדי ➔ חסימות מיותרות.",
            "אי-איזון GR/IR Clearing ➔ פריטים תלויים בסוף-תקופה.",
            "תשלום בלי 3-Way Match ➔ תשלום עבור סחורה שלא התקבלה.",
          ],
          troubleshootHe: [
            "חשבונית חסומה ➔ חריגת-Tolerance או GR חסר; שחרר/בדוק ב-MRBR.",
            "GR/IR לא מתאזן ➔ הפרשי-כמות בין GR ל-IR; נתח ב-MR11.",
            "תשלום-יתר ➔ Tolerance keys לא מוגדרים נכון.",
          ],
          bestPracticeHe: [
            "כייל Tolerance keys לאיזון בין בקרה לזרימה.",
            "הפעל ERS/Self-Billing לקטגוריות יציבות.",
            "סקור GR/IR Clearing תקופתית (MR11) למניעת תלויות.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד חשבון GR/IR Clearing?", aHe: "חשבון-מעבר שמגשר בין קבלת-הטובין (GR — זיכוי) לאימות-החשבונית (IR — חיוב). יתרה לא-מאופסת מצביעה על GR ללא IR או להפך, ומנותחת ב-MR11." },
            { qHe: "מתי חשבונית נחסמת לתשלום?", aHe: "כשה-3-Way Match חורג מ-Tolerance keys (כמות/מחיר) או כש-GR חסר. החסימה משוחררת ב-MRBR לאחר בירור." },
          ],
          takeawaysHe: [
            "AP/חשבוניות סוגרים את מחזור-הרכש מול הכספים.",
            "3-Way Match + Tolerance מבטיחים תשלום נכון.",
            "GR/IR Clearing מגשר בין קבלה לחשבונית; ERS מאיץ.",
          ],
          relatedHe: [
            { labelHe: "MM · רכש תפעולי (1.1.2)", href: "/library/mm-academy/chapter-01/#sub-1.1.2" },
          ],
        },
        {
          id: "1.3.5",
          titleHe: "תפקידים ויישומי SAP Fiori",
          titleEn: "SAP Fiori Roles and Applications",
          execHe:
            "SAP Fiori הוא ממשק-המשתמש המודרני של S/4HANA: אפליקציות מבוססות-תפקיד (Business Roles), מאורגנות ב-Launchpad, מותאמות לכל מכשיר. ברכש, Fiori מספק אפליקציות ל-Manage PR/PO, Overview Pages, וניתוחים מוטמעים — מחליפות בהדרגה את ה-GUI הקלאסי.",
          beginnerHe:
            "Fiori = המסכים החדשים והנוחים של SAP. במקום קודי-טרנזקציה מסובכים, כל משתמש מקבל 'לוח-אריחים' (Launchpad) עם בדיוק האפליקציות שתפקידו צריך — קניין רואה אפליקציות-רכש, מנהל רואה דוחות.",
          consultantHe:
            "Fiori מבוסס Business Roles (למשל SAP_BR_PURCHASER, SAP_BR_PURCHASING_MANAGER) המקבצות Catalogs ו-Groups של Apps. סוגי-אפליקציות: Transactional (Manage PO), Analytical (Overview Pages, KPI), Fact Sheets (object pages). מבוססות OData + CDS Views. Spaces & Pages מארגנים את ה-Launchpad. הקצאה דרך PFCG/Identity. ME21N/MIGO/MIRO זמינים גם כ-Fiori (Web GUI / native apps).",
          purposeHe:
            "להעניק לכל תפקיד-רכש בדיוק את הכלים שהוא צריך, בחוויה אחידה ומבוססת-נתונים — להאיץ עבודה, לצמצם-טעויות ולשלב ביצוע עם אנליטיקה.",
          processExampleHe:
            "קניין מקבל את Business Role 'Purchaser' ➔ ה-Launchpad מציג Manage PR, Manage PO, Overview Page ו-Sources of Supply ➔ הוא מבצע ומנתח באותו מקום, על נתוני-זמן-אמת.",
          cbcHe:
            "ב-CBC קנייני-האריזה מקבלים Business Role 'Purchaser' עם אפליקציות-PO ו-Overview Page; מנהל-הרכש מקבל 'Purchasing Manager' עם דוחות-הוצאה ו-KPI; צוות-AP מקבל אפליקציות-חשבונית.",
          navHe: [
            "SAP Fiori Launchpad ► Spaces & Pages",
            "SPRO ► IMG ► (Activate Business Roles / Catalogs)",
            "PFCG ► Business Roles (SAP_BR_PURCHASER ...) ► Catalog/Group assignment",
          ],
          tables: ["AGR_USERS", "EKKO", "EKPO"],
          tcodes: ["PFCG", "/UI2/FLP", "/UI2/FLPD_CUST", "SU01"],
          fiori: ["F0842 (Manage Purchase Requisitions)", "F0843 (Manage Purchase Orders)", "F2358 (Procurement Overview Page)", "F1990 (Manage Sources of Supply)"],
          configHe: [
            "Business Roles (SAP_BR_PURCHASER / SAP_BR_PURCHASING_MANAGER) + Catalogs/Groups.",
            "Spaces & Pages לארגון ה-Launchpad לפי תפקיד.",
            "App types: Transactional / Analytical (Overview, KPI) / Fact Sheet.",
            "הקצאת-תפקידים דרך PFCG ו-Identity Management.",
          ],
          flow: [
            { he: "הגדרת Business Role", code: "PFCG", note: "SAP_BR_PURCHASER" },
            { he: "שיוך Catalogs/Groups", note: "אילו אפליקציות" },
            { he: "ארגון Launchpad", code: "Spaces & Pages", note: "תצוגת-תפקיד" },
            { he: "הקצאה למשתמש", code: "SU01", note: "Role assignment" },
            { he: "עבודה ב-Fiori", code: "/UI2/FLP", note: "ביצוע + אנליטיקה" },
          ],
          masterDataHe: [
            "Business Role = אוסף Catalogs/Groups הקובע אילו Apps רואה המשתמש.",
            "CDS Views + OData = הבסיס לכל אפליקציית-Fiori.",
          ],
          mistakesHe: [
            "הקצאת אפליקציות בודדות במקום Business Roles ➔ תחזוקה כאוטית.",
            "הרשאות-יתר דרך תפקידים רחבים ➔ פגיעה ב-SoD.",
            "אי-הפעלת ה-Catalogs/OData services ➔ אריחים 'שבורים' ב-Launchpad.",
          ],
          troubleshootHe: [
            "אריח שבור/אפליקציה לא נטענת ➔ OData service או Catalog לא הופעלו.",
            "משתמש לא רואה אפליקציה ➔ Business Role/Catalog לא הוקצה.",
            "אפליקציה אנליטית ריקה ➔ הרשאות-CDS או Embedded Analytics לא פעילים.",
          ],
          bestPracticeHe: [
            "הקצה דרך Business Roles סטנדרטיים, לא אפליקציות בודדות.",
            "שמור על SoD בעיצוב-התפקידים.",
            "השתמש ב-Spaces & Pages לחוויה ממוקדת-תפקיד.",
          ],
          interviewHe: [
            { qHe: "מהי Fiori Business Role ומה היא מכילה?", aHe: "אוסף של Catalogs ו-Groups הקובע אילו אפליקציות (Transactional/Analytical/Fact Sheet) רואה המשתמש ב-Launchpad. למשל SAP_BR_PURCHASER לקניין." },
            { qHe: "אילו סוגי-אפליקציות Fiori קיימים ברכש?", aHe: "Transactional (Manage PO), Analytical (Overview Pages ו-KPI Tiles) ו-Fact Sheets (object pages) — כולן על CDS Views + OData." },
          ],
          takeawaysHe: [
            "Fiori = ממשק מבוסס-תפקיד (Business Roles) ב-Launchpad.",
            "סוגים: Transactional, Analytical, Fact Sheet — על CDS+OData.",
            "הקצאה דרך Roles + Spaces & Pages, תוך שמירת-SoD.",
          ],
          relatedHe: [
            { labelHe: "MM · רכש עם S/4HANA (1.3)", href: "/library/mm-academy/chapter-01/#sub-1.3" },
          ],
        },
      ],
    },
    // ============================================================ 1.4
    {
      id: "1.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה מיפה את עולם הרכש והאספקה: הרצף מתפעולי לאסטרטגי, הראייה מקצה-לקצה (S2P ו-P2P), והמימוש ב-SAP S/4HANA — Digital Core, Business Partner, Embedded Analytics, Fiori ואינטגרציית-Ariba. אלה היסודות שעליהם נבנים כל הפרקים הבאים.",
      beginnerHe:
        "סיכמנו את התמונה הגדולה: יש רכש יומיומי (תפעולי) ורכש-החלטות (אסטרטגי); מסתכלים על כל המחזור מקצה-לקצה; ו-S/4HANA היא הפלטפורמה החדשה שמריצה הכל מהר, פשוט ויפה. מכאן נצלול לפרטים.",
      consultantHe:
        "מסגרת-העל: P2P ⊂ S2P; אובייקטי-מקור (EINA/EINE/EORD/Contract) מגשרים אסטרטגי↔תפעולי; S/4HANA מספק MATDOC, BP (CVI), CDS-based Embedded Analytics ו-Fiori Business Roles; Ariba מכסה את הסורסינג בענן. הפרקים הבאים יעמיקו בכל אובייקט, קונפיגורציה ותהליך.",
      purposeHe:
        "לקבע מפת-ידע מאוחדת לפני הצלילה לפרטים: מהם החלקים, כיצד הם מתחברים, ואיפה S/4HANA משנה את המשחק מול ECC.",
      processExampleHe:
        "מבט-על על מחזור שלם: צורך ➔ סורסינג/חוזה (S2P) ➔ PR➔PO➔GR➔IR➔תשלום (P2P) ➔ ניתוח-הוצאה ➔ חזרה לסורסינג. כל חוליה תפורט בפרק ייעודי.",
      cbcHe:
        "ב-CBC הפרק הניח את התשתית: תרכיז (Single Source), סוכר/CO2 (חוזי-מסגרת), אריזה (Ariba + Auto-PO) — מקרי-מבחן שילוו את כל הספר להמחשת התהליכים.",
      navHe: [
        "SAP Fiori Launchpad ► Procurement (Overview)",
        "SPRO ► IMG ► Materials Management (מפת-קונפיגורציה כללית)",
      ],
      tables: ["EKKO", "EKPO", "EBAN", "MATDOC", "RBKP"],
      tcodes: ["ME21N", "ME51N", "MIGO", "MIRO", "BP"],
      fiori: ["F2358 (Procurement Overview Page)", "F0843 (Manage Purchase Orders)"],
      configHe: [
        "מפת-קונפיגורציה: Document types, Source determination, LIV tolerances, BP/CVI, Fiori roles.",
        "נקודות-מעבר ECC➔S/4HANA: MATDOC, BP חובה, Fiori-first, Simplification List.",
      ],
      flow: [
        { he: "תפעולי ↔ אסטרטגי", note: "רצף הרכש" },
        { he: "מקצה-לקצה (S2P/P2P)", code: "EKBE", note: "ניראות מלאה" },
        { he: "מימוש ב-S/4HANA", code: "MATDOC/BP", note: "Digital Core" },
        { he: "Fiori + Analytics", code: "CDS", note: "ביצוע + תובנה" },
      ],
      mistakesHe: [
        "לקפוץ לפרטי-קונפיגורציה בלי להבין את מפת-העל (תפעולי/אסטרטגי, S2P/P2P).",
        "להתייחס ל-S/4HANA כ'ECC מהיר' ולהחמיץ את שינויי-הליבה (BP, MATDOC, Fiori).",
      ],
      troubleshootHe: [
        "בלבול בין תחומים/מסגרות ➔ חזור למפת-העל של הפרק (1.1–1.3).",
        "הנחות-ECC שגויות ב-S/4HANA ➔ עיין בנקודות-המעבר (BP, MATDOC, Simplification).",
      ],
      bestPracticeHe: [
        "החזק מפת-על (תפעולי/אסטרטגי, S2P/P2P, אובייקטי-מקור) כמסגרת-ייחוס לכל הפרקים.",
        "זהה תמיד היכן ECC ➔ S/4HANA משנה את האובייקט/התהליך.",
      ],
      interviewHe: [
        { qHe: "מהי מסגרת-העל של מחזור-הרכש?", aHe: "P2P (תפעולי: PR➔PO➔GR➔IR➔תשלום) המוכל בתוך S2P (מוסיף סורסינג אסטרטגי וחוזים), עם אובייקטי-מקור (Info Record/Source List/Contract) המגשרים בין השניים." },
        { qHe: "מהם שינויי-הליבה של S/4HANA שכל לומד-רכש חייב להכיר?", aHe: "MATDOC לתנועות-מלאי, Business Partner חובה (CVI) לספקים, Embedded Analytics (CDS Views) ו-Fiori Business Roles — לצד Simplification List למעבר מ-ECC." },
      ],
      takeawaysHe: [
        "הרכש הוא רצף תפעולי↔אסטרטגי, נצפה מקצה-לקצה (S2P/P2P).",
        "אובייקטי-מקור מגשרים בין האסטרטגי לתפעולי.",
        "S/4HANA = Digital Core (MATDOC, BP, CDS, Fiori) + Ariba בענן.",
      ],
      relatedHe: [
        { labelHe: "MM · רכש ואספקה מהבסיסי לאסטרטגי (1.1)", href: "/library/mm-academy/chapter-01/#sub-1.1" },
        { labelHe: "MM · רכש עם S/4HANA (1.3)", href: "/library/mm-academy/chapter-01/#sub-1.3" },
      ],
    },
  ],
};
