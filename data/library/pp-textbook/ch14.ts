// ===== PP Digital Textbook — Chapter 14 (Demand-Driven Replenishment / DDMRP) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved; corrupted/scrambled parent labels from the PDF TOC
// extraction were corrected and coherent sub-headings nested via `children`.
// DDMRP in S/4HANA is heavily Fiori-app-based — the fiori[] facets are populated richly.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH14: TextbookChapter = {
  n: 14,
  titleHe: "חידוש מונחה-ביקוש (DDMRP)",
  titleEn: "Demand-Driven Replenishment (DDMRP)",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה ל-Demand-Driven Replenishment (DDMRP) ב-SAP S/4HANA — מתודולוגיה לתכנון-חידוש המוּנעת מביקוש-בפועל במקום מתחזית בלבד. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. בשונה מפרקים אחרים, DDMRP ב-S/4HANA הוא ברובו מבוסס-אפליקציות-Fiori (PP/MRP), ולכן מקטע ה-Fiori עשיר במיוחד. הדגש: מיקום-באפרים אסטרטגי (נקודות-ניתוק), חישוב גודל-באפר ואזורים (אדום/צהוב/ירוק), משוואת התזרים-הנקי (Net Flow), ותהליך-החידוש היומי. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 14.1
    {
      id: "14.1", titleHe: "מגבלות תכנון-החומרים הקלאסי", titleEn: "Limitations of Current Materials Planning",
      execHe:
        "MRP קלאסי מתוכנן לעולם דטרמיניסטי: תחזית מדויקת, אספקה יציבה וזמני-אספקה קבועים. בעולם המודרני התנודתיות גבוהה, וכל שגיאת-תחזית מתפשטת ומתעצמת לאורך שרשרת-האספקה — תופעת ה-Bullwhip. התוצאה: עודפי-מלאי בצד אחד וחוסרים בצד אחר, בו-זמנית.",
      beginnerHe:
        "MRP מחשב 'בדיוק כמה צריך' לפי תחזית. אבל תחזית כמעט תמיד שגויה. כשכל רמה בשרשרת מגיבה לשגיאה של הרמה שמעליה, הסטיות מתעצמות (Bullwhip) — מזמינים יותר מדי או מעט מדי. DDMRP בא לפתור זאת על-ידי 'באפרים' שסופגים את התנודות.",
      consultantHe:
        "MRP נשען על Dependent Demand מחושב ועל Lead Time מצטבר; שתי הנחות-יסוד אלו קורסות בתנאי-תנודתיות. עיקרון-הניתוק (Decoupling) של DDMRP חותך את העברת-התנודה דרך מלאי-באפר ממוקם אסטרטגית. ה-Decoupled Lead Time (DLT) מחליף את ה-Cumulative Lead Time כמדד-התכנון, ומקצר משמעותית את אופק-התגובה.",
      purposeHe:
        "להבין מדוע נדרשת שיטה חדשה: לא להחליף את MRP אלא להשלים אותו היכן שהתנודתיות שוברת אותו. המטרה היא הגנה על התזרים (Flow) — זמינות-חומר גבוהה עם מלאי נמוך יותר.",
      processExampleHe:
        "מפעל מתכנן לפי תחזית של 1,000 יח'; בפועל מגיע ביקוש 1,300. החוסר מתפשט אחורה: דרישת-רכיבים גדלה, הספק מאחר, וכל הרמות 'מנפחות' הזמנות לביטחון — מלאי עולה אך השירות יורד.",
      cbcHe:
        "ב-CBC קמפיין-מבצע פתאומי על משקה מסוים מקפיץ ביקוש; MRP קלאסי, שתוכנן לתחזית-בסיס, יוצר חוסר-תרכיז בקו אחד ועודף-אריזה בקו אחר. DDMRP היה סופג זאת דרך באפר-תרכיז ממוקם.",
      navHe: [
        "Production ► Material Requirements Planning ► Demand-Driven Replenishment ► General Settings",
        "SAP Fiori Launchpad ► Demand-Driven Replenishment (PP-DD) — group של אפליקציות-DDMRP",
      ],
      tables: ["MARC", "PPH_DD_BUFFER"],
      tcodes: ["MD04", "SPRO"],
      fiori: ["F1423"],
      configHe: [
        "DDMRP נדרש הפעלה (Activation) ברמת-מערכת ולעיתים Business Function; ראה SAP Note הרלוונטי לגרסת ה-S/4HANA.",
        "אין כאן קונפיגורציה רבה — זהו שלב-הבנה; הקונפיגורציה מתחילה ב-Buffer Profile (14.9).",
      ],
      mistakesHe: [
        "הנחה ש-DDMRP מחליף את MRP לחלוטין — הוא משלים אותו לחומרים נכונים בלבד.",
        "ציפייה ש-DDMRP יפתור תחזית-גרועה — הוא מנהל תנודתיות, לא מחליף תכנון-ביקוש.",
      ],
      troubleshootHe: [
        "מלאי גבוה וחוסרים בו-זמנית ➔ סימן-היכר ל-Bullwhip; שקול מיקום-באפרים אסטרטגי.",
        "תגובה איטית מדי לשינויי-ביקוש ➔ Cumulative Lead Time ארוך; DDMRP מקצר ל-DLT.",
      ],
      bestPracticeHe: [
        "אל תיישם DDMRP גורף — בחר חומרים אסטרטגיים בעלי-תנודתיות ו/או DLT ארוך.",
        "הצג את הבעיה במונחי-תזרים (Flow) ולא במונחי-מלאי בלבד — זו שפת-ה-DDMRP.",
      ],
      interviewHe: [
        { qHe: "מהי תופעת ה-Bullwhip?", aHe: "התעצמות סטיות-הביקוש לאורך שרשרת-האספקה: כל רמה מגיבה לשגיאת-הרמה שמעליה ומגדילה הזמנות, עד עיוות חמור בקצה האחורי." },
        { qHe: "מהי הנחת-היסוד של MRP שקורסת בתנודתיות?", aHe: "תחזית-מדויקת וזמני-אספקה קבועים; DDMRP מנתק את התלות הזו דרך באפרים ממוקמים." },
      ],
      takeawaysHe: [
        "MRP קלאסי נשבר בתנאי-תנודתיות גבוהה (Bullwhip).",
        "DDMRP משלים, לא מחליף — לחומרים נכונים.",
        "המטרה: הגנת-תזרים, לא צמצום-מלאי כשלעצמו.",
      ],
      relatedHe: [
        { labelHe: "PP · MRP מסורתי (פרק 13)", href: "/library/pp/chapter-13/" },
        { labelHe: "PP · Reorder Point (13.7)", href: "/library/pp/chapter-13/#sub-13.7" },
      ],
    },
    // ============================================================ 14.2
    {
      id: "14.2", titleHe: "זרימת חומר ומידע", titleEn: "Material and Information Flows",
      execHe:
        "ב-DDMRP זרימת-החומר וזרימת-המידע מנותקות זו מזו בנקודות-הניתוק (Decoupling Points). הבאפר בנקודה כזו סופג תנודות ומאפשר לכל מקטע-שרשרת לתכנן עצמאית מול אות-ביקוש מקומי ולא מול תחזית-קצה רחוקה.",
      beginnerHe:
        "תאר נהר עם סכרים: בלי סכרים כל גל מים-עליון מציף את התחתון. הסכרים (הבאפרים) שוברים את הגל, וכל קטע-נהר מתנהל לבדו. ב-DDMRP החומר 'נח' בבאפר, והמידע (אות-החידוש) נוצר מקומית בכל באפר.",
      consultantHe:
        "ללא ניתוק, אות-הביקוש (Demand signal) עובר דרך כל הרמות ומתעוות. הניתוק יוצר Independent Demand מקומי בכל באפר: התכנון מסתכל רק על אופק ה-DLT של אותו מקטע. זה מצמצם את Variability Amplification ומקצר תגובה. ה-Net Flow Equation (14.7) הוא מנגנון-המידע בכל באפר.",
      purposeHe:
        "להפריד תכנון-ארוך-טווח (תחזית) מביצוע-קצר-טווח (חידוש מול ביקוש-בפועל), כדי שכל אחד יעבוד באופק ובאיתות המתאימים לו.",
      processExampleHe:
        "מוצר-מוגמר עם באפר: הזמנת-לקוח 'מושכת' מהבאפר; הבאפר מאותת חידוש לפי ה-Net Flow; הייצור מחדש את הבאפר — בלי שהזמנת-הלקוח \"תרוץ\" עד הספק הראשוני.",
      cbcHe:
        "ב-CBC נקודת-ניתוק על תרכיז (חומר אסטרטגי, אספקה ארוכה) מנתקת את קווי-המילוי מתנודות-הספק; כל קו מושך מבאפר-התרכיז, והבאפר מתחדש בקצב יציב.",
      navHe: [
        "SAP Fiori ► Demand-Driven Replenishment ► Schedule Product Classification (DD)",
        "Production ► Material Requirements Planning ► Demand-Driven Replenishment ► Master Data Settings",
      ],
      tables: ["MARC", "PPH_DD_BUFFER"],
      tcodes: ["MD04"],
      fiori: ["F2102", "F2101"],
      configHe: [
        "אין הגדרת-זרימה מפורשת — הזרימה היא תוצאה של מיקום-הבאפרים (Decoupling Points).",
        "הזרימה נצפית בפועל דרך Manage Buffer Levels וב-Stock/Requirements List (DD).",
      ],
      mistakesHe: [
        "מיקום-באפר במקום שאינו מנתק תנודה אמיתית ➔ הבאפר 'לא עובד'.",
        "ציפייה שהמידע יזרום אוטומטית בלי באפר-ניתוק — בלי ניתוק אין הפרדת-איתות.",
      ],
      troubleshootHe: [
        "תנודה עדיין מתפשטת אחורה ➔ אין נקודת-ניתוק בנקודה הקריטית; בחן Buffer Positioning (14.5.3).",
        "תכנון מגיב לתחזית-רחוקה ➔ הבאפר לא הוגדר כ-Decoupled; בדוק DD-relevant.",
      ],
      bestPracticeHe: [
        "מקם ניתוק היכן שהוא שובר את שרשרת-התנודה הארוכה-ביותר.",
        "חשוב בשפת 'זרימה ואיתות' — לא בשפת 'מלאי מינימום' בלבד.",
      ],
      interviewHe: [
        { qHe: "מהי נקודת-ניתוק (Decoupling Point)?", aHe: "מיקום-באפר שמפריד בין זרימת-החומר משני צדדיו ומונע העברת-תנודה — כל מקטע מתכנן מול איתות מקומי." },
        { qHe: "כיצד DDMRP מפריד זרימת-חומר מזרימת-מידע?", aHe: "הבאפר מנתק: החומר נח בו, והמידע (אות-חידוש) נוצר מקומית דרך ה-Net Flow Equation במקום לעבור דרך כל הרמות." },
      ],
      takeawaysHe: [
        "באפרים = 'סכרים' השוברים את גל-התנודה.",
        "כל מקטע מתכנן מול איתות מקומי באופק DLT.",
        "הפרדת חומר↔מידע היא לב-ה-DDMRP.",
      ],
    },
    // ============================================================ 14.3
    {
      id: "14.3", titleHe: "יסודות DD-MRP", titleEn: "Demand-Driven Material Requirements Planning Basics",
      execHe:
        "DDMRP הוא שיטת-תכנון בת-חמישה רכיבים: מיקום אסטרטגי, פרופילים וגדלי-באפר, התאמות-באפר דינמיות, תכנון מונחה-ביקוש (Net Flow), וביצוע נראֶה ושיתופי. בליבה: באפרים בעלי שלושה אזורי-צבע (אדום/צהוב/ירוק) המגנים על התזרים.",
      beginnerHe:
        "DDMRP אומר: במקום לחשב הכל מתחזית, נשים 'מאגרים חכמים' (באפרים) בנקודות-מפתח. כל באפר מסומן בשלושה צבעים — אדום (בטיחות), צהוב (לב-העבודה), ירוק (חידוש). כשהמלאי-הזמין יורד לאזור הצהוב — מזמינים שוב.",
      consultantHe:
        "חמשת-הרכיבים: (1) Strategic Inventory Positioning, (2) Buffer Profiles & Levels, (3) Dynamic Adjustments, (4) Demand-Driven Planning, (5) Visible & Collaborative Execution. ב-S/4HANA הם ממומשים דרך אפליקציות-Fiori ייעודיות (PP-DD) ושדה DD-relevance באב-החומר. הבאפר מחושב מ-ADU (Average Daily Usage) × DLT × Lead Time Factor, מחולק לאזורים.",
      purposeHe:
        "לספק מסגרת-עבודה שלמה: היכן לשים מלאי, כמה, מתי להתאים, איך לתכנן ואיך לבצע — הכל סביב הגנת-התזרים.",
      processExampleHe:
        "חומר מסומן DD-relevant; הרצת-Classification מחשבת לו Buffer Profile ואזורים; אפליקציית Replenishment Planning מחשבת Net Flow יומי וממליצה על הזמנות-חידוש; המתכנן מאשר.",
      cbcHe:
        "ב-CBC חמשת-הרכיבים: מקמו באפר-תרכיז (1), חשבו אזורים לפי צריכה-יומית (2), עדכנו לעונת-קיץ (3), תכננו חידוש יומי (Net Flow) (4), ונהלו דרך לוח-Fiori צבעוני (5).",
      navHe: [
        "Production ► Material Requirements Planning ► Demand-Driven Replenishment",
        "SAP Fiori ► Demand-Driven Replenishment (PP-DD) catalog",
      ],
      tables: ["MARC", "PPH_DD_BUFFER", "PPH_DD_BUFFER"],
      tcodes: ["MD04", "SPRO"],
      fiori: ["F2101", "F2102", "F2228", "F2229"],
      configHe: [
        "הפעל DDMRP ברמת-מערכת/Business Function; הגדר Buffer Profiles (14.9) ו-Plant-specific settings (14.10).",
        "סמן חומרים DD-relevant — ידנית או דרך הרצת-Product Classification.",
      ],
      mistakesHe: [
        "יישום רק חלק מחמשת-הרכיבים (למשל באפרים בלי Dynamic Adjustments) ➔ באפרים מתיישנים.",
        "דילוג על שלב-המיקום (Positioning) — מקפיצים ישר לגדלים בלי לחשוב היכן.",
      ],
      troubleshootHe: [
        "ההמלצות לא מופיעות ➔ החומר אינו DD-relevant או לא עבר Classification.",
        "באפרים לא מתעדכנים לעונה ➔ Dynamic Adjustment (DAF) לא הוגדר.",
      ],
      bestPracticeHe: [
        "יישם את כל חמשת-הרכיבים כמכלול — הם תלויים זה בזה.",
        "התחל מפיילוט על חומרים אסטרטגיים מעטים, ואז הרחב.",
      ],
      interviewHe: [
        { qHe: "מהם חמשת רכיבי DDMRP?", aHe: "מיקום אסטרטגי, פרופילים/גדלי-באפר, התאמות-דינמיות, תכנון מונחה-ביקוש (Net Flow), וביצוע נראה-ושיתופי." },
        { qHe: "ממה מורכב באפר DDMRP?", aHe: "שלושה אזורים — אדום (בטיחות), צהוב (חידוש-ליבה), ירוק (כמות/תדירות-הזמנה) — מחושבים מ-ADU, DLT ופקטורים." },
      ],
      takeawaysHe: [
        "DDMRP = חמישה רכיבים שמשתלבים סביב באפרים.",
        "באפר = שלושה אזורי-צבע (אדום/צהוב/ירוק).",
        "ב-S/4HANA הכל מבוסס Fiori (PP-DD).",
      ],
      relatedHe: [
        { labelHe: "PP · MRP Type (13.2)", href: "/library/pp/chapter-13/#sub-13.2" },
      ],
      children: [
        {
          id: "14.3.1", titleHe: "היכן ליישם חידוש מונחה-ביקוש", titleEn: "Where to Implement Demand-Driven Replenishment",
          execHe: "לא כל חומר מתאים ל-DDMRP. מועמדים אידיאליים: חומרים אסטרטגיים בעלי-תנודתיות גבוהה, DLT ארוך, או נקודות-מפגש (BOM convergence/divergence) — שם הבאפר מניב את ההגנה-המרבית.",
          beginnerHe: "שמים באפר היכן שהוא 'משתלם': חומרים חשובים, עם אספקה ארוכה או ביקוש קופצני. לא שמים באפר על כל בורג זול ויציב.",
          consultantHe: "קריטריוני-מיקום: Lead Time, Variability, Customer Tolerance Time, Inventory Leverage (BOM convergence), ו-Critical Operation Protection. נקודת-ניתוק טובה מקצרת את ה-DLT לרמות שמתחתיה ומפחיתה תנודה מצטברת. ההחלטה ידנית-אסטרטגית, נתמכת בנתוני-Classification.",
          purposeHe: "למקד את ההשקעה-במלאי היכן שהיא מגנה על התזרים בצורה הטובה-ביותר, במקום לפזר באפרים בכל מקום.",
          processExampleHe: "ב-BOM רב-שלבי, ממקמים באפר בנקודת-convergence (שבה רכיבים רבים מתאחדים) — באפר אחד מגן על מגוון רחב של מוצרי-קצה.",
          cbcHe: "ב-CBC נקודת-ניתוק על תרכיז (אספקה ארוכה, קריטי לכל המשקאות) ועל אריזות-מפתח; מים ו-CO2 (זמינים-מקומית, יציבים) אינם מבוּפרים.",
          navHe: ["Production ► Material Requirements Planning ► Demand-Driven Replenishment ► Master Data Settings"],
          tables: ["MARC", "PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2101", "F2102"],
          configHe: ["סמן חומרים נבחרים DD-relevant; הגדר להם Decoupled Lead Time אם נדרש חישוב מותאם."],
          mistakesHe: ["מיקום-באפר על חומר יציב וזול — עלות ללא תועלת.", "אי-מיקום-באפר על צוואר-בקבוק אסטרטגי — התנודה ממשיכה לעבור."],
          troubleshootHe: ["באפר 'לא עוזר' ➔ מוקם בנקודה לא-אסטרטגית; שקול נקודת-convergence או צוואר-בקבוק."],
          bestPracticeHe: ["מקם בנקודות-convergence וב-DLT ארוך.", "הסתמך על נתוני-Classification לתעדף מועמדים."],
          interviewHe: [
            { qHe: "אילו חומרים מתאימים ל-DDMRP?", aHe: "אסטרטגיים בעלי-תנודתיות, DLT ארוך, או נקודות-convergence ב-BOM — שם הבאפר מגן הכי הרבה." },
            { qHe: "מהי נקודת-convergence?", aHe: "נקודה ב-BOM שבה רכיבים רבים מתאחדים; באפר שם מגן על מגוון מוצרי-קצה במלאי-אחד." },
          ],
          takeawaysHe: ["לא כל חומר מתאים ל-DDMRP.", "מקם בנקודות-מפתח: DLT ארוך, תנודתיות, convergence.", "ההחלטה אסטרטגית-ידנית."],
        },
        {
          id: "14.3.2", titleHe: "רכיבי DD-MRP", titleEn: "Demand-Driven Material Requirements Planning Components",
          execHe: "מרכיבי-הליבה התפעוליים: אב-החומר (DD-relevant, Decoupled Lead Time), Buffer Profile, אזורי-הבאפר (אדום/צהוב/ירוק), ה-Net Flow Position, ואיתות-החידוש. כל אלו נצרכים יחד בתהליך-התכנון היומי.",
          beginnerHe: "כדי ש-DDMRP יעבוד צריך: חומר מסומן ל-DDMRP, פרופיל-באפר, גדלי-אזורים, וחישוב יומי שמחליט אם צריך להזמין. אלו 'חלקי-המנוע'.",
          consultantHe: "הרכיבים נשענים על PPH_DD_BUFFER (נתוני-באפר) ועל שדות-MARC. ה-Net Flow Position = On-Hand + On-Order − Qualified Demand. כשהוא נופל לאזור-הצהוב/אדום — נוצר איתות-חידוש. אפליקציות-Fiori מציגות זאת בצבע.",
          purposeHe: "להבטיח שכל אבני-הבניין קיימות לפני התכנון: בלי Buffer Profile או אזורים אין מה לתכנן.",
          processExampleHe: "חומר DD-relevant ➔ Classification מקצה Buffer Profile ➔ חישוב אזורים ➔ הרצת Replenishment Planning קוראת את Net Flow ויוצרת המלצות.",
          cbcHe: "ב-CBC תרכיז: DD-relevant=כן, Buffer Profile='Medium-LT/High-Var', אזורים מחושבים מצריכה-יומית; הרצה יומית מאותתת חידוש לקו-הערבול.",
          navHe: ["Production ► Material Requirements Planning ► Demand-Driven Replenishment ► Master Data Settings"],
          tables: ["MARC", "PPH_DD_BUFFER", "PPH_DD_BUFFER"],
          tcodes: ["MD04", "SPRO"],
          fiori: ["F2228", "F2229", "F2101"],
          configHe: ["ודא: חומר DD-relevant, Buffer Profile משויך, אזורים מחושבים; אלו תנאי-סף לתכנון-DDMRP."],
          mistakesHe: ["חסר Buffer Profile ➔ אין אזורים, אין איתות.", "Net Flow מחושב על ביקוש לא-מסונן (ללא Qualified Demand)."],
          troubleshootHe: ["אין המלצות-חידוש ➔ אחד הרכיבים חסר: DD-relevant / Profile / אזורים.", "איתות שגוי ➔ Qualified Demand / Spike לא מוגדרים נכון."],
          bestPracticeHe: ["ודא שכל הרכיבים קיימים לפני הרצת-תכנון.", "תעד את Buffer Profile של כל חומר אסטרטגי."],
          interviewHe: [
            { qHe: "מהי משוואת ה-Net Flow Position?", aHe: "On-Hand + On-Order − Qualified Demand; כשהיא נופלת מתחת לסף-החידוש (Top of Yellow) — נוצר איתות-חידוש." },
            { qHe: "אילו רכיבים נדרשים לתכנון-DDMRP?", aHe: "אב-חומר DD-relevant, Buffer Profile, אזורים מחושבים, ו-Net Flow — ללא אחד מהם אין תכנון." },
          ],
          takeawaysHe: ["רכיבי-הליבה: DD-relevant, Profile, אזורים, Net Flow.", "Net Flow = On-Hand+On-Order−Qualified Demand.", "כולם תנאי-סף לתכנון."],
          relatedHe: [{ labelHe: "PP · אובייקט MARC", href: "/library/pp/object/MARC/" }],
        },
      ],
    },
    // ============================================================ 14.4
    {
      id: "14.4", titleHe: "חמשת רכיבי DDMRP", titleEn: "Five Components of DDMRP",
      execHe:
        "המתודולוגיה הרשמית (©Demand Driven Institute) מורכבת מחמישה רכיבים שמיושמים ב-S/4HANA דרך קונפיגורציה, נתוני-אב ואפליקציות-Fiori. הפרק מפרק את היישום הטכני לשלושה רבדים: הגדרות-קונפיגורציה, נתוני-אב, ואפליקציות-ביצוע.",
      beginnerHe:
        "כאן עוברים מ'תיאוריה' ל'איך עושים זאת ב-SAP'. שלושה רבדים: מה מגדירים ב-SPRO (קונפיגורציה), מה מזינים באב-החומר (נתוני-אב), ואילו מסכי-Fiori מריצים (טרנזקציות).",
      consultantHe:
        "מיפוי-יישום: רכיבים 1–2 (מיקום+גדלים) → Buffer Profile (SPRO) + DD-relevance; רכיב 3 (Dynamic Adjustment) → DAF/Lead Time/Variability factors; רכיב 4 (Planning) → אפליקציית Replenishment Planning; רכיב 5 (Execution) → Replenishment Execution + Manage Buffer Levels. הכל נסמך על PPH_DD_BUFFER.",
      purposeHe:
        "לתרגם את חמשת-הרכיבים התיאורטיים למערך-יישום קונקרטי ב-S/4HANA — מה להגדיר, מה להזין, מה להריץ.",
      processExampleHe:
        "מיישמים DDMRP לחומר: SPRO→Buffer Profile, אב-חומר→DD-relevant+Profile, ואז שלוש אפליקציות-Fiori — Classification, Buffer Proposal/Levels, Replenishment Planning.",
      cbcHe:
        "ב-CBC צוות-ה-PP מגדיר Buffer Profiles למשפחות-חומרים (תרכיזים/אריזות), מסמן חומרים, ומפעיל את אפליקציות-ה-Fiori בשגרה יומית.",
      navHe: [
        "SPRO ► Production ► MRP ► Demand-Driven Replenishment ► General Settings / Buffer Proposal (SPRO)",
        "SAP Fiori ► Demand-Driven Replenishment catalog (PP-DD)",
      ],
      tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER", "MARC"],
      tcodes: ["SPRO", "MD04"],
      fiori: ["F2101", "F2102", "F2228", "F2229", "F2230"],
      configHe: [
        "שלושת-הרבדים: Configuration (Buffer Profile), Master Data (DD-relevant), Transactions (Fiori apps).",
        "כל רכיב-מתודולוגי ממופה לפעולת-יישום ב-S/4HANA.",
      ],
      mistakesHe: [
        "טיפול ברכיב אחד בלבד מבלי לסגור את שלושת-הרבדים.",
        "הגדרת Buffer Profile בלי לסמן חומרים DD-relevant — שום דבר לא קורה.",
      ],
      troubleshootHe: [
        "DDMRP 'לא פעיל' ➔ אחד הרבדים חסר: Config / Master Data / Transaction.",
        "אפליקציות-Fiori ריקות ➔ אין חומרים DD-relevant מסווגים.",
      ],
      bestPracticeHe: [
        "סגור את שלושת-הרבדים לכל חומר: הגדרה→נתוני-אב→הרצה.",
        "תעד את מיפוי חמשת-הרכיבים ליישום-ה-S/4HANA לצוות.",
      ],
      interviewHe: [
        { qHe: "כיצד ממומשים חמשת-הרכיבים ב-S/4HANA?", aHe: "דרך שלושה רבדים: Configuration (Buffer Profile), Master Data (DD-relevance), ו-Transactions (אפליקציות-Fiori של PP-DD)." },
        { qHe: "מי הבעלים של מתודולוגיית DDMRP?", aHe: "Demand Driven Institute (DDI); SAP מיישם אותה ב-S/4HANA ברישיון/אישור." },
      ],
      takeawaysHe: [
        "חמשת-הרכיבים ממופים לשלושה רבדי-יישום.",
        "Config → Master Data → Transactions.",
        "סגירת כל הרבדים = DDMRP פעיל.",
      ],
      children: [
        {
          id: "14.4.1", titleHe: "הגדרות קונפיגורציה", titleEn: "Configuration Settings",
          execHe: "רובד-הקונפיגורציה ב-SPRO/SPRO: הגדרת Buffer Profiles, פקטורי-Lead-Time וה-Variability, סיווגי-Lead-Time, ופרמטרי-Net-Flow כלל-מפעליים. זהו הבסיס שעליו נשען חישוב-הבאפר.",
          beginnerHe: "כאן מגדירים ב-SPRO את 'התבניות' — פרופילי-באפר וטבלאות-פקטורים — שלפיהן יחושבו כל הבאפרים. מגדירים פעם-אחת, משתמשים לרבים.",
          consultantHe: "ב-SPRO מגדירים Buffer Profile עם Lead Time Category, Variability Category, Order Cycle, Minimum Order Qty ופקטורי-אזורים. הגדרות-מפעל (Plant-specific) מכוונות סיווגי-LT וספי-תנודתיות. הטבלה: PPH_DD_BUFFER.",
          purposeHe: "לקבוע מסגרת-חישוב אחידה: כל חומר ששויך לפרופיל יקבל אזורים לפי אותה לוגיקה.",
          processExampleHe: "מגדירים Profile 'Long-LT/High-Var' עם Red-Base-Factor גבוה; כל חומר-תרכיז ששויך אליו מקבל אזור-אדום גדול יחסית.",
          cbcHe: "ב-CBC מגדירים פרופילים למשפחות: 'תרכיז-יבוא' (LT ארוך), 'אריזה-מקומית' (LT קצר) — כל אחד עם פקטורים מתאימים.",
          navHe: ["SPRO ► Production ► MRP ► Demand-Driven Replenishment ► Maintain Buffer Proposal Profiles (SPRO)"],
          tables: ["PPH_DD_BUFFER"],
          tcodes: ["SPRO"],
          fiori: ["F2228"],
          configHe: ["ב-SPRO הגדר Buffer Profile: Lead Time Cat, Variability Cat, Order Cycle, MOQ, Lead-Time-Factor, Variability-Factor.", "הגדר סיווגי-LT וספי-תנודתיות ברמת-המפעל."],
          mistakesHe: ["פקטורי-אזורים קיצוניים ➔ באפר מנופח או רזה מדי.", "אי-התאמת סיווגי-LT למציאות-האספקה."],
          troubleshootHe: ["באפרים גדולים/קטנים מהצפוי ➔ פקטורי-LT/Variability בפרופיל; כוון ב-SPRO."],
          bestPracticeHe: ["התחל מפקטורי-ברירת-מחדל של DDI ואז כוון בנתונים.", "מעט פרופילים ככל האפשר — פחות שונות."],
          interviewHe: [{ qHe: "מה מגדירים ב-SPRO?", aHe: "Buffer Profiles עם קטגוריות-LT/Variability ופקטורי-אזורים — מסגרת-החישוב לכל חומר משויך." }],
          takeawaysHe: ["SPRO = הגדרת Buffer Profiles.", "פקטורי-LT/Variability קובעים גודל-אזורים.", "טבלה: PPH_DD_BUFFER."],
        },
        {
          id: "14.4.2", titleHe: "הגדרות נתוני-אב", titleEn: "Master Data Settings",
          execHe: "רובד-נתוני-האב: סימון חומר כ-DD-relevant, שיוך Buffer Profile, והזנת/חישוב Decoupled Lead Time ו-ADU. אלו הופכים חומר רגיל לחומר מנוהל-DDMRP.",
          beginnerHe: "באב-החומר מסמנים 'החומר הזה מנוהל ב-DDMRP', מצמידים לו פרופיל-באפר, ומזינים נתוני-אספקה וצריכה-יומית. בלי זה SAP לא יודע לחשב באפר.",
          consultantHe: "השדות יושבים ברובד-MARC ובטבלת PPH_DD_BUFFER: MRP Type מותאם (לעיתים), DD-relevance indicator, Buffer Profile, Decoupled Lead Time, ADU (מחושב מהיסטוריה/תחזית). חלק מהשדות מתמלאים אוטומטית בהרצת-Classification.",
          purposeHe: "לחבר את החומר הספציפי למסגרת-החישוב — להזין את הקלטים שמהם נגזרים האזורים.",
          processExampleHe: "מסמנים חומר DD-relevant, מצמידים Buffer Profile; הרצת-Classification מחשבת ADU מהצריכה-ההיסטורית וקובעת אזורים.",
          cbcHe: "ב-CBC לתרכיז: DD-relevant=כן, Profile='תרכיז-יבוא', DLT=21 ימים, ADU מחושב מצריכת-90-יום אחרונה.",
          navHe: ["Logistics ► Material Master ► MRP views (DD fields)", "SAP Fiori ► Manage Material Master Data (DD)"],
          tables: ["MARC", "PPH_DD_BUFFER"],
          tcodes: ["MM02", "MD04"],
          fiori: ["F2229", "F1602A"],
          configHe: ["באב-החומר: סמן DD-relevant, שייך Buffer Profile, הזן/אשר Decoupled Lead Time.", "ADU מחושב אוטומטית בהרצת-Classification או מוזן ידנית."],
          mistakesHe: ["DLT שגוי ➔ כל האזורים שגויים (האדום והירוק נגזרים ממנו).", "ADU מבוסס היסטוריה לא-מנוקה (כולל Spikes חד-פעמיים)."],
          troubleshootHe: ["אזורים לא-הגיוניים ➔ DLT או ADU שגויים באב-החומר.", "חומר לא נכלל בהרצה ➔ DD-relevance לא מסומן."],
          bestPracticeHe: ["נקה היסטוריה מ-Spikes לפני חישוב-ADU.", "אמת DLT מול זמן-האספקה-בפועל מדי תקופה."],
          interviewHe: [{ qHe: "אילו שדות-אב הופכים חומר ל-DDMRP?", aHe: "DD-relevance, Buffer Profile, Decoupled Lead Time ו-ADU — ברובד-MARC ובטבלת PPH_DD_BUFFER." }],
          takeawaysHe: ["נתוני-אב: DD-relevant + Profile + DLT + ADU.", "DLT ו-ADU הם הקלטים הקריטיים לאזורים.", "חלקם ממולא בהרצת-Classification."],
          relatedHe: [{ labelHe: "PP · אב-חומר (3.1)", href: "/library/pp/chapter-03/#sub-3.1" }],
        },
        {
          id: "14.4.3", titleHe: "טרנזקציות ואפליקציות", titleEn: "Transactions",
          execHe: "רובד-הביצוע ב-S/4HANA הוא כולו Fiori: Schedule Product Classification, Manage Buffer Levels, Replenishment Planning, ו-Replenishment Execution. אין כאן מסכי-SAPGUI מסורתיים — DDMRP נולד עם Fiori.",
          beginnerHe: "כל הפעולות היומיות נעשות באפליקציות-Fiori צבעוניות: אחת מסווגת חומרים, אחת מחשבת באפרים, אחת מתכננת חידוש, ואחת מנהלת ביצוע. אין כאן 'מסך-SAP ישן'.",
          consultantHe: "האפליקציות העיקריות: Schedule Product Classification (DD) → סיווג-ABC/XYZ; Manage Buffer Levels / Buffer Proposal → אזורים; Replenishment Planning (Net Flow) → המלצות; Replenishment Execution → ניטור-ביצוע מול On-Hand Alert Zone. כולן קוראות/כותבות ל-PPH_DD_BUFFER.",
          purposeHe: "לספק את כלי-העבודה היומיים: לסווג, לחשב, לתכנן ולבצע — בממשק נראה ושיתופי.",
          processExampleHe: "מתכנן פותח Replenishment Planning בבוקר, רואה חומרים בצהוב/אדום לפי Net Flow, מאשר הזמנות-חידוש; אחר-הצהריים בודק Replenishment Execution לחומרים בסיכון.",
          cbcHe: "ב-CBC מתכנן-ה-PP מתחיל יום ב-Replenishment Planning של התרכיזים, ועובר ל-Replenishment Execution כדי לזהות באפרים שירדו לאזור-אדום-קריטי.",
          navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Replenishment Planning / Replenishment Execution / Manage Buffer Levels"],
          tables: ["PPH_DD_BUFFER", "MARC"],
          tcodes: ["MD04"],
          fiori: ["F2102", "F2101", "F2230", "F3223", "F2228"],
          configHe: ["הקצה לתפקיד-המשתמש את ה-Business Catalog של PP-DD ב-Fiori Launchpad.", "אין קונפיגורציית-טרנזקציה ב-SAPGUI — הביצוע כולו ב-Fiori."],
          mistakesHe: ["חיפוש מסכי-SAPGUI מסורתיים — ב-DDMRP הביצוע הוא Fiori.", "אי-הקצאת Business Catalog ➔ האפליקציות אינן נראות למשתמש."],
          troubleshootHe: ["אפליקציה לא מופיעה ב-Launchpad ➔ חסר Business Catalog/Role.", "המלצות ריקות ➔ אין חומרים מסווגים / Net Flow מעל-סף."],
          bestPracticeHe: ["בנה רצף-עבודה יומי: Planning בבוקר, Execution אחר-הצהריים.", "השתמש בצבעי-האזורים לתעדוף — אדום קודם."],
          interviewHe: [
            { qHe: "מהן אפליקציות-ה-Fiori המרכזיות ב-DDMRP?", aHe: "Schedule Product Classification, Manage Buffer Levels, Replenishment Planning ו-Replenishment Execution — כולן Fiori." },
            { qHe: "מדוע DDMRP מבוסס-Fiori ולא SAPGUI?", aHe: "הוא הוצג ב-S/4HANA והמתודולוגיה דורשת ביצוע נראה-ושיתופי (צבעוני) — שמתממש בטבעיות ב-Fiori." },
          ],
          takeawaysHe: ["הביצוע כולו Fiori — אין SAPGUI.", "ארבע אפליקציות: סיווג, באפרים, תכנון, ביצוע.", "כולן נשענות על PPH_DD_BUFFER."],
        },
      ],
    },
    // ============================================================ 14.5
    {
      id: "14.5", titleHe: "באפרים ממוקמים-אסטרטגית", titleEn: "Strategically Placed Buffers",
      execHe:
        "הרכיב הראשון והקריטי ביותר: מיקום-המלאי האסטרטגי. במקום לפזר מלאי, ממקמים באפרים בנקודות-ניתוק נבחרות המגנות על התזרים ומקצרות את ה-DLT. החלטת-המיקום קובעת את כל היתר.",
      beginnerHe:
        "השלב הראשון הוא לבחור איפה לשים את הבאפרים. בחירה טובה = פחות מלאי כולל עם שירות גבוה יותר. בחירה גרועה = מלאי שלא עוזר. שאר-השלבים בונים על המיקום הזה.",
      consultantHe:
        "ששת-גורמי-המיקום של DDI: Customer Tolerance Time, Market Potential Lead Time, Variable Rate of Demand, Variable Rate of Supply, Inventory Leverage & Flexibility (BOM convergence), ו-Critical Operation Protection. המטרה: למקסם הגנת-תזרים למינימום-מלאי. ב-S/4HANA המיקום מתבטא בסימון DD-relevant של חומרים נבחרים.",
      purposeHe:
        "להחליט היכן 'לשבור' את שרשרת-התלות — היכן מלאי-באפר ייתן את התשואה-הגבוהה-ביותר בהגנת-תזרים.",
      processExampleHe:
        "מנתחים BOM רב-שלבי, מזהים נקודת-convergence ו-DLT ארוך, וממקמים שם באפר; כל המוצרים-מתחת נהנים מ-DLT מקוצר.",
      cbcHe:
        "ב-CBC ממקמים באפרים על תרכיז (LT ארוך, convergence לכל המשקאות) ועל אריזות-מפתח; כך קווי-המילוי מנותקים מתנודות-יבוא.",
      navHe: ["Production ► MRP ► Demand-Driven Replenishment ► Master Data Settings (DD-relevance)"],
      tables: ["MARC", "PPH_DD_BUFFER"],
      tcodes: ["MD04"],
      fiori: ["F2101", "F2102"],
      configHe: [
        "סמן את החומרים-הנבחרים DD-relevant — זהו ביטוי-המיקום ב-S/4HANA.",
        "המיקום עצמו הוא החלטה-אנליטית; SAP מספק נתונים, לא מחליט.",
      ],
      flow: [
        { he: "ניתוח שרשרת + BOM", note: "ששת-גורמי-המיקום" },
        { he: "זיהוי נקודות-ניתוק", note: "convergence / DLT ארוך" },
        { he: "סימון DD-relevant", code: "MD04" },
        { he: "חישוב אזורים", code: "F2228", note: "Buffer Proposal" },
        { he: "תכנון מול Net Flow", code: "F2102" },
      ],
      masterDataHe: [
        "MARC = DD-relevance + Buffer Profile · PPH_DD_BUFFER = נתוני-באפר ואזורים.",
        "Decoupled Lead Time (DLT) נגזר ממיקום-הבאפרים מתחת לחומר.",
      ],
      mistakesHe: [
        "מיקום-באפרים לפי 'תחושה' ולא לפי ששת-הגורמים.",
        "ריבוי-באפרים מיותר — מנפח מלאי במקום להגן ממוקד.",
      ],
      troubleshootHe: [
        "מלאי-כולל עלה אחרי-DDMRP ➔ באפרים ממוקמים-יתר; צמצם לנקודות-מפתח.",
        "DLT לא התקצר ➔ הבאפר לא ממוקם בנקודה שמנתקת את השרשרת-הארוכה.",
      ],
      bestPracticeHe: [
        "החל את ששת-גורמי-המיקום של DDI במפורש בכל החלטה.",
        "מקם בנקודות-convergence ובצווארי-בקבוק — תשואה מרבית.",
      ],
      interviewHe: [
        { qHe: "מהם ששת-גורמי-מיקום-הבאפר?", aHe: "Customer Tolerance Time, Market Potential LT, Variable Rate of Demand, Variable Rate of Supply, Inventory Leverage (convergence), ו-Critical Operation Protection." },
        { qHe: "מדוע המיקום הוא הרכיב-הקריטי-ביותר?", aHe: "הוא קובע את ה-DLT, את גודל-הבאפרים ואת הגנת-התזרים — כל שאר-הרכיבים בונים עליו." },
      ],
      takeawaysHe: [
        "מיקום אסטרטגי = הרכיב-הקריטי-ביותר.",
        "ששה גורמי-מיקום של DDI מנחים את ההחלטה.",
        "ב-S/4HANA המיקום = סימון DD-relevant.",
      ],
      children: [
        {
          id: "14.5.1", titleHe: "הגנה על התזרים", titleEn: "Protecting Throughput",
          execHe: "מטרת-העל של DDMRP אינה צמצום-מלאי אלא הגנה על התזרים (Throughput) — זרימה רציפה של חומר-נכון בזמן-הנכון. הבאפר מגן על התזרים בכך שהוא מבטיח זמינות-חומר בנקודה-הקריטית.",
          beginnerHe: "תזרים = כמה מהר ובאופן רציף החומר זורם דרך המערכת. הבאפר שומר שלא ייווצר 'פקק' או 'יובש' שעוצר את הזרימה. זמינות חשובה ממלאי-מינימלי.",
          consultantHe: "Throughput הוא מדד-העל (לפי Theory of Constraints). הבאפר מנתק את התנודה כדי שזרימת-החומר לא תיעצר. מדדי-תזרים (Flow metrics) — לא רמות-מלאי — הם הקריטריון להצלחה. אזור-אדום מגן על התזרים בנקודת-הצוואר.",
          purposeHe: "להסיט את הפוקוס מ'כמה מלאי' ל'כמה רציפה הזרימה' — שינוי-תפיסה מהותי מול MRP.",
          processExampleHe: "באפר-תרכיז מונע עצירת קו-מילוי בעת איחור-ספק; התזרים (בקבוקים/שעה) נשמר רציף למרות התנודה.",
          cbcHe: "ב-CBC הגנת-התזרים = קווי-המילוי לא נעצרים בגלל חוסר-תרכיז; הבאפר מבטיח זרימה רציפה גם בעונת-שיא.",
          navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Replenishment Execution (Flow protection)"],
          tables: ["PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2102", "F3223"],
          configHe: ["אין הגדרה ייעודית — הגנת-התזרים היא תוצר של מיקום-באפרים נכון וגדלים נכונים."],
          mistakesHe: ["מדידת-הצלחה ברמת-מלאי במקום ברציפות-תזרים.", "צמצום-באפר 'לחיסכון' שגורם לעצירות-תזרים."],
          troubleshootHe: ["עצירות-קו חוזרות ➔ באפר רזה מדי או ממוקם-שגוי; בחן Flow ולא מלאי."],
          bestPracticeHe: ["מדוד הצלחה במונחי-תזרים (זמינות, עצירות) ולא במלאי בלבד."],
          interviewHe: [{ qHe: "מהי מטרת-העל של DDMRP?", aHe: "הגנת-התזרים (Throughput) — זרימה רציפה של חומר-נכון בזמן-נכון; זמינות חשובה מצמצום-מלאי." }],
          takeawaysHe: ["המטרה = הגנת-תזרים, לא מלאי-מינימלי.", "הבאפר מונע עצירות/חוסרים.", "מדוד תזרים, לא רק מלאי."],
        },
        {
          id: "14.5.2", titleHe: "סיווג (Classification)", titleEn: "Classification",
          execHe: "סיווג-החומרים (ABC לפי ערך/נפח, XYZ לפי תנודתיות) הוא הבסיס-האנליטי לבחירת מועמדי-באפר ולקביעת פרופיל. הסיווג מתבצע ב-S/4HANA דרך אפליקציית Schedule Product Classification (DD).",
          beginnerHe: "ממיינים את החומרים: אילו יקרים/חשובים (ABC) ואילו תנודתיים (XYZ). המיון הזה עוזר להחליט על מי לשים באפר ובאיזה פרופיל.",
          consultantHe: "האפליקציה מריצה סיווג מבוסס-נתונים: ABC לפי Consumption Value, XYZ לפי Coefficient of Variation. התוצאה מזינה את בחירת-Buffer Profile ואת DD-relevance. ניתן לתזמן הרצה-תקופתית. נשען על נתוני-צריכה היסטוריים.",
          purposeHe: "להפוך את החלטת-המיקום והפרופיל מ'תחושה' לנתונים — מי תנודתי, מי בעל-ערך, מי מתאים לבאפר.",
          processExampleHe: "הרצת-Classification מסמנת תרכיז כ-AX (ערך-גבוה, יציב) ואריזה-עונתית כ-CZ (ערך-נמוך, תנודתי); כל אחד מקבל פרופיל-באפר שונה.",
          cbcHe: "ב-CBC הרצה-חודשית מסווגת: תרכיזים=A (ערך), משקאות-מבצע=Z (תנודתי); הפלט מנחה אילו לבּפר ובאיזה פרופיל.",
          navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Schedule Product Classification (DD)"],
          tables: ["PPH_DD_BUFFER", "MARC"],
          tcodes: ["MD04"],
          fiori: ["F2101", "F2228"],
          configHe: ["הגדר קריטריוני-ABC (ספי-ערך) וקריטריוני-XYZ (ספי-תנודתיות) בהרצת-הסיווג.", "תזמן הרצה-תקופתית (חודשי/רבעוני)."],
          mistakesHe: ["סיווג חד-פעמי שלא מתעדכן — חומרים משנים התנהגות.", "ספים שרירותיים ללא ניתוח-נתונים."],
          troubleshootHe: ["סיווג לא-הגיוני ➔ נתוני-צריכה לא-מנוקים או ספים שגויים.", "חומר חסר-סיווג ➔ אין נתוני-צריכה מספיקים."],
          bestPracticeHe: ["תזמן סיווג תקופתי קבוע.", "נקה Spikes חד-פעמיים מההיסטוריה לפני XYZ."],
          interviewHe: [{ qHe: "מה תפקיד הסיווג ב-DDMRP?", aHe: "ABC/XYZ הופכים את בחירת-המועמדים והפרופיל לנתונים — מי תנודתי ומי בעל-ערך — דרך אפליקציית Product Classification." }],
          takeawaysHe: ["ABC=ערך, XYZ=תנודתיות.", "הסיווג מזין מיקום ופרופיל.", "תזמן תקופתית."],
        },
        {
          id: "14.5.3", titleHe: "מיקום-באפר (Positioning)", titleEn: "Buffer Positioning",
          execHe: "מיקום-הבאפר הוא ההחלטה היכן בדיוק ב-BOM ובשרשרת-האספקה להציב נקודת-ניתוק. ההחלטה נשענת על ששת-הגורמים ועל הסיווג, ומשפיעה ישירות על ה-DLT של כל הרמות-מתחת.",
          beginnerHe: "אחרי שמיינו את החומרים, מחליטים בדיוק איפה לשים כל באפר — באיזו רמה ב'עץ-המוצר'. מיקום נכון מקצר את זמן-התגובה של כל מה שמתחתיו.",
          consultantHe: "מיקום בנקודת-convergence (איחוד-רכיבים) או divergence (פיצול-למוצרים) ממקסם Inventory Leverage. כל באפר מנתק וקובע מחדש את ה-DLT של החומרים מתחתיו. ב-S/4HANA מיושם בסימון DD-relevant של החומר-בנקודה.",
          purposeHe: "להציב את נקודות-הניתוק היכן שהן מקצרות את ה-DLT הכולל ומגנות על מירב-המוצרים.",
          processExampleHe: "באפר בנקודת-convergence שבה 8 רכיבים מתאחדים ל-2 חצאי-מוצר: באפר-אחד מקצר DLT ל-15 מוצרי-קצה.",
          cbcHe: "ב-CBC מיקום-באפר על תרכיז (convergence — כל המשקאות תלויים בו) נותן את ה-Leverage הגבוה-ביותר.",
          navHe: ["Production ► MRP ► Demand-Driven Replenishment ► Master Data Settings (DD-relevance)"],
          tables: ["MARC", "PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2101", "F2102"],
          configHe: ["סמן את החומר-בנקודה DD-relevant; ודא ש-DLT מחושב-מחדש לרמות-מתחת."],
          mistakesHe: ["מיקום ברמה לא-נכונה — מאבד Leverage.", "התעלמות מ-convergence/divergence בבחירה."],
          troubleshootHe: ["Leverage נמוך ➔ הבאפר לא מוקם בנקודת-איחוד; שקול רמה גבוהה יותר.", "DLT לא השתנה ➔ אין באפר בנקודה שמנתקת."],
          bestPracticeHe: ["העדף convergence ל-Leverage מרבי.", "אמת מחדש את ה-DLT אחרי כל שינוי-מיקום."],
          interviewHe: [{ qHe: "כיצד מיקום-באפר משפיע על DLT?", aHe: "כל באפר מנתק את השרשרת מתחתיו וקובע DLT חדש (קצר יותר) לחומרים שמתחתיו — לכן המיקום קריטי." }],
          takeawaysHe: ["מיקום קובע Leverage ו-DLT.", "convergence/divergence מנחים בחירה.", "מסומן DD-relevant."],
          relatedHe: [{ labelHe: "PP · עץ-מוצר BOM (3.2)", href: "/library/pp/chapter-03/#sub-3.2" }],
        },
        {
          id: "14.5.4", titleHe: "סיווג זמן-אספקה (Lead Time)", titleEn: "Lead Time Classification",
          execHe: "סיווג-Lead-Time (קצר/בינוני/ארוך) קובע את Lead Time Factor המשפיע על גודל-אזור-הירוק והאדום. ל-DLT ארוך מתאים פקטור שונה מ-DLT קצר — באפר ארוך-LT גדול יחסית.",
          beginnerHe: "מסווגים את זמן-האספקה לקצר/בינוני/ארוך. ככל שהאספקה ארוכה יותר, צריך באפר גדול יותר כדי לכסות את הזמן עד שההזמנה תגיע.",
          consultantHe: "ב-SPRO מגדירים Lead Time Categories עם טווחי-ימים ופקטורים. ה-Lead Time Factor מוכפל ב-(ADU × DLT) לחישוב אזור-הירוק והאדום-הבסיסי. סיווג שגוי מעוות את כל האזורים.",
          purposeHe: "להתאים את גודל-הבאפר לאורך-האספקה — כיסוי הולם ללא ניפוח.",
          processExampleHe: "DLT=21 ימים → קטגוריית 'Long' עם Factor גבוה → אזור-ירוק/אדום גדול; DLT=3 ימים → 'Short' עם Factor נמוך → באפר רזה.",
          cbcHe: "ב-CBC תרכיז-יבוא = 'Long LT' (פקטור גבוה, באפר גדול); אריזה-מקומית = 'Short LT' (באפר רזה).",
          navHe: ["SPRO ► ... ► Demand-Driven Replenishment ► Lead Time Categories (SPRO)"],
          tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER"],
          tcodes: ["SPRO"],
          fiori: ["F2228"],
          configHe: ["ב-SPRO הגדר Lead Time Categories עם טווחי-DLT ופקטורים (Short/Medium/Long)."],
          mistakesHe: ["סיווג-LT שאינו תואם DLT-בפועל ➔ אזורים שגויים.", "פקטור-LT אחיד לכל הקטגוריות — מאבד את משמעות-הסיווג."],
          troubleshootHe: ["אזור-ירוק/אדום מנופח ➔ קטגוריית-LT/פקטור גבוה מדי לחומר."],
          bestPracticeHe: ["יישר את גבולות-הקטגוריות עם פיזור-ה-DLT האמיתי בנתונים."],
          interviewHe: [{ qHe: "כיצד Lead Time משפיע על הבאפר?", aHe: "Lead Time Factor מוכפל ב-ADU×DLT לחישוב אזור-הירוק/אדום; LT ארוך → פקטור גבוה → באפר גדול יותר." }],
          takeawaysHe: ["LT מסווג לקצר/בינוני/ארוך.", "Factor משפיע על ירוק+אדום.", "מוגדר ב-SPRO."],
        },
        {
          id: "14.5.5", titleHe: "קביעת רמת-הבאפר", titleEn: "Buffer Level Determination",
          execHe: "קביעת-רמת-הבאפר היא תהליך-החישוב שמתרגם Buffer Profile + DLT + ADU + פקטורים לשלושת-האזורים בכמויות ממשיות. מתבצע באפליקציית Buffer Proposal / Manage Buffer Levels ונשמר ב-PPH_DD_BUFFER.",
          beginnerHe: "כאן SAP מחשב בפועל כמה יחידות יהיו בכל אזור (אדום/צהוב/ירוק) לפי הצריכה-היומית, זמן-האספקה והפקטורים. הפלט: מספרים ממשיים לכל חומר.",
          consultantHe: "הנוסחאות: Yellow = ADU × DLT; Green = max(ADU×DLT×LT-Factor, MOQ, ADU×Order-Cycle); Red = (ADU×DLT×LT-Factor) + Red-Safety(Variability-Factor). Top of Yellow (TOY) = Red+Yellow; Top of Green (TOG) = Red+Yellow+Green. כל אלו ב-PPH_DD_BUFFER.",
          purposeHe: "להפיק את הכמויות-המספריות שמהן ייגזרו איתותי-החידוש — לב-החישוב של DDMRP.",
          processExampleHe: "ADU=100, DLT=10, LT-Factor=0.5, Var-Factor=0.5: Yellow=1000, Green=500, Red=500+250=750; TOY=1750, TOG=2250.",
          cbcHe: "ב-CBC לתרכיז: ADU=200, DLT=21 → Yellow=4200, Green/Red לפי פקטורי-'Long/High-Var'; הפלט מנחה את החידוש היומי.",
          navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Manage Buffer Levels / Buffer Proposal"],
          tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2228", "F2229"],
          configHe: ["הרץ Buffer Proposal לחישוב אזורים; אשר/התאם ב-Manage Buffer Levels.", "האזורים נשמרים ב-PPH_DD_BUFFER ומשמשים את התכנון."],
          mistakesHe: ["אישור-אזורים אוטומטי ללא בקרה.", "MOQ שמנפח את הירוק מעבר לצורך."],
          troubleshootHe: ["אזורים אפסיים ➔ ADU=0 (אין צריכה) או DLT חסר.", "ירוק מנופח ➔ MOQ או Order-Cycle גדולים."],
          bestPracticeHe: ["בדוק את הפלט מול שיקול-דעת לפני אישור.", "עקוב אחרי שינויי-ADU כדי לזהות חישוב לא-עדכני."],
          interviewHe: [
            { qHe: "כיצד מחושב אזור-הצהוב?", aHe: "Yellow = ADU × DLT — לב-הבאפר, מכסה את הצריכה לאורך זמן-האספקה המנותק." },
            { qHe: "מהו Top of Green (TOG)?", aHe: "סכום שלושת-האזורים (Red+Yellow+Green) — רמת-המלאי-המקסימלית שאליה מחדשים." },
          ],
          takeawaysHe: ["Yellow=ADU×DLT; Green/Red לפי פקטורים.", "TOY=Red+Yellow; TOG=Red+Yellow+Green.", "נשמר ב-PPH_DD_BUFFER."],
        },
        {
          id: "14.5.6", titleHe: "תכנון וביצוע", titleEn: "Planning and Execution",
          execHe: "השלב התפעולי: התכנון מחשב Net Flow יומי ומפיק המלצות-חידוש; הביצוע מנטר את ה-On-Hand מול אזורי-אזהרה ומסמן חומרים-בסיכון. שני-השלבים נעשים באפליקציות-Fiori נפרדות.",
          beginnerHe: "אחרי שיש באפרים — מתכננים (מי לחדש היום לפי Net Flow) ומבצעים (מי בסכנת-חוסר עכשיו). שתי משימות יומיות נפרדות.",
          consultantHe: "Planning: Net Flow = On-Hand+On-Order−Qualified Demand; אם < TOY → המלצת-חידוש עד TOG. Execution: ניטור On-Hand מול Red zone (Alert) ללא קשר ל-On-Order — מזהה סיכון-מיידי. שתי-הזוויות משלימות: צפי מול מצב-נוכחי.",
          purposeHe: "להפריד בין החלטת-הזמנה (Planning, מבוסס Net Flow) לבין ניטור-סיכון-מיידי (Execution, מבוסס On-Hand) — שתי שאלות שונות.",
          processExampleHe: "בוקר: Planning מזהה Net Flow=1600<TOY=1750 → המלצה לחדש ל-2250 (TOG). צהריים: Execution מזהה On-Hand ירד לאזור-אדום → התראת-סיכון.",
          cbcHe: "ב-CBC המתכנן מריץ Planning של התרכיזים בבוקר, ובודק Execution לפני-משמרת כדי לוודא שאף תרכיז לא ייכנס לאדום בקו-הערבול.",
          navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Replenishment Planning / Replenishment Execution"],
          tables: ["PPH_DD_BUFFER", "MARC"],
          tcodes: ["MD04"],
          fiori: ["F2102", "F3223"],
          configHe: ["הקצה את אפליקציות-Planning ו-Execution לתפקיד-המתכנן.", "אין קונפיגורציה ייעודית — הלוגיקה מובנית סביב Net Flow ואזורים."],
          mistakesHe: ["ערבוב Planning ו-Execution — שתי שאלות שונות (צפי מול עכשיו).", "התעלמות מ-Execution-Alerts כי 'Net Flow תקין'."],
          troubleshootHe: ["חוסר-בפתע למרות Net Flow תקין ➔ Execution-Alert הוחמץ (On-Hand נמוך אף שיש On-Order)."],
          bestPracticeHe: ["הרץ Planning ו-Execution כשגרה יומית קבועה.", "תעדף לפי צבע: אדום ב-Execution קודם לכל."],
          interviewHe: [
            { qHe: "מה ההבדל בין Planning ל-Execution ב-DDMRP?", aHe: "Planning מחליט מתי להזמין לפי Net Flow (כולל On-Order); Execution מנטר סיכון-מיידי לפי On-Hand בלבד מול אזור-אדום." },
            { qHe: "מתי נוצרת המלצת-חידוש?", aHe: "כש-Net Flow Position יורד מתחת ל-Top of Yellow; ההמלצה מחדשת עד Top of Green." },
          ],
          takeawaysHe: ["Planning=Net Flow (צפי); Execution=On-Hand (עכשיו).", "המלצה כש-NetFlow<TOY, חידוש עד TOG.", "שתי אפליקציות-Fiori נפרדות."],
        },
        {
          id: "14.5.7", titleHe: "מדדים ואנליטיקה", titleEn: "Metrics and Analytics",
          execHe: "DDMRP מנוהל לפי מדדי-תזרים ולא מלאי: Buffer Status (% מ-TOG), On-Hand Alert frequency, Reliability ו-Flow Index. אפליקציות-Fiori אנליטיות מציגות מגמות וחריגות.",
          beginnerHe: "כדי לדעת אם DDMRP עובד מודדים: כמה זמן באפרים באדום, כמה התראות, ואיך הזרימה. המדדים מנחים התאמות-באפר.",
          consultantHe: "מדדים מרכזיים: Buffer Penetration (% חדירה לאזורים), On-Hand below Top of Red frequency, Order Spike events, ו-Decoupled Lead Time adherence. הניתוח מזין החלטות-Dynamic-Adjustment (DAF) ומיקום-מחדש. נצפה דרך Fiori analytical apps.",
          purposeHe: "לסגור את לולאת-המשוב: למדוד תזרים, לזהות באפרים שגויים, ולכוון פרופילים/מיקום.",
          processExampleHe: "מדד מראה שבאפר נכנס לאדום 30% מהזמן → אות להגדיל פקטור או לבחון מיקום; באפר שלא יוצא מהירוק → אולי מנופח.",
          cbcHe: "ב-CBC דוח-חודשי מראה שבאפר-תרכיז בעונת-קיץ באדום תכופות → מפעילים DAF עונתי להגדלת-האזורים.",
          navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Buffer / Flow analytics"],
          tables: ["PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F3223", "F2102"],
          configHe: ["השתמש באפליקציות-אנליטיות מובנות; אין קונפיגורציה ייעודית למדדים."],
          mistakesHe: ["מדידת-מלאי במקום תזרים.", "אי-שימוש במדדים לכיול-באפרים — הם 'נשכחים'."],
          troubleshootHe: ["באפר תמיד-באדום ➔ פקטורים נמוכים/מיקום שגוי.", "באפר תמיד-בירוק-מלא ➔ מנופח; הקטן."],
          bestPracticeHe: ["סקור מדדי-באפר תקופתית והזן ל-Dynamic Adjustments.", "מדוד תזרים ושירות, לא רק רמת-מלאי."],
          interviewHe: [{ qHe: "אילו מדדים מנחים DDMRP?", aHe: "Buffer Penetration, On-Hand Alert frequency, Order Spikes ו-DLT adherence — מדדי-תזרים שמזינים התאמות-באפר." }],
          takeawaysHe: ["מדוד תזרים, לא מלאי.", "Buffer Penetration מנחה כיול.", "המדדים מזינים Dynamic Adjustments."],
        },
      ],
    },
    // ============================================================ 14.6
    {
      id: "14.6", titleHe: "אזורי-הבאפר", titleEn: "Buffer Zones",
      execHe:
        "כל באפר מחולק לשלושה אזורי-צבע: אדום (Red — בטיחות והגנה מתנודתיות), צהוב (Yellow — לב-החידוש, מכסה את ה-DLT), וירוק (Green — קובע כמות ותדירות-הזמנה). הצבעים מתורגמים ישירות לפעולה ויזואלית באפליקציות.",
      beginnerHe:
        "תאר מד-דלק עם שלושה צבעים: ירוק (מלא, הכל טוב), צהוב (מתחיל לרדת — הזמן להזמין), אדום (נמוך — סכנה). DDMRP צובע כל באפר כך, וכל צבע אומר מה לעשות.",
      consultantHe:
        "Red = הגנה (Red Base = ADU×DLT×LT-Factor; Red Safety = Red Base × Variability-Factor). Yellow = ADU×DLT (לב-החידוש). Green = max(ADU×DLT×LT-Factor, MOQ, ADU×Order-Cycle) — קובע גודל-הזמנה ותדירות. Top of Yellow = Red+Yellow (סף-הזמנה); Top of Green = Red+Yellow+Green (יעד-חידוש).",
      purposeHe:
        "לתרגם חישוב-מתמטי לשפת-פעולה ויזואלית: כל צבע מסמן מצב והחלטה — לא צריך לקרוא מספרים, רואים צבע.",
      processExampleHe:
        "Net Flow באזור-ירוק → אין צורך לחדש. נכנס לצהוב → צור הזמנת-חידוש עד Top of Green. ירד לאדום → סיכון, תעדף.",
      cbcHe:
        "ב-CBC לוח-Fiori של מתכנן-התרכיזים: ירוק=שב בנחת, צהוב=הזמן ספק-יבוא, אדום=זרז משלוח/הקצה-עדיפות-לקו.",
      navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Manage Buffer Levels (zones view)"],
      tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER"],
      tcodes: ["MD04"],
      fiori: ["F2228", "F2102", "F2229"],
      configHe: [
        "האזורים נגזרים מ-Buffer Profile (פקטורי LT/Variability/Order-Cycle/MOQ) שב-SPRO.",
        "Red מתחלק ל-Red Base + Red Safety; Yellow=ADU×DLT; Green לפי המקסימום משלושת-הגורמים.",
      ],
      flow: [
        { he: "Green — מלא", note: "אין חידוש" },
        { he: "Yellow — לב", note: "צור הזמנה עד TOG" },
        { he: "Red — בטיחות", note: "סיכון; תעדף" },
        { he: "Top of Yellow", note: "סף-הזמנה = Red+Yellow" },
        { he: "Top of Green", note: "יעד = Red+Yellow+Green" },
      ],
      masterDataHe: [
        "PPH_DD_BUFFER מאחסן את גבולות-האזורים (TOR/TOY/TOG) המחושבים.",
        "Red = Red Base + Red Safety · Yellow = ADU×DLT · Green = max(LT-Factor·ADU·DLT, MOQ, ADU·Order-Cycle).",
      ],
      mistakesHe: [
        "בלבול בין Top of Yellow (סף-הזמנה) ל-Top of Green (יעד-חידוש).",
        "אזור-אדום רזה מדי ➔ חוסרים תכופים; פקטור-Variability נמוך.",
      ],
      troubleshootHe: [
        "חידוש מאוחר ➔ סף-ההזמנה (TOY) נמוך מדי; הגדל Yellow/אזורים.",
        "עודף-מלאי קבוע ➔ Green מנופח (MOQ/Order-Cycle גדולים).",
      ],
      bestPracticeHe: [
        "הצג למתכננים את שלושת-הצבעים — לא מספרים גולמיים.",
        "כייל את אזור-האדום מול תנודתיות-בפועל (Variability-Factor).",
      ],
      interviewHe: [
        { qHe: "מה מייצג כל אחד משלושת-האזורים?", aHe: "אדום=בטיחות/הגנה מתנודתיות; צהוב=לב-החידוש (ADU×DLT); ירוק=גודל ותדירות-הזמנה." },
        { qHe: "מהו ההבדל בין TOY ל-TOG?", aHe: "Top of Yellow=Red+Yellow הוא סף-יצירת-ההזמנה; Top of Green=Red+Yellow+Green הוא הכמות-שאליה מחדשים." },
      ],
      takeawaysHe: [
        "שלושה אזורים: אדום=בטיחות, צהוב=חידוש, ירוק=כמות/תדירות.",
        "TOY=סף-הזמנה; TOG=יעד-חידוש.",
        "הצבע = הפעולה (ויזואלי).",
      ],
      relatedHe: [
        { labelHe: "PP · Safety Stock (13.8)", href: "/library/pp/chapter-13/#sub-13.8" },
      ],
    },
    // ============================================================ 14.7
    {
      id: "14.7", titleHe: "חישוב-הבאפר ומשוואת התזרים-הנקי", titleEn: "Buffer Calculation",
      execHe:
        "לב-המנגנון: כל יום מחושב Net Flow Position = On-Hand + On-Order − Qualified Sales Order Demand. כשהוא יורד מתחת ל-Top of Yellow נוצרת המלצת-חידוש עד Top of Green. זוהי המשוואה שמניעה את כל DDMRP.",
      beginnerHe:
        "במקום לחשב מתחזית, DDMRP שואל כל יום: 'כמה יש לי + כמה בדרך − כמה באמת דרוש?'. אם המספר נמוך מדי (מתחת לצהוב) — מזמינים עד למילוי-הירוק.",
      consultantHe:
        "Net Flow = On-Hand Stock + Open Supply (On-Order) − Qualified Demand. Qualified Demand = ביקוש-להיום + פיגורים + Order Spikes שחוצים את ה-Spike Threshold בתוך ה-Spike Horizon. ה-Spike Threshold (לרוב כ-50% מ-Red) מונע שפיקועי-ביקוש חד-פעמיים מלסחוף את ה-Net Flow.",
      purposeHe:
        "לחשב איתות-חידוש מבוסס-ביקוש-אמיתי ולא תחזית — עם סינון-רעש (Spikes) כדי שלא נגיב לכל קפיצה זמנית.",
      processExampleHe:
        "On-Hand=800, On-Order=600, Qualified Demand=300 → Net Flow=1100. אם TOY=1750 → 1100<1750 → המלצת-חידוש של (TOG−Net Flow)=2250−1100=1150.",
      cbcHe:
        "ב-CBC לתרכיז: On-Hand 3000 + On-Order 1000 − Qualified Demand 1500 = Net Flow 3500; אם TOY=4200 → מחדשים ל-TOG (למשל 5400), הזמנה של 1900.",
      navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Replenishment Planning (Net Flow)"],
      tables: ["PPH_DD_BUFFER", "MARC", "VBBE"],
      tcodes: ["MD04"],
      fiori: ["F2102", "F2228"],
      configHe: [
        "הגדר Spike Threshold (% מ-Red) ו-Spike Horizon (ימים) לסינון-Qualified-Demand.",
        "Net Flow מחושב יומית באפליקציית Replenishment Planning; אין הזנה ידנית.",
      ],
      flow: [
        { he: "On-Hand", note: "מלאי-פיזי זמין" },
        { he: "+ On-Order", note: "אספקה-פתוחה" },
        { he: "− Qualified Demand", note: "ביקוש+פיגורים+Spikes" },
        { he: "= Net Flow Position" },
        { he: "אם < TOY → חידוש עד TOG", code: "F2102" },
      ],
      masterDataHe: [
        "Qualified Demand = Past-due + Today + Order Spikes (> Spike Threshold בתוך Spike Horizon).",
        "Spike Threshold ≈ 50% מ-Red zone (ניתן לכיול); Spike Horizon = חלון-הבדיקה קדימה.",
      ],
      mistakesHe: [
        "הזנת Qualified Demand ללא Spike-filtering ➔ תגובת-יתר לקפיצות חד-פעמיות.",
        "שכחת On-Order במשוואה ➔ הזמנות-כפולות.",
      ],
      troubleshootHe: [
        "הזמנות-יתר תכופות ➔ Spike Threshold גבוה/לא-מוגדר; ביקוש-רעש נכנס ל-Qualified Demand.",
        "Net Flow לא יורד למרות ביקוש ➔ On-Order כולל הזמנות-רפאים שלא יגיעו.",
      ],
      bestPracticeHe: [
        "כייל את Spike Threshold כך שיסנן רעש אך יזהה שיא-אמיתי.",
        "ודא דיוק On-Order — הזמנות-פתוחות אמיתיות בלבד.",
      ],
      interviewHe: [
        { qHe: "מהי משוואת ה-Net Flow?", aHe: "Net Flow = On-Hand + On-Order − Qualified Demand; מתחת ל-TOY נוצר חידוש עד TOG." },
        { qHe: "מהו Order Spike ומדוע מסננים אותו?", aHe: "קפיצת-ביקוש חריגה בחלון קצר; ה-Spike Threshold מונע שקפיצה חד-פעמית תסחוף את ה-Net Flow לחידוש-יתר." },
      ],
      takeawaysHe: [
        "Net Flow = On-Hand + On-Order − Qualified Demand.",
        "חידוש כש-NetFlow<TOY, עד TOG.",
        "Spike Threshold מסנן רעש-ביקוש.",
      ],
      relatedHe: [
        { labelHe: "PP · Reorder Point (13.7)", href: "/library/pp/chapter-13/#sub-13.7" },
      ],
    },
    // ============================================================ 14.8
    {
      id: "14.8", titleHe: "ביצוע DDMRP", titleEn: "DDMRP Execution",
      execHe:
        "שלב-הביצוע מנטר את החומרים-המבּוּפרים מול אזורי-אזהרה בזמן-אמת: On-Hand Alert (חומר שמלאי-היד שלו נכנס לאדום), ו-Projected On-Hand. המטרה לזהות סיכון-מיידי ולפעול לפני שנוצר חוסר.",
      beginnerHe:
        "אחרי שהתכנון יצר הזמנות, הביצוע 'שומר' שלא ייווצר חוסר עכשיו: מסתכל על המלאי-הפיזי ביד ומסמן באדום מי בסכנה. זה ניטור-שוטף, לא תכנון.",
      consultantHe:
        "Execution נשען על On-Hand Status (לא Net Flow): כשה-On-Hand יורד לאזור-אדום נוצר Alert ללא תלות ב-On-Order. בנוסף Projected On-Hand Alerts צופים חוסר-עתידי. ה-Synchronization Alerts מזהים פערי-עיתוי באספקה. אפליקציית Replenishment Execution מציגה הכל בצבע.",
      purposeHe:
        "להגן על התזרים בזמן-אמת — לתפוס סיכוני-חוסר מיידיים שהתכנון (מבוסס-Net-Flow) עלול לפספס.",
      processExampleHe:
        "Net Flow תקין (כי On-Order גבוה), אך הספק מאחר — ה-On-Hand בפועל נכנס לאדום. Execution מסמן Alert, והמתכנן מזרז את המשלוח.",
      cbcHe:
        "ב-CBC לפני-משמרת: מתכנן בודק Replenishment Execution; תרכיז שמלאי-היד שלו באדום מקבל קדימות — מזרזים שחרור-QA או משלוח-יבוא.",
      navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Replenishment Execution"],
      tables: ["PPH_DD_BUFFER", "MARC"],
      tcodes: ["MD04"],
      fiori: ["F3223", "F2102"],
      configHe: [
        "הגדר אזורי-On-Hand-Alert (לרוב = אזור-אדום); סף-ההתראה נגזר מ-Buffer.",
        "אין קונפיגורציה נפרדת — Execution קורא את אותם אזורים שב-PPH_DD_BUFFER.",
      ],
      flow: [
        { he: "ניטור On-Hand", code: "F3223" },
        { he: "On-Hand באדום? → Alert", note: "סיכון-מיידי" },
        { he: "Projected On-Hand", note: "צפי-חוסר עתידי" },
        { he: "Synchronization Alert", note: "פער-עיתוי" },
        { he: "פעולה: זרז/הקצה" },
      ],
      masterDataHe: [
        "On-Hand Alert Zone = אזור-אדום (TOR) של הבאפר.",
        "Projected On-Hand נגזר מ-On-Hand + אספקות-מתוכננות לאורך זמן.",
      ],
      mistakesHe: [
        "הסתמכות על Planning בלבד ➔ פספוס סיכון-On-Hand מיידי כש-On-Order לא יגיע בזמן.",
        "התעלמות מ-Synchronization Alerts (פערי-עיתוי).",
      ],
      troubleshootHe: [
        "חוסר-פתאומי למרות הזמנות-פתוחות ➔ On-Hand Alert הוחמץ; הספק איחר אך Net Flow 'נראה תקין'.",
        "Alerts רבים מדי ➔ אזור-אדום רזה מדי; כייל Variability-Factor.",
      ],
      bestPracticeHe: [
        "הרץ Execution כשגרה לפני-משמרת ותעדף אדום.",
        "טפל ב-Synchronization Alerts מוקדם — הם מקדימים את החוסר.",
      ],
      interviewHe: [
        { qHe: "במה Execution שונה מ-Planning?", aHe: "Execution מנטר On-Hand בזמן-אמת מול אזור-אדום (סיכון-מיידי), בעוד Planning מחליט הזמנות לפי Net Flow (כולל On-Order)." },
        { qHe: "מהו On-Hand Alert?", aHe: "התראה כשמלאי-היד הפיזי נכנס לאזור-האדום — סיכון-חוסר מיידי, ללא תלות בהזמנות-פתוחות." },
      ],
      takeawaysHe: [
        "Execution = ניטור On-Hand בזמן-אמת.",
        "On-Hand Alert = סיכון-מיידי (אדום).",
        "תופס מה ש-Planning מפספס.",
      ],
    },
    // ============================================================ 14.9
    {
      id: "14.9", titleHe: "פרופיל-באפר סטנדרטי", titleEn: "Standard Buffer Profile",
      execHe:
        "ה-Buffer Profile הוא ישות-הקונפיגורציה המרכזית: צרור-פקטורים (Lead Time, Variability, Order Cycle, MOQ) שלפיו מחושבים אזורי-הבאפר לכל חומר משויך. SAP מספק פרופילים-סטנדרטיים שאפשר להעתיק ולכוון.",
      beginnerHe:
        "פרופיל-באפר הוא 'תבנית-חישוב': מגדירים פעם-אחת קבוצת-פקטורים, ומשייכים אליה הרבה חומרים דומים. כל החומרים-בפרופיל מחושבים לפי אותם כללים.",
      consultantHe:
        "ב-SPRO מגדירים Buffer Profile עם: Lead Time Category+Factor, Variability Category+Factor, Order Cycle (תדירות-הזמנה רצויה), ו-Minimum/Maximum Order Quantity. אלו מזינים את נוסחאות-האזורים. הטבלה PPH_DD_BUFFER. פרופיל-סטנדרטי משמש כבסיס-העתקה.",
      purposeHe:
        "לתקנן את חישוב-הבאפרים: במקום לכוון כל חומר לחוד, מנהלים מעט פרופילים למשפחות-התנהגות.",
      processExampleHe:
        "פרופיל 'Medium-LT/High-Var': LT-Factor=0.5, Var-Factor=0.7, Order-Cycle=7; כל חומר משויך מקבל אזורים לפי כך. שינוי-פרופיל מעדכן את כל החומרים-בו.",
      cbcHe:
        "ב-CBC מגדירים פרופיל 'תרכיז-יבוא' (LT ארוך, Var גבוה) ו'אריזה-מקומית' (LT קצר, Var נמוך); כל חומר משויך למשפחתו.",
      navHe: ["SPRO ► Production ► MRP ► Demand-Driven Replenishment ► Maintain Buffer Profiles (SPRO)"],
      tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER"],
      tcodes: ["SPRO"],
      fiori: ["F2228", "F2229"],
      configHe: [
        "ב-SPRO: צור Buffer Profile עם Lead Time+Variability Categories ופקטורים, Order Cycle, MOQ.",
        "העתק מפרופיל-סטנדרטי של SAP וכוון לפי-משפחה.",
      ],
      masterDataHe: [
        "Buffer Profile משויך לחומר ברובד-MARC; הוא קישור-המפתח בין הקונפיגורציה לאב-החומר.",
        "כל החומרים בפרופיל מחושבים מאותם פקטורים.",
      ],
      mistakesHe: [
        "ריבוי-פרופילים — מקשה תחזוקה ומאבד את יתרון-התקנון.",
        "פקטורים שהועתקו ולא כוונו לנתוני-המפעל.",
      ],
      troubleshootHe: [
        "אזורים שגויים לכל משפחה ➔ פקטורי-הפרופיל; כוון ב-SPRO.",
        "שינוי לא-מתפשט ➔ חומר משויך לפרופיל אחר מהצפוי.",
      ],
      bestPracticeHe: [
        "מעט פרופילים ככל האפשר — לפי משפחות-התנהגות.",
        "התחל מפרופיל-סטנדרטי ואז כייל בנתונים.",
      ],
      interviewHe: [
        { qHe: "מהו Buffer Profile?", aHe: "צרור-פקטורים (LT, Variability, Order Cycle, MOQ) שמחושבים לפיו אזורי-הבאפר לכל חומר משויך; מוגדר ב-SPRO." },
        { qHe: "מדוע להעדיף מעט פרופילים?", aHe: "תקנון: ניהול לפי משפחות-התנהגות מקל תחזוקה ומונע שונות-יתר — בדומה לתקנון MRP Types ו-Lot Sizes." },
      ],
      takeawaysHe: [
        "Buffer Profile = תבנית-חישוב לאזורים.",
        "מוגדר ב-SPRO, נשמר ב-PPH_DD_BUFFER.",
        "משויך לחומר ב-MARC; מעט פרופילים.",
      ],
      relatedHe: [
        { labelHe: "PP · אב-חומר (3.1)", href: "/library/pp/chapter-03/#sub-3.1" },
      ],
      children: [
        {
          id: "14.10", titleHe: "הגדרות פרופיל-באפר ברמת-מפעל", titleEn: "Plant-Specific Settings of Buffer Profile",
          execHe: "מעבר לפרופיל הכלל-מערכתי, ניתן לכוון הגדרות-באפר ברמת-המפעל: ספי-Lead-Time, ספי-תנודתיות, ופרמטרי-Spike מקומיים — כי לכל מפעל פרופיל-אספקה ותנודתיות שונה.",
          beginnerHe: "אותו חומר במפעל-יבוא ובמפעל-מקומי מתנהג שונה. ההגדרות-ברמת-מפעל מאפשרות לכוון את הבאפר לתנאי-המקום הספציפי.",
          consultantHe: "ברמת-המפעל (PPH_DD_BUFFER plant-key) מגדירים את גבולות סיווגי-ה-LT/Variability ואת ברירות-מחדל-ה-Spike. כך אותו Buffer Profile מניב אזורים מותאמים-מפעל. חשוב בארגון רב-אתרי.",
          purposeHe: "להתאים את חישוב-הבאפר למציאות-האספקה והביקוש הספציפית לכל מפעל, בלי לשכפל פרופילים.",
          processExampleHe: "מפעל-A (יבוא) מגדיר סף-'Long-LT'=14 ימים; מפעל-B (מקומי) מגדיר 7; אותו פרופיל מניב אזורים שונים לכל מפעל.",
          cbcHe: "ב-CBC אתר-מרכזי (יבוא-תרכיז) ואתר-משני נבדלים בספי-LT; ההגדרות-ברמת-מפעל מכוונות כל אחד.",
          navHe: ["SPRO ► ... ► Demand-Driven Replenishment ► Plant-Specific Buffer Settings (SPRO)"],
          tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER"],
          tcodes: ["SPRO"],
          fiori: ["F2228"],
          configHe: ["ברמת-המפעל ב-SPRO הגדר ספי-LT, ספי-Variability ופרמטרי-Spike מקומיים."],
          mistakesHe: ["שימוש בהגדרות גלובליות זהות לכל המפעלים למרות הבדלי-אספקה.", "הגדרות-מפעל שסותרות את היגיון-הפרופיל."],
          troubleshootHe: ["אזורים זהים בין מפעלים-שונים-במהותם ➔ חסרות הגדרות-ברמת-מפעל."],
          bestPracticeHe: ["כוון ספי-LT/Variability לכל מפעל לפי נתוניו.", "תעד את הבדלי-המפעלים לצוות."],
          interviewHe: [{ qHe: "מדוע נדרשות הגדרות-באפר ברמת-מפעל?", aHe: "אותו חומר מתנהג שונה בכל מפעל (אספקה/תנודתיות); ההגדרות-המקומיות מכוונות את האזורים בלי לשכפל פרופילים." }],
          takeawaysHe: ["הגדרות-מפעל מכוונות ספי-LT/Variability/Spike.", "אותו פרופיל → אזורים שונים למפעל.", "חיוני בארגון רב-אתרי."],
        },
      ],
    },
    // ============================================================ 14.11
    {
      id: "14.11", titleHe: "רשימת מלאי/דרישות לחומר-DDR", titleEn: "Stock/Requirements List for DDR Material",
      execHe:
        "ה-Stock/Requirements List (MD04) לחומר-DDMRP מציג מבט מודע-באפר: רמת-האזורים, ה-Net Flow, וההמלצות — בנוסף להזמנות ולדרישות הרגילות. זהו חלון-הבקרה היומי של המתכנן לחומר-מבּוּפר.",
      beginnerHe:
        "MD04 הוא המסך שכל מתכנן-SAP מכיר. עבור חומר-DDMRP הוא מציג גם את אזורי-הצבע ואת ה-Net Flow, כך שרואים גם את התמונה-הרגילה וגם את מצב-הבאפר.",
      consultantHe:
        "עבור חומר DD-relevant, ה-Stock/Requirements List מוסיף שורות/תצוגות באפר: TOR/TOY/TOG, Net Flow Position נוכחי, והמלצות-חידוש. ב-Fiori (Monitor Material Coverage / DD apps) התצוגה צבעונית. הקלטים: VBBE (דרישות), MARC/PPH_DD_BUFFER (באפר).",
      purposeHe:
        "לתת למתכנן תמונה-אחת המשלבת את העולם-הקלאסי (הזמנות/דרישות) עם העולם-ה-DDMRP (אזורים/Net Flow) לחומר נתון.",
      processExampleHe:
        "פתיחת MD04 לתרכיז-מבּוּפר מציגה On-Hand, הזמנות-פתוחות, דרישות, ובמקביל את האזורים ואת ה-Net Flow — המתכנן רואה אם הבאפר בצהוב.",
      cbcHe:
        "ב-CBC מתכנן פותח MD04 לתרכיז, מזהה Net Flow בצהוב, ומאשר את המלצת-החידוש מאפליקציית Replenishment Planning.",
      navHe: ["SAP Easy Access ► Logistics ► Production ► MRP ► Evaluations ► Stock/Requirements List (MD04)"],
      tables: ["MARC", "PPH_DD_BUFFER", "VBBE", "RESB"],
      tcodes: ["MD04", "MD05"],
      fiori: ["F2102", "F0247", "F2101"],
      configHe: [
        "תצוגת-הבאפר ב-MD04 פעילה אוטומטית לחומר DD-relevant — אין הגדרה נפרדת.",
        "ב-Fiori השתמש באפליקציות-DD לתצוגה צבעונית מודעת-אזורים.",
      ],
      flow: [
        { he: "פתח MD04 לחומר", code: "MD04" },
        { he: "קרא On-Hand/On-Order/דרישות" },
        { he: "צפה באזורים + Net Flow", note: "DD-relevant" },
        { he: "אם בצהוב/אדום → חידוש", code: "F2102" },
      ],
      masterDataHe: [
        "VBBE = דרישות-מכירה · RESB = הזמנות-תלויות · PPH_DD_BUFFER = אזורי-באפר.",
        "MD04 משלב את כולם לתמונת-בקרה אחת לחומר.",
      ],
      mistakesHe: [
        "התעלמות מתצוגת-הבאפר ב-MD04 ועבודה לפי דרישות-גולמיות בלבד.",
        "פירוש דרישות-עתידיות כ-Qualified Demand בלי סינון-Spike.",
      ],
      troubleshootHe: [
        "אין תצוגת-באפר ב-MD04 ➔ החומר אינו DD-relevant או לא סווג.",
        "Net Flow לא תואם דרישות ➔ Qualified Demand מסונן (Spikes הוסרו) — תקין.",
      ],
      bestPracticeHe: [
        "השתמש ב-MD04 לבדיקה-נקודתית, ובאפליקציות-Fiori לעבודה-המונית.",
        "ודא DD-relevance כדי לקבל את תצוגת-הבאפר.",
      ],
      interviewHe: [
        { qHe: "מה שונה ב-MD04 לחומר-DDMRP?", aHe: "מוצגות גם רמות-האזורים (TOR/TOY/TOG) וה-Net Flow Position, בנוסף להזמנות ולדרישות הקלאסיות." },
        { qHe: "אילו טבלאות מזינות את MD04 לחומר-מבּוּפר?", aHe: "VBBE (דרישות-מכירה), RESB (תלויות), ו-PPH_DD_BUFFER/MARC (אזורי-באפר)." },
      ],
      takeawaysHe: [
        "MD04 משלב מבט-קלאסי ומבט-DDMRP.",
        "מציג אזורים + Net Flow לחומר DD-relevant.",
        "חלון-הבקרה היומי לחומר-מבּוּפר.",
      ],
      relatedHe: [
        { labelHe: "PP · MRP מסורתי (פרק 13)", href: "/library/pp/chapter-13/" },
      ],
      children: [
        {
          id: "14.12", titleHe: "דרישות-עצמאיות מתוכננות (PIR)", titleEn: "Planned Independent Requirements",
          execHe: "PIR (תחזית) משמשות ב-DDMRP בעיקר לחישוב-ADU צופה-פני-עתיד, ולא כדרישה-ישירה שמניעה חידוש. הבאפר סופג את הביקוש; ה-PIR מכיילות את גודל-הבאפר עתידית.",
          beginnerHe: "ב-MRP רגיל התחזית (PIR) יוצרת ישירות הזמנות. ב-DDMRP התחזית בעיקר עוזרת לחשב כמה גדול הבאפר צריך להיות בעתיד — לא מזמינה ישירות.",
          consultantHe: "PIR (טבלת PBED) מזינות חישוב-ADU עתידי (forward-looking ADU) ובכך משפיעות על גודל-האזורים, אך אינן נצרכות ישירות ב-Net Flow כ-Dependent Demand. זהו הבדל-תפיסה מהותי מ-MRP: התחזית מכיילת באפר, לא יוצרת הזמנה.",
          purposeHe: "לאפשר לתחזית להתאים את גודל-הבאפר לשינויי-ביקוש-צפויים (עונה/מבצע) בלי שתשבש את האיתות מבוסס-הביקוש-האמיתי.",
          processExampleHe: "PIR גבוהות לקיץ מעלות את ה-forward ADU → האזורים גדלים מבעוד-מועד; אך החידוש-בפועל עדיין נקבע מ-Net Flow.",
          cbcHe: "ב-CBC PIR של עונת-קיץ מגדילות את באפר-התרכיז מראש, אך ההזמנות-בפועל עדיין נגזרות מצריכת-הקווים בזמן-אמת.",
          navHe: ["SAP Easy Access ► Production ► Demand Management ► PIR (MD61)", "SAP Fiori ► Manage PIRs"],
          tables: ["PBED", "PBIM", "PPH_DD_BUFFER"],
          tcodes: ["MD61", "MD62", "MD04"],
          fiori: ["F2102", "F3445"],
          configHe: ["הגדר שימוש ב-forward-looking ADU שמשתמש ב-PIR לכיול-באפר עתידי.", "ודא ש-PIR אינן מוגדרות כ-Qualified Demand ישיר לחומר-מבּוּפר."],
          mistakesHe: ["טיפול ב-PIR כדרישה-ישירה ב-DDMRP — שובר את עיקרון-הניתוק.", "PIR לא-מעודכנות → ADU עתידי שגוי."],
          troubleshootHe: ["באפר לא גדל לעונה ➔ PIR לא מוזנות או forward-ADU לא מופעל."],
          bestPracticeHe: ["השתמש ב-PIR לכיול-עתידי בלבד.", "עדכן PIR לעונות/מבצעים מבעוד-מועד."],
          interviewHe: [{ qHe: "מה תפקיד PIR ב-DDMRP?", aHe: "כיול-ADU עתידי (גודל-באפר), לא יצירת-הזמנה ישירה — בשונה מ-MRP שבו PIR מניעות תכנון." }],
          takeawaysHe: ["PIR מכיילות באפר עתידי, לא יוצרות הזמנה.", "מזינות forward-looking ADU.", "שונה-תפיסה מ-MRP."],
          relatedHe: [{ labelHe: "PP · ניהול-ביקוש (פרק 12)", href: "/library/pp/chapter-12/" }],
        },
        {
          id: "14.13", titleHe: "הזמנת-לקוח (Sales Order)", titleEn: "Sales Order",
          execHe: "הזמנת-לקוח היא מקור-הביקוש-האמיתי המרכזי ב-DDMRP: היא נכנסת ל-Qualified Demand במשוואת-ה-Net-Flow ו'מושכת' מהבאפר. הזמנות חריגות-בגודלן עלולות להיחשב Order Spike ולעבור סינון.",
          beginnerHe: "כשלקוח מזמין, ההזמנה 'מושכת' מהבאפר ומורידה את ה-Net Flow. אם ההזמנה ענקית וחריגה, המערכת עשויה לטפל בה כ-Spike כדי לא להגיב-יתר.",
          consultantHe: "הזמנות-מכירה (VBBE/VBAP) הן הליבה של Qualified Demand: ביקוש-להיום + פיגורים. הזמנה שחוצה את ה-Spike Threshold בתוך ה-Spike Horizon נכנסת כ-Order Spike ומטופלת בנפרד. כך הבאפר מגיב לביקוש-אמיתי אך לא נסחף משיא חד-פעמי.",
          purposeHe: "להזין את האיתות מבוסס-הביקוש-האמיתי — בשונה מ-MRP שבו התחזית מובילה, כאן ההזמנה-בפועל מובילה.",
          processExampleHe: "הזמנת-לקוח רגילה מורידה את ה-Net Flow בהדרגה; הזמנה-ענקית פתאומית (>Spike Threshold) נרשמת כ-Spike ומתוכננת בנפרד מבלי לסחוף את הבאפר.",
          cbcHe: "ב-CBC הזמנת-רשת-קמעונאות גדולה למשקה מסוים נחשבת Order Spike; המערכת מתכננת לה חידוש-ייעודי בלי לנפח את כל באפר-המוצר.",
          navHe: ["SAP Easy Access ► Sales ► Order ► Create (VA01)", "SAP Fiori ► Manage Sales Orders"],
          tables: ["VBAK", "VBAP", "VBBE", "PPH_DD_BUFFER"],
          tcodes: ["VA01", "VA02", "MD04"],
          fiori: ["F2102", "F0018"],
          configHe: ["ודא שהזמנות-מכירה זורמות ל-Qualified Demand; כייל Spike Threshold/Horizon לזיהוי-Spikes.", "אין הגדרה ייעודית להזמנה — היא נצרכת אוטומטית ב-Net Flow."],
          mistakesHe: ["אי-זיהוי הזמנה-ענקית כ-Spike ➔ הבאפר נסחף לחידוש-יתר.", "התעלמות מפיגורים (past-due) ב-Qualified Demand."],
          troubleshootHe: ["באפר 'קופץ' מהזמנה-בודדת ➔ Spike Threshold גבוה מדי, ההזמנה לא סוננה.", "הזמנה לא משפיעה על Net Flow ➔ לא נכנסה ל-Qualified Demand (תאריך מחוץ-לאופק)."],
          bestPracticeHe: ["כייל Spike-detection לזהות הזמנות-חריגות אמיתיות.", "ודא שפיגורים נכללים ב-Qualified Demand."],
          interviewHe: [{ qHe: "כיצד הזמנת-לקוח משפיעה על הבאפר?", aHe: "היא נכנסת ל-Qualified Demand ומורידה את ה-Net Flow; הזמנה-חריגה עלולה להיחשב Order Spike ולעבור טיפול-נפרד." }],
          takeawaysHe: ["הזמנת-לקוח = ביקוש-אמיתי שמושך מהבאפר.", "נכנסת ל-Qualified Demand ב-Net Flow.", "הזמנה-חריגה = Order Spike."],
          relatedHe: [{ labelHe: "PP · ניהול-ביקוש (פרק 12)", href: "/library/pp/chapter-12/" }],
        },
      ],
    },
    // ============================================================ 14.14
    {
      id: "14.14", titleHe: "סיווג-מוצרים (Classification Run)", titleEn: "Product Classification",
      execHe:
        "הרצת-סיווג-המוצרים (Schedule Product Classification, DD) היא התהליך התקופתי שמסווג חומרים (ABC/XYZ), מחשב ADU ו-DLT, וממליץ/קובע Buffer Profile. זהו 'מנוע-ההכנה' שמכין כל חומר לתכנון-DDMRP.",
      beginnerHe:
        "לפני שאפשר לתכנן, צריך 'להכין' כל חומר: לחשב כמה נצרך ביום (ADU), כמה לוקח להשיג (DLT), ולאיזה פרופיל הוא שייך. הרצת-הסיווג עושה זאת אוטומטית, בדרך-כלל מתוזמנת.",
      consultantHe:
        "האפליקציה (job-based) קוראת היסטוריית-צריכה, מחשבת ADU, מסווגת ABC (ערך) ו-XYZ (תנודתיות), קובעת Lead Time Classification, ומקצה/ממליצה Buffer Profile. הפלט נכתב ל-PPH_DD_BUFFER. מתוזמנת תקופתית (Schedule). תתי-הסעיפים שלהלן הם פרמטרי-ההרצה.",
      purposeHe:
        "להפוך את הכנת-החומרים מתהליך-ידני לתהליך-אוטומטי, נתונים-מבוסס ומתוזמן — כך שהבאפרים תמיד עדכניים.",
      processExampleHe:
        "הרצה-חודשית מתוזמנת: סורקת 500 חומרים, מחשבת ADU מ-90-יום, מסווגת, ומעדכנת Buffer Profiles ואזורים — בלי התערבות-ידנית.",
      cbcHe:
        "ב-CBC הרצת-סיווג חודשית מעדכנת את ADU של כל התרכיזים והאריזות, ומכוונת מחדש פרופילים לפני העונה.",
      navHe: ["SAP Fiori ► Demand-Driven Replenishment ► Schedule Product Classification (DD)"],
      tables: ["PPH_DD_BUFFER", "MARC"],
      tcodes: ["MD04"],
      fiori: ["F2101", "F2228", "F2229"],
      configHe: [
        "הגדר את פרמטרי-ההרצה: Scheduling, Selection Criteria, Thresholds — ראה תתי-הסעיפים.",
        "תזמן הרצה-תקופתית (Schedule) לעדכניות-באפרים שוטפת.",
      ],
      flow: [
        { he: "תזמון הרצה", code: "F2101", note: "Schedule" },
        { he: "בחירת מוצרים", note: "Selection Criteria" },
        { he: "חישוב ADU + סיווג ABC/XYZ" },
        { he: "קביעת ספים + Profile", note: "Thresholds" },
        { he: "עדכון PPH_DD_BUFFER" },
      ],
      masterDataHe: [
        "הפלט נכתב ל-PPH_DD_BUFFER ומעדכן את שדות-ה-DD ב-MARC.",
        "ADU ו-DLT מחושבים מהיסטוריה ומקור-האספקה.",
      ],
      mistakesHe: [
        "הרצה חד-פעמית ללא תזמון-תקופתי ➔ באפרים מתיישנים.",
        "קריטריוני-בחירה רחבים מדי ➔ סיווג חומרים שאינם DD-מתאימים.",
      ],
      troubleshootHe: [
        "חומרים לא סווגו ➔ מחוץ ל-Selection Criteria או אין נתוני-צריכה.",
        "ADU=0 ➔ אין היסטוריית-צריכה בתקופה-הנבחרת.",
      ],
      bestPracticeHe: [
        "תזמן הרצה-תקופתית קבועה (חודשי/רבעוני).",
        "כוון Selection Criteria לחומרים DD-relevant בלבד.",
      ],
      interviewHe: [
        { qHe: "מה עושה הרצת-Product-Classification?", aHe: "מסווגת ABC/XYZ, מחשבת ADU/DLT, וקובעת/ממליצה Buffer Profile — מכינה כל חומר לתכנון-DDMRP." },
        { qHe: "מדוע לתזמן אותה תקופתית?", aHe: "צריכה ותנודתיות משתנות; הרצה-תקופתית שומרת על אזורי-באפר עדכניים ומונעת התיישנות." },
      ],
      takeawaysHe: [
        "Classification מכינה חומרים לתכנון: ADU, סיווג, Profile.",
        "מתוזמנת תקופתית (job).",
        "פלט ל-PPH_DD_BUFFER.",
      ],
      children: [
        {
          id: "14.15", titleHe: "אפשרויות-תזמון", titleEn: "Scheduling Options",
          execHe: "אפשרויות-התזמון קובעות מתי וכיצד רצה הרצת-הסיווג: חד-פעמי, מחזורי (יומי/שבועי/חודשי), ובאיזה רקע (background job). תזמון-נכון מבטיח אזורי-באפר תמיד-עדכניים.",
          beginnerHe: "כאן בוחרים מתי ההרצה תתבצע: עכשיו, או אוטומטית כל שבוע/חודש. הרצה-מחזורית = באפרים שמתעדכנים לבד.",
          consultantHe: "התזמון מוגדר כ-Application Job עם Recurrence Pattern (Start, Frequency, End). יש לאזן בין עדכניות (תכוף) לעומס-מערכת. הרצה-לילית-תקופתית היא הנפוצה.",
          purposeHe: "להבטיח עדכון-באפרים שוטף ואוטומטי בלי תלות בזיכרון-המתכנן.",
          processExampleHe: "תזמון Job חודשי בלילה הראשון-לחודש; ההרצה מעדכנת ADU ואזורים לפני תחילת-החודש.",
          cbcHe: "ב-CBC Job חודשי-לילי מעדכן את כל באפרי-ה-DDMRP לפני סבב-התכנון החודשי.",
          navHe: ["SAP Fiori ► Schedule Product Classification (DD) ► Scheduling Options"],
          tables: ["PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2101"],
          configHe: ["הגדר Recurrence (Start/Frequency/End) ל-Application Job של הסיווג."],
          mistakesHe: ["תדירות-יתר ➔ עומס-מערכת מיותר.", "אי-תזמון ➔ הרצה נשכחת, באפרים מתיישנים."],
          troubleshootHe: ["הרצה לא בוצעה ➔ Job לא מתוזמן/נכשל; בדוק Application Log."],
          bestPracticeHe: ["תזמן הרצה-לילית-תקופתית מתואמת לסבב-התכנון."],
          interviewHe: [{ qHe: "כיצד מתזמנים את הרצת-הסיווג?", aHe: "כ-Application Job מחזורי (Recurrence Pattern) בלילה/תקופתית — לעדכניות-באפרים אוטומטית." }],
          takeawaysHe: ["תזמון מחזורי = עדכניות אוטומטית.", "Application Job עם Recurrence.", "אזן עדכניות מול עומס."],
        },
        {
          id: "14.16", titleHe: "קריטריוני-בחירה למוצרים", titleEn: "Selection Criteria for Products",
          execHe: "קריטריוני-הבחירה קובעים אילו חומרים נכללים בהרצה: לפי מפעל, MRP Controller, Material Group, או רשימה. בחירה-ממוקדת מונעת סיווג חומרים שאינם DD-רלוונטיים.",
          beginnerHe: "כאן בוחרים על אילו חומרים ההרצה תעבוד — לא על כולם, רק על הרלוונטיים (למשל מפעל מסוים או קבוצת-חומרים).",
          consultantHe: "הבחירה לפי Plant, MRP Area/Controller, Material Group, ABC-class או רשימה-מפורשת. מומלץ לצמצם ל-DD-relevant כדי לחסוך זמן-עיבוד ולמנוע 'רעש'. הבחירה משולבת עם ה-Thresholds.",
          purposeHe: "למקד את ההרצה בחומרים-הנכונים — חיסכון בעיבוד ומניעת-סיווג מיותר.",
          processExampleHe: "בחירה: Plant=1000, MRP Controller=DD1 → ההרצה מסווגת רק את חומרי-ה-DDMRP של אותו מתכנן.",
          cbcHe: "ב-CBC בחירה לפי Material Group='Concentrates' מצמצמת את ההרצה לתרכיזים בלבד.",
          navHe: ["SAP Fiori ► Schedule Product Classification (DD) ► Selection Criteria"],
          tables: ["MARC", "PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2101"],
          configHe: ["הגדר קריטריונים: Plant, MRP Controller, Material Group, ABC-class או רשימה."],
          mistakesHe: ["בחירה רחבה-מדי ➔ סיווג חומרים לא-רלוונטיים.", "בחירה צרה-מדי ➔ חומרים DD נשמטים מהסיווג."],
          troubleshootHe: ["חומר לא סווג ➔ מחוץ ל-Selection Criteria; הרחב/תקן.", "הרצה איטית ➔ בחירה רחבה מדי."],
          bestPracticeHe: ["צמצם ל-DD-relevant לפי מפעל/מתכנן.", "תאם את הבחירה לאחריות-המתכנן."],
          interviewHe: [{ qHe: "לפי מה בוחרים מוצרים להרצת-סיווג?", aHe: "Plant, MRP Controller, Material Group, ABC-class או רשימה — כדי למקד בחומרים DD-relevant בלבד." }],
          takeawaysHe: ["בחירה לפי מפעל/מתכנן/קבוצה.", "מקד ב-DD-relevant.", "משולב עם Thresholds."],
        },
        {
          id: "14.17", titleHe: "הגדרות-ספים (Thresholds)", titleEn: "Thresholds Settings",
          execHe: "ספי-הסיווג קובעים את גבולות-ABC (לפי ערך/נפח-צריכה) ואת גבולות-XYZ (לפי Coefficient of Variation). הם הופכים נתונים-רציפים לקטגוריות-בדידות שמכוונות בחירת-Buffer-Profile.",
          beginnerHe: "כאן מגדירים את ה'קווים' שמפרידים A מ-B מ-C, ו-X מ-Y מ-Z. למשל: 'מעל 80% מהערך = A'. הספים קובעים לאיזו קטגוריה כל חומר נופל.",
          consultantHe: "ABC לפי Cumulative Consumption Value (Pareto: 80/15/5 טיפוסי); XYZ לפי Coefficient of Variation (CV נמוך=X יציב, גבוה=Z תנודתי). הספים מזינים את המלצת/בחירת-ה-Buffer-Profile ואת פקטורי-התנודתיות.",
          purposeHe:
            "לתרגם נתונים-רציפים (ערך, תנודתיות) לקטגוריות שלפיהן נבחר הפרופיל ומחושבים הפקטורים — בצורה אחידה ושקופה.",
          processExampleHe: "ספים: A=top-80% value, X=CV<0.5; חומר עם ערך-גבוה ו-CV=0.3 → AX → פרופיל ל-'יציב-יקר'.",
          cbcHe: "ב-CBC ספי-XYZ מבחינים תרכיז-יציב (X) ממשקה-מבצע-תנודתי (Z); כל אחד מקבל פקטורי-Variability שונים.",
          navHe: ["SAP Fiori ► Schedule Product Classification (DD) ► Thresholds"],
          tables: ["PPH_DD_BUFFER", "PPH_DD_BUFFER"],
          tcodes: ["MD04"],
          fiori: ["F2101", "F2228"],
          configHe: ["הגדר ספי-ABC (ערך-מצטבר) וספי-XYZ (CV); שייך כל קטגוריה ל-Buffer-Profile/פקטור."],
          mistakesHe: ["ספים שרירותיים ללא ניתוח-Pareto/CV.", "ספים שלא מתעדכנים כשהתנהגות-החומרים משתנה."],
          troubleshootHe: ["סיווג מוטה (הכל-A או הכל-Z) ➔ ספים שגויים; כייל לפי פיזור-הנתונים."],
          bestPracticeHe: ["בסס ספים על ניתוח-Pareto (ABC) ו-CV אמיתי (XYZ).", "סקור ספים תקופתית."],
          interviewHe: [
            { qHe: "כיצד נקבעים ABC ו-XYZ?", aHe: "ABC לפי ערך-צריכה-מצטבר (Pareto), XYZ לפי Coefficient of Variation; הספים הם הגבולות בין הקטגוריות." },
            { qHe: "מהו Coefficient of Variation?", aHe: "סטיית-תקן חלקי-ממוצע של הצריכה — מדד-תנודתיות; CV נמוך=X (יציב), גבוה=Z (תנודתי)." },
          ],
          takeawaysHe: ["ספים מתרגמים נתונים לקטגוריות.", "ABC=ערך (Pareto), XYZ=תנודתיות (CV).", "מכוונים בחירת-Profile ופקטורים."],
        },
        {
          id: "14.18", titleHe: "מוצרים לא-מבּוּפרים ללא DLT", titleEn: "Unbuffered Products without Decoupled Lead Time",
          execHe: "לא כל חומר מקבל באפר. מוצרים לא-מבּוּפרים ללא Decoupled Lead Time ממשיכים להיות מתוכננים ב-MRP קלאסי או נצרכים ישירות; הסיווג מזהה אותם ומחריג אותם מ-DDMRP.",
          beginnerHe: "חלק מהחומרים פשוט לא צריכים באפר — הם יציבים, זולים או זמינים-מיד. ההרצה מזהה אותם ומשאירה אותם בתכנון-הרגיל, לא ב-DDMRP.",
          consultantHe: "חומרים שאינם DD-relevant ואין להם DLT מנותק מתוכננים ב-MRP רגיל (PD/VB) או כ-Lot-for-lot ישיר. חשוב לזהותם מפורשות כדי שלא 'ייפלו בין הכיסאות' — לא מבּוּפרים אך גם לא מתוכננים נכון.",
          purposeHe: "להבטיח כיסוי-תכנון מלא: כל חומר או מבּוּפר (DDMRP) או מתוכנן-קלאסי — אף-אחד לא נשאר ללא-שיטה.",
          processExampleHe: "הרצת-הסיווג מסמנת חומר-יציב-זול כ-'unbuffered'; הוא נשאר MRP Type PD רגיל, ללא אזורי-באפר.",
          cbcHe: "ב-CBC מים-מטופלים ו-CO2 (זמינים-מקומית, יציבים) נשארים לא-מבּוּפרים ומתוכננים ב-MRP רגיל.",
          navHe: ["SAP Fiori ► Schedule Product Classification (DD) ► Unbuffered Products result"],
          tables: ["MARC", "PPH_DD_BUFFER"],
          tcodes: ["MD04", "MM02"],
          fiori: ["F2101", "F2102"],
          configHe: ["ודא שחומרים לא-מבּוּפרים נשארים עם MRP Type קלאסי תקין (PD/VB).", "ההרצה מסמנת 'unbuffered' — בדוק שאינם נשמטים מתכנון."],
          mistakesHe: ["חומר לא-מבּוּפר שגם איבד MRP Type תקין ➔ לא מתוכנן כלל.", "ניסיון לבּפר חומרים יציבים-זולים מתוך 'גורפנות'."],
          troubleshootHe: ["חומר לא מתוכנן בכלל ➔ הוסר מ-DDMRP אך לא הוחזר ל-MRP קלאסי; תקן MRP Type."],
          bestPracticeHe: ["ודא שכל חומר משויך לשיטה אחת: DDMRP או MRP קלאסי.", "אל תבּפר חומרים יציבים-זולים."],
          interviewHe: [{ qHe: "מה קורה לחומרים לא-מבּוּפרים?", aHe: "הם נשארים בתכנון-MRP קלאסי (PD/VB) או נצרכים ישירות; חשוב לוודא שאינם נשמטים מכל שיטת-תכנון." }],
          takeawaysHe: ["לא כל חומר מקבל באפר.", "לא-מבּוּפרים = MRP קלאסי.", "ודא שאף חומר לא נשאר ללא-שיטה."],
          relatedHe: [{ labelHe: "PP · MRP Type (13.2)", href: "/library/pp/chapter-13/#sub-13.2" }],
        },
      ],
    },
  ],
};
