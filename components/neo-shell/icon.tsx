"use client";

// Icon resolver for the NEO rail and its command surface.
//
// The nav model is built on the server and crosses to the client as plain JSON,
// so an icon can only travel as a string. This map turns that string back into a
// component. It is an explicit allow-list rather than a dynamic lookup on the
// lucide barrel, so the bundler keeps tree-shaking and only these icons ship.
// lucide-react is the only sanctioned icon source: the CSP forbids remote
// assets and the product is 100% offline. No emoji, anywhere.
//
// MIRRORING. Nothing here is flipped globally. The two directional glyphs are
// handled where they are used: the group chevron is rotated per direction in
// the stylesheet, and the crumb chevron already points the RTL way. Keyboard
// glyphs (CornerDownLeft is the Enter keycap) are keycaps, not directions, and
// must never mirror.
//
// The result-kind tables that used to live here moved to search/build.ts, where
// the kind, its Hebrew label and its icon are declared once, in render order.

import {
  AlertTriangle, Award, BookMarked, BookOpen, BrainCircuit, Cable, ChevronDown,
  ChevronLeft, CircleHelp, ClipboardCheck, Command, Compass, CornerDownLeft, Database,
  FlaskConical, GitBranch, GraduationCap, History, Home, Layers, LayoutGrid,
  Library, MessageSquare, PanelLeft, Pin, Plug, Puzzle, ScrollText, Search,
  Settings, Sigma, Sparkles, SquareFunction, Table, Terminal, Waypoints,
  Workflow, Wrench, X,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  AlertTriangle, Award, BookMarked, BookOpen, BrainCircuit, Cable, ChevronDown,
  ChevronLeft, CircleHelp, ClipboardCheck, Command, Compass, CornerDownLeft, Database,
  FlaskConical, GitBranch, GraduationCap, History, Home, Layers, LayoutGrid,
  Library, MessageSquare, PanelLeft, Pin, Plug, Puzzle, ScrollText, Search,
  Settings, Sigma, Sparkles, SquareFunction, Table, Terminal, Waypoints,
  Workflow, Wrench, X,
};

export function Ico({ name, size = 16 }: { name: string; size?: number }) {
  const C = MAP[name] || Database;
  return <C size={size} strokeWidth={1.75} aria-hidden="true" />;
}
