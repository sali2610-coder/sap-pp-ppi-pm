// ===== PP Digital Textbook — Chapter 2 (Organizational Structure) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved; the PDF TOC for ch.2 was partially scrambled —
// the coherent 2.1 unit (Client→Company Code→Plant→Storage Location→PP roles)
// and the 2.2 calendar unit were kept, and the duplicate scattered headings
// (2.3–2.11) were folded into their natural parents (as ch03 corrected).
import type { TextbookChapter } from "./types";

export const CH2: TextbookChapter = {
  n: 2,
  titleHe: "מבנה ארגוני ב-SAP S/4HANA",
  titleEn: "Organizational Structure in SAP S/4HANA",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למבנה הארגוני (Enterprise Structure) ב-SAP S/4HANA מנקודת-מבט ה-PP. כל תת-פרק הורחב ליחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, השפעת נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הנושאים: Client, Company Code, Plant, Storage Location, מרכזי-עבודה ומשבצות-תפקיד (MRP Controller / Capacity Planner / Production Scheduler), שיוכי-מפעל וההערכה (Valuation), וניהול לוחות-השנה (Holiday/Factory Calendar) המניעים את כל תזמון-הייצור. המטרה: לשלוט במבנה הארגוני של PP ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 2.1
    {
      id: "2.1", titleHe: "פירוק המבנה ליחידות ארגוניות", titleEn: "Breaking Down the Structure into Units",
      execHe:
        "המבנה הארגוני ב-SAP הוא ההיררכיה שמתרגמת את המציאות העסקית — חברה, אתרים, מחסנים, אנשי-תפקיד — לאובייקטים שהמערכת מבינה. הוא הבסיס שכל תנועה, מסמך ודיווח נשענים עליו: Client בראש, תחתיו Company Code (ישות-משפטית/כספית), תחתיו Plant (אתר-ייצור/לוגיסטיקה), ותחתיו Storage Location (מיקום-אחסון). שגיאה בהיררכיה הזו 'נצרבת' בכל הנתונים שייווצרו אחריה.",
      beginnerHe:
        "דמיין ארגון כתיבות בתוך תיבות: Client = כל החברה במערכת אחת; Company Code = הישות שמנהלת ספרי-חשבונות; Plant = מפעל או מרכז-לוגיסטי; Storage Location = מחסן או אזור-אחסון בתוך המפעל. כל רמה 'יושבת בתוך' זו שמעליה, וכל פעולה (קנייה, ייצור, מכירה) קורית באחת מהרמות האלה.",
      consultantHe:
        "ההיררכיה היא Client (T000) → Company Code (T001) → Plant (T001W) → Storage Location (T001L). שיוך Plant↔Company Code הוא קריטי כי הוא קובע את מטבע-ההערכה ואת הספרים שאליהם נזקפות תנועות-המלאי. ב-S/4HANA המבנה נותר אך Valuation Area = Plant כברירת-מחדל (לא Company Code), וה-Material Ledger פעיל-חובה. תכנן את המבנה לפני כל נתון-אב — אי-אפשר 'להזיז' חומר בין Company Codes בדיעבד.",
      purposeHe:
        "לתת לכל תהליך עסקי הקשר חד-משמעי: היכן נוהל המלאי, לאיזו ישות-משפטית נזקף, ובאיזה מטבע הוערך. המבנה גם מגדיר הרשאות, סינון-נתונים וגבולות-דיווח.",
      processExampleHe:
        "הזמנת-ייצור נוצרת ב-Plant 1010; משיכת-הרכיבים מורידה מלאי מ-Storage Location 0001 שבאותו Plant; קליטת-המוצר זוקפת ערך ל-Company Code שאליו ה-Plant משויך, במטבע-החברה. כל שלב 'יודע' את מקומו בהיררכיה.",
      cbcHe:
        "ב-CBC Israel: Client אחד לכל הסביבה; Company Code אחד לישות-המשפטית בישראל (מטבע ILS); Plants נפרדים לאתרי-המילוי (למשל אשקלון/באר-טוביה); Storage Locations לחומרי-גלם, אריזה ומוצר-מוגמר בכל אתר.",
      navHe: [
        "Enterprise Structure ► Definition ► Logistics – General ► Define, copy, delete, check plant",
        "Enterprise Structure ► Assignment ► Logistics – General ► Assign plant to company code",
        "Enterprise Structure ► Definition ► Financial Accounting ► Define Company Code",
      ],
      tables: ["T000", "T001", "T001W", "T001L", "T001K"],
      tcodes: ["SPRO", "OX02", "OX10", "OX18", "OX09", "SCC4"],
      fiori: ["F1481", "F2740"],
      configHe: [
        "סדר-הקמה: Client (SCC4) ← Company Code (OX02) ← Plant (OX10) ← Storage Location (OX09).",
        "שיוכים (Assignment): Plant↔Company Code (OX18), Plant↔Valuation Area, Storage Location↔Plant.",
        "Valuation Area ב-S/4HANA = Plant (T001K) — קובע את רמת-ההערכה ואת ה-Material Ledger.",
        "אל תשתמש בלקוח-ייצור לבדיקות — הקם Client נפרד לבדיקות/אינטגרציה (SCC4).",
      ],
      flow: [
        { he: "Client", code: "SCC4", note: "ראש ההיררכיה" },
        { he: "Company Code", code: "OX02", note: "ישות כספית/מטבע" },
        { he: "Plant", code: "OX10", note: "אתר ייצור/לוגיסטי" },
        { he: "שיוך Plant↔CoCode", code: "OX18" },
        { he: "Storage Location", code: "OX09", note: "מיקום אחסון" },
      ],
      masterDataHe: [
        "T000=Client · T001=Company Code · T001W=Plant · T001L=Storage Location · T001K=Valuation Area.",
        "כל חומר נפתח ברמת-Plant (MARC) ורמת-Storage-Location (MARD); ההיררכיה קובעת היכן ניתן לפתוח.",
      ],
      mistakesHe: [
        "שיוך Plant ל-Company Code שגוי — תנועות-המלאי נזקפות לישות-משפטית לא-נכונה, וקשה מאוד לתקן.",
        "ערבוב סביבות (בדיקות בלקוח-הייצור) — מזהם נתוני-אמת.",
        "הקמת Plants מיותרים 'ליתר ביטחון' — מנפח תחזוקת-נתוני-אב ושיוכים.",
        "הזנחת Valuation Area — מובילה להערכת-מלאי שגויה ב-Material Ledger.",
      ],
      troubleshootHe: [
        "'Plant not assigned to company code' ➔ חסר שיוך ב-OX18.",
        "אי-אפשר לפתוח חומר ב-Plant ➔ ה-Plant לא הוגדר/לא משויך, או חסר Valuation Area.",
        "תנועת-מלאי נזקפת לחברה שגויה ➔ שיוך Plant↔Company Code שגוי.",
      ],
      bestPracticeHe: [
        "תכנן את כל ההיררכיה והשיוכים על-נייר לפני הזנת נתון-אב ראשון.",
        "שמור על מינימום Plants ו-Company Codes הנדרשים מבחינה משפטית/תפעולית.",
        "הפרד סביבות (DEV/QAS/PRD) ולעולם אל תבדוק בלקוח-הייצור.",
        "תעד את משמעות כל Plant/Storage Location לארגון.",
      ],
      interviewHe: [
        { qHe: "מהי ההיררכיה הארגונית הבסיסית ב-SAP?", aHe: "Client → Company Code → Plant → Storage Location. כל רמה מקוננת בזו שמעליה וקובעת הקשר לתנועות ולמסמכים." },
        { qHe: "מהו Valuation Area ב-S/4HANA?", aHe: "רמת-ההערכה של המלאי; ב-S/4HANA היא Plant (לא Company Code), ומנוהלת דרך Material Ledger החובה." },
        { qHe: "מדוע שיוך Plant↔Company Code קריטי?", aHe: "הוא קובע לאיזו ישות-משפטית ובאיזה מטבע נזקפות תנועות-המלאי; שגיאה בו 'נצרבת' בכל המסמכים." },
      ],
      takeawaysHe: [
        "המבנה הארגוני מתרגם את המציאות העסקית לאובייקטי-SAP.",
        "ההיררכיה: Client → Company Code → Plant → Storage Location.",
        "תכנן ושייך לפני הזנת נתוני-אב — קשה לתקן בדיעבד.",
        "ב-S/4HANA Valuation Area = Plant, ו-Material Ledger פעיל-חובה.",
      ],
      relatedHe: [
        { labelHe: "PP · אב חומר לייצור (3.1)", href: "/library/pp/chapter-03/#sub-3.1" },
        { labelHe: "PP · הגדרת ייצור בדיד", href: "/library/pp/chapter-03/" },
        { labelHe: "אובייקט · T001W", href: "/library/pp/object/T001W/" },
      ],
      children: [
        {
          id: "2.1.1", titleHe: "לקוח (Client)", titleEn: "Client",
          execHe: "ה-Client הוא הרמה העליונה ביותר — ישות עצמאית, סגורה-מבחינת-נתונים, הכוללת את כל הנתונים הארגוניים, נתוני-האב ונתוני-התנועה. בארגון אחד מנוהלים בדרך-כלל לקוחות נפרדים לפיתוח, בדיקות וייצור.",
          beginnerHe: "Client הוא 'עולם נתונים' שלם ונפרד. נתונים בלקוח אחד אינם נראים בלקוח אחר. כשנכנסים ל-SAP בוחרים מספר-לקוח — וכל מה שעושים שייך אליו בלבד.",
          consultantHe: "מוגדר ב-SCC4 (מספר תלת-ספרתי), נשמר ב-T000. כמעט כל טבלה נושאת שדה-מפתח MANDT (Client). הגדרות-הלקוח כוללות: שינויי-Customizing מותרים/חסומים, תיקון-תוכנה, והגנת-CATT. לקוח-הייצור מוגדר 'No changes allowed' למניעת שינויים ישירים.",
          purposeHe: "להפריד באופן מוחלט בין סביבות וארגונים בתוך אותה התקנה טכנית, ולספק גבול-אבטחה ונתונים ברמה העליונה.",
          processExampleHe: "מפתח עובד בלקוח DEV, מעביר Transport ל-QAS לבדיקות, ולבסוף ל-PRD. אותו תהליך נבדק בכל לקוח בלי לזהם את האחרים.",
          cbcHe: "ב-CBC לקוח-ייצור אחד מנוהל בנעילת-Customizing; שינויים נכנסים רק דרך Transports מסביבת-הפיתוח.",
          navHe: ["Administration ► Client Administration ► Client Maintenance (SCC4)"],
          tables: ["T000"],
          tcodes: ["SCC4", "SCC1", "SCCL"],
          fiori: [],
          configHe: ["ב-SCC4 הגדר מספר-לקוח, מטבע ברירת-מחדל, ורמת-שינויים (Changes and Transports for Client-Specific Objects)."],
          mistakesHe: ["מתן הרשאות-שינוי בלקוח-הייצור — סיכון לשינוי ישיר לא-מתועד.", "ערבוב נתוני-בדיקה ואמת באותו לקוח."],
          troubleshootHe: ["שינוי-Customizing נחסם ➔ הלקוח מוגדר 'No changes allowed' (כצפוי בייצור).", "נתונים 'נעלמו' ➔ ככל הנראה בלקוח אחר."],
          bestPracticeHe: ["נעל את לקוח-הייצור לשינויים.", "נהל מסלול-Transport מסודר DEV→QAS→PRD."],
          interviewHe: [
            { qHe: "מהו Client ב-SAP?", aHe: "הרמה הארגונית העליונה — ישות-נתונים עצמאית וסגורה; כל טבלה נושאת שדה MANDT השומר לאיזה לקוח שייכת הרשומה." },
            { qHe: "מדוע מפרידים לקוחות DEV/QAS/PRD?", aHe: "כדי לבדוק שינויים בבידוד ולהעבירם בשלבים דרך Transports בלי לזהם את נתוני-הייצור." },
          ],
          takeawaysHe: ["Client = הרמה העליונה, עולם-נתונים סגור.", "MANDT הוא שדה-המפתח בכל טבלה.", "לקוח-הייצור ננעל לשינויים."],
        },
        {
          id: "2.1.2", titleHe: "קוד חברה (Company Code)", titleEn: "Company Code",
          execHe: "Company Code הוא הישות-המשפטית/כספית הקטנה ביותר שעבורה מופקים דוחות-כספיים עצמאיים (מאזן ורווח-והפסד). הוא נושא את המטבע-המקומי, את לוח-השנה-הפיסקלי ואת תרשים-החשבונות.",
          beginnerHe: "Company Code הוא 'החברה' מבחינה חשבונאית: יחידה עם מאזן ודוחות-רווח משלה. כל תנועה בעלת-ערך כספי 'נופלת' בסופו של דבר ל-Company Code.",
          consultantHe: "מוגדר ב-OX02 (קוד 4 תווים), נשמר ב-T001. נושא Local Currency, Country, Chart of Accounts, Fiscal Year Variant. ב-PP חשיבותו עקיפה אך קריטית: ה-Plant משויך אליו, וכך כל הערכת-מלאי ועלות-הייצור נזקפות לספריו. ב-S/4HANA Universal Journal (ACDOCA) מאחד FI/CO ברמת-Company Code.",
          purposeHe: "לספק את רמת-הדיווח-החשבונאי המחייב ואת מטבע-ההערכה לכל תנועות-הלוגיסטיקה והייצור.",
          processExampleHe: "קליטת מוצר-מוגמר מפק\"ע יוצרת מסמך-חומר ומסמך-FI; מסמך-ה-FI נזקף ל-Company Code של ה-Plant, במטבע-החברה, לחשבון-המלאי הרלוונטי.",
          cbcHe: "ב-CBC Company Code אחד לישות-הישראלית (מטבע ILS, לוח-שנה-פיסקלי מקומי); כל אתרי-המילוי משויכים אליו.",
          navHe: ["Enterprise Structure ► Definition ► Financial Accounting ► Edit, Copy, Delete, Check Company Code (OX02)"],
          tables: ["T001", "T880"],
          tcodes: ["OX02", "OBY6", "OB37"],
          fiori: ["F1481"],
          configHe: ["ב-OX02 הגדר Company Code, מדינה ומטבע; ב-OBY6 פרמטרים גלובליים (Fiscal Year Variant, Chart of Accounts)."],
          mistakesHe: ["יצירת Company Code 'from scratch' במקום העתקה מ-Template (0001) — מחסיר הגדרות.", "מטבע/לוח-שנה-פיסקלי שגוי — קשה מאוד לשנות אחרי תנועות."],
          troubleshootHe: ["שיוך-Plant נכשל ➔ ה-Company Code לא קיים/לא הוגדר במלואו.", "הערכה במטבע שגוי ➔ Local Currency שגוי ב-T001."],
          bestPracticeHe: ["העתק Company Code מ-Template ועדכן, אל תיצור מאפס.", "תכנן מטבע ולוח-שנה-פיסקלי מראש עם ה-FI."],
          interviewHe: [
            { qHe: "מהו Company Code?", aHe: "הישות-המשפטית/כספית הקטנה ביותר עם דוחות-כספיים עצמאיים; נושא מטבע, מדינה ותרשים-חשבונות." },
            { qHe: "כיצד Company Code קשור ל-PP?", aHe: "בעקיפין אך קריטית: ה-Plant משויך אליו, וכל הערכת-מלאי ועלות-ייצור נזקפות לספריו." },
          ],
          takeawaysHe: ["Company Code = הישות החשבונאית עם מאזן עצמאי.", "נושא מטבע, מדינה ולוח-שנה-פיסקלי.", "ה-Plant משויך אליו וזוקף לספריו."],
        },
        {
          id: "2.1.3", titleHe: "מפעל (Plant)", titleEn: "Plant",
          execHe: "ה-Plant הוא יחידת-הליבה התפעולית של הלוגיסטיקה והייצור: אתר-ייצור, מרכז-הפצה או מחסן. רוב נתוני-האב של PP (MRP, Work Scheduling, BOM, Routing) ורוב התנועות מנוהלים ברמת-Plant. זו הרמה החשובה ביותר ב-PP.",
          beginnerHe: "Plant הוא 'מקום פיזי' שבו דברים קורים — מייצרים, מאחסנים או מפיצים. כשמתכננים ב-MRP, כשמייצרים בפק\"ע, כשמנהלים מלאי — הכל קורה בתוך Plant מסוים.",
          consultantHe: "מוגדר ב-OX10 (קוד 4 תווים), נשמר ב-T001W; משויך ל-Company Code (OX18). ב-S/4HANA ה-Plant הוא גם Valuation Area (T001K). פרמטרי-PP רבים תלויי-Plant: MRP run, Available capacity, Factory Calendar, Address. שכפול-Plant (Copy) חוסך הגדרת עשרות טבלאות-תלויות.",
          purposeHe: "לספק את ההקשר התפעולי לכל תכנון, ייצור וניהול-מלאי — היכן מתוכננת הדרישה, היכן מיוצר המוצר, והיכן הוא מנוהל.",
          processExampleHe: "הרצת-MRP מתבצעת פר-Plant (MD01/MD41); היא קוראת את MARC של אותו Plant, את לוח-השנה-של-המפעל לתזמון, ויוצרת הזמנות-מתוכננות לאותו Plant בלבד.",
          cbcHe: "ב-CBC כל אתר-מילוי = Plant נפרד (אשקלון, באר-טוביה); לכל אחד MRP, קיבולת-קווים ולוח-שנה-מפעל משלו, אך כולם תחת אותו Company Code.",
          navHe: [
            "Enterprise Structure ► Definition ► Logistics – General ► Define, copy, delete, check plant (OX10)",
            "Enterprise Structure ► Assignment ► Logistics – General ► Assign plant to company code (OX18)",
          ],
          tables: ["T001W", "T001K", "MARC"],
          tcodes: ["OX10", "OX18", "OMS2", "MD01", "WB01"],
          fiori: ["F2740", "F1481"],
          configHe: [
            "ב-OX10 הגדר Plant (העתק מ-Template 0001/1010), כתובת ושפה.",
            "שייך ל-Company Code (OX18) ול-Valuation Area.",
            "שייך Factory Calendar ל-Plant (קריטי לכל תזמון-ייצור).",
          ],
          flow: [
            { he: "הגדר/העתק Plant", code: "OX10" },
            { he: "שיוך ל-Company Code", code: "OX18" },
            { he: "Valuation Area", code: "T001K" },
            { he: "שיוך Factory Calendar", code: "WB01→Plant" },
            { he: "מוכן ל-MRP/ייצור", code: "MD01" },
          ],
          masterDataHe: [
            "T001W = Plant · T001K = Valuation Area · MARC = נתוני-חומר ברמת-Plant.",
            "Factory Calendar של ה-Plant קובע ימי-עבודה לכל תזמון-MRP ופק\"ע.",
          ],
          mistakesHe: [
            "הגדרת Plant מאפס במקום העתקה — שוכחים טבלאות-תלויות (Plant parameters).",
            "אי-שיוך Factory Calendar — תזמון-ייצור משובש (כל הימים נחשבים עבודה או להפך).",
            "Plant ללא שיוך ל-Company Code — אי-אפשר לבצע תנועות-ערך.",
          ],
          troubleshootHe: [
            "MRP לא רץ ל-Plant ➔ Plant parameters חסרים או Factory Calendar לא-משויך.",
            "תאריכי-תזמון שגויים ➔ Factory Calendar שגוי/חסר ב-Plant.",
            "'Plant not assigned' ➔ חסר OX18.",
          ],
          bestPracticeHe: [
            "העתק Plant מ-Template ועדכן — אל תגדיר מאפס.",
            "שייך Factory Calendar נכון לכל Plant לפני תכנון.",
            "שמור על מינימום Plants — כל אחד מוסיף תחזוקה.",
          ],
          interviewHe: [
            { qHe: "מהו Plant ומדוע הוא מרכזי ב-PP?", aHe: "יחידת-הליבה התפעולית (אתר-ייצור/מחסן); רוב נתוני-האב והתנועות של PP מנוהלים ברמת-Plant, וה-MRP רץ פר-Plant." },
            { qHe: "מה הקשר בין Plant ל-Valuation Area ב-S/4HANA?", aHe: "ב-S/4HANA ה-Plant הוא ה-Valuation Area — רמת-ההערכה של המלאי." },
            { qHe: "מדוע חשוב לשייך Factory Calendar ל-Plant?", aHe: "כי כל תזמון-ה-MRP והפק\"ע מסתמך עליו לזיהוי ימי-עבודה; ללא שיוך נכון התאריכים משובשים." },
          ],
          takeawaysHe: [
            "Plant = יחידת-הליבה התפעולית של PP.",
            "ב-S/4HANA Plant = Valuation Area.",
            "העתק מ-Template ושייך Factory Calendar + Company Code.",
          ],
          relatedHe: [{ labelHe: "אובייקט · T001W", href: "/library/pp/object/T001W/" }],
        },
        {
          id: "2.1.4", titleHe: "מיקום אחסון (Storage Location)", titleEn: "Storage Location",
          execHe: "Storage Location הוא חלוקת-המשנה של ה-Plant לאזורי-אחסון פיזיים/לוגיים שבהם מנוהל המלאי הכמותי. הוא הרמה שבה SAP יודע 'כמה יש ואיפה' בתוך המפעל.",
          beginnerHe: "בתוך כל מפעל יש כמה 'מחסנים' או אזורי-אחסון. Storage Location מציין מאיזה אזור מושכים רכיב ולאן מכניסים מוצר. כל יתרת-מלאי כמותית מנוהלת ברמה זו.",
          consultantHe: "מוגדר ב-OX09 (קוד 4 תווים), נשמר ב-T001L; משויך ל-Plant. נתוני-החומר ברמת-Storage-Location יושבים ב-MARD. ה-Storage Location קובע גם ברירות-מחדל לתנועות (Goods Issue/Receipt) ויכול להניע Storage-Location MRP נפרד. הוא אינו רמת-הערכה (ההערכה היא ברמת-Plant).",
          purposeHe: "לנהל מלאי כמותי בגרנולריות פנים-מפעלית — להפריד חומרי-גלם, אריזה, מוצר-בתהליך ומוצר-מוגמר.",
          processExampleHe: "משיכת-רכיבים לפק\"ע (תנועה 261) מורידה מלאי מ-Storage Location של חומרי-הגלם; קליטת המוצר (101) מכניסה ל-Storage Location של המוצר-המוגמר — באותו Plant.",
          cbcHe: "ב-CBC בכל אתר: SLoc לחומרי-גלם (תרכיז/סוכר), SLoc לאריזה (בקבוקים/פקקים/תוויות), ו-SLoc למוצר-מוגמר מוכן-למשלוח.",
          navHe: ["Enterprise Structure ► Definition ► Materials Management ► Maintain Storage Location (OX09)"],
          tables: ["T001L", "MARD"],
          tcodes: ["OX09", "MMSC", "MB1A", "MB1C"],
          fiori: ["F1481", "F2740"],
          configHe: [
            "ב-OX09 הגדר Storage Location פר-Plant (קוד + תיאור).",
            "הרחב חומרים ל-Storage Location (MMSC) או דרך תצוגת-אחסון באב-החומר.",
            "אופציונלי: Storage-Location MRP (MRP indicator ברמת-SLoc) לתכנון נפרד.",
          ],
          masterDataHe: [
            "T001L = Storage Location · MARD = מלאי-חומר ברמת-Plant/SLoc.",
            "Storage Location אינו רמת-הערכה — הערך מנוהל ברמת-Plant (Valuation Area).",
          ],
          mistakesHe: [
            "ריבוי Storage Locations מיותרים — מקשה ספירות-מלאי ותנועות.",
            "אי-הרחבת חומר ל-SLoc (MMSC) — אי-אפשר לבצע תנועות שם.",
            "ציפייה ש-Storage Location ינהל ערך — הוא מנהל רק כמות.",
          ],
          troubleshootHe: [
            "'Storage location not extended' ➔ הרחב את החומר ל-SLoc (MMSC / תצוגת-אחסון).",
            "מלאי 'נעלם' ➔ נמצא ב-Storage Location אחר בתוך אותו Plant.",
            "Storage-Location MRP לא מתכנן ➔ ה-MRP indicator לא הוגדר ברמת-SLoc.",
          ],
          bestPracticeHe: [
            "שמור על מספר מצומצם של Storage Locations בעלי-משמעות ברורה.",
            "הרחב חומרים ל-SLoc באופן יזום (MMSC) כחלק מפתיחת-החומר.",
            "השתמש ב-Storage-Location MRP רק היכן שיש תכנון-חידוש מקומי אמיתי.",
          ],
          interviewHe: [
            { qHe: "מהו Storage Location?", aHe: "חלוקת-משנה של Plant לאזורי-אחסון; רמת-ניהול-המלאי הכמותי. נשמר ב-T001L, מלאי ב-MARD." },
            { qHe: "האם Storage Location מנהל ערך?", aHe: "לא — הוא מנהל כמות בלבד; ההערכה היא ברמת-Plant (Valuation Area)." },
            { qHe: "מהו Storage-Location MRP?", aHe: "אפשרות לתכנן חידוש-מלאי ברמת-Storage-Location (נפרד מ-Plant MRP), נשלט דרך MRP indicator ברמת-SLoc." },
          ],
          takeawaysHe: [
            "Storage Location = תת-חלוקת Plant לניהול-מלאי כמותי.",
            "מנהל כמות, לא ערך (הערכה ברמת-Plant).",
            "חובה להרחיב חומר ל-SLoc (MMSC) לפני תנועות.",
          ],
          relatedHe: [{ labelHe: "אובייקט · MARD", href: "/library/pp/object/MARD/" }],
        },
        {
          id: "2.1.5", titleHe: "בקרי תכנון דרישות חומר (MRP Controllers)", titleEn: "Material Requirements Planning Controllers",
          execHe: "MRP Controller הוא בעל-התפקיד (או הקבוצה) האחראי לתכנון קבוצת-חומרים בתוך Plant. הוא ישות-ארגונית פר-Plant המשמשת לסינון, ניתוב-תוצאות-תכנון ואחריות. כל חומר שמתוכנן חייב MRP Controller.",
          beginnerHe: "MRP Controller הוא 'מי אחראי לתכנן' חומר מסוים. זה לא בהכרח אדם אחד — לרוב קוד שמייצג תחום-אחריות (למשל 'משקאות מוגמרים'). הוא מאפשר לכל מתכנן לראות רק את החומרים שלו.",
          consultantHe: "מוגדר ב-OPPQ / IMG פר-Plant, נשמר ב-T024D; מאוכלס באב-החומר בשדה MARC-DISPO. משמש לסינון ב-MD04/MD06, לניתוב התראות-תכנון (Exception messages), ולקביעת נמען-אימייל ל-MRP Live. אין לבלבל עם Production Supervisor (MARC-FEVOR).",
          purposeHe: "לחלק את אחריות-התכנון, לסנן את תוצאות-ה-MRP לפי תחום, ולכוון התראות לאדם/קבוצה הנכונים.",
          processExampleHe: "MRP Live רץ ל-Plant; כל התראת-תכנון (למשל 'הקדם הזמנה') מנותבת ל-MRP Controller של החומר; המתכנן מסנן את MD06 לפי הקוד שלו ומטפל רק בחומרים באחריותו.",
          cbcHe: "ב-CBC: MRP Controller 'BEV' למשקאות-מוגמרים, 'PKG' לאריזה, 'RAW' לחומרי-גלם — כל מתכנן רואה ומטפל רק בתחומו.",
          navHe: ["Production ► Material Requirements Planning ► Master Data ► Define MRP Controllers (OPPQ)"],
          tables: ["T024D", "MARC"],
          tcodes: ["OPPQ", "MM02", "MD06"],
          fiori: ["F2101", "F0247"],
          configHe: [
            "הגדר MRP Controller פר-Plant (קוד + תיאור + נמען-אימייל אופציונלי).",
            "אכלס באב-החומר: MARC-DISPO (MRP 1 view).",
            "השתמש בקוד לסינון ב-MD04/MD06 ולניתוב Exception messages.",
          ],
          masterDataHe: [
            "T024D = MRP Controller · MARC-DISPO = שיוך החומר לבקר.",
            "שונה מ-Production Supervisor (MARC-FEVOR) ומ-Capacity Planner — אל תבלבל.",
          ],
          mistakesHe: [
            "השארת DISPO ריק — החומר 'יתום' מבחינת אחריות-תכנון.",
            "בלבול בין MRP Controller ל-Production Supervisor (FEVOR).",
            "ריבוי בקרים מעבר לתחומי-אחריות אמיתיים.",
          ],
          troubleshootHe: [
            "התראות-תכנון לא מגיעות לאיש ➔ DISPO ריק או נמען-אימייל לא-מוגדר.",
            "מתכנן רואה חומרים לא-שלו ב-MD06 ➔ סינון לפי DISPO לא בוצע / שיוך שגוי.",
          ],
          bestPracticeHe: [
            "הגדר בקרים לפי תחומי-אחריות עסקיים, לא לפי אנשים בודדים.",
            "אכלס DISPO לכל חומר מתוכנן כחלק מפתיחת-החומר.",
            "שייך נמען-אימייל לכל בקר לניתוב התראות.",
          ],
          interviewHe: [
            { qHe: "מהו MRP Controller?", aHe: "ישות-ארגונית פר-Plant האחראית לתכנון קבוצת-חומרים; שדה MARC-DISPO, נשמר ב-T024D; משמש לסינון ולניתוב התראות." },
            { qHe: "מה ההבדל בין MRP Controller ל-Production Supervisor?", aHe: "MRP Controller (DISPO) אחראי לתכנון; Production Supervisor / Scheduler (FEVOR) אחראי לביצוע ולתזמון-ייצור." },
          ],
          takeawaysHe: [
            "MRP Controller = אחריות-תכנון פר-Plant (DISPO).",
            "מסנן תוצאות-MRP ומנתב התראות.",
            "שונה מ-Production Supervisor (FEVOR).",
          ],
        },
        {
          id: "2.1.6", titleHe: "מתכנני קיבולת (Capacity Planners)", titleEn: "Capacity Planners",
          execHe: "Capacity Planner הוא בעל-התפקיד האחראי לתכנון-הקיבולת של מרכזי-עבודה — איזון-עומס, ניטרול צווארי-בקבוק ופישור עומס-יתר. הוא ישות-ארגונית המשויכת למרכזי-עבודה ומשמשת לסינון ולאחריות בתכנון-הקיבולת.",
          beginnerHe: "כשמרכז-עבודה עמוס מעל יכולתו, מישהו צריך 'לפזר' את העומס. Capacity Planner הוא האחראי לכך — קוד שמייצג מי דואג לקיבולת של קבוצת-מרכזים מסוימת.",
          consultantHe: "מוגדר ב-IMG (Capacity Planning) ומשויך למרכז-העבודה (CRHD / Capacity view). משמש לסינון בכלי-תכנון-הקיבולת (CM01/CM21/Fiori Capacity Scheduling) ולקביעת אחריות. בתעשיות-תהליך משויך גם ל-Resource. אינו אותו אובייקט כ-MRP Controller.",
          purposeHe: "להקצות אחריות לאיזון-עומס ולסנן את תצוגות-הקיבולת לפי תחום, כדי שכל מתכנן-קיבולת יראה את המרכזים שלו.",
          processExampleHe: "דוח-עומס (CM01) מראה צוואר-בקבוק בקו-מילוי; ה-Capacity Planner של אותו קו מקבל את ההתראה, מעביר עבודה לקו-חלופי או למשמרת נוספת (CM21).",
          cbcHe: "ב-CBC Capacity Planner לכל אזור-קווים; הוא מאזן עומס בין קווי-המילוי, מזיז פק\"ע למשמרת-לילה כשקו עמוס, ומונע 'תור' מול קו אחד.",
          navHe: ["Production ► Capacity Requirements Planning ► Master Data ► Define Capacity Planner Group"],
          tables: ["CRHD", "KAKO", "TC37A"],
          tcodes: ["CR02", "CM01", "CM21", "CM25"],
          fiori: ["F0291", "F2336"],
          configHe: [
            "הגדר Capacity Planner Group ב-IMG (Capacity Planning).",
            "שייך למרכז-העבודה (CRHD / Capacity header).",
            "השתמש לסינון בכלי-תכנון-קיבולת (CM01/CM21).",
          ],
          masterDataHe: [
            "CRHD = מרכז-עבודה · KAKO = קיבולת · שיוך Capacity Planner Group במרכז.",
            "אינו MRP Controller — האחריות היא קיבולת, לא דרישות-חומר.",
          ],
          mistakesHe: [
            "אי-שיוך Capacity Planner — אין אחריות-קיבולת ברורה.",
            "בלבול בין Capacity Planner ל-MRP Controller.",
            "התעלמות מתכנון-קיבולת לחלוטין — עומס-יתר 'מתפוצץ' רק ברצפה.",
          ],
          troubleshootHe: [
            "עומס-יתר לא מטופל ➔ אין Capacity Planner משויך או שלא משתמשים בכלי-הקיבולת.",
            "מתכנן רואה מרכזים לא-שלו ➔ סינון לפי Planner Group שגוי.",
          ],
          bestPracticeHe: [
            "שייך Capacity Planner Group לכל מרכז-עבודה רלוונטי.",
            "שלב סקירת-עומס (CM01) בשגרת-התכנון השבועית.",
            "הפרד אחריות-קיבולת מאחריות-תכנון-דרישות.",
          ],
          interviewHe: [
            { qHe: "מהו Capacity Planner?", aHe: "האחראי לתכנון-קיבולת של מרכזי-עבודה (איזון-עומס); ישות-ארגונית המשויכת למרכז ומשמשת לסינון בכלי-הקיבולת." },
            { qHe: "במה שונה Capacity Planner מ-MRP Controller?", aHe: "Capacity Planner מאזן עומס על מרכזי-עבודה; MRP Controller מתכנן דרישות-חומר. תחומי-אחריות שונים." },
          ],
          takeawaysHe: [
            "Capacity Planner = אחריות לאיזון-עומס מרכזים.",
            "משויך למרכז-העבודה, מסנן כלי-קיבולת.",
            "שונה מ-MRP Controller.",
          ],
          relatedHe: [{ labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" }],
        },
        {
          id: "2.1.7", titleHe: "מתזמני ייצור (Production Schedulers)", titleEn: "Production Schedulers",
          execHe: "Production Scheduler (Production Supervisor) הוא בעל-התפקיד האחראי לביצוע-הייצור ולתזמון-מפורט ברצפה. הוא משויך לחומר דרך MARC-FEVOR ומקושר ל-Production Scheduling Profile הקובע אוטומציות-פק\"ע (שחרור/GR/סגירה אוטומטיים).",
          beginnerHe: "אחרי שתוכננה דרישה, מישהו צריך 'להזיז' את הפק\"ע ברצפה — לשחרר, לתזמן, לפקח. Production Scheduler הוא האחראי לכך, וקוד שלו על החומר קובע גם אילו פעולות יקרו אוטומטית.",
          consultantHe: "מוגדר ב-OPJ9 / IMG (Production Scheduler), נשמר ב-T024F; מאוכלס ב-MARC-FEVOR. מקושר ל-Production Scheduling Profile (OPKP) שקובע אוטומציות בהמרת-פק\"ע. זהו ה'נשכח' הקלאסי: ללא FEVOR מתאים אין שחרור/GR אוטומטי. שונה מ-MRP Controller (DISPO) ומ-Capacity Planner.",
          purposeHe: "להקצות אחריות-ביצוע לייצור, ולחבר את החומר לאוטומציות-הפק\"ע דרך פרופיל-התזמון.",
          processExampleHe: "המרת הזמנה-מתוכננת לפק\"ע: ה-Production Scheduling Profile המקושר ל-FEVOR של החומר קובע אם הפק\"ע משוחררת אוטומטית, ואם GR-אוטומטי מופעל בדיווח-הסיום.",
          cbcHe: "ב-CBC Production Scheduler לכל אתר-מילוי, עם Scheduling Profile שמשחרר פק\"ע אוטומטית בהמרה ומבצע GR-אוטומטי לקליטת-מוצר בקצה-הקו.",
          navHe: [
            "Production ► Shop Floor Control ► Master Data ► Define Production Scheduler (OPJ9)",
            "Production ► Shop Floor Control ► Master Data ► Define Production Scheduling Profile (OPKP)",
          ],
          tables: ["T024F", "MARC", "T399X"],
          tcodes: ["OPJ9", "OPKP", "MM02"],
          fiori: ["F2101", "F2336"],
          configHe: [
            "הגדר Production Scheduler פר-Plant (OPJ9), נשמר ב-T024F.",
            "אכלס באב-החומר: MARC-FEVOR (Work Scheduling view).",
            "שייך Production Scheduling Profile (OPKP) — קובע שחרור/GR/סגירה אוטומטיים.",
          ],
          flow: [
            { he: "הגדר Scheduler", code: "OPJ9", note: "T024F" },
            { he: "Scheduling Profile", code: "OPKP", note: "אוטומציות" },
            { he: "אכלוס באב-החומר", code: "MARC-FEVOR" },
            { he: "המרת פק\"ע", code: "CO40/CO41", note: "שחרור/GR אוטומטי" },
          ],
          masterDataHe: [
            "T024F = Production Scheduler · MARC-FEVOR = שיוך החומר · MARC-SFCPF = Production Scheduling Profile.",
            "FEVOR (ביצוע) ≠ DISPO (תכנון) ≠ Capacity Planner (קיבולת) — שלושה תפקידים נפרדים.",
          ],
          mistakesHe: [
            "השארת FEVOR ריק — אין אחריות-ביצוע ואין אוטומציות-פק\"ע.",
            "בלבול בין FEVOR (ביצוע) ל-DISPO (תכנון).",
            "שכחת שיוך Production Scheduling Profile — הפק\"ע נתקעת ב-CRTD ללא שחרור/GR אוטומטי.",
          ],
          troubleshootHe: [
            "פק\"ע לא משוחררת אוטומטית ➔ Scheduling Profile חסר/לא-מקושר ל-FEVOR.",
            "אין GR-אוטומטי בסיום ➔ הפרופיל לא הופעל או FEVOR שגוי.",
            "אין אחריות-ביצוע לחומר ➔ MARC-FEVOR ריק.",
          ],
          bestPracticeHe: [
            "אכלס FEVOR ושייך Scheduling Profile כחלק מפתיחת-חומר-מיוצר.",
            "הפרד בבירור FEVOR / DISPO / Capacity Planner בתיעוד-התהליך.",
            "תקנן מעט Scheduling Profiles עם אוטומציות עקביות.",
          ],
          interviewHe: [
            { qHe: "מהו Production Scheduler ובמה הוא שונה מ-MRP Controller?", aHe: "Production Scheduler (FEVOR) אחראי לביצוע ולתזמון-מפורט של הפק\"ע ברצפה; MRP Controller (DISPO) אחראי לתכנון-הדרישות. שני שדות ותפקידים נפרדים." },
            { qHe: "כיצד Production Scheduler קשור לאוטומציות-פק\"ע?", aHe: "דרך Production Scheduling Profile (OPKP) המקושר אליו — הוא קובע שחרור-אוטומטי, GR-אוטומטי וסגירה." },
          ],
          takeawaysHe: [
            "Production Scheduler (FEVOR) = אחריות-ביצוע הייצור.",
            "מקושר ל-Scheduling Profile הקובע אוטומציות-פק\"ע.",
            "שונה מ-DISPO (תכנון) ומ-Capacity Planner (קיבולת).",
          ],
          relatedHe: [
            { labelHe: "PP · אב חומר לייצור (3.1)", href: "/library/pp/chapter-03/#sub-3.1" },
            { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
          ],
        },
      ],
    },
    // ============================================================ 2.2
    {
      id: "2.2", titleHe: "יחידה ארגונית לתכנון ובקרת ייצור ולוחות-שנה", titleEn: "Production Planning and Control Organizational Unit & Calendars",
      execHe:
        "מעבר ליחידות-המבנה (Plant/SLoc), עולם-ה-PP נשען על תשתית-זמן: לוחות-שנה הקובעים מהם ימי-עבודה. שרשרת ההגדרה היא Public Holidays → Holiday Calendar → Factory Calendar, וה-Factory Calendar משויך ל-Plant. כל תזמון-MRP, כל תאריך-פק\"ע וכל חישוב-lead-time מסתמכים עליו. זו תשתית 'שקופה' אך קריטית.",
      beginnerHe:
        "SAP צריך לדעת מתי 'יום-עבודה'. לשם כך בונים שרשרת: קודם מגדירים חגים (Public Holidays), אוספים אותם ל-Holiday Calendar, ומגדירים Factory Calendar שאומר אילו ימים בשבוע עובדים ואילו חגים סגורים. ה-Factory Calendar מחובר למפעל — וכל תאריך-ייצור מחושב לפיו.",
      consultantHe:
        "מוגדר ב-SCAL (Calendar Maintenance): Public Holidays (סוג קבוע/נע/דתי), Holiday Calendar (אוסף-חגים עם תוקף), Factory Calendar (ימי-עבודה + Holiday Calendar + Start/End). ה-Factory Calendar משויך ל-Plant ולמרכזי-עבודה (Available capacity). שגיאה כאן מזיזה את כל תאריכי-ה-MRP. ב-CBC עם משמרות-מילוי וחגי-ישראל זו הגדרה רגישה במיוחד.",
      purposeHe:
        "לספק ל-PP הגדרת-זמן עקבית: אילו ימים זמינים לייצור ולתזמון. זהו הבסיס לכל חישובי-התאריכים במערכת.",
      processExampleHe:
        "MRP מחשב תאריך-התחלה לפק\"ע: הוא לוקח את תאריך-הסיום הנדרש, מפחית lead-time, ו'מדלג אחורה' רק על ימי-עבודה לפי ה-Factory Calendar של ה-Plant — חגים ושבתות אינם נספרים.",
      cbcHe:
        "ב-CBC ה-Factory Calendar כולל חגי-ישראל וימי-שישי/שבת לפי משטר-המשמרות; בשיא-הקיץ מפעילים משמרות נוספות והקיבולת-הזמינה במרכזי-העבודה מעודכנת בהתאם — אך ימי-העבודה הבסיסיים נקבעים כאן.",
      navHe: [
        "SAP NetWeaver ► General Settings ► Maintain Calendar (SCAL)",
        "Enterprise Structure ► Definition ► Logistics – General ► Define plant ► Factory calendar (OX10)",
      ],
      tables: ["TFACS", "TFACD", "THOL", "THOC", "T001W"],
      tcodes: ["SCAL", "OX10"],
      fiori: ["F1481"],
      configHe: [
        "סדר-ההגדרה ב-SCAL: Public Holidays ← Holiday Calendar ← Factory Calendar.",
        "Factory Calendar: בחר ימי-עבודה בשבוע, שייך Holiday Calendar, קבע Valid From/To.",
        "שייך Factory Calendar ל-Plant (וגם למרכזי-עבודה דרך ה-Available capacity).",
      ],
      flow: [
        { he: "Public Holidays", code: "SCAL", note: "הגדרת חגים" },
        { he: "Holiday Calendar", code: "SCAL", note: "אוסף חגים" },
        { he: "Factory Calendar", code: "SCAL", note: "ימי-עבודה" },
        { he: "שיוך ל-Plant", code: "OX10" },
        { he: "תזמון MRP/פק\"ע", code: "MD01" },
      ],
      masterDataHe: [
        "TFACS/TFACD = Factory Calendar · THOL/THOC = Holiday/Holiday Calendar.",
        "ה-Factory Calendar משויך ל-Plant (T001W) ולמרכזי-העבודה (Available capacity).",
      ],
      mistakesHe: [
        "שינוי-לוח-שנה ב-Customizing בלי Transport / בלי buffer-reset — לא 'נתפס' בכל השרתים.",
        "Factory Calendar שלא כולל את שנת-התכנון הנוכחית — תזמון נכשל בתאריכים עתידיים.",
        "אי-שיוך Factory Calendar ל-Plant — ברירת-מחדל שגויה משבשת תאריכים.",
      ],
      troubleshootHe: [
        "תאריכי-MRP/פק\"ע 'קופצים' או שגויים ➔ Factory Calendar שגוי/חסר ב-Plant.",
        "'Date is not a workday' ➔ החג/יום-העבודה לא מוגדר נכון בלוח.",
        "תכנון לא חוצה לשנה הבאה ➔ ה-Factory Calendar לא מוגדר לטווח-השנים הנדרש.",
      ],
      bestPracticeHe: [
        "הגדר את שרשרת-הלוחות בסדר Public→Holiday→Factory לפני כל תכנון.",
        "הרחב את ה-Factory Calendar לכמה שנים קדימה (Valid To נדיב).",
        "תאם את הלוח עם חגי-המדינה ומשטר-המשמרות בפועל.",
        "לאחר שינוי-לוח, ודא הפצה לכל השרתים (buffer reset / restart לפי מדיניות-Basis).",
      ],
      interviewHe: [
        { qHe: "מהי שרשרת-הגדרת-הלוחות ב-SAP?", aHe: "Public Holidays → Holiday Calendar → Factory Calendar; ה-Factory Calendar משויך ל-Plant ומגדיר ימי-עבודה לכל תזמון." },
        { qHe: "מדוע ה-Factory Calendar קריטי ל-PP?", aHe: "כל תזמון-MRP, תאריכי-פק\"ע וחישובי-lead-time 'מדלגים' רק על ימי-עבודה לפיו; שגיאה בו מזיזה את כל התאריכים." },
      ],
      takeawaysHe: [
        "לוחות-השנה הם תשתית-הזמן של כל תזמון-PP.",
        "השרשרת: Public Holidays → Holiday Calendar → Factory Calendar.",
        "ה-Factory Calendar משויך ל-Plant וקובע ימי-עבודה.",
      ],
      relatedHe: [
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" },
      ],
      children: [
        {
          id: "2.2.1", titleHe: "חגים (Public Holidays)", titleEn: "Public Holidays",
          execHe: "Public Holiday הוא הגדרת יום-לא-עבודה בודד. SAP תומך בסוגים: תאריך-קבוע (1 בינואר), נע (לפי Easter), או לפי כלל-דתי. זהו אבן-הבניין הראשונה בשרשרת-הלוחות.",
          beginnerHe: "כל חג מוגדר בנפרד — מתי הוא חל ואיך הוא מחושב (תאריך קבוע, או 'יום מסוים אחרי תאריך-בסיס'). אחר-כך אוספים חגים אלה ללוח-חגים.",
          consultantHe: "ב-SCAL מגדירים Public Holiday עם Holiday Type (Fixed date / Relative to Easter / Floating / With function module). חגים מותאמים-אישית (למשל חגי-ישראל) מוגדרים כאן לפני שילובם ב-Holiday Calendar. נשמר ב-THOL.",
          purposeHe: "להגדיר את הימים שאינם ימי-עבודה ברמת-החג הבודד, כבסיס ל-Holiday Calendar.",
          processExampleHe: "הגדרת 'ראש-השנה' כחג; הוא יצורף ל-Holiday Calendar הישראלי, וכל Factory Calendar המשתמש בו יראה את היום כיום-לא-עבודה.",
          cbcHe: "ב-CBC מוגדרים כל חגי-ישראל (ראש-השנה, יום-כיפור, סוכות, פסח, שבועות וכו') כ-Public Holidays לפני בניית הלוח.",
          navHe: ["SAP NetWeaver ► General Settings ► Maintain Calendar ► Public Holidays (SCAL)"],
          tables: ["THOL"],
          tcodes: ["SCAL"],
          fiori: [],
          configHe: ["ב-SCAL הגדר Public Holiday עם Holiday Type (Fixed/Relative/Floating); קבע תאריך/כלל ותיאור."],
          mistakesHe: ["הגדרת חג כתאריך-קבוע כשהוא נע — מופיע ביום שגוי בשנים הבאות.", "שכחת חגים מקומיים — ימי-סגירה נחשבים בטעות ימי-עבודה."],
          troubleshootHe: ["חג מופיע בתאריך שגוי ➔ Holiday Type שגוי (Fixed במקום Relative)."],
          bestPracticeHe: ["השתמש ב-Holiday Type המתאים לאופי-החג.", "הגדר את כל חגי-המדינה לפני בניית ה-Holiday Calendar."],
          interviewHe: [{ qHe: "אילו סוגי Public Holiday קיימים?", aHe: "תאריך-קבוע, נע (יחסית ל-Easter), צף, או מבוסס-Function-Module — לפי אופי-החג." }],
          takeawaysHe: ["Public Holiday = הגדרת יום-לא-עבודה בודד.", "Holiday Type קובע איך מחושב התאריך.", "אבן-הבניין הראשונה בשרשרת."],
        },
        {
          id: "2.2.2", titleHe: "לוח חגים (Holiday Calendar)", titleEn: "Holiday Calendar",
          execHe: "Holiday Calendar הוא אוסף-החגים הרלוונטיים לאזור/מדינה, עם טווח-תוקף. הוא משמש כקלט ל-Factory Calendar וקובע אילו ימים נחשבים חגים.",
          beginnerHe: "אחרי שהגדרנו חגים בודדים, אוספים אותם ל'לוח-חגים' — למשל 'חגי-ישראל'. הלוח הזה הוא מה שה-Factory Calendar יסתמך עליו.",
          consultantHe: "ב-SCAL יוצרים Holiday Calendar (קוד דו-תווי), מצרפים אליו Public Holidays, וקובעים Valid From/To. נשמר ב-THOC. כל Factory Calendar מצביע על Holiday Calendar אחד; כך אותו אוסף-חגים משרת מספר לוחות-מפעל.",
          purposeHe: "לקבץ חגים לפי גיאוגרפיה/מדינה ולספק קלט אחיד ל-Factory Calendars.",
          processExampleHe: "Holiday Calendar 'IL' אוסף את כל חגי-ישראל; שני Factory Calendars (משמרת-יום ומשמרת-מלאה) משתמשים באותו 'IL' לחגים, ונבדלים רק בימי-העבודה.",
          cbcHe: "ב-CBC Holiday Calendar 'IL' משותף לכל אתרי-המילוי; כל אתר מצביע עליו דרך ה-Factory Calendar שלו.",
          navHe: ["SAP NetWeaver ► General Settings ► Maintain Calendar ► Holiday Calendar (SCAL)"],
          tables: ["THOC", "THOL"],
          tcodes: ["SCAL"],
          fiori: [],
          configHe: ["ב-SCAL צור Holiday Calendar, צרף Public Holidays רלוונטיים, וקבע Valid From/To נדיב."],
          mistakesHe: ["Holiday Calendar עם תוקף קצר — חגים 'נעלמים' בשנים עתידיות.", "שכחת לצרף חג לאוסף — יום-סגירה נחשב עבודה."],
          troubleshootHe: ["חג לא מתפרש כיום-סגירה ➔ לא צורף ל-Holiday Calendar או מחוץ-לתוקף."],
          bestPracticeHe: ["קבע תוקף נדיב (שנים קדימה).", "השתמש ב-Holiday Calendar אחד לכל מדינה/אזור משותף."],
          interviewHe: [{ qHe: "מה תפקיד ה-Holiday Calendar?", aHe: "לקבץ Public Holidays לאוסף לפי מדינה/אזור עם תוקף, ולשמש קלט-חגים ל-Factory Calendar." }],
          takeawaysHe: ["Holiday Calendar = אוסף-חגים עם תוקף.", "קלט ל-Factory Calendar.", "ניתן לשיתוף בין לוחות-מפעל."],
        },
        {
          id: "2.2.3", titleHe: "לוח מפעל (Factory Calendar)", titleEn: "Factory Calendar",
          execHe: "Factory Calendar הוא הלוח התפעולי של ה-PP: הוא מגדיר אילו ימים בשבוע הם ימי-עבודה, מצביע על Holiday Calendar לחגים, ומשויך ל-Plant ולמרכזי-העבודה. כל תזמון-ייצור מסתמך עליו.",
          beginnerHe: "ה-Factory Calendar הוא הלוח ש'אומר' למערכת מתי המפעל עובד. הוא משלב את ימי-העבודה בשבוע עם לוח-החגים, ומחובר ל-Plant — כך שכל תאריך-ייצור מחושב לפיו.",
          consultantHe: "ב-SCAL יוצרים Factory Calendar (קוד דו-תווי): בוחרים ימי-עבודה בשבוע, משייכים Holiday Calendar, וקובעים Valid From/To. נשמר ב-TFACS/TFACD. משויך ל-Plant (OX10) ולמרכזי-העבודה (Available capacity — KAKO). ה-Factory Calendar הוא הקלט ל'דילוג-ימי-עבודה' בכל חישובי-התזמון.",
          purposeHe: "לתרגם ימי-עבודה וחגים לטווח-תאריכים תפעולי שעליו נשען כל תזמון-MRP, פק\"ע וקיבולת.",
          processExampleHe: "תזמון-אחורה של פק\"ע: מתאריך-הסיום הנדרש, SAP מדלג אחורה רק על ימים שב-Factory Calendar מסומנים כעבודה — מגיע לתאריך-התחלה ריאלי.",
          cbcHe: "ב-CBC כל אתר עם Factory Calendar משלו: ימי-עבודה לפי משטר-המשמרות + Holiday Calendar 'IL'; בקיץ מוסיפים ימי/משמרות-עבודה והקיבולת-הזמינה מעודכנת.",
          navHe: [
            "SAP NetWeaver ► General Settings ► Maintain Calendar ► Factory Calendar (SCAL)",
            "Enterprise Structure ► Definition ► Logistics – General ► Define plant ► Factory calendar (OX10)",
          ],
          tables: ["TFACS", "TFACD", "T001W", "KAKO"],
          tcodes: ["SCAL", "OX10", "CR02"],
          fiori: ["F1481"],
          configHe: [
            "ב-SCAL צור Factory Calendar: בחר ימי-עבודה, שייך Holiday Calendar, קבע Valid From/To.",
            "שייך ל-Plant (OX10) וודא שגם מרכזי-העבודה מצביעים עליו (Available capacity).",
          ],
          flow: [
            { he: "ימי-עבודה בשבוע", code: "SCAL" },
            { he: "שיוך Holiday Calendar", code: "SCAL" },
            { he: "תוקף Valid From/To", code: "SCAL" },
            { he: "שיוך ל-Plant", code: "OX10" },
            { he: "שיוך למרכזי-עבודה", code: "CR02→KAKO" },
          ],
          masterDataHe: [
            "TFACS/TFACD = Factory Calendar · משויך ל-T001W (Plant) ול-KAKO (קיבולת-זמינה).",
            "ה-Available capacity של מרכז-עבודה מסתמך על ה-Factory Calendar לתזמון.",
          ],
          mistakesHe: [
            "Factory Calendar שלא מוגדר לשנה העתידית — תזמון נכשל בתאריכים מעבר לתוקף.",
            "ימי-עבודה שגויים (למשל שכחת שישי-עבודה חלקי) — עומס וקיבולת מעוותים.",
            "אי-שיוך למרכזי-העבודה — תזמון-קיבולת שגוי גם אם ה-Plant נכון.",
          ],
          troubleshootHe: [
            "תזמון לא חוצה לשנה הבאה ➔ Factory Calendar לא מוגדר לטווח-השנים.",
            "תאריכי-קיבולת שגויים במרכז ➔ ה-Factory Calendar של המרכז שונה/שגוי.",
            "'Not a workday' ➔ היום מסומן חג/לא-עבודה בלוח.",
          ],
          bestPracticeHe: [
            "הרחב תוקף לכמה שנים קדימה.",
            "ודא עקביות בין ה-Factory Calendar של ה-Plant ושל מרכזי-העבודה.",
            "עדכן את הלוח מראש לקראת שינויי-משמרות עונתיים.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר Factory Calendar?", aHe: "ימי-עבודה בשבוע + Holiday Calendar + תוקף; משויך ל-Plant ולמרכזי-עבודה, ומשמש לכל חישובי-התזמון." },
            { qHe: "היכן משויך ה-Factory Calendar?", aHe: "ל-Plant (OX10) ולמרכזי-העבודה (Available capacity / KAKO); שני השיוכים צריכים להיות עקביים." },
          ],
          takeawaysHe: [
            "Factory Calendar = הלוח התפעולי של ה-PP.",
            "ימי-עבודה + Holiday Calendar + תוקף.",
            "משויך ל-Plant ולמרכזי-העבודה — בסיס לכל תזמון.",
          ],
          relatedHe: [{ labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" }],
        },
      ],
    },
  ],
};
