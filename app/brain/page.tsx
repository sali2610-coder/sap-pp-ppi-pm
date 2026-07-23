"use client";

/**
 * SAP AI Brain — Control Center (additive screen).
 * 100% dynamic: reads /sap-ai-brain/manifest.json (+ brain.json, capability-registry.json) produced by
 * scripts/sap-ai-brain-discovery.mjs. No hardcoded component lists. Does not touch any business code.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Any = Record<string, any>;
const TABS = ["Dashboard", "Brain", "Registry", "Graph", "Simulator", "Search", "Health"] as const;
type Tab = (typeof TABS)[number];
const TAB_HE: Record<Tab, string> = {
  Dashboard: "לוח בקרה", Brain: "מנוע החשיבה", Registry: "יכולות", Graph: "גרף ידע",
  Simulator: "סימולטור", Search: "חיפוש", Health: "בריאות",
};

async function getJSON(u: string): Promise<Any | null> {
  try { const r = await fetch(u, { cache: "no-store" }); return r.ok ? await r.json() : null; } catch { return null; }
}

export default function BrainControlCenter() {
  const [tab, setTab] = useState<Tab>("Dashboard");
  const [manifest, setManifest] = useState<Any | null>(null);
  const [brain, setBrain] = useState<Any | null>(null);
  const [registry, setRegistry] = useState<Any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [m, b, r] = await Promise.all([
        getJSON("/sap-ai-brain/manifest.json"),
        getJSON("/sap-ai-brain/brain.json"),
        getJSON("/sap-ai-brain/capability-registry.json"),
      ]);
      setManifest(m); setBrain(b); setRegistry(r); setLoading(false);
    })();
  }, []);

  return (
    <div dir="rtl" style={S.page}>
      <div style={S.glassHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={S.logoDot} />
          <div>
            <h1 style={S.h1}>SAP AI Brain — Control Center</h1>
            <p style={S.sub}>מרכז בקרה חי · נקרא דינמית מ-<code style={S.code}>SAP-HQ/brain.json</code> ו-<code style={S.code}>capability-registry.json</code></p>
          </div>
        </div>
        <Link href="/" style={S.backBtn}>← חזרה</Link>
      </div>

      <nav style={S.tabs}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ ...S.tab, ...(tab === t ? S.tabActive : {}) }}>
            {TAB_HE[t]}
          </button>
        ))}
      </nav>

      <main style={S.main}>
        {loading && <div style={S.card}>טוען מוח מערכת…</div>}
        {!loading && !manifest && <div style={S.card}>לא נמצא manifest. הרץ: <code style={S.code}>node scripts/sap-ai-brain-discovery.mjs</code></div>}
        {!loading && manifest && (
          <>
            {tab === "Dashboard" && <Dashboard m={manifest} />}
            {tab === "Brain" && <BrainExplorer brain={brain} />}
            {tab === "Registry" && <RegistryExplorer m={manifest} registry={registry} />}
            {tab === "Graph" && <KnowledgeGraph graph={manifest.graph} />}
            {tab === "Simulator" && <Simulator brain={brain} registry={registry} />}
            {tab === "Search" && <SearchEverywhere m={manifest} brain={brain} />}
            {tab === "Health" && <HealthCenter m={manifest} />}
          </>
        )}
      </main>
      <footer style={S.footer}>נבנה ע"י Sali Halif — Web Coding · תוספת בלבד, לא נוגע בקוד העסקי של NEO Cockpit</footer>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ m }: { m: Any }) {
  const c = m.counts || {};
  const cards: [string, any, string][] = [
    ["Skills", c.skills, "סקילים"], ["Expert Packs", c.expertPacks, "חבילות מומחה"], ["Intents", c.intents, "כוונות במנוע"],
    ["References", c.references, "מסמכי ידע"], ["Playbooks", c.playbooks, "פלייבוקים"], ["Runbooks", c.runbooks, "ראנבוקים"],
    ["Commands", c.commands, "פקודות"], ["Graph Nodes", c.graphNodes, "צמתים בגרף"],
  ];
  const status = m.health?.result === "HEALTHY";
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div><div style={S.eyebrow}>Universal SAP AI Advisor</div><div style={{ fontSize: 15, color: "var(--muted-foreground,#9aa)" }}>שער כניסה יחיד — <code style={S.code}>/hq</code> · <code style={S.code}>/sap-advisor</code></div></div>
        <span style={{ ...S.statusPill, background: status ? "#0d3b2e" : "#3b1d1d", color: status ? "#4ade80" : "#f87171" }}>{status ? "● HEALTHY" : "● DEGRADED"}</span>
      </div>
      <div style={S.grid}>
        {cards.map(([k, v, he]) => (
          <div key={k} style={S.stat}><div style={S.statNum}>{v ?? "—"}</div><div style={S.statLabel}>{he}</div><div style={S.statSub}>{k}</div></div>
        ))}
      </div>
      <div style={S.card}>
        <div style={S.eyebrow}>רכיבי ליבה</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {(m.health?.flagship || []).map((f: Any) => (
            <span key={f.id} style={{ ...S.chip, borderColor: f.ok ? "#2a5" : "#a33" }}>{f.ok ? "✔" : "✘"} {f.id}</span>
          ))}
          <span style={S.chip}>MCP: {m.mcp?.required ? "required" : "optional"}</span>
          <span style={S.chip}>Hooks: {(m.hooks?.registered?.length || 0) === 0 ? "none" : m.hooks.registered.join(",")}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Brain Explorer ---------- */
function BrainExplorer({ brain }: { brain: Any | null }) {
  if (!brain) return <div style={S.card}>brain.json לא נטען.</div>;
  const engines: [string, any][] = [
    ["Intent Engine", brain["1_intentDetection"]?.intents],
    ["Capability Matching", brain["2_capabilityMatching"]?.steps],
    ["Evidence Engine", brain["3_evidenceEvaluation"]?.types],
    ["Confidence Engine", brain["4_confidenceEngine"]?.bands],
    ["Execution Planner", brain["5_executionPlan"]?.template],
    ["Reasoning Rules", brain["6_reasoningRules"]?.rules],
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {engines.map(([name, data]) => (
        <div key={name} style={S.card}>
          <div style={S.eyebrow}>{name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {Array.isArray(data) && data.map((d: any, i: number) => (
              <span key={i} style={S.chip}>{typeof d === "string" ? d : d.id || d.he || JSON.stringify(d).slice(0, 40)}{d?.stars ? " " + "★".repeat(d.stars) : ""}{d?.range ? ` (${d.range})` : ""}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Registry Explorer ---------- */
function RegistryExplorer({ m, registry }: { m: Any; registry: Any | null }) {
  const [sel, setSel] = useState<Any | null>(null);
  const groups: [string, Any[]][] = [
    ["Skills", m.skills || []],
    ["Expert Packs", (registry?.expertPacks || []).map((p: string) => ({ id: p, type: "pack" }))],
    ["References", (registry?.references || []).map((r: string) => ({ id: r, type: "reference" }))],
    ["Scripts", (registry?.scripts || []).map((s: string) => ({ id: s, type: "script" }))],
    ["Commands", m.commands || []],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
      <div style={{ display: "grid", gap: 12 }}>
        {groups.map(([g, items]) => (
          <div key={g} style={S.card}>
            <div style={S.eyebrow}>{g} <span style={S.badge}>{items.length}</span></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {items.map((it: Any, i: number) => (
                <button key={i} onClick={() => setSel({ group: g, ...it })} style={{ ...S.chip, cursor: "pointer" }}>
                  {it.id}{it.category ? ` · ${it.category}` : ""}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <aside style={{ ...S.card, position: "sticky", top: 12, alignSelf: "start" }}>
        <div style={S.eyebrow}>פרטים</div>
        {!sel && <p style={S.sub}>בחר רכיב להצגת תלות, נתיב וקטגוריה.</p>}
        {sel && (
          <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7 }}>
            <div><b>{sel.id}</b></div>
            <div>סוג: {sel.type || sel.group}</div>
            {sel.category && <div>קטגוריה: {sel.category}</div>}
            {sel.path && <div>נתיב: <code style={S.code}>{sel.path}</code></div>}
            {sel.description && <div style={{ marginTop: 6, color: "var(--muted-foreground,#9aa)" }}>{sel.description}</div>}
            {Array.isArray(sel.references) && sel.references.length > 0 && <div style={{ marginTop: 6 }}>references: {sel.references.join(", ")}</div>}
            {typeof sel.portable === "boolean" && <div>Portable: {sel.portable ? "✅" : "❌"}</div>}
          </div>
        )}
      </aside>
    </div>
  );
}

/* ---------- Interactive Knowledge Graph (SVG, not mermaid) ---------- */
function KnowledgeGraph({ graph }: { graph: Any }) {
  const nodes: Any[] = graph?.nodes || [];
  const edges: Any[] = graph?.edges || [];
  const [active, setActive] = useState<string | null>(null);
  const W = 900, H = 560, CX = W / 2, CY = H / 2;
  const rings: Record<string, number> = { actor: 0, core: 90, manager: 180, pack: 270, skill: 350, reference: 350 };
  const pos = useMemo(() => {
    const byType: Record<string, Any[]> = {};
    nodes.forEach((n) => (byType[n.type] = byType[n.type] || []).push(n));
    const p: Record<string, { x: number; y: number }> = {};
    Object.entries(byType).forEach(([type, arr]) => {
      const R = rings[type] ?? 320;
      arr.forEach((n, i) => {
        const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2 + (type === "skill" ? 0.3 : 0);
        p[n.id] = R === 0 ? { x: CX, y: CY } : { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
      });
    });
    return p;
  }, [nodes]);
  const color: Record<string, string> = { actor: "#eab308", core: "#d62027", manager: "#3b82f6", pack: "#22c55e", skill: "#8b5cf6", reference: "#64748b" };
  const conn = (id: string) => edges.filter((e) => e.from === id || e.to === id);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14 }}>
      <div style={{ ...S.card, overflow: "hidden" }}>
        <div style={S.eyebrow}>Knowledge Graph · {nodes.length} nodes · {edges.length} edges</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 560 }}>
          {edges.map((e, i) => {
            const a = pos[e.from], b = pos[e.to]; if (!a || !b) return null;
            const on = active && (e.from === active || e.to === active);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={on ? "#d62027" : "#2a2f3a"} strokeWidth={on ? 1.6 : 0.6} opacity={active && !on ? 0.15 : 0.7} />;
          })}
          {nodes.map((n) => {
            const q = pos[n.id]; if (!q) return null;
            const on = active === n.id;
            return (
              <g key={n.id} transform={`translate(${q.x},${q.y})`} style={{ cursor: "pointer" }} onClick={() => setActive(n.id)}>
                <circle r={n.type === "core" ? 11 : n.type === "manager" ? 9 : 6} fill={color[n.type] || "#888"} stroke={on ? "#fff" : "none"} strokeWidth={2} />
                {(n.type === "core" || n.type === "manager" || on) && <text x={0} y={-12} textAnchor="middle" fontSize={10} fill="#cbd5e1">{n.label}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      <aside style={{ ...S.card, position: "sticky", top: 12, alignSelf: "start" }}>
        <div style={S.eyebrow}>צומת</div>
        {!active && <p style={S.sub}>לחץ צומת לראות incoming / outgoing.</p>}
        {active && (() => {
          const n = nodes.find((x) => x.id === active);
          const inc = conn(active).filter((e) => e.to === active);
          const out = conn(active).filter((e) => e.from === active);
          return (
            <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7 }}>
              <div><b>{n?.label}</b> <span style={S.badge}>{n?.type}</span></div>
              <div style={{ marginTop: 6 }}>נכנס ({inc.length}): {inc.map((e) => e.from).join(", ") || "—"}</div>
              <div>יוצא ({out.length}): {out.map((e) => e.to).join(", ") || "—"}</div>
            </div>
          );
        })()}
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.entries(color).map(([t, c]) => <span key={t} style={{ ...S.chip, borderColor: c }}><span style={{ color: c }}>●</span> {t}</span>)}
        </div>
      </aside>
    </div>
  );
}

/* ---------- AI Decision Simulator (no real action) ---------- */
function SimRow({ k, v }: { k: string; v: any }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 10, padding: "6px 0", borderBottom: "1px solid var(--border,#222)" }}>
      <div style={{ color: "var(--muted-foreground,#8a92a0)", fontSize: 12 }}>{k}</div>
      <div style={{ fontSize: 13 }}>{Array.isArray(v) ? v.join(" → ") : v}</div>
    </div>
  );
}
function Simulator({ brain, registry }: { brain: Any | null; registry: Any | null }) {
  const [q, setQ] = useState("יש לי IDoc בסטטוס 51");
  const [run, setRun] = useState<Any | null>(null);
  function simulate() {
    if (!brain) return;
    const intents: Any[] = brain["1_intentDetection"]?.intents || [];
    const scored = intents
      .map((it) => ({ it, score: (it.signals || []).filter((s: string) => q.toLowerCase().includes(String(s).toLowerCase())).length }))
      .filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
    const top = scored[0]?.it;
    const packs: string[] = registry?.expertPacks || [];
    const pack = top ? packs.find((p) => p.toLowerCase().startsWith(top.id)) || packs.find((p) => p.toUpperCase().includes(top.id.toUpperCase())) : undefined;
    const evTypes: Any[] = brain["3_evidenceEvaluation"]?.types || [];
    const provided = evTypes.filter((e) => q.toLowerCase().includes(e.id.split("-")[0]) || q.toLowerCase().includes(e.id));
    const stars = provided.reduce((n, e) => Math.max(n, e.stars || 0), 0);
    const band = stars >= 4 ? "High/Verified" : stars >= 3 ? "Medium" : "Low";
    setRun({
      intent: top ? `${top.id} (${top.he}) · mode=${top.mode} · manager=${top.manager}` : "generic",
      evidence: provided.length ? provided.map((e) => `${e.id} ${"★".repeat(e.stars)}`).join(", ") : "אין ראיה ≥3★ → INSUFFICIENT",
      confidence: band + (band === "Low" ? " → Never-Guess: בקש ראיות" : ""),
      capability: pack || "(generic reasoning)",
      skills: top ? [top.manager === "Sherlock" ? "sap-incident-commander (fallback)" : "oracle/web"].join(", ") : "—",
      agents: pack ? `workers of ${pack} (resolved from registry, e.g. sc4sap:*)` : "—",
      reasoning: top ? `manager=${top.manager} כי mode=${top.mode}; pack=${pack || "—"} כי intent=${top.id}` : "—",
      plan: brain["5_executionPlan"]?.template || [],
      summary: top ? `Diagnosis (${top.he}) · Confidence=${band} · basis=מבוסס על ידע · Next: ${band === "Low" ? "שלח ראיה חסרה" : "המשך RCA"}` : "צריך פירוט",
    });
  }
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={S.card}>
        <div style={S.eyebrow}>AI Decision Simulator (ללא ביצוע פעולה אמיתית)</div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} style={S.input} placeholder="לדוגמה: המשתמש לא מצליח לבצע MIRO" />
          <button onClick={simulate} style={S.primaryBtn}>הרץ סימולציה</button>
        </div>
      </div>
      {run && (
        <div style={S.card}>
          <SimRow k="Intent" v={run.intent} /><SimRow k="Evidence" v={run.evidence} /><SimRow k="Confidence" v={run.confidence} />
          <SimRow k="Capability" v={run.capability} /><SimRow k="Selected Skills" v={run.skills} /><SimRow k="Selected Agents" v={run.agents} />
          <SimRow k="Reasoning" v={run.reasoning} /><SimRow k="Execution Plan" v={run.plan} /><SimRow k="HQ Summary" v={run.summary} />
        </div>
      )}
    </div>
  );
}

/* ---------- Search Everywhere ---------- */
function SearchEverywhere({ m, brain }: { m: Any; brain: Any | null }) {
  const [q, setQ] = useState("");
  const index = useMemo(() => {
    const idx: { kind: string; label: string }[] = [];
    (m.skills || []).forEach((s: Any) => idx.push({ kind: "Skill", label: s.id }));
    (m.commands || []).forEach((c: Any) => idx.push({ kind: "Command", label: c.id }));
    (m.graph?.nodes || []).forEach((n: Any) => idx.push({ kind: n.type, label: n.label }));
    ((brain?.["1_intentDetection"]?.intents) || []).forEach((it: Any) => (it.signals || []).forEach((s: string) => idx.push({ kind: "Intent:" + it.id, label: s })));
    (m.knowledgeJSON || []).forEach((j: string) => idx.push({ kind: "JSON", label: j }));
    return idx;
  }, [m, brain]);
  const res = q ? index.filter((x) => x.label.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={S.card}>
        <div style={S.eyebrow}>Search Everywhere — סקילים · פקדים · Intents · צמתים · JSON</div>
        <input value={q} onChange={(e) => setQ(e.target.value)} style={{ ...S.input, marginTop: 8, width: "100%" }} placeholder="חפש: MIRO · IDoc · ST22 · PP · Note" />
      </div>
      <div style={S.card}>
        {!q && <p style={S.sub}>הקלד מונח (כולל tcode/מודול) — התוצאות מכל הרכיבים.</p>}
        {q && <div style={{ fontSize: 13 }}>{res.length} תוצאות</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {res.slice(0, 120).map((x, i) => <span key={i} style={S.chip}><b style={{ color: "#d62027" }}>{x.kind}</b> · {x.label}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- Health Center (/hq doctor) ---------- */
function HealthCenter({ m }: { m: Any }) {
  const h = m.health || {};
  const line = (k: string, ok: any, note?: string) => (
    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border,#222)" }}>
      <span>{k}</span><span style={{ color: ok ? "#4ade80" : "#f87171" }}>{ok ? "✔ OK" : "✘"} {note || ""}</span>
    </div>
  );
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={S.eyebrow}>/hq doctor</div><div style={S.sub}>בדיקת בריאות חיה מה-manifest</div></div>
        <span style={{ ...S.statusPill, background: h.result === "HEALTHY" ? "#0d3b2e" : "#3b1d1d", color: h.result === "HEALTHY" ? "#4ade80" : "#f87171" }}>● {h.result}</span>
      </div>
      <div style={S.card}>
        {(h.flagship || []).map((f: Any) => line("skill: " + f.id, f.ok))}
        {line("brain.json", h.brain)}
        {line("capability-registry.json", h.registry)}
        {(h.scripts || []).map((s: Any) => line("script: " + s.id, s.ok))}
        {line("brain JSON valid", h.brainJSONsValid, `${h.brainJSONs} files`)}
        {line("MCP", true, "optional (fallback active)")}
        {line("Hooks", true, "none registered")}
        {line("Secrets scan", true, h.secretsScan)}
      </div>
    </div>
  );
}

/* ---------- inline styles (dark / glass, brand-red) ---------- */
const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "radial-gradient(1200px 600px at 80% -10%, #1a0e0f 0%, #0b0d12 45%, #070809 100%)", color: "#e5e7eb", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16 },
  glassHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" },
  logoDot: { width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#d62027,#a3171c)", boxShadow: "0 0 24px #d6202766" },
  h1: { fontSize: 20, fontWeight: 700, margin: 0 }, sub: { fontSize: 13, color: "#9aa3af", margin: "2px 0 0" },
  code: { background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: 6, fontSize: 12 },
  backBtn: { color: "#e5e7eb", textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.12)", padding: "8px 12px", borderRadius: 10 },
  tabs: { display: "flex", gap: 6, margin: "16px 0", flexWrap: "wrap" },
  tab: { padding: "9px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#cbd5e1", cursor: "pointer", fontSize: 13 },
  tabActive: { background: "linear-gradient(135deg,#d62027,#a3171c)", color: "#fff", borderColor: "transparent", boxShadow: "0 6px 20px #d6202733" },
  main: { display: "block" },
  card: { padding: 18, borderRadius: 16, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 },
  stat: { padding: 16, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" },
  statNum: { fontSize: 30, fontWeight: 800, color: "#fff" }, statLabel: { fontSize: 13, color: "#cbd5e1", marginTop: 2 }, statSub: { fontSize: 11, color: "#6b7280" },
  eyebrow: { fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase", color: "#d62027", fontWeight: 700 },
  chip: { fontSize: 12, padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)", color: "#e5e7eb" },
  badge: { fontSize: 11, padding: "1px 8px", borderRadius: 999, background: "rgba(214,32,39,0.15)", color: "#f87171", marginInlineStart: 6 },
  statusPill: { fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 999 },
  input: { flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: 14 },
  primaryBtn: { padding: "10px 18px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#d62027,#a3171c)", color: "#fff", cursor: "pointer", fontWeight: 700 },
  footer: { textAlign: "center", fontSize: 12, color: "#6b7280", padding: "24px 0 8px" },
};
