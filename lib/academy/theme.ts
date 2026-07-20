/**
 * SAP Academy — module accent map (single source).
 * One place for the per-module brand accent so every Academy surface tints
 * identically. Values match the canonical module colours in the design blueprint.
 */
export const MODULE_ACCENT: Record<string, string> = {
  PM: "#f97316",
  "PP-PI": "#6d28d9",
  PP: "#6d28d9",
  QM: "#0891b2",
  MM: "#d97706",
  WM: "#7c3aed",
  "PM-User": "#ea580c",
  "PP-DS": "#0891b2",
  "PP/DS": "#0891b2",
  SOP: "#0d9488",
  "S&OP": "#0d9488",
};

export const accentOf = (module: string): string => MODULE_ACCENT[module] || "var(--brand)";
