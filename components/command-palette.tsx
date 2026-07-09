"use client";

import { useEffect, useMemo, useState, useDeferredValue } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Table2, Terminal, Boxes, CornerDownLeft, ArrowLeft, BookText, GitBranch, BookMarked, Workflow, MapPin, Cable, FileCode, Network, Clock, Sparkles, Compass, Home, Wrench, FlaskConical, BrainCircuit, Library, AlertTriangle, Route, ShieldCheck, Orbit, LayoutDashboard } from "lucide-react";
import { searchAll, objectIntel } from "@/lib/data";
import { HR_TABLES } from "@/data/hr-module";
import { BW_TABLES } from "@/data/bw-module";
import { MIG_OBJECTS } from "@/data/migration-cockpit";
import { searchObjects } from "@/lib/object-intel";
import { searchVerified } from "@/data/verified-objects";
import { actionsFor, type ActionKind } from "@/lib/universal-actions";
import { searchFields, searchFioriApps } from "@/lib/extra-search";
import { lookupTCode } from "@/lib/tcode-index";
import type { Module } from "@/lib/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Highlight } from "@/components/highlight";
import { useI18n } from "@/lib/i18n";
import { playPing, playTick } from "@/lib/sound";
import { planQuery, beginnerIntent } from "@/lib/search-intel";
import { useFavorites, getRecentObjects } from "@/lib/prefs";
import { Star } from "lucide-react";

type FlatItem = { kind: "page" | "table" | "tcode" | "bapi" | "idoc" | "fm" | "cds" | "domain" | "process" | "library" | "ext" | "field" | "fiori"; label: string; sub: string; module: Module; href: string };

/* Launcher destinations — palette doubles as a Raycast-style navigator. */
type Page = { he: string; en: string; sub: string; href: string; kw: string; Icon: typeof Home };
const PAGES: Page[] = [
  { he: "ראשי", en: "Home", sub: "קוקפיט מיגרציה", href: "/", kw: "home cockpit ראשי דף בית", Icon: Home },
  { he: "אחזקה — PM", en: "Maintenance", sub: "Plant Maintenance · 58 טבלאות", href: "/pm/", kw: "pm maintenance אחזקה ציוד equipment", Icon: Wrench },
  { he: "ייצור — PP-PI", en: "Production", sub: "Process Industries · 68 טבלאות", href: "/pp-pi/", kw: "pp pi production ייצור אצווה batch recipe", Icon: FlaskConical },
  { he: "אקדמיית למידה", en: "Learning Academy", sub: "19 מסלולים · PM/PP-PI/QA", href: "/learn/", kw: "learn academy מסלול למידה אקדמיה course track", Icon: Compass },
  { he: "סיורים מודרכים", en: "Story Mode", sub: "תהליך מקצה לקצה", href: "/story/", kw: "story סיור מודרך process walkthrough guided", Icon: Workflow },
  { he: "מרכז השפעה", en: "Impact Center", sub: "ניתוח השפעה ומיגרציה", href: "/impact/", kw: "impact השפעה dependency blast radius מיגרציה", Icon: Route },
  { he: "מודל נתונים · ERD", en: "Data Model / ERD", sub: "ארכיטקטורת טבלאות", href: "/sap-infrastructure/", kw: "infra architecture ארכיטקטורה erd data model", Icon: Network },
  // Platform centers (Phase 5–9) — indexed so PFCG/SU53/ChaRM/CPI/RAP/etc resolve to their center
  { he: "מרכז ניהול פרויקט", en: "Project Delivery", sub: "SAP Activate · Cutover · בדיקות", href: "/delivery/", kw: "delivery מסירה פרויקט project sap activate discover prepare explore realize deploy run cutover blueprint workshop fit-to-standard wave defect", Icon: Compass },
  { he: "מרכז אינטגרציה", en: "Integration Center", sub: "IDoc · RFC · CPI · OData · Event Mesh", href: "/integration/", kw: "integration אינטגרציה ממשק interface idoc ale rfc trfc qrfc pi po cpi cloud integration integration suite odata api event mesh sxmb_moni smq", Icon: Cable },
  { he: "מרכז אבטחה והרשאות", en: "Security & Authorizations", sub: "PFCG · SU53 · STAUTHTRACE · IAM", href: "/security/", kw: "security אבטחה הרשאות authorization pfcg su01 su53 stauthtrace suim role profile sap_all s_rfc s_tcode s_service derived composite single role business role iam", Icon: ShieldCheck },
  { he: "מרכז ALM", en: "ALM Center", sub: "Solution Manager · Focused Build · Cloud ALM", href: "/alm/", kw: "alm application lifecycle solution manager solman focused build cloud alm charm itsm transport stms cts retrofit bpmon rca earlywatch work package release monitoring", Icon: Orbit },
  { he: "מרכז Fiori ו-UX", en: "Fiori & UX", sub: "UI5 · OData · RAP · Fiori Elements", href: "/fiori/", kw: "fiori ux ui5 odata rap cds mvc gateway segw iwfnd iwbep launchpad fact sheet analytical transactional metadata entity set service binding behavior definition fiori elements", Icon: LayoutDashboard },
  { he: "מרכז ידע", en: "Knowledge Center", sub: "38 מרכזים · חיפוש-תחילה", href: "/knowledge/", kw: "knowledge ידע מרכז centers", Icon: BrainCircuit },
  { he: "ספריית SAP", en: "Library", sub: "ספרים · אקדמיה", href: "/library/", kw: "library ספרייה ספרים books academy", Icon: Library },
  { he: "פתרון תקלות", en: "Troubleshooting", sub: "151 תקלות", href: "/troubleshooting/", kw: "trouble תקלות error שגיאה fix", Icon: AlertTriangle },
  { he: "תהליכי E2E", en: "Process Explorer", sub: "P2P · O2C · QM", href: "/process-explorer/", kw: "process תהליך e2e p2p o2c", Icon: Route },
  { he: "אבולוציה ECC→S/4", en: "Evolution", sub: "מיגרציה", href: "/evolution/", kw: "evolution ecc s4 מיגרציה migration", Icon: GitBranch },
  { he: "שושלת נתונים", en: "Data Lineage", sub: "מקור → אובייקט → צרכן", href: "/lineage/", kw: "lineage שושלת מקור צרכן data flow origin consumer", Icon: Route },
  { he: "Copilot", en: "Copilot", sub: "שאל את NEO", href: "/copilot/", kw: "copilot chat ai צ'אט שאל", Icon: Sparkles },
];

/* Curated entry prompts for first-time / empty state. */
const SUGGESTIONS = ["EQUI", "AUFK", "MRP", "אצווה", "IW31", "Fiori", "תקלה", "ECC"];

const RECENT_KEY = "neo:search:recent";

function ModuleTag({ m }: { m: Module }) {
  return (
    <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">{m}</span>
  );
}

function IntelRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{icon}{label}</span>
      {children}
    </div>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const { t, pick } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const loadRecent = () => { try { const r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); if (Array.isArray(r)) setRecent(r.slice(0, 6)); } catch { /* noop */ } };
  const pushRecent = (term: string) => {
    const v = term.trim();
    if (v.length < 2) return;
    setRecent((cur) => { const next = [v, ...cur.filter((x) => x.toLowerCase() !== v.toLowerCase())].slice(0, 6); try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* noop */ } return next; });
  };
  const clearRecent = () => { setRecent([]); try { localStorage.removeItem(RECENT_KEY); } catch { /* noop */ } };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("neo:open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("neo:open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) { playPing(); loadRecent(); }
    else {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const plan = useMemo(() => planQuery(q), [q]);
  const intent = useMemo(() => beginnerIntent(q), [q]);
  const favs = useFavorites();
  const recentObj = useMemo(() => (open ? getRecentObjects() : []), [open]);
  const sq = plan.search;          // effective search term (synonym-expanded)
  const hl = plan.highlight;       // terms to highlight (typed + alias)
  // Defer the expensive dataset queries so typing stays responsive (React 19
  // concurrent: input updates commit immediately, results catch up).
  const dsq = useDeferredValue(sq);

  const results = useMemo(() => searchAll(dsq), [dsq]);
  const intel = useMemo(() => (dsq.trim().length >= 2 ? objectIntel(dsq) : null), [dsq]);
  const tcode = useMemo(() => lookupTCode(dsq), [dsq]);

  const obj = useMemo(() => searchObjects(dsq), [dsq]);

  const pageHits = useMemo<Page[]>(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 1) return [];
    return PAGES.filter((p) => `${p.he} ${p.en} ${p.sub} ${p.kw}`.toLowerCase().includes(s)).slice(0, 5);
  }, [q]);

  const GROUPS = [
    { kind: "page", title: t("search.pages"), icon: Compass },
    { kind: "table", title: "טבלאות", icon: Table2 },
    { kind: "field", title: "שדות · Data Dictionary", icon: FileCode },
    { kind: "tcode", title: "T-Codes", icon: Terminal },
    { kind: "fiori", title: "אפליקציות Fiori", icon: LayoutDashboard },
    { kind: "bapi", title: "BAPIs", icon: Boxes },
    { kind: "idoc", title: "IDocs", icon: Cable },
    { kind: "fm", title: "Function Modules", icon: FileCode },
    { kind: "cds", title: "CDS Views", icon: FileCode },
    { kind: "domain", title: "תחומים", icon: Workflow },
    { kind: "process", title: "תהליכים", icon: Network },
    { kind: "ext", title: "HR · BW · הגירה", icon: Boxes },
    { kind: "library", title: t("search.library"), icon: BookText },
  ] as const;

  const extHits = useMemo<FlatItem[]>(() => {
    const s = dsq.trim().toLowerCase(); if (s.length < 2) return [];
    const out: FlatItem[] = [];
    HR_TABLES.filter((t) => `${t.name} ${t.he}`.toLowerCase().includes(s)).slice(0, 5).forEach((t) => out.push({ kind: "ext", label: t.name, sub: `HR · ${t.he}`, module: "PM", href: `/object/${encodeURIComponent(t.name)}` }));
    BW_TABLES.filter((t) => `${t.name} ${t.he}`.toLowerCase().includes(s)).slice(0, 5).forEach((t) => out.push({ kind: "ext", label: t.name, sub: `BW · ${t.he}`, module: "PM", href: `/object/${encodeURIComponent(t.name)}` }));
    MIG_OBJECTS.filter((m) => `${m.name} ${m.he}`.toLowerCase().includes(s)).slice(0, 5).forEach((m) => out.push({ kind: "ext", label: m.name, sub: `הגירה · ${m.he}`, module: "PM", href: "/migration-cockpit/" }));
    return out;
  }, [dsq]);

  // verified supplemental registry — real cross-module/LE/HU objects outside the
  // PM/PP-PI blueprint (VEKP/Handling Unit, deliveries, WM, SD, FI…), searchable
  // by technical name · business name · abbreviation · jargon · he/en alias.
  const verifiedHits = useMemo<FlatItem[]>(() => {
    const s = dsq.trim(); if (s.length < 2) return [];
    return searchVerified(s).slice(0, 8).map((o) => ({ kind: "table" as const, label: o.name, sub: `${o.primary} · ${o.he}`, module: o.primary as Module, href: `/object/${encodeURIComponent(o.name)}` }));
  }, [dsq]);

  // fields (Data Dictionary) + full Fiori Apps index
  const fieldHits = useMemo<FlatItem[]>(() => searchFields(dsq).map((f) => ({ kind: "field" as const, label: f.field, sub: `${f.he || f.en} · טבלה ${f.table}`, module: f.module as Module, href: `/object/${encodeURIComponent(f.table)}/` })), [dsq]);
  const fioriHits = useMemo<FlatItem[]>(() => searchFioriApps(dsq).map((a) => ({ kind: "fiori" as const, label: a.id, sub: `${a.name} · ${a.type}`, module: "PP-PI" as Module, href: `/library/academy/fiori/` })), [dsq]);

  const flat = useMemo<FlatItem[]>(() => {
    const out: FlatItem[] = [];
    for (const p of pageHits) out.push({ kind: "page", label: pick(p.he, p.en), sub: p.sub, module: "PM", href: p.href });
    const add = (k: FlatItem["kind"], arr: typeof obj.table) => arr.forEach((h) => out.push({ kind: k, label: h.label, sub: h.sub, module: (h.module || "PM") as Module, href: h.href }));
    add("table", obj.table); add("tcode", obj.tcode); add("bapi", obj.bapi); add("idoc", obj.idoc); add("fm", obj.fm); add("cds", obj.cds); add("domain", obj.domain); add("process", obj.process);
    for (const v of verifiedHits) if (!out.some((o) => o.kind === "table" && o.label === v.label)) out.push(v);
    out.push(...fieldHits, ...fioriHits, ...extHits);
    for (const l of results.library) out.push({ kind: "library", label: l.id, sub: l.title, module: "PM", href: l.href });
    return out;
  }, [obj, results.library, pageHits, pick, extHits, verifiedHits, fieldHits, fioriHits]);

  useEffect(() => setActive(0), [q]);

  function go(href: string, term?: string) {
    playPing();
    pushRecent(q);
    setOpen(false);
    const find = (term || sq || q).trim();
    const dest = find.length >= 2 && !href.includes("?") && !href.includes("#") ? `${href}?find=${encodeURIComponent(find)}` : href;
    router.push(dest);
    if (find.length >= 2) setTimeout(() => window.dispatchEvent(new CustomEvent("neo:find", { detail: find })), 60);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
      playTick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
      playTick();
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      const it = flat[active];
      go(it.href, it.kind === "page" ? undefined : it.label);
    }
  }

  let runningIndex = -1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass overflow-hidden p-0 shadow-2xl bottom-0 inset-x-0 top-auto start-0 w-full max-w-full translate-x-0 rtl:translate-x-0 rounded-2xl rounded-b-none pb-[env(safe-area-inset-bottom)] data-[state=open]:slide-in-from-bottom-4 sm:bottom-auto sm:inset-x-auto sm:top-[12vh] sm:start-1/2 sm:w-[92vw] sm:max-w-2xl sm:-translate-x-1/2 sm:rtl:translate-x-1/2 sm:rounded-2xl sm:pb-0">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Tables, T-Codes, Interfaces</DialogDescription>
        </VisuallyHidden>

        {/* mobile grip handle */}
        <div className="mx-auto mt-2 h-1.5 w-11 shrink-0 rounded-full bg-slate-200 sm:hidden" />

        {/* input */}
        <div className="flex items-center gap-3 border-b border-border/60 px-5">
          <Search className="size-5 shrink-0 text-brand" />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={t("search.placeholder")}
            className="h-14 w-full rounded-lg bg-transparent text-lg outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/30 placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-muted/70 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:block">ESC</kbd>
        </div>

        {/* Object Intelligence card — search as navigation engine */}
        <AnimatePresence>
          {intel && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-b border-border/60 bg-gradient-to-bl from-brand-soft/70 to-transparent">
              <div className="space-y-3 p-4" dir="rtl">
                {/* header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="tech rounded-lg bg-brand px-2.5 py-1 text-base font-extrabold text-brand-foreground" dir="ltr">{intel.table.tableName}</span>
                    <div className="leading-tight">
                      <div className="text-[11px] font-bold text-slate-500">{intel.type} · <ModuleTag m={intel.table.module} /></div>
                      <div className="text-xs text-slate-600">{pick(intel.table.descriptionHe, intel.table.descriptionEn)}</div>
                    </div>
                  </div>
                  <button onClick={() => go(`/object/${encodeURIComponent(intel.table.tableName)}`, intel.table.tableName)} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-bold text-brand-foreground shadow-lg shadow-brand/30 transition hover:bg-brand-dark active:scale-95"><Workflow className="size-3.5" /> סביבת עבודה</button>
                </div>
                {/* counts strip */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[["הפניות", intel.counts.references], ["תהליכים", intel.counts.processes], ["ספרים", intel.counts.books], ["מקושרים", intel.counts.related]].map(([l, n]) => (
                    <div key={l as string} className="rounded-lg border border-border/60 bg-white/70 px-2 py-1.5 text-center">
                      <div className="font-mono text-lg font-extrabold text-brand">{n as number}</div>
                      <div className="eyebrow text-slate-400">{l as string}</div>
                    </div>
                  ))}
                </div>
                {/* found in */}
                <IntelRow icon={<MapPin className="size-3" />} label="נמצא ב">
                  {intel.foundIn.map((f) => <button key={f.label} onClick={() => go(f.href)} className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200 transition hover:ring-brand">✓ {f.label}</button>)}
                </IntelRow>
                {intel.related.length > 0 && (
                  <IntelRow icon={<GitBranch className="size-3" />} label="אובייקטים קשורים">
                    {intel.related.slice(0, 8).map((r) => <button key={r} onClick={() => setQ(r)} className="tech rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-brand ring-1 ring-slate-200 transition hover:ring-brand" dir="ltr">{r}</button>)}
                  </IntelRow>
                )}
                {intel.tcodes.length > 0 && (
                  <IntelRow icon={<Terminal className="size-3" />} label="T-Codes">
                    {intel.tcodes.map((c) => <span key={c} className="tech rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600" dir="ltr">{c}</span>)}
                  </IntelRow>
                )}
                {intel.bapis.length > 0 && (
                  <IntelRow icon={<Boxes className="size-3" />} label="BAPIs / FM">
                    {intel.bapis.map((c) => <span key={c} className="tech rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600" dir="ltr">{c}</span>)}
                  </IntelRow>
                )}
                <IntelRow icon={<Workflow className="size-3" />} label="תהליך">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{intel.process}</span>
                </IntelRow>
                {intel.books.length > 0 && (
                  <IntelRow icon={<BookMarked className="size-3" />} label="ספרים">
                    {intel.books.map((bk) => <button key={bk} onClick={() => go("/library/book1/")} className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200 hover:ring-brand">{bk}</button>)}
                  </IntelRow>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* T-Code intelligence pop-up card */}
        <AnimatePresence>
          {tcode && !intel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-border/60 bg-brand-soft/60"
            >
              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="tech rounded-md bg-brand px-2 py-0.5 text-sm font-bold text-brand-foreground">{tcode.code}</span>
                    <ModuleTag m={tcode.module} />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">{pick(tcode.descHe, tcode.descEn)}</p>
                  {tcode.tables.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t("tcode.usedBy")}:{" "}
                      <span className="tech font-semibold text-brand">{tcode.tables.join(", ")}</span>
                    </p>
                  )}
                </div>
                {tcode.tables.length > 0 && (
                  <button
                    onClick={() => go(tcode.href, tcode.code)}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark active:scale-95"
                  >
                    {t("tcode.viewTables")}
                    <ArrowLeft className="size-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* beginner-intent card — natural-language question → explanation + next action */}
        {intent && (
          <div className="mx-3 mt-2 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-3" dir="rtl">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-amber-400 text-amber-950"><Sparkles className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium leading-relaxed text-amber-900">{intent.he}</p>
              <button onClick={() => { if (intent.href) go(intent.href); else { setOpen(false); window.dispatchEvent(new Event("neo:open-guide")); } }}
                className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-amber-600">
                {intent.action}<CornerDownLeft className="size-3" />
              </button>
            </div>
          </div>
        )}

        {/* results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          <AnimatePresence mode="wait">
            {q.trim() === "" ? (
              <motion.div key="zero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 p-2" dir="rtl">
                {favs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-600"><Star className="size-3.5 fill-amber-400 text-amber-500" />מועדפים</div>
                    <div className="flex flex-wrap gap-1.5 px-3">
                      {favs.slice(0, 12).map((n) => (
                        <button key={n} onClick={() => go(`/object/${encodeURIComponent(n)}`, n)} className="tech inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 transition-all hover:-translate-y-px hover:border-amber-400 active:scale-95" dir="ltr">
                          <Star className="size-3 fill-amber-400 text-amber-500" />{n}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {recentObj.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"><Boxes className="size-3.5" />אובייקטים אחרונים</div>
                    <div className="flex flex-wrap gap-1.5 px-3">
                      {recentObj.slice(0, 10).map((n) => (
                        <button key={n} onClick={() => go(`/object/${encodeURIComponent(n)}`, n)} className="tech inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-px hover:border-brand/40 hover:text-brand active:scale-95" dir="ltr">
                          <Boxes className="size-3 opacity-50" />{n}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {recent.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"><Clock className="size-3.5" />{t("search.recent")}</span>
                      <button onClick={clearRecent} className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-slate-400 transition-colors hover:bg-muted/70 hover:text-brand">{t("search.recent.clear")}</button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-3">
                      {recent.map((r) => (
                        <button key={r} onClick={() => setQ(r)} className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand/30 hover:text-brand">
                          <Clock className="size-3 opacity-50" /><span dir="auto">{r}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"><Sparkles className="size-3.5" />{t("search.suggested")}</div>
                  <div className="flex flex-wrap gap-1.5 px-3">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} onClick={() => setQ(s)} className="rounded-lg border border-border/60 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-px hover:border-brand/40 hover:text-brand" dir="auto">{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"><Compass className="size-3.5" />{t("search.jump")}</div>
                  <div className="grid grid-cols-1 gap-1.5 px-3 sm:grid-cols-2">
                    {PAGES.slice(0, 6).map((p) => (
                      <button key={p.href} onClick={() => go(p.href)} className="group flex items-center gap-3 rounded-xl border border-border/60 bg-white px-3 py-2.5 text-start shadow-sm transition-all hover:-translate-y-px hover:border-brand/30">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105"><p.Icon className="size-4" /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-slate-800">{pick(p.he, p.en)}</span>
                          <span className="block truncate text-[11px] font-medium text-slate-400">{p.sub}</span>
                        </span>
                        <ArrowLeft className="size-3.5 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-brand" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : flat.length === 0 && !intel && !tcode ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 px-4 py-10 text-center">
                <span className="grid size-12 place-items-center rounded-2xl bg-muted/60 text-slate-300"><Search className="size-6" /></span>
                {/^[A-Za-z][A-Za-z0-9_/]{2,}$/.test(q.trim())
                  ? <p className="max-w-sm text-sm text-slate-500">אין מטא-דאטה מאומת עדיין ל-<span className="tech font-bold text-slate-700" dir="ltr">{q.trim().toUpperCase()}</span>. ייתכן שהאובייקט קיים ב-SAP אך טרם תועד כאן — <b>לא ממציאים נתונים</b>. נסה שם עסקי, כינוי או אובייקט מהרשימה:</p>
                  : <p className="text-sm text-muted-foreground">{t("search.empty")} — <span className="font-bold text-slate-600" dir="auto">&quot;{q}&quot;</span></p>}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {SUGGESTIONS.slice(0, 5).map((s) => (
                    <button key={s} onClick={() => setQ(s)} className="rounded-lg border border-border/60 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-px hover:border-brand/40 hover:text-brand" dir="auto">{s}</button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                <div aria-live="polite" className="sticky top-0 z-10 mb-1 flex flex-wrap items-center gap-2 border-b border-border/50 bg-white/80 px-3 py-2 backdrop-blur-sm">
                  <motion.span key={flat.length} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 24 }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-extrabold text-brand">
                    <Search className="size-3.5" />נמצאו {flat.length + (intel ? 1 : 0) + (tcode && !intel ? 1 : 0)} תוצאות
                  </motion.span>
                  {plan.note && <span className="inline-flex items-center gap-1 rounded-lg bg-yellow-100 px-2 py-1 text-[11px] font-bold text-yellow-800"><Sparkles className="size-3" />{plan.note}</span>}
                </div>
                {GROUPS.map(({ kind, title, icon: Icon }) => {
                  const items = flat.filter((f) => f.kind === kind);
                  if (!items.length) return null;
                  return (
                    <div key={kind} className="mb-1">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        <Icon className="size-3.5" />
                        {title}
                        <span className="text-muted-foreground/60">· {items.length}</span>
                      </div>
                      {items.map((item) => {
                        runningIndex++;
                        const idx = runningIndex;
                        const isActive = idx === active;
                        const acts = isActive ? actionsFor(item.kind as ActionKind, item.label, item.module) : [];
                        return (
                          <div key={`${item.kind}-${item.label}-${idx}`} className={`rounded-xl transition-colors ${isActive ? "bg-brand/10" : "hover:bg-muted/70"}`}>
                            <button
                              onMouseEnter={() => setActive(idx)}
                              onClick={() => go(item.href, item.kind === "page" ? undefined : item.label)}
                              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start"
                            >
                              {item.kind === "page" && <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand"><Compass className="size-3.5" /></span>}
                              <span className={item.kind === "page" ? "shrink-0 text-sm font-bold text-foreground" : `tech shrink-0 text-sm font-bold ${item.kind === "table" ? "text-brand" : "text-foreground"}`}>
                                <Highlight text={item.label} query={hl} />
                              </span>
                              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                                <Highlight text={item.sub} query={hl} />
                              </span>
                              {item.kind === "page" ? <ArrowLeft className="size-3.5 shrink-0 text-slate-300" /> : <ModuleTag m={item.module} />}
                              {isActive && <CornerDownLeft className="size-3.5 shrink-0 text-brand" />}
                            </button>
                            {/* Universal Actions — direct routes for the active result */}
                            {acts.length > 0 && (
                              <div className="flex flex-wrap gap-1 px-3 pb-2.5 pt-0.5">
                                {acts.map((a) => { const AIcon = a.icon; return (
                                  <button key={a.label} onClick={() => go(a.href, item.label)} className="tap inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand">
                                    <AIcon className="size-3" />{a.label}
                                  </button>
                                ); })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer hint */}
        <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-border bg-muted/70 px-1">↑</kbd>
            <kbd className="rounded border border-border bg-muted/70 px-1">↓</kbd>
            {t("search.nav")}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted/70 px-1">↵</kbd>
            {t("search.open")}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
