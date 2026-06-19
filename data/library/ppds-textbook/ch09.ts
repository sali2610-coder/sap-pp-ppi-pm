import type { TextbookChapter } from "./types";

// ===== PP/DS Digital Textbook — Chapter 9 (Academy Template, validated) =====
// SAP Digital Supply Chain Management — the sidecar PP/DS deployment of
// SAP S/4HANA Manufacturing for Planning and Scheduling (DMP), connected
// to an ERP system via CIF integration. Every node is a full 18-facet
// LearningNode, authored Hebrew, beginner + consultant friendly. SAP
// objects kept verbatim English. Hierarchy + ids preserved exactly.

export const CH9: TextbookChapter = {
  n: 9,
  titleHe: "SAP Digital Supply Chain Management",
  titleEn: "SAP Digital Supply Chain Management",
  introHe:
    "פרק זה מסביר כיצד PP/DS פועל כפתרון sidecar — כלומר מותקן במערכת נפרדת (SAP S/4HANA Manufacturing for Planning and Scheduling, מקוצר DMP) ומחובר אל מערכת-ה-ERP התפעולית דרך CIF integration. זאת בניגוד לפריסה המשולבת (embedded) שבה PP/DS חי בתוך אותה מערכת S/4HANA של הביצוע. כל תת-פרק וכל תת-סעיף הורחבו ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. CBC = מפעל מילוי-משקאות של Coca-Cola שבו PP/DS מותקן כ-sidecar (DMP) ומחובר ל-ERP. המטרה: ללמוד את הארכיטקטורה, התנאים-המוקדמים, ההגדרה והאינטגרציה — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 9.1
    {
      id: "9.1", titleHe: "ארכיטקטורת הפתרון", titleEn: "Solution Architecture",
      execHe:
        "ארכיטקטורת ה-sidecar מפרידה בין מערכת-התכנון (SAP S/4HANA Manufacturing for Planning and Scheduling — DMP) ובין מערכת-הביצוע (ה-ERP). התכנון המתקדם רץ במנוע ה-liveCache של DMP, בעוד ההזמנות, אישורי-הייצור והמלאי מנוהלים ב-ERP. שני העולמות מסונכרנים בזמן-אמת דרך CIF integration. זו בחירה אסטרטגית: היא מאפשרת לתכנן מספר מערכות-ERP במופע-תכנון אחד, ולהפעיל PP/DS גם מול ECC ישן שאינו מסוגל ל-embedded.",
      beginnerHe:
        "דמיין שני מחשבים. מחשב אחד (DMP) הוא 'חדר-התכנון' — שם מחשבים מתי ובאיזה סדר לייצר. מחשב שני (ERP) הוא 'רצפת-הייצור' — שם מוציאים חומרים, מדווחים על מה שיוצר ומנהלים מלאי. כדי ששניהם ידברו, יש 'צינור' שנקרא CIF integration שמעביר נתונים הלוך-ושוב. ב-sidecar שני המחשבים נפרדים; ב-embedded הם אותו מחשב.",
      consultantHe:
        "ב-sidecar, DMP הוא מופע S/4HANA ייעודי המריץ את רכיב PP/DS (יורש SCM/APO) מעל liveCache + Optimizer. ה-ERP יכול להיות SAP ECC או S/4HANA נפרד. CIF (Core Interface) הוא תשתית ה-RFC המעבירה Integration Models משני הכיוונים: master data ו-transaction data. נקודות-מפתח: מערכת-לוגית (Logical System) לכל מערכת ב-BD54, חיבורי RFC דו-כיווניים (SM59), הגדרת qRFC queues (SMQ1/SMQ2), ושמירה על Business System Group (BSG) אחד לכל landscape. ב-embedded אין CIF בין מערכות — הנתונים משותפים בטבלאות; ה-sidecar דורש סנכרון מתמשך וניטור-תורים.",
      purposeHe:
        "המטרה: לאפשר תכנון-ייצור מתקדם (Detailed Scheduling, Optimizer, Pegging) גם כאשר הביצוע יושב במערכת אחרת או ישנה, ולרכז תכנון של כמה מפעלים/מערכות במקום אחד. כך מקבלים יכולות PP/DS מלאות בלי לשדרג מיד את כל נחיתת-הביצוע ל-embedded.",
      processExampleHe:
        "ביקוש למוצר נקלט ב-ERP כהזמנת-לקוח. דרך CIF הוא מועבר ל-DMP כדרישה. PP/DS מתזמן ויוצר Planned Order עם תאריכים מדויקים ב-liveCache. ה-Planned Order מועבר חזרה ל-ERP דרך CIF, מומר שם ל-Production Order, מבוצע ברצפה, והאישור (confirmation) זורם בחזרה ל-DMP לעדכון התמונה.",
      cbcHe:
        "ב-CBC: ה-ERP (ECC) מנהל את מילוי-המשקאות, המלאי ואישורי-הקווים. DMP מותקן כ-sidecar ומתזמן את קווי-המילוי עם ה-Optimizer (רצף, זמני-החלפה, מינימום שטיפות). תכנית-המילוי מחושבת ב-DMP ומוחזרת ל-ECC לביצוע — הקו עצמו ממשיך לרוץ מול ECC כרגיל.",
      navHe: [
        "Advanced Planning ► Basic Settings ► Integration ► Integration via Core Interface (CIF)",
        "SAP NetWeaver ► Application Server ► IDoc Interface/ALE ► Basic Settings ► Logical Systems ► Define Logical System (BD54)",
        "Advanced Planning ► Global Settings ► Maintain Business System Group",
      ],
      tables: ["CIF_IMODEL", "/SAPAPO/MATKEY", "/SAPAPO/LOC", "TBLSYSDEST", "TBDLS"],
      tcodes: ["SM59", "BD54", "SCC4", "CFM1", "CFM2", "/SAPAPO/CP1"],
      fiori: ["F2101", "F0998"],
      configHe: [
        "Logical System (BD54): הגדר מערכת-לוגית ייחודית ל-ERP ול-DMP, ושייך לכל client ב-SCC4.",
        "RFC Destinations (SM59): חיבור דו-כיווני — DMP→ERP ו-ERP→DMP, סוג 3 (ABAP), עם משתמש-CIF ייעודי.",
        "Business System Group (BSG): קבץ את כל המערכות המתקשרות ב-BSG אחד כדי לאחד שמות-אובייקטים.",
        "Queue type: קבע inbound/outbound queues (qRFC) לסנכרון-CIF; הגדר QIN/QOUT scheduler (SMQR/SMQS).",
      ],
      flow: [
        { he: "מערכת-תכנון DMP (liveCache + Optimizer)", code: "PP/DS sidecar" },
        { he: "Core Interface", code: "CIF", note: "RFC + qRFC queues" },
        { he: "מערכת-ביצוע ERP", code: "ECC / S/4HANA", note: "מלאי + פק\"ע" },
        { he: "Integration Models", code: "CFM1/CFM2", note: "master + transaction" },
        { he: "סנכרון דו-כיווני", code: "SMQ1/SMQ2" },
      ],
      masterDataHe: [
        "Logical System לכל מערכת (BD54) + שיוך ל-client (SCC4) — בסיס ל-CIF.",
        "RFC Destinations (SM59) דו-כיווניים — הצינור הפיזי של ה-CIF.",
        "Business System Group אחד ל-landscape — מאחד מיפוי-אובייקטים בין ERP ל-DMP.",
      ],
      mistakesHe: [
        "בלבול בין sidecar ל-embedded — ניסיון לחבר CIF במערכת embedded שבה הנתונים כבר משותפים.",
        "הגדרת RFC חד-כיווני בלבד — חוסם זרימת-החזרה של Planned Orders/Confirmations.",
        "מספר Business System Groups שונים — מיפוי-אובייקטים נשבר ו-CIF נכשל.",
        "התעלמות מניטור-תורים (SMQ1/SMQ2) — תקיעת-תור שקטה שמקפיאה את הסנכרון.",
      ],
      troubleshootHe: [
        "נתונים לא מגיעים ל-DMP ➔ בדוק RFC (SM59 connection test), Integration Model פעיל, ותור ב-SMQ1.",
        "Planned Order לא חוזר ל-ERP ➔ RFC הפוך (DMP→ERP) או QOUT scheduler לא רץ (SMQS).",
        "תור תקוע SYSFAIL ➔ פתח SMQ2 ב-ERP, נתח את ה-entry, תקן ושחרר (re-execute).",
        "כפילות/חוסר-עקביות אובייקטים ➔ Business System Group לא-אחיד או BDLS לא בוצע אחרי copy.",
      ],
      bestPracticeHe: [
        "הקצה משתמש-CIF ייעודי עם הרשאות-RFC מינימליות לשני הכיוונים.",
        "החזק Business System Group אחד לכל landscape — אל תפצל.",
        "הקם ניטור-תורים יזום (SMQ1/SMQ2 + alert) — תקיעות-CIF הן השכיחות ביותר.",
        "בחר sidecar רק כשנדרש (ERP ישן / ריבוי-מערכות); אחרת העדף embedded לפשטות.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין sidecar ל-embedded PP/DS?", aHe: "Sidecar = PP/DS במערכת נפרדת (DMP) המחוברת ל-ERP דרך CIF; embedded = PP/DS בתוך אותה מערכת S/4HANA של הביצוע, בלי CIF בין-מערכתי. Sidecar מתאים ל-ERP ישן או ריבוי-מערכות." },
        { qHe: "מהו CIF ולמה הוא נחוץ ב-sidecar?", aHe: "Core Interface — תשתית RFC/qRFC המסנכרנת master data ו-transaction data בין ה-ERP ל-DMP בשני הכיוונים. ב-sidecar הוא חיוני כי הנתונים אינם משותפים." },
        { qHe: "מהו Business System Group?", aHe: "קבוצה לוגית של מערכות המתקשרות ב-CIF, המאחדת מיפוי שמות-אובייקטים. לכל landscape צריך BSG אחד עקבי." },
      ],
      takeawaysHe: [
        "Sidecar = DMP נפרד + ERP, מחוברים ב-CIF; embedded = הכל במערכת אחת.",
        "CIF מסנכרן master ו-transaction data דו-כיוונית דרך RFC/qRFC.",
        "BD54 + SM59 + BSG אחד = שלד-האינטגרציה.",
        "ניטור-תורים (SMQ1/SMQ2) הוא חובת-תפעול ב-sidecar.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אינטגרציה (9.4)", href: "/library/ppds/chapter-09/#sub-9.4" },
        { labelHe: "PP/DS · תנאים מוקדמים (9.2)", href: "/library/ppds/chapter-09/#sub-9.2" },
      ],
    },
    // ============================================================ 9.2
    {
      id: "9.2", titleHe: "תנאים מוקדמים", titleEn: "Prerequisites",
      execHe:
        "לפני שמחברים PP/DS sidecar (DMP) ל-ERP יש לוודא סדרת תנאים-מוקדמים: גרסאות-מערכת תואמות, רכיב PP/DS פעיל ב-DMP, liveCache תקין, חיבורי-RFC, מערכות-לוגיות, והרשאות-CIF. דילוג על תנאי-סף אחד מפיל את כל האינטגרציה — לכן זהו שלב-שער (gate) לפני כל קונפיגורציה.",
      beginnerHe:
        "כמו לפני שמחברים שתי מכונות: צריך לוודא שלשתיהן יש חשמל, שהכבל מתאים, ושכל אחת 'מכירה' את השנייה בשם. בעולם SAP זה אומר: גרסאות נכונות, liveCache עובד, חיבור-RFC קיים, ולכל מערכת יש שם-לוגי. רק אחרי שכל אלה מסומנים — מתחילים להגדיר.",
      consultantHe:
        "צ'קליסט-סף: (1) DMP מבוסס S/4HANA עם רכיב Advanced Planning (PP/DS) מופעל דרך Business Function/scope; (2) liveCache מותקן ומחובר (LC10 — connection LDA ירוקה); (3) ה-ERP הוא ECC עם PI/CIF add-on תואם או S/4HANA נפרד; (4) Logical Systems (BD54) + RFC (SM59) דו-כיווניים; (5) Business System Group; (6) משתמש-CIF עם הרשאות; (7) זמני-מערכת ו-time zones מסונכרנים; (8) plug-in/CIF compatibility בין הגרסאות. בלי liveCache פעיל — PP/DS פשוט אינו עולה.",
      purposeHe:
        "המטרה: למנוע כישלון-אינטגרציה מאוחר ויקר. אימות תנאי-הסף מראש מבטיח שה-CIF, ה-liveCache והתכנון יעבדו מהרגע הראשון, ושלא 'נגלה' חוסר באמצע go-live.",
      processExampleHe:
        "צוות-טכני מריץ LC10 ומוודא ש-liveCache במצב Running, בודק SM59 connection test לשני הכיוונים, מוודא ש-PP/DS מסומן פעיל ב-scope, ורק אז ניגש להגדיר Integration Models. כל סעיף שנכשל נחסם עד לתיקון.",
      cbcHe:
        "ב-CBC לפני חיבור ה-sidecar: ה-Basis מאשר שה-ECC במפלס-תמיכה תואם ל-CIF, שה-DMP עם liveCache ירוק, ושמשתמש-CIF (RFC) קיים בשתי המערכות עם time zone אחיד — אחרת תאריכי-המילוי יסטו בין המערכות.",
      navHe: [
        "Advanced Planning ► Basic Settings ► Check liveCache / Connection (LC10)",
        "Advanced Planning ► Basic Settings ► Activate Advanced Planning (PP/DS) in Scope",
        "SAP NetWeaver ► ALE ► Communication ► Create RFC Connections (SM59)",
      ],
      tables: ["LCA_GUID_STR", "/SAPAPO/LCBO", "RSADMIN", "TBDLS"],
      tcodes: ["LC10", "SM59", "BD54", "SCC4", "SU01"],
      fiori: ["F1470", "F2101"],
      configHe: [
        "liveCache (LC10): ודא connection LDA/LEA במצב Running; PP/DS לא יעבוד בלעדיו.",
        "Activate Advanced Planning: סמן את scope PP/DS ב-DMP (Manufacturing for Planning and Scheduling).",
        "RFC (SM59): שני destinations מסוג 3 + connection test ירוק לשני הכיוונים.",
        "CIF user: צור משתמש-תקשורת עם הרשאות-RFC/CIF בשתי המערכות; סנכרן time zones.",
      ],
      flow: [
        { he: "גרסאות + תאימות-CIF", code: "Plug-in" },
        { he: "liveCache פעיל", code: "LC10", note: "Running" },
        { he: "PP/DS מופעל ב-scope", code: "DMP" },
        { he: "RFC + Logical Systems", code: "SM59/BD54" },
        { he: "משתמש-CIF + time zone", code: "SU01" },
      ],
      masterDataHe: [
        "Logical System לכל מערכת (BD54) — תנאי-סף ל-Integration Models.",
        "משתמש-CIF (SU01) בשתי המערכות עם הרשאות-RFC.",
        "Time zone + system time מסונכרנים — מונע סטיית-תאריכים ב-CIF.",
      ],
      mistakesHe: [
        "התחלת קונפיגורציה לפני ש-liveCache במצב Running — PP/DS לא עולה.",
        "אי-הפעלת scope של PP/DS ב-DMP — הטרנזקציות פשוט חסרות.",
        "RFC חד-כיווני או ללא connection test — כשל-CIF סמוי.",
        "time zones לא-מסונכרנים — תאריכי-תכנון סוטים בין ERP ל-DMP.",
      ],
      troubleshootHe: [
        "PP/DS לא נטען / שגיאת-liveCache ➔ LC10, ודא Running, בדוק LCA/LDA connection.",
        "טרנזקציות PP/DS חסרות ➔ scope של Advanced Planning לא הופעל ב-DMP.",
        "Connection test נכשל ➔ SM59 — gateway, host, או משתמש-CIF שגויים.",
        "תאריכים סוטים ב-CIF ➔ time zone / system time לא-אחיד בין המערכות.",
      ],
      bestPracticeHe: [
        "בנה צ'קליסט תנאי-סף וחתום עליו לפני כל קונפיגורציה.",
        "בדוק liveCache (LC10) כשלב-ראשון בכל בוקר-go-live.",
        "תעד את גרסאות ה-plug-in/CIF ואת תאימותן מראש.",
        "השתמש במשתמש-CIF ייעודי ולא במשתמש-דיאלוג אישי.",
      ],
      interviewHe: [
        { qHe: "מהו liveCache ומדוע הוא תנאי-סף ל-PP/DS?", aHe: "מנוע זיכרון מיוחד המאחסן את אובייקטי-התכנון (orders, pegging) לביצועים מהירים. בלי liveCache פעיל (LC10 Running) PP/DS אינו עולה כלל." },
        { qHe: "אילו תנאי-סף נדרשים לחיבור sidecar ל-ERP?", aHe: "תאימות-גרסאות/CIF, liveCache פעיל, PP/DS מופעל ב-scope, Logical Systems (BD54), RFC דו-כיווני (SM59), Business System Group, משתמש-CIF, וזמני-מערכת מסונכרנים." },
        { qHe: "מדוע סנכרון time zone חשוב?", aHe: "CIF מעביר תאריכים/שעות בין המערכות; חוסר-סנכרון גורם לתכנון לסטות מהביצוע — תאריכי-התחלה/סיום שגויים." },
      ],
      takeawaysHe: [
        "תנאי-סף הם שער-חובה לפני כל קונפיגורציית-אינטגרציה.",
        "liveCache פעיל (LC10) = תנאי קיומי ל-PP/DS.",
        "RFC דו-כיווני + Logical Systems + BSG = שלד-CIF.",
        "סנכרן time zones ומשתמש-CIF בשתי המערכות.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ארכיטקטורה (9.1)", href: "/library/ppds/chapter-09/#sub-9.1" },
        { labelHe: "PP/DS · התאמה והגדרה (9.3)", href: "/library/ppds/chapter-09/#sub-9.3" },
      ],
    },
    // ============================================================ 9.3
    {
      id: "9.3", titleHe: "התאמה אישית והגדרה", titleEn: "Customizing and Configuration",
      execHe:
        "קונפיגורציית ה-sidecar מתחלקת לשני צדדים: הגדרות במערכת-ה-ERP (צד-המקור/הביצוע) והגדרות ב-DMP (צד-התכנון). שני הצדדים חייבים להיות עקביים כדי שה-CIF יזרים נתונים נכון. פרק זה מסגר את שני בלוקי-ההגדרה ומכין את הקרקע לתת-הסעיפים שמפרטים כל צד.",
      beginnerHe:
        "כמו לכוונן שני מכשירים שצריכים לעבוד יחד — צריך לכוון כל אחד בנפרד, אבל באותם ערכים. צד אחד הוא ה-ERP (שם מבצעים), והצד השני הוא DMP (שם מתכננים). אם נכוון רק אחד, ה'שיחה' ביניהם תיכשל.",
      consultantHe:
        "ה-ERP צריך הגדרות שמכשירות אותו לדבר עם PP/DS: distribution definitions, RFC, ולעיתים advanced-planning flags ברמת-material/plant. ה-DMP צריך הגדרות-תכנון: planning version, model, planning procedures, ו-CIF inbound settings. נקודות-תיאום: שמות Logical System, BSG, ו-mapping של plants/materials. אי-עקביות בין הצדדים = CIF errors. שני תת-הסעיפים (9.3.1 ו-9.3.2) מפרטים כל צד.",
      purposeHe:
        "המטרה: להבטיח ששתי המערכות מוגדרות בצורה משלימה — שה-ERP יודע 'לפרסם' נתונים ל-DMP, ושה-DMP יודע 'לקלוט' ולתכנן אותם. תיאום זה הוא תנאי לזרימת-CIF נקייה.",
      processExampleHe:
        "צוות-המימוש קודם מגדיר את צד-ה-ERP (RFC, distribution), ואז את צד-ה-DMP (planning version, CIF inbound), ולבסוף מריץ Integration Model ראשון לבדיקת זרימה מקצה-לקצה.",
      cbcHe:
        "ב-CBC: ה-ECC מוגדר לפרסם את חומרי-המשקה והקווים ל-DMP, וה-DMP מוגדר עם planning version פעילה לקווי-המילוי. רק כששני הצדדים מסונכרנים, תכנית-המילוי זורמת.",
      navHe: [
        "Advanced Planning ► Basic Settings ► Configure the System (Source + Target)",
        "Integration with Other SAP Components ► Advanced Planning and Optimization",
        "Production Planning and Detailed Scheduling (PP/DS) ► Global Settings",
      ],
      tables: ["CIF_IMODEL", "/SAPAPO/VERSDATA", "T000", "TCIFOPTLOG"],
      tcodes: ["CFC1", "CFC2", "CFM1", "/SAPAPO/MVM", "SPRO"],
      fiori: ["F2101"],
      configHe: [
        "צד-ERP: distribution definitions + RFC + flags ל-advanced planning (ראה 9.3.1).",
        "צד-DMP: planning version, model, planning procedures, CIF inbound (ראה 9.3.2).",
        "תיאום: שמות Logical System, BSG, ומיפוי plants/materials זהים בשני הצדדים.",
        "Application log: הפעל CIF application log (CFC2) לאיתור-תקלות מוקדם.",
      ],
      flow: [
        { he: "הגדרות צד-ERP", code: "9.3.1", note: "מקור/ביצוע" },
        { he: "הגדרות צד-DMP", code: "9.3.2", note: "תכנון" },
        { he: "תיאום שמות + מיפוי", code: "BSG" },
        { he: "Integration Model ראשון", code: "CFM1" },
        { he: "בדיקת-זרימה מקצה-לקצה", code: "CIF" },
      ],
      masterDataHe: [
        "Logical System + BSG עקביים בשני הצדדים — בסיס למיפוי-אובייקטים.",
        "Planning Version ב-DMP — מיכל-התכנון שאליו נקלטים הנתונים.",
      ],
      mistakesHe: [
        "הגדרת צד אחד בלבד (ERP או DMP) — CIF נכשל בזרימה.",
        "שמות Logical System לא-תואמים בין הצדדים.",
        "אי-הפעלת CIF application log — תקלות נשארות סמויות.",
        "מיפוי plants/materials לא-עקבי — אובייקטים 'נופלים' ב-CIF.",
      ],
      troubleshootHe: [
        "CIF נכשל בזרימה ➔ ודא ששני הצדדים מוגדרים ושמות Logical System תואמים.",
        "אובייקט לא נקלט ב-DMP ➔ planning version/model לא מוגדר או mapping שגוי.",
        "אין יומן-תקלות ➔ הפעל CIF application log (CFC2).",
      ],
      bestPracticeHe: [
        "הגדר את שני הצדדים בו-זמנית ובדוק מקצה-לקצה לפני המשך.",
        "הפעל CIF application log כברירת-מחדל בכל landscape.",
        "תעד מיפוי plants/materials במסמך-אינטגרציה משותף.",
      ],
      interviewHe: [
        { qHe: "מדוע צריך להגדיר את שני הצדדים (ERP + DMP)?", aHe: "כי ב-sidecar הנתונים אינם משותפים; ה-ERP חייב לדעת לפרסם וה-DMP לקלוט ולתכנן. הגדרת צד אחד בלבד מפילה את ה-CIF." },
        { qHe: "מה תפקיד ה-CIF application log?", aHe: "הוא מתעד שגיאות-CIF (CFC2) ומאפשר איתור-תקלות מהיר — בלעדיו תקלות-זרימה נשארות סמויות." },
      ],
      takeawaysHe: [
        "קונפיגורציה דו-צדדית: ERP (9.3.1) + DMP (9.3.2).",
        "תיאום Logical System, BSG ומיפוי הוא תנאי-זרימה.",
        "הפעל CIF application log לאיתור-תקלות.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הגדרות ב-ERP (9.3.1)", href: "/library/ppds/chapter-09/#sub-9.3.1" },
        { labelHe: "PP/DS · הגדרות ב-DMP (9.3.2)", href: "/library/ppds/chapter-09/#sub-9.3.2" },
      ],
      children: [
        {
          id: "9.3.1", titleHe: "הגדרות במערכת ה-ERP", titleEn: "Settings in the ERP System",
          execHe:
            "בצד-ה-ERP מגדירים את התשתית שמכשירה אותו לפרסם נתונים אל DMP דרך CIF: target system / distribution definition, חיבורי-RFC, הגדרות-CIF גלובליות, ובמידת-הצורך סימון material/plant כרלוונטיים-לתכנון-מתקדם. זהו 'צד-המוצא' של האינטגרציה.",
          beginnerHe:
            "כאן מכינים את ה-ERP 'לשלוח דואר' ל-DMP. צריך לומר לו לאן לשלוח (איזו מערכת-יעד), דרך איזה צינור (RFC), ומה רלוונטי לשלוח. בלי זה ה-ERP לא יודע שיש בכלל מערכת-תכנון.",
          consultantHe:
            "מרכיבים: (1) CIF target system / distribution definition (CFC1/CFC9) הקובע לאן מפורסמים אובייקטים; (2) RFC destination ל-DMP (SM59); (3) הגדרות-CIF גלובליות (CFC2 — application log, queue type, debugging); (4) Logical System של ה-DMP מוכר ל-ERP. ב-ECC נדרש PI/CIF plug-in תואם. נתוני-האב המפורסמים (חומרים, מרכזי-עבודה, BOM, routing) נבחרים דרך Integration Models — אך התשתית כאן מאפשרת זאת.",
          purposeHe:
            "להכשיר את ה-ERP כצד-מוצא: שידע לאיזו מערכת-תכנון לפרסם, דרך איזה ערוץ, ואילו הגדרות-CIF להחיל. בלי צד-ERP מוגדר, אין מה ל-DMP לקלוט.",
          processExampleHe:
            "ב-ECC מגדירים target system = DMP (CFC1), RFC destination אליו (SM59), ומפעילים application log + queue type ב-CFC2. כעת ה-ERP מוכן לפרסם Integration Models.",
          cbcHe:
            "ב-CBC ה-ECC מוגדר עם target system = DMP, RFC ל-DMP, ו-application log פעיל — כך חומרי-המשקה והקווים מוכנים לפרסום ל-sidecar.",
          navHe: [
            "Integration with Other SAP Components ► Advanced Planning and Optimization ► Basic Settings for the Data Transfer ► Target System and RFC Destination (CFC1)",
            "Integration with Other SAP Components ► Advanced Planning and Optimization ► Basic Settings for the Data Transfer ► Set User Parameters / Application Log (CFC2)",
            "SAP NetWeaver ► ALE ► Create RFC Connections (SM59)",
          ],
          tables: ["CIF_IMODEL", "TCIFDEST", "TCIFOPTLOG", "TBDLS"],
          tcodes: ["CFC1", "CFC2", "CFC9", "SM59", "CFM1"],
          fiori: ["F2101"],
          configHe: [
            "Target System + RFC (CFC1): שייך את Logical System של ה-DMP ל-RFC destination שלו.",
            "CIF global settings (CFC2): application log = פעיל, queue type (qRFC), debugging מבוקר.",
            "RFC destination (SM59): סוג 3 ל-DMP + connection test ירוק.",
            "PI/CIF plug-in: ודא תאימות-גרסה ב-ECC (לא רלוונטי ב-S/4HANA ERP).",
          ],
          flow: [
            { he: "Target system = DMP", code: "CFC1" },
            { he: "RFC destination", code: "SM59" },
            { he: "CIF global settings", code: "CFC2", note: "log + queue" },
            { he: "מוכן לפרסם Integration Model", code: "CFM1" },
          ],
          masterDataHe: [
            "Logical System של DMP מוכר ב-ERP + RFC destination אליו.",
            "אובייקטי-אב (חומר, מרכז-עבודה, BOM, routing) נבחרים ל-CIF דרך Integration Models.",
          ],
          mistakesHe: [
            "אי-הגדרת target system (CFC1) — ה-ERP לא יודע לאן לפרסם.",
            "RFC destination שגוי או ללא connection test.",
            "queue type לא מוגדר ב-CFC2 — בעיות-סדר/ביצועים ב-CIF.",
            "ב-ECC: plug-in/CIF לא-תואם לגרסת-DMP.",
          ],
          troubleshootHe: [
            "פרסום נכשל ➔ CFC1 target system חסר או RFC (SM59) שגוי.",
            "אין יומן ➔ application log לא פעיל ב-CFC2.",
            "שגיאות-תאימות ➔ PI/CIF plug-in לא-תואם ב-ECC.",
          ],
          bestPracticeHe: [
            "הפעל application log תמיד; אל תכבה גם בפרודקשן.",
            "השתמש ב-queue type (qRFC) לשמירת-סדר וביצועים.",
            "בדוק תאימות-plug-in מול גרסת-DMP לפני go-live.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר CFC1 בצד-ה-ERP?", aHe: "Target system + RFC destination — לאיזו מערכת-תכנון (DMP) ה-ERP מפרסם אובייקטים ודרך איזה חיבור-RFC." },
            { qHe: "אילו אובייקטים נבחרים לפרסום מה-ERP?", aHe: "נתוני-אב כמו חומרים, מרכזי-עבודה, BOM ו-routing — דרך Integration Models (CFM1); התשתית ב-CFC1/CFC2 מאפשרת זאת." },
          ],
          takeawaysHe: [
            "צד-ERP = צד-מוצא: target system + RFC + CIF settings.",
            "CFC1 קובע יעד-פרסום; CFC2 קובע log/queue.",
            "ב-ECC חובה לוודא תאימות PI/CIF plug-in.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · אינטגרציית נתוני-אב (9.4.1)", href: "/library/ppds/chapter-09/#sub-9.4.1" },
          ],
        },
        {
          id: "9.3.2", titleHe: "הגדרות ב-SAP S/4HANA Manufacturing for Planning and Scheduling", titleEn: "Settings in SAP S/4HANA Manufacturing for Planning and Scheduling",
          execHe:
            "בצד-ה-DMP מגדירים את סביבת-התכנון: Model + Planning Version (גרסת-התכנון הפעילה 000), planning procedures, ו-CIF inbound settings. זהו 'צד-היעד' שקולט את הנתונים מה-ERP ומריץ עליהם את התכנון המתקדם של PP/DS.",
          beginnerHe:
            "כאן מכינים את DMP 'לקבל את הדואר' ולתכנן עליו. צריך 'מגירה' שאליה נכנסים הנתונים (Planning Version), וכללים מה לעשות איתם (planning procedures). בלי זה הנתונים נכנסים ל'חלל ריק' ואין תכנון.",
          consultantHe:
            "מרכיבים: (1) Model + Planning Version — בדרך-כלל Model 000 / Version 000 כגרסה הפעילה היחידה ל-CIF; (2) CIF inbound queue settings (/SAPAPO/C2); (3) planning procedures ו-PP/DS global settings ל-heuristics/Optimizer; (4) location/material consistency אחרי קליטה. ה-Planning Version היא מיכל סגור — רק 000 מתעדכן מ-CIF; גרסאות-סימולציה אחרות אינן מקבלות נתוני-CIF חיים.",
          purposeHe:
            "להכשיר את DMP כצד-יעד: שיהיה מקום (Version) לקלוט אליו את הנתונים, וכללים (procedures) להריץ עליהם תכנון. זהו התנאי שהופך נתונים שזרמו ל-DMP לתכנית-ייצור מתוזמנת.",
          processExampleHe:
            "ב-DMP מוודאים ש-Model 000/Version 000 קיימים, מגדירים CIF inbound queue, וקובעים planning procedure לחומרים שייקלטו. כשחומר נכנס מ-CIF, הוא משויך ל-Version 000 ומוכן ל-heuristic/Optimizer.",
          cbcHe:
            "ב-CBC ה-DMP מחזיק Version 000 פעילה לקווי-המילוי; planning procedure מפעיל heuristic-תכנון אוטומטי על כל חומר-משקה שנקלט מ-ECC, וה-Optimizer מסדר את רצף-הקווים.",
          navHe: [
            "Advanced Planning ► Master Data ► Planning Version Management ► Maintain Planning Version (/SAPAPO/MVM)",
            "Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS) ► Global Settings ► Maintain Global Parameters and Defaults",
            "Advanced Planning ► Basic Settings for Data Transfer ► Set Inbound Queue / Application Log (/SAPAPO/C2)",
          ],
          tables: ["/SAPAPO/VERSDATA", "/SAPAPO/MARM", "/SAPAPO/PPDSGLB", "TCIFOPTLOG"],
          tcodes: ["/SAPAPO/MVM", "/SAPAPO/C2", "/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
          fiori: ["F2101", "F0998"],
          configHe: [
            "Planning Version (/SAPAPO/MVM): ודא Model 000 / Version 000 פעילה — היחידה שמתעדכנת מ-CIF.",
            "PP/DS global settings: ברירות-מחדל ל-heuristics, Optimizer, ו-planning horizon.",
            "Planning procedure לכל חומר: קובע אם תכנון אוטומטי מופעל בקליטה.",
            "CIF inbound (/SAPAPO/C2): queue + application log בצד-DMP.",
          ],
          flow: [
            { he: "Model 000 / Version 000", code: "/SAPAPO/MVM" },
            { he: "PP/DS global settings", code: "DMP" },
            { he: "Planning procedure", code: "per material" },
            { he: "CIF inbound + log", code: "/SAPAPO/C2" },
            { he: "מוכן ל-heuristic/Optimizer", code: "/SAPAPO/RRP3" },
          ],
          masterDataHe: [
            "Planning Version 000 — מיכל-התכנון הפעיל היחיד שמתעדכן מ-CIF.",
            "Planning procedure לכל חומר — קובע תכנון אוטומטי בקליטה.",
          ],
          mistakesHe: [
            "ציפייה שגרסת-סימולציה תקבל נתוני-CIF — רק Version 000 מתעדכנת.",
            "planning procedure לא מוגדר — חומר נקלט אך לא מתוכנן.",
            "אי-הגדרת CIF inbound queue בצד-DMP — נתונים נתקעים.",
            "planning horizon קצר מדי — דרישות נופלות מחוץ-לאופק.",
          ],
          troubleshootHe: [
            "חומר נקלט אך לא מתוכנן ➔ planning procedure / heuristic לא מוגדר.",
            "נתוני-CIF לא נקלטים ➔ inbound queue (/SAPAPO/C2) לא פעיל.",
            "דרישות חסרות ➔ planning horizon קצר מדי ב-global settings.",
          ],
          bestPracticeHe: [
            "השתמש ב-Version 000 בלבד ל-CIF; שמור גרסאות אחרות לסימולציה.",
            "קבע planning procedure מתאים לכל סוג-חומר לפני קליטה.",
            "כוון planning horizon לכיסוי מלא של אופק-הביקוש.",
          ],
          interviewHe: [
            { qHe: "מדוע רק Planning Version 000 מתעדכנת מ-CIF?", aHe: "Version 000 היא הגרסה הפעילה (active) המייצגת את המציאות; גרסאות אחרות הן סימולציה ואינן מקבלות נתוני-CIF חיים." },
            { qHe: "מה תפקיד planning procedure בצד-DMP?", aHe: "הוא קובע אילו פעולות-תכנון (heuristic) מתבצעות אוטומטית כשחומר/הזמנה נקלטים — בלעדיו החומר נקלט אך נשאר ללא תכנון." },
          ],
          takeawaysHe: [
            "צד-DMP = צד-יעד: Version 000 + planning procedures + CIF inbound.",
            "רק Version 000 מתעדכנת מ-CIF; השאר סימולציה.",
            "planning procedure מפעיל תכנון אוטומטי בקליטה.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · אינטגרציית נתוני-תנועה (9.4.2)", href: "/library/ppds/chapter-09/#sub-9.4.2" },
          ],
        },
      ],
    },
    // ============================================================ 9.4
    {
      id: "9.4", titleHe: "אינטגרציה", titleEn: "Integration",
      execHe:
        "האינטגרציה בין ERP ל-DMP מתבצעת כולה דרך CIF ומתחלקת לשני זרמים: נתוני-אב (master data) ונתוני-תנועה (transaction data). נתוני-האב מועברים פעם-אחת ומתוחזקים (delta), בעוד נתוני-התנועה זורמים בזמן-אמת לשני הכיוונים. הבנת ההבחנה היא מפתח לתפעול-CIF נקי.",
      beginnerHe:
        "יש שני סוגי-מידע שעוברים בצינור ה-CIF. הראשון הוא 'מי ומה' — החומרים, הקווים, המתכונים (master data) שמשתנים לעיתים רחוקות. השני הוא 'מה קורה עכשיו' — דרישות, הזמנות, אישורים (transaction data) שזורמים כל הזמן. שני הזרמים יחד נותנים ל-DMP תמונה מלאה לתכנון.",
      consultantHe:
        "כל זרם מבוסס Integration Models (CFM1 ליצירה, CFM2 להפעלה/כיבוי). Master data: materials→/SAPAPO/MATKEY, work centers→resources, BOM+routing→PDS, plants→locations. Transaction data: requirements, planned orders, production orders, stocks, confirmations — דו-כיוונית. נתוני-אב חייבים להגיע לפני נתוני-תנועה (אחרת CIF נכשל בחוסר-mapping). שני תת-הסעיפים (9.4.1, 9.4.2) מפרטים כל זרם.",
      purposeHe:
        "המטרה: לספק ל-DMP את כל הנתונים לתכנון מדויק — הן את ה'שלד' (master data) והן את ה'דם' (transaction data) — ולהחזיר ל-ERP את תוצאות-התכנון לביצוע. ללא שני הזרמים אין מעגל-תכנון-ביצוע סגור.",
      processExampleHe:
        "תחילה Integration Model של master data מעביר חומרים, resources ו-PDS ל-DMP. אחר-כך Integration Model של transaction data מעביר דרישות והזמנות. PP/DS מתכנן, וה-Planned Orders חוזרים ל-ERP — הכל דרך אותו ערוץ-CIF.",
      cbcHe:
        "ב-CBC: master data (חומרי-משקה, קווי-מילוי כ-resources, מתכונים כ-PDS) מועבר ראשון; אחריו transaction data (דרישות-מילוי, אישורי-קווים). PP/DS מתזמן את הקווים ומחזיר תכנית ל-ECC.",
      navHe: [
        "Integration with Other SAP Components ► Advanced Planning and Optimization ► Application-Specific Settings ► Integration Models",
        "Logistics ► Central Functions ► Supply Chain Planning Interface (CIF) ► Integration Model ► Create (CFM1)",
        "Logistics ► Central Functions ► Supply Chain Planning Interface (CIF) ► Integration Model ► Activate (CFM2)",
      ],
      tables: ["CIF_IMODEL", "/SAPAPO/MATKEY", "/SAPAPO/LOC", "/SAPAPO/ORDMAP"],
      tcodes: ["CFM1", "CFM2", "CFM3", "CFM4", "SMQ1", "SMQ2"],
      fiori: ["F2101", "F0998"],
      configHe: [
        "Integration Model (CFM1): הגדר אילו אובייקטים (master/transaction) נכללים, לפי plant/material/type.",
        "Activate (CFM2): הפעל/כבה Integration Model — רק פעיל מזרים נתונים.",
        "סדר: master data לפני transaction data — תלות-mapping.",
        "ניטור: SMQ1/SMQ2 + CFM3/CFM4 לבדיקת אובייקטים שהועברו.",
      ],
      flow: [
        { he: "Integration Model — master", code: "9.4.1" },
        { he: "Integration Model — transaction", code: "9.4.2" },
        { he: "Activate", code: "CFM2" },
        { he: "זרימה דרך CIF", code: "qRFC" },
        { he: "ניטור-תורים", code: "SMQ1/SMQ2" },
      ],
      masterDataHe: [
        "Integration Models (CIF_IMODEL) מגדירים את היקף-ההעברה לכל זרם.",
        "סדר-תלות: master data חייב להעביר לפני transaction data.",
      ],
      mistakesHe: [
        "הפעלת transaction model לפני master model — CIF נכשל בחוסר-mapping.",
        "Integration Model שנוצר אך לא הופעל (CFM2) — שום דבר לא זורם.",
        "Integration Models חופפים — כפילות והתנגשות.",
        "אי-ניטור SMQ1/SMQ2 — תקיעות סמויות.",
      ],
      troubleshootHe: [
        "נתון לא הגיע ➔ Integration Model פעיל? (CFM2) האובייקט כלול? (CFM1)",
        "שגיאת-mapping ➔ master data חסר; העבר master לפני transaction.",
        "תור תקוע ➔ SMQ1 (DMP) / SMQ2 (ERP), נתח ושחרר.",
      ],
      bestPracticeHe: [
        "נהל Integration Models בנפרד למאסטר ולטרנזקציה.",
        "תמיד העבר master data ראשון, אז transaction.",
        "הפעל ניטור-תורים אוטומטי + alerts.",
        "הימנע מ-Integration Models חופפים — הגדר היקף נקי לכל אחד.",
      ],
      interviewHe: [
        { qHe: "מהם שני זרמי-האינטגרציה ב-CIF?", aHe: "Master data (חומרים, resources, PDS, locations — נדיר-שינוי) ו-transaction data (דרישות, הזמנות, מלאי, אישורים — זמן-אמת, דו-כיווני)." },
        { qHe: "מהו Integration Model ואיך מפעילים אותו?", aHe: "אובייקט המגדיר אילו נתונים מועברים ב-CIF; נוצר ב-CFM1 ומופעל/מכובה ב-CFM2. רק מודל פעיל מזרים נתונים." },
        { qHe: "מדוע סדר ההעברה חשוב?", aHe: "master data חייב להגיע לפני transaction data, אחרת ה-CIF נכשל בחוסר-mapping של החומר/ה-location בצד-DMP." },
      ],
      takeawaysHe: [
        "אינטגרציה = שני זרמים דרך CIF: master (9.4.1) + transaction (9.4.2).",
        "Integration Models (CFM1/CFM2) קובעים מה ומתי זורם.",
        "Master data תמיד לפני transaction data.",
        "ניטור SMQ1/SMQ2 הוא חובת-תפעול.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אינטגרציית נתוני-אב (9.4.1)", href: "/library/ppds/chapter-09/#sub-9.4.1" },
        { labelHe: "PP/DS · אינטגרציית נתוני-תנועה (9.4.2)", href: "/library/ppds/chapter-09/#sub-9.4.2" },
      ],
      children: [
        {
          id: "9.4.1", titleHe: "אינטגרציה של נתוני אב", titleEn: "Integration of Master Data",
          execHe:
            "נתוני-האב הם השלד הקבוע שעובר מ-ERP ל-DMP פעם-אחת ומתוחזק ב-delta: חומרים, מרכזי-עבודה (→ resources), BOM+routing (→ PDS), ומפעלים (→ locations). הם תנאי-סף לכל transaction data — בלי ה-mapping שלהם, הזמנות אינן יכולות להיקלט.",
          beginnerHe:
            "אלה הנתונים ש'לא משתנים כל יום' — איזה מוצרים יש, אילו קווים, מה המתכון, איזה מפעל. הם עוברים ל-DMP פעם אחת בהתחלה, ואחר-כך רק כשמשהו משתנה. הם ה'מילון' שדרכו DMP מבין את ההזמנות שיגיעו אחר-כך.",
          consultantHe:
            "מיפוי: material→/SAPAPO/MATKEY (product), work center→resource, BOM+routing→PDS (Production Data Structure), plant→location. ה-PDS נוצר בצד-DMP בעת ה-CIF מתוך ה-BOM+routing של ה-ERP — זהו האובייקט הקריטי שמאחד 'ממה' ו'כיצד' לתכנון. delta-transfer (change pointers) שומר על עדכניות. ALE change transfer / CIF delta נדרשים לשינויי-master שוטפים.",
          purposeHe:
            "לספק ל-DMP את ה'שלד' לתכנון: מה מתכננים (products), היכן (locations), על איזה משאב (resources), ולפי איזה מבנה (PDS). בלי נתוני-אב, אין על מה להריץ heuristic/Optimizer.",
          processExampleHe:
            "Integration Model של master data מועבר: חומרי-המוצר הופכים ל-products ב-DMP, מרכזי-העבודה ל-resources, וה-BOM+routing ל-PDS. שינוי routing ב-ERP מעדכן את ה-PDS דרך CIF delta.",
          cbcHe:
            "ב-CBC: חומרי-המשקה → products; קווי-המילוי → resources; מתכון-המשקה (BOM+routing) → PDS; המפעל → location. כל אלה עוברים ראשונים, לפני דרישות-המילוי.",
          navHe: [
            "Integration with Other SAP Components ► Advanced Planning and Optimization ► Application-Specific Settings ► Master Data ► Materials / Work Centers / PDS",
            "Logistics ► Central Functions ► CIF ► Integration Model ► Create — Master Data (CFM1)",
            "Advanced Planning ► Master Data ► Production Data Structure (PDS)",
          ],
          tables: ["/SAPAPO/MATKEY", "/SAPAPO/LOC", "/SAPAPO/RESOURCE", "/SAPAPO/PDSHDR"],
          tcodes: ["CFM1", "CFM2", "CURTO_CREATE", "/SAPAPO/CURTO_SIMU", "/SAPAPO/RES01"],
          fiori: ["F2101"],
          configHe: [
            "Master Integration Model (CFM1): כלול materials, work centers, BOM+routing (PDS), plants.",
            "PDS generation: ודא שה-routing+BOM תקפים — ה-PDS נוצר בצד-DMP מהם.",
            "Delta transfer: הפעל change pointers ל-master לשמירת-עדכניות.",
            "מיפוי: plant→location, work center→resource מוגדר עקבי.",
          ],
          flow: [
            { he: "Materials → products", code: "/SAPAPO/MATKEY" },
            { he: "Work centers → resources", code: "/SAPAPO/RES01" },
            { he: "BOM+routing → PDS", code: "CURTO_CREATE" },
            { he: "Plant → location", code: "/SAPAPO/LOC" },
            { he: "Delta transfer", code: "change pointers" },
          ],
          masterDataHe: [
            "Product (/SAPAPO/MATKEY), Resource, Location, PDS — מקבילות-DMP לנתוני-האב של ERP.",
            "PDS = איחוד BOM+routing; האובייקט המרכזי לתכנון מבני ב-DMP.",
          ],
          mistakesHe: [
            "העברת חומר בלי ה-resource/location שלו — PDS/הזמנות נכשלים.",
            "routing/BOM לא-תקף בעת CIF — PDS לא נוצר.",
            "אי-הפעלת delta — שינויי-master לא מתעדכנים ב-DMP.",
            "מיפוי plant→location לא-עקבי — אובייקטים 'נופלים'.",
          ],
          troubleshootHe: [
            "PDS לא נוצר ➔ BOM/routing לא-תקף או חומר/resource חסר ב-DMP.",
            "product לא קיים ב-DMP ➔ Integration Model של master לא הופעל.",
            "שינוי-master לא מתעדכן ➔ change pointers/delta לא פעיל.",
          ],
          bestPracticeHe: [
            "העבר master data במלואו ובסדר-תלות לפני כל transaction.",
            "ודא תקפות BOM+routing לפני יצירת-PDS.",
            "הפעל delta-transfer לשמירת-עדכניות אוטומטית.",
          ],
          interviewHe: [
            { qHe: "מהו PDS ולמה הוא חשוב?", aHe: "Production Data Structure — אובייקט-DMP המאחד BOM+routing לתכנון; הוא נוצר בצד-DMP דרך CIF ומשמש את ה-heuristic/Optimizer לתזמון מבני." },
            { qHe: "כיצד ממופים נתוני-האב מ-ERP ל-DMP?", aHe: "material→product, work center→resource, plant→location, BOM+routing→PDS. המיפוי הזה הוא תנאי לקליטת transaction data." },
          ],
          takeawaysHe: [
            "Master data = שלד קבוע: products, resources, locations, PDS.",
            "PDS מאחד BOM+routing — האובייקט המבני המרכזי.",
            "delta-transfer שומר על עדכניות; master תמיד לפני transaction.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · הגדרות ב-ERP (9.3.1)", href: "/library/ppds/chapter-09/#sub-9.3.1" },
          ],
        },
        {
          id: "9.4.2", titleHe: "אינטגרציה של נתוני תנועה", titleEn: "Integration of Transaction Data",
          execHe:
            "נתוני-התנועה הם הזרם החי, הדו-כיווני: דרישות והזמנות-מכר זורמות מ-ERP ל-DMP, Planned Orders ותוצאות-תכנון חוזרות ל-ERP, ואישורי-ייצור (confirmations) ומלאי מסונכרנים בזמן-אמת. זהו מעגל-התכנון-ביצוע הסגור שמבדיל sidecar עובד מסטטי.",
          beginnerHe:
            "אלה הנתונים ש'משתנים כל הזמן' — מי הזמין מה, אילו הזמנות-ייצור נפתחו, כמה יוצר, וכמה מלאי יש. הם זורמים הלוך-ושוב בין ה-ERP ל-DMP כל הזמן, כך ששתי המערכות תמיד רואות את אותה תמונה עדכנית.",
          consultantHe:
            "זרמים: sales orders/independent requirements + stocks → DMP (קלט-תכנון); Planned Orders מ-PP/DS → ERP (להמרה ל-Production Order); Production Orders + confirmations → DMP (עדכון-תמונה). הכל ב-qRFC זמן-אמת. נקודות-מפתח: order mapping (/SAPAPO/ORDMAP) שומר על זיקת-אובייקט בין המערכות; שינוי בצד אחד מתפרסם אוטומטית; ניטור SMQ1/SMQ2 חיוני כי כל תקיעה כאן עוצרת מיד את הסנכרון התפעולי.",
          purposeHe:
            "לסגור את מעגל התכנון-ביצוע: לספק ל-DMP ביקוש ומלאי עדכניים לתכנון, ולהחזיר ל-ERP את התוצאות לביצוע. כך התכנית ב-DMP והמציאות ב-ERP נשארות מסונכרנות תמיד.",
          processExampleHe:
            "הזמנת-לקוח ב-ERP זורמת ל-DMP כדרישה; PP/DS יוצר Planned Order; הוא חוזר ל-ERP ומומר ל-Production Order; הביצוע ברצפה מדווח (confirmation) וזורם בחזרה ל-DMP לעדכון-עומס ו-pegging.",
          cbcHe:
            "ב-CBC: דרישת-מילוי זורמת מ-ECC ל-DMP; PP/DS מתזמן את הקו ויוצר Planned Order; הוא חוזר ל-ECC כפק\"ע-מילוי; אישור-הקו (כמות שיוצרה) זורם בחזרה ומעדכן את עומס-הקו ב-DMP.",
          navHe: [
            "Integration with Other SAP Components ► Advanced Planning and Optimization ► Application-Specific Settings ► Transaction Data ► Orders / Stocks / Confirmations",
            "Logistics ► Central Functions ► CIF ► Integration Model ► Create — Transaction Data (CFM1)",
            "Logistics ► Central Functions ► CIF ► Monitoring ► qRFC Monitor (SMQ1 / SMQ2)",
          ],
          tables: ["/SAPAPO/ORDMAP", "/SAPAPO/ORDKEY", "/SAPAPO/POSMAPN", "RESB"],
          tcodes: ["CFM1", "CFM2", "SMQ1", "SMQ2", "/SAPAPO/CCR", "/SAPAPO/RRP3"],
          fiori: ["F0998", "F2101"],
          configHe: [
            "Transaction Integration Model (CFM1): כלול sales orders, requirements, stocks, orders, confirmations.",
            "Direction: ודא דו-כיווניות — requirements/stocks ל-DMP; planned orders חזרה ל-ERP.",
            "Order mapping: /SAPAPO/ORDMAP שומר זיקת-אובייקט בין המערכות.",
            "Consistency check: /SAPAPO/CCR להשוואת ERP↔DMP ותיקון-פערים.",
          ],
          flow: [
            { he: "Requirements + stocks → DMP", code: "CIF" },
            { he: "PP/DS תכנון", code: "/SAPAPO/RRP3" },
            { he: "Planned Order → ERP", code: "qRFC" },
            { he: "המרה ל-Production Order", code: "ERP" },
            { he: "Confirmation → DMP", code: "עדכון-עומס" },
          ],
          masterDataHe: [
            "Order mapping (/SAPAPO/ORDMAP) — שומר זיקה בין הזמנת-DMP להזמנת-ERP.",
            "Reservations (RESB) בצד-ERP נגזרות מ-Planned Order שחזר מ-DMP.",
          ],
          mistakesHe: [
            "Integration Model חד-כיווני — Planned Orders לא חוזרים ל-ERP.",
            "אי-הרצת consistency check — פערי ERP↔DMP מצטברים בשקט.",
            "התעלמות מתקיעת-תור (SMQ1/SMQ2) — סנכרון עוצר מיד.",
            "כפילות Integration Models לאותם אובייקטים — התנגשות-עדכון.",
          ],
          troubleshootHe: [
            "Planned Order לא חוזר ➔ Integration Model/RFC הפוך (DMP→ERP) או QOUT scheduler.",
            "פער ERP↔DMP ➔ הרץ /SAPAPO/CCR (Consistency Check Reconciliation).",
            "confirmation לא מעדכן עומס ➔ transaction model לא כולל confirmations.",
            "תור תקוע ➔ SMQ1 (DMP)/SMQ2 (ERP), נתח, תקן, שחרר.",
          ],
          bestPracticeHe: [
            "הגדר Integration Model דו-כיווני מלא לטרנזקציה.",
            "הרץ /SAPAPO/CCR מתוזמן לאיתור-פערים יזום.",
            "הקם ניטור-תורים + alerts — תקיעות-CIF הן הסיכון התפעולי המרכזי.",
            "ודא order mapping תקין לפני go-live.",
          ],
          interviewHe: [
            { qHe: "אילו נתוני-תנועה זורמים בכל כיוון?", aHe: "ל-DMP: requirements, sales orders, stocks, confirmations (קלט-תכנון/עדכון). ל-ERP: Planned Orders ותוצאות-PP/DS (לביצוע). הכל ב-qRFC זמן-אמת." },
            { qHe: "מה תפקיד /SAPAPO/CCR?", aHe: "Consistency Check Reconciliation — משווה את התמונה ב-ERP מול DMP ומתקן פערים שנוצרו מתקיעות-CIF או עדכונים-חסרים." },
            { qHe: "כיצד נשמרת הזיקה בין הזמנת-DMP להזמנת-ERP?", aHe: "דרך order mapping (/SAPAPO/ORDMAP) — כל אובייקט-תנועה נושא מיפוי דו-מערכתי ששומר על עקביות בעדכון דו-כיווני." },
          ],
          takeawaysHe: [
            "Transaction data = זרם חי דו-כיווני דרך CIF.",
            "מעגל סגור: requirements→DMP→Planned Order→ERP→confirmation→DMP.",
            "order mapping + /SAPAPO/CCR שומרים עקביות.",
            "ניטור SMQ1/SMQ2 הוא קו-ההגנה התפעולי.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · הגדרות ב-DMP (9.3.2)", href: "/library/ppds/chapter-09/#sub-9.3.2" },
          ],
        },
      ],
    },
    // ============================================================ 9.5
    {
      id: "9.5", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה הציג את PP/DS כפתרון sidecar בתוך SAP Digital Supply Chain Management: מערכת-תכנון נפרדת (SAP S/4HANA Manufacturing for Planning and Scheduling — DMP) המחוברת ל-ERP דרך CIF integration. כיסינו ארכיטקטורה, תנאי-סף, קונפיגורציה דו-צדדית, ושני זרמי-האינטגרציה — master ו-transaction data. המסר המרכזי: sidecar נותן יכולות-תכנון מתקדמות גם מול ERP ישן או ריבוי-מערכות, במחיר של תפעול-CIF מתמשך.",
      beginnerHe:
        "סיכמנו את כל הסיפור: שתי מערכות (תכנון וביצוע) שמדברות דרך צינור CIF. ראינו מה צריך לפני (תנאי-סף), איך מכוונים כל צד (קונפיגורציה), ואילו שני סוגי-מידע עוברים (קבועים ומשתנים). אם תזכור שלושה דברים: sidecar=נפרד, CIF=הצינור, ו-master-לפני-transaction — הבנת את הליבה.",
      consultantHe:
        "נקודות-לזכירה ליישום: (1) בחר sidecar מול embedded לפי גרסת-ERP וריבוי-מערכות; (2) liveCache + RFC + BSG הם שלד-הסף; (3) הגדר את שני הצדדים בעקביות (Logical System, mapping); (4) Version 000 בלבד מתעדכנת מ-CIF; (5) master data לפני transaction; (6) ניטור-תורים (SMQ1/SMQ2) ו-/SAPAPO/CCR הם חובת-תפעול. שגיאות-ה-CIF השכיחות הן mapping חסר, מודל לא-פעיל, וכיווניות חלקית.",
      purposeHe:
        "המטרה של פרק-הסיכום: לאחד את כל הידע לתמונת-יישום אחת — מתי לבחור sidecar, מה להכין, איך להגדיר, ואיך לתפעל את ה-CIF לאורך-זמן, כך שמעגל התכנון-ביצוע יישאר מסונכרן.",
      processExampleHe:
        "מסלול-יישום טיפוסי: אמת תנאי-סף → הגדר ERP+DMP → העבר master data → העבר transaction data → תכנן ב-PP/DS → החזר Planned Orders → תפעל ניטור-CIF שוטף. כל שלב נשען על הקודם.",
      cbcHe:
        "ב-CBC המעגל המלא: ECC כביצוע, DMP כ-sidecar לתזמון-קווים, CIF כמסנכרן. master (משקאות, קווים, מתכונים) עבר ראשון; transaction (דרישות, אישורים) זורם חי; ניטור-CIF יומי שומר על תכנית-מילוי מסונכרנת מול הרצפה.",
      navHe: [
        "Advanced Planning ► Overview ► Solution Architecture & Integration",
        "Logistics ► Central Functions ► CIF ► Monitoring (SMQ1 / SMQ2)",
        "Advanced Planning ► Master Data ► Consistency Check (/SAPAPO/CCR)",
      ],
      tables: ["CIF_IMODEL", "/SAPAPO/ORDMAP", "/SAPAPO/VERSDATA"],
      tcodes: ["CFM1", "CFM2", "SMQ1", "SMQ2", "/SAPAPO/CCR"],
      fiori: ["F2101", "F0998"],
      configHe: [
        "בחירת-פריסה: sidecar (DMP נפרד + CIF) מול embedded — לפי ERP וריבוי-מערכות.",
        "שלד-סף: liveCache + RFC דו-כיווני + Business System Group.",
        "קונפיגורציה: ERP (9.3.1) + DMP (9.3.2) עקביים; Version 000 ל-CIF.",
        "אינטגרציה: master (9.4.1) לפני transaction (9.4.2); ניטור + /SAPAPO/CCR.",
      ],
      flow: [
        { he: "אמת תנאי-סף", code: "LC10" },
        { he: "הגדר ERP + DMP", code: "9.3" },
        { he: "master ➔ transaction", code: "9.4" },
        { he: "תכנן ב-PP/DS", code: "/SAPAPO/RRP3" },
        { he: "תפעל ניטור-CIF", code: "SMQ1/SMQ2" },
      ],
      masterDataHe: [
        "Integration Models (master + transaction) הם תשתית-האינטגרציה הקבועה.",
        "Version 000 + order mapping שומרים על עקביות-תכנון מול הביצוע.",
      ],
      mistakesHe: [
        "בחירת sidecar כשembedded פשוט יותר — תקורת-CIF מיותרת.",
        "דילוג על תנאי-סף — כשל-go-live.",
        "transaction לפני master — שגיאות-mapping.",
        "תפעול-CIF ללא ניטור — תקיעות שקטות.",
      ],
      troubleshootHe: [
        "אינטגרציה לא עובדת מקצה-לקצה ➔ עבור על השרשרת: סף → קונפיג → master → transaction.",
        "פערי-עקביות ➔ /SAPAPO/CCR.",
        "תקיעות ➔ SMQ1/SMQ2.",
      ],
      bestPracticeHe: [
        "בחר פריסה (sidecar/embedded) מודעת לעלות-התפעול.",
        "עבוד לפי שרשרת-היישום בסדר; אל תדלג שלבים.",
        "הקם ניטור-CIF ו-/SAPAPO/CCR מתוזמן מהיום-הראשון.",
      ],
      interviewHe: [
        { qHe: "מתי תבחר sidecar ולא embedded?", aHe: "כשה-ERP הוא ECC ישן שאינו תומך embedded, או כשצריך לתכנן ריבוי-מערכות במופע-תכנון אחד. אחרת embedded פשוט יותר (אין CIF)." },
        { qHe: "מהם שלושת עמודי-התווך של sidecar עובד?", aHe: "(1) שלד-סף (liveCache+RFC+BSG); (2) קונפיגורציה דו-צדדית עקבית; (3) אינטגרציית master-לפני-transaction עם ניטור-CIF שוטף." },
        { qHe: "מהן שגיאות-ה-CIF הנפוצות ביותר?", aHe: "mapping חסר (master לא הועבר), Integration Model לא-פעיל, כיווניות חלקית, ותקיעות-תור לא-מנוטרות." },
      ],
      takeawaysHe: [
        "PP/DS sidecar = DMP נפרד + ERP, מחוברים ב-CIF.",
        "שרשרת: סף → קונפיג דו-צדדי → master → transaction → תכנון → ניטור.",
        "Version 000 ל-CIF; master תמיד לפני transaction.",
        "ניטור SMQ1/SMQ2 ו-/SAPAPO/CCR = חובת-תפעול מתמשכת.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ארכיטקטורה (9.1)", href: "/library/ppds/chapter-09/#sub-9.1" },
        { labelHe: "PP/DS · אינטגרציה (9.4)", href: "/library/ppds/chapter-09/#sub-9.4" },
      ],
    },
  ],
};
