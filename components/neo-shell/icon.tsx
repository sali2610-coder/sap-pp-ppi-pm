"use client";

// Icon resolver for the NEO rail.
//
// The nav model is built on the server and crosses to the client as plain JSON,
// so an icon can only travel as a string. This map turns that string back into a
// component. It is an explicit allow-list rather than a dynamic lookup on the
// lucide barrel, so the bundler keeps tree-shaking and only these icons ship.
// lucide-react is the only sanctioned icon source: the CSP forbids remote
// assets and the product is 100% offline. No emoji, anywhere.

import {
  AlertTriangle, Award, BookOpen, BrainCircuit, Cable, ChevronDown, ChevronLeft,
  Command, Compass, Database, FlaskConical, GitBranch, GraduationCap, History,
  Home, Layers, LayoutGrid, Library, MessageSquare, PanelLeft, Pin, Plug, Puzzle,
  Search, Settings, Sigma, Sparkles, Table, Terminal, Wrench, X,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  AlertTriangle, Award, BookOpen, BrainCircuit, Cable, ChevronDown, ChevronLeft,
  Command, Compass, Database, FlaskConical, GitBranch, GraduationCap, History,
  Home, Layers, LayoutGrid, Library, MessageSquare, PanelLeft, Pin, Plug, Puzzle,
  Search, Settings, Sigma, Sparkles, Table, Terminal, Wrench, X,
};

export function Ico({ name, size = 16 }: { name: string; size?: number }) {
  const C = MAP[name] || Database;
  return <C size={size} strokeWidth={1.75} aria-hidden="true" />;
}

/** Icon for a search-result kind — the kind chip in the rail results list. */
export const KIND_ICON: Record<string, string> = {
  table: "Table",
  tcode: "Terminal",
  func: "Plug",
  cds: "Sigma",
  fiori: "LayoutGrid",
  book: "BookOpen",
  incident: "AlertTriangle",
};

export const KIND_HE: Record<string, string> = {
  table: "טבלה",
  tcode: "טרנזקציה",
  func: "פונקציה",
  cds: "CDS",
  fiori: "Fiori",
  book: "ספר",
  incident: "תקלה",
};
