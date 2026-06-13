// ===== MM Digital Textbook — Chapter 13 (Supplier Management) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved (ids + order); x.y.z nested under x.y.
// CBC context = Coca-Cola bottling supplier onboarding & scoring for
// ingredient & packaging vendors. SAP identifiers verbatim English.
import type { TextbookChapter } from "./types";

export const CH13: TextbookChapter = {
  n: 13,
  titleHe: "ניהול ספקים",
  titleEn: "Supplier Management",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לניהול ספקים (Supplier Management) ב-SAP S/4HANA, בלב תחום הרכש והמקורות (Sourcing & Procurement). כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. נושאי הליבה: גילוי-הכשרה-וקליטה של ספקים (Supplier Lifecycle and Collaboration · SLC), סיווג וסגמנטציה דרך Purchasing Category, והערכת-ספקים (Supplier Evaluation) על-פי ציון-משולב (Scorecard), זמן, איכות, מחיר ושאלון. המטרה: ללמוד את הנושא במלואו ללא הספר המקורי, ברמה המתאימה גם למתחיל וגם ליועץ.",
  subchapters: [
    // ============================================================ 13.1
    {
      id: "13.1", titleHe: "מהו ניהול ספקים?", titleEn: "What Is Supplier Management?",
      execHe:
        "ניהול ספקים (Supplier Management) הוא הדיסציפלינה השלמה של ניהול מערכת-היחסים עם הספק לכל אורך מחזור-חייו: גילוי (Discovery), הכשרה (Qualification), קליטה (Onboarding), סיווג (Classification), סגמנטציה (Segmentation) והערכה (Evaluation). הוא אינו רק 'פתיחת רשומת-ספק' אלא תהליך אסטרטגי שמפחית סיכון-אספקה, מבטיח עמידה ברגולציה (מזון/איכות), ומשפר תנאים מסחריים. ב-S/4HANA הוא נשען על Supplier and Category Management (SLC) ועל מנוע הערכת-הספקים.",
      beginnerHe:
        "דמיין שאתה צריך 'לגייס' ספקים כמו שמגייסים עובדים. קודם מוצאים מועמדים (גילוי), בודקים שהם כשירים — תקנים, ביטוח, אישורי-איכות (הכשרה), פותחים להם תיק רשמי במערכת (קליטה), ממיינים אותם לקטגוריות (סיווג), מסמנים מי חשוב יותר (סגמנטציה), ולאורך הזמן נותנים להם ציון לפי הביצועים (הערכה). זהו מעגל מתמשך, לא אירוע חד-פעמי.",
      consultantHe:
        "ב-S/4HANA ניהול-הספקים נחלק לשני עולמות משלימים: (1) Supplier and Category Management — לשעבר SAP Supplier Lifecycle Management / Ariba-aligned SLC — המכסה גילוי, רישום (Registration), הכשרה (Qualification) וסיווג דרך Purchasing Categories; (2) Supplier Evaluation — מנוע הציינון (Scorecard) המבוסס על קריטריונים (Criteria) ותת-קריטריונים, הניזון מנתוני-רכש תפעוליים (LIS) ומשאלונים. רשומת-הספק עצמה היא Business Partner (BP) עם תפקיד FLVN00/FLVN01, וטבלאות LFA1/LFB1/LFM1 ברקע. ה-MM-SUS וה-SLC משתמשים ב-Web-UI נפרד מה-GUI הקלאסי.",
      purposeHe:
        "המטרה: להבטיח שלכל פעילות-רכש יש ספק כשיר, מסווג ומדורג — כדי שהמערכת תוכל לנתב מקורות (Sourcing) חכם, להפחית סיכון, ולקבל החלטות-רכש מבוססות-נתונים במקום תחושות-בטן.",
      processExampleHe:
        "ארגון זקוק לספק חדש לחומר-גלם קריטי: צוות-הרכש מפרסם בקשת-רישום, ספקים נרשמים בפורטל, עוברים הכשרה (שאלוני-תאימות, אישורי-תקן), מאושרים והופכים ל-Business Partner פעיל, מסווגים ל-Purchasing Category, ומאותו רגע ביצועיהם נמדדים אוטומטית דרך Supplier Evaluation.",
      cbcHe:
        "ב-CBC: ספק תרכיז, ספק סוכר, ספק בקבוקי-PET וספק פקקים עוברים כל אחד גילוי, הכשרת-מזון (HACCP/ISO 22000), קליטה כ-Business Partner, סיווג ל-Purchasing Category ('Sweeteners', 'Packaging') ודירוג שוטף לפי זמן-אספקה, איכות-אצווה ומחיר — כדי להבטיח שהבקבוק שיוצא מהקו עומד בתקני קוקה-קולה העולמיים.",
      navHe: [
        "Materials Management ► Purchasing ► Supplier Evaluation ► Maintain Purchasing Organization Data",
        "SAP Menu ► Logistics ► Materials Management ► Supplier Evaluation",
        "Fiori Launchpad ► Supplier Management ► Manage Suppliers / Manage Purchasing Categories",
      ],
      tables: ["LFA1", "LFB1", "LFM1", "BUT000", "ELM_SUPPLIER"],
      tcodes: ["BP", "XK01", "XK02", "XK03", "ME6H", "MEQ1"],
      fiori: ["F1500", "F2853", "F4144"],
      configHe: [
        "Supplier and Category Management מופעל כ-Web-UI (SLC) נפרד מה-GUI; דורש הקמת RFC/portal.",
        "רשומת-הספק = Business Partner (BP) עם תפקידי FLVN00 (general) ו-FLVN01 (purchasing org).",
        "שלושת המרכיבים — Discovery/Qualification/Onboarding · Classification/Segmentation · Evaluation — מוגדרים בנפרד ב-SPRO.",
      ],
      flow: [
        { he: "גילוי ספק", code: "Discovery", note: "פרסום בקשת-רישום" },
        { he: "הכשרה", code: "Qualification", note: "שאלוני-תאימות" },
        { he: "קליטה", code: "Onboarding", note: "יצירת BP פעיל" },
        { he: "סיווג", code: "Category", note: "Purchasing Category" },
        { he: "הערכה שוטפת", code: "ME6H", note: "Scorecard" },
      ],
      masterDataHe: [
        "Business Partner (BP) = רשומת-העל; LFA1 (general), LFB1 (company code), LFM1 (purchasing org).",
        "Purchasing Category = אובייקט-סיווג לקיבוץ ספקים ולסגמנטציה.",
        "Evaluation data נשען על LIS (Logistics Information System) ועל שאלונים.",
      ],
      mistakesHe: [
        "התייחסות ל'ניהול ספקים' כפתיחת-רשומה בלבד, בלי הכשרה וסיווג — מאבדים בקרת-סיכון.",
        "ערבוב בין רשומת-BP הטכנית לבין תהליך ה-SLC העסקי.",
        "דילוג על שלב-ההכשרה לספקי-מזון — חשיפה רגולטורית חמורה.",
      ],
      troubleshootHe: [
        "ספק נפתח אך לא ניתן לרכוש ממנו ➔ חסר תפקיד FLVN01 (Purchasing Org) או נתוני LFM1.",
        "ספק לא מופיע בהערכה ➔ לא מסווג ל-Purchasing Category או חסר נתוני-תנועה ב-LIS.",
        "תהליך-קליטה תקוע ➔ שאלון-הכשרה לא אושר ב-Web-UI של SLC.",
      ],
      bestPracticeHe: [
        "ראה ניהול-ספקים כמעגל-חיים, לא כאירוע; בנה תהליך גילוי→הכשרה→קליטה→סיווג→הערכה.",
        "חבר את ההכשרה לדרישות-רגולציה ספציפיות-ענף (מזון/בטיחות).",
        "תאם בין ה-Business Partner הטכני לבין נתוני ה-SLC כדי למנוע כפילויות.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת מרכיבי-העל של ניהול-ספקים ב-S/4HANA?", aHe: "(1) גילוי, הכשרה וקליטה; (2) סיווג וסגמנטציה; (3) הערכה. יחד הם מכסים את מעגל-חיי הספק." },
        { qHe: "מהי רשומת-הספק הטכנית ב-S/4HANA?", aHe: "Business Partner (BP) עם תפקידי Supplier (FLVN00/FLVN01); LFA1/LFB1/LFM1 ברקע, מאוחדים תחת ה-BP." },
        { qHe: "מה ההבדל בין Supplier and Category Management ל-Supplier Evaluation?", aHe: "הראשון מנהל את הקליטה והסיווג (SLC, Web-UI); השני מדרג ביצועים שוטפים דרך Scorecard וקריטריונים." },
      ],
      takeawaysHe: [
        "ניהול-ספקים = מעגל-חיים: גילוי → הכשרה → קליטה → סיווג → סגמנטציה → הערכה.",
        "מבוסס על Business Partner (BP) + Supplier and Category Management (SLC).",
        "מטרתו: הפחתת-סיכון, תאימות, והחלטות-רכש מבוססות-נתונים.",
      ],
      relatedHe: [
        { labelHe: "MM · סיווג וסגמנטציה (13.2)", href: "/library/mm/chapter-13/#sub-13.2" },
        { labelHe: "MM · הערכת ספקים (13.3)", href: "/library/mm/chapter-13/#sub-13.3" },
        { labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" },
      ],
      children: [
        {
          id: "13.1.1", titleHe: "גילוי, הכשרה וקליטה של ספקים", titleEn: "Supplier Discovery, Qualification, and Onboarding",
          execHe:
            "שלב-הכניסה למעגל-החיים: גילוי (איתור מועמדים), הכשרה (אימות כשירות מסחרית, פיננסית ורגולטורית) וקליטה (הפיכת מועמד לספק פעיל במערכת). שלב זה קובע את איכות בסיס-הספקים ומפחית סיכון-אספקה לפני שבכלל בוצעה הזמנה ראשונה.",
          beginnerHe:
            "זה 'מסלול-הקבלה' של ספק. קודם מוצאים אותו (גילוי), בודקים שהוא ראוי — יש לו רישיונות, ביטוח, אישורי-איכות (הכשרה), ואז פותחים לו תיק רשמי ומחברים אותו למערכת כך שאפשר להתחיל לעבוד איתו (קליטה).",
          consultantHe:
            "ב-S/4HANA Supplier and Category Management זה זורם דרך Web-UI: Registration (הספק ממלא טופס בפורטל), Qualification (שאלונים/Questionnaires עם ציון-עובר), ואז Onboarding שיוצר Business Partner עם תפקיד Supplier. כל שלב נשלט ב-Workflow ובסטטוסים. נתוני-ההכשרה נשמרים כ-Qualification עם תוקף (ניתן לפוג), ומחייבים חידוש תקופתי.",
          purposeHe:
            "להבטיח שרק ספקים כשירים נכנסים לבסיס-הנתונים, ושכל ספק מתועד עם הוכחות-תאימות לפני הרכישה הראשונה — שורש בקרת-הסיכון.",
          processExampleHe:
            "מנהל-קטגוריה מפרסם בקשת-רישום; ספקים נרשמים, ממלאים שאלון-הכשרה (כספים, ISO, ביטוח); המערכת מחשבת ציון; ספקים שעברו מאושרים, נוצר עבורם Business Partner, והם מסווגים ל-Purchasing Category — מוכנים להזמנות.",
          cbcHe:
            "ב-CBC ספק-סוכר חדש נרשם בפורטל, מעלה אישורי HACCP ו-ISO 22000, מצרף ביטוח-אחריות-מוצר; QA בודק; לאחר אישור נפתח BP ומסווג ל-Purchasing Category 'Sweeteners'. אישור-המזון נשמר כ-Qualification עם תאריך-תפוגה לחידוש שנתי.",
          navHe: [
            "Fiori ► Supplier Management ► Manage Supplier Registrations",
            "SPRO ► Supplier and Category Management ► Supplier Registration / Qualification ► Define Process",
          ],
          tables: ["ELM_SUPPLIER", "BUT000", "LFA1"],
          tcodes: ["BP", "XK01"],
          fiori: ["F2853", "F1500"],
          configHe: [
            "הגדר תהליך-רישום (Registration) ושאלוני-הכשרה (Questionnaires) ב-SLC Web-UI.",
            "הגדר Qualification types עם תוקף וציון-עובר; חידוש תקופתי.",
            "הגדר את שלב-ה-Onboarding ליצירת BP אוטומטית עם תפקיד Supplier.",
          ],
          flow: [
            { he: "פרסום בקשת-רישום", code: "Discovery" },
            { he: "רישום בפורטל", code: "Registration" },
            { he: "שאלון-הכשרה", code: "Qualification", note: "ציון-עובר" },
            { he: "אישור", code: "Approval" },
            { he: "יצירת ספק פעיל", code: "BP", note: "FLVN00/01" },
          ],
          masterDataHe: [
            "Registration record (ELM_SUPPLIER) → Business Partner (BUT000) בקליטה.",
            "Qualification עם תוקף (Valid-To) — מחייב חידוש.",
          ],
          mistakesHe: [
            "דילוג על הכשרה 'כדי לזרז' — ספק לא-כשיר נכנס לבסיס.",
            "אי-הגדרת תוקף ל-Qualification — אישורים פגי-תוקף נשארים 'ירוקים'.",
            "Onboarding ידני שעוקף את ה-Workflow — חוסר עקביות-נתונים.",
          ],
          troubleshootHe: [
            "רישום-ספק לא הופך ל-BP ➔ שלב-Onboarding לא הופעל או Workflow נתקע.",
            "ספק כשיר נדחה ➔ ציון-שאלון מתחת לסף או שדה-חובה ריק.",
            "Qualification 'נעלמה' ➔ פגה תוקף ולא חודשה.",
          ],
          bestPracticeHe: [
            "אוטומציה מלאה גילוי→קליטה דרך Workflow; הימנע מפתיחה ידנית.",
            "קבע תוקף ותהליך-חידוש לכל Qualification רגולטורית.",
            "שמור הוכחות-תאימות (תעודות) מצורפות לרשומת-הספק.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת השלבים בכניסת-ספק?", aHe: "Discovery (גילוי/איתור), Qualification (הכשרה/אימות-כשירות), Onboarding (קליטה/יצירת BP פעיל)." },
            { qHe: "מדוע ל-Qualification יש תוקף?", aHe: "כי אישורי-תאימות (ISO, ביטוח) פגים; התוקף מאלץ חידוש תקופתי ומונע הסתמכות על אישור ישן." },
          ],
          takeawaysHe: [
            "גילוי→הכשרה→קליטה הוא 'מסלול-הקבלה' של הספק.",
            "הכשרה נשמרת כ-Qualification עם תוקף — חידוש תקופתי.",
            "קליטה מסתיימת ביצירת Business Partner פעיל.",
          ],
          relatedHe: [{ labelHe: "MM · קליטה כ-BP", href: "/library/mm/object/BP/" }],
        },
        {
          id: "13.1.2", titleHe: "סיווג וסגמנטציה", titleEn: "Classification and Segmentation",
          execHe:
            "סיווג (Classification) ממיין ספקים לקטגוריות-רכש לפי תחום-אספקה; סגמנטציה (Segmentation) מדרגת אותם לפי חשיבות אסטרטגית (Strategic/Preferred/Standard). יחד הם מאפשרים ניהול-ספקים מובחן: השקעת-מאמץ לפי ערך-וסיכון במקום יחס-אחיד לכולם.",
          beginnerHe:
            "סיווג = 'באיזו מחלקה הספק שייך' (סוכר? אריזות?). סגמנטציה = 'כמה הוא חשוב לנו' (ספק-מפתח אסטרטגי או ספק-משני). זה כמו לסדר אנשי-קשר לפי קבוצות ולסמן מי VIP.",
          consultantHe:
            "הסיווג נעשה דרך Purchasing Category — אובייקט המקבץ ספקים, חומרים ומדדים. הסגמנטציה מיושמת כתכונת-קטגוריה או דרך הערכת-ספקים, ומשמשת לאסטרטגיית-Sourcing. ב-S/4HANA ה-Purchasing Category הוא הציר המרכזי שגם ההערכה (Combined Scorecard) נתלית בו.",
          purposeHe:
            "למקד משאבי-ניהול: ספקים אסטרטגיים מקבלים ניהול-קשר אינטנסיבי והערכה תכופה, בעוד ספקים סטנדרטיים מנוהלים בקלות יחסית.",
          processExampleHe:
            "מנהל-רכש מסווג 200 ספקים ל-8 Purchasing Categories, ובכל קטגוריה מסמן את ה-Top 20% כ-Strategic — אלה יקבלו Scorecard רבעוני ופגישות-עסקים קבועות.",
          cbcHe:
            "ב-CBC ספק-תרכיז (מקור-יחיד, קריטי) = Strategic; ספק-קרטונים (מקורות-רבים) = Standard. שניהם בקטגוריות נפרדות, אך רמת-הניהול שונה לחלוטין.",
          navHe: [
            "Fiori ► Supplier Management ► Manage Purchasing Categories",
            "SPRO ► Supplier and Category Management ► Purchasing Category ► Define Categories",
          ],
          tables: ["LFA1", "LFM1", "ELM_CATEGORY"],
          tcodes: ["BP", "MEQ1"],
          fiori: ["F2854", "F4144"],
          configHe: [
            "הגדר Purchasing Categories ושייך ספקים/חומרים.",
            "הגדר תכונות-סגמנטציה (Strategic/Preferred/Standard) ברמת-קטגוריה או ספק.",
          ],
          mistakesHe: [
            "סיווג גס מדי (קטגוריה אחת לכולם) — מאבד את ערך-הניתוח.",
            "אי-ביצוע סגמנטציה — כל הספקים מנוהלים אחיד, בזבוז משאבים.",
          ],
          troubleshootHe: [
            "ספק לא נכלל בניתוח-קטגוריה ➔ לא שויך ל-Purchasing Category.",
            "סגמנטציה לא משפיעה על ההערכה ➔ הקטגוריה לא מקושרת ל-Scorecard.",
          ],
          bestPracticeHe: [
            "בנה היררכיית-קטגוריות הגיונית (לא רחבה ולא עמוקה מדי).",
            "יישם כלל-Pareto: השקע ניהול בספקים האסטרטגיים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין סיווג לסגמנטציה?", aHe: "סיווג = שיוך ל-Purchasing Category לפי תחום; סגמנטציה = דירוג חשיבות אסטרטגית של הספק." },
          ],
          takeawaysHe: [
            "סיווג = לפי תחום (Purchasing Category); סגמנטציה = לפי חשיבות.",
            "מאפשרים ניהול-ספקים מובחן ויעיל.",
          ],
          relatedHe: [{ labelHe: "MM · יצירת Purchasing Category (13.2.1)", href: "/library/mm/chapter-13/#sub-13.2.1" }],
        },
        {
          id: "13.1.3", titleHe: "הערכה", titleEn: "Evaluation",
          execHe:
            "הערכת-ספקים (Supplier Evaluation) היא המדידה השיטתית של ביצועי-הספק לאורך זמן, לפי קריטריונים מוגדרים (איכות, אספקה, מחיר, שירות), המתורגמים לציון-משולב (Scorecard). היא הופכת את ניהול-הספקים מתחושתי לאובייקטיבי ומאפשרת השוואה, תיעדוף וקבלת-החלטות.",
          beginnerHe:
            "זה 'תעודת-הציונים' של הספק. כמו שתלמיד מקבל ציון בכמה מקצועות, הספק מקבל ציון על איכות, על עמידה-בזמנים, על מחיר ועוד — ובסוף ציון-משוקלל אחד שמסכם כמה הוא טוב.",
          consultantHe:
            "ב-S/4HANA קיימים שני מנגנונים: (1) הערכה קלאסית מבוססת-LIS עם Main Criteria ו-Subcriteria משוקללים (ME61/ME6H); (2) Operational Supplier Evaluation מבוסס-HANA הניזון ישירות מנתוני-רכש בזמן-אמת. הציון הסופי הוא ממוצע-משוקלל של הקריטריונים, ולעיתים משולב עם הערכת-איכות מ-QM (ראה /library/qm-academy/chapter-19/).",
          purposeHe:
            "לספק תמונה אובייקטיבית של ביצועי-הספק כבסיס לבחירת-מקור (Source Determination), למשא-ומתן, לתוכניות-שיפור ולהחלטות הסרת-ספק.",
          processExampleHe:
            "בסוף-רבעון המערכת מחשבת לכל ספק ציון: איכות 85, אספקה 90, מחיר 75 → ציון-משולב 83. ספק עם ציון < 60 נכנס לתוכנית-שיפור; ספק קבוע-נמוך מועמד להסרה.",
          cbcHe:
            "ב-CBC ספק-בקבוקים מדורג: % אצוות-תקינות (איכות), עמידה-בלוח-זמנים (אספקה), סטיית-מחיר. ציון נמוך באיכות-אצווה מפעיל ביקורת-ספק לפני המשך-עבודה — קריטי לבטיחות-מזון.",
          navHe: [
            "SAP Menu ► Logistics ► MM ► Supplier Evaluation ► Maintain (ME61)",
            "Fiori ► Operational Supplier Evaluation",
          ],
          tables: ["ELBK", "ELBM", "ELBP", "LFA1"],
          tcodes: ["ME61", "ME62", "ME63", "ME6H"],
          fiori: ["F1500", "F2853"],
          configHe: [
            "הגדר Main Criteria (Quality/Delivery/Price/Service) ו-Subcriteria עם משקלים.",
            "קבע שיטת-חישוב (אוטומטית מ-LIS, ידנית, או שאלון) לכל תת-קריטריון.",
          ],
          mistakesHe: [
            "הערכה ידנית-בלבד — סובייקטיבית ולא בת-קיימא בקנה-מידה.",
            "משקלים לא-מתאימים לאסטרטגיה (למשל מחיר מעל איכות בספק-מזון).",
          ],
          troubleshootHe: [
            "ציון לא מתעדכן ➔ נתוני-LIS חסרים או חישוב אוטומטי לא הופעל.",
            "ספק חסר-ציון ➔ אין נתוני-תנועה בתקופה או חסר שיוך-קטגוריה.",
          ],
          bestPracticeHe: [
            "שלב הערכה אוטומטית (LIS/HANA) עם שאלון לקריטריונים איכותניים.",
            "תאם משקלים לאסטרטגיית-הרכש לכל קטגוריה.",
          ],
          interviewHe: [
            { qHe: "מהם הקריטריונים הראשיים הקלאסיים בהערכת-ספק?", aHe: "Quality, Delivery (Time), Price, ו-General Service/Support — כל אחד עם תת-קריטריונים משוקללים." },
            { qHe: "מה ההבדל בין הערכה קלאסית ל-Operational Supplier Evaluation?", aHe: "הקלאסית מבוססת-LIS עם משקלים מוגדרים; ה-Operational מבוססת-HANA וניזונה מנתוני-רכש בזמן-אמת ב-Fiori." },
          ],
          takeawaysHe: [
            "הערכה = תעודת-ציונים אובייקטיבית של הספק.",
            "ציון-משולב = ממוצע-משוקלל של קריטריונים.",
            "בסיס לבחירת-מקור, משא-ומתן ותוכניות-שיפור.",
          ],
          relatedHe: [
            { labelHe: "MM · הערכת ספקים (13.3)", href: "/library/mm/chapter-13/#sub-13.3" },
            { labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" },
          ],
        },
      ],
    },
    // ============================================================ 13.2
    {
      id: "13.2", titleHe: "סיווג וסגמנטציה", titleEn: "Classification and Segmentation",
      execHe:
        "תת-פרק זה מעמיק במנגנון המעשי של סיווג וסגמנטציה: ה-Purchasing Category. זהו אובייקט-המפתח ב-Supplier and Category Management המקבץ ספקים, חומרים ומדדי-ביצוע תחת תחום-אספקה אחד, ומשמש כיחידת-הניהול האסטרטגית של הרכש. דרכו מנהלים מקורות, מנתחים הוצאה (Spend), ותולים את ה-Combined Scorecard.",
      beginnerHe:
        "Purchasing Category היא 'תיקייה' לכל תחום-רכש: תיקייה ל'ממתיקים', תיקייה ל'אריזות'. בכל תיקייה יש את הספקים הרלוונטיים, החומרים, והמדדים. במקום לנהל מאות ספקים בודדים, מנהלים כמה תיקיות-אסטרטגיות.",
      consultantHe:
        "ה-Purchasing Category מנוהל ב-Fiori (Manage Purchasing Categories) ו/או ב-Web-UI של SLC. הוא נושא: אחראי (Category Manager), ספקים-משויכים, חומרים, מסמכים, ו-KPIs. הוא תומך בהיררכיה (Category hierarchy) ובתרגום רב-לשוני (Translation). ה-Combined Scorecard מחושב ברמת-הקטגוריה. ברקע יושבים אובייקטי ELM_CATEGORY.",
      purposeHe:
        "לספק יחידת-ניהול אסטרטגית אחת לכל תחום-אספקה — לריכוז ספקים, ניתוח-הוצאה, ניהול-מקורות והערכה — במקום ניהול-פרטני מבוזר.",
      processExampleHe:
        "Category Manager אחראי על קטגוריית 'Packaging': רואה את כל ספקי-האריזות, ההוצאה הכוללת, ה-Scorecards, ומסמכי-החוזים — לוח-מחוונים אחד לכל ההחלטות בתחום.",
      cbcHe:
        "ב-CBC קטגוריות אופייניות: 'Sweeteners' (סוכר/HFCS), 'Concentrate', 'Packaging-PET', 'Closures', 'CO2'. כל קטגוריה עם מנהל-קטגוריה ייעודי המנהל את ספקיה ומדדיהם.",
      navHe: [
        "Fiori ► Supplier Management ► Manage Purchasing Categories (F4144)",
        "SPRO ► Supplier and Category Management ► Purchasing Category ► Settings",
      ],
      tables: ["ELM_CATEGORY", "LFM1", "LFA1"],
      tcodes: ["BP", "MEQ1"],
      fiori: ["F4144", "F2854"],
      configHe: [
        "הפעל את אפליקציות ה-Purchasing Category ב-Fiori (catalog + roles).",
        "הגדר היררכיית-קטגוריות ושפות-תרגום נתמכות.",
      ],
      flow: [
        { he: "יצירת קטגוריה", code: "Create", note: "13.2.1" },
        { he: "ניהול שוטף", code: "Manage", note: "13.2.2" },
        { he: "תרגום", code: "Translate", note: "13.2.3" },
        { he: "Combined Scorecard", code: "Score" },
      ],
      masterDataHe: [
        "Purchasing Category = אובייקט-מפתח (ELM_CATEGORY) עם ספקים, חומרים, KPIs.",
        "מקושר ל-Business Partner של הספקים המשויכים.",
      ],
      mistakesHe: [
        "יצירת יותר מדי קטגוריות פרטניות — קושי-תחזוקה.",
        "אי-מינוי Category Manager — אין בעלות על התחום.",
      ],
      troubleshootHe: [
        "קטגוריה לא מציגה ספקים ➔ ספקים לא שויכו או הרשאות-תפקיד חסרות.",
        "Scorecard ריק ברמת-קטגוריה ➔ אין נתוני-הערכה לספקי-הקטגוריה.",
      ],
      bestPracticeHe: [
        "מנה Category Manager לכל קטגוריה — בעלות ברורה.",
        "שמור היררכיה רדודה ועקבית; הימנע מכפילויות.",
      ],
      interviewHe: [
        { qHe: "מהי Purchasing Category?", aHe: "אובייקט המקבץ ספקים, חומרים ומדדים תחת תחום-אספקה אחד; יחידת-הניהול האסטרטגית של הרכש ובסיס ל-Combined Scorecard." },
        { qHe: "מי אחראי על Purchasing Category?", aHe: "Category Manager — בעל-התפקיד המנהל את ספקי-הקטגוריה, ההוצאה והמדדים שלה." },
      ],
      takeawaysHe: [
        "Purchasing Category = יחידת-הניהול האסטרטגית של הרכש.",
        "מקבצת ספקים, חומרים, KPIs ומסמכים תחת תחום אחד.",
        "בסיס ל-Spend analysis ול-Combined Scorecard.",
      ],
      relatedHe: [
        { labelHe: "MM · Combined Scorecard (13.3.6)", href: "/library/mm/chapter-13/#sub-13.3.6" },
      ],
      children: [
        {
          id: "13.2.1", titleHe: "יצירת Purchasing Category", titleEn: "Create a Purchasing Category",
          execHe:
            "יצירת Purchasing Category מקימה את יחידת-הניהול: הגדרת מזהה, שם, אחראי (Category Manager), ושיוך ראשוני של ספקים וחומרים. זהו צעד-הבסיס שכל ניהול-הקטגוריה וההערכה נשענים עליו.",
          beginnerHe:
            "כאן 'פותחים תיקייה חדשה': נותנים לה שם (למשל 'Packaging'), קובעים מי אחראי עליה, ומתחילים להכניס אליה ספקים וחומרים שייכים.",
          consultantHe:
            "באפליקציית Manage Purchasing Categories (F4144) יוצרים קטגוריה: מזהה, תיאור, Manager, היררכיה (parent), ומשייכים Suppliers/Materials/Documents. אפשר לקבוע KPIs ויעדים. הקטגוריה נשמרת כ-ELM_CATEGORY ומשמשת מיד את ה-Scorecard וניתוח-ההוצאה.",
          purposeHe:
            "להקים את מסגרת-הניהול לתחום-אספקה — מבלי קטגוריה אין ריכוז-ספקים, אין ניתוח-הוצאה ואין Combined Scorecard.",
          processExampleHe:
            "מנהל-רכש יוצר קטגוריה 'Packaging-PET', ממנה Category Manager, משייך 5 ספקי-PET ואת חומרי-ה-PET, ומגדיר KPI יעד לזמן-אספקה — הקטגוריה פעילה.",
          cbcHe:
            "ב-CBC נוצרת קטגוריה 'Sweeteners', מנהל-הקטגוריה ממונה, ומשויכים ספקי-הסוכר וה-HFCS עם חומרי-הגלם שלהם; היעד: 98% אצוות-תקינות.",
          navHe: [
            "Fiori ► Manage Purchasing Categories ► Create (F4144)",
            "SPRO ► Supplier and Category Management ► Purchasing Category ► Define Number Ranges",
          ],
          tables: ["ELM_CATEGORY", "LFM1"],
          tcodes: ["BP"],
          fiori: ["F4144"],
          configHe: [
            "הגדר טווח-מספרים (Number Range) לקטגוריות.",
            "ב-F4144: צור קטגוריה — מזהה, תיאור, Manager, parent, KPIs.",
            "שייך Suppliers, Materials ו-Documents לקטגוריה.",
          ],
          flow: [
            { he: "צור קטגוריה", code: "F4144" },
            { he: "מנה Manager", code: "Assign" },
            { he: "שייך ספקים/חומרים", code: "Link" },
            { he: "הגדר KPIs", code: "Targets" },
          ],
          masterDataHe: ["ELM_CATEGORY = רשומת-הקטגוריה; קישורים לספקים/חומרים/מסמכים."],
          mistakesHe: [
            "יצירת קטגוריה ללא Manager — בעלות לא-ברורה.",
            "אי-שיוך ספקים בעת היצירה — קטגוריה ריקה וחסרת-ערך.",
          ],
          troubleshootHe: [
            "לא ניתן לשמור קטגוריה ➔ טווח-מספרים לא הוגדר או שדה-חובה ריק.",
            "ספק לא נשמר בקטגוריה ➔ אינו Business Partner פעיל עם תפקיד Supplier.",
          ],
          bestPracticeHe: [
            "הגדר KPIs ויעדים כבר ביצירה — לא בדיעבד.",
            "שייך Category Manager מיד; קטגוריה ללא-בעלים מתנוונת.",
          ],
          interviewHe: [
            { qHe: "אילו אלמנטים מגדירים ביצירת Purchasing Category?", aHe: "מזהה, תיאור, Category Manager, היררכיה (parent), ושיוך ספקים/חומרים/מסמכים ו-KPIs." },
          ],
          takeawaysHe: [
            "יצירת-קטגוריה = הקמת מסגרת-הניהול לתחום.",
            "חובה: Manager + שיוך ספקים/חומרים.",
            "נשמרת כ-ELM_CATEGORY וזמינה מיד ל-Scorecard.",
          ],
        },
        {
          id: "13.2.2", titleHe: "ניהול שוטף של Purchasing Category", titleEn: "Managing a Purchasing Category",
          execHe:
            "לאחר היצירה, ניהול-הקטגוריה הוא עבודה שוטפת: הוספה/הסרה של ספקים, עדכון KPIs, צירוף מסמכי-חוזים, מעקב אחר Spend ו-Scorecards, וקבלת-החלטות אסטרטגיות לתחום. זהו לוח-המחוונים היומיומי של מנהל-הקטגוריה.",
          beginnerHe:
            "אחרי שפתחנו את התיקייה, צריך לתחזק אותה: להוסיף ספקים חדשים, להוציא ספקים שעזבו, לעדכן יעדים, ולעקוב אחרי הביצועים — בדיוק כמו ניהול-צוות מתמשך.",
          consultantHe:
            "ב-F4144 ה-Category Manager מתחזק את הקטגוריה: שיוך/ביטול-שיוך ספקים וחומרים, ניהול מסמכים (חוזים, אישורים), עדכון KPIs, וצפייה ב-Spend ו-Scorecard המתעדכנים. הקטגוריה מתממשקת ל-Sourcing (RFQ/Contract) ול-Operational Supplier Evaluation.",
          purposeHe:
            "לשמור את הקטגוריה רלוונטית ומדויקת לאורך-זמן — בסיס-ספקים מעודכן, יעדים נכונים, ותמונת-ביצועים שוטפת לקבלת-החלטות.",
          processExampleHe:
            "מנהל-קטגוריה רואה שספק ירד ב-Scorecard, מוסיף ספק-חלופי לקטגוריה, מצרף את חוזהו, ומעדכן את יעד-המחיר בעקבות מגמת-שוק.",
          cbcHe:
            "ב-CBC מנהל קטגוריית 'Closures' מסיר ספק-פקקים שכשל בביקורת-איכות, מוסיף ספק-חלופי שאושר, ומצרף את אישורי-המזון שלו — הכל בתוך הקטגוריה.",
          navHe: [
            "Fiori ► Manage Purchasing Categories ► Edit (F4144)",
            "Fiori ► Supplier Management ► Category KPIs / Spend",
          ],
          tables: ["ELM_CATEGORY", "LFM1"],
          tcodes: ["BP", "ME6H"],
          fiori: ["F4144", "F1500"],
          configHe: [
            "אפשר עריכת-קטגוריה והרשאות ל-Category Manager.",
            "חבר את הקטגוריה ל-Spend analysis ו-Operational Supplier Evaluation.",
          ],
          mistakesHe: [
            "אי-עדכון בסיס-הספקים — ספקים לא-פעילים נשארים בקטגוריה.",
            "התעלמות מ-Scorecards — ניהול-קטגוריה ללא נתונים.",
          ],
          troubleshootHe: [
            "שינויים לא נשמרים ➔ הרשאות-עריכה חסרות ל-Manager.",
            "Spend לא מתעדכן ➔ הקטגוריה לא מקושרת לנתוני-הרכש.",
          ],
          bestPracticeHe: [
            "סקור את הקטגוריה תקופתית — הסר ספקים לא-פעילים, עדכן יעדים.",
            "נהל החלטות לפי Scorecard, לא לפי תחושה.",
          ],
          interviewHe: [
            { qHe: "אילו פעולות כולל ניהול שוטף של Purchasing Category?", aHe: "שיוך/הסרת ספקים וחומרים, ניהול מסמכים, עדכון KPIs, ומעקב Spend ו-Scorecards." },
          ],
          takeawaysHe: [
            "ניהול-קטגוריה = עבודה שוטפת, לא חד-פעמית.",
            "כולל בסיס-ספקים, מסמכים, KPIs ו-Scorecards.",
            "לוח-המחוונים של ה-Category Manager.",
          ],
        },
        {
          id: "13.2.3", titleHe: "תרגום Purchasing Category", titleEn: "Translating a Purchasing Category",
          execHe:
            "תרגום-הקטגוריה מאפשר להציג את שמותיה ותיאוריה בכמה שפות — קריטי לארגונים רב-לאומיים שבהם מנהלי-קטגוריה במדינות שונות עובדים על אותה קטגוריה בשפת-האם שלהם.",
          beginnerHe:
            "אם הארגון פועל בכמה מדינות, אותה תיקייה צריכה שם בעברית, באנגלית, בערבית וכו'. התרגום שומר את אותה קטגוריה אך מציג אותה לכל משתמש בשפתו.",
          consultantHe:
            "ב-F4144 (או ב-SLC Web-UI) מתחזקים תיאורים תלויי-שפה (language-dependent texts) לקטגוריה. השפות הזמינות תלויות בהגדרות-המערכת (installed languages). המזהה (Category ID) נשאר קבוע; רק הטקסטים מתורגמים — כך שהדיווח והניתוח עקביים בין שפות.",
          purposeHe:
            "לאפשר עבודה רב-לשונית על אותו אובייקט-קטגוריה בלי לשכפל אותו — שקיפות ועקביות בארגון גלובלי.",
          processExampleHe:
            "קטגוריית 'Packaging' מתורגמת ל'אריזה' לעברית ול-'Verpackung' לגרמנית; מנהל בישראל ומנהל בגרמניה רואים אותה קטגוריה בשפתם, עם אותם נתונים.",
          cbcHe:
            "ב-CBC הפועלת באזורים דוברי-עברית ודוברי-ערבית, קטגוריית 'Sweeteners' מתורגמת ל'ממתיקים' ול'محليات' — אותו אובייקט, תצוגה מקומית.",
          navHe: [
            "Fiori ► Manage Purchasing Categories ► Translations (F4144)",
            "SPRO ► Supplier and Category Management ► Purchasing Category ► Languages",
          ],
          tables: ["ELM_CATEGORY", "ELM_CATEGORYT"],
          tcodes: ["BP"],
          fiori: ["F4144"],
          configHe: [
            "ודא שהשפות הנדרשות מותקנות (installed languages) במערכת.",
            "ב-F4144: הזן תיאורים תלויי-שפה לכל שפה נתמכת.",
          ],
          mistakesHe: [
            "ניסיון לתרגם בשפה לא-מותקנת — אינה זמינה.",
            "שינוי ה-Category ID במקום הטקסט — שובר דיווח-בין-שפות.",
          ],
          troubleshootHe: [
            "תרגום לא מופיע למשתמש ➔ שפת-ה-logon שונה או הטקסט לא הוזן לאותה שפה.",
            "שפה חסרה ברשימה ➔ לא מותקנת במערכת.",
          ],
          bestPracticeHe: [
            "תרגם רק לשפות הפעילות בארגון; אל תתרגם הכל לחינם.",
            "שמור את ה-Category ID קבוע; תרגם רק תיאורים.",
          ],
          interviewHe: [
            { qHe: "מה מתורגם בקטגוריה ומה נשאר קבוע?", aHe: "התיאורים תלויי-השפה מתורגמים; ה-Category ID נשאר קבוע כדי לשמור עקביות בדיווח ובניתוח." },
          ],
          takeawaysHe: [
            "תרגום-קטגוריה = תיאורים רב-לשוניים לאותו אובייקט.",
            "ה-ID קבוע; רק הטקסטים מתורגמים.",
            "חיוני לארגון גלובלי רב-לשוני.",
          ],
        },
      ],
    },
    // ============================================================ 13.3
    {
      id: "13.3", titleHe: "הערכת ספקים (Supplier Evaluation)", titleEn: "Supplier Evaluation",
      execHe:
        "הערכת-ספקים היא מנוע המדידה שמתרגם ביצועי-ספק לציון אובייקטיבי. תת-פרק זה מפרק את המנגנון: Scorecard, הערכה פרטנית, וההערכות לפי זמן, איכות, מחיר ושאלון — שמתמזגות ל-Combined Scorecard, ולבסוף ל-Operational Supplier Evaluation מבוסס-HANA. זהו הבסיס לכל החלטת-מקור מבוססת-נתונים.",
      beginnerHe:
        "כאן בונים את 'תעודת-הציונים' ומסבירים מאיפה כל ציון מגיע: ציון-זמן (עמד בזמנים?), ציון-איכות (אצוות תקינות?), ציון-מחיר (תחרותי?), וציון-שאלון (שירות, שיתוף-פעולה). בסוף הכל מתמזג לציון אחד.",
      consultantHe:
        "המנוע הקלאסי משתמש ב-Main Criteria (עד 99) ו-Subcriteria משוקללים. כל תת-קריטריון מקבל ציון בשיטה: Automatic (מ-LIS), Semi-automatic, או Manual (שאלון). ME61 ידני, ME6H רשימה/אוטומטי, ME62/ME63 תצוגה/חישוב. ה-Operational Supplier Evaluation (Fiori, HANA) מחליף בהדרגה את הקלאסי בנתוני-זמן-אמת. ניתן לשלב עם QM Quality Score (/library/qm-academy/chapter-19/).",
      purposeHe:
        "לספק ציון-ספק עקבי, שקוף וניתן-להשוואה — לבחירת-מקור, למשא-ומתן, לתוכניות-שיפור ולהחלטות הסרה.",
      processExampleHe:
        "המערכת אוספת רבעונית: סטיות-זמן-אספקה (LIS), שיעור-דחיות-איכות (QM), סטיית-מחיר, וציוני-שאלון; משקללת לפי המשקלים; ומציגה Combined Scorecard לכל ספק ולכל קטגוריה.",
      cbcHe:
        "ב-CBC ספק-תרכיז מדורג: 95 איכות, 92 זמן, 80 מחיר, 88 שאלון → משולב 90. ספק-פקקים עם 70 באיכות נכנס לתוכנית-שיפור לפני המשך-הזמנות.",
      navHe: [
        "SAP Menu ► Logistics ► MM ► Supplier Evaluation ► Maintain (ME61)",
        "Fiori ► Operational Supplier Evaluation",
        "SPRO ► MM ► Purchasing ► Supplier Evaluation",
      ],
      tables: ["ELBK", "ELBM", "ELBP", "ELBA"],
      tcodes: ["ME61", "ME62", "ME63", "ME6H", "ME65"],
      fiori: ["F1500", "F2853"],
      configHe: [
        "הגדר Main Criteria ו-Subcriteria עם משקלים (Weighting keys).",
        "קבע שיטת-ניקוד לכל תת-קריטריון (Automatic/Semi/Manual).",
        "הגדר Score range (1–100) ו-Smoothing factors.",
      ],
      flow: [
        { he: "Scorecard", code: "13.3.1" },
        { he: "הערכה פרטנית", code: "13.3.2" },
        { he: "זמן/איכות/מחיר/שאלון", code: "13.3.3-5" },
        { he: "Combined Scorecard", code: "13.3.6" },
        { he: "Operational", code: "13.3.7", note: "HANA/Fiori" },
      ],
      masterDataHe: [
        "ELBK = כותרת-הערכה לספק; ELBM/ELBP = ערכי main/subcriteria.",
        "ניזון מ-LIS (info structures S013) ומ-QM Quality Score.",
      ],
      mistakesHe: [
        "משקלים לא-מאוזנים — מטים את הציון-המשולב.",
        "שיטת-ניקוד ידנית לתת-קריטריון שניתן לחשב אוטומטית — בזבוז ואי-עקביות.",
      ],
      troubleshootHe: [
        "ציון-משולב לא מחושב ➔ חסר משקל לתת-קריטריון או נתוני-LIS ריקים.",
        "ספק חסר-הערכה ➔ אין נתוני-תנועה בתקופה.",
      ],
      bestPracticeHe: [
        "מקסם ניקוד-אוטומטי; שמור ידני לקריטריונים איכותניים בלבד.",
        "התאם משקלים לאסטרטגיית-הקטגוריה.",
        "עבור בהדרגה ל-Operational Supplier Evaluation מבוסס-HANA.",
      ],
      interviewHe: [
        { qHe: "כיצד מחושב הציון-המשולב?", aHe: "ממוצע-משוקלל של ה-Main Criteria, כשכל Main Criterion הוא ממוצע-משוקלל של ה-Subcriteria שלו." },
        { qHe: "אילו שיטות-ניקוד קיימות לתת-קריטריון?", aHe: "Automatic (מ-LIS), Semi-automatic, ו-Manual (שאלון/הזנה ידנית)." },
      ],
      takeawaysHe: [
        "הערכה = ציון-משוקלל לפי קריטריונים ותת-קריטריונים.",
        "מקורות-ניקוד: LIS אוטומטי, QM, ושאלונים.",
        "מתכנס ל-Combined Scorecard ול-Operational Evaluation (HANA).",
      ],
      relatedHe: [
        { labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" },
        { labelHe: "MM · קונפיגורציית הערכה (13.4.3)", href: "/library/mm/chapter-13/#sub-13.4.3" },
      ],
      children: [
        {
          id: "13.3.1", titleHe: "כרטיס-ציון הערכת-ספק (Scorecard)", titleEn: "Supplier Evaluation Scorecard",
          execHe:
            "ה-Scorecard הוא התצוגה המסכמת של הערכת-הספק: ציון-משולב בראש, ומתחתיו פירוט הציונים לכל קריטריון-ראשי ותת-קריטריון. הוא הופך נתונים גולמיים לתמונה-ניהולית אחת, ומאפשר השוואה בין ספקים ובין תקופות.",
          beginnerHe:
            "ה-Scorecard הוא 'תעודת-הציונים' עצמה: בראש הציון-הכללי, ומתחתיו טבלת-מקצועות — איכות, זמן, מחיר, שירות — כל אחד עם ציונו. במבט אחד רואים כמה הספק טוב ובמה הוא חזק או חלש.",
          consultantHe:
            "ה-Scorecard מציג את ELBK (ציון-כללי) ו-ELBM/ELBP (פירוט). ב-Fiori (Operational Supplier Evaluation) הוא אינטראקטיבי עם drill-down. הוא משקלל לפי Weighting key, ומציג מגמות-זמן. ה-Combined Scorecard (13.3.6) מאגד מקורות-ניקוד מרובים לכרטיס אחד.",
          purposeHe:
            "לתמצת את כל נתוני-ההערכה לתצוגה אחת קריאה לקבלת-החלטות — מבלי לחפור בטבלאות גולמיות.",
          processExampleHe:
            "מנהל-רכש פותח Scorecard של ספק: ציון-כללי 84; drill-down מגלה איכות 90, זמן 88, מחיר 72 — מזהה שהמחיר הוא נקודת-החולשה ויוצא למשא-ומתן.",
          cbcHe:
            "ב-CBC ה-Scorecard של ספק-סוכר מציג 96 איכות-אצווה, 91 זמן, 78 מחיר — תמונה שמובילה לשיחת-מחיר תוך שמירה על הספק בשל איכותו.",
          navHe: [
            "Fiori ► Operational Supplier Evaluation ► Scorecard",
            "SAP Menu ► MM ► Supplier Evaluation ► Display (ME63)",
          ],
          tables: ["ELBK", "ELBM", "ELBP"],
          tcodes: ["ME63", "ME6H"],
          fiori: ["F1500"],
          configHe: [
            "הגדר את מבנה-ה-Scorecard: אילו Main Criteria/Subcriteria מוצגים.",
            "קבע Weighting key לחישוב הציון-הכללי.",
          ],
          mistakesHe: [
            "הצגת יותר מדי תת-קריטריונים — עומס שמטשטש את התובנה.",
            "הסתכלות על ציון-כללי בלבד בלי drill-down — מפספסים חולשות.",
          ],
          troubleshootHe: [
            "Scorecard ריק ➔ אין נתוני-הערכה לספק בתקופה.",
            "ציון-כללי לא תואם פירוט ➔ משקלים שגויים.",
          ],
          bestPracticeHe: [
            "השתמש ב-drill-down כדי לזהות את מקור-החולשה.",
            "השווה Scorecards בין ספקים באותה קטגוריה.",
          ],
          interviewHe: [
            { qHe: "מה מציג Supplier Evaluation Scorecard?", aHe: "ציון-משולב בראש ופירוט ציוני Main Criteria ו-Subcriteria מתחתיו, עם אפשרות drill-down." },
          ],
          takeawaysHe: [
            "Scorecard = תצוגת-העל של ההערכה.",
            "ציון-כללי + פירוט לפי קריטריונים.",
            "drill-down חושף חוזקות וחולשות.",
          ],
        },
        {
          id: "13.3.2", titleHe: "הערכת-ספק פרטנית", titleEn: "Individual Supplier Evaluation",
          execHe:
            "הערכה פרטנית (Individual) היא הזנה/חישוב ידני של ציון לספק יחיד — בדרך-כלל לקריטריונים שאינם ניתנים לחישוב אוטומטי, כמו רושם-כללי, גמישות או חדשנות. היא משלימה את ההערכה האוטומטית בהיבטים האיכותניים.",
          beginnerHe:
            "לפעמים צריך לתת ציון 'ידני' לספק מסוים — למשל כמה נוח לעבוד איתו או כמה הוא גמיש. זה לא משהו שהמחשב יכול למדוד אוטומטית, אז מזינים אותו ידנית לספק הספציפי.",
          consultantHe:
            "ב-ME61 מבצעים הערכה ידנית לספק נבחר: בוחרים Purchasing Org, ספק, ומזינים ציונים ל-Subcriteria ידניים (Manual scoring method). המערכת מחשבת את ה-Main Criterion וה-Overall score. שימושי לקריטריונים כמו 'Service/Support', 'Innovation', 'Responsiveness'.",
          purposeHe:
            "ללכוד היבטי-ביצוע איכותניים שאין להם נתון-טרנזקציוני — כדי שהציון-המשולב ישקף גם 'רכות' ולא רק מספרים.",
          processExampleHe:
            "קונה מזין ב-ME61 לספק ציון 85 ל-'Flexibility' ו-90 ל-'Technical support' בעקבות ניסיון-עבודה רבעוני; אלה מתמזגים לציון-המשולב.",
          cbcHe:
            "ב-CBC צוות-הרכש מזין ידנית לספק-תרכיז ציון-'Responsiveness' גבוה בשל מענה-מהיר במשבר-אספקה — היבט שלא נמדד אוטומטית אך קריטי.",
          navHe: [
            "SAP Menu ► MM ► Supplier Evaluation ► Maintain (ME61)",
            "Fiori ► Operational Supplier Evaluation ► Maintain Scores",
          ],
          tables: ["ELBK", "ELBP"],
          tcodes: ["ME61"],
          fiori: ["F1500"],
          configHe: [
            "סמן תת-קריטריונים רלוונטיים כ-Manual scoring method.",
            "הגדר טווח-ציון מותר (1–100) להזנה ידנית.",
          ],
          mistakesHe: [
            "הזנה ידנית לקריטריון שניתן לחשב אוטומטית — סובייקטיביות מיותרת.",
            "ציונים ידניים לא-אחידים בין קונים — חוסר-עקביות.",
          ],
          troubleshootHe: [
            "ציון ידני לא נשמר ➔ תת-הקריטריון אינו מוגדר Manual.",
            "ציון-משולב לא משתנה ➔ למשקל-התת-קריטריון אפס.",
          ],
          bestPracticeHe: [
            "הגבל הערכה-ידנית לקריטריונים איכותניים בלבד.",
            "קבע הנחיות-ניקוד אחידות לקונים — להפחתת-סובייקטיביות.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים בהערכה פרטנית-ידנית?", aHe: "לקריטריונים איכותניים שאין להם נתון-טרנזקציוני — שירות, גמישות, חדשנות — דרך ME61 בשיטת Manual." },
          ],
          takeawaysHe: [
            "הערכה פרטנית = ציון ידני לספק יחיד.",
            "משלימה את האוטומטי בהיבטים איכותניים.",
            "ME61 + שיטת Manual scoring.",
          ],
        },
        {
          id: "13.3.3", titleHe: "הערכת-ספק לפי זמן ואיכות", titleEn: "Supplier Evaluation by Time and Quality",
          execHe:
            "שני קריטריונים-אוטומטיים מרכזיים: זמן (Delivery/On-time) ואיכות (Quality). הזמן נמדד מסטיות מועדי-אספקה ומכמויות; האיכות — משיעורי-דחייה ומבדיקות-קבלה (ממשק QM). שניהם ניזונים אוטומטית מנתוני-תנועה, ולכן אובייקטיביים ובני-קיימא.",
          beginnerHe:
            "ציון-זמן בודק 'הספק הגיע בזמן ובכמות הנכונה?'. ציון-איכות בודק 'הסחורה הייתה תקינה או שהיו פגמים?'. שניהם מחושבים אוטומטית מהנתונים שכבר קיימים במערכת — קבלות-טובין ובדיקות.",
          consultantHe:
            "Delivery: תת-קריטריונים On-time delivery performance ו-Quantity reliability, מחושבים מ-GR מול PO (LIS S013, סטיות-תאריך/כמות). Quality: תת-קריטריונים Goods receipt (שיעור-דחייה ב-GR), Quality audit, ו-Complaints/rejection level — ניזונים מ-QM (Quality Score לפי /library/qm-academy/chapter-19/). שיטת-הניקוד Automatic.",
          purposeHe:
            "למדוד אובייקטיבית את שני הממדים החשובים-ביותר באמינות-ספק: עמידה-בזמנים ואיכות-המוצר — בלי הזנה ידנית.",
          processExampleHe:
            "ספק סיפק 100 הזמנות ברבעון: 92 בזמן → ציון-זמן 92; מתוכן 3 אצוות נדחו → ציון-איכות 97. שניהם מחושבים אוטומטית מ-GR ו-QM.",
          cbcHe:
            "ב-CBC איכות-אצווה של חומר-גלם קריטית: דחיית אצוות-סוכר על סמך בדיקת-מעבדה מורידה מיד את ציון-האיכות; איחור-אספקה של בקבוקים מוריד ציון-זמן ומסכן את לוח-המילוי.",
          navHe: [
            "SPRO ► MM ► Purchasing ► Supplier Evaluation ► Define Criteria (Delivery, Quality)",
            "SAP Menu ► MM ► Supplier Evaluation ► Automatic (ME6H)",
          ],
          tables: ["ELBM", "S013", "QMEL"],
          tcodes: ["ME6H", "ME63"],
          fiori: ["F1500"],
          configHe: [
            "הגדר Main Criterion 'Delivery' עם Subcriteria: On-time, Quantity reliability — Automatic מ-LIS.",
            "הגדר Main Criterion 'Quality' עם Subcriteria: GR rejection, Quality audit — ניזון מ-QM.",
            "קבע Date/Quantity variance scoring tables.",
          ],
          mistakesHe: [
            "אי-הפעלת ה-LIS update לרכש — ציוני-זמן ריקים.",
            "אי-חיבור QM Quality Score — ציון-איכות לא מתעדכן.",
          ],
          troubleshootHe: [
            "ציון-זמן ריק ➔ Info structure S013 לא מתעדכנת או אין GR בתקופה.",
            "ציון-איכות לא משתנה ➔ ממשק QM לא פעיל או אין הודעות-איכות.",
          ],
          bestPracticeHe: [
            "ודא עדכון-LIS (S013) פעיל לכל קבלת-טובין.",
            "חבר Quality Score מ-QM לציון-האיכות לעקביות.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושב ציון-הזמן?", aHe: "אוטומטית מסטיות מועד-אספקה (On-time) וכמות (Quantity reliability) ב-GR מול PO, דרך LIS (S013)." },
            { qHe: "מהיכן מגיע ציון-האיכות?", aHe: "מ-QM — שיעורי-דחייה ב-GR, ביקורות-איכות והודעות-איכות; ניתן לשלב Quality Score (ראה QM פרק 19)." },
          ],
          takeawaysHe: [
            "זמן ואיכות = הקריטריונים האוטומטיים המרכזיים.",
            "זמן מ-LIS (S013); איכות מ-QM.",
            "אובייקטיביים ובני-קיימא ללא הזנה ידנית.",
          ],
          relatedHe: [{ labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" }],
        },
        {
          id: "13.3.4", titleHe: "הערכת-ספק לפי מחיר", titleEn: "Supplier Evaluation by Price",
          execHe:
            "קריטריון-המחיר מודד את התחרותיות והיציבות של תמחור-הספק: רמת-מחיר יחסית לשוק (Price level) והתנהגות-מחיר לאורך-זמן (Price history/behavior). הוא מחושב אוטומטית ממסמכי-הרכש ומאפשר זיהוי ספקים יקרים או תנודתיים.",
          beginnerHe:
            "ציון-המחיר בודק 'כמה הספק יקר או זול ביחס לאחרים, והאם המחיר שלו יציב'. ספק שמעלה מחירים בלי-הרף או יקר משמעותית יקבל ציון-מחיר נמוך.",
          consultantHe:
            "שני תת-קריטריונים: Price level (השוואת מחיר-הספק למחיר-שוק/ממוצע-קבוצת-החומר) ו-Price history (מגמת-שינוי מול אינפלציה/שוק). מחושבים אוטומטית מ-info records ומ-PO history. ה-scoring tables קובעות כיצד סטיית-אחוז ממופה לציון 1–100.",
          purposeHe:
            "לאזן את הציון-המשולב — ספק מצוין באיכות אך יקר-מדי או תנודתי מקבל איתות במחיר, לתמיכה במשא-ומתן ובבחירת-מקור.",
          processExampleHe:
            "ספק מתמחר 8% מעל ממוצע-קבוצת-החומר → ציון Price-level נמוך; אך שמר מחיר יציב שנה → ציון Price-history גבוה. השילוב מצייר תמונה מאוזנת.",
          cbcHe:
            "ב-CBC, סוכר הוא commodity תנודתי: ספק ששמר מחיר יציב למרות עליות-שוק מקבל ציון Price-history גבוה — יתרון בבחירת-מקור גם אם מחירו הרגעי מעט גבוה.",
          navHe: [
            "SPRO ► MM ► Purchasing ► Supplier Evaluation ► Define Criteria (Price)",
            "SAP Menu ► MM ► Supplier Evaluation ► Automatic (ME6H)",
          ],
          tables: ["ELBM", "EINE", "EIPA"],
          tcodes: ["ME6H", "ME63"],
          fiori: ["F1500"],
          configHe: [
            "הגדר Main Criterion 'Price' עם Subcriteria: Price level, Price history.",
            "קבע scoring tables הממפות סטיית-מחיר באחוזים לציון.",
          ],
          mistakesHe: [
            "השוואת-מחיר ללא נרמול-מטבע/יחידה — ציון מעוות.",
            "משקל-מחיר גבוה-מדי בקטגוריית-מזון — מדכא איכות.",
          ],
          troubleshootHe: [
            "ציון-מחיר ריק ➔ אין info records או PO history בתקופה.",
            "ציון-מחיר לא-הגיוני ➔ scoring table או מטבע שגויים.",
          ],
          bestPracticeHe: [
            "נרמל מטבע ויחידת-מידה לפני השוואה.",
            "אזן את משקל-המחיר מול איכות לפי טבע-הקטגוריה.",
          ],
          interviewHe: [
            { qHe: "מהם שני תת-הקריטריונים של קריטריון-המחיר?", aHe: "Price level (מחיר יחסי לשוק/קבוצת-חומר) ו-Price history/behavior (יציבות ומגמת-שינוי לאורך-זמן)." },
          ],
          takeawaysHe: [
            "מחיר = רמת-מחיר + התנהגות-מחיר.",
            "מחושב אוטומטית מ-info records ו-PO history.",
            "מאזן את הציון-המשולב לבחירת-מקור.",
          ],
        },
        {
          id: "13.3.5", titleHe: "הערכת-ספק לפי שאלון", titleEn: "Supplier Evaluation by Questionnaire",
          execHe:
            "הערכה-לפי-שאלון לוכדת היבטים-איכותניים שאין להם נתון-טרנזקציוני — קיימות, חדשנות, אחריות-תאגידית, שיתוף-פעולה — דרך שאלונים מובְנים הנשלחים לבעלי-עניין פנימיים או לספק עצמו. הציונים מתמזגים לציון-המשולב לצד הקריטריונים האוטומטיים.",
          beginnerHe:
            "כדי למדוד דברים 'רכים' (כמה הספק ירוק? כמה הוא משתף-פעולה?) שולחים שאלון עם שאלות, אוספים תשובות, וממירים אותן לציון. זה הופך הערכה-סובייקטיבית למובְנית.",
          consultantHe:
            "ב-S/4HANA Supplier and Category Management מנהלים Questionnaires (שאלוני-הערכה) עם שאלות משוקללות וסולמות-תשובה. התשובות מומרות לציון ומשויכות לתת-קריטריון מתאים (Semi-automatic/Manual). שימושי ל-ESG, Compliance, Innovation. הציון נכנס ל-Combined Scorecard.",
          purposeHe:
            "לשלב את הממד-האיכותני בהערכה בצורה מובְנית ועקבית — כדי שהציון-המשולב ישקף גם ערכים אסטרטגיים (קיימות, אתיקה) ולא רק תפעול.",
          processExampleHe:
            "צוות-הרכש שולח שאלון-ESG ל-30 ספקים; התשובות מומרות לציון-קיימות; ספק עם ציון-נמוך נדרש לתוכנית-שיפור-סביבתי.",
          cbcHe:
            "ב-CBC, מחויבות לקיימות קריטית למותג: שאלון-מים-ופחמן נשלח לספקי-אריזה; ציון נמוך פוגע בציון-המשולב ומשפיע על בחירת-מקור — מעבר לפלסטיק-ממוחזר (rPET).",
          navHe: [
            "Fiori ► Supplier Management ► Manage Questionnaires",
            "SPRO ► Supplier and Category Management ► Evaluation ► Questionnaires",
          ],
          tables: ["ELM_QUESTION", "ELBP"],
          tcodes: ["ME61"],
          fiori: ["F1500", "F2853"],
          configHe: [
            "הגדר Questionnaires עם שאלות, משקלים וסולמות-תשובה.",
            "שייך תוצאות-שאלון לתת-קריטריון (Semi-automatic/Manual).",
          ],
          mistakesHe: [
            "שאלונים ארוכים-מדי — שיעור-מענה נמוך.",
            "שאלות לא-ניתנות-לכימות — קושי בהמרה לציון.",
          ],
          troubleshootHe: [
            "ציון-שאלון לא מתעדכן ➔ תשובות לא הוגשו או לא מופו לתת-קריטריון.",
            "שאלון לא נשלח ➔ נמענים/הרשאות לא הוגדרו.",
          ],
          bestPracticeHe: [
            "שמור שאלונים קצרים וניתנים-לכימות.",
            "השתמש בשאלון לקריטריונים איכותניים בלבד (ESG/Compliance).",
          ],
          interviewHe: [
            { qHe: "מתי מתאימה הערכה-לפי-שאלון?", aHe: "להיבטים-איכותניים ללא נתון-טרנזקציוני — קיימות, חדשנות, תאימות, שיתוף-פעולה — דרך שאלונים מובְנים." },
          ],
          takeawaysHe: [
            "שאלון = לכידת היבטים-איכותניים בצורה מובְנית.",
            "תשובות מומרות לציון ומשויכות לתת-קריטריון.",
            "מזין את ה-Combined Scorecard (ESG/Compliance).",
          ],
        },
        {
          id: "13.3.6", titleHe: "כרטיס-ציון משולב (Combined Scorecard)", titleEn: "Combined Scorecard",
          execHe:
            "ה-Combined Scorecard מאחד את כל מקורות-הניקוד — זמן, איכות, מחיר ושאלון — לציון-ספק אחד משוקלל. זהו תוצר-העל של מנוע-ההערכה: תמונה הוליסטית המשמשת לבחירת-מקור, לתיעדוף ולמשא-ומתן ברמת-הספק וברמת-הקטגוריה.",
          beginnerHe:
            "אחרי שיש לנו ציון נפרד לכל תחום (זמן, איכות, מחיר, שאלון), ה-Combined Scorecard 'מערבב' אותם למספר אחד שמסכם את הספק כולו — בדיוק כמו ממוצע-תעודה.",
          consultantHe:
            "הציון-המשולב = Σ (Main Criterion score × Weighting). כל Main Criterion הוא בעצמו ממוצע-משוקלל של ה-Subcriteria. המשקלים נקבעים ב-SPRO ויכולים להשתנות לפי קטגוריה. ב-Operational Supplier Evaluation (HANA) החישוב בזמן-אמת עם drill-down מלא. שילוב QM Quality Score נעשה ברמת ה-Quality criterion.",
          purposeHe:
            "לספק מדד-על אחד, מאוזן ומשוקלל, לכל ספק — שמאפשר השוואה הוגנת, דירוג, והחלטות-מקור אסטרטגיות.",
          processExampleHe:
            "ספק: זמן 90 (×30%), איכות 95 (×40%), מחיר 75 (×20%), שאלון 80 (×10%) → משולב 89. מדורג מול ספקי-הקטגוריה לבחירת-מקור-מועדף.",
          cbcHe:
            "ב-CBC ה-Combined Scorecard נותן משקל-יתר לאיכות (40%) על מחיר (20%) בקטגוריות-מזון — כי בטיחות-המוצר קודמת לחיסכון. ספק עם איכות-מצוינת שורד גם במחיר בינוני.",
          navHe: [
            "Fiori ► Operational Supplier Evaluation ► Combined Scorecard",
            "SAP Menu ► MM ► Supplier Evaluation ► Display (ME63)",
          ],
          tables: ["ELBK", "ELBM", "ELBP"],
          tcodes: ["ME63", "ME6H", "ME65"],
          fiori: ["F1500"],
          configHe: [
            "הגדר משקלים (Weighting) ל-Main Criteria — אפשר פר-קטגוריה.",
            "קבע נוסחת-אגרגציה והצגת ה-Combined Scorecard.",
          ],
          mistakesHe: [
            "משקלים שאינם מסתכמים ל-100% — ציון-משולב מעוות.",
            "אותם משקלים לכל הקטגוריות — מתעלם מטבע-התחום.",
          ],
          troubleshootHe: [
            "ציון-משולב לא תואם רכיביו ➔ שגיאת-משקלים או רכיב חסר-נתונים.",
            "ספק חסר Combined Score ➔ אחד הקריטריונים ריק וחוסם אגרגציה.",
          ],
          bestPracticeHe: [
            "ודא שמשקלי-הקריטריונים מסתכמים ל-100%.",
            "התאם משקלים לכל קטגוריה (איכות > מחיר במזון).",
          ],
          interviewHe: [
            { qHe: "כיצד מחושב ה-Combined Scorecard?", aHe: "סכום-משוקלל של ציוני ה-Main Criteria (כל אחד ממוצע-משוקלל של תת-הקריטריונים שלו), עם משקלים פר-קטגוריה." },
            { qHe: "מדוע משנים משקלים בין קטגוריות?", aHe: "כי טבע-התחום שונה — במזון איכות מקבלת משקל-יתר על מחיר; ב-commodity ההפך." },
          ],
          takeawaysHe: [
            "Combined Scorecard = ציון-על משוקלל מכל המקורות.",
            "משקלים פר-קטגוריה משקפים אסטרטגיה.",
            "בסיס לדירוג ולבחירת-מקור.",
          ],
        },
        {
          id: "13.3.7", titleHe: "הערכת-ספק תפעולית (Operational Supplier Evaluation)", titleEn: "Operational Supplier Evaluation",
          execHe:
            "Operational Supplier Evaluation היא הדור-החדש מבוסס-HANA ו-Fiori: הערכה בזמן-אמת הניזונה ישירות מנתוני-הרכש התפעוליים (הזמנות, קבלות, חשבוניות, הודעות-איכות), עם Scorecards אינטראקטיביים ו-drill-down. היא מחליפה בהדרגה את ME6H/ME61 הקלאסיים בנתונים עדכניים-תמיד.",
          beginnerHe:
            "במקום להריץ דוח-הערכה אחת לרבעון, ה-Operational Evaluation מחשבת את הציונים 'חי' מהנתונים השוטפים. כל קבלה או דחייה מתעדכנת מיד ב-Scorecard ב-Fiori — תמונה תמיד-עדכנית.",
          consultantHe:
            "מבוססת על CDS Views ו-Embedded Analytics על נתוני-הרכש ב-HANA. אפליקציות-Fiori (Operational Supplier Evaluation, Supplier Evaluation Scorecard) מציגות KPIs בזמן-אמת: on-time, quantity, quality, price. אין צורך ב-LIS update תקופתי — הנתונים נקראים live. משתלבת עם QM ועם Purchasing Categories ל-Combined view. ME6H הקלאסי נותר זמין למעבר-הדרגתי.",
          purposeHe:
            "לתת תמונת-הערכה עדכנית-תמיד, אינטראקטיבית ומבוססת-נתונים-חיים — להחלטות-מקור מהירות ומדויקות בלי השהיית-batch.",
          processExampleHe:
            "קונה פותח את ה-Operational Supplier Evaluation: רואה מיד שספק ירד ב-on-time השבוע בעקבות שתי-אספקות-מאחרות; פועל מיד מול הספק במקום להמתין לדוח-רבעוני.",
          cbcHe:
            "ב-CBC, בשיא-עונת-הקיץ ביקוש המשקאות גבוה; ה-Operational Evaluation מתריעה בזמן-אמת על ירידת on-time של ספק-בקבוקים, ומאפשרת ניתוב-מהיר לספק-חלופי לפני שייפגע לוח-המילוי.",
          navHe: [
            "Fiori ► Supplier Management ► Operational Supplier Evaluation",
            "Fiori ► Supplier Evaluation Scorecard",
          ],
          tables: ["ELBK", "ELBM", "S013"],
          tcodes: ["ME6H"],
          fiori: ["F1500", "F2853"],
          configHe: [
            "הפעל את אפליקציות ה-Fiori של Operational Supplier Evaluation (catalog/roles).",
            "ודא CDS Views ו-Embedded Analytics זמינים על נתוני-הרכש.",
            "הגדר KPIs ויעדים בזמן-אמת.",
          ],
          flow: [
            { he: "נתוני-רכש חיים", code: "PO/GR/IV", note: "HANA" },
            { he: "CDS Views", code: "Analytics" },
            { he: "Operational Eval", code: "Fiori", note: "real-time" },
            { he: "Scorecard + drill", code: "F1500" },
          ],
          masterDataHe: [
            "נקרא live מנתוני-רכש (EKKO/EKPO, MSEG/GR, QMEL).",
            "ELBK/ELBM נשמרים לתאימות; החישוב על-בסיס-HANA.",
          ],
          mistakesHe: [
            "ניהול-מקביל קלאסי ו-Operational בלי החלטה — בלבול-מקורות.",
            "אי-הפעלת ה-CDS/Analytics — האפליקציה ריקה.",
          ],
          troubleshootHe: [
            "Operational Evaluation ריקה ➔ CDS Views/Analytics לא הופעלו.",
            "KPIs לא בזמן-אמת ➔ עדיין מסתמך על LIS-batch במקום live.",
          ],
          bestPracticeHe: [
            "עבור ל-Operational Supplier Evaluation לנתונים-חיים; הקפא בהדרגה את הקלאסי.",
            "שלב עם Purchasing Categories ל-Combined view.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Operational Supplier Evaluation לקלאסי?", aHe: "ה-Operational מבוסס-HANA/Fiori, ניזון מנתוני-רכש בזמן-אמת דרך CDS Views — בלי LIS-batch תקופתי; הקלאסי (ME6H) מבוסס-LIS תקופתי." },
            { qHe: "אילו אפליקציות-Fiori מרכזיות בהערכה התפעולית?", aHe: "Operational Supplier Evaluation ו-Supplier Evaluation Scorecard — עם KPIs ו-drill-down בזמן-אמת." },
          ],
          takeawaysHe: [
            "Operational Supplier Evaluation = הדור-החדש מבוסס-HANA/Fiori.",
            "נתוני-רכש חיים, ללא LIS-batch תקופתי.",
            "מחליף בהדרגה את ME6H הקלאסי.",
          ],
          relatedHe: [
            { labelHe: "MM · Combined Scorecard (13.3.6)", href: "/library/mm/chapter-13/#sub-13.3.6" },
            { labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" },
          ],
        },
      ],
    },
    // ============================================================ 13.4
    {
      id: "13.4", titleHe: "קונפיגורציה", titleEn: "Configuration",
      execHe:
        "תת-פרק הקונפיגורציה מרכז את הגדרות-ה-SPRO הנדרשות להפעלת ניהול-הספקים: הקמת Supplier and Category Management (SLC), הגדרות סיווג-וסגמנטציה, והגדרת מנוע הערכת-הספקים. כאן 'מחווטים' המנגנונים שתוארו בתת-הפרקים הקודמים — בלי קונפיגורציה נכונה הם לא יפעלו.",
      beginnerHe:
        "עד כה למדנו 'מה' עושים; כאן לומדים 'איך מכינים את המערכת' לעשות זאת. אלה ההגדרות שמאחורי-הקלעים (ב-SPRO) שמפעילות את הרישום, הסיווג וההערכה — כמו חיווט-חשמל לפני הדלקת-האור.",
      consultantHe:
        "שלוש קבוצות-הגדרה: (1) Supplier and Category Management — הפעלת ה-SLC, BP roles, Number ranges, Web-UI/RFC; (2) Classification/Segmentation — Purchasing Category settings, היררכיה, תרגום; (3) Supplier Evaluation — Main Criteria/Subcriteria, משקלים, scoring methods, ו-Embedded Analytics ל-Operational. רוב ההגדרות תחת SPRO ► Materials Management ► Purchasing ► Supplier Evaluation וב-Supplier and Category Management.",
      purposeHe:
        "להפוך את התכן-העסקי למערכת-עובדת: הגדרות שמחברות BP, קטגוריות וקריטריונים כך שהתהליכים ירוצו אוטומטית ועקבית.",
      processExampleHe:
        "יועץ-יישום מקים את הסביבה: מפעיל SLC, מגדיר BP roles, יוצר Purchasing Categories, מגדיר Main Criteria עם משקלים, ומפעיל את אפליקציות ה-Operational Evaluation — ואז התהליך מקצה-לקצה זמין.",
      cbcHe:
        "ב-CBC הקונפיגורציה מותאמת-ענף: קריטריון-איכות במשקל-גבוה, Qualification types לתקני-מזון, וקטגוריות-רכש ייעודיות לתרכיז/סוכר/אריזה — הכל מוגדר ב-SPRO לפני העלייה-לאוויר.",
      navHe: [
        "SPRO ► Materials Management ► Purchasing ► Supplier Evaluation",
        "SPRO ► Supplier and Category Management",
      ],
      tables: ["T147", "T147G", "ELM_CATEGORY"],
      tcodes: ["SPRO", "OMGQ", "ME6H"],
      fiori: ["F1500"],
      configHe: [
        "Supplier and Category Management: הפעלה, BP roles, Number ranges.",
        "Classification/Segmentation: Purchasing Category settings, היררכיה, תרגום.",
        "Supplier Evaluation: Main/Subcriteria, משקלים, scoring methods, Analytics.",
      ],
      flow: [
        { he: "הקמת SLC", code: "13.4.1" },
        { he: "סיווג/סגמנטציה", code: "13.4.2" },
        { he: "מנוע-הערכה", code: "13.4.3" },
        { he: "מערכת-עובדת", code: "Live" },
      ],
      masterDataHe: [
        "T147/T147G = הגדרות הערכת-ספק; ELM_CATEGORY = קטגוריות.",
        "BP roles FLVN00/FLVN01 כתנאי-סף לרשומת-ספק.",
      ],
      mistakesHe: [
        "הגדרת-קריטריונים לפני הבנת-האסטרטגיה — משקלים שגויים.",
        "אי-הפעלת BP roles — לא ניתן ליצור ספקים.",
      ],
      troubleshootHe: [
        "תהליך-ספק לא עובד ➔ SLC/BP roles לא הופעלו ב-SPRO.",
        "הערכה לא רצה ➔ קריטריונים/משקלים לא הוגדרו.",
      ],
      bestPracticeHe: [
        "הגדר אסטרטגיית-הערכה לפני קונפיגורציה.",
        "תעד את כל הגדרות-ה-SPRO לתחזוקה ולביקורת.",
      ],
      interviewHe: [
        { qHe: "מהן שלוש קבוצות-ההגדרה בקונפיגורציית ניהול-ספקים?", aHe: "Supplier and Category Management (SLC), Classification/Segmentation (Purchasing Categories), ו-Supplier Evaluation (קריטריונים/משקלים)." },
      ],
      takeawaysHe: [
        "קונפיגורציה = חיווט המנגנונים העסקיים.",
        "שלוש קבוצות: SLC, סיווג/סגמנטציה, הערכה.",
        "ברובה תחת SPRO ► MM ► Purchasing ► Supplier Evaluation.",
      ],
      children: [
        {
          id: "13.4.1", titleHe: "קונפיגורציית Supplier and Category Management", titleEn: "Supplier and Category Management Configuration",
          execHe:
            "הקמת תשתית ה-Supplier and Category Management (SLC): הפעלת רכיבי ה-Web-UI, הגדרת BP roles לספק, Number ranges, תהליכי-רישום והכשרה, ואינטגרציה (RFC/Portal). זהו הבסיס שעליו נשענים גילוי, הכשרה וקליטה.",
          beginnerHe:
            "כאן 'מתקינים את המנוע' של ניהול-הספקים: מפעילים את המסכים, קובעים איך ספק נראה במערכת (BP role), ומגדירים את תהליכי-הרישום וההכשרה. בלי זה אי-אפשר לקלוט ספקים בכלל.",
          consultantHe:
            "מפעילים את Supplier and Category Management ב-SPRO: BP roles FLVN00/FLVN01, Number ranges לספק ולקטגוריה, Registration/Qualification processes, ו-Web-UI (NWBC/Fiori) עם RFC/portal. נדרש קישור ל-Business Partner customizing ולתפקידי-הרשאה (PFCG). זהו צעד-תשתית כבד אך חד-פעמי.",
          purposeHe:
            "לבסס את התשתית הטכנית לכל מעגל-חיי-הספק — בלעדיה אין רישום, הכשרה, קליטה או קטגוריות.",
          processExampleHe:
            "יועץ מפעיל SLC, מגדיר BP roles ו-Number ranges, מקים תהליך-רישום ושאלוני-הכשרה, ומחבר את ה-Web-UI — ואז ספקים יכולים להירשם ולהיקלט.",
          cbcHe:
            "ב-CBC ההקמה כוללת Qualification types לתקני-מזון (HACCP/ISO 22000) כחלק מתהליך-ההכשרה, כך שכל ספק-מזון חייב לעבור אותם לפני קליטה.",
          navHe: [
            "SPRO ► Supplier and Category Management ► Basic Settings ► Activate",
            "SPRO ► Cross-Application Components ► SAP Business Partner ► Define BP Roles",
          ],
          tables: ["BUT000", "TB003", "ELM_SUPPLIER"],
          tcodes: ["SPRO", "BP", "BUS7"],
          fiori: ["F2853"],
          configHe: [
            "הפעל Supplier and Category Management; הגדר BP roles FLVN00/FLVN01.",
            "הגדר Number ranges לספק ולקטגוריה.",
            "הקם Registration/Qualification processes ו-Web-UI/RFC.",
          ],
          mistakesHe: [
            "אי-הגדרת BP roles — לא ניתן ליצור ספקים.",
            "דילוג על Number ranges — שמירה נכשלת.",
          ],
          troubleshootHe: [
            "לא ניתן ליצור ספק ➔ BP role או Number range חסרים.",
            "Web-UI לא נטען ➔ RFC/portal לא הוגדרו.",
          ],
          bestPracticeHe: [
            "הגדר BP roles ו-Number ranges מוקדם בפרויקט.",
            "תעד את הקמת-ה-SLC במלואה לתחזוקה.",
          ],
          interviewHe: [
            { qHe: "מהם BP roles הנדרשים לספק?", aHe: "FLVN00 (Supplier general) ו-FLVN01 (Supplier purchasing org) — תנאי-סף ליצירת ספק רכישה." },
          ],
          takeawaysHe: [
            "הקמת SLC = תשתית מעגל-חיי-הספק.",
            "BP roles + Number ranges + תהליכי-רישום/הכשרה.",
            "צעד-תשתית חד-פעמי וכבד.",
          ],
        },
        {
          id: "13.4.2", titleHe: "קונפיגורציית סיווג וסגמנטציה", titleEn: "Classification and Segmentation",
          execHe:
            "הגדרות ה-Purchasing Categories: Number ranges, היררכיית-קטגוריות, תכונות-סגמנטציה (Strategic/Preferred/Standard), שפות-תרגום, וקישור ל-Scorecard. כאן מגדירים את מבנה-הסיווג שעליו נשען כל ניהול-הקטגוריה.",
          beginnerHe:
            "כאן קובעים איך ייראו ה'תיקיות' (קטגוריות): כמה רמות-היררכיה, אילו תוויות-חשיבות (אסטרטגי/רגיל), ובאילו שפות. זו ההכנה לפני שמתחילים לפתוח קטגוריות בפועל.",
          consultantHe:
            "ב-SPRO/Fiori מגדירים Category Number ranges, Category hierarchy levels, Segmentation attributes, ושפות-תרגום נתמכות. מקשרים את הקטגוריה למנוע-ההערכה כך שה-Combined Scorecard מחושב ברמת-הקטגוריה. נדרש תיאום עם BP customizing ועם הרשאות Category Manager.",
          purposeHe:
            "לבסס מבנה-סיווג אחיד וניתן-לניהול — כך שכל הקטגוריות יישבו בהיררכיה עקבית, עם סגמנטציה ותרגום מוגדרים-מראש.",
          processExampleHe:
            "יועץ מגדיר היררכיה דו-רמתית (Direct/Indirect → קטגוריות-משנה), תכונות-סגמנטציה ושלוש שפות; מנהלי-הקטגוריה מתחילים לפתוח קטגוריות לפי המבנה.",
          cbcHe:
            "ב-CBC ההיררכיה מפרידה Direct (תרכיז, סוכר, אריזה) מ-Indirect (אחזקה, שירותים), עם סגמנטציה שמסמנת תרכיז כ-Strategic — מבנה שמכוון את כל ניהול-הספקים.",
          navHe: [
            "SPRO ► Supplier and Category Management ► Purchasing Category ► Define Settings",
            "SPRO ► ... ► Purchasing Category ► Number Ranges / Hierarchy / Languages",
          ],
          tables: ["ELM_CATEGORY", "ELM_CATEGORYT"],
          tcodes: ["SPRO", "MEQ1"],
          fiori: ["F4144"],
          configHe: [
            "הגדר Category Number ranges והיררכיית-רמות.",
            "הגדר Segmentation attributes (Strategic/Preferred/Standard).",
            "הגדר שפות-תרגום וקשר ל-Scorecard.",
          ],
          mistakesHe: [
            "היררכיה עמוקה-מדי — קושי-ניהול.",
            "אי-הגדרת תכונות-סגמנטציה — אין ניהול-מובחן.",
          ],
          troubleshootHe: [
            "לא ניתן ליצור קטגוריה ➔ Number range חסר.",
            "סגמנטציה לא זמינה ➔ תכונות לא הוגדרו ב-SPRO.",
          ],
          bestPracticeHe: [
            "תכנן היררכיה רדודה ועקבית מראש.",
            "הגדר סגמנטציה ותרגום לפני פתיחת-קטגוריות.",
          ],
          interviewHe: [
            { qHe: "מה מגדירים בקונפיגורציית סיווג/סגמנטציה?", aHe: "Category Number ranges, היררכיה, Segmentation attributes, שפות-תרגום, וקישור ל-Scorecard." },
          ],
          takeawaysHe: [
            "כאן מוגדר מבנה-הסיווג (קטגוריות + היררכיה).",
            "כולל סגמנטציה ושפות-תרגום.",
            "הכנה לפני פתיחת-קטגוריות בפועל.",
          ],
        },
        {
          id: "13.4.3", titleHe: "קונפיגורציית הערכת-ספקים", titleEn: "Supplier Evaluation Configuration",
          execHe:
            "לב-הקונפיגורציה של ההערכה: הגדרת Main Criteria ו-Subcriteria, משקלים (Weighting keys), scoring methods (Automatic/Semi/Manual), טבלאות-ניקוד, נתוני-רכש-ארגון, והפעלת ה-Embedded Analytics ל-Operational Evaluation. כאן 'נבנה המנוע' שמייצר את ה-Scorecards.",
          beginnerHe:
            "כאן מגדירים את 'כללי-המשחק' של הציונים: אילו מקצועות יש (קריטריונים), כמה כל אחד שווה (משקל), ואיך כל ציון מחושב (אוטומטי/ידני). זו ההגדרה שגורמת לתעודה להופיע נכון.",
          consultantHe:
            "ב-SPRO ► MM ► Purchasing ► Supplier Evaluation: Define Purchasing-Org data, Maintain Main Criteria, Maintain Subcriteria ושיוך scoring method, Define Weighting keys, ו-Scoring/Smoothing tables. ל-Operational מפעילים CDS Views ו-Embedded Analytics. תיאום עם QM (Quality Score) ועם LIS (S013 update). ME6H הקלאסי vs Fiori Operational.",
          purposeHe:
            "להגדיר במדויק כיצד נמדד כל ספק — קריטריונים, משקלים ושיטות-ניקוד — כך שה-Scorecards יהיו עקביים, אובייקטיביים ומותאמי-אסטרטגיה.",
          processExampleHe:
            "יועץ מגדיר 4 Main Criteria (Quality/Delivery/Price/Service), תת-קריטריונים עם scoring methods, ו-Weighting key במשקל-יתר-לאיכות; מפעיל Analytics — ה-Operational Evaluation מתחיל לחשב.",
          cbcHe:
            "ב-CBC הקונפיגורציה נותנת לאיכות 40% ולמחיר 20%, מחברת את ציון-האיכות ל-QM Quality Score (ראה /library/qm-academy/chapter-19/), ומפעילה Analytics לקווי-המילוי — הערכת-ספק מותאמת בטיחות-מזון.",
          navHe: [
            "SPRO ► MM ► Purchasing ► Supplier Evaluation ► Define Purchasing Organization Data",
            "SPRO ► MM ► Purchasing ► Supplier Evaluation ► Maintain Main Criteria / Subcriteria / Weighting Keys",
          ],
          tables: ["T147", "T147G", "T147I", "T147K"],
          tcodes: ["SPRO", "OMGQ", "ME6H"],
          fiori: ["F1500"],
          configHe: [
            "Define Purchasing-Org data (score range, smoothing).",
            "Maintain Main Criteria ו-Subcriteria; שייך scoring method לכל תת-קריטריון.",
            "Define Weighting keys; חבר QM Quality Score ו-LIS update.",
            "הפעל CDS Views/Analytics ל-Operational Supplier Evaluation.",
          ],
          flow: [
            { he: "Purchasing-Org data", code: "OMGQ" },
            { he: "Main Criteria", code: "T147G" },
            { he: "Subcriteria + method", code: "T147I" },
            { he: "Weighting keys", code: "T147K" },
            { he: "Analytics (Operational)", code: "CDS" },
          ],
          masterDataHe: [
            "T147 = Purchasing-Org data; T147G/I = Main/Subcriteria; T147K = Weighting.",
            "קישור ל-QM Quality Score ו-LIS (S013).",
          ],
          mistakesHe: [
            "משקלים שלא מסתכמים ל-100% — ציון מעוות.",
            "scoring method אוטומטי בלי LIS update — ציונים ריקים.",
          ],
          troubleshootHe: [
            "ציונים ריקים ➔ scoring method אוטומטי אך LIS (S013) לא מתעדכן.",
            "Operational Evaluation לא רצה ➔ CDS Views/Analytics לא הופעלו.",
          ],
          bestPracticeHe: [
            "הגדר אסטרטגיית-משקלים לפני קונפיגורציה; ודא סכום 100%.",
            "מקסם scoring אוטומטי; חבר QM ו-Analytics.",
          ],
          interviewHe: [
            { qHe: "אילו אובייקטים מגדירים בקונפיגורציית הערכת-ספק?", aHe: "Purchasing-Org data, Main Criteria, Subcriteria עם scoring method, ו-Weighting keys (T147/T147G/T147I/T147K)." },
            { qHe: "מה נדרש כדי שציון-אוטומטי יעבוד?", aHe: "scoring method = Automatic + עדכון-LIS פעיל (S013) או CDS Views ל-Operational; אחרת הציון ריק." },
          ],
          takeawaysHe: [
            "כאן נבנה מנוע-ההערכה: קריטריונים, משקלים, scoring methods.",
            "T147/T147G/T147I/T147K + QM + LIS/Analytics.",
            "מותאם-אסטרטגיה (משקל-יתר לאיכות במזון).",
          ],
          relatedHe: [
            { labelHe: "MM · Combined Scorecard (13.3.6)", href: "/library/mm/chapter-13/#sub-13.3.6" },
            { labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" },
          ],
        },
      ],
    },
    // ============================================================ 13.5
    {
      id: "13.5", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה כיסה את ניהול-הספקים מקצה-לקצה ב-S/4HANA Sourcing & Procurement: מהותו כמעגל-חיים (גילוי→הכשרה→קליטה→סיווג→סגמנטציה→הערכה), הסיווג דרך Purchasing Category במסגרת Supplier and Category Management, ומנוע הערכת-הספקים — Scorecard, הערכה-פרטנית, וקריטריוני זמן/איכות/מחיר/שאלון המתמזגים ל-Combined Scorecard ול-Operational Supplier Evaluation מבוסס-HANA, וכן הקונפיגורציה שמחווטת הכל.",
      beginnerHe:
        "סיכמנו את כל מסע-הספק: איך מוצאים, בוחנים וקולטים ספק; איך ממיינים אותו לקטגוריה ומסמנים את חשיבותו; ואיך נותנים לו ציון לפי זמן, איכות, מחיר ושאלון — שמתמזג לציון-משולב אחד. לבסוף ראינו את ההגדרות שמפעילות את כל זה.",
      consultantHe:
        "מבחינה ארכיטקטונית: הספק = Business Partner (FLVN00/01, LFA1/LFB1/LFM1); ה-SLC מנהל גילוי/הכשרה/קליטה/קטגוריות; מנוע-ההערכה משתמש ב-Main/Subcriteria (T147*) משוקללים, ניזון מ-LIS ו-QM, ומתפתח ל-Operational Supplier Evaluation מבוסס-CDS/HANA. הקונפיגורציה תחת SPRO ► MM ► Purchasing ► Supplier Evaluation וב-Supplier and Category Management. אינטגרציה הדוקה עם QM (/library/qm-academy/chapter-19/).",
      purposeHe:
        "לקשור את כל החלקים לתמונה-אחת: ניהול-ספקים אינו פעולה בודדת אלא מערכת-משולבת המפחיתה סיכון, מבטיחה תאימות, וממקסמת ערך-רכש דרך החלטות מבוססות-נתונים.",
      processExampleHe:
        "סיכום-המסע: ספק נמצא, מוכשר, נקלט כ-BP, מסווג לקטגוריה ומסומן Strategic; ביצועיו נמדדים אוטומטית בזמן/איכות/מחיר ובשאלון; ה-Combined Scorecard מדרג אותו; וה-Operational Evaluation שומרת את התמונה עדכנית בזמן-אמת.",
      cbcHe:
        "ב-CBC כל זה מבטיח שהבקבוק שיוצא מהקו מכיל רק תרכיז, סוכר ואריזה מספקים כשירים, מדורגים-גבוה ועומדים-בתקני-מזון — מעגל ניהול-ספקים שמגן על המותג ועל הצרכן.",
      navHe: [
        "SPRO ► Materials Management ► Purchasing ► Supplier Evaluation",
        "Fiori ► Supplier Management (Categories · Scorecard · Operational Evaluation)",
      ],
      tables: ["LFA1", "LFM1", "ELM_CATEGORY", "ELBK", "T147"],
      tcodes: ["BP", "MEQ1", "ME6H", "ME61", "ME63"],
      fiori: ["F1500", "F4144", "F2853"],
      configHe: [
        "שלוש שכבות: SLC (קליטה/קטגוריות), Supplier Evaluation (קריטריונים/משקלים), Operational (CDS/HANA).",
        "ספק = Business Partner; קטגוריה = Purchasing Category; ציון = Combined Scorecard.",
      ],
      flow: [
        { he: "מהו ניהול-ספקים", code: "13.1" },
        { he: "סיווג/סגמנטציה", code: "13.2" },
        { he: "הערכת-ספקים", code: "13.3" },
        { he: "קונפיגורציה", code: "13.4" },
        { he: "תמונה-משולבת", code: "13.5" },
      ],
      masterDataHe: [
        "Business Partner (FLVN00/01) · Purchasing Category (ELM_CATEGORY) · Evaluation (T147*/ELBK).",
      ],
      mistakesHe: [
        "טיפול בניהול-ספקים כאוסף-משימות נפרדות במקום כמערכת-אחת.",
        "הזנחת הקונפיגורציה — מנגנונים תקינים שלא מופעלים נכון.",
      ],
      troubleshootHe: [
        "תהליך מקצה-לקצה תקוע ➔ אתר את החוליה: SLC, קטגוריה, קריטריונים או Analytics.",
        "ציונים לא-עקביים ➔ משקלים/scoring methods לא-מיושרים לאסטרטגיה.",
      ],
      bestPracticeHe: [
        "נהל ספקים כמעגל-חיים שלם, לא כאירועים בודדים.",
        "מקסם אוטומציה (LIS/QM/HANA) והשאר ידני לאיכותני בלבד.",
        "שלב הערכת-ספק עם QM ועם Purchasing Categories לתמונה-אחת.",
      ],
      interviewHe: [
        { qHe: "סכם את מעגל-חיי-הספק ב-S/4HANA.", aHe: "גילוי→הכשרה→קליטה (כ-BP)→סיווג ל-Purchasing Category→סגמנטציה→הערכה (Combined Scorecard / Operational) — מעגל מתמשך מבוסס-נתונים." },
        { qHe: "אילו שלושה תחומי-קונפיגורציה מפעילים את ניהול-הספקים?", aHe: "Supplier and Category Management (SLC), Classification/Segmentation, ו-Supplier Evaluation — שלושתם תחת SPRO." },
      ],
      takeawaysHe: [
        "ניהול-ספקים = מערכת-משולבת: קליטה, סיווג, הערכה, קונפיגורציה.",
        "ספק = BP; קטגוריה = Purchasing Category; ציון = Combined Scorecard / Operational.",
        "מפחית סיכון, מבטיח תאימות, וממקסם ערך-רכש מבוסס-נתונים.",
        "אינטגרציה הדוקה עם QM להערכת-איכות-ספק.",
      ],
      relatedHe: [
        { labelHe: "MM · מהו ניהול-ספקים (13.1)", href: "/library/mm/chapter-13/#sub-13.1" },
        { labelHe: "MM · הערכת ספקים (13.3)", href: "/library/mm/chapter-13/#sub-13.3" },
        { labelHe: "QM · הערכת ספקים (פרק 19)", href: "/library/qm-academy/chapter-19/" },
      ],
    },
  ],
};
