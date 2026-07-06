// ===== PP/DS Digital Textbook — Chapter 4 (Academy gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Flat hierarchy: 4.1–4.13, ids + order preserved exactly, no nesting.
// Topic: transferring transaction data (PIRs, orders, stock, lots) ECC→PP/DS via CIF.
// Transformative Hebrew; SAP identifiers verbatim EN (CIF, liveCache, /SAPAPO/CCR, etc.).
import type { TextbookChapter } from "./types";

export const CH4: TextbookChapter = {
  n: 4,
  titleHe: "העברת נתוני-תנועה",
  titleEn: "Data Transfer for Transaction Data",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה להעברת נתוני-תנועה (Transaction Data) מ-ERP/ECC אל PP/DS דרך ה-Core Interface (CIF). לאחר שנתוני-האב (חומרים, מרכזי-עבודה, PPMs/PDS) כבר עברו, יש להזרים את התמונה הדינמית: דרישות-עצמאיות-מתוכננות (PIRs), הזמנות-מתוכננות, פקודות-ייצור, הזמנות-רכש, מלאים ואצוות, מנות-בדיקה, הזמנות-תחזוקה והזמנות-מכירה. כל תת-פרק הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך-העברה, השפעת נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בהעברת נתוני-התנועה ובבדיקות-העקביות (/SAPAPO/CCR) ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 4.1
    {
      id: "4.1",
      titleHe: "הפעלת אינטגרציית נתוני-התנועה",
      titleEn: "Activating the Integration of Transaction Data",
      execHe:
        "לפני שכל הזמנה או מלאי יזרמו ל-PP/DS חובה להפעיל את אינטגרציית נתוני-התנועה — להגדיר אילו סוגי-אובייקטים ייכללו ב-Integration Model, ולהפעיל את ההעברה בזמן-אמת. זהו מתג-העל: בלי הפעלה נכונה, ה-liveCache של PP/DS נשאר ריק גם אם נתוני-האב מושלמים. ההפעלה קובעת מה רואה המתכנן בלוח-התכנון.",
      beginnerHe:
        "תחשוב על CIF כצינור בין שתי מערכות: ECC (שם מתבצעים בפועל הביצוע, ההזמנות והמלאי) ו-PP/DS (שם מתכננים). 'הפעלת אינטגרציה' היא פתיחת הברז עבור סוג-נתונים מסוים — למשל 'העבר לי את כל ההזמנות-המתוכננות'. בלי לפתוח את הברז המתאים, המתכנן לא יראה את ההזמנות גם אם הן קיימות ב-ECC.",
      consultantHe:
        "ההפעלה נעשית דרך Integration Model (CFM1 ליצירה, CFM2 להפעלה/השבתה). מודל-אינטגרציה הוא מסנן (variant) המגדיר אובייקטים לפי טווחי-בחירה: Materials, Planned Orders, Production Orders, Stocks, Sales Orders וכו'. לאחר Generate (CFM1) מבצעים Activate (CFM2); מרגע ההפעלה השינויים זורמים בזמן-אמת דרך BTE/Change Pointers. שדה-מפתח: תיבת-הסימון לכל קטגוריית-תנועה במסך CFM1. שים לב — Master Data ו-Transaction Data לרוב מופרדים למודלים שונים כדי לאפשר אקטיבציה/הרצה עצמאית. /SAPAPO/C1 מציג את לוגיקת-ה-RFC וה-target system.",
      purposeHe:
        "המטרה: לקבוע במדויק אילו נתוני-תנועה רלוונטיים ל-Advanced Planning ולהזרים רק אותם — לא להציף את ה-liveCache. הפעלה סלקטיבית שומרת על ביצועים, על תמונת-תכנון נקייה, ועל הפרדה בין אובייקטים מתוכננים-מתקדם לבין כאלה שמתוכננים ב-ECC בלבד.",
      processExampleHe:
        "צוות הבסיס יוצר ב-CFM1 מודל-אינטגרציה 'TXN_PPDS' המסמן Planned Orders + Production Orders + Stocks עבור מפעל 1000 וטווח-חומרים נבחר. לאחר Generate מריצים CFM2 להפעלה. מאותו רגע, פקודת-ייצור חדשה שנוצרת ב-CO01 משוכפלת אוטומטית ל-PP/DS, ומופיעה כ-order ב-Product View.",
      scenarioHe:
        "בארגון: לאחר שאב-החומר של המשקאות וקווי-המילוי כבר ב-PP/DS, צוות-הבסיס מפעיל מודל-אינטגרציה לנתוני-תנועה המכסה את מפעלי-הבקבוק. רק קווי-המילוי המתוכננים-מתקדם נכללים; מחסני חומרי-הניקיון (לא רלוונטיים ל-detailed scheduling) נשארים מחוץ למודל כדי לא להעמיס את ה-liveCache.",
      navHe: [
        "Integration with Other SAP Components ► Advanced Planning and Optimization ► Basic Settings for the Data Transfer ► Change Transfer for Transaction Data ► Activate Online Transfer Using BTE",
        "SAP Menu ► Logistics ► Central Functions ► Supply Chain Planning Interface (CIF) ► Integration Model ► Create (CFM1) / Activate (CFM2)",
        "Integration with SAP Components ► APO ► Basic Settings for Data Transfer ► Set Target System and Queue Type (CFC1)",
      ],
      tables: ["CIF_IMOD", "TRFCQOUT", "ARFCSSTATE"],
      tcodes: ["CFM1", "CFM2", "CFC1", "CFC2", "/SAPAPO/C1", "SMQ1"],
      fiori: [],
      configHe: [
        "CFM1: צור Integration Model ושם-לוגי; סמן את קטגוריות-התנועה הרצויות (Planned/Production Orders, Stocks, Sales Orders, Inspection Lots, PIRs).",
        "CFM2: הפעל/השבת את הגרסה האחרונה של המודל; רק גרסה אחת פעילה בכל רגע לכל מסנן.",
        "CFC1: הגדר Target System (לוגיקל-סיסטם של PP/DS) ו-Queue Type (Outbound/Inbound qRFC).",
        "CFC2: הגדר טיפול-בשגיאות והתנהגות recovery של ה-CIF (Debugging / Restart).",
      ],
      flow: [
        { he: "יצירת מסנן-אובייקטים", code: "CFM1", note: "סימון קטגוריות-תנועה" },
        { he: "Generate Integration Model", code: "CFM1" },
        { he: "הפעלה", code: "CFM2", note: "גרסה פעילה אחת" },
        { he: "הזרמה בזמן-אמת", code: "BTE/qRFC", note: "Change Pointers" },
        { he: "מופיע ב-liveCache", code: "/SAPAPO/RRP3" },
      ],
      masterDataHe: [
        "תנאי-סף: נתוני-האב (חומר, מרכז-עבודה, PPM/PDS) כבר הועברו ופעילים ב-PP/DS.",
        "CIF_IMOD = רישום המודלים והגרסאות; כל הפעלה/השבתה מתועדת.",
        "Logical System + RFC destination חייבים להיות תקינים לפני אקטיבציה.",
      ],
      mistakesHe: [
        "הפעלת נתוני-תנועה לפני שנתוני-האב הועברו ➔ שגיאות-CIF 'object does not exist in target'.",
        "ערבוב Master Data ו-Transaction Data באותו מודל ➔ קושי לאתחל/לרענן בנפרד.",
        "השארת מספר גרסאות-מודל פעילות בחפיפה ➔ העברה כפולה או חוסר-עקביות.",
        "שכחת CFC1 (Target System) ➔ העברה נכשלת בשקט, הנתונים תקועים ב-SMQ1.",
      ],
      troubleshootHe: [
        "אובייקטים לא מגיעים ל-PP/DS ➔ ודא שהמודל פעיל ב-CFM2 ושהקטגוריה סומנה ב-CFM1.",
        "הודעות תקועות ב-qRFC ➔ בדוק SMQ1/SMQ2 ב-ECC ו-PP/DS, שחרר queue חסום.",
        "'No active integration model' ➔ הגרסה הפעילה לא כוללת את האובייקט/המפעל הנדרש.",
        "העברה כפולה ➔ שתי גרסאות פעילות לאותו מסנן; השבת את הישנה ב-CFM2.",
      ],
      bestPracticeHe: [
        "הפרד מודל Master Data ממודל Transaction Data — אקטיבציה ואתחול עצמאיים.",
        "תן שמות-מסנן עקביים (TXN_<plant>) ותעד את הטווחים.",
        "הפעל סלקטיבית — רק מפעלים/חומרים שמתוכננים-מתקדם בפועל.",
        "אחרי כל הפעלה הרץ /SAPAPO/CCR לאימות עקביות ראשוני.",
      ],
      interviewHe: [
        { qHe: "מהו Integration Model ובאילו T-Codes מנהלים אותו?", aHe: "מסנן המגדיר אילו אובייקטים יועברו דרך CIF; יוצרים ומפעילים אותו ב-CFM1 (Generate) ו-CFM2 (Activate/Deactivate)." },
        { qHe: "מדוע מפרידים בין מודל נתוני-אב למודל נתוני-תנועה?", aHe: "כדי לאתחל/לרענן כל סוג בנפרד; נתוני-תנועה משתנים תדיר וזורמים בזמן-אמת, נתוני-אב יציבים יותר." },
        { qHe: "מה קורה אם מפעילים נתוני-תנועה לפני נתוני-אב?", aHe: "ה-CIF נכשל עם 'object does not exist in target' — חובה שהחומר/מרכז-העבודה יהיו קיימים ב-PP/DS תחילה." },
      ],
      takeawaysHe: [
        "הפעלת אינטגרציה היא מתג-העל להזרמת נתוני-תנועה דרך CIF.",
        "CFM1 יוצר מסנן, CFM2 מפעיל; גרסה פעילה אחת לכל מסנן.",
        "הפעל רק לאחר שנתוני-האב כבר ב-PP/DS, וסלקטיבית.",
        "הפרד מודל-אב ממודל-תנועה לשליטה ולאתחול נפרדים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אינטגרציה ונתוני-אב (פרק 3)", href: "/library/ppds/chapter-03/" },
        { labelHe: "אובייקט · CIF_IMOD", href: "/library/ppds/object/CIF_IMOD/" },
      ],
    },
    // ============================================================ 4.2
    {
      id: "4.2",
      titleHe: "דרישות עצמאיות מתוכננות",
      titleEn: "Planned Independent Requirements",
      execHe:
        "דרישות-עצמאיות-מתוכננות (PIRs) הן ביטוי הביקוש החזוי שעליו נשען כל תכנון-הייצור. העברתן ל-PP/DS מאפשרת ל-Advanced Planning לראות את הביקוש, להריץ Net Requirements ולתזמן הזמנות. ללא PIRs מועברים, ה-liveCache 'עיוור' לביקוש ולא ייצור הזמנות-מתוכננות.",
      beginnerHe:
        "PIR הוא 'תחזית-ביקוש': כמה אנחנו צופים למכור ממוצר בכל שבוע. את התחזית הזו צריך להעביר ל-PP/DS כדי שיֵדע לתכנן ייצור מולה. אם התחזית קיימת ב-ECC אך לא הועברה — המתכנן ב-PP/DS לא יראה צורך לייצר כלום.",
      consultantHe:
        "PIRs נשמרים ב-ECC בטבלאות PBED/PBIM ומנוהלים ב-MD61/MD62. ב-PP/DS הם מופיעים כקטגוריית-דרישה (FA — forecast). ההעברה יכולה לעבור דרך CIF, אך לרוב ב-APO/IBP התחזית מנוהלת ב-Demand Planning ומשוחררת ל-PP/DS דרך release. שים לב ל-Requirements Strategy (Strategy Group באב-החומר) ול-consumption mode — הם קובעים כיצד מתבצע קיזוז בין PIR לבין הזמנות-לקוח (consumption). Planning Segment ו-Pegging area ב-liveCache קובעים כיצד ה-PIR נקשר לקבלות.",
      purposeHe:
        "המטרה: להזרים את אות-הביקוש ל-PP/DS כך שתכנון-הדרישות-נטו יזהה חוסרים ויפיק הזמנות-מתוכננות בזמן ובכמות הנכונים, תוך התחשבות באסטרטגיית-התכנון (make-to-stock / planning with final assembly).",
      processExampleHe:
        "מתכנן-ביקוש מזין ב-MD61 תחזית של 10,000 יח' מוצר לחודש. דרך release/CIF היא מגיעה ל-PP/DS כדרישת-FA. הרצת PP/DS (heuristic) מזהה חוסר-כיסוי, יוצרת הזמנות-מתוכננות מתוזמנות אחורנית מתאריך-הדרישה, ומקזזת אותן מול הזמנות-לקוח שנכנסות לפי consumption mode.",
      scenarioHe:
        "בארגון תחזית-המכירות של בקבוק 1.5 ליטר נשמרת כ-PIR לכל שבוע-קמפיין. ההעברה ל-PP/DS מאפשרת לתזמן את קווי-המילוי מול הביקוש החזוי; הזמנות-לקוח בפועל מקזזות את ה-PIR לפי backward/forward consumption כך שלא נכפיל את הביקוש.",
      navHe: [
        "SAP Menu ► Logistics ► Production ► Production Planning ► Demand Management ► Planned Independent Requirements ► Create (MD61)",
        "Integration with SAP Components ► APO ► Application-Specific Settings ► Demand Planning / PP-DS ► Transfer of PIRs",
        "Production ► MRP ► Planning ► Define Strategy / Strategy Group",
      ],
      tables: ["PBED", "PBIM", "PBHI", "MARC"],
      tcodes: ["MD61", "MD62", "MD63", "MD73", "/SAPAPO/RRP3"],
      fiori: [],
      configHe: [
        "Strategy Group (MRP3 באב-החומר) קובע את requirements type של ה-PIR ואת לוגיקת-הצריכה.",
        "Consumption Mode + Consumption Periods (backward/forward) באב-החומר — קיזוז PIR מול הזמנות-לקוח.",
        "Integration Model לכלול קטגוריית PIR אם ההעברה דרך CIF; אחרת release מ-Demand Planning.",
        "Planning Version (000 = active) ב-PP/DS אליה משוחררת התחזית.",
      ],
      flow: [
        { he: "הזנת תחזית", code: "MD61", note: "PIR לפי תקופה" },
        { he: "שחרור/CIF ל-PP/DS", code: "release", note: "קטגוריית FA" },
        { he: "Net Requirements", code: "heuristic" },
        { he: "הזמנות-מתוכננות", code: "/SAPAPO/RRP3" },
        { he: "קיזוז מול הזמנות-לקוח", code: "consumption" },
      ],
      masterDataHe: [
        "PBED/PBIM = רשומות-ה-PIR ברמת-חומר/מפעל/תקופה.",
        "MARC: Strategy Group, Consumption Mode, Consumption Periods, Mixed-MRP indicator.",
        "Planning Version + Pegging area ב-liveCache קובעים את הקישור דרישה↔קבלה.",
      ],
      mistakesHe: [
        "Strategy Group שגוי ➔ PIR לא מקזז הזמנות-לקוח ➔ ביקוש כפול.",
        "Consumption Mode/Periods ריקים ➔ אין קיזוז, מתוכנן עודף.",
        "התחזית לא משוחררת ל-Planning Version 000 ➔ PP/DS לא רואה ביקוש.",
        "ערבוב העברת PIR דרך CIF ודרך DP release במקביל ➔ כפילות-דרישה.",
      ],
      troubleshootHe: [
        "PP/DS לא יוצר הזמנות ➔ בדוק שה-PIR קיים ב-Planning Version הפעילה (/SAPAPO/RRP3).",
        "ביקוש כפול ➔ Strategy/Consumption לא מקזזים הזמנות-לקוח מול PIR.",
        "PIR לא עבר ➔ קטגוריה לא סומנה במודל-האינטגרציה או release לא רץ.",
        "תאריכי-דרישה שגויים ➔ planning calendar / period split שגוי ב-MD61.",
      ],
      bestPracticeHe: [
        "בחר מסלול-העברה אחד בלבד ל-PIR (CIF או DP release), לעולם לא שניהם.",
        "התאם Strategy Group ו-Consumption Mode לפי מודל make-to-stock/make-to-order.",
        "בדוק את ה-PIR ב-Product View לפני הרצת-תכנון מלאה.",
        "נהל Planning Version אחת פעילה (000) למניעת בלבול.",
      ],
      interviewHe: [
        { qHe: "מהו PIR ומדוע חשוב להעבירו ל-PP/DS?", aHe: "דרישה-עצמאית-מתוכננת (תחזית-ביקוש); בלעדיה PP/DS לא רואה ביקוש ולא מפיק הזמנות-מתוכננות." },
        { qHe: "מה קובע Strategy Group בהקשר PIR?", aHe: "את requirements type ואת לוגיקת-הצריכה — כיצד הזמנות-לקוח מקזזות את התחזית (make-to-stock מול make-to-order)." },
        { qHe: "מהו Consumption Mode?", aHe: "כיוון הקיזוז (backward/forward) ומספר-הימים שבהם הזמנת-לקוח 'אוכלת' PIR, כדי למנוע ספירת-ביקוש כפולה." },
      ],
      takeawaysHe: [
        "PIR = אות-הביקוש; הוא מניע את כל תכנון-הייצור ב-PP/DS.",
        "מועבר דרך CIF או דרך DP release — לעולם לא שניהם.",
        "Strategy Group + Consumption Mode קובעים קיזוז מול הזמנות-לקוח.",
        "אמת ב-Planning Version הפעילה לפני הרצת-תכנון.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הזמנות-מכירה (4.9)", href: "/library/ppds/chapter-04/#sub-4.9" },
        { labelHe: "אובייקט · PBED", href: "/library/ppds/object/PBED/" },
      ],
    },
    // ============================================================ 4.3
    {
      id: "4.3",
      titleHe: "הזמנות מתוכננות",
      titleEn: "Planned Orders",
      execHe:
        "הזמנה-מתוכננת היא הצעת-קבלה זמנית שה-PP/DS מפיק כדי לכסות ביקוש; היא אינה מחייבת ביצוע עד שמומרת לפק\"ע/הזמנת-רכש. ההזמנות-המתוכננות הן הליבה הדינמית של לוח-התכנון, ועליהן מתבצעות פעולות-התזמון, ה-pegging וה-optimization. ההעברה ההדדית עם ECC מבטיחה שתי המערכות 'מסכימות' על אותה תוכנית.",
      beginnerHe:
        "הזמנה-מתוכננת היא 'תזכורת לייצר' שהמערכת ממציאה כשהיא רואה חוסר. היא עדיין לא הזמנה אמיתית — אפשר להזיז, לשנות או למחוק אותה בחופשיות. כשמאשרים, היא הופכת לפקודת-ייצור אמיתית. בין ECC ל-PP/DS היא צריכה להישאר מסונכרנת כדי ששתי המערכות יראו אותה תמונה.",
      consultantHe:
        "ב-PP/DS הזמנות-מתוכננות (קטגוריית AY/AI ב-liveCache) נוצרות לרוב בתוך PP/DS ומועברות אוטומטית ל-ECC (publish), שם הן נשמרות ב-PLAF. אם נוצרו ב-ECC (MD11/MRP) הן יכולות לעבור דרך CIF ל-PP/DS. ההמרה (Convert to Production Order/Purchase Req) יכולה להתבצע בכל צד; ההגדרה 'where converted' חשובה. שים לב ל-firming (planning time fence, manual firming) — הזמנה firm לא מוזזת בהרצה אוטומטית. Conversion Indicator קובע אם ההזמנה מסומנת להמרה.",
      purposeHe:
        "המטרה: לתחזק שכבת-תכנון גמישה שניתן לאופטם ולתזמן בלי להתחייב למשאבים, ולשמור על סנכרון דו-כיווני בין מנוע-התכנון (PP/DS) למערכת-הביצוע (ECC) כך שהמרה לפק\"ע תשקף את התוכנית המעודכנת.",
      processExampleHe:
        "PP/DS heuristic יוצר הזמנה-מתוכננת ל-5,000 יח', מתזמן אותה על משאב פנוי ומבצע pegging מול ה-PIR. ההזמנה מתפרסמת אוטומטית ל-ECC (PLAF). מתכנן-הייצור ממיר אותה ב-/SAPAPO/RRP3 או ב-MD04 לפק\"ע; ההמרה זורמת חזרה דרך CIF ושתי המערכות מציגות את אותה פק\"ע.",
      scenarioHe:
        "בארגון הזמנות-מתוכננות לקווי-המילוי נוצרות ב-PP/DS, מתוזמנות לפי קיבולת-הקו ורצף-טעמים, ומתפרסמות ל-ECC. שבוע לפני הקמפיין הצוות ממיר אותן לפקודות-ייצור; ה-firming מבטיח ש-PP/DS לא יזיז הזמנות שכבר נכנסו לחלון-הקמפיין הקפוא.",
      navHe: [
        "Demand & Supply ► PP/DS ► Product Planning Table / Product View (/SAPAPO/RRP3)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► Planned Orders ► Publication to ERP",
        "Production ► MRP ► Planning ► Define Conversion of Planned Orders",
      ],
      tables: ["PLAF", "RESB", "MDKP"],
      tcodes: ["MD11", "MD12", "MD04", "/SAPAPO/RRP3", "CO40", "CO41"],
      fiori: [],
      configHe: [
        "Publication setting: היכן הזמנות-מתוכננות מתפרסמות (PP/DS→ERP) ובאיזה Planning Version.",
        "Conversion control: אם ההמרה לפק\"ע מתבצעת ב-PP/DS או ב-ECC; Conversion Indicator.",
        "Firming/Planning Time Fence (MRP1 באב-החומר) — חלון-קיפאון להזמנות-מתוכננות.",
        "Order Type ברירת-מחדל להמרה (CO40/CO41) ופרופיל-תזמון.",
      ],
      flow: [
        { he: "זיהוי חוסר", code: "heuristic" },
        { he: "יצירת הזמנה-מתוכננת", code: "AY/PLAF" },
        { he: "תזמון + pegging", code: "/SAPAPO/RRP3" },
        { he: "פרסום ל-ECC", code: "publish→PLAF" },
        { he: "המרה לפק\"ע", code: "CO40/CO41" },
      ],
      masterDataHe: [
        "PLAF = הזמנות-מתוכננות ב-ECC; RESB = הקצאות-רכיבים שלהן.",
        "MARC: Planning Time Fence, Conversion-relevant settings, Production Version להמרה.",
        "liveCache: סטטוס firm/conversion-flag נשמר ברמת-ההזמנה.",
      ],
      mistakesHe: [
        "המרה כפולה (גם ב-ECC וגם ב-PP/DS) ➔ פקודות-ייצור כפולות.",
        "הזמנות לא firm בחלון-הקפוא ➔ הרצה אוטומטית מזיזה תוכנית מאושרת.",
        "פרסום ל-Planning Version שגויה ➔ ECC לא רואה את ההזמנה.",
        "התעלמות מ-Conversion Indicator ➔ הזמנות לא נבחרות בהמרה המונית.",
      ],
      troubleshootHe: [
        "הזמנה-מתוכננת לא מופיעה ב-ECC ➔ בדוק publication וה-Planning Version.",
        "פקודות כפולות ➔ ההמרה בוצעה בשני הצדדים; קבע צד-המרה יחיד.",
        "הזמנה זזה למרות שאושרה ➔ חסר firming / Planning Time Fence.",
        "המרה המונית מדלגת הזמנות ➔ Conversion Indicator לא מסומן.",
      ],
      bestPracticeHe: [
        "קבע צד-המרה אחד (PP/DS או ECC) בכל הארגון.",
        "השתמש ב-firming/PTF להגן על חלון-תכנון קפוא.",
        "ודא Planning Version עקבית לפרסום ולהמרה.",
        "המר בהמונים דרך Conversion Indicator במקום הזמנה-הזמנה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין הזמנה-מתוכננת לפק\"ע?", aHe: "הזמנה-מתוכננת היא הצעה גמישה לא-מחייבת; פק\"ע היא מסמך-ביצוע המחייב משאבים, חומר ועלות לאחר המרה." },
        { qHe: "היכן נוצרות הזמנות-מתוכננות ב-PP/DS וכיצד מגיעות ל-ECC?", aHe: "נוצרות במנוע-התכנון (liveCache) ומתפרסמות אוטומטית ל-ECC לטבלת PLAF דרך CIF." },
        { qHe: "מה תפקיד ה-firming?", aHe: "לקבע הזמנה כך שהרצת-תכנון אוטומטית לא תזיז או תמחק אותה — חשוב בחלון-הקפוא (Planning Time Fence)." },
      ],
      takeawaysHe: [
        "הזמנה-מתוכננת = הצעת-קבלה גמישה, ליבת לוח-התכנון.",
        "נוצרת ב-PP/DS ומתפרסמת ל-PLAF ב-ECC.",
        "המר בצד אחד בלבד למניעת כפילות.",
        "Firming/PTF מגן על תוכנית מאושרת מהרצה אוטומטית.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · פקודות-ייצור (4.4)", href: "/library/ppds/chapter-04/#sub-4.4" },
        { labelHe: "אובייקט · PLAF", href: "/library/ppds/object/PLAF/" },
      ],
    },
    // ============================================================ 4.4
    {
      id: "4.4",
      titleHe: "פקודות ייצור",
      titleEn: "Production Orders",
      execHe:
        "פקודת-הייצור (Production/Process Order) היא מסמך-הביצוע המחייב משאבים, חומרים ועלות. כש-PP/DS מתכנן מתקדם, פקודות-הייצור הקיימות ב-ECC חייבות לעבור ל-liveCache כ-fixed receipts כדי שהתזמון יתחשב בהן ולא 'ידרוס' עבודה שכבר במהלך. ההעברה הדו-כיוונית שומרת על תמונת-קיבולת אמת.",
      beginnerHe:
        "פקודת-ייצור היא הוראת-עבודה אמיתית: 'ייצר 5,000 יח' על הקו הזה, בתאריך הזה'. כשהמתכנן ב-PP/DS מתזמן, הוא חייב לראות את כל הפקודות שכבר 'תפסו' זמן על המכונה, אחרת יתזמן עבודה חדשה על קו עסוק. לכן מעבירים את הפקודות הקיימות מ-ECC ל-PP/DS.",
      consultantHe:
        "פקודות-ייצור (AFKO/AFPO/AFVC) מועברות דרך CIF ומופיעות ב-liveCache כקטגוריה PP (production order) עם פעולות הממופות למשאבי-PP/DS. הן בדרך-כלל fixed (לא מתוזמנות-מחדש אוטומטית) אך תורמות עומס-קיבולת. סטטוסי-מערכת (REL, CNF, TECO) משפיעים על ה-pegging — פקודה TECO יוצאת מהתכנון. שים לב ל-mapping בין Routing operations למשאבי-PP/DS (דרך PPM/PDS) — אי-התאמה יוצרת שגיאות-CIF. Confirmations (CO11N) מעדכנות progress; ה-PP/DS משקף יתרת-כמות-פתוחה.",
      purposeHe:
        "המטרה: לוודא שמנוע-התכנון רואה את כל הקיבולת התפוסה ע\"י עבודה שכבר שוחררה, מתזמן עבודה חדשה רק על חלונות פנויים, ומשקף את ההתקדמות (confirmations) כך שתכנון-יתרת-הביקוש מדויק.",
      processExampleHe:
        "פק\"ע ב-ECC משוחררת (REL) ומועברת דרך CIF. ב-/SAPAPO/RRP3 היא נראית תופסת את משאב-המכונה לחלון-זמן. דיווח-ביצוע ב-CO11N על 2,000 מתוך 5,000 יח' זורם חזרה; ה-liveCache מקטין את הכמות-הפתוחה ל-3,000 ומתזמן את הנותר על הקיבולת הנותרת.",
      scenarioHe:
        "בארגון פקודות-המילוי המשוחררות בקו עוברות ל-PP/DS כ-fixed; המתכנן רואה את העומס בפועל ומתזמן את הקמפיין הבא רק לחלונות פנויים. דיווחי-CO11N מהקו מעדכנים את יתרת-המילוי ב-liveCache בזמן-אמת.",
      navHe: [
        "SAP Menu ► Logistics ► Production ► Shop Floor Control ► Order ► Create / Change (CO01/CO02)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► In-House Production ► Production Orders",
        "Demand & Supply ► PP/DS ► Detailed Scheduling Planning Board (/SAPAPO/CDPS0)",
      ],
      tables: ["AFKO", "AFPO", "AFVC", "AFRU", "RESB"],
      tcodes: ["CO01", "CO02", "CO11N", "COR1", "COR2", "/SAPAPO/CDPS0"],
      fiori: [],
      configHe: [
        "Integration Model לכלול קטגוריית Production/Process Orders למפעל הרלוונטי.",
        "Order Type + Production Scheduling Profile תואמים בין ECC ל-PP/DS.",
        "Mapping Routing→Resource דרך PPM/PDS — תנאי לתזמון תקין.",
        "Status handling: REL/CNF/TECO; פקודות TECO יוצאות מהתכנון.",
      ],
      flow: [
        { he: "שחרור פק\"ע ב-ECC", code: "CO02→REL" },
        { he: "העברה דרך CIF", code: "qRFC" },
        { he: "fixed receipt ב-liveCache", code: "/SAPAPO/RRP3" },
        { he: "דיווח-ביצוע", code: "CO11N→AFRU" },
        { he: "עדכון יתרה ב-PP/DS", code: "pegging" },
      ],
      masterDataHe: [
        "AFKO/AFPO = כותרת/פריט פק\"ע; AFVC = פעולות; AFRU = דיווחי-ביצוע.",
        "סטטוס-מערכת (REL/CNF/TECO) קובע השתתפות ב-pegging.",
        "PPM/PDS מספק את ה-mapping בין פעולות-Routing למשאבי-PP/DS.",
      ],
      mistakesHe: [
        "פק\"ע ללא mapping למשאב ➔ שגיאת-CIF, לא מתוזמנת.",
        "התעלמות מסטטוס TECO ➔ פקודה סגורה ממשיכה לתפוס קיבולת בתכנון.",
        "פק\"ע נוצרת ב-ECC אך הקטגוריה לא במודל ➔ לא מועברת, קיבולת 'נעלמת' ל-PP/DS.",
        "דיווחי-CO11N לא זורמים ➔ יתרת-כמות-פתוחה שגויה ב-liveCache.",
      ],
      troubleshootHe: [
        "פק\"ע לא נראית ב-PP/DS ➔ קטגוריה לא במודל-אינטגרציה / שגיאת-mapping.",
        "קיבולת כפולה ➔ פק\"ע גם כ-planned order שלא הומר נכון.",
        "כמות-פתוחה שגויה ➔ confirmations (AFRU) תקועים ב-qRFC.",
        "פעולה לא מתוזמנת ➔ Control Key/Resource mapping שגוי ב-PPM/PDS.",
      ],
      bestPracticeHe: [
        "ודא mapping מלא Routing→Resource לפני הפעלת ההעברה.",
        "כלול את דיווחי-הביצוע (confirmations) בזרם-ה-CIF לעדכון יתרות.",
        "טפל ב-TECO/closure כך שפקודות סגורות יוצאות מהתכנון.",
        "נטר SMQ1 לוודא ש-confirmations לא נתקעים.",
      ],
      interviewHe: [
        { qHe: "מדוע מעבירים פקודות-ייצור קיימות ל-PP/DS?", aHe: "כדי שמנוע-התכנון יראה קיבולת תפוסה בפועל ויתזמן עבודה חדשה רק על חלונות פנויים." },
        { qHe: "כיצד דיווח-ביצוע משפיע על PP/DS?", aHe: "CO11N→AFRU זורם דרך CIF ומקטין את הכמות-הפתוחה, כך שה-liveCache מתזמן רק את היתרה." },
        { qHe: "מה קורה לפקודה בסטטוס TECO?", aHe: "היא נחשבת סגורה טכנית ויוצאת מ-pegging/קיבולת ב-PP/DS." },
      ],
      takeawaysHe: [
        "פק\"ע = fixed receipt; תורמת עומס-קיבולת ב-PP/DS.",
        "Mapping Routing→Resource הוא תנאי להעברה תקינה.",
        "Confirmations מעדכנים יתרת-כמות-פתוחה בזמן-אמת.",
        "TECO/closure מוציאים את הפקודה מהתכנון.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הזמנות-מתוכננות (4.3)", href: "/library/ppds/chapter-04/#sub-4.3" },
        { labelHe: "אובייקט · AFKO", href: "/library/ppds/object/AFKO/" },
      ],
    },
    // ============================================================ 4.5
    {
      id: "4.5",
      titleHe: "הזמנות רכש חיצוני",
      titleEn: "External Procurement Orders",
      execHe:
        "הזמנות-רכש-חיצוני (Purchase Requisitions ו-Purchase Orders) מייצגות קבלות-עתידיות מספקים. העברתן ל-PP/DS משלימה את צד-ההיצע: המתכנן רואה לא רק ייצור-פנים אלא גם רכש, ולכן תכנון-הדרישות-נטו מדויק. בלי קבלות-הרכש, PP/DS עלול להמליץ על ייצור עודף או לזהות חוסר-שווא.",
      beginnerHe:
        "חלק מהחומרים אנחנו לא מייצרים אלא קונים מספק. PR היא 'בקשה לקנות' ו-PO היא 'הזמנה אמיתית מספק'. כמו פקודות-ייצור, גם הקבלות-הצפויות האלה צריכות להגיע ל-PP/DS כדי שהמתכנן ידע שחומר 'בדרך' ולא ימליץ לקנות שוב.",
      consultantHe:
        "Purchase Requisitions (EBAN) ו-Purchase Orders (EKKO/EKPO) מועברות דרך CIF כ-receipt elements. PRs שנוצרו ב-PP/DS מתפרסמות ל-ECC; PRs/POs שנוצרו ב-ECC עוברות ל-liveCache כ-fixed. שים לב ל-procurement type (F — external) באב-החומר, ל-Planned Delivery Time ול-GR Processing Time המשפיעים על תאריך-הזמינות. עבור Scheduling Agreements (schedule lines) ההעברה דורשת קטגוריה ייעודית במודל. Confirmations של ספק (inbound delivery) מעדכנות תאריכי-קבלה.",
      purposeHe:
        "המטרה: לתת ל-PP/DS תמונת-היצע מלאה הכוללת רכש-חיצוני, כך שתכנון-הדרישות יזהה כיסוי מספקים ולא יפיק הצעות-רכש/ייצור מיותרות; וכדי שהזמנות-רכש שנוצרות בתכנון יזרמו לביצוע-רכש ב-ECC.",
      processExampleHe:
        "PP/DS מזהה חוסר בחומר-נרכש ויוצר Purchase Requisition; היא מתפרסמת ל-ECC (EBAN). הרכש ממיר אותה ל-PO (ME21N); ה-PO זורמת חזרה דרך CIF ומופיעה כ-fixed receipt עם תאריך לפי Planned Delivery Time. אישור-ספק מעדכן את התאריך, ו-PP/DS מתאם את התכנון.",
      scenarioHe:
        "בארגון תרכיז, פקקים ותוויות נרכשים מספקים. הזמנות-הרכש שלהם עוברות ל-PP/DS כ-fixed receipts; המתכנן רואה מתי יגיעו ומתזמן את הקמפיין מולן. PRs שנוצרות בתכנון זורמות ל-ECC להמרה ל-PO ע\"י הרכש.",
      navHe: [
        "SAP Menu ► Logistics ► Materials Management ► Purchasing ► Purchase Requisition / Order (ME51N/ME21N)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► External Procurement ► Purchase Requisitions/Orders",
        "Production ► MRP ► Procurement Proposals ► External Procurement",
      ],
      tables: ["EBAN", "EKKO", "EKPO", "EKET", "MARC"],
      tcodes: ["ME51N", "ME21N", "ME22N", "ME57", "/SAPAPO/RRP3"],
      fiori: [],
      configHe: [
        "Integration Model לכלול PRs ו/או POs (וקטגוריית Scheduling Agreement אם רלוונטי).",
        "Procurement Type F (external) ו-Special Procurement Key באב-החומר.",
        "Planned Delivery Time + GR Processing Time (MRP2) — בסיס לתאריך-זמינות.",
        "Publication: היכן PR שנוצרת ב-PP/DS מתפרסמת ב-ECC.",
      ],
      flow: [
        { he: "זיהוי חוסר חומר-נרכש", code: "heuristic" },
        { he: "יצירת PR", code: "EBAN", note: "publish ל-ECC" },
        { he: "המרה ל-PO", code: "ME21N" },
        { he: "fixed receipt ב-PP/DS", code: "CIF" },
        { he: "אישור-ספק מעדכן תאריך", code: "EKET" },
      ],
      masterDataHe: [
        "EBAN = PRs; EKKO/EKPO = PO header/item; EKET = schedule lines.",
        "MARC: Procurement Type, Planned Delivery Time, GR Processing Time, SPK.",
        "Source list / Info record קובעים ספק ותנאי-אספקה.",
      ],
      mistakesHe: [
        "PO לא במודל-אינטגרציה ➔ קבלה-צפויה 'נעלמת', PP/DS ממליץ רכש כפול.",
        "Planned Delivery Time ריק ➔ תאריך-קבלה שגוי ➔ תזמון שגוי.",
        "PR שנוצרה ב-PP/DS לא מתפרסמת ➔ הרכש לא רואה אותה.",
        "Procurement Type E במקום F לחומר-נרכש ➔ PP/DS מנסה לייצר.",
      ],
      troubleshootHe: [
        "קבלת-רכש לא נראית ב-PP/DS ➔ קטגוריה לא במודל / שגיאת-CIF.",
        "תאריך-קבלה שגוי ➔ Planned Delivery/GR Time או schedule line שגוי.",
        "רכש כפול ➔ PO קיימת לא הועברה כ-receipt.",
        "PR לא מגיעה ל-ECC ➔ publication setting שגוי.",
      ],
      bestPracticeHe: [
        "כלול PRs ו-POs יחד במודל כדי לסגור את צד-ההיצע.",
        "תחזק Planned Delivery Time מדויק — הוא מזיז תאריכי-תכנון.",
        "קבע צד אחד ליצירת PR (PP/DS) ולהמרה ל-PO (ECC).",
        "נטר אישורי-ספק כדי לשמור על תאריכים מעודכנים.",
      ],
      interviewHe: [
        { qHe: "מדוע להעביר הזמנות-רכש ל-PP/DS?", aHe: "כדי שצד-ההיצע יהיה מלא — PP/DS יראה חומר 'בדרך' מספקים ולא יזהה חוסר-שווא או ימליץ רכש כפול." },
        { qHe: "מה ההבדל בכיוון-ההעברה בין PR ל-PO?", aHe: "PR נוצרת לרוב ב-PP/DS ומתפרסמת ל-ECC; PO נוצרת/מאושרת ב-ECC וזורמת חזרה כ-fixed receipt ל-PP/DS." },
        { qHe: "אילו שדות-אב קובעים את תאריך-הקבלה?", aHe: "Planned Delivery Time ו-GR Processing Time ב-MRP2 של אב-החומר." },
      ],
      takeawaysHe: [
        "רכש-חיצוני = צד-ההיצע הנרכש; משלים את תמונת-ההיצע ב-PP/DS.",
        "PR מתפרסמת ל-ECC; PO זורמת חזרה כ-fixed receipt.",
        "Planned Delivery/GR Time קובעים תאריך-זמינות.",
        "Procurement Type F מסמן חומר-נרכש, לא-מיוצר.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מלאים ואצוות (4.6)", href: "/library/ppds/chapter-04/#sub-4.6" },
        { labelHe: "אובייקט · EKPO", href: "/library/ppds/object/EKPO/" },
      ],
    },
    // ============================================================ 4.6
    {
      id: "4.6",
      titleHe: "מלאים ואצוות",
      titleEn: "Stocks and Batches",
      execHe:
        "המלאי הזמין הוא נקודת-הפתיחה של כל חישוב-דרישות-נטו: כמה כבר יש לפני שמתכננים קבלות. העברת המלאי והאצוות ל-PP/DS חיונית — בלי תמונת-מלאי נכונה, המתכנן יתכנן ייצור/רכש מיותר או יפספס חוסר. עבור תעשיות מנוהלות-אצווה, נתוני-האצווה (תוקף, מאפיינים) משפיעים על זמינות ועל pegging.",
      beginnerHe:
        "לפני שמחליטים כמה לייצר, צריך לדעת כמה כבר במחסן. המלאי הנוכחי עובר ל-PP/DS כ'מצב-פתיחה'. אם מנהלים אצוות (batch) — כל מנה עם מספר ותאריך-תפוגה — גם המידע הזה עובר, כדי שהמערכת לא תתכנן להשתמש באצווה שפג-תוקפה.",
      consultantHe:
        "מלאי (MARD/MCHB ברמת-מחסן/אצווה) מועבר דרך CIF כ-stock category ב-liveCache, מפוצל לפי stock type: unrestricted, QI (quality inspection), blocked. רק stock רלוונטי-ATP נספר כזמין. אצוות (MCH1/MCHA) מועברות עם classification (תוקף/SLED, מאפיינים) המאפשרת shelf-life planning. שים לב — תנועות-מלאי (MIGO 261/101) זורמות בזמן-אמת ומעדכנות את ה-liveCache; פיגור ב-qRFC יוצר תמונת-מלאי לא-עדכנית. Stock types שאינם זמינים (blocked/QI) יוצרים לעיתים תכנון יתר אם נספרים בטעות.",
      purposeHe:
        "המטרה: לספק ל-PP/DS מצב-פתיחה מדויק של מלאי זמין (לפי stock type ו-ATP scope), כולל מידע-אצווה לתכנון-תוקף, כך שחישוב-הדרישות-נטו יפיק רק את הקבלות החסרות באמת.",
      processExampleHe:
        "במחסן 2,000 יח' unrestricted ו-500 ב-QI. ההעברה ל-PP/DS סופרת רק את ה-2,000 כזמין (אם QI מחוץ ל-scope). דרישה ל-3,000 ➔ PP/DS מתכנן קבלה ל-1,000 בלבד. שחרור-QI דרך MIGO מעדכן את ה-liveCache, וה-1,000 מצטמצם בהתאם.",
      scenarioHe:
        "בארגון תרכיז ומים-מטופלים מנוהלי-אצווה עם shelf-life קצר; המלאי והאצוות עוברים ל-PP/DS כך שהמתכנן רואה כמה אצווה זמינה ועד מתי. אצווה שמתקרבת לתפוגה מתעדפת ב-pegging (FEFO), ומלאי QI לא נספר כזמין עד שחרור-QA.",
      navHe: [
        "SAP Menu ► Logistics ► Materials Management ► Inventory Management ► Goods Movement (MIGO)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► Stocks ► Transfer of Stocks/Batches",
        "Production ► MRP ► Availability Check ► Define Scope of Check (stock types)",
      ],
      tables: ["MARD", "MCHB", "MCH1", "MCHA", "MSKA"],
      tcodes: ["MIGO", "MMBE", "MB52", "MSC3N", "/SAPAPO/RRP3"],
      fiori: [],
      configHe: [
        "Integration Model לכלול קטגוריית Stocks (ו-Batches אם נדרש classification).",
        "Scope of Check (OPJJ) קובע אילו stock types נספרים כזמינים (unrestricted/QI/blocked).",
        "Batch management indicator + classification (תוקף/SLED) באב-החומר.",
        "Stock transfer timing — real-time qRFC; ודא queue פעיל.",
      ],
      flow: [
        { he: "מצב-מלאי ב-ECC", code: "MARD/MCHB" },
        { he: "העברה דרך CIF", code: "qRFC" },
        { he: "stock category ב-liveCache", code: "/SAPAPO/RRP3" },
        { he: "ניכוי מדרישות-נטו", code: "net req" },
        { he: "תנועות-מלאי בזמן-אמת", code: "MIGO→update" },
      ],
      masterDataHe: [
        "MARD = מלאי ברמת-מחסן; MCHB = מלאי-אצווה; MCH1/MCHA = אב-אצווה + classification.",
        "MSKA = sales-order stock (אם רלוונטי ל-MTO).",
        "Batch SLED/expiry + characteristics קובעים shelf-life planning ו-FEFO.",
      ],
      mistakesHe: [
        "QI/blocked stock נספר כזמין ➔ תכנון-חסר (מתכנן עם מלאי לא-זמין).",
        "אצווה ללא classification ➔ אין shelf-life planning, תפוגה לא-מנוהלת.",
        "תנועות-מלאי תקועות ב-qRFC ➔ תמונת-מלאי מיושנת.",
        "Stocks לא במודל ➔ PP/DS רואה אפס-מלאי, מתכנן ייצור מלא מיותר.",
      ],
      troubleshootHe: [
        "מלאי לא נראה ב-PP/DS ➔ קטגוריה לא במודל / queue חסום ב-SMQ1.",
        "תכנון-יתר ➔ מלאי לא-זמין (QI/blocked) נספר ב-Scope of Check.",
        "אצווה שפגה משובצת ➔ classification/SLED חסר או pegging לא-FEFO.",
        "תמונת-מלאי מיושנת ➔ תנועות-MIGO לא זורמות; שחרר qRFC.",
      ],
      bestPracticeHe: [
        "הגדר Scope of Check כך שרק stock זמין באמת נספר.",
        "העבר classification של אצווה לתכנון-תוקף (FEFO/shelf-life).",
        "נטר את ה-qRFC כדי לשמור תמונת-מלאי בזמן-אמת.",
        "בדוק את המלאי ב-Product View לפני הרצת-תכנון.",
      ],
      interviewHe: [
        { qHe: "מדוע תמונת-מלאי נכונה קריטית ל-PP/DS?", aHe: "המלאי הוא מצב-הפתיחה של חישוב-הדרישות-נטו; מלאי שגוי מוביל לתכנון-יתר או לפספוס-חוסר." },
        { qHe: "כיצד stock type משפיע על הזמינות?", aHe: "רק stock שב-Scope of Check (לרוב unrestricted) נספר כזמין; QI/blocked לא, אלא אם הוגדרו אחרת." },
        { qHe: "מדוע מעבירים classification של אצווה?", aHe: "כדי לאפשר shelf-life planning (תוקף/SLED) ו-pegging לפי FEFO — לא להשתמש באצווה שפגה." },
      ],
      takeawaysHe: [
        "מלאי = מצב-הפתיחה לחישוב-דרישות-נטו.",
        "Scope of Check קובע אילו stock types זמינים.",
        "אצוות עם classification מאפשרות shelf-life/FEFO.",
        "תנועות-מלאי זורמות בזמן-אמת; נטר qRFC.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מנות-בדיקה (4.7)", href: "/library/ppds/chapter-04/#sub-4.7" },
        { labelHe: "אובייקט · MCHB", href: "/library/ppds/object/MCHB/" },
      ],
    },
    // ============================================================ 4.7
    {
      id: "4.7",
      titleHe: "מנות בדיקה",
      titleEn: "Inspection Lots",
      execHe:
        "מנת-בדיקה (Inspection Lot) נוצרת כשמלאי ממתין לאישור-איכות (QM). מלאי הקשור למנת-בדיקה לרוב יושב כ-QI stock ואינו זמין עד שחרור-שימוש (Usage Decision). העברת מידע מנות-הבדיקה ל-PP/DS חשובה כדי שהמתכנן לא יחשב מלאי-QI כזמין, ויתחשב בזמן-הבדיקה כחלק מ-lead time.",
      beginnerHe:
        "כשמלאי מגיע (מייצור או מספק) הוא לפעמים צריך לעבור בדיקת-איכות לפני שמותר להשתמש בו. כל בדיקה כזו היא 'מנת-בדיקה'. עד שה-QA מאשר, החומר 'תקוע' ולא זמין לייצור. PP/DS צריך לדעת זאת כדי לא להסתמך על מלאי שעדיין לא שוחרר.",
      consultantHe:
        "מנות-בדיקה (QALS) נקשרות לקבלות-מלאי (GR) ולרוב יוצרות QI stock (לא ב-ATP scope). ההעברה ל-PP/DS עצמה לרוב אינה של ה-lot ישירות אלא של ה-QI stock ושל זמן-הבדיקה כ-GR Processing Time / inspection lead time. שים לב — Usage Decision (QA11) שמשחרר ל-unrestricted מעדכן את ה-liveCache דרך תנועת-מלאי. בתעשיות-תהליך מנת-הבדיקה משפיעה על batch valuation והזמינות. לעיתים מגדירים inspection-related lead time ב-PDS כדי שהתזמון יכלול את חלון-הבדיקה.",
      purposeHe:
        "המטרה: לוודא ש-PP/DS מתייחס למלאי-בבדיקה כלא-זמין עד שחרור, וכולל את זמן-הבדיקה בחישוב lead time, כך שתאריכי-הזמינות ריאליים והתכנון אינו מסתמך על מלאי שטרם אושר.",
      processExampleHe:
        "GR של 1,000 יח' מספק יוצר מנת-בדיקה; המלאי נכנס כ-QI. PP/DS לא סופר אותו כזמין. לאחר Usage Decision (QA11) המלאי עובר ל-unrestricted; תנועת-המלאי זורמת דרך CIF, וה-1,000 הופכים זמינים — PP/DS מצמצם בהתאם את הצורך בקבלה נוספת.",
      scenarioHe:
        "בארגון כל אצווה של תרכיז נכנסת ל-QI עד אישור-מעבדה. PP/DS לא משבץ את האצווה לקמפיין לפני Usage Decision; זמן-המעבדה מתוכלל כ-GR/inspection lead time, כך שתאריך-זמינות-התרכיז משקף את חלון-הבדיקה.",
      navHe: [
        "SAP Menu ► Logistics ► Quality Management ► Quality Inspection ► Inspection Lot / Usage Decision (QA11)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► Stocks ► QI Stock Handling",
        "Production ► MRP ► Lead Time Scheduling ► GR Processing / Inspection Time",
      ],
      tables: ["QALS", "QAVE", "MCHB", "MARD"],
      tcodes: ["QA01", "QA11", "QA32", "QA33", "/SAPAPO/RRP3"],
      fiori: [],
      configHe: [
        "Scope of Check (OPJJ): קבע אם QI stock נספר כזמין (לרוב לא).",
        "GR Processing Time / Inspection lead time (MRP2 / PDS) לכלול את חלון-הבדיקה בתזמון.",
        "QM inspection setup באב-החומר (Inspection Type 01/04) הקובע יצירת lot ב-GR.",
        "Stock transfer: Usage Decision מעדכן stock category ב-liveCache.",
      ],
      flow: [
        { he: "GR יוצר מנת-בדיקה", code: "QALS→QI" },
        { he: "QI stock לא-זמין", code: "Scope" },
        { he: "Usage Decision", code: "QA11" },
        { he: "מעבר ל-unrestricted", code: "תנועת-מלאי" },
        { he: "עדכון זמינות ב-PP/DS", code: "CIF" },
      ],
      masterDataHe: [
        "QALS = מנת-בדיקה; QAVE = Usage Decision.",
        "QI stock (MCHB/MARD) מסומן כלא-זמין עד שחרור.",
        "Inspection Type באב-החומר (QM view) קובע יצירת lot ב-GR.",
        "GR/Inspection lead time משפיע על תאריך-זמינות ב-PP/DS.",
      ],
      mistakesHe: [
        "QI stock נספר כזמין ➔ PP/DS מסתמך על מלאי שטרם אושר.",
        "אי-הכללת זמן-בדיקה ב-lead time ➔ תאריכי-זמינות אופטימיים מדי.",
        "Usage Decision לא זורם ל-PP/DS ➔ מלאי-משוחרר עדיין נראה תקוע.",
        "Inspection Type לא מוגדר ➔ אין lot ב-GR, איכות לא נשלטת.",
      ],
      troubleshootHe: [
        "מלאי-QI נספר כזמין ➔ הסר מ-Scope of Check (OPJJ).",
        "מלאי-משוחרר עדיין לא-זמין ב-PP/DS ➔ תנועת-Usage-Decision תקועה ב-qRFC.",
        "תאריך-זמינות לא ריאלי ➔ חסר GR/inspection lead time.",
        "אין מנת-בדיקה ב-GR ➔ Inspection Type לא פעיל באב-החומר.",
      ],
      bestPracticeHe: [
        "הוצא QI stock מ-Scope of Check אלא אם נדרש אחרת.",
        "שקלל זמן-בדיקה ב-GR/inspection lead time לתאריכים ריאליים.",
        "נטר את זרם-תנועות-ה-Usage-Decision ב-SMQ1.",
        "תאם בין QM ל-PP על הזמן הנדרש לבדיקה לכל חומר-קריטי.",
      ],
      interviewHe: [
        { qHe: "כיצד מנת-בדיקה משפיעה על זמינות ב-PP/DS?", aHe: "המלאי הקשור יושב כ-QI ואינו נספר ב-ATP scope עד Usage Decision, כך ש-PP/DS לא מסתמך עליו." },
        { qHe: "כיצד שחרור-QA מגיע ל-PP/DS?", aHe: "Usage Decision (QA11) יוצר תנועת-מלאי QI→unrestricted שזורמת דרך CIF ומעדכנת את ה-liveCache." },
        { qHe: "מדוע לכלול זמן-בדיקה ב-lead time?", aHe: "כדי שתאריך-הזמינות ב-PP/DS יכלול את חלון-הבדיקה ולא יהיה אופטימי מדי." },
      ],
      takeawaysHe: [
        "מלאי-QI = לא-זמין עד Usage Decision.",
        "הוצא QI מ-Scope of Check כדי למנוע תכנון-חסר.",
        "Usage Decision מעדכן זמינות ב-PP/DS דרך תנועת-מלאי.",
        "שקלל זמן-בדיקה ב-lead time לתאריכים ריאליים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מלאים ואצוות (4.6)", href: "/library/ppds/chapter-04/#sub-4.6" },
        { labelHe: "אובייקט · QALS", href: "/library/ppds/object/QALS/" },
      ],
    },
    // ============================================================ 4.8
    {
      id: "4.8",
      titleHe: "הזמנות תחזוקה",
      titleEn: "Maintenance Orders",
      execHe:
        "הזמנת-תחזוקה (PM Order) חוסמת זמינות-משאב לתחזוקה מתוכננת או תקלה. כש-PP/DS מתזמן ייצור על משאבים, עליו לדעת מתי משאב לא-זמין בגלל תחזוקה — אחרת יתזמן עבודה על מכונה שתהיה בטיפול. העברת חלונות-התחזוקה כ-downtime היא חיונית לתזמון ריאלי.",
      beginnerHe:
        "מכונות צריכות תחזוקה — לפעמים מתוכננת (כל שבוע) ולפעמים תקלה פתאומית. בזמן הזה הקו לא יכול לייצר. PP/DS צריך לדעת על חלונות-התחזוקה האלה כדי לא לתזמן ייצור בדיוק כשהמכונה מושבתת לטיפול.",
      consultantHe:
        "הזמנות-תחזוקה (AUFK/AFIH ב-PM) אינן מועברות כ-receipts אלא משפיעות על זמינות-המשאב. לרוב מתורגמות ל-downtime intervals של המשאב ב-PP/DS (resource downtimes) או דרך אינטגרציית PM-PP. שים לב — ה-mapping בין Equipment/Work Center של PM למשאב-PP/DS חייב להיות עקבי. תחזוקה מתוכננת (preventive) ניתנת לטעינה מראש כ-planned downtime; תקלה (breakdown) דורשת עדכון real-time של זמינות-המשאב. ב-S/4HANA אינטגרציית PM-PP מאפשרת לשקף הזמנות-תחזוקה כחלונות-אי-זמינות בלוח-התכנון.",
      purposeHe:
        "המטרה: לשקף ב-PP/DS את חלונות אי-הזמינות של משאבים עקב תחזוקה, כך שהתזמון לא ישבץ ייצור על מכונה מושבתת, וכדי לתאם בין תוכנית-התחזוקה לתוכנית-הייצור על אותם משאבים.",
      processExampleHe:
        "הזמנת-PM מתוכננת לקו-מילוי ביום ג' 08:00–12:00. החלון מתורגם ל-resource downtime ב-PP/DS; כשה-heuristic מתזמן את הקמפיין, הוא מדלג על החלון הזה ומשבץ את הייצור לפניו או אחריו. תקלה פתאומית (breakdown order) מעדכנת את זמינות-המשאב בזמן-אמת ומחייבת rescheduling.",
      scenarioHe:
        "בארגון ניקוי-CIP שבועי של קו-המילוי מנוהל כהזמנת-PM מונעת; החלון משוקף כ-downtime ב-PP/DS כך שלוח-הקמפיינים לא משבץ מילוי בזמן-הניקוי. תקלת-משאבה בלתי-מתוכננת חוסמת מיידית את הקו ומחייבת תזמון-מחדש של הקמפיין.",
      navHe: [
        "SAP Menu ► Logistics ► Plant Maintenance ► Maintenance Processing ► Order ► Create / Change (IW31/IW32)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► Resources ► Downtime / PM Integration",
        "Demand & Supply ► PP/DS ► Resource ► Maintain Resource Downtimes (/SAPAPO/RES01)",
      ],
      tables: ["AUFK", "AFIH", "AFKO", "CRHD"],
      tcodes: ["IW31", "IW32", "IW38", "/SAPAPO/RES01", "/SAPAPO/CDPS0"],
      fiori: [],
      configHe: [
        "Mapping Work Center/Equipment (PM) ↔ Resource (PP/DS) — בסיס לשיקוף downtime.",
        "Resource downtime intervals (/SAPAPO/RES01) — planned maintenance windows.",
        "PM-PP integration setting להזרמת הזמנות-תחזוקה כחלונות אי-זמינות.",
        "Breakdown handling — עדכון זמינות real-time ו-trigger ל-rescheduling.",
      ],
      flow: [
        { he: "הזמנת-תחזוקה ב-PM", code: "IW31" },
        { he: "תרגום לחלון-אי-זמינות", code: "downtime" },
        { he: "שיקוף במשאב-PP/DS", code: "/SAPAPO/RES01" },
        { he: "תזמון מדלג על החלון", code: "heuristic" },
        { he: "תקלה ➔ rescheduling", code: "real-time" },
      ],
      masterDataHe: [
        "AUFK/AFIH = הזמנת-תחזוקה PM; CRHD = Work Center/Equipment.",
        "Resource (PP/DS) ממופה ל-Work Center של PM/PP.",
        "Downtime intervals ב-liveCache קובעים זמינות-משאב.",
      ],
      mistakesHe: [
        "אי-שיקוף תחזוקה ➔ PP/DS משבץ ייצור על מכונה מושבתת.",
        "Mapping שגוי Equipment↔Resource ➔ ה-downtime נופל על משאב לא-נכון.",
        "תקלה לא מעדכנת זמינות ➔ תוכנית לא-ריאלית עד תזמון-מחדש ידני.",
        "תחזוקה מונעת לא נטענת מראש ➔ הפתעות-קיבולת חוזרות.",
      ],
      troubleshootHe: [
        "ייצור משובץ בזמן-תחזוקה ➔ downtime לא שוקף או mapping שגוי.",
        "downtime על משאב-לא-נכון ➔ בדוק Equipment↔Resource mapping.",
        "תקלה לא משפיעה על התכנון ➔ אין breakdown handling/real-time update.",
        "חלונות-תחזוקה כפולים ➔ נטענו גם ידנית וגם דרך אינטגרציה.",
      ],
      bestPracticeHe: [
        "תחזק mapping עקבי בין PM Work Center/Equipment למשאבי-PP/DS.",
        "טען תחזוקה-מונעת מראש כ-planned downtime.",
        "הגדר breakdown handling ל-rescheduling אוטומטי.",
        "תאם תכנון-תחזוקה ותכנון-ייצור על אותם משאבים בתיאום שבועי.",
      ],
      interviewHe: [
        { qHe: "כיצד הזמנת-תחזוקה משפיעה על PP/DS?", aHe: "היא חוסמת זמינות-משאב (downtime) כך שהתזמון לא משבץ ייצור על מכונה בטיפול." },
        { qHe: "במה שונה תחזוקה מונעת מתקלה בהקשר התכנון?", aHe: "מונעת נטענת מראש כ-planned downtime; תקלה דורשת עדכון real-time של זמינות ו-rescheduling." },
        { qHe: "מה תנאי-הסף לשיקוף תקין?", aHe: "mapping עקבי בין Work Center/Equipment של PM למשאב-PP/DS." },
      ],
      takeawaysHe: [
        "הזמנת-תחזוקה = downtime, לא receipt.",
        "Mapping Equipment↔Resource הוא תנאי-סף לשיקוף.",
        "תחזוקה מונעת מראש; תקלה ב-real-time עם rescheduling.",
        "תיאום תחזוקה-ייצור מונע שיבוץ על משאב מושבת.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · פקודות-ייצור (4.4)", href: "/library/ppds/chapter-04/#sub-4.4" },
        { labelHe: "אובייקט · AUFK", href: "/library/ppds/object/AUFK/" },
      ],
    },
    // ============================================================ 4.9
    {
      id: "4.9",
      titleHe: "הזמנות מכירה",
      titleEn: "Sales Orders",
      execHe:
        "הזמנת-מכירה (Sales Order) היא ביקוש-לקוח ממשי. במודלים make-to-order ובבדיקות-זמינות מתקדמות (gATP), העברת הזמנות-המכירה ל-PP/DS חיונית — הן מקזזות PIRs, מפעילות תכנון, ולעיתים מתוזמנות ישירות מול קיבולת. בלי העברתן, PP/DS אינו רואה את הביקוש-בפועל ולא יכול להבטיח תאריכי-אספקה ריאליים.",
      beginnerHe:
        "כשלקוח מזמין, נוצרת הזמנת-מכירה. במודל 'ייצור-להזמנה' (make-to-order) הזמנה זו היא בעצם הצורך לייצר. PP/DS צריך לראות אותה כדי לתכנן ייצור מולה ולהבטיח ללקוח תאריך-אספקה. ההזמנה גם 'מקזזת' את התחזית — אם כבר מכרנו, לא צריך גם לתכנן את אותה כמות כתחזית.",
      consultantHe:
        "הזמנות-מכירה (VBAK/VBAP/VBEP) מועברות דרך CIF כקטגוריית-דרישה (BM/sales requirement) ב-liveCache. ב-make-to-order נוצר sales-order stock segment ייעודי (pegging מבודד). הזמנות מקזזות PIRs לפי consumption logic. שים לב — gATP/aATP (Advanced ATP) מבצע בדיקת-זמינות מול ה-liveCache בעת יצירת ההזמנה, כולל CTP (Capable-to-Promise) ו-product/allocation checks. Requirements Type (מ-Strategy Group) קובע אם ההזמנה make-to-stock או make-to-order ואת אופן-ה-pegging.",
      purposeHe:
        "המטרה: להזרים ביקוש-לקוח ממשי ל-PP/DS כדי לקזז תחזית, להניע תכנון-ייצור (במיוחד MTO), ולאפשר בדיקות-זמינות מתקדמות (gATP/CTP) שמבטיחות ללקוח תאריך-אספקה ריאלי מבוסס-קיבולת.",
      processExampleHe:
        "לקוח מזמין 1,000 יח' make-to-order; ה-gATP בודק מול ה-liveCache, מפעיל CTP ומתזמן הזמנה-מתוכננת על משאב פנוי, ומחזיר תאריך-אספקה מחויב. ההזמנה זורמת ל-PP/DS כדרישת-BM עם sales-order stock segment; הייצור מתוכנן ומיועד בלעדית ללקוח זה.",
      scenarioHe:
        "בארגון הזמנות make-to-stock של רשתות-קמעונאות מקזזות את ה-PIR של המשקה; הזמנה גדולה make-to-order לאריזה ייחודית מפעילה gATP/CTP שמתזמן את קו-המילוי ומחזיר תאריך-אספקה מבוסס-קיבולת ללקוח.",
      navHe: [
        "SAP Menu ► Logistics ► Sales and Distribution ► Sales ► Order ► Create / Change (VA01/VA02)",
        "Integration with SAP Components ► APO ► Settings for Transfer ► Sales Orders ► Requirements Transfer",
        "Advanced Planning ► Global ATP ► Maintain Check Instructions / CTP",
      ],
      tables: ["VBAK", "VBAP", "VBEP", "MSKA"],
      tcodes: ["VA01", "VA02", "VA03", "CO09", "/SAPAPO/RRP3"],
      fiori: [],
      configHe: [
        "Integration Model לכלול קטגוריית Sales Orders למפעל/ארגון-המכירות.",
        "Requirements Type / Strategy Group (MTO 20/MTS 10) קובע pegging וקיזוז.",
        "gATP / aATP Check Instructions + CTP setting לבדיקת-זמינות מתקדמת.",
        "Sales-order stock segment ל-make-to-order (pegging מבודד).",
      ],
      flow: [
        { he: "יצירת הזמנת-לקוח", code: "VA01" },
        { he: "בדיקת gATP/CTP", code: "liveCache" },
        { he: "העברה כדרישת-BM", code: "CIF" },
        { he: "קיזוז PIR / תכנון", code: "consumption" },
        { he: "תאריך-אספקה מחויב", code: "confirm" },
      ],
      masterDataHe: [
        "VBAK/VBAP/VBEP = כותרת/פריט/schedule lines של הזמנת-מכירה.",
        "MSKA = sales-order stock (make-to-order).",
        "Strategy Group → Requirements Type קובע MTS/MTO ו-pegging.",
        "Availability/Checking Group + Check Instructions ל-gATP.",
      ],
      mistakesHe: [
        "Requirements Type שגוי ➔ MTO מתנהג כ-MTS (אין pegging מבודד).",
        "הזמנות לא מקזזות PIR ➔ ביקוש כפול (תחזית+הזמנה).",
        "gATP לא מוגדר ➔ תאריך-אספקה לא מבוסס-קיבולת.",
        "Sales Orders לא במודל-אינטגרציה ➔ PP/DS עיוור לביקוש-בפועל.",
      ],
      troubleshootHe: [
        "ביקוש כפול ➔ קיזוז PIR-הזמנה לא פועל (Strategy/consumption).",
        "תאריך-אספקה לא ריאלי ➔ gATP/CTP לא פעיל או scope שגוי.",
        "MTO ללא מלאי-מיועד ➔ Requirements Type לא make-to-order.",
        "הזמנה לא ב-PP/DS ➔ קטגוריה לא במודל / שגיאת-CIF.",
      ],
      bestPracticeHe: [
        "התאם Requirements Type/Strategy Group למודל MTS/MTO.",
        "הפעל gATP/CTP לתאריכי-אספקה מבוססי-קיבולת.",
        "ודא קיזוז תקין PIR↔הזמנה למניעת ביקוש כפול.",
        "אמת את ההזמנה ב-Product View וב-pegging לפני התחייבות.",
      ],
      interviewHe: [
        { qHe: "מתי הכרחי להעביר הזמנות-מכירה ל-PP/DS?", aHe: "ב-make-to-order ובבדיקות gATP/CTP — אז ההזמנה מניעה תכנון-ייצור וקובעת תאריך-אספקה מבוסס-קיבולת." },
        { qHe: "כיצד הזמנת-מכירה מקזזת PIR?", aHe: "לפי consumption logic של Strategy Group — ההזמנה 'אוכלת' את התחזית כדי למנוע ספירת-ביקוש כפולה." },
        { qHe: "מהו CTP?", aHe: "Capable-to-Promise — בדיקת-זמינות שמתזמנת בפועל מול קיבולת ב-liveCache ומחזירה תאריך-אספקה מחויב." },
      ],
      takeawaysHe: [
        "הזמנת-מכירה = ביקוש-בפועל; מקזזת PIR ומניעה תכנון.",
        "MTO יוצר sales-order stock segment עם pegging מבודד.",
        "gATP/CTP מבטיח תאריך-אספקה מבוסס-קיבולת.",
        "Requirements Type קובע MTS/MTO ואת אופן-הקיזוז.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · דרישות-עצמאיות-מתוכננות (4.2)", href: "/library/ppds/chapter-04/#sub-4.2" },
        { labelHe: "אובייקט · VBAP", href: "/library/ppds/object/VBAP/" },
      ],
    },
    // ============================================================ 4.10
    {
      id: "4.10",
      titleHe: "קמפיין ייצור",
      titleEn: "Production Campaign",
      execHe:
        "קמפיין-ייצור (Production Campaign) הוא קיבוץ של מספר הזמנות לאותו מוצר/קבוצת-מוצרים לרצף-ייצור אחד, כדי לחסוך setup וניקוי בין מנות. ב-PP/DS הקמפיין הוא ישות-תכנון המאחדת הזמנות ומנהלת את עלויות-המעבר. בתעשיות-תהליך זהו מנגנון-ליבה לאופטימיזציית רצף ולמינימום זמני-החלפה.",
      beginnerHe:
        "במקום לייצר מוצר, לנקות, לעבור למוצר אחר ולנקות שוב — מקבצים את כל ההזמנות של אותו מוצר ומייצרים ברצף אחד ארוך. זה 'קמפיין'. כך חוסכים את זמני-הניקוי וההחלפה היקרים שביניהם. PP/DS מנהל את הקיבוץ הזה ואת רצף-הקמפיינים.",
      consultantHe:
        "Production Campaign ב-PP/DS מקבצת orders של מוצר משותף עם setup/cleanout משותף בתחילה ובסוף (campaign setup/cleanout). היא מנוהלת בלוח-התכנון המפורט (/SAPAPO/CDPS0) ובאמצעות campaign-specific master data. שים לב ל-setup matrix ולמשאב — הקמפיין ממזער מעברים לפי setup groups/keys. בתעשיית-תהליך הקמפיין נשען על PP-PI process orders; ההעברה ל-ECC יוצרת/מקשרת הזמנות-תהליך לקמפיין. ה-block planning ו-campaign requirements הם מנגנונים משלימים.",
      purposeHe:
        "המטרה: למקסם יעילות ייצור ע\"י קיבוץ הזמנות לרצף-קמפיין אחד, מינימום זמני setup/ניקוי בין מנות, וניהול עלויות-מעבר — קריטי בתעשיות-תהליך עם זמני-החלפה ארוכים ויקרים.",
      processExampleHe:
        "במקום שלוש הזמנות נפרדות לאותו טעם-משקה (כל אחת עם setup+cleanout), PP/DS מקבץ אותן לקמפיין יחיד: setup פעם אחת בתחילה, ייצור-רצף, cleanout פעם אחת בסוף. ה-setup matrix מבטיח שהקמפיין הבא יהיה הטעם הקרוב ביותר (בהיר→כהה) למינימום-ניקוי.",
      scenarioHe:
        "בארגון קמפיין-מילוי מקבץ את כל ההזמנות לטעם 'תפוז' לשבוע אחד ברצף; הניקוי-CIP מתבצע פעם אחת בתחילת-הקמפיין ובסופו. רצף-הקמפיינים נקבע לפי setup matrix (בהיר לכהה, ללא-אלרגן לפני אלרגן) למינימום זמני-החלפה ושטיפה.",
      navHe: [
        "Demand & Supply ► PP/DS ► Detailed Scheduling ► Production Campaign (/SAPAPO/CDPS0)",
        "Advanced Planning ► PP/DS ► Maintain Setup Matrix / Setup Groups",
        "Integration with SAP Components ► APO ► Settings for Transfer ► Process Orders ► Campaign Link",
      ],
      tables: ["AFKO", "CRHD", "RESB"],
      tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CMDS_PROD", "COR1", "CORK"],
      fiori: [],
      configHe: [
        "Setup Matrix + Setup Groups/Keys למינימום זמני-מעבר בקמפיין.",
        "Campaign setup/cleanout orders — בתחילת ובסוף הרצף.",
        "Resource setup-relevant + block planning settings בלוח-המפורט.",
        "Process Order link ל-ECC עבור הזמנות-הקמפיין (PP-PI).",
      ],
      flow: [
        { he: "קיבוץ הזמנות לאותו מוצר", code: "campaign" },
        { he: "campaign setup בתחילה", code: "setup" },
        { he: "ייצור-רצף", code: "/SAPAPO/CDPS0" },
        { he: "cleanout בסוף", code: "cleanout" },
        { he: "קישור הזמנות-תהליך ל-ECC", code: "COR1" },
      ],
      masterDataHe: [
        "Setup Matrix קובע זמני-מעבר בין setup groups על המשאב.",
        "Resource (PP/DS) setup-relevant מחזיק את מצב-ה-setup הנוכחי.",
        "Process Orders (AFKO) מקושרות לקמפיין בצד-ECC.",
      ],
      mistakesHe: [
        "ללא setup matrix ➔ רצף-קמפיינים לא-אופטימלי, ניקויים מיותרים.",
        "פיצול קמפיין מיותר ➔ setup/cleanout כפולים.",
        "קישור הזמנות-תהליך שגוי ל-ECC ➔ ביצוע לא תואם לתכנון-הקמפיין.",
        "התעלמות מ-cleanout בסוף-קמפיין ➔ זיהום-צולב בין טעמים.",
      ],
      troubleshootHe: [
        "זמני-החלפה גבוהים ➔ setup matrix חסר/שגוי או רצף לא-אופטימלי.",
        "קמפיין מתפצל שלא-לצורך ➔ אילוצי-משאב/תוקף קוטעים את הרצף.",
        "ביצוע לא תואם תכנון ➔ קישור Process Order לקמפיין שגוי.",
        "זיהום-צולב ➔ חסר campaign cleanout בין טעמים מתנגשים.",
      ],
      bestPracticeHe: [
        "תחזק setup matrix מדויק (בהיר→כהה, ללא-אלרגן→אלרגן).",
        "מקסם אורך-קמפיין מול גמישות-ביקוש לאיזון נכון.",
        "ודא campaign setup/cleanout בתחילה ובסוף הרצף.",
        "סנכרן את קישור הזמנות-התהליך ל-ECC עם תכנון-הקמפיין.",
      ],
      interviewHe: [
        { qHe: "מהו Production Campaign ומה יתרונו?", aHe: "קיבוץ הזמנות לאותו מוצר לרצף-ייצור אחד, חוסך setup/cleanout בין מנות — קריטי בתעשיות-תהליך." },
        { qHe: "כיצד נקבע רצף-הקמפיינים?", aHe: "לפי setup matrix/setup groups שממזער זמני-מעבר (למשל בהיר→כהה, ללא-אלרגן→אלרגן)." },
        { qHe: "כיצד הקמפיין מתחבר ל-ECC?", aHe: "הזמנות-התהליך (PP-PI) מקושרות לקמפיין; ההעברה יוצרת/מקשרת אותן בצד-הביצוע." },
      ],
      takeawaysHe: [
        "קמפיין = רצף-ייצור מקובץ לחיסכון setup/ניקוי.",
        "Setup matrix קובע רצף-מעברים אופטימלי.",
        "campaign setup/cleanout בתחילה ובסוף בלבד.",
        "מנגנון-ליבה לתעשיות-תהליך (PP-PI).",
      ],
      relatedHe: [
        { labelHe: "PP/DS · פקודות-ייצור (4.4)", href: "/library/ppds/chapter-04/#sub-4.4" },
        { labelHe: "PP/DS · אינטגרציה גמישה (4.11)", href: "/library/ppds/chapter-04/#sub-4.11" },
      ],
    },
    // ============================================================ 4.11
    {
      id: "4.11",
      titleHe: "נתוני-תנועה עם אינטגרציה גמישה",
      titleEn: "Transaction Data with Flexible Integration",
      execHe:
        "Flexible Integration מאפשרת להעביר נתוני-תנועה ל-PP/DS באופן סלקטיבי ומותאם — לא 'הכל-או-כלום' אלא לפי כללים, סטטוסים או קריטריונים עסקיים. זהו מנגנון מתקדם המאזן בין כיסוי-תכנון מלא לבין ביצועי-liveCache, ומאפשר תרחישים היברידיים שבהם חלק מהאובייקטים מתוכננים-מתקדם וחלק נשארים ב-ECC.",
      beginnerHe:
        "במקום להעביר ל-PP/DS את כל ההזמנות מסוג מסוים, אפשר להעביר רק חלק לפי כלל — למשל 'רק הזמנות במפעל מסוים' או 'רק שמעל סכום מסוים'. זו 'אינטגרציה גמישה': מעבירים בדיוק מה שצריך לתכנון-המתקדם, ומשאירים את השאר ב-ECC. כך ה-liveCache לא מתמלא בנתונים מיותרים.",
      consultantHe:
        "Flexible Integration נשענת על Integration Model מורחב ועל פילטרים/exits (למשל BAdI לבחירת-אובייקטים, או selection criteria מתקדמים ב-CFM1). היא מאפשרת תרחיש שבו חומר מסוים מתוכנן ב-PP/DS אך הזמנות מסוימות שלו נשארות ב-ECC, או העברה מבוססת-סטטוס. שים לב ל-consistency — כל אובייקט שמועבר חלקית חייב להישאר עקבי דרך /SAPAPO/CCR. מנגנון זה דורש תכנון-זהיר של ה-pegging areas וה-planning scope כדי שלא ייווצרו 'חורים' בתמונת-התכנון.",
      purposeHe:
        "המטרה: להעניק שליטה דקה על מה מועבר ל-PP/DS — לאזן בין כיסוי-תכנון לביצועים, לתמוך בתרחישים היברידיים (חלק PP/DS חלק ECC), ולמנוע הצפת-liveCache בנתונים שאינם רלוונטיים לתכנון-המתקדם.",
      processExampleHe:
        "ארגון מתכנן-מתקדם רק מוצרי-Premium. דרך Flexible Integration, מודל-האינטגרציה מסנן ומעביר ל-PP/DS רק הזמנות של מוצרי-Premium לפי קריטריון; הזמנות מוצרי-Standard נשארות ב-ECC עם MRP רגיל. בדיקת /SAPAPO/CCR מאשרת שאין אי-עקביות בין מה שעבר למה שלא.",
      scenarioHe:
        "בארגון רק קווי-המילוי הצוואר-בקבוק (high-speed) מתוכננים ב-PP/DS עם detailed scheduling; קווי-משנה איטיים נשארים ב-ECC. Flexible Integration מעבירה סלקטיבית רק את הזמנות-קווי-הליבה, שומרת על liveCache רזה ותמונת-תכנון ממוקדת.",
      navHe: [
        "Integration with SAP Components ► APO ► Basic Settings for Data Transfer ► Activate Online Transfer Using BTE",
        "SAP Menu ► CIF ► Integration Model ► Create with Selection Criteria (CFM1)",
        "Integration with SAP Components ► APO ► Enhancements ► BAdI: Filter Objects for Transfer",
      ],
      tables: ["CIF_IMOD", "TRFCQOUT", "MARC"],
      tcodes: ["CFM1", "CFM2", "/SAPAPO/CCR", "/SAPAPO/C1", "SE19"],
      fiori: [],
      configHe: [
        "CFM1 עם Selection Criteria מתקדמים (מפעל/חומר/סטטוס/קריטריון עסקי).",
        "BAdI/exit לבחירת-אובייקטים סלקטיבית (filter objects for transfer).",
        "Planning scope / pegging areas מותאמים לתרחיש ההיברידי.",
        "/SAPAPO/CCR לאימות-עקביות לאחר כל שינוי-מודל.",
      ],
      flow: [
        { he: "הגדרת קריטריון-בחירה", code: "CFM1" },
        { he: "סינון אובייקטים (BAdI)", code: "filter" },
        { he: "העברה סלקטיבית", code: "CIF" },
        { he: "תמונת-תכנון חלקית", code: "PP/DS" },
        { he: "בדיקת-עקביות", code: "/SAPAPO/CCR" },
      ],
      masterDataHe: [
        "CIF_IMOD מחזיק את ה-Integration Model עם הקריטריונים.",
        "Selection criteria/BAdI logic קובעים אילו אובייקטים נכללים.",
        "pegging areas/planning scope צריכים להיות עקביים עם הסינון.",
      ],
      mistakesHe: [
        "סינון לא-עקבי ➔ 'חורים' בתמונת-התכנון (דרישה בלי קבלה או להפך).",
        "BAdI לא-מתועד ➔ קושי לתחזק ולדבג מה הועבר.",
        "אי-הרצת /SAPAPO/CCR אחרי שינוי-קריטריון ➔ אי-עקביות לא-מזוהה.",
        "תרחיש היברידי בלי תכנון pegging ➔ תכנון כפול בין PP/DS ל-ECC.",
      ],
      troubleshootHe: [
        "אובייקטים חסרים ב-PP/DS ➔ קריטריון-בחירה צר מדי / BAdI חוסם.",
        "אי-עקביות ➔ הרץ /SAPAPO/CCR והשווה ECC↔liveCache.",
        "תכנון כפול ➔ אובייקט מתוכנן גם ב-PP/DS וגם ב-MRP של ECC.",
        "התנהגות לא-צפויה ➔ BAdI logic לא-מתועד; בדוק SE19.",
      ],
      bestPracticeHe: [
        "תעד היטב כל קריטריון/BAdI של אינטגרציה גמישה.",
        "ודא עקביות-pegging בין מה שמועבר למה שלא.",
        "הרץ /SAPAPO/CCR לאחר כל שינוי-קריטריון.",
        "הימנע מהיברידיות מיותרת — סבך רק היכן שהביצועים מצדיקים.",
      ],
      interviewHe: [
        { qHe: "מהי Flexible Integration ומתי משתמשים בה?", aHe: "העברה סלקטיבית של נתוני-תנועה ל-PP/DS לפי קריטריון/BAdI, לאיזון כיסוי-תכנון מול ביצועים ולתרחישים היברידיים." },
        { qHe: "מה הסיכון העיקרי בה?", aHe: "'חורים' או אי-עקביות בתמונת-התכנון — לכן חובה /SAPAPO/CCR ותכנון-pegging זהיר." },
        { qHe: "כיצד מסננים אובייקטים מעבר ל-selection criteria?", aHe: "דרך BAdI/exit 'filter objects for transfer' (SE19) המוסיף לוגיקה עסקית לבחירה." },
      ],
      takeawaysHe: [
        "אינטגרציה גמישה = העברה סלקטיבית מבוססת-כללים.",
        "מאזנת כיסוי-תכנון מול ביצועי-liveCache.",
        "מאפשרת תרחישים היברידיים PP/DS↔ECC.",
        "דורשת /SAPAPO/CCR ותכנון-pegging זהיר למניעת חורים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הפעלת אינטגרציה (4.1)", href: "/library/ppds/chapter-04/#sub-4.1" },
        { labelHe: "PP/DS · אתחול והעברה-חוזרת (4.12)", href: "/library/ppds/chapter-04/#sub-4.12" },
      ],
    },
    // ============================================================ 4.12
    {
      id: "4.12",
      titleHe: "אתחול והעברה-חוזרת של נתוני-תנועה ל-PP/DS",
      titleEn: "Initial Transfer and Retransfer of Transaction Data to PP/DS",
      execHe:
        "Initial Transfer הוא ה-load הראשוני שממלא את ה-liveCache בכל נתוני-התנועה הקיימים בעת הפעלת המודל; Retransfer הוא העברה-חוזרת לתיקון-אי-עקביות או לאחר שחזור. שני אלה הם נקודות-הכניסה והתחזוקה של תמונת-התכנון — initial transfer מבוצע פעם אחת בהפעלה, ו-retransfer לפי הצורך כשמתגלות אי-התאמות בין ECC ל-liveCache.",
      beginnerHe:
        "כשמפעילים את הצינור (CIF) בפעם הראשונה, צריך 'למלא' את PP/DS בכל מה שכבר קיים — כל ההזמנות, המלאי וכו'. זה ה-Initial Transfer. אם מאוחר יותר מגלים שמשהו לא תואם בין שתי המערכות (למשל אחרי תקלה), מריצים Retransfer כדי לשלוח שוב את הנתונים ולתקן.",
      consultantHe:
        "Initial Transfer מתבצע באקטיבציה של ה-Integration Model (CFM2) — כל האובייקטים התואמים-לפילטר נשלחים ב-batch ל-liveCache. Retransfer מתבצע ידנית/מתוזמן, לרוב לאחר שגיאת-CIF, restart או שחזור-DB. הכלי המרכזי לזיהוי-פערים הוא /SAPAPO/CCR (CIF Comparison/Reconciliation) שמשווה ECC↔liveCache ומאפשר תיקון אוטומטי או ידני של אי-עקביות. שים לב — לפני retransfer יש לפעמים לבצע delta report (/SAPAPO/CCR) ולבחור object types לתיקון. בעיות נפוצות: queues תקועים (SMQ1/SMQ2), inconsistencies ב-pegging, ו-object locks. /SAPAPO/OM17 בודק עקביות-liveCache פנימית.",
      purposeHe:
        "המטרה: למלא את ה-liveCache בתמונת-תנועה מלאה בעת ההפעלה (initial), ולשמור על עקביות מתמשכת בין ECC ל-PP/DS (retransfer + CCR) — כך שהמתכנן תמיד עובד על נתונים נכונים ועדכניים, גם אחרי תקלות.",
      processExampleHe:
        "באקטיבציה (CFM2) כל ההזמנות-המתוכננות, הפקודות והמלאי הקיימים נשלחים ל-liveCache (initial transfer). שבועות אחר-כך, queue תקוע גורם לפער; /SAPAPO/CCR מזהה 12 הזמנות חסרות ב-liveCache, והמתכנן מריץ retransfer/reconcile שמשלים אותן ומחזיר עקביות.",
      scenarioHe:
        "בארגון עם עליית-PP/DS לאוויר, ה-initial transfer ממלא את ה-liveCache בכל פקודות-המילוי והמלאי הפתוחים. בכל בוקר רץ /SAPAPO/CCR כבקרת-שגרה; אם מתגלה פער (למשל אחרי תחזוקת-מערכת), הצוות מריץ retransfer ממוקד לאובייקטים החסרים בלבד.",
      navHe: [
        "SAP Menu ► CIF ► Integration Model ► Activate (CFM2) — Initial Transfer",
        "Advanced Planning ► APO Administration ► Integration ► CIF Comparison/Reconciliation (/SAPAPO/CCR)",
        "Advanced Planning ► APO Administration ► liveCache ► Consistency Check (/SAPAPO/OM17)",
      ],
      tables: ["CIF_IMOD", "TRFCQOUT", "TRFCQIN", "ARFCSSTATE"],
      tcodes: ["CFM2", "/SAPAPO/CCR", "/SAPAPO/OM17", "SMQ1", "SMQ2", "CFG1"],
      fiori: [],
      configHe: [
        "Initial Transfer מופעל אוטומטית באקטיבציית-המודל (CFM2).",
        "/SAPAPO/CCR — השוואת ECC↔liveCache לפי object type; reconcile אוטומטי/ידני.",
        "/SAPAPO/OM17 — בדיקת-עקביות פנימית של ה-liveCache.",
        "Queue monitoring (SMQ1/SMQ2/CFG1) — שחרור queues תקועים לפני retransfer.",
      ],
      flow: [
        { he: "אקטיבציית-מודל", code: "CFM2" },
        { he: "Initial Transfer ל-liveCache", code: "batch" },
        { he: "זיהוי-פער", code: "/SAPAPO/CCR" },
        { he: "שחרור queues", code: "SMQ1/SMQ2" },
        { he: "Retransfer/Reconcile", code: "/SAPAPO/CCR" },
      ],
      masterDataHe: [
        "CIF_IMOD = מודל פעיל; initial transfer נגזר ממנו.",
        "TRFCQOUT/TRFCQIN/ARFCSSTATE = מצב ה-qRFC queues.",
        "liveCache pegging/anchor objects חייבים להיות עקביים אחרי טעינה.",
      ],
      mistakesHe: [
        "retransfer גורף במקום ממוקד ➔ עומס-מערכת מיותר.",
        "אי-שחרור queues תקועים לפני retransfer ➔ הפער חוזר מיד.",
        "התעלמות מ-/SAPAPO/CCR שגרתי ➔ אי-עקביות מצטברת לא-מזוהה.",
        "initial transfer לפני שנתוני-האב מלאים ➔ אובייקטים נדחים.",
      ],
      troubleshootHe: [
        "פער ECC↔liveCache ➔ הרץ /SAPAPO/CCR, נתח לפי object type, reconcile.",
        "queues תקועים ➔ SMQ1/SMQ2; שחרר/חזור-על SYSFAIL לפני retransfer.",
        "אי-עקביות-liveCache פנימית ➔ /SAPAPO/OM17.",
        "אובייקטים לא נטענים ב-initial ➔ נתוני-אב חסרים או פילטר שגוי.",
      ],
      bestPracticeHe: [
        "הרץ /SAPAPO/CCR כבקרת-שגרה יומית.",
        "בצע retransfer ממוקד (object type/חומר) ולא גורף.",
        "שחרר queues תקועים לפני כל retransfer.",
        "ודא נתוני-אב מלאים לפני initial transfer של נתוני-תנועה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Initial Transfer ל-Retransfer?", aHe: "Initial הוא ה-load הראשוני באקטיבציה (CFM2); Retransfer הוא העברה-חוזרת לתיקון-אי-עקביות או אחרי תקלה/שחזור." },
        { qHe: "מהו /SAPAPO/CCR ומתי משתמשים בו?", aHe: "כלי-השוואה (CIF Comparison/Reconciliation) בין ECC ל-liveCache; משמש לזיהוי ולתיקון אי-עקביות, אידיאלי כבקרת-שגרה." },
        { qHe: "מה בודקים לפני retransfer?", aHe: "ש-queues (SMQ1/SMQ2) אינם תקועים ושנתוני-האב מלאים, אחרת הפער יחזור מיד." },
      ],
      takeawaysHe: [
        "Initial Transfer ממלא את ה-liveCache באקטיבציה (CFM2).",
        "Retransfer מתקן אי-עקביות לאחר תקלה/שחזור.",
        "/SAPAPO/CCR הוא כלי-העל לעקביות ECC↔liveCache.",
        "שחרר queues ובצע retransfer ממוקד, לא גורף.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הפעלת אינטגרציה (4.1)", href: "/library/ppds/chapter-04/#sub-4.1" },
        { labelHe: "אובייקט · CIF_IMOD", href: "/library/ppds/object/CIF_IMOD/" },
      ],
    },
    // ============================================================ 4.13
    {
      id: "4.13",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את העברת נתוני-התנועה מ-ECC ל-PP/DS דרך CIF: הפעלת-האינטגרציה, ואז כל קטגוריית-תנועה — PIRs, הזמנות-מתוכננות, פקודות-ייצור, רכש-חיצוני, מלאים ואצוות, מנות-בדיקה, הזמנות-תחזוקה, הזמנות-מכירה, קמפיינים — ולבסוף האינטגרציה-הגמישה והאתחול/ההעברה-החוזרת. המסר המרכזי: PP/DS מתכנן רק על מה שמועבר ל-liveCache, והעקביות מול ECC היא תנאי-הסף להחלטות-תכנון נכונות.",
      beginnerHe:
        "למדנו שכל מה שקורה בפועל ב-ECC — הזמנות, מלאי, תחזוקה — צריך לעבור דרך 'הצינור' (CIF) ל-PP/DS כדי שהמתכנן יראה תמונה אמיתית. ראינו איך כל סוג-נתון עובר, מה חשוב בכל אחד, ואיך בודקים שהכל תואם בין שתי המערכות (/SAPAPO/CCR). אם הצינור פתוח נכון והנתונים עקביים — התכנון מדויק.",
      consultantHe:
        "אינטגרציית נתוני-התנועה היא עמוד-השדרה של תרחיש PP/DS תקין. נקודות-המפתח: (1) הפעל אינטגרציה סלקטיבית (CFM1/CFM2) והפרד מודל-אב ממודל-תנועה; (2) ודא תמונת-היצע מלאה (planned/production orders + רכש) ותמונת-ביקוש מלאה (PIRs + sales orders) עם קיזוז נכון; (3) נהל זמינות-מלאי לפי stock type ו-Scope of Check, כולל QI ואצוות; (4) שקלל downtime מתחזוקה ו-setup מקמפיינים בתזמון; (5) השתמש ב-Flexible Integration לאיזון ביצועים; (6) בצע initial transfer מבוקר ושמור עקביות מתמשכת דרך /SAPAPO/CCR ו-/SAPAPO/OM17. כשל בכל אחד מאלה מתבטא בתכנון שגוי או בתאריכי-אספקה לא-ריאליים.",
      purposeHe:
        "המטרה: לקשור את כל קטגוריות-התנועה לתמונת-תכנון אחת עקבית ב-liveCache, ולהפנים שתחזוקת-העקביות (CIF + CCR) היא תהליך מתמשך, לא אירוע חד-פעמי.",
      processExampleHe:
        "מחזור-חיים מלא: הפעלת-מודל → initial transfer של מלאי+הזמנות → הזרמת PIRs והזמנות-מכירה (ביקוש) → תכנון שמפיק הזמנות-מתוכננות → המרה לפק\"ע → דיווחי-ביצוע ותנועות-מלאי חוזרים → /SAPAPO/CCR יומי לשמירת-עקביות. כל שלב נשען על העברה תקינה של נתוני-התנועה.",
      scenarioHe:
        "בארגון: קווי-המילוי מתוכננים-מתקדם רק לאחר שכל נתוני-התנועה — מלאי-תרכיז (כולל QI ואצוות), פקודות-מילוי פתוחות, תחזית ו-הזמנות-רשתות — זורמים נכון ל-liveCache, התחזוקה-המונעת משוקפת כ-downtime, והקמפיינים מקובצים לפי setup matrix. /SAPAPO/CCR הבוקרי מבטיח שתוכנית-הקמפיינים נשענת על מציאות.",
      navHe: [
        "SAP Menu ► CIF ► Integration Model (CFM1/CFM2)",
        "Advanced Planning ► APO Administration ► Integration ► /SAPAPO/CCR",
        "Demand & Supply ► PP/DS ► Product View / Detailed Scheduling (/SAPAPO/RRP3, /SAPAPO/CDPS0)",
      ],
      tables: ["CIF_IMOD", "PLAF", "AFKO", "MARD", "VBAP"],
      tcodes: ["CFM1", "CFM2", "/SAPAPO/CCR", "/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
      fiori: [],
      configHe: [
        "הפרדת מודל Master Data ממודל Transaction Data.",
        "Scope of Check + Consumption + Requirements Type מוגדרים נכון לכל חומר.",
        "/SAPAPO/CCR כבקרת-עקביות מתוזמנת.",
        "Setup matrix + resource downtimes משולבים בתזמון.",
      ],
      flow: [
        { he: "הפעלת-אינטגרציה", code: "CFM1/CFM2" },
        { he: "העברת ביקוש+היצע+מלאי", code: "CIF" },
        { he: "תכנון ב-PP/DS", code: "/SAPAPO/RRP3" },
        { he: "ביצוע חוזר ל-ECC", code: "CO11N/MIGO" },
        { he: "עקביות מתמשכת", code: "/SAPAPO/CCR" },
      ],
      masterDataHe: [
        "כל קטגוריות-התנועה מתכנסות ל-liveCache כתמונת-תכנון אחת.",
        "עקביות ECC↔liveCache היא תנאי-הסף לכל החלטת-תכנון.",
        "נתוני-אב תקינים הם תנאי-קדם להעברת-תנועה תקינה.",
      ],
      mistakesHe: [
        "התייחסות לעקביות כאירוע חד-פעמי ולא כתהליך מתמשך.",
        "תמונת-היצע או ביקוש חלקית ➔ תכנון שגוי שיטתי.",
        "התעלמות מ-downtime/setup ➔ תזמון לא-ריאלי.",
        "הזנחת /SAPAPO/CCR ➔ אי-עקביות מצטברת שקטה.",
      ],
      troubleshootHe: [
        "תכנון שגוי שיטתי ➔ בדוק שלמות תמונת-ההיצע/ביקוש ב-liveCache.",
        "תאריכים לא-ריאליים ➔ lead times, downtime או setup לא משוקפים.",
        "פערים חוזרים ➔ queues תקועים; שלב /SAPAPO/CCR + SMQ1 בשגרה.",
        "אובייקטים חסרים ➔ קטגוריה לא במודל או נתוני-אב חסרים.",
      ],
      bestPracticeHe: [
        "ראה את העקביות (CIF+CCR) כתהליך-תפעול מתמשך.",
        "ודא שלמות ביקוש+היצע+מלאי לפני שמסיקים מסקנות-תכנון.",
        "שלב downtime ו-setup בתזמון לקבלת תמונה ריאלית.",
        "תעד את מבנה מודלי-האינטגרציה והקריטריונים שלהם.",
      ],
      interviewHe: [
        { qHe: "מהו המסר המרכזי של העברת נתוני-התנועה ל-PP/DS?", aHe: "PP/DS מתכנן רק על מה שמועבר ל-liveCache; עקביות מלאה ועדכנית מול ECC היא תנאי-הסף לכל החלטת-תכנון נכונה." },
        { qHe: "מהן שלוש הקטגוריות שמרכיבות תמונת-תכנון מלאה?", aHe: "ביקוש (PIRs + sales orders), היצע (planned/production orders + רכש) ומלאי (stocks/batches, בניכוי QI) — בתוספת downtime/setup לתזמון." },
        { qHe: "כיצד שומרים עקביות לאורך-זמן?", aHe: "באמצעות /SAPAPO/CCR כבקרת-שגרה, ניטור queues (SMQ1) ו-retransfer ממוקד בעת-הצורך." },
      ],
      takeawaysHe: [
        "PP/DS מתכנן רק על מה שב-liveCache — העברה מלאה היא קריטית.",
        "תמונת-תכנון = ביקוש + היצע + מלאי, עם קיזוז נכון.",
        "downtime (תחזוקה) ו-setup (קמפיינים) חייבים להשתקף בתזמון.",
        "עקביות (CIF + /SAPAPO/CCR) היא תהליך מתמשך, לא אירוע.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הפעלת אינטגרציה (4.1)", href: "/library/ppds/chapter-04/#sub-4.1" },
        { labelHe: "PP/DS · אתחול והעברה-חוזרת (4.12)", href: "/library/ppds/chapter-04/#sub-4.12" },
      ],
    },
  ],
};
