/* One icon map for the five reference directories.
 *
 * The server-side builders are plain `.ts` modules with no React import, so they
 * name a glyph with a string key (RefIcon) and this module is the only place
 * that turns a key into an element. No file has its own private mapping, which
 * is what keeps /neo/bapi and /neo/cds using the same glyph for the same idea.
 *
 * lucide-react only, per the offline constraint. No emoji anywhere. */

import {
  AlertTriangle, AppWindow, ArrowLeft, BookOpen, Boxes, Cable, Database,
  FileCode, GitBranch, KeyRound, LayoutGrid, Plug, Puzzle, ShieldCheck, Sigma,
  Table as TableIcon, Terminal, Users, Workflow, Wrench,
} from "lucide-react";
import type { RefIcon } from "./types";

const MAP: Record<RefIcon, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  plug: Plug,
  sigma: Sigma,
  cable: Cable,
  layoutGrid: LayoutGrid,
  puzzle: Puzzle,
  table: TableIcon,
  terminal: Terminal,
  boxes: Boxes,
  gitBranch: GitBranch,
  database: Database,
  shieldCheck: ShieldCheck,
  workflow: Workflow,
  appWindow: AppWindow,
  keyRound: KeyRound,
  alertTriangle: AlertTriangle,
  bookOpen: BookOpen,
  wrench: Wrench,
  arrowLeft: ArrowLeft,
  fileCode: FileCode,
  users: Users,
};

export function Glyph({ i, size = 14 }: { i: RefIcon; size?: number }) {
  const C = MAP[i] ?? Boxes;
  return <C size={size} strokeWidth={1.75} />;
}
