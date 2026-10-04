/* ============================================================================
   PROJECT NEO · /neo/academy/tracks — the learning tracks, built at BUILD time.
   ----------------------------------------------------------------------------
   The old /learn/ pages, one to one. Server only. Every value is read from the
   modules those pages read, and derived the way components/learn-home.tsx and
   components/learn-path.tsx derived it:

     the tracks        data/learn/paths (LEARN_PATHS, LEARN_CATEGORIES)
     consultant note   lib/knowledge knowledgeFor(object): role, whenUsed, trust
     in the org        data/troubleshooting: the first incident that lists the
                       object among its tables and carries a scenario
     interview         data/knowledge/interview interviewFor(object)[0]
     ECC vs S/4HANA    lib/s4 s4For(object, table.s4Note, table.s4AltTable)
     related objects   lib/data objectIntel(object).related, the first 10

   The old screen showed one step at a time; here every step is built. Nothing
   is authored. Progress, streak and "סמן כהושלם" were per-device state of the
   old screen and are not carried.
   ========================================================================== */

import { LEARN_CATEGORIES, LEARN_PATHS, type LearnStep } from "@/data/learn/paths";
import { IMPORTANCE_HE, TRUST_NOTE, knowledgeFor } from "@/lib/knowledge";
import { interviewFor } from "@/data/knowledge/interview";
import { INCIDENTS } from "@/data/troubleshooting";
import { objectIntel } from "@/lib/data";
import { RISK_COLOR, RISK_HE, TRUST_HE, s4For } from "@/lib/s4";
import { TRUST_COLOR, objectHref } from "@/components/neo-shell/reference/ref-links";

export const TRACKS_HREF = "/neo/academy/tracks/";
export const trackHref = (id: string): string => `${TRACKS_HREF}${id}/`;

/** Where each legacy address a step or card links to lands today: the
 *  destination vercel.json redirects it to (test/legacy-link-maps.test.ts
 *  holds the two together). /learn/ is this index. These are the only
 *  addresses data/learn/paths holds besides /troubleshooting/<slug>/, resolved
 *  below. */
export const NEO_HREF: Record<string, string> = {
  "/learn/": TRACKS_HREF,
  "/story/": "/neo/story/",
  "/story/pm-maintenance/": "/neo/story/pm-maintenance/",
  "/story/pppi-process-order/": "/neo/story/pppi-process-order/",
  "/impact/": "/neo/tables/",
  "/impact/AUFK/": "/neo/tables/AUFK/",
  "/impact/EQUI/": "/neo/tables/EQUI/",
  "/impact/AFKO/": "/neo/tables/AFKO/",
  "/sap-infrastructure/": "/neo/sap-infrastructure/",
  "/qa-testing/": "/neo/qa-testing/",
  "/qa-testing/pppi-process-order-lifecycle/": "/neo/qa-testing/pppi-process-order-lifecycle/",
  "/troubleshooting/": "/neo/incidents/",
  "/certification/": "/neo/certification/",
};

/** /troubleshooting/<slug>/ redirects to /neo/incidents/<slug>/, which is
 *  generated for every INCIDENTS slug (incidents-data incidentSlugs). */
export function neoHref(legacy: string): string | null {
  const m = /^\/troubleshooting\/([^/]+)\/$/.exec(legacy);
  if (m) return INCIDENTS.some((i) => i.slug === m[1]) ? `/neo/incidents/${m[1]}/` : null;
  return NEO_HREF[legacy] ?? null;
}

/** components/learn-path.tsx audienceOf, verbatim. */
const audienceOf = (id: string): string =>
  id.startsWith("pm") ? "תחזוקה · יועץ PM · Support" :
  id.startsWith("pp") ? "ייצור · יועץ PP-PI · מתכנן" :
  id.startsWith("qa") ? "QA · בודק · יועץ הטמעה" :
  "יועץ חדש · כל התפקידים";

/** components/learn-path.tsx STORY: the track whose dashboard offered the guided tour. */
const STORY: Record<string, string> = { pm: "/story/pm-maintenance/", "pp-pi": "/story/pppi-process-order/" };

/** The module a category's tracks teach, for the --mod-* identity line only. */
const CAT_MOD: Record<string, string> = { pm: "PM", pppi: "PP-PI" };

/** The knowledge base's own trust words (lib/knowledge TRUST_NOTE) on --status-*. */
const KNOW_TRUST: Record<string, string> = { curated: "var(--status-tested)", "needs-verification": "var(--status-not-started)" };

const hoursOf = (s?: string): number => { const m = (s || "").match(/(\d+)/); return m ? +m[1] : 0; };

/* ------------------------------------------------------------------ types */

export interface TrackStatus { he: string; s: string }
export interface TrackRef { code: string; href: string | null }
export interface TrackLink { label: string; href: string | null }

export interface TrackStep {
  id: string;
  n: number;
  title: string;
  why: string;
  importance: string;
  object?: string;
  objectHref: string | null;
  module?: string;
  knowledge?: { role: string; when: string; trust: TrackStatus };
  scenario?: string;
  interview?: { q: string; a?: string };
  s4?: { risk: TrackStatus; trust: TrackStatus; text: string };
  related: TrackRef[];
  link?: TrackLink;
}

export interface TrackCard {
  id: string;
  href: string;
  he: string;
  sub: string;
  level?: string;
  durationHe?: string;
  units: number;
  objects: number;
}

export interface TrackPage extends TrackCard {
  audience: string;
  note?: string;
  cat: { id: string; he: string };
  mod?: string;
  story: TrackLink | null;
  steps: TrackStep[];
}

export interface TrackCategory {
  id: string;
  he: string;
  sub: string;
  mod?: string;
  tracks: TrackCard[];
  units: number;
  hours: number;
  level: string;
}

export interface TracksIndex {
  categories: TrackCategory[];
  totals: { tracks: number; units: number };
  cert: TrackLink;
  story: TrackLink;
}

/* ---------------------------------------------------------------- builders */

function stepOf(s: LearnStep): TrackStep {
  const o = s.object;
  const intel = o ? objectIntel(o) : null;
  const k = o ? knowledgeFor(o) : undefined;
  const iq = o ? interviewFor(o)[0] : undefined;
  const scenario = o ? INCIDENTS.filter((i) => i.tables.includes(o)).find((i) => i.scenario)?.scenario : undefined;
  const s4 = o && intel ? s4For(o, intel.table.s4Note, intel.table.s4AltTable) : null;
  const kTrust = k ? { he: TRUST_NOTE[k.trust], s: KNOW_TRUST[k.trust] } : null;
  return {
    id: s.id,
    n: s.n,
    title: s.titleHe,
    why: s.whyHe,
    importance: IMPORTANCE_HE[s.importance],
    object: o,
    objectHref: o ? objectHref(o) : null,
    module: intel?.table.module,
    knowledge: k && kTrust ? { role: k.role, when: k.whenUsed, trust: kTrust } : undefined,
    scenario,
    interview: iq ? { q: iq.q, a: iq.aHe } : undefined,
    // The old block's own condition and its own sentence order. The trust word
    // follows the sentence actually shown: the knowledge base's S/4 line is
    // curated text, lib/s4's is the resolver's.
    s4: s4 && (s4.impact || s4.impacted) ? {
      risk: { he: RISK_HE[s4.risk], s: RISK_COLOR[s4.risk] },
      trust: k?.s4 && kTrust ? kTrust : { he: TRUST_HE[s4.trust], s: TRUST_COLOR[s4.trust] },
      text: k?.s4 || s4.impact?.changed || "אין שינוי מהותי ידוע — נדרש אימות מול Simplification List.",
    } : undefined,
    related: (intel?.related || []).slice(0, 10).map((code) => ({ code, href: objectHref(code) })),
    link: s.href ? { label: s.linkLabel || "פתח", href: neoHref(s.href) } : undefined,
  };
}

function cardOf(id: string): TrackCard | null {
  const p = LEARN_PATHS[id];
  if (!p) return null;
  return {
    id,
    href: trackHref(id),
    he: p.he,
    sub: p.sub,
    level: p.level,
    durationHe: p.durationHe,
    units: p.steps.length,
    objects: p.steps.filter((s) => s.object).length,
  };
}

export const trackIds = (): string[] => Object.keys(LEARN_PATHS);

export function trackPage(id: string): TrackPage | null {
  const card = cardOf(id);
  if (!card) return null;
  const p = LEARN_PATHS[id];
  const cat = LEARN_CATEGORIES.find((c) => c.tracks.includes(id));
  return {
    ...card,
    audience: audienceOf(id),
    note: p.note,
    cat: { id: cat?.id ?? "", he: cat?.he ?? "" },
    mod: cat ? CAT_MOD[cat.id] : undefined,
    story: STORY[id] ? { label: "סיור מודרך בתהליך", href: neoHref(STORY[id]) } : null,
    steps: p.steps.map(stepOf),
  };
}

export function tracksIndex(): TracksIndex {
  const categories = LEARN_CATEGORIES.map((c): TrackCategory => {
    const tracks = c.tracks.map(cardOf).filter((t): t is TrackCard => !!t);
    const levels = tracks.map((t) => t.level).filter((l): l is string => !!l);
    // learn-home.tsx: the level most of the category's tracks declare.
    const level = [...levels].sort((a, b) => levels.filter((x) => x === b).length - levels.filter((x) => x === a).length)[0] || "מעורב";
    return {
      id: c.id,
      he: c.he,
      sub: c.sub,
      mod: CAT_MOD[c.id],
      tracks,
      units: tracks.reduce((n, t) => n + t.units, 0),
      hours: tracks.reduce((n, t) => n + hoursOf(t.durationHe), 0),
      level,
    };
  });
  return {
    categories,
    totals: {
      tracks: categories.reduce((n, c) => n + c.tracks.length, 0),
      units: categories.reduce((n, c) => n + c.units, 0),
    },
    cert: { label: "מרכז ההסמכה · NEO Certification", href: neoHref("/certification/") },
    story: { label: "סיור מודרך בתהליך · Story Mode", href: neoHref("/story/") },
  };
}
