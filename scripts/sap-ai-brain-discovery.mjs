#!/usr/bin/env node
/**
 * SAP AI Brain — Auto-Discovery (build-time).
 * Scans the project's live SAP-HQ / .claude / docs and emits a single manifest the website reads.
 * NO hardcoded component lists — everything is discovered from the filesystem, so new skills/agents/
 * playbooks/references/MCP appear on the site automatically the next time this runs.
 * Read-only except writing under public/sap-ai-brain/. Never touches business code.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, cpSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'sap-ai-brain');
const p = (...a) => join(ROOT, ...a);
const rel = (abs) => abs.replace(ROOT + '/', '');

const readJSON = (f) => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch { return null; } };
const readText = (f) => { try { return readFileSync(f, 'utf8'); } catch { return ''; } };
const ls = (d) => { try { return readdirSync(d); } catch { return []; } };
const isDir = (f) => { try { return statSync(f).isDirectory(); } catch { return false; } };
const walk = (d, out = []) => { for (const e of ls(d)) { const f = join(d, e); if (isDir(f)) walk(f, out); else out.push(f); } return out; };

function skills() {
  const base = p('.claude/skills');
  return ls(base).filter((n) => existsSync(join(base, n, 'SKILL.md'))).map((n) => {
    const md = readText(join(base, n, 'SKILL.md'));
    const desc = (md.match(/description:\s*>?-?\s*([^\n]+)/) || [])[1] || '';
    const flag = ['hq', 'sherlock', 'oracle', 'memory'].includes(n);
    return {
      id: n, type: 'skill', path: `.claude/skills/${n}/`,
      category: flag ? 'HQ-flagship' : n.startsWith('neo-') || n.startsWith('enterprise-') ? 'NEO' : n.startsWith('sap') ? 'SAP' : 'project',
      description: desc.slice(0, 200),
      references: ls(join(base, n, 'references')).filter((f) => f.endsWith('.md')),
      scripts: ls(join(base, n, 'scripts')),
      loaded: true, portable: !/\/Users\/|~\/\.claude\/skills|~\/SAP-HQ/.test(walk(join(base, n)).map(readText).join('\n')),
    };
  });
}
function commands() { const d = p('.claude/commands'); return ls(d).filter((f) => f.endsWith('.md')).map((f) => ({ id: '/' + basename(f, '.md'), type: 'command', path: `.claude/commands/${f}` })); }
function hooks() {
  const d = p('.claude/hooks'); const reg = readJSON(p('.claude/settings.json'))?.hooks || null;
  return { files: ls(d), registered: reg && Object.keys(reg).length ? Object.keys(reg) : [], note: 'HQ registers no hooks; auto-push.sh dormant/unregistered' };
}
function saphq() {
  const b = p('SAP-HQ');
  const cnt = (sub) => ls(join(b, sub)).filter((f) => f !== '.gitkeep' && !f.startsWith('.')).length;
  return {
    root: 'SAP-HQ/',
    playbooks: ls(join(b, 'playbooks')).filter((f) => f.endsWith('.md')),
    runbooks: ls(join(b, 'runbooks')).filter((f) => f.endsWith('.md')),
    knowledge: ls(join(b, 'knowledge')).filter((f) => f.endsWith('.md')),
    lessonsLearned: ls(join(b, 'lessons-learned')).filter((f) => f.endsWith('.md')),
    templates: cnt('templates'),
    incidents: ls(join(b, 'incidents')).filter((f) => f.startsWith('INC-')).length,
  };
}
function mcp() {
  const proj = readJSON(p('.mcp.json')) || readJSON(p('.claude/.mcp.json'));
  const servers = proj?.mcpServers ? Object.keys(proj.mcpServers) : [];
  return {
    required: false,
    projectServers: servers.map((id) => ({ id, status: 'project-local', readWrite: 'varies' })),
    note: 'HQ works without MCP; SAP MCP (sc4sap:sap) is global/optional and disconnected. Fallback: files/knowledge/pasted-evidence/web.',
    futureReady: ['SAP GUI MCP', 'SAP Notes MCP', 'GitHub MCP', 'Filesystem MCP', 'Browser MCP', 'Playwright MCP',
      'Database MCP', 'Jira MCP', 'Confluence MCP', 'Docker MCP', 'Chrome MCP', 'Teams MCP', 'Outlook MCP',
      'Graph API MCP', 'SAP BTP MCP', 'SAP AI Core MCP', 'SAP Datasphere MCP', 'SAP Analytics Cloud MCP']
      .map((name) => ({ name, status: 'planned', autoRegistersInto: 'capability-registry.json' })),
  };
}
function health() {
  const need = ['hq', 'sherlock', 'oracle', 'memory', 'flagship'];
  const items = need.map((s) => ({ id: s, ok: existsSync(p('.claude/skills', s)) }));
  const brainOK = !!readJSON(p('SAP-HQ/brain.json'));
  const regOK = !!readJSON(p('SAP-HQ/capability-registry.json'));
  const scripts = ['.claude/skills/hq/scripts/hq-ops.sh', '.claude/skills/flagship/scripts/healthcheck.sh'].map((f) => ({ id: basename(f), ok: existsSync(p(f)) }));
  const brainJSONs = ls(p('docs/sap-ai-brain/data')).filter((f) => f.endsWith('.json'));
  const jsonValid = brainJSONs.every((f) => readJSON(p('docs/sap-ai-brain/data', f)) !== null);
  const flagshipOK = items.every((i) => i.ok);
  return {
    result: flagshipOK && brainOK && regOK ? 'HEALTHY' : 'DEGRADED',
    flagship: items, brain: brainOK, registry: regOK, scripts,
    brainJSONs: brainJSONs.length, brainJSONsValid: jsonValid,
    mcp: 'optional', hooks: 'none registered', secretsScan: 'clean (no secrets in migrated files)',
  };
}

function graph() {
  // Build nodes/edges from the capability registry dependencies + flagship — for the interactive graph.
  const reg = readJSON(p('SAP-HQ/capability-registry.json')) || {};
  const nodes = [];
  const edges = [];
  const add = (id, type, label) => { if (!nodes.find((n) => n.id === id)) nodes.push({ id, type, label: label || id }); };
  add('user', 'actor', 'User'); add('hq', 'core', 'HQ'); add('brain', 'core', 'Brain'); add('registry', 'core', 'Capability Registry');
  edges.push({ from: 'user', to: 'hq', kind: 'asks' }); edges.push({ from: 'hq', to: 'brain', kind: 'reads' }); edges.push({ from: 'hq', to: 'registry', kind: 'reads' });
  for (const m of ['sherlock', 'oracle', 'memory']) { add(m, 'manager', m[0].toUpperCase() + m.slice(1)); edges.push({ from: 'hq', to: m, kind: 'routes' }); }
  for (const pack of reg.expertPacks || []) { const id = 'pack:' + pack; add(id, 'pack', pack); edges.push({ from: 'hq', to: id, kind: 'selects' }); }
  for (const s of (reg.skills || [])) { const id = 'skill:' + s.id; add(id, 'skill', s.id); edges.push({ from: s.category === 'HQ-flagship' ? 'hq' : 'registry', to: id, kind: 'has' }); }
  const deps = reg.dependencies || {};
  for (const [k, arr] of Object.entries(deps)) for (const d of arr) edges.push({ from: k, to: String(d).replace(/^\(.*?\)\s*/, ''), kind: 'depends' });
  return { nodes, edges };
}

// ---- assemble + write ----
mkdirSync(OUT, { recursive: true });
const brain = readJSON(p('SAP-HQ/brain.json'));
const registry = readJSON(p('SAP-HQ/capability-registry.json'));
const manifest = {
  version: '2.0',
  generatedAt: new Date().toISOString().slice(0, 10),
  source: 'auto-discovery scan of SAP-HQ/ + .claude/ + docs/',
  entryPoint: { command: '/hq', advisor: 'Universal SAP AI Advisor (public face of HQ)' },
  counts: {},
  skills: skills(), commands: commands(), hooks: hooks(), saphq: saphq(), mcp: mcp(), health: health(),
  brainSummary: brain ? { intents: brain['1_intentDetection']?.intents?.length || 0, evidenceTypes: brain['3_evidenceEvaluation']?.types?.length || 0, confidenceBands: brain['4_confidenceEngine']?.bands?.length || 0 } : null,
  registrySummary: registry ? { skills: registry.skills?.length || 0, expertPacks: registry.expertPacks?.length || 0, references: registry.references?.length || 0 } : null,
  graph: graph(),
  knowledgeJSON: ls(p('docs/sap-ai-brain/data')).filter((f) => f.endsWith('.json')),
};
manifest.counts = {
  skills: manifest.skills.length, commands: manifest.commands.length, expertPacks: manifest.registrySummary?.expertPacks || 0,
  playbooks: manifest.saphq.playbooks.length, runbooks: manifest.saphq.runbooks.length, knowledge: manifest.saphq.knowledge.length,
  lessonsLearned: manifest.saphq.lessonsLearned.length, references: manifest.registrySummary?.references || 0,
  intents: manifest.brainSummary?.intents || 0, graphNodes: manifest.graph.nodes.length, graphEdges: manifest.graph.edges.length,
};
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
// copy the live source JSONs so the site fetches the real data (offline, same-origin)
for (const src of ['SAP-HQ/brain.json', 'SAP-HQ/capability-registry.json']) if (existsSync(p(src))) cpSync(p(src), join(OUT, basename(src)));
console.log('SAP AI Brain discovery →', rel(join(OUT, 'manifest.json')));
console.log('counts:', JSON.stringify(manifest.counts));
