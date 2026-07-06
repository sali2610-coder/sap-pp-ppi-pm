// ===== MM Digital Textbook — Chapter 3 (gold-standard learning chapter) =====
// Sourcing & Procurement — Organizational Structure.
// Every node is a complete 18-facet LearningNode of authored Hebrew, written
// for both beginners and consultants. Hierarchy + ids preserved exactly.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH3: TextbookChapter = {
  n: 3,
  titleHe: "מבנה ארגוני",
  titleEn: "Organizational Structure",
  introHe:
    "המבנה הארגוני הוא השלד שעליו נשען כל תהליך הרכש והאספקה (Sourcing & Procurement) ב-SAP S/4HANA. כל מסמך-רכש — בקשת-הצעה, הזמנת-רכש, קבלת-טובין, חשבונית-ספק — נושא בתוכו צירוף של אובייקטים ארגוניים: Company Code, Plant, Storage Location, Purchasing Organization ו-Purchasing Group. הגדרה שגויה כאן מתפשטת לכל זרימת ה-Procure-to-Pay. פרק זה הוא יחידת-לימוד מלאה: כל תת-פרק הורחב ליחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת הארגון (מפעל מילוי משקאות של מוצר לדוגמה), ניווט SPRO מפורט, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בבניית המבנה הארגוני של הרכש ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 3.1
    {
      id: "3.1",
      titleHe: "אובייקטים ארגוניים לניהול הארגון",
      titleEn: "Enterprise Management Organization Objects",
      execHe:
        "אובייקטי-הניהול הארגוניים (Enterprise Management) הם הרמות החוצות-מודולים של מבנה החברה ב-S/4HANA: Client, Company Code, ו-Plant. הם מגדירים את המסגרת המשפטית, הכספית והלוגיסטית שבתוכה כל יתר האובייקטים — כולל אלו הייעודיים לרכש — חיים ופועלים. הם משותפים ל-FI, CO, SD, PP ו-MM, ולכן השפעתם רוחבית.",
      beginnerHe:
        "דמיין את הארגון כבניין רב-קומות. הקומה העליונה היא ה-Client (כל החברה הטכנית ב-SAP). מתחתיה ה-Company Code — היחידה שמנהלת ספרי-חשבונות ומפיקה מאזן (ישות משפטית). מתחתיה ה-Plant — אתר פיזי שבו מייצרים, מאחסנים או מספקים. אלה אובייקטים 'כלליים' ששייכים לכל המודולים, לא רק לרכש.",
      consultantHe:
        "היררכיית הליבה: Client (T000) → Company Code (T001) → Plant (T001W). ב-S/4HANA Company Code הוא הישות המשפטית לדיווח חיצוני; ה-Plant משויך לבדיוק Company Code אחד (טבלת T001K — Valuation Area = Plant ב-S/4HANA כברירת-מחדל). Valuation Area ברמת-Plant היא הסטנדרט ב-S/4 (להבדיל מאופציית רמת-Company-Code). אובייקטים אלו מוגדרים פעם אחת ומשמשים את כל המודולים — שינוי בהם הוא Cross-application ודורש תיאום בין FI/CO/Logistics.",
      purposeHe:
        "להגדיר את המסגרת המשפטית-כספית-לוגיסטית האחידה של הארגון, כך שכל תנועה — רכש, מלאי, ייצור, מכירה — תירשם תחת ישות משפטית נכונה (Company Code) ובאתר נכון (Plant), ותתחבר אוטומטית ל-FI/CO.",
      processExampleHe:
        "בהזמנת-רכש: המערכת גוזרת את ה-Company Code מתוך ה-Plant שהוזן בשורה, קובעת לפיו את המטבע, את לוח-השנה הפיננסי ואת חשבונות-ה-GL לפקודת-היומן בקבלת-הטובין. כל פעולה לוגיסטית 'יודעת' באיזו ישות משפטית היא נרשמת — בזכות שרשרת Client→Company Code→Plant.",
      scenarioHe:
        "בארגון: ה-Client הוא מערכת SAP של הבקבוקאי; Company Code 'MFG1' = הישות המשפטית הישראלית המפיקה מאזן בשקלים; ה-Plants הם אתרי המילוי והמחסנים. כל מפעל-מילוי משויך לארגון1 ומדווח אליו כספית.",
      navHe: [
        "Enterprise Structure ► Definition ► Financial Accounting ► Edit, Copy, Delete, Check Company Code (EC01 / OX02)",
        "Enterprise Structure ► Definition ► Logistics – General ► Define, copy, delete, check plant (OX10)",
        "Enterprise Structure ► Assignment ► Logistics – General ► Assign plant to company code (OX18)",
        "Enterprise Structure ► Definition ► Logistics – General ► Define Valuation Level (OX14)",
      ],
      tables: ["T000", "T001", "T001W", "T001K", "TCURC"],
      tcodes: ["OX02", "OX10", "OX18", "OX14", "SCC4"],
      fiori: ["F1557", "F2761"],
      configHe: [
        "Valuation Level (OX14): קביעה אם הערכת-מלאי היא ברמת-Plant (סטנדרט S/4HANA) או Company Code — החלטה חד-פעמית וקריטית לכל ה-Procurement.",
        "Company Code (OX02): מפתח בן 4 תווים, שם, עיר, מדינה, מטבע ולוח-שנה — הישות המשפטית לדיווח.",
        "Plant (OX10): אתר פיזי; מומלץ ליצור בהעתקה ממפעל-תקן (0001) כדי לרשת ברירות-מחדל.",
        "Assignment (OX18): כל Plant משויך ל-Company Code אחד בלבד — בסיס לגזירת ה-FI מתנועות-רכש.",
      ],
      flow: [
        { he: "הגדרת Client", code: "SCC4", note: "רמת מערכת" },
        { he: "הגדרת Company Code", code: "OX02", note: "ישות משפטית" },
        { he: "קביעת Valuation Level", code: "OX14", note: "Plant ב-S/4" },
        { he: "הגדרת Plant", code: "OX10" },
        { he: "שיוך Plant→Company Code", code: "OX18" },
      ],
      masterDataHe: [
        "T001 = Company Code (מטבע BUKRS, מדינה, לוח-שנה) · T001W = Plant (כתובת, מדינה, אזור-רכש).",
        "T001K = Valuation Area↔Company Code · ב-S/4HANA Valuation Area = Plant כברירת-מחדל.",
      ],
      mistakesHe: [
        "שינוי Valuation Level אחרי שכבר קיימות תנועות-מלאי — כמעט בלתי-הפיך, גורר פרויקט-המרה.",
        "יצירת Company Code 'מאפס' במקום העתקה — חוסר הגדרות-תלויות (Document types, Field status).",
        "שיוך Plant ל-Company Code שגוי — כל ה-FI של הרכש נרשם לישות הלא-נכונה.",
      ],
      troubleshootHe: [
        "קבלת-טובין נכשלת בפקודת-FI ➔ בדוק שיוך Plant→Company Code (OX18) ו-Valuation Area תקין.",
        "מטבע שגוי בהזמנת-רכש ➔ מטבע ה-Company Code (T001) או שער-המרה חסר.",
        "Plant לא נבחר בהזמנה ➔ לא שויך ל-Company Code, או חסר ב-Purchasing-Org assignment.",
      ],
      bestPracticeHe: [
        "השאר את Valuation Level ברמת-Plant (סטנדרט S/4HANA) אלא אם יש סיבה עסקית מובהקת.",
        "צור Company Code ו-Plant תמיד בהעתקה מתבנית (0001) כדי לרשת תלויות.",
        "תעד את מטריצת השיוך Plant↔Company Code↔Purchasing-Org לפני הקונפיגורציה.",
      ],
      interviewHe: [
        { qHe: "מהי היררכיית אובייקטי-הניהול הארגוניים ב-S/4HANA?", aHe: "Client → Company Code (ישות משפטית, מאזן) → Plant (אתר פיזי). ה-Plant משויך ל-Company Code אחד בלבד." },
        { qHe: "מהי ברירת-המחדל של Valuation Level ב-S/4HANA ומדוע זה חשוב?", aHe: "רמת-Plant. זה קובע היכן מנוהלת הערכת-המלאי וה-Material Master valuation; שינוי בדיעבד הוא כמעט בלתי-הפיך." },
        { qHe: "מדוע אובייקטים אלו נקראים 'Enterprise Management' ולא ייעודיים-לרכש?", aHe: "כי הם משותפים לכל המודולים (FI/CO/SD/PP/MM) ומגדירים את המסגרת הכוללת, לא רק את הרכש." },
      ],
      takeawaysHe: [
        "Client→Company Code→Plant = שלד הארגון, חוצה-מודולים.",
        "Company Code = ישות משפטית; Plant = אתר פיזי המשויך לה.",
        "Valuation Level = Plant הוא סטנדרט S/4HANA — החלטה חד-פעמית.",
      ],
      relatedHe: [
        { labelHe: "MM · Company Code (3.3)", href: "/library/mm/chapter-03/#sub-3.3" },
        { labelHe: "MM · Plants (3.4)", href: "/library/mm/chapter-03/#sub-3.4" },
      ],
    },
    // ============================================================ 3.2
    {
      id: "3.2",
      titleHe: "אובייקטים ארגוניים ייעודיים לרכש ואספקה",
      titleEn: "Sourcing and Procurement–Specific Organization Objects",
      execHe:
        "מעבר לאובייקטי-הניהול הכלליים, לרכש (Sourcing & Procurement) יש אובייקטים ייעודיים משלו: Purchasing Organization, Purchasing Group ו-Storage Location. הם משכבים על השלד הכללי ומגדירים מי קונה (ארגון/קבוצת-רכש), עבור אילו אתרים, והיכן מאוחסן המלאי שנקנה.",
      beginnerHe:
        "אם ה-Company Code וה-Plant הם 'הבניין', אובייקטי-הרכש הם 'מחלקת-הקניות' שבתוכו. Purchasing Organization = הגוף שמנהל משא-ומתן וחתום על חוזים מול ספקים. Purchasing Group = הקונה או הצוות בתוך אותו ארגון. Storage Location = המדף/אזור הפיזי במחסן שבו מונח החומר שנקנה.",
      consultantHe:
        "המבנה: Purchasing Organization (T024E) היא הרמה החוזית-משפטית מול הספק; היא משויכת ל-Company Code (OX01) ו/או ל-Plants (OX17). Purchasing Group (T024) היא יחידה תפעולית — אינה משויכת ארגונית-קשיחה אלא מוקצית במסמכים. Storage Location (T001L) היא תת-חלוקה של Plant לניהול-מלאי. הבחנה קריטית: Purchasing Org היא 'מי חתום על החוזה'; Purchasing Group היא 'מי מבצע בפועל' — ולכן נושאת מידע-קשר ולא שיוך ארגוני.",
      purposeHe:
        "להפריד בין שלוש שאלות: מי הגוף החוזי מול הספק (Purchasing Org), מי מבצע את הרכש בפועל (Purchasing Group), והיכן מאוחסן התוצר (Storage Location). הפרדה זו מאפשרת בקרה, אחריותיות ודיווח לפי כל ממד.",
      processExampleHe:
        "בהזמנת-רכש: ה-Purchasing Organization קובעת אילו תנאי-חוזה ומחירים חלים (Info Records לפי PurchOrg), ה-Purchasing Group מזוהה כקונה-האחראי לצורך מעקב ואישורים, וה-Storage Location בשורה קובעת לאן ייכנס המלאי בקבלת-הטובין.",
      scenarioHe:
        "בארגון: Purchasing Organization 'MFG1' מנהלת חוזים מרכזיים מול ספקי תרכיז, סוכר ואריזה; Purchasing Groups נפרדות לחומרי-גלם, אריזה, ו-MRO; Storage Locations מפרידים בין מחסן-תרכיז מקורר, מחסן-אריזה ומחסן-חלפים.",
      navHe: [
        "Enterprise Structure ► Definition ► Materials Management ► Maintain purchasing organization (OX08)",
        "Materials Management ► Purchasing ► Create Purchasing Groups (OME4)",
        "Enterprise Structure ► Definition ► Materials Management ► Maintain storage location (OX09)",
        "Enterprise Structure ► Assignment ► Materials Management ► Assign purchasing organization to company code (OX01)",
        "Enterprise Structure ► Assignment ► Materials Management ► Assign purchasing organization to plant (OX17)",
      ],
      tables: ["T024E", "T024", "T001L", "T024W", "T024Z"],
      tcodes: ["OX08", "OME4", "OX09", "OX01", "OX17"],
      fiori: ["F1557", "F4072"],
      configHe: [
        "Purchasing Organization (OX08): הרמה החוזית מול הספק; מפתח 4 תווים.",
        "Purchasing Group (OME4): יחידה תפעולית עם שם ומידע-קשר (טלפון/פקס); מוקצית במסמכים, לא משויכת קשיחות.",
        "Storage Location (OX09): תת-חלוקה של Plant; מפתח 4 תווים ייחודי בתוך ה-Plant.",
        "Assignments (OX01/OX17): שיוך Purchasing Org ל-Company Code ו/או ל-Plants — קובע את היקף-הפעולה.",
      ],
      flow: [
        { he: "הגדרת Purchasing Org", code: "OX08" },
        { he: "הגדרת Purchasing Group", code: "OME4" },
        { he: "הגדרת Storage Location", code: "OX09" },
        { he: "שיוך PurchOrg→Company Code", code: "OX01" },
        { he: "שיוך PurchOrg→Plant", code: "OX17" },
      ],
      masterDataHe: [
        "T024E = Purchasing Organization · T024 = Purchasing Group (כולל מידע-קשר) · T001L = Storage Location.",
        "T024W = שיוך PurchOrg↔Plant · T024Z = שיוך PurchOrg↔Company Code.",
      ],
      mistakesHe: [
        "בלבול בין Purchasing Org (חוזית) ל-Purchasing Group (תפעולית) — מוביל למבנה לא-נכון.",
        "אי-שיוך Purchasing Org ל-Plant (OX17) — אי-אפשר ליצור הזמנה ל-Plant זה.",
        "ריבוי Purchasing Groups מיותרות — מקשה דיווח ותחזוקה.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור הזמנה ל-Plant ➔ Purchasing Org לא שויכה ל-Plant (OX17).",
        "מחירי-ספק שגויים ➔ Info Record שייך ל-Purchasing Org אחר מזה שבהזמנה.",
        "Purchasing Group לא נבחרת ➔ לא הוגדרה ב-OME4 או הוקלדה שגוי.",
      ],
      bestPracticeHe: [
        "החלט מראש על מודל ה-PurchOrg (מרכזי / לפי-Plant / רפרנס) לפני הקונפיגורציה.",
        "שמור על מספר מצומצם של Purchasing Groups בעלות משמעות ארגונית ברורה.",
        "תעד את מטריצת PurchOrg↔Plant↔Company Code כמקור-אמת יחיד.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Purchasing Organization ל-Purchasing Group?", aHe: "Purchasing Org היא הרמה החוזית-משפטית מול הספק (חתומה על חוזים, מנהלת Info Records); Purchasing Group היא יחידה תפעולית — הקונה בפועל, נושאת מידע-קשר ומוקצית במסמכים בלי שיוך ארגוני קשיח." },
        { qHe: "מהם שלושת האובייקטים הייעודיים-לרכש?", aHe: "Purchasing Organization, Purchasing Group, ו-Storage Location." },
        { qHe: "מדוע Purchasing Group אינה משויכת ארגונית?", aHe: "כי היא ממד תפעולי-דיווחי בלבד; היא מוקצית במסמך-הרכש ולא מהווה רמה במבנה הארגוני הקשיח." },
      ],
      takeawaysHe: [
        "אובייקטי-רכש ייעודיים: Purchasing Org (חוזית), Purchasing Group (תפעולית), Storage Location (אחסון).",
        "PurchOrg משויכת ל-Company Code ו/או Plants; Purchasing Group מוקצית במסמכים.",
        "ההפרדה מאפשרת בקרה ודיווח לפי כל ממד.",
      ],
      relatedHe: [
        { labelHe: "MM · Purchasing Organizations (3.6)", href: "/library/mm/chapter-03/#sub-3.6" },
        { labelHe: "MM · Purchasing Group Creation (3.7)", href: "/library/mm/chapter-03/#sub-3.7" },
      ],
    },
    // ============================================================ 3.3
    {
      id: "3.3",
      titleHe: "ישות חשבונאית (Company Code)",
      titleEn: "Company Code",
      execHe:
        "ה-Company Code הוא הישות המשפטית והחשבונאית המרכזית ב-S/4HANA — היחידה הקטנה ביותר שעבורה מופק סט-ספרים שלם ומאזן עצמאי לדיווח חיצוני. בהקשר הרכש, כל הזמנה, קבלה וחשבונית נרשמות תחת Company Code, שקובע את המטבע, לוח-השנה הפיננסי וחשבונות-ה-GL.",
      beginnerHe:
        "Company Code = 'החברה' מבחינה משפטית-חשבונאית. זו היחידה שמגישה דוחות-מס, מפיקה מאזן ומנהלת ספרי-חשבונות במטבע מסוים. כשקונים משהו, ההוצאה והתשלום שייכים בסופו-של-דבר ל-Company Code זה.",
      consultantHe:
        "מוגדר ב-OX02 (או EC01 להעתקה), מפתח בן 4 תווים, מאוחסן ב-T001. נושא: מטבע (WAERS), מדינה (LAND1), לוח-שנה, ושיוך ל-Chart of Accounts ול-Fiscal Year Variant (דרך OB62/OB37). ב-S/4HANA קיים גם Company (טבלת T880) לאיחוד-דוחות מעל מספר Company Codes. ה-Plants וה-Purchasing Orgs נקשרים אליו ובכך כל הלוגיסטיקה נגזרת לדיווח הנכון. תמיד צור בהעתקה (EC01) כדי לרשת Document Types, Field Status ו-Posting Periods.",
      purposeHe:
        "לספק את הישות שעבורה מנוהלים ספרי-חשבונות שלמים ומופק מאזן — הבסיס לדיווח חיצוני, מס וביקורת. בלעדיו אין היכן 'לתפוס' את הערך הכספי של תנועות-הרכש.",
      processExampleHe:
        "בחשבונית-ספק (MIRO): המערכת רושמת זכות ל-Vendor וחובה ל-GR/IR Clearing, הכול במטבע ובלוח-השנה של ה-Company Code שנגזר מה-Plant שבהזמנה — ומעדכנת את ספרי החברה הנכונים.",
      scenarioHe:
        "בארגון: Company Code 'MFG1' = הישות הישראלית, מטבע ILS, לוח-שנה ינואר–דצמבר. כל מפעלי-המילוי והמחסנים בישראל מדווחים אליו; ישות במדינה אחרת תהיה Company Code נפרד.",
      navHe: [
        "Enterprise Structure ► Definition ► Financial Accounting ► Edit, Copy, Delete, Check Company Code (OX02)",
        "Financial Accounting ► Financial Accounting Global Settings ► Company Code ► Enter Global Parameters (OBY6)",
        "Financial Accounting ► ... ► Ledgers ► Fiscal Year ► Assign Company Code to a Fiscal Year Variant (OB37)",
        "Financial Accounting ► ... ► Global Parameters ► Assign Company Code to Chart of Accounts (OB62)",
      ],
      tables: ["T001", "T880", "T001K", "TCURC", "T009"],
      tcodes: ["OX02", "EC01", "OBY6", "OB37", "OB62"],
      fiori: ["F1557", "F1755"],
      configHe: [
        "Company Code (OX02): מפתח 4 תווים, שם, עיר, מדינה, מטבע — צור בהעתקה (EC01) ולא מאפס.",
        "Global Parameters (OBY6): שיוך Chart of Accounts, Fiscal Year Variant, Posting Period Variant, Field Status Variant.",
        "Fiscal Year Variant (OB37): לוח-השנה הפיננסי (מס' תקופות, שנה שבורה/קלנדרית).",
        "Chart of Accounts (OB62): תרשים-החשבונות התפעולי שדרכו נרשמות תנועות-הרכש.",
      ],
      flow: [
        { he: "יצירת Company Code", code: "EC01", note: "העתקה מ-0001" },
        { he: "פרמטרים גלובליים", code: "OBY6" },
        { he: "Fiscal Year Variant", code: "OB37" },
        { he: "Chart of Accounts", code: "OB62" },
        { he: "מוכן לשיוך Plant/PurchOrg", code: "OX18/OX01" },
      ],
      masterDataHe: [
        "T001 = Company Code (BUKRS, WAERS מטבע, LAND1 מדינה, Fiscal Year Variant).",
        "T880 = Company (איחוד מעל Company Codes) · TCURC = מטבעות.",
      ],
      mistakesHe: [
        "יצירה מאפס במקום העתקה — חוסר Document Types, Field Status ו-Posting Periods.",
        "Fiscal Year Variant שגוי — סגירות-תקופה ודיווח לא נכונים.",
        "מטבע שגוי — כל תנועות-הרכש נרשמות במטבע לא-נכון, קשה לתקן בדיעבד.",
      ],
      troubleshootHe: [
        "חשבונית-ספק נכשלת ➔ Posting Period סגור (OB52) או Field Status Variant חסר.",
        "תנועת-רכש לא נרשמת ב-GL ➔ Chart of Accounts לא שויך (OB62) או חשבון חסר.",
        "שגיאת לוח-שנה ➔ Fiscal Year Variant לא שויך (OB37).",
      ],
      bestPracticeHe: [
        "צור Company Code תמיד בהעתקה (EC01) כדי לרשת את כל ההגדרות-התלויות.",
        "תאם Fiscal Year Variant ו-Chart of Accounts עם צוות ה-FI לפני הקמת-הרכש.",
        "הגבל מספר Company Codes למינימום הנדרש משפטית — כל אחד הוא תקורת-תחזוקה.",
      ],
      interviewHe: [
        { qHe: "מהו Company Code ומה תפקידו בהקשר הרכש?", aHe: "הישות המשפטית-חשבונאית המפיקה מאזן עצמאי; בהקשר הרכש הוא קובע את המטבע, לוח-השנה וחשבונות-ה-GL שאליהם נרשמות תנועות הרכש, הקבלה והחשבונית." },
        { qHe: "מדוע יוצרים Company Code בהעתקה ולא מאפס?", aHe: "כדי לרשת אוטומטית הגדרות-תלויות — Document Types, Field Status, Posting Periods — שבלעדיהן רישומי-FI נכשלים." },
        { qHe: "מה ההבדל בין Company ל-Company Code?", aHe: "Company Code (T001) = ישות-דיווח חיצונית; Company (T880) = רמת-איחוד המקבצת מספר Company Codes לדוחות מאוחדים." },
      ],
      takeawaysHe: [
        "Company Code = ישות משפטית עם מאזן עצמאי במטבע אחד.",
        "קובע מטבע, לוח-שנה וחשבונות-GL לכל תנועות-הרכש.",
        "צור תמיד בהעתקה (EC01); תאם FI לפני הרכש.",
      ],
      relatedHe: [
        { labelHe: "MM · Enterprise Management Objects (3.1)", href: "/library/mm/chapter-03/#sub-3.1" },
        { labelHe: "MM · Plants (3.4)", href: "/library/mm/chapter-03/#sub-3.4" },
      ],
    },
    // ============================================================ 3.4
    {
      id: "3.4",
      titleHe: "מפעלים (Plants)",
      titleEn: "Plants",
      execHe:
        "ה-Plant הוא היחידה הארגונית-הלוגיסטית המרכזית: אתר פיזי שבו מייצרים, מאחסנים, מספקים או מתחזקים. בהקשר הרכש הוא נקודת-המסירה של הטובין ורמת הערכת-המלאי (Valuation) ב-S/4HANA. כל שורת-הזמנה נושאת Plant, וממנו נגזרים ה-Company Code, ה-MRP והערכת-המלאי.",
      beginnerHe:
        "Plant = 'אתר' — מפעל, מחסן מרכזי או מרכז-הפצה. זה המקום הפיזי שאליו מגיע מה שקנינו ושבו מנוהל המלאי. כל הזמנת-רכש מציינת לאיזה Plant הטובין מיועדים.",
      consultantHe:
        "מוגדר ב-OX10, מאוחסן ב-T001W, משויך ל-Company Code ב-OX18. ב-S/4HANA ה-Plant הוא גם Valuation Area (T001K) — רמת הערכת-המלאי וה-Material Master valuation. נדרשת תחזוקת כתובת, מדינה ו-Region (לחישובי-מס/Jurisdiction). חובה לשייך Plant ל-Purchasing Organization (OX17) כדי לאפשר רכש עבורו. שדות נוספים: Customer/Vendor של ה-Plant (לרכש/מכירה בין-מפעלים — STO), ולוח-שנה-מפעל (Factory Calendar).",
      purposeHe:
        "לייצג את האתר הפיזי שבו מתרחשת הלוגיסטיקה — קבלה, אחסון, ייצור, אספקה. ה-Plant מחבר את הרכש לעולם הפיזי (היכן יתקבל החומר) ולעולם הכספי (איזו Company Code ואיזו Valuation Area).",
      processExampleHe:
        "בהזמנת-רכש לתרכיז: ה-Plant בשורה הוא מפעל-המילוי. בקבלת-הטובין (MIGO) המלאי נכנס לאותו Plant ומוערך לפי ה-Material Master שלו ב-Plant זה; ה-FI נרשם ל-Company Code שאליו ה-Plant משויך.",
      scenarioHe:
        "בארגון: כל מפעל-מילוי הוא Plant נפרד (למשל 'PL10' אשקלון, 'PL20' באר-טוביה); מרכז-הפצה ומחסן-תרכיז מרכזי הם Plants לוגיסטיים. כולם משויכים לארגון1 ול-Purchasing Org MFG1.",
      navHe: [
        "Enterprise Structure ► Definition ► Logistics – General ► Define, copy, delete, check plant (OX10)",
        "Enterprise Structure ► Assignment ► Logistics – General ► Assign plant to company code (OX18)",
        "Enterprise Structure ► Assignment ► Materials Management ► Assign purchasing organization to plant (OX17)",
        "Materials Management ► Purchasing ► Environment Data ► Define Default Values for Buyers / Plant params",
      ],
      tables: ["T001W", "T001K", "T001", "T024W", "T499S"],
      tcodes: ["OX10", "OX18", "OX17", "OMS2"],
      fiori: ["F1557", "F2761"],
      configHe: [
        "Plant (OX10): מפתח 4 תווים, שם, כתובת מלאה, מדינה ו-Region (Jurisdiction למס) — צור בהעתקה מ-0001.",
        "Assignment to Company Code (OX18): קובע את הישות המשפטית לכל תנועות-הרכש של ה-Plant.",
        "Assignment to Purchasing Org (OX17): תנאי-סף ליצירת הזמנות-רכש עבור ה-Plant.",
        "Factory Calendar: ימי-עבודה לחישובי-תזמון של מסירות ו-MRP.",
      ],
      flow: [
        { he: "יצירת Plant", code: "OX10", note: "העתקה + כתובת" },
        { he: "שיוך ל-Company Code", code: "OX18" },
        { he: "שיוך ל-Purchasing Org", code: "OX17" },
        { he: "הגדרת Storage Locations", code: "OX09" },
        { he: "מוכן לרכש ומלאי", code: "ME21N/MIGO" },
      ],
      masterDataHe: [
        "T001W = Plant (WERKS, שם, כתובת, Region, Factory Calendar) · T001K = Valuation Area↔Company Code.",
        "T024W = שיוך Purchasing Org↔Plant · ה-Plant הוא Valuation Area ב-S/4HANA.",
      ],
      mistakesHe: [
        "אי-שיוך Plant ל-Purchasing Org (OX17) — אי-אפשר לרכוש עבורו.",
        "Region/Jurisdiction חסר — שגיאות בחישוב-מס בקבלה/חשבונית.",
        "יצירה מאפס — חסרים פרמטרי-MM ברירת-מחדל (Field selection, MRP).",
      ],
      troubleshootHe: [
        "אי-אפשר ליצור הזמנה ל-Plant ➔ לא שויך ל-Purchasing Org (OX17).",
        "שגיאת-מס בקבלה ➔ Region/Tax Jurisdiction של ה-Plant חסר.",
        "FI שגוי בקבלה ➔ Plant שויך ל-Company Code לא-נכון (OX18).",
      ],
      bestPracticeHe: [
        "צור Plant בהעתקה מ-0001 כדי לרשת הגדרות-MM ו-Field Selection.",
        "מלא כתובת מלאה ו-Region כבר בהקמה — קריטי למס ולמסירות.",
        "שייך מיד ל-Company Code ול-Purchasing Org כדי שיהיה פעיל לרכש.",
      ],
      interviewHe: [
        { qHe: "מהו Plant ומדוע הוא מרכזי ברכש?", aHe: "אתר פיזי שבו מתרחשת הלוגיסטיקה; כל שורת-הזמנה נושאת Plant שממנו נגזרים ה-Company Code, ה-Valuation Area והמסירה." },
        { qHe: "מהו תנאי-הסף לרכוש עבור Plant?", aHe: "שיוך ה-Plant ל-Purchasing Organization (OX17); בלעדיו אי-אפשר ליצור הזמנת-רכש עבורו." },
        { qHe: "מהי המשמעות של Plant כ-Valuation Area ב-S/4HANA?", aHe: "הערכת-המלאי וה-Material Master valuation מנוהלות ברמת-Plant, כלומר אותו חומר יכול להיות מוערך שונה בכל Plant." },
      ],
      takeawaysHe: [
        "Plant = אתר פיזי + Valuation Area (S/4HANA).",
        "כל הזמנה נושאת Plant; ממנו נגזרים Company Code ומסירה.",
        "שיוך ל-Purchasing Org (OX17) הוא תנאי-סף לרכש.",
      ],
      relatedHe: [
        { labelHe: "MM · Company Code (3.3)", href: "/library/mm/chapter-03/#sub-3.3" },
        { labelHe: "MM · Storage Locations (3.5)", href: "/library/mm/chapter-03/#sub-3.5" },
      ],
    },
    // ============================================================ 3.5
    {
      id: "3.5",
      titleHe: "מיקומי אחסון ומחסנים",
      titleEn: "Storage Locations and Warehouses",
      execHe:
        "מיקומי-אחסון (Storage Locations) ומחסנים (Warehouses) הם הרמות שבתוך ה-Plant שבהן מנוהל המלאי הפיזי. Storage Location היא תת-חלוקה לוגיסטית של Plant ברמת ה-Inventory Management (IM); Warehouse (EWM/WM) מוסיף ניהול מפורט ברמת-Bin. בהקשר הרכש, ה-Storage Location בשורת-ההזמנה קובעת לאן ייכנס הטובין בקבלה.",
      beginnerHe:
        "בתוך כל Plant יש 'אזורים' — Storage Locations — כמו 'מחסן חומרי-גלם', 'מחסן אריזה', 'מלאי מקורר'. כשמקבלים סחורה, בוחרים לאיזה אזור היא נכנסת. אם צריך ניהול מדויק יותר (מדפים ותאים), מפעילים Warehouse Management מעל ה-Storage Location.",
      consultantHe:
        "Storage Location (T001L) היא הרמה הנמוכה ביותר ב-IM שבה נספר מלאי לפי כמות (לא לפי Bin). Warehouse (EWM/Stock-room WM) מקושר ל-Storage Location דרך טבלת השיוך ומוסיף ניהול Bin/HU מלא. ב-S/4HANA הסטנדרט הוא EWM (embedded), אך IM-only עדיין נפוץ. החלטת-עיצוב מרכזית: אילו Storage Locations מצדיקות ניהול-מחסן מלא לעומת ניהול-IM פשוט. תת-סעיף 3.5.1 מפרט את ה-Storage Location, ו-3.5.2 את יצירת ה-Warehouse.",
      purposeHe:
        "לחלק את המלאי הפיזי שבתוך ה-Plant לאזורי-אחסון בעלי משמעות תפעולית, ולאפשר רמת-בקרה מתאימה — IM פשוט היכן שדי בכך, או ניהול-מחסן מלא היכן שנדרש מעקב מדויק.",
      processExampleHe:
        "בקבלת-טובין: ה-Storage Location בשורת-ההזמנה קובעת לאן נכנס המלאי. אם ה-Storage Location מנוהלת-מחסן, נוצרת משימת-מחסן (Warehouse Task) להעברת הטובין ל-Bin פיזי; אחרת המלאי נרשם ישירות ברמת-הכמות.",
      scenarioHe:
        "בארגון: בכל מפעל-מילוי — Storage Locations נפרדים לתרכיז (מקורר), לסוכר, לאריזה, ולמוצר-מוגמר. מחסן המוצר-המוגמר מנוהל ב-EWM עם Bins למשטחים; מחסן-החומרים הפשוטים נשאר IM-only.",
      navHe: [
        "Enterprise Structure ► Definition ► Materials Management ► Maintain storage location (OX09)",
        "Enterprise Structure ► Definition ► Logistics Execution ► Define, copy, delete, check warehouse number",
        "Enterprise Structure ► Assignment ► Logistics Execution ► Assign warehouse number to plant/storage location",
      ],
      tables: ["T001L", "T300", "T320", "T001W", "NSDM_V_LGORT"],
      tcodes: ["OX09", "OMS2", "LX01"],
      fiori: ["F1557", "F4072"],
      configHe: [
        "Storage Location (OX09): מפתח 4 תווים ייחודי בתוך Plant; כתובת ופרמטרי-מלאי אופציונליים.",
        "Warehouse Number: רמת ניהול-מחסן (WM/EWM) המקושרת ל-Storage Location.",
        "Assignment Plant+SLoc ↔ Warehouse: קובע אילו Storage Locations מנוהלות-מחסן.",
        "Auto Storage Location creation: אופציה ליצירת SLoc אוטומטית בתנועת-טובין ראשונה.",
      ],
      flow: [
        { he: "הגדרת Storage Location", code: "OX09" },
        { he: "החלטה: IM או WM/EWM", note: "לפי צורך-בקרה" },
        { he: "הגדרת Warehouse Number", note: "אם נדרש" },
        { he: "שיוך Plant+SLoc↔Warehouse" },
        { he: "מוכן לקבלת-טובין", code: "MIGO" },
      ],
      masterDataHe: [
        "T001L = Storage Location (LGORT, שייך ל-Plant) · T300 = Warehouse Number.",
        "T320 = שיוך Plant+Storage Location↔Warehouse Number.",
      ],
      mistakesHe: [
        "ריבוי Storage Locations מיותרות — מסבך קבלה וספירת-מלאי.",
        "הפעלת WM/EWM היכן שדי ב-IM — תקורה תפעולית מיותרת.",
        "אי-תכנון השיוך SLoc↔Warehouse — מלאי מנוהל-מחסן ללא Bins מוגדרים.",
      ],
      troubleshootHe: [
        "קבלה נכשלת ➔ Storage Location לא קיימת ב-Plant (OX09).",
        "לא נוצרת משימת-מחסן ➔ ה-SLoc אינה משויכת ל-Warehouse, או EWM לא מופעל.",
        "מלאי בתת-אזור שגוי ➔ Storage Location שגויה הוקלדה בשורה.",
      ],
      bestPracticeHe: [
        "הגדר Storage Locations לפי משמעות תפעולית אמיתית, לא 'ליתר ביטחון'.",
        "הפעל ניהול-מחסן (EWM) רק היכן שמדפים/תאים מצדיקים זאת.",
        "תכנן מראש את מטריצת SLoc↔Warehouse לפני הקבלות הראשונות.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Storage Location ל-Warehouse?", aHe: "Storage Location (IM) מנהלת מלאי לפי כמות בתוך Plant; Warehouse (WM/EWM) מוסיף ניהול מפורט ברמת-Bin/HU. ה-Warehouse מקושר ל-Storage Location." },
        { qHe: "מהי הרמה הנמוכה ביותר לניהול-מלאי ב-IM?", aHe: "ה-Storage Location — מתחת ל-Plant; ספירת-המלאי וההפרדה נעשות ברמתה." },
        { qHe: "מתי מפעילים EWM/WM מעל Storage Location?", aHe: "כשנדרש מעקב מדויק ברמת-תא (Bin), Handling Units או אסטרטגיות-העלאה/הורדה — ולא די בספירת-כמות פשוטה." },
      ],
      takeawaysHe: [
        "Storage Location = תת-חלוקת Plant לניהול-מלאי ברמת-כמות (IM).",
        "Warehouse (WM/EWM) מוסיף ניהול Bin מעל ה-Storage Location.",
        "ה-SLoc בשורת-ההזמנה קובעת לאן נכנס הטובין בקבלה.",
      ],
      relatedHe: [
        { labelHe: "MM · Plants (3.4)", href: "/library/mm/chapter-03/#sub-3.4" },
      ],
      children: [
        {
          id: "3.5.1",
          titleHe: "מיקום אחסון (Storage Location)",
          titleEn: "Storage Location",
          execHe:
            "Storage Location היא היחידה הארגונית הנמוכה ביותר לניהול-מלאי ב-Inventory Management — תת-חלוקה של Plant שבה נספר ומנוהל המלאי לפי כמות. מפתחה בן 4 תווים ייחודי בתוך ה-Plant, והיא קובעת לאן נכנס ויוצא טובין בכל תנועת-מלאי.",
          beginnerHe:
            "Storage Location היא 'אזור-אחסון' בתוך המפעל — למשל 'RM01 = חומרי-גלם'. בכל קבלה או הוצאה בוחרים את ה-Storage Location, וכך המערכת יודעת היכן נמצא המלאי בתוך ה-Plant.",
          consultantHe:
            "מוגדרת ב-OX09, מאוחסנת ב-T001L (מפתח LGORT). אותו מפתח SLoc יכול לחזור ב-Plants שונים אך הוא ייחודי בתוך כל Plant. ניתן לאפשר יצירה-אוטומטית של SLoc בתנועת-טובין ראשונה (Allow creation of new storage location), ולהפעיל Negative Stock per SLoc. ב-S/4HANA נתוני-המלאי מאוחדים ב-MARD (ברמת-SLoc) שמעליו View NSDM. ה-SLoc משמשת גם כקריטריון ב-MRP (Storage-location MRP) ובהזמנות.",
          purposeHe:
            "להפריד את המלאי בתוך ה-Plant לאזורים בעלי משמעות — חומרי-גלם, אריזה, מוצר-מוגמר, פסולת — לצורך בקרה, ספירה ותכנון נפרדים.",
          processExampleHe:
            "בקבלת-טובין (MIGO 101): המלאי נכנס ל-Storage Location שבשורת-ההזמנה (למשל RM01). בהוצאה לייצור (261) המלאי יוצא מ-SLoc זה. דוח-מלאי (MMBE) מציג את היתרה לפי Plant + Storage Location.",
          scenarioHe:
            "בארגון: RM01 תרכיז-מקורר, RM02 סוכר, PK01 אריזה, FG01 מוצר-מוגמר. הפרדה זו מאפשרת ספירת-מלאי וניהול-תוקף נפרדים לכל סוג-חומר.",
          navHe: [
            "Enterprise Structure ► Definition ► Materials Management ► Maintain storage location (OX09)",
            "Materials Management ► Inventory Management and Physical Inventory ► Goods Receipt ► Create Storage Location Automatically",
          ],
          tables: ["T001L", "MARD", "T001W"],
          tcodes: ["OX09", "MMSC", "MMBE"],
          fiori: ["F1557", "F1422"],
          configHe: [
            "Storage Location (OX09): מפתח 4 תווים ייחודי בתוך Plant + תיאור וכתובת.",
            "Allow automatic creation: יצירת SLoc בתנועת-טובין ראשונה (לטובין נכנס/יוצא בנפרד).",
            "Storage-location MRP: אפשרות לתכנן ברמת-SLoc (Reorder point per SLoc).",
            "Mass extension (MMSC): הרחבת חומר למספר Storage Locations בבת-אחת.",
          ],
          flow: [
            { he: "הגדרת Storage Location", code: "OX09" },
            { he: "הרחבת חומר ל-SLoc", code: "MMSC" },
            { he: "קבלה ל-SLoc", code: "MIGO 101" },
            { he: "הוצאה מ-SLoc", code: "MIGO 261" },
            { he: "דוח-מלאי לפי SLoc", code: "MMBE" },
          ],
          masterDataHe: [
            "T001L = Storage Location (LGORT) · MARD = מלאי ברמת חומר/Plant/Storage Location.",
            "הרחבת חומר ל-SLoc (MMSC) דרושה לפני קבלה ראשונה אם אין יצירה-אוטומטית.",
          ],
          mistakesHe: [
            "אי-הרחבת חומר ל-SLoc — קבלה נכשלת או יוצרת SLoc-view ריק.",
            "ריבוי Storage Locations דומים — מסבך ספירה ודיווח.",
            "הפעלת Negative Stock ללא בקרה — מלאי שלילי 'מסתיר' חוסרים.",
          ],
          troubleshootHe: [
            "קבלה נכשלת 'storage location not extended' ➔ הרחב חומר ב-MMSC או אפשר יצירה-אוטומטית.",
            "מלאי לא נראה ➔ נבדק Plant/SLoc שגוי ב-MMBE.",
            "ספירת-מלאי לא תואמת ➔ תנועות נרשמו ל-SLoc שגויה.",
          ],
          bestPracticeHe: [
            "תכנן מערך-SLoc מינימלי בעל משמעות תפעולית ברורה.",
            "השתמש ב-MMSC להרחבה המונית של חומרים ל-SLoc חדשה.",
            "הימנע מ-Negative Stock אלא בתרחישים מבוקרים.",
          ],
          interviewHe: [
            { qHe: "מהי Storage Location ומה ייחודיות-מפתחה?", aHe: "היחידה הנמוכה ביותר לניהול-מלאי ב-IM, תת-חלוקה של Plant; מפתחה בן 4 תווים ייחודי בתוך ה-Plant (יכול לחזור ב-Plants אחרים)." },
            { qHe: "מהי טבלת המלאי ברמת-SLoc?", aHe: "MARD — מחזיקה את כמויות המלאי לפי חומר/Plant/Storage Location." },
            { qHe: "כיצד מרחיבים חומר למספר Storage Locations?", aHe: "באמצעות MMSC (Mass storage location creation) או יצירה-אוטומטית בתנועה ראשונה." },
          ],
          takeawaysHe: [
            "Storage Location = תת-חלוקת Plant, רמת-המלאי הנמוכה ב-IM.",
            "מפתח 4 תווים ייחודי בתוך Plant; מלאי ב-MARD.",
            "הרחב חומר ל-SLoc (MMSC) לפני הקבלה הראשונה.",
          ],
        },
        {
          id: "3.5.2",
          titleHe: "יצירת מחסן (Warehouse Creation)",
          titleEn: "Warehouse Creation",
          execHe:
            "יצירת Warehouse פירושה הגדרת מספר-מחסן (Warehouse Number) המאפשר ניהול-מלאי מפורט ברמת-תא (Bin) מעל ה-Storage Location, באמצעות WM או — בסטנדרט S/4HANA — EWM (Embedded). זהו שכבת-בקרה נוספת לאתרים שבהם נדרש מעקב פיזי מדויק.",
          beginnerHe:
            "כשמחסן גדול ומורכב — מדפים, שורות, תאים — ניהול ברמת-כמות בלבד אינו מספיק. יוצרים 'מספר-מחסן' שמנהל כל תא (Bin) בנפרד, יודע בדיוק היכן מונח כל משטח, ומפיק משימות-מחסן להעלאה והורדה.",
          consultantHe:
            "מגדירים Warehouse Number (T300), משייכים אותו לצירוף Plant + Storage Location (T320). ב-S/4HANA הסטנדרט הוא EWM Embedded, המקושר דרך מיפוי SLoc↔Storage-Type; קיים גם Stock Room Management (WM הקלאסי המופחת) כגשר-מעבר. נדרשים: Storage Types, Storage Sections, Bins, ו-Activity-control (Putaway/Removal strategies). תנועת-קבלה במלאי-מנוהל-מחסן יוצרת Warehouse Task/Order לביצוע פיזי. החלטה ארכיטקטונית: Embedded EWM מול Decentralized.",
          purposeHe:
            "לספק נראות וניהול ברמת-Bin — היכן בדיוק נמצא כל פריט, אילו אסטרטגיות-העלאה/הורדה חלות, וכיצד מתבצעות משימות-המחסן — לאתרים שבהם ספירת-כמות פשוטה אינה מספקת.",
          processExampleHe:
            "קבלת-טובין למוצר-מוגמר ב-SLoc מנוהלת-EWM: רישום ה-101 יוצר Inbound Delivery; EWM מפיק Warehouse Task להעלאת המשטח ל-Bin לפי Putaway strategy; עם אישור-המשימה המלאי 'נח' ב-Bin הפיזי ונראה במלואו.",
          scenarioHe:
            "בארגון: מחסן המוצר-המוגמר בכל מפעל-מילוי מנוהל ב-EWM עם Bins למשטחי-משקאות, אסטרטגיית FIFO לפי תוקף; מחסני חומרי-גלם פשוטים נשארים IM-only ללא Warehouse.",
          navHe: [
            "Enterprise Structure ► Definition ► Logistics Execution ► Define, copy, delete, check warehouse number",
            "Enterprise Structure ► Assignment ► Logistics Execution ► Assign warehouse number to plant/storage location",
            "SCM Extended Warehouse Management ► Master Data ► Define Storage Type / Storage Section / Bins",
          ],
          tables: ["T300", "T320", "T301", "/SCWM/LAGP", "/SCWM/T301"],
          tcodes: ["LX01", "/SCWM/MON", "/SCWM/PSA"],
          fiori: ["F4072", "F2761"],
          configHe: [
            "Warehouse Number (T300): מפתח המחסן + פרמטרי-בקרה (WM/EWM/Stock Room).",
            "Assignment Plant+SLoc↔Warehouse (T320): קובע אילו Storage Locations מנוהלות-מחסן.",
            "Storage Types/Sections/Bins: מבנה פיזי פנימי לניהול-תא.",
            "Putaway/Removal strategies: לוגיקת בחירת-Bin להעלאה והורדה (FIFO/קבוע).",
          ],
          flow: [
            { he: "הגדרת Warehouse Number", code: "T300" },
            { he: "שיוך Plant+SLoc↔Warehouse", code: "T320" },
            { he: "הגדרת Storage Types/Bins" },
            { he: "אסטרטגיות Putaway/Removal" },
            { he: "קבלה יוצרת Warehouse Task", code: "/SCWM/MON" },
          ],
          masterDataHe: [
            "T300 = Warehouse Number · T320 = שיוך Plant+Storage Location↔Warehouse.",
            "EWM: /SCWM/LAGP = Storage Bins · Inbound Delivery מתורגם ל-Warehouse Tasks.",
          ],
          mistakesHe: [
            "הפעלת ניהול-מחסן ללא הגדרת Bins/Storage Types — משימות נכשלות.",
            "שיוך SLoc ל-Warehouse בלי תכנון אסטרטגיות — Putaway אקראי.",
            "בחירת ארכיטקטורה (Embedded/Decentralized) ללא ניתוח-נפח — תקורה מיותרת.",
          ],
          troubleshootHe: [
            "משימת-מחסן לא נוצרת ➔ SLoc לא משויכת ל-Warehouse (T320) או EWM-mapping חסר.",
            "Putaway נכשל ➔ אין Bin פנוי או אסטרטגיה לא הוגדרה.",
            "מלאי לא מסתנכרן IM↔EWM ➔ תקלת queue/mapping בין IM ל-EWM.",
          ],
          bestPracticeHe: [
            "הפעל Warehouse רק היכן שמורכבות פיזית מצדיקה ניהול-Bin.",
            "ב-S/4HANA העדף EWM Embedded על-פני WM קלאסי לפרויקטים חדשים.",
            "הגדר Storage Types ואסטרטגיות לפני הקבלות הראשונות.",
          ],
          interviewHe: [
            { qHe: "מהו Warehouse Number וכיצד הוא נקשר ל-IM?", aHe: "מספר-המחסן (T300) המנהל מלאי ברמת-Bin; הוא משויך לצירוף Plant + Storage Location (T320), כך שתנועות ב-SLoc זו מנוהלות-מחסן." },
            { qHe: "מהו הסטנדרט לניהול-מחסן ב-S/4HANA?", aHe: "EWM Embedded; WM הקלאסי הוחלף ב-Stock Room Management כגשר-מעבר בלבד." },
            { qHe: "מה קורה בקבלה ל-Storage Location מנוהלת-מחסן?", aHe: "נוצרת Inbound Delivery ו-Warehouse Task להעלאת הטובין ל-Bin לפי Putaway strategy; המלאי 'נח' רק עם אישור-המשימה." },
          ],
          takeawaysHe: [
            "Warehouse מוסיף ניהול ברמת-Bin מעל ה-Storage Location.",
            "Warehouse Number (T300) משויך ל-Plant+SLoc (T320).",
            "EWM Embedded הוא הסטנדרט ב-S/4HANA.",
          ],
        },
      ],
    },
    // ============================================================ 3.6
    {
      id: "3.6",
      titleHe: "ארגוני רכש (Purchasing Organizations)",
      titleEn: "Purchasing Organizations",
      execHe:
        "ה-Purchasing Organization היא היחידה הארגונית האחראית על הרכש מול הספקים — מנהלת משא-ומתן, חתומה על חוזים ומתחזקת תנאי-רכש (Info Records, Contracts, Pricing). היא הרמה החוזית-משפטית של הרכש, ומשויכת ל-Company Code ו/או ל-Plants כדי להגדיר את היקף-פעולתה.",
      beginnerHe:
        "Purchasing Organization = 'מחלקת-הרכש' שמדברת עם הספקים. היא קובעת אילו מחירים ותנאים חלים, וחתומה על החוזים. כל הזמנת-רכש שייכת ל-Purchasing Organization מסוימת.",
      consultantHe:
        "מוגדרת ב-OX08, מאוחסנת ב-T024E. שלושה מודלים: (1) מרכזית — PurchOrg אחת לכל הארגון, משויכת ל-Company Code (OX01) ולכל ה-Plants (OX17); (2) לפי-Company-Code; (3) לפי-Plant. קיים גם Reference Purchasing Organization (OMGN) לשיתוף חוזים/תנאים בין PurchOrgs. אי-שיוך ל-Company Code יוצר 'Cross-Company-Code' PurchOrg (קביעת ה-CC במסמך). ה-Info Records ותנאי-המחיר נשמרים ברמת-PurchOrg — ולכן בחירתה משפיעה ישירות על תמחור-ההזמנה.",
      purposeHe:
        "לרכז את האחריות החוזית מול הספקים ביחידה מוגדרת, שמתחזקת תנאים ומחירים ושעבורה נמדד ביצוע-הרכש. היא קובעת אילו מחירים וחוזים חלים על כל הזמנה.",
      processExampleHe:
        "ביצירת הזמנת-רכש: בוחרים Purchasing Organization; המערכת שולפת את ה-Info Record ותנאי-המחיר השמורים ל-PurchOrg+Vendor+Material, ומאכלסת אוטומטית מחיר ותנאים. PurchOrg אחרת עשויה לשלוף תנאים שונים לאותו ספק.",
      scenarioHe:
        "בארגון: Purchasing Organization מרכזית 'MFG1' מנהלת חוזי-מסגרת ארציים מול ספקי תרכיז וסוכר; היא משויכת לארגון1 ולכל מפעלי-המילוי, כך שכל מפעל נהנה מתנאי-החוזה המרכזיים.",
      navHe: [
        "Enterprise Structure ► Definition ► Materials Management ► Maintain purchasing organization (OX08)",
        "Enterprise Structure ► Assignment ► Materials Management ► Assign purchasing organization to company code (OX01)",
        "Enterprise Structure ► Assignment ► Materials Management ► Assign purchasing organization to plant (OX17)",
        "Enterprise Structure ► Assignment ► Materials Management ► Assign Reference Purchasing Organization (OMGN)",
      ],
      tables: ["T024E", "T024Z", "T024W", "T001"],
      tcodes: ["OX08", "OX01", "OX17", "OMGN"],
      fiori: ["F1557", "F4072"],
      configHe: [
        "Purchasing Organization (OX08): מפתח 4 תווים + תיאור — הרמה החוזית מול הספק.",
        "Assign to Company Code (OX01): קושר ל-Company Code אחד, או משאיר Cross-CC (קביעה במסמך).",
        "Assign to Plant (OX17): קובע עבור אילו Plants ה-PurchOrg רשאית לרכוש — תנאי-סף להזמנה.",
        "Reference Purchasing Organization (OMGN): שיתוף חוזים ותנאים בין PurchOrgs.",
      ],
      flow: [
        { he: "הגדרת Purchasing Org", code: "OX08" },
        { he: "שיוך ל-Company Code", code: "OX01", note: "או Cross-CC" },
        { he: "שיוך ל-Plants", code: "OX17" },
        { he: "Reference PurchOrg (אופ')", code: "OMGN" },
        { he: "מוכן ל-Info Records/הזמנות", code: "ME11/ME21N" },
      ],
      masterDataHe: [
        "T024E = Purchasing Organization · T024Z = שיוך PurchOrg↔Company Code · T024W = שיוך PurchOrg↔Plant.",
        "Info Records ותנאי-מחיר נשמרים ברמת-PurchOrg ומשפיעים ישירות על תמחור-ההזמנה.",
      ],
      mistakesHe: [
        "אי-שיוך PurchOrg ל-Plant (OX17) — אי-אפשר לרכוש עבורו.",
        "בחירת מודל-PurchOrg שגוי (מרכזי מול מבוזר) ללא ניתוח עסקי — קושי לשנות בדיעבד.",
        "ערבוב Info Records בין PurchOrgs — מחירים שגויים בהזמנות.",
      ],
      troubleshootHe: [
        "אי-אפשר ליצור הזמנה ➔ PurchOrg לא שויכה ל-Plant (OX17) או ל-Company Code.",
        "מחיר שגוי/חסר בהזמנה ➔ Info Record שייך ל-PurchOrg אחר.",
        "חוזה לא חל ➔ ה-PurchOrg אינה ה-Reference המתאים (OMGN).",
      ],
      bestPracticeHe: [
        "החלט על מודל-PurchOrg (מרכזי/מבוזר/רפרנס) בשלב העיצוב — שינוי בדיעבד יקר.",
        "השתמש ב-Reference Purchasing Organization לשיתוף חוזים ארציים.",
        "תעד מטריצת PurchOrg↔Plant↔Company Code כמקור-אמת.",
      ],
      interviewHe: [
        { qHe: "מהי Purchasing Organization ומה תפקידה?", aHe: "היחידה האחראית על הרכש מול הספק — מנהלת משא-ומתן, חוזים, Info Records ותנאי-מחיר; הרמה החוזית-משפטית של הרכש." },
        { qHe: "מהם המודלים האפשריים לשיוך PurchOrg?", aHe: "מרכזית (לכל הארגון, Cross-CC), לפי-Company-Code, או לפי-Plant; ניתן גם Reference PurchOrg לשיתוף חוזים." },
        { qHe: "כיצד ה-PurchOrg משפיעה על תמחור-ההזמנה?", aHe: "Info Records ותנאי-המחיר נשמרים ברמת-PurchOrg; בחירת ה-PurchOrg בהזמנה קובעת אילו מחירים ותנאים נשלפים." },
      ],
      takeawaysHe: [
        "Purchasing Organization = הרמה החוזית מול הספק.",
        "משויכת ל-Company Code (OX01) ו/או Plants (OX17).",
        "Info Records ומחירים נשמרים ברמתה — משפיעים על כל הזמנה.",
      ],
      relatedHe: [
        { labelHe: "MM · Sourcing-Specific Objects (3.2)", href: "/library/mm/chapter-03/#sub-3.2" },
        { labelHe: "MM · Purchasing Group Creation (3.7)", href: "/library/mm/chapter-03/#sub-3.7" },
      ],
    },
    // ============================================================ 3.7
    {
      id: "3.7",
      titleHe: "יצירת קבוצת רכש (Purchasing Group Creation)",
      titleEn: "Purchasing Group Creation",
      execHe:
        "ה-Purchasing Group היא יחידה תפעולית המייצגת קונה או צוות-קונים האחראים בפועל על קבוצת-חומרים או ספקים. בניגוד ל-Purchasing Organization, היא אינה משויכת ארגונית-קשיחה אלא מוקצית במסמכי-הרכש, ומשמשת לבקרה, מעקב ודיווח על ביצוע-הרכש.",
      beginnerHe:
        "Purchasing Group = 'הקונה' או 'צוות-הקנייה' שמטפל בפועל בהזמנות. למשל קבוצה אחת לחומרי-גלם, אחרת לאריזה, אחרת לתחזוקה. כל הזמנה מציינת איזו Purchasing Group אחראית עליה.",
      consultantHe:
        "נוצרת ב-OME4, מאוחסנת ב-T024 — מפתח בן 3 תווים עם תיאור ומידע-קשר (טלפון, פקס, דוא\"ל). היא אינה משויכת ל-Plant או ל-Company Code; היא ערך תפעולי שמוקצה בשורת-המסמך (EKKO/EKPO). משמשת כקריטריון ב-MRP (אכלוס אוטומטי בהזמנות-מתוכננות דרך Material Master MRP view), בדוחות-רכש ובאסטרטגיות-אישור (Release strategy). ב-S/4HANA אפשר לקשר Purchasing Group ל-Buyer (Employee) לצורך Fiori-workflows.",
      purposeHe:
        "לזהות מי הקונה-האחראי בפועל על כל פעולת-רכש — לצורך אחריותיות, ניתוב-אישורים, מעקב-ביצוע ודיווח. היא ממד תפעולי-ניהולי ולא רמה במבנה הקשיח.",
      processExampleHe:
        "ב-MRP: דרישת-חומר יוצרת הזמנה-מתוכננת ש-Purchasing Group שלה נגזרת מ-Material Master (MRP view). בהמרה להזמנת-רכש, ה-Purchasing Group עוברת אוטומטית ומשמשת לניתוב-האישור (Release strategy) ולמעקב הקונה-האחראי.",
      scenarioHe:
        "בארגון: Purchasing Group 'R01' לחומרי-גלם (תרכיז/סוכר), 'P01' לאריזה, 'M01' ל-MRO/חלפים. כל קבוצה נושאת את פרטי-הקשר של הקונה האחראי ומסננת את דוחות-הרכש שלו.",
      navHe: [
        "Materials Management ► Purchasing ► Create Purchasing Groups (OME4)",
        "SAP IMG ► Materials Management ► Purchasing ► Purchasing Group ► Maintain (OMEH)",
        "Materials Management ► Purchasing ► Purchase Order ► Release Procedure ► Define Release Strategy (per Purchasing Group)",
      ],
      tables: ["T024", "EKKO", "EKPO"],
      tcodes: ["OME4", "OMEH", "ME21N"],
      fiori: ["F1557", "F0842A"],
      configHe: [
        "Purchasing Group (OME4): מפתח 3 תווים + תיאור + מידע-קשר (טלפון/פקס/דוא\"ל).",
        "אין שיוך ארגוני: הקבוצה מוקצית במסמך-הרכש, לא משויכת ל-Plant/Company Code.",
        "שימוש ב-Release Strategy: ניתן להפעיל אסטרטגיית-אישור לפי Purchasing Group.",
        "קישור ל-Buyer (S/4HANA): שיוך עובד/Employee לקבוצה ל-Fiori workflows.",
      ],
      flow: [
        { he: "יצירת Purchasing Group", code: "OME4", note: "מפתח 3 תווים + קשר" },
        { he: "אכלוס ב-Material Master MRP", note: "ברירת-מחדל" },
        { he: "הקצאה בהזמנה", code: "ME21N" },
        { he: "ניתוב Release Strategy", note: "לפי קבוצה" },
        { he: "דיווח ומעקב-קונה", code: "ME2L/ME2M" },
      ],
      masterDataHe: [
        "T024 = Purchasing Group (EKGRP, תיאור, מידע-קשר) · מוקצית ב-EKKO/EKPO (כותרת/שורת-הזמנה).",
        "Material Master (MRP view) מחזיק Purchasing Group ברירת-מחדל לאכלוס אוטומטי.",
      ],
      mistakesHe: [
        "ריבוי Purchasing Groups מיותרות — מקשה דיווח ותחזוקה.",
        "אי-מילוי מידע-קשר — קושי ביצירת-קשר עם הספק/הקונה.",
        "בלבול עם Purchasing Organization — ניסיון לשייך ארגונית קבוצה שאינה משויכת.",
      ],
      troubleshootHe: [
        "Purchasing Group לא נבחרת בהזמנה ➔ לא הוגדרה ב-OME4 או מפתח שגוי.",
        "אישור לא מנותב נכון ➔ Release Strategy לא כוללת את ה-Purchasing Group.",
        "דוח-קונה ריק ➔ ה-Purchasing Group לא אוכלסה ב-Material Master/הזמנה.",
      ],
      bestPracticeHe: [
        "שמור על מספר מצומצם של Purchasing Groups בעלות משמעות עסקית ברורה.",
        "מלא תמיד מידע-קשר מלא לכל קבוצה.",
        "אכלס Purchasing Group ב-Material Master כדי שתיגזר אוטומטית ל-MRP/הזמנות.",
      ],
      interviewHe: [
        { qHe: "מהי Purchasing Group ובמה היא שונה מ-Purchasing Organization?", aHe: "Purchasing Group היא יחידה תפעולית (קונה/צוות) המוקצית במסמכים ונושאת מידע-קשר, ללא שיוך ארגוני קשיח; Purchasing Organization היא הרמה החוזית-משפטית המשויכת ל-Company Code/Plants." },
        { qHe: "היכן מוקצית ה-Purchasing Group ומהיכן היא נגזרת?", aHe: "מוקצית בשורת/כותרת מסמך-הרכש (EKKO/EKPO); נגזרת אוטומטית מ-Material Master (MRP view) להזמנות-מתוכננות." },
        { qHe: "לאילו תהליכים משמשת Purchasing Group מעבר לזיהוי-קונה?", aHe: "לניתוב אסטרטגיות-אישור (Release strategy), לדוחות-רכש, וב-S/4HANA לקישור Buyer ל-Fiori workflows." },
      ],
      takeawaysHe: [
        "Purchasing Group = יחידה תפעולית (קונה), מפתח 3 תווים.",
        "אינה משויכת ארגונית — מוקצית במסמכים.",
        "משמשת לדיווח, ניתוב-אישורים ואכלוס מ-Material Master.",
      ],
      relatedHe: [
        { labelHe: "MM · Purchasing Organizations (3.6)", href: "/library/mm/chapter-03/#sub-3.6" },
        { labelHe: "MM · Sourcing-Specific Objects (3.2)", href: "/library/mm/chapter-03/#sub-3.2" },
      ],
    },
    // ============================================================ 3.8
    {
      id: "3.8",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה בנה את המבנה הארגוני המלא של הרכש (Sourcing & Procurement) ב-S/4HANA — מאובייקטי-הניהול הכלליים (Client, Company Code, Plant) ועד לאובייקטים הייעודיים-לרכש (Purchasing Organization, Purchasing Group, Storage Location/Warehouse). השליטה במבנה זה היא תנאי-סף לכל זרימת ה-Procure-to-Pay.",
      beginnerHe:
        "ראינו את כל 'הקומות' של מבנה-הרכש: Company Code (החברה המשפטית), Plant (האתר הפיזי), Storage Location ו-Warehouse (היכן מאוחסן המלאי), Purchasing Organization (מי חתום על החוזה) ו-Purchasing Group (מי קונה בפועל). יחד הם קובעים את הזהות של כל הזמנת-רכש.",
      consultantHe:
        "מבט-על: Client→Company Code(T001)→Plant(T001W)→Storage Location(T001L)→Warehouse(T300) הוא ציר-הלוגיסטיקה; Purchasing Organization(T024E) + Purchasing Group(T024) הם ציר-הרכש. השיוכים הקריטיים: Plant→Company Code (OX18), PurchOrg→Company Code (OX01), PurchOrg→Plant (OX17), SLoc→Warehouse. החלטות-העיצוב המהותיות — Valuation Level=Plant, מודל-PurchOrg (מרכזי/מבוזר), והיקף ניהול-המחסן (IM מול EWM) — נקבעות פעם אחת וקשות לשינוי. שגיאה במבנה מתפשטת לכל ה-P2P, ל-FI ול-MRP.",
      purposeHe:
        "לאחד את כל אבני-הבניין הארגוניות לתמונה אחת קוהרנטית, ולהדגיש את השיוכים והחלטות-העיצוב שמהם נגזרת תקינות כל תהליך-הרכש.",
      processExampleHe:
        "הזמנת-רכש לדוגמה מאחדת הכול: Purchasing Org MFG1 (חוזה) + Purchasing Group R01 (קונה) + Plant PL10 (מסירה) + Storage Location RM01 (אחסון) → קבלה ל-Warehouse (אם מנוהל) → FI ל-Company Code MFG1. כל ששת האובייקטים נוכחים בכל מסמך.",
      scenarioHe:
        "בארגון המבנה השלם: Company Code MFG1 → Plants (מפעלי-מילוי + מחסנים) → Storage Locations (תרכיז/סוכר/אריזה/מוגמר) + Warehouses (EWM למוגמר); Purchasing Org MFG1 מרכזית + Purchasing Groups לפי קטגוריה. זהו השלד שעליו רץ כל הרכש של הבקבוקאי.",
      navHe: [
        "Enterprise Structure ► Definition (Company Code OX02 · Plant OX10 · PurchOrg OX08 · Storage Location OX09)",
        "Enterprise Structure ► Assignment (Plant→CC OX18 · PurchOrg→CC OX01 · PurchOrg→Plant OX17)",
        "Materials Management ► Purchasing ► Create Purchasing Groups (OME4)",
      ],
      tables: ["T001", "T001W", "T001L", "T024E", "T024", "T300"],
      tcodes: ["OX02", "OX10", "OX09", "OX08", "OME4", "OX18", "OX01", "OX17"],
      fiori: ["F1557", "F4072", "F2761"],
      configHe: [
        "Definition: Company Code (OX02), Plant (OX10), Storage Location (OX09), Purchasing Org (OX08), Purchasing Group (OME4).",
        "Assignment: Plant→Company Code (OX18), PurchOrg→Company Code (OX01), PurchOrg→Plant (OX17).",
        "החלטות-עיצוב חד-פעמיות: Valuation Level=Plant, מודל-PurchOrg, היקף ניהול-מחסן (IM/EWM).",
      ],
      flow: [
        { he: "Company Code", code: "OX02", note: "ישות משפטית" },
        { he: "Plant", code: "OX10", note: "אתר + Valuation" },
        { he: "Storage Location / Warehouse", code: "OX09" },
        { he: "Purchasing Organization", code: "OX08" },
        { he: "Purchasing Group", code: "OME4" },
        { he: "שיוכים", code: "OX18/OX01/OX17", note: "חיבור הכול" },
      ],
      masterDataHe: [
        "ציר-לוגיסטיקה: T001→T001W→T001L→T300 · ציר-רכש: T024E + T024.",
        "שיוכים: OX18 (Plant→CC), OX01 (PurchOrg→CC), OX17 (PurchOrg→Plant).",
      ],
      mistakesHe: [
        "דילוג על אחד השיוכים (OX17/OX18/OX01) — מסמכי-רכש נכשלים.",
        "קבלת החלטות-עיצוב חד-פעמיות (Valuation Level, מודל-PurchOrg) ללא ניתוח — קשה לתקן.",
        "ריבוי אובייקטים (Plants/SLocs/Groups) מעבר לצורך — תקורת-תחזוקה.",
      ],
      troubleshootHe: [
        "מסמך-רכש נכשל ➔ עבור על שרשרת-השיוכים: Plant→CC, PurchOrg→CC, PurchOrg→Plant.",
        "FI/Valuation שגוי ➔ בדוק Valuation Level ו-Plant→Company Code.",
        "תמחור שגוי ➔ Info Record/PurchOrg לא תואמים.",
      ],
      bestPracticeHe: [
        "תכנן את כל מטריצת-השיוכים לפני הקונפיגורציה, כמקור-אמת יחיד.",
        "החזק את מספר האובייקטים מינימלי ובעל-משמעות.",
        "תעד את החלטות-העיצוב החד-פעמיות והרציונל שלהן.",
      ],
      interviewHe: [
        { qHe: "מהם ששת האובייקטים הארגוניים המרכזיים ברכש ומה תפקיד כל אחד?", aHe: "Company Code (ישות משפטית), Plant (אתר פיזי+Valuation), Storage Location (אזור-מלאי), Warehouse (ניהול-Bin), Purchasing Organization (חוזית), Purchasing Group (תפעולית/קונה)." },
        { qHe: "מהם השיוכים הקריטיים שבלעדיהם הרכש לא יעבוד?", aHe: "Plant→Company Code (OX18), Purchasing Org→Company Code (OX01), Purchasing Org→Plant (OX17), ו-Storage Location→Warehouse בעת ניהול-מחסן." },
        { qHe: "אילו החלטות-עיצוב הן חד-פעמיות וקשות לשינוי?", aHe: "Valuation Level (Plant ב-S/4HANA), מודל ה-Purchasing Organization (מרכזי/מבוזר), והיקף ניהול-המחסן (IM מול EWM)." },
      ],
      takeawaysHe: [
        "ציר-לוגיסטיקה: Client→Company Code→Plant→Storage Location→Warehouse.",
        "ציר-רכש: Purchasing Organization (חוזית) + Purchasing Group (תפעולית).",
        "השיוכים (OX18/OX01/OX17) ו-Valuation Level הם תנאי-הסף לכל ה-P2P.",
      ],
      relatedHe: [
        { labelHe: "MM · Enterprise Management Objects (3.1)", href: "/library/mm/chapter-03/#sub-3.1" },
        { labelHe: "MM · Purchasing Organizations (3.6)", href: "/library/mm/chapter-03/#sub-3.6" },
      ],
    },
  ],
};
