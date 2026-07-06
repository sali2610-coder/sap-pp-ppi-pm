// Domain Model — connects הארגון plant areas to SAP modules, objects and
// process maps. Beverage-manufacturing oriented. Hand-authored.

export interface AreaLink { label: string; href: string }
export interface DomainArea {
  slug: string;
  he: string;
  title: string;
  modules: string[];        // PP / PP-PI / QM / PM / MM
  description: string;
  flow: string[];           // area process steps
  objects: AreaLink[];       // SAP objects (→ /oic or /object)
  processes: AreaLink[];     // process maps / guides
  incidents: AreaLink[];
}

export const MFG_AREAS: DomainArea[] = [
  { slug: "production-line", he: "קו ייצור", title: "Production Line", modules: ["PP-PI", "PP", "MM"],
    description: "קו הייצור הראשי — המרת תכנון לפקודות תהליך, ביצוע מבוסס-מתכון, אישור ו-GR לאצווה. הליבה של PP-PI.",
    flow: ["MRP → הזמנה מתוכננת", "פקודת תהליך (COR1)", "שחרור + מרשם בקרה", "אישור + Backflush (COR6N)", "GR לאצווה"],
    objects: [{ label: "Process Order", href: "/oic/process-order/" }, { label: "Master Recipe", href: "/oic/master-recipe/" }, { label: "Work Center/Resource", href: "/oic/work-center/" }, { label: "Material", href: "/oic/material/" }],
    processes: [{ label: "Plan-to-Produce", href: "/process-explorer/plan-to-produce/" }, { label: "ייצור משקה", href: "/manufacturing/beverage-production/" }],
    incidents: [{ label: "מרשם בקרה לא נוצר", href: "/resolution/process-order-no-control-recipe/" }, { label: "Backflush COGI", href: "/resolution/cogi-stuck/" }] },
  { slug: "syrup-room", he: "חדר תרכיז", title: "Syrup Room", modules: ["PP-PI", "QM"],
    description: "הכנת תרכיז בסיס כחצי-מוצר (SFG) — שקילה, ערבוב בכור, בקרת איכות (Brix/pH) ואחסון לאצווה.",
    flow: ["פקודת תהליך לתרכיז", "שקילה + ערבוב (כור)", "מדידת Brix/pH (PI)", "החלטת שימוש (QM)", "GR לאצווה (SFG)"],
    objects: [{ label: "Master Recipe", href: "/oic/master-recipe/" }, { label: "Batch", href: "/oic/batch/" }, { label: "Inspection Lot", href: "/oic/inspection-lot/" }, { label: "Resource (כור)", href: "/oic/work-center/" }],
    processes: [{ label: "תהליך תרכיז", href: "/manufacturing/syrup-process/" }, { label: "Quality Management", href: "/process-explorer/quality-management/" }],
    incidents: [{ label: "מאפייני אצווה חסרים", href: "/resolution/char-batch-classification-missing/" }, { label: "תוצאה מחוץ למפרט", href: "/resolution/qm-results-out-of-spec/" }] },
  { slug: "cip", he: "ניקוי במקום (CIP)", title: "Cleaning-in-Place", modules: ["PM", "QM"],
    description: "ניקוי קווים/כורים בין אצוות — אחזקה מונעת מתוזמנת + ניטור חיישנים (טמפ'/מוליכות); כשל חוסם ייצור.",
    flow: ["תכנית אחזקה CIP (IP01)", "IP30 → פקודת CIP", "שטיפה→ניקוי→חיטוי", "ניטור חיישנים (IK11)", "סטטוס נקי → שחרור קו"],
    objects: [{ label: "Equipment", href: "/oic/equipment/" }, { label: "Measuring Point", href: "/oic/measuring-point/" }, { label: "Maintenance Plan", href: "/oic/maintenance-plan/" }],
    processes: [{ label: "CIP", href: "/manufacturing/cip/" }, { label: "Maintenance Management", href: "/process-explorer/maintenance-management/" }],
    incidents: [{ label: "תכנית לא יוצרת פקודות", href: "/resolution/plan-no-orders/" }, { label: "קריאת מדידה נדחית", href: "/resolution/measurement-rejected/" }] },
  { slug: "batch", he: "ניהול אצוות", title: "Batch Management", modules: ["PP-PI", "QM", "MM"],
    description: "אצווה לאורך כל השרשרת — יצירה ב-GR עם תוקף, קביעה אוטומטית (FEFO), חסימת QM ומעקב Recall.",
    flow: ["GR יוצר אצווה + SLED", "סיווג (023) + מאפיינים", "קביעת FEFO בצריכה/מכירה", "חסימת QM אם פסול", "Where-Used ל-Recall"],
    objects: [{ label: "Batch", href: "/oic/batch/" }, { label: "Material", href: "/oic/material/" }, { label: "Inspection Lot", href: "/oic/inspection-lot/" }],
    processes: [{ label: "מעקב אצוות (Blueprint)", href: "/blueprints/pppi-batch-trace/" }, { label: "אירוע איכות ו-Recall", href: "/manufacturing/quality-recall/" }],
    incidents: [{ label: "קביעת אצווה נכשלת", href: "/resolution/batch-determination-fail/" }, { label: "Batch Derivation", href: "/resolution/batch-derivation-fail/" }] },
  { slug: "packaging", he: "קו אריזה", title: "Packaging Line", modules: ["PP", "MM"],
    description: "אריזה משנית — הרכבת מארזים מבקבוקים מוגמרים (ייצור בדיד), Backflush ומשטוח.",
    flow: ["MRP למארזים", "פקודת ייצור (CO01)", "אישור (CO11N) + Backflush", "GR מארזים", "משטוח"],
    objects: [{ label: "Production Order", href: "/oic/process-order/" }, { label: "BOM", href: "/oic/bom/" }, { label: "Material", href: "/oic/material/" }],
    processes: [{ label: "קו אריזה", href: "/manufacturing/packaging-line/" }, { label: "Discrete (MRP→Order)", href: "/process-explorer/plan-to-produce/" }],
    incidents: [{ label: "BOM ללא רכיבים", href: "/resolution/bom-explosion-no-components/" }, { label: "Backflush COGI", href: "/resolution/cogi-stuck/" }] },
  { slug: "quality", he: "מעבדת איכות", title: "Quality", modules: ["QM", "PP-PI"],
    description: "בקרת איכות — מנות בדיקה ב-GR/ייצור, רישום תוצאות מול מפרט, החלטת שימוש, תעודות וכיול מכשירים.",
    flow: ["מנת בדיקה (GR/ייצור)", "רישום תוצאות (QE11)", "החלטת שימוש (QA11)", "תעודה/חסימה", "כיול מכשירים (PM-QM)"],
    objects: [{ label: "Inspection Lot", href: "/oic/inspection-lot/" }, { label: "Batch", href: "/oic/batch/" }],
    processes: [{ label: "Quality Management", href: "/process-explorer/quality-management/" }, { label: "אירוע איכות", href: "/manufacturing/quality-recall/" }],
    incidents: [{ label: "מנת בדיקה לא נוצרה", href: "/resolution/qm-no-inspection-lot/" }, { label: "UD חסום", href: "/resolution/qm-ud-blocked/" }] },
  { slug: "warehouse", he: "מחסן", title: "Warehouse", modules: ["MM", "PP-PI"],
    description: "ניהול מלאי חומרי גלם, אריזה ומוצר גמר — תנועות סחורה, אספקה לקווים וקבלת תוצר; אצוות במלאי.",
    flow: ["קבלת חומרי גלם (GR)", "אספקה לקו (GI 261)", "Backflush בייצור", "GR תוצר לאצווה", "אספקה למשלוח (PGI)"],
    objects: [{ label: "Material", href: "/oic/material/" }, { label: "Batch", href: "/oic/batch/" }, { label: "Reservation", href: "/oic/reservation/" }],
    processes: [{ label: "תנועות מלאי", href: "/solutions/goods-movement/" }, { label: "P2P", href: "/process-explorer/p2p/" }],
    incidents: [{ label: "תנועת סחורה נכשלת", href: "/resolution/goods-movement-stock/" }, { label: "אי-התאמת WM/IM", href: "/resolution/wm-ewm-stock-mismatch/" }] },
];

export const MODULE_COLOR: Record<string, string> = { PP: "#2563eb", "PP-PI": "#6d28d9", QM: "#0d9488", PM: "#f97316", MM: "#0891b2" };
