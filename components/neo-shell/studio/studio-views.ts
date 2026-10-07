// Project NEO · Architecture Studio — what each view puts on the canvas.
//
// Runs in the browser on the build-time graph (./studio-data.ts). It imports no
// dataset: only the pure layout (lib/studio-layout.ts) and the S/4 words.
//
// Every view is a DIFFERENT picture of the same graph, and every one is read
// from the data; none is authored:
//   טבלאות          the module's tables, grouped by business zone, by layers
//   תהליך עסקי      the module's process as numbered steps, each step's related
//                   tables under it
//   נתוני אב        the curated master objects, each with the tables related
//                   to it directly
//   ECC ↔ S/4       every table of the module on a board, one column per
//                   S/4HANA verdict in the blueprint
//   five object views  the tables of the chosen layers that have an object of
//                   the view's kind, each with its own objects; an object
//                   shared by six or more of them stands in "משותפים"
// The old studio drew the first three identically on its first layer, and drew
// every transaction / BAPI of the module, related or not.

import { S4_HE, S4_ORDER, S4_UNDECIDED_HE, type S4Class } from "@/lib/s4-class";
import { layoutBoard, layoutGroupsBest, layoutProcess, type GroupSpec, type ProcessColumn, type Size, type StudioLayout } from "@/lib/studio-layout";
import type { StudioGraph, StudioNode, Tier } from "./studio-data";

export type Kind = StudioNode["k"];
export type ViewId = "tables" | "business" | "masterdata" | "eccs4" | "transactions" | "integration" | "cds" | "bapi" | "fiori";

export interface ViewDef {
  id: ViewId;
  he: string;
  /** one line, for the tab's tooltip */
  tip: string;
  /** what the panel says the picture is, two sentences */
  about: string;
  /** how to read THIS picture: what its sizes, lines and frames mean */
  read: string[];
  /** the kinds of object on the canvas besides tables */
  objects: Kind[];
  /** whether the layer (zone) choice applies */
  layers: boolean;
  family: "structure" | "objects";
}

export const VIEWS: ViewDef[] = [
  {
    id: "tables", he: "טבלאות", objects: [], layers: true, family: "structure",
    tip: "טבלאות המודול לפי אזור עסקי, והקשרים ביניהן.",
    about: "כל מסגרת היא אזור עסקי ובה טבלאות המודול השייכות אליו; טבלאות קשורות עומדות יחד, והטבלה בעלת מירב הקשרים עומדת בראש קבוצתה, מימין. התצוגה נפתחת בשכבה אחת, ואת שאר האזורים מוסיפים בשורת השכבות שמעל התרשים.",
    read: ["גודל הכרטיס מבטא את מספר הקשרים לטבלאות אחרות במודול; כרטיס מודגש הוא אובייקט אב או טבלה עם שישה קשרים ומעלה.", "קו רציף הוא קשר בתוך קבוצה. קשרים בין קבוצות ובין מסגרות מופיעים כשמצביעים על טבלה או בוחרים בה."],
  },
  {
    id: "business", he: "תהליך עסקי", objects: [], layers: false, family: "structure",
    tip: "שלבי התהליך של המודול לפי הסדר, וטבלאות כל שלב.",
    about: "שלבי התהליך של המודול ממוספרים מימין לשמאל, ובראש כל שלב עומדת הטבלה שלו, ומתחתיה הטבלאות הקשורות אליה שלא הופיעו בשלב קודם. החץ בין השלבים מציין את סדר התהליך בלבד, ואינו קשר בין טבלאות.",
    read: ["כל מסגרת היא שלב, ממוספר לפי סדר התהליך, וקו הרצף שבין המסגרות מראה את הסדר בלבד.", "הסוגר בצד המסגרת מחבר את טבלת השלב לטבלאות שמתחתיה; קשרים אחרים מופיעים כשמצביעים על כרטיס.", "שלב שאין לו טבלה במודול מופיע במסגרת מקווקוות, עם הקוד שלו."],
  },
  {
    id: "masterdata", he: "נתוני אב", objects: [], layers: false, family: "structure",
    tip: "אובייקטי האב המרכזיים של המודול והטבלאות הקשורות אליהם.",
    about: "כל מסגרת מוקדשת לאובייקט אב מרכזי של המודול, ובה הטבלאות הקשורות אליו ישירות. טבלה הקשורה לכמה אובייקטי אב מופיעה פעם אחת, אצל הראשון שבהם, והקשרים לאחרים מוצגים כשבוחרים בה.",
    read: ["כל מסגרת היא אובייקט אב, והכרטיס שלו עומד בראשה, מימין.", "קו רציף הוא קשר בתוך המסגרת; הקשרים בין אובייקטי האב מופיעים כשמצביעים על כרטיס או בוחרים בו."],
  },
  {
    id: "eccs4", he: "ECC ↔ S/4", objects: [], layers: false, family: "structure",
    tip: "כל טבלאות המודול לפי הכרעת ה-S/4HANA שבבלופרינט.",
    about: "כל עמודה מרכזת את הטבלאות שהבלופרינט של המודול מסווג באותה הכרעה: ללא שינוי, מותאם, הוחלף או הוסר. טבלה שהבלופרינט אינו מכריע לגביה מופיעה בעמודה \"לא הוכרע במקור\", ואינה משויכת להכרעה אחרת.",
    read: ["כל עמודה היא הכרעה אחת של הבלופרינט, והסמל והמילה שבראש העמודה הם ההכרעה.", "בלוח הזה אין קווים במנוחה: קשרי הטבלה מופיעים כשמצביעים עליה או בוחרים בה.", "כרטיסי העמודה \"ללא שינוי\" קטנים מהאחרים, כדי שהטבלאות שיש בהן שינוי יבלטו."],
  },
  {
    id: "transactions", he: "טרנזקציות", objects: ["tcode"], layers: true, family: "objects",
    tip: "הטרנזקציות שהבלופרינט מתעד לטבלאות בשכבות שנבחרו.",
    about: "כל טבלה בשכבות שנבחרו מוצגת במרכז הטרנזקציות שהבלופרינט מתעד לה, וטרנזקציה המשותפת לכמה טבלאות מופיעה פעם אחת. טבלאות שלא מתועדת להן טרנזקציה אינן בתרשים, והן מפורטות בהמשך החלונית.",
    read: ["כל טבלה עומדת בראש הקבוצה שלה, ולידה הטרנזקציות שלה; כרטיס טרנזקציה מסומן בסמל שלה.", "קשרים בין טבלאות, וקשרים של טרנזקציה משותפת, מופיעים כשמצביעים על כרטיס או בוחרים בו."],
  },
  {
    id: "integration", he: "אינטגרציה", objects: ["bapi", "idoc"], layers: true, family: "objects",
    tip: "ממשקי BAPI ו-IDoc שהבלופרינט מתעד לטבלאות בשכבות שנבחרו.",
    about: "כל טבלה בשכבות שנבחרו מוצגת עם ממשקי ה-BAPI וה-IDoc שהבלופרינט מתעד לה, וממשק המשותף לכמה טבלאות מופיע פעם אחת. ממשק המשותף לשש טבלאות ומעלה עומד במסגרת \"משותפים\", וקשריו מוצגים כשמצביעים עליו.",
    read: ["כל טבלה עומדת בראש הקבוצה שלה, ולידה ממשקי ה-BAPI וה-IDoc שלה; הסמל שעל הכרטיס מבחין ביניהם.", "קשרים בין טבלאות, וקשרים של ממשק משותף, מופיעים כשמצביעים על כרטיס או בוחרים בו."],
  },
  {
    id: "cds", he: "CDS Views", objects: ["cds"], layers: true, family: "objects",
    tip: "ה-CDS Views הממופים במאגר לטבלאות בשכבות שנבחרו.",
    about: "כל טבלה בשכבות שנבחרו מוצגת עם ה-CDS Views הממופים לה במאגר, ו-View המשותף לכמה טבלאות מופיע פעם אחת. טבלאות שאין להן View ממופה אינן בתרשים, והן מפורטות בהמשך החלונית.",
    read: ["כל טבלה עומדת בראש הקבוצה שלה, ולידה ה-CDS Views הממופים לה.", "קשרים בין טבלאות, וקשרים של View משותף, מופיעים כשמצביעים על כרטיס או בוחרים בו."],
  },
  {
    id: "bapi", he: "BAPIs / FMs", objects: ["bapi", "fm"], layers: true, family: "objects",
    tip: "BAPIs ומודולי פונקציה שהבלופרינט מתעד לטבלאות בשכבות שנבחרו.",
    about: "כל טבלה בשכבות שנבחרו מוצגת עם ה-BAPIs ומודולי הפונקציה שהבלופרינט מתעד לה, והסמל שעל כל אובייקט מבחין בין השניים. אובייקט המשותף לשש טבלאות ומעלה עומד במסגרת \"משותפים\", וקשריו מוצגים כשמצביעים עליו.",
    read: ["כל טבלה עומדת בראש הקבוצה שלה, ולידה ה-BAPIs ומודולי הפונקציה שלה; הסמל שעל הכרטיס מבחין בין השניים.", "קשרים בין טבלאות, וקשרים של אובייקט משותף, מופיעים כשמצביעים על כרטיס או בוחרים בו."],
  },
  {
    id: "fiori", he: "Fiori Apps", objects: ["fiori"], layers: true, family: "objects",
    tip: "יישומי Fiori שהבלופרינט מציין לטבלאות בשכבות שנבחרו.",
    about: "כל טבלה בשכבות שנבחרו מוצגת עם יישום ה-Fiori שהבלופרינט מציין לה, ויישום המשותף לכמה טבלאות מופיע פעם אחת. כשהבלופרינט קובע שאין לטבלה יישום ייעודי, הקביעה מובאת בחלונית כלשונה ואינה מצוירת כיישום.",
    read: ["כל טבלה עומדת בראש הקבוצה שלה, ולידה יישום ה-Fiori שהבלופרינט מציין לה.", "קשרים בין טבלאות, וקשרים של יישום משותף, מופיעים כשמצביעים על כרטיס או בוחרים בו."],
  },
];

/** The view an object of each kind is drawn in, for search and the panel. */
export const VIEW_OF_KIND: Record<Kind, ViewId> = {
  table: "tables", tcode: "transactions", bapi: "bapi", fm: "bapi", idoc: "integration", cds: "cds", fiori: "fiori",
};

export const SHARED_MIN = 6;
export const SHARED_ID = "shared";

/* ------------------------------------------------------------------- sizes */

// a graph card: the code and one line of name (the full name is the card's
// tooltip and the panel's heading); the board's cards have room for two lines,
// so a Hebrew name with an English gloss in brackets reads whole there
const TABLE_SIZE: Record<Tier, Size> = { core: { w: 184, h: 56 }, major: { w: 160, h: 48 }, leaf: { w: 144, h: 44 } };
// code (15.6px) + two name lines (2 x 15px) + padding (12px), with room for a descender
const BOARD_SIZE = { quiet: { w: 152, h: 64 }, loud: { w: 168, h: 66 } };
const objectWidth = (label: string, shared: boolean) =>
  Math.min(236, Math.max(104, 30 + 7.6 * label.length)) + (shared ? 34 : 0);

/* ------------------------------------------------------------------ graph */

export interface Graph {
  g: StudioGraph;
  byId: Map<string, StudioNode>;
  adj: Map<string, Set<string>>;
  tables: string[];
}

export function graphOf(g: StudioGraph): Graph {
  const byId = new Map(g.nodes.map((n) => [n.id, n]));
  const adj = new Map<string, Set<string>>();
  for (const [a, b] of g.edges) {
    (adj.get(a) ?? adj.set(a, new Set()).get(a)!).add(b);
    (adj.get(b) ?? adj.set(b, new Set()).get(b)!).add(a);
  }
  return { g, byId, adj, tables: g.nodes.filter((n) => n.k === "table").map((n) => n.id) };
}

export interface BuiltView {
  layout: StudioLayout;
  /** the process view's steps, in order */
  columns?: ProcessColumn[];
  /** object views: tables of the chosen layers with no object of the view's kind */
  without?: string[];
  /** Fiori: tables of the chosen layers whose blueprint says no dedicated app */
  noApp?: string[];
  /** objects shared by six or more tables in the picture, with their count */
  shared?: Map<string, number>;
  /** board: how many tables each verdict holds (zeros included) */
  verdicts?: { k: S4Class | null; he: string; n: number }[];
}

const zoneRank = (G: Graph) => new Map(G.g.zones.map((z, i) => [z.id as string, i]));

export function buildView(view: ViewDef, G: Graph, layers: Set<string>, aspect: number): BuiltView {
  const { byId, adj, tables } = G;
  const tableSize = (id: string) => TABLE_SIZE[byId.get(id)?.t ?? "leaf"];
  const opts = { aspect, mirror: true };
  const inLayers = (id: string) => !layers.size || layers.has(byId.get(id)?.z ?? "");

  if (view.id === "business") {
    const isTable = (id: string) => byId.get(id)?.k === "table";
    const { layout, columns } = layoutProcess(G.g.flow, isTable, adj, tableSize, aspect);
    return { layout, columns };
  }

  if (view.id === "masterdata") {
    const hubs = G.g.master;
    const taken = new Set(hubs);
    const groups = hubs.map((hub) => {
      const near = [...(adj.get(hub) || [])].filter((n) => byId.get(n)?.k === "table" && !taken.has(n)).sort();
      for (const n of near) taken.add(n);
      return { id: hub, title: byId.get(hub)?.he || hub, members: [hub, ...near] };
    });
    return { layout: layoutGroupsBest(groups, adj, tableSize, opts) };
  }

  if (view.id === "eccs4") {
    const rank = zoneRank(G);
    const order = (a: string, b: string) => (rank.get(byId.get(a)?.z ?? "") ?? 99) - (rank.get(byId.get(b)?.z ?? "") ?? 99) || a.localeCompare(b);
    const cols = [
      ...S4_ORDER.map((k) => ({ k: k as S4Class | null, id: `s4-${k}`, title: S4_HE[k], members: tables.filter((t) => byId.get(t)!.s4 === k).sort(order) })),
      { k: null as S4Class | null, id: "s4-none", title: S4_UNDECIDED_HE, members: tables.filter((t) => byId.get(t)!.s4 === undefined).sort(order) },
    ];
    // unchanged is the long column: its cards at the quiet size, the rest larger
    const size = (id: string) => (byId.get(id)?.s4 === 0 ? BOARD_SIZE.quiet : BOARD_SIZE.loud);
    return {
      layout: layoutBoard(cols, adj, size, opts),
      verdicts: cols.map((c) => ({ k: c.k, he: c.title, n: c.members.length })),
    };
  }

  const zones = G.g.zones.filter((z) => !layers.size || layers.has(z.id));

  if (view.id === "tables") {
    // the zone's frame is drawn even for one layer: the panel says "each frame is a zone"
    const groups = zones.map((z) => ({ id: z.id, title: z.he, members: tables.filter((t) => byId.get(t)?.z === z.id) }));
    return { layout: layoutGroupsBest(groups, adj, tableSize, opts) };
  }

  // the object views
  const kinds = new Set<Kind>(view.objects);
  const isObject = (id: string) => { const n = byId.get(id); return !!n && kinds.has(n.k) && !n.none; };
  const inView = tables.filter(inLayers);
  const withObjects = inView.filter((t) => [...(adj.get(t) || [])].some(isObject));
  const without = inView.filter((t) => !withObjects.includes(t));
  const noApp = view.id === "fiori"
    ? inView.filter((t) => [...(adj.get(t) || [])].some((o) => byId.get(o)?.none))
    : undefined;
  const tableSet = new Set(withObjects);
  const objects = new Map<string, number>();   // object -> tables of the picture it serves
  for (const t of withObjects) for (const o of adj.get(t) || []) if (isObject(o)) objects.set(o, (objects.get(o) ?? 0) + 1);
  const shared = new Map([...objects].filter(([, n]) => n >= SHARED_MIN));
  const placed = new Set(shared.keys());
  const groups: GroupSpec[] = zones.map((z) => {
    const ts = withObjects.filter((t) => byId.get(t)?.z === z.id);
    const objs: string[] = [];
    for (const t of ts) for (const o of [...(adj.get(t) || [])].sort()) if (isObject(o) && !placed.has(o)) { placed.add(o); objs.push(o); }
    return { id: z.id, title: zones.length > 1 || shared.size ? z.he : "", members: [...ts, ...objs] };
  });
  if (shared.size) groups.unshift({ id: SHARED_ID, title: "משותפים", members: [...shared.keys()].sort() });
  // a table clusters with its own objects only; table-to-table relations and
  // a shared object's relations are drawn when one end is lit
  const layoutAdj = new Map<string, Set<string>>();
  for (const t of withObjects) for (const o of adj.get(t) || []) {
    if (!isObject(o) || shared.has(o)) continue;
    (layoutAdj.get(t) ?? layoutAdj.set(t, new Set()).get(t)!).add(o);
    (layoutAdj.get(o) ?? layoutAdj.set(o, new Set()).get(o)!).add(t);
  }
  const size = (id: string) => {
    const n = byId.get(id);
    if (!n || n.k === "table") return tableSize(id);
    return { w: objectWidth(n.l, shared.has(id)), h: 36 };
  };
  const drawn = new Set([...tableSet, ...placed]);
  const drawAdj = new Map<string, Set<string>>();
  for (const id of drawn) drawAdj.set(id, new Set([...(adj.get(id) || [])].filter((n) => drawn.has(n))));
  return {
    layout: layoutGroupsBest(groups.filter((g) => g.members.length), drawAdj, size, { ...opts, layoutAdj }),
    without,
    noApp,
    shared,
  };
}

/** The words for each kind of object, one and many. */
export const KIND_HE: Record<Kind, string> = {
  table: "טבלה", tcode: "טרנזקציה", bapi: "BAPI", fm: "FM", idoc: "IDoc", cds: "CDS View", fiori: "Fiori App",
};
export const KIND_HE_PLURAL: Record<Kind, string> = {
  table: "טבלאות", tcode: "טרנזקציות", bapi: "BAPIs", fm: "מודולי פונקציה", idoc: "IDocs", cds: "CDS Views", fiori: "יישומי Fiori",
};
