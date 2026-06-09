// ===== PP Digital Textbook — Chapter 1 (learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved; coherent sub-headings kept verbatim in order.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "מבוא לתכנון ייצור ב-SAP S/4HANA",
  titleEn: "Introduction to Production Planning in SAP S/4HANA",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למבוא לתכנון-הייצור (PP) ב-SAP S/4HANA. כל תת-פרק מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הפרק סוקר את מודולי-המשנה של PP (ייצור בדיד, תהליכי וחוזר), את הפישוטים של S/4HANA, את ה-Embedded Analytics, את ה-Fiori Launchpad, את MRP Live ואת מודל-הנתונים של הייצור. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1", titleHe: "תכנון ובקרת ייצור (Production Planning and Control)", titleEn: "Production Planning and Control",
      execHe:
        "תכנון ובקרת ייצור (PP/PPC) הוא המודול שמתרגם ביקוש למוצרים מוגמרים לתוכנית-ייצור ביצועית: מה לייצר, כמה, מתי ואיפה. הוא מגשר בין התכנון האסטרטגי (מכירות-ותפעול) לבין הביצוע ברצפת-הייצור, ומחבר את הלוגיסטיקה (MM, SD) לבקרת-העלויות (CO). ב-S/4HANA הוא נשען על מנוע MRP Live בזיכרון ועל ניתוח מובנה בזמן-אמת.",
      beginnerHe:
        "דמיין מפעל שצריך לדעת מה לייצר השבוע. PP הוא 'המוח המתכנן': הוא לוקח את הדרישה (הזמנות-לקוח ותחזית), בודק מה כבר במלאי ומה כבר בייצור, ומחשב בדיוק מה חסר ומתי להתחיל לייצר. אחר-כך הוא הופך את התוכנית להזמנות-ייצור שהעובדים מבצעים, ולבסוף עוקב אחרי מה שבאמת יוצר.",
      consultantHe:
        "PP מורכב מתת-מודולים: Demand Management (PIR), MRP / MRP Live, Capacity Planning, ושלושה אופני-ייצור — Discrete (פק\"ע / Production Order), Process (PP-PI, פקודת-תהליך / Process Order) ו-Repetitive (REM). מבחינה ארכיטקטונית ב-S/4HANA הוטמע MRP Live (MD01N) הרץ ישירות על ה-HANA DB ללא העתקת-נתונים, בוטלו טבלאות-Aggregate כמו MDVM, והניתוח מבוסס Embedded Analytics על CDS Views במקום SAP BW נפרד. ה-PP אינו אי — הוא תלוי באב-החומר (MM), במכירות (SD) ומוזן לבקרת-עלות-מוצר (CO-PC).",
      purposeHe:
        "המטרה: להבטיח שהמוצר הנכון יהיה זמין בכמות הנכונה, בזמן הנכון ובעלות מיטבית, תוך איזון בין רמת-שירות-ללקוח, ניצול-קיבולת ומלאי. PP הוא הכלי שמונע גם מחסור (חוסר-זמינות) וגם עודף (מלאי כלוא).",
      processExampleHe:
        "ביקוש לטלפון נכנס כתחזית (PIR) והזמנות-מכירה. MRP Live סורק את אב-החומר, מנכה מלאי וקבלות-צפויות, ויוצר הזמנות-מתוכננות לרכיבים-מיוצרים ודרישות-רכש לקנויים. המתכנן ממיר את ההזמנה-המתוכננת לפק\"ע, משחרר אותה, ורצפת-הייצור מדווחת ביצוע (Confirmation) — המידע זורם בזמן-אמת ל-CO לחישוב עלות-המוצר בפועל.",
      cbcHe:
        "ב-CBC: ביקוש לקרטוני-משקה נכנס כ-PIR שבועי לפי תחזית-מכירות. MRP Live מתרגם אותו לדרישות תרכיז, סוכר, CO2, בקבוקים ותוויות, וליצירת הזמנות-מתוכננות לקווי-המילוי. מכיוון שהמשקאות מיוצרים ב-PP-PI, ההזמנה-המתוכננת הופכת לפקודת-תהליך (Process Order) ולא לפק\"ע רגילה.",
      navHe: [
        "SAP Easy Access ► Logistics ► Production ► MRP ► MRP ► MD01N – MRP Live",
        "Production ► Material Requirements Planning ► Planning ► Define Scope of Planning",
        "SAP Fiori Launchpad ► Manufacturing ► Monitor Material Coverage / Manage Production Orders",
      ],
      tables: ["MARC", "PLAF", "AFKO", "AFPO", "RESB"],
      tcodes: ["MD01N", "MD04", "CO01", "COR1", "MF50", "MD02"],
      fiori: ["F1422", "F2101", "F0247", "F2735"],
      configHe: [
        "Plant Parameters (OPPQ) ו-MRP Group Parameters (OPPR) — פרמטרי-תכנון ברמת-מפעל/קבוצה.",
        "Order Type & Order-Type-Dependent Parameters (OPL8) — מקשרים אופן-ייצור לסוג-הזמנה.",
        "Scope of Planning — צבירת מפעלים/MRP-Areas להרצה-משולבת.",
        "Activate Embedded Analytics / CDS-based KPIs ל-Fiori Launchpad.",
      ],
      flow: [
        { he: "ביקוש (תחזית + הזמנות)", code: "MD61/VA01", note: "PIR + Sales Orders" },
        { he: "הרצת MRP", code: "MD01N", note: "MRP Live בזיכרון" },
        { he: "הזמנות-מתוכננות", code: "MD04", note: "PLAF" },
        { he: "המרה לפק\"ע/פקודת-תהליך", code: "CO01/COR1" },
        { he: "ביצוע + דיווח", code: "CO11N/COR6N" },
        { he: "ניתוח עלות + KPI", code: "CO-PC/Fiori" },
      ],
      masterDataHe: [
        "אב-חומר (MARC-DISMM/DISLS/BESKZ) הוא תנאי-הסף — בלעדיו אין תכנון.",
        "BOM (STKO/STPO) ו-Routing/Recipe מגדירים 'ממה' ו'כיצד'.",
        "Production Version (MKAL) מקשרת BOM+Routing וחובה ב-S/4HANA לבחירת-מקור.",
      ],
      mistakesHe: [
        "ערבוב אופני-ייצור — שימוש בפק\"ע למוצר שמתאים ל-REM או ל-PP-PI.",
        "הרצת MRP בלי לוודא נתוני-אב מלאים — תוצאות חלקיות וללא-שגיאה ברורה.",
        "הסתמכות על דוחות SAP GUI ישנים במקום ה-Fiori/Embedded Analytics של S/4HANA.",
        "התעלמות מ-Order-Type-Dependent Parameters — שחרור/GR אוטומטיים לא פועלים.",
      ],
      troubleshootHe: [
        "MRP לא יוצר הזמנות ➔ בדוק MRP Type, תצוגת-MRP במפעל, ו-Scope of Planning.",
        "פק\"ע נתקעת ב-CRTD ➔ Production Scheduling Profile / Order-Type Parameters חסרים.",
        "KPI לא מתעדכן בזמן-אמת ➔ CDS View / Embedded Analytics לא הופעלו.",
        "תוצאות-תכנון לא הגיוניות ➔ Production Version או נתוני-אב סותרים.",
      ],
      bestPracticeHe: [
        "התאם את אופן-הייצור (Discrete/Process/REM) לאופי המוצר לפני המימוש.",
        "השתמש ב-MRP Live וב-Fiori Apps המובנים במקום עקיפות SAP GUI.",
        "תקנן Order Types ופרמטרי-תכנון ברמת-מפעל לפני העלייה-לאוויר.",
        "בנה Checklist נתוני-אב (Material+BOM+Routing+Version) כתנאי לכל הרצה.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת אופני-הייצור ב-PP?", aHe: "Discrete (ייצור-בדיד, פק\"ע), Process (PP-PI, פקודת-תהליך) ו-Repetitive (REM, ייצור-חוזר). הבחירה תלויה באופי המוצר ובתהליך." },
        { qHe: "כיצד PP מתחבר ל-MM, SD ו-CO?", aHe: "SD מזין ביקוש; MM מספק נתוני-אב ומלאי; PP מתכנן ומבצע; CO-PC מקבל עלויות-ייצור בפועל לחישוב עלות-מוצר." },
        { qHe: "מה ייחודי ל-PP ב-S/4HANA לעומת ECC?", aHe: "MRP Live בזיכרון, ביטול טבלאות-Aggregate, Embedded Analytics על CDS, ו-Fiori Launchpad כממשק-עבודה ראשי." },
      ],
      takeawaysHe: [
        "PP מתרגם ביקוש לתוכנית-ייצור ביצועית ומחבר לוגיסטיקה לבקרת-עלות.",
        "שלושה אופני-ייצור: Discrete, Process, Repetitive.",
        "S/4HANA = MRP Live בזיכרון + Embedded Analytics + Fiori.",
        "נתוני-אב מלאים הם תנאי-הסף לכל תכנון.",
      ],
      relatedHe: [
        { labelHe: "PP · הגדרת ייצור בדיד (פרק 3)", href: "/library/pp/chapter-03/" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
      children: [
        {
          id: "1.1.1", titleHe: "סקירת תכנון הייצור", titleEn: "Production Planning Overview",
          execHe: "תכנון-הייצור הוא התהליך שמתרגם ביקוש-צפוי וביקוש-בפועל לתוכנית-אספקה: רמת-מלאי-יעד, כמויות-ייצור ומועדים. הוא מורכב משכבות — תכנון מכירות-ותפעול (S&OP), ניהול-ביקוש, MRP, ותכנון-קיבולת — כל אחת מצמצמת את אי-הוודאות.",
          beginnerHe: "לפני שמייצרים, צריך לתכנן. תכנון-הייצור עונה על 'מה צריך, כמה ומתי' — מהרמה הגסה (כמה משקה למכור ברבעון) ועד הרמה המדויקת (כמה בקבוקים לייצר ביום שלישי).",
          consultantHe: "התכנון נע מ-Long-term (S&OP / SOP, מצרפי) דרך Mid-term (Demand Management, PIR) אל Short-term (MRP, Capacity, Scheduling). ב-S/4HANA ה-S&OP המתקדם עבר ל-SAP IBP בענן, בעוד MRP ו-Capacity נותרו מובנים (Embedded). זרימת-התכנון יורדת מרמת-מוצר-מצרפי לרמת-חומר-בודד-במפעל.",
          purposeHe: "ליצור 'תוכנית-על' שמאזנת ביקוש מול קיבולת ומלאי, ומספקת בסיס ברור ל-MRP לחשב דרישות-מדויקות.",
          processExampleHe: "תחזית-מכירות רבעונית יורדת ל-PIR חודשי לכל מוצר; MRP מפרק אותה לדרישות-רכיבים יומיות; תכנון-קיבולת מאזן את העומס על המכונות.",
          cbcHe: "ב-CBC התחזית העונתית (קיץ = ביקוש-שיא) יורדת ל-PIR שבועי לכל טעם; MRP מתרגם לדרישות-תרכיז ולתזמון קווי-המילוי.",
          navHe: ["SAP Easy Access ► Logistics ► Production ► Production Planning ► Demand Management ► MD61 – Create PIR"],
          tables: ["PBED", "PBIM", "MDKP"],
          tcodes: ["MD61", "MD62", "MC87"],
          fiori: ["F2101", "F3279"],
          configHe: ["Define Planning Strategy / Strategy Group (OPPS) הקובע כיצד תחזית והזמנות-מכירה מתקזזות.", "Activate Requirements Planning per Plant."],
          mistakesHe: ["דילוג על Demand Management והזנת PIR ישירות בלי אסטרטגיית-תכנון.", "ערבוב אופקי-תכנון — תכנון מצרפי וקצר-טווח באותו מנגנון."],
          troubleshootHe: ["MRP לא רואה את התחזית ➔ PIR לא פעיל או Strategy Group שגוי.", "כפל-דרישה ➔ תחזית והזמנות-מכירה לא מתקזזות (Consumption Mode)."],
          bestPracticeHe: ["הפרד בבירור בין S&OP/IBP, Demand Management ו-MRP.", "תקנן אסטרטגיות-תכנון מעטות וברורות."],
          interviewHe: [
            { qHe: "מהן שכבות תכנון-הייצור?", aHe: "S&OP/SOP (מצרפי, ארוך-טווח), Demand Management (PIR, בינוני), MRP ותכנון-קיבולת (קצר-טווח, מפורט)." },
            { qHe: "מה עבר ל-IBP ב-S/4HANA?", aHe: "ה-S&OP המתקדם עבר ל-SAP IBP בענן; MRP ותכנון-קיבולת נותרו מובנים." },
          ],
          takeawaysHe: ["התכנון יורד ממצרפי למפורט.", "S&OP מתקדם = IBP בענן.", "PIR הוא הגשר בין תחזית ל-MRP."],
          relatedHe: [{ labelHe: "PP · ניהול ביקוש", href: "/library/pp/chapter-12/" }],
        },
        {
          id: "1.1.2", titleHe: "מאפייני אופני הייצור", titleEn: "Characteristics of Production Types",
          execHe: "שלושת אופני-הייצור נבדלים באופי-המוצר ובתהליך: Discrete מתאים למוצרים מורכבים-בדידים עם מסלול-פעולות (פק\"ע); Process מתאים לייצור-תהליכי רציף/אצוות עם מתכון (Process Order); Repetitive מתאים לייצור-המוני אחיד בקצב-קבוע (REM, ללא פק\"ע פרטנית).",
          beginnerHe: "לא כל מפעל מייצר אותו דבר. מכונית = ייצור-בדיד (חלקים נפרדים שמרכיבים). משקה או תרופה = ייצור-תהליכי (מערבבים נוזלים לפי מתכון). מוצר-צריכה זהה שזורם ברצף = ייצור-חוזר.",
          consultantHe: "Discrete משתמש ב-Routing+BOM ובפק\"ע (AUFK/AFKO), עם מעקב-פרטני לפי הזמנה. Process (PP-PI) משתמש ב-Master Recipe (PLPOD), ב-Resource במקום Work Center, וב-Process Order עם Control Recipes ו-Process Messages. Repetitive משתמש ב-Rate Routing, ב-Production Version, וב-Backflush מול Run Schedule — ללא הזמנה פרטנית, רק כמויות-תקופה.",
          purposeHe: "להתאים את מודל-הנתונים ואת מנגנון-הביצוע לאופי-הייצור האמיתי, כדי למזער תקורה ולמקסם דיוק.",
          processExampleHe: "מפעל-מזון: רוטב = Process (מתכון, אצווה); אריזה-חוזרת של אותו מוצר = REM (קצב); קו-הרכבה של ערכות-מתנה = Discrete (פק\"ע).",
          cbcHe: "ב-CBC: ערבול-ומילוי משקה = Process (PP-PI, מתכון + Resource + Batch); אם קו מסוים מייצר משקה-יחיד ברצף-קבוע — ניתן לנהלו כ-REM להפחתת-תקורה.",
          navHe: ["Production ► Basic Data ► Define Production Types / Order Types per Mode"],
          tables: ["AFKO", "PLPOD", "AFRU", "MARC"],
          tcodes: ["CO01", "COR1", "MF50", "MFBF"],
          fiori: ["F2735", "F3469"],
          configHe: ["שיוך Order Type לאופן-ייצור; הפעלת REM באמצעות MARC-SAUFT ו-REM Profile; PP-PI דרך Master Recipe + Resource."],
          mistakesHe: ["שימוש בפק\"ע למוצר-המוני אחיד במקום REM — תקורת-ניהול מיותרת.", "ניהול ייצור-תהליכי דרך Discrete במקום PP-PI — אובדן Control Recipes ו-Batch."],
          troubleshootHe: ["אי-אפשר ליצור פקודת-תהליך ➔ אין Master Recipe או Resource מתאים.", "REM לא קולט Backflush ➔ חסר REM Profile / Production Version."],
          bestPracticeHe: ["בחר אופן-ייצור לפי אופי-המוצר, לא לפי הרגל.", "תעד את הקריטריון לבחירת-האופן בכל קבוצת-מוצרים."],
          interviewHe: [
            { qHe: "מה ההבדל בין Process ל-Discrete?", aHe: "Process (PP-PI) משתמש ב-Master Recipe, Resource, Process Order ו-Control Recipes לתעשיות-תהליך; Discrete משתמש ב-Routing, Work Center ופק\"ע למוצרים-בדידים." },
            { qHe: "מתי בוחרים REM?", aHe: "כשמייצרים מוצר אחיד בקצב-קבוע ובכמות-גבוהה; REM מבטל הזמנה פרטנית ומשתמש ב-Backflush מול כמויות-תקופה." },
          ],
          takeawaysHe: ["Discrete = פק\"ע + Routing.", "Process = פקודת-תהליך + Recipe.", "REM = קצב + Backflush ללא פק\"ע."],
          relatedHe: [{ labelHe: "PP · הגדרת ייצור בדיד (פרק 3)", href: "/library/pp/chapter-03/" }],
        },
        {
          id: "1.1.3", titleHe: "תהליכים בתכנון ובקרת ייצור", titleEn: "Processes in Production Planning and Control",
          execHe: "מחזור-החיים של PPC רץ משרשרת אחידה: ניהול-ביקוש ► MRP ► המרת-הזמנה-מתוכננת ► שחרור ► אספקת-חומר ► ביצוע-ודיווח ► קבלת-תוצר ► סגירה-וחישוב-עלות. כל שלב מייצר אובייקט-נתונים שמזין את הבא.",
          beginnerHe: "תכנון-הייצור הוא מסלול: קודם מחליטים מה צריך (ביקוש), ואז המערכת מחשבת (MRP), פותחת הזמנת-ייצור, מספקת חומרים, מייצרים, מדווחים, ומקבלים את המוצר למלאי.",
          consultantHe: "השרשרת מערבת אובייקטים: PIR (PBED) → Planned Order (PLAF) → Production/Process Order (AFKO/AFPO) → Reservations (RESB) → Goods Issue (261) → Confirmation (AFRU) → Goods Receipt (101) → Settlement. ב-S/4HANA כל המעברים נראים בזמן-אמת ב-Stock/Requirements List (MD04) וב-Fiori, וה-Settlement מזין את CO-PC.",
          purposeHe: "להבטיח רצף-ביצוע מבוקר ועקבי שבו כל החלטת-תכנון הופכת לפעולה ולמדידה — ללא 'נפילות' בין השלבים.",
          processExampleHe: "PIR ► MRP יוצר Planned Order ► המתכנן ממיר לפק\"ע ► בדיקת-זמינות ושחרור ► משיכת-רכיבים (261) ► דיווח-פעולות (CO11N) ► GR (101) למלאי ► Settlement לסגירת-עלות.",
          cbcHe: "ב-CBC: PIR למשקה ► MRP יוצר Planned Order ► המרה לפקודת-תהליך ► שחרור ויצירת Control Recipe ► משיכת תרכיז/אריזה ► דיווח-מילוי ► GR לאצווה ► Settlement.",
          navHe: ["SAP Easy Access ► Logistics ► Production ► Shop Floor Control ► Order ► CO01 – Create Production Order", "Production ► Process ► Process Order ► COR1"],
          tables: ["PLAF", "AFKO", "AFPO", "RESB", "AFRU"],
          tcodes: ["MD01N", "CO01", "CO02", "CO11N", "MIGO", "KO88"],
          fiori: ["F2101", "F2735", "F0247"],
          configHe: ["Order-Type-Dependent Parameters (OPL8/COR4) לאוטומציות שחרור/GR.", "Availability Check (OPJK/ATP) ו-Settlement Profile (CO)."],
          mistakesHe: ["דילוג על בדיקת-זמינות לפני שחרור ➔ עצירה ברצפה בשל חוסר-רכיב.", "אי-ביצוע Settlement ➔ עלויות תלויות באוויר ב-CO-PC."],
          troubleshootHe: ["הזמנה לא ניתנת לשחרור ➔ בדיקת-זמינות נכשלה או סטטוס-שגיאה.", "מלאי-תוצר לא נכנס ➔ GR (101) לא בוצע או GR-אוטומטי לא הופעל."],
          bestPracticeHe: ["הפעל בדיקת-זמינות אוטומטית בשחרור.", "אוטומט GR/Confirmation היכן שזרימת-הייצור יציבה."],
          interviewHe: [
            { qHe: "מהי שרשרת ה-PPC המלאה?", aHe: "Demand → MRP → Planned Order → המרה והזמנת-ייצור → שחרור → Goods Issue → Confirmation → Goods Receipt → Settlement." },
            { qHe: "מה תפקיד ה-Settlement?", aHe: "להעביר את העלויות שנצברו על ההזמנה ליעד (חומר/CO-PC) ולסגור את ההזמנה מבחינה-עלותית." },
          ],
          takeawaysHe: ["PPC = שרשרת אובייקטים מקושרת.", "כל שלב מזין את הבא.", "Settlement סוגר את לולאת-העלות."],
          relatedHe: [{ labelHe: "PP · ביצוע ייצור בדיד (פרק 6)", href: "/library/pp/chapter-06/" }],
        },
        {
          id: "1.1.4", titleHe: "בקרת עלות מוצר (Product Cost Controlling)", titleEn: "Product Cost Controlling",
          execHe: "בקרת-עלות-מוצר (CO-PC) היא הזרוע הפיננסית של הייצור: היא מחשבת עלות-תקן מראש (Standard Cost Estimate), צוברת עלות-בפועל על ההזמנה תוך-כדי ייצור, ומנתחת סטיות (Variances) בסגירה. היא הופכת את הייצור הפיזי למספרים שמנהלים מבינים.",
          beginnerHe: "כל מוצר עולה כסף לייצר — חומרים, מכונות, עבודה. בקרת-עלות-מוצר אומרת לנו כמה מוצר 'אמור' לעלות (תקן), כמה הוא 'באמת' עלה (בפועל), ולמה יש פער (סטייה).",
          consultantHe: "CO-PC נשען על PP: ה-BOM מספק עלות-חומר, ה-Routing/Recipe + Work Center/Resource (Activity Types, KP26) מספקים עלות-המרה. Product Costing (CK11N/CK40N) יוצר Standard Cost; ההזמנה צוברת Actuals (חומר + Confirmation × תעריף); ב-Settlement (KO88/CO88) מחושבות Variances ומועברות ל-FI/CO-PA. תמחיר שגוי ב-PP מתורגם ישירות לסטיות-עלות לא-מוסברות.",
          purposeHe: "לתת רווחיות-מוצר אמינה, לזהות חריגות-עלות בזמן, ולתמוך בתמחור ובהחלטות make-or-buy.",
          processExampleHe: "Standard Cost Estimate (CK11N) קובע עלות-תקן; הפק\"ע צוברת חומר בפועל ופעולות-בפועל; ב-Settlement מתקבלות סטיות-כמות וסטיות-תעריף המנותחות ב-CO-PA.",
          cbcHe: "ב-CBC עלות-המשקה מורכבת מתרכיז+סוכר+אריזה (חומר) ועלות-קו-מילוי (Activity). סטיית-תפוקה בקו (פחת-מילוי גבוה) מופיעה כ-Variance בסגירת-פקודת-התהליך.",
          navHe: ["SAP Easy Access ► Accounting ► Controlling ► Product Cost Controlling ► Product Cost Planning ► CK11N", "Controlling ► Product Cost by Order ► Period-End Closing ► KO88/CO88"],
          tables: ["KEKO", "KEPH", "COEP", "MLCD"],
          tcodes: ["CK11N", "CK40N", "KP26", "KO88", "CO88"],
          fiori: ["F0807", "F3308", "F2901"],
          configHe: ["Costing Variant (Plan/Actual) ו-Valuation Variant.", "Costing Sheet + Cost Component Structure.", "Settlement Profile ו-Variance Key (PP/CO)."],
          mistakesHe: ["Activity Type ללא תעריף (KP26) ➔ עלות-המרה אפס ותמחיר-תקן שגוי.", "Price Control V למוצר-מיוצר במקום S ➔ סטיות לא מנותחות נכון."],
          troubleshootHe: ["Standard Cost לא מתחשב ➔ BOM/Routing לא משוחרר או Costing-Status חסר.", "סטיות-ענק בלתי-מוסברות ➔ תעריפי-Activity או Standard Values שגויים."],
          bestPracticeHe: ["הרץ Cost Estimate מחדש לאחר שינוי BOM/Routing מהותי.", "תאם Activity Types ותעריפים בין PP ל-CO לפני סגירה."],
          interviewHe: [
            { qHe: "כיצד PP מזין את CO-PC?", aHe: "BOM מספק עלות-חומר, ו-Routing/Recipe עם Work Center/Resource (Activity Types) מספקים עלות-המרה; הדיווחים זורמים כ-Actuals." },
            { qHe: "מהי Variance ומתי מחושבת?", aHe: "ההפרש בין עלות-בפועל לעלות-תקן/יעד; מחושבת ב-Settlement (KO88/CO88) ומנותחת ב-CO-PA." },
          ],
          takeawaysHe: ["CO-PC = הזרוע-הפיננסית של הייצור.", "תקן ► בפועל ► סטיות.", "תמחיר ב-PP מתורגם ישירות לעלות."],
          relatedHe: [{ labelHe: "PP · מרכז עבודה ועלות (פרק 3)", href: "/library/pp/chapter-03/#sub-3.3" }],
        },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2", titleHe: "זרימת הייצור התהליכי (Process Manufacturing Flow)", titleEn: "Process Manufacturing Flow",
      execHe:
        "ייצור-תהליכי (PP-PI) מתאר תעשיות שבהן המוצר נוצר מערבוב/תגובה של חומרים לפי מתכון, באצוות או ברציפות — מזון, משקאות, כימיה, תרופות. במקום Routing+Work Center הוא משתמש ב-Master Recipe + Resource, ובמקום פק\"ע — בפקודת-תהליך (Process Order) הכוללת Control Recipes ו-Process Messages לתקשורת עם מערכות-רצפה.",
      beginnerHe:
        "כשמייצרים נוזל או תערובת — כמו משקה או תרופה — אי-אפשר 'להרכיב חלקים'. מערבבים מצרכים לפי מתכון, מחממים, ומקבלים אצווה. PP-PI הוא הגרסה של PP לסוג-ייצור הזה: 'מתכון' במקום 'הוראות-הרכבה', ו'אצווה' במקום 'יחידה'.",
      consultantHe:
        "PP-PI נשען על Master Recipe (PLPOD/PLPO עם Phases ו-Operations), Resource (במקום Work Center, CRHD מסוג Resource), Production Version, וניהול-אצווה (Batch). הביצוע מבוסס Process Order (AFKO/AFPO) שמייצרת Control Recipe הנשלח ל-PI-Sheet או למערכת-בקרה (PCS/MES) דרך Process Messages. ב-S/4HANA נשמרת תאימות ה-PP-PI, עם שיפורי-Fiori לניהול פקודות-תהליך ולמילוי PI-Sheets.",
      purposeHe:
        "לתמוך בתעשיות-תהליך בדרישותיהן הייחודיות: מתכון משתנה-כמות, ניהול-אצווה ועקיבות (Traceability), בקרת-תהליך בזמן-אמת, ועמידה ברגולציית-מזון/תרופות.",
      processExampleHe:
        "Master Recipe מגדיר שלבי-ערבול וזמני-תגובה; פקודת-תהליך מחשבת כמויות לפי כמות-האצווה (Material Quantity Calculation); Control Recipe נשלח לרצפה; המפעיל ממלא PI-Sheet והמערכת קולטת Process Messages עם ערכי-תהליך בפועל.",
      cbcHe:
        "ב-CBC זרימת-המשקה: Master Recipe = הכנת-מים ► עירוב-תרכיז+סוכר ► קרבונציה (CO2) ► מילוי ► אריזה; פקודת-תהליך יוצרת אצווה עם עקיבות מלאה מהתרכיז ועד הבקבוק; Control Recipe מזין את קו-המילוי.",
      navHe: [
        "SAP Easy Access ► Logistics ► Production – Process ► Master Data ► Master Recipes ► C201",
        "Production – Process ► Process Order ► COR1 – Create Process Order",
        "Production Planning for Process Industries ► Process Management ► Control Recipes / Process Messages",
      ],
      tables: ["PLPOD", "AFKO", "AFPO", "MAPL", "RESB"],
      tcodes: ["C201", "C202", "COR1", "COR2", "CO53", "CO60"],
      fiori: ["F3469", "F2735", "F3556"],
      configHe: [
        "Master Recipe Profile + Task List Type 2 (Recipe).",
        "Resource Category + Resource (CRC1) במקום Work Center.",
        "Process Order Type + Order-Type-Dependent Parameters (COR4).",
        "Control Recipe Destination + Process Message Categories.",
      ],
      flow: [
        { he: "Master Recipe", code: "C201", note: "Phases + Operations" },
        { he: "Material Quantity Calc", code: "Recipe", note: "כמויות לפי אצווה" },
        { he: "פקודת-תהליך", code: "COR1", note: "AFKO/AFPO" },
        { he: "Control Recipe", code: "CO53", note: "→ PI-Sheet/MES" },
        { he: "Process Messages", code: "CO54", note: "ערכי-תהליך בפועל" },
        { he: "GR לאצווה + Settlement", code: "MIGO/CO88" },
      ],
      masterDataHe: [
        "Master Recipe (PLPOD) = מתכון עם Phases; Resource = מרכז-העבודה של PP-PI.",
        "Batch (MCH1/MCHA) חובה לעקיבות; Production Version מקשרת Recipe+BOM.",
      ],
      mistakesHe: [
        "שימוש ב-Work Center במקום Resource בסביבת PP-PI.",
        "אי-הפעלת ניהול-אצווה למוצר-תהליכי ➔ אובדן עקיבות.",
        "Control Recipe Destination לא מוגדר ➔ המתכון לא מגיע לרצפה.",
      ],
      troubleshootHe: [
        "Control Recipe לא נוצר ➔ Production Scheduling Profile / Destination חסרים.",
        "Process Messages לא נקלטות ➔ Message Category/Destination שגויים.",
        "כמויות-מתכון שגויות ➔ Material Quantity Calculation לא הוגדר נכון.",
      ],
      bestPracticeHe: [
        "נהל אצוות עם עקיבות מלאה לעמידה ברגולציית-מזון.",
        "השתמש ב-Material Quantity Calculation למתכונים משתני-כמות.",
        "תקנן Process Message Categories לתקשורת אחידה עם ה-MES.",
      ],
      interviewHe: [
        { qHe: "מה מחליף את ה-Routing ואת ה-Work Center ב-PP-PI?", aHe: "Master Recipe מחליף את ה-Routing, ו-Resource מחליף את ה-Work Center." },
        { qHe: "מהו Control Recipe?", aHe: "מסמך-ביצוע הנגזר מפקודת-התהליך ונשלח לרצפה (PI-Sheet/MES) עם הוראות-תהליך וערכי-יעד; חוזר עם Process Messages." },
        { qHe: "מדוע ניהול-אצווה קריטי ב-PP-PI?", aHe: "לעקיבות מלאה (Traceability) — איזה תרכיז/חומר נכנס לאיזו אצווה-מוצר — חיוני ברגולציית-מזון/תרופות ו-recall." },
      ],
      takeawaysHe: [
        "PP-PI = Master Recipe + Resource + Process Order.",
        "Control Recipe ו-Process Messages מחברים לרצפה/MES.",
        "ניהול-אצווה ועקיבות הם לב ה-PP-PI.",
        "זהו אופן-הייצור של CBC למשקאות.",
      ],
      relatedHe: [
        { labelHe: "PP · נתוני-אב בתעשיות-תהליך (פרק 4)", href: "/library/pp/chapter-04/" },
        { labelHe: "PP · ביצוע ייצור-תהליכי (פרק 7)", href: "/library/pp/chapter-07/" },
        { labelHe: "אובייקט · AFKO", href: "/library/pp/object/AFKO/" },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3", titleHe: "זרימת הייצור החוזר (REM Process Flow)", titleEn: "REM Process Flow",
      execHe:
        "ייצור-חוזר (Repetitive Manufacturing, REM) מתאים לייצור-המוני של מוצר אחיד או דומה, ברצף ובקצב-קבוע, על קו-ייצור. במקום פק\"ע פרטנית לכל מנה הוא מתכנן כמויות-תקופה (Run Schedule Quantities) ומשתמש ב-Backflush לדיווח-צריכה אוטומטי — מה שמפחית דרמטית את התקורה הניהולית.",
      beginnerHe:
        "כשמייצרים את אותו מוצר שוב-ושוב בקצב קבוע (כמו פס-ייצור של בקבוקים), פתיחת הזמנה נפרדת לכל מנה היא בזבוז. REM אומר: 'הקו מייצר X ביום' — ובמקום לדווח כל פרט, רק מדווחים כמה יצא, והמערכת 'מנכה' אוטומטית את הרכיבים שנצרכו (Backflush).",
      consultantHe:
        "REM מסומן ב-MARC-SAUFT (REM indicator, תצוגת MRP 4) וב-REM Profile. הוא משתמש ב-Rate Routing (קצב-ייצור), ב-Production Version, וב-Planned Order מסוג-REM (ללא המרה לפק\"ע). הדיווח דרך MFBF (Backflush) — צריכת-רכיבים, פעולות וקבלת-תוצר באירוע אחד. שגיאות-Backflush נשמרות ל-Postprocessing (COGI). ב-S/4HANA נתמך REM עם Fiori מתאים.",
      purposeHe:
        "להפחית תקורה ניהולית בייצור-המוני-יציב: פחות הזמנות, פחות דיווח-פרטני, תכנון מבוסס-קצב ומלאי-WIP נמוך.",
      processExampleHe:
        "Production Version מקשרת BOM+Rate Routing; MRP יוצר Planned Orders ברמת-קצב; הקו מייצר; בסוף-משמרת מבצעים Backflush (MFBF) שמנכה רכיבים, מזכה פעולות ומקבל תוצר — הכל באירוע אחד.",
      cbcHe:
        "ב-CBC אם קו-מילוי ייעודי מייצר טעם-יחיד ברצף-קבוע, ניתן לנהלו כ-REM: תכנון לפי קצב-יומי, ו-Backflush שמנכה תרכיז/בקבוקים/תוויות בסוף-משמרת במקום דיווח פק\"ע פרטני.",
      navHe: [
        "SAP Easy Access ► Logistics ► Production ► Repetitive Manufacturing ► Backflush ► MFBF",
        "Production ► Repetitive Manufacturing ► Planning ► MF50 – Planning Table",
        "Production ► Repetitive Manufacturing ► Control ► Define Repetitive Manufacturing Profiles",
      ],
      tables: ["MARC", "PLAF", "AFRU", "PVBE"],
      tcodes: ["MFBF", "MF50", "MF41", "MF47", "COGI"],
      fiori: ["F3279", "F0247", "F2332"],
      configHe: [
        "REM Profile — מגדיר GR/GI אוטומטיים, Reporting Points, תיקון-שגיאות-Online ו-Movement Types.",
        "MARC-SAUFT (REM indicator) + Production Version חובה.",
        "Reporting Points (Backflush ביניים) אופציונליים למסלולים-ארוכים.",
      ],
      flow: [
        { he: "סימון REM באב-החומר", code: "MARC-SAUFT", note: "MRP 4 view" },
        { he: "Rate Routing + Version", code: "CA21/C223" },
        { he: "Planned Orders לפי קצב", code: "MD01N", note: "PLAF (REM)" },
        { he: "Planning Table", code: "MF50" },
        { he: "Backflush", code: "MFBF", note: "GI+GR+Activity באחד" },
        { he: "תיקון שגיאות", code: "COGI/MF47" },
      ],
      masterDataHe: [
        "MARC-SAUFT = REM indicator · REM Profile · Production Version (Rate Routing+BOM).",
        "Production Supply Area / Storage Location ל-Backflush.",
      ],
      mistakesHe: [
        "שכחת סימון REM (SAUFT) ➔ ההזמנה-המתוכננת לא ניתנת ל-Backflush.",
        "התעלמות מ-COGI ➔ שגיאות-Backflush נצברות והמלאי לא תקין.",
        "שימוש ב-REM למוצר משתנה-תכופות ➔ קושי בתכנון לפי-קצב.",
      ],
      troubleshootHe: [
        "Backflush נכשל ➔ בדוק COGI — לרוב חוסר-מלאי-רכיב או Storage Location שגוי.",
        "אין Planned Orders ל-REM ➔ REM indicator / Production Version חסרים.",
        "פעולות לא מזוכות ➔ Reporting Points / Activity Posting ב-REM Profile.",
      ],
      bestPracticeHe: [
        "השתמש ב-REM רק למוצרים יציבים בקצב-גבוה.",
        "נטר COGI יומית כדי שלא יצטברו שגיאות-Backflush.",
        "הגדר Reporting Points רק במסלולים שבהם נדרשת נראות-ביניים.",
      ],
      interviewHe: [
        { qHe: "מהו Backflush?", aHe: "דיווח-צריכה אוטומטי — צריכת-רכיבים ו/או פעולות מנוכות אוטומטית בעת דיווח-תוצר (MFBF), בלי משיכה ידנית של כל רכיב." },
        { qHe: "כיצד מסמנים חומר ל-REM?", aHe: "באמצעות REM indicator בשדה MARC-SAUFT בתצוגת MRP 4, בצירוף REM Profile ו-Production Version." },
        { qHe: "לאן הולכות שגיאות-Backflush?", aHe: "ל-Postprocessing (COGI) — שם מתקנים חוסר-מלאי או הגדרות-שגויות ומשלימים את התנועה." },
      ],
      takeawaysHe: [
        "REM = ייצור-המוני בקצב ללא פק\"ע פרטנית.",
        "Backflush מנכה רכיבים/פעולות אוטומטית.",
        "מסומן ב-MARC-SAUFT + REM Profile.",
        "COGI הוא רשת-הביטחון לשגיאות.",
      ],
      relatedHe: [
        { labelHe: "PP · קונפיגורציית REM (פרק 5)", href: "/library/pp/chapter-05/" },
        { labelHe: "PP · ביצוע REM (פרק 8)", href: "/library/pp/chapter-08/" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
    },
    // ============================================================ 1.4
    {
      id: "1.4", titleHe: "תכנון עסקי משולב לשרשרת-אספקה (SAP IBP for Supply Chain)", titleEn: "SAP Integrated Business Planning for Supply Chain",
      execHe:
        "SAP IBP הוא פתרון-ה-cloud של SAP לתכנון שרשרת-אספקה מתקדם — תחזית-ביקוש, תכנון-מלאי, S&OP ותכנון-אספקה — המחליף ומרחיב את ה-SOP/APO הישנים. ב-S/4HANA הוא מתממשק ל-PP המובנה: IBP מתכנן ברמה-מצרפית-טקטית, וה-PP/MRP המובנה מבצע ברמה-תפעולית.",
      beginnerHe:
        "IBP הוא 'מגדל-הפיקוד' של התכנון בענן — שם מחליטים את התמונה-הגדולה (כמה למכור, כמה לייצר, איזה מלאי להחזיק) חודשים מראש. אחר-כך התוכנית 'יורדת' ל-S/4HANA, שם MRP ו-PP הופכים אותה לייצור-בפועל.",
      consultantHe:
        "IBP בנוי על HANA Cloud עם תכנון מבוסס-Excel-add-in ו-Web UI, ומודולים: IBP for Demand, IBP for Inventory, IBP for S&OP, IBP for Response & Supply, ו-Demand-Driven Replenishment. האינטגרציה ל-S/4HANA דרך SAP Cloud Integration for Data Services (CI-DS) או RTI — מסנכרנת נתוני-אב ותוצאות-תכנון (PIR). ב-S/4HANA המובנה נותר MRP/MRP Live ו-pMRP לתכנון-קיבולת-סימולטיבי; IBP הוא השכבה האסטרטגית-טקטית מעליו.",
      purposeHe:
        "לתת תכנון שרשרת-אספקה מתקדם, רב-ארגוני וסימולטיבי שחורג מגבולות מפעל-בודד — איזון ביקוש-מול-אספקה, אופטימיזציית-מלאי ותרחישי what-if — בעוד ה-PP המובנה מתמקד בביצוע.",
      processExampleHe:
        "IBP for Demand מייצר תחזית-סטטיסטית; IBP for S&OP מאזן מול קיבולת ומלאי בתרחישים; התוכנית המאושרת מסונכרנת כ-PIR ל-S/4HANA, שם MRP Live מתרגם אותה לדרישות-ייצור-ורכש מפורטות.",
      cbcHe:
        "ב-CBC: IBP מתכנן את עונת-הקיץ ברמה-ארצית — איזה מלאי-ביטחון להחזיק במרכזי-הפצה, כמה לייצר מראש לפני שיא-הביקוש; התוצאה יורדת כ-PIR לכל מפעל-בקבוק, ושם MRP Live מתכנן את קווי-המילוי בפועל.",
      navHe: [
        "SAP IBP Web UI ► Demand Planning / S&OP / Inventory (cloud)",
        "S/4HANA ► Integration ► SAP Cloud Integration for Data Services (CI-DS)",
        "S/4HANA ► Logistics ► Production ► MRP ► MD01N (מקבל את ה-PIR מ-IBP)",
      ],
      tables: ["PBED", "PBIM", "MARC"],
      tcodes: ["MD61", "MD62", "MD01N"],
      fiori: ["F2101", "F1422"],
      configHe: [
        "IBP מוגדר בענן (Planning Areas, Time Profiles, Key Figures) — מחוץ ל-SPRO של S/4HANA.",
        "הגדרת אינטגרציה: CI-DS / RTI לסנכרון נתוני-אב ותוצאות (PIR).",
        "מיפוי Planning Levels של IBP ל-MRP Areas / Plants ב-S/4HANA.",
      ],
      masterDataHe: [
        "נתוני-אב משותפים: חומר, מפעל, מרכז-הפצה — מסונכרנים מ-S/4HANA ל-IBP.",
        "תוצאת-IBP יורדת כ-PIR (PBED/PBIM) ל-S/4HANA לצריכת-MRP.",
      ],
      mistakesHe: [
        "ערבוב תפקידים — ניסיון לבצע תכנון תפעולי-מפורט ב-IBP במקום ב-MRP.",
        "סנכרון-אב חלקי ➔ תוכנית-IBP על נתונים-לא-עדכניים.",
        "התעלמות מ-pMRP המובנה כשהצורך הוא סימולציית-קיבולת קצרת-טווח, לא IBP מלא.",
      ],
      troubleshootHe: [
        "PIR מ-IBP לא מופיע ב-MD04 ➔ אינטגרציית CI-DS/RTI נכשלה או מיפוי-רמות שגוי.",
        "פערים בין IBP ל-S/4 ➔ נתוני-אב לא מסונכרנים (חומר/מפעל).",
        "תחזית לא משתקפת ב-MRP ➔ Strategy/Consumption Mode ב-S/4 לא תואם.",
      ],
      bestPracticeHe: [
        "הפרד בבירור: IBP = אסטרטגי-טקטי; MRP/PP = תפעולי.",
        "תחזק סנכרון-אב אוטומטי ועקבי בין הסביבות.",
        "השתמש ב-pMRP המובנה לסימולציית-קיבולת קצרת-טווח בתוך S/4HANA.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין SAP IBP ל-MRP המובנה?", aHe: "IBP הוא תכנון שרשרת-אספקה אסטרטגי-טקטי בענן (ביקוש, מלאי, S&OP); MRP המובנה ב-S/4HANA הוא תכנון תפעולי-מפורט המבצע את התוכנית." },
        { qHe: "כיצד מחוברים IBP ו-S/4HANA?", aHe: "דרך SAP Cloud Integration for Data Services (CI-DS) או RTI — סנכרון נתוני-אב ותוצאות-תכנון, כשתוצאת-IBP יורדת כ-PIR." },
        { qHe: "מהו pMRP ומה תפקידו לעומת IBP?", aHe: "pMRP הוא תכנון-קיבולת סימולטיבי מובנה ב-S/4HANA לטווח-בינוני; לעומת IBP הוא ממוקד בתוך-S/4 ולא מחליף את התכנון-בענן." },
      ],
      takeawaysHe: [
        "IBP = תכנון שרשרת-אספקה מתקדם בענן.",
        "מחליף את ה-SOP/APO הישנים.",
        "IBP מתכנן, S/4HANA-MRP מבצע.",
        "מחובר דרך CI-DS/RTI ומזין PIR.",
      ],
      relatedHe: [
        { labelHe: "PP · תכנון מכירות-ותפעול (פרק 11)", href: "/library/pp/chapter-11/" },
        { labelHe: "PP · pMRP (פרק 15)", href: "/library/pp/chapter-15/" },
        { labelHe: "PP · DDMRP (פרק 14)", href: "/library/pp/chapter-14/" },
      ],
    },
    // ============================================================ 1.5
    {
      id: "1.5", titleHe: "סיכום: התמונה הגדולה של PP ב-S/4HANA", titleEn: "Summary",
      execHe:
        "פרק-המבוא ממקם את PP במפת-S/4HANA: שלושה אופני-ייצור (Discrete/Process/REM), תכנון מובנה (MRP Live, pMRP) המוזן מתכנון-בענן (IBP), ניתוח בזמן-אמת (Embedded Analytics על CDS) וממשק-עבודה מודרני (Fiori Launchpad). הפישוטים של S/4HANA — MRP בזיכרון, ביטול טבלאות-Aggregate ומודל-נתונים אחיד — הם החוט המקשר.",
      beginnerHe:
        "הפרק הראה את התמונה-הגדולה: מה זה PP, אילו סוגי-ייצור קיימים, איך הם מתחברים לתכנון-בענן ולבקרת-עלות, ומה השתנה ב-S/4HANA לעומת המערכת הישנה. הפרקים הבאים יצללו לכל רכיב — נתוני-אב, קונפיגורציה, MRP וביצוע.",
      consultantHe:
        "מבחינת ארכיטקטורה: ה-PP ב-S/4HANA נשען על Universal Journal ו-CDS Views, MRP Live (MD01N) רץ על HANA ללא העתקת-נתונים, טבלאות-Aggregate (כמו MDVM ותכנון-מקדים) בוטלו, וה-Fiori Launchpad עם KPI מבוסס-CDS החליף את דוחות-ה-GUI. אופן-הייצור (Discrete/PP-PI/REM) נבחר לפי המוצר; IBP הוא השכבה-בענן; pMRP מאפשר סימולציית-קיבולת מובנית. הבנת המפה הזו היא תנאי לכל מימוש מוצלח.",
      purposeHe:
        "לתת ללומד מסגרת-התמצאות: היכן כל נושא יושב, כיצד הרכיבים מתחברים, ומדוע S/4HANA שונה — כדי לגשת לפרקים-המתקדמים עם תמונה-שלמה.",
      processExampleHe:
        "ביקוש (IBP/PIR) ► MRP Live ► Planned Order ► המרה לאופן-הייצור המתאים ► ביצוע-ודיווח ► GR ► Settlement ► ניתוח בזמן-אמת ב-Fiori. כל פרק בספר מעמיק חוליה אחת בשרשרת הזו.",
      cbcHe:
        "ב-CBC המסע השלם: IBP מתכנן עונה ► PIR יורד למפעל ► MRP Live מתרגם לדרישות ► פקודת-תהליך (PP-PI) ► מילוי ודיווח ► GR לאצווה ► Settlement ► מנהל-הייצור רואה תפוקה וסטיות בזמן-אמת ב-Fiori Launchpad.",
      navHe: [
        "SAP Fiori Launchpad ► Manufacturing (תפקידי PP) — נקודת-המוצא היומיומית",
        "SAP Easy Access ► Logistics ► Production (תאימות-GUI במידת-הצורך)",
        "SAP Help ► S/4HANA Simplification List for Production Planning",
      ],
      tables: ["MARC", "AFKO", "PLAF", "PBED"],
      tcodes: ["MD01N", "MD04", "CO01", "COR1", "MFBF"],
      fiori: ["F1422", "F2101", "F2735", "F0247"],
      configHe: [
        "סקור את ה-Simplification List לפני מימוש — מה בוטל/השתנה ב-PP.",
        "הפעל Fiori Launchpad ותפקידי-PP (Production Planner / Supervisor).",
        "החלט אופן-ייצור לכל קבוצת-מוצרים כשלב-תכנון ראשון.",
      ],
      masterDataHe: [
        "אב-החומר, BOM, Routing/Recipe ו-Production Version הם הבסיס המשותף לכל האופנים.",
        "מודל-הנתונים אוחד ב-S/4HANA סביב Universal Journal ו-CDS Views.",
      ],
      mistakesHe: [
        "כניסה למימוש בלי להחליט תחילה אופן-ייצור לכל מוצר.",
        "התעלמות מ-Simplification List ➔ הסתמכות על פונקציות-ECC שבוטלו.",
        "המשך-עבודה בדוחות-GUI במקום אימוץ Fiori/Embedded Analytics.",
      ],
      troubleshootHe: [
        "פונקציית-ECC לא נמצאת ➔ בדוק Simplification List — ייתכן שהוחלפה/בוטלה.",
        "ביצועי-MRP איטיים ➔ ודא שימוש ב-MRP Live (MD01N) ולא ב-MRP קלאסי.",
        "אין נראות בזמן-אמת ➔ Embedded Analytics / CDS לא הופעלו.",
      ],
      bestPracticeHe: [
        "התחל כל פרויקט במיפוי אופני-הייצור ובסקירת ה-Simplification List.",
        "אמץ MRP Live, Fiori ו-Embedded Analytics כברירת-מחדל.",
        "ראה את PP כחלק משרשרת אחת: IBP ► MRP ► ביצוע ► CO.",
      ],
      interviewHe: [
        { qHe: "מהם עיקרי-הפישוט של PP ב-S/4HANA?", aHe: "MRP Live בזיכרון, ביטול טבלאות-Aggregate, מודל-נתונים אחיד (Universal Journal/CDS), Embedded Analytics ו-Fiori Launchpad." },
        { qHe: "כיצד מתחברים IBP, MRP ואופני-הייצור?", aHe: "IBP מתכנן בענן ומזין PIR; MRP Live מתרגם לדרישות; אופן-הייצור (Discrete/Process/REM) מבצע ברצפה; CO מקבל עלויות." },
        { qHe: "מהי ה-Simplification List ומדוע חשובה?", aHe: "רשימת-השינויים הרשמית של SAP בין ECC ל-S/4HANA; מזהירה אילו פונקציות בוטלו/השתנו — חובה לקרוא לפני מימוש." },
      ],
      takeawaysHe: [
        "PP ב-S/4HANA = שלושה אופני-ייצור על תשתית מובנית-בזיכרון.",
        "IBP (ענן) ► MRP Live ► ביצוע ► CO היא שרשרת אחת.",
        "Embedded Analytics + Fiori הם ממשק-העבודה המודרני.",
        "סקירת Simplification List היא נקודת-הפתיחה לכל מימוש.",
      ],
      relatedHe: [
        { labelHe: "PP · הגדרת ייצור בדיד (פרק 3)", href: "/library/pp/chapter-03/" },
        { labelHe: "PP · MRP ותכנון דרישות (פרק 13)", href: "/library/pp/chapter-13/" },
        { labelHe: "PP · MRP Live ו-DDMRP (פרק 14)", href: "/library/pp/chapter-14/" },
      ],
    },
  ],
};
