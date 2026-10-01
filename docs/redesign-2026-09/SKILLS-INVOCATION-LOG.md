# יומן הפעלת הכישורים · Design Recovery (2 באוקטובר 2026)

כלל: כישור נרשם INVOKED רק אם הופעל בפועל דרך ה־Skill tool (או ה־CLI שלו), ויש לו פלט בקובץ. "מה שומש" = מה נכנס לבריף של המועצה ולכיווני העיצוב; "מה נדחה" = עם הסיבה. הפלטים: `neo-redesign-evidence/r4-skills/`.

| כישור | AVAILABLE | INVOKED | OUTPUT |
|---|---|---|---|
| `redesign-existing-projects` | כן (`~/.claude/skills/`) | כן, Skill tool | רשימת הביקורת שלו הופעלה כסריקה על 26 גיליונות ה־CSS (`r4-skills/css-audit.txt`): 200 הצהרות letter-spacing שאינן 0, ‏3 uppercase, ‏8 ערכי רדיוס, ‏298 צללים (12 שחור טהור), ‏205 מעברים (44 ב־0/none), ‏174 hover מול 12 active, ‏108 focus-visible, ‏98 גרדיאנטים, ‏15 backdrop-filter, ‏90 keyframes (32 אינסופיים: בקבצים ישנים או מכובים ב־motion.css), ‏62 בלוקים של reduced-motion, ‏75 ייבואי lucide ו־0 ספריות אייקונים אחרות |
| `ui-ux-pro-max` | כן | כן, Skill tool + ה־CLI שלו | `uiux-design-system.md` (המלצה: Minimalism & Swiss, פלטת slate, ‏Noto Sans Hebrew מ־Google Fonts) ושבעה חיפושי דומיין: color, typography, ux (אנימציה, נגישות, מצבי טעינה וריק; ניווט), chart (גרפים וקשרים), style (data-dense; dark mode) |
| `frontend-design` | כן (plugin) | כן, Skill tool | הנחיות: לבזבז את התעוזה במקום אחד; רשימת תסמיני "דף מיוצר" (קרם + סריף + אדום חם, eyebrow באותיות רישיות, נקודות אמצע, חץ אחרי קישור, מספור של מה שאינו רצף, מונו לתוויות קטנות); מדידה מתחת ל־80 תווים; תנועה אחת מתוזמרת |
| `high-end-visual-design` | כן | כן, Skill tool | ארכיטיפים (Ethereal Glass / Editorial Luxury / Soft Structuralism), ‏double-bezel, ‏button-in-button, פס ניווט צף, ‏fade-up של 800ms, מסכת רעש |
| `design-taste-frontend` | כן | כן, Skill tool | חוגות (variance 8, motion 6, density 4), איסור כרטיסים בלוחות צפופים, מצבי loading/empty/error חובה, ‏:active מישושי, איסור סגול וניאון, ‏bento עם תנועה אינסופית |
| impeccable `critique` | כן | כן, Skill tool + `reference/critique.md` | ציון עשר ההיוריסטיקות ורשימת העומס הקוגניטיבי הוטלו על ה־UX/IA Director (הערכה A) ועל ה־Visual QA Director (הערכה B, דפדפן), כפי שהפלייבוק דורש: שני סוכנים מבודדים |
| impeccable `layout` | כן | כן + `reference/layout.md` | הסורק: 0 ממצאי layout. מבחן ה־squint ושאלות הקצב והקיבוץ הוטלו על ה־Layout Director |
| impeccable `bolder` | כן | כן + `reference/bolder.md` | "להגביר את מה שהמערכת כבר מחזיקה, ולהשקיט את השאר"; "סעיף שטוח הוא סעיף שוויתר על המהלכים החזקים של המערכת שלו" |
| impeccable `colorize` | כן | כן + `reference/colorize.md` | תפקידים ולא ערימת צבעים; הצבע החזק מחזיק אזור; לילה כקומפוזיציה ולא היפוך; טבלת ניגודיות |
| impeccable `typeset` | כן | כן + `reference/typeset.md` | הסורק: 0 ממצאי type. שאלות הסמכות, ההיררכיה, המדידה והמסירה הוטלו על ה־Typography Director |
| impeccable `delight` | כן | כן + `reference/delight.md` | תזה אחת של הנאה; פרס לסקרנות שמגלה תועלת אמיתית; אסור לעכב את המשימה |
| impeccable `animate` | כן | כן + `reference/animate.md` | רגע מוקד אחד; טבלת הזמנים (100 עד 150, 150 עד 300, 300 עד 500, 500 עד 800); יציאה מהירה מכניסה; `cubic-bezier(0.16, 1, 0.3, 1)`; לולאה לא חיונית עוצרת כשמוסתרת |
| impeccable `adapt` | כן | כן + `reference/adapt.md` | התאמה היא חשיבה מחדש, לא קנה מידה; ‏pointer/hover queries; אזורים בטוחים |
| impeccable `polish` | כן | כן + `reference/polish.md` | סדר הטיפול (משימות חסומות, מצבים חסרים, סחף מערכת, חזותי, קוד); נשמר לשער הפיילוט |
| impeccable `audit` | כן | כן + `reference/audit.md` + הסורק | `impeccable-detect-all.json`: 10 ממצאים (5 layout-transition, ‏3 side-tab, ‏2 bounce-easing); אימות כל אחד הוטל על ה־Visual QA Director |
| `motion-doctrine` | **לא מותקן** | לא | הזיכרון מזכיר אותו; לא נמצא ב־`~/.claude/skills` ולא ב־plugins. התנועה מכוסה ב־`animate` ובארכיאולוגיה של ה־NEO הישן |

## מה שומש ומה נדחה

| כישור | מה שומש | מה נדחה | למה |
|---|---|---|---|
| `redesign-existing-projects` | הסריקה; הכלל "צל בגוון הרקע"; "מצבי loading/empty/error הם מה שעושה את זה גמור"; "cards רק כשהגובה אומר היררכיה"; ‏`text-wrap: balance` | החלפת גופן ל־Geist/Satoshi; ‏Google Fonts; "רעש וגרעין על כל רקע"; ‏glassmorphism "אמיתי"; גלילה עם אינרציה; ‏"Lucide = ברירת מחדל של AI, החליפו" | האתר מחויב ל־100% offline עם Plex Hebrew באחסון עצמי; הבריף אוסר glass ומרקם שמפריע לקריאה; החלפת ספריית אייקונים אינה שאלת צבע וחיות |
| `ui-ux-pro-max` | סדר העדיפויות (נגישות, מגע, ביצועים, ואז סגנון); ‏line-length 60 עד 75; ‏`color-dark-mode` (לא היפוך); ‏`exit-faster-than-enter`; ‏`stagger-sequence` 30 עד 50ms; ‏`truncation-strategy`; ‏`primary-action` אחת למסך; עקרונות הגרפים (אגדה, שני ערוצים, לא צבע בלבד) | ההמלצה המרכזית: Minimalism & Swiss עם slate `#475569` ו־`#F8FAFC` | זו בדיוק הפלטה הניטרלית־אפורה שהבעלים דחה כחיוורת; ‏Noto Sans Hebrew מ־Google Fonts נדחה בגלל ה־offline |
| `frontend-design` | רשימת התסמינים (האתר הנוכחי: קרם `#fbf8f1` + סריף בכותרת הבית + אדום, ‏eyebrow בכל פרק, נקודות אמצע, חצים אחרי קישורים: הופיעו בבריף למועצה); "תנועה אחת מתוזמרת"; "אל תבזבז חופש על ברירת מחדל" | אין | |
| `high-end-visual-design` | הרעיון של עומק דרך קינון (double-bezel) למשטחי נתונים בודדים (במת ה־ERD, בארות קוד) כאפשרות לכיוון Data Lab; עקומות מותאמות | ‏Ethereal Glass עם כדורי סגול; פס ניווט צף כגלולה; כפתור־בתוך־כפתור; ריווח `py-24` עד `py-40`; ‏fade-up עם blur של 800ms+ לכל אלמנט; ‏eyebrow כגלולה באותיות רישיות | סגול, glass, גלולות ומרווחים ענקיים אסורים בבריף; כניסה מטושטשת לכל אלמנט היא "סעיף אחר סעיף" שהבריף ו־`frontend-design` דוחים |
| `design-taste-frontend` | "אין כרטיסים בלוח צפוף, רק קווים ורווח"; מצבי loading/empty/error; ‏`:active` מישושי (scale .98); חוגת variance 8 (פריסות א־סימטריות עם עמודות שבריות) | "מיקרו־אינטראקציות תמידיות" ולולאות אינסופיות; ‏typewriter; כפתורים מגנטיים; ‏framer-motion; ‏bento עם 2.5rem; "סריף אסור בלוח" כחוק | הבריף אוסר תנועה אינסופית ו־fake typing; אין להוסיף תלות; הסריף נשאר אפשרות של הכיוון העיתונאי בלבד |
| impeccable (10 פקודות) | כל הפלייבוקים כפי שהם: ה־critique בשני סוכנים; תפקידי צבע; טבלת הזמנים; תזת ההנאה; "להגביר את מה שהמערכת מחזיקה" | הסורק לא מצא ממצאי layout ו־type, ולכן לא שומש כראיה לטובת העיצוב הנוכחי: "סריקה נקייה היא רצפה, לא הוכחה" (הפלייבוק עצמו) | |

כלל הבריף: ההנחיה של הבעלים גוברת על כל המלצה כללית, ואין להרכיב עיצוב מערבוב כל ההמלצות.
