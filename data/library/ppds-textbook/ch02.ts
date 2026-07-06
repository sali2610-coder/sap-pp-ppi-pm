// ===== PP/DS Digital Textbook — Chapter 2 (Master Data) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly, enough to study embedded PP/DS master data
// without the original book. SAP identifiers verbatim EN; הארגון = Example Product
// bottling (fill-line resources, flavor-changeover setup matrix, PDS from
// routing/recipe). Hierarchy + ids preserved exactly from the source TOC.
import type { TextbookChapter } from "./types";

export const CH2: TextbookChapter = {
  n: 2,
  titleHe: "נתוני אב",
  titleEn: "Master Data",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לנתוני-האב של PP/DS המוטמע ב-S/4HANA. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-זרימה, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. ב-Embedded PP/DS נתוני-האב מסונכרנים מ-S/4HANA לאזור-התכנון (liveCache) — מודל-אינטגרציה (CFM1/CFM2), Location, Product (/SAPAPO/MAT1), Resource (/SAPAPO/RES01), ו-PDS שנוצר מ-Routing/Recipe (CURTO_CREATE). המטרה: לשלוט בנתוני-האב של PP/DS ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 2.1
    {
      id: "2.1", titleHe: "מודלי אינטגרציה", titleEn: "Integration Models",
      execHe:
        "מודל-האינטגרציה (Integration Model) הוא המנגנון הקלאסי המעביר נתוני-אב ונתוני-תנועה מ-ERP אל מנוע-ה-PP/DS. הוא מגדיר אילו אובייקטים (חומרים, מרכזי-עבודה, BOM, Routings, מלאי, הזמנות) ייכנסו לתחום-התכנון, ומחבר את עולם ה-ERP לעולם ה-liveCache. ב-Embedded PP/DS חלק מהאובייקטים מסונכרנים אוטומטית, אך מודל-האינטגרציה נותר הדרך לשלוט מפורשות מה נכלל בתכנון-המתקדם.",
      beginnerHe:
        "דמיין \"רשימת-הזמנות\" שאומרת למערכת אילו נתונים להעתיק לעולם-התכנון. מודל-אינטגרציה הוא בדיוק זה: מסננים לפי מפעל וסוג-אובייקט (חומרים/מרכזי-עבודה/מלאי), שומרים את הרשימה (CFM1), ואז \"מפעילים\" אותה (CFM2) כדי שהנתונים יזרמו לתכנון. הפעלה חוזרת מסנכרנת שינויים.",
      consultantHe:
        "מודל-האינטגרציה נוצר ב-CFM1 (Create) ומופעל ב-CFM2 (Activate). הוא מורכב מ-Filter Objects (Material, Plant, Material Type) ו-Object Types (Materials, Plants/Work Centers, BOM, Routings, PIRs, Stocks, Sales Orders…). ההפעלה היא דלתא: גרסה-חדשה גוברת על קודמת. ניטור דרך CCR (/SAPAPO/CCR — Core Interface Compare/Reconcile) ו-SMQ1/SMQ2 (qRFC queues). ב-Embedded PP/DS אין CIF-RFC חיצוני קלאסי בין מערכות נפרדות — הסנכרון פנימי — אך מנגנון מודל-האינטגרציה והניטור (CFM1/CFM2/CCR) זהים בלוגיקה ובשמות.",
      purposeHe:
        "לשלוט בדיוק אילו אובייקטים נכנסים לתכנון-המתקדם, להימנע מהעמסת-יתר של ה-liveCache בנתונים לא-רלוונטיים, ולספק נקודת-בקרה אחת לסנכרון נתוני-אב ותנועה.",
      processExampleHe:
        "מטמיעים PP/DS למפעל חדש: ב-CFM1 בונים מודל בשם ZPPDS_MAT עם Filter = Plant 1010 + Material Type FERT/HALB ו-Object Type = Materials; מפעילים ב-CFM2; החומרים מופיעים כעת ב-/SAPAPO/MAT1. מודל נוסף ZPPDS_RES מעביר את מרכזי-העבודה כ-Resources, ומודל ZPPDS_PDS מעביר Routings כ-PDS.",
      scenarioHe:
        "בארגון בונים מודלי-אינטגרציה נפרדים לכל סוג-אובייקט: ZMFG_MAT (משקאות מוגמרים FERT + תערובות HALB), ZMFG_RES (קווי-המילוי כ-Resources), ZMFG_PDS (מתכוני-המילוי כ-PDS). הפרדה זו מאפשרת להפעיל-מחדש רק את מה שהשתנה — למשל קו-מילוי חדש בלי לגעת בחומרים.",
      navHe: [
        "SAP Easy Access ► Logistics ► Central Functions ► Supply Chain Planning Interface ► Core Interface Advanced Planner and Optimizer ► Integration Model ► Create (CFM1)",
        "SPRO ► Integration with Other SAP Components ► Advanced Planning and Optimization ► Basic Settings for the Data Transfer ► Change Transfer for Master Data",
        "SAP Easy Access ► ... ► Integration Model ► Activate (CFM2)",
      ],
      tables: ["CIF_IMOD", "/SAPAPO/MATKEY", "MARC"],
      tcodes: ["CFM1", "CFM2", "CFM3", "CFM7", "/SAPAPO/CCR"],
      fiori: ["F2336"],
      configHe: [
        "Filter Objects: Material, Plant, Material Type, MRP Type — מסננים את היקף האובייקטים.",
        "Object Types: Materials, Plants/MRP Areas, Work Centers/Resources, BOM, Routings/PDS, Stocks, Planned/Production Orders, PIRs, Sales Orders.",
        "Change Transfer: Online (מיידי) או Periodic (אצווה) דרך הגדרות SPRO.",
        "Naming convention עקבי למודלים (ZMFG_<OBJ>) לזיהוי וניטור.",
      ],
      flow: [
        { he: "בחירת Filter + Object Type", code: "CFM1", note: "Plant/Material Type" },
        { he: "שמירת מודל-אינטגרציה", code: "CIF_IMOD" },
        { he: "הפעלה (דלתא)", code: "CFM2", note: "גרסה חדשה גוברת" },
        { he: "אובייקטים בתחום-התכנון", code: "/SAPAPO/MAT1" },
        { he: "השוואה/תיקון", code: "/SAPAPO/CCR", note: "CCR" },
      ],
      masterDataHe: [
        "CIF_IMOD = רשומת מודל-האינטגרציה ותכולתה.",
        "Filter פר Plant/Material Type קובע אילו רשומות-MARC נכנסות לתכנון.",
      ],
      mistakesHe: [
        "יצירת מודל-אחד-ענק לכל האובייקטים — קשה לתחזק ולהפעיל-מחדש נקודתית.",
        "שכחת ההפעלה (CFM2) אחרי CFM1 — המודל קיים אך הנתונים לא זרמו.",
        "Filter רחב מדי — העמסת ה-liveCache בחומרים שאינם מתוכננים ב-PP/DS.",
      ],
      troubleshootHe: [
        "אובייקט לא מופיע בתכנון ➔ בדוק שה-Filter כולל אותו ושהמודל הופעל (CFM2).",
        "אי-התאמה בין ERP לתכנון ➔ הרץ CCR (/SAPAPO/CCR) להשוואה ולתיקון.",
        "תור-סנכרון תקוע ➔ בדוק SMQ1/SMQ2 (qRFC) ושחרר חסימות.",
      ],
      bestPracticeHe: [
        "מודל נפרד לכל סוג-אובייקט (Materials/Resources/PDS) לבקרה עדינה.",
        "Naming convention אחיד והרצת CCR שגרתית לאימות-עקביות.",
        "העדף Change Transfer מקוון לנתוני-אב יציבים; אצווה לנפחים גדולים.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין CFM1 ל-CFM2?", aHe: "CFM1 = יצירת מודל-האינטגרציה (בחירת Filter ו-Object Types ושמירתו); CFM2 = הפעלתו, כלומר העברת הנתונים בפועל לתחום-התכנון. בלי CFM2 שום דבר לא זורם." },
        { qHe: "כיצד מנטרים אי-התאמות בין ERP ל-PP/DS?", aHe: "באמצעות /SAPAPO/CCR (CIF Compare/Reconcile) להשוואה ותיקון, ו-SMQ1/SMQ2 לניטור תורי-qRFC." },
        { qHe: "כיצד מתבצעת הפעלה-מחדש של מודל?", aHe: "הפעלה היא דלתא — הגרסה החדשה גוברת על הקודמת; מפעילים-מחדש ב-CFM2 כדי לסנכרן שינויי-נתוני-אב." },
      ],
      takeawaysHe: [
        "מודל-אינטגרציה = מה נכנס לתכנון-המתקדם.",
        "CFM1 יוצר, CFM2 מפעיל (דלתא).",
        "נטר עם CCR ו-SMQ1/SMQ2; הפרד מודלים לפי סוג-אובייקט.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אב מוצר (2.3)", href: "/library/ppds/chapter-02/#sub-2.3" },
        { labelHe: "PP/DS · מבני-נתוני-ייצור (2.5.1)", href: "/library/ppds/chapter-02/#sub-2.5.1" },
      ],
      children: [
        {
          id: "2.1.1", titleHe: "יצירת מודל האינטגרציה", titleEn: "Create the Integration Model",
          execHe: "שלב-היצירה (CFM1) מגדיר את תוכן המודל: שם-מודל, אפליקציה, Filter Objects ו-Object Types. בשלב זה רק מתארים מה ייכלל — הנתונים עדיין לא זורמים.",
          beginnerHe: "כאן \"כותבים את רשימת-הקניות\": איזה מפעל, אילו חומרים, ואיזה סוג-אובייקט. שומרים את הרשימה תחת שם — אבל עדיין לא \"קונים\" (לא מפעילים).",
          consultantHe: "ב-CFM1 מזינים Model Name + Logical System + Application, ומסמנים Object Types. ה-Filter (Material/Plant/Material Type/MRP Type) מצמצם את ההיקף. שמירה יוצרת גרסת-מודל ב-CIF_IMOD; ניתן ליצור Variants ב-CFM7 לתזמון-אצווה.",
          purposeHe: "להגדיר במדויק ובאופן-מתועד אילו אובייקטים מועמדים לסנכרון, לפני ההפעלה בפועל.",
          processExampleHe: "ב-CFM1 יוצרים ZMFG_MAT, אפליקציה MATERIAL, Filter Plant=1010 + Material Type=FERT, Object Type=Materials, ושומרים. נוצרת גרסה ראשונה הממתינה להפעלה.",
          scenarioHe: "בארגון יוצרים ZMFG_MAT לכל המשקאות-המוגמרים במפעל-המילוי; Filter לפי Material Type=FERT מבטיח שרק מוצרים-סופיים ייכנסו לתכנון-PP/DS.",
          navHe: ["Logistics ► Central Functions ► Supply Chain Planning Interface ► Core Interface APO ► Integration Model ► Create (CFM1)"],
          tables: ["CIF_IMOD"],
          tcodes: ["CFM1", "CFM7"],
          fiori: ["F2336"],
          configHe: ["הזן Model Name + Application; סמן Object Types; הגדר Filter (Material/Plant/Material Type) ושמור גרסה."],
          mistakesHe: ["Filter רחב מדי הכולל ROH שאינם מתוכננים.", "שם-מודל לא-עקבי המקשה על איתור והפעלה-מחדש."],
          troubleshootHe: ["המודל לא נשמר ➔ Filter ריק או Object Type לא-נבחר.", "אובייקט לא נכלל ➔ ה-Filter אינו מכסה אותו."],
          bestPracticeHe: ["שם-מודל עקבי לכל סוג-אובייקט.", "צמצם Filter למינימום-הנדרש לתכנון."],
          interviewHe: [{ qHe: "מה נעשה ב-CFM1?", aHe: "מגדירים את תוכן מודל-האינטגרציה — Filter ו-Object Types — ושומרים גרסה; הנתונים עדיין לא זורמים עד ההפעלה." }],
          takeawaysHe: ["CFM1 = הגדרת-תוכן בלבד.", "Filter + Object Types קובעים היקף.", "שמירה יוצרת גרסה ב-CIF_IMOD."],
        },
        {
          id: "2.1.2", titleHe: "הפעלת מודל האינטגרציה", titleEn: "Activate the Integration Model",
          execHe: "ההפעלה (CFM2) היא הצעד שמעביר בפועל את הנתונים לתחום-התכנון. היא פועלת כדלתא: הגרסה החדשה גוברת על הקודמת, וכך מסונכרנים שינויי נתוני-אב.",
          beginnerHe: "אחרי שכתבנו את הרשימה (CFM1), כאן \"מבצעים את ההזמנה\": הנתונים נשלחים לעולם-התכנון. מפעילים-מחדש כשמשהו השתנה.",
          consultantHe: "ב-CFM2 בוחרים את המודל ומפעילים; המערכת משווה לגרסה-הפעילה הקודמת ומעבירה רק את ההפרש. שגיאות-הפעלה נצפות ב-SLG1 (Application Log) ובתורי SMQ1/SMQ2. אי-עקביות נפתרת ב-CCR.",
          purposeHe: "להזרים את האובייקטים שהוגדרו אל ה-liveCache ולסנכרן עדכונים באופן-מבוקר.",
          processExampleHe: "אחרי הוספת FERT חדש, מפעילים-מחדש את ZMFG_MAT ב-CFM2; רק החומר-החדש מועבר (דלתא), והוא מופיע מיד ב-/SAPAPO/MAT1.",
          scenarioHe: "בארגון מפעילים-מחדש את ZMFG_RES בכל פעם שמתווסף קו-מילוי, כך שה-Resource החדש זמין לתכנון בלי לגעת בחומרים.",
          navHe: ["Logistics ► Central Functions ► ... ► Integration Model ► Activate (CFM2)"],
          tables: ["CIF_IMOD"],
          tcodes: ["CFM2", "/SAPAPO/CCR", "SMQ1"],
          fiori: ["F2336"],
          configHe: ["ב-CFM2 בחר Model + Application + Logical System, סמן את הגרסה-להפעלה, והפעל; ההעברה היא דלתא."],
          mistakesHe: ["הפעלת מודל ישן ובכך \"ביטול\" אובייקטים מהגרסה-החדשה.", "התעלמות משגיאות-הפעלה ב-SLG1."],
          troubleshootHe: ["נתון לא הועבר ➔ בדוק שהגרסה-הנכונה הופעלה ושאין שגיאה ב-SLG1.", "אובייקט נעלם מהתכנון ➔ הופעלה גרסה ישנה ללא אותו אובייקט."],
          bestPracticeHe: ["הפעל תמיד את הגרסה-העדכנית.", "בדוק SLG1/SMQ1 אחרי הפעלה והרץ CCR לאימות."],
          interviewHe: [{ qHe: "מדוע הפעלה היא \"דלתא\"?", aHe: "CFM2 משווה לגרסה-הפעילה הקודמת ומעביר רק את ההפרש; הגרסה-החדשה גוברת, ולכן הפעלת גרסה-ישנה עלולה לבטל אובייקטים." }],
          takeawaysHe: ["CFM2 מעביר נתונים בפועל.", "הפעלה = דלתא, גרסה-חדשה גוברת.", "נטר SLG1/SMQ1 ו-CCR."],
        },
      ],
    },
    // ============================================================ 2.2
    {
      id: "2.2", titleHe: "מיקומים (Locations)", titleEn: "Locations",
      execHe:
        "Location הוא היחידה הגאוגרפית/לוגית של תחום-התכנון — מפעל, מחסן, ספק או לקוח. כל אובייקט-תכנון (Product, Resource, מלאי, הזמנה) משויך ל-Location. ב-Embedded PP/DS המפעלים (Plants) מסונכרנים אוטומטית כ-Locations מסוג 1001, ומהווים את \"הבמה\" שעליה מתרחש כל התכנון.",
      beginnerHe:
        "Location הוא \"איפה\". כל דבר בתכנון חייב לשבת איפשהו — מפעל-ייצור, מחסן או ספק. ב-PP/DS המוטמע, המפעל שלך מ-S/4HANA הופך אוטומטית ל-Location, ועליו \"נתלים\" החומרים והמשאבים.",
      consultantHe:
        "Locations מנוהלים ב-/SAPAPO/LOC3. סוגי-Location: 1001 (Plant/Production), 1002 (MRP Area/Distribution Center), 1010 (Customer), 1011 (Vendor). ב-Embedded PP/DS מיפוי Plant→Location הוא 1:1 ואוטומטי דרך הסנכרון; אין צורך ליצור Location ידנית עבור מפעל קיים. נתוני-Location כוללים Calendar (ל-time streams של משאבים), קואורדינטות-גאוגרפיות (לתחבורה) ושיוך ל-Location Master.",
      purposeHe:
        "לספק את ההקשר-המרחבי לכל התכנון: כל מוצר, משאב, מלאי והזמנה משויכים ל-Location, וכך ה-PP/DS יודע היכן הביקוש, היכן הקיבולת, והיכן המלאי.",
      processExampleHe:
        "כשמסנכרנים Plant 1010 דרך מודל-אינטגרציה, נוצר אוטומטית Location 1010 מסוג 1001. כל FERT המסונכרן הופך ל-Location Product (השילוב Product×Location), וכל קו-מילוי הופך ל-Resource באותו Location.",
      scenarioHe:
        "בארגון כל אתר-בקבוק (מפעל-מילוי) הוא Location מסוג 1001; מרכזי-ההפצה האזוריים הם Locations מסוג 1002. תכנון-המילוי מתבצע ב-Location של מפעל-המילוי, והביקוש מגיע מ-Locations של מרכזי-ההפצה.",
      navHe: [
        "SAP Easy Access ► Advanced Planning and Optimization ► Master Data ► Location ► Location (/SAPAPO/LOC3)",
        "SPRO ► Advanced Planning ► Master Data ► Location ► Define Location Types",
      ],
      tables: ["/SAPAPO/LOC", "/SAPAPO/LOCMAP", "T001W"],
      tcodes: ["/SAPAPO/LOC3", "/SAPAPO/CCR"],
      fiori: ["F2336"],
      configHe: [
        "Location Type: 1001 Plant/Production · 1002 DC/MRP Area · 1010 Customer · 1011 Vendor.",
        "מיפוי Plant↔Location (/SAPAPO/LOCMAP) — 1:1 ואוטומטי ב-Embedded.",
        "Calendar ל-Location — בסיס ל-time streams של המשאבים.",
        "קואורדינטות-גאוגרפיות לתכנון-תחבורה (אם רלוונטי).",
      ],
      flow: [
        { he: "סנכרון מפעל", code: "CFM2", note: "Plant" },
        { he: "יצירת Location 1001", code: "/SAPAPO/LOC3" },
        { he: "שיוך לוח-שנה", code: "Calendar" },
        { he: "בסיס ל-Product×Location", code: "/SAPAPO/MAT1" },
      ],
      masterDataHe: [
        "/SAPAPO/LOC = רשומת ה-Location · /SAPAPO/LOCMAP = מיפוי Plant↔Location.",
        "T001W (Plant ב-ERP) הוא מקור ה-Location מסוג 1001.",
      ],
      mistakesHe: [
        "ניסיון ליצור Location ידנית למפעל שכבר מסונכרן — כפילות ובלבול.",
        "לוח-שנה שגוי ב-Location — משבש time streams של כל המשאבים בו.",
      ],
      troubleshootHe: [
        "Location לא נוצר ➔ המפעל לא נכלל במודל-האינטגרציה או שלא הופעל.",
        "תכנון-זמינות שגוי ➔ לוח-השנה של ה-Location שגוי או חסר.",
      ],
      bestPracticeHe: [
        "הסתמך על המיפוי האוטומטי Plant→Location; אל תיצור ידנית.",
        "ודא לוח-שנה תקין ב-Location לפני הגדרת משאבים.",
      ],
      interviewHe: [
        { qHe: "מהו Location ב-PP/DS ומהם הסוגים הנפוצים?", aHe: "היחידה המרחבית של התכנון; 1001 מפעל-ייצור, 1002 מרכז-הפצה/MRP Area, 1010 לקוח, 1011 ספק." },
        { qHe: "כיצד נוצר Location ב-Embedded PP/DS?", aHe: "המפעל (Plant) מ-S/4HANA מסונכרן אוטומטית ל-Location מסוג 1001 במיפוי 1:1 — אין צורך ליצור ידנית." },
      ],
      takeawaysHe: [
        "Location = \"איפה\" של התכנון.",
        "Plant→Location 1001 אוטומטי ב-Embedded.",
        "לוח-השנה של ה-Location מזין את time streams של המשאבים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אב מוצר (2.3)", href: "/library/ppds/chapter-02/#sub-2.3" },
        { labelHe: "PP/DS · מרכזי-עבודה ומשאבים (2.4)", href: "/library/ppds/chapter-02/#sub-2.4" },
      ],
    },
    // ============================================================ 2.3
    {
      id: "2.3", titleHe: "אב מוצר (Product Master)", titleEn: "Product Master",
      execHe:
        "אב-המוצר של PP/DS (/SAPAPO/MAT1) הוא ההרחבה-המתוכננת של אב-החומר: שילוב Product×Location הנושא פרמטרי תכנון-מתקדם — Planning Procedure, PP/DS horizon, GR/GI times, lot-size, ו-procurement type. ב-Embedded PP/DS הוא משולב פיזית באב-החומר של S/4HANA דרך תצוגת/לשונית Advanced Planning, כך שאין כפילות-נתונים.",
      beginnerHe:
        "זהו \"כרטיס-המוצר\" של עולם-התכנון. הוא לוקח את החומר מ-S/4HANA ומוסיף לו שדות שה-PP/DS צריך: כמה זמן קליטה/הוצאה, אופק-תכנון, גודל-אצווה. ב-PP/DS המוטמע השדות יושבים ישירות בתוך אב-החומר תחת Advanced Planning.",
      consultantHe:
        "Product נשמר ב-/SAPAPO/MATKEY (Product) ו-/SAPAPO/MATLOC (Product×Location, כולל שדות PP/DS). הפרמטר הקריטי הוא Planning Procedure (קובע אילו אירועים מפעילים תכנון-מחדש), לצד PP/DS Horizon, GR/GI processing time, Planning Time Fence, ו-Procurement Type. ב-Embedded PP/DS תחזוקת השדות נעשית ב-MM01/MM02 בלשונית Advanced Planning ובאפליקציות-Fiori; אין /SAPAPO/MAT1 נפרד כמערכת-חיצונית, אך ה-T-Code עדיין זמין כתצוגה.",
      purposeHe:
        "לתת ל-PP/DS את כל הפרמטרים לתכנן מוצר ברמת-Location: מתי לתכנן-מחדש, כמה לתכנן (lot-size), ומאיזה מקור (in-house/external), ולהבחין בין מוצרים מתוכננים-מתקדם למתוכננים-קלאסי.",
      processExampleHe:
        "מסמנים FERT לתכנון-מתקדם (Advanced Planning=X); ה-PP/DS Horizon נקבע ל-30 יום; Planning Procedure מסוג in-house production מבטיח שכל שינוי-ביקוש בתוך-האופק מפעיל תכנון-מחדש מיידי ב-liveCache ויוצר Planned Order עם תזמון-מדויק לשנייה.",
      scenarioHe:
        "בארגון כל משקה-מוגמר (FERT) מסומן Advanced Planning עם PP/DS Horizon התואם את אופק-המילוי השבועי; תערובות-הבסיס (HALB) מתוכננות-מתקדם רק אם הן צוואר-בקבוק; חומרי-הגלם (ROH) נשארים בתכנון-קלאסי.",
      navHe: [
        "SAP Easy Access ► Advanced Planning ► Master Data ► Product ► Product (/SAPAPO/MAT1)",
        "Logistics ► Material Master ► Material ► Create/Change (MM01/MM02) ► Advanced Planning view",
        "SPRO ► Production ► Advanced Planning ► Global Settings ► Maintain Global Parameters and Defaults",
      ],
      tables: ["/SAPAPO/MATKEY", "/SAPAPO/MATLOC", "MARC"],
      tcodes: ["/SAPAPO/MAT1", "MM01", "MM02", "MM03"],
      fiori: ["F1602A", "F0247"],
      configHe: [
        "Planning Procedure: קובע אילו אירועים (ביקוש/מלאי/מקור) מפעילים Planning Run אוטומטי.",
        "PP/DS Horizon: חלון-הזמן שבו PP/DS מתכנן (מעבר לו — MRP/heuristics קלאסי).",
        "GR/GI Processing Time + Planning Time Fence + Lot-Size (Min/Max/Fixed).",
        "Advanced Planning indicator באב-החומר (MARC) = שער-הכניסה ל-PP/DS.",
      ],
      flow: [
        { he: "סנכרון חומר", code: "CFM2" },
        { he: "סימון Advanced Planning", code: "MM02", note: "MARC" },
        { he: "Planning Procedure + Horizon", code: "/SAPAPO/MAT1" },
        { he: "Product×Location פעיל", code: "/SAPAPO/MATLOC" },
        { he: "מתוכנן ב-liveCache", code: "/SAPAPO/RRP3" },
      ],
      masterDataHe: [
        "/SAPAPO/MATKEY = Product · /SAPAPO/MATLOC = Product×Location עם שדות PP/DS.",
        "MARC נושא את indicator ה-Advanced Planning ב-Embedded.",
      ],
      mistakesHe: [
        "סימון Advanced Planning בלי הגדרת Planning Procedure תואם — תכנון לא מופעל כצפוי.",
        "PP/DS Horizon ארוך-מדי — מעמיס תכנון-מפורט מיותר על ה-liveCache.",
        "סימון ROH לתכנון-מתקדם ללא צורך — ניפוח תחום-התכנון.",
      ],
      troubleshootHe: [
        "המוצר לא נכלל בתכנון-מתקדם ➔ indicator ה-Advanced Planning כבוי או Horizon=0.",
        "תכנון-מחדש לא מופעל אוטומטית ➔ Planning Procedure שגוי לסוג-המוצר.",
        "Product×Location לא קיים ➔ החומר לא הורחב ל-Location או לא סונכרן.",
      ],
      bestPracticeHe: [
        "סמן לתכנון-מתקדם רק מוצרים שבאמת זקוקים לו (צווארי-בקבוק/מוגמרים).",
        "התאם PP/DS Horizon לאופק-התכנון העסקי האמיתי.",
        "בחר Planning Procedure סטנדרטי תואם לאופי-המוצר.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין אב-החומר הקלאסי לאב-המוצר של PP/DS?", aHe: "אב-המוצר (/SAPAPO/MAT1) מוסיף פרמטרי תכנון-מתקדם ברמת Product×Location — Planning Procedure, PP/DS Horizon, GR/GI times; ב-Embedded הם משולבים בתוך אב-החומר תחת Advanced Planning." },
        { qHe: "מהו Planning Procedure?", aHe: "הפרמטר שקובע אילו אירועי-תכנון (ביקוש/מלאי/שינוי-מקור) מפעילים תכנון-מחדש אוטומטי של המוצר ב-PP/DS." },
        { qHe: "מהו PP/DS Horizon?", aHe: "חלון-הזמן שבתוכו PP/DS מתכנן באופן-מפורט; מעבר לו התכנון נעשה קלאסי (MRP/heuristics)." },
      ],
      takeawaysHe: [
        "אב-המוצר = אב-החומר + פרמטרי תכנון-מתקדם.",
        "Embedded משלב את השדות בתוך אב-החומר (Advanced Planning).",
        "Planning Procedure ו-PP/DS Horizon הם הפרמטרים הקריטיים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מיקומים (2.2)", href: "/library/ppds/chapter-02/#sub-2.2" },
        { labelHe: "PP/DS · מקורות-אספקה (2.5)", href: "/library/ppds/chapter-02/#sub-2.5" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
      children: [
        {
          id: "2.3.1", titleHe: "הפעלת תכנון מתקדם לחומרים", titleEn: "Activation of Advanced Planning for Materials",
          execHe: "הפעלת תכנון-מתקדם (Advanced Planning indicator) היא הצעד שמסמן חומר כמתוכנן ב-PP/DS. ב-Embedded זהו סימון באב-החומר (MARC) הקובע שהמוצר ינוהל ב-liveCache עם תזמון-מדויק ובדיקת-קיבולת סדורה.",
          beginnerHe: "כדי שמוצר ייכנס לעולם ה-PP/DS, צריך \"להדליק\" לו מתג. המתג הזה הוא Advanced Planning באב-החומר — בלעדיו המוצר נשאר בתכנון-MRP הקלאסי בלבד.",
          consultantHe: "ב-S/4HANA הסימון נעשה בלשונית Advanced Planning של אב-החומר (שדה ב-MARC) או דרך מיפוי-המוני (Mass Activation / report). ההפעלה יוצרת/מעדכנת את רשומת ה-Product×Location ב-/SAPAPO/MATLOC. ניתן להפעיל גם דרך הגדרת ברירת-מחדל פר Material Type/Plant ב-SPRO.",
          purposeHe: "להגדיר מפורשות אילו חומרים מנוהלים בתכנון-המתקדם, ולמנוע ניפוח של ה-liveCache בחומרים שאינם זקוקים לו.",
          processExampleHe: "מסמנים FERT בלשונית Advanced Planning, שומרים, והמוצר מופיע מיד כ-Product×Location פעיל ב-/SAPAPO/MAT1 ומוכן לתכנון ב-/SAPAPO/RRP3.",
          scenarioHe: "בארגון מפעילים תכנון-מתקדם לכל משקאות-המילוי המוגמרים ולתערובות-בסיס שהן צווארי-בקבוק, אך לא לחומרי-גלם בסיסיים.",
          navHe: ["Logistics ► Material Master ► Material ► Change (MM02) ► Advanced Planning", "SPRO ► Production ► Advanced Planning ► Master Data ► Product ► Activate Advanced Planning"],
          tables: ["MARC", "/SAPAPO/MATLOC"],
          tcodes: ["MM02", "/SAPAPO/MAT1"],
          fiori: ["F1602A"],
          configHe: ["סמן Advanced Planning בלשונית באב-החומר, או הגדר ברירת-מחדל פר Material Type/Plant; ההפעלה יוצרת Product×Location."],
          mistakesHe: ["הפעלה גורפת לכל החומרים — עומס מיותר על ה-liveCache.", "הפעלה ללא הגדרת Planning Procedure — תכנון לא מתנהג כצפוי."],
          troubleshootHe: ["המוצר לא בתכנון-מתקדם ➔ ה-indicator כבוי או לא נשמר.", "אין Product×Location ➔ החומר לא הורחב ל-Location הרלוונטי."],
          bestPracticeHe: ["הפעל סלקטיבית לפי צורך-תכנון אמיתי.", "תאם הפעלה עם הגדרת Planning Procedure ו-Horizon."],
          interviewHe: [{ qHe: "כיצד מפעילים תכנון-מתקדם לחומר ב-Embedded PP/DS?", aHe: "מסמנים את ה-Advanced Planning indicator בלשונית באב-החומר (MARC), או דרך ברירת-מחדל ב-SPRO; הסימון יוצר רשומת Product×Location." }],
          takeawaysHe: ["Advanced Planning indicator = שער-הכניסה ל-PP/DS.", "ההפעלה יוצרת Product×Location.", "הפעל סלקטיבית."],
        },
        {
          id: "2.3.2", titleHe: "ביטול תכנון מתקדם לחומרים", titleEn: "Deactivation of Advanced Planning for Materials",
          execHe: "ביטול תכנון-מתקדם מסיר חומר מתחום-ה-PP/DS ומחזירו לתכנון-MRP קלאסי. זהו תהליך-מבוקר הדורש שלא יישארו אובייקטי-תכנון פתוחים (Planned Orders/order-network) בליבת-ה-liveCache.",
          beginnerHe: "ההפך מהפעלה: \"מכבים\" את המתג, והמוצר עוזב את עולם ה-PP/DS וחוזר ל-MRP רגיל. צריך לוודא שאין הזמנות-תכנון פתוחות לפני שמכבים.",
          consultantHe: "הביטול מתבצע דרך כיבוי ה-Advanced Planning indicator או report-ביטול. SAP ממליצה למחוק/להמיר תחילה אובייקטי-תכנון פתוחים כדי למנוע \"נתונים-יתומים\" ב-liveCache. אי-עקביות שנותרת נפתרת ב-/SAPAPO/CCR.",
          purposeHe: "להוציא בצורה-נקייה מוצר מהתכנון-המתקדם — למשל כשמוצר יורד מהקו או כשמסתבר שאינו זקוק לתכנון-מפורט.",
          processExampleHe: "מוצר מופסק: מוודאים שאין Planned/Production Orders פתוחים, מכבים את ה-indicator, ומריצים CCR לוודא ש-Product×Location הוסר נקי מ-liveCache.",
          scenarioHe: "בארגון כשמשקה עונתי יורד מהקו, מבטלים לו תכנון-מתקדם בסוף-העונה אחרי סגירת כל פק\"ע פתוחה, ומחזירים אותו לתכנון-קלאסי.",
          navHe: ["Logistics ► Material Master ► Material ► Change (MM02) ► Advanced Planning", "SPRO ► Production ► Advanced Planning ► Master Data ► Product ► Deactivate Advanced Planning"],
          tables: ["MARC", "/SAPAPO/MATLOC"],
          tcodes: ["MM02", "/SAPAPO/CCR"],
          fiori: ["F1602A"],
          configHe: ["כבה את ה-Advanced Planning indicator לאחר סגירת אובייקטי-תכנון פתוחים; הרץ CCR לאימות-נקיון."],
          mistakesHe: ["ביטול עם הזמנות-תכנון פתוחות ➔ נתונים-יתומים ב-liveCache.", "ביטול בלי הרצת CCR ➔ אי-עקביות נסתרת."],
          troubleshootHe: ["נתונים-יתומים אחרי ביטול ➔ הרץ CCR לזיהוי ותיקון.", "המוצר עדיין מתוכנן-מתקדם ➔ ה-indicator לא כובה בכל ה-Locations."],
          bestPracticeHe: ["סגור אובייקטי-תכנון פתוחים לפני ביטול.", "הרץ CCR מיד אחרי הביטול."],
          interviewHe: [{ qHe: "מה צריך לוודא לפני ביטול תכנון-מתקדם?", aHe: "שאין אובייקטי-תכנון פתוחים (Planned/Production Orders) למוצר, כדי למנוע נתונים-יתומים ב-liveCache; ולאחר הביטול להריץ CCR." }],
          takeawaysHe: ["ביטול = החזרה לתכנון-קלאסי.", "סגור הזמנות-פתוחות תחילה.", "הרץ CCR אחרי."],
        },
        {
          id: "2.3.3", titleHe: "הגדרות תכנון-מתקדם ייחודיות לחומר", titleEn: "Advanced Planning Settings Specific to the Material",
          execHe: "מעבר לסימון-ההפעלה, אב-המוצר נושא הגדרות-תכנון פרטניות: Planning Procedure, Lot-Size method, GR/GI times, Planning Time Fence, Procurement type, ו-PP/DS Horizon. הן קובעות כיצד בדיוק PP/DS מתכנן את המוצר.",
          beginnerHe: "אחרי שהדלקנו את המתג, צריך \"לכוונן\" את המוצר: כמה לייצר בכל פעם, כמה זמן לוקח לקלוט/להוציא, ועד כמה רחוק לתכנן. כל אלה שדות ייחודיים למוצר.",
          consultantHe: "השדות הקריטיים: Planning Procedure (event-driven replanning), Lot-Size (Lot-for-lot/Fixed/Periodic + Min/Max/Rounding), GR/GI Processing Time (משפיע על תזמון-זמין-לשימוש), Planning Time Fence ו-PP/DS Horizon. נשמרים ב-/SAPAPO/MATLOC ומשפיעים ישירות על ה-heuristics ועל בדיקת-הקיבולת ב-DS Planning Board.",
          purposeHe: "לכוונן את התנהגות-התכנון של כל מוצר בנפרד — כדי שהתזמון, גודל-האצווה והמקור יתאימו למציאות התפעולית שלו.",
          processExampleHe: "מוצר עם Min Lot-Size=1000 ו-Rounding=500: PP/DS מייצר Planned Orders בכפולות-500 לא-פחות-מ-1000; ה-GR Processing Time=1 יום דוחה את זמינות-המלאי ביום מקבלת-הסחורה.",
          scenarioHe: "בארגון קו-מילוי עם Min Lot-Size = batch-מינימלי של 5000 בקבוקים ו-Rounding לפי גודל-מכל; GR Processing Time מייצג זמן-בידוד QA לפני שחרור-מלאי.",
          navHe: ["Advanced Planning ► Master Data ► Product ► Product (/SAPAPO/MAT1) ► PP/DS view", "Logistics ► Material Master (MM02) ► Advanced Planning"],
          tables: ["/SAPAPO/MATLOC", "MARC"],
          tcodes: ["/SAPAPO/MAT1", "MM02"],
          fiori: ["F1602A", "F0247"],
          configHe: ["הגדר Planning Procedure, Lot-Size (Min/Max/Fixed/Rounding), GR/GI Processing Time, Planning Time Fence, PP/DS Horizon ו-Procurement Type ברמת Product×Location."],
          mistakesHe: ["Lot-Size שגוי ➔ הזמנות-תכנון לא-ריאליות.", "GR Processing Time=0 כשנדרש בידוד-QA ➔ זמינות-מלאי מוקדמת-מדי."],
          troubleshootHe: ["כמויות-תכנון לא-הגיוניות ➔ Lot-Size method/Min/Max שגויים.", "זמינות-מלאי מוקדמת מהצפוי ➔ GR Processing Time חסר."],
          bestPracticeHe: ["תקנן Lot-Size methods בין מוצרים-דומים.", "שקף GR/GI times אמיתיים (בידוד-QA, זמני-תנועה)."],
          interviewHe: [
            { qHe: "אילו הגדרות ייחודיות-למוצר משפיעות על תכנון-PP/DS?", aHe: "Planning Procedure, Lot-Size method, GR/GI Processing Time, Planning Time Fence, PP/DS Horizon ו-Procurement Type — כולם ברמת Product×Location." },
            { qHe: "מה מייצג GR Processing Time?", aHe: "הזמן מקבלת-הסחורה עד זמינות-המלאי לשימוש — למשל בידוד-QA; הוא דוחה את תאריך הזמינות בתכנון." },
          ],
          takeawaysHe: ["הגדרות פרטניות מכווננות את התכנון פר-מוצר.", "Lot-Size + GR/GI times קריטיים לתזמון.", "נשמרות ב-Product×Location."],
        },
        {
          id: "2.3.4", titleHe: "אינטגרציה גמישה של חומר ל-PP/DS המוטמע", titleEn: "Flexible Integration of Material to Embedded PP/DS",
          execHe: "אינטגרציה-גמישה (Flexible Integration) מאפשרת לבחור באופן-דינמי, פר מפעל וסוג-חומר, אילו חומרים מנוהלים ב-Embedded PP/DS, במקום הפעלה ידנית פרטנית. זהו מנגנון-ברירת-מחדל וכללים המפשט הטמעה רחבה.",
          beginnerHe: "במקום לסמן כל מוצר בנפרד, מגדירים \"כלל\": למשל כל ה-FERT במפעל 1010 — אוטומטית בתכנון-מתקדם. זה חוסך עבודה ידנית בהיקפים גדולים.",
          consultantHe: "ב-SPRO מגדירים ברירות-מחדל פר Plant + Material Type להפעלת Advanced Planning, ובאמצעות BAdI/כללים ניתן להחיל לוגיקה גמישה. ב-Embedded PP/DS האינטגרציה היא פנימית (אין CIF חיצוני), ולכן \"גמישה\" — סימון החומר מפעיל מיד את ה-Product×Location בלי תור-RFC. שימושי במיגרציה המונית של חומרים קיימים.",
          purposeHe: "להאיץ ולתקנן את הכנסת-החומרים ל-PP/DS בקנה-מידה, תוך שמירה על שליטה לפי מפעל וסוג-חומר.",
          processExampleHe: "מגדירים כלל ברירת-מחדל: Plant=1010 + Material Type=FERT ⇒ Advanced Planning פעיל; מריצים report-המרה שמסמן את כל ה-FERT הקיימים ויוצר את ה-Product×Location שלהם בבת-אחת.",
          scenarioHe: "בארגון ברגע-העלייה לאוויר מפעילים אינטגרציה-גמישה לכל ה-FERT בכל מפעלי-המילוי בבת-אחת, ומשאירים ROH ב-MRP קלאסי — מיגרציה מהירה בלי סימון פרטני.",
          navHe: ["SPRO ► Production ► Advanced Planning ► Master Data ► Product ► Activate Advanced Planning per Plant/Material Type", "SPRO ► Production ► Advanced Planning ► Basic Settings ► Configure Embedded PP/DS"],
          tables: ["MARC", "/SAPAPO/MATLOC", "T399D"],
          tcodes: ["MM02", "/SAPAPO/MAT1"],
          fiori: ["F1602A"],
          configHe: ["הגדר ברירות-מחדל פר Plant + Material Type להפעלת Advanced Planning; השתמש ב-report/BAdI להחלה-מסיבית; ב-Embedded ההפעלה מיידית ללא תור-RFC."],
          mistakesHe: ["כלל גורף הכולל סוגי-חומר לא-רלוונטיים ➔ ניפוח התכנון.", "הסתמכות על אינטגרציה-גמישה בלי לאמת תוצאה ב-CCR/MAT1."],
          troubleshootHe: ["חומרים לא הופעלו כצפוי ➔ כלל ברירת-המחדל לא מכסה את ה-Plant/Material Type.", "הופעלו חומרים מיותרים ➔ צמצם את כלל-ברירת-המחדל."],
          bestPracticeHe: ["הגדר כללים צרים לפי Plant+Material Type.", "אמת תוצאת-המרה ב-/SAPAPO/MAT1 לפני המשך."],
          interviewHe: [
            { qHe: "מהי אינטגרציה-גמישה של חומר ל-Embedded PP/DS?", aHe: "מנגנון ברירות-מחדל וכללים פר Plant+Material Type המפעיל תכנון-מתקדם באופן-דינמי לחומרים, במקום סימון ידני פרטני — שימושי במיגרציה המונית." },
            { qHe: "במה שונה ההפעלה ב-Embedded מ-PP/DS חיצוני?", aHe: "ב-Embedded האינטגרציה פנימית ומיידית (אין CIF/תור-RFC); סימון החומר מפעיל מיד את ה-Product×Location ב-liveCache." },
          ],
          takeawaysHe: ["אינטגרציה-גמישה = כללי-ברירת-מחדל פר Plant/Material Type.", "מיגרציה מהירה בקנה-מידה.", "ב-Embedded ההפעלה מיידית ופנימית."],
        },
      ],
    },
    // ============================================================ 2.4
    {
      id: "2.4", titleHe: "מרכזי עבודה ומשאבים", titleEn: "Work Centers and Resources",
      execHe:
        "ב-PP/DS הקיבולת מיוצגת על-ידי Resource (משאב) — ההמשך המתוכנן של מרכז-העבודה הקלאסי. מרכז-העבודה ב-S/4HANA מסונכרן אוטומטית ל-Resource ב-liveCache, שעליו מתבצעים תזמון-מדויק-לשנייה, בדיקת-קיבולת-סופית (finite) ופתרון-עומסים על לוח-התכנון (DS Planning Board). זהו ההבדל המהותי מ-MRP הקלאסי: PP/DS מתכנן מול קיבולת אמיתית.",
      beginnerHe:
        "מרכז-העבודה הוא \"איפה עובדים\" בעולם-ה-ERP; ה-Resource הוא אותו דבר בעולם-התכנון, אבל עם יכולת לתזמן מדויק ולבדוק אם הקו באמת פנוי. כל מרכז-עבודה הופך אוטומטית ל-Resource כשמסנכרנים אותו.",
      consultantHe:
        "Resources נשמרים ב-/SAPAPO/RESOURCE ומנוהלים ב-/SAPAPO/RES01. סוגי-משאב: Single-Activity, Multi-Activity, Single/Multi-Mixed, Bucket, Transportation. ה-Resource נושא time stream (לפי לוח-שנה של ה-Location), Available Capacity, ו-Setup Matrix (לעלויות/זמני-changeover תלויי-רצף). המיפוי מרכז-עבודה→Resource הוא 1:1 פר Capacity Category; ה-Standard Value Key והנוסחאות מ-S/4HANA מתורגמים ל-mode-ים של ה-Resource.",
      purposeHe:
        "לספק ל-PP/DS ייצוג-קיבולת מדויק ל-finite scheduling: לדעת בכל רגע אם משאב פנוי, לתזמן פעולות לשנייה, ולפתור עומסי-יתר על לוח-התכנון.",
      processExampleHe:
        "קו-מילוי מסונכרן כ-Single-Mixed Resource עם time stream של 3 משמרות; כשנוצר Planned Order, PP/DS מתזמן את הפעולה על המשאב לפי הזמן-הפנוי הבא, מתחשב ב-Setup Matrix אם נדרש changeover, ומסמן עומס-יתר אם המשאב כבר מלא.",
      scenarioHe:
        "בארגון כל קו-מילוי = Single-Mixed Resource עם time stream של משמרות-המפעל; ה-Setup Matrix של הקו מתאר זמני-ניקוי בין-טעמים (מוגז→ספרייט ארוך, מוגז→מוגז-דיאט קצר); תכנון-המילוי משבץ פק\"עות על הקו תוך מינימיזציה של זמני-changeover.",
      navHe: [
        "SAP Easy Access ► Advanced Planning ► Master Data ► Resource ► Resource (/SAPAPO/RES01)",
        "Production ► Basic Data ► Work Center (CR01/CR02) — מקור ה-Resource",
        "SPRO ► Production ► Advanced Planning ► Master Data ► Resource ► Define Resource Settings",
      ],
      tables: ["/SAPAPO/RESOURCE", "CRHD", "CRCA", "KAKO"],
      tcodes: ["/SAPAPO/RES01", "CR01", "CR02", "CFM2"],
      fiori: ["F2336", "F4006"],
      configHe: [
        "Resource Type: Single-Activity / Multi-Activity / Single-Mixed / Multi-Mixed / Bucket / Transportation.",
        "Available Capacity + time stream נגזרים מלוח-השנה של ה-Location ומ-KAKO.",
        "מיפוי מרכז-עבודה→Resource פר Capacity Category (001 מכונה / 002 כוח-אדם).",
        "Setup Matrix משויך למשאב לזמני/עלויות changeover תלויי-רצף.",
      ],
      flow: [
        { he: "סנכרון מרכז-עבודה", code: "CFM2", note: "CRHD" },
        { he: "יצירת Resource", code: "/SAPAPO/RES01" },
        { he: "time stream מלוח-שנה", code: "Location Calendar" },
        { he: "שיוך Setup Matrix", code: "Changeover" },
        { he: "תזמון-סופי ב-DS Board", code: "/SAPAPO/CDPS0" },
      ],
      masterDataHe: [
        "/SAPAPO/RESOURCE = רשומת המשאב · CRHD/KAKO = מקור הקיבולת ב-S/4HANA.",
        "time stream + Available Capacity קובעים את חלון-הזמינות לתזמון-סופי.",
      ],
      mistakesHe: [
        "מרכז-עבודה ללא קיבולת מוגדרת (KAKO) ➔ Resource ללא time stream — אי-אפשר לתזמן-סופית.",
        "סנכרון Capacity Category לא-נכון ➔ משאב כפול/חסר.",
        "שיוך Setup Matrix שגוי ➔ זמני-changeover לא מחושבים.",
      ],
      troubleshootHe: [
        "המשאב לא מתזמן ➔ time stream ריק (לוח-שנה/KAKO חסרים).",
        "Resource לא נוצר ➔ מרכז-העבודה לא נכלל במודל-האינטגרציה.",
        "changeover לא מחושב ➔ Setup Matrix לא משויך או חסר Setup Group.",
      ],
      bestPracticeHe: [
        "ודא קיבולת ולוח-שנה תקינים במרכז-העבודה לפני סנכרון.",
        "בחר Resource Type התואם לאופי-הקו (Single-Mixed לקו-בודד).",
        "תחזק Setup Matrix רק למשאבים עם changeover תלוי-רצף משמעותי.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין מרכז-עבודה ל-Resource?", aHe: "מרכז-עבודה הוא ייצוג-הקיבולת ב-S/4HANA הקלאסי; Resource הוא ההמשך ב-PP/DS המאפשר תזמון-מדויק-לשנייה ובדיקת-קיבולת-סופית. המיפוי 1:1 ואוטומטי בסנכרון." },
        { qHe: "מהו time stream של משאב?", aHe: "ייצוג זמינות-הזמן של המשאב לאורך-הזמן, נגזר מלוח-השנה של ה-Location ומהקיבולת — הבסיס לתזמון-סופי." },
      ],
      takeawaysHe: [
        "Resource = מרכז-עבודה בעולם-התכנון, עם finite scheduling.",
        "מיפוי 1:1 אוטומטי; time stream מלוח-השנה של ה-Location.",
        "Setup Matrix מזין זמני/עלויות changeover.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מטריצת היערכות (2.8)", href: "/library/ppds/chapter-02/#sub-2.8" },
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "אובייקט · CRHD", href: "/library/pp/object/CRHD/" },
      ],
      children: [
        {
          id: "2.4.1", titleHe: "מרכזי עבודה", titleEn: "Work Centers",
          execHe: "מרכז-העבודה ב-S/4HANA הוא נקודת-המוצא של ה-Resource: הוא נושא Capacity (KAKO), Standard Value Key, נוסחאות ו-Cost Center/Activity Types. הסנכרון לוקח את כל אלה ומתרגם אותם למשאב-תכנון.",
          beginnerHe: "לפני שיש Resource, יש מרכז-עבודה רגיל ב-S/4HANA — בדיוק כמו ב-PP הקלאסי. ה-PP/DS פשוט \"מעתיק\" אותו לעולם-התכנון, ולכן חשוב שהמרכז יוגדר נכון מלכתחילה.",
          consultantHe: "מרכז-העבודה (CR01/CR02) חייב Capacity Category, Available Capacity ולוח-שנה תקינים — הם הופכים ל-time stream של ה-Resource. ה-Standard Value Key קובע אילו זמנים (Setup/Machine/Labor) זמינים, וה-Control Key קובע אם הפעולה רלוונטית-לתזמון. נתוני-העלות (Activity Types/KP26) ממשיכים לשמש לתמחיר-הפק\"ע.",
          purposeHe: "להגדיר את הקיבולת, הזמנים והעלות במרכז-העבודה כך שיסונכרנו נכון ל-Resource ויאפשרו תזמון-סופי מדויק.",
          processExampleHe: "מגדירים קו-מילוי כמרכז-עבודה עם Capacity Category 001, 3 משמרות וניצולת 90%; הסנכרון יוצר Resource עם time stream תואם, שעליו PP/DS מתזמן.",
          scenarioHe: "בארגון כל קו-מילוי מוגדר תחילה כמרכז-עבודה מסוג מכונה עם קיבולת-משמרות וניצולת; רק אז הוא מסונכרן ל-Resource לתכנון-מתקדם.",
          navHe: ["Production ► Basic Data ► Work Center ► Create/Change (CR01/CR02)", "Production ► Basic Data ► Work Center ► Capacity Planning ► Define Capacity (KAKO)"],
          tables: ["CRHD", "CRCA", "KAKO"],
          tcodes: ["CR01", "CR02", "CR03"],
          fiori: ["F2336"],
          configHe: ["הגדר Capacity Category, Available Capacity, ניצולת ולוח-שנה; ודא Standard Value Key ו-Control Key תקינים לפני סנכרון."],
          mistakesHe: ["מרכז-עבודה ללא Capacity ➔ Resource ללא time stream.", "לוח-שנה שגוי ➔ זמינות-תכנון שגויה."],
          troubleshootHe: ["Resource ללא קיבולת ➔ KAKO חסר במרכז-העבודה.", "תזמון שגוי ➔ ניצולת/משמרות שגויות."],
          bestPracticeHe: ["הגדר קיבולת ולוח-שנה ריאליים.", "בדוק את המרכז ב-S/4HANA לפני הסנכרון ל-Resource."],
          interviewHe: [{ qHe: "מדוע חשוב להגדיר את מרכז-העבודה נכון לפני PP/DS?", aHe: "כי ה-Resource נגזר ממנו 1:1 — קיבולת, לוח-שנה וזמנים שגויים במרכז יתורגמו ל-time stream שגוי ולתזמון-סופי שגוי." }],
          takeawaysHe: ["מרכז-העבודה = מקור ה-Resource.", "קיבולת + לוח-שנה ⇒ time stream.", "הגדר נכון לפני סנכרון."],
        },
        {
          id: "2.4.2", titleHe: "משאבים", titleEn: "Resources",
          execHe: "ה-Resource הוא ייצוג-הקיבולת ב-liveCache שעליו PP/DS מבצע תזמון-סופי. הוא נושא time stream, modes (תרגום של Standard Values), קיבולת-זמינה ו-Setup Matrix, ומשמש את ה-DS Planning Board לפתרון-עומסים.",
          beginnerHe: "ה-Resource הוא \"הלוח\" שעליו PP/DS מסדר את העבודות לאורך-הזמן. הוא יודע מתי הקו פנוי ומתי תפוס, ולכן יכול לסדר את הפק\"עות בלי להעמיס-יתר.",
          consultantHe: "ב-/SAPAPO/RES01 מתחזקים את ה-Resource: Type, Available Capacity, Finite/Infinite indicator, Dimension, ו-Setup Matrix/Setup Group. ה-modes ממפים את Standard Values ל-activity-ים. אפשר להגדיר Resources מרובי-קיבולת (Multi-Mixed) לעובדים-מקבילים. שינויי-Resource מורגשים מיד ב-liveCache.",
          purposeHe: "לאפשר תזמון-סופי מדויק, פתרון-עומסים ואופטימיזציה של רצף-changeover על המשאב.",
          processExampleHe: "ב-DS Planning Board PP/DS משבץ פק\"ע על Resource של קו-מילוי בחלון-הפנוי הבא; אם המשאב מסומן Finite, לא ניתן לחרוג מהקיבולת — נוצר עומס-יתר גלוי לפתרון.",
          scenarioHe: "בארגון קו-מילוי כ-Resource Finite מבטיח שלא יתוזמנו שתי פק\"עות בו-זמנית; ה-Setup Matrix מצמצם changeover-טעמים, וה-optimizer ממיין את סדר-המשקאות למינימום-ניקויים.",
          navHe: ["Advanced Planning ► Master Data ► Resource ► Resource (/SAPAPO/RES01)", "Advanced Planning ► Detailed Scheduling ► Detailed Scheduling Planning Board (/SAPAPO/CDPS0)"],
          tables: ["/SAPAPO/RESOURCE", "/SAPAPO/RESCAP"],
          tcodes: ["/SAPAPO/RES01", "/SAPAPO/CDPS0"],
          fiori: ["F4006"],
          configHe: ["תחזק Resource Type, Available Capacity, Finite/Infinite, Dimension ו-Setup Matrix/Setup Group; הגדר modes לתרגום Standard Values."],
          mistakesHe: ["Resource מסומן Infinite כשנדרש Finite ➔ עומסי-יתר לא-נראים.", "modes לא-תואמים ל-Standard Values ➔ משך-פעולה שגוי."],
          troubleshootHe: ["עומס-יתר לא מזוהה ➔ ה-Resource מוגדר Infinite.", "פעולה לא מתוזמנת על המשאב ➔ time stream ריק או mode חסר."],
          bestPracticeHe: ["סמן Finite למשאבי-צוואר-בקבוק.", "בדוק את ה-Resource ב-DS Planning Board אחרי כל שינוי."],
          interviewHe: [
            { qHe: "מהו ההבדל בין Resource מסוג Finite ל-Infinite?", aHe: "Finite אוכף את גבול-הקיבולת (לא ניתן לחרוג, עומס-יתר גלוי לפתרון); Infinite מאפשר תזמון מעבר-לקיבולת ומתאים למשאבים שאינם צוואר-בקבוק." },
            { qHe: "מהם modes של Resource?", aHe: "מיפוי בין Standard Values (Setup/Machine/Labor) לפעילויות המשאב, הקובע כיצד משך-הפעולה נגזר בתזמון." },
          ],
          takeawaysHe: ["Resource = \"הלוח\" לתזמון-סופי.", "Finite אוכף קיבולת; Infinite לא.", "Setup Matrix ממזער changeover."],
        },
      ],
    },
    // ============================================================ 2.5
    {
      id: "2.5", titleHe: "מקורות אספקה (Sources of Supply)", titleEn: "Sources of Supply",
      execHe:
        "מקור-אספקה (Source of Supply) הוא ההגדרה של \"מאיפה\" מגיע המוצר בתכנון-PP/DS: ייצור-פנימי דרך PDS (Production Data Structure), או רכש-חיצוני דרך External Procurement Relationship (חוזה/הסכם/info record). ה-PDS הוא הליבה — הוא הגרסה-המתוכננת של BOM+Routing/Recipe, ובלעדיו PP/DS לא יכול לתכנן ייצור-פנימי.",
      beginnerHe:
        "כדי לתכנן, PP/DS צריך לדעת מאיפה משיגים כל מוצר. אם מייצרים בבית — צריך \"מתכון-תכנון\" שנקרא PDS (שמכיל את הרכיבים ואת הפעולות). אם קונים מבחוץ — צריך מקור-רכש. בלי מקור-אספקה אין מה לתכנן.",
      consultantHe:
        "ב-PP/DS שני סוגי מקורות-אספקה: (1) PDS לייצור-פנימי, הנוצר מ-Production Version (BOM+Routing/Recipe) דרך הדוח CURTO_CREATE, ומכיל components, activities, modes ו-component assignment; (2) External Procurement Relationships מ-Purchasing Info Records/Contracts/Scheduling Agreements. ה-PDS מחליף את ה-PPM (Production Process Model) הישן ב-S/4HANA — היררכיית-נתונים יציבה הניתנת ל-transfer מ-Routing/Recipe. בחירת-המקור ב-heuristics מבוססת על Procurement Priority וקוסט.",
      purposeHe:
        "לספק ל-PP/DS את כל החלופות לאספקת-מוצר — ייצור או רכש — עם כל הפרטים הנדרשים לתזמון, לקיבולת ולעלות, ולאפשר בחירת-מקור אוטומטית.",
      processExampleHe:
        "FERT מתוכנן: PP/DS בוחר את ה-PDS הפעיל (מ-Production Version), מפצץ את ה-components כדרישות-תלויות, ומתזמן את ה-activities על ה-Resources. אם נדרש רכיב-נרכש, ה-External Procurement Relationship שלו קובע ספק וזמן-אספקה.",
      scenarioHe:
        "בארגון מקור-האספקה של משקה-מוגמר הוא PDS שנוצר ממתכון-המילוי (Master Recipe) דרך CURTO_CREATE; התרכיז הנרכש מ-The Example Product Company מנוהל כ-External Procurement Relationship עם זמן-אספקה ומחיר-חוזה.",
      navHe: [
        "SAP Easy Access ► Advanced Planning ► Master Data ► Production Data Structure ► Display (/SAPAPO/CURTO_SIMU)",
        "Advanced Planning ► Master Data ► Generate Production Data Structure (CURTO_CREATE)",
        "SPRO ► Production ► Advanced Planning ► Master Data ► Source of Supply",
      ],
      tables: ["/SAPAPO/PDSPROD", "/SAPAPO/PDS", "EINA", "EINE"],
      tcodes: ["CURTO_CREATE", "/SAPAPO/CURTO_SIMU", "ME11", "ME31K"],
      fiori: ["F1421", "F2336"],
      configHe: [
        "PDS Type: PP/DS PDS לייצור-פנימי (מ-Routing/Recipe דרך Production Version).",
        "Transfer דרך CURTO_CREATE — בורר PDS Type ו-Filter (Material/Plant/Production Version).",
        "External Procurement Relationship מ-Info Record/Contract/Scheduling Agreement.",
        "Procurement Priority/Cost לבחירת-מקור ב-heuristics.",
      ],
      flow: [
        { he: "Production Version", code: "C223", note: "BOM+Routing/Recipe" },
        { he: "יצירת PDS", code: "CURTO_CREATE" },
        { he: "PDS עם components+activities", code: "/SAPAPO/PDS" },
        { he: "מקור-רכש (אם נדרש)", code: "ME11", note: "Info Record" },
        { he: "בחירת-מקור בתכנון", code: "/SAPAPO/RRP3" },
      ],
      masterDataHe: [
        "/SAPAPO/PDSPROD = ה-PDS לייצור-פנימי · EINA/EINE = Info Record לרכש.",
        "ה-PDS נגזר מ-Production Version (BOM Alternative + Routing/Recipe).",
      ],
      mistakesHe: [
        "שינוי BOM/Routing בלי יצירה-מחדש של ה-PDS ➔ PDS מיושן בתכנון.",
        "Production Version לא-תקפה ➔ CURTO_CREATE נכשל / PDS לא נוצר.",
        "מספר מקורות ללא Priority ➔ בחירת-מקור לא-צפויה.",
      ],
      troubleshootHe: [
        "אין מקור-אספקה בתכנון ➔ PDS לא נוצר או Production Version לא-תקפה.",
        "PDS לא משקף שינוי-מתכון ➔ הרץ CURTO_CREATE מחדש לאותה Production Version.",
        "נבחר מקור לא-נכון ➔ בדוק Procurement Priority/Cost.",
      ],
      bestPracticeHe: [
        "הרץ CURTO_CREATE מחדש אחרי כל שינוי ב-BOM/Routing/Recipe.",
        "תחזק Production Version אחת-ברורה כבסיס ל-PDS.",
        "הגדר Procurement Priority כשיש מספר מקורות.",
      ],
      interviewHe: [
        { qHe: "מהו PDS ומה ההבדל מ-PPM?", aHe: "PDS (Production Data Structure) הוא הגרסה-המתוכננת של BOM+Routing/Recipe לייצור-פנימי ב-PP/DS, הנוצר דרך CURTO_CREATE; הוא מחליף את ה-PPM הישן ומספק היררכיית-נתונים יציבה." },
        { qHe: "מהם שני סוגי מקורות-האספקה ב-PP/DS?", aHe: "ייצור-פנימי דרך PDS, ורכש-חיצוני דרך External Procurement Relationship (Info Record/Contract/Scheduling Agreement)." },
      ],
      takeawaysHe: [
        "מקור-אספקה = \"מאיפה\" מגיע המוצר.",
        "PDS לייצור-פנימי (CURTO_CREATE), רכש-חיצוני ל-External.",
        "PDS נגזר מ-Production Version; חדש את PDS אחרי שינוי-מתכון.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אב מוצר (2.3)", href: "/library/ppds/chapter-02/#sub-2.3" },
        { labelHe: "PP · גרסת ייצור (3.10)", href: "/library/pp/chapter-03/#sub-3.10" },
        { labelHe: "אובייקט · MKAL", href: "/library/pp/object/MKAL/" },
      ],
      children: [
        {
          id: "2.5.1", titleHe: "מבנה נתוני ייצור (PDS)", titleEn: "Production Data Structure",
          execHe: "ה-PDS (Production Data Structure) הוא אובייקט-מקור-האספקה לייצור-פנימי ב-PP/DS: הוא מאגד את ה-components (מ-BOM), ה-activities ו-modes (מ-Routing/Recipe דרך מרכזי-העבודה/Resources), וה-component assignment לפעולות. הוא \"המתכון-המתוכנן\" שעליו נשען כל תזמון-הייצור.",
          beginnerHe: "ה-PDS הוא \"גרסת-התכנון\" של המתכון: הוא לוקח את הרכיבים (BOM) ואת הפעולות (Routing) ומאחד אותם למבנה אחד שה-PP/DS יודע לתזמן על המשאבים. בלעדיו אין ייצור-פנימי בתכנון.",
          consultantHe: "ה-PDS נשמר ב-/SAPAPO/PDSPROD ונוצר אך-ורק מ-Production Version (לא ניתן לערוך ידנית — read-only result). הוא נושא: components עם component assignment לפעולות, activities עם modes (קישור ל-Resource + Setup/Process/Teardown), ופרמטרי-תזמון. ב-S/4HANA ה-PDS החליף סופית את ה-PPM. שינויי-מקור מחייבים יצירה-מחדש (re-transfer).",
          purposeHe: "לספק ל-PP/DS מבנה-מקור-אספקה יציב ומלא לייצור-פנימי — components, activities ו-modes — לתזמון-סופי, פיצוץ-דרישות וחישוב-עלות.",
          processExampleHe: "PP/DS מתזמן FERT: בוחר את ה-PDS, יוצר activities לפי ה-modes על ה-Resources, מפצץ את ה-components כדרישות-תלויות לפי ה-component assignment, ומחשב משכים מ-Standard Values.",
          scenarioHe: "בארגון ה-PDS של משקה כולל: component תרכיז/סוכר/CO2/מים, activity ערבול על Resource-המערבל, activity מילוי על Resource-קו-המילוי (עם Setup ל-changeover), ו-activity אריזה — הכל נגזר ממתכון-המילוי.",
          navHe: ["Advanced Planning ► Master Data ► Production Data Structure ► Display PDS (/SAPAPO/CURTO_SIMU)"],
          tables: ["/SAPAPO/PDSPROD", "/SAPAPO/PDS"],
          tcodes: ["/SAPAPO/CURTO_SIMU", "CURTO_CREATE"],
          fiori: ["F1421"],
          configHe: ["ה-PDS נוצר מ-Production Version בלבד דרך CURTO_CREATE; הוא read-only — עריכה נעשית במקור (BOM/Routing) ואז re-transfer."],
          mistakesHe: ["ניסיון לערוך PDS ידנית ➔ אינו ניתן-לעריכה.", "PDS מיושן אחרי שינוי-מתכון ➔ לא הורץ re-transfer."],
          troubleshootHe: ["PDS לא משקף את ה-Routing ➔ הרץ CURTO_CREATE מחדש.", "components חסרים ב-PDS ➔ component assignment חסר ב-Routing (PLMZ)."],
          bestPracticeHe: ["נהל את ה-PDS דרך מקורו (BOM/Routing) ולא ידנית.", "הרץ re-transfer אוטומטי על שינוי-Change Number."],
          interviewHe: [
            { qHe: "ממה מורכב PDS?", aHe: "components (מ-BOM) עם assignment לפעולות, activities עם modes (קישור ל-Resource), ופרמטרי-תזמון — הכל נגזר מ-Production Version." },
            { qHe: "האם ניתן לערוך PDS ידנית?", aHe: "לא; ה-PDS הוא תוצר read-only של ה-transfer. שינויים נעשים ב-BOM/Routing ואז re-transfer דרך CURTO_CREATE." },
          ],
          takeawaysHe: ["PDS = מבנה-מקור-אספקה לייצור-פנימי.", "מאגד components+activities+modes.", "read-only; נגזר מ-Production Version."],
        },
        {
          id: "2.5.2", titleHe: "העברת מסלול-ייצור ל-PP/DS כ-PDS", titleEn: "Transfer of Routing to PP/DS as Production Data Structures",
          execHe: "תהליך ה-transfer יוצר PDS מ-Routing (PP בדיד) דרך הדוח CURTO_CREATE: בוחרים PDS Type, Filter (Material/Plant/Production Version), ומריצים; התוצאה היא PDS פעיל ב-liveCache הזמין לתכנון.",
          beginnerHe: "כאן \"בונים את המתכון-המתוכנן\" מתוך מסלול-הייצור הרגיל. מריצים דוח (CURTO_CREATE) שלוקח את ה-Routing וה-BOM ויוצר מהם PDS שה-PP/DS יכול להשתמש בו.",
          consultantHe: "CURTO_CREATE מקבל PDS Type (לדוגמה PP/DS PDS) ו-Filter; הוא קורא את ה-Production Version (BOM Alternative + Routing/Group), מתרגם פעולות→activities, מרכזי-עבודה→modes-on-Resources, ורכיבים→components. אפשר לתזמן re-transfer אוטומטי על שינויי-Change Number דרך הגדרות-SPRO. שגיאות נצפות בלוג-הדוח.",
          purposeHe: "להפוך את נתוני-הייצור הקלאסיים (Routing+BOM) למבנה-מקור-אספקה שה-PP/DS יכול לתזמן, ולסנכרן שינויים.",
          processExampleHe: "אחרי הגדרת Production Version ל-FERT, מריצים CURTO_CREATE עם Filter Material+Plant; נוצר PDS; המוצר זמין כעת לתכנון-מתקדם עם תזמון על ה-Resources.",
          scenarioHe: "בארגון, כשמשנים מסלול קו-מילוי (למשל מוסיפים תחנת-בדיקה), מריצים CURTO_CREATE מחדש כדי שה-PDS ישקף את הפעולה-החדשה בתכנון.",
          navHe: ["Advanced Planning ► Master Data ► Production Data Structure ► Generate (CURTO_CREATE)", "SPRO ► Production ► Advanced Planning ► Master Data ► Source of Supply ► Production Data Structure ► Define PDS Transfer"],
          tables: ["/SAPAPO/PDSPROD", "PLKO", "PLPO", "MAPL"],
          tcodes: ["CURTO_CREATE", "/SAPAPO/CURTO_SIMU", "C223"],
          fiori: ["F1421"],
          configHe: ["ב-CURTO_CREATE בחר PDS Type ו-Filter (Material/Plant/Production Version) והרץ; הגדר re-transfer אוטומטי על Change Number ב-SPRO."],
          flow: [
            { he: "Production Version תקפה", code: "C223" },
            { he: "הרצת CURTO_CREATE", code: "PDS Type+Filter" },
            { he: "Routing→activities/modes", code: "PLPO→Resource" },
            { he: "BOM→components", code: "STPO→component" },
            { he: "PDS פעיל ל-PP/DS", code: "/SAPAPO/PDSPROD" },
          ],
          mistakesHe: ["הרצת CURTO_CREATE ללא Production Version תקפה ➔ כשל.", "שכחת re-transfer אחרי שינוי-Routing ➔ PDS מיושן."],
          troubleshootHe: ["CURTO_CREATE נכשל ➔ Production Version לא-תקפה או Consistency Check אדום.", "PDS לא נוצר ➔ Filter לא מכסה את החומר/מפעל."],
          bestPracticeHe: ["הגדר re-transfer אוטומטי על Change Number.", "הרץ Consistency Check (C223) לפני ה-transfer."],
          interviewHe: [
            { qHe: "איזה דוח יוצר PDS מ-Routing?", aHe: "CURTO_CREATE — בורר PDS Type ו-Filter (Material/Plant/Production Version) ויוצר את ה-PDS ב-liveCache." },
            { qHe: "מה תנאי-הסף ל-transfer מוצלח?", aHe: "Production Version תקפה (BOM Alternative + Routing) שעוברת Consistency Check; אחרת ה-transfer נכשל." },
          ],
          takeawaysHe: ["CURTO_CREATE יוצר PDS מ-Routing+BOM.", "דורש Production Version תקפה.", "הגדר re-transfer אוטומטי על שינוי."],
          relatedHe: [{ labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" }],
        },
        {
          id: "2.5.3", titleHe: "העברת מתכוני-אב ל-PP/DS כ-PDS", titleEn: "Transfer of Master Recipes as Production Data Structures",
          execHe: "ב-תרחישי PP-PI, ה-PDS נוצר מ-Master Recipe (במקום Routing) דרך אותו CURTO_CREATE: ה-phases וה-operations של המתכון הופכים ל-activities, ה-resources נשמרים, וחומרי-המתכון הופכים ל-components.",
          beginnerHe: "בתעשיית-תהליך (כמו משקאות) המתכון נקרא Master Recipe ולא Routing. אותו תהליך-יצירה בדיוק — CURTO_CREATE — לוקח את המתכון ובונה ממנו PDS לתכנון.",
          consultantHe: "ה-transfer של Master Recipe מתרגם operations/phases→activities, resources→modes, וחומרי-המתכון (material list) →components. ב-Embedded PP/DS שני העולמות (Discrete Routing ו-PI Master Recipe) משתמשים באותו PDS-type ובאותו דוח, מה שמאחד את מקור-האספקה ללא קשר לסוג-הייצור.",
          purposeHe: "לאפשר תכנון-PP/DS מתקדם גם לתעשיית-תהליך (PP-PI) על-בסיס Master Recipe, באותו מנגנון-PDS של ייצור-בדיד.",
          processExampleHe: "מתכון-מילוי PI עם phases הכנה→ערבול→מילוי→אריזה מומר דרך CURTO_CREATE ל-PDS; PP/DS מתזמן את ה-phases כ-activities על ה-Resources של קו-המילוי.",
          scenarioHe: "בארגון המשקאות מנוהלים ב-PP-PI עם Master Recipe; ה-PDS שלהם נוצר מהמתכון, וכך תכנון-המילוי המתקדם זהה בלוגיקה לזה של ייצור-בדיד.",
          navHe: ["Advanced Planning ► Master Data ► Production Data Structure ► Generate (CURTO_CREATE)", "Production Planning – Process Industries ► Master Data ► Master Recipe (C201/C202)"],
          tables: ["/SAPAPO/PDSPROD", "PLPO", "PLKO", "RC27M"],
          tcodes: ["CURTO_CREATE", "C201", "C202", "C223"],
          fiori: ["F1421"],
          configHe: ["הרץ CURTO_CREATE עם PDS Type המתאים ל-PI ו-Filter; ה-Master Recipe + Production Version הם המקור; phases→activities."],
          flow: [
            { he: "Master Recipe + Production Version", code: "C201/C223" },
            { he: "הרצת CURTO_CREATE", code: "PDS Type (PI)" },
            { he: "phases→activities", code: "Resource modes" },
            { he: "material list→components", code: "component" },
            { he: "PDS פעיל ל-PP/DS", code: "/SAPAPO/PDSPROD" },
          ],
          mistakesHe: ["Master Recipe ללא Production Version ➔ אין transfer.", "phase-resource assignment חסר ➔ activities ללא משאב."],
          troubleshootHe: ["activities ללא Resource ➔ resource assignment חסר במתכון.", "PDS לא נוצר ➔ Production Version של המתכון לא-תקפה."],
          bestPracticeHe: ["ודא resource assignment מלא ב-Master Recipe.", "השתמש באותו מנגנון re-transfer כמו ב-Routing."],
          interviewHe: [
            { qHe: "כיצד נוצר PDS בתעשיית-תהליך?", aHe: "מ-Master Recipe (במקום Routing) דרך אותו CURTO_CREATE; phases/operations הופכים ל-activities, resources ל-modes, וחומרי-המתכון ל-components." },
            { qHe: "מה משותף ל-transfer של Routing ו-Master Recipe?", aHe: "אותו דוח (CURTO_CREATE) ואותו אובייקט-תוצר (PDS), מה שמאחד את מקור-האספקה ללא קשר לסוג-הייצור." },
          ],
          takeawaysHe: ["PI מייצר PDS מ-Master Recipe.", "אותו CURTO_CREATE כמו ל-Routing.", "phases→activities; material list→components."],
          relatedHe: [{ labelHe: "PP/DS · מבני-נתוני-ייצור (2.5.1)", href: "/library/ppds/chapter-02/#sub-2.5.1" }],
        },
        {
          id: "2.5.4", titleHe: "מקורות אספקה לרכש חיצוני", titleEn: "External Procurement Sources of Supply",
          execHe: "לרכיבים ומוצרים נרכשים, מקור-האספקה הוא External Procurement Relationship שנגזר מ-Purchasing Info Record, Contract או Scheduling Agreement. הוא מספק ל-PP/DS ספק, זמן-אספקה (PDT), מחיר ו-rounding לתכנון-רכש.",
          beginnerHe: "כשמוצר נקנה מבחוץ ולא מיוצר, PP/DS צריך לדעת מאיזה ספק, כמה זמן לוקח להגיע ובאיזה מחיר. כל אלה מגיעים מ-Info Record / חוזה הרכש.",
          consultantHe: "ה-External Procurement Relationships מסונכרנים מ-EINA/EINE (Info Record), חוזים (ME31K) או Scheduling Agreements. הם נושאים Planned Delivery Time, Procurement Priority ו-cost לבחירת-מקור ב-heuristics. ב-PP/DS הם מאפשרים יצירת Purchase Requisitions מתוזמנות. ניתן לנהל מספר ספקים עם Quota Arrangement.",
          purposeHe: "לאפשר ל-PP/DS לתכנן רכש-חיצוני — לבחור ספק, לחשב תאריך-הזמנה לפי PDT, ולייצר דרישות-רכש מתוזמנות.",
          processExampleHe: "רכיב נרכש עם Info Record: PP/DS מזהה מחסור, קורא את ה-PDT (10 יום), ויוצר Purchase Requisition עם תאריך-הזמנה 10 יום לפני הצורך, מול הספק שב-Info Record.",
          scenarioHe: "בארגון התרכיז נרכש מ-The Example Product Company דרך Scheduling Agreement; PP/DS מתזמן את משיכות-התרכיז לפי PDT וכמויות-מינימום החוזיות.",
          navHe: ["Materials Management ► Purchasing ► Purchasing Info Record ► Create (ME11)", "Materials Management ► Purchasing ► Outline Agreement ► Contract/Scheduling Agreement (ME31K/ME31L)", "Advanced Planning ► Master Data ► Source of Supply ► External Procurement Relationships"],
          tables: ["EINA", "EINE", "EKKO", "/SAPAPO/TRPROD"],
          tcodes: ["ME11", "ME12", "ME31K", "ME31L"],
          fiori: ["F1421", "F2336"],
          configHe: ["צור Info Record/Contract/Scheduling Agreement; ודא Planned Delivery Time; הגדר Procurement Priority/Quota כשיש מספר ספקים."],
          mistakesHe: ["Info Record ללא PDT ➔ תאריך-הזמנה שגוי.", "מספר ספקים ללא Quota/Priority ➔ בחירת-מקור לא-צפויה."],
          troubleshootHe: ["דרישת-רכש בתאריך שגוי ➔ PDT חסר/שגוי.", "אין מקור-רכש בתכנון ➔ Info Record/Relationship לא קיים או לא סונכרן."],
          bestPracticeHe: ["תחזק PDT ריאלי בכל Info Record.", "השתמש ב-Quota Arrangement לפיצול בין ספקים."],
          interviewHe: [
            { qHe: "מהם מקורות הרכש-החיצוני ב-PP/DS?", aHe: "External Procurement Relationships מ-Purchasing Info Record, Contract או Scheduling Agreement — נושאים ספק, PDT, מחיר ו-priority." },
            { qHe: "כיצד PP/DS קובע את תאריך-ההזמנה לרכש?", aHe: "לפי ה-Planned Delivery Time (PDT) של מקור-הרכש — הוא מזיז את תאריך-ההזמנה אחורה מהצורך." },
          ],
          takeawaysHe: ["רכש-חיצוני = Info Record/Contract/Scheduling Agreement.", "PDT קובע תאריך-הזמנה.", "Quota/Priority לבחירה בין ספקים."],
        },
      ],
    },
    // ============================================================ 2.6
    {
      id: "2.6", titleHe: "מחלקות ומאפיינים (Classes & Characteristics)", titleEn: "Classes and Characteristics",
      execHe:
        "מחלקות ומאפיינים (Classification) הם המנגנון לתיאור-תכונות של אובייקטי-תכנון — בעיקר Setup Groups ו-Setup Keys למטריצת-ההיערכות, ו-Characteristics-Based Forecasting/Block Planning. ב-PP/DS הם הבסיס ל-changeover תלוי-רצף: כל מוצר/Resource נושא מאפיין (למשל טעם או צבע) שלפיו ה-Setup Matrix מחשבת זמן/עלות מעבר.",
      beginnerHe:
        "מאפיין (Characteristic) הוא \"תכונה\" — למשל צבע, טעם או גודל. מחלקה (Class) היא \"קבוצה\" של מאפיינים. ב-PP/DS משתמשים בהם בעיקר כדי לתאר לכל מוצר מאיזו קבוצת-היערכות הוא, וכך לדעת כמה זמן לוקח לעבור מאחד לשני.",
      consultantHe:
        "המאפיינים מנוהלים ב-CT04 והמחלקות ב-CL01/CL02, לפי Class Types (לדוגמה 300 variant, 023 batch). ב-PP/DS Setup Groups/Setup Keys מוגדרים כ-characteristic values המשויכים למוצר ומשמשים את ה-Setup Matrix. בנוסף משמשים ל-Block Planning ול-CDP (Characteristic-Dependent Planning). הסנכרון מעביר את ה-classification הרלוונטי לאובייקטי-התכנון ב-liveCache.",
      purposeHe:
        "לתאר תכונות-מוצר באופן-מובנה כדי לאפשר changeover תלוי-רצף (Setup Matrix), תכנון-בלוקים ותחזית מבוססת-מאפיינים.",
      processExampleHe:
        "מגדירים Characteristic בשם FLAVOR עם ערכים Drink/Sprite/Fanta, ומשייכים לכל FERT את ערך-הטעם שלו; ה-Setup Matrix משתמשת בערך זה לחשב זמן-ניקוי בין-טעמים בתזמון.",
      scenarioHe:
        "בארגון מגדירים Characteristic של משפחת-טעם ושל צבע; כל משקה נושא ערכים אלו, וה-Setup Matrix של קו-המילוי מחשבת changeover ארוך במעבר כהה→בהיר וקצר בין-טעמים דומים.",
      navHe: [
        "Cross-Application Components ► Classification System ► Characteristics ► Create (CT04)",
        "Cross-Application Components ► Classification System ► Class ► Create (CL01/CL02)",
        "SPRO ► Production ► Advanced Planning ► Master Data ► Setup Matrix / Classification",
      ],
      tables: ["KLAH", "CABN", "AUSP", "KSML"],
      tcodes: ["CT04", "CL01", "CL02", "CL24N"],
      fiori: ["F2336"],
      configHe: [
        "Characteristic (CT04): שם, סוג-נתון, ערכים-מותרים — בסיס ל-Setup Key/Group.",
        "Class (CL01) + Class Type (300 variant / 023 batch) ושיוך מאפיינים.",
        "שיוך ערכי-מאפיין למוצר (Allocation) — נקרא ב-Setup Matrix.",
        "Block Planning/CDP אופציונליים על-בסיס אותם מאפיינים.",
      ],
      masterDataHe: [
        "CABN = הגדרת המאפיין · AUSP = ערכי-המאפיין פר-אובייקט · KLAH = המחלקה.",
        "ערכי-המאפיין של המוצר הם מפתח-הכניסה ל-Setup Matrix.",
      ],
      mistakesHe: [
        "מאפיין ללא ערכים-מותרים מוגדרים ➔ שיוך-מוצר לא-עקבי.",
        "ערכי-מאפיין שאינם תואמים ל-Setup Keys שבמטריצה ➔ changeover לא מחושב.",
      ],
      troubleshootHe: [
        "Setup Matrix לא מזהה changeover ➔ למוצר חסר ערך-מאפיין/Setup Key.",
        "Block Planning לא פועל ➔ Characteristic לא משויך לאובייקט-התכנון.",
      ],
      bestPracticeHe: [
        "הגדר רשימת-ערכים סגורה למאפיינים (Allowed Values).",
        "סנכרן את ערכי-המאפיינים בין ה-classification ל-Setup Keys שבמטריצה.",
      ],
      interviewHe: [
        { qHe: "כיצד מחלקות-ומאפיינים משרתים את PP/DS?", aHe: "הם מתארים תכונות-מוצר (כמו Setup Group/Key) המשמשות את ה-Setup Matrix לחישוב changeover תלוי-רצף, וכן ל-Block Planning ו-CDP." },
        { qHe: "היכן מגדירים מאפיין ומחלקה?", aHe: "מאפיין ב-CT04, מחלקה ב-CL01/CL02 לפי Class Type; ערכי-המאפיין משויכים למוצר ונקראים ב-Setup Matrix." },
      ],
      takeawaysHe: [
        "Characteristic = תכונה; Class = קבוצת-תכונות.",
        "בסיס ל-Setup Group/Key במטריצת-ההיערכות.",
        "ערכי-המאפיין הם מפתח ל-changeover תלוי-רצף.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מטריצת היערכות (2.8)", href: "/library/ppds/chapter-02/#sub-2.8" },
      ],
    },
    // ============================================================ 2.7
    {
      id: "2.7", titleHe: "הסדרי מכסה (Quota Arrangements)", titleEn: "Quota Arrangements",
      execHe:
        "הסדר-מכסה (Quota Arrangement) מגדיר כיצד לחלק ביקוש בין מספר מקורות-אספקה — מספר ספקים, מספר קווי-ייצור או מספר PDS — לפי אחוז/יחס. ב-PP/DS הוא מאפשר ל-heuristics ול-optimizer לפצל אוטומטית הזמנות-תכנון בין מקורות מקבילים.",
      beginnerHe:
        "כשיש כמה דרכים להשיג מוצר (שני ספקים, שני קווים), הסדר-מכסה אומר \"תחלק כך: 60% מכאן, 40% משם\". זה מבטיח שהעומס מתפזר ולא נופל הכל על מקור-אחד.",
      consultantHe:
        "Quota Arrangements מנוהלים ב-ERP (MEQ1) ומסונכרנים ל-PP/DS. הם נושאים Quota כמותי/אחוזי, Quota Base Quantity ו-validity. ב-PP/DS הם משפיעים על בחירת-מקור ב-heuristics ועל פיצול אוטומטי של Planned Orders/Purchase Requisitions. ניתן לשלב עם Procurement Priority. ה-allocation מתעדכן דינמית לפי הכמויות-שכבר-הוקצו (Allocated Quantity).",
      purposeHe:
        "לפזר ביקוש בין מקורות-אספקה מקבילים באופן-מבוקר — לאיזון-עומסים, לניהול-סיכוני-ספק ולעמידה בהתחייבויות-חוזיות.",
      processExampleHe:
        "מוצר עם שני ספקים בהסדר 70/30: PP/DS מפצל דרישה ל-1000 יח' ל-700 מספק-א' ו-300 מספק-ב', ויוצר שתי Purchase Requisitions בהתאם.",
      scenarioHe:
        "בארגון משקה המיוצר על שני קווי-מילוי מקבילים מנוהל בהסדר-מכסה 50/50 לאיזון-עומסים; בעת תחזוקת-קו, ה-Quota מוטה זמנית 100% לקו הפעיל.",
      navHe: [
        "Materials Management ► Purchasing ► Quota Arrangement ► Maintain (MEQ1)",
        "Production ► MRP ► Master Data ► Quota Arrangement",
        "SPRO ► Production ► Advanced Planning ► Master Data ► Source of Supply ► Quota Arrangement",
      ],
      tables: ["MDLG", "EQUK", "EQUP"],
      tcodes: ["MEQ1", "MEQ3", "MEQ4"],
      fiori: ["F2336"],
      configHe: [
        "Quota Arrangement (MEQ1): מקורות + Quota (אחוז/כמות) + validity.",
        "Quota Base Quantity ו-Maximum Quantity per source.",
        "שילוב עם Procurement Priority ב-source determination.",
        "Allocated Quantity מתעדכן דינמית לפי הקצאות-בפועל.",
      ],
      masterDataHe: [
        "EQUK = כותרת הסדר-מכסה · EQUP = פריטי-המכסה (מקור + יחס).",
        "ה-allocation מסונכרן ל-PP/DS ומשפיע על בחירת-מקור.",
      ],
      mistakesHe: [
        "סך-יחסי-מכסה שאינו 100% ➔ פיצול לא-צפוי.",
        "validity לא-עדכני ➔ הסדר לא פעיל בתכנון.",
      ],
      troubleshootHe: [
        "פיצול לא מתבצע ➔ Quota Arrangement לא-תקף או לא סונכרן.",
        "כל הביקוש למקור-אחד ➔ Maximum Quantity/Priority עוקפים את ה-Quota.",
      ],
      bestPracticeHe: [
        "ודא שסך היחסים = 100% ו-validity עדכני.",
        "שלב Quota עם Priority לתרחישי-גיבוי (failover).",
      ],
      interviewHe: [
        { qHe: "מה מטרת הסדר-מכסה ב-PP/DS?", aHe: "לחלק ביקוש בין מספר מקורות-אספקה מקבילים לפי יחס/אחוז — לאיזון-עומסים, ניהול-סיכוני-ספק ועמידה בחוזים." },
        { qHe: "היכן מתחזקים Quota Arrangement?", aHe: "ב-ERP דרך MEQ1, והוא מסונכרן ל-PP/DS ומשפיע על בחירת-מקור ופיצול-הזמנות." },
      ],
      takeawaysHe: [
        "Quota Arrangement = חלוקת-ביקוש בין מקורות.",
        "מתוחזק ב-MEQ1, מסונכרן ל-PP/DS.",
        "שלב עם Priority לאיזון ולגיבוי.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מקורות-אספקה (2.5)", href: "/library/ppds/chapter-02/#sub-2.5" },
      ],
    },
    // ============================================================ 2.8
    {
      id: "2.8", titleHe: "מטריצת היערכות (Setup Matrix)", titleEn: "Setup Matrix",
      execHe:
        "מטריצת-ההיערכות (Setup Matrix) מגדירה זמני-ועלויות-changeover תלויי-רצף בין Setup Groups/Keys על משאב. זהו אחד מנכסי-הליבה של PP/DS: היא מאפשרת ל-optimizer למזער זמני-מעבר על-ידי מיון חכם של רצף-הפק\"עות, ובכך להגדיל קיבולת ולחסוך עלות.",
      beginnerHe:
        "כשעוברים בקו-ייצור ממוצר-אחד לאחר, לעיתים צריך לנקות או לכוונן — וזה לוקח זמן. מטריצת-ההיערכות היא \"טבלה\" שאומרת כמה זמן/כסף עולה כל מעבר (מטעם-X לטעם-Y). PP/DS משתמש בה כדי לסדר את העבודות בסדר שמצמצם מעברים.",
      consultantHe:
        "ה-Setup Matrix משויכת ל-Resource ובנויה על Setup Groups/Setup Keys (characteristic values). כל תא מגדיר Setup Time + Setup Cost למעבר מ-Group A ל-Group B. סוגים: סטטית (מתוחזקת ידנית, ערכים קבועים) ומחושבת/מגונרטת (Generated — נבנית אוטומטית מ-rule/characteristics). המטריצה מוזנת לתזמון (זמן ה-Setup activity של ה-PDS) ול-optimizer (Setup-time/cost minimization). תחזוקה ב-/SAPAPO/CDPSC1 או דרך Resource.",
      purposeHe:
        "למדל את עלות/זמן ה-changeover תלוי-הרצף, ולאפשר ל-optimizer לרצף פק\"עות באופן שממזער היערכויות — שיפור-קיבולת וחיסכון-עלות ישירים.",
      processExampleHe:
        "Resource עם Setup Matrix: מעבר Drink→Drink = 5 דק', Drink→Diet = 20 דק', Drink→Sprite = 60 דק'. ה-optimizer ממיין 10 פק\"עות כך שהרצף ממזער את סך-זמני-המעבר.",
      scenarioHe:
        "בארגון מטריצת קו-המילוי: changeover בין משקאות-מוגז קצר, מעבר לטעם-הדר ארוך (ניקוי-עמוק), ומעבר ממשקה-כהה לבהיר הארוך-ביותר; ה-optimizer מסדר מבהיר לכהה למינימום-ניקויים יומיים.",
      navHe: [
        "Advanced Planning ► Master Data ► Setup Matrix ► Maintain Setup Matrix (/SAPAPO/CDPSC1)",
        "Advanced Planning ► Master Data ► Resource (/SAPAPO/RES01) ► Setup Matrix assignment",
        "SPRO ► Production ► Advanced Planning ► Master Data ► Setup Matrix",
      ],
      tables: ["/SAPAPO/SETUPMATRIX", "/SAPAPO/SETUPGRP", "/SAPAPO/RESOURCE"],
      tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/RES01", "CT04"],
      fiori: ["F2336"],
      configHe: [
        "Setup Groups/Setup Keys מ-characteristics (CT04) — שורות/עמודות המטריצה.",
        "כל תא: Setup Time + Setup Cost למעבר Group A→Group B.",
        "שיוך המטריצה ל-Resource; ה-Setup activity של ה-PDS קורא ממנה.",
        "בחירה בין Static (ידנית) ו-Generated (אוטומטית מ-rule).",
      ],
      masterDataHe: [
        "/SAPAPO/SETUPMATRIX = המטריצה · /SAPAPO/SETUPGRP = ה-Setup Groups/Keys.",
        "ערכי-המאפיין של המוצר ממפים אותו ל-Setup Key במטריצה.",
      ],
      mistakesHe: [
        "תאי-מטריצה חסרים (transition לא-מוגדר) ➔ זמן-changeover ברירת-מחדל 0.",
        "Setup Key למוצר שאינו תואם לשורות/עמודות המטריצה ➔ מעבר לא-מחושב.",
        "מטריצה לא משויכת ל-Resource ➔ ה-optimizer לא ממזער היערכות.",
      ],
      troubleshootHe: [
        "ה-optimizer לא ממזער changeover ➔ מטריצה לא משויכת או Setup Cost=0.",
        "זמן-מעבר 0 בלתי-צפוי ➔ תא-מטריצה חסר לאותו transition.",
        "מעבר לא-מזוהה ➔ למוצר חסר Setup Key/ערך-מאפיין.",
      ],
      bestPracticeHe: [
        "מלא את כל התאים הרלוונטיים (כולל transition לעצמו).",
        "סנכרן Setup Keys עם ערכי-המאפיינים (CT04) של המוצרים.",
        "כייל Setup Cost כך שישקף עלות-changeover אמיתית ל-optimizer.",
      ],
      interviewHe: [
        { qHe: "מה מגדירה מטריצת-ההיערכות?", aHe: "זמני ועלויות changeover תלויי-רצף בין Setup Groups/Keys על Resource; ה-optimizer משתמש בה למזער מעברים בריצוף-הפק\"עות." },
        { qHe: "כיצד מוצר ממופה ל-Setup Key?", aHe: "דרך ערכי-המאפיין (Characteristics) שלו, המשויכים ל-Setup Group/Key המהווים שורה/עמודה במטריצה." },
      ],
      takeawaysHe: [
        "Setup Matrix = זמן/עלות changeover תלוי-רצף.",
        "משויכת ל-Resource; מבוססת Setup Groups/Keys.",
        "מאפשרת ל-optimizer למזער מעברים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מרכזי-עבודה ומשאבים (2.4)", href: "/library/ppds/chapter-02/#sub-2.4" },
        { labelHe: "PP/DS · מחלקות ומאפיינים (2.6)", href: "/library/ppds/chapter-02/#sub-2.6" },
      ],
      children: [
        {
          id: "2.8.1", titleHe: "מטריצת היערכות סטטית", titleEn: "Static Setup Matrix",
          execHe: "מטריצה-סטטית מתוחזקת ידנית: כל תא (transition בין שני Setup Keys) מקבל Setup Time ו-Setup Cost קבועים שנקבעים על-ידי המשתמש. מתאימה כשמספר הקבוצות קטן והערכים יציבים.",
          beginnerHe: "בגרסה-הסטטית פשוט ממלאים את הטבלה ביד: ממוצר-X למוצר-Y = 20 דק'. הערכים קבועים ולא משתנים אוטומטית.",
          consultantHe: "ב-/SAPAPO/CDPSC1 מגדירים את ה-Setup Groups/Keys וממלאים ידנית את התאים. המטריצה משויכת ל-Resource. יתרון: שקיפות ושליטה מלאה. חיסרון: תחזוקה ידנית שגדלה ריבועית עם מספר-הקבוצות (n×n).",
          purposeHe: "לספק מודל-changeover מדויק ומבוקר כשמספר קבוצות-ההיערכות נשלט והערכים ידועים מראש.",
          processExampleHe: "מגדירים 4 Setup Keys וממלאים מטריצת 4×4 ידנית; ה-optimizer קורא את הערכים הקבועים בעת ריצוף.",
          scenarioHe: "בארגון קו-מילוי עם 5 משפחות-טעם בלבד מנוהל במטריצה-סטטית 5×5 שמתוחזקת ידנית על-ידי מהנדס-התהליך.",
          navHe: ["Advanced Planning ► Master Data ► Setup Matrix ► Maintain Setup Matrix (/SAPAPO/CDPSC1)"],
          tables: ["/SAPAPO/SETUPMATRIX", "/SAPAPO/SETUPGRP"],
          tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/RES01"],
          fiori: ["F2336"],
          configHe: ["הגדר Setup Keys ומלא ידנית כל תא ב-Setup Time + Setup Cost; שייך את המטריצה ל-Resource."],
          mistakesHe: ["תאים ריקים ➔ changeover 0 לא-צפוי.", "מטריצה גדולה-מדי לתחזוקה-ידנית ➔ שגיאות-עדכון."],
          troubleshootHe: ["transition מסוים = 0 ➔ התא לא מולא.", "ערך ישן ➔ המטריצה לא עודכנה ידנית."],
          bestPracticeHe: ["השתמש בסטטית רק כשמספר-הקבוצות קטן.", "מלא את כל התאים כולל transition-לעצמו."],
          interviewHe: [{ qHe: "מתי עדיפה מטריצה-סטטית?", aHe: "כשמספר Setup Groups קטן והערכים יציבים — נותנת שקיפות ושליטה מלאה ללא צורך בכללי-חישוב." }],
          takeawaysHe: ["סטטית = מילוי-ידני קבוע.", "מתאימה למספר-קבוצות קטן.", "תחזוקה גדלה n×n."],
        },
        {
          id: "2.8.2", titleHe: "מטריצת היערכות מגונרטת", titleEn: "Generated Setup Matrix",
          execHe: "מטריצה-מגונרטת נבנית אוטומטית מתוך כללים (rules) ו-characteristics: במקום מילוי-ידני, המערכת מחשבת את ה-Setup Time/Cost לכל transition לפי ערכי-המאפיינים והפרשיהם. חיונית כשמספר הקבוצות גדול.",
          beginnerHe: "במקום למלא טבלה-ענקית ביד, מגדירים \"כלל\": למשל מעבר בין צבעים-שונים = 30 דק', אותו צבע = 5 דק'. המערכת בונה את כל הטבלה לבד מהכלל.",
          consultantHe: "ה-Generated Matrix מבוססת על Setup Group Characteristics וכללי-מעבר (לדוגמה דרך condition technique/rule). היא מתאימה למאות צירופים שבהם מילוי-ידני בלתי-אפשרי. הכללים מתבססים על מרחק-בין-ערכי-מאפיין (color/flavor/size). עדכון-כלל מעדכן את כל המטריצה בבת-אחת.",
          purposeHe: "לייצר מטריצת-changeover מורכבת ועקבית בלי תחזוקה-ידנית בלתי-מעשית, ולעדכנה ממקור-אחד (הכלל).",
          processExampleHe: "כלל: changeover = פונקציה של הפרש-צבע + הפרש-טעם; המערכת בונה מטריצת 50×50 אוטומטית, וה-optimizer משתמש בה לריצוף.",
          scenarioHe: "בארגון עם 50+ מק\"טי-משקה, המטריצה מגונרטת מכלל המבוסס על משפחת-טעם וצבע: מעבר בהיר→כהה קצר, כהה→בהיר ארוך (ניקוי-עמוק) — נבנה אוטומטית לכל הצירופים.",
          navHe: ["Advanced Planning ► Master Data ► Setup Matrix ► Generate Setup Matrix", "Advanced Planning ► Master Data ► Setup Matrix ► Maintain Setup Groups/Rules (/SAPAPO/CDPSC1)"],
          tables: ["/SAPAPO/SETUPMATRIX", "/SAPAPO/SETUPGRP", "CABN"],
          tcodes: ["/SAPAPO/CDPSC1", "CT04", "/SAPAPO/RES01"],
          fiori: ["F2336"],
          configHe: ["הגדר Setup Group Characteristics וכללי-מעבר; הרץ generation לבניית כל התאים אוטומטית; שייך ל-Resource."],
          mistakesHe: ["כלל לא-שלם ➔ תאים עם ערך שגוי/0.", "אי-הרצת generation מחדש אחרי שינוי-כלל ➔ מטריצה מיושנת."],
          troubleshootHe: ["ערכי-מעבר שגויים ➔ הכלל לא מכסה את צירוף-המאפיינים.", "המטריצה לא עודכנה ➔ generation לא הורץ מחדש."],
          bestPracticeHe: ["השתמש במגונרטת למספר-קבוצות גדול.", "הרץ generation מחדש אחרי כל שינוי-כלל; בדוק מדגם-תאים."],
          interviewHe: [
            { qHe: "מתי משתמשים במטריצה-מגונרטת?", aHe: "כשמספר Setup Groups גדול (עשרות/מאות), כך שמילוי-ידני בלתי-מעשי; המטריצה נבנית מכללים ו-characteristics ומתעדכנת ממקור-אחד." },
            { qHe: "מה היתרון של מגונרטת על סטטית?", aHe: "תחזוקה ממקור-אחד (כלל) במקום n×n תאים ידניים, ועקביות אוטומטית בכל הצירופים." },
          ],
          takeawaysHe: ["מגונרטת = נבנית מכללים ו-characteristics.", "למספר-קבוצות גדול.", "עדכן כלל ⇒ הרץ generation מחדש."],
        },
      ],
    },
    // ============================================================ 2.9
    {
      id: "2.9", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק נתוני-האב הציג את שכבת-היסוד של Embedded PP/DS: כל תכנון-מתקדם נשען על נתוני-אב נכונים ומסונכרנים. ראינו את מודל-האינטגרציה (CFM1/CFM2) כשער-הכניסה, את ה-Locations כבמה, את אב-המוצר (/SAPAPO/MAT1) עם הפעלת תכנון-מתקדם, את ה-Resources (/SAPAPO/RES01) לתזמון-סופי, את ה-PDS (CURTO_CREATE) כמקור-אספקה לייצור-פנימי, ואת ה-classification וה-Setup Matrix ל-changeover תלוי-רצף.",
      beginnerHe:
        "סיכמנו את \"הלבנים\" של PP/DS: מה נכנס לתכנון (מודל-אינטגרציה), איפה (Location), מה (Product), על מה (Resource), מאיפה (Source of Supply/PDS), ואיך מתחשבים במעברים (Setup Matrix). בלי נתוני-אב נכונים — אין תכנון נכון.",
      consultantHe:
        "המסר המקצועי: ב-Embedded PP/DS הסנכרון פנימי אך הלוגיקה והכלים (CFM1/CFM2, /SAPAPO/MAT1, /SAPAPO/RES01, CURTO_CREATE, Setup Matrix, /SAPAPO/CCR) זהים לעולם-ה-APO הקלאסי. נקודות-הכשל הנפוצות: מודל-אינטגרציה לא-מופעל, Advanced Planning indicator כבוי, מרכז-עבודה ללא קיבולת, PDS מיושן, ו-Setup Matrix לא-משויכת. הרצת CCR שגרתית ומשמעת-נתונים הן תנאי לתכנון-יציב.",
      purposeHe:
        "לקשור את כל אובייקטי נתוני-האב לתמונה-אחת ולהבהיר שכל יכולות-התכנון של הפרקים הבאים (heuristics, optimizer, DS board) תלויות באיכות שכבה זו.",
      processExampleHe:
        "הטמעה מקצה-לקצה: CFM1/CFM2 מעבירים חומרים+מרכזי-עבודה ➔ Locations נוצרים ➔ Advanced Planning מופעל למוצרים ➔ Resources נוצרים עם time stream ➔ CURTO_CREATE יוצר PDS ➔ Setup Matrix משויכת ➔ המוצר מוכן לתכנון מלא ב-/SAPAPO/RRP3.",
      scenarioHe:
        "בארגון: כל קווי-המילוי הם Resources עם Setup Matrix לטעמים, כל המשקאות הם Products מתוכננים-מתקדם עם PDS ממתכוני-המילוי, והתרכיז נרכש דרך External Procurement — תשתית-נתונים מלאה לתכנון-מילוי יומי.",
      navHe: [
        "סקירה: Advanced Planning ► Master Data (כל האובייקטים)",
        "בקרת-עקביות: Advanced Planning ► Integration ► CIF Compare/Reconcile (/SAPAPO/CCR)",
      ],
      tables: ["/SAPAPO/MATLOC", "/SAPAPO/RESOURCE", "/SAPAPO/PDSPROD", "CIF_IMOD"],
      tcodes: ["CFM1", "CFM2", "/SAPAPO/MAT1", "/SAPAPO/RES01", "CURTO_CREATE", "/SAPAPO/CCR"],
      fiori: ["F2336", "F1602A", "F1421"],
      configHe: [
        "סדר-הטמעה מומלץ: Integration Model ► Location ► Product ► Resource ► Source of Supply/PDS ► Setup Matrix.",
        "הרץ /SAPAPO/CCR אחרי כל שינוי-נתוני-אב לאימות-עקביות ERP↔PP/DS.",
        "תעד naming conventions למודלים, ל-Setup Keys ול-Production Versions.",
      ],
      masterDataHe: [
        "כל אובייקטי-הפרק: Integration Model (CIF_IMOD), Location, Product (/SAPAPO/MATLOC), Resource (/SAPAPO/RESOURCE), PDS (/SAPAPO/PDSPROD).",
        "איכות-הסנכרון נמדדת ב-/SAPAPO/CCR.",
      ],
      mistakesHe: [
        "דילוג על CCR אחרי שינויי-נתוני-אב ➔ אי-עקביות נסתרת בתכנון.",
        "סדר-הטמעה שגוי (PDS לפני Resource/Product) ➔ כשלי-תלות.",
        "הפעלת תכנון-מתקדם רחבה-מדי ➔ ניפוח ה-liveCache.",
      ],
      troubleshootHe: [
        "תכנון לא פועל למוצר ➔ עבור על השרשרת: Integration Model → Advanced Planning → Resource → PDS.",
        "אי-עקביות ERP↔PP/DS ➔ הרץ /SAPAPO/CCR והשווה/תקן.",
      ],
      bestPracticeHe: [
        "הקפד על סדר-הטמעה: אינטגרציה ► Location ► Product ► Resource ► PDS ► Setup Matrix.",
        "הרץ CCR שגרתית ושמור משמעת-נתונים (naming, validity).",
        "סמן לתכנון-מתקדם רק את מה שנדרש; חדש PDS אחרי כל שינוי-מתכון.",
      ],
      interviewHe: [
        { qHe: "מהו סדר-ההטמעה הנכון של נתוני-אב ב-PP/DS?", aHe: "Integration Model (CFM1/CFM2) ► Location ► Product (Advanced Planning) ► Resource ► Source of Supply/PDS (CURTO_CREATE) ► Setup Matrix — כל שלב תלוי בקודמו." },
        { qHe: "מהו הכלי המרכזי לאימות-עקביות נתוני-אב?", aHe: "/SAPAPO/CCR (CIF Compare/Reconcile) — משווה בין ERP ל-PP/DS ומתקן אי-התאמות; יש להריצו שגרתית." },
        { qHe: "מהן נקודות-הכשל הנפוצות בנתוני-אב של PP/DS?", aHe: "מודל-אינטגרציה לא-מופעל, Advanced Planning כבוי, מרכז-עבודה ללא קיבולת, PDS מיושן, ו-Setup Matrix לא-משויכת." },
      ],
      takeawaysHe: [
        "נתוני-אב = שכבת-היסוד של כל תכנון-PP/DS.",
        "סדר-הטמעה: Integration Model ► Location ► Product ► Resource ► PDS ► Setup Matrix.",
        "הרץ CCR שגרתית; ב-Embedded הסנכרון פנימי אך הכלים זהים ל-APO.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מודלי אינטגרציה (2.1)", href: "/library/ppds/chapter-02/#sub-2.1" },
        { labelHe: "PP/DS · מקורות-אספקה (2.5)", href: "/library/ppds/chapter-02/#sub-2.5" },
      ],
    },
  ],
};
