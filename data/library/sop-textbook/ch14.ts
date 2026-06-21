// ===== S&OP Digital Textbook — Chapter 14 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Topic: integrating SAP IBP for Sales and Operations. SAP objects verbatim EN.
import type { TextbookChapter } from "./types";

export const CH14: TextbookChapter = {
  n: 14,
  titleHe: "אינטגרציה של SAP IBP ל-S&OP",
  titleEn: "Integrating SAP IBP for Sales and Operations",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לאינטגרציה של SAP IBP (Integrated Business Planning) — פתרון-הענן של SAP לתכנון עסקי משולב — אל מערכות-הליבה כמו SAP S/4HANA, SAP Analytics Cloud ו-SAP Cloud for Customer, בהקשר של תהליך S&OP. תכנון S&OP טוב ככל הנתונים שמזינים אותו: ללא זרימת-נתונים אמינה מ-S/4HANA אל IBP (מלאי, פק\"עות, היסטוריית-מכירות) וחזרה (תחזית, תכנית-אספקה), התכנית נשארת תיאורטית. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (Coca-Cola bottling), ניווט/קונפיגורציה, אובייקטים, תרשים זרימת-נתונים, טעויות נפוצות, פתרון-תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא בלי הספר המקורי.",
  subchapters: [
    // ============================================================ 14.1
    {
      id: "14.1",
      titleHe: "תרחישי אינטגרציה של נתונים",
      titleEn: "Data Integration Scenarios",
      execHe:
        "אינטגרציית-נתונים היא הבסיס של כל תכנון IBP. SAP IBP הוא פתרון-ענן (cloud) שאינו מכיל נתוני-מקור משלו — הוא צריך לקבל מ-SAP S/4HANA (או ECC) את הנתונים העובדתיים (מלאי, הזמנות, פק\"עות, היסטוריית-מכירות) ולהחזיר את תוצרי-התכנון (תחזית-ביקוש, תכנית-אספקה). הבחירה בתרחיש-האינטגרציה הנכון קובעת את תדירות-העדכון, את היקף-הנתונים ואת אמינות-התכנית. שגיאה כאן הופכת את S&OP לתרגיל תיאורטי מנותק מהמציאות.",
      beginnerHe:
        "דמיין שני עולמות: S/4HANA = העולם שבו הדברים קורים באמת (מוכרים, מייצרים, מאחסנים), ו-IBP = העולם שבו מתכננים את העתיד. כדי שהתכנון יהיה אמיתי, צריך 'צינור' שמעביר עובדות מהעולם-הראשון לשני, ועוד צינור שמחזיר תכניות בחזרה. תרחיש-אינטגרציה הוא פשוט תיאור של אילו צינורות יש, מה עובר בכל אחד, וכל כמה זמן.",
      consultantHe:
        "SAP מגדירה מספר תרחישים עיקריים: (1) אינטגרציה תקופתית (batch) דרך SAP Cloud Integration for Data Services (CI-DS) — מתאימה ל-Tactical Planning (S&OP חודשי); (2) אינטגרציה בזמן-אמת (Real-Time Integration, RTI) דרך SAP HANA Smart Data Integration (SDI) — מתאימה ל-Operational Planning (Response & Supply); (3) הזנה ידנית דרך ה-Web/Excel UI; (4) ייצוא דרך OData services לצרכנים חיצוניים. הבחירה תלויה ב-latency הנדרש: S&OP מסתפק בעדכון יומי/שבועי דרך CI-DS, בעוד תכנון-תגובה דורש RTI עם SDI. כל תרחיש מבוסס על אותו מודל-תכנון (Planning Area) ועל Key Figures, אך נבדל במנגנון-ההעברה.",
      purposeHe:
        "המטרה: לבחור עבור כל זרם-נתונים את מנגנון-ההעברה המתאים לאיזון בין טריות-הנתונים (latency), עומס-מערכת, ועלות-תפעול. תרחיש נכון מבטיח ש-S&OP מתבסס על נתונים אמינים ועדכניים בלי להעמיס על S/4HANA הטרנזקציוני.",
      processExampleHe:
        "ארגון מריץ S&OP חודשי: בכל לילה CI-DS מושך מ-S/4HANA את היסטוריית-המכירות (VBAK/VBAP), רמות-המלאי (MARD) והזמנות-הלקוח הפתוחות, וטוען אותם ל-Planning Area ב-IBP כ-Key Figures. בסוף מחזור-התכנון, התחזית המאושרת ותכנית-האספקה מיוצאות חזרה ל-S/4HANA דרך CI-DS להזנת MRP. במקביל, צוות-התגובה משתמש ב-RTI (SDI) לסנכרון אד-הוק של הזמנות דחופות.",
      cbcHe:
        "ב-CBC (מפעל-בקבוק של Coca-Cola): מערך-ה-S/4HANA מנהל ייצור-משקאות, מלאי-תרכיז ומכירות לרשתות. בכל לילה CI-DS מעביר ל-IBP cloud את מכירות-המשקאות לפי SKU/לקוח/שבוע, מלאי-מוגמר במחסנים, ופק\"עות-המילוי הפתוחות. ה-IBP מחשב תחזית-ביקוש עונתית (קיץ vs חורף) ומחזיר תכנית-אספקה לקווי-המילוי. עונת-שיא (קיץ) דורשת לעיתים RTI לעדכון מהיר של מלאי בין מרכזי-הפצה.",
      navHe: [
        "SAP IBP Web UI ► Application Jobs ► Data Integration (ניטור משימות-טעינה)",
        "SAP Cloud Integration for Data Services ► Projects ► Tasks (הגדרת זרמי-batch)",
        "SAP IBP ► Configuration ► Planning Areas ► Key Figures (יעד-הטעינה)",
      ],
      tables: ["VBAK", "VBAP", "MARD", "MARC", "AFKO", "AFPO"],
      tcodes: ["CFM1", "CFM2", "SE16N"],
      fiori: ["IBP Application Jobs", "IBP Data Integration Monitor"],
      configHe: [
        "הגדר לכל זרם-נתונים את הכיוון (S/4HANA→IBP inbound, IBP→S/4HANA outbound) ואת תדירותו (batch יומי / RTI).",
        "מפֵּה כל מקור (טבלה/CDS view/extractor) אל Key Figure ביעד ב-Planning Area של IBP.",
        "קבע את ה-Master Data Types (Product, Location, Customer) שעליהם נשענים ה-Key Figures לפני טעינת נתוני-עובדה.",
        "בחר מנגנון: CI-DS ל-Tactical, SDI/RTI ל-Operational, Web UI להזנה-ידנית, OData לייצוא.",
      ],
      flow: [
        { he: "S/4HANA — נתוני-עובדה", code: "VBAP/MARD/AFKO", note: "מקור" },
        { he: "מנגנון-העברה", code: "CI-DS / SDI", note: "batch או RTI" },
        { he: "Planning Area ב-IBP", code: "Key Figures", note: "יעד inbound" },
        { he: "מנוע-התכנון IBP", code: "S&OP run", note: "תחזית + אספקה" },
        { he: "החזרה ל-S/4HANA", code: "outbound", note: "הזנת MRP" },
      ],
      masterDataHe: [
        "Master Data Types ב-IBP (Product, Location, Customer, Resource) חייבים להיטען לפני נתוני-העובדה — אחרת ה-Key Figures חסרי-עוגן.",
        "מיפוי-מפתח (ID mapping) בין מספרי-S/4HANA (MATNR, KUNNR, WERKS) למזהי-IBP חייב להיות עקבי בכל הזרמים.",
      ],
      mistakesHe: [
        "טעינת נתוני-עובדה לפני נתוני-אב (Master Data) — השורות 'נופלות' כי אין להן עוגן ב-Planning Area.",
        "בחירת RTI לכל זרם 'ליתר ביטחון' — מעמיס את S/4HANA בלי צורך; S&OP מסתפק ב-batch.",
        "אי-תיאום של calendars/periodicity בין S/4HANA ל-IBP — נתונים יומיים מתנגשים עם buckets שבועיים.",
        "התעלמות מ-ID mapping — אותו מוצר מופיע כשתי רשומות שונות בשני הצדדים.",
      ],
      troubleshootHe: [
        "Key Figure ריק אחרי טעינה ➔ בדוק שנתוני-האב (Product/Location) נטענו קודם ושמיפוי-המפתח תואם.",
        "טעינה איטית/נכשלת בעומס ➔ שקול מעבר מ-RTI ל-batch לזרם זה, או חלוקה ל-delta loads.",
        "אי-התאמת-תקופות בין מערכות ➔ יישר את ה-Time Profile של IBP מול לוח-השנה של S/4HANA.",
      ],
      bestPracticeHe: [
        "סווג כל זרם-נתונים לפי latency נדרש ובחר את המנגנון הזול ביותר שעומד בו (CI-DS לפני SDI).",
        "טען תמיד Master Data לפני Transaction Data, באמצעות תזמון-תלות בין משימות.",
        "השתמש ב-delta loads במקום full loads לזרמים גדולים כדי להפחית עומס.",
        "תעד מטריצת-אינטגרציה: זרם × כיוון × מנגנון × תדירות × Key Figure יעד.",
      ],
      interviewHe: [
        { qHe: "מדוע SAP IBP זקוק לאינטגרציה ולא מחזיק נתוני-מקור משלו?", aHe: "IBP הוא פתרון-ענן לתכנון; נתוני-העובדה (מכירות, מלאי, ייצור) נוצרים במערכת-הליבה הטרנזקציונית כמו S/4HANA. האינטגרציה מזרימה עובדות ל-IBP ומחזירה תכניות, כך ש-S&OP מבוסס-מציאות." },
        { qHe: "מתי תבחר batch (CI-DS) ומתי RTI (SDI)?", aHe: "batch מתאים לתכנון-טקטי (S&OP חודשי) שבו עדכון יומי/שבועי מספיק ועלות-המערכת חשובה; RTI מתאים לתכנון-תפעולי/תגובה הדורש latency נמוך וסנכרון כמעט-מיידי." },
        { qHe: "מה חייב להיטען לפני נתוני-העובדה?", aHe: "נתוני-האב (Master Data Types: Product, Location, Customer, Resource) ומיפוי-המפתחות — אחרת ה-Key Figures חסרי-עוגן והשורות נדחות." },
      ],
      takeawaysHe: [
        "אינטגרציה היא הבסיס של S&OP: S/4HANA מספק עובדות, IBP מחזיר תכניות.",
        "ארבעה תרחישים: CI-DS (batch), SDI/RTI (real-time), Web UI (ידני), OData (ייצוא).",
        "הבחירה נקבעת לפי latency נדרש — אל תשלם על RTI כש-batch מספיק.",
        "Master Data לפני Transaction Data, ו-ID mapping עקבי בכל הזרמים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · אינטגרציה לתכנון טקטי (14.2)", href: "/library/sop/chapter-14/#sub-14.2" },
        { labelHe: "S&OP · אינטגרציה לתכנון תפעולי (14.3)", href: "/library/sop/chapter-14/#sub-14.3" },
      ],
    },
    // ============================================================ 14.2
    {
      id: "14.2",
      titleHe: "אינטגרציה לתכנון טקטי",
      titleEn: "Integration for Tactical Planning",
      execHe:
        "תכנון-טקטי (Tactical Planning) הוא לב ה-S&OP: מחזור חודשי/שבועי המאזן ביקוש מול אספקה לאופק של חודשים עד שנה. עבורו אין צורך בנתונים בזמן-אמת — עדכון תקופתי (batch) מספיק ויעיל. אינטגרציה זו נשענת בעיקר על SAP Cloud Integration for Data Services (CI-DS), עם אפשרויות-משלים של הזנה-ידנית דרך ה-Web UI וייצוא דרך OData. הבחירה הנכונה מבטיחה ש-S&OP יקבל תמונת-מצב מהימנה בלי להעמיס את המערכת הטרנזקציונית.",
      beginnerHe:
        "תכנון-טקטי הוא 'תכנון לטווח-בינוני' — לא מה קורה היום, אלא מה יקרה בחודשים הקרובים. בגלל שמדובר בטווח-בינוני, אין צורך לרענן נתונים כל שנייה; מספיק לעדכן פעם ביום או בשבוע. הדרך הנפוצה לעשות זאת היא 'משיכה מתוזמנת' של נתונים בלילה — בדיוק מה ש-CI-DS עושה.",
      consultantHe:
        "Tactical Planning ב-IBP for S&OP מבוסס על Planning Area של S&OP (תבנית SAP6/SAPIBP1) עם buckets שבועיים/חודשיים. האינטגרציה אליו תקופתית: CI-DS מריץ Tasks/Processes מתוזמנים שמושכים נתונים מ-S/4HANA (דרך CDS views או extractors), ממירים, וטוענים ל-Key Figures. שלושת תתי-הסעיפים מכסים: (14.2.1) CI-DS כמנגנון-הליבה; (14.2.2) הזנה-ידנית דרך ה-Web/Excel UI לתרחישים שאין להם מקור-מערכת; (14.2.3) ייצוא Key Figures דרך OData לצרכנים חיצוניים. שילובם נותן כיסוי מלא לזרמי-הנתונים הטקטיים.",
      purposeHe:
        "המטרה: לספק ל-S&OP החודשי נתוני-מקור מהימנים (היסטוריה, מלאי, הזמנות) בתדירות מתאימה ובעלות-תפעול נמוכה, ולאפשר גם הזנה-ידנית של נחות-מערכת וגם ייצוא תוצרים לצרכנים.",
      processExampleHe:
        "מחזור-S&OP חודשי: בלילה ה-1 לכל חודש CI-DS טוען היסטוריית-מכירות 24 חודשים אחורה ל-IBP. הביקושן (Demand Planner) מעדכן ידנית דרך ה-Web UI הנחות-קידום-מכירות שאין להן מקור ב-S/4HANA. אחרי הרצת-התכנון, OOData service חושף את התחזית המאושרת ל-Data Warehouse ארגוני.",
      cbcHe:
        "ב-CBC: S&OP חודשי לכל קטגוריות-המשקה. CI-DS טוען מכירות-עבר לפי SKU/רשת/שבוע ומלאי-מוגמר. מנהל-הביקוש מזין ידנית דרך ה-Web UI תכניות-קידום (מבצעי-קיץ, חגים) שמקורן בשיווק ולא ב-S/4HANA. התחזית המאושרת מיוצאת ב-OData ל-SAC לדוחות-הנהלה.",
      navHe: [
        "SAP IBP Web UI ► Application Jobs ► Data Integration",
        "SAP Cloud Integration for Data Services ► Project ► Process ► Schedule",
        "SAP IBP ► Configuration ► Planning Area ► OData Services",
      ],
      tables: ["VBRK", "VBRP", "MARD", "VBAK", "VBAP"],
      tcodes: ["SE16N", "VA05", "MB52"],
      fiori: ["IBP Data Integration", "IBP Application Jobs Monitor"],
      configHe: [
        "הגדר את ה-S&OP Planning Area עם Time Profile חודשי/שבועי כיעד-האינטגרציה.",
        "צור Tasks ב-CI-DS לכל זרם טקטי (היסטוריה, מלאי, הזמנות) ותזמן אותם תקופתית.",
        "אפשר הזנה-ידנית ב-Web UI ל-Key Figures שאין להם מקור-מערכת (הנחות, קידומים).",
        "פרסם OData services לייצוא Key Figures לצרכנים חיצוניים.",
      ],
      flow: [
        { he: "S/4HANA", code: "VBRP/MARD", note: "מכירות + מלאי" },
        { he: "CI-DS תקופתי", code: "Schedule", note: "batch לילי" },
        { he: "IBP S&OP Planning Area", code: "Key Figures" },
        { he: "הזנה ידנית", code: "Web UI", note: "הנחות/קידום" },
        { he: "ייצוא", code: "OData", note: "לצרכנים" },
      ],
      mistakesHe: [
        "שימוש בכלי real-time לתכנון-טקטי — מורכבות ועלות מיותרות.",
        "תזמון-טעינות מתנגש עם חלון-הרצת-התכנון — נתונים חלקיים בעת ההרצה.",
        "הזנה-ידנית ללא בקרה — נתונים שאין להם מקור-מערכת הופכים ל'קופסה שחורה'.",
      ],
      troubleshootHe: [
        "תכנית מבוססת נתונים ישנים ➔ בדוק שה-CI-DS Task הסתיים בהצלחה לפני חלון-ההרצה.",
        "Key Figure ידני נמחק בטעינה ➔ ודא שטעינת-ה-batch אינה דורסת שדות שמוזנים ידנית.",
      ],
      bestPracticeHe: [
        "תזמן את ה-batch loads לפני חלון-הרצת-התכנון עם buffer מספיק.",
        "הפרד בבירור Key Figures שמקורם מערכת מאלה שמוזנים ידנית.",
        "תעד את ה-OData services שפורסמו ואת צרכניהם.",
      ],
      interviewHe: [
        { qHe: "מהו תכנון-טקטי ולמה batch מספיק לו?", aHe: "תכנון לטווח-בינוני (חודשים-שנה) במחזור חודשי/שבועי; מכיוון שאין החלטות-רגע, עדכון תקופתי (batch דרך CI-DS) מספק נתונים מהימנים בעלות נמוכה בלי להעמיס את המערכת." },
        { qHe: "אילו שלושה מנגנונים משרתים תכנון-טקטי?", aHe: "CI-DS (batch מ-S/4HANA), הזנה-ידנית דרך ה-Web UI (לנתונים ללא מקור-מערכת), וייצוא דרך OData services (לצרכנים חיצוניים)." },
      ],
      takeawaysHe: [
        "תכנון-טקטי = S&OP חודשי; batch מספיק, real-time מיותר.",
        "CI-DS הוא מנגנון-הליבה, משלימים אותו Web UI ו-OData.",
        "תזמן טעינות לפני הרצת-התכנון והפרד נתוני-מערכת מנתונים-ידניים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · CI-DS (14.2.1)", href: "/library/sop/chapter-14/#sub-14.2.1" },
        { labelHe: "S&OP · אינטגרציה תפעולית (14.3)", href: "/library/sop/chapter-14/#sub-14.3" },
      ],
      children: [
        {
          id: "14.2.1",
          titleHe: "SAP Cloud Integration for Data Services",
          titleEn: "SAP Cloud Integration for Data Services",
          execHe:
            "SAP Cloud Integration for Data Services (CI-DS) הוא שירות-הענן הרשמי של SAP להעברת-נתונים תקופתית (batch ETL) בין מערכות on-premise (כמו SAP S/4HANA) ל-SAP IBP. זהו מנגנון-הליבה של אינטגרציה טקטית: הוא מושך, ממיר ו-טוען (Extract-Transform-Load) נתונים בלוח-זמנים מתוזמן. CI-DS הוא הבחירה הסטנדרטית לכל זרם-נתונים ב-S&OP שאינו דורש זמן-אמת.",
          beginnerHe:
            "CI-DS הוא 'רובוט-משלוחים מתוזמן': אתה אומר לו 'קח את הנתונים האלה מ-S/4HANA, סדר אותם ככה, ושים אותם ב-IBP — כל לילה בשעה 2'. הוא רץ בענן, מתחבר לשתי המערכות, ומבצע את ההעברה בלי שאף-אחד יצטרך לגעת ידנית.",
          consultantHe:
            "ארכיטקטורה: CI-DS Agent (Data Services Agent) מותקן בצד ה-on-premise ומתחבר ל-S/4HANA דרך RFC/DB; ה-CI-DS web tool בענן מגדיר Datastores, Projects, Tasks ו-Processes. כל Task מגדיר מיפוי source→target עם Transforms (filter, map, aggregate). Datastore אחד לכל מערכת; ה-IBP datastore חושף את ה-Planning Area Key Figures כיעד. Processes משרשרים Tasks ומתוזמנים (Schedule). תמיכה ב-delta loads דרך CDS extraction. ניטור דרך ה-CI-DS dashboard וגם דרך IBP Application Jobs.",
          purposeHe:
            "המטרה: להעביר נתונים תקופתית בין S/4HANA ל-IBP בצורה אמינה, מתוזמנת וניתנת-לניטור, עם יכולות-המרה (ETL) מלאות — בלי כתיבת-קוד ובלי תשתית-מקומית כבדה.",
          processExampleHe:
            "Task 'Load Sales History': source = CDS view של חשבוניות (VBRP) ב-S/4HANA, transform = aggregate לרמת SKU/לקוח/שבוע + מיפוי MATNR→Product ID, target = Key Figure ACTUALSQTY ב-Planning Area. ה-Process המכיל אותו מתוזמן לרוץ כל לילה ב-02:00; ניטור הסטטוס דרך ה-dashboard.",
          cbcHe:
            "ב-CBC: CI-DS Agent רץ ב-data center של המבקבק; Task יומי מושך מכירות-משקאות ומלאי-מחסנים מ-S/4HANA, ממיר ליחידות-מארז ולשבועות, וטוען ל-Planning Area של IBP. delta load מעביר רק חשבוניות-חדשות כדי לקצר זמן-ריצה בעונת-שיא.",
          navHe: [
            "SAP Cloud Integration for Data Services ► Datastores (S/4HANA + IBP)",
            "CI-DS ► Projects ► Tasks ► Data Flow (source → transform → target)",
            "CI-DS ► Processes ► Schedule (תזמון תקופתי)",
            "SAP IBP Web UI ► Application Jobs (ניטור התוצאה)",
          ],
          tables: ["VBRP", "VBRK", "MARD", "MARC", "AFPO"],
          tcodes: ["SE16N", "RSA3", "SCDT"],
          fiori: ["IBP Data Integration", "CI-DS Web Tool"],
          configHe: [
            "התקן והגדר את ה-Data Services Agent בצד ה-on-premise; חבר אותו ל-S/4HANA.",
            "הגדר Datastores: אחד ל-S/4HANA (RFC/DB) ואחד ל-IBP (Planning Area כיעד).",
            "צור Task עם Data Flow: source object → Transforms (filter/map/aggregate) → target Key Figure.",
            "שרשר Tasks ל-Process ותזמן אותו (Schedule) בתדירות הטקטית הנדרשת.",
            "הפעל delta loads דרך CDS extraction לזרמים גדולים.",
          ],
          flow: [
            { he: "Data Services Agent", code: "on-prem", note: "מתחבר ל-S/4HANA" },
            { he: "Extract", code: "CDS view", note: "VBRP/MARD" },
            { he: "Transform", code: "map/aggregate", note: "MATNR→Product" },
            { he: "Load", code: "Key Figure", note: "Planning Area" },
            { he: "Schedule", code: "Process", note: "תקופתי" },
          ],
          masterDataHe: [
            "Datastore של IBP חושף Master Data Types ו-Key Figures כיעדי-טעינה; טען Master Data ב-Tasks נפרדים לפני Transaction Data.",
            "מיפוי-מפתח (MATNR→Product ID, WERKS→Location ID) מוגדר ב-Transforms של ה-Task.",
          ],
          mistakesHe: [
            "תזמון full load גדול בכל לילה במקום delta — זמני-ריצה ארוכים וסיכון לחלון-זמן.",
            "Datastore-Agent לא זמין/לא-מחובר — כל ה-Tasks נכשלים.",
            "Transform שמאבד שורות בגלל filter/join שגוי — Key Figure חלקי בלי שגיאה ברורה.",
            "טעינת Transaction Data לפני שה-Master Data Task הסתיים — שורות נדחות.",
          ],
          troubleshootHe: [
            "Task נכשל מיד ➔ בדוק זמינות ה-Data Services Agent וחיבור ה-Datastore ל-S/4HANA.",
            "Key Figure טעון חלקית ➔ בדוק filters/joins ב-Transform ואת מיפוי-המפתחות.",
            "ריצה איטית ➔ עבור ל-delta load והגבל את חלון-התאריכים ב-extract.",
            "שורות נדחו ביעד ➔ ודא ש-Master Data תואם נטען קודם.",
          ],
          bestPracticeHe: [
            "השתמש ב-delta loads כברירת-מחדל; שמור full load ל-initial load בלבד.",
            "הפרד Tasks ל-Master Data ול-Transaction Data ושרשר אותם בסדר-תלות ב-Process.",
            "תעד כל Data Flow (source-object, transforms, target Key Figure).",
            "נטר ריצות דרך ה-dashboard וגם דרך IBP Application Jobs, עם התראות-כשל.",
          ],
          interviewHe: [
            { qHe: "מהו CI-DS ומה תפקידו באינטגרציית IBP?", aHe: "SAP Cloud Integration for Data Services — שירות-ענן ל-ETL תקופתי (batch) המעביר נתונים בין מערכות on-premise כמו S/4HANA ל-IBP. זהו מנגנון-הליבה של אינטגרציה טקטית ל-S&OP." },
            { qHe: "מה תפקיד ה-Data Services Agent?", aHe: "רכיב המותקן בצד ה-on-premise; הוא מגשר בין ה-CI-DS שבענן למערכת-המקור (S/4HANA) דרך RFC/DB ומאפשר ל-CI-DS לחלץ ולטעון נתונים." },
            { qHe: "מהו delta load ולמה הוא חשוב?", aHe: "טעינה של רק הרשומות החדשות/שהשתנו מאז הריצה הקודמת, במקום full load. הוא מקצר זמני-ריצה ומפחית עומס — קריטי לזרמים גדולים בעונת-שיא." },
          ],
          takeawaysHe: [
            "CI-DS = מנגנון-הליבה ל-batch ETL בין S/4HANA ל-IBP.",
            "ארכיטקטורה: Agent on-prem + web tool בענן + Datastores/Tasks/Processes.",
            "delta loads, Master-Data-לפני-Transaction, וניטור — שלושת עקרונות-הזהב.",
          ],
          relatedHe: [
            { labelHe: "S&OP · הזנה ידנית (14.2.2)", href: "/library/sop/chapter-14/#sub-14.2.2" },
            { labelHe: "S&OP · אינטגרציה תפעולית (14.3)", href: "/library/sop/chapter-14/#sub-14.3" },
          ],
        },
        {
          id: "14.2.2",
          titleHe: "אינטגרציה ידנית של נתונים באמצעות הממשק האינטרנטי",
          titleEn: "Manual Data Integration Using Web Interface",
          execHe:
            "לא לכל נתון יש מקור-מערכת. הנחות-שיווק, יעדי-מכירה, תכניות-קידום ותרחישי-מה-אם נוצרים על-ידי מתכננים ולא נשמרים ב-S/4HANA. עבורם SAP IBP מספק הזנה-ידנית דרך ה-Web UI ודרך ה-Excel Add-in. זו דרך מהירה ושקופה להזין ולערוך Key Figures ידנית בתוך ה-Planning Area, ללא צורך בזרם-אינטגרציה.",
          beginnerHe:
            "לפעמים המתכנן צריך פשוט להקליד מספר — 'אני צופה גידול של 10% בקיץ' — שאין לו מקור בשום מערכת. במקום לבנות צינור-נתונים, הוא פותח את ה-IBP בדפדפן (או ב-Excel) ומקליד ישירות לתוך הטבלה. הנתון נשמר מיד ב-Planning Area ומשתתף בתכנון.",
          consultantHe:
            "ה-IBP Web UI מאפשר עריכת Planning View ישירות בדפדפן; ה-Excel Add-in (IBP for Microsoft Excel) מספק חוויית-תכנון עשירה יותר עם templates, filters ו-favorites. הזנה-ידנית אפשרית רק ל-Key Figures שהוגדרו Editable (לא מחושבים) ברמת-ה-attribute המתאימה. נתונים שמוזנים ידנית עלולים להידרס על-ידי batch loads — לכן נהוג להפריד Key Figures ידניים מ-Key Figures שמקורם integration. ה-Web UI גם מאפשר ייבוא קובץ (CSV upload) כחלופה חצי-ידנית לכמויות גדולות.",
          purposeHe:
            "המטרה: לאפשר למתכננים להזין ולתקן נתונים שאין להם מקור-מערכת (הנחות, יעדים, קידומים, התאמות-שיפוט) במהירות ובשקיפות, ולתמוך בעבודת-תכנון אינטראקטיבית של S&OP.",
          processExampleHe:
            "מנהל-הביקוש פותח Planning View ב-Excel Add-in, מסנן לקטגוריה ולתקופה, ומזין ידנית גידול-ביקוש צפוי לקראת קידום-מכירות. הערך נכתב ל-Key Figure 'Promotion Uplift' ב-Planning Area ומשתתף מיד בחישוב התחזית הכוללת.",
          cbcHe:
            "ב-CBC: מנהל-השיווק מזין דרך ה-Web UI את תכנית-המבצעים לקיץ (הנחות-מחיר, 1+1) ל-Key Figure ידני; ב-Excel Add-in צוות-המכירות מתאים ידנית יעדים לפי רשת. נתונים אלה אין להם מקור ב-S/4HANA ולכן מוזנים ידנית, ומופרדים מ-Key Figures שמקורם CI-DS.",
          navHe: [
            "SAP IBP Web UI ► Planning View ► Edit (עריכה ישירה)",
            "SAP IBP for Microsoft Excel (Add-in) ► Templates ► Planning View",
            "SAP IBP Web UI ► Data Integration ► File Upload (CSV)",
          ],
          tables: [],
          tcodes: [],
          fiori: ["IBP Planning View (Web)", "IBP for Microsoft Excel"],
          configHe: [
            "הגדר Key Figures רלוונטיים כ-Editable (input) ולא כ-calculated, כדי לאפשר הזנה-ידנית.",
            "צור Planning Views / Excel templates עם ה-attributes וה-Key Figures להזנה.",
            "הקצה הרשאות-עריכה (Editable Attributes / Access Control) למשתמשים המתאימים.",
            "הפרד Key Figures ידניים מ-Key Figures שמקורם integration כדי למנוע דריסה.",
          ],
          flow: [
            { he: "מתכנן", code: "Web / Excel", note: "פותח Planning View" },
            { he: "הזנה ידנית", code: "Editable KF", note: "הקלדה/CSV" },
            { he: "שמירה", code: "Planning Area", note: "כתיבה מיידית" },
            { he: "השתתפות בתכנון", code: "S&OP run" },
          ],
          mistakesHe: [
            "הזנה ל-Key Figure מחושב — לא ניתן או נדרס בחישוב הבא.",
            "אי-הפרדת Key Figures ידניים מאלה שמקורם integration — ה-batch דורס את הקלט.",
            "הסתמכות על הזנה-ידנית לכמויות גדולות במקום File Upload (CSV).",
            "חוסר-בקרה על נתונים-ידניים — הופכים ל'קופסה שחורה' ללא תיעוד.",
          ],
          troubleshootHe: [
            "לא ניתן להקליד לתא ➔ ה-Key Figure אינו Editable או חסרה הרשאת-עריכה.",
            "קלט-ידני נעלם אחרי הלילה ➔ batch load דורס; הפרד KF או שנה את סדר-החישוב.",
            "ה-Excel Add-in לא מתחבר ➔ בדוק התקנה, גרסה והרשאות-משתמש מול ה-tenant.",
          ],
          bestPracticeHe: [
            "השתמש ב-Excel Add-in לעבודת-תכנון אינטראקטיבית עם templates ו-favorites.",
            "השתמש ב-File Upload (CSV) לכמויות גדולות במקום הקלדה ידנית.",
            "הפרד והגן על Key Figures ידניים מפני batch loads.",
            "תעד מקור והיגיון של כל נתון-ידני לשקיפות-תכנון.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים בהזנה-ידנית במקום באינטגרציה?", aHe: "כאשר לנתון אין מקור-מערכת — הנחות-שיווק, יעדי-מכירה, קידומים, התאמות-שיפוט. במקום לבנות זרם-אינטגרציה, המתכנן מזין ישירות ב-Web UI או ב-Excel Add-in." },
            { qHe: "מה ההבדל בין ה-Web UI ל-Excel Add-in?", aHe: "ה-Web UI מאפשר עריכת Planning View בדפדפן; ה-Excel Add-in מספק חוויה עשירה יותר עם templates, filters ו-favorites — מועדף לעבודת-תכנון אינטנסיבית." },
            { qHe: "מהו הסיכון העיקרי בנתונים-ידניים?", aHe: "דריסה על-ידי batch loads. לכן מפרידים Key Figures ידניים מ-Key Figures שמקורם integration ושומרים תיעוד-מקור לשקיפות." },
          ],
          takeawaysHe: [
            "הזנה-ידנית נועדה לנתונים ללא מקור-מערכת (הנחות/יעדים/קידומים).",
            "שני ערוצים: Web UI ו-Excel Add-in; CSV upload לכמויות.",
            "רק Key Figures מסוג Editable; הגן עליהם מפני דריסת-batch.",
          ],
          relatedHe: [
            { labelHe: "S&OP · CI-DS (14.2.1)", href: "/library/sop/chapter-14/#sub-14.2.1" },
            { labelHe: "S&OP · ייצוא ב-OData (14.2.3)", href: "/library/sop/chapter-14/#sub-14.2.3" },
          ],
        },
        {
          id: "14.2.3",
          titleHe: "ייצוא נתוני Key Figure באמצעות שירותי OData",
          titleEn: "Export of Key Figure Data Using OData Services",
          execHe:
            "תוצרי-התכנון של IBP (תחזית, תכנית-אספקה, מדדי-S&OP) צריכים לעיתים להגיע לצרכנים חיצוניים: מחסני-נתונים, כלי-BI, אפליקציות מותאמות. SAP IBP חושף Key Figure data דרך OData services — ממשק-REST סטנדרטי, מאובטח, הניתן לצריכה על-ידי כל מערכת התומכת ב-OData. זהו ערוץ-הייצוא הרשמי לקריאת נתוני-תכנון מ-IBP החוצה.",
          beginnerHe:
            "אחרי שה-IBP חישב תחזית, מערכות אחרות רוצות לקרוא אותה — למשל דשבורד-הנהלה. OData הוא 'חלון תקני' שדרכו כל מערכת יכולה לבקש 'תן לי את התחזית לקטגוריה X לחודש Y' ולקבל תשובה בפורמט אחיד. אתה לא מעתיק קבצים — אתה שואל את IBP ישירות דרך כתובת-אינטרנט מאובטחת.",
          consultantHe:
            "ב-IBP מגדירים OData service ברמת-ה-Planning Area: בוחרים Key Figures ו-attributes לחשיפה, ומפרסמים. ה-service חושף את הנתונים כ-entity sets התומכים ב-$filter, $select, $top, $orderby. הצרכן (SAC, מחסן-נתונים, אפליקציה) קורא דרך HTTP עם authentication (OAuth/Basic). זהו ערוץ קריאה (read/export) — בניגוד ל-CI-DS שהוא ETL דו-כיווני. שימושי כשהצרכן יודע לדבר OData ורוצה pull לפי-דרישה ולא push מתוזמן.",
          purposeHe:
            "המטרה: לחשוף תוצרי-תכנון מ-IBP לצרכנים חיצוניים בממשק-תקני, מאובטח וניתן-לסינון, בלי לבנות זרם-ETL ייעודי — pull לפי-דרישה במקום push.",
          processExampleHe:
            "מחסן-נתונים ארגוני קורא בכל בוקר את התחזית המאושרת מ-IBP דרך OData service: בקשת-HTTP עם $filter לחודש ולקטגוריה מחזירה את ה-Key Figure 'Consensus Demand'. הנתון נטען לדוחות-ה-BI בלי קובץ-ביניים.",
          cbcHe:
            "ב-CBC: SAP Analytics Cloud (SAC) ומחסן-הנתונים של המבקבק קוראים את התחזית ותכנית-האספקה מ-IBP דרך OData. מנהלי-הקטגוריות רואים בדשבורד SAC את הביקוש-המוסכם לכל משקה, נמשך ישירות מ-IBP בלי ייצוא-קבצים ידני.",
          navHe: [
            "SAP IBP ► Configuration ► Planning Area ► OData Services (הגדרה ופרסום)",
            "SAP IBP ► Communication Management / Communication Arrangements (אימות)",
            "צרכן חיצוני ► HTTP GET ל-OData endpoint עם $filter/$select",
          ],
          tables: [],
          tcodes: [],
          fiori: ["IBP OData Services Configuration", "IBP Communication Management"],
          configHe: [
            "הגדר OData service ב-Planning Area: בחר Key Figures ו-attributes לחשיפה.",
            "פרסם את ה-service וקבל את ה-endpoint URL.",
            "הגדר authentication (OAuth/Basic) דרך Communication Arrangements למשתמש-טכני.",
            "הצרכן קורא עם $filter/$select/$top לצמצום נפח-הנתונים.",
          ],
          flow: [
            { he: "IBP Planning Area", code: "Key Figures", note: "תחזית/אספקה" },
            { he: "OData service", code: "publish", note: "endpoint URL" },
            { he: "אימות", code: "OAuth/Basic", note: "Comm. Arrangement" },
            { he: "צרכן חיצוני", code: "HTTP GET", note: "SAC/BI/אפליקציה" },
          ],
          mistakesHe: [
            "חשיפת יותר מדי Key Figures/attributes — נתונים רגישים זולגים ועומס מיותר.",
            "קריאה ללא $filter/$select — מושכים נפח-נתונים עצום ופוגעים בביצועים.",
            "בלבול בין OData (ייצוא/read) ל-CI-DS (ETL דו-כיווני) — בחירת-ערוץ שגויה.",
            "authentication לא-מוגדר נכון — קריאות נכשלות או נחשפות ללא-הרשאה.",
          ],
          troubleshootHe: [
            "קריאת-OData מחזירה 401/403 ➔ בדוק Communication Arrangement והרשאות המשתמש-הטכני.",
            "תגובה איטית/ענקית ➔ הוסף $filter ו-$select לצמצום נפח.",
            "Key Figure לא מופיע ב-service ➔ ודא שנכלל בהגדרת ה-OData service ופורסם.",
          ],
          bestPracticeHe: [
            "חשוף רק את ה-Key Figures וה-attributes הנדרשים לצרכן — מינימום-הרשאות.",
            "השתמש תמיד ב-$filter/$select לצמצום נפח ושיפור-ביצועים.",
            "השתמש במשתמש-טכני ייעודי עם OAuth ל-Communication Arrangement.",
            "תעד אילו service-ים פורסמו ואילו צרכנים קוראים מהם.",
          ],
          interviewHe: [
            { qHe: "מהו OData service ב-IBP ולמה הוא משמש?", aHe: "ממשק-REST תקני החושף Key Figure data מ-IBP לצרכנים חיצוניים (SAC, BI, אפליקציות). זהו ערוץ-הייצוא הרשמי לקריאת נתוני-תכנון מ-IBP החוצה לפי-דרישה." },
            { qHe: "מה ההבדל בין OData ל-CI-DS?", aHe: "OData הוא ערוץ קריאה/ייצוא (pull לפי-דרישה) לצרכנים שמדברים OData; CI-DS הוא ETL דו-כיווני מתוזמן (batch) בין S/4HANA ל-IBP. בוחרים לפי תרחיש." },
            { qHe: "כיצד מצמצמים נפח בקריאת-OData?", aHe: "באמצעות query options: $filter (סינון שורות), $select (בחירת-עמודות), $top ו-$orderby. ללא הם נמשך נפח-נתונים עצום ונפגעים הביצועים." },
          ],
          takeawaysHe: [
            "OData = ערוץ-ייצוא תקני (read) של Key Figures מ-IBP לצרכנים חיצוניים.",
            "מגדירים ברמת-Planning Area, מפרסמים endpoint, ומאמתים דרך Communication Arrangement.",
            "תמיד $filter/$select ומינימום-חשיפה — ביצועים ואבטחה.",
          ],
          relatedHe: [
            { labelHe: "S&OP · אינטגרציה פיננסית עם SAC (14.4.1)", href: "/library/sop/chapter-14/#sub-14.4.1" },
            { labelHe: "S&OP · הזנה ידנית (14.2.2)", href: "/library/sop/chapter-14/#sub-14.2.2" },
          ],
        },
      ],
    },
    // ============================================================ 14.3
    {
      id: "14.3",
      titleHe: "אינטגרציה לתכנון תפעולי",
      titleEn: "Integration for Operational Planning",
      execHe:
        "תכנון-תפעולי (Operational Planning) — ובמיוחד IBP for Response & Supply — פועל באופק קצר ודורש נתונים טריים: הזמנות-לקוח חדשות, אישורי-ייצור, שינויי-מלאי. עבורו אינטגרציה תקופתית (batch) אינה מספיקה; נדרשת אינטגרציה בזמן-אמת (Real-Time Integration, RTI) דרך SAP HANA Smart Data Integration (SDI). RTI מסנכרנת נתונים בין S/4HANA ל-IBP כמעט-מיידית, ומאפשרת תכנון-תגובה מבוסס-מציאות-עכשווית.",
      beginnerHe:
        "אם תכנון-טקטי הוא 'מה יקרה בחודשים הבאים', תכנון-תפעולי הוא 'מה עושים עכשיו עם ההזמנה שנכנסה לפני דקה'. בשביל זה אי-אפשר לחכות לטעינה-לילית — צריך שהנתונים יזרמו כמעט-מיד. זה תפקיד ה-RTI: 'צינור-מהיר' שמעביר שינויים מ-S/4HANA ל-IBP ברגע שהם קורים.",
      consultantHe:
        "RTI מבוססת על SAP HANA Smart Data Integration (SDI): adapters וירטואליים (virtual tables) ב-HANA מאפשרים ל-IBP לקרוא נתוני-S/4HANA כמעט-בזמן-אמת, ו-flowgraphs/real-time tasks דוחפים שינויים. IBP for Response & Supply משתמש בזה כדי לקבל הזמנות-מכר, מלאי וקיבולת עדכניים ולהריץ allocation/deployment. בניגוד ל-CI-DS (batch ETL חיצוני), SDI/RTI ממונפת בתוך שכבת-ה-HANA ומספקת latency נמוך משמעותית. העלות: מורכבות-הקמה ועומס גבוה יותר — לכן שמורה לזרמים שבאמת דורשים זמן-אמת.",
      purposeHe:
        "המטרה: לספק ל-IBP for Response & Supply נתונים טריים (הזמנות, מלאי, קיבולת) ב-latency נמוך, כדי לאפשר תכנון-תגובה והקצאה (allocation/deployment) המבוססים על מצב-המערכת העכשווי ולא על תמונת-אמש.",
      processExampleHe:
        "הזמנת-לקוח דחופה נכנסת ל-S/4HANA. דרך SDI/RTI היא מסונכרנת כמעט-מיידית ל-IBP for Response & Supply. מנוע-התגובה מריץ allocation מחדש, מזהה מחסור, ומציע deployment ממרכז-הפצה חלופי — הכל מבוסס על מלאי-עכשווי ולא על snapshot לילי.",
      cbcHe:
        "ב-CBC בעונת-קיץ: רשת-קמעונאות מגדילה הזמנה לפתע. דרך RTI/SDI ההזמנה מגיעה ל-IBP for Response & Supply תוך דקות; המערכת מזהה מחסור-מלאי במרכז-הפצה אחד ומקצה מ-מרכז-סמוך, או מתעדפת פק\"עת-מילוי. ללא RTI, התגובה הייתה מתעכבת עד הטעינה-הלילית — מאוחר מדי לעונת-שיא.",
      navHe: [
        "SAP HANA ► Smart Data Integration ► Remote Sources / Virtual Tables",
        "SAP IBP ► Configuration ► Real-Time Integration (RTI) setup",
        "SAP IBP for Response & Supply ► Planning Runs (Allocation/Deployment)",
      ],
      tables: ["VBAK", "VBAP", "VBEP", "MARD", "MARC"],
      tcodes: ["SE16N", "VA05", "MD04"],
      fiori: ["IBP Response Management", "IBP Planning Runs"],
      configHe: [
        "הקם SAP HANA Smart Data Integration (SDI) עם adapters ו-Remote Sources ל-S/4HANA.",
        "הגדר virtual tables / real-time flowgraphs לזרמים הדורשים latency נמוך.",
        "חבר את RTI ל-Planning Area של IBP for Response & Supply.",
        "הגבל RTI לזרמים קריטיים-בלבד (הזמנות, מלאי, קיבולת); שמור batch לשאר.",
      ],
      flow: [
        { he: "S/4HANA — שינוי", code: "הזמנה/מלאי", note: "מתרחש עכשיו" },
        { he: "SDI virtual/RTI", code: "real-time", note: "סנכרון מיידי" },
        { he: "IBP Response & Supply", code: "Planning Area" },
        { he: "Allocation/Deployment", code: "Planning Run", note: "תגובה" },
        { he: "החזרה ל-S/4HANA", code: "confirm", note: "הקצאה" },
      ],
      masterDataHe: [
        "RTI מסתמכת על Master Data עקבי (Product, Location, Customer, Resource) שכבר טעון ב-IBP — RTI מעבירה בעיקר Transaction Data טרי.",
        "מיפוי-מפתחות חייב להיות זהה לזה שב-batch כדי שלא ייווצרו רשומות-כפולות.",
      ],
      mistakesHe: [
        "החלת RTI על כל זרם — עומס-מערכת ומורכבות מיותרים; רוב הזרמים מסתפקים ב-batch.",
        "חוסר-עקביות במיפוי-מפתחות בין RTI ל-batch — רשומות-כפולות.",
        "הזנחת ה-Master Data — RTI מעבירה עובדות אך הן חסרות-עוגן אם נתוני-האב לא עדכניים.",
        "ציפייה ל-latency אפסי — RTI היא כמעט-בזמן-אמת, לא מיידית-לחלוטין.",
      ],
      troubleshootHe: [
        "נתונים לא מסונכרנים בזמן-אמת ➔ בדוק את ה-SDI adapter, ה-Remote Source וה-virtual tables.",
        "רשומות-כפולות ב-IBP ➔ אי-התאמת מיפוי-מפתחות בין RTI ל-batch.",
        "עומס-מערכת גבוה ➔ צמצם את היקף ה-RTI לזרמים קריטיים והעבר את השאר ל-batch.",
      ],
      bestPracticeHe: [
        "השתמש ב-RTI/SDI רק לזרמים הדורשים latency נמוך (Response & Supply); השאר ב-CI-DS batch.",
        "ודא עקביות מיפוי-מפתחות בין RTI ל-batch למניעת כפילויות.",
        "נטר את ה-SDI adapters ואת latency הסנכרון באופן שוטף.",
        "ודא ש-Master Data עדכני ב-IBP לפני שמסתמכים על RTI לעובדות.",
      ],
      interviewHe: [
        { qHe: "במה תכנון-תפעולי שונה מתכנון-טקטי מבחינת אינטגרציה?", aHe: "תכנון-תפעולי (Response & Supply) פועל באופק קצר ודורש נתונים טריים, ולכן נשען על Real-Time Integration (RTI) דרך SDI; תכנון-טקטי (S&OP) מסתפק ב-batch דרך CI-DS." },
        { qHe: "מהי הטכנולוגיה מאחורי RTI?", aHe: "SAP HANA Smart Data Integration (SDI) — adapters, Remote Sources ו-virtual tables בשכבת-ה-HANA המאפשרים ל-IBP לקרוא ולקבל נתוני-S/4HANA כמעט-בזמן-אמת." },
        { qHe: "מדוע לא להשתמש ב-RTI לכל הזרמים?", aHe: "RTI מורכבת-להקמה ומעמיסה את המערכת; רוב הזרמים (היסטוריה, תכנון-טקטי) מסתפקים ב-batch זול. RTI שמורה לזרמים קריטיים שבאמת דורשים latency נמוך." },
      ],
      takeawaysHe: [
        "תכנון-תפעולי (Response & Supply) דורש נתונים טריים ולכן RTI.",
        "RTI ממומשת דרך SAP HANA Smart Data Integration (SDI) בשכבת-ה-HANA.",
        "השתמש ב-RTI רק לזרמים קריטיים; batch לשאר. שמור עקביות-מפתחות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · CI-DS (14.2.1)", href: "/library/sop/chapter-14/#sub-14.2.1" },
        { labelHe: "S&OP · תרחישי אינטגרציה (14.1)", href: "/library/sop/chapter-14/#sub-14.1" },
      ],
    },
    // ============================================================ 14.4
    {
      id: "14.4",
      titleHe: "אינטגרציות נוספות",
      titleEn: "Other Integrations",
      execHe:
        "מעבר לציר-המרכזי S/4HANA↔IBP, תהליך S&OP מתעשר מאינטגרציות נוספות שמרחיבות את התמונה: חיבור פיננסי ל-SAP Analytics Cloud (SAC) להתאמת התכנית התפעולית לתכנית-הפיננסית, וחיבור הזדמנויות-מכר מ-SAP Cloud for Customer (C4C) להזנת ה-pipeline אל תחזית-הביקוש. אינטגרציות אלה הופכות את S&OP מתרגיל-לוגיסטי לתהליך-תכנון עסקי משולב באמת.",
      beginnerHe:
        "S&OP טוב לא עוסק רק בכמה לייצר — הוא גם שואל 'האם זה רווחי?' ו'מה צוות-המכירות צופה?'. בשביל 'האם זה רווחי' מחברים את IBP ל-SAC (כלי-הניתוח-הפיננסי). בשביל 'מה המכירות צופות' מחברים אותו ל-C4C (מערכת ה-CRM שבה מנהלי-המכירות שומרים הזדמנויות-עסקה). שתי אינטגרציות שמביאות לשולחן את הכסף ואת השטח.",
      consultantHe:
        "(14.4.1) אינטגרציה פיננסית עם SAC: מחברת את התכנית-התפעולית של IBP לתכנון-הפיננסי ב-SAC — חשיפת Key Figures דרך OData / חיבור-ישיר, כך שהתכנית-הכמותית מתורגמת לערכים-כספיים ונבדקת מול התקציב. (14.4.2) אינטגרציית הזדמנויות עם C4C: מושכת opportunities (pipeline) מ-SAP Cloud for Customer אל IBP כקלט לתחזית-הביקוש, ומשלבת את אומדן-המכירות לתוך ה-Demand Plan. שתיהן אינטגרציות cloud-to-cloud המעשירות את ה-S&OP בממדים פיננסי ומסחרי.",
      purposeHe:
        "המטרה: להפוך את S&OP לתהליך עסקי משולב — לא רק איזון ביקוש-אספקה כמותי, אלא תכנית מאומתת-פיננסית (מול SAC) ומבוססת-pipeline מסחרי (מול C4C).",
      processExampleHe:
        "במחזור-S&OP: התכנית-הכמותית מ-IBP מוזנת ל-SAC, שמתרגם אותה להכנסה ולרווח ומשווה לתקציב; פערים מוחזרים לדיון. במקביל, הזדמנויות-מכר מ-C4C מוזרמות ל-IBP ומשמשות אות-ביקוש לתחזית — pipeline משוקלל-הסתברות מתווסף ל-Demand Plan.",
      cbcHe:
        "ב-CBC: התכנית-התפעולית למשקאות מוזנת ל-SAC לבדיקת-רווחיות מול תקציב-השנה (עלות-תרכיז, מחיר-מכירה); דשבורד-הנהלה מציג ביקוש מול הכנסה. במקביל, עסקאות-מכר חדשות עם רשתות חדשות ב-C4C מוזרמות ל-IBP ומגדילות את תחזית-הביקוש לאזורים הרלוונטיים.",
      navHe: [
        "SAP IBP ► OData Services (חשיפה ל-SAC)",
        "SAP Analytics Cloud ► Models ► Data Import / Live Connection",
        "SAP Cloud for Customer ► Opportunities ► Integration",
      ],
      tables: [],
      tcodes: [],
      fiori: ["SAP Analytics Cloud", "SAP Cloud for Customer", "IBP OData Services"],
      configHe: [
        "חשוף Key Figures של IBP דרך OData / חיבור-נתונים ל-SAC לתכנון-פיננסי.",
        "הגדר ב-SAC Model הקולט את התכנית-הכמותית וממיר אותה לערכים-כספיים.",
        "הגדר אינטגרציית opportunities מ-C4C אל IBP כקלט ל-Demand Plan.",
        "תאם periodicity ו-master data בין IBP, SAC ו-C4C.",
      ],
      flow: [
        { he: "IBP — תכנית כמותית", code: "Key Figures" },
        { he: "אל SAC", code: "OData/Live", note: "תרגום פיננסי" },
        { he: "C4C — opportunities", code: "pipeline", note: "אות-ביקוש" },
        { he: "אל IBP Demand Plan", code: "inbound" },
        { he: "S&OP משולב", code: "consensus" },
      ],
      mistakesHe: [
        "התעלמות מהממד-הפיננסי — S&OP נשאר תרגיל-לוגיסטי בלי בדיקת-רווחיות.",
        "הזרמת opportunities ללא שקלול-הסתברות — pipeline מנפח את התחזית.",
        "אי-תיאום master data בין שלוש מערכות-הענן — נתונים לא-מצטלבים.",
      ],
      troubleshootHe: [
        "תכנית-כמותית לא מופיעה ב-SAC ➔ בדוק את ה-OData/Live connection ואת ה-Model.",
        "opportunities לא משפיעים על התחזית ➔ בדוק את מיפוי ה-C4C אל ה-Demand Key Figure.",
        "פערי-נתונים בין מערכות ➔ יישר periodicity ו-master data.",
      ],
      bestPracticeHe: [
        "שלב את הממד-הפיננסי (SAC) ככלי-החלטה במחזור-S&OP, לא כדוח בדיעבד.",
        "שקלל opportunities מ-C4C בהסתברות-זכייה לפני הזנתם לתחזית.",
        "נהל master data משותף ועקבי על-פני IBP/SAC/C4C.",
      ],
      interviewHe: [
        { qHe: "מהן שתי האינטגרציות הנוספות העיקריות ל-S&OP?", aHe: "אינטגרציה פיננסית עם SAP Analytics Cloud (תרגום התכנית-הכמותית לערכים-כספיים מול תקציב), ואינטגרציית opportunities מ-SAP Cloud for Customer (הזרמת pipeline אל תחזית-הביקוש)." },
        { qHe: "מדוע חשוב לחבר את IBP ל-SAC?", aHe: "כדי שה-S&OP יבחן לא רק היתכנות-תפעולית אלא גם רווחיות — התכנית-הכמותית מתורגמת להכנסה ורווח ונבדקת מול התקציב, והופכת ל-S&OP פיננסי-משולב." },
      ],
      takeawaysHe: [
        "S&OP משולב מתעשר מאינטגרציות cloud-to-cloud מעבר ל-S/4HANA.",
        "SAC מוסיף ממד פיננסי; C4C מוסיף את ה-pipeline המסחרי לתחזית.",
        "תיאום master data ו-periodicity בין מערכות-הענן הוא תנאי-הצלחה.",
      ],
      relatedHe: [
        { labelHe: "S&OP · אינטגרציה פיננסית עם SAC (14.4.1)", href: "/library/sop/chapter-14/#sub-14.4.1" },
        { labelHe: "S&OP · אינטגרציית הזדמנויות עם C4C (14.4.2)", href: "/library/sop/chapter-14/#sub-14.4.2" },
      ],
      children: [
        {
          id: "14.4.1",
          titleHe: "אינטגרציה פיננסית עם SAP Analytics Cloud",
          titleEn: "Financial Integration with SAP Analytics Cloud",
          execHe:
            "SAP Analytics Cloud (SAC) הוא פתרון-הענן של SAP לניתוח, תכנון ו-BI. אינטגרציה בין IBP ל-SAC מחברת את התכנית-התפעולית/הכמותית (יחידות, טון, מארזים) לתכנון-הפיננסי (הכנסה, עלות, רווח). כך S&OP מקבל ממד-כספי: כל תרחיש-ביקוש או -אספקה נבדק מול תקציב ורווחיות, וה-S&OP הופך ל-Integrated Business Planning במלוא-מובן-המילה.",
          beginnerHe:
            "IBP יודע 'כמה לייצר ולמכור'. SAC יודע 'כמה כסף זה שווה'. כשמחברים אותם, מנהל יכול לראות לא רק 'נמכור מיליון בקבוקים' אלא 'זה יביא X הכנסה ו-Y רווח — והאם זה עומד בתקציב'. SAC לוקח את המספרים-הכמותיים מ-IBP והופך אותם למספרים-כספיים.",
          consultantHe:
            "החיבור נעשה בדרך-כלל דרך OData service של IBP אל SAC (Data Import) או דרך Live/acquired connection: ה-Key Figures הכמותיים (Demand, Supply) נטענים ל-SAC Model, מוכפלים במחירים/עלויות, ומתורגמים לתכנון-פיננסי. SAC מאפשר value-based planning ותרחישי-מה-אם פיננסיים מעל תוצרי-IBP. הזרימה לרוב חד-כיוונית (IBP→SAC לחשיפה), אך אפשרי גם החזרת-יעדים פיננסיים כאילוץ. תיאום master data (Product/Customer) ו-periodicity בין השניים הוא קריטי.",
          purposeHe:
            "המטרה: להוסיף ל-S&OP ממד פיננסי — לתרגם את התכנית-הכמותית להכנסה, עלות ורווח, לבדוק אותה מול התקציב, ולאפשר החלטות-תכנון מבוססות-רווחיות ולא רק היתכנות-תפעולית.",
          processExampleHe:
            "תחזית-הביקוש מ-IBP (יחידות לפי מוצר/תקופה) נטענת ל-SAC דרך OData. SAC מכפיל במחיר-מכירה ובעלות-תקן, מחשב הכנסה ורווח, ומשווה לתקציב. מנהל-הכספים מזהה שתרחיש-הביקוש פוגע ברווחיות קו-מוצר ומזין משוב למחזור-ה-S&OP הבא.",
          cbcHe:
            "ב-CBC: תחזית-המשקאות מ-IBP נטענת ל-SAC; SAC מתרגם להכנסה (מחיר-מארז) ולעלות (תרכיז, סוכר, אריזה) ומציג רווחיות לפי קטגוריה מול תקציב-השנה. הנהלת-המבקבק רואה בדשבורד SAC שמבצע-קיץ אגרסיבי מגדיל נפח אך שוחק שוליים — קלט להחלטת-S&OP.",
          navHe: [
            "SAP IBP ► Configuration ► OData Services (חשיפה ל-SAC)",
            "SAP Analytics Cloud ► Connections ► OData / SAP IBP connection",
            "SAP Analytics Cloud ► Models ► Import Data / Planning Model",
          ],
          tables: [],
          tcodes: [],
          fiori: ["SAP Analytics Cloud", "IBP OData Services"],
          configHe: [
            "פרסם OData service ב-IBP החושף את ה-Key Figures הכמותיים (Demand/Supply).",
            "הגדר ב-SAC connection אל IBP (OData / acquired) למשיכת הנתונים.",
            "בנה SAC Planning Model הקולט את הכמויות וממיר לערכים-כספיים (מחיר×כמות, עלות×כמות).",
            "תאם master data (Product/Customer) ו-periodicity בין IBP ל-SAC.",
          ],
          flow: [
            { he: "IBP — תחזית כמותית", code: "OData", note: "יחידות" },
            { he: "אל SAC", code: "connection", note: "Data Import" },
            { he: "תרגום פיננסי", code: "SAC Model", note: "מחיר×כמות" },
            { he: "בדיקה מול תקציב", code: "Planning", note: "רווחיות" },
            { he: "משוב ל-S&OP", code: "consensus" },
          ],
          mistakesHe: [
            "אי-התאמת periodicity (חודשי ב-IBP מול רבעוני ב-SAC) — ערכים לא-מצטלבים.",
            "מחירים/עלויות לא-מעודכנים ב-SAC Model — רווחיות שגויה.",
            "התייחסות ל-SAC כדוח בדיעבד במקום ככלי-החלטה במחזור-התכנון.",
          ],
          troubleshootHe: [
            "נתוני-IBP לא מגיעים ל-SAC ➔ בדוק את ה-connection / OData service ואת ההרשאות.",
            "ערכים פיננסיים שגויים ➔ בדוק מחירים/עלויות ב-SAC Model ואת מיפוי-הכמויות.",
            "פערי-תקופה ➔ יישר periodicity בין IBP ל-SAC.",
          ],
          bestPracticeHe: [
            "שלב את SAC כשלב-הערכה-פיננסית בכל מחזור-S&OP.",
            "תחזק מחירים/עלויות עדכניים ב-SAC Model.",
            "תאם master data ו-periodicity בין שתי מערכות-הענן.",
          ],
          interviewHe: [
            { qHe: "מה מוסיפה אינטגרציית SAC ל-S&OP?", aHe: "ממד פיננסי: SAC מתרגם את התכנית-הכמותית של IBP (יחידות) להכנסה, עלות ורווח, ומאפשר לבדוק אותה מול התקציב — S&OP מבוסס-רווחיות ולא רק היתכנות-תפעולית." },
            { qHe: "כיצד מחברים IBP ל-SAC?", aHe: "בדרך-כלל דרך OData service של IBP אל SAC (Data Import / connection); ה-Key Figures הכמותיים נטענים ל-SAC Model שמכפיל במחירים/עלויות לקבלת ערכים-כספיים." },
          ],
          takeawaysHe: [
            "SAC = הממד-הפיננסי של S&OP: כמות → הכנסה/עלות/רווח.",
            "חיבור דרך OData/connection אל SAC Planning Model.",
            "תאם מחירים, master data ו-periodicity; השתמש ב-SAC כשלב-החלטה.",
          ],
          relatedHe: [
            { labelHe: "S&OP · ייצוא ב-OData (14.2.3)", href: "/library/sop/chapter-14/#sub-14.2.3" },
            { labelHe: "S&OP · אינטגרציית הזדמנויות עם C4C (14.4.2)", href: "/library/sop/chapter-14/#sub-14.4.2" },
          ],
        },
        {
          id: "14.4.2",
          titleHe: "אינטגרציית הזדמנויות עם SAP Cloud for Customer",
          titleEn: "Opportunities Integration with SAP Cloud for Customer",
          execHe:
            "SAP Cloud for Customer (C4C) הוא פתרון ה-CRM של SAP, שבו צוותי-המכירות מנהלים opportunities — הזדמנויות-עסקה לאורך משפך-המכירות (pipeline). אינטגרציה בין C4C ל-IBP מזרימה את ה-pipeline אל תחזית-הביקוש: מה שהמכירות צופות לסגור הופך לאות-ביקוש ב-Demand Plan. כך S&OP נשען לא רק על היסטוריה אלא גם על מודיעין-השטח המסחרי-העכשווי.",
          beginnerHe:
            "אנשי-המכירות יודעים על עסקאות שעוד לא קרו — 'אנחנו עומדים לסגור עם רשת חדשה'. מידע זה יושב ב-C4C (ה-CRM). אם נחבר אותו ל-IBP, התחזית תכלול גם את העסקאות-העתידיות האלה, לא רק את מה שכבר נמכר בעבר. כך התחזית 'יודעת' מה צוות-המכירות צופה.",
          consultantHe:
            "האינטגרציה מושכת opportunities מ-C4C (סכום, מוצר/קטגוריה, לקוח, הסתברות-זכייה, תאריך-סגירה צפוי) אל IBP כקלט ל-Demand Planning Key Figure. נהוג לשקלל את הסכום בהסתברות-הזכייה (weighted pipeline) לפני הזנתו לתחזית, כדי לא לנפח. החיבור הוא cloud-to-cloud (לרוב דרך OData / SAP Cloud Integration). תיאום master data (Product/Customer mapping בין C4C ל-IBP) הוא תנאי-הכרחי, וכך גם הגדרת-התקופה שאליה משויכת ההזדמנות.",
          purposeHe:
            "המטרה: להעשיר את תחזית-הביקוש במודיעין-מכירות עכשווי — לשלב את ה-pipeline (עסקאות צפויות) מ-C4C אל ה-Demand Plan של IBP, כך ש-S&OP ישקף לא רק עבר אלא גם צפי-מסחרי קדימה.",
          processExampleHe:
            "מנהל-מכירות מזין ב-C4C opportunity חדש: 500K יחידות, הסתברות 70%, סגירה צפויה ברבעון הבא. האינטגרציה מזרימה את ההזדמנות ל-IBP; היא משוקללת ל-350K יחידות ומתווספת ל-Demand Plan לתקופה ולמוצר הרלוונטיים, ומשפיעה על תכנית-האספקה.",
          cbcHe:
            "ב-CBC: צוות-המכירות סוגר עסקה לאספקת משקאות לרשת-מלונות חדשה — מתועד כ-opportunity ב-C4C. האינטגרציה מזרימה אותו ל-IBP, משוקלל בהסתברות, ומגדיל את תחזית-הביקוש לאזור ולקטגוריה — קווי-המילוי מתוכננים מראש לנפח הנוסף.",
          navHe: [
            "SAP Cloud for Customer ► Opportunities ► Pipeline",
            "SAP Cloud for Customer ► Integration ► OData / SAP Cloud Integration",
            "SAP IBP ► Planning Area ► Demand Key Figure (יעד ה-pipeline)",
          ],
          tables: [],
          tcodes: [],
          fiori: ["SAP Cloud for Customer", "IBP Demand Planning"],
          configHe: [
            "הגדר אינטגרציית opportunities מ-C4C אל IBP (OData / SAP Cloud Integration).",
            "מפֵּה opportunity attributes (Product/Customer/סכום/הסתברות/תאריך) אל Demand Key Figure.",
            "החל שקלול-הסתברות (weighted pipeline) לפני הזנה לתחזית.",
            "תאם master data (Product/Customer mapping) ו-periodicity בין C4C ל-IBP.",
          ],
          flow: [
            { he: "C4C — opportunity", code: "pipeline", note: "סכום+הסתברות" },
            { he: "שקלול-הסתברות", code: "weighted", note: "סכום×prob" },
            { he: "אל IBP", code: "OData/CI", note: "cloud-to-cloud" },
            { he: "Demand Key Figure", code: "Demand Plan" },
            { he: "השפעה על אספקה", code: "S&OP run" },
          ],
          mistakesHe: [
            "הזנת ה-pipeline ללא שקלול-הסתברות — התחזית מתנפחת מעסקאות לא-ודאיות.",
            "אי-מיפוי Product/Customer בין C4C ל-IBP — ההזדמנות לא מתחברת לתחזית הנכונה.",
            "כפל-ספירה: גם היסטוריה וגם pipeline לאותו ביקוש — תחזית מנופחת.",
          ],
          troubleshootHe: [
            "opportunities לא משפיעים על התחזית ➔ בדוק את האינטגרציה ואת מיפוי ה-Demand Key Figure.",
            "תחזית מנופחת ➔ ודא שקלול-הסתברות ושאין כפל-ספירה מול היסטוריה.",
            "הזדמנות בתקופה/מוצר שגויים ➔ בדוק את מיפוי ה-attributes וה-periodicity.",
          ],
          bestPracticeHe: [
            "שקלל תמיד את ה-pipeline בהסתברות-זכייה לפני הזנתו לתחזית.",
            "ודא מיפוי master data עקבי (Product/Customer) בין C4C ל-IBP.",
            "הימנע מכפל-ספירה: הפרד אות-pipeline מאות-היסטוריה ב-Demand Plan.",
          ],
          interviewHe: [
            { qHe: "מה מוסיפה אינטגרציית C4C ל-S&OP?", aHe: "מודיעין-מכירות עכשווי: opportunities (pipeline) מ-SAP Cloud for Customer מוזרמים אל ה-Demand Plan של IBP, כך שהתחזית משקפת גם עסקאות-עתידיות צפויות ולא רק היסטוריה." },
            { qHe: "מדוע משקללים את ה-pipeline בהסתברות לפני הזנתו?", aHe: "כדי לא לנפח את התחזית מעסקאות לא-ודאיות; הסכום מוכפל בהסתברות-הזכייה (weighted pipeline) לקבלת אומדן-ביקוש מציאותי." },
          ],
          takeawaysHe: [
            "C4C מזרים את ה-pipeline המסחרי אל תחזית-הביקוש של IBP.",
            "שקלל בהסתברות-זכייה ומפה master data למניעת ניפוח וכפל-ספירה.",
            "אינטגרציה cloud-to-cloud (OData / SAP Cloud Integration).",
          ],
          relatedHe: [
            { labelHe: "S&OP · אינטגרציה פיננסית עם SAC (14.4.1)", href: "/library/sop/chapter-14/#sub-14.4.1" },
            { labelHe: "S&OP · תרחישי אינטגרציה (14.1)", href: "/library/sop/chapter-14/#sub-14.1" },
          ],
        },
      ],
    },
    // ============================================================ 14.5
    {
      id: "14.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הראה שאינטגרציה היא עמוד-השדרה של S&OP מבוסס-IBP. הזרם המרכזי הוא S/4HANA↔IBP: עובדות פנימה (מכירות, מלאי, ייצור), תכניות החוצה (תחזית, אספקה). הבחירה בין מנגנונים — CI-DS (batch לתכנון-טקטי), SDI/RTI (real-time לתכנון-תפעולי), Web UI (ידני), OData (ייצוא) — נקבעת לפי ה-latency הנדרש. אינטגרציות-ענן נוספות (SAC לפיננסים, C4C ל-pipeline) הופכות את S&OP לתכנון עסקי משולב באמת.",
      beginnerHe:
        "סיכום פשוט: IBP מתכנן, אבל הוא צריך מידע ונותן תוצאות. המידע מגיע בעיקר מ-S/4HANA — או בלילה (CI-DS) או בזמן-אמת (RTI), לפי כמה דחוף. אפשר גם להקליד ידנית (Web UI) ולייצא החוצה (OData). ועוד שתי מערכות מצטרפות: SAC שמוסיף את צד-הכסף, ו-C4C שמוסיף את צד-המכירות-העתידיות. ביחד — תכנון שלם.",
      consultantHe:
        "ארכיטקטורת-האינטגרציה של IBP for S&OP: (1) ציר-ליבה S/4HANA↔IBP דרך CI-DS לזרמים טקטיים ו-SDI/RTI לזרמים תפעוליים; (2) הזנה-ידנית דרך Web UI/Excel Add-in לנתונים ללא מקור-מערכת; (3) ייצוא דרך OData services לצרכנים חיצוניים; (4) אינטגרציות cloud-to-cloud אל SAC (פיננסי) ו-C4C (opportunities). העקרונות החוצים: Master Data לפני Transaction Data, ID mapping עקבי, בחירת-מנגנון לפי latency, ותיאום periodicity. הקפדה עליהם הופכת את S&OP מתרגיל-תיאורטי לתהליך-תכנון מבוסס-מציאות.",
      purposeHe:
        "המטרה של הפרק: לתת תמונה שלמה של אפשרויות-האינטגרציה של IBP ל-S&OP, ולהקנות את שיקול-הדעת לבחירת המנגנון הנכון לכל זרם-נתונים — כך שהתכנית תהיה אמינה, עדכנית ויעילה-תפעולית.",
      processExampleHe:
        "מחזור-S&OP מלא: CI-DS טוען בלילה היסטוריה ומלאי; מתכננים מזינים ידנית קידומים ב-Web UI; C4C מזרים pipeline משוקלל; IBP מריץ תחזית ותכנית-אספקה; SAC בודק רווחיות מול תקציב; OData חושף את התחזית המאושרת ל-BI; ובמקביל RTI מסנכרן הזמנות-דחופות ל-Response & Supply. כל המנגנונים יחד = תכנון משולב.",
      cbcHe:
        "ב-CBC, התמונה המלאה: CI-DS מזין מכירות-משקאות ומלאי מ-S/4HANA; שיווק מזין מבצעי-קיץ ידנית; C4C מזרים עסקאות-רשתות חדשות; IBP מתכנן ביקוש ואספקה עונתיים; SAC מאמת רווחיות מול תקציב; OData מזין דשבורדי-הנהלה; RTI מאפשר תגובה מהירה בעונת-שיא. כך S&OP של המבקבק מבוסס על מציאות מלאה.",
      navHe: [
        "SAP IBP Web UI ► Application Jobs ► Data Integration (תמונת-מצב כוללת)",
        "SAP IBP ► Configuration ► Planning Areas / OData Services",
      ],
      tables: ["VBRP", "MARD", "VBAK", "AFKO"],
      tcodes: ["SE16N"],
      fiori: ["IBP Data Integration", "SAP Analytics Cloud", "SAP Cloud for Customer"],
      configHe: [
        "מטריצת-אינטגרציה כוללת: לכל זרם — כיוון, מנגנון (CI-DS/SDI/Web/OData), תדירות, Key Figure.",
        "ודא Master Data לפני Transaction Data בכל הזרמים, ו-ID mapping עקבי.",
        "בחר מנגנון לפי latency: batch לטקטי, RTI לתפעולי.",
        "תאם periodicity ו-master data על-פני IBP/SAC/C4C.",
      ],
      flow: [
        { he: "S/4HANA", code: "CI-DS/RTI", note: "עובדות פנימה" },
        { he: "הזנה ידנית", code: "Web UI", note: "ללא מקור" },
        { he: "IBP — תכנון", code: "S&OP run", note: "ליבה" },
        { he: "SAC + C4C", code: "cloud", note: "פיננסי + pipeline" },
        { he: "OData ייצוא", code: "צרכנים", note: "החוצה" },
      ],
      mistakesHe: [
        "בחירת-מנגנון לא-תואמת-latency — RTI מיותר לטקטי, batch איטי מדי לתפעולי.",
        "הזנחת master data ו-ID mapping — בסיס רעוע לכל הזרמים.",
        "התמקדות בציר S/4HANA↔IBP בלבד והזנחת SAC/C4C — S&OP חלקי.",
      ],
      troubleshootHe: [
        "תכנית לא-אמינה ➔ עקוב אחר מטריצת-האינטגרציה: איזה זרם נכשל/מיושן.",
        "נתונים לא-מצטלבים בין מערכות ➔ master data, mapping ו-periodicity לא-מתואמים.",
      ],
      bestPracticeHe: [
        "נהל מטריצת-אינטגרציה מתועדת ועדכנית כמסמך-העבודה המרכזי.",
        "בחר תמיד את המנגנון הזול-ביותר שעומד ב-latency הנדרש.",
        "אכוף Master-Data-לפני-Transaction ו-ID mapping עקבי בכל ערוץ.",
        "ראה את S&OP כתכנון-משולב: S/4HANA + SAC + C4C, לא רק לוגיסטיקה.",
      ],
      interviewHe: [
        { qHe: "מהם ארבעת ערוצי-האינטגרציה של IBP ל-S&OP?", aHe: "CI-DS (batch לטקטי), SDI/RTI (real-time לתפעולי), Web UI/Excel Add-in (הזנה-ידנית), ו-OData services (ייצוא לצרכנים). אליהם מצטרפות אינטגרציות-ענן ל-SAC ו-C4C." },
        { qHe: "מהו עקרון-העל בבחירת מנגנון-אינטגרציה?", aHe: "התאמה ל-latency הנדרש: בחר את המנגנון הזול-והפשוט-ביותר שעומד בדרישת-הטריות — batch (CI-DS) לטקטי, RTI (SDI) לתפעולי." },
        { qHe: "אילו עקרונות חוצים את כל הערוצים?", aHe: "Master Data לפני Transaction Data, ID mapping עקבי, תיאום periodicity, וניהול מטריצת-אינטגרציה מתועדת — הם הבסיס לכל זרם אמין." },
      ],
      takeawaysHe: [
        "אינטגרציה היא עמוד-השדרה של S&OP מבוסס-IBP.",
        "ארבעה ערוצים: CI-DS, SDI/RTI, Web UI, OData — בחירה לפי latency.",
        "SAC ו-C4C מרחיבים את S&OP לממד פיננסי ומסחרי.",
        "Master Data, ID mapping ו-periodicity הם העקרונות החוצים את הכל.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תרחישי אינטגרציה (14.1)", href: "/library/sop/chapter-14/#sub-14.1" },
        { labelHe: "S&OP · אינטגרציה תפעולית (14.3)", href: "/library/sop/chapter-14/#sub-14.3" },
      ],
    },
  ],
};
