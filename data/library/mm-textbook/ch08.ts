// ===== MM Digital Textbook — Chapter 8 (Contract & Scheduling Agreement) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved; SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH8: TextbookChapter = {
  n: 8,
  titleHe: "חוזים והסכמי-תזמון",
  titleEn: "Contract and Scheduling Agreement",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לניהול חוזי-רכש (Purchase Contracts) והסכמי-תזמון (Scheduling Agreements) ב-SAP S/4HANA Sourcing & Procurement. הסכמי-מסגרת (Outline Agreements) הם הסכמים ארוכי-טווח עם ספק לאספקת חומר או שירות במחיר ובתנאים מוסכמים, שמהם נגזרות הזמנות-שחרור (Release Orders) או לוחות-תזמון (Delivery Schedules). כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. דוגמת-העל: CBC — מפעל-בקבוק של Coca-Cola — מנהל חוזים שנתיים לסוכר ולתרכיז (concentrate), והסכמי-תזמון לחומרי-אריזה (בקבוקים, פקקים, תוויות). המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 8.1
    {
      id: "8.1",
      titleHe: "מהו ניהול חוזים והסכמי-תזמון?",
      titleEn: "What Is Contract and Scheduling Agreement Management?",
      execHe:
        "חוזה-רכש והסכם-תזמון הם שני סוגי הסכמי-המסגרת (Outline Agreements) ב-SAP. הסכם-מסגרת הוא התחייבות ארוכת-טווח מול ספק לאספקת חומר/שירות בכמות או בערך מוסכם, לאורך תקופת-תוקף, במחיר ובתנאים קבועים. במקום לנהל מו\"מ על כל הזמנה, הארגון 'נועל' תנאים מראש וגוזר מהם משיכות חוזרות. זהו כלי-ליבה לחיסכון, להבטחת-אספקה ולמשמעת-רכש (פחות Off-Contract Spend).",
      beginnerHe:
        "דמיין מנוי או 'חבילה' שסיכמת עם ספק: 'במשך השנה הקרובה אקנה ממך עד 1,000 טון סוכר במחיר X לטון'. זה החוזה — הוא לא מזמין כלום עדיין, אלא קובע את הכללים. בכל פעם שאתה באמת צריך סחורה, אתה מוציא 'הזמנת-שחרור' שמצביעה על החוזה ויורשת ממנו את המחיר והתנאים. הסכם-תזמון דומה, אבל במקום הזמנות נפרדות אתה נותן לספק לוח-זמנים מפורט של תאריכי-אספקה.",
      consultantHe:
        "שני הסוגים נשמרים באותו מבנה-טבלאות כמו הזמנת-רכש: EKKO (כותרת) ו-EKPO (פריטים), כשהשדה EKKO-BSTYP מבחין ביניהם — 'K' = Contract, 'L' = Scheduling Agreement, 'F' = PO. הבחנה נוספת ב-EKKO-BSART (Document Type, למשל MK/WK/LP/LPA). מסמכי-השחרור מתועדים ב-EKAB (Release Documentation), ולוחות-התזמון של הסכם-התזמון ב-EKET (Schedule Lines). חוזה יכול להיות Quantity Contract (MK) או Value Contract (WK), וכן Centrally-Agreed Contract לריבוי-מפעלים. ב-S/4HANA אפליקציות-Fiori (Manage Purchase Contracts) החליפו את עסקאות ME31K/ME32K, אך הטבלאות והלוגיקה זהות.",
      purposeHe:
        "המטרה העסקית: להמיר רכש טקטי וחוזר ליחס אסטרטגי ארוך-טווח — לנעול מחירים מול תנודתיות-שוק, להבטיח זמינות-חומר קריטי, להפחית עומס-מו\"מ, ולאכוף משמעת-רכש כך שהקנייה מתבצעת מול תנאים מוסכמים ולא 'מהשרוול'. החוזה הוא גם בסיס למדידת-ביצועים: ניצול, נזילות (Leakage) והוצאה-מחוץ-לחוזה.",
      processExampleHe:
        "Source-to-Contract: לאחר מו\"מ עם ספק נוצר חוזה-כמות (ME31K, סוג MK) ל-1,000 טון סוכר במחיר 600 €/טון, תקף שנה. מחלקת-הייצור צריכה 50 טון — נוצרת הזמנת-שחרור (ME21N) עם הפניה לחוזה; המחיר נמשך אוטומטית, והכמות (50) מתועדת ב-EKAB ומקטינה את היתרה הפתוחה לחוזה. כך חוזרים עד מיצוי 1,000 הטון או תום-התוקף.",
      cbcHe:
        "ב-CBC: סוכר ותרכיז (concentrate) הם חומרי-הליבה היקרים ביותר. הרכש חותם חוזה-כמות שנתי לסוכר מול ספק מקומי, וחוזה-ערך לתרכיז מול The Coca-Cola Company (מחיר ליחידה משתנה אך תקציב שנתי נעול). חומרי-אריזה (בקבוקי-PET, פקקים, תוויות) מנוהלים בהסכמי-תזמון בשל צריכתם הרציפה והצורך בלוחות-אספקה מדויקים לקו-המילוי.",
      navHe: [
        "Logistics ► Materials Management ► Purchasing ► Outline Agreement ► Contract ► (ME31K/ME32K/ME33K)",
        "SPRO ► Materials Management ► Purchasing ► Contract ► Define Document Types",
        "Fiori Launchpad ► Procurement ► Manage Purchase Contracts (F1600A)",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "EKET", "T161"],
      tcodes: ["ME31K", "ME32K", "ME33K", "ME31L", "ME21N"],
      fiori: ["F1600A", "F2418", "F3666"],
      configHe: [
        "Document Category (BSTYP): K=Contract, L=Scheduling Agreement, F=PO — נקבע אוטומטית לפי סוג-המסמך.",
        "Document Type (BSART): MK=Quantity Contract, WK=Value Contract, LP/LPA=Scheduling Agreement — מוגדר ב-T161.",
        "Release Documentation: סמן Document Type כך שמסמכי-שחרור מתועדים ב-EKAB (חובה למעקב-ניצול).",
        "טווחי-מספרים נפרדים לכל סוג-מסמך (פנימי/חיצוני) דרך T161 + הקצאה ב-Define Number Ranges.",
      ],
      flow: [
        { he: "מו\"מ ובחירת-ספק", code: "ME41/RFQ", note: "Source-to-Contract" },
        { he: "יצירת הסכם-מסגרת", code: "ME31K/ME31L", note: "Contract / SA" },
        { he: "אישור (Release Strategy)", code: "ME35K", note: "אם נדרש" },
        { he: "משיכה: הזמנת-שחרור / לוח-תזמון", code: "ME21N / ME38" },
        { he: "תיעוד-ניצול", code: "EKAB/EKET" },
        { he: "אנליטיקה (ניצול/נזילות)", code: "ME80RA" },
      ],
      masterDataHe: [
        "Info Record (EINA/EINE) — אופציונלי; מקושר לחוזה למשיכת-מחיר ותנאים.",
        "Source List (EORD) — יכול להפנות רכש לחוזה כמקור-אספקה מועדף/קבוע (Fix indicator).",
        "Vendor Master (LFA1/LFM1) — תנאי-תשלום, מטבע ו-Purchasing Org ברמת-הספק.",
      ],
      mistakesHe: [
        "בלבול בין Contract (K) ל-Scheduling Agreement (L) — שונים בטבלאות-המשנה (EKAB מול EKET) ובתהליך-המשיכה.",
        "אי-סימון Release Documentation — אז ה-EKAB ריק והניצול אינו ניתן-למעקב.",
        "מחיר בחוזה ובהזמנת-השחרור אינם מתואמים — שכחת קישור Info Record / Source List.",
        "חוזה ללא Source List — הרכש ממשיך להזמין מחוץ-לחוזה (Off-Contract Spend).",
      ],
      troubleshootHe: [
        "מחיר לא נמשך להזמנת-השחרור ➔ בדוק שההזמנה מפנה לחוזה ושתנאי-המחיר תקפים לתאריך.",
        "ניצול לא מתעדכן ➔ Release Documentation לא פעיל בסוג-המסמך, או EKAB לא מתמלא.",
        "לא ניתן ליצור הזמנת-שחרור ➔ החוזה מחוץ-לתוקף, חסום, או חורג מכמות/ערך.",
        "סוג-מסמך לא מופיע ➔ לא הוקצה טווח-מספרים או חסר ב-Allowed Item Categories.",
      ],
      bestPracticeHe: [
        "אכוף משיכה מול חוזה דרך Source List עם Fix indicator לחומרים אסטרטגיים.",
        "הפעל תמיד Release Documentation כדי לאפשר אנליטיקת-ניצול.",
        "הפרד טווחי-מספרים לפי סוג (Contract/SA) לזיהוי מהיר.",
        "תאם תנאי-מחיר בחוזה עם Info Record כדי למנוע סטיות בהזמנות-שחרור.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין חוזה להסכם-תזמון?", aHe: "חוזה (BSTYP=K) מנוהל במשיכות דרך הזמנות-שחרור נפרדות (EKAB); הסכם-תזמון (BSTYP=L) מנוהל בלוח-תזמון מפורט של תאריכי-אספקה (EKET) שנשלח לספק כ-Release." },
        { qHe: "באילו טבלאות נשמרים הסכמי-המסגרת?", aHe: "באותן EKKO (כותרת) ו-EKPO (פריטים) כמו PO, עם EKKO-BSTYP מבחין; מסמכי-שחרור ב-EKAB, ולוחות-תזמון ב-EKET." },
        { qHe: "מהו Outline Agreement?", aHe: "הסכם-מסגרת ארוך-טווח מול ספק לאספקת חומר/שירות בתנאים מוסכמים — מטריית-על שתחתיה Contract ו-Scheduling Agreement." },
      ],
      takeawaysHe: [
        "הסכם-מסגרת = התחייבות ארוכת-טווח שממנה נגזרות משיכות.",
        "BSTYP מבחין: K=Contract, L=Scheduling Agreement, F=PO.",
        "חוזה → הזמנות-שחרור (EKAB); הסכם-תזמון → לוחות-תזמון (EKET).",
        "המטרה: נעילת-תנאים, הבטחת-אספקה ומשמעת-רכש.",
      ],
      relatedHe: [
        { labelHe: "MM · הזמנת-רכש", href: "/library/mm/chapter-07/" },
        { labelHe: "אובייקט · EKKO", href: "/library/mm/object/EKKO/" },
      ],
      children: [
        {
          id: "8.1.1",
          titleHe: "סוגי חוזי-רכש",
          titleEn: "Types of Purchase Contracts",
          execHe:
            "שני סוגי-החוזה המרכזיים: חוזה-כמות (Quantity Contract, MK) — התחייבות לכמות-יעד של חומר; וחוזה-ערך (Value Contract, WK) — התחייבות לערך-יעד כספי. נוסף עליהם Centrally-Agreed Contract — חוזה מרכזי שמפעלים שונים מושכים ממנו. בחירת-הסוג קובעת כיצד נמדד הניצול: לפי כמות או לפי ערך.",
          beginnerHe:
            "חוזה-כמות אומר 'אקנה עד 1,000 טון'; כל משיכה מורידה מהכמות. חוזה-ערך אומר 'אוציא עד 500,000 €'; כל משיכה מורידה מהסכום, בלי קשר לכמות. השתמש בכמות כשהמוצר אחיד ואתה מכוון לטונאז'; בערך כשיש פריטים מגוונים ואתה מנהל תקציב.",
          consultantHe:
            "ההבחנה נשמרת ב-EKKO-BSART (MK/WK) ובשדה היעד: יעד-כמות ברמת-הפריט (EKPO-KTMNG) מול ערך-יעד בכותרת (EKKO-KTWRT). חוזה-ערך מתאים גם לחוזה-שירותים (Item Category D). Centrally-Agreed Contract משאיר את שדה-המפעל ריק בכותרת ומאפשר משיכת-מפעלים מרובים, עם תנאי-מחיר ספציפיים-למפעל (Plant-specific conditions).",
          purposeHe:
            "להתאים את מבנה-החוזה לאופי-ההוצאה: כמות לחומרי-בסיס אחידים, ערך לסל-פריטים/שירותים מגוון, ומרכזי לארגון רב-מפעלי שרוצה כוח-קנייה מאוחד.",
          processExampleHe:
            "חוזה-כמות (MK) ל-1,000 טון סוכר: כל משיכה מקטינה את EKPO-KTMNG. במקביל חוזה-ערך (WK) לשירותי-תחזוקה ב-200,000 €: כל הזמנת-שירות מקטינה את EKKO-KTWRT עד מיצוי-התקציב.",
          cbcHe:
            "ב-CBC: סוכר ובקבוקי-PET = חוזי-כמות (טונאז'/יחידות אחידות). תרכיז ושירותי-מעבדה = חוזי-ערך (מחיר משתנה, תקציב נעול). חוזה מרכזי לסוכר משמש את שני מפעלי-המילוי של CBC במדינה.",
          navHe: [
            "Logistics ► MM ► Purchasing ► Outline Agreement ► Contract ► Create (ME31K)",
            "SPRO ► MM ► Purchasing ► Contract ► Define Document Types",
          ],
          tables: ["EKKO", "EKPO", "T161"],
          tcodes: ["ME31K", "ME32K", "ME33K"],
          fiori: ["F1600A"],
          configHe: [
            "MK (Quantity Contract): יעד-כמות ברמת-הפריט (EKPO-KTMNG).",
            "WK (Value Contract): ערך-יעד בכותרת (EKKO-KTWRT); תומך ב-Item Category D (שירות).",
            "Centrally-Agreed: השאר Plant ריק בכותרת; אפשר תנאי-מחיר ספציפיים-למפעל.",
          ],
          mistakesHe: [
            "שימוש בחוזה-כמות לסל-פריטים מגוון — קשה לנהל יעד-כמות לכל פריט.",
            "חוזה-ערך ללא בקרת-ערך-יעד — חריגה מתקציב לא נחסמת אם לא הוגדר.",
          ],
          troubleshootHe: [
            "ניצול מוצג בכמות אך החוזה ערכי ➔ נבחר סוג-מסמך שגוי (MK במקום WK).",
            "מפעל לא יכול למשוך מחוזה מרכזי ➔ הוגדר Plant בכותרת במקום ריק.",
          ],
          bestPracticeHe: [
            "בחר Quantity לחומרים אחידים, Value לסל מגוון/שירותים.",
            "השתמש ב-Centrally-Agreed לאיחוד כוח-קנייה רב-מפעלי.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין MK ל-WK?", aHe: "MK=Quantity Contract (יעד-כמות לפריט, EKPO-KTMNG); WK=Value Contract (ערך-יעד בכותרת, EKKO-KTWRT)." },
            { qHe: "מהו Centrally-Agreed Contract?", aHe: "חוזה מרכזי ללא מפעל בכותרת, שמפעלים שונים מושכים ממנו, עם אפשרות לתנאי-מחיר ספציפיים-למפעל." },
          ],
          takeawaysHe: [
            "Quantity (MK) = יעד-כמות; Value (WK) = יעד-ערך.",
            "Value תומך גם בשירותים (Item Category D).",
            "Centrally-Agreed משרת ריבוי-מפעלים.",
          ],
        },
        {
          id: "8.1.2",
          titleHe: "ניהול חוזי-רכש",
          titleEn: "Manage Purchase Contracts",
          execHe:
            "אפליקציית Fiori 'Manage Purchase Contracts' היא נקודת-העבודה המרכזית ב-S/4HANA ליצירה, עריכה, חיפוש והצגת חוזים — מחליפת-העל של ME31K/ME32K/ME33K. היא מציגה את החוזים בכרטיסיות, מאפשרת מעקב-תוקף וניצול, ומשולבת בתהליכי-אישור.",
          beginnerHe:
            "במקום מסכי-SAP ישנים (עסקאות ME3*), ב-S/4HANA יש מסך-ווב נוח שבו אתה רואה את כל החוזים ברשימה, מסנן לפי ספק/חומר/תוקף, נכנס לחוזה, עורך פריטים ותנאים, ושומר. אותו מידע נשמר באותן טבלאות (EKKO/EKPO).",
          consultantHe:
            "האפליקציה (F1600A) פועלת מעל אותו מודל-נתונים: EKKO/EKPO + תנאי-מחיר (PRCD_ELEMENTS ב-S/4HANA). היא תומכת ב-Mass-actions, ב-Situation Handling (התראות-תוקף) וב-Workflow-Integration. עסקאות ME32K עדיין זמינות לשינוי-Batch ולתסריטי-Legacy, אך ה-best-practice ב-S/4HANA הוא Fiori.",
          purposeHe:
            "לרכז את כל מחזור-החיים של החוזה בכלי אחד, מודרני ונגיש, עם נראות-ניצול בזמן-אמת ושילוב-אישורים — להאיץ עבודת-רכש ולהפחית טעויות.",
          processExampleHe:
            "רוכש פותח את Manage Purchase Contracts, מסנן 'חוזים שתוקפם פג תוך 30 יום', בוחר חוזה-סוכר, מאריך תוקף ומעדכן מחיר, שומר — והשינוי נכנס למסלול-אישור אם מוגדר.",
          cbcHe:
            "ב-CBC צוות-הרכש מנהל את כל חוזי-החומרים (סוכר/תרכיז/אריזה) דרך האפליקציה; דשבורד-התוקף מתריע על חוזים שיש לחדש לפני עונת-הקיץ (שיא-צריכה).",
          navHe: [
            "Fiori Launchpad ► Procurement ► Manage Purchase Contracts (F1600A)",
            "Logistics ► MM ► Purchasing ► Outline Agreement ► Contract ► Change (ME32K)",
          ],
          tables: ["EKKO", "EKPO", "PRCD_ELEMENTS"],
          tcodes: ["ME32K", "ME33K"],
          fiori: ["F1600A", "F2418"],
          configHe: [
            "הקצאת Business Catalog/Role לרוכשים לגישה ל-F1600A.",
            "הפעלת Situation Handling להתראות-תוקף-חוזה.",
            "קישור ל-Workflow לאישור-שינויים (ראה 8.4.2).",
          ],
          mistakesHe: [
            "המשך עבודה ב-ME32K כש-Fiori זמין — אובדן יכולות Mass/Situation.",
            "הרשאות חסרות לקטלוג ה-Fiori ➔ האפליקציה לא מופיעה ב-Launchpad.",
          ],
          troubleshootHe: [
            "החוזה לא נשמר ➔ Workflow-אישור פעיל וממתין; בדוק את תיבת-המשימות.",
            "אפליקציה לא נטענת ➔ הרשאה/קטלוג חסרים, או OData service לא מופעל.",
          ],
          bestPracticeHe: [
            "עבוד דרך Fiori ב-S/4HANA; שמור ME32K ל-Legacy/Batch בלבד.",
            "הגדר Situation Handling לתוקף-חוזה כדי לא לפספס חידושים.",
          ],
          interviewHe: [
            { qHe: "איזו אפליקציה מחליפה את ME31K/ME32K ב-S/4HANA?", aHe: "Manage Purchase Contracts (F1600A) — מעל אותן טבלאות EKKO/EKPO." },
            { qHe: "האם ME32K עדיין עובד ב-S/4HANA?", aHe: "כן, זמין ל-Legacy ול-Batch, אך ה-best-practice הוא Fiori." },
          ],
          takeawaysHe: [
            "Manage Purchase Contracts = נקודת-העבודה המרכזית ב-S/4HANA.",
            "אותו מודל-נתונים (EKKO/EKPO) כמו העסקאות הישנות.",
            "תומכת ב-Mass-actions, Situation Handling ו-Workflow.",
          ],
        },
        {
          id: "8.1.3",
          titleHe: "שינויי-המוניים לחוזה-רכש",
          titleEn: "Mass Changes to Purchase Contract",
          execHe:
            "שינוי-המוני מאפשר לעדכן שדות בכמות גדולה של חוזים/פריטים בפעולה אחת — למשל הארכת-תוקף, עדכון-מחיר או שינוי-Incoterms — במקום עריכה ידנית של כל חוזה. חוסך זמן רב ומפחית טעויות בעדכונים-רוחביים.",
          beginnerHe:
            "כשצריך לשנות את אותו דבר ב-200 חוזים (למשל לדחות תאריך-תפוגה בחודש), לא עוברים אחד-אחד. בוחרים את כל החוזים, מגדירים את השינוי פעם אחת, ומחילים על כולם בבת-אחת.",
          consultantHe:
            "ב-S/4HANA זמין דרך Fiori (Mass Changes to Purchase Contracts) או בעסקה MEMASSCONTRACT. הכלי פועל ברמת-שדה: בוחרים אובייקטים, שדה-יעד וערך-חדש (החלפה/הוספה), מריצים סימולציה, ואז מחילים. שינויים נכתבים לאותן טבלאות (EKKO/EKPO) ועוברים בדיקות-תקינות ו-Release Strategy אם רלוונטי.",
          purposeHe:
            "לבצע עדכונים-רוחביים (מחיר/תוקף/תנאים) ביעילות ובעקביות — חיוני בארגון עם מאות חוזים פעילים שבו שינוי-מדיניות מחייב עדכון-המוני.",
          processExampleHe:
            "לאחר עליית-מחירים מול ספק, הרוכש בוחר את כל חוזי-הספק ב-MEMASSCONTRACT, מעדכן את תנאי-המחיר ב-+5%, מריץ סימולציה לבדיקה, ומחיל — מאות פריטים מתעדכנים בבת-אחת.",
          cbcHe:
            "ב-CBC לאחר עדכון-Incoterms גלובלי, צוות-הרכש משנה את שדה-ה-Incoterms בכל חוזי-האריזה בפעולה אחת; ובסוף-שנה מאריך תוקף לכל החוזים-הפעילים בבת-אחת.",
          navHe: [
            "Fiori Launchpad ► Procurement ► Mass Changes to Purchase Contracts",
            "Logistics ► MM ► Purchasing ► (MEMASSCONTRACT)",
          ],
          tables: ["EKKO", "EKPO"],
          tcodes: ["MEMASSCONTRACT", "ME32K"],
          fiori: ["F1600A"],
          configHe: [
            "הרשאה לעסקת MEMASSCONTRACT / לאפליקציית Mass Changes.",
            "תמיד הרץ Simulation לפני Apply לבדיקת-השפעה.",
            "ודא שהשדות הנערכים אינם נעולים ע\"י Release Strategy פעיל.",
          ],
          mistakesHe: [
            "החלת-שינוי ללא סימולציה ➔ עדכונים שגויים בהיקף-המוני.",
            "עדכון שדה הנעול ע\"י אישור ➔ השינוי נדחה או דורש Re-release.",
          ],
          troubleshootHe: [
            "חלק מהחוזים לא עודכנו ➔ נחסמו ע\"י Release Strategy/בדיקות-תקינות; בדוק את ה-Log.",
            "סימולציה מצליחה אך Apply נכשל ➔ נעילת-רשומה (lock) ע\"י משתמש אחר.",
          ],
          bestPracticeHe: [
            "הרץ סימולציה ובדוק את ה-Log לפני Apply.",
            "בצע שינויים-המוניים בחלונות-תחזוקה כדי למנוע נעילות.",
          ],
          interviewHe: [
            { qHe: "כיצד מבצעים שינוי-המוני לחוזים?", aHe: "דרך MEMASSCONTRACT או אפליקציית Mass Changes — בחירת-אובייקטים, שדה-יעד וערך, סימולציה ואז Apply." },
            { qHe: "מה חובה לעשות לפני Apply?", aHe: "להריץ Simulation ולבדוק את ה-Log כדי למנוע עדכונים שגויים בהיקף." },
          ],
          takeawaysHe: [
            "שינוי-המוני = עדכון רוחבי בפעולה אחת.",
            "MEMASSCONTRACT / Mass Changes app, רמת-שדה.",
            "תמיד סימולציה לפני החלה.",
          ],
        },
      ],
    },
    // ============================================================ 8.2
    {
      id: "8.2",
      titleHe: "ניצול חוזה (Contract Consumption)",
      titleEn: "Contract Consumption",
      execHe:
        "ניצול-החוזה הוא תהליך 'משיכת' אספקה מתוך הסכם-המסגרת באמצעות הזמנות-שחרור (Release Orders). כל משיכה מקטינה את היתרה-הפתוחה — בכמות (חוזה-כמות) או בערך (חוזה-ערך) — ומתועדת ב-EKAB. ניצול הוא לב-המעקב: הוא משקף עד כמה הארגון אכן מנצל את החוזים שעליהם התחייב.",
      beginnerHe:
        "אחרי שיש חוזה, מתחילים 'לצרוך' ממנו. בכל פעם שצריך סחורה, פותחים הזמנה רגילה אבל מצביעים על החוזה — וזה נקרא הזמנת-שחרור. ההזמנה יורשת את המחיר מהחוזה, והכמות/הסכום שהזמנת 'נגרעים' מהחוזה. כך רואים כמה נשאר.",
      consultantHe:
        "הזמנת-שחרור היא PO רגיל (EKKO-BSTYP=F) עם הפניה לחוזה דרך EKPO-KONNR (מספר-חוזה) ו-EKPO-KTPNR (פריט-חוזה). מנגנון-הירידה מתעדכן ב-EKAB (Release Documentation) המצרף כמות/ערך מצטבר. תנאי-המחיר נמשכים מהחוזה (אלא אם נדרס). ב-Source List עם Fix indicator ניתן לכפות שכל רכש לחומר ינותב לחוזה. ה-Open Quantity/Value מחושב כ-(יעד − מצטבר ב-EKAB).",
      purposeHe:
        "לאפשר משיכה מבוקרת ומדידה מההסכם — להבטיח שהמחירים-המוסכמים נאכפים, שהניצול עוקב אחר היעד, ושהארגון מקבל את ההנחות שעבורן נחתם החוזה.",
      processExampleHe:
        "חוזה ל-1,000 טון סוכר. הזמנת-שחרור ראשונה ל-200 טון: EKAB מתעדכן ל-200, יתרה 800. הזמנה שנייה ל-300: מצטבר 500, יתרה 500. דוח ME80RA מציג את הניצול המצטבר ואת היתרה-הפתוחה.",
      cbcHe:
        "ב-CBC קו-המילוי צורך סוכר שבועית. מערכת-ה-MRP מייצרת דרישות-רכש, וה-Source List מנתב אותן אוטומטית לחוזה-הסוכר כהזמנות-שחרור. כך הצריכה השוטפת מנצלת את החוזה ללא התערבות-ידנית.",
      navHe: [
        "Logistics ► MM ► Purchasing ► Purchase Order ► Create (ME21N) — עם הפניה לחוזה",
        "Logistics ► MM ► Purchasing ► Outline Agreement ► (ME80RA) — Release Documentation",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "EORD"],
      tcodes: ["ME21N", "ME80RA", "ME33K"],
      fiori: ["F0842A", "F1600A"],
      configHe: [
        "Release Documentation חייב להיות פעיל בסוג-מסמך-החוזה כדי ש-EKAB יתמלא.",
        "Source List (ME01) עם Fix indicator לניתוב-אוטומטי לחוזה.",
        "תנאי-מחיר בחוזה (Conditions) נמשכים אוטומטית להזמנת-השחרור.",
      ],
      flow: [
        { he: "דרישת-רכש / צורך", code: "MRP/PR" },
        { he: "מקור = חוזה (Source List)", code: "EORD" },
        { he: "הזמנת-שחרור", code: "ME21N", note: "הפניה ל-KONNR/KTPNR" },
        { he: "ירידה מהיתרה", code: "EKAB", note: "כמות/ערך מצטבר" },
        { he: "קבלת-טובין + חשבונית", code: "MIGO/MIRO" },
      ],
      masterDataHe: [
        "EORD (Source List) — מנתב רכש לחוזה כמקור.",
        "EKAB — מתעד את מסמכי-השחרור והניצול המצטבר.",
      ],
      mistakesHe: [
        "יצירת PO רגיל ללא הפניה לחוזה ➔ Off-Contract Spend; הניצול לא מתעדכן.",
        "דריסת-מחיר ידנית בהזמנת-השחרור ➔ אובדן תועלת-החוזה.",
      ],
      troubleshootHe: [
        "יתרת-חוזה לא יורדת ➔ ההזמנה לא מפנה לחוזה, או Release Documentation כבוי.",
        "מחיר שגוי בשחרור ➔ תנאי-מחיר פגי-תוקף בחוזה, או נדרסו ידנית.",
      ],
      bestPracticeHe: [
        "אכוף ניתוב-לחוזה דרך Source List ל-Fix.",
        "אל תאפשר דריסת-מחיר בשחרור ללא הרשאה.",
      ],
      interviewHe: [
        { qHe: "מהי הזמנת-שחרור?", aHe: "PO (BSTYP=F) המפנה לחוזה דרך EKPO-KONNR/KTPNR; יורש את תנאי-החוזה ומקטין את היתרה-הפתוחה." },
        { qHe: "היכן מתועד ניצול-החוזה?", aHe: "בטבלת EKAB (Release Documentation), שמצרפת כמות/ערך מצטבר." },
      ],
      takeawaysHe: [
        "ניצול = משיכה מהחוזה דרך הזמנות-שחרור.",
        "EKAB מתעד את הניצול המצטבר.",
        "Source List מנתב רכש לחוזה אוטומטית.",
      ],
      relatedHe: [{ labelHe: "אובייקט · EKAB", href: "/library/mm/object/EKAB/" }],
      children: [
        {
          id: "8.2.1",
          titleHe: "ניצול חוזה-ערך",
          titleEn: "Value Contract Consumption",
          execHe:
            "בחוזה-ערך (WK) הניצול נמדד בסכום כספי: כל הזמנת-שחרור מקטינה את ערך-היעד (EKKO-KTWRT) בלי קשר לכמות. מתאים לסל-פריטים מגוון, לשירותים, או כשהמחיר משתנה אך התקציב נעול.",
          beginnerHe:
            "חוזה-ערך הוא כמו 'תקציב': יש לך 500,000 € להוציא מול הספק. כל הזמנה גורעת מהתקציב את הסכום שלה, עד שנגמר — לא חשוב כמה פריטים או טונות, רק כמה כסף.",
          consultantHe:
            "ערך-היעד נשמר ב-EKKO-KTWRT; הניצול המצטבר (סכום הזמנות-השחרור) נשמר ב-EKAB ומחושב מולו ל-Open Value. ניתן להגדיר בקרת-חריגה (אזהרה/חסימה) כשהמצטבר עובר את היעד. חוזה-ערך תומך ב-Item Category D (שירות) ובפריט ללא חומר-קבוע (Material Group בלבד).",
          purposeHe:
            "לנהל הוצאה-מגוונת מול תקציב-נעול — אידיאלי לשירותים ולסל-פריטים שבהם הכמות אינה המדד הרלוונטי.",
          processExampleHe:
            "חוזה-ערך לשירותי-תחזוקה ב-200,000 €. כל הזמנת-שירות (ME21N → חוזה) גורעת את ערכה; דוח-ניצול מציג ערך-מנוצל מול Open Value עד מיצוי-התקציב.",
          cbcHe:
            "ב-CBC חוזה-ערך לתרכיז מול The Coca-Cola Company: מחיר ליחידה משתנה לפי נוסחה, אך התקציב-השנתי נעול. כל משיכה גורעת ערך, ולא כמות.",
          navHe: ["Logistics ► MM ► Purchasing ► Outline Agreement ► Contract ► Create ► Document Type WK (ME31K)"],
          tables: ["EKKO", "EKPO", "EKAB"],
          tcodes: ["ME31K", "ME21N", "ME80RA"],
          fiori: ["F1600A"],
          configHe: [
            "הגדר Document Type WK עם ערך-יעד (EKKO-KTWRT) בכותרת.",
            "אפשר Item Category D לשירותים.",
            "הגדר בקרת-חריגת-ערך (אזהרה/חסימה) לפי מדיניות.",
          ],
          mistakesHe: [
            "אי-הגדרת בקרת-חריגה ➔ חריגה מתקציב לא נחסמת.",
            "שימוש בחוזה-ערך לחומר אחיד שעדיף לנהל בכמות.",
          ],
          troubleshootHe: [
            "ערך-מנוצל לא מתעדכן ➔ Release Documentation כבוי או PO לא מפנה לחוזה.",
            "חריגה מערך-יעד לא נחסמה ➔ לא הוגדרה בקרת-חריגה.",
          ],
          bestPracticeHe: [
            "השתמש בחוזה-ערך לשירותים ולסל מגוון.",
            "הפעל בקרת-חריגת-ערך לשמירה על משמעת-תקציב.",
          ],
          interviewHe: [
            { qHe: "כיצד נמדד ניצול בחוזה-ערך?", aHe: "בסכום כספי מצטבר (EKAB) מול ערך-היעד (EKKO-KTWRT), בלי קשר לכמות." },
            { qHe: "מתי מעדיפים חוזה-ערך?", aHe: "לשירותים, לסל-פריטים מגוון, או כשהמחיר משתנה והתקציב נעול." },
          ],
          takeawaysHe: [
            "חוזה-ערך מודד ניצול בכסף (KTWRT).",
            "מתאים לשירותים וסל-פריטים מגוון.",
            "הפעל בקרת-חריגת-ערך.",
          ],
        },
        {
          id: "8.2.2",
          titleHe: "ניצול חוזה-כמות",
          titleEn: "Quantity Contract Consumption",
          execHe:
            "בחוזה-כמות (MK) הניצול נמדד ביחידות-חומר: כל הזמנת-שחרור מקטינה את יעד-הכמות של הפריט (EKPO-KTMNG). מתאים לחומרים אחידים שבהם הטונאז'/היחידות הם המדד.",
          beginnerHe:
            "חוזה-כמות הוא כמו 'כרטיסייה': יש לך 1,000 טון לנצל. כל הזמנה גורעת טונות, עד שנגמר. אתה עוקב אחר כמה כמות נשארה, לא אחר כסף.",
          consultantHe:
            "יעד-הכמות נשמר ב-EKPO-KTMNG ברמת-הפריט; הניצול המצטבר ב-EKAB מחושב מולו ל-Open Quantity. תנאי-מחיר נמשכים מהחוזה לכל הזמנת-שחרור. ניתן להגדיר אזהרה/חסימה בחריגה מהכמות. נפוץ עם Source List לניתוב-אוטומטי של דרישות-MRP.",
          purposeHe:
            "לנהל אספקת-חומר אחיד מול יעד-כמות — מבטיח מחיר-מוסכם ומעקב-טונאז' מדויק לחומרי-בסיס.",
          processExampleHe:
            "חוזה ל-1,000 טון סוכר. הזמנות-שחרור של 200+300 טון מותירות Open Quantity 500. MRP ממשיך לייצר דרישות שמנותבות לחוזה עד מיצוי-הכמות או תום-התוקף.",
          cbcHe:
            "ב-CBC חוזה-כמות שנתי לסוכר (1,000 טון) ולבקבוקי-PET (10M יחידות); הצריכה השבועית של קו-המילוי גורעת מהכמות, והדוח מתריע כשנותרים פחות מ-15%.",
          navHe: ["Logistics ► MM ► Purchasing ► Outline Agreement ► Contract ► Create ► Document Type MK (ME31K)"],
          tables: ["EKPO", "EKAB", "EORD"],
          tcodes: ["ME31K", "ME21N", "ME80RA"],
          fiori: ["F1600A"],
          configHe: [
            "הגדר Document Type MK עם יעד-כמות לפריט (EKPO-KTMNG).",
            "הגדר אזהרה/חסימה בחריגת-כמות.",
            "חבר Source List לניתוב דרישות-MRP לחוזה.",
          ],
          mistakesHe: [
            "אי-עדכון Source List ➔ דרישות-MRP לא מנותבות לחוזה.",
            "ניהול סל-פריטים מגוון בחוזה-כמות ➔ ניהול-יעד מסורבל.",
          ],
          troubleshootHe: [
            "Open Quantity לא יורד ➔ PO לא מפנה לחוזה או Release Documentation כבוי.",
            "MRP יוצר רכש מחוץ-לחוזה ➔ Source List ללא Fix/חוזה לא במקור.",
          ],
          bestPracticeHe: [
            "השתמש בחוזה-כמות לחומרי-בסיס אחידים.",
            "חבר Source List עם Fix לאכיפת-ניתוב.",
          ],
          interviewHe: [
            { qHe: "כיצד נמדד ניצול בחוזה-כמות?", aHe: "ביחידות-חומר מצטברות (EKAB) מול יעד-הכמות בפריט (EKPO-KTMNG)." },
            { qHe: "כיצד מנתבים דרישות-MRP לחוזה-כמות?", aHe: "דרך Source List (EORD) שמגדיר את החוזה כמקור-אספקה, עדיף עם Fix indicator." },
          ],
          takeawaysHe: [
            "חוזה-כמות מודד ניצול ביחידות (KTMNG).",
            "מתאים לחומרי-בסיס אחידים.",
            "Source List מנתב דרישות-MRP לחוזה.",
          ],
        },
      ],
    },
    // ============================================================ 8.3
    {
      id: "8.3",
      titleHe: "דיווח ואנליטיקה של חוזים",
      titleEn: "Contract Reporting and Analytics",
      execHe:
        "מערך אפליקציות-Fiori אנליטיות מספק נראות על בריאות-החוזים: חוזים-לא-מנוצלים, הוצאה-מחוץ-לחוזה (Off-Contract Spend), נזילות (Leakage), פריטים לפי הקצאת-חשבון, ניטור-פריטים ותפוגה. אלה כלי-ה-procurement-intelligence שהופכים נתוני-EKKO/EKPO/EKAB לתובנות-החלטה.",
      beginnerHe:
        "אחרי שיש חוזים והם בשימוש, ההנהלה רוצה לדעת: אילו חוזים לא משתמשים בהם בכלל? כמה כסף 'בורח' לרכישות מחוץ-לחוזה? אילו חוזים עומדים לפוג? לכל שאלה כזו יש דשבורד-Fiori מוכן שמציג את התמונה בלי לחפור בטבלאות.",
      consultantHe:
        "האנליטיקה נשענת על CDS Views מעל EKKO/EKPO/EKAB ועל מנוע-ה-HANA. Off-Contract Spend משווה רכישות לחומר/קבוצת-חומר מול קיום-חוזה תקף; Leakage מודד הוצאה-מול-חוזה שלא נמשכה-נכון; Contract Expiry מנטר תאריכי-תוקף. רבות מהן אינטראקטיביות (drill-down) ומשולבות ב-Manage Purchase Contracts. נדרשות הרשאות-תפקיד והפעלת ה-CDS/OData המתאימים.",
      purposeHe:
        "להפוך את ניהול-החוזים מתגובתי ליזום — לזהות בזבוז (Off-Contract/Leakage), הזדמנויות (חוזים-לא-מנוצלים), וסיכונים (תפוגה) לפני שהם פוגעים בעלות או באספקה.",
      processExampleHe:
        "מנהל-רכש פותח את Off-Contract Spend, מזהה שקטגוריית-אריזה נרכשת 30% מחוץ-לחוזה, חוקר Leakage לאיתור-המקור, ומקים Source List לכפיית-ניתוב — והבזבוז יורד.",
      cbcHe:
        "ב-CBC ה-CPO מנטר רבעונית: Off-Contract Spend לאיתור-רכש 'מהשרוול', Unused Contracts לסגירת-חוזים מתים, ו-Contract Expiry להבטחת-חידוש לפני עונת-הקיץ.",
      navHe: [
        "Fiori Launchpad ► Procurement ► Analytics ► (Off-Contract Spend / Unused Contracts / Contract Leakage)",
        "Logistics ► MM ► Purchasing ► Outline Agreement ► Reporting (ME80RA)",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "EKBE"],
      tcodes: ["ME80RA", "ME2M", "ME2N"],
      fiori: ["F2417", "F3666", "F2419"],
      configHe: [
        "הפעל את ה-CDS Views ואת ה-OData services של אפליקציות-האנליטיקה.",
        "הקצה Business Roles אנליטיים לרוכשים/מנהלים.",
        "ודא Release Documentation פעיל — אחרת נתוני-הניצול חסרים באנליטיקה.",
      ],
      flow: [
        { he: "נתוני-חוזה וניצול", code: "EKKO/EKPO/EKAB" },
        { he: "CDS Views אנליטיים", code: "HANA" },
        { he: "דשבורד-Fiori", code: "Off-Contract/Leakage/Expiry" },
        { he: "תובנה → פעולה", code: "Source List/חידוש" },
      ],
      mistakesHe: [
        "הסתמכות על אנליטיקה כש-Release Documentation כבוי ➔ נתוני-ניצול חלקיים.",
        "התעלמות מ-Off-Contract Spend ➔ אובדן הנחות-החוזה.",
      ],
      troubleshootHe: [
        "דשבורד ריק ➔ CDS/OData לא מופעלים או חסרה הרשאה.",
        "Off-Contract גבוה מהצפוי ➔ חסר Source List/חוזה לקטגוריה.",
      ],
      bestPracticeHe: [
        "סקור Off-Contract Spend ו-Expiry באופן-מחזורי (רבעוני).",
        "תרגם כל תובנה לפעולה: Source List, חידוש, או סגירת-חוזה.",
      ],
      interviewHe: [
        { qHe: "מהי אנליטיקת-Off-Contract Spend?", aHe: "השוואת רכישות לקטגוריה מול קיום-חוזה תקף, לאיתור-רכש שמתבצע מחוץ-לחוזה ומפסיד הנחות." },
        { qHe: "על מה נשענת אנליטיקת-החוזים ב-S/4HANA?", aHe: "על CDS Views מעל EKKO/EKPO/EKAB ומנוע-HANA, חשופות באפליקציות-Fiori אינטראקטיביות." },
      ],
      takeawaysHe: [
        "אנליטיקה הופכת ניהול-חוזים מתגובתי ליזום.",
        "כלי-ליבה: Off-Contract, Leakage, Unused, Expiry.",
        "Release Documentation חיוני לנתוני-ניצול מדויקים.",
      ],
      children: [
        {
          id: "8.3.1",
          titleHe: "חוזים לא-מנוצלים",
          titleEn: "Unused Contracts",
          execHe:
            "אפליקציית Unused Contracts מאתרת חוזים תקפים שלא נמשך מהם דבר (או כמעט) בפרק-זמן נתון — סימן לחוזים-מתים, לתהליך-רכש שעוקף את החוזה, או לחוזה מיותר שצריך לסגור.",
          beginnerHe:
            "לפעמים חותמים חוזה ואז... לא משתמשים בו. הדוח הזה מראה אילו חוזים 'יושבים על המדף' בלי משיכות, כדי שתחליט אם לבטל אותם או לברר למה לא קונים דרכם.",
          consultantHe:
            "האפליקציה משווה חוזים פעילים (EKKO/EKPO תקפי-תוקף) מול תיעוד-ניצול (EKAB) ומסמנת חוזים עם ניצול-אפס/נמוך בחלון-זמן. drill-down מאפשר לבדוק אם קיים Source List, ואם הרכש זרם למקור-אחר.",
          purposeHe:
            "לנקות חוזים-מתים, לזהות עקיפת-חוזים, ולוודא שכל חוזה-שנחתם אכן מספק ערך — או נסגר.",
          processExampleHe:
            "הדוח מציג חוזה-אריזה ב-0% ניצול אחרי חצי-שנה. בדיקה מגלה שאין Source List, והרכש הזמין מספק-אחר. הפתרון: הקמת Source List או סגירת-החוזה.",
          cbcHe:
            "ב-CBC הדוח חושף חוזה-תוויות שלא נוצל מאז שינוי-עיצוב-המותג; ה-CPO מחליט לסגור אותו ולחתום חוזה-חדש לעיצוב-הנוכחי.",
          navHe: ["Fiori Launchpad ► Procurement ► Analytics ► Unused Contracts"],
          tables: ["EKKO", "EKPO", "EKAB"],
          tcodes: ["ME80RA"],
          fiori: ["F2419"],
          configHe: [
            "הגדר חלון-זמן וסף-ניצול לזיהוי 'לא-מנוצל'.",
            "ודא Release Documentation פעיל לנתוני-ניצול אמינים.",
          ],
          mistakesHe: [
            "פירוש 'לא-מנוצל' בלי לבדוק Source List ➔ סגירה-מוקדמת של חוזה-תקין.",
            "התעלמות מחוזים-מתים ➔ ריבוי-נתונים וטשטוש-נראות.",
          ],
          troubleshootHe: [
            "חוזה מסומן לא-מנוצל אך יש רכש ➔ הרכש לא הפנה לחוזה (Off-Contract).",
            "כל החוזים מסומנים לא-מנוצלים ➔ Release Documentation כבוי.",
          ],
          bestPracticeHe: [
            "חקור Source List לפני סגירת-חוזה לא-מנוצל.",
            "סקור רבעונית וסגור חוזים-מתים.",
          ],
          interviewHe: [{ qHe: "מה חושפת אפליקציית Unused Contracts?", aHe: "חוזים תקפים בניצול-אפס/נמוך — סימן לחוזה-מת, לעקיפת-חוזה, או לחוזה-מיותר." }],
          takeawaysHe: ["מאתרת חוזים-מתים/לא-מנוצלים.", "בדוק Source List לפני סגירה.", "תלוי ב-Release Documentation."],
        },
        {
          id: "8.3.2",
          titleHe: "הוצאה מחוץ-לחוזה",
          titleEn: "Off-Contract Spend",
          execHe:
            "Off-Contract Spend מודד רכישות שבוצעו בקטגוריה/חומר שעבורו קיים חוזה תקף — אך לא דרך החוזה. זהו אחד מ-KPI-ים החשובים ב-procurement: כל הוצאה כזו מאבדת את ההנחות והתנאים שהושגו.",
          beginnerHe:
            "יש חוזה לסוכר, אבל מישהו הזמין סוכר מספק-אחר 'כי היה דחוף'. זו הוצאה-מחוץ-לחוזה. הדוח מסכם כמה כסף 'בורח' כך, כדי לסגור את הדליפה.",
          consultantHe:
            "האפליקציה מצליבה רכישות (EKPO/EKBE) מול קיום-חוזה תקף לאותו חומר/Material Group, ומסמנת את ההפרש כ-Off-Contract. drill-down לפי ספק/קטגוריה/רוכש מאפשר לאתר את המקור. הפתרון לרוב Source List עם Fix לכפיית-ניתוב.",
          purposeHe:
            "לאתר ולצמצם דליפת-הוצאה — להגדיל את אחוז-הרכש-המנוהל (Spend-under-Management) ולממש את הנחות-החוזה.",
          processExampleHe:
            "הדוח מראה 30% מרכש-האריזה מחוץ-לחוזה. drill-down חושף רוכש שמזמין מספק-מקומי. תיקון: Source List עם Fix לחוזה — והדליפה נסגרת.",
          cbcHe:
            "ב-CBC הדוח חושף שמהנדסי-התחזוקה קונים חומרי-ניקוי מחוץ-לחוזה-המסגרת; הוקם Source List לכפיית-ניתוב, וההוצאה-מחוץ-לחוזה צנחה.",
          navHe: ["Fiori Launchpad ► Procurement ► Analytics ► Off-Contract Spend"],
          tables: ["EKPO", "EKBE", "EKKO", "EORD"],
          tcodes: ["ME2M", "ME80RA"],
          fiori: ["F2417"],
          configHe: [
            "ודא קישור Material/Material Group בין רכש לחוזה לזיהוי-תקין.",
            "הקם Source List עם Fix לאכיפת-ניתוב לחוזה.",
          ],
          mistakesHe: [
            "קטגוריזציה לא-עקבית (Material Group) ➔ זיהוי-שגוי של Off-Contract.",
            "מדידה ללא פעולת-תיקון ➔ הדליפה נמשכת.",
          ],
          troubleshootHe: [
            "Off-Contract גבוה מהמציאות ➔ חוסר-עקביות ב-Material Group/חומר.",
            "דליפה נמשכת אחרי Source List ➔ ה-Fix indicator לא הוגדר.",
          ],
          bestPracticeHe: [
            "אכוף ניתוב דרך Source List עם Fix.",
            "סקור לפי קטגוריה/רוכש לאיתור-מקור-הדליפה.",
          ],
          interviewHe: [
            { qHe: "מהי Off-Contract Spend?", aHe: "רכש בקטגוריה/חומר שיש לו חוזה תקף — אך בוצע מחוץ-לחוזה, ולכן מאבד את הנחותיו." },
            { qHe: "כיצד מצמצמים Off-Contract Spend?", aHe: "באמצעות Source List עם Fix indicator שמנתב את הרכש לחוזה אוטומטית." },
          ],
          takeawaysHe: ["מודד דליפת-הוצאה מחוץ-לחוזה.", "drill-down לפי ספק/קטגוריה/רוכש.", "Source List+Fix סוגר את הדליפה."],
        },
        {
          id: "8.3.3",
          titleHe: "נזילות-חוזה (Leakage)",
          titleEn: "Contract Leakage",
          execHe:
            "Contract Leakage מודד את הפער בין התנאים-המוסכמים-בחוזה לבין מה-שבפועל-שולם — מחיר גבוה-מהחוזה, ויתור-על-הנחה, או רכש-מקביל. בניגוד ל-Off-Contract (רכש שלא דרך החוזה), Leakage מודד אובדן-ערך גם כשהרכש כן מנותב.",
          beginnerHe:
            "אפילו כשקונים דרך החוזה, לפעמים משלמים יותר מהמחיר-המוסכם, או מפספסים הנחת-כמות. הפער הזה הוא 'נזילות' — כסף שנשפך החוצה אף שהחוזה קיים.",
          consultantHe:
            "האפליקציה משווה תנאי-חוזה (Conditions ב-PRCD_ELEMENTS/חוזה) מול מחיר-ששולם בפועל (EKBE/חשבונית) ומכמתת את ההפרש. מקורות-נזילות נפוצים: דריסת-מחיר ידנית בשחרור, אי-מימוש Scale-Discount, ותנאים פגי-תוקף. הפתרון: אכיפת תנאי-חוזה והגבלת דריסות.",
          purposeHe:
            "להבטיח שהערך-שהוסכם-בחוזה אכן ממומש — לזהות תשלום-יתר ולסגור פערים גם כשהרכש מנותב-נכון.",
          processExampleHe:
            "הדוח מגלה שהזמנות-שחרור לסוכר שולמו 5% מעל מחיר-החוזה בשל דריסה-ידנית. תיקון: ביטול-הרשאת-דריסה ובדיקת-תנאי-מחיר — והנזילות נסגרת.",
          cbcHe:
            "ב-CBC הדוח חושף שהנחת-הכמות (Scale) לתרכיז לא מומשה כי ההזמנות פוצלו מתחת-לסף; איחוד-ההזמנות מימש את ההנחה.",
          navHe: ["Fiori Launchpad ► Procurement ► Analytics ► Contract Leakage"],
          tables: ["EKPO", "EKBE", "PRCD_ELEMENTS"],
          tcodes: ["ME80RA", "ME2M"],
          fiori: ["F3666"],
          configHe: [
            "הגבל הרשאת-דריסת-מחיר בהזמנת-שחרור.",
            "ודא תנאי-Scale תקפים בחוזה למימוש-הנחות.",
          ],
          mistakesHe: [
            "אפשרות-דריסה חופשית בשחרור ➔ תשלום-יתר מול החוזה.",
            "פיצול-הזמנות מתחת-לסף-Scale ➔ אובדן הנחת-כמות.",
          ],
          troubleshootHe: [
            "מחיר-בפועל גבוה מהחוזה ➔ דריסה-ידנית או תנאי פג-תוקף.",
            "הנחת-Scale לא מומשה ➔ הזמנות מתחת-לסף או Scale שגוי.",
          ],
          bestPracticeHe: [
            "הגבל דריסת-מחיר ואכוף תנאי-חוזה.",
            "אחד הזמנות כדי לחצות ספי-Scale ולממש-הנחות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Leakage ל-Off-Contract Spend?", aHe: "Off-Contract = רכש שלא דרך החוזה; Leakage = אובדן-ערך גם כשהרכש מנותב — מחיר-יתר, הנחה-שלא-מומשה." },
            { qHe: "מהם מקורות-נזילות נפוצים?", aHe: "דריסת-מחיר ידנית בשחרור, אי-מימוש Scale-Discount, ותנאי-מחיר פגי-תוקף." },
          ],
          takeawaysHe: ["Leakage = אובדן-ערך גם ברכש-מנותב.", "מקורות: דריסה, הנחה-שלא-מומשה, תנאי פג.", "הגבל דריסות ואכוף תנאים."],
        },
        {
          id: "8.3.4",
          titleHe: "פריטי-חוזה לפי הקצאת-חשבון",
          titleEn: "Purchase Contract Items by Account Assignment",
          execHe:
            "אפליקציה זו מציגה פריטי-חוזה מקובצים לפי קטגוריית-הקצאת-חשבון (Account Assignment Category) — מרכז-עלות, פק\"ע, פרויקט (WBS), נכס וכו'. מספקת נראות תקציבית-חשבונאית של ההתחייבויות-בחוזה.",
          beginnerHe:
            "כל פריט-חוזה לרוב 'מחויב' ליעד-חשבונאי: מחלקה, פרויקט, או הזמנת-עבודה. הדוח מסדר את הפריטים לפי היעד הזה, כדי שכל מחלקה/פרויקט יראה את ההתחייבויות-שלו.",
          consultantHe:
            "ההקצאה נשמרת בשדה EKPO-KNTTP (Account Assignment Category) ובטבלת EKKN (פרטי-הקצאה: Cost Center/WBS/Order). האפליקציה מקבצת לפי KNTTP ומאפשרת drill-down ל-G/L ול-CO-object — חיוני לבקרה-תקציבית ולדיווח-Commitment.",
          purposeHe:
            "לחבר את ניהול-החוזים לבקרה-הפיננסית — להראות לכל מרכז-עלות/פרויקט את התחייבויות-החוזה הרלוונטיות לו.",
          processExampleHe:
            "מנהל-פרויקט פותח את הדוח, מסנן לפי ה-WBS שלו, ורואה את כל פריטי-החוזה המחויבים לפרויקט — בסיס לתחזית-הוצאה תקציבית.",
          cbcHe:
            "ב-CBC חוזי-שירותי-תחזוקה מחויבים למרכזי-עלות-המפעל; הדוח מאפשר למנהל-המפעל לראות את התחייבויות-החוזה לפי מרכז-עלות.",
          navHe: ["Fiori Launchpad ► Procurement ► Analytics ► Purchase Contract Items by Account Assignment"],
          tables: ["EKPO", "EKKN", "EKKO"],
          tcodes: ["ME33K", "ME2K"],
          fiori: ["F2418"],
          configHe: [
            "ודא Account Assignment Category (KNTTP) מוגדרת ומותרת בסוג-המסמך.",
            "תקפיד על EKKN מלא (Cost Center/WBS/Order) לדיווח-תקין.",
          ],
          mistakesHe: [
            "פריט ללא הקצאת-חשבון ➔ לא משויך לתקציב ולא מופיע בקיבוץ.",
            "הקצאה שגויה (CC לא-נכון) ➔ דיווח-Commitment מטעה.",
          ],
          troubleshootHe: [
            "פריט לא מופיע תחת מרכז-עלות ➔ KNTTP/EKKN חסרים או שגויים.",
            "Commitment לא נרשם ב-CO ➔ Account Assignment לא הוזן.",
          ],
          bestPracticeHe: [
            "אכוף הקצאת-חשבון בפריטים תקציביים.",
            "השתמש בדוח לתחזית-Commitment לכל CO-object.",
          ],
          interviewHe: [
            { qHe: "היכן נשמרת הקצאת-החשבון של פריט-חוזה?", aHe: "קטגוריה ב-EKPO-KNTTP, ופרטים (Cost Center/WBS/Order) ב-EKKN." },
            { qHe: "למה משמש הדוח הזה?", aHe: "לקבץ פריטי-חוזה לפי יעד-חשבונאי לבקרה-תקציבית ולדיווח-Commitment לכל CO-object." },
          ],
          takeawaysHe: ["מקבץ פריטי-חוזה לפי הקצאת-חשבון (KNTTP).", "EKKN נושאת CC/WBS/Order.", "מחבר חוזים לבקרה-פיננסית."],
        },
        {
          id: "8.3.5",
          titleHe: "ניטור פריטי-חוזה-רכש",
          titleEn: "Monitor Purchase Contract Items",
          execHe:
            "אפליקציית Monitor Purchase Contract Items נותנת תצוגה תפעולית של פריטי-החוזה: סטטוס, יתרה-פתוחה, ניצול, תוקף וחריגות — נקודת-מבט יומיומית לרוכש לניהול-פעיל של פריטיו.",
          beginnerHe:
            "זה ה'מסך-בקרה' היומי של הרוכש: רואים את כל פריטי-החוזה במקום אחד, כמה נוצל, כמה נשאר, ומה דורש-תשומת-לב — בלי לפתוח כל חוזה בנפרד.",
          consultantHe:
            "האפליקציה מצרפת EKPO + EKAB (ניצול) + תוקף (EKKO) לתצוגה-אחת עם KPI-ים ופילטרים (ספק/חומר/סטטוס/Open). תומכת ב-drill-down לחוזה ולמסמכי-השחרור, ומשמשת לזיהוי-מהיר של פריטים-קרובים-למיצוי או פגי-תוקף.",
          purposeHe:
            "לתת לרוכש שליטה תפעולית שוטפת — לעקוב אחר ניצול ויתרות, לזהות חריגות, ולפעול לפני שפריט נגמר או פג.",
          processExampleHe:
            "הרוכש פותח את ה-Monitor בתחילת-היום, מסנן 'יתרה-פתוחה < 15%', ומזהה שני פריטים שצריך לחדש או להגדיל לפני מיצוי.",
          cbcHe:
            "ב-CBC הרוכש מנטר יומית את פריטי-חוזה-הסוכר; כשהיתרה יורדת מתחת לסף שמספיק לשבועיים-ייצור, הוא יוזם חידוש/הגדלה.",
          navHe: ["Fiori Launchpad ► Procurement ► Monitor Purchase Contract Items"],
          tables: ["EKPO", "EKAB", "EKKO"],
          tcodes: ["ME80RA", "ME33K"],
          fiori: ["F2418", "F1600A"],
          configHe: [
            "הגדר פילטרים/Variants לסטטוסים-קריטיים (Open/Expiring).",
            "ודא Release Documentation פעיל לנתוני-ניצול-אמינים.",
          ],
          mistakesHe: [
            "אי-ניטור-שוטף ➔ פריטים מתמצים/פגים בהפתעה.",
            "הסתמכות על ניצול כש-Release Documentation כבוי ➔ נתון-שגוי.",
          ],
          troubleshootHe: [
            "ניצול לא מוצג ➔ Release Documentation כבוי.",
            "פריט פג-תוקף לא סומן ➔ פילטר/Variant לא כולל תנאי-תוקף.",
          ],
          bestPracticeHe: [
            "הגדר Variant יומי לפריטים-קריטיים.",
            "פעל יזום על פריטים קרובים-למיצוי/תפוגה.",
          ],
          interviewHe: [{ qHe: "למה משמשת אפליקציית Monitor Purchase Contract Items?", aHe: "לתצוגה תפעולית-יומית של פריטי-החוזה — סטטוס, יתרה, ניצול ותוקף — לניהול-פעיל וזיהוי-חריגות." }],
          takeawaysHe: ["מסך-בקרה יומי לפריטי-חוזה.", "מצרף EKPO+EKAB+תוקף.", "מאפשר פעולה-יזומה לפני מיצוי/תפוגה."],
        },
        {
          id: "8.3.6",
          titleHe: "תפוגת-חוזים",
          titleEn: "Contract Expiry",
          execHe:
            "אפליקציית Contract Expiry מנטרת תאריכי-תוקף ומתריעה על חוזים שתוקפם פג או עומד לפוג — קריטי להבטחת-המשכיות-אספקה: חוזה פג משמעו אובדן-תנאים וצורך במו\"מ-מחדש.",
          beginnerHe:
            "לחוזה יש תאריך-תפוגה. אם שוכחים לחדש, פתאום אין חוזה — והקנייה חוזרת למחיר-שוק יקר. הדוח הזה מתריע מראש אילו חוזים פגים, כדי שתספיק לחדש.",
          consultantHe:
            "האפליקציה קוראת את שדה-התוקף (EKKO-KDATE / Validity End) ומסננת חוזים בחלון-תפוגה נתון. משולבת לרוב ב-Situation Handling לדחיפת-התראות אקטיביות לרוכש. drill-down ל-Manage Purchase Contracts לחידוש מיידי.",
          purposeHe:
            "למנוע פערי-אספקה ואובדן-תנאים בשל חוזים-שפגו — להבטיח חידוש-בזמן או מעבר-מסודר לחוזה-חלופי.",
          processExampleHe:
            "הדוח מציג 5 חוזים שיפוגו תוך 30 יום. הרוכש מתעדף, פותח כל אחד דרך drill-down, ומאריך/מחדש לפני התפוגה.",
          cbcHe:
            "ב-CBC כל חוזי-החומרים-הקריטיים מנוטרים; לפני עונת-הקיץ (שיא-צריכה) ה-Expiry-Dashboard מבטיח שאף חוזה-סוכר/תרכיז לא יפוג ללא חידוש.",
          navHe: ["Fiori Launchpad ► Procurement ► Analytics ► Contract Expiry"],
          tables: ["EKKO", "EKPO"],
          tcodes: ["ME80RA", "ME3M"],
          fiori: ["F2419", "F1600A"],
          configHe: [
            "הגדר חלון-התראה (למשל 30/60/90 יום לפני תפוגה).",
            "הפעל Situation Handling לדחיפת-התראות-תפוגה.",
          ],
          mistakesHe: [
            "ניטור-תפוגה ידני בלבד ➔ חוזים נשכחים ופגים.",
            "התראה מאוחרת-מדי ➔ אין זמן למו\"מ-חידוש.",
          ],
          troubleshootHe: [
            "חוזה פג ללא-התראה ➔ Situation Handling לא הופעל או חלון-התראה קצר.",
            "חוזה לא מופיע ב-Expiry ➔ שדה-תוקף ריק/שגוי.",
          ],
          bestPracticeHe: [
            "הפעל Situation Handling עם חלון-התראה מוקדם.",
            "תעדף חידוש לחוזי-חומרים-קריטיים לפני עונות-שיא.",
          ],
          interviewHe: [
            { qHe: "למה משמשת אפליקציית Contract Expiry?", aHe: "לניטור תאריכי-תוקף והתראה על חוזים פגים/פגים-בקרוב — להבטחת-חידוש והמשכיות-אספקה." },
            { qHe: "כיצד הופכים את ההתראה לאקטיבית?", aHe: "דרך Situation Handling, שדוחף התראות-תפוגה לרוכש לפי חלון-זמן מוגדר." },
          ],
          takeawaysHe: ["מנטר תוקף ומתריע על תפוגה.", "Situation Handling דוחף התראות.", "מונע פערי-אספקה ואובדן-תנאים."],
        },
      ],
    },
    // ============================================================ 8.4
    {
      id: "8.4",
      titleHe: "קונפיגורציה (Configuration)",
      titleEn: "Configuration",
      execHe:
        "קונפיגורציית-החוזים ב-SPRO קובעת את ה-DNA של תהליך-החוזה: סוגי-מסמכים, טווחי-מספרים, קטגוריות-פריט מותרות, אסטרטגיות-אישור (Release Strategy) ו-Workflows. תצורה-נכונה היא תנאי-סף לתהליך-חוזה תקין, מבוקר ואכיף.",
      beginnerHe:
        "לפני שמשתמשים בחוזים, מומחה-SAP 'מכין את הקרקע' בהגדרות-מערכת (SPRO): איזה סוגי-חוזה קיימים, מאיזה מספרים הם מתחילים, אילו סוגי-פריטים מותרים, ומי צריך לאשר. בלי ההכנה הזו, המשתמשים לא יוכלו לעבוד נכון.",
      consultantHe:
        "הקונפיגורציה יושבת תחת SPRO ► MM ► Purchasing ► Contract. השדות-המרכזיים: Document Types (T161) הקושרים BSART↔BSTYP↔טווח-מספרים↔Field Selection↔Allowed Item Categories; Number Ranges (פנימי/חיצוני); ו-Release Procedure (אסטרטגיית-אישור עם/בלי Classification). ב-S/4HANA נוסף Flexible Workflow לחוזים — חלופה מודרנית ל-Release Strategy הקלאסי.",
      purposeHe:
        "להבטיח שתהליך-החוזה תואם-מדיניות: סוגים-נכונים, מספור-עקבי, בקרת-פריטים ואישורים — בסיס לתהליך-רכש מבוקר ובר-ביקורת.",
      processExampleHe:
        "מומחה-SAP מגדיר ב-SPRO סוג-מסמך MK עם טווח-מספרים פנימי, Field Selection מתאים, Item Categories מותרים (Standard/Service), ו-Release Strategy לחוזים מעל 100,000 € — וכך תהליך-החוזה נאכף.",
      cbcHe:
        "ב-CBC הוגדרו סוגי-מסמך נפרדים לחוזי-חומרי-גלם ולחוזי-שירותים, טווחי-מספרים מובחנים, ו-Workflow-אישור דו-שלבי (רוכש→מנהל-רכש) לחוזים אסטרטגיים.",
      navHe: [
        "SPRO ► MM ► Purchasing ► Contract ► Define Document Types",
        "SPRO ► MM ► Purchasing ► Contract ► Define Number Ranges",
        "SPRO ► MM ► Purchasing ► Contract ► Release Procedure for Contracts",
      ],
      tables: ["T161", "T16FS", "T161S"],
      tcodes: ["OMET", "SPRO", "ME31K"],
      fiori: ["F1600A"],
      configHe: [
        "Document Types (T161): קישור BSART↔BSTYP↔Number Range↔Field Selection↔Allowed Item Categories.",
        "Number Ranges: הקצאת טווח פנימי/חיצוני לכל סוג-מסמך.",
        "Release Procedure: אסטרטגיית-אישור עם Classification (Characteristics/Class).",
        "Flexible Workflow (S/4HANA): חלופה מודרנית ל-Release Strategy.",
      ],
      flow: [
        { he: "סוגי-מסמך", code: "T161", note: "BSART/BSTYP" },
        { he: "טווחי-מספרים", code: "Number Range" },
        { he: "Field Selection + Item Categories", code: "T16FS" },
        { he: "אישור (Release/Workflow)", code: "Release Strategy" },
      ],
      mistakesHe: [
        "סוג-מסמך ללא טווח-מספרים מוקצה ➔ לא ניתן ליצור חוזה.",
        "Field Selection רופף ➔ שדות-חובה לא נאכפים.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור חוזה בסוג מסוים ➔ טווח-מספרים/Item Category חסרים.",
        "אישור לא מופעל ➔ Release Strategy לא הוגדר/Classification חסרה.",
      ],
      bestPracticeHe: [
        "הגדר סוגי-מסמך נפרדים לחומר ולשירות.",
        "אכוף שדות-חובה דרך Field Selection.",
      ],
      interviewHe: [
        { qHe: "מה קובע Document Type בחוזה?", aHe: "קישור BSART↔BSTYP↔טווח-מספרים↔Field Selection↔Allowed Item Categories — ה-DNA של סוג-החוזה (T161)." },
        { qHe: "מה החלופה ל-Release Strategy ב-S/4HANA?", aHe: "Flexible Workflow לחוזים — מנגנון-אישור מודרני וגמיש." },
      ],
      takeawaysHe: [
        "SPRO קובע את ה-DNA של תהליך-החוזה.",
        "Document Type מקשר סוג↔מספור↔שדות↔פריטים↔אישור.",
        "S/4HANA מציע Flexible Workflow כחלופה ל-Release Strategy.",
      ],
      children: [
        {
          id: "8.4.1",
          titleHe: "הגדרת חוזים (קונפיגורציה)",
          titleEn: "Configuring Contracts",
          execHe:
            "הגדרת-חוזים מקיפה את כל אבני-הבניין: Document Types, Number Ranges, Field Selection, Allowed Item Categories, ו-Release Procedure. כל אחד מהם נדרש כדי שתהליך-החוזה יעבוד נכון, יהיה מבוקר ואכיף.",
          beginnerHe:
            "כאן 'מרכיבים' את החוזה מבחינת-מערכת: קובעים סוגים, מספרים, אילו שדות חובה, אילו פריטים מותרים, ומי מאשר. זו ההגדרה-המרכזית שממנה הכל נגזר.",
          consultantHe:
            "ב-SPRO ► MM ► Purchasing ► Contract מגדירים: Document Types (T161) עם Field Selection Reference (T16FS), Allowed Item Categories (Standard/Subcontracting/Consignment/Service D/Limit), Number Ranges, ו-Link to Release Procedure. כל סוג-מסמך מקושר ל-BSTYP=K ומקבל את התנהגותו מצירוף-ההגדרות הללו.",
          purposeHe:
            "לבסס תהליך-חוזה תקני, מבוקר ובר-אכיפה — שמתאים למדיניות-הרכש של הארגון.",
          processExampleHe:
            "הגדרת MK: BSTYP=K, טווח-מספרים פנימי, Field Selection שמסמן Plant ו-Material כחובה, Item Categories Standard+Service, ו-Release Procedure לחוזים-גדולים.",
          cbcHe:
            "ב-CBC הוגדר MK לחומרי-גלם (Material חובה) ו-WK לשירותים (Item Category D מותר), כל אחד עם Field Selection ו-Release מתאימים.",
          navHe: ["SPRO ► MM ► Purchasing ► Contract ► Define Document Types"],
          tables: ["T161", "T16FS"],
          tcodes: ["OMET", "SPRO"],
          fiori: ["F1600A"],
          configHe: [
            "Document Type (T161): BSART, BSTYP=K, Number Range, Field Selection Ref.",
            "Allowed Item Categories: Standard/Subcontracting/Consignment/Service(D)/Limit.",
            "Field Selection (T16FS): חובה/אופציונלי/מוסתר לכל שדה.",
            "קישור ל-Release Procedure לחוזים.",
          ],
          mistakesHe: [
            "Field Selection רופף ➔ שדות-מפתח (Plant/Material) לא נאכפים.",
            "אי-התרת Item Category D ➔ לא ניתן לנהל חוזה-שירות.",
          ],
          troubleshootHe: [
            "שדה לא-מופיע/לא-חובה ➔ Field Selection Reference שגוי.",
            "Item Category לא-זמין ➔ לא הוגדר ב-Allowed Item Categories.",
          ],
          bestPracticeHe: [
            "הגדר Field Selection מחמיר לשדות-מפתח.",
            "התאם Allowed Item Categories לאופי-החוזה (חומר/שירות).",
          ],
          interviewHe: [
            { qHe: "אילו אבני-בניין כוללת הגדרת-חוזה?", aHe: "Document Types, Number Ranges, Field Selection, Allowed Item Categories, ו-Release Procedure." },
            { qHe: "מה קובע Field Selection?", aHe: "לכל שדה — חובה/אופציונלי/לקריאה/מוסתר; אוכף הזנת-שדות-מפתח." },
          ],
          takeawaysHe: ["הגדרה = סוגים+מספרים+שדות+פריטים+אישור.", "Field Selection אוכף שדות-חובה.", "Allowed Item Categories מתאים לחומר/שירות."],
        },
        {
          id: "8.4.2",
          titleHe: "ניהול Workflows לחוזי-רכש",
          titleEn: "Manage Workflows for Purchase Contracts",
          execHe:
            "Flexible Workflow ב-S/4HANA מאפשר להגדיר תהליכי-אישור גמישים לחוזים — תנאי-הפעלה (ערך/ספק/קטגוריה), שלבי-אישור ומאשרים — דרך אפליקציית-Fiori, כחלופה מודרנית ל-Release Strategy הקלאסי מבוסס-Classification.",
          beginnerHe:
            "לפני שחוזה נכנס-לתוקף, לעיתים צריך אישור-מנהל. Flexible Workflow מאפשר להגדיר בקלות 'אם החוזה מעל 100,000 € — שלח לאישור-מנהל-רכש'. הכל דרך מסך-ווב ידידותי, בלי קונפיגורציה-מורכבת.",
          consultantHe:
            "Flexible Workflow (Manage Workflows for Purchase Contracts) מבוסס על Scenario + Preconditions (Start Conditions) + Step Sequence. בניגוד ל-Release Strategy הקלאסי (Characteristics/Class ב-CL02/Release Codes), הוא מוגדר באפליקציה, תומך בתנאים-עשירים (ערך/ספק/Material Group/מרכז-עלות) ובמאשרים-דינמיים (Role/Responsibility). ניתן להריץ במקביל ל-Release Strategy בתקופת-מעבר.",
          purposeHe:
            "לאכוף בקרת-אישורים גמישה וקלה-לתחזוקה על חוזים — להבטיח שחוזים-מהותיים מאושרים ברמה-המתאימה לפני כניסתם-לתוקף.",
          processExampleHe:
            "מוגדר Workflow: חוזה < 50K → אוטומט; 50K–200K → אישור-מנהל-רכש; > 200K → אישור-CPO. חוזה ב-150K נשלח אוטומטית למנהל-הרכש, שמאשר בתיבת-המשימות.",
          cbcHe:
            "ב-CBC הוגדר Workflow דו-שלבי: חוזי-חומרי-גלם מאושרים ע\"י מנהל-הרכש, וחוזים-אסטרטגיים (סוכר/תרכיז) דורשים גם אישור-CFO בשל היקפם.",
          navHe: [
            "Fiori Launchpad ► Procurement ► Manage Workflows for Purchase Contracts",
            "SPRO ► MM ► Purchasing ► Contract ► Release Procedure for Contracts",
          ],
          tables: ["T161", "SWWWIHEAD", "T16FS"],
          tcodes: ["SWDD", "OMGSCH"],
          fiori: ["F1600A"],
          configHe: [
            "הגדר Scenario + Start Conditions (ערך/ספק/Material Group).",
            "הגדר Step Sequence ומאשרים (Role/Responsibility).",
            "אפשרות להריץ במקביל ל-Release Strategy הקלאסי בתקופת-מעבר.",
          ],
          mistakesHe: [
            "Start Conditions חופפות ➔ הפעלת-Workflow לא-צפויה.",
            "מאשר לא-מוגדר/לא-זמין ➔ חוזה תקוע באישור.",
          ],
          troubleshootHe: [
            "Workflow לא מופעל ➔ Start Conditions לא-מתקיימות או Scenario כבוי.",
            "חוזה תקוע באישור ➔ מאשר לא-זמין; הגדר Substitute/Escalation.",
          ],
          bestPracticeHe: [
            "השתמש ב-Flexible Workflow ב-S/4HANA במקום Release Strategy קלאסי.",
            "הגדר Substitution/Escalation למניעת-תקיעות.",
          ],
          interviewHe: [
            { qHe: "מה היתרון של Flexible Workflow על Release Strategy?", aHe: "הגדרה דרך Fiori, תנאי-הפעלה עשירים (ערך/ספק/קטגוריה) ומאשרים-דינמיים — ללא Classification מורכבת." },
            { qHe: "האם אפשר להריץ את שניהם יחד?", aHe: "כן, ניתן להריץ Flexible Workflow במקביל ל-Release Strategy בתקופת-מעבר." },
          ],
          takeawaysHe: [
            "Flexible Workflow = אישור-חוזים גמיש ב-S/4HANA.",
            "Scenario+Start Conditions+Step Sequence.",
            "חלופה מודרנית ל-Release Strategy הקלאסי.",
          ],
        },
      ],
    },
    // ============================================================ 8.5
    {
      id: "8.5",
      titleHe: "הסכם-תזמון (Scheduling Agreement)",
      titleEn: "Scheduling Agreement",
      execHe:
        "הסכם-תזמון הוא סוג Outline Agreement (BSTYP=L) שבו, במקום הזמנות-שחרור נפרדות, הספק מקבל לוח-תזמון מפורט (Delivery Schedule) של תאריכי וכמויות-אספקה. מתאים לחומרים בצריכה-רציפה וצפויה, ומאפשר אספקה-זורמת (JIT/JIS) עם ניהול-מלאי הדוק.",
      beginnerHe:
        "במקום להזמין שוב ושוב, אתה נותן לספק 'לוח-זמנים': '500 בקבוקים ב-1 לחודש, 500 ב-8, 500 ב-15...'. הספק מספק לפי הלוח. זה הסכם-תזמון — אידיאלי לחומרים שאתה צורך כל הזמן בקצב-קבוע.",
      consultantHe:
        "ההסכם נשמר ב-EKKO (BSTYP=L) ו-EKPO; לוחות-התזמון (Schedule Lines) ב-EKET, ושחרורי-המסירה (JIT/Forecast) ב-EKEH. הספק מקבל Release (סוג: Forecast/JIT) שמתרגם תכנון-MRP ללוח-אספקה. נדרש Release Creation Profile (8.6.4) לקביעת תדירות וטווח-השחרורים. נפוץ עם Source List ל-Fix ועם MRP שמייצר ישירות Schedule Lines.",
      purposeHe:
        "לאפשר אספקה-רציפה ומתוזמנת לחומרים בצריכה-קבועה — להקטין מלאי, לפשט תפעול (פחות מסמכים), ולתמוך ב-JIT/JIS מול הספק.",
      processExampleHe:
        "הסכם-תזמון לבקבוקי-PET. MRP מחשב צריכה שבועית ויוצר Schedule Lines ב-EKET. הסכם מפיק Release (Forecast/JIT) שנשלח לספק, שמספק לפי הלוח; קבלות-הטובין מוקזזות מול לוח-התזמון.",
      cbcHe:
        "ב-CBC כל חומרי-האריזה (בקבוקים/פקקים/תוויות) מנוהלים בהסכמי-תזמון: קו-המילוי צורך ברציפות, MRP מייצר Schedule Lines, והספקים מספקים JIT למחסן-הקו — מלאי-מינימלי ואספקה-זורמת.",
      navHe: [
        "Logistics ► MM ► Purchasing ► Outline Agreement ► Scheduling Agreement ► Create (ME31L)",
        "Logistics ► MM ► Purchasing ► Outline Agreement ► Scheduling Agreement ► Delivery Schedule (ME38)",
        "SPRO ► MM ► Purchasing ► Scheduling Agreement",
      ],
      tables: ["EKKO", "EKPO", "EKET", "EKEH"],
      tcodes: ["ME31L", "ME32L", "ME33L", "ME38", "ME84"],
      fiori: ["F2417A", "F1600A"],
      configHe: [
        "Document Type (LP=ללא Release Doc, LPA=עם Release Documentation/JIT).",
        "Schedule Lines (EKET): תאריך+כמות-אספקה לכל שורה.",
        "Release Creation Profile: תדירות וטווח Forecast/JIT (ראה 8.6.4).",
        "Source List עם Fix לניתוב דרישות-MRP להסכם-התזמון.",
      ],
      flow: [
        { he: "יצירת הסכם-תזמון", code: "ME31L", note: "BSTYP=L" },
        { he: "MRP יוצר Schedule Lines", code: "EKET" },
        { he: "הפקת Release (Forecast/JIT)", code: "ME84", note: "EKEH" },
        { he: "אספקה לפי לוח", code: "MIGO" },
        { he: "קיזוז מול לוח-התזמון", code: "EKET" },
      ],
      masterDataHe: [
        "EKET — לוחות-התזמון (תאריך+כמות לכל שורה).",
        "EKEH — היסטוריית-שחרורים (Forecast/JIT) שנשלחו לספק.",
        "Source List (EORD) — מנתב דרישות-MRP להסכם-התזמון.",
      ],
      mistakesHe: [
        "שימוש בהסכם-תזמון לחומר בצריכה-לא-רציפה ➔ עדיף חוזה רגיל.",
        "ללא Release Creation Profile ➔ שחרורים לא-מופקים אוטומטית.",
      ],
      troubleshootHe: [
        "Schedule Lines לא-נוצרות ➔ Source List חסר/MRP לא מנותב להסכם.",
        "Release לא-נשלח לספק ➔ Release Creation Profile/output חסרים.",
      ],
      bestPracticeHe: [
        "השתמש בהסכם-תזמון לחומרים בצריכה-רציפה (JIT).",
        "חבר Source List עם Fix ו-Release Creation Profile.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין הסכם-תזמון לחוזה?", aHe: "בהסכם-תזמון (BSTYP=L) הספק מקבל לוח-אספקה מפורט (EKET) במקום הזמנות-שחרור נפרדות (EKAB) של החוזה." },
        { qHe: "היכן נשמרים לוחות-התזמון?", aHe: "Schedule Lines ב-EKET, והיסטוריית-השחרורים (Forecast/JIT) ב-EKEH." },
      ],
      takeawaysHe: [
        "הסכם-תזמון (L) = לוח-אספקה מפורט במקום הזמנות נפרדות.",
        "EKET לוחות-תזמון, EKEH היסטוריית-שחרורים.",
        "אידיאלי לצריכה-רציפה ו-JIT.",
      ],
      relatedHe: [{ labelHe: "אובייקט · EKET", href: "/library/mm/object/EKET/" }],
      children: [
        {
          id: "8.5.1",
          titleHe: "סוגי הסכם-תזמון",
          titleEn: "Scheduling Agreement Types",
          execHe:
            "שני סוגים-מרכזיים: LP — הסכם-תזמון ללא Release Documentation (Schedule Lines נשלחות ישירות); ו-LPA — עם Release Documentation (שחרורי-Forecast/JIT מתועדים ב-EKEH, מתאים ל-JIT). בחירת-הסוג קובעת את אופן-התקשורת מול הספק.",
          beginnerHe:
            "יש שני 'טעמים' של הסכם-תזמון: אחד פשוט (LP) ששולח את הלוח ישירות, ואחד מתוחכם (LPA) ששומר תיעוד-שחרורים ותומך באספקה-JIT מדויקת. LPA נותן יותר שליטה ומעקב.",
          consultantHe:
            "LP: Schedule Lines (EKET) הן השחרור עצמו — פשוט, ללא תיעוד-Release נפרד. LPA: מפיק Release Documentation ב-EKEH עם הבחנת Forecast Delivery Schedule (FRC) ו-JIT Delivery Schedule — תמיכה ב-Release Creation Profile, ב-output-נפרד, ובמעקב-גרסאות-שחרור. LPA נדרש לתסריטי-JIT/JIS אמיתיים.",
          purposeHe:
            "להתאים את מנגנון-השחרור לצורך: LP לתסריט-פשוט, LPA לאספקת-JIT מבוקרת עם תיעוד והבחנה Forecast/JIT.",
          processExampleHe:
            "חומר בצריכה-יציבה → LP (Schedule Lines ישירות). חומר ב-JIT לקו-ייצור → LPA: Forecast-Schedule נותן תחזית-ארוכה, ו-JIT-Schedule נותן קריאות-אספקה מדויקות לטווח-קצר.",
          cbcHe:
            "ב-CBC בקבוקי-PET (אספקת-JIT לקו) = LPA עם Forecast+JIT; תוויות בצריכה-יציבה = LP פשוט.",
          navHe: ["SPRO ► MM ► Purchasing ► Scheduling Agreement ► Define Document Types"],
          tables: ["T161", "EKKO", "EKEH"],
          tcodes: ["ME31L", "ME38"],
          fiori: ["F2417A"],
          configHe: [
            "LP: ללא Release Documentation — Schedule Lines = השחרור.",
            "LPA: עם Release Documentation (EKEH), תומך Forecast+JIT.",
            "הקצה Release Creation Profile ל-LPA.",
          ],
          mistakesHe: [
            "בחירת LP כשנדרש JIT-מבוקר ➔ אובדן תיעוד-שחרורים והבחנת Forecast/JIT.",
            "LPA ללא Release Creation Profile ➔ שחרורים לא-מופקים.",
          ],
          troubleshootHe: [
            "אין תיעוד-שחרורים ➔ נבחר LP במקום LPA.",
            "אין הבחנת Forecast/JIT ➔ הסוג אינו LPA.",
          ],
          bestPracticeHe: [
            "השתמש ב-LPA לכל תסריט-JIT/JIS אמיתי.",
            "שמור LP לתסריטים-פשוטים ויציבים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין LP ל-LPA?", aHe: "LP=הסכם-תזמון ללא Release Documentation (Schedule Lines ישירות); LPA=עם Release Documentation (EKEH) ותמיכת Forecast+JIT." },
            { qHe: "מתי נדרש LPA?", aHe: "בתסריטי-JIT/JIS שדורשים תיעוד-שחרורים, הבחנת Forecast/JIT, ו-Release Creation Profile." },
          ],
          takeawaysHe: ["LP=פשוט; LPA=עם Release Documentation/JIT.", "LPA תומך Forecast+JIT (EKEH).", "בחר LPA ל-JIT אמיתי."],
        },
        {
          id: "8.5.2",
          titleHe: "ניהול ויצירת הסכמי-תזמון לרכש",
          titleEn: "Managing and Creating Purchase Scheduling Agreements",
          execHe:
            "יצירה וניהול הסכמי-תזמון מתבצעים דרך ME31L (יצירה), ME32L (שינוי), ME33L (הצגה), ו-ME38 (תחזוקת-לוח-תזמון), או דרך אפליקציות-Fiori. התהליך: יצירת-ההסכם, הזנת-פריטים ותנאים, ואז ניהול שוטף של Schedule Lines.",
          beginnerHe:
            "כדי להתחיל הסכם-תזמון, יוצרים אותו (ME31L), מזינים את הפריטים והמחירים, ואז מנהלים את לוח-האספקה (ME38) — מוסיפים שורות של 'מתי וכמה'. MRP יכול למלא את הלוח אוטומטית.",
          consultantHe:
            "ME31L יוצר EKKO(BSTYP=L)/EKPO; תנאי-מחיר ב-Conditions. ME38 מתחזק את Schedule Lines (EKET) ידנית או ש-MRP ממלא אוטומטית מדרישות-תכנון. Source List עם Fix מנתב את ה-MRP להסכם. ב-LPA, ME84 מפיק את ה-Release (Forecast/JIT) הנשלח לספק דרך Output (Message). ב-S/4HANA זמינות אפליקציות-Fiori מקבילות.",
          purposeHe:
            "לתת לרוכש ולתכנון כלי שלם ליצירה-ולתחזוקה של הסכמי-תזמון ולוחות-האספקה — מהקמת-ההסכם ועד שחרור שוטף לספק.",
          processExampleHe:
            "רוכש יוצר הסכם-תזמון LPA לבקבוקים (ME31L), קובע מחיר. MRP יוצר Schedule Lines ל-12 שבועות. ME84 מפיק Release Forecast לספק; כל שבוע JIT-Release מעדכן את האספקה-המיידית.",
          cbcHe:
            "ב-CBC צוות-התכנון מתחזק הסכמי-תזמון לאריזה דרך ME38; MRP ממלא Schedule Lines לפי תכנית-המילוי, ו-ME84 שולח Release לספקי-האריזה מדי-שבוע.",
          navHe: [
            "Logistics ► MM ► Purchasing ► Outline Agreement ► Scheduling Agreement ► Create (ME31L)",
            "Logistics ► MM ► Purchasing ► Outline Agreement ► Scheduling Agreement ► Delivery Schedule (ME38)",
          ],
          tables: ["EKKO", "EKPO", "EKET", "EKEH"],
          tcodes: ["ME31L", "ME32L", "ME33L", "ME38", "ME84"],
          fiori: ["F2417A", "F1600A"],
          configHe: [
            "ME31L ליצירה; ME38 לתחזוקת Schedule Lines.",
            "Source List עם Fix לניתוב-MRP להסכם.",
            "ME84 להפקת Release (Forecast/JIT) ב-LPA + Output Message.",
          ],
          mistakesHe: [
            "תחזוקת Schedule Lines ידנית כש-MRP יכול אוטומטית ➔ עבודה-מיותרת וטעויות.",
            "ללא Output Message ➔ ה-Release לא נשלח לספק.",
          ],
          troubleshootHe: [
            "Schedule Lines לא-מתמלאות ➔ Source List חסר/MRP לא מנותב.",
            "ספק לא מקבל Release ➔ Output Message/Condition Record חסר.",
          ],
          bestPracticeHe: [
            "תן ל-MRP למלא Schedule Lines אוטומטית.",
            "ודא Output Message להפקת-Release לספק.",
          ],
          interviewHe: [
            { qHe: "באילו עסקאות יוצרים ומנהלים הסכם-תזמון?", aHe: "ME31L יצירה, ME32L שינוי, ME33L הצגה, ME38 תחזוקת-לוח, ME84 הפקת-Release." },
            { qHe: "כיצד מתמלאות Schedule Lines?", aHe: "ידנית ב-ME38, או אוטומטית ע\"י MRP כשהסכם-התזמון הוא מקור-האספקה (Source List)." },
          ],
          takeawaysHe: ["ME31L/ME38 ליצירה ותחזוקה.", "MRP ממלא Schedule Lines אוטומטית.", "ME84 מפיק Release לספק."],
        },
        {
          id: "8.5.3",
          titleHe: "ניטור פריטי הסכם-תזמון-רכש",
          titleEn: "Monitor Purchase Scheduling Agreement Items",
          execHe:
            "אפליקציית ניטור פריטי הסכם-תזמון נותנת תצוגה תפעולית של פריטי-ההסכם: Schedule Lines פתוחות, כמויות-אספקה, סטטוס-שחרורים וחריגות — מאפשרת לתכנון/רכש לנהל בפועל את זרימת-האספקה.",
          beginnerHe:
            "זה מסך-בקרה להסכמי-התזמון: רואים אילו אספקות מתוכננות, מה כבר סופק, ומה דורש-תשומת-לב — כדי לוודא שהקו לא יישאר בלי חומר.",
          consultantHe:
            "האפליקציה מצרפת EKPO + EKET (Schedule Lines) + EKEH (Releases) + EKBE (קבלות) לתצוגה-אחת. KPI-ים: Open Schedule Quantity, Overdue Lines, סטטוס-Release. drill-down ל-ME38/ME33L. חיוני לזיהוי-מהיר של פערי-אספקה לפני שהם משבשים-ייצור.",
          purposeHe:
            "לתת שליטה תפעולית על זרימת-האספקה בהסכמי-תזמון — לזהות איחורים/חוסרים ולפעול לפני שהקו נעצר.",
          processExampleHe:
            "מתכנן פותח את ה-Monitor, מסנן 'Overdue Schedule Lines', מזהה אספקת-בקבוקים-באיחור, ויוצר-קשר עם הספק לפני שהמלאי אוזל.",
          cbcHe:
            "ב-CBC המתכנן מנטר יומית את הסכמי-האריזה; כששורת-אספקת-בקבוקים מתעכבת, הוא מתערב מיד כדי שקו-המילוי לא ייעצר.",
          navHe: ["Fiori Launchpad ► Procurement ► Monitor Purchase Scheduling Agreement Items"],
          tables: ["EKPO", "EKET", "EKEH", "EKBE"],
          tcodes: ["ME38", "ME33L", "ME80RA"],
          fiori: ["F2417A"],
          configHe: [
            "הגדר פילטרים/Variants ל-Open/Overdue Schedule Lines.",
            "ודא הפקת-Release (EKEH) פעילה לנתוני-סטטוס.",
          ],
          mistakesHe: [
            "אי-ניטור Overdue Lines ➔ פערי-אספקה מפתיעים את הקו.",
            "התעלמות מסטטוס-Release ➔ ספק לא קיבל לוח-מעודכן.",
          ],
          troubleshootHe: [
            "שורות-אספקה באיחור ➔ ספק לא קיבל Release/בעיית-אספקה אצל-הספק.",
            "Open Quantity שגוי ➔ קבלות (EKBE) לא קוזזו מול EKET.",
          ],
          bestPracticeHe: [
            "הגדר Variant יומי ל-Overdue Schedule Lines.",
            "פעל יזום מול הספק על שורות-איחור.",
          ],
          interviewHe: [{ qHe: "למה משמשת אפליקציית Monitor Scheduling Agreement Items?", aHe: "לתצוגה תפעולית של פריטי-ההסכם — Schedule Lines פתוחות/באיחור, כמויות וסטטוס-Release — לניהול זרימת-האספקה ומניעת-פערים." }],
          takeawaysHe: ["מסך-בקרה לפריטי הסכם-תזמון.", "מצרף EKET+EKEH+EKBE.", "מאתר Overdue Lines לפעולה-יזומה."],
        },
      ],
    },
    // ============================================================ 8.6
    {
      id: "8.6",
      titleHe: "התאמה-אישית של הסכמי-תזמון",
      titleEn: "Customizing Scheduling Agreements",
      execHe:
        "קונפיגורציית הסכמי-התזמון ב-SPRO קובעת את אבני-הבניין הייחודיות להם: סוגי-מסמכים, טווחי-מספרים, קטגוריות-פריט מותרות, ו-Release Creation Profile (פרופיל-יצירת-שחרורים). תצורה-נכונה מאפשרת לוחות-אספקה ושחרורי-JIT/Forecast אמינים.",
      beginnerHe:
        "כמו בחוזים, גם להסכמי-תזמון מכינים הגדרות-מערכת: סוגים, מספרים, סוגי-פריט מותרים, ובמיוחד — איך ומתי מפיקים את 'שחרורי-האספקה' לספק. ה-Release Creation Profile הוא ההגדרה הייחודית-החשובה כאן.",
      consultantHe:
        "ב-SPRO ► MM ► Purchasing ► Scheduling Agreement מגדירים: Document Types (LP/LPA), Number Ranges, Allowed Item Categories, ו-Release Creation Profile (תדירות/אופק Forecast ו-JIT, Aggregation, Backlog/Immediate). הפרופיל מוקצה באב-החומר/בהסכם וקובע כיצד MRP-Schedule-Lines הופכות ל-Releases הנשלחים לספק.",
      purposeHe:
        "לבסס תהליך הסכם-תזמון תקני עם שחרורי-אספקה מבוקרים — להבטיח שהספק מקבל לוחות-Forecast/JIT בתדירות ובאופק הנכונים.",
      processExampleHe:
        "מומחה-SAP מגדיר LPA עם טווח-מספרים, Item Categories מותרים, ו-Release Creation Profile: Forecast חודשי לאופק-3-חודשים, JIT שבועי לאופק-שבועיים — וכך השחרורים מופקים אוטומטית בקצב-הנכון.",
      cbcHe:
        "ב-CBC הוגדר Release Creation Profile לאריזה: Forecast חודשי לספק (לתכנון-ייצורו) ו-JIT שבועי (לאספקה-מיידית לקו) — איזון בין נראות-ארוכה לגמישות-קצרה.",
      navHe: [
        "SPRO ► MM ► Purchasing ► Scheduling Agreement ► Define Document Types",
        "SPRO ► MM ► Purchasing ► Scheduling Agreement ► Define Number Ranges",
        "SPRO ► MM ► Purchasing ► Scheduling Agreement ► Maintain Release Creation Profile",
      ],
      tables: ["T161", "T16FS", "EKET"],
      tcodes: ["OMET", "SPRO", "ME31L"],
      fiori: ["F2417A"],
      configHe: [
        "Document Types (LP/LPA): BSTYP=L, Release Documentation indicator.",
        "Number Ranges: טווח פנימי/חיצוני לכל סוג.",
        "Allowed Item Categories: Standard/Subcontracting/Consignment.",
        "Release Creation Profile: תדירות/אופק Forecast+JIT.",
      ],
      flow: [
        { he: "סוגי-מסמך (LP/LPA)", code: "T161" },
        { he: "טווחי-מספרים", code: "Number Range" },
        { he: "Item Categories", code: "T16FS" },
        { he: "Release Creation Profile", code: "Forecast/JIT" },
      ],
      mistakesHe: [
        "ללא Release Creation Profile ➔ שחרורים לא-מופקים בקצב-נכון.",
        "טווח-מספרים חסר ➔ לא ניתן ליצור הסכם.",
      ],
      troubleshootHe: [
        "שחרורים לא-מופקים אוטומטית ➔ Release Creation Profile חסר/לא-מוקצה.",
        "סוג-מסמך לא-זמין ➔ טווח-מספרים/Item Category חסרים.",
      ],
      bestPracticeHe: [
        "הגדר Release Creation Profile מאוזן (Forecast ארוך + JIT קצר).",
        "הפרד LP/LPA לפי תסריט-העבודה.",
      ],
      interviewHe: [
        { qHe: "מהי ההגדרה הייחודית להסכמי-תזמון?", aHe: "Release Creation Profile — קובע תדירות ואופק של שחרורי-Forecast ו-JIT הנשלחים לספק." },
        { qHe: "מה קובע Document Type בהסכם-תזמון?", aHe: "BSTYP=L, אינדיקטור Release Documentation (LP/LPA), טווח-מספרים, Field Selection ו-Item Categories." },
      ],
      takeawaysHe: [
        "קונפיגורציה: סוגים+מספרים+פריטים+Release Profile.",
        "Release Creation Profile הוא הייחודי להסכמי-תזמון.",
        "LP/LPA נבחרים לפי תסריט-העבודה.",
      ],
      children: [
        {
          id: "8.6.1",
          titleHe: "הגדרת סוגי-מסמכים",
          titleEn: "Define Document Types",
          execHe:
            "סוגי-המסמכים להסכמי-תזמון (LP/LPA) קושרים BSART↔BSTYP=L↔טווח-מספרים↔Field Selection↔Allowed Item Categories↔אינדיקטור-Release-Documentation. הם ה-DNA של הסכם-התזמון.",
          beginnerHe:
            "כאן קובעים אילו סוגי-הסכם-תזמון קיימים (פשוט LP / עם-תיעוד LPA) ואיך כל אחד מתנהג — מאיזה מספר, אילו שדות, אילו פריטים.",
          consultantHe:
            "ב-SPRO ► Scheduling Agreement ► Define Document Types מגדירים את LP/LPA ב-T161: BSART, BSTYP=L, Number Range, Field Selection Reference (T16FS), Allowed Item Categories, ואינדיקטור Release Documentation (LPA=פעיל). הקישור קובע את כל התנהגות-ההסכם.",
          purposeHe:
            "להגדיר סוגי-הסכם-תזמון תקניים שמתאימים לתסריטי-העבודה (LP פשוט / LPA JIT) ולמדיניות-הרכש.",
          processExampleHe:
            "הגדרת LPA: BSTYP=L, Release Documentation פעיל, טווח-מספרים פנימי, Item Categories Standard, Field Selection שמסמן Material+Plant חובה.",
          cbcHe:
            "ב-CBC הוגדר LPA לאריזת-JIT ו-LP לחומרי-עזר-יציבים, כל אחד עם Field Selection ו-Item Categories מתאימים.",
          navHe: ["SPRO ► MM ► Purchasing ► Scheduling Agreement ► Define Document Types"],
          tables: ["T161", "T16FS"],
          tcodes: ["OMET", "SPRO"],
          fiori: ["F2417A"],
          configHe: [
            "T161: BSART, BSTYP=L, Number Range, Field Selection Ref.",
            "אינדיקטור Release Documentation (LPA=פעיל, LP=כבוי).",
            "Allowed Item Categories + Field Selection.",
          ],
          mistakesHe: [
            "אי-הפעלת Release Documentation ב-LPA ➔ אין שחרורי-JIT מתועדים.",
            "Field Selection רופף ➔ שדות-מפתח לא-נאכפים.",
          ],
          troubleshootHe: [
            "אין תיעוד-שחרורים ➔ אינדיקטור Release Documentation כבוי.",
            "שדה לא-חובה ➔ Field Selection Reference שגוי.",
          ],
          bestPracticeHe: [
            "הפעל Release Documentation ב-LPA לתסריטי-JIT.",
            "אכוף שדות-מפתח ב-Field Selection.",
          ],
          interviewHe: [{ qHe: "מה קובע Document Type בהסכם-תזמון?", aHe: "BSART, BSTYP=L, טווח-מספרים, Field Selection, Item Categories, ואינדיקטור Release Documentation (LP/LPA)." }],
          takeawaysHe: ["LP/LPA = ה-DNA של הסכם-התזמון.", "אינדיקטור Release Documentation מבחין ביניהם.", "מקשר סוג↔מספור↔שדות↔פריטים."],
        },
        {
          id: "8.6.2",
          titleHe: "הגדרת טווחי-מספרים",
          titleEn: "Define Number Ranges",
          execHe:
            "טווחי-מספרים מקצים את המספור (פנימי=אוטומטי/חיצוני=ידני) להסכמי-תזמון, ומקושרים לכל Document Type. מספור-עקבי ומובחן מאפשר זיהוי-מהיר ובקרה.",
          beginnerHe:
            "כל הסכם-תזמון מקבל מספר. כאן קובעים מאיזה טווח — פנימי (המערכת מקצה) או חיצוני (המשתמש מקליד) — ומשייכים לכל סוג-מסמך.",
          consultantHe:
            "ב-SPRO ► Scheduling Agreement ► Define Number Ranges מגדירים Number Range Intervals (פנימי/חיצוני) ומקצים לכל Document Type ב-T161. מומלץ טווח נפרד מהחוזים ומה-PO לזיהוי-מהיר ולמניעת-התנגשות.",
          purposeHe:
            "להבטיח מספור-עקבי, מובחן ובר-מעקב להסכמי-התזמון — בסיס לבקרה ולזיהוי-מהיר.",
          processExampleHe:
            "מוגדר טווח פנימי 5500000000–5599999999 ל-LP/LPA, נפרד מטווח-החוזים — כל הסכם מקבל מספר מהטווח אוטומטית.",
          cbcHe:
            "ב-CBC הוקצה טווח-מספרים ייעודי להסכמי-התזמון, נבדל מחוזי-החומרים, לזיהוי-מיידי בדוחות.",
          navHe: ["SPRO ► MM ► Purchasing ► Scheduling Agreement ► Define Number Ranges"],
          tables: ["T161", "NRIV"],
          tcodes: ["SNRO", "SPRO"],
          fiori: ["F2417A"],
          configHe: [
            "הגדר Number Range Intervals (פנימי/חיצוני).",
            "הקצה טווח לכל Document Type ב-T161.",
            "הפרד מטווחי-החוזים וה-PO.",
          ],
          mistakesHe: [
            "אי-הקצאת טווח לסוג-מסמך ➔ לא ניתן ליצור הסכם.",
            "טווח חופף לחוזים/PO ➔ בלבול ושגיאות-מספור.",
          ],
          troubleshootHe: [
            "לא ניתן ליצור הסכם ➔ טווח-מספרים לא-מוקצה/אזל.",
            "מספור-חיצוני נדרש בטעות ➔ הוגדר External במקום Internal.",
          ],
          bestPracticeHe: [
            "הפרד טווחים לפי סוג (SA/Contract/PO).",
            "העדף מספור-פנימי לעקביות.",
          ],
          interviewHe: [{ qHe: "מדוע להפריד טווחי-מספרים להסכמי-תזמון?", aHe: "לזיהוי-מהיר, למניעת-התנגשות עם חוזים/PO, ולבקרת-מספור עקבית." }],
          takeawaysHe: ["טווחי-מספרים = פנימי/חיצוני לכל סוג.", "הקצה ב-T161.", "הפרד מחוזים/PO."],
        },
        {
          id: "8.6.3",
          titleHe: "קטגוריות-פריט מותרות",
          titleEn: "Allowed Item Categories",
          execHe:
            "הגדרת Allowed Item Categories קובעת אילו סוגי-פריט (Standard, Subcontracting L, Consignment K, Limit) מותרים בכל Document Type של הסכם-תזמון — בקרת-איכות-נתונים שמונעת שילובים לא-תקפים.",
          beginnerHe:
            "לא כל סוג-פריט מתאים לכל הסכם. כאן קובעים אילו סוגים מותרים — למשל פריט-רגיל, או פריט-קבלנות-משנה — כדי שהמשתמש לא יבחר משהו לא-הגיוני.",
          consultantHe:
            "ב-SPRO ► Scheduling Agreement מגדירים את צירוף Document Type↔Item Category המותר. Item Categories נפוצות בהסכם-תזמון: Standard (ריק), L=Subcontracting, K=Consignment. צירוף לא-מוגדר נחסם ביצירה. ההגדרה משלימה את Field Selection בבקרת-הזנה.",
          purposeHe:
            "למנוע שילובי-פריט לא-תקפים בהסכם-תזמון ולשמור על היגיון-תהליכי ואיכות-נתונים.",
          processExampleHe:
            "ניסיון להזין פריט Consignment בהסכם שלא-מתיר זאת מוחזר בשגיאה; רק Standard ו-Subcontracting הוגדרו מותרים.",
          cbcHe:
            "ב-CBC הסכמי-אריזה מתירים Standard בלבד; הסכמי-קבלנות-משנה (מילוי-חיצוני) מתירים גם L=Subcontracting.",
          navHe: ["SPRO ► MM ► Purchasing ► Scheduling Agreement ► Define Allowed Item Categories"],
          tables: ["T161", "T163"],
          tcodes: ["OMET", "SPRO"],
          fiori: ["F2417A"],
          configHe: [
            "הגדר צירופי Document Type↔Item Category מותרים.",
            "Item Categories: Standard, L(Subcontracting), K(Consignment).",
            "צירוף לא-מוגדר נחסם ביצירה.",
          ],
          mistakesHe: [
            "אי-התרת Item Category נדרשת ➔ לא ניתן להזין פריט-קבלנות/קונסיגנציה.",
            "התרת-יתר ➔ שילובים לא-הגיוניים אפשריים.",
          ],
          troubleshootHe: [
            "Item Category נחסמת ➔ הצירוף לא-מוגדר כמותר.",
            "פריט-Subcontracting לא-נקלט ➔ L לא-הותר לסוג-המסמך.",
          ],
          bestPracticeHe: [
            "התר רק Item Categories רלוונטיות לתסריט.",
            "תאם עם Field Selection לבקרה-מלאה.",
          ],
          interviewHe: [{ qHe: "מה קובעת הגדרת Allowed Item Categories?", aHe: "אילו סוגי-פריט (Standard/Subcontracting/Consignment) מותרים בכל Document Type — בקרת-איכות-נתונים." }],
          takeawaysHe: ["מגדיר Item Categories מותרים לכל סוג.", "Standard/L/K נפוצים.", "צירוף לא-מוגדר נחסם."],
        },
        {
          id: "8.6.4",
          titleHe: "תחזוקת פרופיל-יצירת-שחרורים",
          titleEn: "Maintain Release Creation Profile",
          execHe:
            "Release Creation Profile הוא ההגדרה הייחודית-החשובה של הסכמי-תזמון: הוא קובע כיצד ומתי Schedule Lines הופכות לשחרורי-Forecast (FRC) ו-JIT הנשלחים לספק — תדירות, אופק, Aggregation וטיפול-Backlog.",
          beginnerHe:
            "הפרופיל אומר למערכת: 'כל כמה זמן לשלוח לספק לוח-אספקה ולכמה זמן קדימה'. למשל — תחזית-חודשית ל-3 חודשים, וקריאת-JIT שבועית לשבועיים. בלעדיו, השחרורים לא-מופקים בקצב-הנכון.",
          consultantHe:
            "ב-SPRO ► Scheduling Agreement ► Maintain Release Creation Profile מגדירים: Creation Periodicity (תדירות-הפקה), Forecast/JIT Horizon (אופק), Aggregation Horizon (איחוד-שורות), Backlog/Immediate-requirement handling, ו-Tolerance לשינוי-Release. הפרופיל מוקצה בהסכם/אב-החומר; ME84 משתמש בו להפקת-ה-Release (EKEH). קריטי ל-JIT/JIS תקין.",
          purposeHe:
            "לשלוט במנגנון-השחרור — להבטיח שהספק מקבל לוחות-Forecast/JIT בתדירות, באופק ובאגרגציה הנכונים, עם טיפול-נכון ב-Backlog ובדרישות-מיידיות.",
          processExampleHe:
            "פרופיל: Forecast חודשי לאופק-90-יום, JIT שבועי לאופק-14-יום, Aggregation שבועי לאחר-30-יום. ME84 מפיק בהתאם, והספק מקבל תחזית-ארוכה + קריאות-קצרות מדויקות.",
          cbcHe:
            "ב-CBC פרופיל-האריזה: Forecast חודשי (לתכנון-ייצור-הספק) + JIT שבועי (לאספקה-מיידית לקו). כך הספק מתכנן-קדימה אך מספק בקצב-הצריכה-בפועל.",
          navHe: ["SPRO ► MM ► Purchasing ► Scheduling Agreement ► Maintain Release Creation Profile"],
          tables: ["T161", "EKET", "EKEH"],
          tcodes: ["OMET", "ME84", "SPRO"],
          fiori: ["F2417A"],
          configHe: [
            "Creation Periodicity: תדירות-הפקת-שחרורים.",
            "Forecast/JIT Horizon: אופק כל סוג-שחרור.",
            "Aggregation Horizon: איחוד-שורות מעבר-לאופק.",
            "Backlog/Immediate handling + Tolerance לשינוי.",
          ],
          mistakesHe: [
            "אופק-Forecast קצר-מדי ➔ לספק אין נראות-תכנון מספקת.",
            "תדירות-JIT לא-תואמת-צריכה ➔ עודף/חוסר-מלאי.",
          ],
          troubleshootHe: [
            "שחרורים לא-מופקים ➔ פרופיל חסר/לא-מוקצה להסכם.",
            "ספק מקבל לוח-לא-תואם ➔ Horizon/Aggregation שגויים.",
          ],
          bestPracticeHe: [
            "אזן Forecast-ארוך (נראות) מול JIT-קצר (גמישות).",
            "התאם תדירות-JIT לקצב-הצריכה-בפועל.",
          ],
          interviewHe: [
            { qHe: "מה קובע Release Creation Profile?", aHe: "תדירות, אופק ו-Aggregation של שחרורי-Forecast/JIT הנשלחים לספק, וטיפול ב-Backlog/דרישות-מיידיות." },
            { qHe: "באיזו עסקה מופק ה-Release לפי הפרופיל?", aHe: "ME84 — שמפיק את ה-Release (Forecast/JIT) ל-EKEH לפי הפרופיל המוקצה." },
          ],
          takeawaysHe: [
            "Release Creation Profile = הלב של שחרורי הסכם-התזמון.",
            "קובע תדירות/אופק/Aggregation ל-Forecast+JIT.",
            "ME84 מפיק את ה-Release לפיו (EKEH).",
          ],
        },
      ],
    },
    // ============================================================ 8.7
    {
      id: "8.7",
      titleHe: "אינטגרציה עם SAP Ariba Contracts",
      titleEn: "Integrating with SAP Ariba Contracts",
      execHe:
        "אינטגרציה עם SAP Ariba Contracts מחברת את ניהול-החוזים-האסטרטגי בענן (Source-to-Contract: מו\"מ, ניהול-מחזור-חיים, ספרייה-משפטית) עם הביצוע-התפעולי ב-S/4HANA (Contract→Release→GR→Invoice). חוזה שנוצר/נסגר ב-Ariba מועבר כ-Outline Agreement ל-S/4HANA לביצוע.",
      beginnerHe:
        "Ariba היא מערכת-ענן של SAP למו\"מ-וניהול-חוזים. ניהול ה'חיים המשפטיים' של החוזה (גרסאות, חתימות, סעיפים) קורה ב-Ariba, ואז החוזה 'נשלח' ל-S/4HANA כדי שבפועל יזמינו ויקנו דרכו. האינטגרציה מחברת בין השניים כך שלא צריך להקליד פעמיים.",
      consultantHe:
        "האינטגרציה (לרוב דרך SAP Integration Suite / Cloud Integration עם תוכן-iFlow מוכן) ממפה Ariba Contract Workspace ל-S/4HANA Outline Agreement (EKKO/EKPO). Source-to-Contract (מו\"מ, Clause Library, eSignature, Compliance) נשאר ב-Ariba; הביצוע (Release Orders, GR, Invoice) ב-S/4HANA. נדרשת התאמת Master Data (ספקים/חומרים), מיפוי-שדות, וטיפול-בעדכונים דו-כיווני. מתאים לארגונים עם Procurement-בענן.",
      purposeHe:
        "לשלב את החוזק-של-Ariba בניהול-החוזים-האסטרטגי-והמשפטי עם החוזק-של-S/4HANA בביצוע-התפעולי — מקור-אמת-אחד, פחות הקלדה-כפולה, ובקרת-Compliance מקצה-לקצה.",
      processExampleHe:
        "צוות-Sourcing מנהל מו\"מ ב-Ariba, סוגר חוזה עם סעיפים-משפטיים ו-eSignature; האינטגרציה יוצרת Outline Agreement ב-S/4HANA; הרכש-התפעולי מושך ממנו הזמנות-שחרור — וצריכה-בפועל מוזנת חזרה לדיווח ב-Ariba.",
      cbcHe:
        "ב-CBC חוזי-הסוכר-והתרכיז האסטרטגיים נסגרים ב-Ariba (מו\"מ, Compliance, חתימות), ומסונכרנים אוטומטית ל-S/4HANA כ-Outline Agreements שמהם מפעלי-המילוי מושכים אספקה.",
      navHe: [
        "SAP Integration Suite ► Cloud Integration ► (Ariba ↔ S/4HANA iFlows)",
        "SAP Ariba ► Contracts ► Contract Workspace",
        "S/4HANA ► Manage Purchase Contracts (חוזה-מסונכרן)",
      ],
      tables: ["EKKO", "EKPO"],
      tcodes: ["ME33K", "ME32K"],
      fiori: ["F1600A"],
      configHe: [
        "הקם חיבור דרך SAP Integration Suite עם תוכן-iFlow ל-Ariba Contracts.",
        "מפה Ariba Contract Workspace ל-S/4HANA Outline Agreement (שדות/Item).",
        "התאם Master Data (ספקים/חומרים) בין המערכות.",
        "הגדר טיפול-בעדכונים (Source-to-Contract ב-Ariba, Execution ב-S/4HANA).",
      ],
      flow: [
        { he: "מו\"מ + סגירת-חוזה", code: "Ariba", note: "Source-to-Contract" },
        { he: "אינטגרציה (iFlow)", code: "Integration Suite" },
        { he: "Outline Agreement ב-S/4HANA", code: "EKKO/EKPO" },
        { he: "ביצוע: שחרור→GR→חשבונית", code: "S/4HANA" },
        { he: "דיווח-ניצול חזרה", code: "Ariba" },
      ],
      mistakesHe: [
        "Master Data לא-מותאם (ספק/חומר) ➔ כשל-מיפוי באינטגרציה.",
        "ניהול-חוזה כפול בשתי-המערכות ➔ ערבוב מקור-אמת.",
      ],
      troubleshootHe: [
        "חוזה לא-מסונכרן ל-S/4HANA ➔ כשל-iFlow או מיפוי-שדות שגוי.",
        "ספק/חומר לא-נמצא ➔ Master Data לא-מותאם בין המערכות.",
      ],
      bestPracticeHe: [
        "שמור Source-to-Contract ב-Ariba ו-Execution ב-S/4HANA — מקור-אמת-יחיד לכל שלב.",
        "התאם Master Data לפני הפעלת-האינטגרציה.",
      ],
      interviewHe: [
        { qHe: "מה מתבצע ב-Ariba ומה ב-S/4HANA?", aHe: "Source-to-Contract (מו\"מ, Clause Library, eSignature, Compliance) ב-Ariba; Execution (Release Orders, GR, Invoice) ב-S/4HANA." },
        { qHe: "כיצד מסונכרן חוזה-Ariba ל-S/4HANA?", aHe: "דרך SAP Integration Suite/iFlow הממפה Contract Workspace ל-Outline Agreement (EKKO/EKPO)." },
      ],
      takeawaysHe: [
        "Ariba = ניהול-חוזה אסטרטגי-משפטי; S/4HANA = ביצוע-תפעולי.",
        "אינטגרציה דרך SAP Integration Suite (iFlow).",
        "חוזה-Ariba הופך ל-Outline Agreement ב-S/4HANA.",
      ],
    },
    // ============================================================ 8.8
    {
      id: "8.8",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את ניהול-החוזים והסכמי-התזמון ב-SAP S/4HANA Sourcing & Procurement: סוגי-חוזה (כמות/ערך/מרכזי), ניצול-חוזה (EKAB), אנליטיקה (Off-Contract/Leakage/Expiry), קונפיגורציה (Document Types/Workflow), הסכמי-תזמון (LP/LPA, EKET/EKEH), ה-customizing שלהם (Release Creation Profile), ואינטגרציית-Ariba. הסכמי-מסגרת הם עמוד-השדרה של רכש-אסטרטגי מבוקר.",
      beginnerHe:
        "למדנו שני כלים לרכש-ארוך-טווח: חוזה (מושכים ממנו הזמנות-שחרור) והסכם-תזמון (נותנים לספק לוח-אספקה). ראינו איך מנצלים אותם, איך מודדים בזכות אנליטיקה, איך מגדירים אותם ב-SPRO, ואיך מחברים ל-Ariba. הכל בנוי על אותן טבלאות EKKO/EKPO עם הרחבות EKAB/EKET/EKEH.",
      consultantHe:
        "סיכום-יועץ: BSTYP מבחין K/L/F; חוזה→EKAB, הסכם-תזמון→EKET+EKEH. Quantity(MK)/Value(WK)/Centrally-Agreed; ניצול דרך Release Orders עם Source List; אנליטיקה מבוססת-CDS (Off-Contract/Leakage/Unused/Expiry). קונפיגורציה: T161/Document Types, Number Ranges, Field Selection, Item Categories, Release Strategy/Flexible Workflow, ו-Release Creation Profile להסכמי-תזמון. Ariba מחזיק Source-to-Contract, S/4HANA את ה-Execution. שליטה במנגנונים אלה היא ליבת-המומחיות ב-MM-Sourcing.",
      purposeHe:
        "לקבע את התמונה-המלאה: מתי לבחור חוזה מול הסכם-תזמון, כיצד לנצל ולמדוד, וכיצד להגדיר ולשלב — כדי לתכנן, לממש ולתקן תהליכי-הסכמי-מסגרת ב-S/4HANA בביטחון.",
      processExampleHe:
        "מקצה-לקצה: מו\"מ→חוזה/הסכם-תזמון→ניצול (שחרור/לוח-אספקה)→GR+חשבונית→אנליטיקה (ניצול/דליפה/תפוגה)→חידוש. כל שלב נשען על האובייקטים שנלמדו בפרק.",
      cbcHe:
        "ב-CBC: חוזי-כמות/ערך לסוכר-ותרכיז, הסכמי-תזמון JIT לאריזה, אנליטיקה-רבעונית למשמעת-רכש, ו-Ariba לחוזים-האסטרטגיים — תמונת-רכש שלמה למפעל-בקבוק.",
      navHe: [
        "Fiori Launchpad ► Procurement ► Manage Purchase Contracts (F1600A)",
        "SPRO ► MM ► Purchasing ► Contract / Scheduling Agreement",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "EKET", "EKEH"],
      tcodes: ["ME31K", "ME31L", "ME38", "ME84", "ME80RA"],
      fiori: ["F1600A", "F2417A", "F2417", "F3666", "F2419"],
      configHe: [
        "BSTYP מבחין: K=Contract, L=Scheduling Agreement, F=PO.",
        "חוזה→EKAB (Release Documentation); הסכם-תזמון→EKET (Schedule Lines)+EKEH (Releases).",
        "קונפיגורציה: Document Types, Number Ranges, Field Selection, Item Categories, Workflow, Release Creation Profile.",
      ],
      flow: [
        { he: "מו\"מ + הסכם-מסגרת", code: "Contract/SA" },
        { he: "ניצול (שחרור/לוח)", code: "EKAB/EKET" },
        { he: "GR + חשבונית", code: "MIGO/MIRO" },
        { he: "אנליטיקה", code: "Off-Contract/Leakage/Expiry" },
        { he: "חידוש/סגירה", code: "F1600A" },
      ],
      mistakesHe: [
        "בלבול חוזה↔הסכם-תזמון ➔ בחירת-מנגנון-שחרור שגוי.",
        "Release Documentation כבוי ➔ אובדן-אנליטיקה ומעקב-ניצול.",
      ],
      troubleshootHe: [
        "ניצול/אנליטיקה חסרים ➔ Release Documentation לא-פעיל.",
        "רכש מחוץ-לחוזה גבוה ➔ חסר Source List עם Fix.",
      ],
      bestPracticeHe: [
        "בחר חוזה לצריכה-לא-רציפה, הסכם-תזמון לצריכה-רציפה (JIT).",
        "אכוף Source List + Release Documentation + אנליטיקה-מחזורית.",
      ],
      interviewHe: [
        { qHe: "מתי תבחר חוזה ומתי הסכם-תזמון?", aHe: "חוזה לרכש-חוזר-לא-רציף (הזמנות-שחרור לפי-צורך); הסכם-תזמון לצריכה-רציפה-וצפויה (לוח-אספקה/JIT)." },
        { qHe: "מהם האובייקטים המרכזיים של הפרק?", aHe: "EKKO/EKPO (כותרת/פריט), EKAB (ניצול-חוזה), EKET (לוחות-תזמון), EKEH (שחרורי-Forecast/JIT)." },
      ],
      takeawaysHe: [
        "הסכמי-מסגרת = עמוד-השדרה של רכש-אסטרטגי.",
        "חוזה→EKAB; הסכם-תזמון→EKET+EKEH; BSTYP מבחין.",
        "אנליטיקה + Source List + Workflow = רכש מבוקר ואכיף.",
        "Ariba לאסטרטגיה, S/4HANA לביצוע.",
      ],
      relatedHe: [{ labelHe: "MM · הזמנת-רכש", href: "/library/mm/chapter-07/" }],
    },
  ],
};
