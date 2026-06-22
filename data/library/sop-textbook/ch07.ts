// ===== S&OP with SAP IBP — Chapter 7 (gold-standard learning chapter) =====
// Collaboration and Management by Exception. Every node is a complete
// LearningNode with 18 facets of authored Hebrew (beginner + consultant).
// SAP objects verbatim EN; IBP is cloud. Hierarchy + ids preserved from source.
import type { TextbookChapter } from "./types";

export const CH7: TextbookChapter = {
  n: 7,
  titleHe: "שיתוף-פעולה וניהול לפי חריגים",
  titleEn: "Collaboration and Management by Exception",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשיתוף-הפעולה ולניהול-לפי-חריגים (Management by Exception) ב-SAP IBP. בתכנון S&OP אמיתי אף מתכנן אינו יכול לבחון כל פריט בכל מחסן; במקום זאת המערכת מתריעה רק על מה שחורג מהמצופה, מנתבת את החריג לאדם הנכון, ומאפשרת לצוותים מבוזרים לעבוד יחד סביב אותה תוכנית-יחידה. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (Coca-Cola bottling), ניווט באפליקציות IBP וב-SAP Build Work Zone, אפליקציות Fiori/IBP ו-Excel add-in, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 7.1
    {
      id: "7.1",
      titleHe: "שיתוף-פעולה באמצעות SAP Build Work Zone",
      titleEn: "Collaboration Using SAP Build Work Zone",
      execHe:
        "SAP Build Work Zone הוא מרחב-העבודה הדיגיטלי המאחד את כל מי שמעורבים בתהליך ה-S&OP — מכירות, ייצור, רכש, כספים והנהלה — למקום אחד. הוא מציג את אפליקציות SAP IBP, מסמכים, דיונים ולוחות-מחוונים תחת חוויית-משתמש אחת, כך שכל בעלי-העניין רואים את אותה אמת-תכנון ומשתפים-פעולה סביבה. זהו המעבר מ'תכנון מבודד בגיליונות' ל'תכנון משותף ושקוף' לרוחב הארגון.",
      beginnerHe:
        "דמיין 'אתר-בית' פנימי לצוות התכנון: עמוד אחד שבו יש קישורים לכל הכלים, לוחות-מחוונים, הודעות והתראות. במקום לחפש כל אפליקציה בנפרד או לשלוח גיליונות במייל, כולם נכנסים למרחב אחד — SAP Build Work Zone — ושם מנווטים אל SAP IBP, פותחים תצוגות-תכנון, וקוראים מה דחוף לטפל בו. זה דבק-החיבור בין האנשים לכלים.",
      consultantHe:
        "SAP Build Work Zone (לשעבר SAP Work Zone / SAP Launchpad service) רץ ב-SAP BTP ומשמש Launchpad מרכזי. הוא מאגד content מסוגים שונים: SAP IBP apps (דרך SAML/OAuth SSO), Workspaces, Cards ו-Feed. ב-IBP החיבור נעשה דרך הגדרת ה-IBP web UI כ-app אינטגרציה, עם SSO מבוסס Identity Authentication (IAS). בקרת-הרשאות נשענת על roles/groups שמותאמים לתפקידי-התכנון. החיבור ל-Excel נעשה דרך הפצת ה-IBP Add-in וקבצי-תבנית במרחב.",
      purposeHe:
        "המטרה: לשבור את ה'איים' (silos). S&OP מצליח רק כשכולם עובדים על אותה תוכנית; Work Zone מספק נקודת-כניסה אחת, נראות משותפת והקשר ארגוני סביב נתוני-התכנון, ובכך מקצר זמני-החלטה ומונע גרסאות סותרות של 'התוכנית'.",
      processExampleHe:
        "מנהל-תכנון נכנס בבוקר ל-SAP Build Work Zone, רואה card עם התראות פתוחות, לוחץ על קישור ל-SAP IBP, נכנס לתצוגת-התכנון, מזהה פער היצע-ביקוש, פותח דיון (Feed) ומתייג את מנהל-הייצור. מנהל-הייצור מקבל התראה באותו מרחב, פותח את אותה תצוגה ומגיב — הכל בלי לצאת מ-Work Zone ובלי מייל אחד.",
      cbcHe:
        "ב-CBC: מנהל-S&OP אזורי, מנהלי קווי-המילוי ומחלקת-המכירות חולקים workspace אחד ב-SAP Build Work Zone. כשמבצע-קיץ מקפיץ ביקוש ל-1.5 ליטר, ההתראה והדיון מתנהלים במרחב המשותף, וכל המעורבים רואים את אותה תוכנית-אספקה מעודכנת — מבלי לערבב גרסאות-גיליון מקומיות.",
      navHe: [
        "SAP Build Work Zone ► Home ► Workspace (מרחב צוות ה-S&OP)",
        "SAP Build Work Zone ► App Finder ► SAP IBP (כניסה דרך SSO)",
        "SAP BTP Cockpit ► Subscriptions ► SAP Build Work Zone (הקצאה והפעלה)",
        "SAP Cloud Identity Services – Identity Authentication (IAS) ► Applications (SSO ל-IBP)",
      ],
      tables: [],
      tcodes: [],
      fiori: ["SAP Build Work Zone", "SAP IBP web UI", "SAP Fiori Launchpad"],
      configHe: [
        "Subscription: הפעלת SAP Build Work Zone ב-SAP BTP subaccount והקצאת roles (Administrator/Member).",
        "SSO: חיבור IAS/IdP יחיד ל-IBP ול-Work Zone כדי שכניסה אחת תפתח את שני העולמות.",
        "Content: הוספת SAP IBP כ-integration/app, יצירת Workspace לצוות-התכנון ו-Cards ללוחות-מחוונים.",
        "Authorizations: מיפוי business roles (Demand Planner / Supply Planner / S&OP Manager) ל-groups במרחב.",
      ],
      flow: [
        { he: "כניסה אחת (SSO)", code: "IAS", note: "Identity Authentication" },
        { he: "מרחב-עבודה משותף", code: "Work Zone", note: "Workspace + Cards + Feed" },
        { he: "ניווט ל-IBP", code: "App Finder" },
        { he: "תצוגת-תכנון / Excel", code: "IBP", note: "web UI / Add-in" },
        { he: "דיון ושיתוף", code: "Feed", note: "תיוג בעלי-עניין" },
      ],
      mistakesHe: [
        "הקמת Work Zone בלי SSO אחיד — משתמשים נדרשים להזדהות פעמיים ונוטשים את המרחב.",
        "ערבוב מסמכים מקומיים בגיליונות במקום עבודה על תוכנית-IBP אחת — חוזר ל'איים'.",
        "הרשאות גורפות מדי — חברי-צוות רואים תצוגות שאינן רלוונטיות להם.",
      ],
      troubleshootHe: [
        "המשתמש לא רואה את IBP במרחב ➔ חסר assignment ל-role/group או חסר integration content.",
        "כניסה כפולה / נפילת-SSO ➔ trust בין IAS ל-Work Zone/IBP לא הוגדר נכון.",
        "התראות לא מופיעות ב-card ➔ ה-card לא חובר למקור הנתונים ב-IBP או חסרות הרשאות-קריאה.",
      ],
      bestPracticeHe: [
        "התחל מ-SSO אחיד (IAS) לפני כל תוכן — חוויית-כניסה חלקה היא תנאי לאימוץ.",
        "בנה Workspace אחד פר-תהליך-S&OP, לא פר-מחלקה, כדי לשמר 'תוכנית-יחידה'.",
        "הצב את ההתראות (Custom Alerts) ולוחות-המחוונים כ-cards בעמוד-הבית כדי שהחריגים יקפצו לעין.",
      ],
      interviewHe: [
        { qHe: "מה תפקיד SAP Build Work Zone בתהליך S&OP?", aHe: "לספק מרחב-עבודה דיגיטלי אחד שמאחד את אפליקציות SAP IBP, לוחות-מחוונים, מסמכים ודיונים — נקודת-כניסה משותפת לכל בעלי-העניין סביב 'תוכנית-יחידה'." },
        { qHe: "כיצד מחברים את SAP IBP ל-SAP Build Work Zone?", aHe: "דרך integration/app content ב-Work Zone עם SSO מבוסס Identity Authentication (IAS), ומיפוי business roles ל-groups לבקרת-גישה." },
      ],
      takeawaysHe: [
        "SAP Build Work Zone = מרחב-עבודה דיגיטלי אחד לכל המעורבים ב-S&OP.",
        "הוא מאחד IBP apps, לוחות-מחוונים, מסמכים ודיונים תחת SSO.",
        "מטרתו: לשבור איים ולעבוד על תוכנית-יחידה שקופה.",
      ],
      relatedHe: [
        { labelHe: "S&OP · התראות מותאמות (7.2)", href: "/library/sop/chapter-07/#sub-7.2" },
        { labelHe: "S&OP · ניהול מקרים (7.3)", href: "/library/sop/chapter-07/#sub-7.3" },
      ],
      children: [
        {
          id: "7.1.1",
          titleHe: "ניווט",
          titleEn: "Navigation",
          execHe:
            "הניווט ב-SAP Build Work Zone הוא הדרך שבה המשתמש מגיע מעמוד-הבית אל הכלי הנכון בזמן הנכון. מבנה-ניווט טוב (Spaces, Pages, App Finder, חיפוש) הופך מרחב עמוס לחוויה ממוקדת-משימה, ומקצר את הזמן מ'התראה' ועד 'פעולה'.",
          beginnerHe:
            "כמו תפריט ושורת-חיפוש באתר: יש עמוד-בית, יש 'מגירות' (Spaces) לפי נושא, ויש App Finder שמראה את כל האפליקציות הזמינות. לוחצים על אריח (tile) ונכנסים לכלי. אם לא יודעים איפה משהו — מחפשים בשורת-החיפוש.",
          consultantHe:
            "המבנה: Spaces מכילים Pages, ו-Pages מכילים Sections של tiles/cards. ה-App Finder מציג את כל ה-apps שהוקצו ל-role של המשתמש. ב-IBP-context האריחים מצביעים ל-SAP IBP apps (Planning, Analytics, Dashboards). ה-roles ב-Work Zone קובעים אילו Spaces/Pages גלויים; חיפוש גלובלי (Enterprise Search) ופריטים-מועדפים מאיצים גישה.",
          purposeHe:
            "לוודא שכל בעל-תפקיד מגיע מהר אל הכלים והחריגים שלו, בלי לטבוע בתוכן לא-רלוונטי. ניווט הוא חוויית-המשתמש שמכריעה אם תהליך-ה-S&OP מאומץ בפועל.",
          processExampleHe:
            "מתכנן-ביקוש נכנס למרחב, רואה Space בשם 'Demand', בתוכו Page עם אריחי תצוגות-תכנון ולוח-מחוונים. הוא לוחץ על האריח 'Open Alerts', נכנס לרשימת-החריגים שלו, ומשם קופץ לתצוגה הרלוונטית — שלוש קליקים מהבוקר לפעולה.",
          cbcHe:
            "ב-CBC כל אזור-בקבוק מקבל Space משלו ('North', 'South'), ובתוכו Pages לפי תפקיד; מנהל-קו-מילוי רואה רק את אריחי-הקיבולת והחריגים של הקו שלו, ומנהל-המכירות רואה את תצוגות-הביקוש.",
          navHe: [
            "SAP Build Work Zone ► Home ► Spaces ► Pages",
            "SAP Build Work Zone ► App Finder (כל ה-apps שהוקצו)",
            "SAP Build Work Zone ► Search (Enterprise Search) / Favorites",
          ],
          tables: [],
          tcodes: [],
          fiori: ["SAP Build Work Zone", "App Finder", "SAP IBP web UI"],
          configHe: [
            "Spaces & Pages: הגדרת מבנה-ניווט והקצאתו ל-roles (כל role רואה את ה-Spaces הרלוונטיים).",
            "Tiles/Cards: הוספת אריחים המצביעים ל-SAP IBP apps עם targets/parameters נכונים.",
            "Search & Favorites: הפעלת חיפוש-גלובלי וקיבוע פריטים-מועדפים למשתמש.",
          ],
          flow: [
            { he: "עמוד-בית", code: "Home" },
            { he: "בחירת Space", code: "Space", note: "לפי תפקיד/אזור" },
            { he: "Page עם אריחים", code: "Page" },
            { he: "כניסה לאפליקציה", code: "Tile → IBP" },
          ],
          mistakesHe: [
            "עמוד-בית עמוס בעשרות אריחים ללא Spaces — המשתמש לא מוצא דבר.",
            "אריחים המצביעים ל-target שגוי ב-IBP — שגיאת-ניווט בלחיצה.",
            "אי-הקצאת Spaces ל-roles — משתמשים רואים תוכן לא-רלוונטי או ריק.",
          ],
          troubleshootHe: [
            "אריח לא נפתח / שגיאה ➔ target/parameter ב-IBP שגוי או חסרות הרשאות-app.",
            "Space לא מופיע למשתמש ➔ לא הוקצה ל-role שלו.",
            "חיפוש לא מחזיר תוצאות ➔ Enterprise Search לא הופעל או לא הוגדר indexing.",
          ],
          bestPracticeHe: [
            "ארגן Spaces לפי תהליך/תפקיד, לא לפי מחלקה-טכנית.",
            "מקם את אריחי-החריגים בראש העמוד — חריגים קודמים לכל.",
            "הגבל מספר-אריחים פר-Page לשמירת מיקוד.",
          ],
          interviewHe: [
            { qHe: "מהם Spaces ו-Pages ב-SAP Build Work Zone?", aHe: "Spaces הם 'מגירות' נושאיות המכילות Pages, וכל Page מכיל Sections של אריחים/cards; הם נשלטים דרך roles ומגדירים מה כל משתמש רואה." },
            { qHe: "כיצד משתמש מגיע מהר לכלי הנכון?", aHe: "דרך App Finder, חיפוש-גלובלי ופריטים-מועדפים, ובעיקר דרך Spaces/Pages הממוקדים-תפקיד שמציגים את האריחים הרלוונטיים בלבד." },
          ],
          takeawaysHe: [
            "הניווט בנוי משכבות: Spaces → Pages → Tiles/Cards.",
            "roles קובעים מה כל משתמש רואה.",
            "ניווט ממוקד-תפקיד מקצר מ'התראה' ל'פעולה'.",
          ],
          relatedHe: [
            { labelHe: "S&OP · אינטגרציית SAP IBP (7.1.2)", href: "/library/sop/chapter-07/#sub-7.1.2" },
          ],
        },
        {
          id: "7.1.2",
          titleHe: "אינטגרציית SAP IBP",
          titleEn: "SAP IBP Integration",
          execHe:
            "אינטגרציית SAP IBP אל SAP Build Work Zone היא מה שהופך את המרחב-הדיגיטלי לכלי-תכנון פעיל: אפליקציות התכנון, האנליטיקה ולוחות-המחוונים של IBP מוטמעות ונגישות מתוך המרחב, עם הזדהות-אחת והרשאות-עקביות. זהו הגשר בין שכבת-שיתוף-הפעולה לשכבת-התכנון.",
          beginnerHe:
            "כדי שה'אתר-הבית' (Work Zone) יהיה שימושי, צריך לחבר אליו את הכלי האמיתי — SAP IBP. אחרי החיבור, לחיצה על אריח פותחת ישר את אפליקציית-התכנון של IBP, באותה כניסה ובלי סיסמה נוספת. כך עוברים חלק מ'מקום-המפגש' אל 'מקום-העבודה'.",
          consultantHe:
            "האינטגרציה נשענת על שלושה רכיבים: (1) SSO — trust בין IAS/IdP ל-IBP ול-Work Zone; (2) App exposure — רישום SAP IBP apps (web UI, Analytics, Dashboards) כ-content במרחב עם targets ו-deep-links; (3) הרשאות — business roles ב-IBP חייבים להלום את ה-roles ב-Work Zone. SAP IBP הוא cloud (SaaS), כך שהחיבור הוא service-to-service דרך BTP/IAS, ללא on-premise gateway. ה-OData/REST של IBP משמש גם cards ו-KPIs.",
          purposeHe:
            "לאפשר תכנון אמיתי בתוך מרחב-שיתוף-הפעולה — לא רק לקרוא דיווחים אלא לפתוח תצוגות, לערוך מספרים ולהריץ תרחישים, מתוך עמוד אחד עם זהות אחת והרשאות אחת.",
          processExampleHe:
            "מתכנן-היצע לוחץ על אריח 'Supply Planning' במרחב; ה-SSO מעביר אותו ל-SAP IBP web UI כשהוא כבר מזוהה; הוא פותח תצוגה, מריץ תרחיש, ושומר — ואז חוזר ל-Work Zone לפתוח דיון על התוצאה. אותה זהות, אותן הרשאות, חוויה אחת.",
          cbcHe:
            "ב-CBC אינטגרציית IBP מאפשרת למנהל-S&OP לפתוח מ-Work Zone את תצוגת-איזון-ההיצע-ביקוש של כל קווי-המילוי בענן, להריץ תרחיש-מבצע, ולשתף את התוצאה עם המכירות — הכל בזרימה אחת.",
          navHe: [
            "SAP BTP Cockpit ► Destinations / Trust ► SAP IBP (service-to-service)",
            "SAP Cloud Identity Services – IAS ► Applications ► SAP IBP + Work Zone (SSO)",
            "SAP Build Work Zone ► Content Manager ► Add SAP IBP apps (deep-links)",
            "SAP IBP ► Web Client ► Roles & Authorizations",
          ],
          tables: [],
          tcodes: [],
          fiori: ["SAP IBP web UI", "SAP IBP Analytics", "SAP IBP Dashboards", "SAP Build Work Zone"],
          configHe: [
            "Trust/SSO: הקמת trust בין IAS ל-IBP ול-Work Zone כך שכניסה אחת תקפה לשניהם.",
            "App exposure: רישום SAP IBP apps כ-content במרחב עם targets/deep-links נכונים.",
            "Role alignment: התאמת business roles ב-IBP ל-roles/groups ב-Work Zone.",
            "Cards/KPIs: שימוש ב-OData/REST של IBP להזנת cards ולוחות-מחוונים.",
          ],
          flow: [
            { he: "הקמת trust + SSO", code: "IAS" },
            { he: "רישום IBP apps", code: "Content Manager" },
            { he: "התאמת הרשאות", code: "Roles" },
            { he: "פתיחת תצוגה מהמרחב", code: "Tile → IBP" },
          ],
          mistakesHe: [
            "trust/SSO חלקי — האריח מעביר ל-IBP אך דורש כניסה נוספת.",
            "deep-link ל-app שגוי או חסר parameter — המשתמש נוחת בעמוד כללי במקום בתצוגה.",
            "אי-התאמת roles בין IBP ל-Work Zone — הרשאות סותרות וגישה חסומה.",
          ],
          troubleshootHe: [
            "שגיאת-הרשאה בכניסה ל-IBP מהמרחב ➔ trust/SSO לא תקין או business role חסר ב-IBP.",
            "האריח נפתח אך לתצוגה לא-נכונה ➔ deep-link/target שגוי.",
            "card לא מציג נתוני-IBP ➔ OData/REST endpoint או הרשאת-קריאה חסרים.",
          ],
          bestPracticeHe: [
            "הגדר SSO תחילה ובדוק כניסה מקצה-לקצה לפני הוספת תוכן.",
            "השתמש ב-deep-links ממוקדים שמובילים ישירות לתצוגה/תפקיד.",
            "נהל מטריצת-הרשאות אחת שמסונכרנת בין IBP ל-Work Zone.",
          ],
          interviewHe: [
            { qHe: "מה נדרש כדי לחבר SAP IBP ל-SAP Build Work Zone?", aHe: "SSO/trust מבוסס IAS, רישום ה-IBP apps כ-content עם deep-links, והתאמת business roles בין IBP ל-Work Zone." },
            { qHe: "מדוע אין צורך ב-gateway on-premise בחיבור הזה?", aHe: "כי SAP IBP הוא cloud (SaaS); החיבור הוא service-to-service דרך SAP BTP/IAS, ללא רכיב מקומי." },
          ],
          takeawaysHe: [
            "האינטגרציה הופכת את Work Zone מ'מקום-מפגש' ל'מקום-עבודה'.",
            "שלושת היסודות: SSO, app exposure, role alignment.",
            "IBP הוא cloud — החיבור הוא service-to-service דרך BTP/IAS.",
          ],
          relatedHe: [
            { labelHe: "S&OP · אינטגרציית Excel (7.1.3)", href: "/library/sop/chapter-07/#sub-7.1.3" },
          ],
        },
        {
          id: "7.1.3",
          titleHe: "אינטגרציית תצוגת-תכנון ב-Excel",
          titleEn: "Excel Planning View Integration",
          execHe:
            "ה-SAP IBP Excel Add-in מביא את כוח-התכנון של IBP אל הסביבה המוכרת ביותר למתכננים — Microsoft Excel. במקום ללמד מתכננים כלי חדש, IBP מאפשר להם לעבוד בתצוגות-תכנון (Planning Views) בתוך Excel, כשהנתונים מתחברים live לענן. כך מתחברת שכבת-שיתוף-הפעולה לכלי היומיומי, והאימוץ מואץ.",
          beginnerHe:
            "מתכננים אוהבים Excel. SAP IBP נותן תוסף (Add-in) ל-Excel: פותחים אקסל, מתחברים ל-IBP בענן, ומושכים תצוגת-תכנון — מספרי-ביקוש, היצע, מלאי — לתוך גיליון רגיל. עורכים מספרים, לוחצים 'Save', והכל נשמר בחזרה ל-IBP. זה Excel, אבל מחובר לאמת-אחת בענן.",
          consultantHe:
            "ה-IBP Excel Add-in מתחבר ל-IBP cloud דרך OData/HTTPS עם אותו SSO. תצוגת-תכנון מוגדרת על Planning Level, Key Figures, Attributes, Filters ו-Time Settings, ונשמרת כ-Favorite/Template. עריכות נכתבות חזרה (write-back) ועוברות disaggregation לפי כללי-הזמן/המוצר. ה-Add-in תומך ב-Templates משותפים, ב-Charts וב-Analytics, וכפוף לאותן הרשאות-Key-Figure כמו ה-web UI. הפצת ה-Add-in וקבצי-התבנית נעשית לרוב דרך SAP Build Work Zone.",
          purposeHe:
            "להוריד את מחסום-האימוץ: לתת למתכננים לעבוד בכלי שהם שולטים בו, תוך שמירה על אמת-נתונים יחידה בענן. כך משלבים גמישות-אקסל עם ממשל-נתונים מרכזי.",
          processExampleHe:
            "מתכנן-ביקוש פותח template של תצוגת-ביקוש ב-Excel דרך ה-Add-in, מתחבר ל-IBP, מושך 18 חודשי-תחזית, מתקן ידנית חודש-מבצע, לוחץ Save — ה-write-back מפיץ את התיקון ברמת-המוצר/הזמן, וכל מי שפותח את אותה תצוגה ב-web UI רואה מיד את המספר המעודכן.",
          cbcHe:
            "ב-CBC מתכנני-המכירות האזוריים עובדים בתבניות-Excel אחידות שהופצו דרך Work Zone; הם מזינים תחזית-מבצעים לכל SKU, וה-write-back מאחד את כולם לתוכנית-ביקוש אחת ב-IBP cloud — בלי לשלוח גיליונות במייל.",
          navHe: [
            "Microsoft Excel ► SAP IBP (ribbon) ► Log On (SSO ל-IBP cloud)",
            "SAP IBP (ribbon) ► New / Open Planning View (Favorites / Templates)",
            "SAP IBP (ribbon) ► Edit View (Key Figures / Attributes / Filters / Time)",
            "SAP IBP (ribbon) ► Save Data (write-back) / Simulate / Charts",
          ],
          tables: [],
          tcodes: [],
          fiori: ["SAP IBP Excel Add-in", "SAP IBP web UI", "SAP Build Work Zone"],
          configHe: [
            "Add-in deployment: התקנת/הפצת ה-SAP IBP Add-in for Microsoft Excel (לרוב דרך Work Zone).",
            "Planning View: הגדרת Planning Level, Key Figures, Attributes, Filters ו-Time Settings; שמירה כ-Favorite/Template.",
            "Templates: יצירת תבניות-Excel משותפות והפצתן לצוות.",
            "Authorizations: אותן הרשאות-Key-Figure וגישת-נתונים כמו ב-web UI.",
          ],
          flow: [
            { he: "כניסה מ-Excel", code: "Log On", note: "SSO ל-cloud" },
            { he: "פתיחת תצוגה/תבנית", code: "Planning View" },
            { he: "עריכת מספרים", code: "Edit" },
            { he: "שמירה לענן", code: "Save", note: "write-back + disaggregation" },
            { he: "נראות משותפת", code: "web UI" },
          ],
          masterDataHe: [
            "Planning View נשענת על Planning Level, Key Figures, Attributes ו-Time Profile של מודל-התכנון.",
            "write-back כפוף לכללי-Disaggregation (לפי Key Figure / Time / Product).",
          ],
          mistakesHe: [
            "עבודה בגיליונות מקומיים מנותקים במקום בתצוגות-מחוברות — חוזר ל'גרסאות-צל'.",
            "עריכה ברמת-aggregation לא-נכונה — disaggregation מפיץ ערכים לא-צפויים.",
            "שכחת Save Data — העריכות נשארות מקומיות ולא מגיעות ל-IBP.",
          ],
          troubleshootHe: [
            "Add-in לא מתחבר ➔ SSO/credentials או גרסת-Add-in לא תואמת ל-IBP.",
            "ערכים 'קופצים' אחרי Save ➔ disaggregation לפי כלל לא-צפוי; בדוק את ה-Key Figure calculation.",
            "תצוגה ריקה ➔ Filters/Time Settings מצמצמים מדי או חסרה הרשאת-Key-Figure.",
          ],
          bestPracticeHe: [
            "הפץ תבניות-Excel אחידות דרך Work Zone במקום שכל אחד יבנה משלו.",
            "ערוך ברמת-ה-aggregation הנכונה והבן את כללי-ה-disaggregation לפני שמירה.",
            "שמור Favorites ממוקדי-תפקיד והגבל Key Figures לרלוונטיים.",
          ],
          interviewHe: [
            { qHe: "מהי תצוגת-תכנון ב-Excel ב-SAP IBP?", aHe: "תצוגה מבוססת ה-Excel Add-in המחוברת live ל-IBP cloud, מוגדרת על Planning Level/Key Figures/Filters/Time; עריכות נשמרות ב-write-back עם disaggregation." },
            { qHe: "מדוע ה-Excel Add-in חשוב לאימוץ?", aHe: "כי הוא נותן למתכננים לעבוד בכלי המוכר (Excel) תוך שמירה על אמת-נתונים יחידה בענן — מוריד מחסום-אימוץ ושומר ממשל-נתונים." },
          ],
          takeawaysHe: [
            "ה-IBP Excel Add-in מביא תצוגות-תכנון לתוך Excel, מחובר live לענן.",
            "עריכות נכתבות חזרה (write-back) עם disaggregation.",
            "תבניות משותפות (דרך Work Zone) שומרות אחידות ואמת-אחת.",
          ],
          relatedHe: [
            { labelHe: "S&OP · ניווט (7.1.1)", href: "/library/sop/chapter-07/#sub-7.1.1" },
          ],
        },
      ],
    },
    // ============================================================ 7.2
    {
      id: "7.2",
      titleHe: "התראות מותאמות (Custom Alerts)",
      titleEn: "Custom Alerts",
      execHe:
        "Custom Alerts הן הלב של 'ניהול-לפי-חריגים' ב-SAP IBP. במקום שמתכנן יסרוק אלפי שורות, המערכת בודקת רעיונית כל שילוב-תכנון מול תנאי שהוגדר מראש (למשל 'מלאי מתחת לבטיחות' או 'תחזית סוטה ביותר מ-X%') ומתריעה רק על מה שחורג. כך מופנית תשומת-הלב המוגבלת של הצוות בדיוק למקומות הדורשים החלטה.",
      beginnerHe:
        "דמיין נורת-אזהרה ברכב: היא נדלקת רק כשמשהו לא בסדר — לא צריך לבדוק כל מד בעצמך. Custom Alert היא נורה כזו על נתוני-התכנון: אתה מגדיר מתי 'לדלוק' (איזה תנאי), והמערכת מסמנת לך רק את הפריטים החריגים. זה חוסך שעות של 'חיפוש מחט בערימה'.",
      consultantHe:
        "Custom Alert מוגדרת על Planning Area: בוחרים Key Figures, מגדירים תנאי (operators/thresholds), Planning Level (רמת-הצבירה לבדיקה), Time horizon ו-Severity (High/Medium/Low). ה-Alert רץ כ-batch (Application Job) או on-demand, וכותב מופעי-חריגה ל-Alert subscriptions של המשתמשים. ניתן לקבץ alerts ל-Alert Overview, לחבר ל-Dashboards/Cards, ולעבור מ-Alert ישירות לתצוגה הרלוונטית (drill-to-context). הרשאות נשלטות לפי planning-area authorization.",
      purposeHe:
        "להפוך תכנון מ-'תגובתי ויסודי-מדי' ל-'ממוקד-חריגים'. בארגון עם עשרות-אלפי שילובי-תכנון, רק מודל-חריגים מאפשר לצוות-קטן לנהל תיק-תכנון גדול ולהגיב מהר לסטיות.",
      processExampleHe:
        "מוגדרת Alert: 'Projected Stock < Safety Stock בתוך 4 שבועות' ברמת-Product/Location. ה-batch מריץ בלילה, ובבוקר המתכנן רואה 12 חריגים ב-Alert Overview. הוא פותח את החמור ביותר, drill-to-context לתצוגת-התכנון, מזהה איחור-אספקה, ומפעיל פעולה — בלי לסרוק את שאר אלפי הפריטים התקינים.",
      cbcHe:
        "ב-CBC מוגדרות Alerts ל'מלאי-מוגמר מתחת לבטיחות לפני סוף-שבוע', 'קיבולת-קו-מילוי מעל 95%' ו'סטיית-תחזית-מבצע > 20%'. בעונת-השיא מנהל-S&OP מנהל את כל ה-portfolio דרך מסך-החריגים בלבד — כל פריט שאינו חריג פשוט אינו דורש מבט.",
      navHe: [
        "SAP IBP ► Custom Alerts (web UI) ► Define Custom Alerts",
        "SAP IBP ► Custom Alerts ► Alert Overview / My Alerts",
        "SAP IBP ► Application Jobs ► Calculate Custom Alerts (batch)",
        "SAP IBP ► Dashboards ► Alert Card (drill-to-context)",
      ],
      tables: [],
      tcodes: [],
      fiori: ["Custom Alerts", "Alert Overview", "SAP IBP Dashboards", "Application Jobs"],
      configHe: [
        "Definition: בחירת Planning Area, Key Figures ותנאי (operator/threshold) ל-alert.",
        "Scope: Planning Level (רמת-בדיקה), Time horizon ו-Filters לתחום-הבדיקה.",
        "Severity: סיווג High/Medium/Low לתעדוף בעין.",
        "Execution & subscription: הרצה כ-Application Job או on-demand, והקצאת ה-alert למשתמשים/roles.",
      ],
      flow: [
        { he: "הגדרת תנאי", code: "Define", note: "Key Figure + threshold" },
        { he: "קביעת רמה + אופק", code: "Level/Time" },
        { he: "הרצה", code: "Job", note: "batch / on-demand" },
        { he: "מסך-חריגים", code: "Alert Overview" },
        { he: "צלילה לתצוגה", code: "drill-to-context" },
      ],
      mistakesHe: [
        "ספי-התראה רגישים מדי — 'הצפת-התראות' שגורמת להתעלמות (alert fatigue).",
        "Planning Level שגוי — חריג נבדק ברמת-צבירה לא-נכונה ומפספס/מזייף.",
        "אי-הקצאת ה-alert למשתמשים — מוגדרת אך אף אחד לא רואה אותה.",
      ],
      troubleshootHe: [
        "אין התראות כלל ➔ ה-Application Job לא רץ, או התנאי/הספים לעולם לא מתקיימים.",
        "יותר מדי התראות ➔ ספים רגישים מדי או Planning Level נמוך מדי.",
        "המשתמש לא רואה alert קיימת ➔ חסרה subscription/הרשאת-planning-area.",
      ],
      bestPracticeHe: [
        "כייל ספים לפי כאב-עסקי אמיתי, לא 'כל סטייה'.",
        "השתמש ב-Severity ובקיבוץ כדי לתעדף ולמנוע הצפה.",
        "הפעל drill-to-context כך שכל alert מובילה ישר לפעולה.",
      ],
      interviewHe: [
        { qHe: "מהן Custom Alerts ב-SAP IBP?", aHe: "הגדרות-חריגה על Planning Area הבודקות Key Figures מול תנאי וסף ומתריעות רק על שילובי-תכנון החורגים — הבסיס לניהול-לפי-חריגים." },
        { qHe: "כיצד נמנעים מ'הצפת-התראות'?", aHe: "על-ידי כיול-ספים לפי כאב-עסקי, שימוש ב-Severity וקיבוץ, ובחירת Planning Level נכון — כך שרק חריגים משמעותיים מסומנים." },
      ],
      takeawaysHe: [
        "Custom Alerts = מנוע 'ניהול-לפי-חריגים' של IBP.",
        "מגדירים תנאי/סף על Key Figures ברמה ובאופק שנבחרו.",
        "כיול-ספים נכון מונע הצפה ושומר את ההתראות שימושיות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · SAP Build Work Zone (7.1)", href: "/library/sop/chapter-07/#sub-7.1" },
        { labelHe: "S&OP · ניהול מקרים (7.3)", href: "/library/sop/chapter-07/#sub-7.3" },
        { labelHe: "S&OP · משימות (7.4)", href: "/library/sop/chapter-07/#sub-7.4" },
      ],
      children: [
        {
          id: "7.2.1",
          titleHe: "אפליקציות SAP Fiori",
          titleEn: "SAP Fiori Applications",
          execHe:
            "ניהול-החריגים ב-IBP נחשף דרך אפליקציות בסגנון SAP Fiori — Custom Alerts, Alert Overview, Dashboards ו-Application Jobs. אפליקציות אלו מספקות חוויה אחידה, מבוססת-תפקיד וריאקטיבית, שבה מגדירים התראות, רואים אותן מרוכזות, וצוללים מהן ישירות לפעולה.",
          beginnerHe:
            "אלו ה'מסכים' שדרכם עובדים עם התראות: מסך אחד להגדיר התראה, מסך אחד לראות את כל ההתראות שלך, ולוח-מחוונים שמציג אותן בגרפים. כולם בסגנון Fiori — נקי, אחיד, ומותאם למה שהתפקיד שלך צריך.",
          consultantHe:
            "ב-IBP web UI האפליקציות בנויות בשפת SAP Fiori ומשתלבות ב-Launchpad / SAP Build Work Zone. 'Define Custom Alerts' להגדרה, 'Alert Overview'/'My Alerts' לצריכה, 'Dashboards' ל-Alert Cards עם drill-to-context, ו'Application Jobs' לתזמון חישוב-ההתראות. כולן כפופות ל-business roles ול-planning-area authorizations, ונגישות גם דרך ה-Excel Add-in (לתצוגות) במידת-הצורך.",
          purposeHe:
            "לתת לכל בעל-תפקיד את הכלי הנכון לחריגים בחוויה אחידה — להגדיר, לצרוך ולפעול — מבלי ללמוד מסכים שונים לכל פעולה.",
          processExampleHe:
            "Admin מגדיר alert ב-'Define Custom Alerts'; הוא מתזמן חישוב ב-'Application Jobs'; המתכנן צורך ב-'Alert Overview' ורואה Alert Card ב-Dashboard; לחיצה צוללת לתצוגת-התכנון — מסך אחד מוביל לבא בזרימה אחידה.",
          cbcHe:
            "ב-CBC מנהלי-הקווים משתמשים ב-'My Alerts' לראות חריגי-קיבולת, ומנהל-S&OP ב-Dashboard עם Alert Cards אזוריות — אותה שפת-Fiori לכל התפקידים.",
          navHe: [
            "SAP IBP ► Apps ► Define Custom Alerts",
            "SAP IBP ► Apps ► Alert Overview / My Alerts",
            "SAP IBP ► Apps ► Application Jobs (Calculate Custom Alerts)",
            "SAP IBP ► Apps ► Dashboards (Alert Cards)",
          ],
          tables: [],
          tcodes: [],
          fiori: ["Define Custom Alerts", "Alert Overview", "My Alerts", "Application Jobs", "SAP IBP Dashboards"],
          configHe: [
            "Role catalogs: שיוך אפליקציות-ההתראות ל-business roles (Admin מול Planner).",
            "Launchpad/Work Zone: חשיפת האפליקציות כ-tiles/cards במרחב.",
            "Jobs: הגדרת Application Job לחישוב-התראות וקביעת תדירות.",
          ],
          flow: [
            { he: "הגדרה", code: "Define Custom Alerts" },
            { he: "תזמון חישוב", code: "Application Jobs" },
            { he: "צריכה", code: "Alert Overview" },
            { he: "תצוגה גרפית", code: "Dashboards" },
          ],
          mistakesHe: [
            "חשיפת אפליקציית-ההגדרה למתכננים רגילים — שינויי-תצורה לא-מבוקרים.",
            "אי-תזמון Application Job — האפליקציות קיימות אך ההתראות לא מחושבות.",
            "ערבוב catalogs בין תפקידים — משתמש רואה מסכים שאינם שלו.",
          ],
          troubleshootHe: [
            "אפליקציה לא מופיעה ל-role ➔ catalog/role assignment חסר.",
            "Alert Overview ריק ➔ Application Job לא רץ או אין חריגים.",
            "Dashboard card ריק ➔ ה-card לא חובר ל-alert/Key Figure.",
          ],
          bestPracticeHe: [
            "הפרד catalog-הגדרה (Admin) מ-catalog-צריכה (Planner).",
            "חשוף את האפליקציות כ-cards ב-Work Zone למסע-משתמש אחד.",
            "תזמן Application Jobs לפני שעות-העבודה כדי שההתראות מוכנות בבוקר.",
          ],
          interviewHe: [
            { qHe: "אילו אפליקציות SAP Fiori משרתות ניהול-חריגים ב-IBP?", aHe: "Define Custom Alerts (הגדרה), Alert Overview / My Alerts (צריכה), Application Jobs (חישוב מתוזמן) ו-Dashboards עם Alert Cards (תצוגה + drill-to-context)." },
            { qHe: "מי אמור לגשת לאפליקציית 'Define Custom Alerts'?", aHe: "בעיקר Admin/key-user; מתכננים רגילים מקבלים catalog-צריכה (Alert Overview/My Alerts) כדי למנוע שינויי-תצורה לא-מבוקרים." },
          ],
          takeawaysHe: [
            "ניהול-חריגים נחשף דרך אפליקציות בסגנון SAP Fiori.",
            "הגדרה / צריכה / חישוב / תצוגה — כל אחת באפליקציה ייעודית.",
            "הכל כפוף ל-business roles ומשתלב ב-Work Zone.",
          ],
        },
        {
          id: "7.2.2",
          titleHe: "שימוש בהתראות מותאמות",
          titleEn: "Using Custom Alerts",
          execHe:
            "שימוש ב-Custom Alerts הוא שגרת-העבודה היומית של המתכנן: לפתוח את מסך-החריגים, לתעדף לפי Severity, לצלול מכל חריג ישירות לתצוגה הרלוונטית, לפעול, ולסמן טיפול. זהו ההבדל בין 'נתונים' ל'ניהול' — ההתראה הופכת לפעולה.",
          beginnerHe:
            "אחרי שההתראות מוגדרות, ככה עובדים איתן: פותחים את רשימת-ההתראות שלי, מסתכלים על האדומות (החמורות) קודם, לוחצים על אחת — וזה לוקח אותך ישר למקום בנתונים שצריך לתקן. מתקנים, ומסמנים שטיפלת. זהו 'ניהול-לפי-חריגים' בפעולה.",
          consultantHe:
            "תהליך-העבודה: סינון ומיון לפי Severity/Planning Level/Time; drill-to-context מ-alert לתצוגת-תכנון (web UI או Excel) עם ה-filter המתאים כבר מוחל; ביצוע פעולת-תכנון; ומעקב — סימון/הסתרה של חריגים שטופלו. ה-alerts מתעדכנות בהרצה הבאה של ה-Application Job. ניתן לצרוך אותן גם כ-Alert Cards ב-Dashboards וב-Work Zone. כאשר חריג דורש דיון או החלטה מורכבת — מנתבים אותו ל-Case Management; כאשר הוא דורש מעקב-פעולה מוקצה — ל-Task.",
          purposeHe:
            "להפוך את החריג מ'תצפית' ל'תוצאה': לקצר את הזמן מזיהוי-סטייה ועד תיקון-תכנון, ולוודא שאף חריג משמעותי לא נופל בין הכיסאות.",
          processExampleHe:
            "בבוקר המתכנן פותח 'My Alerts', ממיין לפי High, רואה 'מלאי < בטיחות' ל-SKU מוביל, צולל לתצוגה (ה-filter כבר על אותו SKU/Location), מזהה הזמנת-רכש מאחרת, מקדים אותה, ומסמן טופל. חריג מורכב יותר — 'פער-קיבולת קבוע בקו' — הוא מנתב ל-Case לדיון רב-משתתפים.",
          cbcHe:
            "ב-CBC בעונת-השיא מנהל-S&OP פותח את מסך-החריגים פעמיים ביום: כל 'קיבולת > 95%' שמופיעה מנותבת או למשימה (להזיז ייצור לקו אחר) או ל-Case (אם דורשת החלטה בין-מחלקתית), וכל מלאי-בטיחות חורג מטופל מיד.",
          navHe: [
            "SAP IBP ► My Alerts / Alert Overview ► Filter/Sort by Severity",
            "SAP IBP ► Alert ► Open in Planning View (drill-to-context)",
            "SAP IBP ► Dashboards ► Alert Card",
            "SAP IBP ► Alert ► Create Case / Create Task (ניתוב)",
          ],
          tables: [],
          tcodes: [],
          fiori: ["My Alerts", "Alert Overview", "SAP IBP Dashboards", "Manage Cases", "Tasks"],
          configHe: [
            "Subscriptions: ודא שכל משתמש מנוי על ה-alerts הרלוונטיים לתפקידו.",
            "Drill-to-context: קישור ה-alert לתצוגת-תכנון יעד עם filters אוטומטיים.",
            "Routing: אפשרות ליצור Case או Task מתוך alert לחריגים הדורשים דיון/מעקב.",
          ],
          flow: [
            { he: "פתיחת חריגים", code: "My Alerts" },
            { he: "תעדוף", code: "Severity" },
            { he: "צלילה לתצוגה", code: "drill-to-context" },
            { he: "פעולת-תכנון", code: "Planning View" },
            { he: "ניתוב/סגירה", code: "Case / Task", note: "alert → case → task" },
          ],
          mistakesHe: [
            "טיפול לפי סדר-הופעה במקום לפי Severity — חריגים חמורים ממתינים.",
            "אי-ניתוב חריגים מורכבים ל-Case/Task — הם 'נופלים' ולא נסגרים.",
            "התעלמות מהצפת-התראות במקום לכייל את ההגדרה — אובדן-אמון בכלי.",
          ],
          troubleshootHe: [
            "drill-to-context פותח תצוגה בלי filter ➔ קישור-היעד לא מעביר את ה-context.",
            "חריג שטופל חוזר ➔ הבעיה התכנונית לא נפתרה, או ה-Job עדיין רואה את הסטייה.",
            "אין אפשרות ליצור Case/Task מ-alert ➔ חסרה הרשאה ל-Manage Cases / Tasks.",
          ],
          bestPracticeHe: [
            "עבוד תמיד מהחמור לקל (Severity-first).",
            "נתב חריג מורכב ל-Case ומעקב-פעולה ל-Task — אל תשאיר 'תלוי'.",
            "סגור את הלולאה: סמן טופל ואמת בהרצת-ה-Job הבאה שהחריג נעלם.",
          ],
          interviewHe: [
            { qHe: "כיצד מתכנן עובד עם Custom Alerts ביום-יום?", aHe: "פותח מסך-חריגים, מתעדף לפי Severity, צולל מכל חריג לתצוגה (drill-to-context), מבצע פעולת-תכנון, ומנתב חריגים מורכבים ל-Case או מעקב ל-Task." },
            { qHe: "מתי מנתבים חריג ל-Case לעומת Task?", aHe: "ל-Case כשנדרשים דיון/החלטה רב-משתתפים סביב נושא; ל-Task כשנדרשת פעולה מוקצית עם מעקב-ביצוע — לעיתים alert→case→task ברצף." },
          ],
          takeawaysHe: [
            "שימוש = תעדוף לפי Severity, drill-to-context, פעולה וסגירה.",
            "חריג מורכב מנותב ל-Case; פעולה מוקצית ל-Task.",
            "ההתראה הופכת מ'תצפית' ל'תוצאה' — זה ניהול-לפי-חריגים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · ניהול מקרים (7.3)", href: "/library/sop/chapter-07/#sub-7.3" },
            { labelHe: "S&OP · משימות (7.4)", href: "/library/sop/chapter-07/#sub-7.4" },
          ],
        },
        {
          id: "7.2.3",
          titleHe: "הגדרת התראות מותאמות",
          titleEn: "Configuring Custom Alerts",
          execHe:
            "הגדרת Custom Alert היא צעד-הקונפיגורציה שמתרגם 'כלל-עסקי' ל'התראה-מערכתית': בוחרים Planning Area ו-Key Figures, מנסחים תנאי (operator + threshold), קובעים Planning Level, אופק-זמן, Severity ו-scope, ומתזמנים חישוב. הגדרה מדויקת = התראות שימושיות; הגדרה רשלנית = רעש או שתיקה.",
          beginnerHe:
            "כדי 'ללמד' את המערכת מתי להתריע, ממלאים טופס: על איזה מודל (Planning Area), איזה מספר (Key Figure), מה התנאי (קטן-מ / גדול-מ וכמה), על איזו רמה (מוצר? מחסן?), לאיזה טווח-זמן, ובאיזו חומרה. בסוף קובעים מתי לחשב (לרוב כל לילה). זהו 'מתכון' להתראה.",
          consultantHe:
            "ב-'Define Custom Alerts': בחירת Planning Area, Key Figure(s) ו-comparison (לדוגמה KF-A < KF-B, או KF > constant). קביעת Planning Level (רמת-הצבירה לבדיקה — קריטית לדיוק), Time periods/horizon, Filters (scope), Severity ו-naming. ההתראה מחושבת ב-Application Job ('Calculate Custom Alerts') ב-batch או on-demand, ונשמרת למנויים. ניתן להגדיר alerts מבוססות-נוסחה (calculated Key Figures) ו-thresholds דינמיים. הכל כפוף ל-planning-area authorization, וניתן לחשוף כ-Alert Card ב-Dashboards/Work Zone.",
          purposeHe:
            "לתרגם את ה'מה חשוב לנו' העסקי לכלל-מערכתי מדיד, כך שהמערכת תשמור על ה-portfolio במקום האדם — ותפנה את האדם רק לחריגים.",
          processExampleHe:
            "Admin מגדיר alert: Planning Area = SOP1, KF = Projected Stock, תנאי = '< Safety Stock', Level = Product/Location, אופק = 8 שבועות, Severity = High. הוא מתזמן Application Job יומי 05:00. למחרת בבוקר המנויים רואים את החריגים מחושבים ומוכנים.",
          cbcHe:
            "ב-CBC ה-key-user מגדיר שלוש Alerts: מלאי-מוגמר < בטיחות (High), ניצולת-קו > 95% (Medium), סטיית-תחזית-מבצע > 20% (Low), כל אחת ברמת-הצבירה הנכונה, ומתזמן חישוב-לילי לקראת ישיבת-ה-S&OP הבוקרת.",
          navHe: [
            "SAP IBP ► Define Custom Alerts ► New (Planning Area + Key Figures)",
            "SAP IBP ► Define Custom Alerts ► Condition (operator + threshold)",
            "SAP IBP ► Define Custom Alerts ► Planning Level / Time / Filters / Severity",
            "SAP IBP ► Application Jobs ► Calculate Custom Alerts (schedule)",
          ],
          tables: [],
          tcodes: [],
          fiori: ["Define Custom Alerts", "Application Jobs", "SAP IBP Dashboards"],
          configHe: [
            "Planning Area & Key Figures: בחירת המודל וה-Key Figures לבדיקה (כולל calculated KFs).",
            "Condition: operator (<, >, =, <>) מול constant או מול Key Figure אחר; threshold/בטיחות.",
            "Scope: Planning Level (רמת-בדיקה), Time horizon ו-Filters לתיחום.",
            "Severity & schedule: סיווג חומרה והקצאה ל-Application Job (batch/on-demand) + מנויים.",
          ],
          flow: [
            { he: "בחירת מודל + KF", code: "Planning Area" },
            { he: "ניסוח תנאי", code: "Condition", note: "operator + threshold" },
            { he: "רמה + אופק + scope", code: "Level/Time/Filter" },
            { he: "חומרה + מנויים", code: "Severity" },
            { he: "תזמון חישוב", code: "Application Job" },
          ],
          masterDataHe: [
            "ההתראה נשענת על Planning Area, Key Figures (כולל calculated) ו-Planning Levels של המודל.",
            "Time horizon נגזר מ-Time Profile של מודל-התכנון.",
          ],
          mistakesHe: [
            "Planning Level שגוי — בדיקה ברמת-צבירה לא-נכונה מייצרת חריגים-שקריים או מחמיצה אמיתיים.",
            "threshold קבוע במקום דינמי — לא מתאים למוצרים בעלי-פרופיל שונה.",
            "אי-תזמון Application Job — ההגדרה קיימת אך לעולם לא מחושבת.",
          ],
          troubleshootHe: [
            "ההתראה לא מחזירה תוצאות ➔ תנאי לעולם לא מתקיים, Level/Filter מצמצמים מדי, או ה-Job לא רץ.",
            "חריגים-שקריים ➔ Planning Level לא-נכון או threshold לא-מותאם.",
            "המנויים לא רואים ➔ subscription/role/planning-area authorization חסרים.",
          ],
          bestPracticeHe: [
            "התחל מ-Planning Level הנכון — הוא המכריע את דיוק-ההתראה.",
            "העדף thresholds דינמיים (מול Key Figure) על-פני קבועים גורפים.",
            "תזמן Application Job לפני שעות-העבודה ובדוק את התוצאות לפני הפצה רחבה.",
          ],
          interviewHe: [
            { qHe: "אילו רכיבים מגדירים ב-Custom Alert?", aHe: "Planning Area, Key Figures, תנאי (operator + threshold), Planning Level, אופק-זמן, Filters, Severity, ותזמון חישוב דרך Application Job." },
            { qHe: "מדוע Planning Level הוא ההחלטה הקריטית בהגדרה?", aHe: "כי רמת-הצבירה שבה נבדק התנאי קובעת אם החריג מזוהה נכון; רמה שגויה יוצרת חריגים-שקריים או מחמיצה חריגים אמיתיים." },
          ],
          takeawaysHe: [
            "הגדרה = מודל + Key Figures + תנאי + רמה + אופק + חומרה + תזמון.",
            "Planning Level הוא ההחלטה המכריעה לדיוק.",
            "החישוב רץ דרך Application Job (batch/on-demand) למנויים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · שימוש בהתראות (7.2.2)", href: "/library/sop/chapter-07/#sub-7.2.2" },
          ],
        },
      ],
    },
    // ============================================================ 7.3
    {
      id: "7.3",
      titleHe: "ניהול מקרים (Case Management)",
      titleEn: "Case Management",
      execHe:
        "Case Management ב-SAP IBP (אפליקציית Manage Cases) הוא המנגנון לטיפול בחריגים שאינם נפתרים בקליק-אחד אלא דורשים דיון, שיתוף-פעולה והחלטה. Case מאגד את ההקשר — תצוגות-תכנון, נתונים, משתתפים ושרשור-הדיון — לאובייקט-עבודה אחד שניתן לעקוב אחריו עד סגירה. זהו הגשר בין 'חריג זוהה' ל'החלטה התקבלה'.",
      beginnerHe:
        "לפעמים התראה לא נפתרת לבד — צריך לשבת עם כמה אנשים ולהחליט. Case הוא כמו 'תיק' לנושא כזה: הוא אוסף את כל המידע הרלוונטי, מצרף את האנשים, מנהל את הדיון ואת ההחלטה, ונשאר פתוח עד שהנושא נסגר. כך שום החלטה חשובה לא הולכת לאיבוד בשרשור-מיילים.",
      consultantHe:
        "Manage Cases מאפשר ליצור Case מתוך alert/Dashboard או ידנית, לצרף Planning Views/Snapshots, להוסיף participants, comments ו-attachments, ולנהל status (Open/In Process/Closed) ו-priority. Case שומר את ה-context (Planning Area, filters, נתונים בנקודת-זמן) כך שהדיון מתנהל סביב אותה אמת. ניתן לקשר Tasks ל-Case למעקב-פעולות. הרשאות לפי business role; Cases משתלבים ב-Work Zone ל-collaboration רחב. זהו השלב השני ברצף alert → case → task.",
      purposeHe:
        "לנהל החלטות-תכנון מורכבות בצורה מתועדת, משתפת ועקיבה — להבטיח שחריג מהותי מקבל דיון, בעלות וסגירה, עם תיעוד מלא לביקורת ולמידה.",
      processExampleHe:
        "חריג 'פער-קיבולת מתמשך בקו A' שלא נפתר בפעולה בודדת. המתכנן יוצר Case מה-alert, מצרף את תצוגת-הקיבולת, מתייג את מנהל-הייצור והרכש, ומנהל דיון בתוך ה-Case. ההחלטה: להעביר חלק מהייצור לקו B. נפתחות Tasks מתוך ה-Case, וכשבוצעו — ה-Case נסגר עם תיעוד-החלטה.",
      cbcHe:
        "ב-CBC כשמבצע-קיץ יוצר מחסור-קיבולת חוצה-אזורים, מנהל-S&OP פותח Case 'Summer peak capacity', מצרף את כל המעורבים (מכירות, ייצור, רכש) דרך Work Zone, ומנהל את ההחלטה הבין-אזורית — להזיז ייצור בין מפעלי-בקבוק — עם מעקב-משימות עד סגירה.",
      navHe: [
        "SAP IBP ► Manage Cases ► Create Case (מתוך alert / ידני)",
        "SAP IBP ► Manage Cases ► Attach Planning View / Participants / Comments",
        "SAP IBP ► Manage Cases ► Status & Priority (Open/In Process/Closed)",
        "SAP IBP ► Manage Cases ► Linked Tasks",
      ],
      tables: [],
      tcodes: [],
      fiori: ["Manage Cases", "Alert Overview", "Tasks", "SAP IBP Dashboards", "SAP Build Work Zone"],
      configHe: [
        "Authorizations: שיוך Manage Cases ל-business roles ולתחומי-תכנון.",
        "Case creation: אפשרות ליצירת Case מ-alert/Dashboard וקישור-context אוטומטי.",
        "Status & priority: הגדרת ערכי-סטטוס ועדיפות לניהול מחזור-חיי ה-Case.",
        "Integration: חשיפת Cases ב-Work Zone וקישור Tasks למעקב-פעולות.",
      ],
      flow: [
        { he: "חריג מורכב", code: "Alert", note: "alert → case" },
        { he: "פתיחת תיק", code: "Create Case" },
        { he: "צירוף context + אנשים", code: "Attach / Participants" },
        { he: "דיון + החלטה", code: "Comments" },
        { he: "פעולות מעקב", code: "Tasks", note: "case → task" },
        { he: "סגירה מתועדת", code: "Closed" },
      ],
      mistakesHe: [
        "פתיחת Case לכל חריג-קטן — מנהלים-יתר ומאבדים מיקוד; Case נועד למורכב בלבד.",
        "Case ללא participants או ללא context מצורף — דיון 'באוויר' בלי אמת-משותפת.",
        "השארת Cases פתוחים ללא סגירה — אובדן-עקיבות ו'תיקים-זומבים'.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור Case מ-alert ➔ חסרה הרשאה ל-Manage Cases או קישור-creation לא מוגדר.",
        "participant לא רואה את ה-Case ➔ לא צורף או חסרה הרשאת-תחום-תכנון.",
        "ה-context (תצוגה/נתונים) לא נשמר ➔ Snapshot/attach לא בוצע בעת היצירה.",
      ],
      bestPracticeHe: [
        "פתח Case רק לחריגים הדורשים דיון/החלטה רב-משתתפים.",
        "צרף תמיד context (Planning View/Snapshot) כדי שכולם דנים על אותה אמת.",
        "נהל סטטוס ופְּתח Tasks מתוך ה-Case; סגור עם תיעוד-החלטה ללמידה.",
      ],
      interviewHe: [
        { qHe: "מהו Case Management ב-SAP IBP ומתי משתמשים בו?", aHe: "אפליקציית Manage Cases לניהול חריגים מורכבים הדורשים דיון, שיתוף-פעולה והחלטה; משתמשים כשקליק-אחד לא מספיק ונדרשים participants, context והחלטה מתועדת — שלב alert→case." },
        { qHe: "מה Case שומר כדי להבטיח דיון על 'אמת אחת'?", aHe: "את ה-context: Planning Views/Snapshots, Planning Area ו-filters בנקודת-זמן, יחד עם participants, comments ו-attachments — כך הדיון סביב אותם נתונים." },
      ],
      takeawaysHe: [
        "Case Management (Manage Cases) = ניהול חריגים מורכבים עם דיון והחלטה.",
        "Case מאגד context, participants, דיון, סטטוס ו-Tasks מקושרים.",
        "השלב השני ברצף alert → case → task; סגור עם תיעוד-החלטה.",
      ],
      relatedHe: [
        { labelHe: "S&OP · שימוש בהתראות (7.2.2)", href: "/library/sop/chapter-07/#sub-7.2.2" },
        { labelHe: "S&OP · משימות (7.4)", href: "/library/sop/chapter-07/#sub-7.4" },
        { labelHe: "S&OP · SAP Build Work Zone (7.1)", href: "/library/sop/chapter-07/#sub-7.1" },
      ],
    },
    // ============================================================ 7.4
    {
      id: "7.4",
      titleHe: "משימות (Tasks)",
      titleEn: "Tasks",
      execHe:
        "Tasks ב-SAP IBP הן המנגנון להפיכת החלטה לפעולה מוקצית ועקיבה: מטלה עם אחראי, מועד-יעד, סטטוס וקישור-להקשר. בעוד Alert מזהה חריג ו-Case מנהל את ההחלטה, ה-Task מבטיח שמישהו ספציפי באמת עושה את הצעד הנדרש — ושאפשר לעקוב אחריו עד השלמה. זהו הצעד שסוגר את לולאת 'ניהול-לפי-חריגים'.",
      beginnerHe:
        "Task היא 'מטלה': מה צריך לעשות, מי אחראי, ועד מתי. אחרי שזיהינו חריג (Alert) ואולי דנו בו (Case), פותחים Task כדי שלא יישכח — היא מוקצית לאדם, יש לה תאריך-יעד, ורואים אם היא 'פתוחה' או 'הושלמה'. ככה דברים באמת קורים ולא נשארים בכוונות.",
      consultantHe:
        "אפליקציית Tasks מאפשרת ליצור משימה ידנית, מ-alert או מ-Case, להקצות owner/due-date/priority, לקשר context (Planning View/Case), ולנהל status (Open/In Process/Completed). משימות מופיעות ב-'My Tasks' למשתמש ומשתלבות ב-Work Zone להתראה ומעקב. Tasks הן השלב השלישי ברצף alert → case → task, והן מספקות את שכבת-האחריותיות (accountability) של התהליך. הרשאות לפי business role; ניתן לדווח על סטטוס-משימות בלוחות-מחוונים.",
      purposeHe:
        "להבטיח accountability: שכל פעולה-נדרשת תקבל בעלים, מועד ומעקב — כך שחריגים והחלטות לא 'מתנדפים' אלא מתורגמים לביצוע מדיד וסגור.",
      processExampleHe:
        "מתוך Case 'פער-קיבולת קו A' נפתחות שתי Tasks: 'העבר 20% ייצור לקו B' (אחראי: מנהל-ייצור, יעד: יום ה') ו'בדוק זמינות-חומר לקו B' (אחראי: רכש, יעד: יום ד'). כל אחראי רואה ב-'My Tasks', מבצע, ומעדכן ל-Completed; כשכל ה-Tasks סגורות — ה-Case נסגר.",
      cbcHe:
        "ב-CBC, בעקבות Case של מחסור-קיבולת-קיץ, נפתחות Tasks אזוריות: 'הזז ייצור 1.5L למפעל-צפון', 'אשר שעות-נוספות בקו-מילוי', 'עדכן הבטחת-אספקה ללקוח-מפתח' — כל אחת עם אחראי ומועד, נעקבות עד השלמה לקראת ישיבת-ה-S&OP.",
      navHe: [
        "SAP IBP ► Tasks ► Create Task (ידני / מ-alert / מ-Case)",
        "SAP IBP ► Tasks ► Assign Owner / Due Date / Priority",
        "SAP IBP ► My Tasks ► Status (Open / In Process / Completed)",
        "SAP Build Work Zone ► My Tasks (התראה ומעקב)",
      ],
      tables: [],
      tcodes: [],
      fiori: ["Tasks", "My Tasks", "Manage Cases", "Alert Overview", "SAP Build Work Zone"],
      configHe: [
        "Authorizations: שיוך Tasks ל-business roles ולמשתמשים.",
        "Creation: אפשרות ליצור Task מ-alert/Case וקישור-context אוטומטי.",
        "Owner/due/priority: הגדרת שדות-ניהול לאחריותיות ולמעקב.",
        "Integration: חשיפת 'My Tasks' ב-Work Zone ודיווח-סטטוס ב-Dashboards.",
      ],
      flow: [
        { he: "החלטה (מ-Case/Alert)", code: "Case / Alert", note: "case → task" },
        { he: "יצירת משימה", code: "Create Task" },
        { he: "הקצאה + יעד", code: "Owner / Due" },
        { he: "ביצוע", code: "In Process" },
        { he: "השלמה ומעקב", code: "Completed" },
      ],
      mistakesHe: [
        "Task ללא owner או ללא due-date — אין אחריות ואין מעקב.",
        "פתיחת Tasks בלי קישור ל-context/Case — מאבדים את 'למה' המטלה.",
        "אי-עדכון סטטוס — לוח-המעקב לא משקף את המציאות.",
      ],
      troubleshootHe: [
        "אחראי לא רואה את המשימה ➔ לא הוקצה לו owner או חסרה הרשאה.",
        "לא ניתן ליצור Task מ-Case/alert ➔ חסרה הרשאה ל-Tasks או קישור-creation לא מוגדר.",
        "Dashboard-מעקב לא מתעדכן ➔ סטטוס-המשימות לא עודכן או ה-card לא חובר.",
      ],
      bestPracticeHe: [
        "לכל Task — owner, due-date ו-context; בלעדיהם אין accountability.",
        "פתח Tasks מתוך Case/alert לשימור הקשר-מקצה-לקצה.",
        "סגור את הלולאה: עדכן סטטוס וודא שכל ה-Tasks סגורות לפני סגירת ה-Case.",
      ],
      interviewHe: [
        { qHe: "מה תפקיד Tasks ביחס ל-Alerts ול-Cases?", aHe: "Alert מזהה חריג, Case מנהל את ההחלטה, ו-Task הופך את ההחלטה לפעולה מוקצית עם owner, due-date וסטטוס — שכבת-האחריותיות שסוגרת את לולאת alert→case→task." },
        { qHe: "מה הופך Task לעקיבה ואחראית?", aHe: "הקצאת owner, due-date ו-priority, קישור ל-context (Case/Planning View), וניהול status — מה שמאפשר מעקב ב-'My Tasks' וב-Work Zone עד השלמה." },
      ],
      takeawaysHe: [
        "Tasks = הפיכת החלטה לפעולה מוקצית, עם owner, due-date וסטטוס.",
        "השלב השלישי והסוגר ברצף alert → case → task.",
        "הן שכבת-האחריותיות שמבטיחה שדברים באמת קורים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · ניהול מקרים (7.3)", href: "/library/sop/chapter-07/#sub-7.3" },
        { labelHe: "S&OP · שימוש בהתראות (7.2.2)", href: "/library/sop/chapter-07/#sub-7.2.2" },
        { labelHe: "S&OP · SAP Build Work Zone (7.1)", href: "/library/sop/chapter-07/#sub-7.1" },
      ],
    },
    // ============================================================ 7.5
    {
      id: "7.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד SAP IBP הופך תכנון-S&OP מסריקה-יסודית-בלתי-אפשרית לניהול-ממוקד-חריגים ושיתוף-פעולה. SAP Build Work Zone מאחד את כולם למרחב-אחד; Custom Alerts מזהות אוטומטית את מה שחורג; Case Management מנהל את ההחלטות המורכבות; ו-Tasks מבטיחות שההחלטות הופכות לפעולה אחראית. יחד הם יוצרים לולאה סגורה: חריג → דיון → פעולה → סגירה.",
      beginnerHe:
        "סיכום פשוט: לא צריך לבדוק הכל — המערכת מתריעה רק על מה שלא בסדר (Alerts). לדברים מורכבים פותחים 'תיק' עם אנשים (Case). כדי שמשהו באמת ייעשה, נותנים 'מטלה' לאדם עם תאריך (Task). ואת כל זה עושים יחד במקום אחד (SAP Build Work Zone). ככה צוות-קטן מנהל תכנון-ענק.",
      consultantHe:
        "מבחינת-מימוש, ארבעת הרכיבים נשענים זה על זה: Work Zone (BTP, SSO/IAS) הוא שכבת-החוויה; Custom Alerts (Planning Area, Key Figures, Planning Level, Application Jobs) הן מנוע-החריגים; Manage Cases ו-Tasks הם שכבת-ה-collaboration וה-accountability. רצף alert → case → task הוא דפוס-העבודה המרכזי, וכולם כפופים ל-business roles ולאינטגרציית-IBP-ב-Work Zone. IBP הוא cloud, ולכן כל החיבורים הם service-to-service דרך BTP/IAS.",
      purposeHe:
        "לקבע את התפיסה: S&OP מצליח כשהוא ממוקד-חריגים ומשותף. המטרה של הפרק היא שתדע לבנות ולהפעיל את הלולאה הזו מקצה-לקצה — מהגדרת-התראה ועד סגירת-משימה.",
      processExampleHe:
        "הלולאה המלאה: Application Job מחשב Custom Alerts בלילה → בבוקר מתכנן רואה חריג ב-Work Zone, צולל לתצוגה → חריג פשוט נסגר בקליק; חריג מורכב הופך ל-Case עם participants → ההחלטה מתפרקת ל-Tasks עם owners ומועדים → כשכל ה-Tasks סגורות, ה-Case נסגר וההתראה נעלמת בהרצה הבאה.",
      cbcHe:
        "ב-CBC הלולאה הזו היא שגרת-עונת-השיא: חישוב-לילי של חריגי-מלאי-וקיבולת, מסך-חריגים בבוקר, Cases חוצי-אזורים למחסורים-מורכבים, ו-Tasks אזוריות עם אחראים — הכל במרחב-אחד, כך שצוות-S&OP מצומצם מנהל את כל מפעלי-הבקבוק לפי-חריגים בלבד.",
      navHe: [
        "SAP Build Work Zone ► Home (מרחב-S&OP אחד)",
        "SAP IBP ► Custom Alerts → Manage Cases → Tasks (הלולאה)",
        "SAP IBP ► Application Jobs (חישוב-חריגים מתוזמן)",
      ],
      tables: [],
      tcodes: [],
      fiori: ["SAP Build Work Zone", "Custom Alerts", "Manage Cases", "Tasks", "SAP IBP web UI"],
      configHe: [
        "ודא SSO/IAS אחיד בין Work Zone ל-IBP כבסיס לכל שאר הרכיבים.",
        "הגדר Custom Alerts עם Planning Level וספים מכוילים, ותזמן Application Jobs.",
        "אפשר רצף alert → case → task דרך הרשאות ל-Manage Cases ול-Tasks.",
        "חשוף alerts, cases ו-tasks כ-cards/tiles ב-Work Zone למסע-משתמש אחד.",
      ],
      flow: [
        { he: "חישוב חריגים", code: "Application Jobs" },
        { he: "זיהוי", code: "Custom Alerts" },
        { he: "דיון", code: "Manage Cases", note: "alert → case" },
        { he: "פעולה", code: "Tasks", note: "case → task" },
        { he: "סגירה", code: "Closed" },
      ],
      mistakesHe: [
        "להפעיל רכיב אחד בלי הלולאה — Alerts בלי Cases/Tasks משאירות חריגים ללא סגירה.",
        "להזניח SSO/Work Zone — בלי מרחב-אחד התהליך מתפצל חזרה לאיים.",
        "ספים לא-מכוילים — הצפת-התראות ששוברת את כל המודל.",
      ],
      troubleshootHe: [
        "הלולאה 'נשברת' באמצע ➔ חסרות הרשאות-מעבר בין Alerts/Cases/Tasks.",
        "חריגים חוזרים ➔ ה-Tasks לא נסגרו או הפעולה התכנונית לא בוצעה.",
        "אימוץ-נמוך ➔ חוסר SSO/ניווט-ממוקד-תפקיד ב-Work Zone.",
      ],
      bestPracticeHe: [
        "תכנן את כל הלולאה (alert → case → task) כתהליך אחד, לא ככלים נפרדים.",
        "התחל מ-Work Zone+SSO, ואז מנוע-החריגים, ואז שכבת-ה-collaboration.",
        "מדוד: זמן מ-alert לסגירת-task, ושיעור-חריגים שטופלו — ושפר בהתאם.",
      ],
      interviewHe: [
        { qHe: "מהו רצף-העבודה המרכזי של ניהול-לפי-חריגים ב-IBP?", aHe: "alert → case → task: Custom Alert מזהה חריג, Manage Case מנהל דיון והחלטה, ו-Task הופך אותה לפעולה מוקצית ועקיבה — הכל במרחב SAP Build Work Zone." },
        { qHe: "כיצד ארבעת הרכיבים של הפרק משלימים זה את זה?", aHe: "Work Zone = חוויה ושיתוף; Custom Alerts = מנוע-חריגים; Manage Cases = החלטות מורכבות; Tasks = accountability — יחד לולאה סגורה מ-חריג ל-סגירה." },
      ],
      takeawaysHe: [
        "S&OP מצליח כשהוא ממוקד-חריגים ומשותף — לא סריקה-יסודית.",
        "ארבעה רכיבים: Work Zone, Custom Alerts, Manage Cases, Tasks.",
        "דפוס-העבודה: alert → case → task, בלולאה סגורה עד סגירה.",
        "IBP הוא cloud; הכל מתאחד תחת SSO ב-SAP Build Work Zone.",
      ],
      relatedHe: [
        { labelHe: "S&OP · SAP Build Work Zone (7.1)", href: "/library/sop/chapter-07/#sub-7.1" },
        { labelHe: "S&OP · התראות מותאמות (7.2)", href: "/library/sop/chapter-07/#sub-7.2" },
        { labelHe: "S&OP · ניהול מקרים (7.3)", href: "/library/sop/chapter-07/#sub-7.3" },
        { labelHe: "S&OP · משימות (7.4)", href: "/library/sop/chapter-07/#sub-7.4" },
      ],
    },
  ],
};
