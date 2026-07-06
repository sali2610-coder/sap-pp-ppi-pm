import type { TextbookChapter } from "./types";

// ===== EWM Digital Textbook — Chapter 8 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly: 8.1 → 8.2 (8.2.1, 8.2.2) → 8.3.
// Transformative Hebrew (beginner + consultant friendly); SAP identifiers verbatim EN.

export const CH8: TextbookChapter = {
  n: 8,
  titleHe: "בריאות, בטיחות וסביבה (EHS)",
  titleEn: "Environmental Health and Safety",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב SAP EHS Management עם תהליכי המחסן ב-SAP EWM. כל תת-פרק הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. ההקשר העסקי הוא מפעל מילוי של Example Product: קליטה, אחסון ושינוע של חומרים מסוכנים — CO2 בלחץ גבוה וכימיקלי-ניקוי (חומצות/בסיסים ל-CIP) — לצד המשקאות עצמם. המטרה: ללמוד כיצד EHS שולב בקבלת-טובין ובהוצאת-טובין, dangerous goods check, hazardous substance master ו-/SCWM/* EHS integration — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 8.1
    {
      id: "8.1",
      titleHe: "סקירת בריאות, בטיחות וסביבה",
      titleEn: "Overview of Environmental Health Safety",
      execHe:
        "SAP EHS Management הוא הפתרון של SAP לניהול בריאות, בטיחות וסביבה — מסיווג חומרים מסוכנים (dangerous goods, hazardous substances), דרך הערכת-סיכונים, ניטור-תקריות ועד עמידה ברגולציה. כאשר הוא משולב עם SAP EWM, כל תנועת-מלאי במחסן (קבלה, אחסון, ליקוט, הוצאה) נבדקת מול נתוני-הבטיחות של החומר. זהו מנגנון מניעת-תקלות: הוא חוסם תהליכים שמפרים חוקי-הובלה או כללי-אחסון לפני שהם קורים, ובכך מגן על העובדים, על הסביבה ועל רישיון-ההפעלה של הארגון.",
      beginnerHe:
        "דמיין שכל חומר במחסן נושא 'תעודת-בטיחות' — האם הוא דליק, רעיל, תחת-לחץ, מאכל? EHS הוא המודול ששומר את התעודות האלה ובודק אותן. כשמקבלים סחורה או שולחים אותה, המערכת שואלת: 'האם מותר לאחסן את זה כאן? האם מותר לשלוח את זה בכביש? האם העובד מוסמך לטפל בזה?'. אם משהו לא תקין — המערכת מתריעה או חוסמת. בלי זה, חומר מסוכן עלול להגיע למקום הלא-נכון או למשאית הלא-מתאימה, וזה מסוכן ולא-חוקי.",
      consultantHe:
        "SAP EHS Management מורכב ממספר אבני-בניין: hazardous substance master (נתוני-החומר המסוכן, מקושר ל-Material Master), dangerous goods master (סיווג להובלה לפי ADR/IMDG/IATA), specification database (EHS Specifications — value assignments, phrases, identifiers), ו-compliance checks המוטמעים בתהליכי הלוגיסטיקה. בארכיטקטורת S/4HANA, EHS יושב באותה מערכת או מחובר דרך integration. ב-SAP EWM, ה-/SCWM/* EHS integration קורא לבדיקות אלה בנקודות-ההחלטה של ה-warehouse process: ב-Inbound Delivery (קבלה), בקביעת ה-storage bin (אחסון), וב-Outbound Delivery (הוצאה ושינוע). שדה-מפתח: dangerous goods indicator באב-החומר וה-hazardous substance flag — אם אינם מתוחזקים, הבדיקות 'שקטות' והחומר עובר ללא בקרה. הבחנה קריטית: dangerous goods עוסק בהובלה (transport), ואילו hazardous substance עוסק באחסון ובחשיפה-תעסוקתית (storage & occupational exposure) — שני עולמות שצריך לתחזק שניהם.",
      purposeHe:
        "המטרה כפולה: ציות (compliance) ובטיחות (safety). מצד הציות — לעמוד ברגולציות הובלה (ADR/IMDG/IATA), אחסון חומרים-מסוכנים, ודיווח-סביבתי, ולהימנע מקנסות ומהשבתת-רישיון. מצד הבטיחות — למנוע אחסון לא-תואם (storage incompatibility), חשיפת-עובדים, ותקריות. EHS הופך כללי-בטיחות ממסמכים שיושבים במגירה למנגנון-אכיפה חי בתוך כל תנועת-מלאי.",
      processExampleHe:
        "מגיע משלוח חומצה הידרוכלורית למחסן. ב-Inbound Delivery, ה-/SCWM/* EHS integration מזהה שהחומר נושא hazardous substance flag, מושך את ה-hazardous substance master, ובודק האם ה-storage type/section אליו מתוכננת ההכנסה תואם את מחלקת-האחסון של החומצה. במקביל dangerous goods check אימת שתעודת-ההובלה והאריזה תואמות ADR. אם ה-bin המתוכנן נמצא ליד חומר בלתי-תואם (למשל בסיס) — המערכת חוסמת את ה-putaway ומנתבת ל-storage section נפרד.",
      scenarioHe:
        "בארגון המחסן מטפל בשני סוגי חומרים-מסוכנים מרכזיים: גלילי CO2 בלחץ גבוה (gas under pressure, ADR class 2) המשמשים לקרבונציה, וכימיקלי-CIP — חומצות ובסיסים לניקוי קווי-המילוי (corrosive, ADR class 8). EHS מבטיח שה-CO2 מאוחסן באזור מאוורר ומופרד-אש, ושהחומצות והבסיסים מאוחסנים בתאים נפרדים (storage section) כדי למנוע תגובה מסוכנת. המשקאות המוגמרים עצמם אינם hazardous, כך שהמחסן מנהל מסלולי-תהליך מקבילים: רגיל למשקה, ומבוקר-EHS לחומרי-העזר.",
      navHe: [
        "SAP EHS Management ► Foundation for EHS Management ► Specify Environment, Health, and Safety Settings",
        "SAP EHS Management ► Product Compliance ► Dangerous Goods Management ► Basic Data and Master Data",
        "SAP EHS Management ► Industrial Hygiene and Safety ► Master Data ► Hazardous Substance Management",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► EHS Integration ► Activate EHS Checks in Warehouse Processes",
      ],
      tables: ["DGTMD", "ESTDGN", "ESTMJ", "ESTRH", "ESTVH", "/SCWM/ORDIM_O"],
      tcodes: ["CG02", "CG12", "DGP1", "DGR1", "/SCWM/MON", "/SCWM/PRDI"],
      fiori: ["F2660", "F3089", "F1990"],
      configHe: [
        "EHS Settings (SPRO): הפעלת רכיבי Dangerous Goods Management ו-Industrial Hygiene & Safety, והגדרת regulatory lists (ADR/IMDG/IATA).",
        "EHS Integration in EWM: הפעלת dangerous goods check ו-hazardous substance check בתהליכי המחסן (Inbound/Outbound/Putaway).",
        "Storage section determination: שיוך מחלקות-אחסון (storage hazard classes) ל-storage types/sections, בסיס ל-incompatibility checks.",
        "Dangerous goods master maintenance: סיווג לפי תקנה, UN number, packing group, ו-transport-relevant indicators.",
      ],
      mistakesHe: [
        "אי-תחזוק dangerous goods indicator / hazardous substance flag באב-החומר — הבדיקות 'שקטות' והחומר עובר ללא בקרה.",
        "בלבול בין dangerous goods (הובלה) ל-hazardous substance (אחסון/חשיפה) — תחזוקת אחד והזנחת השני.",
        "הפעלת בדיקות-EHS ב-EWM בלי שהוגדר storage section determination — בדיקות נכשלות או חוסמות הכול.",
        "הסתמכות על מסמכי-בטיחות ידניים במקום על ה-master data — אין אכיפה בזמן-אמת.",
      ],
      troubleshootHe: [
        "החומר עבר putaway ל-bin לא-תואם ➔ בדוק שה-hazardous substance flag מתוחזק ושה-storage section determination מוגדר.",
        "dangerous goods check לא נורה ב-Outbound ➔ dangerous goods indicator חסר, או EHS integration לא הופעל לתהליך זה.",
        "המערכת חוסמת כל תנועה של חומר תקין ➔ regulatory list או storage hazard class הוגדרו שגוי.",
        "אי-התאמה בין נתוני-EHS לאב-החומר ➔ Material Master לא מקושר ל-EHS Specification (specification-material assignment).",
      ],
      bestPracticeHe: [
        "תחזק את שני העולמות במקביל: dangerous goods master (הובלה) + hazardous substance master (אחסון).",
        "קשר כל חומר-מסוכן ל-EHS Specification אחת והגדר value assignments ברורים (סיווג, אריזה, אחסון).",
        "הפעל את ה-/SCWM/* EHS integration בכל שלושת השלבים: Inbound, Putaway, Outbound — לא רק באחד.",
        "נהל storage hazard classes ומטריצת-תאימות (incompatibility matrix) כחלק מעיצוב-המחסן, לא כתוספת מאוחרת.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין dangerous goods ל-hazardous substance ב-SAP EHS Management?", aHe: "dangerous goods עוסק בבטיחות-ההובלה (transport — ADR/IMDG/IATA, UN number, packing group); hazardous substance עוסק בבטיחות-האחסון ובחשיפה-תעסוקתית (storage incompatibility, occupational exposure). חומר יכול להיות שניהם, וצריך לתחזק את שני סטי-הנתונים." },
        { qHe: "כיצד SAP EWM יודע שחומר מסוים מסוכן?", aHe: "דרך ה-dangerous goods indicator וה-hazardous substance flag באב-החומר, המקושרים ל-EHS master data. ה-/SCWM/* EHS integration קורא אותם בנקודות-ההחלטה של תהליכי-המחסן." },
        { qHe: "מהי מטרת ה-EHS integration ב-EWM?", aHe: "להפוך כללי-בטיחות-ורגולציה ממסמכים סטטיים למנגנון-אכיפה חי — חסימה או התרעה בזמן-אמת בקבלה, באחסון ובהוצאה, כדי למנוע תקריות והפרות-ציות לפני שהן קורות." },
      ],
      takeawaysHe: [
        "SAP EHS Management מנהל dangerous goods (הובלה) ו-hazardous substance (אחסון) ומשולב ב-EWM דרך /SCWM/* EHS integration.",
        "הבדיקות נשענות על master data — בלי dangerous goods indicator / hazardous substance flag אין אכיפה.",
        "המטרה כפולה: ציות-רגולטורי ובטיחות-עובדים, באכיפה בזמן-אמת על כל תנועת-מלאי.",
        "בארגון: CO2 בלחץ (class 2) וכימיקלי-CIP (class 8) הם החומרים-המסוכנים המנוהלים לצד המשקאות.",
      ],
      relatedHe: [
        { labelHe: "EWM · קבלת והוצאת טובין עם EHS (8.2)", href: "/library/wm/chapter-08/#sub-8.2" },
        { labelHe: "EWM · תהליך כניסה (8.2.1)", href: "/library/wm/chapter-08/#sub-8.2.1" },
      ],
    },
    // ============================================================ 8.2
    {
      id: "8.2",
      titleHe: "תהליך קבלת והוצאת טובין באמצעות SAP EHS Management",
      titleEn: "Goods Receipt and Goods Issue Process Using SAP EHS Management",
      execHe:
        "זהו לב-הפרק: כיצד בדיקות SAP EHS Management מוטמעות בתוך שני תהליכי-הליבה של המחסן — Goods Receipt (קבלה) ו-Goods Issue (הוצאה). בכל אחד מהם, ה-/SCWM/* EHS integration מפעיל dangerous goods check ו-hazardous substance check בנקודות-החלטה קריטיות: בקבלה — לפני אישור ה-putaway; בהוצאה — לפני אישור ה-loading והשינוע. התוצאה היא ששרשרת-המחסן כולה הופכת ל'מודעת-בטיחות': כל פריט מנותב, מאוחסן ונשלח רק אם הוא עומד בכללי-הבטיחות והרגולציה החלים עליו.",
      beginnerHe:
        "במחסן יש שני כיוונים: סחורה נכנסת (קבלה) וסחורה יוצאת (הוצאה). בכל כיוון, אם החומר מסוכן, EHS 'עוצר ובודק'. בקבלה הוא שואל: 'לאן מותר לשים את זה?'. בהוצאה הוא שואל: 'מותר לשלוח את זה ככה, באריזה הזו, במשאית הזו?'. אם הכול תקין — התהליך ממשיך כרגיל. אם לא — המערכת מתריעה או חוסמת. זה כמו מאבטח בכניסה וביציאה של המחסן, רק שהוא בודק בטיחות-חומרים במקום אנשים.",
      consultantHe:
        "ברמת-המימוש, ה-EHS checks אינם תהליך נפרד אלא נקודות-בדיקה (check points) המוטמעות ב-warehouse process. בצד ה-Inbound, ה-Inbound Delivery (/SCWM/PRDI) מפעיל hazardous substance check בקביעת ה-storage type/section — מנגנון ה-storage section determination בודק התאמת מחלקת-האחסון של החומר ל-bin המוצע, ו-incompatibility checks מונעים שכנות מסוכנת. בצד ה-Outbound, ה-Outbound Delivery (/SCWM/PRDO) מפעיל dangerous goods check לפני loading — אימות UN number, packing group, ותעודות-הובלה מול הרגולציה הרלוונטית. הזרימה נשלטת על-ידי ה-EHS integration switches ב-SPRO, וה-check results נרשמים ומוצגים ב-/SCWM/MON. שדות-מפתח: dangerous goods indicator, hazardous substance flag, storage hazard class — שלושתם חייבים להיות מתוחזקים כדי שהבדיקות יפעלו ולא יהיו 'שקטות'.",
      purposeHe:
        "לשבץ את הבטיחות בתוך זרימת-העבודה ולא לצדה. במקום בקרה ידנית או ביקורת בדיעבד, EHS מבצע בקרה מובנית בזמן-אמת בשתי הנקודות-הקריטיות ביותר: כניסת-חומר (היכן לאחסן) ויציאת-חומר (כיצד לשלוח). כך נמנעים אחסון לא-תואם ושינוע לא-חוקי כבר ברגע-ההתרחשות.",
      processExampleHe:
        "משלוח כימיקלי-CIP מגיע למחסן (Inbound). hazardous substance check מנתב את הבסיס ל-storage section נפרד מהחומצות. בהמשך-היום, הזמנת-לקוח דורשת משלוח גליל CO2 ללקוח (Outbound). לפני ה-loading, dangerous goods check מאמת שהגליל מסומן UN 1013, packing group מתאים, ושתעודת-ההובלה (ADR transport document) מצורפת. רק לאחר שני האישורים — הסחורה נכנסת ויוצאת.",
      scenarioHe:
        "בארגון התהליך מאחד את שני הכיוונים סביב אותם חומרים: בקבלה (Inbound) מגיעים גלילי-CO2 וכימיקלי-CIP מספקים, ו-EHS מנתב אותם לאזורי-אחסון מבוקרים-ומופרדים; בהוצאה (Outbound) נשלחים בעיקר משקאות (לא-מסוכנים) אך גם גלילי-CO2 ריקים-להחזרה וכימיקלים-עודפים, וכאן dangerous goods check מבטיח שינוע-תקין. כך אותו מחסן מריץ מסלול 'רגיל' למשקה ומסלול 'מבוקר-EHS' לחומרי-העזר, בשני הכיוונים.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► EHS Integration ► Activate EHS Checks for Inbound/Outbound",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Strategies ► Storage Type Search ► EHS-Relevant Storage Section Determination",
        "SAP EHS Management ► Product Compliance ► Dangerous Goods Management ► Dangerous Goods Checks ► Define Check Schema and Check Methods",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Monitoring ► Warehouse Management Monitor ► EHS Check Results",
      ],
      tables: ["/SCWM/ORDIM_O", "/SCWM/ORDIM_C", "DGTMD", "ESTMJ", "/SCWM/T331"],
      tcodes: ["/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/MON", "DGP1", "CG02"],
      fiori: ["F2660", "F0617", "F3089"],
      configHe: [
        "EHS Integration switches: הפעלת dangerous goods check ו-hazardous substance check בנפרד לכל תהליך (Inbound vs Outbound).",
        "Check schema (Dangerous Goods): רצף שיטות-בדיקה — UN number, packing group, mode-of-transport, תעודות נדרשות.",
        "Storage section determination: כללים הקושרים storage hazard class של החומר ל-storage section מותר, בסיס ל-incompatibility.",
        "Reaction control: הגדרת תגובת-המערכת לכשל-בדיקה — error (חסימה) מול warning (התרעה) לכל נקודת-בדיקה.",
      ],
      flow: [
        { he: "קליטת Inbound Delivery", code: "/SCWM/PRDI", note: "זיהוי hazardous substance flag" },
        { he: "hazardous substance check (אחסון)", note: "התאמת storage hazard class ל-section" },
        { he: "incompatibility check", note: "מניעת שכנות מסוכנת ב-bin" },
        { he: "Putaway מאושר", code: "/SCWM/ORDIM_C" },
        { he: "Outbound Delivery + פיקינג", code: "/SCWM/PRDO" },
        { he: "dangerous goods check (הובלה)", note: "UN number + packing group + תעודות" },
        { he: "Loading & Goods Issue", note: "רק לאחר אישור EHS" },
      ],
      masterDataHe: [
        "Material Master: dangerous goods indicator + hazardous substance flag — תנאי-סף להפעלת הבדיקות.",
        "dangerous goods master (DGTMD): UN number, ADR/IMDG/IATA classification, packing group, transport-relevant data.",
        "hazardous substance master (ESTMJ ועוד): storage hazard class, exposure data, value assignments, phrases.",
        "Storage type/section: storage hazard classes מותרים — בסיס ל-storage section determination ו-incompatibility matrix.",
      ],
      mistakesHe: [
        "הפעלת dangerous goods check ל-Outbound אך לא hazardous substance check ל-Inbound (או להפך) — חצי-בקרה.",
        "הגדרת reaction = warning בלבד לכשל קריטי — העובד 'מדלג' על ההתרעה והחומר עובר.",
        "חוסר-סנכרון בין storage hazard class באב-החומר לבין ה-sections המוגדרים — בדיקות נכשלות-שווא.",
        "התעלמות מ-incompatibility בין כימיקלי-CIP (חומצה מול בסיס) — אחסון בתא משותף.",
      ],
      troubleshootHe: [
        "putaway אושר ל-bin לא-תואם ➔ storage section determination לא מתייחס ל-storage hazard class, או ה-flag חסר באב-החומר.",
        "Goods Issue עבר בלי dangerous goods check ➔ EHS integration ל-Outbound לא הופעל, או dangerous goods indicator חסר.",
        "בדיקה חוסמת חומר תקין ➔ check schema או regulatory list שגויים; בדוק UN number ו-packing group ב-DGTMD.",
        "תוצאות-בדיקה לא נראות ➔ הצג EHS check results ב-/SCWM/MON; ודא שהבדיקות מתועדות ולא מדוכאות.",
      ],
      bestPracticeHe: [
        "הפעל EHS checks בשני הכיוונים ובכל נקודות-ההחלטה — Inbound, Putaway, Outbound.",
        "השתמש ב-error (חסימה) לכשלים קריטיים-לבטיחות ו-warning רק להערות-מידע.",
        "תחזק incompatibility matrix מפורשת לחומרי-הארגון (CO2, חומצה, בסיס) ובדוק אותה בקבלה.",
        "נטר את EHS check results ב-/SCWM/MON כחלק משגרת-הבקרה היומית של מנהל-המחסן.",
      ],
      interviewHe: [
        { qHe: "באילו נקודות בתהליך-המחסן מופעלות בדיקות EHS?", aHe: "בקבלה (Inbound Delivery /SCWM/PRDI) — hazardous substance check לקביעת אחסון תואם; באחסון (Putaway) — incompatibility check; ובהוצאה (Outbound Delivery /SCWM/PRDO) — dangerous goods check לפני loading. כולן מוטמעות בתוך ה-warehouse process דרך ה-/SCWM/* EHS integration." },
        { qHe: "מה ההבדל בין reaction מסוג error ל-warning בבדיקת-EHS?", aHe: "error חוסם את התהליך עד תיקון — מתאים לכשל-בטיחות-קריטי (אחסון לא-תואם, שינוע לא-חוקי); warning רק מתריע ומאפשר המשך — מתאים להערות-מידע. בחירה שגויה (warning לכשל-קריטי) מנטרלת את הבקרה." },
        { qHe: "כיצד EWM מונע שכנות מסוכנת בין חומרים ב-bin?", aHe: "דרך storage section determination ו-incompatibility checks: לכל חומר storage hazard class, ולכל storage section נקבעים ה-classes המותרים. בקבלה, ה-hazardous substance check מנתב את החומר רק ל-section תואם ומונע שכנות מסוכנת (למשל חומצה ליד בסיס)." },
      ],
      takeawaysHe: [
        "EHS checks מוטמעות בתוך תהליכי-המחסן בשני הכיוונים — קבלה והוצאה — לא לצדם.",
        "Inbound = hazardous substance check (אחסון תואם); Outbound = dangerous goods check (שינוע חוקי).",
        "storage section determination + incompatibility checks מונעים שכנות-חומרים מסוכנת.",
        "reaction control (error מול warning) קובע אם בדיקה חוסמת או רק מתריעה.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת EHS (8.1)", href: "/library/wm/chapter-08/#sub-8.1" },
        { labelHe: "EWM · סיכום (8.3)", href: "/library/wm/chapter-08/#sub-8.3" },
      ],
      children: [
        // -------------------------------------------------- 8.2.1
        {
          id: "8.2.1",
          titleHe: "תהליך כניסה (קבלת טובין)",
          titleEn: "Inbound Process",
          execHe:
            "ה-Inbound Process הוא קבלת חומר-מסוכן למחסן עם הטמעת hazardous substance check. כשמגיע משלוח, ה-/SCWM/* EHS integration מזהה שהחומר נושא hazardous substance flag, מושך את ה-hazardous substance master, וקובע — דרך storage section determination — לאן מותר לאחסן אותו. incompatibility checks מבטיחים שלא ייווצר אחסון מסוכן. כך הקבלה אינה רק 'הכנסת-סחורה' אלא 'הכנסה-בטוחה'.",
          beginnerHe:
            "סחורה מסוכנת מגיעה לרציף-הפריקה. לפני שמכניסים אותה למדף, EHS שואל: 'איזה סוג-סכנה זה? לאן מותר לשים?'. אם זו חומצה — היא תלך לאזור-חומצות; אם זה גז בלחץ — לאזור-מאוורר-ומופרד. המערכת לא תיתן לעובד לשים חומצה ליד בסיס. רק כשהמקום מאושר, הסחורה נכנסת פיזית למדף.",
          consultantHe:
            "ברמת-המימוש: ה-Inbound Delivery (/SCWM/PRDI) מפעיל את ה-storage type search, ובתוכו ה-EHS-relevant storage section determination. ה-storage hazard class של החומר (מתוך ה-hazardous substance master) משמש קריטריון בקביעת ה-section המותר; ה-incompatibility matrix חוסם sections שבהם כבר מאוחסן חומר בלתי-תואם. ה-Warehouse Task ל-putaway נוצר רק עבור bin שעבר את הבדיקה. תוצאות נרשמות ונצפות ב-/SCWM/MON. אם ה-hazardous substance flag לא מתוחזק באב-החומר — הבדיקה כלל לא מופעלת והחומר עלול להגיע ל-bin שגוי.",
          purposeHe:
            "להבטיח שכל חומר-מסוכן נכנס ל-storage section תואם-בטיחות ולא נוצרת שכנות מסוכנת — כבר ברגע-הקבלה, לפני שהחומר 'נעלם' למדף ויהיה קשה לתקן.",
          processExampleHe:
            "משאית עם חביות חומצה הידרוכלורית פורקת ברציף. ב-/SCWM/PRDI, ה-hazardous substance check מזהה storage hazard class 'corrosive-acid', ו-storage section determination מנתב את ה-putaway ל-section ייעודי לחומצות. ה-incompatibility check מוודא שאין באותו section בסיסים. נוצר Warehouse Task; העובד מאחסן; התוצאה נרשמת ב-/SCWM/MON.",
          scenarioHe:
            "בארגון הקבלה הנפוצה היא גלילי-CO2 וכימיקלי-CIP. ה-CO2 (gas under pressure) מנותב ל-section מאוורר ומופרד-אש; החומצות והבסיסים ל-CIP מנותבים ל-sections נפרדים זה מזה. כך אם מגיע משלוח-מעורב, EHS מפצל את ה-putaway אוטומטית לפי storage hazard class של כל פריט.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery ► EHS Integration",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Strategies ► Storage Type Search ► Define EHS-Relevant Storage Section Determination",
            "SAP EHS Management ► Industrial Hygiene and Safety ► Master Data ► Hazardous Substance Management ► Maintain Storage Hazard Classes",
          ],
          tables: ["/SCWM/ORDIM_O", "/SCWM/T331", "ESTMJ", "ESTRH"],
          tcodes: ["/SCWM/PRDI", "/SCWM/TODLV_I", "/SCWM/MON", "CG02"],
          fiori: ["F0617", "F2660"],
          configHe: [
            "Activate EHS Inbound check: הפעלת hazardous substance check ב-Inbound Delivery.",
            "EHS-relevant storage section determination: כללים הקושרים storage hazard class ל-storage section מותר.",
            "Storage hazard classes: הגדרת מחלקות-הסכנה-לאחסון (corrosive, gas under pressure, flammable…) ושיוכן לחומרים.",
            "Incompatibility matrix: זוגות-classes אסורים-לשכנות (חומצה↔בסיס) החוסמים section משותף.",
          ],
          flow: [
            { he: "פריקה ברציף", code: "/SCWM/PRDI" },
            { he: "זיהוי hazardous substance flag", note: "מתוך אב-החומר" },
            { he: "storage section determination", note: "לפי storage hazard class" },
            { he: "incompatibility check", note: "חסימת שכנות מסוכנת" },
            { he: "יצירת Warehouse Task", code: "/SCWM/ORDIM_O" },
            { he: "Putaway פיזי + רישום", code: "/SCWM/MON" },
          ],
          masterDataHe: [
            "hazardous substance master: storage hazard class, exposure data — הבסיס לקביעת-האחסון.",
            "Material Master: hazardous substance flag — בלעדיו ה-Inbound check לא מופעל.",
            "Storage section: רשימת storage hazard classes מותרים פר-section.",
          ],
          mistakesHe: [
            "hazardous substance flag חסר באב-החומר ➔ ה-putaway מתבצע ללא בדיקה.",
            "storage section determination לא מתחשב ב-storage hazard class ➔ ניתוב שגוי.",
            "incompatibility matrix לא מוגדרת ➔ חומצה ובסיס מאוחסנים יחד.",
          ],
          troubleshootHe: [
            "חומר-מסוכן הגיע ל-section כללי ➔ flag חסר או storage section determination לא-EHS.",
            "ה-Warehouse Task נחסם לכל bin ➔ אין section עם storage hazard class תואם — הגדר/הרחב section.",
            "אין רישום-בדיקה ➔ EHS Inbound check לא הופעל; בדוק ב-/SCWM/MON.",
          ],
          bestPracticeHe: [
            "הגדר sections ייעודיים לכל storage hazard class לפני העלאת-המחסן לאוויר.",
            "ודא ש-storage section determination הוא EHS-relevant ולא רק קיבולתי.",
            "תחזק incompatibility matrix מלאה לחומרי-הארגון ובדוק אותה בקבלת-מדגם.",
          ],
          interviewHe: [
            { qHe: "מה מפעיל את ה-hazardous substance check בתהליך-הכניסה?", aHe: "ה-hazardous substance flag באב-החומר, הנקרא על-ידי ה-/SCWM/* EHS integration ב-Inbound Delivery (/SCWM/PRDI). בלעדיו הבדיקה לא מופעלת והחומר עלול להגיע ל-bin שגוי." },
            { qHe: "כיצד נקבע ה-storage section לחומר-מסוכן בקבלה?", aHe: "דרך EHS-relevant storage section determination: ה-storage hazard class של החומר משמש קריטריון, וה-incompatibility matrix חוסמת sections עם חומרים בלתי-תואמים. ה-Warehouse Task נוצר רק ל-bin שעבר את הבדיקה." },
          ],
          takeawaysHe: [
            "Inbound = הטמעת hazardous substance check בקביעת-האחסון.",
            "storage hazard class + incompatibility matrix מנתבים ל-section תואם.",
            "hazardous substance flag באב-החומר הוא תנאי-הסף להפעלת הבדיקה.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך יציאה (8.2.2)", href: "/library/wm/chapter-08/#sub-8.2.2" },
          ],
        },
        // -------------------------------------------------- 8.2.2
        {
          id: "8.2.2",
          titleHe: "תהליך יציאה (הוצאת טובין)",
          titleEn: "Outbound Process",
          execHe:
            "ה-Outbound Process הוא הוצאת חומר-מסוכן מהמחסן ושינועו, עם הטמעת dangerous goods check. לפני ה-loading וה-Goods Issue, ה-/SCWM/* EHS integration מאמת שהחומר עומד בכללי-ההובלה: UN number, packing group, mode-of-transport, ותעודות-הובלה נדרשות (ADR/IMDG/IATA). כך נמנע שינוע לא-חוקי או לא-בטוח כבר ברגע-הטעינה.",
          beginnerHe:
            "סחורה מסוכנת עומדת לצאת מהמחסן למשאית. לפני שטוענים, EHS שואל: 'מותר לשלוח את זה ככה? האריזה נכונה? יש את התעודה הנכונה למשאית?'. למשל גליל-CO2 חייב סימון UN 1013 ותעודת-ADR. אם משהו חסר — המערכת לא תאשר טעינה. רק כשהכול תקין, הסחורה יוצאת.",
          consultantHe:
            "ברמת-המימוש: ה-Outbound Delivery (/SCWM/PRDO) מפעיל dangerous goods check לפני אישור ה-loading. ה-check schema מריץ רצף שיטות — אימות UN number ו-packing group מול ה-dangerous goods master (DGTMD), התאמת mode-of-transport לרגולציה (ADR לכביש, IMDG לים, IATA לאוויר), ובדיקת קיום תעודות-הובלה. כשל מחזיר error (חסימה) או warning לפי ה-reaction control. רק לאחר אישור נוצר ה-Goods Issue ומתעדכן המלאי. תוצאות נצפות ב-/SCWM/MON. dangerous goods indicator חסר באב-החומר ➔ הבדיקה לא מופעלת.",
          purposeHe:
            "להבטיח ששום חומר-מסוכן לא עוזב את המחסן בצורה לא-חוקית או לא-בטוחה — אימות-הובלה מובנה בזמן-אמת, לפני נקודת-האל-חזור של הטעינה והשינוע.",
          processExampleHe:
            "הזמנת-לקוח דורשת משלוח גלילי-CO2 בכביש. לאחר פיקינג, ב-/SCWM/PRDO, ה-dangerous goods check מאמת UN 1013, packing group, התאמה ל-ADR (mode = road), וקיום transport document. הבדיקה עוברת; ה-loading מאושר; ה-Goods Issue מבוצע; המלאי מתעדכן; התוצאה נרשמת ב-/SCWM/MON.",
          scenarioHe:
            "בארגון רוב ה-Outbound הוא משקאות לא-מסוכנים העוברים ללא בדיקת-DG. אך גלילי-CO2 ריקים-להחזרה לספק, או כימיקלי-CIP עודפים, הם dangerous goods — וכאן dangerous goods check מאמת UN number, אריזה ותעודת-ADR לפני טעינה למשאית-ההחזרה. כך אותו תהליך-Outbound מריץ מסלול-מהיר למשקה ומסלול-מבוקר לחומרי-העזר.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery ► EHS Integration",
            "SAP EHS Management ► Product Compliance ► Dangerous Goods Management ► Dangerous Goods Checks ► Define Check Schema",
            "SAP EHS Management ► Product Compliance ► Dangerous Goods Management ► Dangerous Goods Checks ► Assign Check Schema to Mode of Transport",
          ],
          tables: ["/SCWM/ORDIM_C", "DGTMD", "ESTDGN", "/SCWM/T331"],
          tcodes: ["/SCWM/PRDO", "/SCWM/TODLV_O", "/SCWM/MON", "DGP1", "DGR1"],
          fiori: ["F2660", "F3089"],
          configHe: [
            "Activate EHS Outbound check: הפעלת dangerous goods check ב-Outbound Delivery לפני loading.",
            "Check schema: רצף שיטות-בדיקה (UN number, packing group, אריזה, תעודות).",
            "Assign check schema to mode of transport: שיוך סכֵמה ל-ADR/IMDG/IATA לפי אופן-ההובלה.",
            "Reaction control: error (חסימת loading) מול warning לכל שיטת-בדיקה.",
          ],
          flow: [
            { he: "Outbound Delivery + פיקינג", code: "/SCWM/PRDO" },
            { he: "זיהוי dangerous goods indicator", note: "מתוך אב-החומר" },
            { he: "dangerous goods check schema", note: "UN number + packing group" },
            { he: "התאמת mode-of-transport", note: "ADR/IMDG/IATA + תעודות" },
            { he: "אישור Loading", note: "רק אם הבדיקה עברה" },
            { he: "Goods Issue + עדכון מלאי", code: "/SCWM/MON" },
          ],
          masterDataHe: [
            "dangerous goods master (DGTMD): UN number, classification, packing group, transport-relevant data.",
            "Material Master: dangerous goods indicator — בלעדיו ה-Outbound check לא מופעל.",
            "Check schema ↔ mode of transport: שיוך הסכֵמה לאופן-ההובלה הרלוונטי.",
          ],
          mistakesHe: [
            "dangerous goods indicator חסר באב-החומר ➔ ה-Goods Issue עובר ללא בדיקה.",
            "check schema לא משויך ל-mode of transport הנכון ➔ בדיקה לא-רלוונטית או חסרה.",
            "reaction = warning לכשל-תעודה קריטי ➔ שינוע לא-חוקי עובר.",
          ],
          troubleshootHe: [
            "Goods Issue עבר בלי DG check ➔ indicator חסר או EHS Outbound check לא הופעל.",
            "בדיקה חוסמת משלוח תקין ➔ UN number / packing group שגויים ב-DGTMD, או schema שגוי ל-mode.",
            "אין תיעוד-בדיקה ➔ הצג EHS check results ב-/SCWM/MON.",
          ],
          bestPracticeHe: [
            "שייך check schema נכון לכל mode of transport (כביש/ים/אוויר).",
            "השתמש ב-error לחסימת loading בכשל-בטיחות/תעודה קריטי.",
            "בדוק dangerous goods master מול הרגולציה העדכנית בכל שינוי-תקנה.",
          ],
          interviewHe: [
            { qHe: "מתי מופעלת dangerous goods check בתהליך-היציאה?", aHe: "ב-Outbound Delivery (/SCWM/PRDO) לפני אישור ה-loading. ה-check schema מאמת UN number, packing group, התאמת mode-of-transport ותעודות-הובלה מול ה-dangerous goods master. רק לאחר אישור מתבצע ה-Goods Issue." },
            { qHe: "כיצד SAP יודע איזו רגולציית-הובלה לבדוק?", aHe: "דרך שיוך ה-check schema ל-mode of transport: ADR לכביש, IMDG לים, IATA לאוויר. אופן-ההובלה של ה-Outbound קובע איזו סכֵמה תרוץ ואילו תעודות נדרשות." },
          ],
          takeawaysHe: [
            "Outbound = הטמעת dangerous goods check לפני loading ו-Goods Issue.",
            "check schema מאמת UN number, packing group, mode-of-transport ותעודות.",
            "dangerous goods indicator באב-החומר הוא תנאי-הסף; reaction control קובע חסימה מול התרעה.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך כניסה (8.2.1)", href: "/library/wm/chapter-08/#sub-8.2.1" },
          ],
        },
      ],
    },
    // ============================================================ 8.3
    {
      id: "8.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד SAP EHS Management משולב ב-SAP EWM כדי להפוך את המחסן ל'מודע-בטיחות'. שתי משפחות-בדיקה מרכזיות — dangerous goods check (הובלה) ו-hazardous substance check (אחסון/חשיפה) — מוטמעות בתוך תהליכי-הליבה: hazardous substance check ב-Inbound לקביעת אחסון-תואם, ו-dangerous goods check ב-Outbound לאימות שינוע-חוקי. הכול נשען על master data תקין ועל ה-/SCWM/* EHS integration. התוצאה: ציות-רגולטורי ובטיחות-עובדים נאכפים בזמן-אמת על כל תנועת-מלאי.",
      beginnerHe:
        "למדנו שהמחסן בודק בטיחות-חומרים בכניסה ובַיציאה. בכניסה — 'לאן מותר לשים?' (hazardous substance check). ביציאה — 'מותר לשלוח ככה?' (dangerous goods check). הכול עובד רק אם החומר מסומן נכון באב-החומר. כך מונעים אחסון מסוכן ושינוע לא-חוקי, ושומרים על העובדים ועל החוק.",
      consultantHe:
        "מבחינת-מימוש, ההצלחה תלויה בשלושה: (1) master data — dangerous goods master + hazardous substance master + flags באב-החומר; (2) integration switches — הפעלת הבדיקות הנכונות לכל תהליך; (3) determination & reaction — storage section determination, check schema, ו-reaction control (error/warning). בארגון, הדגש הוא על CO2 (class 2) וכימיקלי-CIP (class 8), עם incompatibility בין חומצה לבסיס. ניטור שוטף ב-/SCWM/MON סוגר את הלולאה.",
      purposeHe:
        "לקבע את עקרון-העל: בטיחות-וציות אינם תהליך נפרד אלא שכבה מוטמעת בכל תנועת-מלאי, הנשענת על נתוני-אב נכונים ועל אכיפה-בזמן-אמת בנקודות-ההחלטה הקריטיות.",
      processExampleHe:
        "מקצה-לקצה: חומצה נכנסת (Inbound → hazardous substance check → section-חומצות), מאוחסנת בנפרד מבסיסים (incompatibility), ובהמשך גליל-CO2 יוצא (Outbound → dangerous goods check → UN 1013 + ADR → loading → Goods Issue). כל שלב נרשם ב-/SCWM/MON.",
      scenarioHe:
        "בארגון הפרק מתורגם לשגרה: קבלת CO2 וכימיקלי-CIP לאזורי-אחסון מבוקרים-ומופרדים, והוצאת גלילים-להחזרה תחת dangerous goods check — לצד מסלול-מהיר ולא-מבוקר למשקאות עצמם. כך בטיחות נשמרת בלי להאט את התפעול הרגיל.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► EHS Integration",
        "SAP EHS Management ► Product Compliance ► Dangerous Goods Management",
        "SAP EHS Management ► Industrial Hygiene and Safety ► Master Data ► Hazardous Substance Management",
      ],
      tables: ["DGTMD", "ESTMJ", "/SCWM/ORDIM_O", "/SCWM/T331"],
      tcodes: ["/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/MON", "CG02", "DGP1"],
      fiori: ["F2660", "F3089", "F0617"],
      configHe: [
        "ודא שלושת רובדי-המימוש: master data, integration switches, determination & reaction.",
        "הפעל בדיקות בשני הכיוונים ובכל נקודות-ההחלטה (Inbound, Putaway, Outbound).",
        "הגדר reaction = error לכשלים קריטיים, warning להערות-מידע.",
        "נטר EHS check results ב-/SCWM/MON כשגרה.",
      ],
      mistakesHe: [
        "תחזוק חלקי של master data — flag אחד מתוחזק והשני נשכח.",
        "הפעלת בדיקות בכיוון אחד בלבד (רק Inbound או רק Outbound).",
        "שימוש ב-warning לכשלים קריטיים-לבטיחות.",
      ],
      troubleshootHe: [
        "בדיקה לא פועלת ➔ בדוק flag באב-החומר ואת ה-integration switch לתהליך.",
        "בדיקה חוסמת-שווא ➔ בדוק storage section determination / check schema / regulatory list.",
        "אין נראות ➔ /SCWM/MON, EHS check results.",
      ],
      bestPracticeHe: [
        "התייחס ל-EHS כשכבה מוטמעת בכל תהליך-מחסן, לא כתוספת.",
        "תחזק את שני העולמות (dangerous goods + hazardous substance) במקביל.",
        "בנה incompatibility matrix ו-storage hazard classes כחלק מעיצוב-המחסן.",
        "נטר ב-/SCWM/MON כחלק משגרת-הבקרה היומית.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת הרובדים שקובעים את הצלחת ה-EHS integration ב-EWM?", aHe: "(1) master data — dangerous goods master, hazardous substance master, ו-flags באב-החומר; (2) integration switches — הפעלת הבדיקות הנכונות לכל תהליך; (3) determination & reaction — storage section determination, check schema ו-reaction control. כשל בכל אחד מנטרל את האכיפה." },
        { qHe: "סכם את ההבדל בין הבדיקה ב-Inbound לזו ב-Outbound.", aHe: "ב-Inbound מופעל hazardous substance check לקביעת אחסון-תואם (storage hazard class + incompatibility); ב-Outbound מופעל dangerous goods check לאימות שינוע-חוקי (UN number, packing group, mode-of-transport, תעודות). הראשון על אחסון, השני על הובלה." },
      ],
      takeawaysHe: [
        "EHS ב-EWM = שכבת-בטיחות מוטמעת בקבלה ובהוצאה, לא תהליך נפרד.",
        "Inbound → hazardous substance check (אחסון); Outbound → dangerous goods check (הובלה).",
        "ההצלחה תלויה ב-master data, integration switches, ו-determination/reaction.",
        "בארגון: CO2 (class 2) וכימיקלי-CIP (class 8) הם מוקד-הבקרה; ניטור ב-/SCWM/MON.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת EHS (8.1)", href: "/library/wm/chapter-08/#sub-8.1" },
        { labelHe: "EWM · קבלת והוצאת טובין עם EHS (8.2)", href: "/library/wm/chapter-08/#sub-8.2" },
      ],
    },
  ],
};
